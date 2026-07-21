import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const codeViewerVariants = cva(
  "relative rounded-lg overflow-hidden font-mono text-sm",
  {
    variants: {
      variant: {
        default: "bg-muted/50 border border-border",
        minimal: "bg-transparent border-0",
        elevated: "bg-card shadow-md border border-border",
      },
      size: {
        sm: "text-xs p-3 max-h-48",
        md: "text-sm p-4 max-h-64",
        lg: "text-base p-5 max-h-96",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
)

const codeVariants = cva(
  "w-full h-full overflow-auto",
  {
    variants: {
      wrap: {
        true: "whitespace-pre-wrap break-words",
        false: "whitespace-pre",
      },
    },
    defaultVariants: { wrap: false },
  }
)

export interface CodeViewerProps extends VariantProps<typeof codeViewerVariants> {
  /** Code content to display */
  code: string
  /** Programming language for syntax detection */
  language?: string
  /** Whether to show line numbers */
  showLineNumbers?: boolean
  /** Whether to show copy button */
  showCopyButton?: boolean
  /** Whether to wrap code */
  wrap?: boolean
  /** Custom className */
  className?: string
  /** Highlight lines (array of line numbers) */
  highlightLines?: number[]
  /** Theme for syntax colors */
  theme?: "light" | "dark" | "vscode" | "github"
}

// Basic syntax highlighting colors (without external dependency)
const syntaxColors: Record<string, string> = {
  keyword: "text-purple-500",
  string: "text-green-500",
  number: "text-amber-500",
  comment: "text-slate-500",
  function: "text-blue-500",
  operator: "text-rose-500",
  tag: "text-cyan-500",
  attr: "text-orange-500",
}

function CodeViewer({
  code,
  language = "plaintext",
  variant,
  size,
  showLineNumbers = true,
  showCopyButton = true,
  wrap,
  className,
  highlightLines = [],
  theme = "vscode",
}: CodeViewerProps) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split("\n")

  // Simple syntax highlighting (basic tokenization)
  const highlightCode = (line: string, lineNumber: number) => {
    let highlighted = line

    const isHighlighted = highlightLines.includes(lineNumber + 1)

    // Basic tokenization for common languages
    if (["javascript", "typescript", "jsx", "tsx"].includes(language)) {
      highlighted = highlighted
        .replace(/(const|let|var|function|return|if|else|for|while|import|export|default|class|extends|new|this|super|try|catch|finally|throw|async|await|from|as)\b/g, `<span class="${syntaxColors.keyword}">$1</span>`)
        .replace(/(["'`])(.*?)\1/g, `<span class="${syntaxColors.string}">$1$2$1</span>`)
        .replace(/\b(\d+)\b/g, `<span class="${syntaxColors.number}">$1</span>`)
        .replace(/(\/\/.*)/g, `<span class="${syntaxColors.comment}">$1</span>`)
    } else if (language === "css") {
      highlighted = highlighted
        .replace(/([.#]?[a-zA-Z-]+)\s*\{/g, `<span class="${syntaxColors.tag}">$1</span>{`)
        .replace(/(\/\*[\s\S]*?\*\/)/g, `<span class="${syntaxColors.comment}">$1</span>`)
    } else if (language === "html" || language === "jsx" || language === "tsx") {
      highlighted = highlighted
        .replace(/(<[^>]+>)/g, `<span class="${syntaxColors.tag}">$1</span>`)
        .replace(/(="([^"]*)")/g, `=$1`)
    } else if (language === "json") {
      highlighted = highlighted
        .replace(/(["'`])(.*?)(\1)/g, `<span class="${syntaxColors.string}">$1$2$1</span>`)
        .replace(/\b(true|false|null)\b/g, `<span class="${syntaxColors.keyword}">$1</span>`)
        .replace(/\b(\d+)\b/g, `<span class="${syntaxColors.number}">$1</span>`)
    }

    return isHighlighted 
      ? `<mark class="bg-yellow-200/50 dark:bg-yellow-900/50">${highlighted}</mark>` 
      : highlighted
  }

  return (
    <div className={cn(codeViewerVariants({ variant, size }), className)}>
      {showCopyButton && (
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 z-10 px-2 py-1 text-xs bg-background/80 backdrop-blur-sm rounded border border-border hover:bg-background transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <span className="text-green-500">Copied!</span>
          ) : (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </span>
          )}
        </button>
      )}

      <div className={cn(codeVariants({ wrap }), "pr-12")}>
        <pre className="m-0">
          {showLineNumbers ? (
            <code className="block">
              {lines.map((line, index) => (
                <div key={index} className="flex items-start">
                  <span className="select-none opacity-30 w-10 text-right mr-4">
                    {index + 1}
                  </span>
                  <span 
                    className="flex-1"
                    dangerouslySetInnerHTML={{ __html: highlightCode(line, index) }}
                  />
                </div>
              ))}
            </code>
          ) : (
            <code 
              className="block"
              dangerouslySetInnerHTML={{ __html: lines.map(l => highlightCode(l, 0)).join("\n") }}
            />
          )}
        </pre>
      </div>
    </div>
  )
}

CodeViewer.displayName = "CodeViewer"

// SyntaxHighlighter helper component for inline code
function InlineCode({
  code,
  language,
  className,
}: {
  code: string
  language?: string
  className?: string
}) {
  const highlighted = code

  return (
    <code
      className={cn(
        "inline-block px-1.5 py-0.5 rounded bg-muted text-xs font-mono",
        className
      )}
    >
      {highlighted}
    </code>
  )
}

// CodeBlock component - simpler version without highlighting
function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  showCopyButton = true,
  className,
}: {
  code: string
  language?: string
  showLineNumbers?: boolean
  showCopyButton?: boolean
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split("\n")

  return (
    <div className={cn(codeViewerVariants({ variant: "default", size: "md" }), className)}>
      {showCopyButton && (
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 z-10 px-2 py-1 text-xs bg-background/80 backdrop-blur-sm rounded border border-border hover:bg-background transition-colors"
          aria-label="Copy code"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}

      <pre className={cn(codeVariants({ wrap: false }), "pr-12")}>
        {showLineNumbers ? (
          <code className="block">
            {lines.map((line, index) => (
              <div key={index} className="flex items-start">
                <span className="select-none opacity-30 w-10 text-right mr-4">
                  {index + 1}
                </span>
                <span className="flex-1">{line}</span>
              </div>
            ))}
          </code>
        ) : (
          <code className="block">{code}</code>
        )}
      </pre>
    </div>
  )
}

CodeBlock.displayName = "CodeBlock"

export { CodeViewer, codeViewerVariants, InlineCode, CodeBlock }
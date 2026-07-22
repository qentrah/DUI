import { CodeViewer } from "@/components/ui/code-viewer"

const basicExample = `import { CodeViewer } from "@/components/ui/code-viewer"

export function Example() {
  return (
    <CodeViewer
      code={\`const greeting = "Hello, world!"\`}
      language="typescript"
      theme="forest"
      title="example.ts"
      showLineNumbers
    />
  )
}`

const themeExample = `<div className="syntax-brand">
  <CodeViewer
    code={source}
    language="tsx"
    theme="system"
  />
</div>`

const cssVariables = `.syntax-brand {
  --syntax-foreground: #ecfdf5;
  --syntax-comment: #6b8f71;
  --syntax-punctuation: #a7f3d0;
  --syntax-variable: #5eead4;
  --syntax-property: #86efac;
  --syntax-number: #fde68a;
  --syntax-string: #bef264;
  --syntax-operator: #67e8f9;
  --syntax-keyword: #4ade80;
  --syntax-function: #facc15;
  --syntax-regex: #fb923c;
}`

const themes = ["system", "github", "vscode", "dracula", "night-owl", "light", "forest", "amber", "ocean", "rose"]

export function CodeViewerGuide() {
  return (
    <section id="theming" className="mt-12 scroll-mt-24 border-t border-border pt-10">
      <h2 className="text-2xl font-semibold">Theming and exact usage</h2>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        Copy this example directly into a client or server component. Static viewers need no local state; editable command and prompt viewers use <code className="rounded bg-muted px-1.5 py-0.5 text-sm">onChange</code> and <code className="rounded bg-muted px-1.5 py-0.5 text-sm">onRun</code> callbacks.
      </p>
      <div className="mt-6"><CodeViewer code={basicExample} language="tsx" title="code-viewer-example.tsx" theme="forest" showLineNumbers /></div>

      <h3 className="mt-10 text-lg font-semibold">Built-in themes</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {themes.map((theme) => <code key={theme} className="rounded-md border border-border bg-muted/40 px-2.5 py-1.5 text-xs">{theme}</code>)}
      </div>

      <h3 className="mt-10 text-lg font-semibold">Design-system syntax tokens</h3>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        The <code className="rounded bg-muted px-1.5 py-0.5 text-sm">system</code> theme reads CSS variables at render time. Scope them on a wrapper to create a product theme, or place them in <code className="rounded bg-muted px-1.5 py-0.5 text-sm">:root</code> to theme every viewer. Each token includes a fallback, so the installed component still renders correctly before customization.
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <CodeViewer code={themeExample} language="tsx" title="component.tsx" theme="ocean" showLineNumbers />
        <CodeViewer code={cssVariables} language="css" title="globals.css" theme="forest" showLineNumbers />
      </div>

      <h3 className="mt-10 text-lg font-semibold">When to use each option</h3>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
        <li><strong className="text-foreground">Built-in theme:</strong> consistent palette with one prop and no CSS setup.</li>
        <li><strong className="text-foreground">System theme:</strong> syntax colors follow your library tokens and can change per product or container.</li>
        <li><strong className="text-foreground">customTheme:</strong> pass a Prism theme object when token rules or colors must be fully controlled in JavaScript.</li>
      </ul>
    </section>
  )
}

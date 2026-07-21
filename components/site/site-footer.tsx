import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12">
        {/* Top Section */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div>
            <span className="text-lg font-bold text-foreground">DUI</span>
            <p className="mt-1 text-sm text-muted-foreground">
              Open-source UI components, blocks, and agent skills.
            </p>
          </div>
          <nav className="sm:ms-auto flex gap-6">
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
              Docs
            </Link>
            <Link href="/components" className="text-sm text-muted-foreground hover:text-foreground">
              Components
            </Link>
            <Link href="/blocks" className="text-sm text-muted-foreground hover:text-foreground">
              Blocks
            </Link>
            <Link href="/skills" className="text-sm text-muted-foreground hover:text-foreground">
              Skills
            </Link>
            <a
              href="https://github.com/qentrah/DUI"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              GitHub
            </a>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © 2026 DUI. MIT License.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Created by Ahmed Mansour</span>
            <a
              href="https://github.com/Up-to-code"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              @Up-to-code
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
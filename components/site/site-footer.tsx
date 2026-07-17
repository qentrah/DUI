import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center">
        <span className="font-semibold text-white">DUI</span>
        <span>Open source UI for English and Arabic products.</span>
        <div className="sm:ms-auto flex gap-5">
          <Link href="/docs">Docs</Link>
          <Link href="/components">Components</Link>
          <a href="https://github.com/qentrah/DUI">GitHub</a>
        </div>
      </div>
    </footer>
  )
}

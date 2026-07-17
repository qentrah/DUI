import { FileCode2, Folder, FolderOpen } from "lucide-react"

const tree = [
  ["app/", "Documentation website and routes"],
  ["components/ui/", "Installable component source"],
  ["components/blocks/", "Installable multi-component Blocks"],
  ["components/library/", "Preview and browser components"],
  ["components/site/", "Documentation shell and navigation"],
  ["app/blocks/", "Block documentation routes"],
  ["lib/", "Catalog, localization and utilities"],
  ["public/r/", "Generated shadcn registry payloads"],
  ["registry.json", "Source registry manifest"],
  ["components.json", "Local shadcn project configuration"]
]

export default function FolderPage() {
  return (
    <main className="min-h-[calc(100vh-8rem)] bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-5 py-16 lg:py-20">
        <p className="text-sm font-medium text-zinc-500">Architecture</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Folder structure</h1>
        <p className="mt-4 max-w-2xl leading-7 text-zinc-400">
          The repository separates the documentation product from the source files distributed by the registry.
        </p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-300">
            <FolderOpen className="size-4 text-zinc-500" />
            qentrah/DUI
          </div>
          <div className="divide-y divide-zinc-800">
            {tree.map(([path, description]) => {
              const isFile = path.includes(".")
              const Icon = isFile ? FileCode2 : Folder
              return (
                <div key={path} className="grid gap-2 px-5 py-4 sm:grid-cols-[220px_1fr] hover:bg-zinc-900/20">
                  <code className="flex items-center gap-2 text-sm font-medium text-zinc-200">
                    <Icon className="size-4 text-zinc-500" />
                    {path}
                  </code>
                  <p className="text-sm text-zinc-400">{description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

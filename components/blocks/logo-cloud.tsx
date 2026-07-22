import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export interface LogoCloudProps { title?: string; companies?: string[]; className?: string }

function LogoCloud({ title = "Trusted by teams building the next interface", companies = ["Qentrah", "Northstar", "Canvas", "Forma", "Relay"], className }: LogoCloudProps) {
  return (
    <section className={cn("w-full px-6 py-12 md:px-10", className)}>
      <p className="text-center text-sm text-muted-foreground">{title}</p>
      <Separator className="my-7" />
      <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-6 text-center sm:grid-cols-5" aria-label="Customer logos">
        {companies.map((company) => <li key={company} className="text-sm font-semibold tracking-wide text-muted-foreground">{company}</li>)}
      </ul>
    </section>
  )
}

export { LogoCloud }

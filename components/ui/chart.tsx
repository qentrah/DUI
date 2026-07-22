import { cn } from "@/lib/utils"

export interface ChartDatum { label: string; value: number; color?: string }
export interface ChartProps { data: readonly ChartDatum[]; type?: "bar" | "line"; height?: number; showLabels?: boolean; className?: string; ariaLabel?: string }

function Chart({ data, type = "bar", height = 220, showLabels = true, className, ariaLabel = "Data chart" }: ChartProps) {
  const max = Math.max(...data.map((item) => item.value), 1)
  const width = 640
  const padding = 28
  const usableWidth = width - padding * 2
  const points = data.map((item, index) => ({ x: padding + (index / Math.max(data.length - 1, 1)) * usableWidth, y: height - padding - (item.value / max) * (height - padding * 2), ...item }))
  return <figure className={cn("w-full", className)} aria-label={ariaLabel}>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ariaLabel} className="w-full overflow-visible">
      {[0.25, 0.5, 0.75, 1].map((tick) => <line key={tick} x1={padding} x2={width - padding} y1={height - padding - tick * (height - padding * 2)} y2={height - padding - tick * (height - padding * 2)} stroke="var(--border)" strokeDasharray="4 6" />)}
      {type === "bar" ? points.map((point, index) => { const barWidth = usableWidth / data.length * .58; return <rect key={point.label} x={padding + index * usableWidth / data.length + (usableWidth / data.length - barWidth) / 2} y={point.y} width={barWidth} height={height - padding - point.y} rx="5" fill={point.color ?? "var(--foreground)"} /> }) : <><polyline points={points.map((point) => `${point.x},${point.y}`).join(" ")} fill="none" stroke="var(--foreground)" strokeWidth="3" strokeLinejoin="round" />{points.map((point) => <circle key={point.label} cx={point.x} cy={point.y} r="5" fill={point.color ?? "var(--background)"} stroke="var(--foreground)" strokeWidth="3" />)}</>}
      {showLabels && points.map((point, index) => <text key={point.label} x={type === "bar" ? padding + (index + .5) * usableWidth / data.length : point.x} y={height - 7} textAnchor="middle" fill="var(--muted-foreground)" fontSize="11">{point.label}</text>)}
    </svg>
    <figcaption className="sr-only">{data.map((item) => `${item.label}: ${item.value}`).join(", ")}</figcaption>
  </figure>
}

export { Chart }

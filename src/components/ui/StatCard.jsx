import { Link } from "react-router-dom"
import Card from "./Card"

export default function StatCard({
  title,
  value,
  color = "text-slate-900",
  description = null,
  to = null,
}) {
  const content = (
    <Card
      className={`flex flex-col gap-1 transition ${
        to
          ? "cursor-pointer hover:border-blue-400 hover:shadow-sm"
          : ""
      }`}
    >
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className={`text-3xl font-bold ${color}`}>
        {value}
      </p>

      {description && (
        <p className="text-xs text-slate-400">
          {description}
        </p>
      )}
    </Card>
  )

  // Non-clickable (default behavior stays intact)
  if (!to) return content

  // Clickable variant
  return (
    <Link to={to} className="block">
      {content}
    </Link>
  )
}



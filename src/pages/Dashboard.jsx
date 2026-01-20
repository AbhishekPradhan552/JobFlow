import { Link } from "react-router-dom"
import { useApplications } from "../context/ApplicationContext"
import StatCard from "../components/ui/StatCard"

export default function Dashboard() {
  const { state } = useApplications()
  const { applications, loading, error } = state

  if (loading) {
    return (
      <p className="text-slate-500">
        Loading dashboard...
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-red-500">
        {error}
      </p>
    )
  }

  const total = applications.length

  const stats = [
    { title: "Total Applications", value: total ,to:"/applications"},
    {
      title: "Applied",
      value: applications.filter(a => a.status === "APPLIED").length,
      color: "text-blue-600",
      to:"/applications?status=APPLIED"
    },
    {
      title: "Interview",
      value: applications.filter(a => a.status === "INTERVIEW").length,
      color: "text-amber-600",
      to:"/applications?status=INTERVIEW"
    },
    {
      title: "Offer",
      value: applications.filter(a => a.status === "OFFER").length,
      color: "text-green-600",
      to:"/applications?status=OFFER"
    },
    {
      title: "Rejected",
      value: applications.filter(a => a.status === "REJECTED").length,
      color: "text-red-600",
      to:"/applications?status=REJECTED"
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <h2 className="text-3xl font-bold text-slate-800">
        Dashboard
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            color={stat.color}
            to={stat.to}
          />
        ))}
      </div>

      {/* Empty state */}
      {total === 0 && (
        <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            No applications yet
          </h3>

          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
            Start tracking your placement journey by adding your first job
            application. This dashboard will help you monitor progress,
            interviews, and offers in one place.
          </p>

          <Link
            to="/applications"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add your first application
          </Link>
        </div>
      )}
    </div>
  )
}


import Dashboard from "@/features/dashboard/Dashboard"
import { Sidebar } from "@/features/dashboard/components/Sidebar"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Dashboard />
      </main>
    </div>
  )
}


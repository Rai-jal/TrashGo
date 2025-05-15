"use client"

import { useContext } from "react"
import { AppContext } from "./ClientLayout"

export default function Dashboard() {
  const { userName } = useContext(AppContext)

  return (
    <div>
      <h1 className="text-2xl font-medium text-teal-700 mb-6">Welcome, {userName}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Waste Collection */}
        <div className="bg-teal-700 text-white p-6 rounded-md">
          <h2 className="text-lg font-medium mb-2">Total Waste Collection</h2>
          <div className="text-3xl font-bold mb-2">154.90 KG</div>
          <div className="text-sm opacity-80">+10% from last month</div>
        </div>

        {/* Next Collection */}
        <div className="bg-teal-700 text-white p-6 rounded-md">
          <h2 className="text-lg font-medium mb-2">Next Collection</h2>
          <div className="text-3xl font-bold mb-2">Tomorrow</div>
          <div className="text-sm opacity-80">6:00pm General Waste</div>
        </div>

        {/* Activated Request */}
        <div className="bg-teal-700 text-white p-6 rounded-md">
          <h2 className="text-lg font-medium mb-2">Activated Request</h2>
          <div className="text-3xl font-bold mb-2">2</div>
          <div className="text-sm opacity-80">1 in progress, 1 pending</div>
        </div>
      </div>
    </div>
  )
}

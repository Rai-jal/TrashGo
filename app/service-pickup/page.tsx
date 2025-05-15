"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PlusIcon, RefreshCw } from "lucide-react"

type RequestStatus = "pending" | "in progress" | "completed" | "cancelled"

interface PickupRequest {
  id: string
  binId: string
  location: string
  date: string
  status: RequestStatus
}

export default function ServicePickup() {
  const [activeTab, setActiveTab] = useState<"current" | "past">("current")
  const [requests, setRequests] = useState<PickupRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0) // Used to trigger a refresh

  // Function to refresh the data
  const refreshData = () => {
    setRefreshKey((prev) => prev + 1)
    setLoading(true)
  }

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/pickup-requests?status=${activeTab}`)

        if (!response.ok) {
          throw new Error("Failed to fetch pickup requests")
        }

        const data = await response.json()
        console.log(`Fetched ${data.length} ${activeTab} requests:`, data)
        setRequests(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching requests:", err)
        setError("Failed to load pickup requests. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [activeTab, refreshKey])

  const cancelRequest = async (id: string) => {
    try {
      const response = await fetch(`/api/pickup-requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
      })

      if (!response.ok) {
        throw new Error("Failed to cancel request")
      }

      // Update the local state
      setRequests(requests.map((request) => (request.id === id ? { ...request, status: "cancelled" } : request)))
    } catch (err) {
      console.error("Error cancelling request:", err)
      alert("Failed to cancel request. Please try again.")
    }
  }

  return (
    <div className="bg-white rounded-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex">
          <button
            className={`px-4 py-2 ${activeTab === "current" ? "bg-sky-200 text-sky-800" : "bg-gray-100"} rounded-l-md`}
            onClick={() => setActiveTab("current")}
          >
            Current Request
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "past" ? "bg-sky-200 text-sky-800" : "bg-gray-100"} rounded-r-md`}
            onClick={() => setActiveTab("past")}
          >
            Past Request
          </button>
        </div>

        <button onClick={refreshData} className="p-2 text-gray-500 hover:text-gray-700" title="Refresh data">
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {activeTab === "current" && (
        <Link
          href="/service-pickup/new"
          className="flex items-center justify-center gap-2 bg-teal-700 text-white py-2 px-4 rounded-md mb-4 w-[200px]"
        >
          <PlusIcon size={16} />
          <span>New Pickup</span>
        </Link>
      )}

      {loading ? (
        <div className="text-center py-8">Loading pickup requests...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : requests.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No {activeTab} pickup requests found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Bin ID</th>
                <th className="py-2 px-4 text-left">Location</th>
                <th className="py-2 px-4 text-left">Request Date</th>
                <th className="py-2 px-4 text-left">Status</th>
                {activeTab === "current" && <th className="py-2 px-4 text-left">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="border-b">
                  <td className="py-3 px-4">{request.binId}</td>
                  <td className="py-3 px-4">{request.location}</td>
                  <td className="py-3 px-4">{new Date(request.date).toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        request.status === "pending"
                          ? "bg-red-200 text-red-800"
                          : request.status === "in progress"
                            ? "bg-yellow-200 text-yellow-800"
                            : request.status === "completed"
                              ? "bg-green-200 text-green-800"
                              : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  {activeTab === "current" && (
                    <td className="py-3 px-4">
                      {request.status === "pending" && (
                        <button
                          onClick={() => cancelRequest(request.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

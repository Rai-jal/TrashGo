"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ManualRequest() {
  const router = useRouter()
  const [binStatus, setBinStatus] = useState<"empty" | "half" | "full" | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-sm">
        <h1 className="text-xl font-medium mb-2">Thank You!</h1>
        <p className="text-gray-500 mb-6">Your report has been received</p>

        <div className="mb-4">
          <h2 className="font-medium mb-2">Bin Status</h2>
          <div className="text-red-500 font-medium">Reported as Full</div>
        </div>

        <div className="mb-6">
          <h2 className="font-medium mb-2">Estimated Pickup Time</h2>
          <div className="text-gray-500">Within 1hr</div>
        </div>

        <div className="flex justify-center">
          <Link href="/service-pickup" className="w-full px-4 py-2 bg-teal-700 text-white rounded-md text-center">
            Review
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-sm">
      <h1 className="text-xl font-medium mb-2">Report Bin Status</h1>
      <p className="text-gray-500 mb-6">Bin ID: BIN001 - Location: 123 Main St</p>

      <div className="mb-6">
        <div className="flex items-center mb-3">
          <input
            type="radio"
            id="empty"
            name="binStatus"
            className="mr-2"
            onChange={() => setBinStatus("empty")}
            checked={binStatus === "empty"}
          />
          <label htmlFor="empty">Empty</label>
        </div>

        <div className="flex items-center mb-3">
          <input
            type="radio"
            id="half"
            name="binStatus"
            className="mr-2"
            onChange={() => setBinStatus("half")}
            checked={binStatus === "half"}
          />
          <label htmlFor="half">Half Full</label>
        </div>

        <div className="flex items-center mb-3">
          <input
            type="radio"
            id="full"
            name="binStatus"
            className="mr-2"
            onChange={() => setBinStatus("full")}
            checked={binStatus === "full"}
          />
          <label htmlFor="full" className="flex items-center">
            <span className="mr-2">Full</span>
            {binStatus === "full" && <div className="w-4 h-4 bg-green-500 rounded-full"></div>}
          </label>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!binStatus}
        className="w-full px-4 py-2 bg-teal-700 text-white rounded-md disabled:opacity-50"
      >
        Submit Report
      </button>
    </div>
  )
}

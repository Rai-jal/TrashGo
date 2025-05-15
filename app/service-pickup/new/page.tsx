"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function NewPickup() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<null | "qr">(null)

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-sm">
      <h1 className="text-2xl font-medium mb-6">New Pickup Request</h1>

      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => setSelectedOption("qr")}
          className={`p-6 border rounded-md text-center hover:border-teal-500 transition-colors ${
            selectedOption === "qr" ? "border-teal-500 bg-teal-50" : ""
          }`}
        >
          <div className="text-lg font-medium mb-2">Pickup using QR Code scan</div>
          <p className="text-gray-500 text-sm">Scan the QR code on your bin to request a pickup</p>
        </button>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Link href="/service-pickup" className="px-4 py-2 border border-gray-300 rounded-md">
          Cancel
        </Link>
        <button
          onClick={() => {
            if (selectedOption === "qr") {
              router.push("/service-pickup/qr-scan")
            }
          }}
          disabled={!selectedOption}
          className="px-4 py-2 bg-teal-700 text-white rounded-md disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
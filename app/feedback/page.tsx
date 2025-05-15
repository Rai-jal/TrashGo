"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Feedback() {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [agentAttitude, setAgentAttitude] = useState("")
  const [improvement, setImprovement] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!rating) return

    try {
      setLoading(true)
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          agentAttitude,
          improvement,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit feedback")
      }

      setSubmitted(true)
      // In a real app, you would send this data to your backend
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (err) {
      console.error("Error submitting feedback:", err)
      setError("Failed to submit feedback. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-sm">
        <div className="text-center py-8">
          <h1 className="text-2xl font-medium mb-4">Thank You For Your Feedback!</h1>
          <p className="text-gray-500">Your feedback has been submitted successfully.</p>
          <p className="text-gray-500 mt-2">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-sm">
      <h1 className="text-xl font-medium mb-1">Service Feedback</h1>
      <p className="text-gray-500 mb-6">Help us improve our service by providing your feedback</p>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

      <div className="mb-6">
        <h2 className="font-medium mb-3">How would you rate our service</h2>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="text-2xl"
            >
              <Star
                className={`h-8 w-8 ${
                  (hoveredRating || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-medium mb-2">How was the agent's attitude?</h2>
        <textarea
          placeholder="please describe our agent..."
          className="w-full p-3 border rounded-md h-24"
          value={agentAttitude}
          onChange={(e) => setAgentAttitude(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <h2 className="font-medium mb-2">Where can we improve?</h2>
        <textarea
          placeholder="please suggest ways we can improve our service..."
          className="w-full p-3 border rounded-md h-24"
          value={improvement}
          onChange={(e) => setImprovement(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!rating || loading}
        className="w-full py-3 bg-teal-700 text-white rounded-md disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </div>
  )
}

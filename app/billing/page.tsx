"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Payment {
  id: string
  date: string
  description: string
  method: string
  amount: string
}

export default function Billing() {
  const [activeTab, setActiveTab] = useState<"payment" | "history">("payment")
  const [paymentMethod, setPaymentMethod] = useState<"orange" | "africell" | "qcell" | null>(null)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [amount, setAmount] = useState<"50" | "100" | "150" | null>(null)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (activeTab === "history") {
      fetchPayments()
    }
  }, [activeTab])

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/payments")

      if (!response.ok) {
        throw new Error("Failed to fetch payment history")
      }

      const data = await response.json()
      setPayments(data)
      setError(null)
    } catch (err) {
      console.error("Error fetching payments:", err)
      setError("Failed to load payment history. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    if (paymentMethod && phoneNumber && amount) {
      try {
        setLoading(true)
        const response = await fetch("/api/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            method: paymentMethod,
            phoneNumber,
          }),
        })

        if (!response.ok) {
          throw new Error("Payment failed")
        }

        setPaymentSuccess(true)
        setTimeout(() => {
          setPaymentSuccess(false)
        }, 3000)

        // Reset form
        setPhoneNumber("")
        setAmount(null)
        setPaymentMethod(null)
      } catch (err) {
        console.error("Error processing payment:", err)
        setError("Payment failed. Please try again.")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-md p-6">
      <h1 className="text-xl font-medium mb-1">Billing Information</h1>
      <p className="text-gray-500 mb-6">manage your payments and viewing billing history</p>

      <div className="flex mb-6">
        <button
          className={`flex-1 py-3 ${activeTab === "payment" ? "bg-sky-200 text-sky-800" : "bg-gray-100"}`}
          onClick={() => setActiveTab("payment")}
        >
          Make Payment
        </button>
        <button
          className={`flex-1 py-3 ${activeTab === "history" ? "bg-sky-200 text-sky-800" : "bg-gray-100"}`}
          onClick={() => setActiveTab("history")}
        >
          Billing history
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

      {activeTab === "payment" ? (
        <div>
          {paymentSuccess && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              Payment initiated successfully! You will receive a confirmation shortly.
            </div>
          )}

          <div className="mb-6">
            <h2 className="font-medium mb-3">Select Payment Method</h2>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="mr-2"
                  onChange={() => setPaymentMethod("orange")}
                  checked={paymentMethod === "orange"}
                />
                <div className="w-24 h-10 relative">
                  <Image src="/orange-01.png" alt="Orange" fill style={{ objectFit: "contain" }} />
                </div>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="mr-2"
                  onChange={() => setPaymentMethod("africell")}
                  checked={paymentMethod === "africell"}
                />
                <div className="w-24 h-10 relative">
                  <Image src="/africell_new_logo.png" alt="Africell" fill style={{ objectFit: "contain" }} />
                </div>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="mr-2"
                  onChange={() => setPaymentMethod("qcell")}
                  checked={paymentMethod === "qcell"}
                />
                <div className="w-24 h-10 relative">
                  <Image src="/qcell-gambia-data.png" alt="Qcell" fill style={{ objectFit: "contain" }} />
                </div>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-medium mb-2">Phone Number</h2>
            <input
              type="text"
              placeholder="Enter you phone number"
              className="w-full p-3 bg-gray-100 rounded-md"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <h2 className="font-medium mb-2">Amount</h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="amount"
                  className="mr-2"
                  onChange={() => setAmount("50")}
                  checked={amount === "50"}
                />
                Le 50 (Basic)
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="amount"
                  className="mr-2"
                  onChange={() => setAmount("100")}
                  checked={amount === "100"}
                />
                Le 100 (Standard)
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="amount"
                  className="mr-2"
                  onChange={() => setAmount("150")}
                  checked={amount === "150"}
                />
                Le 150 (Premium)
              </label>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={!paymentMethod || !phoneNumber || !amount || loading}
            className="w-full py-3 bg-sky-400 text-white rounded-md disabled:opacity-50"
          >
            {loading ? "Processing..." : "Initiate Payment"}
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-8">Loading payment history...</div>
          ) : payments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No payment history found.</div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-left">Method</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="py-3 px-4">{payment.date}</td>
                    <td className="py-3 px-4">{payment.description}</td>
                    <td className="py-3 px-4">{payment.method}</td>
                    <td className="py-3 px-4">{payment.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}

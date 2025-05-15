"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { QrCode } from "lucide-react"
import { Html5Qrcode } from "html5-qrcode"

export default function QrScan() {
  const router = useRouter()
  const [scanned, setScanned] = useState(false)
  const [binId, setBinId] = useState("")
  const [manualBinId, setManualBinId] = useState("")
  const [showManualInput, setShowManualInput] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [scannerMessage, setScannerMessage] = useState("Initializing camera...")

  const html5QrCode = useRef<Html5Qrcode | null>(null)
  const qrBoxRef = useRef<HTMLDivElement>(null)

  // Initialize scanner when component mounts
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Create scanner instance
    if (qrBoxRef.current && !html5QrCode.current) {
      html5QrCode.current = new Html5Qrcode("qr-reader")

      // Start scanner if not showing manual input
      if (!showManualInput) {
        startScanner()
      }
    }

    // Clean up function
    return () => {
      stopScanner()
    }
  }, [])

  const startScanner = async () => {
    if (!html5QrCode.current) return

    try {
      setError(null)
      setScannerMessage("Starting camera...")

      const qrCodeSuccessCallback = (decodedText: string) => {
        console.log(`QR Code detected: ${decodedText}`)

        // Validate if the QR code contains bin information
        // Check if it starts with BIN or contains bin information
        if (decodedText.toUpperCase().startsWith("BIN") || decodedText.toUpperCase().includes("BIN")) {
          // Extract the bin ID - if it starts with BIN, use as is, otherwise extract the bin part
          let binCode = decodedText.toUpperCase()
          if (!binCode.startsWith("BIN")) {
            // Try to extract bin ID using regex
            const binMatch = binCode.match(/BIN[0-9A-Z]+/i)
            if (binMatch) {
              binCode = binMatch[0]
            } else {
              // If no clear bin pattern, prefix with BIN
              binCode = "BIN" + binCode
            }
          }

          handleQrCodeDetected(binCode)
        } else {
          // QR code doesn't contain bin information
          setError("QR code does not contain bin information. Please scan a valid bin QR code.")
          // Don't stop the scanner, allow them to try again
          setScannerMessage("Please scan a valid bin QR code.")
        }
      }

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      }

      await html5QrCode.current.start({ facingMode: "environment" }, config, qrCodeSuccessCallback, (errorMessage) => {
        // This is called for non-fatal errors
        console.log(errorMessage)
      })

      setScannerMessage("Camera active. Point at a QR code.")
    } catch (err) {
      console.error("Error starting scanner:", err)
      setError(
        err instanceof Error
          ? `Camera error: ${err.message}. Try the manual input option.`
          : "Could not access camera. Please check permissions or use manual input.",
      )
      setShowManualInput(true)
    }
  }

  const stopScanner = async () => {
    if (html5QrCode.current && html5QrCode.current.isScanning) {
      try {
        await html5QrCode.current.stop()
        console.log("Scanner stopped")
      } catch (err) {
        console.error("Error stopping scanner:", err)
      }
    }
  }

  // Function to handle detected QR codes
  const handleQrCodeDetected = async (code: string) => {
    // Stop the scanner
    await stopScanner()

    setBinId(code)
    setLoading(true)

    try {
      // Create a pickup request for the scanned bin
      const response = await fetch("/api/pickup-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ binId: code }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create pickup request")
      }

      setScanned(true)
    } catch (err) {
      console.error("Error creating pickup request:", err)
      setError(err instanceof Error ? err.message : "Failed to create pickup request. Please try again.")
      // Restart scanner if there was an error
      startScanner()
    } finally {
      setLoading(false)
    }
  }

  // Handle manual bin ID submission
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (manualBinId.trim()) {
      let binCode = manualBinId.trim().toUpperCase()

      // Validate manual input
      if (!binCode.startsWith("BIN")) {
        binCode = "BIN" + binCode
      }

      // Check if the bin ID has a valid format (BIN followed by at least one character)
      if (!/^BIN.+/.test(binCode)) {
        setError("Please enter a valid bin ID (e.g., BIN001)")
        return
      }

      handleQrCodeDetected(binCode)
    }
  }

  // Toggle between scanner and manual input
  const toggleInputMethod = async () => {
    if (showManualInput) {
      setShowManualInput(false)
      startScanner()
    } else {
      await stopScanner()
      setShowManualInput(true)
    }
  }

  if (scanned) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-sm">
        <h1 className="text-xl font-medium mb-2">Scan Bin QR Code</h1>
        <p className="text-gray-500 mb-6">Scan the QR code on the bin to request a pickup</p>

        <div className="mb-4">
          <h2 className="font-medium mb-2">Scanned Bin</h2>
          <div className="p-3 bg-gray-50 border rounded-md">{binId}</div>
        </div>

        <div className="text-green-500 font-medium text-center my-6">Pickup request sent successfully!</div>

        <div className="flex justify-end">
          <Link href="/service-pickup" className="px-4 py-2 bg-teal-700 text-white rounded-md">
            Back to Requests
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-sm">
      <h1 className="text-xl font-medium mb-2">Scan Bin QR Code</h1>
      <p className="text-gray-500 mb-6">Scan the QR code on the bin to request a pickup</p>

      {!showManualInput && (
        <div className="mb-6">
          <div id="qr-reader" ref={qrBoxRef} style={{ width: "100%" }}></div>
          <p className="text-center text-sm mt-2">{scannerMessage}</p>
        </div>
      )}

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
      {loading && <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-md">Processing request...</div>}

      <div className="flex flex-col gap-4">
        <button
          onClick={toggleInputMethod}
          className="bg-teal-700 text-white px-4 py-2 rounded-md flex items-center gap-2 justify-center"
        >
          <QrCode className="h-5 w-5" />
          <span>{showManualInput ? "Use Camera Scanner" : "Enter Bin ID Manually"}</span>
        </button>

        {showManualInput && (
          <form onSubmit={handleManualSubmit} className="mt-4">
            <div className="mb-4">
              <label htmlFor="binId" className="block text-sm font-medium text-gray-700 mb-1">
                Enter Bin ID
              </label>
              <input
                type="text"
                id="binId"
                placeholder="e.g. BIN001"
                className="w-full p-2 border rounded-md"
                value={manualBinId}
                onChange={(e) => setManualBinId(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-700 text-white px-4 py-2 rounded-md"
              disabled={!manualBinId.trim()}
            >
              Submit
            </button>
          </form>
        )}
      </div>

      {!showManualInput && (
        <p className="text-center text-sm text-gray-500 mt-4">Position the QR code within the scanner view</p>
      )}
    </div>
  )
}

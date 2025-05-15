"use client"

import { useEffect, useRef } from "react"
import { Box, Typography } from "@mui/material"

export default function Chart() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Data for the chart
    const data = [65, 59, 80, 81, 56, 55, 40]
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
    const maxValue = Math.max(...data)
    const padding = 40

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.strokeStyle = "#ccc"
    ctx.stroke()

    // Draw bars
    const barWidth = (width - 2 * padding) / data.length - 10
    const barSpacing = 10

    data.forEach((value, index) => {
      const barHeight = ((height - 2 * padding) * value) / maxValue
      const x = padding + index * (barWidth + barSpacing)
      const y = height - padding - barHeight

      // Draw bar
      ctx.fillStyle = "#1976d2"
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw label
      ctx.fillStyle = "#666"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(labels[index], x + barWidth / 2, height - padding + 20)

      // Draw value
      ctx.fillStyle = "#333"
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5)
    })
  }, [])

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Monthly Revenue
      </Typography>
      <Box sx={{ width: "100%", height: "calc(100% - 40px)", position: "relative" }}>
        <canvas ref={canvasRef} width={500} height={200} style={{ width: "100%", height: "100%" }}></canvas>
      </Box>
    </Box>
  )
}

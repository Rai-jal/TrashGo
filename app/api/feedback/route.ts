import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { rating, agentAttitude, improvement } = body
    const userId = "mark@trashgo.com" // In a real app, get this from authentication

    const user = await prisma.user.findUnique({
      where: { email: userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const feedback = await prisma.feedback.create({
      data: {
        userId: user.id,
        rating,
        agentFeedback: agentAttitude,
        improvement,
      },
    })

    return NextResponse.json({
      success: true,
      feedback: {
        id: feedback.id,
        rating: feedback.rating,
      },
    })
  } catch (error) {
    console.error("Error submitting feedback:", error)
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 })
  }
}

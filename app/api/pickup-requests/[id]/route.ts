import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    const { status } = body
    const userId = "mark@trashgo.com" // In a real app, get this from authentication

    const user = await prisma.user.findUnique({
      where: { email: userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const pickupRequest = await prisma.pickupRequest.findUnique({
      where: { id },
      include: { bin: true },
    })

    if (!pickupRequest) {
      return NextResponse.json({ error: "Pickup request not found" }, { status: 404 })
    }

    if (pickupRequest.userId !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const updatedRequest = await prisma.pickupRequest.update({
      where: { id },
      data: {
        status,
        ...(status === "completed" ? { completedDate: new Date() } : {}),
      },
      include: { bin: true },
    })

    return NextResponse.json({
      id: updatedRequest.id,
      binId: updatedRequest.bin.binId,
      location: updatedRequest.bin.location,
      date: updatedRequest.requestDate.toISOString(),
      status: updatedRequest.status,
    })
  } catch (error) {
    console.error("Error updating pickup request:", error)
    return NextResponse.json({ error: "Failed to update pickup request" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const userId = "mark@trashgo.com" // In a real app, get this from authentication

  try {
    const user = await prisma.user.findUnique({
      where: { email: userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const whereClause: any = { userId: user.id }

    if (status) {
      if (status === "current") {
        whereClause.status = { in: ["pending", "in progress"] }
      } else if (status === "past") {
        whereClause.status = { in: ["completed", "cancelled"] }
      } else {
        whereClause.status = status
      }
    }

    const pickupRequests = await prisma.pickupRequest.findMany({
      where: whereClause,
      include: {
        bin: true,
      },
      orderBy: {
        requestDate: "desc",
      },
    })

    const formattedRequests = pickupRequests.map((request) => ({
      id: request.id,
      binId: request.bin.binId,
      location: request.bin.location,
      date: request.requestDate.toISOString(),
      status: request.status,
    }))

    return NextResponse.json(formattedRequests)
  } catch (error) {
    console.error("Error fetching pickup requests:", error)
    return NextResponse.json({ error: "Failed to fetch pickup requests" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { binId, status = "pending" } = body

    // Validate bin ID format
    if (!binId || typeof binId !== "string" || !binId.toUpperCase().startsWith("BIN")) {
      return NextResponse.json(
        {
          error: "Invalid bin ID format. Bin ID must start with 'BIN'",
        },
        { status: 400 },
      )
    }

    const userId = "mark@trashgo.com" // In a real app, get this from authentication

    const user = await prisma.user.findUnique({
      where: { email: userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Find the bin by binId
    const bin = await prisma.bin.findUnique({
      where: { binId },
    })

    if (!bin) {
      // For testing purposes, if the bin doesn't exist, create it
      console.log(`Bin ${binId} not found, creating it...`)
      const newBin = await prisma.bin.create({
        data: {
          binId,
          location: "New Location",
          userId: user.id,
        },
      })

      const pickupRequest = await prisma.pickupRequest.create({
        data: {
          binId: newBin.id,
          userId: user.id,
          status,
          requestDate: new Date(),
        },
      })

      return NextResponse.json({
        id: pickupRequest.id,
        binId,
        status: pickupRequest.status,
        date: pickupRequest.requestDate.toISOString(),
        message: "Pickup request created successfully with new bin",
      })
    }

    // Check if there's already a pending or in-progress request for this bin
    const existingRequest = await prisma.pickupRequest.findFirst({
      where: {
        binId: bin.id,
        status: { in: ["pending", "in progress"] },
      },
    })

    if (existingRequest) {
      return NextResponse.json(
        {
          error: "There is already an active pickup request for this bin",
          existingRequest: {
            id: existingRequest.id,
            status: existingRequest.status,
            date: existingRequest.requestDate.toISOString(),
          },
        },
        { status: 409 },
      ) // 409 Conflict
    }

    const pickupRequest = await prisma.pickupRequest.create({
      data: {
        binId: bin.id,
        userId: user.id,
        status,
        requestDate: new Date(),
      },
    })

    return NextResponse.json({
      id: pickupRequest.id,
      binId,
      status: pickupRequest.status,
      date: pickupRequest.requestDate.toISOString(),
      message: "Pickup request created successfully",
    })
  } catch (error) {
    console.error("Error creating pickup request:", error)
    return NextResponse.json({ error: "Failed to create pickup request" }, { status: 500 })
  }
}

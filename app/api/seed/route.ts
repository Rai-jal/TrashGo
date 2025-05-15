import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Create a test user
    const user = await prisma.user.upsert({
      where: { email: "mark@trashgo.com" },
      update: {},
      create: {
        name: "Mark",
        email: "mark@trashgo.com",
      },
    })

    // Create bins
    const bin1 = await prisma.bin.upsert({
      where: { binId: "BIN001" },
      update: {},
      create: {
        binId: "BIN001",
        location: "24 Free Town Rd",
        userId: user.id,
      },
    })

    const bin2 = await prisma.bin.upsert({
      where: { binId: "BIN002" },
      update: {},
      create: {
        binId: "BIN002",
        location: "24 Free Town Rd",
        userId: user.id,
      },
    })

    const bin3 = await prisma.bin.upsert({
      where: { binId: "BIN003" },
      update: {},
      create: {
        binId: "BIN003",
        location: "15 Main St",
        userId: user.id,
      },
    })

    // Create pickup requests
    await prisma.pickupRequest.createMany({
      skipDuplicates: true,
      data: [
        {
          binId: bin1.id,
          userId: user.id,
          status: "pending",
          requestDate: new Date("2024-09-10T14:30:00"),
        },
        {
          binId: bin2.id,
          userId: user.id,
          status: "in progress",
          requestDate: new Date("2024-11-10T16:30:00"),
        },
        {
          binId: bin1.id,
          userId: user.id,
          status: "completed",
          requestDate: new Date("2024-08-15T10:30:00"),
          completedDate: new Date("2024-08-15T14:30:00"),
        },
        {
          binId: bin3.id,
          userId: user.id,
          status: "completed",
          requestDate: new Date("2024-08-10T09:15:00"),
          completedDate: new Date("2024-08-10T11:30:00"),
        },
        {
          binId: bin2.id,
          userId: user.id,
          status: "completed",
          requestDate: new Date("2024-07-28T14:00:00"),
          completedDate: new Date("2024-07-28T16:45:00"),
        },
        {
          binId: bin1.id,
          userId: user.id,
          status: "cancelled",
          requestDate: new Date("2024-07-15T11:45:00"),
        },
      ],
    })

    // Create payments
    await prisma.payment.createMany({
      skipDuplicates: true,
      data: [
        {
          userId: user.id,
          amount: 50,
          method: "orange",
          description: "Monthly",
          paymentDate: new Date("2025-01-22"),
        },
        {
          userId: user.id,
          amount: 25,
          method: "qcell",
          description: "Special Pickup",
          paymentDate: new Date("2025-01-25"),
        },
        {
          userId: user.id,
          amount: 50,
          method: "orange",
          description: "Monthly",
          paymentDate: new Date("2025-02-01"),
        },
      ],
    })

    return NextResponse.json({ success: true, message: "Database seeded successfully" })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ success: false, error: "Failed to seed database" }, { status: 500 })
  }
}

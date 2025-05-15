import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  const userId = "mark@trashgo.com" // In a real app, get this from authentication

  try {
    const user = await prisma.user.findUnique({
      where: { email: userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const payments = await prisma.payment.findMany({
      where: { userId: user.id },
      orderBy: { paymentDate: "desc" },
    })

    const formattedPayments = payments.map((payment) => ({
      id: payment.id,
      date: payment.paymentDate.toISOString().split("T")[0],
      description: payment.description,
      method: payment.method === "orange" ? "Orange Money" : payment.method === "africell" ? "Africell" : "Qcell",
      amount: `Le ${payment.amount}`,
    }))

    return NextResponse.json(formattedPayments)
  } catch (error) {
    console.error("Error fetching payments:", error)
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, method, phoneNumber } = body
    const userId = "mark@trashgo.com" // In a real app, get this from authentication

    const user = await prisma.user.findUnique({
      where: { email: userId },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        amount: Number.parseFloat(amount),
        method,
        description: "Monthly",
        paymentDate: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount,
        method: payment.method,
        date: payment.paymentDate.toISOString(),
      },
    })
  } catch (error) {
    console.error("Error creating payment:", error)
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}

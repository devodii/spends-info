import db from "@/lib/db"
import { feedback } from "@/lib/schema"
import { nanoid } from "nanoid"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const ipAddress = req.headers.get("x-forwarded-for") as string

    await db.insert(feedback).values({
      id: `fe_${nanoid(6)}`,
      comment: body["comment"],
      ip_address: ipAddress,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log({ error })
    return NextResponse.json({ success: false })
  }
}

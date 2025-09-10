import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body.id;

    return NextResponse.json({
      success: true,
      msg: `Got id ${id}`,
    });
  } catch {
    return NextResponse.json({
      success: false,
      msg: "NOOOOOOOOOOO",
    });
  }
}
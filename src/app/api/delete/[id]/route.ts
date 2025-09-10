import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const name = body.name ?? null;

    await deleteDoc(doc(db, "words", id));

    return NextResponse.json({
      success: true,
      msg: `Poo made ${name ? name.toUpperCase() : "it"} vanish!`,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        msg: "Something went wrong, Pee is lost in the fields!",
      },
      { status: 500 },
    );
  }
}

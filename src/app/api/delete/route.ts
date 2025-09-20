import { adminDb } from "@/lib/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const authHeader = req.headers.get("Authorization") || "";
  const idToken = authHeader.split("Bearer ")[1];

  const decodedToken = await getAuth().verifyIdToken(idToken);
  const uid = decodedToken.uid;

  try {
    if (uid !== "CDe6wWAC2Uej7ww6faL7Qn0VYPt1")
      return NextResponse.json(
        {
          success: false,
          msg: `Unauthorized! Pee and Poo are protecting the data!`,
        },
        { status: 403 },
      );

    const body = await req.json();
    const { name, id } = body ?? null;

    await adminDb.doc(`words/${id}`).delete();

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

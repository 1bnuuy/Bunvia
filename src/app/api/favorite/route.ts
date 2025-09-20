import { adminDb } from "@/lib/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
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
    const { name, favorite, id } = body ?? null;

    await adminDb.doc(`words/${id}`).update({ favorite: !favorite });

    return NextResponse.json({
      success: true,
      msg: !favorite
        ? `Favorited! Poo put a bow on ${name.toUpperCase()}.`
        : `${name.toUpperCase()} is no longer a favorite, but still adorable!`,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        msg: "Poo chewed the cable connected to our burrow!!!",
      },
      { status: 500 },
    );
  }
}

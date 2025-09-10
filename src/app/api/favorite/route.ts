import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
) {
  try {
    const body = await req.json();
    const { name, favorite, id } = body ?? null;

    const wordRef = doc(db, "words", id);
    await updateDoc(wordRef, {
      favorite: !favorite,
    });

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

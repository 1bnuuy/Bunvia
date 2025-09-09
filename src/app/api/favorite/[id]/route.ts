import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const { name, favorite } = body ?? null;

    const wordRef = doc(db, "words", params.id);
    await updateDoc(wordRef, {
      favorite: !favorite,
    });

    if (!favorite) {
      return NextResponse.json({
        success: true,
        msg: `Favorited! Poo put a bow on ${name.toUpperCase()}.`,
      });
    } else {
      return NextResponse.json({
        success: true,
        msg: `${name.toUpperCase()} is no longer a favorite, but still adorable!`,
      });
    }
  } catch (_error) {
    return NextResponse.json(
      {
        success: false,
        msg: "Poo chewed the cable connected to our burrow!!!",
      },
      { status: 500 },
    );
  }
}

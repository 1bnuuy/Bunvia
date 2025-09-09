import { db } from "@/lib/firebase";
import { DateCreated } from "@/lib/variables";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, type, tag } = body;

    const blankFields: string[] = [];

    //Check fields
    if (!name || typeof name !== "string" || !name.trim())
      blankFields.push("Name");
    if (
      !type ||
      (Array.isArray(type) && type.length === 0) ||
      (typeof type === "string" && !type.trim())
    )
      blankFields.push("Class");

    if (blankFields.length) {
      return NextResponse.json(
        {
          success: false,
          msg: `Hoppy mistake! ${blankFields.join(", ")} ${blankFields.length > 1 ? "fields are" : "field is"} still blank!`,
        },
        { status: 400 },
      );
    }

    //Check duplication
    const formattedName = name.trim().toLowerCase();

    const wordsRef = collection(db, "words");
    const q = query(wordsRef, where("name", "==", formattedName));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return NextResponse.json(
        {
          success: false,
          msg: "This word already exists! Pee and Poo won't let it in!",
        },
        { status: 409 },
      );
    }

    const newWord = {
      tag,
      name: formattedName,
      type,
      date: DateCreated,
      favorite: false,
    };

    //Add words
    await addDoc(wordsRef, newWord);

    return NextResponse.json(
      {
        success: true,
        msg: `${newWord.name.toUpperCase()} has been created, Pee hugs it tight!`,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        msg: "Internal server error, Pee is trying to fix it!",
      },
      { status: 500 },
    );
  }
}

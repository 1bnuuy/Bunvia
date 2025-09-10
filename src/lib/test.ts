import { ApiResponseTypes, WordTypes } from "./types";

export async function Test(word: WordTypes) {
  try {
    const res = await fetch(`/api/test`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: word.id,
      }),
    });

    const result: ApiResponseTypes = await res.json().catch(() => null);

    if (result?.success) {
      console.log("success");
    } else {
      console.log("failed");
    }
  } catch {
    console.log("error");
  }
}

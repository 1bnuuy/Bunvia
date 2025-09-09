import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function signInYes(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Signed in:", userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error("Error signing in:", error.message);
    throw error;
  }
}
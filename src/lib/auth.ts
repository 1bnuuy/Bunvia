import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AuthTypes, ToastContextTypes } from "./types";
import { auth } from "./firebase";

export async function AdminSignIn(
  email: AuthTypes["email"],
  password: AuthTypes["password"],
  toastPopUp: ToastContextTypes["toastPopUp"],
) {
  try {
    await setPersistence(auth, browserLocalPersistence);

    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    toastPopUp({
      success: true,
      msg: "Pee and Poo say 'hi' to their admin!",
    });

    return userCredentials.user;
  } catch {
    toastPopUp({
      success: false,
      msg: "Pee and Poo couldn't match email and password!",
    });
  }
}

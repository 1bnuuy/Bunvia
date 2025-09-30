import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AuthTypes, ToastContextTypes } from "./globalTypes";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";

export async function AdminSignIn(
  email: AuthTypes["email"],
  password: AuthTypes["password"],
  toastPopUp: ToastContextTypes["toastPopUp"],
  router: ReturnType<typeof useRouter>,
) {
  try {
    await setPersistence(auth, browserLocalPersistence);

    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    router.push("/dictionary");

    return userCredentials.user;
  } catch {
    toastPopUp({
      success: false,
      msg: "Pee and Poo couldn't match email and password!",
    });
  }
}

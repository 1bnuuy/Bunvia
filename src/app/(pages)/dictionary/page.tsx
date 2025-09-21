"use client"

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import AdminDictionary from "./admin";
import UserDictionary from "./user";

export default function Dictionary() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const check = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.uid !== "CDe6wWAC2Uej7ww6faL7Qn0VYPt1") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => check();
  }, []);

  return isAdmin ? <AdminDictionary /> : <UserDictionary />;
}

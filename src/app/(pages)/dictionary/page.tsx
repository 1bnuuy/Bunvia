"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import AdminDictionary from "./admin";
import UserDictionary from "./user";
import Loading from "./dictLoad";

export default function Dictionary() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  useEffect(() => {
    const check = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.uid === "CDe6wWAC2Uej7ww6faL7Qn0VYPt1") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => check();
  }, []);

  return isAdmin === null ? (
    <Loading />
  ) : isAdmin ? (
    <AdminDictionary />
  ) : (
    <UserDictionary />
  );
}

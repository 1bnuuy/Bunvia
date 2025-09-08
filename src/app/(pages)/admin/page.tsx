"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLogin() {
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // sign out anonymous bunny 🐇
      await signOut(auth);

      // log in with your admin account
      const email = "kiddolol39@gmail.com"; // Pee & Poo’s secret burrow
      await signInWithEmailAndPassword(auth, email, password);

      console.log("Pee & Poo say: Admin bunny logged in! 🐇👑");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <section>
      <h1>Admin Login 🐰</h1>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Hop In</button>
      </form>
    </section>
  );
}
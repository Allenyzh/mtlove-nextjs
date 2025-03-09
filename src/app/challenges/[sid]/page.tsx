"use client";
import NavBar from "../../components/NavBar";
import Chat from "../../components/Chat";
import { useState } from "react";

export default function page() {
  const [score, setScore] = useState<number>(0);

  return (
    <main className="flex flex-column justify-content-center align-content-center h-screen">
      <NavBar score={score} setScore={setScore} />
      <Chat score={score} setScore={setScore} />
    </main>
  );
}

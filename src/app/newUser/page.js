"use client";

import axios from "axios";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Page() {
  const createUser = async (id) => {
    try {
      const response = await axios.post(
        "https://bouquetgen.vercel.app/dbApi/createUser",
        {
          id
        }
      );
    } catch (error) {
      console.error(":( fail on new user page", error);
    }
  };

  const { userId } = useAuth();

  if (!userId) redirect("/");

  createUser(userId);

  redirect("/");

  return (
    <main>

    </main>
  )
}

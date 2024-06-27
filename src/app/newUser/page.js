"use client";

import axios from "axios";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const createUser = async (userId) => {
  try {
    const response = await axios.post("/dbApi/createUser", { id: userId });
  } catch (error) {
    console.error(":( fail on new user page", error);
  }
};

export default function Page() {
  const { userId } = useAuth();

  if (!userId) redirect("/");

  createUser(userId);

  redirect("/");
}

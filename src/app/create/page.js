"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import FlowerSuggestionsArr from "@/components/FlowerSuggestionsArr";


export default function Page() {
  return (
    <main className="flex-col items-center md:px-0">
      <Navbar />
      <FlowerSuggestionsArr />
    </main>
  );
}

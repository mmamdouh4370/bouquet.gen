"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import SavedBouquet from "./SavedBouquet";

export default function SavedBouquetArr() {
  const [components, setComponents] = useState([]);
  const { isSignedIn, userId } = useAuth();
  const [loading, setLoading] = useState(true);

  const unsaveComponent = async (bouquetId) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/dbApi/unsaveBouquet",
        {
          params: { userId, bouquetId },
        }
      );
    } catch (error) {
      console.log("unsave failed :<");
    }
    console.log(userId);
    console.log(bouquetId);
    setComponents(components.filter((component) => component.id != bouquetId));
  };

  useEffect(() => {
    async function fetchData() {
      console.log("fetching");
      try {
        const response = await axios.get(
          "http://localhost:3000/dbApi/getSavedBouquet",
          {
            params: { userId },
          }
        );
        setComponents(response.data.bouquets);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching saved bouquets:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="space-y-2">
        {components.map((component) => (
          <SavedBouquet
            key={component.id}
            id={component.id}
            data={component.bouquet}
            onUnsave={() => unsaveComponent(component.id)}
          />
        ))}
      </div>
    </div>
  );
}

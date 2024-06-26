"use client";

import { useState } from "react";
import axios from "axios";
import CreateBouquet from "./CreateBouquet";

export default function CreateBouquetArr() {
  const [components, setComponents] = useState([<CreateBouquet key={0} />]);

  const addComponent = () => {
    const newComponent = <CreateBouquet key={components.length} />;
    setComponents([...components, newComponent]);
  };

  const removeComponent = (id) => {
    setComponents(components.filter((component) => component.key != id));
  };

  const saveComponent = async (userId, bouquet) => {
    console.log(bouquet);
    try {
      const response = await axios.post(
        "http://localhost:3000/dbApi/saveBouquet",
        {
          userId,
          bouquet,
        }
      );
    } catch (error) {
      console.log("save failed :<", error);
    }
  };

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

  return (
    <div>
      <div className="space-y-2">
        {components.map((component) => (
          <CreateBouquet
            key={component.key}
            id={component.key}
            onSave={saveComponent}
            onAdd={addComponent}
            onRemove={() => removeComponent(component.key)}
          />
        ))}
      </div>
    </div>
  );
}

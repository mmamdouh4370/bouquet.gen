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
        "/dbApi/saveBouquet",
        {
          userId,
          bouquet,
        }
      );
    } catch (error) {
      console.log("save failed :<", error);
    }
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

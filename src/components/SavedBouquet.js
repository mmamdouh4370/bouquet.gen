"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

import TrashOutline from "./ui/TrashOutline.js";

export default function SavedBouquet({ id, data, onUnsave }) {
  const [savedBouquets, setSavedBouquets] = useState([]);
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const flowerList = [];
    for (let i = 1; i <= data.numOfFlowers; i++) {
      flowerList.push({
        name: data[`flower${i}Name`],
        description: data[`flower${i}Desc`],
        img: data[`flower${i}Img`],
      });
    }
    setFlowers(flowerList);
  }, [data]);

  return (
    <section className="relative flex-1 flex-col w-full flex bg-bone h-[32rem] rounded-md">
      <div className="absolute top-7 right-7 flex space-y-0 space-x-3 z-10 text-tahit">
        <button onClick={onUnsave}>
          <TrashOutline />
        </button>
      </div>
      <div className="flex flex-1 flex-wrap justify-center items-center rounded border-[0.1px] border-lightcream">
        {flowers.map((flower, index) => (
          <div
            key={index}
            className="relative flex-grow basis-0 h-[32rem] text-center flex flex-col justify-center px-4 break-all"
          >
            <div className="absolute inset-0 overflow-hidden border-tahit">
              <div
                className="absolute inset-0 bg-cover blur-sm"
                style={{
                  backgroundImage: `url("${flower.img}")`,
                }}
              ></div>
            </div>
            <div className="absolute inset-0 bg-black opacity-60 hover:opacity-90"></div>
            <div className="relative z-10 space-y-4  flex flex-col">
              <h2 className="text-5xl text-cream font-bold ">{flower.name}</h2>
              <p className="text-offwhite text-3xl z-10 ">
                {flower.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

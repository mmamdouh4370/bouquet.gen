"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/navbar";
import axios from "axios";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [flowers, setFlowers] = useState([]);

  const process = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/gen", { prompt: inputText });
      console.log(response);
      const parsedData = JSON.parse(response.data.response);
      const flowerData = parseFlowerData(parsedData);
      setFlowers(flowerData);
      setIsSubmitted(true);
    } catch (error) {
      console.log("nooooooo :( ", error);
    } finally {
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 2000);
      setIsLoading(false);
    }
  };

  const parseFlowerData = (data) => {
    const flowerList = [];
    for (let i = 1; i <= data.numOfFlowers; i++) {
      flowerList.push({
        name: data[`flower${i}Name`],
        description: data[`flower${i}Desc`],
      });
    }
    return flowerList;
  };

  return (
    <main className="flex-col items-center md:px-0">
      <Navbar />
      <section className="relative flex-1 flex-col w-full flex justify-center items-center space-y-5 bg-bone h-[32rem]">
        {!isSubmitted ? (
          <div className="relative flex-1 flex-col w-full flex justify-center items-center space-y-5">
            <h1 className="text-2xl text-tahit/90">
              Generate your unique bouquet!
            </h1>
            <form
              onSubmit={process}
              className="flex flex-col justify-center items-center"
            >
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="shadow appearance-none border rounded text-tahit leading-tight text-3xl mb-3 focus:outline-none focus:shadow-outline pl-4"
                type="text"
                placeholder="Enter your prompt"
                style={{ width: "800px", height: "100px" }}
              />
              <button
                type="submit"
                className="text-xl px-6 py-3 rounded text-offwhite bg-tahit mt-4"
                style={{ width: "150px" }}
              >
                Generate
              </button>
            </form>
          </div>
        ) : (
          <div>
            {isLoading ? (
              <p className="text-2xl text-tahit/90">Processing.....</p>
            ) : (
              <div className="flex flex-wrap justify-center">
                {flowers.map((flower, index) => (
                  <div key={index} className="space-y-0 flex-1 mx-2 h-full p-4 bg-white text-center">
                    <h2 className="text-xl font-bold">{flower.name}</h2>
                    <p>{flower.description}</p>
                  </div>
                ))}
              </div>
            )}

          </div>

        )}
      </section>
    </main>
  );
}

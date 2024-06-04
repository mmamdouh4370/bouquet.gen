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
      const tmpResponse = {
        "numOfFlowers": "5",
        "flower1Name": "Roses",
        "flower2Name": "Carnations",
        "flower3Name": "Daisies",
        "flower4Name": "Chrysanthemums",
        "flower5Name": "Lilies",
        "flower1Desc": "Roses symbolize love and joy, perfect for celebrating a new addition to the family.",
        "flower2Desc": "Carnations represent admiration and love, suitable for a joyous occasion like a baby shower.",
        "flower3Desc": "Daisies symbolize innocence and purity, reflecting the innocence of a new baby.",
        "flower4Desc": "Chrysanthemums symbolize loyalty and longevity, expressing best wishes for the future.",
        "flower5Desc": "Lilies signify new beginnings and purity, ideal for welcoming a new member into the family."
      };
      // const response = await axios.post("http://127.0.0.1:5000/api/gen", { prompt: inputText });
      // console.log(response.data.response);
      // const parsedData = JSON.parse(response.data.response);
      // const flowerData = parseFlowerData(parsedData);
      const flowerData = parseFlowerData(tmpResponse);
      setFlowers(flowerData);
      setIsSubmitted(true);
    } catch (error) {
      console.log("nooooooo :( ", error);
    } finally {
      // Need to fix this, proccesing anim never gets to play due to how isLoading being true never gets to the html
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
              <div className="flex flex-1 flex-wrap justify-center items-center">
                {flowers.map((flower, index) => (
                  <div key={index} className="flex-1 h-[32rem] bg-gray-300 text-center flex flex-col justify-center border px-5">
                    <h2 className="text-xl text-tahit font-bold">{flower.name}</h2>
                    <p className="text-tahit">{flower.description}</p>
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

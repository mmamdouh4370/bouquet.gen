"use client";

import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

import Heart from "./ui/Heart.js";
import HeartOutline from "./ui/HeartOutline.js";
import Plus from "./ui/Plus.js";
import TrashOutline from "./ui/TrashOutline.js";

export default function CreateBouquet({ id, onSave, onAdd, onRemove }) {
  const { isSignedIn, userId } = useAuth();
  const [inputText, setInputText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [flowers, setFlowers] = useState([]);
  const [jsonString, setJsonString] = useState("");

  const process = async (event) => {
    event.preventDefault();
    try {
      // const tmpResponse = {
      //   numOfFlowers: "6",
      //   flower1Name: "White Roses",
      //   flower2Name: "Blue Hydrangeas",
      //   flower3Name: "Calla Lilies",
      //   flower4Name: "Daffodils",
      //   flower5Name: "Iris",
      //   flower6Name: "Chrysanthemums",
      //   flower1Desc: "White Roses symbolize purity and new beginnings.",
      //   flower2Desc:
      //     "Blue Hydrangeas represent gratitude and heartfelt emotions.",
      //   flower3Desc: "Calla Lilies signify devotion and celebration.",
      //   flower4Desc: "Daffodils symbolize new beginnings and good fortune.",
      //   flower5Desc: "Irises symbolize faith, hope, and wisdom.",
      //   flower6Desc: "Chrysanthemums symbolize loyalty and love for family.",
      //   flower1Img:
      //     "https://www.realsimple.com/thmb/4lo5tC9pfPrPR8Xi2If8xC3pXWA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/daisey-flowers-GettyImages-1297653483-c905af6eaa9044378988a1316b7f01d7.jpg",
      //   flower2Img:
      //     "https://www.realsimple.com/thmb/4lo5tC9pfPrPR8Xi2If8xC3pXWA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/daisey-flowers-GettyImages-1297653483-c905af6eaa9044378988a1316b7f01d7.jpg",
      //   flower3Img:
      //     "https://www.bhg.com/thmb/Bw49DwP2S0BNy2nOvp-NSSaoIMA=/1858x0/filters:no_upscale():strip_icc()/two-Calla-lilies-b8c6af449bb14de7a83a86e7d7c8a3d1.jpg",
      //   flower4Img:
      //     "https://www.realsimple.com/thmb/4lo5tC9pfPrPR8Xi2If8xC3pXWA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/daisey-flowers-GettyImages-1297653483-c905af6eaa9044378988a1316b7f01d7.jpg",
      //   flower5Img:
      //     "https://www.realsimple.com/thmb/4lo5tC9pfPrPR8Xi2If8xC3pXWA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/daisey-flowers-GettyImages-1297653483-c905af6eaa9044378988a1316b7f01d7.jpg",
      //   flower6Img:
      //     "https://www.realsimple.com/thmb/4lo5tC9pfPrPR8Xi2If8xC3pXWA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/daisey-flowers-GettyImages-1297653483-c905af6eaa9044378988a1316b7f01d7.jpg",
      // };

      const response = await axios.post("/api/gen", {
        prompt: inputText,
      });

      //console.log(response.data);
      setJsonString(response.data);
      const parsedData = JSON.parse(response.data);
      const flowerData = parseFlowerData(parsedData);

      //const flowerData = parseFlowerData(tmpResponse);

      setFlowers(flowerData);
      setIsSubmitted(true);
    } catch (error) {
      console.log("nooooooo :( ", error);
    } finally {
      // Handle loading anim
    }
  };

  const parseFlowerData = (data) => {
    const flowerList = [];
    for (let i = 1; i <= data.numOfFlowers; i++) {
      flowerList.push({
        name: data[`flower${i}Name`],
        description: data[`flower${i}Desc`],
        img: data[`flower${i}Img`],
      });
    }
    return flowerList;
  };

  const save = () => {
    if (isSignedIn) {
      if (isSaved) {
        setIsSaved(false);
      } else {
        setIsSaved(true);
        onSave(userId, jsonString);
      }
    }
  };

  return (
    <section className="relative flex-1 flex-col w-full flex bg-bone h-[32rem] rounded-md">
      <div className="absolute top-7 right-7 flex space-y-0 space-x-3 z-10 text-tahit">
        <button onClick={onAdd}>
          <Plus />
        </button>
        {isSubmitted && (
          <button onClick={save}>
            {isSaved ? <Heart /> : <HeartOutline />}
          </button>
        )}
        {id != 0 && (
          <button onClick={onRemove}>
            <TrashOutline />
          </button>
        )}
      </div>

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
              className="shadow appearance-none border rounded text-tahit leading-tight 
                           text-3xl mb-3 focus:outline-none focus:shadow-outline pl-4"
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
        <div className="flex flex-1 flex-wrap justify-center items-center rounded border-[0.1px] border-lightcream">
          {flowers.map((flower, index) => (
            <div
              key={index}
              className="relative flex-grow basis-0 h-[32rem] text-center flex flex-col justify-center px-4 break-all"
            >
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover blur-sm"
                  style={{
                    backgroundImage: `url("${flower.img}")`,
                  }}
                ></div>
              </div>
              <div className="absolute inset-0 bg-black opacity-60 hover:opacity-90 "></div>
              <div className="relative z-10 space-y-4 flex flex-col">
                <h2 className="text-5xl text-cream font-bold break-all">
                  {flower.name}
                </h2>
                <p className="text-offwhite text-3xl z-10">
                  {flower.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

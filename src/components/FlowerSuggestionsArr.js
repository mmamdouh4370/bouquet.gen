"use client";

import { useState } from "react";
import axios from "axios";



const FlowerSuggestions = ({ id, onAdd, onRemove }) => {
  const [inputText, setInputText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [flowers, setFlowers] = useState([]);
  
  const process = async (event) => {
    event.preventDefault();
    <p id="loadingAnim" className="text-2xl text-tahit/90">Processing.....</p>
    try {
      // const tmpResponse = {"numOfFlowers": "6", "flower1Name": "White Roses", "flower2Name": "Blue Hydrangeas", "flower3Name": "Calla Lilies", "flower4Name": "Daffodils", "flower5Name": "Iris", "flower6Name": "Chrysanthemums", "flower1Desc": "White Roses symbolize purity and new beginnings.", "flower2Desc": "Blue Hydrangeas represent gratitude and heartfelt emotions.", "flower3Desc": "Calla Lilies signify devotion and celebration.", "flower4Desc": "Daffodils symbolize new beginnings and good fortune.", "flower5Desc": "Irises symbolize faith, hope, and wisdom.", "flower6Desc": "Chrysanthemums symbolize loyalty and love for family.", "flower1Img": "https://m.media-amazon.com/images/I/713HM3r9nKL._AC_UF894,1000_QL80_.jpg", "flower2Img": "https://www.brighterblooms.com/cdn/shop/products/Nikko_Blue_Hydrangea_1_BB.jpg?v=1572546302&width=1000", "flower3Img": "https://www.bhg.com/thmb/Bw49DwP2S0BNy2nOvp-NSSaoIMA=/1858x0/filters:no_upscale():strip_icc()/two-Calla-lilies-b8c6af449bb14de7a83a86e7d7c8a3d1.jpg", "flower4Img": "https://cdn11.bigcommerce.com/s-1b9100svju/product_images/uploaded_images/img-3733.jpeg", "flower5Img": "https://my.clevelandclinic.org/-/scassets/Images/org/health/articles/22502-iris", "flower6Img": "https://www.gardendesign.com/pictures/images/675x529Max/site_3/paradiso-pink-mum-fall-flower-proven-winners_14469.jpg"} 
      // const flowerData = parseFlowerData(tmpResponse);
      const response = await axios.post("http://127.0.0.1:5000/api/gen", { prompt: inputText });
      console.log(response.data);
      const parsedData = JSON.parse(response.data);
      const flowerData = parseFlowerData(parsedData);
      
      setFlowers(flowerData);
      setIsSubmitted(true);
    } catch (error) {
      console.log("nooooooo :( ", error);
    } finally {
      
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

  return (
      <section className="relative flex-1 flex-col w-full flex bg-bone h-[32rem] rounded">
        <div className="absolute top-7 right-7 flex space-y-0 space-x-3 z-10">
            <button className="text-tahit" onClick={onAdd}>Add</button>
            {id != 0 && (
                <button className="text-tahit" onClick={onRemove}>Remove</button>
            )}
        </div>
        
        {!isSubmitted ? (
          <div className="relative flex-1 flex-col w-full flex justify-center items-center space-y-5">
            <h1 className="text-2xl text-tahit/90">
              {id} Generate your unique bouquet! 
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
              <div key={index} className="relative flex-1 h-[32rem] text-center flex flex-col justify-center px-4 max-w-sm">
                <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover blur-sm"
                  style={{
                    backgroundImage: `url(${flower.img})`,
                  }}
                ></div>
              </div>
                <div className="absolute inset-0 bg-black opacity-60 hover:opacity-90"></div>
                <div className="relative z-10 space-y-4 break-words flex flex-col">
                  <h2 className="text-5xl text-cream font-bold break-words">{flower.name}</h2>
                  <p className="text-offwhite text-3xl z-10 break-words">{flower.description}</p>
                </div>
              </div>
            ))}
          </div>
        
        )}
      </section>
  );
}

export default function FlowerSuggestionsArr() {
    const [components, setComponents] = useState([<FlowerSuggestions key={0} />]);

    const addComponent = () => {
        const newComponent = <FlowerSuggestions key={components.length}/>;
        setComponents([...components, newComponent]);
    };

    const removeComponent = (id) => {
        setComponents(components.filter(component => component.key != id));
    };

    return (
        <div>
            <div className="space-y-2">
                {components.map(component => (
                    <FlowerSuggestions key={component.key} id={component.key} onAdd={addComponent} onRemove={() => removeComponent(component.key)} />
                ))}
            </div>
        </div>
    );
}

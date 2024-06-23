export function parseFlowerData(data) {
  const flowerList = [];
  for (let i = 1; i <= data.numOfFlowers; i++) {
    flowerList.push({
      name: data[`flower${i}Name`],
      description: data[`flower${i}Desc`],
      img: data[`flower${i}Img`],
    });
  }
  return flowerList;
}

const fs = require("fs");
const path = require("path");
const baseUrl = "/portfolio";
const galleryRoot = path.join(__dirname, "..", "static", "images");

function getImages(folder) {
  const dir = path.join(__dirname, "..", "static", "images", folder);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file))
    .sort((a, b) => {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    })
    .map(file => baseUrl + `/static/images/${folder}/${file}`);
}

function getPairedImages(folder, frontPattern, backPattern) {
  const files = fs.readdirSync(path.join(galleryRoot, folder));
  const fronts = files.filter(f => frontPattern.test(f));
  const backs = files.filter(f => backPattern.test(f));
  
  // Create a map of identifier -> back filename
  const backMap = new Map();
  backs.forEach(back => {
    // Extract identifier (e.g., "james" from "back_james.jpg")
    const match = back.match(/back_(.+?)\./);
    if (match) {
      backMap.set(match[1], back);
    }
  });
  
  return fronts.map(front => {
    // Extract identifier from front (e.g., "james" from "front_james.jpg")
    const match = front.match(/front_(.+?)\./);
    const identifier = match ? match[1] : null;
    const backFile = identifier ? backMap.get(identifier) : backs[0];
    
    return {
      front: `${baseUrl}/static/images/${folder}/${front}`,
      back: `${baseUrl}/static/images/${folder}/${backFile || backs[0]}`
    };
  });
}

module.exports = {
  "01_zine": getImages("01"),
  "backseat_zine": getImages("backseat_zine"),
  "misc": getImages("misc"),
  "ticketsFront": getImages("tickets"),
  "ticketsBack": getImages("tickets"),
  "tickets": getPairedImages("tickets", /^.*front.*\.(jpg|jpeg|png)$/i, /^.*back.*\.(jpg|jpeg|png)$/i),
  "clothingTops": getImages("clothing/Tops"),
  "clothingFlowerSkirt": getImages("clothing/Flower Skirt"),
  "clothingBubbleSkirt": getImages("clothing/Bubble Skirt"),
  "clothingStarTop": getImages("clothing/Star Top"),
  "clothingGrad": getImages("clothing/Grad"),
  "nightmarket": getImages("collections/Nightmarket"),
  "taiwan": getImages("collections/Taiwan"),
  "dc": getImages("collections/DC"),
  "france": getImages("collections/France"),
  "architecture": getImages("collections/Architecture"),
};
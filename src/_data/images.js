const fs = require("fs");
const path = require("path");
const baseUrl = "/AWU_WEB2"
const galleryRoot = path.join(__dirname, "..", "static", "images");

// Helper: get all image filenames (relative to galleryRoot) in a folder
function getImages(folder) {
  const dir = path.join(__dirname, "..", "static", "images", folder);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file))
    .sort((a, b) => {
      // Natural sort for numbers in filenames
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    })
    .map(file => baseUrl + `/static/images/${folder}/${file}`);
}

function getPairedImages(folder, frontPattern, backPattern) {
  const files = fs.readdirSync(path.join(galleryRoot, folder));
  const fronts = files.filter(f => frontPattern.test(f));
  const backs = files.filter(f => backPattern.test(f));
  // Pair by index or filename logic
  return fronts.map((front, i) => ({
    front: baseUrl + `/static/images/${folder}/${front}`,
    back: baseUrl + `/static/images/${folder}/${backs[i] || backs[0]}`
  }));
}

// Define galleries for auto-discovery
module.exports = {
  "01_zine": getImages("01"),
  "backseat_zine": getImages("backseat_zine"),
  "misc": getImages("misc"),
  "ticketsFront": getImages("tickets"), // for front images
  "ticketsBack": getImages("tickets"),  // for back images (see below for logic)
  "tickets": getPairedImages("tickets", /^.*front.*\.(jpg|jpeg|png)$/i, /^.*back.*\.(jpg|jpeg|png)$/i),
  "clothingTops": getImages("clothing/Tops"),
  "clothingFlowerSkirt": getImages("clothing/Flower Skirt"),
  "clothingBubbleSkirt": getImages("clothing/Bubble Skirt"),
  "clothingStarTop": getImages("clothing/Star Top"),
  "clothingGrad": getImages("clothing/Grad"),
  // Photography collections
  "nightmarket": getImages("collections/Nightmarket"),
  "taiwan": getImages("collections/Taiwan"),
  "dc": getImages("collections/DC"),
  "france": getImages("collections/France"),
  "architecture": getImages("collections/Architecture"),
};
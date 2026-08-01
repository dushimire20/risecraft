const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "data", "content.json");
const dest = path.join(__dirname, "..", "public", "content.seed.json");

fs.copyFileSync(src, dest);
console.log(`Copied ${src} -> ${dest}`);

const fs = require("node:fs");

console.log("1. antes de leer");
const contenido = fs.readFileSync(__filename, "utf8");

console.log(`2. se leyeron ${contenido.length} caracteres`);

console.log("3. fin")
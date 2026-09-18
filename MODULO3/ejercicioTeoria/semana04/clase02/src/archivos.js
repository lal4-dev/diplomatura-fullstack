const fs = require("node:fs/promises");
const path = require("node:path");

async function leerJson(ruta) {
    const texto = await fs.readFile(ruta, { encoding: "utf8" });
    return JSON.parse(texto)
}

module.exports = {
    leerJson
}
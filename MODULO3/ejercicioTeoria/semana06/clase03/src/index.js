const express = require("express");

const { crearApp } = require("./app");
const { crearAlistamientoServicio } = require("./services/alistamiento");

const alistamientoServicio = crearAlistamientoServicio();
const app = crearApp({ alistamientoServicio });
const PORT = 3000;

app.listen(PORT, () =>
    console.log(`Servidor corriendo en: http://localhost:${PORT}`)
);
const express = require("express");

const { crearAlistamientoController } = require("./controllers/alistamiento");
const { crearAlistamientoRouter } = require("./routers/alistamiento");

function crearApp({ alistamientoServicio }) {
    const app = express();
    const controller = crearAlistamientoController(alistamientoServicio);
    const router = crearAlistamientoRouter(controller);

    app.use("/", crearAlistamientoRouter(controller));

    app.use((req, res) => {
        res.status(404).json({
            status: "error",
            message: "ruta no encontrada",
        });
    });

    return app;
}

module.exports = { crearApp }
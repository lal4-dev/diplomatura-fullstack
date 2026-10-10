const express = require("express");

const { crearAlistamientoController } = require("../controllers/alistamiento");

function crearAlistamientoRouter(controller) {
    const router = express.Router();
    router.get("/alistar", controller.list);
    return router;
}

module.exports = { crearAlistamientoRouter }
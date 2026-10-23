const express = require("express");
const { validarProducto } = require("../middleware/productos");
function crearRouterProductosApi(controlador) {
  const router = express.Router();
  router.get("/", controlador.listarApi);
  router.get("/:id", controlador.obtenerApi);
  router.post("/", validarProducto, controlador.crearApi);
  return router;
}
module.exports = { crearRouterProductosApi };

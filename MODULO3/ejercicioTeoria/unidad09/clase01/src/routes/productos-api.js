const express = require("express");
const { validarProducto } = require("../middleware/productos");
const {
  validarReemplazoProducto,
  validarActualizacionProducto,
} = require("../middleware/cambios-productos");
function crearRouterProductosApi(controlador) {
  const router = express.Router();
  router.get("/", controlador.listarApi);
  router.get("/:id", controlador.obtenerApi);
  router.post("/", validarProducto, controlador.crearApi);
  router.delete("/:id", controlador.eliminarApi);
  router.put(
    "/:id",
    validarProducto,
    validarReemplazoProducto,
    controlador.reemplazarApi,
  );
  router.patch("/:id", validarActualizacionProducto, controlador.actualizarApi);
  return router;
}
module.exports = { crearRouterProductosApi };
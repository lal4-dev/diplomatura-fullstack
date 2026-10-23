function prepararAreaProductos(req, res, next) {
  res.locals.seccion = "Productos artesanales";
  next();
}
function validarProducto(req, res, next) {
  const valores = req.body ?? {};
  const nombre =
    typeof valores.nombre === "string" ? valores.nombre.trim() : "";
  const categoria =
    typeof valores.categoria === "string" ? valores.categoria.trim() : "";
  const descripcion =
    typeof valores.descripcion === "string" ? valores.descripcion.trim() : "";
  const precioRecibido = valores.precio;
  const tipoPrecioValido =
    typeof precioRecibido === "number" ||
    (typeof precioRecibido === "string" && precioRecibido.trim() !== "");
  const precio = tipoPrecioValido ? Number(precioRecibido) : NaN;
  if (
    !nombre ||
    !categoria ||
    !descripcion ||
    !Number.isFinite(precio) ||
    precio < 1
  ) {
    if (req.baseUrl === "/api/productos") {
      return res.status(400).json({
        error: "Completá los campos con un precio mayor o igual a 1.",
      });
    }
    return res.status(400).render("productos/nuevo", {
      titulo: "Nuevo producto",
      error: "Completá los campos con un precio mayor o igual a 1.",
      valores,
    });
  }
  req.productoValidado = { nombre, categoria, precio, descripcion };
  next();
}
module.exports = { prepararAreaProductos, validarProducto };

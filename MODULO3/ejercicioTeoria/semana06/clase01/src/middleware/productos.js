function prepararAreaProductos(req, res, next) {
    res.locals.seccion = "Productos artesanales";
    next();
}

function validarProducto(req, res, next) {
    const nombre = String(req.body.nombre ?? "").trim();
    const categoria = String(req.body.categoria ?? "").trim();
    const descripcion = String(req.body.descripcion ?? "").trim();
    const precio = Number(req.body.precio);
    if (!nombre || !categoria || !descripcion || !Number.isFinite(precio) || precio <= 0) {
        return res.status(400).render("productos/nuevo", {
            titulo: "Nuevo producto",
            error: "Completá todos los campos con valores válidos.",
            valores: req.body,
        });
    }
    req.productoValidado = { nombre, categoria, precio, descripcion };
    next();
}

module.exports = {
    prepararAreaProductos,
    validarProducto
}
function validarReemplazoProducto(req, res, next) {
    const datos = req.body;
    const permitidos = [
        "nombre",
        "categoria",
        "precio",
        "descripcion",
        "disponible",
    ];
    for (const campo of Object.keys(datos)) {
        if (!permitidos.includes(campo)) {
            return res
                .status(400)
                .json({ error: "El campo " + campo + " no se puede modificar." });
        }
    }
    if (typeof datos.disponible !== "boolean") {
        return res.status(400).json({ error: "Disponible debe ser true o false." });
    }
    req.cambiosValidos = req.productoValidado;
    req.cambiosValidos.disponible = datos.disponible;
    next();
}
function validarActualizacionProducto(req, res, next) {
    const datos = req.body;
    if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
        return res.status(400).json({ error: "Enviá un objeto JSON." });
    }
    for (const campo of Object.keys(datos)) {
        if (campo !== "precio" && campo !== "disponible") {
            return res
                .status(400)
                .json({ error: "Solo se puede cambiar precio o disponible." });
        }
    }
    if (datos.precio === undefined && datos.disponible === undefined) {
        return res.status(400).json({ error: "Enviá precio o disponible." });
    }
    const cambios = {};
    if (datos.precio !== undefined) {
        if (typeof datos.precio !== "number") {
            return res
                .status(400)
                .json({ error: "Precio debe ser un número JSON, sin comillas." });
        }
        if (!Number.isFinite(datos.precio) || datos.precio < 1) {
            return res
                .status(400)
                .json({ error: "Precio debe ser mayor o igual a 1." });
        }
        cambios.precio = datos.precio;
    }
    if (datos.disponible !== undefined) {
        if (typeof datos.disponible !== "boolean") {
            return res
                .status(400)
                .json({ error: "Disponible debe ser true o false." });
        }
        cambios.disponible = datos.disponible;
    }
    req.cambiosValidos = cambios;
    next();
}
module.exports = { validarReemplazoProducto, validarActualizacionProducto };
function crearControladorProductos(servicio) {
  async function listar(req, res) {
    const productos = await servicio.listar();
    res.render("productos/lista", {
      titulo: "Productos artesanales",
      productos,
    });
  }
  function mostrarFormulario(req, res) {
    res.render("productos/nuevo", {
      titulo: "Nuevo producto",
      error: null,
      valores: {},
    });
  }
  async function mostrarDetalle(req, res) {
    const producto = await servicio.obtenerPorId(req.params.id);
    if (!producto) {
      return res.status(404).render("no-encontrado", {
        titulo: "Producto no encontrado",
        mensaje: "No existe un producto con ese identificador.",
      });
    }
    res.render("productos/detalle", { titulo: producto.nombre, producto });
  }
  async function crear(req, res) {
    await servicio.crear(req.productoValidado);
    res.redirect("/productos");
  }
  async function listarApi(req, res) {
    const productos = await servicio.listar();
    res.json(productos);
  }
  async function obtenerApi(req, res) {
    const producto = await servicio.obtenerPorId(req.params.id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }
    res.json(producto);
  }
  async function crearApi(req, res) {
    const producto = await servicio.crear(req.productoValidado);
    res.location(`/api/productos/${producto.id}`).status(201).json(producto);
  }
  async function eliminarApi(req, res) {
    const eliminado = await servicio.eliminar(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: "Recurso no encontrado." });
    }
    res.status(204).end();
  }
  async function reemplazarApi(req, res) {
    const producto = await servicio.reemplazar(
      req.params.id,
      req.cambiosValidos,
    );
    if (!producto) {
      return res.status(404).json({ error: "Recurso no encontrado." });
    }
    res.json(producto);
  }
  async function actualizarApi(req, res) {
    const producto = await servicio.actualizar(
      req.params.id,
      req.cambiosValidos,
    );
    if (!producto) {
      return res.status(404).json({ error: "Recurso no encontrado." });
    }
    res.json(producto);
  }
  return {
    listar,
    mostrarFormulario,
    mostrarDetalle,
    crear,
    listarApi,
    obtenerApi,
    crearApi,
    eliminarApi,
    reemplazarApi,
    actualizarApi,
  };
}
module.exports = { crearControladorProductos };

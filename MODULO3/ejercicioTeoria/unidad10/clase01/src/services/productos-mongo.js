const mongoose = require("mongoose");
const { Producto } = require("../models/producto");
function representarProducto(documento) {
  return {
    id: documento._id.toString(),
    nombre: documento.nombre,
    categoria: documento.categoria,
    precio: documento.precio,
    descripcion: documento.descripcion,
    disponible: documento.disponible,
  };
}
function comprobarId(id) {
  if (!mongoose.isObjectIdOrHexString(id)) {
    const error = new Error("Identificador inválido");
    error.codigo = "ID_INVALIDO";
    throw error;
  }
}
function crearServicioProductosMongo() {
  async function listar() {
    const documentos = await Producto.find({}).lean();
    return documentos.map(representarProducto);
  }
  async function obtenerPorId(id) {
    comprobarId(id);
    const documento = await Producto.findById(id).lean();
    return documento ? representarProducto(documento) : null;
  }
  async function crear(datos) {
    const documento = await Producto.create({
      nombre: datos.nombre,
      ategoria: datos.categoria,
      precio: datos.precio,
      descripcion: datos.descripcion,
    });
    return representarProducto(documento);
  }
  async function reemplazar(id, datos) {
    comprobarId(id);
    const reemplazo = {
      nombre: datos.nombre,
      categoria: datos.categoria,
      precio: datos.precio,
      descripcion: datos.descripcion,
      disponible: datos.disponible,
    };
    const documento = await Producto.findOneAndReplace({ _id: id }, reemplazo, {
      runValidators: true,
      returnDocument: "after",
      upsert: false,
    });
    return documento ? representarProducto(documento) : null;
  }
  async function actualizar(id, datos) {
    comprobarId(id);
    const cambios = {};
    for (const campo of ["precio", "disponible"]) {
      if (Object.hasOwn(datos, campo)) cambios[campo] = datos[campo];
    }
    if (Object.keys(cambios).length === 0) {
      const error = new Error("Actualización vacía");
      error.codigo = "ENTRADA_INVALIDA";
      throw error;
    }
    const documento = await Producto.findOneAndUpdate(
      { _id: id },
      { $set: cambios },
      { runValidators: true, returnDocument: "after", upsert: false },
    );
    return documento ? representarProducto(documento) : null;
  }
  async function eliminar(id) {
    comprobarId(id);
    const resultado = await Producto.deleteOne({ _id: id });
    return resultado.deletedCount === 1;
  }
  async function consultar(categoria, orden = "nombre") {
    const filtro = {};
    if (categoria !== undefined) {
      filtro.categoria = categoria.trim();
    }
    let ordenMongo = { nombre: 1, _id: 1 };
    if (orden === "precio-asc") {
      ordenMongo = { precio: 1, _id: 1 };
    }
    if (orden === "precio-desc") {
      ordenMongo = { precio: -1, _id: 1 };
    }
    const documentos = await Producto.find(filtro).sort(ordenMongo).lean();
    return documentos.map(representarProducto);
  }
  return {
    listar,
    obtenerPorId,
    crear,
    reemplazar,
    actualizar,
    eliminar,
    consultar,
  };
}
module.exports = { crearServicioProductosMongo };
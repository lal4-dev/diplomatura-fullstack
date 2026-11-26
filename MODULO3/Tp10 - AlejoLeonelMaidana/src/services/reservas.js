//en la arquitectura de capas el servicio esta en el medio entre el controlador y el modelo es la logica del negocio, osea lo que queremos que haga y tambien maneja las consultas a base de datos

const mongoose = require("mongoose");
const { Reserva } = require("../models/reserva");

const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];
const turnosPermitidos = ["Mañana", "Tarde", "Noche"];

function representarReserva(documento) {
  return {
    id: documento._id.toString(),
    estudiante: documento.estudiante,
    email: documento.email,
    sala: documento.sala,
    fecha: documento.fecha,
    turno: documento.turno,
    personas: documento.personas,
    estado: documento.estado,
  };
}

//funcion auxiliar para validar el formato de 24 caracteres hexadecimales en todas las operaciones por ID, como se repite en varias otras funciones es mejor sacarla afuera y la volvemos una funcion auxiliar
function comprobarId(id) {
  if (!mongoose.isObjectIdOrHexString(id)) {
    const error = new Error("El identificador no es valido");
    error.codigo = "ID_INVALIDO";
    throw error;
  }
}

function crearServicioReservas() {
  //buscamos listar con un filtro excato de sala pero el filtro es opcional por lo tanto si no se pasa por parametro devuelve todas las reservas de la coleccion.
  async function listar() {
    const documentos = await Reserva.find({}).lean(); //find encuentra todos los documentos que coincidan con el filtro y lean() hace que mongoose devuelva objetos planos de js en lugar de documentos de mongoose los cuales tienen metodos y propiedades extra.
    return documentos.map(representarReserva);
  }

  async function consultar(sala, orden = "estudiante", pagina = 1, limite = 2) {
    //paso 1:filtro opcional por la misma sala
    const filtro = {};
    if (sala !== undefined) {
      filtro.sala = sala.trim();
    }

    //paso 2:orden controladdo por las opciones conocidas + desempate determinista por _id ascendente

    let ordenMongo = { estudiante: 1, _id: 1 };

    if (orden === "personas-asc") {
      ordenMongo = { personas: 1, _id: 1 };
    }

    if (orden === "personas-desc") {
      ordenMongo = { personas: -1, _id: 1 };
    }

    //paso3: el salto para la paginacion y el conteo total con el filtro
    const salto = (pagina - 1) * limite;
    const total = await Reserva.countDocuments(filtro);

    //paso 3 y 4: buscamos con filtro de los campos, por oden,salto y el limite

    const documentos = await Reserva.find(filtro)
      .select("estudiante email sala fecha turno personas estado")
      .sort(ordenMongo)
      .skip(salto)
      .limit(limite)
      .lean();

    const datos = documentos.map(representarReserva);
    const paginas = Math.ceil(total / limite);

    return { datos, pagina, limite, total, paginas };
  }

  //buscamos obtener por id y diferenciamos de un id mal formado de un id no encontrado
  async function obtenerPorId(id) {
    comprobarId(id);

    const documento = await Reserva.findById(id).lean(); //findById() encuentra el documento por clave primaria _id
    return documento ? representarReserva(documento) : null;
  }

  //contamos las reservas y nos aseguramos que el resultado sea un numero
  async function contar() {
    const cantidad = await Reserva.countDocuments(); //countDocuments() cuenta los documentos que coincidan con el filtro
    return cantidad;
  }

  //aca "creamos" la reserva aun que seria mas correcto decir que el controlador llama al metodo create pasando los datos ya sanitizados y reserva.create llama a mongoose y es este quien se encarga de crear el documento en la base de datos. tambien como solo cargamos de manera manual 6 de los campos dejamos que mongoose se encargue de asignar el id y el estado.
  async function crear(datos) {
    const documento = await Reserva.create({
      estudiante: datos.estudiante,
      email: datos.email,
      sala: datos.sala,
      fecha: datos.fecha,
      turno: datos.turno,
      personas: datos.personas,
    });

    return representarReserva(documento);
  }

  // PUT: reemplaza la ficha editable completa de una reserva existente (los 7 campos, incluido estado)
  async function reemplazar(id, datos) {
    comprobarId(id);
    const reemplazo = {
      estudiante: datos.estudiante,
      email: datos.email,
      sala: datos.sala,
      fecha: datos.fecha,
      turno: datos.turno,
      personas: datos.personas,
      estado: datos.estado,
    };
    // runValidators: ejecuta las validaciones del Schema. returnDocument: "after" devuelve el documento ya modificado. upsert: false evita crear si el ID no existe.
    const documento = await Reserva.findOneAndReplace({ _id: id }, reemplazo, {
      runValidators: true, //hacemos que moongose vuelva a validar el esquema por si pasamos un email invalido o un estado no permitido por ejemplo
      returnDocument: "after", //si no se pone devuelve null
      upsert: false,
    });
    return documento ? representarReserva(documento) : null;
  }

  // PATCH: actualiza parcialmente solo los campos permitidos (personas y/o estado) usando $set
  async function actualizar(id, datos) {
    comprobarId(id);
    const cambios = {};

    //este for lo que hace es recorrer los campos que se pueden actualizar (personas y estado) y si existe el campo en el objeto datos, lo agrega al objeto cambios
    for (const campo of ["personas", "estado"]) {
      if (Object.hasOwn(datos, campo)) cambios[campo] = datos[campo];
    }

    //este if lo que hace es verificar que el objeto cambios no este vacio por lo tanto si no se paso ningun campo a actualizar se lanaza un error.
    if (Object.keys(cambios).length === 0) {
      const error = new Error("Actualización vacía");
      error.codigo = "ENTRADA_INVALIDA";
      throw error;
    }
    const documento = await Reserva.findOneAndUpdate(
      { _id: id },
      { $set: cambios }, //set es el operador de mongo que permite actualizar campos especificos
      { runValidators: true, returnDocument: "after", upsert: false },
    );
    return documento ? representarReserva(documento) : null;
  }

  // DELETE: realiza la eliminación física de un documento por su _id. deleteOne devuelve cuántas filas borró en deletedCount: si es 1 devuelve true, y si no encontró el ID devuelve false (para que el controlador responda 404).
  async function eliminar(id) {
    comprobarId(id);
    const resultado = await Reserva.deleteOne({ _id: id });
    return resultado.deletedCount === 1;
  }

  return {
    listar,
    consultar,
    obtenerPorId,
    contar,
    crear,
    reemplazar,
    actualizar,
    eliminar,
    salasPermitidas,
    turnosPermitidos,
  };
}

module.exports = {
  crearServicioReservas,
  salasPermitidas,
  turnosPermitidos,
};

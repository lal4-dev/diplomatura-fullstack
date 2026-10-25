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

function crearServicioReservas() {
  //buscamos listar con un filtro excato de sala pero el filtro es opcional por lo tanto si no se pasa por parametro devuelve todas las reservas de la coleccion.
  async function listar(sala) {
    const filtro = {};

    if (sala !== undefined) {
      if (typeof sala !== "string" || !sala.trim()) {
        //trim() elimina los espacios en blanco del principio y del final de una cadena de texto
        const error = new Error("El parametro de sala debe ser un texto");
        error.codigo = "FILTRO_SALA_INVALIDO";
        throw error;
      }

      filtro.sala = sala.trim();
    }
    const documentos = await Reserva.find(filtro).lean(); //find encuentra todos los documentos que coincidan con el filtro y lean() hace que mongoose devuelva objetos planos de js en lugar de documentos de mongoose los cuales tienen metodos y propiedades extra.
    return documentos.map(representarReserva);
  }

  //bucamso obtener por id y diferenciamos de un id mal foramdo de un id no encontrado
  async function obtenerPorId(id) {
    if (!mongoose.isObjectIdOrHexString(id)) {
      //isObjectIdOrHexString() devuelve true si el id es un id de mongoose de lo contrario devuelve false
      const error = new Error("El identificador no es valido");
      error.codigo = "ID_INVALIDO";
      throw error;
    }

    const documento = await Reserva.findById(id).lean(); //findById() encuentra el documento por clave primaria _id
    return documento ? representarReserva(documento) : null;
  }

  //contamos las reservas y nos aseguramos que el resultado sea un numero
  async function contar() {
    const cantidad = await Reserva.countDocuments(); //countDocuments() cuenta los documentos que coincidan con el filtro
    return cantidad;
  }

  //aca "creamos" la reserva aun que seria mas correcto decir que el controlador llama al metodo create para pasando los datos ya sanitizados y reserva.create llama a mongoose y es este quien se encarga de crear el documento en la base de datos. tambien como solo cargamos de manera anual 6 de los campos dejamos que mongoose se encargue de asignar el id y el estado.
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

  return {
    listar,
    obtenerPorId,
    contar,
    crear,
    salasPermitidas,
    turnosPermitidos,
  };
}

module.exports = {
  crearServicioReservas,
  salasPermitidas,
  turnosPermitidos,
};

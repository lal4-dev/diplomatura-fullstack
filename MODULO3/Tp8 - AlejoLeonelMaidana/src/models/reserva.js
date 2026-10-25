//en la arquitectura de capas el mdodelo conoce la estructuta de la base de datos

const mongoose = require("mongoose");

//aca tenemos el modelo de como deberia ser o contener una reserva como minimo las validaciones que estan aca se las llama validaciones en profundidad por que se pueden hacer de un solo dato y aun que tenemos los middleware para validar de mas no es lo mismo. tenemos que garantizar al integridad de la base de datos asi si alguien intenta guarda datos sin respetar el esquema mongoose rechaza la operacion. y no se guarda. por eso lo de "en profundidad"
const reservaSchema = new mongoose.Schema(
  {
    estudiante: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /@/,
    },
    sala: {
      type: String,
      required: true,
      enum: ["Sala Norte", "Sala Sur", "Sala Multimedia"],
    },
    fecha: {
      type: String,
      required: true,
      trim: true,
    },
    turno: {
      type: String,
      required: true,
      enum: ["Mañana", "Tarde", "Noche"],
    },
    personas: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
      validate: {
        validator: Number.isInteger,
        message: "La cantidad de personas debe ser un número entero",
      },
    },
    estado: {
      type: String,
      required: true,
      default: "pendiente",
      enum: ["pendiente", "confirmada"],
    },
  },
  { collection: "reservas" },
);

const Reserva = mongoose.model("Reserva", reservaSchema);
module.exports = { Reserva };

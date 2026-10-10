const { salasPermitidas, turnosPermitidos } = require("../services/reservas");

function prepararAreaReservas(req, res, next) {
  res.locals.seccion = "Reservas de salas";
  next();
}

function validarReserva(req, res, next) {
  const estudiante = String(req.body.estudiante ?? "").trim();
  const email = String(req.body.email ?? "").trim();
  const sala = String(req.body.sala ?? "").trim();
  const fecha = String(req.body.fecha ?? "").trim();
  const turno = String(req.body.turno ?? "").trim();
  const personas = Number(req.body.personas);

  let error = null;

  if (!estudiante || !email || !sala || !fecha || !turno ||
    req.body.personas === undefined || String(req.body.personas).trim() === "") {
    error = "Todos los campos son obligatorios.";

  } else if (!email.includes("@")) {
    error = "El correo electrónico debe contener un formato válido con '@'.";

  } else if (!salasPermitidas.includes(sala)) {
    error = `La sala elegida no es permitida. Opciones válidas: ${salasPermitidas.join(", ")}.`;

  } else if (!turnosPermitidos.includes(turno)) {
    error = `El turno elegido no es permitido. Opciones válidas: ${turnosPermitidos.join(", ")}.`;

  } else if (!Number.isInteger(personas) || personas < 1 || personas > 6) {
    error = "La cantidad de personas debe ser un número entero entre 1 y 6.";
  }

  if (error) {
    return res.status(400).render("reservas/nueva", {
      titulo: "Nueva reserva",
      error,
      valores: req.body,
      salasPermitidas,
      turnosPermitidos,
    });
  }

  req.reservaValidada = {
    estudiante,
    email,
    sala,
    fecha,
    turno,
    personas,
  };

  next();
}

module.exports = {
  prepararAreaReservas,
  validarReserva,
};
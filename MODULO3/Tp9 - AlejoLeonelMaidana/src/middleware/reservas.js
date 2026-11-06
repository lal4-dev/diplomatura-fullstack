const { salasPermitidas, turnosPermitidos } = require("../services/reservas");

//esta funcion lo que hace es prepara el entorno para las reservas de salas. le pasa el titulo de la seccion y con el next pasa al siguiente middleware.
function prepararAreaReservas(req, res, next) {
  res.locals.seccion = "Reservas de salas";
  next();
}

//valida que los datos de la reserva sean correctos, si no lo son, devuelve un error y si lo son pasa al siguiente middleware. de esta forma evitamos que se creen reservas con datos invalidos
function validarReserva(req, res, next) {
  //aseguramos que el body exista y sea un objeto plano no vacio, ni array
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    const errorMensaje =
      "El cuerpo de la solicitud no puede estar ausente o vacio";

    //en esta parte se diferencia si la peticion vino del navegador o de la api. si vino del navegador devuelve una vista de error si vino de la api devuelve un json con el error.
    if (req.originalUrl.startsWith("/api")) {
      return res.status(400).json({ error: errorMensaje });
    }

    return res.status(400).render("reservas/nueva", {
      titulo: "Nueva reserva",
      error: errorMensaje,
      valores: {},
      salasPermitidas,
      turnosPermitidos,
    });
  }

  const valores = req.body;

  //validamos tipos estrictos de texto, rechazamos objtos arreglos y booleanos
  const estudiante =
    typeof valores.estudiante === "string"
      ? valores.estudiante.trim()
      : undefined;
  const email =
    typeof valores.email === "string" ? valores.email.trim() : undefined;
  const sala =
    typeof valores.sala === "string" ? valores.sala.trim() : undefined;
  const fecha =
    typeof valores.fecha === "string" ? valores.fecha.trim() : undefined;
  const turno =
    typeof valores.turno === "string" ? valores.turno.trim() : undefined;

  //validamos la catidad de persona y rechazamos algunos valores de tipo booleano, objetos y arrays
  const valoresPersonas = valores.personas;
  const esTipoPersonaValido =
    typeof valoresPersonas === "number" ||
    (typeof valoresPersonas === "string" && valoresPersonas.trim() !== "");

  const personas = esTipoPersonaValido ? Number(valoresPersonas) : undefined;

  let error = null;

  //validamos cada campo y si hay un error se lo asignamos a la variable error, para usar las opciones validas de sala y turno usamos las constantes que nos da el servicio.
  if (
    !estudiante ||
    !email ||
    !sala ||
    !fecha ||
    !turno ||
    !esTipoPersonaValido
  ) {
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

  //si hubo un error, respondemos en el formato que espera el cliente
  if (error) {
    //aca de nuevo diferenciamos el formato de respuesta
    if (req.originalUrl.startsWith("/api")) {
      return res.status(400).json({ error });
    }

    return res.status(400).render("reservas/nueva", {
      titulo: "Nueva reserva",
      error,
      valores: req.body,
      salasPermitidas,
      turnosPermitidos,
    });
  }

  //si no hay error guardamos la reserva en el objeto locals para que el controlador pueda acceder a ella.
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

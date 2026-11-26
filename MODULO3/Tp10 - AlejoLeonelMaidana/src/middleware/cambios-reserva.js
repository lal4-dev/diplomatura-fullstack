/* Este middleware valida los cuerpos JSON de las peticiones PUT (reemplazo total)
   y PATCH (actualización parcial) antes de pasar al controlador. */

//ess la funcion que valida los cambios en la reservata para PUT
function validarReemplazoReserva(req, res, next) {
  const datos = req.body;

  // Los 7 campos que se permiten en un PUT
  const permitidos = [
    "estudiante",
    "email",
    "sala",
    "fecha",
    "turno",
    "personas",
    "estado",
  ];

  // Si mandan cualquier otro campo (como _id, $set o un campo inventado), devolvemos 400
  for (const campo of Object.keys(datos)) {
    if (!permitidos.includes(campo)) {
      return res
        .status(400)
        .json({ error: "El campo " + campo + " no se puede modificar." });
    }
  }

  // En PUT el campo estado es obligatorio y solo puede ser "pendiente" o "confirmada"
  const estado = typeof datos.estado === "string" ? datos.estado.trim() : "";

  if (estado !== "pendiente" && estado !== "confirmada") {
    return res
      .status(400)
      .json({ error: "Estado debe ser pendiente o confirmada." });
  }

  // Juntamos los 6 campos que ya validó validarReserva con el estado
  req.cambiosValidos = req.reservaValidada;
  req.cambiosValidos.estado = estado;
  next();
}

//esta funcion es la que valida los cambios en la reservata para PATCH
function validarActualizacionReserva(req, res, next) {
  const datos = req.body;

  // Comprobamos que exista el body y sea un objeto JSON (no array ni null)
  if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
    return res.status(400).json({ error: "Enviá un objeto JSON." });
  }

  // En PATCH solo se permite enviar "personas" o "estado"
  for (const campo of Object.keys(datos)) {
    if (campo !== "personas" && campo !== "estado") {
      return res
        .status(400)
        .json({ error: "Solo se puede cambiar personas o estado." });
    }
  }

  // Al menos uno de los dos tiene que venir en el JSON
  if (datos.personas === undefined && datos.estado === undefined) {
    return res.status(400).json({ error: "Enviá personas o estado." });
  }

  const cambios = {};

  // Si enviaron personas, validamos que sea número (o texto numérico) entero entre 1 y 6
  if (datos.personas !== undefined) {
    const valorPersonas = datos.personas;
    const esTipoValido =
      typeof valorPersonas === "number" ||
      (typeof valorPersonas === "string" && valorPersonas.trim() !== "");

    const personas = esTipoValido ? Number(valorPersonas) : NaN;

    if (
      !Number.isFinite(personas) ||
      !Number.isInteger(personas) ||
      personas < 1 ||
      personas > 6
    ) {
      return res.status(400).json({
        error: "La cantidad de personas debe ser un número entero entre 1 y 6.",
      });
    }

    cambios.personas = personas;
  }

  // Si enviaron estado, validamos que sea "pendiente" o "confirmada"
  if (datos.estado !== undefined) {
    const estado = typeof datos.estado === "string" ? datos.estado.trim() : "";

    if (estado !== "pendiente" && estado !== "confirmada") {
      return res
        .status(400)
        .json({ error: "Estado debe ser pendiente o confirmada." });
    }

    cambios.estado = estado;
  }

  req.cambiosValidos = cambios;
  next();
}

module.exports = { validarReemplazoReserva, validarActualizacionReserva };

// este middleware centralizado de gestión de errores en Express, debe tener obligatoriamente 4 parámetros (error, req, res, next) para que el framework lo identifique como manejador de errores.

//aca definimos la vista y el titulo del formulario, si no se pasa nada se usa por defecto "reservas/nueva" y "Nueva reserva" . Si no hay error, se guardan los datos en el objeto locals.
function crearManejadorErrores({
  vistaFormulario = "reservas/nueva",
  tituloFormulario = "Nueva reserva",
} = {}) {
  return function manejarErrores(error, req, res, next) {
    // Si las cabeceras ya fueron enviadas, delegamos al manejador por defecto de Express
    if (res.headersSent) {
      return next(error);
    }

    const esValidacion = error.name === "ValidationError";
    const esEntradaInvalida =
      esValidacion ||
      error.codigo === "ID_INVALIDO" ||
      error.codigo === "FILTRO_SALA_INVALIDO" ||
      error.codigo === "FILTRO_INVALIDO" ||
      error.type === "entity.parse.failed"; // JSON con sintaxis rota enviado por el cliente

    const estado = esEntradaInvalida ? 400 : 500;
    let mensaje = esEntradaInvalida
      ? "Revisá los datos enviados."
      : "No se pudo completar la operación.";

    if (error.type === "entity.parse.failed") {
      mensaje = "JSON mal formado en el cuerpo de la solicitud.";
    } else if (error.codigo === "ID_INVALIDO") {
      mensaje = "El identificador debe tener 24 caracteres hexadecimales.";
    } else if (
      error.codigo === "FILTRO_SALA_INVALIDO" ||
      error.codigo === "FILTRO_INVALIDO"
    ) {
      mensaje = error.message || "El parámetro de búsqueda es inválido.";
    }

    // Registro seguro de diagnóstico en servidor (sin exponer secretos ni contraseñas)
    console.error(
      "Solicitud fallida:",
      res.locals.solicitudId ?? "",
      error.name,
      error.message,
    );

    // Si la ruta solicitada pertenece a la API, respondemos siempre JSON
    if (req.originalUrl.startsWith("/api") || req.path.startsWith("/api")) {
      return res.status(estado).json({
        error: mensaje,
        campos: esValidacion && error.errors ? Object.keys(error.errors) : [],
      });
    }

    // Si es un error de validación en formulario HTML (POST), re-renderizamos el formulario con 400
    if (esValidacion && req.method === "POST") {
      return res.status(400).render(vistaFormulario, {
        titulo: tituloFormulario,
        error: mensaje,
        valores: req.body ?? {},
      });
    }

    // Para cualquier otra solicitud HTML, renderizamos la vista de error
    return res.status(estado).render("no-encontrado", {
      titulo: esEntradaInvalida ? "Solicitud inválida" : "Error del servicio",
      mensaje,
    });
  };
}

module.exports = { crearManejadorErrores };

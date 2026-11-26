/* el controlador recibe la peticion HTTP(req) y coordina el servicio emitiendo la
  respuesta http correspondiente(res), ya sea renderizando las vistas html o
  enviando JSON. */

function crearControladorReservas(servicio) {
  /* esta funcion muestra la pagina de inicio pasando como parametro el titulo,
  las salas permitidas y la cantidad total de reservas. */
  async function mostrarInicio(req, res) {
    const totalReservas = await servicio.contar();
    res.render("inicio", {
      titulo: "Inicio",
      salasPermitidas: servicio.salasPermitidas,
      totalReservas,
    });
  }

  /* esta funcion muestra el estado del servicio en formato JSON.
  en caso de error  */
  async function mostrarEstado(req, res) {
    res.json({
      servicio: "activo",
      reservas: await servicio.contar(),
      solicitudId: res.locals.solicitudId,
    });
  }

  /* esta funcion muestra el listado de reservas en formato HTML, renderizando 
  la vista "reservas/lista" y pasando como parametro un objeto con el titulo y 
  la lista de reservas. */
  async function listar(req, res) {
    const reservas = await servicio.listar();
    res.render("reservas/lista", {
      titulo: "Listado de reservas",
      reservas,
    });
  }

  /* esta funcion muestra el formulario de nueva reserva renderizando la vista 
  "reservas/nueva" y pasando como parametro un objeto con el titulo, 
  un mensaje de error nulo, un objeto de valores vacio y las listas de salas 
  y turnos permitidos. */
  async function mostrarFormulario(req, res) {
    res.render("reservas/nueva", {
      titulo: "Nueva reserva",
      error: null,
      valores: {},
      salasPermitidas: servicio.salasPermitidas,
      turnosPermitidos: servicio.turnosPermitidos,
    });
  }

  /* esta funcion muestra el detalle de una reserva especifica, obteniendo el 
  identificador de la reserva de los parametros de la peticion HTTP.
  en caso de no encontrar la reserva se muestra un mensaje de error.*/
  async function mostrarDetalle(req, res) {
    const reserva = await servicio.obtenerPorId(req.params.id);

    if (!reserva) {
      return res.status(404).render("no-encontrado", {
        titulo: "Reserva no encontrada",
        mensaje: "No existe una reserva con ese identificador.",
      });
    }

    return res.render("reservas/detalle", {
      titulo: `Detalle de reserva #${reserva.id}`,
      reserva,
    });
  }

  /* esta funcion crea una reserva a partir de los datos validados en el middleware
  y redirige al listado de reservas. */
  async function crear(req, res) {
    await servicio.crear(req.reservaValidada);
    res.redirect("/reservas");
  }

  //funciones de api

  /* esta funcion maneja el GET /api/reservas y antes de ir a consultar en MongoDb valida los
  parametros que llegan por query string (sala, orden, pagina y limite) 
  si algo no cumple las reglas corta todo y devuelve un 400*/
  async function listarApi(req, res) {
    //aca esta la lista blanca de parametros: recorremos todo lo que vino en la URL(req.query) y si mandan un parametro desconocido(ej ?select=email), lo rechazamos con 400*/
    const permitidos = ["sala", "orden", "pagina", "limite"];

    for (const campo of Object.keys(req.query)) {
      if (!permitidos.includes(campo)) {
        return res.status(400).json({ error: "Parametro no permitido" });
      }
    }

    //este filtro es opcional: la sala si no viene queda undefined y no filtra. si viene exigimos que sea string y que no este vacio ni lleno de espacios(.trim() === "").
    const sala = req.query.sala;
    if (sala !== undefined) {
      if (typeof sala !== "string" || sala.trim() === "") {
        return res
          .status(400)
          .json({ error: "El parametro sala debe tener contenido" });
      }
    }

    //este filtro opcional: el orden por defecto es estudiante, si viene en la URL, solo aceptamos las 3 opciones cerradas para no pasarle texto que no queramos por ej. ?orden=alejo a Mongo
    let orden = "estudiante";
    if (req.query.orden !== undefined) {
      orden = req.query.orden;
      if (
        orden !== "estudiante" &&
        orden !== "personas-asc" &&
        orden !== "personas-desc"
      ) {
        return res.status(400).json({ error: "Orden no permitido" });
      }
    }

    //este filtro opcional: la pagina por defecto es 1. como todo en la URL llega como texto, primero nos aseguramos de que sea un string, luego que no este vacio ni lleno de espacios, luego lo convertimos a numero y chequeamos que este en el rango 1 y 1000
    let pagina = 1;
    if (req.query.pagina !== undefined) {
      if (
        typeof req.query.pagina !== "string" ||
        req.query.pagina.trim() === ""
      ) {
        return res.status(400).json({ error: "Pagina invalida" });
      }
      pagina = Number(req.query.pagina);
      if (!Number.isInteger(pagina) || pagina < 1 || pagina > 1000) {
        return res
          .status(400)
          .json({ error: "La pagina debe ser un entero entre 1 y 1000" });
      }
    }

    //este fltro es opcional: por defecto devuelve 2 reservas por pagina, tiene las mismas validacion que pagina que sea un texto texto no vacio, luego convertido a numero entrero y en el rango permitido
    let limite = 2;
    if (req.query.limite !== undefined) {
      if (
        typeof req.query.limite !== "string" ||
        req.query.limite.trim() === ""
      ) {
        return res.status(400).json({ error: "Límite inválido." });
      }
      limite = Number(req.query.limite);
      if (!Number.isInteger(limite) || limite < 1 || limite > 20) {
        return res
          .status(400)
          .json({ error: "El límite debe ser un entero entre 1 y 20." });
      }
    }

    //con los 4 valores ya validados y convertidos, delegamos la consulta al servicio y respondemos con el objeto pagina {datos, pagina, limite, total, paginas}
    const resultado = await servicio.consultar(sala, orden, pagina, limite);
    res.json(resultado);
  }

  /*esta funcion obtiene una reserva por id de params. y si no existe lanza error*/
  async function obtenerApi(req, res) {
    const reserva = await servicio.obtenerPorId(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
    res.json(reserva);
  }

  /* esta funcion crea una reserva a partir de los datos validados en el middleware
  y responde con la reserva creada en formato JSON. */
  async function crearApi(req, res) {
    const reserva = await servicio.crear(req.reservaValidada);
    res.location(`/api/reservas/${reserva.id}`).status(201).json(reserva);
  }

  /*esto es parte del DELETE, aca se recibe el id por parametro de ruta y llama a "servicio.eliminar", y aca o devuelve un booleano si es true te da un 204 y es que se borro y por el .end es que no paso devuelve ningun cuerpo, si es false te responde con un 404 por que no se encontro un id*/
  async function eliminarApi(req, res) {
    const eliminado = await servicio.eliminar(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
    res.status(204).end();
  }

  /* aca se recibe el id del objeto por parametro, y los cambios validos por body, y luego es llamado por el middleware validarReemplazoReserva, si mongodb no encuentra el id lanza error 404 y si lo encuentra lanza la reserva reemplazada con 200 es decir el json se actualizo*/
  async function reemplazarApi(req, res) {
    const reserva = await servicio.reemplazar(
      req.params.id,
      req.cambiosValidos,
    );
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
    res.status(200).json(reserva);
  }

  /* esta funcion actualiza parcialmente una reserva a partir de los datos validados en el middleware
  y responde con la reserva actualizada en formato JSON. */
  async function actualizarApi(req, res) {
    const reserva = await servicio.actualizar(
      req.params.id,
      req.cambiosValidos,
    );
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
    res.status(200).json(reserva);
  }

  return {
    mostrarInicio,
    mostrarEstado,
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

module.exports = { crearControladorReservas };

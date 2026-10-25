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

  /*esta funcion responde con la lista de reservas de forma automatica. si en la 
  peticion enviamos un parametro de sala se filtra por sala*/
  async function listarApi(req, res) {
    /*esto es lo que permite un filtro por querry string onda /api/reservas?sala=salaNaria1*/
    const reservas = await servicio.listar(req.query.sala);
    res.json(reservas);
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
  };
}

module.exports = { crearControladorReservas };

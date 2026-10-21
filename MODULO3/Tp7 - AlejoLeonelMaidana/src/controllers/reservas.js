function crearControladorReservas(servicio) {
  function mostrarInicio(req, res) {
    res.render("inicio", {
      titulo: "Inicio",
      salasPermitidas: servicio.salasPermitidas,
      totalReservas: servicio.contar(),
    });
  }

  function mostrarEstado(req, res) {
    res.json({
      servicio: "activo",
      reservas: servicio.contar(),
      solicitudId: res.locals.solicitudId,
    });
  }

  function listar(req, res) {
    res.render("reservas/lista", {
      titulo: "Listado de reservas",
      reservas: servicio.listar(),
    });
  }

  function mostrarFormulario(req, res) {
    res.render("reservas/nueva", {
      titulo: "Nueva reserva",
      error: null,
      valores: {},
      salasPermitidas: servicio.salasPermitidas,
      turnosPermitidos: servicio.turnosPermitidos,
    });
  }

  function mostrarDetalle(req, res) {
    const id = Number(req.params.id);
    const reserva = servicio.obtenerPorId(id);

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

  function crear(req, res) {
    servicio.crear(req.reservaValidada);
    res.redirect("/reservas");
  }

  return {
    mostrarInicio,
    mostrarEstado,
    listar,
    mostrarFormulario,
    mostrarDetalle,
    crear,
  };
}

module.exports = { crearControladorReservas };

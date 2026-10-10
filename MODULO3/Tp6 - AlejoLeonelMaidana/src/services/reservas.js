const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];
const turnosPermitidos = ["Mañana", "Tarde", "Noche"];

function crearServicioReservas(datosIniciales = []) {
  const reservas = [...datosIniciales];

  function listar() {
    return [...reservas];
  }

  function obtenerPorId(id) {
    return reservas.find((item) => item.id === id) ?? null;
  }

  function contar() {
    return reservas.length;
  }

  function crear(datosValidados) {
    const ultimoId = reservas.reduce(
      (mayorId, item) => Math.max(mayorId, item.id),
      0,
    );

    const nuevaReserva = {
      id: ultimoId + 1,
      ...datosValidados,
    };

    reservas.push(nuevaReserva);
    return nuevaReserva;
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
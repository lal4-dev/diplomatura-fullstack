function formatearDestino(destino, posicion){
    const reserva = destino.reserva 
        ? "Requiere reserva previa"
        : "No requiere reserva previa";

    return `${posicion+1}, ${destino.ciudad},${destino.pais}
        temporada recomendada: ${destino.temporada}
        atractivos: ${destino.atractivos.join(", ")}
        organizacion: ${reserva}
        `;
}

function crearReporte(destinos){
    const secciones = destinos.map(formatearDestino);
    return `Catalago de destinos turisticos:
        ====================================
        ${secciones.join("\n")}
        ====================================
        Total de destinos: ${destinos.length}
        `;
}

module.exports = {
    crearReporte
}
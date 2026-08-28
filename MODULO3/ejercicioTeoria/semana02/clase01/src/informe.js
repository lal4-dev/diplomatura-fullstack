function formatoActividad(actividad){
    const entrada = actividad.gratuita ? "Entrada gratuita" : "Entrada arancelada";
    return `${actividad.fecha} | ${actividad.nombre} | ${actividad.lugar} | ${entrada}`;

}

function crearInforme(actividades){
    const lineas = actividades.map(formatoActividad);
    return `AGENDA CULTURAL:
    Cantidad de actividades: ${actividades.length}
    ${lineas.join("\n")}
    `;
}
module.exports={crearInforme};
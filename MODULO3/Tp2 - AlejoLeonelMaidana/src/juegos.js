function formatearJuego(juego, index){
    const estado = juego.disponible ? "Disponible" : "No disponible";
    const categorias = juego.categorias.join(", ");

    return `${index+1}.${juego.titulo}
    Editorial y año: ${juego.editorial}, ${juego.anio}
    Participantes: ${juego.jugadoresMin} a ${juego.jugadoresMax}
    Categorias: ${categorias}
    Estado: ${estado} \n
    `;
}

function crearInforme(juegos){
    const lineas = juegos.map((juego,index)=>formatearJuego(juego, index));
    return `CATALAGO DE JUEGOS DE MESA
Cantida de juegos: ${juegos.length}
${lineas.join("\n")}`;

}

module.exports = {
    crearInforme
}
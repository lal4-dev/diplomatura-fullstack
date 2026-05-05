export const funcionGuardarEstado = (estadoAplicacionEjercicio27)=>{
    let estadoAppEjercicio27 = JSON.stringify(estadoAplicacionEjercicio27);
    localStorage.setItem("estadoAppEjercicio27",estadoAppEjercicio27)
}

export const funcionRecuperarEstado = (estadoAplicacionEjercicio27, idParrafo) =>{
    let datoRecuperado = localStorage.getItem("estadoAppEjercicio27");

    if(datoRecuperado){
        let estadoObjeto = JSON.parse(datoRecuperado);

        estadoAplicacionEjercicio27.parrafo = estadoObjeto.parrafo;
        idParrafo.value = estadoObjeto.parrafo
    }
}

export const funcionContarVocales = (parrafo) =>{
    let cantidadVocales = 0;
    for(let i=0; i<parrafo.length; i++){
        let letra = parrafo[i];

        if(letra === `a` ||letra === `e`||letra === `i`||letra === `o`||letra === `u`||
            letra === `A` ||letra === `E`||letra === `I`||letra === `O`||letra === `U`){
            cantidadVocales++;
        }
    }

    return cantidadVocales;
}
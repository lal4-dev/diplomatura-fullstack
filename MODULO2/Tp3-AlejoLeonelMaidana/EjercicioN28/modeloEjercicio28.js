export const funcionGuardarEstado = (estadoAplicacionEjercicio28)=>{
    let estadoAppEjercicio28 = JSON.stringify(estadoAplicacionEjercicio28);
    localStorage.setItem("estadoAppEjercicio28",estadoAppEjercicio28)
}

export const funcionRecuperarEstado = (estadoAplicacionEjercicio28, idParrafo) =>{
    let datoRecuperado = localStorage.getItem("estadoAppEjercicio28");

    if(datoRecuperado){
        let estadoObjeto = JSON.parse(datoRecuperado);

        estadoAplicacionEjercicio28.parrafo = estadoObjeto.parrafo;
        idParrafo.value = estadoObjeto.parrafo
    }
}

export const funcionContarConsonantes = (parrafo) =>{
    let cantidadConsonantes = 0;
    for(let i=0; i<parrafo.length; i++){
        let letra = parrafo[i];

        if(letra !== `a` && letra !== `e`&& letra !== `i` && letra !== `o`&& letra !== `u`&&
            letra !== `A` && letra !== `E` && letra !== `I` && letra !== `O` && letra !== `U`){
            cantidadConsonantes++;
        }
    }

    return cantidadConsonantes;
}
export const funcionGuardarEstado = (estadoAplicacionEjercicio29) =>{
    let estadoAppEjercicio29 = JSON.stringify(estadoAplicacionEjercicio29);
    localStorage.setItem("estadoAppEjercicio29",estadoAppEjercicio29)
}

export const funcionRecuperarEstado = (estadoAplicacionEjercicio29, idParrafo) =>{
    let datosRecuperado = localStorage.getItem("estadoAppEjercicio29");
    if(datosRecuperado){
        let estadoObjeto = JSON.parse(datosRecuperado);

        estadoAplicacionEjercicio29.parrafo = estadoObjeto.parrafo;
        idParrafo.value = estadoObjeto.parrafo

    }
}

export const funcionContarS = (parrafo) =>{
    let cantidadS = 0;

    for(let i=0; i<parrafo.length; i++){
        let letra = parrafo[i];

        if(letra ===`s` || letra === `S`){
            cantidadS++;
        }
    }

    if(cantidadS>=2){
        return true;
    }
    else{
        return false;
    }
}
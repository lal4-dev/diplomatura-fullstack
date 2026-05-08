export const funcionGuardarEstado = (estadoAplicacionEjercicio31) =>{
    let estadoAppEjercicio31 = JSON.stringify(estadoAplicacionEjercicio31);
    localStorage.setItem("estadoAppEjercicio31",estadoAppEjercicio31);
}

export const funcionRecuperarEstado = (estadoAplicacionEjercicio31,idParrafo) =>{
    let datosRecuperados = localStorage.getItem("estadoAppEjercicio31");

    if(datosRecuperados){
        let estadoObjeto = JSON.parse(datosRecuperados);

        estadoAplicacionEjercicio31.parrafo = estadoObjeto.parrafo;
        idParrafo.value = estadoObjeto.parrafo;
    }
}

export const funcionContarNumeros = (parrafo) =>{
    let tieneNumeros = true;
    for(let i=0; i<parrafo.length; i++){
        let numero = parrafo[i];

        if(numero>=`0` && numero <=`9`){
            tieneNumeros = false
            break;
        }
    }

    return tieneNumeros;
}
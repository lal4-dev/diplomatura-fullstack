export const funcionGuardarEstado = (estadoAplicacion)=> {
    let estadoAppEjercicio22 = JSON.stringify(estadoAplicacion);
    localStorage.setItem("estadoAppEjercicio22",estadoAppEjercicio22)
}

export const funcionRecuperarEstado = (estadoAplicacion,importeBebida,clasificacionBebida)=>{
    let datosRecuperado = localStorage.getItem("estadoAppEjercicio22");

    if(datosRecuperado){
        let estadoObjeto = JSON.parse(datosRecuperado)

        estadoAplicacion.importe = estadoObjeto.importe;
        estadoAplicacion.clasificacion = estadoObjeto.clasificacion;

        importeBebida.value = estadoObjeto.importe;
        clasificacionBebida.value = estadoObjeto.clasificacion;
    }
}

export const funcionCalcularTasa = (importeBebida,clasificacionBebida)=>{
    let tasa = 0;

    switch(clasificacionBebida){
        case 1:{
            tasa=5;
            break;
        }

        case 2:{
            tasa=1;
            break
        }

        case 3:{
            tasa=7;
            break;
        }

        case 4:{
            tasa=2;
            break;
        }

        case 5:{
            tasa=15;
            break;
        }

        case 6:{
            tasa=1;
            break;
        }
    }

    let sobreTasa = importeBebida * (tasa/1000);
    return sobreTasa;
}
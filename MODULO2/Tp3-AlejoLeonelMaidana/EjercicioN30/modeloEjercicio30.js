    export const funcionGuardarEstado = (estadoAplicacionEjercicio30) =>{
        let estadoAppEjercicio30 = JSON.stringify(estadoAplicacionEjercicio30);
        localStorage.setItem("estadoAppEjercicio30",estadoAppEjercicio30)
    }

    export const funcionRecuperarEstado = (estadoAplicacionEjercicio30,idParrafo) =>{
        let datosRecuperados = localStorage.getItem("estadoAppEjercicio30");

        if(datosRecuperados) {
            let estadoObjeto = JSON.parse(datosRecuperados);
            estadoAplicacionEjercicio30.parrafo = estadoObjeto.parrafo;
            idParrafo.value = estadoObjeto.parrafo
        }
    }

    export const funcionContarEspacios = (parrafo) =>{
        let cantidadEspacios = 0;
        let tieneTresEspacios = false

        for(let i=0; i<parrafo.length;i++){
            let letra = parrafo[i];

            if(letra ===` `){
                cantidadEspacios++;
            }
            
            if(cantidadEspacios>=3){
                tieneTresEspacios=true;
                break;
            }
        }

        return tieneTresEspacios;
        
    }
export const funcionGuardarEstado = (estadoAplicacionEjercicio25) =>{
    let estadoAppEjercicio25 = JSON.stringify(estadoAplicacionEjercicio25);
    localStorage.setItem("estadoAppEjercicio25",estadoAppEjercicio25);
}

export const funcionRecuperarEstado = (estadoAplicacionEjercicio25,idImporteBase) =>{
    let datosRecuperadoEjercicio25 = localStorage.getItem("estadoAppEjercicio25");

    if(datosRecuperadoEjercicio25){
        let estadoObjeto = JSON.parse(datosRecuperadoEjercicio25);

        estadoAplicacionEjercicio25.importeBase = estadoObjeto.importeBase;
        idImporteBase.value = estadoObjeto.importeBase;
    }
}

export const funcionTasaFiscalizacion = importeBase => (importeBase*1.2)/100;
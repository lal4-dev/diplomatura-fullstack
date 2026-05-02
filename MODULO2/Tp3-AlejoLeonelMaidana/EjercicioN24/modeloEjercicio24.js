export const funcionGuardarEstado = (estadoAplicacionEjercicio24) =>{
    let estadoAppEjercicio24 = JSON.stringify(estadoAplicacionEjercicio24);
    localStorage.setItem("estadoAppEjercicio24",estadoAppEjercicio24);
}

export const funcionRecuperarEstado = (estadoAplicacionEjercicio24,idImporteBase) =>{
    let datosRecuperadoEjercicio24 = localStorage.getItem("estadoAppEjercicio24");
    if(datosRecuperadoEjercicio24){
        let estadoObjeto = JSON.parse(datosRecuperadoEjercicio24);
        estadoAplicacionEjercicio24.importeBase = estadoObjeto.importeBase;
        idImporteBase.value = estadoObjeto.importeBase;
    }
}

export const funcionTasaSubSuelo = importeBase => importeBase*3/100; //funcion simplificada
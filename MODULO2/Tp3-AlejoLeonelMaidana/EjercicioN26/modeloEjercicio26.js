export const funcionGuardarEstado = (estadoAplicacionEjercicio26) =>{
    let estadoAppEjercicio26 = JSON.stringify(estadoAplicacionEjercicio26);
    localStorage.setItem("estadoAppEjercicio26",estadoAppEjercicio26);

}

export const funcionRecuperarEstado = (estadoAplicacionEjercicio26,idNivelGlucosa,idPesoCorporal,idTipoDiabetes) =>{
    let datosRecuperadoEjercicio26 = localStorage.getItem("estadoAppEjercicio26");

    if(datosRecuperadoEjercicio26){
        let estadoObjeto = JSON.parse(datosRecuperadoEjercicio26);
        estadoAplicacionEjercicio26.nivelGlucosa = estadoObjeto.nivelGlucosa;
        estadoAplicacionEjercicio26.pesoCorporal = estadoObjeto.pesoCorporal;
        estadoAplicacionEjercicio26.tipoDiabetes = estadoObjeto.tipoDiabetes;

        idNivelGlucosa.value = estadoObjeto.nivelGlucosa;
        idPesoCorporal.value = estadoObjeto.pesoCorporal;
        idTipoDiabetes.value = estadoObjeto.tipoDiabetes;
    }
}

export const funcionCalcularDosisInsulina = (nivelGlucosa,pesoCorporal,tipoDiabetes)=>{
    let dosisPeso=0;
    let dosisGlucosa=0;
    
    dosisPeso = tipoDiabetes === 1 ?(pesoCorporal*50)/100 :(pesoCorporal*20)/100;
    dosisGlucosa = nivelGlucosa>180 ? (nivelGlucosa*50)/100:0;

    return dosisPeso+dosisGlucosa;
}   
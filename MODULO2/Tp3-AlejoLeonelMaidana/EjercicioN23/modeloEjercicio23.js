export const funcionGuardarEstado = (estadoAplicacionEjercicio23) =>{
    let estadoAppEjercicio23 = JSON.stringify(estadoAplicacionEjercicio23);
    localStorage.setItem("estadoAppEjercicio23",estadoAppEjercicio23)
}


export const funcionRecuperarEstado = (estadoAplicacionEjercicio23,idMetrosCubicos) =>{
    let datosRecuperadoEjercicio23 = localStorage.getItem("estadoAppEjercicio23");

    if(datosRecuperadoEjercicio23){
        let estadoObjeto = JSON.parse(datosRecuperadoEjercicio23);

        estadoAplicacionEjercicio23.metrosCubicos = estadoObjeto.metrosCubicos;
        idMetrosCubicos.value = estadoObjeto.metrosCubicos;
    }
}

export const funcionCalcularImporteAgua = (metrosCubicos)=>{ //le cambie el nombre de la funcion por que me daba tok
    let metrosFacturables = metrosCubicos < 50 ? 50 : metrosCubicos;

    let bloque1Lleno = 50*350;
    let bloque2Lleno = 20*555.20;

    if(metrosFacturables===50){
        return (metrosFacturables*350)//es lo mismo que si pongo bloque1Lleno que declare arriba pero para hacer de todo un poco lo dejo asi
    }

    if(metrosFacturables<=70){
        let excendente = metrosFacturables-50;
        return bloque1Lleno + (excendente*555.20);
    }

    let excedente = metrosFacturables - 70;
    return bloque1Lleno + bloque2Lleno + (excedente*1552.20);
}

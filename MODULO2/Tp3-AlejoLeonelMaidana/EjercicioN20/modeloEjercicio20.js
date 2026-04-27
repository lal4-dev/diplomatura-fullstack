export const funcionGuardarEstado = (estadoAplicacion)=>{
    let estadoApp = JSON.stringify(estadoAplicacion);
    localStorage.setItem("estadoApp",estadoApp);
}

export const funcionRecuperarEstado = (estadoAplicacion,idNota1,idNota2,idNota3)=>{
    let datoRecuperado = localStorage.getItem("estadoApp");

    if(datoRecuperado){
        let estadoObjeto = JSON.parse(datoRecuperado);

        idNota1.value = estadoObjeto.nota1;
        idNota2.value = estadoObjeto.nota2;
        idNota3.value = estadoObjeto.nota3;

        estadoAplicacion.nota1 = estadoObjeto.nota1;
        estadoAplicacion.nota2 = estadoObjeto.nota2;
        estadoAplicacion.nota3 = estadoObjeto.nota3;
    }
}

export const funcionCalcularPromedio = (nota1,nota2,nota3)=>{
    let promedioNotas = (nota1+nota2+nota3)/3;

    return promedioNotas;
}
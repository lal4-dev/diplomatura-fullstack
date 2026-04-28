export const funcionGuardarEstado = (estadoAplicacion) =>{
    let estadoApp = JSON.stringify(estadoAplicacion);
    localStorage.setItem("estadoApp",estadoApp);
}

export const funcionRecuperarEstado = (estadoAplicacion,idNotaPromedio) =>{
    let datoRecuperado = localStorage.getItem("estadoApp");
    if(datoRecuperado){
        let estadoObjeto = JSON.parse(datoRecuperado);
        idNotaPromedio.value = estadoObjeto.notaPromedio;
        estadoAplicacion.notaPromedio = estadoObjeto.notaPromedio; 
    }
}

export const funcionCondicionAlumno = (notaPromedio)=>{
    let notaClasificacion = ``;
    //early return
    if(notaPromedio < 0 || notaPromedio > 10) return "Nota inválida";

    if(notaPromedio <= 4) return notaClasificacion = `“Desaprobado”`;
    if(notaPromedio > 4 && notaPromedio<=7) return notaClasificacion = `“Aprobado”`;
    if(notaPromedio > 7 && notaPromedio<10) return notaClasificacion = `“Muy Bueno”`;
    if(notaPromedio === 10) return notaClasificacion = `“Excelente”`;

    
}
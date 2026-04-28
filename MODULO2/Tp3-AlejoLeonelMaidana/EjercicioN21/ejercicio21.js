import{funcionGuardarEstado,funcionRecuperarEstado,funcionCondicionAlumno} from "./modeloEjercicio21.js"

/*
Ejercicio21
Realizar una arrow function que reciba como parámetro una nota promedio y que según la nota recibida 
como parámetro devuelva un texto que diga los siguientes mensajes. 
• Si la nota <= 4 debe devolver “Desaprobado” 
• Si la nota > 4 y nota <= 7 debe devolver “Aprobado” 
• Si la nota >7 y nota <=9 debe devolver “Muy Bueno” 
• Si la nota = 10 debe devolver “Excelente” 
Nota: Debe Devolver un Texto
*/

window.onload = ()=>{
    const idNotaPromedio = document.querySelector("#idNotaPromedio");
    const idRespuesta = document.querySelector("#idRespuesta");
    const idButtonCalcular = document.querySelector("#idButtonCalcular");

    const estadoAplicacion = {
        notaPromedio:0,
    }

    funcionRecuperarEstado(estadoAplicacion,idNotaPromedio);

    idNotaPromedio.oninput = ()=>{
        estadoAplicacion.notaPromedio = Number(idNotaPromedio.value);
        funcionGuardarEstado(estadoAplicacion);
    }


    idButtonCalcular.onclick = ()=>{
        let estadoAlumno = funcionCondicionAlumno(estadoAplicacion.notaPromedio);

        idRespuesta.textContent = `El alumno se lo puede clasificar como: ${estadoAlumno}`;
    }
}
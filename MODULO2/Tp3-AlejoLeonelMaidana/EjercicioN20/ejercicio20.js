import {funcionGuardarEstado,funcionRecuperarEstado,funcionCalcularPromedio} from "./modeloEjercicio20.js";

/*
Ejercicio 20
Realizar una arrow function que reciba como parámetro las 3 notas que obtuvo un alumno en los 
distintos trabajos prácticos de una materia y que a partir de esas notas obtenga el promedio de las mismas 
 
 Nota: Debe devolver un número

*/

window.onload= ()=>{
    const idNota1 = document.querySelector("#idNota1");
    const idNota2 = document.querySelector("#idNota2");
    const idNota3 = document.querySelector("#idNota3");
    const idPromedio = document.querySelector("#idPromedio");
    const idButtonCalcular = document.querySelector("#idButtonCalcular");

    const estadoAplicacion = {
        nota1:0,
        nota2:0,
        nota3:0,
    }

    funcionRecuperarEstado(estadoAplicacion,idNota1,idNota2,idNota3);

    idNota1.oninput = ()=>{
        estadoAplicacion.nota1 = Number(idNota1.value);
        funcionGuardarEstado(estadoAplicacion);
        console.log(estadoAplicacion)
    }

    idNota2.oninput = ()=>{
        estadoAplicacion.nota2 = Number(idNota2.value);
        funcionGuardarEstado(estadoAplicacion);
    }

    idNota3.oninput = ()=>{
        estadoAplicacion.nota3 = Number(idNota3.value);
        funcionGuardarEstado(estadoAplicacion);
    }

    idButtonCalcular.onclick = ()=>{ 

        let promedio = funcionCalcularPromedio(estadoAplicacion.nota1,estadoAplicacion.nota2,estadoAplicacion.nota3); //paso los parametros asi en lugar de declarar las notas por el mismo estado de aplicacion ya tiene las notas en tipo numerico si no seria repetir codigo de manera inecesaria
        idPromedio.textContent = `El promedio del alumno es: ${promedio.toFixed(2)}`
    }
}
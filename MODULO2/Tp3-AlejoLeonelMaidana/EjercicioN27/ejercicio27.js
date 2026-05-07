import {funcionGuardarEstado,funcionRecuperarEstado,funcionContarVocales} from "./modeloEjercicio27.js"

/*
Ejercicio Nro. 27: 
 Realizar una arrow function que reciba como parámetro una cadena de texto y que devuelva la cantidad 
de vocales “mayúsculas y/o minúsculas” que tiene la misma.  
 Debe recorrer la cadena con un ciclo for, desde el primer carácter hasta el último, analizar cada uno de 
los caracteres y determinar si es una vocal o no. No debe utilizar métodos de strings como replace(), split() o 
expresiones regulares. 
Nota: Debe devolver un número.
*/

window.onload = () =>{
    const idParrafo = document.querySelector("#idParrafo");
    const idRespuesta = document.querySelector("#idRespuesta");
    const idButtonCalcular = document.querySelector("#idButtonCalcular");

    const estadoAplicacionEjercicio27 = {
        parrafo:``
    }

    funcionRecuperarEstado(estadoAplicacionEjercicio27, idParrafo);

    idParrafo.oninput = () =>{
        estadoAplicacionEjercicio27.parrafo = idParrafo.value;
        funcionGuardarEstado(estadoAplicacionEjercicio27);
    }

    idButtonCalcular.onclick = () =>{
        let cantidadVocales = funcionContarVocales(estadoAplicacionEjercicio27.parrafo);
        idRespuesta.textContent = `El parrafo tiene un total de: ${cantidadVocales} vocales`;
    }
}
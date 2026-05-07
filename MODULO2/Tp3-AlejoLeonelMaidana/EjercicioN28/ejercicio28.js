import {funcionGuardarEstado,funcionRecuperarEstado,funcionContarConsonantes} from "./modeloEjercicio28.js"

/*
Ejercicio Nro. 28: 
Realizar una arrow function que reciba como parámetro una cadena de texto y devuelva cuántas 
consonantes contiene (mayúsculas o minúsculas). Es decir consideramos consonante a todo carácter que NO 
SEA VOCAL. 
Debe recorrer la cadena con un ciclo for, analizar cada carácter y determinar si es una letra que no sea vocal. 
No debe utilizar métodos de strings como replace(), split() o expresiones regulares. 
Nota: Debe devolver un número.
*/

window.onload = () =>{
    const idParrafo = document.querySelector("#idParrafo");
    const idRespuesta = document.querySelector("#idRespuesta");
    const idButtonCalcular = document.querySelector("#idButtonCalcular");

    const estadoAplicacionEjercicio28 = {
        parrafo:``
    }

    funcionRecuperarEstado(estadoAplicacionEjercicio28, idParrafo);

    idParrafo.oninput = () =>{
        estadoAplicacionEjercicio28.parrafo = idParrafo.value;
        funcionGuardarEstado(estadoAplicacionEjercicio28);
    }

    idButtonCalcular.onclick = () =>{
        let cantidadConsonantes = funcionContarConsonantes(estadoAplicacionEjercicio28.parrafo);
        idRespuesta.textContent = `El parrafo tiene un total de: ${cantidadConsonantes} consonantes`;
    }
}
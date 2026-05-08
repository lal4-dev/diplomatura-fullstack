import {funcionContarNumeros,funcionGuardarEstado,funcionRecuperarEstado} from "./modeloEjercicio31.js"

/*
Ejercicio Nro. 31: 
Definir una arrow function que reciba como parámetro una cadena de texto y determine si la misma no 
contiene ningún dígito numérico (del 0 al 9). 
La función debe recorrer la cadena carácter por carácter utilizando un ciclo for. Durante el recorrido, analizar 
cada carácter y comprobar si se encuentra dentro del rango de los números '0' a '9'. 
Si se detecta algún número, se debe interrumpir inmediatamente el bucle con break y devolver el valor 
lógico false, ya que la cadena deja de cumplir la condición “no contiene números”. 
En caso de recorrer la cadena completa sin encontrar ningún número, la función deberá devolver true. 
Nota: Debe devolver un boolean (true ó false). 
*/

window.onload = () =>{
    const idParrafo = document.querySelector("#idParrafo");
    const idRespuesta = document.querySelector("#idRespuesta");
    const idButtonCalcular = document.querySelector("#idButtonCalcular");

    const estadoAplicacionEjercicio31 = {
        parrafo:``,
    }

    funcionRecuperarEstado(estadoAplicacionEjercicio31,idParrafo);

    idParrafo.oninput = ()=>{
        estadoAplicacionEjercicio31.parrafo = idParrafo.value;
        funcionGuardarEstado(estadoAplicacionEjercicio31);    
    }

    idButtonCalcular.onclick = ()=>{
        let tieneNumeros = funcionContarNumeros(estadoAplicacionEjercicio31.parrafo);
        let respuesta = tieneNumeros ? `Verdadero` : `Falso`;

        idRespuesta.textContent = `La propiedad es: ${respuesta}`;
    }
}
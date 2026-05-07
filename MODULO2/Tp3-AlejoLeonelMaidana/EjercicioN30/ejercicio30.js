import {funcionContarEspacios,funcionGuardarEstado,funcionRecuperarEstado} from "./modeloEjercicio30.js"

/*
Ejercicio Nro. 30: 
Definir una arrow function que reciba como parámetro una cadena de texto y determine si la misma 
contiene al menos tres espacios en blanco. 
La función debe recorrer la cadena carácter por carácter utilizando un ciclo for. 
Durante el recorrido, deberá contar la cantidad de espacios que se encuentren. 
En el momento en que se detecte el tercer espacio en blanco, la función debe interrumpir inmediatamente el 
ciclo mediante la instrucción break y devolver el valor lógico true. 
Si al finalizar el recorrido completo no se encontraron tres espacios, la función debe devolver false. 
Nota: Debe devolver un boolean (true ó false).
*/

window.onload = () =>{
    const idParrafo = document.querySelector("#idParrafo");
    const idRespuesta = document.querySelector("#idRespuesta");
    const idButtonCalcular = document.querySelector("#idButtonCalcular");

    const estadoAplicacionEjercicio30 = {
        parrafo:``,
    }

    funcionRecuperarEstado(estadoAplicacionEjercicio30,idParrafo);

    idParrafo.oninput = () =>{
        estadoAplicacionEjercicio30.parrafo = idParrafo.value;
        funcionGuardarEstado(estadoAplicacionEjercicio30);
    }

    idButtonCalcular.onclick = () =>{
        let cantidadEspacios = funcionContarEspacios(estadoAplicacionEjercicio30.parrafo);
        let respuesta = cantidadEspacios ? `Verdadero` : `Falso`;

        idRespuesta.textContent = `La propiedad es: ${respuesta}`;
    }

}
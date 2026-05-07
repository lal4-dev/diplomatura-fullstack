import {funcionGuardarEstado, funcionRecuperarEstado, funcionContarS} from "./modeloEjercicio29.js"

/*
Ejercicio Nro. 29: 
Definir una arrow function que reciba una palabra y determine si contiene al menos dos letras “s” 
(mayúsculas o minúsculas). 
La función debe recorrer la palabra con un ciclo for, utilizando un contador o una bandera booleana. 

Debe devolver true si se cumplen las dos apariciones y false en caso contrario. 
No puede utilizar métodos como includes() o indexOf(). 
Nota: Debe devolver un boolean (true ó false)
*/

window.onload = () =>{
    const idParrafo = document.querySelector("#idParrafo");
    const idRespuesta = document.querySelector("#idRespuesta");
    const idButtonCalcular = document.querySelector("#idButtonCalcular");

    const estadoAplicacionEjercicio29 = {
        parrafo:``,
    }

    funcionRecuperarEstado(estadoAplicacionEjercicio29,idParrafo);
    idParrafo.oninput = () =>{
        estadoAplicacionEjercicio29.parrafo = idParrafo.value;
        funcionGuardarEstado(estadoAplicacionEjercicio29)
    }

    idButtonCalcular.onclick = () =>{
        let tieneS = funcionContarS(estadoAplicacionEjercicio29.parrafo);
        let respuesta = tieneS ? `Verdadero` : `Falso`;

        idRespuesta.textContent = `La propiedad es: ${respuesta} `
    }
}
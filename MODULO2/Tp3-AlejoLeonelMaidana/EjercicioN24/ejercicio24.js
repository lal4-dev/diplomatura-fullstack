import {funcionGuardarEstado, funcionRecuperarEstado, funcionTasaSubSuelo} from "./modeloEjercicio24.js"

/*
Ejercicio Nro. 24: 
 Realizar una arrow function que reciba como parámetro el Importe Base de una factura de “Servicios 
Públicos de Aguas de Catamarca” y a partir de ese importe base calcule y devuelva la Tasa de Subsuelo, que es 
un importe que corresponde al 3% del importe Base ingresado como parámetro de la arrow function. 
Nota: Debe devolver un número 

*/

window.onload = ()=>{
    const idImporteBase = document.querySelector("#idImporteBase");
    const idRespuesta = document.querySelector("#idRespuesta");
    const idButtonCalcular = document.querySelector("#idButtonCalcular");

    const estadoAplicacionEjercicio24 = {
        importeBase:0,
    }

    funcionRecuperarEstado(estadoAplicacionEjercicio24,idImporteBase);

    idImporteBase.oninput = () =>{
        estadoAplicacionEjercicio24.importeBase = Number(idImporteBase.value);
        funcionGuardarEstado(estadoAplicacionEjercicio24);
    }

    idButtonCalcular.onclick = ()=>{
        let tasaSuelo = funcionTasaSubSuelo(estadoAplicacionEjercicio24.importeBase)

        idRespuesta.textContent = `La tasa de SubSuelo tiene un costo final de $:${tasaSuelo.toFixed(2)}`
    }

}
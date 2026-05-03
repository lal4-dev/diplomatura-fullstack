import{funcionGuardarEstado, funcionRecuperarEstado,funcionTasaFiscalizacion} from "./modeloEjercicio25.js"

/* 
Ejercicio Nro. 25: 
 Realizar una arrow function que reciba como parámetro el Importe Base de una factura de “Servicios 
Públicos de Aguas de Catamarca” y partir de ese importe base calcule y devuelva la Tasa de Fiscalización ENRE 
(Ente Regulador de Servicios Públicos) que corresponde al 1,2 % del importe Base ingresado como parámetro de 
la arrow function. 
Nota: Debe devolver un número 
*/

window.onload = () =>{
    const idImporteBase = document.querySelector("#idImporteBase");
    const idRespuesta = document.querySelector("#idRespuesta");
    const idButtonCalcular = document.querySelector("#idButtonCalcular");

    const estadoAplicacionEjercicio25 = {
        importeBase:0,
    }

    funcionRecuperarEstado(estadoAplicacionEjercicio25,idImporteBase);

    idImporteBase.oninput = () =>{
        estadoAplicacionEjercicio25.importeBase = Number(idImporteBase.value);
        funcionGuardarEstado(estadoAplicacionEjercicio25);
    }

    idButtonCalcular.onclick = ()=>{
        let importeTasa = funcionTasaFiscalizacion(estadoAplicacionEjercicio25.importeBase)
        idRespuesta.textContent = `La tasa de Fiscalización tiene un costo final de: $${importeTasa.toFixed(2)}`
    }


}
import {funcionGuardarEstado,funcionRecuperarEstado,funcionCalcularTasa} from "./modeloEjercicio22.js"

/*
Ejercicio Nro. 22: 
 El Gobierno Nacional desea aplicar un impuesto (Sobre Tasa) a las bebidas en función de la siguiente 
clasificación y tipo. 
1 – Bebidas Agua en envases plásticos = 5 ‰ (cinco por mil) 
2 – Bebidas Agua en envases retornables = 1 ‰ (uno por mil) 
3 – Bebidas Gaseosas Azucaradas en envases plásticos = 7 ‰ (siete por mil) 
4 – Bebidas Gaseosas Azucaradas en envases retornables = 2 ‰ (dos por mil) 
5 – Bebidas Energéticas = 15 ‰ (quince por mil) 
6 – Cualquier otra bebida no clasificada = 1 ‰ (uno por mil). 
 La función debe recibir el Importe Base de la Bebida, debe calcular y retornar la sobre Tasa, la 
recaudación de ese impuesto tendrá destino a la protección del medio ambiente.
*/

window.onload= ()=>{
    const idImporteBaseBebida = document.querySelector("#idImporteBaseBebida");
    const idClasificacionBebida = document.querySelector("#idClasificacionBebida");
    const idBotonCalcular = document.querySelector("#idBotonCalcular");
    const idRespuesta = document.querySelector("#idRespuesta");

    const estadoAplicacionEjercicio22 = {
        importe:0,
        clasificacion:1,
    }

    funcionRecuperarEstado(estadoAplicacionEjercicio22,idImporteBaseBebida,idClasificacionBebida);

    idImporteBaseBebida.oninput = ()=>{
        estadoAplicacionEjercicio22.importe = Number(idImporteBaseBebida.value);
        funcionGuardarEstado(estadoAplicacionEjercicio22);
    }

    idClasificacionBebida.onchange = ()=>{
        estadoAplicacionEjercicio22.clasificacion = Number(idClasificacionBebida.value);
        funcionGuardarEstado(estadoAplicacionEjercicio22);
    }

    idBotonCalcular.onclick = ()=>{
        let sobreTasa = funcionCalcularTasa(estadoAplicacionEjercicio22.importe,estadoAplicacionEjercicio22.clasificacion);
        idRespuesta.textContent = `La bebida tiene una sobre tasa en forma de impuetos de: $${sobreTasa}`
    }
}
import { funcionCalculoPrecioVenta } from "./modeloClase14.js"

/* 
Ejercicio 19
    Realizar una arrow function que reciba dos parametros de entrada. 
    El parametro 1 sera el importe de compra de un producto, el segundo 
    sera el margen de ganancia que se aplicara sobre el producto, 
    la funcion deber retornar el precio d de venta que era igual a 
    aplicar el % de margen de ganancia . La funciondeber retornar 
    el precio de venta (Sin impuestos)
*/

const funcionGuardarEstado = (estadoAplicacion) =>{
    let estadoApp = JSON.stringify(estadoAplicacion);
    localStorage.setItem("estadoApp",estadoApp)
}

const funcionRecuperarEstado =() =>{
    let datoRecuperado = localStorage.getItem("estadoApp");

    if(datoRecuperado){
        let estadoObjeto = JSON.parse(datoRecuperado);

        idMargenGanancia.value = estadoObjeto.margen;
        idImporteCompra.value = estadoObjeto.importeCompra;

        estadoAplicacion.margen = estadoObjeto.margen
        estadoAplicacion.importeCompra = estadoObjeto.importeCompra
    }

    

}

window.onload = ()=>{
    const idImporteCompra = document.querySelector("#idImporteCompra");   
    const idMargenGanancia = document.querySelector("#idMargenGanancia"); 
    const idButtomCalculo = document.querySelector("#idButtomCalculo");
    const idResultado = document.querySelector("#idResultado");
    const idButtomRecuperar = document.querySelector("#idButtomRecuperar")

    const estadoAplicacion = {
        importeCompra:0,
        margen:0,
    }

    idImporteCompra.oninput = ()=>{
        estadoAplicacion.importeCompra = Number(idImporteCompra.value);
        funcionGuardarEstado(estadoAplicacion);
    }

    idMargenGanancia.oninput = ()=>{
        estadoAplicacion.margen = Number(idMargenGanancia.value);
        funcionGuardarEstado(estadoAplicacion);
    }
    

    idButtomCalculo.onclick = ()=>{
        let margen = Number(idMargenGanancia.value);
        let importeCompra = Number(idImporteCompra.value);

        let resultado = funcionCalculoPrecioVenta(importeCompra,margen);

        idResultado.textContent = `El importe de la compra: ${estadoAplicacion.importeCompra} + ${estadoAplicacion.margen} = ${resultado}`
        
    }

    idButtomRecuperar.onclick = ()=>{
        funcionRecuperarEstado();
    }
}
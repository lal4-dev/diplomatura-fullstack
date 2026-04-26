import {funcionGananciaProducto,funcionGuardarEstado,funcionRecuperarEstado} from "./moduloEjercicio19.js"

/*Ejercicio Nro. 19: 
 Realizar una arrow function que reciba dos parámetros de entrada. El parámetro 1 será el importe de 
compra de un producto, el segundo será el margen de ganancia que se aplicará sobre ese producto, la función 
debe retornar el precio de venta que será igual a aplicarle el % de margen de ganancia. La función debe retornar 
el precio de venta (sin impuestos). 
 Nota: Debe devolver un número*/


window.onload = () =>{
    const idPrecioProducto = document.querySelector("#idPrecioProducto");
    const idGanaciaProducto = document.querySelector("#idGanaciaProducto");
    const idButtonCalcular = document.querySelector("#idButtonCalcular");
    //const idButtonRecuperar = document.querySelector("#idButtonRecuperar"); -> agregue la funcion al principio para que se lanse en automatico sin la necesidad de un boton para recuperar
    const idPrecioSugerido = document.querySelector("#idPrecioSugerido");

    const estadoAplicacion ={
        precio:0,
        ganancia:0,
    }

    funcionRecuperarEstado(estadoAplicacion,idPrecioProducto,idGanaciaProducto);


    idPrecioProducto.oninput = ()=>{
        estadoAplicacion.precio = Number(idPrecioProducto.value);
        funcionGuardarEstado(estadoAplicacion);
        console.log(estadoAplicacion)
    }

    idGanaciaProducto.oninput = () =>{
        estadoAplicacion.ganancia = Number(idGanaciaProducto.value);
        funcionGuardarEstado(estadoAplicacion);
    }

    idButtonCalcular.onclick = ()=>{
        let precioProducto= Number(idPrecioProducto.value);
        let gananciaProducto = Number(idGanaciaProducto.value);

        let precioVenta = funcionGananciaProducto(precioProducto,gananciaProducto);
        
        idPrecioSugerido.textContent = `Precio de Venta Sugerido: ${precioVenta}`
    }

    
} 
/*
Ejercicio Nro. 02:
    Realizar un programa que permita ingresar el importe total de una compra que realiza un cliente y sobre el mismo aplicarle un descuento del 15%. Mostrar por consola el importe total de la compra y el descuento del 15% como así también el importe restante final. 
*/


{
    let importeCompra = 0;
    let descuentoImporte = 0;
    let totalPagar = 0;

    importeCompra = Number(prompt(`Ingrese el monto de la compra: `))
    
    descuentoImporte = (importeCompra * 15)/100;
    totalPagar = (importeCompra - descuentoImporte);

    console.log(`El importe de la compra es: ${importeCompra}`);
    console.log(`el descuento es: ${descuentoImporte}`);
    console.log(`el monto a pagar final es: ${totalPagar}`);
}
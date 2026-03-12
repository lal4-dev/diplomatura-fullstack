
/*
Ejercicio Nro. 09: Estructuras Condicionales (if/else) 
    Una  plataforma  de  venta  de  pasajes  (terrestres)  desea  realizar  una  aplicación  web  que  permita  realizar la venta de los mismos, para ello el dueño propone las siguientes reglas tratando de promover las ventas.

    - Si la cantidad de Pasajes es mayor a 3 y el importe total de la compra es mayor a 250.000,00 pesos, se aplicará un descuento del 11% sobre el total de la compra.

    -Si la cantidad de pasajes es mayor a 3 y el importe total de la compra es mayor a 500.000,00 pesos, se aplicará un descuento del 15% sobre el total de la compra. 

El Sistema debe registrar mínimamente estas variables: 
- cantidad de pasajes 
- importe pasaje 
- total compra = cantidad de pasajes * importe pasaje 
*/

{
    let cantidadPasajes = 0;
    let importePasaje = 0;

    let totalCompra = 0;
    let descuento = 0;
    let totalPagarFinal = 0;

    importePasaje = Number(prompt(`Ingrese el importe del pasaje: `));
    cantidadPasajes = Number(prompt(`Ingrese la cantidad de pasajes: `));

    totalCompra = (cantidadPasajes * importePasaje);

    if((cantidadPasajes>3)&&(totalCompra>500000)){
        descuento = (totalCompra * 15)/100;
    }
    else{
        if((cantidadPasajes>3)&&(totalCompra>250000)){
            descuento = (totalCompra * 11)/100;
        }
    }

    totalPagarFinal = totalCompra - descuento;

    console.log(`La cantidad de pasajes que se van a comprar es: $${cantidadPasajes}, el precio de cada pasaje es: $${importePasaje}, el total de la compra es: $${totalCompra}, el descuento seria: $${descuento}, y el final a abonar es: $${totalPagarFinal}`);

}
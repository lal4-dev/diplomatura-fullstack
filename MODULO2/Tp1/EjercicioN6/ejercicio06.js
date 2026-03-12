/*Ejercicio Nro. 06: Estructuras Condicionales (if/else) 
    Banco  Nación  de  la  República  Argentina,  tiene  una  promoción  muy  importante  para  sus  clientes denominada “one shot” que consta en realizar un importante de descuento del 50% en las compras del cliente,teniendo en cuenta que el descuento máximo a otorgar (descuento tope) es equivalente a 80.000,00 (ochenta mil pesos argentinos).

    Realice un programa que permita introducir el valor de la compra y calcular el porcentaje de descuento sabiendo que no se puede pasar el límite establecido. 
*/

{
    let montoCompra = 0;
    let descuento = 0;
    let topeDescuento = 80000;

    montoCompra = Number(prompt("Ingrese el monto de la compra"));

    descuento = (montoCompra * 50) / 100;

    if(descuento > topeDescuento){
        descuento = topeDescuento;
    }

    let importeFinal = montoCompra - descuento;

    console.log(`Monto de compra: $${montoCompra}, Descuento aplicado: $${descuento}, Importe final a pagar: $${importeFinal}`);
}
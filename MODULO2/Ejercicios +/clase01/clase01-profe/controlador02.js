
/* Vamos a realizar un programa que dado
un importe "X" calcule un descuento del 15%
y que al final muestre el total a pagar 
*/

{
    /* Los importes numericos 
    no llevan nunca el separador de miles. y 
    el separador decimal es el .
    
    
    */

    let importeDeCompra = 5500000;  

    let descuento = (importeDeCompra * 15)/100;

    console.log("El importe de la compra es :",importeDeCompra);

    console.log("El descuento calculado es:",descuento);

    let importeTotalAPagar = importeDeCompra - descuento;

    console.log(`El Importe a Pagar es`,importeTotalAPagar);


}

/* APRENDER A PENSAR COMO UN PROGRAMADOR
QUE UTILIZA MUCHA LOGICA DE PROGRAMACIÓN.
QUE ES UN OFICIO => que requiere dedicación.

    1 HORA de EJERCICIOS TODOS LOS DIAS
    
    5 HORAS EL SABADO

*/
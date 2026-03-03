{
    /*
    estructura de condicionales
    -if/else
    -switch
    -operador ternario

    Un comercio necesita una aplicación web 
    que permita realizar descuentos del 3.5 % 
    para las compras que sean mayores a 200.000,00
    lo que tiene que aplicación es calcular 
    el descuento y mostrar el total a pagar.
    */

    /* 
    El dueño de un comercio desea realizar
    una aplicación que calcule automáticamente
    los descuentos siguiendo esta regla.

    Si la compra esta entre 20.000 y 50.000 => descuento del 3,7%
    Si la compra esta entre 50.000 y 100.000 => descuento del 6%
    Si la compra es mayor a 100.000 => descuento será del 15%
    */

    let importeCompra = 0;
    let descuento = 0;
    let importePagar=0;

    importeCompra = Number(prompt(`Sr. ingrese el importe de la compra`));

    if((importeCompra>=20000) && (importeCompra<=50000)){
        descuento = (importeCompra*3.7)/100;
        console.log(`Entra en el caso 1 - descuento del 3.7%`);
    }
    else{
        if((importeCompra>50000)&&(importeCompra<=100000)){
            descuento = (importeCompra*6)/100;
            console.log(`Entra en el caso 2 - descuento del 6%`)
        }
        else{
            if((importeCompra>100000)){
                descuento = (importeCompra*15)/100;
                console.log(`Entra en el caso 3 - descuento del 15%`)

            }
            else{
                console.log(`no entra en ningun descuento necesita una orden de compra mayor para hacer un descuento`)
            }
        }

    }

    importePagar = importeCompra - descuento;

    let textoFinal= `El importe de la compra es: ${importeCompra}, el descuento es: ${descuento}, el total a pagar es: ${importePagar}`;
    console.log(textoFinal);


}
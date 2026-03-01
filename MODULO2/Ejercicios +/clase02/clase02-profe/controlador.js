
/* 
    Estructuras Condicionales 

    -if/else
    -switch
    -operador ternario

    Un comercio necesita una aplicación web 
    que permita realizar descuentos del 3.5 % 
    para las compras que sean mayores a 200.000,00
    lo que tiene que aplicación es calcular 
    el descuento y mostrar el total a pagar.

    lunes 7%
    martes 3%
    miercoles 

    viernes 10%
    sabado 0%
    domingo 0%

*/

{
    let importeDeCompra = 0; // se llama inicialización de variables

    /* esto me permite ingresar valores desde el teclado */
    importeDeCompra = Number(prompt(`Sr. Ing. el importe de la compra`));

    /* La Estructura Condicional genera una bifurcación
    en el código. es decir, la aplicación ingresa o 
    por un lado ó por el otro. Nunca entra por los dos
    lados. 
    */

    /* Particularidades 
    
        - no lleva ; de terminación del if/else
        - tiene dos bloques de código diferentes
    
    */

    let descuento = 0;

    if(importeDeCompra > 200000)
    {
        descuento = (importeDeCompra * 3.5)/100;
        console.log(`entro por el lado verdadero del if`)
    }
    else
    {
        descuento = 0;
        console.log(`entro por el lado falso`);
    }

    let importeAPagar = 0; // declarar e inicializar las variables en cero o en ""

    importeAPagar = importeDeCompra - descuento;

    // esto es un console.log del pasado //
    //console.log(`Importe de Compra`,importeDeCompra,` El descuento es`,descuento, `Total a Pagar `,importeAPagar);    
  
    // hoy se utiliza la interporlación de string. cadenas //

    /* interpolación de strings. con Backsticks no es mas
    que la unión. fusión. de texto con variables */

    let textoFinal = `Importe de Compra: ${importeDeCompra} descuento: ${descuento} total a pagar: ${importeAPagar}`;

    console.log(textoFinal);

}

/* PROGRAMAR NO ES ESCRIBIR UNA CARTA */

/*
{

    let importe = 200;

    let importeTotal = "200";

    console.log(importe);

    console.log(importeTotal);
}*/

/* 
    - Las Variables nacen y mueren en el bloque de código 
    - En un mismo bloque de codigos {} no pueden existir dos variables iguales

*/

/*
{
    let importeDeFacturacion = 20;
    console.log(importeDeFacturacion);
}


{
    let importeDeFacturacion = 20;
}
*/

/*
{
    let descuento = 0;

    {
        console.log(descuento);
    }

    {
        console.log(descuento);
    }
}
*/
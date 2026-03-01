
/* 
    if/else es la mas potente.

    if(comparacion logica)
    {
    }
    else
    {
    }

    if(a > b)   => estoy preguntando si a es mayor a b
    if(a >= b)  => estoy preguntando si a es mayor o igual a b
    if(a < b)   => si a es menor a b
    if(a <= b)  => Si a es menor o igual a b

    if ((a > b) && (b >= c))
    {

    }

    if((edad >= 18) && (edad <= 25))
    {
    }

*/

/* 
    Cuando tengo variables numericas

        - edadPersona
        - pesoPersona
        - pesoCamion
        - pesoComida
        - sueldoEmpleado
        - cantidadGlobulosBlancos
        - cantidadGlobulosRojos

    Tipificar

        * Continuas => pueden asumir infinitos valores en un rango
        * Discretas => pueden asumir valores claramente diferenciados
        
            diaDeLaSemana = 1, 2, 3, ...7

            quierePagarEnvio = (SI/NO) ?.

    
    variables continuas => if/else

    variables discretas => switch

    operaciones lógicas => operador ternario.

*/ 

/* 
    El dueño de un comercio desea realizar
    una aplicación que calcule automáticamente
    los descuentos siguiendo esta regla.

    Si la compra esta entre 20.000 y 50.000 => descuento del 3,7%
    Si la compra esta entre 50.000 y 100.000 => descuento del 6%
    Si la compra es mayor a 100.000 => descuento será del 15%
*/

{
    let importeDeCompra = 0; // siempre declaro e inicializo en cero.

    importeDeCompra = Number(prompt(`Sr. Ingrese el importe de la compra ?.`));

    console.log(importeDeCompra);

    let descuento = 0; // declaro e inicializo el descuento en cero.

    if((importeDeCompra >= 20000) && (importeDeCompra <= 50000))
    {
        console.log(`Entra por el caso 1 - 3.7% descuento`);
        descuento = (importeDeCompra * 3.7)/100;
    }
    else
    {
        if((importeDeCompra > 50000) && (importeDeCompra <= 100000))
        {
            console.log(`Entra por el Caso 2 - 6%`);
            descuento = (importeDeCompra * 6)/100;
        }
        else
        {
            if(importeDeCompra > 100000)
            {
                console.log(`Entra por Caso 3  - 15%`);
                descuento = (importeDeCompra * 15)/100;
            }
            else
            {
                console.log(`entraría desde 0 a 19.999.99`);
                descuento = 0;
            }
        }
    }

    let totalAPagar = importeDeCompra - descuento;

    console.log(`Importe Compra ${importeDeCompra} descuento: ${descuento} Total a pagar: ${totalAPagar}`);


}
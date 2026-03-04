/*
    Estructuras condicionales 
    - if/else => estructuras condicionales complejas, variables continuas. 
        variables dentro de un rango pueden asumir infinitos valores

        if(){
            -las variables nacen y mueren en el bloque
            -permite tener mas de una sentencia
        }
    - switch => estructura condicional mas simple, que me permite evaluar
    - operador ternario
*/


/*Un comercio aplica un descuento sobre el importe de compra segun la forma de pago:
1) Efectivo -> 10% descuento
2) Debito -> 5% descuento
3) Credito -> Sin descuento

calcular el descuento y mostrar total final. Utilizar estructura switch*/

{
    let importeCompra = 0;
    let descuento = 0;
    let pagoTotal=0;
    let tipoPago = 0;
    let operacionCorrecta = false;

    importeCompra = Number(prompt(`Indique monto de compra`));
    tipoPago = Number(prompt(`Indique el tipo de pago 1-Efectivo, 2-Debito, 3-Credito`));

    console.log(importeCompra,tipoPago)

    switch(tipoPago){
        case 1:{
            console.log(`Contado 10% de descuento`);
            descuento = (importeCompra*10)/100;

            operacionCorrecta = true

            break;
        }

        case 2:{
            console.log(`debito 5% de descuento`);
            descuento = (importeCompra*5)/100;
            
            operacionCorrecta = true

            break;
        }

        case 3:{
            console.log(`credito no hay descuento`)
            descuento = 0;

            operacionCorrecta = true

            break;
        }

        default:{
            console.log(`Eligi bien papi`);
            descuento = 0;

            operacionCorrecta = false

            break;
        }
    }

    if(operacionCorrecta){

        pagoTotal = importeCompra - descuento;
        console.log(`Importa Compra: ${importeCompra}, Descuento: ${descuento}, Total a Pagar: ${pagoTotal}`);

    }
    else{
        console.log(`Usted eligio una operacion incorrecta`);
    }

}


/* 
    un restaurante tiene que facturar el importe de servicio y el 20% del servicio de mozo
    siempre y cuando la compra sea menor a 100 dolares

    si consumis menos de 100 dolares no pagas el 20%
    si consumis 100 o mas pagas el20%
*/
{
    let importeConsumision = 0;
    importeConsumision  = Number(prompt(`Ingrese el importe de consumision`));

    let servicioMeza = importeConsumision >= 100 ? (importeConsumision * 20) /100 : 0;

    let totalAPagar = importeConsumision + servicioMeza ;
    
    console.log(importeConsumision, servicioMeza, totalAPagar);
}
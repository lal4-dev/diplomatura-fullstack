
/*
Ejercicio Nro. 10: Estructuras Condicionales (if/else)

    Un comercio aplica un descuento sobre el importe de compra segun la forma de pago:
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

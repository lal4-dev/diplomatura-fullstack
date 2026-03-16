/*
Ejercicio Nro. 12: Estructuras Condicionales (if/else)    
El programa One Shot Plus fue un beneficio implementado en la provincia de Catamarca en conjunto con el Banco Nación para incentivar el consumo en comercios locales. 
    
    El beneficio consistía en: 
        - 50% de reintegro sobre el monto de la compra 
        - tope máximo de reintegro: $80.000 
        - válido para compras realizadas los días viernes, sábado y domingo 

    El programa debe: 
    1. Solicitar al usuario: 
        - el día de la compra 
        - el importe de la compra 
 
    2. Verificar si la compra fue realizada un viernes, sábado o domingo. 
        - Si no fue uno de esos días, no se aplica el beneficio. 
 
    3. Si corresponde el beneficio: 
    - calcular el 50% del importe de la compra 
    - verificar si el reintegro supera el tope de $80.000 
    - si lo supera, aplicar solamente el tope 
 
    4. Mostrar: 
    - día de la compra 
    - importe de la compra 
    - reintegro obtenido 
    - importe final pagado por el cliente
*/

{
    let dia = 0;

    let montoCompra = 0; 
    let descuento = 0;
    let reintegro = 0;
    let tope = 80000;
    let importeFinal = 0;

    let diaValido = true;

    dia = Number(prompt(`Ingrese el dia de la compra - 1 = Lunes, 2 = Martes, ...: `));
    montoCompra = Number(prompt(`Ingrese el monto de compra: `));

    switch(dia){
        case 5:{
            reintegro = (montoCompra * 50)/100;
            diaValido=true;

            break;
        }

        case 6:{
            reintegro = (montoCompra * 50)/100;
            diaValido = true;

            break;
        }

        case 7:{
            reintegro = (montoCompra * 50)/100;
            diaValido = true;

            break;
        }

        default:{
            diaValido = false;
            descuento = 0;
            console.log(`Este dia no es un da valido`)
            
            break;
        }
    }

    if(diaValido){
        console.log(`El usuario pago en un dia correcto`);
        descuento = reintegro>tope ? tope : reintegro;
    }
    else{
        descuento = 0;
        console.log(`El usuario pago en un dia de no promocion`);
    }

    importeFinal = montoCompra - descuento;


    console.log(`La compra se realizo el dia: ${dia} de la semana, el importe de la compra es: $${montoCompra}, el reintegro es de: $${descuento}, el importe final de la compra es de: $${importeFinal}`)
}

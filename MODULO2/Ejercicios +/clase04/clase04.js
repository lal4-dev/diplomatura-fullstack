/*
EJERCICIO NRO. 08: Programa One Shot Plus 
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

/*
EJERCICIO NRO. 09: Programa Marcatón 
    El programa Marcatón, realizado en Catamarca junto al Banco Nación, ofrece descuentos en distintos rubros comerciales. 

Tabla de descuentos: 
 
Rubro                Descuento      Tope máximo 
Vestimenta           20%            $80.000 
Perfumería           20%            $80.000 
Librería             30%            $90.000 
Electrodomésticos    15%            $70.000 
Calzado              20%            $80.000 


El programa debe: 
    1. Solicitar el rubro del comercio. 
    2. Solicitar el importe de la compra. 
    3. Calcular el descuento correspondiente. 
    4. Verificar si el descuento supera el tope del rubro. Si lo supera, aplicar solo el tope. 
 
    5. Mostrar: 
        - rubro 
        - importe de la compra 
        - descuento aplicado 
        - importe final a pagar. 

*/

{
    let rubro = 0;
    let nombreRubro=``;
    let montoCompra = 0;
    let descuento=0;
    let reintegro=0;

    let topeVestimenta = 80000;
    let topePerfumeria = 80000;
    let topeLibreria = 90000;
    let topeElectrodomesticos = 70000;
    let topeCalzados = 80000;

    let importeFinal = 0;

    rubro = Number(prompt(`Ingrese el rubro: 1-vestimenta, 2-perfumeria, 3-libreria, 4-electrodomesticos, 5-calzado`));
    montoCompra = Number(prompt('Ingrese el monto de la compra: '));

    switch(rubro){
        case 1:{
                reintegro = (montoCompra *20)/100;
                descuento = reintegro > topeVestimenta ? topeVestimenta : reintegro;
                nombreRubro = `Vestimenta`;

            break;
        }

        case 2:{
                reintegro = (montoCompra *20)/100;
                descuento = reintegro > topePerfumeria ? topePerfumeria :  reintegro;
                nombreRubro = `Perfumeria`;

            break;
        }

        case 3:{
                reintegro = (montoCompra *30)/100;
                descuento = reintegro > topeLibreria ? topeLibreria : reintegro;
                nombreRubro = `Libreria`;
            
            break;
        }

        case 4:{
                reintegro = (montoCompra *15)/100;
                descuento = reintegro > topeElectrodomesticos ? topeElectrodomesticos : reintegro;
                nombreRubro = `Electrodomesticos`;
            break;
        }

        case 5:{
                reintegro = (montoCompra *20)/100;
                descuento = reintegro > topeCalzados ? topeCalzados : reintegro
                nombreRubro = `Calzado`;

            break;
        }


        default:{
            console.log(`No hay rubro relacionado con la eleccion`);
        }

    }

    importeFinal = montoCompra - descuento;

    console.log(`El rubo en el cual se hizo la compra es: ${nombreRubro}, el importe de la compra es: $${montoCompra}, el descuento aplicado es: $${descuento}, y el importe final de la compra es: $${importeFinal}`);
}
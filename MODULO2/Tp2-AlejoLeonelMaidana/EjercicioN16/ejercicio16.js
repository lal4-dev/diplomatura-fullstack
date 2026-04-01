/*
Ejercicio Nro. 16: 
 El dueño de una concesionaria desea lanzar una promoción de venta de sus vehículos 0 km. que tiene en STOCK. Para ello nos cuenta que tiene tres vehículos disponibles para la venta y el precio de los mismos es el siguiente: 
 
    1) Amarok V6 (Oferta: 65.000.000) 
    2) TAOS 53.000.000 
    3) Polo Nuevo 47.000.000 
 
El Gerente nos indica se debería realizar una aplicación debe permitir a los interesados (clientes) 
 
    1ro) Selecciona el Vehículo de interés 

    2do) Que el cliente pueda ingresar el dinero disponible para la compra del vehículo, sabiendo que el dinero a entregar debe ser mayor al 30% del valor del vehículo y menor al importe total del mismo. 

    3ro) El Sistema debe calcular la financiación del dinero restante a pagar, sabiendo que la diferencia a pagar sería equivalente al valor total del vehículo elegido menos el dinero a entregar; esa diferencia será financiada de la siguiente forma: 
     
    12 cuotas - 9.9 % ANUAL  
    24 cuotas - 22 % ANUAL 
    36 cuotas - 33 % ANUAL 
 
Consideraciones: para realizar el ejercicio debe utilizar solamente código JavaScript, sin interacción con el DOM y cargar los datos de entrada por medio de prompt. 
*/

{
    let precioAmarok = 65000000;
    let precioTaos = 53000000;
    let precioPolo = 47000000;

    let vehiculo = 0;
    let minimo = 0;
    let plan = 0;
    let pendiente = 0;
    let cuotas = 0;
    let interes = 0;
    let restoPagar = 0;
    let cuotaMensual = 0;
     
    let continuar = `Si`;
    let dineroDisponible=0;
    let precioVehiculo=0;

    while(continuar === `Si` || continuar===`si`){
        vehiculo = Number(prompt(`Que vehiculo quiere comprar 1-Amarok V6, 2-TAOS, 3-Polo`));

        switch(vehiculo){
            case 1:{
                precioVehiculo = precioAmarok;
                break;
            }

            case 2:{
                precioVehiculo=precioTaos;
                break;
            }

            case 3:{
                precioVehiculo = precioPolo;
            }

            default:{
                console.log(`El vehiculo ingresado no esta en nuestro catalago de ofertas`);
                continue;
            }
        }

        dineroDisponible = Number(prompt(`Ingrese el dinero disponible como enganche`));
        minimo = (precioVehiculo * 30)/100;
        
        if(dineroDisponible <= minimo || dineroDisponible>=precioVehiculo){
            console.log(`Monto invalido para este plan tiene que ser mayor al 30% del valor del vehiculo o menos a su total`);
            continue;
        }


        plan = Number(prompt(`Que plan de pago quiere: [1] 12 cuotas(9.9%) - [2] 24 cuotas(22%) - [3] 36 cuotas(33%)`));

        switch(plan){
            case 1:{
                cuotas = 12;
                interes = 9.9;

                break;
            }

            case 2:{
                cuotas = 24;
                interes = 22;

                break;
            }

            case 3:{
                cuotas = 36;
                interes = 33;
                break;
            }

            default:{
                console.log(`Plan de pago invalido`);
                continue;
            }
        }

        pendiente = precioVehiculo - dineroDisponible;
        restoPagar = pendiente + ((pendiente*interes)/100);
        cuotaMensual = restoPagar / cuotas;

        console.log(`Total a pagar en financiacion : ${restoPagar}`);
        console.log(`Cuotas: ${cuotas} de $${cuotaMensual}`);

        continuar = prompt(`Desea continuar con otra tasacion [Si/No]`);
    }

}
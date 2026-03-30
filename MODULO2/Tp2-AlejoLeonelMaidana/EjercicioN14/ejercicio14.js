/*
Ejercicio Nro. 14: 
 
Una  empresa  de  Peajes  del  SUR  S.A.  desea  realizar  una  aplicación  que  permita  cobrar  y  otorgar  los 
comprobantes a los clientes que circulan por las autopistas concesionadas por la empresa, para ello se necesita 
realizar un programa que el cajero del puesto pueda realizar el cobro y levantado de la barrera. 
 
Los precios establecidos son los siguientes 
 
+ CAMION = 22.000,00 PESOS 
+ CAMIONETA = 12.000,00 PESOS 
+ AUTOMOVIL = 4.000,00 PESOS 
+ MOTOS = 1.500,00 PESOS 
 
La aplicación debe permitirle al cajero registrar todas las operaciones y al finalizar su jornada laboral realizar el 
cierre donde le deberá mostrar la siguiente información. 
 
+ Cantidad de AUTOS  
+ Total Cobrado de AUTOS 
 
+ Cantidad de CAMIONETAS 
+ Total de CAMIONETAS 
 
+ Cantidad de AUTOMOVILES 
+ Total de Automóviles 
 
+ Cantidad de MOTOS 
+ Total de MOTOS 
 
+ Total GENERAL cobrado. 
 
Compare al final si pasaron más camionetas que autos o fue al revés ¿?. O quizás hayan pasado la misma 
cantidad. Compare estas cantidades únicamente entre autos y camionetas. 
 
Consideraciones: para realizar el ejercicio debe utilizar solamente código JavaScript, sin interacción con el 
DOM y cargar los datos de entrada por medio de prompt. 

*/

{
    let peajeCamion = 22000;
    let peajeCamioneta = 12000;
    let peajeAutomovil = 4000;
    let peajeMotos = 1500;

    let cantidadCamion = 0;
    let cobradoCamion = 0; 

    let cantidadCamioneta = 0;
    let cobradoCamioneta = 0;
    
    let cantidadAutomovil = 0;
    let cobradoAutomovil = 0;
    
    let cantidadMotos = 0;
    let cobradoMotos = 0;
    let totalCobrado = 0;

    let atender = `Si`
    let vehiculo = 0;

    while(atender === `Si`|| atender ===`si`){
        vehiculo = Number(prompt(`Que vehiculo esta pasando por el peaje: 1-Camion, 2-Camioneta, 3-Automovil, 4-Moto`));

        switch(vehiculo){
            case 1:{
                cantidadCamion ++;
                cobradoCamion += peajeCamion;

                break;
            }

            case 2:{
                cantidadCamioneta ++;
                cobradoCamioneta += peajeCamioneta;

                break;
            }

            case 3:{
                cantidadAutomovil ++;
                cobradoAutomovil += peajeAutomovil;

                break;
            }

            case 4:{
                cantidadMotos ++;
                cobradoMotos += peajeMotos;

                break;
            }

            default:{
                console.log(`opcion invalida`);
            }
        }

        atender = prompt(`desea atender el vehiculo? [Si/No]`);
    }
    
    totalCobrado = cobradoAutomovil + cobradoCamion + cobradoMotos + cobradoCamioneta

    console.log(`Pasaron ${cantidadAutomovil} autos`);
    console.log(`Se recaddudo: $${cobradoAutomovil} de los autos`);
    
    console.log(`Pasaron ${cantidadCamioneta} camionetas`);
    console.log(`Se recaddudo: $${cobradoCamioneta} de las camionetas`);
    
    console.log(`Pasaron ${cantidadCamion} camiones`);
    console.log(`Se recaddudo: $${cobradoCamion} de los camiones`);
    
    console.log(`Pasaron ${cantidadMotos} motos`);
    console.log(`Se recaddudo: $${cobradoMotos} de las motos`);

    if(cantidadCamioneta>cantidadAutomovil){
        console.log(`Pasaron mas camionetas que autos con un total de ${cantidadAutomovil} y ${cantidadCamioneta}`);
    }
    else if(cantidadAutomovil>cantidadCamioneta){
        console.log(`pasaron mas autos que camionetas con un total de ${cantidadAutomovil} y ${cantidadCamioneta}`);
    }
    else{
        console.log(`Pasaron la misma cantidad de autos y vehiculos`);
    }
}
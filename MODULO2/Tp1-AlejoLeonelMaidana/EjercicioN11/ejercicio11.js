
/*
Ejercicio Nro. 11: Estructuras Condicionales (if/else)
Un local de venta de comida rápida, lanza su aplicación online que le permite al cliente pagar por la misma y además aclara que se incluye en el precio total el costo del envío dependiendo la zona en la que vive el cliente. 

    1) Zona Centro = $ 2500,00 
    2) Zona Oeste = $ 3750,00 
    3) Zona Norte = $ 4225,00 
    4) Zona Sur = $ 5222,50 
    5) Zona Este = $ 4288,50 
 
        Debe ingresar el importe de la compra, sumarle el costo del envío en función de la zona del cliente.  
 
    Recomendación: Es mejor guardar los costos de envío en variables, de tal forma que si en un futuro cambian, no haya que tocar la lógica del programa, ni ver todo el recorrido, sino simplemente cambiar los precios. 
*/

{
    let envioZonaCentro = 2500;
    let envioZonaOeste = 3750;
    let envioZonaNorte = 4225;
    let envioZonaSur = 5222.50;
    let envioZonaEste = 4288.50;

    let importeCompra = 0;
    let zonaCliente = 0;
    let costoEnvio = 0;
    let costoTotal = 0;

    importeCompra = Number(prompt(`Ingrese el importe de la compra: `));
    zonaCliente = Number(prompt(`Ingrese la zona donde vive el cliente: 1-Zona Centro, 2-Zona Oeste, 3-Zona Norte, 4-Zona Sur, 5-Zona Este`));

    switch(zonaCliente){
        case 1:{
            costoEnvio = envioZonaCentro;
            
            break;
        }

        case 2:{
            costoEnvio = envioZonaOeste;

            break;
        }

        case 3:{
            costoEnvio = envioZonaNorte;

            break;
        }

        case 4:{
            costoEnvio = envioZonaSur;

            break;
        }

        case 5:{
            costoEnvio = envioZonaEste;

            break;
        }

        default:{
            console.log("Zona inválida");
        }
    }

    costoTotal = importeCompra + costoEnvio;

    console.log(`El costo de la comida es: ${importeCompra}, el costo del envio es: ${costoEnvio}, y el costo total final es: ${costoTotal}`)
}
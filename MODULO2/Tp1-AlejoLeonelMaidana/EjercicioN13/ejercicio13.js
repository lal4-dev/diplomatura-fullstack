/*
Ejercicio Nro. 13: Estructuras Condicionales (if/else)
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
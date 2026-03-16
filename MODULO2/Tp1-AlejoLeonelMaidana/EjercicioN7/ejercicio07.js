/*
Ejercicio Nro. 07: Estructuras Condicionales (if/else) 
    Un comercio que vende bolsas de alimentos para mascotas trabaja y comercializa únicamente con tres grandes marcas de alimentos para perros lo que le permite trabajar con descuentos muy interesantes para sus clientes. Las marcas con las que trabaja son: 

    Catálogo de Productos 
    | Codigo |   Descripción   | x unidad | (cantidad >= 5) y (cantidad <= 10) | Cantidad >= 11 | 
        1       Dogui x21kg     $38.000,0              $ 36.000,00                $ 34.000,00 
        2     Tiernitos x21kg   $31.000,00             $ 29.000,00                $ 27.000,00 
        3     Dogpro x 21kg     $46.000,00             $ 44.000,00                $ 42.000,00 
 
    Realice un programa en JavaScript que permita ingresar el código del producto y la cantidad de bolsas a comprar y que solo determine el importe total a pagar. 

*/

{
    let descuentoDogui = 0;
    let descuentoTiernitos = 0;
    let descuentoDogpro = 0;

    let doguiUnidad = 38000;
    let tiernitosUnidad = 31000;
    let dogUnidad = 46000;

    let alimentoElegido = 0;
    let cantidadAlimento = 0;
    let totalPagar = 0;

    alimentoElegido = Number(prompt(`El alimento elegido es: `));
    cantidadAlimento = Number(prompt(`Que cantidad de alimento va comprar(cada bolsa pesa 21:kg): `));

    switch(alimentoElegido){
        case 1:{
            if(cantidadAlimento < 5 && cantidadAlimento > 0){
                totalPagar = doguiUnidad * cantidadAlimento
            }
            else if(cantidadAlimento >= 5 && cantidadAlimento<=10){
                descuentoDogui = 36000;
                totalPagar = descuentoDogui * cantidadAlimento;
            }
            else if(cantidadAlimento>10){
                descuentoDogui = 34000;
                totalPagar = descuentoDogui * cantidadAlimento;
            }
            else{
                console.log(`La cantidad igresada no es valida`);
            }

            break;
        }

        case 2:{
            if(cantidadAlimento < 5 && cantidadAlimento > 0){
                totalPagar = tiernitosUnidad * cantidadAlimento
            }
            else if(cantidadAlimento >= 5 && cantidadAlimento<=10){
                descuentoTiernitos = 29000;
                totalPagar = descuentoTiernitos * cantidadAlimento;
            }
            else if(cantidadAlimento>10){
                descuentoTiernitos = 27000;
                totalPagar = descuentoTiernitos * cantidadAlimento;
            }
            else{
                console.log(`La cantidad igresada no es valida`);
            }

            break;
        }

        case 3:{
            if(cantidadAlimento < 5 && cantidadAlimento > 0){
                totalPagar = dogUnidad * cantidadAlimento
            }
            else if(cantidadAlimento >= 5 && cantidadAlimento<=10){
                descuentoDogpro = 44000;
                totalPagar = descuentoDogpro * cantidadAlimento;
            }
            else if(cantidadAlimento>10){
                descuentoDogpro = 42000;
                totalPagar = descuentoDogpro * cantidadAlimento;
            }
            else{
                console.log(`La cantidad igresada no es valida`);
            }

            break;
        }

        default:{
            console.log(`El codigo ingresado no es valido`);

            break;
        }

    }

    console.log(`La cantidad de bolsas que va comprar es: ${cantidadAlimento}`);
    console.log(`Con un precio final de: $${totalPagar}`);
}
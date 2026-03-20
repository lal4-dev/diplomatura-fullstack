/* Capture un importe base de una factura y le calcule su IVA y lo muestre por consola

1)21% general
2)10,5% tecnologia
3)27,5% servicios publicos
4)5% agricolas
5)0% excentos
*/

//funcion
function calcularImporteFinal(importeB, tipoP){
    let salida = 0;
    let iva = 0; 
    
    switch(tipoP){
        case 1:{
            iva = (importeB*21)/100;

            break;
        }

        case 2:{
            iva = (importeB*10.5)/100;

            break;
        }

        case 3:{
            iva = (importeB*27.5)/100;
            break;
        }

        case 4:{
            iva = (importeB*5)/100;

            break;
        }

        default:{
            iva = 0;

            break;
        }
    }
    salida = importeB + iva;

    return salida;
}


//programa principal
{
    let importeBase = Number(prompt(`Ingrese el importe base: `));
    let tipoProdcuto = Number(prompt(`Ingrese e tipo de producto para su iva correcto 1(general) - 2(tecnologia) - 3(municipalidad) - 4(agrario) - 5(excento)`))

    let importeTotal = calcularImporteFinal(importeBase,tipoProdcuto);

    console.log(importeTotal);
}
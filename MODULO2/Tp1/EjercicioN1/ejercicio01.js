/*
Ejercicio Nro. 01: 
    Realizar un programa que permita el Ingreso de 2 (dos números) (A y B) utilizando variables y realice las siguientes operaciones. 
    
    - Muestre la suma de ambos (A + B) 
    - Muestre la resta (A – B) 
    - Muestre el Producto de ambos (A * B) 
    - Muestre el Cociente entre ambos (A / B) 
    
    Nota: En este último caso, verificar que sucede cuando B es igual a cero. Que sucede con el programa 
*/
{
    let numeroA = 0;
    let numeroB = 0;
    let sumaAB = 0;
    let restaAB = 0;
    let productoAB = 0;
    let cocienteAB = 0;

    numeroA = Number(prompt(`Ingrese el primer numero A: `));
    numeroB = Number(prompt(`Ingrese el segundo numero B: `));

    sumaAB = (numeroA + numeroB);
    restaAB = (numeroA-numeroB);
    productoAB = (numeroA * numeroB);


    console.log(`La suma de los numeros: ${numeroA},${numeroB} = ${sumaAB}`);
    console.log(`La resta de los numeros: ${numeroA},${numeroB} = ${restaAB}`);
    console.log(`El producto de los numeros: ${numeroA},${numeroB} = ${productoAB}`);
    if(numeroB === 0){
        console.log(`No se puede dividir por cero`);
    }
    else{
        cocienteAB = (numeroA/numeroB);
        console.log(`El cociente de los numeros: ${numeroA},${numeroB} = ${cocienteAB}`);
    }
}
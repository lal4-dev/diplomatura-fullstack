/*
Ejercicio Nro. 04: Estructuras Condicionales (if/else) 
    Ingrese un número y determine si es positivo o negativo usando una estructura condicional if/else y también resuelva el mismo problema utilizando un operador ternario.

*/

{
    let numero = 0;
    numero = Number(prompt(`Ingrese un numero: `));

    //con condicion if
    console.log(`Con condicional if`);
    if(numero>0){
        console.log(`El numero: ${numero} es positivo`);
    }
    else if(numero<0){
        console.log(`El numero: ${numero} es negativo`);
    }
    else{
        console.log(`el numero es 0`)
    }

    console.log(`Con operador ternario`)
    let resultado = (numero>0) ? "El numero es positivo" : `El numero ${numero} es negativo`;
    console.log(resultado);
}
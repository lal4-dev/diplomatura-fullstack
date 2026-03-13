/*
Ejercicio Nro. 08: Estructuras Condicionales (if/else) 
    Realizar un programa que permita ingresar la edad de una persona y determine si es niño (0 a 12 años), adolescente (13 a 17 años), adulto (18 a 64 años), adulto mayor (más de 64 años).
*/

{
    let edad = 0;

    edad = Number(prompt(`Ingrese la edad: `));

    if(edad >= 0 && edad <= 12){
        console.log(`Es un niño`);
    }
    else if(edad >= 13 && edad <= 17){
        console.log(`Es un adolescente`);
    }
    else if(edad >= 18 && edad <= 64){
        console.log(`Es un adulto`);
    }
    else if(edad > 64){
        console.log(`Es un adulto mayor`);
    }
    else{
        console.log(`Edad no válida`);
    }
}
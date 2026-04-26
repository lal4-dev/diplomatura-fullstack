/*
Ejercicio 27
Realizar una arrow function que reciba como parámetro una cadena de texto y que devuelva la cantidad 
de vocales “mayúsculas y/o minúsculas” que tiene la misma.  
 Debe recorrer la cadena con un ciclo for, desde el primer carácter hasta el último, analizar cada uno de 
los caracteres y determinar si es una vocal o no. No debe utilizar métodos de strings como replace(), split() o 
expresiones regulares. 
Nota: Debe devolver un número
*/

const funcionCantidadVocales = (cadenaDeTexto)=>{
    let cantidadVocales=0;

        for(let i=0;i<Number(cadenaDeTexto.length); i++){
            let caracter = cadenaDeTexto.charAt(i).toUpperCase();
            if(caracter==="A" || caracter==="E" || caracter==="I" || caracter==="O" || caracter==="U" ){
                cantidadVocales++;
            }
        }
    return Number(cantidadVocales);
}

window.onload = ()=>{
    let cadenaDeTexto = "El domingo se gano en el gallinero";
    
    let cantidadVocales = funcionCantidadVocales(cadenaDeTexto); 
    console.log(cantidadVocales);
}
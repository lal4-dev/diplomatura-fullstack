/* Ejercicio 20
    Realziar una arrow function que reciba como parametro las 3 notas que obtuvo a un alumno en los distintos trabajos practicos de una materia y que apartir de estas notas obtenga el promedio de las mismas
*/

const funcionPromedioNotas = (nota1,nota2,nota3)=>{
    return ((nota1 + nota2 + nota3)/3);
};

window.onload = ()=>{
    let resultado = funcionPromedioNotas();
    console.log(resultado);
};
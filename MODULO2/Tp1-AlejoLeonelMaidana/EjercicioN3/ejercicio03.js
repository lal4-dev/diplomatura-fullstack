/*
Ejercicio Nro. 03: 
    Realizar un programa que permita ingresar los totales que una persona pagó por sus servicios en su hogar. 
    El  primer  valor  representará  los  gastos  de  energía  (luz  eléctrica),  el  segundo valor  representará  los  gastos  en comunicación (conectividad a internet), el tercer valor representará los gastos ocasionados por el servicio de agua potable. Se estima que  para  el siguiente mes estos tres valores incrementarán en  un 12,5%, 7% y 3% respectivamente. El programa debe calcular el gasto futuro a pagar. 
*/

{
    let luzPersona = 0;
    let internetPersona = 0;
    let aguaPersona = 0;

    let aumentoLuz = 0;
    let aumentoInternet = 0;
    let aumentoAgua=0;

    let totalLuz = 0;
    let totalInternet = 0;
    let totalAgua = 0;

    luzPersona = Number(prompt(`Ingrese el costo de la luz: `));
    internetPersona = Number(prompt(`Ingrese el costo del internet: `));
    aguaPersona = Number(prompt(`Ingrese el costo de el agua: `));

    aumentoLuz = (luzPersona * 12.5)/100;
    aumentoInternet = (internetPersona * 7)/100;
    aumentoAgua = (aguaPersona * 3)/100;

    totalLuz = luzPersona + aumentoLuz;
    totalInternet = internetPersona + aumentoInternet;
    totalAgua = aguaPersona + aumentoAgua;

    console.log(`La boleta actual de luz es de: $${luzPersona}, se estima un aumento de: $${aumentoLuz}, quedando asi: $${totalLuz}`);
    console.log(`La boleta actual de internet es de: $${internetPersona}, se estima un aumento de: $${aumentoInternet}, quedando asi: $${totalInternet}`);
    console.log(`La boleta actual de agua es de: $${aguaPersona}, se estima un aumento de: $${aumentoAgua}, quedando asi: $${totalAgua}`);

}
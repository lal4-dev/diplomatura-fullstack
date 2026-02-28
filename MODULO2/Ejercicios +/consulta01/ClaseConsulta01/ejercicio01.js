/* 
EJERCICIO NRO. 01:
El Gobierno Nacional tiene previsto este esquema de aumentos para el Personal
 Doméstico
Sabiendo que el salario mínimo de enero de 2026 se establece en 450.000,00 pesos. Se desea realizar un programa que permita calcular los próximos sueldos mínimos establecidos a lo largo del año siguiendo estas reglas.
Sueldo Enero = 450.000,00 => Debe crear una variable y guardar este valor
Sueldo Febrero = Sueldo Enero + 2,7% del Sueldo De Enero
Sueldo Marzo = Sueldo Febrero + 3,5% del Sueldo de Febrero
Sueldo Abril = Sueldo Marzo + 2,85% del Sueldo de Febrero
Sueldo Mayo = Sueldo Abril + 3,2% del Sueldo de Abril + Bono Extraordinario de 25.000,00 pesos.
Realice un programa que permita determinar a partir del sueldo de enero, una proyección de los futuros sueldos mínimos según las reglas establecidas.
Las salidas las debe Mostrar por Consola.
*/

/* 
    construcción paso a paso 

    hago
    pruebo
    hago
    pruebo
    hago 
    pruebo


    PROGRAMAR NO ES ESCRIBIR UNA CARTA

*/

{
    let sueldoDeEnero = 470000; // camelCase
    let bono = 35000;

    let sueldoDeFebrero = sueldoDeEnero + (sueldoDeEnero * 2.7)/100;

    let sueldoDeMarzo = sueldoDeFebrero + (sueldoDeFebrero * 3.5)/100;

    let sueldoDeAbril = sueldoDeMarzo + (sueldoDeFebrero * 2.85)/100;

    let sueldoDeMayo = sueldoDeAbril + (sueldoDeAbril * 3.2)/100 + bono;

    console.log(`Sueldo de Enero `,sueldoDeEnero);
    console.log(`Sueldo de Febrero `,sueldoDeFebrero);
    console.log(`Sueldo de Marzo `,sueldoDeMarzo);
    console.log(`Sueldo de Abril `,sueldoDeAbril);
    console.log(`Sueldo de Mayo `,sueldoDeMayo);



}
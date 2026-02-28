/*EJERCICIO NRO. 01:
El Gobierno Nacional tiene previsto este esquema de aumentos para el Personal Doméstico
Sabiendo que el salario mínimo de enero de 2026 se establece en 450.000,00 pesos. Se desea realizar un programa
que permita calcular los próximos sueldos mínimos establecidos a lo largo del año siguiendo estas reglas.
Sueldo Enero = 450.000,00 => Debe crear una variable y guardar este valor
Sueldo Febrero = Sueldo Enero + 2,7% del Sueldo De Enero
Sueldo Marzo = Sueldo Febrero + 3,5% del Sueldo de Febrero
Sueldo Abril = Sueldo Marzo + 2,85% del Sueldo de Febrero
Sueldo Mayo = Sueldo Abril + 3,2% del Sueldo de Abril + Bono Extraordinario de 25.000,00 pesos.
Realice un programa que permita determinar a partir del sueldo de enero, una proyección de los futuros sueldos
mínimos según las reglas establecidas.
Las salidas las debe Mostrar por Consola.*/

{
    let bonoExtra = 25000;
    let sueldoEnero = 450000;
    console.log("el sueldo en enero es: ",sueldoEnero);

    let aumentoFebrero = (sueldoEnero*2.7) /100;
    let sueldoFebrero = (sueldoEnero+aumentoFebrero);
    console.log("el sueldo en febrero es: ",sueldoFebrero);

    let aumentoMarzo = (sueldoFebrero*3.5)/100;
    let sueldoMarzo = (sueldoFebrero+aumentoMarzo);
    console.log("el sueldo de marzo es: ",sueldoMarzo);

    let aumentoAbril = (sueldoFebrero*2.85)/100;
    let sueldoAbril = (sueldoMarzo+aumentoAbril);
    console.log ("el sueldo de abril es: ",sueldoAbril);

    let aumentoMayo = (sueldoAbril*3.2)/100;
    let sueldoMayo = (sueldoAbril + aumentoMayo + bonoExtra);
    console.log ("el sueldo de mayo es: ",sueldoMayo);


}
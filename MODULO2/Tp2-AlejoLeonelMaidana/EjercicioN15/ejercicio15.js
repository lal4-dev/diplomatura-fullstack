/*
Ejercicio Nro. 15: 
 
Realizar un programa en JavaScript que permita ingresar las notas de los trabajos finales de los alumnos de 
la diplomatura en “Desarrollo Web Full Stack con JavaScript” para ello se establecen las siguientes condiciones. 
- No está establecido la cantidad de trabajos finales que se evaluarán 
- Este será el cuadro con el que se analizará y asignará la clasificación de los mismos. 
 
o Si la nota >= 0 y <= 4 serán trabajos desaprobados 
o Si la nota > 4 y <= 7 serán trabajos aprobados 
o Si la nota > 7 y <10 serán trabajos muy buenos 
o Si la nota = 10 serán trabajos excelentes 
 
- Contemplar que el operador podría ingresar notas incorrectas, es decir podría poner una nota menor 
a cero o mayor a 10 con lo que sería claramente un error. Contemplar la cantidad de veces que se 
equivoca. 
 
- Siempre preguntar si desea continuar cargando notas. 

*/

{
    let cantidadTrabajosDesaprobados = 0;
    let cantidadTrabajosAprobados = 0 ;
    let cantidadTrabajosMuyBuenos = 0;
    let cantidadTrabajosExcelentes = 0;
    let totalTrabajos = 0;

    let continuar = `Si`;

    let nota = 0;

    while(continuar === `Si`|| continuar ===`si`){
        nota = Number(prompt(`Ingrese la nota del alumno: `));

        if(nota>=0 && nota<=4){
            totalTrabajos++;
            cantidadTrabajosDesaprobados++;
        }
        else if(nota>4 && nota <=7){
            totalTrabajos++;
            cantidadTrabajosAprobados++;
        }
        else if(nota>7 && nota <10){
            totalTrabajos++;
            cantidadTrabajosMuyBuenos++;
        }
        else if(nota === 10){
            totalTrabajos++;
            cantidadTrabajosExcelentes++;
        }
        else{
            console.log(`La nota ${nota}, no es un valor dentro de los rangos calificables`);
        }
        continuar = prompt(`Desea continuar cargando notas [Si/No]`);
    }
    
    let totalAprobado = cantidadTrabajosAprobados+cantidadTrabajosMuyBuenos+ cantidadTrabajosExcelentes;

    let porcentaje = totalTrabajos > 0 ?(totalAprobado/totalTrabajos)*100 : 0;

    console.log(`La cantidad de trabajos Excelentes son: ${cantidadTrabajosExcelentes}`);
    console.log(`La cantidad de trabajos Muy Buenos son: ${cantidadTrabajosMuyBuenos}`);
    console.log(`La cantidad de trabajos Aprobados son: ${cantidadTrabajosAprobados}`);
    console.log(`La cantidad de trabajos Desaprobados son: ${cantidadTrabajosDesaprobados}`);

    console.log(`La cantidad de alumnos evaluados son: ${totalTrabajos}, es decir una tasa del ${porcentaje}% de desaprobados`);

}
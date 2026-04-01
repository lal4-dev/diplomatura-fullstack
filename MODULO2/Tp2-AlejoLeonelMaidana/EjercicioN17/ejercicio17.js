/*
Ejercicio Nro. 17: 
 
Una Frigorífico posee una cinta transportadora y clasificadora de huevos para consumo humano. La cinta 
no tan solo los transporta sino también los clasifica según su peso. es decir, al final de la cinta existe una balanza 
electrónica de alta precisión que evalúa su peso y los clasifica. 
 
a) XL, súper grandes: peso ≥ 73 gramos.  
b) L, grandes: peso ≥ 63 gramos y < 73 gramos.  
c) M, medianos: peso ≥ 53 gramos y < 63 gramos. 
 
Nota: considere como descartados aquellos que no estén dentro del rango de valores aceptables. 
 
Determinar lo siguiente: 
 
1) Cantidad total de Huevos (Todas las categorías) 
2) Cantidad total de Huevos XL 
3) Cantidad total de Huevos L 
4) Cantidad total de Huevos M 
5) Cantidad total de Huevos descartados 
6) Determinar el % de Huevos XL sobre el Total 
7) Determinar el % de Huevos L sobre el Total 
8) Determinar el % de Huevos M sobre el Total 
 
Consideraciones: para realizar el ejercicio debe utilizar solamente código JavaScript, sin interacción con el 
DOM y cargar los datos de entrada por medio de promp
*/

{
    let continuar = `S`;
    let pesoHuevo = 0;
    let totalHuevos = 0;

    let huevosXL = 0;
    let huevosL = 0;
    let huevosM = 0; 
    let descartados = 0;


    while(continuar === `S` || continuar === `s`){
        pesoHuevo = Number(prompt(`Ingrese el peso del producto: `));
        totalHuevos ++


        if(pesoHuevo >= 73){
            huevosXL++;
        }
        else if(pesoHuevo>=63  && pesoHuevo <73){
            huevosL++;
        }
        else if(pesoHuevo>=53 && pesoHuevo <63){
            huevosM++;
        }
        else{
            descartados++;
        }

        continuar = prompt(`Quiere continuar?. (S/N)`);

    }

    let huevosPorcentajeXL = (huevosXL*100)/totalHuevos;
    let huevosPorcentajeL = (huevosL*100)/totalHuevos;
    let huevosPorcentajeM = (huevosM*100)/totalHuevos;
    let huevosPorcentajeDescarte = (descartados*100)/totalHuevos;

    console.log(`La totalidad de huevos es: ${totalHuevos}`);
    console.log(`La totalidad de huevos XL es: ${huevosXL}`);
    console.log(`La totalidad de huevos L es: ${huevosL}`);
    console.log(`La totalidad de huevos M es: ${huevosM}`);
    console.log(`La totalidad de huevos Descartados es: ${descartados}`);
    
    console.log(`El porcentaje de huevos XL es: ${huevosPorcentajeXL}`);
    console.log(`El porcentaje de huevos L es: ${huevosPorcentajeL}`);
    console.log(`El porcentaje de huevos M es: ${huevosPorcentajeM}`);
    console.log(`El porcentaje de huevos Descartados es: ${huevosPorcentajeDescarte}`);

}

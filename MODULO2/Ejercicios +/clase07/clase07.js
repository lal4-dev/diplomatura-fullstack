/*
Ejercicio Nro. 14:
Una Frigorífico posee una cinta transportadora y clasificadora de huevos para consumo humano. La cinta no tan solo los transporta sino también los clasifica según su peso. es decir, al final de la cinta existe una balanza electrónica de alta precisión que evalúa su peso y los clasifica.
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
Consideraciones: para realizar el ejercicio debe utilizar solamente código JavaScript, sin interacción con el DOM y cargar los datos de entrada por medio de prompt.

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


/* 

Ejercicio Nro. 18:
    Un supermercado desea realizar una aplicación WEB que le permita a sus cajeros realizar los cobros a los clientes que atenderán en su jornada laboral. La aplicación debe tener las siguientes consideraciones.
    -	Un cajero podrá atender a “n” clientes, siendo n el número que no está definido, puede atender a 0, 2, 5 clientes. 
    Nota: debería resolverse aplicando un ciclo while de clientes

    -	Cada cliente atendido llevará “m” productos, siendo m el número que no está definido. Puede llevar 10, 15, 20, 50 productos. 
    Nota: debería resolverse aplicando un ciclo while de productos.

    -	Al finalizar la atención del cliente, debería preguntar si paga con:
        o	1 – Efectivo – aplicar descuento 10%
        o	2 – Tarjeta Visa BNA – aplicar descuento 7%
        o	3 – Tarjeta Master BNA – aplicar descuento 7%
        o	4 – Otras Tarjetas Medios – sin descuentos.
    
    -	Al finalizar la atención del cliente deberá ir registrando los siguientes puntos
        o	Venta Total = Acumular la venta de todos los clientes
        o	Descuento Total = Acumular los descuentos realizados a cada cliente
        o	Importe a Pagar Total = Acumular los Importes a pagar por cada cliente
        o	Contar la cantidad de clientes que Tuvieron descuentos
        o	Contar la cantidad de clientes que No Tuvieron descuentos.

    Nota: Este proceso debe confeccionarse con dos ciclos while, un ciclo while atenderá a los clientes y el otro ciclo while (interno) registrará los productos que lleva cada cliente.
*/
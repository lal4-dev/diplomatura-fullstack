/*
Evaluación de riesgo crediticio

Enunciado:
Realizar una función que reciba como parámetros 
el ingreso mensual de una persona, el monto de sus 
deudas actuales y su antigüedad laboral en años, 
y devuelva su nivel de riesgo crediticio:

“Bajo”
“Medio”
“Alto”

Reglas:

Si la deuda es menor al 30% del ingreso y la antigüedad laboral es mayor o igual a 3 años → “Bajo”
Si la deuda está entre el 30% y el 50% del ingreso → “Medio”
Si la deuda supera el 50% del ingreso o la antigüedad laboral es menor a 1 año → “Alto”
*/

function evaluacionRiesgo(ingreso,deuda,antiguedad){
    let porcentajedeuda = (deuda/ingreso)*100;
    let riesgo = ``;
    if(porcentajedeuda>50 || antiguedad<1){
        riesgo = `Alto`;
    }
    else if(porcentajedeuda<30 && antiguedad>=3){
        riesgo = `Bajo`;
    }
    else if(porcentajedeuda>= 30 && porcentajedeuda<= 50){
        riesgo = `Medio`;
    }
    else{
        console.log(`Ingreso erroneo de valores`);
    }

    return riesgo
}

{
    let ingresoPersona = Number(prompt(`Ingrese el salario de la persona: `));
    let deudaPersona = Number(prompt(`Ingrese la deuda de la persona: `));
    let antiguedadPersona = Number(prompt(`Ingrese la antiguedad de la persona: `));
    
    let riesgoPersona = evaluacionRiesgo(ingresoPersona,deudaPersona,antiguedadPersona);
    
    console.log(`La persona con ingresos: ${ingresoPersona}, antiguedad: ${antiguedadPersona} y con una deuda de: ${deudaPersona} -> nos da un riesgo: ${riesgoPersona}`)
}
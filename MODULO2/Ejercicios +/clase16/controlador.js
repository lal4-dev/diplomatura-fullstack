import {productos} from "./modelo.js";


//Simplicacion de las funciones
const funcionIvaFactura = (importeBase)=>{
  return (importeBase*21)/100;
}

const funcionIvaFactura2 = importeBase => {
  return (importeBase*21)/100;
}

const funcionIvaFactura3 = importeBase => importeBase*21/100;

const funcionCuadrado = numero => numero*numero;

const funcionCubica = numero => numero*numero*numero;

const funcionLlamadora = (fn,x)=>{
  let resultado = fn(x);

  return resultado;
}

window.onload = ()=>{

  const idBtnParticularidades = document.querySelector("#idBtnParticularidades");
  const idBtnFuncCallBack = document.querySelector("#idBtnFuncCallBack");
  const idBtnForEach = document.querySelector("#idBtnForEach");
  const idBtnMap = document.querySelector("#idBtnMap");
  const idBtnSome = document.querySelector("#idBtnSome");
  const idBtnEvery = document.querySelector("#idBtnEvery");



  /********************** PARTICULARIDADES DE LAS ARROW FUNCTION  ******************************/

  idBtnParticularidades.onclick = ()=>{

    console.log("--- particularidades de las arrow function ---");
    let resutaldo1 = funcionIvaFactura(1000);
    console.log(resutaldo1);

    let resutaldo2 = funcionIvaFactura2(1000);
    console.log(resutaldo2);

    let resutaldo3 = funcionIvaFactura3(1000);
    console.log(resutaldo3);
  };


  /********************** FUNCIONES CALLBACK  ******************************/

  idBtnFuncCallBack.onclick = ()=>{

    console.log("--- funciones callBack ---");
  
    let resultado = funcionLlamadora(funcionCuadrado,2);
    console.log(resultado);

    let resultado1 = funcionLlamadora(funcionCubica,2);
    console.log(resultado1);

    let resultado2 = funcionLlamadora((numero)=>{
        return (numero*2) + (numero*3);
    },2);
    console.log(resultado2);

    let resultado3 = funcionLlamadora(numero => numero/2,2);
    console.log(resultado3);

  };

  /********************** FOREACH EN VECTORES  *****************************/

  idBtnForEach.onclick = ()=>{

    const sueldosAlumnos = [2700,3500,25000,1500,32000];
    const datosGenerales = [{dni:2222222, apellido:"PEREZ JUAN"},1000,()=>{}]

    console.log("--- for each ---");

    console.log(sueldosAlumnos[0]);

    for(let i=0; i<sueldosAlumnos.length;i++){
      console.log(sueldosAlumnos[i]);

      sueldosAlumnos[i] = sueldosAlumnos[i]*1.50;
    }


    sueldosAlumnos.forEach((elemento,indice)=>{
        console.log(`posicion ${indice} - valor:${elemento}`)
    })

    sueldosAlumnos.forEach(elemento => console.log(elemento));



  };

  /********************** MAP EN VECTORES  *****************************/

  idBtnMap.onclick = ()=>{
  
    console.log("--- map ---");

  };
  
  /********************** FIND EN VECTORES  *****************************/

  idBtnFind.onclick = ()=>{

    console.log("--- metodo find ----");

  };

  /********************** FILTER EN VECTORES  *****************************/

  idBtnFilter.onclick = ()=>{

    console.log("--- metodo filter ---");
 
  };

  /********************** SOME EN VECTORES  *****************************/

  idBtnSome.onclick = ()=>{

    console.log("--- metodo some ---");

  };

  /********************** EVERY EN VECTORES  *****************************/

  idBtnEvery.onclick = ()=>{

    console.log("--- metodo every ---");

  };




};
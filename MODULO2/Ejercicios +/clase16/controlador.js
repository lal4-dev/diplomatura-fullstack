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

const sueldosEnero = [3700,4100,25000]

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

    productos.forEach((item, indice)=>{
      console.log(`Id:${item.id}-Nombre:${item.nombre}`)
    })

    productos.forEach(producto=> console.log(`ID:${producto.id} - NOMBRE`));
  };

  
  /********************** MAP EN VECTORES  *****************************/

  idBtnMap.onclick = ()=>{
  
    console.log("--- map ---");

    let sueldosFebrero = sueldosEnero.map((sueldo)=>{
      return (sueldo * 1.20);
    });

    console.log(sueldosEnero);
    console.log(sueldosFebrero)


    let productos2 = productos.map(productos =>{
      console.log(productos);
      const {id,nombre,precio} = productos;

      console.log(id,nombre,precio)

      return {id,nombre,precio};
    });

    console.log(productos2);
  };
  
  /********************** FIND EN VECTORES  *****************************/

  idBtnFind.onclick = ()=>{

    console.log("--- metodo find ----");
    let producto1 = productos.find((producto)=>{
      if(producto.id===5){
        return true;
      }

    });

    let producto2 = producto.find(producto => producto.id ===7);

    let producto3 = producto.find(producto => producto.precio > 10000);

  };

  /********************** FILTER EN VECTORES  *****************************/

  idBtnFilter.onclick = ()=>{

    console.log("--- metodo filter ---");

    let vectorDeProducto = producto.filter((productos)=>{
      if(productos.precio > 11000){
        return true;
      }
      else{
        return false;
      }
    });
    console.log(vectorDeProducto);

    let vectorDeProductos2 = productos.filter(producto => producto.precio>11000);
    console.log(vectorDeProductos2);
  };

  /********************** SOME EN VECTORES  *****************************/

  idBtnSome.onclick = ()=>{

    console.log("--- metodo some ---");
    let resultadoSome = productos.some(producto => producto.precio < 9500);
    console.log(resultadoSome)

  };

  /********************** EVERY EN VECTORES  *****************************/

  idBtnEvery.onclick = ()=>{

    console.log("--- metodo every ---");
    let resultadoEvery = productos.every(producto => producto.precio>500);
    console.log(resultadoEvery);

  };




};
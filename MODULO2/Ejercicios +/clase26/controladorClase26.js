/*--------------------------[Funciones,vectores del ejemplo 1]-----------------------------*/
const funcionCuadrado = numero => numero * numero;

const funcionCubo = numero => numero*numero*numero;

const vectorElastico=[200,{dni:22,nombre:"dos"},funcionCuadrado,funcionCubo,(importeBase)=>{return importeBase*21/100}]
/*-------------------------------------------------------*/

/*--------------------------[funcion del ejemplo 2]-----------------------------*/
const funcionDelegada = (e)=>{
    alert(`me estan tocando ${e.target.textContent}`);

    if(e.target.textContent===`Boton 1`){

    }
}


window.onload = ()=>{

    /* Ejemplo 1 */
    console.log(vectorElastico);
    vectorElastico.forEach(elemento => {
        console.log(elemento);
        console.log(typeof(elemento));

        if(typeof(elemento)==='function'){
            console.log(elemento);
            let resultado = elemento(10);
            console.log(resultado);
        }
    });

    console.clear() 

    /*Ejemplo 2 - Importante para react*/ 
    const idCaja1 = document.querySelector("#idCaja1");
    const idCaja2 = document.querySelector("#idCaja2");

    const cajasTexto = document.querySelectorAll("input");


    cajasTexto.forEach(cajas=>{
        cajas.onchange = (e)=>{
            console.log(e.target.value);
        }
    })


    idCaja1.onchange = (e)=>{
        console.log(e);
        console.log(e.target);
        console.log(e.target.value);

    }

    idCaja2.onchange = (e)=>{}



    /*Ejemplo 3 - Manejo centraliazdo de eventos*/ 
    const botones = document.querySelectorAll("button");

    
    botones.forEach(boton=>{
        boton.onclick = funcionDelegada;
    })


}
/*--------------------------[Funciones,vectores del ejemplo 1]-----------------------------*/
const funcionCuadrado = numero => numero * numero;

const funcionCubo = numero => numero*numero*numero;

const vectorElastico=[200,{dni:22,nombre:"dos"},funcionCuadrado,funcionCubo,(importeBase)=>{return importeBase*21/100}]



/*--------------------------[funcion del ejemplo 2]-----------------------------*/
const funcionDelegada = (e)=>{
    alert(`me estan tocando ${e.target.textContent}`);

    if(e.target.textContent===`Boton 1`){
    }
}



/*--------------------------[funcion del ejemplo 4]-----------------------------*/


const funcionEstadoAplicacion = (valorInicio)=>{
    const valorEstado = {valor:valorInicio};

    //todos los que se tienen que enterar que algo cambio
    const suscriptores = [];


    //es una funcion que adentro tiene otra funcion
    const setValorEstado = (nuevoValor)=>{
        valorEstado.valor = nuevoValor;
        console.log(valorEstado);

        suscriptores.forEach(sus=>{
            sus.textContent=valorEstado.valor;
        })

    }

    const agregarSuscriptor = (suscriptor)=>{
        suscriptores.push(suscriptor);
        console.log(suscriptores)
    }

    return [valorEstado,setValorEstado,agregarSuscriptor];
}


window.onload = ()=>{

    /* Ejemplo 1 */
    console.log(vectorElastico);
    vectorElastico.forEach(elemento => {
        //console.log(elemento);
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


    /*Ejemplo 4 - Manejo centraliazdo de eventos*/ 

    const[valorEstado,setValorEstado,agregarSuscriptor] = funcionEstadoAplicacion(0);

    const idButtonIncremetar = document.querySelector("#idButtonIncremetar");
    const idButtonDecrementar = document.querySelector("#idButtonDecrementar");

    const idContenedor1 = document.querySelector("#idContenedor1");
    const idContenedor2 = document.querySelector("#idContenedor2");
    const idContenedor3 = document.querySelector("#idContenedor3");

    agregarSuscriptor(idContenedor1);
    agregarSuscriptor(idContenedor2);
    agregarSuscriptor(idContenedor3);

    idButtonIncremetar.onclick = ()=>{
        setValorEstado(valorEstado.valor+1);
    }

    idButtonDecrementar.onclick = ()=>{
        setValorEstado(valorEstado.valor-1);
    }

}
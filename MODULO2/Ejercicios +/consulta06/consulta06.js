import{funcionCuadrado} from "./modeloConsulta06.js";

window.onload = ()=>{

    const estadoAplicacion = {
        numeroInGresado: 0
    };

    const idNumero = document.querySelector("#idNumero");
    const idButtonCalcular = document.querySelector("#idButtonCalcular");
    const idResultado = document.querySelector("#idResultado");
    const idButtonGuardar = document.querySelector("#idButtonGuardar");
    const idButtonRecuperar = document.querySelector("#idButtonRecuperar");

    idButtonGuardar.onclick = () =>{
        let datosJSON = JSON.stringify(estadoAplicacion);


        localStorage.setItem("misDatos",datosJSON);
    };
    
    idButtonRecuperar.onclick = ()=>{
        let datosJSON = localStorage.getItem("misDatos");
    
        if(datosJSON){
            console.log(datosJSON)
            let objeto = JSON.parse(datosJSON)

            idNumero.value = objeto.numeroInGresado;
        }
    };

    idNumero.oninput = ()=>{
        estadoAplicacion.numeroInGresado = Number(idNumero.value)
    
    };

    idButtonCalcular.onclick = ()=>{
        let numeroInGresado = estadoAplicacion.numeroInGresado
        let resultado = funcionCuadrado(numeroInGresado);

        console.log(resultado)
    };
}
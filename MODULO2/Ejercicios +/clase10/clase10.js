import{retornarTotal} from "./funcionesClase10.js"

/* */
function cuadrado(numero){
    return numero*numero;
}

const cuadrado2 = function(numero){
    return numero* numero;
}

const cuadrado3 = (numero)=>{
    return numero*numero;
}



{
    //let resultado1 = cuadrado(5);
    //let resultado2 = cuadrado2(5);
    //let resultado3 = cuadrado3(5);
    let baseFactura= 100000

    //console.log(`Los resultados son: ${resultado1} - ${resultado2} - ${resultado3}`);

    let total = retornarTotal(baseFactura,2026);

    console.log(total)


}
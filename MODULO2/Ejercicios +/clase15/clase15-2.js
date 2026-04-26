/*Ejercicio N22*/

const funcionSobreTasa = (tipoProducto, importeBase)=>{
    let sobreTasa = 0;

    switch(tipoProducto){
        case 1:{
            sobreTasa = (importeBase*5)/1000;
            break;
        }

        case 2:{
            break
        }

        default:{
            break
        }
    }

    return sobreTasa;
}

const fnSobreTasa2 = (tipoProducto,importeBase)=>{
    //early return
    if(tipoProducto === 1) return(importeBase*5)/1000;
}

window.onload= ()=>{

};
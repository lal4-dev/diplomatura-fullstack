import PadronElectoral from "./PadronParte08_Completo.js";

window.onload = () => {
    const idDni = document.querySelector("#idDni");
    const idButtonBuscar = document.querySelector("#idButtonBuscar");
    const idRespuesta = document.querySelector("#idRespuesta");

    const idButtonBuscarNombre = document.querySelector("#idButtonBuscarNombre");
    const idNombre = document.querySelector("#idNombre");

    const idButtonReduce = document.querySelector("#idButtonReduce");


    idButtonBuscar.onclick = ()=>{
        let dniIngresado = (idDni.value);
        let votante = PadronElectoral.find(item => item.NUMDNI === dniIngresado);

        console.log(votante);

        if(votante){
            idRespuesta.textContent = votante.APELLIDOYNOMBRE;

        }
        else{
            idRespuesta.textContent=`Dato No Encontrado`;
        }
        
    };

    idButtonBuscarNombre.onclick = () =>{
        let nombreIngresado = idNombre.value.toUpperCase();

        let votantes = PadronElectoral.filter(item => item.APELLIDOYNOMBRE.includes(nombreIngresado));
        if(votantes.length > 0){
            console.log(votantes);
        }
        else{
            console.log(`Datos no encontrado`);
        }
    }

    idButtonReduce.onclick=()=>{
        let cantidadF = 0;
        let cantidadM = 0;

        PadronElectoral.forEach((votante)=>{
            if(votante.SEXO === `F`){
                cantidadF++;
            }

            if(votante.SEXO === `M`){
                cantidadM++;
            }
        })

        console.log(cantidadF);
        console.log(cantidadM);

        let cantidadF2 = 0;
        let cantidadM2 = 0;
        PadronElectoral.forEach(votante =>{
            cantidadF2 = votante.SEXO === `F` ? cantidadF2 +1 : cantidadF2;
            cantidadM2 = votante.SEXO === `M` ? cantidadM2 +1 : cantidadM2;
        })

        console.log(cantidadF2);
        console.log(cantidadM2);


        let cantidadMujeres = PadronElectoral.reduce((acumulador,votante)=>{
            if(votante.SEXO === `F`){
                return acumulador + 1;
            }
            return acumulador;
        },0);


        let cantidadHombres = PadronElectoral.reduce((acumulador,votante) =>{
            if(votante.SEXO === `M`){
                return acumulador + 1;
            }

            return acumulador;
        },0);   

        console.log(cantidadMujeres);
        console.log(cantidadHombres);
    };

}
import {funcionRecuperarUniversidades} from "./universidadModelo.js"


window.onload = ()=>{
    const idButtonUniversidadesRecuperar = document.querySelector("#idButtonUniversidadesRecuperar");
    const idSelectorPais = document.querySelector("#idSelectorPais");

    idButtonUniversidadesRecuperar.onclick = async ()=>{
        console.log("Recuperando Universidades");
        const paisElegido = Number(idSelectorPais.value);
        console.log(paisElegido)

        const datosRecuperados = await funcionRecuperarUniversidades(paisElegido);
        console.log(datosRecuperados);

    };
}
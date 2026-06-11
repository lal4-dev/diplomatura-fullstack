import {funcionRecuperarUniversidades} from "./universidadModelo.js"
import {funcionUniversidadesFilasVista,funcionRenderizarFilas} from "./universidadVista.js"

window.onload = ()=>{
    const idButtonUniversidadesRecuperar = document.querySelector("#idButtonUniversidadesRecuperar");
    const idSelectorPais = document.querySelector("#idSelectorPais");

    const idCuerpoTabla = document.querySelector("#idCuerpoTabla");

    idButtonUniversidadesRecuperar.onclick = async ()=>{
        console.log("Recuperando Universidades");
        const paisElegido = Number(idSelectorPais.value);
        console.log(paisElegido)

        const datosRecuperados = await funcionRecuperarUniversidades(paisElegido);
        console.log(datosRecuperados);

        const filas = funcionUniversidadesFilasVista(datosRecuperados);


        funcionRenderizarFilas(filas,idCuerpoTabla);
    };
}
import {paises} from "./modelo.js";
import {funcionRenderizarItems,funcionGenerarItems} from "./vista.js"


window.onload = ()=>{
    const idButtonEjemplo1 = document.querySelector("#idButtonEjemplo1");
    const idContenedor1 = document.querySelector("#idContenedor1");
    const idListaOrdenada = document.querySelector("#idListaOrdenada");
    //console.log(paises);

    idButtonEjemplo1.onclick = () =>{
        const listaPaisesEnItems = funcionGenerarItems(paises);    
        funcionRenderizarItems(listaPaisesEnItems,idListaOrdenada);
    }    

};
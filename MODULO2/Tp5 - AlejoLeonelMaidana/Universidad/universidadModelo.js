import {funcionRequestAPI} from "../api.js"

const URLArgentina = `http://universities.hipolabs.com/search?country=Argentina`;
const URLBrazil = `http://universities.hipolabs.com/search?country=Brazil`;


export const funcionRecuperarUniversidades = async (pais)=>{
    let datos = ``

    switch(pais){
        case 1:{
            datos = await funcionRequestAPI(URLArgentina);
            break;
        }

        case 2:{
            datos = await funcionRequestAPI(URLBrazil);
            break;

        }

        default:{
        
        }
    }

    return datos;
}
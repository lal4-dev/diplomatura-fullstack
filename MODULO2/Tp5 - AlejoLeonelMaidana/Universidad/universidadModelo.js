import {funcionRequestAPI} from "../api.js"

const URLArgentina = `http://universities.hipolabs.com/search?country=Argentina`;
const URLBrazil = `http://universities.hipolabs.com/search?country=Brazil`;


export const funcionRecuperarUniversidades = async (pais)=>{
    let datos = []

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
            console.warn(`No se encontraron URLs para el país con ID: ${pais}`); //por si llega otto valor
            break;
        }
    }

    return datos;
}
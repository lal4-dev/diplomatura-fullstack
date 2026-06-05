import {fnRequestApi} from "./modeloClase24.js"; 

window.onload = ()=>{
    console.log("inicio");

    const idReloj = document.querySelector("#idReloj");
    const idButtonPararReloj = document.querySelector("#idButtonPararReloj");
    const idButtonConsultar = document.querySelector("#idButtonConsultar");
    const idButtonConsultar2 = document.querySelector("#idButtonConsultar2");

    const idButtonUsuarios = document.querySelector("#idButtonUsuarios");


    const reloj = setInterval(()=>{
        const ahora = new Date();
        idReloj.textContent = ahora.toLocaleString()

    },1000);

    idButtonPararReloj.addEventListener("click",()=>{
        clearInterval(reloj);
    });


    idButtonConsultar.addEventListener("click",async ()=>{
        
        try {
            const URL = `http://universities.hipolabs.com/search?country=Brazil`
            const datosEnCrudo = await fetch(URL);

            console.log(datosEnCrudo);

            const Universidades = await datosEnCrudo.json();
            console.log(Universidades)
            
        } catch (error) {
             console.log(error.errormessage);
        }
        
        
    });


    idButtonConsultar2.addEventListener("click", async()=>{
        const uniBrazil = await fnRequestApi(`http://universities.hipolabs.com/search?country=Brazil`);
        
        console.log(uniBrazil)
    });


    idButtonUsuarios.addEventListener("click", async()=>{
        const usuarioas = await fnRequestApi(`https://jsonplaceholder.typicode.com/users`);
        console.log(usuarioas)
    })




}
window.onload=()=>{
    const idButtonGenerarBotones = document.querySelector("#idButtonGenerarBotones");
    const idContenedor1 = document.querySelector("#idContenedor1");
    const idButtonGenerarBotones2 = document.querySelector("#idButtonGenerarBotones2");
    const idButtonGenerarBotones3 = document.querySelector("#idButtonGenerarBotones3");


    /* Generacion dinamica en el lado front*/

    idButtonGenerarBotones.onclick = ()=>{
        let botonesDinamicos = ``;

        botonesDinamicos = `<button>Boton 1</button>`;

        let quinceBotones = ``;
        
        for(let i=0;i<=14;i++){

            quinceBotones = quinceBotones + `<button>Boton ${i}</button>`;

        }
        console.log(quinceBotones);
        idContenedor1.innerHTML = quinceBotones;
    }

    idButtonGenerarBotones2.onclick = ()=>{

        let botonDinamico = document.createElement("input");
        botonDinamico.type = "button";
        botonDinamico.value = "Esto es un boton seguro";

        botonDinamico.onclick = () =>{
            alert("Hola soy el boton ")
        }
        
        idContenedor1.appendChild(botonDinamico);

    }

    idButtonGenerarBotones3.onclick = ()=>{
        const vectorTextoBotones = [`Fecha 1 - 11/06`,`Fecha 2 - 12/06`,`Fecha 3 - 13/06`,`Fecha 4 - 14/06`,` Fecha 5 - 15/06`];
        console.log(vectorTextoBotones);
        vectorTextoBotones.forEach(texto =>{
            let botonDinamico = document.createElement("input");
            botonDinamico.type = "button";
            botonDinamico.value = texto;

            botonDinamico.onclick = ()=>{
                console.log(`Este boton mostrara el partido de la fecha${texto}`)
            }

            idContenedor1.appendChild(botonDinamico);
        })
    }

}
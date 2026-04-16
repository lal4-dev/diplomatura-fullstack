/*
objetos literales -> objetos puros de java script

json -> javascript object notation
    es un texto delimitado de una manera que esta en formato string y puede estar en la nube
*/
/*
{
    const Persona1 = {dni: 2556789, nombre:`erick`,apellido:`cirione`}

    let datoJson = JSON.stringify(Persona1);

    console.log(Persona1);
    console.log(datoJson);


    let objetoRecupero = JSON.parse(datoJson);
    console.log(objetoRecupero);

}*/

window.onload= ()=>{

    const estadoAplicacion = {
        cuit:0,
        nombre:"",
        provincia:0
    }

    const idCuit = document.querySelector("#idCuit");
    const idNombre = document.querySelector("#idNombre");
    const idProvincia = document.querySelector("#idProvincia");
    const idButtom = document.querySelector("#idButtom");
    const idButtomAceptarV2 = document.querySelector("#idButtomAceptarV2");

    idCuit.oninput = ()=>{
        estadoAplicacion.cuit = idCuit.value;
    }

    idNombre.oninput = ()=>{
        estadoAplicacion.nombre = idNombre.value;
    }

    idProvincia.onchange = ()=>{
        estadoAplicacion.provincia = Number(idProvincia.value);
    }

    idButtom.onclick = ()=>{
        let cuit = idCuit.value;
        let nombre = idNombre.value;
        let provincia = Number(idProvincia.value);
    
        const datoPersona = {cuit, nombre, provincia}
        
        let datoJson = JSON.stringify(datoPersona)
    }   

    idButtomAceptarV2.onclick = () =>{
        let datosEnFormato = JSON.stringify(estadoAplicacion);

        
    }

}

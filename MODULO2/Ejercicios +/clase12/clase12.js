window.onload = () =>{

    const idButtonAceptar = document.querySelector("#idButtonAceptar");
    const idNumero = document.querySelector("#idNumero");
    const idSelectPaises = document.querySelector("#idSelectPaises");
    const idPagaEnvio = document.querySelector("#idPagaEnvio");
    const idPagaSeguro = document.querySelector("#idPagaSeguro");

    idButtonAceptar.onclick = () =>{
        let numero = Number(idNumero.value);
        let valorPaises = Number(idSelectPaises.value)
        console.log(idPagaEnvio.checked);
        console.log(idPagaSeguro.checked);
        console.log(numero,valorPaises);
    }

    idSelectPaises.onchange = ()=>{
        alert("Cambiaron el valor loco")
    }

    idPagaEnvio.onchange = () =>{
        idPagaEnvio.checked ? console.log(`El mono paga el envio`) : console.log(`El rata no paga el envio hace aca el paquete`)
    }
    


}


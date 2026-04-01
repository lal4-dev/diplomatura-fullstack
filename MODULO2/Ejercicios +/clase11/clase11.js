/*
DOM -> document object model
1- Request
2- Response
3- Los datos llegan al navegar
4- El browser renderiza
5- dispara el evento -> onload

*/
window.onload = function(){
    console.log(`La pagina esta renderizada`);

    const idNumero1 = this.document.querySelector("#idNumero1");
    const idNumero2 = this.document.querySelector("#idNumero2");
    const idBottom  = this.document.querySelector("#idButtomSumar");
    const idBottom2 = this.document.querySelector("#idButtomRestar");

    const idResultado = this.document.querySelector("#idResultado")

    idBottom.onclick = () => {
        let numero1 = Number(idNumero1.value);
        let numero2 = Number(idNumero2.value);
        let suma = numero1 + numero2;

        idResultado.textContent = `${numero1} + ${numero2} = ${suma}`;


        alert(`me tocaron la suma`)
    }

    idBottom2.onclick = ()=>{
        this.alert(`me estan haciendo click en la resta`)
    }
};
/*comentario generico de js*/

    /* Reglas para la creación de variables 
    
        - se utiliza la palabra let => no se usa mas la palabra var
        - no se dejan espacios en blanco dentro del nombre de la variable
        - no se comienza con numeros al crear el nombre de una variable
        - utilizar símbolos + - / * 
        - el nombre de una variable debe tener una carga semántica fuerte.
        que represente con su propio nombre de variable el contenido de la misma.

        - tengo 10 mil formas de declarar variables.
    
    */

{
    console.log("Hola mundo, que hace chusmeando aca pichon");

    /*declaracion de variables*/
    let nombreGenerico = "EMIR CIRIONE"; //STRING
    let dniPersona = 123456789; //INT


    /* Existen reglas para la creación de Variables
    
        - camelCase => Todas las palabras van Juntas, comienzan en mayuscula excepto la primera
        - UpperCase => Todas las palabras van Juntas, y todas comienzan en mayúsculas
    
    */

    let domicilioDePersona = "JUAN PABLO VERA 8828282 2DO. B"; // camelCase
    let DomicilioDePersona = "AVE. VIRGEN DEL VALLE NORTE - 282828"; // UpperCase

    /*-------------------------------------------------*/

    /* 
        Vamos a realizar un programa que dado
        un importe "X" calcule un descuento del 15%
        y que al final muestre el total a pagar 
    */

    function calcularDescuento(){
        let importeCompra = document.getElementById("monto").value;

        let descuentoImporte = (importeCompra * 15)/100;

        console.log("el importe de la compra es:", importeCompra);
        console.log("el descuento es: ",descuentoImporte);

        let totalPagar = (importeCompra - descuentoImporte);

        console.log("el monto a pagar final es:",totalPagar);


        document.getElementById("resultado").innerHTML =
        "Descuento: $" + descuentoImporte + "<br> Total a pagar: $" + totalPagar;

        document.getElementById("card").classList.add("scale-105");
    }

}
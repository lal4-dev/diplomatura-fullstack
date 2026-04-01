/*
Ejercicio Nro. 18:
    Un supermercado desea realizar una aplicación WEB que le permita a sus cajeros realizar los cobros a los clientes que atenderán en su jornada laboral. La aplicación debe tener las siguientes consideraciones.
    -	Un cajero podrá atender a “n” clientes, siendo n el número que no está definido, puede atender a 0, 2, 5 clientes. 
    Nota: debería resolverse aplicando un ciclo while de clientes

    -	Cada cliente atendido llevará “m” productos, siendo m el número que no está definido. Puede llevar 10, 15, 20, 50 productos. 
    Nota: debería resolverse aplicando un ciclo while de productos.

    -	Al finalizar la atención del cliente, debería preguntar si paga con:
        o	1 – Efectivo – aplicar descuento 10%
        o	2 – Tarjeta Visa BNA – aplicar descuento 7%
        o	3 – Tarjeta Master BNA – aplicar descuento 7%
        o	4 – Otras Tarjetas Medios – sin descuentos.
    
    -	Al finalizar la atención del cliente deberá ir registrando los siguientes puntos
        o	Venta Total = Acumular la venta de todos los clientes
        o	Descuento Total = Acumular los descuentos realizados a cada cliente
        o	Importe a Pagar Total = Acumular los Importes a pagar por cada cliente
        o	Contar la cantidad de clientes que Tuvieron descuentos
        o	Contar la cantidad de clientes que No Tuvieron descuentos.

    Nota: Este proceso debe confeccionarse con dos ciclos while, un ciclo while atenderá a los clientes y el otro ciclo while (interno) registrará los productos que lleva cada cliente.
 */

{
    let continuarAtendiendo = `S`;
    let cantidadClientesAtendidos = 0;
    let ventaTotal = 0;
    let descuentoTotal = 0;

    let clienteDescuento = 0;
    let clienteSinDescuento = 0;

    let importeTotal = 0;
    let pagoFinal = 0;


    while(continuarAtendiendo === `S`){
        cantidadClientesAtendidos ++;
        
        console.log(`Atendiendo al cliente ${cantidadClientesAtendidos}: `)

        //Variables por cliente
        let otroProducto = `S`;
        let cantidadProductos = 0 ;
        let totalPagar = 0;
        let precioProducto = 0;
        let formaPago = 0;
        let descuento = 0; 

        //los productos del cliente
        while(otroProducto === `S`){
            cantidadProductos++;
            precioProducto = Number(prompt(`Ingrese el precio del producto ${cantidadProductos}: `));
            totalPagar += precioProducto;

            console.log(`El cliente numero: ${cantidadClientesAtendidos}, lleva de momento antes de pagar un total: ${totalPagar}`)

            otroProducto = prompt(`Ingresa otro producto? (S/N): `)
        }

        formaPago = Number(prompt(`1-Efectivo , 2-Tarjeta Visa BNA, 3-Tarjeta Master BNA, 4-Otra tarjeta: `));

        switch(formaPago){
            case 1:{
                descuento = (totalPagar * 10)/100;
                clienteDescuento++;

                break;
            }

            case 2:{
                descuento = (totalPagar * 7)/100;
                clienteDescuento++;

                break;
            }

            case 3:{
                descuento = (totalPagar * 7)/100;
                clienteDescuento++;

                break;
            }

            case 4:{
                descuento = 0;
                clienteSinDescuento++;

                break;
            }
            
            default:{
                descuento=0;
                clienteSinDescuento++;
                console.log(`opcion invalidada`);

                break;
            }
        }

        //Registro General
        ventaTotal = ventaTotal + totalPagar;
        descuentoTotal = descuentoTotal + descuento;
        pagoFinal = totalPagar - descuento;
        importeTotal = importeTotal + pagoFinal;

        console.log(`El cliente ${cantidadClientesAtendidos}, tiene que pagar ${pagoFinal}`);

        continuarAtendiendo = prompt(`Continuar atendiendo clientes? (S/N): `);
    }

    //Salida Final
    console.log(`Se vendio con ${cantidadClientesAtendidos} un total de: ${ventaTotal}`);
    console.log(`Se descontaron con ${cantidadClientesAtendidos} un total de: ${descuentoTotal}`);
    console.log(`El importe total final es de: ${importeTotal}`);
    console.log(`Clientes con descuento: ${clienteDescuento}`);
    console.log(`Cliente sin descuento: ${clienteSinDescuento}`);
}
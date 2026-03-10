{
    /*Ciclo for
    
        estamos en un mercadito de barrio, y la cajera del mercado necesita una aplicacion que le permita ingresar, cobrar y totalizar los productos que los clientes llevan
        caja rapida hasta 5 productos
            - si paga con tarjeta de bancion nacion cualquier dia,cobra con markaton, por ende hace un descuento del 35% con tope de devolucion de 45.000
    */
    
    
    let totalCompra = 0;
    let precioProducto = 0;

    let medioPago = 0;
    let descuento = 0;
    let tope = 45000;
    let totalCompraFinal = 0;

    for(let i=1; i<=5; i++){
        precioProducto = Number(prompt(`Ingrese el precio del producto ${i}: `));
        totalCompra = totalCompra + precioProducto;

        console.log(`precio producto = ${i}: ${precioProducto}`);
        console.log(`subTotal: ${totalCompra}`);

    }

    medioPago = Number(prompt(`Indique medio de pago: 1 - BNA, 2 - efectivo`));

    switch(medioPago){
        case 1:{
            descuento = (totalCompra * 35)/100 ;
            descuento = descuento>= tope ? tope: descuento;

            console.log(descuento);
            
            break;
        }

        case 2:{
            descuento = 0;
            break;
        }

        default:{
            console.log(`le errate a todo papi, dame efectivo nomas`)
            descuento = 0;

            break;
        }
    }
    
    totalCompraFinal = totalCompra - descuento;
    
    console.log(`El total de la compra es: ${totalCompraFinal}, el precio original es: ${totalCompra}, y tenes un descuento de: ${descuento}`);

}
/*Ciclo while 
Se desea realizar una aplicación web 
para una caja de un pequeño mercado de barrio
que siga con estas reglas de negocio.

- puede cobrar "n" productos. El cajero
no sabe con anticipación los productos que
lleva el cliente.

- las compras que totabilizan un importe mayor
a 300.000 pesos en mercadería tienen un descuento
del 5% sobre el total de la compra.

- los tickets de compra que contabilicen más
de 7 operaciones tienen un descuento adicional
del 3%

- al finalizar mostrar el comprobante donde
salgan los siguientes totales
	(1) importe compra:
	(2) descuento 1:
	(3) descuento 2:

	(4) subtotal:(1) - (2) - (3)

	IMPUESTOS:

	IVA (21%)
	ING.BRUTOS (3%)
	TAS.MUNICIPAL (6 6%°)
	
	TOTAL A PAGAR


*/

{
    let precioProducto = 0;
    let totalCompra = 0;
    let cantidadProductos = 0;

    let descuento1 = 0;
    let descuento2 = 0;
    let subtotal = 0;

    let iva = 0;
    let ingresosBrutos = 0;
    let tasaMunicipal = 0;

    precioProducto = Number(prompt("Ingrese el precio del producto (0 para finalizar):"));

    while(precioProducto != 0){

        totalCompra = totalCompra + precioProducto;
        cantidadProductos++;

        precioProducto = Number(prompt("Ingrese el precio del producto (0 para finalizar):"));
    }

    // descuento 1 (5% si supera 300000)
    if(totalCompra > 300000){
        descuento1 = totalCompra * 0.05;
    }

    // segundo descuento (3% si hay más de 7 productos)
    if(cantidadProductos > 7){
        descuento2 = totalCompra * 0.03;
    }

    subtotal = totalCompra - descuento1 - descuento2;

    // impuestos - alto robo pero vo vite no te queda otra
    iva = (subtotal * 21)/100;
    ingresosBrutos = (subtotal * 3)/100;
    tasaMunicipal = (subtotal * 6.6)/100;

    let totalPagar = subtotal + iva + ingresosBrutos + tasaMunicipal;

    console.log(`Importe compra: $${totalCompra}`);
    console.log(`Cantidad de productos: ${cantidadProductos}`);

    console.log(`Descuento 1 (5%): $${descuento1}`);
    console.log(`Descuento 2 (3%): $${descuento2}`);

    console.log(`Subtotal: $${subtotal}`);

    console.log(`IVA (21%): $${iva}`);
    console.log(`Ingresos Brutos (3%): $${ingresosBrutos}`);
    console.log(`Tasa Municipal (6.6%): $${tasaMunicipal}`);

    console.log(`TOTAL A PAGAR: $${totalPagar}`);
}
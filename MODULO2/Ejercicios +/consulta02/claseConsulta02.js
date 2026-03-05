/*
EJERCICIO NRO. 03: 
    Se desea realizar una aplicación en JavaScript que permita presupuestar el costo total de  construcción de una pared. 

    Para ello, se sabe que el cálculo se basa en el alto y el ancho de la pared, los cuales serán ingresados en metros. 

La aplicación debe considerar lo siguiente: 
    - El costo del metro cuadrado de materiales es de $225.000 
    - El costo del metro cuadrado de mano de obra es de $25.000 
    - El costo del metro cuadrado de pintura es de $12.500 
*/
{
    let costoMetroCuadradoMateriales = 225000;
    let costoMetroCuadradoManoObra = 25000;
    let costoMetroCuadradoPintura = 12500;

    let alto = 0;
    let ancho = 0;
    let metrosCuadradosPared=0; 

    let costoMateriales = 0;
    let costoManoObra = 0;
    let costoPintura = 0;

    let costoTotalPared = 0;

    alto = Number(prompt(`Ingrese el alto de la pared(en metros): `));
    ancho = Number(prompt(`Ingrese el ancho de la pared(en metros): `));

    metrosCuadradosPared = alto * ancho;

    costoMateriales = metrosCuadradosPared * costoMetroCuadradoMateriales;
    costoManoObra = metrosCuadradosPared *costoMetroCuadradoManoObra;
    costoPintura = metrosCuadradosPared *costoMetroCuadradoPintura;

    costoTotalPared = costoMateriales + costoManoObra + costoPintura;

    console.log(`El costo de levantar la pared en materiales es: ${costoMateriales}, el costo en mano de obra es: $${costoManoObra}, y el costo en pintura es: $${costoPintura}, costo total final de la pared: $${costoTotalPared}`);

}


/*
EJERCICIO NRO. 04: 
    Una fábrica de alimentos desea desarrollar una aplicación en JavaScript que permita calcular la cantidad de ingredientes necesarios para producir masa para empanadas. 

    Se sabe que para producir 1 kilogramo de masa se necesitan: 
        1)  1 kg de harina 
        2)  500 ml de agua 
        3)  100 gramos de grasa 
        4)  20 gramos de sal 

    El sistema debe permitir ingresar: La cantidad de kilogramos de masa que se desea producir.

    A partir de ese dato, el programa debe calcular: 
        - La cantidad total de harina necesaria. 
        - La cantidad total de agua necesaria. 
        - La cantidad total de grasa necesaria. 
        - La cantidad total de sal necesaria. 
*/

{
    let harinaMasa = 1;
    let aguaMasa = 0.5;
    let grasaMasa = 0.1;
    let salMasa = 0.02;

    let cantidadKilogramosMasa = 0;
    
    cantidadKilogramosMasa = Number(prompt(`Ingrese la cantidad de masa de empanada que quiere hacer: `));

    let cantidadTotalHarina = (cantidadKilogramosMasa*harinaMasa);
    let cantidadTotalAgua = (cantidadKilogramosMasa*aguaMasa);
    let cantidadTotalGrasa = (cantidadKilogramosMasa*grasaMasa);
    let cantidadTotalSal = (cantidadKilogramosMasa*salMasa);

    console.log(`La cantidad de harina necesaria es: ${cantidadTotalHarina}, la cantidad de agua necesaria es: ${cantidadTotalAgua}, la cantidad de grasa necesesaria es: ${cantidadTotalGrasa}, la cantida de sal necesario es: ${cantidadTotalSal}`)
}


/*
EJERCICIO NRO. 05: 
    Una  plataforma  de  venta  de  pasajes  (terrestres)  desea  realizar  una  aplicación  web  que  permita  realizar la venta de los mismos, para ello el dueño propone las siguientes reglas tratando de promover las ventas.

    - Si la cantidad de Pasajes es mayor a 3 y el importe total de la compra es mayor a 250.000,00 pesos, se aplicará un descuento del 11% sobre el total de la compra.

    -Si la cantidad de pasajes es mayor a 3 y el importe total de la compra es mayor a 500.000,00 pesos, se aplicará un descuento del 15% sobre el total de la compra. 

El Sistema debe registrar mínimamente estas variables: 
- cantidad de pasajes 
- importe pasaje 
- total compra = cantidad de pasajes * importe pasaje 
*/

{
    let cantidadPasajes = 0;
    let importePasaje = 0;

    let totalCompra = 0;
    let descuento = 0;
    let totalPagarFinal = 0;

    importePasaje = Number(prompt(`Ingrese el importe del pasaje: `));
    cantidadPasajes = Number(prompt(`Ingrese la cantidad de pasajes: `));

    totalCompra = (cantidadPasajes * importePasaje);

    if((cantidadPasajes>3)&&(totalCompra>500000)){
        descuento = (totalCompra * 15)/100;
    }
    else{
        if((cantidadPasajes>3)&&(totalCompra>250000)){
            descuento = (totalCompra * 11)/100;
        }
    }

    totalPagarFinal = totalCompra - descuento;

    console.log(`La cantidad de pasajes que se van a comprar es: $${cantidadPasajes}, el precio de cada pasaje es: $${importePasaje}, el total de la compra es: $${totalCompra}, el descuento seria: $${descuento}, y el final a abonar es: $${totalPagarFinal}`);

}
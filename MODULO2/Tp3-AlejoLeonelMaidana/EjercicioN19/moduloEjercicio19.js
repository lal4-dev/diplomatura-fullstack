export const funcionGananciaProducto = (importe,ganancia)=>{
    let precioVenta = importe + ((importe*ganancia)/100);

    return precioVenta;
}

export const funcionGuardarEstado = (estadoAplicacion)=>{
    let estadoApp = JSON.stringify(estadoAplicacion);
    localStorage.setItem("estadoApp",estadoApp);
}

export const funcionRecuperarEstado = (estadoAplicacion,idPrecioProducto,idGanaciaProducto)=>{

    let datoRecuperado = localStorage.getItem("estadoApp")

    if(datoRecuperado){
        let estadoObjeto = JSON.parse(datoRecuperado);

        idPrecioProducto.value = estadoObjeto.precio;
        idGanaciaProducto.value = estadoObjeto.ganancia;

        estadoAplicacion.precio = estadoObjeto.precio;
        estadoAplicacion.ganancia = estadoObjeto.ganancia
    } 
}
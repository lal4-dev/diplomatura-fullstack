export const funcionCalculoPrecioVenta = (importeCompra, margen) =>{
    let precioVenta = importeCompra + ((importeCompra*margen)/100);
    return precioVenta;
};
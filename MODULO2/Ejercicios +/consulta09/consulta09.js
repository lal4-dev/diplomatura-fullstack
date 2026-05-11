import {productos} from "./modelo.js";

let sueldos = [32000,17000,78000,10000];
window.onload = () =>{
    console.log(productos);

    productos.forEach((item,indice)=>{
        if(item.precio>=20000){
            console.log(item);
        }
    });

    productos.forEach((producto)=>{
        if(producto.precio <= 20000){
            console.log(producto);
        }
    });

    productos.forEach(productos => productos.precio <= 20000? console.log(productos):``);

    let productoEncontrado = productos.find(productos=>{
        return productos.id === 6 ? true:false;
    });

    console.log(productoEncontrado);


    let productoEncontrado2 = productos.find(producto => producto.id ===6);
    console.log(productoEncontrado2);

    let calzados = productos.filter(producto => producto.categoria === `calzado`);
    console.log(calzados);

    let resultado = productos.some(producto=> producto.stock===0);
    console.log(resultado);

    let resultado2 = productos.every(producto=> producto.stock >= 5);
    console.log(resultado2)

    let quincesas = sueldos.map(sueldos => sueldos/2);
    console.log(quincesas);
}   
import {productos} from "./modelo.js"
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
}
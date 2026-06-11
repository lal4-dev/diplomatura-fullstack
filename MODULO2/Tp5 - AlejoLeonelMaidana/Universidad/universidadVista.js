/*funciones de vista{cortar de aca}*/
export const funcionUniversidadVista = (universidad)=>{

    const {country:paisUniversidad,name:nombreUniversidad,"state-province":provinciaUniversidad,web_pages:paginaUniversidad}=universidad
    const [paginaOficial,...resto]=paginaUniversidad
    
    console.log(paisUniversidad);
    console.log(nombreUniversidad);
    console.log(provinciaUniversidad);
    console.log(paginaOficial)

    const filaTabla = document.createElement("tr");
   
    const celda1 = document.createElement("td");
    celda1.textContent = paisUniversidad

    const celda2 = document.createElement("td");
    celda2.textContent = nombreUniversidad

    const celda3 = document.createElement("td");
    celda3.textContent = provinciaUniversidad

    const celda4 = document.createElement("td");
    const linkUniversidad = document.createElement("a");
    linkUniversidad.href=paginaOficial;
    linkUniversidad.target ="_blank";
    linkUniversidad.textContent = paginaOficial;
    celda4.appendChild(linkUniversidad);


    filaTabla.appendChild(celda1);
    filaTabla.appendChild(celda2);
    filaTabla.appendChild(celda3);
    filaTabla.appendChild(celda4);

    return filaTabla;
}


export const funcionUniversidadesFilasVista = (universidadess)=>{
    const filas = universidadess.map(universidad => funcionUniversidadVista(universidad));
    return filas;
}

export const funcionRenderizarFilas = (filas,contenedor)=>{
    contenedor.innerHTML=``;
    filas.forEach(fila => contenedor.appendChild(fila));
}

/*funciones de vista que me renderizan cosas en el DOM*/
export const funcionUniversidadVista = (universidad)=>{

    const {country:paisUniversidad, name:nombreUniversidad, "state-province":provinciaUniversidad, web_pages:paginaUniversidad} = universidad;
    const [paginaOficial, ...resto] = paginaUniversidad;

    const filaTabla = document.createElement("tr");
    filaTabla.classList.add("hover:bg-zinc-800/80", "transition-colors", "duration-200"); // Efecto hover oscuro en la fila
   
    const celda1 = document.createElement("td");
    celda1.textContent = paisUniversidad;
    celda1.classList.add("whitespace-nowrap", "py-4", "pl-5", "pr-3", "text-sm", "font-medium", "text-zinc-200");

    const celda2 = document.createElement("td");
    celda2.textContent = nombreUniversidad;
    celda2.classList.add("whitespace-nowrap", "px-3", "py-4", "text-sm", "text-zinc-400");

    const celda3 = document.createElement("td");
    celda3.textContent = provinciaUniversidad ? provinciaUniversidad : "No especificada";
    celda3.classList.add("whitespace-nowrap", "px-3", "py-4", "text-sm", "text-zinc-400");

    const celda4 = document.createElement("td");
    celda4.classList.add("whitespace-nowrap", "px-3", "py-4", "text-sm");
    
    const linkUniversidad = document.createElement("a");
    linkUniversidad.href = paginaOficial;
    linkUniversidad.target ="_blank";
    linkUniversidad.textContent = "Visitar Web"; //por quedan feo tantas url distintas
    
    // El link color verde mate
    linkUniversidad.classList.add("text-lime-500", "hover:text-lime-400", "font-semibold", "underline", "transition-colors");
    
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
    contenedor.innerHTML = ``;
    filas.forEach(fila => contenedor.appendChild(fila));
}
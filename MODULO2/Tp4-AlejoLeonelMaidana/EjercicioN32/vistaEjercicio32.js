export const funcionGenerarAlumnos = (cohorte) => {
    const listarAlumnos = cohorte.map(({nombre, apellido}) => {
        const itemLista = document.createElement("li");
        itemLista.textContent = `${nombre} - ${apellido}`;
        return itemLista;
    });

    return listarAlumnos;
};

export const funcionRenderizarAlumnos = (listaAlumnos, contenedorLista) => {
    contenedorLista.innerHTML = ``;
    listaAlumnos.forEach(item => contenedorLista.appendChild(item));
};

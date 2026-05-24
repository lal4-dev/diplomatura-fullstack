export const funcionGenerarItems = ((paises)=>{
    const listaPaisesEnItems = paises.map(({nombre,capital})=>{
            const itemLista = document.createElement("li");
            itemLista.textContent = `${nombre} - ${capital}`;
            return itemLista;
    });
    
    return listaPaisesEnItems;
})

export const funcionRenderizarItems = (listaPaises,contenedorListaOrdenada)=>{
    contenedorListaOrdenada.innerHTML = ``;
    listaPaises.forEach(itemsDelVector => contenedorListaOrdenada.appendChild(itemsDelVector));

}
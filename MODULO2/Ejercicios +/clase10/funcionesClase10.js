export const retornarIva=(importeBase,anio)=>{
    /*
        para facturas 2026 => 16
        para facturar 2025 =>21
        para facturar antes 2025 => 10

    */
    
    if(anio>=2026){
        return (importeBase*16)/100;
    }
    else if(anio===2025){
        return (importeBase)*21/100;
    }
    else if(anio<2025){
        return (importeBase)*10/100;
    }

    
}

export const retornarIngrsosBrutos = (importeBase)=>{
    return (importeBase*3)/100;
}


export const retornarTotal = (importeBase,anio)=>{
    return(importeBase + retornarIva(importeBase,anio) + retornarIngrsosBrutos(importeBase))
}
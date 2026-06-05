export const fnRequestApi = async (URL)=>{
    try{    
        const Request = await fetch(URL);
        if(Request.ok){
            const datos = await Request.json();

            return datos;
        }

    }catch(error){
        throw new Error(`Hubo un problema no pudimos conectarnos con el api`)
    }
}
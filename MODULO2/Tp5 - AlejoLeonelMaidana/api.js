export const funcionRequestAPI = async (URL)=>{
    let request = ``;
    let datos = ``;

    try {
        request = await fetch(URL)

        if(!request.ok){
            throw new Error(`Se produjo un error en el intento de recuperar desde la API`)
        }

        datos= request.json()
        return datos;
    } catch (error) {
            
    }
}
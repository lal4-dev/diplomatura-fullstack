window.onload = ()=>{
    const idButtonSetTimeOut = document.querySelector("#idButtonSetTimeOut");
    const idButtonSetTimer = document.querySelector("#idButtonSetTimer");
    const idReloj = document.querySelector("#idReloj");
    
    idButtonSetTimeOut.onclick = ()=>{
        console.log("estamos vivos");

        setTimeout(()=>{
            console.log("esto se ejecutara pasado 3 segundos")
        },3000);
    }

    idButtonSetTimer.onclick = ()=>{
        setInterval(() => {
            console.log("esto se va repetir cada 2 segundos");
        }, 2000);
    }

    idButtonSetTimer.onclick =()=>{

        const ahora = new Date();

        setInterval(()=>{
            idReloj.textContent = ahora.toLocaleString();
        },1000);
    };

}
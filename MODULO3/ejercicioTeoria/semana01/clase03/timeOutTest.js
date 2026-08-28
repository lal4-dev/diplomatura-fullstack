console.log("A");

setTimeout(()=>{
    console.log("B");
},200);

for(let i=0; i<1000; i++){
    i++;
    console.log(i);
}

console.log("C");
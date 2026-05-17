
import { productos, usuarios } from "./modelo.js";

window.onload = function () {


   const idBoton1  = document.querySelector("#idBoton1");
   const idBoton2  = document.querySelector("#idBoton2");
   const idBoton3  = document.querySelector("#idBoton3");
   const idBoton4  = document.querySelector("#idBoton4");
   const idBoton5  = document.querySelector("#idBoton5");
   const idBoton6  = document.querySelector("#idBoton6");
   const idBoton7  = document.querySelector("#idBoton7");
   const idBoton8  = document.querySelector("#idBoton8");
   const idBoton9  = document.querySelector("#idBoton9");
   const idBoton10 = document.querySelector("#idBoton10");
   const idBoton11 = document.querySelector("#idBoton11");
   const idBoton12 = document.querySelector("#idBoton12");
   const idBoton13 = document.querySelector("#idBoton13");
   const idBoton14 = document.querySelector("#idBoton14");
   const idBoton15 = document.querySelector("#idBoton15");
   const idBoton16 = document.querySelector("#idBoton16");
   const idBoton17 = document.querySelector("#idBoton17");
   const idBoton18 = document.querySelector("#idBoton18");
   const idBoton19 = document.querySelector("#idBoton19");
   const idBoton20 = document.querySelector("#idBoton20");
   const idBoton21 = document.querySelector("#idBoton21");
   const idBoton22 = document.querySelector("#idBoton22");
   const idBoton23 = document.querySelector("#idBoton23");
   const idBoton24 = document.querySelector("#idBoton24");
   const idBoton25 = document.querySelector("#idBoton25");
   const idBoton26 = document.querySelector("#idBoton26");


  // ============================================================
  //  DESTRUCTURING
  // ============================================================

  idBoton1.onclick = () => {
    console.clear();
    console.log("---- Botón 1 - El contexto define el comportamiento ----");

    /* El mismo símbolo puede significar cosas distintas
       dependiendo de dónde aparezca en el código.
       La clave es mirar si está a la IZQUIERDA o a la DERECHA del signo =

       [] a la DERECHA del = → estoy CREANDO un array
       [] a la IZQUIERDA del = → estoy DESTRUCTURANDO un array

       {} a la DERECHA del = → estoy CREANDO un objeto
       {} a la IZQUIERDA del = → estoy DESTRUCTURANDO un objeto */

      //creando un vector
      const Vector1 = ["LUCAS","FERNANDA","JUAN","DANIEL"];
      
      // descomponer un vector en constantes
      const [alumno1,alumno2,alumno3,alumno4] = Vector1;
      console.log(alumno1);
   
      //crear un objeto
      const datosSecretaria = {
         dni: 45789932,
         apellido:"lopez",
         nombreCompleto:"fernanda"
      }

      //Destructuring

      const {dni,apellido,nombreCompleto} = datosSecretaria;

      console.log(dni);


    /* [] a la derecha → CREO un array */
    const misProductos = [
      { id: 1, nombre: "Remera",  precio: 2500  },
      { id: 2, nombre: "Mochila", precio: 12000 },
    ];

    /* [] a la izquierda → DESTRUCTURO el array */
    const [primerProducto, segundoProducto] = misProductos;

    /* {} a la derecha → CREO un objeto */
    const producto = { id: 1, nombre: "Remera", precio: 2500 };

    /* {} a la izquierda → DESTRUCTURO el objeto */
    const { nombre, precio } = producto;

    console.log("misProductos:", misProductos);
    console.log("primerProducto:", primerProducto);
    console.log("segundoProducto:", segundoProducto);
    console.log("nombre:", nombre, "| precio:", precio);
  };

  idBoton2.onclick = () => {
    console.clear();
    console.log("---- Botón 2 - Objetos: forma tradicional vs destructuring ----");

    /* Forma tradicional: para acceder a las propiedades de un objeto
       se usa la notación de punto, asignando cada propiedad a una variable

       Con destructuring: extraigo las propiedades que me interesan
       en una sola línea, directamente como variables
       sin repetir el nombre del objeto cada vez */

   const datosSecretaria = {
      dni: 45789932,
      apellido:"lopez",
      nombreCompleto:"fernanda"
   }

   console.log(datosSecretaria.apellido);
   
   const {dni,apellido,nombreCompleto} = datosSecretaria;



    const producto = productos[0];

    const nombre1    = producto.nombre;
    const precio1    = producto.precio;
    const categoria1 = producto.categoria;

    console.log("Tradicional:", nombre1, precio1, categoria1);

    const { nombre, precio, categoria } = producto;

    console.log("Destructuring:", nombre, precio, categoria);
  };

  idBoton3.onclick = () => {
    console.clear();
    console.log("---- Botón 3 - Objetos: renombrar variable al destructurar ----");

   


    /* Al destructurar puedo renombrar la variable usando : (dos puntos)
       sintaxis: { propiedadOriginal: nombreNuevaVariable }

       Útil cuando el nombre de la propiedad choca con una variable
       que ya está declarada en el mismo scope */

    const producto = productos[0];

    /* nombre: nombreProducto → la propiedad 'nombre' del objeto
       se asigna a la variable 'nombreProducto'
       La propiedad del objeto sigue llamándose 'nombre' — solo la variable cambia */

    const { nombre: nombreProducto, precio: precioProducto, categoria: cat } = producto;

    console.log("nombreProducto:", nombreProducto);
    console.log("precioProducto:", precioProducto);
    console.log("cat:", cat);
  };

  idBoton4.onclick = () => {
    console.clear();
    console.log("---- Botón 4 - Objetos: valor por defecto ----");

    /* Al destructurar puedo asignar un valor por defecto a una propiedad
       sintaxis: { propiedad = valorPorDefecto }

       Se utiliza cuando consumimos APIs externas que no siempre
       devuelven todos los campos del objeto — en vez de recibir
       undefined, la variable toma el valor por defecto que definimos */

    const producto = productos[0];

    /* descuento no existe en el objeto
       sin valor por defecto obtendríamos undefined
       con valor por defecto obtenemos 0 */

    const { nombre, precio, descuento = 0 } = producto;

    console.log("nombre:", nombre);
    console.log("precio:", precio);
    console.log("descuento:", descuento); /* 0 — no existía, tomó el valor por defecto */

    /* Si la propiedad SÍ existe en el objeto, el valor por defecto se ignora */
    const productoConDescuento = { id: 1, nombre: "Remera", precio: 2500, descuento: 15 };
    const { descuento: desc2 = 0 } = productoConDescuento;

    console.log("descuento cuando existe:", desc2); /* 15 — ignoró el 0 */
  };

  idBoton5.onclick = () => {
    console.clear();
    console.log("---- Botón 5 - Objetos: en parámetro de función ----");

    /* Al definir una función puedo destructurar el objeto
       directamente en el parámetro — en vez de recibir el objeto completo
       y acceder a sus propiedades con punto dentro del cuerpo.

       Se utiliza constantemente en:
       React      → cada componente recibe sus props como un objeto
                    function ProductCard({ nombre, precio, activo }) { ... }
       Node/Express → los servicios reciben el body como un objeto
                    const crearProducto = ({ nombre, precio, categoria }) => { ... } */

    /* Sin destructuring en el parámetro — accedo con punto dentro del cuerpo */
    const mostrarProductoA = (producto) => {
      console.log(producto.nombre, "| $" + producto.precio, "| " + producto.categoria);
    };

    /* Con destructuring en el parámetro — más limpio y expresivo
       se ve exactamente qué propiedades necesita la función
       sin tener que leer el cuerpo para saberlo */
    const mostrarProductoB = ({ nombre, precio, categoria }) => {
      console.log(nombre, "| $" + precio, "| " + categoria);
    };

    /* Con valor por defecto en el parámetro
       si la propiedad no viene en el objeto, toma el valor por defecto */
    const crearProducto = ({ nombre, precio, categoria = "sin categoría" }) => {
      console.log(`Creando: ${nombre} | $${precio} | ${categoria}`);
    };

    mostrarProductoA(productos[0]);
    mostrarProductoB(productos[0]);

    /* categoria no viene en el objeto — toma el valor por defecto */
    crearProducto({ nombre: "Buzo", precio: 9500 });
  };

  idBoton6.onclick = () => {
    console.clear();
    console.log("---- Botón 6 - Objetos: anidado ----");

    /* Cuando un objeto tiene propiedades que son a su vez objetos,
       puedo destructurar varios niveles en una sola línea.
       sintaxis: { objetoAnidado: { propiedad } }

       Se utiliza constantemente al consumir respuestas de APIs REST
       que devuelven objetos complejos con datos anidados.
       En MongoDB es muy común porque los documentos pueden tener
       objetos embebidos dentro de otros objetos */

    const orden = {
      id: 101,
      cliente: {
        nombre: "María",
        email: "maria@mail.com"
      },
      producto: productos[1],
      total: 18000
    };

    /* Sin destructuring anidado — accedo con punto en cadena */
    const nombreCliente1 = orden.cliente.nombre;
    const emailCliente1  = orden.cliente.email;
    console.log("Tradicional:", nombreCliente1, emailCliente1);

    /* Con destructuring anidado — entro en cliente y extraigo sus propiedades
       IMPORTANTE: 'cliente' NO queda como variable disponible
       solo quedan las propiedades que extraje de adentro */
    const { id, cliente: { nombre: nombreCliente, email }, total } = orden;

    console.log("id:", id);
    console.log("cliente:", nombreCliente, email);
    console.log("total:", total);
  };

  idBoton7.onclick = () => {
    console.clear();
    console.log("---- Botón 7 - Arrays: extraer por posición ----");

    /* A diferencia del destructuring de objetos donde extraigo por NOMBRE,
       en los arrays extraigo por POSICIÓN.
       El nombre de la variable lo elijo yo — no depende del contenido.

       Se utiliza cuando una función devuelve múltiples valores
       empaquetados en un array — el caso más importante que vamos
       a ver en React es useState(), que devuelve exactamente un array
       de dos elementos: el valor actual y la función para modificarlo */

    /* Destructuring de array de valores simples */
    const precios = [2500, 18000, 35000, 12000, 800];

    const [primerPrecio, segundoPrecio] = precios;

    console.log("primerPrecio:", primerPrecio);
    console.log("segundoPrecio:", segundoPrecio);

    /* Destructuring de array de objetos — cada posición es un objeto completo
       si no indico nada antes de las llaves {}, toma la posición 0 — el primero */

    /* ETAPA 1 — primero extraigo el objeto de la posición 0 del array */
    const [primerProducto] = productos;
    console.log("primerProducto:", primerProducto);

    /* ETAPA 2 — luego destructuro las propiedades del objeto extraído */
    const { nombre, precio } = primerProducto;
    console.log("nombre:", nombre, "| precio:", precio);

    /* EN UN SOLO PASO — combino destructuring de array y de objeto en una línea
       [] extrae el primer elemento del array
       {} extrae nombre y precio de ese primer elemento */
    const [{ nombre: nom, precio: prec }] = productos;
    console.log("en un solo paso — nombre:", nom, "| precio:", prec);
  };

  idBoton8.onclick = () => {
    console.clear();
    console.log("---- Botón 8 - Arrays: saltear elementos con coma vacía ----");

    /* Cuando no me interesa un elemento en una posición determinada
       puedo saltearla usando una coma vacía.
       La coma vacía ocupa la posición pero no asigna variable.

       Se utiliza cuando una función devuelve un array y solo me
       interesan algunos de los elementos, no todos */

    /* Saltear elementos — valores simples */
    const precios = [2500, 18000, 35000, 12000, 800];

    /* salteo el primero */
    const [, segundoPrecio] = precios;
    console.log("segundoPrecio:", segundoPrecio);

    /* salteo los dos primeros */
    const [, , tercerPrecio] = precios;
    console.log("tercerPrecio:", tercerPrecio);

    /* Saltear elementos — array de objetos */

    /* salteo el primero y tomo el segundo */
    const [, segundoProducto] = productos;
    console.log("segundoProducto:", segundoProducto);

    /* salteo el primero y el segundo y tomo el tercero */
    const [, , tercerProducto] = productos;
    console.log("tercerProducto:", tercerProducto);

    /* salteo el primero y el tercero — tomo el segundo y el cuarto */
    const [, prodDos, , prodCuatro] = productos;
    console.log("prodDos:", prodDos.nombre, "| prodCuatro:", prodCuatro.nombre);
  };

  idBoton9.onclick = () => {
    console.clear();
    console.log("---- Botón 9 - Arrays: valor por defecto ----");

    /* Al igual que en el destructuring de objetos, puedo asignar
       un valor por defecto a una posición del array.
       sintaxis: const [a = valorPorDefecto] = array

       Se utiliza cuando no sabemos con certeza cuántos elementos
       va a devolver el array — si la posición no existe en el array
       la variable toma el valor por defecto que definimos
       en vez de recibir undefined */

    /* Valores simples — el array tiene 2 elementos, la posición 2 no existe */
    const precios = [2500, 18000];

    const [primerPrecio, segundoPrecio, tercerPrecio = 0] = precios;

    console.log("primerPrecio:", primerPrecio);
    console.log("segundoPrecio:", segundoPrecio);
    console.log("tercerPrecio:", tercerPrecio); /* 0 — no existía, tomó el valor por defecto */

    /* Array de objetos — el array tiene 2 productos, la posición 2 no existe */
    const misProductos = [productos[0], productos[1]];

    const productoVacio = { id: 0, nombre: "Sin producto", precio: 0, categoria: "sin categoría", stock: 0, activo: false };

    const [prod1, prod2, prod3 = productoVacio] = misProductos;

    console.log("prod1:", prod1.nombre);
    console.log("prod2:", prod2.nombre);
    console.log("prod3:", prod3.nombre); /* "Sin producto" — no existía, tomó el valor por defecto */
  };

  idBoton10.onclick = () => {
    console.clear();
    console.log("---- Botón 10 - Arrays: con map - patrón React y Node ----");

    /* Puedo usar destructuring directamente en el parámetro del callback de map
       Este patrón es clave en Node/Express para no exponer campos internos
       de la base de datos en la respuesta al cliente — por ejemplo
       nunca deberíamos devolver el password o el __v de MongoDB
       En React se usa para transformar los datos antes de renderizarlos */

    /* Sin destructuring en el callback — accedo con punto dentro del cuerpo */
    const resumen1 = productos.map((producto) => {
      return { nombre: producto.nombre, precio: producto.precio };
    });
    console.log("sin destructuring:", resumen1);

    /* Con destructuring en el parámetro del callback
       solo extraigo las propiedades que me interesan */
    const resumen2 = productos.map(({ nombre, precio }) => ({ nombre, precio }));
    console.log("con destructuring:", resumen2);
  };


  // ============================================================
  //  SPREAD OPERATOR
  // ============================================================

  idBoton11.onclick = () => {
    console.clear();
    console.log("---- Botón 11 - Spread operator - el contexto define el comportamiento ----");

    /* Así como vimos que [] a la izquierda del = es destructuring
       y [] a la derecha del = es crear un array,
       el operador ... (tres puntos) también cambia su comportamiento
       según el contexto donde aparezca.

       ... a la DERECHA del = o en una INVOCACIÓN → SPREAD
           expande los elementos de un array u objeto

       ... a la IZQUIERDA del = o en los PARÁMETROS → REST
           agrupa elementos en un array

       En este botón vemos SPREAD — lo reconocemos porque
       los ... aparecen a la derecha del = o al invocar una función */

    /* SPREAD en array — expande los elementos de productos */
    const copiaProductos = [...productos];

    console.log("productos === copiaProductos:", productos === copiaProductos); /* false — arrays distintos */
    console.log("copiaProductos:", copiaProductos.map(producto => producto.nombre));

    /* SPREAD en objeto — expande las propiedades de un objeto */
    const producto     = productos[0];
    const copiaProducto = { ...producto };

    console.log("producto === copiaProducto:", producto === copiaProducto); /* false — objetos distintos */
    console.log("copiaProducto:", copiaProducto);
  };

  idBoton12.onclick = () => {
    console.clear();
    console.log("---- Botón 12 - Arrays: copiar array - valor vs referencia ----");

    /* En JavaScript cuando asigno un array a otra variable
       NO estoy copiando el array — estoy copiando la REFERENCIA
       ambas variables apuntan al MISMO array en memoria.
       Con spread creo un array NUEVO e independiente.

       Este concepto es fundamental para entender por qué
       en React nunca se muta el estado directamente */

    /* Sin spread — copia por REFERENCIA */
    const original = [productos[0], productos[1], productos[2]];
    const copiaSinSpread = original;

    console.log("original === copiaSinSpread:", original === copiaSinSpread); /* true — mismo array */

    /* Si agrego un elemento a la copia, también se agrega al original
       porque son el mismo array en memoria */
    copiaSinSpread.push(productos[3]);

    console.log("original.length:", original.length);             /* 4 — también cambió */
    console.log("copiaSinSpread.length:", copiaSinSpread.length); /* 4 */

    /* Con spread — copia por VALOR, array nuevo e independiente */
    const copiaConSpread = [...original];

    console.log("original === copiaConSpread:", original === copiaConSpread); /* false — arrays distintos */

    copiaConSpread.push(productos[4]);

    console.log("original.length:", original.length);             /* 4 — no cambió */
    console.log("copiaConSpread.length:", copiaConSpread.length); /* 5 */
  };

  idBoton13.onclick = () => {
    console.clear();
    console.log("---- Botón 13 - Arrays: shallow copy - array de objetos ----");

    /* Spread hace una copia SHALLOW (superficial) del array:
       — el array ES nuevo, tiene una referencia independiente
       — pero los objetos adentro NO son nuevos, siguen siendo
         referencias a los mismos objetos del array original
         Si modifico una propiedad de un objeto del array copiado
         también se modifica en el array original

       Esto se llama SHALLOW COPY — copia superficial */

    const arr = [
      { id: 1, nombre: "Remera",     precio: 2500  },
      { id: 2, nombre: "Zapatillas", precio: 18000 },
      { id: 3, nombre: "Campera",    precio: 35000 },
    ];

    /* COPIA INDEPENDIENTE DEL VECTOR — pero los objetos son referencias */
    const copiaShallow = [...arr];

    console.log("arr === copiaShallow:", arr === copiaShallow); /* false — arrays distintos */

    copiaShallow[0].precio = 9999; /* modifico el objeto del array copiado */

    console.log("arr[0].precio (original):", arr[0].precio);         /* 9999 — también cambió */
    console.log("copiaShallow[0].precio:  ", copiaShallow[0].precio); /* 9999 */

    /* Restablecer */
    arr[0].precio = 2500;

    /* COPIA INDEPENDIENTE DEL VECTOR — con COPIA INDEPENDIENTE DE LOS OBJETOS
       Con map recorro el array y con spread dentro creo un objeto nuevo
       por cada elemento — así consigo doble independencia:
       el array es nuevo Y cada objeto adentro también es nuevo */

    const copiaProfunda = arr.map(producto => ({ ...producto }));

    console.log("arr === copiaProfunda:", arr === copiaProfunda); /* false — arrays distintos */

    copiaProfunda[0].precio = 9999;

    console.log("arr[0].precio (original):", arr[0].precio);            /* 2500 — intacto */
    console.log("copiaProfunda[0].precio: ", copiaProfunda[0].precio);  /* 9999 */
  };

  idBoton14.onclick = () => {
    console.clear();
    console.log("---- Botón 14 - Arrays: array híbrido - consecuencias en memoria ----");

    /* Cuando copio un array con spread y luego le agrego objetos nuevos
       el array resultante es HÍBRIDO:
       — los objetos que VINIERON del array original → son referencias
         si los modifico se modifican en ambos arrays
       — los objetos NUEVOS que agregué → son propios del array nuevo
         si los modifico no afectan al array original

       Este comportamiento es una consecuencia directa de cómo
       JavaScript maneja la memoria — los objetos nunca se copian
       al asignarlos, siempre se copia la referencia a donde viven
       en memoria. Por eso existen métodos como map con spread,
       filter y structuredClone — son soluciones a este problema concreto
       Un alumno que entiende esto no memoriza los métodos — los comprende */

    const productosOriginal = [
      { id: 1, nombre: "Remera",     precio: 2500  },
      { id: 2, nombre: "Zapatillas", precio: 18000 },
    ];

    const productosNuevo = [...productosOriginal];

    console.log("ANTES de cualquier modificación:");
    console.log("productosOriginal:", JSON.stringify(productosOriginal));
    console.log("productosNuevo:   ", JSON.stringify(productosNuevo));

    /* Modifico un objeto que VINO del array original — es una referencia
       se modifica en AMBOS arrays */
    productosNuevo[1].precio = 99999;

    /* Agrego un objeto NUEVO y PROPIO de productosNuevo
       no existe en productosOriginal — no lo afecta para nada */
    productosNuevo.push({ id: 3, nombre: "Campera", precio: 35000 });

    console.log("");
    console.log("DESPUÉS:");
    console.log("productosOriginal:", JSON.stringify(productosOriginal));
    /* productosOriginal tiene 2 elementos PERO el precio de Zapatillas cambió
       porque ese objeto es una referencia compartida entre ambos arrays */

    console.log("productosNuevo:   ", JSON.stringify(productosNuevo));
    /* productosNuevo tiene 3 elementos:
       — índice 0 y 1 → referencias a productosOriginal
       — índice 2 → objeto propio de productosNuevo, no existe en productosOriginal */

    console.log("");
    console.log("productosOriginal.length:", productosOriginal.length); /* 2 — no cambió */
    console.log("productosNuevo.length:   ", productosNuevo.length);    /* 3 */
  };

  idBoton15.onclick = () => {
    console.clear();
    console.log("---- Botón 15 - Arrays: combinar arrays de objetos ----");

    /* Spread permite combinar dos o más arrays en uno nuevo
       sin modificar los arrays originales.

       Se utiliza constantemente en:
       Node/Express → cuando hacés múltiples consultas a MongoDB
                      y necesitás unir los resultados en una sola respuesta
       React        → cuando tenés datos de distintas fuentes y necesitás
                      mostrarlos en una sola lista */

    const productosRopa       = productos.filter(producto => producto.categoria === "ropa");
    const productosCalzado    = productos.filter(producto => producto.categoria === "calzado");
    const productosAccesorios = productos.filter(producto => producto.categoria === "accesorios");

    console.log("productosRopa:");
    productosRopa.forEach(producto => console.log(" -", producto.nombre));

    console.log("productosCalzado:");
    productosCalzado.forEach(producto => console.log(" -", producto.nombre));

    console.log("productosAccesorios:");
    productosAccesorios.forEach(producto => console.log(" -", producto.nombre));

    /* Combino dos arrays */
    const ropaYCalzado = [...productosRopa, ...productosCalzado];
    console.log("ropaYCalzado:");
    ropaYCalzado.forEach(producto => console.log(" -", producto.nombre));

    /* Combino tres arrays */
    const todosLosProductos = [...productosRopa, ...productosCalzado, ...productosAccesorios];
    console.log("todosLosProductos:");
    todosLosProductos.forEach(producto => console.log(" -", producto.nombre));

    console.log("productosRopa.length:", productosRopa.length);           /* intacto */
    console.log("productosCalzado.length:", productosCalzado.length);     /* intacto */
    console.log("productosAccesorios.length:", productosAccesorios.length); /* intacto */
  };

  idBoton16.onclick = () => {
    console.clear();
    console.log("---- Botón 16 - Arrays: agregar objeto al array sin mutar el original - patrón React ----");

    /* En React el estado es INMUTABLE — nunca se modifica directamente
       Si tenemos un array en el estado y queremos agregar un elemento
       no podemos usar push() porque muta el array original
       y React no detectaría el cambio — el componente no se actualizaría.

       La forma correcta es crear un array NUEVO con spread
       que contenga todos los elementos anteriores más el nuevo.

       Este es uno de los patrones más usados en React:
       setProductos([...productos, nuevoProducto]) */

    const arr = [
      { id: 1, nombre: "Remera",     precio: 2500  },
      { id: 2, nombre: "Zapatillas", precio: 18000 },
    ];

    const nuevoProducto = { id: 3, nombre: "Campera", precio: 35000 };

    /* Forma INCORRECTA en React — push muta el array original
       React no detecta el cambio y no re-renderiza el componente */
    /* arr.push(nuevoProducto); — NUNCA en React */

    /* Forma CORRECTA — creo un array nuevo con todos los elementos
       anteriores más el nuevo al final */
    const arrConNuevoAlFinal     = [...arr, nuevoProducto];
    const arrConNuevoAlPrincipio = [nuevoProducto, ...arr];

    console.log("original length:", arr.length); /* 2 — no cambió */
    console.log("al final:");
    arrConNuevoAlFinal.forEach(producto => console.log(" -", producto.nombre));
    console.log("al principio:");
    arrConNuevoAlPrincipio.forEach(producto => console.log(" -", producto.nombre));
  };

  idBoton17.onclick = () => {
    console.clear();
    console.log("---- Botón 17 - Objetos: copiar un objeto ----");

    /* Al igual que con los arrays, cuando asigno un objeto a otra variable
       NO estoy copiando el objeto — estoy copiando la REFERENCIA
       ambas variables apuntan al MISMO objeto en memoria.
       Con spread creo un objeto NUEVO e independiente.

       Se utiliza constantemente en React y Node/Express cuando
       necesitamos trabajar con una copia del objeto sin modificar el original */

    const producto = productos[0];

    /* Sin spread — copia por REFERENCIA */
    const copiaSinSpread = producto;

    console.log("producto === copiaSinSpread:", producto === copiaSinSpread); /* true — mismo objeto */

    copiaSinSpread.precio = 9999;

    console.log("producto.precio (original):", producto.precio);        /* 9999 — también cambió */
    console.log("copiaSinSpread.precio:     ", copiaSinSpread.precio);  /* 9999 */

    /* Restablecer */
    producto.precio = 2500;

    /* Con spread — copia por VALOR, objeto nuevo e independiente
       las propiedades primitivas (string, number, boolean) son copias reales */
    const copiaConSpread = { ...producto };

    console.log("producto === copiaConSpread:", producto === copiaConSpread); /* false — objetos distintos */

    copiaConSpread.precio = 9999;

    console.log("producto.precio (original):", producto.precio);         /* 2500 — intacto */
    console.log("copiaConSpread.precio:     ", copiaConSpread.precio);   /* 9999 */
  };

  idBoton18.onclick = () => {
    console.clear();
    console.log("---- Botón 18 - Objetos: combinar objetos - el orden importa ----");

    /* Con spread puedo combinar dos o más objetos en uno nuevo.
       Si hay propiedades duplicadas gana la ÚLTIMA — el orden
       en que se escriben los spreads define quién pisa a quién.

       Se utiliza en Node/Express cuando queremos actualizar
       un documento de MongoDB con los datos que llegan del cliente
       y en React cuando actualizamos el estado de un objeto */

    const productoOriginal = { id: 1, nombre: "Remera", precio: 2500, activo: true };
    const cambios          = { precio: 9999, activo: false };

    /* productoOriginal primero, cambios después
       las propiedades de cambios PISAN a las de productoOriginal */
    const resultado1 = { ...productoOriginal, ...cambios };
    console.log("...productoOriginal, ...cambios:", resultado1);
    /* precio: 9999, activo: false — ganaron los de cambios */

    /* cambios primero, productoOriginal después
       las propiedades de productoOriginal PISAN a las de cambios */
    const resultado2 = { ...cambios, ...productoOriginal };
    console.log("...cambios, ...productoOriginal:", resultado2);
    /* precio: 2500, activo: true — ganaron los de productoOriginal */

    console.log("productoOriginal:", productoOriginal); /* intacto en ambos casos */
  };

  idBoton19.onclick = () => {
    console.clear();
    console.log("---- Botón 19 - Objetos: agregar propiedades sin mutar el original - patrón Node/Express ----");

    /* Cuando llega el body de un POST en Node/Express
       el cliente manda solo los datos del formulario.
       El servidor tiene que agregar campos adicionales
       antes de guardar el documento en MongoDB.

       Con spread copio todo lo que vino del cliente
       y agrego los campos del servidor en el mismo objeto nuevo
       sin modificar el body original.

       Este es uno de los patrones más usados en Node/Express:
       const productoNuevo = { ...req.body, activo: true, creadoEn: new Date() }
       await Producto.create(productoNuevo) */

    /* Simulamos el body que llega del cliente en un POST /productos */
    const body = { nombre: "Campera nueva", precio: 40000, categoria: "ropa" };

    const productoParaGuardar = {
      ...body,              /* copio todo lo que vino del cliente */
      id: Date.now(),       /* genero un id */
      activo: true,         /* campo por defecto */
      stock: 0,             /* campo por defecto */
      creadoEn: new Date()  /* timestamp */
    };

    console.log("body original:", body);
    console.log("productoParaGuardar:", productoParaGuardar);
    console.log("body === productoParaGuardar:", body === productoParaGuardar); /* false */
  };

  idBoton20.onclick = () => {
    console.clear();
    console.log("---- Botón 20 - Objetos: modificar una propiedad sin mutar el original - patrón React ----");

    /* En React el estado es INMUTABLE — nunca se modifica directamente.
       Cuando necesitamos modificar una propiedad de un objeto
       que está dentro del array de estado, tenemos que crear
       un objeto NUEVO con spread y pisar la propiedad que queremos cambiar.

       El patrón es:
       { ...objeto, propiedadAModificar: nuevoValor }

       spread copia todas las propiedades del objeto original
       y luego la propiedad que escribimos después PISA a la copiada
       — recordar que en la combinación de objetos gana la ÚLTIMA —

       En React esto se usa dentro de un map para recorrer el array
       de estado y modificar solo el objeto que nos interesa:
       setProductos(productos.map(producto =>
           producto.id === idAModificar
               ? { ...producto, precio: nuevoPrecio }
               : producto
       )) */

    const arr = [
      { id: 1, nombre: "Remera",     precio: 2500  },
      { id: 2, nombre: "Zapatillas", precio: 18000 },
      { id: 3, nombre: "Campera",    precio: 35000 },
    ];

    const idAModificar = 2;
    const nuevoPrecio  = 20000;

    /* map recorre el array — cuando encuentra el id
       crea un objeto NUEVO con spread y pisa el precio
       el resto de los objetos los devuelve tal cual */
    const arrActualizado = arr.map(producto =>
      producto.id === idAModificar
        ? { ...producto, precio: nuevoPrecio } /* objeto nuevo con precio actualizado */
        : producto                             /* mismo objeto, no lo toco */
    );

    console.log("original arr[1].precio:", arr[1].precio);            /* 18000 — intacto */
    console.log("actualizado[1].precio: ", arrActualizado[1].precio); /* 20000 */
    console.log("arr === arrActualizado:", arr === arrActualizado);    /* false — arrays distintos */
  };

  idBoton21.onclick = () => {
    console.clear();
    console.log("---- Botón 21 - Objetos: eliminar un objeto del array sin mutar el original - patrón React ----");

    /* En React cuando necesitamos eliminar un elemento del array de estado
       no podemos usar splice() porque muta el array original
       y React no detectaría el cambio — el componente no se actualizaría.

       La forma correcta es usar filter() que devuelve un array NUEVO
       excluyendo el elemento que queremos eliminar.

       En React esto sería:
       setProductos(productos.filter(producto => producto.id !== idAEliminar)) */

    const arr = [
      { id: 1, nombre: "Remera",     precio: 2500  },
      { id: 2, nombre: "Zapatillas", precio: 18000 },
      { id: 3, nombre: "Campera",    precio: 35000 },
    ];

    const idAEliminar = 2;

    /* Forma INCORRECTA en React — splice muta el array original */
    /* arr.splice(1, 1); — NUNCA en React */

    /* Forma CORRECTA — filter devuelve un array NUEVO
       sin el elemento que queremos eliminar */
    const arrSinProducto = arr.filter(producto => producto.id !== idAEliminar);

    console.log("original length:", arr.length);                  /* 3 — intacto */
    console.log("arrSinProducto.length:", arrSinProducto.length); /* 2 */
    console.log("quedaron:");
    arrSinProducto.forEach(producto => console.log(" -", producto.nombre));
    console.log("arr === arrSinProducto:", arr === arrSinProducto); /* false */
  };

  idBoton22.onclick = () => {
    console.clear();
    console.log("---- Botón 22 - Objetos: shallow copy - objeto anidado ----");

    /* Spread solo copia UN nivel de profundidad.
       Si el objeto tiene propiedades que son a su vez objetos,
       esas propiedades siguen siendo referencias al original.

       Para una copia profunda → structuredClone() */

    const producto = {
      id: 1,
      nombre: "Remera",
      medidas: { talle: "M", largo: 70 } /* objeto anidado */
    };

    /* SHALLOW COPY — spread copia un nivel */
    const copiaShallow = { ...producto };

    copiaShallow.medidas.talle = "XL"; /* modifico el objeto anidado de la copia */

    console.log("original medidas.talle:", producto.medidas.talle);      /* XL — también cambió */
    console.log("copiaShallow medidas.talle:", copiaShallow.medidas.talle); /* XL */

    /* DEEP COPY — structuredClone copia todos los niveles */
    const copiaDeep = structuredClone(producto);
    copiaDeep.medidas.talle = "S";

    console.log("original medidas.talle:", producto.medidas.talle);   /* XL — intacto */
    console.log("copiaDeep medidas.talle:", copiaDeep.medidas.talle); /* S */
  };


  // ============================================================
  //  REST OPERATOR
  // ============================================================

  idBoton23.onclick = () => {
    console.clear();
    console.log("---- Botón 23 - Rest operator - el contexto define el comportamiento ----");

    /* Así como spread expande, rest hace lo OPUESTO — agrupa.
       El mismo símbolo ... pero a la IZQUIERDA del = o en los PARÁMETROS
       de una función agrupa el resto de elementos en un array.

       ... a la DERECHA del = o en una INVOCACIÓN → SPREAD — expande
       ... a la IZQUIERDA del = o en los PARÁMETROS → REST — agrupa

       Se utiliza cuando quiero quedarme con ALGUNOS elementos
       y agrupar el RESTO en una sola variable sin tener que
       recorrer el array o el objeto manualmente.

       Los casos más importantes y reales son:
       — En destructuring de arrays: separar el primer elemento del resto
         muy usado en React cuando el primer elemento de una lista
         es el destacado y el resto se muestra en una grilla
       — En destructuring de objetos: extraer algunas propiedades
         y agrupar el resto — el caso MÁS usado en Node/Express
         es excluir el password de un usuario antes de responder al cliente
         const { password, ...usuarioSeguro } = usuarioDB
         res.json(usuarioSeguro) — password nunca llega al cliente
       — En parámetros de función: cuando no sabemos cuántos argumentos
         va a recibir la función — lo vemos en el próximo botón */

    /* REST en destructuring de array
       me quedo con el primero y agrupo el resto */
    const [primerProducto, ...productosRestantes] = productos;

    console.log("primerProducto:", primerProducto.nombre);
    productosRestantes.forEach(producto => console.log("productoRestante:", producto.nombre));

    /* REST en destructuring de objeto
       me quedo con nombre y precio y agrupo el resto de propiedades */
    const { nombre, precio, ...restPropiedades } = productos[0];

    console.log("nombre:", nombre);
    console.log("precio:", precio);
    console.log("restPropiedades:", restPropiedades);
  };

  idBoton24.onclick = () => {
    console.clear();
    console.log("---- Botón 24 - Arrays: tomar algunos y agrupar el resto ----");

    /* Rest en destructuring de arrays permite tomar los primeros elementos
       y agrupar el resto en un nuevo array en una sola línea.

       Se utiliza en React cuando el primer elemento de una lista
       es el producto destacado y el resto se muestra en una grilla
       o cuando necesito separar la cabecera de una lista del resto
       sin tener que usar slice o filter.

       IMPORTANTE: rest siempre tiene que ir al final
       const [...primeros, ultimo] = productos → SyntaxError */

    /* Tomo el primero y agrupo el resto */
    const [productoDestacado, ...productosRestantes] = productos;

    console.log("productoDestacado:", productoDestacado.nombre);
    productosRestantes.forEach(producto => console.log("productoRestante:", producto.nombre));

    /* Tomo los dos primeros y agrupo el resto */
    const [productoDestacado1, productoDestacado2, ...productosRestantes2] = productos;

    console.log("productoDestacado1:", productoDestacado1.nombre);
    console.log("productoDestacado2:", productoDestacado2.nombre);
    productosRestantes2.forEach(producto => console.log("productoRestante:", producto.nombre));
  };

  idBoton25.onclick = () => {
    console.clear();
    console.log("---- Botón 25 - Objetos: excluir password - patrón Node/Express ----");

    /* Rest en destructuring de objetos permite extraer las propiedades
       que me interesan y agrupar el RESTO en un nuevo objeto.

       El caso más importante y real en Node/Express es cuando
       traemos un usuario de MongoDB — el documento viene completo
       con todos sus campos incluyendo el password.
       Nunca debemos enviar el password en la respuesta al cliente.

       Con rest lo excluimos en una sola línea:
       const { password, ...usuarioSeguro } = usuarioDB
       res.json(usuarioSeguro) — el password nunca llega al cliente

       Este patrón se repite en CADA endpoint que devuelve usuarios */

    /* Simulamos un usuario que viene completo de MongoDB */
    const usuarioDB = usuarios[0];

    console.log("usuarioDB completo:", usuarioDB);

    /* Excluyo el password con rest
       lo que sobra es seguro para mandar al cliente */
    const { password, ...usuarioSeguro } = usuarioDB;

    console.log("usuarioSeguro:", usuarioSeguro);
    console.log("password:", password); /* existe pero nunca lo mandamos al cliente */
  };

  idBoton26.onclick = () => {
    console.clear();
    console.log("---- Botón 26 - Parámetros de función: cantidad variable de argumentos ----");

    /* Rest en parámetros de función permite que la función acepte
       cualquier cantidad de argumentos sin saber de antemano cuántos son.
       Los agrupa todos en un array dentro de la función.

       Se utiliza cuando no sabemos cuántos valores va a recibir la función
       el caso más claro es calcular el promedio de notas de un alumno
       — un alumno puede tener 3 notas, otro 5, otro 2 —
       no podemos fijar la cantidad de parámetros.

       IMPORTANTE: rest en parámetros siempre tiene que ir al final
       const fn = (rest..., parametroFijo) => {} → SyntaxError */

    /* Sin rest — cantidad FIJA de parámetros
       si recibe más argumentos los ignora
       si recibe menos devuelve NaN */
    const promedioFijo = (nota1, nota2, nota3) => {
      return (nota1 + nota2 + nota3) / 3;
    };

    console.log("con 3 notas:", promedioFijo(8, 6, 9));        /* 7.67 — funciona */
    console.log("con 5 notas:", promedioFijo(8, 6, 9, 7, 10)); /* 7.67 — ignora las extras */
    console.log("con 2 notas:", promedioFijo(8, 6));           /* NaN  — nota3 es undefined */

    /* Con rest — cantidad VARIABLE de parámetros
       adentro, notas ya es un array
       puedo usar todos los métodos que ya conozco */
    const promedioVariable = (...notas) => {
      const suma     = notas.reduce((acumulador, nota) => acumulador + nota, 0);
      const promedio = suma / notas.length;
      return parseFloat(promedio.toFixed(2));
    };

    console.log("con 3 notas:", promedioVariable(8, 6, 9));        /* 7.67 */
    console.log("con 5 notas:", promedioVariable(8, 6, 9, 7, 10)); /* 8.00 */
    console.log("con 2 notas:", promedioVariable(8, 6));           /* 7.00 */
    console.log("con 1 nota: ", promedioVariable(10));             /* 10.00 */

    /* Parámetro fijo + rest
       el primer parámetro es fijo — los demás se agrupan con rest */
    const promedioAlumno = (nombreAlumno, ...notas) => {
      const suma     = notas.reduce((acumulador, nota) => acumulador + nota, 0);
      const promedio = (suma / notas.length).toFixed(2);
      console.log(`${nombreAlumno} — notas: [${notas}] — promedio: ${promedio}`);
    };

    promedioAlumno("Juan",  8, 6, 9, 7);
    promedioAlumno("María", 10, 9, 10, 8, 9);
    promedioAlumno("Pedro", 4, 3, 6);
  };

}; // fin window.onload

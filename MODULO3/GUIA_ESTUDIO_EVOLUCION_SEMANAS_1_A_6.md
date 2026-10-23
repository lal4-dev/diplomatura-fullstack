# GUÍA DEFINITIVA DE ESTUDIO: EVOLUCIÓN DE ARQUITECTURA Y BACKEND (SEMANAS 1 A 8)
**Módulo 3: Desarrollo Back-End con Node.js y Express**

Esta guía está diseñada para preparar de forma integral la evaluación conceptual y técnica de la materia. Más que memorizar sintaxis, este documento explica el **por qué**, el **para qué**, los **fundamentos de diseño**, los **flujos de datos** y el **impacto arquitectónico** de cada decisión tomada desde la Semana 1 hasta la Semana 8 (Unidad 8).

---

## ÍNDICE GENERAL
1. [Visión General y el Sentido de la Evolución](#1-visión-general-y-el-sentido-de-la-evolución)
2. [Semana 1: Node.js, Runtime, Event Loop y Script Monolítico](#2-semana-1-nodejs-runtime-event-loop-y-script-monolítico)
3. [Semana 2: Modularización CommonJS, Asincronía Moderna y NPM](#3-semana-2-modularización-commonjs-asincronía-moderna-y-npm)
4. [Semana 3: Paradigma Servidor, Protocolo HTTP y Express (APIs REST/JSON)](#4-semana-3-paradigma-servidor-protocolo-http-y-express-apis-restjson)
5. [Semana 4: Server-Side Rendering (EJS), Formularios y Patrón PRG](#5-semana-4-server-side-rendering-ejs-formularios-y-patrón-prg)
6. [Semana 5: Pipeline de Middlewares, Trazabilidad y Enrutador Modular](#6-semana-5-pipeline-de-middlewares-trazabilidad-y-enrutador-modular)
7. [Semana 6: Arquitectura en Capas, Inyección de Dependencias y Buenas Prácticas](#7-semana-6-arquitectura-en-capas-inyección-de-dependencias-y-buenas-prácticas)
8. [Unidad 7: Persistencia Real con Bases de Datos NoSQL (MongoDB, Atlas y Mongoose)](#8-unidad-7-persistencia-real-con-bases-de-datos-nosql-mongodb-atlas-y-mongoose)
9. [Unidad 8: Conexión Integral de Express con MongoDB (Sitio Web SSR y API RESTful Asíncronos)](#9-unidad-8-conexión-integral-de-express-con-mongodb-sitio-web-ssr-y-api-restful-asíncronos)
10. [Matriz Comparativa de Evolución Semana a Semana (Semanas 1 a 8)](#10-matriz-comparativa-de-evolución-semana-a-semana-semanas-1-a-8)
11. [Flujos Integrales Paso a Paso (Semana 6 vs Unidad 7 vs Unidad 8)](#11-flujos-integrales-paso-a-paso-semana-6-vs-unidad-7-vs-unidad-8)
12. [Preguntas Frecuentes, Ticket de Salida y Conceptos Clave de Evaluación](#12-preguntas-frecuentes-ticket-de-salida-y-conceptos-clave-de-evaluación)
13. [Guía de Implementación para el TP 07 (Reservas de Salas de Estudio)](#13-guía-de-implementación-para-el-tp-07-reservas-de-salas-de-estudio)
14. [Guía de Implementación para el TP 08 (Reservas de Salas con Persistencia Integral en MongoDB)](#14-guía-de-implementación-para-el-tp-08-reservas-de-salas-con-persistencia-integral-en-mongodb)

---

## 1. VISIÓN GENERAL Y EL SENTIDO DE LA EVOLUCIÓN

A lo largo de las 8 semanas, el código no cambió por capricho ni por usar herramientas de moda. Cada cambio respondió a una **fuerza impulsora**: un problema concreto que surgía a medida que aumentaba la complejidad del software.

```
[Semana 1] Script Único / Monolito en disco
   │  Problema: Mezcla de I/O, formato y datos. Código no reutilizable ni testeable.
   ▼
[Semana 2] Módulos CommonJS + Promesas + NPM
   │  Problema: Es un programa batch / CLI. Corre, genera un archivo y muere. No atiende usuarios web.
   ▼
[Semana 3] Servidor HTTP persistente + Express + API JSON
   │  Problema: Solo devuelve datos crudos JSON. Inusable para usuarios en navegador web.
   ▼
[Semana 4] Server-Side Rendering (EJS) + Formularios + Estáticos
   │  Problema: Todo el servidor colapsa en un único archivo de cientos de líneas. Handlers sobrecargados.
   ▼
[Semana 5] Pipeline de Middlewares + Enrutadores (Router)
   │  Problema: Funciones separadas pero acopladas en un solo archivo físico. Falta arquitectura en capas.
   ▼
[Semana 6] Arquitectura en Capas + Inyección de Dependencias + Configuración de Entorno
   │  Problema: Datos en memoria RAM (array volátil). Al reiniciar Node.js mueren todos los cambios (POSTs).
   ▼
[Semana 7 / Unidad 7] Persistencia Externa con MongoDB Atlas + Mongoose ODM + Laboratorio de Scripts
   │  Problema: La persistencia funciona solo en scripts aislados; el servidor web Express sigue con arreglo en RAM.
   ▼
[Semana 8 / Unidad 8] Conexión Integral Express + MongoDB (Web SSR y API RESTful Asíncronos)
      Resultado: Express y MongoDB conectados en una única instancia con pool de conexiones. Vistas EJS y API RESTful (`201` + `Location`) consumen el mismo servicio asíncrono con `.lean()` y graceful shutdown (`SIGINT`/`SIGTERM`).
```

---

## 2. SEMANA 1: NODE.JS, RUNTIME, EVENT LOOP Y SCRIPT MONOLÍTICO

### 2.1. ¿Qué es Node.js y por qué funciona así?
Node.js no es un lenguaje ni un framework; es un **entorno de ejecución (runtime)** para JavaScript construido sobre el motor **V8 de Google** y la biblioteca **libuv**.
- **Hilo único (Single Threaded):** El código JavaScript se ejecuta en un único hilo principal (Call Stack).
- **Entrada/Salida No Bloqueante (Non-blocking I/O):** Las operaciones lentas (leer disco, consultar red, esperar temporizadores) no detienen la ejecución del hilo principal; son delegadas al sistema operativo o al pool de hilos de `libuv`.
- **Event Loop:** El mecanismo que monitorea constantemente el Call Stack y la cola de tareas (Callback Queue). Cuando la pila se vacía, toma los callbacks listos y los empuja a ejecución.

### 2.2. Operaciones Bloqueantes vs No Bloqueantes
- **Bloqueante (`fs.readFileSync`):** Congela el hilo principal hasta que el disco termina de leer los bytes. Si la lectura demora 2 segundos, el programa entero queda paralizado. En un servidor web, esto significaría que ningún otro usuario podría conectarse mientras tanto.
- **No Bloqueante con Callbacks (`fs.readFile`):** Registra la intención de lectura en el sistema y continúa inmediatamente ejecutando las siguientes líneas. Cuando el sistema operativo termina de leer el archivo, encola una función (el *callback*) con la firma `(error, contenido) => { ... }`.

### 2.3. El Proyecto de Semana 1 (`ejemplo-pelicula`)
El proyecto consistía en un único archivo (`index.js`):
```javascript
const fs = require("node:fs");
const path = require("node:path");

const pelicula = { titulo: "Horizonte Infinito", anio: 2024, ... };
const ficha = `FICHA DE PELICULA:\nTitulo: ${pelicula.titulo}...`;
const carpetaSalida = path.join(__dirname, "salida");
const rutaArchivo = path.join(carpetaSalida, "ficha-pelicula.txt");

fs.mkdirSync(carpetaSalida, { recursive: true });
fs.writeFileSync(rutaArchivo, ficha, "utf8");
```

### 2.4. ¿Por qué se hacía así y qué problemas tenía?
- **Propósito:** Entender la sintaxis básica de Node.js, manipulación de rutas con `path.join(__dirname, ...)` y el sistema de archivos (`fs`).
- **Problemas graves:**
  1. **Acoplamiento total:** Los datos (el objeto `pelicula`), la lógica de formateo (los templates literales) y el acceso al disco (`writeFileSync`) convivían en el mismo archivo.
  2. **Imposible de probar:** No se puede probar si el formato de la ficha es correcto sin crear físicamente un archivo en el disco.
  3. **Uso de métodos síncronos:** `writeFileSync` y `mkdirSync` bloquean el hilo.

---

## 3. SEMANA 2: MODULARIZACIÓN COMMONJS, ASINCRONÍA MODERNA Y NPM

### 3.1. Principio de Responsabilidad Única (SRP) y Módulos CommonJS
Para resolver el desorden de la Semana 1, se aplica el principio de que **cada archivo debe tener una única responsabilidad clara**.

Node.js utiliza el sistema de módulos **CommonJS**:
- `module.exports`: Define qué objetos o funciones expone un archivo al exterior.
- `require("./archivo.js")`: Importa las funciones expuestas por otro módulo.
- **Tipos de require:**
  - `require("node:fs/promises")` -> Módulo nativo del sistema Node.js (prefijo `node:`).
  - `require("picocolors")` -> Paquete de terceros instalado en `node_modules`.
  - `require("./archivo.js")` -> Archivo propio del proyecto (siempre con `./` o `../`).

### 3.2. Estructura de Módulos de Semana 2 (`agenda-cultural`)
1. **`src/archivo.js` (Entrada/Salida Pura):**
   - Solo sabe leer texto/JSON y escribir en disco con la API no bloqueante moderna (`node:fs/promises`).
   - Desconoce totalmente las reglas de negocio (no sabe qué es una "actividad" o una "película").
2. **`src/informe.js` (Lógica de Formateo / Dominio):**
   - Recibe datos en memoria y retorna un string formateado.
   - Es una **función pura**: no toca el disco ni hace I/O. Se puede probar de forma inmediata sin dependencias externas.
3. **`src/index.js` (Coordinador / Orquestador):**
   - Contiene la función `async function main()`.
   - Lee los datos usando `archivo.js`, se los pasa a `informe.js`, y el resultado lo vuelve a guardar con `archivo.js`.

### 3.3. Evolución de la Asincronía: De Callbacks a `async / await`
- **El problema de los callbacks:** Si anidamos múltiples operaciones asíncronas con callbacks, caemos en el *Callback Hell* (código en pirámide, difícil manejo de errores).
- **Promesas (`Promise`):** Un objeto que representa un valor que estará disponible en el futuro (estados: *pending*, *fulfilled*, *rejected*).
- **`async / await`:** Azúcar sintáctico sobre promesas que permite escribir código asíncrono no bloqueante con la legibilidad secuencial del código síncrono.
  - Toda función declarada con `async` siempre devuelve una Promesa.
  - `await` pausa la ejecución dentro de esa función hasta que la promesa se resuelva, sin congelar el hilo principal de Node.js.

### 3.4. Manejo de Errores con `try / catch`
En operaciones asíncronas con `await`, los rechazos se capturan de forma natural mediante bloques `try / catch`:
```javascript
try {
  const datos = await leerJson(rutaDatos);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1; // Señala al sistema operativo que el programa falló sin abortar brutalmente
}
```

### 3.5. NPM y Reproducibilidad del Proyecto
- `package.json`: Archivo de configuración que declara el nombre, versión, scripts y dependencias requeridas.
- `package-lock.json`: Registra el árbol de resolución exacto de versiones descargadas. Garantiza que en la máquina del profesor o en un servidor de producción se instale exactamente la misma versión.
- `node_modules/`: Carpeta física de descargas (NUNCA se sube a Git, se ignora en `.gitignore`).
- **Dependencias:**
  - `dependencies`: Paquetes requeridos para que la aplicación funcione en producción (`picocolors`, `express`).
  - `devDependencies`: Herramientas exclusivas para el desarrollador en su entorno de trabajo (`eslint`, `prettier`).

### 3.6. ¿Qué ganamos y cuál es el límite de la Semana 2?
- **Ganamos:** Modularidad, código limpio, manejo estructurado de errores y scripts reproducibles con `npm start`.
- **Límite:** El programa es un script de ejecución por lotes (CLI/Batch). Se ejecuta desde la terminal, procesa un archivo, escribe la salida y **el proceso finaliza**. No puede responder a múltiples usuarios conectados por la red.

---

## 4. SEMANA 3: PARADIGMA SERVIDOR, PROTOCOLO HTTP Y EXPRESS (APIs REST/JSON)

### 4.1. El Modelo Cliente-Servidor y el Servidor Persistente
A diferencia de un script que termina al terminar de ejecutar sus líneas, un **servidor web** tiene un ciclo de vida continuo:
1. Inicia el proceso.
2. Abre un socket de red escuchando en un puerto específico (`app.listen(3000)`).
3. Entra en un ciclo perpetuo esperando que clientes (navegadores, Postman, apps móviles) le envíen solicitudes HTTP.
4. Procesa cada solicitud y **debe emitir una única respuesta**.

### 4.2. De `node:http` a Express
El módulo nativo `node:http` exige parsear manualmente el string de la URL, analizar los métodos condicionalmente con `if / else`, y gestionar los encabezados a bajo nivel. **Express** ofrece un enrutador declarativo y abstracciones (`req`, `res`) que simplifican el desarrollo.

### 4.3. Anatomía de una Petición HTTP en Express
Express clasifica la información que llega del cliente en tres propiedades clave del objeto `req`:
1. **`req.params` (Parámetros de ruta):** Identifican un recurso unívoco en la URL.
   - Declaración: `/api/series/:id`
   - Petición: `GET /api/series/2` -> `req.params.id` vale `"2"` (es un string, debe convertirse con `Number()`).
2. **`req.query` (Parámetros de consulta / Query String):** Modifican o filtran una colección sin cambiar el endpoint.
   - Petición: `GET /api/series?genero=drama` -> `req.query.genero` vale `"drama"`.
3. **`req.body` (Cuerpo de la petición):** Transporta la carga útil de datos enviada por el cliente (usualmente en métodos `POST` o `PUT`).
   - Requiere el middleware `app.use(express.json())` para que los bytes entrantes se interpreten como un objeto JavaScript.

### 4.4. Códigos de Estado Semánticos (HTTP Status Codes)
El servidor debe comunicar el resultado mediante códigos numéricos estándar para que el cliente actúe programáticamente:
- `200 OK`: Solicitud exitosa (lectura, listado o búsqueda).
- `201 Created`: Recurso creado exitosamente (respuesta a un `POST`).
- `400 Bad Request`: Error del cliente (faltan datos obligatorios o los tipos no son válidos).
- `404 Not Found`: El recurso solicitado no existe en la colección.
- `500 Internal Server Error`: Falla no controlada dentro del servidor.

### 4.5. Memoria RAM vs Persistencia en Disco
En la Semana 3, los datos se cargan inicialmente de un archivo JSON al arrancar el servidor (`const series = await leerJson(...)`).
- Cuando se realiza un `POST /api/series`, el nuevo elemento se guarda en el arreglo en memoria mediante `series.push(nuevaSerie)`.
- **Importante:** La memoria RAM no es persistencia. Si el servidor se apaga o reinicia, los datos nuevos desaparecen y la colección vuelve a su estado inicial del archivo JSON.

### 4.6. ¿Qué ganamos y cuál es el límite de la Semana 3?
- **Ganamos:** Capacidad de atender solicitudes de red concurrentes, exponer servicios REST e interactuar vía JSON.
- **Límite:** Es una API para máquinas o programadores. El usuario final común no consume JSON crudo; necesita pantallas, interfaces visuales, hojas de estilo (CSS) y formularios interactivos.

---

## 5. SEMANA 4: SERVER-SIDE RENDERING (EJS), FORMULARIOS Y PATRÓN PRG

### 5.1. Server-Side Rendering (SSR) con EJS
En lugar de enviar un JSON para que el cliente lo interprete, el servidor genera el documento HTML completo combinando una **plantilla** con los **datos** del sistema.
- Se configura en Express:
  ```javascript
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "views"));
  ```
- Se responde con `res.render("vista", { datos })`.

### 5.2. Sintaxis Prioritaria de EJS (Diferencias Críticas)
1. `<%= variable %>` **(Salida Escapada):** Convierte caracteres peligrosos como `<`, `>`, `&`, `"` en entidades HTML seguras (`&lt;`, `&gt;`). **Evita ataques de inyección XSS**. Se utiliza para imprimir cualquier dato que provenga de variables o usuarios.
2. `<%- contenido %>` **(Salida Sin Escapar / Cruda):** Inserta HTML tal cual. Se usa **únicamente** para incluir parciales (`<%- include(...) %>`) o inyectar el cuerpo de la página en el layout principal (`<%- body %>`). NUNCA debe usarse con datos provistos por usuarios.
3. `<% codigo %>` **(Control de Flujo / Lógica):** Permite ejecutar sentencias JavaScript normales (`if`, `else`, `forEach`) sin emitir texto por sí misma.

### 5.3. Arquitectura de Vistas: Layouts, Vistas y Parciales
Para evitar repetir el esqueleto HTML (`<!DOCTYPE html>`, `<head>`, etc.) en cada pantalla, se utiliza `express-ejs-layouts`:
- **Layout (`views/layouts/main.ejs`):** Define el contenedor global. Contiene el `<%- body %>`, punto exacto donde Express inyectará la vista específica solicitada.
- **Vistas específicas (`views/productos/lista.ejs`):** Contienen únicamente el contenido propio de esa pantalla.
- **Parciales (`views/partials/encabezado.ejs`, `pie.ejs`):** Componentes visuales reutilizables que se incluyen con `<%- include("../partials/...") %>`.

### 5.4. Recursos Estáticos (`express.static`)
Para servir archivos CSS, imágenes o JavaScript del navegador:
```javascript
app.use(express.static(path.join(__dirname, "..", "public")));
```
- **Regla fundamental:** La carpeta física `public` se convierte en la raíz del servidor para recursos estáticos.
- **Consecuencia:** En el HTML, los enlaces se escriben como `<link rel="stylesheet" href="/css/estilos.css">`, **NUNCA** como `/public/css/estilos.css`.

### 5.5. Formularios HTML y Patrón PRG (Post-Redirect-Get)
Cuando un formulario tradicional HTML envía datos mediante `<form method="POST" action="/productos">`, los envía codificados como `application/x-www-form-urlencoded`.
- Requiere el middleware: `app.use(express.urlencoded({ extended: false }))`.
- **El Patrón Post-Redirect-Get (PRG):**
  - **Flujo Erróneo:** Si tras recibir un `POST` exitoso el servidor responde directamente con `res.render(...)`, la URL en el navegador sigue siendo `POST /productos`. Si el usuario presiona F5 o "Recargar", el navegador volverá a enviar el formulario, duplicando compras o registros.
  - **Flujo Correcto (PRG):** Tras procesar el `POST` exitoso, el servidor emite una **redirección HTTP 302** hacia una ruta de lectura (`res.redirect("/productos")`). El navegador entonces realiza de forma automática una petición limpia `GET /productos`. Si el usuario refresca la página, solo refresca el GET sin reenviar datos.
  - **Manejo de Errores de Validación:** Si los datos del formulario son inválidos, NO se redirige. Se responde con código de estado `400 Bad Request` y se renderiza de nuevo la plantilla del formulario (`res.status(400).render("productos/nuevo", { error, valores: req.body })`), conservando los datos tipeados para que el usuario no tenga que reescribirlos.

### 5.6. Orden de Rutas: ¿Por qué `/productos/nuevo` va antes de `/productos/:id`?
Express evalúa las rutas en el orden exacto en que están escritas.
- Si escribiéramos `/productos/:id` primero, cuando un usuario navega a `/productos/nuevo`, Express interpretaría la palabra `"nuevo"` como el valor de `:id` (`req.params.id = "nuevo"`), intentando buscar un producto con ID `"nuevo"` y fallando o devolviendo un 404.
- Por tanto, las rutas estáticas y específicas siempre deben declararse **antes** de las rutas parametrizadas.

---

## 6. SEMANA 5: PIPELINE DE MIDDLEWARES, TRAZABILIDAD Y ENRUTADOR MODULAR

### 6.1. Express como un Pipeline de Middlewares
En la Semana 5 se formaliza el concepto central de Express: **una aplicación Express es una pila ordenada de middlewares**.
Un middleware es una función que recibe tres parámetros: `(req, res, next)`.

```
Cliente ──────► [Morgan] ──next()──► [Identificador] ──next()──► [Medición] ──next()──► [Router / Handler]
                                                                                               │
                                                                                        res.render() / res.json()
                                                                                               │
Cliente ◄────── Respuesta HTTP terminada (emite evento "finish") ◄─────────────────────────────┘
```

### 6.2. Las Tres Acciones Posibles de un Middleware
Todo middleware debe tomar obligatoriamente una de estas decisiones:
1. **Continuar el pipeline:** Llamar a `next()` para ceder el control al siguiente middleware en la cadena.
2. **Cortar y responder:** Finalizar la solicitud enviando una respuesta (`res.render`, `res.json`, `res.redirect`, `res.status().send()`).
3. **El Bug del Bloqueo:** Si el middleware no llama a `next()` ni emite una respuesta, la petición queda "colgada" indefinidamente hasta que el navegador da timeout.
4. **El Error Fatal de Doble Respuesta:** Ejecutar `next()` después de haber respondido produce la temida excepción: `Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client`.

### 6.3. La Importancia Crítica del Orden de Registro
El orden físico de `app.use()` determina la secuencia de ejecución:
1. **Middlewares de infraestructura y diagnóstico (Morgan, `identificarSolicitud`):** Deben ir al inicio absoluto para poder registrar y asignar un ID a cualquier solicitud entrante, incluidos estáticos o peticiones fallidas.
2. **Parsers (`express.urlencoded`, `express.json`):** Deben ubicarse obligatoriamente **antes** de cualquier ruta o validador que intente leer `req.body`. Si se colocan después, `req.body` será `undefined`.
3. **Routers y rutas:** Se ejecutan en el medio.
4. **Manejador de error 404:** Va al final de todo el archivo. Si ninguna ruta anterior coincidió y capturó la petición, cae en este último middleware.

### 6.4. Middlewares de Diagnóstico y Observabilidad
1. **Identificador de Solicitud (`identificarSolicitud`):**
   - Asigna un código único a cada solicitud (ej: `SOL-0001`) guardándolo en `res.locals.solicitudId`.
   - `res.locals` es un objeto especial de Express que persiste durante el ciclo de vida de una única petición y es accesible automáticamente por todas las vistas EJS renderizadas.
2. **Medición de Duración No Bloqueante (`medirDuracion`):**
   - Para medir el tiempo que toma resolver una petición completa sin bloquear el flujo, registra la marca de tiempo de inicio (`process.hrtime.bigint()`), suscribe un listener al evento de finalización del socket HTTP (`res.on("finish", () => { ... })`) y **llama a `next()` de inmediato**.
   - Cuando el handler final termina y envía los bytes al cliente, el evento `"finish"` se dispara y calcula la diferencia de tiempo.

### 6.5. Validación Desacoplada como Middleware de Ruta
En la Semana 4, el handler de `app.post("/productos")` hacía todo: validar strings, números, campos requeridos, buscar IDs, manipular el array y responder.
En la Semana 5, se extrae la validación a un middleware especializado:
```javascript
// Middleware de validación previa
function validarProducto(req, res, next) {
    // Valida y limpia los datos...
    if (invalido) {
        return res.status(400).render("productos/nuevo", { ... }); // Corta el flujo
    }
    req.productoValidado = { nombre, categoria, precio, descripcion }; // Adjunta datos saneados
    next(); // Pasa al siguiente
}

// Handler final enfocado exclusivamente en negocio
function crearProducto(req, res) {
    productos.push({ id: ultimoId + 1, ...req.productoValidado });
    res.redirect("/productos");
}

// Cableado en la ruta:
router.post("/", validarProducto, crearProducto);
```
**Ventaja:** Separación de preocupaciones. El handler de creación tiene la garantía absoluta de que los datos ya fueron verificados y saneados antes de ejecutarse.

### 6.6. Enrutadores Modulares con `express.Router()`
`express.Router()` actúa como una mini-aplicación de enrutamiento aislada:
- Las rutas dentro del router se declaran de forma **relativa**: `router.get("/")`, `router.get("/nuevo")`, `router.get("/:id")`.
- La aplicación monta el router bajo un **prefijo**: `app.use("/productos", productosRouter)`.
- Si escribiéramos `router.get("/productos")`, la URL final requerida sería `/productos/productos`.

---

## 7. SEMANA 6: ARQUITECTURA EN CAPAS, INYECCIÓN DE DEPENDENCIAS Y BUENAS PRÁCTICAS

### 7.1. ¿Por qué cambiar la estructura en la Semana 6?
Al terminar la Semana 5, aunque el código estaba conceptualmente separado en middlewares, handlers y routers, **físicamente todo seguía escrito en un único archivo monstruoso (`src/index.js`)** de 150 líneas.
Si el negocio creciera agregando usuarios, categorías y pedidos, ese archivo colapsaría.
La Semana 6 introduce una **Arquitectura en Capas (Layered / Clean Architecture)** profesional.

### 7.2. Las 4 Capas de la Arquitectura (Y sus dos órdenes de lectura)

Para entender la arquitectura sin confusiones, hay que distinguir **dos momentos distintos**:
1. **En tiempo de ejecución (Runtime - De afuera hacia adentro):** Cómo viaja una petición HTTP.
2. **En tiempo de arranque (Bootstrapping - De adentro hacia afuera):** Cómo `index.js` ensambla los módulos usando inyección de dependencias.

#### Las 4 Capas Lógicas del Sistema:

```
                         CLIENTE / NAVEGADOR
                                 │
                            Petición HTTP
                                 │
     ┌───────────────────────────▼───────────────────────────┐
     │ 1. CAPA DE ENTRADA / PRESENTACIÓN (HTTP)              │
     │    - Rutas (`routes/productos.js`): URLs y métodos.   │
     │    - Middlewares (`middleware/`): Valida y sanea.     │
     │    - Controlador (`drivers/productos.js`):            │
     │      Recibe (req, res), extrae datos y responde.      │
     └───────────────────────────┬───────────────────────────┘
                                 │ Datos limpios (req.productoValidado)
     ┌───────────────────────────▼───────────────────────────┐
     │ 2. CAPA DE DOMINIO / SERVICIO (Lógica de Negocio)     │
     │    - `services/productos.js`:                         │
     │      Reglas puras (cálculo de ID, búsquedas, altas).  │
     │      NO CONOCE EXPRESS, NI REQ, NI RES, NI HTML.      │
     └───────────────────────────┬───────────────────────────┘
                                 │ Consulta datos
     ┌───────────────────────────▼───────────────────────────┐
     │ 3. CAPA DE PERSISTENCIA / ACCESO A DATOS              │
     │    - `archivo.js` / `datos/productos.json`:           │
     │      Operaciones de Entrada/Salida en disco.          │
     └───────────────────────────────────────────────────────┘
                                 ▲
     ┌───────────────────────────┴───────────────────────────┐
     │ 4. SOPORTE TRANSVERSAL Y ENSAMBLE (Bootstrapping)     │
     │    - `configuracions.js`: Variables de entorno.       │
     │    - `app.js`: Fábrica de la aplicación Express.      │
     │    - `index.js`: Punto de entrada que orquesta todo.  │
     └───────────────────────────────────────────────────────┘
```

#### Responsabilidad Específica por Componente:

1. **Rutas y Middlewares (`src/routes/` y `src/middleware/`):**
   - La frontera del sistema con el mundo exterior.
   - Determinan qué método (`GET`, `POST`) y URL atienden la solicitud.
   - `validarProducto` intercepta la solicitud antes del controlador: si los datos son inválidos, responde de inmediato con `400 Bad Request`. Si son válidos, los sanea y los deja en `req.productoValidado`.

2. **Controlador / Driver (`src/drivers/productos.js`):**
   - Es el **adaptador HTTP**.
   - Conoce los objetos de Express (`req` y `res`).
   - Su función es puramente de coordinación: toma los datos de `req`, se los envía al servicio de dominio correspondiente, y traduce lo que devuelva el servicio en una respuesta HTTP (`res.render`, `res.json` o `res.redirect`).
   - **No calcula IDs, no manipula arreglos ni aplica reglas de negocio.**

3. **Servicio de Dominio (`src/services/productos.js`):**
   - Contiene la **lógica de negocio pura** (`listar`, `obtenerPorId`, `crear`).
   - **Regla de Oro:** Esta capa no recibe `req` ni `res`, ni sabe qué es Express ni qué es HTML.
   - **Beneficio:** 100% testeable mediante pruebas unitarias en milisegundos sin necesidad de levantar un servidor web.

4. **Persistencia / Infraestructura (`src/archivo.js`):**
   - Realiza la lectura/escritura física en el sistema de archivos (`node:fs/promises`).

5. **Configuración de Entorno (`src/configuracions.js`):**
   - Lee `process.env`. Aplica el principio **Fail-Fast**: si `PORT` no es válido o está fuera de rango (1 a 65535), aborta antes de intentar levantar el servidor.

6. **Fábrica de la Aplicación (`src/app.js`):**
   - Configura Express, registra los middlewares globales, inyecta los controladores a las rutas y monta los enrutadores.

7. **Punto de Entrada / Bootstrapping (`src/index.js`):**
   - Encargado exclusivamente de arrancar el sistema:
     1. Lee la configuración (`leerConfiguracion()`).
     2. Lee los datos iniciales del disco (`leerJson()`).
     3. Instancia el servicio: `crearServicioProductos(productosIniciales)`.
     4. Instancia la app pasándole el servicio: `crearApp({ servicioProductos, ... })`.
     5. Enciende la escucha con `app.listen(puerto)`.

### 7.3. Inyección de Dependencias (Dependency Injection)
En lugar de que cada archivo importe rígidamente sus dependencias usando `require()` interno (acoplamiento fuerte), se utilizan **funciones creadoras (fabricas / factory functions)** que reciben las dependencias por parámetro:
- `crearControladorProductos(servicioProductos)`
- `crearRouterProductos(controladorProductos)`
- `crearApp({ servicioProductos, formatoRegistro })`

**¿Por qué esto es superior?**
1. **Desacoplamiento:** El controlador no está atado a una implementación concreta del servicio.
2. **Testeabilidad (Mocks):** Para testear el controlador o la app, podemos pasarle un servicio "falso" en memoria sin necesidad de tocar archivos reales de disco.
3. **Flexibilidad:** Si mañana cambiamos el almacenamiento a una base de datos MySQL o MongoDB, los controladores y rutas no cambian en una sola línea; solo se actualiza la implementación del servicio.

### 7.4. Herramientas de Calidad: ESLint, Prettier y Node `--env-file`
- **Node.js `--env-file=.env`:** En versiones modernas de Node.js, ya no es obligatoria la librería externa `dotenv`. El flag nativo `--env-file` carga automáticamente las variables del archivo `.env` en `process.env`.
- **ESLint (`eslint.config.js`):** Análisis estático para detectar patrones defectuosos, variables sin usar o malas prácticas de sintaxis.
- **Prettier:** Formateador automático que asegura un estilo de código homogéneo en todo el equipo.

---

## 8. UNIDAD 7: PERSISTENCIA REAL CON BASES DE DATOS NOSQL (MONGODB, ATLAS Y MONGOOSE)

### 8.1. De dónde venimos y qué problema resolvemos (Memoria Volátil vs Persistencia Externa)
Al finalizar la Semana 6, contábamos con una **arquitectura en capas impecable** (rutas, middlewares, controladores, servicios y configuración desacoplada). Sin embargo, el almacenamiento de datos tenía un defecto insalvable:
- El servicio de productos recibía una semilla JSON al arrancar y la copiaba a un arreglo interno en memoria RAM (`const productos = [...productosIniciales]`).
- Cada petición `POST` agregaba un elemento a ese arreglo con `.push()`, pero **no modificaba el archivo JSON**.
- **El problema de la memoria volátil:** Cuando el proceso de Node.js se detiene (`Ctrl + C`, reinicio del servidor o caída del sistema), el Heap de memoria de V8 se destruye por completo. Al arrancar nuevamente el servidor, el arreglo vuelve a crearse desde la semilla original y **todas las altas anteriores desaparecen sin dejar rastro**.
- **La solución de la Unidad 7:** Delegar la persistencia a un **proceso externo independiente y especializado en almacenamiento**: el motor de base de datos **MongoDB**. Incluso si la aplicación Node.js se apaga, se actualiza o se destruye, los datos persisten seguros en el servidor de base de datos (MongoDB Atlas en la nube).

```
┌────────────────────────────────────────────────────────────────────────┐
│ UNIDAD 6: Persistencia Efímera en Memoria                              │
│                                                                        │
│ JSON Inicial ──► [Proceso Node.js: Arreglo en RAM] ──► Termina Proceso │
│                     ▲                                        │         │
│                     └── POST agrega al array en RAM          ▼         │
│                                                     ¡LOS DATOS MUEREN! │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ UNIDAD 7: Persistencia Real en Base de Datos Externa                   │
│                                                                        │
│ [Proceso Node.js (Cliente)] ──Red/Internet──► [MongoDB Atlas (Nube)]   │
│   - Ejecuta scripts batch                        - Proceso Servidor    │
│   - Envía peticiones BSON                        - Escribe en disco    │
│   - Proceso Node finaliza y muere                - ¡DATOS INTACTOS!    │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 8.2. Vocabulario Mínimo y Modelo Documental vs Relacional

| Concepto | Significado en este proyecto | Equivalente Relacional (SQL) |
| :--- | :--- | :--- |
| **Base de Datos** | `mercado_artesanal_u7` (o `reservas_salas_u7` en TP7): Espacio que agrupa nuestras colecciones. | Base de Datos (Schema / Database) |
| **Colección** | `productos` (o `reservas`): Conjunto de documentos de una misma entidad. | Tabla |
| **Documento** | Un producto específico con sus campos y valores. | Fila / Registro (Tuple / Row) |
| **Campo** | `nombre`, `categoria`, `precio`, `descripcion`. | Columna (Column / Attribute) |
| **_id** | Identificador único universal del documento dentro de su colección. | Clave Primaria (Primary Key) |
| **BSON** | Formato binario de almacenamiento con tipos ricos (`ObjectId`, `Date`). | Tipos nativos de columnas SQL |

#### Relacional vs Documental:
- **Relacional (SQL):** Datos estructurados en tablas con esquemas fijos a nivel de base de datos, filas y columnas, y relaciones forzadas mediante claves foráneas (`FOREIGN KEY`) y normalización.
- **Documental (NoSQL):** Datos almacenados en documentos polimórficos agrupados en colecciones. Permite estructuras anidadas (arrays de subdocumentos u objetos embebidos) sin requerir costosos `JOIN`s en disco para lectura.
- **Aclaración crítica del apunte:** Que MongoDB permita documentos flexibles no significa que el sistema acepte cualquier dato desordenado. En Node.js imponemos un contrato estricto mediante esquemas de Mongoose en la capa de aplicación.

---

### 8.3. Ecosistema de Trabajo: MongoDB Server, Atlas, Compass y Mongoose

1. **MongoDB Server:** Proceso servidor que administra el motor de almacenamiento, gestiona índices y ejecuta operaciones de lectura/escritura física.
2. **MongoDB Atlas:** Servicio de base de datos administrada en la nube (DBaaS). Para el curso se utiliza el clúster gratuito **Free (M0 Sandbox)**.
3. **Atlas Data Explorer (Browse Collections):** Interfaz web oficial en el navegador para inspeccionar, filtrar y auditar las bases de datos y colecciones del clúster sin instalar software local.
4. **MongoDB Compass:** Cliente gráfico de escritorio opcional para inspeccionar la base. **Atención:** Instalar Compass solo instala un visualizador, no instala ni inicia un servidor MongoDB.
5. **Mongoose:** Biblioteca ODM (*Object Document Mapper*) para Node.js. Traduce objetos JavaScript de la aplicación en documentos BSON, impone esquemas de validación de negocio y ofrece métodos asíncronos de consulta (`create`, `find`, etc.).

---

### 8.4. La Tríada Conceptual de Mongoose: Schema, Model y Document

Para trabajar con Mongoose es mandatorio distinguir tres conceptos que suelen confundirse:

```
┌─────────────────────────────────┐
│           1. SCHEMA             │  Define el contrato formal:
│      `new mongoose.Schema()`    │  campos, tipos de datos, restricciones
│                                 │  (`required`, `min`, `trim`) y validadores.
└────────────────┬────────────────┘
                 │ Se compila con mongoose.model()
                 ▼
┌─────────────────────────────────┐
│            2. MODEL             │  Es la interfaz constructora y operadora:
│   `mongoose.model("Producto")`  │  ofrece métodos estáticos hacia MongoDB
│                                 │  (`Producto.create()`, `Producto.find()`).
└────────────────┬────────────────┘
                 │ Al consultar o instanciar
                 ▼
┌─────────────────────────────────┐
│          3. DOCUMENT            │  Es la instancia concreta en memoria
│     `new Producto({ ... })`     │  o recuperada de la base, con sus datos
│                                 │  particulares y su `_id` asignado.
└─────────────────────────────────┘
```

> [!IMPORTANT]
> **Regla de Oro:** Declarar un `Schema`, compilar un `Model` o crear un `new Document()` en memoria **NO** abre conexiones a la base de datos ni guarda nada en el servidor. La persistencia solo ocurre cuando se ejecuta una operación explícita como `.save()` o `Model.create()`.

---

### 8.5. El Acuerdo de Trabajo: "Un Laboratorio Aislado dentro de la Copia"

Uno de los mayores errores cometidos por principiantes es intentar conectar la base de datos a los controladores y vistas web inmediatamente.

**¿Por qué en la Clase 1 de la Unidad 7 NO se modificó el servidor web de Express?**
1. **Asincronía pendiente:** Los controladores de la Unidad 6 fueron construidos asumiendo que el servicio en memoria responde de forma instantánea y síncrona (`const productos = servicioProductos.listar()`). Si reemplazáramos ese servicio por Mongoose directamente, los controladores recibirían un objeto `Promise` pendiente en lugar del arreglo de productos, rompiendo las vistas EJS.
2. **Identificadores incompatibles:** La Unidad 6 manipulaba IDs numéricos enteros autoincrementales (`1, 2, 3...`) con `Math.max()` y `reduce()`, mientras que MongoDB utiliza `_id` de tipo `ObjectId` (cadenas hexadecimales de 24 caracteres). Conectar Express de golpe exigiría cambiar controladores, rutas y plantillas simultáneamente, dificultando aislar errores.
3. **Estrategia pedagógica:** Se reserva `src/` para los módulos de la aplicación y se crea una carpeta `scripts/` en la raíz con programas cortos de terminal para probar paso a paso cada pieza de forma aislada:
   - Diagnosticar conectividad de red y DNS.
   - Probar validación de esquema en frío sin tocar la base.
   - Guardar un primer documento.
   - Demostrar científicamente la persistencia con consultas en procesos independientes.
4. **La web sigue viva:** El servidor web Express (`src/app.js`, controladores y rutas) se conserva 100% operativo con su servicio en memoria de la Unidad 6. La integración completa de la web con MongoDB se realiza en la Unidad 8.

---

### 8.6. Implementación Paso a Paso de la Unidad 7 (Clase 01)

#### Paso 1: Copiar el Proyecto y Preparar el Entorno
- Se realiza una copia limpia de `mercado-artesanal-modular` (Semana 6) a `mercado-artesanal-mongodb`.
- **Regla de seguridad:** NUNCA se copian `node_modules`, `.git` ni archivos `.env` con credenciales reales.
- Se instala Mongoose: `npm install mongoose@9.10.3 --save-exact`.
- Se crea el clúster Free M0 en Atlas, el usuario de base de datos, se agrega la IP actual a la lista blanca de acceso de red (*Network Access*) y se obtiene la URI de conexión (`mongodb+srv://...`).
- Se configuran los archivos de entorno:
  - `.env` (archivo local y privado, ignorado en `.gitignore`): Contiene la URI real con usuario, contraseña y base `mercado_artesanal_u7`.
  - `.env.example` (plantilla pública versionable): Contiene marcadores (`USUARIO:CLAVE@HOST/mercado_artesanal_u7`) sin credenciales sensibles.

#### Paso 2: Conexión y Cierre Controlados
Para respetar la separación de responsabilidades:
- `src/config/entorno.js`: Lee las variables con enfoque **Fail-Fast**:
  - `leerConfiguracion()`: Valida que `PORT` sea un entero entre 1 y 65535.
  - `leerUriMongo()`: Comprueba que `MONGODB_URI` no esté vacía y que inicie obligatoriamente con `mongodb://` o `mongodb+srv://`.
- `src/config/base-datos.js`: Centraliza la apertura y el cierre de conexión:
  - `conectarBaseDatos()`: Ejecuta `await mongoose.connect(...)` con un `serverSelectionTimeoutMS: 5000` para que los errores de red fallen rápido sin congelar la terminal.
  - `desconectarBaseDatos()`: Ejecuta `await mongoose.disconnect()`.
  - **Parche DNS del aula:** `dns.setServers(["8.8.8.8", "1.1.1.1"])` evita que las consultas de resolución de nombres SRV/TXT del clúster de Atlas fallen con `querySrv ECONNREFUSED` en redes institucionales o conexiones residenciales con resolutores deficientes.
- `scripts/comprobar-conexion.js`: Programa corto que coordina la prueba de conexión:
  - Utiliza el patrón `try { await conectarBaseDatos() } finally { await desconectarBaseDatos() }` para asegurar que el socket siempre se cierre y el proceso de Node.js termine normalmente.
  - Diagnostica errores específicos de red (`ECONNREFUSED`, `ENOTFOUND`, `ETIMEOUT`) sin exponer credenciales en la consola.

#### Paso 3: Definir el Esquema y Construir el Modelo
En `src/models/producto.js` (o `src/modelos/producto.js`):
```javascript
const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    categoria: { type: String, required: true, trim: true },
    precio: { type: Number, required: true, min: 1 },
    descripcion: { type: String, required: true, trim: true },
  },
  { collection: "productos" } // Colección explícita, evita pluralizaciones en inglés
);

const Producto = mongoose.model("Producto", productoSchema);
module.exports = { Producto };
```
- **Validación Aislada sin Red (`scripts/validar-producto.js`):**
  - Instancia `const producto = new Producto({ ... })` y llama a `await producto.validate()`.
  - **No se conecta a MongoDB ni toca la red.** Demuestra que la validación del esquema es una operación puramente local de JavaScript en Node.js.

#### Paso 4: Guardar el Primer Producto Persistente
En `scripts/crear-producto.js`:
- Conecta a la base con `await conectarBaseDatos()`.
- Ejecuta `const producto = await Producto.create({ ... })`.
- `.create()` ejecuta dos acciones en un solo paso: **valida** los datos contra el esquema y **persiste** el documento en Atlas emitiendo una orden de inserción BSON.
- Imprime el identificador autogenerado: `producto._id.toString()`.
- En el bloque `finally`, garantiza `await desconectarBaseDatos()`.

#### Paso 5: Demostración Científica de la Persistencia
En `scripts/listar-productos.js`:
- Conecta a la base y ejecuta `const productos = await Producto.find({})`.
- Muestra los resultados en consola con `console.table(productos.map(...))`.
- Cierra la conexión en `finally`.

---

### 8.7. Anatomía del Documento BSON: `_id` y `__v`

Al inspeccionar un documento guardado en MongoDB Atlas o recuperado por Mongoose:
```json
{
  "_id": "67b8a5c2d3e4f1a2b3c4d5e6",
  "nombre": "Mate de cerámica",
  "categoria": "Cerámica",
  "precio": 12000,
  "descripcion": "Pieza artesanal esmaltada.",
  "__v": 0
}
```

#### ¿Por qué el `_id` es un ObjectId y no un número correlativo?
1. **Descentralización y escalabilidad:** En sistemas distribuidos, generar números secuenciales (`1, 2, 3...`) requeriría un cuello de botella central que coordine cada número.
2. **Estructura del `ObjectId` (12 bytes en binario / 24 caracteres hexadecimales):**
   - 4 bytes de timestamp (fecha y hora exacta de creación en segundos).
   - 5 bytes de identificador único de proceso/máquina.
   - 3 bytes de contador incremental local.
3. **Implicancia técnica:** No se le debe aplicar `Number()`, no se suma con `+ 1`, ni se calcula con `reduce()`. En JavaScript se maneja como string usando `.toString()`.

#### ¿Qué es la clave `__v`?
- Es la **clave de versión interna** (*versionKey*) generada automáticamente por Mongoose.
- Se utiliza para **control de concurrencia optimista** (*Optimistic Concurrency Control*): garantiza que si dos procesos intentan modificar el mismo documento al mismo tiempo, las modificaciones no se sobreescriban accidentalmente.
- **No es un ID de negocio, no es un producto duplicado ni un error del código.**

---

### 8.8. Matriz de Diagnóstico y Errores Comunes de la Unidad 7

| Error en Consola | Causa Raíz | Solución Correcta |
| :--- | :--- | :--- |
| `Cannot find module 'mongoose'` | Mongoose no fue instalado en la carpeta actual del proyecto. | Ejecutar `npm install mongoose@9.10.3 --save-exact` en la raíz de la copia. |
| `querySrv ECONNREFUSED` / `queryTxt ESERVFAIL` | El servidor DNS de la conexión local bloquea o rechaza consultas SRV hacia MongoDB Atlas. | Agregar `dns.setServers(["8.8.8.8", "1.1.1.1"])` en `src/config/base-datos.js` antes de conectar. |
| `MongooseServerSelectionError` (Timeout 5000ms) | Atlas no responde: la IP actual no está permitida en *Network Access*, o la máquina no tiene acceso a Internet. | Ingresar a MongoDB Atlas -> *Network Access* -> Agregar la IP pública actual (*Add Current IP*). |
| `MongoServerError: bad auth : Authentication failed` | El usuario o la contraseña en `MONGODB_URI` son incorrectos. | Verificar el usuario de base de datos creado en Atlas. Si la contraseña tiene caracteres reservados (como `@`), codificarlos (`@` -> `%40`). |
| La terminal queda colgada sin volver al prompt | No se cerró la conexión con MongoDB. | Asegurar siempre `await desconectarBaseDatos()` dentro de un bloque `finally { ... }`. |
| La consulta devuelve un objeto `Query` en lugar de datos | Se olvidó colocar `await` antes de `Producto.find()`. | Usar siempre `const productos = await Producto.find({})`. |
| `ValidationError: Path 'precio' (-1) is less than minimum allowed value (1)` | Los datos violan las restricciones del Schema de Mongoose. | Corregir los datos del objeto. Demuestra que el validador del modelo está actuando eficazmente. |

---

### 8.9. Ticket de Salida: Preguntas Fundamentales de Evaluación Respondidas

#### P1: ¿Qué diferencia hay entre instalar Mongoose y tener MongoDB disponible?
**R:** Mongoose es solo un paquete de Node.js (un cliente ODM que corre dentro de nuestra aplicación). Instalar Mongoose no inicia ningún servidor ni almacena datos por sí mismo. Para tener MongoDB disponible se necesita un proceso de servidor de base de datos en ejecución física, ya sea un servicio local en la máquina o una instancia administrada en la nube como MongoDB Atlas.

#### P2: ¿Por qué un `_id` presente en un objeto JavaScript no prueba que se haya guardado en la base?
**R:** Porque Mongoose genera y asigna automáticamente un `_id` de tipo `ObjectId` en memoria al momento de instanciar un documento (`new Producto(...)`) antes de cualquier comunicación con el servidor. Un documento solo existe en la base de datos cuando una operación de persistencia (`.create()` o `.save()`) fue completada y confirmada exitosamente por el servidor de MongoDB.

#### P3: ¿Qué hace `validate()` que no hace `create()`, y viceversa?
**R:** `validate()` es una operación asíncrona pero puramente local: comprueba que los campos cumplan con los tipos, requerimientos y reglas del Schema en Node.js, pero **no conecta a la red ni guarda el documento**. En cambio, `create()` realiza el ciclo completo: primero ejecuta la validación interna del esquema y, si es satisfactoria, abre la comunicación con MongoDB, serializa el documento en BSON y lo persiste físicamente en la colección.

#### P4: ¿Por qué la consulta para demostrar persistencia se ejecuta en un proceso de Node.js separado?
**R:** Para demostrar de forma empírica que los datos sobreviven a la muerte del proceso de la aplicación. Si consultáramos los datos dentro del mismo script que los creó, la prueba no demostraría si los datos vienen de la base o si siguen residiendo en una variable de la memoria RAM del proceso actual. Al terminar el proceso de creación y consultar desde una nueva ejecución en frío, se evidencia que los datos fueron recuperados desde el servidor externo de MongoDB Atlas.

#### P5: ¿Qué archivos de la Unidad 6 dejamos intactos en la Clase 1 de la Unidad 7 y por qué?
**R:** Se mantuvieron intactos `src/app.js`, las rutas (`src/routes/`), los controladores (`src/drivers/`), las vistas EJS (`views/`), los middlewares (`src/middleware/`), los estáticos (`public/`) y los datos semilla (`datos/productos.json`). Se dejaron intactos para no acoplar de forma prematura el servidor HTTP con una base de datos asíncrona antes de contar con las herramientas adecuadas, evitando desestabilizar la interfaz web hasta la Unidad 8.

#### P6: ¿Qué habría que adaptar antes de conectar este modelo a los controladores HTTP en la Unidad 8?
**R:** Habrá que realizar tres adaptaciones fundamentales:
1. **Asincronía total:** Transformar los métodos del servicio y los controladores en funciones `async` con `await`, ya que las consultas a MongoDB son operaciones de red asíncronas.
2. **Gestión de Identificadores:** Adaptar las rutas y controladores para buscar por `_id` (ObjectId o string de 24 caracteres con `findById`) en lugar de IDs numéricos autoincrementales (`1, 2, 3...`).
3. **Mapeo de Errores:** Capturar `ValidationError` y `CastError` de Mongoose en la capa de controladores o middlewares para traducirlos en respuestas HTTP apropiadas (`400 Bad Request` o `404 Not Found`).

---

### 8.10. Guía de Implementación para el Trabajo Práctico 07 (TP 07: Reservas de Salas)

El **TP 07** aplica exactamente la misma arquitectura y metodología de laboratorio desarrollada en la Unidad 7, pero adaptada al dominio del **TP 06 (Reservas de Salas de Estudio)**.

#### Especificaciones del TP 07:
1. **Base del proyecto:** Copiar el repositorio limpio del TP 06 (ej: `Tp6 - AlejoLeonelMaidana` a `tp-07-reservas-mongodb`).
2. **Base de Datos y Colección en Atlas:**
   - Base de Datos: `reservas_salas_u7`
   - Colección: `reservas`
3. **Variables de Entorno:**
   - `.env`: `PORT=3000`, `NODE_ENV=development`, `MONGODB_URI=mongodb+srv://.../reservas_salas_u7?retryWrites=true&w=majority`
   - `.env.example`: Versión pública con marcadores seguros.
4. **Módulos de Configuración (`src/config/`):**
   - `src/config/entorno.js`: `leerConfiguracion()` y `leerUriMongo()`.
   - `src/config/base-datos.js`: `conectarBaseDatos()` con el fix DNS y `desconectarBaseDatos()`.
5. **Modelo Mongoose (`src/models/reserva.js`):**
   - Campos recomendados según el dominio de salas:
     - `solicitante` o `nombre`: String, required, trim.
     - `email` o `contacto`: String, required, trim, match: `/@/`.
     - `sala`: String, required, trim (o `enum` con salas válidas).
     - `capacidad` o `asistentes`: Number, required, min: 1, validate con `Number.isInteger`.
     - `fecha`: String, required, trim.
     - `turno` u `horario`: String, required, trim (o `enum: ["Mañana", "Tarde", "Noche"]`).
   - Opción explícita de colección: `{ collection: "reservas" }`.
   - Exportación: `module.exports = { Reserva }`.
6. **Scripts de Laboratorio en `scripts/`:**
   - `scripts/comprobar-conexion.js`: Verifica conexión con Atlas y desconecta.
   - `scripts/validar-reserva.js`: Valida una instancia en memoria con `await reserva.validate()` sin conectar a la base.
   - `scripts/crear-reserva.js`: Conecta, ejecuta `await Reserva.create({ ... })`, muestra el `_id` generado y desconecta.
   - `scripts/listar-reservas.js`: Conecta, ejecuta `await Reserva.find({})`, imprime tabla con `console.table` y desconecta.
7. **Verificación de Persistencia (Ciclo de Aprobación):**
   - `node --env-file=.env scripts/listar-reservas.js` -> Cuenta $N$.
   - `node --env-file=.env scripts/crear-reserva.js` -> Crea reserva con éxito.
   - `node --env-file=.env scripts/listar-reservas.js` -> Cuenta $N + 1$ confirmando la persistencia.
8. **Integridad del Servidor Web:**
   - El comando `npm start` debe seguir levantando el servidor web de reservas de la Unidad 6 en memoria sin fallas.

---

## 9. UNIDAD 8: CONEXIÓN INTEGRAL DE EXPRESS CON MONGODB (SITIO WEB SSR Y API RESTFUL ASÍNCRONOS)

### 9.1. El Problema que Quedó Pendiente en la Unidad 7
En la Unidad 7, logramos persistencia real en MongoDB Atlas, pero existía una **bifurcación arquitectónica insostenible**:
- Los programas de `scripts/` (`crear-producto.js`, `listar-productos.js`) se conectaban a MongoDB.
- El servidor web de Express (`src/app.js`) seguía leyendo y guardando en un arreglo volátil en la memoria RAM con `services/productos.js`.
- **Consecuencia:** Crear un producto en Atlas desde la consola no lo mostraba en la web, y cargar un producto desde el formulario web no lo guardaba en la base de datos de la nube. Al reiniciar el servidor HTTP, todas las altas web se perdían.

En la **Unidad 8**, eliminamos definitivamente los datos en memoria: **las rutas web (HTML) y la API REST (JSON) pasan a consultar el mismo modelo Mongoose y la misma base en Atlas**.

```
┌─────────────────────────────────┐
│     Formulario HTML (Web)       │ ──► POST /productos (302 PRG)
└────────────────┬────────────────┘                               \
                 │                                                 ▼
┌────────────────┴────────────────┐                   ┌─────────────────────────┐     ┌────────────────────────┐
│        API REST (JSON)          │ ──► POST /api...  │   Servicio Asíncrono    │ ──► │     MongoDB Atlas      │
│     (Postman / Single Page)     │     (201 Created) │ (productos-mongo.js)    │     │  (Cluster M0 Sandbox)  │
└─────────────────────────────────┘                   └─────────────────────────┘     └────────────────────────┘
```

> [!IMPORTANT]
> **No se borra la arquitectura en capas ni se vuelve a un script monolítico.** Conservamos intacta la separación de responsabilidades: `src/config/`, `models/`, `services/`, `drivers/` (controladores), `routes/`, `middleware/`, `views/` y los scripts de diagnóstico en `scripts/`.

---

### 9.2. Qué Significa Crear y Leer un Recurso (Contratos HTTP)

Un **recurso** es una entidad identificable unívocamente mediante una URI (por ejemplo, `/api/productos/6ada8fec1d644116d566c537`). La representación de la API es JSON y la del sitio web es HTML con EJS. Ambas capas consumen exactamente el mismo servicio de negocio, pero sus **contratos HTTP** son completamente distintos:

| Operación | Método y Ruta | Código HTTP | Formato de Respuesta | Descripción del Contrato |
| :--- | :--- | :--- | :--- | :--- |
| **Listar Todos** | `GET /api/productos` | `200 OK` | JSON (Arreglo) | Devuelve arreglo de objetos. Si la base está vacía, `[]` es una respuesta válida. |
| **Filtrar Recurso** | `GET /api/productos?categoria=Cerámica` | `200 OK` | JSON (Arreglo) | Búsqueda por igualdad exacta. Si no hay coincidencias, devuelve `[]`. Si la clave se repite como array, rechaza con `400`. |
| **Consultar Uno** | `GET /api/productos/:id` | `200 OK` | JSON (Objeto) | Devuelve el objeto del producto si existe. |
| **Crear por API** | `POST /api/productos` | `201 Created` | JSON (Objeto) | Confirma la persistencia física en MongoDB. Devuelve la cabecera `Location: /api/productos/:id`. |
| **Crear por Web** | `POST /productos` | `302 Found` | Redirección PRG | Redirige al listado `/productos` evitando el reenvío de formulario (F5). |

#### Distinción Fundamental: ID Inválido vs Documento Inexistente

Uno de los errores conceptuales más frecuentes en evaluaciones es confundir un error de sintaxis con una ausencia de datos:
1. **Formato Inválido (`400 Bad Request`):** Si el cliente solicita `/api/productos/123` o `/api/productos/no-es-un-id`, el identificador **no cumple con los 24 caracteres hexadecimales** de un `ObjectId`. Es un error del cliente al redactar la petición. Mongoose ni siquiera debe consultar la base; se rechaza inmediatamente con `400`.
2. **Formato Válido pero Inexistente (`404 Not Found`):** Si el cliente solicita `/api/productos/000000000000000000000000`, el formato hexadecimal es impecable, pero la base de datos responde `null`. El recurso no existe; el servidor responde `404`.
3. **Fallo del Servicio (`500 Internal Server Error`):** Si MongoDB Atlas se cae o se corta la red, **la respuesta nunca debe ser una lista vacía `[]` disfrazada de éxito**. Debe responderse `500` indicando un error del servidor.

```
┌─────────────────────────────────┐
│     ID con Formato Inválido     │ ──► 400 Bad Request (Fallo sintáctico del cliente)
│     (Ej: /api/productos/1)      │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│   ID Válido pero No Existente   │ ──► 404 Not Found (Sintaxis correcta, documento ausente)
│  (Ej: /api/productos/000...000) │
└─────────────────────────────────┘
┌─────────────────────────────────┐
│     ID Válido y Existente       │ ──► 200 OK (Recurso recuperado con éxito)
└─────────────────────────────────┘
```

---

### 9.3. Por Qué Cambiar Solo el Servicio No Alcanza (Asincronía Total y Express 5)

En la Semana 6, el servicio en memoria respondía de forma **síncrona e inmediata**:
```javascript
const productos = servicioProductos.listar(); // Devolvía el array instantáneamente
```

Al conectar MongoDB mediante Mongoose, todas las operaciones de persistencia son **asíncronas y retornan una Promesa**:
```javascript
const productos = await servicioProductos.listar(); // Espera la respuesta de red de Atlas
```

#### ¿Qué sucede si olvidamos el `await`?
1. **En las vistas EJS:** Si el controlador pasa una promesa a `res.render("productos/lista", { productos })`, EJS intentará iterar sobre un objeto `Promise` pendiente en lugar de un Array, arrojando errores en la plantilla o renderizando contenido roto.
2. **En la creación:** Si se ejecuta `servicio.crear(req.productoValidado)` sin `await`, el servidor responderá `res.redirect("/productos")` o `201 Created` **antes de que MongoDB termine de escribir en el disco**. Si Atlas rechaza la inserción por duplicidad o fallo de validación, el cliente habrá recibido un falso anuncio de éxito y los datos se habrán perdido.

#### Propagación de Errores Nativa en Express 5
En versiones antiguas de Express (Express 4), cualquier excepción lanzada dentro de una función asíncrona no capturada con `try/catch` provocaba una *UnhandledPromiseRejection* y colgaba la petición.
En **Express 5** (utilizado en el curso), el enrutador captura automáticamente las promesas rechazadas devueltas por controladores declarados `async`:
```javascript
// En Express 5, si servicio.obtenerPorId() lanza un error, viaja directo al manejador de errores
async function mostrarDetalle(req, res) {
  const producto = await servicio.obtenerPorId(req.params.id);
  // ...
}
```
Por esta razón, es mandatorio que las funciones internas del controlador siempre usen `await` o retornen la promesa, para que ningún error quede flotando fuera del pipeline.

---

### 9.4. Paso a Paso de la Implementación en la Unidad 8

#### Paso 1: Configuración de Entorno y Conexión Segura
- **Nombre de Base de Datos Separado:** En `.env` se define `mercado_artesanal_u8` en la cadena de conexión:
  ```env
  PORT=3005
  NODE_ENV=development
  MONGODB_URI=mongodb+srv://USUARIO:CLAVE@HOST/mercado_artesanal_u8?retryWrites=true&w=majority
  ```
- **Ajuste de DNS:** Se conserva el parche `dns.setServers(["8.8.8.8", "1.1.1.1"])` en `src/config/base-datos.js` para resolver los registros SRV/TXT de Atlas en cualquier red.

#### Paso 2: Modelo Mongoose con Defaults y Servicio Asíncrono
En `src/models/producto.js`:
```javascript
const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    categoria: { type: String, required: true, trim: true },
    precio: { type: Number, required: true, min: 1 },
    descripcion: { type: String, required: true, trim: true },
    disponible: { type: Boolean, default: true }, // Default de esquema
  },
  { collection: "productos" }
);

const Producto = mongoose.model("Producto", productoSchema);
module.exports = { Producto };
```

> [!NOTE]
> **Comportamiento del `default` de Mongoose:** La propiedad `default: true` se aplica únicamente cuando el campo viene `undefined` al momento de la creación. No reemplaza un valor `null` explícito ni reescribe automáticamente documentos que ya estaban guardados previamente en Atlas.

En `src/services/productos-mongo.js`:
```javascript
const mongoose = require("mongoose");
const { Producto } = require("../models/producto");

// Traduce el documento BSON interno a un objeto de dominio con 'id' string
function representarProducto(documento) {
  return {
    id: documento._id.toString(),
    nombre: documento.nombre,
    categoria: documento.categoria,
    precio: documento.precio,
    descripcion: documento.descripcion,
    disponible: documento.disponible,
  };
}

function crearServicioProductosMongo() {
  async function listar(categoria) {
    const filtro = {};
    if (categoria !== undefined) {
      if (typeof categoria !== "string" || !categoria.trim()) {
        const error = new Error("Categoría inválida");
        error.codigo = "FILTRO_INVALIDO";
        throw error;
      }
      filtro.categoria = categoria.trim();
    }
    // .lean() devuelve POJOs limpios sin métodos pesados de Mongoose
    const documentos = await Producto.find(filtro).lean();
    return documentos.map(representarProducto);
  }

  async function obtenerPorId(id) {
    // Validación estricta antes de consultar la base
    if (!mongoose.isObjectIdOrHexString(id)) {
      const error = new Error("Identificador inválido");
      error.codigo = "ID_INVALIDO";
      throw error;
    }
    const documento = await Producto.findById(id).lean();
    return documento ? representarProducto(documento) : null;
  }

  async function crear(datos) {
    const documento = await Producto.create({
      nombre: datos.nombre,
      categoria: datos.categoria,
      precio: datos.precio,
      descripcion: datos.descripcion,
    });
    return representarProducto(documento);
  }

  return { listar, obtenerPorId, crear };
}

module.exports = { crearServicioProductosMongo };
```

#### ¿Por qué usamos `.lean()` y `representarProducto()`?
- **Rendimiento:** Las consultas normales de Mongoose instancian Documentos completos cargados de métodos (`save`, `validate`, getters, setters). `.lean()` saltea esa hidratación y devuelve objetos planos de JavaScript (*POJOs*), reduciendo drásticamente el consumo de memoria RAM y el tiempo de CPU.
- **Mapeo de Identificadores:** Como `.lean()` elimina los *virtual getters* de Mongoose, el virtual `producto.id` desaparece y solo queda el `_id: ObjectId(...)`. La función pura `representarProducto` se encarga de convertir `_id.toString()` a la propiedad `id` que nuestras vistas EJS y clientes esperan consumir.

#### Paso 3: Conexión Única y Cierre Controlado (Graceful Shutdown)
A diferencia de los scripts de la Unidad 7, que abrían y cerraban la conexión en cada comando, **un servidor web mantiene un pool de conexiones persistente abierto** para atender miles de peticiones simultáneas:

En `src/index.js`:
```javascript
const { leerConfiguracion } = require("./config/entorno");
const { conectarBaseDatos, desconectarBaseDatos } = require("./config/base-datos");
const { crearServicioProductosMongo } = require("./services/productos-mongo");
const { crearApp } = require("./app");

async function main() {
  const { puerto, formatoRegistro } = leerConfiguracion();
  
  // 1. Conectar ANTES de escuchar peticiones (Fail-Fast)
  await conectarBaseDatos();
  
  const servicioProductos = crearServicioProductosMongo();
  const app = crearApp({ servicioProductos, formatoRegistro });
  
  const servidor = app.listen(puerto, () => {
    console.log(`Aplicación disponible en http://localhost:${puerto}`);
  });

  // 2. Cierre ordenado (Graceful Shutdown) ante interrupciones
  let cerrando = false;
  function cerrar() {
    if (cerrando) return;
    cerrando = true;
    servidor.close(async () => {
      try {
        await desconectarBaseDatos();
      } catch (error) {
        console.error("Error al cerrar:", error.name);
        process.exitCode = 1;
      }
    });
  }

  process.once("SIGINT", cerrar);  // Captura Ctrl + C
  process.once("SIGTERM", cerrar); // Captura señales de apagado de servidores/Docker
}

main().catch(async (error) => {
  console.error("No se pudo iniciar la aplicación:", error.name);
  process.exitCode = 1;
  try {
    await desconectarBaseDatos();
  } catch (fallo) {
    console.error("Error al cerrar:", fallo.name);
  }
});
```

#### Paso 4: Routers Desacoplados (HTML vs API REST)
Para no mezclar respuestas visuales con respuestas de máquina, separamos las rutas en dos módulos independientes:

1. **Router HTML (`src/routes/productos.js`):** Gestiona la navegación de usuarios, renderizado de vistas EJS y la redirección PRG (`302`).
2. **Router API (`src/routes/productos-api.js`):** Gestiona las peticiones REST/JSON:
   ```javascript
   const express = require("express");
   const { validarProducto } = require("../middleware/productos");

   function crearRouterProductosApi(controlador) {
     const router = express.Router();
     router.get("/", controlador.listarApi);
     router.get("/:id", controlador.obtenerApi);
     router.post("/", validarProducto, controlador.crearApi);
     return router;
   }

   module.exports = { crearRouterProductosApi };
   ```

En el controlador (`src/drivers/productos.js`), `crearApi` implementa las mejores prácticas REST:
```javascript
async function crearApi(req, res) {
  const producto = await servicio.crear(req.productoValidado);
  // Emite código 201 Created y cabecera Location con la URI del nuevo recurso
  res.location(`/api/productos/${producto.id}`).status(201).json(producto);
}
```

#### Paso 5: Middleware de Errores Centralizado de 4 Parámetros
En `src/middleware/errores.js`, se implementa una función de manejo de errores que discrimina automáticamente si la petición provino de un navegador web o de un cliente de API:

```javascript
function crearManejadorErrores({ vistaFormulario, tituloFormulario }) {
  // Los 4 parámetros obligatorios identifican un Error Handler en Express
  return function manejarErrores(error, req, res, next) {
    if (res.headersSent) {
      return next(error);
    }

    const esValidacion = error.name === "ValidationError";
    const esEntrada =
      esValidacion ||
      error.codigo === "ID_INVALIDO" ||
      error.codigo === "FILTRO_INVALIDO" ||
      error.type === "entity.parse.failed"; // Captura JSON mal formado
      
    const estado = esEntrada ? 400 : 500;
    let mensaje = esEntrada
      ? "Revisá los datos enviados."
      : "No se pudo completar la operación.";

    if (error.codigo === "ID_INVALIDO") {
      mensaje = "El identificador debe tener 24 caracteres hexadecimales.";
    }

    console.error("Solicitud fallida:", res.locals.solicitudId, error.name);

    // Si la petición proviene de la API, responder estrictamente con JSON
    if (req.path.startsWith("/api/")) {
      return res.status(estado).json({
        error: mensaje,
        campos: esValidacion ? Object.keys(error.errors) : [],
      });
    }

    // Si fue un POST web que falló, conservar valores y volver al formulario
    if (esValidacion && req.method === "POST") {
      return res.status(400).render(vistaFormulario, {
        titulo: tituloFormulario,
        error: mensaje,
        valores: req.body ?? {},
      });
    }

    // Vista de error general para navegación web
    return res.status(estado).render("no-encontrado", {
      titulo: esEntrada ? "Solicitud inválida" : "Error del servicio",
      mensaje,
    });
  };
}

module.exports = { crearManejadorErrores };
```

---

### 9.5. Matriz de Pruebas y Ensayos con Postman

| Caso de Prueba | Método y URL | Estado HTTP | Evidencia Esperada |
| :--- | :--- | :--- | :--- |
| **Listar antes de crear** | `GET /api/productos` | `200` | Arreglo JSON recuperado de Atlas (puede ser `[]` si es nueva). |
| **Crear producto válido** | `POST /api/productos` | `201` | Objeto con `id` y `disponible: true`. Cabecera `Location`. |
| **Consultar recurso creado** | `GET /api/productos/:id` | `200` | Devuelve exactamente el objeto persistido con el mismo `id`. |
| **ID con formato mal formado** | `GET /api/productos/123` | `400` | JSON con error: *"El identificador debe tener 24 caracteres hexadecimales."* |
| **ID válido pero inexistente** | `GET /api/productos/000000000000000000000000` | `404` | JSON con error: `{"error": "Producto no encontrado."}`. |
| **POST sin cuerpo / campos vacíos** | `POST /api/productos` (`{}`) | `400` | No crea documento. Error de validación. |
| **POST con precio no numérico** | `POST /api/productos` (`precio: "abc"`) | `400` | Rechazo inmediato; no altera la cantidad de documentos. |
| **Filtro categoría existente** | `GET /api/productos?categoria=Cerámica` | `200` | Arreglo solo con coincidencias exactas. |
| **Filtro categoría sin datos** | `GET /api/productos?categoria=Inexistente` | `200` | Arreglo vacío `[]`. |
| **POST desde Formulario Web** | `POST /productos` | `302` | Redirección hacia `/productos`. El nuevo producto aparece en HTML y en la API. |

---

## 10. MATRIZ COMPARATIVA DE EVOLUCIÓN SEMANA A SEMANA (SEMANAS 1 A 8)

| Semana | Enfoque Principal | Manejo de Asincronía | Dónde viven los Datos | Presentación al Usuario | Qué problema resuelve | Nuevo problema que surge |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | Script Único Node.js | Síncrono / Callbacks con `fs` | Variable en el mismo archivo | Archivo de texto plano en disco | Primer acercamiento a I/O en Node | Monolito inmanejable; mezcla formato, datos e I/O |
| **2** | Modularización CommonJS | `Promises` + `async / await` | Archivo `datos/*.json` | Archivo de texto plano formateado | Separa responsabilidades (SRP); código testeable | Es un script batch (corre y muere); no atiende red |
| **3** | Servidor Web con Express | Event Loop persistente (`listen`) | JSON en disco cargado a memoria RAM | Respuestas JSON crudo (API REST) | Permite clientes concurrentes por HTTP | Solo usable por desarrolladores/máquinas, no hay UI |
| **4** | Server-Side Rendering (SSR) | Asincronía de Express | Arreglo en memoria RAM | HTML dinámico con EJS + CSS estático | Interfaz gráfica y navegación web para usuarios | Todo el servidor colapsa en un solo archivo gigante |
| **5** | Pipeline de Middlewares | Callbacks de middleware con `next()` | Arreglo en memoria RAM | EJS con trazabilidad (`solicitudId`) | Desacopla validación y monitoreo; enrutador modular | Código ordenado pero concentrado en un archivo físico |
| **6** | Arquitectura en Capas | Flujo en capas desacopladas | Capa de Servicio independiente | EJS + API JSON desacopladas | Separación Clean: Servicio, Controlador, Middleware | Datos viven en RAM; al reiniciar se pierden las altas |
| **7** | Persistencia NoSQL (MongoDB) | Promesas nativas de Mongoose | Base de datos MongoDB Atlas (Nube) | Scripts de Laboratorio + Web U6 intacta | Persistencia real garantizada; validación de esquemas | Falta conectar los controladores HTTP a la base (U8) |
| **8** | Conexión Integral Express + Mongo | `async / await` total + Error Handler Express 5 | Base de datos MongoDB Atlas (Nube) | Web SSR (EJS) + API RESTful (`201` + `Location`) | Unifica persistencia: la web y la API leen y escriben en Atlas | Autenticación, autorización, borrado/edición y relaciones pendientes |

---

## 11. FLUJOS INTEGRALES PASO A PASO (SEMANA 6 VS UNIDAD 7 VS UNIDAD 8)

### Flujo A: Petición HTTP Web en Memoria (Semana 6 / Conservado en Unidad 7)
1. **Cliente:** Envía `POST /productos` con datos del formulario.
2. **Pipeline Express (`app.js`):** Logger Morgan -> `solicitudId` -> `medirDuracion` -> `express.urlencoded` (parsea body).
3. **Router y Middleware:** `validarProducto` intercepta, limpia y coloca `req.productoValidado`.
4. **Controlador:** Invoca `servicioProductos.crear(req.productoValidado)`.
5. **Servicio:** Realiza `productos.push(...)` sobre el **arreglo en memoria RAM** y calcula ID numérico con `reduce`.
6. **Respuesta:** Controlador emite `res.redirect("/productos")` (Patrón PRG con 302).
7. **Límite:** Si el servidor se apaga, ese producto creado se pierde para siempre.

### Flujo B: Demostración Científica de Persistencia con Scripts (Unidad 7)
1. **Ejecución 1 (`scripts/listar-productos.js`):**
   - Carga variables de entorno con `--env-file=.env`.
   - `conectarBaseDatos()`: Abre socket seguro TLS contra MongoDB Atlas.
   - `Producto.find({})`: Ejecuta consulta BSON; recibe documentos persistidos. Conteo inicial: $N$.
   - `desconectarBaseDatos()` en `finally`: Cierra conexión. **El proceso Node.js finaliza y muere.**
2. **Ejecución 2 (`scripts/crear-producto.js`):**
   - **Nuevo proceso Node.js en frío.** Conecta a Atlas.
   - `Producto.create({ ... })`: Valida esquema y persiste físicamente en Atlas con `_id` de 24 caracteres.
   - Cierra conexión en `finally`. **El proceso finaliza y muere.**
3. **Ejecución 3 (`scripts/listar-productos.js`):**
   - **Tercer proceso independiente en frío.** Recupera documentos y verifica cantidad $N + 1$.
   - **Demostración:** Los datos sobrevivieron a la muerte del proceso de Node.js.

### Flujo C: Petición Web y API con Persistencia Real Asíncrona (Unidad 8)
1. **Arranque del Sistema (`src/index.js`):**
   - Se ejecuta `await conectarBaseDatos()`. Resuelve DNS y abre el **Pool de Conexiones** seguro contra Atlas.
   - Una vez confirmada la conexión, se levanta el servidor web con `app.listen(puerto)`.
2. **Recepción de Solicitud API (`POST /api/productos`):**
   - `express.json()` decodifica el body JSON.
   - `validarProducto` valida tipos de datos y empaqueta `req.productoValidado`.
   - El router API delega en `controlador.crearApi`.
3. **Persistencia en Base de Datos:**
   - El controlador ejecuta `await servicio.crear(req.productoValidado)`.
   - El servicio invoca `await Producto.create(...)`. Mongoose valida el esquema y emite la orden de inserción BSON al clúster de Atlas a través del pool de conexiones existente.
   - Atlas confirma la escritura y genera el `_id`.
   - El servicio mapea con `representarProducto()` devolviendo un objeto con `id` string y `disponible: true`.
4. **Respuesta HTTP RESTful:**
   - El controlador emite `res.location('/api/productos/' + producto.id).status(201).json(producto)`.
   - La conexión con MongoDB **no se cierra**: permanece abierta en el pool lista para la siguiente petición.
5. **Consulta Simultánea desde el Navegador Web (`GET /productos`):**
   - Un usuario entra desde Chrome a `/productos`.
   - El controlador web invoca `await servicio.listar()`.
   - El servicio ejecuta `await Producto.find({}).lean()`, transformando los documentos con `representarProducto`.
   - El controlador recibe el arreglo puro y renderiza con `res.render("productos/lista", { productos })`.
   - El usuario ve inmediatamente en pantalla el producto que acababa de crearse mediante la API.

---

## 12. PREGUNTAS FRECUENTES, TICKET DE SALIDA Y CONCEPTOS CLAVE DE EVALUACIÓN

### P1: ¿Por qué en un servidor Express jamás debemos usar métodos síncronos como `fs.readFileSync`?
**R:** Porque Node.js ejecuta el código JavaScript en un único hilo. Cualquier llamada síncrona bloquea el Call Stack y congela todo el Event Loop. Mientras esa lectura se completa, ninguna otra solicitud de ningún otro usuario puede ser aceptada ni atendida, degradando drásticamente el rendimiento del sistema.

### P2: ¿Qué diferencia conceptual existe entre `req.params`, `req.query` y `req.body`?
- `req.params`: Forma parte de la ruta misma y se usa para identificar un recurso concreto de manera obligatoria (ej: `/productos/10`).
- `req.query`: Viaja en la URL después del signo `?` en pares clave-valor y se usa para modificar, ordenar, paginar o filtrar la vista de una colección (ej: `/productos?categoria=ceramica`).
- `req.body`: Viaja en el cuerpo del paquete HTTP (oculto en la URL) y se usa para enviar cargas de datos estructurados para crear o actualizar recursos (usado en POST/PUT con JSON o formularios).

### P3: ¿Por qué es un error grave ejecutar `next()` después de haber emitido `res.render()` o `res.send()`?
**R:** Porque una solicitud HTTP solo admite **una única respuesta**. Si llamamos a `next()` luego de responder, la solicitud continúa avanzando por la pila de middlewares. Si una función posterior intenta escribir cabeceras o responder de nuevo, Node.js arrojará una excepción irrecuperable: `ERR_HTTP_HEADERS_SENT`.

### P4: ¿Por qué `express.urlencoded` o `express.json` deben colocarse antes de las rutas?
**R:** Porque los datos que vienen por la red llegan como un stream continuo de fragmentos binarios (chunks). Los middlewares de parseo interceptan ese stream, esperan a que termine de llegar, lo decodifican y lo convierten en un objeto de JavaScript disponible en `req.body`. Si una ruta se ejecuta antes que el parser, al intentar leer `req.body` encontrará `undefined`.

### P5: ¿Por qué el servicio (`services/productos.js`) no debe tener acceso a `req` ni `res`?
**R:** Por el principio de **Separación de Responsabilidades** y **Arquitectura Limpia**. La capa de servicio debe representar pura lógica de negocio independiente de cómo se interactúa con ella. Si el servicio dependiera de `req` o `res`, quedaría estrictamente atado al protocolo HTTP y a Express. Al mantenerlo desacoplado, podemos reutilizar exactamente el mismo servicio en una interfaz por consola (CLI), en un bot de mensajería, con WebSockets o en tests unitarios sin simular servidores web.

### P6: ¿Para qué sirve el patrón PRG (Post-Redirect-Get) y qué problema previene?
**R:** Previene el problema de reenvío accidental de formularios. Si respondemos a un `POST` con HTML directamente, al refrescar la página (F5) el navegador intentará reenviar los datos del `POST` (repitiendo transacciones o registros). Al responder con una redirección `302`, el navegador pasa inmediatamente a un `GET` idempotente, permitiendo que el usuario actualice la pantalla con total seguridad.

### P7: ¿Qué es la Inyección de Dependencias y qué ventaja ofrece en la Semana 6?
**R:** Es un patrón de diseño donde un módulo o clase no construye internamente los objetos que necesita, sino que los recibe desde el exterior (generalmente mediante los argumentos de una función fábrica). Permite desacoplar los componentes, facilitando el cambio de implementaciones (por ejemplo, cambiar almacenamiento en memoria por base de datos) y permitiendo sustituir dependencias complejas por simulaciones (mocks) durante la ejecución de pruebas automáticas.

### P8: ¿Qué rol cumple `dns.setServers(["8.8.8.8", "1.1.1.1"])` en la configuración de la base de datos?
**R:** Las cadenas de conexión tipo `mongodb+srv://` requieren que el driver de Node.js realice consultas DNS especiales (registros SRV y TXT) para descubrir los servidores del clúster de Atlas. Si la red local o el proveedor de Internet (ISP) tiene un servidor DNS desactualizado, bloqueado o inestable, la consulta arrojará el error `querySrv ECONNREFUSED`. Forzar explícitamente los servidores DNS públicos de Google (`8.8.8.8`) y Cloudflare (`1.1.1.1`) a nivel del proceso de Node asegura una resolución de nombres limpia y consistente.

### P9: ¿Por qué en un script de base de datos siempre debemos colocar `desconectarBaseDatos()` dentro de un bloque `finally`?
**R:** Porque si ocurre un error inesperado durante una operación (`Producto.create` o `find`), el flujo de ejecución salta inmediatamente al bloque `catch`. Si la instrucción de desconexión estuviera fuera o solo al final del `try`, la conexión quedaría abierta, impidiendo que el Event Loop de Node.js se vacíe y dejando el proceso colgado de forma indefinida en la terminal. El bloque `finally` garantiza su ejecución bajo cualquier circunstancia (éxito o error).

### P10: ¿Por qué en el servidor Express el puerto se abre (`listen`) recién después de conectar a MongoDB?
**R:** Por el principio de **Fail-Fast** (*Fallo Rápido*). Si abriéramos el puerto antes de que la base esté lista, los clientes podrían comenzar a enviar solicitudes HTTP que inevitablemente colapsarían al intentar consultar la base. Al esperar `await conectarBaseDatos()` antes de `app.listen()`, garantizamos que el servidor solo anuncie disponibilidad cuando todos sus recursos críticos estén operativos. Si la base no conecta, el proceso finaliza con código de error sin atender tráfico corrupto.

### P11: ¿Qué problema grave ocurriría si desconectáramos de MongoDB en un bloque `finally` al terminar la función `main()` del servidor?
**R:** El servidor quedaría completamente inutilizado. A diferencia de un script batch (que se conecta, hace una tarea y muere), un servidor Express es un proceso de larga duración que atiende peticiones en el tiempo. Si desconectáramos en `finally`, el socket se cerraría inmediatamente después del arranque; cuando el primer usuario intentara entrar a `/productos`, la consulta fallaría con un error de conexión cerrada (*Topology is closed*). En Express, la conexión debe mantenerse abierta en un **pool de conexiones** y solo cerrarse cuando el proceso recibe una orden explícita de terminación (`SIGINT`/`SIGTERM`).

### P12: ¿En qué se distingue técnicamente un ID con formato inválido de un documento inexistente?
**R:**
- **ID Inválido (`400 Bad Request`):** Viola el formato del tipo de datos (por ejemplo, tiene menos de 24 caracteres hexadecimales como `/productos/123`). Es un error sintáctico del cliente que debe rechazarse de inmediato sin necesidad de consultar el motor de base de datos.
- **Documento Inexistente (`404 Not Found`):** Cumple perfectamente con el formato hexadecimal (ej: 24 ceros), por lo que se envía la consulta a MongoDB, pero el motor responde `null` porque no existe ningún documento con esa clave.

### P13: ¿Por qué el formulario web responde con código `302` mientras que la API responde con `201` y la cabecera `Location`?
**R:** Por la naturaleza de cada cliente:
- En la web, el cliente es un navegador humano: responder con `302` (Patrón PRG) redirige al usuario a un `GET /productos` para que pueda actualizar la pantalla (F5) sin riesgo de reenvío accidental del formulario.
- En la API, el cliente es un software programático (Single Page App, Postman, app móvil): el estándar REST indica que ante una creación exitosa se debe responder con `201 Created`, devolver el objeto creado en JSON y proporcionar en la cabecera `Location: /api/productos/:id` la URL canónica desde donde se puede volver a consultar ese recurso.

### P14: ¿Qué ventajas aporta usar `.lean()` en las consultas de Mongoose y cómo preservamos `producto.id`?
**R:** `.lean()` le ordena a Mongoose omitir la instanciación de documentos complejos y devolver objetos planos de JavaScript (*POJOs*). Esto mejora la velocidad de ejecución y reduce drásticamente el consumo de memoria. Como contrapartida, `.lean()` elimina los getters virtuales (como `.id`). Para preservar la compatibilidad con nuestras plantillas EJS y contratos de API sin depender de virtuales, utilizamos la función `representarProducto`, que transforma explícitamente `_id.toString()` en una propiedad `id` de tipo string.

### P15: ¿Dónde se validan los campos de entrada y dónde se mapean los errores a códigos de estado HTTP?
**R:**
1. **Validación de entrada sintáctica:** Se ejecuta en la capa de **Middleware** (`middleware/productos.js`), saneando tipos y verificando campos antes de llegar al controlador.
2. **Validación de reglas de negocio y persistencia:** Se ejecuta en el **Modelo** (`models/producto.js`) con las restricciones del Schema (`required`, `min`, `trim`).
3. **Mapeo a respuestas HTTP:** Se centraliza en el **Middleware de Errores** (`middleware/errores.js`), que intercepta las excepciones arrojadas (`ValidationError`, `ID_INVALIDO`, `FILTRO_INVALIDO`) y decide el código de estado (`400` o `500`) y el formato (JSON o render HTML) según la procedencia de la petición.

---

## 13. GUÍA DE IMPLEMENTACIÓN PARA EL TP 07 (RESERVAS DE SALAS DE ESTUDIO)

Para comenzar el **TP 07** con éxito, sigue esta lista de comprobación técnica:

```
[TP 06 (Reservas)] ──Copia Limpia──► [tp-07-reservas-mongodb]
                                            │
                                            ├─► Instalar mongoose@9.10.3
                                            ├─► Configurar .env y .env.example (Base: reservas_salas_u7)
                                            ├─► Configurar src/config/entorno.js y base-datos.js
                                            ├─► Crear src/models/reserva.js (Colección: "reservas")
                                            └─► Crear scripts/ (comprobar, validar, crear, listar)
```

1. **Clonación:** Copiar el proyecto `Tp6 - AlejoLeonelMaidana` a una nueva carpeta de trabajo para el TP 07 (sin copiar `node_modules` ni `.git`).
2. **Dependencias:** Ejecutar `npm install mongoose@9.10.3 --save-exact` y `npm install`.
3. **Variables:**
   - Crear `.env` (privado) con `MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/reservas_salas_u7?retryWrites=true&w=majority`.
   - Mantener `.env.example` con marcadores para la entrega.
4. **Módulos de Configuración:**
   - Crear `src/config/entorno.js` con `leerConfiguracion` y `leerUriMongo`.
   - Crear `src/config/base-datos.js` con `conectarBaseDatos` y `desconectarBaseDatos`.
   - En `src/index.js`, actualizar la importación a `./config/entorno`.
5. **Modelo de Reserva (`src/models/reserva.js`):**
   - Declarar el esquema con campos representativos del TP 06: `solicitante`, `sala`, `fecha`, `capacidad` (con `min: 1` y entero), etc.
   - Forzar `{ collection: "reservas" }`.
6. **Scripts de Terminal (`scripts/`):**
   - `comprobar-conexion.js`
   - `validar-reserva.js`
   - `crear-reserva.js`
   - `listar-reservas.js`
7. **Prueba de Calidad y Entrega:**
   - Correr `npm run check` (ESLint + Prettier).
   - Verificar la secuencia reproducible: `listar` -> `crear` -> `listar`.
   - Verificar que `npm start` continúe levantando el servidor web de la Unidad 6 sin modificaciones.

---

## 14. GUÍA DE IMPLEMENTACIÓN PARA EL TP 08 (RESERVAS DE SALAS CON PERSISTENCIA INTEGRAL EN MONGODB)

El **TP 08** traslada todo el aprendizaje de la Unidad 8 al dominio de **Reservas de Salas de Estudio**, integrando completamente la web y la API con MongoDB Atlas.

```
[TP 07 (Reservas Lab)] ──Copia Limpia──► [Tp8 - AlejoLeonelMaidana]
                                                │
                                                ├─► .env (Base: reservas_salas_u8)
                                                ├─► Modelo Reserva (default activa: true)
                                                ├─► Servicio reservas-mongo.js (asíncrono con .lean())
                                                ├─► Controlador reservas.js (async con métodos web y API)
                                                ├─► Rutas separadas: reservas.js (HTML) y reservas-api.js (JSON)
                                                ├─► Middleware errores.js (4 parámetros, API JSON vs HTML)
                                                └─► src/index.js (conecta antes de listen + Graceful Shutdown)
```

### Especificaciones Clave del TP 08:
- **Base de Datos en Atlas:** `reservas_salas_u8` (separada de la U7).
- **Colección:** `reservas`.
- **Alcance Estricto:** Lectura (`GET`) y Creación (`POST`). **No incorpora actualización (PUT/PATCH), borrado (DELETE), paginación ni relaciones.**

---

### Paso a Paso Técnico para el TP 08

#### 1. Preparación de la Carpeta y Dependencias
1. Realizar una copia limpia de `Tp7 - AlejoLeonelMaidana` hacia `Tp8 - AlejoLeonelMaidana` (sin `node_modules` ni `.git`).
2. Ejecutar `npm install`.
3. Configurar `.env` con la base `reservas_salas_u8`:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://USUARIO:CLAVE@cluster0.dm45n08.mongodb.net/reservas_salas_u8?retryWrites=true&w=majority
   ```
4. Actualizar `.env.example` con marcadores públicos.

#### 2. Actualizar el Modelo de Reserva (`src/models/reserva.js`)
Agregar el campo booleano con valor por defecto:
```javascript
const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema(
  {
    solicitante: { type: String, required: true, trim: true },
    sala: { type: String, required: true, trim: true },
    capacidad: { type: Number, required: true, min: 1 },
    fecha: { type: String, required: true, trim: true },
    turno: { type: String, required: true, trim: true },
    activa: { type: Boolean, default: true }, // Default de esquema
  },
  { collection: "reservas" }
);

const Reserva = mongoose.model("Reserva", reservaSchema);
module.exports = { Reserva };
```

#### 3. Crear el Servicio Asíncrono de Mongo (`src/services/reservas-mongo.js`)
```javascript
const mongoose = require("mongoose");
const { Reserva } = require("../models/reserva");

function representarReserva(documento) {
  return {
    id: documento._id.toString(),
    solicitante: documento.solicitante,
    sala: documento.sala,
    capacidad: documento.capacidad,
    fecha: documento.fecha,
    turno: documento.turno,
    activa: documento.activa,
  };
}

function crearServicioReservasMongo() {
  async function listar(sala) {
    const filtro = {};
    if (sala !== undefined) {
      if (typeof sala !== "string" || !sala.trim()) {
        const error = new Error("Sala inválida");
        error.codigo = "FILTRO_INVALIDO";
        throw error;
      }
      filtro.sala = sala.trim();
    }
    const documentos = await Reserva.find(filtro).lean();
    return documentos.map(representarReserva);
  }

  async function obtenerPorId(id) {
    if (!mongoose.isObjectIdOrHexString(id)) {
      const error = new Error("Identificador inválido");
      error.codigo = "ID_INVALIDO";
      throw error;
    }
    const documento = await Reserva.findById(id).lean();
    return documento ? representarReserva(documento) : null;
  }

  async function crear(datos) {
    const documento = await Reserva.create({
      solicitante: datos.solicitante,
      sala: datos.sala,
      capacidad: datos.capacidad,
      fecha: datos.fecha,
      turno: datos.turno,
    });
    return representarReserva(documento);
  }

  return { listar, obtenerPorId, crear };
}

module.exports = { crearServicioReservasMongo };
```

#### 4. Adaptar el Controlador (`src/drivers/reservas.js`)
Asegurarse de que todos los métodos sean `async/await` y añadir los endpoints para la API:
```javascript
function crearControladorReservas(servicio) {
  // --- MÉTODOS WEB (HTML) ---
  async function listar(req, res) {
    const reservas = await servicio.listar();
    res.render("reservas/lista", { titulo: "Reservas de Salas", reservas });
  }

  function mostrarFormulario(req, res) {
    res.render("reservas/nuevo", { titulo: "Nueva Reserva", error: null, valores: {} });
  }

  async function mostrarDetalle(req, res) {
    const reserva = await servicio.obtenerPorId(req.params.id);
    if (!reserva) {
      return res.status(404).render("no-encontrado", {
        titulo: "Reserva no encontrada",
        mensaje: "No existe una reserva con ese identificador.",
      });
    }
    res.render("reservas/detalle", { titulo: `Reserva de ${reserva.solicitante}`, reserva });
  }

  async function crear(req, res) {
    await servicio.crear(req.reservaValidada);
    res.redirect("/reservas"); // 302 PRG
  }

  // --- MÉTODOS API REST (JSON) ---
  async function listarApi(req, res) {
    const reservas = await servicio.listar(req.query.sala);
    res.json(reservas);
  }

  async function obtenerApi(req, res) {
    const reserva = await servicio.obtenerPorId(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada." });
    }
    res.json(reserva);
  }

  async function crearApi(req, res) {
    const reserva = await servicio.crear(req.reservaValidada);
    res.location(`/api/reservas/${reserva.id}`).status(201).json(reserva);
  }

  return {
    listar,
    mostrarFormulario,
    mostrarDetalle,
    crear,
    listarApi,
    obtenerApi,
    crearApi,
  };
}

module.exports = { crearControladorReservas };
```

#### 5. Separación de Rutas (`routes/reservas.js` y `routes/reservas-api.js`)
En `src/routes/reservas-api.js`:
```javascript
const express = require("express");
const { validarReserva } = require("../middleware/reservas");

function crearRouterReservasApi(controlador) {
  const router = express.Router();
  router.get("/", controlador.listarApi);
  router.get("/:id", controlador.obtenerApi);
  router.post("/", validarReserva, controlador.crearApi);
  return router;
}

module.exports = { crearRouterReservasApi };
```

#### 6. Integración en `src/app.js` y Manejador de Errores
- En `src/app.js`, registrar ambos enrutadores y el middleware de errores al final:
  ```javascript
  app.use("/api/reservas", crearRouterReservasApi(controlador));
  app.use("/reservas", crearRouterReservas(controlador));
  
  app.use((req, res) => {
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({ error: "Ruta no encontrada." });
    }
    res.status(404).render("no-encontrado", {
      titulo: "Página no encontrada",
      mensaje: "La dirección solicitada no existe.",
    });
  });

  app.use(
    crearManejadorErrores({
      vistaFormulario: "reservas/nuevo",
      tituloFormulario: "Nueva reserva",
    })
  );
  ```

#### 7. Servidor Principal con Graceful Shutdown (`src/index.js`)
Conectar con `await conectarBaseDatos()` antes de `app.listen()`, y escuchar `SIGINT` / `SIGTERM` para desconectar limpiamente.

#### 8. Comprobación y Entrega
1. `npm run check`: Verificar que pase Prettier y ESLint con cero errores.
2. Iniciar servidor: `npm start` (o `node --env-file=.env src/index.js`).
3. Probar ciclo con Postman:
   - `GET /api/reservas` -> `200` y `[]`.
   - `POST /api/reservas` (con JSON) -> `201 Created` y cabecera `Location`.
   - `GET /api/reservas/:id` -> `200` con el objeto creado.
   - `GET /api/reservas/123` -> `400 Bad Request` ("El identificador debe tener 24 caracteres hexadecimales.").
   - `GET /api/reservas/000000000000000000000000` -> `404 Not Found`.
4. Probar ciclo Web:
   - Navegar a `http://localhost:3000/reservas`.
   - Cargar reserva en el formulario `/reservas/nuevo`.
   - Comprobar redirección `302` y persistencia en la tabla.
   - Detener el servidor con `Ctrl + C`, volver a iniciar y comprobar que los datos siguen existiendo en MongoDB Atlas.


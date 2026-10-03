# GUÍA DEFINITIVA DE ESTUDIO: EVOLUCIÓN DE ARQUITECTURA Y BACKEND (SEMANAS 1 A 6)
**Módulo 3: Desarrollo Back-End con Node.js y Express**

Esta guía está diseñada para preparar de forma integral la evaluación conceptual y técnica de la materia. Más que memorizar sintaxis, este documento explica el **por qué**, el **para qué**, los **fundamentos de diseño**, los **flujos de datos** y el **impacto arquitectónico** de cada decisión tomada desde la Semana 1 hasta la Semana 6.

---

## ÍNDICE GENERAL
1. [Visión General y el Sentido de la Evolución](#1-visión-general-y-el-sentido-de-la-evolución)
2. [Semana 1: Node.js, Runtime, Event Loop y Script Monolítico](#2-semana-1-nodejs-runtime-event-loop-y-script-monolítico)
3. [Semana 2: Modularización CommonJS, Asincronía Moderna y NPM](#3-semana-2-modularización-commonjs-asincronía-moderna-y-npm)
4. [Semana 3: Paradigma Servidor, Protocolo HTTP y Express (APIs REST/JSON)](#4-semana-3-paradigma-servidor-protocolo-http-y-express-apis-restjson)
5. [Semana 4: Server-Side Rendering (EJS), Formularios y Patrón PRG](#5-semana-4-server-side-rendering-ejs-formularios-y-patrón-prg)
6. [Semana 5: Pipeline de Middlewares, Trazabilidad y Enrutador Modular](#6-semana-5-pipeline-de-middlewares-trazabilidad-y-enrutador-modular)
7. [Semana 6: Arquitectura en Capas, Inyección de Dependencias y Buenas Prácticas](#7-semana-6-arquitectura-en-capas-inyección-de-dependencias-y-buenas-prácticas)
8. [Matriz Comparativa de Evolución Semana a Semana](#8-matriz-comparativa-de-evolución-semana-a-semana)
9. [Flujo Integral Paso a Paso de una Petición (Semana 6)](#9-flujo-integral-paso-a-paso-de-una-petición-semana-6)
10. [Preguntas Frecuentes y Conceptos Clave de Evaluación](#10-preguntas-frecuentes-y-conceptos-clave-de-evaluación)

---

## 1. VISIÓN GENERAL Y EL SENTIDO DE LA EVOLUCIÓN

A lo largo de las 6 semanas, el código no cambió por capricho ni por usar herramientas de moda. Cada cambio respondió a una **fuerza impulsora**: un problema concreto que surgía a medida que aumentaba la complejidad del software.

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
      Resultado: Separación total de responsabilidades (Clean / Layered), código 100% desacoplado y testeable.
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

## 8. MATRIZ COMPARATIVA DE EVOLUCIÓN SEMANA A SEMANA

| Semana | Enfoque Principal | Manejo de Asincronía | Dónde viven los Datos | Presentación al Usuario | Qué problema resuelve | Nuevo problema que surge |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | Script Único Node.js | Síncrono / Callbacks con `fs` | Variable en el mismo archivo | Archivo de texto plano en disco | Primer acercamiento a I/O en Node | Monolito inmanejable; mezcla formato, datos e I/O |
| **2** | Modularización CommonJS | `Promises` + `async / await` | Archivo `datos/*.json` | Archivo de texto plano formateado | Separa responsabilidades (SRP); código testeable | Es un script batch (corre y muere); no atiende red |
| **3** | Servidor Web con Express | Event Loop persistente (`listen`) | JSON en disco cargado a memoria RAM | Respuestas JSON crudo (API REST) | Permite clientes concurrentes por HTTP | Solo usable por desarrolladores/máquinas, no hay UI |
| **4** | Server-Side Rendering (SSR) | Asincronía de Express | Arreglo en memoria RAM | HTML dinámico con EJS + CSS estático | Interfaz gráfica y navegación web para usuarios | Todo el servidor colapsa en un solo archivo gigante |
| **5** | Pipeline de Middlewares | Callbacks de middleware con `next()` | Arreglo en memoria RAM | EJS con trazabilidad (`solicitudId`) | Desacopla validación y monitoreo; enrutador modular | Código ordenado pero concentrado en un archivo físico |
| **6** | Arquitectura en Capas | Flujo en capas desacopladas | Capa de Servicio independiente | EJS + API JSON desacopladas | Separación Clean: Servicio, Controlador, Middleware | Requiere mayor disciplina y diseño inicial |

---

## 9. FLUJO INTEGRAL PASO A PASO DE UNA PETICIÓN (SEMANA 6)

### Caso de Estudio: El usuario envía el formulario para crear un nuevo producto (`POST /productos`)

Este es el recorrido exacto que debes explicar si en la evaluación te piden describir el ciclo de vida de una solicitud:

1. **Llegada del paquete al puerto:**
   El navegador envía una petición HTTP con el método `POST`, ruta `/productos`, cabecera `Content-Type: application/x-www-form-urlencoded` y en el cuerpo los valores codificados del formulario.
2. **Inicio en la App (Middlewares Globales en `src/app.js`):**
   - `morgan(formatoRegistro)`: Observa la entrada de la petición (método y URL).
   - `crearIdentificadorSolicitud()`: Incrementa el contador y asigna un identificador a la solicitud en `res.locals.solicitudId = "SOL-0005"`. Llama a `next()`.
   - `medirDuracion`: Captura el tiempo inicial de alta precisión (`process.hrtime.bigint()`), suscribe el callback para el evento `res.on("finish")` y llama a `next()`.
   - `expressLayouts`: Configura la compatibilidad de plantillas maestras y llama a `next()`.
   - `express.static`: Comprueba si `/productos` coincide con un archivo estático en `public/`. Como no coincide, pasa con `next()`.
   - `express.urlencoded({ extended: false })`: **Punto crítico**. Lee el flujo de bytes del body y construye el objeto `req.body` con las propiedades `{ nombre, categoria, precio, descripcion }`. Llama a `next()`.
   - `express.json()`: Comprueba si el contenido es JSON. Al no serlo, pasa con `next()`.
3. **Enrutamiento por Prefijo:**
   Express comprueba `app.use("/productos", productosRouter)`. La URL coincide con el prefijo `/productos`. El control se transfiere al router `crearRouterProductos`.
4. **Middlewares del Router (`src/routes/productos.js`):**
   - `router.use(prepararAreaProductos)`: Se ejecuta para cualquier petición en esta sección. Define `res.locals.seccion = "Productos artesanales"`. Llama a `next()`.
5. **Enrutamiento Específico de la Ruta:**
   Coincide con `router.post("/", validarProducto, controladorProductos.crear)`.
6. **Middleware de Validación (`src/middleware/productos.js`):**
   - Se ejecuta `validarProducto(req, res, next)`.
   - Extrae los campos de `req.body`, aplica `.trim()`, castea el precio a número y evalúa las condiciones.
   - **Rama de Error:** Si algún campo falta o el precio es inválido, responde de inmediato con `res.status(400).render("productos/nuevo", { error, valores: req.body })`. **Aquí terminaría el flujo**.
   - **Rama de Éxito:** Empaqueta los valores ya limpios en un objeto especial: `req.productoValidado = { nombre, categoria, precio, descripcion }` y ejecuta `next()`.
7. **Controlador (`src/drivers/productos.js`):**
   - Se ejecuta `controladorProductos.crear(req, res)`.
   - El controlador no manipula arrays ni sabe cómo se guarda el producto. Simplemente invoca a la capa de dominio:
     `servicioProductos.crear(req.productoValidado);`
   - El controlador emite la respuesta al navegador aplicando el patrón PRG:
     `res.redirect("/productos");` (envía un código de estado 302 con la cabecera `Location: /productos`).
8. **Finalización y Disparo de Eventos:**
   - La respuesta HTTP sale del servidor hacia el cliente.
   - La conexión del socket concluye y emite el evento `"finish"`.
   - Se activa el listener registrado en el paso 2 por `medirDuracion`: calcula los milisegundos transcurridos y muestra en consola:
     `[SOL-0005] POST /productos 302 3.42 ms`
   - Morgan muestra su propio log técnico.
9. **Ciclo Siguiente en el Cliente:**
   El navegador recibe la respuesta 302 y automáticamente realiza una nueva petición limpia: `GET /productos`, listando los productos actualizados sin riesgo de reenvío duplicado.

---

## 10. PREGUNTAS FRECUENTES Y CONCEPTOS CLAVE DE EVALUACIÓN

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

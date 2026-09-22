# Trabajo práctico 05 - Pipeline de middleware en Express

## Descripción
Este proyecto implementa una aplicación web integral en **Node.js** y **Express** para la gestión y reserva temporal de salas de estudio en un ámbito universitario/bibliotecario.

---

## Instalación
Para clonar e instalar las dependencias necesarias:

```bash
git clone <URL_DEL_REPOSITORIO>
cd tp-05-salas-middleware
npm install
```

Las dependencias principales instaladas en `package.json` son:
- `express`: Framework HTTP para Node.js.
- `ejs`: Motor de plantillas dinámicas.
- `express-ejs-layouts`: Soporte para layouts principales reutilizables.
- `morgan`: Logger HTTP de terceros para desarrollo.

---

## Ejecución
Para verificar la sintaxis del archivo principal sin iniciar el servidor:
```bash
npm run check
```

Para iniciar el servidor en modo normal:
```bash
npm start
```
El servidor quedará disponible en: [http://localhost:3000](http://localhost:3000).

---

## Rutas
El contrato de rutas del sistema se compone de los siguientes puntos de entrada:

| Método | Ruta | Finalidad / Comportamiento |
|---|---|---|
| `GET` | `/` | **Inicio**: Explica el propósito del sitio, presenta las salas y brinda enlaces al listado y al formulario. |
| `GET` | `/estado` | **Estado del servicio**: Responde un objeto JSON con `{ "servicio": "activo", "reservas": N, "solicitudId": "BIB-XXXX" }`. No depende de la variable de sección del router. |
| `GET` | `/reservas` | **Listado**: Muestra todas las reservas registradas, ofrece enlaces de detalle y nueva reserva, y provee un estado vacío alternativo si no hay datos. |
| `GET` | `/reservas/nueva` | **Formulario**: Renderiza el formulario de alta con controles etiquetados (`id` y `name`), validaciones y preservación de datos en caso de error 400. Declarada antes de `GET /reservas/:id`. |
| `GET` | `/reservas/:id` | **Detalle**: Busca la reserva por identificador numérico y muestra su información completa. Si no existe, devuelve 404 con plantilla HTML. |
| `POST` | `/reservas` | **Procesamiento de alta**: Pasa primero por el validador `validarReserva` (responde 400 si hay errores) y luego por `crearReserva` (guarda en memoria y redirige con código 302). |

---

## Pipeline de middleware

### Orden de ejecución global
El orden en que se registran los middlewares en Express determina el flujo exacto que atraviesa cada solicitud:

1. `morgan("dev")` *(Terceros)*: Observa y registra en consola el método, URL, código de estado y tiempo de respuesta de cada petición.
2. `identificarSolicitud` *(Personalizado global)*: Incrementa el contador consecutivo y asigna un identificador único con prefijo `BIB-XXXX` a `res.locals.solicitudId`.
3. `medirDuracion` *(Personalizado global)*: Registra la marca de tiempo de entrada con `process.hrtime.bigint()` y añade un listener al evento `finish` del objeto `res` para calcular e imprimir los milisegundos reales transcurridos cuando la respuesta se completa.
4. `expressLayouts` *(Terceros)*: Configura el envoltorio del layout principal (`views/layouts/main.ejs`).
5. `express.static` *(Incorporado)*: Sirve los archivos estáticos desde la carpeta `public/` (como `public/css/estilos.css`).
6. `express.urlencoded({ extended: false })` *(Incorporado)*: Parsea cuerpos de formularios HTML codificados en URL y puebla `req.body`.
7. `express.json()` *(Incorporado)*: Parsea cuerpos con formato JSON y puebla `req.body`.
8. **Rutas de la aplicación**: `GET /` y `GET /estado`.
9. **Router de reservas** (`reservasRouter` montado bajo `/reservas`): Aplica `prepararAreaReservas` y maneja las subrutas `/`, `/nueva`, `/:id` y el método `POST /`.
10. **Middleware 404** *(Personalizado global)*: Se ubica al final de todas las rutas y routers para capturar cualquier solicitud no resuelta y responder con código de estado 404 y vista HTML `no-encontrado.ejs`.

---

## Alcance de cada función

| Nombre de la función | Tipo | Alcance | Justificación |
|---|---|---|---|
| `morgan("dev")` | De terceros | Global (Aplicación) | Se aplica a todas las peticiones entrantes para registrar métricas técnicas de acceso. |
| `identificarSolicitud` | Personalizado | Global (Aplicación) | Provee un ID correlativo a cualquier solicitud para trazabilidad y disponibilidad en todas las vistas vía `res.locals`. |
| `medirDuracion` | Personalizado | Global (Aplicación) | Mide el tiempo total desde que ingresa la solicitud hasta que emite `finish`. Requiere el ID generado previamente. |
| `expressLayouts` | De terceros | Global (Aplicación) | Asegura que todas las vistas renderizadas utilicen el layout unificado. |
| `express.static` | Incorporado | Global (Aplicación) | Provee acceso público a estilos e imágenes sin restricción de prefijo. |
| `express.urlencoded` / `express.json` | Incorporado | Global (Aplicación) | Procesan el cuerpo de las peticiones para que `req.body` esté listo antes de cualquier validador o handler. |
| `prepararAreaReservas` | Personalizado | Router (`/reservas`) | Asigna `res.locals.seccion = "Reservas de salas"`. Solo afecta a las rutas agrupadas bajo el router de reservas; no contamina rutas raíz o de API como `/estado`. |
| `validarReserva` | Personalizado | De ruta (`POST /`) | Valida de manera estricta los campos del formulario antes del guardado. Si hay error responde 400; si es válido pasa el control mediante `next()`. |
| `crearReserva` | Handler de ruta | De ruta (`POST /`) | Asigna el nuevo ID, guarda la reserva en memoria y envía una redirección 302 hacia `/reservas`. |
| Middleware 404 | Personalizado | Global (Final) | Captura cualquier petición que no coincidió con ninguna ruta anterior y emite la respuesta de error 404. |

---

## Validación
El middleware `validarReserva` implementa las siguientes reglas del negocio del lado del servidor (las cuales no dependen de las validaciones HTML del cliente):

1. **Normalización de cadenas**: Aplica `trim()` a los campos `estudiante`, `email`, `sala`, `fecha` y `turno`.
2. **Conversión numérica**: Transforma `req.body.personas` mediante `Number(personas)`.
3. **Comprobación de obligatoriedad**: Verifica que ningún campo se encuentre vacío o ausente.
4. **Validación de pertenencia de sala**: Comprueba que la sala elegida pertenezca a `salasPermitidas` (`["Sala Norte", "Sala Sur", "Sala Multimedia"]`).
5. **Validación de pertenencia de turno**: Comprueba que el turno pertenezca a `["Mañana", "Tarde", "Noche"]`.
6. **Rango numérico y tipo**: Valida que `personas` sea un entero (`Number.isInteger`) comprendido entre 1 y 6.
7. **Formato básico de email**: Verifica la existencia del caracter `@`.
8. **Respuesta ante error**: Responde con código de estado HTTP `400 (Bad Request)`, renderiza la vista `reservas/nueva`, preserva los valores ingresados en `valores: req.body` y expone un mensaje descriptivo con `role="alert"`.
9. **Respuesta ante éxito**: Construye el objeto saneado `req.reservaValidada` y llama a `next()` para ceder el control al handler `crearReserva`.

---

## Pruebas manuales
Matriz de verificación de casos implementados en el servidor:

| Caso | Método / Ruta | Estado esperado | Evidencia observable |
|---|---|:---:|---|
| **Inicio** | `GET /` | 200 | Carga la página de inicio con propósito, presentación de salas, enlaces y ID en el pie (`BIB-0001`). |
| **Estado** | `GET /estado` | 200 | Responde JSON con `{ "servicio": "activo", "reservas": 4, "solicitudId": "BIB-XXXX" }`. |
| **Listado** | `GET /reservas` | 200 | Renderiza el listado con las 4 reservas iniciales y el badge de sección "Reservas de salas". |
| **Estado vacío** | `GET /reservas` | 200 | Si la lista en memoria queda sin elementos, muestra el mensaje alternativo y botón a nueva reserva. |
| **Formulario** | `GET /reservas/nueva` | 200 | Muestra el formulario con labels explícitos asociados por `id` y `name`, selectores y botón de envío. |
| **Detalle válido** | `GET /reservas/1` | 200 | Muestra los datos completos de la reserva #1 (estudiante, email, sala, fecha, turno, personas). |
| **Detalle inexistente** | `GET /reservas/999` | 404 | Renderiza la página HTML de error informando que no existe la reserva indicada. |
| **Campos vacíos** | `POST /reservas` | 400 | Renderiza formulario con mensaje `role="alert"` indicando campos obligatorios y conserva valores. |
| **Sala no permitida** | `POST /reservas` | 400 | Rechaza el alta si se envía una sala que no figure en `salasPermitidas`. |
| **Turno no permitido** | `POST /reservas` | 400 | Rechaza el alta si el turno no es Mañana, Tarde o Noche. |
| **Email sin @** | `POST /reservas` | 400 | Rechaza la solicitud indicando que el correo debe contener `@`. |
| **Personas = 0** | `POST /reservas` | 400 | Rechaza el alta informando que la capacidad mínima es 1 persona. |
| **Personas = 7** | `POST /reservas` | 400 | Rechaza el alta informando que la capacidad máxima es 6 personas. |
| **Reserva válida** | `POST /reservas` | 302 y luego 200 | Redirige a `/reservas` (302) y luego la nueva reserva aparece listada en una tarjeta (200). |
| **URL inexistente** | `GET /no-existe` | 404 | El middleware final captura la ruta y renderiza `no-encontrado.ejs` con estado 404. |
| **Reinicio** | `npm start` | 200 | Al reiniciar la aplicación, las altas realizadas se descartan y se restablecen las 4 iniciales. |

---

## Persistencia temporal
Los datos se administran exclusivamente mediante una estructura en memoria (un array JavaScript en el archivo `src/index.js`). No se realiza escritura sobre el disco rígido ni bases de datos. Al reiniciar el proceso de Node.js, la memoria se reinicia y se recuperan de manera predecible las cuatro reservas iniciales definidas.

---

## Preguntas teóricas y justificaciones conceptuales

### 1. Diferencia entre middleware incorporado, de terceros y personalizado
- **Middleware incorporado**: Es aquel provisto de fábrica por el núcleo de Express, como `express.static`, `express.urlencoded` o `express.json`. No requieren instalar paquetes externos adicionales.
- **Middleware de terceros**: Es desarrollado por la comunidad u organizaciones externas e instalado a través de `npm` (por ejemplo `morgan` o `express-ejs-layouts`). Provee funcionalidades especializadas que no vienen incluidas en el core mínimo de Express.
- **Middleware personalizado**: Es una función escrita por los propios desarrolladores(nosotros) de la aplicación para cubrir necesidades particulares de lógica de negocio o infraestructura (como `identificarSolicitud`, `medirDuracion` o `validarReserva`), recibiendo típicamente `(req, res, next)`.

### 2. Cuándo se utiliza `next()`
La función `next()` se invoca cuando un middleware completó su tarea de inspección, preparación o mutación de datos (por ejemplo sobre `req` o `res.locals`) y **desea ceder el flujo de ejecución al siguiente middleware o handler aplicable** en la pila de Express. No debe llamarse a `next()` si el middleware ya emitió una respuesta terminal (con `res.send`, `res.render`, `res.json` o `res.redirect`), ya que provocaría una doble respuesta y un error de cabeceras ya enviadas (`ERR_HTTP_HEADERS_SENT`).

### 3. Por qué los parsers aparecen antes de la validación
`express.urlencoded` y `express.json` son responsables de recibir los flujos de bytes que llegan en el cuerpo (body) de las peticiones HTTP, interpretarlos según su encabezado `Content-Type` y transformarlos en un objeto JavaScript accesible en `req.body`. Si los parsers se registraran después de un middleware como `validarReserva`, al momento en que el validador intentase examinar `req.body`, este aún sería `undefined`, produciendo un error fatal o una validación fallida incorrecta.

### 4. Diferencia entre alcance global, de router y de ruta
- **Alcance global (de aplicación)**: Registrado con `app.use(...)`. Toda petición que ingrese a la aplicación atravesará este middleware, sin importar el método ni la URL (a menos que una función previa haya terminado el ciclo).
- **Alcance de router**: Registrado con `router.use(...)`. Solo se ejecuta para aquellas solicitudes cuya URL coincida con el prefijo donde dicho router fue montado (por ejemplo `/reservas`), permitiendo aislar variables y comportamientos a un área específica del sitio.
- **Alcance de ruta concreta**: Declarado dentro de la definición de una ruta específica, como `router.post("/", validarReserva, crearReserva)`. Solo participa si tanto el método HTTP (`POST`) como el endpoint exacto coinciden.

### 5. Motivo del evento `finish`
En Express, la llamada a `next()` en un middleware de inicio entrega el control hacia adelante de inmediato. Si intentáramos calcular el tiempo transcurrido en la línea siguiente a `next()`, obtendríamos un valor cercano a 0 ms porque los handlers posteriores y el renderizado aún no habrían concluido. El evento `finish` es emitido por el objeto nativo de respuesta HTTP (`res`) exactamente cuando todos los datos y cabeceras fueron efectivamente enviados al cliente. Escuchar `res.on("finish", ...)` nos permite calcular la duración total real de la solicitud y conocer el código de estado definitivo (`res.statusCode`).

### 6. Resultado del montaje del router
Al utilizar `app.use("/reservas", reservasRouter)`, Express compone las rutas declaradas de forma relativa dentro del router anteponiéndoles el prefijo `/reservas`. De este modo:
- Un handler definido como `router.get("/")` responde a `GET /reservas`.
- Un handler definido como `router.get("/nueva")` responde a `GET /reservas/nueva`.
- Un handler definido como `router.get("/:id")` responde a `GET /reservas/:id`.
Esto modulariza la aplicación y evita duplicar prefijos de manera redundante (evitando rutas erróneas como `/reservas/reservas`).

### 7. Diferencia entre el POST 302 y el GET posterior
El patrón utilizado se conoce como **PRG (Post/Redirect/Get)**:
- El `POST /reservas` recibe los datos del formulario, los valida y los procesa (modificando el estado del sistema en memoria). Al finalizar, en lugar de renderizar directamente una vista, responde con una redirección HTTP `302 (Found)` con la cabecera `Location: /reservas`.
- El navegador, al recibir el 302, emite de forma automática una nueva solicitud `GET /reservas` hacia el listado.
Esta separación es fundamental para la experiencia del usuario, ya que si el usuario recarga la página (`F5`), solo repetirá la solicitud `GET` de consulta, evitando el reenvío accidental del formulario y la duplicación involuntaria de reservas.

### 8. Motivo por el cual las altas desaparecen al reiniciar
La persistencia de este trabajo práctico reside exclusivamente en la memoria de acceso aleatorio (RAM) asignada al proceso de Node.js donde vive el arreglo `reservas`. Dado que la memoria RAM es volátil y no se implementó un almacenamiento persistente en disco (como archivos JSON o un motor de base de datos), cuando el proceso de Node.js finaliza o se reinicia, el espacio de memoria se libera. Al iniciar una nueva instancia con `npm start`, el script se ejecuta desde cero y vuelve a instanciar el arreglo con sus cuatro elementos iniciales predeterminados.

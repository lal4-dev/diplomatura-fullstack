# Trabajo práctico 04

## Descripción
Aplicación web desarrollada con **Node.js**, **Express** y el motor de plantillas **EJS** (junto con `express-ejs-layouts`) orientada a la gestión y consulta de **Mascotas en Adopción**.

La aplicación permite:
- Cargar un catálogo inicial de mascotas desde un archivo JSON local de forma asíncrona antes de iniciar el servidor.
- Explorar el listado completo de mascotas disponibles en una grilla responsiva con tarjetas informativas.
- Contemplar el estado vacío cuando no existan mascotas registradas.
- Visualizar el detalle individual de cada mascota con su información completa y recursos gráficos.
- Responder con una página HTML 404 personalizada cuando se solicita un identificador inexistente.
- Agregar temporalmente nuevos registros mediante un formulario web con validación del lado del servidor y preservación de datos ante errores.
- Servir recursos estáticos (estilos CSS, imágenes vectoriales SVG y scripts de cliente).

---

## Instalación
1. Clonar el repositorio o descargar el código fuente en su equipo.
2. Abrir una terminal en el directorio raíz del proyecto (`tp-04-mascotas-ejs` o la carpeta del TP).
3. Instalar las dependencias de Node.js requeridas:
```bash
npm install
```

---

## Ejecución
Para iniciar el servidor web:
```bash
npm start
```
La aplicación quedará disponible en el navegador en la dirección:
`http://localhost:3000`

Para verificar la sintaxis de los archivos JavaScript principales sin iniciar el servidor:
```bash
npm run check
```

---

## Páginas y rutas
La aplicación cuenta con el siguiente contrato de rutas:

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/` | **Página de inicio**: Bienvenida, presentación del sitio y enlace visible al catálogo. |
| `GET` | `/mascotas` | **Catálogo general**: Lista de mascotas en adopción organizadas en tarjetas. Muestra un mensaje alternativo en caso de catálogo vacío. |
| `GET` | `/mascotas/nueva` | **Formulario de registro**: Formulario para cargar una nueva mascota. Se declara antes de la ruta parametrizada para evitar colisiones de coincidencia. |
| `GET` | `/mascotas/:id` | **Detalle de mascota**: Busca por identificador numérico y muestra todos los atributos de la mascota. Devuelve código de estado `404` si el ID no existe. |
| `POST` | `/mascotas` | **Procesamiento de formulario**: Valida los datos recibidos, genera un nuevo ID en caso de éxito, agrega la mascota a la colección en memoria y redirige a `/mascotas`. En caso de error, responde con estado `400` y conserva los valores previos. |

---

## Estructura de vistas
La interfaz de usuario está modularizada mediante **EJS** y **express-ejs-layouts**:

```text
views/
|-- layouts/
|   `-- main.ejs          # Marco HTML general (doctype, head, navbar, contenedor principal y footer)
|-- partials/
|   |-- encabezado.ejs    # Barra de navegación compartida con enlaces a inicio, catálogo y formulario
|   `-- pie.ejs           # Pie de página institucional compartido
|-- mascotas/
|   |-- lista.ejs         # Grilla de mascotas con condicional para estado vacío
|   |-- detalle.ejs       # Ficha técnica detallada de una mascota
|   `-- nueva.ejs         # Formulario de alta con soporte de mensajes de error accesibles
|-- inicio.ejs            # Vista de bienvenida (hero)
`-- no-encontrado.ejs     # Vista de error 404 cuando no se encuentra un recurso
```

### Diferencia entre Layout, Vista y Parcial
- **Layout (`layouts/main.ejs`)**: Es la plantilla estructural o marco exterior compartido por todas las páginas del sitio. Define elementos globales como `<!doctype html>`, `<head>`, metadatos, hojas de estilo, scripts generales y la posición donde se inyectará el contenido variable de cada página mediante el marcador sin escapar `<%- body %>`.
- **Vista (`views/inicio.ejs`, `views/mascotas/lista.ejs`, etc.)**: Es la plantilla que representa el contenido principal y específico de una ruta particular. Cada vista se enfoca exclusivamente en la información de su página y es renderizada dentro del layout asignado.
- **Parcial (`partials/encabezado.ejs`, `partials/pie.ejs`)**: Es un fragmento reutilizable de HTML/EJS que encapsula un componente visual repetitivo (como el encabezado de navegación o el pie de página). Se incluye en el layout o en las vistas mediante la instrucción `<%- include("ruta") %>`, evitando duplicación de código.

### Datos enviados a una vista mediante `res.render`
El método `res.render(vista, [datos])` toma el nombre de una plantilla EJS y un objeto de JavaScript con propiedades. Express y el motor EJS convierten cada propiedad de dicho objeto en una **variable local accesible directamente dentro de la plantilla**.
- Todos los datos provenientes de usuarios o colecciones se imprimen de forma escapada utilizando `<%= variable %>`, lo cual convierte caracteres especiales (`<`, `>`, `&`, `"`, `'`) en entidades HTML seguras para prevenir vulnerabilidades de Cross-Site Scripting (XSS).
- La salida sin escapar `<%- ... %>` se reserva exclusivamente para insertar fragmentos de HTML confiables y controlados por la aplicación, como `<%- body %>` en el layout o las inclusiones de parciales `<%- include(...) %>`.

---

## Recursos estáticos
Los recursos estáticos se encuentran en la carpeta `public/` y se sirven a través del middleware:
```javascript
app.use(express.static(path.join(__dirname, "..", "public")));
```

### URLs públicas servidas
- `/css/estilos.css`: Hoja de estilos con variables CSS, tipografía legible, grilla adaptable, diseño de tarjetas, botones, estados `:hover`, indicadores de foco accesible (`:focus-visible`), badges de estado y diseño móvil adaptativo.
- `/img/mascota.svg`: Ilustración vectorial SVG propia y accesible utilizada como recurso gráfico para las mascotas y la marca.
- `/js/app.js`: Script de cliente que imprime `"Recursos estáticos cargados"` en la consola del navegador.

> **Importante:** La carpeta física `public` actúa como raíz del servidor de archivos estáticos; por tanto, las URLs no deben incluir el prefijo `/public` (ejemplo correcto: `/css/estilos.css`).

### Función de `express.static`
`express.static` es un middleware integrado de Express que expone los archivos de un directorio del sistema de archivos directamente al navegador como recursos estáticos (CSS, imágenes, JavaScript de cliente, fuentes). Cuando un cliente realiza una solicitud HTTP cuya ruta coincide con un archivo dentro de esa carpeta pública, Express lo devuelve inmediatamente con el tipo de contenido (MIME type) y código 200 correspondientes, sin necesidad de declarar rutas manuales.

---

## Formulario
El formulario para registrar una nueva mascota (`GET /mascotas/nueva`) cuenta con campos etiquetados mediante `<label for="...">` e `<input id="..." name="...">`:
- **Nombre**: campo de texto.
- **Especie**: campo de texto (ej. Perro, Gato, Ave).
- **Edad**: campo numérico entero (`min="0"`).
- **Estado**: selector desplegable (`<select>`) con las tres opciones permitidas: `En adopción`, `Reservada` o `Adoptada`.
- **Descripción**: área de texto (`<textarea>`) para una breve reseña.

### Función de `express.urlencoded`
Los formularios HTML tradicionales envían su información codificada en formato `application/x-www-form-urlencoded` en el cuerpo de la petición HTTP. El middleware `express.urlencoded({ extended: false })` intercepta estas peticiones entrantes, decodifica los pares clave-valor y los transforma en un objeto accesible dentro del controlador a través de `req.body`.

### Recorrido POST, redirección y GET (Patrón Post/Redirect/Get)
1. **Envío (POST)**: El usuario completa el formulario y envía los datos mediante una solicitud `POST /mascotas`.
2. **Validación en el servidor**: Se comprueba que ningún campo esté vacío, que el estado pertenezca a los permitidos y que la edad sea un número válido mayor o igual a 0.
   - *Si hay error*: El servidor responde con código de estado **`400 Bad Request`**, renderizando nuevamente la vista del formulario con un mensaje de alerta accesible (`role="alert"`) y conservando los valores previamente cargados para que el usuario no tenga que reescribirlos.
   - *Si los datos son válidos*: Se genera un nuevo ID consecutivo, se asigna la imagen estática `/img/mascota.svg`, se incorpora la mascota al arreglo en memoria y el servidor envía una respuesta de **redirección HTTP 302** hacia `/mascotas`.
3. **Consulta (GET)**: Al recibir el código 302, el navegador emite automáticamente una solicitud `GET /mascotas`, solicitando el listado actualizado.

> Este patrón evita que el usuario reenvié accidentalmente los datos del formulario si refresca la página (F5) en el navegador, separando limpiamente la acción de mutación del despliegue de resultados.

---

## Persistencia de los datos
Los datos iniciales se leen desde el archivo `datos/mascotas.json` al arrancar la aplicación y se almacenan en una variable en memoria (un array en JavaScript).

### Motivo por el cual el nuevo registro desaparece al reiniciar
Las nuevas mascotas agregadas a través del formulario se insertan únicamente en el arreglo en memoria mediante el método `.push()`. Por especificación y consigna del trabajo práctico:
- **No se escribe ni modifica el archivo `datos/mascotas.json`**.
- La memoria RAM del proceso de Node.js es volátil: cuando el servidor se detiene o se reinicia (por ejemplo, al detener el proceso en la terminal), el estado en memoria se destruye. Al volver a iniciar con `npm start`, la aplicación vuelve a leer el archivo JSON original, restaurando el catálogo a los 5 registros iniciales.

# Trabajo práctico 06: Refactorización modular de reservas

> **Módulo 3:** Desarrollo back-end con Node.js y Express  
> **Estudiante:** Alejo Leonel Maidana  
> **Dominio:** Reservas de salas de estudio (Biblioteca Universitaria)

---

## 1. Proyecto de partida y cambios

El punto de partida de este trabajo es el **TP 05**, el cual concentraba la totalidad de la lógica en un único archivo monolítico (`index.js` de más de 230 líneas). Aunque en el TP 05 ya se implementaban middlewares y enrutadores modulares, las responsabilidades de configuración, infraestructura de servidor, validaciones, lógica de dominio y renderizado convivían acopladas en el mismo archivo.

### Principales cambios:
- **Desacoplamiento en capas**
- **Inyección de dependencias** 
- **Aislamiento del dominio:** 
- **Configuración externa**
- **Calidad de código**
- **Paridad funcional total**
---

## 2. Instalación y ejecución

### Prerrequisitos
- Node.js versión 20 o superior
- npm versión 10 o superior

### Instalación de dependencias
```bash
npm install
```

---

## 3. Configuración del entorno

La configuración se gestiona en `src/configuracion.js` mediante la función `leerConfiguracion(entorno = process.env)`:

- **`PORT`**: Puerto TCP de escucha.
  
- **`NODE_ENV`**: Define el entorno de ejecución.
  - En `development` (o por defecto), Morgan registra las peticiones con formato conciso (`dev`).
  - En `production`, Morgan utiliza el formato estándar ampliado (`combined`).

### Archivos de entorno
- **`.env.example`** (versionado en Git): Contiene la plantilla de configuración sin secretos:
  ```env
  PORT=3000
  NODE_ENV=development
  ```
- **`.env`** (ignorado por `.gitignore`): Archivo local para desarrollo.
- **`.gitignore`**: Excluye explícitamente `node_modules/` y `.env`.

---

## 4. Mapa de módulos y dependencias

```text
tp-06-salas-modular/
|-- public/
|   `-- css/
|       `-- estilos.css              # Hoja de estilos CSS compartida
|-- views/
|   |-- inicio.ejs                   # Vista principal de la biblioteca
|   |-- no-encontrado.ejs            # Vista de error 404
|   |-- layouts/
|   |   `-- main.ejs                 # Layout base (header, nav, main, footer)
|   |-- partials/
|   |   |-- header.ejs               # Encabezado reutilizable
|   |   `-- footer.ejs               # Pie de página reutilizable
|   `-- reservas/
|       |-- lista.ejs                # Grilla de reservas registradas
|       |-- nueva.ejs                # Formulario de alta con validación
|       `-- detalle.ejs              # Comprobante individual de reserva
|-- src/
|   |-- configuracion.js             # Lectura y validación de process.env
|   |-- index.js                     # Punto de entrada, semilla, creación y listen
|   |-- app.js                       # Ensamblado de Express, pipeline y rutas
|   |-- controllers/
|   |   `-- reservas.js              # Manejador HTTP, renderizado y redirecciones
|   |-- routes/
|   |   `-- reservas.js              # Enrutador express.Router con prefijo /reservas
|   |-- services/
|   |   `-- reservas.js              # Capa de dominio en memoria (datos puros)
|   `-- middleware/
|       |-- solicitudes.js           # Generación de BIB-XXXX y medición finish
|       `-- reservas.js              # Asignación de sección y validación de POST
|-- .env.example                     # Plantilla versionable de configuración
|-- .gitignore                       # Exclusión de .env y node_modules/
|-- eslint.config.js                 # Configuración de ESLint para CommonJS
|-- package.json                     # Metadatos, dependencias y scripts
`-- README.md                        # Documentación técnica de la refactorización
```

## 5. Pipeline y contrato de rutas

### Pipeline de ejecución de Express
Las peticiones entrantes atraviesan el pipeline en el siguiente orden estricto:

```text
[Petición entrante HTTP]
        │
        ▼
1. Morgan (logger HTTP: dev o combined según NODE_ENV)
        │
        ▼
2. identificarSolicitud (genera res.locals.solicitudId = "BIB-0001")
        │
        ▼
3. medirDuracion (registra hrtime al inicio y escucha evento finish en res)
        │
        ▼
4. expressLayouts (configuración de layouts EJS)
        │
        ▼
5. express.static (servicio de archivos estáticos desde /public)
        │
        ▼
6. express.urlencoded ({ extended: false } para datos de formularios)
        │
        ▼
7. express.json (parser de cuerpos JSON)
        │
        ▼
8. Rutas raíz de aplicación:
   ├── GET /       ──> controlador.mostrarInicio
   └── GET /estado ──> controlador.mostrarEstado
        │
        ▼
9. Router modular de reservas (/reservas):
   ├── Middleware: prepararAreaReservas (res.locals.seccion)
   ├── GET /           ──> controlador.listar
   ├── GET /nueva      ──> controlador.mostrarFormulario
   ├── GET /:id        ──> controlador.mostrarDetalle
   └── POST /          ──> middleware validarReserva ──> controlador.crear
        │
        ▼
10. Middleware 404 final (captura URLs no coincidentes y renderiza no-encontrado.ejs)
```


---

## 6. Matriz de pruebas antes / después

Comprobación de paridad funcional entre la versión base (TP 05) y la versión modular refactorizada (TP 06):

| Caso de prueba | Método y Ruta | Esperado | Resultado TP 05 | Resultado TP 06 | Evidencia registrada |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Inicio y CSS** | `GET /` | 200 | 200 | 200 | Renderiza vista `inicio.ejs`, carga `/css/estilos.css` (200), ID visible en log. |
| **Estado inicial** | `GET /estado` | 200 | 200 | 200 | Responde JSON `{"servicio":"activo","reservas":4,"solicitudId":"BIB-0002"}`. |
| **Listado de reservas** | `GET /reservas` | 200 | 200 | 200 | Renderiza `reservas/lista.ejs` con las 4 reservas iniciales de la semilla. |
| **Detalle existente** | `GET /reservas/1` | 200 | 200 | 200 | Renderiza `reservas/detalle.ejs` con los datos de "Alejo Maidana". |
| **Detalle inexistente** | `GET /reservas/99` | 404 | 404 | 404 | Renderiza `no-encontrado.ejs`, status 404 sin caída del servidor. |
| **Formulario de alta** | `GET /reservas/nueva`| 200 | 200 | 200 | Renderiza `reservas/nueva.ejs` con campos, salas y turnos disponibles. |
| **POST vacío** | `POST /reservas` (`{}`) | 400 | 400 | 400 | Corta en `validarReserva`, renderiza formulario con mensaje "Todos los campos son obligatorios.". |
| **Sala no permitida** | `POST /reservas` (sala inválida) | 400 | 400 | 400 | Corta con error explícito de sala no permitida. No agrega reserva. |
| **Email sin @** | `POST /reservas` (`email="pepe"`) | 400 | 400 | 400 | Corta con error de validación de correo electrónico. No agrega reserva. |
| **Personas inválidas**| `POST /reservas` (`personas=8`) | 400 | 400 | 400 | Corta con error: "La cantidad de personas debe ser un número entero entre 1 y 6.". |
| **POST válido** | `POST /reservas` (datos ok) | 302 -> 200 | 302 -> 200 | 302 -> 200 | Redirige `302` hacia `/reservas`. El nuevo registro aparece en listado y en `/estado` (reservas: 5). |
| **URL inexistente** | `GET /url-inexistente` | 404 | 404 | 404 | Renderiza `no-encontrado.ejs` con status HTTP 404. |
| **Reinicio de servidor**| Re-ejecutar `node src/index.js` | 200 | 200 | 200 | Las reservas en memoria vuelven a ser exactamente 4 (semilla inicial). |
| **Puerto alternativo** | `PORT=4000 node src/index.js` | 200 | 200 | 200 | Servidor inicia y responde correctamente en `http://localhost:4000`. |
| **Puerto inválido** | `PORT=99999 node src/index.js` | No inicia | No inicia | No inicia | Lanza error explícito: *"El puerto configurado (99999) no es válido. PORT debe ser un número entero entre 1 y 65535."* y finaliza con código 1. |

---

## 7. Formato y análisis estático

Se configuró ESLint en modo plano (`eslint.config.js`) y Prettier respetando las convenciones para archivos CommonJS en Node.js:

```bash
# Verificación integral ejecutada:
npm run check
```

**Resultado:**
```text
> tp-06-salas-modular@1.0.0 check
> npm run format:check && npm run lint

> tp-06-salas-modular@1.0.0 format:check
> prettier --check src

Checking formatting...
All matched files use Prettier code style!

> tp-06-salas-modular@1.0.0 lint
> eslint src
```
*0 errores, 0 advertencias. Código 100% limpio y formateado.*

---

## 8. Persistencia temporal y límites (Fundamentos conceptuales)

### 1. ¿Por qué el servicio no usa `res`?
El servicio representa la **capa de dominio** (lógica de negocio). Su única responsabilidad es administrar las reservas (crear, listar, buscar por ID y contar). Si el servicio utilizara `res` (o `req`), quedaría **fuertemente acoplado al protocolo HTTP y al framework Express**.
Mantenerlo desacoplado garantiza:
- **Testeabilidad:** Es posible escribir pruebas unitarias directas sobre el servicio sin necesidad de simular (*mockear*) objetos de Express.
- **Principio de Responsabilidad Única (SRP):** El servicio solo sabe de datos de reservas; cómo se devuelven esos datos al cliente es incumbencia exclusiva del controlador.

### 2. ¿Qué hace el controlador?
El controlador actúa como **traductor y adaptador** entre el mundo exterior (HTTP / Express) y el dominio (servicio):
- Recibe los objetos `req` y `res`.
- Extrae los parámetros de la solicitud (`req.params`, `req.reservaValidada`).
- Invoca las operaciones pertinentes en el servicio de reservas inyectado.
- Decide la respuesta adecuada para el cliente: renderizar una plantilla EJS (`res.render`), emitir una respuesta JSON (`res.json`), enviar un estado de error (`res.status(404).render`) o redirigir el navegador (`res.redirect`).

### 3. ¿Por qué el router declara caminos relativos?
El enrutador (`express.Router()`) se monta en `app.js` bajo un prefijo común:
```javascript
app.use("/reservas", routerReservas);
```
Al diseñarse con rutas relativas (`/`, `/nueva`, `/:id`), el router se abstrae de dónde está dentro del árbol general de la aplicación. Si el router declarara rutas absolutas como `router.get("/reservas")`, al ingresar en ciertas rutas como `/reservas` la URL final resultante sería `/reservas/reservas`. Los caminos relativos promueven la modularidad y permiten reutilizar o reubicar el enrutador fácilmente.

### 4. ¿Dónde vive el único arreglo de reservas y qué ocurrirá con él al reiniciar?
El único arreglo de reservas reside **en la memoria RAM del proceso de Node.js**,dado que no existe una base de datos ni persistencia en disco:
- Mientras el servidor permanece encendido, cualquier alta mediante `POST /reservas` modifica ese único arreglo en memoria, razón por la cual `/estado`, `/reservas` y `/reservas/:id` reflejan inmediatamente los cambios compartidos.
- Al **reiniciar el servidor**, el proceso de Node.js finaliza, la memoria RAM asignada se libera y el arreglo desaparece. Al iniciar nuevamente, la aplicación vuelve a cargar los datos originales sin ninguna modificacion.

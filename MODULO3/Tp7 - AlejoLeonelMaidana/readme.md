# TP 07 - Persistencia Inicial de Reservas de Salas con MongoDB y Mongoose

## 1. Punto de Partida y Nombre de la Copia

- **Punto de partida:** Copia exacta y funcional del Trabajo Práctico 06 (`Tp6 - AlejoLeonelMaidana`).
- **Nombre del proyecto / entrega:** `tp-07-salas-mongodb` (configurado en `package.json`).
---

## 2. Versiones Utilizadas y Confirmación de Entorno

### Software y Dependencias
- **Node.js:** v20.x o superior (compatible con flag nativo `--env-file`).
- **npm:** v10.x o superior.
- **Mongoose:** `^9.11.2`
- **Express:** `^5.2.1`
- **EJS:** `^6.0.1` y **express-ejs-layouts:** `^2.5.1`
- **Morgan:** `^1.12.1`
- **Herramientas de Calidad:** ESLint `^10.12.0` y Prettier `^3.9.9`

---

## 3. Pasos desde una Descarga Nueva

Para reproducir y ejecutar el proyecto desde un clon o descarga limpia:

1. **Clonar o descargar el repositorio e instalar dependencias:**
   ```bash
   cd tp-07-salas-mongodb
   npm install
   ```

2. **Preparar el clúster gratuito en MongoDB Atlas:**
   - Crear o ingresar a una organización y proyecto en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Desplegar un clúster gratuito **M0 Free**.
   - En **Security > Database Access**: crear un usuario con permisos de lectura y escritura (`readWriteAnyDatabase` o `readWrite` acotado a la base).
   - En **Security > Network Access**: habilitar acceso por IP. Se recomienda agregar `0.0.0.0/0` (Allow Access from Anywhere) para pruebas académicas, o la dirección IP pública actual.

3. **Configurar las variables de entorno:**
   - Copiar la plantilla pública [`.env.example`](file:///.env.example) a un nuevo archivo [`.env`](file:///.env):
     ```bash
     cp .env.example .env
     ```
   - Editar `.env` completando usuario, contraseña y host de Atlas, conservando el nombre de base `reservas_salas_u7`:
     ```env
     PORT=3000
     NODE_ENV=development
     MONGODB_URI=mongodb+srv://<USUARIO>:<PASSWORD>@<CLUSTER-HOST>/reservas_salas_u7?retryWrites=true&w=majority
     ```

4. **Ejecutar las herramientas y scripts:**
   - Comprobar conexión: `npm run comprobardb`
   - Crear reserva de prueba: `npm run crear`
   - Listar reservas: `npm run listar`
   - Arrancar el sitio web: `npm start`

---

## 4. Diagnóstico DNS, Resolutores y Comandos de Ejecución

### Diagnóstico de Red y Resolución DNS
Los clústeres de MongoDB Atlas utilizan el esquema de conexión `mongodb+srv://`, el cual delega en consultas DNS de tipo **SRV** y **TXT** para descubrir los hosts miembros del réplica set y los parámetros de conexión sin exponer listas fijas de servidores en la URI.

En entornos locales o redes que limitan o interceptan consultas SRV/TXT, Node.js puede experimentar errores como `ECONNREFUSED`, `ENOTFOUND` o `ESERVFAIL` durante `querySrv` o `queryTxt`. Para garantizar máxima estabilidad y reproducibilidad, se configuraron resolutores DNS públicos autorizados dentro de [`src/config/base-datos.js`](file:///src/config/base-datos.js) antes de establecer la conexión:
```javascript
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
```
Este ajuste opera exclusivamente a nivel del proceso de Node.js mediante su módulo nativo `node:dns`, sin alterar la configuración de red del sistema operativo ni requerir privilegios de administrador.

### Comandos Exactos del Proyecto
| Comando npm | Comando directo ejecutado | Descripción |
| :--- | :--- | :--- |
| `npm run comprobardb` | `node --env-file=.env scripts/comprobar-conexion.js` | Conecta a Atlas, verifica acceso y cierra la conexión. |
| `npm run crear` | `node --env-file=.env scripts/crear-reserva.js` | Guarda un documento válido en Atlas y muestra su `_id`. |
| `npm run listar` | `node --env-file=.env scripts/listar-reservas.js` | Consulta la colección `reservas` y muestra tabla y cantidad. |
| `npm run validar` | `node --env-file=.env scripts/validar-reserva.js` | Valida un documento con Mongoose en memoria sin persistir. |
| `npm run format` | `prettier --write src scripts` | Formatea el código fuente y scripts de consola. |
| `npm run format:check`| `prettier --check src scripts` | Comprueba estilo y formateo con Prettier. |
| `npm run lint` | `eslint src scripts` | Analiza calidad y reglas con ESLint. |
| `npm run check` | `npm run format:check && npm run lint` | Verificación integral de calidad de código. |
| `npm start` | `node --watch src/index.js` | Inicia el servidor Express web en memoria (modo desarrollo). |
| `npm run start:local` | `node --env-file=.env src/index.js` | Inicia el servidor Express web cargando `.env`. |

---

## 5. Mapa de Archivos y Explicación Conceptual

### Árbol de Directorios del TP
```text
tp-07-salas-mongodb/
├── .env.example              # Plantilla pública sin credenciales
├── .gitignore                # Exclusión obligatoria de node_modules y .env
├── eslint.config.js          # Configuración de ESLint para src/ y scripts/
├── package.json              # Manifiesto del proyecto y scripts npm
├── package-lock.json         # Árbol de dependencias bloqueado
├── readme.md                 # Documentación completa requerida
├── public/                   # Recursos estáticos web (CSS, imágenes)
├── views/                    # Vistas EJS y layout conservados del TP 06
├── scripts/                  # Programas de consola para el laboratorio
│   ├── comprobar-conexion.js # Verificación de conectividad con Atlas
│   ├── crear-reserva.js      # Persistencia de una reserva con Mongoose
│   ├── listar-reservas.js    # Consulta y conteo de documentos persistidos
│   └── validar-reserva.js    # Validación de esquema sin escritura
└── src/
    ├── app.js                # Ensamblado de Express, middlewares y vistas
    ├── index.js              # Punto de entrada HTTP (opera en memoria)
    ├── config/
    │   ├── entorno.js        # Lector de PORT, NODE_ENV y MONGODB_URI
    │   └── base-datos.js     # Configuración DNS y conexión Mongoose
    ├── controllers/          # Controladores HTTP previos del TP 06
    ├── middleware/           # Middlewares de solicitudes y duración
    ├── modelos/
    │   └── reserva.js        # Esquema y Modelo Reserva de Mongoose
    ├── models/
    │   └── reserva.js        # Alias de compatibilidad hacia modelos/reserva
    ├── routes/               # Enrutadores modulares de Express
    └── services/             # Servicio de reservas en memoria (TP 06)
```

### Relación Conceptual: Schema, Model y Collection

1. **Schema (`reservaSchema`):**
   - Es el plano o definición estructural en código JavaScript. Define los nombres de los campos, sus tipos de datos (String, Number, etc.), los valores por defecto y las reglas de validación (`required`, `enum`, `trim`, `min`, `max`, funciones validadoras).
   - No interactúa directamente con la base de datos; reside únicamente en memoria dentro de Node.js.

2. **Model (`Reserva`):**
   - Es la clase constructora compilada a partir del Schema (`mongoose.model("Reserva", reservaSchema)`).
   - Proporciona la interfaz de programación (API) para crear instancias de documentos y ejecutar operaciones CRUD (`find`, `create`, `findById`, etc.) contra MongoDB.

3. **Collection (`reservas`):**
   - Es el conjunto físico y contenedor real de documentos BSON almacenados en la base de datos de MongoDB Atlas.
   - En nuestro modelo, se enlaza de forma explícita mediante la opción `{ collection: "reservas" }`.

---

## 6. Campos y Reglas del Dominio de Reservas

### Reglas Mínimas Implementadas en [`src/modelos/reserva.js`]
| Campo | Tipo Mongoose | Reglas Obligatorias Aplicadas |
| :--- | :--- | :--- |
| `estudiante` | `String` | `required: true`, `trim: true` (sin espacios en blanco en los extremos). |
| `email` | `String` | `required: true`, `trim: true`, `match: /@/` (requiere presencia de arroba). |
| `sala` | `String` | `required: true`, `enum: ["Sala Norte", "Sala Sur", "Sala Multimedia"]`. |
| `fecha` | `String` | `required: true`, `trim: true` (no vacío tras trim). |
| `turno` | `String` | `required: true`, `enum: ["Mañana", "Tarde", "Noche"]`. |
| `personas` | `Number` | `required: true`, `min: 1`, `max: 6`, `validate: Number.isInteger`. |

### Límites del Alcance (Casos que todavía no se controlan)
En conformidad con el alcance inicial de la Unidad 07:
- **No se realiza validación sintáctica completa de correos** bajo estándares RFC ni verificación de dominio MX (solo presencia de `@`).
- **No se validan fechas pasadas o calendarios cerrados** (se acepta formato de texto con fecha válida en trim).
- **No se controlan solapamientos de turnos ni reservas repetidas** en la misma sala y fecha (no se aplica índice único compuesto todavía).
- **No se implementa cupo compartido concurrente** entre diferentes reservas.
- **Creaciones repetidas:** Ejecutar dos veces el programa de creación genera dos documentos distintos con identificadores `_id` diferentes aunque todos sus campos de datos sean idénticos.

---

## 7. Matriz de Pruebas y Evidencia de Persistencia

### Ensayo Reproducible de Persistencia entre Procesos
El siguiente ensayo fue ejecutado de manera real en la base `reservas_salas_u7`:

1. **Paso 1: Listar y registrar cantidad inicial:**
   ```bash
   node --env-file=.env scripts/listar-reservas.js
   ```
   *Salida obtenida:* Total de reservas: `1`.
2. **Paso 2: Crear una nueva reserva y guardar el `_id` emitido:**
   ```bash
   node --env-file=.env scripts/crear-reserva.js
   ```
   *Salida obtenida:*
   ```text
   Reserva guardada. _id: 6ad927749cd45fb67ae8ad9e
   ```
3. **Paso 3:** Dejar terminar el proceso anterior.
4. **Paso 4: Iniciar un nuevo proceso de Node.js y comprobar persistencia:**
   ```bash
   node --env-file=.env scripts/listar-reservas.js
   ```
   *Salida obtenida:*
   ```text
   ┌─────────┬────────────────────────────┬─────────────────┬─────────────────────────────┬───────────────────┬──────────────┬──────────┬──────────┐
   │ (index) │ id                         │ estudiante      │ email                       │ sala              │ fecha        │ turno    │ personas │
   ├─────────┼────────────────────────────┼─────────────────┼─────────────────────────────┼───────────────────┼──────────────┼──────────┼──────────┤
   │ 0       │ '6ad89c0d92266666bae2ad47' │ 'Alejo Maidana' │ 'alejo.maidana@ejemplo.com' │ 'Sala Multimedia' │ '2026-10-25' │ 'Mañana' │ 3        │
   │ 1       │ '6ad927749cd45fb67ae8ad9e' │ 'Alejo Maidana' │ 'alejo.maidana@ejemplo.com' │ 'Sala Multimedia' │ '2026-10-25' │ 'Mañana' │ 3        │
   └─────────┴────────────────────────────┴─────────────────┴─────────────────────────────┴───────────────────┴──────────────┴──────────┴──────────┘
   Total de reservas: 2
   ```
   Se comprueba que se recuperó exactamente el `_id: 6ad927749cd45fb67ae8ad9e` generado en el proceso previo y el total incrementó en uno.
5. **Paso 5: Listar una vez más sin escrituras intermedias:**
   ```bash
   node --env-file=.env scripts/listar-reservas.js
   ```
   *Salida obtenida:* Total de reservas permanece idéntico en `2`.

---

### Matriz Mínima de Pruebas (14 Casos de la Consigna)

| # | Caso de Prueba | Resultado Esperado | Resultado Observado | Cantidad Antes / Después |
| :-: | :--- | :--- | :--- | :-: |
| 1 | **Conexión válida** | Confirmación y proceso terminado limpiamente | Mensaje: `Conexión con MongoDB establecida.`, código de salida 0 | 1 / 1 (Sin cambios) |
| 2 | **Fallo DNS, si ocurrió** | Registrar código/syscall y usar resolutor autorizado | Se incluyó `dns.setServers(["8.8.8.8", "1.1.1.1"])` en `base-datos.js`, resolución SRV exitosa | 1 / 1 (Sin cambios) |
| 3 | **Variable de entorno vacía** | Fallo de configuración; sin mensaje de éxito | Lanza excepción: `Error: Falta MONGODB_URI en el entorno.`, termina con código 1 | 1 / 1 (Sin cambios) |
| 4 | **Contraseña incorrecta temporal en `.env`** | Fallo de autenticación; sin crear documentos | Error `MongoServerError: bad auth : authentication failed`, salida con código 1 sin anunciar éxito | 1 / 1 (Sin cambios) |
| 5 | **Colección vacía (base nueva)** | Listado de cantidad 0, sin error | Devuelve arreglo vacío `[]`, tabla vacía, `Total de reservas: 0`, código 0 | 0 / 0 |
| 6 | **Reserva válida** | Se guarda en Atlas y devuelve `_id` | Muestra `Reserva guardada. _id: 6ad927749cd45fb67ae8ad9e`, código 0 | 1 / 2 (+1) |
| 7 | **Consulta desde proceso nuevo** | Recupera ese `_id` en la colección | Listado por terminal incluye `6ad927749cd45fb67ae8ad9e` con todos sus datos | 2 / 2 (Persistido) |
| 8 | **Segunda consulta** | No agrega registros ni modifica datos | Lista exactamente los mismos 2 registros, `Total de reservas: 2` | 2 / 2 (Sin cambios) |
| 9 | **Estudiante vacío (`""` o espacios)** | Rechazo por validación, sin cambios | Muestra error `ValidationError: Path 'estudiante' is required.`, campos: `estudiante` | 2 / 2 (Sin cambios) |
| 10 | **Email sin carácter `@`** | Rechazo por validación, sin cambios | Muestra error `ValidationError: Path 'email' is invalid (match /@/)`, campos: `email` | 2 / 2 (Sin cambios) |
| 11 | **Sala o turno no permitido** | Rechazo por `enum`, sin cambios | Muestra error `ValidationError: '...' is not a valid enum value for path 'sala'`, campos: `sala` | 2 / 2 (Sin cambios) |
| 12 | **Fecha vacía (`""`)** | Rechazo por validación, sin cambios | Muestra error `ValidationError: Path 'fecha' is required.`, campos: `fecha` | 2 / 2 (Sin cambios) |
| 13 | **Personas 0, 7 y 2.5 (separados)** | Rechazo (`min: 1`, `max: 6`, `Number.isInteger`) | 0 falla por min, 7 por max, 2.5 por validador entero. Muestra campos a revisar: `personas` | 2 / 2 (Sin cambios) |
| 14 | **Personas con texto no numérico (`"dos"`)** | Rechazo de conversión (cast), sin escritura | Error `CastError: Cast to Number failed for value "dos" at path 'personas'` | 2 / 2 (Sin cambios) |
---

## 8. Continuidad del Sitio Web y Próximos Pasos (Unidad 8)

### ¿Por qué el servicio HTTP continúa en memoria?
La consigna establece expresamente que la aplicación web Express (`src/index.js`, `src/app.js`, controladores y vistas) 
1. Los controladores actuales que vienen desde el TP 06 son puramente sincrónicos y dependen del servicio en memoria `src/services/reservas.js`.

2. En este TP 07, el objetivo didáctico se enfoca en dominar la **configuración, conexión de red segura, esquemas, modelos y persistencia básica de terminal**.

### Lo que se abordará en la Unidad 08
A mi entender en la Unidad 08 se integrará la persistencia de Mongoose dentro del ciclo de vida de peticiones y respuestas de Express:
- Conexión de Express con MongoDB al inicializar el servidor.
- Reemplazo del servicio en memoria por consultas asíncronas con promesas (`async/await`) en los controladores.

---

## 9. Seguridad y Confidencialidad

- El archivo con secretos y credenciales reales [`.env`] está explícitamente incluido en [`.gitignore`].
- Únicamente se versiona la plantilla pública [`.env.example`] con marcadores de posición (`USUARIO`, `CLAVE`, `HOST`).
- Los programas de prueba y conexión filtran las credenciales sensibles y nunca las imprimen por consola ante fallos o errores de red.
- Ninguna clave privada ni información personal se encuentra registrada en el historial de Git.

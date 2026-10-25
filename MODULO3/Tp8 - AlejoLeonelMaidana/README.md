# TP 08 - Endpoints Persistentes de Reservas de Salas 

**Autor:** Alejo Leonel Maidana  
**Diplomatura Fullstack - Unidad 8**  
**Nombre del proyecto:** `tp-08-salas-mongodb`

---

## 1. Origen de la Copia y Comparación con TP 07

- **Origen:** Copia funcional y evolutiva del **TP 07** (`Tp7 - AlejoLeonelMaidana`).
- **Diferencias clave con el TP 07:**
  - **En el TP 07:** MongoDB solo se utilizaba mediante scripts aislados de consola (`comprobar-conexion.js`, `crear-reserva.js`). El servidor Express seguía operando en memoria volátil con el arreglo `datosIniciales`.
  - **En el TP 08:** Se eliminó por completo el arreglo en memoria y las semillas. Tanto el sitio web HTML como la nueva API JSON operan 100% de forma asíncrona sobre MongoDB Atlas.
  - **Nuevas características del TP 08:**
    - Incorporación del campo `estado` (`"pendiente"` / `"confirmada"`) con default automático en el esquema de Mongoose.
    - Cierre ordenado (*Graceful Shutdown*) ante `SIGINT` y `SIGTERM` cerrando sockets y desconectando la base de datos limpiamente.
    - Manejador centralizado de errores de 4 parámetros para Express 5.

---

## 2. Versiones y Entorno

- **Node.js:** v20.x o superior (uso de flag nativo `--env-file=.env` y `node:dns`).
- **npm:** v10.x o superior.
- **Base de Datos:** MongoDB Atlas M0 Free Tier.
  - **Base de datos:** `reservas_salas_u8`
  - **Colección:** `reservas`
- **Dependencias Principales:**
  - `express`: `^5.2.1`
  - `mongoose`: `^9.11.2`
  - `ejs`: `^6.0.1`
  - `express-ejs-layouts`: `^2.5.1`
  - `morgan`: `^1.12.1`
- **Dependencias de Desarrollo:**
  - `eslint`: `^10.12.0`
  - `prettier`: `^3.9.9`

---

## 3. Preparación de Atlas, Entorno y Corrección DNS

### Configuración en MongoDB Atlas
1. Clúster M0(la capa Free) desplegado en AWS / GCP.
2. Usuario de base de datos con permisos `readWrite` sobre la base `reservas_salas_u8`.
3. Network Access configurado con la IP pública actual o `0.0.0.0/0` (acceso académico controlado).

### Archivos de Entorno
El archivo [.env.example] debe tener una base algo asi
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://USUARIO:CLAVE@HOST/reservas_salas_u8?retryWrites=true&w=majority
```

### Ajuste de Resolución DNS
Para evitar fallos de resolución de registros SRV/TXT (`_mongodb._tcp...`) causados por proveedores locales de Internet(Claro como lo odio), se configuraron los DNS públicos de Google y Cloudflare en el proceso de Node.js:
```javascript
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
```

---

## 4. Comandos de Inicio y Calidad

| Comando | Acción |
| :--- | :--- |
| `npm start` | Inicia el servidor con recarga en vivo (`--watch`) y variables (`--env-file=.env`). |
| `npm run start:local` | Inicia el servidor en modo normal con `--env-file=.env`. |
| `npm run comprobardb` | Ejecuta el script de comprobación rápida de conexión con Atlas. |
| `npm run validar` | Ejecuta la validación de un documento con Mongoose sin persistir. |
| `npm run crear` | Crea un documento de prueba mediante script CLI. |
| `npm run listar` | Consulta y lista los documentos de la colección en Atlas. |
| `npm run format` | Aplica formato automático con Prettier sobre `src` y `scripts`. |
| `npm run check` | Ejecuta `format:check` y `eslint` garantizando 0 advertencias y 0 errores. |

---

## 5. Arquitectura por Capas

El proyecto implementa una arquitectura en capas desacoplada:

```mermaid
graph TD
    Client["Cliente (Navegador HTML / Postman API)"] --> Router["Capa de Rutas (reservas.js / reservas-api.js)"]
    Router --> Middleware["Capa Middleware (validarReserva / morgan / errores)"]
    Middleware --> Controller["Capa Controladores (crearControladorReservas)"]
    Controller --> Service["Capa de Servicio Asíncrono (crearServicioReservas)"]
    Service --> Model["Capa de Datos / Modelos (Mongoose Schema Reserva)"]
    Model --> Atlas[(MongoDB Atlas - reservas_salas_u8)]
```

- **Rutas (`src/routes/`):** Desacopla la API (`/api/reservas`) de las vistas web (`/reservas`).
- **Middleware (`src/middleware/`):** Validación estricta de tipos de entrada, prevención de inyección, y manejador global de errores de 4 parámetros.
- **Controlador (`src/controllers/`):** Gestiona `req` y `res`, emite códigos HTTP (200, 201, 302, 400, 404) y cabecera `Location`.
- **Servicio (`src/services/`):** Lógica pura de negocio y consultas Mongoose. No manipula objetos HTTP. Implementa el DTO `representarReserva` que convierte `_id` a `id` textual.
- **Modelo (`src/models/`):** Esquema Mongoose con validación en profundidad y defaults (`estado: "pendiente"`).

---

## 6. Tabla de Endpoints de la API JSON

| Método | Endpoint | Parámetros / Body | Códigos HTTP | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/reservas` | `?sala=...` (opcional) | `200`, `400` | Lista todas las reservas o filtra por igualdad exacta de sala. Arreglo repetido da 400. |
| `GET` | `/api/reservas/:id` | `id` en path (24 hex) | `200`, `400`, `404` | Consulta reserva por ID. 400 si el ID es mal formado; 404 si es válido pero inexistente. |
| `POST` | `/api/reservas` | JSON con 6 campos | `201`, `400` | Crea una reserva. Asigna `id` propio y `estado: "pendiente"`. Retorna cabecera `Location`. |
| `GET` | `/estado` | Ninguno | `200` | Diagnóstico de salud y cantidad persistente de reservas. |
| `*` | `/api/*` | Cualquiera | `404` | Respuesta JSON `{ error: "ruta no encontrado" }` ante rutas no registradas. |

---

## 7. JSON de Ejemplo para Creación (Sin Secretos)

```json
{
  "estudiante": "Ana Ejemplo",
  "email": "ana@example.com",
  "sala": "Sala Norte",
  "fecha": "2026-10-25",
  "turno": "Mañana",
  "personas": 2
}
```

**Respuesta HTTP `201 Created`:**
```json
{
  "id": "<ID_GENERADO_POR_MONGODB>",
  "estudiante": "Ana Ejemplo",
  "email": "ana@example.com",
  "sala": "Sala Norte",
  "fecha": "2026-10-25",
  "turno": "Mañana",
  "personas": 2,
  "estado": "pendiente"
}
```
**Cabecera de Respuesta:**
`Location: /api/reservas/<ID_GENERADO_POR_MONGODB>`

---

## 8. Matriz de Pruebas y Resultados Observados

Todos los casos requeridos por la cátedra fueron ensayados y validados:

| # | Caso de Prueba | Entrada / Solicitud | Resultado Esperado | Resultado Observado | Estado |
| :-: | :--- | :--- | :--- | :--- | :-: |
| 1 | Listado inicial | `GET /api/reservas` | `200, []` | 200 OK con arreglo JSON | ✅ |
| 2 | Creación válida | `POST /api/reservas` con 6 datos | `201 y Location` | 201 Created + Header Location | ✅ |
| 3 | Consulta por ID creado | `GET /api/reservas/:id` | `200, mismo recurso` | 200 OK con recurso idéntico | ✅ |
| 4 | Consulta tras reiniciar | Reinicio de Node + `GET /api/reservas/:id` | `200, mismo ID` | 200 OK, datos intactos en Atlas | ✅ |
| 5 | ID mal formado | `GET /api/reservas/1` | `400 JSON` | 400 Bad Request JSON | ✅ |
| 6 | ID bien formado inexistente | `GET /api/reservas/000000000000000000000000` | `404 JSON` | 404 Not Found JSON | ✅ |
| 7 | Estudiante vacío | `POST` con `"estudiante": "   "` | `400, sin aumento` | 400 Bad Request | ✅ |
| 8 | Email sin `@` | `POST` con `"email": "anaexample.com"` | `400, sin aumento` | 400 Bad Request | ✅ |
| 9 | Sala no permitida | `POST` con `"sala": "Sala Inexistente"` | `400, sin aumento` | 400 Bad Request | ✅ |
| 10 | Turno no permitido | `POST` con `"turno": "Madrugada"` | `400, sin aumento` | 400 Bad Request | ✅ |
| 11 | Fecha vacía | `POST` con `"fecha": ""` | `400` | 400 Bad Request | ✅ |
| 12 | Personas 0, 7, 2.5, "abc" | `POST` con personas fuera de rango | `400` | 400 Bad Request en cada caso | ✅ |
| 13 | Personas booleano, array, objeto | `POST` con `true`, `[2]`, `{"cant": 2}` | `400` | 400 Bad Request en cada caso | ✅ |
| 14 | POST sin cuerpo (none) | `POST /api/reservas` sin body | `400 JSON` | 400 Bad Request JSON | ✅ |
| 15 | POST con JSON mal formado | `POST` con sintaxis rota | `400 JSON` | 400 Bad Request JSON | ✅ |
| 16 | Campos extra `estado` o `_id` | `POST` con `"estado": "confirmada"` | No los asigna el cliente | Ignora extras, fija `"pendiente"` | ✅ |
| 17 | Filtro exacto por sala | `GET /api/reservas?sala=Sala%20Norte` | Coincidencias exactas | 200 OK solo de Sala Norte | ✅ |
| 18 | Filtro sin coincidencias | `GET /api/reservas?sala=Sala%20Fantasma` | `200, []` | 200 OK con `[]`, no 404 | ✅ |
| 19 | Sala repetida como query | `GET /api/reservas?sala=A&sala=B` | `400 JSON` | 400 Bad Request JSON | ✅ |
| 20 | Formulario web válido | `POST /reservas` desde navegador | `302 Redirección` | Redirige 302 a `/reservas` | ✅ |
| 21 | Formulario web inválido | `POST /reservas` con errores | `400 y conserva valores` | Renderiza 400 conservando inputs | ✅ |
| 22 | Conteo de estado | `GET /estado` | Conteo real de MongoDB | 200 JSON con total de Atlas | ✅ |
| 23 | Fallo de arranque sin URI | Iniciar sin `MONGODB_URI` | No abre el puerto | Falla rápido y aborta el proceso | ✅ |

---

## 9. Instrucciones para Reproducir en Postman

El repositorio incluye la colección exportada lista para usar:
📁 [postman_collection.json](file:///postman_collection.json)

1. En Postman: `Import` > seleccionar `postman_collection.json` (o importar la colección exportada `TP8 - Coleccion de reservas de salas.postman_collection.json`).
2. En las variables de colección, verificar que `base_url` apunte a `http://localhost:3005` (o el puerto configurado en su `.env`).
3. Ejecutar las solicitudes en secuencia. La solicitud `02 - Crear reserva válida` guarda automáticamente el `id` asignado en la variable `id_creado` para ejecutar las consultas posteriores sin intervención manual.

---

## 10. Prueba de Reinicio (Evidencia de Persistencia)

Para demostrar que los datos persisten en MongoDB Atlas y no en la memoria volátil de Node.js:

1. **Creación previa:** Se envió una solicitud `POST /api/reservas` creando una reserva válida. Se obtuvo el estado `201 Created` y el identificador asignado por MongoDB Atlas.
2. **Consulta previa:** Se consultó la reserva por su ID con `GET /api/reservas/:id`, confirmando su registro con estado `200 OK`.
3. **Reinicio del servidor:** Se detuvo el proceso de Node.js mediante `Ctrl + C` en la terminal (ejecutando el cierre ordenado) y se volvió a iniciar el servidor con `npm start`.
4. **Comprobación posterior:** 
   - Se volvió a consultar en Postman `GET /api/reservas/:id` con el mismo identificador: **Respondió `200 OK` con los datos intactos**.
   - Se ingresó en el navegador a `http://localhost:3005/reservas`: la reserva sigue visible en la grilla web.
5. **Conclusión:** Se comprobó que el servidor no perdió datos ni los duplicó, ya que no depende de semillas locales y la información reside en el clúster remoto de Atlas.

---

## 11. Límites de Validación

### Lo que SÍ valida el sistema:
- **Campos obligatorios:** Rechaza cuerpos vacíos, campos ausentes o cadenas compuestas solo de espacios en blanco (`.trim()`).
- **Formato básico de email:** Exige la presencia obligatoria del carácter `@`.
- **Listas cerradas (Enums):** Solo permite salas (`Sala Norte`, `Sala Sur`, `Sala Multimedia`) y turnos (`Mañana`, `Tarde`, `Noche`) definidos en el contrato.
- **Tipado estricto de personas:** Solo acepta enteros entre 1 y 6. Rechaza explícitamente tipos booleanos (`true`/`false`), decimales, texto, arreglos y objetos.
- **Identificadores:** Valida que el ID tenga exactamente 24 caracteres hexadecimales antes de consultar MongoDB (distinguiendo error 400 de 404).
- **Parámetro de búsqueda único:** Si el query param `?sala=` se envía repetido como arreglo, se rechaza con 400.
- **Protección contra campos extra:** Si el cliente intenta inyectar `_id` o `estado: "confirmada"`, el servidor los ignora y asigna su propio ID y estado `"pendiente"`.

### Límites declarados (Lo que NO resuelve esta entrega según consigna):
- No valida sintaxis completa de RFC de email ni existencia real del buzón.
- No valida fechas en calendario ni restringe fechas pasadas o futuras (se acepta como texto obligatorio).
- No resuelve solapamiento de turnos, cupos compartidos ni duplicados (no se exige índice único en la colección).
- No implementa operaciones de modificación o baja (`PUT`, `PATCH`, `DELETE`) en esta unidad.

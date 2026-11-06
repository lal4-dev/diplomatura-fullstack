# TP 09 - Actualización y Eliminación de Reservas de Salas (CRUD Completo)

**Autor:** Alejo Leonel Maidana  
**Diplomatura Fullstack - Unidad 9**  
**Nombre del proyecto:** `tp-09-salas-crud-mongodb`

---

## 1. Origen de la Copia y Comparación con TP 08

- **Origen:** Copia funcional y evolutiva del **TP 08** (`tp-08-salas-mongodb` / `Tp8 - AlejoLeonelMaidana`).

---

## 2. Versiones y Entorno

- **Node.js:** v20.x o superior (uso de flag nativo `--env-file=.env` y `node:dns`).
- **npm:** v10.x o superior.
- **Base de Datos:** MongoDB Atlas M0 Free Tier.
  - **Base de datos:** `reservas_salas_u9`
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
1. Clúster M0 (Free Tier) activo en MongoDB Atlas.
2. Usuario de base de datos con permisos de lectura y escritura (`readWrite`).
3. Network Access configurado con la IP actual autorizada.
4. La URI de conexión apunta a la base **`reservas_salas_u9`**.

### Archivos de Entorno (`.env.example`)
El archivo `.env.example` documenta la estructura requerida sin exponer credenciales reales:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://USUARIO:CLAVE@HOST/reservas_salas_u9?retryWrites=true&w=majority
```

### Ajuste de Resolución DNS
Se conserva el ajuste en `src/config/base-datos.js` para resolver registros SRV/TXT de MongoDB Atlas sin bloqueos del proveedor local de Internet:
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
| `npm run validar` | Ejecuta la validación de un documento con Mongoose en memoria sin persistir. |
| `npm run crear` | Crea un documento de prueba en `reservas_salas_u9` mediante script CLI. |
| `npm run listar` | Consulta y lista los documentos de la colección en Atlas por consola. |
| `npm run format` | Aplica formato automático con Prettier sobre `src` y `scripts`. |
| `npm run check` | Ejecuta `format:check` y `eslint` garantizando 0 advertencias y 0 errores. |

---

## 5. Arquitectura por Capas

El proyecto conserva y amplía la arquitectura en capas desacoplada:

```mermaid
graph TD
    Client["Cliente (Navegador HTML / Postman API)"] --> Router["Capa de Rutas (reservas.js / reservas-api.js)"]
    Router --> Middleware["Capa Middleware (reservas.js / cambios-reserva.js / errores.js)"]
    Middleware --> Controller["Capa Controladores (src/controllers/reservas.js)"]
    Controller --> Service["Capa de Servicio Asíncrono (src/services/reservas.js)"]
    Service --> Model["Capa de Datos / Modelo (src/models/reserva.js)"]
    Model --> Atlas[(MongoDB Atlas - reservas_salas_u9)]
```

- **Rutas (`src/routes/`):**
  - `reservas.js`: Rutas web HTML (`/reservas`).
  - `reservas-api.js`: Rutas REST JSON (`/api/reservas`) que ahora conectan `GET`, `POST`, `PUT`, `PATCH` y `DELETE`.
- **Middleware (`src/middleware/`):**
  - `reservas.js`: `validarReserva` valida los 6 campos base en `POST` y como primer paso de `PUT`.
  - `cambios-reserva.js`: `validarReemplazoReserva` valida que en `PUT` solo vengan los 7 campos permitidos y que `estado` sea obligatorio; `validarActualizacionReserva` valida de forma independiente que en `PATCH` solo se envíe `personas` y/o `estado`.
  - `errores.js`: Manejador centralizado de 4 parámetros (`ValidationError`, `CastError`, `ENTRADA_INVALIDA`, `ID_INVALIDO`, `entity.parse.failed`).
- **Controlador (`src/controllers/reservas.js`):** Coordina `req` y `res`, delegando la lógica al servicio con `await` y traduciendo los resultados a respuestas HTTP (`200`, `201` con `Location`, `204` sin cuerpo, `302`, `404`).
- **Servicio (`src/services/reservas.js`):** Contiene las operaciones de negocio y consultas Mongoose (`listar`, `obtenerPorId`, `contar`, `crear`, `reemplazar`, `actualizar`, `eliminar`) junto con `comprobarId` y `representarReserva`. No conoce `req` ni `res`.
- **Modelo (`src/models/reserva.js`):** Define el `Schema` de Mongoose con validación en profundidad y `estado: "pendiente"` por defecto al crear.

---

## 6. Contrato HTTP de la API y Lectura Simple

| Método | Endpoint | Cuerpo / Parámetros | Códigos HTTP | Resultado y Comportamiento |
| :--- | :--- | :--- | :--- | :--- |
| `PUT` | `/api/reservas/:id` | JSON con los **7 campos** | `200`, `400`, `404` | Reemplaza la ficha completa conservando el mismo `id`. Exige `estado`. No crea si no existe (`upsert: false`). |
| `PATCH` | `/api/reservas/:id` | JSON con `personas` y/o `estado` | `200`, `400`, `404` | Modifica parcialmente solo los campos enviados (`$set`) y conserva los demás intactos. |
| `DELETE` | `/api/reservas/:id` | Sin cuerpo (`none`) | `204`, `400`, `404` | Eliminación física de un solo documento. Devuelve `204` sin cuerpo si borró, o `404` si no existía. |


---

## 7. Ejemplos de Solicitudes para Reproducir en Postman

### 7.1. Crear reserva (`POST /api/reservas`)
- **Headers:** `Content-Type: application/json`
- **Body (`raw` JSON):**
```json
{
  "estudiante": "Ana Ejemplo",
  "email": "ana@example.com",
  "sala": "Sala Norte",
  "fecha": "2026-10-28",
  "turno": "Mañana",
  "personas": 2
}
```
- **Respuesta esperada:** `201 Created`, header `Location: /api/reservas/<ID_RECIBIDO>` y campo `"estado": "pendiente"`.

### 7.2. Reemplazar ficha completa (`PUT /api/reservas/:id`)
- **URL:** `http://localhost:3005/api/reservas/<ID_RECIBIDO>`
- **Body (`raw` JSON con los 7 campos obligatorios):**
```json
{
  "estudiante": "Ana Ejemplo",
  "email": "ana@example.com",
  "sala": "Sala Norte",
  "fecha": "2026-10-28",
  "turno": "Mañana",
  "personas": 2,
  "estado": "confirmada"
}
```
- **Respuesta esperada:** `200 OK` con el mismo `id` y los 7 campos actualizados (`"estado": "confirmada"`).

### 7.3. Actualizar parcialmente (`PATCH /api/reservas/:id`)
- **URL:** `http://localhost:3005/api/reservas/<ID_RECIBIDO>`
- **Body (`raw` JSON con solo `personas` o `estado`):**
```json
{
  "personas": 3
}
```
- **Respuesta esperada:** `200 OK` con `"personas": 3` y todos los demás campos (`estudiante`, `email`, `sala`, `fecha`, `turno` y `"estado": "confirmada"`) conservados sin alteración.

### 7.4. Eliminar reserva (`DELETE /api/reservas/:id`)
- **URL:** `http://localhost:3005/api/reservas/<ID_PARA_ELIMINAR>`
- **Body:** `none`
- **Respuesta esperada:** `204 No Content` sin cuerpo. Un `GET` o segundo `DELETE` posterior al mismo ID devuelve `404 Not Found`.

---

## 8. Matriz de Pruebas Observadas

Todas las pruebas fueron ejecutadas sobre la base `reservas_salas_u9`:

| # | Caso de Prueba | Solicitud / Entrada | Evidencia Esperada | Resultado Observado | Estado |
| :-: | :--- | :--- | :--- | :--- | :-: |
| 1 | `POST` válido | `POST /api/reservas` (6 campos válidos) | `201`, `Location` y `estado: "pendiente"` | `201 Created`, header `Location` y `"estado": "pendiente"`. Conteo en `/estado` subió de 0 a 1 (y luego a 2 tras crear el documento a eliminar). | ✅ |
| 2 | `PUT` completo | `PUT /api/reservas/:id` (7 campos con `estado: "confirmada"`) | `200`, mismo ID, siete campos | `200 OK`, mismo `id`, `"estado": "confirmada"`. Cantidad total se mantiene en 2. | ✅ |
| 3 | `PUT` incompleto | `PUT /api/reservas/:id` omitiendo `estado` o `fecha` | `400` y recurso intacto | `400 Bad Request` JSON. Al consultar con `GET /:id`, los valores previos permanecen intactos. | ✅ |
| 4 | `PATCH` personas o estado | `PATCH /api/reservas/:id` con `{"personas": 3}` y luego `{"estado": "pendiente"}` | `200` y campos omitidos conservados | `200 OK`, actualiza únicamente el campo enviado y conserva `estudiante`, `email`, `sala`, `fecha` y `turno`. | ✅ |
| 5 | `PATCH` vacío, campo extra, `_id` o `$set` | `PATCH` con `{}`, `{"sala": "Sala Sur"}`, `{"_id": "..."}` o `{"$set": {}}` | `400` sin modificación | `400 Bad Request` JSON (`"Enviá personas o estado."` / `"Solo se puede cambiar personas o estado."`). Recurso intacto. | ✅ |
| 6 | `personas` inválido | `PUT` / `PATCH` con `personas`: `0`, `7`, `2.5`, `true`, `[2]`, `{"n": 2}` | `400` sin modificación | `400 Bad Request` JSON en cada caso. El documento en Atlas no sufre cambios. | ✅ |
| 7 | `estado` o enum inválido | `PUT` / `PATCH` con `{"estado": "cancelada"}` o sala/turno inválido | `400` sin modificación | `400 Bad Request` JSON. No se modifica el recurso. | ✅ |
| 8 | ID mal formado | `GET`, `PUT`, `PATCH` o `DELETE` a `/api/reservas/123` | `400` | `400 Bad Request` JSON (`"El identificador debe tener 24 caracteres hexadecimales."`). | ✅ |
| 9 | ID válido ausente en `PUT`/`PATCH` | `PUT` / `PATCH` a `/api/reservas/000000000000000000000000` | `404` sin creación | `404 Not Found` JSON (`upsert: false` impide crear un documento nuevo). Conteo sigue en 2. | ✅ |
| 10 | JSON mal formado o cuerpo ausente | `POST` / `PUT` / `PATCH` con `{"personas": }` o Body `none` | `400` JSON | `400 Bad Request` JSON. | ✅ |
| 11 | `DELETE` existente | `DELETE /api/reservas/:id` sobre reserva de prueba | `204` sin cuerpo; una reserva menos | `204 No Content` con cuerpo vacío. El listado y `/estado` bajaron de 2 a 1 reserva. | ✅ |
| 12 | Repetir `DELETE` / `GET` posterior | Segundo `DELETE` y `GET` al ID recién eliminado | `404` | Ambos devuelven `404 Not Found` JSON. El conteo permanece en 1. | ✅ |
| 13 | Reiniciar tras actualizar y eliminar | Detener con `Ctrl+C`, iniciar y consultar ambos IDs | Cambios persistidos | `GET` al ID modificado devuelve `200` con sus últimos cambios; `GET` al ID eliminado sigue dando `404`. | ✅ |
| 14 | Sitio HTML, formulario y `/estado` | Navegar `/`, `/reservas`, `/reservas/nueva`, `/estado` | Contratos conservados | Formulario válido redirige `302`; inválido responde `400` conservando valores; grilla HTML muestra los cambios hechos por API. | ✅ |
| 15 | Fallo inesperado simulado | Prueba aislada de error interno | `500` sin secretos | `500 Internal Server Error` con JSON seguro `{"error": "No se pudo completar la operación."}` sin exponer trazas ni URI. | ✅ |

---

## 9. Evidencia de Reinicio y Persistencia

1. **Modificación y eliminación previa al reinicio:**
   - Sobre la primera reserva creada, se ejecutó `PUT /api/reservas/:id` cambiando `estado` a `"confirmada"` y luego `PATCH /api/reservas/:id` cambiando `personas` a `3`, obteniendo `200 OK`.
   - Sobre la segunda reserva creada para ejercicio, se ejecutó `DELETE /api/reservas/:id`, obteniendo `204 No Content` y reduciendo el total en `/estado` de `2` a `1`.
2. **Reinicio del servidor:**
   - Se detuvo el proceso de Express en la terminal con `Ctrl + C` (ejecutándose el cierre ordenado de conexiones HTTP y `mongoose.disconnect()`) y se volvió a levantar con `npm start` apuntando a la misma base `reservas_salas_u9`.
3. **Verificación posterior al reinicio:**
   - Al consultar `GET /api/reservas/:id` de la primera reserva, respondió `200 OK` conservando `"personas": 3` y `"estado": "confirmada"`.
   - Al consultar `GET /api/reservas/:id` de la reserva eliminada, continuó respondiendo `404 Not Found`.
   - En el navegador web (`/reservas` y `/estado`), la grilla y el contador reflejaron exactamente `1` reserva activa con los datos actualizados.

---

## 10. Criterio de Borrado Físico vs. Cambio de Estado

- **Cambio de estado (`estado: "pendiente"` / `"confirmada"` mediante `PUT` o `PATCH`):**
  Representa una modificación del ciclo de vida administrativo de la reserva. **El documento sigue existiendo en la colección `reservas`**, conserva su identificador `_id`, se contabiliza en `/estado`, aparece en el listado `GET /api/reservas` y en las vistas HTML, y puede volver a consultarse o modificarse posteriormente.
- **Eliminación física (`DELETE /api/reservas/:id`):**
  Ejecuta `Reserva.deleteOne({ _id: id })`, **retirando definitivamente el documento de la colección en MongoDB Atlas**. No se utiliza borrado lógico (marca de baja). Una vez eliminado, el documento deja de existir: disminuye el contador de `/estado`, desaparece de los listados y cualquier consulta (`GET`), modificación (`PUT`/`PATCH`) o nuevo intento de borrado (`DELETE`) sobre ese mismo ID devuelve `404 Not Found`.

---

## 11. Reglas y Límites de Validación

### Lo que SÍ valida el sistema:
- **En `POST /api/reservas`:** Exige los 6 campos base (`estudiante`, `email` con `@`, `sala` permitida, `fecha`, `turno` permitido y `personas` entero de 1 a 6). Asigna `estado: "pendiente"` por defecto sin permitir que el cliente inyecte `estado` ni `_id`.
- **En `PUT /api/reservas/:id`:** Reutiliza `validarReserva` para los 6 campos base y encadena `validarReemplazoReserva` para exigir obligatoriamente el 7° campo `estado` (`"pendiente"` o `"confirmada"`). Si falta algún campo no aplica defaults silenciosos, sino que rechaza con `400`. Rechaza cualquier campo extra o `_id`.
- **En `PATCH /api/reservas/:id`:** Mediante `validarActualizacionReserva`, admite exclusivamente `personas` y/o `estado` (al menos uno presente). Rechaza cuerpos vacíos `{}`, campos del resto de la reserva (como `sala` o `estudiante`), `_id` y operadores como `$set`.
- **Tipado de `personas`:** Acepta número o texto numérico no vacío, verificando luego `Number.isFinite`, `Number.isInteger` y rango entre `1` y `6` (rechaza booleanos, decimales, arreglos y objetos).
- **Opciones seguras en Mongoose:** Tanto `findOneAndReplace` como `findOneAndUpdate` ejecutan `runValidators: true`, `returnDocument: "after"` y `upsert: false`.

### Límites declarados (Alcance de la Unidad 9):
- No se implementan validaciones de calendario, solapamiento de horarios, disponibilidad ni cupos compartidos (cambiar `estado` a `"confirmada"` es una decisión explícita).
- El listado `GET /api/reservas` conserva su arreglo simple; las consultas avanzadas y relaciones se abordan en la Unidad 10.

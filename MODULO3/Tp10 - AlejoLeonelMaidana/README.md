# TP 10 - Consultas de Reservas de Salas con MongoDB

**Autor:** Alejo Leonel Maidana  

---

## 1. Instalación y Variables (Sin Secretos)

### Requisitos
- Node.js v20 o superior.
- MongoDB Atlas Free Tier (base `reservas_salas_u10`, colección `reservas`).

### Variables de entorno (`.env.example`)
Crear un archivo `.env` privado (excluido en `.gitignore`) basado en `.env.example`, sin publicar credenciales reales:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://USUARIO:CLAVE@HOST/reservas_salas_u10?retryWrites=true&w=majority
```

### Comandos de instalación, verificación e inicio

```bash
npm ci
npm run check
node --env-file=.env scripts/comprobar-conexion.js
node --env-file=.env src/index.js
```

---

## 2. Contrato Final de la API

### Listado con consultas: `GET /api/reservas`

Acepta hasta 4 parámetros opcionales por query string:

| Parámetro | Obligatorio | Por defecto | Reglas de validación |
| :--- | :---: | :--- | :--- |
| `sala` | No | Sin filtro | Único texto no vacío (igualdad exacta luego de `trim()`). |
| `orden` | No | `"estudiante"` | Solo `"estudiante"`, `"personas-asc"` o `"personas-desc"` (desempate por `_id` ascendente). |
| `pagina` | No | `1` | Único texto numérico entero entre `1` y `1000`. |
| `limite` | No | `2` | Único texto numérico entero entre `1` y `20`. |

- **Respuesta exitosa (`200 OK`):**
```json
{
  "datos": [
    {
      "id": "65f0...",
      "estudiante": "Bruno Ejemplo",
      "email": "bruno@example.com",
      "sala": "Sala Norte",
      "fecha": "2026-10-28",
      "turno": "Mañana",
      "personas": 1,
      "estado": "pendiente"
    }
  ],
  "pagina": 1,
  "limite": 2,
  "total": 4,
  "paginas": 2
}
```
- **Proyección:** La consulta selecciona únicamente los 7 campos públicos (`estudiante`, `email`, `sala`, `fecha`, `turno`, `personas`, `estado`) más `_id` interno para construir `id`, sin exponer `_id` ni `__v`.
- **Errores (`400 Bad Request`):** Rechaza parámetros desconocidos (ej. `select`), repetidos, vacíos, decimales o fuera de rango sin modificar datos.
- **Sin coincidencias o página fuera de rango:** Responde `200 OK` con `datos: []` (no `404` ni reajuste automático de `pagina`).

### Endpoints y vistas conservados del TP 09
- `GET /api/reservas/:id` (`200`, `400`, `404`)
- `POST /api/reservas` (`201` con `Location` y `estado: "pendiente"`)
- `PUT /api/reservas/:id` (`200`, `400`, `404`)
- `PATCH /api/reservas/:id` (`200`, `400`, `404`)
- `DELETE /api/reservas/:id` (`204`, `400`, `404`)
- `GET /estado` (total global de reservas)
- Vistas HTML (`/`, `/reservas`, `/reservas/nueva`, `/reservas/:id`)

---

## 3. Solicitudes Reproducibles de Postman

Colección exportada incluida en el repositorio: **`TP10 - Reservas.postman_collection.json`** (cada solicitud incluye su descripción con estado y respuesta esperada).

### Carga inicial de 6 reservas (`POST /api/reservas`)
Enviar `Content-Type: application/json` con `"fecha": "2026-10-28"`, `"turno": "Mañana"` y sin `estado`:

| Estudiante | Email | Sala | Personas | Respuesta esperada |
| :--- | :--- | :--- | :-: | :--- |
| Ana Ejemplo | `ana@example.com` | Sala Norte | 2 | `201 Created`, `Location`, `estado: "pendiente"` |
| Bruno Ejemplo | `bruno@example.com` | Sala Norte | 1 | `201 Created`, `Location`, `estado: "pendiente"` |
| Carla Ejemplo | `carla@example.com` | Sala Norte | 2 | `201 Created`, `Location`, `estado: "pendiente"` |
| Diego Ejemplo | `diego@example.com` | Sala Norte | 3 | `201 Created`, `Location`, `estado: "pendiente"` |
| Elena Ejemplo | `elena@example.com` | Sala Sur | 1 | `201 Created`, `Location`, `estado: "pendiente"` |
| Fabian Ejemplo | `fabian@example.com` | Sala Multimedia | 4 | `201 Created`, `Location`, `estado: "pendiente"` |

### Consultas y respuestas documentadas (`GET /api/reservas`)

| # | Caso | Query Params | Estado | Respuesta esperada |
| :-: | :--- | :--- | :-: | :--- |
| 29 | Sin Params activos | *(ninguno)* | `200` | 2 reservas, `pagina: 1`, `limite: 2`, `total: 6`, `paginas: 3`. |
| 30 | Sala Norte ordenada pág. 1 | `sala=Sala Norte`, `orden=personas-asc`, `pagina=1`, `limite=2` | `200` | 2 reservas (`personas`: 1, 2), `total: 4`, `paginas: 2`. |
| 31 | Sala Norte ordenada pág. 2 | `sala=Sala Norte`, `orden=personas-asc`, `pagina=2`, `limite=2` | `200` | Otras 2 reservas (`personas`: 2, 3), `total: 4`, `paginas: 2`. |
| 32 | Sala Norte orden descendente | `sala=Sala Norte`, `orden=personas-desc`, `pagina=1`, `limite=4` | `200` | 4 reservas (`personas`: 3, 2, 2, 1), `total: 4`, `paginas: 1`. |
| 33 | Página fuera de rango | `sala=Sala Norte`, `pagina=3`, `limite=2` | `200` | `datos: []`, `total: 4`, `paginas: 2`. |
| 34 | Sala inexistente | `sala=Sala inexistente` | `200` | `datos: []`, `total: 0`, `paginas: 0`. |
| 35 | Página cero | `pagina=0` | `400` | `{"error": "La pagina debe ser un entero entre 1 y 1000"}` |
| 36 | Página decimal | `pagina=1.5` | `400` | `{"error": "La pagina debe ser un entero entre 1 y 1000"}` |
| 37 | Límite fuera de rango | `limite=21` | `400` | `{"error": "El límite debe ser un entero entre 1 y 20."}` |
| 38 | Dos filas `pagina` activas | `pagina=1&pagina=2` | `400` | `{"error": "Pagina invalida"}` |
| 39 | Sala vacía | `sala=` | `400` | `{"error": "El parametro sala debe tener contenido"}` |
| 40 | Orden desconocido | `orden=otro` | `400` | `{"error": "Orden no permitido"}` |
| 41 | Parámetro no permitido | `select=email` | `400` | `{"error": "Parametro no permitido"}` |

---

## 4. Decisión de Diseño: Salas y Reservas

Si incorporáramos información propia de las salas, los datos que describirían una **sala** serían su nombre, ubicación o piso, capacidad máxima, equipamiento disponible (proyector, pizarra, computadoras) y estado de habilitación; mientras que los datos que describen una **reserva** siguen siendo el estudiante, email, fecha, turno, cantidad de personas, estado de la reserva y la sala asignada. Tendría sentido usar una **referencia (`ObjectId`)** hacia una colección de salas porque pocas salas se comparten entre muchas reservas y cualquier cambio de capacidad o equipamiento se actualiza en un solo lugar sin duplicar datos ni generar inconsistencias; en cambio, tendría sentido **embeber** un resumen de la sala (como su nombre o ubicación) dentro de la reserva si se priorizan lecturas directas sin consultas adicionales o si se necesita conservar el registro histórico exacto de la sala al momento de reservar.

# Trabajo practico 03

## Descripcion
API desarrollada con **Node.js** y **Express** para la administración temporal de un catalogo de instrumentos musicales. La API carga los datos iniciales desde un archivo JSON

---

## Instalacion
Para instalar las dependencias del proyecto (Express), ejecuta en la terminal dentro de la carpeta del proyecto:

```bash
npm install
```

---

## Ejecucion
Para validar la sintaxis de los archivos JavaScript:
```bash
npm run check
```

Para iniciar el servidor:
```bash
npm start
```
El servidor quedará escuchando en `http://localhost:3000`.

### Como detener el servidor
Para detener la ejecución del servidor, presiona la combinación de teclas en la terminal:
```bash
Ctrl + C
```

---

## Endpoints

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/` | Mensaje de bienvenida y estado de la API. |
| **GET** | `/api/instrumentos` | Lista todos los instrumentos del catálogo. |
| **GET** | `/api/instrumentos?familia=<nombre>` | Filtra los instrumentos por familia (sin distinción de mayúsculas/minúsculas). |
| **GET** | `/api/instrumentos/:id` | Devuelve el detalle del instrumento correspondiente al ID especificado. |
| **POST** | `/api/instrumentos` | Agrega un nuevo instrumento al catálogo en memoria. |

---

## Ejemplos de solicitudes

### 1. Bienvenida
- **Solicitud**: `GET /`
- **Respuesta (200 OK)**:
```json
{
  "mensaje": "API de instrumentos musicales disponible"
}
```

### 2. Listar todos los instrumentos
- **Solicitud**: `GET /api/instrumentos`
- **Respuesta (200 OK)**:
```json
[
  {
    "id": 1,
    "nombre": "Violin",
    "familia": "Cuerdas",
    "origen": "Italia",
    "descripcion": "Instrumento de cuerda frotada",
    "disponible": true
  },
  {
    "id": 2,
    "nombre": "Guitarra",
    "familia": "Cuerdas",
    "origen": "España",
    "descripcion": "Instrumento de cuerda pulsada",
    "disponible": false
  }
]
```

---

## Códigos de estado

- **`200 OK`**: Solicitud procesada exitosamente (GET raiz, listado completo, filtrado por query aunque este vacio, y detalle de instrumento existente).
- **`201 Created`**: Recurso creado exitosamente mediante POST.
- **`400 Bad Request`**: Solicitud erronea o incompleta al intentar crear un instrumento (campos faltantes en el cuerpo de la peticion).
- **`404 Not Found`**: Recurso no encontrado al solicitar un instrumento cuyo ID no existe.

---

## Persistencia de los datos
- Al iniciar la aplicación, se cargan los instrumentos desde el archivo `datos/instrumentos.json` a una estructura de datos en memoria (un array de JavaScript).
- Cuando se realiza un `POST`, el nuevo instrumento se añade únicamente al arreglo en memoria, permitiendo que esté disponible en los listados y búsquedas mientras el servidor permanezca en ejecución.
- Al reiniciar o detener el proceso de Node.js, todas las creaciones realizadas se perderán, ya que la aplicación no modifica el archivo `instrumentos.json` en disco ni utiliza una base de datos persistente.

# Trabajo práctico 04

## Descripción
Aplicación web desarrollada con **Node.js**, **Express** y el motor de plantillas **EJS** (junto con `express-ejs-layouts`)

La aplicación permite:
- Cargar un catálogo inicial de mascotas desde un archivo JSON 
- Explorar el listado completo de mascotas disponibles 
- Contemplar el estado vacío cuando no existan mascotas registradas.
- Visualizar el detalle individual de cada mascota con su información completa y recursos gráficos.
- Agregar temporalmente nuevos registros mediante un formulario web

---

## Instalación
1. Clonar el repositorio o descargar el código fuente en su equipo.
2. Abrir una terminal en el directorio raíz del proyecto 
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
| `GET` | `/` | **Página de inicio**: Bienvenida, presentación del sitio. |
| `GET` | `/mascotas` | **Catálogo general**: Lista de mascotas en adopción organizadas en tarjetas. |
| `GET` | `/mascotas/nueva` | **Formulario de registro**: Formulario para cargar una nueva mascota. |
| `GET` | `/mascotas/:id` | **Detalle de mascota**: Busca por identificador numérico y muestra todos los atributos de la mascota |
| `POST` | `/mascotas` | **Procesamiento de formulario**: Valida los datos recibidos, genera un nuevo ID en caso de éxito, agrega la mascota a la colección en memoria y redirige a `/mascotas`. |

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

---

## Recursos estáticos
Los recursos estáticos se encuentran en la carpeta `public/` 

---

## Formulario
El formulario para registrar una nueva mascota cuenta con campos:
- **Nombre**: campo de texto.
- **Especie**: campo de texto (ej. Perro, Gato, Ave).
- **Edad**: campo numérico entero (`min="0"`).
- **Estado**: selector desplegable (`<select>`) con las tres opciones permitidas: `En adopción`, `Reservada` o `Adoptada`.
- **Descripción**: área de texto (`<textarea>`) para una breve reseña.
---

## Persistencia de los datos
Los datos iniciales se leen desde el archivo `datos/mascotas.json` al arrancar la aplicación y se almacenan en una variable en memoria (un array en JavaScript).

### Motivo por el cual el nuevo registro desaparece al reiniciar
Las nuevas mascotas agregadas a través del formulario se insertan únicamente en el arreglo en memoria mediante el método `.push()`. 
const express = require('express');
const path = require('node:path');
const { leerJson, escribirJson } = require('./archivo');

// Configuración del puerto y ruta del archivo de datos
const puerto = 3000;
const archivo = path.join(__dirname, "..", "datos", "recetas.json");

// 1. Crear la instancia de la aplicación Express
const app = express();

// 2. Middleware global:
// Permite que Express entienda y procese datos en formato JSON que vienen en el "body" (cuerpo) de las peticiones POST/PUT.
app.use(express.json());

async function main() {
    try {
        // Cargamos las recetas desde el archivo JSON al iniciar el servidor (en memoria)
        const recetas = await leerJson(archivo);

        // =========================================================================
        // RUTAS GET (Obtener / Consultar datos)
        // El cliente pide información y el servidor responde sin modificar nada.
        // =========================================================================

        /**
         * GET /
         * Ruta raíz de bienvenida.
         * Demuestra el uso de req (solicitud) y res (respuesta con HTML).
         */
        app.get("/", (req, res) => {
            // req.method: "GET", req.url: "/"
            console.log(`[${req.method}] Solicitud entrante a la raíz`);
            res.send(`<h1>Disponible para recetas</h1>`);
        });

        /**
         * GET /api/recetas
         * Devuelve la lista completa de todas las recetas en formato JSON.
         */
        app.get("/api/recetas", (req, res) => {
            res.json(recetas); // Devuelve status 200 OK automáticamente
        });

        /**
         * GET /api/recetas/buscar?nombre=algo
         * Filtra recetas por coincidencia en el nombre usando QUERY PARAMS (req.query).
         * Ejemplo: http://localhost:3000/api/recetas/buscar?nombre=pan
         */
        app.get("/api/recetas/buscar", (req, res) => {
            const { nombre } = req.query; // Extrae el parámetro ?nombre=...

            // Validación: Evita errores si no enviaron el parámetro
            if (!nombre) {
                return res.status(400).json({ mensaje: "Debes enviar un parámetro 'nombre' para buscar" });
            }

            console.log(`[GET /buscar] Buscando recetas que contengan: "${nombre}"`);

            // .filter() con 'return' para retornar true/false según coincidencia
            const recetasFiltradas = recetas.filter((r) => {
                return r.nombre.toLowerCase().includes(nombre.toLowerCase());
            });

            res.json(recetasFiltradas);
        });

        /**
         * GET /api/recetas/nivel?dificultad=facil
         * Filtra recetas por nivel de dificultad exacto usando QUERY PARAMS (req.query).
         * Ejemplo: http://localhost:3000/api/recetas/nivel?dificultad=Facil
         */
        app.get("/api/recetas/nivel", (req, res) => {
            const { dificultad } = req.query; // Extrae el parámetro ?dificultad=...

            // Validación: Evita que sea undefined
            if (!dificultad) {
                return res.status(400).json({ mensaje: "Debes enviar un parámetro 'dificultad' (ej: Facil, Media, Dificil)" });
            }

            console.log(`[GET /nivel] Filtrando por dificultad: "${dificultad}"`);

            const recetasFiltradas = recetas.filter((r) => {
                return r.dificultad.toLowerCase() === String(dificultad).toLowerCase();
            });

            res.json(recetasFiltradas);
        });

        /**
         * GET /api/recetas/:id
         * Busca una receta específica por su ID mediante ROUTE PARAMS (req.params).
         * Ejemplo: http://localhost:3000/api/recetas/3
         * 
         * ⚠️ NOTA IMPORTANTE: Esta ruta se coloca DESPUÉS de /buscar y /nivel.
         * Si estuviera antes, Express confundiría la palabra "buscar" con un :id.
         */
        app.get("/api/recetas/:id", (req, res) => {
            const { id } = req.params; // Extrae el ID de la URL como String
            const idNumerico = Number(id);

            // Buscamos una sola receta en el arreglo
            const receta = recetas.find((r) => r.id === idNumerico);

            // Si no existe, respondemos con código 404 (Not Found)
            if (!receta) {
                return res.status(404).json({ mensaje: `No se encontró la receta con ID ${id}` });
            }

            res.json(receta);
        });

        // =========================================================================
        // RUTAS POST (Crear / Enviar nuevos datos)
        // El cliente envía datos en el "body" (cuerpo de la petición) para guardar.
        // =========================================================================

        /**
         * POST /api/recetas
         * Crea y agrega una nueva receta a la lista y la guarda en el archivo JSON.
         * Requiere enviar un JSON en el body con: { nombre, dificultad, tiempoMinutos, ingrediente }
         */
        app.post("/api/recetas", async (req, res) => {
            // 1. Extraemos los campos que nos envía el cliente en el body
            const { nombre, dificultad, tiempoMinutos, ingrediente } = req.body;

            // 2. Validación de datos obligatorios (si falta alguno, devolvemos error 400 Bad Request)
            if (!nombre || !dificultad || !tiempoMinutos || !ingrediente) {
                return res.status(400).json({ 
                    mensaje: "Faltan datos obligatorios: nombre, dificultad, tiempoMinutos e ingrediente son requeridos" 
                });
            }

            // 3. Generamos un ID autoincremental seguro basado en el último elemento
            const ultimoId = recetas.length === 0 ? 0 : recetas[recetas.length - 1].id;

            // 4. Creamos el nuevo objeto receta estructurado
            const nuevaReceta = {
                id: ultimoId + 1,
                nombre,
                dificultad,
                tiempoMinutos: Number(tiempoMinutos),
                ingrediente: Array.isArray(ingrediente) ? ingrediente : [ingrediente]
            };

            console.log("Nueva receta creada:", nuevaReceta);

            // 5. Agregamos la receta al array en memoria
            recetas.push(nuevaReceta);

            // 6. Guardamos el array actualizado en el archivo recetas.json
            await escribirJson(archivo, recetas);

            // 7. Respondemos con código 201 (Created) y devolvemos la receta creada con su nuevo ID
            res.status(201).json(nuevaReceta);
        });

        // =========================================================================
        // INICIALIZACIÓN DEL SERVIDOR
        // =========================================================================
        app.listen(puerto, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${puerto}`);
        });

    } catch (error) {
        console.error("❌ Error al iniciar el servidor:", error);
    }
}

// Ejecutar la función principal
main();
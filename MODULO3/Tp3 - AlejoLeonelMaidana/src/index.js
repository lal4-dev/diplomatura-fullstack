const express = require('express');
const path = require('node:path');
const { leerArchivo } = require('./archivos');

const app = express();
const port = 3000;
const archivo = path.join(__dirname, '..', 'datos', 'instrumentos.json');

app.use(express.json());

async function main() {
    try {
        const instrumentos = await leerArchivo(archivo);

        app.get("/", (req, res) => {
            res.json({ mensaje: 'API de instrumentos musicales disponible' });
        });


        app.get("/api/instrumentos", (req, res) => {
            const { familia } = req.query;

            if (!familia) {
                return res.json(instrumentos);
            }

            if (familia) {
                const instrumentosFiltrados = instrumentos.filter((i) => {
                    return i.familia.toLowerCase() === String(familia).toLowerCase();
                });
                return res.json(instrumentosFiltrados);
            }
        });

        app.get("/api/instrumentos/:id", (req, res) => {
            const id = Number(req.params.id);
            const instrumento = instrumentos.find(i => i.id === id);

            if (!instrumento) {
                return res.status(404).json({ error: "Instrumento no encontrado" });
            }

            res.json(instrumento);
        });

        app.post("/api/instrumentos", (req, res) => {
            const { nombre, familia, origen, descripcion, disponible } = req.body;

            if (!nombre || !familia || !origen || !descripcion || disponible === undefined || typeof disponible !== 'boolean') {
                return res.status(400).json({
                    error: "Todos los campos son obligatorios: nombre, familia, origen, descripcion y disponible (booleano)"
                });
            }

            const nuevoId = instrumentos.length > 0 ? instrumentos[instrumentos.length - 1].id + 1 : 1;

            const nuevoInstrumento = {
                id: nuevoId,
                nombre,
                familia,
                origen,
                descripcion,
                disponible
            };

            instrumentos.push(nuevoInstrumento);

            res.status(201).json(nuevoInstrumento);
        });

        app.listen(port, () => {
            console.log(`El servidor está corriendo en http://localhost:${port}`);
        });
    }
    catch (err) {
        console.error(`Error al iniciar el servidor:`, err);
    }
}


main();
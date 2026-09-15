const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("node:path");
const { leerJson } = require("./archivos");

const PORT = 3000;
const rutaDatos = path.join(__dirname, "..", "datos", "mascotas.json");

async function main() {
    const mascotas = await leerJson(rutaDatos);
    const app = express();

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "..", "views"));

    app.use(expressLayouts);
    app.set("layout", "layouts/main");

    app.use(express.static(path.join(__dirname, "..", "public")));
    app.use(express.urlencoded({ extended: false }));

    // ruta principal
    app.get("/", (req, res) => {
        res.render("inicio", {
            titulo: "Mascotas en Adopción",
        });
    });

    // listado de mascotas
    app.get("/mascotas", (req, res) => {
        res.render("mascotas/lista", {
            titulo: "Catálogo de Mascotas",
            mascotas,
        });
    });

    app.get("/mascotas/nueva", (req, res) => {
        res.render("mascotas/nueva", {
            titulo: "Registrar Mascota",
            error: null,
            valores: {},
        });
    });

    // detalle de una mascota 
    app.get("/mascotas/:id", (req, res) => {
        const id = Number(req.params.id);
        const mascota = mascotas.find((elemento) => elemento.id === id);

        if (!mascota) {
            return res.status(404).render("no-encontrado", {
                titulo: "Mascota no encontrada",
                mensaje: "No existe una mascota registrada con ese identificador.",
            });
        }

        res.render("mascotas/detalle", {
            titulo: mascota.nombre,
            mascota,
        });
    });

    // formulario de creación
    app.post("/mascotas", (req, res) => {
        const { nombre, especie, edad, estado, descripcion } = req.body;
        const nombreLimpio = String(nombre ?? "").trim();
        const especieLimpia = String(especie ?? "").trim();
        const estadoLimpio = String(estado ?? "").trim();
        const descripcionLimpia = String(descripcion ?? "").trim();
        const edadNumerica = Number(edad);

        const estadosValidos = ["En adopción", "Reservada", "Adoptada"];

        if (
            !nombreLimpio ||
            !especieLimpia ||
            !descripcionLimpia ||
            !estadosValidos.includes(estadoLimpio) ||
            !Number.isFinite(edadNumerica) ||
            edadNumerica < 0
        ) {
            return res.status(400).render("mascotas/nueva", {
                titulo: "Registrar Mascota",
                error: "Completá todos los campos obligatorios con valores válidos. La edad debe ser cero o mayor.",
                valores: req.body,
            });
        }

        const ultimoId = mascotas.reduce(
            (mayorId, m) => Math.max(mayorId, m.id),
            0
        );

        mascotas.push({
            id: ultimoId + 1,
            nombre: nombreLimpio,
            especie: especieLimpia,
            edad: edadNumerica,
            descripcion: descripcionLimpia,
            estado: estadoLimpio,
            imagen: "/img/mascota.svg",
        });

        res.redirect("/mascotas");
    });

    app.listen(PORT, () => {
        console.log(`Aplicación disponible en http://localhost:${PORT}`);
    });
}

main().catch((error) => {
    console.error("No se pudo iniciar la aplicación:", error);
    process.exitCode = 1;
});

const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const path = require("node:path");

const { leerJson } = require("./archivos");



const puerto = 3000;

const rutaDatos = path.join(__dirname, "..", "datos", "plantas.json");

async function main() {
    try {
        const plantas = await leerJson(rutaDatos);
        const app = express();

        app.set("view engine", "ejs");
        app.set("views", path.join(__dirname, "../view"));
        app.use(ejsLayouts);

        app.set("layout", "layouts/main.ejs");
        app.use(express.static(path.join(__dirname, "..", "public")));

        app.use(express.urlencoded({ extended: true }));

        app.get("/", (req, res) => {
            res.render("inicio", {
                titulo: "El Jardín en casa"
            });
        });

        app.get("/plantas", (req, res) => {
            res.render("plantas/lista", {
                titulo: "Catalogo de plantas", plantas
            });
        });

        app.get("/plantas/nueva", (req, res) => {
            res.render("plantas/nueva", {
                titulo: "Nueva planta",
                error: null,
                valores: {}
            });
        });

        app.get("/plantas/:id", (req, res) => {
            const planta = plantas.find((elemento) => elemento.id === Number(req.params.id));

            if (!planta) {
                return res.status(404).render("no-encontrado", {
                    titulo: "Planta no encontrada",
                    mensaje: "La planta que buscas no existe"
                });
            }

            return res.status(200).render("plantas/detalle", {
                titulo: planta.nombre, planta
            });
        });

        app.post("/plantas", (req, res) => {
            const { nombre, tipo, riego, luz, descripcion } = req.body;

            if (!nombre || !tipo || !riego || !luz || !descripcion) {
                return res.status(400).render("plantas/nueva", {
                    titulo: "Nueva planta",
                    error: "Todos los campos son obligatorios",
                    valores: { nombre, tipo, riego, luz, descripcion }
                });
            }
            const ultimoId = plantas.length === 0 ? 0 : plantas[plantas.length - 1].id;

            const nuevaPlanta = {
                id: ultimoId + 1,
                nombre,
                tipo,
                riego,
                luz,
                descripcion
            };

            plantas.push(nuevaPlanta);
            //await fs.writeFile(rutaDatos, JSON.stringify(plantas, null, 2));
            res.redirect("/plantas");
        })

        app.listen(puerto, () => {
            console.log(`Servidor corriendo en http://localhost:${puerto}`);
        });

    } catch (error) {
        console.log(error);
    }
}

main();
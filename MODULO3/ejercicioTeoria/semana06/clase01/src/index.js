const express = require("express");
const path = require("node:path");

const morgan = require("morgan");
const { leerJson } = require("./archivo.js");
const expressLayouts = require("express-ejs-layouts");

const PORT = 3000;
const rutaDatos = path.join(__dirname, "..", "datos", "productos.json");

let numeroSolicitud = 0;

const { identificarSolicitud, medirDuracion, } = require("./middleware/solicitudes");
const { prepararAreaProductos, validarProducto, } = require("./middleware/productos");
const { crearServicioProductos, } = require("./services/productos");
const { crearControladorProductos, } = require("./drivers/productos");

//quedo un error pendiente aca 
const controladorProductos = crearControladorProductos(servicioProductos);

async function main() {
    const productos = await leerJson(rutaDatos);
    const servicioProductos = crearServicioProductos(productos);
    const app = express();

    function crearProducto(req, res) {
        servicioProductos.crear(req.productoValidado);
        res.redirect("/productos");
    }

    app.use(morgan("dev"));
    app.use(identificarSolicitud);
    app.use(medirDuracion);

    app.use(identificarSolicitud);
    app.use(medirDuracion);

    app.use(express.urlencoded({ extended: false }));
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "../", "views"));

    app.use(expressLayouts);
    app.set("layout", "layouts/main");
    app.use(express.static(path.join(__dirname, "..", "public")));
    app.use(express.json());

    app.get("/", (req, res) => {
        res.render("inicio", { titulo: "Mercado artesanal" });
    });

    app.get("/api/productos", controladorProductos.listarApi);

    const productosRouter = express.Router();

    productosRouter.use(prepararAreaProductos);

    productosRouter.get("/", controladorProductos.listar);

    productosRouter.get("/nuevo", controladorProductos.mostrarFormulario);

    productosRouter.get("/:id", (req, res) => {
        const id = Number(req.params.id);
        const producto = servicioProductos.obtenerPorId(id);
        if (!producto) {
            return res.status(404).render("no-encontrado", {
                titulo: "Producto no encontrado",
                mensaje: "No existe un producto con ese identificador.",
            });
        }
        res.render("productos/detalle", {
            titulo: producto.nombre,
            producto,
        });
    });

    productosRouter.post("/", validarProducto, crearProducto);
    app.use("/productos", productosRouter);
    app.use((req, res) => {
        res.status(404).render("no-encontrado", {
            titulo: "Página no encontrada",
            mensaje: "La dirección solicitada no existe.",
        });
    });

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

main().catch((err) => {
    console.error("Error al ejecutar el servidor:", err);
    process.exitCode = 1;
});
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const path = require("node:path");

const {
  crearIdentificadorSolicitud,
  medirDuracion,
} = require("./middleware/solicitudes");
const { crearControladorReservas } = require("./controllers/reservas");
const { crearRouterReservas } = require("./routes/reservas");

function crearApp({ servicioReservas, formatoRegistro = "dev" }) {
  const app = express();

  const controlador = crearControladorReservas(servicioReservas);
  const routerReservas = crearRouterReservas(controlador);

  // Configuración de motor de vistas EJS
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("layout", "layouts/main");

  // Pipeline de middlewares en el orden estricto del enunciado
  app.use(morgan(formatoRegistro));
  app.use(crearIdentificadorSolicitud());
  app.use(medirDuracion);
  app.use(expressLayouts);
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Rutas raíz de aplicación
  app.get("/", controlador.mostrarInicio);
  app.get("/estado", controlador.mostrarEstado);

  // Router modular de reservas
  app.use("/reservas", routerReservas);

  // Middleware final 404
  app.use((req, res) => {
    res.status(404).render("no-encontrado", {
      titulo: "Página no encontrada",
      mensaje: "La dirección solicitada no existe.",
    });
  });

  return app;
}

module.exports = { crearApp };

//dependencias
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const path = require("node:path");

//middleware
const {
  crearIdentificadorSolicitud,
  medirDuracion,
} = require("./middleware/solicitudes");
const { crearManejadorErrores } = require("./middleware/errores");

//controllers
const { crearControladorReservas } = require("./controllers/reservas");

//routers
const { crearRouterReservas } = require("./routes/reservas");
const { crearRouterReservasApi } = require("./routes/reservas-api");

function crearApp({ servicioReservas, formatoRegistro = "dev" }) {
  const app = express();

  const controlador = crearControladorReservas(servicioReservas);
  const routerReservas = crearRouterReservas(controlador);
  const routerReservasApi = crearRouterReservasApi(controlador);

  //configuración de motor de vistas EJS
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "views"));
  app.set("layout", "layouts/main");

  //pipeline de middlewares en el orden estricto del enunciado
  app.use(morgan(formatoRegistro));
  app.use(crearIdentificadorSolicitud());
  app.use(medirDuracion);
  app.use(expressLayouts);
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  //rutas raíz de aplicación
  app.get("/", controlador.mostrarInicio);
  app.get("/estado", controlador.mostrarEstado);

  //router modular de reservas
  app.use("/api/reservas", routerReservasApi);
  app.use("/reservas", routerReservas);

  //middleware final 404 para rutas inexistentes
  app.use((req, res) => {
    if (req.path.startsWith("/api")) {
      return res.status(404).json({
        error: "ruta no encontrado",
      });
    }

    res.status(404).render("no-encontrado", {
      titulo: "Página no encontrada",
      mensaje: "La dirección solicitada no existe.",
    });
  });

  //middleware para manejo centralizado de errores
  app.use(
    crearManejadorErrores({
      vistaFormulario: "reservas/nueva",
      tituloFormulario: "Nueva reserva",
    }),
  );

  return app;
}

module.exports = { crearApp };

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const path = require("node:path");

const app = express();
const PORT = 3000;

// Constantes de dominio
const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];
const turnosPermitidos = ["Mañana", "Tarde", "Noche"];

// Datos iniciales en memoria (mínimo 4 reservas)
const reservas = [
    {
        id: 1,
        estudiante: "Alejo Maidana",
        email: "alejo.maidana@ejemplo.com",
        sala: "Sala Multimedia",
        fecha: "2026-09-23",
        turno: "Mañana",
        personas: 3,
    },
    {
        id: 2,
        estudiante: "Camila Torres",
        email: "camila.torres@ejemplo.com",
        sala: "Sala Norte",
        fecha: "2026-09-23",
        turno: "Tarde",
        personas: 2,
    },
    {
        id: 3,
        estudiante: "Lucía Fernández",
        email: "lucia.fernandez@ejemplo.com",
        sala: "Sala Sur",
        fecha: "2026-09-24",
        turno: "Noche",
        personas: 4,
    },
    {
        id: 4,
        estudiante: "Mateo Gómez",
        email: "mateo.gomez@ejemplo.com",
        sala: "Sala Norte",
        fecha: "2026-09-24",
        turno: "Mañana",
        personas: 1,
    },
];

let numeroDeSolicitud = 0;

function identificarSolicitud(req, res, next) {
    numeroDeSolicitud += 1;
    res.locals.solicitudId = `BIB-${String(numeroDeSolicitud).padStart(4, "0")}`;
    next();
}

function medirDuracion(req, res, next) {
    const inicio = process.hrtime.bigint();
    res.on("finish", () => {
        const fin = process.hrtime.bigint();
        const milisegundos = Number(fin - inicio) / 1_000_000;
        console.log(
            `[${res.locals.solicitudId}] ${req.method} ${req.originalUrl} ` +
            `${res.statusCode} ${milisegundos.toFixed(2)} ms`
        );
    });
    next();
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.set("layout", "layouts/main");


app.use(morgan("dev"));
app.use(identificarSolicitud);
app.use(medirDuracion);
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas de aplicación
app.get("/", (req, res) => {
    res.render("inicio", {
        titulo: "Inicio",
        salasPermitidas,
        totalReservas: reservas.length,
    });
});

app.get("/estado", (req, res) => {
    res.json({
        servicio: "activo",
        reservas: reservas.length,
        solicitudId: res.locals.solicitudId,
    });
});

// Middleware de router (área de reservas)
function prepararAreaReservas(req, res, next) {
    res.locals.seccion = "Reservas de salas";
    next();
}

// Middleware de validación para POST /reservas
function validarReserva(req, res, next) {
    const estudiante = String(req.body.estudiante ?? "").trim();
    const email = String(req.body.email ?? "").trim();
    const sala = String(req.body.sala ?? "").trim();
    const fecha = String(req.body.fecha ?? "").trim();
    const turno = String(req.body.turno ?? "").trim();
    const personas = Number(req.body.personas);

    let error = null;

    if (
        !estudiante ||
        !email ||
        !sala ||
        !fecha ||
        !turno ||
        req.body.personas === undefined ||
        String(req.body.personas).trim() === ""
    ) {
        error = "Todos los campos son obligatorios.";
    } else if (!email.includes("@")) {
        error = "El correo electrónico debe contener un formato válido con '@'.";
    } else if (!salasPermitidas.includes(sala)) {
        error = `La sala elegida no es permitida. Opciones válidas: ${salasPermitidas.join(", ")}.`;
    } else if (!turnosPermitidos.includes(turno)) {
        error = `El turno elegido no es permitido. Opciones válidas: ${turnosPermitidos.join(", ")}.`;
    } else if (!Number.isInteger(personas) || personas < 1 || personas > 6) {
        error = "La cantidad de personas debe ser un número entero entre 1 y 6.";
    }

    if (error) {
        return res.status(400).render("reservas/nueva", {
            titulo: "Nueva reserva",
            error,
            valores: req.body,
            salasPermitidas,
            turnosPermitidos,
        });
    }

    req.reservaValidada = {
        estudiante,
        email,
        sala,
        fecha,
        turno,
        personas,
    };

    next();
}

// Handler final de creación
function crearReserva(req, res) {
    const ultimoId = reservas.reduce(
        (mayorId, reserva) => Math.max(mayorId, reserva.id),
        0
    );

    reservas.push({
        id: ultimoId + 1,
        ...req.reservaValidada,
    });

    res.redirect("/reservas");
}

// Router de reservas
const reservasRouter = express.Router();
reservasRouter.use(prepararAreaReservas);

reservasRouter.get("/", (req, res) => {
    res.render("reservas/lista", {
        titulo: "Listado de reservas",
        reservas,
    });
});

// Importante: /nueva debe definirse antes de /:id
reservasRouter.get("/nueva", (req, res) => {
    res.render("reservas/nueva", {
        titulo: "Nueva reserva",
        error: null,
        valores: {},
        salasPermitidas,
        turnosPermitidos,
    });
});

reservasRouter.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const reserva = reservas.find((item) => item.id === id);

    if (!reserva) {
        return res.status(404).render("no-encontrado", {
            titulo: "Reserva no encontrada",
            mensaje: "No existe una reserva con ese identificador.",
        });
    }

    res.render("reservas/detalle", {
        titulo: `Detalle de reserva #${reserva.id}`,
        reserva,
    });
});

reservasRouter.post("/", validarReserva, crearReserva);

// Montaje del router bajo /reservas
app.use("/reservas", reservasRouter);

// Middleware 404 (al final de todo el pipeline)
app.use((req, res) => {
    res.status(404).render("no-encontrado", {
        titulo: "Página no encontrada",
        mensaje: "La dirección solicitada no existe.",
    });
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

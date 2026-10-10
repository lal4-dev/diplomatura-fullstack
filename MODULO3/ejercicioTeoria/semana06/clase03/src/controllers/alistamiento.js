const { crearAlistamientoServicio } = require("../services/alistamiento");

function crearAlistamientoController() {
    const servicio = crearAlistamientoServicio();
    function list(req, res) {
        res.json({
            message: "alistamiento exitoso",
            alistamiento: servicio.list()
        });
    }
    return { list }
};

module.exports = { crearAlistamientoController }
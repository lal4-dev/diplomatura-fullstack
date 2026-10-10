function crearAlistamientoServicio() {
    function list() {
        return [
            { id: 1, estudiante: "martin", curso: "Node" },
            { id: 2, estudiante: "lucia", curso: "Python" }
        ];
    }
    return { list }
};

module.exports = { crearAlistamientoServicio }
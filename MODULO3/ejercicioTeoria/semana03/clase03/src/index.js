const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());


const series = [
    { id: 1, titulo: "Breaking Bad", genero: "Crimen" },
    { id: 2, titulo: "Game of Thrones", genero: "Fantasía" },
    { id: 3, titulo: "Friends", genero: "Comedia" },
    { id: 4, titulo: "The Office", genero: "Comedia" },
    { id: 5, titulo: "Stranger Things", genero: "Ciencia Ficción" }
];



app.get("/api/series/:idSerie", (req, res) => {
    console.log("serie a retornar:");
    const serieId = Number(req.params.idSerie)
    const serie = series.find((elemento) => {
        return elemento.id === serieId
    });

    if (!serie) {
        res.json("No se encontro ninguna serie")
    }

    console.log(serie);
    res.json(serie);
});

app.post("/api/series", (req, res) => {
    const { titulo, genero } = req.body;

    if (!titulo || !genero) {
        return res.status(400).json({ error: "Debes enviar un titulo y un genero" })
    }

    const nuevaSerie = {
        id: series.length + 1,
        titulo,
        genero
    }

    series.push(nuevaSerie);
    console.log("Serie agregada: ", nuevaSerie);

    res.status(201).json(nuevaSerie)
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

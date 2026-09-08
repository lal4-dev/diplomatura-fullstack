const express = require("express");
const app = express();
const port = 3000;
const series = [
    {
        id: 1,
        titulo: "Frontera Sur",
        genero: "Drama",
        temporada: 2
    },
    {
        id: 2,
        titulo: "Orbita 9",
        genero: "Ciencia Fiction",
        temporada: 1
    },
    {
        id: 3,
        titulo: "Codigo Central",
        genero: "Drama",
        temporada: 3
    }
]

app.get("/", (req, res) => {
    res.json({ mensaje: "Api disponible de series" });
});

app.get("/api/series", (req, res) => {
    const { genero } = req.query;
    if (!genero) {
        return res.json(series);
    }

    const resultado = series.filter(
        (serie) => serie.genero.toLowerCase() === String(genero).toLowerCase()
    );
    res.json(resultado);
});

app.get("/api/series/:id", (req, res) => {
    const id = Number(req.params.id);
    const serie = series.find((serie) => serie.id === id);
    if (!serie) {
        res.status(404).json({ mensaje: "Serie no encontrada" });
    }
    res.json(serie);
})

app.listen(port, () => {
    console.log(`Servidor disponible en http://localhost:${port}`)
}); 

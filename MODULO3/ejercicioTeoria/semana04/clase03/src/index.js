const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "..", "/views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("Hola mundo desde express");
})

app.get("/autores", (req, res) => {
    const autores = [{
        id: 1,
        nombre: "Jorge Luis Borges",
        nacimiento: "1899",
    }];
    res.render('layout/main', { titulo: "Autores", autores });
})

app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:" + PORT);
});
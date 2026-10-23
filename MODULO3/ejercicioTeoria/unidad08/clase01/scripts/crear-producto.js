const {
    conectarBaseDatos,
    desconectarBaseDatos,
} = require("../src/config/base-datos");
const { Producto } = require("../src/models/producto");
async function main() {
    try {
        await conectarBaseDatos();
        const producto = await Producto.create({
            nombre: "Mate de cerámica",
            categoria: "Cerámica",
            precio: 12000,
            descripcion: "Pieza artesanal esmaltada.",
        });
        console.log("Producto guardado. _id:", producto._id.toString());
    } finally {
        await desconectarBaseDatos();
    }
}
main().catch((error) => {
    console.error("No se pudo crear el producto:", error.name);
    if (error.errors) {
        console.error("Campos a revisar:", Object.keys(error.errors).join(", "));
    }
    console.error("Revisar datos, configuración y disponibilidad de MongoDB.");
    process.exitCode = 1;
});
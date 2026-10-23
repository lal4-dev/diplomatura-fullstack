const {
    conectarBaseDatos,
    desconectarBaseDatos,
} = require("../src/config/base-datos");
const { Producto } = require("../src/models/producto");
async function main() {
    try {
        await conectarBaseDatos();
        const productos = await Producto.find({});
        console.table(
            productos.map((producto) => ({
                id: producto._id.toString(),
                nombre: producto.nombre,
                categoria: producto.categoria,
                precio: producto.precio,
            })),
        );
        console.log("Total de productos:", productos.length);
    } finally {
        await desconectarBaseDatos();
    }
}
main().catch((error) => {
    console.error("No se pudo consultar los productos:", error.name);
    console.error("Revisar configuración y disponibilidad de MongoDB.");
    process.exitCode = 1;
});

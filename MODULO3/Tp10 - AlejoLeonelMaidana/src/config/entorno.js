//Esta funcion es para leer la configuracion del entorno .env
//siempre debe estar al principio del archivo(por que si no da error en el .env)
function leerConfiguracion(entorno = process.env) {
  // primero se convierte a numero a la constante(por que si no se lee como string) y luego se le asigna el valor del entorno, si no se encuentra el valor en el entorno se le asigna 3000 por defecto
  const puerto = Number(entorno.PORT ?? 3000);

  // aca lo que se hace es validar el el rango del puerto si no esta dentro de ese rango se lanza un error.
  if (!Number.isInteger(puerto) || puerto < 1 || puerto > 65535) {
    throw new Error("PORT debe ser un entero entre 1 y 65535");
  }

  // si en el .env no se encuentra el valor de NODE_ENV se le asigna por defecto development, el node_env me dice que modo se esta usando(development o production), si es production se usa el formato combined y si es development se usa el formato dev, esto sirve para el registro de errores de paso se a quien buchonear.
  const modo = entorno.NODE_ENV ?? "development";
  const formatoRegistro = modo === "production" ? "combined" : "dev";
  return { puerto, modo, formatoRegistro };
}

//aca se lee la uri de la base de datos, si no se encuentra se lanza un error.
function leerUriMongo(entorno = process.env) {
  const uri = entorno.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error("Falta MONGODB_URI en el entorno.");
  }
  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error(
      "MONGODB_URI debe comenzar con mongodb:// o mongodb+srv://.",
    );
  }
  return uri;
}
module.exports = { leerConfiguracion, leerUriMongo };

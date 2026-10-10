function leerConfiguracion(entorno = process.env) {
  const puertoRaw = entorno.PORT ?? 3000;
  const puerto = Number(puertoRaw);

  if (!Number.isInteger(puerto) || puerto < 1 || puerto > 65535) {
    throw new Error(
      `El puerto configurado (${puertoRaw}) no es válido. PORT debe ser un número entero entre 1 y 65535.`,
    );
  }

  const modo = entorno.NODE_ENV ?? "development";
  const formatoRegistro = modo === "production" ? "combined" : "dev";

  return {
    puerto,
    modo,
    formatoRegistro,
  };
}

module.exports = { leerConfiguracion };
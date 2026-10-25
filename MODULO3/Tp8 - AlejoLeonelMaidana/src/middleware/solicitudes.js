/* esta funcion crea un identificador de solicitud unico 
para cada solicitud que llega a la aplicacion. 
traemos el middleware de solicitud*/
function crearIdentificadorSolicitud() {
  let numeroDeSolicitud = 0;

  return function identificarSolicitud(req, res, next) {
    numeroDeSolicitud += 1;
    res.locals.solicitudId = `BIB-${String(numeroDeSolicitud).padStart(4, "0")}`;
    next();
  };
}

/*esta funcion mide cuanto tiempo tarda el servidor em responder
lo hace tomando el tiempo de inicio dejara pasar la peticion y
cuando termina la respuesta calcula la diferencia. y 
la imprime junto al identificador de solicitud*/
function medirDuracion(req, res, next) {
  const inicio = process.hrtime.bigint();

  res.on("finish", () => {
    const fin = process.hrtime.bigint();
    const milisegundos = Number(fin - inicio) / 1_000_000;
    console.log(
      `[${res.locals.solicitudId}] ${req.method} ${req.originalUrl} ` +
        `${res.statusCode} ${milisegundos.toFixed(2)} ms`,
    );
  });

  next();
}

module.exports = {
  crearIdentificadorSolicitud,
  medirDuracion,
};

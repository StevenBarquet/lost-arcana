import { app } from "./app/express-app";
import { printRoutes } from "./app/route-logger";
import { TYPED_ENVS } from "./configs/typed-envs";
import { logger } from "./configs/logger";

// Configuración de la app de Express
const port = TYPED_ENVS.PORT || 4000;
const server = app.listen(port, () => {
  logger.prod('Logs visible solo en en prod y dev\n')
  logger.prod({ TYPED_ENVS });
  logger.prod('...Envs cargadas correctamente \n\n');
  logger.debug('Logs visibles solo en dev\n')
  printRoutes();
  console.log(`\n\nListening: http://localhost:${port}`);
  console.log(`tRPC:      http://localhost:${port}/trpc`);
});

// Manejo de errores del servidor
server.on("error", (err) => {
  if ("code" in err && err.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Please choose another port or stop the process using it.`);
  }
  else {
    console.error("Failed to start server:", err);
  }
  process.exit(1);
});

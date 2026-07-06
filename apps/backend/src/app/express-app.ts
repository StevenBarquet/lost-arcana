import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { apiRouter } from "../api/v1";
import { appRouter } from "../trpc/app.router";
import { createContext } from "../trpc/context";
import * as middlewares from "../middlewares/general-and-small";
import type { MessageResponse } from "../models/responses";
import { attachHeaderMiddlewares } from "../middlewares/general-and-small";

/** Genera la app principal de Express con todos los middlewares y rutas configurados */
function generateMainApp() {
  const app = express();

  attachHeaderMiddlewares(app);

  app.get<object, MessageResponse>("/", (req, res) => {
    res.json({
      message: "✨ Hello 👋",
    });
  });

  // -- API REST (paradigma REST, se conserva como ejemplo)
  app.use("/api/v1", apiRouter);

  // -- API tRPC (type-safe end-to-end; el tipo AppRouter lo consume el FE)
  app.use(
    "/trpc",
    createExpressMiddleware({ router: appRouter, createContext }),
  );

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);
  return { app };
}

export const { app } = generateMainApp();

import express from "express";

import type { MessageResponse } from "../../models/responses";
import { healthRouter } from "./health/controller";
import { itemsRouter } from "./items/controller";

const router = express.Router();

router.get<object, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

// Registro de rutas — única fuente de verdad para todos los endpoints
const routes = [
  { path: "/health", router: healthRouter, file: "src/api/v1/health/controller.ts" },
  { path: "/items", router: itemsRouter, file: "src/api/v1/items/controller.ts" },
];

for (const r of routes) router.use(r.path, r.router);

export { routes, router as apiRouter };

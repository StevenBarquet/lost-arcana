import { router } from "./trpc";
import { itemsRouter } from "./routers/items.router";
import { notificationsRouter } from "./routers/notifications.router";

/**
 * Router raíz de la API tRPC. Agrupa todos los sub-routers bajo el namespace
 * `/trpc`. Registra aquí cada nuevo router de dominio.
 */
export const appRouter = router({
  items: itemsRouter,
  notifications: notificationsRouter,
});

/**
 * Tipo del router raíz. El FRONTEND lo importa como **type-only**
 * (`import type { AppRouter }`) para tener type-safety end-to-end sin traer
 * código del backend al bundle. Ver `apps/frontend` (alias `backend/*`).
 */
export type AppRouter = typeof appRouter;

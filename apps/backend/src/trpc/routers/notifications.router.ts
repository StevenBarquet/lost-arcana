import { EventEmitter, on } from "node:events";
import { randomUUID } from "node:crypto";
import { tracked } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

/** Forma de una notificación emitida por el servidor. */
type Notification = {
  id: string;
  message: string;
  timestamp: Date;
};

/**
 * Emitter in-memory. Sencillo y suficiente para un solo proceso.
 * ⚠️ Multi-instancia (varias réplicas del BE tras un balanceador): un evento
 * emitido en la instancia A no llega a los suscritos en la B. Para ese caso,
 * pon un pub/sub externo (Redis, etc.) detrás de este emitter.
 */
const emitter = new EventEmitter();
const NOTIFY_EVENT = "notify";

/**
 * Router `notifications` — ejemplo de **realtime por SSE** con tRPC.
 *
 * - `ping` (mutation): emite una notificación al canal.
 * - `onNotification` (subscription): async generator que hace `yield` de cada
 *   notificación. Se sirve por SSE (`httpSubscriptionLink` en el FE). Usamos
 *   `tracked()` para asignar un id a cada evento; así el navegador puede
 *   reanudar tras una reconexión enviando `lastEventId` automáticamente.
 */
export const notificationsRouter = router({
  ping: publicProcedure
    .input(z.object({ message: z.string().min(1) }).optional())
    .mutation(({ input }) => {
      const notification: Notification = {
        id: randomUUID(),
        message: input?.message ?? "Hello from the server",
        timestamp: new Date(),
      };
      emitter.emit(NOTIFY_EVENT, notification);
      return notification;
    }),

  onNotification: publicProcedure.subscription(async function* (opts) {
    // `on()` devuelve un async iterator de los eventos del emitter, y se corta
    // solo cuando el cliente se desconecta (vía opts.signal).
    for await (const [notification] of on(emitter, NOTIFY_EVENT, {
      signal: opts.signal,
    })) {
      const n = notification as Notification;
      yield tracked(n.id, n);
    }
  }),
});

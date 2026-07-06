import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import type { Context } from "./context";

/**
 * Inicialización de tRPC — única instancia del backend.
 *
 * - `transformer: superjson` → serializa Date/Map/Set/BigInt end-to-end (debe
 *   coincidir con el transformer del cliente en el FE).
 * - `errorFormatter` → adjunta el detalle de errores de validación de Zod en
 *   `error.data.zodError` para que el FE pueda mostrar errores por campo.
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/** Builder de routers. */
export const router = t.router;

/** Procedimiento público (sin auth). Base para queries/mutations/subscriptions. */
export const publicProcedure = t.procedure;

/** Factory de callers server-side (útil para tests o llamadas internas). */
export const createCallerFactory = t.createCallerFactory;

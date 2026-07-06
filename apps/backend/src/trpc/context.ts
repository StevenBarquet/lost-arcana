import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";

/**
 * Crea el contexto de cada request tRPC. Aquí es donde, en un proyecto real,
 * inyectarías cosas por-request: usuario autenticado, cliente de DB, servicios, etc.
 *
 * Por ahora es un stub vacío (template sin capa de datos). Recibe req/res del
 * adapter de Express por si necesitas leer headers/cookies al añadir auth.
 */
export function createContext({ req, res }: CreateExpressContextOptions) {
  return { req, res };
}

/** Tipo del contexto, inferido del valor de retorno de `createContext`. */
export type Context = Awaited<ReturnType<typeof createContext>>;

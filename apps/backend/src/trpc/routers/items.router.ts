import { z } from "zod";
import { publicProcedure, router } from "../trpc";

/** Modelo de ejemplo. En un proyecto real vendría de la DB / capa de dominio. */
type Item = {
  id: number;
  name: string;
  createdAt: Date;
};

// Datos mock in-memory (sin ORM, como el resto del template).
const mockItems: Item[] = [
  { id: 1, name: "First item", createdAt: new Date("2026-01-15T10:00:00Z") },
  { id: 2, name: "Second item", createdAt: new Date("2026-02-20T14:30:00Z") },
];

/**
 * Router de ejemplo `items` — muestra el patrón query + mutation con validación
 * Zod. Réplica en tRPC del endpoint REST `/api/v1/items` (que se conserva como
 * ejemplo del paradigma REST).
 *
 * Nota: `createdAt` es un `Date` real; gracias a superjson llega al FE como `Date`,
 * no como string.
 */
export const itemsRouter = router({
  list: publicProcedure.query(() => {
    return mockItems;
  }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1, "name is required") }))
    .mutation(({ input }) => {
      const newItem: Item = {
        id: mockItems.length + 1,
        name: input.name,
        createdAt: new Date(),
      };
      mockItems.push(newItem);
      return newItem;
    }),
});

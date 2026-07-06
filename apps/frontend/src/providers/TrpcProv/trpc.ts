import { createTRPCContext } from '@trpc/tanstack-react-query';
// El tipo del router vive en el BACKEND; se importa como type-only (se borra en
// build, no entra al bundle). Resuelto vía alias `backend/*` en tsconfig.
import type { AppRouter } from 'backend/src/trpc/app.router';

/**
 * Integración nueva de tRPC con TanStack React Query (tRPC v11).
 * Uso en componentes:
 *   const trpc = useTRPC();
 *   const { data } = useQuery(trpc.items.list.queryOptions());
 */
export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();

import { createTRPCClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from 'backend/src/trpc/app.router';
import { FRONTEND_ENVS } from 'src/utils/constants/frontend-envs';

/**
 * Cliente tRPC "vanilla" (sin React Query): se consume como promesas asíncronas,
 * al estilo de axios/fetch.
 *
 *   const items = await vanillaTRPC.items.list.query();
 *   const nuevo = await vanillaTRPC.items.create.mutate({ name });
 *
 * Útil fuera del árbol de React (utils, servicios, stores) o cuando prefieres
 * manejar el estado de carga/errores manualmente. Para componentes, normalmente
 * conviene el patrón con hooks (`useTRPC()` en `trpc.ts`), que ya trae cache,
 * refetch y estados. Ambos comparten el mismo transformer (superjson) y URL.
 *
 * Nota: no incluye `httpSubscriptionLink`; las subscriptions (SSE) van por el
 * cliente con hooks.
 */
export const vanillaTRPC = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${FRONTEND_ENVS.BACKEND_URL}/trpc`,
      transformer: superjson,
    }),
  ],
});

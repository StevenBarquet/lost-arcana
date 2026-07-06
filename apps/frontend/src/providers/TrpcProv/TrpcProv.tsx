// ---Dependencies
import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createTRPCClient,
  httpBatchLink,
  httpSubscriptionLink,
  splitLink,
} from '@trpc/client';
import superjson from 'superjson';
// ---Config
import type { AppRouter } from 'backend/src/trpc/app.router';
import { FRONTEND_ENVS } from 'src/utils/constants/frontend-envs';
import { TRPCProvider } from './trpc';

interface Props {
  children: ReactNode;
}

const TRPC_URL = `${FRONTEND_ENVS.BACKEND_URL}/trpc`;

/**
 * TrpcProv: monta el cliente tRPC + React Query.
 *
 * `splitLink` enruta por tipo de operación:
 *  - subscriptions → `httpSubscriptionLink` (SSE, tiempo real sencillo).
 *  - queries/mutations → `httpBatchLink` (HTTP con batching).
 *
 * `superjson` debe coincidir con el transformer del backend (Date/Map/Set/BigInt).
 */
export function TrpcProv({ children }: Props) {
  // -----------------------CONSTS, HOOKS, STATES
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        splitLink({
          condition: (op) => op.type === 'subscription',
          true: httpSubscriptionLink({
            url: TRPC_URL,
            transformer: superjson,
          }),
          false: httpBatchLink({
            url: TRPC_URL,
            transformer: superjson,
          }),
        }),
      ],
    }),
  );

  // -----------------------RENDER
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}

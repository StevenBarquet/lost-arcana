// ---Dependencies
import { useQuery } from '@tanstack/react-query'
import type { inferRouterOutputs } from '@trpc/server'
// ---Config/Utils
import type { AppRouter } from 'backend/src/trpc/app.router'
import { useTRPC } from 'src/providers/TrpcProv/trpc'

/** Un item, inferido de la salida del router tRPC (única fuente de verdad). */
export type Item = inferRouterOutputs<AppRouter>['items']['list'][number]

/**
 * useItemsList: query de `items.list`.
 *
 * Expone la data ya con nombres de dominio (`items`) + estado de carga/error
 * aplanado, para que el componente no toque el objeto crudo de React Query.
 *
 * Nota: en TanStack Query v5 `useQuery` NO acepta `onError`; el error se
 * retorna como string y lo renderiza quien consume (no dispara Swal).
 * @returns items, isLoading, error y refetch.
 */
export function useItemsList() {
  // -----------------------CONSTS, HOOKS, STATES
  const trpc = useTRPC()
  const query = useQuery(trpc.items.list.queryOptions())

  // ---------------HOOK DATA
  return {
    items: query.data,
    isLoading: query.isLoading,
    error: query.error?.message ?? null,
    refetch: query.refetch,
  }
}

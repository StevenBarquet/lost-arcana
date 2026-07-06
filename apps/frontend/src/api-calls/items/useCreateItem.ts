// ---Dependencies
import { useMutation, useQueryClient } from '@tanstack/react-query'
// ---Config/Utils
import { useTRPC } from 'src/providers/TrpcProv/trpc'
import { swalApiError } from 'src/utils/functions/alertUtils'

interface Options {
  /** Callback tras crear con éxito (además de la invalidación automática). */
  onSuccess?: () => void
}

/**
 * useCreateItem: mutation de `items.create`.
 *
 * Hook "opinado" — centraliza la política del template:
 *  - `onError` → `swalApiError` (manejo de error consistente en toda la app).
 *  - `onSuccess` → invalida `items.list` para que la lista se refresque sola.
 *
 * El componente solo llama a `createItem({ name })`; no sabe de invalidación.
 * @param {Options} options - onSuccess opcional para efectos extra (cerrar modal, etc.).
 * @returns createItem (dispara la mutation) e isCreating.
 */
export function useCreateItem(options?: Options) {
  // -----------------------CONSTS, HOOKS, STATES
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const mutation = useMutation(
    trpc.items.create.mutationOptions({
      onError: (error) => swalApiError(error.message),
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.items.list.queryFilter())
        options?.onSuccess?.()
      },
    }),
  )

  // ---------------HOOK DATA
  return {
    createItem: mutation.mutate,
    isCreating: mutation.isPending,
  }
}

// ---Dependencies
import { useMutation } from '@tanstack/react-query'
// ---Config/Utils
import { useTRPC } from 'src/providers/TrpcProv/trpc'
import { swalApiError } from 'src/utils/functions/alertUtils'

/**
 * usePingNotification: mutation `notifications.ping`.
 *
 * Emite una notificación al canal SSE. Como toda mutation del template,
 * centraliza `onError` en `swalApiError`. La UI en tiempo real la refleja
 * `useOnNotification` (la subscription), no esta mutation.
 * @returns ping (dispara la notificación) e isPinging.
 */
export function usePingNotification() {
  // -----------------------CONSTS, HOOKS, STATES
  const trpc = useTRPC()

  const mutation = useMutation(
    trpc.notifications.ping.mutationOptions({
      onError: (error) => swalApiError(error.message),
    }),
  )

  // ---------------HOOK DATA
  return {
    ping: mutation.mutate,
    isPinging: mutation.isPending,
  }
}

// ---Dependencies
import { useState } from 'react'
import { useSubscription } from '@trpc/tanstack-react-query'
// ---Config/Utils
import { useTRPC } from 'src/providers/TrpcProv/trpc'

/**
 * useOnNotification: subscription `notifications.onNotification` (SSE).
 *
 * Encapsula la subscription y acumula las notificaciones que empuja el servidor,
 * ya formateadas como texto listo para render. El componente solo lee `notifications`.
 * @returns notifications - lista de mensajes (más reciente primero).
 */
export function useOnNotification() {
  // -----------------------CONSTS, HOOKS, STATES
  const trpc = useTRPC()
  const [notifications, setNotifications] = useState<string[]>([])

  useSubscription(
    trpc.notifications.onNotification.subscriptionOptions(undefined, {
      onData: ({ data }) => {
        setNotifications((prev) => [
          `${data.message} · ${data.timestamp.toLocaleTimeString()}`,
          ...prev,
        ])
      },
    }),
  )

  // ---------------HOOK DATA
  return { notifications }
}

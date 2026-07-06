// ---Dependencies
import type { ReactElement } from 'react'
// ---UI Dependencies
import { Button } from 'antd'
// ---Custom Hooks
import { useItemsList } from 'src/api-calls/items/useItemsList'
import { useCreateItem } from 'src/api-calls/items/useCreateItem'
import { useOnNotification } from 'src/api-calls/notifications/useOnNotification'
import { usePingNotification } from 'src/api-calls/notifications/usePingNotification'
// ---Components
import { ItemsList } from '../ItemsList/ItemsList'
import { CreateItemForm } from '../CreateItemForm/CreateItemForm'
// ---Config/Utils
import { FRONTEND_ENVS } from 'src/utils/constants/frontend-envs'

/**
 * HelloWorld Component: ejemplo end-to-end de tRPC con el patrón **TanStack React
 * Query** (hooks: cache + refetch + estados automáticos).
 *
 * Las llamadas al BE NO viven aquí: se encapsulan en hooks bajo `src/api-calls/`
 * agrupados por router (`items/`, `notifications/`). El componente solo consume
 * la data y dispara acciones — no sabe de tRPC, cache ni invalidación.
 *  - `items.list` → {@link useItemsList} (query).
 *  - `items.create` → {@link useCreateItem} (mutation; invalida la lista sola).
 *  - `notifications.onNotification` → {@link useOnNotification} (subscription SSE).
 *  - `notifications.ping` → {@link usePingNotification} (mutation).
 *
 * Ver `VanillaExample` para el mismo CRUD con el cliente vanilla (promesas).
 * @returns {ReactElement} ReactElement
 */
export function HelloWorld(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const { items, isLoading, error } = useItemsList()
  const { createItem, isCreating } = useCreateItem()
  const { notifications } = useOnNotification()
  const { ping, isPinging } = usePingNotification()

  // -----------------------RENDER
  return (
    <div className="HelloWorld">
      <p>
        Entorno actual: <span>{FRONTEND_ENVS.MODE}</span>
      </p>

      <p>tRPC · items (React Query):</p>
      <ItemsList items={items} isLoading={isLoading} error={error} />
      <div style={{ marginTop: 12 }}>
        <CreateItemForm
          onCreate={(name) => createItem({ name })}
          loading={isCreating}
        />
      </div>

      <p style={{ marginTop: 12 }}>tRPC · subscription (SSE):</p>
      <Button onClick={() => ping(undefined)} loading={isPinging}>
        Enviar notificación
      </Button>
      {notifications.length > 0 && (
        <ul>
          {notifications.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ---Dependencies
import { ReactElement, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSubscription } from '@trpc/tanstack-react-query';
// ---UI Dependencies
import { Button } from 'antd';
// ---Components
import { ItemsList } from '../ItemsList/ItemsList';
import { CreateItemForm } from '../CreateItemForm/CreateItemForm';
// ---Config/Utils
import { FRONTEND_ENVS } from 'src/utils/constants/frontend-envs';
import { useTRPC } from 'src/providers/TrpcProv/trpc';

/**
 * HelloWorld Component: ejemplo end-to-end de tRPC con el patrón **TanStack React
 * Query** (hooks: cache + refetch + estados automáticos).
 * - `items.list` como query.
 * - `items.create` como mutation (refetch de la lista al terminar).
 * - `notifications` como subscription por SSE (tiempo real).
 * Ver `VanillaExample` para el mismo CRUD con el cliente vanilla (promesas).
 * @returns {ReactElement} ReactElement
 */
export function HelloWorld(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const trpc = useTRPC();

  const itemsQuery = useQuery(trpc.items.list.queryOptions());
  const createItem = useMutation(
    trpc.items.create.mutationOptions({
      onSuccess: () => itemsQuery.refetch(),
    }),
  );

  // Subscription por SSE: acumula las notificaciones que empuja el servidor.
  const [notifications, setNotifications] = useState<string[]>([]);
  useSubscription(
    trpc.notifications.onNotification.subscriptionOptions(undefined, {
      onData: ({ data }) => {
        setNotifications((prev) => [
          `${data.message} · ${data.timestamp.toLocaleTimeString()}`,
          ...prev,
        ]);
      },
    }),
  );
  const ping = useMutation(trpc.notifications.ping.mutationOptions());

  // -----------------------RENDER
  return (
    <div className="HelloWorld">
      <p>
        Entorno actual: <span>{FRONTEND_ENVS.MODE}</span>
      </p>

      <p>tRPC · items (React Query):</p>
      <ItemsList
        items={itemsQuery.data}
        isLoading={itemsQuery.isLoading}
        error={itemsQuery.error?.message ?? null}
      />
      <div style={{ marginTop: 12 }}>
        <CreateItemForm
          onCreate={(name) => createItem.mutate({ name })}
          loading={createItem.isPending}
        />
      </div>

      <p style={{ marginTop: 12 }}>tRPC · subscription (SSE):</p>
      <Button onClick={() => ping.mutate(undefined)} loading={ping.isPending}>
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
  );
}

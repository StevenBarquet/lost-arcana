// ---Dependencies
import { ReactElement, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
// ---UI Dependencies
import { Button, Input, Space } from 'antd';
// ---Config/Utils
import { FRONTEND_ENVS } from 'src/utils/constants/frontend-envs';
import { useTRPC } from 'src/providers/TrpcProv/trpc';

/**
 * HelloWorld Component: ejemplo end-to-end de tRPC (patrón TanStack React Query).
 * - `items.list` como query.
 * - `items.create` como mutation (invalida la query al terminar).
 * Sirve para verificar que el type-safety FE↔BE funciona en vivo.
 * @returns {ReactElement} ReactElement
 */
export function HelloWorld(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const trpc = useTRPC();
  const [name, setName] = useState('');

  const itemsQuery = useQuery(trpc.items.list.queryOptions());
  const createItem = useMutation(
    trpc.items.create.mutationOptions({
      onSuccess: () => {
        setName('');
        itemsQuery.refetch();
      },
    }),
  );

  // -----------------------MAIN METHODS
  function handleCreate() {
    if (name.trim()) createItem.mutate({ name });
  }

  // -----------------------RENDER
  return (
    <div>
      <p>
        Entorno actual: <span>{FRONTEND_ENVS.MODE}</span>
      </p>

      <p>tRPC · items.list:</p>
      {itemsQuery.isLoading && <p>Cargando…</p>}
      {itemsQuery.error && <p>Error: {itemsQuery.error.message}</p>}
      {itemsQuery.data && (
        <ul>
          {itemsQuery.data.map((item) => (
            <li key={item.id}>
              {item.name} — {item.createdAt.toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}

      <Space.Compact style={{ width: '100%', marginTop: 12 }}>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del nuevo item"
          onPressEnter={handleCreate}
        />
        <Button
          type="primary"
          onClick={handleCreate}
          loading={createItem.isPending}
        >
          Crear
        </Button>
      </Space.Compact>
    </div>
  );
}

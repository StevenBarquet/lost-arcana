// ---Dependencies
import type { ReactElement } from 'react'
import type { inferRouterOutputs } from '@trpc/server'
// ---Config/Utils
import type { AppRouter } from 'backend/src/trpc/app.router'

/** Tipo de un item, inferido de la salida del router tRPC (única fuente de verdad). */
export type Item = inferRouterOutputs<AppRouter>['items']['list'][number]

interface Props {
  items?: Item[]
  isLoading?: boolean
  error?: string | null
}

/**
 * ItemsList Component: renderiza la lista de items (presentacional puro).
 * No sabe de dónde vienen los datos — lo reutilizan ambos ejemplos de tRPC
 * (React Query y cliente vanilla).
 * @param {Props} props - items, estado de carga y error.
 * @returns {ReactElement} ReactElement
 */
export function ItemsList({ items, isLoading, error }: Props): ReactElement {
  // -----------------------RENDER
  if (isLoading) return <p className="ItemsList">Cargando…</p>
  if (error) return <p className="ItemsList">Error: {error}</p>
  if (!items?.length) return <p className="ItemsList">Sin items.</p>

  return (
    <ul className="ItemsList">
      {items.map((item) => (
        <li key={item.id}>
          {item.name} — {item.createdAt.toLocaleDateString()}
        </li>
      ))}
    </ul>
  )
}

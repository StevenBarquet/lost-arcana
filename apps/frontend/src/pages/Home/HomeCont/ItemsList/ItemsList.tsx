// ---Dependencies
import type { ReactElement } from 'react'
// ---Config/Utils
import type { Item } from 'src/api-calls/items/useItemsList'

// El tipo de dominio vive en la capa de datos (`api-calls/items`); se re-exporta
// aquí por conveniencia para quien ya importaba `Item` de este componente.
export type { Item }

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

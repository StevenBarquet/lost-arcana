// ---Dependencies
import { ReactElement, useEffect, useState } from 'react'
// ---Components
import { ItemsList, type Item } from '../ItemsList/ItemsList'
import { CreateItemForm } from '../CreateItemForm/CreateItemForm'
// ---Config/Utils
import { vanillaTRPC } from 'src/providers/TrpcProv/trpc-vanilla-client'

/**
 * VanillaExample Component: mismo CRUD que `HelloWorld`, pero consumiendo tRPC
 * con el **cliente vanilla** (promesas asíncronas, estilo axios) en vez de hooks.
 *
 * - Fetch inicial de `items.list` al montar.
 * - Al resolver la mutación `items.create` sin error, vuelve a hacer fetch.
 * - Estado de carga/error manejado a mano (el cliente vanilla no trae cache).
 *
 * Reutiliza `ItemsList` y `CreateItemForm` para que la diferencia entre ambos
 * ejemplos sea solo el mecanismo de datos, no la UI.
 * @returns {ReactElement} ReactElement
 */
export function VanillaExample(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const [items, setItems] = useState<Item[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)

  // -----------------------MAIN METHODS
  // El React Compiler estabiliza esta función automáticamente (antes: useCallback).
  async function fetchItems() {
    setIsLoading(true)
    setError(null)
    try {
      const data = await vanillaTRPC.items.list.query()
      setItems(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreate(name: string) {
    setCreating(true)
    try {
      await vanillaTRPC.items.create.mutate({ name })
      // La promesa resolvió sin error → refrescamos la lista.
      await fetchItems()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear')
    } finally {
      setCreating(false)
    }
  }

  // -----------------------HELPERS
  // WHY: el cliente vanilla no tiene cache ni ciclo de vida, así que el fetch inicial
  // se dispara a mano en el mount (excepción "initial data fetching" de claude.md).
  // Es el punto de la demo: contrasta con HelloWorld, donde React Query lo hace solo.
  useEffect(() => {
    void fetchItems()
  }, [])

  // -----------------------RENDER
  return (
    <div className="VanillaExample">
      <p>tRPC · items (cliente vanilla):</p>
      <ItemsList items={items} isLoading={isLoading} error={error} />
      <div style={{ marginTop: 12 }}>
        <CreateItemForm onCreate={handleCreate} loading={creating} />
      </div>
    </div>
  )
}

// ---Dependencies
import type { ReactElement } from 'react'

/**
 * LazyLoadingScreen Component: fallback de Suspense mientras carga un chunk lazy.
 * WHY: usa estilos inline a propósito — se muestra antes de que cargue el CSS del
 * chunk diferido, así que no puede depender de un SCSS module.
 */
export function LazyLoadingScreen(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div
      className="LazyLoadingScreen"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: 'white',
        fontFamily: "'Inter', sans-serif",
        fontSize: '24px',
      }}
    >
      <p
        style={{
          backgroundColor: '#0a1428',
          width: '100%',
          textAlign: 'center',
          fontSize: '28px',
        }}
      >
        Cargando...
      </p>
    </div>
  )
}

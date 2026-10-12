// ---Dependencies
import type { ReactElement } from 'react'
import { Icon } from '@iconify/react'
// ---Config
import { useGetLibraryCtrl } from '../../biblioteca-controller'
// ---Styles
import style from './FactsToolbar.module.scss'

export function FactsToolbar(): ReactElement {
  const {
    searchQuery,
    setSearchQuery,
    sortDir,
    toggleSort,
    clearFilters,
    showFactImages,
    toggleFactImages,
  } = useGetLibraryCtrl()
  // -----------------------CONSTS, HOOKS, STATES
  const hasFilters = !!searchQuery || !!sortDir
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['FactsToolbar']}>
      <div className="search-box">
        <Icon icon="solar:magnifer-linear" width={16} />
        <input
          type="text"
          placeholder="Buscar por título…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button
        className={`tool-btn ${sortDir ? 'active' : ''}`}
        type="button"
        onClick={toggleSort}
        title={sortDir === 'asc' ? 'Ascendente' : 'Descendente'}
      >
        <Icon
          icon={
            sortDir === 'desc'
              ? 'solar:sort-from-top-to-bottom-linear'
              : 'solar:sort-from-bottom-to-top-linear'
          }
          width={18}
        />
      </button>

      <button
        className={`tool-btn ${showFactImages ? 'active' : ''}`}
        type="button"
        onClick={toggleFactImages}
        title={showFactImages ? 'Ocultar imágenes' : 'Mostrar imágenes'}
      >
        <Icon icon="solar:gallery-bold-duotone" width={18} />
      </button>

      {hasFilters && (
        <button
          className="tool-btn clear-btn"
          type="button"
          onClick={clearFilters}
          title="Limpiar filtros"
        >
          <Icon icon="solar:close-circle-linear" width={18} />
        </button>
      )}
    </div>
  )
}

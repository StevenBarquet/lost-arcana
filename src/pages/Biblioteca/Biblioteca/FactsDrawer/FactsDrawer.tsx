// ---Dependencies
import { type ReactElement } from 'react'
import { Collapse, Drawer } from 'antd'
import { Icon } from '@iconify/react'
// ---Components
import { ColoredLi } from 'src/common/ColoredLi/ColoredLi'
// ---Config
import { useGetLibraryCtrl } from '../biblioteca-controller'
// ---Styles
import style from './FactsDrawer.module.scss'

export function FactsDrawer(): ReactElement {
  const {
    drawerState,
    selectedModule,
    selectedFacts,
    filteredFacts,
    searchQuery,
    setSearchQuery,
    sortDir,
    toggleSort,
    clearFilters,
    onClose,
  } = useGetLibraryCtrl()
  // -----------------------CONSTS, HOOKS, STATES
  const hasFilters = !!searchQuery || !!sortDir

  const collapseItems = filteredFacts?.map((fact, i) => ({
    key: `${fact.moduleType}-${fact.key}`,
    label: (
      <ColoredLi index={i} className="fact-label">
        <Icon icon="solar:document-text-bold-duotone" width={18} />
        <span>{fact.title}</span>
      </ColoredLi>
    ),
    children: (
      <ul className="qa-list">
        {fact.quiz.map((q, qi) => (
          <li key={qi}>
            <strong>{q.question}</strong>
            <p>{q.answer ?? q.answers?.join(', ')}</p>
          </li>
        ))}
      </ul>
    ),
  }))

  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <Drawer
      title={selectedModule?.title}
      placement="bottom"
      height="90vh"
      open={drawerState.value}
      onClose={onClose}
      className={style['FactsDrawer']}
      destroyOnHidden
    >
      {!selectedFacts?.length ? (
        <div className="empty-state">
          <div className="icon-glow">
            <Icon icon="line-md:confirm-circle" width={64} />
          </div>
          <h2>Sin hechos</h2>
          <p>No hay hechos disponibles en este módulo.</p>
        </div>
      ) : (
        <>
          <div className="toolbar">
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

          {!filteredFacts?.length ? (
            <p className="no-results">Sin resultados para "{searchQuery}"</p>
          ) : (
            <Collapse
              ghost
              items={collapseItems}
              expandIconPlacement="end"
              expandIcon={({ isActive }) => (
                <Icon
                  icon="solar:alt-arrow-down-bold"
                  width={16}
                  className={`collapse-arrow ${isActive ? 'open' : ''}`}
                />
              )}
            />
          )}
        </>
      )}
    </Drawer>
  )
}

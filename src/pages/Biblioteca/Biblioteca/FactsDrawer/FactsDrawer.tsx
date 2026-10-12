// ---Dependencies
import type { ReactElement } from 'react'
import { Collapse, Drawer, Image } from 'antd'
import { Icon } from '@iconify/react'
// ---Components
import { ColoredLi } from 'src/common/ColoredLi/ColoredLi'
import { FactsToolbar } from './FactsToolbar/FactsToolbar'
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
    showFactImages,
    onClose,
  } = useGetLibraryCtrl()
  // -----------------------CONSTS, HOOKS, STATES

  const collapseItems = filteredFacts?.map((fact, i) => ({
    key: `${fact.moduleType}-${fact.key}`,
    label: (
      <ColoredLi index={i} className="fact-label">
        <Icon icon="solar:document-text-bold-duotone" width={18} />
        <span>{fact.title}</span>
      </ColoredLi>
    ),
    children: (
      <>
        {showFactImages && (
          <Image
            src={`imagenes-modulos/${fact.moduleType}-${fact.key}.webp`}
            width={140}
            className="fact-image"
            preview={{ mask: <Icon icon="solar:eye-bold" width={20} /> }}
          />
        )}
        <ul className="qa-list">
          {fact.quiz.map((q, qi) => (
            <li key={qi}>
              <strong>{q.question}</strong>
              <p>{q.answer ?? q.answers?.join(', ')}</p>
            </li>
          ))}
        </ul>
      </>
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
          <FactsToolbar />

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

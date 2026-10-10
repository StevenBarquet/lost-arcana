// ---Dependencies
import { type ReactElement } from 'react'
import { Drawer } from 'antd'
import { Icon } from '@iconify/react'
// ---Config
import { useGetQuizCtrl } from '../quiz-controller'
// ---Styles
import style from './Quiz.module.scss'

export function Quiz(): ReactElement {
  const { drawerState, selectedModule } = useGetQuizCtrl()
  // -----------------------CONSTS, HOOKS, STATES
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <Drawer
      title={selectedModule.title}
      placement="bottom"
      height="90vh"
      open={drawerState.value}
      onClose={drawerState.setFalse}
      className={style['Quiz']}
    >
      <div className="drawer-content">
        <Icon
          icon={selectedModule?.icon ?? 'solar:notebook-bold-duotone'}
          width={48}
        />
        <h2>{selectedModule?.title}</h2>
        <p>Contenido del módulo próximamente...</p>
      </div>
    </Drawer>
  )
}

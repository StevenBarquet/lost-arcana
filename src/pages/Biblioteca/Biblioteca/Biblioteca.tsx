// ---Dependencies
import { type ReactElement } from 'react'
// ---Components
import { Greeting } from 'src/common/app/Greeting/Greeting'
import { PracticeConfig } from 'src/common/app/PracticeConfig/PracticeConfig'
import { QuizSelector } from 'src/common/app/QuizSelector/QuizSelector'
import { FactsDrawer } from './FactsDrawer/FactsDrawer'
// ---Config
import { LibraryCtrlContext, useLibraryCtrl } from './biblioteca-controller'
// ---Styles
import style from './Biblioteca.module.scss'

export function Biblioteca(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const libraryCtrl = useLibraryCtrl()
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <LibraryCtrlContext.Provider value={libraryCtrl}>
      <div className={style['Biblioteca']}>
        <div className="centerContainer">
          <Greeting title="Biblioteca" subTitle="Revisa todos los módulos" />
          <PracticeConfig reviewsWithWarning />
          <QuizSelector
            options={libraryCtrl.moduleOptions}
            onSelectModule={libraryCtrl.handleSelectModule}
          />
          <FactsDrawer />
        </div>
      </div>
    </LibraryCtrlContext.Provider>
  )
}

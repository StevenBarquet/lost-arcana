// ---Dependencies
import { createContext, useContext, useState } from 'react'
import { usePreferencesStore } from 'src/store/preferences'
import { useBoolean } from 'src/utils/hooks/useBoolean'
import { allModules } from 'src/leitner-modules'

type ModuleOption = {
  key: string
  title: string
  icon: string
  factsCount: number
}

const ALL_MODULES_OPTION: ModuleOption = {
  key: 'all',
  title: 'Todos los módulos',
  icon: 'solar:layers-bold-duotone',
  factsCount: allModules.reduce((acc, m) => acc + m.facts.length, 0),
}

export const useQuizCtrl = () => {
  // -----------------------CONSTS, HOOKS, STATES
  const practiceMode = usePreferencesStore((s) => s.practiceMode)
  const drawerState = useBoolean()
  const [selectedModule, setSelectedModule] =
    useState<ModuleOption>(ALL_MODULES_OPTION) // No importa cual esté iniciado, siempre se actualiza al abrir el drawer.
  const moduleOptions: ModuleOption[] = allModules.map((m) => ({
    key: m.metadata.key,
    title: m.metadata.title,
    icon: m.metadata.icon,
    factsCount: m.facts.length,
  }))

  const options =
    practiceMode === 'reviews'
      ? [ALL_MODULES_OPTION, ...moduleOptions]
      : moduleOptions
  // -----------------------MAIN METHODS
  const handleSelect = (option: ModuleOption) => {
    setSelectedModule(option)
    drawerState.setTrue()
  }

  return {
    practiceMode,
    drawerState,
    selectedModule,
    options,
    handleSelect,
  }
}

export type IQuizCtrl = ReturnType<typeof useQuizCtrl>

export const QuizCtrlContext = createContext<IQuizCtrl | null>(null)

export function useGetQuizCtrl() {
  const ctx = useContext(QuizCtrlContext)
  if (!ctx) {
    throw new Error(
      'useGetQuizCtrl must be used within QuizCtrlContextProvider',
    )
  }
  return ctx
}

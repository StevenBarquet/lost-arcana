// ---Dependencies
import { createContext, useContext, useState } from 'react'
// ---Custom Hooks
import { useBoolean } from 'src/utils/hooks/useBoolean'
// ---Config
import { usePreferencesStore } from 'src/store/preferences'
import { useLeitnerStore } from 'src/store/leitner'
import { allModules, type AllModuleTypes } from 'src/leitner-modules'
import type { IFacts } from 'src/leitner-modules/types'
import { shuffle } from 'src/utils/functions/logicUtils'

type ModuleOption = {
  key: string
  title: string
  icon: string
  factsCount: number
}

type SortDir = 'asc' | 'desc' | null

export const useLibraryCtrl = () => {
  // -----------------------CONSTS, HOOKS, STATES
  const practiceMode = usePreferencesStore((s) => s.practiceMode)
  const showFactImages = usePreferencesStore((s) => s.showFactImages)
  const updatePreferences = usePreferencesStore((s) => s.update)
  const reviewedFacts = useLeitnerStore((s) => s.reviewedFacts)
  const drawerState = useBoolean()
  const [selectedModule, setSelectedModule] = useState<ModuleOption>()
  const [selectedFacts, setSelectedFacts] = useState<IFacts<AllModuleTypes>[]>()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortDir, setSortDir] = useState<SortDir>(null)

  const moduleOptions: ModuleOption[] = allModules.map((m) => ({
    key: m.metadata.key,
    title: m.metadata.title,
    icon: m.metadata.icon,
    factsCount: factsForMode(m.facts).length,
  }))

  const filteredFacts = (() => {
    if (!selectedFacts) return undefined
    let result = selectedFacts
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter((f) => f.title.toLowerCase().includes(q))
    }
    if (sortDir) {
      const mod = allModules.find((m) => m.metadata.key === selectedModule?.key)
      const sortKey = (mod?.metadata.sortKey ?? 'title') as keyof IFacts<AllModuleTypes>
      result = [...result].sort((a, b) => {
        const valA = String(a[sortKey])
        const valB = String(b[sortKey])
        return sortDir === 'asc'
          ? valA.localeCompare(valB, undefined, { numeric: true })
          : valB.localeCompare(valA, undefined, { numeric: true })
      })
    }
    return result
  })()

  // -----------------------MAIN METHODS
  const handleSelectModule = (option: ModuleOption) => {
    const mod = allModules.find((m) => m.metadata.key === option.key)!

    setSelectedFacts(factsForMode(mod.facts))
    setSelectedModule(option)
    setSearchQuery('')
    setSortDir(mod.metadata.sortKey ? 'asc' : null)
    drawerState.setTrue()
  }

  const toggleSort = () =>
    setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))

  const toggleFactImages = () =>
    updatePreferences({ showFactImages: !showFactImages })

  const clearFilters = () => {
    setSearchQuery('')
    setSortDir(null)
  }

  const onClose = () => {
    drawerState.setFalse()
    setSelectedFacts(undefined)
    setSearchQuery('')
    setSortDir(null)
  }

  // -----------------------HELPERS
  function factsForMode(moduleFacts: IFacts<AllModuleTypes>[]) {
    if (practiceMode === 'reviews') {
      const filteredFacts = moduleFacts.filter((f) => {
        const stored = reviewedFacts.find(
          (rf) => rf.moduleType === f.moduleType && rf.key === f.key,
        )
        return stored
      })
      return shuffle(filteredFacts)
    }
    const filteredFacts = moduleFacts.filter(
      (f) =>
        !reviewedFacts.some(
          (rf) => rf.moduleType === f.moduleType && rf.key === f.key,
        ),
    )
    return shuffle(filteredFacts)
  }
  // -----------------------HOOK DATA
  return {
    practiceMode,
    showFactImages,
    toggleFactImages,
    drawerState,
    selectedModule,
    moduleOptions,
    selectedFacts,
    filteredFacts,
    searchQuery,
    setSearchQuery,
    sortDir,
    toggleSort,
    clearFilters,
    handleSelectModule,
    onClose,
  }
}

export type ILibraryCtrl = ReturnType<typeof useLibraryCtrl>

export const LibraryCtrlContext = createContext<ILibraryCtrl | null>(null)

export function useGetLibraryCtrl() {
  const ctx = useContext(LibraryCtrlContext)
  if (!ctx) {
    throw new Error(
      'useGetLibraryCtrl must be used within LibraryCtrlContextProvider',
    )
  }
  return ctx
}

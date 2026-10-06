// ---Dependencies
import React, { ReactNode } from 'react'
import { FullScreenLoading } from './FullScreenLoading/FullScreenLoading'

interface Props {
  children: ReactNode
}

/**
 * Layout Component:  Descripción del comportamiento...
 * @param {Props} props - Parámetros del componente como: ...
 */
export function Layout({ children }: Props) {
  // -----------------------CONSTS, HOOKS, STATES
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <>
      {children}
      <FullScreenLoading />
    </>
  )
}

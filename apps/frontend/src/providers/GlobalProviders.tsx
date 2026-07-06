// ---Dependencies
import React, { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AntdProv } from './AntdProv/AntdProv'
import { ScrollToTop } from './ScrollToTop/ScrollToTop'
import { TrpcProv } from './TrpcProv/TrpcProv'

interface Props {
  children: ReactNode
}

/**
 * GlobalProviders Component: agrupa los providers globales de la app (router,
 * cliente tRPC + React Query, theming, etc).
 * @param {Props} props - Parámetros del componente como: ...
 */
export function GlobalProviders({ children }: Props) {
  // -----------------------CONSTS, HOOKS, STATES
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <BrowserRouter>
      <ScrollToTop />
      <TrpcProv>
        <AntdProv>{children}</AntdProv>
      </TrpcProv>
    </BrowserRouter>
  )
}

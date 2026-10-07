// ---Dependencies
import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
// ---Components
import { AntdProv } from './AntdProv/AntdProv'
import { ScrollToTop } from './ScrollToTop/ScrollToTop'
import { InitGuard } from './InitGuard/InitGuard'

interface Props {
  children: ReactNode
}

export function GlobalProviders({ children }: Props) {
  // -----------------------CONSTS, HOOKS, STATES
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AntdProv>
        <InitGuard>{children}</InitGuard>
      </AntdProv>
    </BrowserRouter>
  )
}

import type { ReactElement } from 'react'
import { Layout } from './layout/Layout'
import { GlobalProviders } from './providers/GlobalProviders'
import { Router } from './Router/Router'

export function App(): ReactElement {
  return (
    <GlobalProviders>
      <Layout>
        <Router />
      </Layout>
    </GlobalProviders>
  )
}

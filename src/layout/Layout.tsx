// ---Dependencies
import type { ReactNode, ReactElement } from 'react'
import { Layout as AntdLayout } from 'antd'
// ---Components
import { FullScreenLoading } from './FullScreenLoading/FullScreenLoading'
import { AppHeader } from './AppHeader/AppHeader'
import { BottomNav } from './BottomNav/BottomNav'

const { Header, Content } = AntdLayout

interface Props {
  children: ReactNode
}

export function Layout({ children }: Props): ReactElement {
  // -----------------------RENDER
  return (
    <AntdLayout>
      <Header
        style={{ padding: 0, height: 'auto', backgroundColor: 'transparent' }}
      >
        <AppHeader />
      </Header>
      <Content>
        {children}
        <FullScreenLoading />
      </Content>
      {/* <Footer>Footer</Footer> */}
      <BottomNav />
    </AntdLayout>
  )
}

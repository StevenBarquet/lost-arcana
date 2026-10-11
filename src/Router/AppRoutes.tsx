// ---Dependencies
import type { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
// ---Components
import HomePage from 'src/pages/Home/Home'
import HealthPage from 'src/pages/Health/Health'
import BibliotecaPage from 'src/pages/Biblioteca/BibliotecaPage';
import Page404 from 'src/pages/Page404/Page404'

export default function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route path='/biblioteca' element={<BibliotecaPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/health" element={<HealthPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

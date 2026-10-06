/* eslint-disable no-restricted-syntax */
// ---Dependencies
import type { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
// ---Components
import { HealthCont } from './HealthCont/HealthCont'

/**
 * Componente Health: da datos al Helmet de la página `/health` y la concatena
 * con su contenedor. La página expone el estado del build (commit info que
 * genera el post-commit hook) y sirve para validar los imports de `shared`.
 * @returns { ReactElement } ReactElement
 */
export default function Health(): ReactElement {
  return (
    <>
      <Helmet>
        <title>Health · Monorepo Template 2026</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <HealthCont />
    </>
  )
}

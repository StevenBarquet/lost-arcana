// ---Dependencies
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import * as commitInfo from 'shared/appVersion'
import style from './HealthCont.module.scss'
// ---Config/Utils
import { FRONTEND_ENVS } from 'src/utils/constants/frontend-envs'

/**
 * HealthCont Component: página `/health` del template. Muestra de forma estética
 * la info del build (commit que genera el post-commit hook) y del entorno del
 * frontend, y sirve para validar en runtime los imports desde `shared`.
 *
 * Las secciones se renderizan desde arreglos `{ label, value }` para que ampliar
 * la info sea trivial y el markup no crezca. La estética es neutral y se apoya en
 * las variables/mixins globales, así un cambio de tema no obliga a tocar esta page.
 * @returns {ReactElement} ReactElement
 */
export function HealthCont(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const buildInfo = [
    { label: 'Commit', value: commitInfo.commitID },
    { label: 'Mensaje', value: commitInfo.commitMssg },
    { label: 'Autor', value: commitInfo.commitAuthor },
    { label: 'Branch', value: commitInfo.commitBranch },
    { label: 'Fecha', value: commitInfo.commitDate },
  ]
  const envInfo = [
    { label: 'Modo', value: FRONTEND_ENVS.MODE },
    { label: 'Producción', value: String(FRONTEND_ENVS.PROD) },
    { label: 'Backend URL', value: FRONTEND_ENVS.BACKEND_URL },
    { label: 'Frontend URL', value: FRONTEND_ENVS.FRONTEND_URL },
  ]

  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['HealthCont']}>
      <div className="centerContainer">
        <header>
          <span className="status">Operativo</span>
          <h2>
            Health <span>check</span>
          </h2>
          <p>Estado del build y del entorno del frontend.</p>
        </header>

        <section className="card">
          <h3>Build · último commit</h3>
          <dl>
            {buildInfo.map((row) => (
              <div className="row" key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="card">
          <h3>Entorno</h3>
          <dl>
            {envInfo.map((row) => (
              <div className="row" key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Link to="/">← Volver al inicio</Link>
      </div>
    </div>
  )
}

// ---Dependencies
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import style from './HealthCont.module.scss'
// ---Config/Utils
import { FRONTEND_ENVS } from 'src/utils/constants/frontend-envs'

export function HealthCont(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const envInfo = [
    { label: 'Modo', value: FRONTEND_ENVS.MODE },
    { label: 'Producción', value: String(FRONTEND_ENVS.PROD) },
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
          <p>Estado del entorno del frontend.</p>
        </header>

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

// ---Dependencies
import { type ReactElement, useEffect, useState } from 'react'
// ---Config
import { DAYJS_ES } from 'src/appConfig/dayjs-es'
// ---Styles
import style from './Greeting.module.scss'
import { usePreferencesStore } from 'src/store/preferences'

function getTimeGreeting(): string {
  const hour = DAYJS_ES().hour()
  if (hour >= 5 && hour < 13) return 'Buenos días'
  if (hour >= 13 && hour < 20) return 'Buenas tardes'
  return 'Buenas noches'
}

export function Greeting(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const name = usePreferencesStore((s) => s.name)
  const [greeting, setGreeting] = useState(getTimeGreeting)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGreeting(getTimeGreeting())
    }, 30 * 60_000) // Valida cada 30 minutos
    return () => clearInterval(intervalId)
  }, [])

  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['Greeting']}>
      <p className="label">
        {greeting}, {name}
      </p>
      <h1>Bienvenido de vuelta</h1>
      <p className="subtitle">
        Tu momento de tranquilidad y estudio ha llegado.
      </p>
    </div>
  )
}

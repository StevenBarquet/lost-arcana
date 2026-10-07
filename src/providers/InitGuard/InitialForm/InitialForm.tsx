// ---Dependencies
import { type ReactElement } from 'react'
// ---Styles
import style from './InitialForm.module.scss'
import { CardMainContent } from 'src/common/CardMainContent/CardMainContent'
import { useInitForm } from './useInitForm'
import { InputFormik } from 'src/common/InputFormik/InputFormik'
import { Button } from 'antd'

/**
 * InitialForm Component:  Descripción del comportamiento...
 */
export function InitialForm(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const { formik } = useInitForm()
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['InitialForm']}>
      <CardMainContent titulo="Preferencias">
        <p>¿Como te gustaría que te llamemos?</p>
        <br />
        <InputFormik
          formik={formik}
          valueName="name"
          label="Nombre"
          placeholder="Ana"
        />
        <InputFormik
          formik={formik}
          valueName="lastName"
          label="Apellido"
          placeholder="Colins"
        />

        <Button type="primary" onClick={formik.submitForm}>
          Confirmar
        </Button>
      </CardMainContent>
    </div>
  )
}

import { useFormik } from 'formik'
import { usePreferencesStore } from 'src/store/preferences'
import { z } from 'src/utils/constants/zodUtils'
import { swalApiConfirm } from 'src/utils/functions/alertUtils'
import { capitalizeWords } from 'src/utils/functions/stringUtils'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export const initDataZSchema = z.object({
  name: z.string().min(2).max(18),
  lastName: z.string().min(2).max(18),
})

interface InitFormData {
  name: string
  lastName: string
}

export function useInitForm() {
  // -----------------------CONSTS, HOOKS, STATES
  const updatePreferences = usePreferencesStore((s) => s.update)
  const formik = useFormik<InitFormData>({
    initialValues: {
      name: '',
      lastName: '',
    },
    onSubmit: onSubmit,
    validationSchema: toFormikValidationSchema(initDataZSchema),
  })
  // -----------------------MAIN METHODS
  async function onSubmit(values: InitFormData) {
    const callback = async () => {
      const name = capitalizeWords(values.name)
      const lastName = capitalizeWords(values.lastName)
      updatePreferences({
        name,
        lastName,
        fullName: `${name} ${lastName}`,
        initials: `${name[0]}${lastName[0]}`,
      })
    }

    swalApiConfirm({
      callback,
      confirmMsg: '¿Estás seguro? No podrás cambiar tus datos más adelante.',
      fireSuccess: true,
      successMsg: 'Tus datos han sido guardados correctamente.',
    })
  }
  // -----------------------HELPERS
  // -----------------------HOOK DATA
  return {
    formik,
  }
}

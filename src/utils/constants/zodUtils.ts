import { z } from 'zod'

z.config(z.locales.es())
// zod traducido a español
export { z }

/** Valida un objeto contra su esquema de zod y devuelve true/false */
export function zodBoolValidator<T, K>(data: T, schema: z.ZodType<K>): boolean {
  const result = schema.safeParse(data)

  if (!result.success) {
    console.log(
      `\n\n------ZOD ERROR ❌ -----\n${result.error.issues.map((e) => e.message).join(', ')}`,
      result.error,
    )
    return false
  }

  return true
}

/** Valida un objeto contra su esquema de zod y arroja una excepción en caso de que el objeto no coincida */
export function zodValidator<T, K>(data: T, schema: z.ZodType<K>): K {
  const result = schema.safeParse(data)

  if (!result.success) {
    console.log(result.error)
    throw new Error(
      `\n\n------ZOD ERROR ❌ -----\n${result.error.issues.map((e) => e.message).join(', ')}`,
    )
  }

  return result.data
}

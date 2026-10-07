/** Normaliza un string y capitaliza la primera letra del string */
export const capitalizeWords = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/(^|\s)\S/g, (match) => match.toUpperCase())

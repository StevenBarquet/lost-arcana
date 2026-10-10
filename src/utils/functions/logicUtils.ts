export function normalizeAnswer(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
}

// Algoritmo shuffle arrays de Fisher-Yates
export function shuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function filterByRelevance(query: string, options: string[], max = 8): string[] {
  const q = normalizeAnswer(query)
  return options
    .map((opt) => {
      const normalized = normalizeAnswer(opt)
      let score = 0
      if (normalized.startsWith(q)) score += 3
      else if (normalized.includes(q)) score += 1
      if (score === 0) return null
      return { opt, score, len: normalized.length }
    })
    .filter(Boolean)
    .sort((a, b) => b!.score - a!.score || a!.len - b!.len)
    .slice(0, max)
    .map((item) => item!.opt)
}

export function flattenComaSep(options: string[]): string[] {
  return options.flatMap((opt) => opt.split(',').map((s) => s.trim())).filter(Boolean)
}

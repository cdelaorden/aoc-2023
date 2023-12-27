export interface Clause {
  lower: number
  upper: number
  shift: number
}

export interface SeedRange {
  start: number
  end: number
  count: number
}
export const sectionToClauses = (section: string): Clause[] => {
  const ranges = section
    .split('\n')
    .slice(1)
    .map((l) => l.split(' ').map(Number))

  const clauses = ranges
    .map((r) => {
      const [dest, src, range] = r
      if (dest == null || src == null || range == null) throw new Error('boom')
      return {
        lower: src,
        upper: src + range - 1,
        shift: dest - src,
      }
    })
    .sort((a, b) => a.lower - b.lower)
  return clauses
}
export const clausesToFunc = (sortedClauses: Clause[]) => {
  const lower_bound = sortedClauses.at(0)?.lower ?? -Infinity
  const upper_bound = sortedClauses.at(-1)?.upper ?? Infinity
  return function (x: number) {
    if (x < lower_bound || x > upper_bound) return x
    const match = sortedClauses.find((c) => c.lower <= x && x <= c.upper)
    return match ? x + match.shift : x
  }
}

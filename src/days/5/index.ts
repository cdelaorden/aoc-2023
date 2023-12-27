const makeAlmanac = (sections: string[]) =>
  sections.slice(1).map((s) => {
    const lines = s.split('\n')
    const range = lines.slice(1).map((l) => l.split(/\s/).map(Number))
    return range.map((values) => ({
      start: values.at(1) as number,
      dest: values.at(0) as number,
      range: values.at(2) as number,
    }))
  })

const getLocation = (
  almanac: { start: number; dest: number; range: number }[][],
  seed: number
) => {
  let search = seed
  for (const s of almanac) {
    for (const range of s) {
      if (range.start <= search && range.start + range.range >= search) {
        search = range.dest + (search - range.start)
        break
      }
    }
  }
  return search
}

export function day5partOne(_sample: string, input: string) {
  const sections = input.split('\n\n')
  const seeds = Array.from(sections[0]?.trim().matchAll(/(\d+)/g) ?? []).map(
    (m) => Number(m[0])
  )
  const almanac = makeAlmanac(sections)
  const minLocation = seeds
    .map((s) => getLocation(almanac, s))
    .reduce((acc, x) => (x < acc ? x : acc), Infinity)
  console.log('Part one: %d', minLocation)
}

export function day5partTwo(_sample: string, _input: string) {
  //
  _sample
  _input
}

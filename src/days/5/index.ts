import { compose } from '@/lib/utils'
import { performance } from 'perf_hooks'

/* 
  Each x-to-x map is indeed a function definition by pieces, like

  if -Inf <= x <= 50 <= 98 then y = x+2
  x   if else
  ...

  So basically we create a function that represents the map, and compose all those
  functions into a single one that we can run

  Part 1 is super fast, let's see part 2 

*/

export const makeFuncFromSection = (s: string) => {
  const ranges = s
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
  //console.log(s, clauses)
  const lower_bound = clauses.at(0)?.lower ?? -Infinity
  const upper_bound = clauses.at(-1)?.upper ?? Infinity
  return function (x: number) {
    if (x < lower_bound || x > upper_bound) return x
    const match = clauses.find((c) => c.lower <= x && x <= c.upper)
    return match ? x + match.shift : x
  }
}

export function day5partOne(_sample: string, input: string) {
  const sections = input.split('\n\n')
  const seeds = Array.from(sections[0]?.trim().matchAll(/(\d+)/g) ?? []).map(
    (m) => Number(m[0])
  )
  const funcs = sections.slice(1).map(makeFuncFromSection)
  const seedToLocation = compose(...funcs)
  const start = performance.now()
  console.log('Part one: %d', Math.min(...seeds.map(seedToLocation)))
  const end = performance.now()
  console.log('Run in %d ms', end - start)
}

export function day5partTwo(sample: string, input: string) {
  if (!sample || !input) throw new Error('wrong data')
  const start = performance.now()
  const sections = input.split('\n\n')
  const seedRanges = Array.from((sections[0] ?? '').matchAll(/\d+/g))
    .map((m) => Number(m[0]))
    .reduce((acc, n, i, ranges) => {
      if (i % 2 === 0) {
        acc.push({
          start: n,
          end: n + (ranges[i + 1] ?? 1) - 1,
          count: ranges[i + 1] ?? 1,
        })
      }
      return acc
    }, [] as { start: number; end: number; count: number }[])
    .sort((r1, r2) => r1.start - r2.start)

  console.log(seedRanges)
  const funcs = sections.slice(1).map(makeFuncFromSection)
  //console.log(funcs)
  const seedToLocation = compose(...funcs)
  console.log('Start calculation...')
  const minSeedDistance = seedRanges.slice(1).reduce((acc, s, i) => {
    console.log('Calculating range %d with %d numbers', i, s.count)
    let min = acc
    for (let n = s.start; n <= s.end; n++) {
      const location = seedToLocation(n)
      if (location < min) {
        min = location
      }
    }
    return min
  }, Infinity)
  console.log('Part two %d', minSeedDistance)
  console.log('Run in %d ms', performance.now() - start)
}

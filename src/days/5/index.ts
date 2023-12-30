// https://adventofcode.com/2023/day/5

//import { compose } from '@/lib/utils'
import { compose } from '@/lib/utils'
import { performance } from 'perf_hooks'
import { pool } from 'workerpool'
import { clausesToFunc, sectionToClauses } from './types'

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
  const clauses = sectionToClauses(s)
  //console.log(s, clauses)
  return clausesToFunc(clauses)
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
  const sections = sample.split('\n\n')
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

  const funcs = sections.slice(1).map(makeFuncFromSection)
  const seedToLocation = compose(...funcs)
  console.log('Start calculation brute force with composition...')
  const minSeedDistance = seedRanges.reduce((acc, s, i) => {
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

export async function day5partTwoPool(sample: string, input: string) {
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

  const clauses = sections.slice(1).map(sectionToClauses)
  const workPool = pool(__dirname + '/worker.js')
  await Promise.all(
    seedRanges.map((range) => {
      return workPool.exec('minDistance', [range, clauses])
    })
  ).then((distances) => {
    console.log('Part Two Pool %d', Math.min(...distances))
    console.log('Finished in %d ms', performance.now() - start)
  })
}

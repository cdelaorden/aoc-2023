import { explode, splitLines, sum } from '@/lib/utils'
import assert from 'assert'
import { createPipe, equals, first, last, map, pipe } from 'remeda'

export const makeHistory = (line: string) => explode(line, ' ').map(Number)

export const parseInput = createPipe(splitLines, map(makeHistory))

export const isAllZeros = (xs: number[]) =>
  xs.length === 0 || xs.every(equals(0))

export const printPyramid = (hs: number[][]) =>
  hs.reduce((acc, h, i) => {
    acc += '  '.repeat(i) + h.join('   ') + '\n'
    return acc
  }, '')

export const calculateDifferences = (seq: number[]) =>
  seq.reduce((acc, n, index) => {
    if (index > 0) {
      acc.push(n - (seq.at(index - 1) as number))
    }
    return acc
  }, [] as number[])

/**
 * Returns the differences until a [0...0] array is found.
 * Does not include the original
 * @param from initial history
 * @returns
 */
export function reduceHistories(from: number[]): number[][] {
  if (isAllZeros(from)) return []
  const next = calculateDifferences(from)
  return [next].concat(reduceHistories(next))
}

export const calculateNext = (history: number[], debug = false) => {
  assert(history.length, 'empty history')
  const histories = reduceHistories(history)
  if (debug) {
    console.log(printPyramid([history].concat(histories)))
  }
  const next = histories.reduceRight((acc, h) => (last(h) ?? 0) + acc, 0)
  return next + (last(history) ?? 0)
}

export const calculatePrev = (history: number[]) => {
  assert(history.length, 'empty history')
  const histories = reduceHistories(history)
  const prev = histories.reduceRight((acc, h) => (first(h) ?? 0) - acc, 0)
  return (first(history) ?? 0) - prev
}

export function day9PartOne(sample: string, input: string) {
  assert(sample && input, 'Bad input data')
  const solution = pipe(input, parseInput, map(calculateNext), sum)
  console.log('Part One', solution)
}

export function day9PartTwo(sample: string, input: string) {
  assert(sample && input, 'Bad input data')
  const solution = pipe(input, parseInput, map(calculatePrev), sum)
  console.log('Part Two', solution)
}

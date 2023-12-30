// https://adventofcode.com/2023/day/12

import { explode, splitLines, sum } from '@/lib/utils'
import assert from 'assert'
import { equals, map, pipe, setPath, tap, zip } from 'remeda'

enum Spring {
  Operational = '.',
  Damaged = '#',
  Unknown = '?',
}

type SpringRow = {
  springs: Spring[]
  damagedGroups: number[]
}

const makeSpring = (char: string): Spring => {
  switch (char) {
    case '.':
      return Spring.Operational
    case '#':
      return Spring.Damaged
    case '?':
      return Spring.Unknown
    default: {
      throw new Error('Unknown spring type')
    }
  }
}

export const makeSpringRow = (line: string): SpringRow =>
  pipe(
    line,
    (l) => explode(l, ' ') as [string, string],
    ([springs, groups]) => ({
      springs: explode(springs).map(makeSpring),
      damagedGroups: explode(groups, ',').map(Number),
    })
  )

const parseInput = (s: string): SpringRow[] =>
  pipe(s, splitLines, map(makeSpringRow))

export const isSatisfied = (row: SpringRow) => {
  const groups = row.springs.join('').split('.')
  const damagedGroups = groups
    .filter((g) => g.split('').every(equals(Spring.Damaged)))
    .map((g) => g.length)
  return (
    damagedGroups.length === row.damagedGroups.length &&
    zip(damagedGroups, row.damagedGroups).every((pair) => pair[0] === pair[1])
  )
}

export const generateValidArrangements = (row: SpringRow): number => {
  const unknownIndex = row.springs.indexOf(Spring.Unknown)
  if (unknownIndex >= 0) {
    // make damaged
    const damaged = setPath(row, ['springs', unknownIndex], Spring.Damaged)
    const operational = setPath(
      row,
      ['springs', unknownIndex],
      Spring.Operational
    )
    return (
      generateValidArrangements(damaged) +
      generateValidArrangements(operational)
    )
  } else {
    return isSatisfied(row) ? 1 : 0
  }
}

export function day12PartOne(sample = '', input = '') {
  assert(sample && input, 'Missing input data')
  const solution = pipe(
    sample,
    parseInput,
    map(generateValidArrangements),
    tap(console.log),
    sum
  )
  console.log('Part One', solution)
}

export function day12PartTwo(sample = '', input = '') {
  assert(sample && input, 'Missing input data')
}

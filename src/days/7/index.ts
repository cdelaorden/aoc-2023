import { explode, splitLines, sum } from '@/lib/utils'
import assert from 'node:assert'
import { map, pipe, reduce, sort } from 'remeda'

const ALPHABET = 'AKQJT98765432'

export const parseInput = (input: string): ParsedHand[] =>
  pipe(
    input,
    splitLines,
    map((line) => line.trim().split(' ')),
    map((parts) => ({
      hand: parts.at(0)?.trim() ?? '',
      bid: Number(parts.at(1)?.trim()) ?? 0,
    }))
  )
type ParsedHand = {
  hand: string
  bid: number
}

export const mapOfOcurrences = (s: string) =>
  pipe(
    s,
    explode,
    reduce((acc, c) => {
      acc.set(c, (acc.get(c) ?? 0) + 1)
      return acc
    }, new Map<string, number>()),
    sortByMostCommon
  )

const sortByMostCommon = (m: Map<string, number>) =>
  pipe(
    Array.from(m.entries()),
    sort((p1, p2) => p2[1] - p1[1])
  )

const compareHandPoints = (h1: ParsedHand, h2: ParsedHand): 0 | 1 | -1 => {
  const c1 = mapOfOcurrences(h1.hand)
  const c2 = mapOfOcurrences(h2.hand)
  for (let i = 0; i < Math.min(c1.length, c2.length); i++) {
    const x1 = c1.at(i)?.at(1)
    const x2 = c2.at(i)?.at(1)
    if (!x1 || !x2) continue
    if (x1 > x2) {
      return 1
    } else if (x1 < x2) {
      return -1
    }
  }
  return 0
}

const compareHands = (
  h1: ParsedHand,
  h2: ParsedHand,
  priorities = ALPHABET
) => {
  const byPoints = compareHandPoints(h1, h2)
  if (byPoints !== 0) return byPoints
  for (let i = 0; i < h1.hand.length; i++) {
    const rank1 = priorities.indexOf(h1.hand[i] as string)
    const rank2 = priorities.indexOf(h2.hand[i] as string)
    if (rank1 > rank2) {
      return -1
    }
    if (rank1 < rank2) {
      return 1
    }
  }
  return 0
}

const calculateHandValue = (h: ParsedHand, index: number) => h.bid * (index + 1)

export function day7PartOne(sample: string, input: string) {
  assert(sample && input, 'Bad input data')
  const solution = pipe(
    input,
    parseInput,
    sort(compareHands),
    map.indexed(calculateHandValue),
    sum
  )
  console.log('Part one: %d', solution)
}

export function day7PartTwo(sample: string, input: string) {
  assert(sample && input, 'Bad input data')
}

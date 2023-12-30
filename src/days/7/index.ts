// https://adventofcode.com/2023/day/7

import { explode, splitLines, sum } from '@/lib/utils'
import assert from 'node:assert'
import { map, pipe, reduce, sort } from 'remeda'

const ALPHABET = 'AKQJT98765432'
const ALPHABET_WITH_JOKER = 'AKQT98765432J'

type ParsedHand = {
  hand: string
  bid: number
  // for joker replacement, keep original here for draws
  original?: string
}

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

export const mapOfOcurrences = (s: string) =>
  pipe(
    s,
    explode,
    reduce((acc, c) => {
      acc.set(c, (acc.get(c) ?? 0) + 1)
      return acc
    }, new Map<string, number>())
  )

export const sortByMostCommon = (m: Map<string, number>) =>
  pipe(
    Array.from(m.entries()),
    sort((p1, p2) => p2[1] - p1[1])
  )

const compareHandPoints = (h1: ParsedHand, h2: ParsedHand) => {
  const c1 = sortByMostCommon(mapOfOcurrences(h1.hand))
  const c2 = sortByMostCommon(mapOfOcurrences(h2.hand))
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

const findBestMostCommon = (
  entries: [string, number][],
  priorities = ALPHABET_WITH_JOKER
) =>
  entries.reduce(
    (acc, entry) => {
      if (entry[1] > acc[1]) return entry
      if (entry[1] < acc[1]) return acc
      if (priorities.indexOf(entry[0]) < priorities.indexOf(acc[0])) {
        return entry
      } else {
        return acc
      }
    },
    ['J', -1]
  )

export const addJoker = (hand: ParsedHand) => {
  if (!hand.hand.includes('J')) return hand
  const m = mapOfOcurrences(hand.hand.replaceAll('J', ''))
  const sortedByMostCommon = sortByMostCommon(m)
  const mostCommon = findBestMostCommon(sortedByMostCommon)
  const result = { ...hand }
  if (mostCommon) {
    result.hand = result.hand.replaceAll('J', mostCommon[0])
    result.original = hand.hand
  }
  return result
}

const compareHands = (
  h1: ParsedHand,
  h2: ParsedHand,
  comparePoints = compareHandPoints,
  priorities = ALPHABET
) => {
  const byPoints = comparePoints(h1, h2)
  if (byPoints !== 0) return byPoints

  for (let i = 0; i < h1.hand.length; i++) {
    const card1 = h1.original ? h1.original[i] : h1.hand[i]
    const card2 = h2.original ? h2.original[i] : h2.hand[i]
    const rank1 = priorities.indexOf(card1 as string)
    const rank2 = priorities.indexOf(card2 as string)
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
  const solution = pipe(
    input,
    parseInput,
    map(addJoker),
    sort((a, b) => compareHands(a, b, compareHandPoints, ALPHABET_WITH_JOKER)),
    map.indexed(calculateHandValue),
    sum
  )
  console.log('Part two: %d', solution)
}

import { explode, splitLines, sum } from '@/lib/utils'
import assert from 'assert'
import { createPipe, map, pipe, tap } from 'remeda'

const parseInput = createPipe(
  splitLines,
  map((l) => explode(l, ' ').map(Number))
)

export const calculateDifferences = (seq: number[]) =>
  seq.reduce((acc, n, index) => {
    if (index < seq.length - 1) {
      const next = seq[index + 1]
      if (next) {
        acc.push(next - n)
      }
    }
    return acc
  }, [] as number[])

export const expandWithDifferences = (seq: number[]) => {
  return seq.reduce(
    (acc, _seq, index) => {
      if (acc.at(-1)?.every((x) => x === 0)) return acc
      const differences = calculateDifferences(acc[index] as number[])
      acc.push(differences)
      return acc
    },
    [seq]
  )
}

export const extrapolateNextValue = (seqs: number[][]): number => {
  const reversed = seqs.reverse()
  reversed[0] = Array.from({ length: seqs.at(-1)?.length ?? 0 }).fill(
    0
  ) as number[]
  return reversed
    .reduce(
      (acc, _seq, index) => {
        const nextRow = reversed[index + 1]
        if (!nextRow) return acc
        acc.push((nextRow.at(-1) as number) + (acc.at(-1) as number))
        return acc
      },
      [0]
    )
    .at(-1) as number
}

export function day9PartOne(sample: string, input: string) {
  assert(sample && input, 'Bad input data')
  const solution = pipe(
    input,
    parseInput,
    map(expandWithDifferences),
    tap(console.log),
    map(extrapolateNextValue),
    sum
  )
  console.log('Part One', solution)
}

export function day9PartTwo(sample: string, input: string) {
  assert(sample && input, 'Bad input data')
}

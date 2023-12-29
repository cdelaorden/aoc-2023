import { explode, splitLines, transpose } from '@/lib/utils'
import assert from 'assert'
import { createPipe, map, pipe } from 'remeda'

type GalaxyMap = {
  grid: Array<Array<string>>
  expandedCols: Set<number>
  expandedRows: Set<number>
}

const parseInput = createPipe(
  (s: string) => splitLines(s),
  map(explode),
  (grid) => {
    return {
      grid,
    }
  }
)

const detectExpanding = (
  m: Omit<GalaxyMap, 'expandedRows' | 'expandedCols'>
): GalaxyMap => {
  const rows = new Set<number>()
  const cols = new Set<number>()
  m.grid.forEach((row, y) => {
    if (!row.find((x) => x === '#')) {
      rows.add(y)
    }
  })
  transpose(m.grid).forEach((col, y) => {
    console.log('transposed col', col)
    if (!col.find((x) => x === '#')) {
      cols.add(y)
    }
  })

  return {
    grid: m.grid,
    expandedCols: cols,
    expandedRows: rows,
  }
}

export function day11PartOne(sample: string, input: string) {
  assert(sample && input, 'Bad input data')
  const map = pipe(sample, parseInput, detectExpanding)
  console.log(map)
}

export function day11PartTwo(sample: string, input: string) {
  assert(sample && input, 'Bad input data')
}

import { combine, explode, splitLines, sum, transpose } from '@/lib/utils'
import assert from 'assert'
import { createPipe, map, pipe } from 'remeda'
/**
 * Represents as Y, X (row, col)
 */
type Point = [number, number]
type GalaxyMap = {
  grid: Array<Array<string>>
  stars: Array<Point>
  expandedCols: Array<number>
  expandedRows: Array<number>
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

const processMap = (
  m: Omit<GalaxyMap, 'expandedRows' | 'expandedCols' | 'stars'>
): GalaxyMap => {
  const emptyRows: number[] = []
  const emptyCols: number[] = []
  const stars: [number, number][] = []
  // find empty cols
  transpose(m.grid).forEach((col, y) => {
    if (!col.find((x) => x === '#')) {
      emptyCols.push(y)
    }
  })
  // find empty rows and star locations
  m.grid.forEach((row, y) => {
    if (!row.find((c) => c === '#')) {
      emptyRows.push(y)
    } else {
      row.forEach((c, x) => {
        if (c === '#') {
          stars.push([y, x])
        }
      })
    }
  })
  return {
    grid: m.grid,
    expandedCols: emptyCols,
    expandedRows: emptyRows,
    stars: stars,
  }
}

const moveStars = (m: GalaxyMap, expandBy = 2): GalaxyMap => {
  return {
    ...m,
    stars: m.stars.map((coords) => {
      const incY =
        m.expandedRows.filter((y) => y < coords[0]).length * (expandBy - 1)
      const incX =
        m.expandedCols.filter((x) => x < coords[1]).length * (expandBy - 1)
      return [coords[0] + incY, coords[1] + incX]
    }),
  }
}

const manhattanDistance = (p1: Point, p2: Point) =>
  Math.abs(p2[0] - p1[0]) + Math.abs(p2[1] - p1[1])

const calculateDistances = (m: GalaxyMap): number[] => {
  return combine(m.stars).map(([s1, s2]) =>
    manhattanDistance(s1 as Point, s2 as Point)
  )
}

export function day11PartOne(sample: string, input: string) {
  assert(sample && input, 'Bad input data')
  const solution = pipe(
    input,
    parseInput,
    processMap,
    moveStars,
    calculateDistances,
    sum
  )
  console.log('Part One', solution)
}

export function day11PartTwo(sample: string, input: string) {
  assert(sample && input, 'Bad input data')
  const EXPANSION = 1_000_000
  const solution = pipe(
    input,
    parseInput,
    processMap,
    (m) => moveStars(m, EXPANSION),
    calculateDistances,
    sum
  )
  console.log('Part Two', solution)
}

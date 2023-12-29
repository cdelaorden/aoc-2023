import { explode, splitLines, sum, transpose } from '@/lib/utils'
import assert from 'assert'
import { createPipe, map, pipe } from 'remeda'
/**
 * Represents as Y, X (row, col)
 */
type Point = [number, number]
type GalaxyMap = {
  grid: Array<Array<string>>
  stars: Array<Point>
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

const processMap = (
  m: Omit<GalaxyMap, 'expandedRows' | 'expandedCols' | 'stars'>
): GalaxyMap => {
  const emptyRows = new Set<number>()
  const emptyCols = new Set<number>()
  const stars = new Set<[number, number]>()

  transpose(m.grid).forEach((col, y) => {
    if (!col.find((x) => x === '#')) {
      emptyCols.add(y)
    }
  })
  m.grid.forEach((row, y) => {
    if (!row.find((c) => c === '#')) {
      emptyRows.add(y)
    } else {
      row.forEach((c, x) => {
        if (c === '#') {
          // account for expansion

          stars.add([y, x])
        }
      })
    }
  })
  return {
    grid: m.grid,
    expandedCols: emptyCols,
    expandedRows: emptyRows,
    stars: Array.from(stars),
  }
}

const moveStars = (m: GalaxyMap): GalaxyMap => {
  return {
    grid: m.grid,
    expandedCols: m.expandedCols,
    expandedRows: m.expandedRows,
    stars: m.stars.map((coords) => {
      const incY = Array.from(m.expandedRows.values()).filter(
        (y) => y < coords[0]
      ).length
      const incX = Array.from(m.expandedCols.values()).filter(
        (x) => x <= coords[1]
      ).length
      return [coords[0] + incY, coords[1] + incX]
    }),
  }
}

const manhattanDistance = (p1: Point, p2: Point) =>
  Math.abs(p2[0] - p1[0]) + Math.abs(p2[1] - p1[1])

const calculateDistances = (m: GalaxyMap): number[] => {
  return m.stars.flatMap((point) =>
    m.stars.map((other) => manhattanDistance(point, other))
  )
}

export function day11PartOne(sample: string, input: string) {
  assert(sample && input, 'Bad input data')
  const map = pipe(input, parseInput, processMap, moveStars)
  const solution = pipe(calculateDistances(map), sum, (x) => x / 2)
  console.log(solution)
}

export function day11PartTwo(sample: string, input: string) {
  assert(sample && input, 'Bad input data')
}

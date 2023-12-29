import { explode } from '@/lib/utils'
import assert from 'assert'
import { createPipe, pipe, reduce } from 'remeda'

/** Tuple of Y, X */
type Point = [number, number]
type Direction = 'N' | 'S' | 'W' | 'E'
type Maze = {
  grid: string[][] //y,x
  start: Point
}

const START = 'S'
const MOVEMENTS: Record<string, [Direction, Direction]> = {
  '|': ['N', 'S'],
  '-': ['E', 'W'],
  L: ['N', 'E'],
  J: ['N', 'W'],
  '7': ['S', 'W'],
  F: ['S', 'E'],
}

const walk = (p: Point, direction: Direction): Point => {
  switch (direction) {
    case 'E':
      return [p[0], p[1] + 1]
    case 'W':
      return [p[0], p[1] - 1]
    case 'N':
      return [p[0] - 1, p[1]]
    case 'S':
      return [p[0] + 1, p[1]]
  }
}

const makeEmptyMaze = (size: number): Maze => ({
  grid: new Array(size).fill([]),
  start: [-1, -1],
})

const equals = (p1: Point, p2?: Point) =>
  p1 && p2 && p1[0] === p2[0] && p1[1] === p2[1]

const getAtPoint = (maze: Maze, point: Point) =>
  maze.grid.at(point[0])?.at(point[1]) as string

const parseMaze = createPipe(
  (s: string) => s.split('\n'),
  (lines) =>
    reduce.indexed(
      lines,
      (maze, line, y) => {
        maze.grid[y] = explode(line)
        const startIndex = line.indexOf(START)
        if (startIndex != -1) {
          maze.start = [y, startIndex]
        }
        return maze
      },
      makeEmptyMaze(lines.length)
    )
)

const getPossibleMoves = (p: Point, char: string): Point[] => {
  return MOVEMENTS[char]?.map((dir) => walk(p, dir)) ?? []
}

const getStartDirection = (m: Maze): Direction => {
  // north
  if (['|', '7', 'F'].includes(getAtPoint(m, walk(m.start, 'N')) ?? '')) {
    return 'N'
  }
  // south
  if (['|', 'J', 'L'].includes(getAtPoint(m, walk(m.start, 'S')) ?? '')) {
    return 'S'
  }
  // east
  if (['-', '7', 'J'].includes(getAtPoint(m, walk(m.start, 'E')) ?? '')) {
    return 'E'
  }
  // west
  if (['-', 'L', 'F'].includes(getAtPoint(m, walk(m.start, 'W')) ?? '')) {
    return 'W'
  }
  throw new Error('No start direction found')
}

const findLongestPath = (maze: Maze): Point[] => {
  const path = [maze.start]
  let current = walk(maze.start, getStartDirection(maze))
  while (current) {
    const last = path.at(-1)
    path.push(current)
    const [a, b] = getPossibleMoves(current, getAtPoint(maze, current))
    assert(a && b, `did not get two neighbours at ${current}`)
    if (
      (equals(maze.start, a) || equals(maze.start, b)) &&
      !equals(maze.start, last)
    ) {
      return path
    }
    current = equals(b, last) ? a : b
  }
  return path
}

const maxSteps = (path: Point[]) => Math.ceil(path.length / 2)

export function day10PartOne(sample: string, input: string) {
  assert(sample && input, 'Missing input data')
  const maze = parseMaze(input)
  assert(getAtPoint(maze, maze.start) === 'S', 'S not found at pos xDDD')
  const solution = pipe(maze, findLongestPath, maxSteps)
  console.log('Part one: %d', solution)
}

export function day10PartTwo(sample: string, input: string) {
  assert(sample && input, 'Missing input data')
}
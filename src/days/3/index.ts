import { readInput } from '@/lib/fs'
import { borderAround, type Coord } from '@/lib/utils'
import { uniq } from 'remeda'
type Engine = {
  numbers: Array<{ value: number; x: number; y: number }>
  symbols: Array<Array<string>>
}

const numbersRegEx = /(\d)+/g
const symbolRegEx = /([^.\d])/g
const parseSchematics = (lines: string[]) => {
  const engine: Engine = {
    numbers: [],
    symbols: [],
  }
  lines.forEach((l, y) => {
    const numberMatches = Array.from(l.matchAll(numbersRegEx))
    const symbolMatches = Array.from(l.matchAll(symbolRegEx))
    // console.log('Line', l)
    // console.log('numbers', numberMatches)
    // console.log('symbols', symbolMatches)
    numberMatches.forEach((m) =>
      engine.numbers.push({
        value: Number(m[0]),
        x: m.index ?? 0,
        y,
      })
    )
    symbolMatches.forEach((m) => {
      if (!m.index) return
      if (!engine.symbols[y]) {
        engine.symbols[y] = []
      }
      // @ts-expect-error not undefined
      engine.symbols[y][m.index] = m[0]
    })
  })
  return engine
}

const makePNCandidates = (value: number, x: number, y: number) => {
  const result: Array<{ x: number; y: number }> = []
  const maxX = value.toString().length + x
  // row above
  if (y > 0) {
    if (x > 0) {
      result.push({ y: y - 1, x: x - 1 })
    }
    for (let x1 = x; x1 <= maxX; x1++) {
      result.push({
        y: y - 1,
        x: x1,
      })
    }
  }
  // same row
  if (x > 0) {
    result.push({ x: x - 1, y })
  }
  result.push({ x: maxX, y })
  // row below
  if (x > 0) {
    result.push({ x: x - 1, y: y + 1 })
  }
  for (let x1 = x; x1 <= maxX; x1++) {
    result.push({
      x: x1,
      y: y + 1,
    })
  }
  return result
}

const getPartNumbers = (e: Engine) => {
  const isSymbolAt = (x: number, y: number) => {
    return e.symbols.at(y) != null && e.symbols[y]?.at(x) != null
  }
  return e.numbers.filter((pn) => {
    const candidates = makePNCandidates(pn.value, pn.x, pn.y)
    return candidates.some((coord) => isSymbolAt(coord.x, coord.y))
  })
}

export async function day3partOne() {
  const sample = await readInput(3)
  const engine = parseSchematics(sample.split('\n'))
  const partNumbers = getPartNumbers(engine)
  console.log(
    'Part 1: %d',
    partNumbers.reduce((acc, pn) => acc + pn.value, 0)
  )
}

type Engine2 = {
  gears: Array<Coord>
  numbers: Array<{ value: number; start: Coord; end: Coord }>
}

const gearRegex = /\*/g
const parseEngine2 = (lines: string[]) => {
  const result: Engine2 = {
    gears: [],
    numbers: [],
  }

  lines.forEach((l, y) => {
    const numbers = Array.from(l.matchAll(numbersRegEx))
    const gears = Array.from(l.matchAll(gearRegex))
    numbers.forEach((m) => {
      const x = m.index ?? 0
      result.numbers.push({
        value: Number(m[0]),
        start: { x, y },
        end: { x: x + m[0].length - 1, y },
      })
    })
    gears.forEach((m) => {
      result.gears.push({
        x: m.index ?? 0,
        y,
      })
    })
  })

  return result
}

const findRealGears = (e: Engine2) => {
  return e.gears
    .map((g) => {
      const border = borderAround(g)

      const adjacentPoints = uniq(
        border.reduce((acc, c) => {
          const ns = e.numbers.filter((n) => {
            return c.x >= n.start.x && c.x <= n.end.x && c.y === n.start.y
          })
          acc.push(...ns)
          return acc
        }, [] as { value: number; start: Coord; end: Coord }[])
      )

      if (adjacentPoints.length === 2) {
        return (
          (adjacentPoints.at(0)?.value as number) *
          (adjacentPoints.at(1)?.value ?? 0)
        )
      } else return 0
    })
    .reduce((acc, x) => acc + x, 0)
}

export async function day3partTwo() {
  const input = await readInput(3)
  const engine = parseEngine2(input.split('\n'))
  console.log('engine %o', engine)
  const realGears = findRealGears(engine)
  console.log('Part 2: %d', realGears)
}

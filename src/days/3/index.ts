import { readInput } from '@/lib/fs'

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
  console.log('Pns', partNumbers)
  console.log(
    'Sum',
    partNumbers.reduce((acc, pn) => acc + pn.value, 0)
  )
}

export async function day3partTwo() {}

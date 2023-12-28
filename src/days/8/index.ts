import { explode, splitLines } from '@/lib/utils'
import assert from 'assert'
import { pipe } from 'remeda'

type CamelMap = {
  movements: number[]
  nodes: Map<string, [string, string]>
}

const parseInput = (s: string): CamelMap =>
  pipe(s, splitLines, (lines) => {
    const movements = explode(
      lines.at(0)?.replaceAll('L', '0').replaceAll('R', '1')
    ).map(Number)
    assert(movements.length === lines.at(0)?.length)
    const nodes = lines.slice(2).reduce((acc, line) => {
      const [source = '', destinations = ''] = line.split(' = ')
      const nodes = Array.from(destinations.matchAll(/\w\w\w/g)).map(
        (m) => m[0]
      )
      acc.set(source, [nodes.at(0) ?? '', nodes.at(1) ?? ''])
      return acc
    }, new Map<string, [string, string]>())
    return {
      movements,
      nodes,
    }
  })

const countSteps = (m: CamelMap): number => {
  let count = 0
  let currentNode = 'AAA'
  while (currentNode !== 'ZZZ') {
    const nextMov = m.movements[count % m.movements.length] as number
    currentNode = m.nodes.get(currentNode)?.at(nextMov) as string
    count++
  }
  return count
}

export async function day8PartOne(sample: string, input: string) {
  assert(sample && input, 'Bad input data')
  const solution = pipe(input, parseInput, countSteps)
  console.log('Part one: %d', solution)
}

export async function day8PartTwo(sample: string, input: string) {
  assert(sample && input, 'Bad input data')
}

import { readInput, readSample } from '@/lib/fs'
import { replace, reverse } from '@/lib/strings'
import * as R from 'remeda'

const getFirstDigit = R.createPipe(
  (x: string) => x.split(''),
  R.map(parseInt),
  R.filter(R.isNumber),
  R.first(),
  (x: number | undefined) => {
    if (x == null) throw new Error('Not a number!')
    return x as number
  }
)

export const replaceDigitNames = (x: string): string => {
  return R.pipe(
    x,
    replace('one', '1'),
    replace('two', '2'),
    replace('three', '3'),
    replace('four', '4'),
    replace('five', '5'),
    replace('six', '6'),
    replace('seven', '7'),
    replace('eight', '8'),
    replace('nine', '9')
  )
}

export const getCalibrationValue = (line: string) => {
  return getFirstDigit(line) * 10 + getFirstDigit(reverse(line))
}

export const getSumOfCalibrations = R.createPipe(
  (input: string) => input.split('\n'),
  R.map(getCalibrationValue),
  R.reduce((acc, x) => acc + x, 0)
)
const dict: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}
const regex = /(\d|one|two|three|four|five|six|seven|eight|nine)/g

export const getDigits = (line: string) => {
  const matches = line.match(regex)
  return (matches ?? []).map((x) => Number(x) || dict[x]) ?? []
}

export const getCalibrationValue2 = (line: string) => {
  const digits = getDigits(line)
  return Number(`${R.first(digits)}${R.last(digits)}`)
}

export const getSumOfCalibrations2 = R.createPipe(
  (input: string) => input.split('\n'),
  R.map(getCalibrationValue2),
  R.reduce((acc, x) => acc + x, 0)
)

export async function day1Sample() {
  const sample = await readSample(1)
  return getSumOfCalibrations(sample)
}

export async function Day1PartOne() {
  const input = await readInput(1)
  console.log(`Sum of calibrations: %d`, getSumOfCalibrations(input))
}

export async function Day1PartTwo() {
  const input = await readInput(1)
  console.log('Part two: %d', getSumOfCalibrations2(input))
}

import { readFile } from 'node:fs/promises'
async function readTextFile(path: string) {
  return readFile(path, {
    encoding: 'utf-8',
  }).catch(() => '')
}

export function readSample(day: number) {
  return readTextFile(`${__dirname}/../fixtures/${day}/sample.txt`)
}

export function readInput(day: number) {
  return readTextFile(`${__dirname}/../fixtures/${day}/input.txt`)
}

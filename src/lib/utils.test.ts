import { borderAround, combine, isNumberString, transpose } from './utils'

describe('borderAround', () => {
  it('generates an Array of Coords around a given Coord', () => {
    const result = borderAround({ x: 0, y: 0 })
    expect(result).toHaveLength(3)
  })
})

describe('isNumberString', () => {
  it('returns true for digits-only strings', () => {
    expect(isNumberString('9292')).toBe(true)
    expect(isNumberString('0')).toBe(true)
    expect(isNumberString('1111')).toBe(true)
  })
  it('returns false otherwise', () => {
    expect(isNumberString('abc')).toBe(false)
    expect(isNumberString('')).toBe(false)
    expect(isNumberString('1bd')).toBe(false)
  })
})

describe('Transpose', () => {
  it('transposes a 2D matrix', () => {
    expect(
      transpose([
        [1, 2],
        [3, 4],
      ])
    ).toEqual([
      [1, 3],
      [2, 4],
    ])
    // N != M
    expect(
      transpose([
        [1, 2, 3],
        [4, 5, 6],
      ])
    ).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ])
  })
})

describe('Combine', () => {
  it('makes distinct pairs in a list', () => {
    expect(combine([1, 2, 3])).toEqual([
      [1, 2],
      [1, 3],
      [2, 3],
    ])
    expect(combine([1])).toEqual([])
  })
})

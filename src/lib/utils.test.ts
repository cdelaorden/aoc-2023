import { borderAround, isNumberString } from './utils'

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

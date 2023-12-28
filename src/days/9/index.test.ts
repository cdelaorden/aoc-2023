import {
  calculateDifferences,
  calculateNext,
  isAllZeros,
  makeHistory,
  parseInput,
  reduceHistories,
} from '.'

describe('Day 9 Mirage maintenance', () => {
  describe('parseInput', () => {
    it('generates array of histories', () => {
      expect(parseInput('0 3 6 9 12 15\n1 2 3 4')).toEqual([
        [0, 3, 6, 9, 12, 15],
        [1, 2, 3, 4],
      ])
    })
  })
  describe('isAllZeros', () => {
    it('returns true if array is composed of only 0s', () => {
      expect(isAllZeros([0])).toBe(true)
      expect(isAllZeros([])).toBe(true)
      expect(isAllZeros([1, 0])).toBe(false)
    })
  })
  describe('calculateDifferences', () => {
    it('creates a new Array with differences', () => {
      const result = calculateDifferences([0, 3, 6, 9, 12, 15])
      expect(result).toEqual([3, 3, 3, 3, 3])
      const result2 = calculateDifferences(result)
      expect(result2).toEqual([0, 0, 0, 0])
    })
  })

  describe('reduceHistories (recursive)', () => {
    it('generates prev histories', () => {
      const result = reduceHistories([0, 3, 6, 9, 12, 15])
      expect(result).toMatchSnapshot()
    })
  })
  describe('calculateNext', () => {
    it('returns the next value in the history', () => {
      expect(calculateNext([0, 3, 6, 9, 12, 15])).toBe(18)
      expect(calculateNext([1, 3, 6, 10, 15, 21])).toBe(28)
      expect(calculateNext([10, 13, 16, 21, 30, 45])).toBe(68)
      expect(
        calculateNext(
          makeHistory('9 8 7 6 5 4 3 2 1 0 -1 -2 -3 -4 -5 -6 -7 -8 -9 -10 -11')
        )
      ).toBe(-12)
      expect(calculateNext(makeHistory('-9 -13 -17 -21 -25 -29 -33 -37'))).toBe(
        -41
      )
    })
  })
})

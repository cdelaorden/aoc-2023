import {
  getCalibrationValue,
  getDigits,
  getSumOfCalibrations,
  getSumOfCalibrations2,
} from '.'

describe('Day one', () => {
  describe('getCalibrationValue', () => {
    it('returns first and last digits', () => {
      expect(getCalibrationValue('1abc2')).toBe(12)
      expect(getCalibrationValue('pqr3stu8vwx')).toBe(38)
      expect(getCalibrationValue('a1b2c3d4e5f')).toBe(15)
      expect(getCalibrationValue('treb7uchet')).toBe(77)
    })
  })

  describe('getSumOfCalibrations', () => {
    it('folds input over getCalibrationValue and sums', () => {
      expect(
        getSumOfCalibrations(`1abc2
      pqr3stu8vwx
      a1b2c3d4e5f
      treb7uchet`)
      ).toBe(142)
    })
  })

  describe('getDigits', () => {
    it('Replaces spelled numbers with digits', () => {
      expect(getDigits('two1nine')).toEqual([2, 1, 9])
      expect(getDigits('eightwothree')).toEqual([8, 3])
      expect(getDigits('abcone2threexyz')).toEqual([1, 2, 3])
      expect(getDigits('xtwone3four')).toEqual([2, 3, 4])
      expect(getDigits('4nineeightseven2')).toEqual([4, 9, 8, 7, 2])
      expect(getDigits('zoneight234')).toEqual([1, 2, 3, 4])
      expect(getDigits('7pqrstsixteen')).toEqual([7, 6])
    })
  })

  describe('getSumOfCalibrations2', () => {
    it('replaces digits, folds input over getCalibrationValue and sums', () => {
      expect(
        getSumOfCalibrations2(`two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`)
      ).toBe(281)
    })
  })
})

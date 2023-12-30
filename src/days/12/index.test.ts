import { generateValidArrangements, isSatisfied, makeSpringRow } from '.'

describe('Day 12 Hot Springs', () => {
  describe('isSatisfied', () => {
    it('returns true if spring row satisfies its damaged group info', () => {
      const row = makeSpringRow('#.#.### 1,1,3')
      expect(isSatisfied(row)).toBe(true)

      const row2 = makeSpringRow('.#...#....###. 1,1,3')
      expect(isSatisfied(row2)).toBe(true)
    })
  })

  describe('generateValidArrangements', () => {
    it('returns the number of valid combinations', () => {
      const sampleCases = [
        '???.### 1,1,3',
        '.??..??...?##. 1,1,3',
        '?#?#?#?#?#?#?#? 1,3,1,6',
        '????.#...#... 4,1,1',
        '????.######..#####. 1,6,5',
        '?###???????? 3,2,1',
      ]
      const results = [1, 4, 1, 1, 4, 10]

      sampleCases.forEach((sample, i) => {
        expect(generateValidArrangements(makeSpringRow(sample))).toBe(
          results[i]
        )
      })
    })
  })
})

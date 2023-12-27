import { mapOfOcurrences, parseInput } from '.'

describe('Camel Cards', () => {
  describe('parseInput', () => {
    it('Creates an array of ParsedHands', () => {
      const input = `32T3K 765
      T55J5 684
      KK677 28
      KTJJT 220
      QQQJA 483`
      const result = parseInput(input)
      expect(result).toHaveLength(5)
      expect(result).toMatchSnapshot()
    })
  })
})

describe('mapOfOcurrences', () => {
  it('returns an array of distinct string chars sorted by higher appearence', () => {
    expect(mapOfOcurrences('aaa')).toHaveLength(1)
    const result = mapOfOcurrences('AAABBBCCD')
    expect(result).toHaveLength(4)
    expect(result.at(0)?.at(0)).toBe('A')
    expect(result.at(3)?.at(0)).toBe('D')
  })
})

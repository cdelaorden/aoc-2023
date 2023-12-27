import { addJoker, mapOfOcurrences, parseInput, sortByMostCommon } from '.'

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
    expect(sortByMostCommon(mapOfOcurrences('aaa'))).toHaveLength(1)
    const result = sortByMostCommon(mapOfOcurrences('AAABBBCCD'))
    expect(result).toHaveLength(4)
    expect(result.at(0)?.at(0)).toBe('A')
    expect(result.at(3)?.at(0)).toBe('D')
  })
})

describe('addJoker', () => {
  it('does nothing if J not present', () => {
    const result = addJoker({
      hand: 'KQK12345',
      bid: 0,
    })
    expect(result.hand).toBe('KQK12345')
  })
  it('adds the best possible card if present', () => {
    const result = addJoker({
      bid: 0,
      hand: 'KK134J',
    })
    expect(result.hand).toEqual('KK134K')
  })

  it('takes into account J being the most common', () => {
    const cases = [
      ['QQJJJ', 'QQQQQ'],
      ['76QJJ', '76QQQ'],
      ['JK6JK', 'KK6KK'],
      ['J43JJ', '44344'],
      ['JJJJJ', 'JJJJJ'],
    ]
    cases.forEach((c) => {
      expect(
        addJoker({
          hand: c.at(0) as string,
          bid: 1,
        }).hand
      ).toBe(c.at(1))
    })
  })
})

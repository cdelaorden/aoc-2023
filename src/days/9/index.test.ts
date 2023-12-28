import { explode } from '@/lib/utils'
import { calculateDifferences, expandWithDifferences } from '.'

describe('calculateDifferences', () => {
  it('creates a new Array with differences', () => {
    const result = calculateDifferences([0, 3, 6, 9, 12, 15])
    expect(result).toEqual([3, 3, 3, 3, 3])
    const result2 = calculateDifferences(result)
    expect(result2).toEqual([0, 0, 0, 0])
  })
})

describe('expandWithDifferences', () => {
  it('creates an Array of dimishing differences from original row', () => {
    const result = expandWithDifferences([0, 3, 6, 9, 12, 15])
    expect(result).toEqual([
      [0, 3, 6, 9, 12, 15],
      [3, 3, 3, 3, 3],
      [0, 0, 0, 0],
    ])
  })

  it('handles neg values', () => {
    const result = expandWithDifferences(
      explode(
        '-9 -13 -17 -21 -25 -29 -33 -37 -41 -45 -49 -53 -57 -61 -65 -69 -73 -77 -81 -85 -89',
        ' '
      ).map(Number)
    )
    expect(result).toMatchSnapshot()
  })
})

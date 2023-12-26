import { borderAround } from './utils'

describe('borderAround', () => {
  it('generates an Array of Coords around a given Coord', () => {
    const result = borderAround({ x: 0, y: 0 })
    console.log(result)
  })
})

export type Coord = {
  x: number
  y: number
}

export const borderAround = (c: Coord) => {
  const result: Coord[] = []
  for (let x = c.x - 1; x < c.x + 2; x++) {
    for (let y = c.y - 1; y < c.y + 2; y++) {
      if (x >= 0 && y >= 0 && (x != c.x || y != c.y)) {
        result.push({ x, y })
      }
    }
  }
  return result
}

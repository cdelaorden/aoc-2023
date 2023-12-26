type Card = {
  winner: number[]
  owned: number[]
}

const getCardScore = (c: Card) => {
  return c.winner
    .filter((x) => c.owned.some((y) => y === x))
    .reduce((acc, n) => {
      if (acc === 0) return 1
      return acc * 2
    }, 0)
}

function parseCards(data: string): Card[] {
  const lines = data.split('\n')
  return lines.map((l, i) => {
    const [left, right] = l.split('|')
    const winner =
      left
        ?.replace(/Card\s+\d+:/, '')
        .trim()
        .split(/\s+/)
        .map(Number) ?? []
    const owned =
      right
        ?.trim()
        .split(/\s+/)
        .map((s) => s.trim())
        .map(Number) ?? []
    return {
      winner,
      owned,
    }
  })
}

export function day4partOne(sample: string, input: string) {
  const cards = parseCards(input)
  // console.log(cards.slice(0, 10))
  const cardScores = cards.map(getCardScore)
  console.log(
    'Part one: %d',
    cardScores.reduce((acc, x) => acc + x, 0)
  )
}

export function day4partTwo(sample: string, input: string) {}

type RaceInfo = {
  time: number
  distance: number
}
export function day6partOne(sample: string, input: string) {
  if (!sample || !input) throw new Error('Missing input')
  const races = parseRaces(input)
  // console.log('Races %o', races)
  const winsPerRace = races.map(calculateDifferentRaceWins)
  console.log(
    'Part One: %d',
    winsPerRace.reduce((acc, x) => x * acc, 1)
  )
}

export function day6partTwo(sample: string, input: string) {
  if (!sample || !input) throw new Error('Missing input')
  const races = parseRaces(input)
  const race = fixKerning(races)
  console.log('Part Two: %d', calculateDifferentRaceWins(race))
}

const calculateDifferentRaceWins = (r: RaceInfo): number => {
  let total = 0
  for (let holdTime = 1; holdTime < r.time; holdTime++) {
    if (calculateDistance(holdTime, r.time) > r.distance) {
      total++
    }
  }
  return total
}
const calculateDistance = (holdTime: number, totalDuration: number) => {
  return holdTime * (totalDuration - holdTime)
}

const parseRaces = (s: string) => {
  const result: RaceInfo[] = []
  const [times, distances] = s.split('\n').map((line) => {
    const numbers = Array.from(line.matchAll(/\d+/g)).map((m) => Number(m[0]))
    return numbers
  })
  times?.forEach((t, i) => {
    result.push({
      time: t,
      distance: distances?.at(i) as number,
    })
  })
  return result
}

const fixKerning = (races: RaceInfo[]): RaceInfo => {
  if (!races.length) throw new Error('BOOM')
  const result = { ...races[0] }
  races.slice(1).forEach((r) => {
    result.time = Number(`${result.time}${r.time}`)
    result.distance = Number(`${result.distance}${r.distance}`)
  })
  return result as RaceInfo
}

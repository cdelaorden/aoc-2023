import { compose } from '@/lib/utils'
import workerpool from 'workerpool'
import { clausesToFunc, type Clause, type SeedRange } from './types'

const getSeedRangeMinDistance = (
  range: SeedRange,
  clauses: Clause[][]
): number => {
  console.log('Executing in worker for %o', range)
  try {
    const distance = compose(...clauses.map(clausesToFunc))
    console.log('Distance fn created')
    let min = Infinity
    for (let n = range.start; n <= range.end; n++) {
      const d = distance(n)
      if (d < min) {
        min = d
      }
    }
    return min
  } catch (err) {
    console.error(err)
    return Infinity
  }
}

// create a worker and register public functions
workerpool.worker({
  minDistance: getSeedRangeMinDistance,
})

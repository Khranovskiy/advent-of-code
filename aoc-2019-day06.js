import aocLoader from 'aoc-loader'

aocLoader(2019, 6, '53616c7465645f5fa933f62e13c8adae8f04b04212c2b41f522aac916a7eb661323b1552217882666e607e10f24d8952'
).then(data => {
  //'6WF)DRK', '2PT)PSM', 'H42)FN8', '1XR)LQD'
  let mapOfLocalOrbits = data.split('\n')
  day6P1(mapOfLocalOrbits)
  day6P2(mapOfLocalOrbits)
})
/*
AAA)BBB, which means "BBB is in orbit around AAA".
map of the local orbits
                  \
                   \
                    |
                    |
AAA--> o            o <--BBB
                    |
                    |
                   /
                  /
*/
export function day6P1(mapOfOrbits) {
  let relationships = mapOfOrbits.map(record =>
    createOrbitalRelationship(...record.split(')'))
  )
  let objectAndAroundMap = new Map()
  relationships.forEach(r => {
    objectAndAroundMap.set(r.obj, r.around)
  })
  let orbitCount = 0
  objectAndAroundMap.forEach((v_around, k_obj) => {
    let edgesToCOM = 0
    const com = 'COM'
    let current = k_obj
    while (current !== com) {
      let around = objectAndAroundMap.get(current)
      edgesToCOM++
      current = around
    }
    orbitCount += edgesToCOM
  })
  return orbitCount
}

export function createOrbitalRelationship(around, obj) {
  let rel = {}
  ;(rel.obj = obj), (rel.around = around)
  return rel
}

function day6P2(data) {
  return data.length
}

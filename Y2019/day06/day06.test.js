import { day6P1 as solve, createOrbitalRelationship, day6P2 } from '../../aoc-2019-day06.js'

describe('day06', () => {
//   it('parse record', () => {
//     // solve('6WF)DRK')

//     //AAA)BBB: BBB is in orbit around AAA
//     let orbit = createOrbitalRelationship(...'6WF)DRK'.split(')'))
//     expect(orbit.around).toEqual('6WF')
//     expect(orbit.obj).toEqual('DRK')
//   })

//   it('construct tree', () => {
//     const mapOfOrbits = ['COM)B', 'B)C', 'C)D', 'B)G']

//     let orbitCount = solve(mapOfOrbits)
//     expect(orbitCount).toEqual(8)
//     /*
//         G 
//        /  
// COM - B - C - D 

//     */
//   })
//   it('construct tree2', () => {
//     let mapOfOrbits = [
//       'COM)B',
//       'B)C',
//       'C)D',
//       'D)E',
//       'E)F',
//       'B)G',
//       'G)H',
//       'D)I',
//       'E)J',
//       'J)K',
//       'K)L'
//     ]
//     let count = solve(mapOfOrbits)
//     expect(count).toEqual(42)
//   })

  it('day2', () => {
    let mapOfOrbits = [
      'COM)B',
      'B)C',
      'C)D',
      'D)E',
      'E)F',
      'B)G',
      'G)H',
      'D)I',
      'E)J',
      'J)K',
      'K)L',
      'K)YOU',
      'I)SAN'
    ]
    let count = day6P2(mapOfOrbits)
    expect(count).toEqual(4)
  })
})

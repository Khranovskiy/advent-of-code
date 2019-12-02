import { day3part1Solution, parseClaim, createArray, readFlag, setFlag } from './day3.1'

describe('day3', () => {
  it('parseClaim', () => {
    let data = `#1 @ 100,366: 24x27
    #2 @ 726,271: 11x15`
    // #3 @ 343,814: 17x18
    // #4 @ 184,299: 27x11
    // #5 @ 278,205: 18x15
    // #6 @ 286,803: 15x24
    // #7 @ 947,956: 5x10
    // #8 @ 869,850: 17x19
    // #9 @ 313,89: 15x12
    // #10 @ 775,764: 22x28
    let expected = [[1, 100, 366, 24, 27], [2, 726, 271, 11, 15]]

    const claims = parseClaim(data)
    expect(claims[0]).toEqual(expect.arrayContaining(expected[0]))
    expect(claims[1]).toEqual(expect.arrayContaining(expected[1]))
  })

  it('overlap', () => {
    let data = `
    #1 @ 1,3: 4x4
    #2 @ 3,1: 4x4
    #3 @ 5,5: 2x2`

    // ........
    // ...2222.
    // ...2222.
    // .11XX22.
    // .11XX22.
    // .111133.
    // .111133.
    // ........
    const overlappedSquares = 4
    const overlaps = day3part1Solution(data)
    expect(overlaps).toEqual(overlappedSquares)
  })

  it('create 8x8 array', () => {
    const dimension = 8
    let view = createArray(dimension)
  })

  it('set [0][0] flag', () => {
    const dimension = 8,
      newValue = 1
    let view = createArray(dimension)
    setFlag(view, dimension, 0, 0, newValue)

    expect(view['0,0']).toEqual(newValue)
  })

  it('read [0][0] flag', () => {
    const dimension = 8,
      view = createArray(dimension)
    const actual = readFlag(view, dimension, 0, 0)

    expect(actual).toEqual(0)
  })

  it('set and check [0][0] flag', () => {
    const dimension = 8,
      top = 0,
      left = 0,
      newValue = 1,
      view = createArray(dimension)

    setFlag(view, dimension, top, left, newValue)
    const actual = readFlag(view, dimension, top, left)

    expect(actual).toEqual(newValue)
  })
  it('set and check [7][7] flag', () => {
    const dimension = 8,
      top = 7,
      left = 7,
      newValue = 1

    let view = createArray(dimension)
    setFlag(view, dimension, top, left, newValue)
    const actual = readFlag(view, dimension, top, left)

    expect(actual).toEqual(newValue)
  })

  it('create 1024 x 1024 array', () => {
    const dimension = 1024
    let view = createArray(dimension)
  })

  it('set and check [1023][1023] flag', () => {
    const dimension = 1024,
      top = 1023,
      left = 1023,
      newValue = 1

    let view = createArray(dimension)
    setFlag(view, dimension, top, left, newValue)
    const actual = readFlag(view, dimension, top, left)

    expect(actual).toEqual(newValue)
  })
  // it('solution', () => {
  //   let data = `#1 @ 100,366: 24x27
  //   #2 @ 726,271: 11x15
  //     // #3 @ 343,814: 17x18
  //     // #4 @ 184,299: 27x11
  //     // #5 @ 278,205: 18x15
  //     // #6 @ 286,803: 15x24
  //     // #7 @ 947,956: 5x10
  //     // #8 @ 869,850: 17x19
  //     // #9 @ 313,89: 15x12
  //     // #10 @ 775,764: 22x28`
  //
  //   const gen = day3part1Solution(data)
  //   // let claim = gen.next().value
  //   // expect(claim).toEqual(expect.arrayContaining(expected[0]))
  //   //
  //   // claim = gen.next().value
  //   // expect(claim).toEqual(expect.arrayContaining(expected[1]))
  //   // // for (let claim of parseClaim(data)) {
  //   // // let [id, left, top, wide, tall] = claim
  // })
})

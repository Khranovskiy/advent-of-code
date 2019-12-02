const claim = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/g

export function parseClaim(string) {
  claim.lastIndex = 0
  let match
  let result = []
  while ((match = claim.exec(string)) != null) {
    let parts = match.slice(1, 6).map(Number)
    result.push(parts)
    // result.push[match[1]]
    // yield {
    //   id: match[1],
    //   left: match[2],
    //   top: match[3],
    //   wide: match[4],
    //   tall: match[5]
    // }
  }
  return result
}

export function createArray(dimension) {
  // 16 bit - max value 65535
  // 16 bit * 1m ~ 16mb :(
  // bit array!
  // 1024 / 16  - 64
  // let array = new Uint16Array(1024 * 1024)
  // let bitArray = new Uint16Array(64 * 64)
  // 1M bites - 1000 000 bites / 8 = 125 000 bytes
  // const dimension = 8 // actual it is 1000
  // ---------
  // const millionBites = dimension * dimension
  // const inBytes = millionBites / 8
  // var buffer = new ArrayBuffer(inBytes)
  // var view = new DataView(buffer)
  // return view

  //----
  return {}
  // const buffer = new Uint16Array(dimension * dimension)
  // return new DataView(buffer.buffer)
}

function intDiv(dividend, divider) {
  return (dividend / divider) | 0
}

export function readFlag(dataView, dimension, top, left) {
  // lets work with uint8 numbers
  //setUint8(1,255)
  //getUint8(1)
  // [x][y] [vertical][horizontal]
  // [top][left]
  // 2d to pos: top / horiz_dimension
  //     intDiv(top, horiz_dimension) -> it will be a

  // top * horiz_dimension + left -> it will be position in bitArray
  // let bitPosition = top * dimension + left
  // let bytePosition = intDiv(bitPosition, 8)
  // let offsetInByte = bitPosition - bytePosition * 8
  // let mask = 1 << Math.max(offsetInByte - 1, 0)
  // let byteValue = dataView.getUint8(bytePosition)
  // let isSet = (byteValue & mask) !== 0
  // // set a bit
  // // byteValue |= mask
  // // dataView.setUint8(bytePosition, byteValue)
  // return isSet
  let bitPosition = `${left},${top}` //top * dimension + left
  return dataView[bitPosition] || 0
  // return dataView.getUint16(bitPosition)
}
export function setFlag(dataView, dimension, top, left, value) {
  // let bitPosition = top * dimension + left
  // let bytePosition = intDiv(bitPosition, 8)
  // let offsetInByte = bitPosition - bytePosition * 8
  // let mask = 1 << Math.max(offsetInByte - 1, 0)
  // let byteValue = dataView.getUint8(bytePosition)
  // // let isSet = (byteValue & mask) != 0
  // // set a bit
  // if (booleanFlag === true) {
  //   byteValue |= mask
  // } else {
  //   // https://stackoverflow.com/questions/1436438/how-do-you-set-clear-and-toggle-a-single-bit-in-javascript
  //   byteValue &= ~mask // clear a bit
  // }
  // dataView.setUint8(bytePosition, byteValue)
  // return byteValue
  let bitPosition = `${left},${top}` //top * dimension + left
  dataView[bitPosition] = value
  // dataView.setUint16(bitPosition, value)
}

export function day3part1Solution(input) {
  const dimension = 1024
  const storage = createArray(dimension)
  // How many square inches of fabric are within two or more claims?
  let overbookingSquares = 0

  let claims = parseClaim(input)
  claims.forEach(claim => {
    let [id, left, top, wide, tall] = claim
    // console.log(`claim #${id}`)

    // left - x
    // top - y
    // wide w
    // h tall
    // x x < x + w
    // y y y < y + h

    //  x| | | | |
    // y ---
    // y ---
    for (let x = left; x < left + wide; ++x) {
      for (let y = top; y < top + tall; ++y) {
        // console.log(`top ${y} left ${x}`)
        let value = readFlag(storage, dimension, y, x)
        setFlag(storage, dimension, y, x, (value || 0) + 1)
      }
    }
  })
  // console.log(storage)
  // for (let tile of Object.values(storage)) {
  //   if (tile > 1) ++overbookingSquares
  // }
  // return overbookingSquares

  // for (let x = 0; x < dimension; ++x) {
  //   for (let y = 0; y < dimension; ++y) {
  //     let value = readFlag(storage, dimension, y, x)
  //     if (value > 1) {
  //       overbookingSquares++
  //     }
  //   }
  // }

  // return overbookingSquares
  //   if (tile > 1) ++numOverlapTiles
  // }

  // return overbookingSquares

  // let matches,
  //   regex = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/
  // let tiles = {}
  // let numOverlapTiles = 0
  // let claims = input.split(/\r?\n/).map(line => {
  //   matches = regex.exec(line)
  //   return {
  //     id: +matches[1],
  //     x: +matches[2],
  //     y: +matches[3],
  //     w: +matches[4],
  //     h: +matches[5]
  //   }
  // })
  //
  // claims.forEach(rect => {
  //   for (let x = +rect.x; x < +rect.x + +rect.w; ++x) {
  //     for (let y = +rect.y; y < +rect.y + +rect.h; ++y) {
  //       tiles[`${x},${y}`] = (tiles[`${x},${y}`] || 0) + 1
  //     }
  //   }
  // })
  //
  // for (let tile of Object.values(tiles)) {
  //   if (tile > 1) ++numOverlapTiles
  // }
  // return numOverlapTiles

  //TASK2
  let idClaimNotOverlaps = -1
  claims.forEach(claim => {
    let [id, left, top, wide, tall] = claim
    let overlaps = false
    for (let x = left; x < left + wide; ++x) {
      for (let y = top; y < top + tall; ++y) {
        let value = readFlag(storage, dimension, y, x)
        if (value > 1) {
          overlaps = true
          break
        }
      }
      if (overlaps) {
        break
      }
    }
    if (!overlaps) {
      idClaimNotOverlaps = id
      return idClaimNotOverlaps
    }
  })
  return idClaimNotOverlaps
}

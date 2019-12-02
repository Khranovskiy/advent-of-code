const aocLoader = require('aoc-loader')

aocLoader(2018, 1).then(data => {
  console.log(day1part1(data))
  console.log(day1part2(data))
})

function day1part1(data) {
  const numbers = data.split(/\r?\n/).map(c => Number(c))
  return numbers.reduce((acc, current) => {
    return acc + current
  }, 0)
}

// https://aureooms.github.io/js-itertools/
function* cycle(iterable) {
  let buffer = []
  for (let item of iterable) {
    yield item
    buffer.push(item)
  }
  if (buffer.length === 0) return
  while (true) yield* buffer
}

function day1part2(data) {
  const numbers = data.split(/\r?\n/).map(c => Number(c))
  const results = new Set()
  let firstDuplicate
  let currentFreq = 0

  for (let item of cycle(numbers)) {
    currentFreq += item
    if (results.has(currentFreq)) {
      return currentFreq
    }
    results.add(currentFreq)

    // currentFreq = numbers.slice(0).reduce((acc, current, i, array) => {
    //   let newFreq = acc + current;
    // if (results.has(newFreq)) {
    //   firstDuplicate = newFreq;
    //   // array.length = 0;
    // } else {
    //   results.add(newFreq);
    // }
    // return newFreq;
    // }, currentFreq);
    // if(firstDuplicate){
    //   break;
    // }
  }
  return firstDuplicate
}

module.exports = {
  day1part1,
  day1part2
}

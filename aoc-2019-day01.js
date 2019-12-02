import aocLoader from 'aoc-loader'

aocLoader(2019, 1).then(data => {
  let parsed = data.split('\n').map(Number)
  console.log(day1part1(parsed))
  console.log(day1part2(parsed))
})

function fuelFormula(amount) {
  return Math.floor(amount / 3) - 2
}
function day1part1(data) {
  return data.reduce((acc, curr) => (acc += fuelFormula(curr)), 0)
}
function recursive(f, value, result) {
  if (value <= 0) {
    return result
  }
  var additional = f(value)
  return recursive(f, additional, Math.max(0, additional) + result)
}
function day1part2(data) {
  return data.reduce((acc, curr) => {
    var newvalue = (acc += recursive(fuelFormula, curr, 0))
    return newvalue
  }, 0)
}

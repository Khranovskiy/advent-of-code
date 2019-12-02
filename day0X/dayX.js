import aocLoader from 'aoc-loader'

aocLoader(2019, 3, '53616c7465645f5fa933f62e13c8adae8f04b04212c2b41f522aac916a7eb661323b1552217882666e607e10f24d8952').then(data => {
  let parsed = data.split(',').map(Number)
  console.log(day3P1(parsed))
  console.log(day3P2(parsed))
})
function day3P1(data){
  return data.length
}
function day3P2(data){
  return data.length
}
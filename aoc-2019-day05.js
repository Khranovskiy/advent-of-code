import aocLoader from 'aoc-loader'
import {IntCodeComputer, IntCodeComputer2} from './Y2019/day05/intCodeComputer.js'

aocLoader(
  2019,
  5,
  '53616c7465645f5fa933f62e13c8adae8f04b04212c2b41f522aac916a7eb661323b1552217882666e607e10f24d8952'
).then(data => {
  let diagnosticProgram = data.split(',').map(Number)
  console.log(day5P1(diagnosticProgram))
  console.log(day5P2(diagnosticProgram))
})

function day5P1(data) {
  const computer = new IntCodeComputer('1')
  computer.run(data)
  // answer is 7692125
  return 'Part 1 solved'
}
function day5P2(data) {
  const thermalRadiatorControllerId = '5'
  const computer = new IntCodeComputer2(thermalRadiatorControllerId)
  computer.run(data)
  //14340395
  return 'Part 2 solved'

  let test1 = [3,9,8,9,10,9,4,9,99,-1,8];
  computer = new IntCodeComputer2('8')
  computer.run(test1)
  console.log( 'test 1 solved')

  let test2 = [3,9,7,9,10,9,4,9,99,-1,8];
  computer = new IntCodeComputer2('1')
  computer.run(test2)
  console.log('test 2 solved')

  let test3 = [3,3,1108,-1,8,3,4,3,99];
  computer = new IntCodeComputer2('7')
  computer.run(test3)
  console.log('test 3 solved')

  let test4 = [3,3,1107,-1,8,3,4,3,99]
  computer = new IntCodeComputer2('8')
  computer.run(test4)
  console.log('test 4 solved')

  let jumpTest1 = [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9]
  computer = new IntCodeComputer2('1')
  computer.run(jumpTest1)
  console.log('jumpTest1 solved')

  let jumpTest2 = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1]
  computer = new IntCodeComputer2('1')
  computer.run(jumpTest2)
  console.log('jumpTest2 solved')
  return ''
}

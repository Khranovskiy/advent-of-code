import aocLoader from 'aoc-loader'

aocLoader(2019, 2).then(data => {
  let parsed = data.split(',').map(Number)
  let memory = restoreTheGravityAssist(parsed, 12, 2)
  console.log(gravityAssistP1(memory))

  console.log(gravityAssistP2(parsed))
})
function restoreTheGravityAssist(codes, noun, verb){
  codes[1] = noun
  codes[2] = verb
  return codes
}
function sum(a, b){
  return a + b
}
function multiplies(a, b){
  return a * b
}
const numberofvaluesintheinstruction = 4

function instruction(f, codes, address){
  let leftParameter = codes[address + 1]
  let rightParameter = codes[address + 2]
  let resultParameter = codes[address + 3]
  let result = f(codes[leftParameter], codes[rightParameter])
  codes[resultParameter] = result
  return address + numberofvaluesintheinstruction
}
function gravityAssistP1(data) {
  let address = 0
  let isTerminate = false
  let value
  let memory = data.slice()
  while (!isTerminate) {
    // console.log(`${position} - ${memory[position]}`)
    value = memory[address]
    if (value === 1) {
      address = instruction(sum, memory, address)
    } else if (value === 2) {
      address = instruction(multiplies, memory, address)
    } else if (value === 99) {
      isTerminate = true
    }
    if(address >= memory.length){
      throw 'error'
    }
  }
  return memory[0]
}
function gravityAssistP2(data) {
  // determine what pair of inputs produces the output 19690720
  const desire = 19690720;
  
  const max = data.length - 1
  for(let i = 0; i < max; i++){
    for(let j = 0; j < max; j++){
      let noun = i;
      let verb = j;
      let memory = restoreTheGravityAssist(data.slice(), noun, verb)
      let guesed = gravityAssistP1(memory)
      if (guesed === desire){
        let result = 100 * noun + verb
        return result;
      }
    }
  }
  return 0
}

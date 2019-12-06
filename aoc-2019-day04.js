// https://github.com/johnbeech/advent-of-code-2019/blob/master/solutions/day4/solution.js
// https://www.reddit.com/r/adventofcode/comments/e5u5fv/2019_day_4_solutions/

import path from 'path'
// import { read, position } from 'promise-path'
// const fromHere = position(__dirname)
let __dirname = path.resolve();
const report = (...messages) => console.log(`[advent 2019 / ${__dirname.split(path.sep).pop()}]`, ...messages)

async function run () {
  const input = '206938-679128'//(await read(fromHere('input.txt'), 'utf8')).trim()

  await solveForFirstStar(input)
  // await solveForSecondStar(input)
}

function testValidPassword (passwordValue) {
  let passwordContainsDouble = false
  let passwordDigitsNeverDecrease = true

  const sequence = (passwordValue + '').split('').map(n => Number.parseInt(n))
  let previousNumber
  sequence.forEach(number => {
    if (previousNumber !== undefined) {
      if (previousNumber === number) {
        passwordContainsDouble = true
      }
      if (previousNumber > number) {
        passwordDigitsNeverDecrease = false
      }
    }
    previousNumber = number
  })

  return passwordContainsDouble && passwordDigitsNeverDecrease
}

function testValidPasswordForSecondStar (passwordValue) {
  let passwordDigitsNeverDecrease = true

  const sequence = (passwordValue + '').split('').map(n => Number.parseInt(n))
  let previousNumber; const doublesMap = {}
  sequence.forEach(number => {
    if (previousNumber !== undefined) {
      if (previousNumber === number) {
        doublesMap[number] = doublesMap[number] || 1
        doublesMap[number]++
      }
      if (previousNumber > number) {
        passwordDigitsNeverDecrease = false
      }
    }
    previousNumber = number
  })

  const passwordContainsDouble = Object.values(doublesMap).filter(n => n === 2).length > 0

  return passwordContainsDouble && passwordDigitsNeverDecrease
}

async function solveForFirstStar (input) {
  const [, startInput, endInput] = input.match(/(\d{6})-(\d{6})/)
  // report('Start Input', startInput, 'End Input', endInput)

  let password = startInput
  const validPaswords = []
  while (password <= endInput) {
    if (testValidPassword(password)) {
      validPaswords.push(password)
    }
    // do something
    password++
  }

  const solution = validPaswords.length
  // report('Valid Passwords', validPaswords)
  // report('Input:', input)
  report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
  const [, startInput, endInput] = input.match(/(\d{6})-(\d{6})/)
  report('Start Input', startInput, 'End Input', endInput)

  let password = startInput
  const validPaswords = []
  while (password <= endInput) {
    if (testValidPasswordForSecondStar(password)) {
      validPaswords.push(password)
    }
    // do something
    password++
  }

  const solution = validPaswords.length
  report('Valid Passwords', validPaswords)
  report('Input:', input)

  report('Solution 2:', solution)
}

run()
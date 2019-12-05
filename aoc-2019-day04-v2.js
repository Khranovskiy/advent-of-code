import aocLoader from 'aoc-loader'

aocLoader(2019, 4, '53616c7465645f5fa933f62e13c8adae8f04b04212c2b41f522aac916a7eb661323b1552217882666e607e10f24d8952').then(data => {
  console.log(day4P1(data))
  // console.log(day4P2(data))
})

function day4P1(data) {
  let [from, to] = data.split('-')
  const minDigits = from.split('').map(Number);

  let answersCount = 0
  const digits = new Array(6).fill(0)
  const recursiveFind = (digits, nextIndex, sameAdjacentExist) => {
    // termination condition
    if (nextIndex === 5 + 1) {
      if (sameAdjacentExist) {
        let num = Number(digits.join(''))
        if (num >= from && num <= to) {
          answersCount++
        }
      }
      return
    }
    // find valid values for digits[nextIndex]
    // and call recursiveFind on each case

    let prevIndex = nextIndex - 1
    let prevDigit = digits[prevIndex] || -1
    let nextDigit = prevIndex === -1 ? minDigits[0] : prevDigit

    let maxValueForNextDigit = 9
    let nextIndexForRecursiveCall = nextIndex + 1
    for (; nextDigit <= maxValueForNextDigit; nextDigit++) {
      const clonedDigits = [...digits]
      clonedDigits[nextIndex] = nextDigit
      const same = sameAdjacentExist || nextDigit === prevDigit
      recursiveFind(clonedDigits, nextIndexForRecursiveCall, same)
    }
  }
  const empty = new Array(6).fill(0)
  recursiveFind(empty, 0, false)
  return answersCount
}

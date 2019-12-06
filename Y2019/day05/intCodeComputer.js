export class IntCodeComputer {
  constructor (inputData) {
    this.inputData = inputData
    this.inputPosition = 0
    this.actions = this.getActionTable()
  }

  instruction1 (f, state, { modeParam1 }) {
    const mem = state.memory
    const addr = state.address
    const parameterAddressOrValue = mem[addr + 1]
    const parameterValue = this.readValue(mem, parameterAddressOrValue, modeParam1)
    const newValue = f(parameterValue)

    this.writeValue(newValue, mem, parameterAddressOrValue, IntCodeComputer.positionMode)
    const addressOffset = 2
    return { ...state, address: addr + addressOffset }
  }

  readInput (parameter) {
    // console.log('readInput called')
    let valueFromInput = this.inputData.charAt(this.inputPosition++)
    return Number(valueFromInput)
  }

  output (parameter) {
    console.log(parameter)
    return parameter
  }

  readValue (memory, parameterValue, modeParam) {
    if (modeParam === IntCodeComputer.positionMode) {
      return memory[parameterValue]
    } else if (modeParam === IntCodeComputer.immediateMode) {
      return parameterValue
    }
    throw 'modeParam error'
  }

  writeValue (value, memory, parameterValue, modeParam) {
    if (modeParam === IntCodeComputer.positionMode) {
      memory[parameterValue] = value
      return
    }
    throw 'modeParam error'
  }

  instruction3 (f, state, { modeParam1, modeParam2 }) {
    const mem = state.memory
    const addr = state.address

    const leftParameter = mem[addr + 1]
    const rightParameter = mem[addr + 2]
    const resultParameter = mem[addr + 3]

    const leftValue = this.readValue(mem, leftParameter, modeParam1)
    const rightValue = this.readValue(mem, rightParameter, modeParam2)

    let result = f(leftValue, rightValue)

    // mem[resultParameter] = result
    this.writeValue(result, mem, resultParameter, IntCodeComputer.positionMode)

    const addressOffset = 4
    let newState = { ...state, address: addr + addressOffset }
    return newState
  }

  terminate (state) {
    return { ...state, isTerminate: true }
  }

  static positionMode = 0
  static immediateMode = 1

  run (data) {
    let state = {
      address: 0,
      isTerminate: false,
      memory: data.slice()
    }

    while (!state.isTerminate) {
      const input = state.memory[state.address]
      const operator = this.parseOperator(input)
      // console.log(`${state.address} ${JSON.stringify(operator)}`)

      const f = this.actions.get(operator.opCode)
      const newState = f(state, operator)
      if (!newState) {
        throw 'exception'
      }
      state = newState
      if (state.address >= state.memory.length) {
        throw 'error'
      }
    }
  }

  sum (a, b) {
    return a + b
  }

  multiplies (a, b) {
    return a * b
  }

  parseOperator (value) {
    // A B C D E
    //   1 0 0 2

    // DE - two-digit opcode,      02 == opcode 2
    // C - mode of 1st parameter,  0 == position mode
    // B - mode of 2nd parameter,  1 == immediate mode
    // A - mode of 3rd parameter,  0 == position mode,
    //                               omitted due to being a leading zero
    // 3 - opCode
    let valueWithZeros = 100000 + value // 3 -> 100003, 1002 -> 101002, 11002 -> 111002
    let [
      empty,
      modeParam3 = IntCodeComputer.positionMode, // A
      modeParam2 = IntCodeComputer.positionMode, // B
      modeParam1 = IntCodeComputer.positionMode, // C
      opCode1 = 0, // D
      opCode = 0 // E
    ] = valueWithZeros
      .toString()
      .split('')
      .map(Number)
    
    if (opCode === 9 && opCode1 === 9) {
      return {
        opCode: 99
      }
    }
    return {
      opCode,
      modeParam1,
      modeParam2,
      modeParam3
    }
  }

  getActionTable () {
    let table = new Map()
    table.set(1, (state, operator) =>
      this.instruction3(this.sum.bind(this), state, operator)
    )
    table.set(2, (state, operator) =>
      this.instruction3(this.multiplies.bind(this), state, operator)
    )
    table.set(3, (state, operator) =>
      this.instruction1(this.readInput.bind(this), state, operator)
    )
    table.set(4, (state, operator) =>
      this.instruction1(this.output.bind(this), state, operator)
    )
    table.set(99, state => this.terminate(state))
    return table
  }
}
export class IntCodeComputer2 extends IntCodeComputer {
  constructor (inputData) {
    super(inputData)
  }

  getActionTable () {
    let baseTable = super.getActionTable()
    // Opcode 5 is jump-if-true: if the first parameter is non-zero,
    // it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
    baseTable.set(5, (state, operator) => {
      return this.instruction2(this.jumpIfTrue.bind(this), state, operator)
    }) //   jump-if-true

    // Opcode 6 is jump-if-false: if the first parameter is zero, it sets the instruction pointer
    // to the value from the second parameter. Otherwise, it does nothing.
    baseTable.set(6, (state, operator) => {
      return this.instruction2(this.jumpIfFalse.bind(this), state, operator)
    }) //   jump-if-false

    // Opcode 7 is less than: if the first parameter is less than the second parameter,
    // it stores 1 in the position given by the third parameter. Otherwise, it stores 0.

    baseTable.set(7, (state, operator) => {
      return this.instruction3(this.lessThan.bind(this), state, operator)
    }) // less than

    // Opcode 8 is equals: if the first parameter is equal to the second parameter, it stores
    // 1 in the position given by the third parameter. Otherwise, it stores 0.
    baseTable.set(8, (state, operator) => {
      return this.instruction3(this.equals.bind(this), state, operator)
    }) // equals
    return baseTable
  }

  jumpIfTrue (conditionValue) {
    return conditionValue !== 0
  }

  jumpIfFalse (conditionValue) {
    return conditionValue === 0
  }

  lessThan (a, b) {
    return a < b ? 1 : 0
  }

  equals (a, b) {
    return a === b ? 1 : 0
  }

  instruction2 (f, state, { modeParam1, modeParam2 }) {
    const mem = state.memory
    const addr = state.address

    const firstParameter = mem[addr + 1]
    const secondParameter = mem[addr + 2]

    const firstValue = this.readValue(mem, firstParameter, modeParam1)
    const secondValue = this.readValue(mem, secondParameter, modeParam2)

    let result = f(firstValue, secondValue)

    // mem[resultParameter] = result
    // this.writeValue(result, mem, resultParameter, IntCodeComputer.positionMode)
    let newAddress = addr
    if (result) {
      newAddress = secondValue // secondValue
    } else {
      newAddress += 3
    }
    return { ...state, address: newAddress }
  }
}

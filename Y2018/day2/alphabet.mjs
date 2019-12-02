export class Alphabet {
  constructor(alpha) {
    this.radix = alpha.length;
    this.alphabet = alpha.split('');

    //TODO: js char what max value ?
    const charMaxValue = 128; // actually its 65535: The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code unit at the given index.

    this.inverse = (new Array(charMaxValue)).fill(-1); //indices
    for (let charIndex = 0; charIndex < this.radix; charIndex++) {
      const character = this.alphabet[charIndex];
      const indexInInverse = character.codePointAt(0);
      this.inverse[indexInInverse] = charIndex;
    }
  }
  toIndex(char) {
    // if (c >= inverse.Length || inverse[c] == -1)
    // throw new ArgumentException("Character " + c + " not in alphabet");
    const indexInInverse = char.codePointAt(0);
    return this.inverse[indexInInverse];
  }
  toChar(index){
    // if (index < 0 || index >= radix)
    //   throw new IndexOutOfRangeException("Alphabet index out of bounds");
    return this.alphabet[index];
  }
}
export const lowerCase = new Alphabet("abcdefghijklmnopqrstuvwxyz");
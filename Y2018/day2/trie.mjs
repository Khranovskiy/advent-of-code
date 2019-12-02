//TODO: правильно ли тут объявлять фунацию вне класса
//TODO: можно ли сделать приватную функцию в классе
// R-way trie node
// export const emptyNode = undefined;
export const emptyNode = null;

export function Node(radix) {
  this.value = null;
  // this.isWord = false;
  // this.prefixes = 0;
  // this.next = [];
  this.next = new Array(radix).fill(emptyNode);
  // this.next = [];
}

export class TrieST {

  constructor(alphabet) {
    this.alphabet = alphabet;
    this.root = emptyNode;
  }
  //TODO: function syntax in class declaration


  put(key, value){
    this.root = this.putNode(this.root, key, value, 0);
  }

  get(key){
    //TODO: this. <- is it necessary?
    const node = this.getNode(this.root, key, 0);
    if ( node === emptyNode){
      return null;
    }
    return node.value;
  }

  getKeys(){
    return this.keysWithPrefix('');
  }

  keysThatMatch(pattern) {
    const queue = [];
    this.collectWithPattern(this.root, '', queue, pattern);
    return queue;
  }

  longestPrefixOf(str){
    const length = this.search(this.root, str, 0, 0);
    return str.substring(0, length);
  }

  getNode(node, key, d){
    // Return value associated with key in the subtrie rooted at
    if (node === emptyNode){
      return emptyNode;
    }
    if (d === key.length) {
      return node;
    }
    const char = key.charAt(d);
    const index = this.alphabet.toIndex(char);
    //TODO: node this[index] not character itself
    return get(node.next[index], key, d + 1);
  }


  //TODO: can we extract from class
  //TODO: or use private method
  putNode(node, key, value, d){
    if(node === emptyNode || node === undefined){
      node = new Node(this.alphabet.radix);
    }
    if(d === key.length){
      node.value = value;
      return node;
    }
    const char = key.charAt(d);
    const index = this.alphabet.toIndex(char);
    //TODO: node this[index] not character itself
    node.next[index] = this.putNode(node.next[index], key, value, d + 1);
    return node;
  }


  keysWithPrefix(prefix){
    // Queue<String> q = new Queue<String>();
    const queue = []; //TODO: make with Linked List

    //TODO: don't like that if I have get(x) but i call get(x,y,z,y) - get also called
    const node = this.getNode(this.root, prefix, 0);
    this.collect(node, prefix, queue);
    return queue;
  }

  collect(node, prefix, queue){
    if (node === emptyNode) {
      return;
    }
    if (node.value !== null) {
      queue.push(prefix);
    }
    for (let charIndex = 0; charIndex < this.alphabet.radix; charIndex++) {
      const updatedPrefix = prefix + this.alphabet.toChar(charIndex);
      this.collect(node.next[charIndex], updatedPrefix, queue);
    }
    // for(let charIndex of Object.keys(node.next)){
    //   const updatedPrefix = prefix + this.alphabet.toChar(charIndex);
    //   this.collect(node.next[charIndex], updatedPrefix, queue);
    // }
  }

  //TODO: there is NO FUNCTION OVERLOAD
  collectWithPattern(node, prefix, queue, pattern) {
    if (node === emptyNode) {
      return;
    }
    const d = prefix.length;
    if (d === pattern.length && node.value !== null){
      queue.push(prefix);
    }
    if (d === pattern.length){
      return;
    }

    const nextPatternChar = pattern.charAt(d);
    for(let charIndex = 0; charIndex < this.alphabet.radix; charIndex++){
    // for(let charIndex of Object.keys(node.next)){
      const char = this.alphabet.toChar(charIndex);

      if (nextPatternChar === '.' || nextPatternChar === char){
        const updatedPrefix = prefix + char;
        this.collectWithPattern(node.next[charIndex], updatedPrefix, queue, pattern);
      }
    }
  }

  search(node, str, d, length){
    if (node === emptyNode) {
      return length;
    }
    if (node.value !== null) {
      length = d;
    }
    if ( d === str.length) {
      return length;
    }
    const char = str.charAt(d);
    const charIndex = this.alphabet.toIndex(char);
    return this.search(node.next[charIndex], str, d + 1, length);
  }
}



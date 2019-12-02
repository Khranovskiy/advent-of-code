import aocLoader from 'aoc-loader'
import { TrieST, Node, emptyNode as empty } from './trie.mjs'
import { lowerCase } from './alphabet'

// aocLoader(2018, 2).then(data => {
// console.log(day2part1(data));
// console.log(day2part2(data));
// });

function containsDuplicates(id, amount) {
  const chars = new Map()
  ;[...id].forEach(c => {
    const count = chars.get(c)
    chars.set(c, count === undefined ? 1 : count + 1)
  })
  return [...chars.values()].filter(i => i === amount).length > 0
}

function day2part1(data) {
  const lines = data.split(/\r?\n/)
  const sum = (ac, item) => {
    return ac + item
  }
  let idTwo = lines
    .map(id => {
      return containsDuplicates(id, 2) ? 1 : 0
    })
    .reduce(sum, 0)
  let idThree = lines
    .map(id => {
      return containsDuplicates(id, 3) ? 1 : 0
    })
    .reduce(sum, 0)
  return idTwo * idThree
}

const noBoxId = null
TrieST.prototype.findSameKey = function(node, boxId, position, differentCharsCount) {
  if (position === boxId.length) {
    if (differentCharsCount === 0) {
      return noBoxId //TODO find same boxId, ignore, STOP we than add it twice!
    }
    const endOfTail = ''
    return endOfTail
  }
  if (differentCharsCount > 0) {
    const char = boxId.charAt(position)
    const charIndex = this.alphabet.toIndex(char)
    const next = node.next[charIndex]
    if (next === empty) return noBoxId
    const keyTail = this.findSameKey(next, boxId, position + 1, differentCharsCount)
    if (keyTail !== null) {
      return char + keyTail //TODO: string join :(
      //return keyTail;
    }
  }
  for (let charIndex = 0; charIndex < this.alphabet.radix; charIndex++) {
    const childNode = node.next[charIndex]
    if (childNode === empty) {
      //TODO: why we skip that?
      continue
    }
    // for(let charIndex of Object.keys(node.next)){
    //const childNode = node.next[charIndex];
    const char = this.alphabet.toChar(charIndex)
    const diffs = differentCharsCount + (char === boxId.charAt(position) ? 0 : 1)

    const result = this.findSameKey(childNode, boxId, position + 1, diffs)
    if (result !== noBoxId) {
      return char + result //TODO: string join :(
      // return result;
    }
  }
  return noBoxId
}

function day2part2(data) {
  const lines = data.split(/\r?\n/)
  let trie = new TrieST(lowerCase)
  trie.root = new Node(lowerCase.radix) //TODO: bad code

  const result = []
  const emptyStringValue = ''
  for (let boxId of lines) {
    const same = trie.findSameKey(trie.root, boxId, 0, 0)
    if (same === null) {
      trie.put(boxId, emptyStringValue)
    } else {
      for (let i = 0; i < boxId.length; i++) {
        if (boxId[i] === same[i]) {
          //writer.Write(boxID[i]);
          result.push(boxId[i])
        }
      }
      break
    }
  }
  return result.join('')
}
//
const data = `kqzxdenujwcsthbzgvyioflcsp
vqwxdenujwcsthbmggyioflarp
kqzxienujwcsthbmglyioclarp
kuzxdetujwcsthbmgvyioflcrp
kqnxdenujwcsthbmgvlooflarp
kqzxdknpjwcsthwmgvyioflarp
kgzxdenujwcsthbfgvyicflarp
kqzxdenujrnsthbmgjyioflarp
lqzxdeeujwcsthbmrvyioflarp
iqfxdenujwcsthbmgvyiofyarp
kvzxbenujwcstabmgvyioflarp
kmzxdenujwcsthbmglyioolarp
kqzxdenujhcsthbmgbyioflanp
nqzxdenujwcsehbmgvsioflarp
kqzlgenujwcsthbmgvyiofjarp
kqzxdyfujwcsihbmgvyioflarp
kqzxdsnujwcqthbmgvyiorlarp
kqzxdenuywcsthbmgvyinflmrp
knzxderujwcsthbmgvyioflaop
kqxxdenujwczthbmgvyioflajp
kqzxdevujwcsthbmgvyqoxlarp
kqzxdenujwclmhbmgvyioslarp
kqzldenujwcsthbmgvnisflarp
kjtxdenujwcsthbmgvyfoflarp
kqzxwenujwcstxbmgvyihflarp
kqzxdenuhecsthbmgvyeoflarp
kqzxdenhjwesthbmgvyioklarp
kqkxdenujwcsthbcgvyiofgarp
kqyxmenujwcsthbmgvyioflara
kqzxdqnrjwcwthbmgvyioflarp
kqzxdenufwcgyhbmgvyioflarp
lqzxdenujwcsthbmtvyiofearp
kqzxdenujwcsthbvgvthoflarp
kqzxeenujwcsahbmgvyioflamp
pqzxdenujwcsshbmjvyioflarp
kqzxdesujwcstdbmgvyioflatp
kqzxpenujwcsthimgvyioflhrp
kqzxdmkujwcsthbmgvpioflarp
kszxdenujwcsthbybvyioflarp
kqzxdvnujwcsthbmgvyqoslarp
kkzxdetujwcsthbmgvyiofltrp
kqzxdenujwcsthomgvyiozlaro
cqzfdenubwcsthbmgvyioflarp
kqzxdenyjwcsthbmhvyiofldrp
kqzxdenujwcsthbmghfiofxarp
kmqxdebujwcsthbmgvyioflarp
kqzxdenufwcsthbmvvypoflarp
kqnxdenujwcsthbmgvtzoflarp
bqzxdenujwcithbmgvyiohlarp
kqzxdenurwrsthbmgvyioelarp
kqzxdenujwcsthbmgpyiodlarl
kqzxdengjwcxthbmgvjioflarp
kizxdenujwcsnhqmgvyioflarp
jqzxdenajwcsthbmnvyioflarp
kqzcdenujwcsphbigvyioflarp
kezxdenujwcsthbfgvyioflaqp
kqzxdenujwcstybmgvyivfyarp
kqzxdenujwcsthbmgvbiofsnrp
kqzxdenujwcsthbmgvyhxfnarp
kvzxdenqjfcsthbmgvyioflarp
kqzxywnljwcsthbmgvyioflarp
kqzxdenujwcsbhbzgvyioxlarp
kqkxdenufwcsthbmgvyiofxarp
dqzxddnujwcsthsmgvyioflarp
yqrxdenujwcsthbagvyioflarp
kqzxdenujwcsajbmgvyiovlarp
kqztdunujwcsthbmgvyioilarp
kqzxdequjwcsthbmgvyyoflarm
kqzxdlnujwksthbmgvkioflarp
tqvxdenujwcsthbmgveioflarp
kqzndezupwcsthbmgvyioflarp
kqzctsnujwcsthbmgvyioflarp
kqzxdenujwmstkbmgvyioflgrp
kqzxdenujwzsthdmgvyiofdarp
kqzxdynujwcsthcmgvyioflasp
kqzxdesujwcstybmgcyioflarp
kqzxdenujwcsthbvgvyiyglarp
kqzxpenujwcsthbogvyioflard
khzxdenujwcsthbmgvyikflaep
kqzxdedujwchthbmgvyeoflarp
kxzxsepujwcsthbmgvyioflarp
xqzxdenujwcsthbpgvyioelarp
jfzxdenujwcsthbmgvyiollarp
kqzxcenujwcethbmgvwioflarp
kqzxdenujwcithbmgvysoflarg
kqlxdenujwnsthbmgvyiotlarp
wqzydenujwcsthbmgvyioftarp
kqzxienuwwcsthbmgayioflarp
kqzxdetujwcsthbmgvyhoflawp
kqzxdqnujwrsthbmgvyxoflarp
kqzxdenujwcvthbmgjiioflarp
kqzxdenujwcjthbxgvaioflarp
kqzxpenujwcsthymgvyioklarp
kqzxdenujwcsthbmswygoflarp
kqzxdenujwcsthbmgvyiaxiarp
kqzxdenudkcsthbmgvyzoflarp
kqzxdvndjwcsthbmgvyioflaxp
kqzxdenujwcsthbmdvymoflvrp
kqzxvenujwcsihbmgvyiofllrp
kqzxdqnujwcsthbmgtyioflprp
kqzxdenuuwcathbmgvsioflarp
kqzrdenujwesthbjgvyioflarp
kqzxdexujwcstzbmgvyyoflarp
kqzxpenujwjstabmgvyioflarp
kozxdenejwcsthbmgvpioflarp
kbzxdenvjwcsthbmgvyiofsarp
kolxdenujwcjthbmgvyioflarp
kqzxdenujwcsthbmgvyiffsakp
kqzxdelujwcsthbmlvyioflxrp
kqzxdenugwcsthrmgvyioflprp
kqzxdelujwcsthqmgvyiozlarp
kqzxienujwosthbmgvykoflarp
kqzxdeuujwicthbmgvyioflarp
kqzxdenbjwcsthbmcvyaoflarp
krzxdqnujwcsthbmgvyioflerp
wqzxzenujwcsthbmgvyioclarp
kqzxyenujwcsthbmgejioflarp
kqzxdenujwcstsbmgvtidflarp
kqnxdenejwcsthbmgvyioflara
kqzsdmnujwcsthbmgvyioflaep
kqzxdedujwnsthymgvyioflarp
kqzxdenujwusthbmgnyioflarx
kqzxlenujwcsthbmgayvoflarp
kqzxdenujwcsthbmgvyiofngrh
zqzxdenujwcsthbmgvyiofvxrp
kqzydenujwmsthbmgvyiuflarp
kqzxdenujkrsthbmdvyioflarp
kqzxdlnujocsthbmgvyiofaarp
kqzxdenujwcstybmgvyiofrwrd
kqzxdenupwksthbmgvyiofbarp
khzxdentjwcsthbmbvyioflarp
kqzxdenujwcuphbmgvyihflarp
kqzxdenhjwcgthbmgvyioflrrp
kqzxdenujwcsthbmgvyiofakhp
kqzxdenujwcstfkmgvyioflamp
kqzxdenujqcsthbmgvkiorlarp
kqzxdenujwcstvbmgvyioilasp
kqzxdxnujwcsthbpgayioflarp
kqzxdenupwysthbmgvyiofljrp
kqzxdenujwcdthbmgvymoflarv
kqnxdenujwcstvbmgvyixflarp
kqjxdenujwcsthbmgvyikflurp
kqsxdenulwcsthxmgvyioflarp
bqzxbenujwcsahbmgvyioflarp
vqzxdenujwcsthbmgvjzoflarp
kqzhfenujwcsthimgvyioflarp
eqzxdenujwcshhbmgnyioflarp
kqzxdenujucstubmgvyicflarp
kuzxdenuewcsthbmgvyiofuarp
kqzxdenulwcsthbmgpyigflarp
kqzxdebujwcsthbmgoyioflaro
kqzxdenujwcuthbmgucioflarp
kqzxdenujwcschpmgvyioflhrp
kqzxfenujwcsthbmjvrioflarp
kqzxdenujqcsthbmgvyndflarp
kqzxdgnbjwcsthbmgvywoflarp
kqzxdenujwcsthrmgtbioflarp
yqzxdenyjwcsthbmgvyioflarg
kqzxdenuxwxsthbmsvyioflarp
kqzxdenujwcsthbugqyvoflarp
qqzxdenujwcsahbmgoyioflarp
kqsxdenudwcsthbmguyioflarp
kqzxdenujwcstublgvyioflamp
kqzxdemujwtstqbmgvyioflarp
kqzxqvnajwcsthbmgvyioflarp
kqzxoennjwcstbbmgvyioflarp
kqzxfenujwcsthbmlvyioflwrp
kqzjdunujwcsthhmgvyioflarp
kqzxdenujwcqthbmgvyirfxarp
kqzxdengjwcsthbmgvyiowlgrp
kqgxdenujwcswhbmglyioflarp
mqzxdekuuwcsthbmgvyioflarp
kqzxdenujwdsthbmgbyiovlarp
krzxdenlhwcsthbmgvyioflarp
kqzxdenmjwcstqbmgvyioflanp
kqzxdenujwcmthbmgvtioflyrp
kqzxdenujwcsthbmgvaijflprp
kqzxdenuywysqhbmgvyioflarp
kqzxdenujwfsthbmgvyhoflark
nqzcdefujwcsthbmgvyioflarp
kqzxdenujrcsthgmgyyioflarp
kqzxdqnujwzsthbmgvyioftarp
kqzxdenujwcsthimgvyioolapp
kqzxdenupwcsthbmggyioflyrp
kqzxdjnujwcsthbvgvyioflarf
kqzxdtnujwasthbmgvyiofuarp
kqzxbensjzcsthbmgvyioflarp
kqzxdenujwcsphbmwiyioflarp
kqzgdenuowcsthbmgvyioflarh
kmzxdenujwasthbmgvtioflarp
kqzxdenujwcstybmgvyiofrard
vqzxdenejwcsthbmglyioflarp
kqhxdenujwcsmhbmgvyioflprp
kqzxdnnujwcsthzsgvyioflarp
kczxdenujwcsthbmgvyeoflaop
kqzxdenujwcsxhbmgvaioflaap
kqzxdenujwcsthbmgayiofnprp
kqzxdvnujwcsthbmgvyipjlarp
kqzxdenubwcskhbmgvyiofkarp
kqzxdenujwcsthbgggyigflarp
kqzxdenujncstabvgvyioflarp
kqzxdenujwcstqimqvyioflarp
kqzxeenujwcsdhbmgvyqoflarp
kcpxdenujwcsthbmgvyioilarp
kqwxuenujwcsthbmgvyiyflarp
kqzxdwnujwcstgbmgvyioplarp
kqzxdenuswcstvbmglyioflarp
kqzxdenujwcsthabgvyiwflarp
kqzxdpnujwcsthbmwvyiomlarp
kqzxdenujwcdthbmgvcioffarp
kqzxdenajwcsthbmtvyiofldrp
kqzbnenujwcshhbmgvyioflarp
kqzbdequiwcsthbmgvyioflarp
kqzxdenuswcsohbmgzyioflarp
kvzxdenujwcstdbmjvyioflarp
kqzxoenujwcqthbmpvyioflarp
kqzxhenujwcsthbmgoyiofoarp
klzxdenujwczthbmgvyioflanp
kqpxdenujwcsthbmgvyioflafz
kqkxdenujwcstxbngvyioflarp
kqzepenuxwcsthbmgvyioflarp
bqzxdenujmcithbmgvyioflarp
kdzxdjnujwcstnbmgvyioflarp
kszxdenujwcsthbmgeyiofrarp
kqzxdenijwcsthbmgvhiaflarp
kqzadenujwcbtxbmgvyioflarp
kqkxwenujwcsthbmgvyiowlarp
pqzddenujwcsthbmgvyboflarp
kqzxxenujwcsthbwgvyioflmrp
kqzxdjnujwcsthbmgvyipilarp
pqzxdenujwcsthbmgvyieflark
sqzxdenujtcsthbmgiyioflarp
kqzxdznujwcsthbmgvzioflajp
kqzxdrnujqcsthbmgvyiofvarp
gqzxdenujwcsthemgvlioflarp
kqzxdenujjcsthbmgvuiofljrp
kqzsdenujmcsthbmggyioflarp
kqzxienujwcsthbmgvaioflaip
kqzxdwnujwcstfkmgvyioflarp
kqzqdenujwcithbmzvyioflarp
kqzxdedpjwcsthbmgvyiofbarp
kqzxdeaujwcbtdbmgvyioflarp
kqzewenyjwcsthbmgvyioflarp
kqzxddnujwcsthbmgyyiofrarp
kqzxdtnujwcsthbmgvyiodlard
kqzxdefujwcsthbmgvyiffwarp
xczxdenujwcsthbmgvyooflarp
kuzxdenujucsthbmgvykoflarp
kqzxtenujwcwthbmgvyioplarp
kqzxdencllcsthbmgvyioflarp`

console.log(day2part2(data))

import aocLoader from "aoc-loader";
// import dotenv from "dotenv";
// dotenv.config();
import 'dotenv/config';

aocLoader(2018, 2).then(data => {
  console.log(day2part1(data));
  console.log(day2part2(data));
});

// kqzxdenujwcsthbzgvyioflcsp
// vqwxdenujwcsthbmggyioflarp

function containsDuplicates(id, amount){
  const chars = new Map();
  [...id].forEach(c => {
    const count = chars.get(c);
    chars.set(c, count === undefined ? 1 : count + 1);
  });
  return [...chars.values()].filter( i => i === amount).length > 0;
}

function day2part1(data) {
  const lines = data.split(/\r?\n/);
  const sum = (ac, item) => { return ac + item };
  let idTwo = lines.map( id => { return containsDuplicates(id, 2) ? 1 : 0 }).reduce(sum, 0);
  let idThree = lines.map( id => { return containsDuplicates(id, 3) ? 1 : 0 }).reduce(sum, 0);
  return idTwo * idThree;
}
function day2part2(data) {
  return 0;
}

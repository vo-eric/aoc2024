var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8');
var parsedInput = input.split(/\r?\n/);

//PART 1
// const solution = (input) => {
//   let result = 0;
//   const lefts = [];
//   const rights = [];
//   for (const line of input) {
//     const [left, _, right] = line.split(/(\s+)/);
//     lefts.push(Number(left));
//     rights.push(Number(right));
//   }

//   lefts.sort((a, b) => a - b);
//   rights.sort((a, b) => a - b);

//   for (let i = 0; i < lefts.length; i++) {
//     result += Math.abs(lefts[i] - rights[i]);
//   }

//   return result;
// };

//PART 2
const solution = (input) => {
  let rightCount = {};
  let result = 0;
  for (const line of input) {
    const [left, _, right] = line.split(/(\s+)/);
    rightCount[right] = (rightCount[right] || 0) + 1;
  }

  console.log(rightCount);

  for (const line of input) {
    const [left, _, right] = line.split(/(\s+)/);

    if (rightCount[left]) {
      console.log(left, Number(left) * rightCount[left]);
      result += Number(left) * rightCount[left];
    }
  }

  return result;
};

console.log(solution(parsedInput));

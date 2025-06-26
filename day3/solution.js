var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8');
// var parsedInput = input.split(/\r?\n/);

//PART 1
//Time complexity: O(n) where n is the number of characters in the input
//Space complexity: O(m) where m is the number of operations from the input
const solution = (input) => {
  const regex = /mul\(\d+,\d+\)/g;
  let result = 0;

  const operations = input
    .match(regex)
    .map((op) => op.replace('mul(', '').replace(')', ''));

  for (const operation of operations) {
    const [val1, val2] = operation.split(',');
    result += Number(val1) * Number(val2);
  }

  return result;
};

console.log(solution(input));

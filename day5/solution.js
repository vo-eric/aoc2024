var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8');
var parsedInput = input.split(/\r?\n/);

const emptyIndex = parsedInput.indexOf('');
const first = parsedInput.slice(0, emptyIndex);
const second = parsedInput.slice(emptyIndex + 1);

//PART 1
//Time Complexity: O(n + m * k^2) => O(m^2) where n is the number of lines in the first part of the array, m is the number of lines in the second part of the array, and k is the number of pages
//Space Complexity: O(n) where n is the number of lines in the first array
// const solution = (first, second) => {
//   let result = 0;
//   const rulesMap = new Map();

//   for (const line of first) {
//     const [left, right] = line.split('|');
//     if (!rulesMap.has(left)) {
//       rulesMap.set(left, new Set());
//     }
//     rulesMap.get(left).add(right);
//   }

//   console.log(rulesMap);

//   for (const line of second) {
//     const split = line.split(',');
//     let isValid = true;

//     for (let i = 0; i < split.length - 1; i++) {
//       const rules = rulesMap.get(split[i]);

//       if (!rules) {
//         isValid = false;
//         break;
//       }

//       for (let j = i + 1; j < split.length; j++) {
//         if (!rules.has(split[j])) {
//           isValid = false;
//           break;
//         }
//       }
//     }
//     if (isValid) {
//       result += +split[Math.floor(split.length / 2)];
//     }
//   }

//   return result;
// };

//PART 2
const isValid = (line, rulesMap) => {
  for (let i = 0; i < line.length - 1; i++) {
    const rules = rulesMap.get(line[i]);

    if (!rules) {
      return [false, i, -1];
    }

    for (let j = i + 1; j < line.length; j++) {
      if (!rules.has(line[j])) {
        return [false, i, j];
      }
    }
  }

  return [true, -1, -1];
};
const solution = (first, second) => {
  let result = 0;
  const rulesMap = new Map();
  const invalid = [];

  for (const line of first) {
    const [left, right] = line.split('|');
    if (!rulesMap.has(left)) {
      rulesMap.set(left, new Set());
    }
    rulesMap.get(left).add(right);
  }

  for (const line of second) {
    const split = line.split(',');

    const [valid, _, __] = isValid(split, rulesMap);
    if (!valid) invalid.push(split);
  }

  for (const line of invalid) {
    while (!isValid(line, rulesMap)[0]) {
      const [_, index, index2] = isValid(line, rulesMap);

      if (!rulesMap.has(line[index])) {
        [line[index], line[line.length - 1]] = [
          line[line.length - 1],
          line[index],
        ];
      } else {
        [line[index], line[index2]] = [line[index2], line[index]];
      }
    }

    result += +line[Math.floor(line.length / 2)];
  }

  return result;
};

console.log(solution(first, second));

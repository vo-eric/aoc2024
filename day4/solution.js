var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8');
const rows = input.trim().split('\n'); // Split into rows by newlines
const newInput = rows.map((row) => row.trim().split(''));

//PART 1
// Time complexity: O(n * m) where n is the length of the input and m is the length of the row
// Space complexity: O(1)
// const solution = (input) => {
//   let result = 0;
//   const dirs = [
//     [0, 1],
//     [0, -1],
//     [1, 0],
//     [-1, 0],
//     [-1, -1],
//     [-1, 1],
//     [1, 1],
//     [1, -1],
//   ];

//   for (let i = 0; i < rows.length; i++) {
//     for (let j = 0; j < rows[i].length; j++) {
//       if (input[i][j] === 'X') {
//         let curr = 'X';
//         let x = j;
//         let y = i;

//         for (const dir of dirs) {
//           while (curr.length < 4) {
//             x += dir[0];
//             y += dir[1];

//             if (x < 0 || x >= input[i].length || y < 0 || y >= input.length) {
//               break;
//             }

//             curr += rows[y][x];
//           }

//           if (curr === 'XMAS') {
//             result++;
//           }

//           curr = 'X';
//           x = j;
//           y = i;
//         }
//       }
//     }
//   }

//   return result;
// };

//Part 2

//Time Complexity: O(n * m) where n is the length of the input and m is the length of the row
//Space Complexity: O(1)
const isValid = (input, x, y) => {
  if (
    x === 0 ||
    x === input[0].length - 1 ||
    y === 0 ||
    y === input.length - 1
  ) {
    return false;
  }

  const ul = input[x - 1][y - 1];
  const ur = input[x - 1][y + 1];
  const ll = input[x + 1][y - 1];
  const lr = input[x + 1][y + 1];

  const ulTolr = [ul, 'A', lr].sort().join('');
  const urToll = [ur, 'A', ll].sort().join('');

  if (ulTolr === 'AMS' && urToll === 'AMS') {
    return true;
  }
  return false;
};

const solution = (input) => {
  let result = 0;

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (input[i][j] === 'A') {
        if (isValid(input, i, j)) result++;
      }
    }
  }

  return result;
};

console.log(solution(newInput));

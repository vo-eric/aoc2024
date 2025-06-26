var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8');
const rows = input.trim().split('\n'); // Split into rows by newlines
const newInput = rows.map((row) => row.trim().split(''));

const solution = (input) => {
  let result = 0;
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1],
  ];

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (input[i][j] === 'X') {
        let curr = 'X';
        let x = j;
        let y = i;

        for (const dir of dirs) {
          while (curr.length < 4) {
            x += dir[0];
            y += dir[1];

            if (x < 0 || x >= input[i].length || y < 0 || y >= input.length) {
              break;
            }

            curr += rows[y][x];
          }

          if (curr === 'XMAS') {
            result++;
          }

          curr = 'X';
          x = j;
          y = i;
        }
      }
    }
  }

  return result;
};

console.log(solution(newInput));

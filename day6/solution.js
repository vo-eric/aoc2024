var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8');
var parsedInput = input.split(/\r?\n/);
parsedInput = parsedInput.map((row) => row.split(''));
const coords = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const findInitialPosition = (parsedInput) => {
  for (let row = 0; row < parsedInput.length; row++) {
    for (let col = 0; col < parsedInput[0].length; col++) {
      if (parsedInput[row][col] === '^') {
        return [row, col];
      }
    }
  }
};

//PART 1
//Time Complexity: O(n * m) where n is the number of rows and m is the number of columns
//Space Complexity: O(1)
const solution = (parsedInput) => {
  let result = 0;
  let coordsIndex = 0;
  let [x, y] = findInitialPosition(parsedInput);

  while (
    x >= 0 &&
    x < parsedInput.length &&
    y >= 0 &&
    y < parsedInput[0].length
  ) {
    if (parsedInput[x][y] === '#') {
      x = x - coords[coordsIndex][0];
      y = y - coords[coordsIndex][1];
      coordsIndex = (coordsIndex + 1) % 4;
    }

    if (parsedInput[x][y] !== 'X') {
      result++;
    }
    parsedInput[x][y] = 'X';
    x = x + coords[coordsIndex][0];
    y = y + coords[coordsIndex][1];
  }
  return result;
};

console.log(solution(parsedInput));

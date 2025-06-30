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
// const solution = (parsedInput) => {
//   let result = 0;
//   let coordsIndex = 0;
//   let [x, y] = findInitialPosition(parsedInput);

//   while (
//     x >= 0 &&
//     x < parsedInput.length &&
//     y >= 0 &&
//     y < parsedInput[0].length
//   ) {
//     if (parsedInput[x][y] === '#') {
//       x = x - coords[coordsIndex][0];
//       y = y - coords[coordsIndex][1];
//       coordsIndex = (coordsIndex + 1) % 4;
//     }

//     if (parsedInput[x][y] !== 'X') {
//       result++;
//     }
//     parsedInput[x][y] = 'X';
//     x = x + coords[coordsIndex][0];
//     y = y + coords[coordsIndex][1];
//   }
//   return result;
// };

//at each position, add an obstacle right in front of the current position
//how do we determine if we are in a loop?
//helper function to check if we are in a loop
//at each creation of an obstacle, create a set and keep track of the current position we are at
//play it out until we reach that original position
//delete the position from the set. if the set is empty, we hit a loop and can increment the result
//if we go out of bounds or the set doesn't have the current position we can return false

//reset the board at the end of each step

// BRUTE FORCE - Add an obstacle at every position and test => O(n * m)^2
// Space complexity: O(p) where is the number of obstacles
const solution = (parsedInput) => {
  let result = 0;
  let coordsIndex = 0;
  let [x, y] = findInitialPosition(parsedInput);

  for (let i = 0; i < parsedInput.length; i++) {
    for (let j = 0; j < parsedInput[0].length; j++) {
      if (parsedInput[i][j] === '.') {
        parsedInput[i][j] = '#';
        if (detectLoop(parsedInput, [x, y], coordsIndex)) {
          result++;
        }
        parsedInput[i][j] = '.';
      }
    }
  }
  return result;
};

const detectLoop = (grid, originalPosition, coordsIndex) => {
  const obstacles = new Map();
  let [x, y] = originalPosition;
  while (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
    if (grid[x][y] === '#') {
      const obstacle = obstacles.get(`${x},${y}`);

      if (
        obstacle &&
        obstacle[0] === coords[coordsIndex][0] &&
        obstacle[1] === coords[coordsIndex][1]
      ) {
        return true;
      }

      obstacles.set(`${x},${y}`, coords[coordsIndex]);

      x = x - coords[coordsIndex][0];
      y = y - coords[coordsIndex][1];
      coordsIndex = (coordsIndex + 1) % 4;
    }

    // console.log(visited);
    x = x + coords[coordsIndex][0];
    y = y + coords[coordsIndex][1];
  }
  return false;
};

/*


....#.....
.........#
..........
..#.......
.......#..
..........
.#.O<.....
........#.
#.........
......#...

*/

console.log(solution(parsedInput));

var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8');
var parsedInput = input.split(/\r?\n/);

// PART 1
const isMonotonic = (nums) => {
  const direction = nums[1] - nums[0];

  for (let i = 1; i < nums.length; i++) {
    const currentDirection = nums[i] - nums[i - 1];

    if (direction * currentDirection < 0) {
      return false;
    }

    if (nums[i] === nums[i - 1]) {
      return false;
    }
  }

  return true;
};

const solution = (parsedInput) => {
  let count = 0;
  for (const line of parsedInput) {
    let isValid = true;
    const split = line.split(' ');
    if (!isMonotonic(split)) {
      continue;
    }

    for (let i = 0; i < split.length; i++) {
      const distance = Math.abs(split[i] - split[i + 1]);
      if (distance > 3) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      count++;
    }
  }

  return count;
};

console.log(solution(parsedInput));

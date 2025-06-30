/**
 *
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/?envType=study-plan-v2&envId=top-interview-150
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(n) where n is the lengt of the stringn (assuming a string with only uniques)
 */

function lengthOfLongestSubstring(s: string): number {
  let left = 0;
  let right = 0;
  let result = 0;
  const charSet = new Set();

  while (right < s.length) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }

    charSet.add(s[right]);
    result = Math.max(result, right - left + 1);
    right++;
  }

  return result;
}

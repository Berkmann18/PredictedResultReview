/**
 * @description Fill the smallest matrix so both have the same length.
 * @param {Array[]} a Matrix a
 * @param {Array[]} b Matrix b
 * @returns {{Array, Array}} Both matrices a and b
 */
const fillEqual = (a, b) => {
  let lenA = a.length

  let lenB = b.length
  if (lenA === lenB) return { a, b }
  let lenDiff = lenA - lenB
  let _a = [...a]
  let _b = [...b]
  // let sm = (lenDiff > 0) ? [...b] : [...a]
  let chB = lenDiff > 0
  for (let i = 0; i < Math.abs(lenDiff); ++i) {
    chB ? _b.push(new Array(a[b.length + i].length).fill(''))
      : _a.push(new Array(b[a.length + i].length).fill(''))
  }
  return { a: _a, b: _b }
}

export { fillEqual }

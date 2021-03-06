'use strict'

/**
 * @fileoverview Main script for the package.
 * @module
 */
/* eslint-env node, es6 */

/**
 * Differential indication
 * @typedef {Object} Diff
 * @property {number} idx Index position of the difference
 * @property {*} before Initial data
 * @property {*} after New data
 */

/**
 * @description Gives the difference and where.
 * @param {Array} arr0 Reference array
 * @param {Array} arr1 Array to compare with
 * @returns {Diff[]} List of differences
 * @example difference([0, 1, 2], [0, 1.1, 2]); //[{idx: 1, before: 1, after: 1.1}]
 * @throws {Error} Empty array(s)
 */
const difference = (arr0, arr1) => {
  if (!arr0.length || !arr1.length) throw new Error('Empty array(s)')

  let res = []
  for (let i = 0; i < arr0.length; ++i) {
    if (arr0[i] !== arr1[i]) {
      res.push({
        idx: i,
        before: arr0[i],
        after: arr1[i]
      })
    }
  }
  return res
}

/**
 * @description Finds the difference(s) in the 2D arrays (matrices).
 * @param {Array[]} mtx0 2D reference array
 * @param {Array[]} mtx1 2D array to compare with
 * @returns {Array<Diff[]>} Matrice of differences
 * @throws {Error} Emptiness or different sizes in the matrices
 */
const diff = (mtx0, mtx1) => {
  if (!mtx0.length || mtx0.length !== mtx1.length) throw new Error('Either the matrices are empty or of a different size')

  let res = []
  for (let i = 0; i < mtx0.length; ++i) res[i] = difference(mtx0[i], mtx1[i])

  return res
}

export { diff }

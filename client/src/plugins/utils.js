'use strict'

/**
 * @fileoverview Utility script for the package.
 * @module
 */
/* eslint-env node, es6 */

import { fs } from 'fs'
import { error } from 'nclr'

/**
 * @description Gets the matrix equivalent of a string.
 * @param {string} data Data to to convert
 * @param {string} [colDelimiter=','] Character(s) that separate lines into entries
 * @param {string} [lineDelimiter='\n'] Character(s) that separate each lines
 * @returns {string[][]} Matrix
 */
const strToMtx = (data, colDelimiter = ',', lineDelimiter = '\n') => {
  let lines = data.split(lineDelimiter)
  const treatLine = line => {
    return line.split(colDelimiter)
      .map(val => val.replace(/\r|\n|\r\n/g, ''))
  }
  return lines.map(treatLine)
}

/**
 * @description Asynchronously converts a file to an array.
 * @param {string} file Filename of an UTF-8 encoded file
 * @param {string} [colDelimiter=','] Character(s) that separate lines into entries
 * @param {string} [lineDelimiter='\n'] Character(s) that separate each lines
 * @returns {string[][]} 2D array of strings.
 */
const fileToArr = (file, colDelimiter = ',', lineDelimiter = '\n') => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) error('FS error:', err) && reject(err)
      resolve(strToMtx(data, colDelimiter, lineDelimiter))
    })
  })
}

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
  let chB = lenDiff > 0
  for (let i = 0; i < Math.abs(lenDiff); ++i) {
    chB ? _b.push(new Array(a[b.length + i].length).fill(''))
      : _a.push(new Array(b[a.length + i].length).fill(''))
  }
  return { a: _a, b: _b }
}

export { fileToArr, strToMtx, fillEqual }

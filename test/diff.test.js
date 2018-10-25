const { difference, diff, fileToArr } = require('../src/diff');

test('difference', () => {
  let a = [0, 1, 2, 4], b = [0, 1, 2, 3];
  expect(difference(a, b)).toStrictEqual([{
    idx: 3,
    before: 4,
    after: 3
  }]);

  a = [0, 1.5, 2, 3];
  b = [0, 1.2, 2, 3];
  expect(difference(a, b)).toStrictEqual([{
    idx: 1,
    before: 1.5,
    after: 1.2
  }]);

  a = ['0', 1, 2];
  b = [0, 1, 2];
  expect(difference(a, b)).toStrictEqual([{
    idx: 0,
    before: '0',
    after: 0
  }]);

  expect(difference(b, b)).toStrictEqual([]);
});

test('diff error', () => {
  let a = [0, 1, 2, 4], b = [0, 1, 2, 3];
  expect(() => diff(a, b)).toThrowError('Empty array(s)');
});

test('diff', () => {
  let a = [0, 1, 2, 4], b = [0, 1, 2, 3];
  expect(diff([a], [b])).toStrictEqual([[{
    idx: 3,
    before: 4,
    after: 3
  }]]);
});

test('diff', () => {
  let a = [0, 1, 2, 4], b = [0, 1, 2, 3];
  expect(() => diff([a], [b, []])).toThrowError('Either the matrices are empty or of a different size');
});

test('file->matrix', () => {
  expect.assertions(1);
  let data = [['Person', 'Rank'], ['John', '1'], ['Mark', '2'], ['Jack', '3']];
  return fileToArr('./examples/before.txt')
    .then(
      res => expect(res).toStrictEqual(data),
      err => expect(() => err).toThrowError(Error)
    )
    .catch(err => console.log('Error=', err));
});

//L.23 (FS error)

test('before vs after', () => {
  expect.assertions(1);
  let delta = [[], [], [{
      idx: 1,
      before: '2',
      after: '3'
    }], [{
      idx: 1,
      before: '3',
      after: '2'
    }]
  ];

  return fileToArr('./examples/before.txt')
    .then(before => {
      return fileToArr('./examples/after.txt')
        .then(after => expect(diff(before, after)).toStrictEqual(delta))
        .catch(err => console.log('after.txt failed\n', err))
    })
    .catch(err => console.log('before.txt failed\n', err))
});
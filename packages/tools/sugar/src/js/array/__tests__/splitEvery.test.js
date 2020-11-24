"use strict";
const __splitEvery = require('../splitEvery');
test('sugar.js.array.splitEvery: Make a simple split on an custom array', async (done) => {
    const array = __splitEvery([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
    expect(array).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    done();
});

"use strict";

var _rem2px = _interopRequireDefault(require("../rem2px"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.unit.rem2px', () => {
  it('Should convert the passed rem value to px correctly', () => {
    expect((0, _rem2px.default)(2)).toBe(32);
  });
});
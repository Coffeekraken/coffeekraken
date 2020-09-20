"use strict";

var _px2rem = _interopRequireDefault(require("../px2rem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.unit.px2rem', () => {
  it('Should convert the passed px value to rem correctly', () => {
    expect((0, _px2rem.default)(32)).toBe(2);
  });
});
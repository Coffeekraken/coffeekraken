"use strict";

var _index = _interopRequireDefault(require("../../../dist/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('compile', _index.default);

_index.default.compile(`
.coco {
	.caca {
		background: red;
	}
}
`, 'scss').then(response => {
  console.log('SCSS', response);
});

_index.default.compile(`
async function coco() {
	return await fetch('http://localhost:4000')
}
`, 'js').then(response => {
  console.log('JS', response);
});

_index.default.compile(`
# Assignment:
number   = 42
opposite = true

# Conditions:
number = -42 if opposite

# Functions:
square = (x) -> x * x

# Arrays:
list = [1, 2, 3, 4, 5]
`, 'coffeescript').then(response => {
  console.log('Coffeescript', response);
});
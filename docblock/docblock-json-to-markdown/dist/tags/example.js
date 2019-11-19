"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = example;

function example(example) {
  return `${Array(this._titleLevel() + 2).join('#')} Example
\`\`\`${example.language || ''}
	${example.body}
\`\`\``;
}

module.exports = exports.default;
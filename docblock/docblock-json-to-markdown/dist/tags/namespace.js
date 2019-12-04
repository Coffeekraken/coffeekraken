"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = namespace;

function namespace(namespace, block) {
  let namespaceString = namespace;

  if (block.name) {
    namespaceString = namespace + '.' + block.name;
  }

  if (namespaceString) {
    return '<!-- @namespace: ' + namespaceString + ' -->\n';
  }

  return '';
}

module.exports = exports.default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = properties;

var _trimLines = _interopRequireDefault(require("trim-lines"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function properties(properties) {
  return `\n${Array(this._titleLevel() + 2).join("#")} Properties` + (0, _trimLines.default)(`
		Name  |  Type  |  Description  |  Default
		------------  |  ------------  |  ------------  |  ------------
		${properties.map(property => {
    let def = property.default || "";
    return `${property.name}  |  **${this._renderTypes(property.types)}**  |  ${property.description}  |  ${def}`;
  }).join("\n")}
	`);
}

module.exports = exports.default;
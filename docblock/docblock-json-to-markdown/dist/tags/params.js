"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = params;

var _trimLines = _interopRequireDefault(require("trim-lines"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function params(params) {
  return `\n${Array(this._titleLevel() + 2).join("#")} Parameters` + (0, _trimLines.default)(`
		Name  |  Type  |  Description  |  Status  |  Default
		------------  |  ------------  |  ------------  |  ------------  |  ------------
		${params.map(param => {
    let optional = !param.optional ? "required" : "optional";
    let def = param.default || "";
    return `${param.name}  |  **${this._renderTypes(param.types)}**  |  ${param.description}  |  ${optional}  |  ${def}`;
  }).join("\n")}
	`);
}

module.exports = exports.default;
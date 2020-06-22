"use strict";

var _CodePlayground = _interopRequireDefault(require("./class/CodePlayground"));

require("./feature/codemirror");

require("./webcomponent.props");

require("./webcomponent.imports");

require("@coffeekraken/sugar/js/feature/all");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// init a new code playground instance
const _codePlayground = new _CodePlayground.default();
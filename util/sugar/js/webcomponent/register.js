"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.define = define;
Object.defineProperty(exports, "SWebComponent", {
  enumerable: true,
  get: function () {
    return _SWebComponent.default;
  }
});
Object.defineProperty(exports, "SLitHtmlWebComponent", {
  enumerable: true,
  get: function () {
    return _SLitHtmlWebComponent.default;
  }
});
exports.stack = void 0;

var _SWebComponent = _interopRequireDefault(require("./SWebComponent"));

var _SLitHtmlWebComponent = _interopRequireDefault(require("./SLitHtmlWebComponent"));

var _getHtmlClassFromTagName = _interopRequireDefault(require("../html/getHtmlClassFromTagName"));

var _uncamelize = _interopRequireDefault(require("../string/uncamelize"));

var _htmlTagToHtmlClassMap = _interopRequireDefault(require("../html/htmlTagToHtmlClassMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _SWebComponentStack = {};
exports.stack = _SWebComponentStack;

function define(name, cls, settings = {}) {
  if (!name) throw new Error(`SWebComponent: You must define a name for your webcomponent by setting either a static "name" property on your class, of by passing a name as first parameter of the static "define" function...`);
  cls.componentName = name;
  let extend = null;

  for (let key in _htmlTagToHtmlClassMap.default) {
    if (cls.prototype instanceof _htmlTagToHtmlClassMap.default[key]) {
      extend = key;
      break;
    }
  }

  const uncamelizedName = (0, _uncamelize.default)(name);
  _SWebComponentStack[uncamelizedName] = {
    name,
    class: cls,
    extends: extend,
    settings
  };

  if (window.customElements) {
    window.customElements.define(uncamelizedName, cls, {
      extends: extend
    });
  } else if (document.registerElement) {
    document.registerElement(uncamelizedName, {
      prototype: cls.prototype,
      extends: extend
    });
  } else {
    throw `Your browser does not support either document.registerElement or window.customElements.define webcomponents specification...`;
  }
}
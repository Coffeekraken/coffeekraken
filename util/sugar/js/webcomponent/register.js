"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = register;

var _SWebComponent = _interopRequireDefault(require("./SWebComponent"));

var _SLitHtmlWebComponent = _interopRequireDefault(require("./SLitHtmlWebComponent"));

var _getHtmlClassFromTagName = _interopRequireDefault(require("../html/getHtmlClassFromTagName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function register(name, cls, settings = {}) {
  // check to get if the custom element extends a basic html one or not
  const splitedName = name.split(':');
  let extend = null;

  if (splitedName.length === 2) {
    extend = splitedName[0];
    name = splitedName[1];
  }

  const HtmlClassToExtend = (0, _getHtmlClassFromTagName.default)(extend);
  if (HtmlClassToExtend !== HTMLElement) settings.extends = HtmlClassToExtend;
  let BaseClass;

  if (settings.litHtml) {
    BaseClass = (0, _SLitHtmlWebComponent.default)(HtmlClassToExtend);
  } else {
    BaseClass = (0, _SWebComponent.default)(HtmlClassToExtend);
  }

  setTimeout(() => {
    console.log(BaseClass.coco);
    console.log(BaseClass);
    console.log(BaseClass.constructor);
    console.log(BaseClass.constructor.name); // BaseClass.define(name, cls, settings);
  }, 1000);
  return BaseClass; // function generateClass() {
  //   return cls extends BaseClass;
  // }
  // class MyWebComponent extends BaseClass {}
}

module.exports = exports.default;
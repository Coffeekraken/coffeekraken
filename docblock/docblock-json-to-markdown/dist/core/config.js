"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _abstract = _interopRequireDefault(require("../tags/abstract"));

var _category = _interopRequireDefault(require("../tags/category"));

var _const = _interopRequireDefault(require("../tags/const"));

var _copyright = _interopRequireDefault(require("../tags/copyright"));

var _deprecated = _interopRequireDefault(require("../tags/deprecated"));

var _final = _interopRequireDefault(require("../tags/final"));

var _global = _interopRequireDefault(require("../tags/global"));

var _interface = _interopRequireDefault(require("../tags/interface"));

var _override = _interopRequireDefault(require("../tags/override"));

var _package = _interopRequireDefault(require("../tags/package"));

var _private = _interopRequireDefault(require("../tags/private"));

var _properties = _interopRequireDefault(require("../tags/properties"));

var _protected = _interopRequireDefault(require("../tags/protected"));

var _public = _interopRequireDefault(require("../tags/public"));

var _todo = _interopRequireDefault(require("../tags/todo"));

var _example = _interopRequireDefault(require("../tags/example"));

var _extends = _interopRequireDefault(require("../tags/extends"));

var _implements = _interopRequireDefault(require("../tags/implements"));

var _author = _interopRequireDefault(require("../tags/author"));

var _name = _interopRequireDefault(require("../tags/name"));

var _body = _interopRequireDefault(require("../tags/body"));

var _params = _interopRequireDefault(require("../tags/params"));

var _types = _interopRequireDefault(require("../tags/types"));

var _return = _interopRequireDefault(require("../tags/return"));

var _default2 = _interopRequireDefault(require("../tags/default"));

var _see = _interopRequireDefault(require("../tags/see"));

var _static = _interopRequireDefault(require("../tags/static"));

var _values = _interopRequireDefault(require("../tags/values"));

var _default3 = _interopRequireDefault(require("../templates/default"));

var _scss = _interopRequireDefault(require("../templates/scss"));

var _js = _interopRequireDefault(require("../templates/js"));

var _php = _interopRequireDefault(require("../templates/php"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  language: "js",
  tags: {
    abstract: _abstract.default,
    category: _category.default,
    const: _const.default,
    copyright: _copyright.default,
    deprecated: _deprecated.default,
    final: _final.default,
    global: _global.default,
    interface: _interface.default,
    override: _override.default,
    package: _package.default,
    private: _private.default,
    properties: _properties.default,
    protected: _protected.default,
    public: _public.default,
    todo: _todo.default,
    example: _example.default,
    extends: _extends.default,
    implements: _implements.default,
    author: _author.default,
    name: _name.default,
    body: _body.default,
    params: _params.default,
    type: _types.default,
    types: _types.default,
    return: _return.default,
    default: _default2.default,
    see: _see.default,
    static: _static.default,
    values: _values.default
  },
  templates: {
    default: _default3.default,
    scss: _scss.default,
    js: _js.default,
    php: _php.default
  },
  types: {
    js: {
      HTMLElement: "https://developer.mozilla.org/fr/docs/Web/API/HTMLElement",
      HTMLLinkElement: "https://developer.mozilla.org/fr/docs/Web/API/HTMLLinkElement",
      String: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String",
      Array: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array",
      Object: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object",
      Function: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function",
      Boolean: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean",
      Date: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date",
      Error: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Error",
      JSON: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/JSON",
      Map: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map",
      Math: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math",
      NaN: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/NaN",
      Number: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number",
      Promise: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise",
      Proxy: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Proxy",
      RegExp: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/RegExp"
    },
    scss: {
      List: "http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists",
      String: "http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings",
      Map: "http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps",
      Color: "http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#colors",
      Function: "http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#functions",
      Mixin: "http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins"
    },
    php: {
      String: "http://php.net/manual/en/language.types.string.php",
      Boolean: "http://php.net/manual/en/language.types.boolean.php",
      Integer: "http://php.net/manual/en/language.types.integer.php",
      Float: "http://php.net/manual/en/language.types.float.php",
      Double: "http://php.net/manual/en/language.types.float.php",
      Array: "http://php.net/manual/en/language.types.array.php",
      Object: "http://php.net/manual/en/language.types.object.php",
      Callable: "http://php.net/manual/en/language.types.callable.php",
      Resource: "http://php.net/manual/en/language.types.resource.php",
      NULL: "http://php.net/manual/en/language.types.null.php",
      Mixed: "http://php.net/manual/en/language.pseudo-types.php#language.types.mixed",
      Number: "http://php.net/manual/en/language.pseudo-types.php#language.types.number",
      Callback: "http://php.net/manual/en/language.pseudo-types.php#language.types.callback"
    }
  }
};
exports.default = _default;
module.exports = exports.default;
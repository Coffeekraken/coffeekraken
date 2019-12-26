/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo/src/js/app.bundle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/src/js/app.bundle.js":
/*!***********************************!*\
  !*** ./demo/src/js/app.bundle.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dist_js_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../dist/js/class */ \"./dist/js/class.js\");\n/* harmony import */ var _dist_js_class__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dist_js_class__WEBPACK_IMPORTED_MODULE_0__);\n\n_dist_js_class__WEBPACK_IMPORTED_MODULE_0___default.a.define('ck-icon', _dist_js_class__WEBPACK_IMPORTED_MODULE_0___default.a, null, {\n  driver: 'foundation'\n});\n\n//# sourceURL=webpack:///./demo/src/js/app.bundle.js?");

/***/ }),

/***/ "./dist/js/IconWebcomponent.js":
/*!*************************************!*\
  !*** ./dist/js/IconWebcomponent.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _SWebComponent = _interopRequireDefault(__webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module '@coffeekraken/sugar/js/core/SWebComponent'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));\n\nvar _axios = _interopRequireDefault(__webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'axios'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}\n\nclass IconWebcomponent extends _SWebComponent.default {\n  /**\n   * Default props\n   * @definition    SWebComponent.defaultProps\n   * @protected\n   */\n  static get defaultProps() {\n    return {\n      /**\n       * Specify the icon to display. If the icon file is `my-icon.svg`,\n       * the icon parameter will be just `my-icon`.\n       * @prop\n       * @type    {String}\n       */\n      icon: null,\n\n      /**\n       * Specify the driver to use. It can be:\n       * - `fonticon` : Use a font icon set\n       * - `img` : Use an img tag to load the svg icon\n       * - `svg` : Inline the svg directly in the page\n       * - 'fontawesome` : Using fontawesome icons.\n       * - `material` : Using google material icons.\n       * @prop\n       * @type    {String}\n       */\n      driver: 'svg',\n\n      /**\n       * Specify the path to the icons folder relative to the document root of your project\n       * @prop\n       * @type    {String}\n       */\n      iconsPath: '/dist/icons',\n\n      /**\n       * Specify the icon prefix to use when using the `fonticon` driver\n       * @prop\n       * @type    {String}\n       */\n      iconsPrefix: 'icon-',\n\n      /**\n       * Specify a title for the icon that will be also used as alt of the image when using img driver\n       * @prop\n       * @type    {String}\n       */\n      title: null,\n\n      /**\n       * Specify the fontawesome icons css url to use\n       * @prop\n       * @type    {String}\n       */\n      fontawesomeCssUrl: 'https://use.fontawesome.com/releases/v5.7.1/css/all.css',\n\n      /**\n       * Specify the fontawesome icons css integrity checksum\n       * @prop\n       * @type    {String}\n       */\n      fontawesomeCssIntegrity: 'sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr',\n\n      /**\n       * Specify the fondation icons css url to use\n       * @prop\n       * @type    {String}\n       */\n      fondationCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css'\n    };\n  }\n  /**\n   * Css\n   * @protected\n   */\n\n\n  static defaultCss(componentName, componentNameDash) {\n    return `\n      ${componentNameDash} {\n        display : inline-block;\n        font-size: 1em;\n        vertical-align: middle;\n        text-align: center;\n        text-rendering: auto;\n        -webkit-font-smoothing: antialiased;\n      }\n      ${componentNameDash} img,\n      ${componentNameDash} svg {\n        width: auto; height: 1em;\n      }\n    `;\n  }\n  /**\n   * Mount component\n   * @definition    SWebComponent.componentMount\n   * @protected\n   */\n\n\n  componentMount() {\n    super.componentMount(); // load library depending on driver\n\n    this._injectLibraryDependingOnDriver(); // generate icon html\n\n\n    this._generateIconHtmlDependingOnDriver().then(html => {\n      // inject the html\n      this._injectIcon(html);\n    }); // apply default attributes on icon\n\n\n    this._applyDefaultAttributes();\n  }\n  /**\n   * Apply default attributes on the component like aria-hidden, etc...\n   */\n\n\n  _applyDefaultAttributes() {\n    // aria hidden\n    this.setAttribute('aria-hidden', true);\n  }\n  /**\n   * Generate the icon html depending on the driver\n   */\n\n\n  _generateIconHtmlDependingOnDriver() {\n    switch (this.props.driver) {\n      case 'fonticon':\n        return Promise.resolve(`<i class=\"${this.props.iconsPrefix}${this.props.icon}\" aria-hidden></i>`);\n\n      case 'img':\n        return Promise.resolve(`<img src=\"${this.props.iconsPath}/${this.props.icon}.svg\" alt=\"${this.props.title}\">`);\n\n      case 'fontawesome':\n        return Promise.resolve(`<i class=\"fa ${this.props.icon}\" aria-hidden></i>`);\n\n      case 'material':\n        return Promise.resolve(`<i class=\"material-icons\" aria-hidden>${this.props.icon}</i>`);\n\n      case 'foundation':\n        return Promise.resolve(`<i class=\"fi-${this.props.icon}\" aria-hidden></i>`);\n\n      case 'svg':\n      default:\n        return Promise.resolve(this._loadSvgIcon());\n    }\n  }\n  /**\n   * Inject library depending on the driver\n   */\n\n\n  _injectLibraryDependingOnDriver() {\n    switch (this.props.driver) {\n      case 'fontawesome':\n        {\n          const fontawesomeElm = document.querySelector('link#s-fontawesome');\n          if (fontawesomeElm) return;\n          const linkFontawesomeElm = document.createElement('link');\n          linkFontawesomeElm.setAttribute('id', 'fontawesome');\n          linkFontawesomeElm.setAttribute('rel', 'stylesheet');\n          linkFontawesomeElm.setAttribute('href', this.props.fontawesomeCssUrl);\n          linkFontawesomeElm.setAttribute('integrity', this.props.fontawesomeCssIntegrity);\n          linkFontawesomeElm.setAttribute('crossorigin', 'anonymous');\n          document.head.appendChild(linkFontawesomeElm);\n          break;\n        }\n\n      case 'material':\n        {\n          const materialElm = document.querySelector('link#s-material');\n          if (materialElm) return;\n          const linkMaterialElm = document.createElement('link');\n          linkMaterialElm.setAttribute('id', 'material');\n          linkMaterialElm.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');\n          linkMaterialElm.setAttribute('rel', 'stylesheet');\n          document.head.appendChild(linkMaterialElm);\n          break;\n        }\n\n      case 'foundation':\n        {\n          const foundationElm = document.querySelector('link#s-foundation');\n          if (foundationElm) return;\n          const foundationLinkElm = document.createElement('link');\n          foundationLinkElm.setAttribute('id', 'foundation');\n          foundationLinkElm.setAttribute('href', this.props.fondationCssUrl);\n          foundationLinkElm.setAttribute('rel', 'stylesheet');\n          document.head.appendChild(foundationLinkElm);\n          break;\n        }\n\n      default:\n        // do nothing by default\n        break;\n    }\n  }\n  /**\n   * Load the svg icon\n   */\n\n\n  _loadSvgIcon() {\n    return new Promise(resolve => {\n      _axios.default.get(`${this.props.iconsPath}/${this.props.icon}.svg`).then(response => {\n        const domParser = new DOMParser();\n        const docElm = domParser.parseFromString(response.data, 'text/html');\n        const svgElm = docElm.querySelector('svg');\n        svgElm.setAttribute('aria-hidden', true);\n        resolve(svgElm.outerHTML);\n      });\n    });\n  }\n  /**\n   * Inject icon\n   * @param    {String}    iconHtml    The html of the icon to inject\n   */\n\n\n  _injectIcon(iconHtml) {\n    // replace the html\n    this.innerHTML = iconHtml;\n  }\n  /**\n   * Component will receive prop\n   * @definition    SWebComponent.componentWillReceiveProp\n   * @protected\n   */\n\n\n  componentWillReceiveProp(name, newVal, oldVal) {\n    super.componentWillReceiveProp(name, newVal, oldVal);\n\n    switch (name) {\n      case 'icon':\n        {\n          // inject the new icon\n          this._generateIconHtmlDependingOnDriver().then(html => {\n            this._injectIcon(html);\n          });\n\n          break;\n        }\n\n      case 'driver':\n        {\n          // inject library depending on driver\n          this._injectLibraryDependingOnDriver();\n\n          break;\n        }\n\n      case 'title':\n        {\n          if (this.props.driver === 'img') {\n            this.querySelector('img').setAttribute('alt', newVal);\n          }\n\n          break;\n        }\n\n      default:\n        // do nothing by default\n        break;\n    }\n  }\n\n}\n\nexports.default = IconWebcomponent;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./dist/js/IconWebcomponent.js?");

/***/ }),

/***/ "./dist/js/class.js":
/*!**************************!*\
  !*** ./dist/js/class.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _IconWebcomponent = _interopRequireDefault(__webpack_require__(/*! ./IconWebcomponent */ \"./dist/js/IconWebcomponent.js\"));\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}\n\nvar _default = _IconWebcomponent.default;\nexports.default = _default;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./dist/js/class.js?");

/***/ })

/******/ });
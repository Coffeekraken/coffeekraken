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
eval("__webpack_require__.r(__webpack_exports__);\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module '@coffeekraken/sugar/js/feature/all'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var _dist_js_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../dist/js/index */ \"./dist/js/index.js\");\n/* harmony import */ var _dist_js_index__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_dist_js_index__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n//# sourceURL=webpack:///./demo/src/js/app.bundle.js?");

/***/ }),

/***/ "./dist/js/ShareWebcomponent.js":
/*!**************************************!*\
  !*** ./dist/js/ShareWebcomponent.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _sNativeWebComponent = _interopRequireDefault(__webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module '@coffeekraken/sugar/js/core/sNativeWebComponent'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));\n\nvar _sharerNpm = _interopRequireDefault(__webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'sharer.npm.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}\n/**\n * @name \tShareWebcomponent\n * @namespace       share-webcomponent\n * @type      Class\n * @extends \tnative(HTMLAnchorElement)\n *\n * Easily create some share buttons to target facebook, twitter, linkedin, google+, etc...\n *\n * @example \thtml\n * <a is=\"ck-share\" href=\"#\" network=\"facebook\" title=\"Share on facebook\">\n * \tShare on facebook\n * </a>\n *\n * @author \tOlivier Bossel <olivier.bossel@gmail.com>\n */\n\n\nclass ShareWebcomponent extends (0, _sNativeWebComponent.default)(HTMLAnchorElement) {\n  /**\n   * Default props\n   * @definition \t\tSWebComponent.defaultProps\n   * @protected\n    * @static\n   */\n  static get defaultProps() {\n    return {\n      /**\n       * On which network to share the content\n       * @prop\n       * @type \t\t{String}\n       * @values \t\ttwitter, facebook, linkedin, googleplus, email, whatsapp, telegram, viber, pinterest, tumblr, hackernews, reddit, vk, buffer, xing, line, instapaper, pocket, digg, stumbleupon, flipboard, weibo, renren, myspace, blogger, baidu, okru\n       */\n      network: null,\n\n      /**\n       * Set the title to share\n       * @prop\n       * @type \t\t{String}\n       * @default \tdocument.title\n       */\n      title: null,\n\n      /**\n       * Set the url to share\n       * @prop\n       * @type \t\t{String}\n       * @default \tdocument.location.href\n       */\n      url: null,\n\n      /**\n       * Set a username to tweet through without @\n       * @prop\n       * @type \t\t{String}\n       */\n      via: null,\n\n      /**\n       * Set some hashtags to add to tweet comma separated without #\n       * @prop\n       * @type \t\t{String}\n       */\n      hashtags: null,\n\n      /**\n       * Set an email address to share to\n       * @prop\n       * @type \t\t{String}\n       */\n      to: null,\n\n      /**\n       * Set the email subject\n       * @prop\n       * @type \t\t{String}\n       * @default \tdocument.title\n       */\n      subject: null,\n\n      /**\n       * Set the absolute image url to share through (pinterest,vk,weibo)\n       * @prop\n       * @type \t\t{String}\n       */\n      image: null,\n\n      /**\n       * Set the description to share (pinterest,instapaper,myspace,blogger,)\n       * @prop\n       * @type \t\t{String}\n       * @default \tmeta[description]\n       */\n      description: null,\n\n      /**\n       * Set the caption to share (tumblr,vk)\n       * @prop\n       * @type \t\t{String}\n       * @default \tdocument.title\n       */\n      caption: null,\n\n      /**\n       * Set the tags to share comma separated (tumblr)\n       * @prop\n       * @type \t\t{String}\n       */\n      tags: null\n    };\n  }\n  /**\n   * Required props\n   * @definition \t\tSWebComponent.requiredProps\n   * @protected\n    * @static\n   */\n\n\n  static get requiredProps() {\n    return ['network'];\n  }\n  /**\n   * Css\n   * @protected\n    * @static\n   */\n\n\n  static defaultCss(componentName, componentNameDash) {\n    return `\n\t\t\t${componentNameDash} {\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t`;\n  }\n  /**\n   * Component will mount\n  \t * @definition \t\tSWebComponent.componentWillMount\n   * @protected\n   */\n\n\n  componentWillMount() {\n    super.componentWillMount();\n  }\n  /**\n   * Mount component\n   * @definition \t\tSWebComponent.componentMount\n   * @protected\n   */\n\n\n  componentMount() {\n    super.componentMount(); // list all attributes available for each networks\n\n    this._networkAttrs = {\n      twitter: ['title', 'url', 'hashtags', 'via'],\n      facebook: ['url', 'hashtag'],\n      linkedin: ['url'],\n      googleplus: ['url'],\n      email: ['title', 'url', 'to', 'subject'],\n      whatsapp: ['title', 'url', 'web'],\n      telegram: ['title', 'url', 'to'],\n      viber: ['title', 'url'],\n      pinterest: ['url', 'image', 'description'],\n      tumblr: ['url', 'title', 'caption', 'tags'],\n      hackernews: ['url', 'title'],\n      reddit: ['url'],\n      vk: ['url', 'title', 'image', 'caption'],\n      buffer: ['url', 'title', 'via', 'picture'],\n      xing: ['url', 'title'],\n      line: ['url', 'title'],\n      instapaper: ['url', 'title', 'description'],\n      pocket: ['url'],\n      digg: ['url'],\n      stumbleupon: ['title', 'url'],\n      flipboard: ['title', 'url'],\n      weibo: ['url', 'title', 'image', 'apikey', 'relateui'],\n      renren: ['url'],\n      myspace: ['url', 'title', 'description'],\n      blogger: ['url', 'title', 'description'],\n      baidu: ['url', 'title'],\n      okru: ['url', 'title'],\n      evernote: ['url', 'title'],\n      skype: ['url', 'title'],\n      trello: ['url', 'title', 'description']\n    }; // listen for click on the element\n\n    this.addEventListener('click', this._onClick.bind(this));\n  }\n  /**\n   * Component unmount\n   * @definition \t\tSWebComponent.componentUnmount\n   * @protected\n   */\n\n\n  componentUnmount() {\n    super.componentUnmount();\n  }\n  /**\n   * Component will receive prop\n   * @definition \t\tSWebComponent.componentWillReceiveProp\n   * @protected\n   */\n\n\n  componentWillReceiveProp(name, newVal, oldVal) {\n    switch (name) {}\n  }\n  /**\n   * Render the component\n   * Here goes the code that reflect the this.props state on the actual html element\n   * @definition \t\tSWebComponent.render\n   * @protected\n   */\n\n\n  render() {\n    super.render();\n  }\n  /**\n   * Get default share attributes\n   * @param \t\t{String} \t\tattr \t\tThe attribute name to process\n   * @return \t\t{String} \t\t\t\t\tThe default attribute\n   */\n\n\n  _getDefaultShareAttriute(attr) {\n    switch (attr) {\n      case 'title':\n      case 'subject':\n      case 'caption':\n        return document.title;\n        break;\n\n      case 'description':\n        const descElm = document.querySelector('meta[name=\"description\"]');\n        if (descElm && descElm.content) return descElm.content;\n        break;\n\n      case 'url':\n        let href = this.getAttribute('href');\n        return href && href !== '#' ? href : document.location.href;\n        break;\n    }\n\n    return null;\n  }\n  /**\n   * Handle click\n   * @param \t\t{Event} \t\te \t\tThe click event\n   */\n\n\n  _onClick(e) {\n    e.preventDefault(); // loop on network attributes\n\n    if (!this._networkAttrs[this.props.network]) return;\n    this.setAttribute('data-sharer', this.props.network);\n\n    this._networkAttrs[this.props.network].forEach(attr => {\n      if (this.hasAttribute(`data-${attr}`)) return;\n      let val = this.props[attr];\n\n      if (!val) {\n        val = this._getDefaultShareAttriute(attr);\n      }\n\n      if (val) {\n        this.setAttribute(`data-${attr}`, val);\n      }\n    }); // create a new sharer\n\n\n    const sharer = new _sharerNpm.default(this);\n    sharer.share();\n  }\n\n}\n\nexports.default = ShareWebcomponent;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./dist/js/ShareWebcomponent.js?");

/***/ }),

/***/ "./dist/js/index.js":
/*!**************************!*\
  !*** ./dist/js/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _ShareWebcomponent = _interopRequireDefault(__webpack_require__(/*! ./ShareWebcomponent */ \"./dist/js/ShareWebcomponent.js\"));\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}\n\nvar _default = _ShareWebcomponent.default.define('ck-share', _ShareWebcomponent.default, 'a');\n\nexports.default = _default;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./dist/js/index.js?");

/***/ })

/******/ });
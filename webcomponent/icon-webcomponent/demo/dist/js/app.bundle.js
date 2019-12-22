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

/***/ "../../../../../../../../usr/local/lib/node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "../../../../../../../../usr/local/lib/node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "../../../../../../../../usr/local/lib/node_modules/webpack/node_modules/process/browser.js":
/*!*************************************************!*\
  !*** (webpack)/node_modules/process/browser.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///(webpack)/node_modules/process/browser.js?");

/***/ }),

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _SWebComponent = _interopRequireDefault(__webpack_require__(/*! @coffeekraken/sugar/js/core/SWebComponent */ \"./node_modules/@coffeekraken/sugar/js/core/SWebComponent.js\"));\n\nvar _axios = _interopRequireDefault(__webpack_require__(/*! axios */ \"./node_modules/axios/index.js\"));\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}\n\nclass IconWebcomponent extends _SWebComponent.default {\n  /**\n   * Default props\n   * @definition    SWebComponent.defaultProps\n   * @protected\n   */\n  static get defaultProps() {\n    return {\n      /**\n       * Specify the icon to display. If the icon file is `my-icon.svg`,\n       * the icon parameter will be just `my-icon`.\n       * @prop\n       * @type    {String}\n       */\n      icon: null,\n\n      /**\n       * Specify the driver to use. It can be:\n       * - `fonticon` : Use a font icon set\n       * - `img` : Use an img tag to load the svg icon\n       * - `svg` : Inline the svg directly in the page\n       * - 'fontawesome` : Using fontawesome icons.\n       * - `material` : Using google material icons.\n       * @prop\n       * @type    {String}\n       */\n      driver: 'svg',\n\n      /**\n       * Specify the path to the icons folder relative to the document root of your project\n       * @prop\n       * @type    {String}\n       */\n      iconsPath: '/dist/icons',\n\n      /**\n       * Specify the icon prefix to use when using the `fonticon` driver\n       * @prop\n       * @type    {String}\n       */\n      iconsPrefix: 'icon-',\n\n      /**\n       * Specify a title for the icon that will be also used as alt of the image when using img driver\n       * @prop\n       * @type    {String}\n       */\n      title: null,\n\n      /**\n       * Specify the fontawesome icons css url to use\n       * @prop\n       * @type    {String}\n       */\n      fontawesomeCssUrl: 'https://use.fontawesome.com/releases/v5.7.1/css/all.css',\n\n      /**\n       * Specify the fontawesome icons css integrity checksum\n       * @prop\n       * @type    {String}\n       */\n      fontawesomeCssIntegrity: 'sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr',\n\n      /**\n       * Specify the fondation icons css url to use\n       * @prop\n       * @type    {String}\n       */\n      fondationCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/foundicons/3.0.0/foundation-icons.css'\n    };\n  }\n  /**\n   * Css\n   * @protected\n   */\n\n\n  static defaultCss(componentName, componentNameDash) {\n    return `\n      ${componentNameDash} {\n        display : inline-block;\n        font-size: 1em;\n        vertical-align: middle;\n        text-align: center;\n        text-rendering: auto;\n        -webkit-font-smoothing: antialiased;\n      }\n      ${componentNameDash} img,\n      ${componentNameDash} svg {\n        width: auto; height: 1em;\n      }\n    `;\n  }\n  /**\n   * Mount component\n   * @definition    SWebComponent.componentMount\n   * @protected\n   */\n\n\n  componentMount() {\n    super.componentMount(); // load library depending on driver\n\n    this._injectLibraryDependingOnDriver(); // generate icon html\n\n\n    this._generateIconHtmlDependingOnDriver().then(html => {\n      // inject the html\n      this._injectIcon(html);\n    }); // apply default attributes on icon\n\n\n    this._applyDefaultAttributes();\n  }\n  /**\n   * Apply default attributes on the component like aria-hidden, etc...\n   */\n\n\n  _applyDefaultAttributes() {\n    // aria hidden\n    this.setAttribute('aria-hidden', true);\n  }\n  /**\n   * Generate the icon html depending on the driver\n   */\n\n\n  _generateIconHtmlDependingOnDriver() {\n    switch (this.props.driver) {\n      case 'fonticon':\n        return Promise.resolve(`<i class=\"${this.props.iconsPrefix}${this.props.icon}\" aria-hidden></i>`);\n\n      case 'img':\n        return Promise.resolve(`<img src=\"${this.props.iconsPath}/${this.props.icon}.svg\" alt=\"${this.props.title}\">`);\n\n      case 'fontawesome':\n        return Promise.resolve(`<i class=\"${this.props.icon}\" aria-hidden></i>`);\n\n      case 'material':\n        return Promise.resolve(`<i class=\"material-icons\" aria-hidden>${this.props.icon}</i>`);\n\n      case 'foundation':\n        return Promise.resolve(`<i class=\"fi-${this.props.icon}\" aria-hidden></i>`);\n\n      case 'svg':\n      default:\n        return Promise.resolve(this._loadSvgIcon());\n    }\n  }\n  /**\n   * Inject library depending on the driver\n   */\n\n\n  _injectLibraryDependingOnDriver() {\n    switch (this.props.driver) {\n      case 'fontawesome':\n        {\n          const fontawesomeElm = document.querySelector('link#s-fontawesome');\n          if (fontawesomeElm) return;\n          const linkFontawesomeElm = document.createElement('link');\n          linkFontawesomeElm.setAttribute('id', 'fontawesome');\n          linkFontawesomeElm.setAttribute('rel', 'stylesheet');\n          linkFontawesomeElm.setAttribute('href', this.props.fontawesomeCssUrl);\n          linkFontawesomeElm.setAttribute('integrity', this.props.fontawesomeCssIntegrity);\n          linkFontawesomeElm.setAttribute('crossorigin', 'anonymous');\n          document.head.appendChild(linkFontawesomeElm);\n          break;\n        }\n\n      case 'material':\n        {\n          const materialElm = document.querySelector('link#s-material');\n          if (materialElm) return;\n          const linkMaterialElm = document.createElement('link');\n          linkMaterialElm.setAttribute('id', 'material');\n          linkMaterialElm.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');\n          linkMaterialElm.setAttribute('rel', 'stylesheet');\n          document.head.appendChild(linkMaterialElm);\n          break;\n        }\n\n      case 'foundation':\n        {\n          const foundationElm = document.querySelector('link#s-foundation');\n          if (foundationElm) return;\n          const foundationLinkElm = document.createElement('link');\n          foundationLinkElm.setAttribute('id', 'foundation');\n          foundationLinkElm.setAttribute('href', this.props.fondationCssUrl);\n          foundationLinkElm.setAttribute('rel', 'stylesheet');\n          document.head.appendChild(foundationLinkElm);\n          break;\n        }\n\n      default:\n        // do nothing by default\n        break;\n    }\n  }\n  /**\n   * Load the svg icon\n   */\n\n\n  _loadSvgIcon() {\n    return new Promise(resolve => {\n      _axios.default.get(`${this.props.iconsPath}/${this.props.icon}.svg`).then(response => {\n        const domParser = new DOMParser();\n        const docElm = domParser.parseFromString(response.data, 'text/html');\n        const svgElm = docElm.querySelector('svg');\n        svgElm.setAttribute('aria-hidden', true);\n        resolve(svgElm.outerHTML);\n      });\n    });\n  }\n  /**\n   * Inject icon\n   * @param    {String}    iconHtml    The html of the icon to inject\n   */\n\n\n  _injectIcon(iconHtml) {\n    // replace the html\n    this.innerHTML = iconHtml;\n  }\n  /**\n   * Component will receive prop\n   * @definition    SWebComponent.componentWillReceiveProp\n   * @protected\n   */\n\n\n  componentWillReceiveProp(name, newVal, oldVal) {\n    super.componentWillReceiveProp(name, newVal, oldVal);\n\n    switch (name) {\n      case 'icon':\n        {\n          // inject the new icon\n          this._generateIconHtmlDependingOnDriver().then(html => {\n            this._injectIcon(html);\n          });\n\n          break;\n        }\n\n      case 'driver':\n        {\n          // inject library depending on driver\n          this._injectLibraryDependingOnDriver();\n\n          break;\n        }\n\n      case 'title':\n        {\n          if (this.props.driver === 'img') {\n            this.querySelector('img').setAttribute('alt', newVal);\n          }\n\n          break;\n        }\n\n      default:\n        // do nothing by default\n        break;\n    }\n  }\n\n}\n\nexports.default = IconWebcomponent;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./dist/js/IconWebcomponent.js?");

/***/ }),

/***/ "./dist/js/class.js":
/*!**************************!*\
  !*** ./dist/js/class.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _IconWebcomponent = _interopRequireDefault(__webpack_require__(/*! ./IconWebcomponent */ \"./dist/js/IconWebcomponent.js\"));\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}\n\nvar _default = _IconWebcomponent.default;\nexports.default = _default;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./dist/js/class.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/class/SEvent.js":
/*!*************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/class/SEvent.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nObject.defineProperty(exports, \"default\", {\n  enumerable: true,\n  get: function () {\n    return _customEvent.default;\n  }\n});\n\nvar _customEvent = _interopRequireDefault(__webpack_require__(/*! custom-event */ \"./node_modules/custom-event/index.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/class/SEvent.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/core/SWebComponent.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/core/SWebComponent.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _sNativeWebComponent = _interopRequireDefault(__webpack_require__(/*! ./sNativeWebComponent */ \"./node_modules/@coffeekraken/sugar/js/core/sNativeWebComponent.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * @name \t\tSWebComponent\n * @namespace       sugar.js.core\n * @type      Class\n * @extends \tHTMLElement\n *\n * Base class that abstract a lot of dirty work in order to create nice and clean webcomponents.\n * Features:\n * - Listen for attributes changes\n * - Mount the component at a certain point in time (inViewport, visible, etc...)\n * - **Automatically cast the attributes** to their proper js variable types (Array, Object, String, etc...)\n * - **Physical props** : Specify some props that will ALWAYS be present as attribute on the component for styling purpose\n * - Define some **default CSS** that will be injected in the head automatically\n * - Specify some **required props**\n * - **Full lifecycle management**:\n * \t- componentCreated\n * \t- componentWillMount\n * \t- componentMount\n * \t- componentWillReceiveProp\n * \t- componentWillReceiveProps\n * \t- render\n * \t- componentUnmount\n * - **Mount dependencies** : This will allows you to set some promises that have to be resolved before mounting the component\n *\n * @example \tjs\n * import SWebComponent from '@coffeekraken/sugar/js/core/SWebComponent'\n * class MyCoolComponent extends SWebComponent {\n *\n *\t\\/**\n * \t * Default props\n * \t * @definition \t\tSWebComponent.defaultProps\n * \t * @protected\n * \t *\\/\n * \tstatic get defaultProps() {\n * \t\treturn {\n * \t\t};\n * \t}\n *\n * \t\\/**\n * \t * Css\n * \t * @protected\n * \t *\\/\n * \tstatic defaultCss(componentName, componentNameDash) {\n * \t\treturn `\n * \t\t\t${componentNameDash} {\n * \t\t\t\tdisplay : block;\n * \t\t\t}\n * \t\t`;\n * \t}\n *\n * \t\\/**\n * \t * Component will mount\n *  \t * @definition \t\tSWebComponent.componentWillMount\n * \t * @protected\n * \t *\\/\n * \tcomponentWillMount() {\n * \t\tsuper.componentWillMount();\n * \t}\n *\n * \t\\/**\n * \t * Mount component\n * \t * @definition \t\tSWebComponent.componentMount\n * \t * @protected\n * \t *\\/\n * \tcomponentMount() {\n * \t\tsuper.componentMount();\n * \t}\n *\n * \t\\/**\n * \t * Component unmount\n * \t * @definition \t\tSWebComponent.componentUnmount\n * \t * @protected\n * \t *\\/\n * \tcomponentUnmount() {\n * \t\tsuper.componentUnmount();\n * \t}\n *\n * \t\\/**\n * \t * Component will receive prop\n * \t * @definition \t\tSWebComponent.componentWillReceiveProp\n * \t * @protected\n * \t *\\/\n * \tcomponentWillReceiveProp(name, newVal, oldVal) {\n * \t\tswitch(name) {\n * \t\t}\n * \t}\n * }\n *\n * // define your component\n * MyCoolComponent.define('my-cool-component', MyCoolComponent);\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nclass SWebComponent extends (0, _sNativeWebComponent.default)(HTMLElement) {}\n\nexports.default = SWebComponent;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/core/SWebComponent.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/core/SWebComponentMixin.js":
/*!************************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/core/SWebComponentMixin.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! core-js/modules/es.string.replace */ \"./node_modules/core-js/modules/es.string.replace.js\");\n\n__webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _mixwith = __webpack_require__(/*! ../vendor/mixwith */ \"./node_modules/@coffeekraken/sugar/js/vendor/mixwith.js\");\n\nvar _autoCast = _interopRequireDefault(__webpack_require__(/*! ../string/autoCast */ \"./node_modules/@coffeekraken/sugar/js/string/autoCast.js\"));\n\nvar _extend2 = _interopRequireDefault(__webpack_require__(/*! lodash/extend */ \"./node_modules/lodash/extend.js\"));\n\nvar _camelize = _interopRequireDefault(__webpack_require__(/*! ../string/camelize */ \"./node_modules/@coffeekraken/sugar/js/string/camelize.js\"));\n\nvar _uncamelize = _interopRequireDefault(__webpack_require__(/*! ../string/uncamelize */ \"./node_modules/@coffeekraken/sugar/js/string/uncamelize.js\"));\n\nvar _upperFirst = _interopRequireDefault(__webpack_require__(/*! ../string/upperFirst */ \"./node_modules/@coffeekraken/sugar/js/string/upperFirst.js\"));\n\nvar _fastdom = _interopRequireDefault(__webpack_require__(/*! fastdom */ \"./node_modules/fastdom/fastdom.js\"));\n\nvar _dispatchEvent = _interopRequireDefault(__webpack_require__(/*! ../dom/dispatchEvent */ \"./node_modules/@coffeekraken/sugar/js/dom/dispatchEvent.js\"));\n\nvar _whenInViewport = _interopRequireDefault(__webpack_require__(/*! ../dom/whenInViewport */ \"./node_modules/@coffeekraken/sugar/js/dom/whenInViewport.js\"));\n\nvar _whenVisible = _interopRequireDefault(__webpack_require__(/*! ../dom/whenVisible */ \"./node_modules/@coffeekraken/sugar/js/dom/whenVisible.js\"));\n\nvar _prependChild = _interopRequireDefault(__webpack_require__(/*! ../dom/prependChild */ \"./node_modules/@coffeekraken/sugar/js/dom/prependChild.js\"));\n\nvar _propertyProxy = _interopRequireDefault(__webpack_require__(/*! ../object/propertyProxy */ \"./node_modules/@coffeekraken/sugar/js/object/propertyProxy.js\"));\n\nvar _onChange = _interopRequireDefault(__webpack_require__(/*! on-change */ \"./node_modules/on-change/index.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n__webpack_require__(/*! es6-object-assign */ \"./node_modules/es6-object-assign/index.js\").polyfill();\n\nif (!window.sugar) window.sugar = {};\nif (!window.sugar._webComponentsClasses) window.sugar._webComponentsClasses = {};\nif (!window.sugar._webComponentsDefaultProps) window.sugar._webComponentsDefaultProps = {};\nif (!window.sugar._webComponentsDefaultCss) window.sugar._webComponentsDefaultCss = {};\nconst SWebComponentMixin = (0, _mixwith.Mixin)(superclass => {\n  var _temp2;\n\n  return _temp2 = class extends superclass {\n    /**\n     * Define the new web component\n     * @param \t\t\t{String} \t\t\tname \t\tThe name of the component\n     * @param \t\t\t{Object|String} \t[componentClassOrExt=null] \tThe component class or the HTML tag to extend like \"input\", \"button\", etc...\n     * @param \t\t\t{Object|String}\t\t[ext=null] \t\tThe HTML tag to extend like \"input\", \"button\", etc...\n     * @param       {Object}          [defaultProps={}]     The default props for the webcomponents\n     */\n    static define(name, componentOrExt = null, ext = null, defaultProps = {}) {\n      const component = componentOrExt && typeof componentOrExt !== \"string\" ? componentOrExt : this;\n      const componentName = (0, _upperFirst.default)((0, _camelize.default)(name));\n      const componentNameDash = name;\n      ext = typeof componentOrExt === \"string\" ? componentOrExt : ext;\n      if (window.sugar._webComponentsClasses[componentName]) return;\n      window.sugar._webComponentsClasses[componentName] = component;\n      const tag = (0, _upperFirst.default)((0, _camelize.default)(name));\n      window.sugar._webComponentsDefaultProps[tag] = { ...(window.sugar._webComponentsDefaultProps[tag] || {}),\n        ...defaultProps\n      }; // register the webcomponent\n\n      if (window.customElements) {\n        const extendsObj = {};\n\n        if (ext) {\n          extendsObj.extends = ext;\n        }\n\n        window.customElements.define(name, component, extendsObj);\n      } else if (document.registerElement) {\n        document.registerElement(name, {\n          prototype: component.prototype,\n          extends: ext\n        });\n      } else {\n        throw `Your browser does not support either document.registerElement or window.customElements.define webcomponents specification...`;\n      } // create a proxy factory\n\n\n      const webcomponent = function (props = {}) {\n        if (ext) {\n          return document.createElement(ext, name).setProps(props);\n        }\n\n        return document.createElement(name).setProps(props);\n      }; // fix for firefox and surely other crapy browser...\n      // this make sur that the (static) methods of the component\n      // are present on the webcomponent itself\n\n\n      let staticFns = [];\n      let comp = component;\n\n      while (comp) {\n        try {\n          staticFns = staticFns.concat(Object.getOwnPropertyNames(comp).filter(prop => typeof comp[prop] === \"function\"));\n          comp = Object.getPrototypeOf(comp);\n        } catch (e) {\n          break;\n        }\n      }\n\n      const keys = staticFns.concat(Object.keys(component));\n      keys.forEach(function (key) {\n        if (!webcomponent[key]) {\n          webcomponent[key] = component[key];\n        }\n      }); // handle css\n\n      component._injectDefaultCss(component, componentName, componentNameDash); // return the webcomponent instance\n\n\n      return webcomponent;\n    }\n    /**\n     * Inject css into html\n     * @param \t\t{HTMLElement}\tcomponentClass \t\tThe component class for which to inject the base css\n     * @param \t\t{String} \t\tcomponentName \t\tThe component name\n     * @param \t\t{String} \t\tcomponentNameDash \tThe dash formated component name\n     */\n\n\n    static _injectDefaultCss(componentClass, componentName, componentNameDash) {\n      // check if component has a css to be injected into the page\n      if (window.sugar._webComponentsDefaultCss[componentName] === undefined) {\n        let css = \"\";\n        let comp = componentClass;\n\n        while (comp) {\n          if (comp.defaultCss) {\n            css += comp.defaultCss(componentName, componentNameDash);\n          }\n\n          comp = Object.getPrototypeOf(comp);\n        }\n\n        if (css) {\n          css = css.replace(/[\\s]+/g, \" \");\n          window.sugar._webComponentsDefaultCss[componentName] = css;\n          const styleElm = document.createElement(\"style\");\n          styleElm.setAttribute(\"name\", componentName);\n          styleElm.innerHTML = css;\n          (0, _prependChild.default)(styleElm, document.head);\n        } else {\n          window.sugar._webComponentsDefaultCss[componentName] = false;\n        }\n      }\n    }\n    /**\n     * Internal store for all the props of the component\n     * Props are actual computed props with attributes\n     * @type \t\t{Object}\n     */\n\n\n    /**\n     * Return the default props for the component.\n     * Need to take care of the passed props parameter and mix it at the\n     * end of your default props\n     *\n     * @type \t{Object}\n     * @example\n     * getDefaultProps(props = {}) {\n     * \t\treturn super.getDefaultProps({\n     * \t\t\tmyCoolProp : null,\n     * \t\t\t...props\n     * \t\t});\n     * }\n     *\n     * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n     */\n    static get defaultProps() {\n      return {\n        mountWhen: null,\n        mountDependencies: [],\n        unmountTimeout: 500\n      };\n    }\n    /**\n     * Set some default props for a specific component\n     * @param \t\t{Object} \t\tprops \t\t\tA props object to set\n     * @param \t\t{String} \t\t[tagname=null] \tThe tagname of the component you want to setting up\n     * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n     */\n\n\n    static setDefaultProps(props, tagname = null) {\n      // if a tagname is specified, we store the default props for a\n      // particular tagname\n      if (tagname) {\n        tagname = [].concat(tagname);\n        tagname.forEach(tag => {\n          tag = (0, _upperFirst.default)((0, _camelize.default)(tag));\n          window.sugar._webComponentsDefaultProps[tag] = { ...(window.sugar._webComponentsDefaultProps[tag] || {}),\n            ...props\n          };\n        });\n      } else {\n        const proto = this;\n        proto._defaultProps = { ...(proto._defaultProps || {}),\n          ...props\n        };\n      }\n    }\n    /**\n     * Get the default props for this particular instance\n     * @type  \t\t{Object}\n     */\n\n\n    get defaultProps() {\n      // check if default props in cache to avoid multiple time\n      // computing\n      if (this._defaultPropsCache) return this._defaultPropsCache; // compute\n\n      let props = window.sugar._webComponentsClasses[this.componentName].defaultProps;\n      let comp = window.sugar._webComponentsClasses[this.componentName];\n\n      while (comp) {\n        if (comp.defaultProps) {\n          props = { ...comp.defaultProps,\n            ...props\n          };\n        }\n\n        if (comp._defaultProps) {\n          props = { ...props,\n            ...comp._defaultProps\n          };\n        }\n\n        comp = Object.getPrototypeOf(comp);\n      } // extend with default props stored in the component default props stack by tagname\n\n\n      if (window.sugar._webComponentsDefaultProps[this.componentName]) {\n        props = { ...props,\n          ...window.sugar._webComponentsDefaultProps[this.componentName]\n        };\n      } // save in cache\n\n\n      this._defaultPropsCache = Object.assign({}, props); // return props\n\n      return props;\n    }\n    /**\n     * Return an array of props to set on the dom\n     * @return \t\t{Array}\n     */\n\n\n    static get physicalProps() {\n      return [];\n    }\n    /**\n     * Get physical props for this particular instance\n     * @return \t\t{Array} \t\t\tThe physical props array\n     */\n\n\n    get physicalProps() {\n      if (this._physicalPropsCache) return this._physicalPropsCache;\n      let props = window.sugar._webComponentsClasses[this.componentName].physicalProps;\n      let comp = window.sugar._webComponentsClasses[this.componentName];\n\n      while (comp) {\n        if (comp.physicalProps) {\n          comp.physicalProps.forEach(prop => {\n            if (props.indexOf(prop) === -1) {\n              props.push(prop);\n            }\n          });\n        }\n\n        comp = Object.getPrototypeOf(comp);\n      }\n\n      this._physicalPropsCache = props;\n      return props;\n    }\n    /**\n     * Return an array of required props to init the component\n     * @return \t\t{Array}\n     */\n\n\n    static get requiredProps() {\n      return [];\n    }\n    /**\n     * Get the required props array for this particular instance\n     * @return \t\t{Array} \t\t\tAn array of required props\n     */\n\n\n    get requiredProps() {\n      if (this._requiredPropsCache) return this._requiredPropsCache;\n      let props = window.sugar._webComponentsClasses[this.componentName].requiredProps;\n      let comp = window.sugar._webComponentsClasses[this.componentName];\n\n      while (comp) {\n        if (comp.requiredProps) {\n          comp.requiredProps.forEach(prop => {\n            if (props.indexOf(prop) === -1) {\n              props.push(prop);\n            }\n          });\n        }\n\n        comp = Object.getPrototypeOf(comp);\n      }\n\n      this._requiredPropsCache = props;\n      return props;\n    }\n    /**\n     * Default state\n     * Specify the default state object to start with. The state can be updated using the setState function and passing a new state object\n     * that will be merged inside the actual one\n     * @protected\n     */\n\n\n    static get defaultState() {\n      return {};\n    }\n    /**\n     * Get the default state for this particular instance\n     * @type  \t\t{Object}\n     * @protected\n     */\n\n\n    get defaultState() {\n      // check if default state in cache to avoid multiple time\n      // computing\n      if (this._defaultStateCache) return this._defaultStateCache; // compute\n\n      let state = window.sugar._webComponentsClasses[this.componentName].defaultState;\n      let comp = window.sugar._webComponentsClasses[this.componentName];\n\n      while (comp) {\n        if (comp.defaultState) {\n          state = { ...comp.defaultState,\n            ...state\n          };\n        }\n\n        comp = Object.getPrototypeOf(comp);\n      } // save in cache\n\n\n      this._defaultStateCache = Object.assign({}, state); // return state\n\n      return state;\n    }\n    /**\n     * Specify the default css for the component\n     * @param \t\t{String} \t\tcomponentName \t\tThe camelcase component name\n     * @param \t\t{String} \t\tcomponentNameDash \tThe dashcase component name\n     * @return \t\t{String} \t\t\t\t\t\t\tThe default css for the component\n     */\n\n\n    static defaultCss(componentName, componentNameDash) {\n      return \"\";\n    }\n    /**\n     * Get the default css of the component\n     * @type \t\t{String}\n     */\n\n\n    get defaultCss() {\n      if (this._defaultCssCache) return this._defaultCssCache;\n      let css = \"\";\n      let comp = window.sugar._webComponentsClasses[this.componentName];\n\n      while (comp) {\n        if (comp.defaultCss) {\n          css += comp.defaultCss(this.componentName, this.componentNameDash);\n        }\n\n        comp = Object.getPrototypeOf(comp);\n      }\n\n      this._defaultCssCache = css;\n      return css;\n    }\n    /**\n     * Return an array of props to set on the dom\n     * @type \t\t{Array}\n     */\n\n\n    static get mountDependencies() {\n      return [];\n    }\n    /**\n     * Get an array of promises to resolve before mounting the component.\n     * @type \t\t{Array<Promise>}\n     */\n\n\n    get mountDependencies() {\n      let deps = [];\n      let comp = window.sugar._webComponentsClasses[this.componentName];\n\n      while (comp) {\n        if (comp.mountDependencies) {\n          comp.mountDependencies.forEach(dep => {\n            if (deps.indexOf(dep) === -1) {\n              deps.push(dep);\n            }\n          });\n        }\n\n        comp = Object.getPrototypeOf(comp);\n      } // props mount dependencies\n\n\n      deps = deps.concat(this.props.mountDependencies);\n      let finalDeps = [];\n      deps.forEach(dep => {\n        if (typeof dep === \"function\") {\n          dep = dep.bind(this);\n          dep = dep();\n        }\n\n        finalDeps.push(dep);\n      });\n      return finalDeps;\n    }\n    /**\n     * Constructor\n     * @protected\n     */\n\n\n    constructor(...args) {\n      var _temp;\n\n      const self = (_temp = super(...args), _defineProperty(this, \"_props\", {}), _defineProperty(this, \"props\", {}), _temp);\n      self.init();\n      return self;\n    }\n\n    init() {\n      this.createdCallback();\n    }\n    /**\n     * When the component is created.\n     * This is called even if the component is not attached in the DOM tree\n     * @protected\n     */\n\n\n    createdCallback() {\n      // props\n      this.props = this.props || {}; // track the lifecyle\n\n      this._lifecycle = {\n        componentWillMount: false,\n        componentMount: false,\n        componentUnmount: false\n      }; // created callback\n\n      this.componentCreated();\n    }\n    /**\n     * When the element is attached in the DOM tree\n     * @protected\n     */\n\n\n    connectedCallback() {\n      // if not already passed through the created process\n      if (!this._lifecycle) this.createdCallback(); // update attached status\n\n      this._componentAttached = true; // clear the unmount timeout\n\n      clearTimeout(this._unmountTimeout); // stop here if already mounted once\n\n      if (this._lifecycle.componentMount || this._lifecycle.componentWillMount) return; // set the componentName\n\n      const sourceName = this.getAttribute(\"is\") || this.tagName.toLowerCase();\n      this.componentNameDash = this._componentNameDash = sourceName;\n      this.componentName = this._componentName = (0, _upperFirst.default)((0, _camelize.default)(sourceName)); // default props init\n\n      this._props = Object.assign({}, this.defaultProps, this._props || {}, this.props); // if we have some initial props, we set them now\n\n      if (this._initialProps) this.setProps(this._initialProps); // set the state\n\n      this._state = Object.assign({}, this.defaultState, this._state || {}, this.state || {}); // init properties proxy object\n\n      if (window.Proxy) {\n        this.props = new Proxy(this._props, {\n          set: (target, property, value) => {\n            // get the old value\n            const oldVal = target[property]; // protect against same value assignation\n\n            if (oldVal === value) return true; // apply the new value\n\n            target[property] = value; // handle the new property value\n\n            this._handleNewPropValue(property, value, oldVal); // notify the proxy that the property has been updated\n\n\n            return true;\n          },\n          get: (target, property) => {\n            // simply return the property value from the target\n            return target[property];\n          }\n        });\n      } else {\n        this.props = this._props;\n      } // init state proxy object\n\n\n      if (window.Proxy) {\n        this.state = new Proxy(this._state, {\n          set: (target, property, value) => {\n            // get the old value\n            const oldVal = target[property]; // protect against same value assignation\n\n            if (oldVal === value) return true; // apply the new value\n\n            target[property] = value; // handle the new property value\n\n            this._handleNewStateValue(property, value, oldVal); // notify the proxy that the property has been updated\n\n\n            return true;\n          },\n          get: (target, property) => {\n            // simply return the property value from the target\n            return target[property];\n          }\n        });\n      } else {\n        this.state = this._state;\n      } // listen for updates on the element itself\n      // instead of using the attributesChangedCallback\n      // cause with the attributesChangedCallback, you'll need to declare\n      // at start which attributes to listen and this behavior is not suitable\n      // for new attributes added after the component creation...\n\n\n      const observer = new MutationObserver(mutationList => {\n        const mutatedAttributes = [];\n        mutationList.forEach(mutation => {\n          if (mutatedAttributes.indexOf(mutation.attributeName) === -1) {\n            this._attributeMutationCallback(mutation.attributeName, mutation.oldValue, this.getAttribute(mutation.attributeName));\n          }\n\n          mutatedAttributes.push(mutation.attributeName);\n        });\n      });\n      observer.observe(this, {\n        attributes: true,\n        attributeOldValue: true\n      }); // internal properties\n\n      this._nextPropsStack = {};\n      this._prevPropsStack = {};\n      this._nextStateStack = {};\n      this._prevStateStack = {}; // compute props\n\n      this._initInitialAttributes(); // check the required props\n\n\n      this.requiredProps.forEach(prop => {\n        if (!this.props[prop]) {\n          throw `The \"${this.componentNameDash}\" component need the \"${prop}\" property in order to work`;\n        }\n      }); // component will mount only if part of the active document\n\n      this.componentWillMount(); // wait until dependencies are ok\n\n      this._whenMountDependenciesAreOk().then(() => {\n        // if mountWhen is a function, assuming that this function return a promise\n        if (this.props.mountWhen && typeof this.props.mountWhen === \"function\") {\n          this.props.mountWhen().then(() => {\n            // mount component\n            this._mountComponent();\n          }).catch(e => {\n            throw new Error(e);\n          });\n        } else if (this.props.mountWhen && typeof this.props.mountWhen === \"string\") {\n          // switch on the mountWhen prop\n          switch (this.props.mountWhen) {\n            case \"inViewport\":\n            case \"isInViewport\":\n              (0, _whenInViewport.default)(this).then(() => {\n                this._mountComponent();\n              });\n              break;\n\n            case \"isMouseover\":\n            case \"mouseover\":\n              this.addEventListener(\"mouseover\", this._onMouseoverComponentMount.bind(this));\n              break;\n\n            case \"isVisible\":\n            case \"visible\":\n              (0, _whenVisible.default)(this).then(() => {\n                this._mountComponent();\n              });\n              break;\n\n            default:\n              // mount component directly\n              this._mountComponent();\n\n              break;\n          }\n        } else {\n          // mount directly\n          this._mountComponent();\n        }\n      });\n    }\n\n    attachedCallback() {\n      this.connectedCallback();\n    }\n    /**\n     * When any of the component attribute changes\n     * @param \t\t{String} \t\tattribute \t\tThe attribute name that has changed\n     * @param \t\t{String}\t\toldVal \t\t\tThe previous attribute value\n     * @param \t\t{String} \t\tnewVal \t\t\tThe new attribute value\n     * @protected\n     */\n\n\n    _attributeMutationCallback(attribute, oldVal, newVal) {\n      // stop if the attribute has not changed\n      if (oldVal === newVal) return; // keep an original attribute name\n\n      const _attribute = attribute; // process the attribute to camelCase\n\n      attribute = (0, _camelize.default)(attribute); // if the property is not a real property\n\n      if (!this.shouldComponentAcceptProp(attribute)) return; // cast the new val\n\n      newVal = (0, _autoCast.default)(newVal); // handle the case when newVal is undefined (added attribute whithout any value)\n\n      if ((newVal === undefined || newVal === null || newVal === \"\") && this.hasAttribute(_attribute)) {\n        newVal = true;\n      } else if (newVal === null && !this.hasAttribute(_attribute) && this.props[attribute] === false) {\n        // the attribute has been removed and\n        // the prop is already to false\n        return;\n      } // do nothing if the value is already the same\n\n\n      if (this.props[attribute] === newVal) return; // set the new prop\n\n      this.setProp(attribute, newVal);\n    }\n    /**\n     * Called directly when the component is created. This act like a constructor.\n     *\n     * @example\n     * componentCreated() {\n     * \t\t// call parent method\n     * \t\tsuper.componentCreated();\n     * \t\t// do something here...\n     * }\n     *\n     * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n     */\n\n\n    componentCreated() {}\n    /**\n     * Method called before the component will actually mount and BEFORE the the mountDependencies to be resolved or not.\n     * This is a good place to do directl when the component is attached in the DOM but before any dependencies are resolved\n     *\n     * @example\n     * componentWillMount() {\n     * \t\t// call parent method\n     * \t\tsuper.componentWillMount();\n     * \t\t// do something here...\n     * }\n     *\n     * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n     */\n\n\n    componentWillMount() {\n      // protect from mounting multiple times when unecessary\n      if (this._lifecycle.componentWillMount) return; // update lifecycle state\n\n      this._lifecycle.componentWillMount = true;\n    }\n    /**\n     * Method called right after that the component has been added in the dom,\n     * after and only if the mountDependencies are resolved\n     * and before the initial render.\n     *\n     * @example\n     * componentMount() {\n     * \t\t// call parent method\n     * \t\tsuper.componentMount();\n     * \t\t// do something here...\n     * }\n     *\n     * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n     */\n\n\n    componentMount() {\n      if (this._lifecycle.componentMount) return; // update the lifecycle state\n\n      this._lifecycle.componentMount = true; // mark the component as mounted\n\n      this.setAttribute(\"mounted\", true);\n    }\n    /**\n     * Apply all the updated that you need in the dom for the component to reflect the props\n     *\n     * @example\n     * render() {\n     * \t\t// call the parent method\n     * \t\tsuper.render();\n     * \t\t// apply some classes, properties, styles, etc... in the dom\n     * \t\t// in order to reflect the props object state\n     * }\n     *\n     * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n     */\n\n\n    render() {}\n    /**\n     * Method called when the component need to unmount itself cause it has been removed from the DOM tree and the props.unmountTimeout is passed.\n     *\n     * @example\n     * componentUnmount() {\n     * \t\t// call parent method\n     * \t\tsuper.componentUnmount();\n     * \t\t// do something here...\n     * }\n     *\n     * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n     */\n\n\n    componentUnmount() {\n      if (this._lifecycle.componentUnmount) return; // update lifecycle state\n\n      this._lifecycle.componentUnmount = true; // remove the component mounted attribute\n\n      this.removeAttribute(\"mounted\");\n    }\n    /**\n     * Check all the mountDependencies and try to resolve them.\n     * @return \t\t\t{Promise} \t\t\t\tA promise that will be resolved when the dependencies are resolved\n     */\n\n\n    _whenMountDependenciesAreOk() {\n      const promise = new Promise((resolve, reject) => {\n        const deps = this.mountDependencies;\n\n        if (!deps.length) {\n          resolve();\n        } else {\n          // resolve all the promises\n          Promise.all(deps).then(() => {\n            resolve();\n          });\n        }\n      });\n      return promise;\n    }\n    /**\n     * On mouse over\n     */\n\n\n    _onMouseoverComponentMount() {\n      this._mountComponent();\n\n      this.removeEventListener(\"mouseover\", this._onMouseoverComponentMount);\n    }\n    /**\n     * Internal mount component method\n     */\n\n\n    _mountComponent() {\n      // wait next frame\n      _fastdom.default.clear(this._fastDomFirstRenderTimeout);\n\n      this._fastDomFirstRenderTimeout = this.mutate(() => {\n        // sometimes, the component has been unmounted between the\n        // fastdom execution, so we stop here if it's the case\n        if (!this._componentAttached) return; // init\n\n        this.componentMount(); // render\n\n        this.render();\n      });\n    }\n    /**\n     * Detect when the component is detached from the DOM tree.\n     * @protected\n     */\n\n\n    disconnectedCallback() {\n      // update attached status\n      this._componentAttached = false; // unmount timeout\n\n      clearTimeout(this._unmountTimeout);\n      this._unmountTimeout = setTimeout(() => {\n        // wait next frame\n        _fastdom.default.clear(this._fastdomSetProp);\n\n        this._fastdomSetProp = this.mutate(() => {\n          // unmount only if the component is mounted\n          if (!this._lifecycle.componentMount) return; // unmount\n\n          this.componentUnmount(); // update lifecycle\n\n          this._lifecycle.componentMount = false;\n        });\n      }, this.props.unmountTimeout);\n    }\n\n    detachedCallback() {\n      this.disconnectedCallback();\n    }\n    /**\n     * Dispatch an event from the tag with namespaced event name\n     * This will dispatch actually two events :\n     * 1. {tagName}.{name} : example : s-datepicker.change\n     * 2. {name} \t\t   : example : change\n     *\n     * @param\t\t{String} \t\tname \t\tThe event name\n     * @param \t\t{Mixed} \t\tdata \t\tSome data to attach to the event\n     */\n\n\n    dispatchComponentEvent(name, data = null, fromElm = this) {\n      (0, _dispatchEvent.default)(fromElm, name, data);\n      (0, _dispatchEvent.default)(fromElm, `${this.tagName.toLowerCase()}.${name}`, data);\n    }\n    /**\n     * Set a bunch of properties at once\n     * @param \t\t\t{Object} \t\t[props={}] \t\tAn object of props to set\n     */\n\n\n    setProps(props = {}) {\n      // set each props\n      for (let key in props) {\n        this.setProp(key, props[key]);\n      } // return the component\n\n\n      return this;\n    }\n    /**\n     * Set a property\n     * @param \t\t\t{String} \t\tprop \t\t\tThe property name to set\n     * @param \t\t\t{Mixed} \t\tvalue \t\t\tThe new property value\n     */\n\n\n    setProp(prop, value, set = true) {\n      // if the component is not attached to the dom, we don't have the props etc\n      // so we save them inside an object that we will merge later in the props\n      if (!this._componentAttached) {\n        if (!this._initialProps) this._initialProps = {};\n        this._initialProps[prop] = value;\n        return;\n      } // save the oldVal\n\n\n      const oldVal = this.props[prop]; // stop if same value\n\n      if (oldVal === value) return; // set the prop\n\n      this._props[prop] = value; // handle new value\n\n      this._handleNewPropValue(prop, value, oldVal); // return the component\n\n\n      return this;\n    }\n    /**\n     * Get a property\n     * @param \t\t{String} \t\tprop \t\t\tThe property name to get\n     * @return \t\t{Mixed} \t\t\t\t\t\tThe property value or null\n     */\n\n\n    getProp(prop) {\n      return this.props[prop];\n    }\n    /**\n     * Handle new property\n     * @param \t\t{String} \t\tprop \t\tThe property name\n     * @param \t\t{Mixed} \t\tnewVal \t\tThe new property value\n     * @param \t\t{Mixed}\t\t\toldVal \t\tThe old property value\n     */\n\n\n    _handleNewPropValue(prop, newVal, oldVal) {\n      // if the component is not mounted\n      // we do nothing here...\n      if (!this.isComponentMounted()) return; // create the stacks\n\n      this._prevPropsStack[prop] = oldVal;\n      this._nextPropsStack[prop] = newVal; // component will receive prop\n\n      this.componentWillReceiveProp(prop, newVal, oldVal); // wait till next frame\n\n      _fastdom.default.clear(this._fastdomSetProp);\n\n      this._fastdomSetProp = _fastdom.default.mutate(() => {\n        // create array version of each stacks\n        const nextPropsArray = [];\n\n        for (let key in this._nextPropsStack) {\n          const val = this._nextPropsStack[key];\n          nextPropsArray.push({\n            name: key,\n            value: val\n          }); // handle physical props\n\n          this._handlePhysicalProp(key, val);\n        } // call the will reveiveProps if exist\n\n\n        if (this.componentWillReceiveProps) {\n          this.componentWillReceiveProps(this._nextPropsStack, nextPropsArray);\n        } // should component update\n\n\n        if (this.shouldComponentUpdate && !this.shouldComponentUpdate(this._nextPropsStack, this._prevPropsStack, this._nextStateStack, this._prevStateStack)) return; // render the component\n\n        this.render();\n      });\n    }\n    /**\n     * Set a new state\n     * @param    {Object}    newState    The new state to merge with the actual one\n     * @return    {Object}    The new state computed\n     */\n\n\n    setState(newState) {\n      // update the state\n      for (const key in newState) {\n        this.setStateValue(key, newState[key]);\n      }\n    }\n    /**\n     * Set a property\n     * @param \t\t\t{String} \t\tprop \t\t\tThe property name to set\n     * @param \t\t\t{Mixed} \t\tvalue \t\t\tThe new property value\n     */\n\n\n    setStateValue(prop, value, set = true) {\n      // if the component is not attached to the dom, we don't have the props etc\n      // so we save them inside an object that we will merge later in the props\n      if (!this._componentAttached) {\n        if (!this._initialState) this._initialState = {};\n        this._initialState[prop] = value;\n        return;\n      } // save the oldVal\n\n\n      const oldVal = this.state[prop]; // stop if same value\n\n      if (oldVal === value) return; // set the prop\n\n      this._state[prop] = value; // handle new value\n\n      this._handleNewStateValue(prop, value, oldVal); // return the component\n\n\n      return this;\n    }\n    /**\n     * Get a state property\n     * @param    {String}    [prop=null]    The state property to retrieve\n     * @return    {Mixed}    The requested state value or the full state object\n     */\n\n\n    getState(prop = null) {\n      // return the full state object if no prop requested\n      if (!prop) return this.state; // return the requested state prop\n\n      return this.state[prop];\n    }\n    /**\n     * Handle new property\n     * @param \t\t{String} \t\tprop \t\tThe property name\n     * @param \t\t{Mixed} \t\tnewVal \t\tThe new property value\n     * @param \t\t{Mixed}\t\t\toldVal \t\tThe old property value\n     */\n\n\n    _handleNewStateValue(prop, newVal, oldVal) {\n      // if the component is not mounted\n      // we do nothing here...\n      if (!this.isComponentMounted()) return; // create the stacks\n\n      this._prevStateStack[prop] = oldVal;\n      this._nextStateStack[prop] = newVal; // wait till next frame\n\n      _fastdom.default.clear(this._fastDomNewStateTimeout);\n\n      this._fastDomNewStateTimeout = _fastdom.default.mutate(() => {\n        // should component update\n        if (this.shouldComponentUpdate && !this.shouldComponentUpdate(this._nextPropsStack, this._prevPropsStack, this._nextStateStack, this._prevStateStack)) return; // render the component\n\n        this.render();\n      });\n    }\n    /**\n     * Get the previous props stack\n     * @return    {Object}    The previous props stack\n     */\n\n\n    getPreviousPropsStack() {\n      return this._prevPropsStack;\n    }\n    /**\n     * Get the next props stack\n     * @return    {Object}    The next props stack\n     */\n\n\n    getNextPropsStack() {\n      return this._nextPropsStack;\n    }\n    /**\n     * Method called when the component will receive new props\n     * @param \t\t{String} \t\tprop \t\tThe property name\n     * @param \t\t{Mixed} \t\tnewVal \t\tThe new property value\n     * @param \t\t{Mixed}\t\t\toldVal \t\tThe old property value\n     * @example \tjs\n     * componentWillReceiveProp(prop, newVal, oldVal) {\n     *  \tswitch(prop) {\n     *  \t\tcase ...\n     *    \t\t\t// do something...\n     * \t\t\tbreak;\n     *  \t}\n     * }\n     *\n     * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n     */\n\n\n    componentWillReceiveProp(prop, newVal, oldVal) {} // do something\n\n    /**\n     * Method that check if a property passed to the component has to be accepted or not.\n     * @param \t\t{String} \t\t\tprop \t\tThe property name\n     * @return \t\t{Boolean} \t\t\t\t\t\tIf true, the property will be accepted, if false, it will not be considered as a property\n     */\n\n\n    shouldComponentAcceptProp(prop) {\n      return this.props[prop] !== undefined;\n    }\n    /**\n     * Check if component is mounted\n     * @return \t\t\t{Boolean} \t\t\ttrue if mounted, false if not\n     */\n\n\n    isComponentMounted() {\n      return this._lifecycle.componentMount;\n    }\n    /**\n     * Handle physical props by setting or not the prop\n     * on the dom element as attribute\n     * @param \t\t\t{String} \t\t\tprop \t\t\tThe property to handle\n     * @param \t\t\t{Mixed} \t\t\tvalue \t\t\tThe property value\n     * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n     */\n\n\n    _handlePhysicalProp(prop, value) {\n      // check if is a physical prop to set it in the dom\n      const physicalProps = this.physicalProps;\n\n      if (physicalProps.indexOf(prop) !== -1) {\n        // set the prop on the node\n        if (value !== 0 && (value === false || value === \"null\" || !value)) {\n          this.removeAttribute((0, _uncamelize.default)(prop));\n        } else if (typeof value === \"object\") {\n          this.setAttribute((0, _uncamelize.default)(prop), JSON.stringify(value));\n        } else if (typeof value === \"function\") {\n          this.setAttribute((0, _uncamelize.default)(prop), \"fn\");\n        } else {\n          this.setAttribute((0, _uncamelize.default)(prop), value);\n        }\n      }\n    }\n    /**\n     * Compute props by mixing settings with attributes presents on the component\n     */\n\n\n    _initInitialAttributes() {\n      for (let i = 0; i < this.attributes.length; i++) {\n        const attr = this.attributes[i];\n        const attrCamelName = (0, _camelize.default)(attr.name); // do not set if it's not an existing prop\n\n        if (!this.shouldComponentAcceptProp(attrCamelName)) continue; // the attribute has no value but it is present\n        // so we assume the prop value is true\n\n        if (!attr.value) {\n          this._props[attrCamelName] = true;\n          continue;\n        } // cast the value\n\n\n        this._props[attrCamelName] = (0, _autoCast.default)(attr.value);\n      } // handle physicalProps\n\n\n      for (let key in this.props) {\n        const value = this.props[key]; // handle physical props\n\n        this._handlePhysicalProp(key, value);\n      }\n    }\n    /**\n     * Mutate the dom using an optimize requestAnimationFrame technique\n     * @param \t\t{Function} \t\tcb \t\t\tThe callback to exexute\n     */\n\n\n    mutate(cb) {\n      return _fastdom.default.mutate(cb);\n    }\n    /**\n     * Set a class that will be construct with the componentNameDash,\n     * an optional element and modifier\n     * @param \t{String} \t[element=null] \t\tThe element name\n     * @param \t{String} \t[modifier=null] \tThe modifier name\n     * @param \t{String} \t[state=null] \t\tThe state name\n     * @return \t{String} \t\t\t\t\t\tThe generated class\n     */\n\n\n    componentClassName(element = null, modifier = null, state = null) {\n      // if the method is BEM\n      let sel = this.componentNameDash;\n\n      if (element) {\n        sel += `__${element}`;\n      }\n\n      if (modifier) {\n        sel += `--${modifier}`;\n      }\n\n      if (state) {\n        sel += `--${state}`;\n      }\n\n      return sel;\n    }\n    /**\n     * Get a component selector class built with the passed element, modifier and state parameters\n     * @param \t{String} \t[element=null] \t\tThe element name\n     * @param \t{String} \t[modifier=null] \tThe modifier name\n     * @param \t{String} \t[state=null] \t\tThe state name\n     * @return \t{String} \t\t\t\t\t\tThe generated class\n     */\n\n\n    componentSelector(element = null, modifier = null, state = null) {\n      let sel = this.componentClassName(element, modifier, state);\n      sel = `.${sel}`.replace(\" \", \".\");\n      return sel;\n    }\n    /**\n     * Check if the passed element has the component class generated by the element and modifier argument\n     * @param \t{HTMLElement} \telm \t\t\t\tThe element to check\n     * @param \t{String} \t\t[element=null] \t\tThe element name\n     * @param \t{String} \t\t[modifier=null] \tThe modifier name\n     * @param \t{String} \t\t[state=null] \t\tThe state name\n     * @return \t{Boolean} \t\t\t\t\t\t\tThe check result\n     */\n\n\n    hasComponentClass(elm, element = null, modifier = null, state = null) {\n      // generate the class\n      const cls = this.componentSelector(element, modifier, state);\n\n      const _cls = cls.split(\".\");\n\n      for (let i = 0; i < _cls.length; i++) {\n        const cl = _cls[i];\n\n        if (cl && cl !== \"\") {\n          if (!elm.classList.contains(cl)) {\n            return false;\n          }\n        }\n      }\n\n      return true;\n    }\n    /**\n     * Add a class on the passed element that will be construct with the componentNameDash,\n     * an optional element, modifier and state\n     * @param \t{String} \t[element=null] \t\tThe element name\n     * @param \t{String} \t[modifier=null] \tThe modifier name\n     * @param \t{String} \t[state=null] \t\tThe state name\n     * @return \t{SComponent}} \t\t\tThe component itself\n     */\n\n\n    addComponentClass(elm, element = null, modifier = null, state = null) {\n      // if is an array\n      if (elm instanceof Array || elm instanceof NodeList) {\n        [].forEach.call(elm, el => {\n          this.addComponentClass(el, element, modifier, state);\n        });\n        return this;\n      } // get the component class\n\n\n      let cls = this.componentSelector(element, modifier, state); // loop on each classes to add\n\n      cls.split(\".\").forEach(cl => {\n        if (cl && cl !== \"\") {\n          this.mutate(() => {\n            elm.classList.add(cl);\n          });\n        }\n      }); // return the instance to maintain chainability\n\n      return this;\n    }\n    /**\n     * Remove a class on the passed element that will be construct with the componentNameDash,\n     * an optional element, modifier and state\n     * @param \t{String} \t[element=null] \t\tThe element name\n     * @param \t{String} \t[modifier=null] \tThe modifier name\n     * @param \t{String} \t[state=null] \t\tThe state name\n     * @return \t{SComponent}} \t\t\t\t\tThe component itself\n     */\n\n\n    removeComponentClass(elm, element = null, modifier = null, state = null) {\n      // if is an array\n      if (elm instanceof Array || elm instanceof NodeList) {\n        [].forEach.call(elm, el => {\n          this.removeComponentClass(el, element, modifier, state);\n        });\n        return this;\n      } // get the component class\n\n\n      let cls = this.componentSelector(element, modifier, state); // loop on each classes to add\n\n      cls.split(\".\").forEach(cl => {\n        if (cl && cl !== \"\") {\n          this.mutate(() => {\n            elm.classList.remove(cl);\n          });\n        }\n      }); // return the instance to maintain chainability\n\n      return this;\n    }\n\n  }, _temp2;\n}); // Export the mixin class\n\nvar _default = SWebComponentMixin;\nexports.default = _default;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/core/SWebComponentMixin.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/core/sNativeWebComponent.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/core/sNativeWebComponent.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = sNativeWebComponent;\n\n__webpack_require__(/*! document-register-element */ \"./node_modules/document-register-element/build/document-register-element.js\");\n\n__webpack_require__(/*! @ungap/custom-elements-builtin */ \"./node_modules/@ungap/custom-elements-builtin/esm/index.js\");\n\nvar _mixwith = __webpack_require__(/*! ../vendor/mixwith */ \"./node_modules/@coffeekraken/sugar/js/vendor/mixwith.js\");\n\nvar _SWebComponentMixin = _interopRequireDefault(__webpack_require__(/*! ./SWebComponentMixin */ \"./node_modules/@coffeekraken/sugar/js/core/SWebComponentMixin.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * @name    sNativeWebComponent\n * @namespace     sugar.js.core\n * @type      Function\n *\n * Extend a native web element to create a new web component\n *\n * @param       {HTMLElement}       HTMLElementToExtend         The HTML element to use as web component base\n * @return      {Class}                                         The extended base class to create the new web component with\n *\n * @example     js\n * import native from \"@coffeekraken/sugar/js/core/sNativeWebComponent\";\n * export default class MyCoolComponent extends native(HTMLVideoElement) {\n *    // your component integration...\n * }\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nconst extendsStack = {};\n\nfunction sNativeWebComponent(HTMLElementToExtend) {\n  HTMLElementToExtend = function (OriginalHTMLElement) {\n    if (!window[OriginalHTMLElement.name]) return OriginalHTMLElement;\n    if (extendsStack[OriginalHTMLElement.name]) return extendsStack[OriginalHTMLElement.name];\n\n    function BabelHTMLElement() {\n      const newTarget = this.__proto__.constructor;\n      return Reflect.construct(OriginalHTMLElement, [], newTarget);\n    }\n\n    Object.setPrototypeOf(BabelHTMLElement, OriginalHTMLElement);\n    Object.setPrototypeOf(BabelHTMLElement.prototype, OriginalHTMLElement.prototype);\n    extendsStack[HTMLElementToExtend.name] = BabelHTMLElement;\n    return BabelHTMLElement;\n  }(HTMLElementToExtend);\n\n  return (0, _mixwith.mix)(HTMLElementToExtend).with(_SWebComponentMixin.default);\n}\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/core/sNativeWebComponent.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/dom/closest.js":
/*!************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/dom/closest.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = closest;\n\nvar _matches = _interopRequireDefault(__webpack_require__(/*! ./matches */ \"./node_modules/@coffeekraken/sugar/js/dom/matches.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * @name        closest\n * @namespace       sugar.js.dom\n * @type      Function\n *\n * Go up the dom three to find the first element that matches the passed selector\n *\n * @param \t\t{HTMLElement} \t\t\t\t\telm  \t\tThe element to start on\n * @param \t\t{String|Function} \t\t\t\tselector \tA css selector to search for or a check function that will be used\n * @return \t\t{HTMLElement} \t\t\t\t\t\t\t\tThe element found or null\n *\n * @example  \tjs\n * import closest from 'sugarcss/js/dom/closest'\n * const closestElm = closest(myCoolElement, '.my-cool-class');\n * if (closestElm) {\n * \t\t// we have found en element that matches the selector\n * }\n * // the selector param can be a function that need to return either true or false like so:\n * closest(myCoolElement, (elm) => {\n *   return elm.hasAttribute('my-cool-attribute')\n * })\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nfunction closest(elm, selector) {\n  const originalElm = elm;\n  elm = elm.parentNode;\n\n  while (elm && elm != originalElm.ownerDocument) {\n    if (typeof selector === \"function\") {\n      if (selector(elm)) return elm;\n    } else if (typeof selector === \"string\" && (0, _matches.default)(elm, selector)) {\n      return elm;\n    }\n\n    elm = elm.parentNode;\n  }\n\n  return null;\n}\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/dom/closest.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/dom/closestNotVisible.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/dom/closestNotVisible.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = closestNotVisible;\n\nvar _isVisible = _interopRequireDefault(__webpack_require__(/*! ./isVisible */ \"./node_modules/@coffeekraken/sugar/js/dom/isVisible.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * @name        closestNotVisible\n * @namespace       sugar.js.dom\n * @type      Function\n *\n * Go up the dom three to find the first element that is not visible.\n * Not visible mean that has either an opacity to 0, a visibility to hidden or a display to none\n *\n * @param \t\t{HTMLElement} \t\t\t\t\telm  \t\tThe element to start on\n * @return \t\t{HTMLElement} \t\t\t\t\t\t\t\tThe element found or null\n *\n * @example  \tjs\n * import closestNotVisible from 'sugarcss/js/dom/closestNotVisible'\n * const closestElm = closestNotVisible(myCoolElement);\n * if (closestElm) {\n * \t\t// we have found en element that is not visible\n * }\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nfunction closestNotVisible(elm) {\n  const originalElm = elm;\n  elm = elm.parentNode;\n\n  while (elm && elm != originalElm.ownerDocument) {\n    if (!(0, _isVisible.default)(elm)) {\n      return elm;\n    }\n\n    elm = elm.parentNode;\n  }\n\n  return null;\n}\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/dom/closestNotVisible.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/dom/dispatchEvent.js":
/*!******************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/dom/dispatchEvent.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = dispatchEvent;\n\nvar _SEvent = _interopRequireDefault(__webpack_require__(/*! ../class/SEvent */ \"./node_modules/@coffeekraken/sugar/js/class/SEvent.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * @name      dispatchEvent\n * @namespace     sugar.js.dom\n * @type      Function\n *\n * Helper to quickly display an event with some optional data attached to it\n *\n * @param \t\t{HTMLElement} \t\t\t\t\ttarget  \t\tThe element to dispatch the event from\n * @param \t\t{String} \t\t\t\t\t\tname \t\t\tThe event name to dispatch\n * @param \t\t{Mixed} \t\t\t\t\t\tdata \t\t\tThe data to attache to the event\n *\n * @example  \tjs\n * import dispatchEvent from '@coffeekraken/sugar/js/dom/dispatchEvent'\n * dispatchEvent(myCoolHTMLElement, 'myCoolEventName', {\n * \t\tvar1 : 'value1'\n * });\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nfunction dispatchEvent(target, name, data = null) {\n  // create new event\n  const e = new _SEvent.default(name, {\n    detail: data,\n    bubbles: true,\n    cancelable: true\n  });\n  target.dispatchEvent(e);\n}\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/dom/dispatchEvent.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/dom/isInViewport.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/dom/isInViewport.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = isInViewport;\n\n/**\n * @name      isInViewport\n * @namespace     sugar.js.dom\n * @type      Function\n *\n * Check if the passed HTMLElement is in the viewport or not\n *\n * @param \t\t{HTMLElement} \t\t\t\telm  \t\t\tThe element to insert\n * @param \t\t{Object} \t\t\t\t\t[offset=50] \tAn object of top, right, bottom and left offset used to detect the status or an object with top, right, bottom and left offsets\n * @return \t\t{Boolean\t\t\t\t\t\t\t\t\tIf the element is in the viewport or not\n *\n * @example  \tjs\n * import isInViewport from '@coffeekraken/sugar/js/dom/isInViewport'\n * if (isInViewport(myCoolHTMLElement) {\n * \t\t// i'm in the viewport\n * }\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nfunction isInViewport(elm, offset = 50) {\n  // handle offset\n  let offsetTop = offset;\n  let offsetRight = offset;\n  let offsetBottom = offset;\n  let offsetLeft = offset;\n\n  if (typeof offset === \"object\") {\n    offsetTop = offset.top || 0;\n    offsetRight = offset.right || 0;\n    offsetBottom = offset.bottom || 0;\n    offsetLeft = offset.left || 0;\n  }\n\n  const containerHeight = window.innerHeight || document.documentElement.clientHeight;\n  const containerWidth = window.innerWidth || document.documentElement.clientWidth;\n  const rect = elm.getBoundingClientRect();\n  const isTopIn = rect.top - containerHeight - offsetBottom <= 0;\n  const isBottomIn = rect.bottom - offsetTop >= 0;\n  const isLeftIn = rect.left - containerWidth - offsetRight <= 0;\n  const isRightIn = rect.right - offsetLeft >= 0;\n  return isTopIn && isBottomIn && isLeftIn && isRightIn;\n}\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/dom/isInViewport.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/dom/isVisible.js":
/*!**************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/dom/isVisible.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = isVisible;\n\n/**\n * @name      isVisible\n * @namespace     sugar.js.dom\n * @type      Function\n *\n * Check if the passed HTMLElement is visible or not.\n * Visible mean that it has not an opacity of 0, not a visibility of hidden and not a display of none\n *\n * @param \t\t{HTMLElement} \t\t\t\telm  \t\tThe element to check\n * @return \t\t{Boolean}\t\t\t\t\t\t\t\tIf the element is visible or not\n *\n * @example  \tjs\n * import isVisible from '@coffeekraken/sugar/js/dom/isVisible'\n * if (isVisible(myCoolHTMLElement) {\n * \t\t// i'm visible\n * }\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nfunction isVisible(elm) {\n  // assume that the script tag is always visible\n  if (elm.nodeName.toLowerCase() === \"script\") return true; // if no offset parent\n  // mean that the element is not visible\n  // if (elm.offsetParent === null) return false;\n  // get style\n\n  const style = window.getComputedStyle(elm, null),\n        opacity = style[\"opacity\"],\n        visibility = style[\"visibility\"],\n        display = style[\"display\"];\n  return \"0\" !== opacity && \"none\" !== display && \"hidden\" !== visibility;\n}\n\nwindow.__isVisible = isVisible;\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/dom/isVisible.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/dom/matches.js":
/*!************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/dom/matches.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = matches;\n\n/**\n * @name      matches\n * @namespace     sugar.js.dom\n * @type      Function\n *\n * Polyfill for the Element.matches function\n *\n * @param \t\t{HTMLElement} \t\t\telm  \t\t\tThe element to check\n * @param \t\t{String} \t\t\t\tselector \t\tThe selector to check on the element\n * @return \t\t{Boolean} \t\t\t\t\t\t\t\tIf the element match the selector or not\n *\n * @example  \tjs\n * import matches from '@coffeekraken/sugar/js/dom/matches'\n * if (matches(myCoolHTMLElement, '.my-cool-css-selector')) {\n * \t\t// the element match the selector\n * }\n *\n * @see \t\thttps://developer.mozilla.org/en/docs/Web/API/Element/matches\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nfunction matches(el, selector) {\n  if (el.nodeName == \"#comment\" || el.nodeName == \"#text\") {\n    return false;\n  }\n\n  var p = Element.prototype;\n\n  var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {\n    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;\n  };\n\n  return f.call(el, selector);\n}\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/dom/matches.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/dom/prependChild.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/dom/prependChild.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = prependChild;\n\n/**\n * @name      prependChild\n * @namespace     sugar.js.dom\n * @type      Function\n *\n * Prepend an HTMLElement into another HTMLElement\n *\n * @param \t\t{HTMLElement} \t\t\t\telm  \t\tThe element to prepend\n * @param \t\t{HTMLElement} \t\t\t\trefElm \t\tThe element in which to prepend the new element\n *\n * @example  \tjs\n * import prependChild from '@coffeekraken/sugar/js/dom/prependChild'\n * prependChild(myElementToInsert, theReferenceElement);\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nfunction prependChild(elm, refElm) {\n  if (!refElm.firstChild) {\n    refElm.appendChild(elm);\n  } else {\n    refElm.insertBefore(elm, refElm.firstChild);\n  }\n}\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/dom/prependChild.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/dom/whenInViewport.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/dom/whenInViewport.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = whenInViewport;\n\nvar _whenVisible = _interopRequireDefault(__webpack_require__(/*! ./whenVisible */ \"./node_modules/@coffeekraken/sugar/js/dom/whenVisible.js\"));\n\nvar _isInViewport = _interopRequireDefault(__webpack_require__(/*! ./isInViewport */ \"./node_modules/@coffeekraken/sugar/js/dom/isInViewport.js\"));\n\nvar _throttle = _interopRequireDefault(__webpack_require__(/*! ../function/throttle */ \"./node_modules/@coffeekraken/sugar/js/function/throttle.js\"));\n\nvar _closest = _interopRequireDefault(__webpack_require__(/*! ./closest */ \"./node_modules/@coffeekraken/sugar/js/dom/closest.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * @name      whenInViewport\n * @namespace     sugar.js.dom\n * @type      Function\n *\n * Monitor an HTMLElement to be notified when it is in the viewport\n *\n * @param \t\t{HTMLElement} \t\t\t\telm \t\t\t\t\tThe element to monitor\n * @param \t\t{Number} \t\t\t\t\t[offset=50] \t\t\tAn offset that represent the distance before entering the viewport for the detection\n * @return \t\t(Promise) \t\t\t\t\t\t\t\t\t\t\tThe promise that will be resolved when the element is in the viewport\n *\n * @example \tjs\n * import whenInViewport from '@coffeekraken/sugar/js/dom/whenInViewport'\n * whenInViewport(myCoolHTMLElement).then((elm) => {\n * \t\t// do something with your element that has entered the viewport...\n * });\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nfunction whenInViewport(elm, offset = 50) {\n  return new Promise((resolve, reject) => {\n    if (window.IntersectionObserver) {\n      let isInViewport = false,\n          isVisible = false,\n          _cb = () => {\n        if (isVisible && isInViewport) {\n          observer.disconnect();\n          resolve(elm);\n        }\n      };\n\n      const observer = new IntersectionObserver((entries, observer) => {\n        if (!entries.length) return;\n        const entry = entries[0];\n\n        if (entry.intersectionRatio > 0) {\n          isInViewport = true;\n        } else {\n          isInViewport = false;\n        }\n\n        _cb();\n      }, {\n        root: null,\n        // viewport\n        rootMargin: `${offset}px`,\n        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]\n      });\n      observer.observe(elm); // detect when visible\n\n      (0, _whenVisible.default)(elm).then(elm => {\n        isVisible = true;\n\n        _cb();\n      });\n    } else {\n      // try to get the closest element that has an overflow\n      let scrollContainerElm = document;\n\n      if (!elm._inViewportContainer) {\n        const overflowContainer = (0, _closest.default)(elm, \"[data-in-viewport-container]\");\n\n        if (overflowContainer) {\n          scrollContainerElm = overflowContainer;\n          elm._inViewportContainer = overflowContainer;\n        }\n      } else {\n        scrollContainerElm = elm._inViewportContainer;\n      }\n\n      let isInViewport = false,\n          isVisible = false,\n          _cb = () => {\n        if (isVisible && isInViewport) {\n          scrollContainerElm.removeEventListener(\"scroll\", checkViewport);\n          window.removeEventListener(\"resize\", checkViewport);\n          resolve(elm);\n        }\n      };\n\n      let checkViewport = (0, _throttle.default)(e => {\n        isInViewport = (0, _isInViewport.default)(elm, offset);\n\n        _cb();\n      }, 100); // detect when visible\n\n      (0, _whenVisible.default)(elm).then(elm => {\n        isVisible = true;\n\n        _cb();\n      }); // listen for resize\n\n      scrollContainerElm.addEventListener(\"scroll\", checkViewport);\n      window.addEventListener(\"resize\", checkViewport);\n      setTimeout(() => {\n        checkViewport(null);\n      });\n    }\n  });\n}\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/dom/whenInViewport.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/dom/whenVisible.js":
/*!****************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/dom/whenVisible.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = whenVisible;\n\nvar _isVisible = _interopRequireDefault(__webpack_require__(/*! ./isVisible */ \"./node_modules/@coffeekraken/sugar/js/dom/isVisible.js\"));\n\nvar _closestNotVisible = _interopRequireDefault(__webpack_require__(/*! ./closestNotVisible */ \"./node_modules/@coffeekraken/sugar/js/dom/closestNotVisible.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * @name      whenVisible\n * @namespace     sugar.js.dom\n * @type      Function\n *\n * Monitor an HTMLElement to be notified when it is visible\n *\n * @param \t\t{HTMLElement} \t\t\t\telm \t\tThe element to monitor\n * @param \t\t{Function} \t\t\t\t\t[cb=null] \tAn optional callback to call when the element is visible\n * @return \t\t(Promise) \t\t\t\t\t\t\t\tThe promise that will be resolved when the element is visible\n *\n * @example \tjs\n * import whenVisible from '@coffeekraken/sugar/js/dom/whenVisible'\n * whenVisible(myCoolHTMLElement).then((elm) => {\n * \t\t// do something with your element that is now visible\n * });\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nfunction whenVisible(elm, cb = null) {\n  return new Promise((resolve, reject) => {\n    // variables\n    let isSelfVisible = false,\n        areParentsVisible = false,\n        closestNotVisible = null,\n        selfObserver = null,\n        parentObserver = null;\n\n    const _cb = () => {\n      if (isSelfVisible && areParentsVisible) {\n        // process callbacks\n        if (cb) cb(elm);\n        resolve(elm); // remove the event listeners\n\n        elm.removeEventListener(\"transitionend\", _eventCb);\n        elm.removeEventListener(\"animationstart\", _eventCb);\n        elm.removeEventListener(\"animationend\", _eventCb); // remove the event listeners\n\n        if (closestNotVisible) {\n          closestNotVisible.removeEventListener(\"transitionend\", _eventCb);\n          closestNotVisible.removeEventListener(\"animationstart\", _eventCb);\n          closestNotVisible.removeEventListener(\"animationend\", _eventCb);\n        }\n      }\n    }; // function called on each transitionend, start, etc...\n\n\n    const _eventCb = e => {\n      // wait just a little time to check again\n      setTimeout(() => {\n        if (e.target === elm) {\n          if ((0, _isVisible.default)(elm)) {\n            isSelfVisible = true;\n\n            if (selfObserver && selfObserver.disconnect) {\n              selfObserver.disconnect();\n            } // remove the event listeners\n\n\n            elm.removeEventListener(\"transitionend\", _eventCb);\n            elm.removeEventListener(\"animationstart\", _eventCb);\n            elm.removeEventListener(\"animationend\", _eventCb);\n          }\n        } else if (e.target === closestNotVisible) {\n          if ((0, _isVisible.default)(closestNotVisible)) {\n            areParentsVisible = true;\n\n            if (parentObserver && parentObserver.disconnect) {\n              parentObserver.disconnect();\n            } // remove the event listeners\n\n\n            closestNotVisible.removeEventListener(\"transitionend\", _eventCb);\n            closestNotVisible.removeEventListener(\"animationstart\", _eventCb);\n            closestNotVisible.removeEventListener(\"animationend\", _eventCb);\n          }\n        } // callback\n\n\n        _cb();\n      });\n    }; // check if element itself is not visible\n\n\n    if (!(0, _isVisible.default)(elm)) {\n      selfObserver = new MutationObserver(mutations => {\n        mutations.forEach(mutation => {\n          // check that is the style whos changed\n          if (mutation.attributeName === \"style\" || mutation.attributeName === \"class\") {\n            // check if is visible\n            if ((0, _isVisible.default)(mutation.target)) {\n              // update\n              isSelfVisible = true; // callback\n\n              _cb(); // stop observe\n\n\n              selfObserver.disconnect();\n            }\n          }\n        });\n      });\n      selfObserver.observe(elm, {\n        attributes: true\n      }); // listen for animationstart to check if the element is visible\n\n      elm.addEventListener(\"animationstart\", _eventCb);\n      elm.addEventListener(\"animationend\", _eventCb);\n      elm.addEventListener(\"transitionend\", _eventCb);\n    } else {\n      isSelfVisible = true;\n    } // get the closest not visible element\n    // if found, we monitor it to check when it is visible\n\n\n    closestNotVisible = (0, _closestNotVisible.default)(elm);\n\n    if (closestNotVisible) {\n      parentObserver = new MutationObserver(mutations => {\n        mutations.forEach(mutation => {\n          // check that is the style whos changed\n          if (mutation.attributeName === \"style\" || mutation.attributeName === \"class\") {\n            // check if is visible\n            if ((0, _isVisible.default)(mutation.target)) {\n              // update\n              areParentsVisible = true; // callback\n\n              _cb(); // stop observe\n\n\n              parentObserver.disconnect();\n            }\n          }\n        });\n      });\n      parentObserver.observe(closestNotVisible, {\n        attributes: true\n      }); // listen for animationstart to check if the element is visible\n\n      closestNotVisible.addEventListener(\"animationstart\", _eventCb);\n      closestNotVisible.addEventListener(\"animationend\", _eventCb);\n      closestNotVisible.addEventListener(\"transitionend\", _eventCb);\n    } else {\n      areParentsVisible = true;\n    } // callback\n\n\n    _cb();\n  });\n}\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/dom/whenVisible.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/function/throttle.js":
/*!******************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/function/throttle.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = throttle;\n\n/**\n * @name        throttle\n * @namespace       sugar.js.function\n * @type      Function\n *\n * This utils function allows you to make sure that a function that will normally be called\n * several times, for example during a scroll event, to be called once each threshhold time\n *\n * @example \t\tjs\n * import throttle from '@coffeekraken/sugar/js/function/throttle';\n * const myThrottledFn = throttle(() => {\n * \t\t// my function content that will be\n * \t\t// executed only once each second\n * }, 1000);\n *\n * document.addEventListener('scroll', (e) => {\n * \t\t// call my throttled function\n * \t\tmyThrottledFn();\n * });\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nfunction throttle(fn, threshhold) {\n  threshhold || (threshhold = 250);\n  var last, deferTimer;\n  return function () {\n    var context = this;\n    var now = +new Date(),\n        args = arguments;\n\n    if (last && now < last + threshhold) {\n      // hold on to it\n      clearTimeout(deferTimer);\n      deferTimer = setTimeout(function () {\n        last = now;\n        fn.apply(context, args);\n      }, threshhold);\n    } else {\n      last = now;\n      fn.apply(context, args);\n    }\n  };\n}\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/function/throttle.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/object/propertyProxy.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/object/propertyProxy.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = propertyProxy;\n\nvar _get2 = _interopRequireDefault(__webpack_require__(/*! lodash/get */ \"./node_modules/lodash/get.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * @name        propertyProxy\n * @namespace       sugar.js.object\n * @type      Function\n *\n * Create a proxy for and object property.\n * This gives you the possibility to process the data of the property\n * when it is getted or setted.\n *\n * @param \t\t{Object} \t\tobj \t\t\tThe object on which to create the proxy\n * @param \t\t{String} \t\tproperty \t\tThe property name that will be proxied\n * @param \t\t{Object} \t\tdescriptor \t\tA descriptor object that contains at least a get or a set method, or both\n * @param \t\t{Boolean} \t\tapplySetterAtStart \tIf need to apply the descriptor setter directly on the current value or not\n *\n * @example \tjs\n * import propertyProxy from '@coffeekraken/sugar/js/object/propertyProxy';\n * const myObject = {\n * \t\ttitle : 'World'\n * };\n * // create the proxy\n * propertyProxy(myObject, 'title', {\n * \t\tget : (value) => {\n * \t\t\treturn `Hello ${value}`;\n * \t\t},\n * \t\tset : (value) => {\n * \t\t\treturn `Youhou ${value}`;\n * \t\t}\n * });\n * console.log(myObject.title) => 'Hello World';\n * myObject.title = 'Universe';\n * console.log(myObject.title) => 'Hello Youhou Universe';\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nfunction propertyProxy(obj, property, descriptor, applySetterAtStart = true) {\n  // store the current value\n  let val = (0, _get2.default)(obj, property);\n  let currentDescriptor = Object.getOwnPropertyDescriptor(obj.prototype || obj, property); // custom setter check\n\n  const _set = value => {\n    if (descriptor.set) {\n      value = descriptor.set(value);\n    } // descriptor\n\n\n    if (currentDescriptor && currentDescriptor.set) {\n      let ret = currentDescriptor.set(value);\n\n      if (ret) {\n        val = ret;\n      } else {\n        val = currentDescriptor.get();\n      }\n    } else {\n      val = value;\n    }\n  }; // apply the setter if needed\n\n\n  if (applySetterAtStart) _set(val); // make sure we have the good descriptor\n\n  let d = Object.getOwnPropertyDescriptor(obj, property);\n  Object.defineProperty(obj, property, {\n    get: () => {\n      let _val = val;\n\n      if (descriptor.get) {\n        _val = descriptor.get(_val);\n      }\n\n      if (currentDescriptor && currentDescriptor.get) {\n        _val = currentDescriptor.get();\n      }\n\n      return _val;\n    },\n    set: v => {\n      // const oldValue = val;\n      // internal set to use the good setter\n      _set(v); // notify of new update\n      // this.notify(objPath, val, oldValue);\n\n    },\n    configurable: descriptor.configurable !== undefined ? descriptor.configurable : currentDescriptor && currentDescriptor.configurable !== undefined ? currentDescriptor.configurable : false,\n    enumarable: descriptor.enumarable !== undefined ? descriptor.enumarable : currentDescriptor && currentDescriptor.enumarable !== undefined ? currentDescriptor.enumarable : true // writable : currentDescriptor && currentDescriptor.writable !== undefined ? currentDescriptor.writable : true\n\n  }); // return the value\n\n  return val;\n}\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/object/propertyProxy.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/string/autoCast.js":
/*!****************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/string/autoCast.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = autoCast;\n\n/**\n * @name        autoCast\n * @namespace       sugar.js.string\n * @type      Function\n *\n * Auto cast the string into the correct variable type\n *\n * @param    {String}    string    The string to auto cast\n * @return    {Mixed}    The casted value\n *\n * @example    js\n * import autoCast from '@coffeekraken/sugar/js/strings/autoCast'\n * autoCast('12') // => 12\n * autoCast('window.HTMLElement') // => HTMLElement\n * autoCast('{\"hello\":\"world\"}') // {hello:'world'}\n *\n * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nfunction autoCast(string) {\n  // if the passed string is not a string, return the value\n  if (typeof string !== \"string\") return string; // handle the single quotes strings like '\"hello world\"'\n\n  if (string.substr(0, 1) === \"'\" && string.substr(-1) === \"'\") {\n    return string.substr(1, string.length - 2);\n  } // number\n  // before the window check cause window['0'] correspond to something\n\n\n  const presumedNumber = parseFloat(string);\n\n  if (!isNaN(presumedNumber)) {\n    if (presumedNumber.toString() === string) {\n      return presumedNumber;\n    }\n  } // avoid getting item from the window object\n\n\n  if (window[string]) {\n    return string;\n  } // try to eval the passed string\n  // if no exception, mean that it's a valid\n  // js variable type\n\n\n  try {\n    const obj = eval(`(${string})`);\n    return obj;\n  } catch (e) {\n    // assume that the string passed is a string\n    return string;\n  }\n}\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/string/autoCast.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/string/camelize.js":
/*!****************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/string/camelize.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! core-js/modules/es.string.replace */ \"./node_modules/core-js/modules/es.string.replace.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = camelize;\n\n/**\n * @name        camelize\n * @namespace       sugar.js.string\n * @type      Function\n *\n * Camelize a string\n *\n * @param         {String}          text        The string to camelize\n * @return        {String}                      The camelized string\n *\n * @example     js\n * import camelize from '@coffeekraken/sugar/js/string/camelize';\n * camelize('hello world'); // => HELLO WORLD\n *\n * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nfunction camelize(text) {\n  let res = \"\";\n  res = text.replace(/(?:^|[-_])(\\w)/g, function (_, c) {\n    return c ? c.toUpperCase() : \"\";\n  });\n  res = res.substr(0, 1).toLowerCase() + res.slice(1);\n  return res.trim();\n}\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/string/camelize.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/string/uncamelize.js":
/*!******************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/string/uncamelize.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! core-js/modules/es.string.replace */ \"./node_modules/core-js/modules/es.string.replace.js\");\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = uncamelize;\n\n/**\n * @name        uncamelize\n * @namespace       sugar.js.string\n * @type      Function\n *\n * Uncamelize a string\n *\n * @param    {String}    string    The string to uncamelize\n * @param    {String}    [separator='-']    The separator to use\n * @return    {String}    The uncamelized string\n *\n * @example    js\n * import uncamelize from '@coffeekraken/sugar/js/string/uncamelize'\n * uncamelize('helloWorldAndUniverse') // hello-world-and-universe\n *\n * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nfunction uncamelize(text, separator = \"-\") {\n  // Replace all capital letters by separator followed by lowercase one\n  let res = \"\";\n  res = text.replace(/[A-Z]/g, function (letter) {\n    return separator + letter.toLowerCase();\n  }); // Remove first separator (to avoid _hello_world name)\n\n  return res.replace(\"/^\" + separator + \"/\", \"\").trim();\n}\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/string/uncamelize.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/string/upperFirst.js":
/*!******************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/string/upperFirst.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = upperFirst;\n\n/**\n * @name        upperFirst\n * @namespace       sugar.js.string\n * @type      Function\n *\n * Upper first\n *\n * @param    {String}    string    The string to process\n * @return    {String}    The processed string with first letter uppercase\n *\n * @example    js\n * import upperFirst from '@coffeekraken/sugar/js/string/upperFirst'\n * upperFirst('hello world') // Hello world\n *\n * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\nfunction upperFirst(string) {\n  return string.charAt(0).toUpperCase() + string.slice(1);\n}\n\nmodule.exports = exports.default;\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/string/upperFirst.js?");

/***/ }),

/***/ "./node_modules/@coffeekraken/sugar/js/vendor/mixwith.js":
/*!***************************************************************!*\
  !*** ./node_modules/@coffeekraken/sugar/js/vendor/mixwith.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;\n\n__webpack_require__(/*! core-js/modules/web.dom-collections.iterator */ \"./node_modules/core-js/modules/web.dom-collections.iterator.js\");\n\nvar _createClass = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];\n      descriptor.enumerable = descriptor.enumerable || false;\n      descriptor.configurable = true;\n      if (\"value\" in descriptor) descriptor.writable = true;\n      Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }\n\n  return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);\n    if (staticProps) defineProperties(Constructor, staticProps);\n    return Constructor;\n  };\n}();\n\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\n(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(undefined, function (exports) {\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n  var _appliedMixin = \"__mixwith_appliedMixin\";\n\n  var apply = exports.apply = function (superclass, mixin) {\n    var application = mixin(superclass);\n    application.prototype[_appliedMixin] = unwrap(mixin);\n    return application;\n  };\n\n  var isApplicationOf = exports.isApplicationOf = function (proto, mixin) {\n    return proto.hasOwnProperty(_appliedMixin) && proto[_appliedMixin] === unwrap(mixin);\n  };\n\n  var hasMixin = exports.hasMixin = function (o, mixin) {\n    while (o != null) {\n      if (isApplicationOf(o, mixin)) return true;\n      o = Object.getPrototypeOf(o);\n    }\n\n    return false;\n  };\n\n  var _wrappedMixin = \"__mixwith_wrappedMixin\";\n\n  var wrap = exports.wrap = function (mixin, wrapper) {\n    Object.setPrototypeOf(wrapper, mixin);\n\n    if (!mixin[_wrappedMixin]) {\n      mixin[_wrappedMixin] = mixin;\n    }\n\n    return wrapper;\n  };\n\n  var unwrap = exports.unwrap = function (wrapper) {\n    return wrapper[_wrappedMixin] || wrapper;\n  };\n\n  var _cachedApplications = \"__mixwith_cachedApplications\";\n\n  var Cached = exports.Cached = function (mixin) {\n    return wrap(mixin, function (superclass) {\n      // Get or create a symbol used to look up a previous application of mixin\n      // to the class. This symbol is unique per mixin definition, so a class will have N\n      // applicationRefs if it has had N mixins applied to it. A mixin will have\n      // exactly one _cachedApplicationRef used to store its applications.\n      var cachedApplications = superclass[_cachedApplications];\n\n      if (!cachedApplications) {\n        cachedApplications = superclass[_cachedApplications] = new Map();\n      }\n\n      var application = cachedApplications.get(mixin);\n\n      if (!application) {\n        application = mixin(superclass);\n        cachedApplications.set(mixin, application);\n      }\n\n      return application;\n    });\n  };\n\n  var DeDupe = exports.DeDupe = function (mixin) {\n    return wrap(mixin, function (superclass) {\n      return hasMixin(superclass.prototype, mixin) ? superclass : mixin(superclass);\n    });\n  };\n\n  var HasInstance = exports.HasInstance = function (mixin) {\n    if (Symbol && Symbol.hasInstance && !mixin[Symbol.hasInstance]) {\n      Object.defineProperty(mixin, Symbol.hasInstance, {\n        value: function value(o) {\n          return hasMixin(o, mixin);\n        }\n      });\n    }\n\n    return mixin;\n  };\n\n  var BareMixin = exports.BareMixin = function (mixin) {\n    return wrap(mixin, function (s) {\n      return apply(s, mixin);\n    });\n  };\n\n  var Mixin = exports.Mixin = function (mixin) {\n    return DeDupe(Cached(BareMixin(mixin)));\n  };\n\n  var mix = exports.mix = function (superclass) {\n    return new MixinBuilder(superclass);\n  };\n\n  var MixinBuilder = function () {\n    function MixinBuilder(superclass) {\n      _classCallCheck(this, MixinBuilder);\n\n      this.superclass = superclass || function () {\n        function _class() {\n          _classCallCheck(this, _class);\n        }\n\n        return _class;\n      }();\n    }\n\n    _createClass(MixinBuilder, [{\n      key: \"with\",\n      value: function _with() {\n        for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {\n          mixins[_key] = arguments[_key];\n        }\n\n        return mixins.reduce(function (c, m) {\n          return m(c);\n        }, this.superclass);\n      }\n    }]);\n\n    return MixinBuilder;\n  }();\n});\n\n//# sourceURL=webpack:///./node_modules/@coffeekraken/sugar/js/vendor/mixwith.js?");

/***/ }),

/***/ "./node_modules/@ungap/custom-elements-builtin/esm/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@ungap/custom-elements-builtin/esm/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*! (c) Andrea Giammarchi - ISC */\n(function (document, customElements, Object) {\n  'use strict';\n  if (customElements.get('ungap-li') || typeof Reflect == typeof EXTENDS)\n    return;\n  var EXTENDS = 'extends';\n  try {\n    // class LI extends HTMLLIElement {}\n    var desc = {};\n    desc[EXTENDS] = 'li';\n    var HtmlLI = HTMLLIElement;\n    var LI = function () {\n      return Reflect.construct(HtmlLI, [], LI);\n    };\n    LI.prototype = Object.create(HtmlLI.prototype);\n    customElements.define('ungap-li', LI, desc);\n    if (!/is=\"ungap-li\"/.test((new LI).outerHTML))\n      throw {};\n  } catch (o_O) {\n    var ATTRIBUTE_CHANGED_CALLBACK = 'attributeChangedCallback';\n    var CONNECTED_CALLBACK = 'connectedCallback';\n    var DISCONNECTED_CALLBACK = 'disconnectedCallback';\n    var assign = Object.assign;\n    var create = Object.create;\n    var defineProperties = Object.defineProperties;\n    var setPrototypeOf = Object.setPrototypeOf;\n    var define = customElements.define;\n    var get = customElements.get;\n    var upgrade = customElements.upgrade;\n    var whenDefined = customElements.whenDefined;\n    var registry = create(null);\n    new MutationObserver(function (changes) {\n      for (var i = 0, length = changes.length; i < length; i++) {\n        var change = changes[i];\n        var addedNodes = change.addedNodes;\n        var removedNodes = change.removedNodes;\n        for (var j = 0, len = addedNodes.length; j < len; j++)\n          setupIfNeeded(addedNodes[j]);\n        for (var j = 0, len = removedNodes.length; j < len; j++)\n          disconnectIfNeeded(removedNodes[j]);\n      }\n    }).observe(\n      document,\n      {childList: true, subtree: true}\n    );\n    defineProperties(\n      customElements,\n      {\n        define: {\n          value: function (name, Class, options) {\n            name = name.toLowerCase();\n            if (options && EXTENDS in options) {\n              // currently options is not used but preserved for the future\n              registry[name] = assign({}, options, {Class: Class});\n              var query = options[EXTENDS] + '[is=\"' + name + '\"]';\n              var changes = document.querySelectorAll(query);\n              for (var i = 0, length = changes.length; i < length; i++)\n                setupIfNeeded(changes[i]);\n            }\n            else\n              define.apply(customElements, arguments);\n          }\n        },\n        get: {\n          value: function (name) {\n            return name in registry ?\n              registry[name].Class :\n              get.call(customElements, name);\n          }\n        },\n        upgrade: {\n          value: function (node) {\n            var info = getInfo(node);\n            if (info && !(node instanceof info.Class))\n              setup(node, info);\n            else\n              upgrade.call(customElements, node);\n          }\n        },\n        whenDefined: {\n          value: function (name) {\n            return name in registry ?\n              Promise.resolve() :\n              whenDefined.call(customElements, name);\n          }\n        }\n      }\n    );\n    var createElement = document.createElement;\n    defineProperties(\n      document,\n      {\n        createElement: {\n          value: function (name, options) {\n            var node = createElement.call(document, name);\n            if (options && 'is' in options) {\n              node.setAttribute('is', options.is);\n              customElements.upgrade(node);\n            }\n            return node;\n          }\n        }\n      }\n    );\n    function attributeChanged(changes) {\n      for (var i = 0, length = changes.length; i < length; i++) {\n        var change = changes[i];\n        var attributeName = change.attributeName;\n        var oldValue = change.oldValue;\n        var target = change.target;\n        var newValue = target.getAttribute(attributeName);\n        if (\n          ATTRIBUTE_CHANGED_CALLBACK in target &&\n          !(oldValue == newValue && newValue == null)\n        )\n          target[ATTRIBUTE_CHANGED_CALLBACK](\n            attributeName,\n            oldValue,\n            target.getAttribute(attributeName),\n            // TODO: add getAttributeNS if the node is XML\n            null\n          );\n      }\n    }\n    function disconnectIfNeeded(node) {\n      if (node.nodeType !== 1)\n        return;\n      setupSubNodes(node, disconnectIfNeeded);\n      var info = getInfo(node);\n      if (\n        info &&\n        node instanceof info.Class &&\n        DISCONNECTED_CALLBACK in node\n      )\n        node[DISCONNECTED_CALLBACK]();\n    }\n    function getInfo(node) {\n      var is = node.getAttribute('is');\n      if (is) {\n        is = is.toLowerCase();\n        if (is in registry)\n          return registry[is];\n      }\n      return null;\n    }\n    function setup(node, info) {\n      var Class = info.Class;\n      var oa = Class.observedAttributes || [];\n      setPrototypeOf(node, Class.prototype);\n      if (oa.length) {\n        new MutationObserver(attributeChanged).observe(\n          node,\n          {\n            attributes: true,\n            attributeFilter: oa,\n            attributeOldValue: true\n          }\n        );\n        var changes = [];\n        for (var i = 0, length = oa.length; i < length; i++)\n          changes.push({attributeName: oa[i], oldValue: null, target: node});\n        attributeChanged(changes);\n      }\n    }\n    function setupIfNeeded(node) {\n      if (node.nodeType !== 1)\n        return;\n      setupSubNodes(node, setupIfNeeded);\n      var info = getInfo(node);\n      if (info) {\n        if (!(node instanceof info.Class))\n          setup(node, info);\n        if (CONNECTED_CALLBACK in node)\n          node[CONNECTED_CALLBACK]();\n      }\n    }\n    function setupSubNodes(node, setup) {\n      var nodes = node.querySelectorAll('[is]');\n      for (var i = 0, length = nodes.length; i < length; i++)\n        setup(nodes[i]);\n    }\n  }\n}(document, customElements, Object));\n\n\n//# sourceURL=webpack:///./node_modules/@ungap/custom-elements-builtin/esm/index.js?");

/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");\n\n//# sourceURL=webpack:///./node_modules/axios/index.js?");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\n\nmodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n    var requestHeaders = config.headers;\n\n    if (utils.isFormData(requestData)) {\n      delete requestHeaders['Content-Type']; // Let the browser set it\n    }\n\n    var request = new XMLHttpRequest();\n\n    // HTTP basic authentication\n    if (config.auth) {\n      var username = config.auth.username || '';\n      var password = config.auth.password || '';\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\n    }\n\n    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);\n\n    // Set the request timeout in MS\n    request.timeout = config.timeout;\n\n    // Listen for ready state\n    request.onreadystatechange = function handleLoad() {\n      if (!request || request.readyState !== 4) {\n        return;\n      }\n\n      // The request errored out and we didn't get a response, this will be\n      // handled by onerror instead\n      // With one exception: request that using file: protocol, most browsers\n      // will return status as 0 even though it's a successful request\n      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\n        return;\n      }\n\n      // Prepare the response\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\n      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;\n      var response = {\n        data: responseData,\n        status: request.status,\n        statusText: request.statusText,\n        headers: responseHeaders,\n        config: config,\n        request: request\n      };\n\n      settle(resolve, reject, response);\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle browser request cancellation (as opposed to a manual cancellation)\n    request.onabort = function handleAbort() {\n      if (!request) {\n        return;\n      }\n\n      reject(createError('Request aborted', config, 'ECONNABORTED', request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle low level network errors\n    request.onerror = function handleError() {\n      // Real errors are hidden from us by the browser\n      // onerror should only fire if it's a network error\n      reject(createError('Network Error', config, null, request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle timeout\n    request.ontimeout = function handleTimeout() {\n      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',\n        request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Add xsrf header\n    // This is only done if running in a standard browser environment.\n    // Specifically not if we're in a web worker, or react-native.\n    if (utils.isStandardBrowserEnv()) {\n      var cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\");\n\n      // Add xsrf header\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?\n        cookies.read(config.xsrfCookieName) :\n        undefined;\n\n      if (xsrfValue) {\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\n      }\n    }\n\n    // Add headers to the request\n    if ('setRequestHeader' in request) {\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\n          // Remove Content-Type if data is undefined\n          delete requestHeaders[key];\n        } else {\n          // Otherwise add header to the request\n          request.setRequestHeader(key, val);\n        }\n      });\n    }\n\n    // Add withCredentials to request if needed\n    if (config.withCredentials) {\n      request.withCredentials = true;\n    }\n\n    // Add responseType to request if needed\n    if (config.responseType) {\n      try {\n        request.responseType = config.responseType;\n      } catch (e) {\n        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.\n        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.\n        if (config.responseType !== 'json') {\n          throw e;\n        }\n      }\n    }\n\n    // Handle progress if needed\n    if (typeof config.onDownloadProgress === 'function') {\n      request.addEventListener('progress', config.onDownloadProgress);\n    }\n\n    // Not all browsers support upload events\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\n      request.upload.addEventListener('progress', config.onUploadProgress);\n    }\n\n    if (config.cancelToken) {\n      // Handle cancellation\n      config.cancelToken.promise.then(function onCanceled(cancel) {\n        if (!request) {\n          return;\n        }\n\n        request.abort();\n        reject(cancel);\n        // Clean up request\n        request = null;\n      });\n    }\n\n    if (requestData === undefined) {\n      requestData = null;\n    }\n\n    // Send the request\n    request.send(requestData);\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/adapters/xhr.js?");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\nvar mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Create an instance of Axios\n *\n * @param {Object} defaultConfig The default config for the instance\n * @return {Axios} A new instance of Axios\n */\nfunction createInstance(defaultConfig) {\n  var context = new Axios(defaultConfig);\n  var instance = bind(Axios.prototype.request, context);\n\n  // Copy axios.prototype to instance\n  utils.extend(instance, Axios.prototype, context);\n\n  // Copy context to instance\n  utils.extend(instance, context);\n\n  return instance;\n}\n\n// Create the default instance to be exported\nvar axios = createInstance(defaults);\n\n// Expose Axios class to allow class inheritance\naxios.Axios = Axios;\n\n// Factory for creating new instances\naxios.create = function create(instanceConfig) {\n  return createInstance(mergeConfig(axios.defaults, instanceConfig));\n};\n\n// Expose Cancel & CancelToken\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\n\n// Expose all/spread\naxios.all = function all(promises) {\n  return Promise.all(promises);\n};\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\");\n\nmodule.exports = axios;\n\n// Allow use of default import syntax in TypeScript\nmodule.exports.default = axios;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * A `Cancel` is an object that is thrown when an operation is canceled.\n *\n * @class\n * @param {string=} message The message.\n */\nfunction Cancel(message) {\n  this.message = message;\n}\n\nCancel.prototype.toString = function toString() {\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\n};\n\nCancel.prototype.__CANCEL__ = true;\n\nmodule.exports = Cancel;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/Cancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\n/**\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\n *\n * @class\n * @param {Function} executor The executor function.\n */\nfunction CancelToken(executor) {\n  if (typeof executor !== 'function') {\n    throw new TypeError('executor must be a function.');\n  }\n\n  var resolvePromise;\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve;\n  });\n\n  var token = this;\n  executor(function cancel(message) {\n    if (token.reason) {\n      // Cancellation has already been requested\n      return;\n    }\n\n    token.reason = new Cancel(message);\n    resolvePromise(token.reason);\n  });\n}\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason;\n  }\n};\n\n/**\n * Returns an object that contains a new `CancelToken` and a function that, when called,\n * cancels the `CancelToken`.\n */\nCancelToken.source = function source() {\n  var cancel;\n  var token = new CancelToken(function executor(c) {\n    cancel = c;\n  });\n  return {\n    token: token,\n    cancel: cancel\n  };\n};\n\nmodule.exports = CancelToken;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/CancelToken.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function isCancel(value) {\n  return !!(value && value.__CANCEL__);\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/cancel/isCancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar buildURL = __webpack_require__(/*! ../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\nvar mergeConfig = __webpack_require__(/*! ./mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\n\n/**\n * Create a new instance of Axios\n *\n * @param {Object} instanceConfig The default config for the instance\n */\nfunction Axios(instanceConfig) {\n  this.defaults = instanceConfig;\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager()\n  };\n}\n\n/**\n * Dispatch a request\n *\n * @param {Object} config The config specific for this request (merged with this.defaults)\n */\nAxios.prototype.request = function request(config) {\n  /*eslint no-param-reassign:0*/\n  // Allow for axios('example/url'[, config]) a la fetch API\n  if (typeof config === 'string') {\n    config = arguments[1] || {};\n    config.url = arguments[0];\n  } else {\n    config = config || {};\n  }\n\n  config = mergeConfig(this.defaults, config);\n  config.method = config.method ? config.method.toLowerCase() : 'get';\n\n  // Hook up interceptors middleware\n  var chain = [dispatchRequest, undefined];\n  var promise = Promise.resolve(config);\n\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    chain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    chain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  while (chain.length) {\n    promise = promise.then(chain.shift(), chain.shift());\n  }\n\n  return promise;\n};\n\nAxios.prototype.getUri = function getUri(config) {\n  config = mergeConfig(this.defaults, config);\n  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\\?/, '');\n};\n\n// Provide aliases for supported request methods\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url\n    }));\n  };\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, data, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url,\n      data: data\n    }));\n  };\n});\n\nmodule.exports = Axios;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/Axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction InterceptorManager() {\n  this.handlers = [];\n}\n\n/**\n * Add a new interceptor to the stack\n *\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\n * @param {Function} rejected The function to handle `reject` for a `Promise`\n *\n * @return {Number} An ID used to remove interceptor later\n */\nInterceptorManager.prototype.use = function use(fulfilled, rejected) {\n  this.handlers.push({\n    fulfilled: fulfilled,\n    rejected: rejected\n  });\n  return this.handlers.length - 1;\n};\n\n/**\n * Remove an interceptor from the stack\n *\n * @param {Number} id The ID that was returned by `use`\n */\nInterceptorManager.prototype.eject = function eject(id) {\n  if (this.handlers[id]) {\n    this.handlers[id] = null;\n  }\n};\n\n/**\n * Iterate over all the registered interceptors\n *\n * This method is particularly useful for skipping over any\n * interceptors that may have become `null` calling `eject`.\n *\n * @param {Function} fn The function to call for each interceptor\n */\nInterceptorManager.prototype.forEach = function forEach(fn) {\n  utils.forEach(this.handlers, function forEachHandler(h) {\n    if (h !== null) {\n      fn(h);\n    }\n  });\n};\n\nmodule.exports = InterceptorManager;\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/InterceptorManager.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n\n/**\n * Create an Error with the specified message, config, error code, request and response.\n *\n * @param {string} message The error message.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The created error.\n */\nmodule.exports = function createError(message, config, code, request, response) {\n  var error = new Error(message);\n  return enhanceError(error, config, code, request, response);\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/createError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\nvar combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested();\n  }\n}\n\n/**\n * Dispatch a request to the server using the configured adapter.\n *\n * @param {object} config The config that is to be used for the request\n * @returns {Promise} The Promise to be fulfilled\n */\nmodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config);\n\n  // Support baseURL config\n  if (config.baseURL && !isAbsoluteURL(config.url)) {\n    config.url = combineURLs(config.baseURL, config.url);\n  }\n\n  // Ensure headers exist\n  config.headers = config.headers || {};\n\n  // Transform request data\n  config.data = transformData(\n    config.data,\n    config.headers,\n    config.transformRequest\n  );\n\n  // Flatten headers\n  config.headers = utils.merge(\n    config.headers.common || {},\n    config.headers[config.method] || {},\n    config.headers || {}\n  );\n\n  utils.forEach(\n    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],\n    function cleanHeaderConfig(method) {\n      delete config.headers[method];\n    }\n  );\n\n  var adapter = config.adapter || defaults.adapter;\n\n  return adapter(config).then(function onAdapterResolution(response) {\n    throwIfCancellationRequested(config);\n\n    // Transform response data\n    response.data = transformData(\n      response.data,\n      response.headers,\n      config.transformResponse\n    );\n\n    return response;\n  }, function onAdapterRejection(reason) {\n    if (!isCancel(reason)) {\n      throwIfCancellationRequested(config);\n\n      // Transform response data\n      if (reason && reason.response) {\n        reason.response.data = transformData(\n          reason.response.data,\n          reason.response.headers,\n          config.transformResponse\n        );\n      }\n    }\n\n    return Promise.reject(reason);\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/dispatchRequest.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Update an Error with the specified config, error code, and response.\n *\n * @param {Error} error The error to update.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The error.\n */\nmodule.exports = function enhanceError(error, config, code, request, response) {\n  error.config = config;\n  if (code) {\n    error.code = code;\n  }\n\n  error.request = request;\n  error.response = response;\n  error.isAxiosError = true;\n\n  error.toJSON = function() {\n    return {\n      // Standard\n      message: this.message,\n      name: this.name,\n      // Microsoft\n      description: this.description,\n      number: this.number,\n      // Mozilla\n      fileName: this.fileName,\n      lineNumber: this.lineNumber,\n      columnNumber: this.columnNumber,\n      stack: this.stack,\n      // Axios\n      config: this.config,\n      code: this.code\n    };\n  };\n  return error;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/enhanceError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Config-specific merge-function which creates a new config-object\n * by merging two configuration objects together.\n *\n * @param {Object} config1\n * @param {Object} config2\n * @returns {Object} New object resulting from merging config2 to config1\n */\nmodule.exports = function mergeConfig(config1, config2) {\n  // eslint-disable-next-line no-param-reassign\n  config2 = config2 || {};\n  var config = {};\n\n  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {\n    if (typeof config2[prop] !== 'undefined') {\n      config[prop] = config2[prop];\n    }\n  });\n\n  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {\n    if (utils.isObject(config2[prop])) {\n      config[prop] = utils.deepMerge(config1[prop], config2[prop]);\n    } else if (typeof config2[prop] !== 'undefined') {\n      config[prop] = config2[prop];\n    } else if (utils.isObject(config1[prop])) {\n      config[prop] = utils.deepMerge(config1[prop]);\n    } else if (typeof config1[prop] !== 'undefined') {\n      config[prop] = config1[prop];\n    }\n  });\n\n  utils.forEach([\n    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',\n    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',\n    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',\n    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',\n    'socketPath'\n  ], function defaultToConfig2(prop) {\n    if (typeof config2[prop] !== 'undefined') {\n      config[prop] = config2[prop];\n    } else if (typeof config1[prop] !== 'undefined') {\n      config[prop] = config1[prop];\n    }\n  });\n\n  return config;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/mergeConfig.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\n\n/**\n * Resolve or reject a Promise based on response status.\n *\n * @param {Function} resolve A function that resolves the promise.\n * @param {Function} reject A function that rejects the promise.\n * @param {object} response The response.\n */\nmodule.exports = function settle(resolve, reject, response) {\n  var validateStatus = response.config.validateStatus;\n  if (!validateStatus || validateStatus(response.status)) {\n    resolve(response);\n  } else {\n    reject(createError(\n      'Request failed with status code ' + response.status,\n      response.config,\n      null,\n      response.request,\n      response\n    ));\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/settle.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Transform the data for a request or a response\n *\n * @param {Object|String} data The data to be transformed\n * @param {Array} headers The headers for the request or response\n * @param {Array|Function} fns A single function or Array of functions\n * @returns {*} The resulting transformed data\n */\nmodule.exports = function transformData(data, headers, fns) {\n  /*eslint no-param-reassign:0*/\n  utils.forEach(fns, function transform(fn) {\n    data = fn(data, headers);\n  });\n\n  return data;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/core/transformData.js?");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\n\nvar DEFAULT_CONTENT_TYPE = {\n  'Content-Type': 'application/x-www-form-urlencoded'\n};\n\nfunction setContentTypeIfUnset(headers, value) {\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\n    headers['Content-Type'] = value;\n  }\n}\n\nfunction getDefaultAdapter() {\n  var adapter;\n  // Only Node.JS has a process variable that is of [[Class]] process\n  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {\n    // For node use HTTP adapter\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  } else if (typeof XMLHttpRequest !== 'undefined') {\n    // For browsers use XHR adapter\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  }\n  return adapter;\n}\n\nvar defaults = {\n  adapter: getDefaultAdapter(),\n\n  transformRequest: [function transformRequest(data, headers) {\n    normalizeHeaderName(headers, 'Accept');\n    normalizeHeaderName(headers, 'Content-Type');\n    if (utils.isFormData(data) ||\n      utils.isArrayBuffer(data) ||\n      utils.isBuffer(data) ||\n      utils.isStream(data) ||\n      utils.isFile(data) ||\n      utils.isBlob(data)\n    ) {\n      return data;\n    }\n    if (utils.isArrayBufferView(data)) {\n      return data.buffer;\n    }\n    if (utils.isURLSearchParams(data)) {\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\n      return data.toString();\n    }\n    if (utils.isObject(data)) {\n      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');\n      return JSON.stringify(data);\n    }\n    return data;\n  }],\n\n  transformResponse: [function transformResponse(data) {\n    /*eslint no-param-reassign:0*/\n    if (typeof data === 'string') {\n      try {\n        data = JSON.parse(data);\n      } catch (e) { /* Ignore */ }\n    }\n    return data;\n  }],\n\n  /**\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\n   * timeout is not created.\n   */\n  timeout: 0,\n\n  xsrfCookieName: 'XSRF-TOKEN',\n  xsrfHeaderName: 'X-XSRF-TOKEN',\n\n  maxContentLength: -1,\n\n  validateStatus: function validateStatus(status) {\n    return status >= 200 && status < 300;\n  }\n};\n\ndefaults.headers = {\n  common: {\n    'Accept': 'application/json, text/plain, */*'\n  }\n};\n\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\n  defaults.headers[method] = {};\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\n});\n\nmodule.exports = defaults;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../../../../usr/local/lib/node_modules/webpack/node_modules/process/browser.js */ \"../../../../../../../../usr/local/lib/node_modules/webpack/node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/axios/lib/defaults.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function bind(fn, thisArg) {\n  return function wrap() {\n    var args = new Array(arguments.length);\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n    return fn.apply(thisArg, args);\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/bind.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction encode(val) {\n  return encodeURIComponent(val).\n    replace(/%40/gi, '@').\n    replace(/%3A/gi, ':').\n    replace(/%24/g, '$').\n    replace(/%2C/gi, ',').\n    replace(/%20/g, '+').\n    replace(/%5B/gi, '[').\n    replace(/%5D/gi, ']');\n}\n\n/**\n * Build a URL by appending params to the end\n *\n * @param {string} url The base of the url (e.g., http://www.google.com)\n * @param {object} [params] The params to be appended\n * @returns {string} The formatted url\n */\nmodule.exports = function buildURL(url, params, paramsSerializer) {\n  /*eslint no-param-reassign:0*/\n  if (!params) {\n    return url;\n  }\n\n  var serializedParams;\n  if (paramsSerializer) {\n    serializedParams = paramsSerializer(params);\n  } else if (utils.isURLSearchParams(params)) {\n    serializedParams = params.toString();\n  } else {\n    var parts = [];\n\n    utils.forEach(params, function serialize(val, key) {\n      if (val === null || typeof val === 'undefined') {\n        return;\n      }\n\n      if (utils.isArray(val)) {\n        key = key + '[]';\n      } else {\n        val = [val];\n      }\n\n      utils.forEach(val, function parseValue(v) {\n        if (utils.isDate(v)) {\n          v = v.toISOString();\n        } else if (utils.isObject(v)) {\n          v = JSON.stringify(v);\n        }\n        parts.push(encode(key) + '=' + encode(v));\n      });\n    });\n\n    serializedParams = parts.join('&');\n  }\n\n  if (serializedParams) {\n    var hashmarkIndex = url.indexOf('#');\n    if (hashmarkIndex !== -1) {\n      url = url.slice(0, hashmarkIndex);\n    }\n\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\n  }\n\n  return url;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/buildURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Creates a new URL by combining the specified URLs\n *\n * @param {string} baseURL The base URL\n * @param {string} relativeURL The relative URL\n * @returns {string} The combined URL\n */\nmodule.exports = function combineURLs(baseURL, relativeURL) {\n  return relativeURL\n    ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '')\n    : baseURL;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/combineURLs.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs support document.cookie\n    (function standardBrowserEnv() {\n      return {\n        write: function write(name, value, expires, path, domain, secure) {\n          var cookie = [];\n          cookie.push(name + '=' + encodeURIComponent(value));\n\n          if (utils.isNumber(expires)) {\n            cookie.push('expires=' + new Date(expires).toGMTString());\n          }\n\n          if (utils.isString(path)) {\n            cookie.push('path=' + path);\n          }\n\n          if (utils.isString(domain)) {\n            cookie.push('domain=' + domain);\n          }\n\n          if (secure === true) {\n            cookie.push('secure');\n          }\n\n          document.cookie = cookie.join('; ');\n        },\n\n        read: function read(name) {\n          var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\n          return (match ? decodeURIComponent(match[3]) : null);\n        },\n\n        remove: function remove(name) {\n          this.write(name, '', Date.now() - 86400000);\n        }\n      };\n    })() :\n\n  // Non standard browser env (web workers, react-native) lack needed support.\n    (function nonStandardBrowserEnv() {\n      return {\n        write: function write() {},\n        read: function read() { return null; },\n        remove: function remove() {}\n      };\n    })()\n);\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/cookies.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Determines whether the specified URL is absolute\n *\n * @param {string} url The URL to test\n * @returns {boolean} True if the specified URL is absolute, otherwise false\n */\nmodule.exports = function isAbsoluteURL(url) {\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\n  // by any combination of letters, digits, plus, period, or hyphen.\n  return /^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url);\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/isAbsoluteURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs have full support of the APIs needed to test\n  // whether the request URL is of the same origin as current location.\n    (function standardBrowserEnv() {\n      var msie = /(msie|trident)/i.test(navigator.userAgent);\n      var urlParsingNode = document.createElement('a');\n      var originURL;\n\n      /**\n    * Parse a URL to discover it's components\n    *\n    * @param {String} url The URL to be parsed\n    * @returns {Object}\n    */\n      function resolveURL(url) {\n        var href = url;\n\n        if (msie) {\n        // IE needs attribute set twice to normalize properties\n          urlParsingNode.setAttribute('href', href);\n          href = urlParsingNode.href;\n        }\n\n        urlParsingNode.setAttribute('href', href);\n\n        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\n        return {\n          href: urlParsingNode.href,\n          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\n          host: urlParsingNode.host,\n          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\n          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\n          hostname: urlParsingNode.hostname,\n          port: urlParsingNode.port,\n          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?\n            urlParsingNode.pathname :\n            '/' + urlParsingNode.pathname\n        };\n      }\n\n      originURL = resolveURL(window.location.href);\n\n      /**\n    * Determine if a URL shares the same origin as the current location\n    *\n    * @param {String} requestURL The URL to test\n    * @returns {boolean} True if URL shares the same origin, otherwise false\n    */\n      return function isURLSameOrigin(requestURL) {\n        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;\n        return (parsed.protocol === originURL.protocol &&\n            parsed.host === originURL.host);\n      };\n    })() :\n\n  // Non standard browser envs (web workers, react-native) lack needed support.\n    (function nonStandardBrowserEnv() {\n      return function isURLSameOrigin() {\n        return true;\n      };\n    })()\n);\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/isURLSameOrigin.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\n  utils.forEach(headers, function processHeader(value, name) {\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\n      headers[normalizedName] = value;\n      delete headers[name];\n    }\n  });\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/normalizeHeaderName.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n// Headers whose duplicates are ignored by node\n// c.f. https://nodejs.org/api/http.html#http_message_headers\nvar ignoreDuplicateOf = [\n  'age', 'authorization', 'content-length', 'content-type', 'etag',\n  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',\n  'last-modified', 'location', 'max-forwards', 'proxy-authorization',\n  'referer', 'retry-after', 'user-agent'\n];\n\n/**\n * Parse headers into an object\n *\n * ```\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\n * Content-Type: application/json\n * Connection: keep-alive\n * Transfer-Encoding: chunked\n * ```\n *\n * @param {String} headers Headers needing to be parsed\n * @returns {Object} Headers parsed into an object\n */\nmodule.exports = function parseHeaders(headers) {\n  var parsed = {};\n  var key;\n  var val;\n  var i;\n\n  if (!headers) { return parsed; }\n\n  utils.forEach(headers.split('\\n'), function parser(line) {\n    i = line.indexOf(':');\n    key = utils.trim(line.substr(0, i)).toLowerCase();\n    val = utils.trim(line.substr(i + 1));\n\n    if (key) {\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\n        return;\n      }\n      if (key === 'set-cookie') {\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\n      } else {\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\n      }\n    }\n  });\n\n  return parsed;\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/parseHeaders.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Syntactic sugar for invoking a function and expanding an array for arguments.\n *\n * Common use case would be to use `Function.prototype.apply`.\n *\n *  ```js\n *  function f(x, y, z) {}\n *  var args = [1, 2, 3];\n *  f.apply(null, args);\n *  ```\n *\n * With `spread` this example can be re-written.\n *\n *  ```js\n *  spread(function(x, y, z) {})([1, 2, 3]);\n *  ```\n *\n * @param {Function} callback\n * @returns {Function}\n */\nmodule.exports = function spread(callback) {\n  return function wrap(arr) {\n    return callback.apply(null, arr);\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/helpers/spread.js?");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar isBuffer = __webpack_require__(/*! is-buffer */ \"./node_modules/is-buffer/index.js\");\n\n/*global toString:true*/\n\n// utils is a library of generic helper functions non-specific to axios\n\nvar toString = Object.prototype.toString;\n\n/**\n * Determine if a value is an Array\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Array, otherwise false\n */\nfunction isArray(val) {\n  return toString.call(val) === '[object Array]';\n}\n\n/**\n * Determine if a value is an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\n */\nfunction isArrayBuffer(val) {\n  return toString.call(val) === '[object ArrayBuffer]';\n}\n\n/**\n * Determine if a value is a FormData\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an FormData, otherwise false\n */\nfunction isFormData(val) {\n  return (typeof FormData !== 'undefined') && (val instanceof FormData);\n}\n\n/**\n * Determine if a value is a view on an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\n */\nfunction isArrayBufferView(val) {\n  var result;\n  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {\n    result = ArrayBuffer.isView(val);\n  } else {\n    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);\n  }\n  return result;\n}\n\n/**\n * Determine if a value is a String\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a String, otherwise false\n */\nfunction isString(val) {\n  return typeof val === 'string';\n}\n\n/**\n * Determine if a value is a Number\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Number, otherwise false\n */\nfunction isNumber(val) {\n  return typeof val === 'number';\n}\n\n/**\n * Determine if a value is undefined\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if the value is undefined, otherwise false\n */\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n\n/**\n * Determine if a value is an Object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Object, otherwise false\n */\nfunction isObject(val) {\n  return val !== null && typeof val === 'object';\n}\n\n/**\n * Determine if a value is a Date\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Date, otherwise false\n */\nfunction isDate(val) {\n  return toString.call(val) === '[object Date]';\n}\n\n/**\n * Determine if a value is a File\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a File, otherwise false\n */\nfunction isFile(val) {\n  return toString.call(val) === '[object File]';\n}\n\n/**\n * Determine if a value is a Blob\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Blob, otherwise false\n */\nfunction isBlob(val) {\n  return toString.call(val) === '[object Blob]';\n}\n\n/**\n * Determine if a value is a Function\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Function, otherwise false\n */\nfunction isFunction(val) {\n  return toString.call(val) === '[object Function]';\n}\n\n/**\n * Determine if a value is a Stream\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Stream, otherwise false\n */\nfunction isStream(val) {\n  return isObject(val) && isFunction(val.pipe);\n}\n\n/**\n * Determine if a value is a URLSearchParams object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\n */\nfunction isURLSearchParams(val) {\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\n}\n\n/**\n * Trim excess whitespace off the beginning and end of a string\n *\n * @param {String} str The String to trim\n * @returns {String} The String freed of excess whitespace\n */\nfunction trim(str) {\n  return str.replace(/^\\s*/, '').replace(/\\s*$/, '');\n}\n\n/**\n * Determine if we're running in a standard browser environment\n *\n * This allows axios to run in a web worker, and react-native.\n * Both environments support XMLHttpRequest, but not fully standard globals.\n *\n * web workers:\n *  typeof window -> undefined\n *  typeof document -> undefined\n *\n * react-native:\n *  navigator.product -> 'ReactNative'\n * nativescript\n *  navigator.product -> 'NativeScript' or 'NS'\n */\nfunction isStandardBrowserEnv() {\n  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||\n                                           navigator.product === 'NativeScript' ||\n                                           navigator.product === 'NS')) {\n    return false;\n  }\n  return (\n    typeof window !== 'undefined' &&\n    typeof document !== 'undefined'\n  );\n}\n\n/**\n * Iterate over an Array or an Object invoking a function for each item.\n *\n * If `obj` is an Array callback will be called passing\n * the value, index, and complete array for each item.\n *\n * If 'obj' is an Object callback will be called passing\n * the value, key, and complete object for each property.\n *\n * @param {Object|Array} obj The object to iterate\n * @param {Function} fn The callback to invoke for each item\n */\nfunction forEach(obj, fn) {\n  // Don't bother if no value provided\n  if (obj === null || typeof obj === 'undefined') {\n    return;\n  }\n\n  // Force an array if not already something iterable\n  if (typeof obj !== 'object') {\n    /*eslint no-param-reassign:0*/\n    obj = [obj];\n  }\n\n  if (isArray(obj)) {\n    // Iterate over array values\n    for (var i = 0, l = obj.length; i < l; i++) {\n      fn.call(null, obj[i], i, obj);\n    }\n  } else {\n    // Iterate over object keys\n    for (var key in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\n        fn.call(null, obj[key], key, obj);\n      }\n    }\n  }\n}\n\n/**\n * Accepts varargs expecting each argument to be an object, then\n * immutably merges the properties of each object and returns result.\n *\n * When multiple objects contain the same key the later object in\n * the arguments list will take precedence.\n *\n * Example:\n *\n * ```js\n * var result = merge({foo: 123}, {foo: 456});\n * console.log(result.foo); // outputs 456\n * ```\n *\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction merge(/* obj1, obj2, obj3, ... */) {\n  var result = {};\n  function assignValue(val, key) {\n    if (typeof result[key] === 'object' && typeof val === 'object') {\n      result[key] = merge(result[key], val);\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Function equal to merge with the difference being that no reference\n * to original objects is kept.\n *\n * @see merge\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction deepMerge(/* obj1, obj2, obj3, ... */) {\n  var result = {};\n  function assignValue(val, key) {\n    if (typeof result[key] === 'object' && typeof val === 'object') {\n      result[key] = deepMerge(result[key], val);\n    } else if (typeof val === 'object') {\n      result[key] = deepMerge({}, val);\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Extends object a by mutably adding to it the properties of object b.\n *\n * @param {Object} a The object to be extended\n * @param {Object} b The object to copy properties from\n * @param {Object} thisArg The object to bind function to\n * @return {Object} The resulting value of object a\n */\nfunction extend(a, b, thisArg) {\n  forEach(b, function assignValue(val, key) {\n    if (thisArg && typeof val === 'function') {\n      a[key] = bind(val, thisArg);\n    } else {\n      a[key] = val;\n    }\n  });\n  return a;\n}\n\nmodule.exports = {\n  isArray: isArray,\n  isArrayBuffer: isArrayBuffer,\n  isBuffer: isBuffer,\n  isFormData: isFormData,\n  isArrayBufferView: isArrayBufferView,\n  isString: isString,\n  isNumber: isNumber,\n  isObject: isObject,\n  isUndefined: isUndefined,\n  isDate: isDate,\n  isFile: isFile,\n  isBlob: isBlob,\n  isFunction: isFunction,\n  isStream: isStream,\n  isURLSearchParams: isURLSearchParams,\n  isStandardBrowserEnv: isStandardBrowserEnv,\n  forEach: forEach,\n  merge: merge,\n  deepMerge: deepMerge,\n  extend: extend,\n  trim: trim\n};\n\n\n//# sourceURL=webpack:///./node_modules/axios/lib/utils.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/a-possible-prototype.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/a-possible-prototype.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n\nmodule.exports = function (it) {\n  if (!isObject(it) && it !== null) {\n    throw TypeError(\"Can't set \" + String(it) + ' as a prototype');\n  } return it;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/a-possible-prototype.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/add-to-unscopables.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/add-to-unscopables.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\nvar create = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js/internals/object-create.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\n\nvar UNSCOPABLES = wellKnownSymbol('unscopables');\nvar ArrayPrototype = Array.prototype;\n\n// Array.prototype[@@unscopables]\n// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables\nif (ArrayPrototype[UNSCOPABLES] == undefined) {\n  createNonEnumerableProperty(ArrayPrototype, UNSCOPABLES, create(null));\n}\n\n// add a key to Array.prototype[@@unscopables]\nmodule.exports = function (key) {\n  ArrayPrototype[UNSCOPABLES][key] = true;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/add-to-unscopables.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/advance-string-index.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/advance-string-index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar charAt = __webpack_require__(/*! ../internals/string-multibyte */ \"./node_modules/core-js/internals/string-multibyte.js\").charAt;\n\n// `AdvanceStringIndex` abstract operation\n// https://tc39.github.io/ecma262/#sec-advancestringindex\nmodule.exports = function (S, index, unicode) {\n  return index + (unicode ? charAt(S, index).length : 1);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/advance-string-index.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n\nmodule.exports = function (it) {\n  if (!isObject(it)) {\n    throw TypeError(String(it) + ' is not an object');\n  } return it;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/an-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar toLength = __webpack_require__(/*! ../internals/to-length */ \"./node_modules/core-js/internals/to-length.js\");\nvar toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ \"./node_modules/core-js/internals/to-absolute-index.js\");\n\n// `Array.prototype.{ indexOf, includes }` methods implementation\nvar createMethod = function (IS_INCLUDES) {\n  return function ($this, el, fromIndex) {\n    var O = toIndexedObject($this);\n    var length = toLength(O.length);\n    var index = toAbsoluteIndex(fromIndex, length);\n    var value;\n    // Array#includes uses SameValueZero equality algorithm\n    // eslint-disable-next-line no-self-compare\n    if (IS_INCLUDES && el != el) while (length > index) {\n      value = O[index++];\n      // eslint-disable-next-line no-self-compare\n      if (value != value) return true;\n    // Array#indexOf ignores holes, Array#includes - not\n    } else for (;length > index; index++) {\n      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;\n    } return !IS_INCLUDES && -1;\n  };\n};\n\nmodule.exports = {\n  // `Array.prototype.includes` method\n  // https://tc39.github.io/ecma262/#sec-array.prototype.includes\n  includes: createMethod(true),\n  // `Array.prototype.indexOf` method\n  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof\n  indexOf: createMethod(false)\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/array-includes.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var toString = {}.toString;\n\nmodule.exports = function (it) {\n  return toString.call(it).slice(8, -1);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/classof-raw.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar ownKeys = __webpack_require__(/*! ../internals/own-keys */ \"./node_modules/core-js/internals/own-keys.js\");\nvar getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js/internals/object-get-own-property-descriptor.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\n\nmodule.exports = function (target, source) {\n  var keys = ownKeys(source);\n  var defineProperty = definePropertyModule.f;\n  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;\n  for (var i = 0; i < keys.length; i++) {\n    var key = keys[i];\n    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/copy-constructor-properties.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\nmodule.exports = !fails(function () {\n  function F() { /* empty */ }\n  F.prototype.constructor = null;\n  return Object.getPrototypeOf(new F()) !== F.prototype;\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/correct-prototype-getter.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/create-iterator-constructor.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-iterator-constructor.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar IteratorPrototype = __webpack_require__(/*! ../internals/iterators-core */ \"./node_modules/core-js/internals/iterators-core.js\").IteratorPrototype;\nvar create = __webpack_require__(/*! ../internals/object-create */ \"./node_modules/core-js/internals/object-create.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js/internals/create-property-descriptor.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js/internals/set-to-string-tag.js\");\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js/internals/iterators.js\");\n\nvar returnThis = function () { return this; };\n\nmodule.exports = function (IteratorConstructor, NAME, next) {\n  var TO_STRING_TAG = NAME + ' Iterator';\n  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });\n  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);\n  Iterators[TO_STRING_TAG] = returnThis;\n  return IteratorConstructor;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/create-iterator-constructor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js/internals/create-property-descriptor.js\");\n\nmodule.exports = DESCRIPTORS ? function (object, key, value) {\n  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));\n} : function (object, key, value) {\n  object[key] = value;\n  return object;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/create-non-enumerable-property.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (bitmap, value) {\n  return {\n    enumerable: !(bitmap & 1),\n    configurable: !(bitmap & 2),\n    writable: !(bitmap & 4),\n    value: value\n  };\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/create-property-descriptor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/define-iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-iterator.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar $ = __webpack_require__(/*! ../internals/export */ \"./node_modules/core-js/internals/export.js\");\nvar createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ \"./node_modules/core-js/internals/create-iterator-constructor.js\");\nvar getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ \"./node_modules/core-js/internals/object-get-prototype-of.js\");\nvar setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ \"./node_modules/core-js/internals/object-set-prototype-of.js\");\nvar setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ \"./node_modules/core-js/internals/set-to-string-tag.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\nvar redefine = __webpack_require__(/*! ../internals/redefine */ \"./node_modules/core-js/internals/redefine.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js/internals/is-pure.js\");\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js/internals/iterators.js\");\nvar IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ \"./node_modules/core-js/internals/iterators-core.js\");\n\nvar IteratorPrototype = IteratorsCore.IteratorPrototype;\nvar BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;\nvar ITERATOR = wellKnownSymbol('iterator');\nvar KEYS = 'keys';\nvar VALUES = 'values';\nvar ENTRIES = 'entries';\n\nvar returnThis = function () { return this; };\n\nmodule.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {\n  createIteratorConstructor(IteratorConstructor, NAME, next);\n\n  var getIterationMethod = function (KIND) {\n    if (KIND === DEFAULT && defaultIterator) return defaultIterator;\n    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];\n    switch (KIND) {\n      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };\n      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };\n      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };\n    } return function () { return new IteratorConstructor(this); };\n  };\n\n  var TO_STRING_TAG = NAME + ' Iterator';\n  var INCORRECT_VALUES_NAME = false;\n  var IterablePrototype = Iterable.prototype;\n  var nativeIterator = IterablePrototype[ITERATOR]\n    || IterablePrototype['@@iterator']\n    || DEFAULT && IterablePrototype[DEFAULT];\n  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);\n  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;\n  var CurrentIteratorPrototype, methods, KEY;\n\n  // fix native\n  if (anyNativeIterator) {\n    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));\n    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {\n      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {\n        if (setPrototypeOf) {\n          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);\n        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {\n          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);\n        }\n      }\n      // Set @@toStringTag to native iterators\n      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);\n      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;\n    }\n  }\n\n  // fix Array#{values, @@iterator}.name in V8 / FF\n  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {\n    INCORRECT_VALUES_NAME = true;\n    defaultIterator = function values() { return nativeIterator.call(this); };\n  }\n\n  // define iterator\n  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {\n    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);\n  }\n  Iterators[NAME] = defaultIterator;\n\n  // export additional methods\n  if (DEFAULT) {\n    methods = {\n      values: getIterationMethod(VALUES),\n      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),\n      entries: getIterationMethod(ENTRIES)\n    };\n    if (FORCED) for (KEY in methods) {\n      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {\n        redefine(IterablePrototype, KEY, methods[KEY]);\n      }\n    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);\n  }\n\n  return methods;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/define-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\n// Thank's IE8 for his funny defineProperty\nmodule.exports = !fails(function () {\n  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/descriptors.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n\nvar document = global.document;\n// typeof document.createElement is 'object' in old IE\nvar EXISTS = isObject(document) && isObject(document.createElement);\n\nmodule.exports = function (it) {\n  return EXISTS ? document.createElement(it) : {};\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/document-create-element.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/dom-iterables.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/dom-iterables.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// iterable DOM collections\n// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods\nmodule.exports = {\n  CSSRuleList: 0,\n  CSSStyleDeclaration: 0,\n  CSSValueList: 0,\n  ClientRectList: 0,\n  DOMRectList: 0,\n  DOMStringList: 0,\n  DOMTokenList: 1,\n  DataTransferItemList: 0,\n  FileList: 0,\n  HTMLAllCollection: 0,\n  HTMLCollection: 0,\n  HTMLFormElement: 0,\n  HTMLSelectElement: 0,\n  MediaList: 0,\n  MimeTypeArray: 0,\n  NamedNodeMap: 0,\n  NodeList: 1,\n  PaintRequestList: 0,\n  Plugin: 0,\n  PluginArray: 0,\n  SVGLengthList: 0,\n  SVGNumberList: 0,\n  SVGPathSegList: 0,\n  SVGPointList: 0,\n  SVGStringList: 0,\n  SVGTransformList: 0,\n  SourceBufferList: 0,\n  StyleSheetList: 0,\n  TextTrackCueList: 0,\n  TextTrackList: 0,\n  TouchList: 0\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/dom-iterables.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// IE8- don't enum bug keys\nmodule.exports = [\n  'constructor',\n  'hasOwnProperty',\n  'isPrototypeOf',\n  'propertyIsEnumerable',\n  'toLocaleString',\n  'toString',\n  'valueOf'\n];\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/enum-bug-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ \"./node_modules/core-js/internals/object-get-own-property-descriptor.js\").f;\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\nvar redefine = __webpack_require__(/*! ../internals/redefine */ \"./node_modules/core-js/internals/redefine.js\");\nvar setGlobal = __webpack_require__(/*! ../internals/set-global */ \"./node_modules/core-js/internals/set-global.js\");\nvar copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ \"./node_modules/core-js/internals/copy-constructor-properties.js\");\nvar isForced = __webpack_require__(/*! ../internals/is-forced */ \"./node_modules/core-js/internals/is-forced.js\");\n\n/*\n  options.target      - name of the target object\n  options.global      - target is the global object\n  options.stat        - export as static methods of target\n  options.proto       - export as prototype methods of target\n  options.real        - real prototype method for the `pure` version\n  options.forced      - export even if the native feature is available\n  options.bind        - bind methods to the target, required for the `pure` version\n  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version\n  options.unsafe      - use the simple assignment of property instead of delete + defineProperty\n  options.sham        - add a flag to not completely full polyfills\n  options.enumerable  - export as enumerable property\n  options.noTargetGet - prevent calling a getter on target\n*/\nmodule.exports = function (options, source) {\n  var TARGET = options.target;\n  var GLOBAL = options.global;\n  var STATIC = options.stat;\n  var FORCED, target, key, targetProperty, sourceProperty, descriptor;\n  if (GLOBAL) {\n    target = global;\n  } else if (STATIC) {\n    target = global[TARGET] || setGlobal(TARGET, {});\n  } else {\n    target = (global[TARGET] || {}).prototype;\n  }\n  if (target) for (key in source) {\n    sourceProperty = source[key];\n    if (options.noTargetGet) {\n      descriptor = getOwnPropertyDescriptor(target, key);\n      targetProperty = descriptor && descriptor.value;\n    } else targetProperty = target[key];\n    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);\n    // contained in target\n    if (!FORCED && targetProperty !== undefined) {\n      if (typeof sourceProperty === typeof targetProperty) continue;\n      copyConstructorProperties(sourceProperty, targetProperty);\n    }\n    // add a flag to not completely full polyfills\n    if (options.sham || (targetProperty && targetProperty.sham)) {\n      createNonEnumerableProperty(sourceProperty, 'sham', true);\n    }\n    // extend global\n    redefine(target, key, sourceProperty, options);\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/export.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (exec) {\n  try {\n    return !!exec();\n  } catch (error) {\n    return true;\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/fails.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\nvar redefine = __webpack_require__(/*! ../internals/redefine */ \"./node_modules/core-js/internals/redefine.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\nvar regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ \"./node_modules/core-js/internals/regexp-exec.js\");\n\nvar SPECIES = wellKnownSymbol('species');\n\nvar REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {\n  // #replace needs built-in support for named groups.\n  // #match works fine because it just return the exec results, even if it has\n  // a \"grops\" property.\n  var re = /./;\n  re.exec = function () {\n    var result = [];\n    result.groups = { a: '7' };\n    return result;\n  };\n  return ''.replace(re, '$<a>') !== '7';\n});\n\n// Chrome 51 has a buggy \"split\" implementation when RegExp#exec !== nativeExec\n// Weex JS has frozen built-in prototypes, so use try / catch wrapper\nvar SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {\n  var re = /(?:)/;\n  var originalExec = re.exec;\n  re.exec = function () { return originalExec.apply(this, arguments); };\n  var result = 'ab'.split(re);\n  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';\n});\n\nmodule.exports = function (KEY, length, exec, sham) {\n  var SYMBOL = wellKnownSymbol(KEY);\n\n  var DELEGATES_TO_SYMBOL = !fails(function () {\n    // String methods call symbol-named RegEp methods\n    var O = {};\n    O[SYMBOL] = function () { return 7; };\n    return ''[KEY](O) != 7;\n  });\n\n  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {\n    // Symbol-named RegExp methods call .exec\n    var execCalled = false;\n    var re = /a/;\n\n    if (KEY === 'split') {\n      // We can't use real regex here since it causes deoptimization\n      // and serious performance degradation in V8\n      // https://github.com/zloirock/core-js/issues/306\n      re = {};\n      // RegExp[@@split] doesn't call the regex's exec method, but first creates\n      // a new one. We need to return the patched regex when creating the new one.\n      re.constructor = {};\n      re.constructor[SPECIES] = function () { return re; };\n      re.flags = '';\n      re[SYMBOL] = /./[SYMBOL];\n    }\n\n    re.exec = function () { execCalled = true; return null; };\n\n    re[SYMBOL]('');\n    return !execCalled;\n  });\n\n  if (\n    !DELEGATES_TO_SYMBOL ||\n    !DELEGATES_TO_EXEC ||\n    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||\n    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)\n  ) {\n    var nativeRegExpMethod = /./[SYMBOL];\n    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {\n      if (regexp.exec === regexpExec) {\n        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {\n          // The native String method already delegates to @@method (this\n          // polyfilled function), leasing to infinite recursion.\n          // We avoid it by directly calling the native @@method method.\n          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };\n        }\n        return { done: true, value: nativeMethod.call(str, regexp, arg2) };\n      }\n      return { done: false };\n    });\n    var stringMethod = methods[0];\n    var regexMethod = methods[1];\n\n    redefine(String.prototype, KEY, stringMethod);\n    redefine(RegExp.prototype, SYMBOL, length == 2\n      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)\n      // 21.2.5.11 RegExp.prototype[@@split](string, limit)\n      ? function (string, arg) { return regexMethod.call(string, this, arg); }\n      // 21.2.5.6 RegExp.prototype[@@match](string)\n      // 21.2.5.9 RegExp.prototype[@@search](string)\n      : function (string) { return regexMethod.call(string, this); }\n    );\n    if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var path = __webpack_require__(/*! ../internals/path */ \"./node_modules/core-js/internals/path.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\n\nvar aFunction = function (variable) {\n  return typeof variable == 'function' ? variable : undefined;\n};\n\nmodule.exports = function (namespace, method) {\n  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])\n    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/get-built-in.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {\n  return it && it.Math == Math && it;\n};\n\n// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028\nmodule.exports =\n  // eslint-disable-next-line no-undef\n  check(typeof globalThis == 'object' && globalThis) ||\n  check(typeof window == 'object' && window) ||\n  check(typeof self == 'object' && self) ||\n  check(typeof global == 'object' && global) ||\n  // eslint-disable-next-line no-new-func\n  Function('return this')();\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../../../../usr/local/lib/node_modules/webpack/buildin/global.js */ \"../../../../../../../../usr/local/lib/node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/global.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/has.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var hasOwnProperty = {}.hasOwnProperty;\n\nmodule.exports = function (it, key) {\n  return hasOwnProperty.call(it, key);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/has.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/hidden-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js/internals/get-built-in.js\");\n\nmodule.exports = getBuiltIn('document', 'documentElement');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/html.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar createElement = __webpack_require__(/*! ../internals/document-create-element */ \"./node_modules/core-js/internals/document-create-element.js\");\n\n// Thank's IE8 for his funny defineProperty\nmodule.exports = !DESCRIPTORS && !fails(function () {\n  return Object.defineProperty(createElement('div'), 'a', {\n    get: function () { return 7; }\n  }).a != 7;\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/ie8-dom-define.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\nvar classof = __webpack_require__(/*! ../internals/classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\n\nvar split = ''.split;\n\n// fallback for non-array-like ES3 and non-enumerable old V8 strings\nmodule.exports = fails(function () {\n  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346\n  // eslint-disable-next-line no-prototype-builtins\n  return !Object('z').propertyIsEnumerable(0);\n}) ? function (it) {\n  return classof(it) == 'String' ? split.call(it, '') : Object(it);\n} : Object;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/indexed-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/inspect-source.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var store = __webpack_require__(/*! ../internals/shared-store */ \"./node_modules/core-js/internals/shared-store.js\");\n\nvar functionToString = Function.toString;\n\n// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper\nif (typeof store.inspectSource != 'function') {\n  store.inspectSource = function (it) {\n    return functionToString.call(it);\n  };\n}\n\nmodule.exports = store.inspectSource;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/inspect-source.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ \"./node_modules/core-js/internals/native-weak-map.js\");\nvar global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\nvar objectHas = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar sharedKey = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js/internals/shared-key.js\");\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js/internals/hidden-keys.js\");\n\nvar WeakMap = global.WeakMap;\nvar set, get, has;\n\nvar enforce = function (it) {\n  return has(it) ? get(it) : set(it, {});\n};\n\nvar getterFor = function (TYPE) {\n  return function (it) {\n    var state;\n    if (!isObject(it) || (state = get(it)).type !== TYPE) {\n      throw TypeError('Incompatible receiver, ' + TYPE + ' required');\n    } return state;\n  };\n};\n\nif (NATIVE_WEAK_MAP) {\n  var store = new WeakMap();\n  var wmget = store.get;\n  var wmhas = store.has;\n  var wmset = store.set;\n  set = function (it, metadata) {\n    wmset.call(store, it, metadata);\n    return metadata;\n  };\n  get = function (it) {\n    return wmget.call(store, it) || {};\n  };\n  has = function (it) {\n    return wmhas.call(store, it);\n  };\n} else {\n  var STATE = sharedKey('state');\n  hiddenKeys[STATE] = true;\n  set = function (it, metadata) {\n    createNonEnumerableProperty(it, STATE, metadata);\n    return metadata;\n  };\n  get = function (it) {\n    return objectHas(it, STATE) ? it[STATE] : {};\n  };\n  has = function (it) {\n    return objectHas(it, STATE);\n  };\n}\n\nmodule.exports = {\n  set: set,\n  get: get,\n  has: has,\n  enforce: enforce,\n  getterFor: getterFor\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/internal-state.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\nvar replacement = /#|\\.prototype\\./;\n\nvar isForced = function (feature, detection) {\n  var value = data[normalize(feature)];\n  return value == POLYFILL ? true\n    : value == NATIVE ? false\n    : typeof detection == 'function' ? fails(detection)\n    : !!detection;\n};\n\nvar normalize = isForced.normalize = function (string) {\n  return String(string).replace(replacement, '.').toLowerCase();\n};\n\nvar data = isForced.data = {};\nvar NATIVE = isForced.NATIVE = 'N';\nvar POLYFILL = isForced.POLYFILL = 'P';\n\nmodule.exports = isForced;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/is-forced.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  return typeof it === 'object' ? it !== null : typeof it === 'function';\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/is-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = false;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/is-pure.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/iterators-core.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterators-core.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ \"./node_modules/core-js/internals/object-get-prototype-of.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\nvar has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\nvar IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js/internals/is-pure.js\");\n\nvar ITERATOR = wellKnownSymbol('iterator');\nvar BUGGY_SAFARI_ITERATORS = false;\n\nvar returnThis = function () { return this; };\n\n// `%IteratorPrototype%` object\n// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object\nvar IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;\n\nif ([].keys) {\n  arrayIterator = [].keys();\n  // Safari 8 has buggy iterators w/o `next`\n  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;\n  else {\n    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));\n    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;\n  }\n}\n\nif (IteratorPrototype == undefined) IteratorPrototype = {};\n\n// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()\nif (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {\n  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);\n}\n\nmodule.exports = {\n  IteratorPrototype: IteratorPrototype,\n  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/iterators-core.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/iterators.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/iterators.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/iterators.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fails = __webpack_require__(/*! ../internals/fails */ \"./node_modules/core-js/internals/fails.js\");\n\nmodule.exports = !!Object.getOwnPropertySymbols && !fails(function () {\n  // Chrome 38 Symbol has incorrect toString conversion\n  // eslint-disable-next-line no-undef\n  return !String(Symbol());\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/native-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar inspectSource = __webpack_require__(/*! ../internals/inspect-source */ \"./node_modules/core-js/internals/inspect-source.js\");\n\nvar WeakMap = global.WeakMap;\n\nmodule.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/native-weak-map.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ \"./node_modules/core-js/internals/object-define-properties.js\");\nvar enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ \"./node_modules/core-js/internals/enum-bug-keys.js\");\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js/internals/hidden-keys.js\");\nvar html = __webpack_require__(/*! ../internals/html */ \"./node_modules/core-js/internals/html.js\");\nvar documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ \"./node_modules/core-js/internals/document-create-element.js\");\nvar sharedKey = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js/internals/shared-key.js\");\nvar IE_PROTO = sharedKey('IE_PROTO');\n\nvar PROTOTYPE = 'prototype';\nvar Empty = function () { /* empty */ };\n\n// Create object with fake `null` prototype: use iframe Object with cleared prototype\nvar createDict = function () {\n  // Thrash, waste and sodomy: IE GC bug\n  var iframe = documentCreateElement('iframe');\n  var length = enumBugKeys.length;\n  var lt = '<';\n  var script = 'script';\n  var gt = '>';\n  var js = 'java' + script + ':';\n  var iframeDocument;\n  iframe.style.display = 'none';\n  html.appendChild(iframe);\n  iframe.src = String(js);\n  iframeDocument = iframe.contentWindow.document;\n  iframeDocument.open();\n  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);\n  iframeDocument.close();\n  createDict = iframeDocument.F;\n  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];\n  return createDict();\n};\n\n// `Object.create` method\n// https://tc39.github.io/ecma262/#sec-object.create\nmodule.exports = Object.create || function create(O, Properties) {\n  var result;\n  if (O !== null) {\n    Empty[PROTOTYPE] = anObject(O);\n    result = new Empty();\n    Empty[PROTOTYPE] = null;\n    // add \"__proto__\" for Object.getPrototypeOf polyfill\n    result[IE_PROTO] = O;\n  } else result = createDict();\n  return Properties === undefined ? result : defineProperties(result, Properties);\n};\n\nhiddenKeys[IE_PROTO] = true;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-create.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-define-properties.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar objectKeys = __webpack_require__(/*! ../internals/object-keys */ \"./node_modules/core-js/internals/object-keys.js\");\n\n// `Object.defineProperties` method\n// https://tc39.github.io/ecma262/#sec-object.defineproperties\nmodule.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {\n  anObject(O);\n  var keys = objectKeys(Properties);\n  var length = keys.length;\n  var index = 0;\n  var key;\n  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);\n  return O;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-define-properties.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ \"./node_modules/core-js/internals/ie8-dom-define.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ \"./node_modules/core-js/internals/to-primitive.js\");\n\nvar nativeDefineProperty = Object.defineProperty;\n\n// `Object.defineProperty` method\n// https://tc39.github.io/ecma262/#sec-object.defineproperty\nexports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {\n  anObject(O);\n  P = toPrimitive(P, true);\n  anObject(Attributes);\n  if (IE8_DOM_DEFINE) try {\n    return nativeDefineProperty(O, P, Attributes);\n  } catch (error) { /* empty */ }\n  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');\n  if ('value' in Attributes) O[P] = Attributes.value;\n  return O;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-define-property.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ \"./node_modules/core-js/internals/descriptors.js\");\nvar propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ \"./node_modules/core-js/internals/object-property-is-enumerable.js\");\nvar createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ \"./node_modules/core-js/internals/create-property-descriptor.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ \"./node_modules/core-js/internals/to-primitive.js\");\nvar has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ \"./node_modules/core-js/internals/ie8-dom-define.js\");\n\nvar nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\n\n// `Object.getOwnPropertyDescriptor` method\n// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor\nexports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {\n  O = toIndexedObject(O);\n  P = toPrimitive(P, true);\n  if (IE8_DOM_DEFINE) try {\n    return nativeGetOwnPropertyDescriptor(O, P);\n  } catch (error) { /* empty */ }\n  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-get-own-property-descriptor.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ \"./node_modules/core-js/internals/object-keys-internal.js\");\nvar enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ \"./node_modules/core-js/internals/enum-bug-keys.js\");\n\nvar hiddenKeys = enumBugKeys.concat('length', 'prototype');\n\n// `Object.getOwnPropertyNames` method\n// https://tc39.github.io/ecma262/#sec-object.getownpropertynames\nexports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {\n  return internalObjectKeys(O, hiddenKeys);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-get-own-property-names.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.f = Object.getOwnPropertySymbols;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-get-own-property-symbols.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js/internals/to-object.js\");\nvar sharedKey = __webpack_require__(/*! ../internals/shared-key */ \"./node_modules/core-js/internals/shared-key.js\");\nvar CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ \"./node_modules/core-js/internals/correct-prototype-getter.js\");\n\nvar IE_PROTO = sharedKey('IE_PROTO');\nvar ObjectPrototype = Object.prototype;\n\n// `Object.getPrototypeOf` method\n// https://tc39.github.io/ecma262/#sec-object.getprototypeof\nmodule.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {\n  O = toObject(O);\n  if (has(O, IE_PROTO)) return O[IE_PROTO];\n  if (typeof O.constructor == 'function' && O instanceof O.constructor) {\n    return O.constructor.prototype;\n  } return O instanceof Object ? ObjectPrototype : null;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar indexOf = __webpack_require__(/*! ../internals/array-includes */ \"./node_modules/core-js/internals/array-includes.js\").indexOf;\nvar hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ \"./node_modules/core-js/internals/hidden-keys.js\");\n\nmodule.exports = function (object, names) {\n  var O = toIndexedObject(object);\n  var i = 0;\n  var result = [];\n  var key;\n  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);\n  // Don't enum bug & hidden keys\n  while (names.length > i) if (has(O, key = names[i++])) {\n    ~indexOf(result, key) || result.push(key);\n  }\n  return result;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-keys-internal.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ \"./node_modules/core-js/internals/object-keys-internal.js\");\nvar enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ \"./node_modules/core-js/internals/enum-bug-keys.js\");\n\n// `Object.keys` method\n// https://tc39.github.io/ecma262/#sec-object.keys\nmodule.exports = Object.keys || function keys(O) {\n  return internalObjectKeys(O, enumBugKeys);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar nativePropertyIsEnumerable = {}.propertyIsEnumerable;\nvar getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\n\n// Nashorn ~ JDK8 bug\nvar NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);\n\n// `Object.prototype.propertyIsEnumerable` method implementation\n// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable\nexports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {\n  var descriptor = getOwnPropertyDescriptor(this, V);\n  return !!descriptor && descriptor.enumerable;\n} : nativePropertyIsEnumerable;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-property-is-enumerable.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ \"./node_modules/core-js/internals/a-possible-prototype.js\");\n\n// `Object.setPrototypeOf` method\n// https://tc39.github.io/ecma262/#sec-object.setprototypeof\n// Works with __proto__ only. Old v8 can't work with null proto objects.\n/* eslint-disable no-proto */\nmodule.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {\n  var CORRECT_SETTER = false;\n  var test = {};\n  var setter;\n  try {\n    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;\n    setter.call(test, []);\n    CORRECT_SETTER = test instanceof Array;\n  } catch (error) { /* empty */ }\n  return function setPrototypeOf(O, proto) {\n    anObject(O);\n    aPossiblePrototype(proto);\n    if (CORRECT_SETTER) setter.call(O, proto);\n    else O.__proto__ = proto;\n    return O;\n  };\n}() : undefined);\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/object-set-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ \"./node_modules/core-js/internals/get-built-in.js\");\nvar getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ \"./node_modules/core-js/internals/object-get-own-property-names.js\");\nvar getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ \"./node_modules/core-js/internals/object-get-own-property-symbols.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\n\n// all object keys, includes non-enumerable and symbols\nmodule.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {\n  var keys = getOwnPropertyNamesModule.f(anObject(it));\n  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;\n  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/own-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/path.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\n\nmodule.exports = global;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/path.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\nvar has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar setGlobal = __webpack_require__(/*! ../internals/set-global */ \"./node_modules/core-js/internals/set-global.js\");\nvar inspectSource = __webpack_require__(/*! ../internals/inspect-source */ \"./node_modules/core-js/internals/inspect-source.js\");\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js/internals/internal-state.js\");\n\nvar getInternalState = InternalStateModule.get;\nvar enforceInternalState = InternalStateModule.enforce;\nvar TEMPLATE = String(String).split('String');\n\n(module.exports = function (O, key, value, options) {\n  var unsafe = options ? !!options.unsafe : false;\n  var simple = options ? !!options.enumerable : false;\n  var noTargetGet = options ? !!options.noTargetGet : false;\n  if (typeof value == 'function') {\n    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);\n    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');\n  }\n  if (O === global) {\n    if (simple) O[key] = value;\n    else setGlobal(key, value);\n    return;\n  } else if (!unsafe) {\n    delete O[key];\n  } else if (!noTargetGet && O[key]) {\n    simple = true;\n  }\n  if (simple) O[key] = value;\n  else createNonEnumerableProperty(O, key, value);\n// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative\n})(Function.prototype, 'toString', function toString() {\n  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/redefine.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec-abstract.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var classof = __webpack_require__(/*! ./classof-raw */ \"./node_modules/core-js/internals/classof-raw.js\");\nvar regexpExec = __webpack_require__(/*! ./regexp-exec */ \"./node_modules/core-js/internals/regexp-exec.js\");\n\n// `RegExpExec` abstract operation\n// https://tc39.github.io/ecma262/#sec-regexpexec\nmodule.exports = function (R, S) {\n  var exec = R.exec;\n  if (typeof exec === 'function') {\n    var result = exec.call(R, S);\n    if (typeof result !== 'object') {\n      throw TypeError('RegExp exec method returned something other than an Object or null');\n    }\n    return result;\n  }\n\n  if (classof(R) !== 'RegExp') {\n    throw TypeError('RegExp#exec called on incompatible receiver');\n  }\n\n  return regexpExec.call(R, S);\n};\n\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/regexp-exec-abstract.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/regexp-exec.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-exec.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar regexpFlags = __webpack_require__(/*! ./regexp-flags */ \"./node_modules/core-js/internals/regexp-flags.js\");\n\nvar nativeExec = RegExp.prototype.exec;\n// This always refers to the native implementation, because the\n// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,\n// which loads this file before patching the method.\nvar nativeReplace = String.prototype.replace;\n\nvar patchedExec = nativeExec;\n\nvar UPDATES_LAST_INDEX_WRONG = (function () {\n  var re1 = /a/;\n  var re2 = /b*/g;\n  nativeExec.call(re1, 'a');\n  nativeExec.call(re2, 'a');\n  return re1.lastIndex !== 0 || re2.lastIndex !== 0;\n})();\n\n// nonparticipating capturing group, copied from es5-shim's String#split patch.\nvar NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;\n\nvar PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;\n\nif (PATCH) {\n  patchedExec = function exec(str) {\n    var re = this;\n    var lastIndex, reCopy, match, i;\n\n    if (NPCG_INCLUDED) {\n      reCopy = new RegExp('^' + re.source + '$(?!\\\\s)', regexpFlags.call(re));\n    }\n    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;\n\n    match = nativeExec.call(re, str);\n\n    if (UPDATES_LAST_INDEX_WRONG && match) {\n      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;\n    }\n    if (NPCG_INCLUDED && match && match.length > 1) {\n      // Fix browsers whose `exec` methods don't consistently return `undefined`\n      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/\n      nativeReplace.call(match[0], reCopy, function () {\n        for (i = 1; i < arguments.length - 2; i++) {\n          if (arguments[i] === undefined) match[i] = undefined;\n        }\n      });\n    }\n\n    return match;\n  };\n}\n\nmodule.exports = patchedExec;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/regexp-exec.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/regexp-flags.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-flags.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\n\n// `RegExp.prototype.flags` getter implementation\n// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags\nmodule.exports = function () {\n  var that = anObject(this);\n  var result = '';\n  if (that.global) result += 'g';\n  if (that.ignoreCase) result += 'i';\n  if (that.multiline) result += 'm';\n  if (that.dotAll) result += 's';\n  if (that.unicode) result += 'u';\n  if (that.sticky) result += 'y';\n  return result;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/regexp-flags.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// `RequireObjectCoercible` abstract operation\n// https://tc39.github.io/ecma262/#sec-requireobjectcoercible\nmodule.exports = function (it) {\n  if (it == undefined) throw TypeError(\"Can't call method on \" + it);\n  return it;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/require-object-coercible.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\n\nmodule.exports = function (key, value) {\n  try {\n    createNonEnumerableProperty(global, key, value);\n  } catch (error) {\n    global[key] = value;\n  } return value;\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/set-global.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/set-to-string-tag.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ \"./node_modules/core-js/internals/object-define-property.js\").f;\nvar has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\n\nmodule.exports = function (it, TAG, STATIC) {\n  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {\n    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/set-to-string-tag.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js/internals/shared.js\");\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js/internals/uid.js\");\n\nvar keys = shared('keys');\n\nmodule.exports = function (key) {\n  return keys[key] || (keys[key] = uid(key));\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/shared-key.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/shared-store.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar setGlobal = __webpack_require__(/*! ../internals/set-global */ \"./node_modules/core-js/internals/set-global.js\");\n\nvar SHARED = '__core-js_shared__';\nvar store = global[SHARED] || setGlobal(SHARED, {});\n\nmodule.exports = store;\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/shared-store.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ \"./node_modules/core-js/internals/is-pure.js\");\nvar store = __webpack_require__(/*! ../internals/shared-store */ \"./node_modules/core-js/internals/shared-store.js\");\n\n(module.exports = function (key, value) {\n  return store[key] || (store[key] = value !== undefined ? value : {});\n})('versions', []).push({\n  version: '3.5.0',\n  mode: IS_PURE ? 'pure' : 'global',\n  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/shared.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/string-multibyte.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/string-multibyte.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ../internals/to-integer */ \"./node_modules/core-js/internals/to-integer.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\n\n// `String.prototype.{ codePointAt, at }` methods implementation\nvar createMethod = function (CONVERT_TO_STRING) {\n  return function ($this, pos) {\n    var S = String(requireObjectCoercible($this));\n    var position = toInteger(pos);\n    var size = S.length;\n    var first, second;\n    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;\n    first = S.charCodeAt(position);\n    return first < 0xD800 || first > 0xDBFF || position + 1 === size\n      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF\n        ? CONVERT_TO_STRING ? S.charAt(position) : first\n        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;\n  };\n};\n\nmodule.exports = {\n  // `String.prototype.codePointAt` method\n  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat\n  codeAt: createMethod(false),\n  // `String.prototype.at` method\n  // https://github.com/mathiasbynens/String.prototype.at\n  charAt: createMethod(true)\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/string-multibyte.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ../internals/to-integer */ \"./node_modules/core-js/internals/to-integer.js\");\n\nvar max = Math.max;\nvar min = Math.min;\n\n// Helper for a popular repeating case of the spec:\n// Let integer be ? ToInteger(index).\n// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).\nmodule.exports = function (index, length) {\n  var integer = toInteger(index);\n  return integer < 0 ? max(integer + length, 0) : min(integer, length);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-absolute-index.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// toObject with fallback for non-array-like ES3 strings\nvar IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ \"./node_modules/core-js/internals/indexed-object.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\n\nmodule.exports = function (it) {\n  return IndexedObject(requireObjectCoercible(it));\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-indexed-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-integer.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var ceil = Math.ceil;\nvar floor = Math.floor;\n\n// `ToInteger` abstract operation\n// https://tc39.github.io/ecma262/#sec-tointeger\nmodule.exports = function (argument) {\n  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-integer.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ../internals/to-integer */ \"./node_modules/core-js/internals/to-integer.js\");\n\nvar min = Math.min;\n\n// `ToLength` abstract operation\n// https://tc39.github.io/ecma262/#sec-tolength\nmodule.exports = function (argument) {\n  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-length.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\n\n// `ToObject` abstract operation\n// https://tc39.github.io/ecma262/#sec-toobject\nmodule.exports = function (argument) {\n  return Object(requireObjectCoercible(argument));\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-object.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ../internals/is-object */ \"./node_modules/core-js/internals/is-object.js\");\n\n// `ToPrimitive` abstract operation\n// https://tc39.github.io/ecma262/#sec-toprimitive\n// instead of the ES6 spec version, we didn't implement @@toPrimitive case\n// and the second argument - flag - preferred type is a string\nmodule.exports = function (input, PREFERRED_STRING) {\n  if (!isObject(input)) return input;\n  var fn, val;\n  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;\n  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;\n  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;\n  throw TypeError(\"Can't convert object to primitive value\");\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var id = 0;\nvar postfix = Math.random();\n\nmodule.exports = function (key) {\n  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/uid.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ \"./node_modules/core-js/internals/native-symbol.js\");\n\nmodule.exports = NATIVE_SYMBOL\n  // eslint-disable-next-line no-undef\n  && !Symbol.sham\n  // eslint-disable-next-line no-undef\n  && typeof Symbol() == 'symbol';\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/use-symbol-as-uid.js?");

/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar shared = __webpack_require__(/*! ../internals/shared */ \"./node_modules/core-js/internals/shared.js\");\nvar has = __webpack_require__(/*! ../internals/has */ \"./node_modules/core-js/internals/has.js\");\nvar uid = __webpack_require__(/*! ../internals/uid */ \"./node_modules/core-js/internals/uid.js\");\nvar NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ \"./node_modules/core-js/internals/native-symbol.js\");\nvar USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ \"./node_modules/core-js/internals/use-symbol-as-uid.js\");\n\nvar WellKnownSymbolsStore = shared('wks');\nvar Symbol = global.Symbol;\nvar createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : uid;\n\nmodule.exports = function (name) {\n  if (!has(WellKnownSymbolsStore, name)) {\n    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];\n    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);\n  } return WellKnownSymbolsStore[name];\n};\n\n\n//# sourceURL=webpack:///./node_modules/core-js/internals/well-known-symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.iterator.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ \"./node_modules/core-js/internals/to-indexed-object.js\");\nvar addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ \"./node_modules/core-js/internals/add-to-unscopables.js\");\nvar Iterators = __webpack_require__(/*! ../internals/iterators */ \"./node_modules/core-js/internals/iterators.js\");\nvar InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ \"./node_modules/core-js/internals/internal-state.js\");\nvar defineIterator = __webpack_require__(/*! ../internals/define-iterator */ \"./node_modules/core-js/internals/define-iterator.js\");\n\nvar ARRAY_ITERATOR = 'Array Iterator';\nvar setInternalState = InternalStateModule.set;\nvar getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);\n\n// `Array.prototype.entries` method\n// https://tc39.github.io/ecma262/#sec-array.prototype.entries\n// `Array.prototype.keys` method\n// https://tc39.github.io/ecma262/#sec-array.prototype.keys\n// `Array.prototype.values` method\n// https://tc39.github.io/ecma262/#sec-array.prototype.values\n// `Array.prototype[@@iterator]` method\n// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator\n// `CreateArrayIterator` internal method\n// https://tc39.github.io/ecma262/#sec-createarrayiterator\nmodule.exports = defineIterator(Array, 'Array', function (iterated, kind) {\n  setInternalState(this, {\n    type: ARRAY_ITERATOR,\n    target: toIndexedObject(iterated), // target\n    index: 0,                          // next index\n    kind: kind                         // kind\n  });\n// `%ArrayIteratorPrototype%.next` method\n// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next\n}, function () {\n  var state = getInternalState(this);\n  var target = state.target;\n  var kind = state.kind;\n  var index = state.index++;\n  if (!target || index >= target.length) {\n    state.target = undefined;\n    return { value: undefined, done: true };\n  }\n  if (kind == 'keys') return { value: index, done: false };\n  if (kind == 'values') return { value: target[index], done: false };\n  return { value: [index, target[index]], done: false };\n}, 'values');\n\n// argumentsList[@@iterator] is %ArrayProto_values%\n// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject\n// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject\nIterators.Arguments = Iterators.Array;\n\n// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables\naddToUnscopables('keys');\naddToUnscopables('values');\naddToUnscopables('entries');\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.array.iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es.string.replace.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.replace.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ \"./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js\");\nvar anObject = __webpack_require__(/*! ../internals/an-object */ \"./node_modules/core-js/internals/an-object.js\");\nvar toObject = __webpack_require__(/*! ../internals/to-object */ \"./node_modules/core-js/internals/to-object.js\");\nvar toLength = __webpack_require__(/*! ../internals/to-length */ \"./node_modules/core-js/internals/to-length.js\");\nvar toInteger = __webpack_require__(/*! ../internals/to-integer */ \"./node_modules/core-js/internals/to-integer.js\");\nvar requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ \"./node_modules/core-js/internals/require-object-coercible.js\");\nvar advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ \"./node_modules/core-js/internals/advance-string-index.js\");\nvar regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ \"./node_modules/core-js/internals/regexp-exec-abstract.js\");\n\nvar max = Math.max;\nvar min = Math.min;\nvar floor = Math.floor;\nvar SUBSTITUTION_SYMBOLS = /\\$([$&'`]|\\d\\d?|<[^>]*>)/g;\nvar SUBSTITUTION_SYMBOLS_NO_NAMED = /\\$([$&'`]|\\d\\d?)/g;\n\nvar maybeToString = function (it) {\n  return it === undefined ? it : String(it);\n};\n\n// @@replace logic\nfixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative) {\n  return [\n    // `String.prototype.replace` method\n    // https://tc39.github.io/ecma262/#sec-string.prototype.replace\n    function replace(searchValue, replaceValue) {\n      var O = requireObjectCoercible(this);\n      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];\n      return replacer !== undefined\n        ? replacer.call(searchValue, O, replaceValue)\n        : nativeReplace.call(String(O), searchValue, replaceValue);\n    },\n    // `RegExp.prototype[@@replace]` method\n    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace\n    function (regexp, replaceValue) {\n      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);\n      if (res.done) return res.value;\n\n      var rx = anObject(regexp);\n      var S = String(this);\n\n      var functionalReplace = typeof replaceValue === 'function';\n      if (!functionalReplace) replaceValue = String(replaceValue);\n\n      var global = rx.global;\n      if (global) {\n        var fullUnicode = rx.unicode;\n        rx.lastIndex = 0;\n      }\n      var results = [];\n      while (true) {\n        var result = regExpExec(rx, S);\n        if (result === null) break;\n\n        results.push(result);\n        if (!global) break;\n\n        var matchStr = String(result[0]);\n        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);\n      }\n\n      var accumulatedResult = '';\n      var nextSourcePosition = 0;\n      for (var i = 0; i < results.length; i++) {\n        result = results[i];\n\n        var matched = String(result[0]);\n        var position = max(min(toInteger(result.index), S.length), 0);\n        var captures = [];\n        // NOTE: This is equivalent to\n        //   captures = result.slice(1).map(maybeToString)\n        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in\n        // the slice polyfill when slicing native arrays) \"doesn't work\" in safari 9 and\n        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.\n        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));\n        var namedCaptures = result.groups;\n        if (functionalReplace) {\n          var replacerArgs = [matched].concat(captures, position, S);\n          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);\n          var replacement = String(replaceValue.apply(undefined, replacerArgs));\n        } else {\n          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);\n        }\n        if (position >= nextSourcePosition) {\n          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;\n          nextSourcePosition = position + matched.length;\n        }\n      }\n      return accumulatedResult + S.slice(nextSourcePosition);\n    }\n  ];\n\n  // https://tc39.github.io/ecma262/#sec-getsubstitution\n  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {\n    var tailPos = position + matched.length;\n    var m = captures.length;\n    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;\n    if (namedCaptures !== undefined) {\n      namedCaptures = toObject(namedCaptures);\n      symbols = SUBSTITUTION_SYMBOLS;\n    }\n    return nativeReplace.call(replacement, symbols, function (match, ch) {\n      var capture;\n      switch (ch.charAt(0)) {\n        case '$': return '$';\n        case '&': return matched;\n        case '`': return str.slice(0, position);\n        case \"'\": return str.slice(tailPos);\n        case '<':\n          capture = namedCaptures[ch.slice(1, -1)];\n          break;\n        default: // \\d\\d?\n          var n = +ch;\n          if (n === 0) return match;\n          if (n > m) {\n            var f = floor(n / 10);\n            if (f === 0) return match;\n            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);\n            return match;\n          }\n          capture = captures[n - 1];\n      }\n      return capture === undefined ? '' : capture;\n    });\n  }\n});\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/es.string.replace.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.iterator.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.iterator.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ../internals/global */ \"./node_modules/core-js/internals/global.js\");\nvar DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ \"./node_modules/core-js/internals/dom-iterables.js\");\nvar ArrayIteratorMethods = __webpack_require__(/*! ../modules/es.array.iterator */ \"./node_modules/core-js/modules/es.array.iterator.js\");\nvar createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ \"./node_modules/core-js/internals/create-non-enumerable-property.js\");\nvar wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ \"./node_modules/core-js/internals/well-known-symbol.js\");\n\nvar ITERATOR = wellKnownSymbol('iterator');\nvar TO_STRING_TAG = wellKnownSymbol('toStringTag');\nvar ArrayValues = ArrayIteratorMethods.values;\n\nfor (var COLLECTION_NAME in DOMIterables) {\n  var Collection = global[COLLECTION_NAME];\n  var CollectionPrototype = Collection && Collection.prototype;\n  if (CollectionPrototype) {\n    // some Chrome versions have non-configurable methods on DOMTokenList\n    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {\n      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);\n    } catch (error) {\n      CollectionPrototype[ITERATOR] = ArrayValues;\n    }\n    if (!CollectionPrototype[TO_STRING_TAG]) {\n      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);\n    }\n    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {\n      // some Chrome versions have non-configurable methods on DOMTokenList\n      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {\n        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);\n      } catch (error) {\n        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];\n      }\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/core-js/modules/web.dom-collections.iterator.js?");

/***/ }),

/***/ "./node_modules/custom-event/index.js":
/*!********************************************!*\
  !*** ./node_modules/custom-event/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {\nvar NativeCustomEvent = global.CustomEvent;\n\nfunction useNative () {\n  try {\n    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });\n    return  'cat' === p.type && 'bar' === p.detail.foo;\n  } catch (e) {\n  }\n  return false;\n}\n\n/**\n * Cross-browser `CustomEvent` constructor.\n *\n * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent\n *\n * @public\n */\n\nmodule.exports = useNative() ? NativeCustomEvent :\n\n// IE >= 9\n'undefined' !== typeof document && 'function' === typeof document.createEvent ? function CustomEvent (type, params) {\n  var e = document.createEvent('CustomEvent');\n  if (params) {\n    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);\n  } else {\n    e.initCustomEvent(type, false, false, void 0);\n  }\n  return e;\n} :\n\n// IE <= 8\nfunction CustomEvent (type, params) {\n  var e = document.createEventObject();\n  e.type = type;\n  if (params) {\n    e.bubbles = Boolean(params.bubbles);\n    e.cancelable = Boolean(params.cancelable);\n    e.detail = params.detail;\n  } else {\n    e.bubbles = false;\n    e.cancelable = false;\n    e.detail = void 0;\n  }\n  return e;\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../../../usr/local/lib/node_modules/webpack/buildin/global.js */ \"../../../../../../../../usr/local/lib/node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/custom-event/index.js?");

/***/ }),

/***/ "./node_modules/document-register-element/build/document-register-element.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/document-register-element/build/document-register-element.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*! (C) Andrea Giammarchi - @WebReflection - ISC Style License */\n!function(e,t){\"use strict\";function n(){var e=A.splice(0,A.length);for(et=0;e.length;)e.shift().call(null,e.shift())}function r(e,t){for(var n=0,r=e.length;n<r;n++)T(e[n],t)}function o(e){for(var t,n=0,r=e.length;n<r;n++)t=e[n],V(t,ae[a(t)])}function l(e){return function(t){ke(t)&&(T(t,e),ie.length&&r(t.querySelectorAll(ie),e))}}function a(e){var t=Ge.call(e,\"is\"),n=e.nodeName.toUpperCase(),r=ce.call(le,t?ne+t.toUpperCase():te+n);return t&&-1<r&&!i(n,t)?-1:r}function i(e,t){return-1<ie.indexOf(e+'[is=\"'+t+'\"]')}function u(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,o=e.target,l=e[Q]||2,a=e[W]||3;!at||o&&o!==t||!t[j]||\"style\"===r||e.prevValue===e.newValue&&(\"\"!==e.newValue||n!==l&&n!==a)||t[j](r,n===l?null:e.prevValue,n===a?null:e.newValue)}function c(e){var t=l(e);return function(e){A.push(t,e.target),et&&clearTimeout(et),et=setTimeout(n,1)}}function s(e){lt&&(lt=!1,e.currentTarget.removeEventListener(J,s)),ie.length&&r((e.target||y).querySelectorAll(ie),e.detail===B?B:x),Ue&&p()}function m(e,t){var n=this;Xe.call(n,e,t),O.call(n,{target:n})}function f(e,t,n){var r=t.apply(e,n),l=a(r);return-1<l&&V(r,ae[l]),n.pop()&&ie.length&&o(r.querySelectorAll(ie)),r}function d(e,t){Se(e,t),I?I.observe(e,Ye):(ot&&(e.setAttribute=m,e[_]=D(e),e[k](ee,O)),e[k](Y,u)),e[X]&&at&&(e.created=!0,e[X](),e.created=!1)}function p(){for(var e,t=0,n=xe.length;t<n;t++)e=xe[t],ue.contains(e)||(n--,xe.splice(t--,1),T(e,B))}function h(e){throw new Error(\"A \"+e+\" type is already registered\")}function T(e,t){var n,r,o=a(e);-1<o&&!Ze.call(e,\"TEMPLATE\")&&(S(e,ae[o]),o=0,t!==x||e[x]?t!==B||e[B]||(e[x]=!1,e[B]=!0,r=\"disconnected\",o=1):(e[B]=!1,e[x]=!0,r=\"connected\",o=1,Ue&&ce.call(xe,e)<0&&xe.push(e)),o&&(n=e[t+q]||e[r+q])&&n.call(e))}function L(){}function M(e,t,n){var r=n&&n[Z]||\"\",o=t.prototype,l=Fe(o),a=t.observedAttributes||pe,i={prototype:l};_e(l,X,{value:function(){if(Ae)Ae=!1;else if(!this[He]){this[He]=!0,new t(this),o[X]&&o[X].call(this);var e=Oe[De.get(t)];(!be||e.create.length>1)&&H(this)}}}),_e(l,j,{value:function(e){-1<ce.call(a,e)&&o[j]&&o[j].apply(this,arguments)}}),o[z]&&_e(l,G,{value:o[z]}),o[K]&&_e(l,$,{value:o[K]}),r&&(i[Z]=r),e=e.toUpperCase(),Oe[e]={constructor:t,create:r?[r,Ie(e)]:[e]},De.set(t,e),y[R](e.toLowerCase(),i),g(e),Ne[e].r()}function E(e){var t=Oe[e.toUpperCase()];return t&&t.constructor}function v(e){return\"string\"==typeof e?e:e&&e.is||\"\"}function H(e){for(var t,n=e[j],r=n?e.attributes:pe,o=r.length;o--;)t=r[o],n.call(e,t.name||t.nodeName,null,t.value||t.nodeValue)}function g(e){return e=e.toUpperCase(),e in Ne||(Ne[e]={},Ne[e].p=new we(function(t){Ne[e].r=t})),Ne[e].p}function b(){ge&&delete e.customElements,de(e,\"customElements\",{configurable:!0,value:new L}),de(e,\"CustomElementRegistry\",{configurable:!0,value:L});for(var t=w.get(/^HTML[A-Z]*[a-z]/),n=t.length;n--;function(t){var n=e[t];if(n){e[t]=function(e){var t,r;return e||(e=this),e[He]||(Ae=!0,t=Oe[De.get(e.constructor)],r=be&&1===t.create.length,e=r?Reflect.construct(n,pe,t.constructor):y.createElement.apply(y,t.create),e[He]=!0,Ae=!1,r||H(e)),e},e[t].prototype=n.prototype;try{n.prototype.constructor=e[t]}catch(r){ve=!0,de(n,He,{value:e[t]})}}}(t[n]));y.createElement=function(e,t){var n=v(t);return n?We.call(this,e,Ie(n)):We.call(this,e)},tt||(rt=!0,y[R](\"\"))}var y=e.document,C=e.Object,w=function(e){var t,n,r,o,l=/^[A-Z]+[a-z]/,a=function(e){var t,n=[];for(t in u)e.test(t)&&n.push(t);return n},i=function(e,t){(t=t.toLowerCase())in u||(u[e]=(u[e]||[]).concat(t),u[t]=u[t.toUpperCase()]=e)},u=(C.create||C)(null),c={};for(n in e)for(o in e[n])for(r=e[n][o],u[o]=r,t=0;t<r.length;t++)u[r[t].toLowerCase()]=u[r[t].toUpperCase()]=o;return c.get=function(e){return\"string\"==typeof e?u[e]||(l.test(e)?[]:\"\"):a(e)},c.set=function(e,t){return l.test(e)?i(e,t):i(t,e),c},c}({collections:{HTMLAllCollection:[\"all\"],HTMLCollection:[\"forms\"],HTMLFormControlsCollection:[\"elements\"],HTMLOptionsCollection:[\"options\"]},elements:{Element:[\"element\"],HTMLAnchorElement:[\"a\"],HTMLAppletElement:[\"applet\"],HTMLAreaElement:[\"area\"],HTMLAttachmentElement:[\"attachment\"],HTMLAudioElement:[\"audio\"],HTMLBRElement:[\"br\"],HTMLBaseElement:[\"base\"],HTMLBodyElement:[\"body\"],HTMLButtonElement:[\"button\"],HTMLCanvasElement:[\"canvas\"],HTMLContentElement:[\"content\"],HTMLDListElement:[\"dl\"],HTMLDataElement:[\"data\"],HTMLDataListElement:[\"datalist\"],HTMLDetailsElement:[\"details\"],HTMLDialogElement:[\"dialog\"],HTMLDirectoryElement:[\"dir\"],HTMLDivElement:[\"div\"],HTMLDocument:[\"document\"],HTMLElement:[\"element\",\"abbr\",\"address\",\"article\",\"aside\",\"b\",\"bdi\",\"bdo\",\"cite\",\"code\",\"command\",\"dd\",\"dfn\",\"dt\",\"em\",\"figcaption\",\"figure\",\"footer\",\"header\",\"i\",\"kbd\",\"mark\",\"nav\",\"noscript\",\"rp\",\"rt\",\"ruby\",\"s\",\"samp\",\"section\",\"small\",\"strong\",\"sub\",\"summary\",\"sup\",\"u\",\"var\",\"wbr\"],HTMLEmbedElement:[\"embed\"],HTMLFieldSetElement:[\"fieldset\"],HTMLFontElement:[\"font\"],HTMLFormElement:[\"form\"],HTMLFrameElement:[\"frame\"],HTMLFrameSetElement:[\"frameset\"],HTMLHRElement:[\"hr\"],HTMLHeadElement:[\"head\"],HTMLHeadingElement:[\"h1\",\"h2\",\"h3\",\"h4\",\"h5\",\"h6\"],HTMLHtmlElement:[\"html\"],HTMLIFrameElement:[\"iframe\"],HTMLImageElement:[\"img\"],HTMLInputElement:[\"input\"],HTMLKeygenElement:[\"keygen\"],HTMLLIElement:[\"li\"],HTMLLabelElement:[\"label\"],HTMLLegendElement:[\"legend\"],HTMLLinkElement:[\"link\"],HTMLMapElement:[\"map\"],HTMLMarqueeElement:[\"marquee\"],HTMLMediaElement:[\"media\"],HTMLMenuElement:[\"menu\"],HTMLMenuItemElement:[\"menuitem\"],HTMLMetaElement:[\"meta\"],HTMLMeterElement:[\"meter\"],HTMLModElement:[\"del\",\"ins\"],HTMLOListElement:[\"ol\"],HTMLObjectElement:[\"object\"],HTMLOptGroupElement:[\"optgroup\"],HTMLOptionElement:[\"option\"],HTMLOutputElement:[\"output\"],HTMLParagraphElement:[\"p\"],HTMLParamElement:[\"param\"],HTMLPictureElement:[\"picture\"],HTMLPreElement:[\"pre\"],HTMLProgressElement:[\"progress\"],HTMLQuoteElement:[\"blockquote\",\"q\",\"quote\"],HTMLScriptElement:[\"script\"],HTMLSelectElement:[\"select\"],HTMLShadowElement:[\"shadow\"],HTMLSlotElement:[\"slot\"],HTMLSourceElement:[\"source\"],HTMLSpanElement:[\"span\"],HTMLStyleElement:[\"style\"],HTMLTableCaptionElement:[\"caption\"],HTMLTableCellElement:[\"td\",\"th\"],HTMLTableColElement:[\"col\",\"colgroup\"],HTMLTableElement:[\"table\"],HTMLTableRowElement:[\"tr\"],HTMLTableSectionElement:[\"thead\",\"tbody\",\"tfoot\"],HTMLTemplateElement:[\"template\"],HTMLTextAreaElement:[\"textarea\"],HTMLTimeElement:[\"time\"],HTMLTitleElement:[\"title\"],HTMLTrackElement:[\"track\"],HTMLUListElement:[\"ul\"],HTMLUnknownElement:[\"unknown\",\"vhgroupv\",\"vkeygen\"],HTMLVideoElement:[\"video\"]},nodes:{Attr:[\"node\"],Audio:[\"audio\"],CDATASection:[\"node\"],CharacterData:[\"node\"],Comment:[\"#comment\"],Document:[\"#document\"],DocumentFragment:[\"#document-fragment\"],DocumentType:[\"node\"],HTMLDocument:[\"#document\"],Image:[\"img\"],Option:[\"option\"],ProcessingInstruction:[\"node\"],ShadowRoot:[\"#shadow-root\"],Text:[\"#text\"],XMLDocument:[\"xml\"]}});\"object\"!=typeof t&&(t={type:t||\"auto\"});var A,O,N,D,I,F,S,V,P,R=\"registerElement\",U=1e5*e.Math.random()>>0,_=\"__\"+R+U,k=\"addEventListener\",x=\"attached\",q=\"Callback\",B=\"detached\",Z=\"extends\",j=\"attributeChanged\"+q,G=x+q,z=\"connected\"+q,K=\"disconnected\"+q,X=\"created\"+q,$=B+q,Q=\"ADDITION\",W=\"REMOVAL\",Y=\"DOMAttrModified\",J=\"DOMContentLoaded\",ee=\"DOMSubtreeModified\",te=\"<\",ne=\"=\",re=/^[A-Z][._A-Z0-9]*-[-._A-Z0-9]*$/,oe=[\"ANNOTATION-XML\",\"COLOR-PROFILE\",\"FONT-FACE\",\"FONT-FACE-SRC\",\"FONT-FACE-URI\",\"FONT-FACE-FORMAT\",\"FONT-FACE-NAME\",\"MISSING-GLYPH\"],le=[],ae=[],ie=\"\",ue=y.documentElement,ce=le.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},se=C.prototype,me=se.hasOwnProperty,fe=se.isPrototypeOf,de=C.defineProperty,pe=[],he=C.getOwnPropertyDescriptor,Te=C.getOwnPropertyNames,Le=C.getPrototypeOf,Me=C.setPrototypeOf,Ee=!!C.__proto__,ve=!1,He=\"__dreCEv1\",ge=e.customElements,be=!/^force/.test(t.type)&&!!(ge&&ge.define&&ge.get&&ge.whenDefined),ye=C.create||C,Ce=e.Map||function(){var e,t=[],n=[];return{get:function(e){return n[ce.call(t,e)]},set:function(r,o){e=ce.call(t,r),e<0?n[t.push(r)-1]=o:n[e]=o}}},we=e.Promise||function(e){function t(e){for(r=!0;n.length;)n.shift()(e)}var n=[],r=!1,o={\"catch\":function(){return o},then:function(e){return n.push(e),r&&setTimeout(t,1),o}};return e(t),o},Ae=!1,Oe=ye(null),Ne=ye(null),De=new Ce,Ie=function(e){return e.toLowerCase()},Fe=C.create||function ct(e){return e?(ct.prototype=e,new ct):this},Se=Me||(Ee?function(e,t){return e.__proto__=t,e}:Te&&he?function(){function e(e,t){for(var n,r=Te(t),o=0,l=r.length;o<l;o++)n=r[o],me.call(e,n)||de(e,n,he(t,n))}return function(t,n){do{e(t,n)}while((n=Le(n))&&!fe.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),Ve=e.MutationObserver||e.WebKitMutationObserver,Pe=e.HTMLAnchorElement,Re=(e.HTMLElement||e.Element||e.Node).prototype,Ue=!fe.call(Re,ue),_e=Ue?function(e,t,n){return e[t]=n.value,e}:de,ke=Ue?function(e){return 1===e.nodeType}:function(e){return fe.call(Re,e)},xe=Ue&&[],qe=Re.attachShadow,Be=Re.cloneNode,Ze=Re.closest||function(e){for(var t=this;t&&t.nodeName!==e;)t=t.parentNode;return t},je=Re.dispatchEvent,Ge=Re.getAttribute,ze=Re.hasAttribute,Ke=Re.removeAttribute,Xe=Re.setAttribute,$e=y.createElement,Qe=y.importNode,We=$e,Ye=Ve&&{attributes:!0,characterData:!0,attributeOldValue:!0},Je=Ve||function(e){ot=!1,ue.removeEventListener(Y,Je)},et=0,tt=R in y&&!/^force-all/.test(t.type),nt=!0,rt=!1,ot=!0,lt=!0,at=!0;if(Ve&&(P=y.createElement(\"div\"),P.innerHTML=\"<div><div></div></div>\",new Ve(function(e,t){if(e[0]&&\"childList\"==e[0].type&&!e[0].removedNodes[0].childNodes.length){P=he(Re,\"innerHTML\");var n=P&&P.set;n&&de(Re,\"innerHTML\",{set:function(e){for(;this.lastChild;)this.removeChild(this.lastChild);n.call(this,e)}})}t.disconnect(),P=null}).observe(P,{childList:!0,subtree:!0}),P.innerHTML=\"\"),tt||(Me||Ee?(S=function(e,t){fe.call(t,e)||d(e,t)},V=d):(S=function(e,t){e[_]||(e[_]=C(!0),d(e,t))},V=S),Ue?(ot=!1,function(){var e=he(Re,k),t=e.value,n=function(e){var t=new CustomEvent(Y,{bubbles:!0});t.attrName=e,t.prevValue=Ge.call(this,e),t.newValue=null,t[W]=t.attrChange=2,Ke.call(this,e),je.call(this,t)},r=function(e,t){var n=ze.call(this,e),r=n&&Ge.call(this,e),o=new CustomEvent(Y,{bubbles:!0});Xe.call(this,e,t),o.attrName=e,o.prevValue=n?r:null,o.newValue=t,n?o.MODIFICATION=o.attrChange=1:o[Q]=o.attrChange=0,je.call(this,o)},o=function(e){var t,n=e.currentTarget,r=n[_],o=e.propertyName;r.hasOwnProperty(o)&&(r=r[o],t=new CustomEvent(Y,{bubbles:!0}),t.attrName=r.name,t.prevValue=r.value||null,t.newValue=r.value=n[o]||null,null==t.prevValue?t[Q]=t.attrChange=0:t.MODIFICATION=t.attrChange=1,je.call(n,t))};e.value=function(e,l,a){e===Y&&this[j]&&this.setAttribute!==r&&(this[_]={className:{name:\"class\",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,\"propertychange\",o)),t.call(this,e,l,a)},de(Re,k,e)}()):Ve||(ue[k](Y,Je),ue.setAttribute(_,1),ue.removeAttribute(_),ot&&(O=function(e){var t,n,r,o=this;if(o===e.target){t=o[_],o[_]=n=D(o);for(r in n){if(!(r in t))return N(0,o,r,t[r],n[r],Q);if(n[r]!==t[r])return N(1,o,r,t[r],n[r],\"MODIFICATION\")}for(r in t)if(!(r in n))return N(2,o,r,t[r],n[r],W)}},N=function(e,t,n,r,o,l){var a={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:o};a[l]=e,u(a)},D=function(e){for(var t,n,r={},o=e.attributes,l=0,a=o.length;l<a;l++)t=o[l],\"setAttribute\"!==(n=t.name)&&(r[n]=t.value);return r})),y[R]=function(e,t){if(n=e.toUpperCase(),nt&&(nt=!1,Ve?(I=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new Ve(function(r){for(var o,l,a,i=0,u=r.length;i<u;i++)o=r[i],\"childList\"===o.type?(n(o.addedNodes,e),n(o.removedNodes,t)):(l=o.target,at&&l[j]&&\"style\"!==o.attributeName&&(a=Ge.call(l,o.attributeName))!==o.oldValue&&l[j](o.attributeName,o.oldValue,a))})}(l(x),l(B)),F=function(e){return I.observe(e,{childList:!0,subtree:!0}),e},F(y),qe&&(Re.attachShadow=function(){return F(qe.apply(this,arguments))})):(A=[],y[k](\"DOMNodeInserted\",c(x)),y[k](\"DOMNodeRemoved\",c(B))),y[k](J,s),y[k](\"readystatechange\",s),y.importNode=function(e,t){switch(e.nodeType){case 1:return f(y,Qe,[e,!!t]);case 11:for(var n=y.createDocumentFragment(),r=e.childNodes,o=r.length,l=0;l<o;l++)n.appendChild(y.importNode(r[l],!!t));return n;default:return Be.call(e,!!t)}},Re.cloneNode=function(e){return f(this,Be,[!!e])}),rt)return rt=!1;if(-2<ce.call(le,ne+n)+ce.call(le,te+n)&&h(e),!re.test(n)||-1<ce.call(oe,n))throw new Error(\"The type \"+e+\" is invalid\");var n,o,a=function(){return u?y.createElement(m,n):y.createElement(m)},i=t||se,u=me.call(i,Z),m=u?t[Z].toUpperCase():n;return u&&-1<ce.call(le,te+m)&&h(m),o=le.push((u?ne:te)+n)-1,ie=ie.concat(ie.length?\",\":\"\",u?m+'[is=\"'+e.toLowerCase()+'\"]':m),a.prototype=ae[o]=me.call(i,\"prototype\")?i.prototype:Fe(Re),ie.length&&r(y.querySelectorAll(ie),x),a},y.createElement=We=function(e,t){var n=v(t),r=n?$e.call(y,e,Ie(n)):$e.call(y,e),o=\"\"+e,l=ce.call(le,(n?ne:te)+(n||o).toUpperCase()),a=-1<l;return n&&(r.setAttribute(\"is\",n=n.toLowerCase()),a&&(a=i(o.toUpperCase(),n))),at=!y.createElement.innerHTMLHelper,a&&V(r,ae[l]),r}),addEventListener(\"beforeunload\",function(){delete y.createElement,delete y.importNode,delete y[R]},!1),L.prototype={constructor:L,define:be?function(e,t,n){if(n)M(e,t,n);else{var r=e.toUpperCase();Oe[r]={constructor:t,create:[r]},De.set(t,r),ge.define(e,t)}}:M,get:be?function(e){return ge.get(e)||E(e)}:E,whenDefined:be?function(e){return we.race([ge.whenDefined(e),g(e)])}:g},!ge||/^force/.test(t.type))b();else if(!t.noBuiltIn)try{!function(t,n,r){var o=new RegExp(\"^<a\\\\s+is=('|\\\")\"+r+\"\\\\1></a>$\");if(n[Z]=\"a\",t.prototype=Fe(Pe.prototype),t.prototype.constructor=t,e.customElements.define(r,t,n),!o.test(y.createElement(\"a\",{is:r}).outerHTML)||!o.test((new t).outerHTML))throw n}(function st(){return Reflect.construct(Pe,[],st)},{},\"document-register-element-a\"+U)}catch(it){b()}if(!t.noBuiltIn)try{if($e.call(y,\"a\",\"a\").outerHTML.indexOf(\"is\")<0)throw{}}catch(ut){Ie=function(e){return{is:e.toLowerCase()}}}}(window);\n\n\n//# sourceURL=webpack:///./node_modules/document-register-element/build/document-register-element.js?");

/***/ }),

/***/ "./node_modules/es6-object-assign/index.js":
/*!*************************************************!*\
  !*** ./node_modules/es6-object-assign/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Code refactored from Mozilla Developer Network:\n * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign\n */\n\n\n\nfunction assign(target, firstSource) {\n  if (target === undefined || target === null) {\n    throw new TypeError('Cannot convert first argument to object');\n  }\n\n  var to = Object(target);\n  for (var i = 1; i < arguments.length; i++) {\n    var nextSource = arguments[i];\n    if (nextSource === undefined || nextSource === null) {\n      continue;\n    }\n\n    var keysArray = Object.keys(Object(nextSource));\n    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {\n      var nextKey = keysArray[nextIndex];\n      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);\n      if (desc !== undefined && desc.enumerable) {\n        to[nextKey] = nextSource[nextKey];\n      }\n    }\n  }\n  return to;\n}\n\nfunction polyfill() {\n  if (!Object.assign) {\n    Object.defineProperty(Object, 'assign', {\n      enumerable: false,\n      configurable: true,\n      writable: true,\n      value: assign\n    });\n  }\n}\n\nmodule.exports = {\n  assign: assign,\n  polyfill: polyfill\n};\n\n\n//# sourceURL=webpack:///./node_modules/es6-object-assign/index.js?");

/***/ }),

/***/ "./node_modules/fastdom/fastdom.js":
/*!*****************************************!*\
  !*** ./node_modules/fastdom/fastdom.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;!(function(win) {\n\n/**\n * FastDom\n *\n * Eliminates layout thrashing\n * by batching DOM read/write\n * interactions.\n *\n * @author Wilson Page <wilsonpage@me.com>\n * @author Kornel Lesinski <kornel.lesinski@ft.com>\n */\n\n'use strict';\n\n/**\n * Mini logger\n *\n * @return {Function}\n */\nvar debug = 0 ? undefined : function() {};\n\n/**\n * Normalized rAF\n *\n * @type {Function}\n */\nvar raf = win.requestAnimationFrame\n  || win.webkitRequestAnimationFrame\n  || win.mozRequestAnimationFrame\n  || win.msRequestAnimationFrame\n  || function(cb) { return setTimeout(cb, 16); };\n\n/**\n * Initialize a `FastDom`.\n *\n * @constructor\n */\nfunction FastDom() {\n  var self = this;\n  self.reads = [];\n  self.writes = [];\n  self.raf = raf.bind(win); // test hook\n  debug('initialized', self);\n}\n\nFastDom.prototype = {\n  constructor: FastDom,\n\n  /**\n   * Adds a job to the read batch and\n   * schedules a new frame if need be.\n   *\n   * @param  {Function} fn\n   * @param  {Object} ctx the context to be bound to `fn` (optional).\n   * @public\n   */\n  measure: function(fn, ctx) {\n    debug('measure');\n    var task = !ctx ? fn : fn.bind(ctx);\n    this.reads.push(task);\n    scheduleFlush(this);\n    return task;\n  },\n\n  /**\n   * Adds a job to the\n   * write batch and schedules\n   * a new frame if need be.\n   *\n   * @param  {Function} fn\n   * @param  {Object} ctx the context to be bound to `fn` (optional).\n   * @public\n   */\n  mutate: function(fn, ctx) {\n    debug('mutate');\n    var task = !ctx ? fn : fn.bind(ctx);\n    this.writes.push(task);\n    scheduleFlush(this);\n    return task;\n  },\n\n  /**\n   * Clears a scheduled 'read' or 'write' task.\n   *\n   * @param {Object} task\n   * @return {Boolean} success\n   * @public\n   */\n  clear: function(task) {\n    debug('clear', task);\n    return remove(this.reads, task) || remove(this.writes, task);\n  },\n\n  /**\n   * Extend this FastDom with some\n   * custom functionality.\n   *\n   * Because fastdom must *always* be a\n   * singleton, we're actually extending\n   * the fastdom instance. This means tasks\n   * scheduled by an extension still enter\n   * fastdom's global task queue.\n   *\n   * The 'super' instance can be accessed\n   * from `this.fastdom`.\n   *\n   * @example\n   *\n   * var myFastdom = fastdom.extend({\n   *   initialize: function() {\n   *     // runs on creation\n   *   },\n   *\n   *   // override a method\n   *   measure: function(fn) {\n   *     // do extra stuff ...\n   *\n   *     // then call the original\n   *     return this.fastdom.measure(fn);\n   *   },\n   *\n   *   ...\n   * });\n   *\n   * @param  {Object} props  properties to mixin\n   * @return {FastDom}\n   */\n  extend: function(props) {\n    debug('extend', props);\n    if (typeof props != 'object') throw new Error('expected object');\n\n    var child = Object.create(this);\n    mixin(child, props);\n    child.fastdom = this;\n\n    // run optional creation hook\n    if (child.initialize) child.initialize();\n\n    return child;\n  },\n\n  // override this with a function\n  // to prevent Errors in console\n  // when tasks throw\n  catch: null\n};\n\n/**\n * Schedules a new read/write\n * batch if one isn't pending.\n *\n * @private\n */\nfunction scheduleFlush(fastdom) {\n  if (!fastdom.scheduled) {\n    fastdom.scheduled = true;\n    fastdom.raf(flush.bind(null, fastdom));\n    debug('flush scheduled');\n  }\n}\n\n/**\n * Runs queued `read` and `write` tasks.\n *\n * Errors are caught and thrown by default.\n * If a `.catch` function has been defined\n * it is called instead.\n *\n * @private\n */\nfunction flush(fastdom) {\n  debug('flush');\n\n  var writes = fastdom.writes;\n  var reads = fastdom.reads;\n  var error;\n\n  try {\n    debug('flushing reads', reads.length);\n    runTasks(reads);\n    debug('flushing writes', writes.length);\n    runTasks(writes);\n  } catch (e) { error = e; }\n\n  fastdom.scheduled = false;\n\n  // If the batch errored we may still have tasks queued\n  if (reads.length || writes.length) scheduleFlush(fastdom);\n\n  if (error) {\n    debug('task errored', error.message);\n    if (fastdom.catch) fastdom.catch(error);\n    else throw error;\n  }\n}\n\n/**\n * We run this inside a try catch\n * so that if any jobs error, we\n * are able to recover and continue\n * to flush the batch until it's empty.\n *\n * @private\n */\nfunction runTasks(tasks) {\n  debug('run tasks');\n  var task; while (task = tasks.shift()) task();\n}\n\n/**\n * Remove an item from an Array.\n *\n * @param  {Array} array\n * @param  {*} item\n * @return {Boolean}\n */\nfunction remove(array, item) {\n  var index = array.indexOf(item);\n  return !!~index && !!array.splice(index, 1);\n}\n\n/**\n * Mixin own properties of source\n * object into the target.\n *\n * @param  {Object} target\n * @param  {Object} source\n */\nfunction mixin(target, source) {\n  for (var key in source) {\n    if (source.hasOwnProperty(key)) target[key] = source[key];\n  }\n}\n\n// There should never be more than\n// one instance of `FastDom` in an app\nvar exports = win.fastdom = (win.fastdom || new FastDom()); // jshint ignore:line\n\n// Expose to CJS & AMD\nif (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return exports; }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\nelse {}\n\n})( typeof window !== 'undefined' ? window : this);\n\n\n//# sourceURL=webpack:///./node_modules/fastdom/fastdom.js?");

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*!\n * Determine if an object is a Buffer\n *\n * @author   Feross Aboukhadijeh <https://feross.org>\n * @license  MIT\n */\n\nmodule.exports = function isBuffer (obj) {\n  return obj != null && obj.constructor != null &&\n    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)\n}\n\n\n//# sourceURL=webpack:///./node_modules/is-buffer/index.js?");

/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var hashClear = __webpack_require__(/*! ./_hashClear */ \"./node_modules/lodash/_hashClear.js\"),\n    hashDelete = __webpack_require__(/*! ./_hashDelete */ \"./node_modules/lodash/_hashDelete.js\"),\n    hashGet = __webpack_require__(/*! ./_hashGet */ \"./node_modules/lodash/_hashGet.js\"),\n    hashHas = __webpack_require__(/*! ./_hashHas */ \"./node_modules/lodash/_hashHas.js\"),\n    hashSet = __webpack_require__(/*! ./_hashSet */ \"./node_modules/lodash/_hashSet.js\");\n\n/**\n * Creates a hash object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Hash(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `Hash`.\nHash.prototype.clear = hashClear;\nHash.prototype['delete'] = hashDelete;\nHash.prototype.get = hashGet;\nHash.prototype.has = hashHas;\nHash.prototype.set = hashSet;\n\nmodule.exports = Hash;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_Hash.js?");

/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ \"./node_modules/lodash/_listCacheClear.js\"),\n    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ \"./node_modules/lodash/_listCacheDelete.js\"),\n    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ \"./node_modules/lodash/_listCacheGet.js\"),\n    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ \"./node_modules/lodash/_listCacheHas.js\"),\n    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ \"./node_modules/lodash/_listCacheSet.js\");\n\n/**\n * Creates an list cache object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction ListCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `ListCache`.\nListCache.prototype.clear = listCacheClear;\nListCache.prototype['delete'] = listCacheDelete;\nListCache.prototype.get = listCacheGet;\nListCache.prototype.has = listCacheHas;\nListCache.prototype.set = listCacheSet;\n\nmodule.exports = ListCache;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_ListCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Map = getNative(root, 'Map');\n\nmodule.exports = Map;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_Map.js?");

/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ \"./node_modules/lodash/_mapCacheClear.js\"),\n    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ \"./node_modules/lodash/_mapCacheDelete.js\"),\n    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ \"./node_modules/lodash/_mapCacheGet.js\"),\n    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ \"./node_modules/lodash/_mapCacheHas.js\"),\n    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ \"./node_modules/lodash/_mapCacheSet.js\");\n\n/**\n * Creates a map cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction MapCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `MapCache`.\nMapCache.prototype.clear = mapCacheClear;\nMapCache.prototype['delete'] = mapCacheDelete;\nMapCache.prototype.get = mapCacheGet;\nMapCache.prototype.has = mapCacheHas;\nMapCache.prototype.set = mapCacheSet;\n\nmodule.exports = MapCache;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_MapCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Symbol = root.Symbol;\n\nmodule.exports = Symbol;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_Symbol.js?");

/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A faster alternative to `Function#apply`, this function invokes `func`\n * with the `this` binding of `thisArg` and the arguments of `args`.\n *\n * @private\n * @param {Function} func The function to invoke.\n * @param {*} thisArg The `this` binding of `func`.\n * @param {Array} args The arguments to invoke `func` with.\n * @returns {*} Returns the result of `func`.\n */\nfunction apply(func, thisArg, args) {\n  switch (args.length) {\n    case 0: return func.call(thisArg);\n    case 1: return func.call(thisArg, args[0]);\n    case 2: return func.call(thisArg, args[0], args[1]);\n    case 3: return func.call(thisArg, args[0], args[1], args[2]);\n  }\n  return func.apply(thisArg, args);\n}\n\nmodule.exports = apply;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_apply.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseTimes = __webpack_require__(/*! ./_baseTimes */ \"./node_modules/lodash/_baseTimes.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isIndex = __webpack_require__(/*! ./_isIndex */ \"./node_modules/lodash/_isIndex.js\"),\n    isTypedArray = __webpack_require__(/*! ./isTypedArray */ \"./node_modules/lodash/isTypedArray.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Creates an array of the enumerable property names of the array-like `value`.\n *\n * @private\n * @param {*} value The value to query.\n * @param {boolean} inherited Specify returning inherited property names.\n * @returns {Array} Returns the array of property names.\n */\nfunction arrayLikeKeys(value, inherited) {\n  var isArr = isArray(value),\n      isArg = !isArr && isArguments(value),\n      isBuff = !isArr && !isArg && isBuffer(value),\n      isType = !isArr && !isArg && !isBuff && isTypedArray(value),\n      skipIndexes = isArr || isArg || isBuff || isType,\n      result = skipIndexes ? baseTimes(value.length, String) : [],\n      length = result.length;\n\n  for (var key in value) {\n    if ((inherited || hasOwnProperty.call(value, key)) &&\n        !(skipIndexes && (\n           // Safari 9 has enumerable `arguments.length` in strict mode.\n           key == 'length' ||\n           // Node.js 0.10 has enumerable non-index properties on buffers.\n           (isBuff && (key == 'offset' || key == 'parent')) ||\n           // PhantomJS 2 has enumerable non-index properties on typed arrays.\n           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||\n           // Skip index properties.\n           isIndex(key, length)\n        ))) {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = arrayLikeKeys;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_arrayLikeKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.map` for arrays without support for iteratee\n * shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns the new mapped array.\n */\nfunction arrayMap(array, iteratee) {\n  var index = -1,\n      length = array == null ? 0 : array.length,\n      result = Array(length);\n\n  while (++index < length) {\n    result[index] = iteratee(array[index], index, array);\n  }\n  return result;\n}\n\nmodule.exports = arrayMap;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_arrayMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\"),\n    eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Assigns `value` to `key` of `object` if the existing value is not equivalent\n * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * for equality comparisons.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction assignValue(object, key, value) {\n  var objValue = object[key];\n  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||\n      (value === undefined && !(key in object))) {\n    baseAssignValue(object, key, value);\n  }\n}\n\nmodule.exports = assignValue;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_assignValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/**\n * Gets the index at which the `key` is found in `array` of key-value pairs.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} key The key to search for.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction assocIndexOf(array, key) {\n  var length = array.length;\n  while (length--) {\n    if (eq(array[length][0], key)) {\n      return length;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = assocIndexOf;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_assocIndexOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var defineProperty = __webpack_require__(/*! ./_defineProperty */ \"./node_modules/lodash/_defineProperty.js\");\n\n/**\n * The base implementation of `assignValue` and `assignMergeValue` without\n * value checks.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction baseAssignValue(object, key, value) {\n  if (key == '__proto__' && defineProperty) {\n    defineProperty(object, key, {\n      'configurable': true,\n      'enumerable': true,\n      'value': value,\n      'writable': true\n    });\n  } else {\n    object[key] = value;\n  }\n}\n\nmodule.exports = baseAssignValue;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseAssignValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/**\n * The base implementation of `_.get` without support for default values.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Array|string} path The path of the property to get.\n * @returns {*} Returns the resolved value.\n */\nfunction baseGet(object, path) {\n  path = castPath(path, object);\n\n  var index = 0,\n      length = path.length;\n\n  while (object != null && index < length) {\n    object = object[toKey(path[index++])];\n  }\n  return (index && index == length) ? object : undefined;\n}\n\nmodule.exports = baseGet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    getRawTag = __webpack_require__(/*! ./_getRawTag */ \"./node_modules/lodash/_getRawTag.js\"),\n    objectToString = __webpack_require__(/*! ./_objectToString */ \"./node_modules/lodash/_objectToString.js\");\n\n/** `Object#toString` result references. */\nvar nullTag = '[object Null]',\n    undefinedTag = '[object Undefined]';\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * The base implementation of `getTag` without fallbacks for buggy environments.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nfunction baseGetTag(value) {\n  if (value == null) {\n    return value === undefined ? undefinedTag : nullTag;\n  }\n  return (symToStringTag && symToStringTag in Object(value))\n    ? getRawTag(value)\n    : objectToString(value);\n}\n\nmodule.exports = baseGetTag;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseGetTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]';\n\n/**\n * The base implementation of `_.isArguments`.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n */\nfunction baseIsArguments(value) {\n  return isObjectLike(value) && baseGetTag(value) == argsTag;\n}\n\nmodule.exports = baseIsArguments;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseIsArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isMasked = __webpack_require__(/*! ./_isMasked */ \"./node_modules/lodash/_isMasked.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    toSource = __webpack_require__(/*! ./_toSource */ \"./node_modules/lodash/_toSource.js\");\n\n/**\n * Used to match `RegExp`\n * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).\n */\nvar reRegExpChar = /[\\\\^$.*+?()[\\]{}|]/g;\n\n/** Used to detect host constructors (Safari). */\nvar reIsHostCtor = /^\\[object .+?Constructor\\]$/;\n\n/** Used for built-in method references. */\nvar funcProto = Function.prototype,\n    objectProto = Object.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Used to detect if a method is native. */\nvar reIsNative = RegExp('^' +\n  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\\\$&')\n  .replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g, '$1.*?') + '$'\n);\n\n/**\n * The base implementation of `_.isNative` without bad shim checks.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a native function,\n *  else `false`.\n */\nfunction baseIsNative(value) {\n  if (!isObject(value) || isMasked(value)) {\n    return false;\n  }\n  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;\n  return pattern.test(toSource(value));\n}\n\nmodule.exports = baseIsNative;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseIsNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]',\n    arrayTag = '[object Array]',\n    boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    errorTag = '[object Error]',\n    funcTag = '[object Function]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    objectTag = '[object Object]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    weakMapTag = '[object WeakMap]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]',\n    float32Tag = '[object Float32Array]',\n    float64Tag = '[object Float64Array]',\n    int8Tag = '[object Int8Array]',\n    int16Tag = '[object Int16Array]',\n    int32Tag = '[object Int32Array]',\n    uint8Tag = '[object Uint8Array]',\n    uint8ClampedTag = '[object Uint8ClampedArray]',\n    uint16Tag = '[object Uint16Array]',\n    uint32Tag = '[object Uint32Array]';\n\n/** Used to identify `toStringTag` values of typed arrays. */\nvar typedArrayTags = {};\ntypedArrayTags[float32Tag] = typedArrayTags[float64Tag] =\ntypedArrayTags[int8Tag] = typedArrayTags[int16Tag] =\ntypedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =\ntypedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =\ntypedArrayTags[uint32Tag] = true;\ntypedArrayTags[argsTag] = typedArrayTags[arrayTag] =\ntypedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =\ntypedArrayTags[dataViewTag] = typedArrayTags[dateTag] =\ntypedArrayTags[errorTag] = typedArrayTags[funcTag] =\ntypedArrayTags[mapTag] = typedArrayTags[numberTag] =\ntypedArrayTags[objectTag] = typedArrayTags[regexpTag] =\ntypedArrayTags[setTag] = typedArrayTags[stringTag] =\ntypedArrayTags[weakMapTag] = false;\n\n/**\n * The base implementation of `_.isTypedArray` without Node.js optimizations.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.\n */\nfunction baseIsTypedArray(value) {\n  return isObjectLike(value) &&\n    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];\n}\n\nmodule.exports = baseIsTypedArray;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseIsTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseKeysIn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseKeysIn.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    isPrototype = __webpack_require__(/*! ./_isPrototype */ \"./node_modules/lodash/_isPrototype.js\"),\n    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ \"./node_modules/lodash/_nativeKeysIn.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n */\nfunction baseKeysIn(object) {\n  if (!isObject(object)) {\n    return nativeKeysIn(object);\n  }\n  var isProto = isPrototype(object),\n      result = [];\n\n  for (var key in object) {\n    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseKeysIn;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseKeysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\"),\n    overRest = __webpack_require__(/*! ./_overRest */ \"./node_modules/lodash/_overRest.js\"),\n    setToString = __webpack_require__(/*! ./_setToString */ \"./node_modules/lodash/_setToString.js\");\n\n/**\n * The base implementation of `_.rest` which doesn't validate or coerce arguments.\n *\n * @private\n * @param {Function} func The function to apply a rest parameter to.\n * @param {number} [start=func.length-1] The start position of the rest parameter.\n * @returns {Function} Returns the new function.\n */\nfunction baseRest(func, start) {\n  return setToString(overRest(func, start, identity), func + '');\n}\n\nmodule.exports = baseRest;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseRest.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseSetToString.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseSetToString.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var constant = __webpack_require__(/*! ./constant */ \"./node_modules/lodash/constant.js\"),\n    defineProperty = __webpack_require__(/*! ./_defineProperty */ \"./node_modules/lodash/_defineProperty.js\"),\n    identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\");\n\n/**\n * The base implementation of `setToString` without support for hot loop shorting.\n *\n * @private\n * @param {Function} func The function to modify.\n * @param {Function} string The `toString` result.\n * @returns {Function} Returns `func`.\n */\nvar baseSetToString = !defineProperty ? identity : function(func, string) {\n  return defineProperty(func, 'toString', {\n    'configurable': true,\n    'enumerable': false,\n    'value': constant(string),\n    'writable': true\n  });\n};\n\nmodule.exports = baseSetToString;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseSetToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.times` without support for iteratee shorthands\n * or max array length checks.\n *\n * @private\n * @param {number} n The number of times to invoke `iteratee`.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns the array of results.\n */\nfunction baseTimes(n, iteratee) {\n  var index = -1,\n      result = Array(n);\n\n  while (++index < n) {\n    result[index] = iteratee(index);\n  }\n  return result;\n}\n\nmodule.exports = baseTimes;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseTimes.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseToString.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseToString.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    arrayMap = __webpack_require__(/*! ./_arrayMap */ \"./node_modules/lodash/_arrayMap.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0;\n\n/** Used to convert symbols to primitives and strings. */\nvar symbolProto = Symbol ? Symbol.prototype : undefined,\n    symbolToString = symbolProto ? symbolProto.toString : undefined;\n\n/**\n * The base implementation of `_.toString` which doesn't convert nullish\n * values to empty strings.\n *\n * @private\n * @param {*} value The value to process.\n * @returns {string} Returns the string.\n */\nfunction baseToString(value) {\n  // Exit early for strings to avoid a performance hit in some environments.\n  if (typeof value == 'string') {\n    return value;\n  }\n  if (isArray(value)) {\n    // Recursively convert values (susceptible to call stack limits).\n    return arrayMap(value, baseToString) + '';\n  }\n  if (isSymbol(value)) {\n    return symbolToString ? symbolToString.call(value) : '';\n  }\n  var result = (value + '');\n  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;\n}\n\nmodule.exports = baseToString;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.unary` without support for storing metadata.\n *\n * @private\n * @param {Function} func The function to cap arguments for.\n * @returns {Function} Returns the new capped function.\n */\nfunction baseUnary(func) {\n  return function(value) {\n    return func(value);\n  };\n}\n\nmodule.exports = baseUnary;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseUnary.js?");

/***/ }),

/***/ "./node_modules/lodash/_castPath.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_castPath.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isKey = __webpack_require__(/*! ./_isKey */ \"./node_modules/lodash/_isKey.js\"),\n    stringToPath = __webpack_require__(/*! ./_stringToPath */ \"./node_modules/lodash/_stringToPath.js\"),\n    toString = __webpack_require__(/*! ./toString */ \"./node_modules/lodash/toString.js\");\n\n/**\n * Casts `value` to a path array if it's not one.\n *\n * @private\n * @param {*} value The value to inspect.\n * @param {Object} [object] The object to query keys on.\n * @returns {Array} Returns the cast property path array.\n */\nfunction castPath(value, object) {\n  if (isArray(value)) {\n    return value;\n  }\n  return isKey(value, object) ? [value] : stringToPath(toString(value));\n}\n\nmodule.exports = castPath;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_castPath.js?");

/***/ }),

/***/ "./node_modules/lodash/_copyObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_copyObject.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assignValue = __webpack_require__(/*! ./_assignValue */ \"./node_modules/lodash/_assignValue.js\"),\n    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\");\n\n/**\n * Copies properties of `source` to `object`.\n *\n * @private\n * @param {Object} source The object to copy properties from.\n * @param {Array} props The property identifiers to copy.\n * @param {Object} [object={}] The object to copy properties to.\n * @param {Function} [customizer] The function to customize copied values.\n * @returns {Object} Returns `object`.\n */\nfunction copyObject(source, props, object, customizer) {\n  var isNew = !object;\n  object || (object = {});\n\n  var index = -1,\n      length = props.length;\n\n  while (++index < length) {\n    var key = props[index];\n\n    var newValue = customizer\n      ? customizer(object[key], source[key], key, object, source)\n      : undefined;\n\n    if (newValue === undefined) {\n      newValue = source[key];\n    }\n    if (isNew) {\n      baseAssignValue(object, key, newValue);\n    } else {\n      assignValue(object, key, newValue);\n    }\n  }\n  return object;\n}\n\nmodule.exports = copyObject;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_copyObject.js?");

/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Used to detect overreaching core-js shims. */\nvar coreJsData = root['__core-js_shared__'];\n\nmodule.exports = coreJsData;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_coreJsData.js?");

/***/ }),

/***/ "./node_modules/lodash/_createAssigner.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createAssigner.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseRest = __webpack_require__(/*! ./_baseRest */ \"./node_modules/lodash/_baseRest.js\"),\n    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ \"./node_modules/lodash/_isIterateeCall.js\");\n\n/**\n * Creates a function like `_.assign`.\n *\n * @private\n * @param {Function} assigner The function to assign values.\n * @returns {Function} Returns the new assigner function.\n */\nfunction createAssigner(assigner) {\n  return baseRest(function(object, sources) {\n    var index = -1,\n        length = sources.length,\n        customizer = length > 1 ? sources[length - 1] : undefined,\n        guard = length > 2 ? sources[2] : undefined;\n\n    customizer = (assigner.length > 3 && typeof customizer == 'function')\n      ? (length--, customizer)\n      : undefined;\n\n    if (guard && isIterateeCall(sources[0], sources[1], guard)) {\n      customizer = length < 3 ? undefined : customizer;\n      length = 1;\n    }\n    object = Object(object);\n    while (++index < length) {\n      var source = sources[index];\n      if (source) {\n        assigner(object, source, index, customizer);\n      }\n    }\n    return object;\n  });\n}\n\nmodule.exports = createAssigner;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_createAssigner.js?");

/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\");\n\nvar defineProperty = (function() {\n  try {\n    var func = getNative(Object, 'defineProperty');\n    func({}, '', {});\n    return func;\n  } catch (e) {}\n}());\n\nmodule.exports = defineProperty;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_defineProperty.js?");

/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */\nvar freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n\nmodule.exports = freeGlobal;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../../../usr/local/lib/node_modules/webpack/buildin/global.js */ \"../../../../../../../../usr/local/lib/node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/lodash/_freeGlobal.js?");

/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isKeyable = __webpack_require__(/*! ./_isKeyable */ \"./node_modules/lodash/_isKeyable.js\");\n\n/**\n * Gets the data for `map`.\n *\n * @private\n * @param {Object} map The map to query.\n * @param {string} key The reference key.\n * @returns {*} Returns the map data.\n */\nfunction getMapData(map, key) {\n  var data = map.__data__;\n  return isKeyable(key)\n    ? data[typeof key == 'string' ? 'string' : 'hash']\n    : data.map;\n}\n\nmodule.exports = getMapData;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getMapData.js?");

/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ \"./node_modules/lodash/_baseIsNative.js\"),\n    getValue = __webpack_require__(/*! ./_getValue */ \"./node_modules/lodash/_getValue.js\");\n\n/**\n * Gets the native function at `key` of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {string} key The key of the method to get.\n * @returns {*} Returns the function if it's native, else `undefined`.\n */\nfunction getNative(object, key) {\n  var value = getValue(object, key);\n  return baseIsNative(value) ? value : undefined;\n}\n\nmodule.exports = getNative;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the raw `toStringTag`.\n */\nfunction getRawTag(value) {\n  var isOwn = hasOwnProperty.call(value, symToStringTag),\n      tag = value[symToStringTag];\n\n  try {\n    value[symToStringTag] = undefined;\n    var unmasked = true;\n  } catch (e) {}\n\n  var result = nativeObjectToString.call(value);\n  if (unmasked) {\n    if (isOwn) {\n      value[symToStringTag] = tag;\n    } else {\n      delete value[symToStringTag];\n    }\n  }\n  return result;\n}\n\nmodule.exports = getRawTag;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getRawTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the value at `key` of `object`.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {string} key The key of the property to get.\n * @returns {*} Returns the property value.\n */\nfunction getValue(object, key) {\n  return object == null ? undefined : object[key];\n}\n\nmodule.exports = getValue;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/**\n * Removes all key-value entries from the hash.\n *\n * @private\n * @name clear\n * @memberOf Hash\n */\nfunction hashClear() {\n  this.__data__ = nativeCreate ? nativeCreate(null) : {};\n  this.size = 0;\n}\n\nmodule.exports = hashClear;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_hashClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes `key` and its value from the hash.\n *\n * @private\n * @name delete\n * @memberOf Hash\n * @param {Object} hash The hash to modify.\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction hashDelete(key) {\n  var result = this.has(key) && delete this.__data__[key];\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = hashDelete;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_hashDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Gets the hash value for `key`.\n *\n * @private\n * @name get\n * @memberOf Hash\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction hashGet(key) {\n  var data = this.__data__;\n  if (nativeCreate) {\n    var result = data[key];\n    return result === HASH_UNDEFINED ? undefined : result;\n  }\n  return hasOwnProperty.call(data, key) ? data[key] : undefined;\n}\n\nmodule.exports = hashGet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_hashGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Checks if a hash value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Hash\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction hashHas(key) {\n  var data = this.__data__;\n  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);\n}\n\nmodule.exports = hashHas;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_hashHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/**\n * Sets the hash `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Hash\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the hash instance.\n */\nfunction hashSet(key, value) {\n  var data = this.__data__;\n  this.size += this.has(key) ? 0 : 1;\n  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;\n  return this;\n}\n\nmodule.exports = hashSet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_hashSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used as references for various `Number` constants. */\nvar MAX_SAFE_INTEGER = 9007199254740991;\n\n/** Used to detect unsigned integer values. */\nvar reIsUint = /^(?:0|[1-9]\\d*)$/;\n\n/**\n * Checks if `value` is a valid array-like index.\n *\n * @private\n * @param {*} value The value to check.\n * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.\n * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.\n */\nfunction isIndex(value, length) {\n  var type = typeof value;\n  length = length == null ? MAX_SAFE_INTEGER : length;\n\n  return !!length &&\n    (type == 'number' ||\n      (type != 'symbol' && reIsUint.test(value))) &&\n        (value > -1 && value % 1 == 0 && value < length);\n}\n\nmodule.exports = isIndex;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_isIndex.js?");

/***/ }),

/***/ "./node_modules/lodash/_isIterateeCall.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_isIterateeCall.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\"),\n    isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\"),\n    isIndex = __webpack_require__(/*! ./_isIndex */ \"./node_modules/lodash/_isIndex.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/**\n * Checks if the given arguments are from an iteratee call.\n *\n * @private\n * @param {*} value The potential iteratee value argument.\n * @param {*} index The potential iteratee index or key argument.\n * @param {*} object The potential iteratee object argument.\n * @returns {boolean} Returns `true` if the arguments are from an iteratee call,\n *  else `false`.\n */\nfunction isIterateeCall(value, index, object) {\n  if (!isObject(object)) {\n    return false;\n  }\n  var type = typeof index;\n  if (type == 'number'\n        ? (isArrayLike(object) && isIndex(index, object.length))\n        : (type == 'string' && index in object)\n      ) {\n    return eq(object[index], value);\n  }\n  return false;\n}\n\nmodule.exports = isIterateeCall;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_isIterateeCall.js?");

/***/ }),

/***/ "./node_modules/lodash/_isKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_isKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used to match property names within property paths. */\nvar reIsDeepProp = /\\.|\\[(?:[^[\\]]*|([\"'])(?:(?!\\1)[^\\\\]|\\\\.)*?\\1)\\]/,\n    reIsPlainProp = /^\\w*$/;\n\n/**\n * Checks if `value` is a property name and not a property path.\n *\n * @private\n * @param {*} value The value to check.\n * @param {Object} [object] The object to query keys on.\n * @returns {boolean} Returns `true` if `value` is a property name, else `false`.\n */\nfunction isKey(value, object) {\n  if (isArray(value)) {\n    return false;\n  }\n  var type = typeof value;\n  if (type == 'number' || type == 'symbol' || type == 'boolean' ||\n      value == null || isSymbol(value)) {\n    return true;\n  }\n  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||\n    (object != null && value in Object(object));\n}\n\nmodule.exports = isKey;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_isKey.js?");

/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is suitable for use as unique object key.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is suitable, else `false`.\n */\nfunction isKeyable(value) {\n  var type = typeof value;\n  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')\n    ? (value !== '__proto__')\n    : (value === null);\n}\n\nmodule.exports = isKeyable;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_isKeyable.js?");

/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var coreJsData = __webpack_require__(/*! ./_coreJsData */ \"./node_modules/lodash/_coreJsData.js\");\n\n/** Used to detect methods masquerading as native. */\nvar maskSrcKey = (function() {\n  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');\n  return uid ? ('Symbol(src)_1.' + uid) : '';\n}());\n\n/**\n * Checks if `func` has its source masked.\n *\n * @private\n * @param {Function} func The function to check.\n * @returns {boolean} Returns `true` if `func` is masked, else `false`.\n */\nfunction isMasked(func) {\n  return !!maskSrcKey && (maskSrcKey in func);\n}\n\nmodule.exports = isMasked;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_isMasked.js?");

/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Checks if `value` is likely a prototype object.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.\n */\nfunction isPrototype(value) {\n  var Ctor = value && value.constructor,\n      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;\n\n  return value === proto;\n}\n\nmodule.exports = isPrototype;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_isPrototype.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes all key-value entries from the list cache.\n *\n * @private\n * @name clear\n * @memberOf ListCache\n */\nfunction listCacheClear() {\n  this.__data__ = [];\n  this.size = 0;\n}\n\nmodule.exports = listCacheClear;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_listCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/** Used for built-in method references. */\nvar arrayProto = Array.prototype;\n\n/** Built-in value references. */\nvar splice = arrayProto.splice;\n\n/**\n * Removes `key` and its value from the list cache.\n *\n * @private\n * @name delete\n * @memberOf ListCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction listCacheDelete(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    return false;\n  }\n  var lastIndex = data.length - 1;\n  if (index == lastIndex) {\n    data.pop();\n  } else {\n    splice.call(data, index, 1);\n  }\n  --this.size;\n  return true;\n}\n\nmodule.exports = listCacheDelete;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_listCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Gets the list cache value for `key`.\n *\n * @private\n * @name get\n * @memberOf ListCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction listCacheGet(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  return index < 0 ? undefined : data[index][1];\n}\n\nmodule.exports = listCacheGet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_listCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Checks if a list cache value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf ListCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction listCacheHas(key) {\n  return assocIndexOf(this.__data__, key) > -1;\n}\n\nmodule.exports = listCacheHas;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_listCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Sets the list cache `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf ListCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the list cache instance.\n */\nfunction listCacheSet(key, value) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    ++this.size;\n    data.push([key, value]);\n  } else {\n    data[index][1] = value;\n  }\n  return this;\n}\n\nmodule.exports = listCacheSet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_listCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Hash = __webpack_require__(/*! ./_Hash */ \"./node_modules/lodash/_Hash.js\"),\n    ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\");\n\n/**\n * Removes all key-value entries from the map.\n *\n * @private\n * @name clear\n * @memberOf MapCache\n */\nfunction mapCacheClear() {\n  this.size = 0;\n  this.__data__ = {\n    'hash': new Hash,\n    'map': new (Map || ListCache),\n    'string': new Hash\n  };\n}\n\nmodule.exports = mapCacheClear;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_mapCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Removes `key` and its value from the map.\n *\n * @private\n * @name delete\n * @memberOf MapCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction mapCacheDelete(key) {\n  var result = getMapData(this, key)['delete'](key);\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = mapCacheDelete;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_mapCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Gets the map value for `key`.\n *\n * @private\n * @name get\n * @memberOf MapCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction mapCacheGet(key) {\n  return getMapData(this, key).get(key);\n}\n\nmodule.exports = mapCacheGet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_mapCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Checks if a map value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf MapCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction mapCacheHas(key) {\n  return getMapData(this, key).has(key);\n}\n\nmodule.exports = mapCacheHas;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_mapCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Sets the map `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf MapCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the map cache instance.\n */\nfunction mapCacheSet(key, value) {\n  var data = getMapData(this, key),\n      size = data.size;\n\n  data.set(key, value);\n  this.size += data.size == size ? 0 : 1;\n  return this;\n}\n\nmodule.exports = mapCacheSet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_mapCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_memoizeCapped.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_memoizeCapped.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var memoize = __webpack_require__(/*! ./memoize */ \"./node_modules/lodash/memoize.js\");\n\n/** Used as the maximum memoize cache size. */\nvar MAX_MEMOIZE_SIZE = 500;\n\n/**\n * A specialized version of `_.memoize` which clears the memoized function's\n * cache when it exceeds `MAX_MEMOIZE_SIZE`.\n *\n * @private\n * @param {Function} func The function to have its output memoized.\n * @returns {Function} Returns the new memoized function.\n */\nfunction memoizeCapped(func) {\n  var result = memoize(func, function(key) {\n    if (cache.size === MAX_MEMOIZE_SIZE) {\n      cache.clear();\n    }\n    return key;\n  });\n\n  var cache = result.cache;\n  return result;\n}\n\nmodule.exports = memoizeCapped;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_memoizeCapped.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\");\n\n/* Built-in method references that are verified to be native. */\nvar nativeCreate = getNative(Object, 'create');\n\nmodule.exports = nativeCreate;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_nativeCreate.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeKeysIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This function is like\n * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)\n * except that it includes inherited enumerable properties.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n */\nfunction nativeKeysIn(object) {\n  var result = [];\n  if (object != null) {\n    for (var key in Object(object)) {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = nativeKeysIn;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_nativeKeysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports =  true && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Detect free variable `process` from Node.js. */\nvar freeProcess = moduleExports && freeGlobal.process;\n\n/** Used to access faster Node.js helpers. */\nvar nodeUtil = (function() {\n  try {\n    // Use `util.types` for Node.js 10+.\n    var types = freeModule && freeModule.require && freeModule.require('util').types;\n\n    if (types) {\n      return types;\n    }\n\n    // Legacy `process.binding('util')` for Node.js < 10.\n    return freeProcess && freeProcess.binding && freeProcess.binding('util');\n  } catch (e) {}\n}());\n\nmodule.exports = nodeUtil;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../../../usr/local/lib/node_modules/webpack/buildin/module.js */ \"../../../../../../../../usr/local/lib/node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./node_modules/lodash/_nodeUtil.js?");

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/**\n * Converts `value` to a string using `Object.prototype.toString`.\n *\n * @private\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n */\nfunction objectToString(value) {\n  return nativeObjectToString.call(value);\n}\n\nmodule.exports = objectToString;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_objectToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_overRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var apply = __webpack_require__(/*! ./_apply */ \"./node_modules/lodash/_apply.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeMax = Math.max;\n\n/**\n * A specialized version of `baseRest` which transforms the rest array.\n *\n * @private\n * @param {Function} func The function to apply a rest parameter to.\n * @param {number} [start=func.length-1] The start position of the rest parameter.\n * @param {Function} transform The rest array transform.\n * @returns {Function} Returns the new function.\n */\nfunction overRest(func, start, transform) {\n  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);\n  return function() {\n    var args = arguments,\n        index = -1,\n        length = nativeMax(args.length - start, 0),\n        array = Array(length);\n\n    while (++index < length) {\n      array[index] = args[start + index];\n    }\n    index = -1;\n    var otherArgs = Array(start + 1);\n    while (++index < start) {\n      otherArgs[index] = args[index];\n    }\n    otherArgs[start] = transform(array);\n    return apply(func, this, otherArgs);\n  };\n}\n\nmodule.exports = overRest;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_overRest.js?");

/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `self`. */\nvar freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n\n/** Used as a reference to the global object. */\nvar root = freeGlobal || freeSelf || Function('return this')();\n\nmodule.exports = root;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_root.js?");

/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ \"./node_modules/lodash/_baseSetToString.js\"),\n    shortOut = __webpack_require__(/*! ./_shortOut */ \"./node_modules/lodash/_shortOut.js\");\n\n/**\n * Sets the `toString` method of `func` to return `string`.\n *\n * @private\n * @param {Function} func The function to modify.\n * @param {Function} string The `toString` result.\n * @returns {Function} Returns `func`.\n */\nvar setToString = shortOut(baseSetToString);\n\nmodule.exports = setToString;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_setToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_shortOut.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_shortOut.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to detect hot functions by number of calls within a span of milliseconds. */\nvar HOT_COUNT = 800,\n    HOT_SPAN = 16;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeNow = Date.now;\n\n/**\n * Creates a function that'll short out and invoke `identity` instead\n * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`\n * milliseconds.\n *\n * @private\n * @param {Function} func The function to restrict.\n * @returns {Function} Returns the new shortable function.\n */\nfunction shortOut(func) {\n  var count = 0,\n      lastCalled = 0;\n\n  return function() {\n    var stamp = nativeNow(),\n        remaining = HOT_SPAN - (stamp - lastCalled);\n\n    lastCalled = stamp;\n    if (remaining > 0) {\n      if (++count >= HOT_COUNT) {\n        return arguments[0];\n      }\n    } else {\n      count = 0;\n    }\n    return func.apply(undefined, arguments);\n  };\n}\n\nmodule.exports = shortOut;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_shortOut.js?");

/***/ }),

/***/ "./node_modules/lodash/_stringToPath.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_stringToPath.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var memoizeCapped = __webpack_require__(/*! ./_memoizeCapped */ \"./node_modules/lodash/_memoizeCapped.js\");\n\n/** Used to match property names within property paths. */\nvar rePropName = /[^.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))/g;\n\n/** Used to match backslashes in property paths. */\nvar reEscapeChar = /\\\\(\\\\)?/g;\n\n/**\n * Converts `string` to a property path array.\n *\n * @private\n * @param {string} string The string to convert.\n * @returns {Array} Returns the property path array.\n */\nvar stringToPath = memoizeCapped(function(string) {\n  var result = [];\n  if (string.charCodeAt(0) === 46 /* . */) {\n    result.push('');\n  }\n  string.replace(rePropName, function(match, number, quote, subString) {\n    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));\n  });\n  return result;\n});\n\nmodule.exports = stringToPath;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_stringToPath.js?");

/***/ }),

/***/ "./node_modules/lodash/_toKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_toKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0;\n\n/**\n * Converts `value` to a string key if it's not a string or symbol.\n *\n * @private\n * @param {*} value The value to inspect.\n * @returns {string|symbol} Returns the key.\n */\nfunction toKey(value) {\n  if (typeof value == 'string' || isSymbol(value)) {\n    return value;\n  }\n  var result = (value + '');\n  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;\n}\n\nmodule.exports = toKey;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_toKey.js?");

/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar funcProto = Function.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/**\n * Converts `func` to its source code.\n *\n * @private\n * @param {Function} func The function to convert.\n * @returns {string} Returns the source code.\n */\nfunction toSource(func) {\n  if (func != null) {\n    try {\n      return funcToString.call(func);\n    } catch (e) {}\n    try {\n      return (func + '');\n    } catch (e) {}\n  }\n  return '';\n}\n\nmodule.exports = toSource;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_toSource.js?");

/***/ }),

/***/ "./node_modules/lodash/assignIn.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/assignIn.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    createAssigner = __webpack_require__(/*! ./_createAssigner */ \"./node_modules/lodash/_createAssigner.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\");\n\n/**\n * This method is like `_.assign` except that it iterates over own and\n * inherited source properties.\n *\n * **Note:** This method mutates `object`.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @alias extend\n * @category Object\n * @param {Object} object The destination object.\n * @param {...Object} [sources] The source objects.\n * @returns {Object} Returns `object`.\n * @see _.assign\n * @example\n *\n * function Foo() {\n *   this.a = 1;\n * }\n *\n * function Bar() {\n *   this.c = 3;\n * }\n *\n * Foo.prototype.b = 2;\n * Bar.prototype.d = 4;\n *\n * _.assignIn({ 'a': 0 }, new Foo, new Bar);\n * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }\n */\nvar assignIn = createAssigner(function(object, source) {\n  copyObject(source, keysIn(source), object);\n});\n\nmodule.exports = assignIn;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/assignIn.js?");

/***/ }),

/***/ "./node_modules/lodash/constant.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/constant.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a function that returns `value`.\n *\n * @static\n * @memberOf _\n * @since 2.4.0\n * @category Util\n * @param {*} value The value to return from the new function.\n * @returns {Function} Returns the new constant function.\n * @example\n *\n * var objects = _.times(2, _.constant({ 'a': 1 }));\n *\n * console.log(objects);\n * // => [{ 'a': 1 }, { 'a': 1 }]\n *\n * console.log(objects[0] === objects[1]);\n * // => true\n */\nfunction constant(value) {\n  return function() {\n    return value;\n  };\n}\n\nmodule.exports = constant;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/constant.js?");

/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Performs a\n * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * comparison between two values to determine if they are equivalent.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n * @example\n *\n * var object = { 'a': 1 };\n * var other = { 'a': 1 };\n *\n * _.eq(object, object);\n * // => true\n *\n * _.eq(object, other);\n * // => false\n *\n * _.eq('a', 'a');\n * // => true\n *\n * _.eq('a', Object('a'));\n * // => false\n *\n * _.eq(NaN, NaN);\n * // => true\n */\nfunction eq(value, other) {\n  return value === other || (value !== value && other !== other);\n}\n\nmodule.exports = eq;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/eq.js?");

/***/ }),

/***/ "./node_modules/lodash/extend.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/extend.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./assignIn */ \"./node_modules/lodash/assignIn.js\");\n\n\n//# sourceURL=webpack:///./node_modules/lodash/extend.js?");

/***/ }),

/***/ "./node_modules/lodash/get.js":
/*!************************************!*\
  !*** ./node_modules/lodash/get.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGet = __webpack_require__(/*! ./_baseGet */ \"./node_modules/lodash/_baseGet.js\");\n\n/**\n * Gets the value at `path` of `object`. If the resolved value is\n * `undefined`, the `defaultValue` is returned in its place.\n *\n * @static\n * @memberOf _\n * @since 3.7.0\n * @category Object\n * @param {Object} object The object to query.\n * @param {Array|string} path The path of the property to get.\n * @param {*} [defaultValue] The value returned for `undefined` resolved values.\n * @returns {*} Returns the resolved value.\n * @example\n *\n * var object = { 'a': [{ 'b': { 'c': 3 } }] };\n *\n * _.get(object, 'a[0].b.c');\n * // => 3\n *\n * _.get(object, ['a', '0', 'b', 'c']);\n * // => 3\n *\n * _.get(object, 'a.b.c', 'default');\n * // => 'default'\n */\nfunction get(object, path, defaultValue) {\n  var result = object == null ? undefined : baseGet(object, path);\n  return result === undefined ? defaultValue : result;\n}\n\nmodule.exports = get;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/get.js?");

/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns the first argument it receives.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Util\n * @param {*} value Any value.\n * @returns {*} Returns `value`.\n * @example\n *\n * var object = { 'a': 1 };\n *\n * console.log(_.identity(object) === object);\n * // => true\n */\nfunction identity(value) {\n  return value;\n}\n\nmodule.exports = identity;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/identity.js?");

/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ \"./node_modules/lodash/_baseIsArguments.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Built-in value references. */\nvar propertyIsEnumerable = objectProto.propertyIsEnumerable;\n\n/**\n * Checks if `value` is likely an `arguments` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n *  else `false`.\n * @example\n *\n * _.isArguments(function() { return arguments; }());\n * // => true\n *\n * _.isArguments([1, 2, 3]);\n * // => false\n */\nvar isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {\n  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&\n    !propertyIsEnumerable.call(value, 'callee');\n};\n\nmodule.exports = isArguments;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is classified as an `Array` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array, else `false`.\n * @example\n *\n * _.isArray([1, 2, 3]);\n * // => true\n *\n * _.isArray(document.body.children);\n * // => false\n *\n * _.isArray('abc');\n * // => false\n *\n * _.isArray(_.noop);\n * // => false\n */\nvar isArray = Array.isArray;\n\nmodule.exports = isArray;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isArray.js?");

/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\");\n\n/**\n * Checks if `value` is array-like. A value is considered array-like if it's\n * not a function and has a `value.length` that's an integer greater than or\n * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is array-like, else `false`.\n * @example\n *\n * _.isArrayLike([1, 2, 3]);\n * // => true\n *\n * _.isArrayLike(document.body.children);\n * // => true\n *\n * _.isArrayLike('abc');\n * // => true\n *\n * _.isArrayLike(_.noop);\n * // => false\n */\nfunction isArrayLike(value) {\n  return value != null && isLength(value.length) && !isFunction(value);\n}\n\nmodule.exports = isArrayLike;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isArrayLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\"),\n    stubFalse = __webpack_require__(/*! ./stubFalse */ \"./node_modules/lodash/stubFalse.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports =  true && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Built-in value references. */\nvar Buffer = moduleExports ? root.Buffer : undefined;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;\n\n/**\n * Checks if `value` is a buffer.\n *\n * @static\n * @memberOf _\n * @since 4.3.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.\n * @example\n *\n * _.isBuffer(new Buffer(2));\n * // => true\n *\n * _.isBuffer(new Uint8Array(2));\n * // => false\n */\nvar isBuffer = nativeIsBuffer || stubFalse;\n\nmodule.exports = isBuffer;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../../../usr/local/lib/node_modules/webpack/buildin/module.js */ \"../../../../../../../../usr/local/lib/node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./node_modules/lodash/isBuffer.js?");

/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/** `Object#toString` result references. */\nvar asyncTag = '[object AsyncFunction]',\n    funcTag = '[object Function]',\n    genTag = '[object GeneratorFunction]',\n    proxyTag = '[object Proxy]';\n\n/**\n * Checks if `value` is classified as a `Function` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a function, else `false`.\n * @example\n *\n * _.isFunction(_);\n * // => true\n *\n * _.isFunction(/abc/);\n * // => false\n */\nfunction isFunction(value) {\n  if (!isObject(value)) {\n    return false;\n  }\n  // The use of `Object#toString` avoids issues with the `typeof` operator\n  // in Safari 9 which returns 'object' for typed arrays and other constructors.\n  var tag = baseGetTag(value);\n  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;\n}\n\nmodule.exports = isFunction;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isFunction.js?");

/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used as references for various `Number` constants. */\nvar MAX_SAFE_INTEGER = 9007199254740991;\n\n/**\n * Checks if `value` is a valid array-like length.\n *\n * **Note:** This method is loosely based on\n * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.\n * @example\n *\n * _.isLength(3);\n * // => true\n *\n * _.isLength(Number.MIN_VALUE);\n * // => false\n *\n * _.isLength(Infinity);\n * // => false\n *\n * _.isLength('3');\n * // => false\n */\nfunction isLength(value) {\n  return typeof value == 'number' &&\n    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;\n}\n\nmodule.exports = isLength;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isLength.js?");

/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is the\n * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)\n * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an object, else `false`.\n * @example\n *\n * _.isObject({});\n * // => true\n *\n * _.isObject([1, 2, 3]);\n * // => true\n *\n * _.isObject(_.noop);\n * // => true\n *\n * _.isObject(null);\n * // => false\n */\nfunction isObject(value) {\n  var type = typeof value;\n  return value != null && (type == 'object' || type == 'function');\n}\n\nmodule.exports = isObject;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is object-like. A value is object-like if it's not `null`\n * and has a `typeof` result of \"object\".\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is object-like, else `false`.\n * @example\n *\n * _.isObjectLike({});\n * // => true\n *\n * _.isObjectLike([1, 2, 3]);\n * // => true\n *\n * _.isObjectLike(_.noop);\n * // => false\n *\n * _.isObjectLike(null);\n * // => false\n */\nfunction isObjectLike(value) {\n  return value != null && typeof value == 'object';\n}\n\nmodule.exports = isObjectLike;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isObjectLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar symbolTag = '[object Symbol]';\n\n/**\n * Checks if `value` is classified as a `Symbol` primitive or object.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.\n * @example\n *\n * _.isSymbol(Symbol.iterator);\n * // => true\n *\n * _.isSymbol('abc');\n * // => false\n */\nfunction isSymbol(value) {\n  return typeof value == 'symbol' ||\n    (isObjectLike(value) && baseGetTag(value) == symbolTag);\n}\n\nmodule.exports = isSymbol;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isSymbol.js?");

/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ \"./node_modules/lodash/_baseIsTypedArray.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ \"./node_modules/lodash/_nodeUtil.js\");\n\n/* Node.js helper references. */\nvar nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;\n\n/**\n * Checks if `value` is classified as a typed array.\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.\n * @example\n *\n * _.isTypedArray(new Uint8Array);\n * // => true\n *\n * _.isTypedArray([]);\n * // => false\n */\nvar isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;\n\nmodule.exports = isTypedArray;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ \"./node_modules/lodash/_arrayLikeKeys.js\"),\n    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ \"./node_modules/lodash/_baseKeysIn.js\"),\n    isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\");\n\n/**\n * Creates an array of the own and inherited enumerable property names of `object`.\n *\n * **Note:** Non-object values are coerced to objects.\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category Object\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n * @example\n *\n * function Foo() {\n *   this.a = 1;\n *   this.b = 2;\n * }\n *\n * Foo.prototype.c = 3;\n *\n * _.keysIn(new Foo);\n * // => ['a', 'b', 'c'] (iteration order is not guaranteed)\n */\nfunction keysIn(object) {\n  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);\n}\n\nmodule.exports = keysIn;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/keysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/memoize.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/memoize.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var MapCache = __webpack_require__(/*! ./_MapCache */ \"./node_modules/lodash/_MapCache.js\");\n\n/** Error message constants. */\nvar FUNC_ERROR_TEXT = 'Expected a function';\n\n/**\n * Creates a function that memoizes the result of `func`. If `resolver` is\n * provided, it determines the cache key for storing the result based on the\n * arguments provided to the memoized function. By default, the first argument\n * provided to the memoized function is used as the map cache key. The `func`\n * is invoked with the `this` binding of the memoized function.\n *\n * **Note:** The cache is exposed as the `cache` property on the memoized\n * function. Its creation may be customized by replacing the `_.memoize.Cache`\n * constructor with one whose instances implement the\n * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)\n * method interface of `clear`, `delete`, `get`, `has`, and `set`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Function\n * @param {Function} func The function to have its output memoized.\n * @param {Function} [resolver] The function to resolve the cache key.\n * @returns {Function} Returns the new memoized function.\n * @example\n *\n * var object = { 'a': 1, 'b': 2 };\n * var other = { 'c': 3, 'd': 4 };\n *\n * var values = _.memoize(_.values);\n * values(object);\n * // => [1, 2]\n *\n * values(other);\n * // => [3, 4]\n *\n * object.a = 2;\n * values(object);\n * // => [1, 2]\n *\n * // Modify the result cache.\n * values.cache.set(object, ['a', 'b']);\n * values(object);\n * // => ['a', 'b']\n *\n * // Replace `_.memoize.Cache`.\n * _.memoize.Cache = WeakMap;\n */\nfunction memoize(func, resolver) {\n  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {\n    throw new TypeError(FUNC_ERROR_TEXT);\n  }\n  var memoized = function() {\n    var args = arguments,\n        key = resolver ? resolver.apply(this, args) : args[0],\n        cache = memoized.cache;\n\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    var result = func.apply(this, args);\n    memoized.cache = cache.set(key, result) || cache;\n    return result;\n  };\n  memoized.cache = new (memoize.Cache || MapCache);\n  return memoized;\n}\n\n// Expose `MapCache`.\nmemoize.Cache = MapCache;\n\nmodule.exports = memoize;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/memoize.js?");

/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns `false`.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {boolean} Returns `false`.\n * @example\n *\n * _.times(2, _.stubFalse);\n * // => [false, false]\n */\nfunction stubFalse() {\n  return false;\n}\n\nmodule.exports = stubFalse;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/stubFalse.js?");

/***/ }),

/***/ "./node_modules/lodash/toString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toString.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseToString = __webpack_require__(/*! ./_baseToString */ \"./node_modules/lodash/_baseToString.js\");\n\n/**\n * Converts `value` to a string. An empty string is returned for `null`\n * and `undefined` values. The sign of `-0` is preserved.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n * @example\n *\n * _.toString(null);\n * // => ''\n *\n * _.toString(-0);\n * // => '-0'\n *\n * _.toString([1, 2, 3]);\n * // => '1,2,3'\n */\nfunction toString(value) {\n  return value == null ? '' : baseToString(value);\n}\n\nmodule.exports = toString;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/toString.js?");

/***/ }),

/***/ "./node_modules/on-change/index.js":
/*!*****************************************!*\
  !*** ./node_modules/on-change/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst PATH_SEPARATOR = '.';\nconst TARGET = Symbol('target');\nconst UNSUBSCRIBE = Symbol('unsubscribe');\n\nconst isPrimitive = value => value === null || (typeof value !== 'object' && typeof value !== 'function');\n\nconst isBuiltinWithoutMutableMethods = value => value instanceof RegExp || value instanceof Number;\n\nconst isBuiltinWithMutableMethods = value => value instanceof Date;\n\nconst concatPath = (path, property) => {\n\tif (property && property.toString) {\n\t\tif (path) {\n\t\t\tpath += PATH_SEPARATOR;\n\t\t}\n\n\t\tpath += property.toString();\n\t}\n\n\treturn path;\n};\n\nconst walkPath = (path, callback) => {\n\tlet index;\n\n\twhile (path) {\n\t\tindex = path.indexOf(PATH_SEPARATOR);\n\n\t\tif (index === -1) {\n\t\t\tindex = path.length;\n\t\t}\n\n\t\tcallback(path.slice(0, index));\n\n\t\tpath = path.slice(index + 1);\n\t}\n};\n\nconst shallowClone = value => {\n\tif (Array.isArray(value)) {\n\t\treturn value.slice();\n\t}\n\n\treturn Object.assign({}, value);\n};\n\nconst onChange = (object, onChange, options = {}) => {\n\tconst proxyTarget = Symbol('ProxyTarget');\n\tlet inApply = false;\n\tlet changed = false;\n\tlet applyPath;\n\tlet applyPrevious;\n\tlet isUnsubscribed = false;\n\tconst equals = options.equals || Object.is;\n\tlet propCache = new WeakMap();\n\tlet pathCache = new WeakMap();\n\tlet proxyCache = new WeakMap();\n\n\tconst handleChange = (path, property, previous, value) => {\n\t\tif (isUnsubscribed) {\n\t\t\treturn;\n\t\t}\n\n\t\tif (!inApply) {\n\t\t\tonChange(concatPath(path, property), value, previous);\n\t\t\treturn;\n\t\t}\n\n\t\tif (inApply && applyPrevious && previous !== undefined && value !== undefined && property !== 'length') {\n\t\t\tlet item = applyPrevious;\n\n\t\t\tif (path !== applyPath) {\n\t\t\t\tpath = path.replace(applyPath, '').slice(1);\n\n\t\t\t\twalkPath(path, key => {\n\t\t\t\t\titem[key] = shallowClone(item[key]);\n\t\t\t\t\titem = item[key];\n\t\t\t\t});\n\t\t\t}\n\n\t\t\titem[property] = previous;\n\t\t}\n\n\t\tchanged = true;\n\t};\n\n\tconst getOwnPropertyDescriptor = (target, property) => {\n\t\tlet props = propCache ? propCache.get(target) : undefined;\n\n\t\tif (props) {\n\t\t\treturn props;\n\t\t}\n\n\t\tprops = new Map();\n\t\tpropCache.set(target, props);\n\n\t\tlet prop = props.get(property);\n\t\tif (!prop) {\n\t\t\tprop = Reflect.getOwnPropertyDescriptor(target, property);\n\t\t\tprops.set(property, prop);\n\t\t}\n\n\t\treturn prop;\n\t};\n\n\tconst invalidateCachedDescriptor = (target, property) => {\n\t\tconst props = propCache ? propCache.get(target) : undefined;\n\n\t\tif (props) {\n\t\t\tprops.delete(property);\n\t\t}\n\t};\n\n\tconst buildProxy = (value, path) => {\n\t\tif (isUnsubscribed) {\n\t\t\treturn value;\n\t\t}\n\n\t\tpathCache.set(value, path);\n\n\t\tlet proxy = proxyCache.get(value);\n\n\t\tif (proxy === undefined) {\n\t\t\tproxy = new Proxy(value, handler);\n\t\t\tproxyCache.set(value, proxy);\n\t\t}\n\n\t\treturn proxy;\n\t};\n\n\tconst unsubscribe = target => {\n\t\tisUnsubscribed = true;\n\t\tpropCache = null;\n\t\tpathCache = null;\n\t\tproxyCache = null;\n\n\t\treturn target;\n\t};\n\n\tconst ignoreChange = property => {\n\t\treturn isUnsubscribed || (options.ignoreSymbols === true && typeof property === 'symbol');\n\t};\n\n\tconst handler = {\n\t\tget(target, property, receiver) {\n\t\t\tif (property === proxyTarget || property === TARGET) {\n\t\t\t\treturn target;\n\t\t\t}\n\n\t\t\tif (property === UNSUBSCRIBE && pathCache.get(target) === '') {\n\t\t\t\treturn unsubscribe(target);\n\t\t\t}\n\n\t\t\tconst value = Reflect.get(target, property, receiver);\n\t\t\tif (\n\t\t\t\tisPrimitive(value) ||\n\t\t\t\tisBuiltinWithoutMutableMethods(value) ||\n\t\t\t\tproperty === 'constructor' ||\n\t\t\t\toptions.isShallow === true\n\t\t\t) {\n\t\t\t\treturn value;\n\t\t\t}\n\n\t\t\t// Preserve invariants\n\t\t\tconst descriptor = getOwnPropertyDescriptor(target, property);\n\t\t\tif (descriptor && !descriptor.configurable) {\n\t\t\t\tif (descriptor.set && !descriptor.get) {\n\t\t\t\t\treturn undefined;\n\t\t\t\t}\n\n\t\t\t\tif (descriptor.writable === false) {\n\t\t\t\t\treturn value;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn buildProxy(value, concatPath(pathCache.get(target), property));\n\t\t},\n\n\t\tset(target, property, value, receiver) {\n\t\t\tif (value && value[proxyTarget] !== undefined) {\n\t\t\t\tvalue = value[proxyTarget];\n\t\t\t}\n\n\t\t\tconst ignore = ignoreChange(property);\n\t\t\tconst previous = ignore ? null : Reflect.get(target, property, receiver);\n\t\t\tconst result = Reflect.set(target[proxyTarget] || target, property, value);\n\n\t\t\tif (!ignore && !equals(previous, value)) {\n\t\t\t\thandleChange(pathCache.get(target), property, previous, value);\n\t\t\t}\n\n\t\t\treturn result;\n\t\t},\n\n\t\tdefineProperty(target, property, descriptor) {\n\t\t\tconst result = Reflect.defineProperty(target, property, descriptor);\n\n\t\t\tif (!ignoreChange(property)) {\n\t\t\t\tinvalidateCachedDescriptor(target, property);\n\n\t\t\t\thandleChange(pathCache.get(target), property, undefined, descriptor.value);\n\t\t\t}\n\n\t\t\treturn result;\n\t\t},\n\n\t\tdeleteProperty(target, property) {\n\t\t\tif (!Reflect.has(target, property)) {\n\t\t\t\treturn true;\n\t\t\t}\n\n\t\t\tconst ignore = ignoreChange(property);\n\t\t\tconst previous = ignore ? null : Reflect.get(target, property);\n\t\t\tconst result = Reflect.deleteProperty(target, property);\n\n\t\t\tif (!ignore) {\n\t\t\t\tinvalidateCachedDescriptor(target, property);\n\n\t\t\t\thandleChange(pathCache.get(target), property, previous);\n\t\t\t}\n\n\t\t\treturn result;\n\t\t},\n\n\t\tapply(target, thisArg, argumentsList) {\n\t\t\tconst compare = isBuiltinWithMutableMethods(thisArg);\n\n\t\t\tif (compare) {\n\t\t\t\tthisArg = thisArg[proxyTarget];\n\t\t\t}\n\n\t\t\tif (!inApply) {\n\t\t\t\tinApply = true;\n\n\t\t\t\tif (compare) {\n\t\t\t\t\tapplyPrevious = thisArg.valueOf();\n\t\t\t\t}\n\n\t\t\t\tif (Array.isArray(thisArg) || toString.call(thisArg) === '[object Object]') {\n\t\t\t\t\tapplyPrevious = shallowClone(thisArg[proxyTarget]);\n\t\t\t\t}\n\n\t\t\t\tapplyPath = pathCache.get(target);\n\t\t\t\tapplyPath = applyPath.slice(0, Math.max(applyPath.lastIndexOf(PATH_SEPARATOR), 0));\n\n\t\t\t\tconst result = Reflect.apply(target, thisArg, argumentsList);\n\n\t\t\t\tinApply = false;\n\n\t\t\t\tif (changed || (compare && !equals(applyPrevious, thisArg.valueOf()))) {\n\t\t\t\t\thandleChange(applyPath, '', applyPrevious, thisArg[proxyTarget] || thisArg);\n\t\t\t\t\tapplyPrevious = null;\n\t\t\t\t\tchanged = false;\n\t\t\t\t}\n\n\t\t\t\treturn result;\n\t\t\t}\n\n\t\t\treturn Reflect.apply(target, thisArg, argumentsList);\n\t\t}\n\t};\n\n\tconst proxy = buildProxy(object, '');\n\tonChange = onChange.bind(proxy);\n\n\treturn proxy;\n};\n\nonChange.target = proxy => proxy[TARGET] || proxy;\nonChange.unsubscribe = proxy => proxy[UNSUBSCRIBE] || proxy;\n\nmodule.exports = onChange;\n// TODO: Remove this for the next major release\nmodule.exports.default = onChange;\n\n\n//# sourceURL=webpack:///./node_modules/on-change/index.js?");

/***/ })

/******/ });
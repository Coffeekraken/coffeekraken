/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0,
/******/ 		1: 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "chunks/" + ({}[chunkId]||chunkId) + "-" + {"2":"0d389f5a6c3bd25af12b","3":"a9f5097b557ceaf9e9ed","4":"150a5a81a824ec96853a","5":"5dda841d20cd8ace6e11"}[chunkId] + "-0.0.1.js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	__webpack_require__.p = "/app/js/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name                                  parse
 * @namespace                             sugar.js.string
 * @type                                  Function
 *
 * Parse a string and convert it into his native data type like date, number, boolean, etc...
 *
 * @param             {String}                        value                                 The value to convert
 * @return            {Mixed}                                                               The converted value
 *
 * @example           js
 * import parse from '@coffeekraken/sugar/js/string/parse';
 * parse('10'); // => 10
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = value => {
  if (typeof value !== 'string') return value;

  try {
    return Function(`
      "use strict";
      return (${value});
    `)();
  } catch (e) {
    return value;
  }
};

exports.default = _default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = querySelectorLive;

var _uniqid = _interopRequireDefault(__webpack_require__(6));

var _matches = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      querySelectorLive
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Observe the dom to get all the elements that matches a passed css selector at any point in time.
 * Be warned that this use the mutation observer API and will monitor all the document for new nodes. Make sure to use it
 * when you don't have the chance to use the custom elements API instead
 *
 * @param	{String} 		selector 		The css selector that we are interested in
 * @param 	{Function} 		cb 				The function to call with the newly added node
 * @param 	{Object} 		[settings={}] 	An optional settings object to specify things like the rootNode to monitor, etc...
 *
 * @example 	js
 * import querySelectorLive from '@coffeekraken/sugar/js/dom/querySelectorLive'
 * querySelectorLive('.my-cool-item', (node, clearFn) => {
 * 	// do something here with the detected node
 *  // call clearFn if you want to stop listening for this selector
 *  clearFn();
 * });
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let _observer,
    _selectors = {};

function querySelectorLive(selector, cb, settings = {}) {
  const id = `${selector} - ${(0, _uniqid.default)()}`; // extend settings

  settings = Object.assign({}, {
    rootNode: document,
    once: true
  }, settings);

  if (!_selectors[selector]) {
    _selectors[selector] = [{
      id: id,
      selector: selector,
      cb: cb,
      settings: settings
    }];
  } else {
    _selectors[selector].push({
      id: id,
      selector: selector,
      cb: cb,
      settings: settings
    });
  }

  function pushNewNode(node, sel) {
    const objs = _selectors[sel];
    if (!objs) return;
    objs.forEach(obj => {
      if (obj.settings.once) {
        if (!node._querySelectorLive) {
          node._querySelectorLive = {};
        }

        if (node._querySelectorLive[obj.id]) return;
        node._querySelectorLive[obj.id] = true;
      }

      obj.cb && obj.cb(node, () => {
        delete _selectors[obj.selector];
      });
    });
  } // listen for updates in document


  if (!_observer) {
    _observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes) {
          [].forEach.call(mutation.addedNodes, node => {
            // get all the selectors registered
            const selectors = Object.keys(_selectors); // loop on each selectors

            selectors.forEach(sel => {
              if ((0, _matches.default)(node, sel)) {
                pushNewNode(node, sel);
              }
            });
            if (!node.querySelectorAll) return;
            selectors.forEach(sel => {
              const nestedNodes = node.querySelectorAll(sel);
              [].forEach.call(nestedNodes, nestedNode => {
                pushNewNode(nestedNode, sel);
              });
            });
          });
        }
      });
    });

    _observer.observe(settings.rootNode, {
      childList: true,
      subtree: true
    });
  } // first search


  [].forEach.call(settings.rootNode.querySelectorAll(selector), node => {
    pushNewNode(node, selector);
  });
}
/**
 * @name 	settings.rootNode
 * The root node used to detect newly added nodes within
 * @prop
 * @type 		{HTMLElement}
 * @default 	document
 */

/**
 * @name 	settings.once
 * Specify if want to detect the node only once. Mean that if the node is removed from the dom and added again, it will not be detected again.
 * @prop
 * @type 		{Boolean}
 * @default 	true
 */

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = matches;

/**
 * @name      matches
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Polyfill for the Element.matches function
 *
 * @param 		{HTMLElement} 			elm  			The element to check
 * @param 		{String} 				selector 		The selector to check on the element
 * @return 		{Boolean} 								If the element match the selector or not
 *
 * @example  	js
 * import matches from '@coffeekraken/sugar/js/dom/matches'
 * if (matches(myCoolHTMLElement, '.my-cool-css-selector')) {
 * 		// the element match the selector
 * }
 *
 * @see 		https://developer.mozilla.org/en/docs/Web/API/Element/matches
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function matches(el, selector) {
  if (el.nodeName == "#comment" || el.nodeName == "#text") {
    return false;
  }

  var p = Element.prototype;

  var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  };

  return f.call(el, selector);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = autoCast;

/**
 * @name        autoCast
 * @namespace       sugar.js.string
 * @type      Function
 *
 * Auto cast the string into the correct variable type
 *
 * @param    {String}    string    The string to auto cast
 * @return    {Mixed}    The casted value
 *
 * @example    js
 * import autoCast from '@coffeekraken/sugar/js/strings/autoCast'
 * autoCast('12') // => 12
 * autoCast('window.HTMLElement') // => HTMLElement
 * autoCast('{"hello":"world"}') // {hello:'world'}
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function autoCast(string) {
  // if the passed string is not a string, return the value
  if (typeof string !== "string") return string; // handle the single quotes strings like '"hello world"'

  if (string.substr(0, 1) === "'" && string.substr(-1) === "'") {
    return string.substr(1, string.length - 2);
  } // number
  // before the window check cause window['0'] correspond to something


  const presumedNumber = parseFloat(string);

  if (!isNaN(presumedNumber)) {
    if (presumedNumber.toString() === string) {
      return presumedNumber;
    }
  } // avoid getting item from the window object


  if (window[string]) {
    return string;
  } // try to eval the passed string
  // if no exception, mean that it's a valid
  // js variable type


  try {
    const obj = eval(`(${string})`);
    return obj;
  } catch (e) {
    // assume that the string passed is a string
    return string;
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uniqid;

var _uniqid = _interopRequireDefault(__webpack_require__(8));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name          uniqid
 * @namespace       sugar.js.string
 * @type          Function
 *
 * Generate a uniqid string of 8 bytes. Work using the [uniqid](https://www.npmjs.com/package/uniqid) npm package under the hood.
 *
 * @return          {String}                A 8 bytes uniqid string
 *
 * @example       js
 * import uniqid from '@coffeekraken/sugar/js/string/uniqid';
 * console.log(uniqid()); // => 4n5pxq24
 *
 * @see       https://www.npmjs.com/package/uniqid
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function uniqid() {
  return (0, _uniqid.default)();
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name                        ensureExist
 * @namespace                   sugar.js.object
 * @type                        Function
 *
 * Pass a string like "my.cool.object" and the value it has to be and this function will ensure that this deep object exist
 *
 * @param           {String}            objectPath                    The object path to check
 * @param           {Mixed}             value                         The value to set to the object path created if not already exist
 *
 * @example           js
 * import ensureExist from '@coffeekraken/sugar/js/object/ensureExist';
 * ensureExist('my.cool.object', {});
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = (objectPath, value = {}) => {
  const objectPathSplited = objectPath.split('.');
  let path = '';
  objectPathSplited.forEach((part, i) => {
    path += path === '' ? part : '.' + part;
    if (!eval(path)) i >= objectPathSplited.length - 1 ? eval(`${path} = ${JSON.stringify(value)};`) : eval(`${path} = {};`);
  });
};

exports.default = _default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uniqid;
let uniqidIdx = 0;
if (!window.sugar) window.sugar = {};
if (!window.sugar._uniqid) window.sugar._uniqid = 0;
/**
 * @name        uniqid
 * @namespace       sugar.js.util
 * @type      Function
 *
 * Generate a uniq id
 *
 * @example    js
 * import uniqid from '@coffeekraken/sugar/js/util/uniqid'
 * uniqid() // s2
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function uniqid() {
  // update uniqid idx
  window.sugar._uniqid++;
  return `s${window.sugar._uniqid.toString()}`;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) { // CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.

var __window = typeof window !== 'undefined' && window;

var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && self;

var __global = typeof global !== 'undefined' && global;

var _root = __window || __global || __self;

exports.root = _root; // Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE

(function () {
  if (!_root) {
    throw new Error('RxJS could not find any global context (window, self, global)');
  }
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(18)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

/* 
(The MIT License)
Copyright (c) 2014-2019 Halász Ádám <mail@adamhalasz.com>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
//  Unique Hexatridecimal ID Generator
// ================================================
//  Dependencies
// ================================================
var pid = process && process.pid ? process.pid.toString(36) : '';
var address = '';

if (false) { var i, mac, networkInterfaces; } //  Exports
// ================================================


module.exports = module.exports.default = function (prefix, suffix) {
  return (prefix ? prefix : '') + address + pid + now().toString(36) + (suffix ? suffix : '');
};

module.exports.process = function (prefix, suffix) {
  return (prefix ? prefix : '') + pid + now().toString(36) + (suffix ? suffix : '');
};

module.exports.time = function (prefix, suffix) {
  return (prefix ? prefix : '') + now().toString(36) + (suffix ? suffix : '');
}; //  Helpers
// ================================================


function now() {
  var time = Date.now();
  var last = now.last || time;
  return now.last = time > last ? time : last + 1;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(9)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uniqid = _interopRequireDefault(__webpack_require__(4));

var _parseArgs = _interopRequireDefault(__webpack_require__(11));

var _querySelectorLive = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (() => {
  (0, _querySelectorLive.default)('[slide-in]', $item => {
    // generate a unique id for this node
    const uniqClass = `slide-in-${(0, _uniqid.default)()}`;
    $item.classList.add(uniqClass); // parse the slide-in value

    const slideInValue = $item.getAttribute('slide-in');
    const args = (0, _parseArgs.default)(slideInValue, {
      x: 'Number -x --x "0"',
      y: 'Number -y --y "0"',
      duration: 'Number -d --duration "500"',
      delay: 'Number --delay "0"',
      when: 'String -w --when "inViewport"'
    }); // generate the animation css

    const css = `
      [slide-in].${uniqClass} {
        opacity: 0;
        transform: translate(${args.x || 0}px, ${args.y || 0}px);

      }
    `;
    const cssIn = `
      [slide-in].${uniqClass}.in {
        transition: all ${args.duration / 1000 || '0.5'}s;
        opacity: 1;
        transform: translate(0, 0);
      }
    `; // append the css into the section

    document.head.innerHTML += `
      <style id="${uniqClass}">
        ${css}
      </style>
    `;
    setTimeout(() => {
      document.head.innerHTML += `
        <style id="${uniqClass}-in">
          ${cssIn}
        </style>
      `;
    }, 100); // add the "in" class

    setTimeout(() => {
      $item.classList.add('in');
    }, args.delay);
    setTimeout(() => {
      const $style = document.querySelector(`style#${uniqClass}`);
      if ($style) $style.parentNode.removeChild($style);
      const $styleIn = document.querySelector(`style#${uniqClass}-in`);
      if ($styleIn) $styleIn.parentNode.removeChild($styleIn);
    }, args.delay + args.duration);
  });
})();

exports.default = _default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parse = _interopRequireDefault(__webpack_require__(0));

var _unquote = _interopRequireDefault(__webpack_require__(12));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                        parseArgs
 * @namespace                   sugar.js.string
 * @type                        Function
 *
 * Parse a string to find the provided arguments into the list and return a corresponding object.
 *
 * @param             {String}                    string                      The string to parse
 * @param             {Object}                    arguments                   The arguments object description
 * @return            {Object}                                                The object of funded arguments
 *
 * @example         js
 * import parseArgs from '@coffeekraken/sugar/js/string/parseArgs';
 * parseArgs('hello -w 10 --help "coco yep" #blop', {
 *    action: 'String -a --action /^\\S$/',
 *    world: 'Integer -w --world',
 *    help: 'String -h --help',
 *    id: 'String -i --id /^#([\\S]+)$/',
 *    yop: 'String -y --yop "Default value"'
 * });
 * // {
 * //   action: 'hello',
 * //   world: 10,
 * //   help: 'coco yep',
 * //   id: 'blop',
 * //   yop: 'Default value'
 * // }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = (string, args) => {
  string = ' ' + string + ' ';
  const keys = Object.keys(args);
  const resultObject = {}; // search for the "-a 'something cool'" style

  const regSmallArg = /\s-[a-z]\s(?![-])[\S]+\s/g;
  const regBigArg = /\s--[a-z]+\s(?![-])[\S]+\s/g;
  const regRestArg = /(?![-])[\S]+/g;
  const smallArgs = string.match(regSmallArg);

  if (smallArgs) {
    smallArgs.forEach((item, i) => {
      string = string.replace(item, ' ');
    });
  }

  const bigArgs = string.match(regBigArg);

  if (bigArgs) {
    bigArgs.forEach((item, i) => {
      string = string.replace(item, ' ');
    });
  }

  const restArgs = string.match(regRestArg);

  if (restArgs) {
    restArgs.forEach((item, i) => {
      string = string.replace(item, ' ');
    });
  } // loop on each keys to search for corresponding value


  for (let _i = 0; _i < keys.length; _i++) {
    const k = keys[_i];
    let keyArgs = args[k];
    let keyString = null;
    let keyPreprocess = null;

    if (typeof keyArgs === 'object') {
      if (keyArgs.args === undefined || typeof keyArgs.args !== 'string') {
        console.error('sugar.js.string.parseArgs', `You have passed an object as argument for the key "${k}" but this object has to have an "args" property of type "String" and here's your object passed...`, keyArgs);
        return {};
      }

      if (keyArgs.preprocess === undefined || typeof keyArgs.preprocess !== 'function') {
        console.error('sugar.js.string.parseArgs', `You have passed an object as argument for the key "${k}" but this object has to have an "preprocess" property of type "Function" and here's your object passed...`, keyArgs);
        return {};
      }

      keyString = ' ' + keyArgs.args + ' ';
      keyPreprocess = keyArgs.preprocess;
    } else {
      keyString = ' ' + keyArgs + ' ';
    }

    const regKeyArgsType = /\s[a-zA-Z]+/g;
    const regKeyArgsSmallName = /\s-[a-zA-Z]\s/g;
    const regKeyArgsBigName = /\s--[a-zA-Z]+\s/g;
    const regKeyArgsRegex = /\s\/[\S]+\/\s/g;
    const regKeyArgsDefault = /['|"|`](.*)['|"|`]/g;
    let type = keyString.match(regKeyArgsType);
    if (type && type.length) type = type[0].trim();
    let smallName = keyString.match(regKeyArgsSmallName);
    if (smallName && smallName.length) smallName = smallName[0].trim();
    let bigName = keyString.match(regKeyArgsBigName);
    if (bigName && bigName.length) bigName = bigName[0].trim();
    let regex = keyString.match(regKeyArgsRegex);
    if (regex && regex.length) regex = regex[0].trim().slice(1, -1);
    let defaultValue = keyString.match(regKeyArgsDefault);
    if (defaultValue && defaultValue.length === 1) defaultValue = (0, _unquote.default)(defaultValue[0]);

    if (smallArgs && smallName && resultObject[k] === undefined) {
      for (let i = 0; i < smallArgs.length; i++) {
        let item = smallArgs[i];
        item = item.trim();
        const key = item.slice(0, 2);
        if (key !== smallName) continue;
        let value = item.slice(2).trim();
        value = (0, _unquote.default)(value); // check that the value match the args

        if (type && typeof (0, _parse.default)(value) !== type.toLowerCase()) continue;

        if (regex) {
          const r = new RegExp(regex);
          if (!r.test(value)) continue; // check if some parentheses exists

          const matches = value.match(regex);

          if (matches[1] !== undefined) {
            value = matches[1];
          }
        }

        smallArgs.splice(i, 1);

        if (keyPreprocess) {
          resultObject[k] = keyPreprocess((0, _parse.default)(value));
        } else {
          resultObject[k] = (0, _parse.default)(value);
        }

        break;
      }
    }

    if (bigArgs && bigName && resultObject[k] === undefined) {
      for (let i = 0; i < bigArgs.length; i++) {
        let item = bigArgs[i];
        item = item.trim();
        const argKey = item.match(/--[\S]+/g)[0];
        if (argKey !== bigName) continue;
        item = item.replace(argKey, '').trim();
        let value = item;
        value = (0, _unquote.default)(value); // check that the value match the args

        if (type && typeof (0, _parse.default)(value) !== type.toLowerCase()) continue;

        if (regex) {
          const r = new RegExp(regex);
          if (!r.test(value)) continue; // check if some parentheses exists

          const matches = value.match(regex);

          if (matches[1] !== undefined) {
            value = matches[1];
          }
        }

        bigArgs.splice(i, 1);

        if (keyPreprocess) {
          resultObject[k] = keyPreprocess((0, _parse.default)(value));
        } else {
          resultObject[k] = (0, _parse.default)(value);
        }

        break;
      }
    }

    if (restArgs && resultObject[k] === undefined) {
      for (let i = 0; i < restArgs.length; i++) {
        let item = restArgs[i];
        item = item.trim();
        let value = item;
        value = (0, _unquote.default)(value); // check that the value match the args

        if (type && typeof (0, _parse.default)(value) !== type.toLowerCase()) {
          continue;
        }

        if (regex) {
          const r = new RegExp(regex);
          if (!r.test(value)) continue; // check if some parentheses exists

          const matches = value.match(regex);

          if (matches[1] !== undefined) {
            value = matches[1];
          }
        }

        restArgs.splice(i, 1);

        if (keyPreprocess) {
          resultObject[k] = keyPreprocess((0, _parse.default)(value));
        } else {
          resultObject[k] = (0, _parse.default)(value);
        }

        break;
      }
    }

    if (resultObject[k] === undefined && defaultValue !== undefined) {
      resultObject[k] = (0, _parse.default)(defaultValue);
    }
  }

  return resultObject; // // split the string without the quotes
  // const parts = string.match(/(('|").*?('|")|[^('|")\s]+)+(?=\s*|\s*$)/g);
  //
  // // init the resulting object
  // const resultObject = {};
  //
  // let argsSettings = {};
  // Object.keys(args).forEach(key => {
  //   const arg = args[key];
  //   let smallName, bigName, type;
  //   // parse the argument definition
  //   const argParts = arg.split(' ');
  //   // loop on the args parts
  //   for (let i=0; i<argParts.length; i++) {
  //     const p = argParts[i];
  //     if (p.slice(0,2) === '--') {
  //       bigName = p.slice(2);
  //     } else if (p.slice(0,1) === '-' && p.length === 2) {
  //       smallName = p.slice(1);
  //     } else {
  //       type = p;
  //     }
  //   }
  //   argsSettings[key] = {
  //     smallName, bigName, type
  //   };
  // });
  //
  // // loop on the parts
  // for (let i=0; i<parts.length; i++) {
  //   const p = parts[i];
  //
  //   let smallName, bigName;
  //   if (p.slice(0,2) === '--') {
  //     bigName = p.slice(2);
  //   } else if (p.slice(0,1) === '-' && p.length === 2) {
  //     smallName = p.slice(1);
  //   }
  //
  //   for (let j=0; j<Object.keys(argsSettings).length; j++) {
  //
  //     const k = Object.keys(argsSettings)[j];
  //
  //     if (resultObject[k] !== undefined) {
  //       delete argsSettings[k];
  //       // console.log(argsSettings);
  //       break;
  //     }
  //
  //     const set = argsSettings[k];
  //
  //     if (smallName && set.smallName === smallName) {
  //       resultObject[k] = __parse(parts[i+1]);
  //       i++;
  //       delete argsSettings[k];
  //       // console.log(argsSettings);
  //       break;
  //     }
  //     if (bigName && set.bigName === bigName) {
  //       resultObject[k] = __parse(parts[i+1]);
  //       i++;
  //       delete argsSettings[k];
  //       // console.log(argsSettings);
  //       break;
  //     }
  //
  //     const type = typeof __parse(p);
  //     // console.log(p, type.charAt(0).toUpperCase() + type.slice(1));
  //     if (type.charAt(0).toUpperCase() + type.slice(1) === set.type) {
  //       delete argsSettings[k];
  //       // console.log(argsSettings);
  //       resultObject[k] = __parse(p);
  //       break;
  //     }
  //   }
  //
  // }
  // return resultObject;
};

exports.default = _default;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unquote;

/**
 * @name        unquote
 * @namespace       sugar.js.string
 * @type      Function
 *
 * Remove the quotes of a string
 * Types of quotes removed :
 * - `"`, `'`, `”`
 *
 * @param    {String}    string    The string to process
 * @param    {Array<String>}    [quotesToRemove=['"','\'','”']]    The quotes to removes
 * @return    {String}    The unquoted string
 *
 * @example    js
 * import unquote from '@coffeekraken/sugar/js/string/unquote'
 * unquote("'Hello world'") // "Hello world"
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function unquote(string, quotesToRemove = ['"', "'", "”"]) {
  // trim the string just in case
  string = string.trim(); // loop on each quotes to remove

  quotesToRemove.forEach(quote => {
    if (string.substr(0, 1) === quote && string.substr(-1) === quote) {
      string = string.substr(1);
      string = string.substr(0, string.length - 1); // break the loop to avoid unquoting multiple levels

      return;
    }
  }); // return the processed string

  return string;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _json = _interopRequireDefault(__webpack_require__(14));

var _toString = _interopRequireDefault(__webpack_require__(31));

var _parse = _interopRequireDefault(__webpack_require__(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  /**
   * @name        encrypt
   * @namespace     sugar.js.crypt.base64
   * @type        Function
   *
   * Encrypt
   *
   * @param       {String}       message        The message to encrypt
   * @return      {String}                       The encrypted message
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  encrypt: function (message) {
    if (typeof message !== 'string') message = (0, _toString.default)(message);
    return btoa(message);
  },

  /**
   * @name        decrypt
   * @namespace       sugar.js.crypt.base64
   * @type        Function
   *
   * Decrypt
   *
   * @param       {String}      message         The message to decrypt
   * @return      {String}                      The decrypted message
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  decrypt: function (message) {
    message = atob(message);
    return (0, _parse.default)(message);
  }
};
exports.default = _default;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isJson;

/**
 * @name        isJson
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Check if the passed value is a valid json
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a valid json, false if not
 *
 * @example    js
 * import isJson from '@coffeekraken/sugar/js/is/json'
 * if (isJson('[{id:10}]')) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isJson(value) {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }

  return true;
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ensureExist = _interopRequireDefault(__webpack_require__(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                              getRegisteredTransports
 * @namespace                         sugar.js.log
 * @type                              Function
 *
 * Return an object with all the registered transports functions stored by transport name
 *
 * @return                      {Object}                                    An object in which keys are transports names and values transports functions
 *
 * @example                   js
 * import getRegisteredTransports from '@coffeekraken/sugar/js/log/getRegisteredTransports';
 * getRegisteredTransports(); // => { console: ... }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = () => {
  (0, _ensureExist.default)('window.Sugar._logTransports');
  return Sugar._logTransports ? Sugar._logTransports : {};
};

exports.default = _default;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ensureExist = _interopRequireDefault(__webpack_require__(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                                  isTransportRegistered
 * @namespace                             sugar.js.log
 * @type                                  Function
 *
 * Check if the passed transport is already registered
 *
 * @param             {String}                name                    The transport name to check
 * @return            {Boolean}                                       true if already registered, false if not
 *
 * @example           js
 * import isTransportRegistered from '@coffeekraken/sugar/js/log/isTransportRegistered';
 * isTransportRegistered('console'); // => true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = name => {
  (0, _ensureExist.default)('window.Sugar._logTransports');
  return Sugar._logTransports[name] ? true : false;
};

exports.default = _default;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root_1 = __webpack_require__(7);

var toSubscriber_1 = __webpack_require__(55);

var observable_1 = __webpack_require__(62);

var pipe_1 = __webpack_require__(63);
/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */


var Observable = function () {
  /**
   * @constructor
   * @param {Function} subscribe the function that is called when the Observable is
   * initially subscribed to. This function is given a Subscriber, to which new values
   * can be `next`ed, or an `error` method can be called to raise an error, or
   * `complete` can be called to notify of a successful completion.
   */
  function Observable(subscribe) {
    this._isScalar = false;

    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  /**
   * Creates a new Observable, with this Observable as the source, and the passed
   * operator defined as the new observable's operator.
   * @method lift
   * @param {Operator} operator the operator defining the operation to take on the observable
   * @return {Observable} a new observable with the Operator applied
   */


  Observable.prototype.lift = function (operator) {
    var observable = new Observable();
    observable.source = this;
    observable.operator = operator;
    return observable;
  };
  /**
   * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
   *
   * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
   *
   * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
   * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
   * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
   * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
   * thought.
   *
   * Apart from starting the execution of an Observable, this method allows you to listen for values
   * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
   * following ways.
   *
   * The first way is creating an object that implements {@link Observer} interface. It should have methods
   * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
   * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
   * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
   * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
   * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
   * be left uncaught.
   *
   * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
   * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
   * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
   * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
   * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
   * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
   *
   * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
   * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
   * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
   * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
   *
   * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
   * It is an Observable itself that decides when these functions will be called. For example {@link of}
   * by default emits all its values synchronously. Always check documentation for how given Observable
   * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
   *
   * @example <caption>Subscribe with an Observer</caption>
   * const sumObserver = {
   *   sum: 0,
   *   next(value) {
   *     console.log('Adding: ' + value);
   *     this.sum = this.sum + value;
   *   },
   *   error() { // We actually could just remove this method,
   *   },        // since we do not really care about errors right now.
   *   complete() {
   *     console.log('Sum equals: ' + this.sum);
   *   }
   * };
   *
   * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
   * .subscribe(sumObserver);
   *
   * // Logs:
   * // "Adding: 1"
   * // "Adding: 2"
   * // "Adding: 3"
   * // "Sum equals: 6"
   *
   *
   * @example <caption>Subscribe with functions</caption>
   * let sum = 0;
   *
   * Rx.Observable.of(1, 2, 3)
   * .subscribe(
   *   function(value) {
   *     console.log('Adding: ' + value);
   *     sum = sum + value;
   *   },
   *   undefined,
   *   function() {
   *     console.log('Sum equals: ' + sum);
   *   }
   * );
   *
   * // Logs:
   * // "Adding: 1"
   * // "Adding: 2"
   * // "Adding: 3"
   * // "Sum equals: 6"
   *
   *
   * @example <caption>Cancel a subscription</caption>
   * const subscription = Rx.Observable.interval(1000).subscribe(
   *   num => console.log(num),
   *   undefined,
   *   () => console.log('completed!') // Will not be called, even
   * );                                // when cancelling subscription
   *
   *
   * setTimeout(() => {
   *   subscription.unsubscribe();
   *   console.log('unsubscribed!');
   * }, 2500);
   *
   * // Logs:
   * // 0 after 1s
   * // 1 after 2s
   * // "unsubscribed!" after 2.5s
   *
   *
   * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
   *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
   *  Observable.
   * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
   *  the error will be thrown as unhandled.
   * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
   * @return {ISubscription} a subscription reference to the registered handlers
   * @method subscribe
   */


  Observable.prototype.subscribe = function (observerOrNext, error, complete) {
    var operator = this.operator;
    var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);

    if (operator) {
      operator.call(sink, this.source);
    } else {
      sink.add(this.source || !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
    }

    if (sink.syncErrorThrowable) {
      sink.syncErrorThrowable = false;

      if (sink.syncErrorThrown) {
        throw sink.syncErrorValue;
      }
    }

    return sink;
  };

  Observable.prototype._trySubscribe = function (sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.syncErrorThrown = true;
      sink.syncErrorValue = err;
      sink.error(err);
    }
  };
  /**
   * @method forEach
   * @param {Function} next a handler for each value emitted by the observable
   * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
   * @return {Promise} a promise that either resolves on observable completion or
   *  rejects with the handled error
   */


  Observable.prototype.forEach = function (next, PromiseCtor) {
    var _this = this;

    if (!PromiseCtor) {
      if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
        PromiseCtor = root_1.root.Rx.config.Promise;
      } else if (root_1.root.Promise) {
        PromiseCtor = root_1.root.Promise;
      }
    }

    if (!PromiseCtor) {
      throw new Error('no Promise impl found');
    }

    return new PromiseCtor(function (resolve, reject) {
      // Must be declared in a separate statement to avoid a RefernceError when
      // accessing subscription below in the closure due to Temporal Dead Zone.
      var subscription;
      subscription = _this.subscribe(function (value) {
        if (subscription) {
          // if there is a subscription, then we can surmise
          // the next handling is asynchronous. Any errors thrown
          // need to be rejected explicitly and unsubscribe must be
          // called manually
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscription.unsubscribe();
          }
        } else {
          // if there is NO subscription, then we're getting a nexted
          // value synchronously during subscription. We can just call it.
          // If it errors, Observable's `subscribe` will ensure the
          // unsubscription logic is called, then synchronously rethrow the error.
          // After that, Promise will trap the error and send it
          // down the rejection path.
          next(value);
        }
      }, reject, resolve);
    });
  };
  /** @deprecated internal use only */


  Observable.prototype._subscribe = function (subscriber) {
    return this.source.subscribe(subscriber);
  };
  /**
   * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
   * @method Symbol.observable
   * @return {Observable} this instance of the observable
   */


  Observable.prototype[observable_1.observable] = function () {
    return this;
  };
  /* tslint:enable:max-line-length */

  /**
   * Used to stitch together functional operators into a chain.
   * @method pipe
   * @return {Observable} the Observable result of all of the operators having
   * been called in the order they were passed in.
   *
   * @example
   *
   * import { map, filter, scan } from 'rxjs/operators';
   *
   * Rx.Observable.interval(1000)
   *   .pipe(
   *     filter(x => x % 2 === 0),
   *     map(x => x + x),
   *     scan((acc, x) => acc + x)
   *   )
   *   .subscribe(x => console.log(x))
   */


  Observable.prototype.pipe = function () {
    var operations = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i - 0] = arguments[_i];
    }

    if (operations.length === 0) {
      return this;
    }

    return pipe_1.pipeFromArray(operations)(this);
  };
  /* tslint:enable:max-line-length */


  Observable.prototype.toPromise = function (PromiseCtor) {
    var _this = this;

    if (!PromiseCtor) {
      if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
        PromiseCtor = root_1.root.Rx.config.Promise;
      } else if (root_1.root.Promise) {
        PromiseCtor = root_1.root.Promise;
      }
    }

    if (!PromiseCtor) {
      throw new Error('no Promise impl found');
    }

    return new PromiseCtor(function (resolve, reject) {
      var value;

      _this.subscribe(function (x) {
        return value = x;
      }, function (err) {
        return reject(err);
      }, function () {
        return resolve(value);
      });
    });
  }; // HACK: Since TypeScript inherits static properties too, we have to
  // fight against TypeScript here so Subject can have a different static create signature

  /**
   * Creates a new cold Observable by calling the Observable constructor
   * @static true
   * @owner Observable
   * @method create
   * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
   * @return {Observable} a new cold observable
   */


  Observable.create = function (subscribe) {
    return new Observable(subscribe);
  };

  return Observable;
}();

exports.Observable = Observable;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isFunction(x) {
  return typeof x === 'function';
}

exports.isFunction = isFunction;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // typeof any so that it we don't have to cast when comparing a result to the error object

exports.errorObject = {
  e: {}
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.empty = {
  closed: true,
  next: function (value) {},
  error: function (err) {
    throw err;
  },
  complete: function () {}
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root_1 = __webpack_require__(7);

var Symbol = root_1.root.Symbol;
exports.rxSubscriber = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */

exports.$$rxSubscriber = exports.rxSubscriber;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = strToHtml;

/**
 * @name        strToHtml
 * @namespace       sugar.js.string
 * @type      Function
 *
 * Return the html (dom) version of a string
 *
 * @param    {HTMLElement}    html    The string to convert to dom nodes
 * @return    {HTMLElement}    The dom nodes representation of the passed string
 *
 * @example    js
 * import strToHtml from '@coffeekraken/sugar/js/string/strToHtml'
 * const myString = '<p>Hello World</p>'
 * strToHtml(myString) // <p>Hello World</p>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function strToHtml(string) {
  if (document !== undefined && document.createElement !== undefined) {
    const cont = document.createElement("div");
    cont.innerHTML = string;

    if (cont.children.length === 1) {
      return cont.children[0];
    } else {
      return cont;
    }
  }

  return string;
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = when;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @name                              when
 * @namespace                         sugar.js.dom
 * @type                              Function
 *
 * Return a promise that will be resolved when the wanted status has been applied on the passed HTMLElement.
 * The status that can be requested are:
 * - attribute : Detect when a special attribute has been applied on the element
 * --- settings.attribute : Specify the attribute to check
 * --- settings.checkFn : An optional function to check the attribute. The promise is resolved when this function return true
 *
 * - inViewport : Detect when the element enter in the viewport
 * --- settings.offset : Specify an offset to detect the in viewport state
 *
 * - outOfViewport : Detect when the element exit the viewport
 * --- settings.offset : Specify an offset to detect the out viewport state
 *
 * - transitionEnd : Detect when the css transition is finished on the element
 * --- settings.callback : An optional callback function if you prefer instead of the promise
 *
 * - visible : Detect when the element become visible
 * --- settings.callback : An optional callback function if you prefer instead of the promise
 *
 * @param               {HTMLElement}                 $node               The HTMLElement to check
 * @param               {String}                      state               The state to check on the HTMLElement
 * @param               {Object}                      [settings={}]       The settings to configure the check process
 * @return              {Promise}                                         A promise that will be resolved when the state is detected
 *
 * @example             js
 * import when from '@coffeekraken/sugar/js/dom/when';
 * when(myCoolNode, 'inViewport').then(() => {
 *    // do something...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function when($node, state, settings = {}) {
  return new Promise(async (resolve, reject) => {
    // check the state to detect
    let importPromise, args;

    switch (state) {
      case 'attribute':
        importPromise = Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(67)));
        args = [$node, settings.attribute, settings.checkFn];
        break;

      case 'inViewport':
        importPromise = Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(69)));
        args = [$node, settings.offset];
        break;

      case 'outOfViewport':
        importPromise = Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(71)));
        args = [$node, settings.offset];
        break;

      case 'transitionEnd':
        importPromise = Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(75)));
        args = [$node, settings.callback];
        break;

      case 'visible':
        importPromise = Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(80)));
        args = [$node, settings.callback];
        break;

      default:
        resolve($node);
        return;
        break;
    } // wait until the module is loaded


    const module = await importPromise; // call the when... function

    module.default.apply(null, args).then(() => {
      // resolve the promise
      resolve($node);
    });
  });
}

;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isVisible;

/**
 * @name      isVisible
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Check if the passed HTMLElement is visible or not.
 * Visible mean that it has not an opacity of 0, not a visibility of hidden and not a display of none
 *
 * @param 		{HTMLElement} 				elm  		The element to check
 * @return 		{Boolean}								If the element is visible or not
 *
 * @example  	js
 * import isVisible from '@coffeekraken/sugar/js/dom/isVisible'
 * if (isVisible(myCoolHTMLElement) {
 * 		// i'm visible
 * }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isVisible(elm) {
  // assume that the script tag is always visible
  if (elm.nodeName.toLowerCase() === "script") return true; // if no offset parent
  // mean that the element is not visible
  // if (elm.offsetParent === null) return false;
  // get style

  const style = window.getComputedStyle(elm, null),
        opacity = style["opacity"],
        visibility = style["visibility"],
        display = style["display"];
  return "0" !== opacity && "none" !== display && "hidden" !== visibility;
}

window.__isVisible = isVisible;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _SquidApp = _interopRequireDefault(__webpack_require__(27));

var _when = _interopRequireDefault(__webpack_require__(24));

var _coffeekrakenLogo = _interopRequireDefault(__webpack_require__(84));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create new squid instance
new _SquidApp.default();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SApp = _interopRequireDefault(__webpack_require__(28));

var _querySelectorLive = _interopRequireDefault(__webpack_require__(1));

var _appendScriptTag = _interopRequireDefault(__webpack_require__(42));

var _base = _interopRequireDefault(__webpack_require__(13));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Squid extends _SApp.default {
  constructor() {
    super({
      name: 'Squid'
    });

    this._importAll(__webpack_require__(44), 'animation');

    this._importAll(__webpack_require__(48), 'view'); // register animations


    this._registerAnimations();
  }

  _importAll(r, scope) {
    if (!Squid.prototype[scope]) Squid.prototype[scope] = {};
    r.keys().forEach(key => {
      const s = key.split('/');
      Squid.prototype[scope][s[s.length - 1].replace('.js', '')] = r(key).default.bind(this);
    });
  }
  /**
   * @name                        _registerAnimations
   * @namespace                   squid.js.class.Squid
   * @type                        Function
   * @private
   *
   * Register all the native animations that can be used with Squid
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _registerAnimations() {
    const sugarInAnimations = __webpack_require__(83);

    sugarInAnimations.keys().forEach(key => {
      const name = key.split('/')[key.split('/').length - 1].replace('.js', '');
      this.animation.register('in', name, sugarInAnimations);
    });
  }

}

exports.default = Squid;
;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _get = _interopRequireDefault(__webpack_require__(29));

var _base = _interopRequireDefault(__webpack_require__(30));

var _base2 = _interopRequireDefault(__webpack_require__(13));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let __decryptedConfig, __decryptedMeta;
/**
 * @name                                            SApp
 * @namespace                                       sugar.js.class
 * @type                                            Class
 *
 * This class represent an application route class. This mean that you can create an application class that extend this one
 * and your instance will have access to a whole package of data like the application name taken from the package.json file, the version,
 * the description, the author(s), the contributor(s), etc...
 *
 * @example             js
 * import SApp = from ''@coffeekraken/sugar/js/class/SApp';
 * class MyCoolApp extends SApp {
 *    // your app class here...
 * }
 * const myApp = new MyCoolApp();
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


class SApp {
  /**
   * @name                __settings
   * @type                Object
   * @private
   */

  /**
   * @name              __meta
   * @type              Object
   * @private
   */

  /**
   * @name              __config
   * @type              Object
   * @private
   */

  /**
   * @name                __data
   * @type                Object
   * @private
   */

  /**
   * @name                __log
   * @type                Object
   * @private
   */

  /**
   * @constructor
   * @param                {Object}                [settings={}]         The application settings
   * @return              {SApp}                                           An SApp instance pn which you will have access to all the application data
   *
   * @setting            {String}                  [name='SApp']         The application name that you want. This will gives you access to your app instance through window.{settings.name}
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    this.__settings = {};
    this.__meta = {};
    this.__config = {};
    this.__data = {};
    this.__log = {};
    // store the settings
    this.__settings = {
      name: 'SApp',
      ...settings
    }; // expose this instance in the "window" scope

    window[this.__settings.name] = this;
  }
  /**
   * @name                            config
   * @namespace                       sugar.js.class.SApp
   * @type                            Function
   *
   * Get a configuration value from the backend using an ajax call
   *
   * @param               {String}              [path=null]                           The configuration object dotted path to get like log.frontend.mail.host
   * @return              {Mixed}                                                     The configuration value getted
   *
   * @example           js
   * const host = await myApp.config('log.frontend.mail.host');
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  config(path = null) {
    let config = window['_' + this.__settings.name + 'Data'].config || {};

    if ((0, _base.default)(config) && !__decryptedConfig) {
      __decryptedConfig = _base2.default.decrypt(config);
    }

    return (0, _get.default)(__decryptedConfig, path);
  }
  /**
   * @name                            meta
   * @namespace                       sugar.js.class.SApp
   * @type                            Function
   *
   * Usefull function that give you back an application meta taken depending on your passed dotted object path
   *
   * @param               {String}              [path=null]                           The meta object dotted path to get like "name"
   * @return              {Mixed}                                                     The meta value getted
   *
   * @example           js
   * const name = await myApp.meta('name');
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  meta(path = null) {
    let meta = window['_' + this.__settings.name + 'Data'].meta || {};

    if ((0, _base.default)(meta) && !__decryptedMeta) {
      __decryptedMeta = _base2.default.decrypt(meta);
    }

    return (0, _get.default)(__decryptedMeta, path);
  }
  /**
   * @name                                  log
   * @namespace                             squid.js.log
   * @type                                  Function
   *
   * Log a message using the transports log system.
   *
   * @param           {String}              message                   The message to log
   * @param           {String}              [type="info"]             The type of log. Can be "error", "warn", "info", "http", "verbose", "debug", "silly"
   * @param           {Array}               [transports=null]         The transports that you want to use for this log process. If null, use all the transports configured in the squid config for the type of log passed
   * @return          {Promise}                                       A promise resolved once the log process is finished
   *
   * @example           js
   * Squid.log('Hello world', 'error').then(() => {
   *    // do something if needed...
   * });
   *
   * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  log(message, type = 'info', transports = null) {
    return new Promise((resolve, reject) => {
      const _this = this; // __ensureExist('window.Squid._log');


      Promise.all([Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(39))), Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(16))), Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(15))), Promise.resolve().then(() => _interopRequireWildcard(__webpack_require__(40)))]).then(modules => {
        const __log = modules[0],
              __isTransportRegistered = modules[1],
              __getRegisteredTransports = modules[2],
              __registerTransport = modules[3]; // get the transports needed for this type

        const configTransports = this.config('log.frontend.transportsByType')[type] ? this.config('log.frontend.transportsByType')[type].split(' ') : [];
        let transp = transports ? transports : configTransports;

        if (!this.__log.sugarTransports) {
          this.__log.sugarTransports = __webpack_require__(41);
        }

        const transportsImportPromises = [];
        transp.forEach(t => {
          if (this.__log.sugarTransports.keys().indexOf(`./${t}.js`) !== -1) {
            transportsImportPromises.push(this.__log.sugarTransports(`./${t}.js`).then(m => {
              if (!__isTransportRegistered.default(t)) __registerTransport.default(t, m.default || m);
            }));
          }
        });
        Promise.all(transportsImportPromises).then(() => {
          __log.default(message, type, transp).then(() => {
            resolve();
          });
        });
      });
    });
  }

}

exports.default = SApp;
;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name                          get
 * @namespace                     sugar.js.object
 * @type                          Function
 *
 * Retreive an object value using a dotted path like "myObject.myProperty.myValue"
 *
 * @param               {Object}                 obj                The object in which to set the value
 * @param               {String}                path                The dotted object path to get
 * @return              {Mixed}                                     The getted value or "undefined" if nothing found...
 *
 * @example             js
 * import get from '@coffeekraken/sugar/js/object/get';
 * get('myObject.cool.value'); // => 'Hello world'
 *
 */
var _default = (obj, path) => {
  if (!path || path === '' || path === '.') return obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');
  var a = path.split('.');
  var o = obj;

  while (a.length) {
    var n = a.shift();
    if (!(n in o)) return;
    o = o[n];
  }

  return o;
};

exports.default = _default;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBase64;

/**
 * @name        isBase64
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Check if the passed value is a base 64 string
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Boolean, false if not
 *
 * @example    js
 * import isBase64 from '@coffeekraken/sugar/js/is/base64'
 * if (isBase64(true) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isBase64(value) {
  if (typeof value !== 'string') return false;

  if (value === '' || value.trim() === '') {
    return false;
  }

  try {
    return btoa(atob(value)) == value;
  } catch (err) {
    return false;
  }
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toString;

var _json = _interopRequireDefault(__webpack_require__(14));

var _object = _interopRequireDefault(__webpack_require__(32));

var _array = _interopRequireDefault(__webpack_require__(33));

var _function = _interopRequireDefault(__webpack_require__(34));

var _boolean = _interopRequireDefault(__webpack_require__(35));

var _regexp = _interopRequireDefault(__webpack_require__(36));

var _string = _interopRequireDefault(__webpack_require__(37));

var _number = _interopRequireDefault(__webpack_require__(38));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        toString
 * @namespace       sugar.js.string
 * @type      Function
 *
 * Convert passed value to a string
 *
 * @param    {Mixed}    value    The value to convert to string
 * @return    {String}    The resulting string
 *
 * @example    js
 * import toString from '@coffeekraken/sugar/js/string/toString'
 * toString({
 * 	id:'hello'
 * }) // '{"id":"hello"}'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function toString(value) {
  if ((0, _string.default)(value)) {
    return value;
  } else if (typeof value === 'symbol' || typeof value === 'typedArray' || typeof value === 'date' || typeof value === 'color') {
    return value.toString();
  } else if ((0, _object.default)(value) || (0, _array.default)(value) || (0, _json.default)(value)) {
    return JSON.stringify(value);
  } else if ((0, _boolean.default)(value)) {
    if (value) return "true";else return "false";
  } else if ((0, _function.default)(value)) {
    return "" + value;
  } else if ((0, _regexp.default)(value)) {
    return value.toString();
  } else if ((0, _number.default)(value)) {
    return value.toString();
  } else if (value === null) {
    return "";
  } else if (value === undefined) {
    return "undefined";
  } else {
    let returnVal;

    try {
      returnVal = JSON.stringify(value);
    } catch (e) {
      try {
        returnVal = value.toString();
      } catch (e) {
        return value;
      }
    }

    return returnVal;
  }
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;

/**
 * @name        isObject
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Check if the passed value is a js object
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a object, false if not
 *
 * @example    js
 * import isObject from '@coffeekraken/sugar/js/is/object'
 * if (isObject({}) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isObject(value) {
  return value && typeof value === "object" && value.constructor === Object;
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isArray;

/**
 * @name        isArray
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Check if the passed value is a js Array
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Array, false if not
 *
 * @example    js
 * import isArray from '@coffeekraken/sugar/js/is/array'
 * if (isArray([]) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isArray(value) {
  return value && typeof value === "object" && value.constructor === Array;
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFunction;

/**
 * @name        isFunction
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Check if the passed value is a js function
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a function, false if not
 *
 * @example    js
 * import isFunction from '@coffeekraken/sugar/js/is/function'
 * if (isFunction(function() {})) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isFunction(value) {
  return value && {}.toString.call(value) === "[object Function]";
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBoolean;

/**
 * @name        isBoolean
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Check if the passed value is a js Boolean
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Boolean, false if not
 *
 * @example    js
 * import isBoolean from '@coffeekraken/sugar/js/is/boolean'
 * if (isBoolean(true) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isBoolean(value) {
  return typeof value === "boolean";
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRegexp;

/**
 * @name        isRegexp
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Check if the passed value is a js Regexp
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Regexp}   true if it's a Regexp, false if not
 *
 * @example    js
 * import isRegexp from '@coffeekraken/sugar/js/is/regexp'
 * if (isRegexp(/^hello$/g) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isRegexp(value) {
  return value && typeof value === "object" && value.constructor === RegExp;
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isString;

/**
 * @name        isString
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Check if the passed value is a js String
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a String, false if not
 *
 * @example    js
 * import isString from '@coffeekraken/sugar/js/is/String'
 * if (isString({}) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isString(value) {
  return typeof value === "string" || value instanceof String;
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNumber;

/**
 * @name        isNumber
 * @namespace       sugar.js.is
 * @type      Function
 *
 * Check if the passed value is a number
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @example 	js
 * import isNumber from '@coffeekraken/sugar/js/is/number';
 * isNumber(12) => true
 * isNumber(22.3) => true
 * isNumber('20') => false
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isNumber(source) {
  return !isNaN(parseFloat(source)) && isFinite(source);
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getRegisteredTransports = _interopRequireDefault(__webpack_require__(15));

var _isTransportRegistered = _interopRequireDefault(__webpack_require__(16));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                      log
 * @namespace                 sugar.js.log
 * @type                      Function
 *
 * Log any message, errors, etc... using the Sugar log system. This let you register some "transports" that will handle your logs differently depending on your configuration and your log call params.
 *
 * @param                 {String}                      message                         The message to log
 * @param                 {String}                      [type=info]                     The log type. Can be "error", "warn", "info", "verbose", "debug", "silly"
 * @param                 {String|Array}                [transports=null]               Which transports you want to use for your message
 *
 * @example           js
 * import log from '@coffeekraken/sugar/js/log/log';
 * log('Hello world', 'error');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = (message, type = 'info', transports = null) => {
  return new Promise((resolve, reject) => {
    const transp = transports ? transports : (0, _getRegisteredTransports.default)().keys();
    const logPromises = [];

    for (let i = 0; i < transp.length; i++) {
      const name = transp[i];

      if (!(0, _isTransportRegistered.default)(name)) {
        console.error(`The log transport "${name}" does not exist...`);
        continue;
      } // call the transport and add it to the promises stack


      logPromises.push(Sugar._logTransports[name](message, type));
    }

    Promise.all(logPromises).then(() => {
      resolve();
    });
  });
};

exports.default = _default;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ensureExist = _interopRequireDefault(__webpack_require__(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                            registerTransport
 * @namespace                       sugar.js.log
 * @type                            Function
 *
 * Register a transport for the log system. A transport is a function that take care the log message passed and the type of the message then return a Promise that will be resolved once the message has been correctly managed.
 *
 * @param                 {String}                  name                        The name of the transport
 * @param                 {Function}                transportFn                 The actual transport function
 *
 * The transport function will take these parameters:
 *
 * @param                 {String}                  message                     The message to log
 * @param                 {String}                  [type = 'info']             The type of the message
 * @return                {Promise}                                             A promise that will be resolved once the message has been handled correctly
 *
 * @example             js
 * import registerTransport from '@coffeekraken/sugar/js/log/registerTransport';
 * registerTransport('myCoolLogTransport', (message, type = 'info') => {
 *    return new Promise((resolve, reject) => {
 *      // handle the message here...
 *      resolve();
 *    });
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = (name, transportFn) => {
  // check params
  if (typeof name !== 'string') throw new Error(`The parameter "name" of the function "registerTransport" has to be a String...`);
  if (typeof transportFn !== 'function') throw new Error('The parameter "transportFn" of the function "registerTransport" has to be a Function...');
  (0, _ensureExist.default)('window.Sugar._logTransports'); // check that the transport passed does not exist already

  if (Sugar._logTransports[name]) {
    console.error(`You try to register the "${name}" log transport function but it already exist...`);
    return false;
  } // save the new transport in the Sugar._logTransports stack


  Sugar._logTransports[name] = transportFn;
};

exports.default = _default;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./console.js": [
		86,
		4
	],
	"./mail.js": [
		87,
		3,
		2
	],
	"./vendors/smtp.js": [
		85,
		5
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 41;
module.exports = webpackAsyncContext;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = appendScriptTag;

var _scriptLoaded = _interopRequireDefault(__webpack_require__(43));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        appendScriptTag
 * @namespace       sugar.js.dom
 * @type      Function
 *
 * Append a script tag either to the head or the body
 *
 * @param    {String}    src    The script src to load
 * @return    {Promise}    A promise resolved with the script tag when it has fully loaded
 *
 * @example    js
 * import appendScriptTag from '@coffeekraken/sugar/js/dom/appendScriptTag'
 * appendScriptTag('dist/js/app.js')
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function appendScriptTag(src, $parent = document.body) {
  const $script = document.createElement("script");
  $script.src = src;
  $parent.appendChild($script);
  return (0, _scriptLoaded.default)($script);
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadScript;

/**
 * @name      scriptLoaded
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Detect when a script has been fully loaded
 *
 * @param    {HTMLScriptElement}    $script    The script element to detect the loading state
 * @return    {Promise}    The promise that will be resolved when the script is fully loaded
 *
 * @example    js
 * import scriptLoaded from '@coffeekraken/sugar/js/dom/scriptLoaded'
 * scriptLoaded($script).then(($script) => {
 *   // do something here
 * })
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function loadScript($script) {
  return new Promise((resolve, reject) => {
    let done = false;
    $script.onload = handleLoad;
    $script.onreadystatechange = handleReadyStateChange;
    $script.onerror = handleError;

    function handleLoad() {
      if (!done) {
        done = true;
        resolve($script);
      }
    }

    function handleReadyStateChange() {
      var state;

      if (!done) {
        state = $script.readyState;

        if (state === "complete") {
          handleLoad();
        }
      }
    }

    function handleError() {
      if (!done) {
        done = true;
        reject($script);
      }
    }
  });
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./call.js": 45,
	"./exist.js": 46,
	"./register.js": 47
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 44;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name                          callAnimation
 * @namespace                     squid.js.core
 * @type                          Function
 *
 * Call an animation by specifying his name and phase. This will load dynamically the animation script if it is not already loaded, then call the animation script automatically.
 *
 * @param                   {String}                          phase                           The animation phase that you want to call
 * @param                   (String}                          name                            The animation name that you want to call
 * @param                   {HTMLElement}                     node                            The HTML node on which you want to apply your animation
 * @return                  {Promise}                                                         A promise that will be resolved at the end of the animation process
 *
 * @example               js
 * Squid.callAnimation('in', 'myCoolAnimation', myCoolNode).then(() => {
 *    // do something on animation end...
 * });
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = (phase, name, node) => {
  return new Promise((resolve, reject) => {
    // check that the animation has been registered correctly
    if (!Squid.__animations[phase][name]) {
      Squid.log(`The wanted animation named "${name}" for the phase "${phase}" does not exist...`, 'error');
      return reject(`The wanted animation named "${name}" for the phase "${phase}" does not exist...`);
    }

    Squid.__animations[phase][name](`./${name}.js`)(node).then(() => {
      resolve();
    });
  });
};

exports.default = _default;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name                          animationExist
 * @namespace                     squid.js.core
 * @type                          Function
 *
 * Check if the passed animation name has been correctly registered in the system
 *
 * @param               {String}                          phase                 The animation phase to check. Can be "in" or "out"
 * @param               {String}                          name                  The animation name to check
 * @return              {Boolean}                                               Return true if the animation exist, false if not
 *
 * @example             js
 * Squid.animationExist('in', 'myCoolAnimation'); // => true
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = (phase, name) => {
  if (!Squid.__animations) return false;
  if (!Squid.__animations[phase]) return false;
  if (!Squid.__animations[phase][name]) return false;
  return true;
};

exports.default = _default;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name                            registerAnimation
 * @namespace                       squid.js.core
 * @type                            Function
 *
 * Register an animation either "in" ou "out" to handle the change of HTML content in the page
 *
 * @param               {String}              phase                   Specify the animation phase. Can be either "in" ou "out"
 * @param               {String}              name                    The name that you want to give to your animation. This name is what will be used to call it
 * @param               {String}              path                    Specify the file path to the animation script
 *
 * @example           js
 * Squid.registerAnimation('in', 'myCoolAnimation', '/the/path/to/the/animation/script/file.js');
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = (phase, name, fn) => {
  // save the animation properties in the global Squid object
  if (!Squid.__animations) Squid.__animations = {};
  if (!Squid.__animations[phase]) Squid.__animations[phase] = {};
  Squid.__animations[phase][name] = fn;
};

exports.default = _default;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./call.js": 49
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 48;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = squidViewToken;

var _SAjax = _interopRequireDefault(__webpack_require__(50));

var _when = _interopRequireDefault(__webpack_require__(24));

var _toDomNodes = _interopRequireDefault(__webpack_require__(82));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function squidViewToken(tokenObject) {
  // grab the node HTMLElement using the specified id
  const $node = document.querySelector(`#${tokenObject.id}`);
  const $loader = $node.querySelector('.view__loader');
  const $content = $node.querySelector('.view__content'); // load the view only when wanted

  if (tokenObject.render) await (0, _when.default)($node, tokenObject.render); // appending the class "view--loading"

  $node.classList.add('view--loading'); // preparing the ajax request

  const ajx = new _SAjax.default({
    url: `view/${tokenObject.view}/${tokenObject.id}`,
    method: 'GET',
    data: {}
  }); // send the request

  ajx.send().then(async data => {
    // insert the view inside the document
    const $newContent = (0, _toDomNodes.default)(data);
    $content.appendChild($newContent); // tell the view is loaded

    setTimeout(() => {
      // removing the class view--loading
      $node.classList.remove('view--loading');
      $node.classList.add('view--loaded');
    }, 100);
  });
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SObject = _interopRequireDefault(__webpack_require__(51));

var _simpleAjax = _interopRequireDefault(__webpack_require__(52));

var _Observable = __webpack_require__(17);

var _strToHtml = _interopRequireDefault(__webpack_require__(23));

var _htmlToStr = _interopRequireDefault(__webpack_require__(65));

var _SAjaxRequest = _interopRequireDefault(__webpack_require__(66));

var _autoCast = _interopRequireDefault(__webpack_require__(3));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name 		SAjax
 * @namespace      sugar.js.class
 * @type    Class
 * @extends 	SObject
 *
 * Class that allows to simply handle ajax requests with ease.
 * This class give some useful features like :
 * - Promise support
 * - Observable support
 * - Recursive requests
 *
 * @example 	js
 * const ajx = new SAjax({
 * 		url : 'api/...',
 * 		method : 'GET',
 * 		data : {
 * 			myVar : 'myVal'
 * 		}
 * }, {
 * 		sendCount : 10,
 * 		sendInterval : 2000,
 * 		beforeSend : (request, sendCount) => {
 * 			request.data.page = sendCount+1;
 * 			return request;
 * 		}
 * });
 *
 * // optionally listen for data through observable
 * ajx.observable.subscribe((response) => {
 * 		// do something with the response here...
 * }, (error) => {
 * 		// something went wrong
 * }, () => {
 * 		// all the requests have been sent
 * });
 *
 * // send and listen for data
 * ajx.send().then((response) => {
 * 		// do something with response here...
 * }, (error) => {
 * 		// something went wrong...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SAjax extends _SObject.default {
  /**
   * Store the observable instance on which you can subscribe for responses
   * @type 	{Observable}
   */

  /**
   * Store the request settings to use
   * @type 	{SAjaxRequest}
   */

  /**
   * The SimpleAjax instance used to make requests under the hood
   * @type 	{SimpleAjax}[https://github.com/MauriceButler/simple-ajax]
   */

  /**
   * Store the Observable observer to be able to call his methods outside
   * @type 	{Object}
   */

  /**
   * Store how many requests have been sent
   * @type 	{Integer}
   */

  /**
   * Store the settings around the request
   * @type 	{Object}
   */

  /**
   * @constructor
   * @param 	{SAjaxRequest} 		request 		The request object used to make ajax call
   * @param 	{Object} 			[settings={}] 	Some settings around the request
   */
  constructor(request, settings = {}) {
    // init parent
    super(); // if the request is not an SAjaxRequest, create it

    this.observable = null;
    this._requestSettings = {};
    this._simpleAjax = null;
    this._observer = null;
    this._requestsCount = 0;
    this._settings = {
      /**
       * Set the interval time between each requests if the sendCount setting is specified
       * @setting
       * @type 		{Number}
       * @default 	1000
       */
      sendInterval: 1000,

      /**
       * Set how many times the request has to be sent
       * @setting
       * @type 		{Integer}
       * @default 	null
       */
      sendCount: null,

      /**
       * A function that will be called before each requests to have a change to update some request params
       * Must return the new request params
       * Will recieve the actual request params and the request count as parameter
       * @setting
       * @type 		{Function}
       * @default 	null
       */
      beforeSend: null,

      /**
       * A cache instance that will be used
       * @setting
       * @type 		{SCache}
       * @default 	null
       */
      cache: null
    };

    if (!(request instanceof _SAjaxRequest.default)) {
      this._requestSettings = new _SAjaxRequest.default(request);
    } else {
      this._requestSettings = request;
    } // extend settings


    Object.assign(this._settings, settings); // create the observable property

    this.observable = new _Observable.Observable(observer => {
      // store the observer into the instance
      this._observer = observer;
    });
  }
  /**
   * Create the request
   */


  _createRequest() {
    // process request settings
    if (this._settings.beforeSend) {
      this._requestSetting = this._settings.beforeSend(this._requestSettings, this._requestsCount);
    } // check type and datas
    // to set datas as query string if is a GET request


    if (this._requestSettings.method.toLowerCase() === "get" && this._requestSettings.data && typeof this._requestSettings.data === "string") {
      // append the data to the URL
      let start = "?";

      if (this._requestSettings.url.indexOf("?") !== -1) {
        start = "&";
      }

      this._requestSettings.url += `${start}${this._requestSettings.data}`;
    } // create the new simple ajax instance


    const simpleAjax = new _simpleAjax.default({ ...this._requestSettings,
      url: this._requestSettings.url.split(/#|%23/)[0]
    });
    simpleAjax._requestSettings = Object.assign({}, this._requestSettings); // listen request states

    simpleAjax.on("success", e => {
      // grab response
      let response = e.target.response; // get the content type

      const contentType = simpleAjax.request.getResponseHeader("content-type") || 'text/plain'; // switch on content type

      switch (true) {
        case contentType.indexOf("text/html") === 0:
          // check if the url has an hash
          // and that the request dataType is html
          const urlParts = simpleAjax._requestSettings.url.toString().split(/#|%23/);

          if (urlParts.length >= 2 && document !== undefined && document.querySelector !== undefined) {
            const html = (0, _strToHtml.default)(response);

            if (html.id === urlParts[1]) {
              response = (0, _htmlToStr.default)(html);
            } else {
              const part = html.querySelector(`#${urlParts[1]}`);

              if (part) {
                response = (0, _htmlToStr.default)(part);
              }
            }
          }

          break;

        case contentType.indexOf("application/json") === 0:
          response = JSON.parse(response);
          break;
      } // check if need to store response in cache


      if (this._settings.cache) {
        console.log("set", simpleAjax._requestSettings.url, response);

        this._settings.cache.set(simpleAjax._requestSettings.url, response);
      } // push the result into the observer


      if (this._observer) this._observer.next(response); // notify Promise

      if (this._resolve) this._resolve(response);
    });
    simpleAjax.on("error", e => {
      // error
      if (this._observer) this._observer.error(e.target.response); // notify promise

      if (this._reject) this._reject(e.target.response);
    });
    simpleAjax.on("complete", e => {
      // check the settings to see if we need to do it again
      // after a certain timeout
      if (this._settings.sendInterval) {
        // handle sendCount
        if (this._settings.sendCount && this._requestsCount >= this._settings.sendCount) {
          // notify subscriber
          if (this._observer) {
            this._observer.complete();
          } // stop here


          return;
        } else if (this._settings.sendCount) {
          // wait the requested timeout and send a new request
          setTimeout(() => {
            this.send();
          }, this._settings.sendInterval);
        }
      }
    }); // save into instance

    this._simpleAjax = simpleAjax;
  }
  /**
   * Send the request and return a promise
   * @return 	{Promise} 	The promise through which you will be notified when data are here
   */


  send() {
    // create the new request
    this._createRequest(); // update request count


    this._requestsCount++; // return a promise

    return new Promise((resolve, reject) => {
      // check if a cache exist and if we have the content
      if (this._settings.cache) {
        const response = this._settings.cache.get(this._requestSettings.url);

        if (response) {
          resolve(response);
          return;
        }
      } // set the resolve and reject callback in the instance


      this._resolve = resolve;
      this._reject = reject; // send the request

      this._simpleAjax.send();
    });
  }

}

exports.default = SAjax;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name 		SObject
 * @namespace     sugar.js.core
 * @type    Class
 *
 * This is the main class that will be the base one for all the others.
 * One class to rule them all...
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SObject {
  /**
   * @constructor
   */
  constructor() {}

}

exports.default = SObject;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventEmitter = __webpack_require__(53).EventEmitter,
    queryString = __webpack_require__(54);

function tryParseJson(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
}

function timeout() {
  this.request.abort();
  this.emit('timeout');
}

function Ajax(settings) {
  var queryStringData,
      ajax = this;

  if (typeof settings === 'string') {
    settings = {
      url: settings
    };
  }

  if (typeof settings !== 'object') {
    settings = {};
  }

  ajax.settings = settings;
  ajax.request = new XMLHttpRequest();
  ajax.settings.method = ajax.settings.method || 'get';

  if (ajax.settings.cors && !'withCredentials' in ajax.request) {
    if (typeof XDomainRequest !== 'undefined') {
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      ajax.request = new XDomainRequest();
    } else {
      // Otherwise, CORS is not supported by the browser.
      ajax.emit('error', new Error('Cors is not supported by this browser'));
    }
  }

  if (ajax.settings.cache === false) {
    ajax.settings.data = ajax.settings.data || {};
    ajax.settings.data._ = new Date().getTime();
  }

  if (ajax.settings.method.toLowerCase() === 'get' && typeof ajax.settings.data === 'object') {
    var urlParts = ajax.settings.url.split('?');
    queryStringData = queryString.parse(urlParts[1]);

    for (var key in ajax.settings.data) {
      queryStringData[key] = ajax.settings.data[key];
    }

    var parsedQueryStringData = queryString.stringify(queryStringData);
    ajax.settings.url = urlParts[0] + (parsedQueryStringData ? '?' + parsedQueryStringData : '');
    ajax.settings.data = null;
  }

  ajax.request.addEventListener('progress', function (event) {
    ajax.emit('progress', event);
  }, false);
  ajax.request.addEventListener('load', function (event) {
    var data = event.target.responseText;

    if (ajax.settings.dataType && ajax.settings.dataType.toLowerCase() === 'json') {
      if (data === '') {
        data = undefined;
      } else {
        data = tryParseJson(data);

        if (data instanceof Error) {
          ajax.emit('error', event, data);
          return;
        }
      }
    }

    if (event.target.status >= 400) {
      ajax.emit('error', event, data);
    } else {
      ajax.emit('success', event, data);
    }
  }, false);
  ajax.request.addEventListener('error', function (event) {
    ajax.emit('error', event);
  }, false);
  ajax.request.addEventListener('abort', function (event) {
    ajax.emit('error', event, new Error('Connection Aborted'));
    ajax.emit('abort', event);
  }, false);
  ajax.request.addEventListener('loadend', function (event) {
    clearTimeout(ajax._requestTimeout);
    ajax.emit('complete', event);
  }, false);
  ajax.request.open(ajax.settings.method || 'get', ajax.settings.url, true);

  if (ajax.settings.cors && 'withCredentials' in ajax.request) {
    ajax.request.withCredentials = !!settings.withCredentials;
  } // Set default headers


  if (ajax.settings.contentType !== false) {
    ajax.request.setRequestHeader('Content-Type', ajax.settings.contentType || 'application/json; charset=utf-8');
  }

  if (ajax.settings.requestedWith !== false) {
    ajax.request.setRequestHeader('X-Requested-With', ajax.settings.requestedWith || 'XMLHttpRequest');
  }

  if (ajax.settings.auth) {
    ajax.request.setRequestHeader('Authorization', ajax.settings.auth);
  } // Set custom headers


  for (var headerKey in ajax.settings.headers) {
    ajax.request.setRequestHeader(headerKey, ajax.settings.headers[headerKey]);
  }

  if (ajax.settings.processData !== false && ajax.settings.dataType === 'json') {
    ajax.settings.data = JSON.stringify(ajax.settings.data);
  }
}

Ajax.prototype = Object.create(EventEmitter.prototype);

Ajax.prototype.send = function () {
  var ajax = this;
  ajax._requestTimeout = setTimeout(function () {
    timeout.apply(ajax, []);
  }, ajax.settings.timeout || 120000);
  ajax.request.send(ajax.settings.data && ajax.settings.data);
};

module.exports = Ajax;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;

if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};

function EventEmitter() {
  EventEmitter.init.call(this);
}

module.exports = EventEmitter; // Backwards-compat with node 0.10.x

EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.

var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function () {
    return defaultMaxListeners;
  },
  set: function (arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }

    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}; // Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.


EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }

  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];

  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);

  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.

  if (doError) {
    var er;
    if (args.length > 0) er = args[0];

    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    } // At least give some kind of context to the user


    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];
  if (handler === undefined) return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  checkListener(listener);
  events = target._events;

  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object

      events = target._events;
    }

    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    } // Check for listener leak


    m = _getMaxListeners(target);

    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true; // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax

      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
}; // Emits a 'removeListener' event if and only if the listener was removed.


EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  checkListener(listener);
  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;

    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }

  return this;
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this; // not listening for removeListener, no need to emit

  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }

    return this;
  } // emit removeListener for all listeners on all events


  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;

    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }

    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];

  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }

  return this;
};

function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;

function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);

  for (var i = 0; i < n; ++i) copy[i] = arr[i];

  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];

  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);

  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }

  return ret;
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/*!
	query-string
	Parse and stringify URL query strings
	https://github.com/sindresorhus/query-string
	by Sindre Sorhus
	MIT License
*/
(function () {
  'use strict';

  var queryString = {};

  queryString.parse = function (str) {
    if (typeof str !== 'string') {
      return {};
    }

    str = str.trim().replace(/^(\?|#)/, '');

    if (!str) {
      return {};
    }

    return str.trim().split('&').reduce(function (ret, param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = parts[0];
      var val = parts[1];
      key = decodeURIComponent(key); // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

      val = val === undefined ? null : decodeURIComponent(val);

      if (!ret.hasOwnProperty(key)) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }

      return ret;
    }, {});
  };

  queryString.stringify = function (obj) {
    return obj ? Object.keys(obj).map(function (key) {
      var val = obj[key];

      if (Array.isArray(val)) {
        return val.map(function (val2) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
        }).join('&');
      }

      return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
  };

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return queryString;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Subscriber_1 = __webpack_require__(56);

var rxSubscriber_1 = __webpack_require__(22);

var Observer_1 = __webpack_require__(21);

function toSubscriber(nextOrObserver, error, complete) {
  if (nextOrObserver) {
    if (nextOrObserver instanceof Subscriber_1.Subscriber) {
      return nextOrObserver;
    }

    if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
      return nextOrObserver[rxSubscriber_1.rxSubscriber]();
    }
  }

  if (!nextOrObserver && !error && !complete) {
    return new Subscriber_1.Subscriber(Observer_1.empty);
  }

  return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}

exports.toSubscriber = toSubscriber;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = void 0 && (void 0).__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var isFunction_1 = __webpack_require__(19);

var Subscription_1 = __webpack_require__(57);

var Observer_1 = __webpack_require__(21);

var rxSubscriber_1 = __webpack_require__(22);
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */


var Subscriber = function (_super) {
  __extends(Subscriber, _super);
  /**
   * @param {Observer|function(value: T): void} [destinationOrNext] A partially
   * defined Observer or a `next` callback function.
   * @param {function(e: ?any): void} [error] The `error` callback of an
   * Observer.
   * @param {function(): void} [complete] The `complete` callback of an
   * Observer.
   */


  function Subscriber(destinationOrNext, error, complete) {
    _super.call(this);

    this.syncErrorValue = null;
    this.syncErrorThrown = false;
    this.syncErrorThrowable = false;
    this.isStopped = false;

    switch (arguments.length) {
      case 0:
        this.destination = Observer_1.empty;
        break;

      case 1:
        if (!destinationOrNext) {
          this.destination = Observer_1.empty;
          break;
        }

        if (typeof destinationOrNext === 'object') {
          // HACK(benlesh): To resolve an issue where Node users may have multiple
          // copies of rxjs in their node_modules directory.
          if (isTrustedSubscriber(destinationOrNext)) {
            var trustedSubscriber = destinationOrNext[rxSubscriber_1.rxSubscriber]();
            this.syncErrorThrowable = trustedSubscriber.syncErrorThrowable;
            this.destination = trustedSubscriber;
            trustedSubscriber.add(this);
          } else {
            this.syncErrorThrowable = true;
            this.destination = new SafeSubscriber(this, destinationOrNext);
          }

          break;
        }

      default:
        this.syncErrorThrowable = true;
        this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
        break;
    }
  }

  Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () {
    return this;
  };
  /**
   * A static factory for a Subscriber, given a (potentially partial) definition
   * of an Observer.
   * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
   * @param {function(e: ?any): void} [error] The `error` callback of an
   * Observer.
   * @param {function(): void} [complete] The `complete` callback of an
   * Observer.
   * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
   * Observer represented by the given arguments.
   */


  Subscriber.create = function (next, error, complete) {
    var subscriber = new Subscriber(next, error, complete);
    subscriber.syncErrorThrowable = false;
    return subscriber;
  };
  /**
   * The {@link Observer} callback to receive notifications of type `next` from
   * the Observable, with a value. The Observable may call this method 0 or more
   * times.
   * @param {T} [value] The `next` value.
   * @return {void}
   */


  Subscriber.prototype.next = function (value) {
    if (!this.isStopped) {
      this._next(value);
    }
  };
  /**
   * The {@link Observer} callback to receive notifications of type `error` from
   * the Observable, with an attached {@link Error}. Notifies the Observer that
   * the Observable has experienced an error condition.
   * @param {any} [err] The `error` exception.
   * @return {void}
   */


  Subscriber.prototype.error = function (err) {
    if (!this.isStopped) {
      this.isStopped = true;

      this._error(err);
    }
  };
  /**
   * The {@link Observer} callback to receive a valueless notification of type
   * `complete` from the Observable. Notifies the Observer that the Observable
   * has finished sending push-based notifications.
   * @return {void}
   */


  Subscriber.prototype.complete = function () {
    if (!this.isStopped) {
      this.isStopped = true;

      this._complete();
    }
  };

  Subscriber.prototype.unsubscribe = function () {
    if (this.closed) {
      return;
    }

    this.isStopped = true;

    _super.prototype.unsubscribe.call(this);
  };

  Subscriber.prototype._next = function (value) {
    this.destination.next(value);
  };

  Subscriber.prototype._error = function (err) {
    this.destination.error(err);
    this.unsubscribe();
  };

  Subscriber.prototype._complete = function () {
    this.destination.complete();
    this.unsubscribe();
  };
  /** @deprecated internal use only */


  Subscriber.prototype._unsubscribeAndRecycle = function () {
    var _a = this,
        _parent = _a._parent,
        _parents = _a._parents;

    this._parent = null;
    this._parents = null;
    this.unsubscribe();
    this.closed = false;
    this.isStopped = false;
    this._parent = _parent;
    this._parents = _parents;
    return this;
  };

  return Subscriber;
}(Subscription_1.Subscription);

exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */

var SafeSubscriber = function (_super) {
  __extends(SafeSubscriber, _super);

  function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
    _super.call(this);

    this._parentSubscriber = _parentSubscriber;
    var next;
    var context = this;

    if (isFunction_1.isFunction(observerOrNext)) {
      next = observerOrNext;
    } else if (observerOrNext) {
      next = observerOrNext.next;
      error = observerOrNext.error;
      complete = observerOrNext.complete;

      if (observerOrNext !== Observer_1.empty) {
        context = Object.create(observerOrNext);

        if (isFunction_1.isFunction(context.unsubscribe)) {
          this.add(context.unsubscribe.bind(context));
        }

        context.unsubscribe = this.unsubscribe.bind(this);
      }
    }

    this._context = context;
    this._next = next;
    this._error = error;
    this._complete = complete;
  }

  SafeSubscriber.prototype.next = function (value) {
    if (!this.isStopped && this._next) {
      var _parentSubscriber = this._parentSubscriber;

      if (!_parentSubscriber.syncErrorThrowable) {
        this.__tryOrUnsub(this._next, value);
      } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
        this.unsubscribe();
      }
    }
  };

  SafeSubscriber.prototype.error = function (err) {
    if (!this.isStopped) {
      var _parentSubscriber = this._parentSubscriber;

      if (this._error) {
        if (!_parentSubscriber.syncErrorThrowable) {
          this.__tryOrUnsub(this._error, err);

          this.unsubscribe();
        } else {
          this.__tryOrSetError(_parentSubscriber, this._error, err);

          this.unsubscribe();
        }
      } else if (!_parentSubscriber.syncErrorThrowable) {
        this.unsubscribe();
        throw err;
      } else {
        _parentSubscriber.syncErrorValue = err;
        _parentSubscriber.syncErrorThrown = true;
        this.unsubscribe();
      }
    }
  };

  SafeSubscriber.prototype.complete = function () {
    var _this = this;

    if (!this.isStopped) {
      var _parentSubscriber = this._parentSubscriber;

      if (this._complete) {
        var wrappedComplete = function () {
          return _this._complete.call(_this._context);
        };

        if (!_parentSubscriber.syncErrorThrowable) {
          this.__tryOrUnsub(wrappedComplete);

          this.unsubscribe();
        } else {
          this.__tryOrSetError(_parentSubscriber, wrappedComplete);

          this.unsubscribe();
        }
      } else {
        this.unsubscribe();
      }
    }
  };

  SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
    try {
      fn.call(this._context, value);
    } catch (err) {
      this.unsubscribe();
      throw err;
    }
  };

  SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
    try {
      fn.call(this._context, value);
    } catch (err) {
      parent.syncErrorValue = err;
      parent.syncErrorThrown = true;
      return true;
    }

    return false;
  };
  /** @deprecated internal use only */


  SafeSubscriber.prototype._unsubscribe = function () {
    var _parentSubscriber = this._parentSubscriber;
    this._context = null;
    this._parentSubscriber = null;

    _parentSubscriber.unsubscribe();
  };

  return SafeSubscriber;
}(Subscriber);

function isTrustedSubscriber(obj) {
  return obj instanceof Subscriber || 'syncErrorThrowable' in obj && obj[rxSubscriber_1.rxSubscriber];
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray_1 = __webpack_require__(58);

var isObject_1 = __webpack_require__(59);

var isFunction_1 = __webpack_require__(19);

var tryCatch_1 = __webpack_require__(60);

var errorObject_1 = __webpack_require__(20);

var UnsubscriptionError_1 = __webpack_require__(61);
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */


var Subscription = function () {
  /**
   * @param {function(): void} [unsubscribe] A function describing how to
   * perform the disposal of resources when the `unsubscribe` method is called.
   */
  function Subscription(unsubscribe) {
    /**
     * A flag to indicate whether this Subscription has already been unsubscribed.
     * @type {boolean}
     */
    this.closed = false;
    this._parent = null;
    this._parents = null;
    this._subscriptions = null;

    if (unsubscribe) {
      this._unsubscribe = unsubscribe;
    }
  }
  /**
   * Disposes the resources held by the subscription. May, for instance, cancel
   * an ongoing Observable execution or cancel any other type of work that
   * started when the Subscription was created.
   * @return {void}
   */


  Subscription.prototype.unsubscribe = function () {
    var hasErrors = false;
    var errors;

    if (this.closed) {
      return;
    }

    var _a = this,
        _parent = _a._parent,
        _parents = _a._parents,
        _unsubscribe = _a._unsubscribe,
        _subscriptions = _a._subscriptions;

    this.closed = true;
    this._parent = null;
    this._parents = null; // null out _subscriptions first so any child subscriptions that attempt
    // to remove themselves from this subscription will noop

    this._subscriptions = null;
    var index = -1;
    var len = _parents ? _parents.length : 0; // if this._parent is null, then so is this._parents, and we
    // don't have to remove ourselves from any parent subscriptions.

    while (_parent) {
      _parent.remove(this); // if this._parents is null or index >= len,
      // then _parent is set to null, and the loop exits


      _parent = ++index < len && _parents[index] || null;
    }

    if (isFunction_1.isFunction(_unsubscribe)) {
      var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);

      if (trial === errorObject_1.errorObject) {
        hasErrors = true;
        errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ? flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
      }
    }

    if (isArray_1.isArray(_subscriptions)) {
      index = -1;
      len = _subscriptions.length;

      while (++index < len) {
        var sub = _subscriptions[index];

        if (isObject_1.isObject(sub)) {
          var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);

          if (trial === errorObject_1.errorObject) {
            hasErrors = true;
            errors = errors || [];
            var err = errorObject_1.errorObject.e;

            if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
              errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
            } else {
              errors.push(err);
            }
          }
        }
      }
    }

    if (hasErrors) {
      throw new UnsubscriptionError_1.UnsubscriptionError(errors);
    }
  };
  /**
   * Adds a tear down to be called during the unsubscribe() of this
   * Subscription.
   *
   * If the tear down being added is a subscription that is already
   * unsubscribed, is the same reference `add` is being called on, or is
   * `Subscription.EMPTY`, it will not be added.
   *
   * If this subscription is already in an `closed` state, the passed
   * tear down logic will be executed immediately.
   *
   * @param {TeardownLogic} teardown The additional logic to execute on
   * teardown.
   * @return {Subscription} Returns the Subscription used or created to be
   * added to the inner subscriptions list. This Subscription can be used with
   * `remove()` to remove the passed teardown logic from the inner subscriptions
   * list.
   */


  Subscription.prototype.add = function (teardown) {
    if (!teardown || teardown === Subscription.EMPTY) {
      return Subscription.EMPTY;
    }

    if (teardown === this) {
      return this;
    }

    var subscription = teardown;

    switch (typeof teardown) {
      case 'function':
        subscription = new Subscription(teardown);

      case 'object':
        if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
          return subscription;
        } else if (this.closed) {
          subscription.unsubscribe();
          return subscription;
        } else if (typeof subscription._addParent !== 'function'
        /* quack quack */
        ) {
            var tmp = subscription;
            subscription = new Subscription();
            subscription._subscriptions = [tmp];
          }

        break;

      default:
        throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
    }

    var subscriptions = this._subscriptions || (this._subscriptions = []);
    subscriptions.push(subscription);

    subscription._addParent(this);

    return subscription;
  };
  /**
   * Removes a Subscription from the internal list of subscriptions that will
   * unsubscribe during the unsubscribe process of this Subscription.
   * @param {Subscription} subscription The subscription to remove.
   * @return {void}
   */


  Subscription.prototype.remove = function (subscription) {
    var subscriptions = this._subscriptions;

    if (subscriptions) {
      var subscriptionIndex = subscriptions.indexOf(subscription);

      if (subscriptionIndex !== -1) {
        subscriptions.splice(subscriptionIndex, 1);
      }
    }
  };

  Subscription.prototype._addParent = function (parent) {
    var _a = this,
        _parent = _a._parent,
        _parents = _a._parents;

    if (!_parent || _parent === parent) {
      // If we don't have a parent, or the new parent is the same as the
      // current parent, then set this._parent to the new parent.
      this._parent = parent;
    } else if (!_parents) {
      // If there's already one parent, but not multiple, allocate an Array to
      // store the rest of the parent Subscriptions.
      this._parents = [parent];
    } else if (_parents.indexOf(parent) === -1) {
      // Only add the new parent to the _parents list if it's not already there.
      _parents.push(parent);
    }
  };

  Subscription.EMPTY = function (empty) {
    empty.closed = true;
    return empty;
  }(new Subscription());

  return Subscription;
}();

exports.Subscription = Subscription;

function flattenUnsubscriptionErrors(errors) {
  return errors.reduce(function (errs, err) {
    return errs.concat(err instanceof UnsubscriptionError_1.UnsubscriptionError ? err.errors : err);
  }, []);
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.isArray = Array.isArray || function (x) {
  return x && typeof x.length === 'number';
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isObject(x) {
  return x != null && typeof x === 'object';
}

exports.isObject = isObject;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var errorObject_1 = __webpack_require__(20);

var tryCatchTarget;

function tryCatcher() {
  try {
    return tryCatchTarget.apply(this, arguments);
  } catch (e) {
    errorObject_1.errorObject.e = e;
    return errorObject_1.errorObject;
  }
}

function tryCatch(fn) {
  tryCatchTarget = fn;
  return tryCatcher;
}

exports.tryCatch = tryCatch;
;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = void 0 && (void 0).__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */


var UnsubscriptionError = function (_super) {
  __extends(UnsubscriptionError, _super);

  function UnsubscriptionError(errors) {
    _super.call(this);

    this.errors = errors;
    var err = Error.call(this, errors ? errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) {
      return i + 1 + ") " + err.toString();
    }).join('\n  ') : '');
    this.name = err.name = 'UnsubscriptionError';
    this.stack = err.stack;
    this.message = err.message;
  }

  return UnsubscriptionError;
}(Error);

exports.UnsubscriptionError = UnsubscriptionError;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root_1 = __webpack_require__(7);

function getSymbolObservable(context) {
  var $$observable;
  var Symbol = context.Symbol;

  if (typeof Symbol === 'function') {
    if (Symbol.observable) {
      $$observable = Symbol.observable;
    } else {
      $$observable = Symbol('observable');
      Symbol.observable = $$observable;
    }
  } else {
    $$observable = '@@observable';
  }

  return $$observable;
}

exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root_1.root);
/**
 * @deprecated use observable instead
 */

exports.$$observable = exports.observable;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var noop_1 = __webpack_require__(64);
/* tslint:enable:max-line-length */


function pipe() {
  var fns = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    fns[_i - 0] = arguments[_i];
  }

  return pipeFromArray(fns);
}

exports.pipe = pipe;
/* @internal */

function pipeFromArray(fns) {
  if (!fns) {
    return noop_1.noop;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input) {
    return fns.reduce(function (prev, fn) {
      return fn(prev);
    }, input);
  };
}

exports.pipeFromArray = pipeFromArray;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:no-empty */

function noop() {}

exports.noop = noop;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = htmlToStr;

/**
 * @name        htmlToStr
 * @namespace       sugar.js.string
 * @type      Function
 *
 * Return the string version of a dom node or the dom node and his children
 *
 * @param    {HTMLElement}    html    The HTMLElement to convert to string
 * @param    {Boolean}    [deep=true]    Include or not his children
 * @return    {String}    The string version of the dom node
 *
 * @example    js
 * import htmlToStr from '@coffeekraken/sugar/js/string/htmlToStr'
 * const myDomNode = document.querySelector('.my-dom-node')
 * htmlToStr(myDomNode, false) // <div class="my-dom-node"></div>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function htmlToStr(html, deep = true) {
  if (document !== undefined && document.createElement !== undefined) {
    const cont = document.createElement("div");
    cont.appendChild(html.cloneNode(deep));
    return cont.innerHTML;
  }

  return html;
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name 		SAjaxRequest
 * @namespace      sugar.js.class
 * @type    Class
 *
 * Class that represent an ajax request that will be passed to an SAjax instance
 *
 * @example 	js
 * const request = new SAjaxRequest({
 *  	url : '/api/...',
 *  	method : 'GET',
 *  	data : {
 *  		myVar : 'myVal'
 *  	}
 * });
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
class SAjaxRequest {
  /**
   * The url to call
   * @type 	{String}
   */

  /**
   * The request method to use like GET, POST, DELETE or PUT
   * @type 		{String}
   */

  /**
   * Use the CORS or not (only for IE)
   * @type 		{Boolean}
   */

  /**
   * Use the cache or not
   * @type 		{Boolean}
   */

  /**
   * The data that will be sent with the request in JSON format
   * @type 		{Object}
   */

  /**
   * The data type expected from the response
   * Accepted dataType are : text | json | html
   * @type 		{String}
   */

  /**
   * Set the content type header to send with the request
   * @type 		{String}
   */

  /**
   * Set the X-Requested-With header
   * @type 		{String}
   */

  /**
   * Set the Authorization header
   * @type 		{String}
   */

  /**
   * Set additional headers to send with the request
   * @type 		{Object}
   */

  /**
   * @constructor
   * @param 	{Object} 	params 		The request params
   */
  constructor(params) {
    this.url = null;
    this.method = "GET";
    this.cors = true;
    this.cache = true;
    this.data = null;
    this.dataType = "text";
    this.contentType = null;
    this.requestedWith = "XMLHttpRequest";
    this.auth = null;
    this.headers = null;
    // check parameters
    if (!this._checkParams(params)) return; // set the parameters

    Object.assign(this, params);
  }
  /**
   * Check the parameters passed to the request
   * @param 	(Object) 	params 	 	The request params
   * @return 	{Boolean} 				True if params are ok, false if
   */


  _checkParams(params) {
    // loop on each params
    for (let key in params) {
      if (!this.hasOwnProperty(key)) {
        throw `The SAjaxRequest does not support the passed "${key}" parameter...`;
        return false;
      }
    } // all ok


    return true;
  }

}

exports.default = SAjaxRequest;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenAttribute;

var _attributesObservable = _interopRequireDefault(__webpack_require__(68));

var _autoCast = _interopRequireDefault(__webpack_require__(3));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      whenAttribute
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Resolve a promise when the wanted attribute on the passed HTMLElement exist or pass the check function provided
 *
 * @param 		{HTMLElement} 				elm 				The HTMLElement on which to monitor the property
 * @param 		{String} 					attribute 			The attribute to monitor
 * @param 		{Function} 					[checkFn=null] 		An optional function to check the attribute. The promise is resolved when this function return true
 * @return 		(Promise) 										The promise that will be resolved when the attribute exist on the element (and that it passes the checkFn)
 *
 * @example 	js
 * import whenAttribute from '@coffeekraken/sugar/js/dom/whenAttribute'
 * whenAttribute(myCoolHTMLElement, 'value').then((value) => {
 * 		// the value attribute exist on the element
 * });
 * // with a checkFn
 * whenAttribute(myCoolHTMLElement, 'value', (newVal, oldVal) => {
 * 		// make sure the value is a number
 * 		return typeof(newVal) === 'number';
 * }).then((value) => {
 * 		// do something with your number value...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function whenAttribute(elm, attrName, checkFn = null) {
  return new Promise((resolve, reject) => {
    if (elm.hasAttribute(attrName)) {
      const value = (0, _autoCast.default)(elm.getAttribute(attrName));

      if (checkFn && checkFn(value, value)) {
        resolve(value);
        return;
      } else if (!checkFn) {
        resolve(value);
        return;
      }
    }

    const obs = (0, _attributesObservable.default)(elm).subscribe(mutation => {
      if (mutation.attributeName === attrName) {
        const value = (0, _autoCast.default)(mutation.target.getAttribute(mutation.attributeName));

        if (checkFn && checkFn(value, mutation.oldValue)) {
          resolve(value);
          obs.unsubscribe();
        } else if (!checkFn) {
          resolve(value);
          obs.unsubscribe();
        }
      }
    });
  });
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Observable = __webpack_require__(17);

/**
 * @name        attributesObservable
 * @namespace       sugar.js.dom
 * @type      Function
 *
 * Observe attributes on an HTMLElement and get mutations through the observable subscription
 *
 * @param 		{HTMLElement} 					target 		The element to observe
 * @param 		{MutationObserverInit} 			settings 	The mutation observer settings
 * @return 		{Observable} 								The mutation observable
 *
 * @example  	js
 * import attributesObservable from 'sugarcss/js/dom/attributesObservable'
 * attributesObservable(myCoolHTMLElement).subscribe((mutation) => {
 * 		// do something with the mutation
 * });
 *
 * @see 		https://developer.mozilla.org/en/docs/Web/API/MutationObserver
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function _default(target, settings = {}) {
  const observable = new _Observable.Observable(observer => {
    // create a new observer
    const mutationObserver = new MutationObserver(mutations => {
      let mutedAttrs = {}; // loop on mutations

      mutations.forEach(mutation => {
        // push mutation
        if (!mutedAttrs[mutation.attributeName]) {
          observer.next(mutation);
          mutedAttrs[mutation.attributeName] = true;
        }
      });
      mutedAttrs = {};
    });
    mutationObserver.observe(target, {
      attributes: true,
      // characterData : true,
      ...settings
    }); // unsubscribe routine

    return () => {
      mutationObserver.disconnect();
    };
  });
  return observable;
}
/**
 * List of attributes to observe
 * @setting
 * @name 		attributes
 * @type 		{Array}
 * @default 	null
 */

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenInViewport;

var _inViewport = _interopRequireDefault(__webpack_require__(70));

var _uniqid = _interopRequireDefault(__webpack_require__(4));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      whenInViewport
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Monitor an HTMLElement to be notified when it is in the viewport
 *
 * @param 		{HTMLElement} 				elm 					The element to monitor
 * @param 		{Number} 					[offset=50] 			An offset that represent the distance before entering the viewport for the detection
 * @return 		(Promise) 											The promise that will be resolved when the element is in the viewport
 *
 * @example 	js
 * import whenInViewport from '@coffeekraken/sugar/js/dom/whenInViewport'
 * whenInViewport(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that has entered the viewport...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function whenInViewport(elm, offset = 50) {
  return new Promise((resolve, reject) => {
    (0, _inViewport.default)(elm, {
      offset: offset
    }, () => {
      resolve(elm);
    });
  });
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = inViewport;
var instances = [];
var supportsMutationObserver = typeof global.MutationObserver === 'function';

function inViewport(elt, params, cb) {
  var opts = {
    container: global.document.body,
    offset: 0,
    debounce: 15,
    failsafe: 150
  };

  if (params === undefined || typeof params === 'function') {
    cb = params;
    params = {};
  }

  var container = opts.container = params.container || opts.container;
  var offset = opts.offset = params.offset || opts.offset;
  var debounceValue = opts.debounce = params.debounce || opts.debounce;
  var failsafe = opts.failsafe = params.failsafe || opts.failsafe; // ensure backward compatibility with failsafe as boolean

  if (failsafe === true) {
    failsafe = 150;
  } else if (failsafe === false) {
    failsafe = 0;
  } // failsafe check always needs to be higher than debounceValue


  if (failsafe > 0 && failsafe < debounceValue) {
    failsafe = debounceValue + 50;
  }

  for (var i = 0; i < instances.length; i++) {
    if (instances[i].container === container && instances[i]._debounce === debounceValue && instances[i]._failsafe === failsafe) {
      return instances[i].isInViewport(elt, offset, cb);
    }
  }

  return instances[instances.push(createInViewport(container, debounceValue, failsafe)) - 1].isInViewport(elt, offset, cb);
}

function addEvent(el, type, fn) {
  if (el.attachEvent) {
    el.attachEvent('on' + type, fn);
  } else {
    el.addEventListener(type, fn, false);
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);

    function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }
  };
} // https://github.com/jquery/sizzle/blob/3136f48b90e3edc84cbaaa6f6f7734ef03775a07/sizzle.js#L708


var contains = function () {
  if (!global.document) {
    return true;
  }

  return global.document.documentElement.compareDocumentPosition ? function (a, b) {
    return !!(a.compareDocumentPosition(b) & 16);
  } : global.document.documentElement.contains ? function (a, b) {
    return a !== b && (a.contains ? a.contains(b) : false);
  } : function (a, b) {
    while (b = b.parentNode) {
      if (b === a) {
        return true;
      }
    }

    return false;
  };
};

function createInViewport(container, debounceValue, failsafe) {
  var watches = createWatches();
  var scrollContainer = container === global.document.body ? global : container;
  var debouncedCheck = debounce(watches.checkAll(watchInViewport), debounceValue);
  addEvent(scrollContainer, 'scroll', debouncedCheck);

  if (scrollContainer === global) {
    addEvent(global, 'resize', debouncedCheck);
  }

  if (supportsMutationObserver) {
    observeDOM(watches, container, debouncedCheck);
  } // failsafe check, every X we check for visible images
  // usecase: a hidden parent containing eleements
  // when the parent becomes visible, we have no event that the children
  // became visible


  if (failsafe > 0) {
    setInterval(debouncedCheck, failsafe);
  }

  function isInViewport(elt, offset, cb) {
    if (!cb) {
      return isVisible(elt, offset);
    }

    var remote = createRemote(elt, offset, cb);
    remote.watch();
    return remote;
  }

  function createRemote(elt, offset, cb) {
    function watch() {
      watches.add(elt, offset, cb);
    }

    function dispose() {
      watches.remove(elt);
    }

    return {
      watch: watch,
      dispose: dispose
    };
  }

  function watchInViewport(elt, offset, cb) {
    if (isVisible(elt, offset)) {
      watches.remove(elt);
      cb(elt);
    }
  }

  function isVisible(elt, offset) {
    if (!elt) {
      return false;
    }

    if (!contains(global.document.documentElement, elt) || !contains(global.document.documentElement, container)) {
      return false;
    } // Check if the element is visible
    // https://github.com/jquery/jquery/blob/740e190223d19a114d5373758127285d14d6b71e/src/css/hiddenVisibleSelectors.js


    if (!elt.offsetWidth || !elt.offsetHeight) {
      return false;
    }

    var eltRect = elt.getBoundingClientRect();
    var viewport = {};

    if (container === global.document.body) {
      viewport = {
        top: -offset,
        left: -offset,
        right: global.document.documentElement.clientWidth + offset,
        bottom: global.document.documentElement.clientHeight + offset
      };
    } else {
      var containerRect = container.getBoundingClientRect();
      viewport = {
        top: containerRect.top - offset,
        left: containerRect.left - offset,
        right: containerRect.right + offset,
        bottom: containerRect.bottom + offset
      };
    } // The element must overlap with the visible part of the viewport


    var visible = eltRect.right >= viewport.left && eltRect.left <= viewport.right && eltRect.bottom >= viewport.top && eltRect.top <= viewport.bottom;
    return visible;
  }

  return {
    container: container,
    isInViewport: isInViewport,
    _debounce: debounceValue,
    _failsafe: failsafe
  };
}

function createWatches() {
  var watches = [];

  function add(elt, offset, cb) {
    if (!isWatched(elt)) {
      watches.push([elt, offset, cb]);
    }
  }

  function remove(elt) {
    var pos = indexOf(elt);

    if (pos !== -1) {
      watches.splice(pos, 1);
    }
  }

  function indexOf(elt) {
    for (var i = watches.length - 1; i >= 0; i--) {
      if (watches[i][0] === elt) {
        return i;
      }
    }

    return -1;
  }

  function isWatched(elt) {
    return indexOf(elt) !== -1;
  }

  function checkAll(cb) {
    return function () {
      for (var i = watches.length - 1; i >= 0; i--) {
        cb.apply(this, watches[i]);
      }
    };
  }

  return {
    add: add,
    remove: remove,
    isWatched: isWatched,
    checkAll: checkAll
  };
}

function observeDOM(watches, container, cb) {
  var observer = new MutationObserver(watch);
  var filter = Array.prototype.filter;
  var concat = Array.prototype.concat;
  observer.observe(container, {
    childList: true,
    subtree: true,
    // changes like style/width/height/display will be catched
    attributes: true
  });

  function watch(mutations) {
    // some new DOM nodes where previously watched
    // we should check their positions
    if (mutations.some(knownNodes) === true) {
      setTimeout(cb, 0);
    }
  }

  function knownNodes(mutation) {
    var nodes = concat.call([], Array.prototype.slice.call(mutation.addedNodes), mutation.target);
    return filter.call(nodes, watches.isWatched).length > 0;
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(18)))

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenOutOfViewport;

var _isInViewport = _interopRequireDefault(__webpack_require__(72));

var _throttle = _interopRequireDefault(__webpack_require__(73));

var _closest = _interopRequireDefault(__webpack_require__(74));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      whenOutOfViewport
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Monitor an HTMLElement to be notified when it exit the viewport
 *
 * @param 		{HTMLElement} 				elm 				The element to monitor
 * @param 		{Number} 					[offset=50] 		An offset that represent the distance before entering the viewport for the detection
 * @return 		(Promise) 										The promise that will be resolved when the element exit the viewport
 *
 * @example 	js
 * import whenOutOfViewport from '@coffeekraken/sugar/js/dom/whenOutOfViewport'
 * whenOutOfViewport(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that has exit the viewport...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function whenOutOfViewport(elm, offset = 50) {
  return new Promise((resolve, reject) => {
    if (window.IntersectionObserver) {
      let isInViewport = false,
          _cb = () => {
        if (!isInViewport) {
          observer.disconnect();
          resolve(elm);
        }
      };

      const observer = new IntersectionObserver((entries, observer) => {
        if (!entries.length) return;
        const entry = entries[0];

        if (entry.intersectionRatio > 0) {
          isInViewport = true;
        } else {
          isInViewport = false;
        }

        _cb();
      }, {
        root: null,
        // viewport
        rootMargin: `${offset}px`,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      });
      observer.observe(elm);
    } else {
      // try to get the closest element that has an overflow
      let scrollContainerElm = document;

      if (!elm._inViewportContainer) {
        const overflowContainer = (0, _closest.default)(elm, "[data-in-viewport-container]");

        if (overflowContainer) {
          scrollContainerElm = overflowContainer;
          elm._inViewportContainer = overflowContainer;
        }
      } else {
        scrollContainerElm = elm._inViewportContainer;
      }

      let isInViewport = true,
          _cb = () => {
        if (!isInViewport) {
          scrollContainerElm.removeEventListener("scroll", checkViewport);
          window.removeEventListener("resize", checkViewport);
          resolve(elm);
        }
      };

      let checkViewport = (0, _throttle.default)(e => {
        isInViewport = (0, _isInViewport.default)(elm, offset);

        _cb();
      }, 100); // listen for resize

      scrollContainerElm.addEventListener("scroll", checkViewport);
      window.addEventListener("resize", checkViewport);
      setTimeout(() => {
        checkViewport(null);
      });
    }
  });
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInViewport;

/**
 * @name      isInViewport
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Check if the passed HTMLElement is in the viewport or not
 *
 * @param 		{HTMLElement} 				elm  			The element to insert
 * @param 		{Object} 					[offset=50] 	An object of top, right, bottom and left offset used to detect the status or an object with top, right, bottom and left offsets
 * @return 		{Boolean									If the element is in the viewport or not
 *
 * @example  	js
 * import isInViewport from '@coffeekraken/sugar/js/dom/isInViewport'
 * if (isInViewport(myCoolHTMLElement) {
 * 		// i'm in the viewport
 * }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isInViewport(elm, offset = 50) {
  // handle offset
  let offsetTop = offset;
  let offsetRight = offset;
  let offsetBottom = offset;
  let offsetLeft = offset;

  if (typeof offset === "object") {
    offsetTop = offset.top || 0;
    offsetRight = offset.right || 0;
    offsetBottom = offset.bottom || 0;
    offsetLeft = offset.left || 0;
  }

  const containerHeight = window.innerHeight || document.documentElement.clientHeight;
  const containerWidth = window.innerWidth || document.documentElement.clientWidth;
  const rect = elm.getBoundingClientRect();
  const isTopIn = rect.top - containerHeight - offsetBottom <= 0;
  const isBottomIn = rect.bottom - offsetTop >= 0;
  const isLeftIn = rect.left - containerWidth - offsetRight <= 0;
  const isRightIn = rect.right - offsetLeft >= 0;
  return isTopIn && isBottomIn && isLeftIn && isRightIn;
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttle;

/**
 * @name        throttle
 * @namespace       sugar.js.function
 * @type      Function
 *
 * This utils function allows you to make sure that a function that will normally be called
 * several times, for example during a scroll event, to be called once each threshhold time
 *
 * @example 		js
 * import throttle from '@coffeekraken/sugar/js/function/throttle';
 * const myThrottledFn = throttle(() => {
 * 		// my function content that will be
 * 		// executed only once each second
 * }, 1000);
 *
 * document.addEventListener('scroll', (e) => {
 * 		// call my throttled function
 * 		myThrottledFn();
 * });
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function throttle(fn, threshhold) {
  threshhold || (threshhold = 250);
  var last, deferTimer;
  return function () {
    var context = this;
    var now = +new Date(),
        args = arguments;

    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closest;

var _matches = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        closest
 * @namespace       sugar.js.dom
 * @type      Function
 *
 * Go up the dom three to find the first element that matches the passed selector
 *
 * @param 		{HTMLElement} 					elm  		The element to start on
 * @param 		{String|Function} 				selector 	A css selector to search for or a check function that will be used
 * @return 		{HTMLElement} 								The element found or null
 *
 * @example  	js
 * import closest from 'sugarcss/js/dom/closest'
 * const closestElm = closest(myCoolElement, '.my-cool-class');
 * if (closestElm) {
 * 		// we have found en element that matches the selector
 * }
 * // the selector param can be a function that need to return either true or false like so:
 * closest(myCoolElement, (elm) => {
 *   return elm.hasAttribute('my-cool-attribute')
 * })
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function closest(elm, selector) {
  const originalElm = elm;
  elm = elm.parentNode;

  while (elm && elm != originalElm.ownerDocument) {
    if (typeof selector === "function") {
      if (selector(elm)) return elm;
    } else if (typeof selector === "string" && (0, _matches.default)(elm, selector)) {
      return elm;
    }

    elm = elm.parentNode;
  }

  return null;
}

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenTransitionEnd;

var _getTransitionProperties = _interopRequireDefault(__webpack_require__(76));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      whenTransitionEnd
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Monitor an HTMLElement to be notified when his transition has ended
 *
 * @param 		{HTMLElement} 				elm 		The element to monitor
 * @param 		{Function} 					[cb=null] 	An optional callback to call when the element transition has ended
 * @return 		(Promise) 								The promise that will be resolved when the element transition has ended
 *
 * @example 	js
 * import whenTransitionEnd from '@coffeekraken/sugar/js/dom/whenTransitionEnd'
 * whenTransitionEnd(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element transition has ended...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function whenTransitionEnd(elm, cb = null) {
  return new Promise((resolve, reject) => {
    const transition = (0, _getTransitionProperties.default)(elm);
    setTimeout(() => {
      resolve();
      cb && cb();
    }, transition.totalDuration);
  });
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTransitionProperties;

var _getStyleProperty = _interopRequireDefault(__webpack_require__(77));

var _autoCast = _interopRequireDefault(__webpack_require__(3));

var _toMs = _interopRequireDefault(__webpack_require__(79));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      getTransitionProperties
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Get the css transition properties from an HTMLElement in an object format
 *
 * @param 		{HTMLElement} 					elm  		The element to get the properties from
 * @return 		{Object} 									The animation properties
 *
 * @example  	js
 * import getTransitionProperties from '@coffeekraken/sugar/js/dom/getTransitionProperties'
 * const props = getTransitionProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	property : ['all'],
 * // 	duration : [200],
 * // 	delay : [0],
 * // 	timingFunction : ['linear'],
 * // 	totalDuration : 200
 * // }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function splitIfNeeded(what, separator) {
  if (what.indexOf(separator) !== -1) {
    return what.split(separator).map(item => item.trim());
  }

  return [what];
}

function getTransitionProperties(elm) {
  // get the transition properties
  const property = (0, _getStyleProperty.default)(elm, "transition-property");
  const duration = (0, _getStyleProperty.default)(elm, "transition-duration") || 0;
  const timingFunction = (0, _getStyleProperty.default)(elm, "transition-timing-function");
  const delay = (0, _getStyleProperty.default)(elm, "transition-delay"); // return the transition object

  const props = {
    property: splitIfNeeded(property, ","),
    duration: splitIfNeeded(duration, ",").map(value => (0, _toMs.default)(value)),
    delay: splitIfNeeded(delay, ",").map(value => (0, _toMs.default)(value)),
    timingFunction: splitIfNeeded(timingFunction, ",")
  };
  let totalDuration = 0;
  let i = 0;
  const delays = [0].concat(props.delay);
  [0].concat(props.duration).forEach(val => {
    if (val + delays[i] > totalDuration) {
      totalDuration = val + delays[i];
    }

    i++;
  });
  props.totalDuration = totalDuration;
  return props;
}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getStyleProperty;

var _camelize = _interopRequireDefault(__webpack_require__(78));

var _autoCast = _interopRequireDefault(__webpack_require__(3));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      getStyleProperty
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Get a style property on the passed element through the computed style.
 * This function try to store the actual style to not trigger more that 1 redraw
 * each js execution loop.
 *
 * @param 		{HTMLElement} 					elm  		The element to get style from
 * @param 		{String} 						property 	The css property to get
 * @return 		{Mixed} 									The style value
 *
 * @example  	js
 * import getStyleProperty from '@coffeekraken/sugar/js/dom/getStyleProperty'
 * const opacity = getStyleProperty(myCoolHTMLElement, 'opacity');
 *
 * @see 		https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getStyleProperty(elm, property) {
  // caching mecanisme
  setTimeout(() => {
    elm._sComputedStyle = null;
  });
  const computed = elm._sComputedStyle || window.getComputedStyle(elm);
  elm._sComputedStyle = computed;
  const prefixes = ["", "webkit-", "moz-", "ms-", "o-", "khtml-"];

  for (let i = 0; i < prefixes.length; i++) {
    const prefix = prefixes[i];
    const value = computed[(0, _camelize.default)(`${prefix}${property}`)];
    if (value && value.trim() !== "") return (0, _autoCast.default)(value);
  }

  return null;
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = camelize;

/**
 * @name        camelize
 * @namespace       sugar.js.string
 * @type      Function
 *
 * Camelize a string
 *
 * @param         {String}          text        The string to camelize
 * @return        {String}                      The camelized string
 *
 * @example     js
 * import camelize from '@coffeekraken/sugar/js/string/camelize';
 * camelize('hello world'); // => HELLO WORLD
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function camelize(text) {
  let res = "";
  res = text.replace(/(?:^|[-_])(\w)/g, function (_, c) {
    return c ? c.toUpperCase() : "";
  });
  res = res.substr(0, 1).toLowerCase() + res.slice(1);
  return res.trim();
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toMs;

/**
 * @name        toMs
 * @namespace       sugar.js.string
 * @type      Function
 *
 * Return the milisecond (ms) representation of a css timing unit
 * Currently support:
 * - milisecond (ms)
 * - second (s)
 *
 * @param    {String}    string    The string timing representation like 1s, 50ms, etc...
 * @return    {String}    The ms representation of the passed string
 *
 * @example    js
 * import toMs from '@coffeekraken/sugar/js/string/toMs'
 * toMs('1.2s') // 1200
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function toMs(string) {
  // parse the string to int to get the lenght of the suffix
  // if (string.substr(0,1) === '.') string = '0${string}';
  const value = parseFloat(string);
  const valueLength = `${value}`.length;
  const suffix = string.substr(valueLength); // switch on suffix

  switch (suffix) {
    case "ms":
      // milisecond
      return value;
      break;

    case "s": // seconds

    default:
      return value * 1000;
      break;
  }
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = whenVisible;

var _isVisible = _interopRequireDefault(__webpack_require__(25));

var _closestNotVisible = _interopRequireDefault(__webpack_require__(81));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      whenVisible
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Monitor an HTMLElement to be notified when it is visible
 *
 * @param 		{HTMLElement} 				elm 		The element to monitor
 * @param 		{Function} 					[cb=null] 	An optional callback to call when the element is visible
 * @return 		(Promise) 								The promise that will be resolved when the element is visible
 *
 * @example 	js
 * import whenVisible from '@coffeekraken/sugar/js/dom/whenVisible'
 * whenVisible(myCoolHTMLElement).then((elm) => {
 * 		// do something with your element that is now visible
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function whenVisible(elm, cb = null) {
  return new Promise((resolve, reject) => {
    // variables
    let isSelfVisible = false,
        areParentsVisible = false,
        closestNotVisible = null,
        selfObserver = null,
        parentObserver = null;

    const _cb = () => {
      if (isSelfVisible && areParentsVisible) {
        // process callbacks
        if (cb) cb(elm);
        resolve(elm); // remove the event listeners

        elm.removeEventListener("transitionend", _eventCb);
        elm.removeEventListener("animationstart", _eventCb);
        elm.removeEventListener("animationend", _eventCb); // remove the event listeners

        if (closestNotVisible) {
          closestNotVisible.removeEventListener("transitionend", _eventCb);
          closestNotVisible.removeEventListener("animationstart", _eventCb);
          closestNotVisible.removeEventListener("animationend", _eventCb);
        }
      }
    }; // function called on each transitionend, start, etc...


    const _eventCb = e => {
      // wait just a little time to check again
      setTimeout(() => {
        if (e.target === elm) {
          if ((0, _isVisible.default)(elm)) {
            isSelfVisible = true;

            if (selfObserver && selfObserver.disconnect) {
              selfObserver.disconnect();
            } // remove the event listeners


            elm.removeEventListener("transitionend", _eventCb);
            elm.removeEventListener("animationstart", _eventCb);
            elm.removeEventListener("animationend", _eventCb);
          }
        } else if (e.target === closestNotVisible) {
          if ((0, _isVisible.default)(closestNotVisible)) {
            areParentsVisible = true;

            if (parentObserver && parentObserver.disconnect) {
              parentObserver.disconnect();
            } // remove the event listeners


            closestNotVisible.removeEventListener("transitionend", _eventCb);
            closestNotVisible.removeEventListener("animationstart", _eventCb);
            closestNotVisible.removeEventListener("animationend", _eventCb);
          }
        } // callback


        _cb();
      });
    }; // check if element itself is not visible


    if (!(0, _isVisible.default)(elm)) {
      selfObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          // check that is the style whos changed
          if (mutation.attributeName === "style" || mutation.attributeName === "class") {
            // check if is visible
            if ((0, _isVisible.default)(mutation.target)) {
              // update
              isSelfVisible = true; // callback

              _cb(); // stop observe


              selfObserver.disconnect();
            }
          }
        });
      });
      selfObserver.observe(elm, {
        attributes: true
      }); // listen for animationstart to check if the element is visible

      elm.addEventListener("animationstart", _eventCb);
      elm.addEventListener("animationend", _eventCb);
      elm.addEventListener("transitionend", _eventCb);
    } else {
      isSelfVisible = true;
    } // get the closest not visible element
    // if found, we monitor it to check when it is visible


    closestNotVisible = (0, _closestNotVisible.default)(elm);

    if (closestNotVisible) {
      parentObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          // check that is the style whos changed
          if (mutation.attributeName === "style" || mutation.attributeName === "class") {
            // check if is visible
            if ((0, _isVisible.default)(mutation.target)) {
              // update
              areParentsVisible = true; // callback

              _cb(); // stop observe


              parentObserver.disconnect();
            }
          }
        });
      });
      parentObserver.observe(closestNotVisible, {
        attributes: true
      }); // listen for animationstart to check if the element is visible

      closestNotVisible.addEventListener("animationstart", _eventCb);
      closestNotVisible.addEventListener("animationend", _eventCb);
      closestNotVisible.addEventListener("transitionend", _eventCb);
    } else {
      areParentsVisible = true;
    } // callback


    _cb();
  });
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closestNotVisible;

var _isVisible = _interopRequireDefault(__webpack_require__(25));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        closestNotVisible
 * @namespace       sugar.js.dom
 * @type      Function
 *
 * Go up the dom three to find the first element that is not visible.
 * Not visible mean that has either an opacity to 0, a visibility to hidden or a display to none
 *
 * @param 		{HTMLElement} 					elm  		The element to start on
 * @return 		{HTMLElement} 								The element found or null
 *
 * @example  	js
 * import closestNotVisible from 'sugarcss/js/dom/closestNotVisible'
 * const closestElm = closestNotVisible(myCoolElement);
 * if (closestElm) {
 * 		// we have found en element that is not visible
 * }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function closestNotVisible(elm) {
  const originalElm = elm;
  elm = elm.parentNode;

  while (elm && elm != originalElm.ownerDocument) {
    if (!(0, _isVisible.default)(elm)) {
      return elm;
    }

    elm = elm.parentNode;
  }

  return null;
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toDomNodes;

var _strToHtml = _interopRequireDefault(__webpack_require__(23));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function processString(string) {
  return string.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&nbsp;/g, " ");
}

function processNodeElm(elm) {
  // check tpl type
  switch (elm.tagName.toLowerCase()) {
    case "script":
      // grab the script content and convert it to html if needed
      return (0, _strToHtml.default)(elm.innerHTML);
      break;

    case "template":
      // get the template content
      return document.importNode(elm.content, true);
      break;

    default:
      return elm;
      break;
  }
}
/**
 * @name      toDomNodes
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Return a usable nodeTree from a variable source like selector, an html string, an html template tag or a node that will be cloned.
 *
 * @param 			{String|HTMLElement} 			source 			The source of the template (html string, selector, node element)
 * @return 			{HTMLElement} 									An HTMLElement node tree that represent the template
 *
 * @example     js
 * import toDomNodes from '@coffeekraken/sugar/js/dom/toDomNodes';
 * toDomNodes('<span>Hello World</span>');
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function toDomNodes(source) {
  // if the source is an HTMLElement
  if (source.tagName) {
    return processNodeElm(source);
  }

  if (typeof source === "string") source = source.trim(); // check source type

  if (typeof source === "string" && source.substr(0, 1) === "<" && source.substr(-1) === ">") {
    // The source is an html string source
    return (0, _strToHtml.default)(source);
  } // string selector


  if (typeof source === "string") {
    // Try to get the template from the document
    const tpl = document.querySelector(source); // if don't found anything

    if (!tpl) return; // process the node

    return processNodeElm(tpl);
  }
}

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./slide.js": 10
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 83;

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "images/.resources/coffeekraken-logo.jpg");

/***/ })
/******/ ]);
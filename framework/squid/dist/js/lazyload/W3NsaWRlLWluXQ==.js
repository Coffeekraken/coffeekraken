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
/******/ 	__webpack_require__.p = "/app/js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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
/* 3 */,
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
/* 5 */,
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
/* 7 */,
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

/***/ })
/******/ ]);
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
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".index.js"
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
/******/ 	__webpack_require__.p = "";
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/balanced-match/index.js":
/*!***********************************************!*\
  !*** ../node_modules/balanced-match/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}


/***/ }),

/***/ "../node_modules/brace-expansion/index.js":
/*!************************************************!*\
  !*** ../node_modules/brace-expansion/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var concatMap = __webpack_require__(/*! concat-map */ "../node_modules/concat-map/index.js");
var balanced = __webpack_require__(/*! balanced-match */ "../node_modules/balanced-match/index.js");

module.exports = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function identity(e) {
  return e;
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length)
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}



/***/ }),

/***/ "../node_modules/braces/index.js":
/*!***************************************!*\
  !*** ../node_modules/braces/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const stringify = __webpack_require__(/*! ./lib/stringify */ "../node_modules/braces/lib/stringify.js");
const compile = __webpack_require__(/*! ./lib/compile */ "../node_modules/braces/lib/compile.js");
const expand = __webpack_require__(/*! ./lib/expand */ "../node_modules/braces/lib/expand.js");
const parse = __webpack_require__(/*! ./lib/parse */ "../node_modules/braces/lib/parse.js");

/**
 * Expand the given pattern or create a regex-compatible string.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces('{a,b,c}', { compile: true })); //=> ['(a|b|c)']
 * console.log(braces('{a,b,c}')); //=> ['a', 'b', 'c']
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {String}
 * @api public
 */

const braces = (input, options = {}) => {
  let output = [];

  if (Array.isArray(input)) {
    for (let pattern of input) {
      let result = braces.create(pattern, options);
      if (Array.isArray(result)) {
        output.push(...result);
      } else {
        output.push(result);
      }
    }
  } else {
    output = [].concat(braces.create(input, options));
  }

  if (options && options.expand === true && options.nodupes === true) {
    output = [...new Set(output)];
  }
  return output;
};

/**
 * Parse the given `str` with the given `options`.
 *
 * ```js
 * // braces.parse(pattern, [, options]);
 * const ast = braces.parse('a/{b,c}/d');
 * console.log(ast);
 * ```
 * @param {String} pattern Brace pattern to parse
 * @param {Object} options
 * @return {Object} Returns an AST
 * @api public
 */

braces.parse = (input, options = {}) => parse(input, options);

/**
 * Creates a braces string from an AST, or an AST node.
 *
 * ```js
 * const braces = require('braces');
 * let ast = braces.parse('foo/{a,b}/bar');
 * console.log(stringify(ast.nodes[2])); //=> '{a,b}'
 * ```
 * @param {String} `input` Brace pattern or AST.
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.stringify = (input, options = {}) => {
  if (typeof input === 'string') {
    return stringify(braces.parse(input, options), options);
  }
  return stringify(input, options);
};

/**
 * Compiles a brace pattern into a regex-compatible, optimized string.
 * This method is called by the main [braces](#braces) function by default.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.compile('a/{b,c}/d'));
 * //=> ['a/(b|c)/d']
 * ```
 * @param {String} `input` Brace pattern or AST.
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.compile = (input, options = {}) => {
  if (typeof input === 'string') {
    input = braces.parse(input, options);
  }
  return compile(input, options);
};

/**
 * Expands a brace pattern into an array. This method is called by the
 * main [braces](#braces) function when `options.expand` is true. Before
 * using this method it's recommended that you read the [performance notes](#performance))
 * and advantages of using [.compile](#compile) instead.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.expand('a/{b,c}/d'));
 * //=> ['a/b/d', 'a/c/d'];
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.expand = (input, options = {}) => {
  if (typeof input === 'string') {
    input = braces.parse(input, options);
  }

  let result = expand(input, options);

  // filter out empty strings if specified
  if (options.noempty === true) {
    result = result.filter(Boolean);
  }

  // filter out duplicates if specified
  if (options.nodupes === true) {
    result = [...new Set(result)];
  }

  return result;
};

/**
 * Processes a brace pattern and returns either an expanded array
 * (if `options.expand` is true), a highly optimized regex-compatible string.
 * This method is called by the main [braces](#braces) function.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.create('user-{200..300}/project-{a,b,c}-{1..10}'))
 * //=> 'user-(20[0-9]|2[1-9][0-9]|300)/project-(a|b|c)-([1-9]|10)'
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.create = (input, options = {}) => {
  if (input === '' || input.length < 3) {
    return [input];
  }

 return options.expand !== true
    ? braces.compile(input, options)
    : braces.expand(input, options);
};

/**
 * Expose "braces"
 */

module.exports = braces;


/***/ }),

/***/ "../node_modules/braces/lib/compile.js":
/*!*********************************************!*\
  !*** ../node_modules/braces/lib/compile.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fill = __webpack_require__(/*! fill-range */ "../node_modules/fill-range/index.js");
const utils = __webpack_require__(/*! ./utils */ "../node_modules/braces/lib/utils.js");

const compile = (ast, options = {}) => {
  let walk = (node, parent = {}) => {
    let invalidBlock = utils.isInvalidBrace(parent);
    let invalidNode = node.invalid === true && options.escapeInvalid === true;
    let invalid = invalidBlock === true || invalidNode === true;
    let prefix = options.escapeInvalid === true ? '\\' : '';
    let output = '';

    if (node.isOpen === true) {
      return prefix + node.value;
    }
    if (node.isClose === true) {
      return prefix + node.value;
    }

    if (node.type === 'open') {
      return invalid ? (prefix + node.value) : '(';
    }

    if (node.type === 'close') {
      return invalid ? (prefix + node.value) : ')';
    }

    if (node.type === 'comma') {
      return node.prev.type === 'comma' ? '' : (invalid ? node.value : '|');
    }

    if (node.value) {
      return node.value;
    }

    if (node.nodes && node.ranges > 0) {
      let args = utils.reduce(node.nodes);
      let range = fill(...args, { ...options, wrap: false, toRegex: true });

      if (range.length !== 0) {
        return args.length > 1 && range.length > 1 ? `(${range})` : range;
      }
    }

    if (node.nodes) {
      for (let child of node.nodes) {
        output += walk(child, node);
      }
    }
    return output;
  };

  return walk(ast);
};

module.exports = compile;


/***/ }),

/***/ "../node_modules/braces/lib/constants.js":
/*!***********************************************!*\
  !*** ../node_modules/braces/lib/constants.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  MAX_LENGTH: 1024 * 64,

  // Digits
  CHAR_0: '0', /* 0 */
  CHAR_9: '9', /* 9 */

  // Alphabet chars.
  CHAR_UPPERCASE_A: 'A', /* A */
  CHAR_LOWERCASE_A: 'a', /* a */
  CHAR_UPPERCASE_Z: 'Z', /* Z */
  CHAR_LOWERCASE_Z: 'z', /* z */

  CHAR_LEFT_PARENTHESES: '(', /* ( */
  CHAR_RIGHT_PARENTHESES: ')', /* ) */

  CHAR_ASTERISK: '*', /* * */

  // Non-alphabetic chars.
  CHAR_AMPERSAND: '&', /* & */
  CHAR_AT: '@', /* @ */
  CHAR_BACKSLASH: '\\', /* \ */
  CHAR_BACKTICK: '`', /* ` */
  CHAR_CARRIAGE_RETURN: '\r', /* \r */
  CHAR_CIRCUMFLEX_ACCENT: '^', /* ^ */
  CHAR_COLON: ':', /* : */
  CHAR_COMMA: ',', /* , */
  CHAR_DOLLAR: '$', /* . */
  CHAR_DOT: '.', /* . */
  CHAR_DOUBLE_QUOTE: '"', /* " */
  CHAR_EQUAL: '=', /* = */
  CHAR_EXCLAMATION_MARK: '!', /* ! */
  CHAR_FORM_FEED: '\f', /* \f */
  CHAR_FORWARD_SLASH: '/', /* / */
  CHAR_HASH: '#', /* # */
  CHAR_HYPHEN_MINUS: '-', /* - */
  CHAR_LEFT_ANGLE_BRACKET: '<', /* < */
  CHAR_LEFT_CURLY_BRACE: '{', /* { */
  CHAR_LEFT_SQUARE_BRACKET: '[', /* [ */
  CHAR_LINE_FEED: '\n', /* \n */
  CHAR_NO_BREAK_SPACE: '\u00A0', /* \u00A0 */
  CHAR_PERCENT: '%', /* % */
  CHAR_PLUS: '+', /* + */
  CHAR_QUESTION_MARK: '?', /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: '>', /* > */
  CHAR_RIGHT_CURLY_BRACE: '}', /* } */
  CHAR_RIGHT_SQUARE_BRACKET: ']', /* ] */
  CHAR_SEMICOLON: ';', /* ; */
  CHAR_SINGLE_QUOTE: '\'', /* ' */
  CHAR_SPACE: ' ', /*   */
  CHAR_TAB: '\t', /* \t */
  CHAR_UNDERSCORE: '_', /* _ */
  CHAR_VERTICAL_LINE: '|', /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: '\uFEFF' /* \uFEFF */
};


/***/ }),

/***/ "../node_modules/braces/lib/expand.js":
/*!********************************************!*\
  !*** ../node_modules/braces/lib/expand.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fill = __webpack_require__(/*! fill-range */ "../node_modules/fill-range/index.js");
const stringify = __webpack_require__(/*! ./stringify */ "../node_modules/braces/lib/stringify.js");
const utils = __webpack_require__(/*! ./utils */ "../node_modules/braces/lib/utils.js");

const append = (queue = '', stash = '', enclose = false) => {
  let result = [];

  queue = [].concat(queue);
  stash = [].concat(stash);

  if (!stash.length) return queue;
  if (!queue.length) {
    return enclose ? utils.flatten(stash).map(ele => `{${ele}}`) : stash;
  }

  for (let item of queue) {
    if (Array.isArray(item)) {
      for (let value of item) {
        result.push(append(value, stash, enclose));
      }
    } else {
      for (let ele of stash) {
        if (enclose === true && typeof ele === 'string') ele = `{${ele}}`;
        result.push(Array.isArray(ele) ? append(item, ele, enclose) : (item + ele));
      }
    }
  }
  return utils.flatten(result);
};

const expand = (ast, options = {}) => {
  let rangeLimit = options.rangeLimit === void 0 ? 1000 : options.rangeLimit;

  let walk = (node, parent = {}) => {
    node.queue = [];

    let p = parent;
    let q = parent.queue;

    while (p.type !== 'brace' && p.type !== 'root' && p.parent) {
      p = p.parent;
      q = p.queue;
    }

    if (node.invalid || node.dollar) {
      q.push(append(q.pop(), stringify(node, options)));
      return;
    }

    if (node.type === 'brace' && node.invalid !== true && node.nodes.length === 2) {
      q.push(append(q.pop(), ['{}']));
      return;
    }

    if (node.nodes && node.ranges > 0) {
      let args = utils.reduce(node.nodes);

      if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
        throw new RangeError('expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.');
      }

      let range = fill(...args, options);
      if (range.length === 0) {
        range = stringify(node, options);
      }

      q.push(append(q.pop(), range));
      node.nodes = [];
      return;
    }

    let enclose = utils.encloseBrace(node);
    let queue = node.queue;
    let block = node;

    while (block.type !== 'brace' && block.type !== 'root' && block.parent) {
      block = block.parent;
      queue = block.queue;
    }

    for (let i = 0; i < node.nodes.length; i++) {
      let child = node.nodes[i];

      if (child.type === 'comma' && node.type === 'brace') {
        if (i === 1) queue.push('');
        queue.push('');
        continue;
      }

      if (child.type === 'close') {
        q.push(append(q.pop(), queue, enclose));
        continue;
      }

      if (child.value && child.type !== 'open') {
        queue.push(append(queue.pop(), child.value));
        continue;
      }

      if (child.nodes) {
        walk(child, node);
      }
    }

    return queue;
  };

  return utils.flatten(walk(ast));
};

module.exports = expand;


/***/ }),

/***/ "../node_modules/braces/lib/parse.js":
/*!*******************************************!*\
  !*** ../node_modules/braces/lib/parse.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const stringify = __webpack_require__(/*! ./stringify */ "../node_modules/braces/lib/stringify.js");

/**
 * Constants
 */

const {
  MAX_LENGTH,
  CHAR_BACKSLASH, /* \ */
  CHAR_BACKTICK, /* ` */
  CHAR_COMMA, /* , */
  CHAR_DOT, /* . */
  CHAR_LEFT_PARENTHESES, /* ( */
  CHAR_RIGHT_PARENTHESES, /* ) */
  CHAR_LEFT_CURLY_BRACE, /* { */
  CHAR_RIGHT_CURLY_BRACE, /* } */
  CHAR_LEFT_SQUARE_BRACKET, /* [ */
  CHAR_RIGHT_SQUARE_BRACKET, /* ] */
  CHAR_DOUBLE_QUOTE, /* " */
  CHAR_SINGLE_QUOTE, /* ' */
  CHAR_NO_BREAK_SPACE,
  CHAR_ZERO_WIDTH_NOBREAK_SPACE
} = __webpack_require__(/*! ./constants */ "../node_modules/braces/lib/constants.js");

/**
 * parse
 */

const parse = (input, options = {}) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  let opts = options || {};
  let max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  if (input.length > max) {
    throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
  }

  let ast = { type: 'root', input, nodes: [] };
  let stack = [ast];
  let block = ast;
  let prev = ast;
  let brackets = 0;
  let length = input.length;
  let index = 0;
  let depth = 0;
  let value;
  let memo = {};

  /**
   * Helpers
   */

  const advance = () => input[index++];
  const push = node => {
    if (node.type === 'text' && prev.type === 'dot') {
      prev.type = 'text';
    }

    if (prev && prev.type === 'text' && node.type === 'text') {
      prev.value += node.value;
      return;
    }

    block.nodes.push(node);
    node.parent = block;
    node.prev = prev;
    prev = node;
    return node;
  };

  push({ type: 'bos' });

  while (index < length) {
    block = stack[stack.length - 1];
    value = advance();

    /**
     * Invalid chars
     */

    if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
      continue;
    }

    /**
     * Escaped chars
     */

    if (value === CHAR_BACKSLASH) {
      push({ type: 'text', value: (options.keepEscaping ? value : '') + advance() });
      continue;
    }

    /**
     * Right square bracket (literal): ']'
     */

    if (value === CHAR_RIGHT_SQUARE_BRACKET) {
      push({ type: 'text', value: '\\' + value });
      continue;
    }

    /**
     * Left square bracket: '['
     */

    if (value === CHAR_LEFT_SQUARE_BRACKET) {
      brackets++;

      let closed = true;
      let next;

      while (index < length && (next = advance())) {
        value += next;

        if (next === CHAR_LEFT_SQUARE_BRACKET) {
          brackets++;
          continue;
        }

        if (next === CHAR_BACKSLASH) {
          value += advance();
          continue;
        }

        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
          brackets--;

          if (brackets === 0) {
            break;
          }
        }
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Parentheses
     */

    if (value === CHAR_LEFT_PARENTHESES) {
      block = push({ type: 'paren', nodes: [] });
      stack.push(block);
      push({ type: 'text', value });
      continue;
    }

    if (value === CHAR_RIGHT_PARENTHESES) {
      if (block.type !== 'paren') {
        push({ type: 'text', value });
        continue;
      }
      block = stack.pop();
      push({ type: 'text', value });
      block = stack[stack.length - 1];
      continue;
    }

    /**
     * Quotes: '|"|`
     */

    if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
      let open = value;
      let next;

      if (options.keepQuotes !== true) {
        value = '';
      }

      while (index < length && (next = advance())) {
        if (next === CHAR_BACKSLASH) {
          value += next + advance();
          continue;
        }

        if (next === open) {
          if (options.keepQuotes === true) value += next;
          break;
        }

        value += next;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Left curly brace: '{'
     */

    if (value === CHAR_LEFT_CURLY_BRACE) {
      depth++;

      let dollar = prev.value && prev.value.slice(-1) === '$' || block.dollar === true;
      let brace = {
        type: 'brace',
        open: true,
        close: false,
        dollar,
        depth,
        commas: 0,
        ranges: 0,
        nodes: []
      };

      block = push(brace);
      stack.push(block);
      push({ type: 'open', value });
      continue;
    }

    /**
     * Right curly brace: '}'
     */

    if (value === CHAR_RIGHT_CURLY_BRACE) {
      if (block.type !== 'brace') {
        push({ type: 'text', value });
        continue;
      }

      let type = 'close';
      block = stack.pop();
      block.close = true;

      push({ type, value });
      depth--;

      block = stack[stack.length - 1];
      continue;
    }

    /**
     * Comma: ','
     */

    if (value === CHAR_COMMA && depth > 0) {
      if (block.ranges > 0) {
        block.ranges = 0;
        let open = block.nodes.shift();
        block.nodes = [open, { type: 'text', value: stringify(block) }];
      }

      push({ type: 'comma', value });
      block.commas++;
      continue;
    }

    /**
     * Dot: '.'
     */

    if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
      let siblings = block.nodes;

      if (depth === 0 || siblings.length === 0) {
        push({ type: 'text', value });
        continue;
      }

      if (prev.type === 'dot') {
        block.range = [];
        prev.value += value;
        prev.type = 'range';

        if (block.nodes.length !== 3 && block.nodes.length !== 5) {
          block.invalid = true;
          block.ranges = 0;
          prev.type = 'text';
          continue;
        }

        block.ranges++;
        block.args = [];
        continue;
      }

      if (prev.type === 'range') {
        siblings.pop();

        let before = siblings[siblings.length - 1];
        before.value += prev.value + value;
        prev = before;
        block.ranges--;
        continue;
      }

      push({ type: 'dot', value });
      continue;
    }

    /**
     * Text
     */

    push({ type: 'text', value });
  }

  // Mark imbalanced braces and brackets as invalid
  do {
    block = stack.pop();

    if (block.type !== 'root') {
      block.nodes.forEach(node => {
        if (!node.nodes) {
          if (node.type === 'open') node.isOpen = true;
          if (node.type === 'close') node.isClose = true;
          if (!node.nodes) node.type = 'text';
          node.invalid = true;
        }
      });

      // get the location of the block on parent.nodes (block's siblings)
      let parent = stack[stack.length - 1];
      let index = parent.nodes.indexOf(block);
      // replace the (invalid) block with it's nodes
      parent.nodes.splice(index, 1, ...block.nodes);
    }
  } while (stack.length > 0);

  push({ type: 'eos' });
  return ast;
};

module.exports = parse;


/***/ }),

/***/ "../node_modules/braces/lib/stringify.js":
/*!***********************************************!*\
  !*** ../node_modules/braces/lib/stringify.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const utils = __webpack_require__(/*! ./utils */ "../node_modules/braces/lib/utils.js");

module.exports = (ast, options = {}) => {
  let stringify = (node, parent = {}) => {
    let invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
    let invalidNode = node.invalid === true && options.escapeInvalid === true;
    let output = '';

    if (node.value) {
      if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
        return '\\' + node.value;
      }
      return node.value;
    }

    if (node.value) {
      return node.value;
    }

    if (node.nodes) {
      for (let child of node.nodes) {
        output += stringify(child);
      }
    }
    return output;
  };

  return stringify(ast);
};



/***/ }),

/***/ "../node_modules/braces/lib/utils.js":
/*!*******************************************!*\
  !*** ../node_modules/braces/lib/utils.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.isInteger = num => {
  if (typeof num === 'number') {
    return Number.isInteger(num);
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isInteger(Number(num));
  }
  return false;
};

/**
 * Find a node of the given type
 */

exports.find = (node, type) => node.nodes.find(node => node.type === type);

/**
 * Find a node of the given type
 */

exports.exceedsLimit = (min, max, step = 1, limit) => {
  if (limit === false) return false;
  if (!exports.isInteger(min) || !exports.isInteger(max)) return false;
  return ((Number(max) - Number(min)) / Number(step)) >= limit;
};

/**
 * Escape the given node with '\\' before node.value
 */

exports.escapeNode = (block, n = 0, type) => {
  let node = block.nodes[n];
  if (!node) return;

  if ((type && node.type === type) || node.type === 'open' || node.type === 'close') {
    if (node.escaped !== true) {
      node.value = '\\' + node.value;
      node.escaped = true;
    }
  }
};

/**
 * Returns true if the given brace node should be enclosed in literal braces
 */

exports.encloseBrace = node => {
  if (node.type !== 'brace') return false;
  if ((node.commas >> 0 + node.ranges >> 0) === 0) {
    node.invalid = true;
    return true;
  }
  return false;
};

/**
 * Returns true if a brace node is invalid.
 */

exports.isInvalidBrace = block => {
  if (block.type !== 'brace') return false;
  if (block.invalid === true || block.dollar) return true;
  if ((block.commas >> 0 + block.ranges >> 0) === 0) {
    block.invalid = true;
    return true;
  }
  if (block.open !== true || block.close !== true) {
    block.invalid = true;
    return true;
  }
  return false;
};

/**
 * Returns true if a node is an open or close node
 */

exports.isOpenOrClose = node => {
  if (node.type === 'open' || node.type === 'close') {
    return true;
  }
  return node.open === true || node.close === true;
};

/**
 * Reduce an array of text nodes.
 */

exports.reduce = nodes => nodes.reduce((acc, node) => {
  if (node.type === 'text') acc.push(node.value);
  if (node.type === 'range') node.type = 'text';
  return acc;
}, []);

/**
 * Flatten an array
 */

exports.flatten = (...args) => {
  const result = [];
  const flat = arr => {
    for (let i = 0; i < arr.length; i++) {
      let ele = arr[i];
      Array.isArray(ele) ? flat(ele, result) : ele !== void 0 && result.push(ele);
    }
    return result;
  };
  flat(args);
  return result;
};


/***/ }),

/***/ "../node_modules/concat-map/index.js":
/*!*******************************************!*\
  !*** ../node_modules/concat-map/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "../node_modules/copy-to/index.js":
/*!****************************************!*\
  !*** ../node_modules/copy-to/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * copy-to - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */



/**
 * slice() reference.
 */

var slice = Array.prototype.slice;

/**
 * Expose copy
 *
 * ```
 * copy({foo: 'nar', hello: 'copy'}).to({hello: 'world'});
 * copy({foo: 'nar', hello: 'copy'}).toCover({hello: 'world'});
 * ```
 *
 * @param {Object} src
 * @return {Copy}
 */

module.exports = Copy;


/**
 * Copy
 * @param {Object} src
 * @param {Boolean} withAccess
 */

function Copy(src, withAccess) {
  if (!(this instanceof Copy)) return new Copy(src, withAccess);
  this.src = src;
  this._withAccess = withAccess;
}

/**
 * copy properties include getter and setter
 * @param {[type]} val [description]
 * @return {[type]} [description]
 */

Copy.prototype.withAccess = function (w) {
  this._withAccess = w !== false;
  return this;
};

/**
 * pick keys in src
 *
 * @api: public
 */

Copy.prototype.pick = function(keys) {
  if (!Array.isArray(keys)) {
    keys = slice.call(arguments);
  }
  if (keys.length) {
    this.keys = keys;
  }
  return this;
};

/**
 * copy src to target,
 * do not cover any property target has
 * @param {Object} to
 *
 * @api: public
 */

Copy.prototype.to = function(to) {
  to = to || {};

  if (!this.src) return to;
  var keys = this.keys || Object.keys(this.src);

  if (!this._withAccess) {
    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      if (to[key] !== undefined) continue;
      to[key] = this.src[key];
    }
    return to;
  }

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!notDefined(to, key)) continue;
    var getter = this.src.__lookupGetter__(key);
    var setter = this.src.__lookupSetter__(key);
    if (getter) to.__defineGetter__(key, getter);
    if (setter) to.__defineSetter__(key, setter);

    if (!getter && !setter) {
      to[key] = this.src[key];
    }
  }
  return to;
};

/**
 * copy src to target,
 * override any property target has
 * @param {Object} to
 *
 * @api: public
 */

Copy.prototype.toCover = function(to) {
  var keys = this.keys || Object.keys(this.src);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    delete to[key];
    var getter = this.src.__lookupGetter__(key);
    var setter = this.src.__lookupSetter__(key);
    if (getter) to.__defineGetter__(key, getter);
    if (setter) to.__defineSetter__(key, setter);

    if (!getter && !setter) {
      to[key] = this.src[key];
    }
  }
};

Copy.prototype.override = Copy.prototype.toCover;

/**
 * append another object to src
 * @param {Obj} obj
 * @return {Copy}
 */

Copy.prototype.and = function (obj) {
  var src = {};
  this.to(src);
  this.src = obj;
  this.to(src);
  this.src = src;

  return this;
};

/**
 * check obj[key] if not defiend
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */

function notDefined(obj, key) {
  return obj[key] === undefined
    && obj.__lookupGetter__(key) === undefined
    && obj.__lookupSetter__(key) === undefined;
}


/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js?!./src/js/_component.scss":
/*!*************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js??ref--4-2!./src/js/_component.scss ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Roboto&display=swap);"]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap);"]);
// Module
exports.push([module.i, "@charset \"UTF-8\";\n/* http://meyerweb.com/eric/tools/css/reset/\n   v2.0-modified | 20110126\n   License: none (public domain)\n*/\n/**\n * @name        __settings\n * @type        {String}\n * @private\n *\n * Store the settings\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name        __current-context\n * @type        {String}\n * @private\n *\n * Store the current context\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name        __generated-vars\n * @type        Map\n * @private\n *\n * Store the map of the generated css vars names to avoid generating another one if already exist\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name          __font-size\n * @type          {Number}\n * @private\n *\n * Store the current registered font size\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name            __svg-icons\n * @type            {Map}\n * @private\n *\n * Store all the registered svg icons\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name          __classes\n * @type          {Map}\n * @private\n *\n * Store all the classes in their namespaces\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name          __classesFiles\n * @type          {Map}\n * @private\n *\n * Store all the classes files that have been registered to be called\n * when the ```Sugar.classes()``` mixin has been called\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n* @name          __classNamespacesWanted\n* @type          {List}\n* @private\n*\n* Store the list of namespaces wanted to be used across the system.\n* By default the value is the ```config.classes.generate.namespace``` setting\n* But will be overrided by the passed value to the ```Sugar.classes({namespaces})``` passed value.\n*\n* @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n*/\n/**\n * @name        settings\n * @type        {Map}\n *\n * Store all the settings\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name    init\n * @namespace           scss.core.mixin\n * @type      mixin\n *\n * Init the sugar toolkit.\n * This has to be called **AFTER** all the [./_s-setup.scss] mixin call\n * and **BEFORE** all the others sugar mixins and functions calls\n *\n * @example     scss\n * \\@include Sugar.init();\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      setup\n * @namespace           scss.core.mixin\n * @type      mixin\n *\n * Setup sugar toolkit by overriding the default [settings](../_settings.scss)\n * This has to be called **BEFORE** the [s-init mixin](./_s-init.scss)\n *\n * @param \t\t\t{Map} \t\t\t$newSettings \t\tThe settings to override the default one with\n *\n * @example       scss\n * \\@include Sugar.setup((\n * \t\ttypo : (\n * \t\t\tfont-size : 12px\n * \t\t),\n * \t\tsizes : (\n * \t\t\tsmall : 0.5,\n * \t\t\tbig : 1.5\n * \t\t)\n * ));\n * // this mixin can be called as many times as you need\n * // this allows you to separate your configs setup into multiple\n * // files...\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      setting\n * @namespace           scss.core.setting\n * @type    function\n *\n * Get a settings from the global settings stack\n *\n * @param \t\t\t\t{String} \t\t\t$path \t\t\t\t\t\tThe setting path wanted separated by dots\n * @param \t\t\t\t{String} \t\t\t[$context=s-context()] \t\tThe context name to get the setting\n * @param \t\t\t\t{Mixed} \t\t\t[$default=null] \t\t\tThe value to return if no value is found\n * @return \t\t\t\t{Mixed} \t\t\t\t\t\t\t\t\t\tThe setting value¨\n *\n * @example\n * $font-size : Sugar.setting('typography.font-size');\n * // etc...\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      setting-var\n * @namespace           scss.core.setting\n * @type    function\n *\n * Get a settings from the global settings stack and return it in var(...) format\n *\n * @param \t\t\t\t{String} \t\t\t$path \t\t\t\t\t\tThe setting path wanted separated by dots\n * @param \t\t\t\t{String} \t\t\t[$context=s-context()] \t\tThe context name to get the setting\n * @param \t\t\t\t{Mixed} \t\t\t[$default=null] \t\t\tThe value to return if no value is found\n * @return \t\t\t\t{Mixed} \t\t\t\t\t\t\t\t\t\tThe setting value\n *\n * @example       scss\n * .my-cool-element {\n *    color: Sugar.setting-var('typography.font-size');\n * }\n * // etc...\n *\n * @since       2.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      animation\n * @namespace           scss.core.mixin\n * @type      mixin\n *\n * Print out the animation property calculated with the passed arguments\n * This mixin support all the standard css animation properties like name, duration, delay, ease, direction and fill-mode.\n * The $animations argument will be parsed with the [../functions/_s-parse-properties.scss] function.\n * If you specify multiple animations at a time, this mixin will take care\n * of the delay calculation for each animations and make them play one after another\n *\n * @param \t\t\t{List} \t\t\t\t$animations \t\t\tThe animations wanted like : coco .2s ease-in-out reverse\n *\n * @example     scss\n * .my-cool-element {\n * \t\t@include Sugar.animation(my-animation 1s ease-in-out, another-animation 4s);\n * \t\t// animation : my-animation 1s 0s ease-in-out 1 normal forwards, another-animation 4s 1s ease-in-out 1 normal forwards;\n * }\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    classes\n * @namespace           scss.core.class\n * @type      mixin\n *\n * Print out all wanted registered classes like padding helpers, margin helpers, font helpers, etc...\n *\n * @param \t\t\t{List}<string> \t\t\t$namespaces \t\tThe classes namespaces wanted\n *\n * @example     scss\n * \\@include Sugar.classes(); // will print out all the classes\n * \\@include Sugar.classes('sugar.font'); // will print all the font classes\n * \\@include Sugar.classes('sugar.clearfix' 'sugar.pull'); // the clearfixes and the pull classes\n * // etc...\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      color\n * @namespace           scss.core.color\n * @type      function\n *\n * Get a registered color by name or wrap a new color into a sugar.color call\n * to manipulate it with ease.\n * Supported actions :\n * - hue {Deg}\n * - lighten {Percent}\n * - darken {Percent}\n * - saturate {Percent}\n * - desaturate {Percent}\n * - grayscale {Boolean}\n * - complement {Boolean}\n * - invert {Boolean}\n * - opacity {Percent}\n * - mix {Color}\n * - lightness {Percent}\n * - saturation {Percent}\n *\n * @param \t\t{String|Color} \t\t$color \t\t\t\tThe color name or the color value to manipulate\n * @param \t\t{String|List} \t\t\t[$modifier=null] \tThe color modifier to apply. Can be a registered modifier name or a modifier list\n * @return \t\t{Color} \t\t\t\t\t\t\t\t\tThe actual color value\n *\n * @example \t \tscss\n * // default color (settings.colors.default)\n * $myColor : Sugar.color(default);\n * // primary color (settings.colors.primary)\n * $primary : Sugar.color(primary);\n * // manipulate\n * $primary-dark : Sugar.color(primary, -darken 10%);\n * // registered modifier\n * $primary-light : Sugar.color(primary, light);\n * // $name as list\n * $modified primary : Sugar.color((primary, -darken 10%));\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    color-hue\n * @namespace           scss.core.color\n * @type          Function\n *\n * Return the hue of the passed color\n *\n * @param       {Color}     $color      The color to process\n * @return      {Number}                The color hue\n *\n * @example   scss\n * Sugar.color-hue(#e1d7d2); // => 20deg\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      color-lightness\n * @namespace           scss.core.color\n * @type          Function\n *\n * Return the lightness of the passed color\n *\n * @param         {Color}       $color      The color to check\n * @return        {Number}                  The color lightness\n *\n * @example     scss\n * Sugar.color-lightness(#e1d7d2); // => 85.2941176471%\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    color-modifier\n * @namespace           scss.core.color\n * @type      function\n *\n * Return the color in a modifier list\n *\n * @param \t\t\t{List} \t\t\t$modifiers \t\tThe modifiers list\n * @return \t\t\t{String} \t\t\t\t\t\tThe color name\n *\n * @example\n * $my-color : Sugar.color-modifier(outline primary); // => primary\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    color-opacity\n * @namespace           scss.core.color\n * @type          Function\n *\n * Return the opacity of the passed color\n *\n * @param       {Color}       $color        The color to prcess\n * @return      {Number}                    The color opacity\n *\n * @example     scss\n * Sugar.color-opacity(#e1d7d2); // => 1\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    color-saturation\n * @namespace           scss.core.color\n * @type          Function\n *\n * Return the saturation of the passed color\n *\n * @param       {Color}     $color      The color to process\n * @return      {Number}                The color saturation\n *\n * @example   scss\n * Sugar.color-saturation(#e1d7d2); // => 20%\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      color-schema\n * @namespace           scss.core.color\n * @type      mixin\n *\n * Print out the scoped color schema css\n *\n * @param \t\t{String} \t\t\t$name \t\t\tThe color schema name\n *\n * @example       scss\n * \\@include Sugar.color-schema(light) {\n * \t\th1, h2 {\n * \t\t\tcolor : white;\n * \t\t}\n * }\n * // will print\n * .cs-light h1,\n * .cs-light h2 {\n * \t\tcolor : white;\n * }\n *\n * h1, h2 {\n * \t\t\\@include Sugar.color-schema(light) {\n * \t\t\tcolor : white;\n * \t\t}\n * }\n * // will print\n * .cs-light h1, h1.cs-light,\n * .cs-light h2, h2.cs-light {\n * \t\tcolor : white;\n * }\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    color-transparentize\n * @namespace           scss.core.color\n * @type          Function\n *\n * Makes $color more transparent.\n * The $amount must be a number between 0 and 1 (inclusive). Decreases the alpha channel of $color by that amount.\n *\n * @param       {Color}       $color        The color to process\n * @param       {Number}      $amount       The amount to transparentize the color. Must be between 0 and 1\n *\n * @example       scss\n * Sugar.color-transparentize(rgba(#036, 0.3), 0.3); // => rgba(0, 51, 102, 0)\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      docblock-colors\n * @namespace           scss.core.color\n * @type      mixin\n *\n * Print the styleguide docblocks for the registered sugar colors\n *\n * @example     scss\n * @include Sugar.docblock-colors();\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      has-color\n * @namespace           scss.core.color\n * @type    function\n *\n * Check if the provided color is a registered one or not\n *\n * @param \t\t{String} \t\t$color \t\tThe color nane to check\n * @return \t\t{Boolean} \t\t\t\t\tTrue if exists, false if not\n *\n * @example     scss\n * Sugar.has-color(primary); // => true\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name        __settings\n * @type        {String}\n * @private\n *\n * Store the settings\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name        __current-context\n * @type        {String}\n * @private\n *\n * Store the current context\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name        __generated-vars\n * @type        Map\n * @private\n *\n * Store the map of the generated css vars names to avoid generating another one if already exist\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name          __font-size\n * @type          {Number}\n * @private\n *\n * Store the current registered font size\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name            __svg-icons\n * @type            {Map}\n * @private\n *\n * Store all the registered svg icons\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name          __classes\n * @type          {Map}\n * @private\n *\n * Store all the classes in their namespaces\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name          __classesFiles\n * @type          {Map}\n * @private\n *\n * Store all the classes files that have been registered to be called\n * when the ```Sugar.classes()``` mixin has been called\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n* @name          __classNamespacesWanted\n* @type          {List}\n* @private\n*\n* Store the list of namespaces wanted to be used across the system.\n* By default the value is the ```config.classes.generate.namespace``` setting\n* But will be overrided by the passed value to the ```Sugar.classes({namespaces})``` passed value.\n*\n* @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n*/\n/**\n * @name      context\n * @namespace           scss.core.context\n * @type      function\n * Return the name of the context setted with the [../mixins/_context.scss] mixin\n *\n * @param \t\t\t{String} \t\t\t[$default=null] \t\tThe name to return if no context exist\n * @return \t\t\t{String} \t\t\t\t\t\t\t\t\tThe context name\n *\n * @example\n * // register a context\n * \\@include Sugar.context-setup('my-context', (\n * \t\t// override some settings here...\n * ));\n *\n * Sugar.context('hello') // => 'hello'\n * \\@include Sugar.context('my-context') {\n * \t\tSugar.context('hello') // => 'my-context'\n * }\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com);\n */\n/**\n * @name      context\n * @namespace           scss.core.context\n * @type      mixin\n *\n * Set a context to be used inside the mixin\n *\n * @param \t\t\t{String|Map} \t\t\t$name-or-map \t\tThe name of a registered context or a map\n *\n * @example     scss\n * // register a context\n * \\@include Sugar.context-setup(my-cool-context, (\n * \t\tlook-and-feel : (\n * \t\t\tpadding-vertical : (\n * \t\t\t\tdefault : 0.6em\n * \t\t\t)\n * \t\t)\n * ));\n *\n * // registered context\n * \\@include Sugar.context(my-cool-context) {\n * \t\t// your code here...\n * }\n *\n * // inline context\n * \\@include Sugar.context((\n * \t\tlook-and-feel : (\n * \t\t\tpadding-vertical : (\n * \t\t\t\tdefault : .3em\n * \t\t\t)\n * \t\t)\n * )) {\n * \t\t// your code here...\n * }\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      context-setup\n * @namespace           scss.core.context\n * @type      mixin\n *\n * Register a context with a name to use it later\n *\n * @param \t\t\t{String} \t\t$name \t\t\tThe context name\n * @param \t\t\t{Map} \t\t\t$settings \t\tThe settings to override for this context\n *\n * @example       scss\n * \\@include Sugar.context-setup(my-cool-context, (\n * \t\tlook-and-feel : (\n * \t\t\tpadding-vertical : (\n * \t\t\t\tdefault : 0.6em\n * \t\t\t)\n * \t\t)\n * ));\n *\n * // using your context\n * \\@include Sugar.context(my-cool-context) {\n * \t\tSugar.look-and-feel(padding-vertical); // => 0.6em\n * }\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      _check-property\n * @namespace           scss.core.dev\n * @type      function\n *\n * Check a property types and values\n *\n * @param         {String}        $property         The property name to check\n * @param         {String}        $type             The property type wanted\n * @param         {Mixed}         $value            The property value to check\n * @param         {Boolean}       [$check-only=false]  Define if we want to throw an error or just send back false on type error\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      _get-property-name\n * @namespace           scss.core.dev\n * @type      function\n *\n * Return the property name\n *\n * @param       {String}        $property         The property name to get\n * @param       {Map}           [$keywords=()]    The\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      _get-property-type\n * @namespace           scss.core.dev\n * @type      function\n *\n * Get the property type\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    test-argument\n * @namespace           scss.core.dev\n * @type    function\n *\n * Test an argument passed to a function or a mixin to ensure his type, value, etc...\n * If the argument does not pass the test, an error will be thrown, unless the $check-only argument is true\n *\n * @param \t\t\t\t{String} \t\t\t\t$method \t\t\t\tThe function/mixin name (debug purpose)\n * @param \t\t\t\t{String} \t\t\t\t$argument \t\t\t\tThe argument name to test (debug purpose)\n * @param \t\t\t\t{List|String} \t\t\t$type-or-values \t\tIf string, the type(s) that the argument must match, if list, the possible values that the argument can take\n * @param \t\t\t\t{Mixed} \t\t\t\t$value \t\t\t\t\tThe actual argument value\n * @param \t\t\t\t{Boolean} \t\t\t\t[$check-only=false]\t\tIf this is true, will not thrown any error\n * @return \t\t\t\t{Mixed} \t\t\t\t\t\t\t\t\t\tThe value if ok, false if not\n *\n * @example     scss\n * \\@mixin my-cool-mixin($argument1, $argument2) {\n *        $argument1 : Sugar.test-argument(my-cool-mixin, argument1, string, $argument1);\n *        $argument2 : Sugar.test-argument(my-cool-mixin, argument2, (hello,world,12), $argument2);\n * }\n * \\@mixin my-cool-mixin(hello, world); // ok\n * \\@mixin my-cool-mixin(hello, universe); // throw an error\n * \\@mixin my-cool-mixin(12, world); // throw an error\n *\n * @author \t\t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    filter\n * @namespace           scss.core.filter\n * @type    function\n *\n * Return a list with all the filters that are passed as argument\n * This will use the [./_s-filter-map.scss] function to parse the filters\n *\n * @param \t \t{List}<String> \t\t\t$filters \t\t\tThe registered filter(s) name(s) or the filter(s) string(s) to transform into list\n * @return \t\t{List} \t\t\t\t\t\t\t\t\t\tThe converted filters list to use as css property\n *\n * @example\n * // register a filter\n * \\@include Sugar.setup((\n * \t\tfilters : (\n * \t\t\tmyCoolFilter : box-shadow(#000 0 0 10px) blur(30px),\n * \t\t\t// other filters...\n * \t\t)\n * ));\n *\n * // registered filter\n * .my-cool-elememt {\n * \t\tfilter : Sugar.filter(myCoolFilter);\n * \t\t// filter : box-shadow(#000 0 0 10px) blur(30px);\n * }\n *\n * // custom filter\n * .my-cool-element {\n * \t\tfilter : Sugar.filter(myCoolFilter invert(100%));\n * \t\t// filter : box-shadow(#000 0 0 10px) blur(30px) invert(100%);\n * }\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    filter-map\n * @namespace           scss.core.map\n * @type      function\n *\n * Take a filter as parameter and parse it to return the {Map} corresponding\n * The $filter parameter can be either a registered filter name or a filter formated like `filterName(filterValue)`\n *\n * @param \t\t\t{List}<String> \t\t\t$filter \t\t\tThe registered filter name or the filter string to transform into map\n * @return \t\t\t{Map} \t\t\t\t\t\t\t\t\t\tThe corresponding filter map properties\n *\n * @example\n * // register a filter\n * \\@include Sugar.setup((\n * \t\tfilters : (\n * \t\t\tmyCoolFilter : box-shadow(#000 0 0 10px) blur(30px),\n * \t\t\t// other filters...\n * \t\t)\n * ));\n *\n * // registered filter\n * Sugar.filter-map(myCoolFilter);\n * // {\n * // \tbox-shadow : #000 0 0 10px,\n * // \tblur : 30px\n * // }\n *\n * // custom filter\n * Sugar.filter-map(blur(10px));\n * // {\n * // \tblur : 10px\n * // }\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      filter\n * @namespace           scss.core.filter\n * @type      mixin\n *\n * Print out a list with all the filters that are passed as argument\n * This will use the [../functions/_filter-map.scss] function to parse the filters\n *\n * @param \t \t{List}<String> \t\t\t$filters \t\t\tThe registered filter(s) name(s) or the filter(s) string(s) to transform into list\n *\n * @example     scss\n * // register a filter\n * \\@include Sugar.setup((\n * \t\tfilters : (\n * \t\t\tmyCoolFilter : box-shadow(#000 0 0 10px) blur(30px),\n * \t\t\t// other filters...\n * \t\t)\n * ));\n *\n * // registered filter\n * .my-cool-elememt {\n * \t\t\\@include Sugar.filter(myCoolFilter);\n * \t\t// filter : box-shadow(#000 0 0 10px) blur(30px);\n * }\n *\n * // custom filter\n * .my-cool-element {\n * \t\t\\@include Sugar.filter(myCoolFilter invert(100%));\n * \t\t// filter : box-shadow(#000 0 0 10px) blur(30px) invert(100%);\n * }\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    font-face\n * @namespace           scss.core.font\n * @type      mixin\n *\n * Helper to print a font-face\n *\n * @param \t\t\t{String} \t\t$font-family \t\t\tThe font-family\n * @param \t\t\t{String} \t\t$src \t\t\t\t\tThe source url (only 1 extension)\n * @param \t\t\t{List} \t\t\t[$extensions=woff2] \tThe extensions list that you have available\n * @param \t\t\t{String} \t\t[$font-weight=normal] \tThe font-weight property\n * @param \t\t\t{String} \t\t[$font-style=normal] \tThe font-style property\n * @param       {String}    [$font-display=auto]    The font-display property\n *\n * @example     scss\n * // if you have these extensions files : .woff .eot .woff2\n * \\@include Sugar.font-face(\n * \t\t$name : my-cool-font,\n * \t\t$src : '/fonts/my-font.eot',\n * \t\t$extensions : eot woff woff2\n * )\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    font-family\n * @namespace           scss.core.font\n * @type      function\n *\n * Return the font-family string or a registered font\n *\n * @param \t\t\t{String} \t\t$name \t\tThe name of the registered font\n * @return \t\t\t{String} \t\t\t\t\tThe corresponding font-family property to set in your css\n *\n * @example\n * // register a font\n * \\@include Sugar.setup((\n * \t\tfonts : (\n * \t\t\tmyCoolFont : (\n * \t\t\t\tfont-family : 'Helvetica Neue',\n * \t\t\t\tfont-weight : 'bold',\n * \t\t\t\t// etc...\n * \t\t\t),\n * \t\t\t// other fonts...\n * \t\t)\n * ));\n *\n * // apply the font\n * .my-cool-element {\n * \t\tfont-family : Sugar.font-family(myCoolFont);\n * \t\t// 'Helvetica Neue';\n * }\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    font\n * @namespace           scss.core.font\n * @type    function\n *\n * Return the font {Map} that correspond to the passed arguments\n *\n * @param \t\t{String} \t\t\t[$family=null] \t\t\tThe font family wanted (can be a registered font name)\n * @param \t\t{Color} \t\t\t[$color=null] \t\t\tThe color wanted (can be a registered color name)\n * @param \t\t{Number} \t\t\t[$size=null] \t\t\tThe font-size wanted\n * @param \t\t{String} \t\t\t[$style=null] \t\t\tThe font-style wanted\n * @param \t\t{String} \t\t\t[$variant=null] \t\tThe font-variant wanted\n * @param \t\t{String|Number} \t[$weight=null] \t\t\tThe font-weight wanted\n * @param \t\t{String} \t\t\t[$decoration=null] \t\tThe text-decoration wanted\n * @param \t\t{String} \t\t\t[$align=null] \t\t\tThe text-align wanted\n * @param \t\t{String} \t\t\t[$transform=null] \t\tThe text-transform wanted\n * @param \t\t{String} \t\t\t[$stretch=null] \t\tThe font-stretch wanted\n * @param \t\t{String} \t\t\t[$white-space=null] \tThe white-space wanted\n * @param \t\t{Number} \t\t\t[$height=null] \t\t\tThe line-height wanted\n * @param \t\t{Number} \t\t\t[$spacing=null] \t\tThe letter-spacing wanted\n * @param \t\t{Number} \t\t\t[$indent=null] \t\t\tThe text-indent wanted\n * @param \t\t{String} \t\t\t[$break=null] \t\t\tThe line-break wanted\n * @param \t\t{String} \t\t\t[$wrap=null] \t\t\tThe word-wrap wanted\n * @return \t\t{Map} \t\t\t\t\t\t\t\t\t\tThe corresponding font map\n *\n * @example\n * Sugar.font(\n * \t\t$family : 'Helvetica Neue',\n * \t\t$size : 12px,\n * \t\t$wrap : norwap\n * );\n * // (\n * \t\tfont-family : 'Helvetica Neue',\n * \t\tfont-size : 12px,\n * \t\tword-wrap : nowrap\n * // )\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      font\n * @namespace           scss.core.font\n * @type      mixin\n *\n * Print all the fonts properties that correspond to the passed arguments\n *\n * @param \t\t{String} \t\t\t[$family=null] \t\t\tThe font family wanted (can be a registered font name)\n * @param \t\t{Color} \t\t\t[$color=null] \t\t\tThe color wanted (can be a registered color name)\n * @param \t\t{Number} \t\t\t[$size=null] \t\t\tThe font-size wanted\n * @param \t\t{String} \t\t\t[$style=null] \t\t\tThe font-style wanted\n * @param \t\t{String} \t\t\t[$variant=null] \t\tThe font-variant wanted\n * @param \t\t{String|Number} \t[$weight=null] \t\t\tThe font-weight wanted\n * @param \t\t{String} \t\t\t[$decoration=null] \t\tThe text-decoration wanted\n * @param \t\t{String} \t\t\t[$align=null] \t\t\tThe text-align wanted\n * @param \t\t{String} \t\t\t[$transform=null] \t\tThe text-transform wanted\n * @param \t\t{String} \t\t\t[$stretch=null] \t\tThe font-stretch wanted\n * @param \t\t{String} \t\t\t[$white-space=null] \tThe white-space wanted\n * @param \t\t{Number} \t\t\t[$height=null] \t\t\tThe line-height wanted\n * @param \t\t{Number} \t\t\t[$spacing=null] \t\tThe letter-spacing wanted\n * @param \t\t{Number} \t\t\t[$indent=null] \t\t\tThe text-indent wanted\n * @param \t\t{String} \t\t\t[$break=null] \t\t\tThe line-break wanted\n * @param \t\t{String} \t\t\t[$wrap=null] \t\t\tThe word-wrap wanted\n * @return \t\t{Map} \t\t\t\t\t\t\t\t\t\tThe corresponding font map\n *\n * @example     scss\n * .my-cool-elememt {\n * \t\t\\@include Sugar.font(\n * \t\t\t$family : 'Helvetica Neue',\n * \t\t \t$size : 12px,\n * \t\t  $wrap : normal\n *    );\n *    // print\n * \t\tfont-family : 'Helvetica Neue',\n * \t\tfont-size : 12px,\n * \t\tword-wrap : normal\n * }\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      list-append\n * @namespace           scss.core.list\n * @type      function\n *\n * Append a value to the passed list\n *\n * @param           {List}        $list               The list to append the value to\n * @param           {Mixed}       $value              The value to append to the list\n * @param           {String}      [$separator=auto]   The separator to use. Can be auto, space or comma\n * @return          {List}                            The new list with the appended value\n *\n * @example     scss\n * Sugar.list-append(hello world, coco, comma); // hello, world, coco\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      list-first\n * @namespace           scss.core.list\n * @type      function\n *\n * Return the first element of the passed list\n *\n * @param         {List}        $list         The list to get the first element from\n * @return        {Mixed}                     The first element of the list\n *\n * @example       scss\n * Sugar.list-first(('hello', 'world')); // => 'hello'\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      list-implode\n * @namespace           scss.core.list\n * @type      function\n *\n * Join all the list items using the passed glue and return a string\n *\n * @param           {List}          $list           The list to implode\n * @param           {String}        [$glue=\"\"]      The glue to use to implode the list\n * @return          {String}                        The imploded list in string format\n *\n * @example       scss\n * Sugar.list-implode(('hello','world'), '-'); // hello-world\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    list-index\n * @namespace           scss.core.list\n * @type      function\n *\n * Return the index of the wanted value in the passed list.\n *\n * @param       {List}      $list       The list to process\n * @param       {Mixed}     $value      The value to search in the list\n * @return      {Number}                The index of the founded value or null\n *\n * @example     scss\n * Sugar.list-index(('hello','world'), 'world'); // => 2\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      list-join\n * @namespace           scss.core.list\n * @type      function\n *\n * Return a string representing all the list items\n *\n * @param         {List}        $list1         The list to process\n * @param         {List}        $list2         The list to join with the first one\n * @param         {String}      [$separator=auto]     The separator to use for the list. Can be auto, comma or space\n * @param         {String|Boolean}    [$bracketed=auto]     If true is passed, the list will be bracketed\n * @return        {String}                    The new list\n *\n * @example     scss\n * Sugar.list-join(('hello','world'), ('coco'), space); // ('hello' 'world' 'coco')\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    list-last-nth\n * @namespace           scss.core.list\n * @type      function\n *\n * Return the last item of the passed list\n *\n * @param     {List}    $list     The list to get the last item from\n * @return    {Mixed}             The last item of the list\n *\n * @example       scss\n * Sugar.list-last-nth(('hello', 'world')); // 'world'\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      list-length\n * @namespace           scss.core.list\n * @type      function\n *\n * Return the number of item in the passed list\n *\n * @param       {List}      $list         The list to check\n * @return      {Number}                  The count of item in the list\n *\n * @example     scss\n * Sugar.list-length(('hello','world')); // => 2\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      list-set-nth\n * @namespace           scss.core.list\n * @type      function\n *\n * Set a value in the passed list at the passed index. The original value at the passed index will be replaced with the passed value\n *\n * @param       {List}      $list       The list to process\n * @param       {Number}    $index      The index to set the value in the list\n * @param       {Mixed}     $value      The value to set in the list\n * @return      {List}                  The new processed list\n *\n * @example       scss\n * Sugar.list-set-nth(('hello','world'), 1, 'coco'); // => ('coco','world')\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    list-nth\n * @namespace           scss.core.list\n * @type      function\n *\n * Return the item of the list at the passed index\n *\n * @param         {List}        $list         The list to process\n * @param         {Number}      $index        The index of the element to get in the list\n * @return        {Mixed}                     The value at the passed index\n *\n * @example     scss\n * Sugar.list-nth(('hello','world'), 2); // => 'world'\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      list-pop\n * @namespace           scss.core.list\n * @type      function\n *\n * Remove the last item of the passed list\n *\n * @param       {List}        $list         The list to process\n * @return      {List}                      The processed list\n *\n * @example       scss\n * Sugar.list-pop(('hello', 'world')); // ('hello')\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    list-prepend\n * @namespace           scss.core.list\n * @type      function\n *\n * Prepend a value in the passed list\n *\n * @param         {List}        $list           The list to process\n * @param         {Mixed}       $value          The value to prepend in the list\n * @param         {String}      [$separator=auto]   The separator to use. Can be auto, space or comma\n * @return        {List}                        The new list with his new value\n *\n * @example   scss\n * Sugar.list-prepend(('hello','world'), 'coco'); // => ('coco','hello','world')\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      list-remove-nth\n * @namespace           scss.core.list\n * @type      function\n *\n * Remove item from list using an index\n *\n * @param         {List}          $list           The list to process\n * @param         {Number}        $index          The index of the item to remove from the list\n * @return        {List}                          The processes list\n *\n * @example       scss\n * Sugar.list-remove-nth(('hello','world'), 1); // ('hello')\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      list-search\n * @namespace           scss.core.list\n * @type      function\n *\n * Search for the passed value in the passed list and return true if exist, false if not\n *\n * @param           {List}          $list           The list in which to search for the passed value\n * @param           {Mixed}         $value          The value to search in the List\n * @return          {Boolean}                       true if the value exist in the list, false if not\n *\n * @example   scss\n * Sugar.list-search(('hello', 'world'), 'hello'); // => true\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    lnf\n * @namespace           scss.core.look-and-feel\n * @type    function\n *\n * Alias to the [./_look-and-feel.scss] function\n *\n * Return a settings.look-and-feel stack value\n *\n * @param \t\t{String} \t\t$name\t\t\t\t\tThe look and feel value name\n * @return \t\t{Number} \t\t\t\t\t\t\t\tThe look and feel value in em\n *\n * @example\n * .my-cool-element {\n * \t\tpadding : Sugar.lnf(padding-horizontal) Sugar.lnf(padding-vertical);\n * }\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      look-and-feel\n * @namespace           scss.core.look-and-feel\n * @type    function\n *\n * Return a settings.look-and-feel stack value\n *\n * @param \t\t{String} \t\t$name\t\t\t\t\tThe look and feel value name\n * @return \t\t{Number} \t\t\t\t\t\t\t\tThe look and feel value in em\n *\n * @example\n * .my-cool-element {\n * \t\tpadding : Sugar.look-and-feel(padding-horizontal) Sugar.look-and-feel(padding-vertical);\n * }\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      dash-to-map\n * @namespace           scss.core.map\n * @type        function\n *\n * Transform a dash notation value into a map\n * Dash notation value is : -key1 value1 -key2 value2\n *\n * @param \t\t\t{List} \t\t\t$dash \t\t\tThe dash list notation to transform\n * @return \t\t\t{Map} \t\t\t\t\t\t\tThe map generated\n *\n * @example\n * $dash : -hello world -coco universe\n * Sugar.dash-to-map($dash);\n * // (\n * // \thello : world,\n * // \tcoco : universe\n * // )\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      map-deep-values\n * @namespace           scss.core.map\n * @type      function\n *\n * Get values of a map even if it is deep\n *\n * @param       {Map}       $map        The map to get values from\n * @return      {List}                  The list of map values\n *\n * @example       scss\n * Sugar.map-deep-values((\n *    'hello': 'world',\n *    'coco': (\n *       'plop': 'youhou'\n *    )\n * ));\n * // => ('world', 'youhou')\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      map-extend\n * @namespace           scss.core.map\n * @type      function\n *\n * Extend the passed map with the others passed map(s)\n *\n * @param           {Map}         $map        The map to @extend\n * @param           {Map|List-Map}  $maps     The map(s) used to extend the first one\n * @return          {Map}                     The extended map\n *\n * @example     scss\n * Sugar.map-extend((\n *  'hello': 'world'\n * ), (\n *  'coco': 'plop'\n * ));\n * // returned map:\n * (\n *  'hello': 'world',\n *  'coco': 'plop'\n * )\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      map-filter\n * @namespace           scss.core.map\n * @type      function\n *\n * Filter a map by key, value and the passed processor function\n *\n * @param           {Map}         $map          The map to process\n * @param           {String}      $processor    The processor function name you want to invoke on each values\n * @return          {Map}                       The filtered map\n *\n * @example     scss\n * @function my-cool-function($key, value) {\n *    @return true;\n * }\n * Sugar.map-filter((\n *  'hello.world': 'Hello',\n *  'coco.world': 'Coco',\n *  'hello.that': 'That is cool'\n * ), 'my-cool-function');\n * // return that map:\n * (\n *  'hello.world': 'Hello',\n *  'coco.world': 'Coco',\n *  'hello.that': 'That is cool'\n * )\n *\n * @since       2.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      map-filter-by-namespace\n * @namespace           scss.core.map\n * @type      function\n *\n * Return all the map values that have a key that match the passed namespace\n *\n * @param           {Map}         $map          The map to process\n * @param           {String}      $namespace    The namespace to search like (something.another.thing)\n * @return          {Map}                       The filtered map\n *\n * @example     scss\n * Sugar.map-filter-by-namespace((\n *  'hello.world': 'Hello',\n *  'coco.world': 'Coco',\n *  'hello.that': 'That is cool'\n * ), 'hello');\n * // return that map:\n * (\n *   'hello.world': 'Hello',\n *   'hello.that': 'That is cool'\n * )\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name              map-to-css-variables\n * @namespace         scss.core.map\n * @type              Mixin\n *\n * THis mixin simply take a single level map and convert it to\n * css variables declarations like ```--my-cool-variable: 10px```\n *\n * @param       {Map}         $map        The map to convert to css variables declarations\n *\n * @example       scss\n * $map: (\n *   something-cool: 10px\n * );\n * @include Sugar.map-to-css-variables($map);\n *\n * @since       2.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name            map-flatten\n * @namespace       scss.core.map\n * @type            Function\n *\n * This function take a map (that can be a deep one) and returns you a new map with all the\n * properties flatten using the passed \"separator\"\n *\n * @param       {Map}       $map          The map to flatten\n * @param       {String}    [$separator=\"-\"]      The separator to use in final map keys\n * @return      {Map}                 The flattened map\n *\n * @example       scss\n * $map: (\n *    something: (\n *       cool: 'Hello world'\n *    )\n * )\n * map-flatten($map);\n * (\n *    something-cool: 'Hello world'\n * )\n *\n * @since       2.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      map-get\n * @namespace           scss.core.map\n * @type      function\n *\n * Get a value in the passed map using the passed key\n *\n * @param         {Map}         $map        The map to get the value from\n * @param         {String}      $path        The key to get the value in the map\n * @param         {Midex}       [$default=null]   The default value to return if nothing is found in the map\n * @param         {Mixed}                   The getted value\n *\n * @example       scss\n * Sugar.map-get((\n *  hello: 'world'\n * ), hello); // => 'world'\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name     map-has-key\n * @namespace           scss.core.map\n * @type      function\n *\n * Check if the passed map has the passed key. Return true if has, false if not\n *\n * @param           {Map}         $map        The map to check\n * @param           {String}      $key        The key to check in the map\n * @return          {Boolean}                 true if has the key, false if not\n *\n * @example     scss\n * Sugar.map-has-key((\n *    'hello': 'world',\n *    'coco': 'plop'\n * ), 'hello'); // => true\n *\n * @since      1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name  map-keys\n * @namespace           scss.core.map\n * @type      function\n *\n * Return a comma separated list of the map keys\n *\n * @param       {Map}       $map      The map to process\n * @return      {List}                The list of map keys\n *\n * @example     scss\n * Sugar.map-keys((\n *  'hello': 'world',\n *  'coco': 'plop'\n * )); // => ('hello','coco')\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    map-merge\n * @namespace           scss.core.map\n * @type      function\n *\n * Merge the first passed map with the second passed one and return the result\n *\n * @param           {Map}         $map1         The first map to extend\n * @param           {Map}         $map2         The second map to extend the first one with\n * @return          {Map}                       The extended map\n *\n * @example     scss\n * Sugar.map-merge((\n *  hello: 'world'\n * ), (\n *  coco: 'plop'\n * ));\n * // returned map:\n * (\n *  hello: 'world',\n *  coco: 'plop'\n * )\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    map-remove\n * @namespace           scss.core.map\n * @type      function\n *\n * Remove one or multiple keys from the passed map\n *\n * @param           {Map}         $map          The map to process\n * @param           {String}      $keys...      The key(s) to remove\n * @return          {Map}                       The processed map\n *\n * @example       scss\n * Sugar.map-remove((\n *  hello: 'world',\n *  coco: 'plop'\n * ), coco);\n * // returned map:\n * (\n *  hello: 'world'\n * )\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    map-set\n * @namespace           scss.core.map\n * @type      function\n *\n * Set a map property with the passed value\n * @param \t\t\t{Map} \t\t\t$map \t\tThe map to modify\n * @param       {String}    $key    The key to set the propery to\n * @param       {Mixed}     $value  The value to set\n * @return \t\t\t{Map} \t\t\t\t\t    The updated map\n *\n * @example     scss\n * $my-map : Sugar.map-set($my-map, 'coco', 'Something cool');\n *\n * @since      1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      math-abs\n * @namespace           scss.core.math\n * @type      function\n *\n * Return the absolute version of the passed number\n *\n * @param         {Number}        $number       The number to process\n * @return        {Number}                      The absolute version of the number\n *\n * @example     scss\n * Sugar.math-abs(-10); // => 10\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      math-acos\n * @namespace           scss.core.math\n * @type      function\n *\n * Calculate the cosinus inverse of the passed angle\n *\n * @param         {Number}        $angle          The angle to calculate the cosinus inverse from\n * @param         {String}        [$unit=deg]     The wanted unit. Can de deg, rad, grad or turn\n * @return         {Number}                       The calculated cosinus inverse\n *\n * @example     scss\n * Sugar.math-acos(1, deg); // 0.0559529097deg\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      math-asin\n * @namespace           scss.core.math\n * @type      function\n *\n * Calculate the sinus inverse\n *\n * @param         {Number}        $value        The value to use\n * @param         {String}        [$unit=deg]   The unit wanted. Possible values are deg, rad, grad and turn\n * @return        {Number}                      The calculated asin\n *\n * @example     scss\n * Sugar.math-asin(1, rad); // => 1.5698197643rad\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      math-atan\n * @namespace           scss.core.math\n * @type      function\n *\n * Calculate the tangent inverse of the passed angle\n *\n * @param       {Number}      $angle        The angle to calculate the tangent inverse from\n * @param       {String}      [$unit=deg]   The wanted unit. Can be deg, rad, grad or turn\n * @return      {Number}                    The calculated tangent inverse of the passed angle\n *\n * @example       scss\n * Sugar.math-atan(10, deg); // => 84.2988568542deg\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    math-ceil\n * @namespace           scss.core.math\n * @type      function\n *\n * Rounds $number up to the next highest whole number\n *\n * @param       {Number}      $number       The number to process\n * @return      {Number}                    The up rounded number\n *\n * @example     scss\n * Sugar.math-ceil(4.2); // => 5\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    math-convert-angle\n * @namespace           scss.core.math\n * @type      function\n *\n * Convert the passed angle into another unit like rad, deg, grad or turn\n *\n * @param           {Number}            $value          The angle value to convert\n * @param           {String}            $unit           The wanted unit. Can be rad, deg, grad or turn\n * @return          {Number}                            The converted angle value\n *\n * @example   scss\n * Sugar.math-convert-angle()\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      math-cos\n * @namespace           scss.core.math\n * @type      function\n *\n * Calculate the cosinus of the passed angle\n *\n * @param         {Number}        $angle      The angle to calculate the cosinus from\n * @return        {Number}                    The calculated cosinus\n *\n * @example     scss\n * Sugar.math-cos(10); // => 6.6645643378\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      math-deg\n * @namespace           scss.core.math\n * @type      function\n *\n * Convert the passed unitless angle to degree\n *\n * @param         {Number}        $angle      The angle to convert to degree\n * @return        {Number}                    The degree version of the angle\n *\n * @example     scss\n * Sugar.math-deg(10); // => 572.9577951308deg\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      math-even\n * @namespace           scss.core.math\n * @type      function\n *\n * Convert the passed value to the closest even value\n *\n * @param \t\t\t{Number} \t\t$value \t\tThe value to convert\n * @return \t\t\t{Number} \t\t\t\t\tThe closest even converted value\n *\n * @example     scss\n * Sugar.math-even(9); // => 10\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      math-fact\n * @namespace           scss.core.math\n * @type      function\n *\n * Returns the factorial of desired number\n *\n * @param         {Number}          $number         The number to calculate the factorial number\n * @return        {Number}                          The calculated factorial of the passed number\n *\n * @example     scss\n * Sugar.math-fact(5); // => 120\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      math-grad\n * @namespace           scss.core.math\n * @type      function\n *\n * Convert the passed unitless angle to gradian\n *\n * @param         {Number}        $angle      The angle to convert to gradian\n * @return        {Number}                    The gradian version of the angle\n *\n * @example     scss\n * Sugar.math-grad(10); // => 636.6197723675grad\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      math-odd\n * @namespace           scss.core.math\n * @type      function\n *\n * Convert the passed value to the closest odd value\n *\n * @param \t\t\t{Number} \t\t$value \t\tThe value to convert\n * @return \t\t\t{Number} \t\t\t\t\tThe closest odd converted value\n *\n * @example     scss\n * Sugar.math-odd(10); // => 9\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      math-percentage\n * @namespace           scss.core.math\n * @type      function\n *\n * Converts a unitless $number (usually a decimal between 0 and 1) to a percentage.\n *\n * @param         {Number}          $number           The number to convert into percentage\n * @return        {Number}                            The percentage converted\n *\n * @example\n * Sugar.math-percentage(0.2); // => 20%\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      math-pow\n * @namespace           scss.core.math\n * @type      function\n *\n * Return the calculated power of the passed base using the passed exponent\n *\n * @param         {Number}        $base         The base number\n * @param         {Number}        $exponent     The exponent used to raise the base\n * @return        {Number}                      The calculated power number\n *\n * @example    scss\n * Sugar.math.pow(7, 3); // => 343\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      math-rad\n * @namespace           scss.core.math\n * @type      function\n *\n * Convert the passed unitless angle to radian\n *\n * @param         {Number}        $angle      The angle to convert to radian\n * @return        {Number}                    The radian version of the angle\n *\n * @example     scss\n * Sugar.math-rad(10); // => 10rad\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    math-random\n * @namespace           scss.core.math\n * @type      function\n *\n * If $limit is null, returns a random decimal number between 0 and 1.\n *\n * @param       {Number}      [$limit:null]     The limit to generate a number under that\n * @return      {Number}                        The generated number\n *\n * @example     scss\n * Sugar.math-random(); // => 0.2821251858\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    render-round\n * @namespace           scss.core.math\n * @type    function\n *\n * Return the passed values in the same unit but that has been rounded on the corresponding px value\n * This ensure that your passed value will be a round px value for final rander in the viewport\n *\n * @param \t\t{Number} \t\t$value \t\t\tThe value to process\n * @return \t\t{Number} \t\t\t\t\t\tThe rounded value in same input unit but px rounded\n *\n * @example     scss\n * // if settings.typography.font-size == 16px\n * Sugar.render-round(5.2rem);\n * // 1. transform to px values : 5.2 * 16px = 83.2px\n * // 2. round even the px value : 83px\n * // 3. transform to passed unit value : 84px / 16px = 5.1875rem\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    render-round-even\n * @namespace           scss.core.math\n * @type    function\n *\n * Return the passed values in the same unit but that has been even rounded on the corresponding px value\n * This ensure that your passed value will be a round px value for final rander in the viewport\n *\n * @param \t\t{Number} \t\t$value \t\t\tThe value to process\n * @return \t\t{Number} \t\t\t\t\t\tThe rounded value in same input unit but px rounded\n *\n * @example     scss\n * // if settings.typography.font-size == 16px\n * Sugar.render-round-even(5.2rem);\n * // 1. transform to px values : 5.2 * 16px = 83.2px\n * // 2. round even the px value : 84px\n * // 3. transform to passed unit value : 84px / 16px = 5.25rem\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      render-round-odd\n * @namespace           scss.core.math\n * @type    function\n *\n * Return the passed values in the same unit but that has been odd rounded on the corresponding px value\n * This ensure that your passed value will be a round px value for final rander in the viewport\n *\n * @param \t\t{Number} \t\t$value \t\t\tThe value to process\n * @return \t\t{Number} \t\t\t\t\t\tThe rounded value in same input unit but px rounded\n *\n * @example     scss\n * // if settings.typography.font-size == 16px\n * Sugar.render-round-odd(5.2rem);\n * // 1. transform to px values : 5.2 * 16px = 83.2px\n * // 2. round odd the px value : 83px\n * // 3. transform to passed unit value : 84px / 16px = 5.1875rem\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    math-round\n * @namespace           scss.core.math\n * @type      function\n *\n * Rounds $number to the nearest whole number.\n *\n * @param       {Number}      $number       The number to round\n * @return      {Number}                    The rounded number\n *\n * @example     scss\n * Sugar.math-round(4.2); // => 4\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    math-sin\n * @namespace           scss.core.math\n * @type      function\n *\n * Calculate the sinus of the passed angle\n *\n * @param       {Number}      $angle        The angle to calculate the sinus from\n * @return      {Number}                    The calculated sinus\n *\n * @example     scss\n * Sugar.math-sin(10); // => 2.761090926\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name  math-sqrt\n * @namespace           scss.core.math\n * @type      function\n *\n * Return the square root of the passed number\n *\n * @param         {Number}        $number       The number to process\n * @return        {Number}                      The square root of the passed number\n *\n * @example   scss\n * Sugar.math-sqrt(2); // => 1.41421356237\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      math-tan\n * @namespace           scss.core.math\n * @type      function\n *\n * Calculate the tangent of the passed angle\n *\n * @param         {Number}        $angle        The angle to calculate the tangent from\n * @return        {Number}                      The calculated tangent\n *\n * @example       scss\n * Sugar.math-tan(10); // => 0.4142942863\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @todo      Function header and documentation\n */\n/**\n * @name      math-turn\n * @namespace           scss.core.math\n * @type      function\n *\n * Convert the passed unitless angle to turn\n *\n * @param         {Number}        $angle      The angle to convert to turn\n * @return        {Number}                    The turn version of the angle\n *\n * @example     scss\n * Sugar.math-turn(10); // => 1.5915494309turn\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      selector\n * @namespace           scss.core.string\n * @type    function\n *\n * Process selector to avoid having --default, etc...\n *\n * @param \t\t{String} \t\t$selector \t\tThe selector to process\n * @return \t\t{String} \t\t\t\t\t\tThe processed selector\n *\n * @example \tscss\n * Sugar.selector('.input--default'); // => .input\n * Sugar.selector('.input-default'); // => .input\n * Sugar.selector('.input.default'); // => .input\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    interpolate\n * @namespace           scss.core.size\n * @type    function\n *\n * Return the specified or calculated value of the given stack and size\n * depending on the settings.sizes ratios stack\n *\n * @param \t\t{Map} \t\t\t$value \t\t\tThe stack from which to interpolate the value\n * @param \t\t{String} \t\t$size \t\t\tThe size wanted (has to exist in the settings.sizes stack)\n * @return \t\t{Number} \t\t\t\t\t\tThe $value.$size value or the interpolated one depending on the settings.sizes ratios\n *\n * @example     scss\n * // settings.sizes\n * \\@include Sugar.setup((\n * \t\tsizes : (\n * \t\t\tsmall : 0.5,\n * \t\t\tdefault : 1, // default is ALWAYS 1\n * \t\t\tbig : 1.5\n * \t\t)\n * ));\n *\n * $myStack : (\n * \t\tdefault : 3rem,\n * \t\tbig : 6rem\n * )\n *\n * Sugar.interpolate($myStack, big) // 6rem cause specified in the $myStack value\n * Sugar.interpolate($myStack, small) // 1.5rem => calculated like : 3rem * 0.5 = 1.5rem\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      space\n * @namespace           scss.core.space\n * @type    function\n *\n * Return a value interpolated from the settings.spaces stack\n *\n * @param \t\t\t{String} \t\t\t$size \t\t\tThe space size wanted. Must exist in the settings.sizes stack\n * @return \t\t\t{Number} \t\t\t\t\t\t\tThe actual space value\n *\n * @example     scss\n * .my-cool-section {\n * \t\tpadding : Sugar.space(big);\n * }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      parse-properties\n * @namespace           scss.core.string\n * @type    function\n *\n * Parse a given string/list properties and return the Map corresponding to the Map description\n *\n * @param \t\t\t\t{List} \t\t\t\t$properties \t\t\tThe properties to parse\n * @param \t\t\t\t{Map} \t\t\t\t$descriptor \t\t\tThe descriptor map to use to parse the properties\n * @return \t\t\t\t{Map} \t\t\t\t\t\t\t\t\t\tThe properties in map format\n *\n * @example     scss\n * Sugar.parse-properties(10px hello -delay 20s, (\n *  \tmyNumber : Number,\n *  \tmyOtherNumber : Number,\n *  \tmyString : String,\n *  \tmyCoolVar : String,\n *  \tdelay : second\n * ));\n * // => (\n * //  \tmyNumber : 10px,\n * // \tmyString : hello,\n * // \tdelay : 20s\n * // )\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      replace-tokens\n * @namespace           scss.core.string\n * @type    function\n *\n * Search and replace tokens like colors #primary in a passed string, list or map\n * Supported tokens types :\n * 1. Colors : colorName\n *\n * @example     scss\n * Sugar.replace-tokens(12px #primary hello #secondary); // > 12px #ddd hello #fff;\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      str-index\n * @namespace           scss.core.string\n * @type      function\n *\n * Returns the first index of $substring in $string, or null if $string doesn’t contain $substring.\n *\n * @param       {String}      $string       The string to process\n * @param       {String}      $substring    The string to search\n * @return      {Number}                    The index of the finded substring or null if not exist...\n *\n * @example      scss\n * Sugar.str-index('Hello world', 'world'); // => 7\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    str-is-url\n * @namespace           scss.core.string\n * @type      function\n *\n * Check if a string is a url or not\n *\n * @param \t\t\t{String} \t\t\t\t$url \t\t\tThe string to check\n * @return \t\t\t{Boolean} \t\t\t\t\t\t\t\ttrue if is a url, false if not\n *\n * @example     scss\n * Sugar.str-is-url('Hello world') // false\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    str-length\n * @namespace           scss.core.string\n * @type      function\n *\n * Return the number of characters in the passed string\n *\n * @param       {String}      $string       The string to process\n * @return      {Number}                    The number of characters that compose the string\n *\n * @example     scss\n * Sugar.str-length('hello'); // => 4\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    str-replace\n * @namespace           scss.core.string\n * @type      function\n *\n * Replace the passed string with another one in a specific string\n *\n * @param         {String}        $string         The string in which to replace the searched one\n * @param         {String}        $search         The string to replace\n * @param         {String}        [$replace=\"\"]   The string used as replacement\n * @return        {String}                        The processed string\n *\n * @example     scss\n * Sugar.str-replace('Hello world', 'world', 'coco'); // 'Hello coco'\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    str-slice\n * @namespace           scss.core.string\n * @type      function\n *\n * Returns the slice of $string starting at index $start-at and ending at index $end-at (both inclusive).\n *\n * @param         {String}        $string         The string to slice\n * @param         {Number}        $start-at       Where to start slice the string\n * @param         {Number}        [$end-at=-1]    Where to end to slice the string\n *\n * @param       scss\n * Sugar.str-slice('Hello world', 1, 4); // => Hell\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    str-split\n * @namespace           scss.core.string\n * @type      function\n *\n * Split a string using a delimiter\n *\n * @param         {String}          $string             The string to split\n * @param         {String}          [$delimiter=\"\"]     The delimiter to split the string\n * @return        {List}                                A list a the splited string\n *\n * @example       scss\n * Sugar.str-split('hello.world', '.'); // ('hello', 'world')\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    str-trim\n * @namespace           scss.core.string\n * @type      function\n *\n * trim the passed string\n *\n * @param         {String}        $string         The string in which to trim\n * @return        {String}                        The processed string\n *\n * @example     scss\n * Sugar.str-trim('Hello world   '); // 'Hello coco'\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    str-unique-id\n * @namespace           scss.core.string\n * @type      function\n *\n * Generate a unique id in string format\n *\n * @return        {String}          The generated unique id\n *\n * @example     scss\n * Sugar.str-unique-id(); // => uabtrnzug\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      str-unquote\n * @namespace           scss.core.string\n * @type      function\n *\n * Return an unquoted version of the passed string\n *\n * @param         {String}        $string           The string to unquote\n * @return        {String}                          The unquoted string\n *\n * @example       scss\n * Sugar.str-unquote('hello world'); // => hello world\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    str-split\n * @namespace           scss.core.string\n * @type      function\n *\n * Split a string using a delimiter\n *\n * @param         {String}          $string             The string to split\n * @param         {String}          [$delimiter=\"\"]     The delimiter to split the string\n * @return        {List}                                A list a the splited string\n *\n * @example       scss\n * Sugar.str-split('hello.world', '.'); // ('hello', 'world')\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name        str-url-ext\n * @namespace           scss.core.string\n * @type      function\n *\n * Check if a string is a url or not\n *\n * @param \t\t\t{String} \t\t\t\t$url \t\t\tThe string to check\n * @return \t\t\t{Boolean} \t\t\t\t\t\t\t\ttrue if is a url, false if not\n *\n * @example       scss\n * Sugar.str-is-url('Hello world') // false\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      transition\n * @namespace           scss.core.transition\n * @type    function\n *\n * Take a transition as parameter and parse it to return the {List} corresponding\n * The $transitions parameter can be either a registered transition name or a custom css transition like : all .2s ease-in-out 2s\n * The $transitions argument will be parsed with the [./_parse-properties.scss] function.\n *\n * @param \t\t\t{List} \t\t\t\t$transitions \t\t\tThe registered transition(s) name(s) or the transition(s) strings(s) to transform into list\n * @return \t\t\t{List} \t\t\t\t\t\t\t\t\t\tThe corresponding transition list properties\n *\n * @example   scss\n * // register a transition\n * \\@include Sugar.setup((\n * \t\ttransitions : (\n * \t\t\tfast : all .2s ease-in-out 0s,\n * \t\t\t// other transitions...\n * \t\t)\n * ));\n *\n * // registered transition\n * .my-cool-element {\n * \t\ttransition : Sugar.transition(fast);\n * \t\t// transition : all .2s ease-in-out 0s;\n * }\n *\n * // custom transition\n * .my-cool-element {\n *  \ttransition : Sugar.transition(fast -delay .5s, fast width ease-in);\n *  \t// transition : all .2s ease-in-out .5s, width .2s ease-in 0s;\n * }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      transition-map\n * @namespace           scss.core.transition\n * @type    function\n *\n * Take a transition as parameter and parse it to return the {Map} corresponding\n * The $transition parameter can be either a registered transition name or a custom css transition like : all .2s ease-in-out 2s\n * The $transition argument will be parsed with the [./_parse-properties.scss] function.\n *\n * @param \t\t\t{List} \t\t\t\t$transition \t\t\tThe registered transition name or the transition string to transform into map\n * @return \t\t\t{Map} \t\t\t\t\t\t\t\t\t\tThe corresponding transition map properties\n *\n * @example     scss\n * // register a transition\n * \\@include Sugar.setup((\n * \t\ttransitions : (\n * \t\t\tfast : all .2s ease-in-out,\n * \t\t\t// other transitions...\n * \t\t)\n * ));\n *\n * // registered transition\n * Sugar.transition-map(fast);\n * // {\n * // \tproperty : all,\n * // \tduration : .2s,\n * // \tease : ease-in-out\n * // }\n *\n * // custom transition\n * Sugar.transition-map(fast -delay .5s);\n * // {\n * // \tproperty : all,\n * // \tduration : .2s,\n * // \tease : ease-in-out,\n * // \tdelay : .5s\n * // }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    transition\n * @namespace           scss.core.transition\n * @type      mixin\n *\n * Take a transition as parameter and print the corresponding transition property\n * The $transitions parameter can be either a registered transition name or a custom css transition like : all .2s ease-in-out 2s\n * The $transitions argument will be parsed with the [./_parse-properties.scss] function.\n *\n * @param \t\t\t{List} \t\t\t\t$transitions \t\t\tThe registered transition(s) name(s) or the transition(s) strings(s) to transform into list\n * @return \t\t\t{List} \t\t\t\t\t\t\t\t\t\tThe corresponding transition list properties\n *\n * @example     scss\n * // register a transition\n * \\@include Sugar.setup((\n * \t\ttransitions : (\n * \t\t\tfast : all .2s ease-in-out 0s,\n * \t\t\t// other transitions...\n * \t\t)\n * ));\n *\n * // registered transition\n * .my-cool-element {\n * \t\t\\@include Sugar.transition(fast);\n * \t\t// transition : all .2s ease-in-out 0s;\n * }\n *\n * // custom transition\n * .my-cool-element {\n * \t\t\\@include Sugar.transition(fast -delay .5s, fast width ease-in);\n *  \t// transition : all .2s ease-in-out .5s, width .2s ease-in 0s;\n * }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      show-vertical-rhythm\n * @namespace           scss.core.typography\n * @type      mixin\n *\n * Display the vertical rhythme\n *\n * @param \t\t\t{Color}      [$color=#0ff] \t\tThe color wanted\n *\n * @example     scss\n * body {\n * \t\t@include Sugar.show-vertical-rhythm();\n * }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      text-format-class\n * @namespace           scss.core.typography\n * @type    function\n *\n * Return the text-format setting scope class\n *\n * @return \t\t{String} \t\tThe text-format scope class from settings.text-format.scope-class\n *\n * @example     scss\n * Sugar.text-format-class(); // tf\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      text-format-scope\n * @namespace           scss.core.typography\n * @type      mixin\n *\n * Scope the content inside the `settings.text-format-scope-class` class\n *\n * @example       scss\n * .my-cool-item {\n * \t@include Sugar.text-format-scope() {\n * \t\tmargin-bottom: 2em; // will be applied only if .my-cool-item is in the .vr scope\n * \t}\n * }\n *\n * @since       1.0.0\n * @see \t\t\thttps://medium.com/written-in-code/aligning-type-to-baseline-the-right-way-using-sass-e258fce47a9b#.lck2lgbni\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      vertical-rhythm-class\n * @namespace           scss.core.typography\n * @type    function\n *\n * Return the vertical-rhythm setting scope class\n *\n * @return \t\t{String} \t\tThe vertical-rhythm scope class from settings.vertical-rhythm.scope-class\n *\n * @example     scss\n * Sugar.vertical-rhythm-class(); // vr\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      vertical-rhythm-scope\n * @namespace           scss.core.typography\n * @type      mixin\n *\n * Scope the content inside the `settings.vertical-rhythm-scope-class` class\n *\n * @example       scss\n * .my-cool-item {\n * \t@include Sugar.vertical-rhythm-scope() {\n * \t\tmargin-bottom: 2em; // will be applied only if .my-cool-item is in the .vr scope\n * \t}\n * }\n *\n * @since       1.0.0\n * @see \t\t\thttps://medium.com/written-in-code/aligning-type-to-baseline-the-right-way-using-sass-e258fce47a9b#.lck2lgbni\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name        var-define\n * @namespace     scss.core.var\n * @type          Function\n *\n * This mixin simply take a variable name (or doted path) and generate the css code to define this variable\n *\n * @param     {String}      $name        The variable name to set\n * @param     {Mixed}       $value       The value to set\n *\n * @example       scss\n * @include Sugar.var-define(my-cool-variable, ());\n *\n * @since       2.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name        var-name\n * @namespace     scss.core.var\n * @type          Function\n *\n * This function simply take a variable name (or doted path) and generate the sugar scope name for it\n *\n * @param     {String}      $name        The variable name to set\n * @return    {String}                   The setted variable name\n *\n * @example       scss\n * Sugar.var-name(my-cool-variable, ());\n *\n * @since       2.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name              var-output\n * @namespace         scss.core.var\n * @type              Mixin\n *\n * This mixin simply print out the variables that you have defined in your project\n *\n * @param       {String}        [scope=\":root\"]       The scope of the variables you want to set\n *\n * @example       scss\n * @include var-output():\n *\n * @since     2.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name      coffeekraken-logo\n * @namespace           scss.coffeekraken\n * @type      mixin\n *\n * Display a coffeekraken logo with two specified colors\n *\n * @param \t\t{Color} \t\t[$color=default] \tThe base color to use\n * @param \t\t{Color} \t\t[$accent=primary] \tThe accent color to use\n *\n * @example \tscss\n * .my-cool-coffeekraken-logo {\n * \t\\@include Sugar.coffeekraken-logo();\n * }\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    effect-bubble\n * @namespace           scss.effect\n * @type      mixin\n *\n * Create an arrow bubble effect\n *\n * @param \t\t{String} \t\t\t[$side=bottom] \t\t\t\tThe side (top,right,bottom,left)\n * @param \t\t{String} \t\t\t[$align=center] \t\t\tThe alignement (left,center,right,top,middle,bottom)\n * @param \t\t{Number} \t\t\t[$size=10px] \t\t\t\tThe size of the arrow\n * @param \t\t{Color} \t\t\t[$color=s-color(primary)] \tThe color of the bubble\n * @param \t\t{Number} \t\t\t[$arrow-offset=10px] \t\tThe arrow offset from the side of the bubble\n * @param \t\t{Number} \t\t\t[$border-width=0] \t\t\tThe border width of the bubble\n * @param \t\t{Color} \t\t\t[$border-color=null] \t\tThe border color of the bubble\n *\n * @example     scss\n * .my-cool-bubble {\n * \t\t\\@include Sugar.effect-bubble(\n * \t\t\t$color : Sugar.color(secondary)\n * \t\t);\n * \t\tcolor : white;\n * }\n *\n * @since       1.0.0\n * @see \t\t\thttps://codepen.io/kirkas/pen/otqyJ\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name        effect-depth\n * @namespace           scss.effect\n * @type      mixin\n *\n * Generate a drop shadow depending on the depth specified\n *\n * @param \t\t{Integer} \t\t\t$depth \t\t\t\t\t\t\tThe depth wanted (1,2,3,4,etc...)\n * @param \t\t{Color} \t\t\t[$color=rgba(0,0,0,.2)] \t\tThe drop shadow color\n *\n * @example     scss\n * .my-cool-element {\n * \t\t\\@include Sugar.effect-depth(2);\n * }\n *\n * @since       1.0.0\n * @author \t \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      effect-hey\n * @namespace           scss.effect\n * @type      mixin\n *\n * Create a poping dot effect to catch user attention on a particular item\n * This mixin affect the :before and :after pseudo selector of the item\n *\n * @param \t\t{String} \t\t[$vertical-align=top] \t\t\tWhere to put the dot verticaly (top,middle,bottom)\n * @param \t\t{String} \t\t[$align=left] \t\t\t\t\tWhere to put the dot horizontaly (left,center,right)\n * @param \t\t{Number} \t\t[$size=20px] \t\t\t\t\tThe size of the dot\n * @param \t\t{Color} \t\t[$color=primary] \t\t\t\tThe color of the dot\n * @param \t\t{Number} \t\t[$offset-top=0] \t\t\t\tThe offset top\n * @param \t\t{Number} \t\t[$offset-right=0] \t\t\t\tThe offset right\n * @param \t\t{Number} \t\t[$offset-bottom=0] \t\t\t\tThe offset bottom\n * @param \t\t{Number} \t\t[$offset-left=0] \t\t\t\tThe offset left\n *\n * @example       scss\n * .my-cool-element {\n * \t\t\\@include Sugar.effect-hey(\n * \t\t\t$align : right,\n * \t\t\t$color : secondary,\n * \t\t\t$size : 10px,\n * \t\t\t$offset-top : -10px,\n * \t\t\t$offset-right : -10px\n * \t\t);\n * }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    effect-long-shadow\n * @namespace           scss.effect\n * @type      mixin\n *\n * Generate a long shadow effect like [this](https://www.google.ch/search?q=long+shadow&espv=2&biw=2560&bih=1316&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjjne6x49LPAhVBHRQKHat8AW8Q_AUIBigB)\n *\n * @param \t\t{Color} \t\t[$color=rgba(0,0,0,.3)] \t\t\tThe shadow color\n * @param \t\t{String} \t\t[$type=text] \t\t\t\t\t\tThe shadow type (text,box)\n * @param \t\t{Degree} \t\t[$angle=135deg] \t\t\t\t\tThe shadow angle\n * @param \t\t{Integer} \t\t[$depth=20] \t\t\t\t\t\tThe shadow depth\n * @param \t\t{Boolean} \t\t[$fade=false] \t\t\t\t\t\tIf true, the shadow will fade itself\n * @param \t\t{Number} \t\t[$blur=0] \t\t\t\t\t\t\tThe blur amount of the shadow\n * @param \t\t{Number} \t\t[$blur-ratio=0] \t\t\t\t\tThe ratio to blur each depth more\n *\n * @example       scss\n * .my-cool-title {\n * \t\t\\@include Sugar.effect-long-shadow(\n * \t\t\t$depth : 10\n * \t\t);\n * }\n * .my-cool-box {\n * \t\t\\@include Sugar.effect-long-shadow(\n * \t\t\t$type : box\n * \t\t);\n * }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      effect-side-lined\n * @namespace           scss.effect\n * @type      mixin\n *\n * Create side lines around an item\n *\n * @param \t\t\t{String} \t\t[$style=solid] \t\t\tThe line style, same possible values as the border-style property\n * @param \t\t\t{String} \t\t[$side=both] \t\t\tThe side where to put lines (left,right,both)\n * @param \t\t\t{Number} \t\t[$height=1px] \t\t\tThe lines height\n * @param \t\t\t{Number} \t\t[$width=50%] \t\t\tThe width of the lines\n * @param \t\t\t{Color} \t\t[$color=text]\t\t\tThe color of the lines\n * @param \t\t\t{Number} \t\t[$padding=0] \t\t\tThe padding between the lines and the content\n * @param \t\t\t{Number} \t\t[$offset-top=null] \t\tThe line offset top\n *\n * @example     scss\n * h1 {\n * \t\t\\@include Sugar.effect-side-lined(\n * \t\t\t$padding : 20px,\n * \t\t\t$side : right,\n * \t\t\t$width : 100%\n * \t\t);\n * }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      input-placeholder\n * @namespace           scss.form\n * @type      mixin\n *\n * Set the placeholder style for inputs, etc...\n *\n * @example \tscss\n * input, textarea {\n * \t\\@include Sugar.input-placeholder() {\n * \t\tcolor : red;\n * \t}\n * }\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name            format-marked\n * @namespace           scss.format\n * @type            Mixin\n *\n * This mixin print the needed css to style a \"marked\" converted markdown to html\n *\n * @example       scss\n * .my-cool-container {\n *    @include Sugar.format-marked();\n * }\n *\n * @since       2.0.0\n * @see         https://github.com/markedjs/marked\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      border-radius\n * @namespace           scss.helper\n * @type      mixin\n *\n * Apply some border radius\n *\n * @param \t\t{Number} \t\t[$radius=null] \t\t\tThe radius to apply globally\n * @param \t\t{Number} \t\t[$top=null] \t\t\tThe radius to apply on top corners\n * @param \t\t{Number} \t\t[$right=null] \t\t\tThe radius to apply on right corners\n * @param \t\t{Number} \t\t[$bottom=null] \t\t\tThe radius to apply on bottom corners\n * @param \t\t{Number} \t\t[$left=null] \t\t\tThe radius to apply on left corners\n * @param \t\t{Number} \t\t[$top-left=null] \t\tThe radius to apply on top-left corners\n * @param \t\t{Number} \t\t[$top-right=null] \t\tThe radius to apply on top-right corners\n * @param \t\t{Number} \t\t[$bottom-left=null] \tThe radius to apply on bottom-left corners\n * @param \t\t{Number} \t\t[$bottom-right=null] \tThe radius to apply on bottom-right corners\n *\n * @example \tscss\n * .my-cool-item {\n * \t// apply on top left and right corners\n * \t\\@include Sugar.border-radius(\n * \t\t$top : 10px;\n * \t);\n * \t// apply on each corners\n * \t\\@include Sugar.border-radius(10px);\n * \t// etc...\n * }\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name  center-block\n * @namespace           scss.helper\n * @type      mixin\n *\n * Center a block element using margins etc...\n *\n * @example \tscss\n * .my-cool-block-element {\n * \t\\@include Sugar.center-block();\n * }\n *\n * @since       1.0.0\n * @author \tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name \tclearfix\n * @namespace           scss.helper\n * @type      mixin\n *\n * Apply a clearfix on the element.\n * Supported methods:\n * - micro\n * - facebook\n * - float\n * - micro\n *\n * @param \t\t{String} \t\t[$method=micro] \t\tThe clearfix method to use\n *\n * @example \tscss\n * .my-cool-element {\n *  \\@include Sugar.clearfix();\n * }\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      corner\n * @namespace           scss.helper\n * @type      mixin\n *\n * Apply some border radius\n * @param \t\t{Number} \t\t[$radius=null] \t\t\tThe radius to apply globally\n * @param \t\t{Number} \t\t[$top=null] \t\t\tThe radius to apply on top corners\n * @param \t\t{Number} \t\t[$right=null] \t\t\tThe radius to apply on right corners\n * @param \t\t{Number} \t\t[$bottom=null] \t\t\tThe radius to apply on bottom corners\n * @param \t\t{Number} \t\t[$left=null] \t\t\tThe radius to apply on left corners\n * @param \t\t{Number} \t\t[$top-left=null] \t\tThe radius to apply on top-left corners\n * @param \t\t{Number} \t\t[$top-right=null] \t\tThe radius to apply on top-right corners\n * @param \t\t{Number} \t\t[$bottom-left=null] \tThe radius to apply on bottom-left corners\n * @param \t\t{Number} \t\t[$bottom-right=null] \tThe radius to apply on bottom-right corners\n *\n * @example \tscss\n * .my-cool-item {\n * \t// apply on top left and right corners\n * \t\\@include Sugar.corner(\n * \t\t$top : 10px;\n * \t);\n * \t// apply on each corners\n * \t\\@include Sugar.corner(10px);\n * \t// etc...\n * }\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      fit\n * @namespace           scss.helper\n * @type      mixin\n *\n * Make the element fit his container.\n *\n * @param \t{String} \t\t\t[$position=null] \t\tThe position how to fit the element.\n *\n * @example \tscss\n * .my-cool-element {\n * \t\\@include Sugar.fit(absolute);\n * }\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      is\n * @namespace           scss.helper\n * @type      function\n *\n * Check if the passed value is of a certain type\n *\n * Here's the available types that you can check\n * - mixed => mean anything\n * - null\n * - url\n * - px\n * - pt\n * - rem\n * - em\n * - percent | %\n * - vw\n * - vh\n * - ex\n * - ch\n * - cm\n * - mm\n * - in\n * - pc\n * - s | second\n * - boolean | bool\n * - function\n * - number\n * - int | integer\n * - string\n * - color\n * - list\n * - map\n * - deg | degree\n * - list-{type} => check if is a list of the specified type\n * - map-{type} => check if is a map of the specified type\n *\n * @param \t\t\t{Mixed} \t\t\t$value \t\t\tThe value to check\n * @param \t\t\t{String} \t\t\t$type \t\t\tThe type to check\n * @return \t\t\t{Boolean} \t\t\t\t\t\t\ttrue if match the type, false if not\n *\n * @example       scss\n * Sugar.is(hello, string) // => true\n * Sugar.is('hello', string) // => true\n * Sugar.is(#fff, color) // => true\n * Sugar.is(hello #fff, list-color) // => false\n * Sugar.is(#fff #ddd, list-color) // => true\n * // etc...\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      normalize\n * @namespace           scss.helper\n * @type      mixin\n *\n * Print out a normalize css\n *\n * @example     scss\n * @include Sugar.normalize();\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      position\n * @namespace           scss.helper\n * @type      mixin\n *\n * Set a complexe position styling like position:absolute; top:0; left:100%; etc...\n * This mixin gives you some shortcuts to align your element top, bottom, middle, center, etc...\n *\n * @param \t\t{String} \t\t\t[$position=absolute] \t\t\tThe position css property\n * @param \t\t{String} \t\t\t[$vertical-align=top] \t\t\tThe vertical alignement wanted (top,middle,bottom)\n * @param \t\t{String} \t\t\t[$align=left] \t\t\t\t\tThe horizontal alignement wanted (left,center,right)\n * @param \t\t{Number} \t\t\t[$top=null] \t\t\t\t\tThe top property wanted\n * @param \t\t{Number} \t\t\t[$right=null] \t\t\t\t\tThe right property wanted\n * @param \t\t{Number} \t\t\t[$bottom=null] \t\t\t\t\tThe bottom property wanted\n * @param \t\t{Number} \t\t\t[$left=null] \t\t\t\t\tThe left property wanted\n * @return \t\t{Map} \t\t\t\t\t\t\t\t\t\t\t\tThe map representation of the position wanted\n *\n * @example       scss\n * .my-cool-element {\n * \t// absolute top right\n * \t\\@include Sugar.position(absolute, top, right);\n * \t// custom right and bottom values\n * \t\\@include Sugar.position(absolute,\n * \t\t$bottom : 20px,\n * \t\t$right : 20px\n * \t);\n * \t// etc...\n * }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      reset\n * @namespace           scss.helper\n * @type      mixin\n *\n * Print out a reset css\n *\n * @example     scss\n * @include Sugar.reset();\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      sanitize\n * @namespace           scss.helper\n * @type      mixin\n *\n * Print out a sanitize css\n *\n * @example     scss\n * @include Sugar.sanitize();\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    size\n * @namespace           scss.helper\n * @type      mixin\n *\n * Quicky and easily set simple or complexe size to any element\n *\n * @param \t\t{String|Number} \t\t$size-width\t\t\t\tThe size like \"cover\" or \"contain\", or the width in number\n * @param \t\t{Number} \t\t\t\t[$height=null] \t\t\tThe height wanted\n * @param \t\t{String} \t\t\t\t[$position=absolute] \tThe position wanted if the size is \"cover\" or \"contain\"\n *\n * @example \tscss\n * .my-cool-image {\n * \t\\@include Sugar.size(cover);\n * }\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    translate\n * @namespace           scss.helper\n * @type      mixin\n *\n * Quicky set some translates\n * @param \t\t{Number} \t\t[$x=0] \t\tThe x translate value\n * @param \t\t{Number} \t\t[$y=0] \t\tThe y translate value\n * @param \t\t{Number} \t\t[$z=0] \t\tThe z translate value\n *\n * @example     scss\n * .my-cool-element {\n * \t\\@include Sugar.translate(50%, 20px);\n * }\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    type-of\n * @namespace           scss.helper\n * @type      function\n *\n * Get the type of the passed variable\n *\n * @param           {Mixed}         $variable       The variable to get the type of\n * @return          {String}                        The type of the variable passed\n *\n * @example     scss\n * Sugar.type-of('hello world'); // => string\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    vertical-aligner\n * @namespace           scss.helper\n * @type      mixin\n *\n * Vertically align content by using the inline-block middle trick\n *\n * @example \tscss\n * .my-cool-container {\n * \t\\@include Sugar.vertical-aligner();\n * }\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      visually-hidden\n * @namespace           scss.helper\n * @type      mixin\n *\n * Hide an element only visually. This ensure that the element is still correctly displayed in the page for SEO\n * but will not being visible to the user\n *\n * @example \tscss\n * .my-cool-element {\n * \t\\@include Sugar.visually-hidden();\n * }\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n.fa,\n.fas,\n.far,\n.fal,\n.fad,\n.fab {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  display: inline-block;\n  font-style: normal;\n  font-variant: normal;\n  text-rendering: auto;\n  line-height: 1;\n}\n\n/*!\n * Font Awesome Free 5.13.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: \"Font Awesome 5 Brands\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-brands-400.eot\");\n  src: url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-brands-400.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-brands-400.woff2\") format(\"woff2\"), url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-brands-400.woff\") format(\"woff\"), url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-brands-400.ttf\") format(\"truetype\"), url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-brands-400.svg#fontawesome\") format(\"svg\");\n}\n.fab {\n  font-family: \"Font Awesome 5 Brands\";\n  font-weight: 400;\n}\n\n/*!\n * Font Awesome Free 5.13.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: \"Font Awesome 5 Free\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-regular-400.eot\");\n  src: url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-regular-400.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-regular-400.woff2\") format(\"woff2\"), url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-regular-400.woff\") format(\"woff\"), url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-regular-400.ttf\") format(\"truetype\"), url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-regular-400.svg#fontawesome\") format(\"svg\");\n}\n.far {\n  font-family: \"Font Awesome 5 Free\";\n  font-weight: 400;\n}\n\n/*!\n * Font Awesome Free 5.13.1 by @fontawesome - https://fontawesome.com\n * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)\n */\n@font-face {\n  font-family: \"Font Awesome 5 Free\";\n  font-style: normal;\n  font-weight: 900;\n  font-display: block;\n  src: url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-solid-900.eot\");\n  src: url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-solid-900.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-solid-900.woff2\") format(\"woff2\"), url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-solid-900.woff\") format(\"woff\"), url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-solid-900.ttf\") format(\"truetype\"), url(\"https://use.fontawesome.com/releases/v5.13.1/webfonts/fa-solid-900.svg#fontawesome\") format(\"svg\");\n}\n.fa,\n.fas {\n  font-family: \"Font Awesome 5 Free\";\n  font-weight: 900;\n}\n\n/**\n * @name      icon\n * @namespace           scss.icon\n * @type      mixin\n *\n * Apply an icon on the element. This mixin support font-awesome and custom icons systems that have an icon name formated like \"icon-{name}\"\n * The custom icon style if you pass as name \"user\" will extend %icon, %icon-user, .icon and .icon-user classes\n *\n * @param \t\t{String} \t\t$name \t\tThe icon name to apply\n * @param     {Color}     [$color=null]    The color wanted for the icon\n *\n * @example \tscss\n * .my-cool-icon {\n * \t\\@include Sugar.icon(fa-user, primary);\n * }\n *\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      icons\n * @namespace           scss.icon\n * @type    mixin\n *\n * Generate some icon classes like .icon-$icon-name\n *\n * @param         {List}          $icons-names            The list of icons names to generate\n * @param         {Color}         [$color=null]         The color wanted for the generated icons\n *\n * @example       scss\n * \\@include Sugar.icons(fa-user fa-bell fa-circle);\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name register-svg-icon\n * @namespace           scss.icon\n * @type      mixin\n *\n * Register a new icon to be used as base64 encoded url.\n * If you want your icon to be colorable, you need to specify this code on your paths: `style=\"fill:%color\"`\n *\n * @param    {String}    $name    The icon name\n * @param    {String}    $svgCode    The icons svg code\n *\n * @example     scss\n * @include Sugar.register-svg-icon(user, 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUwIDUwIiBoZWlnaHQ9IjUwcHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MCA1MCIgd2lkdGg9IjUwcHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIGZpbGw9Im5vbmUiIHI9IjI0IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjIiLz48cmVjdCBmaWxsPSJub25lIiBoZWlnaHQ9IjUwIiB3aWR0aD0iNTAiLz48cGF0aCBkPSJNMjkuOTMzLDM1LjUyOGMtMC4xNDYtMS42MTItMC4wOS0yLjczNy0wLjA5LTQuMjFjMC43My0wLjM4MywyLjAzOC0yLjgyNSwyLjI1OS00Ljg4OGMwLjU3NC0wLjA0NywxLjQ3OS0wLjYwNywxLjc0NC0yLjgxOCAgYzAuMTQzLTEuMTg3LTAuNDI1LTEuODU1LTAuNzcxLTIuMDY1YzAuOTM0LTIuODA5LDIuODc0LTExLjQ5OS0zLjU4OC0xMi4zOTdjLTAuNjY1LTEuMTY4LTIuMzY4LTEuNzU5LTQuNTgxLTEuNzU5ICBjLTguODU0LDAuMTYzLTkuOTIyLDYuNjg2LTcuOTgxLDE0LjE1NmMtMC4zNDUsMC4yMS0wLjkxMywwLjg3OC0wLjc3MSwyLjA2NWMwLjI2NiwyLjIxMSwxLjE3LDIuNzcxLDEuNzQ0LDIuODE4ICBjMC4yMiwyLjA2MiwxLjU4LDQuNTA1LDIuMzEyLDQuODg4YzAsMS40NzMsMC4wNTUsMi41OTgtMC4wOTEsNC4yMWMtMS4yNjEsMy4zOS03LjczNywzLjY1NS0xMS40NzMsNi45MjQgIGMzLjkwNiwzLjkzMywxMC4yMzYsNi43NDYsMTYuOTE2LDYuNzQ2czE0LjUzMi01LjI3NCwxNS44MzktNi43MTNDMzcuNjg4LDM5LjE4NiwzMS4xOTcsMzguOTMsMjkuOTMzLDM1LjUyOHoiLz48L3N2Zz4=');\n *\n * @since       1.0.0\n * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      background\n * @namespace           scss.image\n * @type      mixin\n *\n * Helper mixin to set a background image\n *\n * @param \t\t\t{String} \t\t\t\t[$repeat=null] \t\t\t\tThe background-repeat property\n * @param \t\t\t{String} \t\t\t\t[$size=null] \t\t\t\tThe background-size property\n * @param \t\t\t{String} \t\t\t\t[$attachment=null] \t\t\tThe background-attachment property\n * @param \t\t\t{String} \t\t\t\t[$blend-mode=null] \t\t\tThe background-blend-mode property\n * @param \t\t\t{String} \t\t\t\t[$clip=null] \t\t\t\tThe background-clip property\n * @param \t\t\t{String} \t\t\t\t[$url=null] \t\t\t\tThe background-image url property\n * @param \t\t\t{Number} \t\t\t\t[$width=null] \t\t\t\tThe background-size width property\n * @param \t\t\t{Number} \t\t\t\t[$height=null] \t\t\t\tThe background-size height property\n * @param \t\t\t{Number} \t\t\t\t[$top=null] \t\t\t\tThe background-position top property\n * @param \t\t\t{Number} \t\t\t\t[$left=null] \t\t\t\tThe background-position left property\n * @param \t\t\t{String} \t\t\t\t[$suffix2x=@2x] \t\t\tThe suffix to add the the url if the 2x resolution if wanted\n * @param \t\t\t{String} \t\t\t\t[$suffix3x=@3x] \t\t\tThe suffix to add the the url if the 3x resolution if wanted\n * @param \t\t\t{String} \t\t\t\t[$suffix4x=@4x] \t\t\tThe suffix to add the the url if the 4x resolution if wanted\n * @param \t\t\t{List} \t\t\t\t\t[$resolution=null] \t\t\tThe resolution wanted like 2x, 3x and 4x\n * @param \t\t\t{List} \t\t\t\t\t[$position=null] \t\t\tThe background-position property\n *\n * @example     scss\n * .my-cool-element {\n * \t\t\\@include Sugar.background(\n * \t\t\t$url : 'img/my-cool-image.jpg',\n * \t\t\t$size : cover,\n * \t\t\t$resolution : 2x 3x 4x\n * \t\t);\n * }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      image-rendering\n * @namespace           scss.image\n * @type      mixin\n *\n * Set how to render the image\n *\n * @param \t\t{String} \t\t[$mode=auto] \t\tThe mode to use to render the image\n *\n * @example \tscss\n * img {\n * \t\\@include Sugar.image-rendering(crips-edges);\n * }\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    columns\n * @namespace           scss.layout\n * @type      mixin\n *\n * Create a column layout my setting each columns properties at once\n *\n * @param \t\t{Integer} \t\t[$count=null] \t\tThe number of columns wanted\n * @param \t\t{Number} \t\t[$gap=null] \t\tThe column-gap width wanted\n * @param \t\t{String} \t\t[$fill=null] \t\tThe column-fill wanted\n * @param \t\t{Number} \t\t[$width=null] \t\tTHe width of each columns wanted\n * @param \t\t{String} \t\t[$span=null] \t\tSpecify on how many columns the element has to span across\n * @param \t\t{List} \t\t\t[$rule=null] \t\tSpecify the shorthand version of the column-rule-color, column-rule-style and column-rule-width\n * @param \t\t{String} \t\t[$rule-style=null] \tSpecify the column-rule-style wanted\n * @param \t\t{Color} \t\t[$rule-color=null] \tSpecify the column-rule-color wanted\n * @param \t\t{Number} \t\t[$rule-width=null] \tSpecify the column-rule-width wanted\n *\n * @example \tscss\n * .my-cool-container {\n * \t\\@include Sugar.columns(\n * \t\t$count : 3,\n * \t\t$gap : 30px,\n * \t\t$span : all\n * \t);\n * }\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    ratio\n * @namespace           scss.layout\n * @type      mixin\n *\n * Apply a ratio css styling. This will apply a before or after content that will make the element keep the specified ratio.\n * The content need to be displayed as absolute top left and fit in size.\n *\n * @param \t\t{Number} \t\t$ratio \t\t\tThe ratio to keep like 16/9, etc...\n *\n * @example \tscss\n * .my-cool-element {\n * \t\\@include Sugar.ratio(16/9);\n * }\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name          link-stretched\n * @namespace     scss.link\n * @type          Mixin\n *\n * Make a link become the size of it's parent (absolute, relative)\n * but only using the :after pseudo class so visually it will stay the same...\n *\n * @since         2.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n/**\n * @name      list-bullet\n * @namespace           scss.list\n * @type      mixin\n *\n * Set how the list bullet has to be displayed.\n *\n * @param \t\t{String} \t\t[$type=null] \t\t\t\tThe list type to use. Can be all the list-style-type values\n * @param \t\t{Url} \t\t\t[$image=null] \t\t\t\tAn image url to use as bullet\n * @param \t\t{String} \t\t[$icon=null] \t\t\t\tAn icon name to use as bullet. Will use the s-icon mixin under the hood\n * @param \t\t{Color} \t\t[$color=s-color(default)] \tThe color to use for the bullet\n * @param \t\t{Number} \t\t[$size=null] \t\t\t\tThe size to use for the bullet\n * @param \t\t{Number|List<Number>} \t[$offset=null] \t\tA number that represent the top offset, or a list of two numbers that represent the top, left offset\n * @param \t\t{String} \t\t[$font=null] \t\t\t\tThe font name to use for the bullet\n * @param \t\t{Number} \t\t[$space=null] \t\t\t\tThe space between the bullet and the content\n *\n * @todo      Add fontawesome icon support\n *\n * @example \tscss\n * .my-cool-list__item {\n * \t@\\include Sugar.list-bullet(\n * \t\t$image : '../img/my-cool-bullet.svg',\n * \t\t$offset : 5px 10px,\n * \t\t$size : 1em,\n * \t\t$space : 2em\n * \t);\n * }\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    list-start\n * @namespace           scss.list\n * @type      mixin\n *\n * Start a new list\n *\n * @param \t\t{String} \t\t[$counter-reset=s-list] \t\tA counter name to reset\n *\n * @example     scss\n * .my-cool-list {\n *    Sugar.list-start();\n * }\n *\n * @since       1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      loader-bars\n * @namespace           scss.loader\n * @type      function\n *\n * Generate a full animated, single element, bars loader\n *\n * @param \t\t\t{String} \t\t\t[$shape=rect] \t\t\t\tThe shape of the bars (rect,circle)\n * @param \t\t\t{Color} \t\t\t[$color=primary] \t\t\tThe color(s) of the loader. Can be a list of colors\n * @param \t\t\t{Number} \t\t\t[$width=.5em] \t\t\t\tThe width of each bars\n * @param \t\t\t{Number} \t\t\t[$height=2em] \t\t\t\tThe height of each bars\n * @param \t\t\t{Integer} \t\t\t[$count=5] \t\t\t\t\tHow many bars you want\n * @param \t\t\t{Number} \t\t\t[$gap=.5em] \t\t\t\tThe gap between each bars\n * @param \t\t\t{Number} \t\t\t[$opacity=1] \t\t\t\tThe initial opacity of each bars\n * @param \t\t\t{Number} \t\t\t[$a-opacity=null] \t\t\tThe opacity of the animated bars\n * @param \t\t\t{Second} \t\t\t[$a-duration=1s] \t\t\tThe overall animation duration\n * @param \t\t\t{Second} \t\t\t[$a-delay=0s] \t\t\t\tThe delay between two animation cycle\n * @param \t\t\t{Integer} \t\t\t[$a-near=1] \t\t\t\tHow many bars are affected by the animated one\n * @param \t\t\t{String} \t\t\t[$a-ease=ease-in-out] \t\tThe ease to use to animate each bars\n * @param \t\t\t{Number} \t\t\t[$a-offset=1em] \t\t\tThe offset to move the animated bar in em\n * @param \t\t\t{String} \t\t\t[$a-direction=both] \t\tThe direction in which to move the bars (up,down,both)\n * @param \t\t\t{Boolean} \t\t\t[$a-continuous=true] \t\tIf true, the first bars will be animated at same time at the last ones\n *\n * @example     scss\n * .my-cool-loader {\n * \t\t\\@include Sugar.loader-bars(\n * \t\t\t$color : primary,\n * \t\t\t$a-offset : .5em\n * \t\t);\n * }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      loader-circle\n * @namespace           scss.loader\n * @type      Mixin\n *\n * Generate a full animated, single element, circle loader\n *\n * @param \t\t\t{Color} \t\t\t[$color=primary] \t\t\tThe color(s) of the loader. Can be a list of colors\n * @param \t\t\t{Number} \t\t\t[$size=.33em] \t\t\t\tThe size of each dot\n * @param \t\t\t{Number} \t\t\t[$radius=2em] \t\t\t\tThe distance of each dot from the center of the loader\n * @param \t\t\t{Integer} \t\t\t[$count=8] \t\t\t\t\tHow many bars you want\n * @param \t\t\t{Number} \t\t\t[$opacity=1] \t\t\t\tThe initial opacity of each bars\n * @param \t\t\t{Number} \t\t\t[$a-opacity=null] \t\t\tThe opacity of the animated bars\n * @param \t\t\t{Second} \t\t\t[$a-duration=1s] \t\t\tThe overall animation duration\n * @param \t\t\t{Second} \t\t\t[$a-delay=0s] \t\t\t\tThe delay between two animation cycle\n * @param \t\t\t{Integer} \t\t\t[$a-near=2] \t\t\t\tHow many bars are affected by the animated one\n * @param \t\t\t{String} \t\t\t[$a-ease=ease-in-out] \t\tThe ease to use to animate each bars\n * @param       {Number}       [$a-spread=2em]        How many distance the points have to be animated\n * @param       {Number}        [$a-rotate=null]      How many degrees have the points to be animated\n * @param       {Number}        [$a-scale=1em]        How many scale have the points to be animated\n *\n * @example     scss\n * .my-cool-loader {\n *    @include Sugar.loader-circle(\n *      $color: Sugar.color(primary)\n *    );\n * }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      loader-couch-potato\n * @namespace           scss.loader\n * @type      function\n *\n * Generate a full animated, single element, couch-potato style loader\n *\n * @param \t\t{Number} \t\t[$size=1em] \t\t\t\tThe size of the loader\n * @param \t\t{Color} \t\t[$color=primary] \t\t\tThe color of the loader\n * @param \t\t{Second} \t\t[$a-duration=1s] \t\t\tThe overall animation duration\n * @param \t\t{Second} \t\t[$a-delay=0s] \t\t\t\tThe delay between two animation cycle\n * @param \t\t{String} \t\t[$a-ease=ease-in-out]\t\tThe ease to use for the animation\n * @param \t\t{Degree}\t\t[$a-rotate=360deg] \t\t\tThe animation rotation\n * @param \t\t{Number} \t\t[$a-scale=2] \t\t\t\tThe animation scale\n *\n * @example     scss\n * .my-cool-loader {\n * \t\t\\@include Sugar.loader-couch-potato();\n * }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      loader-flip-ball\n * @namespace           scss.loader\n * @type      Mixin\n *\n * Generate a full animated, single element, flip ball style loader\n *\n * @param \t\t{String} \t\t[$shape=circle] \t\t\tThe shape of the loader (circle,rect)\n * @param \t\t{Number} \t\t[$size=2em] \t\t\t\tThe size of the loader\n * @param \t\t{Color} \t\t[$colors=(primary,success,warning,error,info)] \t\t\tThe colors of the loader. Can be a list of colors\n * @param \t\t{Second} \t\t[$a-duration=1s] \t\t\tThe overall animation duration\n * @param \t\t{Second} \t\t[$a-delay=0s] \t\t\t\tThe delay between two animation cycle\n * @param \t\t{String} \t\t[$a-ease=ease-in-out]\t\tThe ease to use for the animation\n *\n * @example       scss\n * .my-cool-loader {\n * \t\t\\@include Sugar.loader-flip-ball();\n * }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      loader-grid\n * @namespace           scss.loader\n * @type      function\n *\n * Generate a grid style loader\n *\n * @param       {String}      [$shape=rect]             The shape of the grid items. Can be rect or circle\n * @param       {Color}       [$color=color(primary)]   The color to use for the grid items\n * @param       {Number}      [$cols=3]                 How many columns the grid must have\n * @param       {Number}      [$rows=3]                 How many rows must have the grid\n * @param       {Number}      [$size=10px]              The size of each grid items\n * @param       {Number}      [$gap=5px]                The size of the gaps between the grid items\n * @param       {Number}      [$offset=0]               The offset used for the grid\n * @param       {Number}      [$rotate=0deg]            Apply a rotation to the grid items\n * @param       {String}      [$a-shape=null]           The animation shape to apply to the grid items. Can be rect or circle\n * @param       {Number}      [$a-steps=5]              How many steps must have the animation\n * @param       {Number}      [$a-spread=15px]          How much must the grid items spread during the animation\n * @param       {Number}      [$a-rotate=null]          How many degrees must the grid items rotate during the animation\n * @param       {Number}      [$a-scale=null]           Apply a scale for the animation of the grid items\n * @param       {Number}      [$a-opacity=null]         Apply an opacity to the grid items during the animation\n * @param       {Second}      [$a-duration=1s]          The duration of the animation\n * @param       {Second}      [$a-delay=0s]             How many seconds to wait between each animations\n * @param       {String}      [$a-ease=ease-in-out]     The easing to use for the animation\n *\n * @example     scss\n * .my-cool-loader {\n *    @include Sugar.loader-grid();\n * }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      loader-radial\n * @namespace           scss.loader\n * @type      function\n *\n * Generate a radial styled loader\n *\n * @param       {String}      [$shape=circle]       The shape of the items that make the circle. Can be rect or circle\n * @param       {Number}      [$size=3em]           The size of the items\n * @param       {Number}      [$width=0.2em]        The width of the circle loader\n * @param       {String}      [$style=solid]        The style of the items that form the loader. Can be none, hidden, dotted, dashed, solid, double, groove, ridge, inset, outset, initial or inherit\n * @param       {Color}       [$color=primary]     The color to use for the loader\n * @param       {Second}      [$a-duration=2s]      How many time will be the animation\n * @param       {Second}      [$a-delay=0s]         How many time to wait between two animation\n * @param       {Number}      [$a-count=2]          How many circles will be animated\n * @param       {Number}      [$a-spread=1em]         Specify a spread value for the animation of each circles\n * @param       {String}      [$a-ease=linear]      Specify the ease to use for the animation\n *\n * @example       scss\n * .my-cool-loader {\n *    @include Sugar.loader-radial();\n * }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      loader-spinner\n * @namespace           scss.loader\n * @type      function\n *\n * Generate a spinner loader\n *\n * @param         {Number}        [$size=2em]             Specify the size of the spinner loader\n * @param         {Number}        [$width=0.3em]          Specify the width of the spinner loader\n * @param         {Color}         [$color=primary]        Specify the color of the spinner loader\n * @param         {Color}         [$bgcolor=inherit]        Specify the background color of the spinner loader\n * @param         {Number}        [$length=3/4]           The length of the spinner loader\n * @param         {Second}        [$a-duration=1s]        The duration of the spinner loader animation\n * @param         {String}        [$a-ease=linear]          Specify an ease to use for the spinner loader animation\n *\n * @example     scss\n * .my-cool-loader {\n *    @include Sugar.loader-spinner();\n * }\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    to-base64-url\n * @namespace           scss.meta\n * @type      function\n *\n * Convert the passed svg code to an embadable base64 url\n *\n * @param       {String}        $svg        The svg code to convert\n * @return      {String}                    The embedable converted base64 url\n *\n * @example       scss\n * Sugar.to-base64-url('<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M20.822 18.096c-3.439-.794-6.641-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.732-13.678-5.081 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-2.979.688-3.178 2.143-3.178 4.663l.005 1.241h10.483l.704-3h1.615l.704 3h10.483l.005-1.241c.001-2.52-.198-3.975-3.177-4.663zm-8.231 1.904h-1.164l-.91-2h2.994l-.92 2z\"/></svg>');\n * // url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M20.822 18.096c-3.439-.794-6.641-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.732-13.678-5.081 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-2.979.688-3.178 2.143-3.178 4.663l.005 1.241h10.483l.704-3h1.615l.704 3h10.483l.005-1.241c.001-2.52-.198-3.975-3.177-4.663zm-8.231 1.904h-1.164l-.91-2h2.994l-.92 2z'/%3E%3C/svg%3E\")\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      to-base64\n * @namespace           scss.meta\n * @type      function\n *\n * Convert the passed svg code to base64 embedable url\n *\n * @param       {String}        $svg        The svg code to convert\n * @return      {String}                    The base64 converted url code\n *\n * @example     scss\n * Sugar.to-base64('<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M20.822 18.096c-3.439-.794-6.641-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.732-13.678-5.081 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-2.979.688-3.178 2.143-3.178 4.663l.005 1.241h10.483l.704-3h1.615l.704 3h10.483l.005-1.241c.001-2.52-.198-3.975-3.177-4.663zm-8.231 1.904h-1.164l-.91-2h2.994l-.92 2z\"/></svg>');\n * // url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M20.822 18.096c-3.439-.794-6.641-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.732-13.678-5.081 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-2.979.688-3.178 2.143-3.178 4.663l.005 1.241h10.483l.704-3h1.615l.704 3h10.483l.005-1.241c.001-2.52-.198-3.975-3.177-4.663zm-8.231 1.904h-1.164l-.91-2h2.994l-.92 2z'/%3E%3C/svg%3E\")\n *\n * @since       1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name                  media\n * @namespace             scss.responsive\n * @type                  Mixin\n *\n * This mixin allows you to specify easily which media (defined in the media.config.js file) has to be targeted.\n * You can specify multiple medias if needed and specify how you want to target the specific media.\n * Check out the examples for more info.\n * By default, the Sugar toolkit offer these medias to be targeted:\n * - mobile\n * - mobile-portrait\n * - mobile-landscape\n * - tablet\n * - tablet-portrait\n * - tablet-landscape\n * - desktop\n *\n * You can use some \"actions\" to specify your target. The available actions are:\n * - '>': Greater than...\n * - '<': Lower than...\n * - '=': Equal...\n * - '>=': Greater or equal...\n * - '>=': Lower or equal...\n *\n * Your media queries can be something like this: '<tablet', '>mobile <desktop', '=tablet-landscape'.\n * If you don't specicy any action in your queries, by default the \"defaultAction\" property in the media.config.js file will\n * be applied and this default action is setted to \">=\". This is setted like this to work in \"mobile first\" schema by default.\n *\n * @param       {String}        $media      The media(s) you want to target.\n *\n * @example       scss\n * .my-cool-container {\n *    background: red;\n *\n *    @include Sugar.media(tablet) {\n *      background: blue;\n *    }\n *\n *    @include Sugar.media('>=desktop') {\n *      background: green;\n *    }\n * }\n *\n * @since       2.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name            sr-only\n * @namespace       scss.screen-reader\n * @type            Mixin\n *\n * Make the element visible only for the screen readers\n *\n * @since       2.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @todo        Mixin header and documentation\n */\n/**\n * @todo        Mixin header and documentation\n */\n/**\n * @todo          Mixin header and documentation\n */\n/**\n * @name      round-overflow\n * @namespace           scss.shape\n * @type      mixin\n *\n * Apply some css to have a rounded element with already an overflow on it\n *\n * @param \t\t{Number} \t\t[$size=null] \t\tThe size (width and height) of the element wanted\n * @param \t\t{Number} \t\t[$width=null] \t\tThe width of the element wanted\n * @param \t\t{Number} \t\t[$height=null] \t\tThe height of the element wanted\n *\n * @example \tscss\n * .my-cool-image {\n * \t\\@include Sugar.round-overflow(100px);\n *\n * \timg {\n * \t\t\\@include Sugar.size(cover);\n * \t}\n * }\n *\n * @since      1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name        triangle\n * @namespace           scss.shape\n * @type      mixin\n *\n * Generate a triangle shape\n *\n * @param       {Number}        [$width=1em]              The triangle width\n * @param       {Number}        [$height=1em]             The triangle height\n * @param       {Color}         [$color=color(primary)]    The triangle color\n * @param       {String}        [$direction=right]        The triangle direction. Can be top, right, bottom, left, top-left, top-right, bottom-left or bottom-right\n * @param       {String}        [$transform-origin=center]    The triangle transform origin. Can be center or base\n * @param       {Number}        [$border-width=0]         The border width\n * @param       {Color}         [$border-color=null]      The border color\n *\n * @example     scss\n * .my-cool-triangle {\n *    @include Sugar.triangle();\n * }\n *\n * @since      1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      rhythm-width\n * @namespace           scss.typography\n * @type      function\n *\n * Return the Map properties representation for the rhythme width\n * The rhythme width is the width of an element that target a certain number of letters by line\n *\n * @param \t\t\t{Integer} \t\t\t[$letters-count=settings.typography.line-letters-count] \t\tThe number of letters to target by line\n * @return \t\t\t{Map} \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tThe Map properties representation\n *\n * @example     scss\n * Sugar.rhythm-width(50);\n * // return\n * // (\n * // \tdisplay : block,\n * // \tmax-width : 50ex\n * // )\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name        rhythm-width\n * @namespace           scss.typography\n * @type      mixin\n *\n * Print out the css on a container that will make the lines displays a maximum number of characters.\n *\n * @example \tscss\n * h1 {\n * \t\\@include Sugar.rhythm-width(45);\n * }\n *\n * @since      1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    selection\n * @namespace           scss.typography\n * @type      mixin\n *\n * Set the user selection styling with ease\n *\n * @example \tscss\n * \\@include Sugar.selection() {\n * \tbackground: red;\n * \tcolor: white;\n * }\n *\n * @since      1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      text-hide\n * @namespace           scss.typography\n * @type      mixin\n *\n * Hide the contained text\n *\n * @example \tscss\n * .my-cool-container {\n * \t\\@include Sugar.text-hide();\n * }\n *\n * @since      1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      text-truncate\n * @namespace           scss.typography\n * @type      mixin\n *\n * Print out the style to truncate the text if needed\n *\n * @example \tscss\n * h1 {\n * \t\\@include Sugar.text-truncate();\n * }\n *\n * @since      1.0.0\n * @author \t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      convert\n * @namespace           scss.unit\n * @type      function\n *\n * Convert a passed value to the wanted unit\n * The conversion between some units that depends on a font-size will take the settings.typography.font-size value as reference.\n *\n * Available conversions\n * - from px\n * \t- to em\n * \t- to rem\n * \t- to pt\n * \t- to %\n *\n * - from em\n * \t- to rem\n * \t- to px\n * \t- to pt\n * \t- to %\n *\n * - from pt\n * \t- to em\n * \t- to rem\n * \t- to px\n * \t- to pt\n * \t- to %\n *\n * - from rem\n * \t- to em\n * \t- to px\n * \t- to pt\n * \t- to %\n *\n * @param \t\t\t{Number} \t\t$value \t\t\tThe value to convert\n * @param \t\t\t{String} \t\t$unit \t\t\tThe unit in which to convert the value\n * @return \t\t\t{Number} \t\t\t\t\t\tThe converted value\n *\n * @example     scss\n * // if the settings.typography.font-size === 16px\n * Sugar.convert(24px, rem) // 1.5rem\n * Sugar.convert(3rem, pt) // 36pt\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      is-unitless\n * @namespace           scss.unit\n * @type      function\n *\n * Check if the passed variable is unitless or not\n *\n * @param         {Number}        $number       The number to check\n * @return        {Boolean}                     true if unitless, false if not\n *\n * @example       scss\n * Sugar.is-unitless(20); // => true\n * Sugar.is-unitless(10px); // => false\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    strip-units\n * @namespace           scss.unit\n * @type      function\n *\n * Return a number without any units\n *\n * @param \t\t\t{Number} \t\t$number \t\tThe number to process\n * @return \t\t\t{Number} \t\t\t\t\t\tThe number without units\n *\n * @example       scss\n * Sugar.strip-units(12px); // => 12\n * Sugar.strip-units(30rem); // => 30\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    to-em\n * @namespace           scss.unit\n * @type      function\n *\n * Convert the passed value to em\n *\n * @param \t\t\t{Number} \t\t$value \t\tThe value to convert\n * @return \t\t\t{Number} \t\t\t\t\tThe em converted value\n *\n * @example     scss\n * Sugar.to-em(10px);\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    to-percent\n * @namespace           scss.unit\n * @type      function\n *\n * Convert the passed value to %\n *\n * @param \t\t\t{Number} \t\t$value \t\tThe value to convert\n * @return \t\t\t{Number} \t\t\t\t\tThe % converted value\n *\n * @example     scss\n * Sugar.to-percent(10px);\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      to-pt\n * @namespace           scss.unit\n * @type      function\n *\n * Convert the passed value to pt\n *\n * @param \t\t\t{Number} \t\t$value \t\tThe value to convert\n * @return \t\t\t{Number} \t\t\t\t\tThe pt converted value\n *\n * @example       scss\n * Sugar.to-pt(10px);\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    to-px\n * @namespace           scss.unit\n * @type      function\n *\n * Convert the passed value to px\n *\n * @param \t\t\t{Number} \t\t$value \t\tThe value to convert\n * @return \t\t\t{Number} \t\t\t\t\tThe px converted value\n *\n * @example       scss\n * Sugar.to-px(10rem);\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    to-rem\n * @namespace           scss.unit\n * @type      function\n *\n * Convert the passed value to rem\n *\n * @param \t\t\t{Number} \t\t$value \t\tThe value to convert\n * @return \t\t\t{Number} \t\t\t\t\tThe rem converted value\n *\n * @example     scss\n * Sugar.to-rem(10px);\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    unit\n * @namespace           scss.unit\n * @type      function\n *\n * Return the unit of the passed number\n *\n * @param       {Number}      $number       The number to get the unit from\n * @return      {String}                    The unit\n *\n * @example     scss\n * Sugar.unit(10px); // => px\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name    border-map\n * @namespace           scss.util\n * @type      function\n *\n * Parse and return the Map respresentation of a border property\n * The $border argument will be parsed with the [s-parse-properties](../core/functions/_s-parse-properties.scss) function.\n *\n * @param \t\t{List} \t\t\t$border \t\t\tThe border property to parse\n * @return \t\t{Map} \t\t\t\t\t\t\t\tThe Map represenration of the border\n *\n * @example       scss\n * Sugar.border-map(1px solid white);\n * // return\n * // (\n * // \twidth : 1px,\n * // \tcolor : white,\n * // \tstyle : solid\n * // )\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      margin-map\n * @namespace           scss.util\n * @type      function\n *\n * Parse and return the Map respresentation of a margin property\n * The $margin argument will be parsed with the [s-parse-properties](../core/functions/_s-parse-properties.scss) function.\n *\n * @param \t\t\t{List|Number} \t\t\t$margin \t\t\tThe margin property to parse\n * @return \t\t\t{Map} \t\t\t\t\t\t\t\t\t\tThe map representation\n *\n * @example   scss\n * Sugar.margin-map(10px); // => ( top:10px, right:10px, bottom:10px, left:10px )\n * Sugar.margin-map(10px 20px); // => ( top:10px, right:20px, bottom:10px, left:20px )\n * Sugar.margin-map(5px 10px 15px 20px); // => ( top:5px, right:10px, bottom:15px, left:20px )\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      position-map\n * @namespace           scss.util\n * @type      function\n *\n * Return the representation of a position styling like position:absolute; top:0; left:100%; etc...\n * This function gives you some shortcuts to align your element top, bottom, middle, center, etc...\n *\n * @param \t\t{String} \t\t\t[$position=absolute] \t\t\tThe position css property\n * @param \t\t{String} \t\t\t[$vertical-align=top] \t\t\tThe vertical alignement wanted (top,middle,bottom)\n * @param \t\t{String} \t\t\t[$align=left] \t\t\t\t\tThe horizontal alignement wanted (left,center,right)\n * @param \t\t{Number} \t\t\t[$top=null] \t\t\t\t\tThe top property wanted\n * @param \t\t{Number} \t\t\t[$right=null] \t\t\t\t\tThe right property wanted\n * @param \t\t{Number} \t\t\t[$bottom=null] \t\t\t\t\tThe bottom property wanted\n * @param \t\t{Number} \t\t\t[$left=null] \t\t\t\t\tThe left property wanted\n * @return \t\t{Map} \t\t\t\t\t\t\t\t\t\t\t\tThe map representation of the position wanted\n *\n * @example   scss\n * Sugar.position-map(absolute, top, right);\n * Sugar.position-map(absolute, middle, center);\n * Sugar.position-map(relative, bottom, right);\n * Sugar.position-map(absolute, bottom, center);\n * // etc...\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * @name      translate-map\n * @namespace           scss.util\n * @type      function\n *\n * Return the Map properties representation of a translate x,y and z\n *\n * @param \t\t\t{Number} \t\t\t[$x=0] \t\t\tThe x translate value\n * @param \t\t\t{Number} \t\t\t[$y=0] \t\t\tThe y translate value\n * @param \t\t\t{Number} \t\t\t[$z=0] \t\t\tThe z translate value\n * @return \t\t\t{Map} \t\t\t\t\t\t\t\tThe translate Map representation\n *\n * @example     scss\n * Sugar.translate-map(10px,20px);\n * // return\n * // (\n * // \ttransform: translateX(10px) translateY(20px) translateZ(0)\n * // )\n *\n * @since      1.0.0\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)\n */\n/**\n * This file is responsible to register the static helper classes like:\n *\n * - sugar.helper.pull.left : <primary>pull-left</primary>\n * - sugar.helper.pull.right : <primary>pull-right</primary>\n * - sugar.helper.position.relative : <primary>relative</primary>\n * - sugar.helper.position.absolute : <primary>absolute</primary>\n * - sugar.helper.clear.left : <primary>clear-left</primary>\n * - sugar.helper.clear.right : <primary>clear-right</primary>\n * - sugar.helper.clear.both : <primary>clear</primary>\n * - sugar.helper.pointer.events.all : <primary>pointer-events-all</primary>\n * - sugar.helper.pointer.events.none : <primary>pointer-events-none</primary>\n * - sugar.helper.display.show : <primary>show</primary>\n * - sugar.helper.display.show-inline : <primary>show-inline</primary>\n * - sugar.helper.display.hidden : <primary>hidden</primary>\n * - sugar.helper.display.hide : <primary>hide</primary>\n * - sugar.helper.display.visible : <primary>visible</primary>\n * - sugar.helper.display.invisible : <primary>invisible</primary>\n * - sugar.helper.display.visually-hidden : <primary>visually-hidden</primary>\n * - sugar.helper.text.hidden : <primary>t-hidden</primary>\n * - sugar.helper.text.truncate : <primary>t-truncate</primary>\n * - sugar.helper.text.align.left : <primary>t-left</primary>\n * - sugar.helper.text.align.right : <primary>t-right</primary>\n * - sugar.helper.text.align.center : <primary>t-center</primary>\n * - sugar.helper.text.align.justify : <primary>t-justify</primary>\n * - sugar.helper.text.transform.lowercase : <primary>t-lowercase</primary>\n * - sugar.helper.text.transform.uppercase : <primary>t-uppercase</primary>\n * - sugar.helper.text.transform.capitalize : <primary>t-capitalize</primary>\n * - sugar.helper.font.weight.bold : <primary>f-bold</primary>\n * - sugar.helper.font.weight.lighter : <primary>f-lighter</primary>\n * - sugar.helper.font.weight.bolder : <primary>f-bolder</primary>\n * - sugar.helper.font.weight.normal : <primary>f-normal</primary>\n * - sugar.helper.font.style.italic : <primary>f-italic</primary>\n * - sugar.helper.font.style.oblique : <primary>f-oblique</primary>\n * - sugar.helper.font.variant.small-caps : <primary>f-small-caps</primary>\n * - sugar.helper.block.align.center : <primary>block-center</primary>\n * - sugar.helper.ratio.21-9 : <primary>ratio-21-9</primary>\n * - sugar.helper.ratio.16-9 : <primary>ratio-16-9</primary>\n * - sugar.helper.ratio.4-3 : <primary>ratio-4-3</primary>\n * - sugar.helper.ratio.1-1 : <primary>ratio-1-1</primary>\n * - sugar.helper.size.abs.cover : <primary>abs-cover</primary>\n * - sugar.helper.size.abs.contain : <primary>abs-contain</primary>\n * - sugar.helper.size.abs.fit : <primary>abs-fit</primary>\n * - sugar.helper.media.object : <primary>mo .mo--center .mo--end .mo__content</primary>\n * - sugar.helper.clearfix.default : <primary>clearfix</primary>\n * - sugar.helper.clearfix.float : <primary>clearfix-float</primary>\n * - sugar.helper.clearfix.micro : <primary>clearfix-micro</primary>\n * - sugar.helper.clearfix.overflow : <primary>clearfix-overflow</primary>\n * - sugar.helper.clearfix.facebook : <primary>clearfix-facebook</primary>\n * - sugar.helper.no-transition : <primary>no-transition</primary>\n * - sugar.helper.clear-transition : <primary>clear-transition</primary>\n * - sugar.helper.no-animation : <primary>no-animation</primary>\n * - sugar.helper.clear-animation : <primary>clear-animation</primary>\n * - sugar.helper.no-transmation : <primary>no-transmation</primary>\n * - sugar.helper.clear-transmation : <primary>clear-transmation</primary>\n *\n * @author \t\t\tOlivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)\n */\n.hello {\n  content: \"world\";\n}\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* make sure to set some focus styles for accessibility */\n:focus {\n  outline: 0;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ninput[type=search]::-webkit-search-cancel-button,\ninput[type=search]::-webkit-search-decoration,\ninput[type=search]::-webkit-search-results-button,\ninput[type=search]::-webkit-search-results-decoration {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n}\n\ninput[type=search] {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  -webkit-box-sizing: content-box;\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n}\n\ntextarea {\n  overflow: auto;\n  vertical-align: top;\n  resize: vertical;\n}\n\n/**\n * Correct `inline-block` display not defined in IE 6/7/8/9 and Firefox 3.\n */\naudio,\ncanvas,\nvideo {\n  display: inline-block;\n  *display: inline;\n  *zoom: 1;\n  max-width: 100%;\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address styling not present in IE 7/8/9, Firefox 3, and Safari 4.\n * Known issue: no IE 6 support.\n */\n[hidden] {\n  display: none;\n}\n\n/**\n * 1. Correct text resizing oddly in IE 6/7 when body `font-size` is set using\n *    `em` units.\n * 2. Prevent iOS text size adjust after orientation change, without disabling\n *    user zoom.\n */\nhtml {\n  font-size: 100%;\n  /* 1 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n}\n\n/**\n * Address `outline` inconsistency between Chrome and other browsers.\n */\na:focus {\n  outline: thin dotted;\n}\n\n/**\n * Improve readability when focused and also mouse hovered in all browsers.\n */\na:active,\na:hover {\n  outline: 0;\n}\n\n/**\n * 1. Remove border when inside `a` element in IE 6/7/8/9 and Firefox 3.\n * 2. Improve image quality when scaled in IE 7.\n */\nimg {\n  border: 0;\n  /* 1 */\n  -ms-interpolation-mode: bicubic;\n  /* 2 */\n}\n\n/**\n * Address margin not present in IE 6/7/8/9, Safari 5, and Opera 11.\n */\nfigure {\n  margin: 0;\n}\n\n/**\n * Correct margin displayed oddly in IE 6/7.\n */\nform {\n  margin: 0;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct color not being inherited in IE 6/7/8/9.\n * 2. Correct text not wrapping in Firefox 3.\n * 3. Correct alignment displayed oddly in IE 6/7.\n */\nlegend {\n  border: 0;\n  /* 1 */\n  padding: 0;\n  white-space: normal;\n  /* 2 */\n  *margin-left: -7px;\n  /* 3 */\n}\n\n/**\n * 1. Correct font size not being inherited in all browsers.\n * 2. Address margins set differently in IE 6/7, Firefox 3+, Safari 5,\n *    and Chrome.\n * 3. Improve appearance and consistency in all browsers.\n */\nbutton,\ninput,\nselect,\ntextarea {\n  font-size: 100%;\n  /* 1 */\n  margin: 0;\n  /* 2 */\n  vertical-align: baseline;\n  /* 3 */\n  *vertical-align: middle;\n  /* 3 */\n}\n\n/**\n * Address Firefox 3+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\nbutton,\ninput {\n  line-height: normal;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Chrome, Safari 5+, and IE 6+.\n * Correct `select` style inheritance in Firefox 4+ and Opera.\n */\nbutton,\nselect {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n * 4. Remove inner spacing in IE 7 without affecting normal text inputs.\n *    Known issue: inner spacing remains in IE 6.\n */\nbutton,\nhtml input[type=button],\ninput[type=reset],\ninput[type=submit] {\n  -webkit-appearance: button;\n  /* 2 */\n  cursor: pointer;\n  /* 3 */\n  *overflow: visible;\n  /* 4 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\n/**\n * 1. Address box sizing set to content-box in IE 8/9.\n * 2. Remove excess padding in IE 8/9.\n * 3. Remove excess padding in IE 7.\n *    Known issue: excess padding remains in IE 6.\n */\ninput[type=checkbox],\ninput[type=radio] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n  *height: 13px;\n  /* 3 */\n  *width: 13px;\n  /* 3 */\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari 5 and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari 5 and Chrome\n *    (include `-moz` to future-proof).\n */\ninput[type=search] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  /* 2 */\n  box-sizing: content-box;\n}\n\n/**\n * Remove inner padding and search cancel button in Safari 5 and Chrome\n * on OS X.\n */\ninput[type=search]::-webkit-search-cancel-button,\ninput[type=search]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Remove inner padding and border in Firefox 3+.\n */\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * 1. Remove default vertical scrollbar in IE 6/7/8/9.\n * 2. Improve readability and alignment in all browsers.\n */\ntextarea {\n  overflow: auto;\n  /* 1 */\n  vertical-align: top;\n  /* 2 */\n}\n\n/**\n * Remove most spacing between table cells.\n */\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\nhtml,\nbutton,\ninput,\nselect,\ntextarea {\n  color: #222;\n}\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\nimg {\n  vertical-align: middle;\n}\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\ntextarea {\n  resize: vertical;\n}\n\n.chromeframe {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\nhtml {\n  box-sizing: border-box;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n}\n\na {\n  color: inherit;\n}\n\nbody {\n  color: #848e91;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n/**\n * @name   \t\t\tquote\n * @styleguide \t\tFonts / Faces\n * @display \t\tfont\n * @font-family \tPalatino, Times, Georgia, serif\n * @font-style \t\tnormal\n * @font-weight \tnormal\n * @font-display    auto\n */\n/**\n * @name   \t\t\tcode\n * @styleguide \t\tFonts / Faces\n * @display \t\tfont\n * @font-family \tMenlo, Monaco, Consolas, Courier New, monospace\n * @font-style \t\tnormal\n * @font-weight \tnormal\n * @font-display    auto\n */\nhtml {\n  font-size: 14px;\n  color: #848e91;\n}\n\nhtml {\n  font-family: \"Roboto\";\n  font-size: 1rem;\n  font-weight: normal;\n}\n\n.tf h1 {\n  font-family: \"Roboto\";\n  font-size: 3rem;\n  font-weight: 700;\n}\n.tf h2 {\n  font-family: \"Roboto\";\n  font-size: 2rem;\n  font-weight: 700;\n}\n.tf h3 {\n  font-family: \"Roboto\";\n  font-size: 1.5rem;\n  font-weight: 700;\n}\n.tf h4 {\n  font-family: \"Roboto\";\n  font-size: 1rem;\n  font-weight: 700;\n}\n.tf h5 {\n  font-family: \"Roboto\";\n  font-size: 0.6rem;\n  font-weight: 700;\n}\n.tf h6 {\n  font-family: \"Roboto\";\n  font-size: 0.3rem;\n  font-weight: 700;\n}\n.tf p {\n  font-family: \"Roboto\";\n  font-size: 1.5rem;\n  line-height: 2rem;\n  font-weight: 700;\n}\n.tf blockquote {\n  font-family: \"Menlo, Monaco, Consolas, Courier New, monospace\";\n  font-size: 1rem;\n  font-style: normal;\n  font-weight: normal;\n}\n.tf code {\n  font-family: \"Menlo, Monaco, Consolas, Courier New, monospace\";\n  font-size: 1rem;\n  font-style: normal;\n  font-weight: normal;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "../node_modules/fill-range/index.js":
/*!*******************************************!*\
  !*** ../node_modules/fill-range/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */



const util = __webpack_require__(/*! util */ "../node_modules/util/util.js");
const toRegexRange = __webpack_require__(/*! to-regex-range */ "../node_modules/to-regex-range/index.js");

const isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);

const transform = toNumber => {
  return value => toNumber === true ? Number(value) : String(value);
};

const isValidValue = value => {
  return typeof value === 'number' || (typeof value === 'string' && value !== '');
};

const isNumber = num => Number.isInteger(+num);

const zeros = input => {
  let value = `${input}`;
  let index = -1;
  if (value[0] === '-') value = value.slice(1);
  if (value === '0') return false;
  while (value[++index] === '0');
  return index > 0;
};

const stringify = (start, end, options) => {
  if (typeof start === 'string' || typeof end === 'string') {
    return true;
  }
  return options.stringify === true;
};

const pad = (input, maxLength, toNumber) => {
  if (maxLength > 0) {
    let dash = input[0] === '-' ? '-' : '';
    if (dash) input = input.slice(1);
    input = (dash + input.padStart(dash ? maxLength - 1 : maxLength, '0'));
  }
  if (toNumber === false) {
    return String(input);
  }
  return input;
};

const toMaxLen = (input, maxLength) => {
  let negative = input[0] === '-' ? '-' : '';
  if (negative) {
    input = input.slice(1);
    maxLength--;
  }
  while (input.length < maxLength) input = '0' + input;
  return negative ? ('-' + input) : input;
};

const toSequence = (parts, options) => {
  parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);

  let prefix = options.capture ? '' : '?:';
  let positives = '';
  let negatives = '';
  let result;

  if (parts.positives.length) {
    positives = parts.positives.join('|');
  }

  if (parts.negatives.length) {
    negatives = `-(${prefix}${parts.negatives.join('|')})`;
  }

  if (positives && negatives) {
    result = `${positives}|${negatives}`;
  } else {
    result = positives || negatives;
  }

  if (options.wrap) {
    return `(${prefix}${result})`;
  }

  return result;
};

const toRange = (a, b, isNumbers, options) => {
  if (isNumbers) {
    return toRegexRange(a, b, { wrap: false, ...options });
  }

  let start = String.fromCharCode(a);
  if (a === b) return start;

  let stop = String.fromCharCode(b);
  return `[${start}-${stop}]`;
};

const toRegex = (start, end, options) => {
  if (Array.isArray(start)) {
    let wrap = options.wrap === true;
    let prefix = options.capture ? '' : '?:';
    return wrap ? `(${prefix}${start.join('|')})` : start.join('|');
  }
  return toRegexRange(start, end, options);
};

const rangeError = (...args) => {
  return new RangeError('Invalid range arguments: ' + util.inspect(...args));
};

const invalidRange = (start, end, options) => {
  if (options.strictRanges === true) throw rangeError([start, end]);
  return [];
};

const invalidStep = (step, options) => {
  if (options.strictRanges === true) {
    throw new TypeError(`Expected step "${step}" to be a number`);
  }
  return [];
};

const fillNumbers = (start, end, step = 1, options = {}) => {
  let a = Number(start);
  let b = Number(end);

  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    if (options.strictRanges === true) throw rangeError([start, end]);
    return [];
  }

  // fix negative zero
  if (a === 0) a = 0;
  if (b === 0) b = 0;

  let descending = a > b;
  let startString = String(start);
  let endString = String(end);
  let stepString = String(step);
  step = Math.max(Math.abs(step), 1);

  let padded = zeros(startString) || zeros(endString) || zeros(stepString);
  let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
  let toNumber = padded === false && stringify(start, end, options) === false;
  let format = options.transform || transform(toNumber);

  if (options.toRegex && step === 1) {
    return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
  }

  let parts = { negatives: [], positives: [] };
  let push = num => parts[num < 0 ? 'negatives' : 'positives'].push(Math.abs(num));
  let range = [];
  let index = 0;

  while (descending ? a >= b : a <= b) {
    if (options.toRegex === true && step > 1) {
      push(a);
    } else {
      range.push(pad(format(a, index), maxLen, toNumber));
    }
    a = descending ? a - step : a + step;
    index++;
  }

  if (options.toRegex === true) {
    return step > 1
      ? toSequence(parts, options)
      : toRegex(range, null, { wrap: false, ...options });
  }

  return range;
};

const fillLetters = (start, end, step = 1, options = {}) => {
  if ((!isNumber(start) && start.length > 1) || (!isNumber(end) && end.length > 1)) {
    return invalidRange(start, end, options);
  }


  let format = options.transform || (val => String.fromCharCode(val));
  let a = `${start}`.charCodeAt(0);
  let b = `${end}`.charCodeAt(0);

  let descending = a > b;
  let min = Math.min(a, b);
  let max = Math.max(a, b);

  if (options.toRegex && step === 1) {
    return toRange(min, max, false, options);
  }

  let range = [];
  let index = 0;

  while (descending ? a >= b : a <= b) {
    range.push(format(a, index));
    a = descending ? a - step : a + step;
    index++;
  }

  if (options.toRegex === true) {
    return toRegex(range, null, { wrap: false, options });
  }

  return range;
};

const fill = (start, end, step, options = {}) => {
  if (end == null && isValidValue(start)) {
    return [start];
  }

  if (!isValidValue(start) || !isValidValue(end)) {
    return invalidRange(start, end, options);
  }

  if (typeof step === 'function') {
    return fill(start, end, 1, { transform: step });
  }

  if (isObject(step)) {
    return fill(start, end, 0, step);
  }

  let opts = { ...options };
  if (opts.capture === true) opts.wrap = true;
  step = step || opts.step || 1;

  if (!isNumber(step)) {
    if (step != null && !isObject(step)) return invalidStep(step, opts);
    return fill(start, end, 1, step);
  }

  if (isNumber(start) && isNumber(end)) {
    return fillNumbers(start, end, step, opts);
  }

  return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
};

module.exports = fill;


/***/ }),

/***/ "../node_modules/is-class/is-class.js":
/*!********************************************!*\
  !*** ../node_modules/is-class/is-class.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (root) {
  const toString = Function.prototype.toString

  function fnBody (fn) {
    return toString.call(fn).replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '')
  }

  function isClass (fn) {
    if (typeof fn !== 'function') {
      return false
    }

    if (/^class[\s{]/.test(toString.call(fn))) {
      return true
    }

    // babel.js classCallCheck() & inlined
    const body = fnBody(fn)
    return (/classCallCheck\(/.test(body) || /TypeError\("Cannot call a class as a function"\)/.test(body))
  }

  if (true) {
    if ( true && module.exports) {
      exports = module.exports = isClass
    }
    exports.isClass = isClass
  } else {}
})(this);


/***/ }),

/***/ "../node_modules/is-number/index.js":
/*!******************************************!*\
  !*** ../node_modules/is-number/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function(num) {
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};


/***/ }),

/***/ "../node_modules/is-plain-object/index.es.js":
/*!***************************************************!*\
  !*** ../node_modules/is-plain-object/index.es.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

/* harmony default export */ __webpack_exports__["default"] = (isPlainObject);


/***/ }),

/***/ "../node_modules/lit-html/directives/async-append.js":
/*!***********************************************************!*\
  !*** ../node_modules/lit-html/directives/async-append.js ***!
  \***********************************************************/
/*! exports provided: asyncAppend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncAppend", function() { return asyncAppend; });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lit-html.js */ "../node_modules/lit-html/lit-html.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var __asyncValues = (undefined && undefined.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};

/**
 * A directive that renders the items of an async iterable[1], appending new
 * values after previous values, similar to the built-in support for iterables.
 *
 * Async iterables are objects with a [Symbol.asyncIterator] method, which
 * returns an iterator who's `next()` method returns a Promise. When a new
 * value is available, the Promise resolves and the value is appended to the
 * Part controlled by the directive. If another value other than this
 * directive has been set on the Part, the iterable will no longer be listened
 * to and new values won't be written to the Part.
 *
 * [1]: https://github.com/tc39/proposal-async-iteration
 *
 * @param value An async iterable
 * @param mapper An optional function that maps from (value, index) to another
 *     value. Useful for generating templates for each item in the iterable.
 */
const asyncAppend = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["directive"])((value, mapper) => async (part) => {
    var e_1, _a;
    if (!(part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["NodePart"])) {
        throw new Error('asyncAppend can only be used in text bindings');
    }
    // If we've already set up this particular iterable, we don't need
    // to do anything.
    if (value === part.value) {
        return;
    }
    part.value = value;
    // We keep track of item Parts across iterations, so that we can
    // share marker nodes between consecutive Parts.
    let itemPart;
    let i = 0;
    try {
        for (var value_1 = __asyncValues(value), value_1_1; value_1_1 = await value_1.next(), !value_1_1.done;) {
            let v = value_1_1.value;
            // Check to make sure that value is the still the current value of
            // the part, and if not bail because a new value owns this part
            if (part.value !== value) {
                break;
            }
            // When we get the first value, clear the part. This lets the
            // previous value display until we can replace it.
            if (i === 0) {
                part.clear();
            }
            // As a convenience, because functional-programming-style
            // transforms of iterables and async iterables requires a library,
            // we accept a mapper function. This is especially convenient for
            // rendering a template for each item.
            if (mapper !== undefined) {
                // This is safe because T must otherwise be treated as unknown by
                // the rest of the system.
                v = mapper(v, i);
            }
            // Like with sync iterables, each item induces a Part, so we need
            // to keep track of start and end nodes for the Part.
            // Note: Because these Parts are not updatable like with a sync
            // iterable (if we render a new value, we always clear), it may
            // be possible to optimize away the Parts and just re-use the
            // Part.setValue() logic.
            let itemStartNode = part.startNode;
            // Check to see if we have a previous item and Part
            if (itemPart !== undefined) {
                // Create a new node to separate the previous and next Parts
                itemStartNode = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["createMarker"])();
                // itemPart is currently the Part for the previous item. Set
                // it's endNode to the node we'll use for the next Part's
                // startNode.
                itemPart.endNode = itemStartNode;
                part.endNode.parentNode.insertBefore(itemStartNode, part.endNode);
            }
            itemPart = new _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["NodePart"](part.options);
            itemPart.insertAfterNode(itemStartNode);
            itemPart.setValue(v);
            itemPart.commit();
            i++;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (value_1_1 && !value_1_1.done && (_a = value_1.return)) await _a.call(value_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
//# sourceMappingURL=async-append.js.map

/***/ }),

/***/ "../node_modules/lit-html/directives/async-replace.js":
/*!************************************************************!*\
  !*** ../node_modules/lit-html/directives/async-replace.js ***!
  \************************************************************/
/*! exports provided: asyncReplace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncReplace", function() { return asyncReplace; });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lit-html.js */ "../node_modules/lit-html/lit-html.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var __asyncValues = (undefined && undefined.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};

/**
 * A directive that renders the items of an async iterable[1], replacing
 * previous values with new values, so that only one value is ever rendered
 * at a time.
 *
 * Async iterables are objects with a [Symbol.asyncIterator] method, which
 * returns an iterator who's `next()` method returns a Promise. When a new
 * value is available, the Promise resolves and the value is rendered to the
 * Part controlled by the directive. If another value other than this
 * directive has been set on the Part, the iterable will no longer be listened
 * to and new values won't be written to the Part.
 *
 * [1]: https://github.com/tc39/proposal-async-iteration
 *
 * @param value An async iterable
 * @param mapper An optional function that maps from (value, index) to another
 *     value. Useful for generating templates for each item in the iterable.
 */
const asyncReplace = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["directive"])((value, mapper) => async (part) => {
    var e_1, _a;
    if (!(part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["NodePart"])) {
        throw new Error('asyncReplace can only be used in text bindings');
    }
    // If we've already set up this particular iterable, we don't need
    // to do anything.
    if (value === part.value) {
        return;
    }
    // We nest a new part to keep track of previous item values separately
    // of the iterable as a value itself.
    const itemPart = new _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["NodePart"](part.options);
    part.value = value;
    let i = 0;
    try {
        for (var value_1 = __asyncValues(value), value_1_1; value_1_1 = await value_1.next(), !value_1_1.done;) {
            let v = value_1_1.value;
            // Check to make sure that value is the still the current value of
            // the part, and if not bail because a new value owns this part
            if (part.value !== value) {
                break;
            }
            // When we get the first value, clear the part. This let's the
            // previous value display until we can replace it.
            if (i === 0) {
                part.clear();
                itemPart.appendIntoPart(part);
            }
            // As a convenience, because functional-programming-style
            // transforms of iterables and async iterables requires a library,
            // we accept a mapper function. This is especially convenient for
            // rendering a template for each item.
            if (mapper !== undefined) {
                // This is safe because T must otherwise be treated as unknown by
                // the rest of the system.
                v = mapper(v, i);
            }
            itemPart.setValue(v);
            itemPart.commit();
            i++;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (value_1_1 && !value_1_1.done && (_a = value_1.return)) await _a.call(value_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
//# sourceMappingURL=async-replace.js.map

/***/ }),

/***/ "../node_modules/lit-html/directives/cache.js":
/*!****************************************************!*\
  !*** ../node_modules/lit-html/directives/cache.js ***!
  \****************************************************/
/*! exports provided: cache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cache", function() { return cache; });
/* harmony import */ var _lib_template_instance_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/template-instance.js */ "../node_modules/lit-html/lib/template-instance.js");
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lit-html.js */ "../node_modules/lit-html/lit-html.js");
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


const templateCaches = new WeakMap();
/**
 * Enables fast switching between multiple templates by caching the DOM nodes
 * and TemplateInstances produced by the templates.
 *
 * Example:
 *
 * ```
 * let checked = false;
 *
 * html`
 *   ${cache(checked ? html`input is checked` : html`input is not checked`)}
 * `
 * ```
 */
const cache = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_1__["directive"])((value) => (part) => {
    if (!(part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_1__["NodePart"])) {
        throw new Error('cache can only be used in text bindings');
    }
    let templateCache = templateCaches.get(part);
    if (templateCache === undefined) {
        templateCache = new WeakMap();
        templateCaches.set(part, templateCache);
    }
    const previousValue = part.value;
    // First, can we update the current TemplateInstance, or do we need to move
    // the current nodes into the cache?
    if (previousValue instanceof _lib_template_instance_js__WEBPACK_IMPORTED_MODULE_0__["TemplateInstance"]) {
        if (value instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_1__["TemplateResult"] &&
            previousValue.template === part.options.templateFactory(value)) {
            // Same Template, just trigger an update of the TemplateInstance
            part.setValue(value);
            return;
        }
        else {
            // Not the same Template, move the nodes from the DOM into the cache.
            let cachedTemplate = templateCache.get(previousValue.template);
            if (cachedTemplate === undefined) {
                cachedTemplate = {
                    instance: previousValue,
                    nodes: document.createDocumentFragment(),
                };
                templateCache.set(previousValue.template, cachedTemplate);
            }
            Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_1__["reparentNodes"])(cachedTemplate.nodes, part.startNode.nextSibling, part.endNode);
        }
    }
    // Next, can we reuse nodes from the cache?
    if (value instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_1__["TemplateResult"]) {
        const template = part.options.templateFactory(value);
        const cachedTemplate = templateCache.get(template);
        if (cachedTemplate !== undefined) {
            // Move nodes out of cache
            part.setValue(cachedTemplate.nodes);
            part.commit();
            // Set the Part value to the TemplateInstance so it'll update it.
            part.value = cachedTemplate.instance;
        }
    }
    part.setValue(value);
});
//# sourceMappingURL=cache.js.map

/***/ }),

/***/ "../node_modules/lit-html/directives/class-map.js":
/*!********************************************************!*\
  !*** ../node_modules/lit-html/directives/class-map.js ***!
  \********************************************************/
/*! exports provided: classMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classMap", function() { return classMap; });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lit-html.js */ "../node_modules/lit-html/lit-html.js");
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

// IE11 doesn't support classList on SVG elements, so we emulate it with a Set
class ClassList {
    constructor(element) {
        this.classes = new Set();
        this.changed = false;
        this.element = element;
        const classList = (element.getAttribute('class') || '').split(/\s+/);
        for (const cls of classList) {
            this.classes.add(cls);
        }
    }
    add(cls) {
        this.classes.add(cls);
        this.changed = true;
    }
    remove(cls) {
        this.classes.delete(cls);
        this.changed = true;
    }
    commit() {
        if (this.changed) {
            let classString = '';
            this.classes.forEach((cls) => classString += cls + ' ');
            this.element.setAttribute('class', classString);
        }
    }
}
/**
 * Stores the ClassInfo object applied to a given AttributePart.
 * Used to unset existing values when a new ClassInfo object is applied.
 */
const previousClassesCache = new WeakMap();
/**
 * A directive that applies CSS classes. This must be used in the `class`
 * attribute and must be the only part used in the attribute. It takes each
 * property in the `classInfo` argument and adds the property name to the
 * element's `class` if the property value is truthy; if the property value is
 * falsey, the property name is removed from the element's `class`. For example
 * `{foo: bar}` applies the class `foo` if the value of `bar` is truthy.
 * @param classInfo {ClassInfo}
 */
const classMap = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["directive"])((classInfo) => (part) => {
    if (!(part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["AttributePart"]) || (part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["PropertyPart"]) ||
        part.committer.name !== 'class' || part.committer.parts.length > 1) {
        throw new Error('The `classMap` directive must be used in the `class` attribute ' +
            'and must be the only part in the attribute.');
    }
    const { committer } = part;
    const { element } = committer;
    let previousClasses = previousClassesCache.get(part);
    if (previousClasses === undefined) {
        // Write static classes once
        // Use setAttribute() because className isn't a string on SVG elements
        element.setAttribute('class', committer.strings.join(' '));
        previousClassesCache.set(part, previousClasses = new Set());
    }
    const classList = (element.classList || new ClassList(element));
    // Remove old classes that no longer apply
    // We use forEach() instead of for-of so that re don't require down-level
    // iteration.
    previousClasses.forEach((name) => {
        if (!(name in classInfo)) {
            classList.remove(name);
            previousClasses.delete(name);
        }
    });
    // Add or remove classes based on their classMap value
    for (const name in classInfo) {
        const value = classInfo[name];
        if (value != previousClasses.has(name)) {
            // We explicitly want a loose truthy check of `value` because it seems
            // more convenient that '' and 0 are skipped.
            if (value) {
                classList.add(name);
                previousClasses.add(name);
            }
            else {
                classList.remove(name);
                previousClasses.delete(name);
            }
        }
    }
    if (typeof classList.commit === 'function') {
        classList.commit();
    }
});
//# sourceMappingURL=class-map.js.map

/***/ }),

/***/ "../node_modules/lit-html/directives/guard.js":
/*!****************************************************!*\
  !*** ../node_modules/lit-html/directives/guard.js ***!
  \****************************************************/
/*! exports provided: guard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "guard", function() { return guard; });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lit-html.js */ "../node_modules/lit-html/lit-html.js");
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

const previousValues = new WeakMap();
/**
 * Prevents re-render of a template function until a single value or an array of
 * values changes.
 *
 * Example:
 *
 * ```js
 * html`
 *   <div>
 *     ${guard([user.id, company.id], () => html`...`)}
 *   </div>
 * ```
 *
 * In this case, the template only renders if either `user.id` or `company.id`
 * changes.
 *
 * guard() is useful with immutable data patterns, by preventing expensive work
 * until data updates.
 *
 * Example:
 *
 * ```js
 * html`
 *   <div>
 *     ${guard([immutableItems], () => immutableItems.map(i => html`${i}`))}
 *   </div>
 * ```
 *
 * In this case, items are mapped over only when the array reference changes.
 *
 * @param value the value to check before re-rendering
 * @param f the template function
 */
const guard = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["directive"])((value, f) => (part) => {
    const previousValue = previousValues.get(part);
    if (Array.isArray(value)) {
        // Dirty-check arrays by item
        if (Array.isArray(previousValue) &&
            previousValue.length === value.length &&
            value.every((v, i) => v === previousValue[i])) {
            return;
        }
    }
    else if (previousValue === value &&
        (value !== undefined || previousValues.has(part))) {
        // Dirty-check non-arrays by identity
        return;
    }
    part.setValue(f());
    // Copy the value if it's an array so that if it's mutated we don't forget
    // what the previous values were.
    previousValues.set(part, Array.isArray(value) ? Array.from(value) : value);
});
//# sourceMappingURL=guard.js.map

/***/ }),

/***/ "../node_modules/lit-html/directives/if-defined.js":
/*!*********************************************************!*\
  !*** ../node_modules/lit-html/directives/if-defined.js ***!
  \*********************************************************/
/*! exports provided: ifDefined */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ifDefined", function() { return ifDefined; });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lit-html.js */ "../node_modules/lit-html/lit-html.js");
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

const previousValues = new WeakMap();
/**
 * For AttributeParts, sets the attribute if the value is defined and removes
 * the attribute if the value is undefined.
 *
 * For other part types, this directive is a no-op.
 */
const ifDefined = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["directive"])((value) => (part) => {
    const previousValue = previousValues.get(part);
    if (value === undefined && part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["AttributePart"]) {
        // If the value is undefined, remove the attribute, but only if the value
        // was previously defined.
        if (previousValue !== undefined || !previousValues.has(part)) {
            const name = part.committer.name;
            part.committer.element.removeAttribute(name);
        }
    }
    else if (value !== previousValue) {
        part.setValue(value);
    }
    previousValues.set(part, value);
});
//# sourceMappingURL=if-defined.js.map

/***/ }),

/***/ "../node_modules/lit-html/directives/repeat.js":
/*!*****************************************************!*\
  !*** ../node_modules/lit-html/directives/repeat.js ***!
  \*****************************************************/
/*! exports provided: repeat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "repeat", function() { return repeat; });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lit-html.js */ "../node_modules/lit-html/lit-html.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

// Helper functions for manipulating parts
// TODO(kschaaf): Refactor into Part API?
const createAndInsertPart = (containerPart, beforePart) => {
    const container = containerPart.startNode.parentNode;
    const beforeNode = beforePart === undefined ? containerPart.endNode :
        beforePart.startNode;
    const startNode = container.insertBefore(Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["createMarker"])(), beforeNode);
    container.insertBefore(Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["createMarker"])(), beforeNode);
    const newPart = new _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["NodePart"](containerPart.options);
    newPart.insertAfterNode(startNode);
    return newPart;
};
const updatePart = (part, value) => {
    part.setValue(value);
    part.commit();
    return part;
};
const insertPartBefore = (containerPart, part, ref) => {
    const container = containerPart.startNode.parentNode;
    const beforeNode = ref ? ref.startNode : containerPart.endNode;
    const endNode = part.endNode.nextSibling;
    if (endNode !== beforeNode) {
        Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["reparentNodes"])(container, part.startNode, endNode, beforeNode);
    }
};
const removePart = (part) => {
    Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["removeNodes"])(part.startNode.parentNode, part.startNode, part.endNode.nextSibling);
};
// Helper for generating a map of array item to its index over a subset
// of an array (used to lazily generate `newKeyToIndexMap` and
// `oldKeyToIndexMap`)
const generateMap = (list, start, end) => {
    const map = new Map();
    for (let i = start; i <= end; i++) {
        map.set(list[i], i);
    }
    return map;
};
// Stores previous ordered list of parts and map of key to index
const partListCache = new WeakMap();
const keyListCache = new WeakMap();
/**
 * A directive that repeats a series of values (usually `TemplateResults`)
 * generated from an iterable, and updates those items efficiently when the
 * iterable changes based on user-provided `keys` associated with each item.
 *
 * Note that if a `keyFn` is provided, strict key-to-DOM mapping is maintained,
 * meaning previous DOM for a given key is moved into the new position if
 * needed, and DOM will never be reused with values for different keys (new DOM
 * will always be created for new keys). This is generally the most efficient
 * way to use `repeat` since it performs minimum unnecessary work for insertions
 * and removals.
 *
 * IMPORTANT: If providing a `keyFn`, keys *must* be unique for all items in a
 * given call to `repeat`. The behavior when two or more items have the same key
 * is undefined.
 *
 * If no `keyFn` is provided, this directive will perform similar to mapping
 * items to values, and DOM will be reused against potentially different items.
 */
const repeat = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["directive"])((items, keyFnOrTemplate, template) => {
    let keyFn;
    if (template === undefined) {
        template = keyFnOrTemplate;
    }
    else if (keyFnOrTemplate !== undefined) {
        keyFn = keyFnOrTemplate;
    }
    return (containerPart) => {
        if (!(containerPart instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["NodePart"])) {
            throw new Error('repeat can only be used in text bindings');
        }
        // Old part & key lists are retrieved from the last update
        // (associated with the part for this instance of the directive)
        const oldParts = partListCache.get(containerPart) || [];
        const oldKeys = keyListCache.get(containerPart) || [];
        // New part list will be built up as we go (either reused from
        // old parts or created for new keys in this update). This is
        // saved in the above cache at the end of the update.
        const newParts = [];
        // New value list is eagerly generated from items along with a
        // parallel array indicating its key.
        const newValues = [];
        const newKeys = [];
        let index = 0;
        for (const item of items) {
            newKeys[index] = keyFn ? keyFn(item, index) : index;
            newValues[index] = template(item, index);
            index++;
        }
        // Maps from key to index for current and previous update; these
        // are generated lazily only when needed as a performance
        // optimization, since they are only required for multiple
        // non-contiguous changes in the list, which are less common.
        let newKeyToIndexMap;
        let oldKeyToIndexMap;
        // Head and tail pointers to old parts and new values
        let oldHead = 0;
        let oldTail = oldParts.length - 1;
        let newHead = 0;
        let newTail = newValues.length - 1;
        // Overview of O(n) reconciliation algorithm (general approach
        // based on ideas found in ivi, vue, snabbdom, etc.):
        //
        // * We start with the list of old parts and new values (and
        //   arrays of their respective keys), head/tail pointers into
        //   each, and we build up the new list of parts by updating
        //   (and when needed, moving) old parts or creating new ones.
        //   The initial scenario might look like this (for brevity of
        //   the diagrams, the numbers in the array reflect keys
        //   associated with the old parts or new values, although keys
        //   and parts/values are actually stored in parallel arrays
        //   indexed using the same head/tail pointers):
        //
        //      oldHead v                 v oldTail
        //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
        //   newParts: [ ,  ,  ,  ,  ,  ,  ]
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6] <- reflects the user's new
        //                                      item order
        //      newHead ^                 ^ newTail
        //
        // * Iterate old & new lists from both sides, updating,
        //   swapping, or removing parts at the head/tail locations
        //   until neither head nor tail can move.
        //
        // * Example below: keys at head pointers match, so update old
        //   part 0 in-place (no need to move it) and record part 0 in
        //   the `newParts` list. The last thing we do is advance the
        //   `oldHead` and `newHead` pointers (will be reflected in the
        //   next diagram).
        //
        //      oldHead v                 v oldTail
        //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
        //   newParts: [0,  ,  ,  ,  ,  ,  ] <- heads matched: update 0
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance both oldHead
        //                                      & newHead
        //      newHead ^                 ^ newTail
        //
        // * Example below: head pointers don't match, but tail
        //   pointers do, so update part 6 in place (no need to move
        //   it), and record part 6 in the `newParts` list. Last,
        //   advance the `oldTail` and `oldHead` pointers.
        //
        //         oldHead v              v oldTail
        //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
        //   newParts: [0,  ,  ,  ,  ,  , 6] <- tails matched: update 6
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance both oldTail
        //                                      & newTail
        //         newHead ^              ^ newTail
        //
        // * If neither head nor tail match; next check if one of the
        //   old head/tail items was removed. We first need to generate
        //   the reverse map of new keys to index (`newKeyToIndexMap`),
        //   which is done once lazily as a performance optimization,
        //   since we only hit this case if multiple non-contiguous
        //   changes were made. Note that for contiguous removal
        //   anywhere in the list, the head and tails would advance
        //   from either end and pass each other before we get to this
        //   case and removals would be handled in the final while loop
        //   without needing to generate the map.
        //
        // * Example below: The key at `oldTail` was removed (no longer
        //   in the `newKeyToIndexMap`), so remove that part from the
        //   DOM and advance just the `oldTail` pointer.
        //
        //         oldHead v           v oldTail
        //   oldKeys:  [0, 1, 2, 3, 4, 5, 6]
        //   newParts: [0,  ,  ,  ,  ,  , 6] <- 5 not in new map: remove
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    5 and advance oldTail
        //         newHead ^           ^ newTail
        //
        // * Once head and tail cannot move, any mismatches are due to
        //   either new or moved items; if a new key is in the previous
        //   "old key to old index" map, move the old part to the new
        //   location, otherwise create and insert a new part. Note
        //   that when moving an old part we null its position in the
        //   oldParts array if it lies between the head and tail so we
        //   know to skip it when the pointers get there.
        //
        // * Example below: neither head nor tail match, and neither
        //   were removed; so find the `newHead` key in the
        //   `oldKeyToIndexMap`, and move that old part's DOM into the
        //   next head position (before `oldParts[oldHead]`). Last,
        //   null the part in the `oldPart` array since it was
        //   somewhere in the remaining oldParts still to be scanned
        //   (between the head and tail pointers) so that we know to
        //   skip that old part on future iterations.
        //
        //         oldHead v        v oldTail
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
        //   newParts: [0, 2,  ,  ,  ,  , 6] <- stuck: update & move 2
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    into place and advance
        //                                      newHead
        //         newHead ^           ^ newTail
        //
        // * Note that for moves/insertions like the one above, a part
        //   inserted at the head pointer is inserted before the
        //   current `oldParts[oldHead]`, and a part inserted at the
        //   tail pointer is inserted before `newParts[newTail+1]`. The
        //   seeming asymmetry lies in the fact that new parts are
        //   moved into place outside in, so to the right of the head
        //   pointer are old parts, and to the right of the tail
        //   pointer are new parts.
        //
        // * We always restart back from the top of the algorithm,
        //   allowing matching and simple updates in place to
        //   continue...
        //
        // * Example below: the head pointers once again match, so
        //   simply update part 1 and record it in the `newParts`
        //   array.  Last, advance both head pointers.
        //
        //         oldHead v        v oldTail
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
        //   newParts: [0, 2, 1,  ,  ,  , 6] <- heads matched: update 1
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance both oldHead
        //                                      & newHead
        //            newHead ^        ^ newTail
        //
        // * As mentioned above, items that were moved as a result of
        //   being stuck (the final else clause in the code below) are
        //   marked with null, so we always advance old pointers over
        //   these so we're comparing the next actual old value on
        //   either end.
        //
        // * Example below: `oldHead` is null (already placed in
        //   newParts), so advance `oldHead`.
        //
        //            oldHead v     v oldTail
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6] <- old head already used:
        //   newParts: [0, 2, 1,  ,  ,  , 6]    advance oldHead
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]
        //               newHead ^     ^ newTail
        //
        // * Note it's not critical to mark old parts as null when they
        //   are moved from head to tail or tail to head, since they
        //   will be outside the pointer range and never visited again.
        //
        // * Example below: Here the old tail key matches the new head
        //   key, so the part at the `oldTail` position and move its
        //   DOM to the new head position (before `oldParts[oldHead]`).
        //   Last, advance `oldTail` and `newHead` pointers.
        //
        //               oldHead v  v oldTail
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
        //   newParts: [0, 2, 1, 4,  ,  , 6] <- old tail matches new
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]   head: update & move 4,
        //                                     advance oldTail & newHead
        //               newHead ^     ^ newTail
        //
        // * Example below: Old and new head keys match, so update the
        //   old head part in place, and advance the `oldHead` and
        //   `newHead` pointers.
        //
        //               oldHead v oldTail
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
        //   newParts: [0, 2, 1, 4, 3,   ,6] <- heads match: update 3
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]    and advance oldHead &
        //                                      newHead
        //                  newHead ^  ^ newTail
        //
        // * Once the new or old pointers move past each other then all
        //   we have left is additions (if old list exhausted) or
        //   removals (if new list exhausted). Those are handled in the
        //   final while loops at the end.
        //
        // * Example below: `oldHead` exceeded `oldTail`, so we're done
        //   with the main loop.  Create the remaining part and insert
        //   it at the new head position, and the update is complete.
        //
        //                   (oldHead > oldTail)
        //   oldKeys:  [0, 1, -, 3, 4, 5, 6]
        //   newParts: [0, 2, 1, 4, 3, 7 ,6] <- create and insert 7
        //   newKeys:  [0, 2, 1, 4, 3, 7, 6]
        //                     newHead ^ newTail
        //
        // * Note that the order of the if/else clauses is not
        //   important to the algorithm, as long as the null checks
        //   come first (to ensure we're always working on valid old
        //   parts) and that the final else clause comes last (since
        //   that's where the expensive moves occur). The order of
        //   remaining clauses is is just a simple guess at which cases
        //   will be most common.
        //
        // * TODO(kschaaf) Note, we could calculate the longest
        //   increasing subsequence (LIS) of old items in new position,
        //   and only move those not in the LIS set. However that costs
        //   O(nlogn) time and adds a bit more code, and only helps
        //   make rare types of mutations require fewer moves. The
        //   above handles removes, adds, reversal, swaps, and single
        //   moves of contiguous items in linear time, in the minimum
        //   number of moves. As the number of multiple moves where LIS
        //   might help approaches a random shuffle, the LIS
        //   optimization becomes less helpful, so it seems not worth
        //   the code at this point. Could reconsider if a compelling
        //   case arises.
        while (oldHead <= oldTail && newHead <= newTail) {
            if (oldParts[oldHead] === null) {
                // `null` means old part at head has already been used
                // below; skip
                oldHead++;
            }
            else if (oldParts[oldTail] === null) {
                // `null` means old part at tail has already been used
                // below; skip
                oldTail--;
            }
            else if (oldKeys[oldHead] === newKeys[newHead]) {
                // Old head matches new head; update in place
                newParts[newHead] =
                    updatePart(oldParts[oldHead], newValues[newHead]);
                oldHead++;
                newHead++;
            }
            else if (oldKeys[oldTail] === newKeys[newTail]) {
                // Old tail matches new tail; update in place
                newParts[newTail] =
                    updatePart(oldParts[oldTail], newValues[newTail]);
                oldTail--;
                newTail--;
            }
            else if (oldKeys[oldHead] === newKeys[newTail]) {
                // Old head matches new tail; update and move to new tail
                newParts[newTail] =
                    updatePart(oldParts[oldHead], newValues[newTail]);
                insertPartBefore(containerPart, oldParts[oldHead], newParts[newTail + 1]);
                oldHead++;
                newTail--;
            }
            else if (oldKeys[oldTail] === newKeys[newHead]) {
                // Old tail matches new head; update and move to new head
                newParts[newHead] =
                    updatePart(oldParts[oldTail], newValues[newHead]);
                insertPartBefore(containerPart, oldParts[oldTail], oldParts[oldHead]);
                oldTail--;
                newHead++;
            }
            else {
                if (newKeyToIndexMap === undefined) {
                    // Lazily generate key-to-index maps, used for removals &
                    // moves below
                    newKeyToIndexMap = generateMap(newKeys, newHead, newTail);
                    oldKeyToIndexMap = generateMap(oldKeys, oldHead, oldTail);
                }
                if (!newKeyToIndexMap.has(oldKeys[oldHead])) {
                    // Old head is no longer in new list; remove
                    removePart(oldParts[oldHead]);
                    oldHead++;
                }
                else if (!newKeyToIndexMap.has(oldKeys[oldTail])) {
                    // Old tail is no longer in new list; remove
                    removePart(oldParts[oldTail]);
                    oldTail--;
                }
                else {
                    // Any mismatches at this point are due to additions or
                    // moves; see if we have an old part we can reuse and move
                    // into place
                    const oldIndex = oldKeyToIndexMap.get(newKeys[newHead]);
                    const oldPart = oldIndex !== undefined ? oldParts[oldIndex] : null;
                    if (oldPart === null) {
                        // No old part for this value; create a new one and
                        // insert it
                        const newPart = createAndInsertPart(containerPart, oldParts[oldHead]);
                        updatePart(newPart, newValues[newHead]);
                        newParts[newHead] = newPart;
                    }
                    else {
                        // Reuse old part
                        newParts[newHead] =
                            updatePart(oldPart, newValues[newHead]);
                        insertPartBefore(containerPart, oldPart, oldParts[oldHead]);
                        // This marks the old part as having been used, so that
                        // it will be skipped in the first two checks above
                        oldParts[oldIndex] = null;
                    }
                    newHead++;
                }
            }
        }
        // Add parts for any remaining new values
        while (newHead <= newTail) {
            // For all remaining additions, we insert before last new
            // tail, since old pointers are no longer valid
            const newPart = createAndInsertPart(containerPart, newParts[newTail + 1]);
            updatePart(newPart, newValues[newHead]);
            newParts[newHead++] = newPart;
        }
        // Remove any remaining unused old parts
        while (oldHead <= oldTail) {
            const oldPart = oldParts[oldHead++];
            if (oldPart !== null) {
                removePart(oldPart);
            }
        }
        // Save order of new parts for next round
        partListCache.set(containerPart, newParts);
        keyListCache.set(containerPart, newKeys);
    };
});
//# sourceMappingURL=repeat.js.map

/***/ }),

/***/ "../node_modules/lit-html/directives/style-map.js":
/*!********************************************************!*\
  !*** ../node_modules/lit-html/directives/style-map.js ***!
  \********************************************************/
/*! exports provided: styleMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styleMap", function() { return styleMap; });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lit-html.js */ "../node_modules/lit-html/lit-html.js");
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Stores the StyleInfo object applied to a given AttributePart.
 * Used to unset existing values when a new StyleInfo object is applied.
 */
const previousStylePropertyCache = new WeakMap();
/**
 * A directive that applies CSS properties to an element.
 *
 * `styleMap` can only be used in the `style` attribute and must be the only
 * expression in the attribute. It takes the property names in the `styleInfo`
 * object and adds the property values as CSS properties. Property names with
 * dashes (`-`) are assumed to be valid CSS property names and set on the
 * element's style object using `setProperty()`. Names without dashes are
 * assumed to be camelCased JavaScript property names and set on the element's
 * style object using property assignment, allowing the style object to
 * translate JavaScript-style names to CSS property names.
 *
 * For example `styleMap({backgroundColor: 'red', 'border-top': '5px', '--size':
 * '0'})` sets the `background-color`, `border-top` and `--size` properties.
 *
 * @param styleInfo {StyleInfo}
 */
const styleMap = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["directive"])((styleInfo) => (part) => {
    if (!(part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["AttributePart"]) || (part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["PropertyPart"]) ||
        part.committer.name !== 'style' || part.committer.parts.length > 1) {
        throw new Error('The `styleMap` directive must be used in the style attribute ' +
            'and must be the only part in the attribute.');
    }
    const { committer } = part;
    const { style } = committer.element;
    let previousStyleProperties = previousStylePropertyCache.get(part);
    if (previousStyleProperties === undefined) {
        // Write static styles once
        style.cssText = committer.strings.join(' ');
        previousStylePropertyCache.set(part, previousStyleProperties = new Set());
    }
    // Remove old properties that no longer exist in styleInfo
    // We use forEach() instead of for-of so that re don't require down-level
    // iteration.
    previousStyleProperties.forEach((name) => {
        if (!(name in styleInfo)) {
            previousStyleProperties.delete(name);
            if (name.indexOf('-') === -1) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                style[name] = null;
            }
            else {
                style.removeProperty(name);
            }
        }
    });
    // Add or update properties
    for (const name in styleInfo) {
        previousStyleProperties.add(name);
        if (name.indexOf('-') === -1) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style[name] = styleInfo[name];
        }
        else {
            style.setProperty(name, styleInfo[name]);
        }
    }
});
//# sourceMappingURL=style-map.js.map

/***/ }),

/***/ "../node_modules/lit-html/directives/template-content.js":
/*!***************************************************************!*\
  !*** ../node_modules/lit-html/directives/template-content.js ***!
  \***************************************************************/
/*! exports provided: templateContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateContent", function() { return templateContent; });
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lit-html.js */ "../node_modules/lit-html/lit-html.js");
/**
 * @license
 * Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

// For each part, remember the value that was last rendered to the part by the
// templateContent directive, and the DocumentFragment that was last set as a
// value. The DocumentFragment is used as a unique key to check if the last
// value rendered to the part was with templateContent. If not, we'll always
// re-render the value passed to templateContent.
const previousValues = new WeakMap();
/**
 * Renders the content of a template element as HTML.
 *
 * Note, the template should be developer controlled and not user controlled.
 * Rendering a user-controlled template with this directive
 * could lead to cross-site-scripting vulnerabilities.
 */
const templateContent = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_0__["directive"])((template) => (part) => {
    if (!(part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_0__["NodePart"])) {
        throw new Error('templateContent can only be used in text bindings');
    }
    const previousValue = previousValues.get(part);
    if (previousValue !== undefined && template === previousValue.template &&
        part.value === previousValue.fragment) {
        return;
    }
    const fragment = document.importNode(template.content, true);
    part.setValue(fragment);
    previousValues.set(part, { template, fragment });
});
//# sourceMappingURL=template-content.js.map

/***/ }),

/***/ "../node_modules/lit-html/directives/unsafe-html.js":
/*!**********************************************************!*\
  !*** ../node_modules/lit-html/directives/unsafe-html.js ***!
  \**********************************************************/
/*! exports provided: unsafeHTML */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsafeHTML", function() { return unsafeHTML; });
/* harmony import */ var _lib_parts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/parts.js */ "../node_modules/lit-html/lib/parts.js");
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lit-html.js */ "../node_modules/lit-html/lit-html.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


// For each part, remember the value that was last rendered to the part by the
// unsafeHTML directive, and the DocumentFragment that was last set as a value.
// The DocumentFragment is used as a unique key to check if the last value
// rendered to the part was with unsafeHTML. If not, we'll always re-render the
// value passed to unsafeHTML.
const previousValues = new WeakMap();
/**
 * Renders the result as HTML, rather than text.
 *
 * Note, this is unsafe to use with any user-provided input that hasn't been
 * sanitized or escaped, as it may lead to cross-site-scripting
 * vulnerabilities.
 */
const unsafeHTML = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_1__["directive"])((value) => (part) => {
    if (!(part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_1__["NodePart"])) {
        throw new Error('unsafeHTML can only be used in text bindings');
    }
    const previousValue = previousValues.get(part);
    if (previousValue !== undefined && Object(_lib_parts_js__WEBPACK_IMPORTED_MODULE_0__["isPrimitive"])(value) &&
        value === previousValue.value && part.value === previousValue.fragment) {
        return;
    }
    const template = document.createElement('template');
    template.innerHTML = value; // innerHTML casts to string internally
    const fragment = document.importNode(template.content, true);
    part.setValue(fragment);
    previousValues.set(part, { value, fragment });
});
//# sourceMappingURL=unsafe-html.js.map

/***/ }),

/***/ "../node_modules/lit-html/directives/unsafe-svg.js":
/*!*********************************************************!*\
  !*** ../node_modules/lit-html/directives/unsafe-svg.js ***!
  \*********************************************************/
/*! exports provided: unsafeSVG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsafeSVG", function() { return unsafeSVG; });
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/dom.js */ "../node_modules/lit-html/lib/dom.js");
/* harmony import */ var _lib_parts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/parts.js */ "../node_modules/lit-html/lib/parts.js");
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lit-html.js */ "../node_modules/lit-html/lit-html.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */



// For each part, remember the value that was last rendered to the part by the
// unsafeSVG directive, and the DocumentFragment that was last set as a value.
// The DocumentFragment is used as a unique key to check if the last value
// rendered to the part was with unsafeSVG. If not, we'll always re-render the
// value passed to unsafeSVG.
const previousValues = new WeakMap();
/**
 * Renders the result as SVG, rather than text.
 *
 * Note, this is unsafe to use with any user-provided input that hasn't been
 * sanitized or escaped, as it may lead to cross-site-scripting
 * vulnerabilities.
 */
const unsafeSVG = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_2__["directive"])((value) => (part) => {
    if (!(part instanceof _lit_html_js__WEBPACK_IMPORTED_MODULE_2__["NodePart"])) {
        throw new Error('unsafeSVG can only be used in text bindings');
    }
    const previousValue = previousValues.get(part);
    if (previousValue !== undefined && Object(_lib_parts_js__WEBPACK_IMPORTED_MODULE_1__["isPrimitive"])(value) &&
        value === previousValue.value && part.value === previousValue.fragment) {
        return;
    }
    const template = document.createElement('template');
    template.innerHTML = `<svg>${value}</svg>`;
    const content = template.content;
    const svgElement = content.firstChild;
    content.removeChild(svgElement);
    Object(_lib_dom_js__WEBPACK_IMPORTED_MODULE_0__["reparentNodes"])(content, svgElement.firstChild);
    const fragment = document.importNode(content, true);
    part.setValue(fragment);
    previousValues.set(part, { value, fragment });
});
//# sourceMappingURL=unsafe-svg.js.map

/***/ }),

/***/ "../node_modules/lit-html/directives/until.js":
/*!****************************************************!*\
  !*** ../node_modules/lit-html/directives/until.js ***!
  \****************************************************/
/*! exports provided: until */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "until", function() { return until; });
/* harmony import */ var _lib_parts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/parts.js */ "../node_modules/lit-html/lib/parts.js");
/* harmony import */ var _lit_html_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lit-html.js */ "../node_modules/lit-html/lit-html.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


const _state = new WeakMap();
// Effectively infinity, but a SMI.
const _infinity = 0x7fffffff;
/**
 * Renders one of a series of values, including Promises, to a Part.
 *
 * Values are rendered in priority order, with the first argument having the
 * highest priority and the last argument having the lowest priority. If a
 * value is a Promise, low-priority values will be rendered until it resolves.
 *
 * The priority of values can be used to create placeholder content for async
 * data. For example, a Promise with pending content can be the first,
 * highest-priority, argument, and a non_promise loading indicator template can
 * be used as the second, lower-priority, argument. The loading indicator will
 * render immediately, and the primary content will render when the Promise
 * resolves.
 *
 * Example:
 *
 *     const content = fetch('./content.txt').then(r => r.text());
 *     html`${until(content, html`<span>Loading...</span>`)}`
 */
const until = Object(_lit_html_js__WEBPACK_IMPORTED_MODULE_1__["directive"])((...args) => (part) => {
    let state = _state.get(part);
    if (state === undefined) {
        state = {
            lastRenderedIndex: _infinity,
            values: [],
        };
        _state.set(part, state);
    }
    const previousValues = state.values;
    let previousLength = previousValues.length;
    state.values = args;
    for (let i = 0; i < args.length; i++) {
        // If we've rendered a higher-priority value already, stop.
        if (i > state.lastRenderedIndex) {
            break;
        }
        const value = args[i];
        // Render non-Promise values immediately
        if (Object(_lib_parts_js__WEBPACK_IMPORTED_MODULE_0__["isPrimitive"])(value) ||
            typeof value.then !== 'function') {
            part.setValue(value);
            state.lastRenderedIndex = i;
            // Since a lower-priority value will never overwrite a higher-priority
            // synchronous value, we can stop processing now.
            break;
        }
        // If this is a Promise we've already handled, skip it.
        if (i < previousLength && value === previousValues[i]) {
            continue;
        }
        // We have a Promise that we haven't seen before, so priorities may have
        // changed. Forget what we rendered before.
        state.lastRenderedIndex = _infinity;
        previousLength = 0;
        Promise.resolve(value).then((resolvedValue) => {
            const index = state.values.indexOf(value);
            // If state.values doesn't contain the value, we've re-rendered without
            // the value, so don't render it. Then, only render if the value is
            // higher-priority than what's already been rendered.
            if (index > -1 && index < state.lastRenderedIndex) {
                state.lastRenderedIndex = index;
                part.setValue(resolvedValue);
                part.commit();
            }
        });
    }
});
//# sourceMappingURL=until.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/default-template-processor.js":
/*!******************************************************************!*\
  !*** ../node_modules/lit-html/lib/default-template-processor.js ***!
  \******************************************************************/
/*! exports provided: DefaultTemplateProcessor, defaultTemplateProcessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultTemplateProcessor", function() { return DefaultTemplateProcessor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultTemplateProcessor", function() { return defaultTemplateProcessor; });
/* harmony import */ var _parts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parts.js */ "../node_modules/lit-html/lib/parts.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const committer = new _parts_js__WEBPACK_IMPORTED_MODULE_0__["PropertyCommitter"](element, name.slice(1), strings);
            return committer.parts;
        }
        if (prefix === '@') {
            return [new _parts_js__WEBPACK_IMPORTED_MODULE_0__["EventPart"](element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new _parts_js__WEBPACK_IMPORTED_MODULE_0__["BooleanAttributePart"](element, name.slice(1), strings)];
        }
        const committer = new _parts_js__WEBPACK_IMPORTED_MODULE_0__["AttributeCommitter"](element, name, strings);
        return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new _parts_js__WEBPACK_IMPORTED_MODULE_0__["NodePart"](options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();
//# sourceMappingURL=default-template-processor.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/directive.js":
/*!*************************************************!*\
  !*** ../node_modules/lit-html/lib/directive.js ***!
  \*************************************************/
/*! exports provided: directive, isDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "directive", function() { return directive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDirective", function() { return isDirective; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
/**
 * Brands a function as a directive factory function so that lit-html will call
 * the function during template rendering, rather than passing as a value.
 *
 * A _directive_ is a function that takes a Part as an argument. It has the
 * signature: `(part: Part) => void`.
 *
 * A directive _factory_ is a function that takes arguments for data and
 * configuration and returns a directive. Users of directive usually refer to
 * the directive factory as the directive. For example, "The repeat directive".
 *
 * Usually a template author will invoke a directive factory in their template
 * with relevant arguments, which will then return a directive function.
 *
 * Here's an example of using the `repeat()` directive factory that takes an
 * array and a function to render an item:
 *
 * ```js
 * html`<ul><${repeat(items, (item) => html`<li>${item}</li>`)}</ul>`
 * ```
 *
 * When `repeat` is invoked, it returns a directive function that closes over
 * `items` and the template function. When the outer template is rendered, the
 * return directive function is called with the Part for the expression.
 * `repeat` then performs it's custom logic to render multiple items.
 *
 * @param f The directive factory function. Must be a function that returns a
 * function of the signature `(part: Part) => void`. The returned function will
 * be called with the part object.
 *
 * @example
 *
 * import {directive, html} from 'lit-html';
 *
 * const immutable = directive((v) => (part) => {
 *   if (part.value !== v) {
 *     part.setValue(v)
 *   }
 * });
 */
const directive = (f) => ((...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
});
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};
//# sourceMappingURL=directive.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/dom.js":
/*!*******************************************!*\
  !*** ../node_modules/lit-html/lib/dom.js ***!
  \*******************************************/
/*! exports provided: isCEPolyfill, reparentNodes, removeNodes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCEPolyfill", function() { return isCEPolyfill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reparentNodes", function() { return reparentNodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeNodes", function() { return removeNodes; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = typeof window !== 'undefined' &&
    window.customElements != null &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
 * into another container (could be the same container), before `before`. If
 * `before` is null, it appends the nodes to the container.
 */
const reparentNodes = (container, start, end = null, before = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.insertBefore(start, before);
        start = n;
    }
};
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */
const removeNodes = (container, start, end = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.removeChild(start);
        start = n;
    }
};
//# sourceMappingURL=dom.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/part.js":
/*!********************************************!*\
  !*** ../node_modules/lit-html/lib/part.js ***!
  \********************************************/
/*! exports provided: noChange, nothing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noChange", function() { return noChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nothing", function() { return nothing; });
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};
//# sourceMappingURL=part.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/parts.js":
/*!*********************************************!*\
  !*** ../node_modules/lit-html/lib/parts.js ***!
  \*********************************************/
/*! exports provided: isPrimitive, isIterable, AttributeCommitter, AttributePart, NodePart, BooleanAttributePart, PropertyCommitter, PropertyPart, EventPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPrimitive", function() { return isPrimitive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIterable", function() { return isIterable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributeCommitter", function() { return AttributeCommitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttributePart", function() { return AttributePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodePart", function() { return NodePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BooleanAttributePart", function() { return BooleanAttributePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyCommitter", function() { return PropertyCommitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPart", function() { return PropertyPart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventPart", function() { return EventPart; });
/* harmony import */ var _directive_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./directive.js */ "../node_modules/lit-html/lib/directive.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "../node_modules/lit-html/lib/dom.js");
/* harmony import */ var _part_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./part.js */ "../node_modules/lit-html/lib/part.js");
/* harmony import */ var _template_instance_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template-instance.js */ "../node_modules/lit-html/lib/template-instance.js");
/* harmony import */ var _template_result_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./template-result.js */ "../node_modules/lit-html/lib/template-result.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./template.js */ "../node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */






const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
const isIterable = (value) => {
    return Array.isArray(value) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = this.parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (isPrimitive(v) || !isIterable(v)) {
                    text += typeof v === 'string' ? v : String(v);
                }
                else {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
/**
 * A Part that controls all or part of an attribute value.
 */
class AttributePart {
    constructor(committer) {
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"] && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this.value)) {
            const directive = this.value;
            this.value = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        if (this.value === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        this.committer.commit();
    }
}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */
class NodePart {
    constructor(options) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild(Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
        this.endNode = container.appendChild(Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part.__insert(this.startNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
        part.__insert(this.endNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref.__insert(this.startNode = Object(_template_js__WEBPACK_IMPORTED_MODULE_5__["createMarker"])());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        if (this.startNode.parentNode === null) {
            return;
        }
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        const value = this.__pendingValue;
        if (value === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        }
        else if (value instanceof _template_result_js__WEBPACK_IMPORTED_MODULE_4__["TemplateResult"]) {
            this.__commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this.__commitNode(value);
        }
        else if (isIterable(value)) {
            this.__commitIterable(value);
        }
        else if (value === _part_js__WEBPACK_IMPORTED_MODULE_2__["nothing"]) {
            this.value = _part_js__WEBPACK_IMPORTED_MODULE_2__["nothing"];
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        // If `value` isn't already a string, we explicitly convert it here in case
        // it can't be implicitly converted - i.e. it's a symbol.
        const valueAsString = typeof value === 'string' ? value : String(value);
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = valueAsString;
        }
        else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof _template_instance_js__WEBPACK_IMPORTED_MODULE_3__["TemplateInstance"] &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new _template_instance_js__WEBPACK_IMPORTED_MODULE_3__["TemplateInstance"](template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_1__["removeNodes"])(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this.__pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        if (this.__pendingValue === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
// Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module
(() => {
    try {
        const options = {
            get capture() {
                eventOptionsSupported = true;
                return false;
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener('test', options, options);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.removeEventListener('test', options, options);
    }
    catch (_e) {
        // event options not supported
    }
})();
class EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (Object(_directive_js__WEBPACK_IMPORTED_MODULE_0__["isDirective"])(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
            directive(this);
        }
        if (this.__pendingValue === _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"]) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = _part_js__WEBPACK_IMPORTED_MODULE_2__["noChange"];
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);
//# sourceMappingURL=parts.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/render.js":
/*!**********************************************!*\
  !*** ../node_modules/lit-html/lib/render.js ***!
  \**********************************************/
/*! exports provided: parts, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parts", function() { return parts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../node_modules/lit-html/lib/dom.js");
/* harmony import */ var _parts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parts.js */ "../node_modules/lit-html/lib/parts.js");
/* harmony import */ var _template_factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template-factory.js */ "../node_modules/lit-html/lib/template-factory.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */



const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["removeNodes"])(container, container.firstChild);
        parts.set(container, part = new _parts_js__WEBPACK_IMPORTED_MODULE_1__["NodePart"](Object.assign({ templateFactory: _template_factory_js__WEBPACK_IMPORTED_MODULE_2__["templateFactory"] }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};
//# sourceMappingURL=render.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/template-factory.js":
/*!********************************************************!*\
  !*** ../node_modules/lit-html/lib/template-factory.js ***!
  \********************************************************/
/*! exports provided: templateFactory, templateCaches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateFactory", function() { return templateFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templateCaches", function() { return templateCaches; });
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.js */ "../node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(_template_js__WEBPACK_IMPORTED_MODULE_0__["marker"]);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new _template_js__WEBPACK_IMPORTED_MODULE_0__["Template"](result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();
//# sourceMappingURL=template-factory.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/template-instance.js":
/*!*********************************************************!*\
  !*** ../node_modules/lit-html/lib/template-instance.js ***!
  \*********************************************************/
/*! exports provided: TemplateInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateInstance", function() { return TemplateInstance; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../node_modules/lit-html/lib/dom.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.js */ "../node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */


/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
    constructor(template, processor, options) {
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // There are a number of steps in the lifecycle of a template instance's
        // DOM fragment:
        //  1. Clone - create the instance fragment
        //  2. Adopt - adopt into the main document
        //  3. Process - find part markers and create parts
        //  4. Upgrade - upgrade custom elements
        //  5. Update - set node, attribute, property, etc., values
        //  6. Connect - connect to the document. Optional and outside of this
        //     method.
        //
        // We have a few constraints on the ordering of these steps:
        //  * We need to upgrade before updating, so that property values will pass
        //    through any property setters.
        //  * We would like to process before upgrading so that we're sure that the
        //    cloned fragment is inert and not disturbed by self-modifying DOM.
        //  * We want custom elements to upgrade even in disconnected fragments.
        //
        // Given these constraints, with full custom elements support we would
        // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
        //
        // But Safari does not implement CustomElementRegistry#upgrade, so we
        // can not implement that order and still have upgrade-before-update and
        // upgrade disconnected fragments. So we instead sacrifice the
        // process-before-upgrade constraint, since in Custom Elements v1 elements
        // must not modify their light DOM in the constructor. We still have issues
        // when co-existing with CEv0 elements like Polymer 1, and with polyfills
        // that don't strictly adhere to the no-modification rule because shadow
        // DOM, which may be created in the constructor, is emulated by being placed
        // in the light DOM.
        //
        // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
        // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
        // in one step.
        //
        // The Custom Elements v1 polyfill supports upgrade(), so the order when
        // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
        // Connect.
        const fragment = _dom_js__WEBPACK_IMPORTED_MODULE_0__["isCEPolyfill"] ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const stack = [];
        const parts = this.template.parts;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        let partIndex = 0;
        let nodeIndex = 0;
        let part;
        let node = walker.nextNode();
        // Loop through all the nodes and parts of a template
        while (partIndex < parts.length) {
            part = parts[partIndex];
            if (!Object(_template_js__WEBPACK_IMPORTED_MODULE_1__["isTemplatePartActive"])(part)) {
                this.__parts.push(undefined);
                partIndex++;
                continue;
            }
            // Progress the tree walker until we find our next part's node.
            // Note that multiple parts may share the same node (attribute parts
            // on a single element), so this loop may not run at all.
            while (nodeIndex < part.index) {
                nodeIndex++;
                if (node.nodeName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
                if ((node = walker.nextNode()) === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    node = walker.nextNode();
                }
            }
            // We've arrived at our part's node.
            if (part.type === 'node') {
                const part = this.processor.handleTextExpression(this.options);
                part.insertAfterNode(node.previousSibling);
                this.__parts.push(part);
            }
            else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex++;
        }
        if (_dom_js__WEBPACK_IMPORTED_MODULE_0__["isCEPolyfill"]) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}
//# sourceMappingURL=template-instance.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/template-result.js":
/*!*******************************************************!*\
  !*** ../node_modules/lit-html/lib/template-result.js ***!
  \*******************************************************/
/*! exports provided: TemplateResult, SVGTemplateResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateResult", function() { return TemplateResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SVGTemplateResult", function() { return SVGTemplateResult; });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../node_modules/lit-html/lib/dom.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template.js */ "../node_modules/lit-html/lib/template.js");
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @module lit-html
 */


const commentMarker = ` ${_template_js__WEBPACK_IMPORTED_MODULE_1__["marker"]} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const l = this.strings.length - 1;
        let html = '';
        let isCommentBinding = false;
        for (let i = 0; i < l; i++) {
            const s = this.strings[i];
            // For each binding we want to determine the kind of marker to insert
            // into the template source before it's parsed by the browser's HTML
            // parser. The marker type is based on whether the expression is in an
            // attribute, text, or comment position.
            //   * For node-position bindings we insert a comment with the marker
            //     sentinel as its text content, like <!--{{lit-guid}}-->.
            //   * For attribute bindings we insert just the marker sentinel for the
            //     first binding, so that we support unquoted attribute bindings.
            //     Subsequent bindings can use a comment marker because multi-binding
            //     attributes must be quoted.
            //   * For comment bindings we insert just the marker sentinel so we don't
            //     close the comment.
            //
            // The following code scans the template source, but is *not* an HTML
            // parser. We don't need to track the tree structure of the HTML, only
            // whether a binding is inside a comment, and if not, if it appears to be
            // the first binding in an attribute.
            const commentOpen = s.lastIndexOf('<!--');
            // We're in comment position if we have a comment open with no following
            // comment close. Because <-- can appear in an attribute value there can
            // be false positives.
            isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                s.indexOf('-->', commentOpen + 1) === -1;
            // Check to see if we have an attribute-like sequence preceding the
            // expression. This can match "name=value" like structures in text,
            // comments, and attribute values, so there can be false-positives.
            const attributeMatch = _template_js__WEBPACK_IMPORTED_MODULE_1__["lastAttributeNameRegex"].exec(s);
            if (attributeMatch === null) {
                // We're only in this branch if we don't have a attribute-like
                // preceding sequence. For comments, this guards against unusual
                // attribute values like <div foo="<!--${'bar'}">. Cases like
                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                // below.
                html += s + (isCommentBinding ? commentMarker : _template_js__WEBPACK_IMPORTED_MODULE_1__["nodeMarker"]);
            }
            else {
                // For attributes we use just a marker sentinel, and also append a
                // $lit$ suffix to the name to opt-out of attribute-specific parsing
                // that IE and Edge do for style and certain SVG attributes.
                html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                    attributeMatch[2] + _template_js__WEBPACK_IMPORTED_MODULE_1__["boundAttributeSuffix"] + attributeMatch[3] +
                    _template_js__WEBPACK_IMPORTED_MODULE_1__["marker"];
            }
        }
        html += this.strings[l];
        return html;
    }
    getTemplateElement() {
        const template = document.createElement('template');
        template.innerHTML = this.getHTML();
        return template;
    }
}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */
class SVGTemplateResult extends TemplateResult {
    getHTML() {
        return `<svg>${super.getHTML()}</svg>`;
    }
    getTemplateElement() {
        const template = super.getTemplateElement();
        const content = template.content;
        const svgElement = content.firstChild;
        content.removeChild(svgElement);
        Object(_dom_js__WEBPACK_IMPORTED_MODULE_0__["reparentNodes"])(content, svgElement.firstChild);
        return template;
    }
}
//# sourceMappingURL=template-result.js.map

/***/ }),

/***/ "../node_modules/lit-html/lib/template.js":
/*!************************************************!*\
  !*** ../node_modules/lit-html/lib/template.js ***!
  \************************************************/
/*! exports provided: marker, nodeMarker, markerRegex, boundAttributeSuffix, Template, isTemplatePartActive, createMarker, lastAttributeNameRegex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "marker", function() { return marker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeMarker", function() { return nodeMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markerRegex", function() { return markerRegex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boundAttributeSuffix", function() { return boundAttributeSuffix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Template", function() { return Template; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTemplatePartActive", function() { return isTemplatePartActive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMarker", function() { return createMarker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lastAttributeNameRegex", function() { return lastAttributeNameRegex; });
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        const nodesToRemove = [];
        const stack = [];
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        // Keeps track of the last index associated with a part. We try to delete
        // unnecessary nodes, but we never want to associate two different parts
        // to the same index. They must have a constant node between.
        let lastPartIndex = 0;
        let index = -1;
        let partIndex = 0;
        const { strings, values: { length } } = result;
        while (partIndex < length) {
            const node = walker.nextNode();
            if (node === null) {
                // We've exhausted the content inside a nested template element.
                // Because we still have parts (the outer for-loop), we know:
                // - There is a template in the stack
                // - The walker will find a nextNode outside the template
                walker.currentNode = stack.pop();
                continue;
            }
            index++;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length } = attributes;
                    // Per
                    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                    // attributes are not guaranteed to be returned in document order.
                    // In particular, Edge/IE can return them out of order, so we cannot
                    // assume a correspondence between part index and attribute index.
                    let count = 0;
                    for (let i = 0; i < length; i++) {
                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                            count++;
                        }
                    }
                    while (count-- > 0) {
                        // Get the template literal section leading up to the first
                        // expression in this attribute
                        const stringForPart = strings[partIndex];
                        // Find the attribute name
                        const name = lastAttributeNameRegex.exec(stringForPart)[2];
                        // Find the corresponding attribute
                        // All bound attributes have had a suffix added in
                        // TemplateResult#getHTML to opt out of special attribute
                        // handling. To look up the attribute value we also need to add
                        // the suffix.
                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({ type: 'attribute', index, name, strings: statics });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            }
            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings = data.split(markerRegex);
                    const lastIndex = strings.length - 1;
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (let i = 0; i < lastIndex; i++) {
                        let insert;
                        let s = strings[i];
                        if (s === '') {
                            insert = createMarker();
                        }
                        else {
                            const match = lastAttributeNameRegex.exec(s);
                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                s = s.slice(0, match.index) + match[1] +
                                    match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                            }
                            insert = document.createTextNode(s);
                        }
                        parent.insertBefore(insert, node);
                        this.parts.push({ type: 'node', index: ++index });
                    }
                    // If there's no text, we must insert a comment to mark our place.
                    // Else, we can trust it will stick around after cloning.
                    if (strings[lastIndex] === '') {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    }
                    else {
                        node.data = strings[lastIndex];
                    }
                    // We have a part for each match found
                    partIndex += lastIndex;
                }
            }
            else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    // Add a new marker node to be the startNode of the Part if any of
                    // the following are true:
                    //  * We don't have a previousSibling
                    //  * The previousSibling is already the start of a previous part
                    if (node.previousSibling === null || index === lastPartIndex) {
                        index++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index;
                    this.parts.push({ type: 'node', index });
                    // If we don't have a nextSibling, keep this node so we have an end.
                    // Else, we can remove it to save future costs.
                    if (node.nextSibling === null) {
                        node.data = '';
                    }
                    else {
                        nodesToRemove.push(node);
                        index--;
                    }
                    partIndex++;
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        // TODO (justinfagnani): consider whether it's even worth it to
                        // make bindings in comments work
                        this.parts.push({ type: 'node', index: -1 });
                        partIndex++;
                    }
                }
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = 
// eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
//# sourceMappingURL=template.js.map

/***/ }),

/***/ "../node_modules/lit-html/lit-html.js":
/*!********************************************!*\
  !*** ../node_modules/lit-html/lit-html.js ***!
  \********************************************/
/*! exports provided: DefaultTemplateProcessor, defaultTemplateProcessor, directive, isDirective, removeNodes, reparentNodes, noChange, nothing, AttributeCommitter, AttributePart, BooleanAttributePart, EventPart, isIterable, isPrimitive, NodePart, PropertyCommitter, PropertyPart, parts, render, templateCaches, templateFactory, TemplateInstance, SVGTemplateResult, TemplateResult, createMarker, isTemplatePartActive, Template, html, svg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "html", function() { return html; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svg", function() { return svg; });
/* harmony import */ var _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/default-template-processor.js */ "../node_modules/lit-html/lib/default-template-processor.js");
/* harmony import */ var _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/template-result.js */ "../node_modules/lit-html/lib/template-result.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultTemplateProcessor", function() { return _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["DefaultTemplateProcessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultTemplateProcessor", function() { return _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["defaultTemplateProcessor"]; });

/* harmony import */ var _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/directive.js */ "../node_modules/lit-html/lib/directive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "directive", function() { return _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__["directive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDirective", function() { return _lib_directive_js__WEBPACK_IMPORTED_MODULE_2__["isDirective"]; });

/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/dom.js */ "../node_modules/lit-html/lib/dom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeNodes", function() { return _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["removeNodes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reparentNodes", function() { return _lib_dom_js__WEBPACK_IMPORTED_MODULE_3__["reparentNodes"]; });

/* harmony import */ var _lib_part_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/part.js */ "../node_modules/lit-html/lib/part.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noChange", function() { return _lib_part_js__WEBPACK_IMPORTED_MODULE_4__["noChange"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nothing", function() { return _lib_part_js__WEBPACK_IMPORTED_MODULE_4__["nothing"]; });

/* harmony import */ var _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/parts.js */ "../node_modules/lit-html/lib/parts.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AttributeCommitter", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["AttributeCommitter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AttributePart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["AttributePart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BooleanAttributePart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["BooleanAttributePart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventPart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["EventPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isIterable", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["isIterable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPrimitive", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["isPrimitive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NodePart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["NodePart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyCommitter", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["PropertyCommitter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPart", function() { return _lib_parts_js__WEBPACK_IMPORTED_MODULE_5__["PropertyPart"]; });

/* harmony import */ var _lib_render_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/render.js */ "../node_modules/lit-html/lib/render.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parts", function() { return _lib_render_js__WEBPACK_IMPORTED_MODULE_6__["parts"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _lib_render_js__WEBPACK_IMPORTED_MODULE_6__["render"]; });

/* harmony import */ var _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/template-factory.js */ "../node_modules/lit-html/lib/template-factory.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateCaches", function() { return _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__["templateCaches"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "templateFactory", function() { return _lib_template_factory_js__WEBPACK_IMPORTED_MODULE_7__["templateFactory"]; });

/* harmony import */ var _lib_template_instance_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/template-instance.js */ "../node_modules/lit-html/lib/template-instance.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateInstance", function() { return _lib_template_instance_js__WEBPACK_IMPORTED_MODULE_8__["TemplateInstance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SVGTemplateResult", function() { return _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["SVGTemplateResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateResult", function() { return _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["TemplateResult"]; });

/* harmony import */ var _lib_template_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/template.js */ "../node_modules/lit-html/lib/template.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createMarker", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__["createMarker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTemplatePartActive", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__["isTemplatePartActive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Template", function() { return _lib_template_js__WEBPACK_IMPORTED_MODULE_9__["Template"]; });

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 *
 * Main lit-html module.
 *
 * Main exports:
 *
 * -  [[html]]
 * -  [[svg]]
 * -  [[render]]
 *
 * @module lit-html
 * @preferred
 */
/**
 * Do not remove this comment; it keeps typedoc from misplacing the module
 * docs.
 */




// TODO(justinfagnani): remove line when we get NodePart moving methods








// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== 'undefined') {
    (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.2.1');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["TemplateResult"](strings, values, 'html', _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["defaultTemplateProcessor"]);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
const svg = (strings, ...values) => new _lib_template_result_js__WEBPACK_IMPORTED_MODULE_1__["SVGTemplateResult"](strings, values, 'svg', _lib_default_template_processor_js__WEBPACK_IMPORTED_MODULE_0__["defaultTemplateProcessor"]);
//# sourceMappingURL=lit-html.js.map

/***/ }),

/***/ "../node_modules/lodash/_DataView.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_DataView.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),

/***/ "../node_modules/lodash/_Hash.js":
/*!***************************************!*\
  !*** ../node_modules/lodash/_Hash.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(/*! ./_hashClear */ "../node_modules/lodash/_hashClear.js"),
    hashDelete = __webpack_require__(/*! ./_hashDelete */ "../node_modules/lodash/_hashDelete.js"),
    hashGet = __webpack_require__(/*! ./_hashGet */ "../node_modules/lodash/_hashGet.js"),
    hashHas = __webpack_require__(/*! ./_hashHas */ "../node_modules/lodash/_hashHas.js"),
    hashSet = __webpack_require__(/*! ./_hashSet */ "../node_modules/lodash/_hashSet.js");

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ "../node_modules/lodash/_ListCache.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_ListCache.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ "../node_modules/lodash/_listCacheClear.js"),
    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ "../node_modules/lodash/_listCacheDelete.js"),
    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ "../node_modules/lodash/_listCacheGet.js"),
    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ "../node_modules/lodash/_listCacheHas.js"),
    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ "../node_modules/lodash/_listCacheSet.js");

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ "../node_modules/lodash/_Map.js":
/*!**************************************!*\
  !*** ../node_modules/lodash/_Map.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ "../node_modules/lodash/_MapCache.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_MapCache.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ "../node_modules/lodash/_mapCacheClear.js"),
    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ "../node_modules/lodash/_mapCacheDelete.js"),
    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ "../node_modules/lodash/_mapCacheGet.js"),
    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ "../node_modules/lodash/_mapCacheHas.js"),
    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ "../node_modules/lodash/_mapCacheSet.js");

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ "../node_modules/lodash/_Promise.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/_Promise.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),

/***/ "../node_modules/lodash/_Set.js":
/*!**************************************!*\
  !*** ../node_modules/lodash/_Set.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),

/***/ "../node_modules/lodash/_Stack.js":
/*!****************************************!*\
  !*** ../node_modules/lodash/_Stack.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "../node_modules/lodash/_ListCache.js"),
    stackClear = __webpack_require__(/*! ./_stackClear */ "../node_modules/lodash/_stackClear.js"),
    stackDelete = __webpack_require__(/*! ./_stackDelete */ "../node_modules/lodash/_stackDelete.js"),
    stackGet = __webpack_require__(/*! ./_stackGet */ "../node_modules/lodash/_stackGet.js"),
    stackHas = __webpack_require__(/*! ./_stackHas */ "../node_modules/lodash/_stackHas.js"),
    stackSet = __webpack_require__(/*! ./_stackSet */ "../node_modules/lodash/_stackSet.js");

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),

/***/ "../node_modules/lodash/_Symbol.js":
/*!*****************************************!*\
  !*** ../node_modules/lodash/_Symbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "../node_modules/lodash/_Uint8Array.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_Uint8Array.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ "../node_modules/lodash/_WeakMap.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/_WeakMap.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ "../node_modules/lodash/_arrayEach.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_arrayEach.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),

/***/ "../node_modules/lodash/_arrayFilter.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_arrayFilter.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),

/***/ "../node_modules/lodash/_arrayLikeKeys.js":
/*!************************************************!*\
  !*** ../node_modules/lodash/_arrayLikeKeys.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "../node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "../node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "../node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "../node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "../node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ "../node_modules/lodash/_arrayPush.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_arrayPush.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),

/***/ "../node_modules/lodash/_assignValue.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_assignValue.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "../node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "../node_modules/lodash/eq.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),

/***/ "../node_modules/lodash/_assocIndexOf.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_assocIndexOf.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(/*! ./eq */ "../node_modules/lodash/eq.js");

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ "../node_modules/lodash/_baseAssign.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_baseAssign.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../node_modules/lodash/_copyObject.js"),
    keys = __webpack_require__(/*! ./keys */ "../node_modules/lodash/keys.js");

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),

/***/ "../node_modules/lodash/_baseAssignIn.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_baseAssignIn.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../node_modules/lodash/_copyObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "../node_modules/lodash/keysIn.js");

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ }),

/***/ "../node_modules/lodash/_baseAssignValue.js":
/*!**************************************************!*\
  !*** ../node_modules/lodash/_baseAssignValue.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./_defineProperty */ "../node_modules/lodash/_defineProperty.js");

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),

/***/ "../node_modules/lodash/_baseClone.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_baseClone.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(/*! ./_Stack */ "../node_modules/lodash/_Stack.js"),
    arrayEach = __webpack_require__(/*! ./_arrayEach */ "../node_modules/lodash/_arrayEach.js"),
    assignValue = __webpack_require__(/*! ./_assignValue */ "../node_modules/lodash/_assignValue.js"),
    baseAssign = __webpack_require__(/*! ./_baseAssign */ "../node_modules/lodash/_baseAssign.js"),
    baseAssignIn = __webpack_require__(/*! ./_baseAssignIn */ "../node_modules/lodash/_baseAssignIn.js"),
    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ "../node_modules/lodash/_cloneBuffer.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "../node_modules/lodash/_copyArray.js"),
    copySymbols = __webpack_require__(/*! ./_copySymbols */ "../node_modules/lodash/_copySymbols.js"),
    copySymbolsIn = __webpack_require__(/*! ./_copySymbolsIn */ "../node_modules/lodash/_copySymbolsIn.js"),
    getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "../node_modules/lodash/_getAllKeys.js"),
    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ "../node_modules/lodash/_getAllKeysIn.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "../node_modules/lodash/_getTag.js"),
    initCloneArray = __webpack_require__(/*! ./_initCloneArray */ "../node_modules/lodash/_initCloneArray.js"),
    initCloneByTag = __webpack_require__(/*! ./_initCloneByTag */ "../node_modules/lodash/_initCloneByTag.js"),
    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ "../node_modules/lodash/_initCloneObject.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "../node_modules/lodash/isBuffer.js"),
    isMap = __webpack_require__(/*! ./isMap */ "../node_modules/lodash/isMap.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../node_modules/lodash/isObject.js"),
    isSet = __webpack_require__(/*! ./isSet */ "../node_modules/lodash/isSet.js"),
    keys = __webpack_require__(/*! ./keys */ "../node_modules/lodash/keys.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ }),

/***/ "../node_modules/lodash/_baseCreate.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_baseCreate.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "../node_modules/lodash/isObject.js");

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),

/***/ "../node_modules/lodash/_baseGetAllKeys.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_baseGetAllKeys.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "../node_modules/lodash/_arrayPush.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../node_modules/lodash/isArray.js");

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),

/***/ "../node_modules/lodash/_baseGetTag.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_baseGetTag.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "../node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "../node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "../node_modules/lodash/_baseIsArguments.js":
/*!**************************************************!*\
  !*** ../node_modules/lodash/_baseIsArguments.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ "../node_modules/lodash/_baseIsMap.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_baseIsMap.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getTag = __webpack_require__(/*! ./_getTag */ "../node_modules/lodash/_getTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}

module.exports = baseIsMap;


/***/ }),

/***/ "../node_modules/lodash/_baseIsNative.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_baseIsNative.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "../node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "../node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "../node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ "../node_modules/lodash/_baseIsSet.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_baseIsSet.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getTag = __webpack_require__(/*! ./_getTag */ "../node_modules/lodash/_getTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}

module.exports = baseIsSet;


/***/ }),

/***/ "../node_modules/lodash/_baseIsTypedArray.js":
/*!***************************************************!*\
  !*** ../node_modules/lodash/_baseIsTypedArray.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "../node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ "../node_modules/lodash/_baseKeys.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_baseKeys.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(/*! ./_isPrototype */ "../node_modules/lodash/_isPrototype.js"),
    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ "../node_modules/lodash/_nativeKeys.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),

/***/ "../node_modules/lodash/_baseKeysIn.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_baseKeysIn.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "../node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "../node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "../node_modules/lodash/_nativeKeysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),

/***/ "../node_modules/lodash/_baseTimes.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_baseTimes.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ "../node_modules/lodash/_baseUnary.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_baseUnary.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ "../node_modules/lodash/_cloneArrayBuffer.js":
/*!***************************************************!*\
  !*** ../node_modules/lodash/_cloneArrayBuffer.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "../node_modules/lodash/_Uint8Array.js");

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),

/***/ "../node_modules/lodash/_cloneBuffer.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_cloneBuffer.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../node_modules/lodash/_cloneDataView.js":
/*!************************************************!*\
  !*** ../node_modules/lodash/_cloneDataView.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "../node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ }),

/***/ "../node_modules/lodash/_cloneRegExp.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_cloneRegExp.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ }),

/***/ "../node_modules/lodash/_cloneSymbol.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_cloneSymbol.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../node_modules/lodash/_Symbol.js");

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ }),

/***/ "../node_modules/lodash/_cloneTypedArray.js":
/*!**************************************************!*\
  !*** ../node_modules/lodash/_cloneTypedArray.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "../node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),

/***/ "../node_modules/lodash/_copyArray.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_copyArray.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),

/***/ "../node_modules/lodash/_copyObject.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_copyObject.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(/*! ./_assignValue */ "../node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "../node_modules/lodash/_baseAssignValue.js");

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),

/***/ "../node_modules/lodash/_copySymbols.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_copySymbols.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../node_modules/lodash/_copyObject.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "../node_modules/lodash/_getSymbols.js");

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ }),

/***/ "../node_modules/lodash/_copySymbolsIn.js":
/*!************************************************!*\
  !*** ../node_modules/lodash/_copySymbolsIn.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../node_modules/lodash/_copyObject.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "../node_modules/lodash/_getSymbolsIn.js");

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ }),

/***/ "../node_modules/lodash/_coreJsData.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_coreJsData.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "../node_modules/lodash/_defineProperty.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_defineProperty.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ "../node_modules/lodash/_freeGlobal.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_freeGlobal.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/lodash/_getAllKeys.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_getAllKeys.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "../node_modules/lodash/_baseGetAllKeys.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "../node_modules/lodash/_getSymbols.js"),
    keys = __webpack_require__(/*! ./keys */ "../node_modules/lodash/keys.js");

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),

/***/ "../node_modules/lodash/_getAllKeysIn.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_getAllKeysIn.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "../node_modules/lodash/_baseGetAllKeys.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "../node_modules/lodash/_getSymbolsIn.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "../node_modules/lodash/keysIn.js");

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ }),

/***/ "../node_modules/lodash/_getMapData.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_getMapData.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(/*! ./_isKeyable */ "../node_modules/lodash/_isKeyable.js");

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ "../node_modules/lodash/_getNative.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_getNative.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "../node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "../node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ "../node_modules/lodash/_getPrototype.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_getPrototype.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "../node_modules/lodash/_overArg.js");

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),

/***/ "../node_modules/lodash/_getRawTag.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_getRawTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "../node_modules/lodash/_getSymbols.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_getSymbols.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ "../node_modules/lodash/_arrayFilter.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "../node_modules/lodash/stubArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),

/***/ "../node_modules/lodash/_getSymbolsIn.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_getSymbolsIn.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "../node_modules/lodash/_arrayPush.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "../node_modules/lodash/_getPrototype.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "../node_modules/lodash/_getSymbols.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "../node_modules/lodash/stubArray.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ }),

/***/ "../node_modules/lodash/_getTag.js":
/*!*****************************************!*\
  !*** ../node_modules/lodash/_getTag.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(/*! ./_DataView */ "../node_modules/lodash/_DataView.js"),
    Map = __webpack_require__(/*! ./_Map */ "../node_modules/lodash/_Map.js"),
    Promise = __webpack_require__(/*! ./_Promise */ "../node_modules/lodash/_Promise.js"),
    Set = __webpack_require__(/*! ./_Set */ "../node_modules/lodash/_Set.js"),
    WeakMap = __webpack_require__(/*! ./_WeakMap */ "../node_modules/lodash/_WeakMap.js"),
    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../node_modules/lodash/_baseGetTag.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "../node_modules/lodash/_toSource.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),

/***/ "../node_modules/lodash/_getValue.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_getValue.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ "../node_modules/lodash/_hashClear.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_hashClear.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../node_modules/lodash/_nativeCreate.js");

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ "../node_modules/lodash/_hashDelete.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_hashDelete.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ "../node_modules/lodash/_hashGet.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/_hashGet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ "../node_modules/lodash/_hashHas.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/_hashHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../node_modules/lodash/_nativeCreate.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ "../node_modules/lodash/_hashSet.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/_hashSet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ "../node_modules/lodash/_initCloneArray.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_initCloneArray.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ }),

/***/ "../node_modules/lodash/_initCloneByTag.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_initCloneByTag.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "../node_modules/lodash/_cloneArrayBuffer.js"),
    cloneDataView = __webpack_require__(/*! ./_cloneDataView */ "../node_modules/lodash/_cloneDataView.js"),
    cloneRegExp = __webpack_require__(/*! ./_cloneRegExp */ "../node_modules/lodash/_cloneRegExp.js"),
    cloneSymbol = __webpack_require__(/*! ./_cloneSymbol */ "../node_modules/lodash/_cloneSymbol.js"),
    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ "../node_modules/lodash/_cloneTypedArray.js");

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ }),

/***/ "../node_modules/lodash/_initCloneObject.js":
/*!**************************************************!*\
  !*** ../node_modules/lodash/_initCloneObject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(/*! ./_baseCreate */ "../node_modules/lodash/_baseCreate.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "../node_modules/lodash/_getPrototype.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "../node_modules/lodash/_isPrototype.js");

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),

/***/ "../node_modules/lodash/_isIndex.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/_isIndex.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ "../node_modules/lodash/_isKeyable.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/_isKeyable.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ "../node_modules/lodash/_isMasked.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_isMasked.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "../node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ "../node_modules/lodash/_isPrototype.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_isPrototype.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ "../node_modules/lodash/_listCacheClear.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_listCacheClear.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ "../node_modules/lodash/_listCacheDelete.js":
/*!**************************************************!*\
  !*** ../node_modules/lodash/_listCacheDelete.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../node_modules/lodash/_assocIndexOf.js");

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ "../node_modules/lodash/_listCacheGet.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_listCacheGet.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../node_modules/lodash/_assocIndexOf.js");

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ "../node_modules/lodash/_listCacheHas.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_listCacheHas.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../node_modules/lodash/_assocIndexOf.js");

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ "../node_modules/lodash/_listCacheSet.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_listCacheSet.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../node_modules/lodash/_assocIndexOf.js");

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ "../node_modules/lodash/_mapCacheClear.js":
/*!************************************************!*\
  !*** ../node_modules/lodash/_mapCacheClear.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(/*! ./_Hash */ "../node_modules/lodash/_Hash.js"),
    ListCache = __webpack_require__(/*! ./_ListCache */ "../node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "../node_modules/lodash/_Map.js");

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ "../node_modules/lodash/_mapCacheDelete.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_mapCacheDelete.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../node_modules/lodash/_getMapData.js");

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ "../node_modules/lodash/_mapCacheGet.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_mapCacheGet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../node_modules/lodash/_getMapData.js");

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ "../node_modules/lodash/_mapCacheHas.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_mapCacheHas.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../node_modules/lodash/_getMapData.js");

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ "../node_modules/lodash/_mapCacheSet.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_mapCacheSet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../node_modules/lodash/_getMapData.js");

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ "../node_modules/lodash/_nativeCreate.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_nativeCreate.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../node_modules/lodash/_getNative.js");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ "../node_modules/lodash/_nativeKeys.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_nativeKeys.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "../node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ "../node_modules/lodash/_nativeKeysIn.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash/_nativeKeysIn.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),

/***/ "../node_modules/lodash/_nodeUtil.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_nodeUtil.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../node_modules/lodash/_objectToString.js":
/*!*************************************************!*\
  !*** ../node_modules/lodash/_objectToString.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "../node_modules/lodash/_overArg.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/_overArg.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ "../node_modules/lodash/_root.js":
/*!***************************************!*\
  !*** ../node_modules/lodash/_root.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "../node_modules/lodash/_stackClear.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/_stackClear.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "../node_modules/lodash/_ListCache.js");

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),

/***/ "../node_modules/lodash/_stackDelete.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/_stackDelete.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),

/***/ "../node_modules/lodash/_stackGet.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_stackGet.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),

/***/ "../node_modules/lodash/_stackHas.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_stackHas.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),

/***/ "../node_modules/lodash/_stackSet.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_stackSet.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "../node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "../node_modules/lodash/_Map.js"),
    MapCache = __webpack_require__(/*! ./_MapCache */ "../node_modules/lodash/_MapCache.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),

/***/ "../node_modules/lodash/_toSource.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/_toSource.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ "../node_modules/lodash/clone.js":
/*!***************************************!*\
  !*** ../node_modules/lodash/clone.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseClone = __webpack_require__(/*! ./_baseClone */ "../node_modules/lodash/_baseClone.js");

/** Used to compose bitmasks for cloning. */
var CLONE_SYMBOLS_FLAG = 4;

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. An empty object is returned for uncloneable values such
 * as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeep
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var shallow = _.clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 */
function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG);
}

module.exports = clone;


/***/ }),

/***/ "../node_modules/lodash/clonedeep.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/clonedeep.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseClone = __webpack_require__(/*! ./_baseClone */ "../node_modules/lodash/_baseClone.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;


/***/ }),

/***/ "../node_modules/lodash/eq.js":
/*!************************************!*\
  !*** ../node_modules/lodash/eq.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ "../node_modules/lodash/isArguments.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/isArguments.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "../node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ "../node_modules/lodash/isArray.js":
/*!*****************************************!*\
  !*** ../node_modules/lodash/isArray.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "../node_modules/lodash/isArrayLike.js":
/*!*********************************************!*\
  !*** ../node_modules/lodash/isArrayLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "../node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "../node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ "../node_modules/lodash/isBuffer.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/isBuffer.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ "../node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "../node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../node_modules/lodash/isFunction.js":
/*!********************************************!*\
  !*** ../node_modules/lodash/isFunction.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "../node_modules/lodash/isLength.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/isLength.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ "../node_modules/lodash/isMap.js":
/*!***************************************!*\
  !*** ../node_modules/lodash/isMap.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsMap = __webpack_require__(/*! ./_baseIsMap */ "../node_modules/lodash/_baseIsMap.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "../node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "../node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

module.exports = isMap;


/***/ }),

/***/ "../node_modules/lodash/isObject.js":
/*!******************************************!*\
  !*** ../node_modules/lodash/isObject.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "../node_modules/lodash/isObjectLike.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/isObjectLike.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "../node_modules/lodash/isSet.js":
/*!***************************************!*\
  !*** ../node_modules/lodash/isSet.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsSet = __webpack_require__(/*! ./_baseIsSet */ "../node_modules/lodash/_baseIsSet.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "../node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "../node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

module.exports = isSet;


/***/ }),

/***/ "../node_modules/lodash/isTypedArray.js":
/*!**********************************************!*\
  !*** ../node_modules/lodash/isTypedArray.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "../node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "../node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "../node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ "../node_modules/lodash/keys.js":
/*!**************************************!*\
  !*** ../node_modules/lodash/keys.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "../node_modules/lodash/_arrayLikeKeys.js"),
    baseKeys = __webpack_require__(/*! ./_baseKeys */ "../node_modules/lodash/_baseKeys.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "../node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),

/***/ "../node_modules/lodash/keysIn.js":
/*!****************************************!*\
  !*** ../node_modules/lodash/keysIn.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "../node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "../node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "../node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),

/***/ "../node_modules/lodash/stubArray.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/stubArray.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ "../node_modules/lodash/stubFalse.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash/stubFalse.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ "../node_modules/micromatch/index.js":
/*!*******************************************!*\
  !*** ../node_modules/micromatch/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const util = __webpack_require__(/*! util */ "../node_modules/util/util.js");
const braces = __webpack_require__(/*! braces */ "../node_modules/braces/index.js");
const picomatch = __webpack_require__(/*! picomatch */ "../node_modules/picomatch/index.js");
const utils = __webpack_require__(/*! picomatch/lib/utils */ "../node_modules/picomatch/lib/utils.js");
const isEmptyString = val => typeof val === 'string' && (val === '' || val === './');

/**
 * Returns an array of strings that match one or more glob patterns.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm(list, patterns[, options]);
 *
 * console.log(mm(['a.js', 'a.txt'], ['*.js']));
 * //=> [ 'a.js' ]
 * ```
 * @param {String|Array<string>} list List of strings to match.
 * @param {String|Array<string>} patterns One or more glob patterns to use for matching.
 * @param {Object} options See available [options](#options)
 * @return {Array} Returns an array of matches
 * @summary false
 * @api public
 */

const micromatch = (list, patterns, options) => {
  patterns = [].concat(patterns);
  list = [].concat(list);

  let omit = new Set();
  let keep = new Set();
  let items = new Set();
  let negatives = 0;

  let onResult = state => {
    items.add(state.output);
    if (options && options.onResult) {
      options.onResult(state);
    }
  };

  for (let i = 0; i < patterns.length; i++) {
    let isMatch = picomatch(String(patterns[i]), { ...options, onResult }, true);
    let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
    if (negated) negatives++;

    for (let item of list) {
      let matched = isMatch(item, true);

      let match = negated ? !matched.isMatch : matched.isMatch;
      if (!match) continue;

      if (negated) {
        omit.add(matched.output);
      } else {
        omit.delete(matched.output);
        keep.add(matched.output);
      }
    }
  }

  let result = negatives === patterns.length ? [...items] : [...keep];
  let matches = result.filter(item => !omit.has(item));

  if (options && matches.length === 0) {
    if (options.failglob === true) {
      throw new Error(`No matches found for "${patterns.join(', ')}"`);
    }

    if (options.nonull === true || options.nullglob === true) {
      return options.unescape ? patterns.map(p => p.replace(/\\/g, '')) : patterns;
    }
  }

  return matches;
};

/**
 * Backwards compatibility
 */

micromatch.match = micromatch;

/**
 * Returns a matcher function from the given glob `pattern` and `options`.
 * The returned function takes a string to match as its only argument and returns
 * true if the string is a match.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.matcher(pattern[, options]);
 *
 * const isMatch = mm.matcher('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @param {String} `pattern` Glob pattern
 * @param {Object} `options`
 * @return {Function} Returns a matcher function.
 * @api public
 */

micromatch.matcher = (pattern, options) => picomatch(pattern, options);

/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.isMatch(string, patterns[, options]);
 *
 * console.log(mm.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(mm.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String} str The string to test.
 * @param {String|Array} patterns One or more glob patterns to use for matching.
 * @param {Object} [options] See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);

/**
 * Backwards compatibility
 */

micromatch.any = micromatch.isMatch;

/**
 * Returns a list of strings that _**do not match any**_ of the given `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.not(list, patterns[, options]);
 *
 * console.log(mm.not(['a.a', 'b.b', 'c.c'], '*.a'));
 * //=> ['b.b', 'c.c']
 * ```
 * @param {Array} `list` Array of strings to match.
 * @param {String|Array} `patterns` One or more glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Array} Returns an array of strings that **do not match** the given patterns.
 * @api public
 */

micromatch.not = (list, patterns, options = {}) => {
  patterns = [].concat(patterns).map(String);
  let result = new Set();
  let items = [];

  let onResult = state => {
    if (options.onResult) options.onResult(state);
    items.push(state.output);
  };

  let matches = micromatch(list, patterns, { ...options, onResult });

  for (let item of items) {
    if (!matches.includes(item)) {
      result.add(item);
    }
  }
  return [...result];
};

/**
 * Returns true if the given `string` contains the given pattern. Similar
 * to [.isMatch](#isMatch) but the pattern can match any part of the string.
 *
 * ```js
 * var mm = require('micromatch');
 * // mm.contains(string, pattern[, options]);
 *
 * console.log(mm.contains('aa/bb/cc', '*b'));
 * //=> true
 * console.log(mm.contains('aa/bb/cc', '*d'));
 * //=> false
 * ```
 * @param {String} `str` The string to match.
 * @param {String|Array} `patterns` Glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if the patter matches any part of `str`.
 * @api public
 */

micromatch.contains = (str, pattern, options) => {
  if (typeof str !== 'string') {
    throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
  }

  if (Array.isArray(pattern)) {
    return pattern.some(p => micromatch.contains(str, p, options));
  }

  if (typeof pattern === 'string') {
    if (isEmptyString(str) || isEmptyString(pattern)) {
      return false;
    }

    if (str.includes(pattern) || (str.startsWith('./') && str.slice(2).includes(pattern))) {
      return true;
    }
  }

  return micromatch.isMatch(str, pattern, { ...options, contains: true });
};

/**
 * Filter the keys of the given object with the given `glob` pattern
 * and `options`. Does not attempt to match nested keys. If you need this feature,
 * use [glob-object][] instead.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.matchKeys(object, patterns[, options]);
 *
 * const obj = { aa: 'a', ab: 'b', ac: 'c' };
 * console.log(mm.matchKeys(obj, '*b'));
 * //=> { ab: 'b' }
 * ```
 * @param {Object} `object` The object with keys to filter.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Object} Returns an object with only keys that match the given patterns.
 * @api public
 */

micromatch.matchKeys = (obj, patterns, options) => {
  if (!utils.isObject(obj)) {
    throw new TypeError('Expected the first argument to be an object');
  }
  let keys = micromatch(Object.keys(obj), patterns, options);
  let res = {};
  for (let key of keys) res[key] = obj[key];
  return res;
};

/**
 * Returns true if some of the strings in the given `list` match any of the given glob `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.some(list, patterns[, options]);
 *
 * console.log(mm.some(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
 * // true
 * console.log(mm.some(['foo.js'], ['*.js', '!foo.js']));
 * // false
 * ```
 * @param {String|Array} `list` The string or array of strings to test. Returns as soon as the first match is found.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch.some = (list, patterns, options) => {
  let items = [].concat(list);

  for (let pattern of [].concat(patterns)) {
    let isMatch = picomatch(String(pattern), options);
    if (items.some(item => isMatch(item))) {
      return true;
    }
  }
  return false;
};

/**
 * Returns true if every string in the given `list` matches
 * any of the given glob `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.every(list, patterns[, options]);
 *
 * console.log(mm.every('foo.js', ['foo.js']));
 * // true
 * console.log(mm.every(['foo.js', 'bar.js'], ['*.js']));
 * // true
 * console.log(mm.every(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
 * // false
 * console.log(mm.every(['foo.js'], ['*.js', '!foo.js']));
 * // false
 * ```
 * @param {String|Array} `list` The string or array of strings to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch.every = (list, patterns, options) => {
  let items = [].concat(list);

  for (let pattern of [].concat(patterns)) {
    let isMatch = picomatch(String(pattern), options);
    if (!items.every(item => isMatch(item))) {
      return false;
    }
  }
  return true;
};

/**
 * Returns true if **all** of the given `patterns` match
 * the specified string.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.all(string, patterns[, options]);
 *
 * console.log(mm.all('foo.js', ['foo.js']));
 * // true
 *
 * console.log(mm.all('foo.js', ['*.js', '!foo.js']));
 * // false
 *
 * console.log(mm.all('foo.js', ['*.js', 'foo.js']));
 * // true
 *
 * console.log(mm.all('foo.js', ['*.js', 'f*', '*o*', '*o.js']));
 * // true
 * ```
 * @param {String|Array} `str` The string to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch.all = (str, patterns, options) => {
  if (typeof str !== 'string') {
    throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
  }

  return [].concat(patterns).every(p => picomatch(p, options)(str));
};

/**
 * Returns an array of matches captured by `pattern` in `string, or `null` if the pattern did not match.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.capture(pattern, string[, options]);
 *
 * console.log(mm.capture('test/*.js', 'test/foo.js'));
 * //=> ['foo']
 * console.log(mm.capture('test/*.js', 'foo/bar.css'));
 * //=> null
 * ```
 * @param {String} `glob` Glob pattern to use for matching.
 * @param {String} `input` String to match
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns an array of captures if the input matches the glob pattern, otherwise `null`.
 * @api public
 */

micromatch.capture = (glob, input, options) => {
  let posix = utils.isWindows(options);
  let regex = picomatch.makeRe(String(glob), { ...options, capture: true });
  let match = regex.exec(posix ? utils.toPosixSlashes(input) : input);

  if (match) {
    return match.slice(1).map(v => v === void 0 ? '' : v);
  }
};

/**
 * Create a regular expression from the given glob `pattern`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.makeRe(pattern[, options]);
 *
 * console.log(mm.makeRe('*.js'));
 * //=> /^(?:(\.[\\\/])?(?!\.)(?=.)[^\/]*?\.js)$/
 * ```
 * @param {String} `pattern` A glob pattern to convert to regex.
 * @param {Object} `options`
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */

micromatch.makeRe = (...args) => picomatch.makeRe(...args);

/**
 * Scan a glob pattern to separate the pattern into segments. Used
 * by the [split](#split) method.
 *
 * ```js
 * const mm = require('micromatch');
 * const state = mm.scan(pattern[, options]);
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */

micromatch.scan = (...args) => picomatch.scan(...args);

/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const mm = require('micromatch');
 * const state = mm(pattern[, options]);
 * ```
 * @param {String} `glob`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as regex source string.
 * @api public
 */

micromatch.parse = (patterns, options) => {
  let res = [];
  for (let pattern of [].concat(patterns || [])) {
    for (let str of braces(String(pattern), options)) {
      res.push(picomatch.parse(str, options));
    }
  }
  return res;
};

/**
 * Process the given brace `pattern`.
 *
 * ```js
 * const { braces } = require('micromatch');
 * console.log(braces('foo/{a,b,c}/bar'));
 * //=> [ 'foo/(a|b|c)/bar' ]
 *
 * console.log(braces('foo/{a,b,c}/bar', { expand: true }));
 * //=> [ 'foo/a/bar', 'foo/b/bar', 'foo/c/bar' ]
 * ```
 * @param {String} `pattern` String with brace pattern to process.
 * @param {Object} `options` Any [options](#options) to change how expansion is performed. See the [braces][] library for all available options.
 * @return {Array}
 * @api public
 */

micromatch.braces = (pattern, options) => {
  if (typeof pattern !== 'string') throw new TypeError('Expected a string');
  if ((options && options.nobrace === true) || !/\{.*\}/.test(pattern)) {
    return [pattern];
  }
  return braces(pattern, options);
};

/**
 * Expand braces
 */

micromatch.braceExpand = (pattern, options) => {
  if (typeof pattern !== 'string') throw new TypeError('Expected a string');
  return micromatch.braces(pattern, { ...options, expand: true });
};

/**
 * Expose micromatch
 */

module.exports = micromatch;


/***/ }),

/***/ "../node_modules/minimatch/minimatch.js":
/*!**********************************************!*\
  !*** ../node_modules/minimatch/minimatch.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = minimatch
minimatch.Minimatch = Minimatch

var path = { sep: '/' }
try {
  path = __webpack_require__(/*! path */ "../node_modules/path-browserify/index.js")
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
var expand = __webpack_require__(/*! brace-expansion */ "../node_modules/brace-expansion/index.js")

var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
}

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]'

// * => any number of characters
var star = qmark + '*?'

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!')

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/

minimatch.filter = filter
function filter (pattern, options) {
  options = options || {}
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {}
  b = b || {}
  var t = {}
  Object.keys(b).forEach(function (k) {
    t[k] = b[k]
  })
  Object.keys(a).forEach(function (k) {
    t[k] = a[k]
  })
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  }

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  }

  return m
}

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
}

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}
  pattern = pattern.trim()

  // windows support: need to use /, not \
  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/')
  }

  this.options = options
  this.set = []
  this.pattern = pattern
  this.regexp = null
  this.negate = false
  this.comment = false
  this.empty = false

  // make the set of regexps etc.
  this.make()
}

Minimatch.prototype.debug = function () {}

Minimatch.prototype.make = make
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern
  var options = this.options

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true
    return
  }
  if (!pattern) {
    this.empty = true
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate()

  // step 2: expand braces
  var set = this.globSet = this.braceExpand()

  if (options.debug) this.debug = console.error

  this.debug(this.pattern, set)

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  })

  this.debug(this.pattern, set)

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this)

  this.debug(this.pattern, set)

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  })

  this.debug(this.pattern, set)

  this.set = set
}

Minimatch.prototype.parseNegate = parseNegate
function parseNegate () {
  var pattern = this.pattern
  var negate = false
  var options = this.options
  var negateOffset = 0

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate
    negateOffset++
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset)
  this.negate = negate
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
}

Minimatch.prototype.braceExpand = braceExpand

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options
    } else {
      options = {}
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse
var SUBPARSE = {}
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = ''
  var hasMagic = !!options.nocase
  var escaping = false
  // ? => one single character
  var patternListStack = []
  var negativeLists = []
  var stateChar
  var inClass = false
  var reClassStart = -1
  var classStart = -1
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)'
  var self = this

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star
          hasMagic = true
        break
        case '?':
          re += qmark
          hasMagic = true
        break
        default:
          re += '\\' + stateChar
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re)
      stateChar = false
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c)

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c
      escaping = false
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar()
        escaping = true
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class')
          if (c === '!' && i === classStart + 1) c = '^'
          re += c
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar)
        clearStateChar()
        stateChar = c
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar()
      continue

      case '(':
        if (inClass) {
          re += '('
          continue
        }

        if (!stateChar) {
          re += '\\('
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        })
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
        this.debug('plType %j %j', stateChar, re)
        stateChar = false
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)'
          continue
        }

        clearStateChar()
        hasMagic = true
        var pl = patternListStack.pop()
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close
        if (pl.type === '!') {
          negativeLists.push(pl)
        }
        pl.reEnd = re.length
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|'
          escaping = false
          continue
        }

        clearStateChar()
        re += '|'
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar()

        if (inClass) {
          re += '\\' + c
          continue
        }

        inClass = true
        classStart = i
        reClassStart = re.length
        re += c
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c
          escaping = false
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i)
          try {
            RegExp('[' + cs + ']')
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE)
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
            hasMagic = hasMagic || sp[1]
            inClass = false
            continue
          }
        }

        // finish up the class.
        hasMagic = true
        inClass = false
        re += c
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar()

        if (escaping) {
          // no need
          escaping = false
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\'
        }

        re += c

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1)
    sp = this.parse(cs, SUBPARSE)
    re = re.substr(0, reClassStart) + '\\[' + sp[0]
    hasMagic = hasMagic || sp[1]
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length)
    this.debug('setting tail', re, pl)
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\'
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    })

    this.debug('tail=%j\n   %s', tail, tail, pl, re)
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type

    hasMagic = true
    re = re.slice(0, pl.reStart) + t + '\\(' + tail
  }

  // handle trailing things that only matter at the very end.
  clearStateChar()
  if (escaping) {
    // trailing \\
    re += '\\\\'
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n]

    var nlBefore = re.slice(0, nl.reStart)
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
    var nlAfter = re.slice(nl.reEnd)

    nlLast += nlAfter

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1
    var cleanAfter = nlAfter
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
    }
    nlAfter = cleanAfter

    var dollar = ''
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$'
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
    re = newRe
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re
  }

  if (addPatternStart) {
    re = patternStart + re
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : ''
  try {
    var regExp = new RegExp('^' + re + '$', flags)
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern
  regExp._src = re

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
}

Minimatch.prototype.makeRe = makeRe
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set

  if (!set.length) {
    this.regexp = false
    return this.regexp
  }
  var options = this.options

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot
  var flags = options.nocase ? 'i' : ''

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|')

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$'

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$'

  try {
    this.regexp = new RegExp(re, flags)
  } catch (ex) {
    this.regexp = false
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {}
  var mm = new Minimatch(pattern, options)
  list = list.filter(function (f) {
    return mm.match(f)
  })
  if (mm.options.nonull && !list.length) {
    list.push(pattern)
  }
  return list
}

Minimatch.prototype.match = match
function match (f, partial) {
  this.debug('match', f, this.pattern)
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options

  // windows: need to use /, not \
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/')
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit)
  this.debug(this.pattern, 'split', f)

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set
  this.debug(this.pattern, 'set', set)

  // Find the basename of the path by looking for the last non-empty segment
  var filename
  var i
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i]
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i]
    var file = f
    if (options.matchBase && pattern.length === 1) {
      file = [filename]
    }
    var hit = this.matchOne(file, pattern, partial)
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern })

  this.debug('matchOne', file.length, pattern.length)

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop')
    var p = pattern[pi]
    var f = file[fi]

    this.debug(pattern, p, f)

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f])

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi
      var pr = pi + 1
      if (pr === pl) {
        this.debug('** at the end')
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr]

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee)
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr)
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue')
          fr++
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase()
      } else {
        hit = f === p
      }
      this.debug('string match', p, f, hit)
    } else {
      hit = f.match(p)
      this.debug('pattern match', p, f, hit)
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
}

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


/***/ }),

/***/ "../node_modules/param-case/dist.es2015/index.js":
/*!*******************************************************!*\
  !*** ../node_modules/param-case/dist.es2015/index.js ***!
  \*******************************************************/
/*! exports provided: paramCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paramCase", function() { return paramCase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var dot_case__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dot-case */ "../node_modules/param-case/node_modules/dot-case/dist.es2015/index.js");


function paramCase(input, options) {
    if (options === void 0) { options = {}; }
    return Object(dot_case__WEBPACK_IMPORTED_MODULE_1__["dotCase"])(input, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ delimiter: "-" }, options));
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../node_modules/param-case/node_modules/dot-case/dist.es2015/index.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/param-case/node_modules/dot-case/dist.es2015/index.js ***!
  \*****************************************************************************/
/*! exports provided: dotCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dotCase", function() { return dotCase; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var no_case__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! no-case */ "../node_modules/param-case/node_modules/no-case/dist.es2015/index.js");


function dotCase(input, options) {
    if (options === void 0) { options = {}; }
    return Object(no_case__WEBPACK_IMPORTED_MODULE_1__["noCase"])(input, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ delimiter: "." }, options));
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../node_modules/param-case/node_modules/lower-case/dist.es2015/index.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/param-case/node_modules/lower-case/dist.es2015/index.js ***!
  \*******************************************************************************/
/*! exports provided: localeLowerCase, lowerCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "localeLowerCase", function() { return localeLowerCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lowerCase", function() { return lowerCase; });
/**
 * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
 */
var SUPPORTED_LOCALE = {
    tr: {
        regexp: /\u0130|\u0049|\u0049\u0307/g,
        map: {
            İ: "\u0069",
            I: "\u0131",
            İ: "\u0069"
        }
    },
    az: {
        regexp: /\u0130/g,
        map: {
            İ: "\u0069",
            I: "\u0131",
            İ: "\u0069"
        }
    },
    lt: {
        regexp: /\u0049|\u004A|\u012E|\u00CC|\u00CD|\u0128/g,
        map: {
            I: "\u0069\u0307",
            J: "\u006A\u0307",
            Į: "\u012F\u0307",
            Ì: "\u0069\u0307\u0300",
            Í: "\u0069\u0307\u0301",
            Ĩ: "\u0069\u0307\u0303"
        }
    }
};
/**
 * Localized lower case.
 */
function localeLowerCase(str, locale) {
    var lang = SUPPORTED_LOCALE[locale.toLowerCase()];
    if (lang)
        return lowerCase(str.replace(lang.regexp, function (m) { return lang.map[m]; }));
    return lowerCase(str);
}
/**
 * Lower case as a function.
 */
function lowerCase(str) {
    return str.toLowerCase();
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../node_modules/param-case/node_modules/no-case/dist.es2015/index.js":
/*!****************************************************************************!*\
  !*** ../node_modules/param-case/node_modules/no-case/dist.es2015/index.js ***!
  \****************************************************************************/
/*! exports provided: noCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noCase", function() { return noCase; });
/* harmony import */ var lower_case__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lower-case */ "../node_modules/param-case/node_modules/lower-case/dist.es2015/index.js");

// Support camel case ("camelCase" -> "camel Case" and "CAMELCase" -> "CAMEL Case").
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
// Remove all non-word characters.
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
/**
 * Normalize the string into something other libraries can manipulate easier.
 */
function noCase(input, options) {
    if (options === void 0) { options = {}; }
    var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lower_case__WEBPACK_IMPORTED_MODULE_0__["lowerCase"] : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
    var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
    var start = 0;
    var end = result.length;
    // Trim the delimiter from around the output string.
    while (result.charAt(start) === "\0")
        start++;
    while (result.charAt(end - 1) === "\0")
        end--;
    // Transform each token independently.
    return result
        .slice(start, end)
        .split("\0")
        .map(transform)
        .join(delimiter);
}
/**
 * Replace `re` in the input string with the replacement value.
 */
function replace(input, re, value) {
    if (re instanceof RegExp)
        return input.replace(re, value);
    return re.reduce(function (input, re) { return input.replace(re, value); }, input);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../node_modules/path-browserify/index.js":
/*!************************************************!*\
  !*** ../node_modules/path-browserify/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

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

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "../node_modules/process/browser.js")))

/***/ }),

/***/ "../node_modules/picomatch/index.js":
/*!******************************************!*\
  !*** ../node_modules/picomatch/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./lib/picomatch */ "../node_modules/picomatch/lib/picomatch.js");


/***/ }),

/***/ "../node_modules/picomatch/lib/constants.js":
/*!**************************************************!*\
  !*** ../node_modules/picomatch/lib/constants.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const path = __webpack_require__(/*! path */ "../node_modules/path-browserify/index.js");
const WIN_SLASH = '\\\\/';
const WIN_NO_SLASH = `[^${WIN_SLASH}]`;

/**
 * Posix glob regex
 */

const DOT_LITERAL = '\\.';
const PLUS_LITERAL = '\\+';
const QMARK_LITERAL = '\\?';
const SLASH_LITERAL = '\\/';
const ONE_CHAR = '(?=.)';
const QMARK = '[^/]';
const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
const NO_DOT = `(?!${DOT_LITERAL})`;
const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
const STAR = `${QMARK}*?`;

const POSIX_CHARS = {
  DOT_LITERAL,
  PLUS_LITERAL,
  QMARK_LITERAL,
  SLASH_LITERAL,
  ONE_CHAR,
  QMARK,
  END_ANCHOR,
  DOTS_SLASH,
  NO_DOT,
  NO_DOTS,
  NO_DOT_SLASH,
  NO_DOTS_SLASH,
  QMARK_NO_DOT,
  STAR,
  START_ANCHOR
};

/**
 * Windows glob regex
 */

const WINDOWS_CHARS = {
  ...POSIX_CHARS,

  SLASH_LITERAL: `[${WIN_SLASH}]`,
  QMARK: WIN_NO_SLASH,
  STAR: `${WIN_NO_SLASH}*?`,
  DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
  NO_DOT: `(?!${DOT_LITERAL})`,
  NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
  NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
  START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
  END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
};

/**
 * POSIX Bracket Regex
 */

const POSIX_REGEX_SOURCE = {
  alnum: 'a-zA-Z0-9',
  alpha: 'a-zA-Z',
  ascii: '\\x00-\\x7F',
  blank: ' \\t',
  cntrl: '\\x00-\\x1F\\x7F',
  digit: '0-9',
  graph: '\\x21-\\x7E',
  lower: 'a-z',
  print: '\\x20-\\x7E ',
  punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
  space: ' \\t\\r\\n\\v\\f',
  upper: 'A-Z',
  word: 'A-Za-z0-9_',
  xdigit: 'A-Fa-f0-9'
};

module.exports = {
  MAX_LENGTH: 1024 * 64,
  POSIX_REGEX_SOURCE,

  // regular expressions
  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,

  // Replace globs with equivalent patterns to reduce parsing time.
  REPLACEMENTS: {
    '***': '*',
    '**/**': '**',
    '**/**/**': '**'
  },

  // Digits
  CHAR_0: 48, /* 0 */
  CHAR_9: 57, /* 9 */

  // Alphabet chars.
  CHAR_UPPERCASE_A: 65, /* A */
  CHAR_LOWERCASE_A: 97, /* a */
  CHAR_UPPERCASE_Z: 90, /* Z */
  CHAR_LOWERCASE_Z: 122, /* z */

  CHAR_LEFT_PARENTHESES: 40, /* ( */
  CHAR_RIGHT_PARENTHESES: 41, /* ) */

  CHAR_ASTERISK: 42, /* * */

  // Non-alphabetic chars.
  CHAR_AMPERSAND: 38, /* & */
  CHAR_AT: 64, /* @ */
  CHAR_BACKWARD_SLASH: 92, /* \ */
  CHAR_CARRIAGE_RETURN: 13, /* \r */
  CHAR_CIRCUMFLEX_ACCENT: 94, /* ^ */
  CHAR_COLON: 58, /* : */
  CHAR_COMMA: 44, /* , */
  CHAR_DOT: 46, /* . */
  CHAR_DOUBLE_QUOTE: 34, /* " */
  CHAR_EQUAL: 61, /* = */
  CHAR_EXCLAMATION_MARK: 33, /* ! */
  CHAR_FORM_FEED: 12, /* \f */
  CHAR_FORWARD_SLASH: 47, /* / */
  CHAR_GRAVE_ACCENT: 96, /* ` */
  CHAR_HASH: 35, /* # */
  CHAR_HYPHEN_MINUS: 45, /* - */
  CHAR_LEFT_ANGLE_BRACKET: 60, /* < */
  CHAR_LEFT_CURLY_BRACE: 123, /* { */
  CHAR_LEFT_SQUARE_BRACKET: 91, /* [ */
  CHAR_LINE_FEED: 10, /* \n */
  CHAR_NO_BREAK_SPACE: 160, /* \u00A0 */
  CHAR_PERCENT: 37, /* % */
  CHAR_PLUS: 43, /* + */
  CHAR_QUESTION_MARK: 63, /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: 62, /* > */
  CHAR_RIGHT_CURLY_BRACE: 125, /* } */
  CHAR_RIGHT_SQUARE_BRACKET: 93, /* ] */
  CHAR_SEMICOLON: 59, /* ; */
  CHAR_SINGLE_QUOTE: 39, /* ' */
  CHAR_SPACE: 32, /*   */
  CHAR_TAB: 9, /* \t */
  CHAR_UNDERSCORE: 95, /* _ */
  CHAR_VERTICAL_LINE: 124, /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, /* \uFEFF */

  SEP: path.sep,

  /**
   * Create EXTGLOB_CHARS
   */

  extglobChars(chars) {
    return {
      '!': { type: 'negate', open: '(?:(?!(?:', close: `))${chars.STAR})` },
      '?': { type: 'qmark', open: '(?:', close: ')?' },
      '+': { type: 'plus', open: '(?:', close: ')+' },
      '*': { type: 'star', open: '(?:', close: ')*' },
      '@': { type: 'at', open: '(?:', close: ')' }
    };
  },

  /**
   * Create GLOB_CHARS
   */

  globChars(win32) {
    return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
  }
};


/***/ }),

/***/ "../node_modules/picomatch/lib/parse.js":
/*!**********************************************!*\
  !*** ../node_modules/picomatch/lib/parse.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const constants = __webpack_require__(/*! ./constants */ "../node_modules/picomatch/lib/constants.js");
const utils = __webpack_require__(/*! ./utils */ "../node_modules/picomatch/lib/utils.js");

/**
 * Constants
 */

const {
  MAX_LENGTH,
  POSIX_REGEX_SOURCE,
  REGEX_NON_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_BACKREF,
  REPLACEMENTS
} = constants;

/**
 * Helpers
 */

const expandRange = (args, options) => {
  if (typeof options.expandRange === 'function') {
    return options.expandRange(...args, options);
  }

  args.sort();
  const value = `[${args.join('-')}]`;

  try {
    /* eslint-disable-next-line no-new */
    new RegExp(value);
  } catch (ex) {
    return args.map(v => utils.escapeRegex(v)).join('..');
  }

  return value;
};

/**
 * Create the message for a syntax error
 */

const syntaxError = (type, char) => {
  return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
};

/**
 * Parse the given input string.
 * @param {String} input
 * @param {Object} options
 * @return {Object}
 */

const parse = (input, options) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  input = REPLACEMENTS[input] || input;

  const opts = { ...options };
  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;

  let len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }

  const bos = { type: 'bos', value: '', output: opts.prepend || '' };
  const tokens = [bos];

  const capture = opts.capture ? '' : '?:';
  const win32 = utils.isWindows(options);

  // create constants based on platform, for windows or posix
  const PLATFORM_CHARS = constants.globChars(win32);
  const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);

  const {
    DOT_LITERAL,
    PLUS_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOT_SLASH,
    NO_DOTS_SLASH,
    QMARK,
    QMARK_NO_DOT,
    STAR,
    START_ANCHOR
  } = PLATFORM_CHARS;

  const globstar = (opts) => {
    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
  };

  const nodot = opts.dot ? '' : NO_DOT;
  const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
  let star = opts.bash === true ? globstar(opts) : STAR;

  if (opts.capture) {
    star = `(${star})`;
  }

  // minimatch options support
  if (typeof opts.noext === 'boolean') {
    opts.noextglob = opts.noext;
  }

  const state = {
    input,
    index: -1,
    start: 0,
    dot: opts.dot === true,
    consumed: '',
    output: '',
    prefix: '',
    backtrack: false,
    negated: false,
    brackets: 0,
    braces: 0,
    parens: 0,
    quotes: 0,
    globstar: false,
    tokens
  };

  input = utils.removePrefix(input, state);
  len = input.length;

  const extglobs = [];
  const braces = [];
  const stack = [];
  let prev = bos;
  let value;

  /**
   * Tokenizing helpers
   */

  const eos = () => state.index === len - 1;
  const peek = state.peek = (n = 1) => input[state.index + n];
  const advance = state.advance = () => input[++state.index];
  const remaining = () => input.slice(state.index + 1);
  const consume = (value = '', num = 0) => {
    state.consumed += value;
    state.index += num;
  };
  const append = token => {
    state.output += token.output != null ? token.output : token.value;
    consume(token.value);
  };

  const negate = () => {
    let count = 1;

    while (peek() === '!' && (peek(2) !== '(' || peek(3) === '?')) {
      advance();
      state.start++;
      count++;
    }

    if (count % 2 === 0) {
      return false;
    }

    state.negated = true;
    state.start++;
    return true;
  };

  const increment = type => {
    state[type]++;
    stack.push(type);
  };

  const decrement = type => {
    state[type]--;
    stack.pop();
  };

  /**
   * Push tokens onto the tokens array. This helper speeds up
   * tokenizing by 1) helping us avoid backtracking as much as possible,
   * and 2) helping us avoid creating extra tokens when consecutive
   * characters are plain text. This improves performance and simplifies
   * lookbehinds.
   */

  const push = tok => {
    if (prev.type === 'globstar') {
      const isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace');
      const isExtglob = tok.extglob === true || (extglobs.length && (tok.type === 'pipe' || tok.type === 'paren'));

      if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = 'star';
        prev.value = '*';
        prev.output = star;
        state.output += prev.output;
      }
    }

    if (extglobs.length && tok.type !== 'paren' && !EXTGLOB_CHARS[tok.value]) {
      extglobs[extglobs.length - 1].inner += tok.value;
    }

    if (tok.value || tok.output) append(tok);
    if (prev && prev.type === 'text' && tok.type === 'text') {
      prev.value += tok.value;
      prev.output = (prev.output || '') + tok.value;
      return;
    }

    tok.prev = prev;
    tokens.push(tok);
    prev = tok;
  };

  const extglobOpen = (type, value) => {
    const token = { ...EXTGLOB_CHARS[value], conditions: 1, inner: '' };

    token.prev = prev;
    token.parens = state.parens;
    token.output = state.output;
    const output = (opts.capture ? '(' : '') + token.open;

    increment('parens');
    push({ type, value, output: state.output ? '' : ONE_CHAR });
    push({ type: 'paren', extglob: true, value: advance(), output });
    extglobs.push(token);
  };

  const extglobClose = token => {
    let output = token.close + (opts.capture ? ')' : '');

    if (token.type === 'negate') {
      let extglobStar = star;

      if (token.inner && token.inner.length > 1 && token.inner.includes('/')) {
        extglobStar = globstar(opts);
      }

      if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
        output = token.close = `)$))${extglobStar}`;
      }

      if (token.prev.type === 'bos' && eos()) {
        state.negatedExtglob = true;
      }
    }

    push({ type: 'paren', extglob: true, value, output });
    decrement('parens');
  };

  /**
   * Fast paths
   */

  if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
    let backslashes = false;

    let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
      if (first === '\\') {
        backslashes = true;
        return m;
      }

      if (first === '?') {
        if (esc) {
          return esc + first + (rest ? QMARK.repeat(rest.length) : '');
        }
        if (index === 0) {
          return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '');
        }
        return QMARK.repeat(chars.length);
      }

      if (first === '.') {
        return DOT_LITERAL.repeat(chars.length);
      }

      if (first === '*') {
        if (esc) {
          return esc + first + (rest ? star : '');
        }
        return star;
      }
      return esc ? m : `\\${m}`;
    });

    if (backslashes === true) {
      if (opts.unescape === true) {
        output = output.replace(/\\/g, '');
      } else {
        output = output.replace(/\\+/g, m => {
          return m.length % 2 === 0 ? '\\\\' : (m ? '\\' : '');
        });
      }
    }

    if (output === input && opts.contains === true) {
      state.output = input;
      return state;
    }

    state.output = utils.wrapOutput(output, state, options);
    return state;
  }

  /**
   * Tokenize input until we reach end-of-string
   */

  while (!eos()) {
    value = advance();

    if (value === '\u0000') {
      continue;
    }

    /**
     * Escaped characters
     */

    if (value === '\\') {
      const next = peek();

      if (next === '/' && opts.bash !== true) {
        continue;
      }

      if (next === '.' || next === ';') {
        continue;
      }

      if (!next) {
        value += '\\';
        push({ type: 'text', value });
        continue;
      }

      // collapse slashes to reduce potential for exploits
      const match = /^\\+/.exec(remaining());
      let slashes = 0;

      if (match && match[0].length > 2) {
        slashes = match[0].length;
        state.index += slashes;
        if (slashes % 2 !== 0) {
          value += '\\';
        }
      }

      if (opts.unescape === true) {
        value = advance() || '';
      } else {
        value += advance() || '';
      }

      if (state.brackets === 0) {
        push({ type: 'text', value });
        continue;
      }
    }

    /**
     * If we're inside a regex character class, continue
     * until we reach the closing bracket.
     */

    if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
      if (opts.posix !== false && value === ':') {
        const inner = prev.value.slice(1);
        if (inner.includes('[')) {
          prev.posix = true;

          if (inner.includes(':')) {
            const idx = prev.value.lastIndexOf('[');
            const pre = prev.value.slice(0, idx);
            const rest = prev.value.slice(idx + 2);
            const posix = POSIX_REGEX_SOURCE[rest];
            if (posix) {
              prev.value = pre + posix;
              state.backtrack = true;
              advance();

              if (!bos.output && tokens.indexOf(prev) === 1) {
                bos.output = ONE_CHAR;
              }
              continue;
            }
          }
        }
      }

      if ((value === '[' && peek() !== ':') || (value === '-' && peek() === ']')) {
        value = `\\${value}`;
      }

      if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
        value = `\\${value}`;
      }

      if (opts.posix === true && value === '!' && prev.value === '[') {
        value = '^';
      }

      prev.value += value;
      append({ value });
      continue;
    }

    /**
     * If we're inside a quoted string, continue
     * until we reach the closing double quote.
     */

    if (state.quotes === 1 && value !== '"') {
      value = utils.escapeRegex(value);
      prev.value += value;
      append({ value });
      continue;
    }

    /**
     * Double quotes
     */

    if (value === '"') {
      state.quotes = state.quotes === 1 ? 0 : 1;
      if (opts.keepQuotes === true) {
        push({ type: 'text', value });
      }
      continue;
    }

    /**
     * Parentheses
     */

    if (value === '(') {
      increment('parens');
      push({ type: 'paren', value });
      continue;
    }

    if (value === ')') {
      if (state.parens === 0 && opts.strictBrackets === true) {
        throw new SyntaxError(syntaxError('opening', '('));
      }

      const extglob = extglobs[extglobs.length - 1];
      if (extglob && state.parens === extglob.parens + 1) {
        extglobClose(extglobs.pop());
        continue;
      }

      push({ type: 'paren', value, output: state.parens ? ')' : '\\)' });
      decrement('parens');
      continue;
    }

    /**
     * Square brackets
     */

    if (value === '[') {
      if (opts.nobracket === true || !remaining().includes(']')) {
        if (opts.nobracket !== true && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('closing', ']'));
        }

        value = `\\${value}`;
      } else {
        increment('brackets');
      }

      push({ type: 'bracket', value });
      continue;
    }

    if (value === ']') {
      if (opts.nobracket === true || (prev && prev.type === 'bracket' && prev.value.length === 1)) {
        push({ type: 'text', value, output: `\\${value}` });
        continue;
      }

      if (state.brackets === 0) {
        if (opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('opening', '['));
        }

        push({ type: 'text', value, output: `\\${value}` });
        continue;
      }

      decrement('brackets');

      const prevValue = prev.value.slice(1);
      if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
        value = `/${value}`;
      }

      prev.value += value;
      append({ value });

      // when literal brackets are explicitly disabled
      // assume we should match with a regex character class
      if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
        continue;
      }

      const escaped = utils.escapeRegex(prev.value);
      state.output = state.output.slice(0, -prev.value.length);

      // when literal brackets are explicitly enabled
      // assume we should escape the brackets to match literal characters
      if (opts.literalBrackets === true) {
        state.output += escaped;
        prev.value = escaped;
        continue;
      }

      // when the user specifies nothing, try to match both
      prev.value = `(${capture}${escaped}|${prev.value})`;
      state.output += prev.value;
      continue;
    }

    /**
     * Braces
     */

    if (value === '{' && opts.nobrace !== true) {
      increment('braces');

      const open = {
        type: 'brace',
        value,
        output: '(',
        outputIndex: state.output.length,
        tokensIndex: state.tokens.length
      };

      braces.push(open);
      push(open);
      continue;
    }

    if (value === '}') {
      const brace = braces[braces.length - 1];

      if (opts.nobrace === true || !brace) {
        push({ type: 'text', value, output: value });
        continue;
      }

      let output = ')';

      if (brace.dots === true) {
        const arr = tokens.slice();
        const range = [];

        for (let i = arr.length - 1; i >= 0; i--) {
          tokens.pop();
          if (arr[i].type === 'brace') {
            break;
          }
          if (arr[i].type !== 'dots') {
            range.unshift(arr[i].value);
          }
        }

        output = expandRange(range, opts);
        state.backtrack = true;
      }

      if (brace.comma !== true && brace.dots !== true) {
        const out = state.output.slice(0, brace.outputIndex);
        const toks = state.tokens.slice(brace.tokensIndex);
        brace.value = brace.output = '\\{';
        value = output = '\\}';
        state.output = out;
        for (const t of toks) {
          state.output += (t.output || t.value);
        }
      }

      push({ type: 'brace', value, output });
      decrement('braces');
      braces.pop();
      continue;
    }

    /**
     * Pipes
     */

    if (value === '|') {
      if (extglobs.length > 0) {
        extglobs[extglobs.length - 1].conditions++;
      }
      push({ type: 'text', value });
      continue;
    }

    /**
     * Commas
     */

    if (value === ',') {
      let output = value;

      const brace = braces[braces.length - 1];
      if (brace && stack[stack.length - 1] === 'braces') {
        brace.comma = true;
        output = '|';
      }

      push({ type: 'comma', value, output });
      continue;
    }

    /**
     * Slashes
     */

    if (value === '/') {
      // if the beginning of the glob is "./", advance the start
      // to the current index, and don't add the "./" characters
      // to the state. This greatly simplifies lookbehinds when
      // checking for BOS characters like "!" and "." (not "./")
      if (prev.type === 'dot' && state.index === state.start + 1) {
        state.start = state.index + 1;
        state.consumed = '';
        state.output = '';
        tokens.pop();
        prev = bos; // reset "prev" to the first token
        continue;
      }

      push({ type: 'slash', value, output: SLASH_LITERAL });
      continue;
    }

    /**
     * Dots
     */

    if (value === '.') {
      if (state.braces > 0 && prev.type === 'dot') {
        if (prev.value === '.') prev.output = DOT_LITERAL;
        const brace = braces[braces.length - 1];
        prev.type = 'dots';
        prev.output += value;
        prev.value += value;
        brace.dots = true;
        continue;
      }

      if ((state.braces + state.parens) === 0 && prev.type !== 'bos' && prev.type !== 'slash') {
        push({ type: 'text', value, output: DOT_LITERAL });
        continue;
      }

      push({ type: 'dot', value, output: DOT_LITERAL });
      continue;
    }

    /**
     * Question marks
     */

    if (value === '?') {
      const isGroup = prev && prev.value === '(';
      if (!isGroup && opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('qmark', value);
        continue;
      }

      if (prev && prev.type === 'paren') {
        const next = peek();
        let output = value;

        if (next === '<' && !utils.supportsLookbehinds()) {
          throw new Error('Node.js v10 or higher is required for regex lookbehinds');
        }

        if ((prev.value === '(' && !/[!=<:]/.test(next)) || (next === '<' && !/<([!=]|\w+>)/.test(remaining()))) {
          output = `\\${value}`;
        }

        push({ type: 'text', value, output });
        continue;
      }

      if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
        push({ type: 'qmark', value, output: QMARK_NO_DOT });
        continue;
      }

      push({ type: 'qmark', value, output: QMARK });
      continue;
    }

    /**
     * Exclamation
     */

    if (value === '!') {
      if (opts.noextglob !== true && peek() === '(') {
        if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
          extglobOpen('negate', value);
          continue;
        }
      }

      if (opts.nonegate !== true && state.index === 0) {
        negate();
        continue;
      }
    }

    /**
     * Plus
     */

    if (value === '+') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('plus', value);
        continue;
      }

      if ((prev && prev.value === '(') || opts.regex === false) {
        push({ type: 'plus', value, output: PLUS_LITERAL });
        continue;
      }

      if ((prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) || state.parens > 0) {
        push({ type: 'plus', value });
        continue;
      }

      push({ type: 'plus', value: PLUS_LITERAL });
      continue;
    }

    /**
     * Plain text
     */

    if (value === '@') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        push({ type: 'at', extglob: true, value, output: '' });
        continue;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Plain text
     */

    if (value !== '*') {
      if (value === '$' || value === '^') {
        value = `\\${value}`;
      }

      const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
      if (match) {
        value += match[0];
        state.index += match[0].length;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Stars
     */

    if (prev && (prev.type === 'globstar' || prev.star === true)) {
      prev.type = 'star';
      prev.star = true;
      prev.value += value;
      prev.output = star;
      state.backtrack = true;
      state.globstar = true;
      consume(value);
      continue;
    }

    let rest = remaining();
    if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
      extglobOpen('star', value);
      continue;
    }

    if (prev.type === 'star') {
      if (opts.noglobstar === true) {
        consume(value);
        continue;
      }

      const prior = prev.prev;
      const before = prior.prev;
      const isStart = prior.type === 'slash' || prior.type === 'bos';
      const afterStar = before && (before.type === 'star' || before.type === 'globstar');

      if (opts.bash === true && (!isStart || (rest[0] && rest[0] !== '/'))) {
        push({ type: 'star', value, output: '' });
        continue;
      }

      const isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace');
      const isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren');
      if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
        push({ type: 'star', value, output: '' });
        continue;
      }

      // strip consecutive `/**/`
      while (rest.slice(0, 3) === '/**') {
        const after = input[state.index + 4];
        if (after && after !== '/') {
          break;
        }
        rest = rest.slice(3);
        consume('/**', 3);
      }

      if (prior.type === 'bos' && eos()) {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = globstar(opts);
        state.output = prev.output;
        state.globstar = true;
        consume(value);
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;

        prev.type = 'globstar';
        prev.output = globstar(opts) + (opts.strictSlashes ? ')' : '|$)');
        prev.value += value;
        state.globstar = true;
        state.output += prior.output + prev.output;
        consume(value);
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && rest[0] === '/') {
        const end = rest[1] !== void 0 ? '|$' : '';

        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;

        prev.type = 'globstar';
        prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
        prev.value += value;

        state.output += prior.output + prev.output;
        state.globstar = true;

        consume(value + advance());

        push({ type: 'slash', value: '/', output: '' });
        continue;
      }

      if (prior.type === 'bos' && rest[0] === '/') {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
        state.output = prev.output;
        state.globstar = true;
        consume(value + advance());
        push({ type: 'slash', value: '/', output: '' });
        continue;
      }

      // remove single star from output
      state.output = state.output.slice(0, -prev.output.length);

      // reset previous token to globstar
      prev.type = 'globstar';
      prev.output = globstar(opts);
      prev.value += value;

      // reset output with globstar
      state.output += prev.output;
      state.globstar = true;
      consume(value);
      continue;
    }

    const token = { type: 'star', value, output: star };

    if (opts.bash === true) {
      token.output = '.*?';
      if (prev.type === 'bos' || prev.type === 'slash') {
        token.output = nodot + token.output;
      }
      push(token);
      continue;
    }

    if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
      token.output = value;
      push(token);
      continue;
    }

    if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
      if (prev.type === 'dot') {
        state.output += NO_DOT_SLASH;
        prev.output += NO_DOT_SLASH;

      } else if (opts.dot === true) {
        state.output += NO_DOTS_SLASH;
        prev.output += NO_DOTS_SLASH;

      } else {
        state.output += nodot;
        prev.output += nodot;
      }

      if (peek() !== '*') {
        state.output += ONE_CHAR;
        prev.output += ONE_CHAR;
      }
    }

    push(token);
  }

  while (state.brackets > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ']'));
    state.output = utils.escapeLast(state.output, '[');
    decrement('brackets');
  }

  while (state.parens > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ')'));
    state.output = utils.escapeLast(state.output, '(');
    decrement('parens');
  }

  while (state.braces > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', '}'));
    state.output = utils.escapeLast(state.output, '{');
    decrement('braces');
  }

  if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
    push({ type: 'maybe_slash', value: '', output: `${SLASH_LITERAL}?` });
  }

  // rebuild the output if we had to backtrack at any point
  if (state.backtrack === true) {
    state.output = '';

    for (const token of state.tokens) {
      state.output += token.output != null ? token.output : token.value;

      if (token.suffix) {
        state.output += token.suffix;
      }
    }
  }

  return state;
};

/**
 * Fast paths for creating regular expressions for common glob patterns.
 * This can significantly speed up processing and has very little downside
 * impact when none of the fast paths match.
 */

parse.fastpaths = (input, options) => {
  const opts = { ...options };
  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  const len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }

  input = REPLACEMENTS[input] || input;
  const win32 = utils.isWindows(options);

  // create constants based on platform, for windows or posix
  const {
    DOT_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOTS,
    NO_DOTS_SLASH,
    STAR,
    START_ANCHOR
  } = constants.globChars(win32);

  const nodot = opts.dot ? NO_DOTS : NO_DOT;
  const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
  const capture = opts.capture ? '' : '?:';
  const state = { negated: false, prefix: '' };
  let star = opts.bash === true ? '.*?' : STAR;

  if (opts.capture) {
    star = `(${star})`;
  }

  const globstar = (opts) => {
    if (opts.noglobstar === true) return star;
    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
  };

  const create = str => {
    switch (str) {
      case '*':
        return `${nodot}${ONE_CHAR}${star}`;

      case '.*':
        return `${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '*.*':
        return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '*/*':
        return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;

      case '**':
        return nodot + globstar(opts);

      case '**/*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;

      case '**/*.*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '**/.*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;

      default: {
        const match = /^(.*?)\.(\w+)$/.exec(str);
        if (!match) return;

        const source = create(match[1]);
        if (!source) return;

        return source + DOT_LITERAL + match[2];
      }
    }
  };

  const output = utils.removePrefix(input, state);
  let source = create(output);

  if (source && opts.strictSlashes !== true) {
    source += `${SLASH_LITERAL}?`;
  }

  return source;
};

module.exports = parse;


/***/ }),

/***/ "../node_modules/picomatch/lib/picomatch.js":
/*!**************************************************!*\
  !*** ../node_modules/picomatch/lib/picomatch.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const path = __webpack_require__(/*! path */ "../node_modules/path-browserify/index.js");
const scan = __webpack_require__(/*! ./scan */ "../node_modules/picomatch/lib/scan.js");
const parse = __webpack_require__(/*! ./parse */ "../node_modules/picomatch/lib/parse.js");
const utils = __webpack_require__(/*! ./utils */ "../node_modules/picomatch/lib/utils.js");
const constants = __webpack_require__(/*! ./constants */ "../node_modules/picomatch/lib/constants.js");
const isObject = val => val && typeof val === 'object' && !Array.isArray(val);

/**
 * Creates a matcher function from one or more glob patterns. The
 * returned function takes a string to match as its first argument,
 * and returns true if the string is a match. The returned matcher
 * function also takes a boolean as the second argument that, when true,
 * returns an object with additional information.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch(glob[, options]);
 *
 * const isMatch = picomatch('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @name picomatch
 * @param {String|Array} `globs` One or more glob patterns.
 * @param {Object=} `options`
 * @return {Function=} Returns a matcher function.
 * @api public
 */

const picomatch = (glob, options, returnState = false) => {
  if (Array.isArray(glob)) {
    const fns = glob.map(input => picomatch(input, options, returnState));
    const arrayMatcher = str => {
      for (const isMatch of fns) {
        const state = isMatch(str);
        if (state) return state;
      }
      return false;
    };
    return arrayMatcher;
  }

  const isState = isObject(glob) && glob.tokens && glob.input;

  if (glob === '' || (typeof glob !== 'string' && !isState)) {
    throw new TypeError('Expected pattern to be a non-empty string');
  }

  const opts = options || {};
  const posix = utils.isWindows(options);
  const regex = isState
    ? picomatch.compileRe(glob, options)
    : picomatch.makeRe(glob, options, false, true);

  const state = regex.state;
  delete regex.state;

  let isIgnored = () => false;
  if (opts.ignore) {
    const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
    isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
  }

  const matcher = (input, returnObject = false) => {
    const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix });
    const result = { glob, state, regex, posix, input, output, match, isMatch };

    if (typeof opts.onResult === 'function') {
      opts.onResult(result);
    }

    if (isMatch === false) {
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (isIgnored(input)) {
      if (typeof opts.onIgnore === 'function') {
        opts.onIgnore(result);
      }
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (typeof opts.onMatch === 'function') {
      opts.onMatch(result);
    }
    return returnObject ? result : true;
  };

  if (returnState) {
    matcher.state = state;
  }

  return matcher;
};

/**
 * Test `input` with the given `regex`. This is used by the main
 * `picomatch()` function to test the input string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.test(input, regex[, options]);
 *
 * console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
 * // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp} `regex`
 * @return {Object} Returns an object with matching info.
 * @api public
 */

picomatch.test = (input, regex, options, { glob, posix } = {}) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected input to be a string');
  }

  if (input === '') {
    return { isMatch: false, output: '' };
  }

  const opts = options || {};
  const format = opts.format || (posix ? utils.toPosixSlashes : null);
  let match = input === glob;
  let output = (match && format) ? format(input) : input;

  if (match === false) {
    output = format ? format(input) : input;
    match = output === glob;
  }

  if (match === false || opts.capture === true) {
    if (opts.matchBase === true || opts.basename === true) {
      match = picomatch.matchBase(input, regex, options, posix);
    } else {
      match = regex.exec(output);
    }
  }

  return { isMatch: Boolean(match), match, output };
};

/**
 * Match the basename of a filepath.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.matchBase(input, glob[, options]);
 * console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
 * @return {Boolean}
 * @api public
 */

picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
  const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
  return regex.test(path.basename(input));
};

/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.isMatch(string, patterns[, options]);
 *
 * console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String|Array} str The string to test.
 * @param {String|Array} patterns One or more glob patterns to use for matching.
 * @param {Object} [options] See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);

/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const result = picomatch.parse(pattern[, options]);
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as a regex source string.
 * @api public
 */

picomatch.parse = (pattern, options) => {
  if (Array.isArray(pattern)) return pattern.map(p => picomatch.parse(p, options));
  return parse(pattern, { ...options, fastpaths: false });
};

/**
 * Scan a glob pattern to separate the pattern into segments.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.scan(input[, options]);
 *
 * const result = picomatch.scan('!./foo/*.js');
 * console.log(result);
 * { prefix: '!./',
 *   input: '!./foo/*.js',
 *   start: 3,
 *   base: 'foo',
 *   glob: '*.js',
 *   isBrace: false,
 *   isBracket: false,
 *   isGlob: true,
 *   isExtglob: false,
 *   isGlobstar: false,
 *   negated: true }
 * ```
 * @param {String} `input` Glob pattern to scan.
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */

picomatch.scan = (input, options) => scan(input, options);

/**
 * Create a regular expression from a parsed glob pattern.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const state = picomatch.parse('*.js');
 * // picomatch.compileRe(state[, options]);
 *
 * console.log(picomatch.compileRe(state));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `state` The object returned from the `.parse` method.
 * @param {Object} `options`
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */

picomatch.compileRe = (parsed, options, returnOutput = false, returnState = false) => {
  if (returnOutput === true) {
    return parsed.output;
  }

  const opts = options || {};
  const prepend = opts.contains ? '' : '^';
  const append = opts.contains ? '' : '$';

  let source = `${prepend}(?:${parsed.output})${append}`;
  if (parsed && parsed.negated === true) {
    source = `^(?!${source}).*$`;
  }

  const regex = picomatch.toRegex(source, options);
  if (returnState === true) {
    regex.state = parsed;
  }

  return regex;
};

picomatch.makeRe = (input, options, returnOutput = false, returnState = false) => {
  if (!input || typeof input !== 'string') {
    throw new TypeError('Expected a non-empty string');
  }

  const opts = options || {};
  let parsed = { negated: false, fastpaths: true };
  let prefix = '';
  let output;

  if (input.startsWith('./')) {
    input = input.slice(2);
    prefix = parsed.prefix = './';
  }

  if (opts.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
    output = parse.fastpaths(input, options);
  }

  if (output === undefined) {
    parsed = parse(input, options);
    parsed.prefix = prefix + (parsed.prefix || '');
  } else {
    parsed.output = output;
  }

  return picomatch.compileRe(parsed, options, returnOutput, returnState);
};

/**
 * Create a regular expression from the given regex source string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.toRegex(source[, options]);
 *
 * const { output } = picomatch.parse('*.js');
 * console.log(picomatch.toRegex(output));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `source` Regular expression source string.
 * @param {Object} `options`
 * @return {RegExp}
 * @api public
 */

picomatch.toRegex = (source, options) => {
  try {
    const opts = options || {};
    return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''));
  } catch (err) {
    if (options && options.debug === true) throw err;
    return /$^/;
  }
};

/**
 * Picomatch constants.
 * @return {Object}
 */

picomatch.constants = constants;

/**
 * Expose "picomatch"
 */

module.exports = picomatch;


/***/ }),

/***/ "../node_modules/picomatch/lib/scan.js":
/*!*********************************************!*\
  !*** ../node_modules/picomatch/lib/scan.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const utils = __webpack_require__(/*! ./utils */ "../node_modules/picomatch/lib/utils.js");
const {
  CHAR_ASTERISK,             /* * */
  CHAR_AT,                   /* @ */
  CHAR_BACKWARD_SLASH,       /* \ */
  CHAR_COMMA,                /* , */
  CHAR_DOT,                  /* . */
  CHAR_EXCLAMATION_MARK,     /* ! */
  CHAR_FORWARD_SLASH,        /* / */
  CHAR_LEFT_CURLY_BRACE,     /* { */
  CHAR_LEFT_PARENTHESES,     /* ( */
  CHAR_LEFT_SQUARE_BRACKET,  /* [ */
  CHAR_PLUS,                 /* + */
  CHAR_QUESTION_MARK,        /* ? */
  CHAR_RIGHT_CURLY_BRACE,    /* } */
  CHAR_RIGHT_PARENTHESES,    /* ) */
  CHAR_RIGHT_SQUARE_BRACKET  /* ] */
} = __webpack_require__(/*! ./constants */ "../node_modules/picomatch/lib/constants.js");

const isPathSeparator = code => {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
};

const depth = token => {
  if (token.isPrefix !== true) {
    token.depth = token.isGlobstar ? Infinity : 1;
  }
};

/**
 * Quickly scans a glob pattern and returns an object with a handful of
 * useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
 * `glob` (the actual pattern), and `negated` (true if the path starts with `!`).
 *
 * ```js
 * const pm = require('picomatch');
 * console.log(pm.scan('foo/bar/*.js'));
 * { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {Object} Returns an object with tokens and regex source string.
 * @api public
 */

const scan = (input, options) => {
  const opts = options || {};

  const length = input.length - 1;
  const scanToEnd = opts.parts === true || opts.scanToEnd === true;
  const slashes = [];
  const tokens = [];
  const parts = [];

  let str = input;
  let index = -1;
  let start = 0;
  let lastIndex = 0;
  let isBrace = false;
  let isBracket = false;
  let isGlob = false;
  let isExtglob = false;
  let isGlobstar = false;
  let braceEscaped = false;
  let backslashes = false;
  let negated = false;
  let finished = false;
  let braces = 0;
  let prev;
  let code;
  let token = { value: '', depth: 0, isGlob: false };

  const eos = () => index >= length;
  const peek = () => str.charCodeAt(index + 1);
  const advance = () => {
    prev = code;
    return str.charCodeAt(++index);
  };

  while (index < length) {
    code = advance();
    let next;

    if (code === CHAR_BACKWARD_SLASH) {
      backslashes = token.backslashes = true;
      code = advance();

      if (code === CHAR_LEFT_CURLY_BRACE) {
        braceEscaped = true;
      }
      continue;
    }

    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
      braces++;

      while (eos() !== true && (code = advance())) {
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }

        if (code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          continue;
        }

        if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }

          break;
        }

        if (braceEscaped !== true && code === CHAR_COMMA) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }

          break;
        }

        if (code === CHAR_RIGHT_CURLY_BRACE) {
          braces--;

          if (braces === 0) {
            braceEscaped = false;
            isBrace = token.isBrace = true;
            finished = true;
            break;
          }
        }
      }

      if (scanToEnd === true) {
        continue;
      }

      break;
    }

    if (code === CHAR_FORWARD_SLASH) {
      slashes.push(index);
      tokens.push(token);
      token = { value: '', depth: 0, isGlob: false };

      if (finished === true) continue;
      if (prev === CHAR_DOT && index === (start + 1)) {
        start += 2;
        continue;
      }

      lastIndex = index + 1;
      continue;
    }

    if (opts.noext !== true) {
      const isExtglobChar = code === CHAR_PLUS
        || code === CHAR_AT
        || code === CHAR_ASTERISK
        || code === CHAR_QUESTION_MARK
        || code === CHAR_EXCLAMATION_MARK;

      if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
        isGlob = token.isGlob = true;
        isExtglob = token.isExtglob = true;
        finished = true;

        if (scanToEnd === true) {
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              code = advance();
              continue;
            }

            if (code === CHAR_RIGHT_PARENTHESES) {
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          continue;
        }
        break;
      }
    }

    if (code === CHAR_ASTERISK) {
      if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
      isGlob = token.isGlob = true;
      finished = true;

      if (scanToEnd === true) {
        continue;
      }
      break;
    }

    if (code === CHAR_QUESTION_MARK) {
      isGlob = token.isGlob = true;
      finished = true;

      if (scanToEnd === true) {
        continue;
      }
      break;
    }

    if (code === CHAR_LEFT_SQUARE_BRACKET) {
      while (eos() !== true && (next = advance())) {
        if (next === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }

        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
          isBracket = token.isBracket = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
    }

    if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
      negated = token.negated = true;
      start++;
      continue;
    }

    if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
      isGlob = token.isGlob = true;

      if (scanToEnd === true) {
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_LEFT_PARENTHESES) {
            backslashes = token.backslashes = true;
            code = advance();
            continue;
          }

          if (code === CHAR_RIGHT_PARENTHESES) {
            finished = true;
            break;
          }
        }
        continue;
      }
      break;
    }

    if (isGlob === true) {
      finished = true;

      if (scanToEnd === true) {
        continue;
      }

      break;
    }
  }

  if (opts.noext === true) {
    isExtglob = false;
    isGlob = false;
  }

  let base = str;
  let prefix = '';
  let glob = '';

  if (start > 0) {
    prefix = str.slice(0, start);
    str = str.slice(start);
    lastIndex -= start;
  }

  if (base && isGlob === true && lastIndex > 0) {
    base = str.slice(0, lastIndex);
    glob = str.slice(lastIndex);
  } else if (isGlob === true) {
    base = '';
    glob = str;
  } else {
    base = str;
  }

  if (base && base !== '' && base !== '/' && base !== str) {
    if (isPathSeparator(base.charCodeAt(base.length - 1))) {
      base = base.slice(0, -1);
    }
  }

  if (opts.unescape === true) {
    if (glob) glob = utils.removeBackslashes(glob);

    if (base && backslashes === true) {
      base = utils.removeBackslashes(base);
    }
  }

  const state = {
    prefix,
    input,
    start,
    base,
    glob,
    isBrace,
    isBracket,
    isGlob,
    isExtglob,
    isGlobstar,
    negated
  };

  if (opts.tokens === true) {
    state.maxDepth = 0;
    if (!isPathSeparator(code)) {
      tokens.push(token);
    }
    state.tokens = tokens;
  }

  if (opts.parts === true || opts.tokens === true) {
    let prevIndex;

    for (let idx = 0; idx < slashes.length; idx++) {
      const n = prevIndex ? prevIndex + 1 : start;
      const i = slashes[idx];
      const value = input.slice(n, i);
      if (opts.tokens) {
        if (idx === 0 && start !== 0) {
          tokens[idx].isPrefix = true;
          tokens[idx].value = prefix;
        } else {
          tokens[idx].value = value;
        }
        depth(tokens[idx]);
        state.maxDepth += tokens[idx].depth;
      }
      if (idx !== 0 || value !== '') {
        parts.push(value);
      }
      prevIndex = i;
    }

    if (prevIndex && prevIndex + 1 < input.length) {
      const value = input.slice(prevIndex + 1);
      parts.push(value);

      if (opts.tokens) {
        tokens[tokens.length - 1].value = value;
        depth(tokens[tokens.length - 1]);
        state.maxDepth += tokens[tokens.length - 1].depth;
      }
    }

    state.slashes = slashes;
    state.parts = parts;
  }

  return state;
};

module.exports = scan;


/***/ }),

/***/ "../node_modules/picomatch/lib/utils.js":
/*!**********************************************!*\
  !*** ../node_modules/picomatch/lib/utils.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

const path = __webpack_require__(/*! path */ "../node_modules/path-browserify/index.js");
const win32 = process.platform === 'win32';
const {
  REGEX_BACKSLASH,
  REGEX_REMOVE_BACKSLASH,
  REGEX_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_GLOBAL
} = __webpack_require__(/*! ./constants */ "../node_modules/picomatch/lib/constants.js");

exports.isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);
exports.hasRegexChars = str => REGEX_SPECIAL_CHARS.test(str);
exports.isRegexChar = str => str.length === 1 && exports.hasRegexChars(str);
exports.escapeRegex = str => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
exports.toPosixSlashes = str => str.replace(REGEX_BACKSLASH, '/');

exports.removeBackslashes = str => {
  return str.replace(REGEX_REMOVE_BACKSLASH, match => {
    return match === '\\' ? '' : match;
  });
};

exports.supportsLookbehinds = () => {
  const segs = process.version.slice(1).split('.').map(Number);
  if (segs.length === 3 && segs[0] >= 9 || (segs[0] === 8 && segs[1] >= 10)) {
    return true;
  }
  return false;
};

exports.isWindows = options => {
  if (options && typeof options.windows === 'boolean') {
    return options.windows;
  }
  return win32 === true || path.sep === '\\';
};

exports.escapeLast = (input, char, lastIdx) => {
  const idx = input.lastIndexOf(char, lastIdx);
  if (idx === -1) return input;
  if (input[idx - 1] === '\\') return exports.escapeLast(input, char, idx - 1);
  return `${input.slice(0, idx)}\\${input.slice(idx)}`;
};

exports.removePrefix = (input, state = {}) => {
  let output = input;
  if (output.startsWith('./')) {
    output = output.slice(2);
    state.prefix = './';
  }
  return output;
};

exports.wrapOutput = (input, state = {}, options = {}) => {
  const prepend = options.contains ? '' : '^';
  const append = options.contains ? '' : '$';

  let output = `${prepend}(?:${input})${append}`;
  if (state.negated === true) {
    output = `(?:^(?!${output}).*$)`;
  }
  return output;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "../node_modules/process/browser.js")))

/***/ }),

/***/ "../node_modules/process/browser.js":
/*!******************************************!*\
  !*** ../node_modules/process/browser.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
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
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
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
    while(len) {
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
};

// v8 likes predictible objects
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

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../node_modules/to-regex-range/index.js":
/*!***********************************************!*\
  !*** ../node_modules/to-regex-range/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */



const isNumber = __webpack_require__(/*! is-number */ "../node_modules/is-number/index.js");

const toRegexRange = (min, max, options) => {
  if (isNumber(min) === false) {
    throw new TypeError('toRegexRange: expected the first argument to be a number');
  }

  if (max === void 0 || min === max) {
    return String(min);
  }

  if (isNumber(max) === false) {
    throw new TypeError('toRegexRange: expected the second argument to be a number.');
  }

  let opts = { relaxZeros: true, ...options };
  if (typeof opts.strictZeros === 'boolean') {
    opts.relaxZeros = opts.strictZeros === false;
  }

  let relax = String(opts.relaxZeros);
  let shorthand = String(opts.shorthand);
  let capture = String(opts.capture);
  let wrap = String(opts.wrap);
  let cacheKey = min + ':' + max + '=' + relax + shorthand + capture + wrap;

  if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
    return toRegexRange.cache[cacheKey].result;
  }

  let a = Math.min(min, max);
  let b = Math.max(min, max);

  if (Math.abs(a - b) === 1) {
    let result = min + '|' + max;
    if (opts.capture) {
      return `(${result})`;
    }
    if (opts.wrap === false) {
      return result;
    }
    return `(?:${result})`;
  }

  let isPadded = hasPadding(min) || hasPadding(max);
  let state = { min, max, a, b };
  let positives = [];
  let negatives = [];

  if (isPadded) {
    state.isPadded = isPadded;
    state.maxLen = String(state.max).length;
  }

  if (a < 0) {
    let newMin = b < 0 ? Math.abs(b) : 1;
    negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
    a = state.a = 0;
  }

  if (b >= 0) {
    positives = splitToPatterns(a, b, state, opts);
  }

  state.negatives = negatives;
  state.positives = positives;
  state.result = collatePatterns(negatives, positives, opts);

  if (opts.capture === true) {
    state.result = `(${state.result})`;
  } else if (opts.wrap !== false && (positives.length + negatives.length) > 1) {
    state.result = `(?:${state.result})`;
  }

  toRegexRange.cache[cacheKey] = state;
  return state.result;
};

function collatePatterns(neg, pos, options) {
  let onlyNegative = filterPatterns(neg, pos, '-', false, options) || [];
  let onlyPositive = filterPatterns(pos, neg, '', false, options) || [];
  let intersected = filterPatterns(neg, pos, '-?', true, options) || [];
  let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
  return subpatterns.join('|');
}

function splitToRanges(min, max) {
  let nines = 1;
  let zeros = 1;

  let stop = countNines(min, nines);
  let stops = new Set([max]);

  while (min <= stop && stop <= max) {
    stops.add(stop);
    nines += 1;
    stop = countNines(min, nines);
  }

  stop = countZeros(max + 1, zeros) - 1;

  while (min < stop && stop <= max) {
    stops.add(stop);
    zeros += 1;
    stop = countZeros(max + 1, zeros) - 1;
  }

  stops = [...stops];
  stops.sort(compare);
  return stops;
}

/**
 * Convert a range to a regex pattern
 * @param {Number} `start`
 * @param {Number} `stop`
 * @return {String}
 */

function rangeToPattern(start, stop, options) {
  if (start === stop) {
    return { pattern: start, count: [], digits: 0 };
  }

  let zipped = zip(start, stop);
  let digits = zipped.length;
  let pattern = '';
  let count = 0;

  for (let i = 0; i < digits; i++) {
    let [startDigit, stopDigit] = zipped[i];

    if (startDigit === stopDigit) {
      pattern += startDigit;

    } else if (startDigit !== '0' || stopDigit !== '9') {
      pattern += toCharacterClass(startDigit, stopDigit, options);

    } else {
      count++;
    }
  }

  if (count) {
    pattern += options.shorthand === true ? '\\d' : '[0-9]';
  }

  return { pattern, count: [count], digits };
}

function splitToPatterns(min, max, tok, options) {
  let ranges = splitToRanges(min, max);
  let tokens = [];
  let start = min;
  let prev;

  for (let i = 0; i < ranges.length; i++) {
    let max = ranges[i];
    let obj = rangeToPattern(String(start), String(max), options);
    let zeros = '';

    if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
      if (prev.count.length > 1) {
        prev.count.pop();
      }

      prev.count.push(obj.count[0]);
      prev.string = prev.pattern + toQuantifier(prev.count);
      start = max + 1;
      continue;
    }

    if (tok.isPadded) {
      zeros = padZeros(max, tok, options);
    }

    obj.string = zeros + obj.pattern + toQuantifier(obj.count);
    tokens.push(obj);
    start = max + 1;
    prev = obj;
  }

  return tokens;
}

function filterPatterns(arr, comparison, prefix, intersection, options) {
  let result = [];

  for (let ele of arr) {
    let { string } = ele;

    // only push if _both_ are negative...
    if (!intersection && !contains(comparison, 'string', string)) {
      result.push(prefix + string);
    }

    // or _both_ are positive
    if (intersection && contains(comparison, 'string', string)) {
      result.push(prefix + string);
    }
  }
  return result;
}

/**
 * Zip strings
 */

function zip(a, b) {
  let arr = [];
  for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]]);
  return arr;
}

function compare(a, b) {
  return a > b ? 1 : b > a ? -1 : 0;
}

function contains(arr, key, val) {
  return arr.some(ele => ele[key] === val);
}

function countNines(min, len) {
  return Number(String(min).slice(0, -len) + '9'.repeat(len));
}

function countZeros(integer, zeros) {
  return integer - (integer % Math.pow(10, zeros));
}

function toQuantifier(digits) {
  let [start = 0, stop = ''] = digits;
  if (stop || start > 1) {
    return `{${start + (stop ? ',' + stop : '')}}`;
  }
  return '';
}

function toCharacterClass(a, b, options) {
  return `[${a}${(b - a === 1) ? '' : '-'}${b}]`;
}

function hasPadding(str) {
  return /^-?(0+)\d/.test(str);
}

function padZeros(value, tok, options) {
  if (!tok.isPadded) {
    return value;
  }

  let diff = Math.abs(tok.maxLen - String(value).length);
  let relax = options.relaxZeros !== false;

  switch (diff) {
    case 0:
      return '';
    case 1:
      return relax ? '0?' : '0';
    case 2:
      return relax ? '0{0,2}' : '00';
    default: {
      return relax ? `0{0,${diff}}` : `0{${diff}}`;
    }
  }
}

/**
 * Cache
 */

toRegexRange.cache = {};
toRegexRange.clearCache = () => (toRegexRange.cache = {});

/**
 * Expose `toRegexRange`
 */

module.exports = toRegexRange;


/***/ }),

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "../node_modules/uniqid/index.js":
/*!***************************************!*\
  !*** ../node_modules/uniqid/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* 
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
var pid = process && process.pid ? process.pid.toString(36) : '' ;
var address = '';
if(false){ var i, mac, networkInterfaces; } 

//  Exports
// ================================================
module.exports = module.exports.default = function(prefix, suffix){ return (prefix ? prefix : '') + address + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.process = function(prefix, suffix){ return (prefix ? prefix : '') + pid + now().toString(36) + (suffix ? suffix : ''); }
module.exports.time    = function(prefix, suffix){ return (prefix ? prefix : '') + now().toString(36) + (suffix ? suffix : ''); }

//  Helpers
// ================================================
function now(){
    var time = Date.now();
    var last = now.last || time;
    return now.last = time > last ? time : last + 1;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "../node_modules/process/browser.js")))

/***/ }),

/***/ "../node_modules/util/node_modules/inherits/inherits_browser.js":
/*!**********************************************************************!*\
  !*** ../node_modules/util/node_modules/inherits/inherits_browser.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ "../node_modules/util/support/isBufferBrowser.js":
/*!*******************************************************!*\
  !*** ../node_modules/util/support/isBufferBrowser.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "../node_modules/util/util.js":
/*!************************************!*\
  !*** ../node_modules/util/util.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
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

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "../node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "../node_modules/util/node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb, null, ret) },
            function(rej) { process.nextTick(callbackifyOnRejected, rej, cb) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "../node_modules/process/browser.js")))

/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../node_modules/webpack/buildin/module.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "../src/js/array/proxy.js":
/*!********************************!*\
  !*** ../src/js/array/proxy.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = proxy;

var _uniqid = _interopRequireDefault(__webpack_require__(/*! ../string/uniqid */ "../src/js/string/uniqid.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                  proxy
 * @namespace           js.array
 * @type                  Function
 *
 * This function override the passed array prototype to intercept changes made through
 *
 * @param         {Array}           array           The array to proxy
 * @return        {Array}                           The same array with his prototype proxied
 *
 * @example       js
 * import proxy from '@coffeekraken/sugar/js/array/proxy';
 * const myArray = proxy([1,2,3]);
 * myArray.watch(['push','pop'], (watchObj) => {
 *    // check the watchObj action
 *    switch (watchObj.action) {
 *      case 'push':
 *        // do something...
 *      break;
 *    }
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function proxy(array) {
  if (array.__$proxied) return array;
  var watchStack = {}; // mark that this array has already been proxied

  Object.defineProperty(array, '__$proxied', {
    value: true,
    enumerable: false,
    writable: false
  });

  function _proxyMethod(name) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var handlersStack = [];
    Object.keys(watchStack).forEach(watchId => {
      var watch = watchStack[watchId];
      if (watch.methods.indexOf(name) === -1) return;
      handlersStack.push({
        handlerFn: watch.handlerFn,
        watchObj: {
          oldValue: [...array],
          action: "".concat(name),
          fullAction: "Array.".concat(name),
          args
        }
      });
    });
    var returnValue = Array.prototype[name].call(array, ...args);
    handlersStack.forEach(handlerObj => {
      handlerObj.watchObj = _objectSpread(_objectSpread({}, handlerObj.watchObj), {}, {
        value: array,
        returnedValue: returnValue
      });
      handlerObj.handlerFn(handlerObj.watchObj);
    });
    return returnValue;
  } // console.log(Object.getOwnPropertyNames(Array.prototype));


  Object.getOwnPropertyNames(Array.prototype).forEach(methodName => {
    var unProxyMethods = ['length', 'constructor'];
    if (unProxyMethods.indexOf(methodName) !== -1) return;
    Object.defineProperty(array, methodName, {
      writable: false,
      configurable: false,
      enumerable: false,
      value: function value() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return _proxyMethod(methodName, ...args);
      }
    });
  });
  /**
   * @name                    watch
   * @type                    Function
   *
   * This method allows you to specify which Array methods you want to watch by passing an array of methods names like ['push','pop'].
   * You can also specify the handler function that will be called on each array updates, etc...
   *
   * @param         {Array|String}          methods               The methods you want to watch
   * @param         {Function}              handler               The function that will be called on each updates. This function will be called with an object as parameters. Here's the list of properties available:
   * - method (null) {String}: The method name that causes the watch trigger
   * - args ([]) {Array}: An array of all the arguments passed to the method call
   * - oldValue (null) {Array}: The array just before the method call
   * - value (null) {Array}: The array after the method call
   * - returnedValue (null) {Mixed}: This is the value that the method call has returned
   * @return        {String}                                    Return a uniq watchid that you can use to unwatch this process
   *
   * @example         js
   * const watchId = myProxiedArray.watch(['push', 'pop'], (watchObj) => {
   *    // do something...
   * });
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  Object.defineProperty(array, 'watch', {
    writable: false,
    configurable: false,
    enumerable: false,
    value: (methods, handlerFn) => {
      // create a watch id that we send back to the caller
      var watchId = (0, _uniqid.default)(); // append this watch process

      watchStack[watchId] = {
        methods,
        handlerFn
      }; // return the watchId to be able to unwatcn this watch process

      return watchId;
    }
  });
  /**
   * @name                  unwatch
   * @type                  Function
   *
   * This methods allows you to unwatch a process started with the "watch" method.
   * You have to pass as parameter the watchId that the "watch" method has returned you.
   *
   * @param       {String}          watchId         The watchId returned by the "watch" method
   *
   * @example       js
   * const watchId = myArray.watch('push', (obj) => //...);
   * myArray.unwatch(watchId);
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  Object.defineProperty(array, 'unwatch', {
    writable: false,
    configurable: false,
    enumerable: false,
    value: watchId => {
      // delete the watch process
      delete watchStack[watchId];
    }
  }); // return the processed array

  return array;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/dom/insertAfter.js":
/*!************************************!*\
  !*** ../src/js/dom/insertAfter.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insertAfter;

/**
 * @name      insertAfter
 * @namespace           js.dom
 * @type      Function
 *
 * Insert an HTMLElement after another HTMLElement
 *
 * @param 		{HTMLElement} 				elm  		The element to insert
 * @param 		{HTMLElement} 				refElm 		The element after which to insert the passed element
 *
 * @example  	js
 * import insertAfter from '@coffeekraken/sugar/js/dom/insertAfter'
 * insertAfter(myElementToInsert, theReferenceElement);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function insertAfter(elm, refElm) {
  // next sibling of ref elm
  var nextSibling = refElm.nextSibling;

  if (!nextSibling) {
    refElm.parentNode.appendChild(elm);
  } else {
    refElm.parentNode.insertBefore(elm, nextSibling);
  }
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/dom/when.js":
/*!*****************************!*\
  !*** ../src/js/dom/when.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = when;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @name                              when
 * @namespace           js.dom
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
function when($node, state) {
  var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(function* (resolve, reject) {
      // check the state to detect
      var importPromise, args;

      switch (state) {
        case 'attribute':
          importPromise = __webpack_require__.e(/*! import() | whenAttribute */ "whenAttribute").then(__webpack_require__.t.bind(null, /*! ./whenAttribute */ "../src/js/dom/whenAttribute.js", 7));
          args = [$node, settings.attribute, settings.checkFn];
          break;

        case 'inViewport':
          importPromise = __webpack_require__.e(/*! import() | whenInViewport */ "whenInViewport").then(__webpack_require__.t.bind(null, /*! ./whenInViewport */ "../src/js/dom/whenInViewport.js", 7));
          args = [$node, settings.offset];
          break;

        case 'outOfViewport':
          importPromise = __webpack_require__.e(/*! import() | whenOutOfViewport */ "whenOutOfViewport").then(__webpack_require__.t.bind(null, /*! ./whenOutOfViewport */ "../src/js/dom/whenOutOfViewport.js", 7));
          args = [$node, settings.offset];
          break;

        case 'transitionEnd':
          importPromise = __webpack_require__.e(/*! import() | whenTransitionEnd */ "whenTransitionEnd").then(__webpack_require__.t.bind(null, /*! ./whenTransitionEnd */ "../src/js/dom/whenTransitionEnd.js", 7));
          args = [$node, settings.callback];
          break;

        case 'visible':
          importPromise = __webpack_require__.e(/*! import() | whenVisible */ "whenVisible").then(__webpack_require__.t.bind(null, /*! ./whenVisible */ "../src/js/dom/whenVisible.js", 7));
          args = [$node, settings.callback];
          break;

        default:
          resolve($node);
          return;
          break;
      } // wait until the module is loaded


      var module = yield importPromise; // call the when... function

      module.default.apply(null, args).then(() => {
        // resolve the promise
        resolve($node);
      });
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/event/dispatch.js":
/*!***********************************!*\
  !*** ../src/js/event/dispatch.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trigger;

var _SPromise = _interopRequireDefault(__webpack_require__(/*! ../promise/SPromise */ "../src/js/promise/SPromise.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        trigger
 * @namespace           js.event
 * @type          Function
 *
 * This function can ben used to trigger an event globally.
 * You can subscribe to these events using the "sugar.js.event.subscribe" function
 *
 * @param         {String}        name          The event name you want to trigger to
 * @param         {Mixed}        value          The value you want to send alongside the event
 *
 * @example       js
 * const trigger = require('@coffeekraken/sugar/js/event/trigger');
 * trigger('something', 'Hello world');
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function trigger(name, value) {
  // check that the global SPromise exists
  if (!window._sugarEventSPromise) window._sugarEventSPromise = new _SPromise.default(() => {}).start(); // trigger to the event

  window._sugarEventSPromise.trigger(name, value);
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/function/throttle.js":
/*!**************************************!*\
  !*** ../src/js/function/throttle.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throttle;

/**
 * @name        throttle
 * @namespace           js.function
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
  var last;
  return function () {
    var context = this;
    var now = new Date(),
        args = arguments;

    if (!last || last <= now - threshhold) {
      last = now;
      fn.apply(context, args);
    }
  };
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/html/getHtmlClassFromTagName.js":
/*!*************************************************!*\
  !*** ../src/js/html/getHtmlClassFromTagName.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHtmlClassFromTagName;

var _upperFirst = _interopRequireDefault(__webpack_require__(/*! ../string/upperFirst */ "../src/js/string/upperFirst.js"));

var _htmlTagToHtmlClassMap = _interopRequireDefault(__webpack_require__(/*! ./htmlTagToHtmlClassMap */ "../src/js/html/htmlTagToHtmlClassMap.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            getHtmlClassFromTagName
 * @namespace       sugar.js.html
 * @type            Function
 *
 * This function simply return the HTML{name}Element class depending on the passed
 * tag name like "p", "input", "textarea", etc...
 *
 * @param       {String}      tagName       The tagName to get the class for
 * @return      {HTMLElement}               The HTMLElement class that correspond to the requested tag name
 *
 * @example       js
 * import getHtmlClassFromTagName from '@coffeekraken/sugar/js/html/getHtmlClassFromTagName';
 * getHtmlClassFromTagName('a'); // => HTMLAnchorElement
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getHtmlClassFromTagName(tagName) {
  if (!tagName) return HTMLElement;
  var tagNameUpperFirst = (0, _upperFirst.default)(tagName);
  if (window["HTML".concat(tagNameUpperFirst, "Element")]) return window["HTML".concat(tagNameUpperFirst, "Element")];
  if (_htmlTagToHtmlClassMap.default[tagName]) return _htmlTagToHtmlClassMap.default[tagName];
  return HTMLElement;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/html/htmlTagToHtmlClassMap.js":
/*!***********************************************!*\
  !*** ../src/js/html/htmlTagToHtmlClassMap.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @name            HtmlTagToHtmlClassMap
 * @namespace       js.html
 * @type            Object
 *
 * This export an object mapping the HTML tag name to his corresponding HTML class (object not css class)
 *
 * @example       js
 * import HtmlTagToHtmlClassMap from '@coffeekraken/sugar/js/html/HtmlTagToHtmlClassMap';
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = {
  a: HTMLAnchorElement,
  audio: HTMLAudioElement,
  body: HTMLBodyElement,
  button: HTMLButtonElement,
  canvas: HTMLCanvasElement,
  dl: HTMLDListElement,
  data: HTMLDataElement,
  datalist: HTMLDataListElement,
  details: HTMLDetailsElement,
  dialog: HTMLDialogElement,
  dir: HTMLDirectoryElement,
  div: HTMLDivElement,
  html: HTMLDocument,
  embed: HTMLEmbedElement,
  fieldset: HTMLFieldSetElement,
  font: HTMLFontElement,
  form: HTMLFormElement,
  frame: HTMLFrameElement,
  head: HTMLHeadElement,
  html: HTMLHtmlElement,
  iframe: HTMLIFrameElement,
  img: HTMLImageElement,
  input: HTMLInputElement,
  label: HTMLLabelElement,
  legend: HTMLLegendElement,
  link: HTMLLinkElement,
  map: HTMLMapElement,
  marquee: HTMLMarqueeElement,
  media: HTMLMediaElement,
  menu: HTMLMenuElement,
  meta: HTMLMetaElement,
  meter: HTMLMeterElement,
  del: HTMLModElement,
  ins: HTMLModElement,
  dol: HTMLOListElement,
  object: HTMLObjectElement,
  optgroup: HTMLOptGroupElement,
  option: HTMLOptionElement,
  output: HTMLOutputElement,
  p: HTMLParagraphElement,
  param: HTMLParamElement,
  picture: HTMLPictureElement,
  pre: HTMLPreElement,
  progress: HTMLProgressElement,
  quote: HTMLQuoteElement,
  script: HTMLScriptElement,
  select: HTMLSelectElement,
  slot: HTMLSlotElement,
  source: HTMLSourceElement,
  span: HTMLSpanElement,
  style: HTMLStyleElement,
  td: HTMLTableCellElement,
  th: HTMLTableCellElement,
  col: HTMLTableColElement,
  colgroup: HTMLTableColElement,
  table: HTMLTableElement,
  tr: HTMLTableRowElement,
  tfoot: HTMLTableSectionElement,
  thead: HTMLTableSectionElement,
  tbody: HTMLTableSectionElement,
  template: HTMLTemplateElement,
  textarea: HTMLTextAreaElement,
  time: HTMLTimeElement,
  title: HTMLTitleElement,
  track: HTMLTrackElement,
  ul: HTMLUListElement,
  video: HTMLVideoElement,
  area: HTMLAreaElement
};

/***/ }),

/***/ "../src/js/is/array.js":
/*!*****************************!*\
  !*** ../src/js/is/array.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isArray;

/**
 * @name        isArray
 * @namespace           js.is
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
  return value && typeof value === 'object' && value.constructor === Array;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/is/boolean.js":
/*!*******************************!*\
  !*** ../src/js/is/boolean.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBoolean;

/**
 * @name        isBoolean
 * @namespace           js.is
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
  return typeof value === 'boolean';
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/is/class.js":
/*!*****************************!*\
  !*** ../src/js/is/class.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cls;

var __isClass = __webpack_require__(/*! is-class */ "../node_modules/is-class/is-class.js");
/**
 * @name                      class
 * @namespace           js.is
 * @type                      Function
 *
 * Check if the passed variable (or array of variables) is/are plain variable(s)
 *
 * @param         {Mixed|Array}            variable                  The variable(s) to check
 * @return        {Boolean}                                         true if is class(es), false if not
 *
 * @example           js
 * import isClass = from '@coffeekraken/sugar/js/is/class';
 * isClass({ hello: 'world'}); // => false
 * const myCoolClass = class Coco{};
 * isClass(myCoolClass); // => true
 *
 * @see       https://www.npmjs.com/package/is-class
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


function cls(cls) {
  if (!Array.isArray(cls)) cls = [cls];

  for (var i = 0; i < cls.length; i++) {
    if (!__isClass(cls[i])) return false;
  }

  return true;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/is/function.js":
/*!********************************!*\
  !*** ../src/js/is/function.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFunction;

/**
 * @name        isFunction
 * @namespace       js.is
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
  return value && {}.toString.call(value) === '[object Function]';
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/is/integer.js":
/*!*******************************!*\
  !*** ../src/js/is/integer.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInteger;

/**
 * @name        isInteger
 * @namespace           js.is
 * @type      Function
 *
 * Check if the passed value is an integer
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @example 	js
 * import isInteger from '@coffeekraken/sugar/js/is/integer';
 * isInteger(10) => true
 * isInteger('hello') => false
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isInteger(data) {
  return !isNaN(data) && function (x) {
    return (x | 0) === x;
  }(parseFloat(data));
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/is/json.js":
/*!****************************!*\
  !*** ../src/js/is/json.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isJson;

/**
 * @name        isJson
 * @namespace           js.is
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

module.exports = exports.default;

/***/ }),

/***/ "../src/js/is/number.js":
/*!******************************!*\
  !*** ../src/js/is/number.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNumber;

/**
 * @name        isNumber
 * @namespace           js.is
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

module.exports = exports.default;

/***/ }),

/***/ "../src/js/is/object.js":
/*!******************************!*\
  !*** ../src/js/is/object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;

/**
 * @name        isObject
 * @namespace           js.is
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
  return value && typeof value === 'object' && value.constructor === Object;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/is/ofType.js":
/*!******************************!*\
  !*** ../src/js/is/ofType.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ofType;

var _argumentTypeDefinitionString = _interopRequireDefault(__webpack_require__(/*! ../parse/argumentTypeDefinitionString */ "../src/js/parse/argumentTypeDefinitionString.js"));

var _toString = _interopRequireDefault(__webpack_require__(/*! ../string/toString */ "../src/js/string/toString.js"));

var _class = _interopRequireDefault(__webpack_require__(/*! ./class */ "../src/js/is/class.js"));

var _integer = _interopRequireDefault(__webpack_require__(/*! ./integer */ "../src/js/is/integer.js"));

var _upperFirst = _interopRequireDefault(__webpack_require__(/*! ../string/upperFirst */ "../src/js/string/upperFirst.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name              ofType
 * @namespace           js.is
 * @type              Function
 *
 * This function take the value to check and an argument type definition string like "String", "Array<String>", etc... and return true or false depending
 * if the value pass the test or not...
 *
 * @param       {Mixed}        value          The value to check
 * @param       {String}       argTypeDefinition      The argument type definition string to use for the test
 * @param       {Boolean}       [returnError=false]       Specify if you want the error string to be returned  in place of the simply false boolean
 * @return      {Boolean}                     true if the value pass the test, false if not
 *
 * @example       js
 * import isOfType from '@coffeekraken/sugar/js/is/ofType';
 * ifOfType(true, 'Boolean'); // => true
 * isOfType(12, 'String|Number'); // => true
 * isOfType(['hello',true], 'Array<String>'); // => false
 * isOfType(['hello',true], 'Array<String|Boolean>'); // => true
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function ofType(value, argTypeDefinition) {
  var returnError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var definitionArray = argTypeDefinition; // parsing the argument definition string

  if (typeof argTypeDefinition === 'string') {
    definitionArray = (0, _argumentTypeDefinitionString.default)(argTypeDefinition);
  }

  var error = '';

  var _loop = function _loop(i) {
    var definitionObj = definitionArray[i]; // check array

    if (definitionObj.type === 'array') {
      // make sure the value is an array
      if (Array.isArray(value) && !definitionObj.of) return {
        v: true
      };else error = "Regarding to the argument definition \"<yellow>".concat(argTypeDefinition, "</yellow>\", the passed value \"<cyan>").concat((0, _toString.default)(value), "</cyan>\" of type \"<magenta>").concat(typeof value, "</magenta>\" has to be an <green>Array</green>...");
    } // check object


    if (definitionObj.type === 'object') {
      if (typeof value === 'object' && !definitionObj.of) return {
        v: true
      };else error = "Regarding to the argument definition \"<yellow>".concat(argTypeDefinition, "</yellow>\", the passed value \"<cyan>").concat((0, _toString.default)(value), "</cyan>\" of type \"<magenta>").concat(typeof value, "</magenta>\" has to be an <green>Object</green>...");
    } // check if need to check the childs


    if (definitionObj.of && definitionObj.of.length) {
      if (definitionObj.type === 'array' || definitionObj.type === 'object') {
        var loopOn = Array.isArray(value) ? [...value.keys()] : Object.keys(value);
        var checkValuesResult = true;
        loopOn.forEach(valueIndex => {
          if (!checkValuesResult) return;
          var valueToCheck = value[valueIndex];

          if (!ofType(valueToCheck, definitionObj.of, false)) {
            checkValuesResult = false;
            var ofTypesArray = [];
            definitionObj.of.forEach(o => {
              ofTypesArray.push(o.type);
            });
            error = "Regarding to the argument definition \"<yellow>".concat(argTypeDefinition, "</yellow>\", the passed value \"<yellow>").concat((0, _toString.default)(value), "</yellow>\" of type \"<magenta>").concat(typeof value, "</magenta>\" has to contain only \"<green>").concat(ofTypesArray.join(','), "</green>\"...");
          }
        }); // if one of the values does not correspond to the definition object, return false

        if (!checkValuesResult) {
          return {
            v: returnError ? error || false : false
          };
        }
      }
    } // check "class"


    if (definitionObj.type === 'class') {
      if ((0, _class.default)(value)) return {
        v: true
      };else error = "Regarding to the argument definition \"<yellow>".concat(argTypeDefinition, "</yellow>\", the passed value \"<cyan>").concat((0, _toString.default)(value), "</cyan>\" of type \"<magenta>").concat(typeof value, "</magenta>\" has to be a <green>Class</green>...");
    } // check if is an integer


    if (definitionObj.type === 'int' || definitionObj.type === 'integer') {
      if ((0, _integer.default)(value)) return {
        v: true
      };
      error = "Regarding to the argument definition \"<yellow>".concat(argTypeDefinition, "</yellow>\", the passed value \"<cyan>").concat((0, _toString.default)(value), "</cyan>\" of type \"<magenta>").concat(typeof value, "</magenta>\" has to be a <green>Integer</green>...");
    } // check default types


    if (['boolean', 'number', 'string', 'bigint', 'symbol', 'function'].indexOf(definitionObj.type) !== -1 && typeof value === definitionObj.type) {
      return {
        v: true
      };
    } else {
      error = "Regarding to the argument definition \"<yellow>".concat(argTypeDefinition, "</yellow>\", the passed value \"<cyan>").concat((0, _toString.default)(value), "</cyan>\" of type \"<magenta>").concat(typeof value, "</magenta>\" has to be a <green>").concat((0, _upperFirst.default)(definitionObj.type), "</green>...");
    } // check for "custom" types


    if ((0, _class.default)(value) && value.name) {
      if (definitionObj.type === value.name.toLowerCase()) return {
        v: true
      };else error = "Regarding to the argument definition \"<yellow>".concat(argTypeDefinition, "</yellow>\", the passed value \"<cyan>").concat((0, _toString.default)(value), "</cyan>\" of type \"<magenta>").concat(typeof value, "</magenta>\" has to be a <green>").concat((0, _upperFirst.default)(definitionObj.type), "</green>...");
    } else if (value && value.constructor && value.constructor.name) {
      if (definitionObj.type === value.constructor.name.toLowerCase()) return {
        v: true
      };else error = "Regarding to the argument definition \"<yellow>".concat(argTypeDefinition, "</yellow>\", the passed value \"<cyan>").concat((0, _toString.default)(value), "</cyan>\" of type \"<magenta>").concat(typeof value, "</magenta>\" has to be a <green>").concat((0, _upperFirst.default)(definitionObj.type), "</green>...");
    }
  };

  for (var i = 0; i < definitionArray.length; i++) {
    var _ret = _loop(i);

    if (typeof _ret === "object") return _ret.v;
  }

  return returnError ? error || false : false;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/is/plainObject.js":
/*!***********************************!*\
  !*** ../src/js/is/plainObject.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = plainObject;

var _isPlainObject = _interopRequireDefault(__webpack_require__(/*! is-plain-object */ "../node_modules/is-plain-object/index.es.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                      plainObject
 * @namespace           js.is
 * @type                      Function
 *
 * Check if the passed object (or array of objects) is/are plain object(s)
 *
 * @param         {Object|Array}            object                  The object(s) to check
 * @return        {Boolean}                                         true if is plain object(s), false if not
 *
 * @example           js
 * const isPlainObject = require('@coffeekraken/sugar/js/is/plainObject');
 * isPlainObject({ hello: 'world'}); // => true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function plainObject(object) {
  if (!object) return false;
  if (typeof object !== 'object') return false;
  if (object.constructor && object.constructor.name !== 'Object') return false;
  if (Object.prototype.toString.call(object) !== '[object Object]') return false;
  if (object !== Object(object)) return false;
  if (object.constructor !== Object) return false;
  return true;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/is/regexp.js":
/*!******************************!*\
  !*** ../src/js/is/regexp.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isRegexp;

/**
 * @name        isRegexp
 * @namespace           js.is
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
  return value && typeof value === 'object' && value.constructor === RegExp;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/is/string.js":
/*!******************************!*\
  !*** ../src/js/is/string.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isString;

/**
 * @name        isString
 * @namespace           js.is
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
  return typeof value === 'string' || value instanceof String;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/object/SWatch.js":
/*!**********************************!*\
  !*** ../src/js/object/SWatch.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constructorName = _interopRequireDefault(__webpack_require__(/*! ./constructorName */ "../src/js/object/constructorName.js"));

var _get = _interopRequireDefault(__webpack_require__(/*! ./get */ "../src/js/object/get.js"));

var _set = _interopRequireDefault(__webpack_require__(/*! ./set */ "../src/js/object/set.js"));

var _deepProxy = _interopRequireDefault(__webpack_require__(/*! ./deepProxy */ "../src/js/object/deepProxy.js"));

var _parse = _interopRequireDefault(__webpack_require__(/*! ../string/parse */ "../src/js/string/parse.js"));

var _uniqid = _interopRequireDefault(__webpack_require__(/*! ../string/uniqid */ "../src/js/string/uniqid.js"));

var _micromatch = _interopRequireDefault(__webpack_require__(/*! micromatch */ "../node_modules/micromatch/index.js"));

var _SPromise = _interopRequireDefault(__webpack_require__(/*! ../promise/SPromise */ "../src/js/promise/SPromise.js"));

var _clone = _interopRequireDefault(__webpack_require__(/*! ../object/clone */ "../src/js/object/clone.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 		            SWatch
 * @namespace           js.object
 * @type                Class
 *
 * This class allows you to easily monitor some object properties and get the new and old value of it
 *
 * @example 	js
 * // create the watcher instance
 * const watchedObj = new SWatch({
 * 		title : 'Hello World'
 * });
 *
 * // watch the object
 * watchedObj.on('title:set', watchResult => {
 *  	// do something when the title changes
 * });
 *
 * // update the title
 * watchedObj.title = 'Hello Universe';
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SWatch = /*#__PURE__*/function () {
  /**
   * @name                    _watchStack
   * @type                    Object
   * @private
   *
   * Watch stack
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                      constructor
   * @type                      Function
   *
   * Constructor
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SWatch(object) {
    _classCallCheck(this, SWatch);

    _defineProperty(this, "_watchStack", {});

    // check if the passed object is already an SWatch instance
    if (object.__$SWatch) return object;
    this._promise = new _SPromise.default(() => {}).start();
    this._proxiedObject = (0, _deepProxy.default)(object, obj => {
      var path = obj.path;
      var value = obj.value;
      var oldValue = obj.oldValue;
      if (path.slice(0, 1) === '.') path = path.slice(1); // build the object to pass to the handler

      var watchResult = {
        object: this._proxiedObject,
        path,
        action: obj.action,
        oldValue,
        value
      };
      if (watchResult.action === 'get' && (path === 'on' || path === 'unwatch')) return; // trigger event through promise

      setTimeout(() => {
        // this._promise.trigger(`${path}`, watchResult);
        this._promise.trigger("".concat(path, ":").concat(watchResult.action), watchResult);
      });
    });
    var onPropertyObj = {
      writable: true,
      configurable: false,
      enumerable: false,
      value: this._promise.on.bind(this._promise)
    };

    if (this._proxiedObject.on !== undefined) {
      Object.defineProperties(this._proxiedObject, {
        $on: onPropertyObj
      });
    } else {
      Object.defineProperties(this._proxiedObject, {
        on: onPropertyObj
      });
    }

    var unwatchPropertyObj = {
      writable: true,
      configurable: false,
      enumerable: false,
      value: this.unwatch.bind(this)
    };

    if (this._proxiedObject.unwatch !== undefined) {
      Object.defineProperties(this._proxiedObject, {
        $unwatch: unwatchPropertyObj
      });
    } else {
      Object.defineProperties(this._proxiedObject, {
        unwatch: unwatchPropertyObj
      });
    } // set a property that is usefull to check if the object
    // is a SWatch watched one...


    Object.defineProperty(this._proxiedObject, '__$SWatch', {
      writable: false,
      configurable: false,
      enumerable: false,
      value: true
    });
    return this._proxiedObject;
  }

  _createClass(SWatch, [{
    key: "unwatch",
    value: function unwatch() {
      // cancel the promise
      this._promise.cancel(); // revoke proxy on the proxied object


      return this._proxiedObject.revoke();
    }
  }]);

  return SWatch;
}();

exports.default = SWatch;
module.exports = exports.default;

/***/ }),

/***/ "../src/js/object/clone.js":
/*!*********************************!*\
  !*** ../src/js/object/clone.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clone;

var _clone = _interopRequireDefault(__webpack_require__(/*! lodash/clone */ "../node_modules/lodash/clone.js"));

var _clonedeep = _interopRequireDefault(__webpack_require__(/*! lodash/clonedeep */ "../node_modules/lodash/clonedeep.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                clone
 * @type                Function
 *
 * This function allows you to clone an object either at 1 level, or deeply.
 *
 * @param       {Object}        object        The object to copy
 * @param       {Boolean}       [deep=false]  Specify if you want to clone the object deeply
 *
 * @example       js
 * import clone from '@coffeekraken/sugar/js/object/clone';
 * clone({
 *    hello: 'world'
 * });
 *
 * @see       https://www.npmjs.com/package/lodash
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function clone(object) {
  var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (deep) {
    return (0, _clonedeep.default)(object);
  }

  return (0, _clone.default)(object);
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/object/constructorName.js":
/*!*******************************************!*\
  !*** ../src/js/object/constructorName.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = constructorName;

/**
 * @name        constructorName
 * @namespace           js.object
 * @type      Function
 *
 * Return the constructor name of the passed object
 *
 * @param 		{Object} 			obj 		The object to get the constructor name from
 * @return 		{String}						The constructor name
 *
 * @example 	js
 * import constructorName from '@coffeekraken/sugar/js/object/constructorName';
 * class MyCoolClass {
 * 		// class implementation...
 * }
 * const myObj = new MyCoolClass();
 * console.log(constructorName(myObj)); => MyCoolClass
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function constructorName(obj) {
  return obj.constructor && obj.constructor.name ? obj.constructor.name : null;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/object/deepMap.js":
/*!***********************************!*\
  !*** ../src/js/object/deepMap.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepMap;

var _plainObject = _interopRequireDefault(__webpack_require__(/*! ../is/plainObject */ "../src/js/is/plainObject.js"));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../object/deepMerge */ "../src/js/object/deepMerge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            deepMap
 * @namespace           js.object
 * @type            Function
 *
 * This function is the same as the "map" one. The only difference is that this one goes deep into the object
 *
 * @param         {Object}        object          The object you want to map through
 * @param         {Function}      processor       The processor function that take as parameter the actual property value, the current property name and the full dotted path to the current property
 * @param         {Object}        [settings={}]     An object of settings to configure your deepMap process:
 * - processObjects (false) {Boolean}: Specify if you want the objects to be processed the same as other values
 * - deepFirst (true) {Boolean}: Specify if you want to process deep values first
 * - handleArray (true) {Boolean}: Specify if we have to treat array like simple value to process of treat them as an object and continue our map down
 *
 * @example       js
 * import deepMap from '@coffeekraken/sugar/js/object/deepMap';
 * deepMap({
 *    hello: 'world'
 * }, (value, prop, fullPath) => {
 *    return '~ ' + value;
 * });
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deepMap(object, processor) {
  var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  settings = (0, _deepMerge.default)({
    deepFirst: false,
    processObjects: false,
    handleArray: true
  }, settings);
  Object.keys(object).forEach(prop => {
    if (!settings.deepFirst) {
      if ((0, _plainObject.default)(object[prop]) || Array.isArray(object[prop]) && settings.handleArray) {
        object[prop] = deepMap(object[prop], processor, settings, [..._path, prop]);
        if (!settings.processObjects) return;
      }

      var res = processor(object[prop], prop, [..._path, prop].join('.'));
      if (res === -1) delete object[prop];else object[prop] = res;
    } else {
      var _res = processor(object[prop], prop, [..._path, prop].join('.'));

      if (_res === -1) delete object[prop];else object[prop] = _res;

      if ((0, _plainObject.default)(object[prop]) || Array.isArray(object[prop]) && settings.handleArray) {
        object[prop] = deepMap(object[prop], processor, settings, [..._path, prop]);
        if (!settings.processObjects) return;
      }
    }
  });
  return object;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/object/deepMerge.js":
/*!*************************************!*\
  !*** ../src/js/object/deepMerge.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepMerge;

var _copyTo = _interopRequireDefault(__webpack_require__(/*! copy-to */ "../node_modules/copy-to/index.js"));

var _plainObject = _interopRequireDefault(__webpack_require__(/*! ../is/plainObject */ "../src/js/is/plainObject.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                deepMerge
 * @namespace           js.object
 * @type                Function
 *
 * Deep merge one object with another and return the merged object result. This merging implementation support:
 * - Merging object with getters/setters
 * - n numbers of objects as arguments
 *
 * @param           {Object}            objects...        Pass all the objects you want to merge
 * @return          {Object}                              The merged object result
 *
 * @example           js
 * import deepMerge from '@coffeekraken/sugar/node/object/deepMerge';
 * deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
 * // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deepMerge() {
  function merge(firstObj, secondObj) {
    var newObj = {};
    if (!firstObj && secondObj) return secondObj;
    if (!secondObj && firstObj) return firstObj;
    if (!firstObj && !secondObj) return {};
    (0, _copyTo.default)(firstObj).override(newObj);

    for (var key of Object.keys(secondObj)) {
      if ((0, _plainObject.default)(firstObj[key]) && (0, _plainObject.default)(secondObj[key])) {
        newObj[key] = merge(firstObj[key], secondObj[key]);
        continue;
      }

      (0, _copyTo.default)(secondObj).pick(key).toCover(newObj);
    }

    return newObj;
  }

  var currentObj = {};

  for (var i = 0; i < arguments.length; i++) {
    var toMergeObj = (i < 0 || arguments.length <= i ? undefined : arguments[i]) || {};
    currentObj = merge(currentObj, toMergeObj);
  }

  return currentObj;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/object/deepProxy.js":
/*!*************************************!*\
  !*** ../src/js/object/deepProxy.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepProxy;

var _proxy = _interopRequireDefault(__webpack_require__(/*! ../array/proxy */ "../src/js/array/proxy.js"));

var _deepMap = _interopRequireDefault(__webpack_require__(/*! ../object/deepMap */ "../src/js/object/deepMap.js"));

var _clone = _interopRequireDefault(__webpack_require__(/*! ../object/clone */ "../src/js/object/clone.js"));

var _delete = _interopRequireDefault(__webpack_require__(/*! ../object/delete */ "../src/js/object/delete.js"));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../object/deepMerge */ "../src/js/object/deepMerge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                            deepProxy
 * @namespace           js.object
 * @type                            Function
 *
 * This function allows you to add Proxy to an object in deep fashion.
 * Normally the Proxy process only the level on which it has been added. Here we add Proxy to all the
 * object levels and to new properties as well.
 *
 * On the returned proxied object, you will have access to the ```revoke``` method that you can call to revoke the proxy applied.
 * This method will return you a shallow version of the proxied object that you can use as you want
 *
 * @param          {Object}                 object            The object on which to add the proxy
 * @param           {Function}                handlerFn       The handler function that will be called with the update object. It can be a property deleted, an array item added, a property updated, etc...:
 * - set: An object property added or updated
 * - delete: An object property deleted
 * - push: An item has been added inside an array
 * - {methodName}: Every array actions
 * @param         {Object}                [settings={}]         An object of settings to configure your proxy:
 * - handleSet (true) {Boolean}: Specify if you want to handle the "set" action
 * - handleGet (false) {Boolean}: Specify if you want to handle the "get" action
 * - handleDelete (true) {Boolean}: Specify if you want to handle the "delete" action
 * @return          {Object}                                  The proxied object
 *
 * @example           js
 * import deepProxy from '@coffeekraken/sugar/js/object/deepProxy';
 * const a = deepProxy({
 *    hello: 'world'
 * }, (actionObj) => {
 *    // do something with the actionObj...
 * });
 * a.hello = 'coco';
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deepProxy(object, handlerFn) {
  var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var preproxy = new WeakMap();
  var isRevoked = false;
  settings = (0, _deepMerge.default)({
    handleSet: true,
    handleGet: false,
    handleDelete: true
  }, settings);

  function makeHandler(path) {
    return {
      set(target, key, value) {
        if (isRevoked || !settings.handleSet) return true;

        if (typeof value === 'object') {
          value = proxify(value, [...path, key]);
        }

        var oldValue = target[key];
        target[key] = value;
        handlerFn({
          object,
          target,
          key,
          path: [...path, key].join('.'),
          action: 'set',
          fullAction: "Object.set",
          oldValue,
          value
        });
        return true;
      },

      get(target, key, receiver) {
        if (Reflect.has(target, key)) {
          if (!settings.handleGet) return target[key];
          var value = handlerFn({
            object,
            target,
            key,
            path: [...path, key].join('.'),
            action: 'get',
            fullAction: 'Object.get'
          });
          if (key === 'revoke') return receiver.revoke;
          if (value === undefined) return target[key];
          return value;
        }

        return undefined;
      },

      deleteProperty(target, key) {
        if (isRevoked || !settings.handleDelete) return true;

        if (Reflect.has(target, key)) {
          // unproxy(target, key);
          var oldValue = target[key];
          var deleted = Reflect.deleteProperty(target, key);

          if (deleted) {
            handlerFn({
              object,
              target,
              key,
              path: [...path, key].join('.'),
              action: 'delete',
              fullAction: 'Object.delete',
              oldValue
            });
          }

          return deleted;
        }

        return false;
      }

    };
  }

  function proxify(obj, path) {
    if (obj === null) return obj;

    var _loop = function _loop(key) {
      if (Array.isArray(obj[key])) {
        obj[key] = (0, _proxy.default)(obj[key]);
        obj[key].watch(Object.getOwnPropertyNames(Array.prototype), watchObj => {
          handlerFn(_objectSpread({
            path: [...path, key].join('.')
          }, watchObj));
        });
      } else if (typeof obj[key] === 'object') {
        obj[key] = proxify(obj[key], [...path, key]);
      }
    };

    for (var key of Object.keys(obj)) {
      _loop(key);
    }

    var p = Proxy.revocable(obj, makeHandler(path)); // preproxy.set(p, obj);

    var revokePropertyObj = {
      writable: true,
      configurable: false,
      enumerable: true,
      value: () => {
        // make a shallow copy of the proxy object
        var __copy = (0, _clone.default)(p.proxy, true); // mark the proxy as revoked


        isRevoked = true; // sanitize the copy

        __copy = (0, _deepMap.default)(__copy, (val, key, path) => {
          // console.log(path);
          if (key === 'revoke' && typeof val === 'function') {
            return -1;
          }

          return val;
        }); // deep revoke the proxies

        setTimeout(() => {
          (0, _deepMap.default)(p.proxy, (val, key, path) => {
            if (key === 'revoke' && typeof val === 'function') {
              val();
            }
          }, {}); // revoke the proxy at first level

          p.revoke();
        }); // return the shallow copy

        return __copy;
      }
    };

    if (Array.isArray(p.proxy)) {
      p.proxy.revoke = revokePropertyObj.value;
    } else {
      Object.defineProperties(p.proxy, {
        revoke: revokePropertyObj
      });
    }

    return p.proxy;
  }

  return proxify(object, []);
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/object/delete.js":
/*!**********************************!*\
  !*** ../src/js/object/delete.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = del;

var _set = _interopRequireDefault(__webpack_require__(/*! ./set */ "../src/js/object/set.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                      delete
 * @namespace           js.object
 * @type                      Function
 *
 * Delete an object property using a dotPath like "something.else"
 *
 * @param         {Object}          object            The object on which you want to delete the property
 * @param         {String}          dotPath           The dotpath to the property you want to delete
 *
 * @example         js
 * import delete from '@coffeekraken/sugar/js/object/delete';
 * const myObject = {
 *    hello: 'world',
 *    plop: 'yop'
 * };
 * delete(myObject, 'plop');
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function del(object, dotPath) {
  var parentDotPath = dotPath.split('.').slice(0, -1).join('.');
  if (!dotPath || dotPath === '' || dotPath === '.') return object;
  dotPath = dotPath.replace(/\[(\w+)\]/g, '.$1');
  dotPath = dotPath.replace(/^\./, '');
  var a = dotPath.split('.');
  var o = object;

  while (a.length) {
    var n = a.shift();

    if (a.length < 1) {
      if (Array.isArray(o)) {
        (function () {
          var valueToDelete = o[n];
          o = o.filter(v => {
            return v !== valueToDelete;
          });
        })();
      } else {
        delete o[n];
      }

      (0, _set.default)(object, parentDotPath, o);
    } else {
      o = o[n];
    }
  }

  return object;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/object/get.js":
/*!*******************************!*\
  !*** ../src/js/object/get.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name                          get
 * @namespace           js.object
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
  if (obj[path] !== undefined) return obj[path];
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
module.exports = exports.default;

/***/ }),

/***/ "../src/js/object/set.js":
/*!*******************************!*\
  !*** ../src/js/object/set.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _get = _interopRequireDefault(__webpack_require__(/*! ./get */ "../src/js/object/get.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                                        set
 * @namespace           js.object
 * @type                                        Function
 *
 * Set an object value using a dotted object path like "myObject.myProperty.myValue" to set his position
 *
 * @param                         {Object}                         obj                      The object in which to set the value
 * @param                         {String}                        path                      The object path where to set the value
 * @param                         {Mixed}                         value                     The value to set
 * @return                        {Mixed}                                                   Return the setted value if setted correctly, or undefined if something goes wrong...
 *
 * @example               js
 * import set from '@coffeekraken/sugar/js/object/set';
 * set('myObject.cool.value', 'Hello world'); // => Hello world
 *
 */
var _default = (obj, path, value) => {
  if (!path || path === '' || path === '.') {
    obj = value;
    return;
  }

  var a = path.split('.');
  var o = obj;

  while (a.length - 1) {
    var n = a.shift();
    if (!(n in o)) o[n] = {};
    o = o[n];
  }

  o[a[0]] = value;
  return (0, _get.default)(obj, path);
};

exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "../src/js/object/watch.js":
/*!*********************************!*\
  !*** ../src/js/object/watch.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = watch;

var _SWatch = _interopRequireDefault(__webpack_require__(/*! ./SWatch */ "../src/js/object/SWatch.js"));

var _uniqid = _interopRequireDefault(__webpack_require__(/*! ../string/uniqid */ "../src/js/string/uniqid.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                      watch
 * @namespace           js.object
 * @type                      Function
 *
 * This method is a simple wrapper around the SWatch class that allows you to watch some action on object and arrays
 *
 * @param       {Object|Array}        target          The array or object to watch
 * @return      {Object}                              Return the proxied object on which you can make all the updates that you want
 *
 * @example       js
 * import watch from '@coffeekraken/sugar/js/object/watch';
 * let myObj = watch({
 *    hello: 'world'
 * }).on('*', watchResult => {
 *    // do something...
 * });
 * myObj.hello = 'plop';
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function watch(target) {
  var watchedObj = new _SWatch.default(target);
  return watchedObj;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/parse/argumentTypeDefinitionString.js":
/*!*******************************************************!*\
  !*** ../src/js/parse/argumentTypeDefinitionString.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = argumentTypeDefinitionString;

/**
 * @name              argumentTypeDefinitionString
 * @namespace           js.parse
 * @type              Function
 *
 * Thia function take an argument type definition string like "String", "Array<String>", "Array|String", etc... and return an object that represent this.
 *
 * @param       {String}        argTypeString         The argument type definition string
 * @return      {Object}                              The argument type definition string in object format
 *
 * @example       js
 * import argumentTypeDefinitionString from '@coffeekraken/sugar/js/parse/argumentTypeDefinitionString';
 * argumentTypeDefinitionString('Array'); // => [{ type: 'array', of: null }] }
 * argumentTypeDefinitionString('Array<String>'); // => [{ type: 'array', of: [{ type: 'string' }] }]
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function argumentTypeDefinitionString(argTypeString) {
  // split the string by |
  var inDepth = 0;
  var currentPart = '',
      typesArray = [];
  argTypeString.split('').forEach(character => {
    if (character === '>') {
      if (inDepth <= 0) {
        throw new Error("It seems that your argument type definition string \"".concat(argTypeString, "\" is invalid..."));
      }

      inDepth--;
      currentPart += character;
      return;
    }

    if (character === '<') {
      inDepth++;
      currentPart += character;
      return;
    }

    if (character === '|') {
      if (inDepth > 0) {
        currentPart += character;
        return;
      }

      typesArray.push(currentPart);
      currentPart = '';
      return;
    }

    currentPart += character;
  });
  typesArray.push(currentPart); // init the return array

  var returnArray = []; // loop on each types array

  typesArray.forEach(typeDefinitionString => {
    // split the string by <
    var parts = typeDefinitionString.split('<'); // get the "type"

    var type = parts[0].toLowerCase(); // process the "of" part if exist

    var ofArray = null;

    if (parts[1]) {
      var ofPart = parts[1].slice(0, -1);
      ofArray = argumentTypeDefinitionString(ofPart);
    } // build the type object and add it the the returnArray


    returnArray.push({
      type,
      of: ofArray
    });
  });
  return returnArray;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/promise/SPromise.js":
/*!*************************************!*\
  !*** ../src/js/promise/SPromise.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../object/deepMerge */ "../src/js/object/deepMerge.js"));

var _minimatch = _interopRequireDefault(__webpack_require__(/*! minimatch */ "../node_modules/minimatch/minimatch.js"));

var _wait = _interopRequireDefault(__webpack_require__(/*! ../time/wait */ "../src/js/time/wait.js"));

var _uniqid = _interopRequireDefault(__webpack_require__(/*! ../string/uniqid */ "../src/js/string/uniqid.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                  SPromise
 * @namespace           js.promise
 * @type                  Class
 *
 * This class works the same as the default Promise one. The difference is that you have more control on this one like
 * the possibility to resolve it multiple times. Here's a list of the "differences" and the "features" that this class provide:
 *
 * - Pass the normal "resolve" and "reject" function to the passed executor
 * - Pass a new function to the passed executor called "trigger" that let you launch your registered callbacks like "then", "catch", etc... but without resolving the master promise. Here's some examples:
 *    - new SPromise((resolve, reject, trigger, cancel) => { trigger('then', 'myCoolValue'); }).then(value => { ... });
 *    - new SPromise((resolve, reject, trigger, cancel) => { trigger('then,catch', 'myCoolValue') }).then(value => { ... });
 * - Pass a new function to the passed executor called "cancel" that let you stop/cancel the promise execution without triggering your registered callbacks unless the "cancel" once...
 * - Expose the normal "then" and "catch" methods to register your callbacks
 * - Expose some new callbacks registration functions described here:
 *    - Expose a method called "resolved" that let you register callbacks called only when the "resolve" function has been called
 *    - Expose a method called "rejected" that let you register callbacks called only when the "reject" function has been called
 *    - Expose a method called "finally" that let you register callbacks called when the "resolve" or "reject" function has been called
 *    - Expose a method called "canceled" that let you register callbacks called only when the "cancel" function has been called
 * - Every callbacks registration methods accept as first argument the number of time that your callback will be called at max. Here's some examples:
 *    - new SPromise((...)).then(value => { // do something... }).catch(error => { // do something... }).start();
 *    - new SPromise((...)).then(1, value => { // do something... }).catch(3, error => { // do something... }).start();
 * - Expose a method called "on" that can be used to register callbacks the same as the "then", "catch", etc... methods but you can register a same callback function to multiple callbacks type at once:
 *    - new SPromise((...)).on('then', value => { ... }).on('then,catch', value => { ... }).start();
 *    - Specify the max number of time to call your callback function like so: new SPromise((...)).on('then{2}', value => { ... }).on('then{1},catch', value => { ... }).start();
 * - A new method called "start" is exposed. This method is useful when you absolutely need that your executor function is launched right after the callbacks registrations.
 *    - If you don't call the "start" method, the executor function passed to the SPromise constructor will be called on the next javascript execution loop
 * - Support the Promises chaining through the callbacks like to:
 *    ```js
 *      const result = await new SPromise((resolve, reject, trigger, cancel) => {
 *        resolve('hello');
 *      }).then(value => {
 *        return new Promise((resolve) => {
 *          setTimeout(() => {
 *            resolve(value + 'World');
 *          }, 1000);
 *        });
 *      }).then(value => {
 *        return value + 'Promise';
 *      }).start();
 *      console.log(result); // => helloWorldPromise
 *    ```
 *
 * @example         js
 * import SPromise from '@coffeekraken/sugar/js/promise/SPromise';
 * function myCoolFunction() {
 *    return new SPromise((resolve, reject, trigger, cancel) => {
 *        // do something...
 *        setInterval(() => {
 *            // resolve the promise
 *            resolve('something'); *
 *        }, 1000);
 *    });
 * }
 *
 * // calling the function and get back the SPromise instance
 * myCoolFunction().then(value => {
 *    // do something here...
 * }).then(1, value => {
 *    // do something just once...
 * }).catch(error => {
 *    // do something with the returned reason of failure...
 * }).start();
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
var SPromise = /*#__PURE__*/function (_Promise) {
  _inherits(SPromise, _Promise);

  var _super = _createSuper(SPromise);

  _createClass(SPromise, null, [{
    key: "pipe",

    /**
     * @name                   _masterPromiseResolveFn
     * @type                    Promise
     * @private
     *
     * Store the master promise resolve function
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                   _masterPromiseRejectFn
     * @type                    Promise
     * @private
     *
     * Store the master promise reject function
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  _executorFn
     * @type                  Function
     *
     * Store the executor function passed to the constructor
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  _isExecutorStarted
     * @type                  Boolean
     *
     * Store the status of the executor function. true if it has been executed, false if not...
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  _settings
     * @type                  Object
     * @private
     *
     * Store the settings of this SPromise instance. Here's the available settings:
     * - stacks (null) {Array|String}: An array or comma separated string of additional stacks you want for this instance
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  _status
     * @type                  String
     * @private
     *
     * Store the promise status. Can be:
     * - pending: When the promise is waiting for resolution or rejection
     * - resolved: When the promise has been resolved
     * - rejected: When the promise has been rejected
     * - canceled: When the promise has been canceled
     * - destroyed: When the promise has been destroyed
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  _stacks
     * @type                  Object
     * @private
     *
     * Store the stacks callbacks
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  pipe
     * @type                  Function
     * @static
     *
     * This static function allows you to redirect some SPromise "events" to another SPromise instance
     * with the ability to process the linked value before triggering it on the destination SPromise.
     *
     * @param         {SPromise}      sourceSPromise        The source SPromise instance on which to listen for "events"
     * @param         {SPromise}      destSPromise          The destination SPromise instance on which to trigger the listened "events"
     * @param         {Object}        [settings={}]         An object of settings to configure your pipe process
     * - stacks (*) {String}: Specify which stacks you want to pipe. By default it's all using the "*" character
     * - processor (null) {Function}: Specify a function to apply on the triggered value before triggering it on the dest SPromise. Take as arguments the value itself and the stack name. Need to return a new value
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    value: function pipe(sourceSPromise, destSPromise) {
      var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // settings
      settings = (0, _deepMerge.default)({
        stacks: '*',
        processor: null
      }, settings); // listen for all on the source promise

      sourceSPromise.on(settings.stacks, (value, stack) => {
        // check if need to process the value
        if (settings.processor) value = settings.processor(value, stack); // trigger on the destination promise

        destSPromise.trigger(stack, value);
      });
    }
    /**
     * @name                  constructor
     * @type                  Function
     *
     * Constructor
     *
     * @param         {Function}          executor          The executor function that will receive the resolve and reject ones...
     * @param         {Object}            [settings={}]     An object of settings for this particular SPromise instance. Here's the available settings:
     * - safeReject (true) {Boolean}: Specify if you prefere that your promise is "resolved" with an "Error" instance when rejected, or if you prefere the normal throw that does not resolve your promise and block the "await" statusment...
     * - cancelDefaultReturn (null) {Mixed}: Specify what you want to return by default if you cancel your promise without any value
     *
     * @example       js
     * const promise = new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     * }).then(value => {
     *    // do something...
     * }).finally(value => {
     *    // do something...
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }]);

  function SPromise(executorFn) {
    var _this;

    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SPromise);

    var _resolve, _reject;

    _this = _super.call(this, (resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    }); // .catch((e) => {
    // check if we have some catch callbacks or not...
    // if (!this._stacks || this._stacks.catch.length === 0) {
    //   let error = e.stack || typeof e === 'object' ? JSON.stringify(e) : e;
    //   const pe = new __prettyError();
    //   console.log(pe.render(new Error(error)));
    // }
    // });

    _defineProperty(_assertThisInitialized(_this), "_masterPromiseResolveFn", null);

    _defineProperty(_assertThisInitialized(_this), "_masterPromiseRejectFn", null);

    _defineProperty(_assertThisInitialized(_this), "_executorFn", null);

    _defineProperty(_assertThisInitialized(_this), "_isExecutorStarted", null);

    _defineProperty(_assertThisInitialized(_this), "_settings", {});

    _defineProperty(_assertThisInitialized(_this), "_status", 'pending');

    _defineProperty(_assertThisInitialized(_this), "_stacks", {
      then: [],
      catch: [],
      resolve: [],
      reject: [],
      finally: [],
      cancel: []
    });

    _this._masterPromiseResolveFn = _resolve;
    _this._masterPromiseRejectFn = _reject; // save the executor function

    _this._executorFn = executorFn; // extend settings

    _this._settings = (0, _deepMerge.default)({
      id: (0, _uniqid.default)(),
      safeReject: true,
      cancelDefaultReturn: null
    }, settings);
    setTimeout(() => {
      if (!_this._isExecutorStarted) {
        _this._executorFn(_this._resolve.bind(_assertThisInitialized(_this)), _this._reject.bind(_assertThisInitialized(_this)), _this.trigger.bind(_assertThisInitialized(_this)), _this._cancel.bind(_assertThisInitialized(_this)));

        _this._isExecutorStarted = true;
      }
    });
    return _this;
  }
  /**
   * @name                    status
   * @type                    String
   * @get
   *
   * Access the promise status. Can be one of these:
   * - pending: When the promise is waiting for resolution or rejection
   * - resolved: When the promise has been resolved
   * - rejected: When the promise has been rejected
   * - canceled: When the promise has been canceled
   * - destroyed: When the promise has been destroyed
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */


  _createClass(SPromise, [{
    key: "is",

    /**
     * @name                  is
     * @type                  Function
     *
     * Check is the promise is on one of the passed status
     *
     * @param       {String}        status        A comma separated list of status to check
     * @return      {Boolean}                     Return true if the promise is in one of the passed status
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    value: function is(status) {
      var statusArray = status.split(',').map(l => l.trim());
      if (statusArray.indexOf(this._status) !== -1) return true;
      return false;
    }
    /**
     * @name                  isPending
     * @type                  Function
     *
     * Return back true or false depending on the promise status
     *
     * @return    {Boolean}         true or false depending on the promise status
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "isPending",
    value: function isPending() {
      return this._status === 'pending';
    }
    /**
     * @name                  isResolved
     * @type                  Function
     *
     * Return back true or false depending on the promise status
     *
     * @return    {Boolean}         true or false depending on the promise status
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "isResolved",
    value: function isResolved() {
      return this._status === 'resolved';
    }
    /**
     * @name                  isRejected
     * @type                  Function
     *
     * Return back true or false depending on the promise status
     *
     * @return    {Boolean}         true or false depending on the promise status
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "isRejected",
    value: function isRejected() {
      return this._status === 'rejected';
    }
    /**
     * @name                  isCanceled
     * @type                  Function
     *
     * Return back true or false depending on the promise status
     *
     * @return    {Boolean}         true or false depending on the promise status
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "isCanceled",
    value: function isCanceled() {
      return this._status === 'canceled';
    }
    /**
     * @name                  isDestroyed
     * @type                  Function
     *
     * Return back true or false depending on the promise status
     *
     * @return    {Boolean}         true or false depending on the promise status
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "isDestroyed",
    value: function isDestroyed() {
      return this._status === 'destroyed';
    }
    /**
     * @name                    start
     * @type                    Function
     *
     * This method is useful when you want the executor function passed to the constructor to be called directly and not
     * as usual during the next javascript execution loop.
     *
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something
     * }).then(value => {
     *    // do something
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "start",
    value: function start() {
      if (this._isDestroyed) {
        throw new Error("Sorry but you can't call the \"start\" method on this SPromise cause it has been destroyed...");
      }

      if (this._isExecutorStarted) return;

      this._executorFn.apply(this, [this._resolve.bind(this), this._reject.bind(this), this.trigger.bind(this), this._cancel.bind(this)]);

      this._isExecutorStarted = true; // maintain chainability

      return this;
    }
    /**
     * @name          resolve
     * @type          Function
     * @async
     *
     * This is the "resolve" method exposed on the promise itself for convinience
     *
     * @param         {Mixed}         arg       The value that you want to return back from the promise
     * @param       {Array|String}         [stacksOrder='then,resolve,finally']      This specify in which order have to be called the stacks
     * @return        {Mixed}                   Return the resolve result value passed in each stacks specified in the second parameter
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "resolve",
    value: function resolve(arg) {
      var stacksOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'then,resolve,finally';
      return this._resolve(arg, stacksOrder);
    }
    /**
     * @name          _resolve
     * @type          Function
     * @private
     * @async
     *
     * This is the method that will be called by the promise executor passed resolve function
     *
     * @param       {Mixed}         arg           The argument that the promise user is sendind through the resolve function
     * @param       {Array|String}         [stacksOrder='then,resolve,finally']      This specify in which order have to be called the stacks
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_resolve",
    value: function () {
      var _resolve2 = _asyncToGenerator(function* (arg) {
        var stacksOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'then,resolve,finally';
        if (this._isDestroyed) return; // update the status

        this._status = 'resolved'; // exec the wanted stacks

        var stacksResult = yield this._triggerStacks(stacksOrder, arg); // resolve the master promise

        this._masterPromiseResolveFn(stacksResult); // return the stack result


        return stacksResult;
      });

      function _resolve(_x) {
        return _resolve2.apply(this, arguments);
      }

      return _resolve;
    }()
    /**
     * @name          reject
     * @type          Function
     * @async
     *
     * This is the "reject" method exposed on the promise itself for convinience
     *
     * @param         {Mixed}         arg       The value that you want to return back from the promise
     * @param       {Array|String}         [stacksOrder='then,reject,finally']      This specify in which order have to be called the stacks
     * @return        {Mixed}                   Return the reject result value passed in each stacks specified in the second parameter
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "reject",
    value: function reject(arg) {
      var stacksOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'then,reject,finally';
      return this._reject(arg, stacksOrder);
    }
    /**
     * @name          _reject
     * @type          Function
     * @private
     * @async
     *
     * This is the method that will be called by the promise executor passed reject function
     *
     * @param       {Mixed}         arg           The argument that the promise user is sendind through the reject function
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_reject",
    value: function () {
      var _reject2 = _asyncToGenerator(function* (arg) {
        var stacksOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'catch,reject,finally';
        if (this._isDestroyed) return; // update the status

        this._status = 'rejected'; // exec the wanted stacks

        var stacksResult = yield this._triggerStacks(stacksOrder, arg); // resolve the master promise

        if (this._settings.safeReject) {
          this._masterPromiseResolveFn(stacksResult || this._settings.cancelDefaultReturn);
        } else {
          this._masterPromiseRejectFn(stacksResult);
        } // return the stack result


        return stacksResult;
      });

      function _reject(_x2) {
        return _reject2.apply(this, arguments);
      }

      return _reject;
    }()
    /**
     * @name          cancel
     * @type          Function
     * @async
     *
     * This is the "cancel" method exposed on the promise itself for convinience
     *
     * @param         {Mixed}         arg       The value that you want to return back from the promise
     * @param       {Array|String}         [stacksOrder='cancel']      This specify in which order have to be called the stacks
     * @return        {Mixed}                   Return the cancel result value passed in each stacks specified in the second parameter
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "cancel",
    value: function cancel(arg) {
      var stacksOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'cancel';
      return this._cancel(arg, stacksOrder);
    }
    /**
     * @name            _cancel
     * @type            Function
     * @private
     * @async
     *
     * Cancel the promise execution, destroy the Promise and resolve it with the passed value without calling any callbacks
     *
     * @param         {Mixed}           arg           The argument you want to pass to the cancel callbacks
     * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_cancel",
    value: function () {
      var _cancel2 = _asyncToGenerator(function* (arg) {
        var stacksOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'cancel';
        if (this._isDestroyed) return; // update the status

        this._status = 'canceled'; // exec the wanted stacks

        var stacksResult = yield this._triggerStacks(stacksOrder, arg); // resolve the master promise

        this._masterPromiseResolveFn.apply(this, [stacksResult || null, this]); // return the stack result


        return stacksResult;
      });

      function _cancel(_x3) {
        return _cancel2.apply(this, arguments);
      }

      return _cancel;
    }()
    /**
     * @name          trigger
     * @type          Function
     * @async
     *
     * This is the method that allows you to trigger the callbacks like "then", "catch", "finally", etc... without actually resolving the Promise itself
     *
     * @param         {String|Array}        what            The callbacks that you want to trigger. Can be "then", "catch", "finally" or "cancel". You can trigger multiple stacks by passing an Array like ['then','finally'], or a string like "then,finally"
     * @param         {Mixed}         arg         The argument you want to pass to the callback
     * @return        {Promise}                       A default Promise that will be resolved with the result of the stack execution
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    trigger('then', 'hello world');
     *    setTimeout(() => {
     *      resolve('something');
     *    }, 2000);
     * }).then(value => {
     *    // do something with one time "hello world", and one time "something"...
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "trigger",
    value: function () {
      var _trigger = _asyncToGenerator(function* (what, arg) {
        if (this._isDestroyed) return; // triger the passed stacks

        return this._triggerStacks(what, arg);
      });

      function trigger(_x4, _x5) {
        return _trigger.apply(this, arguments);
      }

      return trigger;
    }()
    /**
     * @name            _registerNewStacks
     * @type            Function
     * @private
     *
     * This methods allows you to register new stacks.
     * A new stack can be called then using the "on('stackName', ...)" method,
     * or directly on the SPromise instance like so "myPromise.stackName(...)".
     *
     * @param       {String|Array}      stacks        The stack(s) name(s) you want to register. Can be an Array or a comma separated string
     * @return      {SPromise}                        The SPromise instance
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_registerNewStacks",
    value: function _registerNewStacks(stacks) {
      // split the stacks order
      if (typeof stacks === 'string') stacks = stacks.split(',').map(s => s.trim());
      stacks.forEach(stack => {
        if (!this._stacks[stack]) {
          this._stacks[stack] = [];
        }
      });
    }
    /**
     * @name            _registerCallbackInStack
     * @type            Function
     *
     * This function take as argument a stack array and register into it the passed callback function
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_registerCallbackInStack",
    value: function _registerCallbackInStack(stack) {
      if (this._isDestroyed) {
        throw new Error("Sorry but you can't call the \"".concat(stack, "\" method on this SPromise cause it has been destroyed..."));
      } // make sure the stack exist


      if (!this._stacks[stack]) {
        this._registerNewStacks(stack);
      }

      if (typeof stack === 'string') stack = this._stacks[stack]; // process the args

      var callback = arguments.length <= 1 ? undefined : arguments[1];
      var callNumber = -1;

      if ((arguments.length <= 1 ? 0 : arguments.length - 1) === 2 && typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'number') {
        callback = arguments.length <= 2 ? undefined : arguments[2];
        callNumber = arguments.length <= 1 ? undefined : arguments[1];
      } // make sure this is a function and register it to the _catchStack


      if (typeof callback === 'function' && stack.indexOf(callback) === -1) stack.push({
        callback,
        callNumber,
        called: 0
      }); // maintain chainability

      return this;
    }
    /**
     * @name            _triggerStack
     * @type            Function
     * @private
     * @async
     *
     * This function take an Array Stack as parameter and execute it to return the result
     *
     * @param         {Array|String}             stack             The stack to execute. Can be the stack array directly, or just the stack name like "then", "catch", etc.stack.stack.
     * @param         {Mixed}             initialValue      The initial value to pass to the first stack callback
     * @return        {Promise}                             A promise resolved with the stack result
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_triggerStack",
    value: function () {
      var _triggerStack2 = _asyncToGenerator(function* (stack, initialValue) {
        var currentCallbackReturnedValue = initialValue; // console.log(this._stacks);

        if (!this._stacks || Object.keys(this._stacks).length === 0) return currentCallbackReturnedValue;
        var stackArray = [];

        if (typeof stack === 'string') {
          // make sure the stack exist
          // if (!this._stacks[stack]) {
          //   this._registerNewStacks(stack);
          // }
          if (this._stacks[stack]) {
            stackArray = [...stackArray, ...this._stacks[stack]];
          } // check if the stack is a glob pattern


          Object.keys(this._stacks).forEach(stackName => {
            if (stackName === stack) return;
            var toAvoid = ['then', 'catch', 'resolve', 'reject', 'finally', 'cancel'];
            if (toAvoid.indexOf(stack) !== -1 || toAvoid.indexOf(stackName) !== -1) return; // console.log('CHECK', stack, stackName);

            if ((0, _minimatch.default)(stack, stackName)) {
              // if (stackName === '*' && stack === 'start') {
              //   console.log('SOMETHING GOOD', stackName, stack);
              // }
              // the glob pattern match the triggered stack so add it to the stack array
              stackArray = [...stackArray, ...this._stacks[stackName]];
            }
          });
        } // filter the catchStack


        stackArray.map(item => item.called++);
        stackArray = stackArray.filter(item => {
          if (item.callNumber === -1) return true;
          if (item.called <= item.callNumber) return true;
          return false;
        });

        for (var i = 0; i < stackArray.length; i++) {
          // get the actual item in the array
          var item = stackArray[i]; // make sure the stack exist

          if (!item.callback) return currentCallbackReturnedValue; // call the callback function

          var callbackResult = item.callback(currentCallbackReturnedValue, stack); // check if the callback result is a promise

          if (Promise.resolve(callbackResult) === callbackResult) {
            callbackResult = yield callbackResult;
          } // if the settings tells that we have to pass each returned value to the next callback


          if (callbackResult !== undefined) {
            currentCallbackReturnedValue = callbackResult;
          }
        } // return the result


        return currentCallbackReturnedValue;
      });

      function _triggerStack(_x6, _x7) {
        return _triggerStack2.apply(this, arguments);
      }

      return _triggerStack;
    }()
    /**
     * @name          _triggerStacks
     * @type          Function
     * @private
     * @async
     *
     * This function take as parameters a list of stacks to trigger like an Array ['then','finnaly'], or a string like so "then,finally", and as second parameter,
     * the initial value to pass to the first callback of the joined stacks...
     *
     * @param         {Array|String}            stacks          The stacks to trigger
     * @param         {Mixed}                   initialValue    The initial value to pass to the first stack callback
     * @return        {Promise}                                 A promise that will be resolved with the stacks resulting value
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_triggerStacks",
    value: function () {
      var _triggerStacks2 = _asyncToGenerator(function* (stacks, initialValue) {
        // check if the stacks is "*"
        if (typeof stacks === 'string') stacks = stacks.split(',').map(s => s.trim()); // stacks.push('*');

        var currentStackResult = initialValue;

        for (var i = 0; i < stacks.length; i++) {
          var stackResult = yield this._triggerStack(stacks[i], currentStackResult);

          if (stackResult !== undefined) {
            currentStackResult = stackResult;
          } // await this._triggerStack('*', currentStackResult, stacks[i]);
          // this._triggerAllStack(stacks[i], currentStackResult);

        }

        return currentStackResult;
      });

      function _triggerStacks(_x8, _x9) {
        return _triggerStacks2.apply(this, arguments);
      }

      return _triggerStacks;
    }()
    /**
     * @name                on
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "resolve" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "on", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {String|Array}      stacks        The stacks in which you want register your callback. Either an Array like ['then','finally'], or a String like "then,finally"
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    resolve('hello world');
     * }).on('then', value => {
     *    // do something with the value that is "hello world"
     * }).on('catch:1', error => {
     *    // do something that will be called only once
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "on",
    value: function on(stacks, callback) {
      if (this._isDestroyed) {
        throw new Error("Sorry but you can't call the \"on\" method on this SPromise cause it has been destroyed...");
      }

      if (typeof stacks === 'string') stacks = stacks.split(',').map(s => s.trim()); // loop on each stacks

      stacks.forEach(name => {
        // check if it has a callNumber specified using name:1
        var splitedName = name.split('{');
        var callNumber = -1;

        if (splitedName.length === 2) {
          name = splitedName[0];
          callNumber = parseInt(splitedName[1].replace('}', ''));
        } // calling the registration method


        this._registerCallbackInStack(name, callNumber, callback);
      }); // maintain chainability

      return this;
    }
    /**
     * @name            off
     * @type            Function
     *
     * This method allows you to unsubscribe to an event by passing the event name an optionally the callback function.
     * If you don't pass the callback function, all the subscribed events the same as the passed one will be unsubscribed.
     *
     * @param       {String}        name        The event name to unsubscribe to
     * @param       {Function}    [callback=null]     The callback function you want to unsubscribe
     * @return      {SPromise}                The SPromise instance to maintain chainability
     *
     * @since     2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "off",
    value: function off(name) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!callback) {
        delete this._stacks[name];
        return this;
      } // get the stack


      var stack = this._stacks[name];
      if (!stack) return this; // loop on the stack registered callback to finc the one to delete

      stack = stack.filter(item => {
        if (item.callback === callback) return false;
        return true;
      }); // make sure we have saved the new stack

      this._stacks[name] = stack; // maintain chainability

      return this;
    }
    /**
     * @name                then
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "resolve" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Number}          [callNumber=-1]     (Optional) How many times you want this callback to be called at max. -1 means unlimited
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    resolve('hello world');
     * }).then(value => {
     *    // do something with the value that is "hello world"
     *    return new Promise((resolve, reject) => {
     *       setTimeout(() => resolve('hola'), 1000);
     *    });
     * }).then(2, value => {
     *    // do something that will be executed only twice
     *    // do something with the value passed "hola"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "then",
    value: function then() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args.length === 2 && typeof args[0] === 'function' && typeof args[1] === 'function') {
        this._masterPromiseResolveFn = args[0];
        this._masterPromiseRejectFn = args[1];
        return;
      }

      return this._registerCallbackInStack('then', ...args);
    }
    /**
     * @name                catch
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Number}          [callNumber=-1]     (Optional) How many times you want this callback to be called at max. -1 means unlimited
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    reject('hello world');
     * }).catch(value => {
     *    // do something with the value that is "hello world"
     * }).catch(1, value => {
     *    // do something that will be executed only once
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "catch",
    value: function _catch() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _get(_getPrototypeOf(SPromise.prototype), "catch", this).call(this, ...args);

      return this._registerCallbackInStack('catch', ...args);
    }
    /**
     * @name                finally
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    resolve('hello world');
     * }).finally(value => {
     *    // do something with the value that is "hello world"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "finally",
    value: function _finally() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this._registerCallbackInStack('finally', ...args);
    }
    /**
     * @name                resolved
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    resolve('hello world');
     * }).resolved(value => {
     *    // do something with the value that is "hello world"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "resolved",
    value: function resolved() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this._registerCallbackInStack('resolve', ...args);
    }
    /**
     * @name                rejected
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    resolve('hello world');
     * }).rejected(value => {
     *    // do something with the value that is "hello world"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "rejected",
    value: function rejected() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return this._registerCallbackInStack('reject', ...args);
    }
    /**
     * @name                canceled
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called once when the "revoke" function has been called
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Function}        callback        The callback function to register
     * @return          {Promise}                  A simple promise that will be resolved with the cancel stack result
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    cancel('hello world');
     * }).canceled(value => {
     *    // do something with the value that is "hello world"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "canceled",
    value: function canceled() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return this._registerCallbackInStack('cancel', ...args);
    }
    /**
     * @name                cancel
     * @type                Function
     *
     * This method allows the user to cancel the promise execution.
     * This mean that the promise will be resolved but not trigger any
     * other stacks like "resolve,reject,etc..."
     *
     * @param           {Mixed}         [value=null]      A value that you want to pass to the resolve promise
     * @return          {Promise}                  A simple promise that will be resolved with the cancel stack result
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    cancel('hello world');
     * }).canceled(value => {
     *    // do something with the value that is "hello world"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "cancel",
    value: function cancel() {
      if (this._isDestroyed) return;
      return this._cancel(...arguments);
    }
    /**
     * @name                      _destroy
     * @type                      Function
     *
     * Destroying the SPromise instance by unregister all the callbacks, etc...
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      // update the status
      this._status = 'destroyed'; // destroying all the callbacks stacks registered

      delete this._stacks; // delete this._isExecutorStarted; // keep it to avoid errors in the "setTimeout" function in the masterPromise executor...

      delete this._executorFn;
      delete this._masterPromiseResolveFn;
      delete this._masterPromiseRejectFn;
      delete this._masterPromise;
      this._isDestroyed = true;
    }
  }, {
    key: "status",
    get: function get() {
      return this._status;
    }
  }]);

  return SPromise;
}( /*#__PURE__*/_wrapNativeSuper(Promise));

exports.default = SPromise;
module.exports = exports.default;

/***/ }),

/***/ "../src/js/string/camelize.js":
/*!************************************!*\
  !*** ../src/js/string/camelize.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = camelize;

/**
 * @name        camelize
 * @namespace           js.string
 * @type      Function
 *
 * Camelize a string
 *
 * @param         {String}          text        The string to camelize
 * @param         {String}          [charsRange='_-\\s']      The regex chars range to remove and camelize the next character
 * @return        {String}                      The camelized string
 *
 * @example     js
 * import camelize from '@coffeekraken/sugar/js/string/camelize';
 * camelize('hello world'); // => helloWorld
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function camelize(text) {
  var chars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_-\\s';
  var res = '';
  var reg = new RegExp("(?:^|[".concat(chars, "])(w)"), 'g');
  res = text.replace(reg, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
  res = res.substr(0, 1).toLowerCase() + res.slice(1);
  return res.trim();
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/string/paramCase.js":
/*!*************************************!*\
  !*** ../src/js/string/paramCase.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _paramCase = __webpack_require__(/*! param-case */ "../node_modules/param-case/dist.es2015/index.js");

/**
 * @name          paramCase
 * @namespace           js.string
 * @type          Function
 *
 * This function transform a string into a param case one like so "something-cool"
 *
 * @param       {String}        string          The string to convert
 * @return      {String}                        The converted string
 *
 * @example       js
 * import paramCase from '@coffeekraken/sugar/js/string/paramCase';
 * paramCase('some thoing cool'); // => some-thing-cool
 *
 * @see         https://www.npmjs.com/package/param-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function _default(string) {
  return (0, _paramCase.paramCase)(string);
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/string/parse.js":
/*!*********************************!*\
  !*** ../src/js/string/parse.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name                                  parse
 * @namespace           js.string
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
    return Function("\n      \"use strict\";\n      return (".concat(value, ");\n    "))();
  } catch (e) {
    return value;
  }
};

exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "../src/js/string/toString.js":
/*!************************************!*\
  !*** ../src/js/string/toString.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toString;

var _json = _interopRequireDefault(__webpack_require__(/*! ../is/json */ "../src/js/is/json.js"));

var _object = _interopRequireDefault(__webpack_require__(/*! ../is/object */ "../src/js/is/object.js"));

var _array = _interopRequireDefault(__webpack_require__(/*! ../is/array */ "../src/js/is/array.js"));

var _function = _interopRequireDefault(__webpack_require__(/*! ../is/function */ "../src/js/is/function.js"));

var _boolean = _interopRequireDefault(__webpack_require__(/*! ../is/boolean */ "../src/js/is/boolean.js"));

var _regexp = _interopRequireDefault(__webpack_require__(/*! ../is/regexp */ "../src/js/is/regexp.js"));

var _string = _interopRequireDefault(__webpack_require__(/*! ../is/string */ "../src/js/is/string.js"));

var _number = _interopRequireDefault(__webpack_require__(/*! ../is/number */ "../src/js/is/number.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name        toString
 * @namespace           js.string
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
  } else if (value === null) {
    return 'null';
  } else if (typeof value === 'symbol' || typeof value === 'typedArray' || value instanceof Date || typeof value === 'color') {
    return value.toString();
  } else if ((0, _object.default)(value) || (0, _array.default)(value) || (0, _json.default)(value)) {
    return JSON.stringify(value);
  } else if ((0, _boolean.default)(value)) {
    if (value) return 'true';else return 'false';
  } else if ((0, _function.default)(value)) {
    return '' + value;
  } else if ((0, _regexp.default)(value)) {
    return value.toString();
  } else if ((0, _number.default)(value)) {
    return value.toString();
  } else if (value === undefined) {
    return 'undefined';
  } else {
    var returnVal;

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

module.exports = exports.default;

/***/ }),

/***/ "../src/js/string/uncamelize.js":
/*!**************************************!*\
  !*** ../src/js/string/uncamelize.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uncamelize;

/**
 * @name        uncamelize
 * @namespace           js.string
 * @type      Function
 *
 * Uncamelize a string
 *
 * @param    {String}    string    The string to uncamelize
 * @param    {String}    [separator='-']    The separator to use
 * @return    {String}    The uncamelized string
 *
 * @example    js
 * import uncamelize from '@coffeekraken/sugar/js/string/uncamelize'
 * uncamelize('helloWorldAndUniverse') // hello-world-and-universe
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function uncamelize(text) {
  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
  // Replace all capital letters by separator followed by lowercase one
  var res = '';
  res = text.replace(/[A-Z]/g, function (letter) {
    return separator + letter.toLowerCase();
  }); // Remove first separator (to avoid _hello_world name)

  if (res.slice(0, 1) === separator) res = res.slice(1);
  return res;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/string/uniqid.js":
/*!**********************************!*\
  !*** ../src/js/string/uniqid.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uniqid;

var _uniqid = _interopRequireDefault(__webpack_require__(/*! uniqid */ "../node_modules/uniqid/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name          uniqid
 * @namespace           js.string
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

module.exports = exports.default;

/***/ }),

/***/ "../src/js/string/upperFirst.js":
/*!**************************************!*\
  !*** ../src/js/string/upperFirst.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = upperFirst;

/**
 * @name        upperFirst
 * @namespace           js.string
 * @type      Function
 *
 * Upper first
 *
 * @param    {String}    string    The string to process
 * @return    {String}    The processed string with first letter uppercase
 *
 * @example    js
 * import upperFirst from '@coffeekraken/sugar/js/string/upperFirst'
 * upperFirst('hello world') // Hello world
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/time/wait.js":
/*!******************************!*\
  !*** ../src/js/time/wait.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wait;

/**
 * @name            wait
 * @namespace           js.time
 * @type            Function
 * @async
 *
 * This function is a simple "setTimeout" wrapper inside a promise.
 *
 * @param         {Number}        timeout       The timeout to wait in ms
 * @return        {Promise}                     A simple promise resolved once the timeout is finished
 *
 * @example       js
 * import wait from '@coffeekraken/sugar/js/time/wait';
 * await wait(2000);
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/value/validateWithDefinitionObject.js":
/*!*******************************************************!*\
  !*** ../src/js/value/validateWithDefinitionObject.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateWithDefinitionObject;

var _ofType = _interopRequireDefault(__webpack_require__(/*! ../is/ofType */ "../src/js/is/ofType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name          validateWithDefinitionObject
 * @namespace     js.value
 * @type          Function
 *
 * This function take a value and check if it correspond to the passed definition object.
 * If the value pass the test, the function will return true, otherwise it will return
 * a string that describe the issue.
 *
 * @param         {Mixed}       value       The value to check
 * @param         {Object}      definitionObj     THe definition object
 * @param         {String}      [name=null]     A name for the check. Usefull for debugging purpose
 * @return         {Boolean|String}           true if the check is passed, a string describing the issue if not
 *
 * @example       js
 * import validateWithDefinitionObject from '@coffeekraken/sugar/js/value/validateWithDefinitionObject';
 * validateWithDefinitionObject(true, {
 *    type: 'Boolean|String',
 *    required: true
 * }); // => true
 *
 * @todo      tests
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function validateWithDefinitionObject(value, definitionObj) {
  var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  // validate type
  if (value !== undefined && definitionObj.type) {
    var isOfTypeResult = (0, _ofType.default)(value, definitionObj.type, true);

    if (isOfTypeResult !== true) {
      return "".concat(name, ": ").concat(isOfTypeResult);
    }
  } // check required


  if (definitionObj.required === true) {
    if (value === null || value === undefined) {
      return "The property \"<yellow>".concat(name, "</yellow>\" is <green>required</green>...");
    }
  }

  return true;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/webcomponent/SLitHtmlWebComponent.js":
/*!******************************************************!*\
  !*** ../src/js/webcomponent/SLitHtmlWebComponent.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SLitHtmlWebComponent;

var _SWebComponent2 = _interopRequireDefault(__webpack_require__(/*! ./SWebComponent */ "../src/js/webcomponent/SWebComponent.js"));

var _litHtml = __webpack_require__(/*! lit-html */ "../node_modules/lit-html/lit-html.js");

var _throttle = _interopRequireDefault(__webpack_require__(/*! ../function/throttle */ "../src/js/function/throttle.js"));

var _insertAfter = _interopRequireDefault(__webpack_require__(/*! ../dom/insertAfter */ "../src/js/dom/insertAfter.js"));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../object/deepMerge */ "../src/js/object/deepMerge.js"));

var _asyncReplace = __webpack_require__(/*! lit-html/directives/async-replace.js */ "../node_modules/lit-html/directives/async-replace.js");

var _asyncAppend = __webpack_require__(/*! lit-html/directives/async-append.js */ "../node_modules/lit-html/directives/async-append.js");

var _cache = __webpack_require__(/*! lit-html/directives/cache.js */ "../node_modules/lit-html/directives/cache.js");

var _classMap = __webpack_require__(/*! lit-html/directives/class-map.js */ "../node_modules/lit-html/directives/class-map.js");

var _ifDefined = __webpack_require__(/*! lit-html/directives/if-defined */ "../node_modules/lit-html/directives/if-defined.js");

var _guard = __webpack_require__(/*! lit-html/directives/guard */ "../node_modules/lit-html/directives/guard.js");

var _repeat = __webpack_require__(/*! lit-html/directives/repeat */ "../node_modules/lit-html/directives/repeat.js");

var _styleMap = __webpack_require__(/*! lit-html/directives/style-map.js */ "../node_modules/lit-html/directives/style-map.js");

var _templateContent = __webpack_require__(/*! lit-html/directives/template-content */ "../node_modules/lit-html/directives/template-content.js");

var _unsafeHtml = __webpack_require__(/*! lit-html/directives/unsafe-html.js */ "../node_modules/lit-html/directives/unsafe-html.js");

var _unsafeSvg = __webpack_require__(/*! lit-html/directives/unsafe-svg */ "../node_modules/lit-html/directives/unsafe-svg.js");

var _until = __webpack_require__(/*! lit-html/directives/until.js */ "../node_modules/lit-html/directives/until.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      <p>\n        You need to specify a static template property for your component...\n      </p>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name              SLitHtmlWebComponent
 * @namespace           js.webcomponent
 * @type              Class
 * @extends           SWebComponent
 *
 * // TODO: example
 *
 * Base class that you can extends to create some SWebComponent with Lit Html rendering capabilities
 *
 * @param       {Object}        [settings={}]         A setting object to configure your webcomponent instance:
 * - defaultProps ({}) {Object}: Specify the default properties values
 * - physicalProps ([]) {Array<String>}: List all the properties that need to be ALWAYS on the html element (for styling purpose for example...)
 * - requiredProps ([]) {Array<String>}: List all the properties that MUST be passed to the component
 *
 * @example         js
 * import SLitHtmlWebComponent from '@coffeekraken/sugar/js/webcomponent/SLitHtmlWebComponent';
 * class MyCoolComponent extends SLitHtmlWebComponent {
 *
 *    constructor(settings = {}) {
 *      super(settings);
 *    }
 *
 * }
 *
 * @since       2.0.0
 * @see       https://lit-html.polymer-project.org/
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function SLitHtmlWebComponent() {
  var _class, _temp;

  var extend = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : HTMLElement;
  return _temp = _class = /*#__PURE__*/function (_SWebComponent) {
    _inherits(SLitHtmlWebComponent, _SWebComponent);

    var _super = _createSuper(SLitHtmlWebComponent);

    /**
     * @name        template
     * @type        Function
     * @static
     *
     * This static variable store a function that has as parameter the state object
     * of your component and the lit-html ```html``` function that you can use in your template.
     * This function MUST return a template string representing your component HTML depending on the state
     * object at this point.
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name        lit
     * @type        Object
     *
     * Store all the litHtml functions that you may need
     *
     * @see       https://lit-html.polymer-project.org/guide/template-reference
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function SLitHtmlWebComponent() {
      var _this;

      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, SLitHtmlWebComponent);

      _this = _super.call(this, (0, _deepMerge.default)({}, settings)); // wait until mounted to render the component first time

      _defineProperty(_assertThisInitialized(_this), "lit", {
        html: _litHtml.html,
        render: _litHtml.render,
        asyncReplace: _asyncReplace.asyncReplace,
        asyncAppend: _asyncAppend.asyncAppend,
        cache: _cache.cache,
        classMap: _classMap.classMap,
        ifDefined: _ifDefined.ifDefined,
        guard: _guard.guard,
        repeat: _repeat.repeat,
        styleMap: _styleMap.styleMap,
        templateContent: _templateContent.templateContent,
        unsafeHTML: _unsafeHtml.unsafeHTML,
        unsafeSVG: _unsafeSvg.unsafeSVG,
        until: _until.until
      });

      _defineProperty(_assertThisInitialized(_this), "render", (0, _throttle.default)(function () {
        var tpl = this.constructor.template(this._props, this.metas, this._settings, this.lit);
        (0, _litHtml.render)(tpl, this.$container);
      }, 50));

      _this.on('mounted{1}', () => {
        // generate a container for the component
        _this.$container = document.createElement('div');
        _this.$container.className = "".concat(_this.metas.dashName);
        (0, _insertAfter.default)(_this.$container, _assertThisInitialized(_this)); // render for the first time

        _this.render(); // dispatch a ready event


        _this.dispatch('ready', _assertThisInitialized(_this));
      });

      return _this;
    }
    /**
     * @name          render
     * @type          Function
     *
     * This method is called every time an update has been made in the state object
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */


    _createClass(SLitHtmlWebComponent, [{
      key: "$",
      value: function $(path) {
        var $result = this.$container.querySelector(path);

        if (!$result && !path.includes(".".concat(this.metas.dashName, "__"))) {
          path = path.replace(/^\./, ".".concat(this.metas.dashName, "__"));
          $result = this.$container.querySelector(path);
        }

        return $result;
      }
    }, {
      key: "$$",
      value: function $$(path) {
        var $result = this.$container.querySelectorAll(path);

        if (!$result && !path.includes(".".concat(this.metas.dashName, "__"))) {
          path = path.replace(/^\./, ".".concat(this.metas.dashName, "__"));
          $result = this.$container.querySelectorAll(path);
        }

        return $result;
      }
    }, {
      key: "className",
      value: function className(cls) {
        var hasDot = cls.match(/^\./);
        cls = cls.replace('.', '');
        if (cls.match(/^(--)/)) return "".concat(hasDot ? '.' : '').concat(this.metas.dashName).concat(cls);
        return "".concat(hasDot ? '.' : '').concat(this.metas.dashName, "__").concat(cls);
      }
      /**
       * @name          handleProp
       * @type          Function
       * @async
       *
       * This method is supposed to be overrided by your component integration
       * to handle the props updates and delete actions.
       * The passed description object has this format:
       * ```js
       * {
       *    action: 'set|delete',
       *    path: 'something.cool',
       *    oldValue: '...',
       *    value: '...'
       * }
       * ```
       *
       * @param     {String}      prop      The property name that has been updated or deleted
       * @param     {Object}      descriptionObj      The description object that describe the update or delete action
       * @return    {Promise}                A promise that has to be resolved once the update has been handled correctly. You have to pass the prop variable to the resolve function
       *
       * @since     2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "handleProp",
      value: function handleProp(prop, propObj) {
        return new Promise((resolve, reject) => {
          this.render();
          setTimeout(() => {
            this.render();
          }, 100);
          resolve(prop);
        });
      }
    }]);

    return SLitHtmlWebComponent;
  }((0, _SWebComponent2.default)(extend)), _defineProperty(_class, "template", (props, component, html) => html(_templateObject())), _temp;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/webcomponent/SWebComponent.js":
/*!***********************************************!*\
  !*** ../src/js/webcomponent/SWebComponent.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SWebComponent;

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../object/deepMerge */ "../src/js/object/deepMerge.js"));

var _SPromise = _interopRequireDefault(__webpack_require__(/*! ../promise/SPromise */ "../src/js/promise/SPromise.js"));

var _parse = _interopRequireDefault(__webpack_require__(/*! ../string/parse */ "../src/js/string/parse.js"));

var _toString = _interopRequireDefault(__webpack_require__(/*! ../string/toString */ "../src/js/string/toString.js"));

var _when = _interopRequireDefault(__webpack_require__(/*! ../dom/when */ "../src/js/dom/when.js"));

var _camelize = _interopRequireDefault(__webpack_require__(/*! ../string/camelize */ "../src/js/string/camelize.js"));

var _paramCase = _interopRequireDefault(__webpack_require__(/*! ../string/paramCase */ "../src/js/string/paramCase.js"));

var _uncamelize = _interopRequireDefault(__webpack_require__(/*! ../string/uncamelize */ "../src/js/string/uncamelize.js"));

var _validateWithDefinitionObject = _interopRequireDefault(__webpack_require__(/*! ../value/validateWithDefinitionObject */ "../src/js/value/validateWithDefinitionObject.js"));

var _watch = _interopRequireDefault(__webpack_require__(/*! ../object/watch */ "../src/js/object/watch.js"));

var _register = __webpack_require__(/*! ./register */ "../src/js/webcomponent/register.js");

var _uniqid = _interopRequireDefault(__webpack_require__(/*! ../string/uniqid */ "../src/js/string/uniqid.js"));

var _dispatch = _interopRequireDefault(__webpack_require__(/*! ../event/dispatch */ "../src/js/event/dispatch.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name              SWebComponent
 * @namespace           js.webcomponent
 * @type              Class
 * @extends           HTMLElement
 *
 * // TODO: example
 *
 * Base class that allows you to create easily new webcomponents and handle things like attributes updates,
 * base css (scss) importing, etc... Here's a list a features that this class covers:
 * - Listen for attributes changes
 * - Mount the component at a certain point in time (inViewport, visible, etc...)
 * - **Automatically cast the attributes** to their proper js variable types (Array, Object, String, etc...)
 * - **Physical props** : Specify some props that will ALWAYS be present as attribute on the component for styling purpose
 * - Define some **default CSS** that will be injected in the head automatically
 * - Specify some **required props**
 * - **Full lifecycle management** through "events":
 * 	  - attach: Dispatched when the component is attached to the DOM
 *    - detach: Dispatched when the component is detached from the DOM
 *    - mounting: Dispatched when the component starts to mount itself (before mountWhen and mountDependencies execution)
 *    - mounted: Dispatched when the component has be mounted properly
 *    - prop|prop.{name}: Dispatched when a property has been updated, removed or added
 *      - The object format sended with the event is this one:
 *        - { prop: 'propName', action: 'update|remove|add', value: 'Something', previousValue: 'Other' }
 * - **Mount dependencies** : This will allows you to set some promises that have to be resolved before mounting the component
 *
 * @param       {Object}        [settings={}]         A setting object to configure your webcomponent instance:
 * - defaultProps ({}) {Object}: Specify the default properties values
 * - physicalProps ([]) {Array<String>}: List all the properties that need to be ALWAYS on the html element (for styling purpose for example...)
 * - requiredProps ([]) {Array<String>}: List all the properties that MUST be passed to the component
 *
 * @example         js
 * import SWebComponent from '@coffeekraken/sugar/js/webcomponent/SWebComponent';
 * class MyCoolComponent extends SWebComponent {
 *
 *    constructor() {
 *      super();
 *    }
 *
 * }
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function SWebComponent() {
  var _temp;

  var extend = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : HTMLElement;
  return _temp = /*#__PURE__*/function (_extend) {
    _inherits(SWebComponent, _extend);

    var _super = _createSuper(SWebComponent);

    _createClass(SWebComponent, null, [{
      key: "observedAttributes",

      /**
       * @name          _promise
       * @type          SPromise
       * @private
       *
       * Store the SPromise instance used to "dispatch" some events
       * that you can subscribe using the "on" exposed method
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

      /**
       * @name          _props
       * @type          Object
       * @private
       *
       * Store all the computed properties setted using the "setProp" method or through the
       * attributes
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

      /**
       * @name          _settings
       * @type          Object
       * @private
       *
       * Store all the webcomponent settings like "physicalProps", "requiredProps", etc...
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

      /**
       * @name        observedAttributes
       * @type        Function
       * @get
       * @static
       *
       * This medhod simply return the list of props that will be
       * observed by the customElements under the hood system.
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      get: function get() {
        return Object.keys(this.props);
      }
      /**
       * @name          constructor
       * @type          Function
       * @constructor
       *
       * Constructor
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }]);

    function SWebComponent() {
      var _this;

      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, SWebComponent);

      // init base html element
      _this = _super.call(this); // get component metas

      _defineProperty(_assertThisInitialized(_this), "_settedAttributesStack", {});

      _defineProperty(_assertThisInitialized(_this), "_promise", null);

      _defineProperty(_assertThisInitialized(_this), "_props", {});

      _defineProperty(_assertThisInitialized(_this), "_settings", {});

      _this._metas = (0, _register.getComponentMetas)(_this.constructor.componentName); // save the settings

      _this._settings = (0, _deepMerge.default)({
        id: (0, _uniqid.default)(),
        props: _this.constructor.props || {}
      }, _this._metas.settings || {}, settings); // create the SPromise instance

      _this._promise = new _SPromise.default(() => {}).start();

      var _loop = function _loop(key) {
        _this._props[key] = _objectSpread(_objectSpread({}, _this._settings.props[key]), {}, {
          // valuesStack: [],
          value: _this._settings.props[key].default,
          previousValue: undefined
        }); // if need to be watches deeply

        if (_this._props[key].watch) {
          _this._props[key] = (0, _watch.default)(_this._props[key]);

          _this._props[key].on('value.*:+(set|delete|push|pop)', update => {
            if (update.path.split('.').length === 1) {
              _this.prop(update.path, update.value);
            } else {
              _this.handleProp(update.path, _this._props[key]);
            }
          });
        }
      };

      for (var key in _this._settings.props) {
        _loop(key);
      } // apply the $node class


      _this.classList.add("".concat(_this.metas.dashName, "__node")); // launch the mounting process


      setTimeout(_this._mount.bind(_assertThisInitialized(_this)));
      return _this;
    }
    /**
     * @name          metas
     * @type          Object
     * @get
     *
     * This property store all the component metas informations like the name,
     * the type, what it is extending, etc...
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */


    _createClass(SWebComponent, [{
      key: "_mount",

      /**
       * @name          _mount
       * @type          Function
       * @private
       * @async
       *
       * This method handle the mounting of the component
       *
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      value: function () {
        var _mount2 = _asyncToGenerator(function* () {
          // dispatch mounting event
          this.dispatch('mounting', this); // wait until the component match the mountDependencies and mountWhen status

          yield this._mountDependencies(); // check props definition

          this._checkPropsDefinition(); // handle physical props


          this._handlePhysicalProps(); // dispatch mounted event


          this.dispatch('mounted', this);
        });

        function _mount() {
          return _mount2.apply(this, arguments);
        }

        return _mount;
      }()
      /**
       * @name          handleProp
       * @type          Function
       * @async
       *
       * This method is supposed to be overrided by your component integration
       * to handle the props updates and delete actions.
       * The passed description object has this format:
       * ```js
       * {
       *    action: 'set|delete',
       *    path: 'something.cool',
       *    oldValue: '...',
       *    value: '...'
       * }
       * ```
       *
       * @param     {String}      prop      The property name that has been updated or deleted
       * @param     {Object}      descriptionObj      The description object that describe the update or delete action
       * @return    {Promise}                A promise that has to be resolved once the update has been handled correctly. You have to pass the prop variable to the resolve function
       *
       * @since     2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "handleProp",
      value: function handleProp(prop, descriptionObj) {
        return new Promise((resolve, reject) => {
          resolve(prop);
        });
      }
      /**
       * @name          on
       * @type          Function
       *
       * Method used to subscribe to the "events" dispatched
       * during the lifecycle of the component. Here's the list of events:
       * - attach: Dispatched when the component is attached to the DOM
       * - detach: Dispatched when the component is detached from the DOM
       * - mounting: Dispatched when the component starts to mount itself (before mountWhen and mountDependencies execution)
       * - mounted: Dispatched when the component has be mounted properly
       * - prop|prop.{name}: Dispatched when a property has been updated, removed or added
       *    - The object format sended with the event is this one:
       *      - { prop: 'propName', action: 'update|remove|add', value: 'Something', previousValue: 'Other' }
       *
       * @param       {String}        event         The event you want to subscribe to
       * @param       {Function}      callback      The callback function that has to be called
       * @return      {SPromise}                    The SPromise used in this instance
       *
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "on",
      value: function on(event, callback) {
        return this._promise.on(event, callback);
      }
      /**
       * @name          dispatch
       * @type          Function
       * @private
       *
       * This method is used to dispatch events simultaneously through the SPromise internal instance on which you can subscribe using the "on" method,
       * and through the global "sugar.js.event.dispatch" function on which you can subscribe using the function "sugar.js.event.on"
       *
       * @param       {String}        name          The event name to dispatch
       * @param       {Mixed}         value         The value to attach to the event
       *
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "dispatch",
      value: function dispatch(name, value) {
        // dispatch event through the SPromise internal instance
        this._promise.trigger(name, value || this); // dispatch a general event


        (0, _dispatch.default)("".concat(this.metas.dashName, ".").concat(name), value || this);
        (0, _dispatch.default)("".concat(this.metas.dashName, "#").concat(this._settings.id, ".").concat(name), value || this);
      }
      /**
       * @name          _mountDependencies
       * @type          Function
       * @private
       * @async
       *
       * This method simply delay the mounting process of the component
       * based on different settings "properties":
       * - mountWhen (null) {String}: Specify when you want the component to be mounted. Can be:
       *    - inViewport: Mount the component only when it appears in the viewport
       *    - visible: Mount the component when the component became visible (like display:none; to display:block; for example)
       *    - domReady: Mount the component when the DOM is ready
       *    - transitionEnd. Mount the component when the transition is ended
       * - mountDependencies (null) {Function|Array<Function>}: Specify one/some function(s) that returns a Promise and that need to be all resolved before mounting the component
       *
       * @return      {Promise}               Return a promise that will be resolved once every "dependencies" are satisfied
       *
       * @since       2.0.0
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "_mountDependencies",
      value: function _mountDependencies() {
        return new Promise((resolve, reject) => {
          var promises = []; // check if we have a "mountWhen" setting specified

          if (this._settings.mountWhen) {
            promises.push((0, _when.default)(this._settings.mountWhen));
          } // check if we have one/some "mountDependencies" setting specified


          if (this._settings.mountDependencies) {
            var depsFns = [...this._settings.mountDependencies];
            depsFns.forEach(fn => {
              promises.push(fn());
            });
          } // wait until all promises are resolved


          Promise.all(promises).then(() => {
            resolve();
          });
        });
      }
      /**
       * @name          connectedCallback
       * @type          Function
       *
       * Called when the component is attached to the dom
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        // dispatch "event"
        setTimeout(() => {
          this.dispatch('attach', this);
        });
      }
      /**
       * @name          disconnectedCallback
       * @type          Function
       *
       * Called when the component is detached from the dom
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        // dispatch "event"
        this.dispatch('detach', this);
      }
      /**
       * @name            attributeChangedCallback
       * @type            Function
       *
       * Called when an attribute is removed, added or updated
       *
       * @param     {String}      attrName      The attribute name
       * @param     {Mixed}       oldVal        The old attribute value
       * @param     {Mixed}       newVal        The new attribute value
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attrName, oldVal, newVal) {
        if (this._settedAttributesStack[attrName]) return; // const previousValue = __parse(oldVal);

        var newValue = (0, _parse.default)(newVal) || false; // set the value into the props

        this.prop(attrName, newValue); // trigger a "prop" event

        this._triggerPropsEvents((0, _camelize.default)(attrName));
      }
      /**
       * @name        prop
       * @type        Function
       *
       * Get of set a property
       *
       * @param       {String}      prop      The property you want to get/set
       * @param       {Mixed}       [value=undefined]    The value you want to set
       * @return      {Mixed}                 The property value
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "prop",
      value: function prop(_prop) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if (value === undefined) {
          return this._props[_prop] ? this._props[_prop].value : undefined;
        }

        this._props[_prop].previousValue = this._props[_prop].value;
        this._props[_prop].value = value;
        this.handleProp(_prop, this._props[_prop]); // handle physical props

        this._handlePhysicalProps(_prop); // trigger a "prop" event


        this._triggerPropsEvents(_prop);

        return value;
      }
      /**
       * @name        _triggerPropsEvents
       * @type        Function
       * @private
       *
       * This method simply trigger a prop|prop.{name} event through the SPromise instance.
       *
       * @param     {String}      prop      The property name to trigger event for
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "_triggerPropsEvents",
      value: function _triggerPropsEvents(prop) {
        // trigger a "prop" event
        var eventObj = {
          prop,
          action: this._props[prop].previousValue !== null ? this._props[prop].value !== null ? 'set' : 'delete' : 'set',
          value: this._props[prop].value,
          previousValue: this._props[prop].previousValue
        };
        this.dispatch("prop.".concat(prop, ":").concat(eventObj.action), eventObj);
      }
      /**
       * @name        _handlePhysicalProps
       * @type        Function
       * @private
       *
       * This method make sure that all the defined physical props are
       * setted as attribute on the DOM element
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "_handlePhysicalProps",
      value: function _handlePhysicalProps() {
        for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
          props[_key] = arguments[_key];
        }

        if (!props || props.length === 0) props = Object.keys(this._props); // loop on each required props

        props.forEach(prop => {
          if (!this._props[prop].physical) return;
          var value = this._props[prop].value; // if the value is false, remove the attributee from the dom node

          if (!value) {
            this.removeAttribute(prop);
            return;
          }

          if (!this.getAttribute(prop)) {
            // set the attribute with the value
            this._settedAttributesStack[prop] = true;
            this.setAttribute(prop, (0, _toString.default)(value));
            delete this._settedAttributesStack[prop];
          } else {
            var currentAttributeValue = this.getAttribute(prop);
            var currentValueStringified = (0, _toString.default)(value);

            if (currentAttributeValue !== currentValueStringified) {
              this._settedAttributesStack[prop] = true;
              this.setAttribute(prop, currentValueStringified);
              delete this._settedAttributesStack[prop];
            }
          }
        });
      }
      /**
       * @name        _checkPropsDefinition
       * @type        Function
       * @private
       *
       * This method simply check a property value depending on his definition such as type, required, etc...
       * If you pass no props to check, it will check all the registered ones.
       *
       * @param       {Array<String>|String}        ...props        The properties to check
       *
       * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */

    }, {
      key: "_checkPropsDefinition",
      value: function _checkPropsDefinition() {
        for (var _len2 = arguments.length, props = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          props[_key2] = arguments[_key2];
        }

        if (!props || props.length === 0) props = Object.keys(this._props);
        props.forEach(prop => {
          var propObj = this._props[prop];
          var validationResult = (0, _validateWithDefinitionObject.default)(propObj.value, propObj, "".concat(this.constructor.name, ".props.").concat(prop));
          if (validationResult !== true) throw new Error(validationResult);
        });
      }
    }, {
      key: "metas",
      get: function get() {
        return _objectSpread({
          instance: this,
          $node: this
        }, this._metas);
      }
    }]);

    return SWebComponent;
  }(extend), _temp;
}

module.exports = exports.default;

/***/ }),

/***/ "../src/js/webcomponent/register.js":
/*!******************************************!*\
  !*** ../src/js/webcomponent/register.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.define = define;
exports.getComponentMetas = getComponentMetas;
Object.defineProperty(exports, "SWebComponent", {
  enumerable: true,
  get: function get() {
    return _SWebComponent.default;
  }
});
Object.defineProperty(exports, "SLitHtmlWebComponent", {
  enumerable: true,
  get: function get() {
    return _SLitHtmlWebComponent.default;
  }
});
exports.stack = void 0;

var _SWebComponent = _interopRequireDefault(__webpack_require__(/*! ./SWebComponent */ "../src/js/webcomponent/SWebComponent.js"));

var _SLitHtmlWebComponent = _interopRequireDefault(__webpack_require__(/*! ./SLitHtmlWebComponent */ "../src/js/webcomponent/SLitHtmlWebComponent.js"));

var _getHtmlClassFromTagName = _interopRequireDefault(__webpack_require__(/*! ../html/getHtmlClassFromTagName */ "../src/js/html/getHtmlClassFromTagName.js"));

var _uncamelize = _interopRequireDefault(__webpack_require__(/*! ../string/uncamelize */ "../src/js/string/uncamelize.js"));

var _htmlTagToHtmlClassMap = _interopRequireDefault(__webpack_require__(/*! ../html/htmlTagToHtmlClassMap */ "../src/js/html/htmlTagToHtmlClassMap.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _SWebComponentStack = {};
exports.stack = _SWebComponentStack;

function getComponentMetas(name) {
  return _SWebComponentStack[(0, _uncamelize.default)(name)] || {};
}

function define(name, cls) {
  var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!name) throw new Error("SWebComponent: You must define a name for your webcomponent by setting either a static \"name\" property on your class, of by passing a name as first parameter of the static \"define\" function...");
  var extend = null;

  for (var key in _htmlTagToHtmlClassMap.default) {
    if (cls.prototype instanceof _htmlTagToHtmlClassMap.default[key]) {
      extend = key;
      break;
    }
  }

  var uncamelizedName = (0, _uncamelize.default)(name);
  cls.componentName = name;
  _SWebComponentStack[uncamelizedName] = {
    name,
    dashName: uncamelizedName,
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
    throw "Your browser does not support either document.registerElement or window.customElements.define webcomponents specification...";
  }
}

/***/ }),

/***/ "./src/js/_component.scss":
/*!********************************!*\
  !*** ./src/js/_component.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js??ref--4-2!./_component.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js?!./src/js/_component.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_js_webcomponent_SWebComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../src/js/webcomponent/SWebComponent */ "../src/js/webcomponent/SWebComponent.js");
/* harmony import */ var _src_js_webcomponent_SWebComponent__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_js_webcomponent_SWebComponent__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_component.scss */ "./src/js/_component.scss");
/* harmony import */ var _component_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_component_scss__WEBPACK_IMPORTED_MODULE_1__);




/***/ })

/******/ });
//# sourceMappingURL=index.js.map
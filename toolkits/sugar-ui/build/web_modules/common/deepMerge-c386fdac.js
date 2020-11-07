var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

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

var copyTo = Copy;


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

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor,prot;

  if (isObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

var isPlainObject$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	isPlainObject: isPlainObject
});

var require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(isPlainObject$1);

var plainObject_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = plainObject;

var _isPlainObject = _interopRequireDefault(require$$0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                      plainObject
 * @namespace           sugar.js.is
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
});

var unique_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unique;

/**
 * @name              unique
 * @namespace           sugar.js.array
 * @type                  Function
 *
 * This function simply take an array as parameter and return a new one
 * with all the duplicates values removed.
 *
 * @param         {Array}         array               The array to deduplicates
 * @return        {Array}                             The deduplicated array
 *
 * @example         js
 * import unique from '@coffeekraken/sugar/js/array/unique';
 * unique(['hello','world','hello','world']); // => ['hello','world']
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function unique(array) {
  var a = array.concat();

  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
}

module.exports = exports.default;
});

var deepMerge_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deepMerge;

var _copyTo = _interopRequireDefault(copyTo);

var _plainObject = _interopRequireDefault(plainObject_1);

var _unique = _interopRequireDefault(unique_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                deepMerge
 * @namespace           sugar.js.object
 * @type                Function
 *
 * Deep merge one object with another and return the merged object result. This merging implementation support:
 * - Merging object with getters/setters
 * - n numbers of objects as arguments
 *
 * @param           {Object}            args...        Pass all the objects you want to merge
 * @param           {Object}            [settings={}]       Pass as last object the settings one that can contain these properties:
 * - object (true) {Boolean}: Specify if you want to merge the objects
 * - array (false) {Boolean}: Specify if you want to merge the arrays
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
  var settings = {
    array: false,
    object: true
  };

  function merge(firstObj, secondObj) {
    var newObj = {};
    if (!firstObj && secondObj) return secondObj;
    if (!secondObj && firstObj) return firstObj;
    if (!firstObj && !secondObj) return {};
    (0, _copyTo.default)(firstObj).override(newObj);

    for (var key of Object.keys(secondObj)) {
      // merging arrays
      if (settings.array === true && Array.isArray(firstObj[key]) && Array.isArray(secondObj[key])) {
        var newArray = (0, _unique.default)([...firstObj[key], ...secondObj[key]]);
        newObj[key] = newArray;
        continue;
      } // merging objects
      else if (settings.object === true && (0, _plainObject.default)(firstObj[key]) && (0, _plainObject.default)(secondObj[key])) {
          newObj[key] = merge(firstObj[key], secondObj[key]);
          continue;
        }

      (0, _copyTo.default)(secondObj).pick(key).toCover(newObj);
    }

    return newObj;
  }

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var potentialSettingsObj = args[args.length - 1] || {};

  if (potentialSettingsObj.array && typeof potentialSettingsObj.array === 'boolean' || potentialSettingsObj.object && typeof potentialSettingsObj.object === 'boolean') {
    if (potentialSettingsObj.array !== undefined) settings.array = potentialSettingsObj.array;
    if (potentialSettingsObj.object !== undefined) settings.object = potentialSettingsObj.object;
    args.pop();
  }

  var currentObj = {};

  for (var i = 0; i < args.length; i++) {
    var toMergeObj = args[i] || {};
    currentObj = merge(currentObj, toMergeObj);
  }

  return currentObj;
}

module.exports = exports.default;
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(deepMerge_1);

export { __pika_web_default_export_for_treeshaking__ as _, commonjsGlobal as a, createCommonjsModule as c, deepMerge_1 as d, getDefaultExportFromCjs as g, plainObject_1 as p };

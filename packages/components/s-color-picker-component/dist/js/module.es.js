var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj2, key, value) => key in obj2 ? __defProp(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
function plainObject(object) {
  if (!object)
    return false;
  if (typeof object !== "object")
    return false;
  if (object.constructor && object.constructor.name !== "Object")
    return false;
  if (Object.prototype.toString.call(object) !== "[object Object]")
    return false;
  if (object !== Object(object))
    return false;
  return true;
}
function __deepMerge(...args) {
  function merge(firstObj, secondObj) {
    const newObj = {};
    if (!firstObj && secondObj)
      return secondObj;
    if (!secondObj && firstObj)
      return firstObj;
    if (!firstObj && !secondObj)
      return {};
    const firstProps = Object.getOwnPropertyNames(firstObj);
    firstProps.forEach((key) => {
      const desc = Object.getOwnPropertyDescriptor(firstObj, key);
      if (desc.set || desc.get) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = firstObj[key];
      }
    });
    const secondProps = Object.getOwnPropertyNames(secondObj);
    secondProps.forEach((key) => {
      const desc = Object.getOwnPropertyDescriptor(secondObj, key);
      if (desc.set || desc.get) {
        Object.defineProperty(newObj, key, desc);
      } else if (plainObject(newObj[key]) && plainObject(secondObj[key])) {
        newObj[key] = merge(newObj[key], secondObj[key]);
      } else {
        newObj[key] = secondObj[key];
      }
    });
    return newObj;
  }
  let currentObj = {};
  for (let i2 = 0; i2 < args.length; i2++) {
    const toMergeObj = args[i2];
    currentObj = merge(currentObj, toMergeObj);
  }
  return currentObj;
}
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
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function lowerCase(str) {
  return str.toLowerCase();
}
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
function noCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  var _a2 = options.splitRegexp, splitRegexp = _a2 === void 0 ? DEFAULT_SPLIT_REGEXP : _a2, _b2 = options.stripRegexp, stripRegexp = _b2 === void 0 ? DEFAULT_STRIP_REGEXP : _b2, _c2 = options.transform, transform = _c2 === void 0 ? lowerCase : _c2, _d2 = options.delimiter, delimiter = _d2 === void 0 ? " " : _d2;
  var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
  var start = 0;
  var end = result.length;
  while (result.charAt(start) === "\0")
    start++;
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
function replace(input, re, value) {
  if (re instanceof RegExp)
    return input.replace(re, value);
  return re.reduce(function(input2, re2) {
    return input2.replace(re2, value);
  }, input);
}
function dotCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase(input, __assign({ delimiter: "." }, options));
}
function paramCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return dotCase(input, __assign({ delimiter: "-" }, options));
}
function dashCase(text) {
  return paramCase(text);
}
function wait(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
function autoCast(string) {
  if (typeof string !== "string")
    return string;
  if (string.substr(0, 1) === "'" && string.substr(-1) === "'") {
    return string.substr(1, string.length - 2);
  }
  const presumedNumber = parseFloat(string);
  if (!isNaN(presumedNumber)) {
    if (presumedNumber.toString() === string) {
      return presumedNumber;
    }
  }
  if (window[string]) {
    return string;
  }
  try {
    const obj = eval(`(${string})`);
    return obj;
  } catch (e) {
    return string;
  }
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function commonjsRequire(path2) {
  throw new Error('Could not dynamically require "' + path2 + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var isClass = { exports: {} };
(function(module, exports) {
  (function(root) {
    const toString = Function.prototype.toString;
    function fnBody(fn2) {
      return toString.call(fn2).replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, "");
    }
    function isClass2(fn2) {
      if (typeof fn2 !== "function") {
        return false;
      }
      if (/^class[\s{]/.test(toString.call(fn2))) {
        return true;
      }
      const body = fnBody(fn2);
      return /classCallCheck\(/.test(body) || /TypeError\("Cannot call a class as a function"\)/.test(body);
    }
    {
      if (module.exports) {
        exports = module.exports = isClass2;
      }
      exports.isClass = isClass2;
    }
  })();
})(isClass, isClass.exports);
var __isClass = isClass.exports;
function cls(cls2) {
  if (!Array.isArray(cls2))
    cls2 = [cls2];
  for (let i2 = 0; i2 < cls2.length; i2++) {
    if (!__isClass(cls2[i2]))
      return false;
  }
  return true;
}
const fn$4 = function(cls$1, settings = {}) {
  const stack = {};
  if (!cls(cls$1)) {
    cls$1 = cls$1.constructor;
  }
  if (settings.includeBaseClass === true) {
    stack[cls$1.name] = cls$1;
  }
  let baseClass = cls$1;
  while (baseClass) {
    const newBaseClass = Object.getPrototypeOf(baseClass);
    if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
      stack[newBaseClass.name] = newBaseClass;
      baseClass = newBaseClass;
    } else {
      break;
    }
  }
  return stack;
};
function unique(array) {
  const a = array.concat();
  for (let i2 = 0; i2 < a.length; ++i2) {
    for (let j2 = i2 + 1; j2 < a.length; ++j2) {
      if (a[i2] === a[j2])
        a.splice(j2--, 1);
    }
  }
  return a;
}
var lodash_clone = { exports: {} };
(function(module, exports) {
  var LARGE_ARRAY_SIZE = 200;
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var MAX_SAFE_INTEGER = 9007199254740991;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", promiseTag = "[object Promise]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reFlags = /\w*$/;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
  var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  function addMapEntry(map, pair) {
    map.set(pair[0], pair[1]);
    return map;
  }
  function addSetEntry(set, value) {
    set.add(value);
    return set;
  }
  function arrayEach(array, iteratee) {
    var index = -1, length = array ? array.length : 0;
    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1, length = array ? array.length : 0;
    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function isHostObject(value) {
    var result = false;
    if (value != null && typeof value.toString != "function") {
      try {
        result = !!(value + "");
      } catch (e) {
      }
    }
    return result;
  }
  function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
  var coreJsData = root["__core-js_shared__"];
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectToString = objectProto.toString;
  var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  var Buffer2 = moduleExports ? root.Buffer : void 0, Symbol2 = root.Symbol, Uint8Array2 = root.Uint8Array, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice;
  var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0, nativeKeys = overArg(Object.keys, Object);
  var DataView = getNative(root, "DataView"), Map2 = getNative(root, "Map"), Promise2 = getNative(root, "Promise"), Set2 = getNative(root, "Set"), WeakMap2 = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
  var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function Hash(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
  }
  function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
  }
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : void 0;
  }
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
  }
  function hashSet(key, value) {
    var data = this.__data__;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function ListCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function listCacheClear() {
    this.__data__ = [];
  }
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    return true;
  }
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  function MapCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function mapCacheClear() {
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map2 || ListCache)(),
      "string": new Hash()
    };
  }
  function mapCacheDelete(key) {
    return getMapData(this, key)["delete"](key);
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);
    return this;
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  function Stack(entries) {
    this.__data__ = new ListCache(entries);
  }
  function stackClear() {
    this.__data__ = new ListCache();
  }
  function stackDelete(key) {
    return this.__data__["delete"](key);
  }
  function stackGet(key) {
    return this.__data__.get(key);
  }
  function stackHas(key) {
    return this.__data__.has(key);
  }
  function stackSet(key, value) {
    var cache = this.__data__;
    if (cache instanceof ListCache) {
      var pairs = cache.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        return this;
      }
      cache = this.__data__ = new MapCache(pairs);
    }
    cache.set(key, value);
    return this;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  function arrayLikeKeys(value, inherited) {
    var result = isArray2(value) || isArguments(value) ? baseTimes(value.length, String) : [];
    var length = result.length, skipIndexes = !!length;
    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
      object[key] = value;
    }
  }
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  function baseAssign(object, source2) {
    return object && copyObject(source2, keys(source2), object);
  }
  function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
    var result;
    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== void 0) {
      return result;
    }
    if (!isObject2(value)) {
      return value;
    }
    var isArr = isArray2(value);
    if (isArr) {
      result = initCloneArray(value);
      if (!isDeep) {
        return copyArray(value, result);
      }
    } else {
      var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
      if (isBuffer(value)) {
        return cloneBuffer(value, isDeep);
      }
      if (tag == objectTag || tag == argsTag || isFunc && !object) {
        if (isHostObject(value)) {
          return object ? value : {};
        }
        result = initCloneObject(isFunc ? {} : value);
        if (!isDeep) {
          return copySymbols(value, baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = initCloneByTag(value, tag, baseClone, isDeep);
      }
    }
    stack || (stack = new Stack());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);
    if (!isArr) {
      var props = isFull ? getAllKeys(value) : keys(value);
    }
    arrayEach(props || value, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value[key2];
      }
      assignValue(result, key2, baseClone(subValue, isDeep, isFull, customizer, key2, value, stack));
    });
    return result;
  }
  function baseCreate(proto2) {
    return isObject2(proto2) ? objectCreate(proto2) : {};
  }
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray2(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  function baseGetTag(value) {
    return objectToString.call(value);
  }
  function baseIsNative(value) {
    if (!isObject2(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction2(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var result = new buffer.constructor(buffer.length);
    buffer.copy(result);
    return result;
  }
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
    return result;
  }
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  function cloneMap(map, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
    return arrayReduce(array, addMapEntry, new map.constructor());
  }
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  function cloneSet(set, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
    return arrayReduce(array, addSetEntry, new set.constructor());
  }
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  function copyArray(source2, array) {
    var index = -1, length = source2.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source2[index];
    }
    return array;
  }
  function copyObject(source2, props, object, customizer) {
    object || (object = {});
    var index = -1, length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object[key], source2[key], key, object, source2) : void 0;
      assignValue(object, key, newValue === void 0 ? source2[key] : newValue);
    }
    return object;
  }
  function copySymbols(source2, object) {
    return copyObject(source2, getSymbols(source2), object);
  }
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
  var getTag = baseGetTag;
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
    getTag = function(value) {
      var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }
  function initCloneArray(array) {
    var length = array.length, result = array.constructor(length);
    if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
  }
  function initCloneByTag(object, tag, cloneFunc, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag:
        return cloneArrayBuffer(object);
      case boolTag:
      case dateTag:
        return new Ctor(+object);
      case dataViewTag:
        return cloneDataView(object, isDeep);
      case float32Tag:
      case float64Tag:
      case int8Tag:
      case int16Tag:
      case int32Tag:
      case uint8Tag:
      case uint8ClampedTag:
      case uint16Tag:
      case uint32Tag:
        return cloneTypedArray(object, isDeep);
      case mapTag:
        return cloneMap(object, isDeep, cloneFunc);
      case numberTag:
      case stringTag:
        return new Ctor(object);
      case regexpTag:
        return cloneRegExp(object);
      case setTag:
        return cloneSet(object, isDeep, cloneFunc);
      case symbolTag:
        return cloneSymbol(object);
    }
  }
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto2 = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value === proto2;
  }
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  function clone2(value) {
    return baseClone(value, false, true);
  }
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  function isArguments(value) {
    return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
  }
  var isArray2 = Array.isArray;
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction2(value);
  }
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }
  var isBuffer = nativeIsBuffer || stubFalse;
  function isFunction2(value) {
    var tag = isObject2(value) ? objectToString.call(value) : "";
    return tag == funcTag || tag == genTag;
  }
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  function isObject2(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }
  function isObjectLike(value) {
    return !!value && typeof value == "object";
  }
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }
  function stubArray() {
    return [];
  }
  function stubFalse() {
    return false;
  }
  module.exports = clone2;
})(lodash_clone, lodash_clone.exports);
var __clone = lodash_clone.exports;
var lodash_clonedeep = { exports: {} };
(function(module, exports) {
  var LARGE_ARRAY_SIZE = 200;
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var MAX_SAFE_INTEGER = 9007199254740991;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", promiseTag = "[object Promise]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reFlags = /\w*$/;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
  var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  function addMapEntry(map, pair) {
    map.set(pair[0], pair[1]);
    return map;
  }
  function addSetEntry(set, value) {
    set.add(value);
    return set;
  }
  function arrayEach(array, iteratee) {
    var index = -1, length = array ? array.length : 0;
    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1, length = array ? array.length : 0;
    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function isHostObject(value) {
    var result = false;
    if (value != null && typeof value.toString != "function") {
      try {
        result = !!(value + "");
      } catch (e) {
      }
    }
    return result;
  }
  function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
  var coreJsData = root["__core-js_shared__"];
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectToString = objectProto.toString;
  var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  var Buffer2 = moduleExports ? root.Buffer : void 0, Symbol2 = root.Symbol, Uint8Array2 = root.Uint8Array, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice;
  var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0, nativeKeys = overArg(Object.keys, Object);
  var DataView = getNative(root, "DataView"), Map2 = getNative(root, "Map"), Promise2 = getNative(root, "Promise"), Set2 = getNative(root, "Set"), WeakMap2 = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
  var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function Hash(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
  }
  function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
  }
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : void 0;
  }
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
  }
  function hashSet(key, value) {
    var data = this.__data__;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function ListCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function listCacheClear() {
    this.__data__ = [];
  }
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    return true;
  }
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  function MapCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function mapCacheClear() {
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map2 || ListCache)(),
      "string": new Hash()
    };
  }
  function mapCacheDelete(key) {
    return getMapData(this, key)["delete"](key);
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);
    return this;
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  function Stack(entries) {
    this.__data__ = new ListCache(entries);
  }
  function stackClear() {
    this.__data__ = new ListCache();
  }
  function stackDelete(key) {
    return this.__data__["delete"](key);
  }
  function stackGet(key) {
    return this.__data__.get(key);
  }
  function stackHas(key) {
    return this.__data__.has(key);
  }
  function stackSet(key, value) {
    var cache = this.__data__;
    if (cache instanceof ListCache) {
      var pairs = cache.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        return this;
      }
      cache = this.__data__ = new MapCache(pairs);
    }
    cache.set(key, value);
    return this;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  function arrayLikeKeys(value, inherited) {
    var result = isArray2(value) || isArguments(value) ? baseTimes(value.length, String) : [];
    var length = result.length, skipIndexes = !!length;
    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
      object[key] = value;
    }
  }
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  function baseAssign(object, source2) {
    return object && copyObject(source2, keys(source2), object);
  }
  function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
    var result;
    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== void 0) {
      return result;
    }
    if (!isObject2(value)) {
      return value;
    }
    var isArr = isArray2(value);
    if (isArr) {
      result = initCloneArray(value);
      if (!isDeep) {
        return copyArray(value, result);
      }
    } else {
      var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
      if (isBuffer(value)) {
        return cloneBuffer(value, isDeep);
      }
      if (tag == objectTag || tag == argsTag || isFunc && !object) {
        if (isHostObject(value)) {
          return object ? value : {};
        }
        result = initCloneObject(isFunc ? {} : value);
        if (!isDeep) {
          return copySymbols(value, baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = initCloneByTag(value, tag, baseClone, isDeep);
      }
    }
    stack || (stack = new Stack());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);
    if (!isArr) {
      var props = isFull ? getAllKeys(value) : keys(value);
    }
    arrayEach(props || value, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value[key2];
      }
      assignValue(result, key2, baseClone(subValue, isDeep, isFull, customizer, key2, value, stack));
    });
    return result;
  }
  function baseCreate(proto2) {
    return isObject2(proto2) ? objectCreate(proto2) : {};
  }
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray2(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  function baseGetTag(value) {
    return objectToString.call(value);
  }
  function baseIsNative(value) {
    if (!isObject2(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction2(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var result = new buffer.constructor(buffer.length);
    buffer.copy(result);
    return result;
  }
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
    return result;
  }
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  function cloneMap(map, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
    return arrayReduce(array, addMapEntry, new map.constructor());
  }
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  function cloneSet(set, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
    return arrayReduce(array, addSetEntry, new set.constructor());
  }
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  function copyArray(source2, array) {
    var index = -1, length = source2.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source2[index];
    }
    return array;
  }
  function copyObject(source2, props, object, customizer) {
    object || (object = {});
    var index = -1, length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object[key], source2[key], key, object, source2) : void 0;
      assignValue(object, key, newValue === void 0 ? source2[key] : newValue);
    }
    return object;
  }
  function copySymbols(source2, object) {
    return copyObject(source2, getSymbols(source2), object);
  }
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
  var getTag = baseGetTag;
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
    getTag = function(value) {
      var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }
  function initCloneArray(array) {
    var length = array.length, result = array.constructor(length);
    if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
  }
  function initCloneByTag(object, tag, cloneFunc, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag:
        return cloneArrayBuffer(object);
      case boolTag:
      case dateTag:
        return new Ctor(+object);
      case dataViewTag:
        return cloneDataView(object, isDeep);
      case float32Tag:
      case float64Tag:
      case int8Tag:
      case int16Tag:
      case int32Tag:
      case uint8Tag:
      case uint8ClampedTag:
      case uint16Tag:
      case uint32Tag:
        return cloneTypedArray(object, isDeep);
      case mapTag:
        return cloneMap(object, isDeep, cloneFunc);
      case numberTag:
      case stringTag:
        return new Ctor(object);
      case regexpTag:
        return cloneRegExp(object);
      case setTag:
        return cloneSet(object, isDeep, cloneFunc);
      case symbolTag:
        return cloneSymbol(object);
    }
  }
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto2 = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value === proto2;
  }
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  function cloneDeep(value) {
    return baseClone(value, true, true);
  }
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  function isArguments(value) {
    return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
  }
  var isArray2 = Array.isArray;
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction2(value);
  }
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }
  var isBuffer = nativeIsBuffer || stubFalse;
  function isFunction2(value) {
    var tag = isObject2(value) ? objectToString.call(value) : "";
    return tag == funcTag || tag == genTag;
  }
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  function isObject2(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }
  function isObjectLike(value) {
    return !!value && typeof value == "object";
  }
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }
  function stubArray() {
    return [];
  }
  function stubFalse() {
    return false;
  }
  module.exports = cloneDeep;
})(lodash_clonedeep, lodash_clonedeep.exports);
var __deepClone = lodash_clonedeep.exports;
function clone(object, settings = {}) {
  settings = Object.assign({ deep: false }, settings);
  if (settings.deep) {
    return __deepClone(object);
  }
  return __clone(object);
}
function deepAssign(referenceObj, ...objects) {
  const settings = {
    array: false,
    object: true,
    cloneChilds: true
  };
  function merge(refObj, mixWithObj) {
    for (const key of Object.keys(mixWithObj)) {
      if (settings.array === true && Array.isArray(refObj[key]) && Array.isArray(mixWithObj[key])) {
        const newArray = unique([...refObj[key], ...mixWithObj[key]]);
        refObj[key] = newArray;
        continue;
      }
      if (settings.object === true && plainObject(refObj[key]) && plainObject(mixWithObj[key])) {
        refObj[key] = merge(refObj[key], mixWithObj[key]);
        continue;
      }
      if (plainObject(mixWithObj[key]) && settings.cloneChilds) {
        refObj[key] = clone(mixWithObj[key], {
          deep: true
        });
      } else {
        refObj[key] = mixWithObj[key];
      }
    }
    return refObj;
  }
  const potentialSettingsObj = objects[objects.length - 1] || {};
  if (potentialSettingsObj.array && typeof potentialSettingsObj.array === "boolean" || potentialSettingsObj.object && typeof potentialSettingsObj.object === "boolean") {
    if (potentialSettingsObj.array !== void 0)
      settings.array = potentialSettingsObj.array;
    if (potentialSettingsObj.object !== void 0)
      settings.object = potentialSettingsObj.object;
    objects.pop();
  }
  for (let i2 = 0; i2 < objects.length; i2++) {
    const toMergeObj = objects[i2] || {};
    merge(referenceObj, toMergeObj);
  }
  return referenceObj;
}
function unquote(string2, quotesToRemove = ['"', "'", "\u201D", "`"]) {
  string2 = string2.trim();
  quotesToRemove.forEach((quote) => {
    if (string2.substr(0, 1) === quote && string2.substr(-1) === quote) {
      string2 = string2.substr(1);
      string2 = string2.substr(0, string2.length - 1);
      return;
    }
  });
  return string2;
}
function get(obj2, path2, settings = {}) {
  settings = Object.assign({}, settings);
  if (obj2[path2] !== void 0)
    return obj2[path2];
  if (!path2 || path2 === "" || path2 === ".")
    return obj2;
  path2 = path2.replace(/\[(\w+)\]/g, ".$1");
  path2 = path2.replace(/^\./, "");
  let potentialPaths = [path2.replace(/\?/gm, "")];
  const parts = path2.split(".");
  for (let i2 = parts.length - 1; i2 >= 0; i2--) {
    const part = parts[i2];
    if (part.match(/\?$/)) {
      const before = parts.slice(0, i2);
      const after = parts.slice(i2 + 1);
      potentialPaths.push([...before, ...after].join("."));
      potentialPaths.push([...before, ...after.filter((a) => !a.match(/\?$/))].join("."));
    }
  }
  potentialPaths = unique(potentialPaths.map((s) => s.replace(/\?/gm, "")));
  for (let i2 = 0; i2 < potentialPaths.length; i2++) {
    const path3 = potentialPaths[i2];
    const result = __get(obj2, path3, settings);
    if (result !== void 0)
      return result;
  }
}
function __get(obj2, path2, settings = {}) {
  settings = Object.assign({}, settings);
  if (obj2[path2] !== void 0)
    return obj2[path2];
  if (!path2 || path2 === "" || path2 === ".")
    return obj2;
  const a = path2.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((p) => unquote(p));
  let o = obj2;
  while (a.length) {
    const n = a.shift().replace(/\?$/, "");
    if (typeof o !== "object" || !(n in o)) {
      return;
    }
    o = o[n];
  }
  return o;
}
var md5$1 = { exports: {} };
var core = { exports: {} };
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory();
    }
  })(commonjsGlobal, function() {
    var CryptoJS = CryptoJS || function(Math2, undefined$1) {
      var crypto2;
      if (typeof window !== "undefined" && window.crypto) {
        crypto2 = window.crypto;
      }
      if (typeof self !== "undefined" && self.crypto) {
        crypto2 = self.crypto;
      }
      if (typeof globalThis !== "undefined" && globalThis.crypto) {
        crypto2 = globalThis.crypto;
      }
      if (!crypto2 && typeof window !== "undefined" && window.msCrypto) {
        crypto2 = window.msCrypto;
      }
      if (!crypto2 && typeof commonjsGlobal !== "undefined" && commonjsGlobal.crypto) {
        crypto2 = commonjsGlobal.crypto;
      }
      if (!crypto2 && typeof commonjsRequire === "function") {
        try {
          crypto2 = require("crypto");
        } catch (err) {
        }
      }
      var cryptoSecureRandomInt = function() {
        if (crypto2) {
          if (typeof crypto2.getRandomValues === "function") {
            try {
              return crypto2.getRandomValues(new Uint32Array(1))[0];
            } catch (err) {
            }
          }
          if (typeof crypto2.randomBytes === "function") {
            try {
              return crypto2.randomBytes(4).readInt32LE();
            } catch (err) {
            }
          }
        }
        throw new Error("Native crypto module could not be used to get secure random number.");
      };
      var create = Object.create || function() {
        function F() {
        }
        return function(obj2) {
          var subtype;
          F.prototype = obj2;
          subtype = new F();
          F.prototype = null;
          return subtype;
        };
      }();
      var C = {};
      var C_lib = C.lib = {};
      var Base = C_lib.Base = function() {
        return {
          extend: function(overrides) {
            var subtype = create(this);
            if (overrides) {
              subtype.mixIn(overrides);
            }
            if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
              subtype.init = function() {
                subtype.$super.init.apply(this, arguments);
              };
            }
            subtype.init.prototype = subtype;
            subtype.$super = this;
            return subtype;
          },
          create: function() {
            var instance = this.extend();
            instance.init.apply(instance, arguments);
            return instance;
          },
          init: function() {
          },
          mixIn: function(properties) {
            for (var propertyName in properties) {
              if (properties.hasOwnProperty(propertyName)) {
                this[propertyName] = properties[propertyName];
              }
            }
            if (properties.hasOwnProperty("toString")) {
              this.toString = properties.toString;
            }
          },
          clone: function() {
            return this.init.prototype.extend(this);
          }
        };
      }();
      var WordArray = C_lib.WordArray = Base.extend({
        init: function(words, sigBytes) {
          words = this.words = words || [];
          if (sigBytes != undefined$1) {
            this.sigBytes = sigBytes;
          } else {
            this.sigBytes = words.length * 4;
          }
        },
        toString: function(encoder) {
          return (encoder || Hex).stringify(this);
        },
        concat: function(wordArray) {
          var thisWords = this.words;
          var thatWords = wordArray.words;
          var thisSigBytes = this.sigBytes;
          var thatSigBytes = wordArray.sigBytes;
          this.clamp();
          if (thisSigBytes % 4) {
            for (var i2 = 0; i2 < thatSigBytes; i2++) {
              var thatByte = thatWords[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
              thisWords[thisSigBytes + i2 >>> 2] |= thatByte << 24 - (thisSigBytes + i2) % 4 * 8;
            }
          } else {
            for (var j2 = 0; j2 < thatSigBytes; j2 += 4) {
              thisWords[thisSigBytes + j2 >>> 2] = thatWords[j2 >>> 2];
            }
          }
          this.sigBytes += thatSigBytes;
          return this;
        },
        clamp: function() {
          var words = this.words;
          var sigBytes = this.sigBytes;
          words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
          words.length = Math2.ceil(sigBytes / 4);
        },
        clone: function() {
          var clone2 = Base.clone.call(this);
          clone2.words = this.words.slice(0);
          return clone2;
        },
        random: function(nBytes) {
          var words = [];
          for (var i2 = 0; i2 < nBytes; i2 += 4) {
            words.push(cryptoSecureRandomInt());
          }
          return new WordArray.init(words, nBytes);
        }
      });
      var C_enc = C.enc = {};
      var Hex = C_enc.Hex = {
        stringify: function(wordArray) {
          var words = wordArray.words;
          var sigBytes = wordArray.sigBytes;
          var hexChars = [];
          for (var i2 = 0; i2 < sigBytes; i2++) {
            var bite = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
            hexChars.push((bite >>> 4).toString(16));
            hexChars.push((bite & 15).toString(16));
          }
          return hexChars.join("");
        },
        parse: function(hexStr) {
          var hexStrLength = hexStr.length;
          var words = [];
          for (var i2 = 0; i2 < hexStrLength; i2 += 2) {
            words[i2 >>> 3] |= parseInt(hexStr.substr(i2, 2), 16) << 24 - i2 % 8 * 4;
          }
          return new WordArray.init(words, hexStrLength / 2);
        }
      };
      var Latin1 = C_enc.Latin1 = {
        stringify: function(wordArray) {
          var words = wordArray.words;
          var sigBytes = wordArray.sigBytes;
          var latin1Chars = [];
          for (var i2 = 0; i2 < sigBytes; i2++) {
            var bite = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
            latin1Chars.push(String.fromCharCode(bite));
          }
          return latin1Chars.join("");
        },
        parse: function(latin1Str) {
          var latin1StrLength = latin1Str.length;
          var words = [];
          for (var i2 = 0; i2 < latin1StrLength; i2++) {
            words[i2 >>> 2] |= (latin1Str.charCodeAt(i2) & 255) << 24 - i2 % 4 * 8;
          }
          return new WordArray.init(words, latin1StrLength);
        }
      };
      var Utf8 = C_enc.Utf8 = {
        stringify: function(wordArray) {
          try {
            return decodeURIComponent(escape(Latin1.stringify(wordArray)));
          } catch (e) {
            throw new Error("Malformed UTF-8 data");
          }
        },
        parse: function(utf8Str) {
          return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
        }
      };
      var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
        reset: function() {
          this._data = new WordArray.init();
          this._nDataBytes = 0;
        },
        _append: function(data) {
          if (typeof data == "string") {
            data = Utf8.parse(data);
          }
          this._data.concat(data);
          this._nDataBytes += data.sigBytes;
        },
        _process: function(doFlush) {
          var processedWords;
          var data = this._data;
          var dataWords = data.words;
          var dataSigBytes = data.sigBytes;
          var blockSize = this.blockSize;
          var blockSizeBytes = blockSize * 4;
          var nBlocksReady = dataSigBytes / blockSizeBytes;
          if (doFlush) {
            nBlocksReady = Math2.ceil(nBlocksReady);
          } else {
            nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
          }
          var nWordsReady = nBlocksReady * blockSize;
          var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
          if (nWordsReady) {
            for (var offset = 0; offset < nWordsReady; offset += blockSize) {
              this._doProcessBlock(dataWords, offset);
            }
            processedWords = dataWords.splice(0, nWordsReady);
            data.sigBytes -= nBytesReady;
          }
          return new WordArray.init(processedWords, nBytesReady);
        },
        clone: function() {
          var clone2 = Base.clone.call(this);
          clone2._data = this._data.clone();
          return clone2;
        },
        _minBufferSize: 0
      });
      C_lib.Hasher = BufferedBlockAlgorithm.extend({
        cfg: Base.extend(),
        init: function(cfg) {
          this.cfg = this.cfg.extend(cfg);
          this.reset();
        },
        reset: function() {
          BufferedBlockAlgorithm.reset.call(this);
          this._doReset();
        },
        update: function(messageUpdate) {
          this._append(messageUpdate);
          this._process();
          return this;
        },
        finalize: function(messageUpdate) {
          if (messageUpdate) {
            this._append(messageUpdate);
          }
          var hash = this._doFinalize();
          return hash;
        },
        blockSize: 512 / 32,
        _createHelper: function(hasher) {
          return function(message, cfg) {
            return new hasher.init(cfg).finalize(message);
          };
        },
        _createHmacHelper: function(hasher) {
          return function(message, key) {
            return new C_algo.HMAC.init(hasher, key).finalize(message);
          };
        }
      });
      var C_algo = C.algo = {};
      return C;
    }(Math);
    return CryptoJS;
  });
})(core);
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory(core.exports);
    }
  })(commonjsGlobal, function(CryptoJS) {
    (function(Math2) {
      var C = CryptoJS;
      var C_lib = C.lib;
      var WordArray = C_lib.WordArray;
      var Hasher = C_lib.Hasher;
      var C_algo = C.algo;
      var T = [];
      (function() {
        for (var i2 = 0; i2 < 64; i2++) {
          T[i2] = Math2.abs(Math2.sin(i2 + 1)) * 4294967296 | 0;
        }
      })();
      var MD5 = C_algo.MD5 = Hasher.extend({
        _doReset: function() {
          this._hash = new WordArray.init([
            1732584193,
            4023233417,
            2562383102,
            271733878
          ]);
        },
        _doProcessBlock: function(M, offset) {
          for (var i2 = 0; i2 < 16; i2++) {
            var offset_i = offset + i2;
            var M_offset_i = M[offset_i];
            M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
          }
          var H = this._hash.words;
          var M_offset_0 = M[offset + 0];
          var M_offset_1 = M[offset + 1];
          var M_offset_2 = M[offset + 2];
          var M_offset_3 = M[offset + 3];
          var M_offset_4 = M[offset + 4];
          var M_offset_5 = M[offset + 5];
          var M_offset_6 = M[offset + 6];
          var M_offset_7 = M[offset + 7];
          var M_offset_8 = M[offset + 8];
          var M_offset_9 = M[offset + 9];
          var M_offset_10 = M[offset + 10];
          var M_offset_11 = M[offset + 11];
          var M_offset_12 = M[offset + 12];
          var M_offset_13 = M[offset + 13];
          var M_offset_14 = M[offset + 14];
          var M_offset_15 = M[offset + 15];
          var a = H[0];
          var b = H[1];
          var c = H[2];
          var d2 = H[3];
          a = FF(a, b, c, d2, M_offset_0, 7, T[0]);
          d2 = FF(d2, a, b, c, M_offset_1, 12, T[1]);
          c = FF(c, d2, a, b, M_offset_2, 17, T[2]);
          b = FF(b, c, d2, a, M_offset_3, 22, T[3]);
          a = FF(a, b, c, d2, M_offset_4, 7, T[4]);
          d2 = FF(d2, a, b, c, M_offset_5, 12, T[5]);
          c = FF(c, d2, a, b, M_offset_6, 17, T[6]);
          b = FF(b, c, d2, a, M_offset_7, 22, T[7]);
          a = FF(a, b, c, d2, M_offset_8, 7, T[8]);
          d2 = FF(d2, a, b, c, M_offset_9, 12, T[9]);
          c = FF(c, d2, a, b, M_offset_10, 17, T[10]);
          b = FF(b, c, d2, a, M_offset_11, 22, T[11]);
          a = FF(a, b, c, d2, M_offset_12, 7, T[12]);
          d2 = FF(d2, a, b, c, M_offset_13, 12, T[13]);
          c = FF(c, d2, a, b, M_offset_14, 17, T[14]);
          b = FF(b, c, d2, a, M_offset_15, 22, T[15]);
          a = GG(a, b, c, d2, M_offset_1, 5, T[16]);
          d2 = GG(d2, a, b, c, M_offset_6, 9, T[17]);
          c = GG(c, d2, a, b, M_offset_11, 14, T[18]);
          b = GG(b, c, d2, a, M_offset_0, 20, T[19]);
          a = GG(a, b, c, d2, M_offset_5, 5, T[20]);
          d2 = GG(d2, a, b, c, M_offset_10, 9, T[21]);
          c = GG(c, d2, a, b, M_offset_15, 14, T[22]);
          b = GG(b, c, d2, a, M_offset_4, 20, T[23]);
          a = GG(a, b, c, d2, M_offset_9, 5, T[24]);
          d2 = GG(d2, a, b, c, M_offset_14, 9, T[25]);
          c = GG(c, d2, a, b, M_offset_3, 14, T[26]);
          b = GG(b, c, d2, a, M_offset_8, 20, T[27]);
          a = GG(a, b, c, d2, M_offset_13, 5, T[28]);
          d2 = GG(d2, a, b, c, M_offset_2, 9, T[29]);
          c = GG(c, d2, a, b, M_offset_7, 14, T[30]);
          b = GG(b, c, d2, a, M_offset_12, 20, T[31]);
          a = HH(a, b, c, d2, M_offset_5, 4, T[32]);
          d2 = HH(d2, a, b, c, M_offset_8, 11, T[33]);
          c = HH(c, d2, a, b, M_offset_11, 16, T[34]);
          b = HH(b, c, d2, a, M_offset_14, 23, T[35]);
          a = HH(a, b, c, d2, M_offset_1, 4, T[36]);
          d2 = HH(d2, a, b, c, M_offset_4, 11, T[37]);
          c = HH(c, d2, a, b, M_offset_7, 16, T[38]);
          b = HH(b, c, d2, a, M_offset_10, 23, T[39]);
          a = HH(a, b, c, d2, M_offset_13, 4, T[40]);
          d2 = HH(d2, a, b, c, M_offset_0, 11, T[41]);
          c = HH(c, d2, a, b, M_offset_3, 16, T[42]);
          b = HH(b, c, d2, a, M_offset_6, 23, T[43]);
          a = HH(a, b, c, d2, M_offset_9, 4, T[44]);
          d2 = HH(d2, a, b, c, M_offset_12, 11, T[45]);
          c = HH(c, d2, a, b, M_offset_15, 16, T[46]);
          b = HH(b, c, d2, a, M_offset_2, 23, T[47]);
          a = II(a, b, c, d2, M_offset_0, 6, T[48]);
          d2 = II(d2, a, b, c, M_offset_7, 10, T[49]);
          c = II(c, d2, a, b, M_offset_14, 15, T[50]);
          b = II(b, c, d2, a, M_offset_5, 21, T[51]);
          a = II(a, b, c, d2, M_offset_12, 6, T[52]);
          d2 = II(d2, a, b, c, M_offset_3, 10, T[53]);
          c = II(c, d2, a, b, M_offset_10, 15, T[54]);
          b = II(b, c, d2, a, M_offset_1, 21, T[55]);
          a = II(a, b, c, d2, M_offset_8, 6, T[56]);
          d2 = II(d2, a, b, c, M_offset_15, 10, T[57]);
          c = II(c, d2, a, b, M_offset_6, 15, T[58]);
          b = II(b, c, d2, a, M_offset_13, 21, T[59]);
          a = II(a, b, c, d2, M_offset_4, 6, T[60]);
          d2 = II(d2, a, b, c, M_offset_11, 10, T[61]);
          c = II(c, d2, a, b, M_offset_2, 15, T[62]);
          b = II(b, c, d2, a, M_offset_9, 21, T[63]);
          H[0] = H[0] + a | 0;
          H[1] = H[1] + b | 0;
          H[2] = H[2] + c | 0;
          H[3] = H[3] + d2 | 0;
        },
        _doFinalize: function() {
          var data = this._data;
          var dataWords = data.words;
          var nBitsTotal = this._nDataBytes * 8;
          var nBitsLeft = data.sigBytes * 8;
          dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
          var nBitsTotalH = Math2.floor(nBitsTotal / 4294967296);
          var nBitsTotalL = nBitsTotal;
          dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
          dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
          data.sigBytes = (dataWords.length + 1) * 4;
          this._process();
          var hash = this._hash;
          var H = hash.words;
          for (var i2 = 0; i2 < 4; i2++) {
            var H_i = H[i2];
            H[i2] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
          }
          return hash;
        },
        clone: function() {
          var clone2 = Hasher.clone.call(this);
          clone2._hash = this._hash.clone();
          return clone2;
        }
      });
      function FF(a, b, c, d2, x, s, t) {
        var n = a + (b & c | ~b & d2) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      function GG(a, b, c, d2, x, s, t) {
        var n = a + (b & d2 | c & ~d2) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      function HH(a, b, c, d2, x, s, t) {
        var n = a + (b ^ c ^ d2) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      function II(a, b, c, d2, x, s, t) {
        var n = a + (c ^ (b | ~d2)) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      C.MD5 = Hasher._createHelper(MD5);
      C.HmacMD5 = Hasher._createHmacHelper(MD5);
    })(Math);
    return CryptoJS.MD5;
  });
})(md5$1);
var md5 = md5$1.exports;
var ansiStyles$1 = { exports: {} };
var colorName = {
  "aliceblue": [240, 248, 255],
  "antiquewhite": [250, 235, 215],
  "aqua": [0, 255, 255],
  "aquamarine": [127, 255, 212],
  "azure": [240, 255, 255],
  "beige": [245, 245, 220],
  "bisque": [255, 228, 196],
  "black": [0, 0, 0],
  "blanchedalmond": [255, 235, 205],
  "blue": [0, 0, 255],
  "blueviolet": [138, 43, 226],
  "brown": [165, 42, 42],
  "burlywood": [222, 184, 135],
  "cadetblue": [95, 158, 160],
  "chartreuse": [127, 255, 0],
  "chocolate": [210, 105, 30],
  "coral": [255, 127, 80],
  "cornflowerblue": [100, 149, 237],
  "cornsilk": [255, 248, 220],
  "crimson": [220, 20, 60],
  "cyan": [0, 255, 255],
  "darkblue": [0, 0, 139],
  "darkcyan": [0, 139, 139],
  "darkgoldenrod": [184, 134, 11],
  "darkgray": [169, 169, 169],
  "darkgreen": [0, 100, 0],
  "darkgrey": [169, 169, 169],
  "darkkhaki": [189, 183, 107],
  "darkmagenta": [139, 0, 139],
  "darkolivegreen": [85, 107, 47],
  "darkorange": [255, 140, 0],
  "darkorchid": [153, 50, 204],
  "darkred": [139, 0, 0],
  "darksalmon": [233, 150, 122],
  "darkseagreen": [143, 188, 143],
  "darkslateblue": [72, 61, 139],
  "darkslategray": [47, 79, 79],
  "darkslategrey": [47, 79, 79],
  "darkturquoise": [0, 206, 209],
  "darkviolet": [148, 0, 211],
  "deeppink": [255, 20, 147],
  "deepskyblue": [0, 191, 255],
  "dimgray": [105, 105, 105],
  "dimgrey": [105, 105, 105],
  "dodgerblue": [30, 144, 255],
  "firebrick": [178, 34, 34],
  "floralwhite": [255, 250, 240],
  "forestgreen": [34, 139, 34],
  "fuchsia": [255, 0, 255],
  "gainsboro": [220, 220, 220],
  "ghostwhite": [248, 248, 255],
  "gold": [255, 215, 0],
  "goldenrod": [218, 165, 32],
  "gray": [128, 128, 128],
  "green": [0, 128, 0],
  "greenyellow": [173, 255, 47],
  "grey": [128, 128, 128],
  "honeydew": [240, 255, 240],
  "hotpink": [255, 105, 180],
  "indianred": [205, 92, 92],
  "indigo": [75, 0, 130],
  "ivory": [255, 255, 240],
  "khaki": [240, 230, 140],
  "lavender": [230, 230, 250],
  "lavenderblush": [255, 240, 245],
  "lawngreen": [124, 252, 0],
  "lemonchiffon": [255, 250, 205],
  "lightblue": [173, 216, 230],
  "lightcoral": [240, 128, 128],
  "lightcyan": [224, 255, 255],
  "lightgoldenrodyellow": [250, 250, 210],
  "lightgray": [211, 211, 211],
  "lightgreen": [144, 238, 144],
  "lightgrey": [211, 211, 211],
  "lightpink": [255, 182, 193],
  "lightsalmon": [255, 160, 122],
  "lightseagreen": [32, 178, 170],
  "lightskyblue": [135, 206, 250],
  "lightslategray": [119, 136, 153],
  "lightslategrey": [119, 136, 153],
  "lightsteelblue": [176, 196, 222],
  "lightyellow": [255, 255, 224],
  "lime": [0, 255, 0],
  "limegreen": [50, 205, 50],
  "linen": [250, 240, 230],
  "magenta": [255, 0, 255],
  "maroon": [128, 0, 0],
  "mediumaquamarine": [102, 205, 170],
  "mediumblue": [0, 0, 205],
  "mediumorchid": [186, 85, 211],
  "mediumpurple": [147, 112, 219],
  "mediumseagreen": [60, 179, 113],
  "mediumslateblue": [123, 104, 238],
  "mediumspringgreen": [0, 250, 154],
  "mediumturquoise": [72, 209, 204],
  "mediumvioletred": [199, 21, 133],
  "midnightblue": [25, 25, 112],
  "mintcream": [245, 255, 250],
  "mistyrose": [255, 228, 225],
  "moccasin": [255, 228, 181],
  "navajowhite": [255, 222, 173],
  "navy": [0, 0, 128],
  "oldlace": [253, 245, 230],
  "olive": [128, 128, 0],
  "olivedrab": [107, 142, 35],
  "orange": [255, 165, 0],
  "orangered": [255, 69, 0],
  "orchid": [218, 112, 214],
  "palegoldenrod": [238, 232, 170],
  "palegreen": [152, 251, 152],
  "paleturquoise": [175, 238, 238],
  "palevioletred": [219, 112, 147],
  "papayawhip": [255, 239, 213],
  "peachpuff": [255, 218, 185],
  "peru": [205, 133, 63],
  "pink": [255, 192, 203],
  "plum": [221, 160, 221],
  "powderblue": [176, 224, 230],
  "purple": [128, 0, 128],
  "rebeccapurple": [102, 51, 153],
  "red": [255, 0, 0],
  "rosybrown": [188, 143, 143],
  "royalblue": [65, 105, 225],
  "saddlebrown": [139, 69, 19],
  "salmon": [250, 128, 114],
  "sandybrown": [244, 164, 96],
  "seagreen": [46, 139, 87],
  "seashell": [255, 245, 238],
  "sienna": [160, 82, 45],
  "silver": [192, 192, 192],
  "skyblue": [135, 206, 235],
  "slateblue": [106, 90, 205],
  "slategray": [112, 128, 144],
  "slategrey": [112, 128, 144],
  "snow": [255, 250, 250],
  "springgreen": [0, 255, 127],
  "steelblue": [70, 130, 180],
  "tan": [210, 180, 140],
  "teal": [0, 128, 128],
  "thistle": [216, 191, 216],
  "tomato": [255, 99, 71],
  "turquoise": [64, 224, 208],
  "violet": [238, 130, 238],
  "wheat": [245, 222, 179],
  "white": [255, 255, 255],
  "whitesmoke": [245, 245, 245],
  "yellow": [255, 255, 0],
  "yellowgreen": [154, 205, 50]
};
const cssKeywords = colorName;
const reverseKeywords = {};
for (const key of Object.keys(cssKeywords)) {
  reverseKeywords[cssKeywords[key]] = key;
}
const convert$1 = {
  rgb: { channels: 3, labels: "rgb" },
  hsl: { channels: 3, labels: "hsl" },
  hsv: { channels: 3, labels: "hsv" },
  hwb: { channels: 3, labels: "hwb" },
  cmyk: { channels: 4, labels: "cmyk" },
  xyz: { channels: 3, labels: "xyz" },
  lab: { channels: 3, labels: "lab" },
  lch: { channels: 3, labels: "lch" },
  hex: { channels: 1, labels: ["hex"] },
  keyword: { channels: 1, labels: ["keyword"] },
  ansi16: { channels: 1, labels: ["ansi16"] },
  ansi256: { channels: 1, labels: ["ansi256"] },
  hcg: { channels: 3, labels: ["h", "c", "g"] },
  apple: { channels: 3, labels: ["r16", "g16", "b16"] },
  gray: { channels: 1, labels: ["gray"] }
};
var conversions$2 = convert$1;
for (const model of Object.keys(convert$1)) {
  if (!("channels" in convert$1[model])) {
    throw new Error("missing channels property: " + model);
  }
  if (!("labels" in convert$1[model])) {
    throw new Error("missing channel labels property: " + model);
  }
  if (convert$1[model].labels.length !== convert$1[model].channels) {
    throw new Error("channel and label counts mismatch: " + model);
  }
  const { channels, labels } = convert$1[model];
  delete convert$1[model].channels;
  delete convert$1[model].labels;
  Object.defineProperty(convert$1[model], "channels", { value: channels });
  Object.defineProperty(convert$1[model], "labels", { value: labels });
}
convert$1.rgb.hsl = function(rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h;
  let s;
  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }
  h = Math.min(h * 60, 360);
  if (h < 0) {
    h += 360;
  }
  const l = (min + max) / 2;
  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }
  return [h, s * 100, l * 100];
};
convert$1.rgb.hsv = function(rgb) {
  let rdif;
  let gdif;
  let bdif;
  let h;
  let s;
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const v = Math.max(r, g, b);
  const diff = v - Math.min(r, g, b);
  const diffc = function(c) {
    return (v - c) / 6 / diff + 1 / 2;
  };
  if (diff === 0) {
    h = 0;
    s = 0;
  } else {
    s = diff / v;
    rdif = diffc(r);
    gdif = diffc(g);
    bdif = diffc(b);
    if (r === v) {
      h = bdif - gdif;
    } else if (g === v) {
      h = 1 / 3 + rdif - bdif;
    } else if (b === v) {
      h = 2 / 3 + gdif - rdif;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return [
    h * 360,
    s * 100,
    v * 100
  ];
};
convert$1.rgb.hwb = function(rgb) {
  const r = rgb[0];
  const g = rgb[1];
  let b = rgb[2];
  const h = convert$1.rgb.hsl(rgb)[0];
  const w = 1 / 255 * Math.min(r, Math.min(g, b));
  b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
  return [h, w * 100, b * 100];
};
convert$1.rgb.cmyk = function(rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const k = Math.min(1 - r, 1 - g, 1 - b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;
  return [c * 100, m * 100, y * 100, k * 100];
};
function comparativeDistance(x, y) {
  return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
}
convert$1.rgb.keyword = function(rgb) {
  const reversed = reverseKeywords[rgb];
  if (reversed) {
    return reversed;
  }
  let currentClosestDistance = Infinity;
  let currentClosestKeyword;
  for (const keyword of Object.keys(cssKeywords)) {
    const value = cssKeywords[keyword];
    const distance = comparativeDistance(rgb, value);
    if (distance < currentClosestDistance) {
      currentClosestDistance = distance;
      currentClosestKeyword = keyword;
    }
  }
  return currentClosestKeyword;
};
convert$1.keyword.rgb = function(keyword) {
  return cssKeywords[keyword];
};
convert$1.rgb.xyz = function(rgb) {
  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255;
  r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
  g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
  b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
  const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
  return [x * 100, y * 100, z * 100];
};
convert$1.rgb.lab = function(rgb) {
  const xyz = convert$1.rgb.xyz(rgb);
  let x = xyz[0];
  let y = xyz[1];
  let z = xyz[2];
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
  y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
  z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);
  return [l, a, b];
};
convert$1.hsl.rgb = function(hsl) {
  const h = hsl[0] / 360;
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  let t2;
  let t3;
  let val;
  if (s === 0) {
    val = l * 255;
    return [val, val, val];
  }
  if (l < 0.5) {
    t2 = l * (1 + s);
  } else {
    t2 = l + s - l * s;
  }
  const t1 = 2 * l - t2;
  const rgb = [0, 0, 0];
  for (let i2 = 0; i2 < 3; i2++) {
    t3 = h + 1 / 3 * -(i2 - 1);
    if (t3 < 0) {
      t3++;
    }
    if (t3 > 1) {
      t3--;
    }
    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }
    rgb[i2] = val * 255;
  }
  return rgb;
};
convert$1.hsl.hsv = function(hsl) {
  const h = hsl[0];
  let s = hsl[1] / 100;
  let l = hsl[2] / 100;
  let smin = s;
  const lmin = Math.max(l, 0.01);
  l *= 2;
  s *= l <= 1 ? l : 2 - l;
  smin *= lmin <= 1 ? lmin : 2 - lmin;
  const v = (l + s) / 2;
  const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
  return [h, sv * 100, v * 100];
};
convert$1.hsv.rgb = function(hsv) {
  const h = hsv[0] / 60;
  const s = hsv[1] / 100;
  let v = hsv[2] / 100;
  const hi = Math.floor(h) % 6;
  const f = h - Math.floor(h);
  const p = 255 * v * (1 - s);
  const q = 255 * v * (1 - s * f);
  const t = 255 * v * (1 - s * (1 - f));
  v *= 255;
  switch (hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
  }
};
convert$1.hsv.hsl = function(hsv) {
  const h = hsv[0];
  const s = hsv[1] / 100;
  const v = hsv[2] / 100;
  const vmin = Math.max(v, 0.01);
  let sl;
  let l;
  l = (2 - s) * v;
  const lmin = (2 - s) * vmin;
  sl = s * vmin;
  sl /= lmin <= 1 ? lmin : 2 - lmin;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
};
convert$1.hwb.rgb = function(hwb) {
  const h = hwb[0] / 360;
  let wh = hwb[1] / 100;
  let bl = hwb[2] / 100;
  const ratio = wh + bl;
  let f;
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }
  const i2 = Math.floor(6 * h);
  const v = 1 - bl;
  f = 6 * h - i2;
  if ((i2 & 1) !== 0) {
    f = 1 - f;
  }
  const n = wh + f * (v - wh);
  let r;
  let g;
  let b;
  switch (i2) {
    default:
    case 6:
    case 0:
      r = v;
      g = n;
      b = wh;
      break;
    case 1:
      r = n;
      g = v;
      b = wh;
      break;
    case 2:
      r = wh;
      g = v;
      b = n;
      break;
    case 3:
      r = wh;
      g = n;
      b = v;
      break;
    case 4:
      r = n;
      g = wh;
      b = v;
      break;
    case 5:
      r = v;
      g = wh;
      b = n;
      break;
  }
  return [r * 255, g * 255, b * 255];
};
convert$1.cmyk.rgb = function(cmyk) {
  const c = cmyk[0] / 100;
  const m = cmyk[1] / 100;
  const y = cmyk[2] / 100;
  const k = cmyk[3] / 100;
  const r = 1 - Math.min(1, c * (1 - k) + k);
  const g = 1 - Math.min(1, m * (1 - k) + k);
  const b = 1 - Math.min(1, y * (1 - k) + k);
  return [r * 255, g * 255, b * 255];
};
convert$1.xyz.rgb = function(xyz) {
  const x = xyz[0] / 100;
  const y = xyz[1] / 100;
  const z = xyz[2] / 100;
  let r;
  let g;
  let b;
  r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  b = x * 0.0557 + y * -0.204 + z * 1.057;
  r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
  g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
  b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
  r = Math.min(Math.max(0, r), 1);
  g = Math.min(Math.max(0, g), 1);
  b = Math.min(Math.max(0, b), 1);
  return [r * 255, g * 255, b * 255];
};
convert$1.xyz.lab = function(xyz) {
  let x = xyz[0];
  let y = xyz[1];
  let z = xyz[2];
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
  y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
  z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);
  return [l, a, b];
};
convert$1.lab.xyz = function(lab) {
  const l = lab[0];
  const a = lab[1];
  const b = lab[2];
  let x;
  let y;
  let z;
  y = (l + 16) / 116;
  x = a / 500 + y;
  z = y - b / 200;
  const y2 = y ** 3;
  const x2 = x ** 3;
  const z2 = z ** 3;
  y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
  x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
  z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
  x *= 95.047;
  y *= 100;
  z *= 108.883;
  return [x, y, z];
};
convert$1.lab.lch = function(lab) {
  const l = lab[0];
  const a = lab[1];
  const b = lab[2];
  let h;
  const hr = Math.atan2(b, a);
  h = hr * 360 / 2 / Math.PI;
  if (h < 0) {
    h += 360;
  }
  const c = Math.sqrt(a * a + b * b);
  return [l, c, h];
};
convert$1.lch.lab = function(lch) {
  const l = lch[0];
  const c = lch[1];
  const h = lch[2];
  const hr = h / 360 * 2 * Math.PI;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);
  return [l, a, b];
};
convert$1.rgb.ansi16 = function(args, saturation = null) {
  const [r, g, b] = args;
  let value = saturation === null ? convert$1.rgb.hsv(args)[2] : saturation;
  value = Math.round(value / 50);
  if (value === 0) {
    return 30;
  }
  let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
  if (value === 2) {
    ansi += 60;
  }
  return ansi;
};
convert$1.hsv.ansi16 = function(args) {
  return convert$1.rgb.ansi16(convert$1.hsv.rgb(args), args[2]);
};
convert$1.rgb.ansi256 = function(args) {
  const r = args[0];
  const g = args[1];
  const b = args[2];
  if (r === g && g === b) {
    if (r < 8) {
      return 16;
    }
    if (r > 248) {
      return 231;
    }
    return Math.round((r - 8) / 247 * 24) + 232;
  }
  const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
  return ansi;
};
convert$1.ansi16.rgb = function(args) {
  let color = args % 10;
  if (color === 0 || color === 7) {
    if (args > 50) {
      color += 3.5;
    }
    color = color / 10.5 * 255;
    return [color, color, color];
  }
  const mult = (~~(args > 50) + 1) * 0.5;
  const r = (color & 1) * mult * 255;
  const g = (color >> 1 & 1) * mult * 255;
  const b = (color >> 2 & 1) * mult * 255;
  return [r, g, b];
};
convert$1.ansi256.rgb = function(args) {
  if (args >= 232) {
    const c = (args - 232) * 10 + 8;
    return [c, c, c];
  }
  args -= 16;
  let rem;
  const r = Math.floor(args / 36) / 5 * 255;
  const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
  const b = rem % 6 / 5 * 255;
  return [r, g, b];
};
convert$1.rgb.hex = function(args) {
  const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
  const string2 = integer.toString(16).toUpperCase();
  return "000000".substring(string2.length) + string2;
};
convert$1.hex.rgb = function(args) {
  const match2 = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!match2) {
    return [0, 0, 0];
  }
  let colorString = match2[0];
  if (match2[0].length === 3) {
    colorString = colorString.split("").map((char) => {
      return char + char;
    }).join("");
  }
  const integer = parseInt(colorString, 16);
  const r = integer >> 16 & 255;
  const g = integer >> 8 & 255;
  const b = integer & 255;
  return [r, g, b];
};
convert$1.rgb.hcg = function(rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const max = Math.max(Math.max(r, g), b);
  const min = Math.min(Math.min(r, g), b);
  const chroma = max - min;
  let grayscale;
  let hue;
  if (chroma < 1) {
    grayscale = min / (1 - chroma);
  } else {
    grayscale = 0;
  }
  if (chroma <= 0) {
    hue = 0;
  } else if (max === r) {
    hue = (g - b) / chroma % 6;
  } else if (max === g) {
    hue = 2 + (b - r) / chroma;
  } else {
    hue = 4 + (r - g) / chroma;
  }
  hue /= 6;
  hue %= 1;
  return [hue * 360, chroma * 100, grayscale * 100];
};
convert$1.hsl.hcg = function(hsl) {
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
  let f = 0;
  if (c < 1) {
    f = (l - 0.5 * c) / (1 - c);
  }
  return [hsl[0], c * 100, f * 100];
};
convert$1.hsv.hcg = function(hsv) {
  const s = hsv[1] / 100;
  const v = hsv[2] / 100;
  const c = s * v;
  let f = 0;
  if (c < 1) {
    f = (v - c) / (1 - c);
  }
  return [hsv[0], c * 100, f * 100];
};
convert$1.hcg.rgb = function(hcg) {
  const h = hcg[0] / 360;
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  if (c === 0) {
    return [g * 255, g * 255, g * 255];
  }
  const pure = [0, 0, 0];
  const hi = h % 1 * 6;
  const v = hi % 1;
  const w = 1 - v;
  let mg = 0;
  switch (Math.floor(hi)) {
    case 0:
      pure[0] = 1;
      pure[1] = v;
      pure[2] = 0;
      break;
    case 1:
      pure[0] = w;
      pure[1] = 1;
      pure[2] = 0;
      break;
    case 2:
      pure[0] = 0;
      pure[1] = 1;
      pure[2] = v;
      break;
    case 3:
      pure[0] = 0;
      pure[1] = w;
      pure[2] = 1;
      break;
    case 4:
      pure[0] = v;
      pure[1] = 0;
      pure[2] = 1;
      break;
    default:
      pure[0] = 1;
      pure[1] = 0;
      pure[2] = w;
  }
  mg = (1 - c) * g;
  return [
    (c * pure[0] + mg) * 255,
    (c * pure[1] + mg) * 255,
    (c * pure[2] + mg) * 255
  ];
};
convert$1.hcg.hsv = function(hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  const v = c + g * (1 - c);
  let f = 0;
  if (v > 0) {
    f = c / v;
  }
  return [hcg[0], f * 100, v * 100];
};
convert$1.hcg.hsl = function(hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  const l = g * (1 - c) + 0.5 * c;
  let s = 0;
  if (l > 0 && l < 0.5) {
    s = c / (2 * l);
  } else if (l >= 0.5 && l < 1) {
    s = c / (2 * (1 - l));
  }
  return [hcg[0], s * 100, l * 100];
};
convert$1.hcg.hwb = function(hcg) {
  const c = hcg[1] / 100;
  const g = hcg[2] / 100;
  const v = c + g * (1 - c);
  return [hcg[0], (v - c) * 100, (1 - v) * 100];
};
convert$1.hwb.hcg = function(hwb) {
  const w = hwb[1] / 100;
  const b = hwb[2] / 100;
  const v = 1 - b;
  const c = v - w;
  let g = 0;
  if (c < 1) {
    g = (v - c) / (1 - c);
  }
  return [hwb[0], c * 100, g * 100];
};
convert$1.apple.rgb = function(apple) {
  return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
};
convert$1.rgb.apple = function(rgb) {
  return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
};
convert$1.gray.rgb = function(args) {
  return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};
convert$1.gray.hsl = function(args) {
  return [0, 0, args[0]];
};
convert$1.gray.hsv = convert$1.gray.hsl;
convert$1.gray.hwb = function(gray) {
  return [0, 100, gray[0]];
};
convert$1.gray.cmyk = function(gray) {
  return [0, 0, 0, gray[0]];
};
convert$1.gray.lab = function(gray) {
  return [gray[0], 0, 0];
};
convert$1.gray.hex = function(gray) {
  const val = Math.round(gray[0] / 100 * 255) & 255;
  const integer = (val << 16) + (val << 8) + val;
  const string2 = integer.toString(16).toUpperCase();
  return "000000".substring(string2.length) + string2;
};
convert$1.rgb.gray = function(rgb) {
  const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
  return [val / 255 * 100];
};
const conversions$1 = conversions$2;
function buildGraph() {
  const graph = {};
  const models2 = Object.keys(conversions$1);
  for (let len = models2.length, i2 = 0; i2 < len; i2++) {
    graph[models2[i2]] = {
      distance: -1,
      parent: null
    };
  }
  return graph;
}
function deriveBFS(fromModel) {
  const graph = buildGraph();
  const queue = [fromModel];
  graph[fromModel].distance = 0;
  while (queue.length) {
    const current = queue.pop();
    const adjacents = Object.keys(conversions$1[current]);
    for (let len = adjacents.length, i2 = 0; i2 < len; i2++) {
      const adjacent = adjacents[i2];
      const node = graph[adjacent];
      if (node.distance === -1) {
        node.distance = graph[current].distance + 1;
        node.parent = current;
        queue.unshift(adjacent);
      }
    }
  }
  return graph;
}
function link(from, to) {
  return function(args) {
    return to(from(args));
  };
}
function wrapConversion(toModel, graph) {
  const path2 = [graph[toModel].parent, toModel];
  let fn2 = conversions$1[graph[toModel].parent][toModel];
  let cur = graph[toModel].parent;
  while (graph[cur].parent) {
    path2.unshift(graph[cur].parent);
    fn2 = link(conversions$1[graph[cur].parent][cur], fn2);
    cur = graph[cur].parent;
  }
  fn2.conversion = path2;
  return fn2;
}
var route$1 = function(fromModel) {
  const graph = deriveBFS(fromModel);
  const conversion = {};
  const models2 = Object.keys(graph);
  for (let len = models2.length, i2 = 0; i2 < len; i2++) {
    const toModel = models2[i2];
    const node = graph[toModel];
    if (node.parent === null) {
      continue;
    }
    conversion[toModel] = wrapConversion(toModel, graph);
  }
  return conversion;
};
const conversions = conversions$2;
const route = route$1;
const convert = {};
const models = Object.keys(conversions);
function wrapRaw(fn2) {
  const wrappedFn = function(...args) {
    const arg0 = args[0];
    if (arg0 === void 0 || arg0 === null) {
      return arg0;
    }
    if (arg0.length > 1) {
      args = arg0;
    }
    return fn2(args);
  };
  if ("conversion" in fn2) {
    wrappedFn.conversion = fn2.conversion;
  }
  return wrappedFn;
}
function wrapRounded(fn2) {
  const wrappedFn = function(...args) {
    const arg0 = args[0];
    if (arg0 === void 0 || arg0 === null) {
      return arg0;
    }
    if (arg0.length > 1) {
      args = arg0;
    }
    const result = fn2(args);
    if (typeof result === "object") {
      for (let len = result.length, i2 = 0; i2 < len; i2++) {
        result[i2] = Math.round(result[i2]);
      }
    }
    return result;
  };
  if ("conversion" in fn2) {
    wrappedFn.conversion = fn2.conversion;
  }
  return wrappedFn;
}
models.forEach((fromModel) => {
  convert[fromModel] = {};
  Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
  Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
  const routes = route(fromModel);
  const routeModels = Object.keys(routes);
  routeModels.forEach((toModel) => {
    const fn2 = routes[toModel];
    convert[fromModel][toModel] = wrapRounded(fn2);
    convert[fromModel][toModel].raw = wrapRaw(fn2);
  });
});
var colorConvert = convert;
(function(module) {
  const wrapAnsi16 = (fn2, offset) => (...args) => {
    const code = fn2(...args);
    return `[${code + offset}m`;
  };
  const wrapAnsi256 = (fn2, offset) => (...args) => {
    const code = fn2(...args);
    return `[${38 + offset};5;${code}m`;
  };
  const wrapAnsi16m = (fn2, offset) => (...args) => {
    const rgb = fn2(...args);
    return `[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
  };
  const ansi2ansi = (n) => n;
  const rgb2rgb = (r, g, b) => [r, g, b];
  const setLazyProperty = (object, property, get2) => {
    Object.defineProperty(object, property, {
      get: () => {
        const value = get2();
        Object.defineProperty(object, property, {
          value,
          enumerable: true,
          configurable: true
        });
        return value;
      },
      enumerable: true,
      configurable: true
    });
  };
  let colorConvert$1;
  const makeDynamicStyles = (wrap2, targetSpace, identity, isBackground) => {
    if (colorConvert$1 === void 0) {
      colorConvert$1 = colorConvert;
    }
    const offset = isBackground ? 10 : 0;
    const styles2 = {};
    for (const [sourceSpace, suite] of Object.entries(colorConvert$1)) {
      const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
      if (sourceSpace === targetSpace) {
        styles2[name] = wrap2(identity, offset);
      } else if (typeof suite === "object") {
        styles2[name] = wrap2(suite[targetSpace], offset);
      }
    }
    return styles2;
  };
  function assembleStyles() {
    const codes = new Map();
    const styles2 = {
      modifier: {
        reset: [0, 0],
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29]
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        blackBright: [90, 39],
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39]
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        bgBlackBright: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49]
      }
    };
    styles2.color.gray = styles2.color.blackBright;
    styles2.bgColor.bgGray = styles2.bgColor.bgBlackBright;
    styles2.color.grey = styles2.color.blackBright;
    styles2.bgColor.bgGrey = styles2.bgColor.bgBlackBright;
    for (const [groupName, group] of Object.entries(styles2)) {
      for (const [styleName, style] of Object.entries(group)) {
        styles2[styleName] = {
          open: `[${style[0]}m`,
          close: `[${style[1]}m`
        };
        group[styleName] = styles2[styleName];
        codes.set(style[0], style[1]);
      }
      Object.defineProperty(styles2, groupName, {
        value: group,
        enumerable: false
      });
    }
    Object.defineProperty(styles2, "codes", {
      value: codes,
      enumerable: false
    });
    styles2.color.close = "[39m";
    styles2.bgColor.close = "[49m";
    setLazyProperty(styles2.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
    setLazyProperty(styles2.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
    setLazyProperty(styles2.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
    setLazyProperty(styles2.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
    setLazyProperty(styles2.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
    setLazyProperty(styles2.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
    return styles2;
  }
  Object.defineProperty(module, "exports", {
    enumerable: true,
    get: assembleStyles
  });
})(ansiStyles$1);
var browser = {
  stdout: false,
  stderr: false
};
const stringReplaceAll$1 = (string2, substring, replacer) => {
  let index = string2.indexOf(substring);
  if (index === -1) {
    return string2;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string2.substr(endIndex, index - endIndex) + substring + replacer;
    endIndex = index + substringLength;
    index = string2.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string2.substr(endIndex);
  return returnValue;
};
const stringEncaseCRLFWithFirstIndex$1 = (string2, prefix, postfix, index) => {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string2[index - 1] === "\r";
    returnValue += string2.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string2.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string2.substr(endIndex);
  return returnValue;
};
var util = {
  stringReplaceAll: stringReplaceAll$1,
  stringEncaseCRLFWithFirstIndex: stringEncaseCRLFWithFirstIndex$1
};
const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
const ESCAPES = new Map([
  ["n", "\n"],
  ["r", "\r"],
  ["t", "	"],
  ["b", "\b"],
  ["f", "\f"],
  ["v", "\v"],
  ["0", "\0"],
  ["\\", "\\"],
  ["e", ""],
  ["a", "\x07"]
]);
function unescape$1(c) {
  const u = c[0] === "u";
  const bracket = c[1] === "{";
  if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
    return String.fromCharCode(parseInt(c.slice(1), 16));
  }
  if (u && bracket) {
    return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
  }
  return ESCAPES.get(c) || c;
}
function parseArguments(name, arguments_) {
  const results = [];
  const chunks = arguments_.trim().split(/\s*,\s*/g);
  let matches;
  for (const chunk of chunks) {
    const number = Number(chunk);
    if (!Number.isNaN(number)) {
      results.push(number);
    } else if (matches = chunk.match(STRING_REGEX)) {
      results.push(matches[2].replace(ESCAPE_REGEX, (m, escape2, character) => escape2 ? unescape$1(escape2) : character));
    } else {
      throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
    }
  }
  return results;
}
function parseStyle(style) {
  STYLE_REGEX.lastIndex = 0;
  const results = [];
  let matches;
  while ((matches = STYLE_REGEX.exec(style)) !== null) {
    const name = matches[1];
    if (matches[2]) {
      const args = parseArguments(name, matches[2]);
      results.push([name].concat(args));
    } else {
      results.push([name]);
    }
  }
  return results;
}
function buildStyle(chalk2, styles2) {
  const enabled = {};
  for (const layer of styles2) {
    for (const style of layer.styles) {
      enabled[style[0]] = layer.inverse ? null : style.slice(1);
    }
  }
  let current = chalk2;
  for (const [styleName, styles3] of Object.entries(enabled)) {
    if (!Array.isArray(styles3)) {
      continue;
    }
    if (!(styleName in current)) {
      throw new Error(`Unknown Chalk style: ${styleName}`);
    }
    current = styles3.length > 0 ? current[styleName](...styles3) : current[styleName];
  }
  return current;
}
var templates = (chalk2, temporary) => {
  const styles2 = [];
  const chunks = [];
  let chunk = [];
  temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
    if (escapeCharacter) {
      chunk.push(unescape$1(escapeCharacter));
    } else if (style) {
      const string2 = chunk.join("");
      chunk = [];
      chunks.push(styles2.length === 0 ? string2 : buildStyle(chalk2, styles2)(string2));
      styles2.push({ inverse, styles: parseStyle(style) });
    } else if (close) {
      if (styles2.length === 0) {
        throw new Error("Found extraneous } in Chalk template literal");
      }
      chunks.push(buildStyle(chalk2, styles2)(chunk.join("")));
      chunk = [];
      styles2.pop();
    } else {
      chunk.push(character);
    }
  });
  chunks.push(chunk.join(""));
  if (styles2.length > 0) {
    const errMessage = `Chalk template literal is missing ${styles2.length} closing bracket${styles2.length === 1 ? "" : "s"} (\`}\`)`;
    throw new Error(errMessage);
  }
  return chunks.join("");
};
const ansiStyles = ansiStyles$1.exports;
const { stdout: stdoutColor, stderr: stderrColor } = browser;
const {
  stringReplaceAll,
  stringEncaseCRLFWithFirstIndex
} = util;
const { isArray: isArray$4 } = Array;
const levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
const styles = Object.create(null);
const applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === void 0 ? colorLevel : options.level;
};
class ChalkClass {
  constructor(options) {
    return chalkFactory(options);
  }
}
const chalkFactory = (options) => {
  const chalk2 = {};
  applyOptions(chalk2, options);
  chalk2.template = (...arguments_) => chalkTag(chalk2.template, ...arguments_);
  Object.setPrototypeOf(chalk2, Chalk.prototype);
  Object.setPrototypeOf(chalk2.template, chalk2);
  chalk2.template.constructor = () => {
    throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
  };
  chalk2.template.Instance = ChalkClass;
  return chalk2.template;
};
function Chalk(options) {
  return chalkFactory(options);
}
for (const [styleName, style] of Object.entries(ansiStyles)) {
  styles[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles.visible = {
  get() {
    const builder = createBuilder(this, this._styler, true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
const usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
for (const model of usedModels) {
  styles[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
        return createBuilder(this, styler, this._isEmpty);
      };
    }
  };
}
for (const model of usedModels) {
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
        return createBuilder(this, styler, this._isEmpty);
      };
    }
  };
}
const proto = Object.defineProperties(() => {
}, __spreadProps(__spreadValues({}, styles), {
  level: {
    enumerable: true,
    get() {
      return this._generator.level;
    },
    set(level) {
      this._generator.level = level;
    }
  }
}));
const createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
const createBuilder = (self2, _styler, _isEmpty) => {
  const builder = (...arguments_) => {
    if (isArray$4(arguments_[0]) && isArray$4(arguments_[0].raw)) {
      return applyStyle(builder, chalkTag(builder, ...arguments_));
    }
    return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  };
  Object.setPrototypeOf(builder, proto);
  builder._generator = self2;
  builder._styler = _styler;
  builder._isEmpty = _isEmpty;
  return builder;
};
const applyStyle = (self2, string2) => {
  if (self2.level <= 0 || !string2) {
    return self2._isEmpty ? "" : string2;
  }
  let styler = self2._styler;
  if (styler === void 0) {
    return string2;
  }
  const { openAll, closeAll } = styler;
  if (string2.indexOf("") !== -1) {
    while (styler !== void 0) {
      string2 = stringReplaceAll(string2, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string2.indexOf("\n");
  if (lfIndex !== -1) {
    string2 = stringEncaseCRLFWithFirstIndex(string2, closeAll, openAll, lfIndex);
  }
  return openAll + string2 + closeAll;
};
let template;
const chalkTag = (chalk2, ...strings) => {
  const [firstString] = strings;
  if (!isArray$4(firstString) || !isArray$4(firstString.raw)) {
    return strings.join(" ");
  }
  const arguments_ = strings.slice(1);
  const parts = [firstString.raw[0]];
  for (let i2 = 1; i2 < firstString.length; i2++) {
    parts.push(String(arguments_[i2 - 1]).replace(/[{}\\]/g, "\\$&"), String(firstString.raw[i2]));
  }
  if (template === void 0) {
    template = templates;
  }
  return template(chalk2, parts.join(""));
};
Object.defineProperties(Chalk.prototype, styles);
const chalk = Chalk();
chalk.supportsColor = stdoutColor;
chalk.stderr = Chalk({ level: stderrColor ? stderrColor.level : 0 });
chalk.stderr.supportsColor = stderrColor;
var source = chalk;
function classInstance(object) {
  if (!object)
    return false;
  if (typeof object !== "object")
    return false;
  if (object.constructor && object.constructor.name === "Object")
    return false;
  if (Object.prototype.toString.call(object) === "[object Object]")
    return false;
  if (object.constructor === Object)
    return false;
  return true;
}
function deepMap(objectOrArray, processor, settings = {}, _path = []) {
  settings = __deepMerge({
    classInstances: false,
    array: true,
    privateProps: false,
    cloneFirst: true
  }, settings);
  const isArray2 = Array.isArray(objectOrArray);
  let newObject = isArray2 ? [] : settings.cloneFirst ? Object.assign({}, objectOrArray) : objectOrArray;
  Object.keys(objectOrArray).forEach((prop) => {
    if (!settings.privateProps && prop.match(/^_/))
      return;
    if (plainObject(objectOrArray[prop]) || classInstance(objectOrArray[prop]) && settings.classInstances || Array.isArray(objectOrArray[prop]) && settings.array) {
      const res2 = deepMap(objectOrArray[prop], processor, settings, [
        ..._path,
        prop
      ]);
      if (isArray2) {
        newObject.push(res2);
      } else {
        if (prop === "..." && plainObject(res2)) {
          newObject = Object.assign(Object.assign({}, newObject), res2);
        } else {
          newObject[prop] = res2;
        }
      }
      return;
    }
    const res = processor({
      object: objectOrArray,
      prop,
      value: objectOrArray[prop],
      path: [..._path, prop].join(".")
    });
    if (res === -1) {
      delete objectOrArray[prop];
      return;
    }
    if (isArray2)
      newObject.push(res);
    else {
      if (prop === "..." && plainObject(res)) {
        newObject = Object.assign(Object.assign({}, newObject), res);
      } else {
        newObject[prop] = res;
      }
    }
  });
  return newObject;
}
function isMap(value) {
  return value instanceof Map;
}
function isArray$3(value) {
  return value && typeof value === "object" && value.constructor === Array;
}
function isBoolean(value) {
  return typeof value === "boolean";
}
function isFunction(value) {
  return value && {}.toString.call(value) === "[object Function]";
}
function isJson(value) {
  try {
    const res = JSON.parse(value);
    if (Object.keys(res).length)
      return true;
    return false;
  } catch (e) {
    return false;
  }
  return true;
}
function isObject$1(value) {
  return value && typeof value === "object" && value.constructor === Object;
}
function mapToObject(map) {
  const obj2 = {};
  for (const [k, v] of map)
    obj2[k] = v;
  return obj2;
}
var decycle_1;
const isArray$2 = (e) => Array.isArray(e), isObject = (e) => Object.prototype.toString.call(e).slice(8, -1) === "Object", validate$1 = (e) => {
  if (e === void 0)
    throw new Error("This method requires one parameter");
  if (!isArray$2(e) && !isObject(e))
    throw new TypeError("This method only accepts arrays and objects");
}, findRef = (e, r) => Object.keys(r).find((a) => r[a] === e), decycle = (e) => {
  validate$1(e);
  let r = {};
  const a = (e2, c = "$") => {
    const s = findRef(e2, r);
    return s ? { $ref: s } : isArray$2(e2) || isObject(e2) ? (r[c] = e2, isArray$2(e2) ? e2.map((e3, r2) => a(e3, `${c}[${r2}]`)) : Object.keys(e2).reduce((r2, s2) => (r2[s2] = a(e2[s2], `${c}.${s2}`), r2), {})) : e2;
  };
  return a(e);
};
decycle_1 = decycle;
function fn$3(value, settings = {}) {
  settings = __deepMerge({
    beautify: true,
    highlight: true,
    verbose: true,
    theme: {
      number: source.yellow,
      default: source.white,
      keyword: source.blue,
      regexp: source.red,
      string: source.whiteBright,
      class: source.yellow,
      function: source.yellow,
      comment: source.gray,
      variable: source.red,
      attr: source.green
    }
  }, settings);
  if (typeof value === "string")
    return value;
  if (value === null)
    return null;
  if (value === void 0)
    return void 0;
  if (value instanceof Error) {
    const errorStr = value.toString();
    const stackStr = value.stack;
    const messageStr = value.message;
    if (settings.verbose) {
      return [
        `<red>${value.constructor.name || "Error"}</red>`,
        "",
        messageStr,
        "",
        stackStr
      ].join("\n");
    }
    return errorStr;
  }
  if (isMap(value)) {
    value = mapToObject(value);
  }
  if (isObject$1(value) || isArray$3(value) || isJson(value)) {
    try {
      value = decycle_1(value);
    } catch (e) {
    }
    value = deepMap(value, ({ value: value2 }) => {
      if (value2 instanceof Map)
        return mapToObject(value2);
      return value2;
    });
    let prettyString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
    prettyString = prettyString.replace(/"([^"]+)":/g, "$1:").replace(/\uFFFF/g, '\\"');
    if (settings.highlight)
      ;
    return prettyString;
  }
  if (isBoolean(value)) {
    if (value)
      return "true";
    else
      return "false";
  }
  if (isFunction(value)) {
    return "" + value;
  }
  let returnString = "";
  try {
    value = decycle_1(value);
    returnString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
  } catch (e) {
    try {
      returnString = value.toString();
    } catch (e2) {
      returnString = value;
    }
  }
  return returnString;
}
var __parse = (value) => {
  if (typeof value !== "string")
    return value;
  value = value.split("\u2800").join("").trim();
  try {
    return Function(`
      "use strict";
      return (${value});
    `)();
  } catch (e) {
    return value;
  }
};
const __encryptedMessages = {};
var __md5 = {
  encrypt: function(message) {
    if (typeof message !== "string")
      message = fn$3(message);
    const string2 = md5(message).toString();
    __encryptedMessages[string2] = message;
    return string2;
  },
  decrypt: function(message) {
    if (!__encryptedMessages[message]) {
      console.warn(`The message "${message}" cannot be decrypted...`);
      return;
    }
    const string2 = __encryptedMessages[message];
    delete __encryptedMessages[message];
    return __parse(string2);
  }
};
function availableColors(settings) {
  settings = Object.assign({ excludeBasics: false }, settings !== null && settings !== void 0 ? settings : {});
  const _colors = [
    "yellow",
    "cyan",
    "green",
    "magenta",
    "blue",
    "red",
    "grey",
    "gray"
  ];
  let colors = _colors;
  if (settings.excludeBasics) {
    colors = _colors.filter((c) => {
      return c !== "white" && c !== "black" && c !== "grey" && c !== "gray";
    });
  }
  return colors;
}
function pickRandom(array) {
  return array[Math.round(Math.random() * (array.length - 1))];
}
const _colorUsedByScope = {};
const _colorsStack = {};
function getColorFor(ref, settings) {
  settings = __deepMerge({
    scope: "default",
    excludeBasics: true
  }, settings !== null && settings !== void 0 ? settings : {});
  const availableColors$1 = availableColors(settings);
  const scopeId = __md5.encrypt(settings.scope);
  const refId = __md5.encrypt(ref);
  if (_colorsStack[`${scopeId}.${refId}`])
    return _colorsStack[`${scopeId}.${refId}`];
  if (!_colorUsedByScope[scopeId])
    _colorUsedByScope[scopeId] = [];
  if (_colorUsedByScope[scopeId].length >= availableColors$1.length) {
    const color = pickRandom(availableColors$1);
    _colorsStack[`${scopeId}.${refId}`] = color;
    return color;
  } else {
    for (let i2 = 0; i2 < availableColors$1.length; i2++) {
      if (_colorUsedByScope[scopeId].indexOf(availableColors$1[i2]) === -1) {
        _colorUsedByScope[scopeId].push(availableColors$1[i2]);
        _colorsStack[`${scopeId}.${refId}`] = availableColors$1[i2];
        return availableColors$1[i2];
      }
    }
  }
}
var __set = (obj2, path2, value, settings = {}) => {
  settings = Object.assign({}, settings);
  if (!path2 || path2 === "" || path2 === ".") {
    obj2 = value;
    return;
  }
  path2 = path2.replace(/\[(\w+)\]/g, ".[$1]");
  const a = unquote(path2).split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((p) => unquote(p));
  let o = obj2;
  while (a.length - 1) {
    const n = a.shift();
    if (!(n in o)) {
      if (a[0].match(/^\[[0-9]+\]$/))
        o[n] = [];
      else
        o[n] = {};
    }
    o = o[n];
  }
  if (a[0].match(/^\[[0-9]+\]$/)) {
    if (!Array.isArray(o))
      o = [];
    o.push(value);
  } else {
    o[a[0]] = value;
  }
  return get(obj2, path2);
};
function toJson(object) {
  const newObj = {};
  deepMap(object, ({ value, path: path2 }) => {
    __set(newObj, path2, value);
    return value;
  }, {
    privateProps: false,
    classInstances: true
  });
  return newObj;
}
class SClass {
  constructor(settings = {}) {
    this._settings = {};
    this._interfacesStack = {};
    generateInterfacesStack(this);
    setSettings(this, settings);
    applyInterfaces(this);
    this.metas = getMetas(this);
    Object.defineProperty(this, "metas", {
      enumerable: true,
      value: getMetas(this)
    });
  }
  get formattedName() {
    var _a2, _b2, _c2;
    let name = `<yellow>${((_a2 = this.metas) === null || _a2 === void 0 ? void 0 : _a2.name) || ""}</yellow>`;
    if ((_b2 = this.metas) === null || _b2 === void 0 ? void 0 : _b2.id) {
      name += ` <cyan>${(_c2 = this.metas) === null || _c2 === void 0 ? void 0 : _c2.id}</cyan>`;
    }
    return name;
  }
  static extends(Cls) {
    class SClass2 extends Cls {
      constructor(settings, ...args) {
        super(...args);
        this._settings = {};
        this._interfacesStack = {};
        generateInterfacesStack(this);
        setSettings(this, settings);
        applyInterfaces(this);
        this.metas = getMetas(this);
        Object.defineProperty(this, "metas", {
          enumerable: true,
          value: getMetas(this)
        });
      }
      get formattedName() {
        let name = `<yellow>${this.name || ""}</yellow>`;
        if (this.id) {
          name += ` <cyan>${this.id}</cyan>`;
        }
        return name;
      }
      expose(instance, settings) {
        return expose(this, instance, settings);
      }
      applyInterface(name, on) {
        return applyInterface(this, name, on);
      }
      getInterface(name) {
        return getInterface(this, name);
      }
      toPlainObject() {
        return toPlainObject(this);
      }
    }
    return SClass2;
  }
  expose(instance, settings) {
    return expose(this, instance, settings);
  }
  applyInterface(name, on) {
    return applyInterface(this, name, on);
  }
  getInterface(name) {
    return getInterface(this, name);
  }
  toPlainObject() {
    return toPlainObject(this);
  }
}
function getMetas(ctx) {
  var _a2, _b2, _c2, _d2, _e, _f, _g, _h;
  let name = `<yellow>${((_a2 = ctx._settings.metas) === null || _a2 === void 0 ? void 0 : _a2.name) || ""}</yellow>`;
  if ((_b2 = ctx._settings.metas) === null || _b2 === void 0 ? void 0 : _b2.id) {
    name += ` <cyan>${ctx._settings.metas.id}</cyan>`;
  }
  const metasObj = {
    id: (_d2 = (_c2 = ctx._settings.metas) === null || _c2 === void 0 ? void 0 : _c2.id) !== null && _d2 !== void 0 ? _d2 : ctx.constructor.name,
    name: (_f = (_e = ctx._settings.metas) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : ctx.constructor.name,
    formattedName: name,
    color: (_h = (_g = ctx._settings.metas) === null || _g === void 0 ? void 0 : _g.color) !== null && _h !== void 0 ? _h : "yellow"
  };
  return metasObj;
}
function generateInterfacesStack(ctx) {
  const extendsStack = fn$4(ctx, {
    includeBaseClass: true
  });
  Object.keys(extendsStack).forEach((className) => {
    const cls2 = extendsStack[className];
    if (cls2.interfaces) {
      ctx._interfacesStack[className] = cls2.interfaces;
    }
  });
}
function expose(ctx, instance, settings) {
  settings = __deepMerge({
    as: void 0,
    props: []
  }, settings);
  if (settings.as && typeof settings.as === "string") {
    ctx[settings.as] = instance;
  }
  if (settings.props) {
    settings.props.forEach((prop) => {
      if (instance[prop].bind && typeof instance[prop].bind === "function") {
        ctx[prop] = instance[prop].bind(instance);
      } else {
        ctx[prop] = instance[prop];
      }
    });
  }
}
function getInterfaceObj(ctx, name) {
  let interfaceObj = get(ctx._interfacesStack, name);
  if (!interfaceObj) {
    const keys = Object.keys(ctx._interfacesStack);
    for (let i2 = 0; i2 < keys.length; i2++) {
      const interfacesObj = ctx._interfacesStack[keys[i2]];
      if (interfacesObj[name] !== void 0) {
        if (plainObject(interfacesObj[name])) {
          interfaceObj = interfacesObj[name];
        } else {
          interfaceObj = {
            apply: true,
            on: name === "settings" ? "_settings" : name === "this" ? ctx : void 0,
            class: interfacesObj[name]
          };
        }
        break;
      }
    }
  }
  if (name === "settings" && interfaceObj.on === void 0) {
    if (ctx.settings !== void 0)
      interfaceObj.on = "settings";
    else if (ctx._settings !== void 0)
      interfaceObj.on = "_settings";
  }
  return interfaceObj;
}
function toPlainObject(ctx) {
  return toJson(ctx);
}
function getInterface(ctx, name) {
  const interfaceObj = getInterfaceObj(ctx, name);
  if (plainObject(interfaceObj))
    return interfaceObj.class;
  return interfaceObj;
}
function applyInterfaces(ctx) {
  const keys = Object.keys(ctx._interfacesStack);
  for (let i2 = keys.length - 1; i2 >= 0; i2--) {
    const interfacesObj = ctx._interfacesStack[keys[i2]];
    const className = keys[i2];
    Object.keys(interfacesObj).forEach((name) => {
      const interfaceObj = interfacesObj[name];
      let settings;
      if (plainObject(interfaceObj)) {
        settings = Object.assign({}, Object.assign({ apply: true, on: name === "settings" ? "_settings" : name === "this" ? ctx : void 0 }, interfaceObj));
      } else {
        settings = Object.assign({}, {
          apply: true,
          on: name === "settings" ? "_settings" : name === "this" ? ctx : void 0,
          class: interfaceObj
        });
      }
      if (settings.apply !== true)
        return;
      if (settings.on) {
        if (typeof settings.on === "string" && get(ctx, settings.on) !== void 0) {
          applyInterface(ctx, `${className}.${name}`, settings.on);
        } else if (typeof settings.on === "object") {
          applyInterface(ctx, `${className}.${name}`, settings.on);
        } else if (ctx[name] !== void 0) {
          applyInterface(ctx, `${className}.${name}`);
        }
      }
    });
  }
}
function applyInterface(ctx, name, on = null) {
  const interfaceObj = getInterfaceObj(ctx, `${name}`);
  if (!interfaceObj) {
    throw new Error(`You try to apply the interface named "<yellow>${name}</yellow>" on the context "<cyan>${ctx.name}</cyan>" but it does not exists...`);
  }
  if (on !== void 0)
    interfaceObj.on = on;
  if (!interfaceObj) {
    throw `Sorry the the asked interface "<yellow>${name}</yellow>" does not exists on the class "<cyan>${ctx.constructor.name}</cyan>"`;
  }
  if (name.includes(".")) {
    name = name.split(".").slice(1).join(".");
  }
  if (plainObject(interfaceObj)) {
    let onValue;
    if (interfaceObj.on && typeof interfaceObj.on === "string") {
      onValue = get(ctx, interfaceObj.on);
    } else if (interfaceObj.on && typeof interfaceObj.on === "object") {
      onValue = interfaceObj.on;
    } else {
      onValue = get(ctx, name);
    }
    let applyId = ctx.constructor.name;
    if (ctx.id)
      applyId += `(${ctx.id})`;
    if (name)
      applyId += `.${name}`;
    if (interfaceObj.on && interfaceObj.on.constructor)
      applyId += `.${interfaceObj.on.constructor.name}`;
    if (interfaceObj.on && interfaceObj.on.id)
      applyId += `(${interfaceObj.on.id})`;
    let res;
    if (name === "this") {
      res = interfaceObj.class.apply(onValue || {}, {
        id: applyId,
        throw: true
      });
      deepAssign(ctx, res.value);
      return ctx;
    } else {
      res = interfaceObj.class.apply(onValue, {
        id: applyId,
        throw: true
      });
      if (interfaceObj.on && typeof interfaceObj.on === "object") {
        const returnValue = deepAssign(interfaceObj.on, res);
        return returnValue;
      } else if (interfaceObj.on && typeof interfaceObj.on === "string") {
        return deepAssign(get(ctx, interfaceObj.on), res);
      } else if (ctx[name] !== void 0) {
        return ctx[name];
      } else {
        return res;
      }
    }
  }
}
function setSettings(ctx, settings = {}) {
  var _a2;
  ctx._settings = settings;
  if (!ctx._settings.metas)
    ctx._settings.metas = {};
  if (!((_a2 = ctx._settings.metas) === null || _a2 === void 0 ? void 0 : _a2.id))
    ctx._settings.metas.id = ctx.constructor.name;
  if (!ctx.constructor.name.match(/^SConfig/)) {
    if (!ctx._settings.metas.color)
      ctx._settings.metas.color = getColorFor(ctx.constructor.name, {
        scope: "class"
      });
  } else if (!ctx._settings.metas.color)
    ctx._settings.metas.color = "yellow";
}
function isInteger(data) {
  return typeof data === "number" && !isNaN(data) && function(x) {
    return (x | 0) === x;
  }(parseFloat(data));
}
function upperFirst(string2) {
  return string2.charAt(0).toUpperCase() + string2.slice(1);
}
function typeOf(value, settings = {}) {
  settings = __deepMerge({
    of: false,
    customClass: true
  }, settings);
  let type;
  if (Array.isArray(value))
    type = "Array";
  else if (value instanceof Map)
    type = "Map";
  else if (value === null)
    type = "Null";
  else if (value === void 0)
    type = "Undefined";
  else if (typeof value === "string")
    type = "String";
  else if (isInteger(value))
    type = "Integer";
  else if (typeof value === "number")
    type = "Number";
  else if (typeof value === "boolean")
    type = "Boolean";
  else if (value instanceof RegExp)
    type = "RegExp";
  else if (settings.customClass === true && cls(value) && value.name !== void 0) {
    type = upperFirst(value.name);
  } else if (settings.customClass === true && value.constructor !== void 0 && value.constructor.name !== void 0) {
    type = upperFirst(value.constructor.name);
  } else if (settings.customClass === false && cls(value)) {
    type = "Class";
  } else if (typeof value === "function")
    type = "Function";
  else if (typeof value === "object")
    type = "Object";
  else
    type = "Unknown";
  const avoidTypes = [
    "Null",
    "Undefined",
    "String",
    "Integer",
    "Number",
    "Boolean",
    "Unknown"
  ];
  if (settings.of === true && !avoidTypes.includes(type)) {
    const loopOn = Array.isArray(value) ? [...value.keys()] : Object.keys(value);
    const receivedTypes = [];
    loopOn.forEach((valueIndex) => {
      const valueToCheck = value[valueIndex];
      const childType = typeOf(valueToCheck, {
        of: false,
        customClass: settings.customClass
      });
      if (!receivedTypes.includes(childType)) {
        receivedTypes.push(childType);
      }
    });
    type += `<${receivedTypes.join("|")}>`;
  }
  return type;
}
const fn$2 = function(stack, callback, settings = {}) {
  settings = Object.assign({ newStack: false }, settings);
  const stackType = typeOf(stack).toLowerCase();
  let loopOnKeys;
  if (stackType === "object")
    loopOnKeys = Object.keys(stack);
  else if (stackType === "array")
    loopOnKeys = Array.from(Array(stack.length).keys());
  else if (stackType === "number" || stackType === "integer")
    loopOnKeys = Array.from(Array(Math.round(stack)).keys());
  else if (stackType === "string")
    loopOnKeys = Array.from(stack);
  else if (stackType === "set")
    loopOnKeys = Array.from(stack);
  else
    loopOnKeys = Array.from(stack.keys());
  if (stackType === "string" || stackType === "number" || stackType === "integer" || stackType === "set")
    settings.newStack = true;
  let newStack = [];
  if (stackType === "object")
    newStack = {};
  else if (stackType === "map")
    newStack = new Map();
  else if (stackType === "set")
    newStack = new Set();
  let value;
  let newValue;
  const _get = (s, k) => {
    switch (typeOf(s).toLowerCase()) {
      case "array":
      case "object":
        return s[k];
      case "string":
        return k;
      case "number":
      case "integer":
        return k;
      case "map":
        return s.get(k);
      case "set":
        return k;
    }
  };
  const _set = (s, k, v) => {
    switch (typeOf(s).toLowerCase()) {
      case "array":
        if (settings.newStack === true)
          s.push(v);
        else
          s[k] = v;
        break;
      case "object":
        s[k] = v;
        break;
      case "number":
      case "integer":
      case "string":
        s.push(v);
        break;
      case "map":
        s.set(k, v);
        break;
      case "set":
        s.add(v);
        break;
    }
  };
  for (let i2 = 0; i2 < loopOnKeys.length; i2++) {
    const key = loopOnKeys[i2];
    value = _get(stack, key);
    newValue = callback({ key, prop: key, value, i: i2, idx: i2 });
    if (newValue === -1)
      break;
    _set(settings.newStack ? newStack : stack, key, newValue);
  }
  if (stackType === "string") {
    return newStack.join("");
  }
  return settings.newStack ? newStack : stack;
};
source.level = 3;
const tagsMap = {
  black: (tag, content) => source.black(content),
  red: (tag, content) => source.red(content),
  green: (tag, content) => source.green(content),
  yellow: (tag, content) => source.yellow(content),
  blue: (tag, content) => source.blue(content),
  magenta: (tag, content) => source.magenta(content),
  cyan: (tag, content) => source.cyan(content),
  white: (tag, content) => source.white(content),
  grey: (tag, content) => source.grey(content),
  bgBlack: (tag, content) => source.bgBlack(content),
  bgRed: (tag, content) => source.bgRed(content),
  bgGreen: (tag, content) => source.bgGreen(content),
  bgYellow: (tag, content) => source.bgYellow(content),
  bgBlue: (tag, content) => source.bgBlue(content),
  bgMagenta: (tag, content) => source.bgMagenta(content),
  bgCyan: (tag, content) => source.bgCyan(content),
  bgWhite: (tag, content) => source.bgWhite(content),
  bold: (tag, content) => source.bold(content),
  dim: (tag, content) => source.dim(content),
  italic: (tag, content) => source.italic(content),
  underline: (tag, content) => source.underline(content),
  strike: (tag, content) => source.strike(content),
  h1: (tag, content) => {
    return source.underline(source.bold(content)) + "\n\n";
  },
  h2: (tag, content) => {
    return source.bold(content) + "\n";
  },
  date: (tag, content) => new Date().getDate().toString().padStart("0", 2) + "-" + (new Date().getMonth() + 1).toString().padStart("0", 2) + "-" + new Date().getFullYear().toString().padStart("0", 2),
  time: (tag, content) => new Date().getHours().toString().padStart("0", 2) + ":" + new Date().getMinutes().toString().padStart("0", 2) + ":" + new Date().getMinutes().toString().padStart("0", 2),
  day: (tag, content) => new Date().getDate().toString().padStart("0", 2),
  days: (tag, content) => new Date().getDate().toString().padStart("0", 2),
  month: (tag, content) => new Date().getMonth().toString().padStart("0", 2),
  months: (tag, content) => new Date().getMonth().toString().padStart("0", 2),
  year: (tag, content) => new Date().getFullYear().toString().padStart("0", 2),
  years: (tag, content) => new Date().getFullYear().toString().padStart("0", 2),
  hour: (tag, content) => new Date().getHours().toString().padStart("0", 2),
  hours: (tag, content) => new Date().getHours().toString().padStart("0", 2),
  minute: (tag, content) => new Date().getMinutes().toString().padStart("0", 2),
  minutes: (tag, content) => new Date().getMinutes().toString().padStart("0", 2),
  second: (tag, content) => new Date().getSeconds().toString().padStart("0", 2),
  seconds: (tag, content) => new Date().getSeconds().toString().padStart("0", 2),
  br: (tag, content) => "\n"
};
function replaceTags(text, tags) {
  if (!text)
    text = "";
  text = fn$3(text);
  let oneLineText = text.replace(/\r\n/g, "|rn|");
  oneLineText = oneLineText.replace(/\n/g, "|n|");
  oneLineText = oneLineText.replace(/\r/g, "|r|");
  Object.keys(tags).forEach((tagName) => {
    const reg = new RegExp(`<s*${tagName}[^>]*>((.*?))<\\s*/\\s*${tagName}>`, "g");
    const tagsArray = oneLineText.match(reg);
    const singleReg = new RegExp(`\\s?<${tagName}\\s?/>\\s?`, "g");
    const singleTagsArray = oneLineText.match(singleReg);
    if (tagsArray) {
      for (let i2 = 0; i2 < tagsArray.length; i2++) {
        const t = tagsArray[i2];
        const tagArgs = t.match(`<\\s*${tagName}[^>]*>((.*?))<\\s*/\\s*${tagName}>`);
        if (!tagArgs)
          continue;
        const tagToReplace = tagArgs[0];
        const tagContent = tagArgs[1];
        oneLineText = oneLineText.replace(tagToReplace, tags[tagName](tagName, tagContent));
      }
    }
    if (singleTagsArray) {
      for (let i2 = 0; i2 < singleTagsArray.length; i2++) {
        const t = singleTagsArray[i2];
        const tagArgs = t.match(`\\s?<${tagName}\\s?/>\\s?`);
        if (!tagArgs)
          continue;
        const tagToReplace = tagArgs[0];
        const tagContent = "";
        oneLineText = oneLineText.replace(tagToReplace, tags[tagName](tagName, tagContent));
      }
    }
  });
  oneLineText = oneLineText.replace(/\|rn\|/g, "\r\n");
  oneLineText = oneLineText.replace(/\|n\|/g, "\n");
  oneLineText = oneLineText.replace(/\|r\|/g, "\r");
  return oneLineText;
}
function parseHtml(message) {
  let isArray2 = false;
  if (Array.isArray(message)) {
    isArray2 = true;
  } else {
    message = [message];
  }
  message = message.map((m) => {
    return replaceTags(m, tagsMap);
  });
  if (isArray2)
    return message;
  return message[0];
}
function parseSingleTypeString(typeString) {
  let ofStr = "", typeStr = typeString;
  const ofPartsString = typeString.match(/<(.+)>$/gm);
  if (ofPartsString && ofPartsString.length) {
    ofStr = ofPartsString[0].replace("<", "").replace(">", "");
  }
  if (ofStr !== "") {
    typeStr = typeStr.replace(`<${ofStr}>`, "");
  }
  let ofTypes = ofStr !== "" ? [ofStr.toLowerCase()] : void 0;
  if (ofStr !== void 0 && ofStr.includes("|")) {
    ofTypes = ofStr.split("|").map((t) => t.trim().toLowerCase());
  }
  return {
    type: typeStr,
    of: ofTypes
  };
}
const fn$1 = function parseTypeString(typeString) {
  typeString = typeString.toLowerCase().trim();
  typeString = typeString.split("|").map((part) => {
    part = part.trim().replace(/^([a-zA-Z0-9-_]+)\[\]$/, "array<$1>");
    return part;
  }).join("|");
  typeString = typeString.split("|").map((part) => {
    part = part.trim().replace(/^([a-zA-Z0-9-_]+)\{\}$/, "object<$1>");
    return part;
  }).join("|");
  let types = [], inGroup = false, currentStr = "";
  for (let i2 = 0; i2 < typeString.length; i2++) {
    const char = typeString[i2];
    if (char === "<") {
      inGroup = true;
      currentStr += char;
    } else if (char === ">") {
      inGroup = false;
      currentStr += char;
    } else if (char === "|") {
      if (inGroup === false) {
        types.push(currentStr);
        currentStr = "";
      } else {
        currentStr += char;
      }
    } else {
      currentStr += char;
    }
  }
  types.push(currentStr);
  const finalTypes = [];
  types.forEach((type) => {
    finalTypes.push(parseSingleTypeString(type));
  });
  const res = {
    raw: typeString,
    types: finalTypes
  };
  return res;
};
var __isNode = () => {
  return typeof process !== "undefined" && process.release && process.release.name === "node";
};
class STypeResult {
  constructor(data) {
    this._data = data;
  }
  get typeString() {
    return this._data.typeString;
  }
  get value() {
    return this._data.value;
  }
  get received() {
    return this._data.received;
  }
  get expected() {
    return this._data.expected;
  }
  get issues() {
    return this._data.issues;
  }
  get settings() {
    return this._data.settings;
  }
  hasIssues() {
    if (this._data)
      return true;
    return false;
  }
  toString() {
    if (__isNode()) {
      return this.toConsole();
    } else {
      return `The method "toHtml" has not being integrated for now...`;
    }
  }
  toConsole() {
    const headerArray = [
      `<underline><magenta>${this._data.settings.name}</magenta></underline>`,
      "",
      "<underline>Received value</underline>",
      "",
      `${fn$3(this._data.value, {
        beautify: true
      })}`,
      ""
    ];
    const issuesArray = [];
    Object.keys(this._data.issues).forEach((ruleId) => {
      const issueObj = this._data.issues[ruleId];
      const message = [];
      if (issueObj.expected.type) {
        message.push(`- Expected "<yellow>${issueObj.expected.type}</yellow>"`);
      }
      if (issueObj.received.type) {
        message.push(`- Received "<red>${issueObj.received.type}</red>"`);
      }
      if (issueObj.message) {
        message.push(["<underline>Details:</underline>", issueObj.message].join("\n"));
      }
      issuesArray.push(message.join("\n"));
    });
    const settingsArray = [
      "",
      `<underline>Settings</underline>`,
      "",
      `${fn$3(this._data.settings, {
        beautify: true
      })}`
    ];
    return parseHtml(`
${headerArray.join("\n")}
${issuesArray.join("\n")}
${this.settings.verbose ? settingsArray.join("\n") : ""}
    `).trim();
  }
}
class SType {
  constructor(typeString, settings = {}) {
    this.typeString = typeString;
    typeString = typeString.toLowerCase().trim();
    if (this.constructor._instanciatedTypes[typeString] !== void 0)
      return this.constructor._instanciatedTypes[typeString];
    this.types = fn$1(typeString).types;
    this._settings = __deepMerge({
      id: this.constructor.name,
      name: this.constructor.name,
      customTypes: true,
      interfaces: true
    }, settings);
    this.constructor._instanciatedTypes[typeString] = this;
  }
  static registerType(type) {
    if (type.id === void 0 || typeof type.id !== "string") {
      throw new Error(`Sorry but you try to register a type that does not fit the ISTypeDescriptor interface...`);
    }
    this._registeredTypes[type.id] = type;
  }
  is(value, settings = {}) {
    const res = this.check(value, settings);
    if (res === true)
      return true;
    else if (res instanceof STypeResult)
      return !res.hasIssues();
    return true;
  }
  check(value, settings = {}) {
    settings = __deepMerge(this._settings, settings);
    const issues = {};
    for (let i2 = 0; i2 < this.types.length; i2++) {
      const typeObj = this.types[i2], typeId = typeObj.type;
      const res2 = this._isType(value, typeId, settings);
      if (res2 === true) {
        if (typeObj.of === void 0)
          return true;
        const typeOf$1 = typeOf(value);
        if (typeOf$1 !== "Array" && typeOf$1 !== "Object" && typeOf$1 !== "Map") {
          throw new Error(`Sorry but you have specified a type string "<yellow>${this.typeString}</yellow>" with some "<...>" definition on a type "<cyan>${typeOf$1}</cyan>" that does not support "child" value(s)...`);
        }
        const loopOn = typeOf$1 === "Object" ? Object.keys(value) : Array.from(value.keys());
        if (!loopOn.length)
          return true;
        for (let k = 0; k < loopOn.length; k++) {
          for (let j2 = 0; j2 < typeObj.of.length; j2++) {
            const type = typeObj.of[j2];
            const idx = loopOn[k];
            const v = typeOf$1 === "Map" ? value.get(idx) : value[idx];
            const ofRes = this._isType(v, type, settings);
            if (ofRes !== true) {
              issues[typeObj.type] = {
                expected: {
                  type: typeObj.type
                },
                received: {
                  type: typeOf(v),
                  value: v
                }
              };
            } else {
              return true;
            }
          }
        }
      } else {
        const issueObj = {
          expected: {
            type: typeObj.type
          },
          received: {
            type: typeOf(value),
            value
          }
        };
        if (res2 !== void 0 && res2 !== null && res2 !== false && res2.toString && typeof res2.toString === "function") {
          issueObj.message = res2.toString();
        }
        issues[typeObj.type] = issueObj;
      }
    }
    const res = new STypeResult({
      typeString: this.typeString,
      value,
      expected: {
        type: this.typeString
      },
      received: {
        type: typeOf(value)
      },
      issues,
      settings
    });
    return res;
  }
  _isType(value, type, settings = {}) {
    settings = __deepMerge(this._settings, settings);
    if (this.constructor._registeredTypes[type.toLowerCase()] === void 0) {
      if (settings.interfaces === true) {
        const availableInterfaceTypes = SInterface.getAvailableTypes();
        if (availableInterfaceTypes[type] !== void 0) {
          const res = availableInterfaceTypes[type].apply(value, {});
          return res;
        }
      }
      if (settings.customTypes === true) {
        const typeOf$1 = typeOf(value).toLowerCase();
        const extendsStack = Object.keys(fn$4(value)).map((s) => s.toLowerCase());
        if (type === typeOf$1 || extendsStack.indexOf(type) !== -1)
          return true;
      }
      throw new Error(`Sorry but you try to validate a value with the type "<yellow>${type}</yellow>" but this type is not registered...`);
    }
    return this.constructor._registeredTypes[type.toLowerCase()].is(value);
  }
  cast(value, params, settings) {
    settings = __deepMerge(this._settings, settings);
    const verboseObj = {
      value,
      issues: {},
      settings,
      toString() {
        const strAr = Object.entries(this.issues);
        return strAr.map((l) => l[1]).join("\n");
      }
    };
    if (this.is(value)) {
      return value;
    }
    for (let i2 = 0; i2 < this.types.length; i2++) {
      const typeObj = this.types[i2], typeId = typeObj.type;
      const descriptorObj = this.constructor._registeredTypes[typeId.toLowerCase()];
      if (descriptorObj === void 0) {
        continue;
      }
      if (descriptorObj.cast === void 0)
        continue;
      let castedValue;
      castedValue = descriptorObj.cast(value, params);
      if (castedValue instanceof Error) {
        verboseObj.issues[typeId] = castedValue.toString();
        continue;
      }
      if (typeObj.of !== void 0 && this.canHaveChilds(castedValue) === false) {
        const issueStr = `Sorry but the passed type "<yellow>${typeId}</yellow>" has some child(s) dependencies "<green>${typeObj.of.join("|")}</green>" but this type can not have child(s)`;
        throw new Error(parseHtml(issueStr));
      } else if (typeObj.of !== void 0) {
        const sTypeInstance = new SType(typeObj.of.join("|"));
        castedValue = fn$2(castedValue, ({ value: value2 }) => {
          return sTypeInstance.cast(value2, params, settings);
        });
      }
      if (castedValue === null && descriptorObj.id === "null")
        return null;
      if (castedValue === void 0 && descriptorObj.id === "undefined")
        return void 0;
      if (castedValue !== null && castedValue !== void 0)
        return castedValue;
      verboseObj.issues[typeId] = `Something goes wrong but no details are available... Sorry`;
    }
    const stack = [
      `Sorry but the value of type "<cyan>${typeOf(value)}</cyan>" passed to be casted in type "<yellow>${this.typeString}</yellow>" can not be casted correctly. Here's why:
`
    ];
    Object.keys(verboseObj.issues).forEach((descriptorId) => {
      stack.push(`- <red>${descriptorId}</red>: ${verboseObj.issues[descriptorId]}`);
    });
    throw new Error(parseHtml(stack.join("\n")));
  }
  canHaveChilds(value) {
    const type = typeOf(value);
    return type === "Array" || type === "Object" || type === "Map";
  }
  get name() {
    return this._settings.name;
  }
  get id() {
    return this._settings.id;
  }
}
SType._instanciatedTypes = {};
SType._registeredTypes = {};
function isString(value) {
  return typeof value === "string" || value instanceof String;
}
const descriptor$g = {
  name: "String",
  id: "string",
  is: (value) => isString(value),
  cast: (value) => fn$3(value, {
    beautify: true
  })
};
const descriptor$f = {
  name: "Map",
  id: "map",
  is: (value) => isMap(value),
  cast: (value) => {
    if (isMap(value))
      return value;
    const map = new Map();
    map.set("value", value);
    return map;
  }
};
const descriptor$e = {
  name: "Object",
  id: "object",
  is: (value) => isObject$1(value),
  cast: (value) => {
    if (isObject$1(value))
      return value;
    return {
      value
    };
  }
};
const descriptor$d = {
  name: "Array",
  id: "array",
  is: (value) => {
    return Array.isArray(value);
  },
  cast: (value, params = {}) => {
    if (!value)
      return [];
    if (params.splitChars && Array.isArray(params.splitChars)) {
      value = value.split(new RegExp(`(${params.splitChars.join("|")})`, "gm")).filter((l) => l.trim() !== "" && params.splitChars.indexOf(l) === -1);
    }
    if (Array.isArray(value))
      return value;
    return [value];
  }
};
const descriptor$c = {
  name: "Integer",
  id: "integer",
  is: (value) => Number.isInteger(value),
  cast: (value) => {
    if (typeof value !== "string" && typeof value !== "number") {
      return new Error(`Sorry but only strings and numbers can be casted to integers... Passed value: ${value}`);
    }
    const res = parseInt(value);
    if (isNaN(res))
      return new Error(`Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Integer</green> does not work...`);
    return res;
  }
};
const descriptor$b = {
  name: "Number",
  id: "number",
  is: (value) => typeof value === "number",
  cast: (value) => {
    if (typeof value !== "string") {
      return new Error(`Sorry but only strings can be casted to numbers...`);
    }
    const res = parseFloat(value);
    if (isNaN(res))
      return new Error(`Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Number</green> does not work...`);
    return res;
  }
};
const descriptor$a = {
  name: "Boolean",
  id: "boolean",
  is: (value) => typeof value === "boolean",
  cast: (value, params = {}) => {
    if (value !== false && params && params.nullishAsTrue && !value) {
      return true;
    }
    if (typeof value === "boolean")
      return value;
    if (value === null || value === void 0)
      return false;
    if (typeof value === "number") {
      if (value > 0)
        return true;
      return false;
    }
    if (typeof value === "string") {
      return value.length > 0 ? true : false;
    }
    if (Array.isArray(value)) {
      if (value.length > 0)
        return true;
      return false;
    }
    if (typeof value === "object") {
      return Object.keys(value).length > 0 ? true : false;
    }
    return new Error([
      `Sorry but for now only these types can be casted to boolean:`,
      "- <yellow>null</yellow>: Will be casted as <red>false</red>",
      "- <yellow>undefined</yellow>: Will be casted as <red>false</red>",
      "- <yellow>Number</yellow>: Will be casted as <green>true</green> when greater than 0, <red>false</red> otherwise",
      "- <yellow>String</yellow>: Will be casted as <green>true</green> when longer than 0 characters, <red>false</red> otherwise",
      "- <yellow>Array</yellow>: Will be casted as <green>true</green> when having more than 0 items, <red>false</red> otherwise",
      "- <yellow>Object</yellow>: Will be casted as <green>true</green> when have more than 0 properties, <red>false</red> otherwise"
    ].join("\n"));
  }
};
const descriptor$9 = {
  name: "Undefined",
  id: "undefined",
  is: (value) => value === void 0,
  cast: (value) => {
    return void 0;
  }
};
const descriptor$8 = {
  name: "Null",
  id: "null",
  is: (value) => value === null,
  cast: (value) => {
    return null;
  }
};
const descriptor$7 = {
  name: "Symbol",
  id: "symbol",
  is: (value) => typeof value === "symbol",
  cast: (value) => {
    if (typeof value === "symbol")
      return value;
    return Symbol(value);
  }
};
const descriptor$6 = {
  name: "Bigint",
  id: "bigint",
  is: (value) => typeof value === "bigint",
  cast: (value) => {
    if (typeof value === "bigint")
      return value;
    if (typeof value !== "string" && typeof value !== "number") {
      return new Error(`Sorry but only <yellow>String</yellow> and <yellow>Number</yellow> can be casted to <green>Bigint</green>`);
    }
    let res;
    try {
      res = BigInt(value);
    } catch (e) {
      res = new Error(`It seem's that the passed value "<yellow>${value}</yellow>" can not be casted to a <green>BigInt</green>`);
    }
    return res;
  }
};
const descriptor$5 = {
  name: "Date",
  id: "date",
  is: (value) => value instanceof Date,
  cast: (value) => {
    if (typeof value === "string") {
      return new Date(value);
    }
    if (typeof value === "number") {
      return new Date(Math.round(value));
    }
    if (plainObject(value)) {
      const now = new Date();
      let year = now.getFullYear(), month = 0, day = 1, hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
      if (value.year && typeof value.year === "number") {
        year = value.year;
      }
      if (value.month && typeof value.month === "number") {
        month = value.month;
      }
      if (value.day && typeof value.day === "number") {
        day = value.day;
      }
      if (value.hours && typeof value.hours === "number") {
        hours = value.hours;
      }
      if (value.minutes && typeof value.minutes === "number") {
        minutes = value.minutes;
      }
      if (value.seconds && typeof value.seconds === "number") {
        seconds = value.seconds;
      }
      if (value.milliseconds && typeof value.milliseconds === "number") {
        milliseconds = value.milliseconds;
      }
      return new Date(year, month, day, hours, minutes, seconds, milliseconds);
    }
    return new Error(`Sorry but for now only <yellow>String</yellow>, <yellow>Number</yellow> and <yellow>Object</yellow> (with properties: year, month, day?, hours?, minutes?, seconds? and milliseconds?) are castable to Date`);
  }
};
const descriptor$4 = {
  name: "Function",
  id: "function",
  is: (value) => typeof value === "function",
  cast: (value) => {
    return new Error(`Sorry but nothing is castable to a Function`);
  }
};
const descriptor$3 = {
  name: "WeakMap",
  id: "weakmap",
  is: (value) => value instanceof WeakMap,
  cast: (value) => {
    return new Error(`Sorry but nothing can be casted to a WeakMap for now`);
  }
};
const descriptor$2 = {
  name: "WeakSet",
  id: "weakset",
  is: (value) => value instanceof WeakSet,
  cast: (value) => {
    return new Error(`Sorry but nothing can be casted to a WeakSet for now`);
  }
};
const descriptor$1 = {
  name: "Set",
  id: "set",
  is: (value) => value instanceof Set,
  cast: (value) => {
    if (value instanceof Set)
      return value;
    const set = new Set();
    set.add(value);
    return set;
  }
};
const descriptor = {
  name: "Class",
  id: "class",
  is: (value) => cls(value),
  cast: (value) => {
    return new Error(`Sorry but nothing is castable to a Class`);
  }
};
SType.registerType(descriptor$g);
SType.registerType(descriptor$f);
SType.registerType(descriptor$e);
SType.registerType(descriptor$d);
SType.registerType(descriptor$c);
SType.registerType(descriptor$b);
SType.registerType(descriptor$a);
SType.registerType(descriptor$9);
SType.registerType(descriptor$8);
SType.registerType(descriptor$7);
SType.registerType(descriptor$6);
SType.registerType(descriptor$5);
SType.registerType(descriptor$4);
SType.registerType(descriptor$3);
SType.registerType(descriptor$2);
SType.registerType(descriptor$1);
SType.registerType(descriptor);
function ofType(value, typeString, settings = {}) {
  settings = Object.assign({ verbose: false }, settings);
  const typeInstance = new SType(typeString, settings);
  const res = typeInstance.is(value);
  return res;
}
class SDescriptorResult extends SClass {
  constructor(descriptor2, value, descriptorSettings) {
    super({});
    this._issues = {};
    this._descriptor = descriptor2;
    this._descriptorSettings = descriptorSettings;
    try {
      this._originalValue = clone(value, { deep: true });
    } catch (e) {
      this._originalValue = value;
    }
    this.value = value;
  }
  hasIssues() {
    return Object.keys(this._issues).length >= 1;
  }
  add(ruleResult) {
    if (!ruleResult.__ruleObj.id)
      return;
    this._issues[ruleResult.__ruleObj.id] = ruleResult;
  }
  toString() {
    if (__isNode()) {
      return this.toConsole();
    } else {
      return this.toConsole();
    }
  }
  toConsole() {
    const headerArray = [
      `<underline><magenta>${this._descriptor.metas.name}</magenta></underline>`,
      "",
      `${fn$3(this.value, {
        beautify: true
      })}`,
      ""
    ];
    const issuesArray = [];
    Object.keys(this._issues).forEach((ruleId) => {
      const ruleResult = this._issues[ruleId];
      let message = "";
      if (ruleResult.__error && ruleResult.__error instanceof Error) {
        message = ruleResult.__error.message;
      } else if (ruleResult.__ruleObj.message !== void 0 && typeof ruleResult.__ruleObj.message === "function") {
        message = ruleResult.__ruleObj.message(ruleResult);
      } else if (ruleResult.__ruleObj.message !== void 0 && typeof ruleResult.__ruleObj.message === "string") {
        message = ruleResult.__ruleObj.message;
      }
      issuesArray.push(`-${typeof ruleResult.__propName === "string" ? ` [<magenta>${ruleResult.__propName}</magenta>]` : ""} <red>${ruleId}</red>: ${message}`);
    });
    const settingsArray = [
      "",
      `<underline>Settings</underline>`,
      "",
      `${fn$3(this._descriptorSettings, {
        beautify: true
      })}`
    ];
    return parseHtml(`
${headerArray.join("\n")}
${issuesArray.join("\n")}
${settingsArray.join("\n")}
    `).trim();
  }
}
/*!
* is-extglob <https://github.com/jonschlinkert/is-extglob>
*
* Copyright (c) 2014-2016, Jon Schlinkert.
* Licensed under the MIT License.
*/
var isExtglob$1 = function isExtglob2(str) {
  if (typeof str !== "string" || str === "") {
    return false;
  }
  var match2;
  while (match2 = /(\\).|([@?!+*]\(.*\))/g.exec(str)) {
    if (match2[2])
      return true;
    str = str.slice(match2.index + match2[0].length);
  }
  return false;
};
/*!
* is-glob <https://github.com/jonschlinkert/is-glob>
*
* Copyright (c) 2014-2017, Jon Schlinkert.
* Released under the MIT License.
*/
var isExtglob = isExtglob$1;
var chars = { "{": "}", "(": ")", "[": "]" };
var strictCheck = function(str) {
  if (str[0] === "!") {
    return true;
  }
  var index = 0;
  var pipeIndex = -2;
  var closeSquareIndex = -2;
  var closeCurlyIndex = -2;
  var closeParenIndex = -2;
  var backSlashIndex = -2;
  while (index < str.length) {
    if (str[index] === "*") {
      return true;
    }
    if (str[index + 1] === "?" && /[\].+)]/.test(str[index])) {
      return true;
    }
    if (closeSquareIndex !== -1 && str[index] === "[" && str[index + 1] !== "]") {
      if (closeSquareIndex < index) {
        closeSquareIndex = str.indexOf("]", index);
      }
      if (closeSquareIndex > index) {
        if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
          return true;
        }
        backSlashIndex = str.indexOf("\\", index);
        if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
          return true;
        }
      }
    }
    if (closeCurlyIndex !== -1 && str[index] === "{" && str[index + 1] !== "}") {
      closeCurlyIndex = str.indexOf("}", index);
      if (closeCurlyIndex > index) {
        backSlashIndex = str.indexOf("\\", index);
        if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
          return true;
        }
      }
    }
    if (closeParenIndex !== -1 && str[index] === "(" && str[index + 1] === "?" && /[:!=]/.test(str[index + 2]) && str[index + 3] !== ")") {
      closeParenIndex = str.indexOf(")", index);
      if (closeParenIndex > index) {
        backSlashIndex = str.indexOf("\\", index);
        if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
          return true;
        }
      }
    }
    if (pipeIndex !== -1 && str[index] === "(" && str[index + 1] !== "|") {
      if (pipeIndex < index) {
        pipeIndex = str.indexOf("|", index);
      }
      if (pipeIndex !== -1 && str[pipeIndex + 1] !== ")") {
        closeParenIndex = str.indexOf(")", pipeIndex);
        if (closeParenIndex > pipeIndex) {
          backSlashIndex = str.indexOf("\\", pipeIndex);
          if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
            return true;
          }
        }
      }
    }
    if (str[index] === "\\") {
      var open = str[index + 1];
      index += 2;
      var close = chars[open];
      if (close) {
        var n = str.indexOf(close, index);
        if (n !== -1) {
          index = n + 1;
        }
      }
      if (str[index] === "!") {
        return true;
      }
    } else {
      index++;
    }
  }
  return false;
};
var relaxedCheck = function(str) {
  if (str[0] === "!") {
    return true;
  }
  var index = 0;
  while (index < str.length) {
    if (/[*?{}()[\]]/.test(str[index])) {
      return true;
    }
    if (str[index] === "\\") {
      var open = str[index + 1];
      index += 2;
      var close = chars[open];
      if (close) {
        var n = str.indexOf(close, index);
        if (n !== -1) {
          index = n + 1;
        }
      }
      if (str[index] === "!") {
        return true;
      }
    } else {
      index++;
    }
  }
  return false;
};
var isGlob = function isGlob2(str, options) {
  if (typeof str !== "string" || str === "") {
    return false;
  }
  if (isExtglob(str)) {
    return true;
  }
  var check = strictCheck;
  if (options && options.strict === false) {
    check = relaxedCheck;
  }
  return check(str);
};
var __isGlob = (string2) => {
  return isGlob(string2);
};
class SDescriptor extends SClass {
  constructor(settings) {
    super(__deepMerge({
      descriptor: {
        rules: {},
        type: "Object",
        arrayAsValue: false,
        throwOnMissingRule: false,
        defaults: true
      }
    }, settings !== null && settings !== void 0 ? settings : {}));
  }
  static registerRule(rule) {
    if (rule.id === void 0 || typeof rule.id !== "string") {
      throw new Error(`Sorry but you try to register a rule that does not fit the ISDescriptionRule interface...`);
    }
    this._registeredRules[rule.id] = rule;
  }
  get descriptorSettings() {
    return this._settings.descriptor;
  }
  apply(value, settings) {
    const set = __deepMerge(this.descriptorSettings, settings || {});
    if (value === void 0 || value === null)
      value = {};
    const valuesObjToProcess = {}, finalValuesObj = {};
    this._descriptorResult = new SDescriptorResult(this, finalValuesObj, Object.assign({}, set));
    const rules = set.rules;
    if (!ofType(value, set.type)) {
      throw new Error(`Sorry but this descriptor "<yellow>${this.metas.name}</yellow>" does not accept values of type "<cyan>${typeOf(value)}</cyan>" but only "<green>${set.type}</green>"...`);
    }
    if (Array.isArray(value) && !set.arrayAsValue) {
      throw new Error(`Sorry but the support for arrays like values has not been integrated for not...`);
    } else if (typeof value === "object" && value !== null && value !== void 0) {
      Object.keys(rules).forEach((propName) => {
        if (__isGlob(propName) && value)
          ;
        else {
          valuesObjToProcess[propName] = get(value, propName);
        }
      });
      Object.keys(valuesObjToProcess).forEach((propName) => {
        const ruleObj2 = rules[propName];
        if (valuesObjToProcess[propName] === void 0 && set.defaults && ruleObj2.default !== void 0) {
          valuesObjToProcess[propName] = ruleObj2.default;
        }
        if (ruleObj2.interface !== void 0) {
          const interfaceValue = valuesObjToProcess[propName];
          valuesObjToProcess[propName] = ruleObj2.interface.apply(interfaceValue || {}, {});
        }
        const validationResult = this._validate(valuesObjToProcess[propName], propName, ruleObj2, set);
        if (validationResult !== void 0 && validationResult !== null) {
          __set(finalValuesObj, propName, validationResult);
        }
      });
    } else {
      console.warn(value);
      throw new Error(`You can apply an <yellow>SDescriptor</yellow> only on an Object like value...`);
    }
    if (this._descriptorResult.hasIssues()) {
      throw new Error(this._descriptorResult.toString());
    }
    return this._descriptorResult;
  }
  _validate(value, propName, rulesObj, settings) {
    if (rulesObj === void 0)
      return value;
    if (rulesObj.required === void 0 || rulesObj.required === false) {
      if (value === void 0 || value === null)
        return value;
    }
    let rulesNamesInOrder = Object.keys(rulesObj).filter((l) => l !== "default");
    rulesNamesInOrder = rulesNamesInOrder.sort((a, b) => {
      const objA = this.constructor._registeredRules[a];
      const objB = this.constructor._registeredRules[b];
      if (!objA)
        return -1;
      if (!objB)
        return 1;
      if (objA.priority === void 0)
        objA.priority = 9999999999;
      if (objB.priority === void 0)
        objB.priority = 9999999999;
      return objA.priotity - objB.priority;
    }).reverse();
    let resultValue = value;
    rulesNamesInOrder.forEach((ruleName) => {
      const ruleValue = rulesObj[ruleName];
      if (this.constructor._registeredRules[ruleName] === void 0) {
        if (settings.throwOnMissingRule) {
          throw new Error(`Sorry but you try to validate a value using the "<yellow>${ruleName}</yellow>" rule but this rule is not registered. Here's the available rules:
              - ${Object.keys(this.constructor._registeredRules).join("\n- ")}`);
        }
      } else {
        const ruleObj2 = this.constructor._registeredRules[ruleName];
        const params = ruleObj2.processParams !== void 0 ? ruleObj2.processParams(ruleValue) : ruleValue;
        const ruleSettings = ruleObj2.settings !== void 0 ? ruleObj2.settings : {};
        if (ruleSettings.mapOnArray && Array.isArray(resultValue)) {
          let newResultValue = [];
          resultValue.forEach((v) => {
            const processedValue = this._processRule(v, ruleObj2, propName, params, ruleSettings, settings);
            if (Array.isArray(processedValue)) {
              newResultValue = [
                ...newResultValue,
                ...processedValue
              ];
            } else {
              newResultValue.push(processedValue);
            }
          });
          resultValue = newResultValue;
        } else {
          const processedValue = this._processRule(resultValue, ruleObj2, propName, params, ruleSettings, settings);
          resultValue = processedValue;
        }
      }
    });
    return resultValue;
  }
  _processRule(value, ruleObj2, propName, params, ruleSettings, settings) {
    const ruleResult = ruleObj2.apply(value, params, ruleSettings, Object.assign(Object.assign({}, settings), { propName, name: `${settings.name}.${propName}` }));
    if (params && params.type && params.type.toLowerCase() === "boolean" && ruleResult === true) {
      return true;
    }
    if (ruleResult instanceof Error) {
      const obj2 = {
        __error: ruleResult,
        __ruleObj: ruleObj2,
        __propName: propName
      };
      if (this._descriptorResult) {
        this._descriptorResult.add(obj2);
        throw new Error(this._descriptorResult.toString());
      }
    } else {
      return ruleResult;
    }
  }
}
SDescriptor._registeredRules = {};
SDescriptor.rules = {};
SDescriptor.type = "Object";
const ruleObj$3 = {
  priority: 1,
  name: "Required",
  id: "required",
  settings: {
    when: [void 0, null]
  },
  message: "This value is required",
  processParams: (params) => {
    return { value: params };
  },
  apply: (value, params, ruleSettings, settings) => {
    if (params.value === true) {
      if (ruleSettings.when.indexOf(value) !== -1) {
        return new Error("This property is <yellow>required</yellow>");
      }
    }
    return value;
  }
};
const ruleObj$2 = {
  prority: 10,
  name: "Type",
  id: "type",
  settings: {},
  processParams: (params) => {
    var _a2, _b2;
    if (!(params === null || params === void 0 ? void 0 : params.type) && typeof params !== "string") {
      throw new Error(`<yellow>[sugar.shared.type.descriptors.typeRule]</yellow> Sorry but to use the <magenta>type</magenta> descriptor rule you need to specify a type string either directly under the "type" property, or in an object under the "type.type" property...`);
    }
    return Object.assign(Object.assign({}, typeof params !== "string" ? params : {}), { type: (_a2 = params.type) !== null && _a2 !== void 0 ? _a2 : params, cast: (_b2 = params.cast) !== null && _b2 !== void 0 ? _b2 : true });
  },
  apply: (value, params, ruleSettings, settings) => {
    const type = new SType(params.type, {
      metas: {
        id: settings.id
      }
    });
    if (params.cast && !type.is(value)) {
      value = type.cast(value, params);
    }
    if (!type.is(value)) {
      return new Error(`The value must be of type "<yellow>${params.type}</yellow>" but you've passed a value of type "<cyan>${typeof value}</cyan>"`);
    }
    return value;
  }
};
const ruleObj$1 = {
  name: "Min",
  id: "min",
  settings: {},
  accept: "Number",
  message: (resultObj) => {
    return `This value has to be minimum "<yellow>${resultObj.min}</yellow>". Received "<red>${resultObj.received}</red>"`;
  },
  processParams: (params) => {
    return { value: params };
  },
  apply: (value, params, ruleSettings, settings) => {
    if (value < params.value) {
      return new Error(`<red>[minRule]</red> Sorry but the passed value "<yellow>${value}</yellow>" must be greater or equal at <cyan>${params.value}</cyan>`);
    }
    return value;
  }
};
const ruleObj = {
  name: "Max",
  id: "max",
  settings: {},
  accept: "Number",
  message: (resultObj) => {
    return `This value has to be maximum "<yellow>${resultObj.max}</yellow>". Received "<red>${resultObj.received}</red>"`;
  },
  processParams: (params) => {
    return { value: params };
  },
  apply: (value, params, ruleSettings, settings) => {
    if (value > params.value) {
      return new Error(`<red>[minRule]</red> Sorry but the passed value "<yellow>${value}</yellow>" must be lower or equal at <cyan>${params.value}</cyan>`);
    }
    return value;
  }
};
SDescriptor.registerRule(ruleObj$3);
SDescriptor.registerRule(ruleObj$2);
SDescriptor.registerRule(ruleObj$1);
SDescriptor.registerRule(ruleObj);
function parseArgs(string2, settings = {}) {
  settings = __deepMerge({
    throw: true,
    defaultObj: {},
    cast: true,
    valueQuote: void 0
  }, settings);
  string2 = string2.trim();
  string2 = string2.replace(/(["'`])--/gm, "$1--\xA7 --");
  let valueQuote = settings.valueQuote;
  if (!valueQuote) {
    for (let i2 = 0; i2 < string2.length; i2++) {
      const char = string2[i2];
      if (char === '"' || char === "`" || char === "'") {
        valueQuote = char;
        break;
      }
    }
    if (!valueQuote)
      valueQuote = '"';
  }
  let stringArray = [];
  let isFunctionStyle = false;
  if (string2.match(/^\(/) && string2.match(/\)$/)) {
    isFunctionStyle = true;
    string2 = string2.slice(1, -1);
    let currentStr = "";
    let parenthesisCount = 0;
    let quotesCount = 0;
    for (let i2 = 0; i2 < string2.length; i2++) {
      const char = string2[i2];
      const previousChar = string2[i2 - 1] || string2[0];
      if (char === valueQuote && previousChar !== "\\" && !quotesCount) {
        quotesCount++;
      } else if (char === valueQuote && previousChar !== "\\" && quotesCount) {
        quotesCount--;
      }
      if (!quotesCount && char === "(") {
        parenthesisCount++;
      } else if (!quotesCount && char === ")") {
        parenthesisCount--;
      }
      if (char === ",") {
        if (quotesCount || parenthesisCount) {
          currentStr += char;
        } else {
          stringArray.push(currentStr.trim());
          currentStr = "";
        }
      } else {
        currentStr += char;
      }
    }
    if (parenthesisCount)
      currentStr += ")".repeat(parenthesisCount);
    stringArray.push(currentStr.trim());
  } else {
    let currentStr = "";
    let quotesCount = false;
    for (let i2 = 0; i2 < string2.length; i2++) {
      const char = string2[i2];
      const previousChar = string2[i2 - 1] || string2[0];
      if (char === valueQuote && previousChar !== "\\" && !quotesCount) {
        quotesCount = true;
      } else if (char === valueQuote && previousChar !== "\\" && quotesCount) {
        quotesCount = false;
      }
      if (char === " ") {
        if (quotesCount) {
          currentStr += char;
        } else {
          stringArray.push(currentStr.trim());
          currentStr = "";
        }
      } else {
        currentStr += char;
      }
    }
    stringArray.push(currentStr.trim());
  }
  stringArray = stringArray.map((item) => unquote(item));
  const argsObj = {};
  let currentArgName = void 0;
  let currentValue;
  stringArray = stringArray.forEach((part, i2) => {
    if (!isFunctionStyle && !part.includes(" ") && (part.slice(0, 2) === "--" || part.slice(0, 1) === "-")) {
      if (currentValue === void 0 && currentArgName !== -1 && currentArgName && argsObj[currentArgName] === void 0) {
        argsObj[currentArgName] = true;
      }
      currentArgName = part.replace(/^[-]{1,2}/, "");
      if (argsObj[currentArgName] === void 0) {
        argsObj[currentArgName] = true;
      }
    } else {
      let value;
      if (part && typeof part === "string") {
        value = part.replace(/^\\\\\\`/, "").replace(/\\\\\\`$/, "").replace(/^'/, "").replace(/'$/, "").replace(/^"/, "").replace(/"$/, "");
        if (value.match(/^\$[a-zA-Z0-9-_]+\s?:.*/)) {
          const parts = part.split(":");
          currentArgName = parts[0].trim().replace(/^\$/, "");
          value = parts.slice(1).join(":").trim();
        }
      }
      currentValue = __parse(value);
      if (typeof currentValue === "string") {
        currentValue = currentValue.replace("--\xA7 ", "");
      }
      if (currentArgName !== void 0) {
        if (argsObj[currentArgName] !== void 0 && argsObj[currentArgName] !== true) {
          if (!Array.isArray(argsObj[currentArgName])) {
            argsObj[currentArgName] = [argsObj[currentArgName]];
          }
          argsObj[currentArgName].push(currentValue);
        } else {
          argsObj[currentArgName] = currentValue;
        }
        currentValue = void 0;
        currentArgName = void 0;
      } else {
        argsObj[i2] = currentValue;
      }
    }
  });
  Object.keys(argsObj).forEach((key) => {
    const value = argsObj[key];
    if (value === void 0)
      delete argsObj[key];
  });
  return argsObj;
}
function getAvailableInterfaceTypes() {
  if (global !== void 0)
    return global._registeredInterfacesTypes || {};
  else if (window !== void 0)
    return window._registeredInterfacesTypes || {};
  else
    return {};
}
if (__isNode())
  global._registeredInterfacesTypes = {};
else
  window._registeredInterfacesTypes = {};
class SInterface extends SClass {
  constructor(settings) {
    super(__deepMerge({
      interface: {
        stripUnkown: false
      }
    }, settings !== null && settings !== void 0 ? settings : {}));
    this._definition = {};
    this._definition = this.constructor.definition;
  }
  static get definition() {
    if (this._cachedDefinition)
      return this._cachedDefinition;
    this._cachedDefinition = this._definition;
    return this._cachedDefinition;
  }
  static set definition(value) {
    this._cachedDefinition = value;
  }
  get interfaceSettings() {
    return this._settings.interface;
  }
  static registerRenderer(rendererClass) {
    if (!rendererClass.id) {
      throw new Error(`Sorry but the interface renderer "<yellow>${rendererClass.name}</yellow>" that you want to register is missing the required <yellow>static</yellow> <green>id</green> property...`);
    }
    this._registeredRenderers[rendererClass.id] = rendererClass;
  }
  static override(definition) {
    const _this = this;
    class SInterfaceOverrided extends this {
    }
    SInterfaceOverrided.overridedName = `${_this.name} (overrided)`;
    SInterfaceOverrided.definition = __deepMerge(_this.definition, definition);
    return SInterfaceOverrided;
  }
  static getAvailableTypes() {
    return getAvailableInterfaceTypes();
  }
  static makeAvailableAsType(name = null) {
    const n = (name || this.name).toLowerCase();
    if (global !== void 0) {
      global._registeredInterfacesTypes[n] = this;
      global._registeredInterfacesTypes[n.replace("interface", "")] = this;
    } else if (window !== void 0) {
      window._registeredInterfacesTypes[n] = this;
      window._registeredInterfacesTypes[n.replace("interface", "")] = this;
    }
  }
  static toObject() {
    var _a2;
    return {
      name: this.name,
      description: (_a2 = this.description) !== null && _a2 !== void 0 ? _a2 : "",
      definition: Object.assign({}, this.definition)
    };
  }
  static defaults() {
    const defaults = {};
    Object.keys(this.definition).forEach((key) => {
      const propObj = this.definition[key];
      if (propObj.default !== void 0) {
        defaults[key] = propObj.default;
      }
    });
    return defaults;
  }
  static apply(objectOrString, settings) {
    const int = new this({
      interface: settings !== null && settings !== void 0 ? settings : {}
    });
    return int.apply(objectOrString);
  }
  static render(renderer = "terminal", settings) {
    const set = __deepMerge({
      renderer: "terminal",
      exclude: ["help"]
    }, settings);
    if (!this._registeredRenderers[renderer]) {
      throw new Error(`Sorry but the requested renderer "<yellow>${renderer}</yellow>" does not exists... Here's the available renderers: <green>${Object.keys(this._registeredRenderers).join(", ")}</green>`);
    }
    const rendererInstance = new this._registeredRenderers[renderer](this, set);
    return rendererInstance.render();
  }
  apply(objectOrString, settings) {
    var _a2;
    const set = __deepMerge(this.interfaceSettings, settings !== null && settings !== void 0 ? settings : {});
    let objectOnWhichToApplyInterface = objectOrString;
    if (typeof objectOrString === "string") {
      objectOnWhichToApplyInterface = parseArgs(objectOrString);
      Object.keys(objectOnWhichToApplyInterface).forEach((argName) => {
        for (let i2 = 0; i2 < Object.keys(this._definition).length; i2++) {
          const defArgName = Object.keys(this._definition)[i2];
          const obj2 = this._definition[defArgName];
          if (obj2.explicit) {
            if (obj2.alias && ` ${objectOrString} `.match(new RegExp(`\\s-${obj2.alias}\\s`)))
              return;
            else if (` ${objectOrString} `.match(new RegExp(`\\s--${argName}\\s`)))
              return;
            delete objectOnWhichToApplyInterface[argName];
          }
        }
      });
      Object.keys(objectOnWhichToApplyInterface).forEach((argName) => {
        for (let i2 = 0; i2 < Object.keys(this._definition).length; i2++) {
          const defArgName = Object.keys(this._definition)[i2];
          const obj2 = this._definition[defArgName];
          if (!obj2.alias)
            continue;
          if (obj2.alias === argName && objectOnWhichToApplyInterface[defArgName] === void 0) {
            objectOnWhichToApplyInterface[defArgName] = objectOnWhichToApplyInterface[argName];
            delete objectOnWhichToApplyInterface[argName];
          }
        }
      });
      Object.keys(objectOnWhichToApplyInterface).forEach((argName, i2) => {
        if (argName === `${i2}`) {
          const definitionKeys = Object.keys(this._definition);
          if (definitionKeys[i2]) {
            objectOnWhichToApplyInterface[definitionKeys[i2]] = objectOnWhichToApplyInterface[argName];
          }
          delete objectOnWhichToApplyInterface[argName];
        }
      });
    }
    const descriptor2 = new SDescriptor({
      descriptor: Object.assign({ type: "Object", rules: this._definition }, (_a2 = set.descriptor) !== null && _a2 !== void 0 ? _a2 : {})
    });
    if (set.baseObj) {
      objectOnWhichToApplyInterface = __deepMerge(set.baseObj, objectOnWhichToApplyInterface);
    }
    const descriptorResult = descriptor2.apply(objectOnWhichToApplyInterface);
    if (descriptorResult.hasIssues()) {
      throw new Error(descriptorResult.toString());
    }
    let resultObj = descriptorResult.value;
    if (!set.stripUnkown) {
      resultObj = __deepMerge(objectOnWhichToApplyInterface, resultObj);
    }
    return resultObj;
  }
}
SInterface.description = "";
SInterface._registeredRenderers = {};
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function validate(uuid) {
  return typeof uuid === "string" && REGEX.test(uuid);
}
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (var i2 = 0; i2 < 16; ++i2) {
      buf[offset + i2] = rnds[i2];
    }
    return buf;
  }
  return stringify(rnds);
}
function uniqid() {
  return v4();
}
var __awaiter$4 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const _links = {}, _stylesheets = {};
function adoptStyleInShadowRoot($shadowRoot, $context = document) {
  return __awaiter$4(this, void 0, void 0, function* () {
    const _styleNodes = [];
    const $links = $context.querySelectorAll('link[rel="stylesheet"]');
    if ($links && $shadowRoot) {
      Array.from($links).forEach(($link) => __awaiter$4(this, void 0, void 0, function* () {
        if (!$link.id)
          $link.id = `link-${uniqid()}`;
        const stylesheetId = $link.id;
        if (_links[stylesheetId]) {
          $shadowRoot.adoptedStyleSheets = [
            ...$shadowRoot.adoptedStyleSheets,
            _links[stylesheetId].stylesheet
          ];
          return;
        }
        $shadowRoot === null || $shadowRoot === void 0 ? void 0 : $shadowRoot.appendChild($link.cloneNode());
        if (_styleNodes.indexOf($link) !== -1)
          return;
        _styleNodes.push($link);
        const res = yield fetch($link.href, {
          headers: {
            Accept: "text/css,*/*;q=0.1"
          }
        });
        let cssStr = yield res.text();
        const stylesheet = new CSSStyleSheet();
        stylesheet.replace(cssStr);
        _links[stylesheetId] = {
          stylesheet
        };
      }));
    }
    const $styles = $context.querySelectorAll("style");
    if ($styles && $shadowRoot) {
      Array.from($styles).forEach(($style) => {
        if (!$style.id)
          $style.id = `stylesheet-${uniqid()}`;
        const stylesheetId = $style.id;
        if (_stylesheets[stylesheetId]) {
          $shadowRoot.adoptedStyleSheets = [
            ...$shadowRoot.adoptedStyleSheets,
            _stylesheets[stylesheetId].stylesheet
          ];
          return;
        }
        if (_styleNodes.indexOf($style) !== -1)
          return;
        _styleNodes.push($style);
        const stylesheet = new CSSStyleSheet();
        stylesheet.replace($style.innerHTML);
        _stylesheets[stylesheetId] = {
          stylesheet
        };
        $shadowRoot.adoptedStyleSheets = [
          ...$shadowRoot.adoptedStyleSheets,
          _stylesheets[stylesheetId].stylesheet
        ];
      });
    }
    return true;
  });
}
function injectStyle(style, id = `injected-style-${uniqid()}`, node = document.head) {
  const $tag = document.createElement("style");
  $tag.type = "text/css";
  $tag.setAttribute("id", `injected-style-${id.toLowerCase()}`);
  $tag.innerHTML = style;
  node.appendChild($tag);
  return $tag;
}
function camelize(text) {
  let res = "";
  const reg = /(?:^|[_-\s])(\w)/g;
  res = text.replace(reg, function(_, c) {
    return c ? c.toUpperCase() : "";
  });
  res = res.substr(0, 1).toLowerCase() + res.slice(1);
  return res.trim();
}
function camelCase(text) {
  return camelize(text);
}
function getMethods(toCheck) {
  let props = [];
  let obj2 = toCheck;
  do {
    const _props = Object.getOwnPropertyNames(obj2);
    if (_props.indexOf("__defineGetter__") !== -1)
      continue;
    props = props.concat(_props);
  } while (obj2 = Object.getPrototypeOf(obj2));
  return props.sort().filter(function(e, i2, arr) {
    if (e != arr[i2 + 1] && typeof toCheck[e] == "function")
      return true;
  });
}
var concatMap$1 = function(xs, fn2) {
  var res = [];
  for (var i2 = 0; i2 < xs.length; i2++) {
    var x = fn2(xs[i2], i2);
    if (isArray$1(x))
      res.push.apply(res, x);
    else
      res.push(x);
  }
  return res;
};
var isArray$1 = Array.isArray || function(xs) {
  return Object.prototype.toString.call(xs) === "[object Array]";
};
var balancedMatch = balanced$1;
function balanced$1(a, b, str) {
  if (a instanceof RegExp)
    a = maybeMatch(a, str);
  if (b instanceof RegExp)
    b = maybeMatch(b, str);
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
balanced$1.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i2 = ai;
  if (ai >= 0 && bi > 0) {
    if (a === b) {
      return [ai, bi];
    }
    begs = [];
    left = str.length;
    while (i2 >= 0 && !result) {
      if (i2 == ai) {
        begs.push(i2);
        ai = str.indexOf(a, i2 + 1);
      } else if (begs.length == 1) {
        result = [begs.pop(), bi];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }
        bi = str.indexOf(b, i2 + 1);
      }
      i2 = ai < bi && ai >= 0 ? ai : bi;
    }
    if (begs.length) {
      result = [left, right];
    }
  }
  return result;
}
var concatMap = concatMap$1;
var balanced = balancedMatch;
var braceExpansion = expandTop;
var escSlash = "\0SLASH" + Math.random() + "\0";
var escOpen = "\0OPEN" + Math.random() + "\0";
var escClose = "\0CLOSE" + Math.random() + "\0";
var escComma = "\0COMMA" + Math.random() + "\0";
var escPeriod = "\0PERIOD" + Math.random() + "\0";
function numeric(str) {
  return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
}
function escapeBraces(str) {
  return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
}
function unescapeBraces(str) {
  return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
}
function parseCommaParts(str) {
  if (!str)
    return [""];
  var parts = [];
  var m = balanced("{", "}", str);
  if (!m)
    return str.split(",");
  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(",");
  p[p.length - 1] += "{" + body + "}";
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length - 1] += postParts.shift();
    p.push.apply(p, postParts);
  }
  parts.push.apply(parts, p);
  return parts;
}
function expandTop(str) {
  if (!str)
    return [];
  if (str.substr(0, 2) === "{}") {
    str = "\\{\\}" + str.substr(2);
  }
  return expand$1(escapeBraces(str), true).map(unescapeBraces);
}
function embrace(str) {
  return "{" + str + "}";
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}
function lte(i2, y) {
  return i2 <= y;
}
function gte(i2, y) {
  return i2 >= y;
}
function expand$1(str, isTop) {
  var expansions = [];
  var m = balanced("{", "}", str);
  if (!m || /\$$/.test(m.pre))
    return [str];
  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(",") >= 0;
  if (!isSequence && !isOptions) {
    if (m.post.match(/,.*\}/)) {
      str = m.pre + "{" + m.body + escClose + m.post;
      return expand$1(str);
    }
    return [str];
  }
  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      n = expand$1(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length ? expand$1(m.post, false) : [""];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }
  var pre = m.pre;
  var post = m.post.length ? expand$1(m.post, false) : [""];
  var N;
  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length);
    var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);
    N = [];
    for (var i2 = x; test(i2, y); i2 += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i2);
        if (c === "\\")
          c = "";
      } else {
        c = String(i2);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join("0");
            if (i2 < 0)
              c = "-" + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) {
      return expand$1(el, false);
    });
  }
  for (var j2 = 0; j2 < N.length; j2++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j2] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }
  return expansions;
}
var minimatch_1 = minimatch;
minimatch.Minimatch = Minimatch;
var path = { sep: "/" };
try {
  path = require("path");
} catch (er) {
}
var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
var expand = braceExpansion;
var plTypes = {
  "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
  "?": { open: "(?:", close: ")?" },
  "+": { open: "(?:", close: ")+" },
  "*": { open: "(?:", close: ")*" },
  "@": { open: "(?:", close: ")" }
};
var qmark = "[^/]";
var star = qmark + "*?";
var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
var reSpecials = charSet("().*{}+?[]^$\\!");
function charSet(s) {
  return s.split("").reduce(function(set, c) {
    set[c] = true;
    return set;
  }, {});
}
var slashSplit = /\/+/;
minimatch.filter = filter;
function filter(pattern, options) {
  options = options || {};
  return function(p, i2, list) {
    return minimatch(p, pattern, options);
  };
}
function ext(a, b) {
  a = a || {};
  b = b || {};
  var t = {};
  Object.keys(b).forEach(function(k) {
    t[k] = b[k];
  });
  Object.keys(a).forEach(function(k) {
    t[k] = a[k];
  });
  return t;
}
minimatch.defaults = function(def) {
  if (!def || !Object.keys(def).length)
    return minimatch;
  var orig = minimatch;
  var m = function minimatch2(p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options));
  };
  m.Minimatch = function Minimatch2(pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options));
  };
  return m;
};
Minimatch.defaults = function(def) {
  if (!def || !Object.keys(def).length)
    return Minimatch;
  return minimatch.defaults(def).Minimatch;
};
function minimatch(p, pattern, options) {
  if (typeof pattern !== "string") {
    throw new TypeError("glob pattern string required");
  }
  if (!options)
    options = {};
  if (!options.nocomment && pattern.charAt(0) === "#") {
    return false;
  }
  if (pattern.trim() === "")
    return p === "";
  return new Minimatch(pattern, options).match(p);
}
function Minimatch(pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options);
  }
  if (typeof pattern !== "string") {
    throw new TypeError("glob pattern string required");
  }
  if (!options)
    options = {};
  pattern = pattern.trim();
  if (path.sep !== "/") {
    pattern = pattern.split(path.sep).join("/");
  }
  this.options = options;
  this.set = [];
  this.pattern = pattern;
  this.regexp = null;
  this.negate = false;
  this.comment = false;
  this.empty = false;
  this.make();
}
Minimatch.prototype.debug = function() {
};
Minimatch.prototype.make = make;
function make() {
  if (this._made)
    return;
  var pattern = this.pattern;
  var options = this.options;
  if (!options.nocomment && pattern.charAt(0) === "#") {
    this.comment = true;
    return;
  }
  if (!pattern) {
    this.empty = true;
    return;
  }
  this.parseNegate();
  var set = this.globSet = this.braceExpand();
  if (options.debug)
    this.debug = console.error;
  this.debug(this.pattern, set);
  set = this.globParts = set.map(function(s) {
    return s.split(slashSplit);
  });
  this.debug(this.pattern, set);
  set = set.map(function(s, si, set2) {
    return s.map(this.parse, this);
  }, this);
  this.debug(this.pattern, set);
  set = set.filter(function(s) {
    return s.indexOf(false) === -1;
  });
  this.debug(this.pattern, set);
  this.set = set;
}
Minimatch.prototype.parseNegate = parseNegate;
function parseNegate() {
  var pattern = this.pattern;
  var negate = false;
  var options = this.options;
  var negateOffset = 0;
  if (options.nonegate)
    return;
  for (var i2 = 0, l = pattern.length; i2 < l && pattern.charAt(i2) === "!"; i2++) {
    negate = !negate;
    negateOffset++;
  }
  if (negateOffset)
    this.pattern = pattern.substr(negateOffset);
  this.negate = negate;
}
minimatch.braceExpand = function(pattern, options) {
  return braceExpand(pattern, options);
};
Minimatch.prototype.braceExpand = braceExpand;
function braceExpand(pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options;
    } else {
      options = {};
    }
  }
  pattern = typeof pattern === "undefined" ? this.pattern : pattern;
  if (typeof pattern === "undefined") {
    throw new TypeError("undefined pattern");
  }
  if (options.nobrace || !pattern.match(/\{.*\}/)) {
    return [pattern];
  }
  return expand(pattern);
}
Minimatch.prototype.parse = parse;
var SUBPARSE = {};
function parse(pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError("pattern is too long");
  }
  var options = this.options;
  if (!options.noglobstar && pattern === "**")
    return GLOBSTAR;
  if (pattern === "")
    return "";
  var re = "";
  var hasMagic = !!options.nocase;
  var escaping = false;
  var patternListStack = [];
  var negativeLists = [];
  var stateChar;
  var inClass = false;
  var reClassStart = -1;
  var classStart = -1;
  var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
  var self2 = this;
  function clearStateChar() {
    if (stateChar) {
      switch (stateChar) {
        case "*":
          re += star;
          hasMagic = true;
          break;
        case "?":
          re += qmark;
          hasMagic = true;
          break;
        default:
          re += "\\" + stateChar;
          break;
      }
      self2.debug("clearStateChar %j %j", stateChar, re);
      stateChar = false;
    }
  }
  for (var i2 = 0, len = pattern.length, c; i2 < len && (c = pattern.charAt(i2)); i2++) {
    this.debug("%s	%s %s %j", pattern, i2, re, c);
    if (escaping && reSpecials[c]) {
      re += "\\" + c;
      escaping = false;
      continue;
    }
    switch (c) {
      case "/":
        return false;
      case "\\":
        clearStateChar();
        escaping = true;
        continue;
      case "?":
      case "*":
      case "+":
      case "@":
      case "!":
        this.debug("%s	%s %s %j <-- stateChar", pattern, i2, re, c);
        if (inClass) {
          this.debug("  in class");
          if (c === "!" && i2 === classStart + 1)
            c = "^";
          re += c;
          continue;
        }
        self2.debug("call clearStateChar %j", stateChar);
        clearStateChar();
        stateChar = c;
        if (options.noext)
          clearStateChar();
        continue;
      case "(":
        if (inClass) {
          re += "(";
          continue;
        }
        if (!stateChar) {
          re += "\\(";
          continue;
        }
        patternListStack.push({
          type: stateChar,
          start: i2 - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        });
        re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
        this.debug("plType %j %j", stateChar, re);
        stateChar = false;
        continue;
      case ")":
        if (inClass || !patternListStack.length) {
          re += "\\)";
          continue;
        }
        clearStateChar();
        hasMagic = true;
        var pl = patternListStack.pop();
        re += pl.close;
        if (pl.type === "!") {
          negativeLists.push(pl);
        }
        pl.reEnd = re.length;
        continue;
      case "|":
        if (inClass || !patternListStack.length || escaping) {
          re += "\\|";
          escaping = false;
          continue;
        }
        clearStateChar();
        re += "|";
        continue;
      case "[":
        clearStateChar();
        if (inClass) {
          re += "\\" + c;
          continue;
        }
        inClass = true;
        classStart = i2;
        reClassStart = re.length;
        re += c;
        continue;
      case "]":
        if (i2 === classStart + 1 || !inClass) {
          re += "\\" + c;
          escaping = false;
          continue;
        }
        if (inClass) {
          var cs = pattern.substring(classStart + 1, i2);
          try {
            RegExp("[" + cs + "]");
          } catch (er) {
            var sp = this.parse(cs, SUBPARSE);
            re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
            hasMagic = hasMagic || sp[1];
            inClass = false;
            continue;
          }
        }
        hasMagic = true;
        inClass = false;
        re += c;
        continue;
      default:
        clearStateChar();
        if (escaping) {
          escaping = false;
        } else if (reSpecials[c] && !(c === "^" && inClass)) {
          re += "\\";
        }
        re += c;
    }
  }
  if (inClass) {
    cs = pattern.substr(classStart + 1);
    sp = this.parse(cs, SUBPARSE);
    re = re.substr(0, reClassStart) + "\\[" + sp[0];
    hasMagic = hasMagic || sp[1];
  }
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length);
    this.debug("setting tail", re, pl);
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
      if (!$2) {
        $2 = "\\";
      }
      return $1 + $1 + $2 + "|";
    });
    this.debug("tail=%j\n   %s", tail, tail, pl, re);
    var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
    hasMagic = true;
    re = re.slice(0, pl.reStart) + t + "\\(" + tail;
  }
  clearStateChar();
  if (escaping) {
    re += "\\\\";
  }
  var addPatternStart = false;
  switch (re.charAt(0)) {
    case ".":
    case "[":
    case "(":
      addPatternStart = true;
  }
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n];
    var nlBefore = re.slice(0, nl.reStart);
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
    var nlAfter = re.slice(nl.reEnd);
    nlLast += nlAfter;
    var openParensBefore = nlBefore.split("(").length - 1;
    var cleanAfter = nlAfter;
    for (i2 = 0; i2 < openParensBefore; i2++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
    }
    nlAfter = cleanAfter;
    var dollar = "";
    if (nlAfter === "" && isSub !== SUBPARSE) {
      dollar = "$";
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
    re = newRe;
  }
  if (re !== "" && hasMagic) {
    re = "(?=.)" + re;
  }
  if (addPatternStart) {
    re = patternStart + re;
  }
  if (isSub === SUBPARSE) {
    return [re, hasMagic];
  }
  if (!hasMagic) {
    return globUnescape(pattern);
  }
  var flags = options.nocase ? "i" : "";
  try {
    var regExp = new RegExp("^" + re + "$", flags);
  } catch (er) {
    return new RegExp("$.");
  }
  regExp._glob = pattern;
  regExp._src = re;
  return regExp;
}
minimatch.makeRe = function(pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe();
};
Minimatch.prototype.makeRe = makeRe;
function makeRe() {
  if (this.regexp || this.regexp === false)
    return this.regexp;
  var set = this.set;
  if (!set.length) {
    this.regexp = false;
    return this.regexp;
  }
  var options = this.options;
  var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
  var flags = options.nocase ? "i" : "";
  var re = set.map(function(pattern) {
    return pattern.map(function(p) {
      return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
    }).join("\\/");
  }).join("|");
  re = "^(?:" + re + ")$";
  if (this.negate)
    re = "^(?!" + re + ").*$";
  try {
    this.regexp = new RegExp(re, flags);
  } catch (ex) {
    this.regexp = false;
  }
  return this.regexp;
}
minimatch.match = function(list, pattern, options) {
  options = options || {};
  var mm = new Minimatch(pattern, options);
  list = list.filter(function(f) {
    return mm.match(f);
  });
  if (mm.options.nonull && !list.length) {
    list.push(pattern);
  }
  return list;
};
Minimatch.prototype.match = match;
function match(f, partial) {
  this.debug("match", f, this.pattern);
  if (this.comment)
    return false;
  if (this.empty)
    return f === "";
  if (f === "/" && partial)
    return true;
  var options = this.options;
  if (path.sep !== "/") {
    f = f.split(path.sep).join("/");
  }
  f = f.split(slashSplit);
  this.debug(this.pattern, "split", f);
  var set = this.set;
  this.debug(this.pattern, "set", set);
  var filename;
  var i2;
  for (i2 = f.length - 1; i2 >= 0; i2--) {
    filename = f[i2];
    if (filename)
      break;
  }
  for (i2 = 0; i2 < set.length; i2++) {
    var pattern = set[i2];
    var file = f;
    if (options.matchBase && pattern.length === 1) {
      file = [filename];
    }
    var hit = this.matchOne(file, pattern, partial);
    if (hit) {
      if (options.flipNegate)
        return true;
      return !this.negate;
    }
  }
  if (options.flipNegate)
    return false;
  return this.negate;
}
Minimatch.prototype.matchOne = function(file, pattern, partial) {
  var options = this.options;
  this.debug("matchOne", { "this": this, file, pattern });
  this.debug("matchOne", file.length, pattern.length);
  for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
    this.debug("matchOne loop");
    var p = pattern[pi];
    var f = file[fi];
    this.debug(pattern, p, f);
    if (p === false)
      return false;
    if (p === GLOBSTAR) {
      this.debug("GLOBSTAR", [pattern, p, f]);
      var fr = fi;
      var pr = pi + 1;
      if (pr === pl) {
        this.debug("** at the end");
        for (; fi < fl; fi++) {
          if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
            return false;
        }
        return true;
      }
      while (fr < fl) {
        var swallowee = file[fr];
        this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug("globstar found match!", fr, fl, swallowee);
          return true;
        } else {
          if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
            this.debug("dot detected!", file, fr, pattern, pr);
            break;
          }
          this.debug("globstar swallow a segment, and continue");
          fr++;
        }
      }
      if (partial) {
        this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
        if (fr === fl)
          return true;
      }
      return false;
    }
    var hit;
    if (typeof p === "string") {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase();
      } else {
        hit = f === p;
      }
      this.debug("string match", p, f, hit);
    } else {
      hit = f.match(p);
      this.debug("pattern match", p, f, hit);
    }
    if (!hit)
      return false;
  }
  if (fi === fl && pi === pl) {
    return true;
  } else if (fi === fl) {
    return partial;
  } else if (pi === pl) {
    var emptyFileEnd = fi === fl - 1 && file[fi] === "";
    return emptyFileEnd;
  }
  throw new Error("wtf?");
};
function globUnescape(s) {
  return s.replace(/\\(.)/g, "$1");
}
function regExpEscape(s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
var ansiRegex$1 = ({ onlyFirst = false } = {}) => {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(pattern, onlyFirst ? void 0 : "g");
};
const ansiRegex = ansiRegex$1;
var stripAnsi$1 = (string2) => typeof string2 === "string" ? string2.replace(ansiRegex(), "") : string2;
function stripAnsi(string2) {
  return stripAnsi$1(string2);
}
function isTestEnv() {
  var _a2;
  return ((_a2 = process === null || process === void 0 ? void 0 : process.env) === null || _a2 === void 0 ? void 0 : _a2.NODE_ENV) === "test";
}
function isChildProcess() {
  if (isTestEnv())
    return false;
  return process.send !== void 0 || {}.IS_CHILD_PROCESS !== void 0;
}
class SLog {
  constructor(logObj) {
    var _a2;
    if (!(logObj === null || logObj === void 0 ? void 0 : logObj.value) && !logObj._logObj) {
      throw new Error(`<red>[${this.constructor.name}]</red> Sorry but you cannot instanciate a new SLog without a "<yellow>value</yellow>" property...`);
    }
    this._logObj = __deepMerge({
      type: SLog.LOG,
      timestamp: Date.now(),
      decorators: true,
      time: false
    }, this.constructor._defaultLogObj, (_a2 = logObj._logObj) !== null && _a2 !== void 0 ? _a2 : logObj);
  }
  static filter(filterObj, name = "default") {
    this._appliedFilters[name] = filterObj;
  }
  static clearFilters() {
    this._appliedFilters = {};
  }
  static removeFilter(name) {
    delete this._appliedFilters[name];
  }
  static setDefaultLogObj(logObj) {
    this._defaultLogObj = logObj;
  }
  get value() {
    return this._logObj.value;
  }
  set value(value) {
    this._logObj.value = value;
  }
  get type() {
    return this._logObj.type;
  }
  get active() {
    const keys = Object.keys(this.constructor._appliedFilters);
    for (let i2 = 0; i2 < keys.length; i2++) {
      const filterObj = this.constructor._appliedFilters[keys[i2]];
      for (let j2 = 0; j2 < Object.keys(filterObj).length; j2++) {
        const filterId = Object.keys(filterObj)[j2];
        const filterItem = filterObj[filterId];
        if (this[filterId] === void 0) {
          continue;
        }
        if (Array.isArray(filterItem)) {
          if (filterItem.indexOf(this[filterId]) === -1)
            return false;
        } else if (filterItem !== this[filterId]) {
          return false;
        }
      }
    }
    return true;
  }
  get decorators() {
    return this._logObj.decorators;
  }
  set decorators(value) {
    this._logObj.decorators = value;
  }
  get time() {
    return this._logObj.time;
  }
  get timestamp() {
    return this._logObj.timestamp;
  }
  get clear() {
    return this._logObj.clear;
  }
  get temp() {
    return this._logObj.temp;
  }
  get as() {
    return this._logObj.as;
  }
}
SLog.TYPE_LOG = "log";
SLog.TYPE_INFO = "info";
SLog.TYPE_WARN = "warn";
SLog.TYPE_ERROR = "error";
SLog.TYPE_VERBOSE = "verbose";
SLog.TYPE_SUMMARY = "summary";
SLog.TYPE_CHILD_PROCESS = "child_process";
SLog._appliedFilters = {};
SLog._defaultLogObj = {};
var __awaiter$3 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SEventEmitter extends SClass {
  constructor(settings = {}) {
    super(__deepMerge({
      eventEmitter: {
        emitter: void 0,
        asyncStart: false,
        defaultCallTime: {},
        bufferTimeout: 1e3,
        bufferedEvents: [],
        forceObject: ["log"],
        defaults: {},
        castByEvent: {
          log: SLog
        },
        bind: void 0
      }
    }, settings || {}));
    this._asyncStarted = false;
    this._buffer = [];
    this._eventsStacks = {};
    this._onStackById = {};
  }
  static get global() {
    if (!this._globalInstance) {
      this._globalInstance = new SEventEmitter({
        metas: {
          id: "sugarEventSPromise"
        }
      });
    }
    return this._globalInstance;
  }
  static pipe(sourceSEventEmitter, destSEventEmitter, settings) {
    const set = Object.assign({ events: "*", prefixEvent: false, prefixValue: void 0, stripAnsi: false, trim: true, keepLineBreak: true, overrideEmitter: "bind", processor: void 0, exclude: ["finally", "resolve", "reject", "cancel", "catch"], filter: void 0 }, settings !== null && settings !== void 0 ? settings : {});
    if (!sourceSEventEmitter || !sourceSEventEmitter.on || typeof sourceSEventEmitter.on !== "function")
      return sourceSEventEmitter;
    sourceSEventEmitter.on(set.events || "*", (value, metas) => __awaiter$3(this, void 0, void 0, function* () {
      var _a2, _b2, _c2, _d2, _e, _f, _g;
      if (!metas) {
        return;
      }
      metas.id = (_c2 = (_a2 = metas.id) !== null && _a2 !== void 0 ? _a2 : (_b2 = metas.emitter.metas) === null || _b2 === void 0 ? void 0 : _b2.id) !== null && _c2 !== void 0 ? _c2 : uniqid();
      metas.color = (_f = (_d2 = metas.color) !== null && _d2 !== void 0 ? _d2 : (_e = metas.emitter.metas) === null || _e === void 0 ? void 0 : _e.color) !== null && _f !== void 0 ? _f : getColorFor(metas.id);
      if (set.exclude && set.exclude.indexOf(metas.event) !== -1)
        return;
      if (set.filter && !set.filter(value, metas))
        return;
      if (set.stripAnsi) {
        if (value && value.value && typeof value.value === "string")
          value.value = stripAnsi(value.value);
        else if (typeof value === "string")
          value = stripAnsi(value);
      }
      if (set.trim) {
        if (value && value.value && typeof value.value === "string")
          value.value = value.value.trim();
        else if (typeof value === "string")
          value = value.trim();
      }
      if (set.keepLineBreak === false) {
        if (value && value.value && typeof value.value === "string")
          value.value = value.value.replace(/\r?\n|\r/g, "");
        else if (typeof value === "string")
          value = value.replace(/\r?\n|\r/g, "");
      }
      if (set.processor) {
        const res = set.processor(value, metas);
        if (Array.isArray(res) && res.length === 2) {
          value = res[0];
          metas = res[1];
        } else if (typeof res === "object" && res.value !== void 0 && res.metas !== void 0) {
          value = res.value;
          metas = res.metas;
        } else {
          value = res;
        }
      }
      if (set.prefixValue) {
        if (value && value.value && typeof value.value === "string") {
          value.value = `${set.prefixValue}${value.value}`;
        } else if (typeof value === "string") {
          value = `${set.prefixValue}${value}`;
        }
      }
      if (metas && metas.event) {
        let emitStack = metas.event;
        if (!metas.emitter) {
          metas.emitter = this;
        }
        if (set.prefixEvent) {
          if (typeof set.prefixEvent === "string") {
            emitStack = `${set.prefixEvent}.${metas.event}`;
          } else {
            emitStack = `${metas.name}`;
          }
          metas.event = emitStack;
        }
        const emitMetas = Object.assign(Object.assign({}, metas), { level: ((_g = metas === null || metas === void 0 ? void 0 : metas.level) !== null && _g !== void 0 ? _g : 0) + 1 });
        if (destSEventEmitter instanceof SEventEmitter) {
          if (set.overrideEmitter === "bind" && destSEventEmitter.eventEmitterSettings.bind) {
            emitMetas.emitter = destSEventEmitter.eventEmitterSettings.bind;
          } else if (set.overrideEmitter === true) {
            emitMetas.emitter = destSEventEmitter;
          }
        }
        if (destSEventEmitter === process && isChildProcess() && process.send) {
          if (value.value && value.value instanceof Error) {
            value.value = fn$3(value.value);
          }
          process.send({
            value,
            metas: emitMetas
          });
        } else {
          destSEventEmitter.emit(metas.event, value, emitMetas);
        }
      }
    }));
  }
  get eventEmitterSettings() {
    return this._settings.eventEmitter;
  }
  pipe(input, settings) {
    SEventEmitter.pipe(input, this, settings);
    return input;
  }
  pipeErrors(input, settings) {
    SEventEmitter.pipe(input, this, Object.assign(Object.assign({}, settings), { events: "error" }));
    return input;
  }
  pipeFrom(input, settings) {
    return this.pipe(input, settings);
  }
  pipeTo(dest, settings) {
    SEventEmitter.pipe(this, dest, settings);
    return this;
  }
  start() {
    if (!this.eventEmitterSettings.asyncStart)
      return;
    this._asyncStarted = true;
    this._processBuffer();
  }
  _createMetas(event, metas = {}) {
    var _a2, _b2, _c2;
    return __deepMerge({
      event,
      name: event,
      emitter: (_b2 = (_a2 = this.eventEmitterSettings.bind) !== null && _a2 !== void 0 ? _a2 : metas === null || metas === void 0 ? void 0 : metas.emitter) !== null && _b2 !== void 0 ? _b2 : this,
      originalEmitter: (_c2 = metas === null || metas === void 0 ? void 0 : metas.originalEmitter) !== null && _c2 !== void 0 ? _c2 : this,
      time: Date.now(),
      level: 0
    }, metas !== null && metas !== void 0 ? metas : {});
  }
  emit(event, value, metas) {
    return new Promise((resolve, reject) => __awaiter$3(this, void 0, void 0, function* () {
      let metasObj = this._createMetas(event, metas);
      const isFirstLevel = !metasObj.level;
      if (plainObject(value)) {
        Object.keys(this.eventEmitterSettings.defaults).forEach((key) => {
          var _a2;
          const parts = key.split(",").map((l) => l.trim());
          if (parts.indexOf(event) === -1 && parts.indexOf("*") === -1)
            return;
          value = __deepMerge(value, (_a2 = this.eventEmitterSettings.defaults) === null || _a2 === void 0 ? void 0 : _a2[key]);
        });
      }
      const CastClass = this.eventEmitterSettings.castByEvent[event];
      if (CastClass && cls(CastClass) && !(value instanceof CastClass) && !value._sEventEmitterPreprocessed) {
        value = new CastClass(value);
      }
      if (event === "ask") {
        if (isFirstLevel) {
          metasObj.askId = uniqid();
        }
      }
      if (!this._asyncStarted && this.eventEmitterSettings.asyncStart) {
        this._buffer.push({
          event,
          value,
          metas: metasObj,
          resolve,
          reject
        });
        return;
      }
      this._emit({
        event,
        value,
        metas: metasObj,
        resolve,
        reject
      });
    }));
  }
  _emit(logObj) {
    return __awaiter$3(this, void 0, void 0, function* () {
      if (logObj.event === "ask") {
        this.constructor.global.on(`answer.${logObj.metas.askId}:1`, (answer, metas) => {
          logObj.resolve(answer);
        });
        this._emitEvents(logObj.event, logObj.value, logObj.metas);
      } else {
        const res = yield this._emitEvents(logObj.event, logObj.value, Object.assign({}, logObj.metas));
        logObj.resolve(res);
      }
    });
  }
  _registerNewEventsStacks(events) {
    if (typeof events === "string")
      events = events.split(",").map((s) => s.trim());
    events.forEach((event) => {
      if (!this._eventsStacks[event]) {
        this._eventsStacks[event] = {
          buffer: [],
          callStack: []
        };
      }
    });
  }
  _registerCallbackInEventStack(event, callback, settings = {}) {
    settings = Object.assign({ callNumber: void 0, filter: void 0, processor: void 0, id: void 0 }, settings);
    if (settings.id) {
      if (!this._onStackById[settings.id])
        this._onStackById[settings.id] = [];
      this._onStackById[settings.id].push({
        event,
        callback,
        settings
      });
    }
    if (!this._eventsStacks[event]) {
      this._registerNewEventsStacks(event);
    }
    const eventStackObj = this._eventsStacks[event];
    let callNumber = settings.callNumber;
    if (callNumber === void 0 && this.eventEmitterSettings.defaultCallTime[event] !== void 0) {
      callNumber = this.eventEmitterSettings.defaultCallTime[event];
    } else if (callNumber === void 0) {
      callNumber = -1;
    }
    if (typeof callback === "function")
      eventStackObj.callStack.push({
        callback,
        callNumber,
        filter: settings.filter,
        processor: settings.processor,
        called: 0
      });
    this._processBuffer();
    return this;
  }
  _processBuffer() {
    if (this._buffer.length > 0) {
      setTimeout(() => {
        this._buffer = this._buffer.filter((item) => {
          this._emit(item);
          return false;
        });
      }, this.eventEmitterSettings.bufferTimeout);
    }
  }
  _emitEventStack(event, initialValue, metasObj) {
    return __awaiter$3(this, void 0, void 0, function* () {
      let currentCallbackReturnedValue = initialValue;
      if (!this._eventsStacks || Object.keys(this._eventsStacks).length === 0)
        return currentCallbackReturnedValue;
      if (!this._eventsStacks[event]) {
        this._registerNewEventsStacks(event);
      }
      let eventStackArray = [];
      const eventStackObj = this._eventsStacks[event];
      if (eventStackObj && eventStackObj.callStack) {
        eventStackArray = [
          ...eventStackArray,
          ...eventStackObj.callStack
        ];
      }
      Object.keys(this._eventsStacks).forEach((stackName) => {
        if (stackName === event)
          return currentCallbackReturnedValue;
        if (minimatch_1(event, stackName) && this._eventsStacks[stackName] !== void 0) {
          eventStackArray = [
            ...eventStackArray,
            ...this._eventsStacks[stackName].callStack
          ];
        }
      });
      eventStackArray.map((item) => item.called++);
      eventStackArray = eventStackArray.filter((item) => {
        if (item.callNumber === -1)
          return true;
        if (item.called <= item.callNumber)
          return true;
        return false;
      });
      for (let i2 = 0; i2 < eventStackArray.length; i2++) {
        const item = eventStackArray[i2];
        if (!item.callback)
          return currentCallbackReturnedValue;
        if (item.filter && !item.filter(currentCallbackReturnedValue, metasObj))
          continue;
        if (item.processor) {
          const res = item.processor(currentCallbackReturnedValue, metasObj);
          if (Array.isArray(res) && res.length === 2) {
            currentCallbackReturnedValue = res[0];
            metasObj = res[1];
          } else if (typeof res === "object" && res.value !== void 0 && res.metas !== void 0) {
            currentCallbackReturnedValue = res.value;
            metasObj = res.metas;
          } else {
            currentCallbackReturnedValue = res;
          }
        }
        const callbackResult = yield item.callback(currentCallbackReturnedValue, metasObj, (metasObj === null || metasObj === void 0 ? void 0 : metasObj.askId) ? (answer) => {
          this.constructor.global.emit(`answer.${metasObj.askId}`, answer, metasObj);
        } : void 0);
        if (callbackResult !== void 0) {
          currentCallbackReturnedValue = callbackResult;
        }
      }
      return currentCallbackReturnedValue;
    });
  }
  _emitEvents(events, initialValue, metas) {
    return new Promise((resolve, reject) => __awaiter$3(this, void 0, void 0, function* () {
      if (!events)
        return this;
      if (typeof events === "string")
        events = events.split(",").map((s) => s.trim());
      let currentStackResult = initialValue;
      for (let i2 = 0; i2 < events.length; i2++) {
        const stackResult = yield this._emitEventStack(events[i2], currentStackResult, metas);
        if (stackResult !== void 0) {
          currentStackResult = stackResult;
        }
      }
      resolve(currentStackResult);
    }));
  }
  on(events, callback, settings) {
    const set = __deepMerge({
      filter: void 0,
      processor: void 0,
      id: void 0
    }, settings);
    if (typeof events === "string")
      events = events.split(",").map((s) => s.trim());
    events.forEach((name) => {
      const splitedName = name.split(":");
      let callNumber = -1;
      if (splitedName.length === 2) {
        name = splitedName[0];
        callNumber = parseInt(splitedName[1]);
      }
      this._registerCallbackInEventStack(name, callback, {
        callNumber,
        filter: set.filter,
        processor: set.processor,
        id: set.id
      });
    });
    return this;
  }
  off(event, callback) {
    if (!callback) {
      if (this._eventsStacks[event]) {
        delete this._eventsStacks[event];
      } else if (this._onStackById[event]) {
        this._onStackById[event].forEach((onStackByIdObj) => {
          this.off(onStackByIdObj.event, onStackByIdObj.callback);
        });
        delete this._onStackById[event];
      }
      return this;
    }
    const eventStackObj = this._eventsStacks[event];
    if (!eventStackObj)
      return this;
    eventStackObj.callStack = eventStackObj.callStack.filter((item) => {
      if (item.callback === callback)
        return false;
      return true;
    });
    this._eventsStacks[event] = eventStackObj;
    return this;
  }
  destroy() {
    this._eventsStacks = {};
  }
}
SEventEmitter.usableAsMixin = true;
const fn = function treatAsValue(promise, settings = {}) {
  settings = Object.assign({ during: -1 }, settings);
  let during = settings.during || -1;
  try {
    const proxy = Proxy.revocable(promise, {
      get(target, prop, receiver) {
        if (prop === "then") {
          return target;
        }
        if (during > 0)
          during--;
        else if (during === 0) {
          proxy.revoke();
        }
        return Reflect.get(...arguments);
      }
    });
    proxy.proxy.restorePromiseBehavior = () => {
      proxy.revoke();
      return promise;
    };
    return proxy.proxy;
  } catch (e) {
    return promise;
  }
};
var __awaiter$2 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SPromise extends SClass.extends(Promise) {
  constructor(executorFnOrSettings = {}, settings) {
    let executorFn, resolvers = {};
    super(__deepMerge({
      promise: {
        treatCancelAs: "resolve",
        destroyTimeout: 1,
        preventRejectOnThrow: true,
        emitErrorEventOnThrow: true,
        resolveAtResolveEvent: false,
        rejectAtRejectEvent: false,
        proxies: {
          resolve: [],
          reject: []
        }
      }
    }, typeof executorFnOrSettings === "object" ? executorFnOrSettings : {}, settings !== null && settings !== void 0 ? settings : {}), (resolve, reject) => {
      resolvers.resolve = resolve;
      new Promise((rejectPromiseResolve, rejectPromiseReject) => {
        resolvers.reject = (...args) => {
          rejectPromiseReject(...args);
          if (this.promiseSettings.preventRejectOnThrow) {
            resolve(...args);
          } else {
            reject(...args);
          }
        };
      }).catch((e) => {
        this.emit("catch", e);
      });
    });
    this._promiseState = "pending";
    this._eventEmitter = new SEventEmitter(__deepMerge({
      metas: Object.assign({}, this.metas),
      eventEmitter: {}
    }, this._settings));
    this.expose(this._eventEmitter, {
      as: "eventEmitter",
      props: [
        "on",
        "off",
        "emit",
        "pipe",
        "pipeErrors",
        "pipeFrom",
        "pipeTo",
        "eventEmitterSettings"
      ]
    });
    this._resolvers = resolvers;
    if (this._settings.promise.destroyTimeout !== -1) {
      this.on("finally", (v, m) => {
        setTimeout(() => {
          this.destroy();
        }, this._settings.promise.destroyTimeout);
      });
    }
    executorFn = typeof executorFnOrSettings === "function" ? executorFnOrSettings : null;
    if (executorFn) {
      const api = {};
      getMethods(this).forEach((func) => {
        if (func.slice(0, 1) === "_")
          return;
        api[func] = this[func].bind(this);
      });
      (() => __awaiter$2(this, void 0, void 0, function* () {
        yield wait(0);
        try {
          yield executorFn(api);
        } catch (e) {
          if (this.promiseSettings.emitErrorEventOnThrow) {
            this.emit("log", {
              type: SLog.TYPE_ERROR,
              value: e
            });
          }
          this.reject(e);
        }
      }))();
    }
    if (this.promiseSettings.resolveAtResolveEvent) {
      this.on("resolve", (data, metas) => {
        this.resolve(data);
      });
    }
    if (this.promiseSettings.rejectAtRejectEvent) {
      this.on("reject", (data, metas) => {
        this.reject(data);
      });
    }
  }
  static treatAsValue(promise, settings = {}) {
    return fn(promise, settings);
  }
  get promiseSettings() {
    return this._settings.promise;
  }
  static get [Symbol.species]() {
    return Promise;
  }
  get [Symbol.toStringTag]() {
    return "SPromise";
  }
  get promiseState() {
    return this._promiseState;
  }
  treatAsValue(settings = {}) {
    return fn(this, settings);
  }
  registerProxy(point, proxy) {
    const ar = point.split(",").map((l) => l.trim());
    ar.forEach((a) => {
      this._settings.promise.proxies[a].push(proxy);
    });
  }
  is(status) {
    const statusArray = status.split(",").map((l) => l.trim());
    if (statusArray.indexOf(this._promiseState) !== -1)
      return true;
    return false;
  }
  isPending() {
    return this._promiseState === "pending";
  }
  isResolved() {
    return this._promiseState === "resolved";
  }
  isRejected() {
    return this._promiseState === "rejected";
  }
  isCanceled() {
    return this._promiseState === "canceled";
  }
  isDestroyed() {
    return this._promiseState === "destroyed";
  }
  resolve(arg, stacksOrder = "resolve,finally") {
    return this._resolve(arg, stacksOrder);
  }
  _resolve(arg, stacksOrder = "resolve,finally") {
    return __awaiter$2(this, void 0, void 0, function* () {
      if (this._promiseState === "destroyed")
        return;
      this._promiseState = "resolved";
      const stacksOrderArray = stacksOrder.split(",").map((l) => l.trim());
      for (let i2 = 0; i2 < stacksOrderArray.length; i2++) {
        const stack = stacksOrderArray[i2];
        arg = yield this.eventEmitter.emit(stack, arg);
      }
      for (const proxyFn of this._settings.promise.proxies.resolve || []) {
        arg = yield proxyFn(arg);
      }
      this._resolvers.resolve(arg);
      return arg;
    });
  }
  reject(arg, stacksOrder = `catch,reject,finally`) {
    return this._reject(arg, stacksOrder);
  }
  _reject(arg, stacksOrder = `catch,reject,finally`) {
    return __awaiter$2(this, void 0, void 0, function* () {
      if (this._promiseState === "destroyed")
        return;
      this._promiseState = "rejected";
      const stacksOrderArray = stacksOrder.split(",").map((l) => l.trim());
      for (let i2 = 0; i2 < stacksOrderArray.length; i2++) {
        const stack = stacksOrderArray[i2];
        arg = yield this.eventEmitter.emit(stack, arg);
      }
      for (const proxyFn of this._settings.promise.proxies.reject || []) {
        arg = yield proxyFn(arg);
      }
      this._resolvers.reject(arg);
      return arg;
    });
  }
  cancel(arg, stacksOrder = "cancel,finally") {
    return this._cancel(arg, stacksOrder);
  }
  _cancel(arg, stacksOrder = "cancel,finally") {
    if (this._promiseState === "destroyed")
      return;
    return new Promise((resolve, reject) => __awaiter$2(this, void 0, void 0, function* () {
      this._promiseState = "canceled";
      const stacksOrderArray = stacksOrder.split(",").map((l) => l.trim());
      for (let i2 = 0; i2 < stacksOrderArray.length; i2++) {
        const stack = stacksOrderArray[i2];
        arg = yield this.eventEmitter.emit(stack, arg);
      }
      if (this._settings.promise.treatCancelAs === "reject") {
        this._resolvers.reject(arg);
      } else {
        this._resolvers.resolve(arg);
      }
      resolve(arg);
    }));
  }
  catch(...args) {
    super.catch(...args);
    return this.on("catch", ...args);
  }
  finally(...args) {
    return this.on("finally", ...args);
  }
  destroy() {
    this._eventEmitter.destroy();
    this._promiseState = "destroyed";
  }
}
function inViewport(elm, settings = {}) {
  return new Promise((resolve) => {
    settings = Object.assign({ offset: 10 }, settings);
    const observer = new IntersectionObserver((entries, observer2) => {
      if (!entries.length)
        return;
      const entry = entries[0];
      if (elm.tagName.toLowerCase() === "ck-search") {
        console.log(entry.intersectionRatio);
      }
      if (entry.intersectionRatio > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
      observer2.disconnect();
    }, {
      root: null,
      rootMargin: `${settings.offset}px`,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    });
    observer.observe(elm);
  });
}
var __awaiter$1 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function whenInViewport(elm, settings = {}) {
  settings = Object.assign({ offset: 10 }, settings);
  return new Promise((resolve) => __awaiter$1(this, void 0, void 0, function* () {
    const options = {
      root: null,
      rootMargin: `${settings.offset}px`,
      threshold: 1
    };
    function onChange(changes, observer2) {
      changes.forEach((change) => {
        if (change.intersectionRatio > 0) {
          observer2.disconnect();
          resolve(elm);
        }
      });
    }
    const observer = new IntersectionObserver(onChange, options);
    observer.observe(elm);
  }));
}
function whenOutOfViewport(elm, settings = {}) {
  return new Promise((resolve, reject) => {
    settings = Object.assign({ offset: 10 }, settings);
    let isInViewport = false;
    const _cb = () => {
      if (!isInViewport) {
        observer.disconnect();
        resolve(elm);
      }
    };
    const observer = new IntersectionObserver((entries, observer2) => {
      if (!entries.length)
        return;
      const entry = entries[0];
      if (entry.intersectionRatio > 0) {
        isInViewport = true;
      } else {
        isInViewport = false;
      }
      _cb();
    }, {
      root: null,
      rootMargin: `${settings.offset}px`,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    });
    observer.observe(elm);
  });
}
var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function inViewportStatusChange($elm, settings) {
  let isFinished = false;
  settings = Object.assign({ offset: 10 }, settings !== null && settings !== void 0 ? settings : {});
  return new SPromise(({ emit }) => __awaiter(this, void 0, void 0, function* () {
    function _whenIn() {
      if (isFinished)
        return;
      whenInViewport($elm, settings).then(() => {
        emit("enter", $elm);
        _whenOut();
      });
    }
    function _whenOut() {
      if (isFinished)
        return;
      whenOutOfViewport($elm, settings).then(() => {
        emit("leave", $elm);
        _whenIn();
      });
    }
    if (yield inViewport($elm, settings)) {
      emit("enter", $elm);
      _whenOut();
    } else {
      emit("leave", $elm);
      _whenIn();
    }
  }), {
    id: "inViewportStatisChange"
  }).on("finally", () => {
    isFinished = true;
  });
}
class SComponentDefaultInterface extends SInterface {
  static get _definition() {
    return {
      id: {
        type: "String",
        physical: true
      },
      mounted: {
        type: "Boolean",
        default: false,
        physical: true
      },
      mountWhen: {
        type: "String",
        values: ["directly", "inViewport"],
        default: "directly"
      },
      adoptStyle: {
        type: "Boolean",
        default: true,
        physical: true
      },
      bare: {
        type: "Boolean",
        default: false,
        physical: true
      }
    };
  }
}
class SComponent extends SClass {
  constructor(node, props, settings = {}) {
    var _a2, _b2;
    var _c2;
    super(__deepMerge({
      componentUtils: {}
    }, settings));
    this.state = "pending";
    this._isInViewport = false;
    this.node = node;
    this._props = props;
    this.inViewportStatusChange.on("enter", () => {
      this._isInViewport = true;
    }).on("leave", () => {
      this._isInViewport = false;
    });
    let InterfaceToApply = (_c2 = class InlineSComponentUtilsInterface extends SInterface {
    }, _c2.definition = {}, _c2);
    InterfaceToApply.definition = Object.assign(Object.assign({}, Object.assign({}, SComponentDefaultInterface.definition)), (_b2 = (_a2 = this.componentUtilsSettings.interface) === null || _a2 === void 0 ? void 0 : _a2.definition) !== null && _b2 !== void 0 ? _b2 : {});
    this.InterfaceToApply = InterfaceToApply;
    const styleStr = this.componentUtilsSettings.style;
    this.injectStyle(styleStr !== null && styleStr !== void 0 ? styleStr : "");
    this._whenMountPromise = new Promise((resolve) => {
      switch (this.props.mountWhen) {
        case "inViewport":
          this.inViewportStatusChange.on("enter", () => {
            resolve();
          });
          break;
        case "directly":
        default:
          resolve();
          break;
      }
    });
  }
  get name() {
    var _a2;
    return (_a2 = this.componentUtilsSettings.name) !== null && _a2 !== void 0 ? _a2 : this.node.tagName.toLowerCase();
  }
  static setDefaultProps(selector, props) {
    selector = Array.isArray(selector) ? selector : [selector];
    selector.forEach((sel) => {
      var _a2;
      this._defaultProps[sel] = Object.assign(Object.assign({}, (_a2 = this._defaultProps[sel]) !== null && _a2 !== void 0 ? _a2 : {}), props);
    });
  }
  static getDefaultProps(selector) {
    var _a2;
    return (_a2 = this._defaultProps[selector]) !== null && _a2 !== void 0 ? _a2 : {};
  }
  get componentUtilsSettings() {
    return this._settings.componentUtils;
  }
  get isInViewport() {
    return this._isInViewport;
  }
  get inViewportStatusChange() {
    if (this._inViewportStatusChangePromise)
      return this._inViewportStatusChangePromise;
    this._inViewportStatusChangePromise = inViewportStatusChange(this.node);
    return this._inViewportStatusChangePromise;
  }
  waitOnMountState() {
    return this._whenMountPromise;
  }
  adoptStyleInShadowRoot($shadowRoot, $context) {
    return adoptStyleInShadowRoot($shadowRoot, $context);
  }
  get props() {
    if (this._finalProps)
      return this._finalProps;
    const props = this._props;
    let passedProps = {};
    if (props.constructor.name === "NamedNodeMap") {
      Object.keys(props).forEach((key) => {
        var _a2, _b2, _c2;
        let value;
        if (((_a2 = props[key]) === null || _a2 === void 0 ? void 0 : _a2.nodeValue) !== void 0) {
          if (props[key].nodeValue === "")
            value = true;
          else
            value = props[key].nodeValue;
        }
        if (!value)
          return;
        passedProps[camelCase((_c2 = (_b2 = props[key]) === null || _b2 === void 0 ? void 0 : _b2.name) !== null && _c2 !== void 0 ? _c2 : key)] = autoCast(value);
      });
    } else {
      j;
      passedProps = props;
    }
    this._finalProps = __deepMerge(this.defaultProps, this.InterfaceToApply.apply(passedProps, {
      descriptor: {
        defaults: false
      }
    }));
    const _this = this;
    this._finalProps = new Proxy(this._finalProps, {
      get(target, prop, receiver) {
        return target[prop];
      },
      set(obj2, prop, value) {
        const propDef = _this.InterfaceToApply.definition[prop];
        if (propDef === null || propDef === void 0 ? void 0 : propDef.physical) {
          if (value === false || value === void 0 || value === null) {
            _this.node.removeAttribute(dashCase(prop));
          } else {
            _this.node.setAttribute(dashCase(prop), String(value));
          }
        }
        obj2[prop] = value;
        return true;
      }
    });
    Object.keys(this._finalProps).forEach((prop) => {
      this._finalProps[prop] = this._finalProps[prop];
    });
    return this._finalProps;
  }
  get defaultProps() {
    var _a2, _b2, _c2;
    if (this._defaultProps)
      return Object.assign({}, this._defaultProps);
    this._defaultProps = Object.assign({}, __deepMerge(this.InterfaceToApply.defaults(), (_a2 = this.componentUtilsSettings.defaultProps) !== null && _a2 !== void 0 ? _a2 : {}, (_b2 = this.constructor._defaultProps["*"]) !== null && _b2 !== void 0 ? _b2 : {}, (_c2 = this.constructor._defaultProps[this.name]) !== null && _c2 !== void 0 ? _c2 : {}));
    return this._defaultProps;
  }
  static getFinalInterface(int) {
    class InlineSComponentUtilsInterface extends SInterface {
    }
    InlineSComponentUtilsInterface.definition = SComponentDefaultInterface.definition;
    if (int) {
      InlineSComponentUtilsInterface.definition = Object.assign(Object.assign({}, SComponentDefaultInterface.definition), int.definition);
    }
    return InlineSComponentUtilsInterface;
  }
  injectStyle(css, id = this.tagName) {
    if (this.constructor._injectedStyles.indexOf(id) !== -1)
      return;
    this.constructor._injectedStyles.push(id);
    injectStyle(css, id);
  }
  exposeApi(apiObj, ctx = this.node) {
    setTimeout(() => {
      let $on = this.node;
      Object.keys(apiObj).forEach((apiFnName) => {
        const apiFn = apiObj[apiFnName].bind(ctx);
        $on[apiFnName] = apiFn;
      });
    });
  }
  className(cls2 = "", style = "") {
    let clsString = cls2.split(" ").map((clsName) => `${this.node.tagName.toLowerCase()}${clsName && !clsName.match(/^__/) ? "-" : ""}${clsName}`).join(" ");
    if (style && !this.props.bare) {
      clsString += ` ${style}`;
    }
    return clsString;
  }
  isMounted() {
    var _a2;
    return (_a2 = this.node) === null || _a2 === void 0 ? void 0 : _a2.hasAttribute("mounted");
  }
}
SComponent._defaultProps = {};
SComponent._injectedStyles = [];
/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
const supportsAdoptingStyleSheets = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
const constructionToken = Symbol();
const styleSheetCache = new Map();
class CSSResult {
  constructor(cssText, safeToken) {
    this["_$cssResult$"] = true;
    if (safeToken !== constructionToken) {
      throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    }
    this.cssText = cssText;
  }
  get styleSheet() {
    let styleSheet = styleSheetCache.get(this.cssText);
    if (supportsAdoptingStyleSheets && styleSheet === void 0) {
      styleSheetCache.set(this.cssText, styleSheet = new CSSStyleSheet());
      styleSheet.replaceSync(this.cssText);
    }
    return styleSheet;
  }
  toString() {
    return this.cssText;
  }
}
const unsafeCSS = (value) => new CSSResult(typeof value === "string" ? value : String(value), constructionToken);
const adoptStyles = (renderRoot, styles2) => {
  if (supportsAdoptingStyleSheets) {
    renderRoot.adoptedStyleSheets = styles2.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  } else {
    styles2.forEach((s) => {
      const style = document.createElement("style");
      const nonce = window["litNonce"];
      if (nonce !== void 0) {
        style.setAttribute("nonce", nonce);
      }
      style.textContent = s.cssText;
      renderRoot.appendChild(style);
    });
  }
};
const cssResultFromStyleSheet = (sheet) => {
  let cssText = "";
  for (const rule of sheet.cssRules) {
    cssText += rule.cssText;
  }
  return unsafeCSS(cssText);
};
const getCompatibleStyle = supportsAdoptingStyleSheets ? (s) => s : (s) => s instanceof CSSStyleSheet ? cssResultFromStyleSheet(s) : s;
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var _a$2, _b$2, _c$2;
var _d$1;
let requestUpdateThenable;
let issueWarning$2;
const polyfillSupport$2 = window.reactiveElementPolyfillSupportDevMode;
{
  const issuedWarnings = (_a$2 = globalThis.litIssuedWarnings) !== null && _a$2 !== void 0 ? _a$2 : globalThis.litIssuedWarnings = new Set();
  issueWarning$2 = (code, warning) => {
    warning += ` See https://lit.dev/msg/${code} for more information.`;
    if (!issuedWarnings.has(warning)) {
      console.warn(warning);
      issuedWarnings.add(warning);
    }
  };
  issueWarning$2("dev-mode", `Lit is in dev mode. Not recommended for production!`);
  if (((_b$2 = window.ShadyDOM) === null || _b$2 === void 0 ? void 0 : _b$2.inUse) && polyfillSupport$2 === void 0) {
    issueWarning$2("polyfill-support-missing", `Shadow DOM is being polyfilled via \`ShadyDOM\` but the \`polyfill-support\` module has not been loaded.`);
  }
  requestUpdateThenable = (name) => ({
    then: (onfulfilled, _onrejected) => {
      issueWarning$2("request-update-promise", `The \`requestUpdate\` method should no longer return a Promise but does so on \`${name}\`. Use \`updateComplete\` instead.`);
      if (onfulfilled !== void 0) {
        onfulfilled(false);
      }
    }
  });
}
const JSCompiler_renameProperty = (prop, _obj) => prop;
const defaultConverter = {
  toAttribute(value, type) {
    switch (type) {
      case Boolean:
        value = value ? "" : null;
        break;
      case Object:
      case Array:
        value = value == null ? value : JSON.stringify(value);
        break;
    }
    return value;
  },
  fromAttribute(value, type) {
    let fromValue = value;
    switch (type) {
      case Boolean:
        fromValue = value !== null;
        break;
      case Number:
        fromValue = value === null ? null : Number(value);
        break;
      case Object:
      case Array:
        try {
          fromValue = JSON.parse(value);
        } catch (e) {
          fromValue = null;
        }
        break;
    }
    return fromValue;
  }
};
const notEqual = (value, old) => {
  return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
const finalized = "finalized";
class ReactiveElement extends HTMLElement {
  constructor() {
    super();
    this.__instanceProperties = new Map();
    this.isUpdatePending = false;
    this.hasUpdated = false;
    this.__reflectingProperty = null;
    this._initialize();
  }
  static addInitializer(initializer) {
    var _a2;
    (_a2 = this._initializers) !== null && _a2 !== void 0 ? _a2 : this._initializers = [];
    this._initializers.push(initializer);
  }
  static get observedAttributes() {
    this.finalize();
    const attributes = [];
    this.elementProperties.forEach((v, p) => {
      const attr = this.__attributeNameForProperty(p, v);
      if (attr !== void 0) {
        this.__attributeToPropertyMap.set(attr, p);
        attributes.push(attr);
      }
    });
    return attributes;
  }
  static createProperty(name, options = defaultPropertyDeclaration) {
    if (options.state) {
      options.attribute = false;
    }
    this.finalize();
    this.elementProperties.set(name, options);
    if (!options.noAccessor && !this.prototype.hasOwnProperty(name)) {
      const key = typeof name === "symbol" ? Symbol() : `__${name}`;
      const descriptor2 = this.getPropertyDescriptor(name, key, options);
      if (descriptor2 !== void 0) {
        Object.defineProperty(this.prototype, name, descriptor2);
      }
    }
  }
  static getPropertyDescriptor(name, key, options) {
    return {
      get() {
        return this[key];
      },
      set(value) {
        const oldValue = this[name];
        this[key] = value;
        this.requestUpdate(name, oldValue, options);
      },
      configurable: true,
      enumerable: true
    };
  }
  static getPropertyOptions(name) {
    return this.elementProperties.get(name) || defaultPropertyDeclaration;
  }
  static finalize() {
    if (this.hasOwnProperty(finalized)) {
      return false;
    }
    this[finalized] = true;
    const superCtor = Object.getPrototypeOf(this);
    superCtor.finalize();
    this.elementProperties = new Map(superCtor.elementProperties);
    this.__attributeToPropertyMap = new Map();
    if (this.hasOwnProperty(JSCompiler_renameProperty("properties"))) {
      const props = this.properties;
      const propKeys = [
        ...Object.getOwnPropertyNames(props),
        ...Object.getOwnPropertySymbols(props)
      ];
      for (const p of propKeys) {
        this.createProperty(p, props[p]);
      }
    }
    this.elementStyles = this.finalizeStyles(this.styles);
    {
      const warnRemovedOrRenamed = (name, renamed = false) => {
        if (this.prototype.hasOwnProperty(name)) {
          issueWarning$2(renamed ? "renamed-api" : "removed-api", `\`${name}\` is implemented on class ${this.name}. It has been ${renamed ? "renamed" : "removed"} in this version of LitElement.`);
        }
      };
      warnRemovedOrRenamed("initialize");
      warnRemovedOrRenamed("requestUpdateInternal");
      warnRemovedOrRenamed("_getUpdateComplete", true);
    }
    return true;
  }
  static finalizeStyles(styles2) {
    const elementStyles = [];
    if (Array.isArray(styles2)) {
      const set = new Set(styles2.flat(Infinity).reverse());
      for (const s of set) {
        elementStyles.unshift(getCompatibleStyle(s));
      }
    } else if (styles2 !== void 0) {
      elementStyles.push(getCompatibleStyle(styles2));
    }
    return elementStyles;
  }
  static __attributeNameForProperty(name, options) {
    const attribute = options.attribute;
    return attribute === false ? void 0 : typeof attribute === "string" ? attribute : typeof name === "string" ? name.toLowerCase() : void 0;
  }
  _initialize() {
    var _a2;
    this.__updatePromise = new Promise((res) => this.enableUpdating = res);
    this._$changedProperties = new Map();
    this.__saveInstanceProperties();
    this.requestUpdate();
    (_a2 = this.constructor._initializers) === null || _a2 === void 0 ? void 0 : _a2.forEach((i2) => i2(this));
  }
  addController(controller) {
    var _a2, _b2;
    ((_a2 = this.__controllers) !== null && _a2 !== void 0 ? _a2 : this.__controllers = []).push(controller);
    if (this.renderRoot !== void 0 && this.isConnected) {
      (_b2 = controller.hostConnected) === null || _b2 === void 0 ? void 0 : _b2.call(controller);
    }
  }
  removeController(controller) {
    var _a2;
    (_a2 = this.__controllers) === null || _a2 === void 0 ? void 0 : _a2.splice(this.__controllers.indexOf(controller) >>> 0, 1);
  }
  __saveInstanceProperties() {
    this.constructor.elementProperties.forEach((_v, p) => {
      if (this.hasOwnProperty(p)) {
        this.__instanceProperties.set(p, this[p]);
        delete this[p];
      }
    });
  }
  createRenderRoot() {
    var _a2;
    const renderRoot = (_a2 = this.shadowRoot) !== null && _a2 !== void 0 ? _a2 : this.attachShadow(this.constructor.shadowRootOptions);
    adoptStyles(renderRoot, this.constructor.elementStyles);
    return renderRoot;
  }
  connectedCallback() {
    var _a2;
    if (this.renderRoot === void 0) {
      this.renderRoot = this.createRenderRoot();
    }
    this.enableUpdating(true);
    (_a2 = this.__controllers) === null || _a2 === void 0 ? void 0 : _a2.forEach((c) => {
      var _a3;
      return (_a3 = c.hostConnected) === null || _a3 === void 0 ? void 0 : _a3.call(c);
    });
  }
  enableUpdating(_requestedUpdate) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this.__controllers) === null || _a2 === void 0 ? void 0 : _a2.forEach((c) => {
      var _a3;
      return (_a3 = c.hostDisconnected) === null || _a3 === void 0 ? void 0 : _a3.call(c);
    });
  }
  attributeChangedCallback(name, _old, value) {
    this._$attributeToProperty(name, value);
  }
  __propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
    var _a2, _b2;
    const attr = this.constructor.__attributeNameForProperty(name, options);
    if (attr !== void 0 && options.reflect === true) {
      const toAttribute = (_b2 = (_a2 = options.converter) === null || _a2 === void 0 ? void 0 : _a2.toAttribute) !== null && _b2 !== void 0 ? _b2 : defaultConverter.toAttribute;
      const attrValue = toAttribute(value, options.type);
      if (this.constructor.enabledWarnings.indexOf("migration") >= 0 && attrValue === void 0) {
        issueWarning$2("undefined-attribute-value", `The attribute value for the ${name} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`);
      }
      this.__reflectingProperty = name;
      if (attrValue == null) {
        this.removeAttribute(attr);
      } else {
        this.setAttribute(attr, attrValue);
      }
      this.__reflectingProperty = null;
    }
  }
  _$attributeToProperty(name, value) {
    var _a2, _b2, _c2;
    const ctor = this.constructor;
    const propName = ctor.__attributeToPropertyMap.get(name);
    if (propName !== void 0 && this.__reflectingProperty !== propName) {
      const options = ctor.getPropertyOptions(propName);
      const converter = options.converter;
      const fromAttribute = (_c2 = (_b2 = (_a2 = converter) === null || _a2 === void 0 ? void 0 : _a2.fromAttribute) !== null && _b2 !== void 0 ? _b2 : typeof converter === "function" ? converter : null) !== null && _c2 !== void 0 ? _c2 : defaultConverter.fromAttribute;
      this.__reflectingProperty = propName;
      this[propName] = fromAttribute(value, options.type);
      this.__reflectingProperty = null;
    }
  }
  requestUpdate(name, oldValue, options) {
    let shouldRequestUpdate = true;
    if (name !== void 0) {
      options = options || this.constructor.getPropertyOptions(name);
      const hasChanged = options.hasChanged || notEqual;
      if (hasChanged(this[name], oldValue)) {
        if (!this._$changedProperties.has(name)) {
          this._$changedProperties.set(name, oldValue);
        }
        if (options.reflect === true && this.__reflectingProperty !== name) {
          if (this.__reflectingProperties === void 0) {
            this.__reflectingProperties = new Map();
          }
          this.__reflectingProperties.set(name, options);
        }
      } else {
        shouldRequestUpdate = false;
      }
    }
    if (!this.isUpdatePending && shouldRequestUpdate) {
      this.__updatePromise = this.__enqueueUpdate();
    }
    return requestUpdateThenable(this.localName);
  }
  async __enqueueUpdate() {
    this.isUpdatePending = true;
    try {
      await this.__updatePromise;
    } catch (e) {
      Promise.reject(e);
    }
    const result = this.scheduleUpdate();
    if (result != null) {
      await result;
    }
    return !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending) {
      return;
    }
    if (!this.hasUpdated) {
      {
        const shadowedProperties = [];
        this.constructor.elementProperties.forEach((_v, p) => {
          var _a3;
          if (this.hasOwnProperty(p) && !((_a3 = this.__instanceProperties) === null || _a3 === void 0 ? void 0 : _a3.has(p))) {
            shadowedProperties.push(p);
          }
        });
        if (shadowedProperties.length) {
          throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${shadowedProperties.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`);
        }
      }
    }
    if (this.__instanceProperties) {
      this.__instanceProperties.forEach((v, p) => this[p] = v);
      this.__instanceProperties = void 0;
    }
    let shouldUpdate = false;
    const changedProperties = this._$changedProperties;
    try {
      shouldUpdate = this.shouldUpdate(changedProperties);
      if (shouldUpdate) {
        this.willUpdate(changedProperties);
        (_a2 = this.__controllers) === null || _a2 === void 0 ? void 0 : _a2.forEach((c) => {
          var _a3;
          return (_a3 = c.hostUpdate) === null || _a3 === void 0 ? void 0 : _a3.call(c);
        });
        this.update(changedProperties);
      } else {
        this.__markUpdated();
      }
    } catch (e) {
      shouldUpdate = false;
      this.__markUpdated();
      throw e;
    }
    if (shouldUpdate) {
      this._$didUpdate(changedProperties);
    }
  }
  willUpdate(_changedProperties) {
  }
  _$didUpdate(changedProperties) {
    var _a2;
    (_a2 = this.__controllers) === null || _a2 === void 0 ? void 0 : _a2.forEach((c) => {
      var _a3;
      return (_a3 = c.hostUpdated) === null || _a3 === void 0 ? void 0 : _a3.call(c);
    });
    if (!this.hasUpdated) {
      this.hasUpdated = true;
      this.firstUpdated(changedProperties);
    }
    this.updated(changedProperties);
    if (this.isUpdatePending && this.constructor.enabledWarnings.indexOf("change-in-update") >= 0) {
      issueWarning$2("change-in-update", `Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`);
    }
  }
  __markUpdated() {
    this._$changedProperties = new Map();
    this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this.__updatePromise;
  }
  shouldUpdate(_changedProperties) {
    return true;
  }
  update(_changedProperties) {
    if (this.__reflectingProperties !== void 0) {
      this.__reflectingProperties.forEach((v, k) => this.__propertyToAttribute(k, this[k], v));
      this.__reflectingProperties = void 0;
    }
    this.__markUpdated();
  }
  updated(_changedProperties) {
  }
  firstUpdated(_changedProperties) {
  }
}
_d$1 = finalized;
ReactiveElement[_d$1] = true;
ReactiveElement.elementProperties = new Map();
ReactiveElement.elementStyles = [];
ReactiveElement.shadowRootOptions = { mode: "open" };
polyfillSupport$2 === null || polyfillSupport$2 === void 0 ? void 0 : polyfillSupport$2({ ReactiveElement });
{
  ReactiveElement.enabledWarnings = ["change-in-update"];
  const ensureOwnWarnings = function(ctor) {
    if (!ctor.hasOwnProperty(JSCompiler_renameProperty("enabledWarnings"))) {
      ctor.enabledWarnings = ctor.enabledWarnings.slice();
    }
  };
  ReactiveElement.enableWarning = function(warning) {
    ensureOwnWarnings(this);
    if (this.enabledWarnings.indexOf(warning) < 0) {
      this.enabledWarnings.push(warning);
    }
  };
  ReactiveElement.disableWarning = function(warning) {
    ensureOwnWarnings(this);
    const i2 = this.enabledWarnings.indexOf(warning);
    if (i2 >= 0) {
      this.enabledWarnings.splice(i2, 1);
    }
  };
}
((_c$2 = globalThis.reactiveElementVersions) !== null && _c$2 !== void 0 ? _c$2 : globalThis.reactiveElementVersions = []).push("1.0.1");
if (globalThis.reactiveElementVersions.length > 1) {
  issueWarning$2("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var _a$1, _b$1, _c$1, _d;
let issueWarning$1;
{
  (_a$1 = globalThis.litIssuedWarnings) !== null && _a$1 !== void 0 ? _a$1 : globalThis.litIssuedWarnings = new Set();
  issueWarning$1 = (code, warning) => {
    warning += code ? ` See https://lit.dev/msg/${code} for more information.` : "";
    if (!globalThis.litIssuedWarnings.has(warning)) {
      console.warn(warning);
      globalThis.litIssuedWarnings.add(warning);
    }
  };
  issueWarning$1("dev-mode", `Lit is in dev mode. Not recommended for production!`);
}
const wrap = ((_b$1 = window.ShadyDOM) === null || _b$1 === void 0 ? void 0 : _b$1.inUse) && ((_c$1 = window.ShadyDOM) === null || _c$1 === void 0 ? void 0 : _c$1.noPatch) === true ? window.ShadyDOM.wrap : (node) => node;
const trustedTypes = globalThis.trustedTypes;
const policy = trustedTypes ? trustedTypes.createPolicy("lit-html", {
  createHTML: (s) => s
}) : void 0;
const identityFunction = (value) => value;
const noopSanitizer = (_node, _name, _type) => identityFunction;
const setSanitizer = (newSanitizer) => {
  if (sanitizerFactoryInternal !== noopSanitizer) {
    throw new Error(`Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.`);
  }
  sanitizerFactoryInternal = newSanitizer;
};
const _testOnlyClearSanitizerFactoryDoNotCallOrElse = () => {
  sanitizerFactoryInternal = noopSanitizer;
};
const createSanitizer = (node, name, type) => {
  return sanitizerFactoryInternal(node, name, type);
};
const boundAttributeSuffix = "$lit$";
const marker = `lit$${String(Math.random()).slice(9)}$`;
const markerMatch = "?" + marker;
const nodeMarker = `<${markerMatch}>`;
const d = document;
const createMarker = (v = "") => d.createComment(v);
const isPrimitive = (value) => value === null || typeof value != "object" && typeof value != "function";
const isArray = Array.isArray;
const isIterable = (value) => {
  var _a2;
  return isArray(value) || typeof ((_a2 = value) === null || _a2 === void 0 ? void 0 : _a2[Symbol.iterator]) === "function";
};
const SPACE_CHAR = `[ 	
\f\r]`;
const ATTR_VALUE_CHAR = `[^ 	
\f\r"'\`<>=]`;
const NAME_CHAR = `[^\\s"'>=/]`;
const textEndRegex = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
const COMMENT_START = 1;
const TAG_NAME = 2;
const DYNAMIC_TAG_NAME = 3;
const commentEndRegex = /-->/g;
const comment2EndRegex = />/g;
const tagEndRegex = new RegExp(`>|${SPACE_CHAR}(?:(${NAME_CHAR}+)(${SPACE_CHAR}*=${SPACE_CHAR}*(?:${ATTR_VALUE_CHAR}|("|')|))|$)`, "g");
const ENTIRE_MATCH = 0;
const ATTRIBUTE_NAME = 1;
const SPACES_AND_EQUALS = 2;
const QUOTE_CHAR = 3;
const singleQuoteAttrEndRegex = /'/g;
const doubleQuoteAttrEndRegex = /"/g;
const rawTextElement = /^(?:script|style|textarea)$/i;
const SVG_RESULT = 2;
const ATTRIBUTE_PART = 1;
const CHILD_PART = 2;
const PROPERTY_PART = 3;
const BOOLEAN_ATTRIBUTE_PART = 4;
const EVENT_PART = 5;
const ELEMENT_PART = 6;
const COMMENT_PART = 7;
const noChange = Symbol.for("lit-noChange");
const nothing = Symbol.for("lit-nothing");
const templateCache = new WeakMap();
const render = (value, container, options) => {
  var _a2, _b2, _c2;
  const partOwnerNode = (_a2 = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _a2 !== void 0 ? _a2 : container;
  let part = partOwnerNode["_$litPart$"];
  if (part === void 0) {
    const endNode = (_b2 = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _b2 !== void 0 ? _b2 : null;
    if (((_c2 = options) === null || _c2 === void 0 ? void 0 : _c2.clearContainerForLit2MigrationOnly) === true) {
      let n = container.firstChild;
      while (n && n !== endNode) {
        const next = n.nextSibling;
        n.remove();
        n = next;
      }
    }
    partOwnerNode["_$litPart$"] = part = new ChildPart(container.insertBefore(createMarker(), endNode), endNode, void 0, options !== null && options !== void 0 ? options : {});
  }
  part._$setValue(value);
  return part;
};
{
  render.setSanitizer = setSanitizer;
  render.createSanitizer = createSanitizer;
  {
    render._testOnlyClearSanitizerFactoryDoNotCallOrElse = _testOnlyClearSanitizerFactoryDoNotCallOrElse;
  }
}
const walker = d.createTreeWalker(d, 129, null, false);
let sanitizerFactoryInternal = noopSanitizer;
const getTemplateHtml = (strings, type) => {
  const l = strings.length - 1;
  const attrNames = [];
  let html = type === SVG_RESULT ? "<svg>" : "";
  let rawTextEndRegex;
  let regex = textEndRegex;
  for (let i2 = 0; i2 < l; i2++) {
    const s = strings[i2];
    let attrNameEndIndex = -1;
    let attrName;
    let lastIndex = 0;
    let match2;
    while (lastIndex < s.length) {
      regex.lastIndex = lastIndex;
      match2 = regex.exec(s);
      if (match2 === null) {
        break;
      }
      lastIndex = regex.lastIndex;
      if (regex === textEndRegex) {
        if (match2[COMMENT_START] === "!--") {
          regex = commentEndRegex;
        } else if (match2[COMMENT_START] !== void 0) {
          regex = comment2EndRegex;
        } else if (match2[TAG_NAME] !== void 0) {
          if (rawTextElement.test(match2[TAG_NAME])) {
            rawTextEndRegex = new RegExp(`</${match2[TAG_NAME]}`, "g");
          }
          regex = tagEndRegex;
        } else if (match2[DYNAMIC_TAG_NAME] !== void 0) {
          {
            throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions");
          }
        }
      } else if (regex === tagEndRegex) {
        if (match2[ENTIRE_MATCH] === ">") {
          regex = rawTextEndRegex !== null && rawTextEndRegex !== void 0 ? rawTextEndRegex : textEndRegex;
          attrNameEndIndex = -1;
        } else if (match2[ATTRIBUTE_NAME] === void 0) {
          attrNameEndIndex = -2;
        } else {
          attrNameEndIndex = regex.lastIndex - match2[SPACES_AND_EQUALS].length;
          attrName = match2[ATTRIBUTE_NAME];
          regex = match2[QUOTE_CHAR] === void 0 ? tagEndRegex : match2[QUOTE_CHAR] === '"' ? doubleQuoteAttrEndRegex : singleQuoteAttrEndRegex;
        }
      } else if (regex === doubleQuoteAttrEndRegex || regex === singleQuoteAttrEndRegex) {
        regex = tagEndRegex;
      } else if (regex === commentEndRegex || regex === comment2EndRegex) {
        regex = textEndRegex;
      } else {
        regex = tagEndRegex;
        rawTextEndRegex = void 0;
      }
    }
    {
      console.assert(attrNameEndIndex === -1 || regex === tagEndRegex || regex === singleQuoteAttrEndRegex || regex === doubleQuoteAttrEndRegex, "unexpected parse state B");
    }
    const end = regex === tagEndRegex && strings[i2 + 1].startsWith("/>") ? " " : "";
    html += regex === textEndRegex ? s + nodeMarker : attrNameEndIndex >= 0 ? (attrNames.push(attrName), s.slice(0, attrNameEndIndex) + boundAttributeSuffix + s.slice(attrNameEndIndex)) + marker + end : s + marker + (attrNameEndIndex === -2 ? (attrNames.push(void 0), i2) : end);
  }
  const htmlResult = html + (strings[l] || "<?>") + (type === SVG_RESULT ? "</svg>" : "");
  return [
    policy !== void 0 ? policy.createHTML(htmlResult) : htmlResult,
    attrNames
  ];
};
class Template {
  constructor({ strings, ["_$litType$"]: type }, options) {
    this.parts = [];
    let node;
    let nodeIndex = 0;
    let attrNameIndex = 0;
    const partCount = strings.length - 1;
    const parts = this.parts;
    const [html, attrNames] = getTemplateHtml(strings, type);
    this.el = Template.createElement(html, options);
    walker.currentNode = this.el.content;
    if (type === SVG_RESULT) {
      const content = this.el.content;
      const svgElement = content.firstChild;
      svgElement.remove();
      content.append(...svgElement.childNodes);
    }
    while ((node = walker.nextNode()) !== null && parts.length < partCount) {
      if (node.nodeType === 1) {
        {
          const tag = node.localName;
          if (/^(?:textarea|template)$/i.test(tag) && node.innerHTML.includes(marker)) {
            const m = `Expressions are not supported inside \`${tag}\` elements. See https://lit.dev/msg/expression-in-${tag} for more information.`;
            if (tag === "template") {
              throw new Error(m);
            } else
              issueWarning$1("", m);
          }
        }
        if (node.hasAttributes()) {
          const attrsToRemove = [];
          for (const name of node.getAttributeNames()) {
            if (name.endsWith(boundAttributeSuffix) || name.startsWith(marker)) {
              const realName = attrNames[attrNameIndex++];
              attrsToRemove.push(name);
              if (realName !== void 0) {
                const value = node.getAttribute(realName.toLowerCase() + boundAttributeSuffix);
                const statics = value.split(marker);
                const m = /([.?@])?(.*)/.exec(realName);
                parts.push({
                  type: ATTRIBUTE_PART,
                  index: nodeIndex,
                  name: m[2],
                  strings: statics,
                  ctor: m[1] === "." ? PropertyPart : m[1] === "?" ? BooleanAttributePart : m[1] === "@" ? EventPart : AttributePart
                });
              } else {
                parts.push({
                  type: ELEMENT_PART,
                  index: nodeIndex
                });
              }
            }
          }
          for (const name of attrsToRemove) {
            node.removeAttribute(name);
          }
        }
        if (rawTextElement.test(node.tagName)) {
          const strings2 = node.textContent.split(marker);
          const lastIndex = strings2.length - 1;
          if (lastIndex > 0) {
            node.textContent = trustedTypes ? trustedTypes.emptyScript : "";
            for (let i2 = 0; i2 < lastIndex; i2++) {
              node.append(strings2[i2], createMarker());
              walker.nextNode();
              parts.push({ type: CHILD_PART, index: ++nodeIndex });
            }
            node.append(strings2[lastIndex], createMarker());
          }
        }
      } else if (node.nodeType === 8) {
        const data = node.data;
        if (data === markerMatch) {
          parts.push({ type: CHILD_PART, index: nodeIndex });
        } else {
          let i2 = -1;
          while ((i2 = node.data.indexOf(marker, i2 + 1)) !== -1) {
            parts.push({ type: COMMENT_PART, index: nodeIndex });
            i2 += marker.length - 1;
          }
        }
      }
      nodeIndex++;
    }
  }
  static createElement(html, _options) {
    const el = d.createElement("template");
    el.innerHTML = html;
    return el;
  }
}
function resolveDirective(part, value, parent = part, attributeIndex) {
  var _a2, _b2, _c2;
  var _d2;
  if (value === noChange) {
    return value;
  }
  let currentDirective = attributeIndex !== void 0 ? (_a2 = parent.__directives) === null || _a2 === void 0 ? void 0 : _a2[attributeIndex] : parent.__directive;
  const nextDirectiveConstructor = isPrimitive(value) ? void 0 : value["_$litDirective$"];
  if ((currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective.constructor) !== nextDirectiveConstructor) {
    (_b2 = currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective["_$notifyDirectiveConnectionChanged"]) === null || _b2 === void 0 ? void 0 : _b2.call(currentDirective, false);
    if (nextDirectiveConstructor === void 0) {
      currentDirective = void 0;
    } else {
      currentDirective = new nextDirectiveConstructor(part);
      currentDirective._$initialize(part, parent, attributeIndex);
    }
    if (attributeIndex !== void 0) {
      ((_c2 = (_d2 = parent).__directives) !== null && _c2 !== void 0 ? _c2 : _d2.__directives = [])[attributeIndex] = currentDirective;
    } else {
      parent.__directive = currentDirective;
    }
  }
  if (currentDirective !== void 0) {
    value = resolveDirective(part, currentDirective._$resolve(part, value.values), currentDirective, attributeIndex);
  }
  return value;
}
class TemplateInstance {
  constructor(template2, parent) {
    this._parts = [];
    this._$disconnectableChildren = void 0;
    this._$template = template2;
    this._$parent = parent;
  }
  get parentNode() {
    return this._$parent.parentNode;
  }
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _clone(options) {
    var _a2;
    const { el: { content }, parts } = this._$template;
    const fragment = ((_a2 = options === null || options === void 0 ? void 0 : options.creationScope) !== null && _a2 !== void 0 ? _a2 : d).importNode(content, true);
    walker.currentNode = fragment;
    let node = walker.nextNode();
    let nodeIndex = 0;
    let partIndex = 0;
    let templatePart = parts[0];
    while (templatePart !== void 0) {
      if (nodeIndex === templatePart.index) {
        let part;
        if (templatePart.type === CHILD_PART) {
          part = new ChildPart(node, node.nextSibling, this, options);
        } else if (templatePart.type === ATTRIBUTE_PART) {
          part = new templatePart.ctor(node, templatePart.name, templatePart.strings, this, options);
        } else if (templatePart.type === ELEMENT_PART) {
          part = new ElementPart(node, this, options);
        }
        this._parts.push(part);
        templatePart = parts[++partIndex];
      }
      if (nodeIndex !== (templatePart === null || templatePart === void 0 ? void 0 : templatePart.index)) {
        node = walker.nextNode();
        nodeIndex++;
      }
    }
    return fragment;
  }
  _update(values) {
    let i2 = 0;
    for (const part of this._parts) {
      if (part !== void 0) {
        if (part.strings !== void 0) {
          part._$setValue(values, part, i2);
          i2 += part.strings.length - 2;
        } else {
          part._$setValue(values[i2]);
        }
      }
      i2++;
    }
  }
}
class ChildPart {
  constructor(startNode, endNode, parent, options) {
    var _a2;
    this.type = CHILD_PART;
    this._$committedValue = nothing;
    this._$disconnectableChildren = void 0;
    this._$startNode = startNode;
    this._$endNode = endNode;
    this._$parent = parent;
    this.options = options;
    this.__isConnected = (_a2 = options === null || options === void 0 ? void 0 : options.isConnected) !== null && _a2 !== void 0 ? _a2 : true;
    {
      this._textSanitizer = void 0;
    }
  }
  get _$isConnected() {
    var _a2, _b2;
    return (_b2 = (_a2 = this._$parent) === null || _a2 === void 0 ? void 0 : _a2._$isConnected) !== null && _b2 !== void 0 ? _b2 : this.__isConnected;
  }
  get parentNode() {
    let parentNode = wrap(this._$startNode).parentNode;
    const parent = this._$parent;
    if (parent !== void 0 && parentNode.nodeType === 11) {
      parentNode = parent.parentNode;
    }
    return parentNode;
  }
  get startNode() {
    return this._$startNode;
  }
  get endNode() {
    return this._$endNode;
  }
  _$setValue(value, directiveParent = this) {
    if (this.parentNode === null) {
      throw new Error(`This \`ChildPart\` has no \`parentNode\` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's \`innerHTML\` or \`textContent\` can do this.`);
    }
    value = resolveDirective(this, value, directiveParent);
    if (isPrimitive(value)) {
      if (value === nothing || value == null || value === "") {
        if (this._$committedValue !== nothing) {
          this._$clear();
        }
        this._$committedValue = nothing;
      } else if (value !== this._$committedValue && value !== noChange) {
        this._commitText(value);
      }
    } else if (value["_$litType$"] !== void 0) {
      this._commitTemplateResult(value);
    } else if (value.nodeType !== void 0) {
      this._commitNode(value);
    } else if (isIterable(value)) {
      this._commitIterable(value);
    } else {
      this._commitText(value);
    }
  }
  _insert(node, ref = this._$endNode) {
    return wrap(wrap(this._$startNode).parentNode).insertBefore(node, ref);
  }
  _commitNode(value) {
    var _a2;
    if (this._$committedValue !== value) {
      this._$clear();
      if (sanitizerFactoryInternal !== noopSanitizer) {
        const parentNodeName = (_a2 = this._$startNode.parentNode) === null || _a2 === void 0 ? void 0 : _a2.nodeName;
        if (parentNodeName === "STYLE" || parentNodeName === "SCRIPT") {
          let message = "Forbidden";
          {
            if (parentNodeName === "STYLE") {
              message = `Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css\`...\` literals to compose styles, and make do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.`;
            } else {
              message = `Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.`;
            }
          }
          throw new Error(message);
        }
      }
      this._$committedValue = this._insert(value);
    }
  }
  _commitText(value) {
    if (this._$committedValue !== nothing && isPrimitive(this._$committedValue)) {
      const node = wrap(this._$startNode).nextSibling;
      {
        if (this._textSanitizer === void 0) {
          this._textSanitizer = createSanitizer(node, "data", "property");
        }
        value = this._textSanitizer(value);
      }
      node.data = value;
    } else {
      {
        const textNode = document.createTextNode("");
        this._commitNode(textNode);
        if (this._textSanitizer === void 0) {
          this._textSanitizer = createSanitizer(textNode, "data", "property");
        }
        value = this._textSanitizer(value);
        textNode.data = value;
      }
    }
    this._$committedValue = value;
  }
  _commitTemplateResult(result) {
    var _a2;
    const { values, ["_$litType$"]: type } = result;
    const template2 = typeof type === "number" ? this._$getTemplate(result) : (type.el === void 0 && (type.el = Template.createElement(type.h, this.options)), type);
    if (((_a2 = this._$committedValue) === null || _a2 === void 0 ? void 0 : _a2._$template) === template2) {
      this._$committedValue._update(values);
    } else {
      const instance = new TemplateInstance(template2, this);
      const fragment = instance._clone(this.options);
      instance._update(values);
      this._commitNode(fragment);
      this._$committedValue = instance;
    }
  }
  _$getTemplate(result) {
    let template2 = templateCache.get(result.strings);
    if (template2 === void 0) {
      templateCache.set(result.strings, template2 = new Template(result));
    }
    return template2;
  }
  _commitIterable(value) {
    if (!isArray(this._$committedValue)) {
      this._$committedValue = [];
      this._$clear();
    }
    const itemParts = this._$committedValue;
    let partIndex = 0;
    let itemPart;
    for (const item of value) {
      if (partIndex === itemParts.length) {
        itemParts.push(itemPart = new ChildPart(this._insert(createMarker()), this._insert(createMarker()), this, this.options));
      } else {
        itemPart = itemParts[partIndex];
      }
      itemPart._$setValue(item);
      partIndex++;
    }
    if (partIndex < itemParts.length) {
      this._$clear(itemPart && wrap(itemPart._$endNode).nextSibling, partIndex);
      itemParts.length = partIndex;
    }
  }
  _$clear(start = wrap(this._$startNode).nextSibling, from) {
    var _a2;
    (_a2 = this._$notifyConnectionChanged) === null || _a2 === void 0 ? void 0 : _a2.call(this, false, true, from);
    while (start && start !== this._$endNode) {
      const n = wrap(start).nextSibling;
      wrap(start).remove();
      start = n;
    }
  }
  setConnected(isConnected) {
    var _a2;
    if (this._$parent === void 0) {
      this.__isConnected = isConnected;
      (_a2 = this._$notifyConnectionChanged) === null || _a2 === void 0 ? void 0 : _a2.call(this, isConnected);
    } else {
      throw new Error("part.setConnected() may only be called on a RootPart returned from render().");
    }
  }
}
class AttributePart {
  constructor(element, name, strings, parent, options) {
    this.type = ATTRIBUTE_PART;
    this._$committedValue = nothing;
    this._$disconnectableChildren = void 0;
    this.element = element;
    this.name = name;
    this._$parent = parent;
    this.options = options;
    if (strings.length > 2 || strings[0] !== "" || strings[1] !== "") {
      this._$committedValue = new Array(strings.length - 1).fill(new String());
      this.strings = strings;
    } else {
      this._$committedValue = nothing;
    }
    {
      this._sanitizer = void 0;
    }
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$setValue(value, directiveParent = this, valueIndex, noCommit) {
    const strings = this.strings;
    let change = false;
    if (strings === void 0) {
      value = resolveDirective(this, value, directiveParent, 0);
      change = !isPrimitive(value) || value !== this._$committedValue && value !== noChange;
      if (change) {
        this._$committedValue = value;
      }
    } else {
      const values = value;
      value = strings[0];
      let i2, v;
      for (i2 = 0; i2 < strings.length - 1; i2++) {
        v = resolveDirective(this, values[valueIndex + i2], directiveParent, i2);
        if (v === noChange) {
          v = this._$committedValue[i2];
        }
        change || (change = !isPrimitive(v) || v !== this._$committedValue[i2]);
        if (v === nothing) {
          value = nothing;
        } else if (value !== nothing) {
          value += (v !== null && v !== void 0 ? v : "") + strings[i2 + 1];
        }
        this._$committedValue[i2] = v;
      }
    }
    if (change && !noCommit) {
      this._commitValue(value);
    }
  }
  _commitValue(value) {
    if (value === nothing) {
      wrap(this.element).removeAttribute(this.name);
    } else {
      {
        if (this._sanitizer === void 0) {
          this._sanitizer = sanitizerFactoryInternal(this.element, this.name, "attribute");
        }
        value = this._sanitizer(value !== null && value !== void 0 ? value : "");
      }
      wrap(this.element).setAttribute(this.name, value !== null && value !== void 0 ? value : "");
    }
  }
}
class PropertyPart extends AttributePart {
  constructor() {
    super(...arguments);
    this.type = PROPERTY_PART;
  }
  _commitValue(value) {
    {
      if (this._sanitizer === void 0) {
        this._sanitizer = sanitizerFactoryInternal(this.element, this.name, "property");
      }
      value = this._sanitizer(value);
    }
    this.element[this.name] = value === nothing ? void 0 : value;
  }
}
class BooleanAttributePart extends AttributePart {
  constructor() {
    super(...arguments);
    this.type = BOOLEAN_ATTRIBUTE_PART;
  }
  _commitValue(value) {
    if (value && value !== nothing) {
      wrap(this.element).setAttribute(this.name, "");
    } else {
      wrap(this.element).removeAttribute(this.name);
    }
  }
}
class EventPart extends AttributePart {
  constructor(element, name, strings, parent, options) {
    super(element, name, strings, parent, options);
    this.type = EVENT_PART;
    if (this.strings !== void 0) {
      throw new Error(`A \`<${element.localName}>\` has a \`@${name}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`);
    }
  }
  _$setValue(newListener, directiveParent = this) {
    var _a2;
    newListener = (_a2 = resolveDirective(this, newListener, directiveParent, 0)) !== null && _a2 !== void 0 ? _a2 : nothing;
    if (newListener === noChange) {
      return;
    }
    const oldListener = this._$committedValue;
    const shouldRemoveListener = newListener === nothing && oldListener !== nothing || newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive;
    const shouldAddListener = newListener !== nothing && (oldListener === nothing || shouldRemoveListener);
    if (shouldRemoveListener) {
      this.element.removeEventListener(this.name, this, oldListener);
    }
    if (shouldAddListener) {
      this.element.addEventListener(this.name, this, newListener);
    }
    this._$committedValue = newListener;
  }
  handleEvent(event) {
    var _a2, _b2;
    if (typeof this._$committedValue === "function") {
      this._$committedValue.call((_b2 = (_a2 = this.options) === null || _a2 === void 0 ? void 0 : _a2.host) !== null && _b2 !== void 0 ? _b2 : this.element, event);
    } else {
      this._$committedValue.handleEvent(event);
    }
  }
}
class ElementPart {
  constructor(element, parent, options) {
    this.element = element;
    this.type = ELEMENT_PART;
    this._$disconnectableChildren = void 0;
    this._$parent = parent;
    this.options = options;
  }
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$setValue(value) {
    resolveDirective(this, value);
  }
}
const polyfillSupport$1 = window.litHtmlPolyfillSupportDevMode;
polyfillSupport$1 === null || polyfillSupport$1 === void 0 ? void 0 : polyfillSupport$1(Template, ChildPart);
((_d = globalThis.litHtmlVersions) !== null && _d !== void 0 ? _d : globalThis.litHtmlVersions = []).push("2.0.1");
if (globalThis.litHtmlVersions.length > 1) {
  issueWarning$1("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
}
/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/
var _a, _b, _c;
let issueWarning;
{
  const issuedWarnings = (_a = globalThis.litIssuedWarnings) !== null && _a !== void 0 ? _a : globalThis.litIssuedWarnings = new Set();
  issueWarning = (code, warning) => {
    warning += ` See https://lit.dev/msg/${code} for more information.`;
    if (!issuedWarnings.has(warning)) {
      console.warn(warning);
      issuedWarnings.add(warning);
    }
  };
}
class LitElement extends ReactiveElement {
  constructor() {
    super(...arguments);
    this.renderOptions = { host: this };
    this.__childPart = void 0;
  }
  createRenderRoot() {
    var _a2;
    var _b2;
    const renderRoot = super.createRenderRoot();
    (_a2 = (_b2 = this.renderOptions).renderBefore) !== null && _a2 !== void 0 ? _a2 : _b2.renderBefore = renderRoot.firstChild;
    return renderRoot;
  }
  update(changedProperties) {
    const value = this.render();
    if (!this.hasUpdated) {
      this.renderOptions.isConnected = this.isConnected;
    }
    super.update(changedProperties);
    this.__childPart = render(value, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback();
    (_a2 = this.__childPart) === null || _a2 === void 0 ? void 0 : _a2.setConnected(true);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback();
    (_a2 = this.__childPart) === null || _a2 === void 0 ? void 0 : _a2.setConnected(false);
  }
  render() {
    return noChange;
  }
}
LitElement["finalized"] = true;
LitElement["_$litElement$"] = true;
(_b = globalThis.litElementHydrateSupport) === null || _b === void 0 ? void 0 : _b.call(globalThis, { LitElement });
const polyfillSupport = globalThis.litElementPolyfillSupportDevMode;
polyfillSupport === null || polyfillSupport === void 0 ? void 0 : polyfillSupport({ LitElement });
{
  LitElement["finalize"] = function() {
    const finalized2 = ReactiveElement.finalize.call(this);
    if (!finalized2) {
      return false;
    }
    const warnRemovedOrRenamed = (obj2, name, renamed = false) => {
      if (obj2.hasOwnProperty(name)) {
        const ctorName = (typeof obj2 === "function" ? obj2 : obj2.constructor).name;
        issueWarning(renamed ? "renamed-api" : "removed-api", `\`${name}\` is implemented on class ${ctorName}. It has been ${renamed ? "renamed" : "removed"} in this version of LitElement.`);
      }
    };
    warnRemovedOrRenamed(this, "render");
    warnRemovedOrRenamed(this, "getStyles", true);
    warnRemovedOrRenamed(this.prototype, "adoptStyles");
    return true;
  };
}
((_c = globalThis.litElementVersions) !== null && _c !== void 0 ? _c : globalThis.litElementVersions = []).push("3.0.1");
if (globalThis.litElementVersions.length > 1) {
  issueWarning("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
}
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var pickr_min = { exports: {} };
/*! Pickr 1.8.2 MIT | https://github.com/Simonwep/pickr */
(function(module, exports) {
  !function(t, e) {
    module.exports = e();
  }(self, function() {
    return (() => {
      var t = { d: (e2, o2) => {
        for (var n2 in o2)
          t.o(o2, n2) && !t.o(e2, n2) && Object.defineProperty(e2, n2, { enumerable: true, get: o2[n2] });
      }, o: (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), r: (t2) => {
        typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
      } }, e = {};
      t.d(e, { default: () => L });
      var o = {};
      function n(t2, e2, o2, n2, i3 = {}) {
        e2 instanceof HTMLCollection || e2 instanceof NodeList ? e2 = Array.from(e2) : Array.isArray(e2) || (e2 = [e2]), Array.isArray(o2) || (o2 = [o2]);
        for (const s2 of e2)
          for (const e3 of o2)
            s2[t2](e3, n2, __spreadValues({ capture: false }, i3));
        return Array.prototype.slice.call(arguments, 1);
      }
      t.r(o), t.d(o, { adjustableInputNumbers: () => p, createElementFromString: () => r, createFromTemplate: () => a, eventPath: () => l, off: () => s, on: () => i2, resolveElement: () => c });
      const i2 = n.bind(null, "addEventListener"), s = n.bind(null, "removeEventListener");
      function r(t2) {
        const e2 = document.createElement("div");
        return e2.innerHTML = t2.trim(), e2.firstElementChild;
      }
      function a(t2) {
        const e2 = (t3, e3) => {
          const o3 = t3.getAttribute(e3);
          return t3.removeAttribute(e3), o3;
        }, o2 = (t3, n2 = {}) => {
          const i3 = e2(t3, ":obj"), s2 = e2(t3, ":ref"), r2 = i3 ? n2[i3] = {} : n2;
          s2 && (n2[s2] = t3);
          for (const n3 of Array.from(t3.children)) {
            const t4 = e2(n3, ":arr"), i4 = o2(n3, t4 ? {} : r2);
            t4 && (r2[t4] || (r2[t4] = [])).push(Object.keys(i4).length ? i4 : n3);
          }
          return n2;
        };
        return o2(r(t2));
      }
      function l(t2) {
        let e2 = t2.path || t2.composedPath && t2.composedPath();
        if (e2)
          return e2;
        let o2 = t2.target.parentElement;
        for (e2 = [t2.target, o2]; o2 = o2.parentElement; )
          e2.push(o2);
        return e2.push(document, window), e2;
      }
      function c(t2) {
        return t2 instanceof Element ? t2 : typeof t2 == "string" ? t2.split(/>>/g).reduce((t3, e2, o2, n2) => (t3 = t3.querySelector(e2), o2 < n2.length - 1 ? t3.shadowRoot : t3), document) : null;
      }
      function p(t2, e2 = (t3) => t3) {
        function o2(o3) {
          const n2 = [1e-3, 0.01, 0.1][Number(o3.shiftKey || 2 * o3.ctrlKey)] * (o3.deltaY < 0 ? 1 : -1);
          let i3 = 0, s2 = t2.selectionStart;
          t2.value = t2.value.replace(/[\d.]+/g, (t3, o4) => o4 <= s2 && o4 + t3.length >= s2 ? (s2 = o4, e2(Number(t3), n2, i3)) : (i3++, t3)), t2.focus(), t2.setSelectionRange(s2, s2), o3.preventDefault(), t2.dispatchEvent(new Event("input"));
        }
        i2(t2, "focus", () => i2(window, "wheel", o2, { passive: false })), i2(t2, "blur", () => s(window, "wheel", o2));
      }
      const { min: u, max: h, floor: d2, round: m } = Math;
      function f(t2, e2, o2) {
        e2 /= 100, o2 /= 100;
        const n2 = d2(t2 = t2 / 360 * 6), i3 = t2 - n2, s2 = o2 * (1 - e2), r2 = o2 * (1 - i3 * e2), a2 = o2 * (1 - (1 - i3) * e2), l2 = n2 % 6;
        return [255 * [o2, r2, s2, s2, a2, o2][l2], 255 * [a2, o2, o2, r2, s2, s2][l2], 255 * [s2, s2, a2, o2, o2, r2][l2]];
      }
      function v(t2, e2, o2) {
        const n2 = (2 - (e2 /= 100)) * (o2 /= 100) / 2;
        return n2 !== 0 && (e2 = n2 === 1 ? 0 : n2 < 0.5 ? e2 * o2 / (2 * n2) : e2 * o2 / (2 - 2 * n2)), [t2, 100 * e2, 100 * n2];
      }
      function b(t2, e2, o2) {
        const n2 = u(t2 /= 255, e2 /= 255, o2 /= 255), i3 = h(t2, e2, o2), s2 = i3 - n2;
        let r2, a2;
        if (s2 === 0)
          r2 = a2 = 0;
        else {
          a2 = s2 / i3;
          const n3 = ((i3 - t2) / 6 + s2 / 2) / s2, l2 = ((i3 - e2) / 6 + s2 / 2) / s2, c2 = ((i3 - o2) / 6 + s2 / 2) / s2;
          t2 === i3 ? r2 = c2 - l2 : e2 === i3 ? r2 = 1 / 3 + n3 - c2 : o2 === i3 && (r2 = 2 / 3 + l2 - n3), r2 < 0 ? r2 += 1 : r2 > 1 && (r2 -= 1);
        }
        return [360 * r2, 100 * a2, 100 * i3];
      }
      function y(t2, e2, o2, n2) {
        e2 /= 100, o2 /= 100;
        return [...b(255 * (1 - u(1, (t2 /= 100) * (1 - (n2 /= 100)) + n2)), 255 * (1 - u(1, e2 * (1 - n2) + n2)), 255 * (1 - u(1, o2 * (1 - n2) + n2)))];
      }
      function g(t2, e2, o2) {
        e2 /= 100;
        const n2 = 2 * (e2 *= (o2 /= 100) < 0.5 ? o2 : 1 - o2) / (o2 + e2) * 100, i3 = 100 * (o2 + e2);
        return [t2, isNaN(n2) ? 0 : n2, i3];
      }
      function _(t2) {
        return b(...t2.match(/.{2}/g).map((t3) => parseInt(t3, 16)));
      }
      function w(t2) {
        t2 = t2.match(/^[a-zA-Z]+$/) ? function(t3) {
          if (t3.toLowerCase() === "black")
            return "#000";
          const e3 = document.createElement("canvas").getContext("2d");
          return e3.fillStyle = t3, e3.fillStyle === "#000" ? null : e3.fillStyle;
        }(t2) : t2;
        const e2 = { cmyk: /^cmyk[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)/i, rgba: /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i, hsla: /^((hsla)|hsl)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i, hsva: /^((hsva)|hsv)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i, hexa: /^#?(([\dA-Fa-f]{3,4})|([\dA-Fa-f]{6})|([\dA-Fa-f]{8}))$/i }, o2 = (t3) => t3.map((t4) => /^(|\d+)\.\d+|\d+$/.test(t4) ? Number(t4) : void 0);
        let n2;
        t:
          for (const i3 in e2) {
            if (!(n2 = e2[i3].exec(t2)))
              continue;
            const s2 = (t3) => !!n2[2] == (typeof t3 == "number");
            switch (i3) {
              case "cmyk": {
                const [, t3, e3, s3, r2] = o2(n2);
                if (t3 > 100 || e3 > 100 || s3 > 100 || r2 > 100)
                  break t;
                return { values: y(t3, e3, s3, r2), type: i3 };
              }
              case "rgba": {
                const [, , , t3, e3, r2, a2] = o2(n2);
                if (t3 > 255 || e3 > 255 || r2 > 255 || a2 < 0 || a2 > 1 || !s2(a2))
                  break t;
                return { values: [...b(t3, e3, r2), a2], a: a2, type: i3 };
              }
              case "hexa": {
                let [, t3] = n2;
                t3.length !== 4 && t3.length !== 3 || (t3 = t3.split("").map((t4) => t4 + t4).join(""));
                const e3 = t3.substring(0, 6);
                let o3 = t3.substring(6);
                return o3 = o3 ? parseInt(o3, 16) / 255 : void 0, { values: [..._(e3), o3], a: o3, type: i3 };
              }
              case "hsla": {
                const [, , , t3, e3, r2, a2] = o2(n2);
                if (t3 > 360 || e3 > 100 || r2 > 100 || a2 < 0 || a2 > 1 || !s2(a2))
                  break t;
                return { values: [...g(t3, e3, r2), a2], a: a2, type: i3 };
              }
              case "hsva": {
                const [, , , t3, e3, r2, a2] = o2(n2);
                if (t3 > 360 || e3 > 100 || r2 > 100 || a2 < 0 || a2 > 1 || !s2(a2))
                  break t;
                return { values: [t3, e3, r2, a2], a: a2, type: i3 };
              }
            }
          }
        return { values: null, type: null };
      }
      function A(t2 = 0, e2 = 0, o2 = 0, n2 = 1) {
        const i3 = (t3, e3) => (o3 = -1) => e3(~o3 ? t3.map((t4) => Number(t4.toFixed(o3))) : t3), s2 = { h: t2, s: e2, v: o2, a: n2, toHSVA() {
          const t3 = [s2.h, s2.s, s2.v, s2.a];
          return t3.toString = i3(t3, (t4) => `hsva(${t4[0]}, ${t4[1]}%, ${t4[2]}%, ${s2.a})`), t3;
        }, toHSLA() {
          const t3 = [...v(s2.h, s2.s, s2.v), s2.a];
          return t3.toString = i3(t3, (t4) => `hsla(${t4[0]}, ${t4[1]}%, ${t4[2]}%, ${s2.a})`), t3;
        }, toRGBA() {
          const t3 = [...f(s2.h, s2.s, s2.v), s2.a];
          return t3.toString = i3(t3, (t4) => `rgba(${t4[0]}, ${t4[1]}, ${t4[2]}, ${s2.a})`), t3;
        }, toCMYK() {
          const t3 = function(t4, e3, o3) {
            const n3 = f(t4, e3, o3), i4 = n3[0] / 255, s3 = n3[1] / 255, r2 = n3[2] / 255, a2 = u(1 - i4, 1 - s3, 1 - r2);
            return [100 * (a2 === 1 ? 0 : (1 - i4 - a2) / (1 - a2)), 100 * (a2 === 1 ? 0 : (1 - s3 - a2) / (1 - a2)), 100 * (a2 === 1 ? 0 : (1 - r2 - a2) / (1 - a2)), 100 * a2];
          }(s2.h, s2.s, s2.v);
          return t3.toString = i3(t3, (t4) => `cmyk(${t4[0]}%, ${t4[1]}%, ${t4[2]}%, ${t4[3]}%)`), t3;
        }, toHEXA() {
          const t3 = function(t4, e4, o3) {
            return f(t4, e4, o3).map((t5) => m(t5).toString(16).padStart(2, "0"));
          }(s2.h, s2.s, s2.v), e3 = s2.a >= 1 ? "" : Number((255 * s2.a).toFixed(0)).toString(16).toUpperCase().padStart(2, "0");
          return e3 && t3.push(e3), t3.toString = () => `#${t3.join("").toUpperCase()}`, t3;
        }, clone: () => A(s2.h, s2.s, s2.v, s2.a) };
        return s2;
      }
      const C = (t2) => Math.max(Math.min(t2, 1), 0);
      function $(t2) {
        const e2 = { options: Object.assign({ lock: null, onchange: () => 0, onstop: () => 0 }, t2), _keyboard(t3) {
          const { options: o3 } = e2, { type: n3, key: i3 } = t3;
          if (document.activeElement === o3.wrapper) {
            const { lock: o4 } = e2.options, s2 = i3 === "ArrowUp", r3 = i3 === "ArrowRight", a2 = i3 === "ArrowDown", l2 = i3 === "ArrowLeft";
            if (n3 === "keydown" && (s2 || r3 || a2 || l2)) {
              let n4 = 0, i4 = 0;
              o4 === "v" ? n4 = s2 || r3 ? 1 : -1 : o4 === "h" ? n4 = s2 || r3 ? -1 : 1 : (i4 = s2 ? -1 : a2 ? 1 : 0, n4 = l2 ? -1 : r3 ? 1 : 0), e2.update(C(e2.cache.x + 0.01 * n4), C(e2.cache.y + 0.01 * i4)), t3.preventDefault();
            } else
              i3.startsWith("Arrow") && (e2.options.onstop(), t3.preventDefault());
          }
        }, _tapstart(t3) {
          i2(document, ["mouseup", "touchend", "touchcancel"], e2._tapstop), i2(document, ["mousemove", "touchmove"], e2._tapmove), t3.cancelable && t3.preventDefault(), e2._tapmove(t3);
        }, _tapmove(t3) {
          const { options: o3, cache: n3 } = e2, { lock: i3, element: s2, wrapper: r3 } = o3, a2 = r3.getBoundingClientRect();
          let l2 = 0, c2 = 0;
          if (t3) {
            const e3 = t3 && t3.touches && t3.touches[0];
            l2 = t3 ? (e3 || t3).clientX : 0, c2 = t3 ? (e3 || t3).clientY : 0, l2 < a2.left ? l2 = a2.left : l2 > a2.left + a2.width && (l2 = a2.left + a2.width), c2 < a2.top ? c2 = a2.top : c2 > a2.top + a2.height && (c2 = a2.top + a2.height), l2 -= a2.left, c2 -= a2.top;
          } else
            n3 && (l2 = n3.x * a2.width, c2 = n3.y * a2.height);
          i3 !== "h" && (s2.style.left = `calc(${l2 / a2.width * 100}% - ${s2.offsetWidth / 2}px)`), i3 !== "v" && (s2.style.top = `calc(${c2 / a2.height * 100}% - ${s2.offsetHeight / 2}px)`), e2.cache = { x: l2 / a2.width, y: c2 / a2.height };
          const p2 = C(l2 / a2.width), u2 = C(c2 / a2.height);
          switch (i3) {
            case "v":
              return o3.onchange(p2);
            case "h":
              return o3.onchange(u2);
            default:
              return o3.onchange(p2, u2);
          }
        }, _tapstop() {
          e2.options.onstop(), s(document, ["mouseup", "touchend", "touchcancel"], e2._tapstop), s(document, ["mousemove", "touchmove"], e2._tapmove);
        }, trigger() {
          e2._tapmove();
        }, update(t3 = 0, o3 = 0) {
          const { left: n3, top: i3, width: s2, height: r3 } = e2.options.wrapper.getBoundingClientRect();
          e2.options.lock === "h" && (o3 = t3), e2._tapmove({ clientX: n3 + s2 * t3, clientY: i3 + r3 * o3 });
        }, destroy() {
          const { options: t3, _tapstart: o3, _keyboard: n3 } = e2;
          s(document, ["keydown", "keyup"], n3), s([t3.wrapper, t3.element], "mousedown", o3), s([t3.wrapper, t3.element], "touchstart", o3, { passive: false });
        } }, { options: o2, _tapstart: n2, _keyboard: r2 } = e2;
        return i2([o2.wrapper, o2.element], "mousedown", n2), i2([o2.wrapper, o2.element], "touchstart", n2, { passive: false }), i2(document, ["keydown", "keyup"], r2), e2;
      }
      function k(t2 = {}) {
        t2 = Object.assign({ onchange: () => 0, className: "", elements: [] }, t2);
        const e2 = i2(t2.elements, "click", (e3) => {
          t2.elements.forEach((o2) => o2.classList[e3.target === o2 ? "add" : "remove"](t2.className)), t2.onchange(e3), e3.stopPropagation();
        });
        return { destroy: () => s(...e2) };
      }
      const S = { variantFlipOrder: { start: "sme", middle: "mse", end: "ems" }, positionFlipOrder: { top: "tbrl", right: "rltb", bottom: "btrl", left: "lrbt" }, position: "bottom", margin: 8 }, O = (t2, e2, o2) => {
        const { container: n2, margin: i3, position: s2, variantFlipOrder: r2, positionFlipOrder: a2 } = __spreadValues(__spreadValues({ container: document.documentElement.getBoundingClientRect() }, S), o2), { left: l2, top: c2 } = e2.style;
        e2.style.left = "0", e2.style.top = "0";
        const p2 = t2.getBoundingClientRect(), u2 = e2.getBoundingClientRect(), h2 = { t: p2.top - u2.height - i3, b: p2.bottom + i3, r: p2.right + i3, l: p2.left - u2.width - i3 }, d3 = { vs: p2.left, vm: p2.left + p2.width / 2 + -u2.width / 2, ve: p2.left + p2.width - u2.width, hs: p2.top, hm: p2.bottom - p2.height / 2 - u2.height / 2, he: p2.bottom - u2.height }, [m2, f2 = "middle"] = s2.split("-"), v2 = a2[m2], b2 = r2[f2], { top: y2, left: g2, bottom: _2, right: w2 } = n2;
        for (const t3 of v2) {
          const o3 = t3 === "t" || t3 === "b", n3 = h2[t3], [i4, s3] = o3 ? ["top", "left"] : ["left", "top"], [r3, a3] = o3 ? [u2.height, u2.width] : [u2.width, u2.height], [l3, c3] = o3 ? [_2, w2] : [w2, _2], [p3, m3] = o3 ? [y2, g2] : [g2, y2];
          if (!(n3 < p3 || n3 + r3 > l3))
            for (const r4 of b2) {
              const l4 = d3[(o3 ? "v" : "h") + r4];
              if (!(l4 < m3 || l4 + a3 > c3))
                return e2.style[s3] = l4 - u2[s3] + "px", e2.style[i4] = n3 - u2[i4] + "px", t3 + r4;
            }
        }
        return e2.style.left = l2, e2.style.top = c2, null;
      };
      function E(t2, e2, o2) {
        return e2 in t2 ? Object.defineProperty(t2, e2, { value: o2, enumerable: true, configurable: true, writable: true }) : t2[e2] = o2, t2;
      }
      class L {
        constructor(t2) {
          E(this, "_initializingActive", true), E(this, "_recalc", true), E(this, "_nanopop", null), E(this, "_root", null), E(this, "_color", A()), E(this, "_lastColor", A()), E(this, "_swatchColors", []), E(this, "_setupAnimationFrame", null), E(this, "_eventListener", { init: [], save: [], hide: [], show: [], clear: [], change: [], changestop: [], cancel: [], swatchselect: [] }), this.options = t2 = Object.assign(__spreadValues({}, L.DEFAULT_OPTIONS), t2);
          const { swatches: e2, components: o2, theme: n2, sliders: i3, lockOpacity: s2, padding: r2 } = t2;
          ["nano", "monolith"].includes(n2) && !i3 && (t2.sliders = "h"), o2.interaction || (o2.interaction = {});
          const { preview: a2, opacity: l2, hue: c2, palette: p2 } = o2;
          o2.opacity = !s2 && l2, o2.palette = p2 || a2 || l2 || c2, this._preBuild(), this._buildComponents(), this._bindEvents(), this._finalBuild(), e2 && e2.length && e2.forEach((t3) => this.addSwatch(t3));
          const { button: u2, app: h2 } = this._root;
          this._nanopop = ((t3, e3, o3) => {
            const n3 = typeof t3 != "object" || t3 instanceof HTMLElement ? __spreadValues({ reference: t3, popper: e3 }, o3) : t3;
            return { update(t4 = n3) {
              const { reference: e4, popper: o4 } = Object.assign(n3, t4);
              if (!o4 || !e4)
                throw new Error("Popper- or reference-element missing.");
              return O(e4, o4, n3);
            } };
          })(u2, h2, { margin: r2 }), u2.setAttribute("role", "button"), u2.setAttribute("aria-label", this._t("btn:toggle"));
          const d3 = this;
          this._setupAnimationFrame = requestAnimationFrame(function e3() {
            if (!h2.offsetWidth)
              return requestAnimationFrame(e3);
            d3.setColor(t2.default), d3._rePositioningPicker(), t2.defaultRepresentation && (d3._representation = t2.defaultRepresentation, d3.setColorRepresentation(d3._representation)), t2.showAlways && d3.show(), d3._initializingActive = false, d3._emit("init");
          });
        }
        _preBuild() {
          const { options: t2 } = this;
          for (const e2 of ["el", "container"])
            t2[e2] = c(t2[e2]);
          this._root = ((t3) => {
            const { components: e2, useAsButton: o2, inline: n2, appClass: i3, theme: s2, lockOpacity: r2 } = t3.options, l2 = (t4) => t4 ? "" : 'style="display:none" hidden', c2 = (e3) => t3._t(e3), p2 = a(`
      <div :ref="root" class="pickr">

        ${o2 ? "" : '<button type="button" :ref="button" class="pcr-button"></button>'}

        <div :ref="app" class="pcr-app ${i3 || ""}" data-theme="${s2}" ${n2 ? 'style="position: unset"' : ""} aria-label="${c2("ui:dialog")}" role="window">
          <div class="pcr-selection" ${l2(e2.palette)}>
            <div :obj="preview" class="pcr-color-preview" ${l2(e2.preview)}>
              <button type="button" :ref="lastColor" class="pcr-last-color" aria-label="${c2("btn:last-color")}"></button>
              <div :ref="currentColor" class="pcr-current-color"></div>
            </div>

            <div :obj="palette" class="pcr-color-palette">
              <div :ref="picker" class="pcr-picker"></div>
              <div :ref="palette" class="pcr-palette" tabindex="0" aria-label="${c2("aria:palette")}" role="listbox"></div>
            </div>

            <div :obj="hue" class="pcr-color-chooser" ${l2(e2.hue)}>
              <div :ref="picker" class="pcr-picker"></div>
              <div :ref="slider" class="pcr-hue pcr-slider" tabindex="0" aria-label="${c2("aria:hue")}" role="slider"></div>
            </div>

            <div :obj="opacity" class="pcr-color-opacity" ${l2(e2.opacity)}>
              <div :ref="picker" class="pcr-picker"></div>
              <div :ref="slider" class="pcr-opacity pcr-slider" tabindex="0" aria-label="${c2("aria:opacity")}" role="slider"></div>
            </div>
          </div>

          <div class="pcr-swatches ${e2.palette ? "" : "pcr-last"}" :ref="swatches"></div>

          <div :obj="interaction" class="pcr-interaction" ${l2(Object.keys(e2.interaction).length)}>
            <input :ref="result" class="pcr-result" type="text" spellcheck="false" ${l2(e2.interaction.input)} aria-label="${c2("aria:input")}">

            <input :arr="options" class="pcr-type" data-type="HEXA" value="${r2 ? "HEX" : "HEXA"}" type="button" ${l2(e2.interaction.hex)}>
            <input :arr="options" class="pcr-type" data-type="RGBA" value="${r2 ? "RGB" : "RGBA"}" type="button" ${l2(e2.interaction.rgba)}>
            <input :arr="options" class="pcr-type" data-type="HSLA" value="${r2 ? "HSL" : "HSLA"}" type="button" ${l2(e2.interaction.hsla)}>
            <input :arr="options" class="pcr-type" data-type="HSVA" value="${r2 ? "HSV" : "HSVA"}" type="button" ${l2(e2.interaction.hsva)}>
            <input :arr="options" class="pcr-type" data-type="CMYK" value="CMYK" type="button" ${l2(e2.interaction.cmyk)}>

            <input :ref="save" class="pcr-save" value="${c2("btn:save")}" type="button" ${l2(e2.interaction.save)} aria-label="${c2("aria:btn:save")}">
            <input :ref="cancel" class="pcr-cancel" value="${c2("btn:cancel")}" type="button" ${l2(e2.interaction.cancel)} aria-label="${c2("aria:btn:cancel")}">
            <input :ref="clear" class="pcr-clear" value="${c2("btn:clear")}" type="button" ${l2(e2.interaction.clear)} aria-label="${c2("aria:btn:clear")}">
          </div>
        </div>
      </div>
    `), u2 = p2.interaction;
            return u2.options.find((t4) => !t4.hidden && !t4.classList.add("active")), u2.type = () => u2.options.find((t4) => t4.classList.contains("active")), p2;
          })(this), t2.useAsButton && (this._root.button = t2.el), t2.container.appendChild(this._root.root);
        }
        _finalBuild() {
          const t2 = this.options, e2 = this._root;
          if (t2.container.removeChild(e2.root), t2.inline) {
            const o2 = t2.el.parentElement;
            t2.el.nextSibling ? o2.insertBefore(e2.app, t2.el.nextSibling) : o2.appendChild(e2.app);
          } else
            t2.container.appendChild(e2.app);
          t2.useAsButton ? t2.inline && t2.el.remove() : t2.el.parentNode.replaceChild(e2.root, t2.el), t2.disabled && this.disable(), t2.comparison || (e2.button.style.transition = "none", t2.useAsButton || (e2.preview.lastColor.style.transition = "none")), this.hide();
        }
        _buildComponents() {
          const t2 = this, e2 = this.options.components, o2 = (t2.options.sliders || "v").repeat(2), [n2, i3] = o2.match(/^[vh]+$/g) ? o2 : [], s2 = () => this._color || (this._color = this._lastColor.clone()), r2 = { palette: $({ element: t2._root.palette.picker, wrapper: t2._root.palette.palette, onstop: () => t2._emit("changestop", "slider", t2), onchange(o3, n3) {
            if (!e2.palette)
              return;
            const i4 = s2(), { _root: r3, options: a2 } = t2, { lastColor: l2, currentColor: c2 } = r3.preview;
            t2._recalc && (i4.s = 100 * o3, i4.v = 100 - 100 * n3, i4.v < 0 && (i4.v = 0), t2._updateOutput("slider"));
            const p2 = i4.toRGBA().toString(0);
            this.element.style.background = p2, this.wrapper.style.background = `
                        linear-gradient(to top, rgba(0, 0, 0, ${i4.a}), transparent),
                        linear-gradient(to left, hsla(${i4.h}, 100%, 50%, ${i4.a}), rgba(255, 255, 255, ${i4.a}))
                    `, a2.comparison ? a2.useAsButton || t2._lastColor || l2.style.setProperty("--pcr-color", p2) : (r3.button.style.setProperty("--pcr-color", p2), r3.button.classList.remove("clear"));
            const u2 = i4.toHEXA().toString();
            for (const { el: e3, color: o4 } of t2._swatchColors)
              e3.classList[u2 === o4.toHEXA().toString() ? "add" : "remove"]("pcr-active");
            c2.style.setProperty("--pcr-color", p2);
          } }), hue: $({ lock: i3 === "v" ? "h" : "v", element: t2._root.hue.picker, wrapper: t2._root.hue.slider, onstop: () => t2._emit("changestop", "slider", t2), onchange(o3) {
            if (!e2.hue || !e2.palette)
              return;
            const n3 = s2();
            t2._recalc && (n3.h = 360 * o3), this.element.style.backgroundColor = `hsl(${n3.h}, 100%, 50%)`, r2.palette.trigger();
          } }), opacity: $({ lock: n2 === "v" ? "h" : "v", element: t2._root.opacity.picker, wrapper: t2._root.opacity.slider, onstop: () => t2._emit("changestop", "slider", t2), onchange(o3) {
            if (!e2.opacity || !e2.palette)
              return;
            const n3 = s2();
            t2._recalc && (n3.a = Math.round(100 * o3) / 100), this.element.style.background = `rgba(0, 0, 0, ${n3.a})`, r2.palette.trigger();
          } }), selectable: k({ elements: t2._root.interaction.options, className: "active", onchange(e3) {
            t2._representation = e3.target.getAttribute("data-type").toUpperCase(), t2._recalc && t2._updateOutput("swatch");
          } }) };
          this._components = r2;
        }
        _bindEvents() {
          const { _root: t2, options: e2 } = this, o2 = [i2(t2.interaction.clear, "click", () => this._clearColor()), i2([t2.interaction.cancel, t2.preview.lastColor], "click", () => {
            this.setHSVA(...(this._lastColor || this._color).toHSVA(), true), this._emit("cancel");
          }), i2(t2.interaction.save, "click", () => {
            !this.applyColor() && !e2.showAlways && this.hide();
          }), i2(t2.interaction.result, ["keyup", "input"], (t3) => {
            this.setColor(t3.target.value, true) && !this._initializingActive && (this._emit("change", this._color, "input", this), this._emit("changestop", "input", this)), t3.stopImmediatePropagation();
          }), i2(t2.interaction.result, ["focus", "blur"], (t3) => {
            this._recalc = t3.type === "blur", this._recalc && this._updateOutput(null);
          }), i2([t2.palette.palette, t2.palette.picker, t2.hue.slider, t2.hue.picker, t2.opacity.slider, t2.opacity.picker], ["mousedown", "touchstart"], () => this._recalc = true, { passive: true })];
          if (!e2.showAlways) {
            const n2 = e2.closeWithKey;
            o2.push(i2(t2.button, "click", () => this.isOpen() ? this.hide() : this.show()), i2(document, "keyup", (t3) => this.isOpen() && (t3.key === n2 || t3.code === n2) && this.hide()), i2(document, ["touchstart", "mousedown"], (e3) => {
              this.isOpen() && !l(e3).some((e4) => e4 === t2.app || e4 === t2.button) && this.hide();
            }, { capture: true }));
          }
          if (e2.adjustableNumbers) {
            const e3 = { rgba: [255, 255, 255, 1], hsva: [360, 100, 100, 1], hsla: [360, 100, 100, 1], cmyk: [100, 100, 100, 100] };
            p(t2.interaction.result, (t3, o3, n2) => {
              const i3 = e3[this.getColorRepresentation().toLowerCase()];
              if (i3) {
                const e4 = i3[n2], s2 = t3 + (e4 >= 100 ? 1e3 * o3 : o3);
                return s2 <= 0 ? 0 : Number((s2 < e4 ? s2 : e4).toPrecision(3));
              }
              return t3;
            });
          }
          if (e2.autoReposition && !e2.inline) {
            let t3 = null;
            const n2 = this;
            o2.push(i2(window, ["scroll", "resize"], () => {
              n2.isOpen() && (e2.closeOnScroll && n2.hide(), t3 === null ? (t3 = setTimeout(() => t3 = null, 100), requestAnimationFrame(function e3() {
                n2._rePositioningPicker(), t3 !== null && requestAnimationFrame(e3);
              })) : (clearTimeout(t3), t3 = setTimeout(() => t3 = null, 100)));
            }, { capture: true }));
          }
          this._eventBindings = o2;
        }
        _rePositioningPicker() {
          const { options: t2 } = this;
          if (!t2.inline) {
            if (!this._nanopop.update({ container: document.body.getBoundingClientRect(), position: t2.position })) {
              const t3 = this._root.app, e2 = t3.getBoundingClientRect();
              t3.style.top = (window.innerHeight - e2.height) / 2 + "px", t3.style.left = (window.innerWidth - e2.width) / 2 + "px";
            }
          }
        }
        _updateOutput(t2) {
          const { _root: e2, _color: o2, options: n2 } = this;
          if (e2.interaction.type()) {
            const t3 = `to${e2.interaction.type().getAttribute("data-type")}`;
            e2.interaction.result.value = typeof o2[t3] == "function" ? o2[t3]().toString(n2.outputPrecision) : "";
          }
          !this._initializingActive && this._recalc && this._emit("change", o2, t2, this);
        }
        _clearColor(t2 = false) {
          const { _root: e2, options: o2 } = this;
          o2.useAsButton || e2.button.style.setProperty("--pcr-color", "rgba(0, 0, 0, 0.15)"), e2.button.classList.add("clear"), o2.showAlways || this.hide(), this._lastColor = null, this._initializingActive || t2 || (this._emit("save", null), this._emit("clear"));
        }
        _parseLocalColor(t2) {
          const { values: e2, type: o2, a: n2 } = w(t2), { lockOpacity: i3 } = this.options, s2 = n2 !== void 0 && n2 !== 1;
          return e2 && e2.length === 3 && (e2[3] = void 0), { values: !e2 || i3 && s2 ? null : e2, type: o2 };
        }
        _t(t2) {
          return this.options.i18n[t2] || L.I18N_DEFAULTS[t2];
        }
        _emit(t2, ...e2) {
          this._eventListener[t2].forEach((t3) => t3(...e2, this));
        }
        on(t2, e2) {
          return this._eventListener[t2].push(e2), this;
        }
        off(t2, e2) {
          const o2 = this._eventListener[t2] || [], n2 = o2.indexOf(e2);
          return ~n2 && o2.splice(n2, 1), this;
        }
        addSwatch(t2) {
          const { values: e2 } = this._parseLocalColor(t2);
          if (e2) {
            const { _swatchColors: t3, _root: o2 } = this, n2 = A(...e2), s2 = r(`<button type="button" style="--pcr-color: ${n2.toRGBA().toString(0)}" aria-label="${this._t("btn:swatch")}"/>`);
            return o2.swatches.appendChild(s2), t3.push({ el: s2, color: n2 }), this._eventBindings.push(i2(s2, "click", () => {
              this.setHSVA(...n2.toHSVA(), true), this._emit("swatchselect", n2), this._emit("change", n2, "swatch", this);
            })), true;
          }
          return false;
        }
        removeSwatch(t2) {
          const e2 = this._swatchColors[t2];
          if (e2) {
            const { el: o2 } = e2;
            return this._root.swatches.removeChild(o2), this._swatchColors.splice(t2, 1), true;
          }
          return false;
        }
        applyColor(t2 = false) {
          const { preview: e2, button: o2 } = this._root, n2 = this._color.toRGBA().toString(0);
          return e2.lastColor.style.setProperty("--pcr-color", n2), this.options.useAsButton || o2.style.setProperty("--pcr-color", n2), o2.classList.remove("clear"), this._lastColor = this._color.clone(), this._initializingActive || t2 || this._emit("save", this._color), this;
        }
        destroy() {
          cancelAnimationFrame(this._setupAnimationFrame), this._eventBindings.forEach((t2) => s(...t2)), Object.keys(this._components).forEach((t2) => this._components[t2].destroy());
        }
        destroyAndRemove() {
          this.destroy();
          const { root: t2, app: e2 } = this._root;
          t2.parentElement && t2.parentElement.removeChild(t2), e2.parentElement.removeChild(e2), Object.keys(this).forEach((t3) => this[t3] = null);
        }
        hide() {
          return !!this.isOpen() && (this._root.app.classList.remove("visible"), this._emit("hide"), true);
        }
        show() {
          return !this.options.disabled && !this.isOpen() && (this._root.app.classList.add("visible"), this._rePositioningPicker(), this._emit("show", this._color), this);
        }
        isOpen() {
          return this._root.app.classList.contains("visible");
        }
        setHSVA(t2 = 360, e2 = 0, o2 = 0, n2 = 1, i3 = false) {
          const s2 = this._recalc;
          if (this._recalc = false, t2 < 0 || t2 > 360 || e2 < 0 || e2 > 100 || o2 < 0 || o2 > 100 || n2 < 0 || n2 > 1)
            return false;
          this._color = A(t2, e2, o2, n2);
          const { hue: r2, opacity: a2, palette: l2 } = this._components;
          return r2.update(t2 / 360), a2.update(n2), l2.update(e2 / 100, 1 - o2 / 100), i3 || this.applyColor(), s2 && this._updateOutput(), this._recalc = s2, true;
        }
        setColor(t2, e2 = false) {
          if (t2 === null)
            return this._clearColor(e2), true;
          const { values: o2, type: n2 } = this._parseLocalColor(t2);
          if (o2) {
            const t3 = n2.toUpperCase(), { options: i3 } = this._root.interaction, s2 = i3.find((e3) => e3.getAttribute("data-type") === t3);
            if (s2 && !s2.hidden)
              for (const t4 of i3)
                t4.classList[t4 === s2 ? "add" : "remove"]("active");
            return !!this.setHSVA(...o2, e2) && this.setColorRepresentation(t3);
          }
          return false;
        }
        setColorRepresentation(t2) {
          return t2 = t2.toUpperCase(), !!this._root.interaction.options.find((e2) => e2.getAttribute("data-type").startsWith(t2) && !e2.click());
        }
        getColorRepresentation() {
          return this._representation;
        }
        getColor() {
          return this._color;
        }
        getSelectedColor() {
          return this._lastColor;
        }
        getRoot() {
          return this._root;
        }
        disable() {
          return this.hide(), this.options.disabled = true, this._root.button.classList.add("disabled"), this;
        }
        enable() {
          return this.options.disabled = false, this._root.button.classList.remove("disabled"), this;
        }
      }
      return E(L, "utils", o), E(L, "version", "1.8.2"), E(L, "I18N_DEFAULTS", { "ui:dialog": "color picker dialog", "btn:toggle": "toggle color picker dialog", "btn:swatch": "color swatch", "btn:last-color": "use previous color", "btn:save": "Save", "btn:cancel": "Cancel", "btn:clear": "Clear", "aria:btn:save": "save and close", "aria:btn:cancel": "cancel and close", "aria:btn:clear": "clear and close", "aria:input": "color input field", "aria:palette": "color selection area", "aria:hue": "hue selection slider", "aria:opacity": "selection slider" }), E(L, "DEFAULT_OPTIONS", { appClass: null, theme: "classic", useAsButton: false, padding: 8, disabled: false, comparison: true, closeOnScroll: false, outputPrecision: 0, lockOpacity: false, autoReposition: true, container: "body", components: { interaction: {} }, i18n: {}, swatches: null, inline: false, sliders: null, default: "#42445a", defaultRepresentation: null, position: "bottom-middle", adjustableNumbers: true, showAlways: false, closeWithKey: "Escape" }), E(L, "create", (t2) => new L(t2)), e = e.default;
    })();
  });
})(pickr_min);
var __baseCss = `/*! Pickr 1.8.2 MIT | https://github.com/Simonwep/pickr */
.pickr{position:relative;overflow:visible;transform:translateY(0)}
.pickr *{box-sizing:border-box;outline:none;border:none;-webkit-appearance:none}
.pickr .pcr-button{position:relative;height:2em;width:2em;padding:0.5em;cursor:pointer;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;border-radius:.15em;background:url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" stroke="%2342445A" stroke-width="5px" stroke-linecap="round"><path d="M45,45L5,5"></path><path d="M45,5L5,45"></path></svg>') no-repeat center;background-size:0;transition:all 0.3s}
.pickr .pcr-button::before{position:absolute;content:'';top:0;left:0;width:100%;height:100%;background:url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');background-size:.5em;border-radius:.15em;z-index:-1}
.pickr .pcr-button::before{z-index:initial}
.pickr .pcr-button::after{position:absolute;content:'';top:0;left:0;height:100%;width:100%;transition:background 0.3s;background:var(--pcr-color);border-radius:.15em}
.pickr .pcr-button.clear{background-size:70%}
.pickr .pcr-button.clear::before{opacity:0}
.pickr .pcr-button.clear:focus{box-shadow:0 0 0 1px rgba(255,255,255,0.85),0 0 0 3px var(--pcr-color)}
.pickr .pcr-button.disabled{cursor:not-allowed}
.pickr *,.pcr-app *{box-sizing:border-box;outline:none;border:none;-webkit-appearance:none}
.pickr input:focus,.pickr input.pcr-active,.pickr button:focus,.pickr button.pcr-active,.pcr-app input:focus,.pcr-app input.pcr-active,.pcr-app button:focus,.pcr-app button.pcr-active{box-shadow:0 0 0 1px rgba(255,255,255,0.85),0 0 0 3px var(--pcr-color)}
.pickr .pcr-palette,.pickr .pcr-slider,.pcr-app .pcr-palette,.pcr-app .pcr-slider{transition:box-shadow 0.3s}
.pickr .pcr-palette:focus,.pickr .pcr-slider:focus,.pcr-app .pcr-palette:focus,.pcr-app .pcr-slider:focus{box-shadow:0 0 0 1px rgba(255,255,255,0.85),0 0 0 3px rgba(0,0,0,0.25)}
.pcr-app{position:fixed;display:flex;flex-direction:column;z-index:10000;border-radius:0.1em;background:#fff;opacity:0;visibility:hidden;transition:opacity 0.3s, visibility 0s 0.3s;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Helvetica Neue",Arial,sans-serif;box-shadow:0 0.15em 1.5em 0 rgba(0,0,0,0.1),0 0 1em 0 rgba(0,0,0,0.03);left:0;top:0}
.pcr-app.visible{transition:opacity 0.3s;visibility:visible;opacity:1}
.pcr-app .pcr-swatches{display:flex;flex-wrap:wrap;margin-top:0.75em}
.pcr-app .pcr-swatches.pcr-last{margin:0}
@supports (display: grid){.pcr-app .pcr-swatches{display:grid;align-items:center;grid-template-columns:repeat(auto-fit, 1.75em)}}
.pcr-app .pcr-swatches>button{font-size:1em;position:relative;width:calc(1.75em - 5px);height:calc(1.75em - 5px);border-radius:0.15em;cursor:pointer;margin:2.5px;flex-shrink:0;justify-self:center;transition:all 0.15s;overflow:hidden;background:transparent;z-index:1}
.pcr-app .pcr-swatches>button::before{position:absolute;content:'';top:0;left:0;width:100%;height:100%;background:url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');background-size:6px;border-radius:.15em;z-index:-1}
.pcr-app .pcr-swatches>button::after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:var(--pcr-color);border:1px solid rgba(0,0,0,0.05);border-radius:0.15em;box-sizing:border-box}
.pcr-app .pcr-swatches>button:hover{filter:brightness(1.05)}
.pcr-app .pcr-swatches>button:not(.pcr-active){box-shadow:none}
.pcr-app .pcr-interaction{display:flex;flex-wrap:wrap;align-items:center;margin:0 -0.2em 0 -0.2em}
.pcr-app .pcr-interaction>*{margin:0 0.2em}
.pcr-app .pcr-interaction input{letter-spacing:0.07em;font-size:0.75em;text-align:center;cursor:pointer;color:#75797e;background:#f1f3f4;border-radius:.15em;transition:all 0.15s;padding:0.45em 0.5em;margin-top:0.75em}
.pcr-app .pcr-interaction input:hover{filter:brightness(0.975)}
.pcr-app .pcr-interaction input:focus{box-shadow:0 0 0 1px rgba(255,255,255,0.85),0 0 0 3px rgba(66,133,244,0.75)}
.pcr-app .pcr-interaction .pcr-result{color:#75797e;text-align:left;flex:1 1 8em;min-width:8em;transition:all 0.2s;border-radius:.15em;background:#f1f3f4;cursor:text}
.pcr-app .pcr-interaction .pcr-result::-moz-selection{background:#4285f4;color:#fff}
.pcr-app .pcr-interaction .pcr-result::selection{background:#4285f4;color:#fff}
.pcr-app .pcr-interaction .pcr-type.active{color:#fff;background:#4285f4}
.pcr-app .pcr-interaction .pcr-save,.pcr-app .pcr-interaction .pcr-cancel,.pcr-app .pcr-interaction .pcr-clear{color:#fff;width:auto}
.pcr-app .pcr-interaction .pcr-save,.pcr-app .pcr-interaction .pcr-cancel,.pcr-app .pcr-interaction .pcr-clear{color:#fff}
.pcr-app .pcr-interaction .pcr-save:hover,.pcr-app .pcr-interaction .pcr-cancel:hover,.pcr-app .pcr-interaction .pcr-clear:hover{filter:brightness(0.925)}
.pcr-app .pcr-interaction .pcr-save{background:#4285f4}
.pcr-app .pcr-interaction .pcr-clear,.pcr-app .pcr-interaction .pcr-cancel{background:#f44250}
.pcr-app .pcr-interaction .pcr-clear:focus,.pcr-app .pcr-interaction .pcr-cancel:focus{box-shadow:0 0 0 1px rgba(255,255,255,0.85),0 0 0 3px rgba(244,66,80,0.75)}
.pcr-app .pcr-selection .pcr-picker{position:absolute;height:18px;width:18px;border:2px solid #fff;border-radius:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}
.pcr-app .pcr-selection .pcr-color-palette,.pcr-app .pcr-selection .pcr-color-chooser,.pcr-app .pcr-selection .pcr-color-opacity{position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;flex-direction:column;cursor:grab;cursor:-webkit-grab}
.pcr-app .pcr-selection .pcr-color-palette:active,.pcr-app .pcr-selection .pcr-color-chooser:active,.pcr-app .pcr-selection .pcr-color-opacity:active{cursor:grabbing;cursor:-webkit-grabbing}
.pcr-app[data-theme='nano']{width:14.25em;max-width:95vw}
.pcr-app[data-theme='nano'] .pcr-swatches{margin-top:.6em;padding:0 .6em}
.pcr-app[data-theme='nano'] .pcr-interaction{padding:0 .6em .6em .6em}
.pcr-app[data-theme='nano'] .pcr-selection{display:grid;grid-gap:.6em;grid-template-columns:1fr 4fr;grid-template-rows:5fr auto auto;align-items:center;height:10.5em;width:100%;align-self:flex-start}
.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-preview{grid-area:2 / 1 / 4 / 1;height:100%;width:100%;display:flex;flex-direction:row;justify-content:center;margin-left:.6em}
.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-preview .pcr-last-color{display:none}
.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-preview .pcr-current-color{position:relative;background:var(--pcr-color);width:2em;height:2em;border-radius:50em;overflow:hidden}
.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-preview .pcr-current-color::before{position:absolute;content:'';top:0;left:0;width:100%;height:100%;background:url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');background-size:.5em;border-radius:.15em;z-index:-1}
.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-palette{grid-area:1 / 1 / 2 / 3;width:100%;height:100%;z-index:1}
.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-palette .pcr-palette{border-radius:.15em;width:100%;height:100%}
.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-palette .pcr-palette::before{position:absolute;content:'';top:0;left:0;width:100%;height:100%;background:url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');background-size:.5em;border-radius:.15em;z-index:-1}
.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-chooser{grid-area:2 / 2 / 2 / 2}
.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-opacity{grid-area:3 / 2 / 3 / 2}
.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-chooser,.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-opacity{height:0.5em;margin:0 .6em}
.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-chooser .pcr-picker,.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-opacity .pcr-picker{top:50%;transform:translateY(-50%)}
.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-chooser .pcr-slider,.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-opacity .pcr-slider{flex-grow:1;border-radius:50em}
.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-chooser .pcr-slider{background:linear-gradient(to right, red, #ff0, lime, cyan, blue, #f0f, red)}
.pcr-app[data-theme='nano'] .pcr-selection .pcr-color-opacity .pcr-slider{background:linear-gradient(to right, transparent, black),url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2"><path fill="white" d="M1,0H2V1H1V0ZM0,1H1V2H0V1Z"/><path fill="gray" d="M0,0H1V1H0V0ZM1,1H2V2H1V1Z"/></svg>');background-size:100%, 0.25em}

`;
var __css = "s-color-picker:not([mounted]) > * {\n        display: none;\n    }\n    s-color-picker .s-color-picker {\n        display: inline-block;\n        position: relative;\n    }\n    s-color-picker .s-color-picker--top .s-color-picker__picker {\n        position: absolute !important;\n        top: auto !important;\n        right: 0 !important;\n        left: auto !important;\n        bottom: 100% !important;\n        pointer-events: all !important;\n    }\n    s-color-picker .s-color-picker--bottom .s-color-picker__picker {\n        position: absolute !important;\n        top: 100% !important;\n        right: 0 !important;\n        left: auto !important;\n        pointer-events: all !important;\n    }\n    s-color-picker[no-preview] .s-color-picker__picker-wrapper,\n    s-color-picker[no-preview] .s-color-picker__preview {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        pointer-events: none;\n    }\n    s-color-picker[no-preview] .s-color-picker__picker-wrapper button, s-color-picker[no-preview] .s-color-picker__preview button {\n            width: 100%;\n            height: 100%;\n            position: absolute;\n            top: 0;\n            left: 0;\n            background: none !important;\n            pointer-events: none;\n        }\n    s-color-picker[no-preview] .s-color-picker__picker-wrapper button:before,\n            s-color-picker[no-preview] .s-color-picker__picker-wrapper button:after,\n            s-color-picker[no-preview] .s-color-picker__preview button:before,\n            s-color-picker[no-preview] .s-color-picker__preview button:after {\n                content: initial;\n            }\n\n.s-color-picker__picker {\n    position: absolute !important;\n    top: 100% !important;\n    right: 0 !important;\n    left: auto !important;\n}\n\n:not([bare]) .s-color-picker__picker {\n        background: hsla(calc(var(--s-theme-color-current-h, 0) + var(--s-theme-color-current-surface-spin ,0)),calc((var(--s-theme-color-current-s, 0) + var(--s-theme-color-current-surface-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-current-l, 0) + var(--s-theme-color-current-surface-lightness-offset, 0)) * 1%),var(--s-theme-color-current-surface-a, 1));\n        overflow: hidden;box-shadow: var(--s-theme-ui-colorPicker-depth, 0);\n        border-radius: var(--s-theme-ui-colorPicker-borderRadius, 10px);\n        padding-inline: var(--s-theme-ui-colorPicker-paddingInline, 0.75em);\n        padding-block: var(--s-theme-ui-colorPicker-paddingBlock, 0.375em);\n    }\n\n.pickr.s-color-picker__preview {\n    display: inline-block;\n    outline: none;\n    border-radius: var(--s-theme-border-radius-default)  !important;\n}\n\n:not([bare]) .pickr.s-color-picker__preview {\n        transition: var(--s-theme-transition-fast, all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995));\n    }\n\n/* button:focus {\n        display: none;\n    } */\n\n.pickr.s-color-picker__preview button {\n        width: 1em;\n        height: 1em;\n        border-radius: var(--s-theme-border-radius-default)  !important;\n    }\n\n.pickr.s-color-picker__preview button:before,\n        .pickr.s-color-picker__preview button:after {\n            border-radius: var(--s-theme-border-radius-default)  !important;\n        }\n";
globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
if (!window.env)
  window.env = { SUGAR: {} };
window.env.SUGAR = JSON.parse(`{"platform":"browser","env":"dev","config":{"contact":{"discord":{"url":"https://discord.gg/ERsX54UE","shield":"https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=for-the-badge&logo=discord"},"email":{"url":"olivier.bossel@gmail.com","shield":"https://img.shields.io/badge/Email%20us-Go-green?style=for-the-badge&logo=Mail.Ru"}},"datetime":{"dateFormat":"D MMM YYYY","timeFormat":"h:mm:ss","i18n":{"previousMonth":"Previous Month","nextMonth":"Next Month","months":["January","February","March","April","May","June","July","August","September","October","November","December"],"weekdays":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"weekdaysShort":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}},"log":{"types":["info","warning","error"]},"serve":{"img":{"url":"/src/img"},"js":{"url":"/src/js"},"css":{"url":"/src/css"},"icons":{"url":"/src/icons"},"fonts":{"url":"/src/fonts"}},"env":{"env":"development"},"theme":{"theme":"default","variant":"light","cssVariables":["*"],"themes":{"coffeekraken-dark":{"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"timing":{"slow":".6s","default":".3s","fast":".1s"},"transition":{"slow":"all .6s cubic-bezier(0.700, 0.000, 0.305, 0.995)","default":"all .3s cubic-bezier(0.700, 0.000, 0.305, 0.995)","fast":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"helpers":{"clearfix":{"default":"overflow"},"disabled":{"opacity":0.3},"truncate":{"count":10}},"layout":{"container":{"default":{"max-width":"1280px"},"full":{"max-width":"none"}},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","112":"1 1 2","122":"1 2 2","123":"1 2 3","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6"}},"ratio":{"1":1,"21-9":2.3333333333333335,"16-9":1.7777777777777777,"2-3":0.6666666666666666,"4-3":1.3333333333333333,"3-4":0.75},"scalable":{"margin":false,"padding":true,"font":true},"scale":{"10":1,"11":1.1,"12":1.2,"13":1.3,"14":1.4,"15":1.5,"16":1.6,"17":1.7,"18":1.8,"19":1.9,"20":2,"01":0.1,"02":0.2,"03":0.3,"04":0.4,"05":0.5,"06":0.6,"07":0.7,"08":0.8,"09":0.9},"opacity":{"0":0,"10":0.1,"20":0.2,"30":0.3,"40":0.4,"50":0.5,"60":0.6,"70":0.7,"80":0.8,"90":0.9,"100":1},"width":{"0":"0","10":"10%","20":"20%","30":"30%","40":"40%","50":"50%","60":"60%","70":"70%","80":"80%","90":"90%","100":"100%"},"height":{"0":"0","10":"10%","20":"20%","30":"30%","40":"40%","50":"50%","60":"60%","70":"70%","80":"80%","90":"90%","100":"100%"},"depth":{"0":"0","10":"0px 0.6px 0.4px rgba(0, 0, 0, 0.006),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.008),\\n  0px 2.5px 1.9px rgba(0, 0, 0, 0.01),\\n  0px 4.5px 3.4px rgba(0, 0, 0, 0.012),\\n  0px 8.4px 6.3px rgba(0, 0, 0, 0.014),\\n  0px 20px 15px rgba(0, 0, 0, 0.02)","20":"0px 0.6px 0.4px rgba(0, 0, 0, 0.006),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.008),\\n  0px 2.5px 1.9px rgba(0, 0, 0, 0.01),\\n  0px 4.5px 3.4px rgba(0, 0, 0, 0.012),\\n  0px 8.4px 6.3px rgba(0, 0, 0, 0.014),\\n  0px 20px 15px rgba(0, 0, 0, 0.02)","30":"0px 0.6px 0.4px rgba(0, 0, 0, 0.008),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.012),\\n  0px 2.5px 1.9px rgba(0, 0, 0, 0.015),\\n  0px 4.5px 3.4px rgba(0, 0, 0, 0.018),\\n  0px 8.4px 6.3px rgba(0, 0, 0, 0.022),\\n  0px 20px 15px rgba(0, 0, 0, 0.03)","40":"0px 0.8px 0.6px rgba(0, 0, 0, 0.008),\\n  0px 2px 1.3px rgba(0, 0, 0, 0.012),\\n  0px 3.8px 2.5px rgba(0, 0, 0, 0.015),\\n  0px 6.7px 4.5px rgba(0, 0, 0, 0.018),\\n  0px 12.5px 8.4px rgba(0, 0, 0, 0.022),\\n  0px 30px 20px rgba(0, 0, 0, 0.03)","50":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","60":"0px 1px 0.7px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 1.7px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.1px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 5.6px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 10.4px rgba(0, 0, 0, 0.029),\\n  0px 35px 25px rgba(0, 0, 0, 0.04)","70":"0px 1.1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.7px 2px rgba(0, 0, 0, 0.016),\\n  0px 5px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 8.9px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 16.7px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 40px 30px rgba(0, 0, 0, 0.04)","80":"0px 1.1px 1px rgba(0, 0, 0, 0.011),\\n  0px 2.7px 2.3px rgba(0, 0, 0, 0.016),\\n  0px 5px 4.4px rgba(0, 0, 0, 0.02),\\n  0px 8.9px 7.8px rgba(0, 0, 0, 0.024),\\n  0px 16.7px 14.6px rgba(0, 0, 0, 0.029),\\n  0px 40px 35px rgba(0, 0, 0, 0.04)","90":"0px 1.4px 1.1px rgba(0, 0, 0, 0.011),\\n  0px 3.3px 2.7px rgba(0, 0, 0, 0.016),\\n  0px 6.1px 5px rgba(0, 0, 0, 0.02),\\n  0px 10.9px 8.9px rgba(0, 0, 0, 0.024),\\n  0px 20.5px 16.7px rgba(0, 0, 0, 0.029),\\n  0px 49px 40px rgba(0, 0, 0, 0.04)","100":"0px 1.4px 1.4px rgba(0, 0, 0, 0.011),\\n  0px 3.3px 3.5px rgba(0, 0, 0, 0.016),\\n  0px 6.1px 6.5px rgba(0, 0, 0, 0.02),\\n  0px 10.9px 11.6px rgba(0, 0, 0, 0.024),\\n  0px 20.5px 21.7px rgba(0, 0, 0, 0.029),\\n  0px 49px 52px rgba(0, 0, 0, 0.04)","default":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)"},"color":{"extension":{"color":"#ffbb00","blade":"#ff2d20","php":"#8892BF","js":"#f7df1e","ts":"#0374C1","node":"#68A063","css":"#498FE1","scss":"#CF649A","sass":"#CF649A","json":"#000000","jpg":"#B2C0E1","jpeg":"#B2C0E1","pdf":"#E7786E","doc":"#60D7FD","psd":"#F9D659","mp3":"#E98C61","png":"#C29DFB","aac":"#B1C5C9","zip":"#9CC04E","dmg":"#E36E4B"},"main":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":0},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"#776D91","...":"[extends.colorSchemas]"},"ui":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":0},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"#7a738c","...":"[extends.colorSchemas]"},"accent":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":0},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"#ffbb00","...":"[extends.colorSchemas]"},"complementary":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":15},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"#5100ff","...":"[extends.colorSchemas]"},"success":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":0},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"#91ff00","...":"[extends.colorSchemas]"},"warning":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":0},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"#ffd500","...":"[extends.colorSchemas]"},"error":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":0},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"#ff003b","...":"[extends.colorSchemas]"},"info":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":0},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"#00ffff","...":"[extends.colorSchemas]"},"current":{"color":"#ffbb00","blade":"#ff2d20","php":"#8892BF","js":"#f7df1e","ts":"#0374C1","node":"#68A063","css":"#498FE1","scss":"#CF649A","sass":"#CF649A","json":"#000000","jpg":"#B2C0E1","jpeg":"#B2C0E1","pdf":"#E7786E","doc":"#60D7FD","psd":"#F9D659","mp3":"#E98C61","png":"#C29DFB","aac":"#B1C5C9","zip":"#9CC04E","dmg":"#E36E4B"},"primary":{"color":"#ffbb00","blade":"#ff2d20","php":"#8892BF","js":"#f7df1e","ts":"#0374C1","node":"#68A063","css":"#498FE1","scss":"#CF649A","sass":"#CF649A","json":"#000000","jpg":"#B2C0E1","jpeg":"#B2C0E1","pdf":"#E7786E","doc":"#60D7FD","psd":"#F9D659","mp3":"#E98C61","png":"#C29DFB","aac":"#B1C5C9","zip":"#9CC04E","dmg":"#E36E4B"},"secondary":{"color":"#ffbb00","blade":"#ff2d20","php":"#8892BF","js":"#f7df1e","ts":"#0374C1","node":"#68A063","css":"#498FE1","scss":"#CF649A","sass":"#CF649A","json":"#000000","jpg":"#B2C0E1","jpeg":"#B2C0E1","pdf":"#E7786E","doc":"#60D7FD","psd":"#F9D659","mp3":"#E98C61","png":"#C29DFB","aac":"#B1C5C9","zip":"#9CC04E","dmg":"#E36E4B"}},"size":{"0":"0.25rem","5":"0.5rem","10":"0.65rem","20":"0.75rem","30":"1rem","40":"1.25rem","50":"1.50em","60":"2rem","70":"2.5rem","80":"3rem","90":"4rem","100":"5rem","default":"16px"},"font":{"family":{"default":{"font-family":"\\"Titillium Web\\"","font-weight":400,"import":"https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap"},"title":{"font-family":"\\"Titillium Web\\"","font-weight":600,"import":"https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap"},"quote":{"font-family":"\\"Palatino, Times, Georgia, serif\\"","font-weight":"normal","font-style":"normal","font-display":"auto","cap-height":0.65},"code":{"font-family":"Menlo, Monaco, Consolas, Courier New, monospace","font-weight":"normal","font-style":"normal","font-display":"auto","cap-height":0.65}},"size":{"0":"0.25rem","5":"0.5rem","10":"0.65rem","20":"0.75rem","30":"1rem","40":"1.25rem","50":"1.50em","60":"2rem","70":"2.5rem","80":"3rem","90":"4rem","100":"5rem","default":"16px"}},"border":{"width":{"0":"0px","10":"1px","20":"2px","30":"4px","40":"6px","50":"8px","60":"12px","70":"16px","80":"20px","90":"24px","100":"30px","default":"1px"},"radius":{"0":"0","10":"4px","20":"8px","30":"12px","40":"16px","50":"20px","60":"26px","70":"32px","80":"40px","90":"50px","100":"60px","default":"10px"}},"space":{"0":"0","10":"0.375rem","20":"0.75rem","30":"1.5rem","40":"2.25rem","50":"3rem","60":"3.75rem","70":"4.5rem","80":"5.25","90":"6rem","100":"6.75rem","default":"3rem"},"margin":{"0":"0","10":"0.375rem","20":"0.75rem","30":"1.5rem","40":"2.25rem","50":"3rem","60":"3.75rem","70":"4.5rem","80":"5.25","90":"6rem","100":"6.75rem","default":"3rem"},"padding":{"0":"0","10":"0.375rem","20":"0.75rem","30":"1.5rem","40":"2.25rem","50":"3rem","60":"3.75rem","70":"4.5rem","80":"5.25","90":"6rem","100":"6.75rem","default":"3rem"},"media":{"defaultAction":">=","defaultQuery":"screen","queries":{"mobile":{"min-width":0,"max-width":639},"tablet":{"min-width":640,"max-width":1279},"desktop":{"min-width":1280,"max-width":null}}},"components":{"s-code-example":{"rhythmVertical":{"margin-bottom":60}}},"ui":{"filtrableInput":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1.4px 1.4px rgba(0, 0, 0, 0.011),\\n  0px 3.3px 3.5px rgba(0, 0, 0, 0.016),\\n  0px 6.1px 6.5px rgba(0, 0, 0, 0.02),\\n  0px 10.9px 11.6px rgba(0, 0, 0, 0.024),\\n  0px 20.5px 21.7px rgba(0, 0, 0, 0.029),\\n  0px 49px 52px rgba(0, 0, 0, 0.04)","outline":true,"rhythmVertical":{"margin-bottom":60}},"default":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":60}},"form":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","outline":true,"defaultColor":"accent","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":40}},"outline":{"active":true,"borderWidth":"10px","borderRadius":"10px","transition":"all .2s ease-out"},"scrollbar":{"size":"2px","defaultColor":"main"},"button":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","outline":true,"depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","defaultStyle":"solid","defaultColor":"main","rhythmVertical":{"margin-bottom":60}},"avatar":{"borderRadius":"10px","borderWidth":"2px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","defaultColor":"main","defaultStyle":"solid","rhythmVertical":{"margin-bottom":60}},"colorPicker":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"accent","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true,"rhythmVertical":{"margin-bottom":40}},"datePicker":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":["theme.ui.form.defaultColor"],"defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true,"rhythmVertical":{"margin-bottom":40}},"input":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"accent","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true,"rhythmVertical":{"margin-bottom":40}},"radio":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"0.5em","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true,"defaultColor":"accent","defaultStyle":"solid","rhythmVertical":{"margin-bottom":40}},"checkbox":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"0.2em","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","defaultColor":"main","defaultStyle":"solid","outline":true,"rhythmVertical":{"margin-bottom":40}},"range":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"accent","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true,"rhythmVertical":{"margin-bottom":40}},"label":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"accent","defaultStyle":"inline","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":40}},"select":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","defaultColor":"accent","defaultStyle":"solid","outline":true,"rhythmVertical":{"margin-bottom":40}},"switch":{"borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","defaultColor":"accent","defaultStyle":"solid","outline":true,"rhythmVertical":{"margin-bottom":40}},"dropdown":{"paddingInline":"0.75em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true},"list":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"ul","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","bulletChar":"\u25CF","rhythmVertical":{"margin-bottom":60}},"fsTree":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","bulletChar":"\u25CF","rhythmVertical":{"margin-bottom":60}},"tabs":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":0,"outline":true,"rhythmVertical":{"margin-bottom":60}},"terminal":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":60}},"tooltip":{"paddingInline":"0.75em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","arrowSize":"20px"},"code":{"paddingInline":"3rem","paddingBlock":"3rem","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":60}},"blockquote":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":60}},"table":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":0,"rhythmVertical":{"margin-bottom":60}},"badge":{"paddingInline":".65em","paddingBlock":".35em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":0,"rhythmVertical":{"margin-bottom":60}},"loader":{"duration":"1s","easing":"linear"},"loaderSpinner":{"duration":"1s","easing":"linear"}},"typo":{"h1":{"font-family":"title","font-size":90,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"h2":{"font-family":"title","font-size":80,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"h3":{"font-family":"title","font-size":70,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"h4":{"font-family":"title","font-size":60,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"h5":{"font-family":"title","font-size":50,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":40}},"h6":{"font-family":"title","font-size":40,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":40}},"p":{"font-family":"default","font-size":30,"line-height":1.8,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"lead":{"font-family":"default","font-size":50,"line-height":1.6,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"hr":{"color":"hsla(198,10,50,1)","opacity":0.2,"rhythmVertical":{"margin-bottom":50}},"pre":{"font-family":"code","color":["main","text"],"background-color":["main","surface"],"line-height":1.5,"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":50}},"code:not(pre > code)":{"display":"inline-block","font-family":"code","color":["main","text"],"background-color":["accent","surface"],"borderRadius":10,"paddingInline":10,"paddingBlock":0},"a":{"color":"accent"},"quote":{"font-family":"quote"},"b":{"font-weight":"bold"},"bold":{"font-weight":"bold"},"strong":{"font-weight":"bold"},"i":{"font-style":"italic"},"italic":{"font-style":"italic"},"em":{"font-style":"italic"},"small":{"font-size":"0.5em"},"mark":{"background-color":"#ffbb00"},"del":{"text-decoration":"line-through"},"ins":{"text-decoration":"underline"},"sub":{"vertical-align":"sub","font-size":"0.6em"},"sup":{"vertical-align":"sup","font-size":"0.6em"}},"colorSchemas":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":0},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}}}},"default-light":{"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"timing":{"slow":".6s","default":".3s","fast":".1s"},"transition":{"slow":"all .6s cubic-bezier(0.700, 0.000, 0.305, 0.995)","default":"all .3s cubic-bezier(0.700, 0.000, 0.305, 0.995)","fast":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"helpers":{"clearfix":{"default":"overflow"},"disabled":{"opacity":0.3},"truncate":{"count":10}},"layout":{"container":{"default":{"max-width":"1280px"},"full":{"max-width":"none"}},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","112":"1 1 2","122":"1 2 2","123":"1 2 3","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6"}},"ratio":{"1":1,"21-9":2.3333333333333335,"16-9":1.7777777777777777,"2-3":0.6666666666666666,"4-3":1.3333333333333333,"3-4":0.75},"scalable":{"margin":false,"padding":true,"font":true},"scale":{"10":1,"11":1.1,"12":1.2,"13":1.3,"14":1.4,"15":1.5,"16":1.6,"17":1.7,"18":1.8,"19":1.9,"20":2,"01":0.1,"02":0.2,"03":0.3,"04":0.4,"05":0.5,"06":0.6,"07":0.7,"08":0.8,"09":0.9},"opacity":{"0":0,"10":0.1,"20":0.2,"30":0.3,"40":0.4,"50":0.5,"60":0.6,"70":0.7,"80":0.8,"90":0.9,"100":1},"width":{"0":"0","10":"10%","20":"20%","30":"30%","40":"40%","50":"50%","60":"60%","70":"70%","80":"80%","90":"90%","100":"100%"},"height":{"0":"0","10":"10%","20":"20%","30":"30%","40":"40%","50":"50%","60":"60%","70":"70%","80":"80%","90":"90%","100":"100%"},"depth":{"0":"0","10":"0px 0.6px 0.4px rgba(0, 0, 0, 0.006),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.008),\\n  0px 2.5px 1.9px rgba(0, 0, 0, 0.01),\\n  0px 4.5px 3.4px rgba(0, 0, 0, 0.012),\\n  0px 8.4px 6.3px rgba(0, 0, 0, 0.014),\\n  0px 20px 15px rgba(0, 0, 0, 0.02)","20":"0px 0.6px 0.4px rgba(0, 0, 0, 0.006),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.008),\\n  0px 2.5px 1.9px rgba(0, 0, 0, 0.01),\\n  0px 4.5px 3.4px rgba(0, 0, 0, 0.012),\\n  0px 8.4px 6.3px rgba(0, 0, 0, 0.014),\\n  0px 20px 15px rgba(0, 0, 0, 0.02)","30":"0px 0.6px 0.4px rgba(0, 0, 0, 0.008),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.012),\\n  0px 2.5px 1.9px rgba(0, 0, 0, 0.015),\\n  0px 4.5px 3.4px rgba(0, 0, 0, 0.018),\\n  0px 8.4px 6.3px rgba(0, 0, 0, 0.022),\\n  0px 20px 15px rgba(0, 0, 0, 0.03)","40":"0px 0.8px 0.6px rgba(0, 0, 0, 0.008),\\n  0px 2px 1.3px rgba(0, 0, 0, 0.012),\\n  0px 3.8px 2.5px rgba(0, 0, 0, 0.015),\\n  0px 6.7px 4.5px rgba(0, 0, 0, 0.018),\\n  0px 12.5px 8.4px rgba(0, 0, 0, 0.022),\\n  0px 30px 20px rgba(0, 0, 0, 0.03)","50":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","60":"0px 1px 0.7px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 1.7px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.1px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 5.6px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 10.4px rgba(0, 0, 0, 0.029),\\n  0px 35px 25px rgba(0, 0, 0, 0.04)","70":"0px 1.1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.7px 2px rgba(0, 0, 0, 0.016),\\n  0px 5px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 8.9px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 16.7px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 40px 30px rgba(0, 0, 0, 0.04)","80":"0px 1.1px 1px rgba(0, 0, 0, 0.011),\\n  0px 2.7px 2.3px rgba(0, 0, 0, 0.016),\\n  0px 5px 4.4px rgba(0, 0, 0, 0.02),\\n  0px 8.9px 7.8px rgba(0, 0, 0, 0.024),\\n  0px 16.7px 14.6px rgba(0, 0, 0, 0.029),\\n  0px 40px 35px rgba(0, 0, 0, 0.04)","90":"0px 1.4px 1.1px rgba(0, 0, 0, 0.011),\\n  0px 3.3px 2.7px rgba(0, 0, 0, 0.016),\\n  0px 6.1px 5px rgba(0, 0, 0, 0.02),\\n  0px 10.9px 8.9px rgba(0, 0, 0, 0.024),\\n  0px 20.5px 16.7px rgba(0, 0, 0, 0.029),\\n  0px 49px 40px rgba(0, 0, 0, 0.04)","100":"0px 1.4px 1.4px rgba(0, 0, 0, 0.011),\\n  0px 3.3px 3.5px rgba(0, 0, 0, 0.016),\\n  0px 6.1px 6.5px rgba(0, 0, 0, 0.02),\\n  0px 10.9px 11.6px rgba(0, 0, 0, 0.024),\\n  0px 20.5px 21.7px rgba(0, 0, 0, 0.029),\\n  0px 49px 52px rgba(0, 0, 0, 0.04)","default":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)"},"color":{"extension":{"color":"#ffbb00","blade":"#ff2d20","php":"#8892BF","js":"#f7df1e","ts":"#0374C1","node":"#68A063","css":"#498FE1","scss":"#CF649A","sass":"#CF649A","json":"#000000","jpg":"#B2C0E1","jpeg":"#B2C0E1","pdf":"#E7786E","doc":"#60D7FD","psd":"#F9D659","mp3":"#E98C61","png":"#C29DFB","aac":"#B1C5C9","zip":"#9CC04E","dmg":"#E36E4B"},"main":{"default":{"0":{"darken":50},"5":{"darken":45},"10":{"darken":40},"15":{"darken":35},"20":{"darken":30},"25":{"darken":25},"30":{"darken":20},"35":{"darken":15},"40":{"darken":10},"45":{"darken":5},"50":{"darken":0},"55":{"lighten":5},"60":{"lighten":10},"65":{"lighten":15},"70":{"lighten":20},"75":{"lighten":25},"80":{"lighten":30},"85":{"lighten":35},"90":{"lighten":40},"95":{"lighten":48},"100":{"lighten":50},"text":{"lighten":0,"darken":10},"placeholder":{"darken":45,"alpha":0.4},"foreground":{"lighten":50},"background":{"lighten":50},"backgroundForeground":{"darken":45},"surface":{"lighten":48},"surfaceForeground":{"darken":45},"ui":{"lighten":50},"uiForeground":{"darken":25},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"lighten":20}},"color":"hsla(198,10,50,1)","...":"[extends.colorSchemas]"},"accent":{"default":{"0":{"darken":50},"5":{"darken":45},"10":{"darken":40},"15":{"darken":35},"20":{"darken":30},"25":{"darken":25},"30":{"darken":20},"35":{"darken":15},"40":{"darken":10},"45":{"darken":5},"50":{"darken":0},"55":{"lighten":5},"60":{"lighten":10},"65":{"lighten":15},"70":{"lighten":20},"75":{"lighten":25},"80":{"lighten":30},"85":{"lighten":35},"90":{"lighten":40},"95":{"lighten":48},"100":{"lighten":50},"text":{"lighten":0},"placeholder":{"darken":45,"alpha":0.4},"foreground":{"lighten":50},"background":{"lighten":50},"backgroundForeground":{"darken":45},"surface":{"lighten":48},"surfaceForeground":{"darken":45},"ui":{"lighten":50},"uiForeground":{"darken":25},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"lighten":20}},"color":"#ffbb00","...":"[extends.colorSchemas]"},"complementary":{"default":{"0":{"darken":50},"5":{"darken":45},"10":{"darken":40},"15":{"darken":35},"20":{"darken":30},"25":{"darken":25},"30":{"darken":20},"35":{"darken":15},"40":{"darken":10},"45":{"darken":5},"50":{"darken":0},"55":{"lighten":5},"60":{"lighten":10},"65":{"lighten":15},"70":{"lighten":20},"75":{"lighten":25},"80":{"lighten":30},"85":{"lighten":35},"90":{"lighten":40},"95":{"lighten":48},"100":{"lighten":50},"text":{"lighten":0},"placeholder":{"darken":45,"alpha":0.4},"foreground":{"lighten":50},"background":{"lighten":50},"backgroundForeground":{"darken":45},"surface":{"lighten":48},"surfaceForeground":{"darken":45},"ui":{"lighten":50},"uiForeground":{"darken":25},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"lighten":20}},"color":"#5100ff","...":"[extends.colorSchemas]"},"success":{"default":{"0":{"darken":50},"5":{"darken":45},"10":{"darken":40},"15":{"darken":35},"20":{"darken":30},"25":{"darken":25},"30":{"darken":20},"35":{"darken":15},"40":{"darken":10},"45":{"darken":5},"50":{"darken":0},"55":{"lighten":5},"60":{"lighten":10},"65":{"lighten":15},"70":{"lighten":20},"75":{"lighten":25},"80":{"lighten":30},"85":{"lighten":35},"90":{"lighten":40},"95":{"lighten":48},"100":{"lighten":50},"text":{"lighten":0},"placeholder":{"darken":45,"alpha":0.4},"foreground":{"lighten":50,"darken":20},"background":{"lighten":50},"backgroundForeground":{"darken":45},"surface":{"lighten":48},"surfaceForeground":{"darken":45},"ui":{"lighten":50},"uiForeground":{"darken":25},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"lighten":20}},"color":"#91ff00","...":"[extends.colorSchemas]"},"warning":{"default":{"0":{"darken":50},"5":{"darken":45},"10":{"darken":40},"15":{"darken":35},"20":{"darken":30},"25":{"darken":25},"30":{"darken":20},"35":{"darken":15},"40":{"darken":10},"45":{"darken":5},"50":{"darken":0},"55":{"lighten":5},"60":{"lighten":10},"65":{"lighten":15},"70":{"lighten":20},"75":{"lighten":25},"80":{"lighten":30},"85":{"lighten":35},"90":{"lighten":40},"95":{"lighten":48},"100":{"lighten":50},"text":{"lighten":0},"placeholder":{"darken":45,"alpha":0.4},"foreground":{"lighten":50},"background":{"lighten":50},"backgroundForeground":{"darken":45},"surface":{"lighten":48},"surfaceForeground":{"darken":45},"ui":{"lighten":50},"uiForeground":{"darken":25},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"lighten":20}},"color":"#ffd500","...":"[extends.colorSchemas]"},"error":{"default":{"0":{"darken":50},"5":{"darken":45},"10":{"darken":40},"15":{"darken":35},"20":{"darken":30},"25":{"darken":25},"30":{"darken":20},"35":{"darken":15},"40":{"darken":10},"45":{"darken":5},"50":{"darken":0},"55":{"lighten":5},"60":{"lighten":10},"65":{"lighten":15},"70":{"lighten":20},"75":{"lighten":25},"80":{"lighten":30},"85":{"lighten":35},"90":{"lighten":40},"95":{"lighten":48},"100":{"lighten":50},"text":{"lighten":0},"placeholder":{"darken":45,"alpha":0.4},"foreground":{"lighten":50},"background":{"lighten":50},"backgroundForeground":{"darken":45},"surface":{"lighten":48},"surfaceForeground":{"darken":45},"ui":{"lighten":50},"uiForeground":{"darken":25},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"lighten":20}},"color":"#ff003b","...":"[extends.colorSchemas]"},"info":{"default":{"0":{"darken":50},"5":{"darken":45},"10":{"darken":40},"15":{"darken":35},"20":{"darken":30},"25":{"darken":25},"30":{"darken":20},"35":{"darken":15},"40":{"darken":10},"45":{"darken":5},"50":{"darken":0},"55":{"lighten":5},"60":{"lighten":10},"65":{"lighten":15},"70":{"lighten":20},"75":{"lighten":25},"80":{"lighten":30},"85":{"lighten":35},"90":{"lighten":40},"95":{"lighten":48},"100":{"lighten":50},"text":{"lighten":0},"placeholder":{"darken":45,"alpha":0.4},"foreground":{"lighten":50},"background":{"lighten":50},"backgroundForeground":{"darken":45},"surface":{"lighten":48},"surfaceForeground":{"darken":45},"ui":{"lighten":50},"uiForeground":{"darken":25},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"lighten":20}},"color":"#00ffff","...":"[extends.colorSchemas]"},"current":{"default":{"0":{"darken":50},"5":{"darken":45},"10":{"darken":40},"15":{"darken":35},"20":{"darken":30},"25":{"darken":25},"30":{"darken":20},"35":{"darken":15},"40":{"darken":10},"45":{"darken":5},"50":{"darken":0},"55":{"lighten":5},"60":{"lighten":10},"65":{"lighten":15},"70":{"lighten":20},"75":{"lighten":25},"80":{"lighten":30},"85":{"lighten":35},"90":{"lighten":40},"95":{"lighten":48},"100":{"lighten":50},"text":{"lighten":0,"darken":10},"placeholder":{"darken":45,"alpha":0.4},"foreground":{"lighten":50},"background":{"lighten":50},"backgroundForeground":{"darken":45},"surface":{"lighten":48},"surfaceForeground":{"darken":45},"ui":{"lighten":50},"uiForeground":{"darken":25},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"lighten":20}},"color":"hsla(198,10,50,1)","...":"[extends.colorSchemas]"},"primary":{"default":{"0":{"darken":50},"5":{"darken":45},"10":{"darken":40},"15":{"darken":35},"20":{"darken":30},"25":{"darken":25},"30":{"darken":20},"35":{"darken":15},"40":{"darken":10},"45":{"darken":5},"50":{"darken":0},"55":{"lighten":5},"60":{"lighten":10},"65":{"lighten":15},"70":{"lighten":20},"75":{"lighten":25},"80":{"lighten":30},"85":{"lighten":35},"90":{"lighten":40},"95":{"lighten":48},"100":{"lighten":50},"text":{"lighten":0,"darken":10},"placeholder":{"darken":45,"alpha":0.4},"foreground":{"lighten":50},"background":{"lighten":50},"backgroundForeground":{"darken":45},"surface":{"lighten":48},"surfaceForeground":{"darken":45},"ui":{"lighten":50},"uiForeground":{"darken":25},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"lighten":20}},"color":"hsla(198,10,50,1)","...":"[extends.colorSchemas]"},"secondary":{"default":{"0":{"darken":50},"5":{"darken":45},"10":{"darken":40},"15":{"darken":35},"20":{"darken":30},"25":{"darken":25},"30":{"darken":20},"35":{"darken":15},"40":{"darken":10},"45":{"darken":5},"50":{"darken":0},"55":{"lighten":5},"60":{"lighten":10},"65":{"lighten":15},"70":{"lighten":20},"75":{"lighten":25},"80":{"lighten":30},"85":{"lighten":35},"90":{"lighten":40},"95":{"lighten":48},"100":{"lighten":50},"text":{"lighten":0,"darken":10},"placeholder":{"darken":45,"alpha":0.4},"foreground":{"lighten":50},"background":{"lighten":50},"backgroundForeground":{"darken":45},"surface":{"lighten":48},"surfaceForeground":{"darken":45},"ui":{"lighten":50},"uiForeground":{"darken":25},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"lighten":20}},"color":"hsla(198,10,50,1)","...":"[extends.colorSchemas]"}},"size":{"0":"0.25rem","5":"0.5rem","10":"0.65rem","20":"0.75rem","30":"1rem","40":"1.25rem","50":"1.50em","60":"2rem","70":"2.5rem","80":"3rem","90":"4rem","100":"5rem","default":"16px"},"font":{"family":{"default":{"font-family":"\\"Titillium Web\\"","font-weight":400,"import":"https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap"},"title":{"font-family":"\\"Titillium Web\\"","font-weight":600,"import":"https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap"},"quote":{"font-family":"\\"Palatino, Times, Georgia, serif\\"","font-weight":"normal","font-style":"normal","font-display":"auto","cap-height":0.65},"code":{"font-family":"Menlo, Monaco, Consolas, Courier New, monospace","font-weight":"normal","font-style":"normal","font-display":"auto","cap-height":0.65}},"size":{"0":"0.25rem","5":"0.5rem","10":"0.65rem","20":"0.75rem","30":"1rem","40":"1.25rem","50":"1.50em","60":"2rem","70":"2.5rem","80":"3rem","90":"4rem","100":"5rem","default":"16px"}},"border":{"width":{"0":"0px","10":"1px","20":"2px","30":"4px","40":"6px","50":"8px","60":"12px","70":"16px","80":"20px","90":"24px","100":"30px","default":"1px"},"radius":{"0":"0","10":"4px","20":"8px","30":"12px","40":"16px","50":"20px","60":"26px","70":"32px","80":"40px","90":"50px","100":"60px","default":"10px"}},"space":{"0":"0","10":"0.375rem","20":"0.75rem","30":"1.5rem","40":"2.25rem","50":"3rem","60":"3.75rem","70":"4.5rem","80":"5.25","90":"6rem","100":"6.75rem","default":"3rem"},"margin":{"0":"0","10":"0.375rem","20":"0.75rem","30":"1.5rem","40":"2.25rem","50":"3rem","60":"3.75rem","70":"4.5rem","80":"5.25","90":"6rem","100":"6.75rem","default":"3rem"},"padding":{"0":"0","10":"0.375rem","20":"0.75rem","30":"1.5rem","40":"2.25rem","50":"3rem","60":"3.75rem","70":"4.5rem","80":"5.25","90":"6rem","100":"6.75rem","default":"3rem"},"media":{"defaultAction":">=","defaultQuery":"screen","queries":{"mobile":{"min-width":0,"max-width":639},"tablet":{"min-width":640,"max-width":1279},"desktop":{"min-width":1280,"max-width":null}}},"components":{"s-code-example":{"rhythmVertical":{"margin-bottom":60}}},"ui":{"filtrableInput":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1.4px 1.4px rgba(0, 0, 0, 0.011),\\n  0px 3.3px 3.5px rgba(0, 0, 0, 0.016),\\n  0px 6.1px 6.5px rgba(0, 0, 0, 0.02),\\n  0px 10.9px 11.6px rgba(0, 0, 0, 0.024),\\n  0px 20.5px 21.7px rgba(0, 0, 0, 0.029),\\n  0px 49px 52px rgba(0, 0, 0, 0.04)","outline":true,"rhythmVertical":{"margin-bottom":60}},"default":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":60}},"form":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","outline":true,"defaultColor":"accent","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":40}},"outline":{"active":true,"borderWidth":"10px","borderRadius":"10px","transition":"all .2s ease-out"},"scrollbar":{"size":"2px","defaultColor":"main"},"button":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","outline":true,"depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","defaultStyle":"solid","defaultColor":"main","rhythmVertical":{"margin-bottom":60}},"avatar":{"borderRadius":"10px","borderWidth":"2px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","defaultColor":"main","defaultStyle":"solid","rhythmVertical":{"margin-bottom":60}},"colorPicker":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"accent","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true,"rhythmVertical":{"margin-bottom":40}},"datePicker":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":["theme.ui.form.defaultColor"],"defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true,"rhythmVertical":{"margin-bottom":40}},"input":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"accent","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true,"rhythmVertical":{"margin-bottom":40}},"radio":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"0.5em","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true,"defaultColor":"accent","defaultStyle":"solid","rhythmVertical":{"margin-bottom":40}},"checkbox":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"0.2em","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","defaultColor":"main","defaultStyle":"solid","outline":true,"rhythmVertical":{"margin-bottom":40}},"range":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"accent","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true,"rhythmVertical":{"margin-bottom":40}},"label":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"accent","defaultStyle":"inline","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":40}},"select":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","defaultColor":"accent","defaultStyle":"solid","outline":true,"rhythmVertical":{"margin-bottom":40}},"switch":{"borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","defaultColor":"accent","defaultStyle":"solid","outline":true,"rhythmVertical":{"margin-bottom":40}},"dropdown":{"paddingInline":"0.75em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true},"list":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"ul","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","bulletChar":"\u25CF","rhythmVertical":{"margin-bottom":60}},"fsTree":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","bulletChar":"\u25CF","rhythmVertical":{"margin-bottom":60}},"tabs":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":0,"outline":true,"rhythmVertical":{"margin-bottom":60}},"terminal":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":60}},"tooltip":{"paddingInline":"0.75em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","arrowSize":"20px"},"code":{"paddingInline":"3rem","paddingBlock":"3rem","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":60}},"blockquote":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":60}},"table":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":0,"rhythmVertical":{"margin-bottom":60}},"badge":{"paddingInline":".65em","paddingBlock":".35em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":0,"rhythmVertical":{"margin-bottom":60}},"loader":{"duration":"1s","easing":"linear"},"loaderSpinner":{"duration":"1s","easing":"linear"}},"typo":{"h1":{"font-family":"title","font-size":90,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"h2":{"font-family":"title","font-size":80,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"h3":{"font-family":"title","font-size":70,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"h4":{"font-family":"title","font-size":60,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"h5":{"font-family":"title","font-size":50,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":40}},"h6":{"font-family":"title","font-size":40,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":40}},"p":{"font-family":"default","font-size":30,"line-height":1.8,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"lead":{"font-family":"default","font-size":50,"line-height":1.6,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"hr":{"color":"hsla(198,10,50,1)","opacity":0.2,"rhythmVertical":{"margin-bottom":50}},"pre":{"font-family":"code","color":["main","text"],"background-color":["main","surface"],"line-height":1.5,"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":50}},"code:not(pre > code)":{"display":"inline-block","font-family":"code","color":["main","text"],"background-color":["accent","surface"],"borderRadius":10,"paddingInline":10,"paddingBlock":0},"a":{"color":"accent"},"quote":{"font-family":"quote"},"b":{"font-weight":"bold"},"bold":{"font-weight":"bold"},"strong":{"font-weight":"bold"},"i":{"font-style":"italic"},"italic":{"font-style":"italic"},"em":{"font-style":"italic"},"small":{"font-size":"0.5em"},"mark":{"background-color":"#ffbb00"},"del":{"text-decoration":"line-through"},"ins":{"text-decoration":"underline"},"sub":{"vertical-align":"sub","font-size":"0.6em"},"sup":{"vertical-align":"sup","font-size":"0.6em"}},"colorSchemas":{"default":{"0":{"darken":50},"5":{"darken":45},"10":{"darken":40},"15":{"darken":35},"20":{"darken":30},"25":{"darken":25},"30":{"darken":20},"35":{"darken":15},"40":{"darken":10},"45":{"darken":5},"50":{"darken":0},"55":{"lighten":5},"60":{"lighten":10},"65":{"lighten":15},"70":{"lighten":20},"75":{"lighten":25},"80":{"lighten":30},"85":{"lighten":35},"90":{"lighten":40},"95":{"lighten":48},"100":{"lighten":50},"text":{"lighten":0},"placeholder":{"darken":45,"alpha":0.4},"foreground":{"lighten":50},"background":{"lighten":50},"backgroundForeground":{"darken":45},"surface":{"lighten":48},"surfaceForeground":{"darken":45},"ui":{"lighten":50},"uiForeground":{"darken":25},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"lighten":20}}},"defaultColor":"main"},"default-dark":{"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"timing":{"slow":".6s","default":".3s","fast":".1s"},"transition":{"slow":"all .6s cubic-bezier(0.700, 0.000, 0.305, 0.995)","default":"all .3s cubic-bezier(0.700, 0.000, 0.305, 0.995)","fast":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"helpers":{"clearfix":{"default":"overflow"},"disabled":{"opacity":0.3},"truncate":{"count":10}},"layout":{"container":{"default":{"max-width":"1280px"},"full":{"max-width":"none"}},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","112":"1 1 2","122":"1 2 2","123":"1 2 3","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6"}},"ratio":{"1":1,"21-9":2.3333333333333335,"16-9":1.7777777777777777,"2-3":0.6666666666666666,"4-3":1.3333333333333333,"3-4":0.75},"scalable":{"margin":false,"padding":true,"font":true},"scale":{"10":1,"11":1.1,"12":1.2,"13":1.3,"14":1.4,"15":1.5,"16":1.6,"17":1.7,"18":1.8,"19":1.9,"20":2,"01":0.1,"02":0.2,"03":0.3,"04":0.4,"05":0.5,"06":0.6,"07":0.7,"08":0.8,"09":0.9},"opacity":{"0":0,"10":0.1,"20":0.2,"30":0.3,"40":0.4,"50":0.5,"60":0.6,"70":0.7,"80":0.8,"90":0.9,"100":1},"width":{"0":"0","10":"10%","20":"20%","30":"30%","40":"40%","50":"50%","60":"60%","70":"70%","80":"80%","90":"90%","100":"100%"},"height":{"0":"0","10":"10%","20":"20%","30":"30%","40":"40%","50":"50%","60":"60%","70":"70%","80":"80%","90":"90%","100":"100%"},"depth":{"0":"0","10":"0px 0.6px 0.4px rgba(0, 0, 0, 0.006),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.008),\\n  0px 2.5px 1.9px rgba(0, 0, 0, 0.01),\\n  0px 4.5px 3.4px rgba(0, 0, 0, 0.012),\\n  0px 8.4px 6.3px rgba(0, 0, 0, 0.014),\\n  0px 20px 15px rgba(0, 0, 0, 0.02)","20":"0px 0.6px 0.4px rgba(0, 0, 0, 0.006),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.008),\\n  0px 2.5px 1.9px rgba(0, 0, 0, 0.01),\\n  0px 4.5px 3.4px rgba(0, 0, 0, 0.012),\\n  0px 8.4px 6.3px rgba(0, 0, 0, 0.014),\\n  0px 20px 15px rgba(0, 0, 0, 0.02)","30":"0px 0.6px 0.4px rgba(0, 0, 0, 0.008),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.012),\\n  0px 2.5px 1.9px rgba(0, 0, 0, 0.015),\\n  0px 4.5px 3.4px rgba(0, 0, 0, 0.018),\\n  0px 8.4px 6.3px rgba(0, 0, 0, 0.022),\\n  0px 20px 15px rgba(0, 0, 0, 0.03)","40":"0px 0.8px 0.6px rgba(0, 0, 0, 0.008),\\n  0px 2px 1.3px rgba(0, 0, 0, 0.012),\\n  0px 3.8px 2.5px rgba(0, 0, 0, 0.015),\\n  0px 6.7px 4.5px rgba(0, 0, 0, 0.018),\\n  0px 12.5px 8.4px rgba(0, 0, 0, 0.022),\\n  0px 30px 20px rgba(0, 0, 0, 0.03)","50":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","60":"0px 1px 0.7px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 1.7px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.1px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 5.6px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 10.4px rgba(0, 0, 0, 0.029),\\n  0px 35px 25px rgba(0, 0, 0, 0.04)","70":"0px 1.1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.7px 2px rgba(0, 0, 0, 0.016),\\n  0px 5px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 8.9px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 16.7px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 40px 30px rgba(0, 0, 0, 0.04)","80":"0px 1.1px 1px rgba(0, 0, 0, 0.011),\\n  0px 2.7px 2.3px rgba(0, 0, 0, 0.016),\\n  0px 5px 4.4px rgba(0, 0, 0, 0.02),\\n  0px 8.9px 7.8px rgba(0, 0, 0, 0.024),\\n  0px 16.7px 14.6px rgba(0, 0, 0, 0.029),\\n  0px 40px 35px rgba(0, 0, 0, 0.04)","90":"0px 1.4px 1.1px rgba(0, 0, 0, 0.011),\\n  0px 3.3px 2.7px rgba(0, 0, 0, 0.016),\\n  0px 6.1px 5px rgba(0, 0, 0, 0.02),\\n  0px 10.9px 8.9px rgba(0, 0, 0, 0.024),\\n  0px 20.5px 16.7px rgba(0, 0, 0, 0.029),\\n  0px 49px 40px rgba(0, 0, 0, 0.04)","100":"0px 1.4px 1.4px rgba(0, 0, 0, 0.011),\\n  0px 3.3px 3.5px rgba(0, 0, 0, 0.016),\\n  0px 6.1px 6.5px rgba(0, 0, 0, 0.02),\\n  0px 10.9px 11.6px rgba(0, 0, 0, 0.024),\\n  0px 20.5px 21.7px rgba(0, 0, 0, 0.029),\\n  0px 49px 52px rgba(0, 0, 0, 0.04)","default":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)"},"color":{"extension":{"color":"#ffbb00","blade":"#ff2d20","php":"#8892BF","js":"#f7df1e","ts":"#0374C1","node":"#68A063","css":"#498FE1","scss":"#CF649A","sass":"#CF649A","json":"#000000","jpg":"#B2C0E1","jpeg":"#B2C0E1","pdf":"#E7786E","doc":"#60D7FD","psd":"#F9D659","mp3":"#E98C61","png":"#C29DFB","aac":"#B1C5C9","zip":"#9CC04E","dmg":"#E36E4B"},"main":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":46},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"hsla(198,10,50,1)","...":"[extends.colorSchemas]"},"accent":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":0},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"#ffbb00","...":"[extends.colorSchemas]"},"complementary":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":15},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"#5100ff","...":"[extends.colorSchemas]"},"success":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":0},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"#91ff00","...":"[extends.colorSchemas]"},"warning":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":0},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"#ffd500","...":"[extends.colorSchemas]"},"error":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":0},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"#ff003b","...":"[extends.colorSchemas]"},"info":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":0},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"#00ffff","...":"[extends.colorSchemas]"},"current":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":46},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"hsla(198,10,50,1)","...":"[extends.colorSchemas]"},"primary":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":46},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"hsla(198,10,50,1)","...":"[extends.colorSchemas]"},"secondary":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":46},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}},"color":"hsla(198,10,50,1)","...":"[extends.colorSchemas]"}},"size":{"0":"0.25rem","5":"0.5rem","10":"0.65rem","20":"0.75rem","30":"1rem","40":"1.25rem","50":"1.50em","60":"2rem","70":"2.5rem","80":"3rem","90":"4rem","100":"5rem","default":"16px"},"font":{"family":{"default":{"font-family":"\\"Titillium Web\\"","font-weight":400,"import":"https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap"},"title":{"font-family":"\\"Titillium Web\\"","font-weight":600,"import":"https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap"},"quote":{"font-family":"\\"Palatino, Times, Georgia, serif\\"","font-weight":"normal","font-style":"normal","font-display":"auto","cap-height":0.65},"code":{"font-family":"Menlo, Monaco, Consolas, Courier New, monospace","font-weight":"normal","font-style":"normal","font-display":"auto","cap-height":0.65}},"size":{"0":"0.25rem","5":"0.5rem","10":"0.65rem","20":"0.75rem","30":"1rem","40":"1.25rem","50":"1.50em","60":"2rem","70":"2.5rem","80":"3rem","90":"4rem","100":"5rem","default":"16px"}},"border":{"width":{"0":"0px","10":"1px","20":"2px","30":"4px","40":"6px","50":"8px","60":"12px","70":"16px","80":"20px","90":"24px","100":"30px","default":"1px"},"radius":{"0":"0","10":"4px","20":"8px","30":"12px","40":"16px","50":"20px","60":"26px","70":"32px","80":"40px","90":"50px","100":"60px","default":"10px"}},"space":{"0":"0","10":"0.375rem","20":"0.75rem","30":"1.5rem","40":"2.25rem","50":"3rem","60":"3.75rem","70":"4.5rem","80":"5.25","90":"6rem","100":"6.75rem","default":"3rem"},"margin":{"0":"0","10":"0.375rem","20":"0.75rem","30":"1.5rem","40":"2.25rem","50":"3rem","60":"3.75rem","70":"4.5rem","80":"5.25","90":"6rem","100":"6.75rem","default":"3rem"},"padding":{"0":"0","10":"0.375rem","20":"0.75rem","30":"1.5rem","40":"2.25rem","50":"3rem","60":"3.75rem","70":"4.5rem","80":"5.25","90":"6rem","100":"6.75rem","default":"3rem"},"media":{"defaultAction":">=","defaultQuery":"screen","queries":{"mobile":{"min-width":0,"max-width":639},"tablet":{"min-width":640,"max-width":1279},"desktop":{"min-width":1280,"max-width":null}}},"components":{"s-code-example":{"rhythmVertical":{"margin-bottom":60}}},"ui":{"filtrableInput":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1.4px 1.4px rgba(0, 0, 0, 0.011),\\n  0px 3.3px 3.5px rgba(0, 0, 0, 0.016),\\n  0px 6.1px 6.5px rgba(0, 0, 0, 0.02),\\n  0px 10.9px 11.6px rgba(0, 0, 0, 0.024),\\n  0px 20.5px 21.7px rgba(0, 0, 0, 0.029),\\n  0px 49px 52px rgba(0, 0, 0, 0.04)","outline":true,"rhythmVertical":{"margin-bottom":60}},"default":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":60}},"form":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","outline":true,"defaultColor":"accent","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":40}},"outline":{"active":true,"borderWidth":"10px","borderRadius":"10px","transition":"all .2s ease-out"},"scrollbar":{"size":"2px","defaultColor":"main"},"button":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","outline":true,"depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","defaultStyle":"solid","defaultColor":"main","rhythmVertical":{"margin-bottom":60}},"avatar":{"borderRadius":"10px","borderWidth":"2px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","defaultColor":"main","defaultStyle":"solid","rhythmVertical":{"margin-bottom":60}},"colorPicker":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"accent","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true,"rhythmVertical":{"margin-bottom":40}},"datePicker":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":["theme.ui.form.defaultColor"],"defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true,"rhythmVertical":{"margin-bottom":40}},"input":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"accent","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true,"rhythmVertical":{"margin-bottom":40}},"radio":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"0.5em","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true,"defaultColor":"accent","defaultStyle":"solid","rhythmVertical":{"margin-bottom":40}},"checkbox":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"0.2em","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","defaultColor":"main","defaultStyle":"solid","outline":true,"rhythmVertical":{"margin-bottom":40}},"range":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"accent","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true,"rhythmVertical":{"margin-bottom":40}},"label":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"accent","defaultStyle":"inline","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":40}},"select":{"paddingInline":"0.75em","paddingBlock":"0.375em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","defaultColor":"accent","defaultStyle":"solid","outline":true,"rhythmVertical":{"margin-bottom":40}},"switch":{"borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","defaultColor":"accent","defaultStyle":"solid","outline":true,"rhythmVertical":{"margin-bottom":40}},"dropdown":{"paddingInline":"0.75em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","outline":true},"list":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"ul","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","bulletChar":"\u25CF","rhythmVertical":{"margin-bottom":60}},"fsTree":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","bulletChar":"\u25CF","rhythmVertical":{"margin-bottom":60}},"tabs":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":0,"outline":true,"rhythmVertical":{"margin-bottom":60}},"terminal":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":60}},"tooltip":{"paddingInline":"0.75em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","arrowSize":"20px"},"code":{"paddingInline":"3rem","paddingBlock":"3rem","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":60}},"blockquote":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":60}},"table":{"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":0,"rhythmVertical":{"margin-bottom":60}},"badge":{"paddingInline":".65em","paddingBlock":".35em","borderRadius":"10px","borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultColor":"main","defaultStyle":"solid","depth":0,"rhythmVertical":{"margin-bottom":60}},"loader":{"duration":"1s","easing":"linear"},"loaderSpinner":{"duration":"1s","easing":"linear"}},"typo":{"h1":{"font-family":"title","font-size":90,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"h2":{"font-family":"title","font-size":80,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"h3":{"font-family":"title","font-size":70,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"h4":{"font-family":"title","font-size":60,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"h5":{"font-family":"title","font-size":50,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":40}},"h6":{"font-family":"title","font-size":40,"line-height":1.3,"max-width":"55ch","rhythmVertical":{"margin-bottom":40}},"p":{"font-family":"default","font-size":30,"line-height":1.8,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"lead":{"font-family":"default","font-size":50,"line-height":1.6,"max-width":"55ch","rhythmVertical":{"margin-bottom":50}},"hr":{"color":"hsla(198,10,50,1)","opacity":0.2,"rhythmVertical":{"margin-bottom":50}},"pre":{"font-family":"code","color":["main","text"],"background-color":["main","surface"],"line-height":1.5,"paddingInline":"1.5em","paddingBlock":"0.75em","borderRadius":"10px","depth":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","rhythmVertical":{"margin-bottom":50}},"code:not(pre > code)":{"display":"inline-block","font-family":"code","color":["main","text"],"background-color":["accent","surface"],"borderRadius":10,"paddingInline":10,"paddingBlock":0},"a":{"color":"accent"},"quote":{"font-family":"quote"},"b":{"font-weight":"bold"},"bold":{"font-weight":"bold"},"strong":{"font-weight":"bold"},"i":{"font-style":"italic"},"italic":{"font-style":"italic"},"em":{"font-style":"italic"},"small":{"font-size":"0.5em"},"mark":{"background-color":"#ffbb00"},"del":{"text-decoration":"line-through"},"ins":{"text-decoration":"underline"},"sub":{"vertical-align":"sub","font-size":"0.6em"},"sup":{"vertical-align":"sup","font-size":"0.6em"}},"colorSchemas":{"default":{"0":{"lighten":50},"5":{"lighten":45},"10":{"lighten":40},"15":{"lighten":35},"20":{"lighten":30},"25":{"lighten":25},"30":{"lighten":20},"35":{"lighten":15},"40":{"lighten":10},"45":{"lighten":5},"50":{"lighten":0},"55":{"darken":5},"60":{"darken":10},"65":{"darken":15},"70":{"darken":20},"75":{"darken":25},"80":{"darken":30},"85":{"darken":35},"90":{"darken":40},"95":{"darken":48},"100":{"darken":50},"text":{"lighten":0},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"backgroundForeground":{"lighten":50},"surface":{"darken":25},"surfaceForeground":{"lighten":50},"ui":{"darken":20},"uiForeground":{"lighten":50},"border":{"alpha":0.2},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}}},"defaultColor":"main"}}}}}`);

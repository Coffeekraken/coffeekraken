var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __pow = Math.pow;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
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
function validate$1(uuid) {
  return typeof uuid === "string" && REGEX.test(uuid);
}
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).substr(1));
}
function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate$1(uuid)) {
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
function matches(el, selector) {
  if (el.nodeName == "#comment" || el.nodeName == "#text") {
    return false;
  }
  const p = Element.prototype;
  const f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  };
  return f.call(el, selector);
}
function getMethods(toCheck) {
  let props = [];
  let obj = toCheck;
  do {
    const _props = Object.getOwnPropertyNames(obj);
    if (_props.indexOf("__defineGetter__") !== -1)
      continue;
    props = props.concat(_props);
  } while (obj = Object.getPrototypeOf(obj));
  return props.sort().filter(function(e, i2, arr) {
    if (e != arr[i2 + 1] && typeof toCheck[e] == "function")
      return true;
  });
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var a = Object.defineProperty({}, "__esModule", {value: true});
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var isClass = {exports: {}};
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
const fn$2 = function(cls$1, settings = {}) {
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
function plainObject$1(object) {
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
function unique$1(array) {
  const a = array.concat();
  for (let i2 = 0; i2 < a.length; ++i2) {
    for (let j = i2 + 1; j < a.length; ++j) {
      if (a[i2] === a[j])
        a.splice(j--, 1);
    }
  }
  return a;
}
var lodash_clone = {exports: {}};
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
  var DataView = getNative(root, "DataView"), Map2 = getNative(root, "Map"), Promise2 = getNative(root, "Promise"), Set = getNative(root, "Set"), WeakMap = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
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
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
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
var lodash_clonedeep = {exports: {}};
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
  var DataView = getNative(root, "DataView"), Map2 = getNative(root, "Map"), Promise2 = getNative(root, "Promise"), Set = getNative(root, "Set"), WeakMap = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
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
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
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
  settings = Object.assign({deep: false}, settings);
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
        const newArray = unique$1([...refObj[key], ...mixWithObj[key]]);
        refObj[key] = newArray;
        continue;
      }
      if (settings.object === true && plainObject$1(refObj[key]) && plainObject$1(mixWithObj[key])) {
        refObj[key] = merge(refObj[key], mixWithObj[key]);
        continue;
      }
      if (plainObject$1(mixWithObj[key]) && settings.cloneChilds) {
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
/*!
* copy-to - index.js
* Copyright(c) 2014 dead_horse <dead_horse@qq.com>
* MIT Licensed
*/
var slice = Array.prototype.slice;
var copyTo = Copy;
function Copy(src, withAccess) {
  if (!(this instanceof Copy))
    return new Copy(src, withAccess);
  this.src = src;
  this._withAccess = withAccess;
}
Copy.prototype.withAccess = function(w) {
  this._withAccess = w !== false;
  return this;
};
Copy.prototype.pick = function(keys) {
  if (!Array.isArray(keys)) {
    keys = slice.call(arguments);
  }
  if (keys.length) {
    this.keys = keys;
  }
  return this;
};
Copy.prototype.to = function(to) {
  to = to || {};
  if (!this.src)
    return to;
  var keys = this.keys || Object.keys(this.src);
  if (!this._withAccess) {
    for (var i2 = 0; i2 < keys.length; i2++) {
      key = keys[i2];
      if (to[key] !== void 0)
        continue;
      to[key] = this.src[key];
    }
    return to;
  }
  for (var i2 = 0; i2 < keys.length; i2++) {
    var key = keys[i2];
    if (!notDefined(to, key))
      continue;
    var getter = this.src.__lookupGetter__(key);
    var setter = this.src.__lookupSetter__(key);
    if (getter)
      to.__defineGetter__(key, getter);
    if (setter)
      to.__defineSetter__(key, setter);
    if (!getter && !setter) {
      to[key] = this.src[key];
    }
  }
  return to;
};
Copy.prototype.toCover = function(to) {
  var keys = this.keys || Object.keys(this.src);
  for (var i2 = 0; i2 < keys.length; i2++) {
    var key = keys[i2];
    delete to[key];
    var getter = this.src.__lookupGetter__(key);
    var setter = this.src.__lookupSetter__(key);
    if (getter)
      to.__defineGetter__(key, getter);
    if (setter)
      to.__defineSetter__(key, setter);
    if (!getter && !setter) {
      to[key] = this.src[key];
    }
  }
};
Copy.prototype.override = Copy.prototype.toCover;
Copy.prototype.and = function(obj) {
  var src = {};
  this.to(src);
  this.src = obj;
  this.to(src);
  this.src = src;
  return this;
};
function notDefined(obj, key) {
  return obj[key] === void 0 && obj.__lookupGetter__(key) === void 0 && obj.__lookupSetter__(key) === void 0;
}
function deepMerge$1(...args) {
  const settings = {
    array: false,
    object: true
  };
  function merge(firstObj, secondObj) {
    const newObj = {};
    if (!firstObj && secondObj)
      return secondObj;
    if (!secondObj && firstObj)
      return firstObj;
    if (!firstObj && !secondObj)
      return {};
    copyTo(firstObj).override(newObj);
    for (const key of Object.keys(secondObj)) {
      if (settings.array === true && Array.isArray(firstObj[key]) && Array.isArray(secondObj[key])) {
        const newArray = unique$1([...firstObj[key], ...secondObj[key]]);
        newObj[key] = newArray;
        continue;
      } else if (settings.object === true && plainObject$1(firstObj[key]) && plainObject$1(secondObj[key])) {
        newObj[key] = merge(firstObj[key], secondObj[key]);
        continue;
      }
      copyTo(secondObj).pick(key).toCover(newObj);
    }
    return newObj;
  }
  const potentialSettingsObj = args[args.length - 1] || {};
  if (potentialSettingsObj.array && typeof potentialSettingsObj.array === "boolean" || potentialSettingsObj.object && typeof potentialSettingsObj.object === "boolean") {
    if (potentialSettingsObj.array !== void 0)
      settings.array = potentialSettingsObj.array;
    if (potentialSettingsObj.object !== void 0)
      settings.object = potentialSettingsObj.object;
    args.pop();
  }
  let currentObj = {};
  for (let i2 = 0; i2 < args.length; i2++) {
    const toMergeObj = args[i2] || {};
    currentObj = merge(currentObj, toMergeObj);
  }
  return currentObj;
}
function unquote(string, quotesToRemove = ['"', "'", "\u201D", "`"]) {
  string = string.trim();
  quotesToRemove.forEach((quote) => {
    if (string.substr(0, 1) === quote && string.substr(-1) === quote) {
      string = string.substr(1);
      string = string.substr(0, string.length - 1);
      return;
    }
  });
  return string;
}
function get(obj, path2, settings = {}) {
  settings = Object.assign({}, settings);
  if (obj[path2] !== void 0)
    return obj[path2];
  if (!path2 || path2 === "" || path2 === ".")
    return obj;
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
  potentialPaths = unique$1(potentialPaths.map((s) => s.replace(/\?/gm, "")));
  for (let i2 = 0; i2 < potentialPaths.length; i2++) {
    const path3 = potentialPaths[i2];
    const result = __get(obj, path3, settings);
    if (result !== void 0)
      return result;
  }
}
function __get(obj, path2, settings = {}) {
  settings = Object.assign({}, settings);
  if (obj[path2] !== void 0)
    return obj[path2];
  if (!path2 || path2 === "" || path2 === ".")
    return obj;
  const a = path2.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((p) => unquote(p));
  let o = obj;
  while (a.length) {
    const n = a.shift().replace(/\?$/, "");
    if (typeof o !== "object" || !(n in o)) {
      return;
    }
    o = o[n];
  }
  return o;
}
var md5$1 = {exports: {}};
var core = {exports: {}};
var __viteBrowserExternal_crypto = new Proxy({}, {
  get() {
    throw new Error('Module "crypto" has been externalized for browser compatibility and cannot be accessed in client code.');
  }
});
var __viteBrowserExternal_crypto$1 = /* @__PURE__ */ Object.freeze({__proto__: null, [Symbol.toStringTag]: "Module", "default": __viteBrowserExternal_crypto});
var require$$0$1 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal_crypto$1);
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
      if (!crypto2 && typeof window !== "undefined" && window.msCrypto) {
        crypto2 = window.msCrypto;
      }
      if (!crypto2 && typeof commonjsGlobal !== "undefined" && commonjsGlobal.crypto) {
        crypto2 = commonjsGlobal.crypto;
      }
      if (!crypto2 && typeof require === "function") {
        try {
          crypto2 = require$$0$1;
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
        return function(obj) {
          var subtype;
          F.prototype = obj;
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
            for (var i2 = 0; i2 < thatSigBytes; i2 += 4) {
              thisWords[thisSigBytes + i2 >>> 2] = thatWords[i2 >>> 2];
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
          var d = H[3];
          a = FF(a, b, c, d, M_offset_0, 7, T[0]);
          d = FF(d, a, b, c, M_offset_1, 12, T[1]);
          c = FF(c, d, a, b, M_offset_2, 17, T[2]);
          b = FF(b, c, d, a, M_offset_3, 22, T[3]);
          a = FF(a, b, c, d, M_offset_4, 7, T[4]);
          d = FF(d, a, b, c, M_offset_5, 12, T[5]);
          c = FF(c, d, a, b, M_offset_6, 17, T[6]);
          b = FF(b, c, d, a, M_offset_7, 22, T[7]);
          a = FF(a, b, c, d, M_offset_8, 7, T[8]);
          d = FF(d, a, b, c, M_offset_9, 12, T[9]);
          c = FF(c, d, a, b, M_offset_10, 17, T[10]);
          b = FF(b, c, d, a, M_offset_11, 22, T[11]);
          a = FF(a, b, c, d, M_offset_12, 7, T[12]);
          d = FF(d, a, b, c, M_offset_13, 12, T[13]);
          c = FF(c, d, a, b, M_offset_14, 17, T[14]);
          b = FF(b, c, d, a, M_offset_15, 22, T[15]);
          a = GG(a, b, c, d, M_offset_1, 5, T[16]);
          d = GG(d, a, b, c, M_offset_6, 9, T[17]);
          c = GG(c, d, a, b, M_offset_11, 14, T[18]);
          b = GG(b, c, d, a, M_offset_0, 20, T[19]);
          a = GG(a, b, c, d, M_offset_5, 5, T[20]);
          d = GG(d, a, b, c, M_offset_10, 9, T[21]);
          c = GG(c, d, a, b, M_offset_15, 14, T[22]);
          b = GG(b, c, d, a, M_offset_4, 20, T[23]);
          a = GG(a, b, c, d, M_offset_9, 5, T[24]);
          d = GG(d, a, b, c, M_offset_14, 9, T[25]);
          c = GG(c, d, a, b, M_offset_3, 14, T[26]);
          b = GG(b, c, d, a, M_offset_8, 20, T[27]);
          a = GG(a, b, c, d, M_offset_13, 5, T[28]);
          d = GG(d, a, b, c, M_offset_2, 9, T[29]);
          c = GG(c, d, a, b, M_offset_7, 14, T[30]);
          b = GG(b, c, d, a, M_offset_12, 20, T[31]);
          a = HH(a, b, c, d, M_offset_5, 4, T[32]);
          d = HH(d, a, b, c, M_offset_8, 11, T[33]);
          c = HH(c, d, a, b, M_offset_11, 16, T[34]);
          b = HH(b, c, d, a, M_offset_14, 23, T[35]);
          a = HH(a, b, c, d, M_offset_1, 4, T[36]);
          d = HH(d, a, b, c, M_offset_4, 11, T[37]);
          c = HH(c, d, a, b, M_offset_7, 16, T[38]);
          b = HH(b, c, d, a, M_offset_10, 23, T[39]);
          a = HH(a, b, c, d, M_offset_13, 4, T[40]);
          d = HH(d, a, b, c, M_offset_0, 11, T[41]);
          c = HH(c, d, a, b, M_offset_3, 16, T[42]);
          b = HH(b, c, d, a, M_offset_6, 23, T[43]);
          a = HH(a, b, c, d, M_offset_9, 4, T[44]);
          d = HH(d, a, b, c, M_offset_12, 11, T[45]);
          c = HH(c, d, a, b, M_offset_15, 16, T[46]);
          b = HH(b, c, d, a, M_offset_2, 23, T[47]);
          a = II(a, b, c, d, M_offset_0, 6, T[48]);
          d = II(d, a, b, c, M_offset_7, 10, T[49]);
          c = II(c, d, a, b, M_offset_14, 15, T[50]);
          b = II(b, c, d, a, M_offset_5, 21, T[51]);
          a = II(a, b, c, d, M_offset_12, 6, T[52]);
          d = II(d, a, b, c, M_offset_3, 10, T[53]);
          c = II(c, d, a, b, M_offset_10, 15, T[54]);
          b = II(b, c, d, a, M_offset_1, 21, T[55]);
          a = II(a, b, c, d, M_offset_8, 6, T[56]);
          d = II(d, a, b, c, M_offset_15, 10, T[57]);
          c = II(c, d, a, b, M_offset_6, 15, T[58]);
          b = II(b, c, d, a, M_offset_13, 21, T[59]);
          a = II(a, b, c, d, M_offset_4, 6, T[60]);
          d = II(d, a, b, c, M_offset_11, 10, T[61]);
          c = II(c, d, a, b, M_offset_2, 15, T[62]);
          b = II(b, c, d, a, M_offset_9, 21, T[63]);
          H[0] = H[0] + a | 0;
          H[1] = H[1] + b | 0;
          H[2] = H[2] + c | 0;
          H[3] = H[3] + d | 0;
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
      function FF(a, b, c, d, x, s, t) {
        var n = a + (b & c | ~b & d) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      function GG(a, b, c, d, x, s, t) {
        var n = a + (b & d | c & ~d) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      function HH(a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      function II(a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      C.MD5 = Hasher._createHelper(MD5);
      C.HmacMD5 = Hasher._createHmacHelper(MD5);
    })(Math);
    return CryptoJS.MD5;
  });
})(md5$1);
var md5 = md5$1.exports;
var ansiStyles$1 = {exports: {}};
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
  rgb: {channels: 3, labels: "rgb"},
  hsl: {channels: 3, labels: "hsl"},
  hsv: {channels: 3, labels: "hsv"},
  hwb: {channels: 3, labels: "hwb"},
  cmyk: {channels: 4, labels: "cmyk"},
  xyz: {channels: 3, labels: "xyz"},
  lab: {channels: 3, labels: "lab"},
  lch: {channels: 3, labels: "lch"},
  hex: {channels: 1, labels: ["hex"]},
  keyword: {channels: 1, labels: ["keyword"]},
  ansi16: {channels: 1, labels: ["ansi16"]},
  ansi256: {channels: 1, labels: ["ansi256"]},
  hcg: {channels: 3, labels: ["h", "c", "g"]},
  apple: {channels: 3, labels: ["r16", "g16", "b16"]},
  gray: {channels: 1, labels: ["gray"]}
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
  const {channels, labels} = convert$1[model];
  delete convert$1[model].channels;
  delete convert$1[model].labels;
  Object.defineProperty(convert$1[model], "channels", {value: channels});
  Object.defineProperty(convert$1[model], "labels", {value: labels});
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
  return __pow(x[0] - y[0], 2) + __pow(x[1] - y[1], 2) + __pow(x[2] - y[2], 2);
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
  r = r > 0.04045 ? __pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? __pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? __pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
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
  x = x > 8856e-6 ? __pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 8856e-6 ? __pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 8856e-6 ? __pow(z, 1 / 3) : 7.787 * z + 16 / 116;
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
  r = r > 31308e-7 ? 1.055 * __pow(r, 1 / 2.4) - 0.055 : r * 12.92;
  g = g > 31308e-7 ? 1.055 * __pow(g, 1 / 2.4) - 0.055 : g * 12.92;
  b = b > 31308e-7 ? 1.055 * __pow(b, 1 / 2.4) - 0.055 : b * 12.92;
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
  x = x > 8856e-6 ? __pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 8856e-6 ? __pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 8856e-6 ? __pow(z, 1 / 3) : 7.787 * z + 16 / 116;
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
  const y2 = __pow(y, 3);
  const x2 = __pow(x, 3);
  const z2 = __pow(z, 3);
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
  const string = integer.toString(16).toUpperCase();
  return "000000".substring(string.length) + string;
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
  const string = integer.toString(16).toUpperCase();
  return "000000".substring(string.length) + string;
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
  Object.defineProperty(convert[fromModel], "channels", {value: conversions[fromModel].channels});
  Object.defineProperty(convert[fromModel], "labels", {value: conversions[fromModel].labels});
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
  const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
    if (colorConvert$1 === void 0) {
      colorConvert$1 = colorConvert;
    }
    const offset = isBackground ? 10 : 0;
    const styles2 = {};
    for (const [sourceSpace, suite] of Object.entries(colorConvert$1)) {
      const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
      if (sourceSpace === targetSpace) {
        styles2[name] = wrap(identity, offset);
      } else if (typeof suite === "object") {
        styles2[name] = wrap(suite[targetSpace], offset);
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
const stringReplaceAll$1 = (string, substring, replacer) => {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.substr(endIndex);
  return returnValue;
};
const stringEncaseCRLFWithFirstIndex$1 = (string, prefix, postfix, index) => {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.substr(endIndex);
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
  let matches2;
  for (const chunk of chunks) {
    const number = Number(chunk);
    if (!Number.isNaN(number)) {
      results.push(number);
    } else if (matches2 = chunk.match(STRING_REGEX)) {
      results.push(matches2[2].replace(ESCAPE_REGEX, (m, escape2, character) => escape2 ? unescape$1(escape2) : character));
    } else {
      throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
    }
  }
  return results;
}
function parseStyle(style) {
  STYLE_REGEX.lastIndex = 0;
  const results = [];
  let matches2;
  while ((matches2 = STYLE_REGEX.exec(style)) !== null) {
    const name = matches2[1];
    if (matches2[2]) {
      const args = parseArguments(name, matches2[2]);
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
      const string = chunk.join("");
      chunk = [];
      chunks.push(styles2.length === 0 ? string : buildStyle(chalk2, styles2)(string));
      styles2.push({inverse, styles: parseStyle(style)});
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
const {stdout: stdoutColor, stderr: stderrColor} = browser;
const {
  stringReplaceAll,
  stringEncaseCRLFWithFirstIndex
} = util;
const {isArray: isArray$3} = Array;
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
      Object.defineProperty(this, styleName, {value: builder});
      return builder;
    }
  };
}
styles.visible = {
  get() {
    const builder = createBuilder(this, this._styler, true);
    Object.defineProperty(this, "visible", {value: builder});
    return builder;
  }
};
const usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
for (const model of usedModels) {
  styles[model] = {
    get() {
      const {level} = this;
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
      const {level} = this;
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
    if (isArray$3(arguments_[0]) && isArray$3(arguments_[0].raw)) {
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
const applyStyle = (self2, string) => {
  if (self2.level <= 0 || !string) {
    return self2._isEmpty ? "" : string;
  }
  let styler = self2._styler;
  if (styler === void 0) {
    return string;
  }
  const {openAll, closeAll} = styler;
  if (string.indexOf("") !== -1) {
    while (styler !== void 0) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf("\n");
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};
let template;
const chalkTag = (chalk2, ...strings) => {
  const [firstString] = strings;
  if (!isArray$3(firstString) || !isArray$3(firstString.raw)) {
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
chalk.stderr = Chalk({level: stderrColor ? stderrColor.level : 0});
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
  settings = deepMerge$1({
    classInstances: false,
    array: true,
    privateProps: false,
    cloneFirst: true
  }, settings);
  const isArray2 = Array.isArray(objectOrArray);
  const newObject = isArray2 ? [] : settings.cloneFirst ? Object.assign({}, objectOrArray) : objectOrArray;
  Object.keys(objectOrArray).forEach((prop) => {
    if (!settings.privateProps && prop.match(/^_/))
      return;
    if (plainObject$1(objectOrArray[prop]) || classInstance(objectOrArray[prop]) && settings.classInstances || Array.isArray(objectOrArray[prop]) && settings.array) {
      const res2 = deepMap(objectOrArray[prop], processor, settings, [
        ..._path,
        prop
      ]);
      if (isArray2) {
        newObject.push(res2);
      } else {
        newObject[prop] = res2;
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
    else
      newObject[prop] = res;
  });
  return newObject;
}
function isMap(value) {
  return value instanceof Map;
}
function isArray$2(value) {
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
  const obj = {};
  for (const [k, v] of map)
    obj[k] = v;
  return obj;
}
var decycle_1;
const isArray$1 = (e) => Array.isArray(e), isObject = (e) => Object.prototype.toString.call(e).slice(8, -1) === "Object", validate = (e) => {
  if (e === void 0)
    throw new Error("This method requires one parameter");
  if (!isArray$1(e) && !isObject(e))
    throw new TypeError("This method only accepts arrays and objects");
}, isRef = (e) => isObject(e) && e.hasOwnProperty("$ref") && Object.keys(e).length === 1 && !!e.$ref && e.$ref.charAt(0) === "$", encycle = (arg) => {
  validate(arg);
  const recurs = (value) => isArray$1(value) || isObject(value) ? isArray$1(value) ? value.map((elem, i) => isRef(elem) ? (value[i] = eval("arg" + elem.$ref.slice(1)), value) : recurs(elem)) : Object.keys(value).reduce((accum, key) => (accum[key] = isRef(value[key]) ? eval("arg" + value[key].$ref.slice(1)) : recurs(value[key]), accum), value) : value;
  return recurs(arg);
}, findRef = (e, r) => Object.keys(r).find((a) => r[a] === e), decycle = (e) => {
  validate(e);
  let r = {};
  const a = (e2, c = "$") => {
    const s = findRef(e2, r);
    return s ? {$ref: s} : isArray$1(e2) || isObject(e2) ? (r[c] = e2, isArray$1(e2) ? e2.map((e3, r2) => a(e3, `${c}[${r2}]`)) : Object.keys(e2).reduce((r2, s2) => (r2[s2] = a(e2[s2], `${c}.${s2}`), r2), {})) : e2;
  };
  return a(e);
};
decycle_1 = decycle, encycle;
function fn$1(value, settings = {}) {
  settings = deepMerge$1({
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
  if (isObject$1(value) || isArray$2(value) || isJson(value)) {
    try {
      value = decycle_1(value);
    } catch (e) {
    }
    value = deepMap(value, ({value: value2}) => {
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
var parse$1 = (value) => {
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
      message = fn$1(message);
    const string = md5(message).toString();
    __encryptedMessages[string] = message;
    return string;
  },
  decrypt: function(message) {
    if (!__encryptedMessages[message]) {
      console.warn(`The message "${message}" cannot be decrypted...`);
      return;
    }
    const string = __encryptedMessages[message];
    delete __encryptedMessages[message];
    return parse$1(string);
  }
};
function availableColors(settings) {
  settings = Object.assign({excludeBasics: false}, settings !== null && settings !== void 0 ? settings : {});
  const _colors = [
    "yellow",
    "cyan",
    "green",
    "magenta",
    "red",
    "blue",
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
  settings = deepMerge$1({
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
var __set = (obj, path2, value, settings = {}) => {
  settings = Object.assign({}, settings);
  if (!path2 || path2 === "" || path2 === ".") {
    obj = value;
    return;
  }
  path2 = path2.replace(/\[(\w+)\]/g, ".[$1]");
  const a = unquote(path2).split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((p) => unquote(p));
  let o = obj;
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
  return get(obj, path2);
};
function toJson(object) {
  const newObj = {};
  deepMap(object, ({value, path: path2}) => {
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
    var _a, _b, _c;
    let name = `<yellow>${((_a = this.metas) === null || _a === void 0 ? void 0 : _a.name) || ""}</yellow>`;
    if ((_b = this.metas) === null || _b === void 0 ? void 0 : _b.id) {
      name += ` <cyan>${(_c = this.metas) === null || _c === void 0 ? void 0 : _c.id}</cyan>`;
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
  var _a, _b, _c, _d, _e, _f, _g, _h;
  let name = `<yellow>${((_a = ctx._settings.metas) === null || _a === void 0 ? void 0 : _a.name) || ""}</yellow>`;
  if ((_b = ctx._settings.metas) === null || _b === void 0 ? void 0 : _b.id) {
    name += ` <cyan>${ctx._settings.metas.id}</cyan>`;
  }
  const metasObj = {
    id: (_d = (_c = ctx._settings.metas) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : ctx.constructor.name,
    name: (_f = (_e = ctx._settings.metas) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : ctx.constructor.name,
    formattedName: name,
    color: (_h = (_g = ctx._settings.metas) === null || _g === void 0 ? void 0 : _g.color) !== null && _h !== void 0 ? _h : "yellow"
  };
  return metasObj;
}
function generateInterfacesStack(ctx) {
  const extendsStack = fn$2(ctx, {
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
  settings = deepMerge$1({
    as: void 0,
    props: []
  }, settings);
  if (settings.as && typeof settings.as === "string") {
    ctx[settings.as] = instance;
  }
  if (settings.props) {
    settings.props.forEach((prop) => {
      ctx[prop] = instance[prop].bind(instance);
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
        if (plainObject$1(interfacesObj[name])) {
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
  if (plainObject$1(interfaceObj))
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
      if (plainObject$1(interfaceObj)) {
        settings = Object.assign({}, Object.assign({apply: true, on: name === "settings" ? "_settings" : name === "this" ? ctx : void 0}, interfaceObj));
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
  if (plainObject$1(interfaceObj)) {
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
        complete: true,
        throw: true
      });
      deepAssign(ctx, res.value);
      return ctx;
    } else {
      res = interfaceObj.class.apply(onValue, {
        id: applyId,
        complete: true,
        throw: true
      });
      if (interfaceObj.on && typeof interfaceObj.on === "object") {
        const returnValue = deepAssign(interfaceObj.on, res.value);
        return returnValue;
      } else if (interfaceObj.on && typeof interfaceObj.on === "string") {
        return deepAssign(get(ctx, interfaceObj.on), res.value);
      } else if (ctx[name] !== void 0) {
        return ctx[name];
      } else if (!res.hasIssues()) {
        return res.value;
      }
    }
  }
}
function setSettings(ctx, settings = {}) {
  var _a;
  ctx._settings = settings;
  if (!ctx._settings.metas)
    ctx._settings.metas = {};
  if (!((_a = ctx._settings.metas) === null || _a === void 0 ? void 0 : _a.id))
    ctx._settings.metas.id = ctx.constructor.name;
  if (!ctx.constructor.name.match(/^SConfig/)) {
    if (!ctx._settings.metas.color)
      ctx._settings.metas.color = getColorFor(ctx.constructor.name, {
        scope: "class"
      });
  } else if (!ctx._settings.metas.color)
    ctx._settings.metas.color = "yellow";
}
var __viteBrowserExternal_path = new Proxy({}, {
  get() {
    throw new Error('Module "path" has been externalized for browser compatibility and cannot be accessed in client code.');
  }
});
var __viteBrowserExternal_path$1 = /* @__PURE__ */ Object.freeze({__proto__: null, [Symbol.toStringTag]: "Module", "default": __viteBrowserExternal_path});
var require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal_path$1);
var concatMap$1 = function(xs, fn2) {
  var res = [];
  for (var i2 = 0; i2 < xs.length; i2++) {
    var x = fn2(xs[i2], i2);
    if (isArray(x))
      res.push.apply(res, x);
    else
      res.push(x);
  }
  return res;
};
var isArray = Array.isArray || function(xs) {
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
  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }
  return expansions;
}
var minimatch_1 = minimatch;
minimatch.Minimatch = Minimatch;
var path = {sep: "/"};
try {
  path = require$$0;
} catch (er) {
}
var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
var expand = braceExpansion;
var plTypes = {
  "!": {open: "(?:(?!(?:", close: "))[^/]*?)"},
  "?": {open: "(?:", close: ")?"},
  "+": {open: "(?:", close: ")+"},
  "*": {open: "(?:", close: ")*"},
  "@": {open: "(?:", close: ")"}
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
  this.debug("matchOne", {"this": this, file, pattern});
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
var ansiRegex$1 = ({onlyFirst = false} = {}) => {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
  ].join("|");
  return new RegExp(pattern, onlyFirst ? void 0 : "g");
};
const ansiRegex = ansiRegex$1;
var stripAnsi$1 = (string) => typeof string === "string" ? string.replace(ansiRegex(), "") : string;
function stripAnsi(string) {
  return stripAnsi$1(string);
}
var __awaiter$1 = function(thisArg, _arguments, P, generator) {
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
    super(deepMerge$1({
      eventEmitter: {
        emitter: void 0,
        asyncStart: false,
        defaultCallTime: {},
        bufferTimeout: 1e3,
        bufferedEvents: [],
        forceObject: ["log", "warn", "error"],
        defaults: {},
        bind: void 0
      }
    }, settings || {}));
    this._asyncStarted = false;
    this._buffer = [];
    this._eventsStacks = {};
    this._onStackById = {};
  }
  static pipe(sourceSEventEmitter, destSEventEmitter, settings) {
    const set = Object.assign({events: "*", prefixEvent: false, prefixValue: void 0, stripAnsi: false, trim: true, keepLineBreak: true, overrideEmitter: "bind", processor: void 0, exclude: ["finally", "resolve", "reject", "cancel", "catch"], filter: void 0}, settings !== null && settings !== void 0 ? settings : {});
    if (!sourceSEventEmitter || !sourceSEventEmitter.on || typeof sourceSEventEmitter.on !== "function")
      return sourceSEventEmitter;
    sourceSEventEmitter.on(set.events || "*", (value, metas) => __awaiter$1(this, void 0, void 0, function* () {
      if (metas.event.match(/^answer\..*/)) {
        return;
      }
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
        if (metas.askId) {
          destSEventEmitter.on(`${metas.event}:1`, (value2, onMetas) => {
            sourceSEventEmitter.emit(`answer.${metas.askId}`, value2);
          });
        }
        const emitMetas = Object.assign(Object.assign({}, metas), {level: metas && metas.level ? metas.level + 1 : 1});
        if (set.overrideEmitter === "bind" && destSEventEmitter.eventEmitterSettings.bind) {
          emitMetas.emitter = destSEventEmitter.eventEmitterSettings.bind;
        } else if (set.overrideEmitter === true) {
          emitMetas.emitter = destSEventEmitter;
        }
        destSEventEmitter.emit(metas.event, value, emitMetas);
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
  emit(event, value, metas) {
    return new Promise((resolve, reject) => __awaiter$1(this, void 0, void 0, function* () {
      const finalMetas = Object.assign({}, metas || {});
      const isFirstLevel = !finalMetas.level;
      if ((this.eventEmitterSettings.forceObject === true || Array.isArray(this.eventEmitterSettings.forceObject) && this.eventEmitterSettings.forceObject.indexOf(event) !== -1) && !plainObject$1(value)) {
        value = {
          value
        };
      }
      if (plainObject$1(value)) {
        Object.keys(this.eventEmitterSettings.defaults).forEach((key) => {
          var _a;
          const parts = key.split(",").map((l) => l.trim());
          if (parts.indexOf(event) === -1 && parts.indexOf("*") === -1)
            return;
          value = deepMerge$1(value, (_a = this.eventEmitterSettings.defaults) === null || _a === void 0 ? void 0 : _a[key]);
        });
      }
      if (!finalMetas.askId && isFirstLevel) {
        if (value && value.ask === true || event === "ask") {
          finalMetas.askId = uniqid();
          finalMetas.ask = true;
        }
      }
      if (isFirstLevel && finalMetas.askId) {
        this.on(`answer.${finalMetas.askId}:1`, (value2) => {
          resolve(value2);
        });
        this._emitEvents(event, value, finalMetas);
      } else {
        const res = yield this._emitEvents(event, value, finalMetas);
        return resolve(res);
      }
    }));
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
    settings = Object.assign({callNumber: void 0, filter: void 0, processor: void 0, id: void 0}, settings);
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
          this.emit(item.event, item.value);
          return false;
        });
      }, this.eventEmitterSettings.bufferTimeout);
    }
  }
  _emitEventStack(event, initialValue, metas) {
    var _a, _b, _c;
    return __awaiter$1(this, void 0, void 0, function* () {
      let currentCallbackReturnedValue = initialValue;
      if (!this._eventsStacks || Object.keys(this._eventsStacks).length === 0)
        return currentCallbackReturnedValue;
      if (!this._asyncStarted && this.eventEmitterSettings.asyncStart) {
        this._buffer.push({
          event,
          value: initialValue
        });
        return initialValue;
      }
      if (!this._eventsStacks[event]) {
        this._registerNewEventsStacks(event);
      }
      let eventStackArray = [];
      const eventStackObj = this._eventsStacks[event];
      if (eventStackObj && eventStackObj.callStack) {
        eventStackArray = [...eventStackArray, ...eventStackObj.callStack];
      }
      Object.keys(this._eventsStacks).forEach((stackName) => {
        if (stackName === event)
          return;
        if (minimatch_1(event, stackName) && this._eventsStacks[stackName] !== void 0) {
          eventStackArray = [
            ...eventStackArray,
            ...this._eventsStacks[stackName].callStack
          ];
        }
      });
      if (eventStackArray.length === 0) {
        for (let i2 = 0; i2 < this.eventEmitterSettings.bufferedEvents.length; i2++) {
          const bufferedStack = this.eventEmitterSettings.bufferedEvents[i2];
          if (bufferedStack && minimatch_1(event, bufferedStack)) {
            this._buffer.push({
              event,
              value: initialValue
            });
          }
        }
        return initialValue;
      }
      eventStackArray.map((item) => item.called++);
      eventStackArray = eventStackArray.filter((item) => {
        if (item.callNumber === -1)
          return true;
        if (item.called <= item.callNumber)
          return true;
        return false;
      });
      let metasObj = deepMerge$1({
        event,
        name: event,
        emitter: (_b = (_a = this.eventEmitterSettings.bind) !== null && _a !== void 0 ? _a : metas === null || metas === void 0 ? void 0 : metas.emitter) !== null && _b !== void 0 ? _b : this,
        originalEmitter: (_c = metas === null || metas === void 0 ? void 0 : metas.originalEmitter) !== null && _c !== void 0 ? _c : this,
        time: Date.now(),
        level: 1,
        id: uniqid()
      }, metas);
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
        const callbackResult = yield item.callback(currentCallbackReturnedValue, metasObj);
        if (callbackResult !== void 0) {
          currentCallbackReturnedValue = callbackResult;
        }
      }
      if (!eventStackArray.length && metasObj.askId) {
        this.emit(`answer.${metasObj.askId}`, currentCallbackReturnedValue);
      }
      return currentCallbackReturnedValue;
    });
  }
  _emitEvents(events, initialValue, metas) {
    return new Promise((resolve, reject) => __awaiter$1(this, void 0, void 0, function* () {
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
    const set = deepMerge$1({
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
function unique(array) {
  const a = array.concat();
  for (let i2 = 0; i2 < a.length; ++i2) {
    for (let j = i2 + 1; j < a.length; ++j) {
      if (a[i2] === a[j])
        a.splice(j--, 1);
    }
  }
  return a;
}
function deepMerge(...args) {
  const settings = {
    array: false,
    object: true
  };
  function merge(firstObj, secondObj) {
    const newObj = {};
    if (!firstObj && secondObj)
      return secondObj;
    if (!secondObj && firstObj)
      return firstObj;
    if (!firstObj && !secondObj)
      return {};
    copyTo(firstObj).override(newObj);
    for (const key of Object.keys(secondObj)) {
      if (settings.array === true && Array.isArray(firstObj[key]) && Array.isArray(secondObj[key])) {
        const newArray = unique([...firstObj[key], ...secondObj[key]]);
        newObj[key] = newArray;
        continue;
      } else if (settings.object === true && plainObject(firstObj[key]) && plainObject(secondObj[key])) {
        newObj[key] = merge(firstObj[key], secondObj[key]);
        continue;
      }
      copyTo(secondObj).pick(key).toCover(newObj);
    }
    return newObj;
  }
  const potentialSettingsObj = args[args.length - 1] || {};
  if (potentialSettingsObj.array && typeof potentialSettingsObj.array === "boolean" || potentialSettingsObj.object && typeof potentialSettingsObj.object === "boolean") {
    if (potentialSettingsObj.array !== void 0)
      settings.array = potentialSettingsObj.array;
    if (potentialSettingsObj.object !== void 0)
      settings.object = potentialSettingsObj.object;
    args.pop();
  }
  let currentObj = {};
  for (let i2 = 0; i2 < args.length; i2++) {
    const toMergeObj = args[i2] || {};
    currentObj = merge(currentObj, toMergeObj);
  }
  return currentObj;
}
function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
const fn = function treatAsValue(promise, settings = {}) {
  settings = Object.assign({during: -1}, settings);
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
var __awaiter = function(thisArg, _arguments, P, generator) {
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
    super(deepMerge({
      promise: {
        treatCancelAs: "resolve",
        destroyTimeout: 1,
        preventRejectOnThrow: true,
        emitErrorEventOnThrow: true,
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
    this._eventEmitter = new SEventEmitter(deepMerge({
      metas: this.metas,
      eventEmitter: {}
    }, this._settings));
    this.expose(this._eventEmitter, {
      as: "eventEmitter",
      props: ["on", "off", "emit", "pipe", "pipeFrom", "pipeTo"]
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
      (() => __awaiter(this, void 0, void 0, function* () {
        yield wait(0);
        try {
          yield executorFn(api);
        } catch (e) {
          if (this.promiseSettings.emitErrorEventOnThrow) {
            this.emit("error", e);
          }
          this.reject(e);
        }
      }))();
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
    return __awaiter(this, void 0, void 0, function* () {
      if (this._promiseState === "destroyed")
        return;
      this._promiseState = "resolved";
      let stacksResult = yield this.eventEmitter._emitEvents(stacksOrder, arg);
      for (const proxyFn of this._settings.promise.proxies.resolve || []) {
        stacksResult = yield proxyFn(stacksResult);
      }
      this._resolvers.resolve(stacksResult);
      return stacksResult;
    });
  }
  reject(arg, stacksOrder = `catch,reject,finally`) {
    return this._reject(arg, stacksOrder);
  }
  _reject(arg, stacksOrder = `catch,reject,finally`) {
    return __awaiter(this, void 0, void 0, function* () {
      if (this._promiseState === "destroyed")
        return;
      this._promiseState = "rejected";
      let stacksResult = yield this.eventEmitter._emitEvents(stacksOrder, arg);
      for (const proxyFn of this._settings.promise.proxies.reject || []) {
        stacksResult = yield proxyFn(stacksResult);
      }
      this._resolvers.reject(stacksResult);
      return stacksResult;
    });
  }
  cancel(arg, stacksOrder = "cancel,finally") {
    return this._cancel(arg, stacksOrder);
  }
  _cancel(arg, stacksOrder = "cancel,finally") {
    if (this._promiseState === "destroyed")
      return;
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
      this._promiseState = "canceled";
      const stacksResult = yield this.eventEmitter._emitEvents(stacksOrder, arg);
      if (this._settings.promise.treatCancelAs === "reject") {
        this._resolvers.reject(stacksResult);
      } else {
        this._resolvers.resolve(stacksResult);
      }
      resolve(stacksResult);
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
let _observer;
const _selectors = {};
function querySelectorLive(selector, cb = null, settings = {}) {
  const id = `${selector} - ${uniqid()}`;
  settings = Object.assign({}, {
    rootNode: document,
    once: true
  }, settings);
  if (!_selectors[selector]) {
    _selectors[selector] = [
      {
        id,
        selector,
        cb,
        lastMutationId: null,
        settings
      }
    ];
  } else {
    _selectors[selector].push({
      id,
      selector,
      cb,
      lastMutationId: null,
      settings
    });
  }
  return new SPromise(({resolve, reject, emit}) => {
    function pushNewNode(node, sel, mutationId) {
      const objs = _selectors[sel];
      if (!objs)
        return;
      objs.forEach((obj) => {
        if (obj.lastMutationId && obj.lastMutationId === mutationId)
          return;
        if (obj.settings.once) {
          if (!node._querySelectorLive) {
            node._querySelectorLive = {};
          }
          if (node._querySelectorLive[obj.id])
            return;
          node._querySelectorLive[obj.id] = true;
        }
        emit("node", node);
        obj.cb && obj.cb(node, () => {
          delete _selectors[obj.selector];
        });
      });
    }
    if (!_observer) {
      _observer = new MutationObserver((mutations) => {
        const mutationId = `mutation-${uniqid()}`;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes && mutation.addedNodes.length) {
            [].forEach.call(mutation.addedNodes, (node) => {
              const selectors = Object.keys(_selectors);
              selectors.forEach((sel) => {
                if (matches(node, sel)) {
                  pushNewNode(node, sel, mutationId);
                }
              });
              if (!node.querySelectorAll)
                return;
              selectors.forEach((sel) => {
                const nestedNodes = node.querySelectorAll(sel);
                [].forEach.call(nestedNodes, (nestedNode) => {
                  pushNewNode(nestedNode, sel, mutationId);
                });
              });
            });
          } else if (mutation.attributeName) {
            const selectors = Object.keys(_selectors);
            selectors.forEach((sel) => {
              if (matches(mutation.target, sel)) {
                pushNewNode(mutation.target, sel, mutationId);
              }
            });
          }
        });
      });
      _observer.observe(settings.rootNode, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "id"]
      });
    }
    [].forEach.call(settings.rootNode.querySelectorAll(selector), (node) => {
      pushNewNode(node, selector, "init");
    });
  });
}
function expandPleasantCssClassname(classesStr) {
  const classesArray = [];
  const classNames = classesStr.split(/\s+/);
  let currentMedia = "";
  classNames.forEach((className) => {
    if (className.slice(0, 1) == "@") {
      currentMedia = className.replace("@", "___");
      return;
    }
    const parts = className.split(":");
    if (parts.length === 1) {
      let name = className;
      if (currentMedia !== "")
        name = className + currentMedia;
      classesArray.push(name);
    } else {
      const firstClass = parts[0];
      let name = firstClass;
      if (currentMedia !== "")
        name = firstClass + currentMedia;
      classesArray.push(name);
      parts.forEach((part, i2) => {
        if (i2 > 0) {
          name = firstClass + "--" + part;
          if (currentMedia !== "")
            name = name + currentMedia;
          classesArray.push(name);
        }
      });
    }
  });
  return classesArray.join(" ");
}
function expandPleasantCssClassnamesLive() {
  querySelectorLive('[class*=":"],[class*="@"]', ($elm) => {
    const classesStr = $elm.getAttribute("class");
    const newClassesStr = expandPleasantCssClassname(classesStr);
    $elm.setAttribute("class", newClassesStr);
  }, {
    once: false
  });
}
if (!window.env)
  window.env = {SUGAR: {}};
window.env.SUGAR = JSON.parse('{"ENVIRONMENT":"development"}');
expandPleasantCssClassnamesLive();

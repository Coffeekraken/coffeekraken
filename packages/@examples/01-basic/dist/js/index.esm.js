const PartytownSnippet = `/* Partytown 0.7.6 - MIT builder.io */
!function(t,e,n,i,r,o,a,d,s,c,p,l){function u(){l||(l=1,"/"==(a=(o.lib||"/~partytown/")+(o.debug?"debug/":""))[0]&&(s=e.querySelectorAll('script[type="text/partytown"]'),i!=t?i.dispatchEvent(new CustomEvent("pt1",{detail:t})):(d=setTimeout(f,1e4),e.addEventListener("pt0",w),r?h(1):n.serviceWorker?n.serviceWorker.register(a+(o.swPath||"partytown-sw.js"),{scope:a}).then((function(t){t.active?h():t.installing&&t.installing.addEventListener("statechange",(function(t){"activated"==t.target.state&&h()}))}),console.error):f())))}function h(t){c=e.createElement(t?"script":"iframe"),t||(c.setAttribute("style","display:block;width:0;height:0;border:0;visibility:hidden"),c.setAttribute("aria-hidden",!0)),c.src=a+"partytown-"+(t?"atomics.js?v=0.7.6":"sandbox-sw.html?"+Date.now()),e.body.appendChild(c)}function f(n,r){for(w(),i==t&&(o.forward||[]).map((function(e){delete t[e.split(".")[0]]})),n=0;n<s.length;n++)(r=e.createElement("script")).innerHTML=s[n].innerHTML,e.head.appendChild(r);c&&c.parentNode.removeChild(c)}function w(){clearTimeout(d)}o=t.partytown||{},i==t&&(o.forward||[]).map((function(e){p=t,e.split(".").map((function(e,n,i){p=p[i[n]]=n+1<i.length?"push"==i[n+1]?[]:p[i[n]]||{}:function(){(t._ptf=t._ptf||[]).push(i,arguments)}}))})),"complete"==e.readyState?u():(t.addEventListener("DOMContentLoaded",u),t.addEventListener("load",u))}(window,document,navigator,top,window.crossOriginIsolated);`;
const createSnippet = (config2, snippetCode) => {
  const { forward = [], ...filteredConfig } = config2 || {};
  const configStr = JSON.stringify(filteredConfig, (k, v) => {
    if (typeof v === "function") {
      v = String(v);
      if (v.startsWith(k + "(")) {
        v = "function " + v;
      }
    }
    return v;
  });
  return [
    `!(function(w,p,f,c){`,
    Object.keys(filteredConfig).length > 0 ? `c=w[p]=Object.assign(w[p]||{},${configStr});` : `c=w[p]=w[p]||{};`,
    `c[f]=(c[f]||[])`,
    forward.length > 0 ? `.concat(${JSON.stringify(forward)})` : ``,
    `})(window,'partytown','forward');`,
    snippetCode
  ].join("");
};
const partytownSnippet = (config2) => createSnippet(config2, PartytownSnippet);
class SClass {
  static extends(Cls) {
    class SClass2 extends Cls {
      constructor(settings, ...args) {
        super(...args);
        this.settings = {};
        setSettings(this, settings);
        this.metas = getMetas(this);
        Object.defineProperty(this, "metas", {
          enumerable: true,
          value: getMetas(this)
        });
      }
      expose(instance, settings) {
        return expose(this, instance, settings);
      }
      toPlainObject() {
        return toPlainObject(this);
      }
    }
    return SClass2;
  }
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(settings = {}) {
    this.settings = {};
    setSettings(this, settings);
    this.metas = getMetas(this);
    Object.defineProperty(this, "metas", {
      enumerable: true,
      value: getMetas(this)
    });
  }
  expose(instance, settings) {
    return expose(this, instance, settings);
  }
  toPlainObject() {
    return toPlainObject(this);
  }
}
function getMetas(ctx) {
  var _a2, _b2, _c2, _d2, _e2, _f, _g, _h;
  let name2 = `<yellow>${((_a2 = ctx.settings.metas) === null || _a2 === void 0 ? void 0 : _a2.name) || ""}</yellow>`;
  if ((_b2 = ctx.settings.metas) === null || _b2 === void 0 ? void 0 : _b2.id) {
    name2 += ` <cyan>${ctx.settings.metas.id}</cyan>`;
  }
  const metasObj = {
    id: (_d2 = (_c2 = ctx.settings.metas) === null || _c2 === void 0 ? void 0 : _c2.id) !== null && _d2 !== void 0 ? _d2 : ctx.constructor.name,
    name: (_f = (_e2 = ctx.settings.metas) === null || _e2 === void 0 ? void 0 : _e2.name) !== null && _f !== void 0 ? _f : ctx.constructor.name,
    formattedName: name2,
    color: (_h = (_g = ctx.settings.metas) === null || _g === void 0 ? void 0 : _g.color) !== null && _h !== void 0 ? _h : "yellow"
  };
  return metasObj;
}
function expose(ctx, instance, settings) {
  var _a2;
  settings = Object.assign({ as: void 0, props: [] }, settings !== null && settings !== void 0 ? settings : {});
  if (settings.as && typeof settings.as === "string") {
    ctx[settings.as] = instance;
  }
  (_a2 = settings === null || settings === void 0 ? void 0 : settings.props) === null || _a2 === void 0 ? void 0 : _a2.forEach((prop) => {
    if (instance[prop].bind && typeof instance[prop].bind === "function") {
      ctx[prop] = instance[prop].bind(instance);
    } else {
      ctx[prop] = instance[prop];
    }
  });
}
function toPlainObject(ctx) {
  return JSON.parse(JSON.stringify(ctx));
}
function setSettings(ctx, settings = {}) {
  var _a2;
  ctx.settings = settings;
  if (!ctx.settings.metas)
    ctx.settings.metas = {};
  if (!((_a2 = ctx.settings.metas) === null || _a2 === void 0 ? void 0 : _a2.id))
    ctx.settings.metas.id = ctx.constructor.name;
  ctx.settings.metas.color = "yellow";
}
function __isPlainObject(object) {
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
function __camelize(text) {
  if (!text)
    text = "";
  let res = "";
  const reg = /(?:^|[_-\s])(\w)/g;
  res = text.replace(reg, function(_, c) {
    return c ? c.toUpperCase() : "";
  });
  res = res.substr(0, 1).toLowerCase() + res.slice(1);
  return res.trim();
}
function __camelCase(text) {
  return __camelize(text);
}
function __camelCaseProps(object, settings) {
  const finalSettings = Object.assign({ deep: true }, settings !== null && settings !== void 0 ? settings : {});
  for (let [key, value] of Object.entries(object)) {
    const newKey = __camelCase(key);
    if (__isPlainObject(value) && finalSettings.deep) {
      object[newKey] = __camelCaseProps(object[key], finalSettings);
    } else {
      object[newKey] = value;
    }
    if (newKey !== key) {
      delete object[key];
    }
  }
  return object;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        var args = [null];
        args.push.apply(args, arguments);
        var Ctor = Function.bind.apply(f, args);
        return new Ctor();
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d2 = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d2.get ? d2 : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var lodash_clone = { exports: {} };
lodash_clone.exports;
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
  function addMapEntry(map2, pair) {
    map2.set(pair[0], pair[1]);
    return map2;
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
    var index = -1, length = values.length, offset2 = array.length;
    while (++index < length) {
      array[offset2 + index] = values[index];
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
    var index = -1, result2 = Array(n);
    while (++index < n) {
      result2[index] = iteratee(index);
    }
    return result2;
  }
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function isHostObject(value) {
    var result2 = false;
    if (value != null && typeof value.toString != "function") {
      try {
        result2 = !!(value + "");
      } catch (e) {
      }
    }
    return result2;
  }
  function mapToArray(map2) {
    var index = -1, result2 = Array(map2.size);
    map2.forEach(function(value, key) {
      result2[++index] = [key, value];
    });
    return result2;
  }
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  function setToArray(set) {
    var index = -1, result2 = Array(set.size);
    set.forEach(function(value) {
      result2[++index] = value;
    });
    return result2;
  }
  var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
  var coreJsData = root["__core-js_shared__"];
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  var funcToString = funcProto.toString;
  var hasOwnProperty2 = objectProto.hasOwnProperty;
  var objectToString = objectProto.toString;
  var reIsNative = RegExp(
    "^" + funcToString.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  var Buffer = moduleExports ? root.Buffer : void 0, Symbol2 = root.Symbol, Uint8Array2 = root.Uint8Array, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice;
  var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0, nativeKeys = overArg(Object.keys, Object);
  var DataView2 = getNative(root, "DataView"), Map2 = getNative(root, "Map"), Promise2 = getNative(root, "Promise"), Set2 = getNative(root, "Set"), WeakMap2 = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
  var dataViewCtorString = toSource(DataView2), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
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
    var data2 = this.__data__;
    if (nativeCreate) {
      var result2 = data2[key];
      return result2 === HASH_UNDEFINED ? void 0 : result2;
    }
    return hasOwnProperty2.call(data2, key) ? data2[key] : void 0;
  }
  function hashHas(key) {
    var data2 = this.__data__;
    return nativeCreate ? data2[key] !== void 0 : hasOwnProperty2.call(data2, key);
  }
  function hashSet(key, value) {
    var data2 = this.__data__;
    data2[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
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
    var data2 = this.__data__, index = assocIndexOf(data2, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data2.length - 1;
    if (index == lastIndex) {
      data2.pop();
    } else {
      splice.call(data2, index, 1);
    }
    return true;
  }
  function listCacheGet(key) {
    var data2 = this.__data__, index = assocIndexOf(data2, key);
    return index < 0 ? void 0 : data2[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data2 = this.__data__, index = assocIndexOf(data2, key);
    if (index < 0) {
      data2.push([key, value]);
    } else {
      data2[index][1] = value;
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
    var cache2 = this.__data__;
    if (cache2 instanceof ListCache) {
      var pairs = cache2.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        return this;
      }
      cache2 = this.__data__ = new MapCache(pairs);
    }
    cache2.set(key, value);
    return this;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  function arrayLikeKeys(value, inherited) {
    var result2 = isArray2(value) || isArguments5(value) ? baseTimes(value.length, String) : [];
    var length = result2.length, skipIndexes = !!length;
    for (var key in value) {
      if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
        result2.push(key);
      }
    }
    return result2;
  }
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty2.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
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
    return object && copyObject(source2, keys3(source2), object);
  }
  function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
    var result2;
    if (customizer) {
      result2 = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result2 !== void 0) {
      return result2;
    }
    if (!isObject3(value)) {
      return value;
    }
    var isArr = isArray2(value);
    if (isArr) {
      result2 = initCloneArray(value);
      if (!isDeep) {
        return copyArray(value, result2);
      }
    } else {
      var tag2 = getTag(value), isFunc = tag2 == funcTag || tag2 == genTag;
      if (isBuffer2(value)) {
        return cloneBuffer(value, isDeep);
      }
      if (tag2 == objectTag || tag2 == argsTag || isFunc && !object) {
        if (isHostObject(value)) {
          return object ? value : {};
        }
        result2 = initCloneObject(isFunc ? {} : value);
        if (!isDeep) {
          return copySymbols(value, baseAssign(result2, value));
        }
      } else {
        if (!cloneableTags[tag2]) {
          return object ? value : {};
        }
        result2 = initCloneByTag(value, tag2, baseClone, isDeep);
      }
    }
    stack || (stack = new Stack());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result2);
    if (!isArr) {
      var props = isFull ? getAllKeys(value) : keys3(value);
    }
    arrayEach(props || value, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value[key2];
      }
      assignValue(result2, key2, baseClone(subValue, isDeep, isFull, customizer, key2, value, stack));
    });
    return result2;
  }
  function baseCreate(proto2) {
    return isObject3(proto2) ? objectCreate(proto2) : {};
  }
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result2 = keysFunc(object);
    return isArray2(object) ? result2 : arrayPush(result2, symbolsFunc(object));
  }
  function baseGetTag(value) {
    return objectToString.call(value);
  }
  function baseIsNative(value) {
    if (!isObject3(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction2(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function baseKeys(object) {
    if (!isPrototype2(object)) {
      return nativeKeys(object);
    }
    var result2 = [];
    for (var key in Object(object)) {
      if (hasOwnProperty2.call(object, key) && key != "constructor") {
        result2.push(key);
      }
    }
    return result2;
  }
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var result2 = new buffer.constructor(buffer.length);
    buffer.copy(result2);
    return result2;
  }
  function cloneArrayBuffer(arrayBuffer) {
    var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
    return result2;
  }
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  function cloneMap(map2, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(mapToArray(map2), true) : mapToArray(map2);
    return arrayReduce(array, addMapEntry, new map2.constructor());
  }
  function cloneRegExp(regexp) {
    var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result2.lastIndex = regexp.lastIndex;
    return result2;
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
    return baseGetAllKeys(object, keys3, getSymbols);
  }
  function getMapData(map2, key) {
    var data2 = map2.__data__;
    return isKeyable(key) ? data2[typeof key == "string" ? "string" : "hash"] : data2.map;
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
  var getTag = baseGetTag;
  if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
    getTag = function(value) {
      var result2 = objectToString.call(value), Ctor = result2 == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
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
      return result2;
    };
  }
  function initCloneArray(array) {
    var length = array.length, result2 = array.constructor(length);
    if (length && typeof array[0] == "string" && hasOwnProperty2.call(array, "index")) {
      result2.index = array.index;
      result2.input = array.input;
    }
    return result2;
  }
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype2(object) ? baseCreate(getPrototype(object)) : {};
  }
  function initCloneByTag(object, tag2, cloneFunc, isDeep) {
    var Ctor = object.constructor;
    switch (tag2) {
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
  function isPrototype2(value) {
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
  function isArguments5(value) {
    return isArrayLikeObject(value) && hasOwnProperty2.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
  }
  var isArray2 = Array.isArray;
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction2(value);
  }
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }
  var isBuffer2 = nativeIsBuffer || stubFalse;
  function isFunction2(value) {
    var tag2 = isObject3(value) ? objectToString.call(value) : "";
    return tag2 == funcTag || tag2 == genTag;
  }
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  function isObject3(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }
  function isObjectLike(value) {
    return !!value && typeof value == "object";
  }
  function keys3(object) {
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
var lodash_cloneExports = lodash_clone.exports;
const __clone = /* @__PURE__ */ getDefaultExportFromCjs(lodash_cloneExports);
var lodash_clonedeep = { exports: {} };
lodash_clonedeep.exports;
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
  function addMapEntry(map2, pair) {
    map2.set(pair[0], pair[1]);
    return map2;
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
    var index = -1, length = values.length, offset2 = array.length;
    while (++index < length) {
      array[offset2 + index] = values[index];
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
    var index = -1, result2 = Array(n);
    while (++index < n) {
      result2[index] = iteratee(index);
    }
    return result2;
  }
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function isHostObject(value) {
    var result2 = false;
    if (value != null && typeof value.toString != "function") {
      try {
        result2 = !!(value + "");
      } catch (e) {
      }
    }
    return result2;
  }
  function mapToArray(map2) {
    var index = -1, result2 = Array(map2.size);
    map2.forEach(function(value, key) {
      result2[++index] = [key, value];
    });
    return result2;
  }
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  function setToArray(set) {
    var index = -1, result2 = Array(set.size);
    set.forEach(function(value) {
      result2[++index] = value;
    });
    return result2;
  }
  var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
  var coreJsData = root["__core-js_shared__"];
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  var funcToString = funcProto.toString;
  var hasOwnProperty2 = objectProto.hasOwnProperty;
  var objectToString = objectProto.toString;
  var reIsNative = RegExp(
    "^" + funcToString.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  var Buffer = moduleExports ? root.Buffer : void 0, Symbol2 = root.Symbol, Uint8Array2 = root.Uint8Array, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice;
  var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0, nativeKeys = overArg(Object.keys, Object);
  var DataView2 = getNative(root, "DataView"), Map2 = getNative(root, "Map"), Promise2 = getNative(root, "Promise"), Set2 = getNative(root, "Set"), WeakMap2 = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
  var dataViewCtorString = toSource(DataView2), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
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
    var data2 = this.__data__;
    if (nativeCreate) {
      var result2 = data2[key];
      return result2 === HASH_UNDEFINED ? void 0 : result2;
    }
    return hasOwnProperty2.call(data2, key) ? data2[key] : void 0;
  }
  function hashHas(key) {
    var data2 = this.__data__;
    return nativeCreate ? data2[key] !== void 0 : hasOwnProperty2.call(data2, key);
  }
  function hashSet(key, value) {
    var data2 = this.__data__;
    data2[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
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
    var data2 = this.__data__, index = assocIndexOf(data2, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data2.length - 1;
    if (index == lastIndex) {
      data2.pop();
    } else {
      splice.call(data2, index, 1);
    }
    return true;
  }
  function listCacheGet(key) {
    var data2 = this.__data__, index = assocIndexOf(data2, key);
    return index < 0 ? void 0 : data2[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data2 = this.__data__, index = assocIndexOf(data2, key);
    if (index < 0) {
      data2.push([key, value]);
    } else {
      data2[index][1] = value;
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
    var cache2 = this.__data__;
    if (cache2 instanceof ListCache) {
      var pairs = cache2.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        return this;
      }
      cache2 = this.__data__ = new MapCache(pairs);
    }
    cache2.set(key, value);
    return this;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  function arrayLikeKeys(value, inherited) {
    var result2 = isArray2(value) || isArguments5(value) ? baseTimes(value.length, String) : [];
    var length = result2.length, skipIndexes = !!length;
    for (var key in value) {
      if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
        result2.push(key);
      }
    }
    return result2;
  }
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty2.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
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
    return object && copyObject(source2, keys3(source2), object);
  }
  function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
    var result2;
    if (customizer) {
      result2 = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result2 !== void 0) {
      return result2;
    }
    if (!isObject3(value)) {
      return value;
    }
    var isArr = isArray2(value);
    if (isArr) {
      result2 = initCloneArray(value);
      if (!isDeep) {
        return copyArray(value, result2);
      }
    } else {
      var tag2 = getTag(value), isFunc = tag2 == funcTag || tag2 == genTag;
      if (isBuffer2(value)) {
        return cloneBuffer(value, isDeep);
      }
      if (tag2 == objectTag || tag2 == argsTag || isFunc && !object) {
        if (isHostObject(value)) {
          return object ? value : {};
        }
        result2 = initCloneObject(isFunc ? {} : value);
        if (!isDeep) {
          return copySymbols(value, baseAssign(result2, value));
        }
      } else {
        if (!cloneableTags[tag2]) {
          return object ? value : {};
        }
        result2 = initCloneByTag(value, tag2, baseClone, isDeep);
      }
    }
    stack || (stack = new Stack());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result2);
    if (!isArr) {
      var props = isFull ? getAllKeys(value) : keys3(value);
    }
    arrayEach(props || value, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value[key2];
      }
      assignValue(result2, key2, baseClone(subValue, isDeep, isFull, customizer, key2, value, stack));
    });
    return result2;
  }
  function baseCreate(proto2) {
    return isObject3(proto2) ? objectCreate(proto2) : {};
  }
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result2 = keysFunc(object);
    return isArray2(object) ? result2 : arrayPush(result2, symbolsFunc(object));
  }
  function baseGetTag(value) {
    return objectToString.call(value);
  }
  function baseIsNative(value) {
    if (!isObject3(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction2(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function baseKeys(object) {
    if (!isPrototype2(object)) {
      return nativeKeys(object);
    }
    var result2 = [];
    for (var key in Object(object)) {
      if (hasOwnProperty2.call(object, key) && key != "constructor") {
        result2.push(key);
      }
    }
    return result2;
  }
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var result2 = new buffer.constructor(buffer.length);
    buffer.copy(result2);
    return result2;
  }
  function cloneArrayBuffer(arrayBuffer) {
    var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
    return result2;
  }
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  function cloneMap(map2, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(mapToArray(map2), true) : mapToArray(map2);
    return arrayReduce(array, addMapEntry, new map2.constructor());
  }
  function cloneRegExp(regexp) {
    var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result2.lastIndex = regexp.lastIndex;
    return result2;
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
    return baseGetAllKeys(object, keys3, getSymbols);
  }
  function getMapData(map2, key) {
    var data2 = map2.__data__;
    return isKeyable(key) ? data2[typeof key == "string" ? "string" : "hash"] : data2.map;
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
  var getTag = baseGetTag;
  if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
    getTag = function(value) {
      var result2 = objectToString.call(value), Ctor = result2 == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
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
      return result2;
    };
  }
  function initCloneArray(array) {
    var length = array.length, result2 = array.constructor(length);
    if (length && typeof array[0] == "string" && hasOwnProperty2.call(array, "index")) {
      result2.index = array.index;
      result2.input = array.input;
    }
    return result2;
  }
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype2(object) ? baseCreate(getPrototype(object)) : {};
  }
  function initCloneByTag(object, tag2, cloneFunc, isDeep) {
    var Ctor = object.constructor;
    switch (tag2) {
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
  function isPrototype2(value) {
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
  function isArguments5(value) {
    return isArrayLikeObject(value) && hasOwnProperty2.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
  }
  var isArray2 = Array.isArray;
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction2(value);
  }
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }
  var isBuffer2 = nativeIsBuffer || stubFalse;
  function isFunction2(value) {
    var tag2 = isObject3(value) ? objectToString.call(value) : "";
    return tag2 == funcTag || tag2 == genTag;
  }
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  function isObject3(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }
  function isObjectLike(value) {
    return !!value && typeof value == "object";
  }
  function keys3(object) {
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
var lodash_clonedeepExports = lodash_clonedeep.exports;
const __deepClone = /* @__PURE__ */ getDefaultExportFromCjs(lodash_clonedeepExports);
function clone(object, settings = {}) {
  settings = Object.assign({ deep: false }, settings);
  if (settings.deep) {
    return __deepClone(object);
  }
  return __clone(object);
}
var decycle_1;
const isArray$5 = (e) => Array.isArray(e), isObject$4 = (e) => "Object" === Object.prototype.toString.call(e).slice(8, -1), validate = (e) => {
  if (void 0 === e)
    throw new Error("This method requires one parameter");
  if (!isArray$5(e) && !isObject$4(e))
    throw new TypeError("This method only accepts arrays and objects");
}, findRef = (e, r) => Object.keys(r).find((a) => r[a] === e), decycle = (e) => {
  validate(e);
  let r = {};
  const a = (e2, c = "$") => {
    const s = findRef(e2, r);
    return s ? { $ref: s } : isArray$5(e2) || isObject$4(e2) ? (r[c] = e2, isArray$5(e2) ? e2.map((e3, r2) => a(e3, `${c}[${r2}]`)) : Object.keys(e2).reduce((r2, s2) => (r2[s2] = a(e2[s2], `${c}.${s2}`), r2), {})) : e2;
  };
  return a(e);
};
decycle_1 = decycle;
function __unique(array) {
  const a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }
  return a;
}
function __deepAssign(referenceObj, ...objects) {
  const settings = {
    array: true,
    object: true,
    cloneChilds: true
  };
  function merge(refObj, mixWithObj) {
    for (const key of Object.keys(mixWithObj)) {
      if (settings.array === true && Array.isArray(refObj[key]) && Array.isArray(mixWithObj[key])) {
        const newArray = __unique([...refObj[key], ...mixWithObj[key]]);
        refObj[key] = newArray;
        continue;
      }
      if (settings.object === true && __isPlainObject(refObj[key]) && __isPlainObject(mixWithObj[key])) {
        refObj[key] = merge(refObj[key], mixWithObj[key]);
        continue;
      }
      if (__isPlainObject(mixWithObj[key]) && settings.cloneChilds) {
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
  for (let i = 0; i < objects.length; i++) {
    const toMergeObj = objects[i] || {};
    merge(referenceObj, toMergeObj);
  }
  return referenceObj;
}
function __isClassInstance(object) {
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
function __deepMerge(...args) {
  var _a2;
  let settings = {}, hasSettings = false;
  const potentialSettings = (_a2 = args[args.length - 1]) !== null && _a2 !== void 0 ? _a2 : {};
  if (potentialSettings && Object.keys(potentialSettings).length <= 2 && (potentialSettings.array !== void 0 || potentialSettings.clone !== void 0)) {
    hasSettings = true;
    settings = potentialSettings;
  }
  let finalSettings = Object.assign({ array: false, clone: true }, settings);
  function merge(firstObj, secondObj) {
    const newObj = finalSettings.clone ? {} : firstObj;
    if (!secondObj)
      return firstObj;
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
      const secondObjDesc = Object.getOwnPropertyDescriptor(secondObj, key);
      if (secondObjDesc.set || secondObjDesc.get) {
        Object.defineProperty(newObj, key, secondObjDesc);
      } else if (finalSettings.array && Array.isArray(firstObj[key]) && Array.isArray(secondObj[key])) {
        newObj[key] = [...firstObj[key], ...secondObj[key]];
      } else if (__isPlainObject(newObj[key]) && __isPlainObject(secondObj[key])) {
        newObj[key] = merge(newObj[key], secondObj[key]);
      } else {
        newObj[key] = secondObj[key];
      }
    });
    return newObj;
  }
  if (hasSettings) {
    args.pop();
  }
  let currentObj = finalSettings.clone ? {} : args[0];
  for (let i = 0; i < args.length; i++) {
    const toMergeObj = args[i];
    currentObj = merge(currentObj, toMergeObj);
  }
  return currentObj;
}
function __deepMap(objectOrArray, processor, settings, _path = []) {
  settings = __deepMerge({
    classInstances: false,
    array: true,
    clone: false,
    privateProps: true
  }, settings);
  const isArray2 = Array.isArray(objectOrArray);
  let newObject = isArray2 ? [] : settings.clone ? clone(objectOrArray, { deep: true }) : objectOrArray;
  Object.keys(objectOrArray).forEach((prop) => {
    if (!settings.privateProps && prop.match(/^_/))
      return;
    if (__isPlainObject(objectOrArray[prop]) || __isClassInstance(objectOrArray[prop]) && settings.classInstances || Array.isArray(objectOrArray[prop]) && settings.array) {
      const res2 = __deepMap(objectOrArray[prop], processor, Object.assign(Object.assign({}, settings), { clone: false }), [..._path, prop]);
      if (isArray2) {
        newObject.push(res2);
      } else {
        if (prop === "..." && __isPlainObject(res2)) {
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
      delete newObject[prop];
      return;
    }
    if (isArray2) {
      newObject.push(res);
    } else {
      if (prop === "..." && __isPlainObject(res)) {
        newObject = Object.assign(Object.assign({}, newObject), res);
      } else {
        newObject[prop] = res;
      }
    }
  });
  return newObject;
}
function __proxyArray(array) {
  if (array.__$proxied)
    return array;
  const watchStack = {};
  Object.defineProperty(array, "__$proxied", {
    value: true,
    enumerable: false,
    writable: false
  });
  function _proxyMethod(name2, ...args) {
    const handlersStack = [];
    Object.keys(watchStack).forEach((watchId) => {
      const watch = watchStack[watchId];
      if (watch.methods.indexOf(name2) === -1)
        return;
      handlersStack.push({
        handlerFn: watch.handlerFn,
        watchObj: {
          oldValue: [...array],
          action: `${name2}`,
          fullAction: `Array.${name2}`,
          args
        }
      });
    });
    const returnValue = Array.prototype[name2].call(array, ...args);
    handlersStack.forEach((handlerObj) => {
      handlerObj.watchObj = Object.assign(Object.assign({}, handlerObj.watchObj), { value: array, returnedValue: returnValue });
      handlerObj.handlerFn(handlerObj.watchObj);
    });
    return returnValue;
  }
  Object.getOwnPropertyNames(Array.prototype).forEach((methodName) => {
    const unProxyMethods = ["length", "constructor"];
    if (unProxyMethods.indexOf(methodName) !== -1)
      return;
    Object.defineProperty(array, methodName, {
      writable: false,
      configurable: false,
      enumerable: false,
      value: (...args) => {
        return _proxyMethod(methodName, ...args);
      }
    });
  });
  Object.defineProperty(array, "watch", {
    writable: false,
    configurable: false,
    enumerable: false,
    value: (methods, handlerFn) => {
      const watchId = `s-${Date.now()}-${Math.round(Math.random() * 9999999999999)}`;
      watchStack[watchId] = {
        methods,
        handlerFn
      };
      return watchId;
    }
  });
  Object.defineProperty(array, "unwatch", {
    writable: false,
    configurable: false,
    enumerable: false,
    value: (watchId) => {
      delete watchStack[watchId];
    }
  });
  return array;
}
function __isDomElement(element) {
  return typeof HTMLElement === "object" ? element instanceof HTMLElement : element && typeof element === "object" && element !== null && element.nodeType === 1 && typeof element.nodeName === "string";
}
function __deepProxy(object, handlerFn, settings = {}) {
  let isRevoked = false;
  settings = __deepMerge({
    deep: true,
    handleSet: true,
    handleGet: false,
    handleDelete: true,
    domElements: false
  }, settings);
  function makeHandler(path2) {
    return {
      set(target, key, value) {
        if (isRevoked || !settings.handleSet)
          return true;
        if (value === target[key])
          return true;
        if (settings.deep && typeof value === "object" && __isPlainObject(value)) {
          value = proxify(value, [...path2, key]);
        }
        const oldValue = target[key];
        target[key] = value;
        handlerFn({
          object,
          target,
          key,
          path: [...path2, key].join("."),
          action: "set",
          fullAction: `Object.set`,
          oldValue,
          value
        });
        return true;
      },
      get(target, key, receiver) {
        if (Reflect.has(target, key)) {
          if (!settings.handleGet)
            return target[key];
          const value = handlerFn({
            object,
            target,
            key,
            path: [...path2, key].join("."),
            action: "get",
            fullAction: "Object.get"
          });
          if (key === "revoke")
            return receiver.revoke;
          if (value === void 0)
            return target[key];
          return value;
        }
        return void 0;
      },
      deleteProperty(target, key) {
        if (isRevoked || !settings.handleDelete)
          return true;
        if (Reflect.has(target, key)) {
          const oldValue = target[key];
          const deleted = Reflect.deleteProperty(target, key);
          if (deleted) {
            handlerFn({
              object,
              target,
              key,
              path: [...path2, key].join("."),
              action: "delete",
              fullAction: "Object.delete",
              oldValue
            });
          }
          return deleted;
        }
        return false;
      }
    };
  }
  function proxify(obj, path2) {
    if (obj === null)
      return obj;
    if (!settings.domElements && __isDomElement(obj)) {
      return obj;
    }
    if (settings.deep) {
      for (const key of Object.keys(obj)) {
        if (Array.isArray(obj[key])) {
          obj[key] = __proxyArray(obj[key]);
          obj[key].watch(Object.getOwnPropertyNames(Array.prototype), (watchObj) => {
            handlerFn(Object.assign({ path: [...path2, key].join(".") }, watchObj));
          });
        } else if (typeof obj[key] === "object" && __isPlainObject(obj[key])) {
          obj[key] = proxify(obj[key], [...path2, key]);
        }
      }
    }
    const p = Proxy.revocable(obj, makeHandler(path2));
    const revokePropertyObj = {
      writable: true,
      configurable: false,
      enumerable: false,
      value: () => {
        let __copy = clone(p.proxy, { deep: true });
        isRevoked = true;
        __copy = __deepMap(__copy, ({ value, prop }) => {
          if (prop === "revoke" && typeof value === "function") {
            return -1;
          }
          return value;
        });
        setTimeout(() => {
          __deepMap(p.proxy, ({ value, prop }) => {
            if (prop === "revoke" && typeof value === "function") {
              value();
            }
          }, {});
          p.revoke();
        });
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
function __unquote(string, quotesToRemove = ['"', "'", "”", "`"]) {
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
  if (Array.isArray(path2)) {
    return __get(obj, path2, settings);
  }
  if (obj[path2] !== void 0)
    return obj[path2];
  if (!path2 || path2 === "" || path2 === ".")
    return obj;
  path2 = path2.replace(/\[(\w+)\]/g, ".$1");
  path2 = path2.replace(/\\\./g, "_dot_");
  path2 = path2.replace(/^\./, "");
  let potentialPaths = [path2.replace(/\?/gm, "")];
  const parts = path2.split(".");
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    if (part.match(/\?$/)) {
      const before = parts.slice(0, i);
      const after = parts.slice(i + 1);
      potentialPaths.push([...before, ...after].join("."));
      potentialPaths.push([...before, ...after.filter((a) => !a.match(/\?$/))].join("."));
    }
  }
  potentialPaths = __unique(potentialPaths.map((s) => s.replace(/\?/gm, "")));
  for (let i = 0; i < potentialPaths.length; i++) {
    const path3 = potentialPaths[i];
    const result2 = __get(obj, path3, settings);
    if (result2 !== void 0)
      return result2;
  }
}
function __get(obj, path2, settings = {}) {
  settings = Object.assign({}, settings);
  let o = obj, a;
  if (typeof path2 === "string") {
    if (obj[path2] !== void 0)
      return obj[path2];
    if (!path2 || path2 === "" || path2 === ".")
      return obj;
    path2 = path2.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm);
  }
  a = [...path2].map((p) => {
    if (typeof p === "string")
      return __unquote(p);
    return p;
  });
  while (a.length) {
    let n = a.shift();
    if (typeof n === "string") {
      n = n.replace(/\?$/, "");
    }
    if (typeof o !== "object" || !(o && n in o)) {
      return;
    }
    o = o[n];
  }
  return o;
}
function __set(obj, path2, value, settings) {
  const finalSettings = Object.assign({ preferAssign: false }, settings !== null && settings !== void 0 ? settings : {});
  let o = obj, a;
  if (Array.isArray(path2) && path2.length === 1) {
    path2 = path2[0];
  }
  if (typeof path2 === "string") {
    if (!path2 || path2 === "" || path2 === ".") {
      Object.assign(obj, value);
      return;
    }
    path2 = path2.replace(/\[(\w+)\]/g, ".[$1]");
    a = __unquote(path2).split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((p) => __unquote(p));
  } else if (Array.isArray(path2)) {
    a = [...path2];
  }
  while (a.length - 1) {
    const n = a.shift();
    if (!(n in o)) {
      if (typeof a[0] === "string") {
        if (a[0].match(/^\[[0-9]+\]$/))
          o[n] = [];
        else
          o[n] = {};
      } else {
        o[n] = {};
      }
    }
    if (!o[n]) {
      o[n] = {};
    }
    o = o[n];
  }
  if (typeof a[0] === "string" && a[0].match(/^\[[0-9]+\]$/)) {
    if (!Array.isArray(o)) {
      o = [];
    }
    o.push(value);
  } else {
    if (__isPlainObject(o[a[0]]) && __isPlainObject(value) && finalSettings.preferAssign) {
      for (const key in o[a[0]]) {
        delete o[a[0]][key];
      }
      Object.assign(o[a[0]], value);
    } else {
      o[a[0]] = value;
    }
  }
  return get(obj, path2);
}
var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
var slice$1 = Array.prototype.slice;
var toStr$a = Object.prototype.toString;
var funcType = "[object Function]";
var implementation$b = function bind(that) {
  var target = this;
  if (typeof target !== "function" || toStr$a.call(target) !== funcType) {
    throw new TypeError(ERROR_MESSAGE + target);
  }
  var args = slice$1.call(arguments, 1);
  var bound2;
  var binder = function() {
    if (this instanceof bound2) {
      var result2 = target.apply(
        this,
        args.concat(slice$1.call(arguments))
      );
      if (Object(result2) === result2) {
        return result2;
      }
      return this;
    } else {
      return target.apply(
        that,
        args.concat(slice$1.call(arguments))
      );
    }
  };
  var boundLength = Math.max(0, target.length - args.length);
  var boundArgs = [];
  for (var i = 0; i < boundLength; i++) {
    boundArgs.push("$" + i);
  }
  bound2 = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
  if (target.prototype) {
    var Empty = function Empty2() {
    };
    Empty.prototype = target.prototype;
    bound2.prototype = new Empty();
    Empty.prototype = null;
  }
  return bound2;
};
var implementation$a = implementation$b;
var functionBind = Function.prototype.bind || implementation$a;
var bind$1 = functionBind;
var src$1 = bind$1.call(Function.call, Object.prototype.hasOwnProperty);
var toString$2 = {}.toString;
var isarray = Array.isArray || function(arr) {
  return toString$2.call(arr) == "[object Array]";
};
var fnToStr$2 = Function.prototype.toString;
var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") {
  try {
    badArrayLike = Object.defineProperty({}, "length", {
      get: function() {
        throw isCallableMarker;
      }
    });
    isCallableMarker = {};
    reflectApply(function() {
      throw 42;
    }, null, badArrayLike);
  } catch (_) {
    if (_ !== isCallableMarker) {
      reflectApply = null;
    }
  }
} else {
  reflectApply = null;
}
var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
  try {
    var fnStr = fnToStr$2.call(value);
    return constructorRegex.test(fnStr);
  } catch (e) {
    return false;
  }
};
var tryFunctionObject = function tryFunctionToStr(value) {
  try {
    if (isES6ClassFn(value)) {
      return false;
    }
    fnToStr$2.call(value);
    return true;
  } catch (e) {
    return false;
  }
};
var toStr$9 = Object.prototype.toString;
var objectClass = "[object Object]";
var fnClass = "[object Function]";
var genClass = "[object GeneratorFunction]";
var ddaClass = "[object HTMLAllCollection]";
var ddaClass2 = "[object HTML document.all class]";
var ddaClass3 = "[object HTMLCollection]";
var hasToStringTag$a = typeof Symbol === "function" && !!Symbol.toStringTag;
var isIE68 = !(0 in [,]);
var isDDA = function isDocumentDotAll() {
  return false;
};
if (typeof document === "object") {
  var all = document.all;
  if (toStr$9.call(all) === toStr$9.call(document.all)) {
    isDDA = function isDocumentDotAll2(value) {
      if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) {
        try {
          var str2 = toStr$9.call(value);
          return (str2 === ddaClass || str2 === ddaClass2 || str2 === ddaClass3 || str2 === objectClass) && value("") == null;
        } catch (e) {
        }
      }
      return false;
    };
  }
}
var isCallable$1 = reflectApply ? function isCallable(value) {
  if (isDDA(value)) {
    return true;
  }
  if (!value) {
    return false;
  }
  if (typeof value !== "function" && typeof value !== "object") {
    return false;
  }
  try {
    reflectApply(value, null, badArrayLike);
  } catch (e) {
    if (e !== isCallableMarker) {
      return false;
    }
  }
  return !isES6ClassFn(value) && tryFunctionObject(value);
} : function isCallable2(value) {
  if (isDDA(value)) {
    return true;
  }
  if (!value) {
    return false;
  }
  if (typeof value !== "function" && typeof value !== "object") {
    return false;
  }
  if (hasToStringTag$a) {
    return tryFunctionObject(value);
  }
  if (isES6ClassFn(value)) {
    return false;
  }
  var strClass2 = toStr$9.call(value);
  if (strClass2 !== fnClass && strClass2 !== genClass && !/^\[object HTML/.test(strClass2)) {
    return false;
  }
  return tryFunctionObject(value);
};
var shams$1 = function hasSymbols() {
  if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
    return false;
  }
  if (typeof Symbol.iterator === "symbol") {
    return true;
  }
  var obj = {};
  var sym = Symbol("test");
  var symObj = Object(sym);
  if (typeof sym === "string") {
    return false;
  }
  if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
    return false;
  }
  if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
    return false;
  }
  var symVal = 42;
  obj[sym] = symVal;
  for (sym in obj) {
    return false;
  }
  if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
    return false;
  }
  if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }
  var syms = Object.getOwnPropertySymbols(obj);
  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }
  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }
  if (typeof Object.getOwnPropertyDescriptor === "function") {
    var descriptor2 = Object.getOwnPropertyDescriptor(obj, sym);
    if (descriptor2.value !== symVal || descriptor2.enumerable !== true) {
      return false;
    }
  }
  return true;
};
var origSymbol = typeof Symbol !== "undefined" && Symbol;
var hasSymbolSham = shams$1;
var hasSymbols$4 = function hasNativeSymbols() {
  if (typeof origSymbol !== "function") {
    return false;
  }
  if (typeof Symbol !== "function") {
    return false;
  }
  if (typeof origSymbol("foo") !== "symbol") {
    return false;
  }
  if (typeof Symbol("bar") !== "symbol") {
    return false;
  }
  return hasSymbolSham();
};
var test$1 = {
  foo: {}
};
var $Object$2 = Object;
var hasProto$4 = function hasProto() {
  return { __proto__: test$1 }.foo === test$1.foo && !({ __proto__: null } instanceof $Object$2);
};
var undefined$1;
var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError$3 = TypeError;
var getEvalledConstructor = function(expressionSyntax) {
  try {
    return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
  } catch (e) {
  }
};
var $gOPD$1 = Object.getOwnPropertyDescriptor;
if ($gOPD$1) {
  try {
    $gOPD$1({}, "");
  } catch (e) {
    $gOPD$1 = null;
  }
}
var throwTypeError = function() {
  throw new $TypeError$3();
};
var ThrowTypeError = $gOPD$1 ? function() {
  try {
    arguments.callee;
    return throwTypeError;
  } catch (calleeThrows) {
    try {
      return $gOPD$1(arguments, "callee").get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;
var hasSymbols$3 = hasSymbols$4();
var hasProto$3 = hasProto$4();
var getProto$4 = Object.getPrototypeOf || (hasProto$3 ? function(x) {
  return x.__proto__;
} : null);
var needsEval = {};
var TypedArray = typeof Uint8Array === "undefined" || !getProto$4 ? undefined$1 : getProto$4(Uint8Array);
var INTRINSICS = {
  "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
  "%ArrayIteratorPrototype%": hasSymbols$3 && getProto$4 ? getProto$4([][Symbol.iterator]()) : undefined$1,
  "%AsyncFromSyncIteratorPrototype%": undefined$1,
  "%AsyncFunction%": needsEval,
  "%AsyncGenerator%": needsEval,
  "%AsyncGeneratorFunction%": needsEval,
  "%AsyncIteratorPrototype%": needsEval,
  "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
  "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
  "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined$1 : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined$1 : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Error,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": EvalError,
  "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
  "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
  "%Function%": $Function,
  "%GeneratorFunction%": needsEval,
  "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
  "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
  "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": hasSymbols$3 && getProto$4 ? getProto$4(getProto$4([][Symbol.iterator]())) : undefined$1,
  "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
  "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
  "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols$3 || !getProto$4 ? undefined$1 : getProto$4((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
  "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
  "%RangeError%": RangeError,
  "%ReferenceError%": ReferenceError,
  "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
  "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols$3 || !getProto$4 ? undefined$1 : getProto$4((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": hasSymbols$3 && getProto$4 ? getProto$4(""[Symbol.iterator]()) : undefined$1,
  "%Symbol%": hasSymbols$3 ? Symbol : undefined$1,
  "%SyntaxError%": $SyntaxError,
  "%ThrowTypeError%": ThrowTypeError,
  "%TypedArray%": TypedArray,
  "%TypeError%": $TypeError$3,
  "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
  "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
  "%URIError%": URIError,
  "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
  "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
  "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet
};
if (getProto$4) {
  try {
    null.error;
  } catch (e) {
    var errorProto = getProto$4(getProto$4(e));
    INTRINSICS["%Error.prototype%"] = errorProto;
  }
}
var doEval = function doEval2(name2) {
  var value;
  if (name2 === "%AsyncFunction%") {
    value = getEvalledConstructor("async function () {}");
  } else if (name2 === "%GeneratorFunction%") {
    value = getEvalledConstructor("function* () {}");
  } else if (name2 === "%AsyncGeneratorFunction%") {
    value = getEvalledConstructor("async function* () {}");
  } else if (name2 === "%AsyncGenerator%") {
    var fn2 = doEval2("%AsyncGeneratorFunction%");
    if (fn2) {
      value = fn2.prototype;
    }
  } else if (name2 === "%AsyncIteratorPrototype%") {
    var gen = doEval2("%AsyncGenerator%");
    if (gen && getProto$4) {
      value = getProto$4(gen.prototype);
    }
  }
  INTRINSICS[name2] = value;
  return value;
};
var LEGACY_ALIASES = {
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
};
var bind2 = functionBind;
var hasOwn$1 = src$1;
var $concat = bind2.call(Function.call, Array.prototype.concat);
var $spliceApply = bind2.call(Function.apply, Array.prototype.splice);
var $replace = bind2.call(Function.call, String.prototype.replace);
var $strSlice = bind2.call(Function.call, String.prototype.slice);
var $exec$1 = bind2.call(Function.call, RegExp.prototype.exec);
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = function stringToPath2(string) {
  var first = $strSlice(string, 0, 1);
  var last = $strSlice(string, -1);
  if (first === "%" && last !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
  } else if (last === "%" && first !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
  }
  var result2 = [];
  $replace(string, rePropName, function(match2, number, quote, subString) {
    result2[result2.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match2;
  });
  return result2;
};
var getBaseIntrinsic = function getBaseIntrinsic2(name2, allowMissing) {
  var intrinsicName = name2;
  var alias;
  if (hasOwn$1(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = "%" + alias[0] + "%";
  }
  if (hasOwn$1(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName];
    if (value === needsEval) {
      value = doEval(intrinsicName);
    }
    if (typeof value === "undefined" && !allowMissing) {
      throw new $TypeError$3("intrinsic " + name2 + " exists, but is not available. Please file an issue!");
    }
    return {
      alias,
      name: intrinsicName,
      value
    };
  }
  throw new $SyntaxError("intrinsic " + name2 + " does not exist!");
};
var getIntrinsic = function GetIntrinsic(name2, allowMissing) {
  if (typeof name2 !== "string" || name2.length === 0) {
    throw new $TypeError$3("intrinsic name must be a non-empty string");
  }
  if (arguments.length > 1 && typeof allowMissing !== "boolean") {
    throw new $TypeError$3('"allowMissing" argument must be a boolean');
  }
  if ($exec$1(/^%?[^%]*%?$/, name2) === null) {
    throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  }
  var parts = stringToPath(name2);
  var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
  var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;
  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts, $concat([0, 1], alias));
  }
  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    var part = parts[i];
    var first = $strSlice(part, 0, 1);
    var last = $strSlice(part, -1);
    if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
      throw new $SyntaxError("property names with quotes must have matching quotes");
    }
    if (part === "constructor" || !isOwn) {
      skipFurtherCaching = true;
    }
    intrinsicBaseName += "." + part;
    intrinsicRealName = "%" + intrinsicBaseName + "%";
    if (hasOwn$1(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError$3("base intrinsic for " + name2 + " exists, but the property is not available.");
        }
        return void 0;
      }
      if ($gOPD$1 && i + 1 >= parts.length) {
        var desc = $gOPD$1(value, part);
        isOwn = !!desc;
        if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
          value = desc.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = hasOwn$1(value, part);
        value = value[part];
      }
      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }
  return value;
};
var callBind$4 = { exports: {} };
(function(module) {
  var bind3 = functionBind;
  var GetIntrinsic3 = getIntrinsic;
  var $apply = GetIntrinsic3("%Function.prototype.apply%");
  var $call = GetIntrinsic3("%Function.prototype.call%");
  var $reflectApply = GetIntrinsic3("%Reflect.apply%", true) || bind3.call($call, $apply);
  var $gOPD2 = GetIntrinsic3("%Object.getOwnPropertyDescriptor%", true);
  var $defineProperty2 = GetIntrinsic3("%Object.defineProperty%", true);
  var $max = GetIntrinsic3("%Math.max%");
  if ($defineProperty2) {
    try {
      $defineProperty2({}, "a", { value: 1 });
    } catch (e) {
      $defineProperty2 = null;
    }
  }
  module.exports = function callBind2(originalFunction) {
    var func = $reflectApply(bind3, $call, arguments);
    if ($gOPD2 && $defineProperty2) {
      var desc = $gOPD2(func, "length");
      if (desc.configurable) {
        $defineProperty2(
          func,
          "length",
          { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
        );
      }
    }
    return func;
  };
  var applyBind = function applyBind2() {
    return $reflectApply(bind3, $apply, arguments);
  };
  if ($defineProperty2) {
    $defineProperty2(module.exports, "apply", { value: applyBind });
  } else {
    module.exports.apply = applyBind;
  }
})(callBind$4);
var callBindExports = callBind$4.exports;
var GetIntrinsic$a = getIntrinsic;
var callBind$3 = callBindExports;
var $indexOf = callBind$3(GetIntrinsic$a("String.prototype.indexOf"));
var callBound$a = function callBoundIntrinsic(name2, allowMissing) {
  var intrinsic = GetIntrinsic$a(name2, !!allowMissing);
  if (typeof intrinsic === "function" && $indexOf(name2, ".prototype.") > -1) {
    return callBind$3(intrinsic);
  }
  return intrinsic;
};
var hasSymbols$2 = shams$1;
var shams = function hasToStringTagShams() {
  return hasSymbols$2() && !!Symbol.toStringTag;
};
var callBound$9 = callBound$a;
var $boolToStr = callBound$9("Boolean.prototype.toString");
var $toString$3 = callBound$9("Object.prototype.toString");
var tryBooleanObject = function booleanBrandCheck(value) {
  try {
    $boolToStr(value);
    return true;
  } catch (e) {
    return false;
  }
};
var boolClass = "[object Boolean]";
var hasToStringTag$9 = shams();
var isBooleanObject = function isBoolean(value) {
  if (typeof value === "boolean") {
    return true;
  }
  if (value === null || typeof value !== "object") {
    return false;
  }
  return hasToStringTag$9 && Symbol.toStringTag in value ? tryBooleanObject(value) : $toString$3(value) === boolClass;
};
var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateGetDayCall(value) {
  try {
    getDay.call(value);
    return true;
  } catch (e) {
    return false;
  }
};
var toStr$8 = Object.prototype.toString;
var dateClass = "[object Date]";
var hasToStringTag$8 = shams();
var isDateObject = function isDateObject2(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return hasToStringTag$8 ? tryDateObject(value) : toStr$8.call(value) === dateClass;
};
var toStr$7 = Object.prototype.toString;
var fnToStr$1 = Function.prototype.toString;
var isFnRegex$1 = /^\s*(?:function)?\*/;
var hasToStringTag$7 = shams();
var getProto$3 = Object.getPrototypeOf;
var getGeneratorFunc = function() {
  if (!hasToStringTag$7) {
    return false;
  }
  try {
    return Function("return function*() {}")();
  } catch (e) {
  }
};
var GeneratorFunction;
var isGeneratorFunction$1 = function isGeneratorFunction(fn2) {
  if (typeof fn2 !== "function") {
    return false;
  }
  if (isFnRegex$1.test(fnToStr$1.call(fn2))) {
    return true;
  }
  if (!hasToStringTag$7) {
    var str2 = toStr$7.call(fn2);
    return str2 === "[object GeneratorFunction]";
  }
  if (!getProto$3) {
    return false;
  }
  if (typeof GeneratorFunction === "undefined") {
    var generatorFunc = getGeneratorFunc();
    GeneratorFunction = generatorFunc ? getProto$3(generatorFunc) : false;
  }
  return getProto$3(fn2) === GeneratorFunction;
};
var numToStr = Number.prototype.toString;
var tryNumberObject = function tryNumberObject2(value) {
  try {
    numToStr.call(value);
    return true;
  } catch (e) {
    return false;
  }
};
var toStr$6 = Object.prototype.toString;
var numClass = "[object Number]";
var hasToStringTag$6 = shams();
var isNumberObject = function isNumberObject2(value) {
  if (typeof value === "number") {
    return true;
  }
  if (typeof value !== "object") {
    return false;
  }
  return hasToStringTag$6 ? tryNumberObject(value) : toStr$6.call(value) === numClass;
};
var callBound$8 = callBound$a;
var hasToStringTag$5 = shams();
var has$1;
var $exec;
var isRegexMarker;
var badStringifier;
if (hasToStringTag$5) {
  has$1 = callBound$8("Object.prototype.hasOwnProperty");
  $exec = callBound$8("RegExp.prototype.exec");
  isRegexMarker = {};
  var throwRegexMarker = function() {
    throw isRegexMarker;
  };
  badStringifier = {
    toString: throwRegexMarker,
    valueOf: throwRegexMarker
  };
  if (typeof Symbol.toPrimitive === "symbol") {
    badStringifier[Symbol.toPrimitive] = throwRegexMarker;
  }
}
var $toString$2 = callBound$8("Object.prototype.toString");
var gOPD$1 = Object.getOwnPropertyDescriptor;
var regexClass = "[object RegExp]";
var isRegex$1 = hasToStringTag$5 ? function isRegex(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  var descriptor2 = gOPD$1(value, "lastIndex");
  var hasLastIndexDataProperty = descriptor2 && has$1(descriptor2, "value");
  if (!hasLastIndexDataProperty) {
    return false;
  }
  try {
    $exec(value, badStringifier);
  } catch (e) {
    return e === isRegexMarker;
  }
} : function isRegex2(value) {
  if (!value || typeof value !== "object" && typeof value !== "function") {
    return false;
  }
  return $toString$2(value) === regexClass;
};
var strValue = String.prototype.valueOf;
var tryStringObject = function tryStringObject2(value) {
  try {
    strValue.call(value);
    return true;
  } catch (e) {
    return false;
  }
};
var toStr$5 = Object.prototype.toString;
var strClass = "[object String]";
var hasToStringTag$4 = shams();
var isString$3 = function isString(value) {
  if (typeof value === "string") {
    return true;
  }
  if (typeof value !== "object") {
    return false;
  }
  return hasToStringTag$4 ? tryStringObject(value) : toStr$5.call(value) === strClass;
};
var isSymbol$2 = { exports: {} };
var toStr$4 = Object.prototype.toString;
var hasSymbols$1 = hasSymbols$4();
if (hasSymbols$1) {
  var symToStr = Symbol.prototype.toString;
  var symStringRegex = /^Symbol\(.*\)$/;
  var isSymbolObject = function isRealSymbolObject(value) {
    if (typeof value.valueOf() !== "symbol") {
      return false;
    }
    return symStringRegex.test(symToStr.call(value));
  };
  isSymbol$2.exports = function isSymbol2(value) {
    if (typeof value === "symbol") {
      return true;
    }
    if (toStr$4.call(value) !== "[object Symbol]") {
      return false;
    }
    try {
      return isSymbolObject(value);
    } catch (e) {
      return false;
    }
  };
} else {
  isSymbol$2.exports = function isSymbol2(value) {
    return false;
  };
}
var isSymbolExports = isSymbol$2.exports;
var isBigint = { exports: {} };
var $BigInt = typeof BigInt !== "undefined" && BigInt;
var hasBigints = function hasNativeBigInts() {
  return typeof $BigInt === "function" && typeof BigInt === "function" && typeof $BigInt(42) === "bigint" && typeof BigInt(42) === "bigint";
};
var hasBigInts = hasBigints();
if (hasBigInts) {
  var bigIntValueOf = BigInt.prototype.valueOf;
  var tryBigInt = function tryBigIntObject(value) {
    try {
      bigIntValueOf.call(value);
      return true;
    } catch (e) {
    }
    return false;
  };
  isBigint.exports = function isBigInt2(value) {
    if (value === null || typeof value === "undefined" || typeof value === "boolean" || typeof value === "string" || typeof value === "number" || typeof value === "symbol" || typeof value === "function") {
      return false;
    }
    if (typeof value === "bigint") {
      return true;
    }
    return tryBigInt(value);
  };
} else {
  isBigint.exports = function isBigInt2(value) {
    return false;
  };
}
var isBigintExports = isBigint.exports;
var hasToStringTag$3 = shams();
var callBound$7 = callBound$a;
var $toString$1 = callBound$7("Object.prototype.toString");
var isStandardArguments = function isArguments(value) {
  if (hasToStringTag$3 && value && typeof value === "object" && Symbol.toStringTag in value) {
    return false;
  }
  return $toString$1(value) === "[object Arguments]";
};
var isLegacyArguments = function isArguments2(value) {
  if (isStandardArguments(value)) {
    return true;
  }
  return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString$1(value) !== "[object Array]" && $toString$1(value.callee) === "[object Function]";
};
(function() {
  return isStandardArguments(arguments);
})();
isStandardArguments.isLegacyArguments = isLegacyArguments;
const __viteBrowserExternal = new Proxy({}, {
  get(_, key) {
    throw new Error(`Module "" has been externalized for browser compatibility. Cannot access ".${key}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
  }
});
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$0$3 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var GetIntrinsic$9 = getIntrinsic;
var callBound$6 = callBound$a;
GetIntrinsic$9("%TypeError%");
GetIntrinsic$9("%WeakMap%", true);
GetIntrinsic$9("%Map%", true);
callBound$6("WeakMap.prototype.get", true);
callBound$6("WeakMap.prototype.set", true);
callBound$6("WeakMap.prototype.has", true);
callBound$6("Map.prototype.get", true);
callBound$6("Map.prototype.set", true);
callBound$6("Map.prototype.has", true);
var GetIntrinsic$8 = getIntrinsic;
GetIntrinsic$8("%TypeError%");
typeof StopIteration === "object" ? StopIteration : null;
var $Map$2 = typeof Map === "function" && Map.prototype ? Map : null;
var $Set$2 = typeof Set === "function" && Set.prototype ? Set : null;
var exported$2;
if (!$Map$2) {
  exported$2 = function isMap3(x) {
    return false;
  };
}
var $mapHas$3 = $Map$2 ? Map.prototype.has : null;
var $setHas$3 = $Set$2 ? Set.prototype.has : null;
if (!exported$2 && !$mapHas$3) {
  exported$2 = function isMap3(x) {
    return false;
  };
}
var isMap$1 = exported$2 || function isMap(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  try {
    $mapHas$3.call(x);
    if ($setHas$3) {
      try {
        $setHas$3.call(x);
      } catch (e) {
        return true;
      }
    }
    return x instanceof $Map$2;
  } catch (e) {
  }
  return false;
};
var $Map$1 = typeof Map === "function" && Map.prototype ? Map : null;
var $Set$1 = typeof Set === "function" && Set.prototype ? Set : null;
var exported$1;
if (!$Set$1) {
  exported$1 = function isSet3(x) {
    return false;
  };
}
var $mapHas$2 = $Map$1 ? Map.prototype.has : null;
var $setHas$2 = $Set$1 ? Set.prototype.has : null;
if (!exported$1 && !$setHas$2) {
  exported$1 = function isSet3(x) {
    return false;
  };
}
var isSet$1 = exported$1 || function isSet(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  try {
    $setHas$2.call(x);
    if ($mapHas$2) {
      try {
        $mapHas$2.call(x);
      } catch (e) {
        return true;
      }
    }
    return x instanceof $Set$1;
  } catch (e) {
  }
  return false;
};
if (hasSymbols$4() || shams$1())
  ;
else {
  var GetIntrinsic$7 = getIntrinsic;
  var $Map = GetIntrinsic$7("%Map%", true);
  var $Set = GetIntrinsic$7("%Set%", true);
  var callBound$5 = callBound$a;
  callBound$5("Array.prototype.push");
  callBound$5("String.prototype.charCodeAt");
  callBound$5("String.prototype.slice");
  if (!$Map && !$Set)
    ;
  else {
    callBound$5("Map.prototype.forEach", true);
    callBound$5("Set.prototype.forEach", true);
    if (typeof process === "undefined" || !process.versions || !process.versions.node) {
      callBound$5("Map.prototype.iterator", true);
      callBound$5("Set.prototype.iterator", true);
    }
    callBound$5("Map.prototype.@@iterator", true) || callBound$5("Map.prototype._es6-shim iterator_", true);
    callBound$5("Set.prototype.@@iterator", true) || callBound$5("Set.prototype._es6-shim iterator_", true);
  }
}
var $WeakMap = typeof WeakMap === "function" && WeakMap.prototype ? WeakMap : null;
var $WeakSet$1 = typeof WeakSet === "function" && WeakSet.prototype ? WeakSet : null;
var exported;
if (!$WeakMap) {
  exported = function isWeakMap3(x) {
    return false;
  };
}
var $mapHas$1 = $WeakMap ? $WeakMap.prototype.has : null;
var $setHas$1 = $WeakSet$1 ? $WeakSet$1.prototype.has : null;
if (!exported && !$mapHas$1) {
  exported = function isWeakMap3(x) {
    return false;
  };
}
var isWeakmap = exported || function isWeakMap(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  try {
    $mapHas$1.call(x, $mapHas$1);
    if ($setHas$1) {
      try {
        $setHas$1.call(x, $setHas$1);
      } catch (e) {
        return true;
      }
    }
    return x instanceof $WeakMap;
  } catch (e) {
  }
  return false;
};
var isWeakset = { exports: {} };
var GetIntrinsic$6 = getIntrinsic;
var callBound$4 = callBound$a;
var $WeakSet = GetIntrinsic$6("%WeakSet%", true);
var $setHas = callBound$4("WeakSet.prototype.has", true);
if ($setHas) {
  var $mapHas = callBound$4("WeakMap.prototype.has", true);
  isWeakset.exports = function isWeakSet2(x) {
    if (!x || typeof x !== "object") {
      return false;
    }
    try {
      $setHas(x, $setHas);
      if ($mapHas) {
        try {
          $mapHas(x, $mapHas);
        } catch (e) {
          return true;
        }
      }
      return x instanceof $WeakSet;
    } catch (e) {
    }
    return false;
  };
} else {
  isWeakset.exports = function isWeakSet2(x) {
    return false;
  };
}
var isWeaksetExports = isWeakset.exports;
var isMap2 = isMap$1;
var isSet2 = isSet$1;
var isWeakMap2 = isWeakmap;
var isWeakSet = isWeaksetExports;
var whichCollection$1 = function whichCollection(value) {
  if (value && typeof value === "object") {
    if (isMap2(value)) {
      return "Map";
    }
    if (isSet2(value)) {
      return "Set";
    }
    if (isWeakMap2(value)) {
      return "WeakMap";
    }
    if (isWeakSet(value)) {
      return "WeakSet";
    }
  }
  return false;
};
var isString$2 = isString$3;
var isNumber = isNumberObject;
var isBoolean2 = isBooleanObject;
var isSymbol$1 = isSymbolExports;
var isBigInt = isBigintExports;
var whichBoxedPrimitive$1 = function whichBoxedPrimitive(value) {
  if (value == null || typeof value !== "object" && typeof value !== "function") {
    return null;
  }
  if (isString$2(value)) {
    return "String";
  }
  if (isNumber(value)) {
    return "Number";
  }
  if (isBoolean2(value)) {
    return "Boolean";
  }
  if (isSymbol$1(value)) {
    return "Symbol";
  }
  if (isBigInt(value)) {
    return "BigInt";
  }
};
var GetIntrinsic$5 = getIntrinsic;
var $TypeError$2 = GetIntrinsic$5("%TypeError%");
var CheckObjectCoercible = function CheckObjectCoercible2(value, optMessage) {
  if (value == null) {
    throw new $TypeError$2(optMessage || "Cannot call method on " + value);
  }
  return value;
};
var RequireObjectCoercible$2 = CheckObjectCoercible;
var GetIntrinsic$4 = getIntrinsic;
var $Object$1 = GetIntrinsic$4("%Object%");
var RequireObjectCoercible$1 = RequireObjectCoercible$2;
var ToObject$1 = function ToObject(value) {
  RequireObjectCoercible$1(value);
  return $Object$1(value);
};
var toStr$3 = Object.prototype.toString;
var isArguments$2 = function isArguments3(value) {
  var str2 = toStr$3.call(value);
  var isArgs2 = str2 === "[object Arguments]";
  if (!isArgs2) {
    isArgs2 = str2 !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr$3.call(value.callee) === "[object Function]";
  }
  return isArgs2;
};
var implementation$9;
var hasRequiredImplementation$1;
function requireImplementation$1() {
  if (hasRequiredImplementation$1)
    return implementation$9;
  hasRequiredImplementation$1 = 1;
  var keysShim2;
  if (!Object.keys) {
    var has2 = Object.prototype.hasOwnProperty;
    var toStr2 = Object.prototype.toString;
    var isArgs2 = isArguments$2;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
    var hasProtoEnumBug = isEnumerable.call(function() {
    }, "prototype");
    var dontEnums = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"
    ];
    var equalsConstructorPrototype = function(o) {
      var ctor = o.constructor;
      return ctor && ctor.prototype === o;
    };
    var excludedKeys = {
      $applicationCache: true,
      $console: true,
      $external: true,
      $frame: true,
      $frameElement: true,
      $frames: true,
      $innerHeight: true,
      $innerWidth: true,
      $onmozfullscreenchange: true,
      $onmozfullscreenerror: true,
      $outerHeight: true,
      $outerWidth: true,
      $pageXOffset: true,
      $pageYOffset: true,
      $parent: true,
      $scrollLeft: true,
      $scrollTop: true,
      $scrollX: true,
      $scrollY: true,
      $self: true,
      $webkitIndexedDB: true,
      $webkitStorageInfo: true,
      $window: true
    };
    var hasAutomationEqualityBug = function() {
      if (typeof window === "undefined") {
        return false;
      }
      for (var k in window) {
        try {
          if (!excludedKeys["$" + k] && has2.call(window, k) && window[k] !== null && typeof window[k] === "object") {
            try {
              equalsConstructorPrototype(window[k]);
            } catch (e) {
              return true;
            }
          }
        } catch (e) {
          return true;
        }
      }
      return false;
    }();
    var equalsConstructorPrototypeIfNotBuggy = function(o) {
      if (typeof window === "undefined" || !hasAutomationEqualityBug) {
        return equalsConstructorPrototype(o);
      }
      try {
        return equalsConstructorPrototype(o);
      } catch (e) {
        return false;
      }
    };
    keysShim2 = function keys3(object) {
      var isObject3 = object !== null && typeof object === "object";
      var isFunction2 = toStr2.call(object) === "[object Function]";
      var isArguments5 = isArgs2(object);
      var isString3 = isObject3 && toStr2.call(object) === "[object String]";
      var theKeys = [];
      if (!isObject3 && !isFunction2 && !isArguments5) {
        throw new TypeError("Object.keys called on a non-object");
      }
      var skipProto = hasProtoEnumBug && isFunction2;
      if (isString3 && object.length > 0 && !has2.call(object, 0)) {
        for (var i = 0; i < object.length; ++i) {
          theKeys.push(String(i));
        }
      }
      if (isArguments5 && object.length > 0) {
        for (var j = 0; j < object.length; ++j) {
          theKeys.push(String(j));
        }
      } else {
        for (var name2 in object) {
          if (!(skipProto && name2 === "prototype") && has2.call(object, name2)) {
            theKeys.push(String(name2));
          }
        }
      }
      if (hasDontEnumBug) {
        var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
        for (var k = 0; k < dontEnums.length; ++k) {
          if (!(skipConstructor && dontEnums[k] === "constructor") && has2.call(object, dontEnums[k])) {
            theKeys.push(dontEnums[k]);
          }
        }
      }
      return theKeys;
    };
  }
  implementation$9 = keysShim2;
  return implementation$9;
}
var slice = Array.prototype.slice;
var isArgs = isArguments$2;
var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) {
  return origKeys(o);
} : requireImplementation$1();
var originalKeys = Object.keys;
keysShim.shim = function shimObjectKeys() {
  if (Object.keys) {
    var keysWorksWithArguments = function() {
      var args = Object.keys(arguments);
      return args && args.length === arguments.length;
    }(1, 2);
    if (!keysWorksWithArguments) {
      Object.keys = function keys3(object) {
        if (isArgs(object)) {
          return originalKeys(slice.call(object));
        }
        return originalKeys(object);
      };
    }
  } else {
    Object.keys = keysShim;
  }
  return Object.keys || keysShim;
};
var objectKeys = keysShim;
var GetIntrinsic$3 = getIntrinsic;
var $defineProperty = GetIntrinsic$3("%Object.defineProperty%", true);
var hasPropertyDescriptors$1 = function hasPropertyDescriptors() {
  if ($defineProperty) {
    try {
      $defineProperty({}, "a", { value: 1 });
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
};
hasPropertyDescriptors$1.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
  if (!hasPropertyDescriptors$1()) {
    return null;
  }
  try {
    return $defineProperty([], "length", { value: 1 }).length !== 1;
  } catch (e) {
    return true;
  }
};
var hasPropertyDescriptors_1 = hasPropertyDescriptors$1;
var keys$1 = objectKeys;
var hasSymbols2 = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
var toStr$2 = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;
var isFunction$2 = function(fn2) {
  return typeof fn2 === "function" && toStr$2.call(fn2) === "[object Function]";
};
var hasPropertyDescriptors2 = hasPropertyDescriptors_1();
var supportsDescriptors$1 = origDefineProperty && hasPropertyDescriptors2;
var defineProperty$2 = function(object, name2, value, predicate) {
  if (name2 in object) {
    if (predicate === true) {
      if (object[name2] === value) {
        return;
      }
    } else if (!isFunction$2(predicate) || !predicate()) {
      return;
    }
  }
  if (supportsDescriptors$1) {
    origDefineProperty(object, name2, {
      configurable: true,
      enumerable: false,
      value,
      writable: true
    });
  } else {
    object[name2] = value;
  }
};
var defineProperties = function(object, map2) {
  var predicates = arguments.length > 2 ? arguments[2] : {};
  var props = keys$1(map2);
  if (hasSymbols2) {
    props = concat.call(props, Object.getOwnPropertySymbols(map2));
  }
  for (var i = 0; i < props.length; i += 1) {
    defineProperty$2(object, props[i], map2[props[i]], predicates[props[i]]);
  }
};
defineProperties.supportsDescriptors = !!supportsDescriptors$1;
var defineProperties_1 = defineProperties;
var IsCallable$3 = isCallable$1;
var Type$3 = function Type(x) {
  if (x === null) {
    return "Null";
  }
  if (typeof x === "undefined") {
    return "Undefined";
  }
  if (typeof x === "function" || typeof x === "object") {
    return "Object";
  }
  if (typeof x === "number") {
    return "Number";
  }
  if (typeof x === "boolean") {
    return "Boolean";
  }
  if (typeof x === "string") {
    return "String";
  }
};
var ES5Type = Type$3;
var Type$2 = function Type2(x) {
  if (typeof x === "symbol") {
    return "Symbol";
  }
  if (typeof x === "bigint") {
    return "BigInt";
  }
  return ES5Type(x);
};
var isCallable3 = isCallable$1;
var toStr$1 = Object.prototype.toString;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var forEachArray = function forEachArray2(array, iterator, receiver) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (hasOwnProperty$1.call(array, i)) {
      if (receiver == null) {
        iterator(array[i], i, array);
      } else {
        iterator.call(receiver, array[i], i, array);
      }
    }
  }
};
var forEachString = function forEachString2(string, iterator, receiver) {
  for (var i = 0, len = string.length; i < len; i++) {
    if (receiver == null) {
      iterator(string.charAt(i), i, string);
    } else {
      iterator.call(receiver, string.charAt(i), i, string);
    }
  }
};
var forEachObject = function forEachObject2(object, iterator, receiver) {
  for (var k in object) {
    if (hasOwnProperty$1.call(object, k)) {
      if (receiver == null) {
        iterator(object[k], k, object);
      } else {
        iterator.call(receiver, object[k], k, object);
      }
    }
  }
};
var forEach$2 = function forEach(list2, iterator, thisArg) {
  if (!isCallable3(iterator)) {
    throw new TypeError("iterator must be a function");
  }
  var receiver;
  if (arguments.length >= 3) {
    receiver = thisArg;
  }
  if (toStr$1.call(list2) === "[object Array]") {
    forEachArray(list2, iterator, receiver);
  } else if (typeof list2 === "string") {
    forEachString(list2, iterator, receiver);
  } else {
    forEachObject(list2, iterator, receiver);
  }
};
var forEach_1 = forEach$2;
var possibleNames = [
  "BigInt64Array",
  "BigUint64Array",
  "Float32Array",
  "Float64Array",
  "Int16Array",
  "Int32Array",
  "Int8Array",
  "Uint16Array",
  "Uint32Array",
  "Uint8Array",
  "Uint8ClampedArray"
];
var g$1 = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
var availableTypedArrays$1 = function availableTypedArrays() {
  var out = [];
  for (var i = 0; i < possibleNames.length; i++) {
    if (typeof g$1[possibleNames[i]] === "function") {
      out[out.length] = possibleNames[i];
    }
  }
  return out;
};
var GetIntrinsic$2 = getIntrinsic;
var $gOPD = GetIntrinsic$2("%Object.getOwnPropertyDescriptor%", true);
if ($gOPD) {
  try {
    $gOPD([], "length");
  } catch (e) {
    $gOPD = null;
  }
}
var gopd = $gOPD;
var isTypedArray$1;
var hasRequiredIsTypedArray;
function requireIsTypedArray() {
  if (hasRequiredIsTypedArray)
    return isTypedArray$1;
  hasRequiredIsTypedArray = 1;
  var forEach3 = forEach_1;
  var availableTypedArrays3 = availableTypedArrays$1;
  var callBound2 = callBound$a;
  var $toString2 = callBound2("Object.prototype.toString");
  var hasToStringTag2 = shams();
  var gOPD2 = gopd;
  var g2 = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
  var typedArrays2 = availableTypedArrays3();
  var $indexOf2 = callBound2("Array.prototype.indexOf", true) || function indexOf(array, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i] === value) {
        return i;
      }
    }
    return -1;
  };
  var $slice2 = callBound2("String.prototype.slice");
  var toStrTags2 = {};
  var getPrototypeOf7 = Object.getPrototypeOf;
  if (hasToStringTag2 && gOPD2 && getPrototypeOf7) {
    forEach3(typedArrays2, function(typedArray) {
      var arr = new g2[typedArray]();
      if (Symbol.toStringTag in arr) {
        var proto2 = getPrototypeOf7(arr);
        var descriptor2 = gOPD2(proto2, Symbol.toStringTag);
        if (!descriptor2) {
          var superProto = getPrototypeOf7(proto2);
          descriptor2 = gOPD2(superProto, Symbol.toStringTag);
        }
        toStrTags2[typedArray] = descriptor2.get;
      }
    });
  }
  var tryTypedArrays2 = function tryAllTypedArrays2(value) {
    var anyTrue = false;
    forEach3(toStrTags2, function(getter, typedArray) {
      if (!anyTrue) {
        try {
          anyTrue = getter.call(value) === typedArray;
        } catch (e) {
        }
      }
    });
    return anyTrue;
  };
  isTypedArray$1 = function isTypedArray2(value) {
    if (!value || typeof value !== "object") {
      return false;
    }
    if (!hasToStringTag2 || !(Symbol.toStringTag in value)) {
      var tag2 = $slice2($toString2(value), 8, -1);
      return $indexOf2(typedArrays2, tag2) > -1;
    }
    if (!gOPD2) {
      return false;
    }
    return tryTypedArrays2(value);
  };
  return isTypedArray$1;
}
var forEach$1 = forEach_1;
var availableTypedArrays2 = availableTypedArrays$1;
var callBind$2 = callBindExports;
var callBound$3 = callBound$a;
var gOPD = gopd;
var $toString = callBound$3("Object.prototype.toString");
var hasToStringTag$2 = shams();
var g = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
var typedArrays = availableTypedArrays2();
var $slice = callBound$3("String.prototype.slice");
var toStrTags = { __proto__: null };
var getPrototypeOf = Object.getPrototypeOf;
if (hasToStringTag$2 && gOPD && getPrototypeOf) {
  forEach$1(typedArrays, function(typedArray) {
    if (typeof g[typedArray] === "function") {
      var arr = new g[typedArray]();
      if (Symbol.toStringTag in arr) {
        var proto2 = getPrototypeOf(arr);
        var descriptor2 = gOPD(proto2, Symbol.toStringTag);
        if (!descriptor2) {
          var superProto = getPrototypeOf(proto2);
          descriptor2 = gOPD(superProto, Symbol.toStringTag);
        }
        toStrTags[typedArray] = callBind$2(descriptor2.get);
      }
    }
  });
}
var tryTypedArrays = function tryAllTypedArrays(value) {
  var foundName = false;
  forEach$1(toStrTags, function(getter, typedArray) {
    if (!foundName) {
      try {
        var name2 = getter(value);
        if (name2 === typedArray) {
          foundName = name2;
        }
      } catch (e) {
      }
    }
  });
  return foundName;
};
var isTypedArray = requireIsTypedArray();
var whichTypedArray$1 = function whichTypedArray(value) {
  if (!isTypedArray(value)) {
    return false;
  }
  if (!hasToStringTag$2 || !(Symbol.toStringTag in value)) {
    return $slice($toString(value), 8, -1);
  }
  return tryTypedArrays(value);
};
var callBound$2 = callBound$a;
var $deref = callBound$2("WeakRef.prototype.deref", true);
var isWeakref = typeof WeakRef === "undefined" ? function isWeakRef(value) {
  return false;
} : function isWeakRef2(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  try {
    $deref(value);
    return true;
  } catch (e) {
    return false;
  }
};
var callBound$1 = callBound$a;
var $register = callBound$1("FinalizationRegistry.prototype.register", true);
var isFinalizationregistry = $register ? function isFinalizationRegistry(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  try {
    $register(value, {});
    return true;
  } catch (e) {
    return false;
  }
} : function isFinalizationRegistry2(value) {
  return false;
};
var IsCallable$2 = isCallable$1;
var functionsHaveNames_1;
var hasRequiredFunctionsHaveNames;
function requireFunctionsHaveNames() {
  if (hasRequiredFunctionsHaveNames)
    return functionsHaveNames_1;
  hasRequiredFunctionsHaveNames = 1;
  var functionsHaveNames2 = function functionsHaveNames3() {
    return typeof (function f() {
    }).name === "string";
  };
  var gOPD2 = Object.getOwnPropertyDescriptor;
  if (gOPD2) {
    try {
      gOPD2([], "length");
    } catch (e) {
      gOPD2 = null;
    }
  }
  functionsHaveNames2.functionsHaveConfigurableNames = function functionsHaveConfigurableNames() {
    if (!functionsHaveNames2() || !gOPD2) {
      return false;
    }
    var desc = gOPD2(function() {
    }, "name");
    return !!desc && !!desc.configurable;
  };
  var $bind = Function.prototype.bind;
  functionsHaveNames2.boundFunctionsHaveNames = function boundFunctionsHaveNames() {
    return functionsHaveNames2() && typeof $bind === "function" && (function f() {
    }).bind().name !== "";
  };
  functionsHaveNames_1 = functionsHaveNames2;
  return functionsHaveNames_1;
}
var IsCallable$1 = IsCallable$2;
var functionsHaveNames$1 = requireFunctionsHaveNames()();
var callBound = callBound$a;
var $functionToString = callBound("Function.prototype.toString");
var $stringMatch = callBound("String.prototype.match");
var classRegex = /^class /;
var isClass$2 = function isClassConstructor(fn2) {
  if (IsCallable$1(fn2)) {
    return false;
  }
  if (typeof fn2 !== "function") {
    return false;
  }
  try {
    var match2 = $stringMatch($functionToString(fn2), classRegex);
    return !!match2;
  } catch (e) {
  }
  return false;
};
var regex = /\s*function\s+([^(\s]*)\s*/;
var functionProto = Function.prototype;
var implementation$8 = function getName() {
  if (!isClass$2(this) && !IsCallable$1(this)) {
    throw new TypeError("Function.prototype.name sham getter called on non-function");
  }
  if (functionsHaveNames$1) {
    return this.name;
  }
  if (this === functionProto) {
    return "";
  }
  var str2 = $functionToString(this);
  var match2 = $stringMatch(str2, regex);
  var name2 = match2 && match2[1];
  return name2;
};
var implementation$7 = implementation$8;
var polyfill$3 = function getPolyfill() {
  return implementation$7;
};
var supportsDescriptors = defineProperties_1.supportsDescriptors;
var functionsHaveNames = requireFunctionsHaveNames()();
var getPolyfill$3 = polyfill$3;
var defineProperty$1 = Object.defineProperty;
var TypeErr = TypeError;
var shim$8 = function shimName() {
  var polyfill2 = getPolyfill$3();
  if (functionsHaveNames) {
    return polyfill2;
  }
  if (!supportsDescriptors) {
    throw new TypeErr("Shimming Function.prototype.name support requires ES5 property descriptor support.");
  }
  var functionProto2 = Function.prototype;
  defineProperty$1(functionProto2, "name", {
    configurable: true,
    enumerable: false,
    get: function() {
      var name2 = polyfill2.call(this);
      if (this !== functionProto2) {
        defineProperty$1(this, "name", {
          configurable: true,
          enumerable: false,
          value: name2,
          writable: false
        });
      }
      return name2;
    }
  });
  return polyfill2;
};
var define$i = defineProperties_1;
var callBind$1 = callBindExports;
var implementation$6 = implementation$8;
var getPolyfill$2 = polyfill$3;
var shim$7 = shim$8;
var bound$1 = callBind$1(implementation$6);
define$i(bound$1, {
  getPolyfill: getPolyfill$2,
  implementation: implementation$6,
  shim: shim$7
});
var function_prototype_name = bound$1;
var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*async(?:\s+function(?:\s+|\()|\s*\()/;
var hasToStringTag$1 = shams();
var getProto$2 = Object.getPrototypeOf;
var getAsyncFunc = function() {
  if (!hasToStringTag$1) {
    return false;
  }
  try {
    return Function("return async function () {}")();
  } catch (e) {
  }
};
var AsyncFunction;
var isAsyncFunction$1 = function isAsyncFunction(fn2) {
  if (typeof fn2 !== "function") {
    return false;
  }
  if (isFnRegex.test(fnToStr.call(fn2))) {
    return true;
  }
  if (!hasToStringTag$1) {
    var str2 = toStr.call(fn2);
    return str2 === "[object AsyncFunction]";
  }
  if (!getProto$2) {
    return false;
  }
  if (typeof AsyncFunction === "undefined") {
    var asyncFunc = getAsyncFunc();
    AsyncFunction = asyncFunc ? getProto$2(asyncFunc) : false;
  }
  return getProto$2(fn2) === AsyncFunction;
};
var whichBoxedPrimitive2 = whichBoxedPrimitive$1;
var whichCollection2 = whichCollection$1;
var whichTypedArray2 = whichTypedArray$1;
var isArray$4 = isarray;
var isDate$1 = isDateObject;
var isRegex3 = isRegex$1;
var isWeakRef3 = isWeakref;
var isFinalizationRegistry3 = isFinalizationregistry;
var name$1 = function_prototype_name;
var isGeneratorFunction2 = isGeneratorFunction$1;
var isAsyncFunction2 = isAsyncFunction$1;
var hasToStringTag = shams();
var toStringTag = hasToStringTag && Symbol.toStringTag;
var $Object = Object;
var promiseThen = typeof Promise === "function" && Promise.prototype.then;
var isPromise = function isPromise2(value) {
  if (!value || typeof value !== "object" || !promiseThen) {
    return false;
  }
  try {
    promiseThen.call(value, null, function() {
    });
    return true;
  } catch (e) {
  }
  return false;
};
var isKnownBuiltin = function isKnownBuiltin2(builtinName) {
  return builtinName && builtinName !== "BigInt" && builtinName !== "Boolean" && builtinName !== "Null" && builtinName !== "Number" && builtinName !== "String" && builtinName !== "Symbol" && builtinName !== "Undefined" && builtinName !== "Math" && builtinName !== "JSON" && builtinName !== "Reflect" && builtinName !== "Atomics" && builtinName !== "Map" && builtinName !== "Set" && builtinName !== "WeakMap" && builtinName !== "WeakSet" && builtinName !== "BigInt64Array" && builtinName !== "BigUint64Array" && builtinName !== "Float32Array" && builtinName !== "Float64Array" && builtinName !== "Int16Array" && builtinName !== "Int32Array" && builtinName !== "Int8Array" && builtinName !== "Uint16Array" && builtinName !== "Uint32Array" && builtinName !== "Uint8Array" && builtinName !== "Uint8ClampedArray" && builtinName !== "Array" && builtinName !== "Date" && builtinName !== "FinalizationRegistry" && builtinName !== "Promise" && builtinName !== "RegExp" && builtinName !== "WeakRef" && builtinName !== "Function" && builtinName !== "GeneratorFunction" && builtinName !== "AsyncFunction";
};
var whichBuiltinType$1 = function whichBuiltinType(value) {
  if (value == null) {
    return value;
  }
  var which = whichBoxedPrimitive2($Object(value)) || whichCollection2(value) || whichTypedArray2(value);
  if (which) {
    return which;
  }
  if (isArray$4(value)) {
    return "Array";
  }
  if (isDate$1(value)) {
    return "Date";
  }
  if (isRegex3(value)) {
    return "RegExp";
  }
  if (isWeakRef3(value)) {
    return "WeakRef";
  }
  if (isFinalizationRegistry3(value)) {
    return "FinalizationRegistry";
  }
  if (typeof value === "function") {
    if (isGeneratorFunction2(value)) {
      return "GeneratorFunction";
    }
    if (isAsyncFunction2(value)) {
      return "AsyncFunction";
    }
    return "Function";
  }
  if (isPromise(value)) {
    return "Promise";
  }
  if (toStringTag && toStringTag in value) {
    var tag2 = value[toStringTag];
    if (isKnownBuiltin(tag2)) {
      return tag2;
    }
  }
  if (typeof value.constructor === "function") {
    var constructorName = name$1(value.constructor);
    if (isKnownBuiltin(constructorName)) {
      return constructorName;
    }
  }
  return "Object";
};
var GetIntrinsic$1 = getIntrinsic;
var IsCallable = IsCallable$3;
var Type$1 = Type$2;
var whichBuiltinType2 = whichBuiltinType$1;
var $gPO = GetIntrinsic$1("%Object.getPrototypeOf%", true);
var $ObjectPrototype = GetIntrinsic$1("%Object.prototype%");
var $TypeError$1 = GetIntrinsic$1("%TypeError%");
var hasProto$2 = [].__proto__ === Array.prototype;
var implementation$5 = function getPrototypeOf2(O) {
  if (Type$1(O) !== "Object") {
    throw new $TypeError$1("Reflect.getPrototypeOf called on non-object");
  }
  if ($gPO) {
    return $gPO(O);
  }
  if (hasProto$2) {
    var proto2 = O.__proto__;
    if (proto2 || proto2 === null) {
      return proto2;
    }
  }
  var type = whichBuiltinType2(O);
  if (type) {
    var intrinsic = GetIntrinsic$1("%" + type + "%.prototype", true);
    if (intrinsic) {
      return intrinsic;
    }
  }
  if (IsCallable(O.constructor)) {
    return O.constructor.prototype;
  }
  if (O instanceof Object) {
    return $ObjectPrototype;
  }
  return null;
};
var Type3 = Type$2;
var GetIntrinsic2 = getIntrinsic;
var $TypeError = GetIntrinsic2("%TypeError%");
var implementation$4 = implementation$5;
var hasProto$1 = [].__proto__ === Array.prototype;
var getProto$1 = function getPrototypeOf3(value) {
  if (Type3(value) !== "Object") {
    throw new $TypeError("Reflect.getPrototypeOf called on non-object");
  }
  return value.__proto__;
};
var polyfill$2 = function getPolyfill2() {
  if (typeof Reflect === "object" && Reflect && Reflect.getPrototypeOf) {
    return Reflect.getPrototypeOf;
  }
  if (hasProto$1) {
    return getProto$1;
  }
  return implementation$4;
};
var define$h = defineProperties_1;
var getPolyfill$1 = polyfill$2;
var shim$6 = function shimGetPrototypeOf() {
  define$h(
    commonjsGlobal,
    { Reflect: {} },
    { Reflect: function() {
      return typeof Reflect !== "object" || !Reflect;
    } }
  );
  var polyfill2 = getPolyfill$1();
  define$h(
    Reflect,
    { getPrototypeOf: polyfill2 },
    { getPrototypeOf: function() {
      return Reflect.getPrototypeOf !== polyfill2;
    } }
  );
  return polyfill2;
};
var callBind = callBindExports;
var define$g = defineProperties_1;
var implementation$3 = implementation$5;
var getPolyfill3 = polyfill$2;
var shim$5 = shim$6;
var bound = callBind(getPolyfill3(), typeof Reflect === "object" ? Reflect : Object);
define$g(bound, {
  getPolyfill: getPolyfill3,
  implementation: implementation$3,
  shim: shim$5
});
var reflect_getprototypeof = bound;
var ToObject2 = ToObject$1;
var ReflectGetPrototypeOf = reflect_getprototypeof;
var implementation$2 = function getPrototypeOf4(O) {
  return ReflectGetPrototypeOf(ToObject2(O));
};
var RequireObjectCoercible = RequireObjectCoercible$2;
var implementation$1 = implementation$2;
var hasProto2 = [].__proto__ === Array.prototype;
var getProto = function getPrototypeOf5(value) {
  RequireObjectCoercible(value);
  return value.__proto__;
};
var $getPrototypeOf = Object.getPrototypeOf;
var getPrototypeOfPrimitivesToo = function getPrototypeOf6(value) {
  RequireObjectCoercible(value);
  return $getPrototypeOf(Object(value));
};
var polyfill$1 = function getPolyfill4() {
  if ($getPrototypeOf) {
    try {
      $getPrototypeOf(true);
    } catch (e) {
      return getPrototypeOfPrimitivesToo;
    }
    return $getPrototypeOf;
  }
  if (hasProto2) {
    return getProto;
  }
  return implementation$1;
};
polyfill$1();
shams$1();
hasBigints();
requireFunctionsHaveNames()();
function __flatten(object, settings = {}) {
  const toReturn = {};
  if (!Array.isArray(object) && !__isPlainObject(object))
    return object;
  settings = Object.assign({ separator: ".", array: false, quoteSeparatedProperties: true, quoteCharacter: '"', excludeProps: [], keepLastIntact: false }, settings);
  for (const key in object) {
    if (object[key] === void 0)
      continue;
    if (object[key] === null) {
      toReturn[key] = null;
      continue;
    }
    if (settings.excludeProps.indexOf(key) !== -1) {
      toReturn[key] = object[key];
      continue;
    }
    if (Array.isArray(object[key]) && settings.array || (!Array.isArray(object[key]) && typeof object[key]) == "object") {
      const isArray2 = Array.isArray(object[key]);
      const flatObject = __flatten(object[key], Object.assign(Object.assign({}, settings), { keepLastIntact: false }));
      for (const x in flatObject) {
        if (flatObject[x] === void 0)
          continue;
        if (isArray2) {
          toReturn[`${key}[${x}]`] = flatObject[x];
        } else {
          const part = key;
          if (settings.quoteSeparatedProperties && part.includes(settings.separator)) {
            toReturn[`${settings.quoteCharacter}${key}${settings.quoteCharacter}` + settings.separator + x] = flatObject[x];
          } else {
            toReturn[key + settings.separator + x] = flatObject[x];
          }
        }
      }
      continue;
    }
    toReturn[key] = object[key];
  }
  return toReturn;
}
const __viteBrowserExternal_path = new Proxy({}, {
  get(_, key) {
    throw new Error(`Module "path" has been externalized for browser compatibility. Cannot access "path.${key}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
  }
});
const __viteBrowserExternal_path$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal_path
}, Symbol.toStringTag, { value: "Module" }));
const require$$0$2 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal_path$1);
var concatMap$1 = function(xs, fn2) {
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    var x = fn2(xs[i], i);
    if (isArray$3(x))
      res.push.apply(res, x);
    else
      res.push(x);
  }
  return res;
};
var isArray$3 = Array.isArray || function(xs) {
  return Object.prototype.toString.call(xs) === "[object Array]";
};
var balancedMatch = balanced$1;
function balanced$1(a, b, str2) {
  if (a instanceof RegExp)
    a = maybeMatch(a, str2);
  if (b instanceof RegExp)
    b = maybeMatch(b, str2);
  var r = range(a, b, str2);
  return r && {
    start: r[0],
    end: r[1],
    pre: str2.slice(0, r[0]),
    body: str2.slice(r[0] + a.length, r[1]),
    post: str2.slice(r[1] + b.length)
  };
}
function maybeMatch(reg, str2) {
  var m = str2.match(reg);
  return m ? m[0] : null;
}
balanced$1.range = range;
function range(a, b, str2) {
  var begs, beg, left, right, result2;
  var ai = str2.indexOf(a);
  var bi = str2.indexOf(b, ai + 1);
  var i = ai;
  if (ai >= 0 && bi > 0) {
    if (a === b) {
      return [ai, bi];
    }
    begs = [];
    left = str2.length;
    while (i >= 0 && !result2) {
      if (i == ai) {
        begs.push(i);
        ai = str2.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result2 = [begs.pop(), bi];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }
        bi = str2.indexOf(b, i + 1);
      }
      i = ai < bi && ai >= 0 ? ai : bi;
    }
    if (begs.length) {
      result2 = [left, right];
    }
  }
  return result2;
}
var concatMap = concatMap$1;
var balanced = balancedMatch;
var braceExpansion = expandTop;
var escSlash = "\0SLASH" + Math.random() + "\0";
var escOpen = "\0OPEN" + Math.random() + "\0";
var escClose = "\0CLOSE" + Math.random() + "\0";
var escComma = "\0COMMA" + Math.random() + "\0";
var escPeriod = "\0PERIOD" + Math.random() + "\0";
function numeric(str2) {
  return parseInt(str2, 10) == str2 ? parseInt(str2, 10) : str2.charCodeAt(0);
}
function escapeBraces(str2) {
  return str2.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
}
function unescapeBraces(str2) {
  return str2.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
}
function parseCommaParts(str2) {
  if (!str2)
    return [""];
  var parts = [];
  var m = balanced("{", "}", str2);
  if (!m)
    return str2.split(",");
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
function expandTop(str2) {
  if (!str2)
    return [];
  if (str2.substr(0, 2) === "{}") {
    str2 = "\\{\\}" + str2.substr(2);
  }
  return expand$1(escapeBraces(str2), true).map(unescapeBraces);
}
function embrace(str2) {
  return "{" + str2 + "}";
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
function expand$1(str2, isTop) {
  var expansions = [];
  var m = balanced("{", "}", str2);
  if (!m || /\$$/.test(m.pre))
    return [str2];
  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(",") >= 0;
  if (!isSequence && !isOptions) {
    if (m.post.match(/,.*\}/)) {
      str2 = m.pre + "{" + m.body + escClose + m.post;
      return expand$1(str2);
    }
    return [str2];
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
    var test2 = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test2 = gte;
    }
    var pad2 = n.some(isPadded);
    N = [];
    for (var i = x; test2(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === "\\")
          c = "";
      } else {
        c = String(i);
        if (pad2) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join("0");
            if (i < 0)
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
minimatch.Minimatch = Minimatch;
var path = function() {
  try {
    return require$$0$2;
  } catch (e) {
  }
}() || {
  sep: "/"
};
minimatch.sep = path.sep;
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
  return function(p, i, list2) {
    return minimatch(p, pattern, options);
  };
}
function ext(a, b) {
  b = b || {};
  var t = {};
  Object.keys(a).forEach(function(k) {
    t[k] = a[k];
  });
  Object.keys(b).forEach(function(k) {
    t[k] = b[k];
  });
  return t;
}
minimatch.defaults = function(def) {
  if (!def || typeof def !== "object" || !Object.keys(def).length) {
    return minimatch;
  }
  var orig = minimatch;
  var m = function minimatch2(p, pattern, options) {
    return orig(p, pattern, ext(def, options));
  };
  m.Minimatch = function Minimatch2(pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options));
  };
  m.Minimatch.defaults = function defaults(options) {
    return orig.defaults(ext(def, options)).Minimatch;
  };
  m.filter = function filter2(pattern, options) {
    return orig.filter(pattern, ext(def, options));
  };
  m.defaults = function defaults(options) {
    return orig.defaults(ext(def, options));
  };
  m.makeRe = function makeRe2(pattern, options) {
    return orig.makeRe(pattern, ext(def, options));
  };
  m.braceExpand = function braceExpand2(pattern, options) {
    return orig.braceExpand(pattern, ext(def, options));
  };
  m.match = function(list2, pattern, options) {
    return orig.match(list2, pattern, ext(def, options));
  };
  return m;
};
Minimatch.defaults = function(def) {
  return minimatch.defaults(def).Minimatch;
};
function minimatch(p, pattern, options) {
  assertValidPattern(pattern);
  if (!options)
    options = {};
  if (!options.nocomment && pattern.charAt(0) === "#") {
    return false;
  }
  return new Minimatch(pattern, options).match(p);
}
function Minimatch(pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options);
  }
  assertValidPattern(pattern);
  if (!options)
    options = {};
  pattern = pattern.trim();
  if (!options.allowWindowsEscape && path.sep !== "/") {
    pattern = pattern.split(path.sep).join("/");
  }
  this.options = options;
  this.set = [];
  this.pattern = pattern;
  this.regexp = null;
  this.negate = false;
  this.comment = false;
  this.empty = false;
  this.partial = !!options.partial;
  this.make();
}
Minimatch.prototype.debug = function() {
};
Minimatch.prototype.make = make;
function make() {
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
    this.debug = function debug() {
      console.error.apply(console, arguments);
    };
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
  for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
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
  assertValidPattern(pattern);
  if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
    return [pattern];
  }
  return expand(pattern);
}
var MAX_PATTERN_LENGTH = 1024 * 64;
var assertValidPattern = function(pattern) {
  if (typeof pattern !== "string") {
    throw new TypeError("invalid pattern");
  }
  if (pattern.length > MAX_PATTERN_LENGTH) {
    throw new TypeError("pattern is too long");
  }
};
Minimatch.prototype.parse = parse$1;
var SUBPARSE = {};
function parse$1(pattern, isSub) {
  assertValidPattern(pattern);
  var options = this.options;
  if (pattern === "**") {
    if (!options.noglobstar)
      return GLOBSTAR;
    else
      pattern = "*";
  }
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
  for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
    this.debug("%s	%s %s %j", pattern, i, re, c);
    if (escaping && reSpecials[c]) {
      re += "\\" + c;
      escaping = false;
      continue;
    }
    switch (c) {
      case "/": {
        return false;
      }
      case "\\":
        clearStateChar();
        escaping = true;
        continue;
      case "?":
      case "*":
      case "+":
      case "@":
      case "!":
        this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
        if (inClass) {
          this.debug("  in class");
          if (c === "!" && i === classStart + 1)
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
          start: i - 1,
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
        classStart = i;
        reClassStart = re.length;
        re += c;
        continue;
      case "]":
        if (i === classStart + 1 || !inClass) {
          re += "\\" + c;
          escaping = false;
          continue;
        }
        var cs = pattern.substring(classStart + 1, i);
        try {
          RegExp("[" + cs + "]");
        } catch (er) {
          var sp = this.parse(cs, SUBPARSE);
          re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
          hasMagic = hasMagic || sp[1];
          inClass = false;
          continue;
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
    case "[":
    case ".":
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
    for (i = 0; i < openParensBefore; i++) {
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
  var flags2 = options.nocase ? "i" : "";
  try {
    var regExp = new RegExp("^" + re + "$", flags2);
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
Minimatch.prototype.makeRe = makeRe$1;
function makeRe$1() {
  if (this.regexp || this.regexp === false)
    return this.regexp;
  var set = this.set;
  if (!set.length) {
    this.regexp = false;
    return this.regexp;
  }
  var options = this.options;
  var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
  var flags2 = options.nocase ? "i" : "";
  var re = set.map(function(pattern) {
    return pattern.map(function(p) {
      return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
    }).join("\\/");
  }).join("|");
  re = "^(?:" + re + ")$";
  if (this.negate)
    re = "^(?!" + re + ").*$";
  try {
    this.regexp = new RegExp(re, flags2);
  } catch (ex) {
    this.regexp = false;
  }
  return this.regexp;
}
minimatch.match = function(list2, pattern, options) {
  options = options || {};
  var mm = new Minimatch(pattern, options);
  list2 = list2.filter(function(f) {
    return mm.match(f);
  });
  if (mm.options.nonull && !list2.length) {
    list2.push(pattern);
  }
  return list2;
};
Minimatch.prototype.match = function match(f, partial) {
  if (typeof partial === "undefined")
    partial = this.partial;
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
  var i;
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i];
    if (filename)
      break;
  }
  for (i = 0; i < set.length; i++) {
    var pattern = set[i];
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
};
Minimatch.prototype.matchOne = function(file, pattern, partial) {
  var options = this.options;
  this.debug(
    "matchOne",
    { "this": this, file, pattern }
  );
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
      hit = f === p;
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
    return fi === fl - 1 && file[fi] === "";
  }
  throw new Error("wtf?");
};
function globUnescape(s) {
  return s.replace(/\\(.)/g, "$1");
}
function regExpEscape(s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
function pad(hash2, len) {
  while (hash2.length < len) {
    hash2 = "0" + hash2;
  }
  return hash2;
}
function fold(hash2, text) {
  var i;
  var chr;
  var len;
  if (text.length === 0) {
    return hash2;
  }
  for (i = 0, len = text.length; i < len; i++) {
    chr = text.charCodeAt(i);
    hash2 = (hash2 << 5) - hash2 + chr;
    hash2 |= 0;
  }
  return hash2 < 0 ? hash2 * -2 : hash2;
}
function foldObject(hash2, o, seen2) {
  return Object.keys(o).sort().reduce(foldKey, hash2);
  function foldKey(hash3, key) {
    return foldValue(hash3, o[key], key, seen2);
  }
}
function foldValue(input, value, key, seen2) {
  var hash2 = fold(fold(fold(input, key), toString$1(value)), typeof value);
  if (value === null) {
    return fold(hash2, "null");
  }
  if (value === void 0) {
    return fold(hash2, "undefined");
  }
  if (typeof value === "object" || typeof value === "function") {
    if (seen2.indexOf(value) !== -1) {
      return fold(hash2, "[Circular]" + key);
    }
    seen2.push(value);
    var objHash = foldObject(hash2, value, seen2);
    if (!("valueOf" in value) || typeof value.valueOf !== "function") {
      return objHash;
    }
    try {
      return fold(objHash, String(value.valueOf()));
    } catch (err) {
      return fold(objHash, "[valueOf exception]" + (err.stack || err.message));
    }
  }
  return fold(hash2, value.toString());
}
function toString$1(o) {
  return Object.prototype.toString.call(o);
}
function sum(o) {
  return pad(foldValue(0, o, "", []).toString(16), 8);
}
var hashSum = sum;
const __hashSum = /* @__PURE__ */ getDefaultExportFromCjs(hashSum);
function objectHash(obj, settings = {}) {
  settings = Object.assign({}, settings);
  return __hashSum(obj);
}
function __sort(object, sort) {
  const keys3 = Object.keys(object);
  const sortedKeys = keys3.sort((a, b) => {
    if (!sort) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    }
    return sort({ key: a, value: object[a] }, { key: b, value: object[b] });
  });
  const resultObj = {};
  sortedKeys.forEach((k) => {
    resultObj[k] = object[k];
  });
  return resultObj;
}
class SSugarConfig {
  static get finalConfig() {
    var _a2, _b2, _c2, _d2, _e2, _f, _g, _h;
    if (SSugarConfig._finalConfig)
      return SSugarConfig._finalConfig;
    SSugarConfig._finalConfig = __deepMerge(
      // @ts-ignore
      (_h = (_c2 = (_b2 = (_a2 = document.env) === null || _a2 === void 0 ? void 0 : _a2.SUGAR) === null || _b2 === void 0 ? void 0 : _b2.config) !== null && _c2 !== void 0 ? _c2 : (_g = (_f = (_e2 = (_d2 = window.top) === null || _d2 === void 0 ? void 0 : _d2.document) === null || _e2 === void 0 ? void 0 : _e2.env) === null || _f === void 0 ? void 0 : _f.SUGAR) === null || _g === void 0 ? void 0 : _g.config) !== null && _h !== void 0 ? _h : {}
    );
    return SSugarConfig._finalConfig;
  }
  /**
   * @name        config
   * @type        ISSugarConfig
   * @get
   *
   * Simple config accessor to access directly the config object
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static get config() {
    return this.get(".");
  }
  /**
   * @name            get
   * @type            Function
   * @static
   *
   * This static method allows you to access your configurations
   *
   * @param       {String}            [dotpath='.']             The dotpath representing the configuration you want to access
   * @return      {any}                                   The getted configuration
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static get(dotpath = ".") {
    return get(SSugarConfig.finalConfig, dotpath);
  }
  /**
   * @name            set
   * @type            Function
   * @static
   *
   * This static method allows you to set a configuration value
   *
   * @param       {String}            dotpath             The dotpath representing the configuration you want to access
   * @param       {any}               value               The value you want to set
   * @return      {any}                                   The getted configuration
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static set(dotpath, value) {
    return __set(SSugarConfig.finalConfig, dotpath, value);
  }
}
var md5$1 = { exports: {} };
function commonjsRequire(path2) {
  throw new Error('Could not dynamically require "' + path2 + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var core = { exports: {} };
var hasRequiredCore;
function requireCore() {
  if (hasRequiredCore)
    return core.exports;
  hasRequiredCore = 1;
  (function(module, exports) {
    (function(root, factory) {
      {
        module.exports = factory();
      }
    })(commonjsGlobal, function() {
      var CryptoJS = CryptoJS || function(Math2, undefined$12) {
        var crypto;
        if (typeof window !== "undefined" && window.crypto) {
          crypto = window.crypto;
        }
        if (typeof self !== "undefined" && self.crypto) {
          crypto = self.crypto;
        }
        if (typeof globalThis !== "undefined" && globalThis.crypto) {
          crypto = globalThis.crypto;
        }
        if (!crypto && typeof window !== "undefined" && window.msCrypto) {
          crypto = window.msCrypto;
        }
        if (!crypto && typeof commonjsGlobal !== "undefined" && commonjsGlobal.crypto) {
          crypto = commonjsGlobal.crypto;
        }
        if (!crypto && typeof commonjsRequire === "function") {
          try {
            crypto = require$$0$3;
          } catch (err) {
          }
        }
        var cryptoSecureRandomInt = function() {
          if (crypto) {
            if (typeof crypto.getRandomValues === "function") {
              try {
                return crypto.getRandomValues(new Uint32Array(1))[0];
              } catch (err) {
              }
            }
            if (typeof crypto.randomBytes === "function") {
              try {
                return crypto.randomBytes(4).readInt32LE();
              } catch (err) {
              }
            }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        };
        var create2 = Object.create || function() {
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
            /**
             * Creates a new object that inherits from this object.
             *
             * @param {Object} overrides Properties to copy into the new object.
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         field: 'value',
             *
             *         method: function () {
             *         }
             *     });
             */
            extend: function(overrides) {
              var subtype = create2(this);
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
            /**
             * Extends this object and runs the init method.
             * Arguments to create() will be passed to init().
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var instance = MyType.create();
             */
            create: function() {
              var instance = this.extend();
              instance.init.apply(instance, arguments);
              return instance;
            },
            /**
             * Initializes a newly created object.
             * Override this method to add some logic when your objects are created.
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         init: function () {
             *             // ...
             *         }
             *     });
             */
            init: function() {
            },
            /**
             * Copies properties into this object.
             *
             * @param {Object} properties The properties to mix in.
             *
             * @example
             *
             *     MyType.mixIn({
             *         field: 'value'
             *     });
             */
            mixIn: function(properties2) {
              for (var propertyName in properties2) {
                if (properties2.hasOwnProperty(propertyName)) {
                  this[propertyName] = properties2[propertyName];
                }
              }
              if (properties2.hasOwnProperty("toString")) {
                this.toString = properties2.toString;
              }
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = instance.clone();
             */
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }();
        var WordArray = C_lib.WordArray = Base.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of 32-bit words.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.create();
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
           */
          init: function(words, sigBytes) {
            words = this.words = words || [];
            if (sigBytes != undefined$12) {
              this.sigBytes = sigBytes;
            } else {
              this.sigBytes = words.length * 4;
            }
          },
          /**
           * Converts this word array to a string.
           *
           * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
           *
           * @return {string} The stringified word array.
           *
           * @example
           *
           *     var string = wordArray + '';
           *     var string = wordArray.toString();
           *     var string = wordArray.toString(CryptoJS.enc.Utf8);
           */
          toString: function(encoder) {
            return (encoder || Hex2).stringify(this);
          },
          /**
           * Concatenates a word array to this word array.
           *
           * @param {WordArray} wordArray The word array to append.
           *
           * @return {WordArray} This word array.
           *
           * @example
           *
           *     wordArray1.concat(wordArray2);
           */
          concat: function(wordArray) {
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;
            this.clamp();
            if (thisSigBytes % 4) {
              for (var i = 0; i < thatSigBytes; i++) {
                var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
              }
            } else {
              for (var j = 0; j < thatSigBytes; j += 4) {
                thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
              }
            }
            this.sigBytes += thatSigBytes;
            return this;
          },
          /**
           * Removes insignificant bits.
           *
           * @example
           *
           *     wordArray.clamp();
           */
          clamp: function() {
            var words = this.words;
            var sigBytes = this.sigBytes;
            words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
            words.length = Math2.ceil(sigBytes / 4);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {WordArray} The clone.
           *
           * @example
           *
           *     var clone = wordArray.clone();
           */
          clone: function() {
            var clone2 = Base.clone.call(this);
            clone2.words = this.words.slice(0);
            return clone2;
          },
          /**
           * Creates a word array filled with random bytes.
           *
           * @param {number} nBytes The number of random bytes to generate.
           *
           * @return {WordArray} The random word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.random(16);
           */
          random: function(nBytes) {
            var words = [];
            for (var i = 0; i < nBytes; i += 4) {
              words.push(cryptoSecureRandomInt());
            }
            return new WordArray.init(words, nBytes);
          }
        });
        var C_enc = C.enc = {};
        var Hex2 = C_enc.Hex = {
          /**
           * Converts a word array to a hex string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The hex string.
           *
           * @static
           *
           * @example
           *
           *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
           */
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var hexChars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              hexChars.push((bite >>> 4).toString(16));
              hexChars.push((bite & 15).toString(16));
            }
            return hexChars.join("");
          },
          /**
           * Converts a hex string to a word array.
           *
           * @param {string} hexStr The hex string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
           */
          parse: function(hexStr) {
            var hexStrLength = hexStr.length;
            var words = [];
            for (var i = 0; i < hexStrLength; i += 2) {
              words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
            }
            return new WordArray.init(words, hexStrLength / 2);
          }
        };
        var Latin1 = C_enc.Latin1 = {
          /**
           * Converts a word array to a Latin1 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Latin1 string.
           *
           * @static
           *
           * @example
           *
           *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
           */
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var latin1Chars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              latin1Chars.push(String.fromCharCode(bite));
            }
            return latin1Chars.join("");
          },
          /**
           * Converts a Latin1 string to a word array.
           *
           * @param {string} latin1Str The Latin1 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
           */
          parse: function(latin1Str) {
            var latin1StrLength = latin1Str.length;
            var words = [];
            for (var i = 0; i < latin1StrLength; i++) {
              words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
            }
            return new WordArray.init(words, latin1StrLength);
          }
        };
        var Utf8 = C_enc.Utf8 = {
          /**
           * Converts a word array to a UTF-8 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-8 string.
           *
           * @static
           *
           * @example
           *
           *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
           */
          stringify: function(wordArray) {
            try {
              return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
              throw new Error("Malformed UTF-8 data");
            }
          },
          /**
           * Converts a UTF-8 string to a word array.
           *
           * @param {string} utf8Str The UTF-8 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
           */
          parse: function(utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
          }
        };
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
          /**
           * Resets this block algorithm's data buffer to its initial state.
           *
           * @example
           *
           *     bufferedBlockAlgorithm.reset();
           */
          reset: function() {
            this._data = new WordArray.init();
            this._nDataBytes = 0;
          },
          /**
           * Adds new data to this block algorithm's buffer.
           *
           * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
           *
           * @example
           *
           *     bufferedBlockAlgorithm._append('data');
           *     bufferedBlockAlgorithm._append(wordArray);
           */
          _append: function(data2) {
            if (typeof data2 == "string") {
              data2 = Utf8.parse(data2);
            }
            this._data.concat(data2);
            this._nDataBytes += data2.sigBytes;
          },
          /**
           * Processes available data blocks.
           *
           * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
           *
           * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
           *
           * @return {WordArray} The processed data.
           *
           * @example
           *
           *     var processedData = bufferedBlockAlgorithm._process();
           *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
           */
          _process: function(doFlush) {
            var processedWords;
            var data2 = this._data;
            var dataWords = data2.words;
            var dataSigBytes = data2.sigBytes;
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
              for (var offset2 = 0; offset2 < nWordsReady; offset2 += blockSize) {
                this._doProcessBlock(dataWords, offset2);
              }
              processedWords = dataWords.splice(0, nWordsReady);
              data2.sigBytes -= nBytesReady;
            }
            return new WordArray.init(processedWords, nBytesReady);
          },
          /**
           * Creates a copy of this object.
           *
           * @return {Object} The clone.
           *
           * @example
           *
           *     var clone = bufferedBlockAlgorithm.clone();
           */
          clone: function() {
            var clone2 = Base.clone.call(this);
            clone2._data = this._data.clone();
            return clone2;
          },
          _minBufferSize: 0
        });
        C_lib.Hasher = BufferedBlockAlgorithm.extend({
          /**
           * Configuration options.
           */
          cfg: Base.extend(),
          /**
           * Initializes a newly created hasher.
           *
           * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
           *
           * @example
           *
           *     var hasher = CryptoJS.algo.SHA256.create();
           */
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
            this.reset();
          },
          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
          },
          /**
           * Updates this hasher with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {Hasher} This hasher.
           *
           * @example
           *
           *     hasher.update('message');
           *     hasher.update(wordArray);
           */
          update: function(messageUpdate) {
            this._append(messageUpdate);
            this._process();
            return this;
          },
          /**
           * Finalizes the hash computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The hash.
           *
           * @example
           *
           *     var hash = hasher.finalize();
           *     var hash = hasher.finalize('message');
           *     var hash = hasher.finalize(wordArray);
           */
          finalize: function(messageUpdate) {
            if (messageUpdate) {
              this._append(messageUpdate);
            }
            var hash2 = this._doFinalize();
            return hash2;
          },
          blockSize: 512 / 32,
          /**
           * Creates a shortcut function to a hasher's object interface.
           *
           * @param {Hasher} hasher The hasher to create a helper for.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
           */
          _createHelper: function(hasher) {
            return function(message, cfg) {
              return new hasher.init(cfg).finalize(message);
            };
          },
          /**
           * Creates a shortcut function to the HMAC's object interface.
           *
           * @param {Hasher} hasher The hasher to use in this HMAC helper.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
           */
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
  return core.exports;
}
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory(requireCore());
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
        for (var i = 0; i < 64; i++) {
          T[i] = Math2.abs(Math2.sin(i + 1)) * 4294967296 | 0;
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
        _doProcessBlock: function(M2, offset2) {
          for (var i = 0; i < 16; i++) {
            var offset_i = offset2 + i;
            var M_offset_i = M2[offset_i];
            M2[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
          }
          var H = this._hash.words;
          var M_offset_0 = M2[offset2 + 0];
          var M_offset_1 = M2[offset2 + 1];
          var M_offset_2 = M2[offset2 + 2];
          var M_offset_3 = M2[offset2 + 3];
          var M_offset_4 = M2[offset2 + 4];
          var M_offset_5 = M2[offset2 + 5];
          var M_offset_6 = M2[offset2 + 6];
          var M_offset_7 = M2[offset2 + 7];
          var M_offset_8 = M2[offset2 + 8];
          var M_offset_9 = M2[offset2 + 9];
          var M_offset_10 = M2[offset2 + 10];
          var M_offset_11 = M2[offset2 + 11];
          var M_offset_12 = M2[offset2 + 12];
          var M_offset_13 = M2[offset2 + 13];
          var M_offset_14 = M2[offset2 + 14];
          var M_offset_15 = M2[offset2 + 15];
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
          var data2 = this._data;
          var dataWords = data2.words;
          var nBitsTotal = this._nDataBytes * 8;
          var nBitsLeft = data2.sigBytes * 8;
          dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
          var nBitsTotalH = Math2.floor(nBitsTotal / 4294967296);
          var nBitsTotalL = nBitsTotal;
          dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
          dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
          data2.sigBytes = (dataWords.length + 1) * 4;
          this._process();
          var hash2 = this._hash;
          var H = hash2.words;
          for (var i = 0; i < 4; i++) {
            var H_i = H[i];
            H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
          }
          return hash2;
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
var md5Exports = md5$1.exports;
const md5 = /* @__PURE__ */ getDefaultExportFromCjs(md5Exports);
function __parse(value) {
  if (typeof value !== "string")
    return value;
  if (value === "true")
    return true;
  if (value === "false")
    return false;
  if (value === "null")
    return null;
  if (value === "undefined")
    return void 0;
  value = value.split("⠀").join("").trim();
  try {
    return Function(`
            "use strict";
            return (${value});
        `)();
  } catch (e) {
    return value;
  }
}
var ansiStyles$1 = { exports: {} };
var colorName;
var hasRequiredColorName;
function requireColorName() {
  if (hasRequiredColorName)
    return colorName;
  hasRequiredColorName = 1;
  colorName = {
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
  return colorName;
}
var conversions;
var hasRequiredConversions;
function requireConversions() {
  if (hasRequiredConversions)
    return conversions;
  hasRequiredConversions = 1;
  const cssKeywords = requireColorName();
  const reverseKeywords = {};
  for (const key of Object.keys(cssKeywords)) {
    reverseKeywords[cssKeywords[key]] = key;
  }
  const convert2 = {
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
  conversions = convert2;
  for (const model of Object.keys(convert2)) {
    if (!("channels" in convert2[model])) {
      throw new Error("missing channels property: " + model);
    }
    if (!("labels" in convert2[model])) {
      throw new Error("missing channel labels property: " + model);
    }
    if (convert2[model].labels.length !== convert2[model].channels) {
      throw new Error("channel and label counts mismatch: " + model);
    }
    const { channels, labels } = convert2[model];
    delete convert2[model].channels;
    delete convert2[model].labels;
    Object.defineProperty(convert2[model], "channels", { value: channels });
    Object.defineProperty(convert2[model], "labels", { value: labels });
  }
  convert2.rgb.hsl = function(rgb) {
    const r = rgb[0] / 255;
    const g2 = rgb[1] / 255;
    const b = rgb[2] / 255;
    const min2 = Math.min(r, g2, b);
    const max2 = Math.max(r, g2, b);
    const delta = max2 - min2;
    let h;
    let s;
    if (max2 === min2) {
      h = 0;
    } else if (r === max2) {
      h = (g2 - b) / delta;
    } else if (g2 === max2) {
      h = 2 + (b - r) / delta;
    } else if (b === max2) {
      h = 4 + (r - g2) / delta;
    }
    h = Math.min(h * 60, 360);
    if (h < 0) {
      h += 360;
    }
    const l = (min2 + max2) / 2;
    if (max2 === min2) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max2 + min2);
    } else {
      s = delta / (2 - max2 - min2);
    }
    return [h, s * 100, l * 100];
  };
  convert2.rgb.hsv = function(rgb) {
    let rdif;
    let gdif;
    let bdif;
    let h;
    let s;
    const r = rgb[0] / 255;
    const g2 = rgb[1] / 255;
    const b = rgb[2] / 255;
    const v = Math.max(r, g2, b);
    const diff = v - Math.min(r, g2, b);
    const diffc = function(c) {
      return (v - c) / 6 / diff + 1 / 2;
    };
    if (diff === 0) {
      h = 0;
      s = 0;
    } else {
      s = diff / v;
      rdif = diffc(r);
      gdif = diffc(g2);
      bdif = diffc(b);
      if (r === v) {
        h = bdif - gdif;
      } else if (g2 === v) {
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
  convert2.rgb.hwb = function(rgb) {
    const r = rgb[0];
    const g2 = rgb[1];
    let b = rgb[2];
    const h = convert2.rgb.hsl(rgb)[0];
    const w = 1 / 255 * Math.min(r, Math.min(g2, b));
    b = 1 - 1 / 255 * Math.max(r, Math.max(g2, b));
    return [h, w * 100, b * 100];
  };
  convert2.rgb.cmyk = function(rgb) {
    const r = rgb[0] / 255;
    const g2 = rgb[1] / 255;
    const b = rgb[2] / 255;
    const k = Math.min(1 - r, 1 - g2, 1 - b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g2 - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    return [c * 100, m * 100, y * 100, k * 100];
  };
  function comparativeDistance(x, y) {
    return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
  }
  convert2.rgb.keyword = function(rgb) {
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
  convert2.keyword.rgb = function(keyword) {
    return cssKeywords[keyword];
  };
  convert2.rgb.xyz = function(rgb) {
    let r = rgb[0] / 255;
    let g2 = rgb[1] / 255;
    let b = rgb[2] / 255;
    r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
    g2 = g2 > 0.04045 ? ((g2 + 0.055) / 1.055) ** 2.4 : g2 / 12.92;
    b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
    const x = r * 0.4124 + g2 * 0.3576 + b * 0.1805;
    const y = r * 0.2126 + g2 * 0.7152 + b * 0.0722;
    const z = r * 0.0193 + g2 * 0.1192 + b * 0.9505;
    return [x * 100, y * 100, z * 100];
  };
  convert2.rgb.lab = function(rgb) {
    const xyz = convert2.rgb.xyz(rgb);
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
  convert2.hsl.rgb = function(hsl) {
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
    for (let i = 0; i < 3; i++) {
      t3 = h + 1 / 3 * -(i - 1);
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
      rgb[i] = val * 255;
    }
    return rgb;
  };
  convert2.hsl.hsv = function(hsl) {
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
  convert2.hsv.rgb = function(hsv) {
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
  convert2.hsv.hsl = function(hsv) {
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
  convert2.hwb.rgb = function(hwb) {
    const h = hwb[0] / 360;
    let wh = hwb[1] / 100;
    let bl = hwb[2] / 100;
    const ratio = wh + bl;
    let f;
    if (ratio > 1) {
      wh /= ratio;
      bl /= ratio;
    }
    const i = Math.floor(6 * h);
    const v = 1 - bl;
    f = 6 * h - i;
    if ((i & 1) !== 0) {
      f = 1 - f;
    }
    const n = wh + f * (v - wh);
    let r;
    let g2;
    let b;
    switch (i) {
      default:
      case 6:
      case 0:
        r = v;
        g2 = n;
        b = wh;
        break;
      case 1:
        r = n;
        g2 = v;
        b = wh;
        break;
      case 2:
        r = wh;
        g2 = v;
        b = n;
        break;
      case 3:
        r = wh;
        g2 = n;
        b = v;
        break;
      case 4:
        r = n;
        g2 = wh;
        b = v;
        break;
      case 5:
        r = v;
        g2 = wh;
        b = n;
        break;
    }
    return [r * 255, g2 * 255, b * 255];
  };
  convert2.cmyk.rgb = function(cmyk) {
    const c = cmyk[0] / 100;
    const m = cmyk[1] / 100;
    const y = cmyk[2] / 100;
    const k = cmyk[3] / 100;
    const r = 1 - Math.min(1, c * (1 - k) + k);
    const g2 = 1 - Math.min(1, m * (1 - k) + k);
    const b = 1 - Math.min(1, y * (1 - k) + k);
    return [r * 255, g2 * 255, b * 255];
  };
  convert2.xyz.rgb = function(xyz) {
    const x = xyz[0] / 100;
    const y = xyz[1] / 100;
    const z = xyz[2] / 100;
    let r;
    let g2;
    let b;
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g2 = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;
    r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
    g2 = g2 > 31308e-7 ? 1.055 * g2 ** (1 / 2.4) - 0.055 : g2 * 12.92;
    b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
    r = Math.min(Math.max(0, r), 1);
    g2 = Math.min(Math.max(0, g2), 1);
    b = Math.min(Math.max(0, b), 1);
    return [r * 255, g2 * 255, b * 255];
  };
  convert2.xyz.lab = function(xyz) {
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
  convert2.lab.xyz = function(lab) {
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
  convert2.lab.lch = function(lab) {
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
  convert2.lch.lab = function(lch) {
    const l = lch[0];
    const c = lch[1];
    const h = lch[2];
    const hr = h / 360 * 2 * Math.PI;
    const a = c * Math.cos(hr);
    const b = c * Math.sin(hr);
    return [l, a, b];
  };
  convert2.rgb.ansi16 = function(args, saturation = null) {
    const [r, g2, b] = args;
    let value = saturation === null ? convert2.rgb.hsv(args)[2] : saturation;
    value = Math.round(value / 50);
    if (value === 0) {
      return 30;
    }
    let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g2 / 255) << 1 | Math.round(r / 255));
    if (value === 2) {
      ansi += 60;
    }
    return ansi;
  };
  convert2.hsv.ansi16 = function(args) {
    return convert2.rgb.ansi16(convert2.hsv.rgb(args), args[2]);
  };
  convert2.rgb.ansi256 = function(args) {
    const r = args[0];
    const g2 = args[1];
    const b = args[2];
    if (r === g2 && g2 === b) {
      if (r < 8) {
        return 16;
      }
      if (r > 248) {
        return 231;
      }
      return Math.round((r - 8) / 247 * 24) + 232;
    }
    const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g2 / 255 * 5) + Math.round(b / 255 * 5);
    return ansi;
  };
  convert2.ansi16.rgb = function(args) {
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
    const g2 = (color >> 1 & 1) * mult * 255;
    const b = (color >> 2 & 1) * mult * 255;
    return [r, g2, b];
  };
  convert2.ansi256.rgb = function(args) {
    if (args >= 232) {
      const c = (args - 232) * 10 + 8;
      return [c, c, c];
    }
    args -= 16;
    let rem;
    const r = Math.floor(args / 36) / 5 * 255;
    const g2 = Math.floor((rem = args % 36) / 6) / 5 * 255;
    const b = rem % 6 / 5 * 255;
    return [r, g2, b];
  };
  convert2.rgb.hex = function(args) {
    const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert2.hex.rgb = function(args) {
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
    const g2 = integer >> 8 & 255;
    const b = integer & 255;
    return [r, g2, b];
  };
  convert2.rgb.hcg = function(rgb) {
    const r = rgb[0] / 255;
    const g2 = rgb[1] / 255;
    const b = rgb[2] / 255;
    const max2 = Math.max(Math.max(r, g2), b);
    const min2 = Math.min(Math.min(r, g2), b);
    const chroma = max2 - min2;
    let grayscale;
    let hue;
    if (chroma < 1) {
      grayscale = min2 / (1 - chroma);
    } else {
      grayscale = 0;
    }
    if (chroma <= 0) {
      hue = 0;
    } else if (max2 === r) {
      hue = (g2 - b) / chroma % 6;
    } else if (max2 === g2) {
      hue = 2 + (b - r) / chroma;
    } else {
      hue = 4 + (r - g2) / chroma;
    }
    hue /= 6;
    hue %= 1;
    return [hue * 360, chroma * 100, grayscale * 100];
  };
  convert2.hsl.hcg = function(hsl) {
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
    let f = 0;
    if (c < 1) {
      f = (l - 0.5 * c) / (1 - c);
    }
    return [hsl[0], c * 100, f * 100];
  };
  convert2.hsv.hcg = function(hsv) {
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const c = s * v;
    let f = 0;
    if (c < 1) {
      f = (v - c) / (1 - c);
    }
    return [hsv[0], c * 100, f * 100];
  };
  convert2.hcg.rgb = function(hcg) {
    const h = hcg[0] / 360;
    const c = hcg[1] / 100;
    const g2 = hcg[2] / 100;
    if (c === 0) {
      return [g2 * 255, g2 * 255, g2 * 255];
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
    mg = (1 - c) * g2;
    return [
      (c * pure[0] + mg) * 255,
      (c * pure[1] + mg) * 255,
      (c * pure[2] + mg) * 255
    ];
  };
  convert2.hcg.hsv = function(hcg) {
    const c = hcg[1] / 100;
    const g2 = hcg[2] / 100;
    const v = c + g2 * (1 - c);
    let f = 0;
    if (v > 0) {
      f = c / v;
    }
    return [hcg[0], f * 100, v * 100];
  };
  convert2.hcg.hsl = function(hcg) {
    const c = hcg[1] / 100;
    const g2 = hcg[2] / 100;
    const l = g2 * (1 - c) + 0.5 * c;
    let s = 0;
    if (l > 0 && l < 0.5) {
      s = c / (2 * l);
    } else if (l >= 0.5 && l < 1) {
      s = c / (2 * (1 - l));
    }
    return [hcg[0], s * 100, l * 100];
  };
  convert2.hcg.hwb = function(hcg) {
    const c = hcg[1] / 100;
    const g2 = hcg[2] / 100;
    const v = c + g2 * (1 - c);
    return [hcg[0], (v - c) * 100, (1 - v) * 100];
  };
  convert2.hwb.hcg = function(hwb) {
    const w = hwb[1] / 100;
    const b = hwb[2] / 100;
    const v = 1 - b;
    const c = v - w;
    let g2 = 0;
    if (c < 1) {
      g2 = (v - c) / (1 - c);
    }
    return [hwb[0], c * 100, g2 * 100];
  };
  convert2.apple.rgb = function(apple) {
    return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
  };
  convert2.rgb.apple = function(rgb) {
    return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
  };
  convert2.gray.rgb = function(args) {
    return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
  };
  convert2.gray.hsl = function(args) {
    return [0, 0, args[0]];
  };
  convert2.gray.hsv = convert2.gray.hsl;
  convert2.gray.hwb = function(gray) {
    return [0, 100, gray[0]];
  };
  convert2.gray.cmyk = function(gray) {
    return [0, 0, 0, gray[0]];
  };
  convert2.gray.lab = function(gray) {
    return [gray[0], 0, 0];
  };
  convert2.gray.hex = function(gray) {
    const val = Math.round(gray[0] / 100 * 255) & 255;
    const integer = (val << 16) + (val << 8) + val;
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
  };
  convert2.rgb.gray = function(rgb) {
    const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
    return [val / 255 * 100];
  };
  return conversions;
}
var route;
var hasRequiredRoute;
function requireRoute() {
  if (hasRequiredRoute)
    return route;
  hasRequiredRoute = 1;
  const conversions2 = requireConversions();
  function buildGraph() {
    const graph = {};
    const models = Object.keys(conversions2);
    for (let len = models.length, i = 0; i < len; i++) {
      graph[models[i]] = {
        // http://jsperf.com/1-vs-infinity
        // micro-opt, but this is simple.
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
      const adjacents = Object.keys(conversions2[current]);
      for (let len = adjacents.length, i = 0; i < len; i++) {
        const adjacent = adjacents[i];
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
  function link(from2, to) {
    return function(args) {
      return to(from2(args));
    };
  }
  function wrapConversion(toModel, graph) {
    const path2 = [graph[toModel].parent, toModel];
    let fn2 = conversions2[graph[toModel].parent][toModel];
    let cur = graph[toModel].parent;
    while (graph[cur].parent) {
      path2.unshift(graph[cur].parent);
      fn2 = link(conversions2[graph[cur].parent][cur], fn2);
      cur = graph[cur].parent;
    }
    fn2.conversion = path2;
    return fn2;
  }
  route = function(fromModel) {
    const graph = deriveBFS(fromModel);
    const conversion = {};
    const models = Object.keys(graph);
    for (let len = models.length, i = 0; i < len; i++) {
      const toModel = models[i];
      const node = graph[toModel];
      if (node.parent === null) {
        continue;
      }
      conversion[toModel] = wrapConversion(toModel, graph);
    }
    return conversion;
  };
  return route;
}
var colorConvert;
var hasRequiredColorConvert;
function requireColorConvert() {
  if (hasRequiredColorConvert)
    return colorConvert;
  hasRequiredColorConvert = 1;
  const conversions2 = requireConversions();
  const route2 = requireRoute();
  const convert2 = {};
  const models = Object.keys(conversions2);
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
      const result2 = fn2(args);
      if (typeof result2 === "object") {
        for (let len = result2.length, i = 0; i < len; i++) {
          result2[i] = Math.round(result2[i]);
        }
      }
      return result2;
    };
    if ("conversion" in fn2) {
      wrappedFn.conversion = fn2.conversion;
    }
    return wrappedFn;
  }
  models.forEach((fromModel) => {
    convert2[fromModel] = {};
    Object.defineProperty(convert2[fromModel], "channels", { value: conversions2[fromModel].channels });
    Object.defineProperty(convert2[fromModel], "labels", { value: conversions2[fromModel].labels });
    const routes = route2(fromModel);
    const routeModels = Object.keys(routes);
    routeModels.forEach((toModel) => {
      const fn2 = routes[toModel];
      convert2[fromModel][toModel] = wrapRounded(fn2);
      convert2[fromModel][toModel].raw = wrapRaw(fn2);
    });
  });
  colorConvert = convert2;
  return colorConvert;
}
ansiStyles$1.exports;
(function(module) {
  const wrapAnsi16 = (fn2, offset2) => (...args) => {
    const code = fn2(...args);
    return `\x1B[${code + offset2}m`;
  };
  const wrapAnsi256 = (fn2, offset2) => (...args) => {
    const code = fn2(...args);
    return `\x1B[${38 + offset2};5;${code}m`;
  };
  const wrapAnsi16m = (fn2, offset2) => (...args) => {
    const rgb = fn2(...args);
    return `\x1B[${38 + offset2};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
  };
  const ansi2ansi = (n) => n;
  const rgb2rgb = (r, g2, b) => [r, g2, b];
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
  let colorConvert2;
  const makeDynamicStyles = (wrap2, targetSpace, identity, isBackground) => {
    if (colorConvert2 === void 0) {
      colorConvert2 = requireColorConvert();
    }
    const offset2 = isBackground ? 10 : 0;
    const styles2 = {};
    for (const [sourceSpace, suite] of Object.entries(colorConvert2)) {
      const name2 = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
      if (sourceSpace === targetSpace) {
        styles2[name2] = wrap2(identity, offset2);
      } else if (typeof suite === "object") {
        styles2[name2] = wrap2(suite[targetSpace], offset2);
      }
    }
    return styles2;
  };
  function assembleStyles() {
    const codes = /* @__PURE__ */ new Map();
    const styles2 = {
      modifier: {
        reset: [0, 0],
        // 21 isn't widely supported and 22 does the same thing
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
        // Bright color
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
        // Bright color
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
          open: `\x1B[${style[0]}m`,
          close: `\x1B[${style[1]}m`
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
    styles2.color.close = "\x1B[39m";
    styles2.bgColor.close = "\x1B[49m";
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
var ansiStylesExports = ansiStyles$1.exports;
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
var util$2 = {
  stringReplaceAll: stringReplaceAll$1,
  stringEncaseCRLFWithFirstIndex: stringEncaseCRLFWithFirstIndex$1
};
var templates;
var hasRequiredTemplates;
function requireTemplates() {
  if (hasRequiredTemplates)
    return templates;
  hasRequiredTemplates = 1;
  const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
  const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
  const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
  const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
  const ESCAPES = /* @__PURE__ */ new Map([
    ["n", "\n"],
    ["r", "\r"],
    ["t", "	"],
    ["b", "\b"],
    ["f", "\f"],
    ["v", "\v"],
    ["0", "\0"],
    ["\\", "\\"],
    ["e", "\x1B"],
    ["a", "\x07"]
  ]);
  function unescape2(c) {
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
  function parseArguments(name2, arguments_) {
    const results = [];
    const chunks = arguments_.trim().split(/\s*,\s*/g);
    let matches;
    for (const chunk of chunks) {
      const number = Number(chunk);
      if (!Number.isNaN(number)) {
        results.push(number);
      } else if (matches = chunk.match(STRING_REGEX)) {
        results.push(matches[2].replace(ESCAPE_REGEX, (m, escape2, character) => escape2 ? unescape2(escape2) : character));
      } else {
        throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name2}')`);
      }
    }
    return results;
  }
  function parseStyle(style) {
    STYLE_REGEX.lastIndex = 0;
    const results = [];
    let matches;
    while ((matches = STYLE_REGEX.exec(style)) !== null) {
      const name2 = matches[1];
      if (matches[2]) {
        const args = parseArguments(name2, matches[2]);
        results.push([name2].concat(args));
      } else {
        results.push([name2]);
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
  templates = (chalk2, temporary) => {
    const styles2 = [];
    const chunks = [];
    let chunk = [];
    temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
      if (escapeCharacter) {
        chunk.push(unescape2(escapeCharacter));
      } else if (style) {
        const string = chunk.join("");
        chunk = [];
        chunks.push(styles2.length === 0 ? string : buildStyle(chalk2, styles2)(string));
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
  return templates;
}
const ansiStyles = ansiStylesExports;
const { stdout: stdoutColor, stderr: stderrColor } = browser;
const {
  stringReplaceAll,
  stringEncaseCRLFWithFirstIndex
} = util$2;
const { isArray: isArray$2 } = Array;
const levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
const styles = /* @__PURE__ */ Object.create(null);
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
}, {
  ...styles,
  level: {
    enumerable: true,
    get() {
      return this._generator.level;
    },
    set(level) {
      this._generator.level = level;
    }
  }
});
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
    if (isArray$2(arguments_[0]) && isArray$2(arguments_[0].raw)) {
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
  const { openAll, closeAll } = styler;
  if (string.indexOf("\x1B") !== -1) {
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
  if (!isArray$2(firstString) || !isArray$2(firstString.raw)) {
    return strings.join(" ");
  }
  const arguments_ = strings.slice(1);
  const parts = [firstString.raw[0]];
  for (let i = 1; i < firstString.length; i++) {
    parts.push(
      String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"),
      String(firstString.raw[i])
    );
  }
  if (template === void 0) {
    template = requireTemplates();
  }
  return template(chalk2, parts.join(""));
};
Object.defineProperties(Chalk.prototype, styles);
const chalk = Chalk();
chalk.supportsColor = stdoutColor;
chalk.stderr = Chalk({ level: stderrColor ? stderrColor.level : 0 });
chalk.stderr.supportsColor = stderrColor;
var source = chalk;
const __chalk = /* @__PURE__ */ getDefaultExportFromCjs(source);
function __mapToObject(map2) {
  const obj = {};
  for (const [k, v] of map2)
    obj[k] = v;
  return obj;
}
function __isArray(value) {
  return Array.isArray(value);
}
function __isBoolean(value) {
  return typeof value === "boolean";
}
function __isFunction(value) {
  return value && {}.toString.call(value) === "[object Function]";
}
function __isJson(value) {
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
function __isMap(value) {
  return value instanceof Map;
}
function __isObject(value) {
  return value && typeof value === "object" && value.constructor === Object;
}
function fn$3(value, settings = {}) {
  settings = __deepMerge({
    beautify: true,
    highlight: true,
    verbose: true,
    theme: {
      number: __chalk.yellow,
      default: __chalk.white,
      keyword: __chalk.blue,
      regexp: __chalk.red,
      string: __chalk.whiteBright,
      class: __chalk.yellow,
      function: __chalk.yellow,
      comment: __chalk.gray,
      variable: __chalk.red,
      attr: __chalk.green
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
  if (__isMap(value)) {
    value = __mapToObject(value);
  }
  if (__isObject(value) || __isArray(value) || __isJson(value)) {
    try {
      value = decycle_1(value);
    } catch (e) {
    }
    value = __deepMap(value, ({ value: value2 }) => {
      if (value2 instanceof Map)
        return __mapToObject(value2);
      return value2;
    });
    let prettyString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
    prettyString = prettyString.replace(/"([^"]+)":/g, "$1:").replace(/\uFFFF/g, '\\"');
    if (settings.highlight)
      ;
    return prettyString;
  }
  if (__isBoolean(value)) {
    if (value)
      return "true";
    else
      return "false";
  }
  if (__isFunction(value)) {
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
const __encryptedMessages = {};
const __md5 = {
  /**
   * @name        encrypt
   * @type          Function
   *
   * Encrypt
   *
   * @param       {String}      message         The message to encrypt
   * @return      {String}                      The encrypted string
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  encrypt: function(message) {
    if (typeof message !== "string")
      message = fn$3(message);
    const string = md5(message).toString();
    __encryptedMessages[string] = message;
    return string;
  },
  /**
   * @name        decrypt
   * @type        Function
   *
   * Decrypt
   *
   * @param       {String}        message         The message to decrypt
   * @return      {String}                        The decrypted message
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  decrypt: function(message) {
    if (!__encryptedMessages[message]) {
      console.warn(`The message "${message}" cannot be decrypted...`);
      return;
    }
    const string = __encryptedMessages[message];
    delete __encryptedMessages[message];
    return __parse(string);
  }
};
function __ltrim(string, needle, trimResult = true) {
  if (string.substr(0, needle.length) === needle) {
    return trimResult ? string.substr(needle.length).trim() : string.substr(needle.length);
  }
  return string;
}
function __queryStringToObject(str2) {
  str2 = __ltrim(str2, "?");
  str2 = str2.replace(/%20/gm, " ");
  str2 = decodeURIComponent(str2);
  let chunks = str2.split("&");
  const obj = {};
  chunks = chunks.filter((ch) => {
    return ch !== "";
  });
  for (let c = 0; c < chunks.length; c++) {
    const split = chunks[c].split("=", 2);
    if (split[1] !== void 0) {
      obj[split[0]] = split[1];
    } else {
      obj[split[0]] = true;
    }
  }
  return obj;
}
new Proxy({}, {
  get(_, key) {
    throw new Error(`Module "url" has been externalized for browser compatibility. Cannot access "url.${key}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
  }
});
function __uniqid() {
  const url = URL.createObjectURL(new Blob());
  return `s-${url.substring(url.lastIndexOf("/") + 1)}`;
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function lowerCase(str2) {
  return str2.toLowerCase();
}
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
function noCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  var _a2 = options.splitRegexp, splitRegexp = _a2 === void 0 ? DEFAULT_SPLIT_REGEXP : _a2, _b2 = options.stripRegexp, stripRegexp = _b2 === void 0 ? DEFAULT_STRIP_REGEXP : _b2, _c2 = options.transform, transform = _c2 === void 0 ? lowerCase : _c2, _d2 = options.delimiter, delimiter = _d2 === void 0 ? " " : _d2;
  var result2 = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
  var start = 0;
  var end = result2.length;
  while (result2.charAt(start) === "\0")
    start++;
  while (result2.charAt(end - 1) === "\0")
    end--;
  return result2.slice(start, end).split("\0").map(transform).join(delimiter);
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
function __dashCase(text) {
  return paramCase(text);
}
var toRegex$1 = { exports: {} };
var lib = { exports: {} };
var util$1 = {};
var types$4 = {
  ROOT: 0,
  GROUP: 1,
  POSITION: 2,
  SET: 3,
  RANGE: 4,
  REPETITION: 5,
  REFERENCE: 6,
  CHAR: 7
};
var sets$1 = {};
var types$3 = types$4;
var INTS = function() {
  return [{ type: types$3.RANGE, from: 48, to: 57 }];
};
var WORDS = function() {
  return [
    { type: types$3.CHAR, value: 95 },
    { type: types$3.RANGE, from: 97, to: 122 },
    { type: types$3.RANGE, from: 65, to: 90 }
  ].concat(INTS());
};
var WHITESPACE = function() {
  return [
    { type: types$3.CHAR, value: 9 },
    { type: types$3.CHAR, value: 10 },
    { type: types$3.CHAR, value: 11 },
    { type: types$3.CHAR, value: 12 },
    { type: types$3.CHAR, value: 13 },
    { type: types$3.CHAR, value: 32 },
    { type: types$3.CHAR, value: 160 },
    { type: types$3.CHAR, value: 5760 },
    { type: types$3.CHAR, value: 6158 },
    { type: types$3.CHAR, value: 8192 },
    { type: types$3.CHAR, value: 8193 },
    { type: types$3.CHAR, value: 8194 },
    { type: types$3.CHAR, value: 8195 },
    { type: types$3.CHAR, value: 8196 },
    { type: types$3.CHAR, value: 8197 },
    { type: types$3.CHAR, value: 8198 },
    { type: types$3.CHAR, value: 8199 },
    { type: types$3.CHAR, value: 8200 },
    { type: types$3.CHAR, value: 8201 },
    { type: types$3.CHAR, value: 8202 },
    { type: types$3.CHAR, value: 8232 },
    { type: types$3.CHAR, value: 8233 },
    { type: types$3.CHAR, value: 8239 },
    { type: types$3.CHAR, value: 8287 },
    { type: types$3.CHAR, value: 12288 },
    { type: types$3.CHAR, value: 65279 }
  ];
};
var NOTANYCHAR = function() {
  return [
    { type: types$3.CHAR, value: 10 },
    { type: types$3.CHAR, value: 13 },
    { type: types$3.CHAR, value: 8232 },
    { type: types$3.CHAR, value: 8233 }
  ];
};
sets$1.words = function() {
  return { type: types$3.SET, set: WORDS(), not: false };
};
sets$1.notWords = function() {
  return { type: types$3.SET, set: WORDS(), not: true };
};
sets$1.ints = function() {
  return { type: types$3.SET, set: INTS(), not: false };
};
sets$1.notInts = function() {
  return { type: types$3.SET, set: INTS(), not: true };
};
sets$1.whitespace = function() {
  return { type: types$3.SET, set: WHITESPACE(), not: false };
};
sets$1.notWhitespace = function() {
  return { type: types$3.SET, set: WHITESPACE(), not: true };
};
sets$1.anyChar = function() {
  return { type: types$3.SET, set: NOTANYCHAR(), not: true };
};
(function(exports) {
  var types2 = types$4;
  var sets2 = sets$1;
  var CTRL = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?";
  var SLSH = { "0": 0, "t": 9, "n": 10, "v": 11, "f": 12, "r": 13 };
  exports.strToChars = function(str2) {
    var chars_regex = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z\[\\\]\^?])|([0tnvfr]))/g;
    str2 = str2.replace(chars_regex, function(s, b, lbs, a16, b16, c8, dctrl, eslsh) {
      if (lbs) {
        return s;
      }
      var code = b ? 8 : a16 ? parseInt(a16, 16) : b16 ? parseInt(b16, 16) : c8 ? parseInt(c8, 8) : dctrl ? CTRL.indexOf(dctrl) : SLSH[eslsh];
      var c = String.fromCharCode(code);
      if (/[\[\]{}\^$.|?*+()]/.test(c)) {
        c = "\\" + c;
      }
      return c;
    });
    return str2;
  };
  exports.tokenizeClass = function(str2, regexpStr) {
    var tokens = [];
    var regexp = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?(.)/g;
    var rs, c;
    while ((rs = regexp.exec(str2)) != null) {
      if (rs[1]) {
        tokens.push(sets2.words());
      } else if (rs[2]) {
        tokens.push(sets2.ints());
      } else if (rs[3]) {
        tokens.push(sets2.whitespace());
      } else if (rs[4]) {
        tokens.push(sets2.notWords());
      } else if (rs[5]) {
        tokens.push(sets2.notInts());
      } else if (rs[6]) {
        tokens.push(sets2.notWhitespace());
      } else if (rs[7]) {
        tokens.push({
          type: types2.RANGE,
          from: (rs[8] || rs[9]).charCodeAt(0),
          to: rs[10].charCodeAt(0)
        });
      } else if (c = rs[12]) {
        tokens.push({
          type: types2.CHAR,
          value: c.charCodeAt(0)
        });
      } else {
        return [tokens, regexp.lastIndex];
      }
    }
    exports.error(regexpStr, "Unterminated character class");
  };
  exports.error = function(regexp, msg) {
    throw new SyntaxError("Invalid regular expression: /" + regexp + "/: " + msg);
  };
})(util$1);
var positions$1 = {};
var types$2 = types$4;
positions$1.wordBoundary = function() {
  return { type: types$2.POSITION, value: "b" };
};
positions$1.nonWordBoundary = function() {
  return { type: types$2.POSITION, value: "B" };
};
positions$1.begin = function() {
  return { type: types$2.POSITION, value: "^" };
};
positions$1.end = function() {
  return { type: types$2.POSITION, value: "$" };
};
var util = util$1;
var types$1 = types$4;
var sets = sets$1;
var positions = positions$1;
lib.exports = function(regexpStr) {
  var i = 0, l, c, start = { type: types$1.ROOT, stack: [] }, lastGroup = start, last = start.stack, groupStack = [];
  var repeatErr = function(i2) {
    util.error(regexpStr, "Nothing to repeat at column " + (i2 - 1));
  };
  var str2 = util.strToChars(regexpStr);
  l = str2.length;
  while (i < l) {
    c = str2[i++];
    switch (c) {
      case "\\":
        c = str2[i++];
        switch (c) {
          case "b":
            last.push(positions.wordBoundary());
            break;
          case "B":
            last.push(positions.nonWordBoundary());
            break;
          case "w":
            last.push(sets.words());
            break;
          case "W":
            last.push(sets.notWords());
            break;
          case "d":
            last.push(sets.ints());
            break;
          case "D":
            last.push(sets.notInts());
            break;
          case "s":
            last.push(sets.whitespace());
            break;
          case "S":
            last.push(sets.notWhitespace());
            break;
          default:
            if (/\d/.test(c)) {
              last.push({ type: types$1.REFERENCE, value: parseInt(c, 10) });
            } else {
              last.push({ type: types$1.CHAR, value: c.charCodeAt(0) });
            }
        }
        break;
      case "^":
        last.push(positions.begin());
        break;
      case "$":
        last.push(positions.end());
        break;
      case "[":
        var not2;
        if (str2[i] === "^") {
          not2 = true;
          i++;
        } else {
          not2 = false;
        }
        var classTokens = util.tokenizeClass(str2.slice(i), regexpStr);
        i += classTokens[1];
        last.push({
          type: types$1.SET,
          set: classTokens[0],
          not: not2
        });
        break;
      case ".":
        last.push(sets.anyChar());
        break;
      case "(":
        var group = {
          type: types$1.GROUP,
          stack: [],
          remember: true
        };
        c = str2[i];
        if (c === "?") {
          c = str2[i + 1];
          i += 2;
          if (c === "=") {
            group.followedBy = true;
          } else if (c === "!") {
            group.notFollowedBy = true;
          } else if (c !== ":") {
            util.error(
              regexpStr,
              "Invalid group, character '" + c + "' after '?' at column " + (i - 1)
            );
          }
          group.remember = false;
        }
        last.push(group);
        groupStack.push(lastGroup);
        lastGroup = group;
        last = group.stack;
        break;
      case ")":
        if (groupStack.length === 0) {
          util.error(regexpStr, "Unmatched ) at column " + (i - 1));
        }
        lastGroup = groupStack.pop();
        last = lastGroup.options ? lastGroup.options[lastGroup.options.length - 1] : lastGroup.stack;
        break;
      case "|":
        if (!lastGroup.options) {
          lastGroup.options = [lastGroup.stack];
          delete lastGroup.stack;
        }
        var stack = [];
        lastGroup.options.push(stack);
        last = stack;
        break;
      case "{":
        var rs = /^(\d+)(,(\d+)?)?\}/.exec(str2.slice(i)), min2, max2;
        if (rs !== null) {
          if (last.length === 0) {
            repeatErr(i);
          }
          min2 = parseInt(rs[1], 10);
          max2 = rs[2] ? rs[3] ? parseInt(rs[3], 10) : Infinity : min2;
          i += rs[0].length;
          last.push({
            type: types$1.REPETITION,
            min: min2,
            max: max2,
            value: last.pop()
          });
        } else {
          last.push({
            type: types$1.CHAR,
            value: 123
          });
        }
        break;
      case "?":
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types$1.REPETITION,
          min: 0,
          max: 1,
          value: last.pop()
        });
        break;
      case "+":
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types$1.REPETITION,
          min: 1,
          max: Infinity,
          value: last.pop()
        });
        break;
      case "*":
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types$1.REPETITION,
          min: 0,
          max: Infinity,
          value: last.pop()
        });
        break;
      default:
        last.push({
          type: types$1.CHAR,
          value: c.charCodeAt(0)
        });
    }
  }
  if (groupStack.length !== 0) {
    util.error(regexpStr, "Unterminated group");
  }
  return start;
};
lib.exports.types = types$1;
var libExports = lib.exports;
var parse = libExports;
var types = parse.types;
var safeRegex = function(re, opts) {
  if (!opts)
    opts = {};
  var replimit = opts.limit === void 0 ? 25 : opts.limit;
  if (isRegExp(re))
    re = re.source;
  else if (typeof re !== "string")
    re = String(re);
  try {
    re = parse(re);
  } catch (err) {
    return false;
  }
  var reps = 0;
  return function walk(node, starHeight) {
    if (node.type === types.REPETITION) {
      starHeight++;
      reps++;
      if (starHeight > 1)
        return false;
      if (reps > replimit)
        return false;
    }
    if (node.options) {
      for (var i = 0, len = node.options.length; i < len; i++) {
        var ok = walk({ stack: node.options[i] }, starHeight);
        if (!ok)
          return false;
      }
    }
    var stack = node.stack || node.value && node.value.stack;
    if (!stack)
      return true;
    for (var i = 0; i < stack.length; i++) {
      var ok = walk(stack[i], starHeight);
      if (!ok)
        return false;
    }
    return true;
  }(re, 0);
};
function isRegExp(x) {
  return {}.toString.call(x) === "[object RegExp]";
}
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var isobject$1 = function isObject(val) {
  return val != null && typeof val === "object" && Array.isArray(val) === false;
};
var toString = Object.prototype.toString;
var kindOf = function kindOf2(val) {
  if (val === void 0)
    return "undefined";
  if (val === null)
    return "null";
  var type = typeof val;
  if (type === "boolean")
    return "boolean";
  if (type === "string")
    return "string";
  if (type === "number")
    return "number";
  if (type === "symbol")
    return "symbol";
  if (type === "function") {
    return isGeneratorFn(val) ? "generatorfunction" : "function";
  }
  if (isArray$1(val))
    return "array";
  if (isBuffer(val))
    return "buffer";
  if (isArguments$1(val))
    return "arguments";
  if (isDate(val))
    return "date";
  if (isError(val))
    return "error";
  if (isRegexp(val))
    return "regexp";
  switch (ctorName(val)) {
    case "Symbol":
      return "symbol";
    case "Promise":
      return "promise";
    case "WeakMap":
      return "weakmap";
    case "WeakSet":
      return "weakset";
    case "Map":
      return "map";
    case "Set":
      return "set";
    case "Int8Array":
      return "int8array";
    case "Uint8Array":
      return "uint8array";
    case "Uint8ClampedArray":
      return "uint8clampedarray";
    case "Int16Array":
      return "int16array";
    case "Uint16Array":
      return "uint16array";
    case "Int32Array":
      return "int32array";
    case "Uint32Array":
      return "uint32array";
    case "Float32Array":
      return "float32array";
    case "Float64Array":
      return "float64array";
  }
  if (isGeneratorObj(val)) {
    return "generator";
  }
  type = toString.call(val);
  switch (type) {
    case "[object Object]":
      return "object";
    case "[object Map Iterator]":
      return "mapiterator";
    case "[object Set Iterator]":
      return "setiterator";
    case "[object String Iterator]":
      return "stringiterator";
    case "[object Array Iterator]":
      return "arrayiterator";
  }
  return type.slice(8, -1).toLowerCase().replace(/\s/g, "");
};
function ctorName(val) {
  return typeof val.constructor === "function" ? val.constructor.name : null;
}
function isArray$1(val) {
  if (Array.isArray)
    return Array.isArray(val);
  return val instanceof Array;
}
function isError(val) {
  return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
}
function isDate(val) {
  if (val instanceof Date)
    return true;
  return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
}
function isRegexp(val) {
  if (val instanceof RegExp)
    return true;
  return typeof val.flags === "string" && typeof val.ignoreCase === "boolean" && typeof val.multiline === "boolean" && typeof val.global === "boolean";
}
function isGeneratorFn(name2, val) {
  return ctorName(name2) === "GeneratorFunction";
}
function isGeneratorObj(val) {
  return typeof val.throw === "function" && typeof val.return === "function" && typeof val.next === "function";
}
function isArguments$1(val) {
  try {
    if (typeof val.length === "number" && typeof val.callee === "function") {
      return true;
    }
  } catch (err) {
    if (err.message.indexOf("callee") !== -1) {
      return true;
    }
  }
  return false;
}
function isBuffer(val) {
  if (val.constructor && typeof val.constructor.isBuffer === "function") {
    return val.constructor.isBuffer(val);
  }
  return false;
}
/*!
 * is-accessor-descriptor <https://github.com/jonschlinkert/is-accessor-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var typeOf$2 = kindOf;
var accessor = {
  get: "function",
  set: "function",
  configurable: "boolean",
  enumerable: "boolean"
};
function isAccessorDescriptor(obj, prop) {
  if (typeof prop === "string") {
    var val = Object.getOwnPropertyDescriptor(obj, prop);
    return typeof val !== "undefined";
  }
  if (typeOf$2(obj) !== "object") {
    return false;
  }
  if (has(obj, "value") || has(obj, "writable")) {
    return false;
  }
  if (!has(obj, "get") || typeof obj.get !== "function") {
    return false;
  }
  if (has(obj, "set") && typeof obj[key] !== "function" && typeof obj[key] !== "undefined") {
    return false;
  }
  for (var key in obj) {
    if (!accessor.hasOwnProperty(key)) {
      continue;
    }
    if (typeOf$2(obj[key]) === accessor[key]) {
      continue;
    }
    if (typeof obj[key] !== "undefined") {
      return false;
    }
  }
  return true;
}
function has(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}
var isAccessorDescriptor_1 = isAccessorDescriptor;
/*!
 * is-data-descriptor <https://github.com/jonschlinkert/is-data-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var typeOf$1 = kindOf;
var isDataDescriptor = function isDataDescriptor2(obj, prop) {
  var data2 = {
    configurable: "boolean",
    enumerable: "boolean",
    writable: "boolean"
  };
  if (typeOf$1(obj) !== "object") {
    return false;
  }
  if (typeof prop === "string") {
    var val = Object.getOwnPropertyDescriptor(obj, prop);
    return typeof val !== "undefined";
  }
  if (!("value" in obj) && !("writable" in obj)) {
    return false;
  }
  for (var key in obj) {
    if (key === "value")
      continue;
    if (!data2.hasOwnProperty(key)) {
      continue;
    }
    if (typeOf$1(obj[key]) === data2[key]) {
      continue;
    }
    if (typeof obj[key] !== "undefined") {
      return false;
    }
  }
  return true;
};
/*!
 * is-descriptor <https://github.com/jonschlinkert/is-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var typeOf = kindOf;
var isAccessor = isAccessorDescriptor_1;
var isData = isDataDescriptor;
var isDescriptor$1 = function isDescriptor(obj, key) {
  if (typeOf(obj) !== "object") {
    return false;
  }
  if ("get" in obj) {
    return isAccessor(obj, key);
  }
  return isData(obj, key);
};
/*!
 * define-property <https://github.com/jonschlinkert/define-property>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Released under the MIT License.
 */
var isobject = isobject$1;
var isDescriptor2 = isDescriptor$1;
var define$f = typeof Reflect !== "undefined" && Reflect.defineProperty ? Reflect.defineProperty : Object.defineProperty;
var defineProperty = function defineProperty2(obj, key, val) {
  if (!isobject(obj) && typeof obj !== "function" && !Array.isArray(obj)) {
    throw new TypeError("expected an object, function, or array");
  }
  if (typeof key !== "string") {
    throw new TypeError('expected "key" to be a string');
  }
  if (isDescriptor2(val)) {
    define$f(obj, key, val);
    return obj;
  }
  define$f(obj, key, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  });
  return obj;
};
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var isObject$3 = isobject$1;
function isObjectObject(o) {
  return isObject$3(o) === true && Object.prototype.toString.call(o) === "[object Object]";
}
var isPlainObject$1 = function isPlainObject(o) {
  var ctor, prot;
  if (isObjectObject(o) === false)
    return false;
  ctor = o.constructor;
  if (typeof ctor !== "function")
    return false;
  prot = ctor.prototype;
  if (isObjectObject(prot) === false)
    return false;
  if (prot.hasOwnProperty("isPrototypeOf") === false) {
    return false;
  }
  return true;
};
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var isPlainObject2 = isPlainObject$1;
var isExtendable$1 = function isExtendable(val) {
  return isPlainObject2(val) || typeof val === "function" || Array.isArray(val);
};
/*!
 * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var assignSymbols$1 = function(receiver, objects) {
  if (receiver === null || typeof receiver === "undefined") {
    throw new TypeError("expected first argument to be an object.");
  }
  if (typeof objects === "undefined" || typeof Symbol === "undefined") {
    return receiver;
  }
  if (typeof Object.getOwnPropertySymbols !== "function") {
    return receiver;
  }
  var isEnumerable = Object.prototype.propertyIsEnumerable;
  var target = Object(receiver);
  var len = arguments.length, i = 0;
  while (++i < len) {
    var provider = Object(arguments[i]);
    var names = Object.getOwnPropertySymbols(provider);
    for (var j = 0; j < names.length; j++) {
      var key = names[j];
      if (isEnumerable.call(provider, key)) {
        target[key] = provider[key];
      }
    }
  }
  return target;
};
var isExtendable2 = isExtendable$1;
var assignSymbols = assignSymbols$1;
var extendShallow = Object.assign || function(obj) {
  if (obj === null || typeof obj === "undefined") {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  if (!isObject$2(obj)) {
    obj = {};
  }
  for (var i = 1; i < arguments.length; i++) {
    var val = arguments[i];
    if (isString$1(val)) {
      val = toObject(val);
    }
    if (isObject$2(val)) {
      assign$2(obj, val);
      assignSymbols(obj, val);
    }
  }
  return obj;
};
function assign$2(a, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a[key] = b[key];
    }
  }
}
function isString$1(val) {
  return val && typeof val === "string";
}
function toObject(str2) {
  var obj = {};
  for (var i in str2) {
    obj[i] = str2[i];
  }
  return obj;
}
function isObject$2(val) {
  return val && typeof val === "object" || isExtendable2(val);
}
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
var extend$1 = extendShallow;
var safe$1 = safeRegex;
function toRegex(pattern, options) {
  return new RegExp(toRegex.create(pattern, options));
}
toRegex.create = function(pattern, options) {
  if (typeof pattern !== "string") {
    throw new TypeError("expected a string");
  }
  var opts = extend$1({}, options);
  if (opts.contains === true) {
    opts.strictNegate = false;
  }
  var open = opts.strictOpen !== false ? "^" : "";
  var close = opts.strictClose !== false ? "$" : "";
  var endChar = opts.endChar ? opts.endChar : "+";
  var str2 = pattern;
  if (opts.strictNegate === false) {
    str2 = "(?:(?!(?:" + pattern + ")).)" + endChar;
  } else {
    str2 = "(?:(?!^(?:" + pattern + ")$).)" + endChar;
  }
  var res = open + str2 + close;
  if (opts.safe === true && safe$1(res) === false) {
    throw new Error("potentially unsafe regular expression: " + res);
  }
  return res;
};
var regexNot = toRegex;
var safe = safeRegex;
var define$e = defineProperty;
var extend = extendShallow;
var not = regexNot;
var MAX_LENGTH = 1024 * 64;
var cache = {};
toRegex$1.exports = function(patterns, options) {
  if (!Array.isArray(patterns)) {
    return makeRe(patterns, options);
  }
  return makeRe(patterns.join("|"), options);
};
function makeRe(pattern, options) {
  if (pattern instanceof RegExp) {
    return pattern;
  }
  if (typeof pattern !== "string") {
    throw new TypeError("expected a string");
  }
  if (pattern.length > MAX_LENGTH) {
    throw new Error("expected pattern to be less than " + MAX_LENGTH + " characters");
  }
  var key = pattern;
  if (!options || options && options.cache !== false) {
    key = createKey(pattern, options);
    if (cache.hasOwnProperty(key)) {
      return cache[key];
    }
  }
  var opts = extend({}, options);
  if (opts.contains === true) {
    if (opts.negate === true) {
      opts.strictNegate = false;
    } else {
      opts.strict = false;
    }
  }
  if (opts.strict === false) {
    opts.strictOpen = false;
    opts.strictClose = false;
  }
  var open = opts.strictOpen !== false ? "^" : "";
  var close = opts.strictClose !== false ? "$" : "";
  var flags2 = opts.flags || "";
  var regex2;
  if (opts.nocase === true && !/i/.test(flags2)) {
    flags2 += "i";
  }
  try {
    if (opts.negate || typeof opts.strictNegate === "boolean") {
      pattern = not.create(pattern, opts);
    }
    var str2 = open + "(?:" + pattern + ")" + close;
    regex2 = new RegExp(str2, flags2);
    if (opts.safe === true && safe(regex2) === false) {
      throw new Error("potentially unsafe regular expression: " + regex2.source);
    }
  } catch (err) {
    if (opts.strictErrors === true || opts.safe === true) {
      err.key = key;
      err.pattern = pattern;
      err.originalOptions = options;
      err.createdOptions = opts;
      throw err;
    }
    try {
      regex2 = new RegExp("^" + pattern.replace(/(\W)/g, "\\$1") + "$");
    } catch (err2) {
      regex2 = /.^/;
    }
  }
  if (opts.cache !== false) {
    memoize(regex2, key, pattern, opts);
  }
  return regex2;
}
function memoize(regex2, key, pattern, options) {
  define$e(regex2, "cached", true);
  define$e(regex2, "pattern", pattern);
  define$e(regex2, "options", options);
  define$e(regex2, "key", key);
  cache[key] = regex2;
}
function createKey(pattern, options) {
  if (!options)
    return pattern;
  var key = pattern;
  for (var prop in options) {
    if (options.hasOwnProperty(prop)) {
      key += ";" + prop + "=" + String(options[prop]);
    }
  }
  return key;
}
toRegex$1.exports.makeRe = makeRe;
function format(string, format2) {
  var _a2;
  let schema = [];
  switch (format2) {
    case "isoDate":
      schema = [
        "\\d",
        "\\d",
        "\\d",
        "\\d",
        "-",
        "\\d",
        "\\d",
        "-",
        "\\d",
        "\\d"
      ];
      break;
    case "isoDateTime":
      schema = [
        "\\d",
        "\\d",
        "\\d",
        "\\d",
        "-",
        "\\d",
        "\\d",
        "-",
        "\\d",
        "\\d",
        " ",
        "\\d",
        "\\d",
        ":",
        "\\d",
        "\\d",
        ":",
        "\\d",
        "\\d"
      ];
      break;
    case "isoTime":
      schema = ["\\d", "\\d", ":", "\\d", "\\d", ":", "\\d", "\\d"];
      break;
    case "hex":
      schema = ["#", "\\w", "\\w", "\\w", "\\w", "\\w", "\\w"];
      break;
    case "hexa":
      schema = [
        "#",
        "\\w",
        "\\w",
        "\\w",
        "\\w",
        "\\w",
        "\\w",
        "\\w",
        "\\w"
      ];
      break;
    case "integer":
      return string.replace(/^[0-9]+$/i, "");
    case "number":
      return string.replace(/^[0-9\.]+$/i, "");
    case "alphanum":
      return string.replace(/^[a-z0-9]+$/i, "");
    case "creditCard":
      schema = [
        "\\d",
        "\\d",
        "\\d",
        "\\d",
        " ",
        "\\d",
        "\\d",
        "\\d",
        "\\d",
        " ",
        "\\d",
        "\\d",
        "\\d",
        "\\d",
        " ",
        "\\d",
        "\\d",
        "\\d",
        "\\d"
      ];
      break;
    default:
      return string;
  }
  let newValue = "";
  const loopOn = string.length > schema.length ? string : schema;
  let schemaCharI = 0;
  for (let i = 0; i < loopOn.length; i++) {
    const schemaChar = schema[schemaCharI], char = (_a2 = string[i]) !== null && _a2 !== void 0 ? _a2 : "";
    if (!schemaChar || !char || i >= string.length) {
      break;
    }
    if (schemaChar === char) {
      newValue += char;
      schemaCharI++;
    } else if (schemaChar.match(/^\\d/)) {
      if (char.match(/^\d$/)) {
        newValue += char;
        schemaCharI++;
      }
    } else if (schemaChar.match(/^\\w/)) {
      if (char.match(/^\w$/)) {
        newValue += char;
        schemaCharI++;
      }
    } else if (schemaChar !== char) {
      newValue += schemaChar;
      i--;
      schemaCharI++;
    } else
      ;
  }
  return newValue;
}
format.formats = [
  "isoDate",
  "isoDateTime",
  "isoTime",
  "integer",
  "number",
  "alphanum",
  "hex",
  "hexa",
  "creditCard"
];
var sprintf = {};
(function(exports) {
  !function() {
    var re = {
      not_string: /[^s]/,
      not_bool: /[^t]/,
      not_type: /[^T]/,
      not_primitive: /[^v]/,
      number: /[diefg]/,
      numeric_arg: /[bcdiefguxX]/,
      json: /[j]/,
      not_json: /[^j]/,
      text: /^[^\x25]+/,
      modulo: /^\x25{2}/,
      placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
      key: /^([a-z_][a-z_\d]*)/i,
      key_access: /^\.([a-z_][a-z_\d]*)/i,
      index_access: /^\[(\d+)\]/,
      sign: /^[+-]/
    };
    function sprintf2(key) {
      return sprintf_format(sprintf_parse(key), arguments);
    }
    function vsprintf(fmt, argv) {
      return sprintf2.apply(null, [fmt].concat(argv || []));
    }
    function sprintf_format(parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, arg, output = "", i, k, ph, pad2, pad_character, pad_length, is_positive, sign2;
      for (i = 0; i < tree_length; i++) {
        if (typeof parse_tree[i] === "string") {
          output += parse_tree[i];
        } else if (typeof parse_tree[i] === "object") {
          ph = parse_tree[i];
          if (ph.keys) {
            arg = argv[cursor];
            for (k = 0; k < ph.keys.length; k++) {
              if (arg == void 0) {
                throw new Error(sprintf2('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k - 1]));
              }
              arg = arg[ph.keys[k]];
            }
          } else if (ph.param_no) {
            arg = argv[ph.param_no];
          } else {
            arg = argv[cursor++];
          }
          if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
            arg = arg();
          }
          if (re.numeric_arg.test(ph.type) && (typeof arg !== "number" && isNaN(arg))) {
            throw new TypeError(sprintf2("[sprintf] expecting number but found %T", arg));
          }
          if (re.number.test(ph.type)) {
            is_positive = arg >= 0;
          }
          switch (ph.type) {
            case "b":
              arg = parseInt(arg, 10).toString(2);
              break;
            case "c":
              arg = String.fromCharCode(parseInt(arg, 10));
              break;
            case "d":
            case "i":
              arg = parseInt(arg, 10);
              break;
            case "j":
              arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0);
              break;
            case "e":
              arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential();
              break;
            case "f":
              arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg);
              break;
            case "g":
              arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg);
              break;
            case "o":
              arg = (parseInt(arg, 10) >>> 0).toString(8);
              break;
            case "s":
              arg = String(arg);
              arg = ph.precision ? arg.substring(0, ph.precision) : arg;
              break;
            case "t":
              arg = String(!!arg);
              arg = ph.precision ? arg.substring(0, ph.precision) : arg;
              break;
            case "T":
              arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
              arg = ph.precision ? arg.substring(0, ph.precision) : arg;
              break;
            case "u":
              arg = parseInt(arg, 10) >>> 0;
              break;
            case "v":
              arg = arg.valueOf();
              arg = ph.precision ? arg.substring(0, ph.precision) : arg;
              break;
            case "x":
              arg = (parseInt(arg, 10) >>> 0).toString(16);
              break;
            case "X":
              arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase();
              break;
          }
          if (re.json.test(ph.type)) {
            output += arg;
          } else {
            if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
              sign2 = is_positive ? "+" : "-";
              arg = arg.toString().replace(re.sign, "");
            } else {
              sign2 = "";
            }
            pad_character = ph.pad_char ? ph.pad_char === "0" ? "0" : ph.pad_char.charAt(1) : " ";
            pad_length = ph.width - (sign2 + arg).length;
            pad2 = ph.width ? pad_length > 0 ? pad_character.repeat(pad_length) : "" : "";
            output += ph.align ? sign2 + arg + pad2 : pad_character === "0" ? sign2 + pad2 + arg : pad2 + sign2 + arg;
          }
        }
      }
      return output;
    }
    var sprintf_cache = /* @__PURE__ */ Object.create(null);
    function sprintf_parse(fmt) {
      if (sprintf_cache[fmt]) {
        return sprintf_cache[fmt];
      }
      var _fmt = fmt, match2, parse_tree = [], arg_names = 0;
      while (_fmt) {
        if ((match2 = re.text.exec(_fmt)) !== null) {
          parse_tree.push(match2[0]);
        } else if ((match2 = re.modulo.exec(_fmt)) !== null) {
          parse_tree.push("%");
        } else if ((match2 = re.placeholder.exec(_fmt)) !== null) {
          if (match2[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match2[2], field_match = [];
            if ((field_match = re.key.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== "") {
                if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                } else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                } else {
                  throw new SyntaxError("[sprintf] failed to parse named argument key");
                }
              }
            } else {
              throw new SyntaxError("[sprintf] failed to parse named argument key");
            }
            match2[2] = field_list;
          } else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
          }
          parse_tree.push(
            {
              placeholder: match2[0],
              param_no: match2[1],
              keys: match2[2],
              sign: match2[3],
              pad_char: match2[4],
              align: match2[5],
              width: match2[6],
              precision: match2[7],
              type: match2[8]
            }
          );
        } else {
          throw new SyntaxError("[sprintf] unexpected placeholder");
        }
        _fmt = _fmt.substring(match2[0].length);
      }
      return sprintf_cache[fmt] = parse_tree;
    }
    {
      exports["sprintf"] = sprintf2;
      exports["vsprintf"] = vsprintf;
    }
    if (typeof window !== "undefined") {
      window["sprintf"] = sprintf2;
      window["vsprintf"] = vsprintf;
    }
  }();
})(sprintf);
function __snakeCase(text) {
  const dashCase = __dashCase(text);
  return dashCase.replace(/\-/g, "_");
}
function __upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
try {
  if (document && !document.env) {
    document.env = {
      SUGAR: {}
    };
  }
} catch (e) {
}
let SEnv$1 = class SEnv {
  /**
   * @name        is
   * @type        Function
   * @static
   *
   * This static method allows you to check if the environment
   * is "dev", "development", "prod" or "production"
   *
   * @param     {String}      env       The environment you want to check
   * @return    {Boolean}               true if is the passed environment, false if not
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static is(env) {
    env = env.toLowerCase();
    if (env === "verbose") {
      if (this.get("verbose")) {
        return true;
      }
    }
    if (env === "devscut") {
      if (this.get("devsCut")) {
        return true;
      }
    }
    if (env === "dev" || env === "development") {
      if (this.get("env") === "dev" || this.get("env") === "development")
        return true;
    } else if (env === "prod" || env === "production") {
      if (this.get("env") === "prod" || this.get("env") === "production")
        return true;
    } else {
      return this.get("env") === env;
    }
    return false;
  }
  /**
   * @name        get
   * @type        Function
   * @static
   *
   * This static method allows you to access an env variable.
   * The variables keys are stored in UPPERCASE but you can use lowercase as well
   *
   * @param     {String}      name       The variable name you want to get back
   * @return    {Any}                   The variable getted or undefined
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static get(name2) {
    return __parse(this.env[__snakeCase(name2).toUpperCase()]);
  }
  /**
   * @name        set
   * @type        Function
   * @static
   *
   * This static method allows you to set an env variable.
   * The variables keys are stored in UPPERCASE but you can use lowercase as well
   *
   * @param     {String}     name       The variable name you want to get back
   * @param     {Any}         value     The value you want to set
   * @return    {Any}                  The value setted
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static set(name2, value) {
    this.env[__snakeCase(name2).toUpperCase()] = value;
    return value;
  }
  /**
   * @name        delete
   * @type        Function
   * @static
   *
   * This static method allows you to delete an env variable.
   * The variables keys are stored in UPPERCASE but you can use lowercase as well
   *
   * @param     {String}     name       The variable name you want to get back
   * @param     {Any}         value     The value you want to set
   * @return    {Any}                  The value setted
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static delete(name2) {
    delete this.env[__snakeCase(name2).toUpperCase()];
  }
};
class SEnv2 extends SEnv$1 {
  static get env() {
    var _a2;
    if (this._env)
      return this._env;
    const envConfig = (_a2 = SSugarConfig.get("env")) !== null && _a2 !== void 0 ? _a2 : {};
    const queryStringObj = __queryStringToObject(document.location.search);
    let finalEnv = "development";
    if (envConfig.env) {
      finalEnv = envConfig.env;
    } else if (envConfig.envFromLocation && Object.keys(envConfig.envFromLocation).length) {
      for (let [env, regex2] of Object.entries(envConfig.envFromLocation)) {
        if (new RegExp(regex2).test(document.location.href)) {
          finalEnv = env;
          break;
        }
      }
    } else {
      console.log(`<red>[SEnv]</red> The environment cannot be determined. Either set the config.env.env configuration or specify some environments by setting the config.env.envFromLocation object of {env}:{regex} environments`);
    }
    document.env.ENV = finalEnv;
    document.env.PLATFORM = "browser";
    document.env.DEVS_CUT = queryStringObj.devsCut !== void 0;
    document.env.VERBOSE = queryStringObj.verbose !== void 0;
    this._env = document.env;
    return document.env;
  }
}
class SLog {
  static filter(filter2) {
    if (typeof filter2 === "function") {
      this._filterFunctions = [...this._filterFunctions, filter2];
    } else {
      this._filteredTypes = filter2;
    }
  }
  /**
   * @name            clearFilters
   * @type            Function
   * @static
   *
   * This static method allows you to reset all the filters applied
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static clearFilters() {
    this._filteredTypes = [];
    this._filterFunctions = [];
    M;
  }
  static setDefaultLogObj(logObj) {
    this._defaultLogObj = logObj;
  }
  /**
   * @name            isTypeEnabled
   * @type            Function
   * @static
   *
   * This static method allows you Check if a particular log type is enabled or not.
   * You can pass as well multiple log types as an array.
   *
   * @param       {ISLogType|ISLogType[]}             types      The log type(s) you want to check
   * @return      {Boolean}                              True if the log type is enabled, false otherwise
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static isTypeEnabled(types2) {
    if (!this._filteredTypes.length) {
      return true;
    }
    if (!Array.isArray(types2))
      types2 = [types2];
    for (const type of types2) {
      if (!this._filteredTypes.includes(type))
        return false;
    }
    return true;
  }
  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(logObj) {
    var _a2;
    if (!(logObj === null || logObj === void 0 ? void 0 : logObj.value) && !logObj._logObj)
      ;
    this._logObj = __deepMerge(
      {
        type: SLog.TYPE_LOG,
        timestamp: Date.now(),
        decorators: true,
        time: false,
        verbose: false,
        notify: false,
        metas: {}
      },
      // @ts-ignore
      this.constructor._defaultLogObj,
      // @ts-ignore
      (_a2 = logObj._logObj) !== null && _a2 !== void 0 ? _a2 : logObj
    );
  }
  /**
   * @name        value
   * @type        Any
   * @get
   * @set
   *
   * Access the "value" property of the SLog object
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get value() {
    return this._logObj.value;
  }
  set value(value) {
    this._logObj.value = value;
  }
  /**
   * @name        metas
   * @type        Any
   * @get
   * @set
   *
   * Access the "metas" property of the SLog object
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get metas() {
    var _a2;
    return (_a2 = this._logObj.metas) !== null && _a2 !== void 0 ? _a2 : {};
  }
  set metas(value) {
    this._logObj.metas = value;
  }
  /**
   * @name        type
   * @type        String
   * @get
   *
   * Access the "type" property of the SLog object
   * This specify which type if the log. LOG, INFO, WARN, ERROR or VERBODE
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get type() {
    return this._logObj.type;
  }
  /**
   * @name        group
   * @type        String
   * @get
   *
   * Access the "group" property of the SLog object
   * The group can be used to display logs in a stack or whatever...
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get group() {
    return this._logObj.group;
  }
  set group(value) {
    if (typeof value !== "string") {
      throw new Error(`<red>[SLog]</red> The "<cyan>group</cyan>" property MUST be a string. You've passed a "${typeof value}"...`);
    }
    this._logObj.group = value;
  }
  /**
   * @name        active
   * @type        Boolean
   * @get
   *
   * Access the "active" property of the SLog object
   * This specify if the log is active depending on parameters like `SLog.filter`.
   * Check the documentation of this static method for more info.
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get active() {
    for (let [idx, fn2] of this.constructor._filterFunctions.entries()) {
      if (!fn2(this)) {
        return false;
      }
    }
    if (!this._logObj.type)
      return true;
    if (!this.constructor._filteredTypes.length) {
      return true;
    }
    if (!this.constructor.TYPES.includes(this._logObj.type)) {
      return true;
    }
    if (!this.constructor._filteredTypes.includes(this._logObj.type))
      return false;
    return true;
  }
  /**
   * @name        decorators
   * @type        Boolean
   * @get
   * @set
   *
   * Access the "decorators" property of the SLog object.
   * This specify if the log has to be printed with decorators or not
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get decorators() {
    return this._logObj.decorators;
  }
  set decorators(value) {
    this._logObj.decorators = value;
  }
  /**
   * @name        time
   * @type        Boolean
   * @get
   *
   * Access the "time" property of the SLog object.
   * This specify if the log has to be printed with his time or not
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get time() {
    return this._logObj.time;
  }
  /**
   * @name        timestamp
   * @type        String
   * @get
   *
   * Access the "timestamp" property of the SLog object
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get timestamp() {
    return this._logObj.timestamp;
  }
  /**
   * @name        clear
   * @type        Boolean
   * @get
   *
   * Access the "clear" property of the SLog object.
   * This specify if the previous logs have to be cleared before printing this one
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get clear() {
    return this._logObj.clear;
  }
  /**
   * @name        margin
   * @type        ISLogMargin
   * @get
   *
   * Access the "margin" property of the SLog object.
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get margin() {
    var _a2;
    return (_a2 = this._logObj.margin) !== null && _a2 !== void 0 ? _a2 : {
      top: 0,
      bottom: 0
    };
  }
  /**
   * @name        temp
   * @type        Boolean
   * @get
   *
   * Access the "temp" property of the SLog object.
   * This specify if this log is a temporary one and if it has to be deleted
   * when the next log appear.
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get temp() {
    return this._logObj.temp;
  }
  /**
   * @name        as
   * @type        String
   * @get
   *
   * Access the "as" property of the SLog object.
   * This specify the optimal way the log has to be displayed.
   * This depends on the logger you use and how it can display logs.
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get as() {
    return this._logObj.as;
  }
  /**
   * @name        verbose
   * @type        Boolean
   * @get
   *
   * Access the "verbose" property of the SLog object
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get verbose() {
    return this._logObj.verbose;
  }
  set verbose(value) {
    this._logObj.verbose = value;
  }
  /**
   * @name        notify
   * @type        Boolean
   * @get
   *
   * Access the "notify" property of the SLog object
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get notify() {
    return this._logObj.notify;
  }
  set notify(value) {
    this._logObj.notify = value;
  }
  /**
   * @name        logger
   * @type        Function
   * @get
   *
   * Access the "logger" property of the SLog object.
   * This represent a function that will be used to actually log the message.
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get logger() {
    return this._logObj.logger;
  }
}
SLog.TYPE_LOG = "log";
SLog.TYPE_INFO = "info";
SLog.TYPE_WARN = "warn";
SLog.TYPE_ERROR = "error";
SLog.TYPE_SUCCESS = "success";
SLog.TYPES = [
  SLog.TYPE_LOG,
  SLog.TYPE_INFO,
  SLog.TYPE_WARN,
  SLog.TYPE_ERROR,
  SLog.TYPE_SUCCESS
];
SLog.PRESET_SILENT = [];
SLog.PRESET_DEFAULT = [
  SLog.TYPE_LOG,
  SLog.TYPE_INFO,
  SLog.TYPE_WARN,
  SLog.TYPE_ERROR,
  SLog.TYPE_SUCCESS
];
SLog.PRESET_WARN = [SLog.TYPE_WARN, SLog.TYPE_ERROR];
SLog.PRESET_ERROR = [SLog.TYPE_ERROR];
SLog.PRESET_VERBOSE = [
  SLog.TYPE_LOG,
  SLog.TYPE_INFO,
  SLog.TYPE_WARN,
  SLog.TYPE_ERROR,
  SLog.TYPE_SUCCESS
];
SLog.PRESETS = ["silent", "default", "warn", "error"];
SLog._filteredTypes = [];
SLog._filterFunctions = [];
SLog._filteredTypes = [];
SLog._defaultLogObj = {};
function __setCookie(name2, value, settings = {}) {
  settings = Object.assign({ path: "/" }, settings);
  try {
    value = JSON.stringify(value);
  } catch (e) {
  }
  if (settings.expires instanceof Date) {
    settings.expires = settings.expires.toUTCString();
  }
  let updatedCookie = encodeURIComponent(name2) + "=" + encodeURIComponent(value);
  for (let optionKey in settings) {
    updatedCookie += "; " + optionKey;
    let optionValue = settings[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }
  document.cookie = updatedCookie;
}
function __getCookie(name2) {
  let matches = document.cookie.match(new RegExp("(?:^|; )" + name2.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  let value;
  if (matches === null || matches === void 0 ? void 0 : matches[1]) {
    value = decodeURIComponent(matches[1]);
    try {
      value = JSON.parse(value);
    } catch (e) {
    }
  }
  return value;
}
function __injectStyle(style, settings) {
  var _a2;
  const finalSettings = Object.assign({ id: `injected-style-${__uniqid()}`, rootNode: void 0 }, settings !== null && settings !== void 0 ? settings : {});
  if (document.querySelector(`#${finalSettings.id}`))
    return;
  const $tag = document.createElement("style");
  $tag.type = "text/css";
  $tag.setAttribute("id", finalSettings.id);
  $tag.innerHTML = style;
  if (finalSettings.rootNode) {
    finalSettings.rootNode.appendChild($tag);
  } else {
    const $firstLink = document.querySelector('head link[rel="stylesheet"]');
    if ($firstLink) {
      (_a2 = $firstLink.parentElement) === null || _a2 === void 0 ? void 0 : _a2.insertBefore($tag, $firstLink);
    } else {
      document.head.appendChild($tag);
    }
  }
  return $tag;
}
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
function __pickRandom(array, count = 1) {
  array = __unique(array);
  const items = [];
  if (count > 1) {
    if (count >= array.length) {
      return array;
    }
    for (let i = 0; i < count; i++) {
      let item = __pickRandom(array, 1);
      while (items.includes(item)) {
        item = __pickRandom(array, 1);
      }
      items.push(item);
    }
    return items;
  } else if (count === 1) {
    return array[Math.round(Math.random() * (array.length - 1))];
  }
  return array;
}
let _colorsStack = {};
let _colorUsedByScope = {};
function getColorFor(ref, settings) {
  settings = __deepMerge({
    scope: "default",
    excludeBasics: true
  }, settings !== null && settings !== void 0 ? settings : {});
  const availableColors$1 = availableColors(settings);
  const scopeId = __md5.encrypt(settings.scope);
  const refId = __md5.encrypt(ref);
  if (_colorsStack[`${scopeId}.${refId}`]) {
    return _colorsStack[`${scopeId}.${refId}`];
  }
  if (!_colorUsedByScope[scopeId])
    _colorUsedByScope[scopeId] = [];
  if (_colorUsedByScope[scopeId].length >= availableColors$1.length) {
    const color = __pickRandom(availableColors$1);
    _colorsStack[`${scopeId}.${refId}`] = color;
    return color;
  } else {
    for (let i = 0; i < availableColors$1.length; i++) {
      if (_colorUsedByScope[scopeId].indexOf(availableColors$1[i]) === -1) {
        _colorUsedByScope[scopeId].push(availableColors$1[i]);
        _colorsStack[`${scopeId}.${refId}`] = availableColors$1[i];
        return availableColors$1[i];
      }
    }
  }
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor2 = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor2);
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor2 = _classExtractFieldDescriptor(receiver, privateMap, "set");
  _classApplyDescriptorSet(receiver, descriptor2, value);
  return value;
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function _classApplyDescriptorGet(receiver, descriptor2) {
  if (descriptor2.get) {
    return descriptor2.get.call(receiver);
  }
  return descriptor2.value;
}
function _classApplyDescriptorSet(receiver, descriptor2, value) {
  if (descriptor2.set) {
    descriptor2.set.call(receiver, value);
  } else {
    if (!descriptor2.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor2.value = value;
  }
}
function _classPrivateMethodGet(receiver, privateSet, fn2) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return fn2;
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}
function _classPrivateMethodInitSpec(obj, privateSet) {
  _checkPrivateRedeclaration(obj, privateSet);
  privateSet.add(obj);
}
var list = [
  " daum[ /]",
  " deusu/",
  " yadirectfetcher",
  "(?:^| )site",
  "(?:^|[^g])news",
  "@[a-z]",
  "\\(at\\)[a-z]",
  "\\(github\\.com/",
  "\\[at\\][a-z]",
  "^12345",
  "^<",
  "^[\\w \\.\\-\\(\\)]+(/v?\\d+(\\.\\d+)?(\\.\\d{1,10})?)?$",
  "^[^ ]{50,}$",
  "^active",
  "^ad muncher",
  "^amaya",
  "^anglesharp/",
  "^anonymous",
  "^avsdevicesdk/",
  "^axios/",
  "^bidtellect/",
  "^biglotron",
  "^btwebclient/",
  "^castro",
  "^clamav[ /]",
  "^client/",
  "^cobweb/",
  "^coccoc",
  "^custom",
  "^ddg[_-]android",
  "^discourse",
  "^dispatch/\\d",
  "^downcast/",
  "^duckduckgo",
  "^facebook",
  "^fdm[ /]\\d",
  "^getright/",
  "^gozilla/",
  "^hatena",
  "^hobbit",
  "^hotzonu",
  "^hwcdn/",
  "^jeode/",
  "^jetty/",
  "^jigsaw",
  "^linkdex",
  "^lwp[-: ]",
  "^metauri",
  "^microsoft bits",
  "^movabletype",
  "^mozilla/\\d\\.\\d \\(compatible;?\\)$",
  "^mozilla/\\d\\.\\d \\w*$",
  "^navermailapp",
  "^netsurf",
  "^offline explorer",
  "^php",
  "^postman",
  "^postrank",
  "^python",
  "^read",
  "^reed",
  "^restsharp/",
  "^snapchat",
  "^space bison",
  "^svn",
  "^swcd ",
  "^taringa",
  "^test certificate info",
  "^thumbor/",
  "^tumblr/",
  "^user-agent:mozilla",
  "^valid",
  "^venus/fedoraplanet",
  "^w3c",
  "^webbandit/",
  "^webcopier",
  "^wget",
  "^whatsapp",
  "^xenu link sleuth",
  "^yahoo",
  "^yandex",
  "^zdm/\\d",
  "^zoom marketplace/",
  "^{{.*}}$",
  "adbeat\\.com",
  "appinsights",
  "archive",
  "ask jeeves/teoma",
  "bit\\.ly/",
  "bluecoat drtr",
  "bot",
  "browsex",
  "burpcollaborator",
  "capture",
  "catch",
  "check",
  "chrome-lighthouse",
  "chromeframe",
  "cloud",
  "crawl",
  "cryptoapi",
  "dareboost",
  "datanyze",
  "dataprovider",
  "dejaclick",
  "dmbrowser",
  "download",
  "evc-batch/",
  "feed",
  "firephp",
  "freesafeip",
  "ghost",
  "gomezagent",
  "google",
  "headlesschrome/",
  "http",
  "httrack",
  "hubspot marketing grader",
  "hydra",
  "ibisbrowser",
  "images",
  "iplabel",
  "ips-agent",
  "java",
  "library",
  "mail\\.ru/",
  "manager",
  "monitor",
  "morningscore/",
  "neustar wpm",
  "nutch",
  "offbyone",
  "optimize",
  "pageburst",
  "pagespeed",
  "perl",
  "phantom",
  "pingdom",
  "powermarks",
  "preview",
  "proxy",
  "ptst[ /]\\d",
  "reader",
  "rexx;",
  "rigor",
  "rss",
  "scan",
  "scrape",
  "search",
  "serp ?reputation ?management",
  "server",
  "sogou",
  "sparkler/",
  "speedcurve",
  "spider",
  "statuscake",
  "stumbleupon\\.com",
  "supercleaner",
  "synapse",
  "synthetic",
  "taginspector/",
  "torrent",
  "tracemyfile",
  "transcoder",
  "trendsmapresolver",
  "twingly recon",
  "url",
  "virtuoso",
  "wappalyzer",
  "webglance",
  "webkit2png",
  "websitemetadataretriever",
  "whatcms/",
  "wordpress",
  "zgrab"
];
function amend(list2) {
  try {
    new RegExp("(?<! cu)bot").test("dangerbot");
  } catch (error) {
    return list2;
  }
  [
    // Addresses: Cubot device
    ["bot", "(?<! cu)bot"],
    // Addresses: Android webview
    ["google", "(?<! (?:channel/|google/))google(?!(app|/google| pixel))"],
    // Addresses: libhttp browser
    ["http", "(?<!(?:lib))http"],
    // Addresses: java based browsers
    ["java", "java(?!;)"],
    // Addresses: Yandex Search App
    ["search", "(?<! ya(?:yandex)?)search"]
  ].forEach((_ref) => {
    let [search, replace2] = _ref;
    const index = list2.lastIndexOf(search);
    if (~index) {
      list2.splice(index, 1, replace2);
    }
  });
  return list2;
}
amend(list);
const flags = "i";
var _list = /* @__PURE__ */ new WeakMap();
var _pattern = /* @__PURE__ */ new WeakMap();
var _update = /* @__PURE__ */ new WeakSet();
var _index = /* @__PURE__ */ new WeakSet();
class Isbot {
  constructor(patterns) {
    _classPrivateMethodInitSpec(this, _index);
    _classPrivateMethodInitSpec(this, _update);
    _classPrivateFieldInitSpec(this, _list, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _pattern, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _list, patterns || list.slice());
    _classPrivateMethodGet(this, _update, _update2).call(this);
    const isbot2 = (ua) => this.test(ua);
    return Object.defineProperties(isbot2, Object.entries(Object.getOwnPropertyDescriptors(Isbot.prototype)).reduce((accumulator, _ref) => {
      let [prop, descriptor2] = _ref;
      if (typeof descriptor2.value === "function") {
        Object.assign(accumulator, {
          [prop]: {
            value: this[prop].bind(this)
          }
        });
      }
      if (typeof descriptor2.get === "function") {
        Object.assign(accumulator, {
          [prop]: {
            get: () => this[prop]
          }
        });
      }
      return accumulator;
    }, {}));
  }
  /**
   * Get a clone of the pattern
   * @type RegExp
   */
  get pattern() {
    return new RegExp(_classPrivateFieldGet(this, _pattern));
  }
  /**
   * Match given string against out pattern
   * @param  {string} ua User Agent string
   * @returns {boolean}
   */
  test(ua) {
    return Boolean(ua) && _classPrivateFieldGet(this, _pattern).test(ua);
  }
  /**
   * Get the match for strings' known crawler pattern
   * @param  {string} ua User Agent string
   * @returns {string|null}
   */
  find() {
    let ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    const match2 = ua.match(_classPrivateFieldGet(this, _pattern));
    return match2 && match2[0];
  }
  /**
   * Get the patterns that match user agent string if any
   * @param  {string} ua User Agent string
   * @returns {string[]}
   */
  matches() {
    let ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return _classPrivateFieldGet(this, _list).filter((entry) => new RegExp(entry, flags).test(ua));
  }
  /**
   * Clear all patterns that match user agent
   * @param  {string} ua User Agent string
   * @returns {void}
   */
  clear() {
    let ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    this.exclude(this.matches(ua));
  }
  /**
   * Extent patterns for known crawlers
   * @param  {string[]} filters
   * @returns {void}
   */
  extend() {
    let filters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    [].push.apply(_classPrivateFieldGet(this, _list), filters.filter((rule) => _classPrivateMethodGet(this, _index, _index2).call(this, rule) === -1).map((filter2) => filter2.toLowerCase()));
    _classPrivateMethodGet(this, _update, _update2).call(this);
  }
  /**
   * Exclude patterns from bot pattern rule
   * @param  {string[]} filters
   * @returns {void}
   */
  exclude() {
    let filters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    let {
      length
    } = filters;
    while (length--) {
      const index = _classPrivateMethodGet(this, _index, _index2).call(this, filters[length]);
      if (index > -1) {
        _classPrivateFieldGet(this, _list).splice(index, 1);
      }
    }
    _classPrivateMethodGet(this, _update, _update2).call(this);
  }
  /**
   * Create a new Isbot instance using given list or self's list
   * @param  {string[]} [list]
   * @returns {Isbot}
   */
  spawn(list2) {
    return new Isbot(list2 || _classPrivateFieldGet(this, _list));
  }
}
function _update2() {
  _classPrivateFieldSet(this, _pattern, new RegExp(_classPrivateFieldGet(this, _list).join("|"), flags));
}
function _index2(rule) {
  return _classPrivateFieldGet(this, _list).indexOf(rule.toLowerCase());
}
const isbot = new Isbot();
function __isCrawler(ua = navigator.userAgent) {
  return isbot(ua);
}
function __isChildProcess() {
  return process.send !== void 0 || {}.IS_CHILD_PROCESS !== void 0;
}
var isClass$1 = { exports: {} };
(function(module, exports) {
  (function(root) {
    const toString2 = Function.prototype.toString;
    function fnBody(fn2) {
      return toString2.call(fn2).replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, "");
    }
    function isClass2(fn2) {
      if (typeof fn2 !== "function") {
        return false;
      }
      if (/^class[\s{]/.test(toString2.call(fn2))) {
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
})(isClass$1, isClass$1.exports);
var isClassExports = isClass$1.exports;
const __isClass = /* @__PURE__ */ getDefaultExportFromCjs(isClassExports);
function isClass(cls) {
  if (!Array.isArray(cls))
    cls = [cls];
  for (let i = 0; i < cls.length; i++) {
    if (!__isClass(cls[i]))
      return false;
  }
  return true;
}
function __isColor(value) {
  try {
    const ele = document.createElement("div");
    ele.style.color = value;
    return ele.style.color.split(/\s+/).join("").toLowerCase() !== "";
  } catch (e) {
  }
  if (typeof value !== "string")
    return false;
  return value.match(/^#[a-zA-Z0-9]{3,6}$/) || value.match(/^rgba\([0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}\)$/) || value.match(/^rgb\([0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}\)$/) || value.match(/^hsl\([0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?\)$/) || value.match(/^hsv\([0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?\)$/);
}
/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var isExtglob$1 = function isExtglob(str2) {
  if (typeof str2 !== "string" || str2 === "") {
    return false;
  }
  var match2;
  while (match2 = /(\\).|([@?!+*]\(.*\))/g.exec(str2)) {
    if (match2[2])
      return true;
    str2 = str2.slice(match2.index + match2[0].length);
  }
  return false;
};
/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var isExtglob2 = isExtglob$1;
var chars = { "{": "}", "(": ")", "[": "]" };
var strictCheck = function(str2) {
  if (str2[0] === "!") {
    return true;
  }
  var index = 0;
  var pipeIndex = -2;
  var closeSquareIndex = -2;
  var closeCurlyIndex = -2;
  var closeParenIndex = -2;
  var backSlashIndex = -2;
  while (index < str2.length) {
    if (str2[index] === "*") {
      return true;
    }
    if (str2[index + 1] === "?" && /[\].+)]/.test(str2[index])) {
      return true;
    }
    if (closeSquareIndex !== -1 && str2[index] === "[" && str2[index + 1] !== "]") {
      if (closeSquareIndex < index) {
        closeSquareIndex = str2.indexOf("]", index);
      }
      if (closeSquareIndex > index) {
        if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
          return true;
        }
        backSlashIndex = str2.indexOf("\\", index);
        if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
          return true;
        }
      }
    }
    if (closeCurlyIndex !== -1 && str2[index] === "{" && str2[index + 1] !== "}") {
      closeCurlyIndex = str2.indexOf("}", index);
      if (closeCurlyIndex > index) {
        backSlashIndex = str2.indexOf("\\", index);
        if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
          return true;
        }
      }
    }
    if (closeParenIndex !== -1 && str2[index] === "(" && str2[index + 1] === "?" && /[:!=]/.test(str2[index + 2]) && str2[index + 3] !== ")") {
      closeParenIndex = str2.indexOf(")", index);
      if (closeParenIndex > index) {
        backSlashIndex = str2.indexOf("\\", index);
        if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
          return true;
        }
      }
    }
    if (pipeIndex !== -1 && str2[index] === "(" && str2[index + 1] !== "|") {
      if (pipeIndex < index) {
        pipeIndex = str2.indexOf("|", index);
      }
      if (pipeIndex !== -1 && str2[pipeIndex + 1] !== ")") {
        closeParenIndex = str2.indexOf(")", pipeIndex);
        if (closeParenIndex > pipeIndex) {
          backSlashIndex = str2.indexOf("\\", pipeIndex);
          if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
            return true;
          }
        }
      }
    }
    if (str2[index] === "\\") {
      var open = str2[index + 1];
      index += 2;
      var close = chars[open];
      if (close) {
        var n = str2.indexOf(close, index);
        if (n !== -1) {
          index = n + 1;
        }
      }
      if (str2[index] === "!") {
        return true;
      }
    } else {
      index++;
    }
  }
  return false;
};
var relaxedCheck = function(str2) {
  if (str2[0] === "!") {
    return true;
  }
  var index = 0;
  while (index < str2.length) {
    if (/[*?{}()[\]]/.test(str2[index])) {
      return true;
    }
    if (str2[index] === "\\") {
      var open = str2[index + 1];
      index += 2;
      var close = chars[open];
      if (close) {
        var n = str2.indexOf(close, index);
        if (n !== -1) {
          index = n + 1;
        }
      }
      if (str2[index] === "!") {
        return true;
      }
    } else {
      index++;
    }
  }
  return false;
};
var isGlob = function isGlob2(str2, options) {
  if (typeof str2 !== "string" || str2 === "") {
    return false;
  }
  if (isExtglob2(str2)) {
    return true;
  }
  var check = strictCheck;
  if (options && options.strict === false) {
    check = relaxedCheck;
  }
  return check(str2);
};
const __isGlob$1 = /* @__PURE__ */ getDefaultExportFromCjs(isGlob);
function __isGlob(string) {
  return __isGlob$1(string);
}
function __isInteger(data2) {
  return typeof data2 === "number" && !isNaN(data2) && function(x) {
    return (x | 0) === x;
  }(parseFloat(data2));
}
function __isNode$2() {
  return typeof process !== "undefined" && process.release && process.release.name === "node";
}
function __isString(value) {
  return typeof value === "string" || value instanceof String;
}
var globToRegexp = function(glob, opts) {
  if (typeof glob !== "string") {
    throw new TypeError("Expected a string");
  }
  var str2 = String(glob);
  var reStr = "";
  var extended = opts ? !!opts.extended : false;
  var globstar = opts ? !!opts.globstar : false;
  var inGroup = false;
  var flags2 = opts && typeof opts.flags === "string" ? opts.flags : "";
  var c;
  for (var i = 0, len = str2.length; i < len; i++) {
    c = str2[i];
    switch (c) {
      case "/":
      case "$":
      case "^":
      case "+":
      case ".":
      case "(":
      case ")":
      case "=":
      case "!":
      case "|":
        reStr += "\\" + c;
        break;
      case "?":
        if (extended) {
          reStr += ".";
          break;
        }
      case "[":
      case "]":
        if (extended) {
          reStr += c;
          break;
        }
      case "{":
        if (extended) {
          inGroup = true;
          reStr += "(";
          break;
        }
      case "}":
        if (extended) {
          inGroup = false;
          reStr += ")";
          break;
        }
      case ",":
        if (inGroup) {
          reStr += "|";
          break;
        }
        reStr += "\\" + c;
        break;
      case "*":
        var prevChar = str2[i - 1];
        var starCount = 1;
        while (str2[i + 1] === "*") {
          starCount++;
          i++;
        }
        var nextChar = str2[i + 1];
        if (!globstar) {
          reStr += ".*";
        } else {
          var isGlobstar = starCount > 1 && (prevChar === "/" || prevChar === void 0) && (nextChar === "/" || nextChar === void 0);
          if (isGlobstar) {
            reStr += "((?:[^/]*(?:/|$))*)";
            i++;
          } else {
            reStr += "([^/]*)";
          }
        }
        break;
      default:
        reStr += c;
    }
  }
  if (!flags2 || !~flags2.indexOf("g")) {
    reStr = "^" + reStr + "$";
  }
  return new RegExp(reStr, flags2);
};
const __globToRegex = /* @__PURE__ */ getDefaultExportFromCjs(globToRegexp);
var __awaiter$w = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
let SEventEmitter$1 = class SEventEmitter extends SClass {
  static get global() {
    if (!SEventEmitter._globalInstance) {
      SEventEmitter._globalInstance = new SEventEmitter({
        metas: {
          id: "sugarEventSPromise"
        }
      });
    }
    return SEventEmitter._globalInstance;
  }
  /**
   * @name                  pipe
   * @type                  Function
   * @static
   *
   * This static function allows you to redirect some SEventEmitter "events" to another SEventEmitter instance
   * with the ability to process the linked value before emiting it on the destination SEventEmitter.
   *
   * @param         {SEventEmitter}      sourceSEventEmitter        The source SEventEmitter instance on which to listen for "events"
   * @param         {SEventEmitter}      destSEventEmitter          The destination SEventEmitter instance on which to emit the listened "events"
   * @param         {Object}        [settings={}]         An object of settings to configure your pipe process
   * - stacks (*) {String}: Specify which stacks you want to pipe. By default it's all using the "*" character
   * - processor (null) {Function}: Specify a function to apply on the emited value before emiting it on the dest SEventEmitter. Take as arguments the value itself and the stack name. Need to return a new value
   * - filter (null) {Function}: Specify a function to filter the "events". It will take as parameter the emited value and the metas object. You must return true or false depending if you want to pipe the particular event or not
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static pipe(sourceSEventEmitter, destSEventEmitter, settings) {
    const set = Object.assign({ events: "*", overrideEmitter: false, processor: void 0, exclude: ["finally", "resolve", "reject", "cancel", "catch"], filter: void 0 }, settings !== null && settings !== void 0 ? settings : {});
    if (!sourceSEventEmitter || !sourceSEventEmitter.on || typeof sourceSEventEmitter.on !== "function") {
      return sourceSEventEmitter;
    }
    sourceSEventEmitter.on(set.events || "*", (value, metas) => __awaiter$w(this, void 0, void 0, function* () {
      var _a2, _b2, _c2, _d2, _e2, _f, _g;
      if (!metas || !value) {
        return;
      }
      metas.id = (_c2 = (_a2 = metas.id) !== null && _a2 !== void 0 ? _a2 : (_b2 = metas.emitter.metas) === null || _b2 === void 0 ? void 0 : _b2.id) !== null && _c2 !== void 0 ? _c2 : __uniqid();
      metas.color = (_f = (_d2 = metas.color) !== null && _d2 !== void 0 ? _d2 : (_e2 = metas.emitter.metas) === null || _e2 === void 0 ? void 0 : _e2.color) !== null && _f !== void 0 ? _f : getColorFor(metas.id);
      if (set.exclude && set.exclude.indexOf(metas.event) !== -1)
        return;
      if (set.filter && !set.filter(value, metas))
        return;
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
      if (metas && metas.event) {
        metas.event;
        if (!metas.emitter) {
          metas.emitter = this;
        }
        const emitMetas = Object.assign(Object.assign({}, metas), { level: ((_g = metas === null || metas === void 0 ? void 0 : metas.level) !== null && _g !== void 0 ? _g : 0) + 1 });
        if (destSEventEmitter instanceof SEventEmitter) {
          if (!set.overrideEmitter && destSEventEmitter.settings.bind) {
            emitMetas.emitter = destSEventEmitter.settings.bind;
          } else if (set.overrideEmitter === true) {
            emitMetas.emitter = destSEventEmitter;
          }
        }
        if (__isNode$2() && destSEventEmitter === process && __isChildProcess()) {
          if (value.value && value.value instanceof Error) {
            value.value = fn$3(value.value);
          }
          if (!this._ipcInstance._pipedEventsUids) {
            this._ipcInstance._pipedEventsUids = [];
          }
          if (this._ipcInstance && !this._ipcInstance._pipedEventsUids.includes(emitMetas.uid)) {
            this._ipcInstance._pipedEventsUids.push(emitMetas.uid);
            this._ipcInstance.of[`ipc-${process.ppid}`].emit("message", {
              value,
              metas: emitMetas
            });
          }
        } else {
          destSEventEmitter.emit(metas.event, value, emitMetas);
        }
      }
    }));
  }
  /**
   * @name                  constructor
   * @type                  Function
   *
   * Constructor
   *
   * @param         {Object}            [settings={}]     An object of settings for this particular SEventEmitter instance. Here's the available settings:
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(settings) {
    super(__deepMerge({
      asyncStart: false,
      bufferTimeout: 1e3,
      defaults: {},
      castByEvent: {
        log: SLog
      },
      bind: void 0
    }, settings !== null && settings !== void 0 ? settings : {}));
    this._asyncStarted = false;
    this._buffer = [];
    this._eventsStacks = {};
    this._onStackById = {};
  }
  /**
   * @name          bind
   * @type      Function
   *
   * This method allows you to bind another object as the emitter.
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  bind(obj) {
    this.settings.bind = obj;
    return this;
  }
  /**
   * @name          pipe
   * @type          Function
   *
   * This method take an SEventEmitter instance as parameter on which to pipe the
   * specified stacks using the settings.stacks property.
   * It is exactly the same as the static ```pipe``` method but for this
   * particular instance.
   *
   * @param       {SEventEmitter}      input      The input promise on which to pipe the events in this one
   * @param       {ISEventEmitterPipeSettings}      [settings={}]    An object ob settings to configure the pipe process:
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  pipe(input, settings) {
    SEventEmitter.pipe(input, this, settings);
    return input;
  }
  /**
   * @name          pipeErrors
   * @type          Function
   *
   * This is the exact same as the original ```pipe``` method. It's just pipe only the errors.
   *
   * @param       {SEventEmitter}      input      The input promise on which to pipe the events in this one
   * @param       {ISEventEmitterPipeSettings}      [settings={}]    An object ob settings to configure the pipe process:
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  pipeErrors(input, settings) {
    SEventEmitter.pipe(input, this, Object.assign(Object.assign({}, settings), { events: "error" }));
    return input;
  }
  /**
   * @name      pipeFrom
   * @type      Function
   *
   * This is the exacte same as the original ```pipe``` method. It's just an aliasw.
   *
   * @since     2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  pipeFrom(input, settings) {
    return this.pipe(input, settings);
  }
  /**
   * @name          pipe
   * @type          Function
   *
   * This method is the same as the ```pipe```and ```pipeFrom``` one but it's just act as the inverse.
   * Here you specify whenre you want to pipe this instance events and not from which you want to pipe them here...
   *
   * @param       {SEventEmitter}      dest      The destination event emitter on which to pipe the events from this one
   * @param       {ISEventEmitterPipeSettings}      [settings={}]    An object ob settings to configure the pipe process:
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  pipeTo(dest, settings) {
    SEventEmitter.pipe(this, dest, settings);
    return this;
  }
  /**
   * @name          start
   * @type          Function
   *
   * This method has to be called when you want to start the event emissions.
   * This is usefull only if you set the setting ```asyncStart``` to true.
   * Untill you call this method, all the emitted events
   * are store in memory and emitted after.
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  start() {
    if (!this.settings.asyncStart)
      return;
    this._asyncStarted = true;
    this._processBuffer();
  }
  /**
   * @name          emit
   * @type          Function
   * @async
   *
   * This is the method that allows you to emit the callbacks like "catch", "finally", etc... without actually resolving the Promise itself
   *
   * @param         {String|Array}        event            The event that you want to emit. You can emit multiple events by passing an Array like ['catch','finally'], or a string like "catch,finally"
   * @param         {Mixed}         value         The value you want to pass to the callback
   * @return        {ISEventEmitter}                       The SEventEmitter instance to maintain chainability
   *
   * @example         js
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _createMetas(event, metas = {}) {
    var _a2, _b2, _c2;
    return __deepMerge({
      event,
      name: event,
      emitter: (_b2 = (_a2 = this.settings.bind) !== null && _a2 !== void 0 ? _a2 : metas === null || metas === void 0 ? void 0 : metas.emitter) !== null && _b2 !== void 0 ? _b2 : this,
      originalEmitter: (_c2 = metas === null || metas === void 0 ? void 0 : metas.originalEmitter) !== null && _c2 !== void 0 ? _c2 : this,
      time: Date.now(),
      level: 0
    }, metas !== null && metas !== void 0 ? metas : {});
  }
  emit(event, value, metas) {
    return new Promise((resolve, reject) => __awaiter$w(this, void 0, void 0, function* () {
      let metasObj = this._createMetas(event, metas);
      const isFirstLevel = !metasObj.level;
      if (__isPlainObject(value)) {
        Object.keys(this.settings.defaults).forEach((key) => {
          var _a2;
          const parts = key.split(",").map((l) => l.trim());
          if (parts.indexOf(event) === -1 && parts.indexOf("*") === -1)
            return;
          value = __deepMerge(value, (_a2 = this.settings.defaults) === null || _a2 === void 0 ? void 0 : _a2[key]);
        });
      }
      const CastClass = this.settings.castByEvent[event];
      if (CastClass && isClass(CastClass) && !(value instanceof CastClass) && !value._sEventEmitterPreprocessed) {
        value = new CastClass(value);
      }
      if (event === "ask") {
        if (isFirstLevel) {
          metasObj.askId = __uniqid();
        }
      }
      if (!this._asyncStarted && this.settings.asyncStart) {
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
    return __awaiter$w(this, void 0, void 0, function* () {
      logObj.metas.uid = __uniqid();
      if (logObj.event === "ask") {
        this.constructor.global.on(`answer.${logObj.metas.askId}`, (answer, metas) => {
          logObj.resolve(answer);
        });
        this._emitEvents(logObj.event, logObj.value, Object.assign({}, logObj.metas));
      } else {
        const res = yield this._emitEvents(logObj.event, logObj.value, Object.assign({}, logObj.metas));
        logObj.resolve(res);
      }
    });
  }
  /**
   * @name            _registerNewEventsStacks
   * @type            Function
   * @private
   *
   * This methods allows you to register new stacks.
   * A new stack can be called then using the "on('stackName', ...)" method,
   * or directly on the SEventEmitter instance like so "myPromise.stackName(...)".
   *
   * @param       {String|Array}      stacks        The stack(s) name(s) you want to register. Can be an Array or a comma separated string
   * @return      {SEventEmitter}                        The SEventEmitter instance
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
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
  /**
   * @name            _registerCallbackInEventStack
   * @type            Function
   *
   * This function take as argument a stack array and register into it the passed callback function
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
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
    if (callNumber === void 0) {
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
  /**
   * @name          _processBuffer
   * @type          Function
   * @private
   *
   * This method simply take care of empty the buffer by emitting
   * all the buffered events
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _processBuffer() {
    if (this._buffer.length > 0) {
      setTimeout(() => {
        this._buffer = this._buffer.filter((item) => {
          this._emit(item);
          return false;
        });
      }, this.settings.bufferTimeout);
    }
  }
  /**
   * @name            _emitEventStack
   * @type            Function
   * @private
   * @async
   *
   * This function take an Array Stack as parameter and execute it to return the result
   *
   * @param         {String}             event             The event to execute
   * @param         {Mixed}             initialValue      The initial value to pass to the first stack callback
   * @return        {Promise}                             A promise resolved with the stack result
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _emitEventStack(event, initialValue, metasObj) {
    return __awaiter$w(this, void 0, void 0, function* () {
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
        if (__globToRegex(stackName).test(event) && this._eventsStacks[stackName] !== void 0) {
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
      for (let i = 0; i < eventStackArray.length; i++) {
        const item = eventStackArray[i];
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
  /**
   * @name          _emitEvents
   * @type          Function
   * @private
   * @async
   *
   * This function take as parameters a list of events to emit like an Array ['catch','finnaly'], or a string like so "catch,finally", and as second parameter,
   * the initial value to pass to the first callback of the joined stacks...
   *
   * @param         {Array|String}            stacks          The stacks to emit
   * @param         {Mixed}                   initialValue    The initial value to pass to the first stack callback
   * @return        {Promise}                                 A promise that will be resolved with the stacks resulting value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _emitEvents(events, initialValue, metas) {
    return new Promise((resolve, reject) => __awaiter$w(this, void 0, void 0, function* () {
      if (!events)
        return this;
      if (typeof events === "string")
        events = events.split(",").map((s) => s.trim());
      let currentStackResult = initialValue;
      for (let i = 0; i < events.length; i++) {
        const stackResult = yield this._emitEventStack(events[i], currentStackResult, metas);
        if (stackResult !== void 0) {
          currentStackResult = stackResult;
        }
      }
      resolve(currentStackResult);
    }));
  }
  /**
   * @name                on
   * @type                Function
   *
   * This method allows the SEventEmitter user to register a function that will be called every time the "resolve" one is called in the executor
   * The context of the callback will be the SEventEmitter instance itself so you can call all the methods available like "resolve", "release", "on", etc using
   * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SEventEmitter instance through the last parameter like so "(value, SEventEmitterInstance) => { ... }".
   *
   * @param           {String|Array}      stacks        The stacks in which you want register your callback. Either an Array like ['catch','finally'], or a String like "catch,finally"
   * @param           {Function}        callback        The callback function to register
   * @return          {SEventEmitter}                  The SEventEmitter instance to maintain chainability
   *
   * @example         js
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  on(events, callback, settings) {
    const set = __deepMerge({
      filter: void 0,
      processor: void 0,
      id: void 0
    }, settings);
    if (typeof events === "string")
      events = events.split(",").map((s) => s.trim());
    events.forEach((name2) => {
      const splitedName = name2.split(":");
      let callNumber = -1;
      if (splitedName.length === 2) {
        name2 = splitedName[0];
        callNumber = parseInt(splitedName[1]);
      }
      this._registerCallbackInEventStack(name2, callback, {
        callNumber,
        filter: set.filter,
        processor: set.processor,
        id: set.id
      });
    });
    return this;
  }
  /**
   * @name            off
   * @type            Function
   *
   * This method allows you to unsubscribe to an event by passing the event name an optionally the callback function.
   * If you don't pass the callback function, all the subscribed events the same as the passed one will be unsubscribed.
   *
   * @param       {String}        event        The event name to unsubscribe to. It can be also an "on" method passed setting "id". In this case, it will unsubscribe all the created subscription(s) in this particular "on" call.
   * @param       {Function}    [callback=null]     The callback function you want to unsubscribe
   * @return      {SEventEmitter}                The SEventEmitter instance to maintain chainability
   *
   * @since     2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
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
  /**
   * @name                      destroy
   * @type                      Function
   *
   * Destroying the SEventEmitter instance by unregister all the callbacks, etc...
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  destroy() {
    this._eventsStacks = {};
  }
};
SEventEmitter$1.usableAsMixin = true;
class SEventEmitter2 extends SEventEmitter$1 {
}
var src = {};
var config = {};
const name = "clone-class";
const version = "0.6.20";
const description = "Clone an ES6 Class as Another Class Name for Isolating Class Static Properties.";
const main = "src/index.js";
const typings = "src/index.d.ts";
const scripts = {
  clean: "shx rm -fr dist/*",
  dist: "npm run clean && tsc && shx cp {README.md,package.json} dist/",
  pack: "npm pack dist/",
  example: "ts-node examples/example.ts",
  lint: "npm run lint:ts",
  "lint:ts": "tslint --project tsconfig.json && tsc --noEmit",
  test: "npm run test:unit",
  "test:unit": 'blue-tape -r ts-node/register "src/**/*.spec.ts" "tests/**/*.spec.ts"',
  "test:pack": "bash -x scripts/npm-pack-testing.sh"
};
const repository = {
  type: "git",
  url: "git+https://github.com/huan/clone-class.git"
};
const keywords = [
  "clone",
  "class",
  "es6",
  "static"
];
const author = "Huan LI <zixia@zixia.net>";
const license = "Apache-2.0";
const bugs = {
  url: "https://github.com/huan/clone-class/issues"
};
const homepage = "https://github.com/huan/clone-class#readme";
const devDependencies = {
  "@types/blue-tape": "^0.1.31",
  "@types/node": "^10.0.3",
  "@types/semver": "^5.5.0",
  "blue-tape": "^1.0.0",
  "git-scripts": "^0.2.1",
  semver: "^5.5.0",
  shx: "^0.3.0",
  "ts-node": "^7.0.0",
  tslint: "^5.9.1",
  typescript: "^3.0.3"
};
const git = {
  scripts: {
    "pre-push": "./scripts/pre-push.sh"
  }
};
const publishConfig = {
  access: "public",
  tag: "latest"
};
const require$$0$1 = {
  name,
  version,
  description,
  main,
  typings,
  scripts,
  repository,
  keywords,
  author,
  license,
  bugs,
  homepage,
  devDependencies,
  git,
  publishConfig
};
Object.defineProperty(config, "__esModule", { value: true });
config.VERSION = require$$0$1.version;
var instanceToClass$1 = {};
Object.defineProperty(instanceToClass$1, "__esModule", { value: true });
function instanceToClass(instance, baseClass) {
  return instance.constructor;
}
instanceToClass$1.instanceToClass = instanceToClass;
instanceToClass$1.default = instanceToClass;
var cloneClass$1 = {};
Object.defineProperty(cloneClass$1, "__esModule", { value: true });
function cloneClass(OriginalClass) {
  for (const staticProperty in OriginalClass) {
    if (/^[A-Z]/.test(staticProperty)) {
      continue;
    }
    if (typeof OriginalClass[staticProperty] === "object") {
      throw new Error("static property initialized to an object with defination is not supported with cloneClass.");
    }
  }
  class AnotherOriginalClass extends OriginalClass {
    constructor(...args) {
      super(...args);
    }
  }
  Reflect.defineProperty(AnotherOriginalClass, "name", {
    value: OriginalClass.name
  });
  return AnotherOriginalClass;
}
cloneClass$1.cloneClass = cloneClass;
cloneClass$1.default = cloneClass;
Object.defineProperty(src, "__esModule", { value: true });
var config_1 = config;
src.VERSION = config_1.VERSION;
var instance_to_class_1 = instanceToClass$1;
src.instanceToClass = instance_to_class_1.instanceToClass;
const clone_class_1 = cloneClass$1;
src.cloneClass = clone_class_1.cloneClass;
src.default = clone_class_1.cloneClass;
const fn$2 = function(cls, settings = {}) {
  const stack = {};
  if (!isClass(cls)) {
    cls = cls.constructor;
  }
  if (settings.includeBaseClass === true) {
    stack[cls.name] = cls;
  }
  let baseClass = cls;
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
function __getMethods(toCheck) {
  let props = [];
  let obj = toCheck;
  do {
    const _props = Object.getOwnPropertyNames(obj);
    if (_props.indexOf("__defineGetter__") !== -1)
      continue;
    props = props.concat(_props);
  } while (obj = Object.getPrototypeOf(obj));
  return props.sort().filter(function(e, i, arr) {
    if (e != arr[i + 1] && typeof toCheck[e] == "function")
      return true;
  });
}
var dist = {};
Object.defineProperty(dist, "__esModule", { value: true });
const ranges = [
  { min: 1, max: 60, name: { short: "s", medium: "sec", long: "second" } },
  { max: 3600, name: { short: "m", medium: "min", long: "minute" } },
  { max: 86400, name: { short: "h", medium: "hr", long: "hour" } },
  { max: 86400 * 7, name: { short: "d", medium: "day", long: "day" } },
  { max: 86400 * 28, name: { short: "w", medium: "wk", long: "week" } },
  {
    min: 86400 * 31,
    max: 86400 * 365,
    name: { short: "m", medium: "mon", long: "month" }
  },
  {
    max: 86400 * 365 * 100,
    name: { short: "y", medium: "yr", long: "year" }
  }
];
function js_ago(timestamp, options = { format: "medium" }) {
  if (!["short", "medium", "long"].includes(options.format)) {
    throw new Error("The provided format is incorrect.");
  }
  const nowMs = (/* @__PURE__ */ new Date()).getTime();
  const tsDiff = timestamp instanceof Date ? (nowMs - timestamp.getTime()) / 1e3 : nowMs / 1e3 - timestamp;
  const index = ranges.findIndex((item) => item.max > tsDiff);
  const range2 = ranges[index];
  const prevIndex = index - 1;
  const min2 = range2.min || ranges[prevIndex].max;
  const diff = Math.ceil(tsDiff / min2);
  if (diff < 0) {
    throw new Error("The time difference is negative. The provided timestamp is in the future.");
  }
  const isShort = options.format === "short";
  const plural = diff > 1 && !isShort ? "s" : "";
  const wording = range2.name[options.format];
  return `${diff}${isShort ? "" : " "}${wording}${plural} ago`;
}
dist.default = js_ago;
function __wait$1(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
const fn$1 = function treatAsValue(promise, settings = {}) {
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
var __awaiter$v = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SPromise extends SClass.extends(Promise) {
  /**
   * @name        queue
   * @type        Function
   * @static
   * @async
   *
   * This static method allows you to pass an array of promises that will be executed one after the other.
   * It will call the "callback" function if specified with the resolved promise as argument.
   *
   * @param       {Promise[]}        promises        The array of promises to execute one after the other
   * @param       {Function}      [before=null]        A callback to call before each promises executions
   * @param       {Function}      [after=null]        A callback to call after each promises executions
   * @return      {SPromise}                            The promise that will be resolved once all promises are resolved
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static queue(promises, before, after) {
    return new SPromise(({ resolve, reject, pipe }) => __awaiter$v(this, void 0, void 0, function* () {
      const results = {};
      function next() {
        return __awaiter$v(this, void 0, void 0, function* () {
          const firstKey = Object.keys(promises)[0];
          let promise = promises[firstKey];
          if (typeof promise === "function")
            promise = promise();
          try {
            delete promises[firstKey];
            if (before)
              yield before(firstKey, promise);
            if (promise instanceof SPromise) {
              pipe(promise);
            }
            let res = yield promise;
            results[firstKey] = res;
            if (after) {
              let afterRes = yield after(firstKey, result);
              if (afterRes !== void 0)
                result[firstKey] = afterRes;
            }
            if (Object.keys(promises).length) {
              next();
            } else {
              resolve(results);
            }
          } catch (e) {
            reject(promise);
          }
        });
      }
      next();
    }));
  }
  /**
   * @name        treatAsValue
   * @type        Function
   * @static
   *
   * This function allows you to wrap a promise in a ```resolve``` call to prevent
   * this promise to be treated as a "chaining" promise but to be treated as
   * normal value passed in the resolve call.
   *
   * @param           {Promise}          promise          The promise to treat as a simple value
   * @return          {ITreatAsValueProxy}                             A proxy of this promise that will act just like a normal promise once getted by the "await" statement
   *
   * @since      2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static treatAsValue(promise, settings = {}) {
    return fn$1(promise, settings);
  }
  /**
   * @name          promiseSettings
   * @type          ISPromiseSettings
   * @get
   *
   * Access to the spromise settings
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  get promiseSettings() {
    var _a2;
    return (_a2 = this.settings.promise) !== null && _a2 !== void 0 ? _a2 : this.settings;
  }
  /**
   * @name                  constructor
   * @type                  Function
   *
   * Constructor
   *
   * @param         {Function}          executor          The executor function that will receive the resolve and reject ones...
   * @param         {Object}            [settings={}]     An object of settings for this particular SPromise instance. Here's the available settings:
   *
   * @example       js
   * const promise = new SPromise(({ resolve, reject, emit }) => {
   *    // do something...
   * }).then(value => {
   *    // do something...
   * }).finally(value => {
   *    // do something...
   * });
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(executorFnOrSettings = {}, settings) {
    var _a2;
    let executorFn, resolvers = {};
    super(__deepMerge({
      promise: {
        treatCancelAs: "resolve",
        destroyTimeout: 1,
        preventRejectOnThrow: false,
        emitLogErrorEventOnThrow: true,
        resolveAtResolveEvent: false,
        rejectAtRejectEvent: false,
        resolveProxies: [],
        rejectProxies: []
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
    this._eventEmitter = new SEventEmitter2(__deepMerge({
      metas: Object.assign({}, this.metas)
    }, (_a2 = this.settings.eventEmitter) !== null && _a2 !== void 0 ? _a2 : {}));
    this.expose(this._eventEmitter, {
      as: "eventEmitter",
      props: [
        "on",
        "off",
        "emit",
        "pipe",
        "pipeErrors",
        "pipeFrom",
        "pipeTo"
      ]
    });
    this.bind = this._eventEmitter.bind.bind(this);
    this._resolvers = resolvers;
    if (this.promiseSettings.destroyTimeout !== -1) {
      this.on("finally", (v, m) => {
        setTimeout(() => {
          this.destroy();
        }, this.promiseSettings.destroyTimeout);
      });
    }
    executorFn = typeof executorFnOrSettings === "function" ? executorFnOrSettings : null;
    if (executorFn) {
      const api = {};
      __getMethods(this).forEach((func) => {
        if (func.slice(0, 1) === "_")
          return;
        api[func] = this[func].bind(this);
      });
      (() => __awaiter$v(this, void 0, void 0, function* () {
        yield __wait$1(0);
        try {
          yield executorFn(api);
        } catch (e) {
          if (this.promiseSettings.emitLogErrorEventOnThrow) {
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
      this.on("resolve", (data2, metas) => {
        this.resolve(data2);
      });
    }
    if (this.promiseSettings.rejectAtRejectEvent) {
      this.on("reject", (data2, metas) => {
        this.reject(data2);
      });
    }
  }
  // you can also use Symbol.species in order to
  // return a Promise for then/catch/finally
  static get [Symbol.species]() {
    return Promise;
  }
  // Promise overrides his Symbol.toStringTag
  get [Symbol.toStringTag]() {
    return "SPromise";
  }
  /**
   * @name                    promiseState
   * @type                    String
   * @get
   *
   * Access the promise state. Can be one of these:
   * - pending: When the promise is waiting for resolution or rejection
   * - resolved: When the promise has been resolved
   * - rejected: When the promise has been rejected
   * - canceled: When the promise has been canceled
   * - destroyed: When the promise has been destroyed
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  get promiseState() {
    return this._promiseState;
  }
  /**
   * @name                  treatAsValue
   * @type                  Function
   *
   * This method wrap the promise into a revocable proxy to allow
   * passing this Promise to methods like ```then```, etc... and make
   * this promise treated as a value and not as a chained promise.
   * Once you have done with this behavior, you just have to call
   * the ```restorePromiseBehavior``` on the returned proxy and
   * the default promise behavior will be restored
   *
   * @param         {ITreatAsValueSettings}       [settings={}]     Some settings to configure your custom behavior
   * @return        {ITreatAsValueProxy}                            A custom proxy that you can revoke using the ```restorePromiseBehavior```
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  treatAsValue(settings = {}) {
    return fn$1(this, settings);
  }
  /**
   * @name             registerProxy
   * @type              Function
   *
   * ALlows you to register a proxy at a certain point of the promise lifecycle like:
   * - resolve: Allows you to edit the value that will be sent to the resolve point
   * - reject: Allows you to edit the value that will be sent to the reject point
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  registerProxy(point, proxy) {
    const ar = point.split(",").map((l) => l.trim());
    ar.forEach((a) => {
      if (a === "resolve") {
        this.settings.promise.resolveProxies.push(proxy);
      } else if (a === "reject") {
        this.settings.promise.rejectProxies.push(proxy);
      }
    });
  }
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
  is(status) {
    const statusArray = status.split(",").map((l) => l.trim());
    if (statusArray.indexOf(this._promiseState) !== -1)
      return true;
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
  isPending() {
    return this._promiseState === "pending";
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
  isResolved() {
    return this._promiseState === "resolved";
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
  isRejected() {
    return this._promiseState === "rejected";
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
  isCanceled() {
    return this._promiseState === "canceled";
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
  isDestroyed() {
    return this._promiseState === "destroyed";
  }
  /**
   * @name          resolve
   * @type          Function
   * @async
   *
   * This is the "resolve" method exposed on the promise itself for convinience
   *
   * @param         {Mixed}         arg       The value that you want to return back from the promise
   * @param       {Array|String}         [stacksOrder='resolve,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  resolve(arg, stacksOrder = "resolve,finally") {
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
   * @param       {Mixed}         arg           The argument that the promise user is sendind through the resolve function
   * @param       {Array|String}         [stacksOrder='resolve,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _resolve(arg, stacksOrder = "resolve,finally") {
    return __awaiter$v(this, void 0, void 0, function* () {
      if (this._promiseState === "destroyed")
        return;
      this._promiseState = "resolved";
      const stacksOrderArray = stacksOrder.split(",").map((l) => l.trim());
      for (let i = 0; i < stacksOrderArray.length; i++) {
        const stack = stacksOrderArray[i];
        arg = yield this.eventEmitter.emit(stack, arg);
      }
      for (const proxyFn of this.settings.promise.resolveProxies || []) {
        arg = yield proxyFn(arg);
      }
      this._resolvers.resolve(arg);
      return arg;
    });
  }
  /**
   * @name          reject
   * @type          Function
   * @async
   *
   * This is the "reject" method exposed on the promise itself for convinience
   *
   * @param         {Mixed}         arg       The value that you want to return back from the promise
   * @param       {Array|String}         [stacksOrder='catch,reject,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}      A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  reject(arg, stacksOrder = `catch,reject,finally`) {
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
   * @param         {Mixed}         arg       The value that you want to return back from the promise
   * @param       {Array|String}         [stacksOrder='catch,reject,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _reject(arg, stacksOrder = `catch,reject,finally`) {
    return __awaiter$v(this, void 0, void 0, function* () {
      if (this._promiseState === "destroyed")
        return;
      this._promiseState = "rejected";
      const stacksOrderArray = stacksOrder.split(",").map((l) => l.trim());
      for (let i = 0; i < stacksOrderArray.length; i++) {
        const stack = stacksOrderArray[i];
        arg = yield this.eventEmitter.emit(stack, arg);
      }
      for (const proxyFn of this.settings.promise.rejectProxies || []) {
        arg = yield proxyFn(arg);
      }
      this._resolvers.reject(arg);
      return arg;
    });
  }
  /**
   * @name          cancel
   * @type          Function
   * @async
   *
   * This is the "cancel" method exposed on the promise itself for convinience
   *
   * @param         {Mixed}         arg       The value that you want to return back from the promise
   * @param       {Array|String}         [stacksOrder='cancel,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  cancel(arg, stacksOrder = "cancel,finally") {
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
   * @param         {Mixed}           arg           The argument you want to pass to the cancel callbacks
   * @param       {Array|String}         [stacksOrder='cancel,finally']      This specify in which order have to be called the stacks
   * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _cancel(arg, stacksOrder = "cancel,finally") {
    if (this._promiseState === "destroyed")
      return;
    return new Promise((resolve, reject) => __awaiter$v(this, void 0, void 0, function* () {
      this._promiseState = "canceled";
      const stacksOrderArray = stacksOrder.split(",").map((l) => l.trim());
      for (let i = 0; i < stacksOrderArray.length; i++) {
        const stack = stacksOrderArray[i];
        arg = yield this.eventEmitter.emit(stack, arg);
      }
      if (this.settings.promise.treatCancelAs === "reject") {
        this._resolvers.reject(arg);
      } else {
        this._resolvers.resolve(arg);
      }
      resolve(arg);
    }));
  }
  /**
   * @name                catch
   * @type                Function
   *
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "catch", etc using
   * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   *
   * @param           {Number}          [callNumber=-1]     (Optional) How many times you want this callback to be called at max. -1 means unlimited
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   *
   * @example         js
   * new SPromise(({ resolve, reject }) => {
   *    // do something...
   *    reject('hello world');
   * }).catch(value => {
   *    // do something with the value that is "hello world"
   * }).catch(1, value => {
   *    // do something that will be executed only once
   * });
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  catch(...args) {
    super.catch(...args);
    return this.on("catch", ...args);
  }
  /**
   * @name                finally
   * @type                Function
   *
   * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
   * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "catch", etc using
   * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
   * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
   *
   * @param           {Function}        callback        The callback function to register
   * @return          {SPromise}                  The SPromise instance to maintain chainability
   *
   * @example         js
   * new SPromise(({ resolve, reject, emit }) => {
   *    // do something...
   *    resolve('hello world');
   * }).finally(value => {
   *    // do something with the value that is "hello world"
   * });
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  finally(...args) {
    return this.on("finally", ...args);
  }
  /**
   * @name                      destroy
   * @type                      Function
   *
   * Destroying the SPromise instance by unregister all the callbacks, etc...
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  destroy() {
    this._eventEmitter.destroy();
    this._promiseState = "destroyed";
  }
}
function __addEventListener($elm, eventNames, callback = null, useCapture = false) {
  if (!Array.isArray(eventNames))
    eventNames = eventNames.split(",").map((e) => e.trim());
  if (callback && typeof callback === "function")
    callback = callback;
  else if (callback && typeof callback === "boolean")
    useCapture = callback;
  const eventsStack = {};
  const promise = new SPromise({
    id: "addEventListener"
  }).on("finally", () => {
    eventNames.forEach((eventName) => {
      const stack = eventsStack[eventName];
      $elm.removeEventListener(eventName, stack.callback, stack.useCapture);
    });
  });
  eventNames.forEach((eventName) => {
    const internalCallback = (event) => {
      if (callback)
        callback.apply(this, [event]);
      promise.emit(eventName, event);
    };
    eventsStack[eventName] = {
      callback: internalCallback,
      useCapture
    };
    $elm.addEventListener(eventName, internalCallback, useCapture);
  });
  return promise;
}
function __addEventListenerOnce($elm, eventNames, callback = null, useCapture = false) {
  if (!Array.isArray(eventNames))
    eventNames = [eventNames];
  const globalPromise = new SPromise({
    id: "addEventListenerOnce"
  });
  const eventsStack = {};
  globalPromise.on("finally", () => {
    eventNames.forEach((eventName) => {
      eventsStack[eventName].promise.cancel();
    });
  });
  eventNames.forEach((eventName) => {
    const promise = __addEventListener($elm, eventName, null, useCapture);
    eventsStack[eventName] = {
      promise
    };
    promise.on(eventNames, (event) => {
      if (callback && typeof callback === "function") {
        callback.apply(this, [event]);
      }
      globalPromise.emit(eventName, event);
      promise.cancel();
    });
  });
  return globalPromise;
}
function __whenAnimationEnd($elm) {
  return new Promise((resolve) => {
    __addEventListenerOnce($elm, "animationend", (e) => {
      resolve($elm);
    });
  });
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __awaiter$u = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function __adoptStyleInShadowRoot($shadowRoot, $context = document) {
  return __awaiter$u(this, void 0, void 0, function* () {
    const $links = $context.querySelectorAll('link[rel="stylesheet"]');
    if ($links && $shadowRoot) {
      Array.from($links).forEach(($link) => __awaiter$u(this, void 0, void 0, function* () {
        $shadowRoot === null || $shadowRoot === void 0 ? void 0 : $shadowRoot.appendChild($link.cloneNode());
      }));
    }
    return true;
  });
}
var fastdom = { exports: {} };
(function(module) {
  !function(win) {
    var debug = function() {
    };
    var raf = win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.msRequestAnimationFrame || function(cb) {
      return setTimeout(cb, 16);
    };
    function FastDom() {
      var self2 = this;
      self2.reads = [];
      self2.writes = [];
      self2.raf = raf.bind(win);
    }
    FastDom.prototype = {
      constructor: FastDom,
      /**
       * We run this inside a try catch
       * so that if any jobs error, we
       * are able to recover and continue
       * to flush the batch until it's empty.
       *
       * @param {Array} tasks
       */
      runTasks: function(tasks) {
        var task;
        while (task = tasks.shift())
          task();
      },
      /**
       * Adds a job to the read batch and
       * schedules a new frame if need be.
       *
       * @param  {Function} fn
       * @param  {Object} ctx the context to be bound to `fn` (optional).
       * @public
       */
      measure: function(fn2, ctx) {
        var task = !ctx ? fn2 : fn2.bind(ctx);
        this.reads.push(task);
        scheduleFlush(this);
        return task;
      },
      /**
       * Adds a job to the
       * write batch and schedules
       * a new frame if need be.
       *
       * @param  {Function} fn
       * @param  {Object} ctx the context to be bound to `fn` (optional).
       * @public
       */
      mutate: function(fn2, ctx) {
        var task = !ctx ? fn2 : fn2.bind(ctx);
        this.writes.push(task);
        scheduleFlush(this);
        return task;
      },
      /**
       * Clears a scheduled 'read' or 'write' task.
       *
       * @param {Object} task
       * @return {Boolean} success
       * @public
       */
      clear: function(task) {
        return remove(this.reads, task) || remove(this.writes, task);
      },
      /**
       * Extend this FastDom with some
       * custom functionality.
       *
       * Because fastdom must *always* be a
       * singleton, we're actually extending
       * the fastdom instance. This means tasks
       * scheduled by an extension still enter
       * fastdom's global task queue.
       *
       * The 'super' instance can be accessed
       * from `this.fastdom`.
       *
       * @example
       *
       * var myFastdom = fastdom.extend({
       *   initialize: function() {
       *     // runs on creation
       *   },
       *
       *   // override a method
       *   measure: function(fn) {
       *     // do extra stuff ...
       *
       *     // then call the original
       *     return this.fastdom.measure(fn);
       *   },
       *
       *   ...
       * });
       *
       * @param  {Object} props  properties to mixin
       * @return {FastDom}
       */
      extend: function(props) {
        if (typeof props != "object")
          throw new Error("expected object");
        var child = Object.create(this);
        mixin(child, props);
        child.fastdom = this;
        if (child.initialize)
          child.initialize();
        return child;
      },
      // override this with a function
      // to prevent Errors in console
      // when tasks throw
      catch: null
    };
    function scheduleFlush(fastdom2) {
      if (!fastdom2.scheduled) {
        fastdom2.scheduled = true;
        fastdom2.raf(flush.bind(null, fastdom2));
      }
    }
    function flush(fastdom2) {
      var writes = fastdom2.writes;
      var reads = fastdom2.reads;
      var error;
      try {
        debug("flushing reads", reads.length);
        fastdom2.runTasks(reads);
        debug("flushing writes", writes.length);
        fastdom2.runTasks(writes);
      } catch (e) {
        error = e;
      }
      fastdom2.scheduled = false;
      if (reads.length || writes.length)
        scheduleFlush(fastdom2);
      if (error) {
        debug("task errored", error.message);
        if (fastdom2.catch)
          fastdom2.catch(error);
        else
          throw error;
      }
    }
    function remove(array, item) {
      var index = array.indexOf(item);
      return !!~index && !!array.splice(index, 1);
    }
    function mixin(target, source2) {
      for (var key in source2) {
        if (source2.hasOwnProperty(key))
          target[key] = source2[key];
      }
    }
    var exports = win.fastdom = win.fastdom || new FastDom();
    module.exports = exports;
  }(typeof window !== "undefined" ? window : commonjsGlobal);
})(fastdom);
var fastdomExports = fastdom.exports;
const __fastdom = /* @__PURE__ */ getDefaultExportFromCjs(fastdomExports);
function __isInViewport(elm, settings = {}) {
  settings = Object.assign({}, settings);
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop, scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
  const containerHeight = window.innerHeight || document.documentElement.clientHeight, containerWidth = window.innerWidth || document.documentElement.clientWidth, rect = elm.getBoundingClientRect();
  const top = rect.top - scrollTop, left = rect.left - scrollLeft, right = rect.right - scrollLeft, bottom = rect.bottom - scrollTop;
  const isTopIn = top - containerHeight <= 0, isBottomIn = bottom <= containerHeight, isLeftIn = left >= 0 && left <= containerWidth, isRightIn = right >= 0 && right <= containerWidth;
  if ((isTopIn || isBottomIn) && (isLeftIn || isRightIn)) {
    return true;
  }
  if (top <= 0 && bottom >= containerHeight && left <= 0 && right >= containerWidth) {
    return true;
  }
  if (top <= 0 && bottom >= containerHeight && left <= 0 && isRightIn) {
    return true;
  }
  if (top <= 0 && bottom >= containerHeight && right >= containerWidth && isLeftIn) {
    return true;
  }
  if (left <= 0 && right >= containerWidth && top <= 0 && isBottomIn) {
    return true;
  }
  if (left <= 0 && right >= containerWidth && bottom >= containerHeight && isTopIn) {
    return true;
  }
  return false;
}
var __awaiter$t = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function __whenEntersViewport(elm, settings = {}) {
  function getRootMargin() {
    return [
      `${Math.round(window.innerHeight * 0.15 * -1)}px`,
      `${Math.round(window.innerWidth * 0.15 * -1)}px`,
      `${Math.round(window.innerHeight * 0.15 * -1)}px`,
      `${Math.round(window.innerWidth * 0.15 * -1)}px`
    ].join(" ");
  }
  settings = Object.assign({}, settings);
  let observer, resizeTimeout;
  return new Promise((resolve) => __awaiter$t(this, void 0, void 0, function* () {
    var _a2;
    const options = {
      root: null,
      rootMargin: (_a2 = settings.offset) !== null && _a2 !== void 0 ? _a2 : getRootMargin(),
      threshold: 0
      // visible amount of item shown in relation to root
    };
    if (__isInViewport(elm)) {
      return resolve(elm);
    }
    function onChange(changes, observer2) {
      changes.forEach((change) => {
        var _a3;
        if (change.intersectionRatio > 0) {
          (_a3 = observer2.disconnect) === null || _a3 === void 0 ? void 0 : _a3.call(observer2);
          resolve(elm);
        }
      });
    }
    observer = new IntersectionObserver(onChange, options);
    observer.observe(elm);
    window.addEventListener("resize", (e) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        var _a3, _b2;
        (_a3 = observer.disconnect) === null || _a3 === void 0 ? void 0 : _a3.call(observer);
        options.rootMargin = (_b2 = settings.offset) !== null && _b2 !== void 0 ? _b2 : getRootMargin();
        observer = new IntersectionObserver(onChange, options);
        observer.observe(elm);
      }, 500);
    });
  }));
}
function __isNode$1() {
  return typeof process !== "undefined" && process.release && process.release.name === "node";
}
function getAvailableInterfaceTypes() {
  if (__isNode$1())
    return global._registeredInterfacesTypes || {};
  else if (window !== void 0)
    return window._registeredInterfacesTypes || {};
  else
    return {};
}
function __replaceTags(text, tags) {
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
      for (let i = 0; i < tagsArray.length; i++) {
        const t = tagsArray[i];
        const tagArgs = t.match(`<\\s*${tagName}[^>]*>((.*?))<\\s*/\\s*${tagName}>`);
        if (!tagArgs)
          continue;
        const tagToReplace = tagArgs[0];
        const tagContent = tagArgs[1];
        oneLineText = oneLineText.replace(tagToReplace, tags[tagName](tagName, tagContent));
      }
    }
    if (singleTagsArray) {
      for (let i = 0; i < singleTagsArray.length; i++) {
        const t = singleTagsArray[i];
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
const tagsMap = {
  black: (tag2, content) => `\x1B[30m${content}\x1B[0m`,
  red: (tag2, content) => `\x1B[1;31m${content}\x1B[0m`,
  green: (tag2, content) => `\x1B[1;32m${content}\x1B[0m`,
  yellow: (tag2, content) => `\x1B[1;33m${content}\x1B[0m`,
  blue: (tag2, content) => `\x1B[1;34m${content}\x1B[0m`,
  magenta: (tag2, content) => `\x1B[1;35m${content}\x1B[0m`,
  cyan: (tag2, content) => `\x1B[1;36m${content}\x1B[0m`,
  white: (tag2, content) => `\x1B[1;37m${content}\x1B[0m`,
  grey: (tag2, content) => `\x1B[1;30m${content}\x1B[0m`,
  bgBlack: (tag2, content) => `\x1B[40m${content}\x1B[0m`,
  bgRed: (tag2, content) => `\x1B[41m${content}\x1B[0m`,
  bgGreen: (tag2, content) => `\x1B[42m${content}\x1B[0m`,
  bgYellow: (tag2, content) => `\x1B[43m${content}\x1B[0m`,
  bgBlue: (tag2, content) => `\x1B[44m${content}\x1B[0m`,
  bgMagenta: (tag2, content) => `\x1B[45m${content}\x1B[0m`,
  bgCyan: (tag2, content) => `\x1B[46m${content}\x1B[0m`,
  bgWhite: (tag2, content) => `\x1B[47m${content}\x1B[0m`,
  bgGrey: (tag2, content) => `\x1B[48m${content}\x1B[0m`,
  bold: (tag2, content) => content,
  dim: (tag2, content) => content,
  italic: (tag2, content) => content,
  underline: (tag2, content) => content,
  strike: (tag2, content) => content,
  date: (tag2, content) => (/* @__PURE__ */ new Date()).getDate().toString().padStart("0", 2) + "-" + ((/* @__PURE__ */ new Date()).getMonth() + 1).toString().padStart("0", 2) + "-" + (/* @__PURE__ */ new Date()).getFullYear().toString().padStart("0", 2),
  time: (tag2, content) => (/* @__PURE__ */ new Date()).getHours().toString().padStart("0", 2) + ":" + (/* @__PURE__ */ new Date()).getMinutes().toString().padStart("0", 2) + ":" + (/* @__PURE__ */ new Date()).getMinutes().toString().padStart("0", 2),
  day: (tag2, content) => (/* @__PURE__ */ new Date()).getDate().toString().padStart("0", 2),
  days: (tag2, content) => (/* @__PURE__ */ new Date()).getDate().toString().padStart("0", 2),
  month: (tag2, content) => (/* @__PURE__ */ new Date()).getMonth().toString().padStart("0", 2),
  months: (tag2, content) => (/* @__PURE__ */ new Date()).getMonth().toString().padStart("0", 2),
  year: (tag2, content) => (/* @__PURE__ */ new Date()).getFullYear().toString().padStart("0", 2),
  years: (tag2, content) => (/* @__PURE__ */ new Date()).getFullYear().toString().padStart("0", 2),
  hour: (tag2, content) => (/* @__PURE__ */ new Date()).getHours().toString().padStart("0", 2),
  hours: (tag2, content) => (/* @__PURE__ */ new Date()).getHours().toString().padStart("0", 2),
  minute: (tag2, content) => (/* @__PURE__ */ new Date()).getMinutes().toString().padStart("0", 2),
  minutes: (tag2, content) => (/* @__PURE__ */ new Date()).getMinutes().toString().padStart("0", 2),
  second: (tag2, content) => (/* @__PURE__ */ new Date()).getSeconds().toString().padStart("0", 2),
  seconds: (tag2, content) => (/* @__PURE__ */ new Date()).getSeconds().toString().padStart("0", 2),
  br: (tag2, content) => "\n"
};
function __parseHtml(message) {
  let isArray2 = false;
  if (Array.isArray(message)) {
    isArray2 = true;
  } else {
    message = [message];
  }
  message = message.map((m) => {
    return __replaceTags(m, tagsMap);
  });
  if (isArray2)
    return message;
  return message[0];
}
function __typeOf(value, settings = {}) {
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
  else if (__isInteger(value))
    type = "Integer";
  else if (typeof value === "number")
    type = "Number";
  else if (typeof value === "boolean")
    type = "Boolean";
  else if (value instanceof RegExp)
    type = "RegExp";
  else if (settings.customClass === true && isClass(value) && value.name !== void 0) {
    type = __upperFirst(value.name);
  } else if (settings.customClass === true && value.constructor !== void 0 && value.constructor.name !== void 0) {
    type = __upperFirst(value.constructor.name);
  } else if (settings.customClass === false && isClass(value)) {
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
      const childType = __typeOf(valueToCheck, {
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
const fn = function(stack, callback, settings = {}) {
  settings = Object.assign({ newStack: false }, settings);
  const stackType = __typeOf(stack).toLowerCase();
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
    newStack = /* @__PURE__ */ new Map();
  else if (stackType === "set")
    newStack = /* @__PURE__ */ new Set();
  let value;
  let newValue;
  const _get = (s, k) => {
    switch (__typeOf(s).toLowerCase()) {
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
    switch (__typeOf(s).toLowerCase()) {
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
  for (let i = 0; i < loopOnKeys.length; i++) {
    const key = loopOnKeys[i];
    value = _get(stack, key);
    newValue = callback({ key, prop: key, value, i, idx: i });
    if (newValue === -1)
      break;
    _set(settings.newStack ? newStack : stack, key, newValue);
  }
  if (stackType === "string") {
    return newStack.join("");
  }
  return settings.newStack ? newStack : stack;
};
function parseSingleTypeString(typeString) {
  let ofStr = "", typeStr = typeString, ofTypes = [];
  if (typeStr.match(/^['"`]/)) {
    return {
      type: "string",
      of: void 0,
      value: typeStr.replace(/^['"`]/, "").replace(/['"`]$/, "")
    };
  }
  const autoCastedValue = __parse(typeStr);
  if (typeof autoCastedValue === "number") {
    return {
      type: "number",
      of: void 0,
      value: autoCastedValue
    };
  }
  typeStr = typeStr.trim().replace(/^([a-zA-Z0-9-_]+)\[\]$/, "array<$1>");
  const ofPartsString = typeStr.match(/<(.+)>$/gm);
  if (ofPartsString && ofPartsString.length) {
    ofStr = ofPartsString[0].replace("<", "").replace(">", "");
  }
  if (ofStr !== "") {
    typeStr = typeStr.replace(`<${ofStr}>`, "");
  }
  ofTypes = ofStr !== "" ? [ofStr] : void 0;
  if (ofStr !== void 0 && ofStr.includes("|")) {
    ofTypes = ofStr.split("|").map((t) => t.trim());
  }
  const result2 = {
    type: typeStr,
    of: ofTypes
  };
  Object.defineProperty(result2, "toString", {
    get() {
      return () => typeString;
    }
  });
  return result2;
}
function __parseTypeString(typeString) {
  const originalTypeString = typeString;
  typeString = typeString.trim();
  typeString = typeString.replace(/^\{/, "").replace(/\}$/, "");
  let isArray2 = false;
  if (typeString.match(/\)\[\]$/)) {
    isArray2 = true;
    typeString = typeString.replace(/\)\[\]$/, "").replace(/^\(/, "");
  }
  const firstTypes = [];
  let inSubLevel = 0, typeStr = "", areSubLevels = false;
  for (let i = 0; i < typeString.length; i++) {
    const char = typeString[i];
    if (["(", "<"].includes(char)) {
      inSubLevel++;
      areSubLevels = true;
      typeStr += "^";
    } else if ([")", ">"].includes(char)) {
      inSubLevel--;
      typeStr += "$";
    } else if (char === "|" && inSubLevel === 0) {
      firstTypes.push({
        areSubLevels,
        type: typeStr
      });
      typeStr = "";
    } else {
      typeStr += char;
    }
    if (inSubLevel < 0) {
      throw new Error(`It seems that your type string "${typeString}" is not valid...`);
    }
  }
  firstTypes.push({
    areSubLevels,
    type: typeStr
  });
  let finalTypes = [];
  firstTypes.forEach((type) => {
    if (type.areSubLevels) {
      finalTypes = [...finalTypes, ...__parseTypeString(type.type)];
    } else {
      finalTypes.push(parseSingleTypeString(type.type.replace("^", "<").replace("$", ">")));
    }
  });
  if (isArray2) {
    const result2 = [
      {
        type: "array",
        of: finalTypes
      }
    ];
    result2.__proto__.toString = () => originalTypeString;
    return result2;
  }
  finalTypes = __deepMap(finalTypes, ({ object, prop, value, path: path2 }) => {
    if (typeof value === "string") {
      value = value.replace(/^\./, "").trim();
    }
    return value;
  });
  Object.defineProperty(finalTypes, "toString", {
    get() {
      return () => originalTypeString;
    }
  });
  return finalTypes;
}
class STypeResult {
  /**
   * @name       typeString
   * @type       string
   * @get
   *
   * Access the type in string format
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get typeString() {
    return this._data.typeString;
  }
  /**
   * @name       value
   * @type       string
   * @get
   *
   * Access the value passed to be type validated
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get value() {
    return this._data.value;
  }
  /**
   * @name       received
   * @type       ISTypeResultReceived
   * @get
   *
   * Access the received descriptor object
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get received() {
    return this._data.received;
  }
  /**
   * @name       expected
   * @type       ISTypeResultExpected
   * @get
   *
   * Access the expected descriptor object
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get expected() {
    return this._data.expected;
  }
  /**
   * @name       issues
   * @type       ISTypeResultIssueObj[]
   * @get
   *
   * Access the issues array
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get issues() {
    return this._data.issues;
  }
  /**
   * @name       settings
   * @type       ISTypeResultSettings
   * @get
   *
   * Access the settings object
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get settings() {
    return this._data.settings;
  }
  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(data2) {
    this._data = data2;
  }
  /**
   * @name          hasIssues
   * @type          Function
   *
   * Return true if some issues have been detected, false if not
   *
   * @return        {Boolean}       true if has some issues, false if not
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  hasIssues() {
    if (this._data)
      return true;
    return false;
  }
  /**
   * @name             toString
   * @type              Functio n
   *
   * This method return a string terminal compatible or html of this result object
   *
   * @return        {String}                The result object in string format
   *
   * @since          2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toString() {
    if (__isNode$2()) {
      return this.toConsole();
    } else {
      return `The method "toHtml" has not being integrated for now...`;
    }
  }
  /**
   * @name          toConsole
   * @type          Function
   *
   * This method simply returns you a terminal compatible string
   * of the interface checking result
   *
   * @return        {String}                A string compatible with the terminal
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
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
    return __parseHtml(`
${headerArray.join("\n")}
${issuesArray.join("\n")}
${this.settings.verbose ? settingsArray.join("\n") : ""}
    `).trim();
  }
}
function __isNode() {
  return typeof process !== "undefined" && process.release && process.release.name === "node";
}
function __getAvailableInterfaceTypes() {
  if (__isNode())
    return global._registeredInterfacesTypes || {};
  else if (window !== void 0)
    return window._registeredInterfacesTypes || {};
  else
    return {};
}
class SType {
  /**
   * @name      registerType
   * @type      Function
   * @static
   *
   * This static method allows you to register a new rule
   * by passing a valid ISDescriptorRule object
   *
   * @param     {ISDescriptorRule}        rule        The rule object to register
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static registerType(type) {
    if (type.id === void 0 || typeof type.id !== "string") {
      throw new Error(`Sorry but you try to register a type that does not fit the ISTypeDescriptor interface...`);
    }
    this._registeredTypes[type.id] = type;
  }
  /**
   * @name      parseTypeString
   * @type      Function
   * @static
   *
   * This static method allows you to parse a type string.
   *
   * @param     {String}        typeString      The type string to parse
   * @return    {ITypeStringObject[]}             An array of object(s) describing the type string passed
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static parseTypeString(typeString) {
    return __parseTypeString(typeString);
  }
  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(typeString, settings = {}) {
    this.typeString = typeString;
    typeString = typeString.toLowerCase().trim();
    if (this.constructor._instanciatedTypes[typeString] !== void 0)
      return this.constructor._instanciatedTypes[typeString];
    if (typeString.includes("[]")) {
      console.log(typeString);
    }
    this.types = __parseTypeString(typeString);
    if (typeString.includes("[]")) {
      console.log(this.types);
    }
    this.settings = __deepMerge({
      id: this.constructor.name,
      name: this.constructor.name,
      customTypes: true,
      interfaces: true
    }, settings);
    this.constructor._instanciatedTypes[typeString] = this;
  }
  /**
   * @name      is
   * @type      Function
   *
   * This method make a simple check to see if the passed value correspond to the
   * type that this instance represent.
   * Same as the ```check``` method, but return only a Boolean.
   *
   * @param     {Any}       value       The value to check
   * @param     {ISTypeSettings}        [settings={}]     Some settings to configure your check
   * @return    {Boolean}               true if correspond, false if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  is(value, settings = {}) {
    const res = this.check(value, settings);
    if (res === true)
      return true;
    else if (res instanceof STypeResult)
      return !res.hasIssues();
    return true;
  }
  /**
   * @name        check
   * @type        Function
   *
   * This method allows you to make sure the passed value correspond with the type(s)
   * this instance represent
   * If all is ok, return true, otherwise return an instance of the STypeResult class that
   * describe what is wrong
   *
   * @param     {Any}       value       The value to check
   * @param     {ISTypeSettings}        [settings={}]     Some settings to configure your check
   * @return    {Boolean|STypeResult}               true if correspond, an instance of the STypeResult class if not
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  check(value, settings = {}) {
    settings = __deepMerge(this.settings, settings);
    const issues = {};
    for (let i = 0; i < this.types.length; i++) {
      const typeObj = this.types[i], typeId = typeObj.type;
      const res2 = this._isType(value, typeId, settings);
      if (res2 === true) {
        if (typeObj.of === void 0)
          return true;
        const typeOf2 = __typeOf(value);
        if (typeOf2 !== "Array" && typeOf2 !== "Object" && typeOf2 !== "Map") {
          throw new Error(`Sorry but you have specified a type string "<yellow>${this.typeString}</yellow>" with some "<...>" definition on a type "<cyan>${typeOf2}</cyan>" that does not support "child" value(s)...`);
        }
        const loopOn = typeOf2 === "Object" ? Object.keys(value) : Array.from(value.keys());
        if (!loopOn.length)
          return true;
        for (let k = 0; k < loopOn.length; k++) {
          for (let j = 0; j < typeObj.of.length; j++) {
            const type = typeObj.of[j];
            const idx = loopOn[k];
            const v = typeOf2 === "Map" ? value.get(idx) : value[idx];
            const ofRes = this._isType(v, type, settings);
            if (ofRes !== true) {
              issues[typeObj.type] = {
                expected: {
                  type: typeObj.type
                },
                received: {
                  type: __typeOf(v),
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
            type: __typeOf(value),
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
        type: __typeOf(value)
      },
      issues,
      settings
    });
    return res;
  }
  /**
   * @name          _isType
   * @type          Function
   * @private
   *
   * This method simply take a type string like "string", "array", etc..., a value and
   * check if this value correspond to the passed type
   *
   * @param     {Any}       value       The value to validate
   * @param     {String}    type        The type to check the value with
   * @return    {Boolean}               true if all if ok, false if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  _isType(value, type, settings = {}) {
    settings = __deepMerge(this.settings, settings);
    if (this.constructor._registeredTypes[type.toLowerCase()] === void 0) {
      if (settings.interfaces === true) {
        const availableInterfaceTypes = __getAvailableInterfaceTypes();
        if (availableInterfaceTypes[type] !== void 0) {
          const res = availableInterfaceTypes[type].apply(value, {});
          return res;
        }
      }
      if (settings.customTypes === true) {
        const typeOf2 = __typeOf(value).toLowerCase();
        const extendsStack = Object.keys(fn$2(value)).map((s) => s.toLowerCase());
        if (type === typeOf2 || extendsStack.indexOf(type) !== -1)
          return true;
      }
      throw new Error(`Sorry but you try to validate a value with the type "<yellow>${type}</yellow>" but this type is not registered...`);
    }
    return this.constructor._registeredTypes[type.toLowerCase()].is(value);
  }
  /**
   * @name          cast
   * @type          Function
   *
   * This method allows you to cast the passed value to the wanted type.
   * !!! If multiple types are passed in the typeString, the first one that
   * is "castable" to will be used.
   *
   * @param     {Any}         value         The value you want to cast
   * @param     {ISTypeSettings}      [settings={}]       Some settings you want to override
   * @return    {Any|Error}                         The casted value, or undefined if cannot be casted
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  cast(value, params, settings) {
    settings = __deepMerge(this.settings, settings);
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
    for (let i = 0; i < this.types.length; i++) {
      const typeObj = this.types[i], typeId = typeObj.type;
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
        throw new Error(__parseHtml(issueStr));
      } else if (typeObj.of !== void 0) {
        const sTypeInstance = new SType(typeObj.of.join("|"));
        castedValue = fn(castedValue, ({ value: value2 }) => {
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
      `Sorry but the value of type "<cyan>${__typeOf(value)}</cyan>" passed to be casted in type "<yellow>${this.typeString}</yellow>" can not be casted correctly. Here's why:
`
    ];
    Object.keys(verboseObj.issues).forEach((descriptorId) => {
      stack.push(`- <red>${descriptorId}</red>: ${verboseObj.issues[descriptorId]}`);
    });
    throw new Error(__parseHtml(stack.join("\n")));
  }
  /**
   * @name          canHaveChilds
   * @type          Function
   *
   * This method simply take a value and return true if can have child(s), false if not
   *
   * @param       {Any}       value       The value to check
   * @return      {Boolean}         true if can have child(s) (Object, Array and Map), false if not
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  canHaveChilds(value) {
    const type = __typeOf(value);
    return type === "Array" || type === "Object" || type === "Map";
  }
  /**
   * @name          name
   * @type          String
   * @get
   *
   * Access the descriptor name. Either the value of settings.name, or the constructor name
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  get name() {
    return this.settings.name;
  }
  /**
   * @name          id
   * @type          String
   * @get
   *
   * Access the descriptor id. Either the value of settings.name, or the constructor name
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  get id() {
    return this.settings.id;
  }
}
SType._instanciatedTypes = {};
SType._registeredTypes = {};
const descriptor$g = {
  name: "Array",
  id: "array",
  is: (value) => {
    return Array.isArray(value);
  },
  cast: (value, params = {}) => {
    if (!value)
      return [];
    if (params.splitChars && Array.isArray(params.splitChars)) {
      if (value === true)
        value = "";
      value = value.split(new RegExp(`(${params.splitChars.join("|")})`, "gm")).filter((l) => l.trim() !== "" && params.splitChars.indexOf(l) === -1);
    }
    if (Array.isArray(value))
      return value;
    return [value];
  }
};
const descriptor$f = {
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
const descriptor$e = {
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
const descriptor$d = {
  name: "Class",
  id: "class",
  is: (value) => isClass(value),
  cast: (value) => {
    return new Error(`Sorry but nothing is castable to a Class`);
  }
};
const descriptor$c = {
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
    if (__isPlainObject(value)) {
      const now = /* @__PURE__ */ new Date();
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
const descriptor$b = {
  name: "Function",
  id: "function",
  is: (value) => typeof value === "function",
  cast: (value) => {
    return new Error(`Sorry but nothing is castable to a Function`);
  }
};
const descriptor$a = {
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
const descriptor$9 = {
  name: "Map",
  id: "map",
  is: (value) => __isMap(value),
  cast: (value) => {
    if (__isMap(value))
      return value;
    const map2 = /* @__PURE__ */ new Map();
    map2.set("value", value);
    return map2;
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
  name: "Number",
  id: "number",
  is: (value) => typeof value === "number",
  cast: (value) => {
    if (typeof value !== "string") {
      return new Error(`Sorry but only strings can be casted to numbers...`);
    }
    const res = parseFloat(value);
    if (isNaN(res)) {
      return new Error(`Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Number</green> does not work...`);
    }
    return res;
  }
};
const descriptor$6 = {
  name: "Object",
  id: "object",
  is: (value) => __isObject(value),
  cast: (value) => {
    if (__isObject(value))
      return value;
    return {
      value
    };
  }
};
const descriptor$5 = {
  name: "Set",
  id: "set",
  is: (value) => value instanceof Set,
  cast: (value) => {
    if (value instanceof Set)
      return value;
    const set = /* @__PURE__ */ new Set();
    set.add(value);
    return set;
  }
};
const descriptor$4 = {
  name: "String",
  id: "string",
  is: (value) => {
    return __isString(value);
  },
  cast: (value) => fn$3(value, {
    beautify: true
  })
};
const descriptor$3 = {
  name: "Symbol",
  id: "symbol",
  is: (value) => typeof value === "symbol",
  cast: (value) => {
    if (typeof value === "symbol")
      return value;
    return Symbol(value);
  }
};
const descriptor$2 = {
  name: "Undefined",
  id: "undefined",
  is: (value) => value === void 0,
  cast: (value) => {
    return void 0;
  }
};
const descriptor$1 = {
  name: "WeakMap",
  id: "weakmap",
  is: (value) => value instanceof WeakMap,
  cast: (value) => {
    return new Error(`Sorry but nothing can be casted to a WeakMap for now`);
  }
};
const descriptor = {
  name: "WeakSet",
  id: "weakset",
  is: (value) => value instanceof WeakSet,
  cast: (value) => {
    return new Error(`Sorry but nothing can be casted to a WeakSet for now`);
  }
};
SType.registerType(descriptor$4);
SType.registerType(descriptor$9);
SType.registerType(descriptor$6);
SType.registerType(descriptor$g);
SType.registerType(descriptor$a);
SType.registerType(descriptor$7);
SType.registerType(descriptor$e);
SType.registerType(descriptor$2);
SType.registerType(descriptor$8);
SType.registerType(descriptor$3);
SType.registerType(descriptor$f);
SType.registerType(descriptor$c);
SType.registerType(descriptor$b);
SType.registerType(descriptor$1);
SType.registerType(descriptor);
SType.registerType(descriptor$5);
SType.registerType(descriptor$d);
class SDescriptorResult extends SClass {
  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
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
  /**
   * @name           hasIssues
   * @type           Function
   *
   * This method return true if theirs no issues, false if not
   *
   * @return        {Boolean}           true if no issue(s), false if not
   *
   * @since          2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  hasIssues() {
    return Object.keys(this._issues).length >= 1;
  }
  /**
   * @name           add
   * @type           Function
   *
   * This method is used to add a rule result to the global descriptor result.
   *
   * @param         {ISDescriptorResultRule}        ruleResult      The rule result object you want to add
   *
   * @since          2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  add(ruleResult) {
    if (!ruleResult.__ruleObj.id)
      return;
    this._issues[ruleResult.__ruleObj.id] = ruleResult;
  }
  /**
   * @name             toString
   * @type              Functio n
   *
   * This method return a string terminal compatible of this result object
   *
   * @return        {String}                The result object in string format
   *
   * @since          2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toString() {
    if (__isNode$2()) {
      return this.toConsole();
    } else {
      return this.toConsole();
    }
  }
  /**
   * @name             toConsole
   * @type              Function
   *
   * This method return a string terminal compatible of this result object
   *
   * @return        {String}                The result object in string format
   *
   * @since          2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
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
    return __parseHtml(`
${headerArray.join("\n")}
${issuesArray.join("\n")}
${settingsArray.join("\n")}
    `).trim();
  }
}
class SDescriptor extends SClass {
  /**
   * @name      registerRule
   * @type      Function
   * @static
   *
   * This static method allows you to register a new rule
   * by passing a valid ISDescriptorRule object
   *
   * @param     {ISDescriptorRule}        rule        The rule object to register
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com>
   */
  static registerRule(rule) {
    if (rule.id === void 0 || typeof rule.id !== "string") {
      throw new Error(`Sorry but you try to register a rule that does not fit the ISDescriptionRule interface...`);
    }
    this._registeredRules[rule.id] = rule;
  }
  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(settings) {
    super(__deepMerge({
      rules: {},
      type: "Object",
      arrayAsValue: false,
      throwOnMissingRule: false,
      defaults: true
    }, settings !== null && settings !== void 0 ? settings : {}));
  }
  /**
   * @name          apply
   * @type          Function
   *
   * This method simply apply the descriptor instance on the passed value.
   * The value can be anything depending on the descriptor you use.
   * When you pass an Array, by default it will apply the descriptor on
   * each array items. If you don't want this behavior and the Array passed has to be
   * treated as a single value, pass the "arrayAsValue" setting to true
   *
   * @param       {Any}       value         The value to apply the descriptor on
   * @param       {ISDescriptorSettings}        [settings={}]       An object of settings to configure your descriptor. These settings will override the base ones passed in the constructor
   * @return      {ISDescriptorResultObj|true}           Will return true if all is ok, and an object describing the issue if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  apply(value, settings) {
    const set = __deepMerge(this.settings, settings || {});
    if (value === void 0 || value === null)
      value = {};
    const valuesObjToProcess = {}, finalValuesObj = {};
    this._descriptorResult = new SDescriptorResult(this, finalValuesObj, Object.assign({}, set));
    const rules = set.rules;
    const typeInstance = new SType(set.type);
    if (!typeInstance.is(value)) {
      throw new Error(`Sorry but this descriptor "<yellow>${this.metas.name}</yellow>" does not accept values of type "<cyan>${__typeOf(value)}</cyan>" but only "<green>${set.type}</green>"...`);
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
  /**
   * @name          _validate
   * @type          Function
   * @private
   *
   * This method take a value and validate it using the defined rules
   *
   * @param       {Any}       value       The value to validate
   * @return      {ISDescriptionValidationResult|true}        true if the validation has been made correctly, an object describing the issue if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
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
      const obj = {
        __error: ruleResult,
        __ruleObj: ruleObj2,
        __propName: propName
      };
      if (this._descriptorResult) {
        this._descriptorResult.add(obj);
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
const ruleObj$2 = {
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
const ruleObj$1 = {
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
const ruleObj = {
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
SDescriptor.registerRule(ruleObj$1);
SDescriptor.registerRule(ruleObj);
SDescriptor.registerRule(ruleObj$2);
SDescriptor.registerRule(ruleObj$3);
function __parseArgs(string, settings) {
  settings = __deepMerge({
    valueQuote: void 0,
    treatNoAsBoolean: true,
    camelCase: true
  }, settings !== null && settings !== void 0 ? settings : {});
  string = string.trim();
  string = string.replace(/(["'`])--/gm, "$1--§ --");
  if (settings.treatNoAsBoolean) {
    const noMatches = string.match(/--no-[\w]+/g);
    noMatches === null || noMatches === void 0 ? void 0 : noMatches.forEach((match2) => {
      string = string.replace(match2, `${match2.replace("--no-", "--")} false`);
    });
  }
  let valueQuote = settings.valueQuote;
  if (!valueQuote) {
    for (let i = 0; i < string.length; i++) {
      const char = string[i];
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
  if (string.match(/^\(/) && string.match(/\)$/)) {
    isFunctionStyle = true;
    string = string.slice(1, -1);
    let currentStr = "";
    let parenthesisCount = 0;
    let quotesCount = 0;
    for (let i = 0; i < string.length; i++) {
      const char = string[i];
      const previousChar = string[i - 1] || string[0];
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
    for (let i = 0; i < string.length; i++) {
      const char = string[i];
      const previousChar = string[i - 1] || string[0];
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
  if (stringArray)
    stringArray = stringArray.map((item) => __unquote(item));
  let argsObj = {};
  let currentArgName = void 0;
  let currentValue;
  stringArray = stringArray.forEach((part, i) => {
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
        currentValue = currentValue.replace("--§ ", "");
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
        argsObj[i] = currentValue;
      }
    }
  });
  if (settings.camelCase) {
    argsObj = __camelCaseProps(argsObj);
  }
  Object.keys(argsObj).forEach((key) => {
    const value = argsObj[key];
    if (value === void 0)
      delete argsObj[key];
  });
  return argsObj;
}
try {
  if (global)
    global._registeredInterfacesTypes = {};
  else
    window._registeredInterfacesTypes = {};
} catch (e) {
}
class SInterface extends SClass {
  static get definition() {
    var _a2, _b2;
    if (this._cachedDefinition)
      return this._cachedDefinition;
    this._cachedDefinition = (_a2 = this._definition) !== null && _a2 !== void 0 ? _a2 : {};
    for (let [prop, value] of Object.entries(this._cachedDefinition)) {
      if (typeof ((_b2 = value.type) === null || _b2 === void 0 ? void 0 : _b2.type) === "string") {
        if (value.type.type.match(/\[\]/)) {
          this._cachedDefinition[prop].type.type = value.type.type.replace(/([a-zA-Z0-9-_]+)\[\]/gm, "Array<$1>");
          continue;
        }
      }
      if (typeof value.type === "string") {
        if (value.type.match(/\[\]/)) {
          this._cachedDefinition[prop].type = value.type.replace(/([a-zA-Z0-9-_]+)\[\]/gm, "Array<$1>");
        }
      }
    }
    return this._cachedDefinition;
  }
  static set definition(value) {
    this._cachedDefinition = value;
  }
  static registerRenderer(rendererClass) {
    if (!rendererClass.id) {
      throw new Error(`Sorry but the interface renderer "<yellow>${rendererClass.name}</yellow>" that you want to register is missing the required <yellow>static</yellow> <green>id</green> property...`);
    }
    this._registeredRenderers[rendererClass.id] = rendererClass;
  }
  /**
   * @name      mix
   * @type      Function
   * @static
   *
   * This static method allows you to mix multiple interfaces into one
   *
   * @param     {SInterface[]}      ...ints       The interfaces to mix together
   * @return    {SInterface}                          The mixed interface
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static mix(...ints) {
    const newInt = new SInterface();
    ints.forEach((int) => {
      if (int.definition) {
        newInt.definition = __deepMerge(newInt.definition, int.definition);
      }
    });
    return newInt;
  }
  /**
   * @name      overrie
   * @type      Function
   * @static
   *
   * This static method is usefull to make a duplicate of the base interface with some updates
   * in the definition object.
   *
   * @param     {Object}      definition      A definition object to override or extends the base one
   * @return    {SInterface}                  A new interface overrided with your new values
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static override(definition) {
    const _this = this;
    class SInterfaceOverrided extends this {
    }
    SInterfaceOverrided.overridedName = `${_this.name} (overrided)`;
    SInterfaceOverrided.definition = __deepMerge(_this.definition, definition);
    return SInterfaceOverrided;
  }
  /**
   * @name            isDefault
   * @type            Function
   * @static
   *
   * This static method allows you to check if a certain value is the default of a certain property or not.
   *
   * @param           {String}            prop        The property to check if it's the default of or not
   * @param           {Any}               value       The value to check with
   * @return          {Boolean}                       true if is the default value, false if not
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static isDefault(prop, value) {
    const defaults = this.defaults();
    if (defaults[prop] === void 0) {
      return false;
    }
    if (defaults[prop] === value) {
      return true;
    }
    return false;
  }
  /**
   * @name            getAvailableTypes
   * @type            Function
   * @static
   *
   * This static method allows you to get the types that have been make widely available
   * using the ```makeAvailableAsType``` method.
   *
   * @return      {Object<SInterface>}          An object listing all the interface types maked available widely
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static getAvailableTypes() {
    return getAvailableInterfaceTypes();
  }
  /**
   * @name            makeAvailableAsType
   * @type            Function
   * @static
   *
   * This static method allows you to promote your interface at the level where it can be
   * used in the "type" interface definition property like so "Object<MyCoolType>"
   *
   * @param       {String}      [name=null]       A custom name to register your interface. Otherwise take the class name and register two types: MyClassInterface => MyClassInterface && MyClass
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static makeAvailableAsType(name2 = null) {
    const n = (name2 || this.name).toLowerCase();
    if (global !== void 0) {
      global._registeredInterfacesTypes[n] = this;
      global._registeredInterfacesTypes[n.replace("interface", "")] = this;
    } else if (window !== void 0) {
      window._registeredInterfacesTypes[n] = this;
      window._registeredInterfacesTypes[n.replace("interface", "")] = this;
    }
  }
  /**
   * @name              toObject
   * @type              Function
   * @static
   *
   * This function allows you to get back a simple object describing the interface
   *
   * @return              {ISInterfaceObj}                The interface in plain object format
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static toObject() {
    var _a2;
    return {
      name: this.name,
      description: (_a2 = this.description) !== null && _a2 !== void 0 ? _a2 : "",
      definition: Object.assign({}, this.definition)
    };
  }
  /**
   * @name              defaults
   * @type              Function
   * @static
   *
   * This function simply returns you the default interface values in object format
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
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
  /**
   * @name              apply
   * @type              Function
   * @static
   *
   * This static method allows you to apply the interface on an object instance.
   * By default, if something is wrong in your class implementation, an error with the
   * description of what's wrong will be thrown. You can change that behavior if you prefer having
   * true returned when all is ok, or a string describing the current issue by specify the "settings.throw" property to false.
   *
   * @param       {Any}                objectOrString              The object on which to apply the interface on, or a cli string to use as input
   * @param       {ISInterfaceSettings}               [settings={}]         An object of settings to configure your apply process
   * - return (String) {String}: Specify in which return you want the result back. Can be "String" of "Object".
   * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static apply(objectOrString, settings) {
    const int = new this({
      interface: settings !== null && settings !== void 0 ? settings : {}
    });
    return int.apply(objectOrString);
  }
  /**
   * @name            help
   * @type            Function
   * @static
   *
   * This static method allows you to get back the help using the
   * passed renderer. Awailable rendered are for now:
   * - terminal (default): The default terminal renderer
   * - more to come depending on needs...
   *
   * @param         {String}          [renderer="terminal"]        The registered renderer you want to use.
   * @param         {ISInterfaceRendererSettings}     [settings={}]     Some settings to configure your render
   *
   * @setting     {'terminal'}        [renderer="terminal"]       The renderer you want to use.
   * @setting     {Array<String>}     [exclude=['help']]                An array of properties you don't want to render
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
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
  /**
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(settings) {
    super(__deepMerge({
      stripUnkown: false
    }, settings !== null && settings !== void 0 ? settings : {}));
    this._definition = {};
    this._definition = this.constructor.definition;
  }
  /**
   * @name              apply
   * @type              Function
   *
   * This method allows you to apply the interface on an object instance.
   * By default, if something is wrong in your class implementation, an error with the
   * description of what's wrong will be thrown. You can change that behavior if you prefer having
   * true returned when all is ok, or a string describing the current issue by specify the "settings.throw" property to false.
   *
   * @param       {Any}                objectOrString              The object on which to apply the interface on, or a cli like string to use as input
   * @param       {ISInterfaceSettings}               [settings={}]         An object of settings to configure your apply process
   * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  apply(objectOrString, settings) {
    var _a2;
    const set = __deepMerge(this.settings, settings !== null && settings !== void 0 ? settings : {});
    let objectOnWhichToApplyInterface = objectOrString;
    if (typeof objectOrString === "string") {
      objectOnWhichToApplyInterface = __parseArgs(objectOrString);
      Object.keys(objectOnWhichToApplyInterface).forEach((argName) => {
        for (let i = 0; i < Object.keys(this._definition).length; i++) {
          const defArgName = Object.keys(this._definition)[i];
          const obj = this._definition[defArgName];
          if (obj.explicit) {
            if (obj.alias && ` ${objectOrString} `.match(new RegExp(`\\s-${obj.alias}\\s`))) {
              return;
            } else if (` ${objectOrString} `.match(new RegExp(`\\s--${argName}\\s`))) {
              return;
            }
            delete objectOnWhichToApplyInterface[argName];
          }
        }
      });
      Object.keys(objectOnWhichToApplyInterface).forEach((argName) => {
        for (let i = 0; i < Object.keys(this._definition).length; i++) {
          const defArgName = Object.keys(this._definition)[i];
          const obj = this._definition[defArgName];
          if (!obj.alias)
            continue;
          if (obj.alias === argName && objectOnWhichToApplyInterface[defArgName] === void 0) {
            objectOnWhichToApplyInterface[defArgName] = objectOnWhichToApplyInterface[argName];
            delete objectOnWhichToApplyInterface[argName];
          }
        }
      });
      Object.keys(objectOnWhichToApplyInterface).forEach((argName, i) => {
        if (argName === `${i}`) {
          const definitionKeys = Object.keys(this._definition);
          if (definitionKeys[i]) {
            objectOnWhichToApplyInterface[definitionKeys[i]] = objectOnWhichToApplyInterface[argName];
          }
          delete objectOnWhichToApplyInterface[argName];
        }
      });
    }
    const descriptor2 = new SDescriptor(Object.assign({ type: "Object", rules: this._definition }, (_a2 = set.descriptor) !== null && _a2 !== void 0 ? _a2 : {}));
    if (set.baseObj) {
      objectOnWhichToApplyInterface = __deepMerge(set.baseObj, objectOnWhichToApplyInterface);
    }
    for (let [key, value] of Object.entries(this._definition)) {
      if (__isPlainObject(value.default) && __isPlainObject(objectOnWhichToApplyInterface[key])) {
        objectOnWhichToApplyInterface[key] = __deepMerge(value.default, objectOnWhichToApplyInterface[key]);
      }
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
class WhenInteractSettingsInterface extends SInterface {
  static get _definition() {
    return {
      pointerover: {
        description: "Specify if the pointerover event has to be used",
        type: "Boolean",
        default: true
      },
      pointerout: {
        description: "Specify if the pointerout event has to be used",
        type: "Boolean",
        default: true
      },
      click: {
        description: "Specify if the click event has to be used",
        type: "Boolean",
        default: true
      },
      touchstart: {
        description: "Specify if the touchstart event has to be used",
        type: "Boolean",
        default: true
      },
      touchend: {
        description: "Specify if the touchend event has to be used",
        type: "Boolean",
        default: true
      },
      focus: {
        description: "Specify if the focus event has to be used",
        type: "Boolean",
        default: true
      }
    };
  }
}
function __whenInteract(elm, settings) {
  return new Promise((resolve, reject) => {
    settings = WhenInteractSettingsInterface.apply(settings !== null && settings !== void 0 ? settings : {});
    function interacted(interaction) {
      resolve(interaction);
      elm.removeEventListener("pointerover", pointerover);
      elm.removeEventListener("pointerout", pointerout);
      elm.removeEventListener("pointerdown", pointerdown);
      elm.removeEventListener("touchstart", touchstart);
      elm.removeEventListener("touchend", touchend);
      elm.removeEventListener("focus", focus);
      elm.removeEventListener("focusin", focus);
    }
    function pointerover(e) {
      interacted("pointerover");
    }
    if (settings.pointerover) {
      elm.addEventListener("pointerover", pointerover);
    }
    function pointerout(e) {
      interacted("pointerout");
    }
    if (settings.pointerout) {
      elm.addEventListener("pointerout", pointerout);
    }
    function pointerdown(e) {
      interacted("pointerdown");
    }
    if (settings.pointerdown) {
      elm.addEventListener("pointerdown", pointerdown);
    }
    function touchstart(e) {
      interacted("touchstart");
    }
    if (settings.touchstart) {
      elm.addEventListener("touchstart", touchstart, {
        passive: true
      });
    }
    function touchend(e) {
      interacted("touchend");
    }
    if (settings.touchend) {
      elm.addEventListener("touchend", touchend);
    }
    function focus(e) {
      interacted("focus");
    }
    if (settings.focus === true) {
      elm.addEventListener("focus", focus);
      elm.addEventListener("focusin", focus);
    }
  });
}
function __whenInViewport($elm, settings = {}) {
  settings = Object.assign({ offset: "10px", once: true, whenIn: null, whenOut: null }, settings);
  let observer;
  const id = __uniqid();
  const pro = new SPromise(({ resolve, emit }) => {
    const options = {
      root: null,
      rootMargin: settings.offset,
      threshold: 0
      // visible amount of item shown in relation to root
    };
    if (!$elm._whenInViewportStatus) {
      $elm._whenInViewportStatus = {};
    }
    function onChange(changes) {
      changes.forEach((change) => {
        var _a2, _b2;
        if (change.intersectionRatio === 0) {
          if (!$elm._whenInViewportStatus[id]) {
            return;
          }
          $elm._whenInViewportStatus[id] = false;
          (_a2 = settings.whenOut) === null || _a2 === void 0 ? void 0 : _a2.call(settings, $elm);
          emit("out", $elm);
        } else {
          if (settings.once) {
            observer.disconnect();
          }
          if ($elm._whenInViewportStatus[id]) {
            return;
          }
          $elm._whenInViewportStatus[id] = true;
          (_b2 = settings.whenIn) === null || _b2 === void 0 ? void 0 : _b2.call(settings, $elm);
          emit("in", $elm);
          if (settings.once) {
            resolve($elm);
          }
        }
      });
    }
    observer = new IntersectionObserver(onChange, options);
    observer.observe($elm);
  });
  pro.on("cancel", () => {
    observer === null || observer === void 0 ? void 0 : observer.disconnect();
  });
  return pro;
}
function whenLod(level) {
  return new Promise((resolve) => {
    const $html = document.querySelector("html");
    if ($html === null || $html === void 0 ? void 0 : $html.classList.contains(`s-lod-${level}`)) {
      return resolve();
    }
    const observer = new MutationObserver((mutationList, observer2) => {
      for (const mutation of mutationList) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          if ($html === null || $html === void 0 ? void 0 : $html.classList.contains(`s-lod-${level}`)) {
            observer2.disconnect();
            return resolve();
          }
        }
      }
    });
    observer.observe(document.body, {
      attributeFilter: ["class"],
      attributes: true
    });
  });
}
function __isScrollable($elm, settings) {
  var _a2;
  settings = Object.assign({ x: true, y: true }, settings !== null && settings !== void 0 ? settings : {});
  if (!($elm instanceof Element)) {
    return false;
  }
  const style = ((_a2 = window.parent) !== null && _a2 !== void 0 ? _a2 : window).getComputedStyle($elm);
  var overflowY = style.overflowY.trim();
  var overflowX = style.overflowX.trim();
  const dir = {
    vertical: (overflowY === "scroll" || overflowY === "auto") && $elm.scrollHeight > $elm.clientHeight,
    horizontal: (overflowX === "scroll" || overflowX === "auto") && $elm.scrollWidth > $elm.clientWidth
  };
  if ($elm.classList.contains("body")) {
    _console.log("b", dir, overflowX, overflowY);
  }
  if (settings.x && dir.horizontal)
    return true;
  if (settings.y && dir.vertical)
    return true;
  return false;
}
function __traverseUp($elm, callback) {
  const originalElm = $elm;
  $elm = $elm.parentNode;
  while ($elm && $elm != originalElm.ownerDocument) {
    if (callback($elm)) {
      return $elm;
    }
    $elm = $elm.parentNode;
  }
  return null;
}
function __closestScrollable($elm, selector) {
  const res = __traverseUp($elm, ($e) => __isScrollable($e));
  return res;
}
var __awaiter$s = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function __whenNearViewport(elm, settings = {}) {
  function getRootMargin() {
    return [
      `${Math.round(window.innerHeight * 0.5)}px`,
      `${Math.round(window.innerWidth * 0.5)}px`,
      `${Math.round(window.innerHeight * 0.5)}px`,
      `${Math.round(window.innerWidth * 0.5)}px`
    ].join(" ");
  }
  settings = Object.assign({}, settings);
  let observer, resizeTimeout;
  let $closest = __closestScrollable(elm);
  if (($closest === null || $closest === void 0 ? void 0 : $closest.tagName) === "HTML")
    $closest = null;
  return new Promise((resolve) => __awaiter$s(this, void 0, void 0, function* () {
    var _a2;
    const options = {
      root: $closest,
      rootMargin: (_a2 = settings.offset) !== null && _a2 !== void 0 ? _a2 : getRootMargin(),
      threshold: 0
      // visible amount of item shown in relation to root
    };
    function onChange(changes, observer2) {
      changes.forEach((change) => {
        var _a3;
        if (change.intersectionRatio > 0) {
          (_a3 = observer2.disconnect) === null || _a3 === void 0 ? void 0 : _a3.call(observer2);
          resolve(elm);
        }
      });
    }
    observer = new IntersectionObserver(onChange, options);
    observer.observe(elm);
    window.addEventListener("resize", (e) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        var _a3, _b2;
        (_a3 = observer.disconnect) === null || _a3 === void 0 ? void 0 : _a3.call(observer);
        options.rootMargin = (_b2 = settings.offset) !== null && _b2 !== void 0 ? _b2 : getRootMargin();
        observer = new IntersectionObserver(onChange, options);
        observer.observe(elm);
      }, 500);
    });
  }));
}
function __whenOutOfViewport(elm, settings = {}) {
  return new Promise((resolve, reject) => {
    settings = Object.assign({ offset: "10px" }, settings);
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
      rootMargin: settings.offset,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    });
    observer.observe(elm);
  });
}
function alreadyLoaded(link) {
  const href = link.href;
  let result2 = false;
  for (let i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].href && document.styleSheets[i].href.match(href)) {
      result2 = true;
    } else if (i == document.styleSheets.length - 1)
      ;
  }
  return result2;
}
function __whenLinkLoaded(link, cb = null) {
  return new Promise((resolve, reject) => {
    if (alreadyLoaded(link)) {
      resolve(link);
      cb === null || cb === void 0 ? void 0 : cb(link);
    } else {
      const img = document.createElement("img");
      img.addEventListener("error", (e) => {
        resolve(link);
        cb === null || cb === void 0 ? void 0 : cb(link);
      });
      img.src = link.href;
    }
  });
}
function __whenStylesheetsReady(links = null) {
  if (!links) {
    links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  }
  const promises = [];
  [].forEach.call(links, ($link) => {
    promises.push(__whenLinkLoaded($link));
  });
  const allPromises = Promise.all(promises);
  return allPromises;
}
function __whenVisible($elm, settings) {
  const pro = new SPromise(({ resolve, reject, emit }) => {
    const finalSettings = Object.assign({ whenVisible: null, whenInvisible: null, once: true }, settings !== null && settings !== void 0 ? settings : {});
    if (!$elm._whenVisibleStatus) {
      $elm._whenVisibleStatus = {};
    }
    const id = __uniqid();
    var observer = new IntersectionObserver(function(entries) {
      var _a2, _b2;
      if (entries[0]["intersectionRatio"] == 0) {
        if (!$elm._whenVisibleStatus[id]) {
          return;
        }
        $elm._whenVisibleStatus[id] = false;
        (_a2 = finalSettings.whenInvisible) === null || _a2 === void 0 ? void 0 : _a2.call(finalSettings, $elm);
        emit("invisible", $elm);
      } else {
        if (finalSettings.once) {
          observer.disconnect();
        }
        if ($elm._whenVisibleStatus[id]) {
          return;
        }
        $elm._whenVisibleStatus[id] = true;
        (_b2 = finalSettings.whenVisible) === null || _b2 === void 0 ? void 0 : _b2.call(finalSettings, $elm);
        emit("visible", $elm);
        if (finalSettings.once) {
          resolve($elm);
        }
      }
    });
    observer.observe($elm);
    pro.on("cancel", () => {
      observer === null || observer === void 0 ? void 0 : observer.disconnect();
    });
    return pro;
  });
}
var __awaiter$r = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const WhenTriggers = [
  "direct",
  "directly",
  "inViewport",
  "nearViewport",
  "enterViewport",
  "outOfViewport",
  "interact",
  "visible",
  "stylesheetsReady",
  "domReady",
  "animationEnd",
  "lod:0",
  "lod:1",
  "lod:2",
  "lod:3",
  "lod:4"
];
function __when($elm, trigger, settings) {
  const finalSettings = Object.assign({ whenInViewport: {}, whenNearViewport: {}, whenOutOfViewport: {}, whenInteract: {}, whenVisible: {}, whenStylesheetsReady: {} }, settings !== null && settings !== void 0 ? settings : {});
  return new Promise((resolve, reject) => __awaiter$r(this, void 0, void 0, function* () {
    if (!Array.isArray(trigger))
      trigger = trigger.split(",").map((t) => t.trim());
    const promises = [];
    trigger.forEach((t) => {
      const lodMatches = t.match(/^lod\:([0-9]{1,2})/);
      if (lodMatches && lodMatches[1]) {
        const level = parseInt(lodMatches[1]);
        promises.push(whenLod(level));
        return;
      }
      const timeoutMatches = t.match(/^timeout\:([0-9]+)/);
      if (timeoutMatches && timeoutMatches[1]) {
        const timeout = parseInt(timeoutMatches[1]);
        const promise = new Promise((resolve2) => {
          setTimeout(resolve2, timeout);
        });
        promises.push(promise);
        return;
      }
      const eventMatches = t.match(/^event\:[a-zA-Z0-9-_\.]/);
      if (eventMatches && eventMatches[1]) {
        const promise = new Promise((resolve2) => {
          $elm.addEventListener(eventMatches[1], (e) => {
            resolve2();
          });
        });
        promises.push(promise);
        return;
      }
      switch (t) {
        case "inViewport":
          promises.push(__whenInViewport($elm, finalSettings.whenInViewport));
          break;
        case "nearViewport":
          promises.push(__whenNearViewport($elm, finalSettings.whenNearViewport));
          break;
        case "entersViewport":
          promises.push(__whenEntersViewport($elm, finalSettings.whenEntersViewport));
          break;
        case "outOfViewport":
          promises.push(__whenOutOfViewport($elm, finalSettings.whenOutOfViewport));
          break;
        case "interact":
          promises.push(__whenInteract($elm, finalSettings.whenInteract));
          break;
        case "visible":
          promises.push(__whenVisible($elm, {
            whenVisible: finalSettings.whenVisible,
            once: true
          }));
          break;
        case "domReady":
          promises.push(__whenDomReady());
          break;
        case "stylesheetsReady":
          promises.push(__whenStylesheetsReady($elm ? [$elm] : null));
          break;
        case "animationEnd":
          promises.push(__whenAnimationEnd($elm));
          break;
      }
    });
    if (!trigger.length || trigger.includes("direct") || trigger.includes("directly")) {
      resolve($elm);
      return;
    }
    yield Promise.race(promises);
    resolve($elm);
  }));
}
var __awaiter$q = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function __querySelectorLive(selector, cb = null, settings = {}, _isFirstLevel = true) {
  var _a2, _b2, _c2, _d2, _e2, _f;
  let _emit, noScopeSelector, observer, canceled = false;
  __uniqid();
  const selectedNodes = [];
  settings = __deepMerge({
    rootNode: document,
    once: true,
    afterFirst: null,
    scopes: true,
    firstOnly: false,
    attributes: [],
    when: void 0
  }, settings);
  const innerPromises = [];
  if (settings.scopes) {
    noScopeSelector = selector.split(",").map((sel) => {
      return `${sel.trim()}:not([s-scope] ${sel.trim()})`;
    }).join(",");
  }
  const pro = new SPromise(({ resolve, reject, emit, pipe }) => {
    _emit = emit;
  });
  function isCanceled() {
    return selectedNodes.length && canceled && _isFirstLevel;
  }
  if (isCanceled()) {
    return;
  }
  function handleNode(node, sel) {
    if (isCanceled()) {
      return;
    }
    _emit === null || _emit === void 0 ? void 0 : _emit("node", {
      node,
      cancel() {
        pro.cancel();
      }
    });
    cb === null || cb === void 0 ? void 0 : cb(node, {
      cancel() {
        pro.cancel();
      }
    });
    if (settings.firstOnly) {
      pro.cancel();
    }
    if (!selectedNodes.includes(node)) {
      selectedNodes.push(node);
    }
  }
  function processNode(node, sel) {
    return __awaiter$q(this, void 0, void 0, function* () {
      if (!node.matches || isCanceled()) {
        return;
      }
      if (node.matches(selector) && (!settings.once || !selectedNodes.includes(node))) {
        if (settings.when) {
          yield __when(node, settings.when);
          if (isCanceled()) {
            return;
          }
          handleNode(node);
        } else {
          handleNode(node);
        }
      }
      findAndProcess(node, sel);
    });
  }
  function findAndProcess($root, sel) {
    if (!$root.querySelectorAll || isCanceled()) {
      return;
    }
    const nodes = Array.from($root === null || $root === void 0 ? void 0 : $root.querySelectorAll(sel));
    nodes.forEach((node) => {
      processNode(node, sel);
    });
  }
  if (settings.scopes && (settings.rootNode === document || !((_b2 = (_a2 = settings.rootNode) === null || _a2 === void 0 ? void 0 : _a2.hasAttribute) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, "s-scope")))) {
    let isAfterCalledByScopeId = {};
    innerPromises.push(__querySelectorLive("[s-scope]", ($scope) => __awaiter$q(this, void 0, void 0, function* () {
      const scopeId = $scope.id || `s-scope-${__uniqid()}`;
      if ($scope.id !== scopeId) {
        $scope.setAttribute("id", scopeId);
      }
      if (isCanceled()) {
        return;
      }
      yield __when($scope, "nearViewport");
      if (isCanceled()) {
        return;
      }
      innerPromises.push(__querySelectorLive(selector, ($elm) => {
        processNode($elm, selector);
      }, Object.assign({}, settings, {
        rootNode: $scope,
        scopes: false,
        afterFirst() {
          if (isAfterCalledByScopeId[scopeId] && $scope._sQuerySelectorLiveScopeDirty) {
            return;
          }
          $scope._sQuerySelectorLiveScopeDirty = true;
          isAfterCalledByScopeId[scopeId] = true;
          __fastdom.mutate(() => {
            $scope.classList.add("ready");
            $scope.setAttribute("ready", "true");
          });
        }
      }), true));
    }), Object.assign({}, settings, {
      firstOnly: false,
      scopes: false
    }), false));
    innerPromises.push(__querySelectorLive(noScopeSelector, ($elm) => {
      processNode($elm, selector);
    }, Object.assign({}, settings, {
      scopes: false
    }), false));
    (_c2 = settings.afterFirst) === null || _c2 === void 0 ? void 0 : _c2.call(settings);
  } else {
    observer = new MutationObserver((mutations, obs) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName) {
          processNode(mutation.target, selector);
        }
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach((node) => {
            processNode(node, selector);
          });
        }
      });
    });
    let observeSettings = {
      childList: true,
      subtree: true
    };
    selector.split(",").map((l) => l.trim()).forEach((sel) => {
      const attrMatches = sel.match(/\[[^\]]+\]/gm);
      if (attrMatches === null || attrMatches === void 0 ? void 0 : attrMatches.length) {
        attrMatches.forEach((attrStr) => {
          var _a3, _b3;
          const attrName = attrStr.split("=")[0].replace(/^\[/, "").replace(/\]$/, "");
          if (!((_a3 = settings.attributes) === null || _a3 === void 0 ? void 0 : _a3.includes(attrName))) {
            (_b3 = settings.attributes) === null || _b3 === void 0 ? void 0 : _b3.push(attrName);
          }
        });
      }
    });
    if ((_d2 = settings.attributes) === null || _d2 === void 0 ? void 0 : _d2.length) {
      observeSettings = Object.assign(Object.assign({}, observeSettings), { attributes: (_e2 = settings.attributes) === null || _e2 === void 0 ? void 0 : _e2.length, attributeFilter: settings.attributes.length ? settings.attributes : null });
    }
    observer.observe(settings.rootNode, observeSettings);
    findAndProcess(settings.rootNode, selector);
    (_f = settings.afterFirst) === null || _f === void 0 ? void 0 : _f.call(settings);
  }
  pro.on("cancel", () => {
    canceled = true;
    innerPromises.forEach((promise) => {
      promise.cancel();
    });
    observer === null || observer === void 0 ? void 0 : observer.disconnect();
  });
  return pro;
}
function reloadStylesheets(settings) {
  var _a2;
  const finalSettings = Object.assign({ $root: document }, settings !== null && settings !== void 0 ? settings : {});
  Array.from((_a2 = finalSettings.$root.querySelectorAll("link[rel=stylesheet]")) !== null && _a2 !== void 0 ? _a2 : []).forEach(($link) => {
    var _a3;
    const id = (_a3 = $link.id) !== null && _a3 !== void 0 ? _a3 : __uniqid();
    const $newLink = $link.cloneNode();
    $newLink.href = $link.href.replace(/\?.*|$/, "?" + Date.now());
    $newLink.addEventListener("load", (e) => {
      var _a4;
      Array.from((_a4 = finalSettings.$root.querySelectorAll(`link[id="${id}"]`)) !== null && _a4 !== void 0 ? _a4 : []).forEach(($remove) => {
        if ($remove === $newLink)
          return;
        $remove.remove();
      });
    });
    $link.after($newLink);
  });
}
var _a$6, _b$5;
let oldX = 0, oldY = 0;
const threshold = 0;
try {
  (_a$6 = document === null || document === void 0 ? void 0 : document.addEventListener) === null || _a$6 === void 0 ? void 0 : _a$6.call(document, "pointermove", (e) => {
    calculateDirection(e);
  });
  (_b$5 = document === null || document === void 0 ? void 0 : document.addEventListener) === null || _b$5 === void 0 ? void 0 : _b$5.call(document, "pointerdown", (e) => {
    calculateDirection(e);
  });
} catch (e) {
}
function calculateDirection(e) {
  if (e.pageX < oldX - threshold) {
    oldX - e.pageX;
    oldX = e.pageX;
  } else if (e.pageX > oldX + threshold) {
    e.pageX - oldX;
    oldX = e.pageX;
  }
  if (e.pageY < oldY - threshold) {
    oldY - e.pageY;
    oldY = e.pageY;
  } else if (e.pageY > oldY + threshold) {
    e.pageY - oldY;
    oldY = e.pageY;
  }
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function __whenRemoved($elm) {
  return new Promise((resolve, reject) => {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.removedNodes.forEach(function(removedNode) {
          if (removedNode === $elm) {
            resolve($elm);
            observer.disconnect();
          }
        });
      });
    });
    observer.observe($elm.parentElement, {
      subtree: false,
      childList: true
    });
  });
}
function __isInIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
var _a$5, _b$4;
let _isUserScrolling = false, _isUserScrollingTimeout;
try {
  (_a$5 = document === null || document === void 0 ? void 0 : document.addEventListener) === null || _a$5 === void 0 ? void 0 : _a$5.call(document, "wheel", (e) => {
    _isUserScrolling = true;
    clearTimeout(_isUserScrollingTimeout);
    _isUserScrollingTimeout = setTimeout(() => {
      _isUserScrolling = false;
    }, 200);
  });
  (_b$4 = document === null || document === void 0 ? void 0 : document.addEventListener) === null || _b$4 === void 0 ? void 0 : _b$4.call(document, "touchmove", (e) => {
    _isUserScrolling = true;
    clearTimeout(_isUserScrollingTimeout);
    _isUserScrollingTimeout = setTimeout(() => {
      _isUserScrolling = false;
    }, 200);
  });
} catch (e) {
}
function __isUserScrolling($elm) {
  if ($elm._isUserInteractive !== void 0) {
    return $elm._isUserInteractive && _isUserScrolling;
  }
  $elm.addEventListener("mouseover", (e) => {
    $elm._isUserInteractive = true;
  });
  $elm.addEventListener("mouseout", (e) => {
    $elm._isUserInteractive = false;
  });
  $elm.addEventListener("touchstart", (e) => {
    $elm._isUserInteractive = true;
  });
  $elm.addEventListener("touchend", (e) => {
    $elm._isUserInteractive = false;
  });
  return $elm._isUserInteractive && _isUserScrolling;
}
const _groups = {};
function _check() {
  for (let [group, stack] of Object.entries(_groups)) {
    let nearest = 9999999, $nearest;
    _groups[group] = _groups[group].filter((itemObj) => {
      const bound2 = itemObj.$target.getBoundingClientRect();
      if (!itemObj.$target.isConnected) {
        return false;
      }
      const percent = 100 / window.innerHeight * bound2.top;
      if (percent < itemObj.percentY && Math.abs(percent) - itemObj.percentY < nearest) {
        nearest = Math.abs(percent) - itemObj.percentY;
        $nearest = itemObj.$target;
      }
      return true;
    });
    for (let itemObj of stack) {
      if (itemObj.$target === $nearest) {
        if (itemObj.lastEmittedEvent === "activate") {
          continue;
        }
        itemObj.emit("activate", itemObj.$target);
        itemObj.lastEmittedEvent = "activate";
      } else {
        if (itemObj.lastEmittedEvent === "unactivate") {
          continue;
        }
        itemObj.emit("unactivate", itemObj.$target);
        itemObj.lastEmittedEvent = "unactivate";
      }
    }
  }
}
document.addEventListener("scroll", () => {
  _check();
});
let _firstCheckTimeout;
function __scrollSpy($target, settings) {
  return new SPromise(({ resolve, reject, emit, on }) => {
    const finalSettings = Object.assign({ group: "default", percentY: 50 }, settings !== null && settings !== void 0 ? settings : {});
    function remove() {
      _groups[finalSettings.group] = _groups[finalSettings.group].filter((itemObj) => {
        return itemObj.$target !== $target;
      });
      if (!_groups[finalSettings.group].length) {
        delete _groups[finalSettings.group];
      }
    }
    on("finally", () => {
      remove();
    });
    if (!_groups[finalSettings.group]) {
      _groups[finalSettings.group] = [];
    }
    _groups[finalSettings.group].push({
      $target,
      percentY: finalSettings.percentY,
      emit
    });
    clearTimeout(_firstCheckTimeout);
    _firstCheckTimeout = setTimeout(() => {
      _check();
    });
  });
}
function __easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
let requestAnimationFrame$1;
try {
  requestAnimationFrame$1 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
} catch (e) {
}
const requestAnimationFrame$2 = requestAnimationFrame$1;
function __scrollTo(target, settings = {}) {
  return new Promise((resolve, reject) => {
    var _a2, _b2, _c2, _d2, _e2, _f, _g, _h, _j, _k, _l;
    settings = Object.assign({ $elm: window, duration: 500, easing: __easeInOutQuad, offset: 0, offsetX: void 0, offsetY: void 0, align: "start", justify: "start", onFinish: null, force: false }, settings);
    if (settings.$elm === document.body)
      settings.$elm = window;
    if (settings.$elm === document)
      settings.$elm = window;
    if (settings.$elm === document.querySelector("html"))
      settings.$elm = window;
    const $scrollElm = settings.$elm === window ? document.body : settings.$elm;
    let elmHeight = settings.$elm === window ? window.innerHeight : settings.$elm.offsetHeight;
    let elmWidth = settings.$elm === window ? window.innerWidth : settings.$elm.offsetWidth;
    let elmTop = settings.$elm === window ? 0 : (_a2 = settings.$elm) === null || _a2 === void 0 ? void 0 : _a2.getBoundingClientRect().top;
    let elmLeft = settings.$elm === window ? 0 : (_b2 = settings.$elm) === null || _b2 === void 0 ? void 0 : _b2.getBoundingClientRect().left;
    let maxScrollY = $scrollElm.scrollHeight - elmHeight;
    let maxScrollX = $scrollElm.scrollWidth - elmWidth;
    const currentY = settings.$elm === window ? window.pageYOffset : (_c2 = settings.$elm) === null || _c2 === void 0 ? void 0 : _c2.scrollTop;
    const currentX = settings.$elm === window ? window.pageXOffset : (_d2 = settings.$elm) === null || _d2 === void 0 ? void 0 : _d2.scrollLeft;
    if (settings.$elm !== window) {
      const computedScrollStyles = window.getComputedStyle(settings.$elm);
      maxScrollY += parseInt(computedScrollStyles.paddingTop);
      maxScrollY += parseInt(computedScrollStyles.paddingBottom);
      maxScrollX += parseInt(computedScrollStyles.paddingLeft);
      maxScrollX += parseInt(computedScrollStyles.paddingRight);
    }
    let targetY = currentY, targetX = currentX;
    let targetBounds;
    try {
      targetBounds = target.getBoundingClientRect();
    } catch (e) {
      targetBounds = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      };
    }
    const offsetY = (_e2 = settings.offsetY) !== null && _e2 !== void 0 ? _e2 : settings.offset;
    const offsetX = (_f = settings.offsetX) !== null && _f !== void 0 ? _f : settings.offset;
    if (target === "top") {
      targetY = 0;
    } else if (target === "bottom") {
      targetY = (_h = (_g = settings.$elm) === null || _g === void 0 ? void 0 : _g.scrollHeight) !== null && _h !== void 0 ? _h : document.documentElement.scrollHeight;
    }
    if (target === "left") {
      targetX = 0;
    } else if (target === "right") {
      targetY = (_k = (_j = settings.$elm) === null || _j === void 0 ? void 0 : _j.scrollWidth) !== null && _k !== void 0 ? _k : document.documentElement.scrollWidth;
    }
    if (settings.align === "center") {
      targetY += targetBounds.top + targetBounds.height / 2;
      targetY -= elmHeight / 2;
      targetY -= offsetY;
    } else if (settings.align === "end") {
      targetY += targetBounds.bottom;
      targetY -= elmHeight;
      targetY += offsetY;
    } else {
      targetY += targetBounds.top;
      targetY -= offsetY;
    }
    targetY = Math.max(Math.min(maxScrollY, targetY), 0);
    const deltaY = targetY - currentY - elmTop;
    if (settings.justify === "center") {
      targetX += targetBounds.left + targetBounds.width / 2;
      targetX -= elmWidth / 2;
      targetX -= offsetX;
    } else if (settings.justify === "end") {
      targetX += targetBounds.right;
      targetX -= elmWidth;
      targetX += offsetX;
    } else {
      targetX += targetBounds.left;
      targetX -= offsetX;
    }
    targetX = Math.max(Math.min(maxScrollX, targetX), 0);
    const deltaX = targetX - currentX - elmLeft;
    if ((_l = settings.$elm) === null || _l === void 0 ? void 0 : _l.getBoundingClientRect) {
      const elmBounds = settings.$elm.getBoundingClientRect();
      targetY -= elmBounds.top;
      targetX -= elmBounds.left;
    }
    const obj = {
      targetY,
      targetX,
      deltaY,
      deltaX,
      currentY,
      currentX,
      duration: settings.duration,
      easing: settings.easing,
      force: settings.force,
      $elm: settings.$elm,
      onFinish() {
        settings.onFinish && settings.onFinish();
        resolve();
      },
      startTime: Date.now(),
      step: __scrollTo.step
    };
    requestAnimationFrame$2(obj.step.bind(obj));
  });
}
__scrollTo.step = function() {
  const t = Math.min((Date.now() - this.startTime) / this.duration, 1);
  let $scrollElm = this.$elm;
  if (this.$elm === document.body || this.$elm === document) {
    $scrollElm = window;
  }
  const x = this.targetX - (1 - this.easing(t)) * this.deltaX;
  const y = this.targetY - (1 - this.easing(t)) * this.deltaY;
  $scrollElm.scrollTo(x, y);
  if (!this.force && __isUserScrolling(this.$elm))
    return;
  if (t !== 1) {
    requestAnimationFrame$2(this.step.bind(this));
  } else {
    if (this.onFinish)
      this.onFinish();
  }
};
function __clearTransmations($elm = document.body, settings) {
  const cls = `s-clear-transmations-${__uniqid()}`;
  $elm.classList.add(cls);
  const $tag = document.createElement("style");
  $tag.type = "text/css";
  $tag.innerHTML = `
        .${cls},
        .${cls}:before,
        .${cls}:after,
        .${cls} *,
        .${cls} *:before,
        .${cls} *:after {
            animation: none !important;
            transition: none !important;
        }
    `;
  document.head.appendChild($tag);
  function reset() {
    $elm.classList.remove(cls);
    $tag.remove();
  }
  if (settings === null || settings === void 0 ? void 0 : settings.timeout) {
    setTimeout(() => {
      reset();
    }, settings.timeout);
  }
  return reset;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "x" : "y";
}
function getLengthFromAxis(axis) {
  return axis === "y" ? "height" : "width";
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  const commonAlign = reference[length] / 2 - floating[length] / 2;
  const side = getSide(placement);
  const isVertical = mainAxis === "x";
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
const computePosition$1 = async (reference, floating, config2) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config2;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  {
    if (platform2 == null) {
      console.error(["Floating UI: `platform` property was not passed to config. If you", "want to use Floating UI on the web, install @floating-ui/dom", "instead of the /core package. Otherwise, you can create your own", "`platform`: https://floating-ui.com/docs/platform"].join(" "));
    }
    if (middleware.filter((_ref) => {
      let {
        name: name2
      } = _ref;
      return name2 === "autoPlacement" || name2 === "flip";
    }).length > 1) {
      throw new Error(["Floating UI: duplicate `flip` and/or `autoPlacement`", "middleware detected. This will lead to an infinite loop. Ensure only", "one of either has been passed to the `middleware` array."].join(" "));
    }
  }
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < middleware.length; i++) {
    const {
      name: name2,
      fn: fn2
    } = middleware[i];
    const {
      x: nextX,
      y: nextY,
      data: data2,
      reset
    } = await fn2({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name2]: {
        ...middlewareData[name2],
        ...data2
      }
    };
    {
      if (resetCount > 50) {
        console.warn(["Floating UI: The middleware lifecycle appears to be running in an", "infinite loop. This is usually caused by a `reset` continually", "being returned without a break condition."].join(" "));
      }
    }
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
      continue;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getSideObjectFromPadding(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}
async function detectOverflow(middlewareArguments, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = middlewareArguments;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = options;
  const paddingObject = getSideObjectFromPadding(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: elementContext === "floating" ? {
      ...rects.floating,
      x,
      y
    } : rects.reference,
    offsetParent: await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating)),
    strategy
  }) : rects[elementContext]);
  return {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
}
const min$1 = Math.min;
const max$2 = Math.max;
function within(min$1$1, value, max$12) {
  return max$2(min$1$1, min$1(value, max$12));
}
const arrow = (options) => ({
  name: "arrow",
  options,
  async fn(middlewareArguments) {
    const {
      element,
      padding = 0
    } = options != null ? options : {};
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2
    } = middlewareArguments;
    if (element == null) {
      {
        console.warn("Floating UI: No `element` was passed to the `arrow` middleware.");
      }
      return {};
    }
    const paddingObject = getSideObjectFromPadding(padding);
    const coords = {
      x,
      y
    };
    const axis = getMainAxisFromPlacement(placement);
    const alignment = getAlignment(placement);
    const length = getLengthFromAxis(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const minProp = axis === "y" ? "top" : "left";
    const maxProp = axis === "y" ? "bottom" : "right";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
    if (clientSize === 0) {
      clientSize = rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const min2 = paddingObject[minProp];
    const max2 = clientSize - arrowDimensions[length] - paddingObject[maxProp];
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = within(min2, center, max2);
    const alignmentPadding = alignment === "start" ? paddingObject[minProp] : paddingObject[maxProp];
    const shouldAddOffset = alignmentPadding > 0 && center !== offset2 && rects.reference[length] <= rects.floating[length];
    const alignmentOffset = shouldAddOffset ? center < min2 ? min2 - center : max2 - center : 0;
    return {
      [axis]: coords[axis] - alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2
      }
    };
  }
});
const hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (matched) => hash$1[matched]);
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  let mainAlignmentSide = mainAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return {
    main: mainAlignmentSide,
    cross: getOppositePlacement(mainAlignmentSide)
  };
}
const hash = {
  start: "end",
  end: "start"
};
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (matched) => hash[matched]);
}
const sides = ["top", "right", "bottom", "left"];
const allPlacements = /* @__PURE__ */ sides.reduce((acc, side) => acc.concat(side, side + "-start", side + "-end"), []);
function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter((placement) => getAlignment(placement) === alignment), ...allowedPlacements.filter((placement) => getAlignment(placement) !== alignment)] : allowedPlacements.filter((placement) => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter((placement) => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
const autoPlacement = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "autoPlacement",
    options,
    async fn(middlewareArguments) {
      var _middlewareData$autoP, _middlewareData$autoP2, _middlewareData$autoP3, _middlewareData$autoP4, _placementsSortedByLe;
      const {
        x,
        y,
        rects,
        middlewareData,
        placement,
        platform: platform2,
        elements
      } = middlewareArguments;
      const {
        alignment = null,
        allowedPlacements = allPlacements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = options;
      const placements = getPlacementList(alignment, autoAlignment, allowedPlacements);
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const currentIndex = (_middlewareData$autoP = (_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.index) != null ? _middlewareData$autoP : 0;
      const currentPlacement = placements[currentIndex];
      if (currentPlacement == null) {
        return {};
      }
      const {
        main: main2,
        cross
      } = getAlignmentSides(currentPlacement, rects, await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)));
      if (placement !== currentPlacement) {
        return {
          x,
          y,
          reset: {
            placement: placements[0]
          }
        };
      }
      const currentOverflows = [overflow[getSide(currentPlacement)], overflow[main2], overflow[cross]];
      const allOverflows = [...(_middlewareData$autoP3 = (_middlewareData$autoP4 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP4.overflows) != null ? _middlewareData$autoP3 : [], {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements[currentIndex + 1];
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByLeastOverflow = allOverflows.slice().sort((a, b) => a.overflows[0] - b.overflows[0]);
      const placementThatFitsOnAllSides = (_placementsSortedByLe = placementsSortedByLeastOverflow.find((_ref) => {
        let {
          overflows
        } = _ref;
        return overflows.every((overflow2) => overflow2 <= 0);
      })) == null ? void 0 : _placementsSortedByLe.placement;
      const resetPlacement = placementThatFitsOnAllSides != null ? placementThatFitsOnAllSides : placementsSortedByLeastOverflow[0].placement;
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
const flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(middlewareArguments) {
      var _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = middlewareArguments;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        flipAlignment = true,
        ...detectOverflowOptions
      } = options;
      const side = getSide(placement);
      const isBasePlacement = side === initialPlacement;
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const {
          main: main2,
          cross
        } = getAlignmentSides(placement, rects, await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)));
        overflows.push(overflow[main2], overflow[cross]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip$, _middlewareData$flip2;
        const nextIndex = ((_middlewareData$flip$ = (_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) != null ? _middlewareData$flip$ : 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = "bottom";
        switch (fallbackStrategy) {
          case "bestFit": {
            var _overflowsData$map$so;
            const placement2 = (_overflowsData$map$so = overflowsData.map((d2) => [d2, d2.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0].placement;
            if (placement2) {
              resetPlacement = placement2;
            }
            break;
          }
          case "initialPlacement":
            resetPlacement = initialPlacement;
            break;
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(middlewareArguments, value) {
  const {
    placement,
    platform: platform2,
    elements
  } = middlewareArguments;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getMainAxisFromPlacement(placement) === "x";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = typeof value === "function" ? value(middlewareArguments) : value;
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset = function(value) {
  if (value === void 0) {
    value = 0;
  }
  return {
    name: "offset",
    options: value,
    async fn(middlewareArguments) {
      const {
        x,
        y
      } = middlewareArguments;
      const diffCoords = await convertValueToCoords(middlewareArguments, value);
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: diffCoords
      };
    }
  };
};
function getCrossAxis(axis) {
  return axis === "x" ? "y" : "x";
}
const shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(middlewareArguments) {
      const {
        x,
        y,
        placement
      } = middlewareArguments;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = options;
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const mainAxis = getMainAxisFromPlacement(getSide(placement));
      const crossAxis = getCrossAxis(mainAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = within(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = within(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...middlewareArguments,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};
const inline = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "inline",
    options,
    async fn(middlewareArguments) {
      var _await$platform$getCl;
      const {
        placement,
        elements,
        rects,
        platform: platform2,
        strategy
      } = middlewareArguments;
      const {
        padding = 2,
        x,
        y
      } = options;
      const fallback = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
        rect: rects.reference,
        offsetParent: await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating)),
        strategy
      }) : rects.reference);
      const clientRects = (_await$platform$getCl = await (platform2.getClientRects == null ? void 0 : platform2.getClientRects(elements.reference))) != null ? _await$platform$getCl : [];
      const paddingObject = getSideObjectFromPadding(padding);
      function getBoundingClientRect2() {
        if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
          var _clientRects$find;
          return (_clientRects$find = clientRects.find((rect) => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom)) != null ? _clientRects$find : fallback;
        }
        if (clientRects.length >= 2) {
          if (getMainAxisFromPlacement(placement) === "x") {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = getSide(placement) === "top";
            const top2 = firstRect.top;
            const bottom2 = lastRect.bottom;
            const left2 = isTop ? firstRect.left : lastRect.left;
            const right2 = isTop ? firstRect.right : lastRect.right;
            const width2 = right2 - left2;
            const height2 = bottom2 - top2;
            return {
              top: top2,
              bottom: bottom2,
              left: left2,
              right: right2,
              width: width2,
              height: height2,
              x: left2,
              y: top2
            };
          }
          const isLeftSide = getSide(placement) === "left";
          const maxRight = max$2(...clientRects.map((rect) => rect.right));
          const minLeft = min$1(...clientRects.map((rect) => rect.left));
          const measureRects = clientRects.filter((rect) => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          const left = minLeft;
          const right = maxRight;
          const width = right - left;
          const height = bottom - top;
          return {
            top,
            bottom,
            left,
            right,
            width,
            height,
            x: left,
            y: top
          };
        }
        return fallback;
      }
      const resetRects = await platform2.getElementRects({
        reference: {
          getBoundingClientRect: getBoundingClientRect2
        },
        floating: elements.floating,
        strategy
      });
      if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
        return {
          reset: {
            rects: resetRects
          }
        };
      }
      return {};
    }
  };
};
function isWindow(value) {
  return value && value.document && value.location && value.alert && value.setInterval;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (!isWindow(node)) {
    const ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeName(node) {
  return isWindow(node) ? "" : node ? (node.nodeName || "").toLowerCase() : "";
}
function getUAString() {
  const uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands) {
    return uaData.brands.map((item) => item.brand + "/" + item.version).join(" ");
  }
  return navigator.userAgent;
}
function isHTMLElement(value) {
  return value instanceof getWindow(value).HTMLElement;
}
function isElement(value) {
  return value instanceof getWindow(value).Element;
}
function isNode(value) {
  return value instanceof getWindow(value).Node;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  const OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const isFirefox = /firefox/i.test(getUAString());
  const css2 = getComputedStyle$1(element);
  return css2.transform !== "none" || css2.perspective !== "none" || // @ts-ignore (TS 4.1 compat)
  css2.contain === "paint" || ["transform", "perspective"].includes(css2.willChange) || isFirefox && css2.willChange === "filter" || isFirefox && (css2.filter ? css2.filter !== "none" : false);
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
const min = Math.min;
const max$1 = Math.max;
const round = Math.round;
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  var _win$visualViewport$o, _win$visualViewport, _win$visualViewport$o2, _win$visualViewport2;
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  let scaleX = 1;
  let scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  const win = isElement(element) ? getWindow(element) : window;
  const addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  const x = (clientRect.left + (addVisualOffsets ? (_win$visualViewport$o = (_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) != null ? _win$visualViewport$o : 0 : 0)) / scaleX;
  const y = (clientRect.top + (addVisualOffsets ? (_win$visualViewport$o2 = (_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) != null ? _win$visualViewport$o2 : 0 : 0)) / scaleY;
  const width = clientRect.width / scaleX;
  const height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}
function getDocumentElement(node) {
  return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function isScaled(element) {
  const rect = getBoundingClientRect(element);
  return round(rect.width) !== element.offsetWidth || round(rect.height) !== element.offsetHeight;
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const rect = getBoundingClientRect(
    element,
    // @ts-ignore - checked above (TS 4.1 compat)
    isOffsetParentAnElement && isScaled(offsetParent),
    strategy === "fixed"
  );
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // @ts-ignore
    node.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    node.parentNode || // DOM Element detected
    (isShadowRoot(node) ? node.host : null) || // ShadowRoot detected
    getDocumentElement(node)
  );
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && !["html", "body"].includes(getNodeName(currentNode))) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  const window2 = getWindow(element);
  let offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getDimensions(element) {
  if (isHTMLElement(element)) {
    return {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }
  const rect = getBoundingClientRect(element);
  return {
    width: rect.width,
    height: rect.height
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    ...rect,
    x: rect.x - scroll.scrollLeft + offsets.x,
    y: rect.y - scroll.scrollTop + offsets.y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html2 = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html2.clientWidth;
  let height = html2.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  const html2 = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  const width = max$1(html2.scrollWidth, html2.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  const height = max$1(html2.scrollHeight, html2.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body || html2).direction === "rtl") {
    x += max$1(html2.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (["html", "body", "#document"].includes(getNodeName(parentNode))) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list2) {
  var _node$ownerDocument;
  if (list2 === void 0) {
    list2 = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
  const win = getWindow(scrollableAncestor);
  const target = isBody ? [win].concat(win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []) : scrollableAncestor;
  const updatedList = list2.concat(target);
  return isBody ? updatedList : (
    // @ts-ignore: isBody tells us target will be an HTMLElement here
    updatedList.concat(getOverflowAncestors(target))
  );
}
function contains$2(parent, child) {
  const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    do {
      if (next && parent === next) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, false, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  return {
    top,
    left,
    x: left,
    y: top,
    right: left + element.clientWidth,
    bottom: top + element.clientHeight,
    width: element.clientWidth,
    height: element.clientHeight
  };
}
function getClientRectFromClippingAncestor(element, clippingParent, strategy) {
  if (clippingParent === "viewport") {
    return rectToClientRect(getViewportRect(element, strategy));
  }
  if (isElement(clippingParent)) {
    return getInnerBoundingClientRect(clippingParent, strategy);
  }
  return rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingAncestors(element) {
  const clippingAncestors = getOverflowAncestors(element);
  const canEscapeClipping = ["absolute", "fixed"].includes(getComputedStyle$1(element).position);
  const clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingAncestors.filter((clippingAncestors2) => isElement(clippingAncestors2) && contains$2(clippingAncestors2, clipperElement) && getNodeName(clippingAncestors2) !== "body");
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const mainClippingAncestors = boundary === "clippingAncestors" ? getClippingAncestors(element) : [].concat(boundary);
  const clippingAncestors = [...mainClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max$1(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max$1(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
const platform = {
  getClippingRect,
  convertOffsetParentRelativeRectToViewportRelativeRect,
  isElement,
  getDimensions,
  getOffsetParent,
  getDocumentElement,
  getElementRects: (_ref) => {
    let {
      reference,
      floating,
      strategy
    } = _ref;
    return {
      reference: getRectRelativeToOffsetParent(reference, getOffsetParent(floating), strategy),
      floating: {
        ...getDimensions(floating),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (element) => Array.from(element.getClientRects()),
  isRTL: (element) => getComputedStyle$1(element).direction === "rtl"
};
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll: _ancestorScroll = true,
    ancestorResize: _ancestorResize = true,
    elementResize = true,
    animationFrame = false
  } = options;
  const ancestorScroll = _ancestorScroll && !animationFrame;
  const ancestorResize = _ancestorResize && !animationFrame;
  const ancestors = ancestorScroll || ancestorResize ? [...isElement(reference) ? getOverflowAncestors(reference) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  let observer = null;
  if (elementResize) {
    let initialUpdate = true;
    observer = new ResizeObserver(() => {
      if (!initialUpdate) {
        update();
      }
      initialUpdate = false;
    });
    isElement(reference) && !animationFrame && observer.observe(reference);
    observer.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _observer;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    (_observer = observer) == null ? void 0 : _observer.disconnect();
    observer = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const computePosition = (reference, floating, options) => computePosition$1(reference, floating, {
  platform,
  ...options
});
var __awaiter$p = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function __makeFloat($elm, $depending, settings) {
  const finalSettings = Object.assign({ position: "auto", shift: 10, offset: 0, arrow: false, arrowSize: 15, arrowPadding: 10 }, settings !== null && settings !== void 0 ? settings : {});
  $depending.classList.add("s-floating");
  const middlewares = [
    offset(finalSettings.offset),
    shift({
      padding: finalSettings.shift
    }),
    inline()
  ];
  if (finalSettings.position !== "auto") {
    middlewares.push(flip());
  } else {
    middlewares.push(autoPlacement());
  }
  let $arrow;
  if (finalSettings.arrow) {
    $arrow = document.createElement("div");
    $arrow.classList.add("s-floating_arrow");
    $elm.append($arrow);
    middlewares.push(arrow({
      element: $arrow,
      padding: finalSettings.arrowPadding
    }));
  }
  if (finalSettings.arrowSize) {
    $elm.style.setProperty(`--arrow-size`, `${finalSettings.arrowSize}px`);
  }
  const update = () => __awaiter$p(this, void 0, void 0, function* () {
    yield computePosition($depending, $elm, {
      // @ts-ignore
      placement: finalSettings.position,
      middleware: middlewares
    });
    computePosition($depending, $elm, {
      // @ts-ignore
      placement: finalSettings.position,
      middleware: middlewares
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign($elm.style, {
        position: "absolute",
        top: `${y}px`,
        left: `${x}px`
      });
      if (middlewareData.arrow) {
        const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right"
        }[placement.split("-")[0]];
        Object.assign($arrow.style, {
          position: "absolute",
          left: middlewareData.arrow.x != null ? `${middlewareData.arrow.x}px` : "",
          top: middlewareData.arrow.y != null ? `${middlewareData.arrow.y}px` : "",
          right: "",
          bottom: "",
          [staticSide]: "-4px"
        });
      }
    });
  });
  update();
  const cancel = autoUpdate($depending, $elm, () => {
    update();
  });
  __whenRemoved($elm).then(() => {
    cancel();
  });
  __whenRemoved($depending).then(() => {
    cancel();
  });
  $depending.addEventListener("pointerover", () => {
    update();
  });
  return {
    update,
    cancel
  };
}
let map$1 = {};
try {
  map$1 = {
    a: window.HTMLAnchorElement,
    audio: window.HTMLAudioElement,
    body: window.HTMLBodyElement,
    button: window.HTMLButtonElement,
    canvas: window.HTMLCanvasElement,
    dl: window.HTMLDListElement,
    data: window.HTMLDataElement,
    datalist: window.HTMLDataListElement,
    details: window.HTMLDetailsElement,
    // dialog: window.HTMLDialogElement,
    dir: window.HTMLDirectoryElement,
    div: window.HTMLDivElement,
    html: window.HTMLDocument,
    embed: window.HTMLEmbedElement,
    fieldset: window.HTMLFieldSetElement,
    font: window.HTMLFontElement,
    form: window.HTMLFormElement,
    frame: window.HTMLFrameElement,
    h1: window.HTMLTitleElement,
    h2: window.HTMLTitleElement,
    h3: window.HTMLTitleElement,
    h4: window.HTMLTitleElement,
    h5: window.HTMLTitleElement,
    h6: window.HTMLTitleElement,
    head: window.HTMLHeadElement,
    html: window.HTMLHtmlElement,
    iframe: window.HTMLIFrameElement,
    img: window.HTMLImageElement,
    input: window.HTMLInputElement,
    label: window.HTMLLabelElement,
    legend: window.HTMLLegendElement,
    link: window.HTMLLinkElement,
    map: window.HTMLMapElement,
    marquee: window.HTMLMarqueeElement,
    media: window.HTMLMediaElement,
    menu: window.HTMLMenuElement,
    meta: window.HTMLMetaElement,
    meter: window.HTMLMeterElement,
    del: window.HTMLModElement,
    ins: window.HTMLModElement,
    dol: window.HTMLOListElement,
    object: window.HTMLObjectElement,
    optgroup: window.HTMLOptGroupElement,
    option: window.HTMLOptionElement,
    output: window.HTMLOutputElement,
    p: window.HTMLParagraphElement,
    param: window.HTMLParamElement,
    picture: window.HTMLPictureElement,
    pre: window.HTMLPreElement,
    progress: window.HTMLProgressElement,
    quote: window.HTMLQuoteElement,
    script: window.HTMLScriptElement,
    select: window.HTMLSelectElement,
    slot: window.HTMLSlotElement,
    source: window.HTMLSourceElement,
    span: window.HTMLSpanElement,
    style: window.HTMLStyleElement,
    td: window.HTMLTableCellElement,
    th: window.HTMLTableCellElement,
    col: window.HTMLTableColElement,
    colgroup: window.HTMLTableColElement,
    table: window.HTMLTableElement,
    tr: window.HTMLTableRowElement,
    tfoot: window.HTMLTableSectionElement,
    thead: window.HTMLTableSectionElement,
    tbody: window.HTMLTableSectionElement,
    template: window.HTMLTemplateElement,
    textarea: window.HTMLTextAreaElement,
    time: window.HTMLTimeElement,
    title: window.HTMLTitleElement,
    track: window.HTMLTrackElement,
    ul: window.HTMLUListElement,
    video: window.HTMLVideoElement,
    area: window.HTMLAreaElement
  };
} catch (e) {
}
class SClassmapBase extends SClass {
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(settings) {
    super(__deepMerge({
      path: void 0,
      map: void 0
    }, settings !== null && settings !== void 0 ? settings : {}));
    if (this.settings.map) {
      this.map = this.settings.map;
    }
  }
  /**
   * @name            patchHtml
   * @type        Function
   *
   * This method takes an html string and replace all the classnames that are present in the classmap
   *
   * @param       {String}            html            The html to process
   * @return      {String}                            The processed html
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  // patchHtml(html: string): string {
  //     console.log('patch', html);
  // }
  /**
   * @name            patchHtml
   * @type            Function
   * @platform        php
   * @status          beta
   *
   * This method allows you to patch the passed html and replace in it all the available
   * classes in the map
   *
   * @param       {String}            $html           The html to patch
   * @return      {String}                            The patched html
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  patchHtml(html2) {
    let reg = /class="[a-zA-Z0-9_\-:@\s]+"/gm, needClassAttr = true;
    if (html2.trim().match(/class="[a-zA-Z0-9_\-:@\s]+$/)) {
      reg = /class="[a-zA-Z0-9_\-:@\s]+"?/gm;
    } else if (html2.trim().match(/^[a-zA-Z0-9_\-:@\s]+$/)) {
      reg = /[a-zA-Z0-9_\-:@\s]+/gm;
      needClassAttr = false;
    }
    const matches = html2.match(reg);
    if (!matches)
      return html2;
    matches.forEach((match2) => {
      const endQuote = match2.match(/"$/) ? '"' : "";
      const classesStr = match2.replace('class="', "").replace('"', "");
      const newClassesNames = classesStr.split(" ").map((cls) => {
        var _a2;
        return (_a2 = this.map[cls]) !== null && _a2 !== void 0 ? _a2 : cls;
      });
      if (needClassAttr) {
        html2 = html2.replace(match2, `class="${newClassesNames.join(" ")}${endQuote}`);
      } else {
        html2 = html2.replace(match2, `${newClassesNames.join(" ")}${endQuote}`);
      }
    });
    return html2;
  }
}
var __awaiter$o = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SClassmap extends SClassmapBase {
  /**
   * @name            init
   * @type            Function
   * @static
   *
   * This method allows you to init the your SClassmap instance and store it into the document.env.SUGAR.classmap property
   *
   * @return          {SClassmap}                                    The SClassmal instance that represent the classmap.json file
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static init(settings) {
    let classmapInstance = new this(settings);
    if (!document.env)
      document.env = {};
    if (!document.env.SUGAR)
      document.env.SUGAR = {};
    document.env.SUGAR.classmap = classmapInstance;
    return classmapInstance;
  }
  /**
   * @name           isEnabled
   * @type            Function
   * @static
   *
   * Store if the classmap if enabled or not
   *
   * @return      {Boolean}       true if enabled, false if not. Basically, the classmap is enabled if a `document.env.CLASSMAP` map exists
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static isEnabled() {
    var _a2;
    return ((_a2 = document.env) === null || _a2 === void 0 ? void 0 : _a2.CLASSMAP) !== void 0;
  }
  static areNativeMethodsPatched() {
    return this._areNativeMethodsPatched;
  }
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(settings) {
    var _a2, _b2;
    super(Object.assign({ map: (_b2 = (_a2 = document.env) === null || _a2 === void 0 ? void 0 : _a2.CLASSMAP) !== null && _b2 !== void 0 ? _b2 : {}, patchNativeMethods: true }, settings !== null && settings !== void 0 ? settings : {}));
    if (this.settings.patchNativeMethods && !this.constructor.areNativeMethodsPatched()) {
      this.patchNativeMethods();
    }
    this.patchDomLive();
  }
  /**
   * @name        patchNativeMethods
   * @type        Function
   *
   * This method will patch the native methods like classList.add, style.setProperty, etc... to make use
   * of the classmap
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  patchNativeMethods() {
    const _this = this;
    this.constructor._areNativeMethodsPatched = true;
    function getClassList() {
      var element = this;
      var classList = this.className.split(" ");
      classList.add = function(name2) {
        var _a2;
        const finalName = (_a2 = _this.map[name2]) !== null && _a2 !== void 0 ? _a2 : name2;
        if (classList.indexOf(finalName) !== -1) {
          return;
        }
        classList.push(finalName);
        element.className = classList.join(" ");
      };
      classList.remove = function(name2) {
        var _a2;
        const finalName = (_a2 = _this.map[name2]) !== null && _a2 !== void 0 ? _a2 : name2;
        var index = classList.indexOf(finalName);
        if (index !== -1) {
          classList.splice(index, 1);
          element.className = classList.join(" ");
        }
      };
      classList.contains = function(name2) {
        var _a2;
        return classList.indexOf((_a2 = _this.map[name2]) !== null && _a2 !== void 0 ? _a2 : name2) !== -1;
      };
      return classList;
    }
    Object.defineProperty(HTMLElement.prototype, "classList", {
      get: getClassList
    });
    const nativeQuerySelectorAll = Element.prototype.querySelectorAll;
    Element.prototype.querySelectorAll = function(...sels) {
      const newSels = sels.map((sel) => {
        return _this.patchSelector(sel);
      });
      return nativeQuerySelectorAll.call(this, [...sels, ...newSels]);
    };
    const nativeQuerySelector = Element.prototype.querySelector;
    Element.prototype.querySelector = function(...sels) {
      const newSels = sels.map((sel) => {
        const newSel = _this.patchSelector(sel);
        return newSel;
      });
      return nativeQuerySelector.call(this, [...sels, ...newSels]);
    };
  }
  resolve(cls) {
    var _a2, _b2;
    return (_b2 = (_a2 = this.map[cls]) !== null && _a2 !== void 0 ? _a2 : this.map[cls.replace(/^\./, "")]) !== null && _b2 !== void 0 ? _b2 : cls;
  }
  patchElement($elm) {
    var _a2, _b2;
    const cls = (_b2 = (_a2 = $elm.getAttribute("class")) === null || _a2 === void 0 ? void 0 : _a2.split(" ")) !== null && _b2 !== void 0 ? _b2 : [];
    const newCls = cls.map((c) => this.resolve(c));
    $elm.setAttribute("class", newCls.join(" "));
  }
  patchDomLive($rootNode = document) {
    const patchDomLiveCallback = (mutationList) => {
      mutationList.forEach((mutation) => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach((node) => {
            if (!node.matches)
              return;
            this.patchElement(node);
            this.patchDom(node);
          });
        }
        if (mutation.attributeName === "class") {
          if (mutation.target._classmapProcessing) {
            return;
          }
          clearTimeout(mutation.target._classmapTimeout);
          mutation.target._classmapTimeout = setTimeout(() => {
            mutation.target._classmapProcessing = true;
            this.patchElement(mutation.target);
            setTimeout(() => {
              mutation.target._classmapProcessing = false;
            });
          });
        }
      });
    };
    const observer = new MutationObserver(patchDomLiveCallback);
    observer.observe($rootNode, {
      attributeFilter: ["class"],
      attributeOldValue: true,
      childList: true,
      subtree: true
    });
  }
  patchDom($rootNode) {
    var _a2;
    const $elms = Array.from((_a2 = $rootNode.querySelectorAll("[class]")) !== null && _a2 !== void 0 ? _a2 : []);
    for (let [idx, $elm] of $elms.entries()) {
      this.patchElement($elm);
    }
  }
  patchHtml(html2) {
    const classesMatches = html2.match(/class="([a-zA-Z0-9_-\s]+)"/gm);
    if (classesMatches === null || classesMatches === void 0 ? void 0 : classesMatches.length) {
      classesMatches.forEach((clsStatement) => {
        let sels = clsStatement.replace('class="', "").replace(/\"$/, "").split(" ");
        sels = sels.map((sel) => {
          return this.resolve(sel);
        });
        html2 = html2.replace(clsStatement, `class="${sels.join(" ")}"`);
      });
    }
    return html2;
  }
  patchSelector(sel) {
    const newSel = sel.split(" ").map((part) => {
      const classMatches = part.match(/\.[a-zA-Z0-9_-]+/gm);
      if (classMatches) {
        classMatches.forEach((cls) => {
          var _a2;
          const clsWithoutDot = cls.slice(1);
          part = part.replace(cls, `.${(_a2 = this.map[clsWithoutDot]) !== null && _a2 !== void 0 ? _a2 : clsWithoutDot}`);
        });
      }
      return part;
    }).join(" ");
    return newSel;
  }
  /**
   * @name      loadFromUrl
   * @type        Function
   * @async
   *
   * Load a classmap from a url
   *
   * @param       {string}               url      The url to load the map from
   * @return      {Promise<Object>}               The loaded classmap
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  loadFromUrl(url) {
    return new Promise((resolve) => __awaiter$o(this, void 0, void 0, function* () {
      const res = yield fetch(url).then((response) => response.json());
      this.map = res;
      resolve(res);
    }));
  }
}
class SFrontspec {
  /**
   * @name            init
   * @type            Function
   * @static
   *
   * This method allows you to init the your SFrontspec instance and store it into the document.env.SUGAR.frontspec property
   *
   * @return          {SFrontspec}                                    The SFrontspec instance that represent the frontspec.json file
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static init(frontspec) {
    let frontspecInstance = new this(frontspec);
    if (!document.env)
      document.env = {};
    if (!document.env.SUGAR)
      document.env.SUGAR = {};
    document.env.SUGAR.frontspec = frontspecInstance;
    return frontspecInstance;
  }
  /**
   * @name        get
   * @type        Function
   * @static
   *
   * Access a frontspec value by passing a dotpath like "partytown.enabled", or by accessing the full frontspec object by using `.get()` call.
   *
   * @param       {String}        [dotpah="."]            The dotpath of the frontspec value you want to access
   * @return      {Any}                                   The getted frontspec value
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static get(dotpath = ".") {
    if (!this._defaultFrontspecInstance) {
      this._defaultFrontspecInstance = SFrontspec.init();
    }
    return this._defaultFrontspecInstance.get(dotpath);
  }
  /**
   * @name        metas
   * @type        ISFrontspecMetas
   * @private
   *
   * Store the frontspec metas object
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get metas() {
    return this._frontspec.metas;
  }
  /**
   * @name        package
   * @type        ISFrontspecPackage
   * @private
   *
   * Store the frontspec package object
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get package() {
    return this._frontspec.package;
  }
  /**
   * @name        assets
   * @type        ISFrontspecAssets
   * @private
   *
   * Store the frontspec assets object
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get assets() {
    return this._frontspec.assets;
  }
  /**
   * @name        favicon
   * @type        ISFrontspecFavicon
   * @private
   *
   * Store the frontspec favicon object
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get favicon() {
    return this._frontspec.favicon;
  }
  /**
   * @name        theme
   * @type        ISFrontspecTheme
   * @private
   *
   * Store the frontspec theme object
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get theme() {
    return this._frontspec.theme;
  }
  /**
   * @name        media
   * @type        ISFrontspecMedia
   * @private
   *
   * Store the frontspec media object
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get media() {
    return this._frontspec.media;
  }
  /**
   * @name        views
   * @type        ISFrontspecViews
   * @private
   *
   * Store the frontspec views object
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get views() {
    return this._frontspec.views;
  }
  /**
   * @name        specs
   * @type        ISFrontspecSpecs
   * @private
   *
   * Store the frontspec specs object
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get specs() {
    return this._frontspec.specs;
  }
  /**
   * @name        google
   * @type        ISFrontspecGoogle
   * @private
   *
   * Store the frontspec google object
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get google() {
    return this._frontspec.google;
  }
  /**
   * @name        lod
   * @type        ISFrontspecLod
   * @private
   *
   * Store the frontspec lod object
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get lod() {
    return this._frontspec.lod;
  }
  /**
   * @name        partytown
   * @type        ISFrontspecPartytown
   * @private
   *
   * Store the frontspec partytown object
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get partytown() {
    return this._frontspec.partytown;
  }
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(frontspec = {}) {
    var _a2;
    this._frontspec = {};
    this.constructor._defaultFrontspecInstance = this;
    this._frontspec = __deepMerge(((_a2 = document.env) === null || _a2 === void 0 ? void 0 : _a2.FRONTSPEC) ? document.env.FRONTSPEC : {}, frontspec);
  }
  /**
   * @name        get
   * @type        Function
   *
   * Access a frontspec value by passing a dotpath like "partytown.enabled", or by accessing the full frontspec object by using `.get()` call.
   *
   * @param       {String}        [dotpah="."]            The dotpath of the frontspec value you want to access
   * @return      {Any}                                   The getted frontspec value
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get(dotpath = ".") {
    return get(this._frontspec, dotpath);
  }
}
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  const links = document.getElementsByTagName("link");
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    const isBaseRelative = !!importerUrl;
    if (isBaseRelative) {
      for (let i = links.length - 1; i >= 0; i--) {
        const link2 = links[i];
        if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
          return;
        }
      }
    } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule()).catch((err) => {
    const e = new Event("vite:preloadError", { cancelable: true });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  });
};
class SStdioSettingsInterface extends SInterface {
  static get _definition() {
    return {
      filter: {
        description: "Specify a function that will be used to filter the logs. It will take the log object as parameter and MUST return a boolean.",
        type: "Function"
      },
      processor: {
        description: "Specify a function that will be used to process the logs. It will take the log object and MUST return it, updated or not...",
        type: "Function"
      },
      defaultLogObj: {
        description: "Specify a default log object that will be used as base for each received logs",
        type: "Object",
        default: {}
      },
      defaultAskObj: {
        description: "Specify a default ask object that will be used as base for each received questions (ask)",
        type: "Object",
        default: {}
      }
    };
  }
}
var __awaiter$n = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SStdio extends SClass {
  /**
   * @name            existingOrNew
   * @type            Function
   * @async
   *
   * This static method allows you to get back either an existing stdio instance or a new one
   *
   * @param       {String}      id        The id of the instance you want to get back
   * @param         {SProcess}          proc        The process to display Stdio for
   * @param         {Object}            [settings={}]     An object of blessed settings that will be passed to the main blessed.box instance
   * @return      {SStdio}            The existing or new stdio instance
   *
   * @todo      interface
   * @todo      doc
   * @todo      tests
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static existingOrNew(id, sources, adapters, settings = {}) {
    if (this._instanciatedStdio[id])
      return this._instanciatedStdio[id];
    return this.new(id, sources, adapters, settings);
  }
  /**
   * @name            new
   * @type            Function
   * @async
   *
   * This static method is a sugar to instanciate an stdio by specifying some sources,
   * and either a path to a SStdio class, an SStdio class directly or a pre-registered
   * stdio id like:
   * - inherit: If is in node context, will fallback to STerminalStdio, if in browser, in SConsoleStdio
   * -
   * - terminal: STerminalStdio (node only)
   * - console: SConsoleStdio (browser only)
   *
   * @param     {String}          id          A unique id for your stdio instance
   * @param         {SProcess}          proc        The process to display Stdio for
   * @param         {Object}            [settings={}]     An object of blessed settings that will be passed to the main blessed.box instance
   * @return        {SStdio}                      The newly created stdio instance
   *
   * @todo      interface
   * @todo      doc
   * @todo      tests
   *
   * @example       js
   * import SStdio from '@coffeekraken/s-stdio';
   * import { __spawn } from '@coffeekraken/sugar/process';
   * const proc = __spawn('ls -la');
   * SStdio.new('default', proc);
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static new(id, sources, adapters, settings = {}) {
    return new Promise((resolve) => __awaiter$n(this, void 0, void 0, function* () {
      const __new = (yield __vitePreload(() => import("./new-8e442538.js"), true ? [] : void 0)).default;
      return __new(id, sources, adapters, settings);
    }));
  }
  get id() {
    return this._id;
  }
  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(id, sources, adapters, settings) {
    super(__deepMerge(
      // @ts-ignore
      SStdioSettingsInterface.defaults(),
      settings !== null && settings !== void 0 ? settings : {}
    ));
    this._logsBuffer = [];
    this._isDisplayed = false;
    this._id = "";
    this._isClearing = false;
    this._id = id;
    this.adapters = Array.isArray(adapters) ? adapters : [adapters];
    this.sources = Array.isArray(sources) ? sources : [sources];
    if (this.constructor._instanciatedStdio[this.id]) {
      throw new Error(`<red>${this.constructor.name}</red> Sorry but a instance of the SStdio class already exists with the id "<yellow>${this.id}</yellow>"`);
    }
    this.constructor._instanciatedStdio[this.id] = this;
    this.sources.forEach((s) => {
      this.registerSource(s);
    });
  }
  /**
   * @name          _logBuffer
   * @type          Function
   * @private
   *
   * This method simply take the buffered logs and log them in the feed
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  _logBuffer() {
    this._logsBuffer = this._logsBuffer.filter((log) => {
      this.log(log);
      return false;
    });
  }
  /**
   * @name          display
   * @type          Function
   *
   * This method tells the stdio instance that it has been showned.
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  display() {
    this._isDisplayed = true;
    this._logBuffer();
  }
  /**
   * @name          hide
   * @type          Function
   *
   * This method tells the stdio instance that it has been hided
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  hide() {
    this._isDisplayed = false;
  }
  /**
   * @name          registerSource
   * @type          Function
   *
   * This method simply listen to the process and log the values getted
   * from it into the panel
   *
   * @param     {SPromise}      source        The source to register
   * @param     {ISBlessedStdioSettings}     [settings={}]
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  registerSource(source2) {
    source2.on("log", this.log.bind(this));
    source2.on("ask", this.ask.bind(this));
    source2.on("ready", () => {
      this.display();
    });
  }
  /**
   * Apply a callback function on each adapters
   */
  _applyOnAdapters(callback) {
    this.adapters.forEach((adapter) => {
      callback(adapter);
    });
  }
  log(...logObj) {
    for (let i = 0; i < logObj.length; i++) {
      let log = logObj[i];
      if (!(log === null || log === void 0 ? void 0 : log.active))
        continue;
      if (!this.isDisplayed() || this._isClearing) {
        this._logsBuffer.push(log);
        continue;
      }
      if (this._lastLogObj && this._lastLogObj.temp) {
        if (!this.clearLast || typeof this.clearLast !== "function")
          throw new Error(`You try to clear the last log but it does not implements the "<cyan>clearLast</cyan>" method`);
        (() => __awaiter$n(this, void 0, void 0, function* () {
          if (!this.clearLast)
            return;
          this._applyOnAdapters((adapter) => {
            var _a2;
            (_a2 = adapter.clearLast) === null || _a2 === void 0 ? void 0 : _a2.call(adapter);
          });
          this._logBuffer();
        }))();
      }
      if (log.clear === true) {
        this._isClearing = true;
        if (!this.clear || typeof this.clear !== "function")
          throw new Error(`You try to clear the "<yellow>${this.constructor.name}</yellow>" stdio but it does not implements the "<cyan>clear</cyan>" method`);
        (() => __awaiter$n(this, void 0, void 0, function* () {
          this._applyOnAdapters((adapter) => {
            var _a2;
            (_a2 = adapter.clear) === null || _a2 === void 0 ? void 0 : _a2.call(adapter);
          });
          this._isClearing = false;
          this._logBuffer();
        }))();
      }
      if (!log.group) {
        log.group = "Sugar ♥";
      }
      this._applyOnAdapters((adapter) => {
        adapter.log(log);
      });
      this._lastLogObj = log;
    }
  }
  /**
   * @name      ask
   * @type      Function
   * @async
   *
   * This method is the one called to ask something.
   * It will call the ```_ask``` method that each implementation of the
   * SStdio class MUST have
   *
   * @param         {ISLog[]}        ...logObj      The log object(s) you want to log
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  // _isCleared = true;
  ask(askObj) {
    return __awaiter$n(this, void 0, void 0, function* () {
      let ask = __deepMerge(this.settings.defaultAskObj, askObj);
      const answer = yield this.adapters[0].ask(ask);
      return answer;
    });
  }
  /**
   * @name        isDisplayed
   * @type        Boolean
   *
   * true if the stdio if actually displayed, false if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  isDisplayed() {
    return this._isDisplayed;
  }
}
SStdio._instanciatedStdio = {};
class SStdioAdapter extends SClass {
  constructor(settings) {
    super(settings);
  }
}
var __awaiter$m = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var _a$4;
const _nativeConsole = {};
for (let key of ["log", "error", "warn", "verbose"]) {
  _nativeConsole[key] = (_a$4 = console[key]) !== null && _a$4 !== void 0 ? _a$4 : console.log;
}
class SStdioBasicAdapter extends SStdioAdapter {
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(settings) {
    super(__deepMerge({}, settings || {}));
    this._lastLogLinesCountStack = [];
    this._loggedGroups = {};
    this._logsStack = [];
  }
  clear() {
    console.clear();
  }
  _getGroupObj(group, log = true) {
    var _a2;
    let groupObj = this._loggedGroups[group];
    if (!groupObj || ((_a2 = this._lastLogObj) === null || _a2 === void 0 ? void 0 : _a2.group) !== group) {
      groupObj = {
        color: getColorFor(group)
      };
      groupObj.prefix = __parseHtml(`<${groupObj.color}>█</${groupObj.color}>`);
      this._loggedGroups[group] = groupObj;
    }
    return groupObj;
  }
  log(logObj) {
    var _a2, _b2, _c2, _d2, _e2, _f, _g, _h, _j;
    const logger = (_a2 = logObj === null || logObj === void 0 ? void 0 : logObj.logger) !== null && _a2 !== void 0 ? _a2 : _nativeConsole.log;
    if (logObj.value instanceof HTMLElement) {
      return logger(logObj.value);
    }
    if (!logObj) {
      return logger(logObj);
    }
    const groupObj = this._getGroupObj(logObj.group);
    if (logObj.group !== ((_b2 = this._lastLogObj) === null || _b2 === void 0 ? void 0 : _b2.group)) {
      logger(groupObj.prefix);
      logger(__parseHtml(`<bg${__upperFirst(groupObj.color)}><black> ${logObj.group} </black></bg${__upperFirst(groupObj.color)}><${groupObj.color}>${"-".repeat(50)}</${groupObj.color}>`));
      logger(groupObj.prefix);
    }
    if (logObj.clear && ((_c2 = this._lastLogObj) === null || _c2 === void 0 ? void 0 : _c2.type) !== SLog.TYPE_WARN && ((_d2 = this._lastLogObj) === null || _d2 === void 0 ? void 0 : _d2.type) !== SLog.TYPE_ERROR) {
      console.clear();
    }
    let logLinesCount = 0;
    if ((_e2 = logObj.margin) === null || _e2 === void 0 ? void 0 : _e2.top) {
      for (let i = 0; i < logObj.margin.top; i++) {
        logger(__parseHtml(`<${groupObj.color}>█</${groupObj.color}>`));
      }
      logLinesCount += logObj.margin.top;
    }
    let logValue = (_h = (_g = (_f = logObj.value) === null || _f === void 0 ? void 0 : _f.value) !== null && _g !== void 0 ? _g : logObj.value) !== null && _h !== void 0 ? _h : logObj;
    let log = logValue;
    if (typeof logValue === "string") {
      log = __parseHtml(`<${groupObj.color}>█</${groupObj.color}> ${logValue}`);
    }
    logLinesCount += 1;
    logger(log);
    if ((_j = logObj.margin) === null || _j === void 0 ? void 0 : _j.bottom) {
      for (let i = 0; i < logObj.margin.bottom; i++) {
        logger(__parseHtml(`<${groupObj.color}>█</${groupObj.color}>`));
      }
      logLinesCount += logObj.margin.top;
    }
    this._lastLogLinesCountStack.push(logLinesCount);
    this._lastLogObj = logObj;
  }
  /**
   * @name          _ask
   * @type          Function
   * @private
   *
   * Method that actually log the passed log object with the passed component
   *
   * @param         {ILogAsk}        askObj            The ask object to ask to the user
   * @param         {ISStdioComponent}      component       The component to use for logging
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  _ask(askObj) {
    return new SPromise(({ resolve, reject, emit }) => __awaiter$m(this, void 0, void 0, function* () {
      throw new Error(`<red>[SStdioBasicAdapter]</red> The "ask" feature has not been implemented yet in the browser environment...`);
    }));
  }
}
var __awaiter$l = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SStdioSource extends SClass {
  constructor(settings) {
    super(settings);
    this._callbacks = {};
  }
  log(logObj) {
    var _a2;
    (_a2 = this._callbacks.log) === null || _a2 === void 0 ? void 0 : _a2.forEach((callback) => {
      callback(logObj);
    });
  }
  ask(askObj) {
    return new Promise((resolve, reject) => __awaiter$l(this, void 0, void 0, function* () {
      let answer;
      for (let [key, fn2] of this._callbacks.ask.entries()) {
        answer = yield fn2(askObj);
      }
      resolve(answer);
    }));
  }
  ready() {
    var _a2;
    (_a2 = this._callbacks.ready) === null || _a2 === void 0 ? void 0 : _a2.forEach((callback) => {
      callback();
    });
  }
  on(event, callback) {
    if (!this._callbacks[event]) {
      this._callbacks[event] = [];
    }
    if (this._callbacks[event].includes(callback)) {
      return;
    }
    this._callbacks[event].push(callback);
  }
  off(event, callback) {
    if (!this._callbacks[event]) {
      return;
    }
    if (!this._callbacks[event].includes(callback)) {
      return;
    }
    this._callbacks[event].splice(this._callbacks[event].indexOf(callback, 1));
  }
}
var __awaiter$k = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const _console$1 = {};
for (let key of ["log", "error", "warn", "success", "verbose", "notify"]) {
  _console$1[key] = console[key];
}
try {
  global._console = _console$1;
} catch (e) {
}
class SStdioConsoleSource extends SStdioSource {
  constructor(settings) {
    super(settings);
    this._tmpPrintedLogs = [];
    this._overrideNativeConsole();
    console.ask = (askObj) => __awaiter$k(this, void 0, void 0, function* () {
      this._restoreNativeConsole();
      yield __wait(100);
      const res = yield this.ask(askObj);
      this._overrideNativeConsole();
      return res;
    });
    setTimeout(() => {
      this.ready();
    });
  }
  /**
   * Restore native console (for ask, etc...)
   */
  _restoreNativeConsole() {
    for (let key of [
      "log",
      "error",
      "warn",
      "success",
      "verbose",
      "notify"
    ]) {
      console[key] = _console$1[key];
    }
  }
  /**
   * Override native console
   */
  _overrideNativeConsole() {
    var _a2;
    for (let key of [
      "log",
      "error",
      "warn",
      "success",
      "verbose",
      "notify"
    ]) {
      _console$1[key] = (_a2 = console[key]) !== null && _a2 !== void 0 ? _a2 : _console$1.log;
      console[key] = (...args) => {
        var _a3;
        args = args.filter((log) => {
          var _a4;
          if (log === null || log === void 0) {
            _console$1.log(log);
            return false;
          }
          if ((_a4 = log === null || log === void 0 ? void 0 : log.toString) === null || _a4 === void 0 ? void 0 : _a4.call(log).match(/[a-zA-Z0-9]Error\:/)) {
            _console$1.error(log);
            return false;
          }
          return true;
        });
        const e = new Error();
        const stack = e.stack.toString().split("\n").slice(2).map((str2) => str2.trim());
        const callerStr = (_a3 = stack[0]) !== null && _a3 !== void 0 ? _a3 : "";
        let group = callerStr.split(" ")[callerStr.match(/^at new/) ? 2 : 1].split(".")[0];
        if (group === "Timeout") {
          group = stack[1].split(" ")[callerStr.match(/^at new/) ? 2 : 1].split(".")[0];
        }
        if (group.match(`^file:///`)) {
          group = group.trim().split("/").pop();
        }
        args = args.map((log) => {
          var _a4, _b2, _c2, _d2;
          return new SLog({
            type: (_b2 = (_a4 = log === null || log === void 0 ? void 0 : log.type) !== null && _a4 !== void 0 ? _a4 : key) !== null && _b2 !== void 0 ? _b2 : SLog.TYPE_LOG,
            value: log,
            group: (_c2 = log === null || log === void 0 ? void 0 : log.group) !== null && _c2 !== void 0 ? _c2 : group,
            notify: key === "notify" || (log === null || log === void 0 ? void 0 : log.notify),
            verbose: key === "verbose" || (log === null || log === void 0 ? void 0 : log.verbose),
            metas: (_d2 = log === null || log === void 0 ? void 0 : log.metas) !== null && _d2 !== void 0 ? _d2 : {},
            // @ts-ignore
            logger: _console$1[key]
          });
        });
        args.forEach((log) => {
          this.log(log);
        });
      };
    }
  }
}
function loopsCount(timeframe = 100) {
  let sysm = 0, start = (/* @__PURE__ */ new Date()).getTime(), end = start;
  while (end - start === 0) {
    end = (/* @__PURE__ */ new Date()).getTime();
  }
  start = end;
  while (end - start < timeframe) {
    sysm++;
    end = (/* @__PURE__ */ new Date()).getTime();
  }
  return sysm;
}
function speedIndex(slow = 1e5, fast = 15e5) {
  const loopsCount$1 = loopsCount(100), index = 100 / (fast - slow) * loopsCount$1;
  return Math.round(index);
}
function __parseHsla(hslaString) {
  hslaString = hslaString.toLowerCase();
  const string = hslaString.replace("hsla(", "").replace("hsl(", "").replace(")", "").replace(/\s/g, "");
  const array = string.split(",");
  return {
    h: parseFloat(array[0]),
    s: parseFloat(array[1]),
    l: parseFloat(array[2]),
    a: array[3] ? parseFloat(array[3]) : 1
  };
}
function HSLAToRGBA(h, s, l, a) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(h / 60 % 2 - 1)), m = l - c / 2, r = 0, g2 = 0, b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g2 = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g2 = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g2 = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g2 = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g2 = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g2 = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g2 = Math.round((g2 + m) * 255);
  b = Math.round((b + m) * 255);
  return {
    r,
    g: g2,
    b,
    a
  };
}
function __hslaToRgba(h, s, l, a = 1) {
  if (typeof h === "string") {
    if (!h.match(/^hsla?\(/)) {
      throw new Error("<red>[hslaToRgba]</red> When passing a string to the first parameter, it MUST be formatted like: hsla?(.*)");
    }
    h = __parseHsla(h);
  }
  if (typeof h === "object") {
    h = h.h;
    s = h.s;
    l = h.l;
    a = h.a;
  }
  return HSLAToRGBA(h, s, l, a);
}
function hexToRGBA(h) {
  let r = 0, g2 = 0, b = 0;
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g2 = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g2 = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  return { r, g: g2, b, a: 1 };
}
function __hexToRgba(hex) {
  return hexToRGBA(hex);
}
function __parseRgba(rgbaString) {
  rgbaString = rgbaString.toLowerCase();
  const string = rgbaString.replace("rgba(", "").replace("rgb(", "").replace(")", "").replace(/\s/g, "");
  const array = string.split(",");
  return {
    r: parseInt(array[0]),
    g: parseInt(array[1]),
    b: parseInt(array[2]),
    a: array[3] ? parseInt(array[3]) : 1
  };
}
function RGBAToHSLA(r, g2, b, a) {
  r /= 255;
  g2 /= 255;
  b /= 255;
  let cmin = Math.min(r, g2, b), cmax = Math.max(r, g2, b), delta = cmax - cmin, h = 0, s = 0, l = 0;
  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = (g2 - b) / delta % 6;
  else if (cmax == g2)
    h = (b - r) / delta + 2;
  else
    h = (r - g2) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0)
    h += 360;
  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return { h, s, l, a };
}
function __rgbaToHsla(r, g2, b, a = 1) {
  if (typeof r === "string") {
    if (!r.match(/^rgba?\(/)) {
      throw new Error("<red>[rgbaToHsla]</red> When passing a string to the first parameter, it MUST be formatted like: rgba?(.*)");
    }
    r = __parseRgba(r);
  }
  if (typeof r === "object") {
    g2 = r.g;
    b = r.b;
    a = r.a;
    r = r.r;
  }
  return RGBAToHSLA(r, g2, b, a);
}
function __parseColor(color, format2 = "rgba") {
  color = color.replace(/\s/g, "");
  if (color.startsWith("rgb")) {
    color = __parseRgba(color);
  } else if (color.startsWith("hsl")) {
    color = __parseHsla(color);
    color = __hslaToRgba(color.h, color.s, color.l);
  } else if (color.startsWith("#")) {
    color = __hexToRgba(color);
  }
  switch (format2) {
    case "hsla":
    case "hsl":
      return __rgbaToHsla(color);
    case "rgba":
    case "rgb":
    default:
      return color;
  }
}
function RGBToHex(r, g2, b) {
  r = r.toString(16);
  g2 = g2.toString(16);
  b = b.toString(16);
  if (r.length == 1)
    r = "0" + r;
  if (g2.length == 1)
    g2 = "0" + g2;
  if (b.length == 1)
    b = "0" + b;
  return "#" + r + g2 + b;
}
function __rgbaToHex(r, g2, b, a = 1) {
  if (typeof r === "string") {
    if (!r.match(/^rgba?\(/)) {
      throw new Error("<red>[rgbaToHex]</red> When passing a string to the first parameter, it MUST be formatted like: rgba?(.*)");
    }
    r = __parseRgba(r);
  }
  if (typeof r === "object") {
    r = r.r;
    g2 = r.g;
    b = r.b;
  }
  return RGBToHex(r, g2, b);
}
function __convert(input, format2 = "rgba") {
  let rgbaObj = {};
  if (typeof input === "string") {
    rgbaObj = __parseColor(input, "rgba");
  } else if (typeof input === "object") {
    if (input.r !== void 0 && input.g !== void 0 && input.b !== void 0) {
      rgbaObj = input;
    } else if (input.h !== void 0 && input.s !== void 0 && input.l !== void 0) {
      rgbaObj = __hslaToRgba(input);
    }
  }
  switch (format2) {
    case "rgba":
      return rgbaObj;
    case "hsl":
    case "hsla":
      return __rgbaToHsla(rgbaObj);
    case "hex":
    case "hexString":
      return __rgbaToHex(rgbaObj);
    case "rgbString":
      return `rgb(${rgbaObj.r},${rgbaObj.g},${rgbaObj.b})`;
    case "rgbaString":
      return `rgba(${rgbaObj.r},${rgbaObj.g},${rgbaObj.b},${rgbaObj.a})`;
    case "hslString":
      const hslObj = convert(rgbaObj, "hsl");
      return `hsl(${hslObj.h},${hslObj.s},${hslObj.l})`;
    case "hslaString":
      const hslaObj = convert(rgbaObj, "hsla");
      return `hsla(${hslaObj.h},${hslaObj.s},${hslaObj.l},${hslaObj.a})`;
  }
  return void 0;
}
function HSLToHex(h, s, l) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(h / 60 % 2 - 1)), m = l - c / 2, r = 0, g2 = 0, b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g2 = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g2 = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g2 = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g2 = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g2 = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g2 = 0;
    b = x;
  }
  r = Math.round((r + m) * 255).toString(16);
  g2 = Math.round((g2 + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);
  if (r.length == 1)
    r = "0" + r;
  if (g2.length == 1)
    g2 = "0" + g2;
  if (b.length == 1)
    b = "0" + b;
  return "#" + r + g2 + b;
}
function __hslaToHex(h, s, l, a = 1) {
  if (typeof h === "string") {
    if (!h.match(/^hsla?\(/)) {
      throw new Error("<red>[hslaToRgba]</red> When passing a string to the first parameter, it MUST be formatted like: hsla?(.*)");
    }
    h = __parseHsla(h);
  }
  if (typeof h === "object") {
    h = h.h;
    s = h.s;
    l = h.l;
    a = h.a;
  }
  return HSLToHex(h, s, l);
}
function HSLAToHexA(h, s, l, a) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(h / 60 % 2 - 1)), m = l - c / 2, r = 0, g2 = 0, b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g2 = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g2 = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g2 = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g2 = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g2 = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g2 = 0;
    b = x;
  }
  r = Math.round((r + m) * 255).toString(16);
  g2 = Math.round((g2 + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);
  a = Math.round(a * 255).toString(16);
  if (r.length == 1)
    r = "0" + r;
  if (g2.length == 1)
    g2 = "0" + g2;
  if (b.length == 1)
    b = "0" + b;
  if (a.length == 1)
    a = "0" + a;
  return "#" + r + g2 + b + a;
}
function __hslaToHexa(h, s, l, a = 1) {
  if (typeof h === "string") {
    if (!h.match(/^hsla?\(/)) {
      throw new Error("<red>[hslaToRgba]</red> When passing a string to the first parameter, it MUST be formatted like: hsla?(.*)");
    }
    h = __parseHsla(h);
  }
  if (typeof h === "object") {
    h = h.h;
    s = h.s;
    l = h.l;
    a = h.a;
  }
  return HSLAToHexA(h, s, l, a);
}
class SColorApplyParamsInterface extends SInterface {
  static get _definition() {
    return {
      desaturate: {
        type: "Number",
        default: 0,
        alias: "d",
        description: "Allows you to desaturate the color using a percentage"
      },
      saturate: {
        type: "Number",
        default: 0,
        alias: "s",
        description: "Allows you to saturate the color using a percentage"
      },
      greyscale: {
        type: "Boolean",
        default: false,
        alias: "g",
        description: "Allows you to get back the grayscale version of your color"
      },
      spin: {
        type: "Number",
        default: 0,
        description: "Spin the hue on the passed value (max 360)"
      },
      transparentize: {
        type: "Number",
        default: 0,
        description: "The amount of transparency to apply between 0-100|0-1"
      },
      alpha: {
        type: "Number",
        default: 0,
        alias: "a",
        description: "The new alpha value to apply between 0-100|0-1"
      },
      opacity: {
        type: "Number",
        default: 0,
        alias: "o",
        description: "The new alpha value to apply between 0-100|0-1"
      },
      opacify: {
        type: "Number",
        default: 0,
        description: "The amount of transparence to remove between 0-100|0-1"
      },
      darken: {
        type: "Number",
        default: 0,
        description: "The amount of darkness (of the nightmare of the shadow) to apply between 0-100"
      },
      lighten: {
        type: "Number",
        default: 0,
        alias: "l",
        description: "The amount of lightness (of the sky of the angels) to apply between 0-100"
      },
      invert: {
        type: "Boolean",
        default: false,
        alias: "i",
        description: "Specify if you want to invert the color to keep a good contrast ratio with a background for example"
      }
    };
  }
}
class SColorSettingsInterface extends SInterface {
  static get _definition() {
    return {
      format: {
        description: "Specify the default format of the color",
        type: "String",
        values: ["hex", "hexa", "rgb", "rgba", "hsl", "hsla"],
        default: "hex"
      }
    };
  }
}
class Contrast {
  constructor(foreground, background) {
    this.foreground = new HexColor(foreground);
    this.background = new HexColor(background);
    this.value = (() => {
      const foreground2 = this.foreground.toEightBitColor().luminosity();
      const background2 = this.background.toEightBitColor().luminosity();
      const L1 = Math.max(foreground2, background2);
      const L2 = Math.min(foreground2, background2);
      const OFFSET = 0.05;
      return (L1 + OFFSET) / (L2 + OFFSET);
    })();
  }
  /** Returns the luminosity contrast ratio. */
  valueOf() {
    return this.value;
  }
}
class EightBit {
  constructor(value) {
    this.value = Number(value);
  }
  /** Returns the current value, e.g. 255. */
  valueOf() {
    return this.value;
  }
  /** Convert from sRGB to linear RGB. */
  linearize() {
    const SCALE = 255;
    const value = this.value / SCALE;
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  }
  /** Returns a Hex with the current value, e.g. Hex("#FF"). */
  toHex() {
    const value = this.value.toString(16).toUpperCase();
    return new Hex(`#${value}`);
  }
}
class EightBitColor {
  constructor(R, G, B) {
    this.R = new EightBit(R);
    this.G = new EightBit(G);
    this.B = new EightBit(B);
  }
  /** Returns the current red, green and blue values, e.g. { R: 255, G: 255, B: 255 }. */
  valueOf() {
    const R = this.R.valueOf();
    const G = this.G.valueOf();
    const B = this.B.valueOf();
    return { R, G, B };
  }
  /** Returns the luminosity. */
  luminosity() {
    const R_COEFFICIENT = 0.2126;
    const G_COEFFICIENT = 0.7152;
    const B_COEFFICIENT = 0.0722;
    const R = this.R.linearize();
    const G = this.G.linearize();
    const B = this.B.linearize();
    return R_COEFFICIENT * R + G_COEFFICIENT * G + B_COEFFICIENT * B;
  }
  /** Returns a HexColor with the current value, e.g. Hex("#FFFFFF"). */
  toHexColor() {
    const R = this.R.toHex().valueOf();
    const G = this.G.toHex().valueOf();
    const B = this.B.toHex().valueOf();
    return new HexColor(`#${R}${G}${B}`);
  }
}
function padStart(string, targetLength, padString) {
  if (string.toString().length >= targetLength) {
    return string;
  }
  return padStart(padString.concat(string), targetLength, padString);
}
class Hex {
  constructor(value) {
    this.value = value ? padStart(String(value).replace("#", "").toUpperCase(), 2, "0") : null;
  }
  /** Returns the current value, e.g. "FF". */
  valueOf() {
    return this.value;
  }
  /** Returns an EightBit with the current value, e.g. EightBit(255). */
  toEightBit() {
    const value = typeof this.value === "string" ? parseInt(this.value, 16) : null;
    return new EightBit(value);
  }
}
class HexColor {
  constructor(value) {
    this.value = (() => {
      if (!value) {
        return null;
      }
      const _value = (() => {
        switch (true) {
          case String(value).toLowerCase() === "black":
            return "000000";
          case String(value).toLowerCase() === "white":
            return "FFFFFF";
          default:
            return String(value).replace("#", "");
        }
      })();
      switch (_value.length) {
        case 2:
          return `${_value}${_value}${_value}`;
        case 3:
          return `${_value[0]}${_value[0]}${_value[1]}${_value[1]}${_value[2]}${_value[2]}`;
        default:
          return _value;
      }
    })();
    this.R = this.value ? new Hex(this.value.substr(0, 2)) : null;
    this.G = this.value ? new Hex(this.value.substr(2, 2)) : null;
    this.B = this.value ? new Hex(this.value.substr(4, 2)) : null;
  }
  /** Returns the current value, e.g. "FF". */
  valueOf() {
    return this.value;
  }
  /** Returns an EightBit with the current value, e.g. { R: 255, G: 255, B: 255 }. */
  toEightBitColor() {
    const R = this.R ? this.R.toEightBit().valueOf() : null;
    const G = this.G ? this.G.toEightBit().valueOf() : null;
    const B = this.B ? this.B.toEightBit().valueOf() : null;
    return new EightBitColor(R, G, B);
  }
}
class SColor extends SClass {
  /**
   * @name            getContrastInfo
   * @type            Function
   * @static
   *
   * This static function allows you to get the contact informations regarding two colors.
   * You will get back an object containing informations about the color1, color2 and a "value"
   * that represent the contrast between your colors between 0 and 21.
   *
   * @param           {String|SColor}             color1          The color 1 to check
   * @param           {String|SColor}             color2          The color 2 to check
   * @return          {ISColorContrastInfo}                       The contrast informations
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static getContrastInfo(color1, color2) {
    let color1Instance, color2Instance;
    if (typeof color1 === "string") {
      color1Instance = new SColor(color1);
    }
    if (typeof color2 === "string") {
      color2Instance = new SColor(color2);
    }
    const contrast = new Contrast(color1Instance.toHexaString(), color2Instance.toHexaString());
    const finalContrastInfo = {
      background: Object.assign({}, color2Instance.toObject()),
      foreground: Object.assign({}, color1Instance.toObject()),
      value: contrast.value
    };
    return finalContrastInfo;
  }
  /**
   * @name                  constructor
   * @type                  Function
   *
   * Constructor
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(color, settings) {
    var _c2, _d2;
    super(__deepMerge(
      // @ts-ignore
      SColorSettingsInterface.defaults(),
      settings !== null && settings !== void 0 ? settings : {}
    ));
    this._originalSColor = null;
    this._h = 0;
    this._s = 0;
    this._l = 0;
    this._r = 0;
    this._g = 0;
    this._b = 0;
    this._a = 1;
    this._format = "hexa";
    color = this.getColor(color);
    this._originalSColor = color;
    if (typeof color === "string") {
      try {
        this._parse(color);
      } catch (e) {
      }
    } else {
      if (color.h !== void 0 && color.s !== void 0 && color.l !== void 0) {
        this._h = color.h;
        this._s = color.s;
        this._l = color.l;
        this._a = (_c2 = color.a) !== null && _c2 !== void 0 ? _c2 : 1;
      } else if (color.r !== void 0 && color.g !== void 0 && color.b !== void 0) {
        const converted = __rgbaToHsla(color.r, color.g, color.b, (_d2 = color.a) !== null && _d2 !== void 0 ? _d2 : 1);
        this._h = converted.h;
        this._s = converted.s;
        this._l = converted.l;
        this._a = converted.a;
      } else {
        console.error(color);
        throw new Error("Sorry but this passed value is not a valid color object or string...");
      }
    }
  }
  /**
   * @name            getColor
   * @type            Function
   *
   * This method take as parameter the passed color to the constructor and has to return the
   * actual real color like color from the static colors listed in the SColor class or maybe
   * from the Sugar configured colors
   */
  getColor(color) {
    if (typeof color == "string" && SColor.colors[color.toLowerCase()]) {
      return SColor.colors[color.toLowerCase()];
    }
    return color;
  }
  /**
   * @name            _parse
   * @type            Function
   * @private
   *
   * Parse
   *
   * @param       {object}      color       The color to parse like (#ff0000 | rgba(...) | hsl(...) | {r:255,r:140,b:23,a:40})
   * @return      {object}                  The rgba representation of the passed color
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  _parse(color) {
    color = color.replace(/\%/gm, "");
    color = __convert(color, "hsla");
    this.h = color.h;
    this.s = color.s;
    this.l = color.l;
    this.a = color.a;
    return color;
  }
  /**
   * @name              convert2
   * @type              Function
   * @private
   *
   * Concert color
   *
   * @param       	{string}      	format 	      	The format wanted as output like (rgba,hsla and hex)
   * @values        rgba, hsla, hex
   * @return      	{object} 	                			The color in wanted object format
   *
   * @example           js
   * myColor._convert2('rgba');
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  _convert2(format2) {
    switch (format2) {
      case "rgba":
      case "rgb":
        return __hslaToRgba(this._h, this._s, this._l, this._a);
      case "hsla":
      case "hsl":
        return {
          h: this._h,
          s: this._s,
          l: this._l,
          a: this._a
        };
      case "hexa":
        return __hslaToHexa(this._h, this._s, this._l, this._a);
      case "hex":
        return __hslaToHex(this._h, this._s, this._l);
    }
  }
  /**
   * @name                toHex
   * @type                Function
   *
   * To hex
   *
   * @return 	{string} 		The hex string representation
   *
   * @example           js
   * myColor.toHex();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toHex() {
    return this._convert2("hex");
  }
  /**
   * @name                toHexa
   * @type                Function
   *
   * To hex
   *
   * @return 	{string} 		The hex string representation
   *
   * @example           js
   * myColor.toHexa();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toHexa() {
    return this._convert2("hexa");
  }
  /**
   * @name            toHsl
   * @type            Function
   *
   * To hsl
   *
   * @return 	{object} 		The hsl object representation
   *
   * @example       js
   * myColor.toHsl();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toHsl() {
    return this._convert2("hsl");
  }
  /**
   * @name            toHsla
   * @type            Function
   *
   * To hsla
   *
   * @return 	{object} 		The hsla object representation
   *
   * @example       js
   * myColor.toHsla();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toHsla() {
    return this._convert2("hsla");
  }
  /**
   * @name            toRgb
   * @type            Function
   *
   * To rgb
   *
   * @return 	{object} 		The rgb object representation
   *
   * @example         js
   * myColor.toRgb();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toRgb() {
    return this._convert2("rgb");
  }
  /**
   * @name            toRgba
   * @type            Function
   *
   * To rgba
   *
   * @return 	{object} 		The rgba object representation
   *
   * @example         js
   * myColor.toRgba();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toRgba() {
    return this._convert2("rgba");
  }
  /**
   * @name            r
   * @type            Number
   *
   * Get/set the red value
   *
   * @example         js
   * myColor.r;
   * myColor.r = 128;
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get r() {
    return this._r;
  }
  set r(value) {
    value = parseInt(value);
    value = value > 255 ? 255 : value < 0 ? 0 : value;
    this._r = value;
    this._applyFromRgbaUpdate();
  }
  /**
   * @name              g
   * @type              Number
   *
   * Get/set the green value
   *
   * @example         js
   * myColor.g;
   * myColor.g = 20;
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get g() {
    return this._g;
  }
  set g(value) {
    value = parseInt(value);
    value = value > 255 ? 255 : value < 0 ? 0 : value;
    this._g = value;
    this._applyFromRgbaUpdate();
  }
  /**
   * @name              b
   * @type              Number
   *
   * Get/set the blue value
   *
   * @example           js
   * myColor.b;
   * myColor.b = 30;
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get b() {
    return this._b;
  }
  set b(value) {
    value = parseInt(value);
    value = value > 255 ? 255 : value < 0 ? 0 : value;
    this._b = value;
    this._applyFromRgbaUpdate();
  }
  /**
   * @name              a
   * @type              Number
   *
   * Get/set the alpha value
   *
   * @example       js
   * myColor.a;
   * myColor.a = 20;
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get a() {
    return this._a;
  }
  set a(value) {
    value = parseFloat(value);
    value = value > 1 ? 1 : value < 0 ? 0 : value;
    this._a = value;
  }
  /**
   * @name              h
   * @type              Number
   *
   * Get/set the hue
   *
   * @example         js
   * myColor.h;
   * myColor.h = 30;
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get h() {
    return this._h;
  }
  set h(value) {
    value = parseInt(value);
    value = value > 360 ? 360 : value < 0 ? 0 : value;
    this._h = value;
    this._applyFromHslaUpdate();
  }
  /**
   * @name              s
   * @type              Number
   *
   * The saturation value
   *
   * @example         js
   * myColor.s;
   * myColor.s = 20;
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get s() {
    return this._s;
  }
  set s(value) {
    value = parseInt(value);
    value = value > 100 ? 100 : value < 0 ? 0 : value;
    this._s = value;
    this._applyFromHslaUpdate();
  }
  /**
   * @name              l
   * @type              Number
   *
   * The luminence value
   *
   * @example             js
   * myColor.l;
   * myColor.l = 10;
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get l() {
    return this._l;
  }
  set l(value) {
    value = parseInt(value);
    value = value > 100 ? 100 : value < 0 ? 0 : value;
    this._l = value;
    this._applyFromHslaUpdate();
  }
  /**
   * @name          clone
   * @type          Function
   *
   * Clone the SColor instance
   *
   * @example         js
   * myColor.clone();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  clone() {
    const newColor = new SColor({
      h: this._h,
      s: this._s,
      l: this._l,
      a: this._a
    });
    return newColor;
  }
  /**
   * @name          reset
   * @type          Function
   *
   * Reset to the original color
   *
   * @example         js
   * myColor.reset();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  reset() {
    this._parse(this._originalSColor);
  }
  _applyFromHslaUpdate() {
    const rgba = __hslaToRgba(this._h, this._s, this._l, this._a);
    this._r = rgba.r;
    this._g = rgba.g;
    this._b = rgba.b;
    this._a = rgba.a;
  }
  _applyFromRgbaUpdate() {
    const hsla = __rgbaToHsla(this._r, this._g, this._b, this._a);
    this._h = hsla.h;
    this._s = hsla.s;
    this._l = hsla.l;
    this._a = hsla.a;
  }
  /**
   * @name          apply
   * @type          Function
   *
   * This method allows you to apply some updated to your color
   * using the parameters defined in the SColorApplyInterface like
   * for example "saturate", "desaturate", etc...
   *
   * @param         {String|ISColorApplyParams}          params       The parameters you want to apply
   * @return        {SColor}                    Returns you the same instance to maintain chainability
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  apply(params) {
    const intRes = SColorApplyParamsInterface.apply(params);
    params = intRes;
    let colorInstance = this;
    Object.keys(params).forEach((action) => {
      const value = params[action];
      if (!value)
        return;
      if (!colorInstance[action] || typeof colorInstance[action] !== "function")
        return;
      if (action === "invert") {
        colorInstance.invert();
      } else {
        colorInstance[action](value);
      }
    });
    return colorInstance;
  }
  /**
   * @name                desaturate
   * @type                Function
   *
   * Desaturate
   *
   * @param         	{Number} 	          amount 	        	The amount of desaturation wanted between 0-100
   * @return 	        {SColor} 			                      	A new SColor instance or the actual one
   *
   * @example           js
   * myColor.desaturate(20);
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  desaturate(amount) {
    amount = parseInt(amount);
    this.s -= amount;
    return this;
  }
  /**
   * @name                saturate
   * @type                Function
   *
   * Saturate
   *
   * @param         	{Number}        	amount 	            	The amount of saturation wanted between 0-100
   * @return 	        {SColor} 			                         	A new SColor instance or the actual one
   *
   * @example         js
   * myColor.saturate(20);
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  saturate(amount) {
    amount = parseInt(amount);
    this.s += amount;
    return this;
  }
  /**
   * @name                      grayscale
   * @type                      Function
   *
   * Return a new SColor instance of the color to grayscale
   *
   * @return 	{SColor} 			A new SColor instance or the actual one
   *
   * @example           js
   * myColor.grayscale();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  grayscale() {
    this.s = 0;
    return this;
  }
  /**
   * @name              spin
   * @type              Function
   *
   * Spin the hue on the passed value (max 360)
   *
   * @param             	{Number}            	amount 		          	The amount of hue spin wanted between 0-360
   * @return 	            {SColor} 				                          	A new SColor instance or the actual one
   *
   * @example           js
   * myColor.spin(230);
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  spin(amount) {
    amount = parseInt(amount);
    const hue = this.h;
    let newHue = hue + amount;
    if (newHue > 360) {
      newHue -= 360;
    }
    this.h = newHue;
    return this;
  }
  /**
   * @name                alpha
   * @type                Function
   *
   * Set the alpha
   *
   * @param           	{Number} 	            alpha 		            	The new alpha value to apply between 0-100|0-1
   * @return          	{SColor} 					                            A new SColor instance or the actual one
   *
   * @example           js
   * myColor.alpha(10);
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  alpha(alpha) {
    alpha = parseFloat(alpha);
    this.a = alpha;
    return this;
  }
  /**
   * @name                  darken
   * @type                  Function
   *
   * Darken
   *
   * @param                 	{Number} 	                amount 	                	The amount of darkness (of the nightmare of the shadow) to apply between 0-100
   * @return                	{SColor} 				                                    A new SColor instance or the actual one
   *
   * @example             js
   * myColor.darken(20);
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  darken(amount) {
    amount = parseInt(amount);
    this.l -= amount;
    if (this.l < 0)
      this.l = 0;
    else if (this.l > 100)
      this.l = 100;
    return this;
  }
  /**
   * @name                      lighten
   * @type                      Function
   *
   * Lighten
   *
   * @param 	              {Number} 	              amount 	                	The amount of lightness (of the sky of the angels) to apply between 0-100
   * @return                	{SColor} 			                                  	A new SColor instance or the actual one
   *
   * @example             js
   * myColor.lighten(20);
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  lighten(amount) {
    amount = parseInt(amount);
    this.l += amount;
    if (this.l < 0)
      this.l = 0;
    else if (this.l > 100)
      this.l = 100;
    return this;
  }
  /**
   * @name                invert
   * @type                Function
   *
   * Calculate the best color value that will have the best contrast ratio
   *
   * @return      {SColor}              The SColor instance that represent this new color
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  invert() {
    let lightness = this.l;
    if (this.l >= 50) {
      lightness -= 50;
    } else {
      lightness += 50;
    }
    this.l = lightness;
    if (this.l < 0)
      this.l = 0;
    else if (this.l > 100)
      this.l = 100;
    return this;
  }
  /**
   * @name                  toObject
   * @type                  Function
   *
   * To simple json object. This object can be injected in the constructor to recover the same color
   *
   * @return 	            {object} 	              	The object representation of the color (r,g,b,a,h,s,l)
   *
   * @example           js
   * myColor.toObject();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toObject() {
    return {
      h: this.h,
      l: this.l,
      s: this.s,
      r: this.r,
      g: this.b,
      b: this.b,
      a: this.a,
      hex: this.toHexString(),
      hexa: this.toHexaString(),
      rgb: this.toRgbString(),
      rgba: this.toRgbaString(),
      hsl: this.toHslString(),
      hsla: this.toHslaString()
    };
  }
  /**
   * @name                  toHexString
   * @type                  Function
   *
   * To hex string
   *
   * @return 	            {string} 	              	The hex string representation of the color
   *
   * @example           js
   * myColor.toHexString();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toHexString() {
    return this._convert2("hex");
  }
  /**
   * @name                  toHexaString
   * @type                  Function
   *
   * To hex string
   *
   * @return 	            {string} 	              	The hex string representation of the color
   *
   * @example           js
   * myColor.toHexaString();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toHexaString() {
    return this._convert2("hexa");
  }
  /**
   * @name                  toRgbString
   * @type                  Function
   *
   * To rgb string
   *
   * @return 	              {string} 	              	The rgb string representation of the color
   *
   * @example           js
   * myColor.toRgbString();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toRgbString() {
    return `rgb(${this._r},${this._g},${this._b})`;
  }
  /**
   * @name                  toRgbaString
   * @type                  Function
   *
   * To rgba string
   *
   * @return 	              {string} 	              	The rgba string representation of the color
   *
   * @example           js
   * myColor.toRgbaString();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toRgbaString() {
    return `rgba(${this._r},${this._g},${this._b},${this._a})`;
  }
  /**
   * @name                    toHslString
   * @type                    Function
   *
   * To hsl string
   *
   * @return 	              {string} 	              	The hsl string representation of the color
   *
   * @example             js
   * myColor.toHslString();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toHslString() {
    const hsl = this._convert2("hsl");
    return `hsl(${hsl.h},${hsl.s},${hsl.l})`;
  }
  /**
   * @name                    toHslaString
   * @type                    Function
   *
   * To hsla string
   *
   * @return 	              {string} 	              	The hsl string representation of the color
   *
   * @example             js
   * myColor.toHslaString();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toHslaString() {
    const hsla = this._convert2("hsla");
    return `hsla(${hsla.h},${hsla.s},${hsla.l},${hsla.a})`;
  }
  /**
   * @name                toString
   * @type                Function
   *
   * To string
   *
   * @param       {String}              [format=this.settings.format]                The format you want back
   * @values        hex,hsl,rgba
   * @return 	      {string} 		                                                      The rgba string representation of the color
   *
   * @example         js
   * myColor.toString();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  toString(format2 = this.settings.format) {
    switch (format2) {
      case "hex":
        return this.toHexString();
      case "hsl":
        return this.toHslString();
      case "hsla":
        return this.toHslaString();
      case "rgb":
        return this.toRgbString();
      case "rgba":
      default:
        return this.toRgbaString();
    }
  }
}
SColor.colors = {};
var knownCssProperties = {};
const properties = [
  "-epub-caption-side",
  "-epub-hyphens",
  "-epub-text-combine",
  "-epub-text-emphasis",
  "-epub-text-emphasis-color",
  "-epub-text-emphasis-style",
  "-epub-text-orientation",
  "-epub-text-transform",
  "-epub-word-break",
  "-epub-writing-mode",
  "-internal-text-autosizing-status",
  "accelerator",
  "accent-color",
  "-wap-accesskey",
  "additive-symbols",
  "align-content",
  "-webkit-align-content",
  "align-items",
  "-webkit-align-items",
  "align-self",
  "-webkit-align-self",
  "alignment-baseline",
  "all",
  "alt",
  "-webkit-alt",
  "animation",
  "animation-delay",
  "-moz-animation-delay",
  "-ms-animation-delay",
  "-webkit-animation-delay",
  "animation-direction",
  "-moz-animation-direction",
  "-ms-animation-direction",
  "-webkit-animation-direction",
  "animation-duration",
  "-moz-animation-duration",
  "-ms-animation-duration",
  "-webkit-animation-duration",
  "animation-fill-mode",
  "-moz-animation-fill-mode",
  "-ms-animation-fill-mode",
  "-webkit-animation-fill-mode",
  "animation-iteration-count",
  "-moz-animation-iteration-count",
  "-ms-animation-iteration-count",
  "-webkit-animation-iteration-count",
  "-moz-animation",
  "-ms-animation",
  "animation-name",
  "-moz-animation-name",
  "-ms-animation-name",
  "-webkit-animation-name",
  "animation-play-state",
  "-moz-animation-play-state",
  "-ms-animation-play-state",
  "-webkit-animation-play-state",
  "animation-timing-function",
  "-moz-animation-timing-function",
  "-ms-animation-timing-function",
  "-webkit-animation-timing-function",
  "-webkit-animation-trigger",
  "-webkit-animation",
  "app-region",
  "-webkit-app-region",
  "appearance",
  "-moz-appearance",
  "-webkit-appearance",
  "ascent-override",
  "aspect-ratio",
  "-webkit-aspect-ratio",
  "audio-level",
  "azimuth",
  "backdrop-filter",
  "-webkit-backdrop-filter",
  "backface-visibility",
  "-moz-backface-visibility",
  "-ms-backface-visibility",
  "-webkit-backface-visibility",
  "background",
  "background-attachment",
  "-webkit-background-attachment",
  "background-blend-mode",
  "background-clip",
  "-moz-background-clip",
  "-webkit-background-clip",
  "background-color",
  "-webkit-background-color",
  "-webkit-background-composite",
  "background-image",
  "-webkit-background-image",
  "-moz-background-inline-policy",
  "background-origin",
  "-moz-background-origin",
  "-webkit-background-origin",
  "background-position",
  "-webkit-background-position",
  "background-position-x",
  "-webkit-background-position-x",
  "background-position-y",
  "-webkit-background-position-y",
  "background-repeat",
  "-webkit-background-repeat",
  "background-repeat-x",
  "background-repeat-y",
  "background-size",
  "-moz-background-size",
  "-webkit-background-size",
  "-webkit-background",
  "base-palette",
  "baseline-shift",
  "baseline-source",
  "behavior",
  "-moz-binding",
  "block-ellipsis",
  "-ms-block-progression",
  "block-size",
  "block-step",
  "block-step-align",
  "block-step-insert",
  "block-step-round",
  "block-step-size",
  "bookmark-label",
  "bookmark-level",
  "bookmark-state",
  "border",
  "-webkit-border-after-color",
  "-webkit-border-after-style",
  "-webkit-border-after",
  "-webkit-border-after-width",
  "-webkit-border-before-color",
  "-webkit-border-before-style",
  "-webkit-border-before",
  "-webkit-border-before-width",
  "border-block",
  "border-block-color",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",
  "border-block-style",
  "border-block-width",
  "border-bottom",
  "border-bottom-color",
  "-moz-border-bottom-colors",
  "border-bottom-left-radius",
  "-webkit-border-bottom-left-radius",
  "border-bottom-right-radius",
  "-webkit-border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-boundary",
  "border-collapse",
  "border-color",
  "-moz-border-end-color",
  "-webkit-border-end-color",
  "border-end-end-radius",
  "-moz-border-end",
  "border-end-start-radius",
  "-moz-border-end-style",
  "-webkit-border-end-style",
  "-webkit-border-end",
  "-moz-border-end-width",
  "-webkit-border-end-width",
  "-webkit-border-fit",
  "-webkit-border-horizontal-spacing",
  "border-image",
  "-moz-border-image",
  "-o-border-image",
  "border-image-outset",
  "-webkit-border-image-outset",
  "border-image-repeat",
  "-webkit-border-image-repeat",
  "border-image-slice",
  "-webkit-border-image-slice",
  "border-image-source",
  "-webkit-border-image-source",
  "-webkit-border-image",
  "border-image-width",
  "-webkit-border-image-width",
  "border-inline",
  "border-inline-color",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",
  "border-inline-style",
  "border-inline-width",
  "border-left",
  "border-left-color",
  "-moz-border-left-colors",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "-moz-border-radius-bottomleft",
  "-moz-border-radius-bottomright",
  "-moz-border-radius",
  "-moz-border-radius-topleft",
  "-moz-border-radius-topright",
  "-webkit-border-radius",
  "border-right",
  "border-right-color",
  "-moz-border-right-colors",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "-moz-border-start-color",
  "-webkit-border-start-color",
  "border-start-end-radius",
  "-moz-border-start",
  "border-start-start-radius",
  "-moz-border-start-style",
  "-webkit-border-start-style",
  "-webkit-border-start",
  "-moz-border-start-width",
  "-webkit-border-start-width",
  "border-style",
  "border-top",
  "border-top-color",
  "-moz-border-top-colors",
  "border-top-left-radius",
  "-webkit-border-top-left-radius",
  "border-top-right-radius",
  "-webkit-border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "-webkit-border-vertical-spacing",
  "border-width",
  "bottom",
  "-moz-box-align",
  "-webkit-box-align",
  "box-decoration-break",
  "-webkit-box-decoration-break",
  "-moz-box-direction",
  "-webkit-box-direction",
  "-webkit-box-flex-group",
  "-moz-box-flex",
  "-webkit-box-flex",
  "-webkit-box-lines",
  "-moz-box-ordinal-group",
  "-webkit-box-ordinal-group",
  "-moz-box-orient",
  "-webkit-box-orient",
  "-moz-box-pack",
  "-webkit-box-pack",
  "-webkit-box-reflect",
  "box-shadow",
  "-moz-box-shadow",
  "-webkit-box-shadow",
  "box-sizing",
  "-moz-box-sizing",
  "-webkit-box-sizing",
  "box-snap",
  "break-after",
  "break-before",
  "break-inside",
  "buffered-rendering",
  "caption-side",
  "caret",
  "caret-color",
  "caret-shape",
  "chains",
  "clear",
  "clip",
  "clip-path",
  "-webkit-clip-path",
  "clip-rule",
  "color",
  "color-adjust",
  "-webkit-color-correction",
  "-apple-color-filter",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "color-scheme",
  "-webkit-column-axis",
  "-webkit-column-break-after",
  "-webkit-column-break-before",
  "-webkit-column-break-inside",
  "column-count",
  "-moz-column-count",
  "-webkit-column-count",
  "column-fill",
  "-moz-column-fill",
  "-webkit-column-fill",
  "column-gap",
  "-moz-column-gap",
  "-webkit-column-gap",
  "column-progression",
  "-webkit-column-progression",
  "column-rule",
  "column-rule-color",
  "-moz-column-rule-color",
  "-webkit-column-rule-color",
  "-moz-column-rule",
  "column-rule-style",
  "-moz-column-rule-style",
  "-webkit-column-rule-style",
  "-webkit-column-rule",
  "column-rule-width",
  "-moz-column-rule-width",
  "-webkit-column-rule-width",
  "column-span",
  "-moz-column-span",
  "-webkit-column-span",
  "column-width",
  "-moz-column-width",
  "-webkit-column-width",
  "columns",
  "-moz-columns",
  "-webkit-columns",
  "-webkit-composition-fill-color",
  "-webkit-composition-frame-color",
  "contain",
  "contain-intrinsic-block-size",
  "contain-intrinsic-height",
  "contain-intrinsic-inline-size",
  "contain-intrinsic-size",
  "contain-intrinsic-width",
  "container",
  "container-name",
  "container-type",
  "content",
  "content-visibility",
  "-ms-content-zoom-chaining",
  "-ms-content-zoom-limit-max",
  "-ms-content-zoom-limit-min",
  "-ms-content-zoom-limit",
  "-ms-content-zoom-snap",
  "-ms-content-zoom-snap-points",
  "-ms-content-zoom-snap-type",
  "-ms-content-zooming",
  "continue",
  "counter-increment",
  "counter-reset",
  "counter-set",
  "cue",
  "cue-after",
  "cue-before",
  "cursor",
  "-webkit-cursor-visibility",
  "cx",
  "cy",
  "d",
  "-apple-dashboard-region",
  "-webkit-dashboard-region",
  "descent-override",
  "direction",
  "display",
  "display-align",
  "dominant-baseline",
  "elevation",
  "empty-cells",
  "enable-background",
  "epub-caption-side",
  "epub-hyphens",
  "epub-text-combine",
  "epub-text-emphasis",
  "epub-text-emphasis-color",
  "epub-text-emphasis-style",
  "epub-text-orientation",
  "epub-text-transform",
  "epub-word-break",
  "epub-writing-mode",
  "fallback",
  "fill",
  "fill-break",
  "fill-color",
  "fill-image",
  "fill-opacity",
  "fill-origin",
  "fill-position",
  "fill-repeat",
  "fill-rule",
  "fill-size",
  "filter",
  "-ms-filter",
  "-webkit-filter",
  "flex",
  "-ms-flex-align",
  "-webkit-flex-align",
  "flex-basis",
  "-webkit-flex-basis",
  "flex-direction",
  "-ms-flex-direction",
  "-webkit-flex-direction",
  "flex-flow",
  "-ms-flex-flow",
  "-webkit-flex-flow",
  "flex-grow",
  "-webkit-flex-grow",
  "-ms-flex-item-align",
  "-webkit-flex-item-align",
  "-ms-flex-line-pack",
  "-webkit-flex-line-pack",
  "-ms-flex",
  "-ms-flex-negative",
  "-ms-flex-order",
  "-webkit-flex-order",
  "-ms-flex-pack",
  "-webkit-flex-pack",
  "-ms-flex-positive",
  "-ms-flex-preferred-size",
  "flex-shrink",
  "-webkit-flex-shrink",
  "-webkit-flex",
  "flex-wrap",
  "-ms-flex-wrap",
  "-webkit-flex-wrap",
  "float",
  "float-defer",
  "-moz-float-edge",
  "float-offset",
  "float-reference",
  "flood-color",
  "flood-opacity",
  "flow",
  "flow-from",
  "-ms-flow-from",
  "-webkit-flow-from",
  "flow-into",
  "-ms-flow-into",
  "-webkit-flow-into",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "-moz-font-feature-settings",
  "-ms-font-feature-settings",
  "-webkit-font-feature-settings",
  "font-kerning",
  "-webkit-font-kerning",
  "font-language-override",
  "-moz-font-language-override",
  "font-optical-sizing",
  "font-palette",
  "font-size",
  "font-size-adjust",
  "-webkit-font-size-delta",
  "-webkit-font-smoothing",
  "font-stretch",
  "font-style",
  "font-synthesis",
  "font-synthesis-small-caps",
  "font-synthesis-style",
  "font-synthesis-weight",
  "font-variant",
  "font-variant-alternates",
  "font-variant-caps",
  "font-variant-east-asian",
  "font-variant-emoji",
  "font-variant-ligatures",
  "-webkit-font-variant-ligatures",
  "font-variant-numeric",
  "font-variant-position",
  "font-variation-settings",
  "font-weight",
  "footnote-display",
  "footnote-policy",
  "-moz-force-broken-image-icon",
  "forced-color-adjust",
  "gap",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "grid",
  "-webkit-grid-after",
  "grid-area",
  "grid-auto-columns",
  "-webkit-grid-auto-columns",
  "grid-auto-flow",
  "-webkit-grid-auto-flow",
  "grid-auto-rows",
  "-webkit-grid-auto-rows",
  "-webkit-grid-before",
  "grid-column",
  "-ms-grid-column-align",
  "grid-column-end",
  "grid-column-gap",
  "-ms-grid-column",
  "-ms-grid-column-span",
  "grid-column-start",
  "-webkit-grid-column",
  "-ms-grid-columns",
  "-webkit-grid-columns",
  "-webkit-grid-end",
  "grid-gap",
  "grid-row",
  "-ms-grid-row-align",
  "grid-row-end",
  "grid-row-gap",
  "-ms-grid-row",
  "-ms-grid-row-span",
  "grid-row-start",
  "-webkit-grid-row",
  "-ms-grid-rows",
  "-webkit-grid-rows",
  "-webkit-grid-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "hanging-punctuation",
  "height",
  "-ms-high-contrast-adjust",
  "-webkit-highlight",
  "hyphenate-character",
  "-webkit-hyphenate-character",
  "-webkit-hyphenate-limit-after",
  "-webkit-hyphenate-limit-before",
  "hyphenate-limit-chars",
  "-ms-hyphenate-limit-chars",
  "hyphenate-limit-last",
  "hyphenate-limit-lines",
  "-ms-hyphenate-limit-lines",
  "-webkit-hyphenate-limit-lines",
  "hyphenate-limit-zone",
  "-ms-hyphenate-limit-zone",
  "hyphens",
  "-moz-hyphens",
  "-ms-hyphens",
  "-webkit-hyphens",
  "image-orientation",
  "-moz-image-region",
  "image-rendering",
  "image-resolution",
  "-ms-ime-align",
  "ime-mode",
  "inherits",
  "initial-letter",
  "initial-letter-align",
  "-webkit-initial-letter",
  "initial-letter-wrap",
  "initial-value",
  "inline-size",
  "inline-sizing",
  "input-format",
  "-wap-input-format",
  "-wap-input-required",
  "input-security",
  "inset",
  "inset-block",
  "inset-block-end",
  "inset-block-start",
  "inset-inline",
  "inset-inline-end",
  "inset-inline-start",
  "-ms-interpolation-mode",
  "isolation",
  "justify-content",
  "-webkit-justify-content",
  "justify-items",
  "-webkit-justify-items",
  "justify-self",
  "-webkit-justify-self",
  "kerning",
  "layout-flow",
  "layout-grid",
  "layout-grid-char",
  "layout-grid-line",
  "layout-grid-mode",
  "layout-grid-type",
  "leading-trim",
  "left",
  "letter-spacing",
  "lighting-color",
  "-webkit-line-align",
  "-webkit-line-box-contain",
  "line-break",
  "-webkit-line-break",
  "line-clamp",
  "-webkit-line-clamp",
  "line-gap-override",
  "line-grid",
  "-webkit-line-grid-snap",
  "-webkit-line-grid",
  "line-height",
  "line-height-step",
  "line-increment",
  "line-padding",
  "line-snap",
  "-webkit-line-snap",
  "-o-link",
  "-o-link-source",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "-webkit-locale",
  "-webkit-logical-height",
  "-webkit-logical-width",
  "margin",
  "-webkit-margin-after-collapse",
  "-webkit-margin-after",
  "-webkit-margin-before-collapse",
  "-webkit-margin-before",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "-webkit-margin-bottom-collapse",
  "margin-break",
  "-webkit-margin-collapse",
  "-moz-margin-end",
  "-webkit-margin-end",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "-moz-margin-start",
  "-webkit-margin-start",
  "margin-top",
  "-webkit-margin-top-collapse",
  "margin-trim",
  "marker",
  "marker-end",
  "marker-knockout-left",
  "marker-knockout-right",
  "marker-mid",
  "marker-offset",
  "marker-pattern",
  "marker-segment",
  "marker-side",
  "marker-start",
  "marks",
  "-wap-marquee-dir",
  "-webkit-marquee-direction",
  "-webkit-marquee-increment",
  "-wap-marquee-loop",
  "-webkit-marquee-repetition",
  "-wap-marquee-speed",
  "-webkit-marquee-speed",
  "-wap-marquee-style",
  "-webkit-marquee-style",
  "-webkit-marquee",
  "mask",
  "-webkit-mask-attachment",
  "mask-border",
  "mask-border-mode",
  "mask-border-outset",
  "mask-border-repeat",
  "mask-border-slice",
  "mask-border-source",
  "mask-border-width",
  "-webkit-mask-box-image-outset",
  "-webkit-mask-box-image-repeat",
  "-webkit-mask-box-image-slice",
  "-webkit-mask-box-image-source",
  "-webkit-mask-box-image",
  "-webkit-mask-box-image-width",
  "mask-clip",
  "-webkit-mask-clip",
  "mask-composite",
  "-webkit-mask-composite",
  "mask-image",
  "-webkit-mask-image",
  "mask-mode",
  "mask-origin",
  "-webkit-mask-origin",
  "mask-position",
  "-webkit-mask-position",
  "mask-position-x",
  "-webkit-mask-position-x",
  "mask-position-y",
  "-webkit-mask-position-y",
  "mask-repeat",
  "-webkit-mask-repeat",
  "-webkit-mask-repeat-x",
  "-webkit-mask-repeat-y",
  "mask-size",
  "-webkit-mask-size",
  "mask-source-type",
  "-webkit-mask-source-type",
  "mask-type",
  "-webkit-mask",
  "-webkit-match-nearest-mail-blockquote-color",
  "math-style",
  "max-block-size",
  "max-height",
  "max-inline-size",
  "max-lines",
  "-webkit-max-logical-height",
  "-webkit-max-logical-width",
  "max-width",
  "max-zoom",
  "min-block-size",
  "min-height",
  "min-inline-size",
  "min-intrinsic-sizing",
  "-webkit-min-logical-height",
  "-webkit-min-logical-width",
  "min-width",
  "min-zoom",
  "mix-blend-mode",
  "motion",
  "motion-offset",
  "motion-path",
  "motion-rotation",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "-webkit-nbsp-mode",
  "negative",
  "object-fit",
  "-o-object-fit",
  "object-overflow",
  "object-position",
  "-o-object-position",
  "object-view-box",
  "offset",
  "offset-anchor",
  "offset-block-end",
  "offset-block-start",
  "offset-distance",
  "offset-inline-end",
  "offset-inline-start",
  "offset-path",
  "offset-position",
  "offset-rotate",
  "offset-rotation",
  "opacity",
  "-moz-opacity",
  "-webkit-opacity",
  "order",
  "-webkit-order",
  "-moz-orient",
  "orientation",
  "orphans",
  "-moz-osx-font-smoothing",
  "outline",
  "outline-color",
  "-moz-outline-color",
  "-moz-outline",
  "outline-offset",
  "-moz-outline-offset",
  "-moz-outline-radius-bottomleft",
  "-moz-outline-radius-bottomright",
  "-moz-outline-radius",
  "-moz-outline-radius-topleft",
  "-moz-outline-radius-topright",
  "outline-style",
  "-moz-outline-style",
  "outline-width",
  "-moz-outline-width",
  "overflow",
  "overflow-anchor",
  "overflow-block",
  "overflow-clip-margin",
  "overflow-inline",
  "-webkit-overflow-scrolling",
  "-ms-overflow-style",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "override-colors",
  "overscroll-behavior",
  "overscroll-behavior-block",
  "overscroll-behavior-inline",
  "overscroll-behavior-x",
  "overscroll-behavior-y",
  "pad",
  "padding",
  "-webkit-padding-after",
  "-webkit-padding-before",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "-moz-padding-end",
  "-webkit-padding-end",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "-moz-padding-start",
  "-webkit-padding-start",
  "padding-top",
  "page",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "page-orientation",
  "paint-order",
  "pause",
  "pause-after",
  "pause-before",
  "-apple-pay-button-style",
  "-apple-pay-button-type",
  "pen-action",
  "perspective",
  "-moz-perspective",
  "-ms-perspective",
  "perspective-origin",
  "-moz-perspective-origin",
  "-ms-perspective-origin",
  "-webkit-perspective-origin",
  "perspective-origin-x",
  "-webkit-perspective-origin-x",
  "perspective-origin-y",
  "-webkit-perspective-origin-y",
  "-webkit-perspective",
  "pitch",
  "pitch-range",
  "place-content",
  "place-items",
  "place-self",
  "play-during",
  "pointer-events",
  "position",
  "prefix",
  "print-color-adjust",
  "-webkit-print-color-adjust",
  "property-name",
  "quotes",
  "r",
  "range",
  "-webkit-region-break-after",
  "-webkit-region-break-before",
  "-webkit-region-break-inside",
  "region-fragment",
  "-webkit-region-fragment",
  "-webkit-region-overflow",
  "resize",
  "rest",
  "rest-after",
  "rest-before",
  "richness",
  "right",
  "rotate",
  "row-gap",
  "-webkit-rtl-ordering",
  "ruby-align",
  "ruby-merge",
  "ruby-overhang",
  "ruby-position",
  "-webkit-ruby-position",
  "running",
  "rx",
  "ry",
  "scale",
  "scroll-behavior",
  "-ms-scroll-chaining",
  "-ms-scroll-limit",
  "-ms-scroll-limit-x-max",
  "-ms-scroll-limit-x-min",
  "-ms-scroll-limit-y-max",
  "-ms-scroll-limit-y-min",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "-ms-scroll-rails",
  "scroll-snap-align",
  "scroll-snap-coordinate",
  "-webkit-scroll-snap-coordinate",
  "scroll-snap-destination",
  "-webkit-scroll-snap-destination",
  "scroll-snap-margin",
  "scroll-snap-margin-bottom",
  "scroll-snap-margin-left",
  "scroll-snap-margin-right",
  "scroll-snap-margin-top",
  "scroll-snap-points-x",
  "-ms-scroll-snap-points-x",
  "-webkit-scroll-snap-points-x",
  "scroll-snap-points-y",
  "-ms-scroll-snap-points-y",
  "-webkit-scroll-snap-points-y",
  "scroll-snap-stop",
  "scroll-snap-type",
  "-ms-scroll-snap-type",
  "-webkit-scroll-snap-type",
  "scroll-snap-type-x",
  "scroll-snap-type-y",
  "-ms-scroll-snap-x",
  "-ms-scroll-snap-y",
  "-ms-scroll-translation",
  "scrollbar-arrow-color",
  "scrollbar-base-color",
  "scrollbar-color",
  "scrollbar-dark-shadow-color",
  "scrollbar-darkshadow-color",
  "scrollbar-face-color",
  "scrollbar-gutter",
  "scrollbar-highlight-color",
  "scrollbar-shadow-color",
  "scrollbar-track-color",
  "scrollbar-width",
  "scrollbar3d-light-color",
  "scrollbar3dlight-color",
  "shape-image-threshold",
  "-webkit-shape-image-threshold",
  "shape-inside",
  "-webkit-shape-inside",
  "shape-margin",
  "-webkit-shape-margin",
  "shape-outside",
  "-webkit-shape-outside",
  "-webkit-shape-padding",
  "shape-rendering",
  "size",
  "size-adjust",
  "snap-height",
  "solid-color",
  "solid-opacity",
  "spatial-navigation-action",
  "spatial-navigation-contain",
  "spatial-navigation-function",
  "speak",
  "speak-as",
  "speak-header",
  "speak-numeral",
  "speak-punctuation",
  "speech-rate",
  "src",
  "-moz-stack-sizing",
  "stop-color",
  "stop-opacity",
  "stress",
  "string-set",
  "stroke",
  "stroke-align",
  "stroke-alignment",
  "stroke-break",
  "stroke-color",
  "stroke-dash-corner",
  "stroke-dash-justify",
  "stroke-dashadjust",
  "stroke-dasharray",
  "stroke-dashcorner",
  "stroke-dashoffset",
  "stroke-image",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-origin",
  "stroke-position",
  "stroke-repeat",
  "stroke-size",
  "stroke-width",
  "suffix",
  "supported-color-schemes",
  "-webkit-svg-shadow",
  "symbols",
  "syntax",
  "system",
  "tab-size",
  "-moz-tab-size",
  "-o-tab-size",
  "-o-table-baseline",
  "table-layout",
  "-webkit-tap-highlight-color",
  "text-align",
  "text-align-all",
  "text-align-last",
  "-moz-text-align-last",
  "text-anchor",
  "text-autospace",
  "-moz-text-blink",
  "-ms-text-combine-horizontal",
  "text-combine-upright",
  "-webkit-text-combine",
  "text-decoration",
  "text-decoration-blink",
  "text-decoration-color",
  "-moz-text-decoration-color",
  "-webkit-text-decoration-color",
  "text-decoration-line",
  "-moz-text-decoration-line",
  "text-decoration-line-through",
  "-webkit-text-decoration-line",
  "text-decoration-none",
  "text-decoration-overline",
  "text-decoration-skip",
  "text-decoration-skip-box",
  "text-decoration-skip-ink",
  "text-decoration-skip-inset",
  "text-decoration-skip-self",
  "text-decoration-skip-spaces",
  "-webkit-text-decoration-skip",
  "text-decoration-style",
  "-moz-text-decoration-style",
  "-webkit-text-decoration-style",
  "text-decoration-thickness",
  "text-decoration-underline",
  "-webkit-text-decoration",
  "-webkit-text-decorations-in-effect",
  "text-edge",
  "text-emphasis",
  "text-emphasis-color",
  "-webkit-text-emphasis-color",
  "text-emphasis-position",
  "-webkit-text-emphasis-position",
  "text-emphasis-skip",
  "text-emphasis-style",
  "-webkit-text-emphasis-style",
  "-webkit-text-emphasis",
  "-webkit-text-fill-color",
  "text-group-align",
  "text-indent",
  "text-justify",
  "text-justify-trim",
  "text-kashida",
  "text-kashida-space",
  "text-line-through",
  "text-line-through-color",
  "text-line-through-mode",
  "text-line-through-style",
  "text-line-through-width",
  "text-orientation",
  "-webkit-text-orientation",
  "text-overflow",
  "text-overline",
  "text-overline-color",
  "text-overline-mode",
  "text-overline-style",
  "text-overline-width",
  "text-rendering",
  "-webkit-text-security",
  "text-shadow",
  "text-size-adjust",
  "-moz-text-size-adjust",
  "-ms-text-size-adjust",
  "-webkit-text-size-adjust",
  "text-space-collapse",
  "text-space-trim",
  "text-spacing",
  "-webkit-text-stroke-color",
  "-webkit-text-stroke",
  "-webkit-text-stroke-width",
  "text-transform",
  "text-underline",
  "text-underline-color",
  "text-underline-mode",
  "text-underline-offset",
  "text-underline-position",
  "-webkit-text-underline-position",
  "text-underline-style",
  "text-underline-width",
  "text-wrap",
  "-webkit-text-zoom",
  "top",
  "touch-action",
  "touch-action-delay",
  "-ms-touch-action",
  "-webkit-touch-callout",
  "-ms-touch-select",
  "-apple-trailing-word",
  "transform",
  "transform-box",
  "-moz-transform",
  "-ms-transform",
  "-o-transform",
  "transform-origin",
  "-moz-transform-origin",
  "-ms-transform-origin",
  "-o-transform-origin",
  "-webkit-transform-origin",
  "transform-origin-x",
  "-webkit-transform-origin-x",
  "transform-origin-y",
  "-webkit-transform-origin-y",
  "transform-origin-z",
  "-webkit-transform-origin-z",
  "transform-style",
  "-moz-transform-style",
  "-ms-transform-style",
  "-webkit-transform-style",
  "-webkit-transform",
  "transition",
  "transition-delay",
  "-moz-transition-delay",
  "-ms-transition-delay",
  "-o-transition-delay",
  "-webkit-transition-delay",
  "transition-duration",
  "-moz-transition-duration",
  "-ms-transition-duration",
  "-o-transition-duration",
  "-webkit-transition-duration",
  "-moz-transition",
  "-ms-transition",
  "-o-transition",
  "transition-property",
  "-moz-transition-property",
  "-ms-transition-property",
  "-o-transition-property",
  "-webkit-transition-property",
  "transition-timing-function",
  "-moz-transition-timing-function",
  "-ms-transition-timing-function",
  "-o-transition-timing-function",
  "-webkit-transition-timing-function",
  "-webkit-transition",
  "translate",
  "uc-alt-skin",
  "uc-skin",
  "unicode-bidi",
  "unicode-range",
  "-webkit-user-drag",
  "-moz-user-focus",
  "-moz-user-input",
  "-moz-user-modify",
  "-webkit-user-modify",
  "user-select",
  "-moz-user-select",
  "-ms-user-select",
  "-webkit-user-select",
  "user-zoom",
  "vector-effect",
  "vertical-align",
  "viewport-fill",
  "viewport-fill-opacity",
  "viewport-fit",
  "visibility",
  "voice-balance",
  "voice-duration",
  "voice-family",
  "voice-pitch",
  "voice-range",
  "voice-rate",
  "voice-stress",
  "voice-volume",
  "volume",
  "white-space",
  "-webkit-widget-region",
  "widows",
  "width",
  "will-change",
  "-moz-window-dragging",
  "-moz-window-shadow",
  "word-boundary-detection",
  "word-boundary-expansion",
  "word-break",
  "word-spacing",
  "word-wrap",
  "wrap-after",
  "wrap-before",
  "wrap-flow",
  "-ms-wrap-flow",
  "-webkit-wrap-flow",
  "wrap-inside",
  "-ms-wrap-margin",
  "-webkit-wrap-margin",
  "-webkit-wrap-padding",
  "-webkit-wrap-shape-inside",
  "-webkit-wrap-shape-outside",
  "wrap-through",
  "-ms-wrap-through",
  "-webkit-wrap-through",
  "-webkit-wrap",
  "writing-mode",
  "-webkit-writing-mode",
  "x",
  "y",
  "z-index",
  "zoom"
];
const require$$0 = {
  properties
};
knownCssProperties.all = require$$0.properties;
var __awaiter$j = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class shadesNameInterface extends SInterface {
  static get _definition() {
    return {
      saturate: {
        type: "Number|String",
        default: 0
      },
      desaturate: {
        type: "Number",
        default: 0
      },
      darken: {
        type: "Number",
        default: 0
      },
      lighten: {
        type: "Number",
        default: 0
      },
      spin: {
        type: "Number",
        default: 0
      },
      alpha: {
        type: "Number",
        default: 1
      }
    };
  }
}
class SThemeBase extends SEventEmitter2 {
  /**
   * @name            sortMedia
   * @type            Function
   * @static
   *
   * This function takes as input the "media" object of the `frontspec.json` file and sort the "queries"
   * depending on the "defaultAction" specified.
   *
   * @param       {Object}            media      The media object to process
   * @return      {Object}                        THe new media object with queries sorted correctly
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static sortMedia(media) {
    var _a2;
    if (!media.defaultAction) {
      return media;
    }
    const queries = __sort((_a2 = media.queries) !== null && _a2 !== void 0 ? _a2 : {}, (a, b) => {
      if (media.defaultAction === "<=") {
        return a.value.minWidth < b.value.minWidth ? 1 : -1;
      } else if (media.defaultAction === ">=") {
        return a.value.minWidth > b.value.minWidth ? 1 : -1;
      }
      return 0;
    });
    media.queries = queries;
    return media;
  }
  /**
   * @name            id
   * @type            String
   *
   * Store the computed theme id builded from the theme name and theme variant
   *
   * @since   2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get id() {
    return `${this.theme}-${this.variant}`;
  }
  /**
   * @name      theme
   * @type      String
   * @static
   *
   * Store the current theme setted in the config.theme namespace
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static get theme() {
    return SSugarConfig.get("theme.theme");
  }
  /**
   * @name      variant
   * @type      String
   * @static
   *
   * Store the current variant setted in the config.variant namespace
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static get variant() {
    return SSugarConfig.get("theme.variant");
  }
  /**
   * @name      themesNames
   * @type      Object
   * @static
   *
   * Access the defined themes names
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static get themesNames() {
    return Object.keys(SSugarConfig.get("theme.themes"));
  }
  /**
   * @name            isDark
   * @type            Function
   * @static
   *
   * This method returns true if the theme variant is dark, false if not
   *
   * @return      {Boolean}               true if variant is dark, false otherwise
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static isDark() {
    return this.variant === "dark";
  }
  /**
   * @name            isMobileFirst
   * @type            Function
   * @static
   *
   * This method returns true if the theme is configured to be mobile first.
   * Mobile first is true when the "config.theme.media.defaultAction" is set to "<="
   *
   * @return      {Boolean}               true if variant is dark, false otherwise
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static isMobileFirst() {
    return this.getSafe("media.defaultAction") === ">=";
  }
  /**
   * @name            getThemeMetas
   * @type            Function
   * @static
   *
   * This method allows you to get the theme metas like "name", "theme" and "variant" from the passed HTMLElement
   *
   * @return      {any}                               The theme metas object containing the "name", "theme" and "variant" properties
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static getThemeMetas() {
    var _a2;
    let defaultTheme = SSugarConfig.get("theme.theme"), defaultVariant = SSugarConfig.get("theme.variant");
    let theme = defaultTheme, variant = defaultVariant;
    const metas = (_a2 = SSugarConfig.get(`theme.themes.${theme}-${variant}.metas`)) !== null && _a2 !== void 0 ? _a2 : {};
    return __deepMerge({
      name: `${theme !== null && theme !== void 0 ? theme : defaultTheme}-${variant !== null && variant !== void 0 ? variant : defaultVariant}`,
      theme: theme !== null && theme !== void 0 ? theme : defaultTheme,
      variant: variant !== null && variant !== void 0 ? variant : defaultVariant
    }, metas);
  }
  /**
   * @name      themes
   * @type      Object
   * @static
   *
   * Access the defined themes
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static get themes() {
    var _a2, _b2;
    const themes = SSugarConfig.get("theme.themes");
    const returnedThemes = {};
    for (let [themeName, themeObj] of Object.entries(themes)) {
      const parts = themeName.split("-"), name2 = parts[0], variant = (_a2 = parts[1]) !== null && _a2 !== void 0 ? _a2 : "light";
      if (!returnedThemes[name2]) {
        returnedThemes[name2] = {
          metas: (_b2 = themeObj.metas) !== null && _b2 !== void 0 ? _b2 : {},
          variants: {}
        };
      }
      if (!returnedThemes[name2].variants[variant]) {
        returnedThemes[name2].variants[variant] = themeObj;
      }
    }
    return returnedThemes;
  }
  static getTheme(theme, variant, settings) {
    var _a2, _b2;
    const themesNames = Object.keys(SSugarConfig.get("theme.themes"));
    theme = theme !== null && theme !== void 0 ? theme : (_a2 = this._firstGetedThemeSettings) === null || _a2 === void 0 ? void 0 : _a2.theme;
    variant = variant !== null && variant !== void 0 ? variant : (_b2 = this._firstGetedThemeSettings) === null || _b2 === void 0 ? void 0 : _b2.variant;
    if (!theme) {
      theme = SSugarConfig.get("theme.theme");
    }
    if (!variant) {
      variant = SSugarConfig.get("theme.variant");
    }
    if (!themesNames.includes(`${theme}-${variant}`)) {
      theme = SSugarConfig.get("theme.theme");
      variant = SSugarConfig.get("theme.variant");
    }
    if (!this._firstGetedThemeSettings) {
      this._firstGetedThemeSettings = {
        theme,
        variant,
        settings
      };
    }
    if (this._instanciatedThemes[`${theme}-${variant}`]) {
      return this._instanciatedThemes[`${theme}-${variant}`];
    }
    if (!themesNames[`${theme}-${variant}`]) {
      this._instanciatedThemes[`${theme}-${variant}`] = new this(theme, variant, settings);
    }
    return this._instanciatedThemes[`${theme}-${variant}`];
  }
  /**
   * @name            hash
   * @type            String
   * @static
   *
   * This hash accessor gives you access to the actual theme configuration hash.
   * You can specify a dot path to get the hash of a sub configuration
   *
   * @param           {String}            [dotPath='']            The dot path of the config you want to hash
   * @return          {String}                                    The generated hash for this config
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static hash(dotPath = "", settings) {
    const config2 = this.get(dotPath, settings);
    return objectHash(config2);
  }
  /**
   * @name        resolveFontSize
   * @type        Function
   * @static
   *
   * This method allows you to get back the actual final font-size value of the passed one
   *
   * @param       {any}           size        The size you want to resolve
   * @return      {any}                       The final resolved size
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static resolveFontSize(size, settings) {
    const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return theme.resolveFontSize(size);
  }
  /**
   * @name        resolvePadding
   * @type        Function
   * @static
   *
   * This method allows you to get back the actual final padding value of the passed one
   *
   * @param       {any}           size        The size you want to resolve
   * @return      {any}                       The final resolved size
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static resolvePadding(size, settings) {
    const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return theme.resolvePadding(size);
  }
  /**
   * @name        resolveMargin
   * @type        Function
   * @static
   *
   * This method allows you to get back the actual final margin value of the passed one
   *
   * @param       {any}           size        The size you want to resolve
   * @return      {any}                       The final resolved size
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static resolveMargin(size, settings) {
    const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return theme.resolveMargin(size);
  }
  /**
   * @name        resolveBorderRadius
   * @type        Function
   * @static
   *
   * This method allows you to get back the actual final border-radius value of the passed one
   *
   * @param       {any}           size        The size you want to resolve
   * @return      {any}                       The final resolved size
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static resolveBorderRadius(size, settings) {
    const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return theme.resolveBorderRadius(size);
  }
  /**
   * @name        resolveBorderWidth
   * @type        Function
   * @static
   *
   * This method allows you to get back the actual final border-width value of the passed one
   *
   * @param       {any}           size        The size you want to resolve
   * @return      {any}                       The final resolved size
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static resolveBorderWidth(size, settings) {
    const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return theme.resolveBorderWidth(size);
  }
  /**
   * @name        resolveColor
   * @type        Function
   * @static
   *
   * This method allows you to get back the actual final value of a color with
   * his shade and modifier.
   * You can get back either a css variable or the actual color value by specifying
   * the "settings.return" setting.
   *
   * @param       {String}            color       The color you want to resolve
   * @param       {String}            [shade=null]      The color shade you want
   * @param       {String}            [modifier=null]     The modifier you want to apply. Can be something like "--darken 30%", etc...
   * @param       {ISThemeColorResolveColorSettings}      [settings={}]           Some settings
   * @return      {any}                       The final resolved color
   *
   * @setting         {'var'|'value'}         [return='value']        The return format you want
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static resolveColor(color, shade, modifier, settings) {
    const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return theme.resolveColor(color, shade, modifier, settings);
  }
  /**
   * @name        cssVar
   * @type        Function
   *
   * This function take a simple theme dot path and returns the proper
   * variable string with the value fallback.
   *
   * @param       {String}        dotPath         The dot path theme variable you want
   * @return      {String}                        The proper css variable string that represent this value with his fallback just in case
   *
   * @example         js
   * import { cssVar } from '@coffeekraken/s-postcss-sugar-plugin';
   * cssVar('ui.button.padding'); // => var(--s-ui-button-padding, 1em 1.2em)
   *
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static cssVar(dotPath, fallback = true, settings) {
    const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    dotPath = theme.proxyNonExistingUiDotpath(dotPath);
    let varName = `s-${dotPath.replace(/\./gm, "-").replace(/:/gm, "-").replace(/\?/gm, "").replace(/--/gm, "-")}`;
    varName = `--${__dashCase(varName)}`;
    let fb = theme.get(dotPath);
    if (!fallback || typeof fb === "string" && fb.includes(","))
      fb = 0;
    const v = `var(${varName}, ${fb})`;
    return v;
  }
  /**
   * @name                resolveCssPropertyValue
   * @type                Function
   * @static
   *
   * This static method allows you to pass a css property with a value and get back his final value
   * resolved depending on the theme configuration.
   *
   * @param       {String}            property        The css property to resolve
   * @param       {any}               value           The css property value to resolve
   * @return      {any}                               The resolved css value
   *
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static resolveCssPropertyValue(property, value, settings) {
    var _a2, _b2, _c2, _d2, _e2, _f, _g, _h, _j;
    const dashProp = __dashCase(property);
    switch (dashProp) {
      case "font-family":
        const fontObj = this.get(`font.family.${value}`);
        return (_a2 = fontObj === null || fontObj === void 0 ? void 0 : fontObj.fontFamily) !== null && _a2 !== void 0 ? _a2 : value;
      case "font-size":
        return (_b2 = this.resolveFontSize(value, settings)) !== null && _b2 !== void 0 ? _b2 : value;
      case "color":
      case "background-color":
        let color = value, shade, modifier;
        if (Array.isArray(value) && value.length === 2) {
          color = value[0];
          shade = value[1];
        }
        if (Array.isArray(value) && value.length === 3) {
          color = value[0];
          shade = value[1];
          modifier = value[2];
        }
        return (_c2 = this.resolveColor(color, shade, modifier, Object.assign(Object.assign({}, settings !== null && settings !== void 0 ? settings : {}), { return: "value" }))) !== null && _c2 !== void 0 ? _c2 : value;
      case "border-radius":
      case "border-top-left-radius":
      case "border-top-right-radius":
      case "border-bottom-right-radius":
      case "border-bottom-left-radius":
        return (_d2 = this.resolveBorderRadius(value)) !== null && _d2 !== void 0 ? _d2 : value;
      case "border-width":
        return (_e2 = this.resolveBorderWidth(value)) !== null && _e2 !== void 0 ? _e2 : value;
      case "transition":
        return (_f = this.getSafe(`transition.${value}`)) !== null && _f !== void 0 ? _f : value;
      case "margin-inline":
      case "margin-block":
      case "margin-inline-start":
      case "margin-inline-end":
      case "margin-block-start":
      case "margin-block-end":
      case "margin":
      case "margin-top":
      case "margin-bottom":
      case "margin-left":
      case "margin-right":
        return (_g = this.resolveMargin(value)) !== null && _g !== void 0 ? _g : value;
      case "padding-inline":
      case "padding-block":
      case "padding-inline-start":
      case "padding-inline-end":
      case "padding-block-start":
      case "padding-block-end":
      case "padding":
      case "padding-top":
      case "padding-bottom":
      case "padding-left":
      case "padding-right":
        return (_h = this.resolvePadding(value)) !== null && _h !== void 0 ? _h : value;
      case "depth":
        return (_j = this.getSafe(`depth.${value}`, settings)) !== null && _j !== void 0 ? _j : value;
    }
    return value;
  }
  /**
   * @name                resolveCssObjectPropertiesValues
   * @type                Function
   * @static
   *
   * This static method allows you to passe a js object with some css properties and to
   * resolve each of these properties values using the `resolveCssPropertyValue` method
   *
   * @param       {Object}            object      The css properties object to resolve values from
   * @return      {Object}                        The css properties object with resolved values
   *
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static resolveCssObjectPropertiesValues(object, settings) {
    const newObj = Object.assign({}, object);
    for (let [prop, value] of Object.entries(newObj)) {
      newObj[prop] = this.resolveCssPropertyValue(prop, value, settings);
    }
    return newObj;
  }
  /**
   * @name                jsObjectToCssProperties
   * @type                Function
   * @status              beta
   * @static
   *
   * This static method allows you to pass a javascript object that contain css properties
   * and it will returns the processed css string. Some properties can accept internal theme configuration
   * settings like `font-size`, `color`, etc...:
   *
   * - `font-family`
   * - `font-size`
   * - `color`
   * - `background-color`
   * - `border-radius`: And all border-radius properties like `border-top-left-radius`, etc...
   * - `border-width`
   * - `transition`
   * - `margin`: And all the margins properties like `margin-inline`, etc...
   * - `padding`: And all the paddings properties like `padding-block`, etc...
   * - `depth`: Special property that will apply nice shadows depending on your theme configuration
   * - `default-color`: Apply the default color using `@sugar.color` mixin
   *
   * @param           {Object}        jsObject        An object to convert to css string
   * @return          {String}                            The processed css string
   *
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static jsObjectToCssProperties(jsObject, settings) {
    const finalSettings = __deepMerge({
      exclude: [],
      only: []
    }, settings);
    const propsStack = [];
    Object.keys(jsObject).forEach((prop) => {
      var _a2;
      if (finalSettings.exclude.indexOf(prop) !== -1)
        return;
      if (finalSettings.exclude.indexOf(__dashCase(prop)) !== -1)
        return;
      const originalProp = prop;
      prop = __dashCase(prop).trim();
      if (finalSettings.exclude.length && finalSettings.exclude.indexOf(prop) !== -1)
        return;
      if (finalSettings.only.length && finalSettings.only.indexOf(prop) === -1)
        return;
      const value = jsObject[originalProp];
      if (!value)
        return;
      const medias = Object.keys(this.get("media.queries"));
      if (medias.includes(originalProp)) {
        propsStack.push(`@sugar.media(${prop.replace(/^@/, "")}) {`);
        propsStack.push(this.jsObjectToCssProperties(value, finalSettings));
        propsStack.push(`}`);
      } else {
        switch (prop) {
          case "font-family":
            propsStack.push(`@sugar.font.family(${value});`);
            break;
          case "font-size":
            propsStack.push(`@sugar.font.size(${value});`);
            break;
          case "color":
          case "background-color":
            let color = value, shade, modifier;
            if (Array.isArray(value) && value.length === 2) {
              color = value[0];
              shade = value[1];
            }
            if (Array.isArray(value) && value.length === 3) {
              color = value[0];
              shade = value[1];
              modifier = value[2];
            }
            propsStack.push(`${prop}: ${(_a2 = this.resolveColor(color, shade, modifier, Object.assign(Object.assign({}, settings !== null && settings !== void 0 ? settings : {}), { return: "var" }))) !== null && _a2 !== void 0 ? _a2 : value};`);
            break;
          case "border-radius":
          case "border-top-left-radius":
          case "border-top-right-radius":
          case "border-bottom-right-radius":
          case "border-bottom-left-radius":
            propsStack.push(`border-radius: sugar.border.radius(${value});`);
            break;
          case "border-width":
            propsStack.push(`border-width: sugar.border.width(${value});`);
            break;
          case "transition":
            propsStack.push(`transition: sugar.transition(${value});`);
            break;
          case "margin-inline":
          case "margin-block":
          case "margin-inline-start":
          case "margin-inline-end":
          case "margin-block-start":
          case "margin-block-end":
          case "margin":
          case "margin-top":
          case "margin-bottom":
          case "margin-left":
          case "margin-right":
            propsStack.push(`${prop}: sugar.margin(${value});`);
            break;
          case "padding-inline":
          case "padding-block":
          case "padding-inline-start":
          case "padding-inline-end":
          case "padding-block-start":
          case "padding-block-end":
          case "padding":
          case "padding-top":
          case "padding-bottom":
          case "padding-left":
          case "padding-right":
            propsStack.push(`${prop}: sugar.padding(${value});`);
            break;
          case "depth":
            propsStack.push(`@sugar.depth(${value});`);
            break;
          case "default-color":
            propsStack.push(`@sugar.color(${value});`);
            break;
          default:
            const props = knownCssProperties.all;
            if (props.indexOf(prop) === -1)
              return;
            propsStack.push(`${prop}: ${value};`);
            break;
        }
      }
    });
    return propsStack.join("\n");
  }
  static jsConfigObjectToCssProperties(obj) {
    let vars = [];
    for (let [key, value] of Object.entries(__flatten(obj))) {
      if (__isColor(value)) {
        const color = key.match(/^color\.([a-zA-Z0-9]+)\./);
        if (!(color === null || color === void 0 ? void 0 : color[1]))
          continue;
        const props = this.remapCssColor(color[1], value);
        vars = [...vars, ...props.vars];
      }
      const varKey = key.replace(/\./gm, "-").replace(/:/gm, "-").replace(/\?/gm, "").replace(/--/gm, "-");
      let variable = `--s-${varKey}`;
      if (`${value}`.match(/:/)) {
        vars.push(`${variable}: "${value}";`);
      } else {
        vars.push(`${variable}: ${value};`);
      }
    }
    return vars;
  }
  /**
   * @name                remapCssColor
   * @type                Function
   * @status              beta
   * @static
   *
   * This static method allows you to remap a color to another and returns the needed css
   * variables string.
   *
   * @param           {String}            from            The color name you want to remap
   * @param           {String}            to              The color you want to assign
   * @return          {String}                            The generated css variables string
   *
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static remapCssColor(from2, to, settings) {
    const result2 = {
      vars: [],
      properties: {}
    };
    if (__isColor(to)) {
      const color = new SColor(to);
      result2.vars = [
        `${`--s-color-${from2}-h`}: ${color.h};`,
        `${`--s-color-${from2}-s`}: ${color.s};`,
        `${`--s-color-${from2}-l`}: ${color.l};`,
        `${`--s-color-${from2}-a`}: ${color.a};`
      ];
      result2.properties[`--s-color-${from2}-h`] = color.h;
      result2.properties[`--s-color-${from2}-s`] = color.s;
      result2.properties[`--s-color-${from2}-l`] = color.l;
      result2.properties[`--s-color-${from2}-a`] = color.a;
    } else {
      const toColorName = to.split("-").slice(0, 1)[0], fromColorName = from2.split("-").slice(0, 1)[0];
      let toColorVariant = to.split("-").pop();
      from2.split("-").pop();
      if (toColorName === toColorVariant)
        toColorVariant = void 0;
      let fromVariable = `--s-color-${fromColorName}`, toVariable = `--s-color-${toColorName}`;
      this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant).loopOnColors((colorObj) => {
        if (colorObj.name === toColorName) {
          if (toColorVariant) {
            if (colorObj.shade === toColorVariant) {
              result2.vars.push(`${fromVariable}-saturation-offset: var(${toVariable}-${colorObj.shadeDash}-saturation-offset, 0);`);
              result2.properties[`${fromVariable}-saturation-offset`] = `var(${toVariable}-${colorObj.shadeDash}-saturation-offset, 0)`;
              result2.vars.push(`${fromVariable}-lightness-offset: var(${toVariable}-${colorObj.shadeDash}-lightness-offset, 0);`);
              result2.properties[`${fromVariable}-lightness-offset`] = `var(${toVariable}-${colorObj.shadeDash}-lightness-offset, 0)`;
              result2.vars.push(`${fromVariable}-a: var(${toVariable}-a, 1);`);
              result2.properties[`${fromVariable}-a`] = `var(${toVariable}-a, 1)`;
            }
          } else {
            if (!colorObj.shade && colorObj.value.color) {
              result2.vars.push(`${fromVariable}-h: var(${toVariable}-h);`);
              result2.properties[`${fromVariable}-h`] = `var(${toVariable}-h)`;
              result2.vars.push(`${fromVariable}-s: var(${toVariable}-s);`);
              result2.properties[`${fromVariable}-s`] = `var(${toVariable}-s)`;
              result2.vars.push(`${fromVariable}-l: var(${toVariable}-l);`);
              result2.properties[`${fromVariable}-l`] = `var(${toVariable}-l)`;
            } else {
              result2.vars.push(`${fromVariable}-${colorObj.shadeDash}-saturation-offset: var(${toVariable}-${colorObj.shadeDash}-saturation-offset, 0);`);
              result2.properties[`${fromVariable}-${colorObj.shadeDash}-saturation-offset`] = `var(${toVariable}-${colorObj.shadeDash}-saturation-offset, 0)`;
              result2.vars.push(`${fromVariable}-${colorObj.shadeDash}-lightness-offset: var(${toVariable}-${colorObj.shadeDash}-lightness-offset, 0);`);
              result2.properties[`${fromVariable}-${colorObj.shadeDash}-lightness-offset`] = `var(${toVariable}-${colorObj.shadeDash}-lightness-offset, 0)`;
              result2.vars.push(`${fromVariable}-a: var(${toVariable}-a, 1);`);
              result2.properties[`${fromVariable}-a`] = `var(${toVariable}-a, 1)`;
            }
          }
        }
      });
    }
    return result2;
  }
  /**
   * @name            toCssVars
   * @type            Function
   * @static
   *
   * This static method allows you to transform a theme/variant into css variables
   *
   * @param       {String}        theme           The theme name you want to transform
   * @param       {String}        variant         The theme variant you want to transform
   * @return      {String}                        The converted css variables string
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static toCssVars(settings) {
    const themeInstance = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    if (!themeInstance)
      throw new Error(`Sorry but the requested theme "<yellow>${settings.theme}-${settings.variant}</yellow>" does not exists...`);
    let vars = [
      `--s: ${themeInstance.theme};`,
      `--s-variant: ${themeInstance.variant};`
    ];
    themeInstance.loopOnColors((colorObj) => {
      const baseVariable = colorObj.value.variable;
      if (!colorObj.shade && colorObj.value.color) {
        vars.push(`${baseVariable}-h: ${colorObj.value.h};`);
        vars.push(`${baseVariable}-s: ${colorObj.value.s};`);
        vars.push(`${baseVariable}-l: ${colorObj.value.l};`);
        vars.push(`${baseVariable}-a: ${colorObj.value.a};`);
        vars.push(`${baseVariable}-origin-h: ${colorObj.value.h};`);
        vars.push(`${baseVariable}-origin-s: ${colorObj.value.s};`);
        vars.push(`${baseVariable}-origin-l: ${colorObj.value.l};`);
        vars.push(`${baseVariable}-origin-a: ${colorObj.value.a};`);
      } else if (colorObj.shade) {
        if (colorObj.value.saturate) {
          vars.push(`${baseVariable}-saturation-offset: ${colorObj.value.saturate};`);
        } else if (colorObj.value.desaturate) {
          vars.push(`${baseVariable}-saturation-offset: ${colorObj.value.desaturate * -1};`);
        } else {
          vars.push(`${baseVariable}-saturation-offset: 0;`);
        }
        if (colorObj.value.lighten) {
          vars.push(`${baseVariable}-lightness-offset: ${colorObj.value.lighten};`);
        } else if (colorObj.value.darken) {
          vars.push(`${baseVariable}-lightness-offset: ${colorObj.value.darken * -1};`);
        } else {
          vars.push(`${baseVariable}-lightness-offset: 0;`);
        }
        if (colorObj.value.alpha >= 0 && colorObj.value.alpha <= 1) {
          vars.push(`${baseVariable}-a: ${colorObj.value.alpha};`);
        }
      }
    });
    const themeObjWithoutColors = Object.assign({}, themeInstance.get("."));
    delete themeObjWithoutColors.color;
    const flattenedTheme = __flatten(themeObjWithoutColors);
    const keep = [
      "--s-easing",
      "--s-timing",
      "--s-transition",
      "--s-scale",
      "--s-opacity",
      "--s-width",
      "--s-height",
      "--s-depth",
      "--s-size",
      "--s-font",
      "--s-border",
      "--s-space",
      "--s-margin",
      "--s-padding",
      "--s-offsize",
      "--s-color",
      "--s-layout",
      "--s-shape",
      "--s-ui"
    ];
    Object.keys(flattenedTheme).forEach((key) => {
      const value = flattenedTheme[key];
      const varKey = key.replace(/\./gm, "-").replace(/:/gm, "-").replace(/\?/gm, "").replace(/--/gm, "-");
      let variable = `--${__dashCase(`s-${varKey}`)}`;
      let hasToKeep = false;
      for (let [i, startWith] of keep.entries()) {
        if (variable.startsWith(startWith)) {
          hasToKeep = true;
          break;
        }
      }
      if (!hasToKeep) {
        return;
      }
      if (`${value}`.match(/:/)) {
        vars.push(`${variable}: "${flattenedTheme[key]}";`);
      } else {
        vars.push(`${variable}: ${flattenedTheme[key]};`);
      }
    });
    return vars;
  }
  /**
   * @name            getSafe
   * @type            Function
   * @static
   *
   * This static method allows you to access the active theme config without throwing an error if it not exists
   *
   * @param       {String}        dotPath           The dot path of the config you want
   * @return      {any}                        The getted theme config
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static getSafe(dotPath, settings) {
    const instance = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return instance.get(dotPath, {
      preventThrow: true
    });
  }
  /**
   * @name            get
   * @type            Function
   * @static
   *
   * This static method allows you to access the active theme config
   *
   * @param       {String}        dotPath           The dot path of the config you want
   * @return      {any}                        The getted theme config
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static get(dotPath, settings) {
    const instance = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return instance.get(dotPath);
  }
  /**
   * @name            set
   * @type            Function
   * @static
   *
   * This static method allows you to set values of the active theme config
   *
   * @param       {String}        dotPath           The dot path of the config you want to set
   * @param       {any}         value             The value you want to set
   * @return      {STheme}                        The current theme instance
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static set(dotPath, value, settings) {
    const instance = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return instance.set(dotPath, value);
  }
  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(theme, variant, settings) {
    super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
    this._overridedConfig = {};
    this.theme = theme !== null && theme !== void 0 ? theme : SSugarConfig.get("theme.theme");
    this.variant = variant !== null && variant !== void 0 ? variant : SSugarConfig.get("theme.variant");
    if (!SSugarConfig.get(`theme.themes.${this.theme}-${this.variant}`)) {
      throw new Error(`Sorry but the requested theme "<yellow>${this.theme}-${this.variant}</yellow>" does not exists...`);
    }
  }
  /**
   * @name        themes
   * @type        String
   * @get
   *
   * Store the themes configuration
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get themes() {
    return SSugarConfig.get("theme.themes");
  }
  /**
   * @name          proxyNonExistingUiDotpath
   * @type          Function
   *
   * This method alloes you to get the actual dotpath for the passed one.
   * If you try to get "ui.range.borderRadius" and that this config does not exists in the
   * themeUi file(s), it will fallback to "ui.default.borderRadius"
   *
   * @param         {String}        dotPath         The dot path of the config you want to get
   * @return        {String}                           The actual correct dotpath
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  proxyNonExistingUiDotpath(dotPath) {
    let value = get(this._config, dotPath);
    if (value === void 0 && dotPath.match(/^ui\.[a-zA-Z0-9]+\./)) {
      dotPath = dotPath.replace(/^ui\.[a-zA-Z0-9]+\./, "ui.default.");
    }
    return dotPath;
  }
  /**
   * @name          getSafe
   * @type          Function
   *
   * This method allows you to access a value of the current theme
   * using a dot path like "color.accent", etc...
   * This method will not throw an error if nothing's found
   *
   * @param         {String}        dotPath         The dot path of the config you want to get
   * @return        {Any}                           The value of the getted configuration
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getSafe(dotPath) {
    return this.get(dotPath, {
      preventThrow: true
    });
  }
  get _config() {
    if (this._cachedConfig) {
      return this._cachedConfig;
    }
    this._cachedConfig = Object.assign({}, __deepMerge(SSugarConfig.get("theme.themes")[this.id], this._overridedConfig));
    return this._cachedConfig;
  }
  get(dotPath, settings = {}) {
    const finalSettings = __deepMerge({
      preventThrow: false,
      defaultFallback: true
    }, settings);
    dotPath = this.proxyNonExistingUiDotpath(dotPath);
    let value = get(this._config, dotPath);
    if (value && dotPath === "media") {
      value = this.constructor.sortMedia(value);
    }
    if (value === void 0 && !finalSettings.preventThrow) {
      throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested "<yellow>${this.id}</yellow>" theme config "<cyan>${dotPath}</cyan>" does not exists...`);
    }
    return value;
  }
  /**
   * @name            getOverridedConfig
   * @type            any
   *
   * This method allows you to get the overrided config of the current theme.
   * These configs are the ones that are overrided by the use of the `set` method.
   *
   * @return         {Any}                           The overrided config of the current theme
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getOverridedConfig() {
    return this._overridedConfig;
  }
  /**
   * @name            emitSavedEvent
   * @type            Function
   *
   * This method simply emit a "saved" event on the theme instance with details like the overrifed config.
   *
   * @return      {STheme}                        The current theme instance
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  emitSavedEvent() {
    this.emit("saved", {
      theme: this.theme,
      variant: this.variant,
      overridedConfig: Object.assign({}, this._overridedConfig)
    });
    return this;
  }
  /**
   * @name            hash
   * @type            String
   *
   * This hash accessor gives you access to the actual theme configuration hash.
   * You can specify a dot path to get the hash of a sub configuration
   *
   * @param           {String}            [dotPath='']            The dot path of the config you want to hash
   * @return          {String}                                    The generated hash for this config
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  hash(dotPath = "") {
    const config2 = this.get(dotPath);
    return objectHash(config2);
  }
  /**
   * @name        themesConfig
   * @type        ISThemesConfig
   *
   * Get access to the themes configuration
   *
   * @return      ISThemesConfig        The themes configuration
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  themesConfig() {
    return SSugarConfig.get("theme");
  }
  /**
   * @name            set
   * @type            Function
   *
   * This method allows you to set a value of the current theme.
   * Specify the value you want to set using the dotPath syntax like "color.accent.color", etc...
   *
   * @param       {String}        dotPath           The dot path of the config you want to set
   * @param       {any}           value               The value you want to set
   * @return      {STheme}                        The current theme instance
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  set(dotPath, value) {
    __set(this._overridedConfig, dotPath, value);
    this.emit("update", {
      dotPath,
      value
    });
    return this;
  }
  /**
   * @name            restore
   * @type            Function
   *
   * This method allows you to restore some configs by merging the passed ones with the overrided configs.
   *
   * @param       {any}           configs             The configs you want to restore
   * @return      {STheme}                        The current theme instance
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  restore(configs) {
    this._overridedConfig = __deepMerge(this._overridedConfig, configs !== null && configs !== void 0 ? configs : {});
    this.emit("restored", {
      overridedConfigs: Object.assign({}, this._overridedConfig)
    });
    return this;
  }
  /**
   * @name            clear
   * @type            Function
   *
   * This method allows you to clear the overrided configs and restore the default ones.
   *
   * @return      {STheme}                        The current theme instance
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  clear() {
    this._overridedConfig = {};
    return this;
  }
  /**
   * @name        baseColors
   * @type        Function
   *
   * This function returns a simple object with the base colors and their value
   * from the theme config.
   *
   * @return      {Record<string, ISThemeColor>}          The simple base colors map object
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  baseColors() {
    const map2 = {};
    for (let [colorName2, colorValue] of Object.entries(this.get("color"))) {
      const c = new SColor(colorValue);
      map2[colorName2] = {
        color: colorValue,
        variable: `--${__dashCase(`s-color-${colorName2}`)}`,
        r: c.r,
        g: c.g,
        b: c.b,
        h: c.h,
        s: c.s,
        l: c.l,
        a: c.a
      };
    }
    return map2;
  }
  /**
   * @name        resolveFontSize
   * @type        Function
   *
   * This method allows you to get back the actual final font-size value of the passed one
   *
   * @param       {any}           size        The size you want to resolve
   * @return      {any}                       The final resolved size
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  resolveFontSize(size) {
    const defaultSizeStr = this.get("font.size.default"), defaultSizeUnit = defaultSizeStr.replace(/[0-9]+/gm, ""), defaultSize = parseInt(defaultSizeStr);
    const registeredValue = this.getSafe(`font.size.${size}`);
    if (registeredValue !== void 0) {
      if (typeof registeredValue === "number") {
        return `${defaultSize * registeredValue}${defaultSizeUnit}`;
      }
    } else if (typeof size === "number") {
      return `${defaultSize * size}${defaultSizeUnit}`;
    }
    return registeredValue !== null && registeredValue !== void 0 ? registeredValue : size;
  }
  /**
   * @name        resolvePadding
   * @type        Function
   *
   * This method allows you to get back the actual final padding value of the passed one
   *
   * @param       {any}           size        The size you want to resolve
   * @return      {any}                       The final resolved size
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  resolvePadding(size) {
    const defaultSizeStr = this.get("padding.default"), defaultSizeUnit = defaultSizeStr.replace(/[0-9]+/gm, ""), defaultSize = parseInt(defaultSizeStr);
    const registeredValue = this.getSafe(`padding.${size}`);
    if (registeredValue !== void 0) {
      if (typeof registeredValue === "number") {
        return `${defaultSize * registeredValue}${defaultSizeUnit}`;
      }
    } else if (typeof size === "number") {
      return `${defaultSize * size}${defaultSizeUnit}`;
    }
    return registeredValue !== null && registeredValue !== void 0 ? registeredValue : size;
  }
  /**
   * @name        resolveMargin
   * @type        Function
   *
   * This method allows you to get back the actual final margin value of the passed one
   *
   * @param       {any}           size        The size you want to resolve
   * @return      {any}                       The final resolved size
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  resolveMargin(size) {
    const defaultSizeStr = this.get("margin.default"), defaultSizeUnit = defaultSizeStr.replace(/[0-9]+/gm, ""), defaultSize = parseInt(defaultSizeStr);
    const registeredValue = this.getSafe(`margin.${size}`);
    if (registeredValue !== void 0) {
      if (typeof registeredValue === "number") {
        return `${defaultSize * registeredValue}${defaultSizeUnit}`;
      }
    } else if (typeof size === "number") {
      return `${defaultSize * size}${defaultSizeUnit}`;
    }
    return registeredValue !== null && registeredValue !== void 0 ? registeredValue : size;
  }
  /**
   * @name        resolveBorderRadius
   * @type        Function
   *
   * This method allows you to get back the actual final border-radius value of the passed one
   *
   * @param       {any}           size        The size you want to resolve
   * @return      {any}                       The final resolved size
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  resolveBorderRadius(size) {
    const defaultSizeStr = this.get("border.radius.default"), defaultSizeUnit = defaultSizeStr.replace(/[0-9]+/gm, ""), defaultSize = parseInt(defaultSizeStr);
    const registeredValue = this.getSafe(`border.radius.${size}`);
    if (registeredValue !== void 0) {
      if (typeof registeredValue === "number") {
        return `${defaultSize * registeredValue}${defaultSizeUnit}`;
      }
    } else if (typeof size === "number") {
      return `${defaultSize * size}${defaultSizeUnit}`;
    }
    return registeredValue !== null && registeredValue !== void 0 ? registeredValue : size;
  }
  /**
   * @name        resolveBorderWidth
   * @type        Function
   *
   * This method allows you to get back the actual final border-radius value of the passed one
   *
   * @param       {any}           size        The size you want to resolve
   * @return      {any}                       The final resolved size
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  resolveBorderWidth(size) {
    const defaultSizeStr = this.get("border.width.default"), defaultSizeUnit = defaultSizeStr.replace(/[0-9]+/gm, ""), defaultSize = parseInt(defaultSizeStr);
    const registeredValue = this.getSafe(`border.width.${size}`);
    if (registeredValue !== void 0) {
      if (typeof registeredValue === "number") {
        return `${defaultSize * registeredValue}${defaultSizeUnit}`;
      }
    } else if (typeof size === "number") {
      return `${defaultSize * size}${defaultSizeUnit}`;
    }
    return registeredValue !== null && registeredValue !== void 0 ? registeredValue : size;
  }
  /**
   * @name        resolveColor
   * @type        Function
   *
   * This method allows you to get back the actual final value of a color with
   * his shade and modifier.
   * You can get back either a css variable or the actual color value by specifying
   * the "settings.return" setting.
   *
   * @param       {String}            color       The color you want to resolve
   * @param       {String}            [shade=null]      The color shade you want
   * @param       {String}            [modifier=null]     The modifier you want to apply. Can be something like "--darken 30%", etc...
   * @param       {ISThemeColorResolveColorSettings}      [settings={}]           Some settings
   * @return      {any}                       The final resolved color
   *
   * @setting         {'var'|'value'}         [return='value']        The return format you want
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  resolveColor(color, shade, modifier, settings) {
    var _a2, _b2;
    if (color.match(/^(hsla?|rgba?|hsv)\(/))
      return color;
    if (color.match(/^var\(--/))
      return color;
    const finalSettings = Object.assign({ return: "value" }, settings !== null && settings !== void 0 ? settings : {});
    let colorName2 = color;
    let shadeName = shade !== null && shade !== void 0 ? shade : "";
    let colorModifier = modifier !== null && modifier !== void 0 ? modifier : "";
    if (shadeName.match(/^--[a-zA-Z]+/)) {
      colorModifier = shadeName;
      shadeName = void 0;
    }
    let modifierParams = {};
    if (colorModifier) {
      modifierParams = shadesNameInterface.apply(colorModifier);
    }
    let finalValue;
    if (__isColor(colorName2)) {
      const color2 = new SColor(colorName2);
      if (colorModifier) {
        color2.apply(colorModifier);
      }
      return color2.toString();
    } else {
      switch (finalSettings.return) {
        case "var":
          const colorVar = `--s-color-${colorName2}`;
          let shadeNameVar = `s-color-${colorName2}`;
          if (shadeName) {
            shadeNameVar += `-${__dashCase(shadeName)}`;
          }
          shadeNameVar = "--" + shadeNameVar.replace(/-{2,999}/gm, "-");
          finalValue = colorVar;
          const hParts = [
            `var(${colorVar}-h, 0)`,
            `var(${shadeNameVar}-spin ,${(_a2 = modifierParams.spin) !== null && _a2 !== void 0 ? _a2 : 0})`
          ];
          const sParts = [`var(${colorVar}-s, 0)`];
          if (shadeName) {
            sParts.push(`var(${shadeNameVar}-saturation-offset, 0)`);
          }
          let saturationOffset = modifierParams.saturate ? modifierParams.saturate : modifierParams.desaturate ? modifierParams.desaturate * -1 : void 0;
          if (saturationOffset !== void 0) {
            sParts.push(saturationOffset);
          }
          const lParts = [`var(${colorVar}-l, 0)`];
          if (shadeName) {
            lParts.push(`var(${shadeNameVar}-lightness-offset, 0)`);
          }
          let lightnessOffset = modifierParams.lighten ? modifierParams.lighten : modifierParams.darken ? modifierParams.darken * -1 : void 0;
          if (lightnessOffset !== void 0) {
            lParts.push(lightnessOffset);
          }
          let alpha = modifierParams.alpha !== void 0 ? modifierParams.alpha : 1;
          finalValue = `hsla(
                    calc(
                        ${hParts.join(" + ")}
                    ),
                    calc(
                        (${sParts.join(" + ")}) * 1%
                    ),
                    calc(
                        (${lParts.join(" + ")}) * 1%
                    ),
                    ${modifierParams.alpha !== void 0 ? alpha : `var(${shadeNameVar}-a, 1)`}
                    )`;
          finalValue = finalValue.replace(/(\n|\s{2,99999999})/gm, "").replace(/\t/gm, " ").replace(/\s?\+\s?/gm, " + ").replace(/\)\-\s?/gm, ") - ").replace(/\s?\*\s?/gm, " * ").replace(/\s?\/\s?/gm, " / ");
          break;
        case "value":
        default:
          const colorValue = (_b2 = this.getSafe(`color.${color}`)) !== null && _b2 !== void 0 ? _b2 : color;
          if (!shade && !modifier) {
            finalValue = colorValue;
          }
          let colorInstance = new SColor(colorValue);
          if (shade) {
            let finalSchema = shade;
            if (typeof shade === "string") {
              finalSchema = this.getSafe(`shades.${shade}.color.${color}`);
              if (!finalSchema) {
                finalSchema = this.getSafe(`shades.${shade}`);
              }
            }
            if (finalSchema) {
              colorInstance = colorInstance.apply(finalSchema);
            }
          }
          if (modifier) {
            colorInstance = colorInstance.apply(modifier);
          }
          finalValue = colorInstance.toString();
          break;
      }
    }
    return finalValue;
  }
  /**
   * @name        loopOnColors
   * @type        Function
   * @async
   *
   * This utility function allows you to loop quickly and efficiently on
   * theme colors and their's modifiers defined
   *
   * @param       {Function}      callback            Specify the callback that will be called for each color with an object containing these properties:
   * - name       {String}        The name of the color like "accent", "complementary", etc...
   * - shade    {String}        The name of the variant like "background", "surface", etc...
   * - value      {ISThemeColor | ISThemeColorModifiers}        The actual color object
   *
   * @since             2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  loopOnColors(callback) {
    return __awaiter$j(this, void 0, void 0, function* () {
      const colorsObj = this.get("color"), shadessObj = this.get("shades");
      for (let [colorName2, colorValue] of Object.entries(colorsObj)) {
        const c = new SColor(colorValue);
        callback({
          name: colorName2,
          shade: "",
          // @ts-ignore
          value: {
            color: colorValue,
            variable: `--${__dashCase(`s-color-${colorName2}`)}`,
            r: c.r,
            g: c.g,
            b: c.b,
            h: c.h,
            s: c.s,
            l: c.l,
            a: c.a
          }
        });
        for (let [shadeName, shadeObj] of Object.entries(shadessObj)) {
          const newColor = c.apply(shadeObj, true);
          callback({
            name: colorName2,
            shade: shadeName,
            shadeDash: __dashCase(shadeName),
            value: Object.assign(Object.assign({ variable: `--${__dashCase(`s-color-${colorName2}-${shadeName}`)}` }, shadeObj), { r: newColor.r, g: newColor.g, b: newColor.b, h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a })
          });
          if (shadeObj.color) {
            for (let [
              shadesColorName,
              shadesObj
              // @ts-ignore
            ] of Object.entries(shadeObj.color)) {
              if (shadesColorName !== colorName2)
                continue;
              const newColor2 = c.apply(shadesObj, true);
              callback({
                name: shadesColorName,
                shade: shadeName,
                value: Object.assign(Object.assign({ variable: `--${__dashCase(`s-color-${shadesColorName}-${shadeName}`)}` }, shadesObj), { r: newColor2.r, g: newColor2.g, b: newColor2.b, h: newColor2.h, s: newColor2.s, l: newColor2.l, a: newColor2.a })
              });
            }
          }
        }
      }
      return true;
    });
  }
}
SThemeBase._instanciatedThemes = {};
window._console = {};
["log", "warn", "error", "success"].forEach((key) => {
  window._console[key] = console[key];
});
class STheme extends SThemeBase {
  /**
   * @name      theme
   * @type      String
   * @static
   * @get
   *
   * Store the current theme applied from the html tag context or from the config
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static get theme() {
    var _a2;
    const themeAttr = (_a2 = document.querySelector("html")) === null || _a2 === void 0 ? void 0 : _a2.getAttribute("theme");
    if (!themeAttr) {
      return SFrontspec.get("theme.theme");
    }
    return themeAttr.split("-")[0];
  }
  /**
   * @name      variant
   * @type      String
   * @static
   * @get
   *
   * Store the current variant applied from the html tag context or from the config
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static get variant() {
    var _a2;
    const themeAttr = (_a2 = document.querySelector("html")) === null || _a2 === void 0 ? void 0 : _a2.getAttribute("theme");
    if (!themeAttr) {
      return SFrontspec.get("theme.variant");
    }
    return themeAttr.split("-")[1];
  }
  static get cssSettings() {
    if (this._cssSettings) {
      return this._cssSettings;
    }
    const style = window.getComputedStyle(document.body, ":after");
    let settings;
    try {
      settings = JSON.parse(JSON.parse(style.content.toString()));
    } catch (e) {
    }
    this._cssSettings = settings;
    return this._cssSettings;
  }
  /**
   * @name            setTheme
   * @type            Function
   * @static
   *
   * This method allows you to set the current applied theme and get back an STheme instance
   *
   * @param               {String}            theme           The theme name to apply
   * @param               {String}            variant         The theme variant to apply
   * @param               {HTMLElement}       [$context=document.querySelector('html')]            The context element on which to apply the theme
   * @return          {STheme}                                    The STheme instance that represent the current applied theme
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static setTheme(theme, variant, $context = document.querySelector("html")) {
    STheme.applyTheme(theme, variant, $context);
    localStorage.setItem("s-theme", JSON.stringify({
      theme,
      variant
    }));
    const currentTheme = this.getCurrentTheme($context);
    if (variant) {
      currentTheme.state.variant = variant;
    }
    currentTheme.save();
    document.dispatchEvent(new CustomEvent("s-theme.change", {
      detail: {
        theme: currentTheme
      }
    }));
    return currentTheme;
  }
  /**
   * @name            applyTheme
   * @type            Function
   * @static
   *
   * This method allows you to apply a theme on a particular $context HTMLElement
   *
   * @param               {String}            theme           The theme name to apply
   * @param               {String}            variant         The theme variant to apply
   * @param               {HTMLElement}       [$context=document.querySelector('html')]            The context element on which to apply the theme
   * @return          {STheme}                                    The STheme instance that represent the current applied theme
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static applyTheme(theme, variant, $context = document.querySelector("html")) {
    __fastdom.mutate(() => {
      __clearTransmations(document.querySelector("html"), {
        timeout: 100
      });
      if (theme && variant) {
        $context.setAttribute("theme", `${theme}-${variant}`);
      } else if (theme) {
        $context.setAttribute("theme", `${theme}-${SFrontspec.get("theme.variant")}`);
      } else if (variant) {
        $context.setAttribute("theme", `${SFrontspec.get("theme.theme")}-${variant}`);
      }
    });
  }
  /**
   * @name            preferDark
   * @type            Function
   * @static
   *
   * This method just check if the user prefer the dark mode or not.
   *
   * @return      {Boolean}               true if prefer dark mode, false if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static preferDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  /**
   * @name            setThemeVariant
   * @type            Function
   * @static
   *
   * This method allows you to set the current applied theme variant and get back an STheme instance
   *
   * @param               {String}            variant         The theme variant to apply
   * @param               {HTMLElement}       [$context=document.querySelector('html')]            The context element on which to apply the theme
   * @return          {STheme}                                    The STheme instance that represent the current applied theme
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static setThemeVariant(variant, $context = document.querySelector("html")) {
    return this.setTheme(void 0, variant, $context);
  }
  /**
   * @name            init
   * @type            Function
   * @static
   *
   * This method allows you to init the your STheme instance, restore savec updated if their some, etc...
   *
   * @return          {STheme}                                    The STheme instance that represent the current applied theme
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static init(settings) {
    const finalSettings = Object.assign({ $context: document.querySelector("html"), theme: void 0, variant: void 0 }, settings !== null && settings !== void 0 ? settings : {});
    let themeInstance;
    let savedTheme = {};
    try {
      savedTheme = JSON.parse(localStorage.getItem("s-theme"));
    } catch (e) {
    }
    if (savedTheme === null || savedTheme === void 0 ? void 0 : savedTheme.theme) {
      finalSettings.theme = savedTheme.theme;
    }
    if (savedTheme === null || savedTheme === void 0 ? void 0 : savedTheme.variant) {
      finalSettings.variant = savedTheme.variant;
    }
    STheme._defaultThemeMetas = {
      theme: finalSettings.theme,
      variant: finalSettings.variant
    };
    themeInstance = this.getCurrentTheme(finalSettings.$context, Object.assign({}, finalSettings));
    if (!document.env)
      document.env = {};
    if (!document.env.SUGAR)
      document.env.SUGAR = {};
    document.env.SUGAR.theme = themeInstance;
    STheme.applyTheme(themeInstance.theme, themeInstance.variant, finalSettings.$context);
    return themeInstance;
  }
  /**
   * @name            ensureIsInited
   * @type            Function
   * @static
   *
   * This method allows you to make sure the theme has been inited using the `__STheme.init()` static method.
   * If it's not the case, it will throw an error to make sure the developer knows why it's not working...
   *
   * @param           {Boolean}               [throwError=true]               Specify if you want this method to throw an error when the theme is not correctly inited
   * @return          {Boolean}                                    True if inited, false if not (and will thro)
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static ensureIsInited(throwError = true) {
    var _a2, _b2;
    if (!((_b2 = (_a2 = document.env) === null || _a2 === void 0 ? void 0 : _a2.SUGAR) === null || _b2 === void 0 ? void 0 : _b2.theme)) {
      if (throwError) {
        throw new Error(`<red>[STheme]</red> You must init your theme using the __STheme.init() static method...`);
      }
      return false;
    }
    return true;
  }
  /**
   * @name            getThemeMetas
   * @type            Function
   * @static
   *
   * This method allows you to get the theme metas like "name", "theme" and "variant" from the passed HTMLElement
   *
   * @param       {HTMLElement}       [$context=document.querySelector('html')]        The context from which to get the theme metas
   * @return      {any}                               The theme metas object containing the "name", "theme" and "variant" properties
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static getThemeMetas($context = document.querySelector("html")) {
    var _a2, _b2, _c2;
    let defaultTheme = (_a2 = STheme._defaultThemeMetas.theme) !== null && _a2 !== void 0 ? _a2 : SFrontspec.get("theme.theme"), defaultVariant = (_b2 = STheme._defaultThemeMetas.variant) !== null && _b2 !== void 0 ? _b2 : SFrontspec.get("theme.variant");
    let theme = defaultTheme, variant = defaultVariant;
    if ($context) {
      const computedStyle = getComputedStyle($context);
      const cssDefinedTheme = computedStyle.getPropertyValue("--s-theme"), cssDefinedVariant = computedStyle.getPropertyValue("--s-theme-variant");
      if (cssDefinedTheme) {
        theme = cssDefinedTheme.trim();
      }
      if (cssDefinedVariant) {
        variant = cssDefinedVariant.trim();
      }
    }
    const name2 = `${theme !== null && theme !== void 0 ? theme : defaultTheme}-${variant !== null && variant !== void 0 ? variant : defaultVariant}`;
    const metas = (_c2 = SFrontspec.get(`theme.themes.${name2}`)) !== null && _c2 !== void 0 ? _c2 : {};
    return __deepMerge({
      name: name2,
      theme: theme !== null && theme !== void 0 ? theme : defaultTheme,
      variant: variant !== null && variant !== void 0 ? variant : defaultVariant
    }, metas);
  }
  /**
   * @name            getCurrentTheme
   * @type            Function
   * @static
   *
   * This method allows you to get the current applied theme STheme instance
   *
   * @return          {STheme}                                    The STheme instance that represent the current applied theme
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  // @ts-ignore
  static getCurrentTheme($context = document.querySelector("html"), settings) {
    const themeMetas = STheme.getThemeMetas($context);
    return this.getTheme(themeMetas.theme, themeMetas.variant, settings);
  }
  /**
   * @name            applyCurrentColor
   * @type            Function
   * @static
   *
   * This static method allows you to apply a color on a particular context
   *
   * @param       {String}        color               The color name/code you want to apply
   * @param       {HTMLElement}       [$context=document.querySelector('html')]        The context on which to apply the color
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static applyCurrentColor(color, $context = document.querySelector("html")) {
    const vars = this.remapCssColor("current", color);
    for (let [key, value] of Object.entries(vars.properties)) {
      $context.style.setProperty(key, value);
    }
  }
  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(theme, variant, settings) {
    super(theme, variant, __deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
    this.state = {
      overridedConfigs: {}
    };
    if (!SEnv2.is("production") && !__isInIframe()) {
      console.log(`<cyan>[STheme]</cyan> Initializing theme <cyan>${theme}</cyan> in <cyan>${variant}</cyan> variant`);
    }
    this.restore();
    if (!SEnv2.is("production") && !__isInIframe()) {
      console.log(`<cyan>[STheme]</cyan> Theme initialized <green>successfully</green>`);
    }
  }
  /**
   * @name            setColor
   * @type            Function
   *
   * THis method allows you to set a color for the theme that represent this instance
   *
   * @param           {String}            color                   The color you want to set
   * @param           {String}            value                   The color value you want to set
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  setColor(color, value) {
    this.set(`color.${color}.color`, value);
  }
  /**
   * @name            set
   * @type            Function
   *
   * This method allows you to set a value of the current theme.
   * Specify the value you want to set using the dotPath syntax like "color.accent.color", etc...
   *
   * @param       {String}        dotPath           The dot path of the config you want to set
   * @param       {any}           value               The value you want to set
   * @return      {STheme}                        The current theme instance
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  set(dotPath, value) {
    super.set(dotPath, value);
    this.applyState();
    this.save();
    return this;
  }
  /**
   * @name            getColor
   * @type            Function
   *
   * THis method allows you to access a particular theme color in a particular context
   *
   * @param           {String}            name            The color name you want to get
   * @param           {String}            [variant=null]     The color variant you want to get
   * @param           {HTMLElement}       [$context=document.querySelector('html')]        The context in which to get the color
   * @return          {SColor}                                    An SColor instance that you can make use of
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getColor(name2, variant, $context = document.body) {
    const $elm = document.createElement("p");
    $elm.classList.add(`s-bg-${name2}${variant ? `-${variant}` : ""}`);
    const $wrapper = document.createElement("div");
    $wrapper.setAttribute("hidden", "true");
    $wrapper.setAttribute("theme", `${this.theme}-${this.variant}`);
    $wrapper.appendChild($elm);
    $context.appendChild($wrapper);
    const style = getComputedStyle($elm);
    const color = new SColor(style.backgroundColor);
    $wrapper.remove();
    return color;
  }
  /**
   * @name            isDarkMode
   * @type            Function
   *
   * This method returns true if the theme variant is dark, false if not
   *
   * @return      {Boolean}               true if variant is dark, false otherwise
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  isDark() {
    return this.variant === "dark";
  }
  /**
   * @name            applyState
   * @type            Function
   *
   * This method allows you to apply the overrided configs on your dom context.
   *
   * @param       {HTMLElement}       $context       The dom context on which to apply the overrided configs
   * @return      {STheme}              The current instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  applyState($context = document.body) {
    const properties2 = SThemeBase.jsConfigObjectToCssProperties(this.getOverridedConfig());
    this._applyOverridedConfigs(properties2, $context);
    return this;
  }
  /**
   * Apply the overrided configs from the state
   */
  _applyOverridedConfigs(properties2, $context = document.body) {
    if (!$context._sThemeOverridedConfigs) {
      $context._sThemeOverridedConfigs = {};
    }
    if (!$context._sThemeOverridedConfigs[this.id]) {
      $context._sThemeOverridedConfigs[this.id] = document.createElement("style");
      $context._sThemeOverridedConfigs[this.id].setAttribute("id", this.id);
      $context.appendChild($context._sThemeOverridedConfigs[this.id]);
    }
    let selector = `[theme="${this.theme}-${this.variant}"]`;
    if ($context === document.body) {
      selector += " body";
    }
    $context._sThemeOverridedConfigs[this.id].innerHTML = `
            ${selector} {
                ${properties2.join("\n")}
            }
        `;
  }
  save() {
    clearTimeout(this._saveTimeout);
    this._saveTimeout = setTimeout(() => {
      this.state.overridedConfigs = this._overridedConfig;
      console.log("save", this.state);
      localStorage.setItem(`s-theme-${this.theme}`, JSON.stringify(this.state));
      this.emitSavedEvent();
    }, 500);
    return this;
  }
  /**
   * @name            restore
   * @type            Function
   *
   * This method allows you to restore locally the current theme with the changes applied using the `set` method.
   *
   * @return      {STheme}                                The current theme instance
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  restore() {
    var _a2;
    let savedState = {};
    try {
      savedState = JSON.parse(
        // @ts-ignore
        (_a2 = localStorage.getItem(`s-theme-${this.theme}`)) !== null && _a2 !== void 0 ? _a2 : "{}"
      );
      this.state = savedState !== null && savedState !== void 0 ? savedState : {};
    } catch (e) {
      savedState = {};
    }
    super.restore(savedState.overridedConfigs);
    this.applyState();
    return this;
  }
  /**
   * @name            clear
   * @type            Function
   *
   * This method allows you to clear locally the current theme with the changes applied using the `set` method.
   *
   * @return      {STheme}                                The current theme instance
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  clear() {
    localStorage.removeItem(`s-theme-${this.theme}`);
    super.clear();
    this.state = {};
    this.applyState();
    this.constructor.setTheme();
    return this;
  }
}
STheme._defaultThemeMetas = {};
var _a$3;
if ((_a$3 = import.meta) === null || _a$3 === void 0 ? void 0 : _a$3.hot) {
  (void 0).on("sugar.update.css", (data2) => {
    var _a2, _b2;
    (_a2 = console.verbose) === null || _a2 === void 0 ? void 0 : _a2.call(console, `[SFront] Reloading css "${(_b2 = data2.srcRelPath) !== null && _b2 !== void 0 ? _b2 : data2}"`);
    reloadStylesheets();
  });
}
class SFront extends SClass {
  /**
   * @name            init
   * @type            Function
   * @static
   *
   * This method allows you to init the your SFront instance, restore savec updated if their some, etc...
   *
   * @return          {SFront}                                    The SFront instance that represent the current applied front
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static init(settings) {
    const finalSettings = Object.assign({ id: "default", lod: {}, classmap: {}, wireframe: {}, legal: {}, partytown: {}, theme: {} }, settings !== null && settings !== void 0 ? settings : {});
    let frontInstance = new this(finalSettings);
    if (!document.env)
      document.env = {};
    if (!document.env.SUGAR)
      document.env.SUGAR = {};
    document.env.SUGAR.front = frontInstance;
    return frontInstance;
  }
  /**
   * @name            ensureIsInited
   * @type            Function
   * @static
   *
   * This method allows you to make sure the front has been inited using the `__SFront.init()` static method.
   * If it's not the case, it will throw an error to make sure the developer knows why it's not working...
   *
   * @param           {Boolean}               [throwError=true]               Specify if you want this method to throw an error when the front is not correctly inited
   * @return          {Boolean}                                    True if inited, false if not (and will thro)
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static ensureIsInited(throwError = true) {
    var _a2, _b2;
    if (!((_b2 = (_a2 = document.env) === null || _a2 === void 0 ? void 0 : _a2.SUGAR) === null || _b2 === void 0 ? void 0 : _b2.front)) {
      if (throwError) {
        throw new Error(`<red>[SFront]</red> You must init your front using the __SFront.init() static method...`);
      }
      return false;
    }
    return true;
  }
  /**
   * @name        instance
   * @type        SFront
   * @static
   *
   * Access the default inited instance of the SFront class
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  static get instance() {
    return this._defaultInstance;
  }
  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(settings) {
    var _a2, _b2, _c2, _d2, _e2, _f, _g;
    SLog.filter((log) => {
      if (settings.logs)
        return true;
      if (settings.logs === false)
        return false;
      if (__isInIframe() && ["log", "verbose"].includes(log.type))
        return false;
      return true;
    });
    new SStdio("default", new SStdioConsoleSource(), new SStdioBasicAdapter());
    if (!SEnv2.is("production") && !__isInIframe()) {
      const color = SEnv2.env.ENV === "production" ? "red" : SEnv2.env.ENV === "staging" ? "cyan" : "green";
      console.log(`<yellow>[SFront]</yellow> Current environment is "<${color}>${SEnv2.env.ENV}</${color}>"`);
      if ((_a2 = document.env) === null || _a2 === void 0 ? void 0 : _a2.PACKAGE) {
        console.log(`<yellow>[SFront]</yellow> Project "<cyan>${document.env.PACKAGE.name}</cyan>" in version "<yellow>${document.env.PACKAGE.version}</yellow>"`);
      }
      if ((_b2 = document.env) === null || _b2 === void 0 ? void 0 : _b2.CLASSMAP) {
        console.log(`<yellow>[SFront]</yellow> Using <yellow>classmap</yellow>"`);
      }
    }
    let frontspec;
    if ((settings === null || settings === void 0 ? void 0 : settings.frontspec) instanceof SFrontspec) {
      frontspec = settings === null || settings === void 0 ? void 0 : settings.frontspec;
    } else {
      frontspec = SFrontspec.init(settings === null || settings === void 0 ? void 0 : settings.frontspec);
    }
    let classmap;
    if (settings.classmap instanceof SClassmap) {
      classmap = settings.classmap;
    } else if (frontspec.get("classmap.enabled")) {
      classmap = SClassmap.init(settings.classmap);
    }
    let theme;
    if ((settings === null || settings === void 0 ? void 0 : settings.theme) instanceof STheme) {
      theme = settings === null || settings === void 0 ? void 0 : settings.theme;
    } else {
      theme = STheme.init(settings === null || settings === void 0 ? void 0 : settings.theme);
    }
    super(__deepMerge({
      id: "default",
      google: (_c2 = frontspec.get("google")) !== null && _c2 !== void 0 ? _c2 : {},
      partytown: (_d2 = frontspec.get("partytown")) !== null && _d2 !== void 0 ? _d2 : {},
      classmap: (_e2 = frontspec.get("classmap")) !== null && _e2 !== void 0 ? _e2 : {},
      lod: Object.assign({ stylesheet: "link#global" }, (_f = frontspec.get("lod")) !== null && _f !== void 0 ? _f : {}),
      wireframe: {
        enabled: void 0
      },
      legal: {
        cookieName: "s-legal",
        defaultMetas: {}
      }
    }, settings !== null && settings !== void 0 ? settings : {}));
    this._originalState = {
      lod: {
        level: void 0
      },
      wireframe: {
        enabled: void 0
      }
    };
    this.state = Object.assign({}, this._originalState);
    this.legal = {
      agree: false,
      metas: {}
    };
    this.classmap = classmap;
    this.frontspec = frontspec;
    this.theme = theme;
    if (this.settings.id === "default" && !this.constructor._defaultInstance) {
      this.constructor._defaultInstance = this;
    }
    document.addEventListener("s-front.legal.agree", () => {
      if (this.isLegalAgree()) {
        this._initTracking();
      }
    });
    this.restore();
    if (this.frontspec.get("lod.enabled")) {
      this._initLod();
    }
    if (((_g = this.state.wireframe) === null || _g === void 0 ? void 0 : _g.enabled) || this.settings.wireframe.enabled && this.state.wireframe.enabled === void 0) {
      this.setWireframe(true);
    }
    this._initTracking();
  }
  /**
   * @name      wireframe
   * @type      { active: boolean }
   *
   * Get the current wireframe state
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get wireframe() {
    var _a2;
    return {
      enabled: ((_a2 = this.state.wireframe) === null || _a2 === void 0 ? void 0 : _a2.enabled) !== void 0 ? this.state.wireframe.enabled : this.settings.wireframe.enabled
    };
  }
  /**
   * @name            setWireframe
   * @type            Function
   *
   * This method allows you to apply the wireframe mode
   *
   * @param              {Boolean}            enabled              true if want to activate the wireframe mode, false if want to desactivate it
   * @return          {STheme}                                    The STheme instance that represent the current applied theme
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  setWireframe(enabled) {
    var _a2, _b2;
    if (((_a2 = this.state.wireframe) === null || _a2 === void 0 ? void 0 : _a2.enabled) !== enabled) {
      (_b2 = console.verbose) === null || _b2 === void 0 ? void 0 : _b2.call(console, `<yellow>[wireframe]</yellow> ${enabled ? "<green>Activate</green>" : "<red>Desactivate</red>"} the wireframe mode`);
      if (!this.state.wireframe) {
        this.state.wireframe = {};
      }
      this.state.wireframe.enabled = enabled;
      this.save();
      document.dispatchEvent(new CustomEvent("s-front.wireframe.change", {
        detail: {
          enabled,
          theme: this
        }
      }));
    }
    document.querySelector("html").classList[enabled ? "add" : "remove"]("s-wireframe");
  }
  /**
   * @name      lod
   * @type      { level: number }
   *
   * Get the current lod (level of details)
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  get lod() {
    var _a2;
    return {
      level: ((_a2 = this.state.lod) === null || _a2 === void 0 ? void 0 : _a2.level) !== void 0 ? this.state.lod.level : this.frontspec.get("lod.defaultLevel")
    };
  }
  /**
   * @name            setLod
   * @type            Function
   *
   * This method allows you to set the level of details you want on any HTMLElement context
   *
   * @param               {String|Number}     level           The level you want to set
   * @param               {Partial<ISThemeSetLodSettings>}        Some settings to configure your action
   * @return          {STheme}                                    The STheme instance that represent the current applied theme
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  setLod(level, settings) {
    var _a2;
    const lodSettings = this.frontspec.get("lod");
    if (!(lodSettings === null || lodSettings === void 0 ? void 0 : lodSettings.enabled)) {
      return;
    }
    const finalSettings = Object.assign({ $context: document.querySelector("html") }, settings !== null && settings !== void 0 ? settings : {});
    (_a2 = console.verbose) === null || _a2 === void 0 ? void 0 : _a2.call(console, `<yellow>[lod]</yellow> Set lod (level of details) to <cyan>${level}</cyan>`);
    level = parseInt(`${level}`);
    this.state.lod.level = level;
    this.save();
    let lodStylesheets = [], $stylesheet;
    if ((lodSettings === null || lodSettings === void 0 ? void 0 : lodSettings.method) === "file") {
      lodStylesheets = Array.from(document.querySelectorAll("link[s-lod]"));
      if (lodSettings.stylesheet instanceof HTMLLinkElement) {
        $stylesheet = lodSettings.stylesheet;
      } else if (typeof lodSettings.stylesheet === "string") {
        $stylesheet = document.querySelector(lodSettings.stylesheet);
      }
      lodStylesheets.forEach(($link) => {
        const l = parseInt($link.getAttribute("s-lod"));
        if (l > level) {
          $link.remove();
        }
      });
    }
    for (let i = 0; i <= 10; i++) {
      if (i > level) {
        finalSettings.$context.classList.remove(`s-lod-${i}`);
      }
    }
    for (let i = 0; i <= level; i++) {
      finalSettings.$context.classList.add("s-lod", `s-lod-${i}`);
      if ((lodSettings === null || lodSettings === void 0 ? void 0 : lodSettings.method) === "file" && $stylesheet) {
        if (i > 0 && !lodStylesheets.filter(($link) => {
          const l = parseInt($link.getAttribute("s-lod"));
          return l === i;
        }).length) {
          const $lodLink = $stylesheet.cloneNode();
          $lodLink.setAttribute("href", $stylesheet.getAttribute("href").replace(/([a-zA-Z0-9_-]+)\.css(\?.*)?/, `lod/$1.lod-${i}.css`));
          $lodLink.setAttribute("s-lod", i);
          document.head.appendChild($lodLink);
        }
      }
    }
    document.dispatchEvent(new CustomEvent("s-front.lod.change", {
      detail: {
        level,
        theme: this
      }
    }));
  }
  get lodConfig() {
    if (!this._lodConfig) {
      this._lodConfig = this.frontspec.get("lod");
    }
    return this._lodConfig;
  }
  /**
   * This method takes care of initializing the lod (level of details) features
   * like the "botLevel", lod by speedIndex, etc...
   */
  _initLod() {
    var _a2;
    if (!SEnv2.is("production") && !__isInIframe()) {
      console.log("<yellow>[SFront]</yellow> Initializing <magenta>lod</magenta> (level of details) with these settings", this.frontspec.get("lod"));
    }
    const isCrawler = __isCrawler();
    if (isCrawler && this.lodConfig.botLevel !== void 0) {
      this.setLod(this.lodConfig.botLevel);
    }
    if (this.state.lod.level !== void 0 && this.state.lod.level !== null) {
      this.setLod(this.state.lod.level);
      return;
    }
    this.setLod(this.frontspec.lod.defaultLevel);
    if (!isCrawler && this.state.lod.level === void 0 && this.frontspec.lod.defaultLevel === void 0) {
      const speedIndex$1 = speedIndex();
      let suitedLod = 0;
      for (let [lod, lodObj] of Object.entries((_a2 = this.lodConfig.levels) !== null && _a2 !== void 0 ? _a2 : {})) {
        if (lodObj.speedIndex > speedIndex$1) {
          break;
        }
        suitedLod = parseInt(lod);
      }
      this.setLod(suitedLod);
      return;
    }
  }
  /**
   * Check if the tracking has been inited or not
   */
  _isTrackingInited() {
    return document.querySelector("script#s-front-gtm") !== null;
  }
  /**
   * Init the tracking (google, partytown, etc...)
   */
  _initTracking() {
    var _a2, _b2, _c2, _d2;
    if (!this.isLegalAgree()) {
      if (!SEnv2.is("production") && !__isInIframe()) {
        console.log(`<yellow>[SFront]</yellow> You have a <magenta>google tag manager (gtm)</magenta> setted but the <cyan>legal terms</cyan> are not agreed. Tracking <red>disabled</red>.`);
      }
      return;
    }
    if (this._isTrackingInited()) {
      if (!SEnv2.is("production") && !__isInIframe()) {
        console.log(`<yellow>[SFront]</yellow> Tracking <magenta>google tag manager</magenta> already inited.`);
      }
      return;
    }
    if ((_b2 = (_a2 = this.frontspec) === null || _a2 === void 0 ? void 0 : _a2.google) === null || _b2 === void 0 ? void 0 : _b2.gtm) {
      this._initGtm();
    }
    if ((_d2 = (_c2 = this.frontspec) === null || _c2 === void 0 ? void 0 : _c2.partytown) === null || _d2 === void 0 ? void 0 : _d2.enabled) {
      this._initPartytown();
    }
  }
  /**
   * Init google tag manager
   */
  _initGtm() {
    var _a2;
    if (!SEnv2.is("production") && !__isInIframe()) {
      console.log(`<yellow>[SFront]</yellow> Initializing tracking through the <magenta>google tag manager</magenta> with this id "<cyan>${this.frontspec.google.gtm}</cyan>"`);
    }
    const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${this.frontspec.google.gtm}');`;
    const $script = document.createElement("script");
    $script.innerHTML = gtmScript;
    $script.setAttribute("id", "s-front-gtm");
    $script.setAttribute("type", ((_a2 = this.frontspec.partytown) === null || _a2 === void 0 ? void 0 : _a2.enabled) ? "text/partytown" : "text/javascript");
    document.head.appendChild($script);
  }
  /**
   * This method takes care of initializing the partytoen feature.
   */
  _initPartytown() {
    var _a2, _b2;
    if (!((_b2 = (_a2 = this.frontspec) === null || _a2 === void 0 ? void 0 : _a2.google) === null || _b2 === void 0 ? void 0 : _b2.gtm)) {
      if (!SEnv2.is("production") && !__isInIframe()) {
        console.log(`<yellow>[SFront]</yellow> You have enabled <magenta>partytown</magenta> but you don't have specified any "<cyan>settings.frontspec.google.gtm</cyan>" tag manager id...'`);
        return;
      }
    }
    window.partytown = this.frontspec.partytown;
    if (!SEnv2.is("production") && !__isInIframe()) {
      console.log("<yellow>[SFront]</yellow> Initializing <magenta>partytown</magenta> with these settings", this.frontspec.partytown);
    }
    const snippetText = partytownSnippet();
    const $partytownScript = document.createElement("script");
    $partytownScript.innerHTML = snippetText;
    $partytownScript.setAttribute("type", "text/javascript");
    document.body.appendChild($partytownScript);
  }
  /**
   * @name            agreeLegal
   * @type            Function
   *
   * This method alows you to agree the legal of the website (cookies, etc...)
   * It will flag the state.legal.agree to "true" and save some legals settings
   * in the state.legal.metas object
   *
   * @event       s-front.legal.agree             Dispatched when the user agree the legal terms
   * @event       s-front.legal.change             Dispatched when the user legal has been changed
   *
   * @param       {Any}           metas           Some metas to save alongside the agree flag
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  agreeLegal(metas) {
    this.legal.agree = true;
    if (metas) {
      this.legal.metas = metas;
    }
    __setCookie(this.settings.legal.cookieName, Object.assign({}, this.legal));
    document.dispatchEvent(new CustomEvent("s-front.legal.agree", {
      detail: this.legal
    }));
    document.dispatchEvent(new CustomEvent("s-front.legal.change", {
      detail: Object.assign({ prop: "agree" }, this.legal)
    }));
  }
  /**
   * @name            disagreeLegal
   * @type            Function
   *
   * This method alows you to disagree the legal of the website (cookies, etc...)
   * It will flag the state.legal.agree to "false" without touching the "metas" to keep
   * the potential user legal settings saved for next time
   *
   * @event       s-front.legal.disagree             Dispatched when the user agree the legal terms
   * @event       s-front.legal.change             Dispatched when the user legal has been changed
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  disagreeLegal() {
    this.legal.agree = false;
    __setCookie(this.settings.legal.cookieName, Object.assign({}, this.legal));
    document.dispatchEvent(new CustomEvent("s-front.legal.disagree", {
      detail: {
        front: this
      }
    }));
    document.dispatchEvent(new CustomEvent("s-front.legal.change", {
      detail: Object.assign({ prop: "agree" }, this.legal)
    }));
  }
  /**
   * @name            setLegalMetas
   * @type            Function
   *
   * This method allows you to set some legal metas.
   * Note that this will make a deepMerge of the current metas and the passed ones.
   *
   * @event       s-front.legal.change             Dispatched when the user legal has been changed
   *
   * @param       {Any}           metas           Some metas to set
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  setLegalMetas(metas) {
    this.legal.metas = __deepMerge(this.legal.metas, metas);
    __setCookie(this.settings.legal.cookieName, Object.assign({}, this.legal));
    document.dispatchEvent(new CustomEvent("s-front.legal.change", {
      detail: Object.assign({ prop: "metas" }, this.legal)
    }));
  }
  /**
   * @name            getLegalMetas
   * @type            Function
   *
   * This method allows you to get the legal saved metas
   *
   * @return      {Any}               The legal metas saved
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  getLegalMetas() {
    var _a2, _b2;
    return (_b2 = (_a2 = __getCookie(this.settings.legal.cookieName)) === null || _a2 === void 0 ? void 0 : _a2.metas) !== null && _b2 !== void 0 ? _b2 : {};
  }
  /**
   * @name            isLegalAgree
   * @type            Function
   *
   * This method allows you to check if the legal are agree or not
   *
   * @return      {Boolean}       true if agree, false if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  isLegalAgree() {
    var _a2;
    return (_a2 = __getCookie(this.settings.legal.cookieName)) === null || _a2 === void 0 ? void 0 : _a2.agree;
  }
  save() {
    clearTimeout(this._saveTimeout);
    this._saveTimeout = setTimeout(() => {
      localStorage.setItem(`s-front-${this.settings.id}`, JSON.stringify(this.state));
    }, 500);
  }
  /**
   * @name            restore
   * @type            Function
   *
   * This method allows you to restore locally the current front with the changes applied using the `set` method.
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  restore() {
    try {
      const savedState = JSON.parse(
        // @ts-ignore
        localStorage.getItem(`s-front-${this.settings.id}`)
      );
      this.state = savedState !== null && savedState !== void 0 ? savedState : Object.assign({}, this._originalState);
    } catch (e) {
      this.state = Object.assign({}, this._originalState);
    }
  }
  /**
   * @name            clear
   * @type            Function
   *
   * This method allows you to clear locally the current front with the changes applied using the `set` method.
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  clear() {
    localStorage.removeItem(`s-front-${this.settings.id}`);
    this.state = Object.assign({}, this._originalState);
  }
}
var __awaiter$i = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function define$d(props, name2 = "s-activate", settings = {}) {
  var _a2;
  __querySelectorLive(`[${name2}]`, ($elm) => __awaiter$i(this, void 0, void 0, function* () {
    const define2 = yield __vitePreload(() => import("./define-cb8e6c29.js"), true ? [] : void 0);
    define2.default(props, name2);
  }), {
    when: (_a2 = settings.when) !== null && _a2 !== void 0 ? _a2 : "nearViewport",
    firstOnly: true
  });
}
var __awaiter$h = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function define$c(props, name2 = "s-appear", settings = {}) {
  var _a2;
  __querySelectorLive(`[${name2}]`, ($elm) => __awaiter$h(this, void 0, void 0, function* () {
    const define2 = yield __vitePreload(() => import("./define-53212fca.js"), true ? [] : void 0);
    define2.default(props, name2);
  }), {
    when: (_a2 = settings.when) !== null && _a2 !== void 0 ? _a2 : "nearViewport",
    firstOnly: true
  });
}
var __awaiter$g = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function define$b(props, tagName = "s-clipboard-copy", settings = {}) {
  var _a2;
  __querySelectorLive(tagName, ($elm) => __awaiter$g(this, void 0, void 0, function* () {
    const define2 = yield __vitePreload(() => import("./define-212988cf.js"), true ? [] : void 0);
    define2.default(props, tagName, settings);
  }), {
    when: (_a2 = settings.when) !== null && _a2 !== void 0 ? _a2 : "nearViewport",
    firstOnly: true
  });
}
var __awaiter$f = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function define$a(props, name2 = "s-deps", settings = {}) {
  var _a2;
  __querySelectorLive(`[${name2}]`, ($elm) => __awaiter$f(this, void 0, void 0, function* () {
    const define2 = yield __vitePreload(() => import("./define-74f87922.js"), true ? [] : void 0);
    define2.default(props, name2);
  }), {
    when: (_a2 = settings.when) !== null && _a2 !== void 0 ? _a2 : "nearViewport",
    firstOnly: true
  });
}
var __awaiter$e = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function define$9(props, name2 = "s-floating", settings = {}) {
  var _a2;
  __querySelectorLive(`[${name2}]`, ($elm) => __awaiter$e(this, void 0, void 0, function* () {
    const define2 = yield __vitePreload(() => import("./define-f807099f.js"), true ? [] : void 0);
    define2.default(props, name2);
  }), {
    when: (_a2 = settings.when) !== null && _a2 !== void 0 ? _a2 : "nearViewport",
    firstOnly: true
  });
}
var __awaiter$d = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function define$8(props, name2 = "s-form-validate", settings = {}) {
  var _a2;
  __querySelectorLive(`[${name2}]`, ($elm) => __awaiter$d(this, void 0, void 0, function* () {
    const define2 = yield __vitePreload(() => import("./define-3dc1448f.js"), true ? ["define-3dc1448f.js","querySelectorUp-ba01e0d2.js"] : void 0);
    define2.default(props, name2);
  }), {
    when: (_a2 = settings.when) !== null && _a2 !== void 0 ? _a2 : "nearViewport",
    firstOnly: true
  });
}
var __awaiter$c = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function define$7(props, name2 = "s-inline", settings = {}) {
  var _a2;
  __querySelectorLive(`[${name2}]`, ($elm) => __awaiter$c(this, void 0, void 0, function* () {
    const define2 = yield __vitePreload(() => import("./define-7cdeb80b.js"), true ? [] : void 0);
    define2.default(props, name2);
  }), {
    when: (_a2 = settings.when) !== null && _a2 !== void 0 ? _a2 : "nearViewport",
    firstOnly: true
  });
}
let SMedia$1 = class SMedia extends SClass {
  get defaultAction() {
    return this._media.defaultAction;
  }
  get defaultMedia() {
    var _a2;
    return (_a2 = this._media.defaultMedia) !== null && _a2 !== void 0 ? _a2 : "desktop";
  }
  get medias() {
    return Object.keys(this._media.queries);
  }
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(settings = {}) {
    super(__deepMerge({}, settings));
  }
  /**
   * @name            countAreas
   * @type            Function
   *
   * This method allows you to count the number of area from a layout string like "1 2 _ 3 3"
   *
   * @param               {String}    layout      The layout string you want to count areas from
   * @return              {Number}                The count of areas in the passed layout string
   *
   * @since               2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  countAreas(layout) {
    const areas = [];
    layout.split(/(\\n|\s)/).map((l) => l.trim()).filter((l) => l !== "_" && l !== "").forEach((areaId) => {
      if (!areas.includes(areaId)) {
        areas.push(areaId);
      }
    });
    return areas.length;
  }
  /**
   * @name                buildQuery
   * @type                Function
   *
   * This static method allows you to built a media query by passing args like "mobile", ">tablet", etc...
   *
   * @param               {String}    query    The media query you want to build
   * @return              {String}                The builded media query (without brackets)
   *
   * @since               2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  buildQuery(queryString, settings) {
    var _a2;
    let currentQueryList = [];
    const finalSettings = {
      method: (_a2 = settings === null || settings === void 0 ? void 0 : settings.method) !== null && _a2 !== void 0 ? _a2 : "media",
      containerName: settings === null || settings === void 0 ? void 0 : settings.containerName
    };
    const queryAr = queryString.split(/(\s|\,)/gm).map((l) => l.trim()).filter((l) => l !== "" && l !== ",");
    queryAr.forEach((query, i) => {
      if (query === "and" || query === "or") {
        currentQueryList.push(query);
        return;
      }
      const firstChar = query.slice(0, 1);
      const firstTwoChar = query.slice(0, 2);
      const lastChar = query.slice(-1);
      let action = this._media.defaultAction;
      let mediaName = query;
      if (lastChar === "-" || lastChar === "|")
        mediaName = mediaName.slice(0, -1);
      if (firstTwoChar === ">=" || firstTwoChar === "<=" || firstTwoChar === "==") {
        mediaName = mediaName.slice(2);
        action = firstTwoChar;
      } else if (firstChar === "<" || firstChar === ">" || firstChar === "=") {
        mediaName = mediaName.slice(1);
        action = firstChar;
      }
      let mediaQueryConfig = this._media, sortedMedia = Object.keys(this._media.queries);
      if (typeof __parse(mediaName) === "number") {
        switch (action) {
          case ">":
          case ">=":
            mediaQueryConfig = {
              minWidth: mediaName,
              maxWidth: null
            };
            break;
          case "<":
          case "<=":
            mediaQueryConfig = {
              minWidth: null,
              maxWidth: mediaName
            };
            break;
          case "=":
            mediaQueryConfig = {
              minWidth: mediaName,
              maxWidth: mediaName
            };
            break;
        }
      } else {
        mediaQueryConfig = this._media.queries[mediaName];
        if (!mediaQueryConfig)
          throw new Error(`<red>[postcssSugarPlugin.media]</red> Sorry but the requested media "<yellow>${mediaName}</yellow>" does not exists in the config. Here's the available medias: ${Object.keys(this._media.queries).map((l) => `<green>${l}</green>`).join(",")}`);
      }
      const queryList = [];
      Object.keys(mediaQueryConfig).forEach((prop) => {
        const dashProp = __dashCase(prop);
        let value = mediaQueryConfig[prop];
        if (!value) {
          if (prop === "minWidth") {
            value = 0;
          } else if (prop === "maxWidth") {
            value = 99999;
          }
        }
        if (["min-width", "max-width"].indexOf(dashProp) !== -1) {
          if (action === ">") {
            if (dashProp === "max-width") {
              let argName = "min-width";
              queryList.push(`(${argName}: ${value + 1}px)`);
            }
          } else if (action === "<") {
            if (dashProp === "min-width") {
              let argName = "max-width";
              queryList.push(`(${argName}: ${value}px)`);
            }
          } else if (action === "=") {
            queryList.push(`(${dashProp}: ${value}px)`);
          } else if (action === ">=") {
            if (sortedMedia.at(-1) === mediaName) {
              return;
            }
            if (dashProp === "min-width") {
              queryList.push(`(${dashProp}: ${value}px)`);
            }
          } else if (action === "<=") {
            if (sortedMedia[0] === mediaName) {
              return;
            }
            if (dashProp === "max-width") {
              queryList.push(`(${dashProp}: ${value}px)`);
            }
          } else {
            queryList.push(`(${dashProp}: ${value}px)`);
          }
        } else {
          queryList.push(`(${dashProp}: ${value}px)`);
        }
      });
      if (lastChar === "-") {
        queryList.push("(orientation: landscape)");
      } else if (lastChar === "|") {
        queryList.push("(orientation: portrait)");
      }
      currentQueryList.push(queryList.join(" and "));
    });
    currentQueryList = currentQueryList.filter((l) => l.trim() !== "");
    if (finalSettings.method === "container") {
      return `@container ${finalSettings.containerName} ${currentQueryList.join(" ")}`;
    }
    return `@media ${currentQueryList.join(" ")}`;
  }
  /**
   * @name            layoutCss
   * @type            Function
   *
   * This function takes a layout definition like "1 2 _ 3 3" and generate the css that will handle this layout.
   * You can as well pass some informations the gap wanted, the alignement, etc...
   *
   * @param       {String|Array}         layout            The layout string defintion you want to generate the css for like "1 2 _ 3 3". It can also be an associative array like ["desktop" : "1 2", "mobile" : "1 _ 2"]
   * @param       {Array}         [settings=null]      Some settings to configure your layout generation
   * @return      {String}                         The resulting css
   *
   * @setting         {String}        [method='container']        The method to use. By default, it will use the @container query over the @media one cause it offers more possibilities like resizing the ".s-viewport" element
   * @setting         {String}        [containerName='viewport']    The container name on which the @container query will refer to.
   * @setting         {String}        [selector='#layout']       A css selector used to target the correct section/div...
   * @setting         {String}        [gap=null]                 A gap value to apply on your layout
   * @setting         {Boolean}       [gapBetween=true]           Specify if you want the gap only between the cells or all around
   * @setting         {String}        [align='stretch']           The "align-items" value for your grid layout
   * @setting         {String}        [justify='stretch']         The "justify-items" value for your grid layout
   * @setting         {Boolean}       [minify=true]             Minify the output css or not
   * @setting         {Array}         [scope=['bare','lnf','gap','align','justify']]             The scope(s) you want to generate
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  layoutCss(layout, settings) {
    const finalSettings = Object.assign({ method: "container", containerName: "viewport", selector: "#layout", gap: null, gapBetween: true, align: "stretch", justify: "stretch", minify: false, scope: ["bare", "lnf", "gap", "align", "justify"] }, settings !== null && settings !== void 0 ? settings : {});
    if (typeof layout !== "string") {
      const finalCss = [];
      let defaultAction = "<=";
      if (this._media.defaultAction) {
        defaultAction = this._media.defaultAction;
      }
      const queries = this._media.queries;
      const keys3 = Object.keys(queries);
      const orderedLayouts = {};
      keys3.forEach((media) => {
        if (layout[media]) {
          let lay = layout[media];
          if (typeof lay !== "string") {
            lay = lay.layout;
          }
          orderedLayouts[media] = lay;
        }
      });
      let i = 0;
      for (let [media, lay] of Object.entries(orderedLayouts)) {
        if (defaultAction == ">=" && i >= keys3.length - 1) {
          media = null;
        } else if (defaultAction == "<=" && i == 0) {
          media = null;
        }
        i++;
        finalCss.push(__layoutCss(lay, Object.assign(Object.assign({}, finalSettings), { media })));
      }
      return finalCss.join("\n");
    }
    if (finalSettings.media == "default") {
      finalSettings.media = null;
    }
    const areas = [];
    const colsCountByArea = [];
    const rowsCountByArea = [];
    const areasCountedByLine = [];
    const areasCountedByCol = [];
    const colsStartByArea = [];
    const rowsStartByArea = [];
    const colsEndByArea = [];
    const rowsEndByArea = [];
    const rows = layout.split(/(\\n|_)/).map((l) => l.trim()).filter((l) => l !== "_" && l !== "");
    rows.length;
    let colsCount = 0;
    rows.forEach((row) => {
      const rowsCols = row.split(" ").map((l) => l.trim());
      if (rowsCols.length > colsCount) {
        colsCount = rowsCols.length;
      }
    });
    let currentCol = 0, currentRow = 0;
    rows.forEach((row) => {
      currentRow++;
      currentCol = 0;
      const rowCols = row.split(" ").map((l) => l.trim());
      rowCols.forEach((areaId) => {
        currentCol++;
        if (!areas.includes(areaId)) {
          areas.push(areaId);
        }
        if (!areasCountedByCol[`${currentCol}-${areaId}`]) {
          areasCountedByCol[`${currentCol}-${areaId}`] = true;
          const current = colsCountByArea[areaId] ? colsCountByArea[areaId] : 0;
          colsCountByArea[areaId] = current + 1;
        }
        if (!areasCountedByLine[`${currentRow}-${areaId}`]) {
          areasCountedByLine[`${currentRow}-${areaId}`] = true;
          const current = rowsCountByArea[areaId] ? rowsCountByArea[areaId] : 0;
          rowsCountByArea[areaId] = current + 1;
        }
      });
    });
    currentCol = 0;
    currentRow = 0;
    rows.forEach((row) => {
      currentRow++;
      currentCol = 0;
      const rowCols = row.split(" ").map((l) => l.trim());
      rowCols.forEach((areaId) => {
        currentCol++;
        if (!colsStartByArea[areaId]) {
          colsStartByArea[areaId] = currentCol;
        }
        if (!rowsStartByArea[areaId]) {
          rowsStartByArea[areaId] = currentRow;
        }
        colsEndByArea[areaId] = currentCol;
        rowsEndByArea[areaId] = currentRow;
      });
    });
    const colsStatement = [];
    for (let i = 0; i < colsCount; i++) {
      if (colsCount <= 1) {
        colsStatement.push("100%");
      } else {
        colsStatement.push("1fr");
      }
    }
    const vars = [`${finalSettings.selector} {`];
    if (finalSettings.scope.includes("bare")) {
      vars.push(`display: grid;`);
      vars.push(`grid-template-columns: ${colsStatement.join(" ")};`);
      vars.push(`grid-template-rows: auto;`);
    }
    if (finalSettings.scope.includes("align")) {
      vars.push(`align-items: ${finalSettings.align};`);
    }
    if (finalSettings.scope.includes("justify")) {
      vars.push(`justify-content: ${finalSettings.justify};`);
    }
    if (finalSettings.gap && finalSettings.scope.includes("gap")) {
      vars.push(`gap: ${finalSettings.gap};`);
    }
    vars.push("}");
    if (finalSettings.scope.includes("bare")) {
      areas.forEach((areaId, i) => {
        if (areaId === "x" || areaId === "-") {
          return;
        }
        vars.push(`${finalSettings.selector} > .s-layout_area-${areaId} {
                        grid-column-start: ${colsStartByArea[areaId]};
                        grid-column-end: ${colsEndByArea[areaId] + 1};
                        grid-row-start: ${rowsStartByArea[areaId]};
                        grid-row-end: ${rowsEndByArea[areaId] + 1};
            }`);
      });
    }
    if (finalSettings.media) {
      const query = this.buildQuery(this._media);
      vars.unshift(`${query} {`);
      vars.push("}");
    }
    let css2 = vars.join(finalSettings.minify ? " " : "\n");
    if (finalSettings.minify) {
      css2 = css2.replace(/\n/gm, " ").replace(/\s{2,999}/gm, " ");
    }
    return {
      css: css2,
      areas
    };
  }
  /**
   * @name            sortQueries
   * @type            Function
   *
   * This function take as input the "media" property of the `frontspec.json` file and return
   * a new object mostly the same but with the "queries" object|array sorted depending on the
   * "defaultAction" property.
   *
   * @param     {Object}      media                      The frontspec "media" object
   * @return    {Object}                                  The same object with the "queries" sorted correctly
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  sortQueries(media = null) {
    if (media == null) {
      media = this.media;
    }
    if (!media.defaultAction) {
      return media;
    }
    const queries = __sort(media.queries, (a, b) => {
      if (media.defaultAction == "<=") {
        return a.value.minWidth < b.value.minWidth ? 1 : -1;
      } else if (media.defaultAction == ">=") {
        return a.value.minWidth > b.value.minWidth ? 1 : -1;
      }
      return 0;
    });
    const sortedQueries = {};
    for (let [m, query] of Object.entries(queries)) {
      sortedQueries[m] = query;
    }
    media.queries = sortedQueries;
    return media;
  }
};
class SMedia2 extends SMedia$1 {
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(media = "frontspec", settings = {}) {
    super(__deepMerge({}, settings));
    if (media === "frontspec") {
      this._media = SFrontspec.get("media");
    } else if (media) {
      this._media = media;
    } else {
      this._media = {
        defaultAction: "<=",
        defaultMedia: "desktop",
        method: "media",
        containerName: "viewport",
        queries: {
          mobile: {
            minWidth: 0,
            maxWidth: 639
          },
          tablet: {
            minWidth: 640,
            maxWidth: 1279
          },
          desktop: {
            minWidth: 1280,
            maxWidth: 2047
          },
          wide: {
            minWidth: 2048,
            maxWidth: null
          }
        }
      };
    }
    this._media = this.sortQueries(this._media);
  }
}
function __debounce(delay, fn2) {
  let timer = null;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn2.apply(context, args);
    }, delay);
  };
}
var noop = function() {
};
var _undefined$1 = noop();
var isValue$5 = function(val) {
  return val !== _undefined$1 && val !== null;
};
var isValue$4 = isValue$5;
var forEach2 = Array.prototype.forEach, create = Object.create;
var process$1 = function(src2, obj) {
  var key;
  for (key in src2)
    obj[key] = src2[key];
};
var normalizeOptions = function(opts1) {
  var result2 = create(null);
  forEach2.call(arguments, function(options) {
    if (!isValue$4(options))
      return;
    process$1(Object(options), result2);
  });
  return result2;
};
var isImplemented$6 = function() {
  var sign2 = Math.sign;
  if (typeof sign2 !== "function")
    return false;
  return sign2(10) === 1 && sign2(-20) === -1;
};
var shim$4;
var hasRequiredShim$4;
function requireShim$4() {
  if (hasRequiredShim$4)
    return shim$4;
  hasRequiredShim$4 = 1;
  shim$4 = function(value) {
    value = Number(value);
    if (isNaN(value) || value === 0)
      return value;
    return value > 0 ? 1 : -1;
  };
  return shim$4;
}
var sign$1 = isImplemented$6() ? Math.sign : requireShim$4();
var sign = sign$1, abs = Math.abs, floor = Math.floor;
var toInteger$1 = function(value) {
  if (isNaN(value))
    return 0;
  value = Number(value);
  if (value === 0 || !isFinite(value))
    return value;
  return sign(value) * floor(abs(value));
};
var toInteger = toInteger$1, max = Math.max;
var toPosInteger = function(value) {
  return max(0, toInteger(value));
};
var validCallable = function(fn2) {
  if (typeof fn2 !== "function")
    throw new TypeError(fn2 + " is not a function");
  return fn2;
};
var isValue$3 = isValue$5;
var validValue = function(value) {
  if (!isValue$3(value))
    throw new TypeError("Cannot use null or undefined");
  return value;
};
var custom = { exports: {} };
var isImplemented$5 = function() {
  var assign2 = Object.assign, obj;
  if (typeof assign2 !== "function")
    return false;
  obj = { foo: "raz" };
  assign2(obj, { bar: "dwa" }, { trzy: "trzy" });
  return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};
var isImplemented$4;
var hasRequiredIsImplemented$3;
function requireIsImplemented$3() {
  if (hasRequiredIsImplemented$3)
    return isImplemented$4;
  hasRequiredIsImplemented$3 = 1;
  isImplemented$4 = function() {
    try {
      Object.keys("primitive");
      return true;
    } catch (e) {
      return false;
    }
  };
  return isImplemented$4;
}
var shim$3;
var hasRequiredShim$3;
function requireShim$3() {
  if (hasRequiredShim$3)
    return shim$3;
  hasRequiredShim$3 = 1;
  var isValue2 = isValue$5;
  var keys3 = Object.keys;
  shim$3 = function(object) {
    return keys3(isValue2(object) ? Object(object) : object);
  };
  return shim$3;
}
var keys2;
var hasRequiredKeys;
function requireKeys() {
  if (hasRequiredKeys)
    return keys2;
  hasRequiredKeys = 1;
  keys2 = requireIsImplemented$3()() ? Object.keys : requireShim$3();
  return keys2;
}
var shim$2;
var hasRequiredShim$2;
function requireShim$2() {
  if (hasRequiredShim$2)
    return shim$2;
  hasRequiredShim$2 = 1;
  var keys3 = requireKeys(), value = validValue, max2 = Math.max;
  shim$2 = function(dest, src2) {
    var error, i, length = max2(arguments.length, 2), assign2;
    dest = Object(value(dest));
    assign2 = function(key) {
      try {
        dest[key] = src2[key];
      } catch (e) {
        if (!error)
          error = e;
      }
    };
    for (i = 1; i < length; ++i) {
      src2 = arguments[i];
      keys3(src2).forEach(assign2);
    }
    if (error !== void 0)
      throw error;
    return dest;
  };
  return shim$2;
}
var assign$1 = isImplemented$5() ? Object.assign : requireShim$2();
var isValue$2 = isValue$5;
var map = { function: true, object: true };
var isObject$1 = function(value) {
  return isValue$2(value) && map[typeof value] || false;
};
(function(module) {
  var assign2 = assign$1, isObject3 = isObject$1, isValue2 = isValue$5, captureStackTrace = Error.captureStackTrace;
  module.exports = function(message) {
    var err = new Error(message), code = arguments[1], ext2 = arguments[2];
    if (!isValue2(ext2)) {
      if (isObject3(code)) {
        ext2 = code;
        code = null;
      }
    }
    if (isValue2(ext2))
      assign2(err, ext2);
    if (isValue2(code))
      err.code = code;
    if (captureStackTrace)
      captureStackTrace(err, module.exports);
    return err;
  };
})(custom);
var test = function(arg1, arg2) {
  return arg2;
};
try {
  Object.defineProperty(test, "length", {
    configurable: true,
    writable: false,
    enumerable: false,
    value: 1
  });
} catch (ignore) {
}
if (test.length === 1)
  ;
var d$2 = { exports: {} };
var _undefined = void 0;
var is$4 = function(value) {
  return value !== _undefined && value !== null;
};
var isValue$1 = is$4;
var possibleTypes = {
  "object": true,
  "function": true,
  "undefined": true
  /* document.all */
};
var is$3 = function(value) {
  if (!isValue$1(value))
    return false;
  return hasOwnProperty.call(possibleTypes, typeof value);
};
var isObject2 = is$3;
var is$2 = function(value) {
  if (!isObject2(value))
    return false;
  try {
    if (!value.constructor)
      return false;
    return value.constructor.prototype === value;
  } catch (error) {
    return false;
  }
};
var isPrototype = is$2;
var is$1 = function(value) {
  if (typeof value !== "function")
    return false;
  if (!hasOwnProperty.call(value, "length"))
    return false;
  try {
    if (typeof value.length !== "number")
      return false;
    if (typeof value.call !== "function")
      return false;
    if (typeof value.apply !== "function")
      return false;
  } catch (error) {
    return false;
  }
  return !isPrototype(value);
};
var isFunction$1 = is$1;
var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;
var is = function(value) {
  if (!isFunction$1(value))
    return false;
  if (classRe.test(functionToString.call(value)))
    return false;
  return true;
};
var str = "razdwatrzy";
var isImplemented$3 = function() {
  if (typeof str.contains !== "function")
    return false;
  return str.contains("dwa") === true && str.contains("foo") === false;
};
var shim$1;
var hasRequiredShim$1;
function requireShim$1() {
  if (hasRequiredShim$1)
    return shim$1;
  hasRequiredShim$1 = 1;
  var indexOf = String.prototype.indexOf;
  shim$1 = function(searchString) {
    return indexOf.call(this, searchString, arguments[1]) > -1;
  };
  return shim$1;
}
var contains$1 = isImplemented$3() ? String.prototype.contains : requireShim$1();
var isValue = is$4, isPlainFunction = is, assign = assign$1, normalizeOpts = normalizeOptions, contains = contains$1;
var d$1 = d$2.exports = function(dscr, value) {
  var c, e, w, options, desc;
  if (arguments.length < 2 || typeof dscr !== "string") {
    options = value;
    value = dscr;
    dscr = null;
  } else {
    options = arguments[2];
  }
  if (isValue(dscr)) {
    c = contains.call(dscr, "c");
    e = contains.call(dscr, "e");
    w = contains.call(dscr, "w");
  } else {
    c = w = true;
    e = false;
  }
  desc = { value, configurable: c, enumerable: e, writable: w };
  return !options ? desc : assign(normalizeOpts(options), desc);
};
d$1.gs = function(dscr, get2, set) {
  var c, e, options, desc;
  if (typeof dscr !== "string") {
    options = set;
    set = get2;
    get2 = dscr;
    dscr = null;
  } else {
    options = arguments[3];
  }
  if (!isValue(get2)) {
    get2 = void 0;
  } else if (!isPlainFunction(get2)) {
    options = get2;
    get2 = set = void 0;
  } else if (!isValue(set)) {
    set = void 0;
  } else if (!isPlainFunction(set)) {
    options = set;
    set = void 0;
  }
  if (isValue(dscr)) {
    c = contains.call(dscr, "c");
    e = contains.call(dscr, "e");
  } else {
    c = true;
    e = false;
  }
  desc = { get: get2, set, configurable: c, enumerable: e };
  return !options ? desc : assign(normalizeOpts(options), desc);
};
var dExports = d$2.exports;
var eventEmitter = { exports: {} };
(function(module, exports) {
  var d2 = dExports, callable = validCallable, apply = Function.prototype.apply, call = Function.prototype.call, create2 = Object.create, defineProperty3 = Object.defineProperty, defineProperties2 = Object.defineProperties, hasOwnProperty2 = Object.prototype.hasOwnProperty, descriptor2 = { configurable: true, enumerable: false, writable: true }, on, once, off, emit, methods, descriptors, base;
  on = function(type, listener) {
    var data2;
    callable(listener);
    if (!hasOwnProperty2.call(this, "__ee__")) {
      data2 = descriptor2.value = create2(null);
      defineProperty3(this, "__ee__", descriptor2);
      descriptor2.value = null;
    } else {
      data2 = this.__ee__;
    }
    if (!data2[type])
      data2[type] = listener;
    else if (typeof data2[type] === "object")
      data2[type].push(listener);
    else
      data2[type] = [data2[type], listener];
    return this;
  };
  once = function(type, listener) {
    var once2, self2;
    callable(listener);
    self2 = this;
    on.call(this, type, once2 = function() {
      off.call(self2, type, once2);
      apply.call(listener, this, arguments);
    });
    once2.__eeOnceListener__ = listener;
    return this;
  };
  off = function(type, listener) {
    var data2, listeners, candidate, i;
    callable(listener);
    if (!hasOwnProperty2.call(this, "__ee__"))
      return this;
    data2 = this.__ee__;
    if (!data2[type])
      return this;
    listeners = data2[type];
    if (typeof listeners === "object") {
      for (i = 0; candidate = listeners[i]; ++i) {
        if (candidate === listener || candidate.__eeOnceListener__ === listener) {
          if (listeners.length === 2)
            data2[type] = listeners[i ? 0 : 1];
          else
            listeners.splice(i, 1);
        }
      }
    } else {
      if (listeners === listener || listeners.__eeOnceListener__ === listener) {
        delete data2[type];
      }
    }
    return this;
  };
  emit = function(type) {
    var i, l, listener, listeners, args;
    if (!hasOwnProperty2.call(this, "__ee__"))
      return;
    listeners = this.__ee__[type];
    if (!listeners)
      return;
    if (typeof listeners === "object") {
      l = arguments.length;
      args = new Array(l - 1);
      for (i = 1; i < l; ++i)
        args[i - 1] = arguments[i];
      listeners = listeners.slice();
      for (i = 0; listener = listeners[i]; ++i) {
        apply.call(listener, this, args);
      }
    } else {
      switch (arguments.length) {
        case 1:
          call.call(listeners, this);
          break;
        case 2:
          call.call(listeners, this, arguments[1]);
          break;
        case 3:
          call.call(listeners, this, arguments[1], arguments[2]);
          break;
        default:
          l = arguments.length;
          args = new Array(l - 1);
          for (i = 1; i < l; ++i) {
            args[i - 1] = arguments[i];
          }
          apply.call(listeners, this, args);
      }
    }
  };
  methods = {
    on,
    once,
    off,
    emit
  };
  descriptors = {
    on: d2(on),
    once: d2(once),
    off: d2(off),
    emit: d2(emit)
  };
  base = defineProperties2({}, descriptors);
  module.exports = exports = function(o) {
    return o == null ? create2(base) : defineProperties2(Object(o), descriptors);
  };
  exports.methods = methods;
})(eventEmitter, eventEmitter.exports);
var eventEmitterExports = eventEmitter.exports;
var isImplemented$2;
var hasRequiredIsImplemented$2;
function requireIsImplemented$2() {
  if (hasRequiredIsImplemented$2)
    return isImplemented$2;
  hasRequiredIsImplemented$2 = 1;
  isImplemented$2 = function() {
    var from2 = Array.from, arr, result2;
    if (typeof from2 !== "function")
      return false;
    arr = ["raz", "dwa"];
    result2 = from2(arr);
    return Boolean(result2 && result2 !== arr && result2[1] === "dwa");
  };
  return isImplemented$2;
}
var isImplemented$1;
var hasRequiredIsImplemented$1;
function requireIsImplemented$1() {
  if (hasRequiredIsImplemented$1)
    return isImplemented$1;
  hasRequiredIsImplemented$1 = 1;
  isImplemented$1 = function() {
    if (typeof globalThis !== "object")
      return false;
    if (!globalThis)
      return false;
    return globalThis.Array === Array;
  };
  return isImplemented$1;
}
var implementation;
var hasRequiredImplementation;
function requireImplementation() {
  if (hasRequiredImplementation)
    return implementation;
  hasRequiredImplementation = 1;
  var naiveFallback = function() {
    if (typeof self === "object" && self)
      return self;
    if (typeof window === "object" && window)
      return window;
    throw new Error("Unable to resolve global `this`");
  };
  implementation = function() {
    if (this)
      return this;
    try {
      Object.defineProperty(Object.prototype, "__global__", {
        get: function() {
          return this;
        },
        configurable: true
      });
    } catch (error) {
      return naiveFallback();
    }
    try {
      if (!__global__)
        return naiveFallback();
      return __global__;
    } finally {
      delete Object.prototype.__global__;
    }
  }();
  return implementation;
}
var globalThis_1;
var hasRequiredGlobalThis;
function requireGlobalThis() {
  if (hasRequiredGlobalThis)
    return globalThis_1;
  hasRequiredGlobalThis = 1;
  globalThis_1 = requireIsImplemented$1()() ? globalThis : requireImplementation();
  return globalThis_1;
}
var isImplemented;
var hasRequiredIsImplemented;
function requireIsImplemented() {
  if (hasRequiredIsImplemented)
    return isImplemented;
  hasRequiredIsImplemented = 1;
  var global2 = requireGlobalThis(), validTypes = { object: true, symbol: true };
  isImplemented = function() {
    var Symbol2 = global2.Symbol;
    var symbol;
    if (typeof Symbol2 !== "function")
      return false;
    symbol = Symbol2("test symbol");
    try {
      String(symbol);
    } catch (e) {
      return false;
    }
    if (!validTypes[typeof Symbol2.iterator])
      return false;
    if (!validTypes[typeof Symbol2.toPrimitive])
      return false;
    if (!validTypes[typeof Symbol2.toStringTag])
      return false;
    return true;
  };
  return isImplemented;
}
var isSymbol;
var hasRequiredIsSymbol;
function requireIsSymbol() {
  if (hasRequiredIsSymbol)
    return isSymbol;
  hasRequiredIsSymbol = 1;
  isSymbol = function(value) {
    if (!value)
      return false;
    if (typeof value === "symbol")
      return true;
    if (!value.constructor)
      return false;
    if (value.constructor.name !== "Symbol")
      return false;
    return value[value.constructor.toStringTag] === "Symbol";
  };
  return isSymbol;
}
var validateSymbol;
var hasRequiredValidateSymbol;
function requireValidateSymbol() {
  if (hasRequiredValidateSymbol)
    return validateSymbol;
  hasRequiredValidateSymbol = 1;
  var isSymbol2 = requireIsSymbol();
  validateSymbol = function(value) {
    if (!isSymbol2(value))
      throw new TypeError(value + " is not a symbol");
    return value;
  };
  return validateSymbol;
}
var generateName;
var hasRequiredGenerateName;
function requireGenerateName() {
  if (hasRequiredGenerateName)
    return generateName;
  hasRequiredGenerateName = 1;
  var d2 = dExports;
  var create2 = Object.create, defineProperty3 = Object.defineProperty, objPrototype = Object.prototype;
  var created = create2(null);
  generateName = function(desc) {
    var postfix = 0, name2, ie11BugWorkaround;
    while (created[desc + (postfix || "")])
      ++postfix;
    desc += postfix || "";
    created[desc] = true;
    name2 = "@@" + desc;
    defineProperty3(
      objPrototype,
      name2,
      d2.gs(null, function(value) {
        if (ie11BugWorkaround)
          return;
        ie11BugWorkaround = true;
        defineProperty3(this, name2, d2(value));
        ie11BugWorkaround = false;
      })
    );
    return name2;
  };
  return generateName;
}
var standardSymbols;
var hasRequiredStandardSymbols;
function requireStandardSymbols() {
  if (hasRequiredStandardSymbols)
    return standardSymbols;
  hasRequiredStandardSymbols = 1;
  var d2 = dExports, NativeSymbol = requireGlobalThis().Symbol;
  standardSymbols = function(SymbolPolyfill) {
    return Object.defineProperties(SymbolPolyfill, {
      // To ensure proper interoperability with other native functions (e.g. Array.from)
      // fallback to eventual native implementation of given symbol
      hasInstance: d2(
        "",
        NativeSymbol && NativeSymbol.hasInstance || SymbolPolyfill("hasInstance")
      ),
      isConcatSpreadable: d2(
        "",
        NativeSymbol && NativeSymbol.isConcatSpreadable || SymbolPolyfill("isConcatSpreadable")
      ),
      iterator: d2("", NativeSymbol && NativeSymbol.iterator || SymbolPolyfill("iterator")),
      match: d2("", NativeSymbol && NativeSymbol.match || SymbolPolyfill("match")),
      replace: d2("", NativeSymbol && NativeSymbol.replace || SymbolPolyfill("replace")),
      search: d2("", NativeSymbol && NativeSymbol.search || SymbolPolyfill("search")),
      species: d2("", NativeSymbol && NativeSymbol.species || SymbolPolyfill("species")),
      split: d2("", NativeSymbol && NativeSymbol.split || SymbolPolyfill("split")),
      toPrimitive: d2(
        "",
        NativeSymbol && NativeSymbol.toPrimitive || SymbolPolyfill("toPrimitive")
      ),
      toStringTag: d2(
        "",
        NativeSymbol && NativeSymbol.toStringTag || SymbolPolyfill("toStringTag")
      ),
      unscopables: d2(
        "",
        NativeSymbol && NativeSymbol.unscopables || SymbolPolyfill("unscopables")
      )
    });
  };
  return standardSymbols;
}
var symbolRegistry;
var hasRequiredSymbolRegistry;
function requireSymbolRegistry() {
  if (hasRequiredSymbolRegistry)
    return symbolRegistry;
  hasRequiredSymbolRegistry = 1;
  var d2 = dExports, validateSymbol2 = requireValidateSymbol();
  var registry = /* @__PURE__ */ Object.create(null);
  symbolRegistry = function(SymbolPolyfill) {
    return Object.defineProperties(SymbolPolyfill, {
      for: d2(function(key) {
        if (registry[key])
          return registry[key];
        return registry[key] = SymbolPolyfill(String(key));
      }),
      keyFor: d2(function(symbol) {
        var key;
        validateSymbol2(symbol);
        for (key in registry) {
          if (registry[key] === symbol)
            return key;
        }
        return void 0;
      })
    });
  };
  return symbolRegistry;
}
var polyfill;
var hasRequiredPolyfill;
function requirePolyfill() {
  if (hasRequiredPolyfill)
    return polyfill;
  hasRequiredPolyfill = 1;
  var d2 = dExports, validateSymbol2 = requireValidateSymbol(), NativeSymbol = requireGlobalThis().Symbol, generateName2 = requireGenerateName(), setupStandardSymbols = requireStandardSymbols(), setupSymbolRegistry = requireSymbolRegistry();
  var create2 = Object.create, defineProperties2 = Object.defineProperties, defineProperty3 = Object.defineProperty;
  var SymbolPolyfill, HiddenSymbol, isNativeSafe;
  if (typeof NativeSymbol === "function") {
    try {
      String(NativeSymbol());
      isNativeSafe = true;
    } catch (ignore) {
    }
  } else {
    NativeSymbol = null;
  }
  HiddenSymbol = function Symbol2(description2) {
    if (this instanceof HiddenSymbol)
      throw new TypeError("Symbol is not a constructor");
    return SymbolPolyfill(description2);
  };
  polyfill = SymbolPolyfill = function Symbol2(description2) {
    var symbol;
    if (this instanceof Symbol2)
      throw new TypeError("Symbol is not a constructor");
    if (isNativeSafe)
      return NativeSymbol(description2);
    symbol = create2(HiddenSymbol.prototype);
    description2 = description2 === void 0 ? "" : String(description2);
    return defineProperties2(symbol, {
      __description__: d2("", description2),
      __name__: d2("", generateName2(description2))
    });
  };
  setupStandardSymbols(SymbolPolyfill);
  setupSymbolRegistry(SymbolPolyfill);
  defineProperties2(HiddenSymbol.prototype, {
    constructor: d2(SymbolPolyfill),
    toString: d2("", function() {
      return this.__name__;
    })
  });
  defineProperties2(SymbolPolyfill.prototype, {
    toString: d2(function() {
      return "Symbol (" + validateSymbol2(this).__description__ + ")";
    }),
    valueOf: d2(function() {
      return validateSymbol2(this);
    })
  });
  defineProperty3(
    SymbolPolyfill.prototype,
    SymbolPolyfill.toPrimitive,
    d2("", function() {
      var symbol = validateSymbol2(this);
      if (typeof symbol === "symbol")
        return symbol;
      return symbol.toString();
    })
  );
  defineProperty3(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d2("c", "Symbol"));
  defineProperty3(
    HiddenSymbol.prototype,
    SymbolPolyfill.toStringTag,
    d2("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag])
  );
  defineProperty3(
    HiddenSymbol.prototype,
    SymbolPolyfill.toPrimitive,
    d2("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive])
  );
  return polyfill;
}
var es6Symbol;
var hasRequiredEs6Symbol;
function requireEs6Symbol() {
  if (hasRequiredEs6Symbol)
    return es6Symbol;
  hasRequiredEs6Symbol = 1;
  es6Symbol = requireIsImplemented()() ? requireGlobalThis().Symbol : requirePolyfill();
  return es6Symbol;
}
var isArguments4;
var hasRequiredIsArguments;
function requireIsArguments() {
  if (hasRequiredIsArguments)
    return isArguments4;
  hasRequiredIsArguments = 1;
  var objToString = Object.prototype.toString, id = objToString.call(function() {
    return arguments;
  }());
  isArguments4 = function(value) {
    return objToString.call(value) === id;
  };
  return isArguments4;
}
var isFunction;
var hasRequiredIsFunction;
function requireIsFunction() {
  if (hasRequiredIsFunction)
    return isFunction;
  hasRequiredIsFunction = 1;
  var objToString = Object.prototype.toString, isFunctionStringTag = RegExp.prototype.test.bind(/^[object [A-Za-z0-9]*Function]$/);
  isFunction = function(value) {
    return typeof value === "function" && isFunctionStringTag(objToString.call(value));
  };
  return isFunction;
}
var isString2;
var hasRequiredIsString;
function requireIsString() {
  if (hasRequiredIsString)
    return isString2;
  hasRequiredIsString = 1;
  var objToString = Object.prototype.toString, id = objToString.call("");
  isString2 = function(value) {
    return typeof value === "string" || value && typeof value === "object" && (value instanceof String || objToString.call(value) === id) || false;
  };
  return isString2;
}
var shim;
var hasRequiredShim;
function requireShim() {
  if (hasRequiredShim)
    return shim;
  hasRequiredShim = 1;
  var iteratorSymbol = requireEs6Symbol().iterator, isArguments5 = requireIsArguments(), isFunction2 = requireIsFunction(), toPosInt = toPosInteger, callable = validCallable, validValue$1 = validValue, isValue2 = isValue$5, isString3 = requireIsString(), isArray2 = Array.isArray, call = Function.prototype.call, desc = { configurable: true, enumerable: true, writable: true, value: null }, defineProperty3 = Object.defineProperty;
  shim = function(arrayLike) {
    var mapFn = arguments[1], thisArg = arguments[2], Context, i, j, arr, length, code, iterator, result2, getIterator, value;
    arrayLike = Object(validValue$1(arrayLike));
    if (isValue2(mapFn))
      callable(mapFn);
    if (!this || this === Array || !isFunction2(this)) {
      if (!mapFn) {
        if (isArguments5(arrayLike)) {
          length = arrayLike.length;
          if (length !== 1)
            return Array.apply(null, arrayLike);
          arr = new Array(1);
          arr[0] = arrayLike[0];
          return arr;
        }
        if (isArray2(arrayLike)) {
          arr = new Array(length = arrayLike.length);
          for (i = 0; i < length; ++i)
            arr[i] = arrayLike[i];
          return arr;
        }
      }
      arr = [];
    } else {
      Context = this;
    }
    if (!isArray2(arrayLike)) {
      if ((getIterator = arrayLike[iteratorSymbol]) !== void 0) {
        iterator = callable(getIterator).call(arrayLike);
        if (Context)
          arr = new Context();
        result2 = iterator.next();
        i = 0;
        while (!result2.done) {
          value = mapFn ? call.call(mapFn, thisArg, result2.value, i) : result2.value;
          if (Context) {
            desc.value = value;
            defineProperty3(arr, i, desc);
          } else {
            arr[i] = value;
          }
          result2 = iterator.next();
          ++i;
        }
        length = i;
      } else if (isString3(arrayLike)) {
        length = arrayLike.length;
        if (Context)
          arr = new Context();
        for (i = 0, j = 0; i < length; ++i) {
          value = arrayLike[i];
          if (i + 1 < length) {
            code = value.charCodeAt(0);
            if (code >= 55296 && code <= 56319)
              value += arrayLike[++i];
          }
          value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
          if (Context) {
            desc.value = value;
            defineProperty3(arr, j, desc);
          } else {
            arr[j] = value;
          }
          ++j;
        }
        length = j;
      }
    }
    if (length === void 0) {
      length = toPosInt(arrayLike.length);
      if (Context)
        arr = new Context(length);
      for (i = 0; i < length; ++i) {
        value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
        if (Context) {
          desc.value = value;
          defineProperty3(arr, i, desc);
        } else {
          arr[i] = value;
        }
      }
    }
    if (Context) {
      desc.value = null;
      arr.length = length;
    }
    return arr;
  };
  return shim;
}
var from;
var hasRequiredFrom;
function requireFrom() {
  if (hasRequiredFrom)
    return from;
  hasRequiredFrom = 1;
  from = requireIsImplemented$2()() ? Array.from : requireShim();
  return from;
}
requireFrom();
var ee = eventEmitterExports.methods;
ee.on;
ee.emit;
class SStoreLsAdapter {
  constructor(id) {
    this.async = false;
    this._id = id;
  }
  save(state) {
    window.localStorage.setItem(`state-${this._id}`, JSON.stringify(state));
  }
  load() {
    var _a2;
    return JSON.parse((_a2 = window.localStorage.getItem(`state-${this._id}`)) !== null && _a2 !== void 0 ? _a2 : "{}");
  }
}
var __awaiter$b = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SStateFsAdapter {
  constructor(id, settings) {
    this.async = true;
    this._id = id;
    this._settings = settings;
  }
  _init() {
    var _a2, _b2;
    return __awaiter$b(this, void 0, void 0, function* () {
      const { __packageTmpDir } = yield __vitePreload(() => import("./_exports-4969bfec.js"), true ? ["_exports-4969bfec.js","__vite-browser-external_fs-15d823eb.js"] : void 0);
      this._statesDir = (_b2 = (_a2 = this._settings) === null || _a2 === void 0 ? void 0 : _a2.folder) !== null && _b2 !== void 0 ? _b2 : `${__packageTmpDir()}/states`;
      this._stateFile = `${this._statesDir}/${this._id}.state.json`;
    });
  }
  save(state) {
    return new Promise((resolve) => __awaiter$b(this, void 0, void 0, function* () {
      const _fs = yield __vitePreload(() => import("./__vite-browser-external_fs-15d823eb.js").then((n) => n.a), true ? [] : void 0);
      yield this._init();
      if (!_fs.existsSync(this._statesDir)) {
        _fs.mkdirSync(this._statesDir);
      }
      if (_fs.existsSync(this._stateFile)) {
        _fs.unlinkSync(this._stateFile);
      }
      _fs.writeFileSync(this._stateFile, JSON.stringify(state, null, 4));
      resolve();
    }));
  }
  load() {
    return new Promise((resolve) => __awaiter$b(this, void 0, void 0, function* () {
      const _fs = yield __vitePreload(() => import("./__vite-browser-external_fs-15d823eb.js").then((n) => n.a), true ? [] : void 0);
      yield this._init();
      let fileContent = "{}";
      if (_fs.existsSync(this._stateFile)) {
        fileContent = _fs.readFileSync(this._stateFile, "utf-8").toString();
      }
      resolve(JSON.parse(fileContent));
    }));
  }
}
var __awaiter$a = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SStore extends SClass {
  /**
   * @name            constructor
   * @type            Function
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
   */
  constructor(object = {}, settings) {
    super(__deepMerge({
      watchDeep: true,
      save: false,
      excludeFromSave: []
    }, settings !== null && settings !== void 0 ? settings : {}));
    this.isStore = true;
    if (this.settings.save && !this.settings.id) {
      throw new Error(`You MUST set an id for your state when using the "save" setting. Pass an "id" in the settings...`);
    }
    if (this.settings.save && !this.settings.adapter) {
      if (__isNode$2()) {
        this.settings.adapter = new SStateFsAdapter(this.settings.id);
      } else {
        this.settings.adapter = new SStoreLsAdapter(this.settings.id);
      }
    }
    Object.assign(this, object);
    const proxy = __deepProxy(this, (actionObj) => {
      switch (actionObj.action) {
        case "set":
          if (__isPlainObject(actionObj.value)) {
            this._enrichObj(actionObj.value);
          }
          this._eventEmitter.emit(`set.${actionObj.path}`, actionObj);
          break;
        case "delete":
          this._eventEmitter.emit(`delete.${actionObj.path}`, actionObj);
          break;
      }
      if (this.settings.save) {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          const stateToSave = data.toJson();
          this.settings.excludeFromSave.forEach((prop) => {
            delete stateToSave[prop];
          });
          this.settings.adapter.save(stateToSave);
        });
      }
    }, {
      deep: this.settings.watchDeep
    });
    this._eventEmitter = new SEventEmitter2();
    if (this.settings.save) {
      if (this.settings.adapter.async) {
        (() => __awaiter$a(this, void 0, void 0, function* () {
          const restoredState = yield this.settings.adapter.load();
          __deepAssign(this, restoredState);
        }))();
      } else {
        const restoredState = this.settings.adapter.load();
        __deepAssign(this, restoredState);
      }
    }
    if (this.mount) {
      proxy.mount = this.mount.bind(this);
      setTimeout(() => {
        proxy.mount();
      });
    }
    return proxy;
  }
  _enrichObj(obj) {
    if (obj.length === void 0) {
      Object.defineProperty(obj, "length", {
        enumerable: false,
        get() {
          return Object.keys(obj).length;
        }
      });
    }
    if (obj.toJson === void 0) {
      Object.defineProperty(obj, "toJson", {
        enumerable: false,
        get() {
          return () => JSON.parse(JSON.stringify(obj));
        }
      });
    }
  }
  $set(props, handler, settings) {
    const finalSettings = Object.assign({ group: false, until: void 0 }, settings !== null && settings !== void 0 ? settings : {});
    if (!Array.isArray(props)) {
      props = [props];
    }
    let finalHandler = handler, items = [], ended = false;
    if (finalSettings.group) {
      finalHandler = __debounce(0, (...args) => {
        if (ended) {
          return;
        }
        handler(...args);
        items = [];
      });
    }
    const eventHandler = (updateObj, event) => {
      if (finalSettings.group) {
        items.push(updateObj);
        finalHandler(items);
      } else {
        setTimeout(() => {
          if (ended) {
            return;
          }
          finalHandler(updateObj, event);
        });
      }
    };
    props.forEach((prop) => {
      this._eventEmitter.on(`set.${prop}`, eventHandler);
      if (finalSettings.until) {
        finalSettings.until.finally(() => {
          ended = true;
          this._eventEmitter.off(`set.${prop}`, eventHandler);
        });
      }
    });
  }
  $delete(props, handler, settings) {
    const finalSettings = Object.assign({ group: false, until: void 0 }, settings !== null && settings !== void 0 ? settings : {});
    if (!Array.isArray(props)) {
      props = [props];
    }
    let finalHandler = handler, items = [], ended = false;
    if (finalSettings.group) {
      finalHandler = __debounce(0, (...args) => {
        if (ended) {
          return;
        }
        handler(...args);
        items = [];
      });
    }
    const eventHandler = (updateObj, event) => {
      if (finalSettings.group) {
        items.push(updateObj);
        finalHandler(items);
      } else {
        setTimeout(() => {
          if (ended) {
            return;
          }
          finalHandler(updateObj, event);
        });
      }
    };
    props.forEach((prop) => {
      this._eventEmitter.on(`delete.${prop}`, eventHandler);
      if (finalSettings.until) {
        finalSettings.until.finally(() => {
          ended = true;
          this._eventEmitter.off(`set.${prop}`, eventHandler);
        });
      }
    });
  }
}
class SComponentUtilsDefaultPropsInterface extends SInterface {
  static get _definition() {
    return {
      id: {
        description: "Specify an id for your component",
        type: "String",
        physical: true
      },
      // status: {
      //     description:
      //         'Specify the status of the component. Can be "pending", "mounting" or "mounted"',
      //     type: 'String',
      //     values: ['pending', 'mounting', 'mounted'],
      //     default: 'pending',
      //     physical: true,
      // },
      mountWhen: {
        description: "Specify when your component will be mounted",
        type: "String",
        values: WhenTriggers,
        default: "direct"
      },
      activeWhen: {
        description: "Specify when your component is active and when it is not",
        type: "String[]",
        values: ["inViewport", "lod"],
        default: ["inViewport", "lod"]
      },
      lod: {
        description: "Specify the minimum lod (level of details) from when this component is active",
        type: "Number"
      },
      adoptStyle: {
        description: "Specify if your component adopt the style of the global DOM. This worts only if you are using a shadowRoot element",
        type: "Boolean",
        default: true
        // physical: true,
      },
      saveState: {
        description: "Specify if you want to save the state of your component",
        type: "Boolean",
        default: false
      },
      lnf: {
        description: "Specify the lnf (look-and-feel) of your component. This is used by the css to style your component",
        type: "String",
        default: "default",
        physical: true
      },
      bare: {
        description: 'Specify if you want your component with only the bare styling. It just add the "s-bare" class on the component itself',
        type: "Boolean",
        default: false
      },
      responsive: {
        description: 'Specify some responsive properties. A "media" property is required and has to be either a media query, or a media query name defined in the config.themeMedia.queries theme setting',
        type: "Object",
        default: {}
      },
      prefixEvent: {
        description: 'Specify if you want the emitted events to be prefixed by the name of the feature/component like "s-slider.change" or not',
        type: "Boolean",
        default: true
      },
      verbose: {
        description: "Specify if you want this component/feature to log informations about activity or not",
        type: "Boolean",
        default: false
      }
    };
  }
}
class SComponentUtilsSettingsInterface extends SInterface {
  static get _definition() {
    return {
      name: {
        type: "String",
        description: "The name of the component/feature that will be used to generate className, etc..."
      },
      interface: {
        description: "Specify an SInterface class to use as our properties definition",
        type: "SInterface"
      },
      props: {
        description: "Specify a properties object to use as our properties definition",
        type: "Object"
      },
      style: {
        description: "Specify a style string to use as style to inject for our component",
        type: "String"
      },
      defaultProps: {
        description: "Pass an object that act as the default properties value for our component",
        type: "Object"
      },
      useTagNameForClassName: {
        type: "Boolean",
        description: 'Specify if the method "className" will generate a class using the node tagName additionaly to the passed "name" setting',
        default: true
      }
    };
  }
}
var __awaiter$9 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var _a$2, _b$3, _c$3;
document._sDefaultProps = (_c$3 = (_b$3 = (_a$2 = window.top) === null || _a$2 === void 0 ? void 0 : _a$2.document) === null || _b$3 === void 0 ? void 0 : _b$3._sDefaultProps) !== null && _c$3 !== void 0 ? _c$3 : {};
class SComponentUtils extends SClass {
  get props() {
    var _a2, _b2;
    return (_b2 = (_a2 = this._props) !== null && _a2 !== void 0 ? _a2 : this.node.props) !== null && _b2 !== void 0 ? _b2 : SComponentUtilsDefaultPropsInterface.defaults();
  }
  /**
   * @name            name
   * @type            String
   *
   * Get the name of the node or feature that this component utils is
   * used by. Get from `settings.componentUtils.name` then throught the passed
   * node using his tagName property
   *
   * @since   2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  get name() {
    var _a2;
    return (_a2 = this.settings.name) !== null && _a2 !== void 0 ? _a2 : this.node.tagName.toLowerCase();
  }
  /**
   * @name            setDefaultProps
   * @type            Function
   * @static
   *
   * This static method allows you to set some default props for some particular
   * component(s). You can target components using simple css selectorl like "my-component#cool".
   * Once the component is instanciated, it will check if some defaults are specified and
   * extends them with the passed props.
   *
   * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
   * @param     {Any}         props         An object of props you want to set defaults for
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static setDefaultProps(selector, props) {
    selector = Array.isArray(selector) ? selector : [selector];
    selector.forEach((sel) => {
      var _a2;
      document._sDefaultProps[sel] = Object.assign(Object.assign({}, (_a2 = document._sDefaultProps[sel]) !== null && _a2 !== void 0 ? _a2 : {}), props);
    });
  }
  /**
   * @name            getDefaultProps
   * @type            Function
   * @static
   *
   * This static method allows you to get back some default props setted for a component/feature, etc...
   *
   * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
   * @return    {Any}                                 Some default props setted or an empty object
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static getDefaultProps(selector) {
    var _a2, _b2;
    return Object.assign(Object.assign({}, (_a2 = document._sDefaultProps["*"]) !== null && _a2 !== void 0 ? _a2 : {}), (_b2 = document._sDefaultProps[selector]) !== null && _b2 !== void 0 ? _b2 : {});
  }
  /**
   * @name        componentUtilsSettings
   * @type        ISComponentUtilsSettings
   * @get
   *
   * Access the component utils sertings
   *
   * @since           2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  get componentUtilsSettings() {
    return this.settings.componentUtils;
  }
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(node, settings) {
    super(__deepMerge(SComponentUtilsSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
    this.fastdom = __fastdom;
    this.state = "pending";
    this.DefaultPropsInterface = SComponentUtilsDefaultPropsInterface;
    this._isInViewport = false;
    this._mediaQueries = {};
    this.node = node;
    const whenInViewportPromise = __whenInViewport(this.node, {
      once: false
    });
    whenInViewportPromise.on("in", () => {
      this._isInViewport = true;
    }).on("out", () => {
      this._isInViewport = false;
    });
    if (this.props.bare) {
      this.node.classList.add("s-bare");
    }
    const styleStr = this.settings.style;
    this.injectStyle(styleStr !== null && styleStr !== void 0 ? styleStr : "");
  }
  /**
   * @name            setProps
   * @type            Function
   *
   * This method allows you to set the component props at componentUtils level
   * to be able to use them across methods.
   *
   * @param       {Any}           props           The props to be used
   *
   * @since          2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  setProps(props) {
    this._props = props;
  }
  /**
   * @name           props
   * @type            Any
   *
   * This property allows you to get back the current props object
   *
   * @return      {Any}           The current props object
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  initProps(props, settings) {
    let finalProps = {}, PropsInterface = this.PropsInterface(settings.interface);
    for (let [prop, definition] of Object.entries(PropsInterface.definition)) {
      const camelProp = __camelCase(prop), dashProp = __dashCase(prop), attrValue = this.node.getAttribute(dashProp);
      if (attrValue !== null) {
        let rawValue = this.node.getAttribute(dashProp), value = rawValue;
        if (rawValue === null || rawValue.trim() === "") {
          value = true;
        } else {
          value = value;
        }
        finalProps[camelProp] = value;
      } else if (props[camelProp] !== void 0) {
        finalProps[camelProp] = props[camelProp];
      } else {
        finalProps[camelProp] = definition.default;
      }
    }
    finalProps = PropsInterface.apply(finalProps);
    const _this = this;
    const _props = Object.assign({}, finalProps);
    for (let [prop, value] of Object.entries(finalProps)) {
      Object.defineProperty(finalProps, prop, {
        enumarable: true,
        get() {
          return _props[prop];
        },
        set(value2) {
          if (settings.reflectAttributes) {
            const propDef = PropsInterface.definition[prop];
            if (propDef === null || propDef === void 0 ? void 0 : propDef.physical) {
              __fastdom.mutate(() => {
                if (value2 === false || value2 === void 0 || value2 === null) {
                  _this.node.removeAttribute(__dashCase(prop));
                } else {
                  _this.node.setAttribute(__dashCase(prop), String(value2));
                }
              });
            }
          }
          _props[prop] = value2;
        }
      });
      finalProps[prop] = value;
    }
    return finalProps;
  }
  /**
   * Check if an STheme instance has been instanciated
   */
  _isThemeAvailable() {
    var _a2, _b2;
    return ((_b2 = (_a2 = document.env) === null || _a2 === void 0 ? void 0 : _a2.SUGAR) === null || _b2 === void 0 ? void 0 : _b2.theme) !== void 0;
  }
  /**
   * Check if an sFront instance has been instanciated
   */
  _isFrontAvailable() {
    var _a2, _b2;
    return ((_b2 = (_a2 = document.env) === null || _a2 === void 0 ? void 0 : _a2.SUGAR) === null || _b2 === void 0 ? void 0 : _b2.front) !== void 0;
  }
  /**
   * Check if an SFrontspec instance has been instanciated
   */
  _isFrontspecAvailable() {
    var _a2, _b2;
    return ((_b2 = (_a2 = document.env) === null || _a2 === void 0 ? void 0 : _a2.SUGAR) === null || _b2 === void 0 ? void 0 : _b2.frontspec) !== void 0;
  }
  // /**
  //  * Init the cssPartial feature
  //  */
  // handleCssPartial() {
  //     // css partial if needed
  //     if (this.props.cssPartial) {
  //         this.node.setAttribute('partial', this.props.cssPartial);
  //         this.node.setAttribute('s-css', true);
  //     }
  // }
  /**
   * This method handle the passed props object and apply some behaviors
   * like the responsive props, etc...
   *
   * This will also set the "props" property in the instance.
   */
  handleProps(props, settings) {
    const finalSettings = Object.assign({ reflectAttributes: true, responsive: true }, settings !== null && settings !== void 0 ? settings : {});
    props = this.initProps(Object.assign(Object.assign({}, SComponentUtils.getDefaultProps(this.name.toLowerCase())), props), finalSettings);
    if (finalSettings.responsive) {
      this.makePropsResponsive(props);
    }
    this._props = props;
    return props;
  }
  /**
   * This method to handle the state object passed in the settings.
   * It will check if the state need to be saved, restored, etc...
   */
  handleState(state, settings) {
    var _a2;
    const finalStateSettings = Object.assign(Object.assign({ id: this.node.id }, (_a2 = this.settings.state) !== null && _a2 !== void 0 ? _a2 : {}), settings !== null && settings !== void 0 ? settings : {});
    Object.defineProperty(state, "preventSave", {
      enumerable: false,
      get() {
        return () => {
        };
      }
    });
    if (finalStateSettings.save && !finalStateSettings.id) {
      console.log("HTMLElement", this.node);
      throw new Error(`To save the state of your component, the HTMLElement must have an id...`);
    }
    let _state;
    if (state.isSState) {
      _state = state;
    } else {
      _state = new SStore(Object.assign({}, state), {
        id: finalStateSettings.id,
        save: finalStateSettings.save,
        excludeFromSave: ["status"]
      });
    }
    return _state;
  }
  /**
   * Check if some <responsive> tags are defined in the component, or if a "responsive" prop exists
   * to adapt properties depending on the viewport size.
   */
  makePropsResponsive(props) {
    var _a2, _b2, _c2, _d2, _e2;
    if (!this._isFrontAvailable() || !((_d2 = (_c2 = (_b2 = (_a2 = document.env) === null || _a2 === void 0 ? void 0 : _a2.SUGAR) === null || _b2 === void 0 ? void 0 : _b2.frontspec) === null || _c2 === void 0 ? void 0 : _c2.get) === null || _d2 === void 0 ? void 0 : _d2.call(_c2, "media.queries"))) {
      if (!this.constructor._isResponsivePropsWarningLogged) {
        this.constructor._isResponsivePropsWarningLogged = true;
        console.warn(`<red>[SComponentUtils]</red> To use responsive props on components and features, you MUST call the SFront.init() method in your main entry file as well as make sure you have a proper frontspec.json file with the "media.queries" specs...`);
      }
      return;
    }
    props.responsive = __deepMerge({
      // original: Object.assign({}, props),
    }, (_e2 = props.responsive) !== null && _e2 !== void 0 ? _e2 : {});
    Object.defineProperty(props, "toResetResponsiveProps", {
      enumerable: false,
      writable: true,
      value: {}
    });
    const $responsives = Array.from(this.node.children).filter(($child) => $child.tagName === "RESPONSIVE");
    if ($responsives.length) {
      $responsives.forEach(($responsive) => {
        const attrs = $responsive.attributes, responsiveProps = {};
        let media;
        Object.keys(attrs).forEach((key) => {
          var _a3, _b3, _c3;
          let value;
          if (((_a3 = attrs[key]) === null || _a3 === void 0 ? void 0 : _a3.nodeValue) !== void 0) {
            if (attrs[key].nodeValue === "")
              value = true;
            else
              value = attrs[key].nodeValue;
          }
          if (!value)
            return;
          const propName = (_c3 = (_b3 = attrs[key]) === null || _b3 === void 0 ? void 0 : _b3.name) !== null && _c3 !== void 0 ? _c3 : key;
          if (propName === "media") {
            media = value;
          } else {
            responsiveProps[__camelCase(propName)] = value;
          }
        });
        if (media) {
          if (!props.responsive[media]) {
            props.responsive[media] = {};
          }
          props.responsive[media] = responsiveProps;
        }
      });
    }
    if (Object.keys(props.responsive).length === 1 && props.responsive.original) {
      return;
    }
    window.addEventListener("resize", __debounce(100, () => {
      this._applyResponsiveProps(props);
    }));
    this._applyResponsiveProps(props);
  }
  _applyResponsiveProps(props = {}) {
    var _a2;
    let matchedMedia = [];
    const responsiveObj = Object.assign({}, props.responsive);
    const mediaInstance = new SMedia2();
    for (let [media, responsiveProps] of Object.entries(props.responsive)) {
      let applyProps = function() {
        for (let [key, value] of Object.entries(responsiveProps)) {
          props.toResetResponsiveProps[key] = props[key];
          props[key] = value;
        }
      };
      const queries = SFrontspec.get(`media.queries`);
      media.replace(/(<|>|=|\|)/gm, "");
      if (media === "toResetResponsiveProps") {
        continue;
      }
      if (media.match(/[a-zA-Z0-9<>=]/) && queries[media]) {
        let mediaQuery = this._mediaQueries[media];
        if (!mediaQuery) {
          this._mediaQueries[media] = mediaInstance.buildQuery(media);
          mediaQuery = this._mediaQueries[media];
        }
        if (window.matchMedia(mediaQuery.replace(/^@media\s/, "")).matches) {
          applyProps();
          matchedMedia.push(media);
        }
      } else {
        if (window.matchMedia(media).matches) {
          applyProps();
          matchedMedia.push(media);
        }
      }
    }
    if (!matchedMedia.length) {
      for (let [key, value] of Object.entries((_a2 = props.toResetResponsiveProps) !== null && _a2 !== void 0 ? _a2 : {})) {
        props[key] = value;
        delete props.toResetResponsiveProps[key];
      }
    }
    props.responsive = responsiveObj;
  }
  /**
   * @name           waitAndExecute
   * @type            Function
   * @async
   *
   * This async method allows you to wait for the component (node) has reached
   * his "mount" state. This state depends fully on the "mountWhen" property.
   * When the state has been reached, the passed callback will be executed.
   *
   * @param       {String|String[]}            when            When you want to execute the callback. Can be "direct", "inViewport", "nearViewport", "outOfViewport", "interact", "visible" or "stylesheetReady"
   * @param       {Function}          callback            The callback to execute
   * @return          {Promise}           A promise fullfilled when the component (node) has reached his "mount" state
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  waitAndExecute(when, callback) {
    return new Promise((resolve, reject) => __awaiter$9(this, void 0, void 0, function* () {
      var _a2;
      if (this.node.tagName.toLowerCase() !== "s-carpenter") {
        if (((_a2 = document.env) === null || _a2 === void 0 ? void 0 : _a2.CARPENTER) && !__isInIframe()) {
          return;
        }
      }
      if (!Array.isArray(when)) {
        when = [when];
      }
      if (this.props.lod !== void 0) {
        yield __when(this.node, `lod:${this.props.lod}`);
      }
      if (!when.includes("direct") && !when.includes("directly")) {
        yield __when(this.node, when);
      } else {
        yield __wait$1();
      }
      callback === null || callback === void 0 ? void 0 : callback(this.node);
      resolve(this.node);
    }));
  }
  /**
   * @name           dispatchEvent
   * @type            Function
   * @async
   *
   * This method allows you to dispatch some CustomEvents from your component node itself.
   * 1. An event called "%componentName.%eventName"
   * 2. An event called "%componentName" with in the detail object a "eventType" property set to the event name
   * 3. An event called "%eventName" with in the detail object a "eventComponent" property set to the component name
   *
   * @param           {String}            eventName     The event name to dispatch
   * @param           {ISComponentUtilsDispatchSettings}          [settings={}]     The settings to use for the dispatch
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  dispatchEvent(eventName, settings) {
    var _a2;
    const finalSettings = Object.assign({ $elm: this.node, bubbles: true, cancelable: true, detail: {} }, settings !== null && settings !== void 0 ? settings : {});
    const componentName = this.name;
    if ((_a2 = this.props) === null || _a2 === void 0 ? void 0 : _a2.prefixEvent) {
      finalSettings.$elm.dispatchEvent(new CustomEvent(`${componentName}.${eventName}`, finalSettings));
    } else {
      finalSettings.$elm.dispatchEvent(new CustomEvent(eventName, Object.assign(Object.assign({}, finalSettings), { detail: Object.assign(Object.assign({}, finalSettings.detail), { eventComponent: componentName }) })));
    }
    finalSettings.$elm.dispatchEvent(new CustomEvent(componentName, Object.assign(Object.assign({}, finalSettings), { detail: Object.assign(Object.assign({}, finalSettings.detail), { eventType: eventName }) })));
  }
  /**
   * @name        adoptStyleInShadowRoot
   * @type        Function
   * @async
   *
   * This method allows you to make the passed shadowRoot element adopt
   * the style of the passed context who's by default the document itself
   *
   * @param       {HTMLShadowRootElement}         $shadowRoot             The shadow root you want to adopt the $context styles
   * @param      {HTMLElement}                   [$context=document]     The context from which you want to adopt the styles
   * @return      {Promise}                                               Return a promise fullfilled when the styles have been adopted
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  adoptStyleInShadowRoot($shadowRoot, $context) {
    return __adoptStyleInShadowRoot($shadowRoot, $context);
  }
  defaultProps(interf) {
    var _a2, _b2, _c2, _d2;
    if (this._defaultProps)
      return Object.assign({}, this._defaultProps);
    this._defaultProps = Object.assign({}, __deepMerge(
      // @ts-ignore
      SComponentUtilsDefaultPropsInterface.defaults(),
      (_a2 = this.settings.defaultProps) !== null && _a2 !== void 0 ? _a2 : {},
      (_b2 = this.constructor._defaultProps["*"]) !== null && _b2 !== void 0 ? _b2 : {},
      (_c2 = this.constructor._defaultProps[this.name]) !== null && _c2 !== void 0 ? _c2 : {},
      (_d2 = interf === null || interf === void 0 ? void 0 : interf.defaults()) !== null && _d2 !== void 0 ? _d2 : {}
    ));
    return this._defaultProps;
  }
  PropsInterface(interf) {
    var _a2, _b2;
    if (this._PropsInterface)
      return this._PropsInterface;
    class PropsInterface extends SInterface {
    }
    PropsInterface.definition = __deepMerge((_a2 = SComponentUtilsDefaultPropsInterface.definition) !== null && _a2 !== void 0 ? _a2 : {}, (_b2 = interf === null || interf === void 0 ? void 0 : interf.definition) !== null && _b2 !== void 0 ? _b2 : {});
    this._PropsInterface = PropsInterface;
    return this._PropsInterface;
  }
  injectStyle(css2, id = this.tagName) {
    if (this.constructor._injectedStyles.indexOf(id) !== -1)
      return;
    this.constructor._injectedStyles.push(id);
    __injectStyle(css2, {
      id
    });
  }
  /**
   * @name            exposeApi
   * @type            Function
   *
   * This method allows you to pass a simple key value object
   * that tells binding of some methods on the actual dom node.
   *
   * @param       {Any}           apiObj          The simple key value pairs api object
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  exposeApi(apiObj, ctx = this.node) {
    setTimeout(() => {
      let $on = this.node;
      Object.keys(apiObj).forEach((apiFnName) => {
        const apiFn = apiObj[apiFnName].bind(ctx);
        $on[apiFnName] = apiFn;
      });
    });
  }
  /**
   * @name          cls
   * @type          Function
   *
   * This method allows you to get a component ready class like my-component__something, etc...
   *
   * @param         {String}        cls         The class you want to process. Can be multiple classes separated by a space. If null, does not print any class at all but the "style" one
   * @return        {String}                    The generated class that you can apply
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  cls(cls = "", style = "") {
    let clsString = "";
    if (cls !== null) {
      clsString = cls.split(" ").map((clsName) => {
        let clses = [];
        if (this.settings.useTagNameForClassName) {
          clses.push(`${this.node.tagName.toLowerCase()}${clsName && !clsName.match(/^(_{1,2}|-)/) ? "-" : ""}${clsName}`);
        }
        if (this.settings.name && this.node.tagName.toLowerCase() !== this.settings.name) {
          clses.push(`${this.settings.name.toLowerCase()}${clsName && !clsName.match(/^(_{1,2}|-)/) ? "-" : ""}${clsName}`);
        }
        clses = clses.map((c) => c.replace("---", "--"));
        return clses.join(" ");
      }).join(" ");
    }
    if (style) {
      clsString += ` ${style}`;
    }
    return clsString;
  }
  /**
   * @name          uCls
   * @type          Function
   *
   * This method returns you only 1 class that is based on the passed "name" and not on the "tagName".
   *
   * @param         {String}        cls         The class you want to process. Can be multiple classes separated by a space
   * @return        {String}                    The generated class that you can apply
   *
   * @since         2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  uCls(cls = "", style = "") {
    let clsString = cls.split(" ").map((clsName) => {
      const clses = [];
      if (this.settings.name && this.node.tagName.toLowerCase() !== this.settings.name) {
        clses.push(`${this.settings.name.toLowerCase()}${clsName && !clsName.match(/^_{1,2}/) ? "-" : ""}${clsName}`);
      } else {
        clses.push(`${this.node.tagName.toLowerCase()}${clsName && !clsName.match(/^_{1,2}/) ? "-" : ""}${clsName}`);
      }
      return clses.join(" ");
    }).join("");
    return clsString;
  }
  /**
   * @name      isMounted
   * @type      Function
   *
   * This method returns true if the component is mounted, false if not
   *
   * @return    {Boolean}       true if is mounted, false if not
   *
   * @since   2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  isMounted() {
    var _a2;
    return (_a2 = this.node) === null || _a2 === void 0 ? void 0 : _a2.hasAttribute("mounted");
  }
  /**
   * @name            isInViewport
   * @type            Function
   *
   * true if the component is in the viewport, false if not
   *
   * @since   2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  isInViewport() {
    return this._isInViewport;
  }
  /**
   * @name            isActive
   * @type            Function
   *
   * true if the component is active or not. A component is active when
   *
   * @since   2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  isActive() {
    if (this.props.activeWhen.includes("lod") && this.props.lod !== void 0 && this._isFrontAvailable() && SFront.instance.lod.level < this.props.lod) {
      return false;
    }
    if (this.props.activeWhen.includes("inViewport") && !this._isInViewport) {
      return false;
    }
    return true;
  }
}
SComponentUtils.fastdom = __fastdom;
SComponentUtils._isResponsivePropsWarningLogged = false;
SComponentUtils._injectedStyles = [];
var __awaiter$8 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SFeature extends SClass {
  /**
   * @name            setDefaultProps
   * @type            Function
   * @static
   *
   * This static method allows you to set some default props for some particular
   * component(s). You can target components using simple css selectorl like "my-component#cool".
   * Once the component is instanciated, it will check if some defaults are specified and
   * extends them with the passed props.
   *
   * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
   * @param     {Any}         props         An object of props you want to set defaults for
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static setDefaultProps(selector, props) {
    SComponentUtils.setDefaultProps(selector, props);
  }
  /**
   * @name              define
   * @type            Function
   * @static
   *
   * This static method allows you to register a new feature
   * associated with an HTMLElement attribute like "s-activate", etc...
   *
   * @param           {String}        name           The attribute that trigger the feature
   * @param           {SFeature}       feature                The actual feature class to use
   * @param           {Any}           [defaultProps={}]       Some default props to set for this feature
   *
   * @since           2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static define(name2, featureCls, defaultProps = {}) {
    this.setDefaultProps(name2, defaultProps);
    __querySelectorLive(`[${name2}]`, ($elm) => {
      new featureCls(name2, $elm, SComponentUtils.getDefaultProps(name2));
    }, {
      // attributes: [name],
    });
  }
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(name2, node, settings) {
    var _a2, _b2, _c2, _d2;
    super(settings);
    if (this.settings.style) {
      __injectStyle(this.settings.style, {
        id: `s-feature-${name2}`
      });
    }
    this.utils = new SComponentUtils(node, Object.assign(Object.assign(Object.assign({}, (_a2 = this.settings) !== null && _a2 !== void 0 ? _a2 : {}), (_b2 = this.settings.componentUtils) !== null && _b2 !== void 0 ? _b2 : {}), { useTagNameForClassName: false, name: name2 }));
    this.name = name2;
    this.node = node;
    this.props = this.utils.handleProps({}, {
      interface: (_c2 = this.settings.interface) !== null && _c2 !== void 0 ? _c2 : (_d2 = this.settings.componentUtils) === null || _d2 === void 0 ? void 0 : _d2.interface
    });
    this.node.classList.add(...this.utils.cls("").split(" "));
    this.utils.waitAndExecute(
      this.props.mountWhen,
      // @ts-ignore
      () => __awaiter$8(this, void 0, void 0, function* () {
        var _e2;
        yield (_e2 = this.mount) === null || _e2 === void 0 ? void 0 : _e2.call(this);
        this.props.mounted = true;
      })
    );
  }
}
class SLazyFeatureInterface extends SInterface {
  static get _definition() {
    return {};
  }
}
const __css = "template[s-lazy] {\n    display: block;\n    height: calc(100 * var(--vh,1vh)) ;\n}\n";
var __awaiter$7 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SLazyFeature extends SFeature {
  constructor(name2, node, settings) {
    super(name2, node, __deepMerge({
      name: "s-lazy",
      interface: SLazyFeatureInterface,
      style: __css
    }, settings !== null && settings !== void 0 ? settings : {}));
  }
  mount() {
    var _a2, _b2;
    return __awaiter$7(this, void 0, void 0, function* () {
      let $content;
      if (this.node.tagName === "TEXTAREA") {
        const parser = new DOMParser();
        const html2 = this.node.value;
        const $dom = parser.parseFromString(html2, "text/html");
        $content = $dom.body.children[0];
        $dom.body.children[0];
      } else {
        $content = this.node.content;
        $content.children[0];
      }
      if (this.node.id) {
        (_b2 = (_a2 = $content.children[0]) === null || _a2 === void 0 ? void 0 : _a2.setAttribute) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, "id", this.node.id);
      }
      this.node.parentNode.insertBefore($content, this.node);
      this.node.remove();
    });
  }
}
function define$6(props = {}, name2 = "s-lazy") {
  SLazyFeature.define(name2, SLazyFeature, Object.assign({}, props));
}
var __awaiter$6 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function define$5(props, name2 = "s-refocus", settings = {}) {
  var _a2;
  __querySelectorLive(`[${name2}]`, ($elm) => __awaiter$6(this, void 0, void 0, function* () {
    const define2 = yield __vitePreload(() => import("./define-58057df5.js"), true ? [] : void 0);
    define2.default(props, name2);
  }), {
    when: (_a2 = settings.when) !== null && _a2 !== void 0 ? _a2 : "nearViewport",
    firstOnly: true
  });
}
var __awaiter$5 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function define$4(props, tagName = "s-scroll", settings = {}) {
  var _a2;
  __querySelectorLive(tagName, ($elm) => __awaiter$5(this, void 0, void 0, function* () {
    const define2 = yield __vitePreload(() => import("./define-81615dfc.js"), true ? [] : void 0);
    define2.default(props, tagName, settings);
  }), {
    when: (_a2 = settings.when) !== null && _a2 !== void 0 ? _a2 : "nearViewport",
    firstOnly: true
  });
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function define$3(props, name2 = "s-sugar", settings = {}) {
  var _a2;
  __querySelectorLive(`[${name2}]`, ($elm) => __awaiter$4(this, void 0, void 0, function* () {
    const define2 = yield __vitePreload(() => import("./define-2534676d.js"), true ? [] : void 0);
    define2.default(props, name2);
  }), {
    when: (_a2 = settings.when) !== null && _a2 !== void 0 ? _a2 : "nearViewport",
    firstOnly: true
  });
}
function SPackEssentials() {
  define$b();
  define$4();
  define$3();
  define$6();
  define$a();
  define$d();
  define$c();
  define$9();
  define$8();
  define$7();
  define$5({
    trigger: ["event:actual", "anchor", "history"],
    offsetY: 200
  });
}
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function define$2(props, tagName = "s-spaces-selector", settings = {}) {
  var _a2;
  __querySelectorLive(tagName, ($elm) => __awaiter$3(this, void 0, void 0, function* () {
    const define2 = yield __vitePreload(() => import("./define-06742f2b.js"), true ? [] : void 0);
    define2.default(props, tagName, settings);
  }), {
    when: (_a2 = settings.when) !== null && _a2 !== void 0 ? _a2 : "nearViewport",
    firstOnly: true
  });
}
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function define$1(props, tagName = "s-google-map", settings = {}) {
  var _a2;
  __querySelectorLive(tagName, ($elm) => __awaiter$2(this, void 0, void 0, function* () {
    const define2 = yield __vitePreload(() => import("./define-391cc33d.js"), true ? [] : void 0);
    define2.default(props, tagName, settings);
  }), {
    when: (_a2 = settings.when) !== null && _a2 !== void 0 ? _a2 : "nearViewport",
    firstOnly: true
  });
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const NODE_MODE = false;
const global$3 = window;
const supportsAdoptingStyleSheets = global$3.ShadowRoot && (global$3.ShadyCSS === void 0 || global$3.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
const constructionToken = Symbol();
const cssTagCache = /* @__PURE__ */ new WeakMap();
class CSSResult {
  constructor(cssText, strings, safeToken) {
    this["_$cssResult$"] = true;
    if (safeToken !== constructionToken) {
      throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    }
    this.cssText = cssText;
    this._strings = strings;
  }
  // This is a getter so that it's lazy. In practice, this means stylesheets
  // are not created until the first element instance is made.
  get styleSheet() {
    let styleSheet = this._styleSheet;
    const strings = this._strings;
    if (supportsAdoptingStyleSheets && styleSheet === void 0) {
      const cacheable = strings !== void 0 && strings.length === 1;
      if (cacheable) {
        styleSheet = cssTagCache.get(strings);
      }
      if (styleSheet === void 0) {
        (this._styleSheet = styleSheet = new CSSStyleSheet()).replaceSync(this.cssText);
        if (cacheable) {
          cssTagCache.set(strings, styleSheet);
        }
      }
    }
    return styleSheet;
  }
  toString() {
    return this.cssText;
  }
}
const textFromCSSResult = (value) => {
  if (value["_$cssResult$"] === true) {
    return value.cssText;
  } else if (typeof value === "number") {
    return value;
  } else {
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`);
  }
};
const unsafeCSS = (value) => new CSSResult(typeof value === "string" ? value : String(value), void 0, constructionToken);
const css = (strings, ...values) => {
  const cssText = strings.length === 1 ? strings[0] : values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
  return new CSSResult(cssText, strings, constructionToken);
};
const adoptStyles = (renderRoot, styles2) => {
  if (supportsAdoptingStyleSheets) {
    renderRoot.adoptedStyleSheets = styles2.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  } else {
    styles2.forEach((s) => {
      const style = document.createElement("style");
      const nonce = global$3["litNonce"];
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
const getCompatibleStyle = supportsAdoptingStyleSheets || NODE_MODE ? (s) => s : (s) => s instanceof CSSStyleSheet ? cssResultFromStyleSheet(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _b$2, _c$2, _d$1;
var _e;
const global$2 = window;
let requestUpdateThenable;
let issueWarning$2;
const trustedTypes$1 = global$2.trustedTypes;
const emptyStringForBooleanAttribute$1 = trustedTypes$1 ? trustedTypes$1.emptyScript : "";
const polyfillSupport$2 = global$2.reactiveElementPolyfillSupportDevMode;
{
  const issuedWarnings = (_b$2 = global$2.litIssuedWarnings) !== null && _b$2 !== void 0 ? _b$2 : global$2.litIssuedWarnings = /* @__PURE__ */ new Set();
  issueWarning$2 = (code, warning) => {
    warning += ` See https://lit.dev/msg/${code} for more information.`;
    if (!issuedWarnings.has(warning)) {
      console.warn(warning);
      issuedWarnings.add(warning);
    }
  };
  issueWarning$2("dev-mode", `Lit is in dev mode. Not recommended for production!`);
  if (((_c$2 = global$2.ShadyDOM) === null || _c$2 === void 0 ? void 0 : _c$2.inUse) && polyfillSupport$2 === void 0) {
    issueWarning$2("polyfill-support-missing", `Shadow DOM is being polyfilled via \`ShadyDOM\` but the \`polyfill-support\` module has not been loaded.`);
  }
  requestUpdateThenable = (name2) => ({
    then: (onfulfilled, _onrejected) => {
      issueWarning$2("request-update-promise", `The \`requestUpdate\` method should no longer return a Promise but does so on \`${name2}\`. Use \`updateComplete\` instead.`);
      if (onfulfilled !== void 0) {
        onfulfilled(false);
      }
    }
  });
}
const debugLogEvent$1 = (event) => {
  const shouldEmit = global$2.emitLitDebugLogEvents;
  if (!shouldEmit) {
    return;
  }
  global$2.dispatchEvent(new CustomEvent("lit-debug", {
    detail: event
  }));
};
const JSCompiler_renameProperty = (prop, _obj) => prop;
const defaultConverter = {
  toAttribute(value, type) {
    switch (type) {
      case Boolean:
        value = value ? emptyStringForBooleanAttribute$1 : null;
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
    this.__instanceProperties = /* @__PURE__ */ new Map();
    this.isUpdatePending = false;
    this.hasUpdated = false;
    this.__reflectingProperty = null;
    this._initialize();
  }
  /**
   * Adds an initializer function to the class that is called during instance
   * construction.
   *
   * This is useful for code that runs against a `ReactiveElement`
   * subclass, such as a decorator, that needs to do work for each
   * instance, such as setting up a `ReactiveController`.
   *
   * ```ts
   * const myDecorator = (target: typeof ReactiveElement, key: string) => {
   *   target.addInitializer((instance: ReactiveElement) => {
   *     // This is run during construction of the element
   *     new MyController(instance);
   *   });
   * }
   * ```
   *
   * Decorating a field will then cause each instance to run an initializer
   * that adds a controller:
   *
   * ```ts
   * class MyElement extends LitElement {
   *   @myDecorator foo;
   * }
   * ```
   *
   * Initializers are stored per-constructor. Adding an initializer to a
   * subclass does not add it to a superclass. Since initializers are run in
   * constructors, initializers will run in order of the class hierarchy,
   * starting with superclasses and progressing to the instance's class.
   *
   * @nocollapse
   */
  static addInitializer(initializer) {
    var _a2;
    this.finalize();
    ((_a2 = this._initializers) !== null && _a2 !== void 0 ? _a2 : this._initializers = []).push(initializer);
  }
  /**
   * Returns a list of attributes corresponding to the registered properties.
   * @nocollapse
   * @category attributes
   */
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
  /**
   * Creates a property accessor on the element prototype if one does not exist
   * and stores a {@linkcode PropertyDeclaration} for the property with the
   * given options. The property setter calls the property's `hasChanged`
   * property option or uses a strict identity check to determine whether or not
   * to request an update.
   *
   * This method may be overridden to customize properties; however,
   * when doing so, it's important to call `super.createProperty` to ensure
   * the property is setup correctly. This method calls
   * `getPropertyDescriptor` internally to get a descriptor to install.
   * To customize what properties do when they are get or set, override
   * `getPropertyDescriptor`. To customize the options for a property,
   * implement `createProperty` like this:
   *
   * ```ts
   * static createProperty(name, options) {
   *   options = Object.assign(options, {myOption: true});
   *   super.createProperty(name, options);
   * }
   * ```
   *
   * @nocollapse
   * @category properties
   */
  static createProperty(name2, options = defaultPropertyDeclaration) {
    var _a2;
    if (options.state) {
      options.attribute = false;
    }
    this.finalize();
    this.elementProperties.set(name2, options);
    if (!options.noAccessor && !this.prototype.hasOwnProperty(name2)) {
      const key = typeof name2 === "symbol" ? Symbol() : `__${name2}`;
      const descriptor2 = this.getPropertyDescriptor(name2, key, options);
      if (descriptor2 !== void 0) {
        Object.defineProperty(this.prototype, name2, descriptor2);
        {
          if (!this.hasOwnProperty("__reactivePropertyKeys")) {
            this.__reactivePropertyKeys = new Set((_a2 = this.__reactivePropertyKeys) !== null && _a2 !== void 0 ? _a2 : []);
          }
          this.__reactivePropertyKeys.add(name2);
        }
      }
    }
  }
  /**
   * Returns a property descriptor to be defined on the given named property.
   * If no descriptor is returned, the property will not become an accessor.
   * For example,
   *
   * ```ts
   * class MyElement extends LitElement {
   *   static getPropertyDescriptor(name, key, options) {
   *     const defaultDescriptor =
   *         super.getPropertyDescriptor(name, key, options);
   *     const setter = defaultDescriptor.set;
   *     return {
   *       get: defaultDescriptor.get,
   *       set(value) {
   *         setter.call(this, value);
   *         // custom action.
   *       },
   *       configurable: true,
   *       enumerable: true
   *     }
   *   }
   * }
   * ```
   *
   * @nocollapse
   * @category properties
   */
  static getPropertyDescriptor(name2, key, options) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      get() {
        return this[key];
      },
      set(value) {
        const oldValue = this[name2];
        this[key] = value;
        this.requestUpdate(name2, oldValue, options);
      },
      configurable: true,
      enumerable: true
    };
  }
  /**
   * Returns the property options associated with the given property.
   * These options are defined with a `PropertyDeclaration` via the `properties`
   * object or the `@property` decorator and are registered in
   * `createProperty(...)`.
   *
   * Note, this method should be considered "final" and not overridden. To
   * customize the options for a given property, override
   * {@linkcode createProperty}.
   *
   * @nocollapse
   * @final
   * @category properties
   */
  static getPropertyOptions(name2) {
    return this.elementProperties.get(name2) || defaultPropertyDeclaration;
  }
  /**
   * Creates property accessors for registered properties, sets up element
   * styling, and ensures any superclasses are also finalized. Returns true if
   * the element was finalized.
   * @nocollapse
   */
  static finalize() {
    if (this.hasOwnProperty(finalized)) {
      return false;
    }
    this[finalized] = true;
    const superCtor = Object.getPrototypeOf(this);
    superCtor.finalize();
    if (superCtor._initializers !== void 0) {
      this._initializers = [...superCtor._initializers];
    }
    this.elementProperties = new Map(superCtor.elementProperties);
    this.__attributeToPropertyMap = /* @__PURE__ */ new Map();
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
      const warnRemovedOrRenamed = (name2, renamed = false) => {
        if (this.prototype.hasOwnProperty(name2)) {
          issueWarning$2(renamed ? "renamed-api" : "removed-api", `\`${name2}\` is implemented on class ${this.name}. It has been ${renamed ? "renamed" : "removed"} in this version of LitElement.`);
        }
      };
      warnRemovedOrRenamed("initialize");
      warnRemovedOrRenamed("requestUpdateInternal");
      warnRemovedOrRenamed("_getUpdateComplete", true);
    }
    return true;
  }
  /**
   * Takes the styles the user supplied via the `static styles` property and
   * returns the array of styles to apply to the element.
   * Override this method to integrate into a style management system.
   *
   * Styles are deduplicated preserving the _last_ instance in the list. This
   * is a performance optimization to avoid duplicated styles that can occur
   * especially when composing via subclassing. The last item is kept to try
   * to preserve the cascade order with the assumption that it's most important
   * that last added styles override previous styles.
   *
   * @nocollapse
   * @category styles
   */
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
  /**
   * Returns the property name for the given attribute `name`.
   * @nocollapse
   */
  static __attributeNameForProperty(name2, options) {
    const attribute = options.attribute;
    return attribute === false ? void 0 : typeof attribute === "string" ? attribute : typeof name2 === "string" ? name2.toLowerCase() : void 0;
  }
  /**
   * Internal only override point for customizing work done when elements
   * are constructed.
   *
   * @internal
   */
  _initialize() {
    var _a2;
    this.__updatePromise = new Promise((res) => this.enableUpdating = res);
    this._$changedProperties = /* @__PURE__ */ new Map();
    this.__saveInstanceProperties();
    this.requestUpdate();
    (_a2 = this.constructor._initializers) === null || _a2 === void 0 ? void 0 : _a2.forEach((i) => i(this));
  }
  /**
   * Registers a `ReactiveController` to participate in the element's reactive
   * update cycle. The element automatically calls into any registered
   * controllers during its lifecycle callbacks.
   *
   * If the element is connected when `addController()` is called, the
   * controller's `hostConnected()` callback will be immediately called.
   * @category controllers
   */
  addController(controller) {
    var _a2, _b2;
    ((_a2 = this.__controllers) !== null && _a2 !== void 0 ? _a2 : this.__controllers = []).push(controller);
    if (this.renderRoot !== void 0 && this.isConnected) {
      (_b2 = controller.hostConnected) === null || _b2 === void 0 ? void 0 : _b2.call(controller);
    }
  }
  /**
   * Removes a `ReactiveController` from the element.
   * @category controllers
   */
  removeController(controller) {
    var _a2;
    (_a2 = this.__controllers) === null || _a2 === void 0 ? void 0 : _a2.splice(this.__controllers.indexOf(controller) >>> 0, 1);
  }
  /**
   * Fixes any properties set on the instance before upgrade time.
   * Otherwise these would shadow the accessor and break these properties.
   * The properties are stored in a Map which is played back after the
   * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
   * (<=41), properties created for native platform properties like (`id` or
   * `name`) may not have default values set in the element constructor. On
   * these browsers native properties appear on instances and therefore their
   * default value will overwrite any element default (e.g. if the element sets
   * this.id = 'id' in the constructor, the 'id' will become '' since this is
   * the native platform default).
   */
  __saveInstanceProperties() {
    this.constructor.elementProperties.forEach((_v, p) => {
      if (this.hasOwnProperty(p)) {
        this.__instanceProperties.set(p, this[p]);
        delete this[p];
      }
    });
  }
  /**
   * Returns the node into which the element should render and by default
   * creates and returns an open shadowRoot. Implement to customize where the
   * element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   *
   * @return Returns a node into which to render.
   * @category rendering
   */
  createRenderRoot() {
    var _a2;
    const renderRoot = (_a2 = this.shadowRoot) !== null && _a2 !== void 0 ? _a2 : this.attachShadow(this.constructor.shadowRootOptions);
    adoptStyles(renderRoot, this.constructor.elementStyles);
    return renderRoot;
  }
  /**
   * On first connection, creates the element's renderRoot, sets up
   * element styling, and enables updating.
   * @category lifecycle
   */
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
  /**
   * Note, this method should be considered final and not overridden. It is
   * overridden on the element instance with a function that triggers the first
   * update.
   * @category updates
   */
  enableUpdating(_requestedUpdate) {
  }
  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   * @category lifecycle
   */
  disconnectedCallback() {
    var _a2;
    (_a2 = this.__controllers) === null || _a2 === void 0 ? void 0 : _a2.forEach((c) => {
      var _a3;
      return (_a3 = c.hostDisconnected) === null || _a3 === void 0 ? void 0 : _a3.call(c);
    });
  }
  /**
   * Synchronizes property values when attributes change.
   *
   * Specifically, when an attribute is set, the corresponding property is set.
   * You should rarely need to implement this callback. If this method is
   * overridden, `super.attributeChangedCallback(name, _old, value)` must be
   * called.
   *
   * See [using the lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks)
   * on MDN for more information about the `attributeChangedCallback`.
   * @category attributes
   */
  attributeChangedCallback(name2, _old, value) {
    this._$attributeToProperty(name2, value);
  }
  __propertyToAttribute(name2, value, options = defaultPropertyDeclaration) {
    var _a2;
    const attr = this.constructor.__attributeNameForProperty(name2, options);
    if (attr !== void 0 && options.reflect === true) {
      const converter = ((_a2 = options.converter) === null || _a2 === void 0 ? void 0 : _a2.toAttribute) !== void 0 ? options.converter : defaultConverter;
      const attrValue = converter.toAttribute(value, options.type);
      if (this.constructor.enabledWarnings.indexOf("migration") >= 0 && attrValue === void 0) {
        issueWarning$2("undefined-attribute-value", `The attribute value for the ${name2} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`);
      }
      this.__reflectingProperty = name2;
      if (attrValue == null) {
        this.removeAttribute(attr);
      } else {
        this.setAttribute(attr, attrValue);
      }
      this.__reflectingProperty = null;
    }
  }
  /** @internal */
  _$attributeToProperty(name2, value) {
    var _a2;
    const ctor = this.constructor;
    const propName = ctor.__attributeToPropertyMap.get(name2);
    if (propName !== void 0 && this.__reflectingProperty !== propName) {
      const options = ctor.getPropertyOptions(propName);
      const converter = typeof options.converter === "function" ? { fromAttribute: options.converter } : ((_a2 = options.converter) === null || _a2 === void 0 ? void 0 : _a2.fromAttribute) !== void 0 ? options.converter : defaultConverter;
      this.__reflectingProperty = propName;
      this[propName] = converter.fromAttribute(
        value,
        options.type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      );
      this.__reflectingProperty = null;
    }
  }
  /**
   * Requests an update which is processed asynchronously. This should be called
   * when an element should update based on some state not triggered by setting
   * a reactive property. In this case, pass no arguments. It should also be
   * called when manually implementing a property setter. In this case, pass the
   * property `name` and `oldValue` to ensure that any configured property
   * options are honored.
   *
   * @param name name of requesting property
   * @param oldValue old value of requesting property
   * @param options property options to use instead of the previously
   *     configured options
   * @category updates
   */
  requestUpdate(name2, oldValue, options) {
    let shouldRequestUpdate = true;
    if (name2 !== void 0) {
      options = options || this.constructor.getPropertyOptions(name2);
      const hasChanged = options.hasChanged || notEqual;
      if (hasChanged(this[name2], oldValue)) {
        if (!this._$changedProperties.has(name2)) {
          this._$changedProperties.set(name2, oldValue);
        }
        if (options.reflect === true && this.__reflectingProperty !== name2) {
          if (this.__reflectingProperties === void 0) {
            this.__reflectingProperties = /* @__PURE__ */ new Map();
          }
          this.__reflectingProperties.set(name2, options);
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
  /**
   * Sets up the element to asynchronously update.
   */
  async __enqueueUpdate() {
    this.isUpdatePending = true;
    try {
      await this.__updatePromise;
    } catch (e) {
      Promise.reject(e);
    }
    const result2 = this.scheduleUpdate();
    if (result2 != null) {
      await result2;
    }
    return !this.isUpdatePending;
  }
  /**
   * Schedules an element update. You can override this method to change the
   * timing of updates by returning a Promise. The update will await the
   * returned Promise, and you should resolve the Promise to allow the update
   * to proceed. If this method is overridden, `super.scheduleUpdate()`
   * must be called.
   *
   * For instance, to schedule updates to occur just before the next frame:
   *
   * ```ts
   * override protected async scheduleUpdate(): Promise<unknown> {
   *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
   *   super.scheduleUpdate();
   * }
   * ```
   * @category updates
   */
  scheduleUpdate() {
    return this.performUpdate();
  }
  /**
   * Performs an element update. Note, if an exception is thrown during the
   * update, `firstUpdated` and `updated` will not be called.
   *
   * Call `performUpdate()` to immediately process a pending update. This should
   * generally not be needed, but it can be done in rare cases when you need to
   * update synchronously.
   *
   * Note: To ensure `performUpdate()` synchronously completes a pending update,
   * it should not be overridden. In LitElement 2.x it was suggested to override
   * `performUpdate()` to also customizing update scheduling. Instead, you should now
   * override `scheduleUpdate()`. For backwards compatibility with LitElement 2.x,
   * scheduling updates via `performUpdate()` continues to work, but will make
   * also calling `performUpdate()` to synchronously process updates difficult.
   *
   * @category updates
   */
  performUpdate() {
    var _a2, _b2;
    if (!this.isUpdatePending) {
      return;
    }
    debugLogEvent$1 === null || debugLogEvent$1 === void 0 ? void 0 : debugLogEvent$1({ kind: "update" });
    if (!this.hasUpdated) {
      {
        const shadowedProperties = [];
        (_a2 = this.constructor.__reactivePropertyKeys) === null || _a2 === void 0 ? void 0 : _a2.forEach((p) => {
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
        (_b2 = this.__controllers) === null || _b2 === void 0 ? void 0 : _b2.forEach((c) => {
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
  /**
   * Invoked before `update()` to compute values needed during the update.
   *
   * Implement `willUpdate` to compute property values that depend on other
   * properties and are used in the rest of the update process.
   *
   * ```ts
   * willUpdate(changedProperties) {
   *   // only need to check changed properties for an expensive computation.
   *   if (changedProperties.has('firstName') || changedProperties.has('lastName')) {
   *     this.sha = computeSHA(`${this.firstName} ${this.lastName}`);
   *   }
   * }
   *
   * render() {
   *   return html`SHA: ${this.sha}`;
   * }
   * ```
   *
   * @category updates
   */
  willUpdate(_changedProperties) {
  }
  // Note, this is an override point for polyfill-support.
  // @internal
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
    this._$changedProperties = /* @__PURE__ */ new Map();
    this.isUpdatePending = false;
  }
  /**
   * Returns a Promise that resolves when the element has completed updating.
   * The Promise value is a boolean that is `true` if the element completed the
   * update without triggering another update. The Promise result is `false` if
   * a property was set inside `updated()`. If the Promise is rejected, an
   * exception was thrown during the update.
   *
   * To await additional asynchronous work, override the `getUpdateComplete`
   * method. For example, it is sometimes useful to await a rendered element
   * before fulfilling this Promise. To do this, first await
   * `super.getUpdateComplete()`, then any subsequent state.
   *
   * @return A promise of a boolean that resolves to true if the update completed
   *     without triggering another update.
   * @category updates
   */
  get updateComplete() {
    return this.getUpdateComplete();
  }
  /**
   * Override point for the `updateComplete` promise.
   *
   * It is not safe to override the `updateComplete` getter directly due to a
   * limitation in TypeScript which means it is not possible to call a
   * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
   * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
   * This method should be overridden instead. For example:
   *
   * ```ts
   * class MyElement extends LitElement {
   *   override async getUpdateComplete() {
   *     const result = await super.getUpdateComplete();
   *     await this._myChild.updateComplete;
   *     return result;
   *   }
   * }
   * ```
   *
   * @return A promise of a boolean that resolves to true if the update completed
   *     without triggering another update.
   * @category updates
   */
  getUpdateComplete() {
    return this.__updatePromise;
  }
  /**
   * Controls whether or not `update()` should be called when the element requests
   * an update. By default, this method always returns `true`, but this can be
   * customized to control when to update.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  shouldUpdate(_changedProperties) {
    return true;
  }
  /**
   * Updates the element. This method reflects property values to attributes.
   * It can be overridden to render and keep updated element DOM.
   * Setting properties inside this method will *not* trigger
   * another update.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  update(_changedProperties) {
    if (this.__reflectingProperties !== void 0) {
      this.__reflectingProperties.forEach((v, k) => this.__propertyToAttribute(k, this[k], v));
      this.__reflectingProperties = void 0;
    }
    this.__markUpdated();
  }
  /**
   * Invoked whenever the element is updated. Implement to perform
   * post-updating tasks via DOM APIs, for example, focusing an element.
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  updated(_changedProperties) {
  }
  /**
   * Invoked when the element is first updated. Implement to perform one time
   * work on the element after update.
   *
   * ```ts
   * firstUpdated() {
   *   this.renderRoot.getElementById('my-text-area').focus();
   * }
   * ```
   *
   * Setting properties inside this method will trigger the element to update
   * again after this update cycle completes.
   *
   * @param _changedProperties Map of changed properties with old values
   * @category updates
   */
  firstUpdated(_changedProperties) {
  }
}
_e = finalized;
ReactiveElement[_e] = true;
ReactiveElement.elementProperties = /* @__PURE__ */ new Map();
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
    const i = this.enabledWarnings.indexOf(warning);
    if (i >= 0) {
      this.enabledWarnings.splice(i, 1);
    }
  };
}
((_d$1 = global$2.reactiveElementVersions) !== null && _d$1 !== void 0 ? _d$1 : global$2.reactiveElementVersions = []).push("1.6.2");
if (global$2.reactiveElementVersions.length > 1) {
  issueWarning$2("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a$1, _b$1, _c$1, _d;
const global$1 = window;
const debugLogEvent = (event) => {
  const shouldEmit = global$1.emitLitDebugLogEvents;
  if (!shouldEmit) {
    return;
  }
  global$1.dispatchEvent(new CustomEvent("lit-debug", {
    detail: event
  }));
};
let debugLogRenderId = 0;
let issueWarning$1;
{
  (_a$1 = global$1.litIssuedWarnings) !== null && _a$1 !== void 0 ? _a$1 : global$1.litIssuedWarnings = /* @__PURE__ */ new Set();
  issueWarning$1 = (code, warning) => {
    warning += code ? ` See https://lit.dev/msg/${code} for more information.` : "";
    if (!global$1.litIssuedWarnings.has(warning)) {
      console.warn(warning);
      global$1.litIssuedWarnings.add(warning);
    }
  };
  issueWarning$1("dev-mode", `Lit is in dev mode. Not recommended for production!`);
}
const wrap = ((_b$1 = global$1.ShadyDOM) === null || _b$1 === void 0 ? void 0 : _b$1.inUse) && ((_c$1 = global$1.ShadyDOM) === null || _c$1 === void 0 ? void 0 : _c$1.noPatch) === true ? global$1.ShadyDOM.wrap : (node) => node;
const trustedTypes = global$1.trustedTypes;
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
const createSanitizer = (node, name2, type) => {
  return sanitizerFactoryInternal(node, name2, type);
};
const boundAttributeSuffix = "$lit$";
const marker = `lit$${String(Math.random()).slice(9)}$`;
const markerMatch = "?" + marker;
const nodeMarker = `<${markerMatch}>`;
const d = document;
const createMarker = () => d.createComment("");
const isPrimitive = (value) => value === null || typeof value != "object" && typeof value != "function";
const isArray = Array.isArray;
const isIterable = (value) => isArray(value) || // eslint-disable-next-line @typescript-eslint/no-explicit-any
typeof (value === null || value === void 0 ? void 0 : value[Symbol.iterator]) === "function";
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
const rawTextElement = /^(?:script|style|textarea|title)$/i;
const HTML_RESULT = 1;
const SVG_RESULT = 2;
const ATTRIBUTE_PART = 1;
const CHILD_PART = 2;
const PROPERTY_PART = 3;
const BOOLEAN_ATTRIBUTE_PART = 4;
const EVENT_PART = 5;
const ELEMENT_PART = 6;
const COMMENT_PART = 7;
const tag = (type) => (strings, ...values) => {
  if (strings.some((s) => s === void 0)) {
    console.warn("Some template strings are undefined.\nThis is probably caused by illegal octal escape sequences.");
  }
  return {
    // This property needs to remain unminified.
    ["_$litType$"]: type,
    strings,
    values
  };
};
const html = tag(HTML_RESULT);
const noChange = Symbol.for("lit-noChange");
const nothing = Symbol.for("lit-nothing");
const templateCache = /* @__PURE__ */ new WeakMap();
const walker = d.createTreeWalker(d, 129, null, false);
let sanitizerFactoryInternal = noopSanitizer;
function trustFromTemplateString(tsa, stringFromTSA) {
  if (!Array.isArray(tsa) || !tsa.hasOwnProperty("raw")) {
    let message = "invalid template strings array";
    {
      message = `
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.
          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g, "\n");
    }
    throw new Error(message);
  }
  return policy !== void 0 ? policy.createHTML(stringFromTSA) : stringFromTSA;
}
const getTemplateHtml = (strings, type) => {
  const l = strings.length - 1;
  const attrNames = [];
  let html2 = type === SVG_RESULT ? "<svg>" : "";
  let rawTextEndRegex;
  let regex2 = textEndRegex;
  for (let i = 0; i < l; i++) {
    const s = strings[i];
    let attrNameEndIndex = -1;
    let attrName;
    let lastIndex = 0;
    let match2;
    while (lastIndex < s.length) {
      regex2.lastIndex = lastIndex;
      match2 = regex2.exec(s);
      if (match2 === null) {
        break;
      }
      lastIndex = regex2.lastIndex;
      if (regex2 === textEndRegex) {
        if (match2[COMMENT_START] === "!--") {
          regex2 = commentEndRegex;
        } else if (match2[COMMENT_START] !== void 0) {
          regex2 = comment2EndRegex;
        } else if (match2[TAG_NAME] !== void 0) {
          if (rawTextElement.test(match2[TAG_NAME])) {
            rawTextEndRegex = new RegExp(`</${match2[TAG_NAME]}`, "g");
          }
          regex2 = tagEndRegex;
        } else if (match2[DYNAMIC_TAG_NAME] !== void 0) {
          {
            throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions");
          }
        }
      } else if (regex2 === tagEndRegex) {
        if (match2[ENTIRE_MATCH] === ">") {
          regex2 = rawTextEndRegex !== null && rawTextEndRegex !== void 0 ? rawTextEndRegex : textEndRegex;
          attrNameEndIndex = -1;
        } else if (match2[ATTRIBUTE_NAME] === void 0) {
          attrNameEndIndex = -2;
        } else {
          attrNameEndIndex = regex2.lastIndex - match2[SPACES_AND_EQUALS].length;
          attrName = match2[ATTRIBUTE_NAME];
          regex2 = match2[QUOTE_CHAR] === void 0 ? tagEndRegex : match2[QUOTE_CHAR] === '"' ? doubleQuoteAttrEndRegex : singleQuoteAttrEndRegex;
        }
      } else if (regex2 === doubleQuoteAttrEndRegex || regex2 === singleQuoteAttrEndRegex) {
        regex2 = tagEndRegex;
      } else if (regex2 === commentEndRegex || regex2 === comment2EndRegex) {
        regex2 = textEndRegex;
      } else {
        regex2 = tagEndRegex;
        rawTextEndRegex = void 0;
      }
    }
    {
      console.assert(attrNameEndIndex === -1 || regex2 === tagEndRegex || regex2 === singleQuoteAttrEndRegex || regex2 === doubleQuoteAttrEndRegex, "unexpected parse state B");
    }
    const end = regex2 === tagEndRegex && strings[i + 1].startsWith("/>") ? " " : "";
    html2 += regex2 === textEndRegex ? s + nodeMarker : attrNameEndIndex >= 0 ? (attrNames.push(attrName), s.slice(0, attrNameEndIndex) + boundAttributeSuffix + s.slice(attrNameEndIndex)) + marker + end : s + marker + (attrNameEndIndex === -2 ? (attrNames.push(void 0), i) : end);
  }
  const htmlResult = html2 + (strings[l] || "<?>") + (type === SVG_RESULT ? "</svg>" : "");
  return [trustFromTemplateString(strings, htmlResult), attrNames];
};
class Template {
  constructor({ strings, ["_$litType$"]: type }, options) {
    this.parts = [];
    let node;
    let nodeIndex = 0;
    let attrNameIndex = 0;
    const partCount = strings.length - 1;
    const parts = this.parts;
    const [html2, attrNames] = getTemplateHtml(strings, type);
    this.el = Template.createElement(html2, options);
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
          const tag2 = node.localName;
          if (/^(?:textarea|template)$/i.test(tag2) && node.innerHTML.includes(marker)) {
            const m = `Expressions are not supported inside \`${tag2}\` elements. See https://lit.dev/msg/expression-in-${tag2} for more information.`;
            if (tag2 === "template") {
              throw new Error(m);
            } else
              issueWarning$1("", m);
          }
        }
        if (node.hasAttributes()) {
          const attrsToRemove = [];
          for (const name2 of node.getAttributeNames()) {
            if (name2.endsWith(boundAttributeSuffix) || name2.startsWith(marker)) {
              const realName = attrNames[attrNameIndex++];
              attrsToRemove.push(name2);
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
          for (const name2 of attrsToRemove) {
            node.removeAttribute(name2);
          }
        }
        if (rawTextElement.test(node.tagName)) {
          const strings2 = node.textContent.split(marker);
          const lastIndex = strings2.length - 1;
          if (lastIndex > 0) {
            node.textContent = trustedTypes ? trustedTypes.emptyScript : "";
            for (let i = 0; i < lastIndex; i++) {
              node.append(strings2[i], createMarker());
              walker.nextNode();
              parts.push({ type: CHILD_PART, index: ++nodeIndex });
            }
            node.append(strings2[lastIndex], createMarker());
          }
        }
      } else if (node.nodeType === 8) {
        const data2 = node.data;
        if (data2 === markerMatch) {
          parts.push({ type: CHILD_PART, index: nodeIndex });
        } else {
          let i = -1;
          while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
            parts.push({ type: COMMENT_PART, index: nodeIndex });
            i += marker.length - 1;
          }
        }
      }
      nodeIndex++;
    }
    debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
      kind: "template prep",
      template: this,
      clonableTemplate: this.el,
      parts: this.parts,
      strings
    });
  }
  // Overridden via `litHtmlPolyfillSupport` to provide platform support.
  /** @nocollapse */
  static createElement(html2, _options) {
    const el = d.createElement("template");
    el.innerHTML = html2;
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
  const nextDirectiveConstructor = isPrimitive(value) ? void 0 : (
    // This property needs to remain unminified.
    value["_$litDirective$"]
  );
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
    this._$parts = [];
    this._$disconnectableChildren = void 0;
    this._$template = template2;
    this._$parent = parent;
  }
  // Called by ChildPart parentNode getter
  get parentNode() {
    return this._$parent.parentNode;
  }
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  // This method is separate from the constructor because we need to return a
  // DocumentFragment and we don't want to hold onto it with an instance field.
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
        this._$parts.push(part);
        templatePart = parts[++partIndex];
      }
      if (nodeIndex !== (templatePart === null || templatePart === void 0 ? void 0 : templatePart.index)) {
        node = walker.nextNode();
        nodeIndex++;
      }
    }
    walker.currentNode = d;
    return fragment;
  }
  _update(values) {
    let i = 0;
    for (const part of this._$parts) {
      if (part !== void 0) {
        debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
          kind: "set part",
          part,
          value: values[i],
          valueIndex: i,
          values,
          templateInstance: this
        });
        if (part.strings !== void 0) {
          part._$setValue(values, part, i);
          i += part.strings.length - 2;
        } else {
          part._$setValue(values[i]);
        }
      }
      i++;
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
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    var _a2, _b2;
    return (_b2 = (_a2 = this._$parent) === null || _a2 === void 0 ? void 0 : _a2._$isConnected) !== null && _b2 !== void 0 ? _b2 : this.__isConnected;
  }
  /**
   * The parent node into which the part renders its content.
   *
   * A ChildPart's content consists of a range of adjacent child nodes of
   * `.parentNode`, possibly bordered by 'marker nodes' (`.startNode` and
   * `.endNode`).
   *
   * - If both `.startNode` and `.endNode` are non-null, then the part's content
   * consists of all siblings between `.startNode` and `.endNode`, exclusively.
   *
   * - If `.startNode` is non-null but `.endNode` is null, then the part's
   * content consists of all siblings following `.startNode`, up to and
   * including the last child of `.parentNode`. If `.endNode` is non-null, then
   * `.startNode` will always be non-null.
   *
   * - If both `.endNode` and `.startNode` are null, then the part's content
   * consists of all child nodes of `.parentNode`.
   */
  get parentNode() {
    let parentNode = wrap(this._$startNode).parentNode;
    const parent = this._$parent;
    if (parent !== void 0 && (parentNode === null || parentNode === void 0 ? void 0 : parentNode.nodeType) === 11) {
      parentNode = parent.parentNode;
    }
    return parentNode;
  }
  /**
   * The part's leading marker node, if any. See `.parentNode` for more
   * information.
   */
  get startNode() {
    return this._$startNode;
  }
  /**
   * The part's trailing marker node, if any. See `.parentNode` for more
   * information.
   */
  get endNode() {
    return this._$endNode;
  }
  _$setValue(value, directiveParent = this) {
    var _a2;
    if (this.parentNode === null) {
      throw new Error(`This \`ChildPart\` has no \`parentNode\` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's \`innerHTML\` or \`textContent\` can do this.`);
    }
    value = resolveDirective(this, value, directiveParent);
    if (isPrimitive(value)) {
      if (value === nothing || value == null || value === "") {
        if (this._$committedValue !== nothing) {
          debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
            kind: "commit nothing to child",
            start: this._$startNode,
            end: this._$endNode,
            parent: this._$parent,
            options: this.options
          });
          this._$clear();
        }
        this._$committedValue = nothing;
      } else if (value !== this._$committedValue && value !== noChange) {
        this._commitText(value);
      }
    } else if (value["_$litType$"] !== void 0) {
      this._commitTemplateResult(value);
    } else if (value.nodeType !== void 0) {
      if (((_a2 = this.options) === null || _a2 === void 0 ? void 0 : _a2.host) === value) {
        this._commitText(`[probable mistake: rendered a template's host in itself (commonly caused by writing \${this} in a template]`);
        console.warn(`Attempted to render the template host`, value, `inside itself. This is almost always a mistake, and in dev mode `, `we render some warning text. In production however, we'll `, `render it, which will usually result in an error, and sometimes `, `in the element disappearing from the DOM.`);
        return;
      }
      this._commitNode(value);
    } else if (isIterable(value)) {
      this._commitIterable(value);
    } else {
      this._commitText(value);
    }
  }
  _insert(node) {
    return wrap(wrap(this._$startNode).parentNode).insertBefore(node, this._$endNode);
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
      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
        kind: "commit node",
        start: this._$startNode,
        parent: this._$parent,
        value,
        options: this.options
      });
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
      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
        kind: "commit text",
        node,
        value,
        options: this.options
      });
      node.data = value;
    } else {
      {
        const textNode = d.createTextNode("");
        this._commitNode(textNode);
        if (this._textSanitizer === void 0) {
          this._textSanitizer = createSanitizer(textNode, "data", "property");
        }
        value = this._textSanitizer(value);
        debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
          kind: "commit text",
          node: textNode,
          value,
          options: this.options
        });
        textNode.data = value;
      }
    }
    this._$committedValue = value;
  }
  _commitTemplateResult(result2) {
    var _a2;
    const { values, ["_$litType$"]: type } = result2;
    const template2 = typeof type === "number" ? this._$getTemplate(result2) : (type.el === void 0 && (type.el = Template.createElement(trustFromTemplateString(type.h, type.h[0]), this.options)), type);
    if (((_a2 = this._$committedValue) === null || _a2 === void 0 ? void 0 : _a2._$template) === template2) {
      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
        kind: "template updating",
        template: template2,
        instance: this._$committedValue,
        parts: this._$committedValue._$parts,
        options: this.options,
        values
      });
      this._$committedValue._update(values);
    } else {
      const instance = new TemplateInstance(template2, this);
      const fragment = instance._clone(this.options);
      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
        kind: "template instantiated",
        template: template2,
        instance,
        parts: instance._$parts,
        options: this.options,
        fragment,
        values
      });
      instance._update(values);
      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
        kind: "template instantiated and updated",
        template: template2,
        instance,
        parts: instance._$parts,
        options: this.options,
        fragment,
        values
      });
      this._commitNode(fragment);
      this._$committedValue = instance;
    }
  }
  // Overridden via `litHtmlPolyfillSupport` to provide platform support.
  /** @internal */
  _$getTemplate(result2) {
    let template2 = templateCache.get(result2.strings);
    if (template2 === void 0) {
      templateCache.set(result2.strings, template2 = new Template(result2));
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
  /**
   * Removes the nodes contained within this Part from the DOM.
   *
   * @param start Start node to clear from, for clearing a subset of the part's
   *     DOM (used when truncating iterables)
   * @param from  When `start` is specified, the index within the iterable from
   *     which ChildParts are being removed, used for disconnecting directives in
   *     those Parts.
   *
   * @internal
   */
  _$clear(start = wrap(this._$startNode).nextSibling, from2) {
    var _a2;
    (_a2 = this._$notifyConnectionChanged) === null || _a2 === void 0 ? void 0 : _a2.call(this, false, true, from2);
    while (start && start !== this._$endNode) {
      const n = wrap(start).nextSibling;
      wrap(start).remove();
      start = n;
    }
  }
  /**
   * Implementation of RootPart's `isConnected`. Note that this metod
   * should only be called on `RootPart`s (the `ChildPart` returned from a
   * top-level `render()` call). It has no effect on non-root ChildParts.
   * @param isConnected Whether to set
   * @internal
   */
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
  constructor(element, name2, strings, parent, options) {
    this.type = ATTRIBUTE_PART;
    this._$committedValue = nothing;
    this._$disconnectableChildren = void 0;
    this.element = element;
    this.name = name2;
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
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  /**
   * Sets the value of this part by resolving the value from possibly multiple
   * values and static strings and committing it to the DOM.
   * If this part is single-valued, `this._strings` will be undefined, and the
   * method will be called with a single value argument. If this part is
   * multi-value, `this._strings` will be defined, and the method is called
   * with the value array of the part's owning TemplateInstance, and an offset
   * into the value array from which the values should be read.
   * This method is overloaded this way to eliminate short-lived array slices
   * of the template instance values, and allow a fast-path for single-valued
   * parts.
   *
   * @param value The part value, or an array of values for multi-valued parts
   * @param valueIndex the index to start reading values from. `undefined` for
   *   single-valued parts
   * @param noCommit causes the part to not commit its value to the DOM. Used
   *   in hydration to prime attribute parts with their first-rendered value,
   *   but not set the attribute, and in SSR to no-op the DOM operation and
   *   capture the value for serialization.
   *
   * @internal
   */
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
      let i, v;
      for (i = 0; i < strings.length - 1; i++) {
        v = resolveDirective(this, values[valueIndex + i], directiveParent, i);
        if (v === noChange) {
          v = this._$committedValue[i];
        }
        change || (change = !isPrimitive(v) || v !== this._$committedValue[i]);
        if (v === nothing) {
          value = nothing;
        } else if (value !== nothing) {
          value += (v !== null && v !== void 0 ? v : "") + strings[i + 1];
        }
        this._$committedValue[i] = v;
      }
    }
    if (change && !noCommit) {
      this._commitValue(value);
    }
  }
  /** @internal */
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
      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
        kind: "commit attribute",
        element: this.element,
        name: this.name,
        value,
        options: this.options
      });
      wrap(this.element).setAttribute(this.name, value !== null && value !== void 0 ? value : "");
    }
  }
}
class PropertyPart extends AttributePart {
  constructor() {
    super(...arguments);
    this.type = PROPERTY_PART;
  }
  /** @internal */
  _commitValue(value) {
    {
      if (this._sanitizer === void 0) {
        this._sanitizer = sanitizerFactoryInternal(this.element, this.name, "property");
      }
      value = this._sanitizer(value);
    }
    debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
      kind: "commit property",
      element: this.element,
      name: this.name,
      value,
      options: this.options
    });
    this.element[this.name] = value === nothing ? void 0 : value;
  }
}
const emptyStringForBooleanAttribute = trustedTypes ? trustedTypes.emptyScript : "";
class BooleanAttributePart extends AttributePart {
  constructor() {
    super(...arguments);
    this.type = BOOLEAN_ATTRIBUTE_PART;
  }
  /** @internal */
  _commitValue(value) {
    debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
      kind: "commit boolean attribute",
      element: this.element,
      name: this.name,
      value: !!(value && value !== nothing),
      options: this.options
    });
    if (value && value !== nothing) {
      wrap(this.element).setAttribute(this.name, emptyStringForBooleanAttribute);
    } else {
      wrap(this.element).removeAttribute(this.name);
    }
  }
}
class EventPart extends AttributePart {
  constructor(element, name2, strings, parent, options) {
    super(element, name2, strings, parent, options);
    this.type = EVENT_PART;
    if (this.strings !== void 0) {
      throw new Error(`A \`<${element.localName}>\` has a \`@${name2}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`);
    }
  }
  // EventPart does not use the base _$setValue/_resolveValue implementation
  // since the dirty checking is more complex
  /** @internal */
  _$setValue(newListener, directiveParent = this) {
    var _a2;
    newListener = (_a2 = resolveDirective(this, newListener, directiveParent, 0)) !== null && _a2 !== void 0 ? _a2 : nothing;
    if (newListener === noChange) {
      return;
    }
    const oldListener = this._$committedValue;
    const shouldRemoveListener = newListener === nothing && oldListener !== nothing || newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive;
    const shouldAddListener = newListener !== nothing && (oldListener === nothing || shouldRemoveListener);
    debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
      kind: "commit event listener",
      element: this.element,
      name: this.name,
      value: newListener,
      options: this.options,
      removeListener: shouldRemoveListener,
      addListener: shouldAddListener,
      oldListener
    });
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
  // See comment in Disconnectable interface for why this is a getter
  get _$isConnected() {
    return this._$parent._$isConnected;
  }
  _$setValue(value) {
    debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
      kind: "commit to element binding",
      element: this.element,
      value,
      options: this.options
    });
    resolveDirective(this, value);
  }
}
const polyfillSupport$1 = global$1.litHtmlPolyfillSupportDevMode;
polyfillSupport$1 === null || polyfillSupport$1 === void 0 ? void 0 : polyfillSupport$1(Template, ChildPart);
((_d = global$1.litHtmlVersions) !== null && _d !== void 0 ? _d : global$1.litHtmlVersions = []).push("2.7.5");
if (global$1.litHtmlVersions.length > 1) {
  issueWarning$1("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
}
const render = (value, container, options) => {
  var _a2, _b2;
  if (container == null) {
    throw new TypeError(`The container to render into may not be ${container}`);
  }
  const renderId = debugLogRenderId++;
  const partOwnerNode = (_a2 = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _a2 !== void 0 ? _a2 : container;
  let part = partOwnerNode["_$litPart$"];
  debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
    kind: "begin render",
    id: renderId,
    value,
    container,
    options,
    part
  });
  if (part === void 0) {
    const endNode = (_b2 = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _b2 !== void 0 ? _b2 : null;
    partOwnerNode["_$litPart$"] = part = new ChildPart(container.insertBefore(createMarker(), endNode), endNode, void 0, options !== null && options !== void 0 ? options : {});
  }
  part._$setValue(value);
  debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
    kind: "end render",
    id: renderId,
    value,
    container,
    options,
    part
  });
  return part;
};
{
  render.setSanitizer = setSanitizer;
  render.createSanitizer = createSanitizer;
  {
    render._testOnlyClearSanitizerFactoryDoNotCallOrElse = _testOnlyClearSanitizerFactoryDoNotCallOrElse;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a, _b, _c;
let issueWarning;
{
  const issuedWarnings = (_a = globalThis.litIssuedWarnings) !== null && _a !== void 0 ? _a : globalThis.litIssuedWarnings = /* @__PURE__ */ new Set();
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
  /**
   * @category rendering
   */
  createRenderRoot() {
    var _a2;
    var _b2;
    const renderRoot = super.createRenderRoot();
    (_a2 = (_b2 = this.renderOptions).renderBefore) !== null && _a2 !== void 0 ? _a2 : _b2.renderBefore = renderRoot.firstChild;
    return renderRoot;
  }
  /**
   * Updates the element. This method reflects property values to attributes
   * and calls `render` to render DOM via lit-html. Setting properties inside
   * this method will *not* trigger another update.
   * @param changedProperties Map of changed properties with old values
   * @category updates
   */
  update(changedProperties) {
    const value = this.render();
    if (!this.hasUpdated) {
      this.renderOptions.isConnected = this.isConnected;
    }
    super.update(changedProperties);
    this.__childPart = render(value, this.renderRoot, this.renderOptions);
  }
  /**
   * Invoked when the component is added to the document's DOM.
   *
   * In `connectedCallback()` you should setup tasks that should only occur when
   * the element is connected to the document. The most common of these is
   * adding event listeners to nodes external to the element, like a keydown
   * event handler added to the window.
   *
   * ```ts
   * connectedCallback() {
   *   super.connectedCallback();
   *   addEventListener('keydown', this._handleKeydown);
   * }
   * ```
   *
   * Typically, anything done in `connectedCallback()` should be undone when the
   * element is disconnected, in `disconnectedCallback()`.
   *
   * @category lifecycle
   */
  connectedCallback() {
    var _a2;
    super.connectedCallback();
    (_a2 = this.__childPart) === null || _a2 === void 0 ? void 0 : _a2.setConnected(true);
  }
  /**
   * Invoked when the component is removed from the document's DOM.
   *
   * This callback is the main signal to the element that it may no longer be
   * used. `disconnectedCallback()` should ensure that nothing is holding a
   * reference to the element (such as event listeners added to nodes external
   * to the element), so that it is free to be garbage collected.
   *
   * ```ts
   * disconnectedCallback() {
   *   super.disconnectedCallback();
   *   window.removeEventListener('keydown', this._handleKeydown);
   * }
   * ```
   *
   * An element may be re-connected after being disconnected.
   *
   * @category lifecycle
   */
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback();
    (_a2 = this.__childPart) === null || _a2 === void 0 ? void 0 : _a2.setConnected(false);
  }
  /**
   * Invoked on each update to perform rendering tasks. This method may return
   * any value renderable by lit-html's `ChildPart` - typically a
   * `TemplateResult`. Setting properties inside this method will *not* trigger
   * the element to update.
   * @category rendering
   */
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
    const warnRemovedOrRenamed = (obj, name2, renamed = false) => {
      if (obj.hasOwnProperty(name2)) {
        const ctorName2 = (typeof obj === "function" ? obj : obj.constructor).name;
        issueWarning(renamed ? "renamed-api" : "removed-api", `\`${name2}\` is implemented on class ${ctorName2}. It has been ${renamed ? "renamed" : "removed"} in this version of LitElement.`);
      }
    };
    warnRemovedOrRenamed(this, "render");
    warnRemovedOrRenamed(this, "getStyles", true);
    warnRemovedOrRenamed(this.prototype, "adoptStyles");
    return true;
  };
}
((_c = globalThis.litElementVersions) !== null && _c !== void 0 ? _c : globalThis.litElementVersions = []).push("3.3.2");
if (globalThis.litElementVersions.length > 1) {
  issueWarning("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SLitComponent extends LitElement {
  get state() {
    return this._state;
  }
  set state(state) {
    Object.assign(this._state, state);
  }
  /**
   * @name            define
   * @type            Function
   * @static
   *
   * This static method allows you to define a custom element just like the `customElement.define` does.
   * The trick is that this define method will not initialize the component directly. It will
   * wait until it is near the viewport before actually creating a new element names "%tagName-up".
   * This will be the custom element that is registered and that will replace your "%tagName" HTMLElement.
   *
   * @param
   * @param       {Any}           props          The initial props to apply to your custom element
   * @param       {String}        tagName         The tagname you want to search in the DOM
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static define(tagName, Cls, props = {}, settings = {}) {
    var _a2;
    SLitComponent.setDefaultProps(tagName, props);
    const win = (_a2 = settings.window) !== null && _a2 !== void 0 ? _a2 : window;
    if (win.customElements.get(tagName.toLowerCase())) {
      return;
    }
    win.customElements.define(tagName.toLowerCase(), class extends Cls {
    });
  }
  /**
   * @name            setDefaultProps
   * @type            Function
   * @static
   *
   * This static method allows you to set some default props for some particular
   * component(s). You can target components using simple css selectorl like "my-component#cool".
   * Once the component is instanciated, it will check if some defaults are specified and
   * extends them with the passed props.
   *
   * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
   * @param     {Any}         props         An object of props you want to set defaults for
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  static setDefaultProps(selector, props) {
    SComponentUtils.setDefaultProps(selector, props);
  }
  static propertiesFromInterface(properties2, int) {
    var _a2;
    const propertiesObj = {};
    class SLitComponentPropsInterface extends SComponentUtilsDefaultPropsInterface {
    }
    SLitComponentPropsInterface.definition = Object.assign(Object.assign({}, SLitComponentPropsInterface.definition), (_a2 = int === null || int === void 0 ? void 0 : int.definition) !== null && _a2 !== void 0 ? _a2 : {});
    Object.keys(SLitComponentPropsInterface.definition).forEach((prop) => {
      var _a3, _b2, _c2, _d2, _e2, _f, _g, _h, _j, _k, _l, _m, _o;
      const definition = SLitComponentPropsInterface.definition[prop];
      propertiesObj[prop] = Object.assign({}, (_a3 = definition.lit) !== null && _a3 !== void 0 ? _a3 : {});
      let type = String, typeStr = (_c2 = (_b2 = definition.type) === null || _b2 === void 0 ? void 0 : _b2.type) !== null && _c2 !== void 0 ? _c2 : definition.type;
      switch (typeStr.toLowerCase()) {
        case "boolean":
          type = Boolean;
          break;
        case "object":
          type = Object;
          break;
        case "number":
          type = Number;
          break;
        default:
          if (typeStr.match(/\[\]$/)) {
            type = Array;
          }
          break;
      }
      propertiesObj[prop].type = type;
      propertiesObj[prop].default = definition.default;
      propertiesObj[prop].attribute = __dashCase(prop);
      if (definition.physical || ((_f = (_e2 = (_d2 = definition.type) === null || _d2 === void 0 ? void 0 : _d2.type) === null || _e2 === void 0 ? void 0 : _e2.toLowerCase) === null || _f === void 0 ? void 0 : _f.call(_e2)) === "boolean" || ((_h = (_g = definition.type) === null || _g === void 0 ? void 0 : _g.toLowerCase) === null || _h === void 0 ? void 0 : _h.call(_g)) === "boolean" || ((_l = (_k = (_j = definition.type) === null || _j === void 0 ? void 0 : _j.type) === null || _k === void 0 ? void 0 : _k.toLowerCase) === null || _l === void 0 ? void 0 : _l.call(_k)) === "object" || ((_o = (_m = definition.type) === null || _m === void 0 ? void 0 : _m.toLowerCase) === null || _o === void 0 ? void 0 : _o.call(_m)) === "object") {
        propertiesObj[prop].reflect = true;
      }
      propertiesObj[prop].converter = {
        fromAttribute: (value, type2) => {
          var _a4, _b3, _c3, _d3, _e3;
          const typeStr2 = (_c3 = (_b3 = (_a4 = definition.type) === null || _a4 === void 0 ? void 0 : _a4.type) === null || _b3 === void 0 ? void 0 : _b3.toLowerCase()) !== null && _c3 !== void 0 ? _c3 : (_d3 = definition.type) === null || _d3 === void 0 ? void 0 : _d3.toLowerCase();
          if (typeStr2 === "object" && typeof value === "string") {
            try {
              const json = JSON.parse(value);
              const finalJson = __deepMerge((_e3 = definition.default) !== null && _e3 !== void 0 ? _e3 : {}, json);
              return finalJson;
            } catch (e) {
              console.error(e);
            }
          }
          if (value === "true" || value === "")
            return true;
          if (value === "null")
            return null;
          if (value === "undefined")
            return void 0;
          if (value === "false")
            return false;
          return value;
        },
        toAttribute(value) {
          if (value === "false" || value === false || value === null) {
            return void 0;
          }
          if (typeof value !== "string" && typeof value !== "boolean") {
            try {
              const jsonStr = JSON.stringify(value);
              return jsonStr;
            } catch (e) {
            }
          }
          return value;
        }
      };
    });
    const props = Object.assign(Object.assign({}, propertiesObj), properties2 !== null && properties2 !== void 0 ? properties2 : {});
    return props;
  }
  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(settings = {}) {
    var _a2, _b2, _c2, _d2, _e2, _f, _g, _h, _j, _k;
    super();
    this.settings = {};
    this.props = {};
    this._shouldUpdate = false;
    this._state = {};
    this.settings = __deepMerge({
      componentUtils: {},
      shadowDom: false,
      get rootNode() {
        var _a3;
        return (_a3 = this.shadowRoot) === null || _a3 === void 0 ? void 0 : _a3.querySelector("*:first-child");
      }
    }, settings);
    if (this.constructor.state) {
      this.state = Object.assign({}, this.constructor.state);
    } else {
      this.state = {};
    }
    if (!((_a2 = this.state) === null || _a2 === void 0 ? void 0 : _a2.status)) {
      this.state.status = "idle";
    }
    if (this.settings.shadowDom === false) {
      this.createRenderRoot = () => {
        return this;
      };
    }
    const doc = this._getDocumentFromElement(this);
    if (document !== doc && this.constructor.styles) {
      __injectStyle(this.constructor.styles, {
        rootNode: doc
      });
    }
    if (!SLitComponent._keepInjectedCssBeforeStylesheetLinksInited) {
      const $firstStylesheetLink = document.head.querySelector('link[rel="stylesheet"]');
      __querySelectorLive("style", ($style) => {
        if ($firstStylesheetLink) {
          document.head.insertBefore($style, $firstStylesheetLink);
        }
      }, {
        rootNode: document.head
      });
      SLitComponent._keepInjectedCssBeforeStylesheetLinksInited = true;
    }
    const nodeFirstUpdated = (_b2 = this.firstUpdated) === null || _b2 === void 0 ? void 0 : _b2.bind(this);
    this.firstUpdated = () => __awaiter$1(this, void 0, void 0, function* () {
      if (nodeFirstUpdated) {
        yield nodeFirstUpdated();
      }
      this.setAttribute("mounted", true);
    });
    const nodeShouldUpdate = (_c2 = this.shouldUpdate) === null || _c2 === void 0 ? void 0 : _c2.bind(this);
    this.shouldUpdate = () => {
      if (nodeShouldUpdate) {
        const res = nodeShouldUpdate();
        if (!res)
          return false;
      }
      return this._shouldUpdate;
    };
    this.utils = new SComponentUtils(this, Object.assign(Object.assign(Object.assign({}, (_d2 = this.settings) !== null && _d2 !== void 0 ? _d2 : {}), (_e2 = this.settings.componentUtils) !== null && _e2 !== void 0 ? _e2 : {}), { style: (_k = (_h = (_g = (_f = this.constructor.styles) === null || _f === void 0 ? void 0 : _f.cssText) !== null && _g !== void 0 ? _g : this.settings.style) !== null && _h !== void 0 ? _h : (_j = this.settings.componentUtils) === null || _j === void 0 ? void 0 : _j.style) !== null && _k !== void 0 ? _k : "" }));
    (() => __awaiter$1(this, void 0, void 0, function* () {
      var _l, _m;
      const defaultProps = SComponentUtils.getDefaultProps(this.tagName.toLowerCase());
      const mountWhen = (_m = (_l = this.getAttribute("mount-when")) !== null && _l !== void 0 ? _l : defaultProps.mountWhen) !== null && _m !== void 0 ? _m : "direct";
      this.classList.add(...this.utils.cls("").split(" "));
      yield this.utils.waitAndExecute(mountWhen, () => {
        this._mount();
      });
    }))();
  }
  firstUpdated() {
    var _a2, _b2;
    super.firstUpdated();
    if ((_b2 = (_a2 = document.env) === null || _a2 === void 0 ? void 0 : _a2.SUGAR) === null || _b2 === void 0 ? void 0 : _b2.classmap) {
      document.env.SUGAR.classmap.patchDom(this);
    }
  }
  updated() {
    var _a2, _b2;
    if ((_b2 = (_a2 = document.env) === null || _a2 === void 0 ? void 0 : _a2.SUGAR) === null || _b2 === void 0 ? void 0 : _b2.classmap) {
      document.env.SUGAR.classmap.patchDom(this);
    }
  }
  _getDocumentFromElement($elm) {
    while ($elm.parentNode) {
      $elm = $elm.parentNode;
    }
    return $elm;
  }
  /**
   * @name            mount
   * @type            Function
   * @async
   *
   * This method allows you to actually mount your feature behavior.
   * It will be called depending on the "mountWhen" setting setted.
   *
   * @since           2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _mount() {
    var _a2, _b2, _c2;
    return __awaiter$1(this, void 0, void 0, function* () {
      const _this = this, defaultProps = SComponentUtils.getDefaultProps(this.tagName.toLowerCase());
      let properties2 = this.constructor.properties;
      if (!properties2) {
        properties2 = this.constructor.propertiesFromInterface();
      }
      let finalProps = {};
      for (let [prop, obj] of Object.entries(properties2)) {
        if (this[prop] !== void 0) {
          finalProps[prop] = this[prop];
        }
        Object.defineProperty(this.props, prop, {
          enumerable: true,
          get() {
            return _this[prop];
          },
          set(value) {
            var _a3;
            value = (_a3 = value === null || value === void 0 ? void 0 : value.value) !== null && _a3 !== void 0 ? _a3 : value;
            if (value && typeof value === "string") {
              try {
                _this[prop] = JSON.parse(value);
                return;
              } catch (e) {
              }
            }
            _this[prop] = value;
          }
        });
        if (finalProps[prop] === void 0 && this[prop] === void 0) {
          finalProps[prop] = (_a2 = defaultProps[prop]) !== null && _a2 !== void 0 ? _a2 : obj.default;
        }
      }
      const attrs = this.attributes;
      for (let [id, attr] of Object.entries(attrs)) {
        if (attr.name.includes(".")) {
          __set(finalProps, __camelCase(attr.name), __parse(attr.value));
        }
      }
      if (this.settings.interface) {
        finalProps = this.settings.interface.apply(finalProps);
      }
      Object.assign(this.props, finalProps);
      this.utils.makePropsResponsive(this.props);
      if (this.props.verbose) {
        console.log(`[${this.tagName.toLowerCase()}]${this.id ? ` #${this.id} ` : " "}mounting`);
      }
      if (this.state) {
        const state = Object.assign({}, this.state);
        delete this.state;
        Object.defineProperty(this, "state", {
          enumerable: true,
          value: this.utils.handleState(state, {
            save: this.props.saveState
          })
        });
        this.state.$set("*", () => {
          this.requestUpdate();
        });
      }
      if (this.mount && typeof this.mount === "function") {
        yield this.mount();
      }
      this._shouldUpdate = true;
      this.requestUpdate();
      yield this.updateComplete;
      this.utils.injectStyle((_c2 = (_b2 = this.constructor.styles) === null || _b2 === void 0 ? void 0 : _b2.cssText) !== null && _c2 !== void 0 ? _c2 : "", this.tagName);
      if (this.props.adoptStyle && this.shadowRoot) {
        yield this.utils.adoptStyleInShadowRoot(this.shadowRoot);
      }
      return true;
    });
  }
}
SLitComponent._keepInjectedCssBeforeStylesheetLinksInited = false;
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function define(props, tagName = "s-slider", settings = {}) {
  var _a2;
  __querySelectorLive(tagName, ($elm) => __awaiter(this, void 0, void 0, function* () {
    const define2 = yield __vitePreload(() => import("./define-7cf12472.js"), true ? ["define-7cf12472.js","querySelectorUp-ba01e0d2.js"] : void 0);
    define2.default(props, tagName, settings);
  }), {
    when: (_a2 = settings.when) !== null && _a2 !== void 0 ? _a2 : "nearViewport",
    firstOnly: true
  });
}
if (!window.___isObject) {
  window.___isObject = function(item) {
    return item && typeof item === "object" && !Array.isArray(item);
  };
}
if (!window.___deepMerge) {
  window.___deepMerge = function(target, ...sources) {
    if (!sources.length)
      return target;
    var source2 = sources.shift();
    if (window.___isObject(target) && window.___isObject(source2)) {
      for (const key in source2) {
        if (window.___isObject(source2[key])) {
          if (!target[key])
            Object.assign(target, { [key]: {} });
          window.___deepMerge(target[key], source2[key]);
        } else {
          Object.assign(target, { [key]: source2[key] });
        }
      }
    }
    return window.___deepMerge(target, ...sources);
  };
}
document.env = window.___deepMerge(
  JSON.parse(`{"PLATFORM":"browser","ENV":"development","SUGAR":{"config":{"datetime":{"dateFormat":"YYYY-MM-DD","timeFormat":"h:mm:ss","i18n":{"previousMonth":"Previous Month","nextMonth":"Next Month","months":["January","February","March","April","May","June","July","August","September","October","November","December"],"weekdays":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"weekdaysShort":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}},"doc":{"categories":{},"server":{"port":9191},"endpoints":{"base":"/api/doc","items":"/items","item":"/item/:id"}},"google":{"gtm":"GTM-K4LMN8Q","map":{"apiKey":"AIzaSyDzFfEzhmYXRTlONUCtMWQ88uHJhsbtXY4"}},"project":{"environments":{}},"serve":{"img":{"imgPath":"/dist/img"},"js":{"path":"/dist/js"},"css":{"path":"/dist/css"},"icons":{"path":"/dist/icons"},"fonts":{"path":"/dist/fonts"},"cache":{"path":"/cache"}},"dashboard":{"layout":[["s-dashboard-pages"],["s-dashboard-browserstack","s-dashboard-google","s-dashboard-web-vitals","s-dashboard-responsive"],["s-dashboard-project","s-dashboard-frontend-checker"]]},"vite":{"server":{"proxy":{"/sugar/dashboard/init.js":{"target":"http://0.0.0.0:5173/@fs/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-dashboard/src/js/init.ts","changeOrigin":true}}}},"env":{"envFromLocation":{"development":"https?://(localhost|127.0.0.1|0.0.0.0|192.168.[0-9]{1,3}.[0-9]{1,3})","staging":"https?://([a-zA-Z0-9.-]+)?staging([a-zA-Z0-9.-]+)?","production":"https?://.*"},"git":{"template":{"name":"Template","commit":{}}}},"frontendServer":{"corsProxy":{"port":9999,"url":"http://127.0.0.1:9999","targetUrlHeaderName":"TargetUrl","limit":"12mb"}},"theme":{"theme":"default","variant":"light","themes":{"default-light":{"defaultColor":"main","color":{"current":"#808080","main":"#808080","accent":"#ffbb00","complementary":"#8054F9","success":"#91ff00","warning":"#ffd500","error":"#ff003b","info":"#00ffff"},"classmap":{"enabled":false,"url":"/classmap.json"},"lod":{"enabled":false,"defaultLevel":3,"botLevel":1,"levels":{"0":{"name":"bare","speedIndex":0},"1":{"name":"lnf","speedIndex":30},"2":{"name":"theme","speedIndex":40},"3":{"name":"high","speedIndex":50},"4":{"name":"ultra","speedIndex":60}},"method":"class","defaultAction":">=","cssProperties":{}},"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"scroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0},"partytown":{"enabled":false,"forward":["dataLayer.push","fbq","freshpaint.addPageviewProperties","freshpaint.identify","freshpaint.track","_hsq.push","Intercom","_learnq.push","ttq.track","ttq.page","ttq.load","mixpanel.track"]},"timing":{"slow":".6s","default":".3s","fast":".1s"},"transition":{"slow":"all .6s cubic-bezier(0.700, 0.000, 0.305, 0.995)","default":"all .3s cubic-bezier(0.700, 0.000, 0.305, 0.995)","fast":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"gradient":{"defaultModifierStart":{},"defaultModifierEnd":{"lighten":20},"defaultX":"50%","defaultY":"50%","defaultAngle":"90deg","defaultTextModifierStart":{"darken":5},"defaultTextModifierEnd":{"lighten":5},"defaultTextAngle":"90deg"},"helpers":{"states":["mounted","active","loading"],"clearfix":{"default":"overflow"},"disabled":{"opacity":0.4},"truncate":{"count":10},"order":{"count":20}},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"ratio":{"1":1,"16-9":1.7777777777777777,"16-10":1.6,"21-9":2.3333333333333335,"1-2":0.5,"2-1":2,"2-3":0.6666666666666666,"3-2":1.5,"4-3":1.3333333333333333,"3-4":0.75},"scalable":{"margin":false,"padding":true,"offsize":false,"font":true},"scale":{"10":1,"11":1.1,"12":1.2,"13":1.3,"14":1.4,"15":1.5,"16":1.6,"17":1.7,"18":1.8,"19":1.9,"20":2,"default":1,"01":0.1,"02":0.2,"03":0.3,"04":0.4,"05":0.5,"06":0.6,"07":0.7,"08":0.8,"09":0.9},"opacity":{"0":0,"10":0.1,"20":0.2,"30":0.3,"40":0.4,"50":0.5,"60":0.6,"70":0.7,"80":0.8,"90":0.9,"100":1},"width":{"0":"0","10":"10%","20":"20%","30":"30%","40":"40%","50":"50%","60":"60%","70":"70%","80":"80%","90":"90%","100":"100%"},"height":{"0":"0","10":"10%","20":"20%","30":"30%","40":"40%","50":"50%","60":"60%","70":"70%","80":"80%","90":"90%","100":"100%"},"depth":{"0":"0","5":"0px 0.6px 0.4px rgba(0, 0, 0, 0.006),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.006),\\n  0px 2.5px 1.5px rgba(0, 0, 0, 0.005),\\n  0px 3.5px 3.4px rgba(0, 0, 0, 0.006),\\n  0px 4.4px 4.3px rgba(0, 0, 0, 0.007),\\n  0px 10px 10px rgba(0, 0, 0, 0.01)","10":"0px 0.6px 0.4px rgba(0, 0, 0, 0.006),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.008),\\n  0px 2.5px 1.9px rgba(0, 0, 0, 0.01),\\n  0px 4.5px 3.4px rgba(0, 0, 0, 0.012),\\n  0px 8.4px 6.3px rgba(0, 0, 0, 0.014),\\n  0px 20px 15px rgba(0, 0, 0, 0.02)","20":"0px 0.6px 0.4px rgba(0, 0, 0, 0.006),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.008),\\n  0px 2.5px 1.9px rgba(0, 0, 0, 0.01),\\n  0px 4.5px 3.4px rgba(0, 0, 0, 0.012),\\n  0px 8.4px 6.3px rgba(0, 0, 0, 0.014),\\n  0px 20px 15px rgba(0, 0, 0, 0.02)","30":"0px 0.6px 0.4px rgba(0, 0, 0, 0.008),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.012),\\n  0px 2.5px 1.9px rgba(0, 0, 0, 0.015),\\n  0px 4.5px 3.4px rgba(0, 0, 0, 0.018),\\n  0px 8.4px 6.3px rgba(0, 0, 0, 0.022),\\n  0px 20px 15px rgba(0, 0, 0, 0.03)","40":"0px 0.8px 0.6px rgba(0, 0, 0, 0.008),\\n  0px 2px 1.3px rgba(0, 0, 0, 0.012),\\n  0px 3.8px 2.5px rgba(0, 0, 0, 0.015),\\n  0px 6.7px 4.5px rgba(0, 0, 0, 0.018),\\n  0px 12.5px 8.4px rgba(0, 0, 0, 0.022),\\n  0px 30px 20px rgba(0, 0, 0, 0.03)","50":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","60":"0px 1px 0.7px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 1.7px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.1px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 5.6px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 10.4px rgba(0, 0, 0, 0.029),\\n  0px 35px 25px rgba(0, 0, 0, 0.04)","70":"0px 1.1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.7px 2px rgba(0, 0, 0, 0.016),\\n  0px 5px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 8.9px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 16.7px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 40px 30px rgba(0, 0, 0, 0.04)","80":"0px 1.1px 1px rgba(0, 0, 0, 0.011),\\n  0px 2.7px 2.3px rgba(0, 0, 0, 0.016),\\n  0px 5px 4.4px rgba(0, 0, 0, 0.02),\\n  0px 8.9px 7.8px rgba(0, 0, 0, 0.024),\\n  0px 16.7px 14.6px rgba(0, 0, 0, 0.029),\\n  0px 40px 35px rgba(0, 0, 0, 0.04)","90":"0px 1.4px 1.1px rgba(0, 0, 0, 0.011),\\n  0px 3.3px 2.7px rgba(0, 0, 0, 0.016),\\n  0px 6.1px 5px rgba(0, 0, 0, 0.02),\\n  0px 10.9px 8.9px rgba(0, 0, 0, 0.024),\\n  0px 20.5px 16.7px rgba(0, 0, 0, 0.029),\\n  0px 49px 40px rgba(0, 0, 0, 0.04)","100":"0px 1.4px 1.4px rgba(0, 0, 0, 0.011),\\n  0px 3.3px 3.5px rgba(0, 0, 0, 0.016),\\n  0px 6.1px 6.5px rgba(0, 0, 0, 0.02),\\n  0px 10.9px 11.6px rgba(0, 0, 0, 0.024),\\n  0px 20.5px 21.7px rgba(0, 0, 0, 0.029),\\n  0px 49px 52px rgba(0, 0, 0, 0.04)","default":"0"},"size":{"0":0.25,"5":"0.5","10":0.65,"15":0.7,"20":0.75,"25":0.95,"30":1.1,"40":1.35,"50":1.8,"60":2.5,"70":3.2,"80":4.5,"90":7,"100":20,"default":"16px"},"font":{"family":{"default":{"fontFamily":"\\"Roboto\\"","fontWeight":400,"import":"https://fonts.googleapis.com/css2?family=Roboto&display=swap"},"title":{"fontFamily":"\\"Roboto\\"","fontWeight":500,"import":"https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap"},"quote":{"fontFamily":"\\"Palatino, Times, Georgia, serif\\"","fontWeight":"normal","fontStyle":"normal","fontDisplay":"auto","capHeight":0.65},"code":{"fontFamily":"Menlo, Monaco, Consolas, Courier New, monospace","fontWeight":"normal","fontStyle":"normal","fontDisplay":"auto","capHeight":0.65}},"size":{"0":0,"5":"0.5","10":0.65,"15":0.7,"20":0.75,"25":0.95,"30":1.1,"40":1.35,"50":1.8,"60":2.5,"70":3.2,"80":4.5,"90":7,"100":20,"default":"16px"}},"border":{"width":{"0":0,"10":1,"20":2,"30":4,"40":6,"50":8,"60":12,"70":16,"80":20,"90":24,"100":30,"default":"1px"},"radius":{"0":0,"10":0.8,"20":1.6,"30":2.4,"40":3.2,"50":4,"60":5.2,"70":6.4,"80":8,"90":10,"100":12,"default":"5px"}},"space":{"0":0,"10":0.375,"20":0.75,"30":1.4,"40":2,"50":3.5,"60":5,"70":7.5,"80":10,"90":15,"100":20,"default":"1rem"},"margin":{"0":0,"10":0.375,"20":0.75,"30":1.4,"40":2,"50":3.5,"60":5,"70":7.5,"80":10,"90":15,"100":20,"default":"1rem"},"padding":{"0":0,"10":0.375,"20":0.75,"30":1.4,"40":2,"50":3.5,"60":5,"70":7.5,"80":10,"90":15,"100":20,"default":"1rem"},"offsize":{"0":0,"10":0.375,"20":0.75,"30":1.4,"40":2,"50":3.5,"60":5,"70":7.5,"80":10,"90":15,"100":20,"default":"1rem"},"media":{"defaultAction":"<=","defaultMedia":"desktop","queries":{"mobile":{"minWidth":0,"maxWidth":639},"tablet":{"minWidth":640,"maxWidth":1279},"desktop":{"minWidth":1280,"maxWidth":2047},"wide":{"minWidth":2048,"maxWidth":null}}},"ui":{"default":{"paddingInline":1.25,"paddingBlock":0.75,"borderRadius":1,"borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultLnf":"solid","depth":"0","outline":true,"spacing":1.4,"rhythmVertical":{"margin-bottom":60}},"menu":{"paddingInline":2,"paddingBlock":1.4,"borderRadius":1,"borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultLnf":"solid","defaultType":"primary","depth":"0","rhythmVertical":{"margin-bottom":60}},"card":{"paddingInline":3.5,"paddingBlock":3.5},"form":{"paddingInline":1,"paddingBlock":0.75,"borderRadius":1,"transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","outline":true,"rhythmVertical":{"margin-bottom":40}},"outline":{"active":true,"borderWidth":"10px","borderRadius":1,"transition":"all .2s ease-out"},"scrollbar":{"size":"2px","color":"accent"},"label":{"defaultLnf":"inline"},"dropdown":{"paddingInline":0.75,"paddingBlock":0.75,"itemPaddingInline":1.25,"itemPaddingBlock":0.75},"list":{"defaultLnf":"dl","bulletChar":"-"},"fsTree":{"bulletChar":"●"},"tooltip":{"defaultPosition":"top","arrowSize":"15px"},"loader":{"duration":"1s","easing":"linear"}},"typo":{"h1":{"label":"H1","group":"style","style":{"display":"block","fontFamily":"title","fontSize":80,"lineHeight":1.3,"maxWidth":"55ch","mobile":{"fontSize":70}},"rhythmVertical":{"marginBottom":50}},"h2":{"label":"H2","group":"style","style":{"display":"block","fontFamily":"title","fontSize":70,"lineHeight":1.3,"maxWidth":"55ch","mobile":{"fontSize":60}},"rhythmVertical":{"marginBottom":50}},"h3":{"label":"H3","group":"style","style":{"display":"block","fontFamily":"title","fontSize":60,"lineHeight":1.3,"maxWidth":"55ch","mobile":{"fontSize":50}},"rhythmVertical":{"marginBottom":50}},"h4":{"label":"H4","group":"style","style":{"display":"block","fontFamily":"title","fontSize":50,"lineHeight":1.3,"maxWidth":"55ch","mobile":{"fontSize":40}},"rhythmVertical":{"marginBottom":50}},"h5":{"label":"H5","group":"style","style":{"display":"block","fontFamily":"title","fontSize":40,"lineHeight":1.3,"maxWidth":"55ch","mobile":{"fontSize":30}},"rhythmVertical":{"marginBottom":40}},"h6":{"label":"H6","group":"style","style":{"display":"block","fontFamily":"title","fontSize":30,"lineHeight":1.3,"maxWidth":"55ch","mobile":{"fontSize":30}},"hythmVertical":{"marginBottom":40}},"p":{"label":"Paragraph","group":"style","default":true,"style":{"display":"block","fontFamily":"default","fontSize":30,"lineHeight":1.8,"maxWidth":"55ch","color":["main","text","--alpha 0.7"]},"rhythmVertical":{"marginBottom":40}},"lead":{"label":"Lead paragraph","group":"style","style":{"display":"block","fontFamily":"default","fontSize":40,"lineHeight":1.6,"maxWidth":"55ch","mobile":{"fontSize":40}},"rhythmVertical":{"marginBottom":40}},"hr":{"label":"--","group":"block","button":{"label":"--"},"style":{"display":"block","color":"#808080","opacity":0.2},"rhythmVertical":{"marginBottom":50}},"pre:not([class])":{"label":"Pre","group":"text","style":{"display":"block","fontFamily":"code","color":["main","text"],"backgroundColor":["main","surface"],"lineHeight":1.5,"paddingInline":1.25,"paddingBlock":0.75,"borderRadius":1,"depth":"0"},"rhythmVertical":{"marginBottom":50}},"code:not(pre > code)":{"label":"Code","group":"text","button":{"label":"</>"},"style":{"display":"inline-block","fontFamily":"code","color":["main","text"],"lineHeight":1.1,"backgroundColor":["accent","surface"],"borderRadius":10,"paddingInline":10,"paddingBlock":0}},"blockquote":{"label":"Blockquote","group":"block","button":{"label":"<svg viewBox=\\"0 0 20 20\\"><path d=\\"M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z\\"></path></svg>"},"style":{"display":"block","fontFamily":"quote"},"editor":{"style":{"paddingInlineStart":1.25,"borderLeft":"1px solid #000"}},"rhythmVertical":{"marginBottom":50}},"a":{"label":"Link","group":"text","button":{"label":"<svg viewBox=\\"0 0 20 20\\"><path d=\\"m11.077 15 .991-1.416a.75.75 0 1 1 1.229.86l-1.148 1.64a.748.748 0 0 1-.217.206 5.251 5.251 0 0 1-8.503-5.955.741.741 0 0 1 .12-.274l1.147-1.639a.75.75 0 1 1 1.228.86L4.933 10.7l.006.003a3.75 3.75 0 0 0 6.132 4.294l.006.004zm5.494-5.335a.748.748 0 0 1-.12.274l-1.147 1.639a.75.75 0 1 1-1.228-.86l.86-1.23a3.75 3.75 0 0 0-6.144-4.301l-.86 1.229a.75.75 0 0 1-1.229-.86l1.148-1.64a.748.748 0 0 1 .217-.206 5.251 5.251 0 0 1 8.503 5.955zm-4.563-2.532a.75.75 0 0 1 .184 1.045l-3.155 4.505a.75.75 0 1 1-1.229-.86l3.155-4.506a.75.75 0 0 1 1.045-.184z\\"></path></svg>"},"style":{"color":"accent","textDecoration":"underline"}},"quote":{"label":"Quote","group":"text","button":{"label":"<svg viewBox=\\"0 0 20 20\\"><path d=\\"M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z\\"></path></svg>"},"style":{"fontFamily":"quote"},"rhythmVertical":{"marginBottom":50}},"bold":{"label":"Bold","group":"text","style":{"fontWeight":"bold"},"button":{"label":"B","style":{"fontWeight":"bolder"}}},"italic":{"label":"Italic","group":"text","style":{"fontStyle":"italic"},"button":{"label":"I","style":{"fontStyle":"italic"}}},"large":{"label":"Large","group":"text","style":{"fontSize":"1.1em"},"button":{"label":"A","style":{"fontSize":"1.01em"}}},"larger":{"label":"Larger","group":"text","style":{"fontSize":"1.2em"},"button":{"label":"A","style":{"fontSize":"1.02em"}}},"largest":{"label":"Largest","group":"text","style":{"fontSize":"1.3em"},"button":{"label":"A","style":{"fontSize":"1.03em"}}},"small":{"label":"Small","group":"text","style":{"fontSize":"0.9em"},"button":{"label":"A","style":{"fontSize":"0.99em"}}},"smaller":{"label":"Smaller","group":"text","style":{"fontSize":"0.8em"},"button":{"label":"A","style":{"fontSize":"0.98em"}}},"smallest":{"label":"Smallest","group":"text","style":{"fontSize":"0.7em"},"button":{"label":"A","style":{"fontSize":"0.97em"}}},"mark":{"label":"Mark","group":"text","button":{"label":"M"},"style":{"backgroundColor":"#ffbb00"}},"del":{"label":"Deleted","group":"text","style":{"textDecoration":"line-through"},"button":{"label":"D","style":{"textDecoration":"line-through"}}},"ins":{"label":"Inserted","group":"text","style":{"textDecoration":"underline"},"button":{"label":"U","style":{"textDecoration":"underline"}}},"sub":{"label":"Subscript","group":"text","style":{"verticalAlign":"sub","fontSize":"0.6em"},"button":{"label":"Sub","style":{"verticalAlign":"sub","fontSize":"0.6em"}}},"sup":{"label":"Superscript","group":"text","style":{"verticalAlign":"sup","fontSize":"0.6em"},"button":{"label":"Sup","style":{"verticalAlign":"sup","fontSize":"0.6em"}}},"main":{"label":"Main","group":"color","type":"color","style":{"color":"#808080"}},"mainGradient":{"label":"Main gradient","group":"color","type":"color","style":{"backgroundSize":"100%","-webkitBackgroundClip":"text","-mozBackgroundClip":"text","-webkitTextFillColor":"transparent","-mozTextFillColor":"transparent","backgroundImage":"linear-gradient(90deg, #808080 0%, #8c8c8c 100%)"}},"accent":{"label":"Accent","group":"color","type":"color","style":{"color":"#ffbb00"}},"accentGradient":{"label":"Accent gradient","group":"color","type":"color","style":{"backgroundSize":"100%","-webkitBackgroundClip":"text","-mozBackgroundClip":"text","-webkitTextFillColor":"transparent","-mozTextFillColor":"transparent","backgroundImage":"linear-gradient(90deg, #ffbb00 0%, #ffc21a 100%)"}},"complementary":{"label":"Complementary","group":"color","type":"color","style":{"color":"#8054F9"}},"complementaryGradient":{"label":"Complementary gradient","group":"color","type":"color","style":{"backgroundSize":"100%","-webkitBackgroundClip":"text","-mozBackgroundClip":"text","-webkitTextFillColor":"transparent","-mozTextFillColor":"transparent","backgroundImage":"linear-gradient(90deg, #8054F9 0%, #916bfa 100%)"}},"success":{"label":"Success","group":"color","type":"color","style":{"color":"#91ff00"}},"successGradient":{"label":"Success gradient","group":"color","type":"color","style":{"backgroundSize":"100%","-webkitBackgroundClip":"text","-mozBackgroundClip":"text","-webkitTextFillColor":"transparent","-mozTextFillColor":"transparent","backgroundImage":"linear-gradient(90deg, #91ff00 0%, #9cff1a 100%)"}},"warning":{"label":"Warning","group":"color","type":"color","style":{"color":"#ffd500"}},"warningGradient":{"label":"Warning gradient","group":"color","type":"color","style":{"backgroundSize":"100%","-webkitBackgroundClip":"text","-mozBackgroundClip":"text","-webkitTextFillColor":"transparent","-mozTextFillColor":"transparent","backgroundImage":"linear-gradient(90deg, #ffd500 0%, #ffd91a 100%)"}},"error":{"label":"Error","group":"color","type":"color","style":{"color":"#ff003b"}},"errorGradient":{"label":"Error gradient","group":"color","type":"color","style":{"backgroundSize":"100%","-webkitBackgroundClip":"text","-mozBackgroundClip":"text","-webkitTextFillColor":"transparent","-mozTextFillColor":"transparent","backgroundImage":"linear-gradient(90deg, #ff003b 0%, #ff1a4f 100%)"}},"info":{"label":"Info","group":"color","type":"color","style":{"color":"#00ffff"}},"infoGradient":{"label":"Info gradient","group":"color","type":"color","style":{"backgroundSize":"100%","-webkitBackgroundClip":"text","-mozBackgroundClip":"text","-webkitTextFillColor":"transparent","-mozTextFillColor":"transparent","backgroundImage":"linear-gradient(90deg, #00ffff 0%, #1affff 100%)"}}},"wireframe":{"light":{"border":"1px solid rgba(0,0,0,0.1)","borderColor":"rgba(0,0,0,0.1)","background":"#ffffff","surface":"#fafafa"},"dark":{"border":"1px solid rgba(255,255,255,0.2)","borderColor":"rgba(255,255,255,0.2)","background":"#2D323A","surface":"#3B424C"}},"metas":{"title":"Default light","description":"Nice and elegant light theme"},"shades":{"text":{"darken":0,"color":{"main":{"darken":15},"complementary":{"lighten":15},"info":{"darken":10}}},"placeholder":{"darken":0,"alpha":0.4},"foreground":{"lighten":50},"background":{"lighten":50},"surface":{"lighten":40,"color":{"main":{"lighten":49}}},"ui":{"lighten":49},"border":{"alpha":0.2},"hover":{"lighten":40},"active":{"darken":10},"gradientStart":{"lighten":0},"gradientEnd":{"lighten":20}}},"default-dark":{"defaultColor":"main","color":{"current":"#808080","main":"#808080","accent":"#ffbb00","complementary":"#8054F9","success":"#91ff00","warning":"#ffd500","error":"#ff003b","info":"#00ffff"},"classmap":{"enabled":false,"url":"/classmap.json"},"lod":{"enabled":false,"defaultLevel":3,"botLevel":1,"levels":{"0":{"name":"bare","speedIndex":0},"1":{"name":"lnf","speedIndex":30},"2":{"name":"theme","speedIndex":40},"3":{"name":"high","speedIndex":50},"4":{"name":"ultra","speedIndex":60}},"method":"class","defaultAction":">=","cssProperties":{}},"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"scroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0},"partytown":{"enabled":false,"forward":["dataLayer.push","fbq","freshpaint.addPageviewProperties","freshpaint.identify","freshpaint.track","_hsq.push","Intercom","_learnq.push","ttq.track","ttq.page","ttq.load","mixpanel.track"]},"timing":{"slow":".6s","default":".3s","fast":".1s"},"transition":{"slow":"all .6s cubic-bezier(0.700, 0.000, 0.305, 0.995)","default":"all .3s cubic-bezier(0.700, 0.000, 0.305, 0.995)","fast":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"gradient":{"defaultModifierStart":{},"defaultModifierEnd":{"lighten":20},"defaultX":"50%","defaultY":"50%","defaultAngle":"90deg","defaultTextModifierStart":{"darken":5},"defaultTextModifierEnd":{"lighten":5},"defaultTextAngle":"90deg"},"helpers":{"states":["mounted","active","loading"],"clearfix":{"default":"overflow"},"disabled":{"opacity":0.4},"truncate":{"count":10},"order":{"count":20}},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"ratio":{"1":1,"16-9":1.7777777777777777,"16-10":1.6,"21-9":2.3333333333333335,"1-2":0.5,"2-1":2,"2-3":0.6666666666666666,"3-2":1.5,"4-3":1.3333333333333333,"3-4":0.75},"scalable":{"margin":false,"padding":true,"offsize":false,"font":true},"scale":{"10":1,"11":1.1,"12":1.2,"13":1.3,"14":1.4,"15":1.5,"16":1.6,"17":1.7,"18":1.8,"19":1.9,"20":2,"default":1,"01":0.1,"02":0.2,"03":0.3,"04":0.4,"05":0.5,"06":0.6,"07":0.7,"08":0.8,"09":0.9},"opacity":{"0":0,"10":0.1,"20":0.2,"30":0.3,"40":0.4,"50":0.5,"60":0.6,"70":0.7,"80":0.8,"90":0.9,"100":1},"width":{"0":"0","10":"10%","20":"20%","30":"30%","40":"40%","50":"50%","60":"60%","70":"70%","80":"80%","90":"90%","100":"100%"},"height":{"0":"0","10":"10%","20":"20%","30":"30%","40":"40%","50":"50%","60":"60%","70":"70%","80":"80%","90":"90%","100":"100%"},"depth":{"0":"0","5":"0px 0.6px 0.4px rgba(0, 0, 0, 0.006),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.006),\\n  0px 2.5px 1.5px rgba(0, 0, 0, 0.005),\\n  0px 3.5px 3.4px rgba(0, 0, 0, 0.006),\\n  0px 4.4px 4.3px rgba(0, 0, 0, 0.007),\\n  0px 10px 10px rgba(0, 0, 0, 0.01)","10":"0px 0.6px 0.4px rgba(0, 0, 0, 0.006),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.008),\\n  0px 2.5px 1.9px rgba(0, 0, 0, 0.01),\\n  0px 4.5px 3.4px rgba(0, 0, 0, 0.012),\\n  0px 8.4px 6.3px rgba(0, 0, 0, 0.014),\\n  0px 20px 15px rgba(0, 0, 0, 0.02)","20":"0px 0.6px 0.4px rgba(0, 0, 0, 0.006),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.008),\\n  0px 2.5px 1.9px rgba(0, 0, 0, 0.01),\\n  0px 4.5px 3.4px rgba(0, 0, 0, 0.012),\\n  0px 8.4px 6.3px rgba(0, 0, 0, 0.014),\\n  0px 20px 15px rgba(0, 0, 0, 0.02)","30":"0px 0.6px 0.4px rgba(0, 0, 0, 0.008),\\n  0px 1.3px 1px rgba(0, 0, 0, 0.012),\\n  0px 2.5px 1.9px rgba(0, 0, 0, 0.015),\\n  0px 4.5px 3.4px rgba(0, 0, 0, 0.018),\\n  0px 8.4px 6.3px rgba(0, 0, 0, 0.022),\\n  0px 20px 15px rgba(0, 0, 0, 0.03)","40":"0px 0.8px 0.6px rgba(0, 0, 0, 0.008),\\n  0px 2px 1.3px rgba(0, 0, 0, 0.012),\\n  0px 3.8px 2.5px rgba(0, 0, 0, 0.015),\\n  0px 6.7px 4.5px rgba(0, 0, 0, 0.018),\\n  0px 12.5px 8.4px rgba(0, 0, 0, 0.022),\\n  0px 30px 20px rgba(0, 0, 0, 0.03)","50":"0px 1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 2px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 35px 30px rgba(0, 0, 0, 0.04)","60":"0px 1px 0.7px rgba(0, 0, 0, 0.011),\\n  0px 2.3px 1.7px rgba(0, 0, 0, 0.016),\\n  0px 4.4px 3.1px rgba(0, 0, 0, 0.02),\\n  0px 7.8px 5.6px rgba(0, 0, 0, 0.024),\\n  0px 14.6px 10.4px rgba(0, 0, 0, 0.029),\\n  0px 35px 25px rgba(0, 0, 0, 0.04)","70":"0px 1.1px 0.8px rgba(0, 0, 0, 0.011),\\n  0px 2.7px 2px rgba(0, 0, 0, 0.016),\\n  0px 5px 3.8px rgba(0, 0, 0, 0.02),\\n  0px 8.9px 6.7px rgba(0, 0, 0, 0.024),\\n  0px 16.7px 12.5px rgba(0, 0, 0, 0.029),\\n  0px 40px 30px rgba(0, 0, 0, 0.04)","80":"0px 1.1px 1px rgba(0, 0, 0, 0.011),\\n  0px 2.7px 2.3px rgba(0, 0, 0, 0.016),\\n  0px 5px 4.4px rgba(0, 0, 0, 0.02),\\n  0px 8.9px 7.8px rgba(0, 0, 0, 0.024),\\n  0px 16.7px 14.6px rgba(0, 0, 0, 0.029),\\n  0px 40px 35px rgba(0, 0, 0, 0.04)","90":"0px 1.4px 1.1px rgba(0, 0, 0, 0.011),\\n  0px 3.3px 2.7px rgba(0, 0, 0, 0.016),\\n  0px 6.1px 5px rgba(0, 0, 0, 0.02),\\n  0px 10.9px 8.9px rgba(0, 0, 0, 0.024),\\n  0px 20.5px 16.7px rgba(0, 0, 0, 0.029),\\n  0px 49px 40px rgba(0, 0, 0, 0.04)","100":"0px 1.4px 1.4px rgba(0, 0, 0, 0.011),\\n  0px 3.3px 3.5px rgba(0, 0, 0, 0.016),\\n  0px 6.1px 6.5px rgba(0, 0, 0, 0.02),\\n  0px 10.9px 11.6px rgba(0, 0, 0, 0.024),\\n  0px 20.5px 21.7px rgba(0, 0, 0, 0.029),\\n  0px 49px 52px rgba(0, 0, 0, 0.04)","default":"0"},"size":{"0":0.25,"5":"0.5","10":0.65,"15":0.7,"20":0.75,"25":0.95,"30":1.1,"40":1.35,"50":1.8,"60":2.5,"70":3.2,"80":4.5,"90":7,"100":20,"default":"16px"},"font":{"family":{"default":{"fontFamily":"\\"Roboto\\"","fontWeight":400,"import":"https://fonts.googleapis.com/css2?family=Roboto&display=swap"},"title":{"fontFamily":"\\"Roboto\\"","fontWeight":500,"import":"https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap"},"quote":{"fontFamily":"\\"Palatino, Times, Georgia, serif\\"","fontWeight":"normal","fontStyle":"normal","fontDisplay":"auto","capHeight":0.65},"code":{"fontFamily":"Menlo, Monaco, Consolas, Courier New, monospace","fontWeight":"normal","fontStyle":"normal","fontDisplay":"auto","capHeight":0.65}},"size":{"0":0,"5":"0.5","10":0.65,"15":0.7,"20":0.75,"25":0.95,"30":1.1,"40":1.35,"50":1.8,"60":2.5,"70":3.2,"80":4.5,"90":7,"100":20,"default":"16px"}},"border":{"width":{"0":0,"10":1,"20":2,"30":4,"40":6,"50":8,"60":12,"70":16,"80":20,"90":24,"100":30,"default":"1px"},"radius":{"0":0,"10":0.8,"20":1.6,"30":2.4,"40":3.2,"50":4,"60":5.2,"70":6.4,"80":8,"90":10,"100":12,"default":"5px"}},"space":{"0":0,"10":0.375,"20":0.75,"30":1.4,"40":2,"50":3.5,"60":5,"70":7.5,"80":10,"90":15,"100":20,"default":"1rem"},"margin":{"0":0,"10":0.375,"20":0.75,"30":1.4,"40":2,"50":3.5,"60":5,"70":7.5,"80":10,"90":15,"100":20,"default":"1rem"},"padding":{"0":0,"10":0.375,"20":0.75,"30":1.4,"40":2,"50":3.5,"60":5,"70":7.5,"80":10,"90":15,"100":20,"default":"1rem"},"offsize":{"0":0,"10":0.375,"20":0.75,"30":1.4,"40":2,"50":3.5,"60":5,"70":7.5,"80":10,"90":15,"100":20,"default":"1rem"},"media":{"defaultAction":"<=","defaultMedia":"desktop","queries":{"mobile":{"minWidth":0,"maxWidth":639},"tablet":{"minWidth":640,"maxWidth":1279},"desktop":{"minWidth":1280,"maxWidth":2047},"wide":{"minWidth":2048,"maxWidth":null}}},"ui":{"default":{"paddingInline":1.25,"paddingBlock":0.75,"borderRadius":1,"borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultLnf":"solid","depth":"0","outline":true,"spacing":1.4,"rhythmVertical":{"margin-bottom":60}},"menu":{"paddingInline":2,"paddingBlock":1.4,"borderRadius":1,"borderWidth":"1px","transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","defaultLnf":"solid","defaultType":"primary","depth":"0","rhythmVertical":{"margin-bottom":60}},"card":{"paddingInline":3.5,"paddingBlock":3.5},"form":{"paddingInline":1,"paddingBlock":0.75,"borderRadius":1,"transition":"all .1s cubic-bezier(0.700, 0.000, 0.305, 0.995)","outline":true,"rhythmVertical":{"margin-bottom":40}},"outline":{"active":true,"borderWidth":"10px","borderRadius":1,"transition":"all .2s ease-out"},"scrollbar":{"size":"2px","color":"accent"},"label":{"defaultLnf":"inline"},"dropdown":{"paddingInline":0.75,"paddingBlock":0.75,"itemPaddingInline":1.25,"itemPaddingBlock":0.75},"list":{"defaultLnf":"dl","bulletChar":"-"},"fsTree":{"bulletChar":"●"},"tooltip":{"defaultPosition":"top","arrowSize":"15px"},"loader":{"duration":"1s","easing":"linear"}},"typo":{"h1":{"label":"H1","group":"style","style":{"display":"block","fontFamily":"title","fontSize":80,"lineHeight":1.3,"maxWidth":"55ch","mobile":{"fontSize":70}},"rhythmVertical":{"marginBottom":50}},"h2":{"label":"H2","group":"style","style":{"display":"block","fontFamily":"title","fontSize":70,"lineHeight":1.3,"maxWidth":"55ch","mobile":{"fontSize":60}},"rhythmVertical":{"marginBottom":50}},"h3":{"label":"H3","group":"style","style":{"display":"block","fontFamily":"title","fontSize":60,"lineHeight":1.3,"maxWidth":"55ch","mobile":{"fontSize":50}},"rhythmVertical":{"marginBottom":50}},"h4":{"label":"H4","group":"style","style":{"display":"block","fontFamily":"title","fontSize":50,"lineHeight":1.3,"maxWidth":"55ch","mobile":{"fontSize":40}},"rhythmVertical":{"marginBottom":50}},"h5":{"label":"H5","group":"style","style":{"display":"block","fontFamily":"title","fontSize":40,"lineHeight":1.3,"maxWidth":"55ch","mobile":{"fontSize":30}},"rhythmVertical":{"marginBottom":40}},"h6":{"label":"H6","group":"style","style":{"display":"block","fontFamily":"title","fontSize":30,"lineHeight":1.3,"maxWidth":"55ch","mobile":{"fontSize":30}},"hythmVertical":{"marginBottom":40}},"p":{"label":"Paragraph","group":"style","default":true,"style":{"display":"block","fontFamily":"default","fontSize":30,"lineHeight":1.8,"maxWidth":"55ch","color":["main","text","--alpha 0.7"]},"rhythmVertical":{"marginBottom":40}},"lead":{"label":"Lead paragraph","group":"style","style":{"display":"block","fontFamily":"default","fontSize":40,"lineHeight":1.6,"maxWidth":"55ch","mobile":{"fontSize":40}},"rhythmVertical":{"marginBottom":40}},"hr":{"label":"--","group":"block","button":{"label":"--"},"style":{"display":"block","color":"#808080","opacity":0.2},"rhythmVertical":{"marginBottom":50}},"pre:not([class])":{"label":"Pre","group":"text","style":{"display":"block","fontFamily":"code","color":["main","text"],"backgroundColor":["main","surface"],"lineHeight":1.5,"paddingInline":1.25,"paddingBlock":0.75,"borderRadius":1,"depth":"0"},"rhythmVertical":{"marginBottom":50}},"code:not(pre > code)":{"label":"Code","group":"text","button":{"label":"</>"},"style":{"display":"inline-block","fontFamily":"code","color":["main","text"],"lineHeight":1.1,"backgroundColor":["accent","surface"],"borderRadius":10,"paddingInline":10,"paddingBlock":0}},"blockquote":{"label":"Blockquote","group":"block","button":{"label":"<svg viewBox=\\"0 0 20 20\\"><path d=\\"M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z\\"></path></svg>"},"style":{"display":"block","fontFamily":"quote"},"editor":{"style":{"paddingInlineStart":1.25,"borderLeft":"1px solid #000"}},"rhythmVertical":{"marginBottom":50}},"a":{"label":"Link","group":"text","button":{"label":"<svg viewBox=\\"0 0 20 20\\"><path d=\\"m11.077 15 .991-1.416a.75.75 0 1 1 1.229.86l-1.148 1.64a.748.748 0 0 1-.217.206 5.251 5.251 0 0 1-8.503-5.955.741.741 0 0 1 .12-.274l1.147-1.639a.75.75 0 1 1 1.228.86L4.933 10.7l.006.003a3.75 3.75 0 0 0 6.132 4.294l.006.004zm5.494-5.335a.748.748 0 0 1-.12.274l-1.147 1.639a.75.75 0 1 1-1.228-.86l.86-1.23a3.75 3.75 0 0 0-6.144-4.301l-.86 1.229a.75.75 0 0 1-1.229-.86l1.148-1.64a.748.748 0 0 1 .217-.206 5.251 5.251 0 0 1 8.503 5.955zm-4.563-2.532a.75.75 0 0 1 .184 1.045l-3.155 4.505a.75.75 0 1 1-1.229-.86l3.155-4.506a.75.75 0 0 1 1.045-.184z\\"></path></svg>"},"style":{"color":"accent","textDecoration":"underline"}},"quote":{"label":"Quote","group":"text","button":{"label":"<svg viewBox=\\"0 0 20 20\\"><path d=\\"M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z\\"></path></svg>"},"style":{"fontFamily":"quote"},"rhythmVertical":{"marginBottom":50}},"bold":{"label":"Bold","group":"text","style":{"fontWeight":"bold"},"button":{"label":"B","style":{"fontWeight":"bolder"}}},"italic":{"label":"Italic","group":"text","style":{"fontStyle":"italic"},"button":{"label":"I","style":{"fontStyle":"italic"}}},"large":{"label":"Large","group":"text","style":{"fontSize":"1.1em"},"button":{"label":"A","style":{"fontSize":"1.01em"}}},"larger":{"label":"Larger","group":"text","style":{"fontSize":"1.2em"},"button":{"label":"A","style":{"fontSize":"1.02em"}}},"largest":{"label":"Largest","group":"text","style":{"fontSize":"1.3em"},"button":{"label":"A","style":{"fontSize":"1.03em"}}},"small":{"label":"Small","group":"text","style":{"fontSize":"0.9em"},"button":{"label":"A","style":{"fontSize":"0.99em"}}},"smaller":{"label":"Smaller","group":"text","style":{"fontSize":"0.8em"},"button":{"label":"A","style":{"fontSize":"0.98em"}}},"smallest":{"label":"Smallest","group":"text","style":{"fontSize":"0.7em"},"button":{"label":"A","style":{"fontSize":"0.97em"}}},"mark":{"label":"Mark","group":"text","button":{"label":"M"},"style":{"backgroundColor":"#ffbb00"}},"del":{"label":"Deleted","group":"text","style":{"textDecoration":"line-through"},"button":{"label":"D","style":{"textDecoration":"line-through"}}},"ins":{"label":"Inserted","group":"text","style":{"textDecoration":"underline"},"button":{"label":"U","style":{"textDecoration":"underline"}}},"sub":{"label":"Subscript","group":"text","style":{"verticalAlign":"sub","fontSize":"0.6em"},"button":{"label":"Sub","style":{"verticalAlign":"sub","fontSize":"0.6em"}}},"sup":{"label":"Superscript","group":"text","style":{"verticalAlign":"sup","fontSize":"0.6em"},"button":{"label":"Sup","style":{"verticalAlign":"sup","fontSize":"0.6em"}}},"main":{"label":"Main","group":"color","type":"color","style":{"color":"#808080"}},"mainGradient":{"label":"Main gradient","group":"color","type":"color","style":{"backgroundSize":"100%","-webkitBackgroundClip":"text","-mozBackgroundClip":"text","-webkitTextFillColor":"transparent","-mozTextFillColor":"transparent","backgroundImage":"linear-gradient(90deg, #808080 0%, #8c8c8c 100%)"}},"accent":{"label":"Accent","group":"color","type":"color","style":{"color":"#ffbb00"}},"accentGradient":{"label":"Accent gradient","group":"color","type":"color","style":{"backgroundSize":"100%","-webkitBackgroundClip":"text","-mozBackgroundClip":"text","-webkitTextFillColor":"transparent","-mozTextFillColor":"transparent","backgroundImage":"linear-gradient(90deg, #ffbb00 0%, #ffc21a 100%)"}},"complementary":{"label":"Complementary","group":"color","type":"color","style":{"color":"#8054F9"}},"complementaryGradient":{"label":"Complementary gradient","group":"color","type":"color","style":{"backgroundSize":"100%","-webkitBackgroundClip":"text","-mozBackgroundClip":"text","-webkitTextFillColor":"transparent","-mozTextFillColor":"transparent","backgroundImage":"linear-gradient(90deg, #8054F9 0%, #916bfa 100%)"}},"success":{"label":"Success","group":"color","type":"color","style":{"color":"#91ff00"}},"successGradient":{"label":"Success gradient","group":"color","type":"color","style":{"backgroundSize":"100%","-webkitBackgroundClip":"text","-mozBackgroundClip":"text","-webkitTextFillColor":"transparent","-mozTextFillColor":"transparent","backgroundImage":"linear-gradient(90deg, #91ff00 0%, #9cff1a 100%)"}},"warning":{"label":"Warning","group":"color","type":"color","style":{"color":"#ffd500"}},"warningGradient":{"label":"Warning gradient","group":"color","type":"color","style":{"backgroundSize":"100%","-webkitBackgroundClip":"text","-mozBackgroundClip":"text","-webkitTextFillColor":"transparent","-mozTextFillColor":"transparent","backgroundImage":"linear-gradient(90deg, #ffd500 0%, #ffd91a 100%)"}},"error":{"label":"Error","group":"color","type":"color","style":{"color":"#ff003b"}},"errorGradient":{"label":"Error gradient","group":"color","type":"color","style":{"backgroundSize":"100%","-webkitBackgroundClip":"text","-mozBackgroundClip":"text","-webkitTextFillColor":"transparent","-mozTextFillColor":"transparent","backgroundImage":"linear-gradient(90deg, #ff003b 0%, #ff1a4f 100%)"}},"info":{"label":"Info","group":"color","type":"color","style":{"color":"#00ffff"}},"infoGradient":{"label":"Info gradient","group":"color","type":"color","style":{"backgroundSize":"100%","-webkitBackgroundClip":"text","-mozBackgroundClip":"text","-webkitTextFillColor":"transparent","-mozTextFillColor":"transparent","backgroundImage":"linear-gradient(90deg, #00ffff 0%, #1affff 100%)"}}},"wireframe":{"light":{"border":"1px solid rgba(0,0,0,0.1)","borderColor":"rgba(0,0,0,0.1)","background":"#ffffff","surface":"#fafafa"},"dark":{"border":"1px solid rgba(255,255,255,0.2)","borderColor":"rgba(255,255,255,0.2)","background":"#2D323A","surface":"#3B424C"}},"metas":{"title":"Default dark","description":"Nice and elegant dark theme"},"shades":{"text":{"lighten":15,"color":{"main":{"lighten":50}}},"placeholder":{"lighten":50,"alpha":0.4},"foreground":{"lighten":50},"background":{"darken":30},"surface":{"darken":25},"ui":{"darken":28},"border":{"alpha":0.4},"hover":{"lighten":40},"active":{"darken":10},"gradientStart":{"lighten":0},"gradientEnd":{"darken":20}}}}},"ts":{"compilerOptions":{"moduleResolution":"node","sourceMap":true}}}},"FRONTSPEC":{"$custom":{"menus":{"primary":{"name":"Primary menu"},"footer":{"name":"Footer menu"}},"metas":{"backgroundColor":"#2c323a"}},"metas":{"lang":"en","title":"@example/01-basic","homepage":"https://coffeekraken.io","description":"","keywords":[],"themeColor":"#ffbb00","author":{"name":"","email":"","url":""},"og":{"title":"@example/01-basic","description":"","type":"website","url":"https://coffeekraken.io","image":"https://cdnv2.coffeekraken.io/global/coffeekraken-og.png"},"backgroundColor":"#2c323a"},"package":{"name":"@example/01-basic","description":"","version":"2.0.0-alpha.27","author":{"name":"","email":"","url":""},"license":"AGPL-version-3.0"},"favicon":{"rootDir":"./dist/favicon","fileName":"favicon.html","filePath":"./dist/favicon/favicon.html"},"theme":{"theme":"default","variant":"light","themes":{"default-light":{"title":"Default light","description":"Nice and elegant light theme"},"default-dark":{"title":"Default dark","description":"Nice and elegant dark theme"}},"lnf":{"margin":{"0":0,"10":0.375,"20":0.75,"30":1.4,"40":2,"50":3.5,"60":5,"70":7.5,"80":10,"90":15,"100":20,"default":"1rem"},"padding":{"0":0,"10":0.375,"20":0.75,"30":1.4,"40":2,"50":3.5,"60":5,"70":7.5,"80":10,"90":15,"100":20,"default":"1rem"},"font":{"family":{"default":{"fontFamily":"\\"Roboto\\"","fontWeight":400,"import":"https://fonts.googleapis.com/css2?family=Roboto&display=swap"},"title":{"fontFamily":"\\"Roboto\\"","fontWeight":500,"import":"https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap"},"quote":{"fontFamily":"\\"Palatino, Times, Georgia, serif\\"","fontWeight":"normal","fontStyle":"normal","fontDisplay":"auto","capHeight":0.65},"code":{"fontFamily":"Menlo, Monaco, Consolas, Courier New, monospace","fontWeight":"normal","fontStyle":"normal","fontDisplay":"auto","capHeight":0.65}},"size":{"0":0,"5":"0.5","10":0.65,"15":0.7,"20":0.75,"25":0.95,"30":1.1,"40":1.35,"50":1.8,"60":2.5,"70":3.2,"80":4.5,"90":7,"100":20,"default":"16px"}},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"typo":{"h1":{"label":"H1","group":"style","button":{},"editor":{},"style":{"display":"block","fontFamily":"\\"Roboto\\"","fontSize":"72px","lineHeight":1.3,"maxWidth":"55ch","marginBottom":"3.5rem"}},"h2":{"label":"H2","group":"style","button":{},"editor":{},"style":{"display":"block","fontFamily":"\\"Roboto\\"","fontSize":"40px","lineHeight":1.3,"maxWidth":"55ch","marginBottom":"3.5rem"}},"h3":{"label":"H3","group":"style","button":{},"editor":{},"style":{"display":"block","fontFamily":"\\"Roboto\\"","fontSize":"28.8px","lineHeight":1.3,"maxWidth":"55ch","marginBottom":"3.5rem"}},"h4":{"label":"H4","group":"style","button":{},"editor":{},"style":{"display":"block","fontFamily":"\\"Roboto\\"","fontSize":"21.6px","lineHeight":1.3,"maxWidth":"55ch","marginBottom":"3.5rem"}},"h5":{"label":"H5","group":"style","button":{},"editor":{},"style":{"display":"block","fontFamily":"\\"Roboto\\"","fontSize":"17.6px","lineHeight":1.3,"maxWidth":"55ch","marginBottom":"2rem"}},"h6":{"label":"H6","group":"style","button":{},"editor":{},"style":{"display":"block","fontFamily":"\\"Roboto\\"","fontSize":"12px","lineHeight":1.3,"maxWidth":"55ch"}},"p":{"label":"Paragraph","group":"style","button":{},"editor":{},"style":{"display":"block","fontFamily":"\\"Roboto\\"","fontSize":"17.6px","lineHeight":1.8,"maxWidth":"55ch","color":"#5a6472","marginBottom":"2rem"},"default":true},"lead":{"label":"Lead paragraph","group":"style","button":{},"editor":{},"style":{"display":"block","fontFamily":"\\"Roboto\\"","fontSize":"21.6px","lineHeight":1.6,"maxWidth":"55ch","marginBottom":"2rem"}},"hr":{"label":"--","group":"block","button":{"label":"--"},"editor":{},"style":{"display":"block","color":"#707c8f","opacity":0.2,"marginBottom":"3.5rem"}},"pre":{"label":"Pre","group":"text","button":{},"editor":{},"style":{"display":"block","fontFamily":"Menlo, Monaco, Consolas, Courier New, monospace","color":"#5a6472","backgroundColor":"#fcfcfd","lineHeight":1.5,"paddingInline":"1.25rem","paddingBlock":"0.75rem","borderRadius":"5px","depth":"0","marginBottom":"3.5rem"}},"code":{"label":"Code","group":"text","button":{"label":"</>"},"editor":{},"style":{"display":"inline-block","fontFamily":"Menlo, Monaco, Consolas, Courier New, monospace","color":"#5a6472","lineHeight":1.1,"backgroundColor":"#fff1cc","borderRadius":"4px","paddingInline":"0.375rem","paddingBlock":"0rem"}},"blockquote":{"label":"Blockquote","group":"block","button":{"label":"<svg viewBox=\\"0 0 20 20\\"><path d=\\"M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z\\"></path></svg>"},"editor":{"style":{"paddingInlineStart":1.25,"borderLeft":"1px solid #000"}},"style":{"display":"block","fontFamily":"\\"Palatino, Times, Georgia, serif\\"","marginBottom":"3.5rem"}},"a":{"label":"Link","group":"text","button":{"label":"<svg viewBox=\\"0 0 20 20\\"><path d=\\"m11.077 15 .991-1.416a.75.75 0 1 1 1.229.86l-1.148 1.64a.748.748 0 0 1-.217.206 5.251 5.251 0 0 1-8.503-5.955.741.741 0 0 1 .12-.274l1.147-1.639a.75.75 0 1 1 1.228.86L4.933 10.7l.006.003a3.75 3.75 0 0 0 6.132 4.294l.006.004zm5.494-5.335a.748.748 0 0 1-.12.274l-1.147 1.639a.75.75 0 1 1-1.228-.86l.86-1.23a3.75 3.75 0 0 0-6.144-4.301l-.86 1.229a.75.75 0 0 1-1.229-.86l1.148-1.64a.748.748 0 0 1 .217-.206 5.251 5.251 0 0 1 8.503 5.955zm-4.563-2.532a.75.75 0 0 1 .184 1.045l-3.155 4.505a.75.75 0 1 1-1.229-.86l3.155-4.506a.75.75 0 0 1 1.045-.184z\\"></path></svg>"},"editor":{},"style":{"color":"#ffbb00","textDecoration":"underline"}},"quote":{"label":"Quote","group":"text","button":{"label":"<svg viewBox=\\"0 0 20 20\\"><path d=\\"M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z\\"></path></svg>"},"editor":{},"style":{"fontFamily":"\\"Palatino, Times, Georgia, serif\\"","marginBottom":"3.5rem"}},"bold":{"label":"Bold","group":"text","button":{"label":"B","style":{"fontWeight":"bolder"}},"editor":{},"style":{"fontWeight":"bold"}},"italic":{"label":"Italic","group":"text","button":{"label":"I","style":{"fontStyle":"italic"}},"editor":{},"style":{"fontStyle":"italic"}},"large":{"label":"Large","group":"text","button":{"label":"A","style":{"fontSize":"1.01em"}},"editor":{},"style":{"fontSize":"1.1em"}},"larger":{"label":"Larger","group":"text","button":{"label":"A","style":{"fontSize":"1.02em"}},"editor":{},"style":{"fontSize":"1.2em"}},"largest":{"label":"Largest","group":"text","button":{"label":"A","style":{"fontSize":"1.03em"}},"editor":{},"style":{"fontSize":"1.3em"}},"small":{"label":"Small","group":"text","button":{"label":"A","style":{"fontSize":"0.99em"}},"editor":{},"style":{"fontSize":"0.9em"}},"smaller":{"label":"Smaller","group":"text","button":{"label":"A","style":{"fontSize":"0.98em"}},"editor":{},"style":{"fontSize":"0.8em"}},"smallest":{"label":"Smallest","group":"text","button":{"label":"A","style":{"fontSize":"0.97em"}},"editor":{},"style":{"fontSize":"0.7em"}},"mark":{"label":"Mark","group":"text","button":{"label":"M"},"editor":{},"style":{"backgroundColor":"#ffbb00"}},"del":{"label":"Deleted","group":"text","button":{"label":"D","style":{"textDecoration":"line-through"}},"editor":{},"style":{"textDecoration":"line-through"}},"ins":{"label":"Inserted","group":"text","button":{"label":"U","style":{"textDecoration":"underline"}},"editor":{},"style":{"textDecoration":"underline"}},"sub":{"label":"Subscript","group":"text","button":{"label":"Sub","style":{"verticalAlign":"sub","fontSize":"0.6em"}},"editor":{},"style":{"verticalAlign":"sub","fontSize":"0.6em"}},"sup":{"label":"Superscript","group":"text","button":{"label":"Sup","style":{"verticalAlign":"sup","fontSize":"0.6em"}},"editor":{},"style":{"verticalAlign":"sup","fontSize":"0.6em"}},"main":{"label":"Main","group":"color","type":"color","button":{},"editor":{},"style":{"color":"#707c8f"}},"accent":{"label":"Accent","group":"color","type":"color","button":{},"editor":{},"style":{"color":"#ffbb00"}},"complementary":{"label":"Complementary","group":"color","type":"color","button":{},"editor":{},"style":{"color":"#7f53f9"}},"success":{"label":"Success","group":"color","type":"color","button":{},"editor":{},"style":{"color":"#91ff00"}},"warning":{"label":"Warning","group":"color","type":"color","button":{},"editor":{},"style":{"color":"#ffd500"}},"error":{"label":"Error","group":"color","type":"color","button":{},"editor":{},"style":{"color":"#ff003c"}},"info":{"label":"Info","group":"color","type":"color","button":{},"editor":{},"style":{"color":"#00ffff"}}}}},"media":{"defaultAction":"<=","defaultMedia":"desktop","queries":{"wide":{"minWidth":2048,"maxWidth":null},"desktop":{"minWidth":1280,"maxWidth":2047},"tablet":{"minWidth":640,"maxWidth":1279},"mobile":{"minWidth":0,"maxWidth":639}}},"google":{"gtm":"GTM-K4LMN8Q","map":{"apiKey":"AIzaSyDzFfEzhmYXRTlONUCtMWQ88uHJhsbtXY4"}},"lod":{"enabled":false,"defaultLevel":3,"botLevel":1,"levels":{"0":{"name":"bare","speedIndex":0},"1":{"name":"lnf","speedIndex":30},"2":{"name":"theme","speedIndex":40},"3":{"name":"high","speedIndex":50},"4":{"name":"ultra","speedIndex":60}},"method":"class","defaultAction":">="},"partytown":{"enabled":false,"forward":["dataLayer.push","fbq","freshpaint.addPageviewProperties","freshpaint.identify","freshpaint.track","_hsq.push","Intercom","_learnq.push","ttq.track","ttq.page","ttq.load","mixpanel.track"]},"classmap":{"enabled":false,"url":"/classmap.json","path":"./classmap.json"},"menus":{"primary":{"name":"Primary menu"},"footer":{"name":"Footer menu"}}},"CLASSMAP":null,"PACKAGE":{"name":"@example/01-basic","version":"2.0.0-alpha.27","description":"","main":"index.js","type":"module","private":true,"license":"AGPL-version-3.0","engines":{"node":">= 14.0.0","npm":">= 6.0.0"},"homepage":"https://coffeekraken.io","repository":{"type":"git","url":""},"bugs":"","keywords":[],"author":{"name":"","email":"","url":""},"contributors":[],"scripts":{"dev":"sugar kitchen.run dev","prod":"sugar kitchen.run prod","build":"sugar kitchen.run build","static":"live-server static","static.build":"sugar static.build --clean --env production --target production","deploy":"rsync -avzh --delete --progress --stats ./static fe0mt_coffeekraken@fe0mt.ftp.infomaniak.com:~/sites/01-basic.coffeekraken.io"},"dependencies":{"@coffeekraken/s-activate-feature":"^2.0.0-alpha.27","@coffeekraken/s-carpenter":"^2.0.0-alpha.27","@coffeekraken/s-front":"^2.0.0-alpha.27","@coffeekraken/s-google-map-component":"^2.0.0-alpha.27","@coffeekraken/s-log":"^2.0.0-alpha.27","@coffeekraken/s-postcss-sugar-plugin":"^2.0.0-alpha.27","@coffeekraken/s-sugar-feature":"^2.0.0-alpha.27","@coffeekraken/s-views":"^2.0.0-alpha.27","@coffeekraken/sugar":"^2.0.0-alpha.27","@faker-js/faker":"^8.0.2","autoprefixer":"^10.4.12","postcss":"^8.4.17","postcss-atroot":"^0.2.3","postcss-extend-rule":"^4.0.0","postcss-import":"^15.0.0","postcss-nested":"^5.0.6","postcss-property-lookup":"^3.0.0"},"exports":{"./shared/*":{"require":"./dist/pkg/cjs/shared/*.js","import":"./dist/pkg/esm/shared/*.js"},"./node/*":{"require":"./dist/pkg/cjs/node/*.js","import":"./dist/pkg/esm/node/*.js"},"./js/*":{"require":"./dist/pkg/cjs/js/*.js","import":"./dist/pkg/esm/js/*.js"}}}}`),
  document.env || {}
);
(async () => {
  SFeature.setDefaultProps("*", {});
  SLitComponent.setDefaultProps("*", {});
  SFront.init({});
  define$3();
  SPackEssentials();
  define();
  define$1();
  define$2();
})();
export {
  __injectStyle as A,
  getDefaultExportFromCjs as B,
  __whenNearViewport as C,
  __whenStylesheetsReady as D,
  __makeFloat as E,
  SEnv2 as F,
  __isPlainObject as G,
  __isInteger as H,
  __isColor as I,
  SClass as J,
  format as K,
  SComponentUtils as L,
  __closestScrollable as M,
  __scrollTo as N,
  getAugmentedNamespace as O,
  require$$0$2 as P,
  objectHash as Q,
  SInterface as S,
  __querySelectorLive as _,
  __fastdom as a,
  __wait$1 as b,
  __deepMerge as c,
  commonjsGlobal as d,
  SFeature as e,
  __clearTransmations as f,
  SFrontspec as g,
  SLitComponent as h,
  css as i,
  __camelCase as j,
  __parse as k,
  html as l,
  __upperFirst as m,
  SSugarConfig as n,
  __traverseUp as o,
  SPromise as p,
  __uniqid as q,
  isClass as r,
  __isNode$2 as s,
  SStdio as t,
  unsafeCSS as u,
  __unique as v,
  __getCookie as w,
  get as x,
  __scrollSpy as y,
  STheme as z
};

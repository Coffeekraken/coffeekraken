var _a2;
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
      const secondObjDesc = Object.getOwnPropertyDescriptor(secondObj, key);
      if (secondObjDesc.set || secondObjDesc.get) {
        Object.defineProperty(newObj, key, secondObjDesc);
      } else if (__isPlainObject(newObj[key]) && __isPlainObject(secondObj[key])) {
        newObj[key] = merge(newObj[key], secondObj[key]);
      } else {
        newObj[key] = secondObj[key];
      }
    });
    return newObj;
  }
  let currentObj = {};
  for (let i = 0; i < args.length; i++) {
    const toMergeObj = args[i];
    currentObj = merge(currentObj, toMergeObj);
  }
  return currentObj;
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
function __deepMap(objectOrArray, processor, settings = {}, _path = []) {
  settings = __deepMerge({
    classInstances: false,
    array: true,
    privateProps: false,
    cloneFirst: false
  }, settings);
  const isArray2 = Array.isArray(objectOrArray);
  let newObject = isArray2 ? [] : settings.cloneFirst ? Object.assign({}, objectOrArray) : objectOrArray;
  Object.keys(objectOrArray).forEach((prop) => {
    if (!settings.privateProps && prop.match(/^_/))
      return;
    if (__isPlainObject(objectOrArray[prop]) || __isClassInstance(objectOrArray[prop]) && settings.classInstances || Array.isArray(objectOrArray[prop]) && settings.array) {
      const res2 = __deepMap(objectOrArray[prop], processor, settings, [
        ..._path,
        prop
      ]);
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
      delete objectOrArray[prop];
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
function __unquote(string2, quotesToRemove = ['"', "'", "\u201D", "`"]) {
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
function __unique(array) {
  const a2 = array.concat();
  for (let i = 0; i < a2.length; ++i) {
    for (let j = i + 1; j < a2.length; ++j) {
      if (a2[i] === a2[j])
        a2.splice(j--, 1);
    }
  }
  return a2;
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
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n) {
  var f = n.default;
  if (typeof f == "function") {
    var a2 = function() {
      return f.apply(this, arguments);
    };
    a2.prototype = f.prototype;
  } else
    a2 = {};
  Object.defineProperty(a2, "__esModule", { value: true });
  Object.keys(n).forEach(function(k2) {
    var d2 = Object.getOwnPropertyDescriptor(n, k2);
    Object.defineProperty(a2, k2, d2.get ? d2 : {
      enumerable: true,
      get: function() {
        return n[k2];
      }
    });
  });
  return a2;
}
var md5$1 = { exports: {} };
function commonjsRequire(path2) {
  throw new Error('Could not dynamically require "' + path2 + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var core = { exports: {} };
const __viteBrowserExternal = new Proxy({}, {
  get(_, key) {
    throw new Error(`Module "" has been externalized for browser compatibility. Cannot access ".${key}" in client code.`);
  }
});
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$0$3 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
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
            create: function() {
              var instance = this.extend();
              instance.init.apply(instance, arguments);
              return instance;
            },
            init: function() {
            },
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
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }();
        var WordArray = C_lib.WordArray = Base.extend({
          init: function(words, sigBytes) {
            words = this.words = words || [];
            if (sigBytes != undefined$12) {
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
            for (var i = 0; i < nBytes; i += 4) {
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
            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              hexChars.push((bite >>> 4).toString(16));
              hexChars.push((bite & 15).toString(16));
            }
            return hexChars.join("");
          },
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
              for (var offset2 = 0; offset2 < nWordsReady; offset2 += blockSize) {
                this._doProcessBlock(dataWords, offset2);
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
            var hash2 = this._doFinalize();
            return hash2;
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
        _doProcessBlock: function(M, offset2) {
          for (var i = 0; i < 16; i++) {
            var offset_i = offset2 + i;
            var M_offset_i = M[offset_i];
            M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
          }
          var H = this._hash.words;
          var M_offset_0 = M[offset2 + 0];
          var M_offset_1 = M[offset2 + 1];
          var M_offset_2 = M[offset2 + 2];
          var M_offset_3 = M[offset2 + 3];
          var M_offset_4 = M[offset2 + 4];
          var M_offset_5 = M[offset2 + 5];
          var M_offset_6 = M[offset2 + 6];
          var M_offset_7 = M[offset2 + 7];
          var M_offset_8 = M[offset2 + 8];
          var M_offset_9 = M[offset2 + 9];
          var M_offset_10 = M[offset2 + 10];
          var M_offset_11 = M[offset2 + 11];
          var M_offset_12 = M[offset2 + 12];
          var M_offset_13 = M[offset2 + 13];
          var M_offset_14 = M[offset2 + 14];
          var M_offset_15 = M[offset2 + 15];
          var a2 = H[0];
          var b = H[1];
          var c = H[2];
          var d2 = H[3];
          a2 = FF(a2, b, c, d2, M_offset_0, 7, T[0]);
          d2 = FF(d2, a2, b, c, M_offset_1, 12, T[1]);
          c = FF(c, d2, a2, b, M_offset_2, 17, T[2]);
          b = FF(b, c, d2, a2, M_offset_3, 22, T[3]);
          a2 = FF(a2, b, c, d2, M_offset_4, 7, T[4]);
          d2 = FF(d2, a2, b, c, M_offset_5, 12, T[5]);
          c = FF(c, d2, a2, b, M_offset_6, 17, T[6]);
          b = FF(b, c, d2, a2, M_offset_7, 22, T[7]);
          a2 = FF(a2, b, c, d2, M_offset_8, 7, T[8]);
          d2 = FF(d2, a2, b, c, M_offset_9, 12, T[9]);
          c = FF(c, d2, a2, b, M_offset_10, 17, T[10]);
          b = FF(b, c, d2, a2, M_offset_11, 22, T[11]);
          a2 = FF(a2, b, c, d2, M_offset_12, 7, T[12]);
          d2 = FF(d2, a2, b, c, M_offset_13, 12, T[13]);
          c = FF(c, d2, a2, b, M_offset_14, 17, T[14]);
          b = FF(b, c, d2, a2, M_offset_15, 22, T[15]);
          a2 = GG(a2, b, c, d2, M_offset_1, 5, T[16]);
          d2 = GG(d2, a2, b, c, M_offset_6, 9, T[17]);
          c = GG(c, d2, a2, b, M_offset_11, 14, T[18]);
          b = GG(b, c, d2, a2, M_offset_0, 20, T[19]);
          a2 = GG(a2, b, c, d2, M_offset_5, 5, T[20]);
          d2 = GG(d2, a2, b, c, M_offset_10, 9, T[21]);
          c = GG(c, d2, a2, b, M_offset_15, 14, T[22]);
          b = GG(b, c, d2, a2, M_offset_4, 20, T[23]);
          a2 = GG(a2, b, c, d2, M_offset_9, 5, T[24]);
          d2 = GG(d2, a2, b, c, M_offset_14, 9, T[25]);
          c = GG(c, d2, a2, b, M_offset_3, 14, T[26]);
          b = GG(b, c, d2, a2, M_offset_8, 20, T[27]);
          a2 = GG(a2, b, c, d2, M_offset_13, 5, T[28]);
          d2 = GG(d2, a2, b, c, M_offset_2, 9, T[29]);
          c = GG(c, d2, a2, b, M_offset_7, 14, T[30]);
          b = GG(b, c, d2, a2, M_offset_12, 20, T[31]);
          a2 = HH(a2, b, c, d2, M_offset_5, 4, T[32]);
          d2 = HH(d2, a2, b, c, M_offset_8, 11, T[33]);
          c = HH(c, d2, a2, b, M_offset_11, 16, T[34]);
          b = HH(b, c, d2, a2, M_offset_14, 23, T[35]);
          a2 = HH(a2, b, c, d2, M_offset_1, 4, T[36]);
          d2 = HH(d2, a2, b, c, M_offset_4, 11, T[37]);
          c = HH(c, d2, a2, b, M_offset_7, 16, T[38]);
          b = HH(b, c, d2, a2, M_offset_10, 23, T[39]);
          a2 = HH(a2, b, c, d2, M_offset_13, 4, T[40]);
          d2 = HH(d2, a2, b, c, M_offset_0, 11, T[41]);
          c = HH(c, d2, a2, b, M_offset_3, 16, T[42]);
          b = HH(b, c, d2, a2, M_offset_6, 23, T[43]);
          a2 = HH(a2, b, c, d2, M_offset_9, 4, T[44]);
          d2 = HH(d2, a2, b, c, M_offset_12, 11, T[45]);
          c = HH(c, d2, a2, b, M_offset_15, 16, T[46]);
          b = HH(b, c, d2, a2, M_offset_2, 23, T[47]);
          a2 = II(a2, b, c, d2, M_offset_0, 6, T[48]);
          d2 = II(d2, a2, b, c, M_offset_7, 10, T[49]);
          c = II(c, d2, a2, b, M_offset_14, 15, T[50]);
          b = II(b, c, d2, a2, M_offset_5, 21, T[51]);
          a2 = II(a2, b, c, d2, M_offset_12, 6, T[52]);
          d2 = II(d2, a2, b, c, M_offset_3, 10, T[53]);
          c = II(c, d2, a2, b, M_offset_10, 15, T[54]);
          b = II(b, c, d2, a2, M_offset_1, 21, T[55]);
          a2 = II(a2, b, c, d2, M_offset_8, 6, T[56]);
          d2 = II(d2, a2, b, c, M_offset_15, 10, T[57]);
          c = II(c, d2, a2, b, M_offset_6, 15, T[58]);
          b = II(b, c, d2, a2, M_offset_13, 21, T[59]);
          a2 = II(a2, b, c, d2, M_offset_4, 6, T[60]);
          d2 = II(d2, a2, b, c, M_offset_11, 10, T[61]);
          c = II(c, d2, a2, b, M_offset_2, 15, T[62]);
          b = II(b, c, d2, a2, M_offset_9, 21, T[63]);
          H[0] = H[0] + a2 | 0;
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
      function FF(a2, b, c, d2, x, s, t) {
        var n = a2 + (b & c | ~b & d2) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      function GG(a2, b, c, d2, x, s, t) {
        var n = a2 + (b & d2 | c & ~d2) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      function HH(a2, b, c, d2, x, s, t) {
        var n = a2 + (b ^ c ^ d2) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      function II(a2, b, c, d2, x, s, t) {
        var n = a2 + (c ^ (b | ~d2)) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      C.MD5 = Hasher._createHelper(MD5);
      C.HmacMD5 = Hasher._createHmacHelper(MD5);
    })(Math);
    return CryptoJS.MD5;
  });
})(md5$1);
const md5 = md5$1.exports;
function __parse$1(value) {
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
    const k2 = Math.min(1 - r, 1 - g2, 1 - b);
    const c = (1 - r - k2) / (1 - k2) || 0;
    const m = (1 - g2 - k2) / (1 - k2) || 0;
    const y = (1 - b - k2) / (1 - k2) || 0;
    return [c * 100, m * 100, y * 100, k2 * 100];
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
    const a2 = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a2, b];
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
    const k2 = cmyk[3] / 100;
    const r = 1 - Math.min(1, c * (1 - k2) + k2);
    const g2 = 1 - Math.min(1, m * (1 - k2) + k2);
    const b = 1 - Math.min(1, y * (1 - k2) + k2);
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
    const a2 = 500 * (x - y);
    const b = 200 * (y - z);
    return [l, a2, b];
  };
  convert2.lab.xyz = function(lab) {
    const l = lab[0];
    const a2 = lab[1];
    const b = lab[2];
    let x;
    let y;
    let z;
    y = (l + 16) / 116;
    x = a2 / 500 + y;
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
    const a2 = lab[1];
    const b = lab[2];
    let h;
    const hr = Math.atan2(b, a2);
    h = hr * 360 / 2 / Math.PI;
    if (h < 0) {
      h += 360;
    }
    const c = Math.sqrt(a2 * a2 + b * b);
    return [l, c, h];
  };
  convert2.lch.lab = function(lch) {
    const l = lch[0];
    const c = lch[1];
    const h = lch[2];
    const hr = h / 360 * 2 * Math.PI;
    const a2 = c * Math.cos(hr);
    const b = c * Math.sin(hr);
    return [l, a2, b];
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
    let color2 = args % 10;
    if (color2 === 0 || color2 === 7) {
      if (args > 50) {
        color2 += 3.5;
      }
      color2 = color2 / 10.5 * 255;
      return [color2, color2, color2];
    }
    const mult = (~~(args > 50) + 1) * 0.5;
    const r = (color2 & 1) * mult * 255;
    const g2 = (color2 >> 1 & 1) * mult * 255;
    const b = (color2 >> 2 & 1) * mult * 255;
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
    const integer2 = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
    const string2 = integer2.toString(16).toUpperCase();
    return "000000".substring(string2.length) + string2;
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
    const integer2 = parseInt(colorString, 16);
    const r = integer2 >> 16 & 255;
    const g2 = integer2 >> 8 & 255;
    const b = integer2 & 255;
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
    const integer2 = (val << 16) + (val << 8) + val;
    const string2 = integer2.toString(16).toUpperCase();
    return "000000".substring(string2.length) + string2;
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
(function(module) {
  const wrapAnsi16 = (fn2, offset2) => (...args) => {
    const code3 = fn2(...args);
    return `\x1B[${code3 + offset2}m`;
  };
  const wrapAnsi256 = (fn2, offset2) => (...args) => {
    const code3 = fn2(...args);
    return `\x1B[${38 + offset2};5;${code3}m`;
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
  const makeDynamicStyles = (wrap2, targetSpace, identity2, isBackground) => {
    if (colorConvert2 === void 0) {
      colorConvert2 = requireColorConvert();
    }
    const offset2 = isBackground ? 10 : 0;
    const styles2 = {};
    for (const [sourceSpace, suite] of Object.entries(colorConvert2)) {
      const name2 = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
      if (sourceSpace === targetSpace) {
        styles2[name2] = wrap2(identity2, offset2);
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
      const number2 = Number(chunk);
      if (!Number.isNaN(number2)) {
        results.push(number2);
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
  return templates;
}
const ansiStyles = ansiStyles$1.exports;
const { stdout: stdoutColor, stderr: stderrColor } = browser;
const {
  stringReplaceAll,
  stringEncaseCRLFWithFirstIndex
} = util$2;
const { isArray: isArray$5 } = Array;
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
    if (isArray$5(arguments_[0]) && isArray$5(arguments_[0].raw)) {
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
  if (string2.indexOf("\x1B") !== -1) {
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
  if (!isArray$5(firstString) || !isArray$5(firstString.raw)) {
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
function __mapToObject(map2) {
  const obj2 = {};
  for (const [k2, v] of map2)
    obj2[k2] = v;
  return obj2;
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
var decycle_1;
const isArray$4 = (e) => Array.isArray(e), isObject$5 = (e) => "Object" === Object.prototype.toString.call(e).slice(8, -1), validate = (e) => {
  if (void 0 === e)
    throw new Error("This method requires one parameter");
  if (!isArray$4(e) && !isObject$5(e))
    throw new TypeError("This method only accepts arrays and objects");
}, findRef = (e, r) => Object.keys(r).find((a2) => r[a2] === e), decycle = (e) => {
  validate(e);
  let r = {};
  const a2 = (e2, c = "$") => {
    const s = findRef(e2, r);
    return s ? { $ref: s } : isArray$4(e2) || isObject$5(e2) ? (r[c] = e2, isArray$4(e2) ? e2.map((e3, r2) => a2(e3, `${c}[${r2}]`)) : Object.keys(e2).reduce((r2, s2) => (r2[s2] = a2(e2[s2], `${c}.${s2}`), r2), {})) : e2;
  };
  return a2(e);
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
    return __parse$1(string2);
  }
};
function get(obj2, path2, settings = {}) {
  settings = Object.assign({}, settings);
  if (Array.isArray(path2)) {
    return __get(obj2, path2, settings);
  }
  if (obj2[path2] !== void 0)
    return obj2[path2];
  if (!path2 || path2 === "" || path2 === ".")
    return obj2;
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
      potentialPaths.push([...before, ...after.filter((a2) => !a2.match(/\?$/))].join("."));
    }
  }
  potentialPaths = __unique(potentialPaths.map((s) => s.replace(/\?/gm, "")));
  for (let i = 0; i < potentialPaths.length; i++) {
    const path3 = potentialPaths[i];
    const result2 = __get(obj2, path3, settings);
    if (result2 !== void 0)
      return result2;
  }
}
function __get(obj2, path2, settings = {}) {
  settings = Object.assign({}, settings);
  let o = obj2, a2;
  if (typeof path2 === "string") {
    if (obj2[path2] !== void 0)
      return obj2[path2];
    if (!path2 || path2 === "" || path2 === ".")
      return obj2;
    path2 = path2.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm);
  }
  a2 = [...path2].map((p) => {
    if (typeof p === "string")
      return __unquote(p);
    return p;
  });
  while (a2.length) {
    let n = a2.shift();
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
function __set(obj2, path2, value, settings = {}) {
  settings = Object.assign({}, settings);
  let o = obj2, a2;
  if (typeof path2 === "string") {
    if (!path2 || path2 === "" || path2 === ".") {
      obj2 = value;
      return;
    }
    path2 = path2.replace(/\[(\w+)\]/g, ".[$1]");
    a2 = __unquote(path2).split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((p) => __unquote(p));
  } else if (Array.isArray(path2)) {
    a2 = [...path2];
  }
  while (a2.length - 1) {
    const n = a2.shift();
    if (!(n in o)) {
      if (typeof a2[0] === "string") {
        if (a2[0].match(/^\[[0-9]+\]$/))
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
  if (typeof a2[0] === "string" && a2[0].match(/^\[[0-9]+\]$/)) {
    if (!Array.isArray(o))
      o = [];
    o.push(value);
  } else {
    o[a2[0]] = value;
  }
  return get(obj2, path2);
}
function __toJson(object) {
  const newObj = {};
  __deepMap(object, ({ value, path: path2 }) => {
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
    this.settings = {};
    setSettings(this, settings);
    this.metas = getMetas(this);
    Object.defineProperty(this, "metas", {
      enumerable: true,
      value: getMetas(this)
    });
  }
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
  expose(instance, settings) {
    return expose(this, instance, settings);
  }
  toPlainObject() {
    return toPlainObject(this);
  }
}
function getMetas(ctx) {
  var _a3, _b2, _c2, _d2, _e, _f, _g, _h;
  let name2 = `<yellow>${((_a3 = ctx.settings.metas) === null || _a3 === void 0 ? void 0 : _a3.name) || ""}</yellow>`;
  if ((_b2 = ctx.settings.metas) === null || _b2 === void 0 ? void 0 : _b2.id) {
    name2 += ` <cyan>${ctx.settings.metas.id}</cyan>`;
  }
  const metasObj = {
    id: (_d2 = (_c2 = ctx.settings.metas) === null || _c2 === void 0 ? void 0 : _c2.id) !== null && _d2 !== void 0 ? _d2 : ctx.constructor.name,
    name: (_f = (_e = ctx.settings.metas) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : ctx.constructor.name,
    formattedName: name2,
    color: (_h = (_g = ctx.settings.metas) === null || _g === void 0 ? void 0 : _g.color) !== null && _h !== void 0 ? _h : "yellow"
  };
  return metasObj;
}
function expose(ctx, instance, settings) {
  var _a3;
  settings = __deepMerge({
    as: void 0,
    props: []
  }, settings);
  if (settings.as && typeof settings.as === "string") {
    ctx[settings.as] = instance;
  }
  (_a3 = settings === null || settings === void 0 ? void 0 : settings.props) === null || _a3 === void 0 ? void 0 : _a3.forEach((prop) => {
    if (instance[prop].bind && typeof instance[prop].bind === "function") {
      ctx[prop] = instance[prop].bind(instance);
    } else {
      ctx[prop] = instance[prop];
    }
  });
}
function toPlainObject(ctx) {
  return __toJson(ctx);
}
function setSettings(ctx, settings = {}) {
  var _a3;
  ctx.settings = settings;
  if (!ctx.settings.metas)
    ctx.settings.metas = {};
  if (!((_a3 = ctx.settings.metas) === null || _a3 === void 0 ? void 0 : _a3.id))
    ctx.settings.metas.id = ctx.constructor.name;
  ctx.settings.metas.color = "yellow";
}
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
var src$1 = {};
var config = {};
const name$1 = "clone-class";
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
const require$$0$2 = {
  name: name$1,
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
config.VERSION = require$$0$2.version;
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
Object.defineProperty(src$1, "__esModule", { value: true });
var config_1 = config;
src$1.VERSION = config_1.VERSION;
var instance_to_class_1 = instanceToClass$1;
src$1.instanceToClass = instance_to_class_1.instanceToClass;
const clone_class_1 = cloneClass$1;
src$1.cloneClass = clone_class_1.cloneClass;
src$1.default = clone_class_1.cloneClass;
var isClass$2 = { exports: {} };
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
})(isClass$2, isClass$2.exports);
const __isClass = isClass$2.exports;
function isClass$1(cls) {
  if (!Array.isArray(cls))
    cls = [cls];
  for (let i = 0; i < cls.length; i++) {
    if (!__isClass(cls[i]))
      return false;
  }
  return true;
}
const fn$2 = function(cls, settings = {}) {
  const stack = {};
  if (!isClass$1(cls)) {
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
  let obj2 = toCheck;
  do {
    const _props = Object.getOwnPropertyNames(obj2);
    if (_props.indexOf("__defineGetter__") !== -1)
      continue;
    props = props.concat(_props);
  } while (obj2 = Object.getPrototypeOf(obj2));
  return props.sort().filter(function(e, i, arr) {
    if (e != arr[i + 1] && typeof toCheck[e] == "function")
      return true;
  });
}
var es5 = { exports: {} };
var aggregation = function(base) {
  var mixins = Array.prototype.slice.call(arguments, 1);
  var aggregate = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    base.apply(this, args);
    mixins.forEach(function(mixin) {
      if (typeof mixin.prototype.initializer === "function")
        mixin.prototype.initializer.apply(this, args);
    }.bind(this));
  };
  aggregate.prototype = Object.create(base.prototype);
  aggregate.prototype.constructor = aggregate;
  var copyProps = function(target, source2) {
    Object.getOwnPropertyNames(source2).forEach(function(prop) {
      if (prop.match(/^(?:initializer|constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
        return;
      Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source2, prop));
    });
  };
  mixins.forEach(function(mixin) {
    copyProps(aggregate.prototype, mixin.prototype);
    copyProps(aggregate, mixin);
  });
  return aggregate;
};
var aggregationEs5 = aggregation;
(function(module) {
  module.exports = aggregationEs5;
})(es5);
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
source.level = 3;
const tagsMap = {
  black: (tag2, content) => source.black(content),
  red: (tag2, content) => source.red(content),
  green: (tag2, content) => source.green(content),
  yellow: (tag2, content) => source.yellow(content),
  blue: (tag2, content) => source.blue(content),
  magenta: (tag2, content) => source.magenta(content),
  cyan: (tag2, content) => source.cyan(content),
  white: (tag2, content) => source.white(content),
  grey: (tag2, content) => source.grey(content),
  bgBlack: (tag2, content) => source.bgBlack(content),
  bgRed: (tag2, content) => source.bgRed(content),
  bgGreen: (tag2, content) => source.bgGreen(content),
  bgYellow: (tag2, content) => source.bgYellow(content),
  bgBlue: (tag2, content) => source.bgBlue(content),
  bgMagenta: (tag2, content) => source.bgMagenta(content),
  bgCyan: (tag2, content) => source.bgCyan(content),
  bgWhite: (tag2, content) => source.bgWhite(content),
  bold: (tag2, content) => source.bold(content),
  dim: (tag2, content) => source.dim(content),
  italic: (tag2, content) => source.italic(content),
  underline: (tag2, content) => source.underline(content),
  strike: (tag2, content) => source.strike(content),
  h1: (tag2, content) => {
    return source.underline(source.bold(content)) + "\n\n";
  },
  h2: (tag2, content) => {
    return source.bold(content) + "\n";
  },
  date: (tag2, content) => new Date().getDate().toString().padStart("0", 2) + "-" + (new Date().getMonth() + 1).toString().padStart("0", 2) + "-" + new Date().getFullYear().toString().padStart("0", 2),
  time: (tag2, content) => new Date().getHours().toString().padStart("0", 2) + ":" + new Date().getMinutes().toString().padStart("0", 2) + ":" + new Date().getMinutes().toString().padStart("0", 2),
  day: (tag2, content) => new Date().getDate().toString().padStart("0", 2),
  days: (tag2, content) => new Date().getDate().toString().padStart("0", 2),
  month: (tag2, content) => new Date().getMonth().toString().padStart("0", 2),
  months: (tag2, content) => new Date().getMonth().toString().padStart("0", 2),
  year: (tag2, content) => new Date().getFullYear().toString().padStart("0", 2),
  years: (tag2, content) => new Date().getFullYear().toString().padStart("0", 2),
  hour: (tag2, content) => new Date().getHours().toString().padStart("0", 2),
  hours: (tag2, content) => new Date().getHours().toString().padStart("0", 2),
  minute: (tag2, content) => new Date().getMinutes().toString().padStart("0", 2),
  minutes: (tag2, content) => new Date().getMinutes().toString().padStart("0", 2),
  second: (tag2, content) => new Date().getSeconds().toString().padStart("0", 2),
  seconds: (tag2, content) => new Date().getSeconds().toString().padStart("0", 2),
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
function __isInteger(data) {
  return typeof data === "number" && !isNaN(data) && function(x) {
    return (x | 0) === x;
  }(parseFloat(data));
}
function __upperFirst(string2) {
  return string2.charAt(0).toUpperCase() + string2.slice(1);
}
function __typeof(value, settings = {}) {
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
  else if (settings.customClass === true && isClass$1(value) && value.name !== void 0) {
    type = __upperFirst(value.name);
  } else if (settings.customClass === true && value.constructor !== void 0 && value.constructor.name !== void 0) {
    type = __upperFirst(value.constructor.name);
  } else if (settings.customClass === false && isClass$1(value)) {
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
const fn$1 = function(stack, callback, settings = {}) {
  settings = Object.assign({ newStack: false }, settings);
  const stackType = __typeof(stack).toLowerCase();
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
  const _get = (s, k2) => {
    switch (__typeof(s).toLowerCase()) {
      case "array":
      case "object":
        return s[k2];
      case "string":
        return k2;
      case "number":
      case "integer":
        return k2;
      case "map":
        return s.get(k2);
      case "set":
        return k2;
    }
  };
  const _set = (s, k2, v) => {
    switch (__typeof(s).toLowerCase()) {
      case "array":
        if (settings.newStack === true)
          s.push(v);
        else
          s[k2] = v;
        break;
      case "object":
        s[k2] = v;
        break;
      case "number":
      case "integer":
      case "string":
        s.push(v);
        break;
      case "map":
        s.set(k2, v);
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
    var data = this.__data__;
    if (nativeCreate) {
      var result2 = data[key];
      return result2 === HASH_UNDEFINED ? void 0 : result2;
    }
    return hasOwnProperty2.call(data, key) ? data[key] : void 0;
  }
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty2.call(data, key);
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
    var pattern2 = isFunction2(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern2.test(toSource(value));
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
    var data = map2.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
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
const __clone = lodash_clone.exports;
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
    var data = this.__data__;
    if (nativeCreate) {
      var result2 = data[key];
      return result2 === HASH_UNDEFINED ? void 0 : result2;
    }
    return hasOwnProperty2.call(data, key) ? data[key] : void 0;
  }
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty2.call(data, key);
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
    var pattern2 = isFunction2(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern2.test(toSource(value));
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
    var data = map2.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
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
const __deepClone = lodash_clonedeep.exports;
function clone(object, settings = {}) {
  settings = Object.assign({ deep: false }, settings);
  if (settings.deep) {
    return __deepClone(object);
  }
  return __clone(object);
}
function __deepAssign(referenceObj, ...objects) {
  const settings = {
    array: false,
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
function __isDomElement(element) {
  return typeof HTMLElement === "object" ? element instanceof HTMLElement : element && typeof element === "object" && element !== null && element.nodeType === 1 && typeof element.nodeName === "string";
}
const _loopTimeout = /* @__PURE__ */ new WeakMap();
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
        if (!_loopTimeout.has(target)) {
          _loopTimeout.set(target, {});
        }
        const dotpath = [...path2, key].join(".");
        const timeouts = _loopTimeout.get(target);
        if (timeouts[dotpath]) {
          return true;
        }
        timeouts[dotpath] = true;
        setTimeout(() => {
          delete timeouts[dotpath];
        });
        if (isRevoked || !settings.handleSet)
          return true;
        if (value === target[key])
          return true;
        if (settings.deep && typeof value === "object") {
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
  function proxify(obj2, path2) {
    if (obj2 === null)
      return obj2;
    if (!settings.domElements && __isDomElement(obj2)) {
      return obj2;
    }
    if (settings.deep) {
      for (const key of Object.keys(obj2)) {
        if (Array.isArray(obj2[key])) {
          obj2[key] = __proxyArray(obj2[key]);
          obj2[key].watch(Object.getOwnPropertyNames(Array.prototype), (watchObj) => {
            handlerFn(Object.assign({ path: [...path2, key].join(".") }, watchObj));
          });
        } else if (typeof obj2[key] === "object") {
          obj2[key] = proxify(obj2[key], [...path2, key]);
        }
      }
    }
    const p = Proxy.revocable(obj2, makeHandler(path2));
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
var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
var slice$1 = Array.prototype.slice;
var toStr$a = Object.prototype.toString;
var funcType = "[object Function]";
var implementation$b = function bind2(that) {
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
var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);
var toString$3 = {}.toString;
var isarray = Array.isArray || function(arr) {
  return toString$3.call(arr) == "[object Array]";
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
var fnClass = "[object Function]";
var genClass = "[object GeneratorFunction]";
var hasToStringTag$a = typeof Symbol === "function" && !!Symbol.toStringTag;
var documentDotAll = typeof document === "object" && typeof document.all === "undefined" && document.all !== void 0 ? document.all : {};
var isCallable$1 = reflectApply ? function isCallable2(value) {
  if (value === documentDotAll) {
    return true;
  }
  if (!value) {
    return false;
  }
  if (typeof value !== "function" && typeof value !== "object") {
    return false;
  }
  if (typeof value === "function" && !value.prototype) {
    return true;
  }
  try {
    reflectApply(value, null, badArrayLike);
  } catch (e) {
    if (e !== isCallableMarker) {
      return false;
    }
  }
  return !isES6ClassFn(value);
} : function isCallable3(value) {
  if (value === documentDotAll) {
    return true;
  }
  if (!value) {
    return false;
  }
  if (typeof value !== "function" && typeof value !== "object") {
    return false;
  }
  if (typeof value === "function" && !value.prototype) {
    return true;
  }
  if (hasToStringTag$a) {
    return tryFunctionObject(value);
  }
  if (isES6ClassFn(value)) {
    return false;
  }
  var strClass2 = toStr$9.call(value);
  return strClass2 === fnClass || strClass2 === genClass;
};
var shams$1 = function hasSymbols2() {
  if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
    return false;
  }
  if (typeof Symbol.iterator === "symbol") {
    return true;
  }
  var obj2 = {};
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
  obj2[sym] = symVal;
  for (sym in obj2) {
    return false;
  }
  if (typeof Object.keys === "function" && Object.keys(obj2).length !== 0) {
    return false;
  }
  if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj2).length !== 0) {
    return false;
  }
  var syms = Object.getOwnPropertySymbols(obj2);
  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }
  if (!Object.prototype.propertyIsEnumerable.call(obj2, sym)) {
    return false;
  }
  if (typeof Object.getOwnPropertyDescriptor === "function") {
    var descriptor2 = Object.getOwnPropertyDescriptor(obj2, sym);
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
var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
  try {
    $gOPD({}, "");
  } catch (e) {
    $gOPD = null;
  }
}
var throwTypeError = function() {
  throw new $TypeError$3();
};
var ThrowTypeError = $gOPD ? function() {
  try {
    arguments.callee;
    return throwTypeError;
  } catch (calleeThrows) {
    try {
      return $gOPD(arguments, "callee").get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;
var hasSymbols$3 = hasSymbols$4();
var getProto$4 = Object.getPrototypeOf || function(x) {
  return x.__proto__;
};
var needsEval = {};
var TypedArray = typeof Uint8Array === "undefined" ? undefined$1 : getProto$4(Uint8Array);
var INTRINSICS = {
  "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
  "%ArrayIteratorPrototype%": hasSymbols$3 ? getProto$4([][Symbol.iterator]()) : undefined$1,
  "%AsyncFromSyncIteratorPrototype%": undefined$1,
  "%AsyncFunction%": needsEval,
  "%AsyncGenerator%": needsEval,
  "%AsyncGeneratorFunction%": needsEval,
  "%AsyncIteratorPrototype%": needsEval,
  "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
  "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Error,
  "%eval%": eval,
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
  "%IteratorPrototype%": hasSymbols$3 ? getProto$4(getProto$4([][Symbol.iterator]())) : undefined$1,
  "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
  "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
  "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols$3 ? undefined$1 : getProto$4((/* @__PURE__ */ new Map())[Symbol.iterator]()),
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
  "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols$3 ? undefined$1 : getProto$4((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": hasSymbols$3 ? getProto$4(""[Symbol.iterator]()) : undefined$1,
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
    if (gen) {
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
var bind = functionBind;
var hasOwn$2 = src;
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec$1 = bind.call(Function.call, RegExp.prototype.exec);
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = function stringToPath2(string2) {
  var first = $strSlice(string2, 0, 1);
  var last = $strSlice(string2, -1);
  if (first === "%" && last !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
  } else if (last === "%" && first !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
  }
  var result2 = [];
  $replace(string2, rePropName, function(match2, number2, quote, subString) {
    result2[result2.length] = quote ? $replace(subString, reEscapeChar, "$1") : number2 || match2;
  });
  return result2;
};
var getBaseIntrinsic = function getBaseIntrinsic2(name2, allowMissing) {
  var intrinsicName = name2;
  var alias;
  if (hasOwn$2(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = "%" + alias[0] + "%";
  }
  if (hasOwn$2(INTRINSICS, intrinsicName)) {
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
var getIntrinsic = function GetIntrinsic2(name2, allowMissing) {
  if (typeof name2 !== "string" || name2.length === 0) {
    throw new $TypeError$3("intrinsic name must be a non-empty string");
  }
  if (arguments.length > 1 && typeof allowMissing !== "boolean") {
    throw new $TypeError$3('"allowMissing" argument must be a boolean');
  }
  if ($exec$1(/^%?[^%]*%?$/g, name2) === null) {
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
    if (hasOwn$2(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError$3("base intrinsic for " + name2 + " exists, but the property is not available.");
        }
        return void 0;
      }
      if ($gOPD && i + 1 >= parts.length) {
        var desc = $gOPD(value, part);
        isOwn = !!desc;
        if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
          value = desc.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = hasOwn$2(value, part);
        value = value[part];
      }
      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }
  return value;
};
var callBind$3 = { exports: {} };
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
})(callBind$3);
var GetIntrinsic$7 = getIntrinsic;
var callBind$2 = callBind$3.exports;
var $indexOf = callBind$2(GetIntrinsic$7("String.prototype.indexOf"));
var callBound$9 = function callBoundIntrinsic(name2, allowMissing) {
  var intrinsic = GetIntrinsic$7(name2, !!allowMissing);
  if (typeof intrinsic === "function" && $indexOf(name2, ".prototype.") > -1) {
    return callBind$2(intrinsic);
  }
  return intrinsic;
};
var hasSymbols$2 = shams$1;
var shams = function hasToStringTagShams() {
  return hasSymbols$2() && !!Symbol.toStringTag;
};
var callBound$8 = callBound$9;
var $boolToStr = callBound$8("Boolean.prototype.toString");
var $toString$3 = callBound$8("Object.prototype.toString");
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
var isBooleanObject = function isBoolean2(value) {
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
var isGeneratorFunction$1 = function isGeneratorFunction2(fn2) {
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
var callBound$7 = callBound$9;
var hasToStringTag$5 = shams();
var has$2;
var $exec;
var isRegexMarker;
var badStringifier;
if (hasToStringTag$5) {
  has$2 = callBound$7("Object.prototype.hasOwnProperty");
  $exec = callBound$7("RegExp.prototype.exec");
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
var $toString$2 = callBound$7("Object.prototype.toString");
var gOPD$1 = Object.getOwnPropertyDescriptor;
var regexClass = "[object RegExp]";
var isRegex$1 = hasToStringTag$5 ? function isRegex2(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  var descriptor2 = gOPD$1(value, "lastIndex");
  var hasLastIndexDataProperty = descriptor2 && has$2(descriptor2, "value");
  if (!hasLastIndexDataProperty) {
    return false;
  }
  try {
    $exec(value, badStringifier);
  } catch (e) {
    return e === isRegexMarker;
  }
} : function isRegex3(value) {
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
var isString$4 = function isString2(value) {
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
var hasToStringTag$3 = shams();
var callBound$6 = callBound$9;
var $toString$1 = callBound$6("Object.prototype.toString");
var isStandardArguments = function isArguments2(value) {
  if (hasToStringTag$3 && value && typeof value === "object" && Symbol.toStringTag in value) {
    return false;
  }
  return $toString$1(value) === "[object Arguments]";
};
var isLegacyArguments = function isArguments3(value) {
  if (isStandardArguments(value)) {
    return true;
  }
  return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && $toString$1(value) !== "[object Array]" && $toString$1(value.callee) === "[object Function]";
};
(function() {
  return isStandardArguments(arguments);
})();
isStandardArguments.isLegacyArguments = isLegacyArguments;
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
var isMap$1 = exported$2 || function isMap2(x) {
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
var isSet$1 = exported$1 || function isSet2(x) {
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
  var GetIntrinsic$6 = getIntrinsic;
  var $Map = GetIntrinsic$6("%Map%", true);
  var $Set = GetIntrinsic$6("%Set%", true);
  var callBound$5 = callBound$9;
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
var isWeakmap = exported || function isWeakMap2(x) {
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
var GetIntrinsic$5 = getIntrinsic;
var callBound$4 = callBound$9;
var $WeakSet = GetIntrinsic$5("%WeakSet%", true);
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
var isMap = isMap$1;
var isSet = isSet$1;
var isWeakMap = isWeakmap;
var isWeakSet = isWeakset.exports;
var whichCollection$1 = function whichCollection2(value) {
  if (value && typeof value === "object") {
    if (isMap(value)) {
      return "Map";
    }
    if (isSet(value)) {
      return "Set";
    }
    if (isWeakMap(value)) {
      return "WeakMap";
    }
    if (isWeakSet(value)) {
      return "WeakSet";
    }
  }
  return false;
};
var isString$3 = isString$4;
var isNumber = isNumberObject;
var isBoolean = isBooleanObject;
var isSymbol$1 = isSymbol$2.exports;
var isBigInt = isBigint.exports;
var whichBoxedPrimitive$1 = function whichBoxedPrimitive2(value) {
  if (value == null || typeof value !== "object" && typeof value !== "function") {
    return null;
  }
  if (isString$3(value)) {
    return "String";
  }
  if (isNumber(value)) {
    return "Number";
  }
  if (isBoolean(value)) {
    return "Boolean";
  }
  if (isSymbol$1(value)) {
    return "Symbol";
  }
  if (isBigInt(value)) {
    return "BigInt";
  }
};
var RequireObjectCoercible$2 = { exports: {} };
var GetIntrinsic$4 = getIntrinsic;
var $TypeError$2 = GetIntrinsic$4("%TypeError%");
var CheckObjectCoercible = function CheckObjectCoercible2(value, optMessage) {
  if (value == null) {
    throw new $TypeError$2(optMessage || "Cannot call method on " + value);
  }
  return value;
};
(function(module) {
  module.exports = CheckObjectCoercible;
})(RequireObjectCoercible$2);
var GetIntrinsic$3 = getIntrinsic;
var $Object$1 = GetIntrinsic$3("%Object%");
var RequireObjectCoercible$1 = RequireObjectCoercible$2.exports;
var ToObject$1 = function ToObject2(value) {
  RequireObjectCoercible$1(value);
  return $Object$1(value);
};
var toStr$3 = Object.prototype.toString;
var isArguments$2 = function isArguments4(value) {
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
      for (var k2 in window) {
        try {
          if (!excludedKeys["$" + k2] && has2.call(window, k2) && window[k2] !== null && typeof window[k2] === "object") {
            try {
              equalsConstructorPrototype(window[k2]);
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
        for (var k2 = 0; k2 < dontEnums.length; ++k2) {
          if (!(skipConstructor && dontEnums[k2] === "constructor") && has2.call(object, dontEnums[k2])) {
            theKeys.push(dontEnums[k2]);
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
var keysShim = origKeys ? function keys2(o) {
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
var GetIntrinsic$2 = getIntrinsic;
var $defineProperty = GetIntrinsic$2("%Object.defineProperty%", true);
var hasPropertyDescriptors$1 = function hasPropertyDescriptors2() {
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
var hasSymbols = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
var toStr$2 = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;
var isFunction$2 = function(fn2) {
  return typeof fn2 === "function" && toStr$2.call(fn2) === "[object Function]";
};
var hasPropertyDescriptors = hasPropertyDescriptors_1();
var supportsDescriptors$1 = origDefineProperty && hasPropertyDescriptors;
var defineProperty$2 = function(object, name2, value, predicate) {
  if (name2 in object && (!isFunction$2(predicate) || !predicate())) {
    return;
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
  if (hasSymbols) {
    props = concat.call(props, Object.getOwnPropertySymbols(map2));
  }
  for (var i = 0; i < props.length; i += 1) {
    defineProperty$2(object, props[i], map2[props[i]], predicates[props[i]]);
  }
};
defineProperties.supportsDescriptors = !!supportsDescriptors$1;
var defineProperties_1 = defineProperties;
var IsCallable$2 = { exports: {} };
(function(module) {
  module.exports = isCallable$1;
})(IsCallable$2);
var Type$3 = function Type2(x) {
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
var Type$2 = function Type3(x) {
  if (typeof x === "symbol") {
    return "Symbol";
  }
  if (typeof x === "bigint") {
    return "BigInt";
  }
  return ES5Type(x);
};
var isCallable = isCallable$1;
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
var forEachString = function forEachString2(string2, iterator, receiver) {
  for (var i = 0, len = string2.length; i < len; i++) {
    if (receiver == null) {
      iterator(string2.charAt(i), i, string2);
    } else {
      iterator.call(receiver, string2.charAt(i), i, string2);
    }
  }
};
var forEachObject = function forEachObject2(object, iterator, receiver) {
  for (var k2 in object) {
    if (hasOwnProperty$1.call(object, k2)) {
      if (receiver == null) {
        iterator(object[k2], k2, object);
      } else {
        iterator.call(receiver, object[k2], k2, object);
      }
    }
  }
};
var forEach$2 = function forEach2(list2, iterator, thisArg) {
  if (!isCallable(iterator)) {
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
var availableTypedArrays$1 = function availableTypedArrays2() {
  var out = [];
  for (var i = 0; i < possibleNames.length; i++) {
    if (typeof g$1[possibleNames[i]] === "function") {
      out[out.length] = possibleNames[i];
    }
  }
  return out;
};
var getOwnPropertyDescriptor;
var hasRequiredGetOwnPropertyDescriptor;
function requireGetOwnPropertyDescriptor() {
  if (hasRequiredGetOwnPropertyDescriptor)
    return getOwnPropertyDescriptor;
  hasRequiredGetOwnPropertyDescriptor = 1;
  var GetIntrinsic3 = getIntrinsic;
  var $gOPD2 = GetIntrinsic3("%Object.getOwnPropertyDescriptor%", true);
  if ($gOPD2) {
    try {
      $gOPD2([], "length");
    } catch (e) {
      $gOPD2 = null;
    }
  }
  getOwnPropertyDescriptor = $gOPD2;
  return getOwnPropertyDescriptor;
}
var isTypedArray$1;
var hasRequiredIsTypedArray;
function requireIsTypedArray() {
  if (hasRequiredIsTypedArray)
    return isTypedArray$1;
  hasRequiredIsTypedArray = 1;
  var forEach3 = forEach_1;
  var availableTypedArrays3 = availableTypedArrays$1;
  var callBound2 = callBound$9;
  var $toString2 = callBound2("Object.prototype.toString");
  var hasToStringTag2 = shams();
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
  var gOPD2 = requireGetOwnPropertyDescriptor();
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
var availableTypedArrays = availableTypedArrays$1;
var callBound$3 = callBound$9;
var $toString = callBound$3("Object.prototype.toString");
var hasToStringTag$2 = shams();
var g = typeof globalThis === "undefined" ? commonjsGlobal : globalThis;
var typedArrays = availableTypedArrays();
var $slice = callBound$3("String.prototype.slice");
var toStrTags = {};
var gOPD = requireGetOwnPropertyDescriptor();
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
        toStrTags[typedArray] = descriptor2.get;
      }
    }
  });
}
var tryTypedArrays = function tryAllTypedArrays(value) {
  var foundName = false;
  forEach$1(toStrTags, function(getter, typedArray) {
    if (!foundName) {
      try {
        var name2 = getter.call(value);
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
var whichTypedArray$1 = function whichTypedArray2(value) {
  if (!isTypedArray(value)) {
    return false;
  }
  if (!hasToStringTag$2 || !(Symbol.toStringTag in value)) {
    return $slice($toString(value), 8, -1);
  }
  return tryTypedArrays(value);
};
var callBound$2 = callBound$9;
var $deref = callBound$2("WeakRef.prototype.deref", true);
var isWeakref = typeof WeakRef === "undefined" ? function isWeakRef2(value) {
  return false;
} : function isWeakRef3(value) {
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
var callBound$1 = callBound$9;
var $register = callBound$1("FinalizationRegistry.prototype.register", true);
var isFinalizationregistry = $register ? function isFinalizationRegistry2(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  try {
    $register(value, {});
    return true;
  } catch (e) {
    return false;
  }
} : function isFinalizationRegistry3(value) {
  return false;
};
var functionsHaveNames_1;
var hasRequiredFunctionsHaveNames;
function requireFunctionsHaveNames() {
  if (hasRequiredFunctionsHaveNames)
    return functionsHaveNames_1;
  hasRequiredFunctionsHaveNames = 1;
  var functionsHaveNames2 = function functionsHaveNames3() {
    return typeof function f() {
    }.name === "string";
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
    return functionsHaveNames2() && typeof $bind === "function" && function f() {
    }.bind().name !== "";
  };
  functionsHaveNames_1 = functionsHaveNames2;
  return functionsHaveNames_1;
}
var IsCallable$1 = IsCallable$2.exports;
var functionsHaveNames$1 = requireFunctionsHaveNames()();
var callBound = callBound$9;
var $functionToString = callBound("Function.prototype.toString");
var $stringMatch = callBound("String.prototype.match");
var classRegex = /^class /;
var isClass = function isClassConstructor(fn2) {
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
  if (!isClass(this) && !IsCallable$1(this)) {
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
var polyfill$3 = function getPolyfill2() {
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
var define$h = defineProperties_1;
var callBind$1 = callBind$3.exports;
var implementation$6 = implementation$8;
var getPolyfill$2 = polyfill$3;
var shim$7 = shim$8;
var bound$1 = callBind$1(implementation$6);
define$h(bound$1, {
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
var isAsyncFunction$1 = function isAsyncFunction2(fn2) {
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
var whichBoxedPrimitive = whichBoxedPrimitive$1;
var whichCollection = whichCollection$1;
var whichTypedArray = whichTypedArray$1;
var isArray$3 = isarray;
var isDate$1 = isDateObject;
var isRegex = isRegex$1;
var isWeakRef = isWeakref;
var isFinalizationRegistry = isFinalizationregistry;
var name = function_prototype_name;
var isGeneratorFunction = isGeneratorFunction$1;
var isAsyncFunction = isAsyncFunction$1;
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
var whichBuiltinType$1 = function whichBuiltinType2(value) {
  if (value == null) {
    return value;
  }
  var which = whichBoxedPrimitive($Object(value)) || whichCollection(value) || whichTypedArray(value);
  if (which) {
    return which;
  }
  if (isArray$3(value)) {
    return "Array";
  }
  if (isDate$1(value)) {
    return "Date";
  }
  if (isRegex(value)) {
    return "RegExp";
  }
  if (isWeakRef(value)) {
    return "WeakRef";
  }
  if (isFinalizationRegistry(value)) {
    return "FinalizationRegistry";
  }
  if (typeof value === "function") {
    if (isGeneratorFunction(value)) {
      return "GeneratorFunction";
    }
    if (isAsyncFunction(value)) {
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
    var constructorName = name(value.constructor);
    if (isKnownBuiltin(constructorName)) {
      return constructorName;
    }
  }
  return "Object";
};
var GetIntrinsic$1 = getIntrinsic;
var IsCallable = IsCallable$2.exports;
var Type$1 = Type$2;
var whichBuiltinType = whichBuiltinType$1;
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
  var type = whichBuiltinType(O);
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
var Type = Type$2;
var GetIntrinsic = getIntrinsic;
var $TypeError = GetIntrinsic("%TypeError%");
var implementation$4 = implementation$5;
var hasProto$1 = [].__proto__ === Array.prototype;
var getProto$1 = function getPrototypeOf3(value) {
  if (Type(value) !== "Object") {
    throw new $TypeError("Reflect.getPrototypeOf called on non-object");
  }
  return value.__proto__;
};
var polyfill$2 = function getPolyfill3() {
  if (typeof Reflect === "object" && Reflect && Reflect.getPrototypeOf) {
    return Reflect.getPrototypeOf;
  }
  if (hasProto$1) {
    return getProto$1;
  }
  return implementation$4;
};
var define$g = defineProperties_1;
var getPolyfill$1 = polyfill$2;
var shim$6 = function shimGetPrototypeOf() {
  define$g(
    commonjsGlobal,
    { Reflect: {} },
    { Reflect: function() {
      return typeof Reflect !== "object" || !Reflect;
    } }
  );
  var polyfill2 = getPolyfill$1();
  define$g(
    Reflect,
    { getPrototypeOf: polyfill2 },
    { getPrototypeOf: function() {
      return Reflect.getPrototypeOf !== polyfill2;
    } }
  );
  return polyfill2;
};
var callBind = callBind$3.exports;
var define$f = defineProperties_1;
var implementation$3 = implementation$5;
var getPolyfill = polyfill$2;
var shim$5 = shim$6;
var bound = callBind(getPolyfill(), typeof Reflect === "object" ? Reflect : Object);
define$f(bound, {
  getPolyfill,
  implementation: implementation$3,
  shim: shim$5
});
var reflect_getprototypeof = bound;
var ToObject = ToObject$1;
var ReflectGetPrototypeOf = reflect_getprototypeof;
var implementation$2 = function getPrototypeOf4(O) {
  return ReflectGetPrototypeOf(ToObject(O));
};
var RequireObjectCoercible = RequireObjectCoercible$2.exports;
var implementation$1 = implementation$2;
var hasProto = [].__proto__ === Array.prototype;
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
  if (hasProto) {
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
    throw new Error(`Module "path" has been externalized for browser compatibility. Cannot access "path.${key}" in client code.`);
  }
});
const __viteBrowserExternal_path$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal_path
}, Symbol.toStringTag, { value: "Module" }));
const require$$0$1 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal_path$1);
var concatMap$1 = function(xs, fn2) {
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    var x = fn2(xs[i], i);
    if (isArray$2(x))
      res.push.apply(res, x);
    else
      res.push(x);
  }
  return res;
};
var isArray$2 = Array.isArray || function(xs) {
  return Object.prototype.toString.call(xs) === "[object Array]";
};
var balancedMatch = balanced$1;
function balanced$1(a2, b, str2) {
  if (a2 instanceof RegExp)
    a2 = maybeMatch(a2, str2);
  if (b instanceof RegExp)
    b = maybeMatch(b, str2);
  var r = range(a2, b, str2);
  return r && {
    start: r[0],
    end: r[1],
    pre: str2.slice(0, r[0]),
    body: str2.slice(r[0] + a2.length, r[1]),
    post: str2.slice(r[1] + b.length)
  };
}
function maybeMatch(reg, str2) {
  var m = str2.match(reg);
  return m ? m[0] : null;
}
balanced$1.range = range;
function range(a2, b, str2) {
  var begs, beg, left, right, result2;
  var ai = str2.indexOf(a2);
  var bi = str2.indexOf(b, ai + 1);
  var i = ai;
  if (ai >= 0 && bi > 0) {
    if (a2 === b) {
      return [ai, bi];
    }
    begs = [];
    left = str2.length;
    while (i >= 0 && !result2) {
      if (i == ai) {
        begs.push(i);
        ai = str2.indexOf(a2, i + 1);
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
    for (var k2 = 0; k2 < post.length; k2++) {
      var expansion = pre + N[j] + post[k2];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }
  return expansions;
}
minimatch.Minimatch = Minimatch;
var path = function() {
  try {
    return require$$0$1;
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
minimatch.filter = filter$1;
function filter$1(pattern2, options) {
  options = options || {};
  return function(p, i, list2) {
    return minimatch(p, pattern2, options);
  };
}
function ext(a2, b) {
  b = b || {};
  var t = {};
  Object.keys(a2).forEach(function(k2) {
    t[k2] = a2[k2];
  });
  Object.keys(b).forEach(function(k2) {
    t[k2] = b[k2];
  });
  return t;
}
minimatch.defaults = function(def) {
  if (!def || typeof def !== "object" || !Object.keys(def).length) {
    return minimatch;
  }
  var orig = minimatch;
  var m = function minimatch2(p, pattern2, options) {
    return orig(p, pattern2, ext(def, options));
  };
  m.Minimatch = function Minimatch2(pattern2, options) {
    return new orig.Minimatch(pattern2, ext(def, options));
  };
  m.Minimatch.defaults = function defaults(options) {
    return orig.defaults(ext(def, options)).Minimatch;
  };
  m.filter = function filter2(pattern2, options) {
    return orig.filter(pattern2, ext(def, options));
  };
  m.defaults = function defaults(options) {
    return orig.defaults(ext(def, options));
  };
  m.makeRe = function makeRe2(pattern2, options) {
    return orig.makeRe(pattern2, ext(def, options));
  };
  m.braceExpand = function braceExpand2(pattern2, options) {
    return orig.braceExpand(pattern2, ext(def, options));
  };
  m.match = function(list2, pattern2, options) {
    return orig.match(list2, pattern2, ext(def, options));
  };
  return m;
};
Minimatch.defaults = function(def) {
  return minimatch.defaults(def).Minimatch;
};
function minimatch(p, pattern2, options) {
  assertValidPattern(pattern2);
  if (!options)
    options = {};
  if (!options.nocomment && pattern2.charAt(0) === "#") {
    return false;
  }
  return new Minimatch(pattern2, options).match(p);
}
function Minimatch(pattern2, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern2, options);
  }
  assertValidPattern(pattern2);
  if (!options)
    options = {};
  pattern2 = pattern2.trim();
  if (!options.allowWindowsEscape && path.sep !== "/") {
    pattern2 = pattern2.split(path.sep).join("/");
  }
  this.options = options;
  this.set = [];
  this.pattern = pattern2;
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
  var pattern2 = this.pattern;
  var options = this.options;
  if (!options.nocomment && pattern2.charAt(0) === "#") {
    this.comment = true;
    return;
  }
  if (!pattern2) {
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
  var pattern2 = this.pattern;
  var negate = false;
  var options = this.options;
  var negateOffset = 0;
  if (options.nonegate)
    return;
  for (var i = 0, l = pattern2.length; i < l && pattern2.charAt(i) === "!"; i++) {
    negate = !negate;
    negateOffset++;
  }
  if (negateOffset)
    this.pattern = pattern2.substr(negateOffset);
  this.negate = negate;
}
minimatch.braceExpand = function(pattern2, options) {
  return braceExpand(pattern2, options);
};
Minimatch.prototype.braceExpand = braceExpand;
function braceExpand(pattern2, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options;
    } else {
      options = {};
    }
  }
  pattern2 = typeof pattern2 === "undefined" ? this.pattern : pattern2;
  assertValidPattern(pattern2);
  if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern2)) {
    return [pattern2];
  }
  return expand(pattern2);
}
var MAX_PATTERN_LENGTH = 1024 * 64;
var assertValidPattern = function(pattern2) {
  if (typeof pattern2 !== "string") {
    throw new TypeError("invalid pattern");
  }
  if (pattern2.length > MAX_PATTERN_LENGTH) {
    throw new TypeError("pattern is too long");
  }
};
Minimatch.prototype.parse = parse$1;
var SUBPARSE = {};
function parse$1(pattern2, isSub) {
  assertValidPattern(pattern2);
  var options = this.options;
  if (pattern2 === "**") {
    if (!options.noglobstar)
      return GLOBSTAR;
    else
      pattern2 = "*";
  }
  if (pattern2 === "")
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
  var patternStart = pattern2.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
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
  for (var i = 0, len = pattern2.length, c; i < len && (c = pattern2.charAt(i)); i++) {
    this.debug("%s	%s %s %j", pattern2, i, re, c);
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
        this.debug("%s	%s %s %j <-- stateChar", pattern2, i, re, c);
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
        var cs = pattern2.substring(classStart + 1, i);
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
    cs = pattern2.substr(classStart + 1);
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
    return globUnescape(pattern2);
  }
  var flags2 = options.nocase ? "i" : "";
  try {
    var regExp = new RegExp("^" + re + "$", flags2);
  } catch (er) {
    return new RegExp("$.");
  }
  regExp._glob = pattern2;
  regExp._src = re;
  return regExp;
}
minimatch.makeRe = function(pattern2, options) {
  return new Minimatch(pattern2, options || {}).makeRe();
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
  var re = set.map(function(pattern2) {
    return pattern2.map(function(p) {
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
minimatch.match = function(list2, pattern2, options) {
  options = options || {};
  var mm = new Minimatch(pattern2, options);
  list2 = list2.filter(function(f) {
    return mm.match(f);
  });
  if (mm.options.nonull && !list2.length) {
    list2.push(pattern2);
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
    var pattern2 = set[i];
    var file = f;
    if (options.matchBase && pattern2.length === 1) {
      file = [filename];
    }
    var hit = this.matchOne(file, pattern2, partial);
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
Minimatch.prototype.matchOne = function(file, pattern2, partial) {
  var options = this.options;
  this.debug(
    "matchOne",
    { "this": this, file, pattern: pattern2 }
  );
  this.debug("matchOne", file.length, pattern2.length);
  for (var fi = 0, pi = 0, fl = file.length, pl = pattern2.length; fi < fl && pi < pl; fi++, pi++) {
    this.debug("matchOne loop");
    var p = pattern2[pi];
    var f = file[fi];
    this.debug(pattern2, p, f);
    if (p === false)
      return false;
    if (p === GLOBSTAR) {
      this.debug("GLOBSTAR", [pattern2, p, f]);
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
        this.debug("\nglobstar while", file, fr, pattern2, pr, swallowee);
        if (this.matchOne(file.slice(fr), pattern2.slice(pr), partial)) {
          this.debug("globstar found match!", fr, fl, swallowee);
          return true;
        } else {
          if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
            this.debug("dot detected!", file, fr, pattern2, pr);
            break;
          }
          this.debug("globstar swallow a segment, and continue");
          fr++;
        }
      }
      if (partial) {
        this.debug("\n>>> no match, partial?", file, fr, pattern2, pr);
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
  var hash2 = fold(fold(fold(input, key), toString$2(value)), typeof value);
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
function toString$2(o) {
  return Object.prototype.toString.call(o);
}
function sum(o) {
  return pad(foldValue(0, o, "", []).toString(16), 8);
}
var hashSum = sum;
function objectHash(obj2, settings = {}) {
  settings = Object.assign({}, settings);
  return hashSum(obj2);
}
function __sort(object, sort) {
  const keys3 = Object.keys(object);
  const sortedKeys = keys3.sort((a2, b) => {
    return sort({ key: a2, value: object[a2] }, { key: b, value: object[b] });
  });
  const resultObj = {};
  sortedKeys.forEach((k2) => {
    resultObj[k2] = object[k2];
  });
  return resultObj;
}
class SLog {
  constructor(logObj) {
    var _a3;
    if (!(logObj === null || logObj === void 0 ? void 0 : logObj.value) && !logObj._logObj) {
      throw new Error(`<red>[${this.constructor.name}]</red> Sorry but you cannot instanciate a new SLog without a "<yellow>value</yellow>" property...`);
    }
    this._logObj = __deepMerge(
      {
        type: SLog.TYPE_LOG,
        timestamp: Date.now(),
        decorators: true,
        time: false
      },
      this.constructor._defaultLogObj,
      (_a3 = logObj._logObj) !== null && _a3 !== void 0 ? _a3 : logObj
    );
  }
  static filter(types2) {
    this._filteredTypes = types2;
  }
  static clearFilters() {
    this._filteredTypes = [];
  }
  static setDefaultLogObj(logObj) {
    this._defaultLogObj = logObj;
  }
  static isTypeEnabled(types2) {
    if (!Array.isArray(types2))
      types2 = [types2];
    for (const type of types2) {
      if (!this._filteredTypes.includes(type))
        return false;
    }
    return true;
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
    if (!this._logObj.type)
      return true;
    if (!this.constructor._filteredTypes.includes(this._logObj.type))
      return false;
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
  get margin() {
    var _a3;
    return (_a3 = this._logObj.margin) !== null && _a3 !== void 0 ? _a3 : {
      top: 0,
      bottom: 0
    };
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
SLog.TYPE_VERBOSER = "verboser";
SLog.TYPE_DECORATOR = "decorator";
SLog.TYPE_SUMMARY = "summary";
SLog.TYPE_CHILD_PROCESS = "child_process";
SLog.TYPES = [
  SLog.TYPE_LOG,
  SLog.TYPE_INFO,
  SLog.TYPE_WARN,
  SLog.TYPE_ERROR,
  SLog.TYPE_VERBOSE,
  SLog.TYPE_VERBOSER,
  SLog.TYPE_SUMMARY,
  SLog.TYPE_DECORATOR,
  SLog.TYPE_CHILD_PROCESS
];
SLog.PRESET_SILENT = [];
SLog.PRESET_DEFAULT = [
  SLog.TYPE_LOG,
  SLog.TYPE_INFO,
  SLog.TYPE_WARN,
  SLog.TYPE_ERROR,
  SLog.TYPE_SUMMARY,
  SLog.TYPE_DECORATOR,
  SLog.TYPE_CHILD_PROCESS
];
SLog.PRESET_WARN = [
  SLog.TYPE_WARN,
  SLog.TYPE_ERROR,
  SLog.TYPE_CHILD_PROCESS
];
SLog.PRESET_ERROR = [
  SLog.TYPE_ERROR,
  SLog.TYPE_CHILD_PROCESS
];
SLog.PRESET_VERBOSE = [
  SLog.TYPE_LOG,
  SLog.TYPE_INFO,
  SLog.TYPE_WARN,
  SLog.TYPE_ERROR,
  SLog.TYPE_VERBOSE,
  SLog.TYPE_DECORATOR,
  SLog.TYPE_SUMMARY,
  SLog.TYPE_CHILD_PROCESS
];
SLog.PRESET_VERBOSER = [
  SLog.TYPE_LOG,
  SLog.TYPE_INFO,
  SLog.TYPE_WARN,
  SLog.TYPE_ERROR,
  SLog.TYPE_VERBOSE,
  SLog.TYPE_VERBOSER,
  SLog.TYPE_DECORATOR,
  SLog.TYPE_SUMMARY,
  SLog.TYPE_CHILD_PROCESS
];
SLog.PRESETS = [
  "silent",
  "default",
  "warn",
  "error",
  "verbose",
  "verboser"
];
SLog._filteredTypes = [];
SLog._defaultLogObj = {};
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor2 = props[i];
    descriptor2.enumerable = descriptor2.enumerable || false;
    descriptor2.configurable = true;
    if ("value" in descriptor2)
      descriptor2.writable = true;
    Object.defineProperty(target, descriptor2.key, descriptor2);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj2, key, value) {
  if (key in obj2) {
    Object.defineProperty(obj2, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj2[key] = value;
  }
  return obj2;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null)
    return;
  var _arr = [];
  var _n = true;
  var _d2 = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i)
        break;
    }
  } catch (err) {
    _d2 = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null)
        _i["return"]();
    } finally {
      if (_d2)
        throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _checkPrivateRedeclaration(obj2, privateCollection) {
  if (privateCollection.has(obj2)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _classPrivateFieldInitSpec(obj2, privateMap, value) {
  _checkPrivateRedeclaration(obj2, privateMap);
  privateMap.set(obj2, value);
}
function _classPrivateMethodInitSpec(obj2, privateSet) {
  _checkPrivateRedeclaration(obj2, privateSet);
  privateSet.add(obj2);
}
var list = [
  " daum[ /]",
  " deusu/",
  "(?:^| )site",
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
  "^anglesharp/",
  "^anonymous",
  "^avsdevicesdk/",
  "^axios/",
  "^bidtellect/",
  "^biglotron",
  "^castro",
  "^clamav[ /]",
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
  "^phantom",
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
  "client",
  "cloud",
  "crawl",
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
  "news",
  "nutch",
  "offbyone",
  "optimize",
  "pageburst",
  "pagespeed",
  "perl",
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
    ["bot", "(?<! cu)bot"],
    ["google", "(?<! (?:channel/|google/))google(?!(app|/google| pixel))"],
    ["http", "(?<!(?:lib))http"],
    ["java", "java(?!;)"],
    ["search", "(?<! ya(?:yandex)?)search"]
  ].forEach(function(_ref) {
    var _ref2 = _slicedToArray(_ref, 2), search = _ref2[0], replace2 = _ref2[1];
    var index = list2.lastIndexOf(search);
    if (~index) {
      list2.splice(index, 1, replace2);
    }
  });
  return list2;
}
amend(list);
var flags = "i";
var _list = /* @__PURE__ */ new WeakMap();
var _pattern = /* @__PURE__ */ new WeakMap();
var _update = /* @__PURE__ */ new WeakSet();
var _index = /* @__PURE__ */ new WeakSet();
var Isbot = /* @__PURE__ */ function() {
  function Isbot2(patterns) {
    var _this = this;
    _classCallCheck(this, Isbot2);
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
    var isbot2 = function isbot3(ua) {
      return _this.test(ua);
    };
    return Object.defineProperties(isbot2, Object.entries(Object.getOwnPropertyDescriptors(Isbot2.prototype)).reduce(function(accumulator, _ref) {
      var _ref2 = _slicedToArray(_ref, 2), prop = _ref2[0], descriptor2 = _ref2[1];
      if (typeof descriptor2.value === "function") {
        Object.assign(accumulator, _defineProperty({}, prop, {
          value: _this[prop].bind(_this)
        }));
      }
      if (typeof descriptor2.get === "function") {
        Object.assign(accumulator, _defineProperty({}, prop, {
          get: function get2() {
            return _this[prop];
          }
        }));
      }
      return accumulator;
    }, {}));
  }
  _createClass(Isbot2, [{
    key: "pattern",
    get: function get2() {
      return new RegExp(_classPrivateFieldGet(this, _pattern));
    }
  }, {
    key: "test",
    value: function test2(ua) {
      return Boolean(ua) && _classPrivateFieldGet(this, _pattern).test(ua);
    }
  }, {
    key: "find",
    value: function find() {
      var ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var match2 = ua.match(_classPrivateFieldGet(this, _pattern));
      return match2 && match2[0];
    }
  }, {
    key: "matches",
    value: function matches() {
      var ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      return _classPrivateFieldGet(this, _list).filter(function(entry) {
        return new RegExp(entry, flags).test(ua);
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      var ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      this.exclude(this.matches(ua));
    }
  }, {
    key: "extend",
    value: function extend3() {
      var _this2 = this;
      var filters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      [].push.apply(_classPrivateFieldGet(this, _list), filters.filter(function(rule) {
        return _classPrivateMethodGet(_this2, _index, _index2).call(_this2, rule) === -1;
      }).map(function(filter2) {
        return filter2.toLowerCase();
      }));
      _classPrivateMethodGet(this, _update, _update2).call(this);
    }
  }, {
    key: "exclude",
    value: function exclude() {
      var filters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      var length = filters.length;
      while (length--) {
        var index = _classPrivateMethodGet(this, _index, _index2).call(this, filters[length]);
        if (index > -1) {
          _classPrivateFieldGet(this, _list).splice(index, 1);
        }
      }
      _classPrivateMethodGet(this, _update, _update2).call(this);
    }
  }, {
    key: "spawn",
    value: function spawn(list2) {
      return new Isbot2(list2 || _classPrivateFieldGet(this, _list));
    }
  }]);
  return Isbot2;
}();
function _update2() {
  _classPrivateFieldSet(this, _pattern, new RegExp(_classPrivateFieldGet(this, _list).join("|"), flags));
}
function _index2(rule) {
  return _classPrivateFieldGet(this, _list).indexOf(rule.toLowerCase());
}
var isbot = new Isbot();
function __isCrawler(ua = navigator.userAgent) {
  return isbot(ua);
}
function __isChildProcess() {
  return process.send !== void 0 || process.env.IS_CHILD_PROCESS !== void 0;
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
function __isCreditCard(value) {
  const re = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
  return re.test(value);
}
function __isEmail(value) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value.toLowerCase());
}
/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var isExtglob$1 = function isExtglob2(str2) {
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
var isExtglob = isExtglob$1;
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
  if (isExtglob(str2)) {
    return true;
  }
  var check = strictCheck;
  if (options && options.strict === false) {
    check = relaxedCheck;
  }
  return check(str2);
};
function __isGlob(string2) {
  return isGlob(string2);
}
function __isIsoDate(value) {
  return value.match(/^([0-9]{4})-(1[0-2]|0[1-9])$/) || value.match(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])$/) || value.match(/^([0-9]{4})(-?)(1[0-2]|0[1-9])\2(3[01]|0[1-9]|[12][0-9])$/) || value.match(/^([0-9]{4})-?(36[0-6]|3[0-5][0-9]|[12][0-9]{2}|0[1-9][0-9]|00[1-9])$/);
}
function __isIsoDateTime(value) {
  return value.match(/^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])↵\s(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$/) || value.match(/^(?:([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])\s(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])|([0-9]{4})(1[0-2]|0[1-9])(3[01]|0[1-9]|[12][0-9])\s(2[0-3]|[01][0-9])([0-5][0-9])([0-5][0-9]))$/);
}
function __isIsoTime(value) {
  return value.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9])$/) || value.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$/) || value.match(/^(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)$/) || value.match(/^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)$/);
}
function __isNode() {
  return typeof process !== "undefined" && process.release && process.release.name === "node";
}
function __isOfType(value, typeString, settings = {}) {
  settings = Object.assign({ verbose: false }, settings);
  const typeInstance = new SType(typeString, settings);
  const res = typeInstance.is(value);
  return res;
}
function __isString(value) {
  return typeof value === "string" || value instanceof String;
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
    const color2 = __pickRandom(availableColors$1);
    _colorsStack[`${scopeId}.${refId}`] = color2;
    return color2;
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
function __uniqid() {
  const url = URL.createObjectURL(new Blob());
  return `s-${url.substring(url.lastIndexOf("/") + 1)}`;
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
  try {
    if (window[string]) {
      return string;
    }
  } catch (e) {
  }
  try {
    const obj = eval(`(${string})`);
    return obj;
  } catch (e) {
    return string;
  }
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
function lowerCase(str2) {
  return str2.toLowerCase();
}
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
function noCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  var _a3 = options.splitRegexp, splitRegexp = _a3 === void 0 ? DEFAULT_SPLIT_REGEXP : _a3, _b2 = options.stripRegexp, stripRegexp = _b2 === void 0 ? DEFAULT_STRIP_REGEXP : _b2, _c2 = options.transform, transform = _c2 === void 0 ? lowerCase : _c2, _d2 = options.delimiter, delimiter = _d2 === void 0 ? " " : _d2;
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
var toRegex$2 = { exports: {} };
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
      var code3 = b ? 8 : a16 ? parseInt(a16, 16) : b16 ? parseInt(b16, 16) : c8 ? parseInt(c8, 8) : dctrl ? CTRL.indexOf(dctrl) : SLSH[eslsh];
      var c = String.fromCharCode(code3);
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
var parse = lib.exports;
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
var isobject$1 = function isObject2(val) {
  return val != null && typeof val === "object" && Array.isArray(val) === false;
};
var toString$1 = Object.prototype.toString;
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
  type = toString$1.call(val);
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
function isAccessorDescriptor(obj2, prop) {
  if (typeof prop === "string") {
    var val = Object.getOwnPropertyDescriptor(obj2, prop);
    return typeof val !== "undefined";
  }
  if (typeOf$2(obj2) !== "object") {
    return false;
  }
  if (has$1(obj2, "value") || has$1(obj2, "writable")) {
    return false;
  }
  if (!has$1(obj2, "get") || typeof obj2.get !== "function") {
    return false;
  }
  if (has$1(obj2, "set") && typeof obj2[key] !== "function" && typeof obj2[key] !== "undefined") {
    return false;
  }
  for (var key in obj2) {
    if (!accessor.hasOwnProperty(key)) {
      continue;
    }
    if (typeOf$2(obj2[key]) === accessor[key]) {
      continue;
    }
    if (typeof obj2[key] !== "undefined") {
      return false;
    }
  }
  return true;
}
function has$1(obj2, key) {
  return {}.hasOwnProperty.call(obj2, key);
}
var isAccessorDescriptor_1 = isAccessorDescriptor;
/*!
 * is-data-descriptor <https://github.com/jonschlinkert/is-data-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var typeOf$1 = kindOf;
var isDataDescriptor = function isDataDescriptor2(obj2, prop) {
  var data = {
    configurable: "boolean",
    enumerable: "boolean",
    writable: "boolean"
  };
  if (typeOf$1(obj2) !== "object") {
    return false;
  }
  if (typeof prop === "string") {
    var val = Object.getOwnPropertyDescriptor(obj2, prop);
    return typeof val !== "undefined";
  }
  if (!("value" in obj2) && !("writable" in obj2)) {
    return false;
  }
  for (var key in obj2) {
    if (key === "value")
      continue;
    if (!data.hasOwnProperty(key)) {
      continue;
    }
    if (typeOf$1(obj2[key]) === data[key]) {
      continue;
    }
    if (typeof obj2[key] !== "undefined") {
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
var isDescriptor$1 = function isDescriptor2(obj2, key) {
  if (typeOf(obj2) !== "object") {
    return false;
  }
  if ("get" in obj2) {
    return isAccessor(obj2, key);
  }
  return isData(obj2, key);
};
/*!
 * define-property <https://github.com/jonschlinkert/define-property>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Released under the MIT License.
 */
var isobject = isobject$1;
var isDescriptor = isDescriptor$1;
var define$e = typeof Reflect !== "undefined" && Reflect.defineProperty ? Reflect.defineProperty : Object.defineProperty;
var defineProperty = function defineProperty2(obj2, key, val) {
  if (!isobject(obj2) && typeof obj2 !== "function" && !Array.isArray(obj2)) {
    throw new TypeError("expected an object, function, or array");
  }
  if (typeof key !== "string") {
    throw new TypeError('expected "key" to be a string');
  }
  if (isDescriptor(val)) {
    define$e(obj2, key, val);
    return obj2;
  }
  define$e(obj2, key, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  });
  return obj2;
};
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var isObject$4 = isobject$1;
function isObjectObject(o) {
  return isObject$4(o) === true && Object.prototype.toString.call(o) === "[object Object]";
}
var isPlainObject$1 = function isPlainObject2(o) {
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
var isPlainObject = isPlainObject$1;
var isExtendable$2 = function isExtendable2(val) {
  return isPlainObject(val) || typeof val === "function" || Array.isArray(val);
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
var isExtendable$1 = isExtendable$2;
var assignSymbols = assignSymbols$1;
var extendShallow$1 = Object.assign || function(obj2) {
  if (obj2 === null || typeof obj2 === "undefined") {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  if (!isObject$3(obj2)) {
    obj2 = {};
  }
  for (var i = 1; i < arguments.length; i++) {
    var val = arguments[i];
    if (isString$2(val)) {
      val = toObject(val);
    }
    if (isObject$3(val)) {
      assign$3(obj2, val);
      assignSymbols(obj2, val);
    }
  }
  return obj2;
};
function assign$3(a2, b) {
  for (var key in b) {
    if (hasOwn$1(b, key)) {
      a2[key] = b[key];
    }
  }
}
function isString$2(val) {
  return val && typeof val === "string";
}
function toObject(str2) {
  var obj2 = {};
  for (var i in str2) {
    obj2[i] = str2[i];
  }
  return obj2;
}
function isObject$3(val) {
  return val && typeof val === "object" || isExtendable$1(val);
}
function hasOwn$1(obj2, key) {
  return Object.prototype.hasOwnProperty.call(obj2, key);
}
var extend$2 = extendShallow$1;
var safe$1 = safeRegex;
function toRegex$1(pattern2, options) {
  return new RegExp(toRegex$1.create(pattern2, options));
}
toRegex$1.create = function(pattern2, options) {
  if (typeof pattern2 !== "string") {
    throw new TypeError("expected a string");
  }
  var opts = extend$2({}, options);
  if (opts.contains === true) {
    opts.strictNegate = false;
  }
  var open = opts.strictOpen !== false ? "^" : "";
  var close = opts.strictClose !== false ? "$" : "";
  var endChar = opts.endChar ? opts.endChar : "+";
  var str2 = pattern2;
  if (opts.strictNegate === false) {
    str2 = "(?:(?!(?:" + pattern2 + ")).)" + endChar;
  } else {
    str2 = "(?:(?!^(?:" + pattern2 + ")$).)" + endChar;
  }
  var res = open + str2 + close;
  if (opts.safe === true && safe$1(res) === false) {
    throw new Error("potentially unsafe regular expression: " + res);
  }
  return res;
};
var regexNot = toRegex$1;
var safe = safeRegex;
var define$d = defineProperty;
var extend$1 = extendShallow$1;
var not = regexNot;
var MAX_LENGTH = 1024 * 64;
var cache = {};
toRegex$2.exports = function(patterns, options) {
  if (!Array.isArray(patterns)) {
    return makeRe(patterns, options);
  }
  return makeRe(patterns.join("|"), options);
};
function makeRe(pattern2, options) {
  if (pattern2 instanceof RegExp) {
    return pattern2;
  }
  if (typeof pattern2 !== "string") {
    throw new TypeError("expected a string");
  }
  if (pattern2.length > MAX_LENGTH) {
    throw new Error("expected pattern to be less than " + MAX_LENGTH + " characters");
  }
  var key = pattern2;
  if (!options || options && options.cache !== false) {
    key = createKey(pattern2, options);
    if (cache.hasOwnProperty(key)) {
      return cache[key];
    }
  }
  var opts = extend$1({}, options);
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
      pattern2 = not.create(pattern2, opts);
    }
    var str2 = open + "(?:" + pattern2 + ")" + close;
    regex2 = new RegExp(str2, flags2);
    if (opts.safe === true && safe(regex2) === false) {
      throw new Error("potentially unsafe regular expression: " + regex2.source);
    }
  } catch (err) {
    if (opts.strictErrors === true || opts.safe === true) {
      err.key = key;
      err.pattern = pattern2;
      err.originalOptions = options;
      err.createdOptions = opts;
      throw err;
    }
    try {
      regex2 = new RegExp("^" + pattern2.replace(/(\W)/g, "\\$1") + "$");
    } catch (err2) {
      regex2 = /.^/;
    }
  }
  if (opts.cache !== false) {
    memoize(regex2, key, pattern2, opts);
  }
  return regex2;
}
function memoize(regex2, key, pattern2, options) {
  define$d(regex2, "cached", true);
  define$d(regex2, "pattern", pattern2);
  define$d(regex2, "options", options);
  define$d(regex2, "key", key);
  cache[key] = regex2;
}
function createKey(pattern2, options) {
  if (!options)
    return pattern2;
  var key = pattern2;
  for (var prop in options) {
    if (options.hasOwnProperty(prop)) {
      key += ";" + prop + "=" + String(options[prop]);
    }
  }
  return key;
}
toRegex$2.exports.makeRe = makeRe;
function format$1(string2, format2) {
  var _a3;
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
      return string2.replace(/^[0-9]+$/i, "");
    case "number":
      return string2.replace(/^[0-9\.]+$/i, "");
    case "alphanum":
      return string2.replace(/^[a-z0-9]+$/i, "");
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
      return string2;
  }
  let newValue = "";
  const loopOn = string2.length > schema.length ? string2 : schema;
  let schemaCharI = 0;
  for (let i = 0; i < loopOn.length; i++) {
    const schemaChar = schema[schemaCharI], char = (_a3 = string2[i]) !== null && _a3 !== void 0 ? _a3 : "";
    if (!schemaChar || !char || i >= string2.length) {
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
format$1.formats = [
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
      var cursor = 1, tree_length = parse_tree.length, arg, output = "", i, k2, ph, pad2, pad_character, pad_length, is_positive, sign2;
      for (i = 0; i < tree_length; i++) {
        if (typeof parse_tree[i] === "string") {
          output += parse_tree[i];
        } else if (typeof parse_tree[i] === "object") {
          ph = parse_tree[i];
          if (ph.keys) {
            arg = argv[cursor];
            for (k2 = 0; k2 < ph.keys.length; k2++) {
              if (arg == void 0) {
                throw new Error(sprintf2('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k2], ph.keys[k2 - 1]));
              }
              arg = arg[ph.keys[k2]];
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
class SEventEmitter$1 extends SClass {
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
  static get global() {
    if (!SEventEmitter$1._globalInstance) {
      SEventEmitter$1._globalInstance = new SEventEmitter$1({
        metas: {
          id: "sugarEventSPromise"
        }
      });
    }
    return SEventEmitter$1._globalInstance;
  }
  static pipe(sourceSEventEmitter, destSEventEmitter, settings) {
    const set = Object.assign({ events: "*", overrideEmitter: false, processor: void 0, exclude: ["finally", "resolve", "reject", "cancel", "catch"], filter: void 0 }, settings !== null && settings !== void 0 ? settings : {});
    if (!sourceSEventEmitter || !sourceSEventEmitter.on || typeof sourceSEventEmitter.on !== "function") {
      return sourceSEventEmitter;
    }
    sourceSEventEmitter.on(set.events || "*", (value, metas) => __awaiter$o(this, void 0, void 0, function* () {
      var _a3, _b2, _c2, _d2, _e, _f, _g;
      if (!metas || !value) {
        return;
      }
      metas.id = (_c2 = (_a3 = metas.id) !== null && _a3 !== void 0 ? _a3 : (_b2 = metas.emitter.metas) === null || _b2 === void 0 ? void 0 : _b2.id) !== null && _c2 !== void 0 ? _c2 : __uniqid();
      metas.color = (_f = (_d2 = metas.color) !== null && _d2 !== void 0 ? _d2 : (_e = metas.emitter.metas) === null || _e === void 0 ? void 0 : _e.color) !== null && _f !== void 0 ? _f : getColorFor(metas.id);
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
        if (destSEventEmitter instanceof SEventEmitter$1) {
          if (!set.overrideEmitter && destSEventEmitter.settings.bind) {
            emitMetas.emitter = destSEventEmitter.settings.bind;
          } else if (set.overrideEmitter === true) {
            emitMetas.emitter = destSEventEmitter;
          }
        }
        if (__isNode() && destSEventEmitter === process && __isChildProcess()) {
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
  bind(obj2) {
    this.settings.bind = obj2;
    return this;
  }
  pipe(input, settings) {
    SEventEmitter$1.pipe(input, this, settings);
    return input;
  }
  pipeErrors(input, settings) {
    SEventEmitter$1.pipe(input, this, Object.assign(Object.assign({}, settings), { events: "error" }));
    return input;
  }
  pipeFrom(input, settings) {
    return this.pipe(input, settings);
  }
  pipeTo(dest, settings) {
    SEventEmitter$1.pipe(this, dest, settings);
    return this;
  }
  start() {
    if (!this.settings.asyncStart)
      return;
    this._asyncStarted = true;
    this._processBuffer();
  }
  _createMetas(event, metas = {}) {
    var _a3, _b2, _c2;
    return __deepMerge({
      event,
      name: event,
      emitter: (_b2 = (_a3 = this.settings.bind) !== null && _a3 !== void 0 ? _a3 : metas === null || metas === void 0 ? void 0 : metas.emitter) !== null && _b2 !== void 0 ? _b2 : this,
      originalEmitter: (_c2 = metas === null || metas === void 0 ? void 0 : metas.originalEmitter) !== null && _c2 !== void 0 ? _c2 : this,
      time: Date.now(),
      level: 0
    }, metas !== null && metas !== void 0 ? metas : {});
  }
  emit(event, value, metas) {
    return new Promise((resolve, reject) => __awaiter$o(this, void 0, void 0, function* () {
      let metasObj = this._createMetas(event, metas);
      const isFirstLevel = !metasObj.level;
      if (__isPlainObject(value)) {
        Object.keys(this.settings.defaults).forEach((key) => {
          var _a3;
          const parts = key.split(",").map((l) => l.trim());
          if (parts.indexOf(event) === -1 && parts.indexOf("*") === -1)
            return;
          value = __deepMerge(value, (_a3 = this.settings.defaults) === null || _a3 === void 0 ? void 0 : _a3[key]);
        });
      }
      const CastClass = this.settings.castByEvent[event];
      if (CastClass && isClass$1(CastClass) && !(value instanceof CastClass) && !value._sEventEmitterPreprocessed) {
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
    return __awaiter$o(this, void 0, void 0, function* () {
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
  _emitEventStack(event, initialValue, metasObj) {
    return __awaiter$o(this, void 0, void 0, function* () {
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
        if (globToRegexp(stackName).test(event) && this._eventsStacks[stackName] !== void 0) {
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
  _emitEvents(events, initialValue, metas) {
    return new Promise((resolve, reject) => __awaiter$o(this, void 0, void 0, function* () {
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
SEventEmitter$1.usableAsMixin = true;
class SEventEmitter extends SEventEmitter$1 {
}
function __convertTime(from2, to = "ms") {
  let fromMs = from2;
  if (typeof from2 === "string") {
    const fromNumber = parseFloat(from2);
    const fromLength = fromNumber.toString().length;
    const fromString2 = from2.slice(fromLength);
    if (fromString2 === "ms" || fromString2 === "millisecond" || fromString2 === "milliseconds") {
      fromMs = fromNumber;
    } else if (fromString2 === "s" || fromString2 === "second" || fromString2 === "seconds") {
      fromMs = fromNumber * 1e3;
    } else if (fromString2 === "m" || fromString2 === "minute" || fromString2 === "minutes") {
      fromMs = fromNumber * 60 * 1e3;
    } else if (fromString2 === "h" || fromString2 === "hour" || fromString2 === "hours") {
      fromMs = fromNumber * 60 * 60 * 1e3;
    } else if (fromString2 === "d" || fromString2 === "day" || fromString2 === "days") {
      fromMs = fromNumber * 24 * 60 * 60 * 1e3;
    } else if (fromString2 === "w" || fromString2 === "week" || fromString2 === "weeks") {
      fromMs = fromNumber * 7 * 24 * 60 * 60 * 1e3;
    } else if (fromString2 === "month" || fromString2 === "months") {
      fromMs = fromNumber * 31 * 24 * 60 * 60 * 1e3;
    } else if (fromString2 === "y" || fromString2 === "year" || fromString2 === "years") {
      fromMs = fromNumber * 365 * 24 * 60 * 60 * 1e3;
    }
  }
  switch (to) {
    case "ms":
    case "millisecond":
    case "milliseconds":
      return fromMs;
    case "s":
    case "second":
    case "seconds":
      return fromMs / 1e3;
    case "m":
    case "minute":
    case "minutes":
      return fromMs / 1e3 / 60;
    case "h":
    case "hour":
    case "hours":
      return fromMs / 1e3 / 60 / 60;
    case "d":
    case "day":
    case "days":
      return fromMs / 1e3 / 60 / 60 / 24;
    case "w":
    case "week":
    case "weeks":
      return fromMs / 1e3 / 60 / 60 / 24 / 7;
    case "month":
    case "months":
      return fromMs / 1e3 / 60 / 60 / 24 / 31;
    case "y":
    case "year":
    case "years":
      return fromMs / 1e3 / 60 / 60 / 24 / 365;
    default:
      throw new Error(`You try to convert "${from2}" to "${to}" but this format does not exist... The valids formats are "ms,s,m,h,d,w,month,y"...`);
  }
}
__convertTime.MILLISECOND = "ms";
__convertTime.SECOND = "s";
__convertTime.MINUTE = "m";
__convertTime.HOUR = "h";
__convertTime.DAY = "d";
__convertTime.WEEK = "w";
__convertTime.MONTH = "month";
__convertTime.YEAR = "y";
function __wait(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
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
class SPromise extends SClass.extends(Promise) {
  constructor(executorFnOrSettings = {}, settings) {
    var _a3;
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
    this._eventEmitter = new SEventEmitter(__deepMerge({
      metas: Object.assign({}, this.metas)
    }, (_a3 = this.settings.eventEmitter) !== null && _a3 !== void 0 ? _a3 : {}));
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
      (() => __awaiter$n(this, void 0, void 0, function* () {
        yield __wait(0);
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
  static queue(promises, before, after) {
    return new SPromise(({ resolve, reject, pipe }) => __awaiter$n(this, void 0, void 0, function* () {
      const results = {};
      function next() {
        return __awaiter$n(this, void 0, void 0, function* () {
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
  static treatAsValue(promise, settings = {}) {
    return fn(promise, settings);
  }
  get promiseSettings() {
    var _a3;
    return (_a3 = this.settings.promise) !== null && _a3 !== void 0 ? _a3 : this.settings;
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
    ar.forEach((a2) => {
      if (a2 === "resolve") {
        this.settings.promise.resolveProxies.push(proxy);
      } else if (a2 === "reject") {
        this.settings.promise.rejectProxies.push(proxy);
      }
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
    return __awaiter$n(this, void 0, void 0, function* () {
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
  reject(arg, stacksOrder = `catch,reject,finally`) {
    return this._reject(arg, stacksOrder);
  }
  _reject(arg, stacksOrder = `catch,reject,finally`) {
    return __awaiter$n(this, void 0, void 0, function* () {
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
  cancel(arg, stacksOrder = "cancel,finally") {
    return this._cancel(arg, stacksOrder);
  }
  _cancel(arg, stacksOrder = "cancel,finally") {
    if (this._promiseState === "destroyed")
      return;
    return new Promise((resolve, reject) => __awaiter$n(this, void 0, void 0, function* () {
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
function parseSingleTypeString(typeString) {
  let ofStr = "", typeStr = typeString, ofTypes = [];
  if (typeStr.match(/^['"`]/)) {
    return {
      type: "string",
      of: void 0,
      value: typeStr.replace(/^['"`]/, "").replace(/['"`]$/, "")
    };
  }
  const autoCastedValue = autoCast(typeStr);
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
    return __parseHtml(`
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
    this.types = __parseTypeString(typeString);
    this.settings = __deepMerge({
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
  static parseTypeString(typeString) {
    return __parseTypeString(typeString);
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
    settings = __deepMerge(this.settings, settings);
    const issues = {};
    for (let i = 0; i < this.types.length; i++) {
      const typeObj = this.types[i], typeId = typeObj.type;
      const res2 = this._isType(value, typeId, settings);
      if (res2 === true) {
        if (typeObj.of === void 0)
          return true;
        const typeOf2 = __typeof(value);
        if (typeOf2 !== "Array" && typeOf2 !== "Object" && typeOf2 !== "Map") {
          throw new Error(`Sorry but you have specified a type string "<yellow>${this.typeString}</yellow>" with some "<...>" definition on a type "<cyan>${typeOf2}</cyan>" that does not support "child" value(s)...`);
        }
        const loopOn = typeOf2 === "Object" ? Object.keys(value) : Array.from(value.keys());
        if (!loopOn.length)
          return true;
        for (let k2 = 0; k2 < loopOn.length; k2++) {
          for (let j = 0; j < typeObj.of.length; j++) {
            const type = typeObj.of[j];
            const idx = loopOn[k2];
            const v = typeOf2 === "Map" ? value.get(idx) : value[idx];
            const ofRes = this._isType(v, type, settings);
            if (ofRes !== true) {
              issues[typeObj.type] = {
                expected: {
                  type: typeObj.type
                },
                received: {
                  type: __typeof(v),
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
            type: __typeof(value),
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
        type: __typeof(value)
      },
      issues,
      settings
    });
    return res;
  }
  _isType(value, type, settings = {}) {
    settings = __deepMerge(this.settings, settings);
    if (this.constructor._registeredTypes[type.toLowerCase()] === void 0) {
      if (settings.interfaces === true) {
        const availableInterfaceTypes = SInterface.getAvailableTypes();
        if (availableInterfaceTypes[type] !== void 0) {
          const res = availableInterfaceTypes[type].apply(value, {});
          return res;
        }
      }
      if (settings.customTypes === true) {
        const typeOf2 = __typeof(value).toLowerCase();
        const extendsStack = Object.keys(fn$2(value)).map((s) => s.toLowerCase());
        if (type === typeOf2 || extendsStack.indexOf(type) !== -1)
          return true;
      }
      throw new Error(`Sorry but you try to validate a value with the type "<yellow>${type}</yellow>" but this type is not registered...`);
    }
    return this.constructor._registeredTypes[type.toLowerCase()].is(value);
  }
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
        castedValue = fn$1(castedValue, ({ value: value2 }) => {
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
      `Sorry but the value of type "<cyan>${__typeof(value)}</cyan>" passed to be casted in type "<yellow>${this.typeString}</yellow>" can not be casted correctly. Here's why:
`
    ];
    Object.keys(verboseObj.issues).forEach((descriptorId) => {
      stack.push(`- <red>${descriptorId}</red>: ${verboseObj.issues[descriptorId]}`);
    });
    throw new Error(__parseHtml(stack.join("\n")));
  }
  canHaveChilds(value) {
    const type = __typeof(value);
    return type === "Array" || type === "Object" || type === "Map";
  }
  get name() {
    return this.settings.name;
  }
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
  is: (value) => isClass$1(value),
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
      console.log("vv", value, typeof value);
      return new Error(`Sorry but only strings can be casted to numbers...`);
    }
    const res = parseFloat(value);
    if (isNaN(res))
      return new Error(`Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Number</green> does not work...`);
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
  is: (value) => __isString(value),
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
const ruleObj = {
  prority: 10,
  name: "Type",
  id: "type",
  settings: {},
  processParams: (params) => {
    var _a3, _b2;
    if (!(params === null || params === void 0 ? void 0 : params.type) && typeof params !== "string") {
      throw new Error(`<yellow>[sugar.shared.type.descriptors.typeRule]</yellow> Sorry but to use the <magenta>type</magenta> descriptor rule you need to specify a type string either directly under the "type" property, or in an object under the "type.type" property...`);
    }
    return Object.assign(Object.assign({}, typeof params !== "string" ? params : {}), { type: (_a3 = params.type) !== null && _a3 !== void 0 ? _a3 : params, cast: (_b2 = params.cast) !== null && _b2 !== void 0 ? _b2 : true });
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
    return __parseHtml(`
${headerArray.join("\n")}
${issuesArray.join("\n")}
${settingsArray.join("\n")}
    `).trim();
  }
}
class SDescriptor extends SClass {
  constructor(settings) {
    super(__deepMerge({
      rules: {},
      type: "Object",
      arrayAsValue: false,
      throwOnMissingRule: false,
      defaults: true
    }, settings !== null && settings !== void 0 ? settings : {}));
  }
  static registerRule(rule) {
    if (rule.id === void 0 || typeof rule.id !== "string") {
      throw new Error(`Sorry but you try to register a rule that does not fit the ISDescriptionRule interface...`);
    }
    this._registeredRules[rule.id] = rule;
  }
  apply(value, settings) {
    const set = __deepMerge(this.settings, settings || {});
    if (value === void 0 || value === null)
      value = {};
    const valuesObjToProcess = {}, finalValuesObj = {};
    this._descriptorResult = new SDescriptorResult(this, finalValuesObj, Object.assign({}, set));
    const rules = set.rules;
    if (!__isOfType(value, set.type)) {
      throw new Error(`Sorry but this descriptor "<yellow>${this.metas.name}</yellow>" does not accept values of type "<cyan>${__typeof(value)}</cyan>" but only "<green>${set.type}</green>"...`);
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
    rulesNamesInOrder = rulesNamesInOrder.sort((a2, b) => {
      const objA = this.constructor._registeredRules[a2];
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
SDescriptor.registerRule(ruleObj$1);
SDescriptor.registerRule(ruleObj);
SDescriptor.registerRule(ruleObj$2);
SDescriptor.registerRule(ruleObj$3);
function __parseArgs(string2, settings) {
  settings = __deepMerge({
    valueQuote: void 0,
    treatNoAsBoolean: true,
    camelCase: true
  }, settings !== null && settings !== void 0 ? settings : {});
  string2 = string2.trim();
  string2 = string2.replace(/(["'`])--/gm, "$1--\xA7 --");
  if (settings.treatNoAsBoolean) {
    const noMatches = string2.match(/--no-[\w]+/g);
    noMatches === null || noMatches === void 0 ? void 0 : noMatches.forEach((match2) => {
      string2 = string2.replace(match2, `${match2.replace("--no-", "--")} false`);
    });
  }
  let valueQuote = settings.valueQuote;
  if (!valueQuote) {
    for (let i = 0; i < string2.length; i++) {
      const char = string2[i];
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
    for (let i = 0; i < string2.length; i++) {
      const char = string2[i];
      const previousChar = string2[i - 1] || string2[0];
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
    for (let i = 0; i < string2.length; i++) {
      const char = string2[i];
      const previousChar = string2[i - 1] || string2[0];
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
      currentValue = __parse$1(value);
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
function getAvailableInterfaceTypes() {
  if (__isNode())
    return global._registeredInterfacesTypes || {};
  else if (window !== void 0)
    return window._registeredInterfacesTypes || {};
  else
    return {};
}
try {
  if (global)
    global._registeredInterfacesTypes = {};
  else
    window._registeredInterfacesTypes = {};
} catch (e) {
}
class SInterface extends SClass {
  constructor(settings) {
    super(__deepMerge({
      stripUnkown: false
    }, settings !== null && settings !== void 0 ? settings : {}));
    this._definition = {};
    this._definition = this.constructor.definition;
  }
  static get definition() {
    var _a3;
    if (this._cachedDefinition)
      return this._cachedDefinition;
    this._cachedDefinition = (_a3 = this._definition) !== null && _a3 !== void 0 ? _a3 : {};
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
  static mix(...ints) {
    const newInt = new SInterface();
    ints.forEach((int) => {
      if (int.definition) {
        newInt.definition = __deepMerge(newInt.definition, int.definition);
      }
    });
    return newInt;
  }
  static override(definition2) {
    const _this = this;
    class SInterfaceOverrided extends this {
    }
    SInterfaceOverrided.overridedName = `${_this.name} (overrided)`;
    SInterfaceOverrided.definition = __deepMerge(_this.definition, definition2);
    return SInterfaceOverrided;
  }
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
  static getAvailableTypes() {
    return getAvailableInterfaceTypes();
  }
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
  static toObject() {
    var _a3;
    return {
      name: this.name,
      description: (_a3 = this.description) !== null && _a3 !== void 0 ? _a3 : "",
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
    var _a3;
    const set = __deepMerge(this.settings, settings !== null && settings !== void 0 ? settings : {});
    let objectOnWhichToApplyInterface = objectOrString;
    if (typeof objectOrString === "string") {
      objectOnWhichToApplyInterface = __parseArgs(objectOrString);
      Object.keys(objectOnWhichToApplyInterface).forEach((argName) => {
        for (let i = 0; i < Object.keys(this._definition).length; i++) {
          const defArgName = Object.keys(this._definition)[i];
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
        for (let i = 0; i < Object.keys(this._definition).length; i++) {
          const defArgName = Object.keys(this._definition)[i];
          const obj2 = this._definition[defArgName];
          if (!obj2.alias)
            continue;
          if (obj2.alias === argName && objectOnWhichToApplyInterface[defArgName] === void 0) {
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
    const descriptor2 = new SDescriptor(Object.assign({ type: "Object", rules: this._definition }, (_a3 = set.descriptor) !== null && _a3 !== void 0 ? _a3 : {}));
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
class SStateLsAdapter {
  constructor(id) {
    this.async = false;
    this._id = id;
  }
  save(state) {
    window.localStorage.setItem(`state-${this._id}`, JSON.stringify(state));
  }
  load() {
    var _a3;
    return JSON.parse((_a3 = window.localStorage.getItem(`state-${this._id}`)) !== null && _a3 !== void 0 ? _a3 : "{}");
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
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
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
  })).then(() => baseModule());
};
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
class SStateFsAdapter {
  constructor(id, settings) {
    this.async = true;
    this._id = id;
    this._settings = settings;
  }
  _init() {
    var _a3, _b2;
    return __awaiter$m(this, void 0, void 0, function* () {
      const _packageTmpDir = (yield __vitePreload(() => import("./packageTmpDir.fed73780.js"), true ? [] : void 0)).default;
      this._statesDir = (_b2 = (_a3 = this._settings) === null || _a3 === void 0 ? void 0 : _a3.folder) !== null && _b2 !== void 0 ? _b2 : `${_packageTmpDir()}/states`;
      this._stateFile = `${this._statesDir}/${this._id}.state.json`;
    });
  }
  save(state) {
    return new Promise((resolve) => __awaiter$m(this, void 0, void 0, function* () {
      const _fs = yield __vitePreload(() => import("./__vite-browser-external_fs.addc2852.js"), true ? [] : void 0);
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
    return new Promise((resolve) => __awaiter$m(this, void 0, void 0, function* () {
      const _fs = yield __vitePreload(() => import("./__vite-browser-external_fs.addc2852.js"), true ? [] : void 0);
      yield this._init();
      let fileContent = "{}";
      if (_fs.existsSync(this._stateFile)) {
        fileContent = _fs.readFileSync(this._stateFile, "utf-8").toString();
      }
      resolve(JSON.parse(fileContent));
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
class SState extends SClass {
  constructor(object, settings) {
    super(__deepMerge({
      watchDeep: false,
      save: false,
      exclude: []
    }, settings !== null && settings !== void 0 ? settings : {}));
    if (this.settings.save && !this.settings.id) {
      throw new Error(`You MUST set an id for your state when using the "save" setting. Pass an "id" in the settings...`);
    }
    if (this.settings.save && !this.settings.adapter) {
      if (__isNode()) {
        this.settings.adapter = new SStateFsAdapter(this.settings.id);
      } else {
        this.settings.adapter = new SStateLsAdapter(this.settings.id);
      }
    }
    let saveTimeout;
    const proxy = __deepProxy(object, (actionObj) => {
      switch (actionObj.action) {
        case "set":
          this._eventEmitter.emit(`set.${actionObj.path}`, actionObj);
          break;
        case "delete":
          this._eventEmitter.emit(`delete.${actionObj.path}`, actionObj);
          break;
      }
      if (this.settings.save) {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          const stateToSave = JSON.parse(JSON.stringify(proxy));
          this.settings.exclude.forEach((prop) => {
            delete stateToSave[prop];
          });
          this.settings.adapter.save(stateToSave);
        });
      }
    }, {
      deep: this.settings.watchDeep
    });
    this._eventEmitter = new SEventEmitter();
    const _this = this;
    Object.defineProperty(proxy, "$set", {
      enumerable: false,
      get() {
        return (event, handler) => {
          return _this._eventEmitter.on(`set.${event}`, handler);
        };
      }
    });
    Object.defineProperty(proxy, "$delete", {
      enumerable: false,
      get() {
        return (event, handler) => {
          return _this._eventEmitter.on(`delete.${event}`, handler);
        };
      }
    });
    Object.defineProperty(proxy, "isSState", {
      enumerable: false,
      get() {
        return true;
      }
    });
    if (this.settings.save) {
      if (this.settings.adapter.async) {
        (() => __awaiter$l(this, void 0, void 0, function* () {
          const restoredState = yield this.settings.adapter.load();
          __deepAssign(proxy, restoredState);
        }))();
      } else {
        const restoredState = this.settings.adapter.load();
        __deepAssign(proxy, restoredState);
      }
    }
    this._proxy = proxy;
    return proxy;
  }
}
function __parseHsla(hslaString) {
  hslaString = hslaString.toLowerCase();
  const string2 = hslaString.replace("hsla(", "").replace("hsl(", "").replace(")", "").replace(/\s/g, "");
  const array = string2.split(",");
  return {
    h: parseFloat(array[0]),
    s: parseFloat(array[1]),
    l: parseFloat(array[2]),
    a: array[3] ? parseFloat(array[3]) : 1
  };
}
function HSLAToRGBA(h, s, l, a2) {
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
    a: a2
  };
}
function __hslaToRgba(h, s, l, a2 = 1) {
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
    a2 = h.a;
  }
  return HSLAToRGBA(h, s, l, a2);
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
function __hexToRgba(hex2) {
  return hexToRGBA(hex2);
}
function __parseRgba(rgbaString) {
  rgbaString = rgbaString.toLowerCase();
  const string2 = rgbaString.replace("rgba(", "").replace("rgb(", "").replace(")", "").replace(/\s/g, "");
  const array = string2.split(",");
  return {
    r: parseInt(array[0]),
    g: parseInt(array[1]),
    b: parseInt(array[2]),
    a: array[3] ? parseInt(array[3]) : 1
  };
}
function RGBAToHSLA(r, g2, b, a2) {
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
  return { h, s, l, a: a2 };
}
function __rgbaToHsla(r, g2, b, a2 = 1) {
  if (typeof r === "string") {
    if (!r.match(/^rgba?\(/)) {
      throw new Error("<red>[rgbaToHsla]</red> When passing a string to the first parameter, it MUST be formatted like: rgba?(.*)");
    }
    r = __parseRgba(r);
  }
  if (typeof r === "object") {
    g2 = r.g;
    b = r.b;
    a2 = r.a;
    r = r.r;
  }
  return RGBAToHSLA(r, g2, b, a2);
}
function __parse(color2, format2 = "rgba") {
  color2 = color2.replace(/\s/g, "");
  if (color2.startsWith("rgb")) {
    color2 = __parseRgba(color2);
  } else if (color2.startsWith("hsl")) {
    color2 = __parseHsla(color2);
    color2 = __hslaToRgba(color2.h, color2.s, color2.l);
  } else if (color2.startsWith("#")) {
    color2 = __hexToRgba(color2);
  }
  switch (format2) {
    case "hsla":
    case "hsl":
      return __rgbaToHsla(color2);
    case "rgba":
    case "rgb":
    default:
      return color2;
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
function __rgbaToHex(r, g2, b, a2 = 1) {
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
    rgbaObj = __parse(input, "rgba");
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
function __hslaToHex(h, s, l, a2 = 1) {
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
    a2 = h.a;
  }
  return HSLToHex(h, s, l);
}
function HSLAToHexA(h, s, l, a2) {
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
  a2 = Math.round(a2 * 255).toString(16);
  if (r.length == 1)
    r = "0" + r;
  if (g2.length == 1)
    g2 = "0" + g2;
  if (b.length == 1)
    b = "0" + b;
  if (a2.length == 1)
    a2 = "0" + a2;
  return "#" + r + g2 + b + a2;
}
function __hslaToHexa(h, s, l, a2 = 1) {
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
    a2 = h.a;
  }
  return HSLAToHexA(h, s, l, a2);
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
      returnNewInstance: {
        description: "Specify if the methods returns by default a new SColor instance or the same",
        type: "boolean",
        default: false
      },
      defaultFormat: {
        description: "Specify the default format of the color",
        type: "String",
        values: ["hex", "rgb", "rgba", "hsl", "hsla"],
        default: "hex"
      }
    };
  }
}
class SColor extends SClass {
  constructor(color2, settings) {
    var _c2, _d2;
    super(__deepMerge(
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
    color2 = this.getColor(color2);
    this._originalSColor = color2;
    if (typeof color2 === "string") {
      try {
        this._parse(color2);
      } catch (e) {
      }
    } else {
      if (color2.h !== void 0 && color2.s !== void 0 && color2.l !== void 0) {
        this._h = color2.h;
        this._s = color2.s;
        this._l = color2.l;
        this._a = (_c2 = color2.a) !== null && _c2 !== void 0 ? _c2 : 1;
      } else if (color2.r !== void 0 && color2.g !== void 0 && color2.b !== void 0) {
        const converted = __rgbaToHsla(color2.r, color2.g, color2.b, (_d2 = color2.a) !== null && _d2 !== void 0 ? _d2 : 1);
        this._h = converted.h;
        this._s = converted.s;
        this._l = converted.l;
        this._a = converted.a;
      } else {
        console.error(color2);
        throw new Error("Sorry but this passed value is not a valid color object or string...");
      }
    }
  }
  getColor(color2) {
    if (typeof color2 == "string" && SColor.colors[color2.toLowerCase()]) {
      return SColor.colors[color2.toLowerCase()];
    }
    return color2;
  }
  _parse(color2) {
    color2 = __convert(color2, "hsla");
    this.h = color2.h;
    this.s = color2.s;
    this.l = color2.l;
    this.a = color2.a;
    return color2;
  }
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
  toHex() {
    return this._convert2("hex");
  }
  toHexa() {
    return this._convert2("hexa");
  }
  toHsl() {
    return this._convert2("hsl");
  }
  toHsla() {
    return this._convert2("hsla");
  }
  toRgb() {
    return this._convert2("rgb");
  }
  toRgba() {
    return this._convert2("rgba");
  }
  get r() {
    return this._r;
  }
  set r(value) {
    value = parseInt(value);
    value = value > 255 ? 255 : value < 0 ? 0 : value;
    this._r = value;
    this._applyFromRgbaUpdate();
  }
  get g() {
    return this._g;
  }
  set g(value) {
    value = parseInt(value);
    value = value > 255 ? 255 : value < 0 ? 0 : value;
    this._g = value;
    this._applyFromRgbaUpdate();
  }
  get b() {
    return this._b;
  }
  set b(value) {
    value = parseInt(value);
    value = value > 255 ? 255 : value < 0 ? 0 : value;
    this._b = value;
    this._applyFromRgbaUpdate();
  }
  get a() {
    return this._a;
  }
  set a(value) {
    value = parseFloat(value);
    value = value > 1 ? 1 : value < 0 ? 0 : value;
    this._a = value;
  }
  get h() {
    return this._h;
  }
  set h(value) {
    value = parseInt(value);
    value = value > 360 ? 360 : value < 0 ? 0 : value;
    this._h = value;
    this._applyFromHslaUpdate();
  }
  get s() {
    return this._s;
  }
  set s(value) {
    value = parseInt(value);
    value = value > 100 ? 100 : value < 0 ? 0 : value;
    this._s = value;
    this._applyFromHslaUpdate();
  }
  get l() {
    return this._l;
  }
  set l(value) {
    value = parseInt(value);
    value = value > 100 ? 100 : value < 0 ? 0 : value;
    this._l = value;
    this._applyFromHslaUpdate();
  }
  clone() {
    const newColor = new SColor({
      h: this._h,
      s: this._s,
      l: this._l,
      a: this._a
    });
    return newColor;
  }
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
  apply(params, returnNewInstance = this.settings.returnNewInstance) {
    const intRes = SColorApplyParamsInterface.apply(params);
    params = intRes;
    let colorInstance = this;
    if (returnNewInstance) {
      colorInstance = new SColor(this.toHslaString());
    }
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
  desaturate(amount, returnNewInstance = this.settings.returnNewInstance) {
    amount = parseInt(amount);
    if (returnNewInstance) {
      const n = this.clone();
      n.s -= amount;
      return n;
    }
    this.s -= amount;
    return this;
  }
  saturate(amount, returnNewInstance = this.settings.returnNewInstance) {
    amount = parseInt(amount);
    if (returnNewInstance) {
      const n = this.clone();
      n.s += amount;
      return n;
    }
    this.s += amount;
    return this;
  }
  grayscale(returnNewInstance = this.settings.returnNewInstance) {
    if (returnNewInstance) {
      const n = this.clone();
      n.s = 0;
      return n;
    }
    this.s = 0;
    return this;
  }
  spin(amount, returnNewInstance = this.settings.returnNewInstance) {
    amount = parseInt(amount);
    const hue = this.h;
    let newHue = hue + amount;
    if (newHue > 360) {
      newHue -= 360;
    }
    if (returnNewInstance) {
      const n = this.clone();
      n.h = newHue;
      return n;
    }
    this.h = newHue;
    return this;
  }
  alpha(alpha, returnNewInstance = this.settings.returnNewInstance) {
    alpha = parseFloat(alpha);
    if (returnNewInstance) {
      const n = this.clone();
      n.a = alpha;
      return n;
    }
    this.a = alpha;
    return this;
  }
  darken(amount, returnNewInstance = this.settings.returnNewInstance) {
    amount = parseInt(amount);
    if (returnNewInstance) {
      const n = this.clone();
      n.l -= amount;
      return n;
    }
    this.l -= amount;
    if (this.l < 0)
      this.l = 0;
    else if (this.l > 100)
      this.l = 100;
    return this;
  }
  lighten(amount, returnNewInstance = this.settings.returnNewInstance) {
    amount = parseInt(amount);
    if (returnNewInstance) {
      const n = this.clone();
      n.l += amount;
      return n;
    }
    this.l += amount;
    if (this.l < 0)
      this.l = 0;
    else if (this.l > 100)
      this.l = 100;
    return this;
  }
  invert(returnNewInstance = this.settings.returnNewInstance) {
    let lightness = this.l;
    if (this.l >= 50) {
      lightness -= 50;
    } else {
      lightness += 50;
    }
    if (returnNewInstance) {
      const n = this.clone();
      n.l = lightness;
      return n;
    } else {
      this.l = lightness;
    }
    if (this.l < 0)
      this.l = 0;
    else if (this.l > 100)
      this.l = 100;
    return this;
  }
  toObject() {
    return {
      r: this.r,
      g: this.b,
      b: this.b,
      a: this.a,
      h: this.h,
      s: this.s,
      l: this.l,
      hex: this.toHexString(),
      hexa: this.toHexaString(),
      rgb: this.toRgbString(),
      rgba: this.toRgbaString(),
      hsl: this.toHslString(),
      hsla: this.toHslaString()
    };
  }
  toHexString() {
    return this._convert2("hex");
  }
  toHexaString() {
    return this._convert2("hexa");
  }
  toRgbString() {
    return `rgb(${this._r},${this._g},${this._b})`;
  }
  toRgbaString() {
    return `rgba(${this._r},${this._g},${this._b},${this._a})`;
  }
  toHslString() {
    const hsl = this._convert2("hsl");
    return `hsl(${hsl.h},${hsl.s},${hsl.l})`;
  }
  toHslaString() {
    const hsla = this._convert2("hsla");
    return `hsla(${hsla.h},${hsla.s},${hsla.l},${hsla.a})`;
  }
  toString(format2 = this.settings.defaultFormat) {
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
class SSugarConfig {
  static get finalConfig() {
    var _a3, _b2, _c2;
    if (SSugarConfig._finalConfig)
      return SSugarConfig._finalConfig;
    SSugarConfig._finalConfig = __deepMerge(
      (_c2 = (_b2 = (_a3 = document.env) === null || _a3 === void 0 ? void 0 : _a3.SUGAR) === null || _b2 === void 0 ? void 0 : _b2.config) !== null && _c2 !== void 0 ? _c2 : {}
    );
    return SSugarConfig._finalConfig;
  }
  static get(dotpath) {
    return get(SSugarConfig.finalConfig, dotpath);
  }
  static set(dotpath, value) {
    return __set(SSugarConfig.finalConfig, dotpath, value);
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
function __adoptStyleInShadowRoot($shadowRoot, $context = document) {
  return __awaiter$k(this, void 0, void 0, function* () {
    const $links = $context.querySelectorAll('link[rel="stylesheet"]');
    if ($links && $shadowRoot) {
      Array.from($links).forEach(($link) => __awaiter$k(this, void 0, void 0, function* () {
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
      runTasks: function(tasks) {
        var task;
        while (task = tasks.shift())
          task();
      },
      measure: function(fn2, ctx) {
        var task = !ctx ? fn2 : fn2.bind(ctx);
        this.reads.push(task);
        scheduleFlush(this);
        return task;
      },
      mutate: function(fn2, ctx) {
        var task = !ctx ? fn2 : fn2.bind(ctx);
        this.writes.push(task);
        scheduleFlush(this);
        return task;
      },
      clear: function(task) {
        return remove(this.reads, task) || remove(this.writes, task);
      },
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
const __fastdom = fastdom.exports;
function __expandPleasantCssClassname(classesStr) {
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
      let name2 = className;
      if (currentMedia !== "")
        name2 = className + currentMedia;
      classesArray.push(name2);
    } else {
      const firstClass = parts[0];
      let name2 = firstClass;
      if (currentMedia !== "")
        name2 = firstClass + currentMedia;
      classesArray.push(name2);
      parts.forEach((part, i) => {
        if (i > 0) {
          name2 = firstClass + "--" + part;
          if (currentMedia !== "")
            name2 = name2 + currentMedia;
          classesArray.push(name2);
        }
      });
    }
  });
  return classesArray.join(" ");
}
function __expandPleasantCssClassnamesLive(settings) {
  settings = Object.assign({ afterFirst: void 0, rootNode: document }, settings);
  __querySelectorLive('[class*=":"]:not(code [class*=":"]):not(template [class*=":"]),[class*="@"]:not(code [class*="@"]):not(template [class*="@"])', ($elm) => {
    const classesStr = $elm.getAttribute("class");
    const newClassesStr = __expandPleasantCssClassname(classesStr);
    __fastdom.mutate(() => {
      $elm.setAttribute("class", newClassesStr);
    });
  }, {
    afterFirst: settings.afterFirst,
    rootNode: settings === null || settings === void 0 ? void 0 : settings.rootNode
  });
}
var _a$4, _b$4;
let oldX = 0, oldY = 0;
const threshold = 0;
try {
  (_a$4 = document === null || document === void 0 ? void 0 : document.addEventListener) === null || _a$4 === void 0 ? void 0 : _a$4.call(document, "pointermove", (e) => {
    calculateDirection(e);
  });
  (_b$4 = document === null || document === void 0 ? void 0 : document.addEventListener) === null || _b$4 === void 0 ? void 0 : _b$4.call(document, "pointerdown", (e) => {
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
function __onSwipe(elm, cb, settings = {}) {
  settings = Object.assign({ threshold: 100 }, settings);
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;
  const gesuredZone = elm;
  gesuredZone.addEventListener("touchstart", function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  }, false);
  gesuredZone.addEventListener("touchend", function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesure();
  }, false);
  function handleGesure() {
    const swipeNfo = {
      distanceX: Math.abs(touchendX - touchstartX),
      distanceY: Math.abs(touchendY - touchstartY)
    };
    if (touchendX + settings.threshold < touchstartX) {
      swipeNfo.left = true;
    }
    if (touchendX - settings.threshold > touchstartX) {
      swipeNfo.right = true;
    }
    if (touchendY + settings.threshold < touchstartY) {
      swipeNfo.up = true;
    }
    if (touchendY - settings.threshold > touchstartY) {
      swipeNfo.down = true;
    }
    if (swipeNfo.left || swipeNfo.right || swipeNfo.down || swipeNfo.up) {
      cb(swipeNfo);
    }
  }
}
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
const triggers = [
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
function __when($elm, trigger2, settings) {
  const finalSettings = Object.assign({ whenInViewport: {}, whenNearViewport: {}, whenOutOfViewport: {}, whenInteract: {}, whenVisible: {}, whenStylesheetsReady: {} }, settings !== null && settings !== void 0 ? settings : {});
  return new SPromise(({ resolve, reject }) => __awaiter$j(this, void 0, void 0, function* () {
    if (!Array.isArray(trigger2))
      trigger2 = trigger2.split(",").map((t) => t.trim());
    const promises = [];
    trigger2.forEach((t) => {
      const lodMatches = t.match(/^lod\:([0-9]{1,2})/);
      if (lodMatches && lodMatches[1]) {
        const level = parseInt(lodMatches[1]);
        promises.push(whenLod(level));
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
    if (!trigger2.length || trigger2.includes("direct") || trigger2.includes("directly")) {
      resolve($elm);
      return;
    }
    yield Promise.race(promises);
    resolve($elm);
  }));
}
function __whenAnimationEnd($elm) {
  return new SPromise(({ resolve }) => {
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
function __whenDomReady() {
  return new Promise((resolve) => {
    if (document.readyState === "complete") {
      resolve();
    } else {
      document.onreadystatechange = () => {
        if (document.readyState === "complete") {
          resolve();
        }
      };
    }
  });
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
  return new Promise((resolve) => __awaiter$i(this, void 0, void 0, function* () {
    var _a3;
    const options = {
      root: null,
      rootMargin: (_a3 = settings.offset) !== null && _a3 !== void 0 ? _a3 : getRootMargin(),
      threshold: 0
    };
    if (__isInViewport(elm)) {
      return resolve(elm);
    }
    function onChange(changes, observer2) {
      changes.forEach((change) => {
        var _a4;
        if (change.intersectionRatio > 0) {
          (_a4 = observer2.disconnect) === null || _a4 === void 0 ? void 0 : _a4.call(observer2);
          resolve(elm);
        }
      });
    }
    observer = new IntersectionObserver(onChange, options);
    observer.observe(elm);
    window.addEventListener("resize", (e) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        var _a4, _b2;
        (_a4 = observer.disconnect) === null || _a4 === void 0 ? void 0 : _a4.call(observer);
        options.rootMargin = (_b2 = settings.offset) !== null && _b2 !== void 0 ? _b2 : getRootMargin();
        observer = new IntersectionObserver(onChange, options);
        observer.observe(elm);
      }, 500);
    });
  }));
}
function __whenImageLoaded($img, callback = null) {
  let imgLoadedHandler, imgErrorHandler;
  const pro = new SPromise(({ resolve, reject }) => {
    if ($img.hasAttribute("src") && $img.complete) {
      resolve($img);
      callback && callback($img);
    } else {
      imgLoadedHandler = (e) => {
        resolve($img);
        callback && callback($img);
      };
      $img.addEventListener("load", imgLoadedHandler);
      imgErrorHandler = (e) => {
        reject(e);
      };
      $img.addEventListener("error", imgErrorHandler);
    }
  }, {
    id: "whenImageLoaded"
  });
  pro.on("finally", () => {
    imgLoadedHandler && $img.removeEventListener("load", imgLoadedHandler);
    imgErrorHandler && $img.removeEventListener("error", imgErrorHandler);
  });
  return pro;
}
function __whenImagesLoaded($imgs, cb = null) {
  return new SPromise(({ resolve, reject, emit }) => {
    const promises = [], loadedImages = [];
    Array.from($imgs).forEach(($img) => {
      promises.push(__whenImageLoaded($img).then((_$img) => {
        loadedImages.push(_$img);
        emit("img.loaded", _$img);
        if (loadedImages.length === $imgs.length) {
          emit("loaded", loadedImages);
          if (cb)
            cb(loadedImages);
          resolve(loadedImages);
        }
      }).catch((error) => {
        reject(error);
      }));
    });
  });
}
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
      console.log("interacted", interaction);
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
    };
    if (!$elm._whenInViewportStatus) {
      $elm._whenInViewportStatus = {};
    }
    function onChange(changes) {
      changes.forEach((change) => {
        var _a3, _b2;
        if (change.intersectionRatio === 0) {
          if (!$elm._whenInViewportStatus[id]) {
            return;
          }
          $elm._whenInViewportStatus[id] = false;
          (_a3 = settings.whenOut) === null || _a3 === void 0 ? void 0 : _a3.call(settings, $elm);
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
function whenLod(level) {
  return new Promise((resolve) => {
    if (document.body.classList.contains(`s-lod--${level}`)) {
      return resolve();
    }
    const observer = new MutationObserver((mutationList, observer2) => {
      for (const mutation of mutationList) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          if (document.body.classList.contains(`s-lod--${level}`)) {
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
  return new SPromise(({ resolve }) => __awaiter$h(this, void 0, void 0, function* () {
    var _a3;
    const options = {
      root: $closest,
      rootMargin: (_a3 = settings.offset) !== null && _a3 !== void 0 ? _a3 : getRootMargin(),
      threshold: 0
    };
    function onChange(changes, observer2) {
      changes.forEach((change) => {
        var _a4;
        if (change.intersectionRatio > 0) {
          (_a4 = observer2.disconnect) === null || _a4 === void 0 ? void 0 : _a4.call(observer2);
          resolve(elm);
        }
      });
    }
    observer = new IntersectionObserver(onChange, options);
    observer.observe(elm);
    window.addEventListener("resize", (e) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        var _a4, _b2;
        (_a4 = observer.disconnect) === null || _a4 === void 0 ? void 0 : _a4.call(observer);
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
function __whenStylesheetsReady(links = null, cb = null) {
  if (!links) {
    links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  }
  const promises = [];
  [].forEach.call(links, ($link) => {
    promises.push(__whenLinkLoaded($link));
  });
  const allPromises = Promise.all(promises);
  allPromises.then(() => {
    cb === null || cb === void 0 ? void 0 : cb();
  });
  return allPromises;
}
function splitIfNeeded(what, separator) {
  var _a3;
  if ((_a3 = what.includes) === null || _a3 === void 0 ? void 0 : _a3.call(what, separator)) {
    return what.split(separator).map((item) => item.trim());
  }
  return [what];
}
function getTransitionProperties(elm) {
  const property = __getStyleProperty(elm, "transition-property");
  const duration = __getStyleProperty(elm, "transition-duration") || 0;
  const timingFunction = __getStyleProperty(elm, "transition-timing-function");
  const delay = __getStyleProperty(elm, "transition-delay");
  const props = {
    property: splitIfNeeded(property, ","),
    duration: splitIfNeeded(duration, ",").map((value) => __convertTime(value, "ms")),
    delay: splitIfNeeded(delay, ",").map((value) => __convertTime(value, "ms")),
    timingFunction: splitIfNeeded(timingFunction, ",")
  };
  let totalDuration = 0;
  let i = 0;
  const delays = [0].concat(props.delay);
  [0].concat(props.duration).forEach((val) => {
    if (val + delays[i] > totalDuration) {
      totalDuration = val + delays[i];
    }
    i++;
  });
  props.totalDuration = totalDuration;
  return props;
}
function __whenVisible($elm, settings) {
  const pro = new SPromise(({ resolve, reject, emit }) => {
    const finalSettings = Object.assign({ whenVisible: null, whenInvisible: null, once: true }, settings !== null && settings !== void 0 ? settings : {});
    if (!$elm._whenVisibleStatus) {
      $elm._whenVisibleStatus = {};
    }
    const id = __uniqid();
    var observer = new IntersectionObserver(function(entries) {
      var _a3, _b2;
      if (entries[0]["intersectionRatio"] == 0) {
        if (!$elm._whenVisibleStatus[id]) {
          return;
        }
        $elm._whenVisibleStatus[id] = false;
        (_a3 = finalSettings.whenInvisible) === null || _a3 === void 0 ? void 0 : _a3.call(finalSettings, $elm);
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
function __scrollLeft() {
  return window.pageXOffset || document.scrollLeft || document.body.scrollLeft;
}
function scrollTop() {
  return window.pageYOffset || document.scrollTop || document.body.scrollTop;
}
function __elementAreaStats($elm, settings) {
  const finalSettings = Object.assign({ relativeTo: "visible" }, settings !== null && settings !== void 0 ? settings : {});
  if (finalSettings.relativeTo === "visible") {
    finalSettings.relativeTo = __traverseUp($elm, ($item) => {
      const style = window.getComputedStyle($item);
      if (style.overflow === "hidden")
        return $item;
      return false;
    });
  }
  let rootBoundingRect;
  if ((finalSettings === null || finalSettings === void 0 ? void 0 : finalSettings.relativeTo) && finalSettings.relativeTo instanceof HTMLElement) {
    rootBoundingRect = finalSettings === null || finalSettings === void 0 ? void 0 : finalSettings.relativeTo.getBoundingClientRect();
  } else {
    rootBoundingRect = {
      top: scrollTop(),
      left: __scrollLeft(),
      width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
  }
  const boundingRect = $elm.getBoundingClientRect();
  const left = boundingRect.left - rootBoundingRect.left, top = boundingRect.top - rootBoundingRect.top;
  let percentageX, percentageY;
  if (boundingRect.left + boundingRect.width < rootBoundingRect.left) {
    percentageX = 0;
  } else if (boundingRect.left > rootBoundingRect.left + rootBoundingRect.width) {
    percentageX = 0;
  } else if (boundingRect.left >= rootBoundingRect.left && boundingRect.left + boundingRect.width <= rootBoundingRect.left + rootBoundingRect.width) {
    percentageX = 100;
  } else if (boundingRect.left < rootBoundingRect.left && boundingRect.left + boundingRect.width > rootBoundingRect.left + rootBoundingRect.width) {
    percentageX = 100 / boundingRect.width * rootBoundingRect.width;
  } else if (boundingRect.left < rootBoundingRect.left && boundingRect.left + boundingRect.width <= rootBoundingRect.left + rootBoundingRect.width) {
    percentageX = 100 / boundingRect.width * (boundingRect.left + boundingRect.width - rootBoundingRect.left);
  } else if (boundingRect.left < rootBoundingRect.left + rootBoundingRect.width && boundingRect.left + boundingRect.width > rootBoundingRect.left + rootBoundingRect.width) {
    percentageX = 100 / boundingRect.width * (boundingRect.width - (boundingRect.left + boundingRect.width - (rootBoundingRect.left + rootBoundingRect.width)));
  }
  if (boundingRect.left + boundingRect.height < rootBoundingRect.top) {
    percentageY = 0;
  } else if (boundingRect.top > rootBoundingRect.top + rootBoundingRect.height) {
    percentageY = 0;
  } else if (boundingRect.top >= rootBoundingRect.top && boundingRect.top + boundingRect.height <= rootBoundingRect.top + rootBoundingRect.height) {
    percentageY = 100;
  } else if (boundingRect.top < rootBoundingRect.top && boundingRect.top + boundingRect.height > rootBoundingRect.top + rootBoundingRect.height) {
    percentageY = 100 / boundingRect.height * rootBoundingRect.height;
  } else if (boundingRect.top < rootBoundingRect.top && boundingRect.top + boundingRect.height <= rootBoundingRect.top + rootBoundingRect.height) {
    percentageY = 100 / boundingRect.height * (boundingRect.top + boundingRect.height - rootBoundingRect.top);
  } else if (boundingRect.top < rootBoundingRect.top + rootBoundingRect.height && boundingRect.top + boundingRect.height > rootBoundingRect.top + rootBoundingRect.height) {
    percentageY = 100 / boundingRect.height * (boundingRect.height - (boundingRect.top + boundingRect.height - (rootBoundingRect.top + rootBoundingRect.height)));
  }
  const surfaceX = boundingRect.width / 100 * percentageX, surfaceY = boundingRect.height / 100 * percentageY;
  const percentage = percentageX > 0 && percentageY > 0 ? 100 / 200 * (percentageX + percentageY) : 0;
  return {
    percentage,
    percentageX: percentageY > 0 ? percentageX : 0,
    percentageY: percentageX > 0 ? percentageY : 0,
    centerOffsetX: (rootBoundingRect.width * 0.5 - left - boundingRect.width * 0.5) * -1,
    centerOffsetY: (rootBoundingRect.height * 0.5 - top - boundingRect.height * 0.5) * -1,
    width: percentageX > 0 && percentageY > 0 ? surfaceX : 0,
    height: percentageY > 0 && percentageX > 0 ? surfaceY : 0,
    left: boundingRect.left,
    relLeft: left,
    top: boundingRect.top,
    relTop: top
  };
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
function __injectStyle(style, settings) {
  var _a3;
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
      (_a3 = $firstLink.parentElement) === null || _a3 === void 0 ? void 0 : _a3.insertBefore($tag, $firstLink);
    } else {
      document.head.appendChild($tag);
    }
  }
  return $tag;
}
function __isInViewport(elm, settings = {}) {
  settings = Object.assign({}, settings);
  const scrollTop2 = document.documentElement.scrollTop || document.body.scrollTop, scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
  const containerHeight = window.innerHeight || document.documentElement.clientHeight, containerWidth = window.innerWidth || document.documentElement.clientWidth, rect = elm.getBoundingClientRect();
  const top = rect.top - scrollTop2, left = rect.left - scrollLeft, right = rect.right - scrollLeft, bottom = rect.bottom - scrollTop2;
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
function __isScrollable($elm, settings) {
  settings = Object.assign({ x: true, y: true }, settings !== null && settings !== void 0 ? settings : {});
  const style = window.getComputedStyle($elm);
  var overflowY = style.overflowY.trim();
  var overflowX = style.overflowX.trim();
  const dir = {
    vertical: (overflowY === "scroll" || overflowY === "auto") && $elm.scrollHeight > $elm.clientHeight,
    horizontal: (overflowX === "scroll" || overflowX === "auto") && $elm.scrollWidth > $elm.clientWidth
  };
  if (settings.x && dir.horizontal)
    return true;
  if (settings.y && dir.vertical)
    return true;
  return false;
}
var _a$3, _b$3;
let _isUserScrolling = false, _isUserScrollingTimeout;
try {
  (_a$3 = document === null || document === void 0 ? void 0 : document.addEventListener) === null || _a$3 === void 0 ? void 0 : _a$3.call(document, "wheel", (e) => {
    _isUserScrolling = true;
    clearTimeout(_isUserScrollingTimeout);
    _isUserScrollingTimeout = setTimeout(() => {
      _isUserScrolling = false;
    }, 200);
  });
  (_b$3 = document === null || document === void 0 ? void 0 : document.addEventListener) === null || _b$3 === void 0 ? void 0 : _b$3.call(document, "touchmove", (e) => {
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
function __closestScrollable($elm, selector) {
  const res = __traverseUp($elm, ($e) => __isScrollable($e));
  return res;
}
function __matches(el, selector) {
  if (el.nodeName == "#comment" || el.nodeName == "#text") {
    return false;
  }
  const p = Element.prototype;
  const f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  };
  return f.call(el, selector);
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
function __querySelectorLive(selector, cb = null, settings = {}, _isFirstLevel = true) {
  var _a3, _b2, _c2, _d2, _e;
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
    return __awaiter$g(this, void 0, void 0, function* () {
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
  if (settings.scopes && (settings.rootNode === document || !((_a3 = settings.rootNode) === null || _a3 === void 0 ? void 0 : _a3.hasAttribute("s-scope")))) {
    let isAfterCalledByScopeId = {};
    innerPromises.push(__querySelectorLive("[s-scope]", ($scope) => __awaiter$g(this, void 0, void 0, function* () {
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
    (_b2 = settings.afterFirst) === null || _b2 === void 0 ? void 0 : _b2.call(settings);
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
          var _a4, _b3;
          const attrName = attrStr.split("=")[0].replace(/^\[/, "").replace(/\]$/, "");
          if (!((_a4 = settings.attributes) === null || _a4 === void 0 ? void 0 : _a4.includes(attrName))) {
            (_b3 = settings.attributes) === null || _b3 === void 0 ? void 0 : _b3.push(attrName);
          }
        });
      }
    });
    if ((_c2 = settings.attributes) === null || _c2 === void 0 ? void 0 : _c2.length) {
      observeSettings = Object.assign(Object.assign({}, observeSettings), { attributes: (_d2 = settings.attributes) === null || _d2 === void 0 ? void 0 : _d2.length, attributeFilter: settings.attributes.length ? settings.attributes : null });
    }
    observer.observe(settings.rootNode, observeSettings);
    findAndProcess(settings.rootNode, selector);
    (_e = settings.afterFirst) === null || _e === void 0 ? void 0 : _e.call(settings);
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
function __querySelectorUp($elm, selector) {
  const originalElm = $elm;
  $elm = $elm.parentNode;
  while ($elm && $elm != originalElm.ownerDocument) {
    if (typeof selector === "function") {
      if (selector($elm))
        return $elm;
    } else if (typeof selector === "string" && __matches($elm, selector)) {
      return $elm;
    }
    $elm = $elm.parentNode;
  }
  return null;
}
function __preventScrollRestoration() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
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
    var _a3, _b2, _c2, _d2, _e, _f, _g, _h, _j, _k, _l;
    settings = Object.assign({ $elm: window, duration: 500, easing: __easeInOutQuad, offset: 0, offsetX: void 0, offsetY: void 0, align: "start", justify: "start", onFinish: null }, settings);
    if (settings.$elm === document.body)
      settings.$elm = window;
    if (settings.$elm === document)
      settings.$elm = window;
    const $scrollElm = settings.$elm === window ? document.body : settings.$elm;
    let elmHeight = settings.$elm === window ? window.innerHeight : settings.$elm.offsetHeight;
    let elmWidth = settings.$elm === window ? window.innerWidth : settings.$elm.offsetWidth;
    let elmTop = settings.$elm === window ? 0 : (_a3 = settings.$elm) === null || _a3 === void 0 ? void 0 : _a3.getBoundingClientRect().top;
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
    const offsetY = (_e = settings.offsetY) !== null && _e !== void 0 ? _e : settings.offset;
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
    const obj2 = {
      targetY,
      targetX,
      deltaY,
      deltaX,
      currentY,
      currentX,
      duration: settings.duration,
      easing: settings.easing,
      $elm: settings.$elm,
      onFinish() {
        settings.onFinish && settings.onFinish();
        resolve();
      },
      startTime: Date.now(),
      step: __scrollTo.step
    };
    requestAnimationFrame$2(obj2.step.bind(obj2));
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
  if (__isUserScrolling(this.$elm))
    return;
  if (t !== 1) {
    requestAnimationFrame$2(this.step.bind(this));
  } else {
    if (this.onFinish)
      this.onFinish();
  }
};
/*! @license Rematrix v0.7.2

	Copyright 2021 Julian Lloyd.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/
function format(source2) {
  if (source2 && source2.constructor === Array) {
    var values = source2.filter(function(value) {
      return typeof value === "number";
    }).filter(function(value) {
      return !isNaN(value);
    });
    if (source2.length === 6 && values.length === 6) {
      var matrix = identity();
      matrix[0] = values[0];
      matrix[1] = values[1];
      matrix[4] = values[2];
      matrix[5] = values[3];
      matrix[12] = values[4];
      matrix[13] = values[5];
      return matrix;
    } else if (source2.length === 16 && values.length === 16) {
      return source2;
    }
  }
  throw new TypeError("Expected a `number[]` with length 6 or 16.");
}
function fromString(source2) {
  if (typeof source2 === "string") {
    var match2 = source2.match(/matrix(3d)?\(([^)]+)\)/);
    if (match2) {
      var raw = match2[2].split(",").map(parseFloat);
      return format(raw);
    }
    if (source2 === "none" || source2 === "") {
      return identity();
    }
  }
  throw new TypeError("Expected a string containing `matrix()` or `matrix3d()");
}
function identity() {
  var matrix = [];
  for (var i = 0; i < 16; i++) {
    i % 5 == 0 ? matrix.push(1) : matrix.push(0);
  }
  return matrix;
}
function multiply(matrixA, matrixB) {
  var fma = format(matrixA);
  var fmb = format(matrixB);
  var product = [];
  for (var i = 0; i < 4; i++) {
    var row = [fma[i], fma[i + 4], fma[i + 8], fma[i + 12]];
    for (var j = 0; j < 4; j++) {
      var k2 = j * 4;
      var col = [fmb[k2], fmb[k2 + 1], fmb[k2 + 2], fmb[k2 + 3]];
      var result2 = row[0] * col[0] + row[1] * col[1] + row[2] * col[2] + row[3] * col[3];
      product[i + k2] = result2;
    }
  }
  return product;
}
function rotateX(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[5] = matrix[10] = Math.cos(theta);
  matrix[6] = matrix[9] = Math.sin(theta);
  matrix[9] *= -1;
  return matrix;
}
function rotateY(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[0] = matrix[10] = Math.cos(theta);
  matrix[2] = matrix[8] = Math.sin(theta);
  matrix[2] *= -1;
  return matrix;
}
function rotateZ(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[0] = matrix[5] = Math.cos(theta);
  matrix[1] = matrix[4] = Math.sin(theta);
  matrix[4] *= -1;
  return matrix;
}
function toString(source2) {
  return "matrix3d(" + format(source2).join(", ") + ")";
}
function translate3d(distanceX, distanceY, distanceZ) {
  var matrix = identity();
  if (distanceX !== void 0 && distanceY !== void 0 && distanceZ !== void 0) {
    matrix[12] = distanceX;
    matrix[13] = distanceY;
    matrix[14] = distanceZ;
  }
  return matrix;
}
class SSugarElement {
  constructor($elm) {
    this.$elm = $elm;
  }
  get matrix() {
    var _a3;
    return (_a3 = this._tmpMatrix) !== null && _a3 !== void 0 ? _a3 : fromString(this.matrixStr);
  }
  get matrixStr() {
    return window.getComputedStyle(this.$elm).transform;
  }
  simulateTransform(transform) {
    var _a3, _b2, _c2, _d2, _e, _f;
    const translateMatrix = translate3d((_a3 = transform.translateX) !== null && _a3 !== void 0 ? _a3 : 0, (_b2 = transform.translateY) !== null && _b2 !== void 0 ? _b2 : 0, (_c2 = transform.translateZ) !== null && _c2 !== void 0 ? _c2 : 0), rotateXMatrix = rotateX((_d2 = transform.rotateX) !== null && _d2 !== void 0 ? _d2 : 0), rotateYMatrix = rotateY((_e = transform.rotateY) !== null && _e !== void 0 ? _e : 0), rotateZMatrix = rotateZ((_f = transform.rotateZ) !== null && _f !== void 0 ? _f : 0);
    let newMatrix = this.matrix;
    newMatrix = [newMatrix, translateMatrix, rotateXMatrix, rotateYMatrix, rotateZMatrix].reduce(multiply);
    const newTranslates = this.getTranslates(newMatrix), newRotates = this.getRotates(newMatrix);
    return {
      translateX: newTranslates.x,
      translateY: newTranslates.y,
      translateZ: newTranslates.z,
      rotateX: newRotates.x,
      rotateY: newRotates.y,
      rotateZ: newRotates.z,
      matrix: toString(newMatrix)
    };
  }
  applyMatrix(...matrix) {
    var _a3;
    let newMatrix = (_a3 = this._tmpMatrix) !== null && _a3 !== void 0 ? _a3 : this.matrix;
    matrix.forEach((m) => {
      newMatrix = multiply(newMatrix, m);
    });
    this._tmpMatrix = newMatrix;
    setTimeout(() => {
      this.$elm.style.transform = toString(newMatrix);
      this._tmpMatrix = null;
    });
    return this;
  }
  overrideMatrix(matrix) {
    this._tmpMatrix = matrix;
    setTimeout(() => {
      this.$elm.style.transform = toString(matrix);
      this._tmpMatrix = null;
    });
    return this;
  }
  getTranslates(fromMatrix = this.matrix) {
    return {
      x: isNaN(fromMatrix[12]) ? 0 : fromMatrix[12],
      y: isNaN(fromMatrix[13]) ? 0 : fromMatrix[13],
      z: isNaN(fromMatrix[14]) ? 0 : fromMatrix[14]
    };
  }
  getRotates(fromMatrix = this.matrix) {
    const matrix = fromMatrix.toString();
    var values = matrix.split(","), pi = Math.PI, sinB = parseFloat(values[8]), b = Math.round(Math.asin(sinB) * 180 / pi), cosB = Math.cos(b * pi / 180), matrixVal10 = parseFloat(values[9]), a2 = Math.round(Math.asin(-matrixVal10 / cosB) * 180 / pi), matrixVal1 = parseFloat(values[0]), c = Math.round(Math.acos(matrixVal1 / cosB) * 180 / pi);
    return {
      x: a2,
      y: b,
      z: c
    };
  }
  setTranslate(x, y, z) {
    const newMatrix = this.matrix;
    if (x !== void 0)
      newMatrix[12] = x;
    if (y !== void 0)
      newMatrix[13] = y;
    if (z !== void 0)
      newMatrix[14] = z;
    return this.overrideMatrix(newMatrix);
  }
  translate(x, y, z) {
    const translateMatrix = translate3d(x !== null && x !== void 0 ? x : 0, y !== null && y !== void 0 ? y : 0, z !== null && z !== void 0 ? z : 0);
    return this.applyMatrix(translateMatrix);
  }
  rotate(x, y, z) {
    const rotateXMatrix = rotateX(x !== null && x !== void 0 ? x : 0), rotateYMatrix = rotateY(y !== null && y !== void 0 ? y : 0), rotateZMatrix = rotateZ(z !== null && z !== void 0 ? z : 0);
    return this.applyMatrix(rotateXMatrix, rotateYMatrix, rotateZMatrix);
  }
  setRotate(x, y, z) {
    const rotateMatrix = [rotateX(x !== null && x !== void 0 ? x : 0), rotateX(y !== null && y !== void 0 ? y : 0), rotateX(z !== null && z !== void 0 ? z : 0)].reduce(multiply);
    const newMatrix = this.matrix;
    if (x !== void 0) {
      newMatrix[5] = rotateMatrix[5];
      newMatrix[6] = rotateMatrix[6];
      newMatrix[9] = rotateMatrix[9];
    }
    if (y !== void 0) {
      newMatrix[0] = rotateMatrix[0];
      newMatrix[2] = rotateMatrix[2];
    }
    if (z !== void 0) {
      newMatrix[0] = rotateMatrix[0];
      newMatrix[1] = rotateMatrix[1];
      newMatrix[4] = rotateMatrix[4];
    }
    return this.overrideMatrix(newMatrix);
  }
}
function __easeOutQuad(t) {
  return t * (2 - t);
}
function __easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
}
function __easeInterval(duration, cb, settings = {}) {
  let cleared = false, animationFrame;
  const pro = new SPromise(({ resolve, reject, emit, on }) => {
    settings = Object.assign({ interval: 1e3 / 25, easing: __easeInOutQuart, from: 0, to: 100, onEnd: void 0 }, settings);
    const startTime = Date.now();
    on("cancel", () => {
      cleared = true;
      cancelAnimationFrame(animationFrame);
    });
    function animate() {
      var _a3;
      if (cleared)
        return;
      const percent = 100 / duration * (Date.now() - startTime);
      const easedPercent = settings.easing(percent / 100) * 100;
      cb(easedPercent);
      if (percent < 100) {
        if (cleared)
          return;
        animationFrame = requestAnimationFrame(animate);
      } else {
        (_a3 = settings.onEnd) === null || _a3 === void 0 ? void 0 : _a3.call(settings);
        resolve(easedPercent);
      }
    }
    animate();
  });
  return pro;
}
function __compressVarName(name2) {
  return name2;
}
function __getStyleProperty(elm, property) {
  setTimeout(() => {
    elm._sComputedStyle = null;
  });
  const computed = elm._sComputedStyle || window.getComputedStyle(elm);
  elm._sComputedStyle = computed;
  const prefixes = ["", "webkit-", "moz-", "ms-", "o-", "khtml-"];
  for (let i = 0; i < prefixes.length; i++) {
    const prefix = prefixes[i];
    const value = computed[__camelize(`${prefix}${property}`)];
    if (value && value.trim() !== "")
      return autoCast(value);
  }
  return null;
}
function expandTemplate($template) {
  var _a3;
  const $container = document.createElement("div");
  const html2 = [];
  Array.from($template.content.childNodes).forEach(($child) => {
    var _a4;
    if ($child.tagName === "SCRIPT") {
      document.head.appendChild($child);
    } else {
      html2.push((_a4 = $child.outerHTML) !== null && _a4 !== void 0 ? _a4 : $child.textContent);
    }
  });
  $container.innerHTML = html2.join("\n");
  (_a3 = $template.parentElement) === null || _a3 === void 0 ? void 0 : _a3.insertBefore($container, $template);
  $template.remove();
  return $container;
}
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
      data,
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
        ...data
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
const min$2 = Math.min;
const max$3 = Math.max;
function within(min$12, value, max$12) {
  return max$3(min$12, min$2(value, max$12));
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
      const placementsSortedByLeastOverflow = allOverflows.slice().sort((a2, b) => a2.overflows[0] - b.overflows[0]);
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
            const placement2 = (_overflowsData$map$so = overflowsData.map((d2) => [d2, d2.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a2, b) => a2[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0].placement;
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
          const maxRight = max$3(...clientRects.map((rect) => rect.right));
          const minLeft = min$2(...clientRects.map((rect) => rect.left));
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
  return css2.transform !== "none" || css2.perspective !== "none" || css2.contain === "paint" || ["transform", "perspective"].includes(css2.willChange) || isFirefox && css2.willChange === "filter" || isFirefox && (css2.filter ? css2.filter !== "none" : false);
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
const min$1 = Math.min;
const max$2 = Math.max;
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
  return node.assignedSlot || node.parentNode || (isShadowRoot(node) ? node.host : null) || getDocumentElement(node);
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
  const width = max$2(html2.scrollWidth, html2.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  const height = max$2(html2.scrollHeight, html2.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body || html2).direction === "rtl") {
    x += max$2(html2.clientWidth, body ? body.clientWidth : 0) - width;
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
  return isBody ? updatedList : updatedList.concat(getOverflowAncestors(target));
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
    accRect.top = max$2(rect.top, accRect.top);
    accRect.right = min$1(rect.right, accRect.right);
    accRect.bottom = min$1(rect.bottom, accRect.bottom);
    accRect.left = max$2(rect.left, accRect.left);
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
    $arrow.classList.add("s-floating__arrow");
    $elm.append($arrow);
    middlewares.push(arrow({
      element: $arrow,
      padding: finalSettings.arrowPadding
    }));
  }
  if (finalSettings.arrowSize) {
    $elm.style.setProperty(`--arrow-size`, `${finalSettings.arrowSize}px`);
  }
  const update = () => __awaiter$f(this, void 0, void 0, function* () {
    yield computePosition($depending, $elm, {
      placement: finalSettings.position,
      middleware: middlewares
    });
    computePosition($depending, $elm, {
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
  const cleanup = autoUpdate($depending, $elm, () => {
    update();
  });
  __whenRemoved($elm).then(() => {
    cleanup();
  });
  __whenRemoved($depending).then(() => {
    cleanup();
  });
  $depending.addEventListener("pointerover", () => {
    update();
  });
  return {
    update,
    cleanup
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
    dir: window.HTMLDirectoryElement,
    div: window.HTMLDivElement,
    html: window.HTMLDocument,
    embed: window.HTMLEmbedElement,
    fieldset: window.HTMLFieldSetElement,
    font: window.HTMLFontElement,
    form: window.HTMLFormElement,
    frame: window.HTMLFrameElement,
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
function loopsCount(timeframe = 100) {
  let sysm = 0, start = new Date().getTime(), end = start;
  while (end - start === 0) {
    end = new Date().getTime();
  }
  start = end;
  while (end - start < timeframe) {
    sysm++;
    end = new Date().getTime();
  }
  return sysm;
}
function speedIndex(slow = 1e5, fast = 15e5) {
  const loopsCount$1 = loopsCount(100), index = 100 / (fast - slow) * loopsCount$1;
  return Math.round(index);
}
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
class colorSchemaNameInterface extends SInterface {
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
class SThemeBase extends SEventEmitter {
  constructor(theme, variant, settings) {
    super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
    this._overridedConfig = {};
    this.theme = theme !== null && theme !== void 0 ? theme : SSugarConfig.get("theme.theme");
    this.variant = variant !== null && variant !== void 0 ? variant : SSugarConfig.get("theme.variant");
    if (!SSugarConfig.get(`theme.themes.${this.theme}-${this.variant}`)) {
      throw new Error(`Sorry but the requested theme "<yellow>${this.theme}-${this.variant}</yellow>" does not exists...`);
    }
  }
  static sortMedia(media) {
    var _a3;
    if (!media.defaultAction) {
      return media;
    }
    const queries = __sort((_a3 = media.queries) !== null && _a3 !== void 0 ? _a3 : {}, (a2, b) => {
      if (media.defaultAction === "<=") {
        return a2.value.minWidth < b.value.minWidth ? 1 : -1;
      } else if (media.defaultAction === ">=") {
        return a2.value.minWidth > b.value.minWidth ? 1 : -1;
      }
      return 0;
    });
    media.queries = queries;
    return media;
  }
  get id() {
    return `${this.theme}-${this.variant}`;
  }
  static get theme() {
    return SSugarConfig.get("theme.theme");
  }
  static get variant() {
    return SSugarConfig.get("theme.variant");
  }
  static get themesNames() {
    return Object.keys(SSugarConfig.get("theme.themes"));
  }
  static isDark() {
    return this.variant === "dark";
  }
  static isMobileFirst() {
    return this.getSafe("media.defaultAction") === ">=";
  }
  static getThemeMetas() {
    var _a3;
    let defaultTheme = SSugarConfig.get("theme.theme"), defaultVariant = SSugarConfig.get("theme.variant");
    let theme = defaultTheme, variant = defaultVariant;
    const metas = (_a3 = SSugarConfig.get(`theme.themes.${theme}-${variant}.metas`)) !== null && _a3 !== void 0 ? _a3 : {};
    return __deepMerge({
      name: `${theme !== null && theme !== void 0 ? theme : defaultTheme}-${variant !== null && variant !== void 0 ? variant : defaultVariant}`,
      theme: theme !== null && theme !== void 0 ? theme : defaultTheme,
      variant: variant !== null && variant !== void 0 ? variant : defaultVariant
    }, metas);
  }
  static get themes() {
    var _a3, _b2;
    const themes = SSugarConfig.get("theme.themes");
    const returnedThemes = {};
    for (let [themeName, themeObj] of Object.entries(themes)) {
      const parts = themeName.split("-"), name2 = parts[0], variant = (_a3 = parts[1]) !== null && _a3 !== void 0 ? _a3 : "light";
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
    var _a3, _b2;
    const themesNames = Object.keys(SSugarConfig.get("theme.themes"));
    theme = theme !== null && theme !== void 0 ? theme : (_a3 = this._firstGetedThemeSettings) === null || _a3 === void 0 ? void 0 : _a3.theme;
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
  static hash(dotPath = "", settings) {
    const config2 = this.get(dotPath, settings);
    return objectHash(config2);
  }
  static resolveFontSize(size, settings) {
    const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return theme.resolveFontSize(size);
  }
  static resolvePadding(size, settings) {
    const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return theme.resolvePadding(size);
  }
  static resolveMargin(size, settings) {
    const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return theme.resolveMargin(size);
  }
  static resolveBorderRadius(size, settings) {
    const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return theme.resolveBorderRadius(size);
  }
  static resolveBorderWidth(size, settings) {
    const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return theme.resolveBorderWidth(size);
  }
  static resolveColor(color2, schema, modifier, settings) {
    const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return theme.resolveColor(color2, schema, modifier, settings);
  }
  static cssVar(dotPath, fallback = true, settings) {
    const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    dotPath = theme.proxyNonExistingUiDotpath(dotPath);
    let fb = theme.get(dotPath);
    if (!fallback || typeof fb === "string" && fb.includes(","))
      fb = 0;
    const v = `var(${__compressVarName(`--s-theme-${dotPath.replace(/\./gm, "-").replace(/:/gm, "-").replace(/\?/gm, "").replace(/--/gm, "-")}`)}, ${fb})`;
    return v;
  }
  static buildMediaQuery(queryString) {
    let currentQueryList = [];
    const mediaConfig = this.sortMedia(this.get("media")), sortedMedia = Object.keys(mediaConfig.queries);
    const queryAr = queryString.split(" ").map((l) => l.trim()).filter((l) => l !== "");
    queryAr.forEach((query, i) => {
      if (query === "and" || query === "or") {
        currentQueryList.push(query);
        return;
      }
      const firstChar = query.slice(0, 1);
      const firstTwoChar = query.slice(0, 2);
      const lastChar = query.slice(-1);
      let action = this.get("media.defaultAction");
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
      const mediaQueryConfig = this.get("media.queries")[mediaName];
      if (!mediaQueryConfig)
        throw new Error(`<red>[postcssSugarPlugin.media]</red> Sorry but the requested media "<yellow>${mediaName}</yellow>" does not exists in the config. Here's the available medias: ${Object.keys(this.get("media.queries")).map((l) => `<green>${l}</green>`).join(",")}`);
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
    if (currentQueryList.length) {
      currentQueryList.unshift("and");
    }
    currentQueryList.unshift(this.get("media.defaultQuery"));
    return `@media ${currentQueryList.join(" ")}`;
  }
  static resolveCssPropertyValue(property, value, settings) {
    var _a3, _b2, _c2, _d2, _e, _f, _g, _h, _j;
    const dashProp = __dashCase(property);
    switch (dashProp) {
      case "font-family":
        const fontObj = this.get(`font.family.${value}`);
        return (_a3 = fontObj === null || fontObj === void 0 ? void 0 : fontObj.fontFamily) !== null && _a3 !== void 0 ? _a3 : value;
      case "font-size":
        return (_b2 = this.resolveFontSize(value, settings)) !== null && _b2 !== void 0 ? _b2 : value;
      case "color":
      case "background-color":
        let color2 = value, schema;
        if (Array.isArray(value) && value.length === 2) {
          color2 = value[0];
          schema = value[1];
        }
        return (_c2 = this.resolveColor(color2, schema, null, Object.assign(Object.assign({}, settings !== null && settings !== void 0 ? settings : {}), { return: "value" }))) !== null && _c2 !== void 0 ? _c2 : value;
      case "border-radius":
      case "border-top-left-radius":
      case "border-top-right-radius":
      case "border-bottom-right-radius":
      case "border-bottom-left-radius":
        return (_d2 = this.resolveBorderRadius(value)) !== null && _d2 !== void 0 ? _d2 : value;
      case "border-width":
        return (_e = this.resolveBorderWidth(value)) !== null && _e !== void 0 ? _e : value;
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
  static resolveCssObjectPropertiesValues(object, settings) {
    const newObj = Object.assign({}, object);
    for (let [prop, value] of Object.entries(newObj)) {
      newObj[prop] = this.resolveCssPropertyValue(prop, value, settings);
    }
    return newObj;
  }
  static jsObjectToCssProperties(jsObject, settings) {
    const finalSettings = __deepMerge({
      exclude: [],
      only: []
    }, settings);
    const propsStack = [];
    Object.keys(jsObject).forEach((prop) => {
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
      let color2, schema;
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
            color2 = value;
            schema = "";
            if (Array.isArray(value)) {
              color2 = value[0];
              schema = value[1];
            }
            propsStack.push(`color: sugar.color(${color2}, ${schema});`);
            break;
          case "background-color":
            color2 = value;
            schema = "";
            if (Array.isArray(value)) {
              color2 = value[0];
              schema = value[1];
            }
            propsStack.push(`background-color: sugar.color(${color2}, ${schema});`);
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
  static jsConfigObjectToCssProperties(obj2) {
    let vars = [];
    for (let [key, value] of Object.entries(__flatten(obj2))) {
      if (__isColor(value)) {
        const color2 = key.match(/^color\.([a-zA-Z0-9]+)\./);
        if (!(color2 === null || color2 === void 0 ? void 0 : color2[1]))
          continue;
        const props = this.remapCssColor(color2[1], value);
        vars = [...vars, ...props.vars];
      }
      const varKey = key.replace(/\./gm, "-").replace(/:/gm, "-").replace(/\?/gm, "").replace(/--/gm, "-");
      let variable = __compressVarName(`--s-theme-${varKey}`);
      if (`${value}`.match(/:/)) {
        vars.push(`${variable}: "${value}";`);
      } else {
        vars.push(`${variable}: ${value};`);
      }
    }
    return vars;
  }
  static remapCssColor(from2, to, settings) {
    const result2 = {
      vars: [],
      properties: {}
    };
    if (__isColor(to)) {
      const color2 = new SColor(to);
      result2.vars = [
        `${__compressVarName(`--s-theme-color-${from2}-h`)}: ${color2.h};`,
        `${__compressVarName(`--s-theme-color-${from2}-s`)}: ${color2.s};`,
        `${__compressVarName(`--s-theme-color-${from2}-l`)}: ${color2.l};`,
        `${__compressVarName(`--s-theme-color-${from2}-a`)}: ${color2.a};`
      ];
      result2.properties[__compressVarName(`--s-theme-color-${from2}-h`)] = color2.h;
      result2.properties[__compressVarName(`--s-theme-color-${from2}-s`)] = color2.s;
      result2.properties[__compressVarName(`--s-theme-color-${from2}-l`)] = color2.l;
      result2.properties[__compressVarName(`--s-theme-color-${from2}-a`)] = color2.a;
    } else {
      const toColorName = to.split("-").slice(0, 1)[0], fromColorName = from2.split("-").slice(0, 1)[0];
      let toColorVariant = to.split("-").pop();
      from2.split("-").pop();
      if (toColorName === toColorVariant)
        toColorVariant = void 0;
      let fromVariable = `--s-theme-color-${fromColorName}`, toVariable = `--s-theme-color-${toColorName}`;
      this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant).loopOnColors((colorObj) => {
        if (colorObj.name === toColorName) {
          if (toColorVariant) {
            if (colorObj.schema === toColorVariant) {
              result2.vars.push(`${__compressVarName(`${fromVariable}-saturation-offset`)}: var(${__compressVarName(`${toVariable}-${colorObj.schema}-saturation-offset`)}, 0);`);
              result2.properties[`${__compressVarName(`${fromVariable}-saturation-offset`)}`] = `var(${__compressVarName(`${toVariable}-${colorObj.schema}-saturation-offset`)}, 0)`;
              result2.vars.push(`${__compressVarName(`${fromVariable}-lightness-offset`)}: var(${__compressVarName(`${toVariable}-${colorObj.schema}-lightness-offset`)}, 0);`);
              result2.properties[`${__compressVarName(`${fromVariable}-lightness-offset`)}`] = `var(${__compressVarName(`${toVariable}-${colorObj.schema}-lightness-offset`)}, 0)`;
              result2.vars.push(`${__compressVarName(`${fromVariable}-a`)}: var(${__compressVarName(`${toVariable}-a`)}, 1);`);
              result2.properties[`${__compressVarName(`${fromVariable}-a`)}`] = `var(${__compressVarName(`${toVariable}-a`)}, 1)`;
            }
          } else {
            if (!colorObj.schema && colorObj.value.color) {
              result2.vars.push(`${__compressVarName(`${fromVariable}-h`)}: var(${__compressVarName(`${toVariable}-h`)});`);
              result2.properties[`${__compressVarName(`${fromVariable}-h`)}`] = `var(${__compressVarName(`${toVariable}-h`)})`;
              result2.vars.push(`${__compressVarName(`${fromVariable}-s`)}: var(${__compressVarName(`${toVariable}-s`)});`);
              result2.properties[`${__compressVarName(`${fromVariable}-s`)}`] = `var(${__compressVarName(`${toVariable}-s`)})`;
              result2.vars.push(`${__compressVarName(`${fromVariable}-l`)}: var(${__compressVarName(`${toVariable}-l`)});`);
              result2.properties[`${__compressVarName(`${fromVariable}-l`)}`] = `var(${__compressVarName(`${toVariable}-l`)})`;
            } else {
              result2.vars.push(`${__compressVarName(`${fromVariable}-${colorObj.schema}-saturation-offset`)}: var(${__compressVarName(`${toVariable}-${colorObj.schema}-saturation-offset`)}, 0);`);
              result2.properties[`${__compressVarName(`${fromVariable}-${colorObj.schema}-saturation-offset`)}`] = `var(${__compressVarName(`${toVariable}-${colorObj.schema}-saturation-offset`)}, 0)`;
              result2.vars.push(`${__compressVarName(`${fromVariable}-${colorObj.schema}-lightness-offset`)}: var(${__compressVarName(`${toVariable}-${colorObj.schema}-lightness-offset`)}, 0);`);
              result2.properties[`${__compressVarName(`${fromVariable}-${colorObj.schema}-lightness-offset`)}`] = `var(${__compressVarName(`${toVariable}-${colorObj.schema}-lightness-offset`)}, 0)`;
              result2.vars.push(`${__compressVarName(`${fromVariable}-a: var(${toVariable}-a`)}, 1);`);
              result2.properties[`${__compressVarName(`${fromVariable}-a`)}`] = `var(${__compressVarName(`${toVariable}-a`)}, 1)`;
            }
          }
        }
      });
    }
    return result2;
  }
  static toCssVars(settings) {
    const themeInstance = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    if (!themeInstance)
      throw new Error(`Sorry but the requested theme "<yellow>${settings.theme}-${settings.variant}</yellow>" does not exists...`);
    let vars = [
      `--s-theme: ${themeInstance.theme};`,
      `--s-theme-variant: ${themeInstance.variant};`
    ];
    themeInstance.loopOnColors((colorObj) => {
      const baseVariable = colorObj.value.variable;
      if (!colorObj.schema && colorObj.value.color) {
        vars.push(`${__compressVarName(`${baseVariable}-h`)}: ${colorObj.value.h};`);
        vars.push(`${__compressVarName(`${baseVariable}-s`)}: ${colorObj.value.s};`);
        vars.push(`${__compressVarName(`${baseVariable}-l`)}: ${colorObj.value.l};`);
        vars.push(`${__compressVarName(`${baseVariable}-a`)}: ${colorObj.value.a};`);
        vars.push(`${__compressVarName(`${baseVariable}-origin-h`)}: ${colorObj.value.h};`);
        vars.push(`${__compressVarName(`${baseVariable}-origin-s`)}: ${colorObj.value.s};`);
        vars.push(`${__compressVarName(`${baseVariable}-origin-l`)}: ${colorObj.value.l};`);
        vars.push(`${__compressVarName(`${baseVariable}-origin-a`)}: ${colorObj.value.a};`);
      } else if (colorObj.schema) {
        if (colorObj.value.saturate) {
          vars.push(`${__compressVarName(`${baseVariable}-saturation-offset`)}: ${colorObj.value.saturate};`);
        } else if (colorObj.value.desaturate) {
          vars.push(`${__compressVarName(`${baseVariable}-saturation-offset`)}: ${colorObj.value.desaturate * -1};`);
        } else {
          vars.push(`${__compressVarName(`${baseVariable}-saturation-offset`)}: 0;`);
        }
        if (colorObj.value.lighten) {
          vars.push(`${__compressVarName(`${baseVariable}-lightness-offset`)}: ${colorObj.value.lighten};`);
        } else if (colorObj.value.darken) {
          vars.push(`${__compressVarName(`${baseVariable}-lightness-offset`)}: ${colorObj.value.darken * -1};`);
        } else {
          vars.push(`${__compressVarName(`${baseVariable}-lightness-offset`)}: 0;`);
        }
        if (colorObj.value.alpha >= 0 && colorObj.value.alpha <= 1) {
          vars.push(`${__compressVarName(`${baseVariable}-a`)}: ${colorObj.value.alpha};`);
        }
      }
    });
    const themeObjWithoutColors = Object.assign({}, themeInstance.get("."));
    delete themeObjWithoutColors.color;
    const flattenedTheme = __flatten(themeObjWithoutColors);
    Object.keys(flattenedTheme).forEach((key) => {
      const value = flattenedTheme[key];
      const varKey = key.replace(/\./gm, "-").replace(/:/gm, "-").replace(/\?/gm, "").replace(/--/gm, "-");
      let variable = `--s-theme-${varKey}`;
      if (`${value}`.match(/:/)) {
        vars.push(`${__compressVarName(`${variable}`)}: "${flattenedTheme[key]}";`);
      } else {
        vars.push(`${__compressVarName(`${variable}`)}: ${flattenedTheme[key]};`);
      }
    });
    return vars;
  }
  static getSafe(dotPath, settings) {
    const instance = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return instance.get(dotPath, {
      preventThrow: true
    });
  }
  static get(dotPath, settings) {
    const instance = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return instance.get(dotPath);
  }
  static set(dotPath, value, settings) {
    const instance = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
    return instance.set(dotPath, value);
  }
  get themes() {
    return SSugarConfig.get("theme.themes");
  }
  proxyNonExistingUiDotpath(dotPath) {
    let value = get(this._config, dotPath);
    if (value === void 0 && dotPath.match(/^ui\.[a-zA-Z0-9]+\./)) {
      dotPath = dotPath.replace(/^ui\.[a-zA-Z0-9]+\./, "ui.default.");
    }
    return dotPath;
  }
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
  getOverridedConfig() {
    return this._overridedConfig;
  }
  emitSavedEvent() {
    this.emit("saved", {
      theme: this.theme,
      variant: this.variant,
      overridedConfig: Object.assign({}, this._overridedConfig)
    });
    return this;
  }
  hash(dotPath = "") {
    const config2 = this.get(dotPath);
    return objectHash(config2);
  }
  themesConfig() {
    return SSugarConfig.get("theme");
  }
  set(dotPath, value) {
    __set(this._overridedConfig, dotPath, value);
    this.emit("update", {
      dotPath,
      value
    });
    return this;
  }
  restore(configs) {
    this._overridedConfig = __deepMerge(this._overridedConfig, configs !== null && configs !== void 0 ? configs : {});
    this.emit("restored", {
      overridedConfigs: Object.assign({}, this._overridedConfig)
    });
    return this;
  }
  clear() {
    this._overridedConfig = {};
    return this;
  }
  baseColors() {
    const map2 = {};
    for (let [colorName2, colorValue] of Object.entries(this.get("color"))) {
      const c = new SColor(colorValue);
      map2[colorName2] = {
        color: colorValue,
        variable: __compressVarName(`--s-theme-color-${colorName2}`),
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
  resolveColor(color2, schema, modifier, settings) {
    var _a3, _b2;
    if (color2.match(/^(hsla?|rgba?|hsv)\(/))
      return color2;
    if (color2.match(/^var\(--/))
      return color2;
    const finalSettings = Object.assign({ return: "value" }, settings !== null && settings !== void 0 ? settings : {});
    let colorName2 = color2;
    let colorSchemaName = schema !== null && schema !== void 0 ? schema : "";
    let colorModifier = modifier !== null && modifier !== void 0 ? modifier : "";
    if (colorSchemaName.match(/^--[a-z]+/)) {
      colorModifier = colorSchemaName;
      colorSchemaName = void 0;
    }
    let modifierParams = {};
    if (colorModifier) {
      modifierParams = colorSchemaNameInterface.apply(colorModifier);
    }
    let finalValue;
    if (__isColor(colorName2)) {
      const color3 = new SColor(colorName2);
      if (colorModifier) {
        color3.apply(colorModifier);
      }
      return color3.toString();
    } else {
      switch (finalSettings.return) {
        case "var":
          const colorVar = `--s-theme-color-${colorName2}`;
          let colorSchemaNameVar = `s-theme-color-${colorName2}`;
          if (colorSchemaName) {
            colorSchemaNameVar += `-${colorSchemaName}`;
          }
          colorSchemaNameVar = "--" + colorSchemaNameVar.replace(/-{2,999}/gm, "-");
          finalValue = colorVar;
          const hParts = [
            `var(${colorVar}-h, 0)`,
            `var(${colorSchemaNameVar}-spin ,${(_a3 = modifierParams.spin) !== null && _a3 !== void 0 ? _a3 : 0})`
          ];
          const sParts = [`var(${colorVar}-s, 0)`];
          if (colorSchemaName) {
            sParts.push(`var(${colorSchemaNameVar}-saturation-offset, 0)`);
          }
          let saturationOffset = modifierParams.saturate ? modifierParams.saturate : modifierParams.desaturate ? modifierParams.desaturate * -1 : void 0;
          if (saturationOffset !== void 0) {
            sParts.push(saturationOffset);
          }
          const lParts = [`var(${colorVar}-l, 0)`];
          if (colorSchemaName) {
            lParts.push(`var(${colorSchemaNameVar}-lightness-offset, 0)`);
          }
          let lightnessOffset = modifierParams.lighten ? modifierParams.lighten : modifierParams.darken ? modifierParams.darken * -1 : void 0;
          if (lightnessOffset !== void 0) {
            lParts.push(lightnessOffset);
          }
          modifierParams.alpha !== void 0 ? modifierParams.alpha : 1;
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
                    ${modifierParams.alpha !== void 0 ? modifierParams.alpha : `var(${colorSchemaNameVar}-a, 1)`}
                    )`;
          finalValue = finalValue.replace(/(\n|\s{2,99999999})/gm, "").replace(/\t/gm, " ").replace(/\s?\+\s?/gm, " + ").replace(/\)\-\s?/gm, ") - ").replace(/\s?\*\s?/gm, " * ").replace(/\s?\/\s?/gm, " / ");
          break;
        case "value":
        default:
          const colorValue = (_b2 = this.getSafe(`color.${color2}`)) !== null && _b2 !== void 0 ? _b2 : color2;
          if (!schema && !modifier) {
            finalValue = colorValue;
          }
          let colorInstance = new SColor(colorValue);
          if (schema) {
            let finalSchema = schema;
            if (typeof schema === "string") {
              finalSchema = this.getSafe(`colorSchema.${schema}.color.${color2}`);
              if (!finalSchema) {
                finalSchema = this.getSafe(`colorSchema.${schema}`);
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
  loopOnColors(callback) {
    return __awaiter$e(this, void 0, void 0, function* () {
      const colorsObj = this.get("color"), colorSchemasObj = this.get("colorSchema");
      for (let [colorName2, colorValue] of Object.entries(colorsObj)) {
        const c = new SColor(colorValue);
        callback({
          name: colorName2,
          schema: "",
          value: {
            color: colorValue,
            variable: __compressVarName(`--s-theme-color-${colorName2}`),
            r: c.r,
            g: c.g,
            b: c.b,
            h: c.h,
            s: c.s,
            l: c.l,
            a: c.a
          }
        });
        for (let [schemaName, schemaObj] of Object.entries(colorSchemasObj)) {
          const newColor = c.apply(schemaObj, true);
          callback({
            name: colorName2,
            schema: schemaName,
            value: Object.assign(Object.assign({ variable: __compressVarName(`--s-theme-color-${colorName2}-${schemaName}`) }, schemaObj), { r: newColor.r, g: newColor.g, b: newColor.b, h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a })
          });
          if (schemaObj.color) {
            for (let [
              colorSchemaColorName,
              colorSchemaObj
            ] of Object.entries(schemaObj.color)) {
              if (colorSchemaColorName !== colorName2)
                continue;
              const newColor2 = c.apply(colorSchemaObj, true);
              callback({
                name: colorSchemaColorName,
                schema: schemaName,
                value: Object.assign(Object.assign({ variable: __compressVarName(`--s-theme-color-${colorSchemaColorName}-${schemaName}`) }, colorSchemaObj), { r: newColor2.r, g: newColor2.g, b: newColor2.b, h: newColor2.h, s: newColor2.s, l: newColor2.l, a: newColor2.a })
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
class STheme extends SThemeBase {
  constructor(theme, variant, settings) {
    var _a3, _b2;
    super(theme, variant, settings);
    this.state = {
      lod: void 0,
      overridedConfigs: {}
    };
    this.settings.classmap = __deepMerge({
      enabled: this.get("classmap.enabled"),
      url: this.get("classmap.url")
    }, (_a3 = settings.classmap) !== null && _a3 !== void 0 ? _a3 : {});
    this.settings.lod = __deepMerge({
      level: this.get("lod.defaultLevel"),
      method: this.get("lod.method"),
      botLevel: this.get("lod.botLevel"),
      stylesheet: "link#global"
    }, (_b2 = settings === null || settings === void 0 ? void 0 : settings.lod) !== null && _b2 !== void 0 ? _b2 : {});
    this.restore();
    (() => __awaiter$d(this, void 0, void 0, function* () {
      if (this.settings.lod.enabled) {
        this._initLod();
      }
      if (settings.onReady) {
        settings.onReady();
      }
    }))();
  }
  static get theme() {
    var _a3;
    const themeAttr = (_a3 = document.querySelector("html")) === null || _a3 === void 0 ? void 0 : _a3.getAttribute("theme");
    if (!themeAttr) {
      return SSugarConfig.get("theme.theme");
    }
    return themeAttr.split("-")[0];
  }
  static get variant() {
    var _a3;
    const themeAttr = (_a3 = document.querySelector("html")) === null || _a3 === void 0 ? void 0 : _a3.getAttribute("theme");
    if (!themeAttr) {
      return SSugarConfig.get("theme.variant");
    }
    return themeAttr.split("-")[1];
  }
  static get lod() {
    const currentTheme = this.getCurrentTheme();
    return currentTheme.lod;
  }
  static setLod(level, settings) {
    const currentTheme = this.getCurrentTheme();
    currentTheme.setLod(level, settings);
    return currentTheme;
  }
  static whenLodChange(cb) {
    const currentTheme = this.getCurrentTheme();
    return currentTheme.whenLodChange(cb);
  }
  static setTheme(theme, variant, $context = document.querySelector("html")) {
    let themeStr;
    if (theme && variant) {
      themeStr = `${theme}-${variant}`;
    } else if (theme) {
      themeStr = `${theme}-light`;
    } else if (variant) {
      themeStr = `default-${variant}`;
    }
    STheme.applyTheme(theme, variant, $context);
    localStorage.setItem("s-theme", themeStr);
    const currentTheme = this.getCurrentTheme($context);
    document.dispatchEvent(new CustomEvent("s-theme.change", {
      detail: {
        theme: currentTheme
      }
    }));
    return currentTheme;
  }
  static applyTheme(theme, variant, $context = document.querySelector("html")) {
    __fastdom.mutate(() => {
      __clearTransmations(document.querySelector("html"), {
        timeout: 100
      });
      if (theme && variant) {
        $context.setAttribute("theme", `${theme}-${variant}`);
      } else if (theme) {
        $context.setAttribute("theme", `${theme}-${SSugarConfig.get("theme.variant")}`);
      } else if (variant) {
        $context.setAttribute("theme", `${SSugarConfig.get("theme.theme")}-${variant}`);
      }
    });
  }
  static isDark($context = document.querySelector("html")) {
    const metas = STheme.getThemeMetas($context);
    return metas.variant === "dark";
  }
  static preferDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  static setThemeVariant(variant, $context = document.querySelector("html")) {
    return this.setTheme(void 0, variant, $context);
  }
  static init(settings) {
    return __awaiter$d(this, void 0, void 0, function* () {
      const finalSettings = Object.assign({ $context: document.querySelector("html"), theme: void 0, variant: void 0, lod: {
        enabled: false
      } }, settings !== null && settings !== void 0 ? settings : {});
      let themeInstance;
      STheme._defaultThemeMetas = {
        theme: finalSettings.theme,
        variant: finalSettings.variant
      };
      themeInstance = this.getCurrentTheme(finalSettings.$context, Object.assign(Object.assign({}, finalSettings), { onReady() {
        console.log("READING");
      } }));
      if (!document.env)
        document.env = {};
      if (!document.env.SUGAR)
        document.env.SUGAR = {};
      document.env.SUGAR.theme = themeInstance;
      STheme.applyTheme(themeInstance.theme, themeInstance.variant, finalSettings.$context);
      return themeInstance;
    });
  }
  static ensureIsInited(throwError = true) {
    var _a3, _b2;
    if (!((_b2 = (_a3 = document.env) === null || _a3 === void 0 ? void 0 : _a3.SUGAR) === null || _b2 === void 0 ? void 0 : _b2.theme)) {
      if (throwError) {
        throw new Error(`<red>[STheme]</red> You must init your theme using the __STheme.init() static method...`);
      }
      return false;
    }
    return true;
  }
  static getThemeMetas($context = document.querySelector("html")) {
    var _a3, _b2, _c2;
    let defaultTheme = (_a3 = STheme._defaultThemeMetas.theme) !== null && _a3 !== void 0 ? _a3 : SSugarConfig.get("theme.theme"), defaultVariant = (_b2 = STheme._defaultThemeMetas.variant) !== null && _b2 !== void 0 ? _b2 : SSugarConfig.get("theme.variant");
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
    const metas = (_c2 = SSugarConfig.get(`theme.themes.${name2}.metas`)) !== null && _c2 !== void 0 ? _c2 : {};
    return __deepMerge({
      name: name2,
      theme: theme !== null && theme !== void 0 ? theme : defaultTheme,
      variant: variant !== null && variant !== void 0 ? variant : defaultVariant
    }, metas);
  }
  static getCurrentTheme($context = document.querySelector("html"), settings) {
    const themeMetas = STheme.getThemeMetas($context);
    return this.getTheme(themeMetas.theme, themeMetas.variant, settings);
  }
  static applyCurrentColor(color2, $context = document.querySelector("html")) {
    const vars = this.remapCssColor("current", color2);
    for (let [key, value] of Object.entries(vars.properties)) {
      $context.style.setProperty(key, value);
    }
  }
  get lod() {
    return this.state.lod || this.get("lod.defaultLevel");
  }
  get lodConfig() {
    if (!this._lodConfig) {
      this._lodConfig = this.get("lod");
    }
    return this._lodConfig;
  }
  _initLod() {
    setTimeout(() => {
      var _a3;
      const isCrawler = __isCrawler();
      if (isCrawler && this.lodConfig.botLevel !== void 0) {
        this.setLod(this.lodConfig.botLevel);
      }
      if (this.state.lod !== void 0) {
        this.setLod(this.state.lod);
        return;
      }
      if (this.settings.lod.level !== void 0) {
        this.setLod(this.settings.lod.level);
      }
      if (!isCrawler && this.state.lod === void 0 && this.settings.lod.level === void 0) {
        const speedIndex$1 = speedIndex();
        let suitedLod = 0;
        for (let [lod, lodObj] of Object.entries((_a3 = this.lodConfig.levels) !== null && _a3 !== void 0 ? _a3 : {})) {
          if (lodObj.speedIndex > speedIndex$1) {
            break;
          }
          suitedLod = parseInt(lod);
        }
        this.setLod(suitedLod);
        return;
      }
    });
  }
  setColor(color2, value) {
    this.set(`color.${color2}.color`, value);
  }
  setLod(level, settings) {
    const finalSettings = Object.assign({ $context: document.body }, settings !== null && settings !== void 0 ? settings : {});
    level = parseInt(`${level}`);
    this.state.lod = level;
    this.save();
    const lodStylesheets = Array.from(document.querySelectorAll("link[s-lod]"));
    let $stylesheet;
    if (this.settings.lod.stylesheet instanceof HTMLLinkElement) {
      $stylesheet = this.settings.lod.stylesheet;
    } else if (typeof this.settings.lod.stylesheet === "string") {
      $stylesheet = document.querySelector(this.settings.lod.stylesheet);
    }
    for (let i = 0; i <= 10; i++) {
      if (i > level) {
        finalSettings.$context.classList.remove(`s-lod--${i}`);
      }
    }
    lodStylesheets.forEach(($link) => {
      const l = parseInt($link.getAttribute("s-lod"));
      if (l > level) {
        $link.remove();
      }
    });
    for (let i = 0; i <= level; i++) {
      finalSettings.$context.classList.add("s-lod", `s-lod--${i}`);
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
    document.dispatchEvent(new CustomEvent("s-theme.lod.change", {
      detail: {
        level,
        theme: this
      }
    }));
    return this;
  }
  set(dotPath, value) {
    super.set(dotPath, value);
    this.applyState();
    this.save();
    return this;
  }
  whenLod(level) {
    return new Promise((resolve) => {
      if (document.body.classList.contains(`s-lod--${level}`)) {
        return resolve();
      }
    });
  }
  whenLodChange(cb) {
    document.addEventListener("s-theme.lod.change", cb);
    return () => {
      document.removeEventListener("s-theme.lod.change", cb);
    };
  }
  getColor(name2, variant, $context = document.querySelector("html")) {
    const $elm = document.createElement("p");
    $elm.classList.add(`s-bg--${name2}${variant ? `-${variant}` : ""}`);
    const $wrapper = document.createElement("div");
    $wrapper.setAttribute("hidden", "true");
    $wrapper.setAttribute("theme", this.theme);
    $wrapper.setAttribute("variant", this.variant);
    $wrapper.appendChild($elm);
    $context.appendChild($wrapper);
    const style = getComputedStyle($elm);
    const color2 = new SColor(style.backgroundColor);
    $wrapper.remove();
    return color2;
  }
  applyState($context = document.querySelector("html")) {
    const properties2 = SThemeBase.jsConfigObjectToCssProperties(this.getOverridedConfig());
    this._applyOverridedConfigs(properties2, $context);
    if (this.state.lod !== void 0) {
      this.setLod(this.state.lod);
    }
    return this;
  }
  _applyOverridedConfigs(properties2, $context = document.querySelector("html")) {
    if (!$context._sThemeOverridedConfigs) {
      $context._sThemeOverridedConfigs = {};
    }
    if (!$context._sThemeOverridedConfigs[this.id]) {
      $context._sThemeOverridedConfigs[this.id] = document.createElement("style");
      $context._sThemeOverridedConfigs[this.id].setAttribute("id", this.id);
      $context.appendChild($context._sThemeOverridedConfigs[this.id]);
    }
    $context._sThemeOverridedConfigs[this.id].innerHTML = `
            [theme="${this.theme}-${this.variant}"] {
                ${properties2.join("\n")}
            }
        `;
  }
  save() {
    clearTimeout(this._saveTimeout);
    this._saveTimeout = setTimeout(() => {
      localStorage.setItem(`s-theme-${this.theme}`, JSON.stringify(this.state));
      this.emitSavedEvent();
    }, 500);
    return this;
  }
  restore() {
    var _a3;
    let savedState = {};
    try {
      savedState = JSON.parse(
        (_a3 = localStorage.getItem(`s-theme-${this.theme}`)) !== null && _a3 !== void 0 ? _a3 : "{}"
      );
      this.state = savedState !== null && savedState !== void 0 ? savedState : {};
    } catch (e) {
      savedState = {};
    }
    super.restore(savedState.overridedConfigs);
    this.applyState();
    return this;
  }
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
function __debounce(fn2, delay) {
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
var forEach = Array.prototype.forEach, create = Object.create;
var process$1 = function(src2, obj2) {
  var key;
  for (key in src2)
    obj2[key] = src2[key];
};
var normalizeOptions = function(opts1) {
  var result2 = create(null);
  forEach.call(arguments, function(options) {
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
var toInteger = toInteger$1, max$1 = Math.max;
var toPosInteger = function(value) {
  return max$1(0, toInteger(value));
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
  var assign2 = Object.assign, obj2;
  if (typeof assign2 !== "function")
    return false;
  obj2 = { foo: "raz" };
  assign2(obj2, { bar: "dwa" }, { trzy: "trzy" });
  return obj2.foo + obj2.bar + obj2.trzy === "razdwatrzy";
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
var keys;
var hasRequiredKeys;
function requireKeys() {
  if (hasRequiredKeys)
    return keys;
  hasRequiredKeys = 1;
  keys = requireIsImplemented$3()() ? Object.keys : requireShim$3();
  return keys;
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
var assign$2 = isImplemented$5() ? Object.assign : requireShim$2();
var isValue$2 = isValue$5;
var map = { function: true, object: true };
var isObject$2 = function(value) {
  return isValue$2(value) && map[typeof value] || false;
};
(function(module) {
  var assign2 = assign$2, isObject3 = isObject$2, isValue2 = isValue$5, captureStackTrace = Error.captureStackTrace;
  module.exports = function(message) {
    var err = new Error(message), code3 = arguments[1], ext2 = arguments[2];
    if (!isValue2(ext2)) {
      if (isObject3(code3)) {
        ext2 = code3;
        code3 = null;
      }
    }
    if (isValue2(ext2))
      assign2(err, ext2);
    if (isValue2(code3))
      err.code = code3;
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
var possibleTypes = { "object": true, "function": true, "undefined": true };
var is$3 = function(value) {
  if (!isValue$1(value))
    return false;
  return hasOwnProperty.call(possibleTypes, typeof value);
};
var isObject$1 = is$3;
var is$2 = function(value) {
  if (!isObject$1(value))
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
var isValue = is$4, isPlainFunction = is, assign$1 = assign$2, normalizeOpts = normalizeOptions, contains = contains$1;
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
  return !options ? desc : assign$1(normalizeOpts(options), desc);
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
  return !options ? desc : assign$1(normalizeOpts(options), desc);
};
var eventEmitter = { exports: {} };
(function(module, exports) {
  var d2 = d$2.exports, callable = validCallable, apply = Function.prototype.apply, call = Function.prototype.call, create2 = Object.create, defineProperty3 = Object.defineProperty, defineProperties2 = Object.defineProperties, hasOwnProperty2 = Object.prototype.hasOwnProperty, descriptor2 = { configurable: true, enumerable: false, writable: true }, on, once, off, emit, methods, descriptors, base;
  on = function(type, listener) {
    var data;
    callable(listener);
    if (!hasOwnProperty2.call(this, "__ee__")) {
      data = descriptor2.value = create2(null);
      defineProperty3(this, "__ee__", descriptor2);
      descriptor2.value = null;
    } else {
      data = this.__ee__;
    }
    if (!data[type])
      data[type] = listener;
    else if (typeof data[type] === "object")
      data[type].push(listener);
    else
      data[type] = [data[type], listener];
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
    var data, listeners, candidate, i;
    callable(listener);
    if (!hasOwnProperty2.call(this, "__ee__"))
      return this;
    data = this.__ee__;
    if (!data[type])
      return this;
    listeners = data[type];
    if (typeof listeners === "object") {
      for (i = 0; candidate = listeners[i]; ++i) {
        if (candidate === listener || candidate.__eeOnceListener__ === listener) {
          if (listeners.length === 2)
            data[type] = listeners[i ? 0 : 1];
          else
            listeners.splice(i, 1);
        }
      }
    } else {
      if (listeners === listener || listeners.__eeOnceListener__ === listener) {
        delete data[type];
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
  var d2 = d$2.exports;
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
  var d2 = d$2.exports, NativeSymbol = requireGlobalThis().Symbol;
  standardSymbols = function(SymbolPolyfill) {
    return Object.defineProperties(SymbolPolyfill, {
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
  var d2 = d$2.exports, validateSymbol2 = requireValidateSymbol();
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
  var d2 = d$2.exports, validateSymbol2 = requireValidateSymbol(), NativeSymbol = requireGlobalThis().Symbol, generateName2 = requireGenerateName(), setupStandardSymbols = requireStandardSymbols(), setupSymbolRegistry = requireSymbolRegistry();
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
var isArguments;
var hasRequiredIsArguments;
function requireIsArguments() {
  if (hasRequiredIsArguments)
    return isArguments;
  hasRequiredIsArguments = 1;
  var objToString = Object.prototype.toString, id = objToString.call(function() {
    return arguments;
  }());
  isArguments = function(value) {
    return objToString.call(value) === id;
  };
  return isArguments;
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
var isString$1;
var hasRequiredIsString;
function requireIsString() {
  if (hasRequiredIsString)
    return isString$1;
  hasRequiredIsString = 1;
  var objToString = Object.prototype.toString, id = objToString.call("");
  isString$1 = function(value) {
    return typeof value === "string" || value && typeof value === "object" && (value instanceof String || objToString.call(value) === id) || false;
  };
  return isString$1;
}
var shim;
var hasRequiredShim;
function requireShim() {
  if (hasRequiredShim)
    return shim;
  hasRequiredShim = 1;
  var iteratorSymbol = requireEs6Symbol().iterator, isArguments5 = requireIsArguments(), isFunction2 = requireIsFunction(), toPosInt = toPosInteger, callable = validCallable, validValue$1 = validValue, isValue2 = isValue$5, isString3 = requireIsString(), isArray2 = Array.isArray, call = Function.prototype.call, desc = { configurable: true, enumerable: true, writable: true, value: null }, defineProperty3 = Object.defineProperty;
  shim = function(arrayLike) {
    var mapFn = arguments[1], thisArg = arguments[2], Context, i, j, arr, length, code3, iterator, result2, getIterator, value;
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
            code3 = value.charCodeAt(0);
            if (code3 >= 55296 && code3 <= 56319)
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
var ee = eventEmitter.exports.methods;
ee.on;
ee.emit;
class SComponentUtilsDefaultPropsInterface extends SInterface {
  static get _definition() {
    return {
      id: {
        description: "Specify an id for your component",
        type: "String",
        physical: true
      },
      mountWhen: {
        description: "Specify when your component will be mounted",
        type: "String",
        values: triggers,
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
class SComponentUtils extends SClass {
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
    const styleStr = this.settings.style;
    this.injectStyle(styleStr !== null && styleStr !== void 0 ? styleStr : "");
  }
  get props() {
    var _a3, _b2;
    return (_b2 = (_a3 = this._props) !== null && _a3 !== void 0 ? _a3 : this.node.props) !== null && _b2 !== void 0 ? _b2 : SComponentUtilsDefaultPropsInterface.defaults();
  }
  get name() {
    var _a3;
    return (_a3 = this.settings.name) !== null && _a3 !== void 0 ? _a3 : this.node.tagName.toLowerCase();
  }
  static setDefaultProps(selector, props) {
    selector = Array.isArray(selector) ? selector : [selector];
    selector.forEach((sel) => {
      var _a3;
      this._defaultProps[sel] = Object.assign(Object.assign({}, (_a3 = this._defaultProps[sel]) !== null && _a3 !== void 0 ? _a3 : {}), props);
    });
  }
  static getDefaultProps(selector) {
    var _a3, _b2;
    return Object.assign(Object.assign({}, (_a3 = this._defaultProps["*"]) !== null && _a3 !== void 0 ? _a3 : {}), (_b2 = this._defaultProps[selector]) !== null && _b2 !== void 0 ? _b2 : {});
  }
  get componentUtilsSettings() {
    return this.settings.componentUtils;
  }
  setProps(props) {
    this._props = props;
  }
  initProps(props, settings) {
    let finalProps = {}, PropsInterface = this.PropsInterface(settings.interface);
    for (let [prop, definition2] of Object.entries(PropsInterface.definition)) {
      const camelProp = __camelCase(prop), dashProp = __dashCase(prop);
      if (this.node.getAttribute(dashProp) !== null) {
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
        finalProps[camelProp] = definition2.default;
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
  handleProps(props, settings) {
    const finalSettings = Object.assign({ reflectAttributes: true, responsive: true }, settings !== null && settings !== void 0 ? settings : {});
    props = this.initProps(Object.assign(Object.assign({}, SComponentUtils.getDefaultProps(this.name.toLowerCase())), props), finalSettings);
    if (finalSettings.responsive) {
      this.makePropsResponsive(props);
    }
    this._props = props;
    return props;
  }
  handleState(state, settings) {
    var _a3;
    const finalStateSettings = Object.assign(Object.assign({ id: this.node.id }, (_a3 = this.settings.state) !== null && _a3 !== void 0 ? _a3 : {}), settings !== null && settings !== void 0 ? settings : {});
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
      _state = new SState(Object.assign({}, state), {
        id: finalStateSettings.id,
        save: finalStateSettings.save,
        exclude: ["status"]
      });
    }
    return _state;
  }
  makePropsResponsive(props) {
    var _a3;
    props.responsive = __deepMerge({}, (_a3 = props.responsive) !== null && _a3 !== void 0 ? _a3 : {});
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
          var _a4, _b2, _c2;
          let value;
          if (((_a4 = attrs[key]) === null || _a4 === void 0 ? void 0 : _a4.nodeValue) !== void 0) {
            if (attrs[key].nodeValue === "")
              value = true;
            else
              value = attrs[key].nodeValue;
          }
          if (!value)
            return;
          const propName = (_c2 = (_b2 = attrs[key]) === null || _b2 === void 0 ? void 0 : _b2.name) !== null && _c2 !== void 0 ? _c2 : key;
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
    window.addEventListener("resize", __debounce(() => {
      this._applyResponsiveProps(props);
    }, 100));
    this._applyResponsiveProps(props);
  }
  _applyResponsiveProps(props = {}) {
    var _a3;
    let matchedMedia = [];
    const responsiveObj = Object.assign({}, props.responsive);
    for (let [media, responsiveProps] of Object.entries(props.responsive)) {
      let applyProps = function() {
        for (let [key, value] of Object.entries(responsiveProps)) {
          props.toResetResponsiveProps[key] = props[key];
          props[key] = value;
        }
      };
      const queries = STheme.get(`media.queries`);
      media.replace(/(<|>|=|\|)/gm, "");
      if (media === "toResetResponsiveProps") {
        continue;
      }
      if (media.match(/[a-zA-Z0-9<>=]/) && queries[media]) {
        let mediaQuery = this._mediaQueries[media];
        if (!mediaQuery) {
          this._mediaQueries[media] = STheme.buildMediaQuery(media);
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
      for (let [key, value] of Object.entries((_a3 = props.toResetResponsiveProps) !== null && _a3 !== void 0 ? _a3 : {})) {
        props[key] = value;
        delete props.toResetResponsiveProps[key];
      }
    }
    props.responsive = responsiveObj;
  }
  waitAndExecute(when, callback) {
    return new Promise((resolve, reject) => __awaiter$c(this, void 0, void 0, function* () {
      if (!Array.isArray(when)) {
        when = [when];
      }
      if (this.props.lod !== void 0) {
        yield __when(this.node, `lod:${this.props.lod}`);
      }
      STheme.ensureIsInited();
      yield __when(this.node, when);
      callback === null || callback === void 0 ? void 0 : callback(this.node);
      resolve(this.node);
    }));
  }
  dispatchEvent(eventName, settings) {
    var _a3;
    const finalSettings = Object.assign({ $elm: this.node, bubbles: true, cancelable: true, detail: {} }, settings !== null && settings !== void 0 ? settings : {});
    const componentName = this.name;
    if ((_a3 = this.props) === null || _a3 === void 0 ? void 0 : _a3.prefixEvent) {
      finalSettings.$elm.dispatchEvent(new CustomEvent(`${componentName}.${eventName}`, finalSettings));
    } else {
      finalSettings.$elm.dispatchEvent(new CustomEvent(eventName, Object.assign(Object.assign({}, finalSettings), { detail: Object.assign(Object.assign({}, finalSettings.detail), { eventComponent: componentName }) })));
    }
    finalSettings.$elm.dispatchEvent(new CustomEvent(componentName, Object.assign(Object.assign({}, finalSettings), { detail: Object.assign(Object.assign({}, finalSettings.detail), { eventType: eventName }) })));
  }
  adoptStyleInShadowRoot($shadowRoot, $context) {
    return __adoptStyleInShadowRoot($shadowRoot, $context);
  }
  defaultProps(interf) {
    var _a3, _b2, _c2, _d2;
    if (this._defaultProps)
      return Object.assign({}, this._defaultProps);
    this._defaultProps = Object.assign({}, __deepMerge(
      SComponentUtilsDefaultPropsInterface.defaults(),
      (_a3 = this.settings.defaultProps) !== null && _a3 !== void 0 ? _a3 : {},
      (_b2 = this.constructor._defaultProps["*"]) !== null && _b2 !== void 0 ? _b2 : {},
      (_c2 = this.constructor._defaultProps[this.name]) !== null && _c2 !== void 0 ? _c2 : {},
      (_d2 = interf === null || interf === void 0 ? void 0 : interf.defaults()) !== null && _d2 !== void 0 ? _d2 : {}
    ));
    return this._defaultProps;
  }
  PropsInterface(interf) {
    var _a3, _b2;
    if (this._PropsInterface)
      return this._PropsInterface;
    class PropsInterface extends SInterface {
    }
    PropsInterface.definition = __deepMerge((_a3 = SComponentUtilsDefaultPropsInterface.definition) !== null && _a3 !== void 0 ? _a3 : {}, (_b2 = interf === null || interf === void 0 ? void 0 : interf.definition) !== null && _b2 !== void 0 ? _b2 : {});
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
  exposeApi(apiObj, ctx = this.node) {
    setTimeout(() => {
      let $on = this.node;
      Object.keys(apiObj).forEach((apiFnName) => {
        const apiFn = apiObj[apiFnName].bind(ctx);
        $on[apiFnName] = apiFn;
      });
    });
  }
  cls(cls = "", style = "") {
    let clsString = cls.split(" ").map((clsName) => {
      var _a3, _b2;
      let clses = [];
      if (this.settings.useTagNameForClassName) {
        clses.push(`${this.node.tagName.toLowerCase()}${clsName && !clsName.match(/^(__|-)/) ? "-" : ""}${clsName}`);
      }
      if (this.settings.name && this.node.tagName.toLowerCase() !== this.settings.name) {
        clses.push(`${this.settings.name.toLowerCase()}${clsName && !clsName.match(/^(__|-)/) ? "-" : ""}${clsName}`);
      }
      clses = clses.map((c) => c.replace("---", "--"));
      if ((_b2 = (_a3 = document.env) === null || _a3 === void 0 ? void 0 : _a3.SUGAR) === null || _b2 === void 0 ? void 0 : _b2.classmap) {
        clses = clses.map((cls2) => {
          var _a4;
          return (_a4 = document.env.SUGAR.classmap[cls2]) !== null && _a4 !== void 0 ? _a4 : cls2;
        });
      }
      return clses.join(" ");
    }).join(" ");
    if (style) {
      clsString += ` ${style}`;
    }
    return clsString;
  }
  uCls(cls = "", style = "") {
    let clsString = cls.split(" ").map((clsName) => {
      const clses = [];
      if (this.settings.name && this.node.tagName.toLowerCase() !== this.settings.name) {
        clses.push(`${this.settings.name.toLowerCase()}${clsName && !clsName.match(/^__/) ? "-" : ""}${clsName}`);
      } else {
        clses.push(`${this.node.tagName.toLowerCase()}${clsName && !clsName.match(/^__/) ? "-" : ""}${clsName}`);
      }
      return clses.join(" ");
    }).join("");
    return clsString;
  }
  isMounted() {
    var _a3;
    return (_a3 = this.node) === null || _a3 === void 0 ? void 0 : _a3.hasAttribute("mounted");
  }
  isInViewport() {
    return this._isInViewport;
  }
  isActive() {
    if (this.props.activeWhen.includes("lod") && this.props.lod !== void 0 && STheme.lod < this.props.lod) {
      return false;
    }
    if (this.props.activeWhen.includes("inViewport") && !this._isInViewport) {
      return false;
    }
    return true;
  }
}
SComponentUtils.fastdom = __fastdom;
SComponentUtils._defaultProps = {};
SComponentUtils._injectedStyles = [];
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
class SFeature extends SClass {
  constructor(name2, node, settings) {
    var _a3, _b2, _c2, _d2;
    super(__deepMerge({}, settings));
    if (this.settings.style) {
      __injectStyle(this.settings.style, {
        id: `s-feature-${name2}`
      });
    }
    this.utils = new SComponentUtils(node, Object.assign(Object.assign(Object.assign({}, (_a3 = this.settings) !== null && _a3 !== void 0 ? _a3 : {}), (_b2 = this.settings.componentUtils) !== null && _b2 !== void 0 ? _b2 : {}), { useTagNameForClassName: false, name: name2 }));
    this.name = name2;
    this.node = node;
    this.props = this.utils.handleProps({}, {
      interface: (_c2 = this.settings.interface) !== null && _c2 !== void 0 ? _c2 : (_d2 = this.settings.componentUtils) === null || _d2 === void 0 ? void 0 : _d2.interface
    });
    this.node.classList.add(...this.utils.cls("").split(" "));
    this.utils.waitAndExecute(
      this.props.mountWhen,
      () => __awaiter$b(this, void 0, void 0, function* () {
        var _e;
        yield (_e = this.mount) === null || _e === void 0 ? void 0 : _e.call(this);
        this.props.mounted = true;
      })
    );
  }
  static setDefaultProps(selector, props) {
    SComponentUtils.setDefaultProps(selector, props);
  }
  static define(name2, featureCls, defaultProps = {}) {
    this.setDefaultProps(name2, defaultProps);
    __querySelectorLive(`[${name2}]`, ($elm) => {
      new featureCls(name2, $elm, SComponentUtils.getDefaultProps(name2));
    }, {});
  }
}
class SActivateFeatureInterface extends SInterface {
  static get _definition() {
    return {
      href: {
        description: "Specify the target element(s) to activate/unactivate",
        type: "String",
        default: ""
      },
      group: {
        description: "Specify a group id for your element. This is used for things like tabs, etc...",
        type: "String"
      },
      toggle: {
        description: "Specify if you want to be able to click on the same element to activate/unactivate it.",
        type: {
          type: "Boolean",
          nullishAsTrue: true
        },
        default: false
      },
      history: {
        description: "Specify if you want to store and react to history hash changes",
        type: {
          type: "Boolean",
          nullishAsTrue: true
        },
        default: false
      },
      active: {
        description: "Specify the initial state of your element",
        type: {
          type: "Boolean",
          nullishAsTrue: true
        },
        default: false,
        physical: true
      },
      activeClass: {
        description: 'Specify the class applied on target(s) when active. Default is "active"',
        type: "String",
        default: "active"
      },
      activeAttribute: {
        description: "Specify the attribute name applied on target(s) when active.",
        type: "String",
        default: "active"
      },
      saveState: {
        description: "Specify if you want to save state in localStorage to restore it on page reload, etc...",
        type: "Boolean",
        default: false
      },
      activateTimeout: {
        description: "Specify a timeout before actiavting the target(s)",
        type: "Number",
        default: 0
      },
      unactivateTimeout: {
        description: "Specify a timeout before unactivate the target(s)",
        type: "Number",
        default: 0
      },
      triggerer: {
        description: "Specify an element selector that will be used as the triggerer instead of this current element",
        type: "String"
      },
      trigger: {
        description: 'Specify what trigger an activate/unactivate action. Can be "click", "mouseover", "mouseout" and/or "anchor"',
        type: {
          type: "Array<String>",
          splitChars: [","]
        },
        values: [
          "click",
          "mouseover",
          "mouseenter",
          "mouseout",
          "mouseleave",
          "anchor"
        ],
        default: ["click"]
      },
      unactivateOn: {
        description: "Specify some event(s) catched on the body tag that will unactivate the target(s)",
        type: "Array<String>"
      }
    };
  }
}
function define$c(props = {}, name2 = "s-activate") {
  SActivateFeature.define(name2, SActivateFeature, props);
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
class SActivateFeature extends SFeature {
  constructor(name2, node, settings) {
    super(name2, node, __deepMerge({
      interface: SActivateFeatureInterface
    }, settings !== null && settings !== void 0 ? settings : {}));
    this._$groupElements = [];
    this.state = {
      active: void 0
    };
    this.groupState = {
      activeId: void 0
    };
    this.state = this.utils.handleState(this.state, {
      save: this.props.saveState
    });
    if (this.props.group) {
      this.utils.handleState(this.groupState, {
        save: this.props.saveState,
        id: `s-activate-feature-group-${this.props.group}`
      });
    }
    if (this.props.triggerer) {
      this._$triggerers = Array.from(document.querySelectorAll(this.props.triggerer));
    } else {
      this._$triggerers = [this.node];
    }
    this.utils.exposeApi({
      activate: this.activate,
      unactivate: this.unactivate,
      isActive: this.isActive
    }, this);
  }
  mount() {
    if (this.props.href) {
      this._hrefSelector = this.props.href;
    }
    let targets;
    if (this._hrefSelector)
      targets = Array.from(document.querySelectorAll(this._hrefSelector));
    this._$targets = [this.node, ...targets !== null && targets !== void 0 ? targets : []];
    if (this.props.group) {
      __querySelectorLive(`[${this.name}][group="${this.props.group}"]`, ($elm) => {
        var _a3, _b2;
        if ((_a3 = this._$groupElements) === null || _a3 === void 0 ? void 0 : _a3.includes($elm))
          return;
        (_b2 = this._$groupElements) === null || _b2 === void 0 ? void 0 : _b2.push($elm);
      }, {});
    }
    this._$triggerers.forEach(($triggerer) => {
      const triggererTriggers = $triggerer.hasAttribute("trigger") ? $triggerer.getAttribute("trigger").split(",").map((l) => l.trim()) : [];
      const triggers2 = __unique([
        ...this.props.trigger,
        ...triggererTriggers
      ]);
      triggers2.forEach((trigger2) => {
        if (trigger2.match(/^event:/)) {
          this.node.addEventListener("actual", (e) => {
            this.activate({
              preventSave: true
            });
          });
        } else {
          switch (trigger2) {
            case "click":
              $triggerer.addEventListener("click", (e) => {
                if (e.target !== $triggerer) {
                  if (e.target.parentElement !== $triggerer)
                    return;
                  if (e.currentTarget !== $triggerer)
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                if (this.isActive() && this.props.toggle) {
                  this.unactivate();
                } else {
                  this.activate();
                }
              });
              break;
            case "mousenter":
            case "mouseover":
              $triggerer.addEventListener("mouseover", (e) => {
                this.activate();
              });
              break;
            case "mouseout":
            case "mouseleave":
              $triggerer.addEventListener("mouseleave", (e) => {
                this.unactivate();
              });
              break;
            case "anchor":
              if (document.location.hash === this._hrefSelector) {
                this.activate();
              }
              window.addEventListener("hashchange", (e) => {
                if (document.location.hash === this._hrefSelector) {
                  this.activate();
                }
              });
              break;
          }
        }
      });
    });
    if (this.props.unactivateOn) {
      this.props.unactivateOn.forEach((what) => {
        if (what.match(/^event:/)) {
          document.body.addEventListener(what.replace(/^event:/, ""), (e) => {
            this.unactivate();
          });
        } else {
          switch (what) {
            case "click":
              document.addEventListener("click", (e) => {
                this.unactivate();
              });
              break;
          }
        }
      });
    }
    if (this.props.saveState) {
      this._restoreState();
    } else if (this.props.active) {
      this.activate();
    } else if (this.props.group && this._$groupElements[0] === this.node) {
      this.activate();
    }
  }
  isActive() {
    return this.state.active;
  }
  _restoreState() {
    if (this.groupState.activeId && this.groupState.activeId === this.node.id) {
      return this.activate({
        force: true
      });
    }
    if (this.groupState.activeId && this.groupState.activeId !== this.node.id) {
      return;
    }
    if (this.state.active) {
      return this.activate({
        force: true
      });
    }
    if (this.state.active === void 0 && this.props.active) {
      return this.activate({
        force: true
      });
    }
    return this.unactivate({
      force: true
    });
  }
  activate(params) {
    return __awaiter$a(this, void 0, void 0, function* () {
      const finalParams = Object.assign({ force: false, preventSave: false }, params !== null && params !== void 0 ? params : {});
      clearTimeout(this._unactivateTimeout);
      if (!finalParams.force && this.isActive())
        return;
      setTimeout(() => {
        if (this.props.history && this._hrefSelector) {
          document.location.hash = this._hrefSelector;
        }
        if (this._$groupElements) {
          this.groupState.activeId = this.node.id;
          this._$groupElements.forEach(($element) => {
            if ($element === this.node) {
              return;
            }
            $element.unactivate();
          });
        }
        this.state.active = true;
        this.props.active = true;
        this._$targets.forEach(($target) => {
          if (this.props.activeClass) {
            $target.classList.add(this.props.activeClass);
          }
          if (this.props.activeAttribute) {
            this.utils.fastdom.mutate(() => {
              $target.setAttribute(this.props.activeAttribute, "true");
            });
          }
          if ($target.children.length) {
            Array.from($target.children).forEach(($child) => {
              if ($child instanceof HTMLTemplateElement) {
                expandTemplate($child);
              }
            });
          }
          this.node.dispatchEvent(new CustomEvent("s-activate.activate", {
            bubbles: true
          }));
        });
      }, this.props.activateTimeout);
    });
  }
  unactivate(params) {
    return __awaiter$a(this, void 0, void 0, function* () {
      const finalParams = Object.assign({ force: false, preventSave: false }, params !== null && params !== void 0 ? params : {});
      if (!finalParams.force && !this.isActive())
        return;
      this._unactivateTimeout = setTimeout(() => {
        this.state.active = false;
        this.props.active = false;
        this._$targets.forEach(($target) => {
          if (this.props.activeClass) {
            $target.classList.remove(this.props.activeClass);
          }
          if (this.props.activeAttribute) {
            $target.removeAttribute(this.props.activeAttribute);
          }
          this.node.dispatchEvent(new CustomEvent("s-activate.unactivate", {
            bubbles: true
          }));
        });
      }, this.props.unactivateTimeout);
    });
  }
}
class SAppearFeatureInterface extends SInterface {
  static get _definition() {
    return {
      in: {
        description: "Specify the animation you want to use to display your element",
        type: "String",
        default: "bottom",
        physical: true
      },
      out: {
        description: "Specify the animation you want to use to hide your item",
        type: "String",
        physical: true
      },
      delay: {
        description: "Specify a delay before animation in or out your element. Can be an array of two number that define the min delay and the max delay. The real delay will be random between these two numbers",
        type: {
          type: "Array<Number>",
          splitChars: [","]
        },
        default: [500]
      },
      duration: {
        description: "Specify the duration of the animation in ms. Can be an array of two number that define the min delay and the max duration. The real duration will be random between these two numbers",
        type: {
          type: "Array<Number>",
          splitChars: [","]
        },
        default: [500]
      },
      distance: {
        description: 'Specify the distance that your element will move if you have set an "in" direction. Can be an array of two number that define the min delay and the max distance. The real duration will be random between these two numbers',
        type: {
          type: "Array<Number>",
          splitChars: [","]
        },
        default: [100, 120]
      },
      appear: {
        description: "Specify if the element has to appear. This is usually setted automatically when needed",
        type: "Boolean",
        default: false,
        physical: true
      }
    };
  }
}
function define$b(props = {}, name2 = "s-appear") {
  SAppearFeature.define(name2, SAppearFeature, Object.assign({ mountWhen: "entersViewport" }, props));
}
const __css$8 = "/* [s-appear] {\n    opacity: 0;\n\n    &[appear] {\n        opacity: 1;\n    }\n} */\n";
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
class SAppearFeature extends SFeature {
  constructor(name2, node, settings) {
    super(name2, node, __deepMerge({
      name: "s-appear",
      interface: SAppearFeatureInterface,
      style: __css$8
    }, settings !== null && settings !== void 0 ? settings : {}));
    this.utils.fastdom.mutate(() => {
      if (!this.node.hasAttribute("s-appear")) {
        this.node.setAttribute("s-appear", true);
      }
    });
  }
  mount() {
    return __awaiter$9(this, void 0, void 0, function* () {
      switch (this.node.tagName.toLowerCase()) {
        case "img":
          yield __whenImageLoaded(this.node);
          this.appear();
          break;
        default:
          const $imgs = this.node.querySelectorAll("img");
          if ($imgs.length) {
            yield __whenImagesLoaded($imgs);
          }
          this.appear();
          break;
      }
    });
  }
  appear() {
    const appearId = __uniqid();
    let delay = this.props.delay[0];
    if (this.props.delay.length === 2) {
      const minDelay = this.props.delay[0], maxDelay = this.props.delay[1];
      delay = minDelay + (maxDelay - minDelay) * Math.random();
    }
    let duration = this.props.duration[0];
    if (this.props.duration.length === 2) {
      const minDuration = this.props.duration[0], maxDuration = this.props.duration[1];
      duration = minDuration + (maxDuration - minDuration) * Math.random();
    }
    let distance = this.props.distance[0];
    if (this.props.distance.length === 2) {
      const minDistance = this.props.distance[0], maxDistance = this.props.distance[1];
      distance = minDistance + (maxDistance - minDistance) * Math.random();
    }
    const sugarElement = new SSugarElement(this.node);
    setTimeout(() => {
      this.props.appear = true;
      let distanceX = 0, distanceY = 0;
      switch (this.props.in) {
        case "top":
          distanceY = distance * -1;
          break;
        case "bottom":
          distanceY = distance;
          break;
        case "left":
          distanceX = distance * -1;
          break;
        case "right":
          distanceX = distance;
          break;
      }
      const newTransforms = sugarElement.simulateTransform({
        translateX: distanceX,
        translateY: distanceY
      });
      const animationStr = `
                @keyframes s-appear-${appearId} {
                    from {
                        transform: ${newTransforms.matrix};
                        opacity: 0;
                    }
                    to {
                        transform: ${sugarElement.matrixStr};
                        opacity: 1;
                    }
                }
                [s-appear-id="${appearId}"] {
                    animation: s-appear-${appearId} ${duration / 1e3}s ${STheme.get("easing.default")} forwards;
                }
            `;
      const $style = __injectStyle(animationStr);
      this.node.setAttribute("s-appear-id", appearId);
      setTimeout(() => {
        this.node.removeAttribute("s-appear-id");
        $style.remove();
      }, duration);
    }, delay);
  }
}
var striptags = { exports: {} };
(function(module) {
  (function(global2) {
    if (typeof Symbol2 !== "function") {
      var Symbol2 = function(name2) {
        return name2;
      };
      Symbol2.nonNative = true;
    }
    const STATE_PLAINTEXT = Symbol2("plaintext");
    const STATE_HTML = Symbol2("html");
    const STATE_COMMENT = Symbol2("comment");
    const ALLOWED_TAGS_REGEX = /<(\w*)>/g;
    const NORMALIZE_TAG_REGEX = /<\/?([^\s\/>]+)/;
    function striptags2(html2, allowable_tags, tag_replacement) {
      html2 = html2 || "";
      allowable_tags = allowable_tags || [];
      tag_replacement = tag_replacement || "";
      let context = init_context(allowable_tags, tag_replacement);
      return striptags_internal(html2, context);
    }
    function init_striptags_stream(allowable_tags, tag_replacement) {
      allowable_tags = allowable_tags || [];
      tag_replacement = tag_replacement || "";
      let context = init_context(allowable_tags, tag_replacement);
      return function striptags_stream(html2) {
        return striptags_internal(html2 || "", context);
      };
    }
    striptags2.init_streaming_mode = init_striptags_stream;
    function init_context(allowable_tags, tag_replacement) {
      allowable_tags = parse_allowable_tags(allowable_tags);
      return {
        allowable_tags,
        tag_replacement,
        state: STATE_PLAINTEXT,
        tag_buffer: "",
        depth: 0,
        in_quote_char: ""
      };
    }
    function striptags_internal(html2, context) {
      if (typeof html2 != "string") {
        throw new TypeError("'html' parameter must be a string");
      }
      let allowable_tags = context.allowable_tags;
      let tag_replacement = context.tag_replacement;
      let state = context.state;
      let tag_buffer = context.tag_buffer;
      let depth = context.depth;
      let in_quote_char = context.in_quote_char;
      let output = "";
      for (let idx = 0, length = html2.length; idx < length; idx++) {
        let char = html2[idx];
        if (state === STATE_PLAINTEXT) {
          switch (char) {
            case "<":
              state = STATE_HTML;
              tag_buffer += char;
              break;
            default:
              output += char;
              break;
          }
        } else if (state === STATE_HTML) {
          switch (char) {
            case "<":
              if (in_quote_char) {
                break;
              }
              depth++;
              break;
            case ">":
              if (in_quote_char) {
                break;
              }
              if (depth) {
                depth--;
                break;
              }
              in_quote_char = "";
              state = STATE_PLAINTEXT;
              tag_buffer += ">";
              if (allowable_tags.has(normalize_tag(tag_buffer))) {
                output += tag_buffer;
              } else {
                output += tag_replacement;
              }
              tag_buffer = "";
              break;
            case '"':
            case "'":
              if (char === in_quote_char) {
                in_quote_char = "";
              } else {
                in_quote_char = in_quote_char || char;
              }
              tag_buffer += char;
              break;
            case "-":
              if (tag_buffer === "<!-") {
                state = STATE_COMMENT;
              }
              tag_buffer += char;
              break;
            case " ":
            case "\n":
              if (tag_buffer === "<") {
                state = STATE_PLAINTEXT;
                output += "< ";
                tag_buffer = "";
                break;
              }
              tag_buffer += char;
              break;
            default:
              tag_buffer += char;
              break;
          }
        } else if (state === STATE_COMMENT) {
          switch (char) {
            case ">":
              if (tag_buffer.slice(-2) == "--") {
                state = STATE_PLAINTEXT;
              }
              tag_buffer = "";
              break;
            default:
              tag_buffer += char;
              break;
          }
        }
      }
      context.state = state;
      context.tag_buffer = tag_buffer;
      context.depth = depth;
      context.in_quote_char = in_quote_char;
      return output;
    }
    function parse_allowable_tags(allowable_tags) {
      let tag_set = /* @__PURE__ */ new Set();
      if (typeof allowable_tags === "string") {
        let match2;
        while (match2 = ALLOWED_TAGS_REGEX.exec(allowable_tags)) {
          tag_set.add(match2[1]);
        }
      } else if (!Symbol2.nonNative && typeof allowable_tags[Symbol2.iterator] === "function") {
        tag_set = new Set(allowable_tags);
      } else if (typeof allowable_tags.forEach === "function") {
        allowable_tags.forEach(tag_set.add, tag_set);
      }
      return tag_set;
    }
    function normalize_tag(tag_buffer) {
      let match2 = NORMALIZE_TAG_REGEX.exec(tag_buffer);
      return match2 ? match2[1].toLowerCase() : null;
    }
    if (module.exports) {
      module.exports = striptags2;
    } else {
      global2.striptags = striptags2;
    }
  })(commonjsGlobal);
})(striptags);
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var isExtendable = function isExtendable3(val) {
  return typeof val !== "undefined" && val !== null && (typeof val === "object" || typeof val === "function");
};
var isObject = isExtendable;
var extendShallow = function extend2(o) {
  if (!isObject(o)) {
    o = {};
  }
  var len = arguments.length;
  for (var i = 1; i < len; i++) {
    var obj2 = arguments[i];
    if (isObject(obj2)) {
      assign(o, obj2);
    }
  }
  return o;
};
function assign(a2, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a2[key] = b[key];
    }
  }
}
function hasOwn(obj2, key) {
  return Object.prototype.hasOwnProperty.call(obj2, key);
}
var extend = extendShallow;
var regexCache = {};
var all;
var charSets = {
  default: {
    "&quot;": '"',
    "&#34;": '"',
    "&apos;": "'",
    "&#39;": "'",
    "&amp;": "&",
    "&#38;": "&",
    "&gt;": ">",
    "&#62;": ">",
    "&lt;": "<",
    "&#60;": "<"
  },
  extras: {
    "&cent;": "\xA2",
    "&#162;": "\xA2",
    "&copy;": "\xA9",
    "&#169;": "\xA9",
    "&euro;": "\u20AC",
    "&#8364;": "\u20AC",
    "&pound;": "\xA3",
    "&#163;": "\xA3",
    "&reg;": "\xAE",
    "&#174;": "\xAE",
    "&yen;": "\xA5",
    "&#165;": "\xA5"
  }
};
Object.defineProperty(charSets, "all", {
  get: function() {
    return all || (all = extend({}, charSets.default, charSets.extras));
  }
});
function unescape$1(str2, type) {
  if (!isString(str2))
    return "";
  var chars2 = charSets[type || "default"];
  var regex2 = toRegex(type, chars2);
  return str2.replace(regex2, function(m) {
    return chars2[m];
  });
}
function toRegex(type, chars2) {
  if (regexCache[type]) {
    return regexCache[type];
  }
  var keys3 = Object.keys(chars2).join("|");
  var regex2 = new RegExp("(?=(" + keys3 + "))\\1", "g");
  regexCache[type] = regex2;
  return regex2;
}
function isString(str2) {
  return str2 && typeof str2 === "string";
}
unescape$1.chars = charSets.default;
unescape$1.extras = charSets.extras;
Object.defineProperty(unescape$1, "all", {
  get: function() {
    return charSets.all;
  }
});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const supportsAdoptingStyleSheets = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
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
const trustedTypes$1 = window.trustedTypes;
const emptyStringForBooleanAttribute$1 = trustedTypes$1 ? trustedTypes$1.emptyScript : "";
const polyfillSupport$2 = window.reactiveElementPolyfillSupportDevMode;
{
  const issuedWarnings = (_a$2 = globalThis.litIssuedWarnings) !== null && _a$2 !== void 0 ? _a$2 : globalThis.litIssuedWarnings = /* @__PURE__ */ new Set();
  issueWarning$2 = (code3, warning) => {
    warning += ` See https://lit.dev/msg/${code3} for more information.`;
    if (!issuedWarnings.has(warning)) {
      console.warn(warning);
      issuedWarnings.add(warning);
    }
  };
  issueWarning$2("dev-mode", `Lit is in dev mode. Not recommended for production!`);
  if (((_b$2 = window.ShadyDOM) === null || _b$2 === void 0 ? void 0 : _b$2.inUse) && polyfillSupport$2 === void 0) {
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
  const shouldEmit = window.emitLitDebugLogEvents;
  if (!shouldEmit) {
    return;
  }
  window.dispatchEvent(new CustomEvent("lit-debug", {
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
  static addInitializer(initializer) {
    var _a3;
    (_a3 = this._initializers) !== null && _a3 !== void 0 ? _a3 : this._initializers = [];
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
  static createProperty(name2, options = defaultPropertyDeclaration) {
    var _a3;
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
            this.__reactivePropertyKeys = new Set((_a3 = this.__reactivePropertyKeys) !== null && _a3 !== void 0 ? _a3 : []);
          }
          this.__reactivePropertyKeys.add(name2);
        }
      }
    }
  }
  static getPropertyDescriptor(name2, key, options) {
    return {
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
  static getPropertyOptions(name2) {
    return this.elementProperties.get(name2) || defaultPropertyDeclaration;
  }
  static finalize() {
    if (this.hasOwnProperty(finalized)) {
      return false;
    }
    this[finalized] = true;
    const superCtor = Object.getPrototypeOf(this);
    superCtor.finalize();
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
  static __attributeNameForProperty(name2, options) {
    const attribute = options.attribute;
    return attribute === false ? void 0 : typeof attribute === "string" ? attribute : typeof name2 === "string" ? name2.toLowerCase() : void 0;
  }
  _initialize() {
    var _a3;
    this.__updatePromise = new Promise((res) => this.enableUpdating = res);
    this._$changedProperties = /* @__PURE__ */ new Map();
    this.__saveInstanceProperties();
    this.requestUpdate();
    (_a3 = this.constructor._initializers) === null || _a3 === void 0 ? void 0 : _a3.forEach((i) => i(this));
  }
  addController(controller) {
    var _a3, _b2;
    ((_a3 = this.__controllers) !== null && _a3 !== void 0 ? _a3 : this.__controllers = []).push(controller);
    if (this.renderRoot !== void 0 && this.isConnected) {
      (_b2 = controller.hostConnected) === null || _b2 === void 0 ? void 0 : _b2.call(controller);
    }
  }
  removeController(controller) {
    var _a3;
    (_a3 = this.__controllers) === null || _a3 === void 0 ? void 0 : _a3.splice(this.__controllers.indexOf(controller) >>> 0, 1);
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
    var _a3;
    const renderRoot = (_a3 = this.shadowRoot) !== null && _a3 !== void 0 ? _a3 : this.attachShadow(this.constructor.shadowRootOptions);
    adoptStyles(renderRoot, this.constructor.elementStyles);
    return renderRoot;
  }
  connectedCallback() {
    var _a3;
    if (this.renderRoot === void 0) {
      this.renderRoot = this.createRenderRoot();
    }
    this.enableUpdating(true);
    (_a3 = this.__controllers) === null || _a3 === void 0 ? void 0 : _a3.forEach((c) => {
      var _a4;
      return (_a4 = c.hostConnected) === null || _a4 === void 0 ? void 0 : _a4.call(c);
    });
  }
  enableUpdating(_requestedUpdate) {
  }
  disconnectedCallback() {
    var _a3;
    (_a3 = this.__controllers) === null || _a3 === void 0 ? void 0 : _a3.forEach((c) => {
      var _a4;
      return (_a4 = c.hostDisconnected) === null || _a4 === void 0 ? void 0 : _a4.call(c);
    });
  }
  attributeChangedCallback(name2, _old, value) {
    this._$attributeToProperty(name2, value);
  }
  __propertyToAttribute(name2, value, options = defaultPropertyDeclaration) {
    var _a3, _b2;
    const attr = this.constructor.__attributeNameForProperty(name2, options);
    if (attr !== void 0 && options.reflect === true) {
      const toAttribute = (_b2 = (_a3 = options.converter) === null || _a3 === void 0 ? void 0 : _a3.toAttribute) !== null && _b2 !== void 0 ? _b2 : defaultConverter.toAttribute;
      const attrValue = toAttribute(value, options.type);
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
  _$attributeToProperty(name2, value) {
    var _a3, _b2;
    const ctor = this.constructor;
    const propName = ctor.__attributeToPropertyMap.get(name2);
    if (propName !== void 0 && this.__reflectingProperty !== propName) {
      const options = ctor.getPropertyOptions(propName);
      const converter = options.converter;
      const fromAttribute = (_b2 = (_a3 = converter === null || converter === void 0 ? void 0 : converter.fromAttribute) !== null && _a3 !== void 0 ? _a3 : typeof converter === "function" ? converter : null) !== null && _b2 !== void 0 ? _b2 : defaultConverter.fromAttribute;
      this.__reflectingProperty = propName;
      this[propName] = fromAttribute(value, options.type);
      this.__reflectingProperty = null;
    }
  }
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
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a3, _b2;
    if (!this.isUpdatePending) {
      return;
    }
    debugLogEvent$1 === null || debugLogEvent$1 === void 0 ? void 0 : debugLogEvent$1({ kind: "update" });
    if (!this.hasUpdated) {
      {
        const shadowedProperties = [];
        (_a3 = this.constructor.__reactivePropertyKeys) === null || _a3 === void 0 ? void 0 : _a3.forEach((p) => {
          var _a4;
          if (this.hasOwnProperty(p) && !((_a4 = this.__instanceProperties) === null || _a4 === void 0 ? void 0 : _a4.has(p))) {
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
          var _a4;
          return (_a4 = c.hostUpdate) === null || _a4 === void 0 ? void 0 : _a4.call(c);
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
    var _a3;
    (_a3 = this.__controllers) === null || _a3 === void 0 ? void 0 : _a3.forEach((c) => {
      var _a4;
      return (_a4 = c.hostUpdated) === null || _a4 === void 0 ? void 0 : _a4.call(c);
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
      this.__reflectingProperties.forEach((v, k2) => this.__propertyToAttribute(k2, this[k2], v));
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
((_c$2 = globalThis.reactiveElementVersions) !== null && _c$2 !== void 0 ? _c$2 : globalThis.reactiveElementVersions = []).push("1.3.4");
if (globalThis.reactiveElementVersions.length > 1) {
  issueWarning$2("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a$1, _b$1, _c$1, _d;
const debugLogEvent = (event) => {
  const shouldEmit = window.emitLitDebugLogEvents;
  if (!shouldEmit) {
    return;
  }
  window.dispatchEvent(new CustomEvent("lit-debug", {
    detail: event
  }));
};
let debugLogRenderId = 0;
let issueWarning$1;
{
  (_a$1 = globalThis.litIssuedWarnings) !== null && _a$1 !== void 0 ? _a$1 : globalThis.litIssuedWarnings = /* @__PURE__ */ new Set();
  issueWarning$1 = (code3, warning) => {
    warning += code3 ? ` See https://lit.dev/msg/${code3} for more information.` : "";
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
const createSanitizer = (node, name2, type) => {
  return sanitizerFactoryInternal(node, name2, type);
};
const boundAttributeSuffix = "$lit$";
const marker = `lit$${String(Math.random()).slice(9)}$`;
const markerMatch = "?" + marker;
const nodeMarker = `<${markerMatch}>`;
const d = document;
const createMarker = (v = "") => d.createComment(v);
const isPrimitive = (value) => value === null || typeof value != "object" && typeof value != "function";
const isArray = Array.isArray;
const isIterable = (value) => isArray(value) || typeof (value === null || value === void 0 ? void 0 : value[Symbol.iterator]) === "function";
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
    ["_$litType$"]: type,
    strings,
    values
  };
};
const html = tag(HTML_RESULT);
const noChange = Symbol.for("lit-noChange");
const nothing = Symbol.for("lit-nothing");
const templateCache = /* @__PURE__ */ new WeakMap();
const render = (value, container, options) => {
  var _a3, _b2;
  if (container == null) {
    throw new TypeError(`The container to render into may not be ${container}`);
  }
  const renderId = debugLogRenderId++;
  const partOwnerNode = (_a3 = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _a3 !== void 0 ? _a3 : container;
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
const walker = d.createTreeWalker(d, 129, null, false);
let sanitizerFactoryInternal = noopSanitizer;
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
  if (!Array.isArray(strings) || !strings.hasOwnProperty("raw")) {
    let message = "invalid template strings array";
    {
      message = `
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.

          If you're using the html or svg tagged template functions normally
          and and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g, "\n");
    }
    throw new Error(message);
  }
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
        const data = node.data;
        if (data === markerMatch) {
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
  static createElement(html2, _options) {
    const el = d.createElement("template");
    el.innerHTML = html2;
    return el;
  }
}
function resolveDirective(part, value, parent = part, attributeIndex) {
  var _a3, _b2, _c2;
  var _d2;
  if (value === noChange) {
    return value;
  }
  let currentDirective = attributeIndex !== void 0 ? (_a3 = parent.__directives) === null || _a3 === void 0 ? void 0 : _a3[attributeIndex] : parent.__directive;
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
    var _a3;
    const { el: { content }, parts } = this._$template;
    const fragment = ((_a3 = options === null || options === void 0 ? void 0 : options.creationScope) !== null && _a3 !== void 0 ? _a3 : d).importNode(content, true);
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
    let i = 0;
    for (const part of this._parts) {
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
    var _a3;
    this.type = CHILD_PART;
    this._$committedValue = nothing;
    this._$disconnectableChildren = void 0;
    this._$startNode = startNode;
    this._$endNode = endNode;
    this._$parent = parent;
    this.options = options;
    this.__isConnected = (_a3 = options === null || options === void 0 ? void 0 : options.isConnected) !== null && _a3 !== void 0 ? _a3 : true;
    {
      this._textSanitizer = void 0;
    }
  }
  get _$isConnected() {
    var _a3, _b2;
    return (_b2 = (_a3 = this._$parent) === null || _a3 === void 0 ? void 0 : _a3._$isConnected) !== null && _b2 !== void 0 ? _b2 : this.__isConnected;
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
    var _a3;
    if (this._$committedValue !== value) {
      this._$clear();
      if (sanitizerFactoryInternal !== noopSanitizer) {
        const parentNodeName = (_a3 = this._$startNode.parentNode) === null || _a3 === void 0 ? void 0 : _a3.nodeName;
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
        const textNode = document.createTextNode("");
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
    var _a3;
    const { values, ["_$litType$"]: type } = result2;
    const template2 = typeof type === "number" ? this._$getTemplate(result2) : (type.el === void 0 && (type.el = Template.createElement(type.h, this.options)), type);
    if (((_a3 = this._$committedValue) === null || _a3 === void 0 ? void 0 : _a3._$template) === template2) {
      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
        kind: "template updating",
        template: template2,
        instance: this._$committedValue,
        parts: this._$committedValue._parts,
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
        parts: instance._parts,
        options: this.options,
        fragment,
        values
      });
      instance._update(values);
      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
        kind: "template instantiated and updated",
        template: template2,
        instance,
        parts: instance._parts,
        options: this.options,
        fragment,
        values
      });
      this._commitNode(fragment);
      this._$committedValue = instance;
    }
  }
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
  _$clear(start = wrap(this._$startNode).nextSibling, from2) {
    var _a3;
    (_a3 = this._$notifyConnectionChanged) === null || _a3 === void 0 ? void 0 : _a3.call(this, false, true, from2);
    while (start && start !== this._$endNode) {
      const n = wrap(start).nextSibling;
      wrap(start).remove();
      start = n;
    }
  }
  setConnected(isConnected) {
    var _a3;
    if (this._$parent === void 0) {
      this.__isConnected = isConnected;
      (_a3 = this._$notifyConnectionChanged) === null || _a3 === void 0 ? void 0 : _a3.call(this, isConnected);
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
  _$setValue(newListener, directiveParent = this) {
    var _a3;
    newListener = (_a3 = resolveDirective(this, newListener, directiveParent, 0)) !== null && _a3 !== void 0 ? _a3 : nothing;
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
    var _a3, _b2;
    if (typeof this._$committedValue === "function") {
      this._$committedValue.call((_b2 = (_a3 = this.options) === null || _a3 === void 0 ? void 0 : _a3.host) !== null && _b2 !== void 0 ? _b2 : this.element, event);
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
    debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
      kind: "commit to element binding",
      element: this.element,
      value,
      options: this.options
    });
    resolveDirective(this, value);
  }
}
const polyfillSupport$1 = window.litHtmlPolyfillSupportDevMode;
polyfillSupport$1 === null || polyfillSupport$1 === void 0 ? void 0 : polyfillSupport$1(Template, ChildPart);
((_d = globalThis.litHtmlVersions) !== null && _d !== void 0 ? _d : globalThis.litHtmlVersions = []).push("2.2.7");
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
  const issuedWarnings = (_a = globalThis.litIssuedWarnings) !== null && _a !== void 0 ? _a : globalThis.litIssuedWarnings = /* @__PURE__ */ new Set();
  issueWarning = (code3, warning) => {
    warning += ` See https://lit.dev/msg/${code3} for more information.`;
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
    var _a3;
    var _b2;
    const renderRoot = super.createRenderRoot();
    (_a3 = (_b2 = this.renderOptions).renderBefore) !== null && _a3 !== void 0 ? _a3 : _b2.renderBefore = renderRoot.firstChild;
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
    var _a3;
    super.connectedCallback();
    (_a3 = this.__childPart) === null || _a3 === void 0 ? void 0 : _a3.setConnected(true);
  }
  disconnectedCallback() {
    var _a3;
    super.disconnectedCallback();
    (_a3 = this.__childPart) === null || _a3 === void 0 ? void 0 : _a3.setConnected(false);
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
    const warnRemovedOrRenamed = (obj2, name2, renamed = false) => {
      if (obj2.hasOwnProperty(name2)) {
        const ctorName2 = (typeof obj2 === "function" ? obj2 : obj2.constructor).name;
        issueWarning(renamed ? "renamed-api" : "removed-api", `\`${name2}\` is implemented on class ${ctorName2}. It has been ${renamed ? "renamed" : "removed"} in this version of LitElement.`);
      }
    };
    warnRemovedOrRenamed(this, "render");
    warnRemovedOrRenamed(this, "getStyles", true);
    warnRemovedOrRenamed(this.prototype, "adoptStyles");
    return true;
  };
}
((_c = globalThis.litElementVersions) !== null && _c !== void 0 ? _c : globalThis.litElementVersions = []).push("3.2.2");
if (globalThis.litElementVersions.length > 1) {
  issueWarning("multiple-versions", `Multiple versions of Lit loaded. Loading multiple versions is not recommended.`);
}
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
class SLitComponent extends LitElement {
  constructor(settings = {}) {
    var _a3, _b2, _c2, _d2, _e, _f, _g, _h, _j, _k;
    super();
    this.settings = {};
    this.props = {};
    this._shouldUpdate = false;
    this._state = {};
    this.settings = __deepMerge({
      componentUtils: {},
      shadowDom: false,
      get rootNode() {
        var _a4;
        return (_a4 = this.shadowRoot) === null || _a4 === void 0 ? void 0 : _a4.querySelector("*:first-child");
      }
    }, settings);
    if (this.constructor.state) {
      this.state = Object.assign({}, this.constructor.state);
    } else {
      this.state = {};
    }
    if (!((_a3 = this.state) === null || _a3 === void 0 ? void 0 : _a3.status)) {
      this.state.status = "idle";
    }
    if (this.settings.shadowDom === false) {
      this.createRenderRoot = () => {
        return this;
      };
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
    this.firstUpdated = () => __awaiter$8(this, void 0, void 0, function* () {
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
    this.utils = new SComponentUtils(this, Object.assign(Object.assign(Object.assign({}, (_d2 = this.settings) !== null && _d2 !== void 0 ? _d2 : {}), (_e = this.settings.componentUtils) !== null && _e !== void 0 ? _e : {}), { style: (_k = (_h = (_g = (_f = this.constructor.styles) === null || _f === void 0 ? void 0 : _f.cssText) !== null && _g !== void 0 ? _g : this.settings.style) !== null && _h !== void 0 ? _h : (_j = this.settings.componentUtils) === null || _j === void 0 ? void 0 : _j.style) !== null && _k !== void 0 ? _k : "" }));
    (() => __awaiter$8(this, void 0, void 0, function* () {
      var _l, _m;
      const defaultProps = SComponentUtils.getDefaultProps(this.tagName.toLowerCase());
      const mountWhen = (_m = (_l = this.getAttribute("mount-when")) !== null && _l !== void 0 ? _l : defaultProps.mountWhen) !== null && _m !== void 0 ? _m : "direct";
      this.classList.add(...this.utils.cls("").split(" "));
      yield __wait();
      yield __wait();
      if (!mountWhen.match(/^direct(ly)?$/)) {
        yield this.utils.waitAndExecute(mountWhen, () => {
          this._mount();
        });
      } else {
        this._mount();
      }
    }))();
  }
  get state() {
    return this._state;
  }
  set state(state) {
    Object.assign(this._state, state);
  }
  static define(tagName, Cls, props = {}, settings = {}) {
    var _a3;
    const win = (_a3 = settings.window) !== null && _a3 !== void 0 ? _a3 : window;
    if (win.customElements.get(tagName.toLowerCase())) {
      return;
    }
    SLitComponent.setDefaultProps(tagName, props);
    win.customElements.define(tagName.toLowerCase(), class extends Cls {
    });
  }
  static setDefaultProps(selector, props) {
    SComponentUtils.setDefaultProps(selector, props);
  }
  static propertiesFromInterface(properties2, int) {
    var _a3;
    const propertiesObj = {};
    class SLitComponentPropsInterface extends SComponentUtilsDefaultPropsInterface {
    }
    SLitComponentPropsInterface.definition = Object.assign(Object.assign({}, SLitComponentPropsInterface.definition), (_a3 = int === null || int === void 0 ? void 0 : int.definition) !== null && _a3 !== void 0 ? _a3 : {});
    Object.keys(SLitComponentPropsInterface.definition).forEach((prop) => {
      var _a4, _b2, _c2, _d2, _e, _f, _g, _h, _j, _k, _l, _m, _o;
      const definition2 = SLitComponentPropsInterface.definition[prop];
      propertiesObj[prop] = Object.assign({}, (_a4 = definition2.lit) !== null && _a4 !== void 0 ? _a4 : {});
      let type = String, typeStr = (_c2 = (_b2 = definition2.type) === null || _b2 === void 0 ? void 0 : _b2.type) !== null && _c2 !== void 0 ? _c2 : definition2.type;
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
      propertiesObj[prop].default = definition2.default;
      if (definition2.physical || ((_f = (_e = (_d2 = definition2.type) === null || _d2 === void 0 ? void 0 : _d2.type) === null || _e === void 0 ? void 0 : _e.toLowerCase) === null || _f === void 0 ? void 0 : _f.call(_e)) === "boolean" || ((_h = (_g = definition2.type) === null || _g === void 0 ? void 0 : _g.toLowerCase) === null || _h === void 0 ? void 0 : _h.call(_g)) === "boolean" || ((_l = (_k = (_j = definition2.type) === null || _j === void 0 ? void 0 : _j.type) === null || _k === void 0 ? void 0 : _k.toLowerCase) === null || _l === void 0 ? void 0 : _l.call(_k)) === "object" || ((_o = (_m = definition2.type) === null || _m === void 0 ? void 0 : _m.toLowerCase) === null || _o === void 0 ? void 0 : _o.call(_m)) === "object") {
        propertiesObj[prop].reflect = true;
        propertiesObj[prop].attribute = __dashCase(prop);
        propertiesObj[prop].converter = {
          fromAttribute: (value, type2) => {
            var _a5, _b3, _c3, _d3;
            const typeStr2 = (_c3 = (_b3 = (_a5 = definition2.type) === null || _a5 === void 0 ? void 0 : _a5.type) === null || _b3 === void 0 ? void 0 : _b3.toLowerCase()) !== null && _c3 !== void 0 ? _c3 : (_d3 = definition2.type) === null || _d3 === void 0 ? void 0 : _d3.toLowerCase();
            if (typeStr2 === "object" && typeof value === "string") {
              try {
                const json = JSON.parse(value);
                return json;
              } catch (e) {
                console.error(e);
              }
            }
            if (value === "true" || value === "")
              return true;
            return value;
          },
          toAttribute(value) {
            if (typeof value !== "string" && typeof value !== "boolean") {
              try {
                const jsonStr = JSON.stringify(value);
                return jsonStr;
              } catch (e) {
              }
            }
            if (value === "false" || value === false || value === null) {
              return void 0;
            }
            return value;
          }
        };
      }
    });
    const props = Object.assign(Object.assign({}, propertiesObj), properties2 !== null && properties2 !== void 0 ? properties2 : {});
    return props;
  }
  disconnectedCallback() {
  }
  _mount() {
    var _a3, _b2, _c2;
    return __awaiter$8(this, void 0, void 0, function* () {
      const _this = this, defaultProps = SComponentUtils.getDefaultProps(this.tagName.toLowerCase());
      let properties2 = this.constructor.properties;
      if (!properties2) {
        properties2 = this.constructor.propertiesFromInterface();
      }
      let finalProps = {};
      for (let [prop, obj2] of Object.entries(properties2)) {
        Object.defineProperty(this.props, prop, {
          enumerable: true,
          get() {
            return _this[prop];
          },
          set(value) {
            var _a4;
            value = (_a4 = value === null || value === void 0 ? void 0 : value.value) !== null && _a4 !== void 0 ? _a4 : value;
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
        let attrValue = this.getAttribute(__dashCase(prop));
        if (attrValue !== null) {
          if (attrValue === "false")
            attrValue = false;
          if (attrValue === "")
            attrValue = true;
          finalProps[prop] = attrValue;
        }
        if (finalProps[prop] === void 0 && this[prop] === void 0) {
          finalProps[prop] = (_a3 = defaultProps[prop]) !== null && _a3 !== void 0 ? _a3 : obj2.default;
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
      yield __wait();
      if (this.props.adoptStyle && this.shadowRoot) {
        yield this.utils.adoptStyleInShadowRoot(this.shadowRoot);
      }
      return true;
    });
  }
}
SLitComponent._keepInjectedCssBeforeStylesheetLinksInited = false;
/*! clipboard-copy. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var clipboardCopy_1 = clipboardCopy;
function makeError() {
  return new DOMException("The request is not allowed", "NotAllowedError");
}
async function copyClipboardApi(text) {
  if (!navigator.clipboard) {
    throw makeError();
  }
  return navigator.clipboard.writeText(text);
}
async function copyExecCommand(text) {
  const span = document.createElement("span");
  span.textContent = text;
  span.style.whiteSpace = "pre";
  span.style.webkitUserSelect = "auto";
  span.style.userSelect = "all";
  document.body.appendChild(span);
  const selection = window.getSelection();
  const range2 = window.document.createRange();
  selection.removeAllRanges();
  range2.selectNode(span);
  selection.addRange(range2);
  let success = false;
  try {
    success = window.document.execCommand("copy");
  } finally {
    selection.removeAllRanges();
    window.document.body.removeChild(span);
  }
  if (!success)
    throw makeError();
}
async function clipboardCopy(text) {
  try {
    await copyClipboardApi(text);
  } catch (err) {
    try {
      await copyExecCommand(text);
    } catch (err2) {
      throw err2 || err || makeError();
    }
  }
}
function copy(text) {
  return clipboardCopy_1(text);
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
class SClipboardCopyComponentInterface extends SInterface {
  static get _definition() {
    return {
      from: {
        description: 'Specify the element you want to copy from with a simple css selector. Try to get "value" first, then "innerHTML"',
        type: "String"
      },
      successTimeout: {
        description: 'Specify the duration for displaying the "success" icon',
        type: "Number",
        default: 1500
      },
      errorTimeout: {
        description: 'Specify the duration for displaying the "error" icon',
        type: "Number",
        default: 3e3
      }
    };
  }
}
const __css$7 = ".s-clipboard-copy {\n    display: inline-block;\n    width: 1em;\n    height: 1em;\n    position: relative;\n    cursor: pointer;\n}\n\n    .s-clipboard-copy:not([mounted]) > * {\n        opacity: 0.001;\n        pointer-events: none;\n    }\n\n    .s-clipboard-copy .s-clipboard-copy__root[state='pending'] .icon-copy {\n            opacity: 1;\n        }\n\n    .s-clipboard-copy .s-clipboard-copy__root[state='copy'] .icon-copy {\n            opacity: 1;\n        }\n\n    .s-lod--1 .s-clipboard-copy .s-clipboard-copy__root[state='success'] {\n        color: hsla(calc(var(--s-theme-color-success-h, 0) + var(--s-theme-color-success-spin ,0)),calc((var(--s-theme-color-success-s, 0)) * 1%),calc((var(--s-theme-color-success-l, 0)) * 1%),var(--s-theme-color-success-a, 1));\n}\n\n    .s-clipboard-copy .s-clipboard-copy__root[state='success'] .icon-success {\n            opacity: 1;\n        }\n\n    .s-lod--1 .s-clipboard-copy .s-clipboard-copy__root[state='error'] {\n        color: hsla(calc(var(--s-theme-color-error-h, 0) + var(--s-theme-color-error-spin ,0)),calc((var(--s-theme-color-error-s, 0)) * 1%),calc((var(--s-theme-color-error-l, 0)) * 1%),var(--s-theme-color-error-a, 1));\n}\n\n    .s-clipboard-copy .s-clipboard-copy__root[state='error'] .icon-error {\n            opacity: 1;\n        }\n\n    .s-clipboard-copy svg {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -50%);\n        display: block;\n        width: 1em;\n        height: 1em;\n        opacity: 0;\n        pointer-events: none;\n    }\n\n    .s-lod--2 .s-clipboard-copy svg {\n        background-size: contain;\n}\n";
function define$a(props = {}, tagName = "s-clipboard-copy") {
  SClipboardCopyComponent.define(tagName, SClipboardCopyComponent, props);
}
class SClipboardCopyComponent extends SLitComponent {
  constructor() {
    super(__deepMerge({
      name: "s-clipboard-copy",
      interface: SClipboardCopyComponentInterface
    }));
    this.state = {
      state: "pending"
    };
  }
  static get properties() {
    return SLitComponent.propertiesFromInterface({}, SClipboardCopyComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(__css$7)}
        `;
  }
  _copyFromTarget() {
    var _a3;
    if (!this.props.from)
      return;
    let $elm = document.querySelector(this.props.from);
    if (!$elm) {
      $elm = document.querySelector(`#${this.props.from}`);
    }
    if (!$elm) {
      throw new Error(`[SClipboardCopy] The target element "${this.props.from}" does not exist`);
    }
    const text = (_a3 = $elm.value) !== null && _a3 !== void 0 ? _a3 : $elm.innerHTML;
    this.copy(text);
  }
  copy(text) {
    this.state.state = "copy";
    copy(text).then(() => {
      this.state.state = "success";
      setTimeout(() => {
        this.state.state = "pending";
      }, this.props.successTimeout);
    }).catch((e) => {
      this.state.state = "error";
      setTimeout(() => {
        this.state.state = "pending";
      }, this.props.errorTimeout);
    });
  }
  render() {
    return html`
            <div
                @click=${() => this._copyFromTarget()}
                class="${this.utils.cls("__root")}"
                state="${this.state.state}"
            >
                <svg
                    ref="svg"
                    class="icon-copy"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0)">
                        <path
                            d="M4.55512 0.00402832L2.07324 2.4859H4.55512V0.00402832Z"
                            fill="currentColor"
                        />
                        <path
                            d="M14.9937 0H5.72598V3.65762H2.06836V17.0624H14.9937V0H14.9937ZM12.5801 11.3218H4.48195V10.1499H12.5801V11.3218ZM12.5801 8.83219H4.48195V7.66031H12.5801V8.83219ZM12.5801 6.34254H4.48195V5.17066H12.5801V6.34254Z"
                            fill="currentColor"
                        />
                        <path
                            d="M16.1655 2.93762V18.2343H5.00586V20H17.9312V2.93762H16.1655Z"
                            fill="currentColor"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect width="20" height="20" fill="currentColor" />
                        </clipPath>
                    </defs>
                </svg>
                <svg
                    class="icon-success"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <svg
                    class="icon-error"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <polygon
                        points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
                    ></polygon>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            </div>
        `;
  }
}
class SFloatingFeatureInterface extends SInterface {
  static get _definition() {
    return {
      ref: {
        description: "Specify the reference HTMLElement from which to position the floating one. If not specified, will take the previous element in the DOM",
        type: "String"
      },
      position: {
        description: "Specify the placement of your floating element. By default it will try to be placed as good as possible.",
        type: "String",
        values: [
          "top",
          "right",
          "bottom",
          "left",
          "top-start",
          "top-end",
          "right-start",
          "right-end",
          "bottom-start",
          "bottom-end",
          "left-start",
          "left-end",
          "auto"
        ],
        default: "auto"
      },
      shift: {
        description: "Specify a space between the floating element and the viewport side to respect",
        type: "Number",
        default: 10
      },
      offset: {
        description: "Specify a space between the floating element and the reference one to respect",
        type: "Number"
      },
      arrow: {
        description: "Specify if you want an arrow or not",
        type: "Boolean",
        default: true
      },
      arrowSize: {
        description: "Specify the size of the arrow in px",
        type: "Number",
        default: 15
      },
      arrowPadding: {
        description: "Specify the padding of the arrow in px",
        type: "Number",
        default: 10
      }
    };
  }
}
function define$9(props = {}, name2 = "s-floating") {
  SFloatingFeature.define(name2, SFloatingFeature, Object.assign({}, props));
}
const __css$6 = ".s-floating {\n    transform: none;\n}\n\n.s-lod--2 .s-floating {\n    transition: none;\n}\n\n    .s-floating:before {\n        content: none;\n    }\n\n    .s-floating:after {\n        content: none;\n    }\n\n    .s-floating .s-floating__arrow {\n        position: absolute;\n        width: var(--arrow-size, 8px);\n        height: var(--arrow-size, 8px);\n        transform: rotate(45deg);\n    }\n\n    .s-lod--1 .s-floating .s-floating__arrow {\n        background: hsla(calc(var(--s-theme-color-current-h, 0) + var(--s-theme-color-current-spin ,0)),calc((var(--s-theme-color-current-s, 0)) * 1%),calc((var(--s-theme-color-current-l, 0)) * 1%),var(--s-theme-color-current-a, 1));\n}";
class SFloatingFeature extends SFeature {
  constructor(name2, node, settings) {
    super(name2, node, __deepMerge({
      name: "s-floating",
      interface: SFloatingFeatureInterface,
      style: __css$6
    }, settings !== null && settings !== void 0 ? settings : {}));
    if (!this.props.ref) {
      this._$ref = this.node.parentElement;
    } else {
      this._$ref = document.querySelector(this.props.ref);
    }
  }
  mount() {
    if (this.props.offset === void 0 && this.props.arrow) {
      this.props.offset = this.props.arrowSize;
    }
    __makeFloat(this.node, this._$ref, this.props);
  }
}
const __en = {
  min: {
    string: "Must have at least %n characters",
    object: "Must have at least %n properties",
    number: "Must be greater than %n",
    array: "Must have at least %n items"
  },
  max: {
    string: "Must have at max %n characters",
    object: "Must have at max %n properties",
    number: "Must be lower than %n",
    array: "Must have at max %n items"
  },
  email: {
    string: "Must be a valid email address"
  },
  required: {
    default: "This is required"
  },
  isoDate: {
    string: "Must be a valid ISO date"
  },
  isoTime: {
    string: "Must be a valid ISO time"
  },
  isoDateTime: {
    string: "Must be a valid ISO date time"
  },
  integer: {
    string: "Must be an integer"
  },
  number: {
    string: "Must be an number"
  },
  negative: {
    string: "Must be a negative number"
  },
  positive: {
    string: "Must be a positive number"
  },
  pattern: {
    string: "Must match the pattern %pattern"
  },
  alphanum: {
    string: "Must contain only alphanumeric characters"
  },
  creditCard: {
    string: "Must be a valid credit card number"
  },
  color: {
    string: "Must be a valid color (hex, rgb, rgba, hsl, hsla)"
  },
  hex: {
    string: "Must be a valid hex color"
  },
  password: {
    weak: "",
    medium: "Must be >=6 characters, at least 1 lowercase/uppercase/special character",
    strong: "Must be >=8 characters, at least 1 lowercase/uppercase/digit/special character"
  }
};
const definition$g = {
  description: "Validate an alphanum string",
  type: "String"
};
function alphanum(value, settings) {
  var _a3;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.alphanum,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "alphanum" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  valid = value.match(/^[a-z0-9]+$/i);
  if (!valid) {
    message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3.string;
  }
  return {
    valid,
    message
  };
}
const definition$f = {
  description: "Validate a color string",
  type: "String"
};
function color(value, settings) {
  var _a3;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.color,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "color" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  valid = __isColor(value);
  if (!valid) {
    message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3.string;
  }
  return {
    valid,
    message
  };
}
const definition$e = {
  description: "Validate a credit card string",
  type: "String"
};
function creditCard(value, settings) {
  var _a3;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.creditCard,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "creditCard" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  valid = __isCreditCard(value);
  if (!valid) {
    message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3.string;
  }
  return {
    valid,
    message
  };
}
const definition$d = {
  description: "Validate an email string",
  type: "String"
};
function email(value, settings) {
  var _a3;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.email,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "email" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  valid = __isEmail(value);
  if (!valid) {
    message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3.string;
  }
  return {
    valid,
    message
  };
}
const definition$c = {
  description: "Validate a hexadecimal string",
  type: "String"
};
function hex(value, settings) {
  var _a3;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.hex,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "hex" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  valid = value.match(/^#[a-zA-Z0-9]{3,6}$/);
  if (!valid) {
    message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3.string;
  }
  return {
    valid,
    message
  };
}
const definition$b = {
  description: "Validate an integer",
  type: "number"
};
function integer(value, settings) {
  var _a3;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.integer,
    cast: true,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error(`Sorry but the "integer" validation only works with string and number`);
  }
  if (typeof value === "string" && finalSettings.trim) {
    value = value.trim();
  }
  if (typeof value === "string" && finalSettings.cast) {
    value = Number(value);
  }
  if (isNaN(value)) {
    valid = false;
  } else {
    valid = Number.isInteger(value);
  }
  if (!valid) {
    message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3.string;
  }
  return {
    valid,
    message
  };
}
const definition$a = {
  description: "Validate an iso date string",
  type: "String"
};
function isoDate(value, settings) {
  var _a3;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.isoDate,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "isoDate" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  valid = __isIsoDate(value);
  if (!valid) {
    message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3.string;
  }
  return {
    valid,
    message
  };
}
const definition$9 = {
  description: "Validate an iso date string",
  type: "String"
};
function isoDateTime(value, settings) {
  var _a3;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.isoDateTime,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "isoDateTime" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  valid = __isIsoDateTime(value);
  if (!valid) {
    message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3.string;
  }
  return {
    valid,
    message
  };
}
const definition$8 = {
  description: "Validate an iso time string",
  type: "String"
};
function isoTime(value, settings) {
  var _a3;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.isoTime,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "isoTime" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  valid = __isIsoTime(value);
  if (!valid) {
    message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3.string;
  }
  return {
    valid,
    message
  };
}
const definition$7 = {
  description: 'Validate string, array, object and number using the "max" rule',
  type: "String|Array|Object|Number"
};
function max(value, n, settings) {
  var _a3, _b2, _c2, _d2;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.max,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  switch (true) {
    case typeof value === "string":
      if (finalSettings.trim) {
        value = value.trim();
      }
      valid = value.length <= n;
      message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3.string.replace("%n", n);
      break;
    case typeof value === "number":
      valid = value <= n;
      message = (_b2 = finalSettings.i18n) === null || _b2 === void 0 ? void 0 : _b2.number.replace("%n", n);
      break;
    case Array.isArray(value):
      valid = value.length <= n;
      message = (_c2 = finalSettings.i18n) === null || _c2 === void 0 ? void 0 : _c2.array.replace("%n", n);
      break;
    case typeof value === "object":
      valid = Object.keys(value).length <= n;
      message = (_d2 = finalSettings.i18n) === null || _d2 === void 0 ? void 0 : _d2.object.replace("%n", n);
      break;
    default:
      throw new Error(`Sorry but the "max" validation only works with string, number, array or object values.`);
  }
  return {
    valid,
    message
  };
}
const definition$6 = {
  description: 'Validate string, array, object and number using the "min" rule',
  type: "String|Array|Object|Number"
};
function min(value, n, settings) {
  var _a3, _b2, _c2, _d2;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.min,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  switch (true) {
    case typeof value === "string":
      if (finalSettings.trim) {
        value = value.trim();
      }
      valid = value.length >= n;
      message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3.string.replace("%n", n);
      break;
    case typeof value === "number":
      valid = value >= n;
      message = (_b2 = finalSettings.i18n) === null || _b2 === void 0 ? void 0 : _b2.number.replace("%n", n);
      break;
    case Array.isArray(value):
      valid = value.length >= n;
      message = (_c2 = finalSettings.i18n) === null || _c2 === void 0 ? void 0 : _c2.array.replace("%n", n);
      break;
    case typeof value === "object":
      valid = Object.keys(value).length >= n;
      message = (_d2 = finalSettings.i18n) === null || _d2 === void 0 ? void 0 : _d2.object.replace("%n", n);
      break;
    default:
      throw new Error(`Sorry but the "min" validation only works with string, number, array or object values.`);
  }
  return {
    valid,
    message
  };
}
const definition$5 = {
  description: "Validate an negative number",
  type: "number"
};
function negative(value, settings) {
  var _a3;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.negative,
    cast: true,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error(`Sorry but the "negative" validation only works with string and number`);
  }
  if (typeof value === "string" && finalSettings.trim) {
    value = value.trim();
  }
  if (typeof value === "string" && finalSettings.cast) {
    value = Number(value);
  }
  if (isNaN(value)) {
    valid = false;
  } else {
    valid = value < 0;
  }
  if (!valid) {
    message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3.string;
  }
  return {
    valid,
    message
  };
}
const definition$4 = {
  description: "Validate an number",
  type: "number"
};
function number(value, settings) {
  var _a3;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.number,
    cast: true,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error(`Sorry but the "number" validation only works with string and number`);
  }
  if (typeof value === "string" && finalSettings.trim) {
    value = value.trim();
  }
  if (typeof value === "string" && finalSettings.cast) {
    value = Number(value);
  }
  if (isNaN(value)) {
    valid = false;
  } else {
    valid = true;
  }
  if (!valid) {
    message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3.string;
  }
  return {
    valid,
    message
  };
}
const definition$3 = {
  description: "Validate a password string",
  type: "String"
};
function password(value, level, settings) {
  var _a3;
  let message, valid = false;
  const finalSettings = __deepMerge({
    i18n: __en.password,
    trim: true,
    weakReg: /.*/,
    mediumReg: /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/,
    strongReg: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "password" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  let validLevels = [];
  if (finalSettings.weakReg.test(value)) {
    if (value) {
      validLevels.push("weak");
    }
    if (level === "weak") {
      valid = true;
    }
  }
  if (finalSettings.mediumReg.test(value)) {
    if (value) {
      validLevels.push("medium");
    }
    if (level === "medium") {
      valid = true;
    }
  }
  if (finalSettings.strongReg.test(value)) {
    if (value) {
      validLevels.push("strong");
    }
    if (level === "strong") {
      valid = true;
    }
  }
  if (!valid) {
    message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3[level];
  }
  return {
    valid,
    message,
    metas: {
      levels: ["weak", "medium", "strong"],
      validLevels
    }
  };
}
const definition$2 = {
  description: "Validate a string using a regex pattern",
  type: "String"
};
function pattern(value, pattern2, settings) {
  var _a3;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.pattern,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string") {
    throw new Error(`Sorry but the "pattern" validation only works with string`);
  }
  if (finalSettings.trim) {
    value = value.trim();
  }
  const reg = new RegExp(pattern2);
  valid = reg.test(value);
  if (!valid) {
    message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3.string.replace("%pattern", pattern2);
  }
  return {
    valid,
    message
  };
}
const definition$1 = {
  description: "Validate an positive number",
  type: "number"
};
function positive(value, settings) {
  var _a3;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.positive,
    cast: true,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value !== "string" && typeof value !== "number") {
    throw new Error(`Sorry but the "positive" validation only works with string and number`);
  }
  if (typeof value === "string" && finalSettings.trim) {
    value = value.trim();
  }
  if (typeof value === "string" && finalSettings.cast) {
    value = Number(value);
  }
  if (isNaN(value)) {
    valid = false;
  } else {
    valid = value >= 0;
  }
  if (!valid) {
    message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3.string;
  }
  return {
    valid,
    message
  };
}
const definition = {
  description: "Make sure a value has been provided",
  type: "Boolean"
};
function required(value, settings) {
  var _a3;
  let message, valid;
  const finalSettings = __deepMerge({
    i18n: __en.required,
    trim: true
  }, settings !== null && settings !== void 0 ? settings : {});
  if (typeof value === "string" && finalSettings.trim) {
    value = value.trim();
  }
  valid = value !== void 0 && value !== null && value !== "";
  if (!valid) {
    message = (_a3 = finalSettings.i18n) === null || _a3 === void 0 ? void 0 : _a3.default;
  }
  return {
    valid,
    message
  };
}
class SValidator extends SClass {
  constructor(settings) {
    super(__deepMerge({
      i18n: __en
    }, settings !== null && settings !== void 0 ? settings : {}));
  }
  static registerValidator(name2, validator, settings) {
    SValidator._validators[name2] = {
      validator,
      settings
    };
  }
  static registerPreset(name2, rules, settings) {
    SValidator._presets[name2] = {
      rules,
      settings
    };
  }
  static getValidatorsDefinition() {
    const definition2 = {};
    for (let [name2, validatorObj] of Object.entries(SValidator._validators)) {
      if (!validatorObj.settings.definition)
        continue;
      definition2[name2] = validatorObj.settings.definition;
    }
    return definition2;
  }
  validate(value, rulesOrPreset, settings) {
    var _a3, _b2, _c2;
    let result2 = {
      valid: true,
      rules: {},
      messages: []
    };
    let rules = rulesOrPreset;
    if (typeof rulesOrPreset === "string") {
      if (!SValidator._presets[rulesOrPreset]) {
        throw new Error(`Sorry but the preset "${rulesOrPreset}" is not registered`);
      }
      rules = SValidator._presets[rulesOrPreset].rules;
    }
    for (let [validator, valueOrObj] of Object.entries(rules)) {
      let validatorSettings = (_a3 = valueOrObj.settings) !== null && _a3 !== void 0 ? _a3 : {}, validatorValue = (_b2 = valueOrObj.value) !== null && _b2 !== void 0 ? _b2 : valueOrObj, res;
      const validatorObj = SValidator._validators[validator];
      if (!validatorObj) {
        throw new Error(`Sorry but the validator "${validator}" is not registered`);
      }
      const finalValidatorSettings = Object.assign(Object.assign({}, validatorSettings), { i18n: (_c2 = this.settings.i18n[validator]) !== null && _c2 !== void 0 ? _c2 : {} });
      if (typeof rulesOrPreset === "boolean") {
        res = validatorObj.validator(value, finalValidatorSettings);
      } else {
        res = validatorObj.validator(value, validatorValue, finalValidatorSettings);
      }
      if (!res.valid) {
        res.message = res.message.replace("%value", value).replace("%validator", validator);
        result2.valid = false;
        result2.rules[validator] = res;
        result2.messages.push(res.message);
      } else {
        result2.rules[validator] = res;
      }
    }
    return result2;
  }
}
SValidator._validators = {};
SValidator._presets = {};
SValidator.registerValidator("min", min, {
  definition: definition$6
});
SValidator.registerValidator("max", max, {
  definition: definition$7
});
SValidator.registerValidator("email", email, {
  definition: definition$d
});
SValidator.registerValidator("required", required, {
  definition
});
SValidator.registerValidator("isoDate", isoDate, {
  definition: definition$a
});
SValidator.registerValidator("isoTime", isoTime, {
  definition: definition$8
});
SValidator.registerValidator("isoDateTime", isoDateTime, {
  definition: definition$9
});
SValidator.registerValidator("integer", integer, {
  definition: definition$b
});
SValidator.registerValidator("number", number, {
  definition: definition$4
});
SValidator.registerValidator("negative", negative, {
  definition: definition$5
});
SValidator.registerValidator("positive", positive, {
  definition: definition$1
});
SValidator.registerValidator("pattern", pattern, {
  definition: definition$2
});
SValidator.registerValidator("alphanum", alphanum, {
  definition: definition$g
});
SValidator.registerValidator("creditCard", creditCard, {
  definition: definition$e
});
SValidator.registerValidator("color", color, {
  definition: definition$f
});
SValidator.registerValidator("hex", hex, {
  definition: definition$c
});
SValidator.registerValidator("password", password, {
  definition: definition$3
});
const __css$5 = "@-webkit-keyframes error-message-appear {\n    from {\n        line-height: 1;\n        max-height: 0;\n    }\n    to {\n        max-height: 2em;\n        line-height: 2;\n    }\n}\n\n@keyframes error-message-appear {\n    from {\n        line-height: 1;\n        max-height: 0;\n    }\n    to {\n        max-height: 2em;\n        line-height: 2;\n    }\n}\n\n.s-form-validate + .s-form-validate-error-message {\n    text-align: end;\n    overflow: hidden;\n    max-height: 0;\n    margin: 0;\n}\n\n.s-lod--3 .s-form-validate + .s-form-validate-error-message {\n    -webkit-animation: 0.2s error-message-appear var(--s-theme-easing-default, 0) forwards;\n            animation: 0.2s error-message-appear var(--s-theme-easing-default, 0) forwards;\n}\n\n.s-lod--1 .s-form-validate + .s-form-validate-error-message {\n    color: hsla(calc(var(--s-theme-color-error-h, 0) + var(--s-theme-color-error-spin ,0)),calc((var(--s-theme-color-error-s, 0)) * 1%),calc((var(--s-theme-color-error-l, 0)) * 1%),var(--s-theme-color-error-a, 1));\n    line-height: 1;\n}\n";
const validatorsDefinition = SValidator.getValidatorsDefinition(), validatorsMessagesDefinition = {};
for (let [validator, definition2] of Object.entries(validatorsDefinition)) {
  validatorsMessagesDefinition[`${validator}Message`] = {
    description: `The message to display when the validator "${validator}" fails`,
    type: "String"
  };
}
class SFormValidateFeatureInterface extends SInterface {
  static get _definition() {
    return Object.assign(Object.assign(Object.assign({}, validatorsDefinition), validatorsMessagesDefinition), { type: {
      description: "Specify the validation type. Usually automatically detected depending on the field type",
      type: "String",
      default: "text"
    }, on: {
      description: 'Specify when to trigger a validation. Can be "change","submit","enter" and/or "reset"',
      type: "Array<String>",
      values: ["keyup", "change", "submit", "enter", "reset"],
      default: ["keyup", "change", "submit", "enter", "reset"]
    }, format: {
      description: 'Specify if you want your value to be formatted a certain way. You can specify every "import { __format } from `@coffeekraken/sugar/string`" supported formats',
      type: "String",
      values: format$1.formats
    }, errorClass: {
      description: "Specify the class to apply when theres an error",
      type: "String",
      default: "s-form-validate--error s-color--error"
    }, validClass: {
      description: "Specify the class to apply on your s-form-validate element when validation is passed successfully",
      type: "String",
      default: "s-form-validate--valid s-color--success"
    }, handlers: {
      description: 'Specify some custom handlers by validator that will be executed in addition to the default validate behavior. The handler will take as argument an object containing the "result" SValidator result, the "$feature" that represent the s-validate node, the "$form" node if exists, the "$node" attached node if using the "nodes" property, the "$field" that represent the input field handled and the "props" that represent the feature properties',
      type: "Object",
      default: {}
    }, nodes: {
      description: 'Specify a css selector that target some HTMLElements used for the validation. Every HTMLElement has to specify 1 validator by using element attributes (same as on the feature itself). Classes are applied on each "node" to specify if the validator is valid or not',
      type: "String"
    }, language: {
      description: "Specify the language you want to use for messages",
      type: "String",
      default: "en"
    }, displayError: {
      description: "Specify if you want to display the error messages or not",
      type: "Boolean",
      default: true
    }, errorContainerAttr: {
      description: "Specify the attribute to search for the error container. If not found, a default container will be created and inserted after your s-form-validate element",
      type: "String",
      default: "s-form-validate-error"
    } });
  }
}
function define$8(props = {}, name2 = "s-form-validate") {
  SFormValidateFeature.define(name2, SFormValidateFeature, Object.assign({ mountWhen: "interact" }, props));
}
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
class SFormValidateFeature extends SFeature {
  constructor(name2, node, settings) {
    var _a3, _b2, _c2, _d2;
    Object.keys((_b2 = (_a3 = SComponentUtils.getDefaultProps(name2)) === null || _a3 === void 0 ? void 0 : _a3.customValidations) !== null && _b2 !== void 0 ? _b2 : {}).forEach((validationName) => {
      if (SFormValidateFeatureInterface.definition[validationName])
        return;
      SFormValidateFeatureInterface.definition[validationName] = {
        type: "String|Boolean"
      };
    });
    super(name2, node, __deepMerge({
      name: "s-form-validate",
      interface: SFormValidateFeatureInterface,
      style: __css$5
    }, settings !== null && settings !== void 0 ? settings : {}));
    this._nodeByValidator = {};
    this._isDirty = false;
    this._isValidating = false;
    if (!((_c2 = this.props.handlers) === null || _c2 === void 0 ? void 0 : _c2.password)) {
      (_d2 = this.props.handlers) === null || _d2 === void 0 ? void 0 : _d2.password = this._passwordDefaultHandler;
    }
    this._validator = new SValidator();
    this._$form = __querySelectorUp(this.node, "form");
    if (this._$form) {
      this._$form.addEventListener("submit", (e) => {
        var _a4;
        if (!this._$form._submitHandler) {
          this._$form._submitHandler = true;
          const collectedErrors = [];
          const errorHandler = (e2) => {
            collectedErrors.push(e2.detail);
          };
          this._$form.addEventListener("s-form-validate.error", errorHandler);
          e.preventDefault();
          if (e instanceof CustomEvent && !((_a4 = e.detail) === null || _a4 === void 0 ? void 0 : _a4.internal))
            ;
          else {
            e.stopPropagation();
          }
          setTimeout(() => {
            delete this._$form._submitHandler;
            this._$form.removeEventListener("s-form-validate.error", errorHandler);
            if (!collectedErrors.length) {
              this._$form.submit();
              if (e instanceof CustomEvent)
                ;
              else {
                this._$form.dispatchEvent(new CustomEvent("submit", {
                  bubbles: true,
                  cancelable: true
                }));
              }
            }
          });
        }
      });
    }
    this.utils.exposeApi({
      validate: this.validate
    }, this);
    if (this.props.nodes) {
      this._$nodes = this.node.querySelectorAll(this.props.nodes);
      this._$nodes.forEach(($node) => {
        for (let i = 0; i < $node.attributes.length; i++) {
          const attr = $node.attributes[i];
          if (attr.name in this.props) {
            this.props[__camelCase(attr.name)] = autoCast(attr.value);
            this._nodeByValidator[__camelCase(attr.name)] = $node;
          }
        }
      });
    }
  }
  mount() {
    __querySelectorLive("input,textarea,select", ($field) => {
      this._initField($field);
    }, {
      rootNode: this.node,
      scopes: false
    });
    if (this.props.type) {
      if (this.props.type === "text")
        this._validationType = "string";
      else
        this._validationType = this.props.type;
    }
  }
  _passwordDefaultHandler({ result: result2, $feature }) {
    var _a3;
    if (result2.valid) {
      $feature.classList.remove(`password-weak`);
      $feature.classList.remove(`password-medium`);
      $feature.classList.remove(`password-strong`);
    } else if ((_a3 = result2.metas) === null || _a3 === void 0 ? void 0 : _a3.levels) {
      result2.metas.levels.forEach((level) => {
        if (level !== result2.metas.validLevels.slice(-1)[0]) {
          $feature.classList.remove(`password-${level}`);
        } else {
          $feature.classList.add(`password-${level}`);
        }
      });
    }
  }
  _initField($field) {
    this._$field = $field;
    this._$field = this.node;
    const $insideField = this.node.querySelector("input,textarea,select");
    if ($insideField)
      this._$field = $insideField;
    this.utils.fastdom.mutate(() => {
      this._$field.setAttribute("novalidate", "true");
      [
        "required",
        "maxlength",
        "minlength",
        "max",
        "min",
        "pattern"
      ].forEach((type) => {
        if (this._$field.hasAttribute(type)) {
          if (this.props[type])
            return;
          this.props[type] = this._$field.getAttribute(type);
          if (type !== "maxlength" && type !== "minlength") {
            this._$field.removeAttribute(type);
          }
        }
      });
    });
    ["keydown", "change"].forEach((eventType) => {
      this._$field.addEventListener(eventType, (e) => {
        if (this.props.format && (e.target.type === "text" || e.target.tagName.toLowerCase() === "textarea")) {
          setTimeout(() => {
            var _a3;
            const newValue = this.format((_a3 = e.target.value) !== null && _a3 !== void 0 ? _a3 : "", this.props.format);
            if (newValue !== e.target.value) {
              this._$field.value = newValue;
            }
          });
        }
      });
    });
    this.props.on.forEach((on) => {
      var _a3, _b2;
      if (on === "enter") {
        this._$field.addEventListener("keyup", (e) => {
          if (e.keyCode !== 13)
            return;
          if (this._$form) {
            this._$form.dispatchEvent(new CustomEvent("submit", {
              bubbles: false,
              detail: {
                internal: true
              }
            }));
          } else {
            this.validate(e);
          }
        });
      } else if (on === "reset") {
        (_a3 = this._$field.form) === null || _a3 === void 0 ? void 0 : _a3.addEventListener(on, (e) => {
          setTimeout(() => {
            this.validate(e);
          });
        });
      } else if (on === "submit") {
        (_b2 = this._$field.form) === null || _b2 === void 0 ? void 0 : _b2.addEventListener(on, (e) => {
          var _a4;
          e.preventDefault();
          if (e instanceof CustomEvent && !((_a4 = e.detail) === null || _a4 === void 0 ? void 0 : _a4.internal))
            return;
          e.stopPropagation();
          this.validate(e);
        });
      } else if (on === "keyup") {
        this.node.addEventListener(on, (e) => {
          if (!this._isDirty)
            return;
          this.validate(e);
        });
      } else {
        this.node.addEventListener(on, (e) => {
          this.validate(e);
        });
      }
    });
  }
  format(value, format2) {
    const newValue = format$1(value, format2);
    return newValue;
  }
  validate(event) {
    var _a3;
    if (!this._$field) {
      throw new Error(`No $field has been found to be validated...`);
    }
    let value = this._getFieldValue();
    if (((_a3 = event === null || event === void 0 ? void 0 : event.currentTarget) === null || _a3 === void 0 ? void 0 : _a3.tagName.toLowerCase()) === "form" && event.type !== "reset") {
      event.preventDefault();
    }
    if (this._isValidating)
      return;
    this._isValidating = true;
    setTimeout(() => {
      this._isValidating = false;
    });
    let resultObj;
    const validatorRules = {};
    for (let [validator, definition2] of Object.entries(SValidator.getValidatorsDefinition())) {
      if (this.props[validator] !== void 0) {
        validatorRules[validator] = this.props[validator];
      }
    }
    resultObj = this._validator.validate(value, validatorRules);
    if (event.type === "reset") {
      resultObj = {
        valid: true
      };
    }
    this._applyResult(resultObj, event);
  }
  _getFieldValue() {
    switch (true) {
      case this._$field.type === "checkbox":
        return this._getCheckboxValues();
      case this._$field.type === "range":
        return this._getRangeValue();
      case this._$field.tagName.toLowerCase() === "select":
        return this._getSelectValues();
      case this._$field.type === "radio":
        return this._getRadioValue();
      default:
        return this._$field.value;
    }
  }
  _getCheckboxValues() {
    return Array.from(
      this.node.querySelectorAll('input[type="checkbox"]:checked')
    ).map(($item) => $item.value);
  }
  _getRadioValue() {
    return this.node.querySelector('input[type="radio"]:checked').value;
  }
  _getRangeValue() {
    return parseFloat(this._$field.value);
  }
  _getSelectValues() {
    return Array.from(this._$field.querySelectorAll("option")).filter(($item) => $item.selected).map(($item) => $item.value);
  }
  _applyResult(res, event) {
    var _a3, _b2, _c2, _d2, _e, _f;
    return __awaiter$7(this, void 0, void 0, function* () {
      for (let [validator, definition2] of Object.entries(SValidator.getValidatorsDefinition())) {
        if (!this.props[validator]) {
          continue;
        }
        if (this.props.handlers[validator]) {
          yield this.props.handlers[validator]({
            result: Object.assign({}, (_b2 = (_a3 = res.rules) === null || _a3 === void 0 ? void 0 : _a3[validator]) !== null && _b2 !== void 0 ? _b2 : res),
            props: this.props,
            $feature: this.node,
            $form: this._$form,
            $field: this._$field,
            $node: (_c2 = this._nodeByValidator) === null || _c2 === void 0 ? void 0 : _c2[validator]
          });
        }
      }
      if (!res.valid) {
        this._isDirty = true;
        this.node.classList.add(...this.props.errorClass.split(" "));
        this.node.classList.remove(...this.props.validClass.split(" "));
        const firstInvalidValidator = Object.keys(res.rules)[0];
        if (!Object.keys(this._nodeByValidator).length) {
          const finalMessage = this.props[`${firstInvalidValidator}Message`] || res.messages[0];
          if (this.props.displayError) {
            this._$error = (_d2 = this.node.querySelector(`[${this.props.errorContainerAttr}]`)) !== null && _d2 !== void 0 ? _d2 : this.node.nextElementSibling;
            if (!this._$error || !this._$error.hasAttribute("s-form-validate-error")) {
              this._$error = document.createElement("p");
              this._$error.setAttribute("s-form-validate-error", "true");
              this._$error.classList.add("s-form-validate-error-message");
              this.node.parentNode.insertBefore(this._$error, this.node.nextSibling);
            }
            this._$error.innerHTML = finalMessage;
          }
        } else {
          for (let [validator, validationObj] of Object.entries(res.rules)) {
            if (!this._nodeByValidator[validator])
              continue;
            if (validationObj.valid) {
              this._nodeByValidator[validator].classList.remove(...this.props.errorClass.split(" "));
              this._nodeByValidator[validator].classList.add(...this.props.validClass.split(" "));
            } else {
              this._nodeByValidator[validator].classList.remove(...this.props.validClass.split(" "));
              this._nodeByValidator[validator].classList.add(...this.props.errorClass.split(" "));
            }
          }
        }
        this.utils.dispatchEvent("error", {
          detail: res
        });
      } else {
        this._isDirty = false;
        if (event.type !== "reset") {
          this.node.classList.add(...this.props.validClass.split(" "));
        } else {
          this.node.classList.remove(...this.props.validClass.split(" "));
        }
        this.node.classList.remove(...this.props.errorClass.split(" "));
        if ((_e = this._$error) === null || _e === void 0 ? void 0 : _e.hasAttribute("s-form-validate-error")) {
          (_f = this._$error) === null || _f === void 0 ? void 0 : _f.remove();
        }
        if (Object.keys(this._nodeByValidator).length) {
          for (let [validator, validationObj] of Object.entries(res.rules)) {
            if (!this._nodeByValidator[validator])
              continue;
            this._nodeByValidator[validator].classList.remove(...this.props.errorClass.split(" "));
            this._nodeByValidator[validator].classList.add(...this.props.validClass.split(" "));
          }
        }
        this.utils.dispatchEvent("valid", {
          detail: res
        });
      }
    });
  }
}
class SInlineFeatureInterface extends SInterface {
  static get _definition() {
    return {};
  }
}
function define$7(props = {}, name2 = "s-inline") {
  SInlineFeature.define(name2, SInlineFeature, props);
}
const sInlineFeature = "";
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
class SInlineFeature extends SFeature {
  constructor(name2, node, settings) {
    super(name2, node, __deepMerge({
      name: "s-inline",
      interface: SInlineFeatureInterface
    }, settings !== null && settings !== void 0 ? settings : {}));
  }
  mount() {
    if (this.node.tagName === "IMG") {
      const src2 = this.node.src;
      this._inlineImg(src2);
    } else {
      throw new Error(`Sorry but your s-inline marked Element cannot be inlined. At least for now...`);
    }
  }
  _inlineImg(src2) {
    return __awaiter$6(this, void 0, void 0, function* () {
      const r = yield fetch(src2);
      const text = yield r.text();
      const parser = new DOMParser();
      const $svg = parser.parseFromString(text, "text/html").body.firstChild;
      $svg.setAttribute("class", this.node.getAttribute("class"));
      this.node.after($svg);
      this.node.remove();
    });
  }
}
var isff = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : false;
function addEvent(object, event, method, useCapture) {
  if (object.addEventListener) {
    object.addEventListener(event, method, useCapture);
  } else if (object.attachEvent) {
    object.attachEvent("on".concat(event), function() {
      method(window.event);
    });
  }
}
function getMods(modifier, key) {
  var mods = key.slice(0, key.length - 1);
  for (var i = 0; i < mods.length; i++) {
    mods[i] = modifier[mods[i].toLowerCase()];
  }
  return mods;
}
function getKeys(key) {
  if (typeof key !== "string")
    key = "";
  key = key.replace(/\s/g, "");
  var keys3 = key.split(",");
  var index = keys3.lastIndexOf("");
  for (; index >= 0; ) {
    keys3[index - 1] += ",";
    keys3.splice(index, 1);
    index = keys3.lastIndexOf("");
  }
  return keys3;
}
function compareArray(a1, a2) {
  var arr1 = a1.length >= a2.length ? a1 : a2;
  var arr2 = a1.length >= a2.length ? a2 : a1;
  var isIndex = true;
  for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1)
      isIndex = false;
  }
  return isIndex;
}
var _keyMap = {
  backspace: 8,
  tab: 9,
  clear: 12,
  enter: 13,
  return: 13,
  esc: 27,
  escape: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  delete: 46,
  ins: 45,
  insert: 45,
  home: 36,
  end: 35,
  pageup: 33,
  pagedown: 34,
  capslock: 20,
  num_0: 96,
  num_1: 97,
  num_2: 98,
  num_3: 99,
  num_4: 100,
  num_5: 101,
  num_6: 102,
  num_7: 103,
  num_8: 104,
  num_9: 105,
  num_multiply: 106,
  num_add: 107,
  num_enter: 108,
  num_subtract: 109,
  num_decimal: 110,
  num_divide: 111,
  "\u21EA": 20,
  ",": 188,
  ".": 190,
  "/": 191,
  "`": 192,
  "-": isff ? 173 : 189,
  "=": isff ? 61 : 187,
  ";": isff ? 59 : 186,
  "'": 222,
  "[": 219,
  "]": 221,
  "\\": 220
};
var _modifier = {
  "\u21E7": 16,
  shift: 16,
  "\u2325": 18,
  alt: 18,
  option: 18,
  "\u2303": 17,
  ctrl: 17,
  control: 17,
  "\u2318": 91,
  cmd: 91,
  command: 91
};
var modifierMap = {
  16: "shiftKey",
  18: "altKey",
  17: "ctrlKey",
  91: "metaKey",
  shiftKey: 16,
  ctrlKey: 17,
  altKey: 18,
  metaKey: 91
};
var _mods = {
  16: false,
  18: false,
  17: false,
  91: false
};
var _handlers = {};
for (var k = 1; k < 20; k++) {
  _keyMap["f".concat(k)] = 111 + k;
}
var _downKeys = [];
var winListendFocus = false;
var _scope = "all";
var elementHasBindEvent = [];
var code = function code2(x) {
  return _keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
};
function setScope(scope) {
  _scope = scope || "all";
}
function getScope() {
  return _scope || "all";
}
function getPressedKeyCodes() {
  return _downKeys.slice(0);
}
function filter(event) {
  var target = event.target || event.srcElement;
  var tagName = target.tagName;
  var flag = true;
  if (target.isContentEditable || (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") && !target.readOnly) {
    flag = false;
  }
  return flag;
}
function isPressed(keyCode) {
  if (typeof keyCode === "string") {
    keyCode = code(keyCode);
  }
  return _downKeys.indexOf(keyCode) !== -1;
}
function deleteScope(scope, newScope) {
  var handlers;
  var i;
  if (!scope)
    scope = getScope();
  for (var key in _handlers) {
    if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
      handlers = _handlers[key];
      for (i = 0; i < handlers.length; ) {
        if (handlers[i].scope === scope)
          handlers.splice(i, 1);
        else
          i++;
      }
    }
  }
  if (getScope() === scope)
    setScope(newScope || "all");
}
function clearModifier(event) {
  var key = event.keyCode || event.which || event.charCode;
  var i = _downKeys.indexOf(key);
  if (i >= 0) {
    _downKeys.splice(i, 1);
  }
  if (event.key && event.key.toLowerCase() === "meta") {
    _downKeys.splice(0, _downKeys.length);
  }
  if (key === 93 || key === 224)
    key = 91;
  if (key in _mods) {
    _mods[key] = false;
    for (var k2 in _modifier) {
      if (_modifier[k2] === key)
        hotkeys[k2] = false;
    }
  }
}
function unbind(keysInfo) {
  if (typeof keysInfo === "undefined") {
    Object.keys(_handlers).forEach(function(key) {
      return delete _handlers[key];
    });
  } else if (Array.isArray(keysInfo)) {
    keysInfo.forEach(function(info) {
      if (info.key)
        eachUnbind(info);
    });
  } else if (typeof keysInfo === "object") {
    if (keysInfo.key)
      eachUnbind(keysInfo);
  } else if (typeof keysInfo === "string") {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var scope = args[0], method = args[1];
    if (typeof scope === "function") {
      method = scope;
      scope = "";
    }
    eachUnbind({
      key: keysInfo,
      scope,
      method,
      splitKey: "+"
    });
  }
}
var eachUnbind = function eachUnbind2(_ref) {
  var key = _ref.key, scope = _ref.scope, method = _ref.method, _ref$splitKey = _ref.splitKey, splitKey = _ref$splitKey === void 0 ? "+" : _ref$splitKey;
  var multipleKeys = getKeys(key);
  multipleKeys.forEach(function(originKey) {
    var unbindKeys = originKey.split(splitKey);
    var len = unbindKeys.length;
    var lastKey = unbindKeys[len - 1];
    var keyCode = lastKey === "*" ? "*" : code(lastKey);
    if (!_handlers[keyCode])
      return;
    if (!scope)
      scope = getScope();
    var mods = len > 1 ? getMods(_modifier, unbindKeys) : [];
    _handlers[keyCode] = _handlers[keyCode].filter(function(record) {
      var isMatchingMethod = method ? record.method === method : true;
      return !(isMatchingMethod && record.scope === scope && compareArray(record.mods, mods));
    });
  });
};
function eventHandler(event, handler, scope, element) {
  if (handler.element !== element) {
    return;
  }
  var modifiersMatch;
  if (handler.scope === scope || handler.scope === "all") {
    modifiersMatch = handler.mods.length > 0;
    for (var y in _mods) {
      if (Object.prototype.hasOwnProperty.call(_mods, y)) {
        if (!_mods[y] && handler.mods.indexOf(+y) > -1 || _mods[y] && handler.mods.indexOf(+y) === -1) {
          modifiersMatch = false;
        }
      }
    }
    if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === "*") {
      if (handler.method(event, handler) === false) {
        if (event.preventDefault)
          event.preventDefault();
        else
          event.returnValue = false;
        if (event.stopPropagation)
          event.stopPropagation();
        if (event.cancelBubble)
          event.cancelBubble = true;
      }
    }
  }
}
function dispatch(event, element) {
  var asterisk = _handlers["*"];
  var key = event.keyCode || event.which || event.charCode;
  if (!hotkeys.filter.call(this, event))
    return;
  if (key === 93 || key === 224)
    key = 91;
  if (_downKeys.indexOf(key) === -1 && key !== 229)
    _downKeys.push(key);
  ["ctrlKey", "altKey", "shiftKey", "metaKey"].forEach(function(keyName) {
    var keyNum = modifierMap[keyName];
    if (event[keyName] && _downKeys.indexOf(keyNum) === -1) {
      _downKeys.push(keyNum);
    } else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) {
      _downKeys.splice(_downKeys.indexOf(keyNum), 1);
    } else if (keyName === "metaKey" && event[keyName] && _downKeys.length === 3) {
      if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
        _downKeys = _downKeys.slice(_downKeys.indexOf(keyNum));
      }
    }
  });
  if (key in _mods) {
    _mods[key] = true;
    for (var k2 in _modifier) {
      if (_modifier[k2] === key)
        hotkeys[k2] = true;
    }
    if (!asterisk)
      return;
  }
  for (var e in _mods) {
    if (Object.prototype.hasOwnProperty.call(_mods, e)) {
      _mods[e] = event[modifierMap[e]];
    }
  }
  if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState("AltGraph")) {
    if (_downKeys.indexOf(17) === -1) {
      _downKeys.push(17);
    }
    if (_downKeys.indexOf(18) === -1) {
      _downKeys.push(18);
    }
    _mods[17] = true;
    _mods[18] = true;
  }
  var scope = getScope();
  if (asterisk) {
    for (var i = 0; i < asterisk.length; i++) {
      if (asterisk[i].scope === scope && (event.type === "keydown" && asterisk[i].keydown || event.type === "keyup" && asterisk[i].keyup)) {
        eventHandler(event, asterisk[i], scope, element);
      }
    }
  }
  if (!(key in _handlers))
    return;
  for (var _i = 0; _i < _handlers[key].length; _i++) {
    if (event.type === "keydown" && _handlers[key][_i].keydown || event.type === "keyup" && _handlers[key][_i].keyup) {
      if (_handlers[key][_i].key) {
        var record = _handlers[key][_i];
        var splitKey = record.splitKey;
        var keyShortcut = record.key.split(splitKey);
        var _downKeysCurrent = [];
        for (var a2 = 0; a2 < keyShortcut.length; a2++) {
          _downKeysCurrent.push(code(keyShortcut[a2]));
        }
        if (_downKeysCurrent.sort().join("") === _downKeys.sort().join("")) {
          eventHandler(event, record, scope, element);
        }
      }
    }
  }
}
function isElementBind(element) {
  return elementHasBindEvent.indexOf(element) > -1;
}
function hotkeys(key, option, method) {
  _downKeys = [];
  var keys3 = getKeys(key);
  var mods = [];
  var scope = "all";
  var element = document;
  var i = 0;
  var keyup = false;
  var keydown = true;
  var splitKey = "+";
  var capture = false;
  if (method === void 0 && typeof option === "function") {
    method = option;
  }
  if (Object.prototype.toString.call(option) === "[object Object]") {
    if (option.scope)
      scope = option.scope;
    if (option.element)
      element = option.element;
    if (option.keyup)
      keyup = option.keyup;
    if (option.keydown !== void 0)
      keydown = option.keydown;
    if (option.capture !== void 0)
      capture = option.capture;
    if (typeof option.splitKey === "string")
      splitKey = option.splitKey;
  }
  if (typeof option === "string")
    scope = option;
  for (; i < keys3.length; i++) {
    key = keys3[i].split(splitKey);
    mods = [];
    if (key.length > 1)
      mods = getMods(_modifier, key);
    key = key[key.length - 1];
    key = key === "*" ? "*" : code(key);
    if (!(key in _handlers))
      _handlers[key] = [];
    _handlers[key].push({
      keyup,
      keydown,
      scope,
      mods,
      shortcut: keys3[i],
      method,
      key: keys3[i],
      splitKey,
      element
    });
  }
  if (typeof element !== "undefined" && !isElementBind(element) && window) {
    elementHasBindEvent.push(element);
    addEvent(element, "keydown", function(e) {
      dispatch(e, element);
    }, capture);
    if (!winListendFocus) {
      winListendFocus = true;
      addEvent(window, "focus", function() {
        _downKeys = [];
      }, capture);
    }
    addEvent(element, "keyup", function(e) {
      dispatch(e, element);
      clearModifier(e);
    }, capture);
  }
}
function trigger(shortcut) {
  var scope = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "all";
  Object.keys(_handlers).forEach(function(key) {
    var data = _handlers[key].find(function(item) {
      return item.scope === scope && item.shortcut === shortcut;
    });
    if (data && data.method) {
      data.method();
    }
  });
}
var _api = {
  setScope,
  getScope,
  deleteScope,
  getPressedKeyCodes,
  isPressed,
  filter,
  trigger,
  unbind,
  keyMap: _keyMap,
  modifier: _modifier,
  modifierMap
};
for (var a in _api) {
  if (Object.prototype.hasOwnProperty.call(_api, a)) {
    hotkeys[a] = _api[a];
  }
}
if (typeof window !== "undefined") {
  var _hotkeys = window.hotkeys;
  hotkeys.noConflict = function(deep) {
    if (deep && window.hotkeys === hotkeys) {
      window.hotkeys = _hotkeys;
    }
    return hotkeys;
  };
  window.hotkeys = hotkeys;
}
var hotkeys_common = hotkeys;
hotkeys_common.filter = function() {
  return true;
};
function __hotkey(hotkey, settings = {}) {
  return new SPromise(({ resolve, reject, emit, cancel }) => {
    settings = Object.assign({ element: null, keyup: false, keydown: true, once: false, splitKey: "+" }, settings);
    hotkeys_common(hotkey, settings, (e, h) => {
      emit("press", e);
      if (settings.once)
        cancel();
    });
  }, {
    id: "hotkey"
  }).on("finally", () => {
    hotkeys_common.unbind(hotkey);
  });
}
class SPanelComponentInterface extends SInterface {
  static get _definition() {
    return {
      position: {
        description: 'Specify the side where to display the panel. Can be "top","left","bottom" or "right"',
        type: "String",
        values: ["top", "left", "bottom", "right", "modal"],
        default: "modal",
        physical: true
      },
      active: {
        description: "Specify the panel initial state",
        type: "Boolean",
        default: false,
        physical: true
      },
      backdrop: {
        description: 'Specify if you want an "backdrop" between the panel and your content',
        type: "Boolean",
        default: false
      },
      triggerer: {
        description: "Specify a css selector that targets the elements in your UI you want to open the panel on click",
        type: "String"
      },
      closeOn: {
        description: 'Specify which "action(s)" close the panel. Valid values are "click" or/and "escape" or/and "event:%eventName',
        type: {
          type: "Array<String>",
          splitChars: [","]
        },
        values: ["click", "escape"],
        default: ["click", "escape"]
      }
    };
  }
}
const __css$4 = ".s-panel {\n    display: block;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 99999;\n    pointer-events: none;\n}\n\n    .s-panel[active] {\n        pointer-events: all;\n    }\n\n    .s-panel:not([mounted]) > * {\n        display: none;\n    }\n\n.s-pane__root {\n    display: block;\n    position: fixed;\n    top: 0;\n    left: 0;\n}\n\n.s-panel__backdrop {\n    /* position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 0;\n    width: 100%;\n    height: 100%; */position: fixed;\n        top: 0;\n        left: 0;\n        width: 200vw;\n        height: calc(200 * var(--vh,1vh)) ;\n        z-index: 100;\n        transform: translate(-50%, -50%);\n    z-index: 0;\n}\n\n.s-lod--3 .s-panel__backdrop {\n                    -webkit-backdrop-filter: blur(5px);\n                            backdrop-filter: blur(5px);\n}\n\n.s-lod--1 .s-panel__backdrop {\n     \n \n                    background: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-background-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-background-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-background-lightness-offset, 0)) * 1%),0.7);\n}\n\n.s-panel__container {\n    display: none;\n    position: absolute;\n    z-index: 1;\n    overflow: auto;\n}\n\n.s-panel__container::-webkit-scrollbar {\n          width: 2px;\n          height: 2px;\n      }\n\n.s-lod--1 .s-panel__container::-webkit-scrollbar-track {\n            \n                background-color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,0)),calc((var(--s-theme-color-accent-s, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0)) * 1%),0.1);\n}\n\n.s-lod--1 .s-panel__container::-webkit-scrollbar-thumb {\n          \n            background-color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,0)),calc((var(--s-theme-color-accent-s, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0)) * 1%),var(--s-theme-color-accent-a, 1));\n}\n\n@media screen and (max-width: 639px) {\n\n.s-panel__container {\n        width: 90vw;\n        min-width: auto;\n        max-width: auto;\n}\n}\n\n[mounted] .s-panel__container {\n        display: block;\n    }\n\n[position='left'] .s-panel__container {\n        left: 0;\n        top: 0;\n        height: 100%;\n        min-width: 40px;\n        max-width: 90vw;\n        transform: translateX(-100%);\n    }\n\n[position='top'] .s-panel__container {\n        left: 0;\n        top: 0;\n        width: 100%;\n        min-height: 40px;\n        max-height: calc(90 * var(--vh,1vh)) ;\n        transform: translateY(-100%);\n    }\n\n[position='right'] .s-panel__container {\n        right: 0;\n        top: 0;\n        height: 100%;\n        min-width: 40px;\n        max-width: 90vw;\n        transform: translateX(100%);\n    }\n\n[position='bottom'] .s-panel__container {\n        left: 0;\n        bottom: 0;\n        width: 100%;\n        min-height: 40px;\n        max-height: calc(90 * var(--vh,1vh)) ;\n        transform: translateY(100%);\n    }\n\n[position='modal'] .s-panel__container {\n        max-width: 90vw;\n        max-height: calc(90 * var(--vh,1vh)) ;\n        top: 50%;\n        left: 50%;\n        transform: translate(-50%, -40%);\n    }\n\n[active][position='modal'] .s-panel__container {\n        transform: translate(-50%, -50%);\n    }\n\n[active] .s-panel__container {\n        transform: translateX(0) translateY(0);\n    }\n\n.s-panel__root {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n\n.s-panel[lnf='default'] .s-panel__backdrop {\n        opacity: 0;\n    }\n\n.s-lod--2 .s-panel[lnf='default'] .s-panel__backdrop {\n        transition: var(--s-theme-ui-panel-transition, 0);\n}\n\n.s-lod--1 .s-panel[lnf='default'] .s-panel__backdrop {\n        background: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-surface-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-surface-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-surface-lightness-offset, 0)) * 1%),0.6);\n}\n\n.s-panel[lnf='default'] .s-panel__container {\n        opacity: 0;\n    }\n\n.s-lod--3 .s-panel[lnf='default'] .s-panel__container {box-shadow: var(--s-theme-depth-5, 0);\n}\n\n.s-lod--2 .s-panel[lnf='default'] .s-panel__container {\n        transition: var(--s-theme-ui-panel-transition, 0);border-radius: calc(calc(var(--s-theme-border-radius-default, 5px) * var(--s-scale, 1) * var(--s-scale-global, 1)) * 1);\n}\n\n.s-lod--1 .s-panel[lnf='default'] .s-panel__container {\n        background: hsla(calc(var(--s-theme-color-main-h, 0) + var(--s-theme-color-main-background-spin ,0)),calc((var(--s-theme-color-main-s, 0) + var(--s-theme-color-main-background-saturation-offset, 0)) * 1%),calc((var(--s-theme-color-main-l, 0) + var(--s-theme-color-main-background-lightness-offset, 0)) * 1%),var(--s-theme-color-main-background-a, 1));\n}\n\n.s-panel[lnf='default'][active] .s-panel__container,\n        .s-panel[lnf='default'][active] .s-panel__backdrop {\n            opacity: 1;\n        }\n";
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
class SPanelComponent extends SLitComponent {
  constructor() {
    super(__deepMerge({
      name: "s-panel",
      interface: SPanelComponentInterface
    }));
    if (this.id) {
      const $panels = document.querySelectorAll(`s-panel#${this.id}`);
      $panels.forEach(($panel) => $panel !== this && $panel.remove());
    }
  }
  static get properties() {
    return SLitComponent.propertiesFromInterface({}, SPanelComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(__css$4)}
        `;
  }
  mount() {
    return __awaiter$5(this, void 0, void 0, function* () {
      if (this.props.active) {
        this.constructor._activePanels.push(this);
      }
      const $tpl = this.querySelector("template");
      if ($tpl) {
        this._template = $tpl.content;
      }
    });
  }
  isTopPanel() {
    const stackIdx = this.constructor._activePanels.indexOf(this);
    return stackIdx === this.constructor._activePanels.length - 1;
  }
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "active") {
        if (this.props.active) {
          this.open();
        } else {
          this.close();
        }
      }
    });
  }
  firstUpdated() {
    this._$container = this.querySelector(`.${this.utils.uCls("__container")}`);
    this._$backdrop = this.querySelector(`.${this.utils.uCls("__backdrop")}`);
    this._containerTransitionProps = getTransitionProperties(this._$container);
    if (this._$backdrop) {
      this._backdropTransitionProps = getTransitionProperties(this._$backdrop);
    }
    this.props.closeOn.forEach((what) => {
      if (what === "click") {
        this.addEventListener("click", (e) => {
          !this._$container.contains(e.target) && this.isTopPanel() && this.close();
        });
      } else if (what === "escape") {
        __hotkey("escape").on("press", () => {
          this.isTopPanel() && this.close();
        });
      } else if (what.match(/^event\:/)) {
        const event = what.split(":").pop();
        this.addEventListener(event, (e) => {
          this.close();
        });
      }
    });
    if (this.id) {
      const $panels = document.querySelectorAll(`s-panel#${this.id}`);
      if ($panels.length > 1) {
        throw new Error(`[s-panel] Be careful. You have multiple panels with the same "${this.id}" id...`);
      }
      __querySelectorLive(`[href="#${this.id}"]`, ($elm) => {
        $elm.addEventListener("click", (e) => {
          e.preventDefault();
          this.open();
        });
      }, {});
      __querySelectorLive(`[s-panel-open="${this.id}"]`, ($elm) => {
        $elm.addEventListener("click", (e) => {
          e.preventDefault();
          this.open();
        });
      }, {});
      __querySelectorLive(`[s-panel-close="${this.id}"]`, ($elm) => {
        $elm.addEventListener("click", (e) => {
          e.preventDefault();
          this.close();
        });
      }, {});
    }
    if (this.props.triggerer) {
      __querySelectorLive(this.props.triggerer, ($triggerer) => {
        $triggerer.addEventListener("click", (e) => {
          this.open();
        });
      });
    }
  }
  open() {
    if (this.props.active)
      return;
    if (!this._$ghost) {
      this._$ghost = document.createElement("div");
      this._$ghost.setAttribute("s-panel-ghost", "true");
      this.parentNode.insertBefore(this._$ghost, this);
    }
    if (this.parentNode !== document.body) {
      document.body.appendChild(this);
    }
    if (!this.constructor._activePanels.includes(this)) {
      this.constructor._activePanels.push(this);
    }
    setTimeout(() => {
      this.props.active = true;
      this.requestUpdate();
      this.utils.dispatchEvent("open");
    });
  }
  activate() {
    return this.open();
  }
  close() {
    var _a3, _b2;
    if (!this.props.active)
      return;
    const stackIdx = this.constructor._activePanels.indexOf(this);
    if (stackIdx !== -1) {
      delete this.constructor._activePanels[stackIdx];
    }
    this.props.active = false;
    this.requestUpdate();
    this.utils.dispatchEvent("close");
    let duration = 0;
    if (this._containerTransitionProps.totalDuration > duration)
      duration = this._containerTransitionProps.totalDuration;
    if (((_a3 = this._backdropTransitionProps) === null || _a3 === void 0 ? void 0 : _a3.totalDuration) > duration)
      duration = (_b2 = this._backdropTransitionProps) === null || _b2 === void 0 ? void 0 : _b2.totalDuration;
    setTimeout(() => {
      if (!this._$ghost)
        return;
      this._$ghost.parentNode.insertBefore(this, this._$ghost);
    }, duration);
  }
  unactivate() {
    return this.close();
  }
  render() {
    var _a3;
    return html`
            <div
                class="${this.utils.cls("__root")} ${this.utils.cls(`--${this.props.position}`)}"
            >
                ${this.props.backdrop ? html`
                          <div class="${this.utils.cls("__backdrop")}"></div>
                      ` : ""}
                <div class="${this.utils.cls("__container")}">
                    ${(_a3 = this._template) !== null && _a3 !== void 0 ? _a3 : ""}
                </div>
            </div>
        `;
  }
}
SPanelComponent._activePanels = [];
function define$6(props = {}, tagName = "s-panel") {
  SLitComponent.define(tagName, SPanelComponent, props);
}
class SRangeComponentInterface extends SInterface {
  static get _definition() {
    return {
      name: {
        type: "String",
        description: 'Specify the name to assign to the internal input[type="range"]'
      },
      value: {
        type: "Number",
        description: "Specify the initial range value"
      },
      values: {
        type: "Object",
        description: 'Specify some values in array like ["hello","world"] that will be used for tooltip. Your range steps MUST be integers for this to work properly'
      },
      min: {
        type: "Number",
        description: "Specify the minimal value or the range",
        default: 0
      },
      max: {
        type: "Number",
        description: "Specify the maximal value of the range",
        default: 100
      },
      step: {
        type: "Number",
        description: "Specify the steps between each values"
      },
      target: {
        type: "String",
        description: "Specify a css selector of any HTMLElement or HTMLInputElement in which to inject the value when the range is updated"
      },
      tooltip: {
        type: "Boolean",
        description: "Specify if you want to display the value inside a tooltip on top of the thumb",
        default: false
      },
      disabled: {
        type: "Boolean",
        description: "Specify if this range is disabled",
        default: false
      }
    };
  }
}
const __css$3 = ".s-range {\n    display: block;\n    width: 100%;\n}\n\n    .s-range:not([mounted]) > * {\n        display: none;\n    }\n\n    .s-range[disabled] {\n        pointer-events: none;\n    }\n.s-range__root {\n    display: flex;\n    width: 100%;\n}\n.s-range__input {\n    flex-grow: 1;\n    opacity: 1 !important;\n}\n.s-range__input:hover + .s-range__tooltip,\n.s-range__input:focus + .s-range__tooltip {\n    opacity: 1 !important;\n}\n.s-lod--2 .s-range__tooltip {\n    transition: none;\n}\n";
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
class SRangeComponent extends SLitComponent {
  static get properties() {
    return SLitComponent.propertiesFromInterface({}, SRangeComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(`
                ${__css$3}
            `)}
        `;
  }
  constructor() {
    super(__deepMerge({
      name: "s-range",
      interface: SRangeComponentInterface
    }));
  }
  firstUpdated() {
    var _a3;
    return __awaiter$4(this, void 0, void 0, function* () {
      this._$input = this.querySelector("input");
      this._$tooltip = this.querySelector(".s-range__tooltip");
      this._$input.addEventListener("input", (e) => {
        this._handleTooltip();
        this._handleTarget();
      });
      if (this.props.target) {
        this._$targets = Array.from(document.querySelectorAll(this.props.target));
      }
      this._$input.value = this.props.value;
      if ((_a3 = this._$input) === null || _a3 === void 0 ? void 0 : _a3.form) {
        this._$input.form.addEventListener("reset", () => {
          setTimeout(() => {
            this._handleTooltip();
            this._handleTarget();
          });
        });
      }
      this._handleTooltip();
      this._handleTarget();
    });
  }
  _handleTarget() {
    if (!this._$targets)
      return;
    this._$targets.forEach(($target) => {
      $target.innerHTML = this._$input.value;
      $target.value = this._$input.value;
    });
  }
  _handleTooltip() {
    if (!this._$tooltip)
      return;
    const val = this._$input.value;
    const min2 = this._$input.min ? this._$input.min : 0;
    const max2 = this._$input.max ? this._$input.max : 100;
    const newVal = Number((val - min2) * 100 / (max2 - min2));
    this._$tooltip.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
    let tooltipValue = val;
    if (this.props.values && this.props.values[val]) {
      tooltipValue = this.props.values[val];
    }
    this._$tooltip.innerHTML = tooltipValue;
  }
  render() {
    return html`
            <div class="${this.utils.cls("__root", "s-tooltip-container")}">
                <input
                    class="${this.utils.cls("__input", "s-range")}"
                    type="range"
                    ?disabled="${this.props.disabled}"
                    name="${this.props.name}"
                    value="${this.props.value}"
                    min="${this.props.min}"
                    max="${this.props.max}"
                    step="${this.props.step}"
                />
                ${this.props.tooltip ? html`
                          <div
                              class="${this.utils.cls("__tooltip", "s-tooltip")}"
                          ></div>
                      ` : ""}
            </div>
        `;
  }
}
function define$5(props = {}, tagName = "s-range") {
  SLitComponent.define(tagName, SRangeComponent, props);
}
class SRefocusFeatureInterface extends SInterface {
  static get _definition() {
    return {
      trigger: {
        description: "Specify some trigger(s) on which to refocus a particular element like `event:actual`, `anchor`, `history`, etc...",
        type: {
          type: "Array<String>",
          splitChars: [","]
        },
        values: ["event:eventName", "anchor", "history"],
        default: []
      },
      timeout: {
        description: "Specify a timeout to wait before refocus the element",
        type: "Number",
        default: 500
      },
      duration: {
        description: "Specify the duration of the refocus animation",
        type: "Number"
      },
      easing: {
        description: "Specify the easing function of the refocus animation",
        type: "Function"
      },
      offset: {
        description: "Specify the offset of the refocus animation in px",
        type: "Number"
      },
      offsetX: {
        description: "Specify the offset x of the refocus animation in px",
        type: "Number"
      },
      offsetY: {
        description: "Specify the offset y of the refocus animation in px",
        type: "Number"
      },
      align: {
        description: "Specify the alignment of the refocus animation",
        type: "String",
        values: ["start", "center", "end"]
      },
      justify: {
        description: "Specify the justification of the refocus animation",
        type: "String",
        values: ["start", "center", "end"]
      }
    };
  }
}
function define$4(props = {}, name2 = "s-refocus") {
  SRefocusFeature.define(name2, SRefocusFeature, Object.assign({}, props));
}
class SRefocusFeature extends SFeature {
  constructor(name2, node, settings) {
    super(name2, node, __deepMerge({
      name: "s-refocus",
      interface: SRefocusFeatureInterface
    }, settings !== null && settings !== void 0 ? settings : {}));
  }
  mount() {
    this.props.trigger.forEach((trigger2) => {
      switch (trigger2) {
        case "anchor":
          setTimeout(() => {
            if (document.location.hash) {
              const $targetElm = this.node.querySelector(document.location.hash);
              if ($targetElm) {
                this._scrollTo($targetElm);
              }
            }
          }, this.props.timeout);
          break;
        case "history":
          window.addEventListener("hashchange", (e) => {
            if (document.location.hash) {
              const $targetElm = this.node.querySelector(document.location.hash);
              if ($targetElm) {
                this._scrollTo($targetElm);
              }
            }
          });
          window.addEventListener("popstate", (e) => {
            if (document.location.hash) {
              const $targetElm = this.node.querySelector(document.location.hash);
              if ($targetElm) {
                this._scrollTo($targetElm);
              }
            }
          });
          break;
        default:
          if (trigger2.match(/^event:/)) {
            const event = trigger2.replace("event:", "").trim();
            this.node.addEventListener(event, (e) => {
              this._scrollTo(e.target);
            });
          }
          break;
      }
    });
  }
  _scrollTo($elm) {
    const scrollToSettings = {
      $elm: this.node
    };
    if (this.props.duration)
      scrollToSettings.duration = this.props.duration;
    if (this.props.easing)
      scrollToSettings.easing = this.props.easing;
    if (this.props.offset)
      scrollToSettings.offset = this.props.offset;
    if (this.props.offsetX)
      scrollToSettings.offsetX = this.props.offsetX;
    if (this.props.offsetY)
      scrollToSettings.offsetY = this.props.offsetY;
    if (this.props.align)
      scrollToSettings.align = this.props.align;
    if (this.props.justify)
      scrollToSettings.justify = this.props.justify;
    __scrollTo($elm, scrollToSettings);
  }
}
class SScrollComponentInterface extends SInterface {
  static get _definition() {
    return {
      to: {
        description: "The target when to scroll. Must be a valid css selector",
        type: "String",
        required: true
      },
      duration: {
        description: "Specify the duration of the scroll in ms",
        type: "number",
        default: STheme.get("scroll.duration")
      },
      offset: {
        description: "Specify the offset of the scroll in px. Usefull if you have a sticky header, etc...",
        type: "number",
        default: STheme.get("scroll.offset")
      },
      offsetX: {
        description: "Specify the offset of the scroll x in px. Usefull if you have a sticky header, etc...",
        type: "number",
        default: STheme.get("scroll.offsetX")
      },
      offsetY: {
        description: "Specify the offset of the scroll y in px. Usefull if you have a sticky header, etc...",
        type: "number",
        default: STheme.get("scroll.offsetY")
      }
    };
  }
}
function define$3(props = {}, tagName = "s-scroll") {
  SScrollComponent.define(tagName, SScrollComponent, props);
}
const __css$2 = "s-scroll {\n    display: inline-block;\n    cursor: pointer;\n}\n";
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
class SScrollComponent extends SLitComponent {
  static get properties() {
    return SLitComponent.propertiesFromInterface({}, SScrollComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(`
                ${__css$2}
            `)}
        `;
  }
  constructor() {
    super(__deepMerge({
      name: "s-scroll",
      interface: SScrollComponentInterface
    }));
  }
  firstUpdated() {
    return __awaiter$3(this, void 0, void 0, function* () {
      this.addEventListener("click", (e) => {
        e.preventDefault();
        this._scrollTo(this.props.to);
      });
    });
  }
  _scrollTo(target) {
    const scrollConfig = STheme.get("scroll");
    const duration = this.props.duration || (scrollConfig === null || scrollConfig === void 0 ? void 0 : scrollConfig.duration) || 300;
    const offset2 = this.props.offset || scrollConfig.offset || 0;
    const offsetX = this.props.offsetX || scrollConfig.offsetX || offset2;
    const offsetY = this.props.offsetY || scrollConfig.offsetY || offset2;
    switch (target) {
      case "top":
        __scrollTo("top", {
          duration,
          offset: offset2,
          offsetX,
          offsetY
        });
        break;
      case "bottom":
        __scrollTo("bottom", {
          duration,
          offset: offset2,
          offsetX,
          offsetY
        });
        break;
      default:
        const $target = document.querySelector(target);
        if (!$target)
          return;
        __scrollTo($target, {
          duration,
          offset: offset2,
          offsetX,
          offsetY
        });
        break;
    }
  }
  render() {
    return html``;
  }
}
const __css$1 = ".s-slider {\n    display: block;\n    font-size: calc(1rem * var(--s-scale, 1) * var(--s-scale-global, 1));\n    --s-slider-space: 20px;\n}\n\n    .s-slider > .s-slider__root,\n    .s-slider > .s-slider__root > .s-slider__slides-wrapper,\n    .s-slider > .s-slider__root > .s-slider__slides-wrapper > .s-slider__slides {\n        height: 100%;\n        width: 100%;\n    }\n\n    .s-slider[direction='vertical'][pad] > .s-slider__root > .s-slider__slides-wrapper > .s-slider__slides > .s-slider__pad-start {\n                    height: var(--s-slider-pad-start, 0);\n                }\n\n    .s-slider[direction='vertical'][pad] > .s-slider__root > .s-slider__slides-wrapper > .s-slider__slides > .s-slider__pad-end {\n                    height: var(--s-slider-pad-end, 0);\n                }\n\n    .s-slider[direction='horizontal'][pad] > .s-slider__root > .s-slider__slides-wrapper > .s-slider__slides > .s-slider__pad-start {\n                    width: var(--s-slider-pad-start, 0);\n                }\n\n    .s-slider[direction='horizontal'][pad] > .s-slider__root > .s-slider__slides-wrapper > .s-slider__slides > .s-slider__pad-end {\n                    width: var(--s-slider-pad-end, 0);\n                }\n\n.s-slider[behavior='scroll'] > .s-slider__root > .s-slider__slides-wrapper {\n            overflow: auto;\n            scroll-snap-type: x mandatory;\n\n            /* hide scrollbar */\n            -ms-overflow-style: none;\n            scrollbar-width: none;\n        }\n\n.s-slider[behavior='scroll'] > .s-slider__root > .s-slider__slides-wrapper::-webkit-scrollbar {\n                display: none;\n            }\n\n.s-slider[behavior='scroll'] > .s-slider__root > .s-slider__slides-wrapper > .s-slider__slides > .s-slider__slide {\n                    scroll-snap-align: center;\n                }\n\n.s-slider[behavior='scroll'][direction='vertical'] > .s-slider__root > .s-slider__slides-wrapper {\n                scroll-snap-type: y mandatory;\n            }\n\n.s-slider[lnf^='default'] {\n    position: relative;\n    --s-slider-space: 20px;\n}\n\n.s-slider[lnf^='default']:not([class*='s-ratio']) {\n        aspect-ratio: 16/9;\n    }\n\n.s-slider[lnf^='default']:not([mounted]) {\n        opacity: 0;\n    }\n\n.s-slider[lnf^='default'] .s-slider__ui {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        width: 100%;\n        height: 100%;\n        transform: translate(-50%, -50%);\n        pointer-events: none;\n    }\n\n.s-slider[lnf^='default'] .s-slider__ui * {\n            pointer-events: all;\n        }\n\n.s-slider[lnf^='default'][pad] > .s-slider__root > .s-slider__slides-wrapper > .s-slider__slides > .s-slider__pad {\n                    flex-shrink: 0;\n                    flex-grow: 0;\n                }\n\n.s-slider[lnf^='default'] > .s-slider__root {\n        position: relative;\n    }\n\n.s-slider[lnf^='default'] > .s-slider__root > .s-slider__slides-wrapper {\n            /* position: absolute;\n            top: 0;\n            left: 0; */\n            width: 100%;\n            height: 100%;\n        }\n\n.s-slider[lnf^='default'] > .s-slider__root > .s-slider__slides-wrapper > .s-slider__slides {\n                display: inline-flex;\n                -webkit-user-select: none;\n                   -moz-user-select: none;\n                        user-select: none;\n                height: 100%;\n            }\n\n/* white-space: nowrap; */\n\n.s-slider[lnf^='default'] > .s-slider__root > .s-slider__slides-wrapper > .s-slider__slides > .s-slider__slide {\n                    display: block;\n                    flex-shrink: 0;\n                    flex-grow: 0;\n                    width: 100%;\n                    height: 100%;\n                    scroll-snap-align: center;\n\n                    /* &:nth-child(1) {\n                        background: red;\n                        width: 500px !important;\n                    }\n                    &:nth-child(2) {\n                        background: yellow;\n                        width: 800px !important;\n                    }\n                    &:nth-child(3) {\n                        background: blue;\n                        width: 80vw !important;\n                    } */\n                }\n\n.s-slider[lnf^='default'] > .s-slider__root > .s-slider__ui > .s-slider__nav {\n                position: absolute;\n                top: calc(100% + var(--s-slider-space));\n                left: 50%;\n                transform: translate(-50%);\n                display: flex;\n                gap: calc(var(--s-slider-space) * 0.5);\n            }\n\n.s-slider[lnf^='default'] > .s-slider__root > .s-slider__ui > .s-slider__nav > * {\n                    border-radius: 50%;\n                    display: block;\n                    width: 0.5em;\n                    height: 0.5em;\n                    background: currentColor;\n                    opacity: 0.3;\n                    cursor: pointer;\n                }\n\n.s-slider[lnf^='default'] > .s-slider__root > .s-slider__ui > .s-slider__nav > *:hover {\n                        opacity: 0.6;\n                    }\n\n.s-slider[lnf^='default'] > .s-slider__root > .s-slider__ui > .s-slider__nav > *.active {\n                        opacity: 1;\n                    }\n\n.s-slider[lnf^='default'][direction='vertical']\n        > .s-slider__root\n        > .s-slider__slides-wrapper\n        > .s-slider__slides {\n        display: block;\n        width: 100%;\n        height: auto;\n    }\n\n.s-slider[lnf^='default'][direction='vertical']\n        > .s-slider__root\n        > .s-slider__slides-wrapper\n        > .s-slider__slides > .s-slider__slide {\n            display: block;\n            width: 100% !important;\n\n            /* &:nth-child(1) {\n                background: red;\n                height: 500px !important;\n            }\n            &:nth-child(2) {\n                background: yellow;\n                height: 800px !important;\n            }\n            &:nth-child(3) {\n                background: blue;\n                height: 400px !important;\n            } */\n        }\n\n.s-slider[lnf^='default'][lnf*='contained'] .s-slider__root > .s-slider__ui > .s-slider__nav {\n        top: auto;\n        bottom: calc(var(--s-slider-space) - 0.5em);\n        transform: translate(-50%, -100%);\n    }\n\n.s-slider[lnf^='default'][direction='vertical'] .s-slider__root > .s-slider__ui > .s-slider__nav {\n        top: 50%;\n        left: calc(100% + var(--s-slider-space));\n        transform: translate(0, -50%);\n        flex-direction: column;\n    }\n\n.s-slider[lnf^='default'][lnf*='contained'][direction='vertical']\n        .s-slider__root\n        > .s-slider__ui\n        > .s-slider__nav {\n        bottom: auto;\n        left: auto;\n        right: calc(var(--s-slider-space));\n        transform: translate(0, -50%);\n    }\n\n.s-slider[lnf^='default'][lnf*='tight'][direction='horizontal'][controls] {\n        padding-left: calc(var(--s-slider-space) + 1em);\n        padding-right: calc(var(--s-slider-space) + 1em);\n    }\n\n.s-slider[lnf^='default'][lnf*='tight'][direction='horizontal'][nav] {\n        padding-bottom: calc(var(--s-slider-space) + 1em);\n    }\n\n.s-slider[lnf^='default'][lnf*='tight'][direction='vertical'][controls] {\n        padding-top: calc(var(--s-slider-space) + 1em);\n        padding-bottom: calc(var(--s-slider-space) + 1em);\n    }\n\n.s-slider[lnf^='default'][lnf*='tight'][direction='vertical'][nav] {\n        padding-right: calc(var(--s-slider-space) + 1em);\n    }\n\n.s-slider[lnf^='default'] > .s-slider__root > .s-slider__ui > .s-slider__progress {\n        position: absolute;\n        bottom: var(--s-slider-space);\n        left: var(--s-slider-space);\n        right: var(--s-slider-space);\n        height: 0.5em;\n    }\n\n.s-slider[lnf^='default'] > .s-slider__root > .s-slider__ui > .s-slider__progress:before {\n            content: '';\n            display: block;\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background: currentColor;\n            opacity: 0.3;\n        }\n\n.s-slider[lnf^='default'] > .s-slider__root > .s-slider__ui > .s-slider__progress > .s-slider__progress-bar {\n            position: absolute;\n            top: 0;\n            left: 0;\n            height: 100%;\n            width: calc(\n                100% / (var(--s-slider-total-pages)) *\n                    (var(--s-slider-page) + 1)\n            );\n            background: currentColor;\n        }\n\n.s-slider[lnf^='default'][lnf*='contained'] .s-slider__root > .s-slider__ui > .s-slider__progress {\n        bottom: calc(var(--s-slider-space) * 2);\n    }\n\n.s-slider[lnf^='default'] > .s-slider__root > .s-slider__ui > .s-slider__controls .s-slider__controls-next,\n        .s-slider[lnf^='default'] > .s-slider__root > .s-slider__ui > .s-slider__controls .s-slider__controls-previous {\n            width: 1em;\n            height: 1em;\n            position: absolute;\n            top: 50%;\n            transform: translateY(-50%);\n            cursor: pointer;\n            opacity: 0.3;\n            pointer-events: none;\n            color: currentColor;\n        }\n\n.s-slider[lnf^='default'] > .s-slider__root > .s-slider__ui > .s-slider__controls .s-slider__controls-next.active, .s-slider[lnf^='default'] > .s-slider__root > .s-slider__ui > .s-slider__controls .s-slider__controls-previous.active {\n                pointer-events: all;\n                opacity: 1;\n            }\n\n.s-slider[lnf^='default'] > .s-slider__root > .s-slider__ui > .s-slider__controls .s-slider__controls-previous {\n            right: calc(100% + var(--s-slider-space));\n        }\n\n.s-slider[lnf^='default'] > .s-slider__root > .s-slider__ui > .s-slider__controls .s-slider__controls-next {\n            left: calc(100% + var(--s-slider-space));\n        }\n\n.s-slider[lnf^='default'][lnf*='contained']\n        > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-previous {\n        left: var(--s-slider-space);\n        transform: translate(0, -50%);\n    }\n\n.s-slider[lnf^='default'][lnf*='contained']\n        > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-next {\n        left: auto;\n        right: var(--s-slider-space);\n        transform: translate(0, -50%);\n    }\n\n.s-slider[lnf^='default'][direction='vertical']\n        > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-next {\n        left: 50%;\n        top: calc(100% + var(--s-slider-space));\n        transform: translate(-50%, 0) rotate(90deg);\n    }\n\n.s-slider[lnf^='default'][direction='vertical']\n        > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-previous {\n        left: 50%;\n        bottom: calc(100% + var(--s-slider-space));\n        top: auto;\n        transform: translate(-50%, 0) rotate(90deg);\n    }\n\n.s-slider[lnf^='default'][direction='vertical'][lnf*='contained']\n        > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-previous {\n        top: calc(var(--s-slider-space));\n    }\n\n.s-slider[lnf^='default'][direction='vertical'][lnf*='contained']\n        > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-next {\n        top: auto;\n        bottom: calc(var(--s-slider-space));\n    }\n\n.s-slider[lnf^='default'] > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-next-arrow,\n    .s-slider[lnf^='default'] > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-previous-arrow {\n        width: 1em;\n        height: 1em;\n        position: absolute;\n        top: 0;\n        left: 0;\n    }\n\n.s-slider[lnf^='default'] > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-next-arrow:before,\n        .s-slider[lnf^='default'] > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-next-arrow:after,\n        .s-slider[lnf^='default'] > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-previous-arrow:before,\n        .s-slider[lnf^='default'] > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-previous-arrow:after {\n            display: block;\n            content: '';\n            position: absolute;\n            top: calc(50% - 0.1em);\n            left: 0;\n            background: currentColor;\n            width: 100%;\n            height: 0.2em;\n        }\n\n.s-slider[lnf^='default'] > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-next-arrow:before, .s-slider[lnf^='default'] > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-previous-arrow:before {\n            transform-origin: 0 0;\n            transform: rotate(45deg);\n        }\n\n.s-slider[lnf^='default'] > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-next-arrow:after, .s-slider[lnf^='default'] > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-previous-arrow:after {\n            transform-origin: 0 100%;\n            transform: rotate(-45deg);\n        }\n\n.s-slider[lnf^='default'] > .s-slider__root\n        > .s-slider__ui\n        > .s-slider__controls\n        .s-slider__controls-next-arrow {\n        transform: rotate(180deg);\n    }\n";
class SSliderComponentInterface extends SInterface {
  static get _definition() {
    return {
      direction: {
        description: "Specify the slider direction. Can be `horizontal` or `vertical`",
        values: ["horizontal", "vertical"],
        type: "String",
        physical: true,
        default: "horizontal"
      },
      behaviors: {
        description: "Specify the available behaviors for the slider",
        type: "Object",
        default: {}
      },
      behavior: {
        description: 'Specify which behavior your want to use for your slider. Behavior are like "presets" with different animations, etc...',
        values: ["none", "scroll", "transform"],
        type: "String",
        default: "scroll",
        physical: true
      },
      pad: {
        type: "Boolean",
        description: "Specify if you want to pad the slides if for example the first slide does not take the while width of the slider, a padding-(block|inline)-start will be applied to center this first slide. Same for the last one",
        default: false
      },
      nextIconClass: {
        description: "Specify the class of the next icon",
        type: "String"
      },
      previousIconClass: {
        description: "Specify the class of the previous icon",
        type: "String"
      },
      uiContainer: {
        description: 'Specify if you want an "s-container:..." class applied on the .s-slider__ui element',
        type: "String|Boolean"
      },
      controls: {
        description: "Specify if you want to display the controls or not. Controls are the previous and next icons",
        type: "Boolean",
        default: false
      },
      nav: {
        description: "Specify if you want to display the nav or not. Nav are the dots",
        type: "Boolean",
        default: false
      },
      swipe: {
        description: "Specify if you want your slider to support swipe navigation or not",
        type: "Boolean",
        default: false
      },
      mousewheel: {
        description: "Specify if you want to enable the mousewheel event on the slider or not",
        type: "Boolean",
        default: false
      },
      clickOnSlide: {
        description: "Specify if you want to enable the click on the slides to navigate or not",
        type: "Boolean",
        default: false
      },
      loop: {
        description: "Specify if you want to enable the loop behavior or not",
        type: "Boolean",
        default: false
      },
      slide: {
        description: "Specify the active slide id",
        type: "Number",
        default: 0,
        physical: true
      },
      slidesByPage: {
        description: 'Specify how many slides you want by page. Pages are what is used to construct the dot nav and will determine how many slides will be passed on "next" and "previous"',
        type: "Number",
        default: 1
      },
      progress: {
        description: "Specify if you want to display the progress bar or not",
        type: "Boolean",
        default: false
      },
      timer: {
        description: 'Specify a timer that will be applied on each slides and go to the next one after the timer is over. For custom timer by slide, specify the `timer="1200"` attribute on the slides you want',
        type: "Number"
      },
      autoplay: {
        description: "Specify if you want the slider to auto play itself when some timer(s) has been set",
        type: "Boolean",
        default: true
      },
      intersectionClasses: {
        description: 'Specify if you want the classes that describe each slide intersection classes like "in-10", "in-20", etc...',
        type: "Boolean",
        default: false
      },
      transitionDuration: {
        description: "Specify the transition duration of the slider in ms",
        type: "Number",
        default: 500
      },
      transitionEasing: {
        description: "Specify the transition easing of the slider",
        type: "Function",
        default: __easeOutQuad
      },
      transitionHandler: {
        description: "Specify a function that will take care of transitioning the slider from the current item to the next/previous",
        type: "Function"
      }
    };
  }
}
const __scrollBehavior = {
  setup() {
    return new Promise((resolve, reject) => {
      let scrollTimeout;
      this.$slidesWrapper.addEventListener("scroll", (e) => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (this.props.slidesByPage > 1) {
            return;
          }
          let $elm, lowerToCenter = 999999999999;
          for (let [key, $slide] of this.$slides.entries()) {
            const stats = __elementAreaStats($slide, {
              relativeTo: this.$slidesWrapper
            });
            if (this.props.direction === "vertical" && Math.abs(stats.centerOffsetY) <= lowerToCenter) {
              lowerToCenter = Math.abs(stats.centerOffsetY);
              $elm = $slide;
            } else if (this.props.direction === "horizontal" && Math.abs(stats.centerOffsetX) <= lowerToCenter) {
              lowerToCenter = Math.abs(stats.centerOffsetX);
              $elm = $slide;
            }
          }
          if ($elm) {
            const slideObj = this.getSlide($elm);
            this.setCurrentSlideByIdx(slideObj.idx);
          }
        }, 200);
      });
      resolve();
    });
  },
  transition($from, $to) {
    return new Promise((resolve, reject) => {
      this.$slidesWrapper.style.scrollSnapType = "none";
      const toRect = this.getPageRect($to), fromRect = this.getPageRect($from), sliderRect = this.getBoundingClientRect(), _this = this;
      let startX = this.$slidesWrapper.scrollLeft, startY = this.$slidesWrapper.scrollTop, fromOffset, toOffset, dist = 0;
      if (this.props.direction === "vertical") {
        fromOffset = (sliderRect.height - fromRect.height) * 0.5;
        toOffset = (sliderRect.height - toRect.height) * 0.5;
        dist = toRect.y - fromRect.y - toOffset + fromOffset;
      } else {
        fromOffset = (sliderRect.width - fromRect.width) * 0.5;
        toOffset = (sliderRect.width - toRect.width) * 0.5;
        dist = toRect.x - fromRect.x - toOffset + fromOffset;
      }
      __easeInterval(this.props.transitionDuration, (percentage) => {
        const offset2 = dist / 100 * percentage;
        if (_this.props.direction === "vertical") {
          _this.$slidesWrapper.scroll(0, Math.round(startY + offset2));
        } else {
          _this.$slidesWrapper.scroll(Math.round(startX + offset2), 0);
        }
      }, {
        easing: _this.props.transitionEasing,
        onEnd() {
          if (_this.props.direction === "vertical") {
            _this.$slidesWrapper.style.scrollSnapType = "y mandatory";
          } else {
            _this.$slidesWrapper.style.scrollSnapType = "x mandatory";
          }
          resolve();
        }
      });
    });
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SSliderComponent extends SLitComponent {
  constructor() {
    super(__deepMerge({
      name: "s-slider",
      interface: SSliderComponentInterface
    }));
    this._timer = {
      total: 0,
      current: 0,
      percentage: 0
    };
    this._bindedBehaviors = {};
  }
  static get properties() {
    return SLitComponent.propertiesFromInterface({}, SSliderComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(`
                ${__css$1}
            `)}
        `;
  }
  static get state() {
    return {
      currentPage: 0,
      previousSlideIdx: 0,
      currentSlideIdx: 0,
      playing: true
    };
  }
  mount() {
    return __awaiter$2(this, void 0, void 0, function* () {
      this.props.behaviors.scroll = __scrollBehavior;
      if (!this.id) {
        this.setAttribute("id", `s-slider-${__uniqid()}`);
      }
      this.$slides = Array.from(this.querySelectorAll(`[s-slider-slide],s-slider-slide`)).filter(($slide) => {
        const $parentSlider = __querySelectorUp($slide, ".s-slider");
        if (!$parentSlider || $parentSlider === this) {
          $slide.classList.add(...this.utils.cls("__slide").split(" "));
          return true;
        }
        return false;
      });
      if (this.props.slide) {
        this.setCurrentSlide(this.props.slide);
      }
      let resizeTimeout;
      window.addEventListener("resize", (e) => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => __awaiter$2(this, void 0, void 0, function* () {
          yield this.applyPad();
          this.goTo(this.getCurrentSlideIdx(), true);
        }), 200);
      });
    });
  }
  firstUpdated() {
    var _a3, _b2, _c2, _d2, _e, _f, _g;
    return __awaiter$2(this, void 0, void 0, function* () {
      this.$root = this.querySelector(`.${this.utils.uCls("__root")}`);
      this.$slidesWrapper = this.querySelector(`.${this.utils.uCls("__slides-wrapper")}:not(s-slider#${this.id} s-slider .${this.utils.uCls("__slides-wrapper")})`);
      this.$slidesContainer = this.querySelector(`.${this.utils.uCls("__slides")}:not(s-slider#${this.id} s-slider .${this.utils.uCls("__slides")})`);
      if (this.props.behavior && this.props.behavior !== "scroll" && this.props.behavior !== "transform") {
        if (typeof this.props.behavior === "string") {
          let behavior;
          for (let [behaviorId, behaviorObj] of Object.entries(this.props.behaviors)) {
            const id = (_b2 = (_a3 = behaviorObj.class) === null || _a3 === void 0 ? void 0 : _a3.id) !== null && _b2 !== void 0 ? _b2 : behaviorObj.id;
            if (id === this.props.behavior) {
              behavior = behaviorObj;
              break;
            }
          }
          if (!behavior) {
            throw new Error(`The behavior "${this.props.behavior}" is not available`);
          }
          if (!behavior.class) {
            throw new Error(`The behavior "${this.props.behavior}" is not valid. You must provide the "<yellow>class</yellow>" property and an optional "<yellow>settings</yellow>" one...`);
          }
          this.behavior = new behavior.class((_c2 = behavior.settings) !== null && _c2 !== void 0 ? _c2 : {});
        } else if (isClass$1(this.props.behavior)) {
          this.behavior = new this.props.behavior({});
        } else if (this.props.behavior instanceof __SSliderBehavior) {
          this.behavior = this.props.behavior;
        } else {
          throw new Error(`Invalid behavior type, must be a string, an SSliderBehavior extended class or an SSliderBehavior instance`);
        }
        (_e = (_d2 = this.behavior).firstUpdated) === null || _e === void 0 ? void 0 : _e.call(_d2);
      }
      yield (_g = (_f = this.getBehavior()).setup) === null || _g === void 0 ? void 0 : _g.call(_f);
      this.applyPad();
      this._preventUserScrollForDefaultBehavior();
      this.props.intersectionClasses && this._handleIntersections();
      this._handleMousewheel();
      this.props.clickOnSlide && this._handleClickOnSlide();
      this.props.swipe && this._handleSwipe();
      this._initAttributesActions();
      this.goTo(this.props.slide, true);
      if (this.props.autoplay && this.props.timer) {
        this.play();
      }
    });
  }
  applyPad() {
    return __awaiter$2(this, void 0, void 0, function* () {
      setTimeout(() => __awaiter$2(this, void 0, void 0, function* () {
        if (this.getBehavior().pad) {
          yield this.getBehavior().pad();
        } else {
          yield this._pad();
        }
      }), 20);
    });
  }
  _pad() {
    const sliderRect = this.getBoundingClientRect(), firstPageRect = this.getFirstPageRect(), lastPageRect = this.getLastPageRect();
    let padStart = 0, padEnd = 0;
    if (this.props.direction === "vertical") {
      padStart = (sliderRect.height - firstPageRect.height) * 0.5;
      padEnd = (sliderRect.height - lastPageRect.height) * 0.5;
    } else {
      padStart = (sliderRect.width - firstPageRect.width) * 0.5;
      padEnd = (sliderRect.width - lastPageRect.width) * 0.5;
    }
    this.style.setProperty("--s-slider-pad-start", `${Math.round(padStart)}px`);
    this.style.setProperty("--s-slider-pad-end", `${Math.round(padEnd)}px`);
  }
  _handleSwipe() {
    __onSwipe(this.$root, (swipe) => {
      if (this.props.direction === "horizontal") {
        if (swipe.left) {
          this.next();
        } else if (swipe.right) {
          this.previous();
        }
      } else if (this.props.direction === "vertical") {
        if (swipe.top) {
          this.next();
        } else if (swipe.down) {
          this.previous();
        }
      }
    });
  }
  _preventUserScrollForDefaultBehavior() {
    return;
  }
  _handleMousewheel() {
    this.$slidesWrapper.addEventListener("wheel", (e) => {
      if (!this.props.mousewheel) {
        if (this.props.direction === "horizontal" && Math.abs(e.deltaX) > 0) {
          e.preventDefault();
        } else if (this.props.direction === "vertical" && Math.abs(e.deltaY) > 0) {
          e.preventDefault();
        }
      }
    });
  }
  _handleClickOnSlide() {
    this.$slidesContainer.addEventListener("pointerup", (e) => {
      for (let [i, $slide] of this.$slides.entries()) {
        if ($slide.contains(e.target) || $slide === e.target) {
          if (this.currentSlide !== $slide) {
            const slide = this.getSlide($slide);
            this.goTo(slide.idx);
          }
        }
      }
    });
  }
  _handleIntersections() {
    var _a3;
    (_a3 = this.$slides) === null || _a3 === void 0 ? void 0 : _a3.forEach(($slide) => {
      function buildThresholdList() {
        let thresholds = [];
        let numSteps = 10;
        for (let i = 1; i <= numSteps; i++) {
          let ratio = i / numSteps;
          thresholds.push(ratio);
        }
        thresholds.push(0);
        return thresholds;
      }
      function handleIntersect(entries, observer2) {
        let highestRatio = 0;
        entries.forEach((entry) => {
          if (entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
          }
        });
        [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].forEach((threshold2, idx) => {
          if (highestRatio >= threshold2) {
            $slide.classList.add(`in-${threshold2 * 100}`);
          } else {
            $slide.classList.remove(`in-${threshold2 * 100}`);
          }
        });
      }
      let observer;
      let options = {
        root: this.$root,
        rootMargin: "0px",
        threshold: buildThresholdList()
      };
      observer = new IntersectionObserver(handleIntersect, options);
      observer.observe($slide);
    });
  }
  _initAttributesActions() {
    ["next", "previous"].forEach((action) => {
      __querySelectorLive(`[s-slider-${action}]:not(s-slider#${this.id} s-slider [s-slider-${action}])`, ($elm) => {
        $elm.addEventListener("pointerup", (e) => {
          e.preventDefault();
          this[action](true);
        });
      }, {
        scopes: false,
        rootNode: this
      });
    });
    __querySelectorLive(`[s-slider-goto]:not(s-slider#${this.id} .s-slider [s-slider-goto])`, ($elm) => {
      $elm.addEventListener("pointerup", (e) => {
        var _a3;
        const slideIdx = (_a3 = parseInt($elm.getAttribute("s-slider-goto"))) !== null && _a3 !== void 0 ? _a3 : 0;
        this.goTo(slideIdx, true);
      });
    }, {
      scopes: false,
      rootNode: this
    });
  }
  _dispatch(name2, detail = {}) {
    this.utils.dispatchEvent(name2, {
      detail
    });
  }
  isSlideInPage(slide, page = this.state.currentPage) {
    const slideObj = this.getSlide(slide);
    return slideObj.idx >= page * this.props.slidesByPage && slideObj.idx < (page + 1) * this.props.slidesByPage;
  }
  isLast() {
    return this.state.currentSlideIdx >= this.$slides.length - 1;
  }
  isFirst() {
    return this.state.currentSlideIdx <= 0;
  }
  getCurrentSlideIdx() {
    return this.state.currentSlideIdx;
  }
  setCurrentSlideByIdx(idx) {
    if (idx === this.state.currentSlideIdx) {
      return;
    }
    this.state.previousSlideIdx = this.state.currentSlideIdx;
    this.props.slide = idx;
    this.state.currentSlideIdx = idx;
    this.state.currentPage = Math.ceil(idx / this.props.slidesByPage);
    this.updateSlidesClasses();
  }
  setCurrentSlide(idIdxOrElement) {
    const slide = this.getSlide(idIdxOrElement);
    this.setCurrentSlideByIdx(slide.idx);
    return this;
  }
  get currentSlideIdx() {
    return this.getCurrentSlideIdx();
  }
  getCurrentSlideElement() {
    return this.$slides[this.state.currentSlideIdx];
  }
  get currentSlideElement() {
    return this.getCurrentSlideElement();
  }
  getNextSlideIdx() {
    const nextSlideIdx = this.state.currentSlideIdx + 1;
    if (nextSlideIdx >= this.$slides.length - 1)
      return this.$slides.length - 1;
    return nextSlideIdx;
  }
  get nextSlideIdx() {
    return this.getNextSlideIdx();
  }
  getNextSlideElement() {
    return this.$slides[this.getNextSlideIdx()];
  }
  get nextSlideElement() {
    return this.getNextSlideElement();
  }
  getPreviousSlideIdx() {
    const previousSlideIdx = this.state.currentSlideIdx - 1;
    if (previousSlideIdx <= 0)
      return 0;
    return previousSlideIdx;
  }
  get previousSlideIdx() {
    return this.getPreviousSlideIdx();
  }
  getPreviousSlideElement() {
    return this.$slides[this.getPreviousSlideIdx()];
  }
  get previousSlideItem() {
    return this.$slides[this.getPreviousSlideIdx()];
  }
  getSlideIdxById(id) {
    for (let i = 0; i < this.$slides.length; i++) {
      if (this.$slides[i].getAttribute("s-slider-slide") === id)
        return i;
    }
  }
  getSlideElementByIdx(idx) {
    return this.$slides[idx];
  }
  getCurrentSlide() {
    return this.getSlide(this.state.currentSlideIdx);
  }
  get currentSlide() {
    return this.getCurrentSlide();
  }
  getLastPage() {
    return Math.ceil(this.$slides.length / this.props.slidesByPage) - 1;
  }
  getFirstPageSlides() {
    return this.getPageSlides(0);
  }
  getLastPageSlides() {
    return this.getPageSlides(this.getLastPage());
  }
  getPageRect(pageOrSlideElement = this.state.currentPage) {
    let page = pageOrSlideElement;
    if (pageOrSlideElement instanceof HTMLElement) {
      const slide = this.getSlide(pageOrSlideElement);
      page = slide.page;
    }
    const slides = this.getPageSlides(page);
    const rect = {
      top: -1,
      left: -1,
      right: -1,
      bottom: -1,
      width: -1,
      height: -1,
      x: -1,
      y: -1
    };
    slides.forEach((slide) => {
      const slideRect = slide.$slide.getBoundingClientRect();
      if (rect.top === -1 || slideRect.top < rect.top) {
        rect.top = slideRect.top;
      }
      if (rect.left === -1 || slideRect.left < rect.left) {
        rect.left = slideRect.left;
      }
      if (rect.right === -1 || slideRect.right > rect.right) {
        rect.right = slideRect.right;
      }
      if (rect.bottom === -1 || slideRect.bottom > rect.bottom) {
        rect.bottom = slideRect.bottom;
      }
    });
    rect.width = rect.right - rect.left;
    rect.height = rect.bottom - rect.top;
    rect.x = rect.left;
    rect.y = rect.top;
    return rect;
  }
  getFirstPageRect() {
    return this.getPageRect(0);
  }
  getLastPageRect() {
    return this.getPageRect(this.getLastPage());
  }
  getPageSlides(page) {
    const slides = [];
    for (let i = page * this.props.slidesByPage; i < (page + 1) * this.props.slidesByPage; i++) {
      if (i < this.$slides.length) {
        slides.push(this.getSlide(i));
      }
    }
    return slides;
  }
  getSlide(idIdxOrElement) {
    var _a3, _b2;
    let $slide, id, idx, timer;
    if (idIdxOrElement instanceof HTMLElement) {
      const id2 = idIdxOrElement.getAttribute("s-slider-slide");
      if (id2)
        return this.getSlide(id2);
      return this.getSlide(Array.from(this.$slides).indexOf(idIdxOrElement));
    } else if (typeof idIdxOrElement === "number") {
      idx = idIdxOrElement;
      $slide = this.getSlideElementByIdx(idx);
      id = $slide.getAttribute("s-slider-slide");
      timer = $slide._sSliderComponentTimer;
      if (!timer) {
        timer = {
          total: (_a3 = $slide.getAttribute("timer")) !== null && _a3 !== void 0 ? _a3 : this.props.timer,
          current: 0,
          percentage: 0
        };
        $slide._sSliderComponentTimer = timer;
      }
    } else if (typeof idIdxOrElement === "string") {
      idx = this.getSlideIdxById(idIdxOrElement);
      id = idIdxOrElement;
      $slide = this.getSlideElementByIdx(idx);
      timer = $slide._sSliderComponentTimer;
      if (!timer) {
        timer = {
          total: (_b2 = $slide.getAttribute("timer")) !== null && _b2 !== void 0 ? _b2 : this.props.timer,
          current: 0,
          percentage: 0
        };
        $slide._sSliderComponentTimer = timer;
      }
    }
    if (!$slide)
      return;
    return {
      id,
      idx,
      page: Math.ceil(idx / this.props.slidesByPage),
      $slide,
      timer
    };
  }
  getFirstSlide() {
    return this.getSlide(0);
  }
  getLastSlide() {
    return this.getSlide(this.$slides.length - 1);
  }
  getBehavior() {
    if (this._bindedBehaviors[this.props.behavior]) {
      return this._bindedBehaviors[this.props.behavior];
    }
    const behavior = Object.assign({}, this.props.behaviors[this.props.behavior]);
    if (!behavior) {
      throw new Error(`[SSliderComponent] The requested "${this.props.behavior}" does not exists. Here's the available ones:
${Object.keys(this.props.behaviors).map((b) => `
- ${b}`)}`);
    }
    Object.keys(behavior).forEach((fnName) => {
      if (typeof behavior[fnName] === "function") {
        behavior[fnName] = behavior[fnName].bind(this);
      }
    });
    this._bindedBehaviors[this.props.behavior] = behavior;
    return behavior;
  }
  updateSlidesClasses() {
    const currentSlide = this.getCurrentSlide();
    this.$slides.forEach(($slide, i) => {
      if (this.props.slidesByPage > 1 && this.isSlideInPage($slide)) {
        $slide.classList.add("active");
      } else if ($slide === currentSlide.$slide) {
        $slide.classList.add("active");
      } else {
        $slide.classList.remove("active");
      }
    });
  }
  goTo(slideIdIdxOrElement, force = false) {
    return __awaiter$2(this, void 0, void 0, function* () {
      const nextSlide = this.getSlide(slideIdIdxOrElement);
      if (!force && (!nextSlide || nextSlide.idx === this.currentSlide.idx)) {
        return;
      }
      const currentSlide = this.getCurrentSlide();
      this.setCurrentSlideByIdx(nextSlide.idx);
      this.props.slide = nextSlide.idx;
      if (currentSlide.idx + 1 === nextSlide.idx) {
        this._dispatch("next", {
          currentSlide,
          nextSlide
        });
      } else if (currentSlide.idx - 1 === nextSlide.idx) {
        this._dispatch("previous", {
          currentSlide,
          nextSlide
        });
      }
      this._dispatch("goto", {
        currentSlide,
        nextSlide
      });
      this.updateSlidesClasses();
      currentSlide.$slide.classList.add("post-active");
      currentSlide.$slide.classList.remove("active");
      nextSlide.$slide.classList.add("pre-active");
      yield this._transitionHandler(currentSlide.$slide, nextSlide.$slide);
      currentSlide.$slide.classList.remove("post-active");
      nextSlide.$slide.classList.remove("pre-active");
      nextSlide.$slide.classList.add("active");
      this._dispatch("goto-end", {
        currentSlide,
        nextSlide
      });
      if (this.isPlaying()) {
        this._playSlide(this.state.currentSlideIdx);
      }
      return this;
    });
  }
  next() {
    if (this.props.loop && this.isLast()) {
      return this.goTo(0);
    }
    return this.goTo(this.nextSlideIdx);
  }
  previous() {
    if (this.props.loop && this.isFirst()) {
      return this.goTo(this.getLastSlide().idx);
    }
    return this.goTo(this.getPreviousSlideIdx());
  }
  getTimer(slideIdIdxOrElement) {
    var _a3;
    if (!slideIdIdxOrElement) {
      let total = 0, current = 0;
      for (let i = 0; i < this.$slides.length; i++) {
        const slide2 = this.getSlide(i);
        if (i < this.state.currentSlideIdx) {
          current += slide2.timer.total;
        } else if (i === this.state.currentSlideIdx) {
          current += slide2.timer.current;
        }
        total += (_a3 = slide2.timer.total) !== null && _a3 !== void 0 ? _a3 : 0;
      }
      this._timer.total = total;
      this._timer.current = current;
      this._timer.percentage = Math.round(100 / total * current);
      return this._timer;
    }
    const slide = this.getSlide(slideIdIdxOrElement);
    return slide.timer;
  }
  isPlaying() {
    if (!this.state.playing)
      return false;
    return this.props.timer !== void 0;
  }
  play() {
    if (!this.props.timer)
      return;
    this.utils.dispatchEvent("play", {
      detail: this
    });
    this.state.playing = true;
    this._playSlide(this.currentSlide.idx);
    return this;
  }
  stop() {
    this.utils.dispatchEvent("stop", {
      detail: this
    });
    this.state.playing = false;
    return this;
  }
  _playSlide(idIdxOrElement) {
    const slide = this.getSlide(idIdxOrElement);
    if (!slide || !slide.timer)
      return;
    const interval = 100;
    let elapsed = 0;
    const slideInterval = setInterval(() => {
      if (!this.isPlaying())
        return;
      elapsed += interval;
      slide.timer.current = elapsed;
      slide.timer.percentage = 100 / slide.timer.total * elapsed;
      if (elapsed >= slide.timer.total) {
        clearInterval(slideInterval);
        slide.timer.current = 0;
        slide.timer.percentage = 0;
        this.next(false);
      }
    }, interval);
    return this;
  }
  _transitionHandler($from, $to) {
    return new Promise((resolve, reject) => __awaiter$2(this, void 0, void 0, function* () {
      var _a3, _b2, _c2;
      this.style.setProperty("--s-slider-slide-height", `${Math.round(this.getCurrentSlide().$slide.getBoundingClientRect().height)}px`);
      this.style.setProperty("--s-slider-slide-width", `${Math.round(this.getCurrentSlide().$slide.getBoundingClientRect().width)}px`);
      if (this.props.transitionHandler) {
        yield this.props.transitionHandler($from, $to);
        return resolve();
      }
      if ((_a3 = this.props.behavior) === null || _a3 === void 0 ? void 0 : _a3.goTo) {
        yield this.props.behavior.goTo($from, $to);
        return resolve();
      }
      yield (_c2 = (_b2 = this.getBehavior()).transition) === null || _c2 === void 0 ? void 0 : _c2.call(_b2, $from, $to);
      resolve();
    }));
  }
  render() {
    var _a3;
    if (!this.$slides.length)
      return;
    const currentSlide = this.getCurrentSlide();
    let slide = this.getCurrentSlide();
    this.style.setProperty("--s-slider-slide", this.state.currentSlideIdx);
    this.style.setProperty("--s-slider-total-slides", this.$slides.length);
    this.style.setProperty("--s-slider-page", this.state.currentPage);
    this.style.setProperty("--s-slider-total-pages", Math.ceil(this.$slides.length / this.props.slidesByPage));
    this.style.setProperty("--s-slider-slides-by-page", this.props.slidesByPage);
    this.style.setProperty("--s-slider-slide-timer-total", `${(_a3 = slide.timer.total) !== null && _a3 !== void 0 ? _a3 : 0 / 1e3}s`);
    return html`
            <div class="${this.utils.cls("__root")}">
                <div class="${this.utils.cls("__slides-wrapper")}">
                    <div class="${this.utils.cls("__slides")}">
                        <div
                            class="${this.utils.cls("__pad __pad-start")}"
                        ></div>
                        ${this.$slides.map(($slide) => {
      return $slide;
    })}
                        <div class="${this.utils.cls("__pad __pad-end")}"></div>
                    </div>
                </div>
                <div
                    class="${this.utils.cls("__ui", `${typeof this.props.uiContainer === "string" ? `s-container--${this.props.uiContainer}` : this.props.uiContainer === true ? "s-container" : ""}`)}"
                >
                    ${this.props.progress ? html`
                              <div class="${this.utils.cls("__progress")}">
                                  <div
                                      class="${this.utils.cls("__progress-bar")}"
                                  ></div>
                              </div>
                          ` : ""}
                    <div class="${this.utils.cls("__nav")}">
                        ${[
      ...Array(Math.ceil(this.$slides.length / this.props.slidesByPage))
    ].map((i, idx) => {
      return html`
                                <div
                                    class="${this.utils.cls("__nav-item")} ${this.isSlideInPage(currentSlide.idx, idx) ? "active" : ""}"
                                    @pointerup=${() => this.goTo(idx * this.props.slidesByPage)}
                                ></div>
                            `;
    })}
                    </div>
                    ${this.props.controls ? html`
                              <div class="${this.utils.cls("__controls")}">
                                  <div
                                      class="${this.utils.cls("__controls-previous")} ${this.isFirst() && !this.props.loop ? "" : "active"}"
                                      @pointerup=${() => this.previous()}
                                  >
                                      ${this.props.previousIconClass ? html`
                                                <i
                                                    class="${this.props.previousIconClass}"
                                                ></i>
                                            ` : html`<div
                                                class="${this.utils.cls("__controls-previous-arrow")}"
                                            ></div>`}
                                  </div>
                                  <div
                                      class="${this.utils.cls("__controls-next")} ${this.isLast() && !this.props.loop ? "" : "active"}"
                                      @pointerup=${() => this.next()}
                                  >
                                      ${this.props.nextIconClass ? html`
                                                <i
                                                    class="${this.props.nextIconClass}"
                                                ></i>
                                            ` : html`<div
                                                class="${this.utils.cls("__controls-next-arrow")}"
                                            ></div>`}
                                  </div>
                              </div>
                          ` : ""}
                </div>
            </div>
        `;
  }
}
function define$2(props = {}, tagName = "s-slider") {
  SLitComponent.define(tagName, SSliderComponent, props);
}
function __inputAdditionalAttributes(settings = {}) {
  settings = Object.assign({ empty: true, hasValue: true, dirty: true }, settings);
  function handleInputAttributes(eOrElm) {
    const field = eOrElm.target ? eOrElm.target : eOrElm;
    if (!field || !field.tagName)
      return;
    switch (field.tagName) {
      case "INPUT":
      case "TEXTAREA":
      case "SELECT":
        if (field.type && (field.type === "checkbox" || field.type === "radio")) {
          return;
        }
        __fastdom.mutate(() => {
          if (field.value && !field.hasAttribute("has-value")) {
            if (settings.hasValue) {
              field.setAttribute("has-value", true);
            }
            if (settings.empty) {
              field.removeAttribute("empty");
            }
          } else if (field.value === void 0 || field.value === null || field.value === "") {
            if (settings.hasValue) {
              field.removeAttribute("has-value");
            }
            field.removeAttribute("value");
            if (settings.empty) {
              if (!field.hasAttribute("empty")) {
                field.setAttribute("empty", true);
              }
            }
          }
          if (settings.dirty) {
            if (!field.hasAttribute("dirty") && field.value) {
              field.setAttribute("dirty", true);
            }
          }
        });
        break;
    }
  }
  function handleFormSubmitOrReset(e) {
    [].forEach.call(e.target.elements, (field) => {
      handleInputAttributes(field);
      if (e.type === "submit")
        return;
      field.removeAttribute("dirty");
    });
  }
  __querySelectorLive('select, textarea, input:not([type="submit"])', (elm) => {
    handleInputAttributes(elm);
  });
  document.addEventListener("change", handleInputAttributes);
  document.addEventListener("keyup", handleInputAttributes);
  document.addEventListener("reset", handleFormSubmitOrReset);
  document.addEventListener("submit", handleFormSubmitOrReset);
}
/*! (C) 2017 Andrea Giammarchi - @WebReflection - ISC License */
document.addEventListener("click", function(t) {
  var e = t.target.shadowRoot ? t.path[0] : t.target, a2 = (e.closest || function(t2) {
    for (; e && e.nodeName !== t2; )
      e = e.parentNode;
    return e;
  }).call(e, "A");
  if (a2 && /^(?:_self)?$/i.test(a2.target) && !a2.hasAttribute("download") && "external" !== a2.getAttribute("rel") && !t.ctrlKey && !t.metaKey && !t.shiftKey && !t.altKey && a2.href) {
    var n = new URL(a2.href), o = location;
    if (n.origin === o.origin) {
      var r = n.pathname + n.search, i = n.hash, s = true;
      if (t.preventDefault(), r === o.pathname + o.search) {
        if (/^#[a-z][a-z0-9.:_-]+$/i.test(i)) {
          var e = document.querySelector(i + ',[name="' + i.slice(1) + '"]');
          e && (t.preventDefault = function() {
            s = false;
          }, setTimeout(function() {
            s && e.scrollIntoView(true);
          }));
        }
        history.replaceState(history.state, document.title, r + i);
      } else {
        var c = new CustomEvent("pushstate");
        c.state = o.href, setTimeout(function() {
          dispatchEvent(c), window.onpushstate && onpushstate(c);
        }), history.pushState(c.state, document.title, r + i);
      }
    }
  }
}, true);
function __linksStateAttributes(settings = {}) {
  settings = __deepMerge({}, settings);
  function handleLink($linkElm) {
    __fastdom.mutate(() => {
      if ($linkElm.getAttribute("href") === document.location.pathname) {
        $linkElm.setAttribute("actual", true);
        $linkElm.parentNode.setAttribute("actual-parent", true);
        $linkElm.dispatchEvent(new CustomEvent("actual", {
          bubbles: true
        }));
      } else if (document.location.pathname !== "/" && $linkElm.getAttribute("href").startsWith(document.location.pathname)) {
        $linkElm.removeAttribute("actual");
        $linkElm.setAttribute("actual-child", true);
        $linkElm.dispatchEvent(new CustomEvent("actual", {
          bubbles: true
        }));
      } else {
        $linkElm.removeAttribute("actual");
        $linkElm.removeAttribute("actual-child");
        $linkElm.parentNode.removeAttribute("actual-parent");
      }
    });
  }
  __querySelectorLive(`[href]`, ($linkElm) => {
    handleLink($linkElm);
    setTimeout(() => {
      handleLink($linkElm);
    }, 500);
  });
  window.addEventListener("locationchange", () => {
    Array.from(document.querySelectorAll("[href]")).forEach(($linkElm) => {
      handleLink($linkElm);
    });
  });
  window.addEventListener("popstate", () => {
    Array.from(document.querySelectorAll("[href]")).forEach(($linkElm) => {
      handleLink($linkElm);
    });
  });
  window.addEventListener("pushstate", () => {
    Array.from(document.querySelectorAll("[href]")).forEach(($linkElm) => {
      handleLink($linkElm);
    });
  });
}
var querystringify$1 = {};
var has = Object.prototype.hasOwnProperty, undef;
function decode(input) {
  try {
    return decodeURIComponent(input.replace(/\+/g, " "));
  } catch (e) {
    return null;
  }
}
function encode(input) {
  try {
    return encodeURIComponent(input);
  } catch (e) {
    return null;
  }
}
function querystring(query) {
  var parser = /([^=?#&]+)=?([^&]*)/g, result2 = {}, part;
  while (part = parser.exec(query)) {
    var key = decode(part[1]), value = decode(part[2]);
    if (key === null || value === null || key in result2)
      continue;
    result2[key] = value;
  }
  return result2;
}
function querystringify(obj2, prefix) {
  prefix = prefix || "";
  var pairs = [], value, key;
  if ("string" !== typeof prefix)
    prefix = "?";
  for (key in obj2) {
    if (has.call(obj2, key)) {
      value = obj2[key];
      if (!value && (value === null || value === undef || isNaN(value))) {
        value = "";
      }
      key = encode(key);
      value = encode(value);
      if (key === null || value === null)
        continue;
      pairs.push(key + "=" + value);
    }
  }
  return pairs.length ? prefix + pairs.join("&") : "";
}
querystringify$1.stringify = querystringify;
querystringify$1.parse = querystring;
class SSugarFeatureInterface extends SInterface {
  static get _definition() {
    return {
      pleasantCss: {
        description: 'Specify if you want the "pleasant css" syntax in your pages',
        type: "Boolean",
        default: true
      },
      containerQuery: {
        description: "Specify if you want support for container queries in your css or not",
        type: "Boolean",
        default: true
      },
      scrolled: {
        description: "Specify if you want the `scrolled` class to be applied on the `body` element when the page has been scrolled",
        type: "Boolean",
        default: true
      },
      scrolledDelta: {
        description: "Specify after how many scroll the scrolled class will be applied",
        type: "Number",
        default: 200
      },
      vhvar: {
        description: "Specify if you want the `--vh` css variable to be computed and available",
        type: "Boolean",
        default: true
      },
      inputAdditionalAttributes: {
        description: 'Specify if you want to have the additional attributes on inputs like "has-value", "empty" and "dirty" or not',
        type: "Boolean",
        default: true
      },
      resizeTransmations: {
        description: "Specify if you want all the transitions and animations cleared during window resize",
        type: "Boolean",
        default: true
      },
      linksStateAttributes: {
        description: 'Specify if you want to have the state attributes on links like "actual" and "actual-child" or not',
        type: "Boolean",
        default: true
      },
      preventScrollRestoration: {
        description: "Specify if you want to prevent the scroll restoration behavior on chrome that can usually be anoying",
        type: "Boolean",
        default: true
      },
      env: {
        description: "Specify if you want to display the current environment at start",
        type: "Boolean",
        default: true
      }
    };
  }
}
function define$1(props = {}, name2 = "s-sugar") {
  SSugarFeature.define(name2, SSugarFeature, Object.assign({ mountWhen: "direct" }, props));
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
class SSugarFeature extends SFeature {
  constructor(name2, node, settings) {
    super(name2, node, __deepMerge({
      name: "s-sugar",
      interface: SSugarFeatureInterface
    }, settings !== null && settings !== void 0 ? settings : {}));
    this._isResizing = false;
  }
  mount() {
    return __awaiter$1(this, void 0, void 0, function* () {
      if (this.props.pleasantCss)
        this._pleasantCss();
      if (this.props.scrolled)
        this._scrolled();
      if (this.props.vhvar)
        this._vhvar();
      if (this.props.resizeTransmations)
        this._clearTransmationsOnResize();
      if (this.props.inputAdditionalAttributes)
        __inputAdditionalAttributes();
      if (this.props.linksStateAttributes)
        __linksStateAttributes();
      if (this.props.preventScrollRestoration)
        __preventScrollRestoration();
      if (document.readyState !== "complete") {
        document.addEventListener("readystatechange", () => {
          if (document.readyState === "complete") {
            document.body.classList.remove("initial-loading");
            document.body.classList.remove("loading");
          }
        });
      } else {
        document.body.classList.remove("initial-loading");
        document.body.classList.remove("loading");
      }
    });
  }
  _clearTransmationsOnResize() {
    let resetFn;
    window.addEventListener("resize", () => {
      if (!this._isResizing) {
        resetFn = __clearTransmations();
      }
      this._isResizing = true;
      clearTimeout(this._clearTransmationsOnResizeTimeout);
      this._clearTransmationsOnResizeTimeout = setTimeout(() => {
        this._isResizing = false;
        resetFn === null || resetFn === void 0 ? void 0 : resetFn();
      }, 100);
    });
  }
  _pleasantCss() {
    __expandPleasantCssClassnamesLive({
      afterFirst() {
        setTimeout(() => {
          document.body.classList.remove("initial-loading");
          document.body.classList.remove("loading");
        }, 500);
      }
    });
  }
  _scrolled() {
    document.addEventListener("scroll", (e) => {
      if (window.scrollY >= this.props.scrolledDelta) {
        if (!document.body.classList.contains("scrolled")) {
          document.body.classList.add("scrolled");
        }
      } else {
        if (document.body.classList.contains("scrolled")) {
          document.body.classList.remove("scrolled");
        }
      }
    });
  }
  _vhvar() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }
}
function SPackEssentials() {
  define$a();
  define$6();
  define$5();
  define$3();
  define$2();
  define$1();
  define$c();
  define$b();
  define$9();
  define$8();
  define$7();
  define$4();
}
class SGoogleMapComponentInterface extends SInterface {
  static get _definition() {
    return {
      apiKey: {
        type: "String",
        description: "Specify the google api key to use. You can specify it in the config.google.map.apiKey configuration for your project if you prefer",
        default: SSugarConfig.get("google.map.apiKey"),
        required: true
      },
      mapId: {
        type: "String",
        description: "Specify your mapId that you can create [here](https://console.cloud.google.com/google/maps-apis/studio/maps)",
        required: true
      },
      lat: {
        type: "Number",
        description: "Specify the map latitude",
        required: true
      },
      lng: {
        type: "Number",
        description: "Specify the map longitude",
        required: true
      },
      zoom: {
        type: "Number",
        description: "Specify the google map zoom"
      },
      bounds: {
        type: "Boolean",
        description: "Specify if you want your map to be bounds on current markers",
        default: true
      },
      icons: {
        type: "Object",
        description: "Specify some icons to be used across your maps",
        default: {
          marker: '<i class="fa-solid fa-location-dot"></i>'
        }
      },
      zoomControl: {
        type: "Boolean",
        description: "Specify if you want the zom control or not",
        default: false
      },
      mapTypeControl: {
        type: "Boolean",
        description: "Specify if you want the map type control or not",
        default: false
      },
      scaleControl: {
        type: "Boolean",
        description: "Specify if you want the map scale control or not",
        default: false
      },
      streetViewControl: {
        type: "Boolean",
        description: "Specify if you want the streeview control or not",
        default: false
      },
      rotateControl: {
        type: "Boolean",
        description: "Specify if you want the rotate control or not",
        default: false
      },
      fullscreenControl: {
        type: "Boolean",
        description: "Specify if you want the fullscreen control or not",
        default: false
      }
    };
  }
}
const __css = ".s-google-map {\n    display: block;\n    position: relative;\n}\n\n    .s-google-map:not([mounted]) {\n        opacity: 0.001;\n        pointer-events: none;\n    }\n\n    .s-google-map > div[style] {\n        background: none !important;\n    }\n\n    .s-google-map .gm-style {\n        font: inherit;\n    }\n";
function define(props = {}, tagName = "s-google-map") {
  SGoogleMapComponent.define(tagName, SGoogleMapComponent, props);
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
    function step(result2) {
      result2.done ? resolve(result2.value) : adopt(result2.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class SGoogleMapComponent extends SLitComponent {
  constructor() {
    super(__deepMerge({
      name: "s-google-map",
      interface: SGoogleMapComponentInterface
    }));
    this._markers = this._getMarkers();
  }
  static get properties() {
    return SLitComponent.propertiesFromInterface({}, SGoogleMapComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(__css)}
        `;
  }
  static loadApi(apiKey) {
    if (this._loadApiPromise) {
      return this._loadApiPromise;
    }
    this._loadApiPromise = new Promise((resolve) => {
      const $script = document.createElement("script");
      $script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=beta&libraries=marker&callback=_initMap`;
      $script.async = true;
      window._initMap = function() {
        resolve(null);
      };
      document.head.appendChild($script);
    });
    return this._loadApiPromise;
  }
  mount() {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.constructor.loadApi(this.props.apiKey);
      this._map = new google.maps.Map(this, {
        center: { lat: this.props.lat, lng: this.props.lng },
        zoom: 8,
        mapId: this.props.mapId,
        zoomControl: this.props.zoomControl,
        mapTypeControl: this.props.mapTypeControl,
        scaleControl: this.props.scaleControl,
        streetViewControl: this.props.streetViewControl,
        rotateControl: this.props.rotateControl,
        fullscreenControl: this.props.fullscreenControl,
        disableDefaultUI: true
      });
      this._createMarkers(this._markers);
      this._handleBoundsAndZoom();
    });
  }
  _handleBoundsAndZoom() {
    const boundsListener = this._map.addListener("bounds_changed", () => {
      google.maps.event.removeListener(boundsListener);
      if (this.props.bounds) {
        this._bounds(this._markers);
      }
      if (this.props.zoom) {
        this._map.setZoom(this.props.zoom);
      }
    });
  }
  _bounds(markers) {
    const bounds = new google.maps.LatLngBounds();
    for (let marker2 of markers) {
      const latLng = new google.maps.LatLng(marker2.lat, marker2.lng);
      bounds.extend(latLng);
    }
    this._map.fitBounds(bounds);
  }
  _createMarkers(markers) {
    for (let marker2 of markers) {
      const latLng = { lat: marker2.lat, lng: marker2.lng };
      if (!marker2.content) {
        document.createElement("div");
        const domParser = new DOMParser(), markerDocument = domParser.parseFromString(`
                        <div class="${this.utils.cls("-marker")}">
                            <div class="${this.utils.cls("-marker__icon")}">
                                ${this.props.icons.marker}
                            </div>
                        </div>
                    `, "text/html");
        marker2.content = markerDocument.body.children[0];
      }
      marker2.marker = new google.maps.marker.AdvancedMarkerView({
        map: this._map,
        content: marker2.content,
        position: latLng
      });
    }
  }
  _getMarkers() {
    const markers = Array.from(
      this.querySelectorAll(`${this.tagName.toLowerCase()}-marker`)
    ).map(($marker) => {
      var _a3, _b2;
      return {
        lat: parseFloat((_a3 = $marker.getAttribute("lat")) !== null && _a3 !== void 0 ? _a3 : "0"),
        lng: parseFloat((_b2 = $marker.getAttribute("lng")) !== null && _b2 !== void 0 ? _b2 : "0"),
        icon: $marker.getAttribute("icon"),
        content: $marker.children.length ? $marker.children[0] : null
      };
    });
    return markers;
  }
  render() {
    return html``;
  }
}
SGoogleMapComponent.state = {};
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
document.env = window.___deepMerge(JSON.parse(`{"PLATFORM":"browser","ENV":"development","ENVIRONMENT":"development","SUGAR":{"config":{"assets":{"dev":{"type":"module","defer":true,"src":"/src/js/index.ts","env":"development"},"module":{"type":"module","defer":true,"src":"/dist/js/index.esm.js","env":"production"},"nomodule":{"nomodule":true,"defer":true,"src":"/dist/js/index.amd.js","env":"production"},"style":{"id":"global","defer":true,"src":"/dist/css/index.css"}},"datetime":{"dateFormat":"YYYY-MM-DD","timeFormat":"h:mm:ss","i18n":{"previousMonth":"Previous Month","nextMonth":"Next Month","months":["January","February","March","April","May","June","July","August","September","October","November","December"],"weekdays":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"weekdaysShort":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}},"discord":{"server":{"id":"940362961682333767","url":"https://discord.gg/HzycksDJ"}},"google":{"gtm":null,"ga":null,"map":{"apiKey":"AIzaSyDzFfEzhmYXRTlONUCtMWQ88uHJhsbtXY4"}},"metas":{"lang":"en","og":{"type":"website","image":"https://cdnv2.coffeekraken.io/coffeekraken-og.png"}},"project":{"environments":{}},"serve":{"img":{"imgPath":"/dist/img"},"js":{"path":"/dist/js"},"css":{"path":"/dist/css"},"icons":{"path":"/dist/icons"},"fonts":{"path":"/dist/fonts"},"cache":{"path":"/cache"}},"storage":{"system":{"tmpDir":"/private/var/folders/9h/ncs8vtzj6051qh5tqqx_7r_00000gn/T"},"package":{"rootDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic","localDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/.local","cacheDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/.local/cache","tmpDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/.local/tmp","nodeModulesDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/node_modules"},"sugar":{"rootDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/config/s-sugar-config"},"src":{"rootDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/src","jsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/src/js","nodeDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/src/node","cssDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/src/css","configDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/src/config","docDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/src/doc","fontsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/src/fonts","iconsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/src/icons","imgDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/src/img","pagesDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/src/pages","publicDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/src/public","viewsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/src/views"},"dist":{"rootDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/dist","jsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/dist/js","nodeDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/dist/node","cssDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/dist/css","docDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/dist/doc","fontsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/dist/fonts","iconsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/dist/icons","imgDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/dist/img","pagesDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/dist/pages","viewsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/dist/views"},"exclude":["**/bin/**","**/.DS_Store","**/__WIP__/**","**/__wip__/**","**/__TESTS/**","**/__tests__/**","**/__tests__.wip/**","**/.*/**","**/node_modules/**"]},"bench":{"filters":{"min":50,"max":99999999999}},"carpenter":{"server":{"port":3001},"sources":{"components":{"title":"Components","specsNamespaces":["views.components"]},"sections":{"title":"Sections","specsNamespaces":["views.sections"]}}},"classmap":{"path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/classmap.json"},"dashboard":{"layout":[["s-dashboard-pages"],["s-dashboard-browserstack","s-dashboard-google","s-dashboard-web-vitals","s-dashboard-responsive"],["s-dashboard-project","s-dashboard-frontend-checker"]]},"env":{"envFromLocation":{"development":"https?://(localhost|127.0.0.1|0.0.0.0|192.168.[0-9]{1,3}.[0-9]{1,3}|.*.local)","staging":"https?://([a-zA-Z0-9.-]+)?staging([a-zA-Z0-9.-]+)?","production":"https://.*"},"git":{"template":{"name":"Template","commit":{}}}},"frontendServer":{"port":8080,"hostname":"127.0.0.1","rootDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic","staticDirs":{"/tmp":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/.local/tmp","/dist/css/lod":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/dist/css/lod","/dist/css/partials":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/dist/css/partials","/dist":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/src"},"viewsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/src/views","pagesDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/@examples/01-basic/src/pages","logLevel":"info","corsProxy":{"port":9999,"url":"http://127.0.0.1:9999","targetUrlHeaderName":"TargetUrl","limit":"12mb"},"proxy":{},"middlewares":{"bench":{"description":"Track how many times take a request","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/middleware/benchMiddleware","settings":{}},"request":{"description":"Inject the \\"request\\" object for views","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/middleware/requestMiddleware","settings":{}},"env":{"description":"Inject an \\"env\\" object for the views","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/middleware/envMiddleware","settings":{}},"packageJson":{"description":"Inject a \\"packageJson\\" object for the views","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/middleware/packageJsonMiddleware","settings":{}}},"data":{},"modules":{"404":{"description":"This module handle the 404 by rendering either your 404 page configured in the pages or the default 404 page","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/404/404","settings":{}},"publicDir":{"description":"This module allows you to serve files from the public directory","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/publicDir/publicDir","settings":{}},"upload":{"description":"This module allows you to upload files to the tmp/upload directory","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/upload/upload","settings":{}},"generic":{"description":"This module gives you access to the \\"generic\\" handler that renders dynamically views from your page config","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/generic/generic","settings":{}},"docmap":{"description":"This module gives you access to a \\"docmap\\" object in the views","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/docmap/docmap","settings":{}},"classmap":{"description":"This module gives you access to the /classmap.json url","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/classmap/classmap","settings":{}},"carpenter":{"description":"This module gives you access to a \\"carpenter\\" object in the views","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/carpenter/carpenter","settings":{}},"redirect":{"description":"This module allows you to make redirections depending on requested path","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/redirect/redirect","settings":{}},"config":{"description":"This module gives you access to a \\"config\\" and a \\"configFiles\\" object into the views","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/config/config","settings":{}},"frontspec":{"description":"This module gives you access to a \\"frontspec\\" object into the views","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/frontspec/frontspec","settings":{}}},"pages":{},"handlers":{}},"kitchenActions":{"copy":{"title":"Copy file/directory","description":"Copy a file or a directory from the source to the destination passed in params","command":"sugar fs.copy [arguments]","params":{},"settings":{}},"rename":{"title":"Rename project","description":"Rename a project (folder, package.json, etc...)","command":"sugar package.rename [arguments]","params":{},"settings":{}},"initNpm":{"title":"Init npm package","description":"Init npm package in the project","command":"npm init es6 -y","params":{},"settings":{}},"addSugarJson":{"title":"Adding sugar.json file","description":"Adding the sugar.json file to the project","command":"sugar kitchen.add sugarJson [arguments]","params":{},"settings":{}},"addSugar":{"title":"Adding sugar","description":"Adding the sugar toolkit and the s-sugar feature in your project","command":"sugar kitchen.add sugar [arguments]","params":{},"settings":{}},"addNvmrc":{"title":"Adding .nvmrc file","description":"Adding the .nvmrc file to the project","command":"sugar kitchen.add nvmrc [arguments]","params":{},"settings":{}},"addFrontspecJson":{"title":"Adding frontspec.json file","description":"Adding the frontspec.json file to the project","command":"sugar kitchen.add frontspec [arguments]","params":{},"settings":{}},"addManifestJson":{"title":"Adding manifest.json file","description":"Adding the manifest.json file to the project","command":"sugar kitchen.add manifest [arguments]","params":{},"settings":{}},"addFavicon":{"title":"Adding source favicon file","description":"Adding the favicon source file to the project","command":"sugar kitchen.add favicon [arguments]","params":{},"settings":{}},"addReadme":{"title":"Adding source README.md file","description":"Adding the README.md source file to the project","command":"sugar kitchen.add readme [arguments]","params":{},"settings":{}},"addDefaultPages":{"title":"Adding default pages/views file","description":"Adding some default pages/views to the project","command":"sugar kitchen.add defaultPages [arguments]","params":{},"settings":{}},"addDefaultScripts":{"title":"Adding default script files","description":"Adding some default scripts to the project","command":"sugar kitchen.add defaultScripts [arguments]","params":{},"settings":{}},"addDefaultPackageJson":{"title":"Adding default package.json file","description":"Adding default package.json to the project","command":"sugar kitchen.add defaultPackageJson [arguments]","params":{},"settings":{}},"addSugarPostcss":{"title":"Adding sugar postcss plugin","description":"Adding the sugar postcss plugin to the project","command":"sugar kitchen.add postcss [arguments]","params":{},"settings":{}},"installDependencies":{"title":"Install dependencies","description":"Install dependencies like node_modules and composer if exists","command":"sugar package.install [arguments]","interface":"@coffeekraken/s-package/node/interface/SPackageInstallParamsInterface","params":{},"settings":{"silent":true}},"frontendServer":{"title":"Frontend server","description":"Frontend server using the @coffeekraken/s-frontend-server package","command":"sugar frontendServer.start [arguments]","interface":"@coffeekraken/s-frontend-server/node/interface/SFrontendServerStartParamsInterface","params":{},"settings":{"processManager":{"restart":true}}},"corsProxy":{"title":"Cors Proxy","description":"Frontend cors proxy server using the @coffeekraken/s-frontend-server package","command":"sugar frontendServer.corsProxy [arguments]","interface":"@coffeekraken/s-frontend-server/node/interface/SFrontendServerCorsProxyParamsInterface","params":{},"settings":{"processManager":{"restart":true}}},"postcssBuild":{"title":"PostCSS build action","description":"Build css using the amazing PostCSS package","command":"sugar postcss.build [arguments]","interface":"@coffeekraken/s-postcss-builder/node/interface/SPostcssBuilderBuildParamsInterface","params":{},"settings":{"processManager":{}}},"typescriptBuild":{"title":"Typescript builder build action","description":"Build typescript using the s-typescript-builder package","command":"sugar typescript.build [arguments]","interface":"@coffeekraken/s-typescript-builder/node/interface/STypescriptBuilderBuildParamsInterface","params":{"watch":true},"settings":{"processManager":{}}},"imagesBuild":{"title":"Images build action","description":"Build your images with ease. Compress, resize, webp version, etc...","command":"sugar images.build [arguments]","interface":"@coffeekraken/s-images-builder/node/interface/SImagesBuilderBuildParamsInterface","params":{},"settings":{"processManager":{}}},"vite":{"title":"Vite development stack","description":"Allow to build files easily while developing","command":"sugar vite [arguments]","interface":"@coffeekraken/s-vite/node/interface/SViteStartParamsInterface","params":{},"settings":{"processManager":{}}},"viteBuild":{"title":"Vite build stack","description":"Allow to compile javascript (js, ts, riot, react, etc...) files easily","command":"sugar vite.build [arguments]","interface":"@coffeekraken/s-vite/node/interface/SViteBuildParamsInterface","params":{},"settings":{"processManager":{}}},"docmapBuild":{"title":"Docmap build action","description":"Allow to build and maintain up to date the docmap.json file","command":"sugar docmap.build [arguments]","interface":"@coffeekraken/s-docmap/node/interface/SDocmapBuildParamsInterface","params":{},"settings":{"processManager":{}}},"sitemapBuild":{"title":"Sitemap build action","description":"Allow to build and maintain up to date the sitemap.xml file","command":"sugar sitemap.build [arguments]","interface":"@coffeekraken/s-sitemap-builder/node/interface/SSitemapBuilderBuildParamsInterface","params":{},"settings":{"processManager":{}}},"faviconBuild":{"title":"Docmap build action","description":"Allow to build and maintain up to date your favicon files and the manifest.json","command":"sugar favicon.build [arguments]","interface":"@coffeekraken/s-favicon-builder/node/interface/SFaviconBuilderBuildParamsInterface","params":{},"settings":{"processManager":{}}},"markdownBuild":{"title":"Docmap build action","description":"Allow to build your markdown files","command":"sugar markdown.build -p default,readme [arguments]","interface":"@coffeekraken/s-markdown-builder/node/interface/SMarkdownBuilderBuildParamsInterface","params":{},"settings":{"processManager":{}}},"format":{"title":"SCodeFormatter format action","description":"Format your code using the s-code-formatter package","command":"sugar formatter.format [arguments]","interface":"@coffeekraken/s-code-formatter/node/interface/SCodeFormatterFormatParamsInterface","params":{"watch":true},"settings":{"processManager":{}}}},"theme":{"theme":"default","variant":"light","cssVariables":["*"],"themes":{"default-light":{"defaultColor":"main","color":{},"classmap":{"enabled":false,"url":"/classmap.json"},"lod":{"enabled":true,"defaultLevel":3,"botLevel":1,"levels":{"0":{"name":"bare","speedIndex":0},"1":{"name":"low","speedIndex":30},"2":{"name":"medium","speedIndex":40},"3":{"name":"high","speedIndex":50},"4":{"name":"extrem","speedIndex":60}},"method":"file","defaultAction":">=","cssProperties":{}},"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"scroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0},"timing":{},"transition":{},"gradient":{},"helpers":{},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"ratio":{},"scalable":{},"scale":{},"opacity":{},"width":{},"height":{},"depth":{},"size":{},"font":{},"border":{},"space":{},"margin":{},"padding":{},"offsize":{},"media":{"defaultAction":"<=","defaultMedia":"desktop","defaultQuery":"screen","queries":{"mobile":{"minWidth":0,"maxWidth":639},"tablet":{"minWidth":640,"maxWidth":1279},"desktop":{"minWidth":1280,"maxWidth":2047},"wide":{"minWidth":2048,"maxWidth":null}}},"ui":{},"typo":{},"colorSchema":{},"metas":{"title":"Coffeekraken (default)","description":"Default Coffeekraken theme that you can use as a base for your custom theme"}},"default-dark":{"defaultColor":"main","color":{},"classmap":{"enabled":false,"url":"/classmap.json"},"lod":{"enabled":true,"defaultLevel":3,"botLevel":1,"levels":{"0":{"name":"bare","speedIndex":0},"1":{"name":"low","speedIndex":30},"2":{"name":"medium","speedIndex":40},"3":{"name":"high","speedIndex":50},"4":{"name":"extrem","speedIndex":60}},"method":"file","defaultAction":">=","cssProperties":{}},"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"scroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0},"timing":{},"transition":{},"gradient":{},"helpers":{},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"ratio":{},"scalable":{},"scale":{},"opacity":{},"width":{},"height":{},"depth":{},"size":{},"font":{},"border":{},"space":{},"margin":{},"padding":{},"offsize":{},"media":{"defaultAction":"<=","defaultMedia":"desktop","defaultQuery":"screen","queries":{"mobile":{"minWidth":0,"maxWidth":639},"tablet":{"minWidth":640,"maxWidth":1279},"desktop":{"minWidth":1280,"maxWidth":2047},"wide":{"minWidth":2048,"maxWidth":null}}},"ui":{},"typo":{},"colorSchema":{},"metas":{"title":"Coffeekraken (default)","description":"Default Coffeekraken theme that you can use as a base for your custom theme"}}}},"themeBase":{"defaultColor":"main","color":{},"classmap":{"enabled":false,"url":"/classmap.json"},"lod":{"enabled":true,"defaultLevel":3,"botLevel":1,"levels":{"0":{"name":"bare","speedIndex":0},"1":{"name":"low","speedIndex":30},"2":{"name":"medium","speedIndex":40},"3":{"name":"high","speedIndex":50},"4":{"name":"extrem","speedIndex":60}},"method":"file","defaultAction":">=","cssProperties":{}},"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"scroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0},"timing":{},"transition":{},"gradient":{},"helpers":{},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"ratio":{},"scalable":{},"scale":{},"opacity":{},"width":{},"height":{},"depth":{},"size":{},"font":{},"border":{},"space":{},"margin":{},"padding":{},"offsize":{},"media":{"defaultAction":"<=","defaultMedia":"desktop","defaultQuery":"screen","queries":{"mobile":{"minWidth":0,"maxWidth":639},"tablet":{"minWidth":640,"maxWidth":1279},"desktop":{"minWidth":1280,"maxWidth":2047},"wide":{"minWidth":2048,"maxWidth":null}}},"ui":{},"typo":{}},"themeClassmap":{"enabled":false,"url":"/classmap.json"},"themeDefault":{"themeName":"default","metas":{"title":"Coffeekraken (default)","description":"Default Coffeekraken theme that you can use as a base for your custom theme"},"variants":{"light":{"defaultColor":"main","color":{},"classmap":{"enabled":false,"url":"/classmap.json"},"lod":{"enabled":true,"defaultLevel":3,"botLevel":1,"levels":{"0":{"name":"bare","speedIndex":0},"1":{"name":"low","speedIndex":30},"2":{"name":"medium","speedIndex":40},"3":{"name":"high","speedIndex":50},"4":{"name":"extrem","speedIndex":60}},"method":"file","defaultAction":">=","cssProperties":{}},"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"scroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0},"timing":{},"transition":{},"gradient":{},"helpers":{},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"ratio":{},"scalable":{},"scale":{},"opacity":{},"width":{},"height":{},"depth":{},"size":{},"font":{},"border":{},"space":{},"margin":{},"padding":{},"offsize":{},"media":{"defaultAction":"<=","defaultMedia":"desktop","defaultQuery":"screen","queries":{"mobile":{"minWidth":0,"maxWidth":639},"tablet":{"minWidth":640,"maxWidth":1279},"desktop":{"minWidth":1280,"maxWidth":2047},"wide":{"minWidth":2048,"maxWidth":null}}},"ui":{},"typo":{},"colorSchema":{},"metas":{"title":"Coffeekraken (default)","description":"Default Coffeekraken theme that you can use as a base for your custom theme"}},"dark":{"defaultColor":"main","color":{},"classmap":{"enabled":false,"url":"/classmap.json"},"lod":{"enabled":true,"defaultLevel":3,"botLevel":1,"levels":{"0":{"name":"bare","speedIndex":0},"1":{"name":"low","speedIndex":30},"2":{"name":"medium","speedIndex":40},"3":{"name":"high","speedIndex":50},"4":{"name":"extrem","speedIndex":60}},"method":"file","defaultAction":">=","cssProperties":{}},"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"scroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0},"timing":{},"transition":{},"gradient":{},"helpers":{},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"ratio":{},"scalable":{},"scale":{},"opacity":{},"width":{},"height":{},"depth":{},"size":{},"font":{},"border":{},"space":{},"margin":{},"padding":{},"offsize":{},"media":{"defaultAction":"<=","defaultMedia":"desktop","defaultQuery":"screen","queries":{"mobile":{"minWidth":0,"maxWidth":639},"tablet":{"minWidth":640,"maxWidth":1279},"desktop":{"minWidth":1280,"maxWidth":2047},"wide":{"minWidth":2048,"maxWidth":null}}},"ui":{},"typo":{},"colorSchema":{},"metas":{"title":"Coffeekraken (default)","description":"Default Coffeekraken theme that you can use as a base for your custom theme"}}}},"themeDefaultDark":{"defaultColor":"main","color":{},"classmap":{"enabled":false,"url":"/classmap.json"},"lod":{"enabled":true,"defaultLevel":3,"botLevel":1,"levels":{"0":{"name":"bare","speedIndex":0},"1":{"name":"low","speedIndex":30},"2":{"name":"medium","speedIndex":40},"3":{"name":"high","speedIndex":50},"4":{"name":"extrem","speedIndex":60}},"method":"file","defaultAction":">=","cssProperties":{}},"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"scroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0},"timing":{},"transition":{},"gradient":{},"helpers":{},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"ratio":{},"scalable":{},"scale":{},"opacity":{},"width":{},"height":{},"depth":{},"size":{},"font":{},"border":{},"space":{},"margin":{},"padding":{},"offsize":{},"media":{"defaultAction":"<=","defaultMedia":"desktop","defaultQuery":"screen","queries":{"mobile":{"minWidth":0,"maxWidth":639},"tablet":{"minWidth":640,"maxWidth":1279},"desktop":{"minWidth":1280,"maxWidth":2047},"wide":{"minWidth":2048,"maxWidth":null}}},"ui":{},"typo":{},"colorSchema":{},"metas":{"title":"Coffeekraken (default)","description":"Default Coffeekraken theme that you can use as a base for your custom theme"}},"themeDefaultLight":{"defaultColor":"main","color":{},"classmap":{"enabled":false,"url":"/classmap.json"},"lod":{"enabled":true,"defaultLevel":3,"botLevel":1,"levels":{"0":{"name":"bare","speedIndex":0},"1":{"name":"low","speedIndex":30},"2":{"name":"medium","speedIndex":40},"3":{"name":"high","speedIndex":50},"4":{"name":"extrem","speedIndex":60}},"method":"file","defaultAction":">=","cssProperties":{}},"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"scroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0},"timing":{},"transition":{},"gradient":{},"helpers":{},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"ratio":{},"scalable":{},"scale":{},"opacity":{},"width":{},"height":{},"depth":{},"size":{},"font":{},"border":{},"space":{},"margin":{},"padding":{},"offsize":{},"media":{"defaultAction":"<=","defaultMedia":"desktop","defaultQuery":"screen","queries":{"mobile":{"minWidth":0,"maxWidth":639},"tablet":{"minWidth":640,"maxWidth":1279},"desktop":{"minWidth":1280,"maxWidth":2047},"wide":{"minWidth":2048,"maxWidth":null}}},"ui":{},"typo":{},"colorSchema":{},"metas":{"title":"Coffeekraken (default)","description":"Default Coffeekraken theme that you can use as a base for your custom theme"}},"themeEasing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"themeLayout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"themeLod":{"enabled":true,"defaultLevel":3,"botLevel":1,"levels":{"0":{"name":"bare","speedIndex":0},"1":{"name":"low","speedIndex":30},"2":{"name":"medium","speedIndex":40},"3":{"name":"high","speedIndex":50},"4":{"name":"extrem","speedIndex":60}},"method":"file","defaultAction":">=","cssProperties":{}},"themeMedia":{"defaultAction":"<=","defaultMedia":"desktop","defaultQuery":"screen","queries":{"mobile":{"minWidth":0,"maxWidth":639},"tablet":{"minWidth":640,"maxWidth":1279},"desktop":{"minWidth":1280,"maxWidth":2047},"wide":{"minWidth":2048,"maxWidth":null}}},"themeScroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0}}},"PACKAGE":{"name":"@example/01-basic","version":"1.0.0","description":"","main":"index.js","type":"module","private":true,"license":"AGPL-version-3.0","engines":{"node":">= 14.0.0","npm":">= 6.0.0"},"homepage":"","repository":{"type":"git","url":""},"bugs":"","keywords":[],"author":{"name":"","email":"","url":""},"contributors":[],"scripts":{"dev":"sugard kitchen.run dev","prod":"sugard kitchen.run prod","build":"sugard kitchen.run build","static":"live-server static"},"dependencies":{"@coffeekraken/s-activate-feature":"^2.0.0-alpha.20","@coffeekraken/s-carpenter":"2.0.0-alpha.20","@coffeekraken/s-google-map-component":"2.0.0-alpha.20","@coffeekraken/s-postcss-sugar-plugin":"2.0.0-alpha.20","@coffeekraken/s-sugar-feature":"2.0.0-alpha.20","@coffeekraken/sugar":"2.0.0-alpha.20","autoprefixer":"^10.4.12","postcss":"^8.4.17","postcss-atroot":"^0.2.3","postcss-extend-rule":"^4.0.0","postcss-import":"^15.0.0","postcss-nested":"^5.0.6","postcss-property-lookup":"^3.0.0"},"exports":{"./shared/*":{"require":"./dist/pkg/cjs/shared/*.js","import":"./dist/pkg/esm/shared/*.js"},"./node/*":{"require":"./dist/pkg/cjs/node/*.js","import":"./dist/pkg/esm/node/*.js"},"./js/*":{"require":"./dist/pkg/cjs/js/*.js","import":"./dist/pkg/esm/js/*.js"}}}}`), {
  SUGAR: (_a2 = document.SUGAR) != null ? _a2 : {}
});
(async () => {
  SFeature.setDefaultProps("*", {});
  SLitComponent.setDefaultProps("*", {});
  await STheme.init({
    variant: "dark",
    lod: {
      enabled: true,
      level: 3
    }
  });
  document.body.setAttribute("s-sugar", "true");
  define$1();
  SPackEssentials();
  define$8({});
  define$2();
  define();
})();
export {
  SSugarConfig as S
};

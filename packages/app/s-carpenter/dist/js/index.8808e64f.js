var __defProp = Object.defineProperty;
var __defNormalProp = (obj2, key, value) => key in obj2 ? __defProp(obj2, key, { enumerable: true, configurable: true, writable: true, value }) : obj2[key] = value;
var __publicField = (obj2, key, value) => {
  __defNormalProp(obj2, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a2;
function __unique(array) {
  const a = array.concat();
  for (let i2 = 0; i2 < a.length; ++i2) {
    for (let j = i2 + 1; j < a.length; ++j) {
      if (a[i2] === a[j])
        a.splice(j--, 1);
    }
  }
  return a;
}
function __pickRandom(array, count = 1) {
  array = __unique(array);
  const items = [];
  if (count > 1) {
    if (count >= array.length) {
      return array;
    }
    for (let i2 = 0; i2 < count; i2++) {
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
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getAugmentedNamespace(n) {
  var f = n.default;
  if (typeof f == "function") {
    var a = function() {
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
            crypto2 = require$$0$3;
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
              for (var i2 = 0; i2 < thatSigBytes; i2++) {
                var thatByte = thatWords[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
                thisWords[thisSigBytes + i2 >>> 2] |= thatByte << 24 - (thisSigBytes + i2) % 4 * 8;
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
    const min = Math.min(r, g2, b);
    const max2 = Math.max(r, g2, b);
    const delta = max2 - min;
    let h;
    let s;
    if (max2 === min) {
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
    const l = (min + max2) / 2;
    if (max2 === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max2 + min);
    } else {
      s = delta / (2 - max2 - min);
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
    const v2 = Math.max(r, g2, b);
    const diff = v2 - Math.min(r, g2, b);
    const diffc = function(c) {
      return (v2 - c) / 6 / diff + 1 / 2;
    };
    if (diff === 0) {
      h = 0;
      s = 0;
    } else {
      s = diff / v2;
      rdif = diffc(r);
      gdif = diffc(g2);
      bdif = diffc(b);
      if (r === v2) {
        h = bdif - gdif;
      } else if (g2 === v2) {
        h = 1 / 3 + rdif - bdif;
      } else if (b === v2) {
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
      v2 * 100
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
  convert2.hsl.hsv = function(hsl) {
    const h = hsl[0];
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    let smin = s;
    const lmin = Math.max(l, 0.01);
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    smin *= lmin <= 1 ? lmin : 2 - lmin;
    const v2 = (l + s) / 2;
    const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
    return [h, sv * 100, v2 * 100];
  };
  convert2.hsv.rgb = function(hsv) {
    const h = hsv[0] / 60;
    const s = hsv[1] / 100;
    let v2 = hsv[2] / 100;
    const hi = Math.floor(h) % 6;
    const f = h - Math.floor(h);
    const p = 255 * v2 * (1 - s);
    const q = 255 * v2 * (1 - s * f);
    const t = 255 * v2 * (1 - s * (1 - f));
    v2 *= 255;
    switch (hi) {
      case 0:
        return [v2, t, p];
      case 1:
        return [q, v2, p];
      case 2:
        return [p, v2, t];
      case 3:
        return [p, q, v2];
      case 4:
        return [t, p, v2];
      case 5:
        return [v2, p, q];
    }
  };
  convert2.hsv.hsl = function(hsv) {
    const h = hsv[0];
    const s = hsv[1] / 100;
    const v2 = hsv[2] / 100;
    const vmin = Math.max(v2, 0.01);
    let sl;
    let l;
    l = (2 - s) * v2;
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
    const i2 = Math.floor(6 * h);
    const v2 = 1 - bl;
    f = 6 * h - i2;
    if ((i2 & 1) !== 0) {
      f = 1 - f;
    }
    const n = wh + f * (v2 - wh);
    let r;
    let g2;
    let b;
    switch (i2) {
      default:
      case 6:
      case 0:
        r = v2;
        g2 = n;
        b = wh;
        break;
      case 1:
        r = n;
        g2 = v2;
        b = wh;
        break;
      case 2:
        r = wh;
        g2 = v2;
        b = n;
        break;
      case 3:
        r = wh;
        g2 = n;
        b = v2;
        break;
      case 4:
        r = n;
        g2 = wh;
        b = v2;
        break;
      case 5:
        r = v2;
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
    const string2 = integer.toString(16).toUpperCase();
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
    const min = Math.min(Math.min(r, g2), b);
    const chroma = max2 - min;
    let grayscale;
    let hue;
    if (chroma < 1) {
      grayscale = min / (1 - chroma);
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
    const v2 = hsv[2] / 100;
    const c = s * v2;
    let f = 0;
    if (c < 1) {
      f = (v2 - c) / (1 - c);
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
    const v2 = hi % 1;
    const w = 1 - v2;
    let mg = 0;
    switch (Math.floor(hi)) {
      case 0:
        pure[0] = 1;
        pure[1] = v2;
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
        pure[2] = v2;
        break;
      case 3:
        pure[0] = 0;
        pure[1] = w;
        pure[2] = 1;
        break;
      case 4:
        pure[0] = v2;
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
    const v2 = c + g2 * (1 - c);
    let f = 0;
    if (v2 > 0) {
      f = c / v2;
    }
    return [hcg[0], f * 100, v2 * 100];
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
    const v2 = c + g2 * (1 - c);
    return [hcg[0], (v2 - c) * 100, (1 - v2) * 100];
  };
  convert2.hwb.hcg = function(hwb) {
    const w = hwb[1] / 100;
    const b = hwb[2] / 100;
    const v2 = 1 - b;
    const c = v2 - w;
    let g2 = 0;
    if (c < 1) {
      g2 = (v2 - c) / (1 - c);
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
    const string2 = integer.toString(16).toUpperCase();
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
    for (let len = models.length, i2 = 0; i2 < len; i2++) {
      graph[models[i2]] = {
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
      for (let len = adjacents.length, i2 = 0; i2 < len; i2++) {
        const adjacent = adjacents[i2];
        const node2 = graph[adjacent];
        if (node2.distance === -1) {
          node2.distance = graph[current].distance + 1;
          node2.parent = current;
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
    for (let len = models.length, i2 = 0; i2 < len; i2++) {
      const toModel = models[i2];
      const node2 = graph[toModel];
      if (node2.parent === null) {
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
        for (let len = result2.length, i2 = 0; i2 < len; i2++) {
          result2[i2] = Math.round(result2[i2]);
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
  const wrapAnsi16 = (fn2, offset) => (...args) => {
    const code = fn2(...args);
    return `\x1B[${code + offset}m`;
  };
  const wrapAnsi256 = (fn2, offset) => (...args) => {
    const code = fn2(...args);
    return `\x1B[${38 + offset};5;${code}m`;
  };
  const wrapAnsi16m = (fn2, offset) => (...args) => {
    const rgb = fn2(...args);
    return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
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
    const offset = isBackground ? 10 : 0;
    const styles2 = {};
    for (const [sourceSpace, suite] of Object.entries(colorConvert2)) {
      const name2 = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
      if (sourceSpace === targetSpace) {
        styles2[name2] = wrap2(identity, offset);
      } else if (typeof suite === "object") {
        styles2[name2] = wrap2(suite[targetSpace], offset);
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
  for (let i2 = 1; i2 < firstString.length; i2++) {
    parts.push(
      String(arguments_[i2 - 1]).replace(/[{}\\]/g, "\\$&"),
      String(firstString.raw[i2])
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
  for (const [k, v2] of map2)
    obj2[k] = v2;
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
      const desc = Object.getOwnPropertyDescriptor(secondObj, key);
      if (desc.set || desc.get) {
        Object.defineProperty(newObj, key, desc);
      } else if (__isPlainObject(newObj[key]) && __isPlainObject(secondObj[key])) {
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
function __deepMap(objectOrArray, processor, settings = {}, _path = []) {
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
    if (isArray2)
      newObject.push(res);
    else {
      if (prop === "..." && __isPlainObject(res)) {
        newObject = Object.assign(Object.assign({}, newObject), res);
      } else {
        newObject[prop] = res;
      }
    }
  });
  return newObject;
}
var decycle_1;
const isArray$4 = (e) => Array.isArray(e), isObject$5 = (e) => "Object" === Object.prototype.toString.call(e).slice(8, -1), validate$1 = (e) => {
  if (void 0 === e)
    throw new Error("This method requires one parameter");
  if (!isArray$4(e) && !isObject$5(e))
    throw new TypeError("This method only accepts arrays and objects");
}, findRef = (e, r) => Object.keys(r).find((a) => r[a] === e), decycle = (e) => {
  validate$1(e);
  let r = {};
  const a = (e2, c = "$") => {
    const s = findRef(e2, r);
    return s ? { $ref: s } : isArray$4(e2) || isObject$5(e2) ? (r[c] = e2, isArray$4(e2) ? e2.map((e3, r2) => a(e3, `${c}[${r2}]`)) : Object.keys(e2).reduce((r2, s2) => (r2[s2] = a(e2[s2], `${c}.${s2}`), r2), {})) : e2;
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
    const color = __pickRandom(availableColors$1);
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
const REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
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
function __uniqid() {
  return v4();
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
      const watchId = __uniqid();
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
  for (let i2 = parts.length - 1; i2 >= 0; i2--) {
    const part = parts[i2];
    if (part.match(/\?$/)) {
      const before = parts.slice(0, i2);
      const after = parts.slice(i2 + 1);
      potentialPaths.push([...before, ...after].join("."));
      potentialPaths.push([...before, ...after.filter((a) => !a.match(/\?$/))].join("."));
    }
  }
  potentialPaths = __unique(potentialPaths.map((s) => s.replace(/\?/gm, "")));
  for (let i2 = 0; i2 < potentialPaths.length; i2++) {
    const path3 = potentialPaths[i2];
    const result2 = __get(obj2, path3, settings);
    if (result2 !== void 0)
      return result2;
  }
}
function __get(obj2, path2, settings = {}) {
  settings = Object.assign({}, settings);
  let o = obj2, a;
  if (typeof path2 === "string") {
    if (obj2[path2] !== void 0)
      return obj2[path2];
    if (!path2 || path2 === "" || path2 === ".")
      return obj2;
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
    if (typeof o !== "object" || !(n in o)) {
      return;
    }
    o = o[n];
  }
  return o;
}
function __set(obj2, path2, value, settings = {}) {
  settings = Object.assign({}, settings);
  let o = obj2, a;
  if (typeof path2 === "string") {
    if (!path2 || path2 === "" || path2 === ".") {
      obj2 = value;
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
    o = o[n];
  }
  if (typeof a[0] === "string" && a[0].match(/^\[[0-9]+\]$/)) {
    if (!Array.isArray(o))
      o = [];
    o.push(value);
  } else {
    o[a[0]] = value;
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
  if (!ctx.constructor.name.match(/^SConfig/)) {
    if (!ctx.settings.metas.color)
      ctx.settings.metas.color = getColorFor(ctx.constructor.name, {
        scope: "class"
      });
  } else if (!ctx.settings.metas.color)
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
  for (let i2 = 0; i2 < cls.length; i2++) {
    if (!__isClass(cls[i2]))
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
  return props.sort().filter(function(e, i2, arr) {
    if (e != arr[i2 + 1] && typeof toCheck[e] == "function")
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
  const _get = (s, k) => {
    switch (__typeof(s).toLowerCase()) {
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
  const _set = (s, k, v2) => {
    switch (__typeof(s).toLowerCase()) {
      case "array":
        if (settings.newStack === true)
          s.push(v2);
        else
          s[k] = v2;
        break;
      case "object":
        s[k] = v2;
        break;
      case "number":
      case "integer":
      case "string":
        s.push(v2);
        break;
      case "map":
        s.set(k, v2);
        break;
      case "set":
        s.add(v2);
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
  var Buffer2 = moduleExports ? root.Buffer : void 0, Symbol2 = root.Symbol, Uint8Array2 = root.Uint8Array, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice;
  var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0, nativeKeys = overArg(Object.keys, Object);
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
  var Buffer2 = moduleExports ? root.Buffer : void 0, Symbol2 = root.Symbol, Uint8Array2 = root.Uint8Array, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice;
  var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0, nativeKeys = overArg(Object.keys, Object);
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
  for (let i2 = 0; i2 < objects.length; i2++) {
    const toMergeObj = objects[i2] || {};
    merge(referenceObj, toMergeObj);
  }
  return referenceObj;
}
function __deepProxy(object, handlerFn, settings = {}) {
  let isRevoked = false;
  settings = __deepMerge({
    deep: true,
    handleSet: true,
    handleGet: false,
    handleDelete: true
  }, settings);
  function makeHandler(path2) {
    return {
      set(target, key, value) {
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
      enumerable: true,
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
  for (var i2 = 0; i2 < boundLength; i2++) {
    boundArgs.push("$" + i2);
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
var toString$1 = {}.toString;
var isarray = Array.isArray || function(arr) {
  return toString$1.call(arr) == "[object Array]";
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
  $replace(string2, rePropName, function(match2, number, quote, subString) {
    result2[result2.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match2;
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
  for (var i2 = 1, isOwn = true; i2 < parts.length; i2 += 1) {
    var part = parts[i2];
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
      if ($gOPD && i2 + 1 >= parts.length) {
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
var has$1;
var $exec;
var isRegexMarker;
var badStringifier;
if (hasToStringTag$5) {
  has$1 = callBound$7("Object.prototype.hasOwnProperty");
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
  var hasLastIndexDataProperty = descriptor2 && has$1(descriptor2, "value");
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
        for (var i2 = 0; i2 < object.length; ++i2) {
          theKeys.push(String(i2));
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
  for (var i2 = 0; i2 < props.length; i2 += 1) {
    defineProperty$2(object, props[i2], map2[props[i2]], predicates[props[i2]]);
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
  for (var i2 = 0, len = array.length; i2 < len; i2++) {
    if (hasOwnProperty$1.call(array, i2)) {
      if (receiver == null) {
        iterator(array[i2], i2, array);
      } else {
        iterator.call(receiver, array[i2], i2, array);
      }
    }
  }
};
var forEachString = function forEachString2(string2, iterator, receiver) {
  for (var i2 = 0, len = string2.length; i2 < len; i2++) {
    if (receiver == null) {
      iterator(string2.charAt(i2), i2, string2);
    } else {
      iterator.call(receiver, string2.charAt(i2), i2, string2);
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
var forEach$2 = function forEach2(list, iterator, thisArg) {
  if (!isCallable(iterator)) {
    throw new TypeError("iterator must be a function");
  }
  var receiver;
  if (arguments.length >= 3) {
    receiver = thisArg;
  }
  if (toStr$1.call(list) === "[object Array]") {
    forEachArray(list, iterator, receiver);
  } else if (typeof list === "string") {
    forEachString(list, iterator, receiver);
  } else {
    forEachObject(list, iterator, receiver);
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
  for (var i2 = 0; i2 < possibleNames.length; i2++) {
    if (typeof g$1[possibleNames[i2]] === "function") {
      out[out.length] = possibleNames[i2];
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
    for (var i2 = 0; i2 < array.length; i2 += 1) {
      if (array[i2] === value) {
        return i2;
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
var define$7 = defineProperties_1;
var callBind$1 = callBind$3.exports;
var implementation$6 = implementation$8;
var getPolyfill$2 = polyfill$3;
var shim$7 = shim$8;
var bound$1 = callBind$1(implementation$6);
define$7(bound$1, {
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
var define$6 = defineProperties_1;
var getPolyfill$1 = polyfill$2;
var shim$6 = function shimGetPrototypeOf() {
  define$6(
    commonjsGlobal,
    { Reflect: {} },
    { Reflect: function() {
      return typeof Reflect !== "object" || !Reflect;
    } }
  );
  var polyfill2 = getPolyfill$1();
  define$6(
    Reflect,
    { getPrototypeOf: polyfill2 },
    { getPrototypeOf: function() {
      return Reflect.getPrototypeOf !== polyfill2;
    } }
  );
  return polyfill2;
};
var callBind = callBind$3.exports;
var define$5 = defineProperties_1;
var implementation$3 = implementation$5;
var getPolyfill = polyfill$2;
var shim$5 = shim$6;
var bound = callBind(getPolyfill(), typeof Reflect === "object" ? Reflect : Object);
define$5(bound, {
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
  for (var i2 = 0; i2 < xs.length; i2++) {
    var x = fn2(xs[i2], i2);
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
  var i2 = ai;
  if (ai >= 0 && bi > 0) {
    if (a === b) {
      return [ai, bi];
    }
    begs = [];
    left = str2.length;
    while (i2 >= 0 && !result2) {
      if (i2 == ai) {
        begs.push(i2);
        ai = str2.indexOf(a, i2 + 1);
      } else if (begs.length == 1) {
        result2 = [begs.pop(), bi];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }
        bi = str2.indexOf(b, i2 + 1);
      }
      i2 = ai < bi && ai >= 0 ? ai : bi;
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
function lte(i2, y) {
  return i2 <= y;
}
function gte(i2, y) {
  return i2 >= y;
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
    var pad = n.some(isPadded);
    N = [];
    for (var i2 = x; test2(i2, y); i2 += incr) {
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
minimatch.filter = filter;
function filter(pattern, options) {
  options = options || {};
  return function(p, i2, list) {
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
  m.match = function(list, pattern, options) {
    return orig.match(list, pattern, ext(def, options));
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
  for (var i2 = 0, len = pattern.length, c; i2 < len && (c = pattern.charAt(i2)); i2++) {
    this.debug("%s	%s %s %j", pattern, i2, re, c);
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
var object_hash = { exports: {} };
(function(module, exports) {
  !function(e) {
    module.exports = e();
  }(function() {
    return function o(i2, u, a) {
      function s(n, e2) {
        if (!u[n]) {
          if (!i2[n]) {
            var t = "function" == typeof commonjsRequire && commonjsRequire;
            if (!e2 && t)
              return t(n, true);
            if (f)
              return f(n, true);
            throw new Error("Cannot find module '" + n + "'");
          }
          var r = u[n] = { exports: {} };
          i2[n][0].call(r.exports, function(e3) {
            var t2 = i2[n][1][e3];
            return s(t2 || e3);
          }, r, r.exports, o, i2, u, a);
        }
        return u[n].exports;
      }
      for (var f = "function" == typeof commonjsRequire && commonjsRequire, e = 0; e < a.length; e++)
        s(a[e]);
      return s;
    }({ 1: [function(w, b, m) {
      (function(e, t, f, n, r, o, i2, u, a) {
        var s = w("crypto");
        function c(e2, t2) {
          return function(e3, t3) {
            var n2;
            n2 = "passthrough" !== t3.algorithm ? s.createHash(t3.algorithm) : new y();
            void 0 === n2.write && (n2.write = n2.update, n2.end = n2.update);
            g2(t3, n2).dispatch(e3), n2.update || n2.end("");
            if (n2.digest)
              return n2.digest("buffer" === t3.encoding ? void 0 : t3.encoding);
            var r2 = n2.read();
            return "buffer" !== t3.encoding ? r2.toString(t3.encoding) : r2;
          }(e2, t2 = h(e2, t2));
        }
        (m = b.exports = c).sha1 = function(e2) {
          return c(e2);
        }, m.keys = function(e2) {
          return c(e2, { excludeValues: true, algorithm: "sha1", encoding: "hex" });
        }, m.MD5 = function(e2) {
          return c(e2, { algorithm: "md5", encoding: "hex" });
        }, m.keysMD5 = function(e2) {
          return c(e2, { algorithm: "md5", encoding: "hex", excludeValues: true });
        };
        var l = s.getHashes ? s.getHashes().slice() : ["sha1", "md5"];
        l.push("passthrough");
        var d2 = ["buffer", "hex", "binary", "base64"];
        function h(e2, t2) {
          t2 = t2 || {};
          var n2 = {};
          if (n2.algorithm = t2.algorithm || "sha1", n2.encoding = t2.encoding || "hex", n2.excludeValues = !!t2.excludeValues, n2.algorithm = n2.algorithm.toLowerCase(), n2.encoding = n2.encoding.toLowerCase(), n2.ignoreUnknown = true === t2.ignoreUnknown, n2.respectType = false !== t2.respectType, n2.respectFunctionNames = false !== t2.respectFunctionNames, n2.respectFunctionProperties = false !== t2.respectFunctionProperties, n2.unorderedArrays = true === t2.unorderedArrays, n2.unorderedSets = false !== t2.unorderedSets, n2.unorderedObjects = false !== t2.unorderedObjects, n2.replacer = t2.replacer || void 0, n2.excludeKeys = t2.excludeKeys || void 0, void 0 === e2)
            throw new Error("Object argument required.");
          for (var r2 = 0; r2 < l.length; ++r2)
            l[r2].toLowerCase() === n2.algorithm.toLowerCase() && (n2.algorithm = l[r2]);
          if (-1 === l.indexOf(n2.algorithm))
            throw new Error('Algorithm "' + n2.algorithm + '"  not supported. supported values: ' + l.join(", "));
          if (-1 === d2.indexOf(n2.encoding) && "passthrough" !== n2.algorithm)
            throw new Error('Encoding "' + n2.encoding + '"  not supported. supported values: ' + d2.join(", "));
          return n2;
        }
        function p(e2) {
          if ("function" == typeof e2) {
            return null != /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(e2));
          }
        }
        function g2(u2, t2, a2) {
          a2 = a2 || [];
          function s2(e2) {
            return t2.update ? t2.update(e2, "utf8") : t2.write(e2, "utf8");
          }
          return { dispatch: function(e2) {
            return u2.replacer && (e2 = u2.replacer(e2)), this["_" + (null === e2 ? "null" : typeof e2)](e2);
          }, _object: function(t3) {
            var e2 = Object.prototype.toString.call(t3), n2 = /\[object (.*)\]/i.exec(e2);
            n2 = (n2 = n2 ? n2[1] : "unknown:[" + e2 + "]").toLowerCase();
            var r2;
            if (0 <= (r2 = a2.indexOf(t3)))
              return this.dispatch("[CIRCULAR:" + r2 + "]");
            if (a2.push(t3), void 0 !== f && f.isBuffer && f.isBuffer(t3))
              return s2("buffer:"), s2(t3);
            if ("object" === n2 || "function" === n2 || "asyncfunction" === n2) {
              var o2 = Object.keys(t3);
              u2.unorderedObjects && (o2 = o2.sort()), false === u2.respectType || p(t3) || o2.splice(0, 0, "prototype", "__proto__", "constructor"), u2.excludeKeys && (o2 = o2.filter(function(e3) {
                return !u2.excludeKeys(e3);
              })), s2("object:" + o2.length + ":");
              var i3 = this;
              return o2.forEach(function(e3) {
                i3.dispatch(e3), s2(":"), u2.excludeValues || i3.dispatch(t3[e3]), s2(",");
              });
            }
            if (!this["_" + n2]) {
              if (u2.ignoreUnknown)
                return s2("[" + n2 + "]");
              throw new Error('Unknown object type "' + n2 + '"');
            }
            this["_" + n2](t3);
          }, _array: function(e2, t3) {
            t3 = void 0 !== t3 ? t3 : false !== u2.unorderedArrays;
            var n2 = this;
            if (s2("array:" + e2.length + ":"), !t3 || e2.length <= 1)
              return e2.forEach(function(e3) {
                return n2.dispatch(e3);
              });
            var r2 = [], o2 = e2.map(function(e3) {
              var t4 = new y(), n3 = a2.slice();
              return g2(u2, t4, n3).dispatch(e3), r2 = r2.concat(n3.slice(a2.length)), t4.read().toString();
            });
            return a2 = a2.concat(r2), o2.sort(), this._array(o2, false);
          }, _date: function(e2) {
            return s2("date:" + e2.toJSON());
          }, _symbol: function(e2) {
            return s2("symbol:" + e2.toString());
          }, _error: function(e2) {
            return s2("error:" + e2.toString());
          }, _boolean: function(e2) {
            return s2("bool:" + e2.toString());
          }, _string: function(e2) {
            s2("string:" + e2.length + ":"), s2(e2.toString());
          }, _function: function(e2) {
            s2("fn:"), p(e2) ? this.dispatch("[native]") : this.dispatch(e2.toString()), false !== u2.respectFunctionNames && this.dispatch("function-name:" + String(e2.name)), u2.respectFunctionProperties && this._object(e2);
          }, _number: function(e2) {
            return s2("number:" + e2.toString());
          }, _xml: function(e2) {
            return s2("xml:" + e2.toString());
          }, _null: function() {
            return s2("Null");
          }, _undefined: function() {
            return s2("Undefined");
          }, _regexp: function(e2) {
            return s2("regex:" + e2.toString());
          }, _uint8array: function(e2) {
            return s2("uint8array:"), this.dispatch(Array.prototype.slice.call(e2));
          }, _uint8clampedarray: function(e2) {
            return s2("uint8clampedarray:"), this.dispatch(Array.prototype.slice.call(e2));
          }, _int8array: function(e2) {
            return s2("uint8array:"), this.dispatch(Array.prototype.slice.call(e2));
          }, _uint16array: function(e2) {
            return s2("uint16array:"), this.dispatch(Array.prototype.slice.call(e2));
          }, _int16array: function(e2) {
            return s2("uint16array:"), this.dispatch(Array.prototype.slice.call(e2));
          }, _uint32array: function(e2) {
            return s2("uint32array:"), this.dispatch(Array.prototype.slice.call(e2));
          }, _int32array: function(e2) {
            return s2("uint32array:"), this.dispatch(Array.prototype.slice.call(e2));
          }, _float32array: function(e2) {
            return s2("float32array:"), this.dispatch(Array.prototype.slice.call(e2));
          }, _float64array: function(e2) {
            return s2("float64array:"), this.dispatch(Array.prototype.slice.call(e2));
          }, _arraybuffer: function(e2) {
            return s2("arraybuffer:"), this.dispatch(new Uint8Array(e2));
          }, _url: function(e2) {
            return s2("url:" + e2.toString());
          }, _map: function(e2) {
            s2("map:");
            var t3 = Array.from(e2);
            return this._array(t3, false !== u2.unorderedSets);
          }, _set: function(e2) {
            s2("set:");
            var t3 = Array.from(e2);
            return this._array(t3, false !== u2.unorderedSets);
          }, _file: function(e2) {
            return s2("file:"), this.dispatch([e2.name, e2.size, e2.type, e2.lastModfied]);
          }, _blob: function() {
            if (u2.ignoreUnknown)
              return s2("[blob]");
            throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n');
          }, _domwindow: function() {
            return s2("domwindow");
          }, _bigint: function(e2) {
            return s2("bigint:" + e2.toString());
          }, _process: function() {
            return s2("process");
          }, _timer: function() {
            return s2("timer");
          }, _pipe: function() {
            return s2("pipe");
          }, _tcp: function() {
            return s2("tcp");
          }, _udp: function() {
            return s2("udp");
          }, _tty: function() {
            return s2("tty");
          }, _statwatcher: function() {
            return s2("statwatcher");
          }, _securecontext: function() {
            return s2("securecontext");
          }, _connection: function() {
            return s2("connection");
          }, _zlib: function() {
            return s2("zlib");
          }, _context: function() {
            return s2("context");
          }, _nodescript: function() {
            return s2("nodescript");
          }, _httpparser: function() {
            return s2("httpparser");
          }, _dataview: function() {
            return s2("dataview");
          }, _signal: function() {
            return s2("signal");
          }, _fsevent: function() {
            return s2("fsevent");
          }, _tlswrap: function() {
            return s2("tlswrap");
          } };
        }
        function y() {
          return { buf: "", write: function(e2) {
            this.buf += e2;
          }, end: function(e2) {
            this.buf += e2;
          }, read: function() {
            return this.buf;
          } };
        }
        m.writeToStream = function(e2, t2, n2) {
          return void 0 === n2 && (n2 = t2, t2 = {}), g2(t2 = h(e2, t2), n2).dispatch(e2);
        };
      }).call(this, w("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, w("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_7eac155c.js", "/");
    }, { buffer: 3, crypto: 5, lYpoI2: 10 }], 2: [function(e, t, f) {
      (function(e2, t2, n, r, o, i2, u, a, s) {
        !function(e3) {
          var f2 = "undefined" != typeof Uint8Array ? Uint8Array : Array, n2 = "+".charCodeAt(0), r2 = "/".charCodeAt(0), o2 = "0".charCodeAt(0), i3 = "a".charCodeAt(0), u2 = "A".charCodeAt(0), a2 = "-".charCodeAt(0), s2 = "_".charCodeAt(0);
          function c(e4) {
            var t3 = e4.charCodeAt(0);
            return t3 === n2 || t3 === a2 ? 62 : t3 === r2 || t3 === s2 ? 63 : t3 < o2 ? -1 : t3 < o2 + 10 ? t3 - o2 + 26 + 26 : t3 < u2 + 26 ? t3 - u2 : t3 < i3 + 26 ? t3 - i3 + 26 : void 0;
          }
          e3.toByteArray = function(e4) {
            var t3, n3;
            if (0 < e4.length % 4)
              throw new Error("Invalid string. Length must be a multiple of 4");
            var r3 = e4.length, o3 = "=" === e4.charAt(r3 - 2) ? 2 : "=" === e4.charAt(r3 - 1) ? 1 : 0, i4 = new f2(3 * e4.length / 4 - o3), u3 = 0 < o3 ? e4.length - 4 : e4.length, a3 = 0;
            function s3(e5) {
              i4[a3++] = e5;
            }
            for (t3 = 0; t3 < u3; t3 += 4, 0)
              s3((16711680 & (n3 = c(e4.charAt(t3)) << 18 | c(e4.charAt(t3 + 1)) << 12 | c(e4.charAt(t3 + 2)) << 6 | c(e4.charAt(t3 + 3)))) >> 16), s3((65280 & n3) >> 8), s3(255 & n3);
            return 2 == o3 ? s3(255 & (n3 = c(e4.charAt(t3)) << 2 | c(e4.charAt(t3 + 1)) >> 4)) : 1 == o3 && (s3((n3 = c(e4.charAt(t3)) << 10 | c(e4.charAt(t3 + 1)) << 4 | c(e4.charAt(t3 + 2)) >> 2) >> 8 & 255), s3(255 & n3)), i4;
          }, e3.fromByteArray = function(e4) {
            var t3, n3, r3, o3, i4 = e4.length % 3, u3 = "";
            function a3(e5) {
              return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e5);
            }
            for (t3 = 0, r3 = e4.length - i4; t3 < r3; t3 += 3)
              n3 = (e4[t3] << 16) + (e4[t3 + 1] << 8) + e4[t3 + 2], u3 += a3((o3 = n3) >> 18 & 63) + a3(o3 >> 12 & 63) + a3(o3 >> 6 & 63) + a3(63 & o3);
            switch (i4) {
              case 1:
                u3 += a3((n3 = e4[e4.length - 1]) >> 2), u3 += a3(n3 << 4 & 63), u3 += "==";
                break;
              case 2:
                u3 += a3((n3 = (e4[e4.length - 2] << 8) + e4[e4.length - 1]) >> 10), u3 += a3(n3 >> 4 & 63), u3 += a3(n3 << 2 & 63), u3 += "=";
            }
            return u3;
          };
        }(void 0 === f ? this.base64js = {} : f);
      }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js", "/node_modules/gulp-browserify/node_modules/base64-js/lib");
    }, { buffer: 3, lYpoI2: 10 }], 3: [function(O, e, H) {
      (function(e2, t, g2, n, r, o, i2, u, a) {
        var s = O("base64-js"), f = O("ieee754");
        function g2(e3, t2, n2) {
          if (!(this instanceof g2))
            return new g2(e3, t2, n2);
          var r2, o2, i3, u2, a2, s2 = typeof e3;
          if ("base64" === t2 && "string" == s2)
            for (e3 = (r2 = e3).trim ? r2.trim() : r2.replace(/^\s+|\s+$/g, ""); e3.length % 4 != 0; )
              e3 += "=";
          if ("number" == s2)
            o2 = x(e3);
          else if ("string" == s2)
            o2 = g2.byteLength(e3, t2);
          else {
            if ("object" != s2)
              throw new Error("First argument needs to be a number, array or string.");
            o2 = x(e3.length);
          }
          if (g2._useTypedArrays ? i3 = g2._augment(new Uint8Array(o2)) : ((i3 = this).length = o2, i3._isBuffer = true), g2._useTypedArrays && "number" == typeof e3.byteLength)
            i3._set(e3);
          else if (S(a2 = e3) || g2.isBuffer(a2) || a2 && "object" == typeof a2 && "number" == typeof a2.length)
            for (u2 = 0; u2 < o2; u2++)
              g2.isBuffer(e3) ? i3[u2] = e3.readUInt8(u2) : i3[u2] = e3[u2];
          else if ("string" == s2)
            i3.write(e3, 0, t2);
          else if ("number" == s2 && !g2._useTypedArrays && !n2)
            for (u2 = 0; u2 < o2; u2++)
              i3[u2] = 0;
          return i3;
        }
        function y(e3, t2, n2, r2) {
          return g2._charsWritten = T(function(e4) {
            for (var t3 = [], n3 = 0; n3 < e4.length; n3++)
              t3.push(255 & e4.charCodeAt(n3));
            return t3;
          }(t2), e3, n2, r2);
        }
        function w(e3, t2, n2, r2) {
          return g2._charsWritten = T(function(e4) {
            for (var t3, n3, r3, o2 = [], i3 = 0; i3 < e4.length; i3++)
              t3 = e4.charCodeAt(i3), n3 = t3 >> 8, r3 = t3 % 256, o2.push(r3), o2.push(n3);
            return o2;
          }(t2), e3, n2, r2);
        }
        function c(e3, t2, n2) {
          var r2 = "";
          n2 = Math.min(e3.length, n2);
          for (var o2 = t2; o2 < n2; o2++)
            r2 += String.fromCharCode(e3[o2]);
          return r2;
        }
        function l(e3, t2, n2, r2) {
          r2 || (D("boolean" == typeof n2, "missing or invalid endian"), D(null != t2, "missing offset"), D(t2 + 1 < e3.length, "Trying to read beyond buffer length"));
          var o2, i3 = e3.length;
          if (!(i3 <= t2))
            return n2 ? (o2 = e3[t2], t2 + 1 < i3 && (o2 |= e3[t2 + 1] << 8)) : (o2 = e3[t2] << 8, t2 + 1 < i3 && (o2 |= e3[t2 + 1])), o2;
        }
        function d2(e3, t2, n2, r2) {
          r2 || (D("boolean" == typeof n2, "missing or invalid endian"), D(null != t2, "missing offset"), D(t2 + 3 < e3.length, "Trying to read beyond buffer length"));
          var o2, i3 = e3.length;
          if (!(i3 <= t2))
            return n2 ? (t2 + 2 < i3 && (o2 = e3[t2 + 2] << 16), t2 + 1 < i3 && (o2 |= e3[t2 + 1] << 8), o2 |= e3[t2], t2 + 3 < i3 && (o2 += e3[t2 + 3] << 24 >>> 0)) : (t2 + 1 < i3 && (o2 = e3[t2 + 1] << 16), t2 + 2 < i3 && (o2 |= e3[t2 + 2] << 8), t2 + 3 < i3 && (o2 |= e3[t2 + 3]), o2 += e3[t2] << 24 >>> 0), o2;
        }
        function h(e3, t2, n2, r2) {
          if (r2 || (D("boolean" == typeof n2, "missing or invalid endian"), D(null != t2, "missing offset"), D(t2 + 1 < e3.length, "Trying to read beyond buffer length")), !(e3.length <= t2)) {
            var o2 = l(e3, t2, n2, true);
            return 32768 & o2 ? -1 * (65535 - o2 + 1) : o2;
          }
        }
        function p(e3, t2, n2, r2) {
          if (r2 || (D("boolean" == typeof n2, "missing or invalid endian"), D(null != t2, "missing offset"), D(t2 + 3 < e3.length, "Trying to read beyond buffer length")), !(e3.length <= t2)) {
            var o2 = d2(e3, t2, n2, true);
            return 2147483648 & o2 ? -1 * (4294967295 - o2 + 1) : o2;
          }
        }
        function b(e3, t2, n2, r2) {
          return r2 || (D("boolean" == typeof n2, "missing or invalid endian"), D(t2 + 3 < e3.length, "Trying to read beyond buffer length")), f.read(e3, t2, n2, 23, 4);
        }
        function m(e3, t2, n2, r2) {
          return r2 || (D("boolean" == typeof n2, "missing or invalid endian"), D(t2 + 7 < e3.length, "Trying to read beyond buffer length")), f.read(e3, t2, n2, 52, 8);
        }
        function v2(e3, t2, n2, r2, o2) {
          o2 || (D(null != t2, "missing value"), D("boolean" == typeof r2, "missing or invalid endian"), D(null != n2, "missing offset"), D(n2 + 1 < e3.length, "trying to write beyond buffer length"), N(t2, 65535));
          var i3 = e3.length;
          if (!(i3 <= n2))
            for (var u2 = 0, a2 = Math.min(i3 - n2, 2); u2 < a2; u2++)
              e3[n2 + u2] = (t2 & 255 << 8 * (r2 ? u2 : 1 - u2)) >>> 8 * (r2 ? u2 : 1 - u2);
        }
        function _(e3, t2, n2, r2, o2) {
          o2 || (D(null != t2, "missing value"), D("boolean" == typeof r2, "missing or invalid endian"), D(null != n2, "missing offset"), D(n2 + 3 < e3.length, "trying to write beyond buffer length"), N(t2, 4294967295));
          var i3 = e3.length;
          if (!(i3 <= n2))
            for (var u2 = 0, a2 = Math.min(i3 - n2, 4); u2 < a2; u2++)
              e3[n2 + u2] = t2 >>> 8 * (r2 ? u2 : 3 - u2) & 255;
        }
        function E(e3, t2, n2, r2, o2) {
          o2 || (D(null != t2, "missing value"), D("boolean" == typeof r2, "missing or invalid endian"), D(null != n2, "missing offset"), D(n2 + 1 < e3.length, "Trying to write beyond buffer length"), Y(t2, 32767, -32768)), e3.length <= n2 || v2(e3, 0 <= t2 ? t2 : 65535 + t2 + 1, n2, r2, o2);
        }
        function I(e3, t2, n2, r2, o2) {
          o2 || (D(null != t2, "missing value"), D("boolean" == typeof r2, "missing or invalid endian"), D(null != n2, "missing offset"), D(n2 + 3 < e3.length, "Trying to write beyond buffer length"), Y(t2, 2147483647, -2147483648)), e3.length <= n2 || _(e3, 0 <= t2 ? t2 : 4294967295 + t2 + 1, n2, r2, o2);
        }
        function A(e3, t2, n2, r2, o2) {
          o2 || (D(null != t2, "missing value"), D("boolean" == typeof r2, "missing or invalid endian"), D(null != n2, "missing offset"), D(n2 + 3 < e3.length, "Trying to write beyond buffer length"), F(t2, 34028234663852886e22, -34028234663852886e22)), e3.length <= n2 || f.write(e3, t2, n2, r2, 23, 4);
        }
        function B(e3, t2, n2, r2, o2) {
          o2 || (D(null != t2, "missing value"), D("boolean" == typeof r2, "missing or invalid endian"), D(null != n2, "missing offset"), D(n2 + 7 < e3.length, "Trying to write beyond buffer length"), F(t2, 17976931348623157e292, -17976931348623157e292)), e3.length <= n2 || f.write(e3, t2, n2, r2, 52, 8);
        }
        H.Buffer = g2, H.SlowBuffer = g2, H.INSPECT_MAX_BYTES = 50, g2.poolSize = 8192, g2._useTypedArrays = function() {
          try {
            var e3 = new ArrayBuffer(0), t2 = new Uint8Array(e3);
            return t2.foo = function() {
              return 42;
            }, 42 === t2.foo() && "function" == typeof t2.subarray;
          } catch (e4) {
            return false;
          }
        }(), g2.isEncoding = function(e3) {
          switch (String(e3).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "raw":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return true;
            default:
              return false;
          }
        }, g2.isBuffer = function(e3) {
          return !(null == e3 || !e3._isBuffer);
        }, g2.byteLength = function(e3, t2) {
          var n2;
          switch (e3 += "", t2 || "utf8") {
            case "hex":
              n2 = e3.length / 2;
              break;
            case "utf8":
            case "utf-8":
              n2 = C(e3).length;
              break;
            case "ascii":
            case "binary":
            case "raw":
              n2 = e3.length;
              break;
            case "base64":
              n2 = k(e3).length;
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              n2 = 2 * e3.length;
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return n2;
        }, g2.concat = function(e3, t2) {
          if (D(S(e3), "Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."), 0 === e3.length)
            return new g2(0);
          if (1 === e3.length)
            return e3[0];
          if ("number" != typeof t2)
            for (o2 = t2 = 0; o2 < e3.length; o2++)
              t2 += e3[o2].length;
          for (var n2 = new g2(t2), r2 = 0, o2 = 0; o2 < e3.length; o2++) {
            var i3 = e3[o2];
            i3.copy(n2, r2), r2 += i3.length;
          }
          return n2;
        }, g2.prototype.write = function(e3, t2, n2, r2) {
          var o2;
          isFinite(t2) ? isFinite(n2) || (r2 = n2, n2 = void 0) : (o2 = r2, r2 = t2, t2 = n2, n2 = o2), t2 = Number(t2) || 0;
          var i3, u2, a2, s2, f2, c2, l2, d3, h2, p2 = this.length - t2;
          switch ((!n2 || p2 < (n2 = Number(n2))) && (n2 = p2), r2 = String(r2 || "utf8").toLowerCase()) {
            case "hex":
              i3 = function(e4, t3, n3, r3) {
                n3 = Number(n3) || 0;
                var o3 = e4.length - n3;
                (!r3 || o3 < (r3 = Number(r3))) && (r3 = o3);
                var i4 = t3.length;
                D(i4 % 2 == 0, "Invalid hex string"), i4 / 2 < r3 && (r3 = i4 / 2);
                for (var u3 = 0; u3 < r3; u3++) {
                  var a3 = parseInt(t3.substr(2 * u3, 2), 16);
                  D(!isNaN(a3), "Invalid hex string"), e4[n3 + u3] = a3;
                }
                return g2._charsWritten = 2 * u3, u3;
              }(this, e3, t2, n2);
              break;
            case "utf8":
            case "utf-8":
              c2 = this, l2 = e3, d3 = t2, h2 = n2, i3 = g2._charsWritten = T(C(l2), c2, d3, h2);
              break;
            case "ascii":
            case "binary":
              i3 = y(this, e3, t2, n2);
              break;
            case "base64":
              u2 = this, a2 = e3, s2 = t2, f2 = n2, i3 = g2._charsWritten = T(k(a2), u2, s2, f2);
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              i3 = w(this, e3, t2, n2);
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return i3;
        }, g2.prototype.toString = function(e3, t2, n2) {
          var r2, o2, i3, u2, a2 = this;
          if (e3 = String(e3 || "utf8").toLowerCase(), t2 = Number(t2) || 0, (n2 = void 0 !== n2 ? Number(n2) : n2 = a2.length) === t2)
            return "";
          switch (e3) {
            case "hex":
              r2 = function(e4, t3, n3) {
                var r3 = e4.length;
                (!t3 || t3 < 0) && (t3 = 0);
                (!n3 || n3 < 0 || r3 < n3) && (n3 = r3);
                for (var o3 = "", i4 = t3; i4 < n3; i4++)
                  o3 += j(e4[i4]);
                return o3;
              }(a2, t2, n2);
              break;
            case "utf8":
            case "utf-8":
              r2 = function(e4, t3, n3) {
                var r3 = "", o3 = "";
                n3 = Math.min(e4.length, n3);
                for (var i4 = t3; i4 < n3; i4++)
                  e4[i4] <= 127 ? (r3 += M(o3) + String.fromCharCode(e4[i4]), o3 = "") : o3 += "%" + e4[i4].toString(16);
                return r3 + M(o3);
              }(a2, t2, n2);
              break;
            case "ascii":
            case "binary":
              r2 = c(a2, t2, n2);
              break;
            case "base64":
              o2 = a2, u2 = n2, r2 = 0 === (i3 = t2) && u2 === o2.length ? s.fromByteArray(o2) : s.fromByteArray(o2.slice(i3, u2));
              break;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              r2 = function(e4, t3, n3) {
                for (var r3 = e4.slice(t3, n3), o3 = "", i4 = 0; i4 < r3.length; i4 += 2)
                  o3 += String.fromCharCode(r3[i4] + 256 * r3[i4 + 1]);
                return o3;
              }(a2, t2, n2);
              break;
            default:
              throw new Error("Unknown encoding");
          }
          return r2;
        }, g2.prototype.toJSON = function() {
          return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
        }, g2.prototype.copy = function(e3, t2, n2, r2) {
          if (n2 = n2 || 0, r2 || 0 === r2 || (r2 = this.length), t2 = t2 || 0, r2 !== n2 && 0 !== e3.length && 0 !== this.length) {
            D(n2 <= r2, "sourceEnd < sourceStart"), D(0 <= t2 && t2 < e3.length, "targetStart out of bounds"), D(0 <= n2 && n2 < this.length, "sourceStart out of bounds"), D(0 <= r2 && r2 <= this.length, "sourceEnd out of bounds"), r2 > this.length && (r2 = this.length), e3.length - t2 < r2 - n2 && (r2 = e3.length - t2 + n2);
            var o2 = r2 - n2;
            if (o2 < 100 || !g2._useTypedArrays)
              for (var i3 = 0; i3 < o2; i3++)
                e3[i3 + t2] = this[i3 + n2];
            else
              e3._set(this.subarray(n2, n2 + o2), t2);
          }
        }, g2.prototype.slice = function(e3, t2) {
          var n2 = this.length;
          if (e3 = U(e3, n2, 0), t2 = U(t2, n2, n2), g2._useTypedArrays)
            return g2._augment(this.subarray(e3, t2));
          for (var r2 = t2 - e3, o2 = new g2(r2, void 0, true), i3 = 0; i3 < r2; i3++)
            o2[i3] = this[i3 + e3];
          return o2;
        }, g2.prototype.get = function(e3) {
          return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(e3);
        }, g2.prototype.set = function(e3, t2) {
          return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(e3, t2);
        }, g2.prototype.readUInt8 = function(e3, t2) {
          if (t2 || (D(null != e3, "missing offset"), D(e3 < this.length, "Trying to read beyond buffer length")), !(e3 >= this.length))
            return this[e3];
        }, g2.prototype.readUInt16LE = function(e3, t2) {
          return l(this, e3, true, t2);
        }, g2.prototype.readUInt16BE = function(e3, t2) {
          return l(this, e3, false, t2);
        }, g2.prototype.readUInt32LE = function(e3, t2) {
          return d2(this, e3, true, t2);
        }, g2.prototype.readUInt32BE = function(e3, t2) {
          return d2(this, e3, false, t2);
        }, g2.prototype.readInt8 = function(e3, t2) {
          if (t2 || (D(null != e3, "missing offset"), D(e3 < this.length, "Trying to read beyond buffer length")), !(e3 >= this.length))
            return 128 & this[e3] ? -1 * (255 - this[e3] + 1) : this[e3];
        }, g2.prototype.readInt16LE = function(e3, t2) {
          return h(this, e3, true, t2);
        }, g2.prototype.readInt16BE = function(e3, t2) {
          return h(this, e3, false, t2);
        }, g2.prototype.readInt32LE = function(e3, t2) {
          return p(this, e3, true, t2);
        }, g2.prototype.readInt32BE = function(e3, t2) {
          return p(this, e3, false, t2);
        }, g2.prototype.readFloatLE = function(e3, t2) {
          return b(this, e3, true, t2);
        }, g2.prototype.readFloatBE = function(e3, t2) {
          return b(this, e3, false, t2);
        }, g2.prototype.readDoubleLE = function(e3, t2) {
          return m(this, e3, true, t2);
        }, g2.prototype.readDoubleBE = function(e3, t2) {
          return m(this, e3, false, t2);
        }, g2.prototype.writeUInt8 = function(e3, t2, n2) {
          n2 || (D(null != e3, "missing value"), D(null != t2, "missing offset"), D(t2 < this.length, "trying to write beyond buffer length"), N(e3, 255)), t2 >= this.length || (this[t2] = e3);
        }, g2.prototype.writeUInt16LE = function(e3, t2, n2) {
          v2(this, e3, t2, true, n2);
        }, g2.prototype.writeUInt16BE = function(e3, t2, n2) {
          v2(this, e3, t2, false, n2);
        }, g2.prototype.writeUInt32LE = function(e3, t2, n2) {
          _(this, e3, t2, true, n2);
        }, g2.prototype.writeUInt32BE = function(e3, t2, n2) {
          _(this, e3, t2, false, n2);
        }, g2.prototype.writeInt8 = function(e3, t2, n2) {
          n2 || (D(null != e3, "missing value"), D(null != t2, "missing offset"), D(t2 < this.length, "Trying to write beyond buffer length"), Y(e3, 127, -128)), t2 >= this.length || (0 <= e3 ? this.writeUInt8(e3, t2, n2) : this.writeUInt8(255 + e3 + 1, t2, n2));
        }, g2.prototype.writeInt16LE = function(e3, t2, n2) {
          E(this, e3, t2, true, n2);
        }, g2.prototype.writeInt16BE = function(e3, t2, n2) {
          E(this, e3, t2, false, n2);
        }, g2.prototype.writeInt32LE = function(e3, t2, n2) {
          I(this, e3, t2, true, n2);
        }, g2.prototype.writeInt32BE = function(e3, t2, n2) {
          I(this, e3, t2, false, n2);
        }, g2.prototype.writeFloatLE = function(e3, t2, n2) {
          A(this, e3, t2, true, n2);
        }, g2.prototype.writeFloatBE = function(e3, t2, n2) {
          A(this, e3, t2, false, n2);
        }, g2.prototype.writeDoubleLE = function(e3, t2, n2) {
          B(this, e3, t2, true, n2);
        }, g2.prototype.writeDoubleBE = function(e3, t2, n2) {
          B(this, e3, t2, false, n2);
        }, g2.prototype.fill = function(e3, t2, n2) {
          if (e3 = e3 || 0, t2 = t2 || 0, n2 = n2 || this.length, "string" == typeof e3 && (e3 = e3.charCodeAt(0)), D("number" == typeof e3 && !isNaN(e3), "value is not a number"), D(t2 <= n2, "end < start"), n2 !== t2 && 0 !== this.length) {
            D(0 <= t2 && t2 < this.length, "start out of bounds"), D(0 <= n2 && n2 <= this.length, "end out of bounds");
            for (var r2 = t2; r2 < n2; r2++)
              this[r2] = e3;
          }
        }, g2.prototype.inspect = function() {
          for (var e3 = [], t2 = this.length, n2 = 0; n2 < t2; n2++)
            if (e3[n2] = j(this[n2]), n2 === H.INSPECT_MAX_BYTES) {
              e3[n2 + 1] = "...";
              break;
            }
          return "<Buffer " + e3.join(" ") + ">";
        }, g2.prototype.toArrayBuffer = function() {
          if ("undefined" == typeof Uint8Array)
            throw new Error("Buffer.toArrayBuffer not supported in this browser");
          if (g2._useTypedArrays)
            return new g2(this).buffer;
          for (var e3 = new Uint8Array(this.length), t2 = 0, n2 = e3.length; t2 < n2; t2 += 1)
            e3[t2] = this[t2];
          return e3.buffer;
        };
        var L = g2.prototype;
        function U(e3, t2, n2) {
          return "number" != typeof e3 ? n2 : t2 <= (e3 = ~~e3) ? t2 : 0 <= e3 || 0 <= (e3 += t2) ? e3 : 0;
        }
        function x(e3) {
          return (e3 = ~~Math.ceil(+e3)) < 0 ? 0 : e3;
        }
        function S(e3) {
          return (Array.isArray || function(e4) {
            return "[object Array]" === Object.prototype.toString.call(e4);
          })(e3);
        }
        function j(e3) {
          return e3 < 16 ? "0" + e3.toString(16) : e3.toString(16);
        }
        function C(e3) {
          for (var t2 = [], n2 = 0; n2 < e3.length; n2++) {
            var r2 = e3.charCodeAt(n2);
            if (r2 <= 127)
              t2.push(e3.charCodeAt(n2));
            else {
              var o2 = n2;
              55296 <= r2 && r2 <= 57343 && n2++;
              for (var i3 = encodeURIComponent(e3.slice(o2, n2 + 1)).substr(1).split("%"), u2 = 0; u2 < i3.length; u2++)
                t2.push(parseInt(i3[u2], 16));
            }
          }
          return t2;
        }
        function k(e3) {
          return s.toByteArray(e3);
        }
        function T(e3, t2, n2, r2) {
          for (var o2 = 0; o2 < r2 && !(o2 + n2 >= t2.length || o2 >= e3.length); o2++)
            t2[o2 + n2] = e3[o2];
          return o2;
        }
        function M(e3) {
          try {
            return decodeURIComponent(e3);
          } catch (e4) {
            return String.fromCharCode(65533);
          }
        }
        function N(e3, t2) {
          D("number" == typeof e3, "cannot write a non-number as a number"), D(0 <= e3, "specified a negative value for writing an unsigned value"), D(e3 <= t2, "value is larger than maximum value for type"), D(Math.floor(e3) === e3, "value has a fractional component");
        }
        function Y(e3, t2, n2) {
          D("number" == typeof e3, "cannot write a non-number as a number"), D(e3 <= t2, "value larger than maximum allowed value"), D(n2 <= e3, "value smaller than minimum allowed value"), D(Math.floor(e3) === e3, "value has a fractional component");
        }
        function F(e3, t2, n2) {
          D("number" == typeof e3, "cannot write a non-number as a number"), D(e3 <= t2, "value larger than maximum allowed value"), D(n2 <= e3, "value smaller than minimum allowed value");
        }
        function D(e3, t2) {
          if (!e3)
            throw new Error(t2 || "Failed assertion");
        }
        g2._augment = function(e3) {
          return e3._isBuffer = true, e3._get = e3.get, e3._set = e3.set, e3.get = L.get, e3.set = L.set, e3.write = L.write, e3.toString = L.toString, e3.toLocaleString = L.toString, e3.toJSON = L.toJSON, e3.copy = L.copy, e3.slice = L.slice, e3.readUInt8 = L.readUInt8, e3.readUInt16LE = L.readUInt16LE, e3.readUInt16BE = L.readUInt16BE, e3.readUInt32LE = L.readUInt32LE, e3.readUInt32BE = L.readUInt32BE, e3.readInt8 = L.readInt8, e3.readInt16LE = L.readInt16LE, e3.readInt16BE = L.readInt16BE, e3.readInt32LE = L.readInt32LE, e3.readInt32BE = L.readInt32BE, e3.readFloatLE = L.readFloatLE, e3.readFloatBE = L.readFloatBE, e3.readDoubleLE = L.readDoubleLE, e3.readDoubleBE = L.readDoubleBE, e3.writeUInt8 = L.writeUInt8, e3.writeUInt16LE = L.writeUInt16LE, e3.writeUInt16BE = L.writeUInt16BE, e3.writeUInt32LE = L.writeUInt32LE, e3.writeUInt32BE = L.writeUInt32BE, e3.writeInt8 = L.writeInt8, e3.writeInt16LE = L.writeInt16LE, e3.writeInt16BE = L.writeInt16BE, e3.writeInt32LE = L.writeInt32LE, e3.writeInt32BE = L.writeInt32BE, e3.writeFloatLE = L.writeFloatLE, e3.writeFloatBE = L.writeFloatBE, e3.writeDoubleLE = L.writeDoubleLE, e3.writeDoubleBE = L.writeDoubleBE, e3.fill = L.fill, e3.inspect = L.inspect, e3.toArrayBuffer = L.toArrayBuffer, e3;
        };
      }).call(this, O("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, O("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/buffer/index.js", "/node_modules/gulp-browserify/node_modules/buffer");
    }, { "base64-js": 2, buffer: 3, ieee754: 11, lYpoI2: 10 }], 4: [function(l, d2, e) {
      (function(e2, t, u, n, r, o, i2, a, s) {
        var u = l("buffer").Buffer, f = 4, c = new u(f);
        c.fill(0);
        d2.exports = { hash: function(e3, t2, n2, r2) {
          return u.isBuffer(e3) || (e3 = new u(e3)), function(e4, t3, n3) {
            for (var r3 = new u(t3), o2 = n3 ? r3.writeInt32BE : r3.writeInt32LE, i3 = 0; i3 < e4.length; i3++)
              o2.call(r3, e4[i3], 4 * i3, true);
            return r3;
          }(t2(function(e4, t3) {
            var n3;
            e4.length % f != 0 && (n3 = e4.length + (f - e4.length % f), e4 = u.concat([e4, c], n3));
            for (var r3 = [], o2 = t3 ? e4.readInt32BE : e4.readInt32LE, i3 = 0; i3 < e4.length; i3 += f)
              r3.push(o2.call(e4, i3));
            return r3;
          }(e3, r2), 8 * e3.length), n2, r2);
        } };
      }).call(this, l("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, l("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { buffer: 3, lYpoI2: 10 }], 5: [function(w, e, b) {
      (function(e2, t, a, n, r, o, i2, u, s) {
        var a = w("buffer").Buffer, f = w("./sha"), c = w("./sha256"), l = w("./rng"), d2 = { sha1: f, sha256: c, md5: w("./md5") }, h = 64, p = new a(h);
        function g2(e3, r2) {
          var o2 = d2[e3 = e3 || "sha1"], i3 = [];
          return o2 || y("algorithm:", e3, "is not yet supported"), { update: function(e4) {
            return a.isBuffer(e4) || (e4 = new a(e4)), i3.push(e4), e4.length, this;
          }, digest: function(e4) {
            var t2 = a.concat(i3), n2 = r2 ? function(e5, t3, n3) {
              a.isBuffer(t3) || (t3 = new a(t3)), a.isBuffer(n3) || (n3 = new a(n3)), t3.length > h ? t3 = e5(t3) : t3.length < h && (t3 = a.concat([t3, p], h));
              for (var r3 = new a(h), o3 = new a(h), i4 = 0; i4 < h; i4++)
                r3[i4] = 54 ^ t3[i4], o3[i4] = 92 ^ t3[i4];
              var u2 = e5(a.concat([r3, n3]));
              return e5(a.concat([o3, u2]));
            }(o2, r2, t2) : o2(t2);
            return i3 = null, e4 ? n2.toString(e4) : n2;
          } };
        }
        function y() {
          var e3 = [].slice.call(arguments).join(" ");
          throw new Error([e3, "we accept pull requests", "http://github.com/dominictarr/crypto-browserify"].join("\n"));
        }
        p.fill(0), b.createHash = function(e3) {
          return g2(e3);
        }, b.createHmac = g2, b.randomBytes = function(e3, t2) {
          if (!t2 || !t2.call)
            return new a(l(e3));
          try {
            t2.call(this, void 0, new a(l(e3)));
          } catch (e4) {
            t2(e4);
          }
        }, function(e3, t2) {
          for (var n2 in e3)
            t2(e3[n2], n2);
        }(["createCredentials", "createCipher", "createCipheriv", "createDecipher", "createDecipheriv", "createSign", "createVerify", "createDiffieHellman", "pbkdf2"], function(e3) {
          b[e3] = function() {
            y("sorry,", e3, "is not implemented yet");
          };
        });
      }).call(this, w("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, w("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./md5": 6, "./rng": 7, "./sha": 8, "./sha256": 9, buffer: 3, lYpoI2: 10 }], 6: [function(w, b, e) {
      (function(e2, t, n, r, o, i2, u, a, s) {
        var f = w("./helpers");
        function c(e3, t2) {
          e3[t2 >> 5] |= 128 << t2 % 32, e3[14 + (t2 + 64 >>> 9 << 4)] = t2;
          for (var n2 = 1732584193, r2 = -271733879, o2 = -1732584194, i3 = 271733878, u2 = 0; u2 < e3.length; u2 += 16) {
            var a2 = n2, s2 = r2, f2 = o2, c2 = i3, n2 = d2(n2, r2, o2, i3, e3[u2 + 0], 7, -680876936), i3 = d2(i3, n2, r2, o2, e3[u2 + 1], 12, -389564586), o2 = d2(o2, i3, n2, r2, e3[u2 + 2], 17, 606105819), r2 = d2(r2, o2, i3, n2, e3[u2 + 3], 22, -1044525330);
            n2 = d2(n2, r2, o2, i3, e3[u2 + 4], 7, -176418897), i3 = d2(i3, n2, r2, o2, e3[u2 + 5], 12, 1200080426), o2 = d2(o2, i3, n2, r2, e3[u2 + 6], 17, -1473231341), r2 = d2(r2, o2, i3, n2, e3[u2 + 7], 22, -45705983), n2 = d2(n2, r2, o2, i3, e3[u2 + 8], 7, 1770035416), i3 = d2(i3, n2, r2, o2, e3[u2 + 9], 12, -1958414417), o2 = d2(o2, i3, n2, r2, e3[u2 + 10], 17, -42063), r2 = d2(r2, o2, i3, n2, e3[u2 + 11], 22, -1990404162), n2 = d2(n2, r2, o2, i3, e3[u2 + 12], 7, 1804603682), i3 = d2(i3, n2, r2, o2, e3[u2 + 13], 12, -40341101), o2 = d2(o2, i3, n2, r2, e3[u2 + 14], 17, -1502002290), n2 = h(n2, r2 = d2(r2, o2, i3, n2, e3[u2 + 15], 22, 1236535329), o2, i3, e3[u2 + 1], 5, -165796510), i3 = h(i3, n2, r2, o2, e3[u2 + 6], 9, -1069501632), o2 = h(o2, i3, n2, r2, e3[u2 + 11], 14, 643717713), r2 = h(r2, o2, i3, n2, e3[u2 + 0], 20, -373897302), n2 = h(n2, r2, o2, i3, e3[u2 + 5], 5, -701558691), i3 = h(i3, n2, r2, o2, e3[u2 + 10], 9, 38016083), o2 = h(o2, i3, n2, r2, e3[u2 + 15], 14, -660478335), r2 = h(r2, o2, i3, n2, e3[u2 + 4], 20, -405537848), n2 = h(n2, r2, o2, i3, e3[u2 + 9], 5, 568446438), i3 = h(i3, n2, r2, o2, e3[u2 + 14], 9, -1019803690), o2 = h(o2, i3, n2, r2, e3[u2 + 3], 14, -187363961), r2 = h(r2, o2, i3, n2, e3[u2 + 8], 20, 1163531501), n2 = h(n2, r2, o2, i3, e3[u2 + 13], 5, -1444681467), i3 = h(i3, n2, r2, o2, e3[u2 + 2], 9, -51403784), o2 = h(o2, i3, n2, r2, e3[u2 + 7], 14, 1735328473), n2 = p(n2, r2 = h(r2, o2, i3, n2, e3[u2 + 12], 20, -1926607734), o2, i3, e3[u2 + 5], 4, -378558), i3 = p(i3, n2, r2, o2, e3[u2 + 8], 11, -2022574463), o2 = p(o2, i3, n2, r2, e3[u2 + 11], 16, 1839030562), r2 = p(r2, o2, i3, n2, e3[u2 + 14], 23, -35309556), n2 = p(n2, r2, o2, i3, e3[u2 + 1], 4, -1530992060), i3 = p(i3, n2, r2, o2, e3[u2 + 4], 11, 1272893353), o2 = p(o2, i3, n2, r2, e3[u2 + 7], 16, -155497632), r2 = p(r2, o2, i3, n2, e3[u2 + 10], 23, -1094730640), n2 = p(n2, r2, o2, i3, e3[u2 + 13], 4, 681279174), i3 = p(i3, n2, r2, o2, e3[u2 + 0], 11, -358537222), o2 = p(o2, i3, n2, r2, e3[u2 + 3], 16, -722521979), r2 = p(r2, o2, i3, n2, e3[u2 + 6], 23, 76029189), n2 = p(n2, r2, o2, i3, e3[u2 + 9], 4, -640364487), i3 = p(i3, n2, r2, o2, e3[u2 + 12], 11, -421815835), o2 = p(o2, i3, n2, r2, e3[u2 + 15], 16, 530742520), n2 = g2(n2, r2 = p(r2, o2, i3, n2, e3[u2 + 2], 23, -995338651), o2, i3, e3[u2 + 0], 6, -198630844), i3 = g2(i3, n2, r2, o2, e3[u2 + 7], 10, 1126891415), o2 = g2(o2, i3, n2, r2, e3[u2 + 14], 15, -1416354905), r2 = g2(r2, o2, i3, n2, e3[u2 + 5], 21, -57434055), n2 = g2(n2, r2, o2, i3, e3[u2 + 12], 6, 1700485571), i3 = g2(i3, n2, r2, o2, e3[u2 + 3], 10, -1894986606), o2 = g2(o2, i3, n2, r2, e3[u2 + 10], 15, -1051523), r2 = g2(r2, o2, i3, n2, e3[u2 + 1], 21, -2054922799), n2 = g2(n2, r2, o2, i3, e3[u2 + 8], 6, 1873313359), i3 = g2(i3, n2, r2, o2, e3[u2 + 15], 10, -30611744), o2 = g2(o2, i3, n2, r2, e3[u2 + 6], 15, -1560198380), r2 = g2(r2, o2, i3, n2, e3[u2 + 13], 21, 1309151649), n2 = g2(n2, r2, o2, i3, e3[u2 + 4], 6, -145523070), i3 = g2(i3, n2, r2, o2, e3[u2 + 11], 10, -1120210379), o2 = g2(o2, i3, n2, r2, e3[u2 + 2], 15, 718787259), r2 = g2(r2, o2, i3, n2, e3[u2 + 9], 21, -343485551), n2 = y(n2, a2), r2 = y(r2, s2), o2 = y(o2, f2), i3 = y(i3, c2);
          }
          return Array(n2, r2, o2, i3);
        }
        function l(e3, t2, n2, r2, o2, i3) {
          return y((u2 = y(y(t2, e3), y(r2, i3))) << (a2 = o2) | u2 >>> 32 - a2, n2);
          var u2, a2;
        }
        function d2(e3, t2, n2, r2, o2, i3, u2) {
          return l(t2 & n2 | ~t2 & r2, e3, t2, o2, i3, u2);
        }
        function h(e3, t2, n2, r2, o2, i3, u2) {
          return l(t2 & r2 | n2 & ~r2, e3, t2, o2, i3, u2);
        }
        function p(e3, t2, n2, r2, o2, i3, u2) {
          return l(t2 ^ n2 ^ r2, e3, t2, o2, i3, u2);
        }
        function g2(e3, t2, n2, r2, o2, i3, u2) {
          return l(n2 ^ (t2 | ~r2), e3, t2, o2, i3, u2);
        }
        function y(e3, t2) {
          var n2 = (65535 & e3) + (65535 & t2);
          return (e3 >> 16) + (t2 >> 16) + (n2 >> 16) << 16 | 65535 & n2;
        }
        b.exports = function(e3) {
          return f.hash(e3, c, 16);
        };
      }).call(this, w("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, w("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 10 }], 7: [function(e, l, t) {
      (function(e2, t2, n, r, o, i2, u, a, s) {
        var c;
        c = function(e3) {
          for (var t3, n2 = new Array(e3), r2 = 0; r2 < e3; r2++)
            0 == (3 & r2) && (t3 = 4294967296 * Math.random()), n2[r2] = t3 >>> ((3 & r2) << 3) & 255;
          return n2;
        }, l.exports = c;
      }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { buffer: 3, lYpoI2: 10 }], 8: [function(l, d2, e) {
      (function(e2, t, n, r, o, i2, u, a, s) {
        var f = l("./helpers");
        function c(e3, t2) {
          e3[t2 >> 5] |= 128 << 24 - t2 % 32, e3[15 + (t2 + 64 >> 9 << 4)] = t2;
          for (var n2, r2, o2, i3, u2, a2 = Array(80), s2 = 1732584193, f2 = -271733879, c2 = -1732584194, l2 = 271733878, d3 = -1009589776, h = 0; h < e3.length; h += 16) {
            for (var p = s2, g2 = f2, y = c2, w = l2, b = d3, m = 0; m < 80; m++) {
              a2[m] = m < 16 ? e3[h + m] : E(a2[m - 3] ^ a2[m - 8] ^ a2[m - 14] ^ a2[m - 16], 1);
              var v2 = _(_(E(s2, 5), (o2 = f2, i3 = c2, u2 = l2, (r2 = m) < 20 ? o2 & i3 | ~o2 & u2 : !(r2 < 40) && r2 < 60 ? o2 & i3 | o2 & u2 | i3 & u2 : o2 ^ i3 ^ u2)), _(_(d3, a2[m]), (n2 = m) < 20 ? 1518500249 : n2 < 40 ? 1859775393 : n2 < 60 ? -1894007588 : -899497514)), d3 = l2, l2 = c2, c2 = E(f2, 30), f2 = s2, s2 = v2;
            }
            s2 = _(s2, p), f2 = _(f2, g2), c2 = _(c2, y), l2 = _(l2, w), d3 = _(d3, b);
          }
          return Array(s2, f2, c2, l2, d3);
        }
        function _(e3, t2) {
          var n2 = (65535 & e3) + (65535 & t2);
          return (e3 >> 16) + (t2 >> 16) + (n2 >> 16) << 16 | 65535 & n2;
        }
        function E(e3, t2) {
          return e3 << t2 | e3 >>> 32 - t2;
        }
        d2.exports = function(e3) {
          return f.hash(e3, c, 20, true);
        };
      }).call(this, l("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, l("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 10 }], 9: [function(l, d2, e) {
      (function(e2, t, n, r, o, i2, u, a, s) {
        function B(e3, t2) {
          var n2 = (65535 & e3) + (65535 & t2);
          return (e3 >> 16) + (t2 >> 16) + (n2 >> 16) << 16 | 65535 & n2;
        }
        function L(e3, t2) {
          return e3 >>> t2 | e3 << 32 - t2;
        }
        function f(e3, t2) {
          var n2, r2, o2, i3, u2, a2, s2, f2, c2, l2, d3 = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298), h = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225), p = new Array(64);
          e3[t2 >> 5] |= 128 << 24 - t2 % 32, e3[15 + (t2 + 64 >> 9 << 4)] = t2;
          for (var g2, y, w, b, m, v2, _, E, I = 0; I < e3.length; I += 16) {
            n2 = h[0], r2 = h[1], o2 = h[2], i3 = h[3], u2 = h[4], a2 = h[5], s2 = h[6], f2 = h[7];
            for (var A = 0; A < 64; A++)
              p[A] = A < 16 ? e3[A + I] : B(B(B((E = p[A - 2], L(E, 17) ^ L(E, 19) ^ E >>> 10), p[A - 7]), (_ = p[A - 15], L(_, 7) ^ L(_, 18) ^ _ >>> 3)), p[A - 16]), c2 = B(B(B(B(f2, L(v2 = u2, 6) ^ L(v2, 11) ^ L(v2, 25)), (m = u2) & a2 ^ ~m & s2), d3[A]), p[A]), l2 = B(L(b = n2, 2) ^ L(b, 13) ^ L(b, 22), (g2 = n2) & (y = r2) ^ g2 & (w = o2) ^ y & w), f2 = s2, s2 = a2, a2 = u2, u2 = B(i3, c2), i3 = o2, o2 = r2, r2 = n2, n2 = B(c2, l2);
            h[0] = B(n2, h[0]), h[1] = B(r2, h[1]), h[2] = B(o2, h[2]), h[3] = B(i3, h[3]), h[4] = B(u2, h[4]), h[5] = B(a2, h[5]), h[6] = B(s2, h[6]), h[7] = B(f2, h[7]);
          }
          return h;
        }
        var c = l("./helpers");
        d2.exports = function(e3) {
          return c.hash(e3, f, 32, true);
        };
      }).call(this, l("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, l("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, { "./helpers": 4, buffer: 3, lYpoI2: 10 }], 10: [function(e, c, t) {
      (function(e2, t2, n, r, o, i2, u, a, s) {
        function f() {
        }
        (e2 = c.exports = {}).nextTick = function() {
          var e3 = "undefined" != typeof window && window.setImmediate, t3 = "undefined" != typeof window && window.postMessage && window.addEventListener;
          if (e3)
            return function(e4) {
              return window.setImmediate(e4);
            };
          if (t3) {
            var n2 = [];
            return window.addEventListener("message", function(e4) {
              var t4 = e4.source;
              t4 !== window && null !== t4 || "process-tick" !== e4.data || (e4.stopPropagation(), 0 < n2.length && n2.shift()());
            }, true), function(e4) {
              n2.push(e4), window.postMessage("process-tick", "*");
            };
          }
          return function(e4) {
            setTimeout(e4, 0);
          };
        }(), e2.title = "browser", e2.browser = true, e2.env = {}, e2.argv = [], e2.on = f, e2.addListener = f, e2.once = f, e2.off = f, e2.removeListener = f, e2.removeAllListeners = f, e2.emit = f, e2.binding = function(e3) {
          throw new Error("process.binding is not supported");
        }, e2.cwd = function() {
          return "/";
        }, e2.chdir = function(e3) {
          throw new Error("process.chdir is not supported");
        };
      }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/process/browser.js", "/node_modules/gulp-browserify/node_modules/process");
    }, { buffer: 3, lYpoI2: 10 }], 11: [function(e, t, f) {
      (function(e2, t2, n, r, o, i2, u, a, s) {
        f.read = function(e3, t3, n2, r2, o2) {
          var i3, u2, a2 = 8 * o2 - r2 - 1, s2 = (1 << a2) - 1, f2 = s2 >> 1, c = -7, l = n2 ? o2 - 1 : 0, d2 = n2 ? -1 : 1, h = e3[t3 + l];
          for (l += d2, i3 = h & (1 << -c) - 1, h >>= -c, c += a2; 0 < c; i3 = 256 * i3 + e3[t3 + l], l += d2, c -= 8)
            ;
          for (u2 = i3 & (1 << -c) - 1, i3 >>= -c, c += r2; 0 < c; u2 = 256 * u2 + e3[t3 + l], l += d2, c -= 8)
            ;
          if (0 === i3)
            i3 = 1 - f2;
          else {
            if (i3 === s2)
              return u2 ? NaN : 1 / 0 * (h ? -1 : 1);
            u2 += Math.pow(2, r2), i3 -= f2;
          }
          return (h ? -1 : 1) * u2 * Math.pow(2, i3 - r2);
        }, f.write = function(e3, t3, n2, r2, o2, i3) {
          var u2, a2, s2, f2 = 8 * i3 - o2 - 1, c = (1 << f2) - 1, l = c >> 1, d2 = 23 === o2 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, h = r2 ? 0 : i3 - 1, p = r2 ? 1 : -1, g2 = t3 < 0 || 0 === t3 && 1 / t3 < 0 ? 1 : 0;
          for (t3 = Math.abs(t3), isNaN(t3) || t3 === 1 / 0 ? (a2 = isNaN(t3) ? 1 : 0, u2 = c) : (u2 = Math.floor(Math.log(t3) / Math.LN2), t3 * (s2 = Math.pow(2, -u2)) < 1 && (u2--, s2 *= 2), 2 <= (t3 += 1 <= u2 + l ? d2 / s2 : d2 * Math.pow(2, 1 - l)) * s2 && (u2++, s2 /= 2), c <= u2 + l ? (a2 = 0, u2 = c) : 1 <= u2 + l ? (a2 = (t3 * s2 - 1) * Math.pow(2, o2), u2 += l) : (a2 = t3 * Math.pow(2, l - 1) * Math.pow(2, o2), u2 = 0)); 8 <= o2; e3[n2 + h] = 255 & a2, h += p, a2 /= 256, o2 -= 8)
            ;
          for (u2 = u2 << o2 | a2, f2 += o2; 0 < f2; e3[n2 + h] = 255 & u2, h += p, u2 /= 256, f2 -= 8)
            ;
          e3[n2 + h - p] |= 128 * g2;
        };
      }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/ieee754/index.js", "/node_modules/ieee754");
    }, { buffer: 3, lYpoI2: 10 }] }, {}, [1])(1);
  });
})(object_hash);
const __objectHash = object_hash.exports;
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
var mobileDetect = { exports: {} };
(function(module) {
  /*!mobile-detect v1.4.5 2021-03-13*/
  /*!@license Copyright 2013, Heinrich Goebl, License: MIT, see https://github.com/hgoebl/mobile-detect.js*/
  (function(define2, undefined$12) {
    define2(function() {
      var impl = {};
      impl.mobileDetectRules = {
        "phones": {
          "iPhone": "\\biPhone\\b|\\biPod\\b",
          "BlackBerry": "BlackBerry|\\bBB10\\b|rim[0-9]+|\\b(BBA100|BBB100|BBD100|BBE100|BBF100|STH100)\\b-[0-9]+",
          "Pixel": "; \\bPixel\\b",
          "HTC": "HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m|Android [0-9.]+; Pixel",
          "Nexus": "Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 5X|Nexus 6",
          "Dell": "Dell[;]? (Streak|Aero|Venue|Venue Pro|Flash|Smoke|Mini 3iX)|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b",
          "Motorola": "Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b|XT1068|XT1092|XT1052",
          "Samsung": "\\bSamsung\\b|SM-G950F|SM-G955F|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205|SM-G9350|SM-J120F|SM-G920F|SM-G920V|SM-G930F|SM-N910C|SM-A310F|GT-I9190|SM-J500FN|SM-G903F|SM-J330F|SM-G610F|SM-G981B|SM-G892A|SM-A530F",
          "LG": "\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802|MS323|M257)|LM-G710",
          "Sony": "SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533|SOV34|601SO|F8332",
          "Asus": "Asus.*Galaxy|PadFone.*Mobile",
          "Xiaomi": "^(?!.*\\bx11\\b).*xiaomi.*$|POCOPHONE F1|MI 8|Redmi Note 9S|Redmi Note 5A Prime|N2G47H|M2001J2G|M2001J2I|M1805E10A|M2004J11G|M1902F1G|M2002J9G|M2004J19G|M2003J6A1G",
          "NokiaLumia": "Lumia [0-9]{3,4}",
          "Micromax": "Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b",
          "Palm": "PalmSource|Palm",
          "Vertu": "Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature",
          "Pantech": "PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790",
          "Fly": "IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250",
          "Wiko": "KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA(?!nna)|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM",
          "iMobile": "i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)",
          "SimValley": "\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b",
          "Wolfgang": "AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q",
          "Alcatel": "Alcatel",
          "Nintendo": "Nintendo (3DS|Switch)",
          "Amoi": "Amoi",
          "INQ": "INQ",
          "OnePlus": "ONEPLUS",
          "GenericPhone": "Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser"
        },
        "tablets": {
          "iPad": "iPad|iPad.*Mobile",
          "NexusTablet": "Android.*Nexus[\\s]+(7|9|10)",
          "GoogleTablet": "Android.*Pixel C",
          "SamsungTablet": "SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-T116BU|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T815|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715|SM-T560|SM-T670|SM-T677|SM-T377|SM-T567|SM-T357T|SM-T555|SM-T561|SM-T713|SM-T719|SM-T813|SM-T819|SM-T580|SM-T355Y?|SM-T280|SM-T817A|SM-T820|SM-W700|SM-P580|SM-T587|SM-P350|SM-P555M|SM-P355M|SM-T113NU|SM-T815Y|SM-T585|SM-T285|SM-T825|SM-W708|SM-T835|SM-T830|SM-T837V|SM-T720|SM-T510|SM-T387V|SM-P610|SM-T290|SM-T515|SM-T590|SM-T595|SM-T725|SM-T817P|SM-P585N0|SM-T395|SM-T295|SM-T865|SM-P610N|SM-P615|SM-T970|SM-T380|SM-T5950|SM-T905|SM-T231|SM-T500|SM-T860",
          "Kindle": "Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI|KFARWI|KFFOWI|KFGIWI|KFMEWI)\\b|Android.*Silk/[0-9.]+ like Chrome/[0-9.]+ (?!Mobile)",
          "SurfaceTablet": "Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)",
          "HPTablet": "HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10",
          "AsusTablet": "^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K011 | K017 | K01E |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C|P01Y|PO1MA|P01Z|\\bP027\\b|\\bP024\\b|\\bP00C\\b",
          "BlackBerryTablet": "PlayBook|RIM Tablet",
          "HTCtablet": "HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410",
          "MotorolaTablet": "xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617",
          "NookTablet": "Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2",
          "AcerTablet": "Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b|\\bA3-A20\\b|\\bA3-A30|A3-A40",
          "ToshibaTablet": "Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO",
          "LGTablet": "\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b",
          "FujitsuTablet": "Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b",
          "PrestigioTablet": "PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002",
          "LenovoTablet": "Lenovo TAB|Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|YT3-850M|YT3-X90L|YT3-X90F|YT3-X90X|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)|TB-X103F|TB-X304X|TB-X304F|TB-X304L|TB-X505F|TB-X505L|TB-X505X|TB-X605F|TB-X605L|TB-8703F|TB-8703X|TB-8703N|TB-8704N|TB-8704F|TB-8704X|TB-8704V|TB-7304F|TB-7304I|TB-7304X|Tab2A7-10F|Tab2A7-20F|TB2-X30L|YT3-X50L|YT3-X50F|YT3-X50M|YT-X705F|YT-X703F|YT-X703L|YT-X705L|YT-X705X|TB2-X30F|TB2-X30L|TB2-X30M|A2107A-F|A2107A-H|TB3-730F|TB3-730M|TB3-730X|TB-7504F|TB-7504X|TB-X704F|TB-X104F|TB3-X70F|TB-X705F|TB-8504F|TB3-X70L|TB3-710F|TB-X704L",
          "DellTablet": "Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7",
          "YarvikTablet": "Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b",
          "MedionTablet": "Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB",
          "ArnovaTablet": "97G4|AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2",
          "IntensoTablet": "INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004",
          "IRUTablet": "M702pro",
          "MegafonTablet": "MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b",
          "EbodaTablet": "E-Boda (Supreme|Impresspeed|Izzycomm|Essential)",
          "AllViewTablet": "Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)",
          "ArchosTablet": "\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|c|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b",
          "AinolTablet": "NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark",
          "NokiaLumiaTablet": "Lumia 2520",
          "SonyTablet": "Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP641|SGP612|SOT31|SGP771|SGP611|SGP612|SGP712",
          "PhilipsTablet": "\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b",
          "CubeTablet": "Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT",
          "CobyTablet": "MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010",
          "MIDTablet": "M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733|MID4X10",
          "MSITablet": "MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b",
          "SMiTTablet": "Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)",
          "RockChipTablet": "Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A",
          "FlyTablet": "IQ310|Fly Vision",
          "bqTablet": "Android.*(bq)?.*\\b(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris ([E|M]10|M8))\\b|Maxwell.*Lite|Maxwell.*Plus",
          "HuaweiTablet": "MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim|M2-A01L|BAH-L09|BAH-W09|AGS-L09|CMR-AL19",
          "NecTablet": "\\bN-06D|\\bN-08D",
          "PantechTablet": "Pantech.*P4100",
          "BronchoTablet": "Broncho.*(N701|N708|N802|a710)",
          "VersusTablet": "TOUCHPAD.*[78910]|\\bTOUCHTAB\\b",
          "ZyncTablet": "z1000|Z99 2G|z930|z990|z909|Z919|z900",
          "PositivoTablet": "TB07STA|TB10STA|TB07FTA|TB10FTA",
          "NabiTablet": "Android.*\\bNabi",
          "KoboTablet": "Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build",
          "DanewTablet": "DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b",
          "TexetTablet": "NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE",
          "PlaystationTablet": "Playstation.*(Portable|Vita)",
          "TrekstorTablet": "ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab",
          "PyleAudioTablet": "\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b",
          "AdvanTablet": "Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ",
          "DanyTechTablet": "Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1",
          "GalapadTablet": "Android [0-9.]+; [a-z-]+; \\bG1\\b",
          "MicromaxTablet": "Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b",
          "KarbonnTablet": "Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b",
          "AllFineTablet": "Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide",
          "PROSCANTablet": "\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b",
          "YONESTablet": "BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026",
          "ChangJiaTablet": "TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503",
          "GUTablet": "TX-A1301|TX-M9002|Q702|kf026",
          "PointOfViewTablet": "TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10",
          "OvermaxTablet": "OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)|Qualcore 1027",
          "HCLTablet": "HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync",
          "DPSTablet": "DPS Dream 9|DPS Dual 7",
          "VistureTablet": "V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10",
          "CrestaTablet": "CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989",
          "MediatekTablet": "\\bMT8125|MT8389|MT8135|MT8377\\b",
          "ConcordeTablet": "Concorde([ ]+)?Tab|ConCorde ReadMan",
          "GoCleverTablet": "GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042",
          "ModecomTablet": "FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003",
          "VoninoTablet": "\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b",
          "ECSTablet": "V07OT2|TM105A|S10OT1|TR10CS1",
          "StorexTablet": "eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab",
          "VodafoneTablet": "SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7|VF-1497|VFD 1400",
          "EssentielBTablet": "Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2",
          "RossMoorTablet": "RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711",
          "iMobileTablet": "i-mobile i-note",
          "TolinoTablet": "tolino tab [0-9.]+|tolino shine",
          "AudioSonicTablet": "\\bC-22Q|T7-QC|T-17B|T-17P\\b",
          "AMPETablet": "Android.* A78 ",
          "SkkTablet": "Android.* (SKYPAD|PHOENIX|CYCLOPS)",
          "TecnoTablet": "TECNO P9|TECNO DP8D",
          "JXDTablet": "Android.* \\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b",
          "iJoyTablet": "Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)",
          "FX2Tablet": "FX2 PAD7|FX2 PAD10",
          "XoroTablet": "KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151",
          "ViewsonicTablet": "ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a",
          "VerizonTablet": "QTAQZ3|QTAIR7|QTAQTZ3|QTASUN1|QTASUN2|QTAXIA1",
          "OdysTablet": "LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10",
          "CaptivaTablet": "CAPTIVA PAD",
          "IconbitTablet": "NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S",
          "TeclastTablet": "T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi",
          "OndaTablet": "\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+|V10 \\b4G\\b",
          "JaytechTablet": "TPC-PA762",
          "BlaupunktTablet": "Endeavour 800NG|Endeavour 1010",
          "DigmaTablet": "\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b",
          "EvolioTablet": "ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b",
          "LavaTablet": "QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b",
          "AocTablet": "MW0811|MW0812|MW0922|MTK8382|MW1031|MW0831|MW0821|MW0931|MW0712",
          "MpmanTablet": "MP11 OCTA|MP10 OCTA|MPQC1114|MPQC1004|MPQC994|MPQC974|MPQC973|MPQC804|MPQC784|MPQC780|\\bMPG7\\b|MPDCG75|MPDCG71|MPDC1006|MP101DC|MPDC9000|MPDC905|MPDC706HD|MPDC706|MPDC705|MPDC110|MPDC100|MPDC99|MPDC97|MPDC88|MPDC8|MPDC77|MP709|MID701|MID711|MID170|MPDC703|MPQC1010",
          "CelkonTablet": "CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b",
          "WolderTablet": "miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b",
          "MediacomTablet": "M-MPI10C3G|M-SP10EG|M-SP10EGP|M-SP10HXAH|M-SP7HXAH|M-SP10HXBH|M-SP8HXAH|M-SP8MXA",
          "MiTablet": "\\bMI PAD\\b|\\bHM NOTE 1W\\b",
          "NibiruTablet": "Nibiru M1|Nibiru Jupiter One",
          "NexoTablet": "NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI",
          "LeaderTablet": "TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100",
          "UbislateTablet": "UbiSlate[\\s]?7C",
          "PocketBookTablet": "Pocketbook",
          "KocasoTablet": "\\b(TB-1207)\\b",
          "HisenseTablet": "\\b(F5281|E2371)\\b",
          "Hudl": "Hudl HT7S3|Hudl 2",
          "TelstraTablet": "T-Hub2",
          "GenericTablet": "Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bTP750\\b|\\bQTAQZ3\\b|WVT101|TM1088|KT107"
        },
        "oss": {
          "AndroidOS": "Android",
          "BlackBerryOS": "blackberry|\\bBB10\\b|rim tablet os",
          "PalmOS": "PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino",
          "SymbianOS": "Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b",
          "WindowsMobileOS": "Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Windows Mobile|Windows Phone [0-9.]+|WCE;",
          "WindowsPhoneOS": "Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;",
          "iOS": "\\biPhone.*Mobile|\\biPod|\\biPad|AppleCoreMedia",
          "iPadOS": "CPU OS 13",
          "SailfishOS": "Sailfish",
          "MeeGoOS": "MeeGo",
          "MaemoOS": "Maemo",
          "JavaOS": "J2ME/|\\bMIDP\\b|\\bCLDC\\b",
          "webOS": "webOS|hpwOS",
          "badaOS": "\\bBada\\b",
          "BREWOS": "BREW"
        },
        "uas": {
          "Chrome": "\\bCrMo\\b|CriOS|Android.*Chrome/[.0-9]* (Mobile)?",
          "Dolfin": "\\bDolfin\\b",
          "Opera": "Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR/[0-9.]+$|Coast/[0-9.]+",
          "Skyfire": "Skyfire",
          "Edge": "\\bEdgiOS\\b|Mobile Safari/[.0-9]* Edge",
          "IE": "IEMobile|MSIEMobile",
          "Firefox": "fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS",
          "Bolt": "bolt",
          "TeaShark": "teashark",
          "Blazer": "Blazer",
          "Safari": "Version((?!\\bEdgiOS\\b).)*Mobile.*Safari|Safari.*Mobile|MobileSafari",
          "WeChat": "\\bMicroMessenger\\b",
          "UCBrowser": "UC.*Browser|UCWEB",
          "baiduboxapp": "baiduboxapp",
          "baidubrowser": "baidubrowser",
          "DiigoBrowser": "DiigoBrowser",
          "Mercury": "\\bMercury\\b",
          "ObigoBrowser": "Obigo",
          "NetFront": "NF-Browser",
          "GenericBrowser": "NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger",
          "PaleMoon": "Android.*PaleMoon|Mobile.*PaleMoon"
        },
        "props": {
          "Mobile": "Mobile/[VER]",
          "Build": "Build/[VER]",
          "Version": "Version/[VER]",
          "VendorID": "VendorID/[VER]",
          "iPad": "iPad.*CPU[a-z ]+[VER]",
          "iPhone": "iPhone.*CPU[a-z ]+[VER]",
          "iPod": "iPod.*CPU[a-z ]+[VER]",
          "Kindle": "Kindle/[VER]",
          "Chrome": [
            "Chrome/[VER]",
            "CriOS/[VER]",
            "CrMo/[VER]"
          ],
          "Coast": [
            "Coast/[VER]"
          ],
          "Dolfin": "Dolfin/[VER]",
          "Firefox": [
            "Firefox/[VER]",
            "FxiOS/[VER]"
          ],
          "Fennec": "Fennec/[VER]",
          "Edge": "Edge/[VER]",
          "IE": [
            "IEMobile/[VER];",
            "IEMobile [VER]",
            "MSIE [VER];",
            "Trident/[0-9.]+;.*rv:[VER]"
          ],
          "NetFront": "NetFront/[VER]",
          "NokiaBrowser": "NokiaBrowser/[VER]",
          "Opera": [
            " OPR/[VER]",
            "Opera Mini/[VER]",
            "Version/[VER]"
          ],
          "Opera Mini": "Opera Mini/[VER]",
          "Opera Mobi": "Version/[VER]",
          "UCBrowser": [
            "UCWEB[VER]",
            "UC.*Browser/[VER]"
          ],
          "MQQBrowser": "MQQBrowser/[VER]",
          "MicroMessenger": "MicroMessenger/[VER]",
          "baiduboxapp": "baiduboxapp/[VER]",
          "baidubrowser": "baidubrowser/[VER]",
          "SamsungBrowser": "SamsungBrowser/[VER]",
          "Iron": "Iron/[VER]",
          "Safari": [
            "Version/[VER]",
            "Safari/[VER]"
          ],
          "Skyfire": "Skyfire/[VER]",
          "Tizen": "Tizen/[VER]",
          "Webkit": "webkit[ /][VER]",
          "PaleMoon": "PaleMoon/[VER]",
          "SailfishBrowser": "SailfishBrowser/[VER]",
          "Gecko": "Gecko/[VER]",
          "Trident": "Trident/[VER]",
          "Presto": "Presto/[VER]",
          "Goanna": "Goanna/[VER]",
          "iOS": " \\bi?OS\\b [VER][ ;]{1}",
          "Android": "Android [VER]",
          "Sailfish": "Sailfish [VER]",
          "BlackBerry": [
            "BlackBerry[\\w]+/[VER]",
            "BlackBerry.*Version/[VER]",
            "Version/[VER]"
          ],
          "BREW": "BREW [VER]",
          "Java": "Java/[VER]",
          "Windows Phone OS": [
            "Windows Phone OS [VER]",
            "Windows Phone [VER]"
          ],
          "Windows Phone": "Windows Phone [VER]",
          "Windows CE": "Windows CE/[VER]",
          "Windows NT": "Windows NT [VER]",
          "Symbian": [
            "SymbianOS/[VER]",
            "Symbian/[VER]"
          ],
          "webOS": [
            "webOS/[VER]",
            "hpwOS/[VER];"
          ]
        },
        "utils": {
          "Bot": "Googlebot|facebookexternalhit|Google-AMPHTML|s~amp-validator|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|YandexMobileBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom|contentkingapp|AspiegelBot",
          "MobileBot": "Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker/M1A1-R2D2",
          "DesktopMode": "WPDesktop",
          "TV": "SonyDTV|HbbTV",
          "WebKit": "(webkit)[ /]([\\w.]+)",
          "Console": "\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|Nintendo Switch|PLAYSTATION|Xbox)\\b",
          "Watch": "SM-V700"
        }
      };
      impl.detectMobileBrowsers = {
        fullPattern: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
        shortPattern: /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        tabletPattern: /android|ipad|playbook|silk/i
      };
      var hasOwnProp = Object.prototype.hasOwnProperty, isArray2;
      impl.FALLBACK_PHONE = "UnknownPhone";
      impl.FALLBACK_TABLET = "UnknownTablet";
      impl.FALLBACK_MOBILE = "UnknownMobile";
      isArray2 = "isArray" in Array ? Array.isArray : function(value) {
        return Object.prototype.toString.call(value) === "[object Array]";
      };
      function equalIC(a, b) {
        return a != null && b != null && a.toLowerCase() === b.toLowerCase();
      }
      function containsIC(array, value) {
        var valueLC, i2, len = array.length;
        if (!len || !value) {
          return false;
        }
        valueLC = value.toLowerCase();
        for (i2 = 0; i2 < len; ++i2) {
          if (valueLC === array[i2].toLowerCase()) {
            return true;
          }
        }
        return false;
      }
      function convertPropsToRegExp(object) {
        for (var key in object) {
          if (hasOwnProp.call(object, key)) {
            object[key] = new RegExp(object[key], "i");
          }
        }
      }
      function prepareUserAgent(userAgent) {
        return (userAgent || "").substr(0, 500);
      }
      (function init() {
        var key, values, value, i2, len, verPos, mobileDetectRules = impl.mobileDetectRules;
        for (key in mobileDetectRules.props) {
          if (hasOwnProp.call(mobileDetectRules.props, key)) {
            values = mobileDetectRules.props[key];
            if (!isArray2(values)) {
              values = [values];
            }
            len = values.length;
            for (i2 = 0; i2 < len; ++i2) {
              value = values[i2];
              verPos = value.indexOf("[VER]");
              if (verPos >= 0) {
                value = value.substring(0, verPos) + "([\\w._\\+]+)" + value.substring(verPos + 5);
              }
              values[i2] = new RegExp(value, "i");
            }
            mobileDetectRules.props[key] = values;
          }
        }
        convertPropsToRegExp(mobileDetectRules.oss);
        convertPropsToRegExp(mobileDetectRules.phones);
        convertPropsToRegExp(mobileDetectRules.tablets);
        convertPropsToRegExp(mobileDetectRules.uas);
        convertPropsToRegExp(mobileDetectRules.utils);
        mobileDetectRules.oss0 = {
          WindowsPhoneOS: mobileDetectRules.oss.WindowsPhoneOS,
          WindowsMobileOS: mobileDetectRules.oss.WindowsMobileOS
        };
      })();
      impl.findMatch = function(rules, userAgent) {
        for (var key in rules) {
          if (hasOwnProp.call(rules, key)) {
            if (rules[key].test(userAgent)) {
              return key;
            }
          }
        }
        return null;
      };
      impl.findMatches = function(rules, userAgent) {
        var result2 = [];
        for (var key in rules) {
          if (hasOwnProp.call(rules, key)) {
            if (rules[key].test(userAgent)) {
              result2.push(key);
            }
          }
        }
        return result2;
      };
      impl.getVersionStr = function(propertyName, userAgent) {
        var props = impl.mobileDetectRules.props, patterns, i2, len, match2;
        if (hasOwnProp.call(props, propertyName)) {
          patterns = props[propertyName];
          len = patterns.length;
          for (i2 = 0; i2 < len; ++i2) {
            match2 = patterns[i2].exec(userAgent);
            if (match2 !== null) {
              return match2[1];
            }
          }
        }
        return null;
      };
      impl.getVersion = function(propertyName, userAgent) {
        var version2 = impl.getVersionStr(propertyName, userAgent);
        return version2 ? impl.prepareVersionNo(version2) : NaN;
      };
      impl.prepareVersionNo = function(version2) {
        var numbers;
        numbers = version2.split(/[a-z._ \/\-]/i);
        if (numbers.length === 1) {
          version2 = numbers[0];
        }
        if (numbers.length > 1) {
          version2 = numbers[0] + ".";
          numbers.shift();
          version2 += numbers.join("");
        }
        return Number(version2);
      };
      impl.isMobileFallback = function(userAgent) {
        return impl.detectMobileBrowsers.fullPattern.test(userAgent) || impl.detectMobileBrowsers.shortPattern.test(userAgent.substr(0, 4));
      };
      impl.isTabletFallback = function(userAgent) {
        return impl.detectMobileBrowsers.tabletPattern.test(userAgent);
      };
      impl.prepareDetectionCache = function(cache2, userAgent, maxPhoneWidth) {
        if (cache2.mobile !== undefined$12) {
          return;
        }
        var phone, tablet, phoneSized;
        tablet = impl.findMatch(impl.mobileDetectRules.tablets, userAgent);
        if (tablet) {
          cache2.mobile = cache2.tablet = tablet;
          cache2.phone = null;
          return;
        }
        phone = impl.findMatch(impl.mobileDetectRules.phones, userAgent);
        if (phone) {
          cache2.mobile = cache2.phone = phone;
          cache2.tablet = null;
          return;
        }
        if (impl.isMobileFallback(userAgent)) {
          phoneSized = MobileDetect.isPhoneSized(maxPhoneWidth);
          if (phoneSized === undefined$12) {
            cache2.mobile = impl.FALLBACK_MOBILE;
            cache2.tablet = cache2.phone = null;
          } else if (phoneSized) {
            cache2.mobile = cache2.phone = impl.FALLBACK_PHONE;
            cache2.tablet = null;
          } else {
            cache2.mobile = cache2.tablet = impl.FALLBACK_TABLET;
            cache2.phone = null;
          }
        } else if (impl.isTabletFallback(userAgent)) {
          cache2.mobile = cache2.tablet = impl.FALLBACK_TABLET;
          cache2.phone = null;
        } else {
          cache2.mobile = cache2.tablet = cache2.phone = null;
        }
      };
      impl.mobileGrade = function(t) {
        var $isMobile = t.mobile() !== null;
        if (t.os("iOS") && t.version("iPad") >= 4.3 || t.os("iOS") && t.version("iPhone") >= 3.1 || t.os("iOS") && t.version("iPod") >= 3.1 || t.version("Android") > 2.1 && t.is("Webkit") || t.version("Windows Phone OS") >= 7 || t.is("BlackBerry") && t.version("BlackBerry") >= 6 || t.match("Playbook.*Tablet") || t.version("webOS") >= 1.4 && t.match("Palm|Pre|Pixi") || t.match("hp.*TouchPad") || t.is("Firefox") && t.version("Firefox") >= 12 || t.is("Chrome") && t.is("AndroidOS") && t.version("Android") >= 4 || t.is("Skyfire") && t.version("Skyfire") >= 4.1 && t.is("AndroidOS") && t.version("Android") >= 2.3 || t.is("Opera") && t.version("Opera Mobi") > 11 && t.is("AndroidOS") || t.is("MeeGoOS") || t.is("Tizen") || t.is("Dolfin") && t.version("Bada") >= 2 || (t.is("UC Browser") || t.is("Dolfin")) && t.version("Android") >= 2.3 || (t.match("Kindle Fire") || t.is("Kindle") && t.version("Kindle") >= 3) || t.is("AndroidOS") && t.is("NookTablet") || t.version("Chrome") >= 11 && !$isMobile || t.version("Safari") >= 5 && !$isMobile || t.version("Firefox") >= 4 && !$isMobile || t.version("MSIE") >= 7 && !$isMobile || t.version("Opera") >= 10 && !$isMobile) {
          return "A";
        }
        if (t.os("iOS") && t.version("iPad") < 4.3 || t.os("iOS") && t.version("iPhone") < 3.1 || t.os("iOS") && t.version("iPod") < 3.1 || t.is("Blackberry") && t.version("BlackBerry") >= 5 && t.version("BlackBerry") < 6 || t.version("Opera Mini") >= 5 && t.version("Opera Mini") <= 6.5 && (t.version("Android") >= 2.3 || t.is("iOS")) || t.match("NokiaN8|NokiaC7|N97.*Series60|Symbian/3") || t.version("Opera Mobi") >= 11 && t.is("SymbianOS")) {
          return "B";
        }
        if (t.version("BlackBerry") < 5 || t.match("MSIEMobile|Windows CE.*Mobile") || t.version("Windows Mobile") <= 5.2) {
          return "C";
        }
        return "C";
      };
      impl.detectOS = function(ua) {
        return impl.findMatch(impl.mobileDetectRules.oss0, ua) || impl.findMatch(impl.mobileDetectRules.oss, ua);
      };
      impl.getDeviceSmallerSide = function() {
        return window.screen.width < window.screen.height ? window.screen.width : window.screen.height;
      };
      function MobileDetect(userAgent, maxPhoneWidth) {
        this.ua = prepareUserAgent(userAgent);
        this._cache = {};
        this.maxPhoneWidth = maxPhoneWidth || 600;
      }
      MobileDetect.prototype = {
        constructor: MobileDetect,
        mobile: function() {
          impl.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth);
          return this._cache.mobile;
        },
        phone: function() {
          impl.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth);
          return this._cache.phone;
        },
        tablet: function() {
          impl.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth);
          return this._cache.tablet;
        },
        userAgent: function() {
          if (this._cache.userAgent === undefined$12) {
            this._cache.userAgent = impl.findMatch(impl.mobileDetectRules.uas, this.ua);
          }
          return this._cache.userAgent;
        },
        userAgents: function() {
          if (this._cache.userAgents === undefined$12) {
            this._cache.userAgents = impl.findMatches(impl.mobileDetectRules.uas, this.ua);
          }
          return this._cache.userAgents;
        },
        os: function() {
          if (this._cache.os === undefined$12) {
            this._cache.os = impl.detectOS(this.ua);
          }
          return this._cache.os;
        },
        version: function(key) {
          return impl.getVersion(key, this.ua);
        },
        versionStr: function(key) {
          return impl.getVersionStr(key, this.ua);
        },
        is: function(key) {
          return containsIC(this.userAgents(), key) || equalIC(key, this.os()) || equalIC(key, this.phone()) || equalIC(key, this.tablet()) || containsIC(impl.findMatches(impl.mobileDetectRules.utils, this.ua), key);
        },
        match: function(pattern) {
          if (!(pattern instanceof RegExp)) {
            pattern = new RegExp(pattern, "i");
          }
          return pattern.test(this.ua);
        },
        isPhoneSized: function(maxPhoneWidth) {
          return MobileDetect.isPhoneSized(maxPhoneWidth || this.maxPhoneWidth);
        },
        mobileGrade: function() {
          if (this._cache.grade === undefined$12) {
            this._cache.grade = impl.mobileGrade(this);
          }
          return this._cache.grade;
        }
      };
      if (typeof window !== "undefined" && window.screen) {
        MobileDetect.isPhoneSized = function(maxPhoneWidth) {
          return maxPhoneWidth < 0 ? undefined$12 : impl.getDeviceSmallerSide() <= maxPhoneWidth;
        };
      } else {
        MobileDetect.isPhoneSized = function() {
        };
      }
      MobileDetect._impl = impl;
      MobileDetect.version = "1.4.5 2021-03-13";
      return MobileDetect;
    });
  })(function(undefined$12) {
    if (module.exports) {
      return function(factory) {
        module.exports = factory();
      };
    } else if (typeof undefined$12 === "function" && undefined$12.amd) {
      return undefined$12;
    } else if (typeof window !== "undefined") {
      return function(factory) {
        window.MobileDetect = factory();
      };
    } else {
      throw new Error("unknown environment");
    }
  }());
})(mobileDetect);
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
var globToRegexp = function(glob, opts) {
  if (typeof glob !== "string") {
    throw new TypeError("Expected a string");
  }
  var str2 = String(glob);
  var reStr = "";
  var extended = opts ? !!opts.extended : false;
  var globstar = opts ? !!opts.globstar : false;
  var inGroup = false;
  var flags = opts && typeof opts.flags === "string" ? opts.flags : "";
  var c;
  for (var i2 = 0, len = str2.length; i2 < len; i2++) {
    c = str2[i2];
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
        var prevChar = str2[i2 - 1];
        var starCount = 1;
        while (str2[i2 + 1] === "*") {
          starCount++;
          i2++;
        }
        var nextChar = str2[i2 + 1];
        if (!globstar) {
          reStr += ".*";
        } else {
          var isGlobstar = starCount > 1 && (prevChar === "/" || prevChar === void 0) && (nextChar === "/" || nextChar === void 0);
          if (isGlobstar) {
            reStr += "((?:[^/]*(?:/|$))*)";
            i2++;
          } else {
            reStr += "([^/]*)";
          }
        }
        break;
      default:
        reStr += c;
    }
  }
  if (!flags || !~flags.indexOf("g")) {
    reStr = "^" + reStr + "$";
  }
  return new RegExp(reStr, flags);
};
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
    sourceSEventEmitter.on(set.events || "*", (value, metas) => __awaiter$d(this, void 0, void 0, function* () {
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
    return new Promise((resolve, reject) => __awaiter$d(this, void 0, void 0, function* () {
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
    return __awaiter$d(this, void 0, void 0, function* () {
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
    return __awaiter$d(this, void 0, void 0, function* () {
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
    return new Promise((resolve, reject) => __awaiter$d(this, void 0, void 0, function* () {
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
      this.on("finally", (v2, m) => {
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
      (() => __awaiter$c(this, void 0, void 0, function* () {
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
    return new SPromise(({ resolve, reject, pipe }) => __awaiter$c(this, void 0, void 0, function* () {
      const results = {};
      function next() {
        return __awaiter$c(this, void 0, void 0, function* () {
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
    ar.forEach((a) => {
      if (a === "resolve") {
        this.settings.promise.resolveProxies.push(proxy);
      } else if (a === "reject") {
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
    return __awaiter$c(this, void 0, void 0, function* () {
      if (this._promiseState === "destroyed")
        return;
      this._promiseState = "resolved";
      const stacksOrderArray = stacksOrder.split(",").map((l) => l.trim());
      for (let i2 = 0; i2 < stacksOrderArray.length; i2++) {
        const stack = stacksOrderArray[i2];
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
    return __awaiter$c(this, void 0, void 0, function* () {
      if (this._promiseState === "destroyed")
        return;
      this._promiseState = "rejected";
      const stacksOrderArray = stacksOrder.split(",").map((l) => l.trim());
      for (let i2 = 0; i2 < stacksOrderArray.length; i2++) {
        const stack = stacksOrderArray[i2];
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
    return new Promise((resolve, reject) => __awaiter$c(this, void 0, void 0, function* () {
      this._promiseState = "canceled";
      const stacksOrderArray = stacksOrder.split(",").map((l) => l.trim());
      for (let i2 = 0; i2 < stacksOrderArray.length; i2++) {
        const stack = stacksOrderArray[i2];
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
  for (let i2 = 0; i2 < typeString.length; i2++) {
    const char = typeString[i2];
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
var __assign$6 = function() {
  __assign$6 = Object.assign || function __assign2(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$6.apply(this, arguments);
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
  return noCase(input, __assign$6({ delimiter: "." }, options));
}
function paramCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return dotCase(input, __assign$6({ delimiter: "-" }, options));
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
  var i2 = 0, l, c, start = { type: types$1.ROOT, stack: [] }, lastGroup = start, last = start.stack, groupStack = [];
  var repeatErr = function(i3) {
    util.error(regexpStr, "Nothing to repeat at column " + (i3 - 1));
  };
  var str2 = util.strToChars(regexpStr);
  l = str2.length;
  while (i2 < l) {
    c = str2[i2++];
    switch (c) {
      case "\\":
        c = str2[i2++];
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
        if (str2[i2] === "^") {
          not2 = true;
          i2++;
        } else {
          not2 = false;
        }
        var classTokens = util.tokenizeClass(str2.slice(i2), regexpStr);
        i2 += classTokens[1];
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
        c = str2[i2];
        if (c === "?") {
          c = str2[i2 + 1];
          i2 += 2;
          if (c === "=") {
            group.followedBy = true;
          } else if (c === "!") {
            group.notFollowedBy = true;
          } else if (c !== ":") {
            util.error(
              regexpStr,
              "Invalid group, character '" + c + "' after '?' at column " + (i2 - 1)
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
          util.error(regexpStr, "Unmatched ) at column " + (i2 - 1));
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
        var rs = /^(\d+)(,(\d+)?)?\}/.exec(str2.slice(i2)), min, max2;
        if (rs !== null) {
          if (last.length === 0) {
            repeatErr(i2);
          }
          min = parseInt(rs[1], 10);
          max2 = rs[2] ? rs[3] ? parseInt(rs[3], 10) : Infinity : min;
          i2 += rs[0].length;
          last.push({
            type: types$1.REPETITION,
            min,
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
          repeatErr(i2);
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
          repeatErr(i2);
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
          repeatErr(i2);
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
  return function walk(node2, starHeight) {
    if (node2.type === types.REPETITION) {
      starHeight++;
      reps++;
      if (starHeight > 1)
        return false;
      if (reps > replimit)
        return false;
    }
    if (node2.options) {
      for (var i2 = 0, len = node2.options.length; i2 < len; i2++) {
        var ok = walk({ stack: node2.options[i2] }, starHeight);
        if (!ok)
          return false;
      }
    }
    var stack = node2.stack || node2.value && node2.value.stack;
    if (!stack)
      return true;
    for (var i2 = 0; i2 < stack.length; i2++) {
      var ok = walk(stack[i2], starHeight);
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
function isAccessorDescriptor(obj2, prop) {
  if (typeof prop === "string") {
    var val = Object.getOwnPropertyDescriptor(obj2, prop);
    return typeof val !== "undefined";
  }
  if (typeOf$2(obj2) !== "object") {
    return false;
  }
  if (has(obj2, "value") || has(obj2, "writable")) {
    return false;
  }
  if (!has(obj2, "get") || typeof obj2.get !== "function") {
    return false;
  }
  if (has(obj2, "set") && typeof obj2[key] !== "function" && typeof obj2[key] !== "undefined") {
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
function has(obj2, key) {
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
var define$4 = typeof Reflect !== "undefined" && Reflect.defineProperty ? Reflect.defineProperty : Object.defineProperty;
var defineProperty = function defineProperty2(obj2, key, val) {
  if (!isobject(obj2) && typeof obj2 !== "function" && !Array.isArray(obj2)) {
    throw new TypeError("expected an object, function, or array");
  }
  if (typeof key !== "string") {
    throw new TypeError('expected "key" to be a string');
  }
  if (isDescriptor(val)) {
    define$4(obj2, key, val);
    return obj2;
  }
  define$4(obj2, key, {
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
var isPlainObject$2 = function isPlainObject2(o) {
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
var isPlainObject$1 = isPlainObject$2;
var isExtendable$3 = function isExtendable2(val) {
  return isPlainObject$1(val) || typeof val === "function" || Array.isArray(val);
};
/*!
 * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var assignSymbols$2 = function(receiver, objects) {
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
  var len = arguments.length, i2 = 0;
  while (++i2 < len) {
    var provider = Object(arguments[i2]);
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
var isExtendable$2 = isExtendable$3;
var assignSymbols$1 = assignSymbols$2;
var extendShallow$1 = Object.assign || function(obj2) {
  if (obj2 === null || typeof obj2 === "undefined") {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  if (!isObject$3(obj2)) {
    obj2 = {};
  }
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var val = arguments[i2];
    if (isString$2(val)) {
      val = toObject$1(val);
    }
    if (isObject$3(val)) {
      assign$3(obj2, val);
      assignSymbols$1(obj2, val);
    }
  }
  return obj2;
};
function assign$3(a, b) {
  for (var key in b) {
    if (hasOwn$1(b, key)) {
      a[key] = b[key];
    }
  }
}
function isString$2(val) {
  return val && typeof val === "string";
}
function toObject$1(str2) {
  var obj2 = {};
  for (var i2 in str2) {
    obj2[i2] = str2[i2];
  }
  return obj2;
}
function isObject$3(val) {
  return val && typeof val === "object" || isExtendable$2(val);
}
function hasOwn$1(obj2, key) {
  return Object.prototype.hasOwnProperty.call(obj2, key);
}
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var isPlainObject = isPlainObject$2;
var isExtendable$1 = function isExtendable3(val) {
  return isPlainObject(val) || typeof val === "function" || Array.isArray(val);
};
var isExtendable = isExtendable$1;
var assignSymbols = assignSymbols$2;
var extendShallow = Object.assign || function(obj2) {
  if (obj2 === null || typeof obj2 === "undefined") {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  if (!isObject$2(obj2)) {
    obj2 = {};
  }
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var val = arguments[i2];
    if (isString$1(val)) {
      val = toObject(val);
    }
    if (isObject$2(val)) {
      assign$2(obj2, val);
      assignSymbols(obj2, val);
    }
  }
  return obj2;
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
  var obj2 = {};
  for (var i2 in str2) {
    obj2[i2] = str2[i2];
  }
  return obj2;
}
function isObject$2(val) {
  return val && typeof val === "object" || isExtendable(val);
}
function hasOwn(obj2, key) {
  return Object.prototype.hasOwnProperty.call(obj2, key);
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
var define$3 = defineProperty;
var extend = extendShallow$1;
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
  var flags = opts.flags || "";
  var regex2;
  if (opts.nocase === true && !/i/.test(flags)) {
    flags += "i";
  }
  try {
    if (opts.negate || typeof opts.strictNegate === "boolean") {
      pattern = not.create(pattern, opts);
    }
    var str2 = open + "(?:" + pattern + ")" + close;
    regex2 = new RegExp(str2, flags);
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
  define$3(regex2, "cached", true);
  define$3(regex2, "pattern", pattern);
  define$3(regex2, "options", options);
  define$3(regex2, "key", key);
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
      var cursor = 1, tree_length = parse_tree.length, arg, output = "", i2, k, ph, pad, pad_character, pad_length, is_positive, sign2;
      for (i2 = 0; i2 < tree_length; i2++) {
        if (typeof parse_tree[i2] === "string") {
          output += parse_tree[i2];
        } else if (typeof parse_tree[i2] === "object") {
          ph = parse_tree[i2];
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
            pad = ph.width ? pad_length > 0 ? pad_character.repeat(pad_length) : "" : "";
            output += ph.align ? sign2 + arg + pad : pad_character === "0" ? sign2 + pad + arg : pad + sign2 + arg;
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
    for (let i2 = 0; i2 < this.types.length; i2++) {
      const typeObj = this.types[i2], typeId = typeObj.type;
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
        for (let k = 0; k < loopOn.length; k++) {
          for (let j = 0; j < typeObj.of.length; j++) {
            const type = typeObj.of[j];
            const idx = loopOn[k];
            const v2 = typeOf2 === "Map" ? value.get(idx) : value[idx];
            const ofRes = this._isType(v2, type, settings);
            if (ofRes !== true) {
              issues[typeObj.type] = {
                expected: {
                  type: typeObj.type
                },
                received: {
                  type: __typeof(v2),
                  value: v2
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
          resultValue.forEach((v2) => {
            const processedValue = this._processRule(v2, ruleObj2, propName, params, ruleSettings, settings);
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
  if (stringArray)
    stringArray = stringArray.map((item) => __unquote(item));
  let argsObj = {};
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
        argsObj[i2] = currentValue;
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
  static override(definition) {
    const _this = this;
    class SInterfaceOverrided extends this {
    }
    SInterfaceOverrided.overridedName = `${_this.name} (overrided)`;
    SInterfaceOverrided.definition = __deepMerge(_this.definition, definition);
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
    this._id = id;
  }
  save(state) {
    return new Promise((resolve) => {
      window.localStorage.setItem(`state-${this._id}`, JSON.stringify(state));
      resolve();
    });
  }
  load() {
    return new Promise((resolve) => {
      var _a3;
      resolve(JSON.parse((_a3 = window.localStorage.getItem(`state-${this._id}`)) !== null && _a3 !== void 0 ? _a3 : "{}"));
    });
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
    this._id = id;
    this._settings = settings;
  }
  _init() {
    var _a3, _b2;
    return __awaiter$b(this, void 0, void 0, function* () {
      const _packageTmpDir = (yield __vitePreload(() => import("./packageTmpDir.fe077f35.js"), true ? [] : void 0)).default;
      this._statesDir = (_b2 = (_a3 = this._settings) === null || _a3 === void 0 ? void 0 : _a3.folder) !== null && _b2 !== void 0 ? _b2 : `${_packageTmpDir()}/states`;
      this._stateFile = `${this._statesDir}/${this._id}.state.json`;
    });
  }
  save(state) {
    return new Promise((resolve) => __awaiter$b(this, void 0, void 0, function* () {
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
    return new Promise((resolve) => __awaiter$b(this, void 0, void 0, function* () {
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
class SState extends SClass {
  constructor(object, settings) {
    super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
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
          this.settings.adapter.save(JSON.parse(JSON.stringify(proxy)));
        });
      }
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
    (() => __awaiter$a(this, void 0, void 0, function* () {
      if (this.settings.save) {
        const restoredState = yield this.settings.adapter.load();
        __deepAssign(proxy, restoredState);
      }
    }))();
    return proxy;
  }
}
function orRegex(regexes, flag) {
  if (flag === void 0) {
    flag = "i";
  }
  return new RegExp(regexes.map(function(r) {
    return r.source;
  }).join("|"), flag);
}
var HEXADECIMAL = /^(([0-9a-f])+([.]([0-9a-f])+)?)$/i;
var HEX_SHORT_WITHOUT_ALPHA = /^#(?:([0-9a-f]{3}))$/i;
var HEX_SHORT_WITH_ALPHA = /^#(?:([0-9a-f]{3})([0-9a-f]{1}))$/i;
var HEX_SHORT = orRegex([HEX_SHORT_WITHOUT_ALPHA, HEX_SHORT_WITH_ALPHA]);
var HEX_LONG_WITHOUT_ALPHA = /^#(?:([0-9a-f]{6}))$/i;
var HEX_LONG_WITH_ALPHA = /^#(?:([0-9a-f]{6})([0-9a-f]{2}))$/i;
var HEX_LONG = orRegex([HEX_LONG_WITHOUT_ALPHA, HEX_LONG_WITH_ALPHA]);
var HEX_COLOR = orRegex([HEX_SHORT, HEX_LONG]);
var HEX_ALPHA = /[0-9a-f]{2}$/i;
var HEX_REGEX = {
  generic: HEXADECIMAL,
  shortWithoutAlpha: HEX_SHORT_WITHOUT_ALPHA,
  shortWithAlpha: HEX_SHORT_WITH_ALPHA,
  short: HEX_SHORT,
  longWithoutAlpha: HEX_LONG_WITHOUT_ALPHA,
  longWithAlpha: HEX_LONG_WITH_ALPHA,
  long: HEX_LONG,
  color: HEX_COLOR,
  alpha: HEX_ALPHA
};
function between(value, range2) {
  var min = Math.min.apply(Math, range2);
  var max2 = Math.max.apply(Math, range2);
  return value >= min && value <= max2;
}
function hexadecimalToDecimal(hexadecimal) {
  if (!HEX_REGEX.generic.test(hexadecimal))
    throw new Error(hexadecimal + " is not a valid hexadecimal string.");
  var _a3 = hexadecimal.split("."), integerPart = _a3[0], decimalPart = _a3[1];
  if (!decimalPart)
    return parseInt(integerPart, 16);
  return parseInt(integerPart, 16) + parseInt(decimalPart, 16) / Math.pow(16, decimalPart.length);
}
function sameContent(a, b) {
  return a.sort().toString() === b.sort().toString();
}
function applyFnToEachObjValue(obj2, fn2) {
  var newObj = Object.assign({}, obj2);
  Object.entries(newObj).forEach(function(_a3) {
    var key = _a3[0], value = _a3[1];
    newObj[key] = fn2(value);
  });
  return newObj;
}
function isHex(color) {
  return HEX_REGEX.color.test(color);
}
function isRgb(color) {
  var keys3 = Object.keys(color);
  if (keys3.length !== 3)
    return false;
  if (!sameContent(keys3, ["r", "g", "b"]))
    return false;
  var isValid = function(value) {
    return typeof value === "number" && between(value, [0, 255]);
  };
  var r = isValid(color.r);
  var g2 = isValid(color.g);
  var b = isValid(color.b);
  return r && g2 && b;
}
function isRgba(color) {
  var keys3 = Object.keys(color);
  if (keys3.length !== 4)
    return false;
  if (!sameContent(keys3, ["r", "g", "b", "a"]))
    return false;
  var r = color.r, g2 = color.g, b = color.b;
  var isValidRgb = isRgb({ r, g: g2, b });
  var a = typeof color.a === "number" && between(color.a, [0, 1]);
  return isValidRgb && a;
}
function isHsl(color) {
  var keys3 = Object.keys(color);
  if (keys3.length !== 3)
    return false;
  if (!sameContent(keys3, ["h", "s", "l"]))
    return false;
  var isValid = function(value, range2) {
    return typeof value === "number" && between(value, range2);
  };
  var h = isValid(color.h, [0, 359]);
  var s = isValid(color.s, [0, 100]);
  var l = isValid(color.l, [0, 100]);
  return h && s && l;
}
function isHsla(color) {
  var keys3 = Object.keys(color);
  if (keys3.length !== 4)
    return false;
  if (!sameContent(keys3, ["h", "s", "l", "a"]))
    return false;
  var h = color.h, s = color.s, l = color.l;
  var isValidHsl = isHsl({ h, s, l });
  var a = typeof color.a === "number" && between(color.a, [0, 1]);
  return isValidHsl && a;
}
var lodash = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
(function(module, exports) {
  (function() {
    var undefined$12;
    var VERSION = "4.17.21";
    var LARGE_ARRAY_SIZE = 200;
    var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var MAX_MEMOIZE_SIZE = 500;
    var PLACEHOLDER = "__lodash_placeholder__";
    var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
    var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
    var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
    var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
    var HOT_COUNT = 800, HOT_SPAN = 16;
    var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
    var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
    var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
    var wrapFlags = [
      ["ary", WRAP_ARY_FLAG],
      ["bind", WRAP_BIND_FLAG],
      ["bindKey", WRAP_BIND_KEY_FLAG],
      ["curry", WRAP_CURRY_FLAG],
      ["curryRight", WRAP_CURRY_RIGHT_FLAG],
      ["flip", WRAP_FLIP_FLAG],
      ["partial", WRAP_PARTIAL_FLAG],
      ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
      ["rearg", WRAP_REARG_FLAG]
    ];
    var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
    var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
    var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
    var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
    var reTrimStart = /^\s+/;
    var reWhitespace = /\s/;
    var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
    var reEscapeChar2 = /\\(\\)?/g;
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
    var reFlags = /\w*$/;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    var reNoMatch = /($^)/;
    var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
    var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
    var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
    var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reApos = RegExp(rsApos, "g");
    var reComboMark = RegExp(rsCombo, "g");
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    var reUnicodeWord = RegExp([
      rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
      rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
      rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
      rsUpper + "+" + rsOptContrUpper,
      rsOrdUpper,
      rsOrdLower,
      rsDigits,
      rsEmoji
    ].join("|"), "g");
    var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    var contextProps = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ];
    var templateCounter = -1;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    var deburredLetters = {
      "\xC0": "A",
      "\xC1": "A",
      "\xC2": "A",
      "\xC3": "A",
      "\xC4": "A",
      "\xC5": "A",
      "\xE0": "a",
      "\xE1": "a",
      "\xE2": "a",
      "\xE3": "a",
      "\xE4": "a",
      "\xE5": "a",
      "\xC7": "C",
      "\xE7": "c",
      "\xD0": "D",
      "\xF0": "d",
      "\xC8": "E",
      "\xC9": "E",
      "\xCA": "E",
      "\xCB": "E",
      "\xE8": "e",
      "\xE9": "e",
      "\xEA": "e",
      "\xEB": "e",
      "\xCC": "I",
      "\xCD": "I",
      "\xCE": "I",
      "\xCF": "I",
      "\xEC": "i",
      "\xED": "i",
      "\xEE": "i",
      "\xEF": "i",
      "\xD1": "N",
      "\xF1": "n",
      "\xD2": "O",
      "\xD3": "O",
      "\xD4": "O",
      "\xD5": "O",
      "\xD6": "O",
      "\xD8": "O",
      "\xF2": "o",
      "\xF3": "o",
      "\xF4": "o",
      "\xF5": "o",
      "\xF6": "o",
      "\xF8": "o",
      "\xD9": "U",
      "\xDA": "U",
      "\xDB": "U",
      "\xDC": "U",
      "\xF9": "u",
      "\xFA": "u",
      "\xFB": "u",
      "\xFC": "u",
      "\xDD": "Y",
      "\xFD": "y",
      "\xFF": "y",
      "\xC6": "Ae",
      "\xE6": "ae",
      "\xDE": "Th",
      "\xFE": "th",
      "\xDF": "ss",
      "\u0100": "A",
      "\u0102": "A",
      "\u0104": "A",
      "\u0101": "a",
      "\u0103": "a",
      "\u0105": "a",
      "\u0106": "C",
      "\u0108": "C",
      "\u010A": "C",
      "\u010C": "C",
      "\u0107": "c",
      "\u0109": "c",
      "\u010B": "c",
      "\u010D": "c",
      "\u010E": "D",
      "\u0110": "D",
      "\u010F": "d",
      "\u0111": "d",
      "\u0112": "E",
      "\u0114": "E",
      "\u0116": "E",
      "\u0118": "E",
      "\u011A": "E",
      "\u0113": "e",
      "\u0115": "e",
      "\u0117": "e",
      "\u0119": "e",
      "\u011B": "e",
      "\u011C": "G",
      "\u011E": "G",
      "\u0120": "G",
      "\u0122": "G",
      "\u011D": "g",
      "\u011F": "g",
      "\u0121": "g",
      "\u0123": "g",
      "\u0124": "H",
      "\u0126": "H",
      "\u0125": "h",
      "\u0127": "h",
      "\u0128": "I",
      "\u012A": "I",
      "\u012C": "I",
      "\u012E": "I",
      "\u0130": "I",
      "\u0129": "i",
      "\u012B": "i",
      "\u012D": "i",
      "\u012F": "i",
      "\u0131": "i",
      "\u0134": "J",
      "\u0135": "j",
      "\u0136": "K",
      "\u0137": "k",
      "\u0138": "k",
      "\u0139": "L",
      "\u013B": "L",
      "\u013D": "L",
      "\u013F": "L",
      "\u0141": "L",
      "\u013A": "l",
      "\u013C": "l",
      "\u013E": "l",
      "\u0140": "l",
      "\u0142": "l",
      "\u0143": "N",
      "\u0145": "N",
      "\u0147": "N",
      "\u014A": "N",
      "\u0144": "n",
      "\u0146": "n",
      "\u0148": "n",
      "\u014B": "n",
      "\u014C": "O",
      "\u014E": "O",
      "\u0150": "O",
      "\u014D": "o",
      "\u014F": "o",
      "\u0151": "o",
      "\u0154": "R",
      "\u0156": "R",
      "\u0158": "R",
      "\u0155": "r",
      "\u0157": "r",
      "\u0159": "r",
      "\u015A": "S",
      "\u015C": "S",
      "\u015E": "S",
      "\u0160": "S",
      "\u015B": "s",
      "\u015D": "s",
      "\u015F": "s",
      "\u0161": "s",
      "\u0162": "T",
      "\u0164": "T",
      "\u0166": "T",
      "\u0163": "t",
      "\u0165": "t",
      "\u0167": "t",
      "\u0168": "U",
      "\u016A": "U",
      "\u016C": "U",
      "\u016E": "U",
      "\u0170": "U",
      "\u0172": "U",
      "\u0169": "u",
      "\u016B": "u",
      "\u016D": "u",
      "\u016F": "u",
      "\u0171": "u",
      "\u0173": "u",
      "\u0174": "W",
      "\u0175": "w",
      "\u0176": "Y",
      "\u0177": "y",
      "\u0178": "Y",
      "\u0179": "Z",
      "\u017B": "Z",
      "\u017D": "Z",
      "\u017A": "z",
      "\u017C": "z",
      "\u017E": "z",
      "\u0132": "IJ",
      "\u0133": "ij",
      "\u0152": "Oe",
      "\u0153": "oe",
      "\u0149": "'n",
      "\u017F": "s"
    };
    var htmlEscapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    var htmlUnescapes = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    };
    var stringEscapes = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    };
    var freeParseFloat = parseFloat, freeParseInt = parseInt;
    var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types2 = freeModule && freeModule.require && freeModule.require("util").types;
        if (types2) {
          return types2;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function arrayAggregator(array, setter, iteratee, accumulator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
      }
      return accumulator;
    }
    function arrayEach(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEachRight(array, iteratee) {
      var length = array == null ? 0 : array.length;
      while (length--) {
        if (iteratee(array[length], length, array) === false) {
          break;
        }
      }
      return array;
    }
    function arrayEvery(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (!predicate(array[index], index, array)) {
          return false;
        }
      }
      return true;
    }
    function arrayFilter(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result2[resIndex++] = value;
        }
      }
      return result2;
    }
    function arrayIncludes(array, value) {
      var length = array == null ? 0 : array.length;
      return !!length && baseIndexOf(array, value, 0) > -1;
    }
    function arrayIncludesWith(array, value, comparator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (comparator(value, array[index])) {
          return true;
        }
      }
      return false;
    }
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result2 = Array(length);
      while (++index < length) {
        result2[index] = iteratee(array[index], index, array);
      }
      return result2;
    }
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1, length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    function arrayReduceRight(array, iteratee, accumulator, initAccum) {
      var length = array == null ? 0 : array.length;
      if (initAccum && length) {
        accumulator = array[--length];
      }
      while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
      }
      return accumulator;
    }
    function arraySome(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    var asciiSize = baseProperty("length");
    function asciiToArray(string2) {
      return string2.split("");
    }
    function asciiWords(string2) {
      return string2.match(reAsciiWord) || [];
    }
    function baseFindKey(collection, predicate, eachFunc) {
      var result2;
      eachFunc(collection, function(value, key, collection2) {
        if (predicate(value, key, collection2)) {
          result2 = key;
          return false;
        }
      });
      return result2;
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
      return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
    }
    function baseIndexOfWith(array, value, fromIndex, comparator) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (comparator(array[index], value)) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function baseMean(array, iteratee) {
      var length = array == null ? 0 : array.length;
      return length ? baseSum(array, iteratee) / length : NAN;
    }
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined$12 : object[key];
      };
    }
    function basePropertyOf(object) {
      return function(key) {
        return object == null ? undefined$12 : object[key];
      };
    }
    function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
      eachFunc(collection, function(value, index, collection2) {
        accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
      });
      return accumulator;
    }
    function baseSortBy(array, comparer) {
      var length = array.length;
      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }
    function baseSum(array, iteratee) {
      var result2, index = -1, length = array.length;
      while (++index < length) {
        var current = iteratee(array[index]);
        if (current !== undefined$12) {
          result2 = result2 === undefined$12 ? current : result2 + current;
        }
      }
      return result2;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result2 = Array(n);
      while (++index < n) {
        result2[index] = iteratee(index);
      }
      return result2;
    }
    function baseToPairs(object, props) {
      return arrayMap(props, function(key) {
        return [key, object[key]];
      });
    }
    function baseTrim(string2) {
      return string2 ? string2.slice(0, trimmedEndIndex(string2) + 1).replace(reTrimStart, "") : string2;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }
    function cacheHas(cache2, key) {
      return cache2.has(key);
    }
    function charsStartIndex(strSymbols, chrSymbols) {
      var index = -1, length = strSymbols.length;
      while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function charsEndIndex(strSymbols, chrSymbols) {
      var index = strSymbols.length;
      while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
      }
      return index;
    }
    function countHolders(array, placeholder) {
      var length = array.length, result2 = 0;
      while (length--) {
        if (array[length] === placeholder) {
          ++result2;
        }
      }
      return result2;
    }
    var deburrLetter = basePropertyOf(deburredLetters);
    var escapeHtmlChar = basePropertyOf(htmlEscapes);
    function escapeStringChar(chr) {
      return "\\" + stringEscapes[chr];
    }
    function getValue(object, key) {
      return object == null ? undefined$12 : object[key];
    }
    function hasUnicode(string2) {
      return reHasUnicode.test(string2);
    }
    function hasUnicodeWord(string2) {
      return reHasUnicodeWord.test(string2);
    }
    function iteratorToArray(iterator) {
      var data, result2 = [];
      while (!(data = iterator.next()).done) {
        result2.push(data.value);
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
    function replaceHolders(array, placeholder) {
      var index = -1, length = array.length, resIndex = 0, result2 = [];
      while (++index < length) {
        var value = array[index];
        if (value === placeholder || value === PLACEHOLDER) {
          array[index] = PLACEHOLDER;
          result2[resIndex++] = index;
        }
      }
      return result2;
    }
    function setToArray(set) {
      var index = -1, result2 = Array(set.size);
      set.forEach(function(value) {
        result2[++index] = value;
      });
      return result2;
    }
    function setToPairs(set) {
      var index = -1, result2 = Array(set.size);
      set.forEach(function(value) {
        result2[++index] = [value, value];
      });
      return result2;
    }
    function strictIndexOf(array, value, fromIndex) {
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function strictLastIndexOf(array, value, fromIndex) {
      var index = fromIndex + 1;
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return index;
    }
    function stringSize(string2) {
      return hasUnicode(string2) ? unicodeSize(string2) : asciiSize(string2);
    }
    function stringToArray(string2) {
      return hasUnicode(string2) ? unicodeToArray(string2) : asciiToArray(string2);
    }
    function trimmedEndIndex(string2) {
      var index = string2.length;
      while (index-- && reWhitespace.test(string2.charAt(index))) {
      }
      return index;
    }
    var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
    function unicodeSize(string2) {
      var result2 = reUnicode.lastIndex = 0;
      while (reUnicode.test(string2)) {
        ++result2;
      }
      return result2;
    }
    function unicodeToArray(string2) {
      return string2.match(reUnicode) || [];
    }
    function unicodeWords(string2) {
      return string2.match(reUnicodeWord) || [];
    }
    var runInContext = function runInContext2(context) {
      context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
      var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
      var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
      var coreJsData = context["__core-js_shared__"];
      var funcToString = funcProto.toString;
      var hasOwnProperty2 = objectProto.hasOwnProperty;
      var idCounter = 0;
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      var nativeObjectToString = objectProto.toString;
      var objectCtorString = funcToString.call(Object2);
      var oldDash = root._;
      var reIsNative = RegExp2(
        "^" + funcToString.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      var Buffer2 = moduleExports ? context.Buffer : undefined$12, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined$12, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined$12, symIterator = Symbol2 ? Symbol2.iterator : undefined$12, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined$12;
      var defineProperty3 = function() {
        try {
          var func = getNative(Object2, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e) {
        }
      }();
      var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
      var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined$12, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
      var DataView2 = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap2 = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
      var metaMap = WeakMap2 && new WeakMap2();
      var realNames = {};
      var dataViewCtorString = toSource(DataView2), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
      var symbolProto = Symbol2 ? Symbol2.prototype : undefined$12, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined$12, symbolToString = symbolProto ? symbolProto.toString : undefined$12;
      function lodash2(value) {
        if (isObjectLike(value) && !isArray2(value) && !(value instanceof LazyWrapper)) {
          if (value instanceof LodashWrapper) {
            return value;
          }
          if (hasOwnProperty2.call(value, "__wrapped__")) {
            return wrapperClone(value);
          }
        }
        return new LodashWrapper(value);
      }
      var baseCreate = function() {
        function object() {
        }
        return function(proto2) {
          if (!isObject3(proto2)) {
            return {};
          }
          if (objectCreate) {
            return objectCreate(proto2);
          }
          object.prototype = proto2;
          var result3 = new object();
          object.prototype = undefined$12;
          return result3;
        };
      }();
      function baseLodash() {
      }
      function LodashWrapper(value, chainAll) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__chain__ = !!chainAll;
        this.__index__ = 0;
        this.__values__ = undefined$12;
      }
      lodash2.templateSettings = {
        "escape": reEscape,
        "evaluate": reEvaluate,
        "interpolate": reInterpolate,
        "variable": "",
        "imports": {
          "_": lodash2
        }
      };
      lodash2.prototype = baseLodash.prototype;
      lodash2.prototype.constructor = lodash2;
      LodashWrapper.prototype = baseCreate(baseLodash.prototype);
      LodashWrapper.prototype.constructor = LodashWrapper;
      function LazyWrapper(value) {
        this.__wrapped__ = value;
        this.__actions__ = [];
        this.__dir__ = 1;
        this.__filtered__ = false;
        this.__iteratees__ = [];
        this.__takeCount__ = MAX_ARRAY_LENGTH;
        this.__views__ = [];
      }
      function lazyClone() {
        var result3 = new LazyWrapper(this.__wrapped__);
        result3.__actions__ = copyArray(this.__actions__);
        result3.__dir__ = this.__dir__;
        result3.__filtered__ = this.__filtered__;
        result3.__iteratees__ = copyArray(this.__iteratees__);
        result3.__takeCount__ = this.__takeCount__;
        result3.__views__ = copyArray(this.__views__);
        return result3;
      }
      function lazyReverse() {
        if (this.__filtered__) {
          var result3 = new LazyWrapper(this);
          result3.__dir__ = -1;
          result3.__filtered__ = true;
        } else {
          result3 = this.clone();
          result3.__dir__ *= -1;
        }
        return result3;
      }
      function lazyValue() {
        var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray2(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
        if (!isArr || !isRight && arrLength == length && takeCount == length) {
          return baseWrapperValue(array, this.__actions__);
        }
        var result3 = [];
        outer:
          while (length-- && resIndex < takeCount) {
            index += dir;
            var iterIndex = -1, value = array[index];
            while (++iterIndex < iterLength) {
              var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
              if (type == LAZY_MAP_FLAG) {
                value = computed;
              } else if (!computed) {
                if (type == LAZY_FILTER_FLAG) {
                  continue outer;
                } else {
                  break outer;
                }
              }
            }
            result3[resIndex++] = value;
          }
        return result3;
      }
      LazyWrapper.prototype = baseCreate(baseLodash.prototype);
      LazyWrapper.prototype.constructor = LazyWrapper;
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }
      function hashDelete(key) {
        var result3 = this.has(key) && delete this.__data__[key];
        this.size -= result3 ? 1 : 0;
        return result3;
      }
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result3 = data[key];
          return result3 === HASH_UNDEFINED ? undefined$12 : result3;
        }
        return hasOwnProperty2.call(data, key) ? data[key] : undefined$12;
      }
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== undefined$12 : hasOwnProperty2.call(data, key);
      }
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === undefined$12 ? HASH_UNDEFINED : value;
        return this;
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
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
        --this.size;
        return true;
      }
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? undefined$12 : data[index][1];
      }
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          ++this.size;
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
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map2 || ListCache)(),
          "string": new Hash()
        };
      }
      function mapCacheDelete(key) {
        var result3 = getMapData(this, key)["delete"](key);
        this.size -= result3 ? 1 : 0;
        return result3;
      }
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      function mapCacheSet(key, value) {
        var data = getMapData(this, key), size2 = data.size;
        data.set(key, value);
        this.size += data.size == size2 ? 0 : 1;
        return this;
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      function SetCache(values2) {
        var index = -1, length = values2 == null ? 0 : values2.length;
        this.__data__ = new MapCache();
        while (++index < length) {
          this.add(values2[index]);
        }
      }
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }
      function stackClear() {
        this.__data__ = new ListCache();
        this.size = 0;
      }
      function stackDelete(key) {
        var data = this.__data__, result3 = data["delete"](key);
        this.size = data.size;
        return result3;
      }
      function stackGet(key) {
        return this.__data__.get(key);
      }
      function stackHas(key) {
        return this.__data__.has(key);
      }
      function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
          var pairs = data.__data__;
          if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
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
      Stack.prototype.clear = stackClear;
      Stack.prototype["delete"] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray2(value), isArg = !isArr && isArguments5(value), isBuff = !isArr && !isArg && isBuffer2(value), isType = !isArr && !isArg && !isBuff && isTypedArray2(value), skipIndexes = isArr || isArg || isBuff || isType, result3 = skipIndexes ? baseTimes(value.length, String2) : [], length = result3.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
            result3.push(key);
          }
        }
        return result3;
      }
      function arraySample(array) {
        var length = array.length;
        return length ? array[baseRandom(0, length - 1)] : undefined$12;
      }
      function arraySampleSize(array, n) {
        return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
      }
      function arrayShuffle(array) {
        return shuffleSelf(copyArray(array));
      }
      function assignMergeValue(object, key, value) {
        if (value !== undefined$12 && !eq(object[key], value) || value === undefined$12 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty2.call(object, key) && eq(objValue, value)) || value === undefined$12 && !(key in object)) {
          baseAssignValue(object, key, value);
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
      function baseAggregator(collection, setter, iteratee2, accumulator) {
        baseEach(collection, function(value, key, collection2) {
          setter(accumulator, value, iteratee2(value), collection2);
        });
        return accumulator;
      }
      function baseAssign(object, source2) {
        return object && copyObject(source2, keys3(source2), object);
      }
      function baseAssignIn(object, source2) {
        return object && copyObject(source2, keysIn(source2), object);
      }
      function baseAssignValue(object, key, value) {
        if (key == "__proto__" && defineProperty3) {
          defineProperty3(object, key, {
            "configurable": true,
            "enumerable": true,
            "value": value,
            "writable": true
          });
        } else {
          object[key] = value;
        }
      }
      function baseAt(object, paths) {
        var index = -1, length = paths.length, result3 = Array2(length), skip = object == null;
        while (++index < length) {
          result3[index] = skip ? undefined$12 : get2(object, paths[index]);
        }
        return result3;
      }
      function baseClamp(number, lower, upper) {
        if (number === number) {
          if (upper !== undefined$12) {
            number = number <= upper ? number : upper;
          }
          if (lower !== undefined$12) {
            number = number >= lower ? number : lower;
          }
        }
        return number;
      }
      function baseClone(value, bitmask, customizer, key, object, stack) {
        var result3, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
        if (customizer) {
          result3 = object ? customizer(value, key, object, stack) : customizer(value);
        }
        if (result3 !== undefined$12) {
          return result3;
        }
        if (!isObject3(value)) {
          return value;
        }
        var isArr = isArray2(value);
        if (isArr) {
          result3 = initCloneArray(value);
          if (!isDeep) {
            return copyArray(value, result3);
          }
        } else {
          var tag2 = getTag(value), isFunc = tag2 == funcTag || tag2 == genTag;
          if (isBuffer2(value)) {
            return cloneBuffer(value, isDeep);
          }
          if (tag2 == objectTag || tag2 == argsTag || isFunc && !object) {
            result3 = isFlat || isFunc ? {} : initCloneObject(value);
            if (!isDeep) {
              return isFlat ? copySymbolsIn(value, baseAssignIn(result3, value)) : copySymbols(value, baseAssign(result3, value));
            }
          } else {
            if (!cloneableTags[tag2]) {
              return object ? value : {};
            }
            result3 = initCloneByTag(value, tag2, isDeep);
          }
        }
        stack || (stack = new Stack());
        var stacked = stack.get(value);
        if (stacked) {
          return stacked;
        }
        stack.set(value, result3);
        if (isSet3(value)) {
          value.forEach(function(subValue) {
            result3.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
          });
        } else if (isMap3(value)) {
          value.forEach(function(subValue, key2) {
            result3.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
        }
        var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys3;
        var props = isArr ? undefined$12 : keysFunc(value);
        arrayEach(props || value, function(subValue, key2) {
          if (props) {
            key2 = subValue;
            subValue = value[key2];
          }
          assignValue(result3, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
        });
        return result3;
      }
      function baseConforms(source2) {
        var props = keys3(source2);
        return function(object) {
          return baseConformsTo(object, source2, props);
        };
      }
      function baseConformsTo(object, source2, props) {
        var length = props.length;
        if (object == null) {
          return !length;
        }
        object = Object2(object);
        while (length--) {
          var key = props[length], predicate = source2[key], value = object[key];
          if (value === undefined$12 && !(key in object) || !predicate(value)) {
            return false;
          }
        }
        return true;
      }
      function baseDelay(func, wait, args) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        return setTimeout2(function() {
          func.apply(undefined$12, args);
        }, wait);
      }
      function baseDifference(array, values2, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result3 = [], valuesLength = values2.length;
        if (!length) {
          return result3;
        }
        if (iteratee2) {
          values2 = arrayMap(values2, baseUnary(iteratee2));
        }
        if (comparator) {
          includes2 = arrayIncludesWith;
          isCommon = false;
        } else if (values2.length >= LARGE_ARRAY_SIZE) {
          includes2 = cacheHas;
          isCommon = false;
          values2 = new SetCache(values2);
        }
        outer:
          while (++index < length) {
            var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var valuesIndex = valuesLength;
              while (valuesIndex--) {
                if (values2[valuesIndex] === computed) {
                  continue outer;
                }
              }
              result3.push(value);
            } else if (!includes2(values2, computed, comparator)) {
              result3.push(value);
            }
          }
        return result3;
      }
      var baseEach = createBaseEach(baseForOwn);
      var baseEachRight = createBaseEach(baseForOwnRight, true);
      function baseEvery(collection, predicate) {
        var result3 = true;
        baseEach(collection, function(value, index, collection2) {
          result3 = !!predicate(value, index, collection2);
          return result3;
        });
        return result3;
      }
      function baseExtremum(array, iteratee2, comparator) {
        var index = -1, length = array.length;
        while (++index < length) {
          var value = array[index], current = iteratee2(value);
          if (current != null && (computed === undefined$12 ? current === current && !isSymbol2(current) : comparator(current, computed))) {
            var computed = current, result3 = value;
          }
        }
        return result3;
      }
      function baseFill(array, value, start, end) {
        var length = array.length;
        start = toInteger2(start);
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end === undefined$12 || end > length ? length : toInteger2(end);
        if (end < 0) {
          end += length;
        }
        end = start > end ? 0 : toLength(end);
        while (start < end) {
          array[start++] = value;
        }
        return array;
      }
      function baseFilter(collection, predicate) {
        var result3 = [];
        baseEach(collection, function(value, index, collection2) {
          if (predicate(value, index, collection2)) {
            result3.push(value);
          }
        });
        return result3;
      }
      function baseFlatten(array, depth, predicate, isStrict, result3) {
        var index = -1, length = array.length;
        predicate || (predicate = isFlattenable);
        result3 || (result3 = []);
        while (++index < length) {
          var value = array[index];
          if (depth > 0 && predicate(value)) {
            if (depth > 1) {
              baseFlatten(value, depth - 1, predicate, isStrict, result3);
            } else {
              arrayPush(result3, value);
            }
          } else if (!isStrict) {
            result3[result3.length] = value;
          }
        }
        return result3;
      }
      var baseFor = createBaseFor();
      var baseForRight = createBaseFor(true);
      function baseForOwn(object, iteratee2) {
        return object && baseFor(object, iteratee2, keys3);
      }
      function baseForOwnRight(object, iteratee2) {
        return object && baseForRight(object, iteratee2, keys3);
      }
      function baseFunctions(object, props) {
        return arrayFilter(props, function(key) {
          return isFunction2(object[key]);
        });
      }
      function baseGet(object, path2) {
        path2 = castPath(path2, object);
        var index = 0, length = path2.length;
        while (object != null && index < length) {
          object = object[toKey(path2[index++])];
        }
        return index && index == length ? object : undefined$12;
      }
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result3 = keysFunc(object);
        return isArray2(object) ? result3 : arrayPush(result3, symbolsFunc(object));
      }
      function baseGetTag(value) {
        if (value == null) {
          return value === undefined$12 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
      }
      function baseGt(value, other) {
        return value > other;
      }
      function baseHas(object, key) {
        return object != null && hasOwnProperty2.call(object, key);
      }
      function baseHasIn(object, key) {
        return object != null && key in Object2(object);
      }
      function baseInRange(number, start, end) {
        return number >= nativeMin(start, end) && number < nativeMax(start, end);
      }
      function baseIntersection(arrays, iteratee2, comparator) {
        var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result3 = [];
        while (othIndex--) {
          var array = arrays[othIndex];
          if (othIndex && iteratee2) {
            array = arrayMap(array, baseUnary(iteratee2));
          }
          maxLength = nativeMin(array.length, maxLength);
          caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined$12;
        }
        array = arrays[0];
        var index = -1, seen2 = caches[0];
        outer:
          while (++index < length && result3.length < maxLength) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (!(seen2 ? cacheHas(seen2, computed) : includes2(result3, computed, comparator))) {
              othIndex = othLength;
              while (--othIndex) {
                var cache2 = caches[othIndex];
                if (!(cache2 ? cacheHas(cache2, computed) : includes2(arrays[othIndex], computed, comparator))) {
                  continue outer;
                }
              }
              if (seen2) {
                seen2.push(computed);
              }
              result3.push(value);
            }
          }
        return result3;
      }
      function baseInverter(object, setter, iteratee2, accumulator) {
        baseForOwn(object, function(value, key, object2) {
          setter(accumulator, iteratee2(value), key, object2);
        });
        return accumulator;
      }
      function baseInvoke(object, path2, args) {
        path2 = castPath(path2, object);
        object = parent(object, path2);
        var func = object == null ? object : object[toKey(last(path2))];
        return func == null ? undefined$12 : apply(func, object, args);
      }
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      function baseIsArrayBuffer(value) {
        return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
      }
      function baseIsDate(value) {
        return isObjectLike(value) && baseGetTag(value) == dateTag;
      }
      function baseIsEqual(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
      }
      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray2(object), othIsArr = isArray2(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer2(object)) {
          if (!isBuffer2(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack());
          return objIsArr || isTypedArray2(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
          var objIsWrapped = objIsObj && hasOwnProperty2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack());
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack());
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
      }
      function baseIsMap(value) {
        return isObjectLike(value) && getTag(value) == mapTag;
      }
      function baseIsMatch(object, source2, matchData, customizer) {
        var index = matchData.length, length = index, noCustomizer = !customizer;
        if (object == null) {
          return !length;
        }
        object = Object2(object);
        while (index--) {
          var data = matchData[index];
          if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
          }
        }
        while (++index < length) {
          data = matchData[index];
          var key = data[0], objValue = object[key], srcValue = data[1];
          if (noCustomizer && data[2]) {
            if (objValue === undefined$12 && !(key in object)) {
              return false;
            }
          } else {
            var stack = new Stack();
            if (customizer) {
              var result3 = customizer(objValue, srcValue, key, object, source2, stack);
            }
            if (!(result3 === undefined$12 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result3)) {
              return false;
            }
          }
        }
        return true;
      }
      function baseIsNative(value) {
        if (!isObject3(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction2(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      function baseIsRegExp(value) {
        return isObjectLike(value) && baseGetTag(value) == regexpTag;
      }
      function baseIsSet(value) {
        return isObjectLike(value) && getTag(value) == setTag;
      }
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      function baseIteratee(value) {
        if (typeof value == "function") {
          return value;
        }
        if (value == null) {
          return identity;
        }
        if (typeof value == "object") {
          return isArray2(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
        }
        return property(value);
      }
      function baseKeys(object) {
        if (!isPrototype2(object)) {
          return nativeKeys(object);
        }
        var result3 = [];
        for (var key in Object2(object)) {
          if (hasOwnProperty2.call(object, key) && key != "constructor") {
            result3.push(key);
          }
        }
        return result3;
      }
      function baseKeysIn(object) {
        if (!isObject3(object)) {
          return nativeKeysIn(object);
        }
        var isProto = isPrototype2(object), result3 = [];
        for (var key in object) {
          if (!(key == "constructor" && (isProto || !hasOwnProperty2.call(object, key)))) {
            result3.push(key);
          }
        }
        return result3;
      }
      function baseLt(value, other) {
        return value < other;
      }
      function baseMap(collection, iteratee2) {
        var index = -1, result3 = isArrayLike(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value, key, collection2) {
          result3[++index] = iteratee2(value, key, collection2);
        });
        return result3;
      }
      function baseMatches(source2) {
        var matchData = getMatchData(source2);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable(matchData[0][0], matchData[0][1]);
        }
        return function(object) {
          return object === source2 || baseIsMatch(object, source2, matchData);
        };
      }
      function baseMatchesProperty(path2, srcValue) {
        if (isKey(path2) && isStrictComparable(srcValue)) {
          return matchesStrictComparable(toKey(path2), srcValue);
        }
        return function(object) {
          var objValue = get2(object, path2);
          return objValue === undefined$12 && objValue === srcValue ? hasIn(object, path2) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
        };
      }
      function baseMerge(object, source2, srcIndex, customizer, stack) {
        if (object === source2) {
          return;
        }
        baseFor(source2, function(srcValue, key) {
          stack || (stack = new Stack());
          if (isObject3(srcValue)) {
            baseMergeDeep(object, source2, key, srcIndex, baseMerge, customizer, stack);
          } else {
            var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source2, stack) : undefined$12;
            if (newValue === undefined$12) {
              newValue = srcValue;
            }
            assignMergeValue(object, key, newValue);
          }
        }, keysIn);
      }
      function baseMergeDeep(object, source2, key, srcIndex, mergeFunc, customizer, stack) {
        var objValue = safeGet(object, key), srcValue = safeGet(source2, key), stacked = stack.get(srcValue);
        if (stacked) {
          assignMergeValue(object, key, stacked);
          return;
        }
        var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source2, stack) : undefined$12;
        var isCommon = newValue === undefined$12;
        if (isCommon) {
          var isArr = isArray2(srcValue), isBuff = !isArr && isBuffer2(srcValue), isTyped = !isArr && !isBuff && isTypedArray2(srcValue);
          newValue = srcValue;
          if (isArr || isBuff || isTyped) {
            if (isArray2(objValue)) {
              newValue = objValue;
            } else if (isArrayLikeObject(objValue)) {
              newValue = copyArray(objValue);
            } else if (isBuff) {
              isCommon = false;
              newValue = cloneBuffer(srcValue, true);
            } else if (isTyped) {
              isCommon = false;
              newValue = cloneTypedArray(srcValue, true);
            } else {
              newValue = [];
            }
          } else if (isPlainObject3(srcValue) || isArguments5(srcValue)) {
            newValue = objValue;
            if (isArguments5(objValue)) {
              newValue = toPlainObject2(objValue);
            } else if (!isObject3(objValue) || isFunction2(objValue)) {
              newValue = initCloneObject(srcValue);
            }
          } else {
            isCommon = false;
          }
        }
        if (isCommon) {
          stack.set(srcValue, newValue);
          mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
          stack["delete"](srcValue);
        }
        assignMergeValue(object, key, newValue);
      }
      function baseNth(array, n) {
        var length = array.length;
        if (!length) {
          return;
        }
        n += n < 0 ? length : 0;
        return isIndex(n, length) ? array[n] : undefined$12;
      }
      function baseOrderBy(collection, iteratees, orders) {
        if (iteratees.length) {
          iteratees = arrayMap(iteratees, function(iteratee2) {
            if (isArray2(iteratee2)) {
              return function(value) {
                return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
              };
            }
            return iteratee2;
          });
        } else {
          iteratees = [identity];
        }
        var index = -1;
        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
        var result3 = baseMap(collection, function(value, key, collection2) {
          var criteria = arrayMap(iteratees, function(iteratee2) {
            return iteratee2(value);
          });
          return { "criteria": criteria, "index": ++index, "value": value };
        });
        return baseSortBy(result3, function(object, other) {
          return compareMultiple(object, other, orders);
        });
      }
      function basePick(object, paths) {
        return basePickBy(object, paths, function(value, path2) {
          return hasIn(object, path2);
        });
      }
      function basePickBy(object, paths, predicate) {
        var index = -1, length = paths.length, result3 = {};
        while (++index < length) {
          var path2 = paths[index], value = baseGet(object, path2);
          if (predicate(value, path2)) {
            baseSet(result3, castPath(path2, object), value);
          }
        }
        return result3;
      }
      function basePropertyDeep(path2) {
        return function(object) {
          return baseGet(object, path2);
        };
      }
      function basePullAll(array, values2, iteratee2, comparator) {
        var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen2 = array;
        if (array === values2) {
          values2 = copyArray(values2);
        }
        if (iteratee2) {
          seen2 = arrayMap(array, baseUnary(iteratee2));
        }
        while (++index < length) {
          var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
          while ((fromIndex = indexOf2(seen2, computed, fromIndex, comparator)) > -1) {
            if (seen2 !== array) {
              splice.call(seen2, fromIndex, 1);
            }
            splice.call(array, fromIndex, 1);
          }
        }
        return array;
      }
      function basePullAt(array, indexes) {
        var length = array ? indexes.length : 0, lastIndex = length - 1;
        while (length--) {
          var index = indexes[length];
          if (length == lastIndex || index !== previous) {
            var previous = index;
            if (isIndex(index)) {
              splice.call(array, index, 1);
            } else {
              baseUnset(array, index);
            }
          }
        }
        return array;
      }
      function baseRandom(lower, upper) {
        return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
      }
      function baseRange(start, end, step, fromRight) {
        var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result3 = Array2(length);
        while (length--) {
          result3[fromRight ? length : ++index] = start;
          start += step;
        }
        return result3;
      }
      function baseRepeat(string2, n) {
        var result3 = "";
        if (!string2 || n < 1 || n > MAX_SAFE_INTEGER) {
          return result3;
        }
        do {
          if (n % 2) {
            result3 += string2;
          }
          n = nativeFloor(n / 2);
          if (n) {
            string2 += string2;
          }
        } while (n);
        return result3;
      }
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity), func + "");
      }
      function baseSample(collection) {
        return arraySample(values(collection));
      }
      function baseSampleSize(collection, n) {
        var array = values(collection);
        return shuffleSelf(array, baseClamp(n, 0, array.length));
      }
      function baseSet(object, path2, value, customizer) {
        if (!isObject3(object)) {
          return object;
        }
        path2 = castPath(path2, object);
        var index = -1, length = path2.length, lastIndex = length - 1, nested = object;
        while (nested != null && ++index < length) {
          var key = toKey(path2[index]), newValue = value;
          if (key === "__proto__" || key === "constructor" || key === "prototype") {
            return object;
          }
          if (index != lastIndex) {
            var objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : undefined$12;
            if (newValue === undefined$12) {
              newValue = isObject3(objValue) ? objValue : isIndex(path2[index + 1]) ? [] : {};
            }
          }
          assignValue(nested, key, newValue);
          nested = nested[key];
        }
        return object;
      }
      var baseSetData = !metaMap ? identity : function(func, data) {
        metaMap.set(func, data);
        return func;
      };
      var baseSetToString = !defineProperty3 ? identity : function(func, string2) {
        return defineProperty3(func, "toString", {
          "configurable": true,
          "enumerable": false,
          "value": constant(string2),
          "writable": true
        });
      };
      function baseShuffle(collection) {
        return shuffleSelf(values(collection));
      }
      function baseSlice(array, start, end) {
        var index = -1, length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result3 = Array2(length);
        while (++index < length) {
          result3[index] = array[index + start];
        }
        return result3;
      }
      function baseSome(collection, predicate) {
        var result3;
        baseEach(collection, function(value, index, collection2) {
          result3 = predicate(value, index, collection2);
          return !result3;
        });
        return !!result3;
      }
      function baseSortedIndex(array, value, retHighest) {
        var low = 0, high = array == null ? low : array.length;
        if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
          while (low < high) {
            var mid = low + high >>> 1, computed = array[mid];
            if (computed !== null && !isSymbol2(computed) && (retHighest ? computed <= value : computed < value)) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return high;
        }
        return baseSortedIndexBy(array, value, identity, retHighest);
      }
      function baseSortedIndexBy(array, value, iteratee2, retHighest) {
        var low = 0, high = array == null ? 0 : array.length;
        if (high === 0) {
          return 0;
        }
        value = iteratee2(value);
        var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol2(value), valIsUndefined = value === undefined$12;
        while (low < high) {
          var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined$12, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol2(computed);
          if (valIsNaN) {
            var setLow = retHighest || othIsReflexive;
          } else if (valIsUndefined) {
            setLow = othIsReflexive && (retHighest || othIsDefined);
          } else if (valIsNull) {
            setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
          } else if (valIsSymbol) {
            setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
          } else if (othIsNull || othIsSymbol) {
            setLow = false;
          } else {
            setLow = retHighest ? computed <= value : computed < value;
          }
          if (setLow) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return nativeMin(high, MAX_ARRAY_INDEX);
      }
      function baseSortedUniq(array, iteratee2) {
        var index = -1, length = array.length, resIndex = 0, result3 = [];
        while (++index < length) {
          var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
          if (!index || !eq(computed, seen2)) {
            var seen2 = computed;
            result3[resIndex++] = value === 0 ? 0 : value;
          }
        }
        return result3;
      }
      function baseToNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol2(value)) {
          return NAN;
        }
        return +value;
      }
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray2(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol2(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result3 = value + "";
        return result3 == "0" && 1 / value == -INFINITY ? "-0" : result3;
      }
      function baseUniq(array, iteratee2, comparator) {
        var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result3 = [], seen2 = result3;
        if (comparator) {
          isCommon = false;
          includes2 = arrayIncludesWith;
        } else if (length >= LARGE_ARRAY_SIZE) {
          var set2 = iteratee2 ? null : createSet(array);
          if (set2) {
            return setToArray(set2);
          }
          isCommon = false;
          includes2 = cacheHas;
          seen2 = new SetCache();
        } else {
          seen2 = iteratee2 ? [] : result3;
        }
        outer:
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var seenIndex = seen2.length;
              while (seenIndex--) {
                if (seen2[seenIndex] === computed) {
                  continue outer;
                }
              }
              if (iteratee2) {
                seen2.push(computed);
              }
              result3.push(value);
            } else if (!includes2(seen2, computed, comparator)) {
              if (seen2 !== result3) {
                seen2.push(computed);
              }
              result3.push(value);
            }
          }
        return result3;
      }
      function baseUnset(object, path2) {
        path2 = castPath(path2, object);
        object = parent(object, path2);
        return object == null || delete object[toKey(last(path2))];
      }
      function baseUpdate(object, path2, updater, customizer) {
        return baseSet(object, path2, updater(baseGet(object, path2)), customizer);
      }
      function baseWhile(array, predicate, isDrop, fromRight) {
        var length = array.length, index = fromRight ? length : -1;
        while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
        }
        return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
      }
      function baseWrapperValue(value, actions) {
        var result3 = value;
        if (result3 instanceof LazyWrapper) {
          result3 = result3.value();
        }
        return arrayReduce(actions, function(result4, action) {
          return action.func.apply(action.thisArg, arrayPush([result4], action.args));
        }, result3);
      }
      function baseXor(arrays, iteratee2, comparator) {
        var length = arrays.length;
        if (length < 2) {
          return length ? baseUniq(arrays[0]) : [];
        }
        var index = -1, result3 = Array2(length);
        while (++index < length) {
          var array = arrays[index], othIndex = -1;
          while (++othIndex < length) {
            if (othIndex != index) {
              result3[index] = baseDifference(result3[index] || array, arrays[othIndex], iteratee2, comparator);
            }
          }
        }
        return baseUniq(baseFlatten(result3, 1), iteratee2, comparator);
      }
      function baseZipObject(props, values2, assignFunc) {
        var index = -1, length = props.length, valsLength = values2.length, result3 = {};
        while (++index < length) {
          var value = index < valsLength ? values2[index] : undefined$12;
          assignFunc(result3, props[index], value);
        }
        return result3;
      }
      function castArrayLikeObject(value) {
        return isArrayLikeObject(value) ? value : [];
      }
      function castFunction(value) {
        return typeof value == "function" ? value : identity;
      }
      function castPath(value, object) {
        if (isArray2(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath3(toString2(value));
      }
      var castRest = baseRest;
      function castSlice(array, start, end) {
        var length = array.length;
        end = end === undefined$12 ? length : end;
        return !start && end >= length ? array : baseSlice(array, start, end);
      }
      var clearTimeout2 = ctxClearTimeout || function(id) {
        return root.clearTimeout(id);
      };
      function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
          return buffer.slice();
        }
        var length = buffer.length, result3 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
        buffer.copy(result3);
        return result3;
      }
      function cloneArrayBuffer(arrayBuffer) {
        var result3 = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array2(result3).set(new Uint8Array2(arrayBuffer));
        return result3;
      }
      function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }
      function cloneRegExp(regexp) {
        var result3 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
        result3.lastIndex = regexp.lastIndex;
        return result3;
      }
      function cloneSymbol(symbol) {
        return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
      }
      function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
      }
      function compareAscending(value, other) {
        if (value !== other) {
          var valIsDefined = value !== undefined$12, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol2(value);
          var othIsDefined = other !== undefined$12, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol2(other);
          if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
            return 1;
          }
          if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
            return -1;
          }
        }
        return 0;
      }
      function compareMultiple(object, other, orders) {
        var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
        while (++index < length) {
          var result3 = compareAscending(objCriteria[index], othCriteria[index]);
          if (result3) {
            if (index >= ordersLength) {
              return result3;
            }
            var order = orders[index];
            return result3 * (order == "desc" ? -1 : 1);
          }
        }
        return object.index - other.index;
      }
      function composeArgs(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result3 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
        while (++leftIndex < leftLength) {
          result3[leftIndex] = partials[leftIndex];
        }
        while (++argsIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result3[holders[argsIndex]] = args[argsIndex];
          }
        }
        while (rangeLength--) {
          result3[leftIndex++] = args[argsIndex++];
        }
        return result3;
      }
      function composeArgsRight(args, partials, holders, isCurried) {
        var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result3 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
        while (++argsIndex < rangeLength) {
          result3[argsIndex] = args[argsIndex];
        }
        var offset = argsIndex;
        while (++rightIndex < rightLength) {
          result3[offset + rightIndex] = partials[rightIndex];
        }
        while (++holdersIndex < holdersLength) {
          if (isUncurried || argsIndex < argsLength) {
            result3[offset + holders[holdersIndex]] = args[argsIndex++];
          }
        }
        return result3;
      }
      function copyArray(source2, array) {
        var index = -1, length = source2.length;
        array || (array = Array2(length));
        while (++index < length) {
          array[index] = source2[index];
        }
        return array;
      }
      function copyObject(source2, props, object, customizer) {
        var isNew = !object;
        object || (object = {});
        var index = -1, length = props.length;
        while (++index < length) {
          var key = props[index];
          var newValue = customizer ? customizer(object[key], source2[key], key, object, source2) : undefined$12;
          if (newValue === undefined$12) {
            newValue = source2[key];
          }
          if (isNew) {
            baseAssignValue(object, key, newValue);
          } else {
            assignValue(object, key, newValue);
          }
        }
        return object;
      }
      function copySymbols(source2, object) {
        return copyObject(source2, getSymbols(source2), object);
      }
      function copySymbolsIn(source2, object) {
        return copyObject(source2, getSymbolsIn(source2), object);
      }
      function createAggregator(setter, initializer) {
        return function(collection, iteratee2) {
          var func = isArray2(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
          return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
        };
      }
      function createAssigner(assigner) {
        return baseRest(function(object, sources) {
          var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined$12, guard = length > 2 ? sources[2] : undefined$12;
          customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined$12;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            customizer = length < 3 ? undefined$12 : customizer;
            length = 1;
          }
          object = Object2(object);
          while (++index < length) {
            var source2 = sources[index];
            if (source2) {
              assigner(object, source2, index, customizer);
            }
          }
          return object;
        });
      }
      function createBaseEach(eachFunc, fromRight) {
        return function(collection, iteratee2) {
          if (collection == null) {
            return collection;
          }
          if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee2);
          }
          var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
          while (fromRight ? index-- : ++index < length) {
            if (iteratee2(iterable[index], index, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }
      function createBaseFor(fromRight) {
        return function(object, iteratee2, keysFunc) {
          var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[fromRight ? length : ++index];
            if (iteratee2(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      function createBind(func, bitmask, thisArg) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var fn2 = this && this !== root && this instanceof wrapper ? Ctor : func;
          return fn2.apply(isBind ? thisArg : this, arguments);
        }
        return wrapper;
      }
      function createCaseFirst(methodName) {
        return function(string2) {
          string2 = toString2(string2);
          var strSymbols = hasUnicode(string2) ? stringToArray(string2) : undefined$12;
          var chr = strSymbols ? strSymbols[0] : string2.charAt(0);
          var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string2.slice(1);
          return chr[methodName]() + trailing;
        };
      }
      function createCompounder(callback) {
        return function(string2) {
          return arrayReduce(words(deburr(string2).replace(reApos, "")), callback, "");
        };
      }
      function createCtor(Ctor) {
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return new Ctor();
            case 1:
              return new Ctor(args[0]);
            case 2:
              return new Ctor(args[0], args[1]);
            case 3:
              return new Ctor(args[0], args[1], args[2]);
            case 4:
              return new Ctor(args[0], args[1], args[2], args[3]);
            case 5:
              return new Ctor(args[0], args[1], args[2], args[3], args[4]);
            case 6:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
            case 7:
              return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
          }
          var thisBinding = baseCreate(Ctor.prototype), result3 = Ctor.apply(thisBinding, args);
          return isObject3(result3) ? result3 : thisBinding;
        };
      }
      function createCurry(func, bitmask, arity) {
        var Ctor = createCtor(func);
        function wrapper() {
          var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
          while (index--) {
            args[index] = arguments[index];
          }
          var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
          length -= holders.length;
          if (length < arity) {
            return createRecurry(
              func,
              bitmask,
              createHybrid,
              wrapper.placeholder,
              undefined$12,
              args,
              holders,
              undefined$12,
              undefined$12,
              arity - length
            );
          }
          var fn2 = this && this !== root && this instanceof wrapper ? Ctor : func;
          return apply(fn2, this, args);
        }
        return wrapper;
      }
      function createFind(findIndexFunc) {
        return function(collection, predicate, fromIndex) {
          var iterable = Object2(collection);
          if (!isArrayLike(collection)) {
            var iteratee2 = getIteratee(predicate, 3);
            collection = keys3(collection);
            predicate = function(key) {
              return iteratee2(iterable[key], key, iterable);
            };
          }
          var index = findIndexFunc(collection, predicate, fromIndex);
          return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined$12;
        };
      }
      function createFlow(fromRight) {
        return flatRest(function(funcs) {
          var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
          if (fromRight) {
            funcs.reverse();
          }
          while (index--) {
            var func = funcs[index];
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            if (prereq && !wrapper && getFuncName(func) == "wrapper") {
              var wrapper = new LodashWrapper([], true);
            }
          }
          index = wrapper ? index : length;
          while (++index < length) {
            func = funcs[index];
            var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined$12;
            if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
              wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
            } else {
              wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
            }
          }
          return function() {
            var args = arguments, value = args[0];
            if (wrapper && args.length == 1 && isArray2(value)) {
              return wrapper.plant(value).value();
            }
            var index2 = 0, result3 = length ? funcs[index2].apply(this, args) : value;
            while (++index2 < length) {
              result3 = funcs[index2].call(this, result3);
            }
            return result3;
          };
        });
      }
      function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
        var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined$12 : createCtor(func);
        function wrapper() {
          var length = arguments.length, args = Array2(length), index = length;
          while (index--) {
            args[index] = arguments[index];
          }
          if (isCurried) {
            var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
          }
          if (partials) {
            args = composeArgs(args, partials, holders, isCurried);
          }
          if (partialsRight) {
            args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
          }
          length -= holdersCount;
          if (isCurried && length < arity) {
            var newHolders = replaceHolders(args, placeholder);
            return createRecurry(
              func,
              bitmask,
              createHybrid,
              wrapper.placeholder,
              thisArg,
              args,
              newHolders,
              argPos,
              ary2,
              arity - length
            );
          }
          var thisBinding = isBind ? thisArg : this, fn2 = isBindKey ? thisBinding[func] : func;
          length = args.length;
          if (argPos) {
            args = reorder(args, argPos);
          } else if (isFlip && length > 1) {
            args.reverse();
          }
          if (isAry && ary2 < length) {
            args.length = ary2;
          }
          if (this && this !== root && this instanceof wrapper) {
            fn2 = Ctor || createCtor(fn2);
          }
          return fn2.apply(thisBinding, args);
        }
        return wrapper;
      }
      function createInverter(setter, toIteratee) {
        return function(object, iteratee2) {
          return baseInverter(object, setter, toIteratee(iteratee2), {});
        };
      }
      function createMathOperation(operator, defaultValue) {
        return function(value, other) {
          var result3;
          if (value === undefined$12 && other === undefined$12) {
            return defaultValue;
          }
          if (value !== undefined$12) {
            result3 = value;
          }
          if (other !== undefined$12) {
            if (result3 === undefined$12) {
              return other;
            }
            if (typeof value == "string" || typeof other == "string") {
              value = baseToString(value);
              other = baseToString(other);
            } else {
              value = baseToNumber(value);
              other = baseToNumber(other);
            }
            result3 = operator(value, other);
          }
          return result3;
        };
      }
      function createOver(arrayFunc) {
        return flatRest(function(iteratees) {
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          return baseRest(function(args) {
            var thisArg = this;
            return arrayFunc(iteratees, function(iteratee2) {
              return apply(iteratee2, thisArg, args);
            });
          });
        });
      }
      function createPadding(length, chars2) {
        chars2 = chars2 === undefined$12 ? " " : baseToString(chars2);
        var charsLength = chars2.length;
        if (charsLength < 2) {
          return charsLength ? baseRepeat(chars2, length) : chars2;
        }
        var result3 = baseRepeat(chars2, nativeCeil(length / stringSize(chars2)));
        return hasUnicode(chars2) ? castSlice(stringToArray(result3), 0, length).join("") : result3.slice(0, length);
      }
      function createPartial(func, bitmask, thisArg, partials) {
        var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
        function wrapper() {
          var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn2 = this && this !== root && this instanceof wrapper ? Ctor : func;
          while (++leftIndex < leftLength) {
            args[leftIndex] = partials[leftIndex];
          }
          while (argsLength--) {
            args[leftIndex++] = arguments[++argsIndex];
          }
          return apply(fn2, isBind ? thisArg : this, args);
        }
        return wrapper;
      }
      function createRange(fromRight) {
        return function(start, end, step) {
          if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
            end = step = undefined$12;
          }
          start = toFinite(start);
          if (end === undefined$12) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          step = step === undefined$12 ? start < end ? 1 : -1 : toFinite(step);
          return baseRange(start, end, step, fromRight);
        };
      }
      function createRelationalOperation(operator) {
        return function(value, other) {
          if (!(typeof value == "string" && typeof other == "string")) {
            value = toNumber(value);
            other = toNumber(other);
          }
          return operator(value, other);
        };
      }
      function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
        var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined$12, newHoldersRight = isCurry ? undefined$12 : holders, newPartials = isCurry ? partials : undefined$12, newPartialsRight = isCurry ? undefined$12 : partials;
        bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
        bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
        if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
          bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
        }
        var newData = [
          func,
          bitmask,
          thisArg,
          newPartials,
          newHolders,
          newPartialsRight,
          newHoldersRight,
          argPos,
          ary2,
          arity
        ];
        var result3 = wrapFunc.apply(undefined$12, newData);
        if (isLaziable(func)) {
          setData(result3, newData);
        }
        result3.placeholder = placeholder;
        return setWrapToString(result3, func, bitmask);
      }
      function createRound(methodName) {
        var func = Math2[methodName];
        return function(number, precision) {
          number = toNumber(number);
          precision = precision == null ? 0 : nativeMin(toInteger2(precision), 292);
          if (precision && nativeIsFinite(number)) {
            var pair = (toString2(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
            pair = (toString2(value) + "e").split("e");
            return +(pair[0] + "e" + (+pair[1] - precision));
          }
          return func(number);
        };
      }
      var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop2 : function(values2) {
        return new Set2(values2);
      };
      function createToPairs(keysFunc) {
        return function(object) {
          var tag2 = getTag(object);
          if (tag2 == mapTag) {
            return mapToArray(object);
          }
          if (tag2 == setTag) {
            return setToPairs(object);
          }
          return baseToPairs(object, keysFunc(object));
        };
      }
      function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
        var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
        if (!isBindKey && typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        var length = partials ? partials.length : 0;
        if (!length) {
          bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
          partials = holders = undefined$12;
        }
        ary2 = ary2 === undefined$12 ? ary2 : nativeMax(toInteger2(ary2), 0);
        arity = arity === undefined$12 ? arity : toInteger2(arity);
        length -= holders ? holders.length : 0;
        if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
          var partialsRight = partials, holdersRight = holders;
          partials = holders = undefined$12;
        }
        var data = isBindKey ? undefined$12 : getData(func);
        var newData = [
          func,
          bitmask,
          thisArg,
          partials,
          holders,
          partialsRight,
          holdersRight,
          argPos,
          ary2,
          arity
        ];
        if (data) {
          mergeData(newData, data);
        }
        func = newData[0];
        bitmask = newData[1];
        thisArg = newData[2];
        partials = newData[3];
        holders = newData[4];
        arity = newData[9] = newData[9] === undefined$12 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
        if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
          bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
        }
        if (!bitmask || bitmask == WRAP_BIND_FLAG) {
          var result3 = createBind(func, bitmask, thisArg);
        } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
          result3 = createCurry(func, bitmask, arity);
        } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
          result3 = createPartial(func, bitmask, thisArg, partials);
        } else {
          result3 = createHybrid.apply(undefined$12, newData);
        }
        var setter = data ? baseSetData : setData;
        return setWrapToString(setter(result3, newData), func, bitmask);
      }
      function customDefaultsAssignIn(objValue, srcValue, key, object) {
        if (objValue === undefined$12 || eq(objValue, objectProto[key]) && !hasOwnProperty2.call(object, key)) {
          return srcValue;
        }
        return objValue;
      }
      function customDefaultsMerge(objValue, srcValue, key, object, source2, stack) {
        if (isObject3(objValue) && isObject3(srcValue)) {
          stack.set(srcValue, objValue);
          baseMerge(objValue, srcValue, undefined$12, customDefaultsMerge, stack);
          stack["delete"](srcValue);
        }
        return objValue;
      }
      function customOmitClone(value) {
        return isPlainObject3(value) ? undefined$12 : value;
      }
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var arrStacked = stack.get(array);
        var othStacked = stack.get(other);
        if (arrStacked && othStacked) {
          return arrStacked == other && othStacked == array;
        }
        var index = -1, result3 = true, seen2 = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined$12;
        stack.set(array, other);
        stack.set(other, array);
        while (++index < arrLength) {
          var arrValue = array[index], othValue = other[index];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
          }
          if (compared !== undefined$12) {
            if (compared) {
              continue;
            }
            result3 = false;
            break;
          }
          if (seen2) {
            if (!arraySome(other, function(othValue2, othIndex) {
              if (!cacheHas(seen2, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                return seen2.push(othIndex);
              }
            })) {
              result3 = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result3 = false;
            break;
          }
        }
        stack["delete"](array);
        stack["delete"](other);
        return result3;
      }
      function equalByTag(object, other, tag2, bitmask, customizer, equalFunc, stack) {
        switch (tag2) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
              return false;
            }
            object = object.buffer;
            other = other.buffer;
          case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
              return false;
            }
            return true;
          case boolTag:
          case dateTag:
          case numberTag:
            return eq(+object, +other);
          case errorTag:
            return object.name == other.name && object.message == other.message;
          case regexpTag:
          case stringTag:
            return object == other + "";
          case mapTag:
            var convert2 = mapToArray;
          case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
            convert2 || (convert2 = setToArray);
            if (object.size != other.size && !isPartial) {
              return false;
            }
            var stacked = stack.get(object);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG;
            stack.set(object, other);
            var result3 = equalArrays(convert2(object), convert2(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object);
            return result3;
          case symbolTag:
            if (symbolValueOf) {
              return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
        }
        return false;
      }
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index = objLength;
        while (index--) {
          var key = objProps[index];
          if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
            return false;
          }
        }
        var objStacked = stack.get(object);
        var othStacked = stack.get(other);
        if (objStacked && othStacked) {
          return objStacked == other && othStacked == object;
        }
        var result3 = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;
        while (++index < objLength) {
          key = objProps[index];
          var objValue = object[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          }
          if (!(compared === undefined$12 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result3 = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result3 && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result3 = false;
          }
        }
        stack["delete"](object);
        stack["delete"](other);
        return result3;
      }
      function flatRest(func) {
        return setToString(overRest(func, undefined$12, flatten), func + "");
      }
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys3, getSymbols);
      }
      function getAllKeysIn(object) {
        return baseGetAllKeys(object, keysIn, getSymbolsIn);
      }
      var getData = !metaMap ? noop2 : function(func) {
        return metaMap.get(func);
      };
      function getFuncName(func) {
        var result3 = func.name + "", array = realNames[result3], length = hasOwnProperty2.call(realNames, result3) ? array.length : 0;
        while (length--) {
          var data = array[length], otherFunc = data.func;
          if (otherFunc == null || otherFunc == func) {
            return data.name;
          }
        }
        return result3;
      }
      function getHolder(func) {
        var object = hasOwnProperty2.call(lodash2, "placeholder") ? lodash2 : func;
        return object.placeholder;
      }
      function getIteratee() {
        var result3 = lodash2.iteratee || iteratee;
        result3 = result3 === iteratee ? baseIteratee : result3;
        return arguments.length ? result3(arguments[0], arguments[1]) : result3;
      }
      function getMapData(map3, key) {
        var data = map3.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      function getMatchData(object) {
        var result3 = keys3(object), length = result3.length;
        while (length--) {
          var key = result3[length], value = object[key];
          result3[length] = [key, value, isStrictComparable(value)];
        }
        return result3;
      }
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : undefined$12;
      }
      function getRawTag(value) {
        var isOwn = hasOwnProperty2.call(value, symToStringTag), tag2 = value[symToStringTag];
        try {
          value[symToStringTag] = undefined$12;
          var unmasked = true;
        } catch (e) {
        }
        var result3 = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag2;
          } else {
            delete value[symToStringTag];
          }
        }
        return result3;
      }
      var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
          return [];
        }
        object = Object2(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
        var result3 = [];
        while (object) {
          arrayPush(result3, getSymbols(object));
          object = getPrototype(object);
        }
        return result3;
      };
      var getTag = baseGetTag;
      if (DataView2 && getTag(new DataView2(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
        getTag = function(value) {
          var result3 = baseGetTag(value), Ctor = result3 == objectTag ? value.constructor : undefined$12, ctorString = Ctor ? toSource(Ctor) : "";
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
          return result3;
        };
      }
      function getView(start, end, transforms) {
        var index = -1, length = transforms.length;
        while (++index < length) {
          var data = transforms[index], size2 = data.size;
          switch (data.type) {
            case "drop":
              start += size2;
              break;
            case "dropRight":
              end -= size2;
              break;
            case "take":
              end = nativeMin(end, start + size2);
              break;
            case "takeRight":
              start = nativeMax(start, end - size2);
              break;
          }
        }
        return { "start": start, "end": end };
      }
      function getWrapDetails(source2) {
        var match2 = source2.match(reWrapDetails);
        return match2 ? match2[1].split(reSplitDetails) : [];
      }
      function hasPath(object, path2, hasFunc) {
        path2 = castPath(path2, object);
        var index = -1, length = path2.length, result3 = false;
        while (++index < length) {
          var key = toKey(path2[index]);
          if (!(result3 = object != null && hasFunc(object, key))) {
            break;
          }
          object = object[key];
        }
        if (result3 || ++index != length) {
          return result3;
        }
        length = object == null ? 0 : object.length;
        return !!length && isLength(length) && isIndex(key, length) && (isArray2(object) || isArguments5(object));
      }
      function initCloneArray(array) {
        var length = array.length, result3 = new array.constructor(length);
        if (length && typeof array[0] == "string" && hasOwnProperty2.call(array, "index")) {
          result3.index = array.index;
          result3.input = array.input;
        }
        return result3;
      }
      function initCloneObject(object) {
        return typeof object.constructor == "function" && !isPrototype2(object) ? baseCreate(getPrototype(object)) : {};
      }
      function initCloneByTag(object, tag2, isDeep) {
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
            return new Ctor();
          case numberTag:
          case stringTag:
            return new Ctor(object);
          case regexpTag:
            return cloneRegExp(object);
          case setTag:
            return new Ctor();
          case symbolTag:
            return cloneSymbol(object);
        }
      }
      function insertWrapDetails(source2, details) {
        var length = details.length;
        if (!length) {
          return source2;
        }
        var lastIndex = length - 1;
        details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
        details = details.join(length > 2 ? ", " : " ");
        return source2.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
      }
      function isFlattenable(value) {
        return isArray2(value) || isArguments5(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
      }
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      function isIterateeCall(value, index, object) {
        if (!isObject3(object)) {
          return false;
        }
        var type = typeof index;
        if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
          return eq(object[index], value);
        }
        return false;
      }
      function isKey(value, object) {
        if (isArray2(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol2(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
      }
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      function isLaziable(func) {
        var funcName = getFuncName(func), other = lodash2[funcName];
        if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
          return false;
        }
        if (func === other) {
          return true;
        }
        var data = getData(other);
        return !!data && func === data[0];
      }
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      var isMaskable = coreJsData ? isFunction2 : stubFalse;
      function isPrototype2(value) {
        var Ctor = value && value.constructor, proto2 = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto2;
      }
      function isStrictComparable(value) {
        return value === value && !isObject3(value);
      }
      function matchesStrictComparable(key, srcValue) {
        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === srcValue && (srcValue !== undefined$12 || key in Object2(object));
        };
      }
      function memoizeCapped(func) {
        var result3 = memoize2(func, function(key) {
          if (cache2.size === MAX_MEMOIZE_SIZE) {
            cache2.clear();
          }
          return key;
        });
        var cache2 = result3.cache;
        return result3;
      }
      function mergeData(data, source2) {
        var bitmask = data[1], srcBitmask = source2[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
        var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source2[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source2[7].length <= source2[8] && bitmask == WRAP_CURRY_FLAG;
        if (!(isCommon || isCombo)) {
          return data;
        }
        if (srcBitmask & WRAP_BIND_FLAG) {
          data[2] = source2[2];
          newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
        }
        var value = source2[3];
        if (value) {
          var partials = data[3];
          data[3] = partials ? composeArgs(partials, value, source2[4]) : value;
          data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source2[4];
        }
        value = source2[5];
        if (value) {
          partials = data[5];
          data[5] = partials ? composeArgsRight(partials, value, source2[6]) : value;
          data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source2[6];
        }
        value = source2[7];
        if (value) {
          data[7] = value;
        }
        if (srcBitmask & WRAP_ARY_FLAG) {
          data[8] = data[8] == null ? source2[8] : nativeMin(data[8], source2[8]);
        }
        if (data[9] == null) {
          data[9] = source2[9];
        }
        data[0] = source2[0];
        data[1] = newBitmask;
        return data;
      }
      function nativeKeysIn(object) {
        var result3 = [];
        if (object != null) {
          for (var key in Object2(object)) {
            result3.push(key);
          }
        }
        return result3;
      }
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      function overRest(func, start, transform2) {
        start = nativeMax(start === undefined$12 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
          while (++index < length) {
            array[index] = args[start + index];
          }
          index = -1;
          var otherArgs = Array2(start + 1);
          while (++index < start) {
            otherArgs[index] = args[index];
          }
          otherArgs[start] = transform2(array);
          return apply(func, this, otherArgs);
        };
      }
      function parent(object, path2) {
        return path2.length < 2 ? object : baseGet(object, baseSlice(path2, 0, -1));
      }
      function reorder(array, indexes) {
        var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
        while (length--) {
          var index = indexes[length];
          array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined$12;
        }
        return array;
      }
      function safeGet(object, key) {
        if (key === "constructor" && typeof object[key] === "function") {
          return;
        }
        if (key == "__proto__") {
          return;
        }
        return object[key];
      }
      var setData = shortOut(baseSetData);
      var setTimeout2 = ctxSetTimeout || function(func, wait) {
        return root.setTimeout(func, wait);
      };
      var setToString = shortOut(baseSetToString);
      function setWrapToString(wrapper, reference, bitmask) {
        var source2 = reference + "";
        return setToString(wrapper, insertWrapDetails(source2, updateWrapDetails(getWrapDetails(source2), bitmask)));
      }
      function shortOut(func) {
        var count = 0, lastCalled = 0;
        return function() {
          var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(undefined$12, arguments);
        };
      }
      function shuffleSelf(array, size2) {
        var index = -1, length = array.length, lastIndex = length - 1;
        size2 = size2 === undefined$12 ? length : size2;
        while (++index < size2) {
          var rand = baseRandom(index, lastIndex), value = array[rand];
          array[rand] = array[index];
          array[index] = value;
        }
        array.length = size2;
        return array;
      }
      var stringToPath3 = memoizeCapped(function(string2) {
        var result3 = [];
        if (string2.charCodeAt(0) === 46) {
          result3.push("");
        }
        string2.replace(rePropName2, function(match2, number, quote, subString) {
          result3.push(quote ? subString.replace(reEscapeChar2, "$1") : number || match2);
        });
        return result3;
      });
      function toKey(value) {
        if (typeof value == "string" || isSymbol2(value)) {
          return value;
        }
        var result3 = value + "";
        return result3 == "0" && 1 / value == -INFINITY ? "-0" : result3;
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
      function updateWrapDetails(details, bitmask) {
        arrayEach(wrapFlags, function(pair) {
          var value = "_." + pair[0];
          if (bitmask & pair[1] && !arrayIncludes(details, value)) {
            details.push(value);
          }
        });
        return details.sort();
      }
      function wrapperClone(wrapper) {
        if (wrapper instanceof LazyWrapper) {
          return wrapper.clone();
        }
        var result3 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
        result3.__actions__ = copyArray(wrapper.__actions__);
        result3.__index__ = wrapper.__index__;
        result3.__values__ = wrapper.__values__;
        return result3;
      }
      function chunk(array, size2, guard) {
        if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined$12) {
          size2 = 1;
        } else {
          size2 = nativeMax(toInteger2(size2), 0);
        }
        var length = array == null ? 0 : array.length;
        if (!length || size2 < 1) {
          return [];
        }
        var index = 0, resIndex = 0, result3 = Array2(nativeCeil(length / size2));
        while (index < length) {
          result3[resIndex++] = baseSlice(array, index, index += size2);
        }
        return result3;
      }
      function compact(array) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result3 = [];
        while (++index < length) {
          var value = array[index];
          if (value) {
            result3[resIndex++] = value;
          }
        }
        return result3;
      }
      function concat2() {
        var length = arguments.length;
        if (!length) {
          return [];
        }
        var args = Array2(length - 1), array = arguments[0], index = length;
        while (index--) {
          args[index - 1] = arguments[index];
        }
        return arrayPush(isArray2(array) ? copyArray(array) : [array], baseFlatten(args, 1));
      }
      var difference = baseRest(function(array, values2) {
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
      });
      var differenceBy = baseRest(function(array, values2) {
        var iteratee2 = last(values2);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$12;
        }
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
      });
      var differenceWith = baseRest(function(array, values2) {
        var comparator = last(values2);
        if (isArrayLikeObject(comparator)) {
          comparator = undefined$12;
        }
        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined$12, comparator) : [];
      });
      function drop(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined$12 ? 1 : toInteger2(n);
        return baseSlice(array, n < 0 ? 0 : n, length);
      }
      function dropRight(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined$12 ? 1 : toInteger2(n);
        n = length - n;
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      function dropRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
      }
      function dropWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
      }
      function fill(array, value, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
          start = 0;
          end = length;
        }
        return baseFill(array, value, start, end);
      }
      function findIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger2(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index);
      }
      function findLastIndex(array, predicate, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length - 1;
        if (fromIndex !== undefined$12) {
          index = toInteger2(fromIndex);
          index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return baseFindIndex(array, getIteratee(predicate, 3), index, true);
      }
      function flatten(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, 1) : [];
      }
      function flattenDeep(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, INFINITY) : [];
      }
      function flattenDepth(array, depth) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        depth = depth === undefined$12 ? 1 : toInteger2(depth);
        return baseFlatten(array, depth);
      }
      function fromPairs(pairs) {
        var index = -1, length = pairs == null ? 0 : pairs.length, result3 = {};
        while (++index < length) {
          var pair = pairs[index];
          result3[pair[0]] = pair[1];
        }
        return result3;
      }
      function head(array) {
        return array && array.length ? array[0] : undefined$12;
      }
      function indexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = fromIndex == null ? 0 : toInteger2(fromIndex);
        if (index < 0) {
          index = nativeMax(length + index, 0);
        }
        return baseIndexOf(array, value, index);
      }
      function initial(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 0, -1) : [];
      }
      var intersection = baseRest(function(arrays) {
        var mapped = arrayMap(arrays, castArrayLikeObject);
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
      });
      var intersectionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
        if (iteratee2 === last(mapped)) {
          iteratee2 = undefined$12;
        } else {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
      });
      var intersectionWith = baseRest(function(arrays) {
        var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
        comparator = typeof comparator == "function" ? comparator : undefined$12;
        if (comparator) {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined$12, comparator) : [];
      });
      function join(array, separator) {
        return array == null ? "" : nativeJoin.call(array, separator);
      }
      function last(array) {
        var length = array == null ? 0 : array.length;
        return length ? array[length - 1] : undefined$12;
      }
      function lastIndexOf(array, value, fromIndex) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return -1;
        }
        var index = length;
        if (fromIndex !== undefined$12) {
          index = toInteger2(fromIndex);
          index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
        }
        return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
      }
      function nth(array, n) {
        return array && array.length ? baseNth(array, toInteger2(n)) : undefined$12;
      }
      var pull = baseRest(pullAll);
      function pullAll(array, values2) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
      }
      function pullAllBy(array, values2, iteratee2) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
      }
      function pullAllWith(array, values2, comparator) {
        return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined$12, comparator) : array;
      }
      var pullAt = flatRest(function(array, indexes) {
        var length = array == null ? 0 : array.length, result3 = baseAt(array, indexes);
        basePullAt(array, arrayMap(indexes, function(index) {
          return isIndex(index, length) ? +index : index;
        }).sort(compareAscending));
        return result3;
      });
      function remove(array, predicate) {
        var result3 = [];
        if (!(array && array.length)) {
          return result3;
        }
        var index = -1, indexes = [], length = array.length;
        predicate = getIteratee(predicate, 3);
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result3.push(value);
            indexes.push(index);
          }
        }
        basePullAt(array, indexes);
        return result3;
      }
      function reverse(array) {
        return array == null ? array : nativeReverse.call(array);
      }
      function slice2(array, start, end) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
          start = 0;
          end = length;
        } else {
          start = start == null ? 0 : toInteger2(start);
          end = end === undefined$12 ? length : toInteger2(end);
        }
        return baseSlice(array, start, end);
      }
      function sortedIndex(array, value) {
        return baseSortedIndex(array, value);
      }
      function sortedIndexBy(array, value, iteratee2) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
      }
      function sortedIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value);
          if (index < length && eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedLastIndex(array, value) {
        return baseSortedIndex(array, value, true);
      }
      function sortedLastIndexBy(array, value, iteratee2) {
        return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
      }
      function sortedLastIndexOf(array, value) {
        var length = array == null ? 0 : array.length;
        if (length) {
          var index = baseSortedIndex(array, value, true) - 1;
          if (eq(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      function sortedUniq(array) {
        return array && array.length ? baseSortedUniq(array) : [];
      }
      function sortedUniqBy(array, iteratee2) {
        return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
      }
      function tail(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseSlice(array, 1, length) : [];
      }
      function take(array, n, guard) {
        if (!(array && array.length)) {
          return [];
        }
        n = guard || n === undefined$12 ? 1 : toInteger2(n);
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      function takeRight(array, n, guard) {
        var length = array == null ? 0 : array.length;
        if (!length) {
          return [];
        }
        n = guard || n === undefined$12 ? 1 : toInteger2(n);
        n = length - n;
        return baseSlice(array, n < 0 ? 0 : n, length);
      }
      function takeRightWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
      }
      function takeWhile(array, predicate) {
        return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
      }
      var union = baseRest(function(arrays) {
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
      });
      var unionBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$12;
        }
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
      });
      var unionWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined$12;
        return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$12, comparator);
      });
      function uniq(array) {
        return array && array.length ? baseUniq(array) : [];
      }
      function uniqBy(array, iteratee2) {
        return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
      }
      function uniqWith(array, comparator) {
        comparator = typeof comparator == "function" ? comparator : undefined$12;
        return array && array.length ? baseUniq(array, undefined$12, comparator) : [];
      }
      function unzip(array) {
        if (!(array && array.length)) {
          return [];
        }
        var length = 0;
        array = arrayFilter(array, function(group) {
          if (isArrayLikeObject(group)) {
            length = nativeMax(group.length, length);
            return true;
          }
        });
        return baseTimes(length, function(index) {
          return arrayMap(array, baseProperty(index));
        });
      }
      function unzipWith(array, iteratee2) {
        if (!(array && array.length)) {
          return [];
        }
        var result3 = unzip(array);
        if (iteratee2 == null) {
          return result3;
        }
        return arrayMap(result3, function(group) {
          return apply(iteratee2, undefined$12, group);
        });
      }
      var without = baseRest(function(array, values2) {
        return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
      });
      var xor = baseRest(function(arrays) {
        return baseXor(arrayFilter(arrays, isArrayLikeObject));
      });
      var xorBy = baseRest(function(arrays) {
        var iteratee2 = last(arrays);
        if (isArrayLikeObject(iteratee2)) {
          iteratee2 = undefined$12;
        }
        return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
      });
      var xorWith = baseRest(function(arrays) {
        var comparator = last(arrays);
        comparator = typeof comparator == "function" ? comparator : undefined$12;
        return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$12, comparator);
      });
      var zip = baseRest(unzip);
      function zipObject(props, values2) {
        return baseZipObject(props || [], values2 || [], assignValue);
      }
      function zipObjectDeep(props, values2) {
        return baseZipObject(props || [], values2 || [], baseSet);
      }
      var zipWith = baseRest(function(arrays) {
        var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined$12;
        iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined$12;
        return unzipWith(arrays, iteratee2);
      });
      function chain(value) {
        var result3 = lodash2(value);
        result3.__chain__ = true;
        return result3;
      }
      function tap(value, interceptor) {
        interceptor(value);
        return value;
      }
      function thru(value, interceptor) {
        return interceptor(value);
      }
      var wrapperAt = flatRest(function(paths) {
        var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
          return baseAt(object, paths);
        };
        if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
          return this.thru(interceptor);
        }
        value = value.slice(start, +start + (length ? 1 : 0));
        value.__actions__.push({
          "func": thru,
          "args": [interceptor],
          "thisArg": undefined$12
        });
        return new LodashWrapper(value, this.__chain__).thru(function(array) {
          if (length && !array.length) {
            array.push(undefined$12);
          }
          return array;
        });
      });
      function wrapperChain() {
        return chain(this);
      }
      function wrapperCommit() {
        return new LodashWrapper(this.value(), this.__chain__);
      }
      function wrapperNext() {
        if (this.__values__ === undefined$12) {
          this.__values__ = toArray(this.value());
        }
        var done = this.__index__ >= this.__values__.length, value = done ? undefined$12 : this.__values__[this.__index__++];
        return { "done": done, "value": value };
      }
      function wrapperToIterator() {
        return this;
      }
      function wrapperPlant(value) {
        var result3, parent2 = this;
        while (parent2 instanceof baseLodash) {
          var clone3 = wrapperClone(parent2);
          clone3.__index__ = 0;
          clone3.__values__ = undefined$12;
          if (result3) {
            previous.__wrapped__ = clone3;
          } else {
            result3 = clone3;
          }
          var previous = clone3;
          parent2 = parent2.__wrapped__;
        }
        previous.__wrapped__ = value;
        return result3;
      }
      function wrapperReverse() {
        var value = this.__wrapped__;
        if (value instanceof LazyWrapper) {
          var wrapped = value;
          if (this.__actions__.length) {
            wrapped = new LazyWrapper(this);
          }
          wrapped = wrapped.reverse();
          wrapped.__actions__.push({
            "func": thru,
            "args": [reverse],
            "thisArg": undefined$12
          });
          return new LodashWrapper(wrapped, this.__chain__);
        }
        return this.thru(reverse);
      }
      function wrapperValue() {
        return baseWrapperValue(this.__wrapped__, this.__actions__);
      }
      var countBy = createAggregator(function(result3, value, key) {
        if (hasOwnProperty2.call(result3, key)) {
          ++result3[key];
        } else {
          baseAssignValue(result3, key, 1);
        }
      });
      function every(collection, predicate, guard) {
        var func = isArray2(collection) ? arrayEvery : baseEvery;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined$12;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      function filter2(collection, predicate) {
        var func = isArray2(collection) ? arrayFilter : baseFilter;
        return func(collection, getIteratee(predicate, 3));
      }
      var find = createFind(findIndex);
      var findLast = createFind(findLastIndex);
      function flatMap(collection, iteratee2) {
        return baseFlatten(map2(collection, iteratee2), 1);
      }
      function flatMapDeep(collection, iteratee2) {
        return baseFlatten(map2(collection, iteratee2), INFINITY);
      }
      function flatMapDepth(collection, iteratee2, depth) {
        depth = depth === undefined$12 ? 1 : toInteger2(depth);
        return baseFlatten(map2(collection, iteratee2), depth);
      }
      function forEach3(collection, iteratee2) {
        var func = isArray2(collection) ? arrayEach : baseEach;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function forEachRight(collection, iteratee2) {
        var func = isArray2(collection) ? arrayEachRight : baseEachRight;
        return func(collection, getIteratee(iteratee2, 3));
      }
      var groupBy = createAggregator(function(result3, value, key) {
        if (hasOwnProperty2.call(result3, key)) {
          result3[key].push(value);
        } else {
          baseAssignValue(result3, key, [value]);
        }
      });
      function includes(collection, value, fromIndex, guard) {
        collection = isArrayLike(collection) ? collection : values(collection);
        fromIndex = fromIndex && !guard ? toInteger2(fromIndex) : 0;
        var length = collection.length;
        if (fromIndex < 0) {
          fromIndex = nativeMax(length + fromIndex, 0);
        }
        return isString3(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
      }
      var invokeMap = baseRest(function(collection, path2, args) {
        var index = -1, isFunc = typeof path2 == "function", result3 = isArrayLike(collection) ? Array2(collection.length) : [];
        baseEach(collection, function(value) {
          result3[++index] = isFunc ? apply(path2, value, args) : baseInvoke(value, path2, args);
        });
        return result3;
      });
      var keyBy = createAggregator(function(result3, value, key) {
        baseAssignValue(result3, key, value);
      });
      function map2(collection, iteratee2) {
        var func = isArray2(collection) ? arrayMap : baseMap;
        return func(collection, getIteratee(iteratee2, 3));
      }
      function orderBy(collection, iteratees, orders, guard) {
        if (collection == null) {
          return [];
        }
        if (!isArray2(iteratees)) {
          iteratees = iteratees == null ? [] : [iteratees];
        }
        orders = guard ? undefined$12 : orders;
        if (!isArray2(orders)) {
          orders = orders == null ? [] : [orders];
        }
        return baseOrderBy(collection, iteratees, orders);
      }
      var partition = createAggregator(function(result3, value, key) {
        result3[key ? 0 : 1].push(value);
      }, function() {
        return [[], []];
      });
      function reduce(collection, iteratee2, accumulator) {
        var func = isArray2(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
      }
      function reduceRight(collection, iteratee2, accumulator) {
        var func = isArray2(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
        return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
      }
      function reject(collection, predicate) {
        var func = isArray2(collection) ? arrayFilter : baseFilter;
        return func(collection, negate(getIteratee(predicate, 3)));
      }
      function sample(collection) {
        var func = isArray2(collection) ? arraySample : baseSample;
        return func(collection);
      }
      function sampleSize(collection, n, guard) {
        if (guard ? isIterateeCall(collection, n, guard) : n === undefined$12) {
          n = 1;
        } else {
          n = toInteger2(n);
        }
        var func = isArray2(collection) ? arraySampleSize : baseSampleSize;
        return func(collection, n);
      }
      function shuffle(collection) {
        var func = isArray2(collection) ? arrayShuffle : baseShuffle;
        return func(collection);
      }
      function size(collection) {
        if (collection == null) {
          return 0;
        }
        if (isArrayLike(collection)) {
          return isString3(collection) ? stringSize(collection) : collection.length;
        }
        var tag2 = getTag(collection);
        if (tag2 == mapTag || tag2 == setTag) {
          return collection.size;
        }
        return baseKeys(collection).length;
      }
      function some(collection, predicate, guard) {
        var func = isArray2(collection) ? arraySome : baseSome;
        if (guard && isIterateeCall(collection, predicate, guard)) {
          predicate = undefined$12;
        }
        return func(collection, getIteratee(predicate, 3));
      }
      var sortBy = baseRest(function(collection, iteratees) {
        if (collection == null) {
          return [];
        }
        var length = iteratees.length;
        if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
          iteratees = [];
        } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
          iteratees = [iteratees[0]];
        }
        return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
      });
      var now = ctxNow || function() {
        return root.Date.now();
      };
      function after(n, func) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        n = toInteger2(n);
        return function() {
          if (--n < 1) {
            return func.apply(this, arguments);
          }
        };
      }
      function ary(func, n, guard) {
        n = guard ? undefined$12 : n;
        n = func && n == null ? func.length : n;
        return createWrap(func, WRAP_ARY_FLAG, undefined$12, undefined$12, undefined$12, undefined$12, n);
      }
      function before(n, func) {
        var result3;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        n = toInteger2(n);
        return function() {
          if (--n > 0) {
            result3 = func.apply(this, arguments);
          }
          if (n <= 1) {
            func = undefined$12;
          }
          return result3;
        };
      }
      var bind3 = baseRest(function(func, thisArg, partials) {
        var bitmask = WRAP_BIND_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bind3));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(func, bitmask, thisArg, partials, holders);
      });
      var bindKey = baseRest(function(object, key, partials) {
        var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
        if (partials.length) {
          var holders = replaceHolders(partials, getHolder(bindKey));
          bitmask |= WRAP_PARTIAL_FLAG;
        }
        return createWrap(key, bitmask, object, partials, holders);
      });
      function curry(func, arity, guard) {
        arity = guard ? undefined$12 : arity;
        var result3 = createWrap(func, WRAP_CURRY_FLAG, undefined$12, undefined$12, undefined$12, undefined$12, undefined$12, arity);
        result3.placeholder = curry.placeholder;
        return result3;
      }
      function curryRight(func, arity, guard) {
        arity = guard ? undefined$12 : arity;
        var result3 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$12, undefined$12, undefined$12, undefined$12, undefined$12, arity);
        result3.placeholder = curryRight.placeholder;
        return result3;
      }
      function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result3, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject3(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = undefined$12;
          lastInvokeTime = time;
          result3 = func.apply(thisArg, args);
          return result3;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout2(timerExpired, wait);
          return leading ? invokeFunc(time) : result3;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
          return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === undefined$12 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout2(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = undefined$12;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = undefined$12;
          return result3;
        }
        function cancel() {
          if (timerId !== undefined$12) {
            clearTimeout2(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = undefined$12;
        }
        function flush() {
          return timerId === undefined$12 ? result3 : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === undefined$12) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              clearTimeout2(timerId);
              timerId = setTimeout2(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === undefined$12) {
            timerId = setTimeout2(timerExpired, wait);
          }
          return result3;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      var defer = baseRest(function(func, args) {
        return baseDelay(func, 1, args);
      });
      var delay = baseRest(function(func, wait, args) {
        return baseDelay(func, toNumber(wait) || 0, args);
      });
      function flip(func) {
        return createWrap(func, WRAP_FLIP_FLAG);
      }
      function memoize2(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
          if (cache2.has(key)) {
            return cache2.get(key);
          }
          var result3 = func.apply(this, args);
          memoized.cache = cache2.set(key, result3) || cache2;
          return result3;
        };
        memoized.cache = new (memoize2.Cache || MapCache)();
        return memoized;
      }
      memoize2.Cache = MapCache;
      function negate(predicate) {
        if (typeof predicate != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        return function() {
          var args = arguments;
          switch (args.length) {
            case 0:
              return !predicate.call(this);
            case 1:
              return !predicate.call(this, args[0]);
            case 2:
              return !predicate.call(this, args[0], args[1]);
            case 3:
              return !predicate.call(this, args[0], args[1], args[2]);
          }
          return !predicate.apply(this, args);
        };
      }
      function once(func) {
        return before(2, func);
      }
      var overArgs = castRest(function(func, transforms) {
        transforms = transforms.length == 1 && isArray2(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
        var funcsLength = transforms.length;
        return baseRest(function(args) {
          var index = -1, length = nativeMin(args.length, funcsLength);
          while (++index < length) {
            args[index] = transforms[index].call(this, args[index]);
          }
          return apply(func, this, args);
        });
      });
      var partial = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partial));
        return createWrap(func, WRAP_PARTIAL_FLAG, undefined$12, partials, holders);
      });
      var partialRight = baseRest(function(func, partials) {
        var holders = replaceHolders(partials, getHolder(partialRight));
        return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$12, partials, holders);
      });
      var rearg = flatRest(function(func, indexes) {
        return createWrap(func, WRAP_REARG_FLAG, undefined$12, undefined$12, undefined$12, indexes);
      });
      function rest(func, start) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        start = start === undefined$12 ? start : toInteger2(start);
        return baseRest(func, start);
      }
      function spread(func, start) {
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        start = start == null ? 0 : nativeMax(toInteger2(start), 0);
        return baseRest(function(args) {
          var array = args[start], otherArgs = castSlice(args, 0, start);
          if (array) {
            arrayPush(otherArgs, array);
          }
          return apply(func, this, otherArgs);
        });
      }
      function throttle(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError2(FUNC_ERROR_TEXT);
        }
        if (isObject3(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
          "leading": leading,
          "maxWait": wait,
          "trailing": trailing
        });
      }
      function unary(func) {
        return ary(func, 1);
      }
      function wrap2(value, wrapper) {
        return partial(castFunction(wrapper), value);
      }
      function castArray() {
        if (!arguments.length) {
          return [];
        }
        var value = arguments[0];
        return isArray2(value) ? value : [value];
      }
      function clone2(value) {
        return baseClone(value, CLONE_SYMBOLS_FLAG);
      }
      function cloneWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$12;
        return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
      }
      function cloneDeep(value) {
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
      }
      function cloneDeepWith(value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$12;
        return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
      }
      function conformsTo(object, source2) {
        return source2 == null || baseConformsTo(object, source2, keys3(source2));
      }
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      var gt = createRelationalOperation(baseGt);
      var gte2 = createRelationalOperation(function(value, other) {
        return value >= other;
      });
      var isArguments5 = baseIsArguments(function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty2.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      var isArray2 = Array2.isArray;
      var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction2(value);
      }
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      function isBoolean3(value) {
        return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
      }
      var isBuffer2 = nativeIsBuffer || stubFalse;
      var isDate2 = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
      function isElement(value) {
        return isObjectLike(value) && value.nodeType === 1 && !isPlainObject3(value);
      }
      function isEmpty(value) {
        if (value == null) {
          return true;
        }
        if (isArrayLike(value) && (isArray2(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer2(value) || isTypedArray2(value) || isArguments5(value))) {
          return !value.length;
        }
        var tag2 = getTag(value);
        if (tag2 == mapTag || tag2 == setTag) {
          return !value.size;
        }
        if (isPrototype2(value)) {
          return !baseKeys(value).length;
        }
        for (var key in value) {
          if (hasOwnProperty2.call(value, key)) {
            return false;
          }
        }
        return true;
      }
      function isEqual(value, other) {
        return baseIsEqual(value, other);
      }
      function isEqualWith(value, other, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$12;
        var result3 = customizer ? customizer(value, other) : undefined$12;
        return result3 === undefined$12 ? baseIsEqual(value, other, undefined$12, customizer) : !!result3;
      }
      function isError2(value) {
        if (!isObjectLike(value)) {
          return false;
        }
        var tag2 = baseGetTag(value);
        return tag2 == errorTag || tag2 == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject3(value);
      }
      function isFinite2(value) {
        return typeof value == "number" && nativeIsFinite(value);
      }
      function isFunction2(value) {
        if (!isObject3(value)) {
          return false;
        }
        var tag2 = baseGetTag(value);
        return tag2 == funcTag || tag2 == genTag || tag2 == asyncTag || tag2 == proxyTag;
      }
      function isInteger(value) {
        return typeof value == "number" && value == toInteger2(value);
      }
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      function isObject3(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      var isMap3 = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
      function isMatch(object, source2) {
        return object === source2 || baseIsMatch(object, source2, getMatchData(source2));
      }
      function isMatchWith(object, source2, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$12;
        return baseIsMatch(object, source2, getMatchData(source2), customizer);
      }
      function isNaN2(value) {
        return isNumber2(value) && value != +value;
      }
      function isNative(value) {
        if (isMaskable(value)) {
          throw new Error2(CORE_ERROR_TEXT);
        }
        return baseIsNative(value);
      }
      function isNull(value) {
        return value === null;
      }
      function isNil(value) {
        return value == null;
      }
      function isNumber2(value) {
        return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
      }
      function isPlainObject3(value) {
        if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
          return false;
        }
        var proto2 = getPrototype(value);
        if (proto2 === null) {
          return true;
        }
        var Ctor = hasOwnProperty2.call(proto2, "constructor") && proto2.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
      }
      var isRegExp2 = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
      function isSafeInteger(value) {
        return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
      }
      var isSet3 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
      function isString3(value) {
        return typeof value == "string" || !isArray2(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
      }
      function isSymbol2(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      var isTypedArray2 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      function isUndefined(value) {
        return value === undefined$12;
      }
      function isWeakMap3(value) {
        return isObjectLike(value) && getTag(value) == weakMapTag;
      }
      function isWeakSet2(value) {
        return isObjectLike(value) && baseGetTag(value) == weakSetTag;
      }
      var lt = createRelationalOperation(baseLt);
      var lte2 = createRelationalOperation(function(value, other) {
        return value <= other;
      });
      function toArray(value) {
        if (!value) {
          return [];
        }
        if (isArrayLike(value)) {
          return isString3(value) ? stringToArray(value) : copyArray(value);
        }
        if (symIterator && value[symIterator]) {
          return iteratorToArray(value[symIterator]());
        }
        var tag2 = getTag(value), func = tag2 == mapTag ? mapToArray : tag2 == setTag ? setToArray : values;
        return func(value);
      }
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY || value === -INFINITY) {
          var sign2 = value < 0 ? -1 : 1;
          return sign2 * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }
      function toInteger2(value) {
        var result3 = toFinite(value), remainder = result3 % 1;
        return result3 === result3 ? remainder ? result3 - remainder : result3 : 0;
      }
      function toLength(value) {
        return value ? baseClamp(toInteger2(value), 0, MAX_ARRAY_LENGTH) : 0;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol2(value)) {
          return NAN;
        }
        if (isObject3(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject3(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      function toPlainObject2(value) {
        return copyObject(value, keysIn(value));
      }
      function toSafeInteger(value) {
        return value ? baseClamp(toInteger2(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
      }
      function toString2(value) {
        return value == null ? "" : baseToString(value);
      }
      var assign2 = createAssigner(function(object, source2) {
        if (isPrototype2(source2) || isArrayLike(source2)) {
          copyObject(source2, keys3(source2), object);
          return;
        }
        for (var key in source2) {
          if (hasOwnProperty2.call(source2, key)) {
            assignValue(object, key, source2[key]);
          }
        }
      });
      var assignIn = createAssigner(function(object, source2) {
        copyObject(source2, keysIn(source2), object);
      });
      var assignInWith = createAssigner(function(object, source2, srcIndex, customizer) {
        copyObject(source2, keysIn(source2), object, customizer);
      });
      var assignWith = createAssigner(function(object, source2, srcIndex, customizer) {
        copyObject(source2, keys3(source2), object, customizer);
      });
      var at = flatRest(baseAt);
      function create2(prototype, properties2) {
        var result3 = baseCreate(prototype);
        return properties2 == null ? result3 : baseAssign(result3, properties2);
      }
      var defaults = baseRest(function(object, sources) {
        object = Object2(object);
        var index = -1;
        var length = sources.length;
        var guard = length > 2 ? sources[2] : undefined$12;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          length = 1;
        }
        while (++index < length) {
          var source2 = sources[index];
          var props = keysIn(source2);
          var propsIndex = -1;
          var propsLength = props.length;
          while (++propsIndex < propsLength) {
            var key = props[propsIndex];
            var value = object[key];
            if (value === undefined$12 || eq(value, objectProto[key]) && !hasOwnProperty2.call(object, key)) {
              object[key] = source2[key];
            }
          }
        }
        return object;
      });
      var defaultsDeep = baseRest(function(args) {
        args.push(undefined$12, customDefaultsMerge);
        return apply(mergeWith, undefined$12, args);
      });
      function findKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
      }
      function findLastKey(object, predicate) {
        return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
      }
      function forIn(object, iteratee2) {
        return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
      }
      function forInRight(object, iteratee2) {
        return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
      }
      function forOwn(object, iteratee2) {
        return object && baseForOwn(object, getIteratee(iteratee2, 3));
      }
      function forOwnRight(object, iteratee2) {
        return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
      }
      function functions(object) {
        return object == null ? [] : baseFunctions(object, keys3(object));
      }
      function functionsIn(object) {
        return object == null ? [] : baseFunctions(object, keysIn(object));
      }
      function get2(object, path2, defaultValue) {
        var result3 = object == null ? undefined$12 : baseGet(object, path2);
        return result3 === undefined$12 ? defaultValue : result3;
      }
      function has2(object, path2) {
        return object != null && hasPath(object, path2, baseHas);
      }
      function hasIn(object, path2) {
        return object != null && hasPath(object, path2, baseHasIn);
      }
      var invert = createInverter(function(result3, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString.call(value);
        }
        result3[value] = key;
      }, constant(identity));
      var invertBy = createInverter(function(result3, value, key) {
        if (value != null && typeof value.toString != "function") {
          value = nativeObjectToString.call(value);
        }
        if (hasOwnProperty2.call(result3, value)) {
          result3[value].push(key);
        } else {
          result3[value] = [key];
        }
      }, getIteratee);
      var invoke = baseRest(baseInvoke);
      function keys3(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      function keysIn(object) {
        return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
      }
      function mapKeys(object, iteratee2) {
        var result3 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result3, iteratee2(value, key, object2), value);
        });
        return result3;
      }
      function mapValues(object, iteratee2) {
        var result3 = {};
        iteratee2 = getIteratee(iteratee2, 3);
        baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result3, key, iteratee2(value, key, object2));
        });
        return result3;
      }
      var merge = createAssigner(function(object, source2, srcIndex) {
        baseMerge(object, source2, srcIndex);
      });
      var mergeWith = createAssigner(function(object, source2, srcIndex, customizer) {
        baseMerge(object, source2, srcIndex, customizer);
      });
      var omit = flatRest(function(object, paths) {
        var result3 = {};
        if (object == null) {
          return result3;
        }
        var isDeep = false;
        paths = arrayMap(paths, function(path2) {
          path2 = castPath(path2, object);
          isDeep || (isDeep = path2.length > 1);
          return path2;
        });
        copyObject(object, getAllKeysIn(object), result3);
        if (isDeep) {
          result3 = baseClone(result3, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
        }
        var length = paths.length;
        while (length--) {
          baseUnset(result3, paths[length]);
        }
        return result3;
      });
      function omitBy(object, predicate) {
        return pickBy(object, negate(getIteratee(predicate)));
      }
      var pick = flatRest(function(object, paths) {
        return object == null ? {} : basePick(object, paths);
      });
      function pickBy(object, predicate) {
        if (object == null) {
          return {};
        }
        var props = arrayMap(getAllKeysIn(object), function(prop) {
          return [prop];
        });
        predicate = getIteratee(predicate);
        return basePickBy(object, props, function(value, path2) {
          return predicate(value, path2[0]);
        });
      }
      function result2(object, path2, defaultValue) {
        path2 = castPath(path2, object);
        var index = -1, length = path2.length;
        if (!length) {
          length = 1;
          object = undefined$12;
        }
        while (++index < length) {
          var value = object == null ? undefined$12 : object[toKey(path2[index])];
          if (value === undefined$12) {
            index = length;
            value = defaultValue;
          }
          object = isFunction2(value) ? value.call(object) : value;
        }
        return object;
      }
      function set(object, path2, value) {
        return object == null ? object : baseSet(object, path2, value);
      }
      function setWith(object, path2, value, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$12;
        return object == null ? object : baseSet(object, path2, value, customizer);
      }
      var toPairs = createToPairs(keys3);
      var toPairsIn = createToPairs(keysIn);
      function transform(object, iteratee2, accumulator) {
        var isArr = isArray2(object), isArrLike = isArr || isBuffer2(object) || isTypedArray2(object);
        iteratee2 = getIteratee(iteratee2, 4);
        if (accumulator == null) {
          var Ctor = object && object.constructor;
          if (isArrLike) {
            accumulator = isArr ? new Ctor() : [];
          } else if (isObject3(object)) {
            accumulator = isFunction2(Ctor) ? baseCreate(getPrototype(object)) : {};
          } else {
            accumulator = {};
          }
        }
        (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
          return iteratee2(accumulator, value, index, object2);
        });
        return accumulator;
      }
      function unset(object, path2) {
        return object == null ? true : baseUnset(object, path2);
      }
      function update(object, path2, updater) {
        return object == null ? object : baseUpdate(object, path2, castFunction(updater));
      }
      function updateWith(object, path2, updater, customizer) {
        customizer = typeof customizer == "function" ? customizer : undefined$12;
        return object == null ? object : baseUpdate(object, path2, castFunction(updater), customizer);
      }
      function values(object) {
        return object == null ? [] : baseValues(object, keys3(object));
      }
      function valuesIn(object) {
        return object == null ? [] : baseValues(object, keysIn(object));
      }
      function clamp(number, lower, upper) {
        if (upper === undefined$12) {
          upper = lower;
          lower = undefined$12;
        }
        if (upper !== undefined$12) {
          upper = toNumber(upper);
          upper = upper === upper ? upper : 0;
        }
        if (lower !== undefined$12) {
          lower = toNumber(lower);
          lower = lower === lower ? lower : 0;
        }
        return baseClamp(toNumber(number), lower, upper);
      }
      function inRange(number, start, end) {
        start = toFinite(start);
        if (end === undefined$12) {
          end = start;
          start = 0;
        } else {
          end = toFinite(end);
        }
        number = toNumber(number);
        return baseInRange(number, start, end);
      }
      function random(lower, upper, floating) {
        if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
          upper = floating = undefined$12;
        }
        if (floating === undefined$12) {
          if (typeof upper == "boolean") {
            floating = upper;
            upper = undefined$12;
          } else if (typeof lower == "boolean") {
            floating = lower;
            lower = undefined$12;
          }
        }
        if (lower === undefined$12 && upper === undefined$12) {
          lower = 0;
          upper = 1;
        } else {
          lower = toFinite(lower);
          if (upper === undefined$12) {
            upper = lower;
            lower = 0;
          } else {
            upper = toFinite(upper);
          }
        }
        if (lower > upper) {
          var temp = lower;
          lower = upper;
          upper = temp;
        }
        if (floating || lower % 1 || upper % 1) {
          var rand = nativeRandom();
          return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
        }
        return baseRandom(lower, upper);
      }
      var camelCase = createCompounder(function(result3, word, index) {
        word = word.toLowerCase();
        return result3 + (index ? capitalize(word) : word);
      });
      function capitalize(string2) {
        return upperFirst(toString2(string2).toLowerCase());
      }
      function deburr(string2) {
        string2 = toString2(string2);
        return string2 && string2.replace(reLatin, deburrLetter).replace(reComboMark, "");
      }
      function endsWith(string2, target, position) {
        string2 = toString2(string2);
        target = baseToString(target);
        var length = string2.length;
        position = position === undefined$12 ? length : baseClamp(toInteger2(position), 0, length);
        var end = position;
        position -= target.length;
        return position >= 0 && string2.slice(position, end) == target;
      }
      function escape2(string2) {
        string2 = toString2(string2);
        return string2 && reHasUnescapedHtml.test(string2) ? string2.replace(reUnescapedHtml, escapeHtmlChar) : string2;
      }
      function escapeRegExp(string2) {
        string2 = toString2(string2);
        return string2 && reHasRegExpChar.test(string2) ? string2.replace(reRegExpChar, "\\$&") : string2;
      }
      var kebabCase = createCompounder(function(result3, word, index) {
        return result3 + (index ? "-" : "") + word.toLowerCase();
      });
      var lowerCase2 = createCompounder(function(result3, word, index) {
        return result3 + (index ? " " : "") + word.toLowerCase();
      });
      var lowerFirst = createCaseFirst("toLowerCase");
      function pad(string2, length, chars2) {
        string2 = toString2(string2);
        length = toInteger2(length);
        var strLength = length ? stringSize(string2) : 0;
        if (!length || strLength >= length) {
          return string2;
        }
        var mid = (length - strLength) / 2;
        return createPadding(nativeFloor(mid), chars2) + string2 + createPadding(nativeCeil(mid), chars2);
      }
      function padEnd(string2, length, chars2) {
        string2 = toString2(string2);
        length = toInteger2(length);
        var strLength = length ? stringSize(string2) : 0;
        return length && strLength < length ? string2 + createPadding(length - strLength, chars2) : string2;
      }
      function padStart(string2, length, chars2) {
        string2 = toString2(string2);
        length = toInteger2(length);
        var strLength = length ? stringSize(string2) : 0;
        return length && strLength < length ? createPadding(length - strLength, chars2) + string2 : string2;
      }
      function parseInt2(string2, radix, guard) {
        if (guard || radix == null) {
          radix = 0;
        } else if (radix) {
          radix = +radix;
        }
        return nativeParseInt(toString2(string2).replace(reTrimStart, ""), radix || 0);
      }
      function repeat(string2, n, guard) {
        if (guard ? isIterateeCall(string2, n, guard) : n === undefined$12) {
          n = 1;
        } else {
          n = toInteger2(n);
        }
        return baseRepeat(toString2(string2), n);
      }
      function replace2() {
        var args = arguments, string2 = toString2(args[0]);
        return args.length < 3 ? string2 : string2.replace(args[1], args[2]);
      }
      var snakeCase = createCompounder(function(result3, word, index) {
        return result3 + (index ? "_" : "") + word.toLowerCase();
      });
      function split(string2, separator, limit) {
        if (limit && typeof limit != "number" && isIterateeCall(string2, separator, limit)) {
          separator = limit = undefined$12;
        }
        limit = limit === undefined$12 ? MAX_ARRAY_LENGTH : limit >>> 0;
        if (!limit) {
          return [];
        }
        string2 = toString2(string2);
        if (string2 && (typeof separator == "string" || separator != null && !isRegExp2(separator))) {
          separator = baseToString(separator);
          if (!separator && hasUnicode(string2)) {
            return castSlice(stringToArray(string2), 0, limit);
          }
        }
        return string2.split(separator, limit);
      }
      var startCase = createCompounder(function(result3, word, index) {
        return result3 + (index ? " " : "") + upperFirst(word);
      });
      function startsWith(string2, target, position) {
        string2 = toString2(string2);
        position = position == null ? 0 : baseClamp(toInteger2(position), 0, string2.length);
        target = baseToString(target);
        return string2.slice(position, position + target.length) == target;
      }
      function template2(string2, options, guard) {
        var settings = lodash2.templateSettings;
        if (guard && isIterateeCall(string2, options, guard)) {
          options = undefined$12;
        }
        string2 = toString2(string2);
        options = assignInWith({}, options, settings, customDefaultsAssignIn);
        var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys3(imports), importsValues = baseValues(imports, importsKeys);
        var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source2 = "__p += '";
        var reDelimiters = RegExp2(
          (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
          "g"
        );
        var sourceURL = "//# sourceURL=" + (hasOwnProperty2.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
        string2.replace(reDelimiters, function(match2, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue);
          source2 += string2.slice(index, offset).replace(reUnescapedString, escapeStringChar);
          if (escapeValue) {
            isEscaping = true;
            source2 += "' +\n__e(" + escapeValue + ") +\n'";
          }
          if (evaluateValue) {
            isEvaluating = true;
            source2 += "';\n" + evaluateValue + ";\n__p += '";
          }
          if (interpolateValue) {
            source2 += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
          }
          index = offset + match2.length;
          return match2;
        });
        source2 += "';\n";
        var variable = hasOwnProperty2.call(options, "variable") && options.variable;
        if (!variable) {
          source2 = "with (obj) {\n" + source2 + "\n}\n";
        } else if (reForbiddenIdentifierChars.test(variable)) {
          throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
        }
        source2 = (isEvaluating ? source2.replace(reEmptyStringLeading, "") : source2).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
        source2 = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source2 + "return __p\n}";
        var result3 = attempt(function() {
          return Function2(importsKeys, sourceURL + "return " + source2).apply(undefined$12, importsValues);
        });
        result3.source = source2;
        if (isError2(result3)) {
          throw result3;
        }
        return result3;
      }
      function toLower(value) {
        return toString2(value).toLowerCase();
      }
      function toUpper(value) {
        return toString2(value).toUpperCase();
      }
      function trim(string2, chars2, guard) {
        string2 = toString2(string2);
        if (string2 && (guard || chars2 === undefined$12)) {
          return baseTrim(string2);
        }
        if (!string2 || !(chars2 = baseToString(chars2))) {
          return string2;
        }
        var strSymbols = stringToArray(string2), chrSymbols = stringToArray(chars2), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
        return castSlice(strSymbols, start, end).join("");
      }
      function trimEnd(string2, chars2, guard) {
        string2 = toString2(string2);
        if (string2 && (guard || chars2 === undefined$12)) {
          return string2.slice(0, trimmedEndIndex(string2) + 1);
        }
        if (!string2 || !(chars2 = baseToString(chars2))) {
          return string2;
        }
        var strSymbols = stringToArray(string2), end = charsEndIndex(strSymbols, stringToArray(chars2)) + 1;
        return castSlice(strSymbols, 0, end).join("");
      }
      function trimStart(string2, chars2, guard) {
        string2 = toString2(string2);
        if (string2 && (guard || chars2 === undefined$12)) {
          return string2.replace(reTrimStart, "");
        }
        if (!string2 || !(chars2 = baseToString(chars2))) {
          return string2;
        }
        var strSymbols = stringToArray(string2), start = charsStartIndex(strSymbols, stringToArray(chars2));
        return castSlice(strSymbols, start).join("");
      }
      function truncate(string2, options) {
        var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
        if (isObject3(options)) {
          var separator = "separator" in options ? options.separator : separator;
          length = "length" in options ? toInteger2(options.length) : length;
          omission = "omission" in options ? baseToString(options.omission) : omission;
        }
        string2 = toString2(string2);
        var strLength = string2.length;
        if (hasUnicode(string2)) {
          var strSymbols = stringToArray(string2);
          strLength = strSymbols.length;
        }
        if (length >= strLength) {
          return string2;
        }
        var end = length - stringSize(omission);
        if (end < 1) {
          return omission;
        }
        var result3 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string2.slice(0, end);
        if (separator === undefined$12) {
          return result3 + omission;
        }
        if (strSymbols) {
          end += result3.length - end;
        }
        if (isRegExp2(separator)) {
          if (string2.slice(end).search(separator)) {
            var match2, substring = result3;
            if (!separator.global) {
              separator = RegExp2(separator.source, toString2(reFlags.exec(separator)) + "g");
            }
            separator.lastIndex = 0;
            while (match2 = separator.exec(substring)) {
              var newEnd = match2.index;
            }
            result3 = result3.slice(0, newEnd === undefined$12 ? end : newEnd);
          }
        } else if (string2.indexOf(baseToString(separator), end) != end) {
          var index = result3.lastIndexOf(separator);
          if (index > -1) {
            result3 = result3.slice(0, index);
          }
        }
        return result3 + omission;
      }
      function unescape2(string2) {
        string2 = toString2(string2);
        return string2 && reHasEscapedHtml.test(string2) ? string2.replace(reEscapedHtml, unescapeHtmlChar) : string2;
      }
      var upperCase = createCompounder(function(result3, word, index) {
        return result3 + (index ? " " : "") + word.toUpperCase();
      });
      var upperFirst = createCaseFirst("toUpperCase");
      function words(string2, pattern, guard) {
        string2 = toString2(string2);
        pattern = guard ? undefined$12 : pattern;
        if (pattern === undefined$12) {
          return hasUnicodeWord(string2) ? unicodeWords(string2) : asciiWords(string2);
        }
        return string2.match(pattern) || [];
      }
      var attempt = baseRest(function(func, args) {
        try {
          return apply(func, undefined$12, args);
        } catch (e) {
          return isError2(e) ? e : new Error2(e);
        }
      });
      var bindAll = flatRest(function(object, methodNames) {
        arrayEach(methodNames, function(key) {
          key = toKey(key);
          baseAssignValue(object, key, bind3(object[key], object));
        });
        return object;
      });
      function cond(pairs) {
        var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
        pairs = !length ? [] : arrayMap(pairs, function(pair) {
          if (typeof pair[1] != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return [toIteratee(pair[0]), pair[1]];
        });
        return baseRest(function(args) {
          var index = -1;
          while (++index < length) {
            var pair = pairs[index];
            if (apply(pair[0], this, args)) {
              return apply(pair[1], this, args);
            }
          }
        });
      }
      function conforms(source2) {
        return baseConforms(baseClone(source2, CLONE_DEEP_FLAG));
      }
      function constant(value) {
        return function() {
          return value;
        };
      }
      function defaultTo(value, defaultValue) {
        return value == null || value !== value ? defaultValue : value;
      }
      var flow = createFlow();
      var flowRight = createFlow(true);
      function identity(value) {
        return value;
      }
      function iteratee(func) {
        return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
      }
      function matches(source2) {
        return baseMatches(baseClone(source2, CLONE_DEEP_FLAG));
      }
      function matchesProperty(path2, srcValue) {
        return baseMatchesProperty(path2, baseClone(srcValue, CLONE_DEEP_FLAG));
      }
      var method = baseRest(function(path2, args) {
        return function(object) {
          return baseInvoke(object, path2, args);
        };
      });
      var methodOf = baseRest(function(object, args) {
        return function(path2) {
          return baseInvoke(object, path2, args);
        };
      });
      function mixin(object, source2, options) {
        var props = keys3(source2), methodNames = baseFunctions(source2, props);
        if (options == null && !(isObject3(source2) && (methodNames.length || !props.length))) {
          options = source2;
          source2 = object;
          object = this;
          methodNames = baseFunctions(source2, keys3(source2));
        }
        var chain2 = !(isObject3(options) && "chain" in options) || !!options.chain, isFunc = isFunction2(object);
        arrayEach(methodNames, function(methodName) {
          var func = source2[methodName];
          object[methodName] = func;
          if (isFunc) {
            object.prototype[methodName] = function() {
              var chainAll = this.__chain__;
              if (chain2 || chainAll) {
                var result3 = object(this.__wrapped__), actions = result3.__actions__ = copyArray(this.__actions__);
                actions.push({ "func": func, "args": arguments, "thisArg": object });
                result3.__chain__ = chainAll;
                return result3;
              }
              return func.apply(object, arrayPush([this.value()], arguments));
            };
          }
        });
        return object;
      }
      function noConflict() {
        if (root._ === this) {
          root._ = oldDash;
        }
        return this;
      }
      function noop2() {
      }
      function nthArg(n) {
        n = toInteger2(n);
        return baseRest(function(args) {
          return baseNth(args, n);
        });
      }
      var over = createOver(arrayMap);
      var overEvery = createOver(arrayEvery);
      var overSome = createOver(arraySome);
      function property(path2) {
        return isKey(path2) ? baseProperty(toKey(path2)) : basePropertyDeep(path2);
      }
      function propertyOf(object) {
        return function(path2) {
          return object == null ? undefined$12 : baseGet(object, path2);
        };
      }
      var range2 = createRange();
      var rangeRight = createRange(true);
      function stubArray() {
        return [];
      }
      function stubFalse() {
        return false;
      }
      function stubObject() {
        return {};
      }
      function stubString() {
        return "";
      }
      function stubTrue() {
        return true;
      }
      function times(n, iteratee2) {
        n = toInteger2(n);
        if (n < 1 || n > MAX_SAFE_INTEGER) {
          return [];
        }
        var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
        iteratee2 = getIteratee(iteratee2);
        n -= MAX_ARRAY_LENGTH;
        var result3 = baseTimes(length, iteratee2);
        while (++index < n) {
          iteratee2(index);
        }
        return result3;
      }
      function toPath(value) {
        if (isArray2(value)) {
          return arrayMap(value, toKey);
        }
        return isSymbol2(value) ? [value] : copyArray(stringToPath3(toString2(value)));
      }
      function uniqueId(prefix) {
        var id = ++idCounter;
        return toString2(prefix) + id;
      }
      var add = createMathOperation(function(augend, addend) {
        return augend + addend;
      }, 0);
      var ceil = createRound("ceil");
      var divide = createMathOperation(function(dividend, divisor) {
        return dividend / divisor;
      }, 1);
      var floor2 = createRound("floor");
      function max2(array) {
        return array && array.length ? baseExtremum(array, identity, baseGt) : undefined$12;
      }
      function maxBy(array, iteratee2) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined$12;
      }
      function mean(array) {
        return baseMean(array, identity);
      }
      function meanBy(array, iteratee2) {
        return baseMean(array, getIteratee(iteratee2, 2));
      }
      function min(array) {
        return array && array.length ? baseExtremum(array, identity, baseLt) : undefined$12;
      }
      function minBy(array, iteratee2) {
        return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined$12;
      }
      var multiply = createMathOperation(function(multiplier, multiplicand) {
        return multiplier * multiplicand;
      }, 1);
      var round = createRound("round");
      var subtract = createMathOperation(function(minuend, subtrahend) {
        return minuend - subtrahend;
      }, 0);
      function sum(array) {
        return array && array.length ? baseSum(array, identity) : 0;
      }
      function sumBy(array, iteratee2) {
        return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
      }
      lodash2.after = after;
      lodash2.ary = ary;
      lodash2.assign = assign2;
      lodash2.assignIn = assignIn;
      lodash2.assignInWith = assignInWith;
      lodash2.assignWith = assignWith;
      lodash2.at = at;
      lodash2.before = before;
      lodash2.bind = bind3;
      lodash2.bindAll = bindAll;
      lodash2.bindKey = bindKey;
      lodash2.castArray = castArray;
      lodash2.chain = chain;
      lodash2.chunk = chunk;
      lodash2.compact = compact;
      lodash2.concat = concat2;
      lodash2.cond = cond;
      lodash2.conforms = conforms;
      lodash2.constant = constant;
      lodash2.countBy = countBy;
      lodash2.create = create2;
      lodash2.curry = curry;
      lodash2.curryRight = curryRight;
      lodash2.debounce = debounce;
      lodash2.defaults = defaults;
      lodash2.defaultsDeep = defaultsDeep;
      lodash2.defer = defer;
      lodash2.delay = delay;
      lodash2.difference = difference;
      lodash2.differenceBy = differenceBy;
      lodash2.differenceWith = differenceWith;
      lodash2.drop = drop;
      lodash2.dropRight = dropRight;
      lodash2.dropRightWhile = dropRightWhile;
      lodash2.dropWhile = dropWhile;
      lodash2.fill = fill;
      lodash2.filter = filter2;
      lodash2.flatMap = flatMap;
      lodash2.flatMapDeep = flatMapDeep;
      lodash2.flatMapDepth = flatMapDepth;
      lodash2.flatten = flatten;
      lodash2.flattenDeep = flattenDeep;
      lodash2.flattenDepth = flattenDepth;
      lodash2.flip = flip;
      lodash2.flow = flow;
      lodash2.flowRight = flowRight;
      lodash2.fromPairs = fromPairs;
      lodash2.functions = functions;
      lodash2.functionsIn = functionsIn;
      lodash2.groupBy = groupBy;
      lodash2.initial = initial;
      lodash2.intersection = intersection;
      lodash2.intersectionBy = intersectionBy;
      lodash2.intersectionWith = intersectionWith;
      lodash2.invert = invert;
      lodash2.invertBy = invertBy;
      lodash2.invokeMap = invokeMap;
      lodash2.iteratee = iteratee;
      lodash2.keyBy = keyBy;
      lodash2.keys = keys3;
      lodash2.keysIn = keysIn;
      lodash2.map = map2;
      lodash2.mapKeys = mapKeys;
      lodash2.mapValues = mapValues;
      lodash2.matches = matches;
      lodash2.matchesProperty = matchesProperty;
      lodash2.memoize = memoize2;
      lodash2.merge = merge;
      lodash2.mergeWith = mergeWith;
      lodash2.method = method;
      lodash2.methodOf = methodOf;
      lodash2.mixin = mixin;
      lodash2.negate = negate;
      lodash2.nthArg = nthArg;
      lodash2.omit = omit;
      lodash2.omitBy = omitBy;
      lodash2.once = once;
      lodash2.orderBy = orderBy;
      lodash2.over = over;
      lodash2.overArgs = overArgs;
      lodash2.overEvery = overEvery;
      lodash2.overSome = overSome;
      lodash2.partial = partial;
      lodash2.partialRight = partialRight;
      lodash2.partition = partition;
      lodash2.pick = pick;
      lodash2.pickBy = pickBy;
      lodash2.property = property;
      lodash2.propertyOf = propertyOf;
      lodash2.pull = pull;
      lodash2.pullAll = pullAll;
      lodash2.pullAllBy = pullAllBy;
      lodash2.pullAllWith = pullAllWith;
      lodash2.pullAt = pullAt;
      lodash2.range = range2;
      lodash2.rangeRight = rangeRight;
      lodash2.rearg = rearg;
      lodash2.reject = reject;
      lodash2.remove = remove;
      lodash2.rest = rest;
      lodash2.reverse = reverse;
      lodash2.sampleSize = sampleSize;
      lodash2.set = set;
      lodash2.setWith = setWith;
      lodash2.shuffle = shuffle;
      lodash2.slice = slice2;
      lodash2.sortBy = sortBy;
      lodash2.sortedUniq = sortedUniq;
      lodash2.sortedUniqBy = sortedUniqBy;
      lodash2.split = split;
      lodash2.spread = spread;
      lodash2.tail = tail;
      lodash2.take = take;
      lodash2.takeRight = takeRight;
      lodash2.takeRightWhile = takeRightWhile;
      lodash2.takeWhile = takeWhile;
      lodash2.tap = tap;
      lodash2.throttle = throttle;
      lodash2.thru = thru;
      lodash2.toArray = toArray;
      lodash2.toPairs = toPairs;
      lodash2.toPairsIn = toPairsIn;
      lodash2.toPath = toPath;
      lodash2.toPlainObject = toPlainObject2;
      lodash2.transform = transform;
      lodash2.unary = unary;
      lodash2.union = union;
      lodash2.unionBy = unionBy;
      lodash2.unionWith = unionWith;
      lodash2.uniq = uniq;
      lodash2.uniqBy = uniqBy;
      lodash2.uniqWith = uniqWith;
      lodash2.unset = unset;
      lodash2.unzip = unzip;
      lodash2.unzipWith = unzipWith;
      lodash2.update = update;
      lodash2.updateWith = updateWith;
      lodash2.values = values;
      lodash2.valuesIn = valuesIn;
      lodash2.without = without;
      lodash2.words = words;
      lodash2.wrap = wrap2;
      lodash2.xor = xor;
      lodash2.xorBy = xorBy;
      lodash2.xorWith = xorWith;
      lodash2.zip = zip;
      lodash2.zipObject = zipObject;
      lodash2.zipObjectDeep = zipObjectDeep;
      lodash2.zipWith = zipWith;
      lodash2.entries = toPairs;
      lodash2.entriesIn = toPairsIn;
      lodash2.extend = assignIn;
      lodash2.extendWith = assignInWith;
      mixin(lodash2, lodash2);
      lodash2.add = add;
      lodash2.attempt = attempt;
      lodash2.camelCase = camelCase;
      lodash2.capitalize = capitalize;
      lodash2.ceil = ceil;
      lodash2.clamp = clamp;
      lodash2.clone = clone2;
      lodash2.cloneDeep = cloneDeep;
      lodash2.cloneDeepWith = cloneDeepWith;
      lodash2.cloneWith = cloneWith;
      lodash2.conformsTo = conformsTo;
      lodash2.deburr = deburr;
      lodash2.defaultTo = defaultTo;
      lodash2.divide = divide;
      lodash2.endsWith = endsWith;
      lodash2.eq = eq;
      lodash2.escape = escape2;
      lodash2.escapeRegExp = escapeRegExp;
      lodash2.every = every;
      lodash2.find = find;
      lodash2.findIndex = findIndex;
      lodash2.findKey = findKey;
      lodash2.findLast = findLast;
      lodash2.findLastIndex = findLastIndex;
      lodash2.findLastKey = findLastKey;
      lodash2.floor = floor2;
      lodash2.forEach = forEach3;
      lodash2.forEachRight = forEachRight;
      lodash2.forIn = forIn;
      lodash2.forInRight = forInRight;
      lodash2.forOwn = forOwn;
      lodash2.forOwnRight = forOwnRight;
      lodash2.get = get2;
      lodash2.gt = gt;
      lodash2.gte = gte2;
      lodash2.has = has2;
      lodash2.hasIn = hasIn;
      lodash2.head = head;
      lodash2.identity = identity;
      lodash2.includes = includes;
      lodash2.indexOf = indexOf;
      lodash2.inRange = inRange;
      lodash2.invoke = invoke;
      lodash2.isArguments = isArguments5;
      lodash2.isArray = isArray2;
      lodash2.isArrayBuffer = isArrayBuffer;
      lodash2.isArrayLike = isArrayLike;
      lodash2.isArrayLikeObject = isArrayLikeObject;
      lodash2.isBoolean = isBoolean3;
      lodash2.isBuffer = isBuffer2;
      lodash2.isDate = isDate2;
      lodash2.isElement = isElement;
      lodash2.isEmpty = isEmpty;
      lodash2.isEqual = isEqual;
      lodash2.isEqualWith = isEqualWith;
      lodash2.isError = isError2;
      lodash2.isFinite = isFinite2;
      lodash2.isFunction = isFunction2;
      lodash2.isInteger = isInteger;
      lodash2.isLength = isLength;
      lodash2.isMap = isMap3;
      lodash2.isMatch = isMatch;
      lodash2.isMatchWith = isMatchWith;
      lodash2.isNaN = isNaN2;
      lodash2.isNative = isNative;
      lodash2.isNil = isNil;
      lodash2.isNull = isNull;
      lodash2.isNumber = isNumber2;
      lodash2.isObject = isObject3;
      lodash2.isObjectLike = isObjectLike;
      lodash2.isPlainObject = isPlainObject3;
      lodash2.isRegExp = isRegExp2;
      lodash2.isSafeInteger = isSafeInteger;
      lodash2.isSet = isSet3;
      lodash2.isString = isString3;
      lodash2.isSymbol = isSymbol2;
      lodash2.isTypedArray = isTypedArray2;
      lodash2.isUndefined = isUndefined;
      lodash2.isWeakMap = isWeakMap3;
      lodash2.isWeakSet = isWeakSet2;
      lodash2.join = join;
      lodash2.kebabCase = kebabCase;
      lodash2.last = last;
      lodash2.lastIndexOf = lastIndexOf;
      lodash2.lowerCase = lowerCase2;
      lodash2.lowerFirst = lowerFirst;
      lodash2.lt = lt;
      lodash2.lte = lte2;
      lodash2.max = max2;
      lodash2.maxBy = maxBy;
      lodash2.mean = mean;
      lodash2.meanBy = meanBy;
      lodash2.min = min;
      lodash2.minBy = minBy;
      lodash2.stubArray = stubArray;
      lodash2.stubFalse = stubFalse;
      lodash2.stubObject = stubObject;
      lodash2.stubString = stubString;
      lodash2.stubTrue = stubTrue;
      lodash2.multiply = multiply;
      lodash2.nth = nth;
      lodash2.noConflict = noConflict;
      lodash2.noop = noop2;
      lodash2.now = now;
      lodash2.pad = pad;
      lodash2.padEnd = padEnd;
      lodash2.padStart = padStart;
      lodash2.parseInt = parseInt2;
      lodash2.random = random;
      lodash2.reduce = reduce;
      lodash2.reduceRight = reduceRight;
      lodash2.repeat = repeat;
      lodash2.replace = replace2;
      lodash2.result = result2;
      lodash2.round = round;
      lodash2.runInContext = runInContext2;
      lodash2.sample = sample;
      lodash2.size = size;
      lodash2.snakeCase = snakeCase;
      lodash2.some = some;
      lodash2.sortedIndex = sortedIndex;
      lodash2.sortedIndexBy = sortedIndexBy;
      lodash2.sortedIndexOf = sortedIndexOf;
      lodash2.sortedLastIndex = sortedLastIndex;
      lodash2.sortedLastIndexBy = sortedLastIndexBy;
      lodash2.sortedLastIndexOf = sortedLastIndexOf;
      lodash2.startCase = startCase;
      lodash2.startsWith = startsWith;
      lodash2.subtract = subtract;
      lodash2.sum = sum;
      lodash2.sumBy = sumBy;
      lodash2.template = template2;
      lodash2.times = times;
      lodash2.toFinite = toFinite;
      lodash2.toInteger = toInteger2;
      lodash2.toLength = toLength;
      lodash2.toLower = toLower;
      lodash2.toNumber = toNumber;
      lodash2.toSafeInteger = toSafeInteger;
      lodash2.toString = toString2;
      lodash2.toUpper = toUpper;
      lodash2.trim = trim;
      lodash2.trimEnd = trimEnd;
      lodash2.trimStart = trimStart;
      lodash2.truncate = truncate;
      lodash2.unescape = unescape2;
      lodash2.uniqueId = uniqueId;
      lodash2.upperCase = upperCase;
      lodash2.upperFirst = upperFirst;
      lodash2.each = forEach3;
      lodash2.eachRight = forEachRight;
      lodash2.first = head;
      mixin(lodash2, function() {
        var source2 = {};
        baseForOwn(lodash2, function(func, methodName) {
          if (!hasOwnProperty2.call(lodash2.prototype, methodName)) {
            source2[methodName] = func;
          }
        });
        return source2;
      }(), { "chain": false });
      lodash2.VERSION = VERSION;
      arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
        lodash2[methodName].placeholder = lodash2;
      });
      arrayEach(["drop", "take"], function(methodName, index) {
        LazyWrapper.prototype[methodName] = function(n) {
          n = n === undefined$12 ? 1 : nativeMax(toInteger2(n), 0);
          var result3 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
          if (result3.__filtered__) {
            result3.__takeCount__ = nativeMin(n, result3.__takeCount__);
          } else {
            result3.__views__.push({
              "size": nativeMin(n, MAX_ARRAY_LENGTH),
              "type": methodName + (result3.__dir__ < 0 ? "Right" : "")
            });
          }
          return result3;
        };
        LazyWrapper.prototype[methodName + "Right"] = function(n) {
          return this.reverse()[methodName](n).reverse();
        };
      });
      arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
        var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
        LazyWrapper.prototype[methodName] = function(iteratee2) {
          var result3 = this.clone();
          result3.__iteratees__.push({
            "iteratee": getIteratee(iteratee2, 3),
            "type": type
          });
          result3.__filtered__ = result3.__filtered__ || isFilter;
          return result3;
        };
      });
      arrayEach(["head", "last"], function(methodName, index) {
        var takeName = "take" + (index ? "Right" : "");
        LazyWrapper.prototype[methodName] = function() {
          return this[takeName](1).value()[0];
        };
      });
      arrayEach(["initial", "tail"], function(methodName, index) {
        var dropName = "drop" + (index ? "" : "Right");
        LazyWrapper.prototype[methodName] = function() {
          return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
        };
      });
      LazyWrapper.prototype.compact = function() {
        return this.filter(identity);
      };
      LazyWrapper.prototype.find = function(predicate) {
        return this.filter(predicate).head();
      };
      LazyWrapper.prototype.findLast = function(predicate) {
        return this.reverse().find(predicate);
      };
      LazyWrapper.prototype.invokeMap = baseRest(function(path2, args) {
        if (typeof path2 == "function") {
          return new LazyWrapper(this);
        }
        return this.map(function(value) {
          return baseInvoke(value, path2, args);
        });
      });
      LazyWrapper.prototype.reject = function(predicate) {
        return this.filter(negate(getIteratee(predicate)));
      };
      LazyWrapper.prototype.slice = function(start, end) {
        start = toInteger2(start);
        var result3 = this;
        if (result3.__filtered__ && (start > 0 || end < 0)) {
          return new LazyWrapper(result3);
        }
        if (start < 0) {
          result3 = result3.takeRight(-start);
        } else if (start) {
          result3 = result3.drop(start);
        }
        if (end !== undefined$12) {
          end = toInteger2(end);
          result3 = end < 0 ? result3.dropRight(-end) : result3.take(end - start);
        }
        return result3;
      };
      LazyWrapper.prototype.takeRightWhile = function(predicate) {
        return this.reverse().takeWhile(predicate).reverse();
      };
      LazyWrapper.prototype.toArray = function() {
        return this.take(MAX_ARRAY_LENGTH);
      };
      baseForOwn(LazyWrapper.prototype, function(func, methodName) {
        var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash2[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
        if (!lodashFunc) {
          return;
        }
        lodash2.prototype[methodName] = function() {
          var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray2(value);
          var interceptor = function(value2) {
            var result4 = lodashFunc.apply(lodash2, arrayPush([value2], args));
            return isTaker && chainAll ? result4[0] : result4;
          };
          if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
            isLazy = useLazy = false;
          }
          var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
          if (!retUnwrapped && useLazy) {
            value = onlyLazy ? value : new LazyWrapper(this);
            var result3 = func.apply(value, args);
            result3.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined$12 });
            return new LodashWrapper(result3, chainAll);
          }
          if (isUnwrapped && onlyLazy) {
            return func.apply(this, args);
          }
          result3 = this.thru(interceptor);
          return isUnwrapped ? isTaker ? result3.value()[0] : result3.value() : result3;
        };
      });
      arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
        var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
        lodash2.prototype[methodName] = function() {
          var args = arguments;
          if (retUnwrapped && !this.__chain__) {
            var value = this.value();
            return func.apply(isArray2(value) ? value : [], args);
          }
          return this[chainName](function(value2) {
            return func.apply(isArray2(value2) ? value2 : [], args);
          });
        };
      });
      baseForOwn(LazyWrapper.prototype, function(func, methodName) {
        var lodashFunc = lodash2[methodName];
        if (lodashFunc) {
          var key = lodashFunc.name + "";
          if (!hasOwnProperty2.call(realNames, key)) {
            realNames[key] = [];
          }
          realNames[key].push({ "name": methodName, "func": lodashFunc });
        }
      });
      realNames[createHybrid(undefined$12, WRAP_BIND_KEY_FLAG).name] = [{
        "name": "wrapper",
        "func": undefined$12
      }];
      LazyWrapper.prototype.clone = lazyClone;
      LazyWrapper.prototype.reverse = lazyReverse;
      LazyWrapper.prototype.value = lazyValue;
      lodash2.prototype.at = wrapperAt;
      lodash2.prototype.chain = wrapperChain;
      lodash2.prototype.commit = wrapperCommit;
      lodash2.prototype.next = wrapperNext;
      lodash2.prototype.plant = wrapperPlant;
      lodash2.prototype.reverse = wrapperReverse;
      lodash2.prototype.toJSON = lodash2.prototype.valueOf = lodash2.prototype.value = wrapperValue;
      lodash2.prototype.first = lodash2.prototype.head;
      if (symIterator) {
        lodash2.prototype[symIterator] = wrapperToIterator;
      }
      return lodash2;
    };
    var _ = runInContext();
    if (freeModule) {
      (freeModule.exports = _)._ = _;
      freeExports._ = _;
    } else {
      root._ = _;
    }
  }).call(commonjsGlobal);
})(lodash, lodash.exports);
function notValidHexMessage(functionName, hex) {
  return functionName + ": " + hex + " is not a valid hex color.";
}
function notValidRgbMessage(functionName, rgb) {
  return functionName + ": " + JSON.stringify(rgb) + " is not a valid rgb color object.";
}
function notValidRgbaMessage(functionName, rgba) {
  return functionName + ": " + JSON.stringify(rgba) + " is not a valid rgba color object.";
}
function notValidHslMessage(functionName, hsl) {
  return functionName + ": " + JSON.stringify(hsl) + " is not a valid hsl color object.";
}
function notValidHslaMessage(functionName, hsla) {
  return functionName + ": " + JSON.stringify(hsla) + " is not a valid hsla color object.";
}
function notValidAlphaValueMessage(functionName, alpha) {
  return functionName + ": " + alpha + " is not in range [0, 1].";
}
function chunkString(str2, size) {
  return str2.match(new RegExp(".{1," + size + "}", "g"));
}
function alphaToHex(alpha) {
  if (!between(alpha, [0, 1]))
    throw new Error(alpha + " is not in the range [0, 1].");
  var integerIn0255 = Math.round(alpha * 255);
  var hexValue = integerIn0255.toString(16);
  return hexValue.padStart(2, "0").toUpperCase();
}
function hexToAlpha(hex, precision) {
  if (precision === void 0) {
    precision = 2;
  }
  if (!HEX_REGEX.alpha.test(hex))
    throw new Error(hex + " is not a valid hex color.");
  if (hex.length !== 2)
    throw new Error(hex + " lenght is not 2.");
  var integer = hexadecimalToDecimal(hex);
  var integerIn0255 = integer / 255;
  return lodash.exports.round(integerIn0255, precision);
}
function hexAlphaTo0255(hexAlpha) {
  return Math.round(hexToAlpha(hexAlpha) * 255);
}
function number0255ToHex(value) {
  if (!between(value, [0, 255]))
    throw new Error(value + " must be in [0, 255].");
  var hex = Math.round(value).toString(16);
  return hex.padStart(2, "0").toUpperCase();
}
var __assign$5 = globalThis && globalThis.__assign || function() {
  __assign$5 = Object.assign || function(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$5.apply(this, arguments);
};
function hslaToHex(hsla) {
  if (!isHsla(hsla))
    throw new Error(notValidHslaMessage("hslaToHex", hsla));
  var h = hsla.h, s = hsla.s, l = hsla.l, a = hsla.a;
  var hex = hslToHex({ h, s, l });
  return "" + hex + alphaToHex(a);
}
function hslaToRgba(hsla) {
  if (!isHsla(hsla))
    throw new Error(notValidHslaMessage("hslaToRgba", hsla));
  var h = hsla.h, s = hsla.s, l = hsla.l, a = hsla.a;
  var rgb = hslToRgb({ h, s, l });
  return __assign$5(__assign$5({}, rgb), { a });
}
var __assign$4 = globalThis && globalThis.__assign || function() {
  __assign$4 = Object.assign || function(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$4.apply(this, arguments);
};
function hslToHex(hsl) {
  if (!isHsl(hsl))
    throw new Error(notValidHslMessage("hslToHex", hsl));
  var rgb = hslToRgb(hsl);
  return rgbToHex(rgb);
}
function hslToRgb(hsl) {
  if (!isHsl(hsl))
    throw new Error(notValidHslMessage("hslToRgb", hsl));
  var h = hsl.h, s = hsl.s, l = hsl.l;
  var s01 = s / 100;
  var l01 = l / 100;
  if (s01 === 0) {
    var l_1 = l01 * 255;
    return { r: l_1, g: l_1, b: l_1 };
  }
  var angle = h / 60 % 6;
  var angleRangeIndex = Math.floor(angle);
  var f = angle - angleRangeIndex;
  var chroma = s01 * (1 - Math.abs(2 * l01 - 1));
  var p = l01 + chroma / 2;
  var q = l01 - chroma / 2;
  var t = p - chroma * f;
  var w = q + chroma * f;
  var rgb01 = { r: 0, g: 0, b: 0 };
  if (angleRangeIndex === 0) {
    rgb01 = { r: p, g: w, b: q };
  } else if (angleRangeIndex === 1) {
    rgb01 = { r: t, g: p, b: q };
  } else if (angleRangeIndex === 2) {
    rgb01 = { r: q, g: p, b: w };
  } else if (angleRangeIndex === 3) {
    rgb01 = { r: q, g: t, b: p };
  } else if (angleRangeIndex === 4) {
    rgb01 = { r: w, g: q, b: p };
  } else {
    rgb01 = { r: p, g: q, b: t };
  }
  var rgb = applyFnToEachObjValue(rgb01, function(c) {
    return lodash.exports.round(c * 255);
  });
  return rgb;
}
var __assign$3 = globalThis && globalThis.__assign || function() {
  __assign$3 = Object.assign || function(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$3.apply(this, arguments);
};
var __assign$2 = globalThis && globalThis.__assign || function() {
  __assign$2 = Object.assign || function(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$2.apply(this, arguments);
};
function rgbaToHex(rgba) {
  if (!isRgba(rgba))
    throw new Error(notValidRgbaMessage("rgbaToHex", rgba));
  var r = rgba.r, g2 = rgba.g, b = rgba.b, a = rgba.a;
  var rgbHex = rgbToHex({ r, g: g2, b });
  var alphaHex = alphaToHex(a);
  return "" + rgbHex + alphaHex;
}
function rgbaToHsl(rgba) {
  if (!isRgba(rgba))
    throw new Error(notValidRgbaMessage("rgbaToHsl", rgba));
  var r = rgba.r, g2 = rgba.g, b = rgba.b;
  return rgbToHsl({ r, g: g2, b });
}
function rgbaToHsla(rgba) {
  if (!isRgba(rgba))
    throw new Error(notValidRgbaMessage("rgbaToHsla", rgba));
  return __assign$2(__assign$2({}, rgbaToHsl(rgba)), { a: rgba.a });
}
var ALPHA_PRECISION = 4;
var __assign$1 = globalThis && globalThis.__assign || function() {
  __assign$1 = Object.assign || function(t) {
    for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
      s = arguments[i2];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
function hexToRgbOrRgba(hex) {
  if (!isHex(hex))
    throw new Error(notValidHexMessage("hexToRgbOrRgba", hex));
  var hexLongWtihoutHashtag = shortToLongHex(hex).substring(1);
  var _a3 = chunkString(hexLongWtihoutHashtag, 2), r = _a3[0], g2 = _a3[1], b = _a3[2], a = _a3[3];
  var r0255 = hexAlphaTo0255(r);
  var g0255 = hexAlphaTo0255(g2);
  var b0255 = hexAlphaTo0255(b);
  var rgb = { r: r0255, g: g0255, b: b0255 };
  if (a)
    return __assign$1(__assign$1({}, rgb), { a: hexToAlpha(a, ALPHA_PRECISION) });
  return rgb;
}
function hexToRgba(hex, alpha) {
  if (alpha === void 0) {
    alpha = 1;
  }
  if (!isHex(hex))
    throw new Error(notValidHexMessage("hex2rgba", hex));
  if (!between(alpha, [0, 1]))
    throw new Error(notValidAlphaValueMessage("hex2rgba", alpha));
  var rgbOrRgba = hexToRgbOrRgba(hex);
  if (isRgb(rgbOrRgba))
    return __assign$1(__assign$1({}, rgbOrRgba), { a: alpha });
  return rgbOrRgba;
}
function shortToLongHex(hex) {
  if (!isHex(hex))
    throw new Error(notValidHexMessage("shortToLongHex", hex));
  if (!HEX_REGEX.short.test(hex))
    return hex;
  var _a3 = Array.from(hex), hashtag = _a3[0], r = _a3[1], g2 = _a3[2], b = _a3[3], a = _a3[4];
  return a ? "" + hashtag + r + r + g2 + g2 + b + b + a + a : "" + hashtag + r + r + g2 + g2 + b + b;
}
var __assign = globalThis && globalThis.__assign || function() {
  __assign = Object.assign || function(t) {
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
function rgbToHex(rgb) {
  if (!isRgb(rgb))
    throw new Error(notValidRgbMessage("rgbToHex", rgb));
  var hex = Object.values(rgb).map(function(n) {
    return number0255ToHex(n);
  }).join("");
  return "#" + hex;
}
function rgbToHsl(rgb) {
  if (!isRgb(rgb))
    throw new Error(notValidRgbMessage("rgbToHsl", rgb));
  var r = rgb.r, g2 = rgb.g, b = rgb.b;
  var max2 = Math.max(r, g2, b);
  var min = Math.min(r, g2, b);
  var l = (max2 + min) / 2;
  if (max2 === min)
    return { h: 0, s: 0, l: l / 255 * 100 };
  var chroma = max2 - min;
  var s = Math.abs(chroma / (1 - Math.abs(2 * l - 1))) * 100 - 1;
  var h;
  switch (max2) {
    case r:
      h = 60 * ((g2 - b) / chroma) + (g2 < b ? 360 : 0);
      break;
    case g2:
      h = 120 + 60 * (b - r) / chroma;
      break;
    case b:
      h = 240 + 60 * (r - g2) / chroma;
      break;
  }
  var hsl = { h, s, l: l / 255 * 100 };
  var hslRounded = applyFnToEachObjValue(hsl, function(c) {
    return lodash.exports.round(c);
  });
  return hslRounded;
}
function __hslaToRgba(h, s, l, a = 1) {
  if (typeof h === "object") {
    h = h.h;
    s = h.s;
    l = h.l;
    a = h.a;
  }
  const rgba = hslaToRgba({
    h,
    s,
    l,
    a
  });
  return rgba;
}
function __hexToRgba(hex) {
  return hexToRgba(hex, 1);
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
function __rgbaToHsla(r, g2, b, a = 1) {
  if (typeof r === "object") {
    g2 = r.g;
    b = r.b;
    a = r.a;
    r = r.r;
  }
  return rgbaToHsla({
    r,
    g: g2,
    b,
    a
  });
}
function __parse(color, format = "rgba") {
  color = color.replace(/\s/g, "");
  if (color.indexOf("rgb") != -1) {
    color = __parseRgba(color);
  } else if (color.indexOf("hsl") != -1) {
    color = __parseHsla(color);
    color = __hslaToRgba(color.h, color.s, color.l);
  } else if (color.substring(0, 1) == "#") {
    color = __hexToRgba(color);
  }
  switch (format) {
    case "hsla":
    case "hsl":
      return __rgbaToHsla(color);
    case "rgba":
    case "rgb":
    default:
      return color;
  }
}
function __rgbaToHex(r, g2, b, a = 1) {
  if (typeof r === "object") {
    g2 = r.g;
    b = r.b;
    a = r.a;
    r = r.r;
  }
  let res = rgbaToHex({
    r,
    g: g2,
    b,
    a
  });
  if (res.length === 9) {
    res = res.slice(0, -2);
  }
  return res;
}
function __convert(input, format = "rgba") {
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
  switch (format) {
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
function __hslaToHex(h, s, l, a = 1) {
  const hex = hslaToHex({
    h,
    s,
    l,
    a
  });
  return hex.slice(0, -2);
}
function __hslaToHexa(h, s, l, a = 1) {
  const hex = hslaToHex({
    h,
    s,
    l,
    a
  });
  return hex;
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
  constructor(color, settings) {
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
  getColor(color) {
    if (typeof color == "string" && SColor.colors[color.toLowerCase()]) {
      return SColor.colors[color.toLowerCase()];
    }
    return color;
  }
  _parse(color) {
    color = __convert(color, "hsla");
    this.h = color.h;
    this.s = color.s;
    this.l = color.l;
    this.a = color.a;
    return color;
  }
  _convert2(format) {
    switch (format) {
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
      colorInstance = new SColor(this.toHex());
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
  toString(format = this.settings.defaultFormat) {
    switch (format) {
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
SColor.colors = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  "indianred ": "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgrey: "#d3d3d3",
  lightgreen: "#90ee90",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370d8",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#d87093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
class SSugarConfig {
  static get finalConfig() {
    var _a3, _b2;
    if (SSugarConfig._finalConfig)
      return SSugarConfig._finalConfig;
    SSugarConfig._finalConfig = __deepMerge(
      (_b2 = (_a3 = document.env.SUGAR) === null || _a3 === void 0 ? void 0 : _a3.config) !== null && _b2 !== void 0 ? _b2 : {}
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
function __adoptStyleInShadowRoot($shadowRoot, $context = document) {
  return __awaiter$9(this, void 0, void 0, function* () {
    const $links = $context.querySelectorAll('link[rel="stylesheet"]');
    if ($links && $shadowRoot) {
      Array.from($links).forEach(($link) => __awaiter$9(this, void 0, void 0, function* () {
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
function __inViewportStatusChange($elm, settings) {
  let status = "out", observer, isInViewport = false;
  settings = Object.assign({ offset: "10px" }, settings !== null && settings !== void 0 ? settings : {});
  return new SPromise(({ emit }) => {
    const _cb = () => {
      if (!isInViewport && status === "in") {
        status = "out";
        emit("leave", $elm);
      } else if (isInViewport && status === "out") {
        status = "in";
        emit("enter", $elm);
      }
    };
    observer = new IntersectionObserver((entries, observer2) => {
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
    observer.observe($elm);
  }).on("cancel", () => {
    var _a3;
    (_a3 = observer.disconnect) === null || _a3 === void 0 ? void 0 : _a3.call(observer);
  });
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
  "animationEnd"
];
function __when($elm, trigger, settings) {
  const finalSettings = Object.assign({ whenInViewport: {}, whenNearViewport: {}, whenOutOfViewport: {}, whenInteract: {}, whenVisible: {}, whenStylesheetsReady: {} }, settings !== null && settings !== void 0 ? settings : {});
  return new SPromise(({ resolve, reject }) => __awaiter$8(this, void 0, void 0, function* () {
    if (!Array.isArray(trigger))
      trigger = trigger.split(",").map((t) => t.trim());
    const promises = [];
    trigger.forEach((t) => {
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
          promises.push(__whenVisible($elm, finalSettings.whenVisible));
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
  return new Promise((resolve) => __awaiter$7(this, void 0, void 0, function* () {
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
function __whenInViewport(elm, settings = {}) {
  settings = Object.assign({ offset: "10px" }, settings);
  let observer;
  const pro = new SPromise(({ resolve }) => {
    const options = {
      root: null,
      rootMargin: settings.offset,
      threshold: 0
    };
    function onChange(changes) {
      changes.forEach((change) => {
        var _a3;
        if (change.intersectionRatio > 0) {
          (_a3 = observer.disconnect) === null || _a3 === void 0 ? void 0 : _a3.call(observer);
          resolve(elm);
        }
      });
    }
    observer = new IntersectionObserver(onChange, options);
    observer.observe(elm);
  });
  pro.on("cancel", () => {
    observer === null || observer === void 0 ? void 0 : observer.disconnect();
  });
  return pro;
}
function alreadyLoaded(link) {
  const href = link.href;
  let result2 = false;
  for (let i2 = 0; i2 < document.styleSheets.length; i2++) {
    if (document.styleSheets[i2].href && document.styleSheets[i2].href.match(href)) {
      result2 = true;
    } else if (i2 == document.styleSheets.length - 1)
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
  return new SPromise(({ resolve }) => __awaiter$6(this, void 0, void 0, function* () {
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
function __whenVisible($elm, cb = null) {
  return new Promise((resolve, reject) => {
    let isSelfVisible = false, areParentsVisible = false, closestNotVisible = null, selfObserver = null, parentObserver = null;
    const _cb = () => {
      var _a3, _b2;
      if (isSelfVisible) {
        (_a3 = selfObserver === null || selfObserver === void 0 ? void 0 : selfObserver.disconnect) === null || _a3 === void 0 ? void 0 : _a3.call(selfObserver);
        $elm.removeEventListener("transitionend", _eventCb);
        $elm.removeEventListener("animationstart", _eventCb);
        $elm.removeEventListener("animationend", _eventCb);
      }
      if (areParentsVisible) {
        (_b2 = parentObserver === null || parentObserver === void 0 ? void 0 : parentObserver.disconnect) === null || _b2 === void 0 ? void 0 : _b2.call(parentObserver);
        if (closestNotVisible) {
          closestNotVisible.removeEventListener("transitionend", _eventCb);
          closestNotVisible.removeEventListener("animationstart", _eventCb);
          closestNotVisible.removeEventListener("animationend", _eventCb);
        }
      }
      if (isSelfVisible && areParentsVisible) {
        cb === null || cb === void 0 ? void 0 : cb($elm);
        resolve($elm);
        $elm.removeEventListener("transitionend", _eventCb);
        $elm.removeEventListener("animationstart", _eventCb);
        $elm.removeEventListener("animationend", _eventCb);
      }
    };
    const _eventCb = (e) => {
      isSelfVisible = isVisible($elm);
      if (closestNotVisible) {
        areParentsVisible = isVisible(closestNotVisible);
      }
      _cb();
    };
    if (!isVisible($elm)) {
      selfObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "style" || mutation.attributeName === "class") {
            if (isVisible(mutation.target)) {
              isSelfVisible = true;
              _cb();
              selfObserver.disconnect();
            }
          }
        });
      });
      selfObserver.observe($elm, { attributes: true });
      $elm.addEventListener("animationstart", _eventCb);
      $elm.addEventListener("animationend", _eventCb);
      $elm.addEventListener("transitionend", _eventCb);
    } else {
      isSelfVisible = true;
    }
    closestNotVisible = __closestNotVisible($elm);
    if (closestNotVisible) {
      parentObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "style" || mutation.attributeName === "class") {
            if (isVisible(mutation.target)) {
              areParentsVisible = true;
              _cb();
              parentObserver.disconnect();
            }
          }
        });
      });
      parentObserver.observe(closestNotVisible, { attributes: true });
      closestNotVisible.addEventListener("animationstart", _eventCb);
      closestNotVisible.addEventListener("animationend", _eventCb);
      closestNotVisible.addEventListener("transitionend", _eventCb);
    } else {
      areParentsVisible = true;
    }
    _cb();
  });
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
function isVisible(elm) {
  if (elm.nodeName.toLowerCase() === "script")
    return true;
  const style = window.getComputedStyle(elm, null), opacity = style["opacity"], visibility = style["visibility"], display = style["display"];
  return "0" !== opacity && "none" !== display && "hidden" !== visibility;
}
function __closestNotVisible(elm) {
  const originalElm = elm;
  elm = elm.parentNode;
  while (elm && elm != originalElm.ownerDocument) {
    if (!isVisible(elm)) {
      return elm;
    }
    elm = elm.parentNode;
  }
  return null;
}
function __closestScrollable($elm, selector) {
  const res = __traverseUp($elm, ($e) => __isScrollable($e));
  return res;
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
function __querySelectorLive(selector, cb = null, settings = {}, _isFirstLevel = true) {
  var _a3, _b2, _c2;
  let _emit, noScopeSelector, observer, canceled = false;
  __uniqid();
  const selectedNodes = [];
  settings = __deepMerge({
    rootNode: document,
    once: true,
    afterFirst: null,
    scopes: true,
    firstOnly: false,
    when: void 0
  }, settings);
  if (selector === "s-clipboard-copy") {
    console.log("SE", settings);
  }
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
  function handleNode(node2, sel) {
    if (isCanceled()) {
      return;
    }
    _emit === null || _emit === void 0 ? void 0 : _emit("node", {
      node: node2,
      cancel() {
        pro.cancel();
      }
    });
    cb === null || cb === void 0 ? void 0 : cb(node2, {
      cancel() {
        pro.cancel();
      }
    });
    if (settings.firstOnly) {
      pro.cancel();
    }
    if (!selectedNodes.includes(node2)) {
      selectedNodes.push(node2);
    }
  }
  function processNode(node2, sel) {
    return __awaiter$5(this, void 0, void 0, function* () {
      if (!node2.matches || isCanceled()) {
        return;
      }
      if (node2.matches(selector) && (!settings.once || !selectedNodes.includes(node2))) {
        if (settings.when) {
          yield __when(node2, settings.when);
          if (isCanceled()) {
            return;
          }
          handleNode(node2);
        } else {
          handleNode(node2);
        }
      }
      findAndProcess(node2, sel);
    });
  }
  function findAndProcess($root, sel) {
    if (!$root.querySelectorAll || isCanceled()) {
      return;
    }
    const nodes = Array.from($root === null || $root === void 0 ? void 0 : $root.querySelectorAll(sel));
    nodes.forEach((node2) => {
      processNode(node2, sel);
    });
  }
  if (settings.scopes && (settings.rootNode === document || !((_a3 = settings.rootNode) === null || _a3 === void 0 ? void 0 : _a3.hasAttribute("s-scope")))) {
    let isAfterCalledByScopeId = {};
    innerPromises.push(__querySelectorLive("[s-scope]", ($scope) => __awaiter$5(this, void 0, void 0, function* () {
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
          processNode(node, selector);
        }
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach((node2) => {
            processNode(node2, selector);
          });
        }
      });
    });
    observer.observe(settings.rootNode, {
      childList: true,
      subtree: true
    });
    if (selector === "s-clipboard-copy") {
      console.log("SE", settings);
    }
    findAndProcess(settings.rootNode, selector);
    (_c2 = settings.afterFirst) === null || _c2 === void 0 ? void 0 : _c2.call(settings);
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
let requestAnimationFrame;
try {
  requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
} catch (e) {
}
function __compressVarName(name2) {
  return name2;
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
class SThemeBase extends SEventEmitter {
  constructor(theme, variant) {
    super({});
    this._overridedConfig = {};
    this.theme = theme !== null && theme !== void 0 ? theme : SSugarConfig.get("theme.theme");
    this.variant = variant !== null && variant !== void 0 ? variant : SSugarConfig.get("theme.variant");
    if (!SSugarConfig.get(`theme.themes.${this.theme}-${this.variant}`)) {
      throw new Error(`Sorry but the requested theme "<yellow>${this.theme}-${this.variant}</yellow>" does not exists...`);
    }
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
  static getTheme(theme, variant) {
    const themesNames = Object.keys(SSugarConfig.get("theme.themes"));
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
    if (this._instanciatedThemes[`${theme}-${variant}`]) {
      return this._instanciatedThemes[`${theme}-${variant}`];
    }
    if (!themesNames[`${theme}-${variant}`]) {
      this._instanciatedThemes[`${theme}-${variant}`] = new this(theme, variant);
    }
    return this._instanciatedThemes[`${theme}-${variant}`];
  }
  static hash(dotPath = "") {
    const config2 = this.get(dotPath);
    return __objectHash(config2);
  }
  static cssVar(dotPath, fallback = true) {
    let fb = this.getTheme().get(dotPath);
    if (!fallback || typeof fb === "string" && fb.includes(","))
      fb = 0;
    const v2 = `var(${__compressVarName(`--s-theme-${dotPath.replace(/\./gm, "-").replace(/:/gm, "-").replace(/\?/gm, "").replace(/--/gm, "-")}`)}, ${fb})`;
    return v2;
  }
  static buildMediaQuery(queryString) {
    let currentQueryList = [];
    const queryAr = queryString.split(" ").map((l) => l.trim()).filter((l) => l !== "");
    queryAr.forEach((query, i2) => {
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
        const value = mediaQueryConfig[prop];
        if (!value)
          return;
        if ([
          "min-width",
          "max-width",
          "min-device-width",
          "max-device-width"
        ].indexOf(prop) !== -1) {
          if (action === ">") {
            if (prop === "max-width" || prop === "max-device-width") {
              let argName = "min-width";
              if (prop.includes("-device"))
                argName = "min-device-width";
              queryList.push(`(${argName}: ${value + 1}px)`);
            }
          } else if (action === "<") {
            if (prop === "min-width" || prop === "min-device-width") {
              let argName = "max-width";
              if (prop.includes("-device"))
                argName = "max-device-width";
              queryList.push(`(${argName}: ${value}px)`);
            }
          } else if (action === "=") {
            queryList.push(`(${prop}: ${value}px)`);
          } else if (action === ">=") {
            if (prop === "min-width" || prop === "min-device-width") {
              queryList.push(`(${prop}: ${value}px)`);
            }
          } else if (action === "<=") {
            if (prop === "max-width" || prop === "max-device-width") {
              queryList.push(`(${prop}: ${value}px)`);
            }
          } else {
            queryList.push(`(${prop}: ${value}px)`);
          }
        } else {
          queryList.push(`(${prop}: ${value}px)`);
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
      let color, modifier;
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
            color = value;
            modifier = "";
            if (Array.isArray(value)) {
              color = value[0];
              modifier = value[1];
            }
            propsStack.push(`color: sugar.color(${color}, ${modifier});`);
            break;
          case "background-color":
            color = value;
            modifier = "";
            if (Array.isArray(value)) {
              color = value[0];
              modifier = value[1];
            }
            propsStack.push(`background-color: sugar.color(${color}, ${modifier});`);
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
        const color = key.match(/^color\.([a-zA-Z0-9]+)\./);
        if (!(color === null || color === void 0 ? void 0 : color[1]))
          continue;
        const props = this.remapCssColor(color[1], value);
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
  static remapCssColor(from2, to) {
    const result2 = {
      vars: [],
      properties: {}
    };
    if (__isColor(to)) {
      const color = new SColor(to);
      result2.vars = [
        `${__compressVarName(`--s-theme-color-${from2}-h`)}: ${color.h};`,
        `${__compressVarName(`--s-theme-color-${from2}-s`)}: ${color.s};`,
        `${__compressVarName(`--s-theme-color-${from2}-l`)}: ${color.l};`,
        `${__compressVarName(`--s-theme-color-${from2}-a`)}: ${color.a};`
      ];
      result2.properties[__compressVarName(`--s-theme-color-${from2}-h`)] = color.h;
      result2.properties[__compressVarName(`--s-theme-color-${from2}-s`)] = color.s;
      result2.properties[__compressVarName(`--s-theme-color-${from2}-l`)] = color.l;
      result2.properties[__compressVarName(`--s-theme-color-${from2}-a`)] = color.a;
    } else {
      const toColorName = to.split("-").slice(0, 1)[0], fromColorName = from2.split("-").slice(0, 1)[0];
      let toColorVariant = to.split("-").pop();
      from2.split("-").pop();
      if (toColorName === toColorVariant)
        toColorVariant = void 0;
      let fromVariable = `--s-theme-color-${fromColorName}`, toVariable = `--s-theme-color-${toColorName}`;
      this.getTheme().loopOnColors((colorObj) => {
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
  static toCssVars(theme, variant) {
    const themeInstance = this.getTheme(theme, variant);
    if (!themeInstance)
      throw new Error(`Sorry but the requested theme "<yellow>${theme}-${variant}</yellow>" does not exists...`);
    let vars = [];
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
  static getSafe(dotPath, theme, variant) {
    const instance = this.getTheme(theme, variant);
    return instance.get(dotPath, true);
  }
  static get(dotPath, theme, variant) {
    const instance = this.getTheme(theme, variant);
    return instance.get(dotPath);
  }
  static set(dotPath, value, theme, variant) {
    const instance = this.getTheme(theme, variant);
    return instance.set(dotPath, value);
  }
  get themes() {
    return SSugarConfig.get("theme.themes");
  }
  get _config() {
    if (this._cachedConfig) {
      return this._cachedConfig;
    }
    this._cachedConfig = Object.assign({}, __deepMerge(SSugarConfig.get("theme.themes")[this.id], this._overridedConfig));
    return this._cachedConfig;
  }
  get(dotPath, preventThrow = false) {
    const value = get(this._config, dotPath);
    if (value === void 0 && !preventThrow) {
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
    return __objectHash(config2);
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
  loopOnColors(callback) {
    return __awaiter$4(this, void 0, void 0, function* () {
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
class STheme extends SThemeBase {
  constructor(theme, variant) {
    super(theme, variant);
    this.restore();
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
    const finalSettings = Object.assign({ $context: document.querySelector("html"), theme: void 0, variant: void 0 }, settings !== null && settings !== void 0 ? settings : {});
    STheme.defaultThemeMetas = {
      theme: finalSettings.theme,
      variant: finalSettings.variant
    };
    const themeInstance = this.getCurrentTheme(finalSettings.$context);
    if (!document.env)
      document.env = {};
    if (!document.env.SUGAR)
      document.env.SUGAR = {};
    document.env.SUGAR.theme = themeInstance;
    STheme.applyTheme(themeInstance.theme, themeInstance.variant, finalSettings.$context);
    return themeInstance;
  }
  static getThemeMetas($context = document.querySelector("html")) {
    var _a3, _b2, _c2, _d2;
    let defaultTheme = (_a3 = STheme.defaultThemeMetas.theme) !== null && _a3 !== void 0 ? _a3 : SSugarConfig.get("theme.theme"), defaultVariant = (_b2 = STheme.defaultThemeMetas.variant) !== null && _b2 !== void 0 ? _b2 : SSugarConfig.get("theme.variant");
    let theme = defaultTheme, variant = defaultVariant;
    const savedTheme = localStorage.getItem("s-theme");
    if (savedTheme && savedTheme.split("-").length === 2) {
      const parts = savedTheme.split("-");
      theme = parts[0];
      variant = parts[1];
    } else if ($context.hasAttribute("theme")) {
      let attr = (_c2 = $context.getAttribute("theme")) !== null && _c2 !== void 0 ? _c2 : "", parts = attr.split("-").map((l) => l.trim());
      theme = parts[0], variant = parts[1];
    }
    const name2 = `${theme !== null && theme !== void 0 ? theme : defaultTheme}-${variant !== null && variant !== void 0 ? variant : defaultVariant}`;
    const metas = (_d2 = SSugarConfig.get(`theme.themes.${name2}.metas`)) !== null && _d2 !== void 0 ? _d2 : {};
    return __deepMerge({
      name: name2,
      theme: theme !== null && theme !== void 0 ? theme : defaultTheme,
      variant: variant !== null && variant !== void 0 ? variant : defaultVariant
    }, metas);
  }
  static getCurrentTheme($context = document.querySelector("html")) {
    const themeMetas = STheme.getThemeMetas($context);
    return this.getTheme(themeMetas.theme, themeMetas.variant);
  }
  static applyCurrentColor(color, $context = document.querySelector("html")) {
    const vars = this.remapCssColor("current", color);
    for (let [key, value] of Object.entries(vars.properties)) {
      $context.style.setProperty(key, value);
    }
  }
  setColor(color, value) {
    this.set(`color.${color}.color`, value);
  }
  set(dotPath, value) {
    super.set(dotPath, value);
    this.applyOverridedConfigs();
    this.save();
    return this;
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
    const color = new SColor(style.backgroundColor);
    $wrapper.remove();
    return color;
  }
  applyOverridedConfigs($context = document.querySelector("html")) {
    const properties2 = SThemeBase.jsConfigObjectToCssProperties(this.getOverridedConfig());
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
    return this;
  }
  save() {
    clearTimeout(this._saveTimeout);
    this._saveTimeout = setTimeout(() => {
      localStorage.setItem(`s-theme`, JSON.stringify(this.getOverridedConfig()));
      this.emitSavedEvent();
    }, 500);
    return this;
  }
  restore() {
    let savedConfigs = {};
    try {
      savedConfigs = JSON.parse(
        localStorage.getItem(`s-theme`)
      );
    } catch (e) {
    }
    super.restore(savedConfigs);
    this.applyOverridedConfigs();
    return this;
  }
  clear() {
    localStorage.removeItem(`s-theme`);
    super.clear();
    this.applyOverridedConfigs();
    this.constructor.setTheme();
    return this;
  }
}
STheme.defaultThemeMetas = {};
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
    var error, i2, length = max2(arguments.length, 2), assign2;
    dest = Object(value(dest));
    assign2 = function(key) {
      try {
        dest[key] = src2[key];
      } catch (e) {
        if (!error)
          error = e;
      }
    };
    for (i2 = 1; i2 < length; ++i2) {
      src2 = arguments[i2];
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
var possibleTypes = { "object": true, "function": true, "undefined": true };
var is$3 = function(value) {
  if (!isValue$1(value))
    return false;
  return hasOwnProperty.call(possibleTypes, typeof value);
};
var isObject = is$3;
var is$2 = function(value) {
  if (!isObject(value))
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
    var data, listeners, candidate, i2;
    callable(listener);
    if (!hasOwnProperty2.call(this, "__ee__"))
      return this;
    data = this.__ee__;
    if (!data[type])
      return this;
    listeners = data[type];
    if (typeof listeners === "object") {
      for (i2 = 0; candidate = listeners[i2]; ++i2) {
        if (candidate === listener || candidate.__eeOnceListener__ === listener) {
          if (listeners.length === 2)
            data[type] = listeners[i2 ? 0 : 1];
          else
            listeners.splice(i2, 1);
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
    var i2, l, listener, listeners, args;
    if (!hasOwnProperty2.call(this, "__ee__"))
      return;
    listeners = this.__ee__[type];
    if (!listeners)
      return;
    if (typeof listeners === "object") {
      l = arguments.length;
      args = new Array(l - 1);
      for (i2 = 1; i2 < l; ++i2)
        args[i2 - 1] = arguments[i2];
      listeners = listeners.slice();
      for (i2 = 0; listener = listeners[i2]; ++i2) {
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
          for (i2 = 1; i2 < l; ++i2) {
            args[i2 - 1] = arguments[i2];
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
var isString;
var hasRequiredIsString;
function requireIsString() {
  if (hasRequiredIsString)
    return isString;
  hasRequiredIsString = 1;
  var objToString = Object.prototype.toString, id = objToString.call("");
  isString = function(value) {
    return typeof value === "string" || value && typeof value === "object" && (value instanceof String || objToString.call(value) === id) || false;
  };
  return isString;
}
var shim;
var hasRequiredShim;
function requireShim() {
  if (hasRequiredShim)
    return shim;
  hasRequiredShim = 1;
  var iteratorSymbol = requireEs6Symbol().iterator, isArguments5 = requireIsArguments(), isFunction2 = requireIsFunction(), toPosInt = toPosInteger, callable = validCallable, validValue$1 = validValue, isValue2 = isValue$5, isString3 = requireIsString(), isArray2 = Array.isArray, call = Function.prototype.call, desc = { configurable: true, enumerable: true, writable: true, value: null }, defineProperty3 = Object.defineProperty;
  shim = function(arrayLike) {
    var mapFn = arguments[1], thisArg = arguments[2], Context, i2, j, arr, length, code, iterator, result2, getIterator, value;
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
          for (i2 = 0; i2 < length; ++i2)
            arr[i2] = arrayLike[i2];
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
        i2 = 0;
        while (!result2.done) {
          value = mapFn ? call.call(mapFn, thisArg, result2.value, i2) : result2.value;
          if (Context) {
            desc.value = value;
            defineProperty3(arr, i2, desc);
          } else {
            arr[i2] = value;
          }
          result2 = iterator.next();
          ++i2;
        }
        length = i2;
      } else if (isString3(arrayLike)) {
        length = arrayLike.length;
        if (Context)
          arr = new Context();
        for (i2 = 0, j = 0; i2 < length; ++i2) {
          value = arrayLike[i2];
          if (i2 + 1 < length) {
            code = value.charCodeAt(0);
            if (code >= 55296 && code <= 56319)
              value += arrayLike[++i2];
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
      for (i2 = 0; i2 < length; ++i2) {
        value = mapFn ? call.call(mapFn, thisArg, arrayLike[i2], i2) : arrayLike[i2];
        if (Context) {
          desc.value = value;
          defineProperty3(arr, i2, desc);
        } else {
          arr[i2] = value;
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
      mounted: {
        description: "Specify if your component is mounted or not",
        type: "Boolean",
        default: false,
        physical: true
      },
      mountWhen: {
        description: "Specify when your component will be mounted",
        type: "String",
        values: triggers,
        default: "direct"
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
      }
    };
  }
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
class SComponentUtils extends SClass {
  constructor(node2, settings) {
    super(__deepMerge(SComponentUtilsSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
    this.fastdom = __fastdom;
    this.state = "pending";
    this.DefaultPropsInterface = SComponentUtilsDefaultPropsInterface;
    this._isInViewport = false;
    this._mediaQueries = {};
    this.node = node2;
    this.inViewportStatusChange.on("enter", () => {
      this._isInViewport = true;
    }).on("leave", () => {
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
    for (let [prop, definition] of Object.entries(PropsInterface.definition)) {
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
  handleProps(props, settings) {
    const finalSettings = Object.assign({ reflectAttributes: true, responsive: false }, settings !== null && settings !== void 0 ? settings : {});
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
      throw new Error(`To save the state, the HTMLElement must have an id...`);
    }
    let _state;
    if (state.isSState) {
      _state = state;
    } else {
      _state = new SState(state, {
        id: finalStateSettings.id,
        save: finalStateSettings.save
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
  get inViewportStatusChange() {
    if (this._inViewportStatusChangePromise)
      return this._inViewportStatusChangePromise;
    this._inViewportStatusChangePromise = __inViewportStatusChange(this.node);
    return this._inViewportStatusChangePromise;
  }
  waitAndExecute(when, callback) {
    return new Promise((resolve, reject) => __awaiter$3(this, void 0, void 0, function* () {
      if (!when || when === "direct" || when === "directly") {
        yield __wait();
      } else {
        yield __when(this.node, when);
      }
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
  className(cls = "", style = "") {
    let clsString = cls.split(" ").map((clsName) => {
      const clses = [];
      clses.push(`${this.node.tagName.toLowerCase()}${clsName && !clsName.match(/^__/) ? "-" : ""}${clsName}`);
      if (this.settings.name && this.node.tagName.toLowerCase() !== this.settings.name) {
        clses.push(`${this.settings.name.toLowerCase()}${clsName && !clsName.match(/^__/) ? "-" : ""}${clsName}`);
      }
      return clses.join(" ");
    }).join(" ");
    if (style) {
      clsString += ` ${style}`;
    }
    return clsString;
  }
  uniqueClassName(cls = "", style = "") {
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
}
SComponentUtils.fastdom = __fastdom;
SComponentUtils._defaultProps = {};
SComponentUtils._injectedStyles = [];
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
class SFeature extends SClass {
  constructor(name2, node2, settings) {
    var _a3, _b2, _c2, _d2;
    super(__deepMerge({}, settings));
    this.componentUtils = new SComponentUtils(node2, Object.assign(Object.assign(Object.assign({}, (_a3 = this.settings) !== null && _a3 !== void 0 ? _a3 : {}), (_b2 = this.settings.componentUtils) !== null && _b2 !== void 0 ? _b2 : {}), { name: name2 }));
    this.name = name2;
    this.node = node2;
    this.node.classList.add(...this.componentUtils.className("").split(" "));
    this.props = this.componentUtils.handleProps({}, {
      interface: (_c2 = this.settings.interface) !== null && _c2 !== void 0 ? _c2 : (_d2 = this.settings.componentUtils) === null || _d2 === void 0 ? void 0 : _d2.interface
    });
    this.componentUtils.waitAndExecute(
      this.props.mountWhen,
      () => __awaiter$2(this, void 0, void 0, function* () {
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
    });
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
function define$2(props = {}, name2 = "s-activate") {
  SActivateFeature.define(name2, SActivateFeature, props);
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
class SActivateFeature extends SFeature {
  constructor(name2, node2, settings) {
    super(name2, node2, __deepMerge({
      interface: SActivateFeatureInterface
    }, settings !== null && settings !== void 0 ? settings : {}));
    this._$groupElements = [];
    this.state = {
      active: void 0
    };
    this.groupState = {
      activeId: void 0
    };
    this.state = this.componentUtils.handleState(this.state, {
      save: this.props.saveState
    });
    if (this.props.group) {
      this.componentUtils.handleState(this.groupState, {
        save: this.props.saveState,
        id: `s-activate-feature-group-${this.props.group}`
      });
    }
    if (this.props.triggerer) {
      this._$triggerers = Array.from(document.querySelectorAll(this.props.triggerer));
    } else {
      this._$triggerers = [this.node];
    }
    this.componentUtils.exposeApi({
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
    if (targets === null || targets === void 0 ? void 0 : targets.length)
      this._$targets = targets;
    else
      this._$targets = [this.node];
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
      triggers2.forEach((trigger) => {
        if (trigger.match(/^event:/)) {
          this.node.addEventListener("actual", (e) => {
            this.activate({
              preventSave: true
            });
          });
        } else {
          switch (trigger) {
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
    return __awaiter$1(this, void 0, void 0, function* () {
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
        if (finalParams.preventSave) {
          this.state.preventSave();
        }
        this.state.active = true;
        this.props.active = true;
        this.node.classList.add(this.props.activeClass);
        if (this._$targets) {
          this._$targets.forEach(($target) => {
            if (this.props.activeClass) {
              $target.classList.add(this.props.activeClass);
            }
            if (this.props.activeAttribute) {
              this.componentUtils.fastdom.mutate(() => {
                $target.setAttribute(this.props.activeAttribute, "true");
              });
            }
            if ($target.children.length === 1 && $target.children[0].tagName === "TEMPLATE") {
              const $template = $target.children[0];
              const $container = document.createElement("div");
              const html2 = [];
              Array.from($template.content.childNodes).forEach(($child) => {
                var _a3;
                if ($child.tagName === "SCRIPT") {
                  document.head.appendChild($child);
                } else {
                  html2.push((_a3 = $child.outerHTML) !== null && _a3 !== void 0 ? _a3 : $child.textContent);
                }
              });
              $container.innerHTML = html2.join("\n");
              $target.appendChild($container);
              $template.remove();
            }
          });
        }
      }, this.props.activateTimeout);
    });
  }
  unactivate(params) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const finalParams = Object.assign({ force: false, preventSave: false }, params !== null && params !== void 0 ? params : {});
      if (!finalParams.force && !this.isActive())
        return;
      this._unactivateTimeout = setTimeout(() => {
        this.state.active = false;
        this.props.active = false;
        this.node.classList.remove(this.props.activeClass);
        if (this._$targets) {
          this._$targets.forEach(($target) => {
            if (this.props.activeClass) {
              $target.classList.remove(this.props.activeClass);
            }
            if (this.props.activeAttribute) {
              $target.removeAttribute(this.props.activeAttribute);
            }
          });
        }
      }, this.props.unactivateTimeout);
    });
  }
}
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
  const cssText = strings.length === 1 ? strings[0] : values.reduce((acc, v2, idx) => acc + textFromCSSResult(v2) + strings[idx + 1], strings[0]);
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
    this.elementProperties.forEach((v2, p) => {
      const attr = this.__attributeNameForProperty(p, v2);
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
    (_a3 = this.constructor._initializers) === null || _a3 === void 0 ? void 0 : _a3.forEach((i2) => i2(this));
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
      this.__instanceProperties.forEach((v2, p) => this[p] = v2);
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
      this.__reflectingProperties.forEach((v2, k) => this.__propertyToAttribute(k, this[k], v2));
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
    const i2 = this.enabledWarnings.indexOf(warning);
    if (i2 >= 0) {
      this.enabledWarnings.splice(i2, 1);
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
  issueWarning$1 = (code, warning) => {
    warning += code ? ` See https://lit.dev/msg/${code} for more information.` : "";
    if (!globalThis.litIssuedWarnings.has(warning)) {
      console.warn(warning);
      globalThis.litIssuedWarnings.add(warning);
    }
  };
  issueWarning$1("dev-mode", `Lit is in dev mode. Not recommended for production!`);
}
const wrap = ((_b$1 = window.ShadyDOM) === null || _b$1 === void 0 ? void 0 : _b$1.inUse) && ((_c$1 = window.ShadyDOM) === null || _c$1 === void 0 ? void 0 : _c$1.noPatch) === true ? window.ShadyDOM.wrap : (node2) => node2;
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
const createSanitizer = (node2, name2, type) => {
  return sanitizerFactoryInternal(node2, name2, type);
};
const boundAttributeSuffix = "$lit$";
const marker = `lit$${String(Math.random()).slice(9)}$`;
const markerMatch = "?" + marker;
const nodeMarker = `<${markerMatch}>`;
const d = document;
const createMarker = (v2 = "") => d.createComment(v2);
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
  for (let i2 = 0; i2 < l; i2++) {
    const s = strings[i2];
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
    const end = regex2 === tagEndRegex && strings[i2 + 1].startsWith("/>") ? " " : "";
    html2 += regex2 === textEndRegex ? s + nodeMarker : attrNameEndIndex >= 0 ? (attrNames.push(attrName), s.slice(0, attrNameEndIndex) + boundAttributeSuffix + s.slice(attrNameEndIndex)) + marker + end : s + marker + (attrNameEndIndex === -2 ? (attrNames.push(void 0), i2) : end);
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
    let node2;
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
    while ((node2 = walker.nextNode()) !== null && parts.length < partCount) {
      if (node2.nodeType === 1) {
        {
          const tag2 = node2.localName;
          if (/^(?:textarea|template)$/i.test(tag2) && node2.innerHTML.includes(marker)) {
            const m = `Expressions are not supported inside \`${tag2}\` elements. See https://lit.dev/msg/expression-in-${tag2} for more information.`;
            if (tag2 === "template") {
              throw new Error(m);
            } else
              issueWarning$1("", m);
          }
        }
        if (node2.hasAttributes()) {
          const attrsToRemove = [];
          for (const name2 of node2.getAttributeNames()) {
            if (name2.endsWith(boundAttributeSuffix) || name2.startsWith(marker)) {
              const realName = attrNames[attrNameIndex++];
              attrsToRemove.push(name2);
              if (realName !== void 0) {
                const value = node2.getAttribute(realName.toLowerCase() + boundAttributeSuffix);
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
            node2.removeAttribute(name2);
          }
        }
        if (rawTextElement.test(node2.tagName)) {
          const strings2 = node2.textContent.split(marker);
          const lastIndex = strings2.length - 1;
          if (lastIndex > 0) {
            node2.textContent = trustedTypes ? trustedTypes.emptyScript : "";
            for (let i2 = 0; i2 < lastIndex; i2++) {
              node2.append(strings2[i2], createMarker());
              walker.nextNode();
              parts.push({ type: CHILD_PART, index: ++nodeIndex });
            }
            node2.append(strings2[lastIndex], createMarker());
          }
        }
      } else if (node2.nodeType === 8) {
        const data = node2.data;
        if (data === markerMatch) {
          parts.push({ type: CHILD_PART, index: nodeIndex });
        } else {
          let i2 = -1;
          while ((i2 = node2.data.indexOf(marker, i2 + 1)) !== -1) {
            parts.push({ type: COMMENT_PART, index: nodeIndex });
            i2 += marker.length - 1;
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
    let node2 = walker.nextNode();
    let nodeIndex = 0;
    let partIndex = 0;
    let templatePart = parts[0];
    while (templatePart !== void 0) {
      if (nodeIndex === templatePart.index) {
        let part;
        if (templatePart.type === CHILD_PART) {
          part = new ChildPart(node2, node2.nextSibling, this, options);
        } else if (templatePart.type === ATTRIBUTE_PART) {
          part = new templatePart.ctor(node2, templatePart.name, templatePart.strings, this, options);
        } else if (templatePart.type === ELEMENT_PART) {
          part = new ElementPart(node2, this, options);
        }
        this._parts.push(part);
        templatePart = parts[++partIndex];
      }
      if (nodeIndex !== (templatePart === null || templatePart === void 0 ? void 0 : templatePart.index)) {
        node2 = walker.nextNode();
        nodeIndex++;
      }
    }
    return fragment;
  }
  _update(values) {
    let i2 = 0;
    for (const part of this._parts) {
      if (part !== void 0) {
        debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
          kind: "set part",
          part,
          value: values[i2],
          valueIndex: i2,
          values,
          templateInstance: this
        });
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
  _insert(node2, ref = this._$endNode) {
    return wrap(wrap(this._$startNode).parentNode).insertBefore(node2, ref);
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
      const node2 = wrap(this._$startNode).nextSibling;
      {
        if (this._textSanitizer === void 0) {
          this._textSanitizer = createSanitizer(node2, "data", "property");
        }
        value = this._textSanitizer(value);
      }
      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
        kind: "commit text",
        node: node2,
        value,
        options: this.options
      });
      node2.data = value;
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
      let i2, v2;
      for (i2 = 0; i2 < strings.length - 1; i2++) {
        v2 = resolveDirective(this, values[valueIndex + i2], directiveParent, i2);
        if (v2 === noChange) {
          v2 = this._$committedValue[i2];
        }
        change || (change = !isPrimitive(v2) || v2 !== this._$committedValue[i2]);
        if (v2 === nothing) {
          value = nothing;
        } else if (value !== nothing) {
          value += (v2 !== null && v2 !== void 0 ? v2 : "") + strings[i2 + 1];
        }
        this._$committedValue[i2] = v2;
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
      this.state.status = "pending";
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
    this.firstUpdated = () => __awaiter(this, void 0, void 0, function* () {
      if (nodeFirstUpdated) {
        yield nodeFirstUpdated();
      }
      this.props.mounted = true;
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
    this.componentUtils = new SComponentUtils(this, Object.assign(Object.assign(Object.assign({}, (_d2 = this.settings) !== null && _d2 !== void 0 ? _d2 : {}), (_e = this.settings.componentUtils) !== null && _e !== void 0 ? _e : {}), { style: (_k = (_h = (_g = (_f = this.constructor.styles) === null || _f === void 0 ? void 0 : _f.cssText) !== null && _g !== void 0 ? _g : this.settings.style) !== null && _h !== void 0 ? _h : (_j = this.settings.componentUtils) === null || _j === void 0 ? void 0 : _j.style) !== null && _k !== void 0 ? _k : "" }));
    (() => __awaiter(this, void 0, void 0, function* () {
      var _l, _m;
      const defaultProps = SComponentUtils.getDefaultProps(this.tagName.toLowerCase());
      const mountWhen = (_m = (_l = this.getAttribute("mount-when")) !== null && _l !== void 0 ? _l : defaultProps.mountWhen) !== null && _m !== void 0 ? _m : "direct";
      yield __wait();
      yield __wait();
      if (!mountWhen.match(/^direct(ly)?$/)) {
        yield this.componentUtils.waitAndExecute(mountWhen, () => {
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
      const definition = SLitComponentPropsInterface.definition[prop];
      propertiesObj[prop] = Object.assign({}, (_a4 = definition.lit) !== null && _a4 !== void 0 ? _a4 : {});
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
      if (definition.physical || ((_f = (_e = (_d2 = definition.type) === null || _d2 === void 0 ? void 0 : _d2.type) === null || _e === void 0 ? void 0 : _e.toLowerCase) === null || _f === void 0 ? void 0 : _f.call(_e)) === "boolean" || ((_h = (_g = definition.type) === null || _g === void 0 ? void 0 : _g.toLowerCase) === null || _h === void 0 ? void 0 : _h.call(_g)) === "boolean" || ((_l = (_k = (_j = definition.type) === null || _j === void 0 ? void 0 : _j.type) === null || _k === void 0 ? void 0 : _k.toLowerCase) === null || _l === void 0 ? void 0 : _l.call(_k)) === "object" || ((_o = (_m = definition.type) === null || _m === void 0 ? void 0 : _m.toLowerCase) === null || _o === void 0 ? void 0 : _o.call(_m)) === "object") {
        propertiesObj[prop].reflect = true;
        propertiesObj[prop].attribute = __dashCase(prop);
        propertiesObj[prop].converter = {
          fromAttribute: (value, type2) => {
            var _a5, _b3, _c3, _d3;
            const typeStr2 = (_c3 = (_b3 = (_a5 = definition.type) === null || _a5 === void 0 ? void 0 : _a5.type) === null || _b3 === void 0 ? void 0 : _b3.toLowerCase()) !== null && _c3 !== void 0 ? _c3 : (_d3 = definition.type) === null || _d3 === void 0 ? void 0 : _d3.toLowerCase();
            if (typeStr2 === "object" && typeof value === "string") {
              try {
                const json = JSON.parse(value);
                console.log("V", json, value);
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
            try {
              const jsonStr = JSON.stringify(value);
              return jsonStr;
            } catch (e) {
            }
            if (value === "false" || value === false || value === null) {
              return null;
            }
            return String(value);
          }
        };
      }
    });
    const props = Object.assign(Object.assign({}, propertiesObj), properties2 !== null && properties2 !== void 0 ? properties2 : {});
    return props;
  }
  _mount() {
    var _a3, _b2, _c2, _d2;
    return __awaiter(this, void 0, void 0, function* () {
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
            if ((value === null || value === void 0 ? void 0 : value.value) && typeof value.value === "string") {
              try {
                _this[prop] = JSON.parse(value.value);
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
      if (this.state) {
        this.state = this.componentUtils.handleState(this.state, {
          save: this.props.saveState
        });
        this.state.$set("*", () => {
          this.requestUpdate();
        });
      }
      if (this.props.verbose) {
        console.log(`[${this.tagName.toLowerCase()}]${this.id ? ` #${this.id} ` : " "}mounting`);
      }
      if (this.mount && typeof this.mount === "function") {
        yield this.mount();
      }
      this._shouldUpdate = true;
      this.requestUpdate();
      yield this.updateComplete;
      this.componentUtils.injectStyle((_c2 = (_b2 = this.constructor.styles) === null || _b2 === void 0 ? void 0 : _b2.cssText) !== null && _c2 !== void 0 ? _c2 : "", this.tagName);
      yield __wait();
      if (this.props.adoptStyle && this.shadowRoot) {
        yield this.componentUtils.adoptStyleInShadowRoot(this.shadowRoot);
      }
      (_d2 = this.state) === null || _d2 === void 0 ? void 0 : _d2.status = "mounted";
      return true;
    });
  }
}
SLitComponent._keepInjectedCssBeforeStylesheetLinksInited = false;
class SSpecsEditorComponentInterface extends SInterface {
  static get _definition() {
    return {
      specs: {
        type: "Object",
        title: "Specs",
        description: "Specify the SSpecs resulting json to use for the editor",
        required: true
      }
    };
  }
}
const __css = ".s-specs-editor {\n    background: red;\n}\n";
function define$1(props = {}, tagName = "s-specs-editor") {
  SClipboardCopyComponent.define(tagName, SClipboardCopyComponent, props);
}
class SClipboardCopyComponent extends SLitComponent {
  constructor() {
    super(__deepMerge({
      name: "s-specs-editor",
      interface: SSpecsEditorComponentInterface
    }));
    this.state = {};
  }
  static get properties() {
    return SLitComponent.propertiesFromInterface({}, SSpecsEditorComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(__css)}
        `;
  }
  mount() {
    console.log(this.props.specs);
  }
  render() {
    var _a3;
    return html`
            <div
                class="${(_a3 = this.componentUtils) === null || _a3 === void 0 ? void 0 : _a3.className("", null, "s-bare")}"
                id="${this.props.id}"
                status="${this.state.status}"
            >
                ${this.props.specs ? html`
                          <div
                              class="${this.componentUtils.className("__root")}"
                          >
                              ${Object.keys(this.props.specs.props).map((prop) => {
      var _a4, _b2, _c2, _d2, _e, _f, _g;
      const propObj = this.props.specs.props[prop];
      return html`
                                          <div
                                              prop="${propObj.id}"
                                              class="${this.componentUtils.className("__prop")}"
                                          >
                                              ${propObj.type.toLowerCase() === "text" ? html`
                                                        <div
                                                            class="${this.componentUtils.className("__prop--text")}"
                                                        >
                                                            <label
                                                                class="${this.componentUtils.className("__label", "s-label s-label--block")}"
                                                            >
                                                                <input
                                                                    onChange=${(e) => this._update(e, propObj)}
                                                                    type="text"
                                                                    name="${propObj.id}"
                                                                    class="${this.componentUtils.className("__input", "s-input")}"
                                                                    placeholder="${(_b2 = (_a4 = propObj.default) !== null && _a4 !== void 0 ? _a4 : propObj.title) !== null && _b2 !== void 0 ? _b2 : propObj.id}"
                                                                    value="${propObj.value}"
                                                                />
                                                                <span>
                                                                    ${propObj.description ? html`
                                                                              <span
                                                                                  class="s-tooltip-container"
                                                                              >
                                                                                  <i
                                                                                      class="fa-solid fa-circle-question"
                                                                                  ></i>
                                                                                  <div
                                                                                      class="s-tooltip s-tooltip--right"
                                                                                  >
                                                                                      ${propObj.description}
                                                                                  </div>
                                                                              </span>
                                                                          ` : ""}
                                                                    ${(_c2 = propObj.title) !== null && _c2 !== void 0 ? _c2 : propObj.id}
                                                                </span>
                                                            </label>
                                                        </div>
                                                    ` : propObj.type.toLowerCase() === "select" ? html`
                                                        <div
                                                            class="${this.componentUtils.className("__prop--select")}"
                                                        >
                                                            <label
                                                                class="${this.componentUtils.className("__label", "s-label s-label--block")}"
                                                            >
                                                                <select
                                                                    onChange=${(e) => this._update(e, v)}
                                                                    name="${propObj.id}"
                                                                    class="${this.componentUtils.className("__select", "s-select")}"
                                                                    placeholder="${(_e = (_d2 = propObj.default) !== null && _d2 !== void 0 ? _d2 : propObj.title) !== null && _e !== void 0 ? _e : propObj.id}"
                                                                    prop="${JSON.stringify(propObj)}"
                                                                >
                                                                    ${propObj.options.map((option) => html`
                                                                            <option
                                                                                value="${option.value}"
                                                                            >
                                                                                ${option.name}
                                                                            </option>
                                                                        `)}
                                                                </select>
                                                                <span>
                                                                    ${propObj.description ? html`
                                                                              <span
                                                                                  class="s-tooltip-container"
                                                                              >
                                                                                  <i
                                                                                      class="fa-solid fa-circle-question"
                                                                                  ></i>
                                                                                  <div
                                                                                      class="s-tooltip s-tooltip--right"
                                                                                  >
                                                                                      ${propObj.description}
                                                                                  </div>
                                                                              </span>
                                                                          ` : ""}
                                                                    ${(_f = propObj.title) !== null && _f !== void 0 ? _f : propObj.id}
                                                                </span>
                                                            </label>
                                                        </div>
                                                    ` : propObj.type.toLowerCase() === "checkbox" ? html`
                                                        <div
                                                            class="${this.componentUtils.className("__prop--checkbox")}"
                                                        >
                                                            <label
                                                                class="${this.componentUtils.className("__label", "s-label")}"
                                                            >
                                                                <input
                                                                    onChange=${(e) => this._update(e, v)}
                                                                    type="checkbox"
                                                                    name="${propObj.id}"
                                                                    class="${this.componentUtils.className("__checkbox", "s-switch")}"
                                                                    checked?=${propObj.value}
                                                                />
                                                                <span>
                                                                    ${propObj.description ? html`
                                                                              <span
                                                                                  class="s-tooltip-container"
                                                                              >
                                                                                  <i
                                                                                      class="fa-solid fa-circle-question"
                                                                                  ></i>
                                                                                  <div
                                                                                      class="s-tooltip s-tooltip--right"
                                                                                  >
                                                                                      ${propObj.description}
                                                                                  </div>
                                                                              </span>
                                                                          ` : ""}
                                                                    ${(_g = propObj.title) !== null && _g !== void 0 ? _g : propObj.id}
                                                                </span>
                                                            </label>
                                                        </div>
                                                    ` : ""}
                                          </div>
                                      `;
    })}
                          </div>
                      ` : ""}
            </div>
        `;
  }
}
class SCarpenterComponentInterface extends SInterface {
  static get _definition() {
    return {};
  }
}
function define(props = {}, tagName = "s-carpenter") {
  SCarpenterComponent.define(tagName, SCarpenterComponent, props);
}
define$1();
class SCarpenterComponent extends SLitComponent {
  constructor() {
    super(
      __deepMerge({
        name: "s-specs-editor",
        interface: SCarpenterComponentInterface,
        carpenter: SSugarConfig.get("carpenter")
      })
    );
    __publicField(this, "state", {
      state: "pending",
      specs: null,
      specsBySources: {}
    });
  }
  static get properties() {
    return SLitComponent.propertiesFromInterface(
      {},
      SCarpenterComponentInterface
    );
  }
  async mount() {
    this.state.$set("*", (v2) => {
      console.log("secs", v2, JSON.stringify(this.state.specs));
    });
    this.state.specs = await this._fetchSpecs(
      document.location.pathname.slice(1)
    );
    console.log("s", this.state);
  }
  async _fetchSpecs(dotpath) {
    const specsJson = await fetch(
      `http://${document.location.hostname}:${document.location.port}/json/${dotpath}`
    ).then((response) => response.json());
    return specsJson;
  }
  render() {
    return html`
            <div
                class="${this.componentUtils.className("__root")}"
                state="${this.state.state}"
            >
                ${this.state.specs ? html`
                          <s-specs-editor
                              specs=${JSON.stringify(this.state.specs.specs)}
                          ></s-specs-editor>
                      ` : ""}
            </div>
        `;
  }
}
function ___isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function ___deepMerge(target, ...sources) {
  if (!sources.length)
    return target;
  var source2 = sources.shift();
  if (___isObject(target) && ___isObject(source2)) {
    for (const key in source2) {
      if (___isObject(source2[key])) {
        if (!target[key])
          Object.assign(target, { [key]: {} });
        ___deepMerge(target[key], source2[key]);
      } else {
        Object.assign(target, { [key]: source2[key] });
      }
    }
  }
  return ___deepMerge(target, ...sources);
}
document.env = ___deepMerge(JSON.parse(`{"PLATFORM":"browser","ENV":"development","ENVIRONMENT":"development","SUGAR":{"config":{"assets":{"dev":{"type":"module","defer":true,"src":"/src/js/index.ts","env":"development"},"module":{"type":"module","defer":true,"src":"/dist/js/index.esm.js","env":"production"},"nomodule":{"nomodule":true,"defer":true,"src":"/dist/js/index.amd.js","env":"production"},"style":{"id":"global","defer":true,"src":"/dist/css/index.css"}},"datetime":{"dateFormat":"YYYY-MM-DD","timeFormat":"h:mm:ss","i18n":{"previousMonth":"Previous Month","nextMonth":"Next Month","months":["January","February","March","April","May","June","July","August","September","October","November","December"],"weekdays":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"weekdaysShort":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}},"discord":{"server":{"id":"940362961682333767","url":"https://discord.gg/HzycksDJ"}},"google":{},"metas":{"lang":"en","og":{"type":"website","image":"https://cdnv2.coffeekraken.io/coffeekraken-og.png"}},"project":{"environments":{}},"serve":{"img":{"imgPath":"/dist/img"},"js":{"path":"/dist/js"},"css":{"path":"/dist/css"},"icons":{"path":"/dist/icons"},"fonts":{"path":"/dist/fonts"},"cache":{"path":"/cache"}},"storage":{"system":{"tmpDir":"/private/var/folders/33/7q1vr_6d6ld40_t2hjfqx6340000gn/T"},"package":{"rootDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter","localDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/.local","cacheDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/.local/cache","tmpDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/.local/tmp","nodeModulesDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/node_modules"},"sugar":{"rootDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/config/s-sugar-config"},"src":{"rootDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/src","jsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/src/js","nodeDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/src/node","cssDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/src/css","configDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/src/config","docDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/src/doc","fontsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/src/fonts","iconsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/src/icons","imgDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/src/img","pagesDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/src/pages","publicDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/src/public","viewsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/src/views"},"dist":{"rootDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/dist","jsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/dist/js","nodeDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/dist/node","cssDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/dist/css","docDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/dist/doc","fontsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/dist/fonts","iconsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/dist/icons","imgDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/dist/img","pagesDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/dist/pages","viewsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/dist/views"},"exclude":["**/bin/**","**/.DS_Store","**/__WIP__/**","**/__wip__/**","**/__TESTS/**","**/__tests__/**","**/__tests__.wip/**","**/.*/**","**/node_modules/**"]},"dashboard":{"layout":[["s-dashboard-pages"],["s-dashboard-browserstack","s-dashboard-google","s-dashboard-web-vitals","s-dashboard-responsive"],["s-dashboard-project","s-dashboard-frontend-checker"]]},"env":{"envFromLocation":{"development":"https?://(localhost|127.0.0.1|0.0.0.0|192.168.[0-9]{1,3}.[0-9]{1,3}|.*.local)","staging":"https?://([a-zA-Z0-9.-]+)?staging([a-zA-Z0-9.-]+)?","production":"https://.*"},"git":{"template":{"name":"Template","commit":{}}}},"frontendServer":{"port":8080,"hostname":"127.0.0.1","rootDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter","staticDirs":{"/dist/css/partials":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/dist/css/partials","/dist":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/src"},"viewsDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/src/views","pagesDir":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/app/s-carpenter/src/pages","logLevel":"info","corsProxy":{"port":9999,"url":"http://127.0.0.1:9999","targetUrlHeaderName":"TargetUrl","limit":"12mb"},"proxy":{},"middlewares":{"bench":{"description":"Track how many times take a request","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/middleware/benchMiddleware","settings":{}},"request":{"description":"Inject the \\"request\\" object for views","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/middleware/requestMiddleware","settings":{}},"env":{"description":"Inject an \\"env\\" object for the views","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/middleware/envMiddleware","settings":{}},"packageJson":{"description":"Inject a \\"packageJson\\" object for the views","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/middleware/packageJsonMiddleware","settings":{}}},"data":{},"modules":{"404":{"description":"This module handle the 404 by rendering either your 404 page configured in the pages or the default 404 page","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/404/404","settings":{}},"publicDir":{"description":"This module allows you to serve files from the public directory","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/publicDir/publicDir","settings":{}},"generic":{"description":"This module gives you access to the \\"generic\\" handler that renders dynamically views from your page config","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/generic/generic","settings":{}},"docmap":{"description":"This module gives you access to a \\"docmap\\" object in the views","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/docmap/docmap","settings":{}},"redirect":{"description":"This module allows you to make redirections depending on requested path","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/redirect/redirect","settings":{}},"config":{"description":"This module gives you access to a \\"config\\" and a \\"configFiles\\" object into the views","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/config/config","settings":{}},"frontspec":{"description":"This module gives you access to a \\"frontspec\\" object into the views","path":"/Users/olivierbossel/data/web/coffeekraken/coffeekraken/packages/servers/s-frontend-server/dist/pkg/esm/config/../node/modules/frontspec/frontspec","settings":{}}},"pages":{},"handlers":{}},"kitchenActions":{"copy":{"title":"Copy file/directory","description":"Copy a file or a directory from the source to the destination passed in params","command":"sugar fs.copy [arguments]","params":{},"settings":{}},"rename":{"title":"Rename project","description":"Rename a project (folder, package.json, etc...)","command":"sugar package.rename [arguments]","params":{},"settings":{}},"initNpm":{"title":"Init npm package","description":"Init npm package in the project","command":"npm init es6 -y","params":{},"settings":{}},"addSugarJson":{"title":"Adding sugar.json file","description":"Adding the sugar.json file to the project","command":"sugar kitchen.add sugarJson [arguments]","params":{},"settings":{}},"addSugar":{"title":"Adding sugar","description":"Adding the sugar toolkit and the s-sugar feature in your project","command":"sugar kitchen.add sugar [arguments]","params":{},"settings":{}},"addNvmrc":{"title":"Adding .nvmrc file","description":"Adding the .nvmrc file to the project","command":"sugar kitchen.add nvmrc [arguments]","params":{},"settings":{}},"addFrontspecJson":{"title":"Adding frontspec.json file","description":"Adding the frontspec.json file to the project","command":"sugar kitchen.add frontspec [arguments]","params":{},"settings":{}},"addManifestJson":{"title":"Adding manifest.json file","description":"Adding the manifest.json file to the project","command":"sugar kitchen.add manifest [arguments]","params":{},"settings":{}},"addFavicon":{"title":"Adding source favicon file","description":"Adding the favicon source file to the project","command":"sugar kitchen.add favicon [arguments]","params":{},"settings":{}},"addReadme":{"title":"Adding source README.md file","description":"Adding the README.md source file to the project","command":"sugar kitchen.add readme [arguments]","params":{},"settings":{}},"addDefaultPages":{"title":"Adding default pages/views file","description":"Adding some default pages/views to the project","command":"sugar kitchen.add defaultPages [arguments]","params":{},"settings":{}},"addDefaultScripts":{"title":"Adding default script files","description":"Adding some default scripts to the project","command":"sugar kitchen.add defaultScripts [arguments]","params":{},"settings":{}},"addDefaultPackageJson":{"title":"Adding default package.json file","description":"Adding default package.json to the project","command":"sugar kitchen.add defaultPackageJson [arguments]","params":{},"settings":{}},"addSugarPostcss":{"title":"Adding sugar postcss plugin","description":"Adding the sugar postcss plugin to the project","command":"sugar kitchen.add postcss [arguments]","params":{},"settings":{}},"installDependencies":{"title":"Install dependencies","description":"Install dependencies like node_modules and composer if exists","command":"sugar package.install [arguments]","interface":"@coffeekraken/s-package/node/interface/SPackageInstallParamsInterface","params":{},"settings":{"silent":true}},"frontendServer":{"title":"Frontend server","description":"Frontend server using the @coffeekraken/s-frontend-server package","command":"sugar frontendServer.start [arguments]","interface":"@coffeekraken/s-frontend-server/node/interface/SFrontendServerStartParamsInterface","params":{},"settings":{"processManager":{"restart":true}}},"corsProxy":{"title":"Cors Proxy","description":"Frontend cors proxy server using the @coffeekraken/s-frontend-server package","command":"sugar frontendServer.corsProxy [arguments]","interface":"@coffeekraken/s-frontend-server/node/interface/SFrontendServerCorsProxyParamsInterface","params":{},"settings":{"processManager":{"restart":true}}},"postcssBuild":{"title":"PostCSS build action","description":"Build css using the amazing PostCSS package","command":"sugar postcss.build [arguments]","interface":"@coffeekraken/s-postcss-builder/node/interface/SPostcssBuilderBuildParamsInterface","params":{},"settings":{"processManager":{}}},"typescriptBuild":{"title":"Typescript builder build action","description":"Build typescript using the s-typescript-builder package","command":"sugar typescript.build [arguments]","interface":"@coffeekraken/s-typescript-builder/node/interface/STypescriptBuilderBuildParamsInterface","params":{"watch":true},"settings":{"processManager":{}}},"imagesBuild":{"title":"Images build action","description":"Build your images with ease. Compress, resize, webp version, etc...","command":"sugar images.build [arguments]","interface":"@coffeekraken/s-images-builder/node/interface/SImagesBuilderBuildParamsInterface","params":{},"settings":{"processManager":{}}},"vite":{"title":"Vite development stack","description":"Allow to build files easily while developing","command":"sugar vite [arguments]","interface":"@coffeekraken/s-vite/node/interface/SViteStartParamsInterface","params":{},"settings":{"processManager":{}}},"viteBuild":{"title":"Vite build stack","description":"Allow to compile javascript (js, ts, riot, react, etc...) files easily","command":"sugar vite.build [arguments]","interface":"@coffeekraken/s-vite/node/interface/SViteBuildParamsInterface","params":{},"settings":{"processManager":{}}},"docmapBuild":{"title":"Docmap build action","description":"Allow to build and maintain up to date the docmap.json file","command":"sugar docmap.build [arguments]","interface":"@coffeekraken/s-docmap/node/interface/SDocmapBuildParamsInterface","params":{},"settings":{"processManager":{}}},"sitemapBuild":{"title":"Sitemap build action","description":"Allow to build and maintain up to date the sitemap.xml file","command":"sugar sitemap.build [arguments]","interface":"@coffeekraken/s-sitemap-builder/node/interface/SSitemapBuilderBuildParamsInterface","params":{},"settings":{"processManager":{}}},"faviconBuild":{"title":"Docmap build action","description":"Allow to build and maintain up to date your favicon files and the manifest.json","command":"sugar favicon.build [arguments]","interface":"@coffeekraken/s-favicon-builder/node/interface/SFaviconBuilderBuildParamsInterface","params":{},"settings":{"processManager":{}}},"markdownBuild":{"title":"Docmap build action","description":"Allow to build your markdown files","command":"sugar markdown.build -p default,readme [arguments]","interface":"@coffeekraken/s-markdown-builder/node/interface/SMarkdownBuilderBuildParamsInterface","params":{},"settings":{"processManager":{}}},"format":{"title":"SCodeFormatter format action","description":"Format your code using the s-code-formatter package","command":"sugar formatter.format [arguments]","interface":"@coffeekraken/s-code-formatter/node/interface/SCodeFormatterFormatParamsInterface","params":{"watch":true},"settings":{"processManager":{}}}},"theme":{"theme":"default","variant":"light","cssVariables":["*"],"themes":{"default-light":{"defaultColor":"main","color":{},"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"scroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0},"timing":{},"transition":{},"helpers":{},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"ratio":{},"scalable":{},"scale":{},"opacity":{},"width":{},"height":{},"depth":{},"size":{},"font":{},"border":{},"space":{},"margin":{},"padding":{},"offsize":{},"media":{"defaultAction":"<=","defaultMedia":"desktop","defaultQuery":"screen","queries":{"mobile":{"min-width":0,"max-width":639},"tablet":{"min-width":640,"max-width":1279},"desktop":{"min-width":1280,"max-width":2047},"wide":{"min-width":2048,"max-width":null}}},"ui":{},"typo":{},"colorSchema":{},"metas":{"title":"Coffeekraken (default)","description":"Default Coffeekraken theme that you can use as a base for your custom theme"}},"default-dark":{"defaultColor":"main","color":{},"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"scroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0},"timing":{},"transition":{},"helpers":{},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"ratio":{},"scalable":{},"scale":{},"opacity":{},"width":{},"height":{},"depth":{},"size":{},"font":{},"border":{},"space":{},"margin":{},"padding":{},"offsize":{},"media":{"defaultAction":"<=","defaultMedia":"desktop","defaultQuery":"screen","queries":{"mobile":{"min-width":0,"max-width":639},"tablet":{"min-width":640,"max-width":1279},"desktop":{"min-width":1280,"max-width":2047},"wide":{"min-width":2048,"max-width":null}}},"ui":{},"typo":{},"colorSchema":{},"metas":{"title":"Coffeekraken (default)","description":"Default Coffeekraken theme that you can use as a base for your custom theme"}}}},"themeBase":{"defaultColor":"main","color":{},"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"scroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0},"timing":{},"transition":{},"helpers":{},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"ratio":{},"scalable":{},"scale":{},"opacity":{},"width":{},"height":{},"depth":{},"size":{},"font":{},"border":{},"space":{},"margin":{},"padding":{},"offsize":{},"media":{"defaultAction":"<=","defaultMedia":"desktop","defaultQuery":"screen","queries":{"mobile":{"min-width":0,"max-width":639},"tablet":{"min-width":640,"max-width":1279},"desktop":{"min-width":1280,"max-width":2047},"wide":{"min-width":2048,"max-width":null}}},"ui":{},"typo":{}},"themeDefault":{"themeName":"default","metas":{"title":"Coffeekraken (default)","description":"Default Coffeekraken theme that you can use as a base for your custom theme"},"variants":{"light":{"defaultColor":"main","color":{},"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"scroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0},"timing":{},"transition":{},"helpers":{},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"ratio":{},"scalable":{},"scale":{},"opacity":{},"width":{},"height":{},"depth":{},"size":{},"font":{},"border":{},"space":{},"margin":{},"padding":{},"offsize":{},"media":{"defaultAction":"<=","defaultMedia":"desktop","defaultQuery":"screen","queries":{"mobile":{"min-width":0,"max-width":639},"tablet":{"min-width":640,"max-width":1279},"desktop":{"min-width":1280,"max-width":2047},"wide":{"min-width":2048,"max-width":null}}},"ui":{},"typo":{},"colorSchema":{},"metas":{"title":"Coffeekraken (default)","description":"Default Coffeekraken theme that you can use as a base for your custom theme"}},"dark":{"defaultColor":"main","color":{},"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"scroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0},"timing":{},"transition":{},"helpers":{},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"ratio":{},"scalable":{},"scale":{},"opacity":{},"width":{},"height":{},"depth":{},"size":{},"font":{},"border":{},"space":{},"margin":{},"padding":{},"offsize":{},"media":{"defaultAction":"<=","defaultMedia":"desktop","defaultQuery":"screen","queries":{"mobile":{"min-width":0,"max-width":639},"tablet":{"min-width":640,"max-width":1279},"desktop":{"min-width":1280,"max-width":2047},"wide":{"min-width":2048,"max-width":null}}},"ui":{},"typo":{},"colorSchema":{},"metas":{"title":"Coffeekraken (default)","description":"Default Coffeekraken theme that you can use as a base for your custom theme"}}}},"themeDefaultDark":{"defaultColor":"main","color":{},"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"scroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0},"timing":{},"transition":{},"helpers":{},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"ratio":{},"scalable":{},"scale":{},"opacity":{},"width":{},"height":{},"depth":{},"size":{},"font":{},"border":{},"space":{},"margin":{},"padding":{},"offsize":{},"media":{"defaultAction":"<=","defaultMedia":"desktop","defaultQuery":"screen","queries":{"mobile":{"min-width":0,"max-width":639},"tablet":{"min-width":640,"max-width":1279},"desktop":{"min-width":1280,"max-width":2047},"wide":{"min-width":2048,"max-width":null}}},"ui":{},"typo":{},"colorSchema":{},"metas":{"title":"Coffeekraken (default)","description":"Default Coffeekraken theme that you can use as a base for your custom theme"}},"themeDefaultLight":{"defaultColor":"main","color":{},"easing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"scroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0},"timing":{},"transition":{},"helpers":{},"layout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"ratio":{},"scalable":{},"scale":{},"opacity":{},"width":{},"height":{},"depth":{},"size":{},"font":{},"border":{},"space":{},"margin":{},"padding":{},"offsize":{},"media":{"defaultAction":"<=","defaultMedia":"desktop","defaultQuery":"screen","queries":{"mobile":{"min-width":0,"max-width":639},"tablet":{"min-width":640,"max-width":1279},"desktop":{"min-width":1280,"max-width":2047},"wide":{"min-width":2048,"max-width":null}}},"ui":{},"typo":{},"colorSchema":{},"metas":{"title":"Coffeekraken (default)","description":"Default Coffeekraken theme that you can use as a base for your custom theme"}},"themeEasing":{"default":"cubic-bezier(0.700, 0.000, 0.305, 0.995)"},"themeLayout":{"offset":{"top":0,"right":0,"bottom":0,"left":0},"container":{"default":"1280px","wide":"1440px","full":"none"},"grid":{"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"11":11,"12":12},"layout":{"1":"1","12":"1 2","21":"2 1","112":"1 1 2","122":"1 2 2","123":"1 2 3","211":"2 1 1","221":"2 2 1","321":"3 2 1","1112":"1 1 1 2","1222":"1 2 2 2","1234":"1 2 3 4","2221":"2 2 2 1","11112":"1 1 1 1 2","12222":"1 2 2 2 2","12345":"1 2 3 4 5","22221":"2 2 2 2 1","111112":"1 1 1 1 1 2","122222":"1 2 2 2 2 2","123456":"1 2 3 4 5 6","1_2":"1 _ 2","2_1":"2 _ 1","12_33":"1 2 _ 3 3","1_23":"1 _ 2 3","1_2_3":"1 _ 2 _ 3","32_1":"3 2 _ 1","3_21":"3 _ 2 1","12_34":"1 2 _ 3 4","123_4":"1 2 3 _ 4","1_234":"1 _ 2 3 4","1_2_3_4":"1 _ 2 _ 3 _ 4","123_45":"1 2 3 _ 4 5","12_345":"1 2 _ 3 4 5","1_2345":"1 _ 2 3 4 5","1234_5":"1 2 3 4 _ 5","1_2_3_4_5":"1 _ 2 _ 3 _ 4 _ 5"}},"themeMedia":{"defaultAction":"<=","defaultMedia":"desktop","defaultQuery":"screen","queries":{"mobile":{"min-width":0,"max-width":639},"tablet":{"min-width":640,"max-width":1279},"desktop":{"min-width":1280,"max-width":2047},"wide":{"min-width":2048,"max-width":null}}},"themeScroll":{"duration":300,"offset":0,"offsetX":0,"offsetY":0}}},"PACKAGE":{"name":"@coffeekraken/s-carpenter","version":"2.0.0-alpha.20","description":"Display easily your components library as well as your sections, etc...","homepage":"https://coffeekraken.io","scripts":{"test":"echo \\"Error: no test specified\\" && exit 1"},"author":"","license":"MIT","dependencies":{"@coffeekraken/s-activate-feature":"^2.0.0-alpha.20","@coffeekraken/s-component":"^2.0.0-alpha.20","@coffeekraken/s-component-proxy":"^2.0.0-alpha.20","@coffeekraken/s-interface":"^2.0.0-alpha.20","@coffeekraken/s-log":"^2.0.0-alpha.20","@coffeekraken/s-postcss-builder":"^2.0.0-alpha.20","@coffeekraken/s-promise":"^2.0.0-alpha.20","@coffeekraken/s-specs":"^2.0.0-alpha.20","@coffeekraken/s-specs-editor-component":"^2.0.0-alpha.20","@coffeekraken/s-view-renderer":"^2.0.0-alpha.20","@coffeekraken/sugar":"^2.0.0-alpha.20","@vitejs/plugin-vue":"^3.1.2","chokidar":"^3.5.3","express":"^4.18.2","glob":"^8.0.3","vite":"^3.1.7","vite-plugin-dynamic-import":"^1.2.2"},"main":"dist/pkg/cjs/node/exports.js","module":"dist/pkg/esm/node/exports.js","exports":{".":{"require":"./dist/pkg/cjs/node/exports.js","import":"./dist/pkg/esm/node/exports.js"},"./shared/*":{"require":"./dist/pkg/cjs/shared/*.js","import":"./dist/pkg/esm/shared/*.js"},"./node/*":{"require":"./dist/pkg/cjs/node/*.js","import":"./dist/pkg/esm/node/*.js"},"./js/*":{"require":"./dist/pkg/cjs/js/*.js","import":"./dist/pkg/esm/js/*.js"}}}}`), {
  SUGAR: (_a2 = document.SUGAR) != null ? _a2 : {}
});
(async () => {
  define$2();
  console.log(define);
  define();
})();
export {
  SSugarConfig as S
};

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ensureExist = _interopRequireDefault(require("../object/ensureExist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @name                        lazy
 * @namespace                   sugar.js.import
 * @type                        Function
 *
 * Import a module at runtime and get back a Promise that will be resolved when the module is correctly loaded.
 * Handle when you want to load multiple times the same module to avoid multiple loading request if it has already been loaded
 *
 * @param               {String|Array}                      path                        The module path that you want to load
 * @param               {Boolean}                     [cache=true]                Use the cache system or not
 * @return              {Promise}                                                 A promise that will be resolved once the module is loaded
 *
 * @example             js
 * import lazyImport from '@coffeekraken/sugar/js/import/lazy';
 * lazyImport('./my/cool/module.js').then(module => {
 *    // do something with your module...
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = (path, cache = true) => {
  // cache storage object
  (0, _ensureExist.default)('window.Sugar._lazyImportCach');

  if (typeof path === 'array') {
    const modules = [];
    path.forEach(p => {
      if (window.Sugar._lazyImportCach[p]) {
        modules.push(window.Sugar._lazyImportCach[p]);
      } else {
        modules.push(Promise.resolve().then(() => _interopRequireWildcard(require(`${p}`))).then(m => {
          return new Promise((resolve, reject) => {
            if (cache) {
              window.Sugar._lazyImportCach[p] = m;
            }

            resolve(m);
          });
        }));
      }
    });
    return Promise.all(modules);
  } else {
    console.log(path);
    return Promise.resolve().then(() => _interopRequireWildcard(require(`${path}`))).then(m => {
      return new Promise((resolve, reject) => {
        if (cache) {
          window.Sugar._lazyImportCach[path] = m;
        }

        resolve(m);
      });
    });
  }
};

exports.default = _default;
module.exports = exports.default;
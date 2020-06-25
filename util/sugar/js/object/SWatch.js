"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constructorName = _interopRequireDefault(require("./constructorName"));

var _get = _interopRequireDefault(require("./get"));

var _set = _interopRequireDefault(require("./set"));

var _deepProxy = _interopRequireDefault(require("./deepProxy"));

var _parse = _interopRequireDefault(require("../string/parse"));

var _uniqid = _interopRequireDefault(require("../string/uniqid"));

var _micromatch = _interopRequireDefault(require("micromatch"));

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
 * const watcher = new SWatch();
 *
 * // object to watch
 * let myObject = {
 * 		title : 'Hello World'
 * };
 *
 * // watch the object
 * watcher.watch(myObject, 'title', (newVal, oldVal) => {
 *  	// do something when the title changes
 * });
 *
 * // update the title
 * myObject.title = 'Hello Universe';
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let SWatch = /*#__PURE__*/function () {
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
    this._proxiedObject = (0, _deepProxy.default)(object, obj => {
      let path = obj.path;
      let value = obj.value;
      let oldValue = obj.oldValue;
      if (path.slice(0, 1) === '.') path = path.slice(1); // check if that update has a watch process attached

      const watchProcesses = this._getWatchStack(path); // if no watch processes match the glob patterns, stop here


      if (!watchProcesses.length) return; // build object depending on action

      let individualWatchObj = {}; // build the object to pass to the handler

      const watchResult = {
        object: this._proxiedObject,
        path,
        action: obj.action,
        oldValue,
        value,
        ...individualWatchObj
      }; // loop on all the watch processes that match the path

      watchProcesses.forEach(watchProcess => {
        setTimeout(() => {
          watchProcess.handlerFn(watchResult);
        });
      }); /// console.trace('coco');
    });
    const watchPropertyObj = {
      writable: false,
      configurable: false,
      enumerable: false,
      value: this.watch.bind(this)
    };
    const unwatchPropertyObj = {
      writable: true,
      configurable: false,
      enumerable: false,
      value: this.unwatch.bind(this)
    };

    if (this._proxiedObject.watch !== undefined) {
      Object.defineProperties(this._proxiedObject, {
        $watch: watchPropertyObj
      });
    } else {
      Object.defineProperties(this._proxiedObject, {
        watch: watchPropertyObj
      });
    }

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
    key: "_getWatchStack",
    value: function _getWatchStack(path) {
      const watchProcesses = []; // console.log(Object.keys(this._watchStack).length);

      for (let i = 0; i < Object.keys(this._watchStack).length; i++) {
        const watchObj = this._watchStack[Object.keys(this._watchStack)[i]];

        for (let j = 0; j < watchObj.globs.length; j++) {
          if (_micromatch.default.isMatch(path, watchObj.globs[j])) {
            watchProcesses.push(watchObj);
            break;
          }
        }
      }

      return watchProcesses;
    }
    /**
     * @name              watch
     * @type              Function
     *
     * This allows you to set a watch process on one or multiple properties of the object setted in the instance.
     * The "globs" parameter has to be a simple glob pattern or an array of glob patterns.
     * The only difference with basic glob is that you can replace the "/" with "." (optional).
     * It uses under the hood the "glob" package that you can find here: https://www.npmjs.com/package/glob
     *
     * @param     {String|Array}          globs         A glob or array of glob patterns to tell which propertie(s) you want to watch
     * @param     {Function}              handlerFn     A function that will be called with the watchObj that define the update
     * @param     {String}                [id=null]   The id you want to give to this watch process. It will be used to unwatch this process
     *
     * @example         js
     * myWatch.watch('**.*', {
     *    set: (object, prop, value) => {
     *      // do something
     *    }
     * });
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "watch",
    value: function watch(globs, handlerFn, id = null) {
      if (!id) id = (0, _uniqid.default)();

      if (!this._proxiedObject.__$watchIds) {
        Object.defineProperty(this._proxiedObject, '__$watchIds', {
          enumerable: false,
          writable: false,
          value: []
        });
      }

      this._proxiedObject.__$watchIds.push(id);

      this._watchStack[id] = {
        globs: Array.isArray(globs) ? globs : [globs],
        handlerFn
      }; // return the id to be able to remove the watching process

      return id;
    }
    /**
     * @name                unwatch
     * @type                Function
     *
     * Stop watching a watch process that you have created with the "watch" function
     *
     * @param       {String}        watchId             The watchId to stop watching. This came as return of the "watch" method
     *
     * @example         js
     * const watchId = myWatch.watch('**.*', {
     *    // etc...
     * });
     * myWatch.unwatch(watchId);
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "unwatch",
    value: function unwatch(watchId = this._proxiedObject.__$watchIds) {
      if (Array.isArray(watchId)) {
        watchId.forEach(id => {
          delete this._watchStack[id];
        });
      }

      delete this._watchStack[watchId];
    }
  }]);

  return SWatch;
}();

exports.default = SWatch;
module.exports = exports.default;
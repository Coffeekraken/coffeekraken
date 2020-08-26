"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parseHtml = _interopRequireDefault(require("../console/parseHtml"));

var _SError = _interopRequireDefault(require("../error/SError"));

var _class = _interopRequireDefault(require("../is/class"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _SPromise2 = _interopRequireDefault(require("../promise/SPromise"));

var _toString = _interopRequireDefault(require("../string/toString"));

var _trimLines = _interopRequireDefault(require("../string/trimLines"));

var _uniqid = _interopRequireDefault(require("../string/uniqid"));

var _convert = _interopRequireDefault(require("../time/convert"));

var _wait = _interopRequireDefault(require("../time/wait"));

var _SActionsStreamAction = _interopRequireDefault(require("./SActionsStreamAction"));

var _SHashCache = _interopRequireDefault(require("../cache/SHashCache"));

var _lodash = require("lodash");

var _globby = require("globby");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name          SActionStream
 * @namespace           js.stream
 * @type          Class
 * @extends       SPromise
 *
 * This class represent the base of a actions stream.
 * An action stream if simply some functions that are called one after the other
 * and that pass to each other some value(s) on which to work.
 * Here's all the "events" that you can subscribe on the SActionStream instance, or on the returned SPromise when calling the "start" method:
 * - start: Triggered when the overall actions stream starts
 * - {actionName}.start: Triggered when the specified action starts
 * - {actionName}.reject: Triggered when the specified action has been rejected
 * - {actionName}.complete: Triggered when the specified action has been completed
 * - complete: Triggered when the overall actions stream has been completed
 * - resolve: Trigerred when the overall actions stream has been completed
 * - log: Triggered when a log message has been set
 * - cancel: Triggered when the stream has been canceled using the "cancel" method of the returned SPromise when calling the "start" method
 *
 * @param       {Object}        actions         An object of actions to execute one after the other. The object has to be formatted like ```{ actionName: actionFunction }```
 * @param       {Object}        [settings={}]   A settings object to configure your instance:
 * - name (null) {String}: A simple name for your stream that will be used in the logs
 * - order (null) {Array}: An array of action names that specify the order you want to execute them. If not specified, take the actions object properties order.
 * - actions ({}) {Object}: An object formated like ```{ actionName: settings }``` that contain specific settings for each actions and that will be passed as a second parameter to each actions.
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SActionStream = /*#__PURE__*/function (_SPromise) {
  _inherits(SActionStream, _SPromise);

  var _super = _createSuper(SActionStream);

  /**
   * @name            _actionsObj
   * @type            Object
   * @private
   *
   * Store the actions object
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name            _currentStream
   * @type            SPromise
   * @private
   *
   * Store the current running stream. Here's the object structure:
   * {
   *    promise: Store the SPromise instance for the stream
   *    currentActionObj: {
   *       name: Store the name of the current action executing in the stream
   *       promise: Store the promise returned from the ```run``` action instance method
   *    }
   * }
   *
   * @since         2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SActionStream(actions, settings) {
    var _thisSuper, _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SActionStream);

    // init SPromise
    _this = _super.call(this, () => {}, (0, _deepMerge.default)({
      id: (0, _uniqid.default)(),
      cache: true,
      name: null,
      order: null,
      before: [],
      after: [],
      beforeActions: {},
      afterActions: {},
      actions: {}
    }, settings));

    _defineProperty(_assertThisInitialized(_this), "_actionsObject", {});

    _defineProperty(_assertThisInitialized(_this), "_currentStream", null);

    _defineProperty(_assertThisInitialized(_this), "_cachedStreamObj", null);

    _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(SActionStream.prototype)), "start", _thisSuper).call(_thisSuper); // check the actions


    Object.keys(actions).forEach(actionName => {
      var actionInstance = actions[actionName];

      if (typeof actionInstance === 'function' || (0, _class.default)(actionInstance) && actionInstance.constructor.name === 'SActionsStreamAction' || actionInstance instanceof _SActionsStreamAction.default) {} else {
        throw new _SError.default((0, _parseHtml.default)("The value passed for the \"<yellow>".concat(actionName, "</yellow>\" action has to be either a simple function or an \"<green>SActionsStreamAction</green>\" instance. You have passed a \"<red>").concat(typeof actionInstance, "</red>\"...")));
      }
    }); // init a SHashCache instance if needed

    if (_this._settings.cache) {
      _this._sHashCache = new _SHashCache.default(settings.id, settings.cache === true ? {} : settings.cache);
    } // save the actions


    _this._actionsObject = actions;
    return _this;
  }
  /**
   * @name          hasCurrentStreamErrors
   * @type          Function
   *
   * This method return true or false depending if the current stream has some errors or not
   *
   * @return      {Boolean}           true if not errors, false if not
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SActionStream, [{
    key: "hasCurrentStreamErrors",
    value: function hasCurrentStreamErrors() {
      return this._currentStream && this._currentStream.stats.stderr.length;
    }
    /**
     * @name          _beforeCallbacks
     * @type          Function
     * @private
     * @async
     *
     * This method take care of executing the callbacks of the "before" stack
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_beforeCallbacks",
    value: function () {
      var _beforeCallbacks2 = _asyncToGenerator(function* () {
        // check if is a "before" setting function
        if (this._currentStream.settings.before && this._currentStream.settings.before.length) {
          var startTime = Date.now();
          this.log({
            group: 'beforeCallbacks',
            value: "Executing the <cyan>".concat(this._currentStream.settings.before.length, "</cyan> callback(s) registered before the entire actions stream process...")
          });

          try {
            for (var key in this._currentStream.settings.before) {
              var fn = this._currentStream.settings.before[key];
              this._currentStream.streamObjArray = fn(this._currentStream.streamObjArray);
            }

            this.log({
              group: 'beforeCallbacks',
              value: "#success The <cyan>".concat(this._currentStream.settings.before.length, "</cyan> before stream callback(s) have finished <green>successfully</green> <yellow>").concat((0, _convert.default)(Date.now() - startTime, 's'), "s</yellow>")
            });
          } catch (e) {
            if (typeof e === 'object') {
              this._currentStream.currentActionObj.stats.stderr.push((0, _toString.default)(e));

              this._currentStream.stats.stderr.push((0, _toString.default)(e));
            } else if (typeof e === 'string') {
              this._currentStream.currentActionObj.stats.stderr.push(e);

              this._currentStream.stats.stderr.push(e);
            }
          }
        }

        return this._currentStream.streamObjArray;
      });

      function _beforeCallbacks() {
        return _beforeCallbacks2.apply(this, arguments);
      }

      return _beforeCallbacks;
    }()
    /**
     * @name          _afterCallbacks
     * @type          Function
     * @private
     * @async
     *
     * This method take care of executing the callbacks of the "after" stack
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_afterCallbacks",
    value: function () {
      var _afterCallbacks2 = _asyncToGenerator(function* () {
        if (this._currentStream.settings.after && this._currentStream.settings.after.length) {
          var startTime = Date.now();
          this.log({
            group: 'afterCallbacks',
            value: "Executing the <cyan>".concat(this._currentStream.settings.after.length, "</cyan> callback(s) registered after the entire actions stream process...")
          });

          try {
            for (var key in this._currentStream.settings.after) {
              var fn = this._currentStream.settings.after[key];
              var fnResult = fn(this._currentStream.streamObjArray);

              if (fnResult instanceof Promise) {
                this._currentStream.streamObjArray = yield fnResult;
              } else {
                this._currentStream.streamObjArray = fnResult;
              }
            }

            this.log({
              group: 'afterCallbacks',
              value: "#success The <cyan>".concat(this._currentStream.settings.after.length, "</cyan> after stream callback(s) have finished <green>successfully</green> <yellow>").concat((0, _convert.default)(Date.now() - startTime, 's'), "s</yellow>")
            });
          } catch (e) {
            if (typeof e === 'object') {
              this._currentStream.currentActionObj.stats.stderr.push((0, _toString.default)(e));

              this._currentStream.stats.stderr.push((0, _toString.default)(e));
            } else if (typeof e === 'string') {
              this._currentStream.currentActionObj.stats.stderr.push(e);

              this._currentStream.stats.stderr.push(e);
            }
          }
        }

        return this._currentStream.streamObjArray;
      });

      function _afterCallbacks() {
        return _afterCallbacks2.apply(this, arguments);
      }

      return _afterCallbacks;
    }()
  }, {
    key: "_applyFnOnStreamObj",
    value: function () {
      var _applyFnOnStreamObj2 = _asyncToGenerator(function* (streamObjOrArray, processFn, settings) {
        var _this2 = this;

        if (settings === void 0) {
          settings = {};
        }

        settings = (0, _deepMerge.default)({
          processFnArgs: [],
          type: 'main',
          resultProcessor: null
        }, settings);

        var logActionStatus = () => {// this.log({
          //   temp: true,
          //   group: this._currentStream.currentActionObj.name,
          //   value: `Processing <cyan>${
          //     Array.isArray(this._currentStream.streamObjArray)
          //       ? this._currentStream.streamObjArray.length
          //       : 1
          //   }</cyan> sources. Processed <green>${
          //     this._currentStream.currentActionObj.processed
          //   }</green>, from cache: <yellow>${
          //     this._currentStream.currentActionObj.fromCache
          //   }</yellow>`
          // });
        };

        var isArray = Array.isArray(streamObjOrArray);
        var streamObjArray = streamObjOrArray;
        if (!isArray) streamObjArray = [streamObjArray];
        streamObjArray.forEach( /*#__PURE__*/function () {
          var _ref = _asyncToGenerator(function* (streamObj) {
            if (streamObj.$fromCache) return; // set the current action in the streamObj

            streamObj.$action = "".concat(_this2._currentStream.currentActionObj.name, ".").concat(settings.type); // get the value from the cache if available

            if (_this2._sHashCache && _this2._currentStream.currentActionObj.instance.settings.cache) {
              var isCached = yield _this2._sHashCache.exists(_objectSpread(_objectSpread({}, streamObj), {}, {
                settings: _this2._settings
              }));

              if (isCached) {
                streamObj.$fromCache = true;
                _this2._currentStream.currentActionObj.fromCache++;
                logActionStatus();
                return;
              } // this.log({
              //   group: this._currentStream.currentActionObj.name,
              //   value: `Skipping the "<yellow>before</yellow>" action cause data taken from cache...`
              // });

            }

            var processFnArgs = [streamObj, ...settings.processFnArgs];
            var processFnResult = processFn(...processFnArgs);
            if (settings.resultProcessor) processFnResult = settings.resultProcessor.bind(_this2)(processFnResult);

            if (processFnResult instanceof Promise) {
              streamObj = yield processFnResult;
            } else {
              streamObj = processFnResult;
            }

            _this2._currentStream.currentActionObj.processed++;
            logActionStatus(); // save in cache

            if (_this2._settings.cache) yield _this2._saveInCache(streamObj);
          });

          return function (_x4) {
            return _ref.apply(this, arguments);
          };
        }());
        if (isArray) return streamObjArray;
        return streamObjArray[0];
      });

      function _applyFnOnStreamObj(_x, _x2, _x3) {
        return _applyFnOnStreamObj2.apply(this, arguments);
      }

      return _applyFnOnStreamObj;
    }()
  }, {
    key: "_handleStreamObjArray",
    value: function () {
      var _handleStreamObjArray2 = _asyncToGenerator(function* () {
        var stack = this._currentStream.streamObjArray;

        for (var j = 0; j < stack.length; j++) {
          var currentStreamObj = stack[j];

          if (currentStreamObj.$fromCache) {
            logActionStatus();
            continue;
          } // currentStreamObj = await this._applyFnOnStreamObj(
          //   currentStreamObj,
          //   this._beforeActionCallbacks,
          //   {
          //     type: 'before'
          //   }
          // );
          // call the action and pass it the current stream object


          try {
            currentStreamObj = yield this._applyFnOnStreamObj(currentStreamObj, this._currentStream.currentActionObj.instance.run.bind(this._currentStream.currentActionObj.instance), {
              type: 'main',
              processFnArgs: [this._currentStream.currentActionObj.instance.settings],
              resultProcessor: fnResult => {
                if (fnResult instanceof Promise) {
                  _SPromise2.default.pipe(fnResult, this._currentStream.promise);

                  _SPromise2.default.pipe(fnResult, this);

                  this._currentStream.currentActionObj.promise = fnResult;
                }
              }
            });
          } catch (e) {
            if (typeof e === 'object') {
              this._currentStream.currentActionObj.stats.stderr.push((0, _toString.default)(e));

              this._currentStream.stats.stderr.push((0, _toString.default)(e));
            } else if (typeof e === 'string') {
              this._currentStream.currentActionObj.stats.stderr.push(e);

              this._currentStream.stats.stderr.push(e);
            }
          }

          if (this._currentStream.currentActionObj.instance && this._currentStream.currentActionObj.instance._skipNextActions) {
            this._currentStream.stats.skipNextActions = this._currentStream.currentActionObj.instance._skipNextActions;
          } // check if an "afterCallback" callback has been passed in the streamObj


          if (this._currentStream.currentActionObj.instance && this._currentStream.currentActionObj.instance._registeredCallbacks && this._currentStream.currentActionObj.instance._registeredCallbacks.length) {
            this._currentStream.currentActionObj.instance._registeredCallbacks.forEach(callbackObj => {
              if (!callbackObj.action) {
                if (callbackObj.when === 'after') {
                  this._currentStream.settings.after = [...this._currentStream.settings.after, callbackObj.callback];
                } else {
                  this._currentStream.settings.before = [...this._currentStream.settings.before, callbackObj.callback];
                }
              } else {
                if (callbackObj.when === 'before') {
                  if (!this._currentStream.settings.beforeActions[callbackObj.action]) this._currentStream.settings.beforeActions[callbackObj.action] = [];else if (!Array.isArray(this._currentStream.settings.beforeActions[callbackObj.action])) this._currentStream.settings.beforeActions[callbackObj.action] = [this._currentStream.settings.beforeActions[callbackObj.action]];

                  this._currentStream.settings.beforeActions[callbackObj.action].push(callbackObj.callback);
                } else {
                  if (!this._currentStream.settings.afterActions[callbackObj.action]) this._currentStream.settings.afterActions[callbackObj.action] = [];else if (!Array.isArray(this._currentStream.settings.afterActions[callbackObj.action])) this._currentStream.settings.afterActions[callbackObj.action] = [this._currentStream.settings.afterActions[callbackObj.action]];

                  this._currentStream.settings.afterActions[callbackObj.action].push(callbackObj.callback);
                }
              }
            });
          } // currentStreamObj = await this._applyFnOnStreamObj(
          //   currentStreamObj,
          //   this._afterActionCallbacks,
          //   {
          //     type: 'after'
          //   }
          // );
          // replace the streamObj with the new one in the stack


          stack[j] = currentStreamObj;

          if (this._currentStream.stats.canceled || this.hasCurrentStreamErrors()) {
            this._currentStream.streamObjArray = stack;
            return this._currentStream.streamObjArray;
          }
        } // flatten the stack


        stack = stack.flat(1); // filter the streamObjects that comes from the cache

        stack = stack.filter(streamObj => {
          return streamObj.$fromCache === undefined;
        });
        this._currentStream.streamObjArray = stack;
        return this._currentStream.streamObjArray;
      });

      function _handleStreamObjArray() {
        return _handleStreamObjArray2.apply(this, arguments);
      }

      return _handleStreamObjArray;
    }()
    /**
     * @name            _saveInCache
     * @type            Function
     * @private
     *
     * This method simmply take the stream object and save it into the cache
     *
     * @param       {Object}        streamObj         The stream object to save into cache
     * @return      {Promise}                         A promise resolved when the streamObj has been saved
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_saveInCache",
    value: function () {
      var _saveInCache2 = _asyncToGenerator(function* (streamObj) {
        // save in cache
        if (this._sHashCache && this._currentStream.currentActionObj.instance.settings.cache) {
          yield this._sHashCache.set(_objectSpread(_objectSpread({}, streamObj), {}, {
            settings: this._settings
          }), true);
        }

        return true;
      });

      function _saveInCache(_x5) {
        return _saveInCache2.apply(this, arguments);
      }

      return _saveInCache;
    }()
    /**
     * @name            _afterActionCallbacks
     * @type             Function
     * @private
     * @async
     *
     * This method take care of the callback registered after a specific action
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_afterActionCallbacks",
    value: function () {
      var _afterActionCallbacks2 = _asyncToGenerator(function* (streamObj) {
        var _this3 = this;

        if (!this._currentStream.settings.afterActions[this._currentStream.currentActionObj.name]) this._currentStream.settings.afterActions[this._currentStream.currentActionObj.name] = [];else if (!Array.isArray(this._currentStream.settings.afterActions[this._currentStream.currentActionObj.name])) {
          this._currentStream.settings.afterActions[this._currentStream.currentActionObj.name] = [this._currentStream.settings.afterActions[this._currentStream.currentActionObj.name]];
        }

        if (this._currentStream.settings.afterActions[this._currentStream.currentActionObj.name] && this._currentStream.settings.afterActions[this._currentStream.currentActionObj.name].length) {
          var count = this._currentStream.settings.afterActions[this._currentStream.currentActionObj.name].length;
          this.log({
            group: this._currentStream.currentActionObj.name,
            value: "Executing the <cyan>".concat(count, "</cyan> callback(s) registered after the <yellow>").concat(this._currentStream.currentActionObj.name, "</yellow> action...")
          });

          if (Array.isArray(streamObj)) {
            streamObj.forEach( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator(function* (strObj, i) {
                var actionsArray = _this3._currentStream.settings.afterActions[_this3._currentStream.currentActionObj.name];

                for (var _i = 0; _i < actionsArray.length; _i++) {
                  var fn = actionsArray[_i];

                  try {
                    var fnResult = fn(streamObj[_i], Object.assign({}, _this3._currentStream.currentActionObj));

                    if (fnResult instanceof Promise) {
                      streamObj[_i] = yield fnResult;
                    } else {
                      streamObj[_i] = fnResult;
                    }
                  } catch (e) {
                    var msg = "Something when wrong during the execution of the <yellow>afterActions.".concat(_this3._currentStream.currentActionObj.name, "</yellow> function...");

                    _this3._currentStream.stats.stderr.push(msg);

                    _this3._currentStream.stats.stderr.push((0, _toString.default)(e));
                  }
                }
              });

              return function (_x7, _x8) {
                return _ref2.apply(this, arguments);
              };
            }());
          } else {
            var actionsArray = this._currentStream.settings.afterActions[this._currentStream.currentActionObj.name];
            if (!Array.isArray(actionsArray)) actionsArray = [actionsArray];

            for (var i = 0; i < actionsArray.length; i++) {
              var fn = actionsArray[i];

              try {
                var fnResult = fn(streamObj, Object.assign({}, this._currentStream.currentActionObj));

                if (fnResult instanceof Promise) {
                  streamObj = yield fnResult;
                } else {
                  streamObj = fnResult;
                }
              } catch (e) {
                var msg = "Something when wrong during the execution of the <yellow>afterActions.".concat(this._currentStream.currentActionObj.name, "</yellow> function...");

                this._currentStream.stats.stderr.push(msg);

                this._currentStream.stats.stderr.push((0, _toString.default)(e));
              }
            }
          }
        }

        return streamObj;
      });

      function _afterActionCallbacks(_x6) {
        return _afterActionCallbacks2.apply(this, arguments);
      }

      return _afterActionCallbacks;
    }()
    /**
     * @name            _beforeActionCallbacks
     * @type             Function
     * @private
     * @async
     *
     * This method take care of the callback registered before a specific action
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_beforeActionCallbacks",
    value: function () {
      var _beforeActionCallbacks2 = _asyncToGenerator(function* (streamObj) {
        var _this4 = this;

        // check if is a "afterActions" setting function
        if (!this._currentStream.settings.beforeActions[this._currentStream.currentActionObj.name]) this._currentStream.settings.beforeActions[this._currentStream.currentActionObj.name] = [];else if (!Array.isArray(this._currentStream.settings.beforeActions[this._currentStream.currentActionObj.name])) {
          this._currentStream.settings.beforeActions[this._currentStream.currentActionObj.name] = [this._currentStream.settings.beforeActions[this._currentStream.currentActionObj.name]];
        }

        if (this._currentStream.settings.beforeActions[this._currentStream.currentActionObj.name] && this._currentStream.settings.beforeActions[this._currentStream.currentActionObj.name].length) {
          var count = this._currentStream.settings.beforeActions[this._currentStream.currentActionObj.name].length;
          this.log({
            group: this._currentStream.currentActionObj.name,
            value: "Executing the <cyan>".concat(count, "</cyan> callback(s) registered after the <yellow>").concat(this._currentStream.currentActionObj.name, "</yellow> action...")
          });

          if (Array.isArray(streamObj)) {
            streamObj.forEach( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator(function* (strObj, i) {
                var actionsArray = _this4._currentStream.settings.beforeActions[_this4._currentStream.currentActionObj.name];

                for (var _i2 = 0; _i2 < actionsArray.length; _i2++) {
                  var fn = actionsArray[_i2];

                  try {
                    var fnResult = fn(streamObj[_i2], Object.assign({}, _this4._currentStream.currentActionObj));

                    if (fnResult instanceof Promise) {
                      streamObj[_i2] = yield fnResult;
                    } else {
                      streamObj[_i2] = fnResult;
                    }
                  } catch (e) {
                    var msg = "Something when wrong during the execution of the <yellow>beforeActions.".concat(_this4._currentStream.currentActionObj.name, "</yellow> function...");

                    _this4._currentStream.stats.stderr.push(msg);

                    _this4._currentStream.stats.stderr.push((0, _toString.default)(e));
                  }
                }
              });

              return function (_x10, _x11) {
                return _ref3.apply(this, arguments);
              };
            }());
          } else {
            var actionsArray = this._currentStream.settings.beforeActions[this._currentStream.currentActionObj.name];

            for (var i = 0; i < actionsArray.length; i++) {
              var fn = actionsArray[i];

              try {
                var fnResult = fn(streamObj, Object.assign({}, this._currentStream.currentActionObj));

                if (fnResult instanceof Promise) {
                  streamObj = yield fnResult;
                } else {
                  streamObj = fnResult;
                }
              } catch (e) {
                var msg = "Something when wrong during the execution of the <yellow>beforeActions.".concat(this._currentStream.currentActionObj.name, "</yellow> function...");

                this._currentStream.stats.stderr.push(msg);

                this._currentStream.stats.stderr.push((0, _toString.default)(e));
              }
            }
          }
        }

        return streamObj;
      });

      function _beforeActionCallbacks(_x9) {
        return _beforeActionCallbacks2.apply(this, arguments);
      }

      return _beforeActionCallbacks;
    }()
    /**
     * @name          start
     * @type          Function
     * @async
     *
     * This method launch the action stream and return an SPromise instance for this particular stream "process"
     *
     * @param       {Object}          [streamObj={}]           An object that will be passed along all the actions and that can be updated at every steps. Make sure that your current action return what the next one need to work correctly...
     * @param       {Object}          [settings={}]           An object of settings to override the instance level one if wanted
     * @return      {SPromise}                                An SPromise instance for this particular stream "process" on which you can subscribe to the same "events" that on the SActionsStrean instance.
     *
     * @example         js
     * const streamPromise = myStream.start();
     * streamPromise.on('step', (streamObj) => {
     *    // do something
     * }).on('resolve', (resultObj) => {
     *    // do something
     * });
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "start",
    value: function start(streamObj, settings) {
      var _this5 = this;

      if (streamObj === void 0) {
        streamObj = {};
      }

      if (settings === void 0) {
        settings = {};
      }

      settings = (0, _deepMerge.default)(Object.assign({}, this._settings), settings);
      var currentStreamObj = Object.assign({}, streamObj);
      this._currentStream = {
        promise: null,
        streamObjArray: Array.isArray(currentStreamObj) ? currentStreamObj : [currentStreamObj],
        currentActionObj: {
          name: null,
          promise: null,
          instance: null,
          sourcesCount: 0,
          fromCache: 0,
          processed: 0
        },
        settings,
        stats: {
          startTime: Date.now(),
          endTime: null,
          stderr: [],
          stdout: [],
          skipNextActions: false,
          canceled: false,
          actions: {}
        }
      }; // make sure the before, after, beforeAction and afterAction stacks are Arrays

      if (settings.before && !Array.isArray(settings.before)) settings.before = [settings.before];
      if (settings.after && !Array.isArray(settings.after)) settings.after = [settings.after];
      this._currentStream.promise = new _SPromise2.default( /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator(function* (resolve, reject, trigger, cancel) {
          yield (0, _wait.default)(100); // ugly hack to check when have time...
          // starting log

          var startString = "#start Starting the stream \"<cyan>".concat(settings.name || 'unnamed', "</cyan>\"");

          _this5.log(startString);

          _this5.trigger('start', {});

          trigger('start', {}); // set the current action in the streamObj
          //currentStreamObj.$action = `before`;
          // get the value from the cache if available
          // if (this._sHashCache) {
          //   this._cachedStreamObj = await this._sHashCache.get({
          //     ...currentStreamObj,
          //     settings: this._settings
          //   });
          // }
          // before callbacks
          // await this._beforeCallbacks();

          if (!_this5.hasCurrentStreamErrors()) {
            // take the actions order array
            var actionsOrderedNames = Array.isArray(settings.order) ? settings.order : Object.keys(_this5._actionsObject); // check the order

            actionsOrderedNames.forEach(actionName => {
              if (!_this5._actionsObject[actionName]) {
                _this5._currentStream.stats.stderr.push((0, _parseHtml.default)("You have specified the action \"<yellow>".concat(actionName, "</yellow>\" in your SActionsStream instance but it is not available. Here's the available actions: <green>").concat(Object.keys(_this5._actionsObject).join(','), "</green>")));
              }
            });

            for (var i = 0; i < actionsOrderedNames.length; i++) {
              if (_this5._currentStream.canceled || _this5.hasCurrentStreamErrors()) {
                // this.log('stop');
                break;
              }

              var actionName = actionsOrderedNames[i];
              var actionInstance = void 0;
              var actionSettings = settings.actions ? settings.actions[actionName] || {} : {}; // make sure we have a "name" property in the actionSettings object

              if (!actionSettings.name) {
                actionSettings.name = actionName;
              }

              var skipMessage = null,
                  skipAction = 'break';

              if (_this5._currentStream.stats.skipNextActions === true) {
                skipMessage = "#warning Skipping all the next actions after the \"<cyan>".concat(actionsOrderedNames[i - 1], "</cyan>\" one...");
                skipAction = 'break';
              } else if (Array.isArray(_this5._currentStream.stats.skipNextActions) && _this5._currentStream.stats.skipNextActions.indexOf(actionName) !== -1) {
                skipMessage = "#warning Skipping the \"<yellow>".concat(actionName, "</yellow>\" action...");
                skipAction = 'continue';
              } else if (typeof _this5._currentStream.stats.skipNextActions === 'number' && _this5._currentStream.stats.skipNextActions > 0) {
                _this5._currentStream.stats.skipNextActions--;
                skipMessage = "#warning Skipping the \"<yellow>".concat(actionName, "</yellow>\" action. Reamaining action(s) to skip: <cyan>").concat(_this5._currentStream.stats.skipNextActions, "</cyan>...");
                skipAction = 'continue';
              }

              if (skipMessage) {
                _this5.log({
                  value: skipMessage
                });

                if (skipAction === 'continue') continue;else break;
              } // handle passed action that can be either a simple function, a extended SActionsStreamAction class or an instance of the SActionsStreamAction class


              if ((0, _class.default)(_this5._actionsObject[actionName]) && _this5._actionsObject[actionName].prototype instanceof _SActionsStreamAction.default) {
                actionInstance = new _this5._actionsObject[actionName](actionSettings);
              } else {
                _this5._currentStream.stats.stderr.push("Your action \"<yellow>".concat(actionName, "</yellow>\" has to be a class extending the <cyan>SActionsStreamAction</cyan> one..."));

                break;
              }

              _this5._currentStream.currentActionObj = {
                name: actionName,
                sourcesCount: _this5._currentStream.streamObjArray.length,
                processed: 0,
                fromCache: 0,
                instance: actionInstance,
                stats: {
                  action: actionName,
                  startTime: Date.now(),
                  stderr: [],
                  stdout: []
                }
              };

              if (_this5._currentStream.currentActionObj.instance) {
                _this5._currentStream.currentActionObj.instance.on('reject', value => {
                  _this5.trigger("".concat(_this5._currentStream.currentActionObj.name, ".reject"), value);

                  trigger("".concat(_this5._currentStream.currentActionObj.name, ".reject"), value);
                  cancel(value);
                });

                actionSettings = (0, _deepMerge.default)(_this5._currentStream.currentActionObj.instance._settings, actionSettings);
              } // trigger some "start" events


              _this5.trigger("".concat(_this5._currentStream.currentActionObj.name, ".start"), Object.assign({}, _this5._currentStream.currentActionObj));

              trigger("".concat(_this5._currentStream.currentActionObj.name, ".start"), Object.assign({}, _this5._currentStream.currentActionObj));

              var _startString = "#start Starting the action \"<yellow>".concat(_this5._currentStream.currentActionObj.name, "</yellow>\" on <magenta>").concat(_this5._currentStream.currentActionObj.sourcesCount, "</magenta> sources");

              _this5.log({
                group: _this5._currentStream.currentActionObj.name,
                value: _startString
              });

              yield _this5._handleStreamObjArray();

              if (_this5.hasCurrentStreamErrors()) {
                break;
              } // if (this.constructor.interface) {
              //   const issuesString = this.constructor.interface.apply(
              //     this._currentStream.streamObjArray[0],
              //     { return: 'string', throw: false }
              //   );
              //   if (issuesString !== true) {
              //     this._currentStream.stats.stderr.push(issuesString);
              //     this._currentStream.currentActionObj.stats.stderr.push(
              //       issuesString
              //     );
              //   }
              // }
              // complete the actionObj


              _this5._currentStream.currentActionObj.stats = _objectSpread(_objectSpread({}, _this5._currentStream.currentActionObj.stats), {}, {
                endTime: Date.now(),
                duration: Date.now() - _this5._currentStream.currentActionObj.stats.startTime
              }); // save the result into the overall actions stats object

              _this5._currentStream.stats.actions[_this5._currentStream.currentActionObj.name] = Object.assign({}, _this5._currentStream.currentActionObj); // trigger an "event"

              _this5.trigger("".concat(_this5._currentStream.currentActionObj.name, ".complete"), Object.assign({}, _this5._currentStream.currentActionObj));

              trigger("".concat(_this5._currentStream.currentActionObj.name, ".complete"), Object.assign({}, _this5._currentStream.currentActionObj));

              if (_this5._currentStream.currentActionObj.stats.stderr.length) {
                var errorString = "#error <red>Something went wrong during the </red>\"<yellow>".concat(_this5._currentStream.currentActionObj.name, "</yellow>\"<red> action...</red>");

                _this5._currentStream.currentActionObj.stats.stderr.push(errorString);

                _this5._currentStream.stats.stderr.push(errorString);

                break;
              } else {
                var successString = "#success The action \"<yellow>".concat(_this5._currentStream.currentActionObj.name, "</yellow>\" has finished <green>successfully</green> on <magenta>").concat(_this5._currentStream.currentActionObj.sourcesCount, "</magenta> sources in <yellow>").concat((0, _convert.default)(_this5._currentStream.currentActionObj.stats.duration, 's'), "s</yellow>");

                _this5._currentStream.currentActionObj.stats.stdout.push(successString);

                _this5.log({
                  group: _this5._currentStream.currentActionObj.name,
                  value: successString
                });
              }
            }
          } // // set the current action in the streamObj
          // currentStreamObj.$action = `after`;
          // // get the value from the cache if available
          // if (this._sHashCache) {
          //   this._cachedStreamObj = await this._sHashCache.get({
          //     ...currentStreamObj,
          //     settings: this._settings
          //   });
          // }
          // after callbacks
          // await this._afterCallbacks();
          // if (this.constructor.interface) {
          //   const issuesString = this.constructor.interface.apply(
          //     this._currentStream.streamObjArray[0],
          //     { return: 'string', throw: false }
          //   );
          //   if (issuesString !== true) {
          //     this._currentStream.stats.stderr.push(issuesString);
          //   }
          // }
          // complete the overall stats


          _this5._currentStream.stats = _objectSpread(_objectSpread({}, _this5._currentStream.stats), {}, {
            streamObj: _this5._currentStream.streamObjArray,
            endTime: Date.now(),
            duration: Date.now() - _this5._currentStream.stats.startTime
          });

          if (_this5.hasCurrentStreamErrors() || _this5._currentStream.stats.canceled) {
            var _errorString = "The stream \"<cyan>".concat(settings.name || 'unnamed', "</cyan>\" has had some issues...");

            _this5._currentStream.stats.stdout.push(_errorString);

            _this5.log({
              error: true,
              value: _errorString
            });

            _this5.log({
              error: true,
              value: (0, _trimLines.default)(_this5._currentStream.stats.stderr.join('\n'))
            });

            _this5.trigger('reject', _this5._currentStream.stats);

            trigger('reject', _this5._currentStream.stats);
          } else {
            var completeString = "#success The stream \"<cyan>".concat(_this5._currentStream.settings.name || 'unnamed', "</cyan>\" has finished <green>successfully</green> in <yellow>").concat((0, _convert.default)(_this5._currentStream.stats.duration, 's'), "s</yellow>");

            _this5._currentStream.stats.stdout.push(completeString);

            _this5.log({
              value: completeString
            }); // resolve this stream process


            _this5.trigger('complete', _this5._currentStream.stats);

            trigger('complete', _this5._currentStream.stats);
            resolve(_this5._currentStream.stats);
          }
        });

        return function (_x12, _x13, _x14, _x15) {
          return _ref4.apply(this, arguments);
        };
      }(), {
        id: this._settings.id
      }).start();
      return this._currentStream.promise;
    }
    /**
     * @name                  log
     * @type                  Function
     *
     * THis method allows you to log something that will be passed upward through the SPromise events "stdout".
     *
     * @param       {String}          ...args             The messages to log
     *
     * @since         2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "log",
    value: function log() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args.forEach(arg => {
        if (this._currentStream && this._currentStream.promise) {
          this._currentStream.promise.trigger('log', arg);
        }

        this.trigger('log', arg);
      });
    }
  }]);

  return SActionStream;
}(_SPromise2.default);

exports.default = SActionStream;
module.exports = exports.default;
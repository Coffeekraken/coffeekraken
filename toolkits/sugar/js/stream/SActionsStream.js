"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clone = _interopRequireDefault(require("../object/clone"));

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

var _SCache = _interopRequireDefault(require("../cache/SCache"));

var _sha = _interopRequireDefault(require("../crypt/sha256"));

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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name          SActionStream
 * @namespace           sugar.js.stream
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
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SActionStream);

    // init SPromise
    _this = _super.call(this, (0, _deepMerge.default)({
      id: (0, _uniqid.default)(),
      cache: false,
      name: null,
      order: null,
      before: [],
      after: [],
      beforeActions: {},
      afterActions: {},
      actions: {}
    }, settings)); // check the actions

    _defineProperty(_assertThisInitialized(_this), "_actionsObject", {});

    _defineProperty(_assertThisInitialized(_this), "_currentStream", null);

    Object.keys(actions).forEach(actionName => {
      var actionInstance = actions[actionName];

      if (typeof actionInstance === 'function' || (0, _class.default)(actionInstance) && actionInstance.constructor.name === 'SActionsStreamAction' || actionInstance instanceof _SActionsStreamAction.default) {} else {
        throw new _SError.default((0, _parseHtml.default)("The value passed for the \"<yellow>".concat(actionName, "</yellow>\" action has to be either a simple function or an \"<green>SActionsStreamAction</green>\" instance. You have passed a \"<red>").concat(typeof actionInstance, "</red>\"...")));
      }
    }); // init a SCache instance if needed

    if (_this._settings.cache) {
      _this._sCache = new _SCache.default(settings.id, settings.cache === true ? {} : settings.cache);
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
  }, {
    key: "_applyFnOnStreamObj",
    value: function () {
      var _applyFnOnStreamObj2 = _asyncToGenerator(function* (streamObjOrArray, processFn, settings) {
        if (settings === void 0) {
          settings = {};
        }

        settings = (0, _deepMerge.default)({
          processFnArgs: [],
          type: 'main',
          resultProcessor: null
        }, settings);

        var logActionStatus = () => {
          var logString = "Processing <cyan>".concat(Array.isArray(this._currentStream.streamObjArray) ? this._currentStream.streamObjArray.length : 1, "</cyan> source").concat(Array.isArray(this._currentStream.streamObjArray) ? this._currentStream.streamObjArray.length > 1 ? 's' : '' : '', " | Processed <green>").concat(this._currentStream.currentActionObj.processed, "</green>");

          if (this._settings.cache) {
            logString += " | From cache: <yellow>".concat(this._currentStream.currentActionObj.fromCache, "</yellow>");
          }

          this.log({
            temp: true,
            group: this._currentStream.currentActionObj.name,
            value: logString
          });
        };

        var processFnArray = !Array.isArray(processFn) ? [processFn] : processFn;
        var isArray = Array.isArray(streamObjOrArray);
        var streamObjArray = streamObjOrArray;
        if (!isArray) streamObjArray = [streamObjArray];

        for (var streamObjArrayIdx in streamObjArray) {
          var streamObj = streamObjArray[streamObjArrayIdx]; // if (streamObj.$fromCache) return;
          // set the current action in the streamObj

          streamObj.$action = settings.type; // calculate the hash of this particular action

          var actionHash = _sha.default.encrypt((0, _toString.default)(_objectSpread(_objectSpread({}, (0, _clone.default)(streamObj)), {}, {
            settings: this._settings
          }))); // get the value from the cache if available


          if (this._currentStream.currentActionObj.instance && this._currentStream.currentActionObj.instance.settings.cache && this._sCache || this._sCache && !this._currentStream.currentActionObj.instance) {
            var cachedStreamObj = yield this._sCache.get(actionHash);

            if (cachedStreamObj) {
              streamObj = cachedStreamObj;
              streamObj.$fromCache = true;
              streamObjArray[streamObjArrayIdx] = streamObj;
              this._currentStream.currentActionObj.fromCache++;
              logActionStatus();
              return;
            }
          }

          var processFnArgs = [streamObj, ...settings.processFnArgs];

          for (var processFnArrayIdx in processFnArray) {
            var _processFn = processFnArray[processFnArrayIdx];

            try {
              var processFnResult = _processFn(...processFnArgs);

              if (settings.resultProcessor) processFnResult = settings.resultProcessor.bind(this)(processFnResult);

              if (processFnResult instanceof Promise) {
                // processFnResult.catch((e) => {
                //   throw 'PLCPLC';
                //   console.log('XXX');
                //   console.log('XCSCXCXC');
                // });
                streamObj = yield processFnResult;
              } else {
                streamObj = processFnResult;
              }
            } catch (e) {
              console.log('SSS');
            }
          }

          streamObjArray[streamObjArrayIdx] = streamObj;

          if (settings.type.match(/.*\.main$/)) {
            this._currentStream.currentActionObj.processed++;
            logActionStatus();
          } // save in cache


          if (this._settings.cache) yield this._saveInCache(actionHash, streamObj);
        }

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
        var _this2 = this;

        var stack = this._currentStream.streamObjArray;

        for (var j = 0; j < stack.length; j++) {
          var currentStreamObj = stack[j];

          if (currentStreamObj.$fromCache) {
            logActionStatus();
            continue;
          }

          if (this._currentStream.settings.beforeActions && this._currentStream.settings.beforeActions[this._currentStream.currentActionObj.name]) {
            currentStreamObj = yield this._applyFnOnStreamObj(currentStreamObj, this._currentStream.settings.beforeActions[this._currentStream.currentActionObj.name], {
              type: "".concat(this._currentStream.currentActionObj.name, ".before")
            });
          } // call the action and pass it the current stream object


          currentStreamObj = yield this._applyFnOnStreamObj(currentStreamObj, function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return new Promise( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator(function* (resolve) {
                var res = yield _this2._currentStream.currentActionObj.instance.run(...args);
                return resolve(res);
              });

              return function (_x4) {
                return _ref.apply(this, arguments);
              };
            }());
          }, {
            type: "".concat(this._currentStream.currentActionObj.name, ".main"),
            processFnArgs: [this._currentStream.currentActionObj.instance.settings],
            resultProcessor: fnResult => {
              if (fnResult instanceof Promise) {
                _SPromise2.default.pipe(fnResult, this._currentStream.promise);

                _SPromise2.default.pipe(fnResult, this);

                this._currentStream.currentActionObj.promise = fnResult;
              }

              return fnResult;
            }
          });

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
          }

          if (this._currentStream.settings.afterActions && this._currentStream.settings.afterActions[this._currentStream.currentActionObj.name]) {
            currentStreamObj = yield this._applyFnOnStreamObj(currentStreamObj, this._currentStream.settings.afterActions[this._currentStream.currentActionObj.name], {
              type: "".concat(this._currentStream.currentActionObj.name, ".after")
            });
          } // replace the streamObj with the new one in the stack


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
      var _saveInCache2 = _asyncToGenerator(function* (hash, streamObj) {
        // save in cache
        if (this._currentStream.currentActionObj.instance && this._currentStream.currentActionObj.instance.settings.cache && this._sCache || this._sCache && !this._currentStream.currentActionObj.instance) {
          yield this._sCache.set(hash, streamObj);
        }

        return true;
      });

      function _saveInCache(_x5, _x6) {
        return _saveInCache2.apply(this, arguments);
      }

      return _saveInCache;
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
      var _this3 = this;

      if (streamObj === void 0) {
        streamObj = {};
      }

      if (settings === void 0) {
        settings = {};
      }

      settings = (0, _deepMerge.default)(Object.assign({}, this._settings), settings);
      var currentStreamObj = streamObj;
      this._currentStream = {
        promise: null,
        streamObjArray: Array.isArray(currentStreamObj) ? currentStreamObj : [currentStreamObj],
        currentActionObj: {
          name: null,
          promise: null,
          instance: null,
          sourcesCount: 0,
          fromCache: 0,
          processed: 0,
          stats: {
            stderr: [],
            stdout: []
          }
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
        var _ref2 = _asyncToGenerator(function* (resolve, reject, trigger, cancel) {
          yield (0, _wait.default)(100); // ugly hack to check when have time...

          try {
            // starting log
            var startString = "#start Starting the stream \"<cyan>".concat(settings.name || 'unnamed', "</cyan>\"");

            _this3.log({
              value: startString
            });

            _this3.trigger('start', {});

            trigger('start', {});
            currentStreamObj = yield _this3._applyFnOnStreamObj(currentStreamObj, _this3._settings.before, {
              type: 'before'
            });

            if (!_this3.hasCurrentStreamErrors()) {
              // take the actions order array
              var actionsOrderedNames = Array.isArray(settings.order) ? settings.order : Object.keys(_this3._actionsObject); // check the order

              actionsOrderedNames.forEach(actionName => {
                if (!_this3._actionsObject[actionName]) {
                  _this3._currentStream.stats.stderr.push((0, _parseHtml.default)("You have specified the action \"<yellow>".concat(actionName, "</yellow>\" in your SActionsStream instance but it is not available. Here's the available actions: <green>").concat(Object.keys(_this3._actionsObject).join(','), "</green>")));
                }
              });

              for (var i = 0; i < actionsOrderedNames.length; i++) {
                if (_this3._currentStream.canceled || _this3.hasCurrentStreamErrors()) {
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

                if (_this3._currentStream.stats.skipNextActions === true) {
                  skipMessage = "#warning Skipping all the next actions after the \"<cyan>".concat(actionsOrderedNames[i - 1], "</cyan>\" one...");
                  skipAction = 'break';
                } else if (Array.isArray(_this3._currentStream.stats.skipNextActions) && _this3._currentStream.stats.skipNextActions.indexOf(actionName) !== -1) {
                  skipMessage = "#warning Skipping the \"<yellow>".concat(actionName, "</yellow>\" action...");
                  skipAction = 'continue';
                } else if (typeof _this3._currentStream.stats.skipNextActions === 'number' && _this3._currentStream.stats.skipNextActions > 0) {
                  _this3._currentStream.stats.skipNextActions--;
                  skipMessage = "#warning Skipping the \"<yellow>".concat(actionName, "</yellow>\" action. Reamaining action(s) to skip: <cyan>").concat(_this3._currentStream.stats.skipNextActions, "</cyan>...");
                  skipAction = 'continue';
                }

                if (skipMessage) {
                  _this3.log({
                    value: skipMessage
                  });

                  if (skipAction === 'continue') continue;else break;
                } // handle passed action that can be either a simple function, a extended SActionsStreamAction class or an instance of the SActionsStreamAction class


                if ((0, _class.default)(_this3._actionsObject[actionName]) && _this3._actionsObject[actionName].prototype instanceof _SActionsStreamAction.default) {
                  actionInstance = new _this3._actionsObject[actionName](actionSettings); // actionInstance.on('catch', (e) => {
                  //   console.log('ERROR');
                  // });
                } else {
                  _this3._currentStream.stats.stderr.push("Your action \"<yellow>".concat(actionName, "</yellow>\" has to be a class extending the <cyan>SActionsStreamAction</cyan> one..."));

                  break;
                }

                _this3._currentStream.currentActionObj = {
                  name: actionName,
                  sourcesCount: _this3._currentStream.streamObjArray.length,
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

                if (_this3._currentStream.currentActionObj.instance) {
                  _this3._currentStream.currentActionObj.instance.on('reject', value => {
                    _this3.trigger("".concat(_this3._currentStream.currentActionObj.name, ".error"), value);

                    trigger("".concat(_this3._currentStream.currentActionObj.name, ".error"), value);
                    cancel(value);
                  });

                  actionSettings = (0, _deepMerge.default)(_this3._currentStream.currentActionObj.instance._settings, actionSettings);
                } // trigger some "start" events


                _this3.trigger("".concat(_this3._currentStream.currentActionObj.name, ".start"), Object.assign({}, _this3._currentStream.currentActionObj));

                trigger("".concat(_this3._currentStream.currentActionObj.name, ".start"), Object.assign({}, _this3._currentStream.currentActionObj));

                var _startString = "#start Starting the action \"<yellow>".concat(_this3._currentStream.currentActionObj.name, "</yellow>\" on <magenta>").concat(_this3._currentStream.currentActionObj.sourcesCount, "</magenta> sources");

                _this3.log({
                  group: _this3._currentStream.currentActionObj.name,
                  value: _startString
                });

                yield _this3._handleStreamObjArray();

                if (_this3.hasCurrentStreamErrors()) {
                  break;
                }

                if (_this3.constructor.interface) {
                  var issuesString = _this3.constructor.interface.apply(_this3._currentStream.streamObjArray[0], {
                    return: 'string',
                    throw: false
                  });

                  if (issuesString !== true) {
                    _this3._currentStream.stats.stderr.push(issuesString);

                    _this3._currentStream.currentActionObj.stats.stderr.push(issuesString);
                  }
                } // complete the actionObj


                _this3._currentStream.currentActionObj.stats = _objectSpread(_objectSpread({}, _this3._currentStream.currentActionObj.stats), {}, {
                  endTime: Date.now(),
                  duration: Date.now() - _this3._currentStream.currentActionObj.stats.startTime
                }); // save the result into the overall actions stats object

                _this3._currentStream.stats.actions[_this3._currentStream.currentActionObj.name] = Object.assign({}, _this3._currentStream.currentActionObj); // trigger an "event"

                _this3.trigger("".concat(_this3._currentStream.currentActionObj.name, ".complete"), Object.assign({}, _this3._currentStream.currentActionObj));

                trigger("".concat(_this3._currentStream.currentActionObj.name, ".complete"), Object.assign({}, _this3._currentStream.currentActionObj));

                if (_this3._currentStream.currentActionObj.stats.stderr.length) {
                  var errorString = "#error <red>Something went wrong during the </red>\"<yellow>".concat(_this3._currentStream.currentActionObj.name, "</yellow>\"<red> action...</red>");

                  _this3._currentStream.currentActionObj.stats.stderr.push(errorString);

                  _this3._currentStream.stats.stderr.push(errorString);

                  break;
                } else {
                  var successString = "#success The action \"<yellow>".concat(_this3._currentStream.currentActionObj.name, "</yellow>\" has finished <green>successfully</green> on <magenta>").concat(_this3._currentStream.currentActionObj.sourcesCount, "</magenta> sources in <yellow>").concat((0, _convert.default)(_this3._currentStream.currentActionObj.stats.duration, 's'), "s</yellow>");

                  _this3._currentStream.currentActionObj.stats.stdout.push(successString);

                  _this3.log({
                    group: _this3._currentStream.currentActionObj.name,
                    value: successString
                  });
                }
              }
            }

            currentStreamObj = yield _this3._applyFnOnStreamObj(currentStreamObj, _this3._settings.after, {
              type: 'after'
            });

            if (_this3.constructor.interface) {
              var _issuesString = _this3.constructor.interface.apply(_this3._currentStream.streamObjArray[0], {
                return: 'string',
                throw: false
              });

              if (_issuesString !== true) {
                _this3._currentStream.stats.stderr.push(_issuesString);
              }
            } // complete the overall stats


            _this3._currentStream.stats = _objectSpread(_objectSpread({}, _this3._currentStream.stats), {}, {
              streamObj: _this3._currentStream.streamObjArray,
              endTime: Date.now(),
              duration: Date.now() - _this3._currentStream.stats.startTime
            });

            if (_this3.hasCurrentStreamErrors() || _this3._currentStream.stats.canceled) {
              var _errorString = "The stream \"<cyan>".concat(settings.name || 'unnamed', "</cyan>\" has had some issues...");

              _this3._currentStream.stats.stdout.push(_errorString);

              _this3.log({
                error: true,
                value: _errorString
              });

              _this3.log({
                error: true,
                value: (0, _trimLines.default)(_this3._currentStream.stats.stderr.join('\n'))
              });

              _this3.trigger('reject', _this3._currentStream.stats);

              trigger('reject', _this3._currentStream.stats);
            } else {
              var completeString = "#success The stream \"<cyan>".concat(_this3._currentStream.settings.name || 'unnamed', "</cyan>\" has finished <green>successfully</green> in <yellow>").concat((0, _convert.default)(_this3._currentStream.stats.duration, 's'), "s</yellow>");

              _this3._currentStream.stats.stdout.push(completeString);

              _this3.log({
                value: completeString
              }); // resolve this stream process


              _this3.trigger('success', {});

              trigger('success', {});
              resolve(_this3._currentStream.stats);
            }
          } catch (e) {
            console.log('PLOP');
          }
        });

        return function (_x7, _x8, _x9, _x10) {
          return _ref2.apply(this, arguments);
        };
      }(), {
        id: this._settings.id
      }); // this._currentStream.promise.catch((e) => {
      //   console.log('CCC');
      // });
      // } catch (e) {
      // if (typeof e === 'object') {
      //   this._currentStream.currentActionObj.stats.stderr.push(__toString(e));
      //   this._currentStream.stats.stderr.push(__toString(e));
      // } else if (typeof e === 'string') {
      //   this._currentStream.currentActionObj.stats.stderr.push(e);
      //   this._currentStream.stats.stderr.push(e);
      // }
      // }

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
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parseHtml = _interopRequireDefault(require("../console/parseHtml"));

var _class = _interopRequireDefault(require("../is/class"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _SPromise2 = _interopRequireDefault(require("../promise/SPromise"));

var _uniqid = _interopRequireDefault(require("../string/uniqid"));

var _convert = _interopRequireDefault(require("../time/convert"));

var _wait = _interopRequireDefault(require("../time/wait"));

var _SActionsStreamAction = _interopRequireDefault(require("./SActionsStreamAction"));

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
   * @name            _currentSPromise
   * @type            SPromise
   * @private
   *
   * Store the current running process SPromise instance
   *
   * @since         2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name            _currentActionName
   * @type            SPromise
   * @private
   *
   * Store the current running action name
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
    var _thisSuper, _this2;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SActionStream);

    // init SPromise
    _this2 = _super.call(this, () => {}, (0, _deepMerge.default)({
      id: (0, _uniqid.default)(),
      name: null,
      order: null,
      before: [],
      after: [],
      beforeActions: {},
      afterActions: {},
      actions: {} // exitOnComplete: __isChildProcess()

    }, settings));

    _defineProperty(_assertThisInitialized(_this2), "_actionsObject", {});

    _defineProperty(_assertThisInitialized(_this2), "_currentSPromise", null);

    _defineProperty(_assertThisInitialized(_this2), "_currentActionName", null);

    _get((_thisSuper = _assertThisInitialized(_this2), _getPrototypeOf(SActionStream.prototype)), "start", _thisSuper).call(_thisSuper); // check that we have a definition object defined
    // if (!this.constructor.definitionObj) {
    //   throw new Error(
    //     `You class "<yellow>${this.constructor.name}</yellow>" has to have a <yellow>static</yellow> <cyan>definitionObj</cyan> property defined...`
    //   );
    // }
    // check the actions


    Object.keys(actions).forEach(actionName => {
      var actionInstance = actions[actionName];

      if (typeof actionInstance === 'function' || (0, _class.default)(actionInstance) && actionInstance.constructor.name === 'SActionsStreamAction' || actionInstance instanceof _SActionsStreamAction.default) {} else {
        throw new Error((0, _parseHtml.default)("The value passed for the \"<yellow>".concat(actionName, "</yellow>\" action has to be either a simple function or an \"<green>SActionsStreamAction</green>\" instance. You have passed a \"<red>").concat(typeof actionInstance, "</red>\"...")));
      }
    }); // save the actions

    _this2._actionsObject = actions; // specify the exit code if the exitOnComplete setting is true

    _this2._exitCode = 0;
    return _this2;
  }
  /**
   * @name          start
   * @type          Function
   * @async
   *
   * This method launch the action stream and return an SPromise instance for this particular stream "process"
   *
   * @param       {Object}          [streamObj={}]           An object that will be passed along all the actions and that can be updated at every steps. Make sure that your current action return what the next one need to work correctly...
   * @param       {Object}          [settings={}]           An object of settings to override the instance level one if wanted
   * @return      {SPromise}                                An SPromise instance for this particular stream "process" on which you can subscribe to the same "events" that on the SActionsStrean instance.
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


  _createClass(SActionStream, [{
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
      var canceled = false,
          hasErrorsOcucred = false,
          currentActionReturn,
          skipNextActions = false;
      this._currentSPromise = new _SPromise2.default( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (resolve, reject, trigger, cancel) {
          if (!Array.isArray(settings.before)) settings.before = [settings.before];
          if (!Array.isArray(settings.after)) settings.after = [settings.after];
          yield (0, _wait.default)(50); // ugly hack to check when have time...
          // starting log

          var startString = "#start Starting the stream \"<cyan>".concat(settings.name || 'unnamed', "</cyan>\"");

          _this3.log(startString);

          _this3.trigger('start', {});

          trigger('start', {}); // check if is a "before" setting function

          if (settings.before && settings.before.length) {
            var startTime = Date.now();

            _this3.log({
              group: 'beforeCallbacks',
              value: "Executing the <cyan>".concat(settings.before.length, "</cyan> callback(s) registered before the entire actions stream process...")
            });

            for (var key in settings.before) {
              var fn = settings.before[key];
              streamObj = yield fn(streamObj);
            }

            _this3.log({
              group: 'beforeCallbacks',
              value: "#success The <cyan>".concat(settings.before.length, "</cyan> before stream callback(s) have finished <green>successfully</green> <yellow>").concat((0, _convert.default)(Date.now() - startTime, 's'), "s</yellow>")
            });
          } // take the actions order array


          var actionsOrderedNames = Array.isArray(settings.order) ? settings.order : Object.keys(_this3._actionsObject); // check the order

          actionsOrderedNames.forEach(actionName => {
            if (!_this3._actionsObject[actionName]) {
              throw new Error((0, _parseHtml.default)("You have specified the action \"<yellow>".concat(actionName, "</yellow>\" in your SActionsStream instance but it is not available. Here's the available actions: <green>").concat(Object.keys(_this3._actionsObject).join(','), "</green>")));
            } // else if (
            //   (this._actionsObject[actionName].constructor &&
            //     this._actionsObject[actionName].constructor.name !==
            //       'SActionsStreamAction') ||
            //   (__isClass(this._actionsObject[actionName]) &&
            //     this._actionsObject[actionName].name !== 'SActionsStreamAction')
            // ) {
            //   throw new Error(
            //     __parseHtml(
            //       `You have specified the action "<yellow>${actionName}</yellow>" in your SActionsStream instance but it seems that your passed value is not either an instance of the <green>SActionsStreamAction</green> class, either a class that extends the <green>SActionsStreamAction</green> one...`
            //     )
            //   );
            // }

          }); // callbacks object

          var callbacksObj = {}; // loop on each actions

          streamObj._isStreamObj = true;
          var currentStreamObjArray = [streamObj];
          var overallActionsStats = {
            start: Date.now(),
            stderr: [],
            stdout: [],
            actions: {}
          };

          var _loop2 = function* _loop2(i) {
            if (canceled || hasErrorsOcucred) return "break";
            var actionName = actionsOrderedNames[i];
            _this3._currentActionName = actionName;
            var actionInstance = void 0;
            var actionSettings = settings.actions ? settings.actions[actionName] || {} : {}; // make sure we have a "name" property in the actionSettings object

            if (!actionSettings.name) {
              actionSettings.name = actionName;
            }

            var skipMessage = null,
                skipAction = 'break';

            if (skipNextActions === true) {
              skipMessage = "#warning Skipping all the next actions after the \"<cyan>".concat(actionsOrderedNames[i - 1], "</cyan>\"...");
              skipAction = 'break';
            } else if (Array.isArray(skipNextActions) && skipNextActions.indexOf(actionName) !== -1) {
              skipMessage = "#warning Skipping the \"<yellow>".concat(actionName, "</yellow>\" action...");
              skipAction = 'continue';
            } else if (typeof skipNextActions === 'number' && skipNextActions > 0) {
              skipNextActions--;
              skipMessage = "#warning Skipping the \"<yellow>".concat(actionName, "</yellow>\" action. Reamaining action(s) to skip: <cyan>").concat(skipNextActions, "</cyan>...");
              skipAction = 'continue';
            }

            if (skipMessage) {
              _this3.log({
                value: skipMessage
              });

              if (skipAction === 'continue') return "continue";else return "break";
            } // handle passed action that can be either a simple function, a extended SActionsStreamAction class or an instance of the SActionsStreamAction class


            var actionFn = void 0;
            var actionOnce = false;

            if (!(0, _class.default)(_this3._actionsObject[actionName]) && typeof _this3._actionsObject[actionName] === 'function') {
              actionFn = _this3._actionsObject[actionName];
            } else if (!(0, _class.default)(_this3._actionsObject[actionName]) && _this3._actionsObject[actionName] instanceof _SActionsStreamAction.default) {
              actionInstance = _this3._actionsObject[actionName];
              actionOnce = actionInstance.constructor.once;
              actionFn = _this3._actionsObject[actionName].run.bind(_this3._actionsObject[actionName]);
            } else if ((0, _class.default)(_this3._actionsObject[actionName]) && _this3._actionsObject[actionName].prototype instanceof _SActionsStreamAction.default) {
              actionInstance = new _this3._actionsObject[actionName](actionSettings);
              actionOnce = _this3._actionsObject[actionName].once;
              actionFn = actionInstance.run.bind(actionInstance);
            }

            if (actionInstance) {
              actionInstance.on('log', value => {
                _this3.log({
                  group: _this3._currentActionName,
                  value: value
                });
              });
              actionInstance.on('error', value => {
                _this3.log({
                  error: true,
                  group: _this3._currentActionName,
                  value: value
                });
              });
              actionInstance.on('reject', value => {
                _this3._exitCode = 1;

                _this3.trigger("".concat(_this3._currentActionName, ".reject"), value);

                trigger("".concat(_this3._currentActionName, ".reject"), value);
                cancel(value);
              });
              actionSettings = (0, _deepMerge.default)(actionInstance._settings, actionSettings);
            }

            var actionObj = {
              action: actionName,
              start: Date.now(),
              stderr: [],
              stdout: [],
              streamObjArray: currentStreamObjArray
            };
            var errorObj = null;
            var streamSourcesCount = 0;

            function countSources(source) {
              if (Array.isArray(source)) {
                source.forEach(s => {
                  countSources(s);
                });
                return;
              }

              if (typeof source === 'object' && source._isStreamObj) streamSourcesCount++;
            }

            countSources(currentStreamObjArray); // trigger some "start" events

            _this3.trigger("".concat(_this3._currentActionName, ".start"), Object.assign({}, actionObj));

            trigger("".concat(_this3._currentActionName, ".start"), Object.assign({}, actionObj));
            var startString = "#start Starting the action \"<yellow>".concat(actionName, "</yellow>\" on <magenta>").concat(streamSourcesCount, "</magenta> sources");

            _this3.log({
              group: actionName,
              value: startString
            });

            var _this = _this3;

            var handleStreamObjArray = /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator(function* (streamObjArray, actionObj) {
                if (actionOnce) {
                  streamObjArray = [streamObjArray[0]];
                }

                var _loop3 = function* _loop3(j) {
                  var currentStreamObj = streamObjArray[j];

                  if (Array.isArray(currentStreamObj)) {
                    return {
                      v: yield handleStreamObjArray(currentStreamObj, actionObj)
                    };
                  } else {
                    currentStreamObj._isStreamObj = true;
                  } // check if is a "afterActions" setting function


                  if (!settings.beforeActions[actionName]) settings.beforeActions[actionName] = [];else if (!Array.isArray(settings.beforeActions[actionName])) {
                    settings.beforeActions[actionName] = [settings.beforeActions[actionName]];
                  }

                  if (settings.beforeActions[actionName]) {
                    _this3.log({
                      group: actionName,
                      value: "Executing the <cyan>".concat(settings.beforeActions[actionName].length, "</cyan> callback(s) registered after the <yellow>").concat(actionName, "</yellow> action...")
                    });

                    if (Array.isArray(currentStreamObj)) {
                      currentStreamObj.forEach( /*#__PURE__*/function () {
                        var _ref3 = _asyncToGenerator(function* (strObj, i) {
                          var actionsArray = _this3._settings.beforeActions[actionName];
                          if (!Array.isArray(actionsArray)) actionsArray = [actionsArray];

                          for (var _i = 0; _i < actionsArray.length; _i++) {
                            var _fn2 = actionsArray[_i];

                            try {
                              var fnResult = _fn2(currentStreamObj[_i], Object.assign({}, actionObj));

                              currentStreamObj[_i] = yield fnResult;
                            } catch (e) {
                              var msg = "Something when wrong during the execution of the <yellow>beforeActions.".concat(actionName, "</yellow> function...");

                              _this3.log({
                                error: e,
                                value: msg
                              });

                              overallActionsStats.stderr.push(msg);
                              hasErrorsOcucred = true;
                            }
                          }
                        });

                        return function (_x7, _x8) {
                          return _ref3.apply(this, arguments);
                        };
                      }());
                    } else {
                      var actionsArray = _this3._settings.beforeActions[actionName];
                      if (!Array.isArray(actionsArray)) actionsArray = [actionsArray];

                      for (var _i2 = 0; _i2 < actionsArray.length; _i2++) {
                        var _fn3 = actionsArray[_i2];

                        try {
                          var fnResult = _fn3(currentStreamObj, Object.assign({}, actionObj));

                          currentStreamObj = yield fnResult;
                        } catch (e) {
                          var msg = "Something when wrong during the execution of the <yellow>beforeActions.".concat(actionName, "</yellow> function...");

                          _this3.log({
                            error: e,
                            value: msg
                          });

                          overallActionsStats.stderr.push(msg);
                          hasErrorsOcucred = true;
                        }
                      }
                    }
                  } // call the action and pass it the current stream object


                  try {
                    currentActionReturn = actionFn(currentStreamObj, actionSettings);

                    _SPromise2.default.pipe(currentActionReturn, _this3._currentSPromise);

                    if (currentActionReturn instanceof Promise) {
                      currentStreamObj = yield currentActionReturn;
                    } else currentStreamObj = currentActionReturn;

                    currentActionReturn = null;
                  } catch (e) {
                    hasErrorsOcucred = true;
                    throw e; // if (typeof e === 'object') {
                    //   actionObj.stderr.push(`<red>${e.name}</red>: ${e.message}`);
                    //   overallActionsStats.stderr.push(
                    //     `<red>${e.name}</red>: ${e.message}`
                    //   );
                    // } else if (typeof e === 'string') {
                    //   actionObj.stderr.push(e);
                    //   overallActionsStats.stderr.push(e);
                    // }
                  }

                  if (actionInstance && actionInstance._skipNextActions) {
                    skipNextActions = actionInstance._skipNextActions;
                  } // check if an "afterCallback" callback has been passed in the streamObj


                  if (actionInstance && actionInstance._registeredCallbacks.length) {
                    actionInstance._registeredCallbacks.forEach(callbackObj => {
                      if (!callbackObj.action) {
                        if (callbackObj.when === 'after') {
                          settings.after = [...settings.after, callbackObj.callback];
                        } else {
                          settings.before = [...settings.before, callbackObj.callback];
                        }
                      } else {
                        if (callbackObj.when === 'before') {
                          if (!settings.beforeActions[callbackObj.action]) settings.beforeActions[callbackObj.action] = [];else if (!Array.isArray(settings.beforeActions[callbackObj.action])) settings.beforeActions[callbackObj.action] = [settings.beforeActions[callbackObj.action]];
                          settings.beforeActions[callbackObj.action].push(callbackObj.callback);
                        } else {
                          if (!settings.afterActions[callbackObj.action]) settings.afterActions[callbackObj.action] = [];else if (!Array.isArray(settings.afterActions[callbackObj.action])) settings.afterActions[callbackObj.action] = [settings.afterActions[callbackObj.action]];
                          settings.afterActions[callbackObj.action].push(callbackObj.callback);
                        }
                      }
                    });
                  } // check if is a "afterActions" setting function


                  if (!settings.afterActions[actionName]) settings.afterActions[actionName] = [];else if (!Array.isArray(settings.afterActions[actionName])) {
                    settings.afterActions[actionName] = [settings.afterActions[actionName]];
                  }

                  if (settings.afterActions[actionName]) {
                    _this3.log({
                      group: actionName,
                      value: "Executing the <cyan>".concat(settings.afterActions[actionName].length, "</cyan> callback(s) registered after the <yellow>").concat(actionName, "</yellow> action...")
                    });

                    if (Array.isArray(currentStreamObj)) {
                      currentStreamObj.forEach( /*#__PURE__*/function () {
                        var _ref4 = _asyncToGenerator(function* (strObj, i) {
                          var actionsArray = _this3._settings.afterActions[actionName];
                          if (!Array.isArray(actionsArray)) actionsArray = [actionsArray];

                          for (var _i3 = 0; _i3 < actionsArray.length; _i3++) {
                            var _fn4 = actionsArray[_i3];

                            try {
                              var _fnResult = _fn4(currentStreamObj[_i3], Object.assign({}, actionObj));

                              currentStreamObj[_i3] = yield _fnResult;
                            } catch (e) {
                              var _msg = "Something when wrong during the execution of the <yellow>afterActions.".concat(actionName, "</yellow> function...");

                              _this3.log({
                                error: e,
                                value: _msg
                              });

                              overallActionsStats.stderr.push(_msg);
                              hasErrorsOcucred = true;
                            }
                          }
                        });

                        return function (_x9, _x10) {
                          return _ref4.apply(this, arguments);
                        };
                      }());
                    } else {
                      var _actionsArray = _this3._settings.afterActions[actionName];
                      if (!Array.isArray(_actionsArray)) _actionsArray = [_actionsArray];

                      for (var _i4 = 0; _i4 < _actionsArray.length; _i4++) {
                        var _fn5 = _actionsArray[_i4];

                        try {
                          var _fnResult2 = _fn5(currentStreamObj, Object.assign({}, actionObj));

                          currentStreamObj = yield _fnResult2;
                        } catch (e) {
                          var _msg2 = "Something when wrong during the execution of the <yellow>afterActions.".concat(actionName, "</yellow> function...");

                          _this3.log({
                            error: e,
                            value: _msg2
                          });

                          overallActionsStats.stderr.push(_msg2);
                          hasErrorsOcucred = true;
                        }
                      }
                    }
                  } // replace the streamObj with the new one in the stack


                  streamObjArray[j] = currentStreamObj;
                  if (canceled || hasErrorsOcucred) return {
                    v: streamObjArray
                  };
                };

                for (var j = 0; j < streamObjArray.length; j++) {
                  var _ret2 = yield* _loop3(j);

                  if (typeof _ret2 === "object") return _ret2.v;
                }

                return streamObjArray;
              });

              return function handleStreamObjArray(_x5, _x6) {
                return _ref2.apply(this, arguments);
              };
            }();

            var newCurrentStreamObjArray = yield handleStreamObjArray(currentStreamObjArray, actionObj); // complete the actionObj

            actionObj = _objectSpread(_objectSpread({}, actionObj), {}, {
              end: Date.now(),
              duration: Date.now() - actionObj.start,
              streamObjArray: newCurrentStreamObjArray
            });
            currentStreamObjArray = newCurrentStreamObjArray; // save the result into the overall actions stats object

            overallActionsStats.actions[actionName] = Object.assign({}, actionObj); // trigger an "event"

            _this3.trigger("".concat(_this3._currentActionName, ".complete"), Object.assign({}, actionObj));

            trigger("".concat(_this3._currentActionName, ".complete"), Object.assign({}, actionObj));

            if (actionObj.stderr.length) {
              var _errorString = "[".concat(actionName, "] #error <red>Something went wrong during the </red>\"<yellow>").concat(actionName, "</yellow>\"<red> action...</red>");

              actionObj.stderr.unshift(_errorString);
              _this3._exitCode = 1;
              throw new Error(_errorString);
            } else {
              var successString = "#success The action \"<yellow>".concat(actionName, "</yellow>\" has finished <green>successfully</green> on <magenta>").concat(streamSourcesCount, "</magenta> sources in <yellow>").concat((0, _convert.default)(actionObj.duration, 's'), "s</yellow>");
              actionObj.stdout.push(successString);

              _this3.log({
                group: actionName,
                value: successString
              });
            }
          };

          _loop: for (var i = 0; i < actionsOrderedNames.length; i++) {
            var _ret = yield* _loop2(i);

            switch (_ret) {
              case "break":
                break _loop;

              case "continue":
                continue;
            }
          } // reset the actionName


          _this3._currentActionName = null; // get the lastest stream object as streamObj

          streamObj = currentStreamObjArray[currentStreamObjArray.length - 1];

          if (settings.after && settings.after.length) {
            var _startTime = Date.now();

            _this3.log({
              group: 'afterCallbacks',
              value: "Executing the <cyan>".concat(settings.after.length, "</cyan> callback(s) registered after the entire actions stream process...")
            });

            for (var _key in settings.after) {
              var _fn = settings.after[_key];
              streamObj = yield _fn(streamObj);
            }

            _this3.log({
              group: 'afterCallbacks',
              value: "#success The <cyan>".concat(settings.after.length, "</cyan> after stream callback(s) have finished <green>successfully</green> <yellow>").concat((0, _convert.default)(Date.now() - _startTime, 's'), "s</yellow>")
            });
          } // complete the overall stats


          overallActionsStats = _objectSpread(_objectSpread({}, overallActionsStats), {}, {
            streamObjArray: currentStreamObjArray,
            streamObj,
            end: Date.now(),
            duration: Date.now() - overallActionsStats.start
          });

          if (overallActionsStats.stderr.length || canceled || hasErrorsOcucred) {
            var errorString = "The stream \"<cyan>".concat(settings.name || 'unnamed', "</cyan>\" has had some issues...");
            overallActionsStats.stdout.push(errorString);

            _this3.log({
              error: true,
              value: errorString
            });

            _this3.log({
              error: true,
              value: overallActionsStats.stderr.join('\n')
            });

            _this3.trigger('reject', overallActionsStats);

            trigger('reject', overallActionsStats);
          } else {
            var completeString = "#success The stream \"<cyan>".concat(settings.name || 'unnamed', "</cyan>\" has finished <green>successfully</green> in <yellow>").concat((0, _convert.default)(overallActionsStats.duration, 's'), "s</yellow>");
            overallActionsStats.stdout.push(completeString);

            _this3.log({
              value: completeString
            }); // resolve this stream process


            _this3.trigger('complete', overallActionsStats);

            trigger('complete', overallActionsStats);
            resolve(overallActionsStats);
          }
        });

        return function (_x, _x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }(), {
        id: this._settings.id
      }).start();
      return this._currentSPromise;
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
      for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
        args[_key2] = arguments[_key2];
      }

      args.forEach(arg => {
        if (this._currentSPromise) this._currentSPromise.trigger('log', arg);
        this.trigger('log', arg);
      });
    }
  }]);

  return SActionStream;
}(_SPromise2.default);

exports.default = SActionStream;
module.exports = exports.default;
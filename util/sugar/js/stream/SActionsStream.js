"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SPromise2 = _interopRequireDefault(require("../promise/SPromise"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _convert = _interopRequireDefault(require("../time/convert"));

var _SActionsStreamAction = _interopRequireDefault(require("./SActionsStreamAction"));

var _class = _interopRequireDefault(require("../is/class"));

var _validateDefinitionObject = _interopRequireDefault(require("../cli/validateDefinitionObject"));

var _childProcess = _interopRequireDefault(require("../is/childProcess"));

var _testEnv = _interopRequireDefault(require("../is/testEnv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * - start: Triggered when an action starts
 * - {actionName}.start: Triggered when the specified action starts
 * - step: Triggered when an action is just finished
 * - {actionName}.step: Triggered when the specified action is just finished
 * - error: Triggered when something wrong has happened in any action
 * - {actionName}.error: Triggered when something wrong has happened in the specified action
 * - complete: Triggered when the stream has been completed successfully
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
let SActionStream = /*#__PURE__*/function (_SPromise) {
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
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SActionStream(actions, settings = {}) {
    var _thisSuper, _this2;

    _classCallCheck(this, SActionStream);

    // init SPromise
    _this2 = _super.call(this, () => {}, (0, _deepMerge.default)({
      name: null,
      order: null,
      before: null,
      after: null,
      beforeActions: {},
      afterActions: {},
      actions: {}
    }, settings));

    _defineProperty(_assertThisInitialized(_this2), "_actionsObject", {});

    _get((_thisSuper = _assertThisInitialized(_this2), _getPrototypeOf(SActionStream.prototype)), "start", _thisSuper).call(_thisSuper); // check the actions


    Object.keys(actions).forEach(actionName => {
      const actionInstance = actions[actionName];

      if (typeof actionInstance === 'function' || actionInstance === _SActionsStreamAction.default || actionInstance instanceof _SActionsStreamAction.default) {} else {
        throw new Error(`The value passed for the "${actionName}" action has to be either a simple function or an "SActionsStreamAction" instance. You have passed a "${typeof actionInstance}"...`);
      }
    }); // save the actions

    _this2._actionsObject = actions;
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
    value: function start(streamObj = {}, settings = {}) {
      settings = (0, _deepMerge.default)(Object.assign({}, this._settings), settings);
      let canceled = false,
          currentActionReturn; // check if is a "before" setting function

      if (settings.before && typeof settings.before === 'function') {
        streamObj = settings.before(streamObj);
      }

      return new _SPromise2.default(async (resolve, reject, trigger, cancel) => {
        // starting log
        const startString = `<h1>Starting the stream "<cyan>${settings.name || 'unnamed'}</cyan>"</h1>`;
        const startObj = {
          value: startString
        };
        trigger('stdout.data', startObj);
        this.trigger('stdout.data', startObj); // take the actions order array

        const actionsOrderedNames = Array.isArray(settings.order) ? settings.order : Object.keys(this._actionsObject); // check the order

        actionsOrderedNames.forEach(actionName => {
          if (!this._actionsObject[actionName]) throw new Error(`You have specified the action "${actionName}" in your SActionsStream instance but it is not available. Here's the available actions: ${Object.keys(this._actionsObject).join(',')}`);
        }); // loop on each actions

        streamObj._isStreamObj = true;
        let currentStreamObjArray = [streamObj];
        let overallActionsStats = {
          start: Date.now(),
          actions: {}
        };

        for (let i = 0; i < actionsOrderedNames.length; i++) {
          if (canceled) break;
          const actionName = actionsOrderedNames[i];
          let actionInstance;
          let actionSettings = settings.actions ? settings.actions[actionName] || {} : {}; // handle passed action that can be either a simple function, a extended SActionsStreamAction class or an instance of the SActionsStreamAction class

          let actionFn;
          let actionOnce = false;

          if (!(0, _class.default)(this._actionsObject[actionName]) && typeof this._actionsObject[actionName] === 'function') {
            actionFn = this._actionsObject[actionName];
          } else if (!(0, _class.default)(this._actionsObject[actionName]) && this._actionsObject[actionName] instanceof _SActionsStreamAction.default) {
            actionInstance = this._actionsObject[actionName];
            actionOnce = actionInstance.constructor.once;
            actionFn = this._actionsObject[actionName].run.bind(this._actionsObject[actionName]);
          } else if ((0, _class.default)(this._actionsObject[actionName]) && this._actionsObject[actionName].prototype instanceof _SActionsStreamAction.default) {
            actionInstance = new this._actionsObject[actionName](actionSettings);
            actionOnce = this._actionsObject[actionName].once;
            actionFn = actionInstance.run.bind(actionInstance);
          }

          if (actionInstance) {
            actionInstance.on('stdout.data', value => {
              const dataObj = { ...actionObj,
                value: value
              };
              trigger('stdout.data', dataObj);
              this.trigger('stdout.data', dataObj);
              trigger(`${actionName}.stdout.data`, dataObj);
              this.trigger(`${actionName}.stdout.data`, dataObj);
            });
            actionInstance.on('stderr.data', value => {
              const dataObj = { ...actionObj,
                value: value
              };
              trigger('stderr.data', {
                dataObj
              });
              this.trigger('stderr.data', {
                dataObj
              });
              trigger(`${actionName}.stderr.data`, {
                dataObj
              });
              this.trigger(`${actionName}.stderr.data`, {
                dataObj
              });
            });
            actionInstance.on('reject', value => {
              const dataObj = { ...actionObj,
                value: value
              };
              trigger('reject', dataObj);
              this.trigger('reject', dataObj);
              trigger(`${actionName}.reject`, dataObj);
              this.trigger(`${actionName}.reject`, dataObj);
              cancel(dataObj);
            });
          }

          let actionObj = {
            action: actionName,
            start: Date.now(),
            streamObjArray: currentStreamObjArray
          };
          let error = null;
          let streamSourcesCount = 0;

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

          trigger(`start`, Object.assign({}, actionObj));
          this.trigger(`start`, Object.assign({}, actionObj));
          trigger(`${actionName}.start`, Object.assign({}, actionObj));
          this.trigger(`${actionName}.start`, Object.assign({}, actionObj));
          const startString = `Starting the action "<yellow>${actionName}</yellow>" on <magenta>${streamSourcesCount}</magenta> sources`;
          const dataObj = { ...actionObj,
            value: startString
          };
          trigger('stdout.data', dataObj);
          this.trigger('stdout.data', dataObj);
          trigger(`${actionName}.stdout.data`, dataObj);
          this.trigger(`${actionName}.stdout.data`, dataObj);

          const _this = this;

          async function handleStreamObjArray(streamObjArray, actionObj) {
            if (actionOnce) {
              streamObjArray = [streamObjArray[0]];
            }

            for (let j = 0; j < streamObjArray.length; j++) {
              let currentStreamObj = streamObjArray[j];

              if (Array.isArray(currentStreamObj)) {
                return await handleStreamObjArray(currentStreamObj, actionObj);
              } else {
                currentStreamObj._isStreamObj = true;
              } // check if is a "beforeActions" setting function


              if (settings.beforeActions[actionName] && typeof settings.beforeActions[actionName] === 'function') {
                const beforeActionResultObj = settings.beforeActions[actionName](currentStreamObj, Object.assign({}, actionObj));

                if (beforeActionResultObj && beforeActionResultObj.settings) {
                  actionSettings = beforeActionResultObj.settings;
                }

                if (beforeActionResultObj && beforeActionResultObj.streamObj) {
                  currentStreamObj = beforeActionResultObj.streamObj;
                } else {
                  currentStreamObj = beforeActionResultObj;
                }
              } // call the action and pass it the current stream object


              try {
                currentActionReturn = actionFn(currentStreamObj, actionSettings);
                if (currentActionReturn instanceof Promise) currentStreamObj = await currentActionReturn;else currentStreamObj = currentActionReturn;
                currentActionReturn = null;
              } catch (e) {
                // trigger an "event"
                const errorObj = { ...actionObj,
                  value: e && e.message ? e.message : e,
                  error: e
                };
                trigger('stderr.data', errorObj);
                trigger(`${actionName}.stderr.data`, errorObj);

                _this.trigger('stderr.data', errorObj);

                _this.trigger(`${actionName}.stderr.data`, errorObj);

                cancel(errorObj);
              } // check if is a "afterActions" setting function


              if (settings.afterActions[actionName] && typeof settings.afterActions[actionName] === 'function') {
                if (Array.isArray(currentStreamObj)) {
                  currentStreamObj.forEach((strObj, i) => {
                    currentStreamObj[i] = settings.afterActions[actionName](currentStreamObj[i], Object.assign({}, actionObj));
                  });
                } else {
                  currentStreamObj = settings.afterActions[actionName](currentStreamObj, Object.assign({}, actionObj));
                }
              } // replace the streamObj with the new one in the stack


              streamObjArray[j] = currentStreamObj;
              if (canceled) return;
            }

            return streamObjArray;
          }

          const newCurrentStreamObjArray = await handleStreamObjArray(currentStreamObjArray, actionObj); // complete the actionObj

          actionObj = { ...actionObj,
            end: Date.now(),
            duration: Date.now() - actionObj.start,
            streamObjArray: newCurrentStreamObjArray
          };
          currentStreamObjArray = newCurrentStreamObjArray;
          if (error) actionObj.error = error; // save the result into the overall actions stats object

          overallActionsStats.actions[actionName] = Object.assign({}, actionObj); // trigger an "event"

          trigger('step', Object.assign({}, actionObj));
          trigger(`${actionName}.step`, Object.assign({}, actionObj));
          this.trigger('step', Object.assign({}, actionObj));
          this.trigger(`${actionName}.step`, Object.assign({}, actionObj));

          if (error) {
            const errorString = `Something went wrong during the "<yellow>${actionName}</yellow>" action...`;
            const dataObj = { ...actionObj,
              value: errorString
            };
            trigger('stderr.data', dataObj);
            this.trigger('stderr.data', dataObj);
            trigger(`${actionName}.stderr.data`, dataObj);
            this.trigger(`${actionName}.stderr.data`, dataObj);
          } else {
            const successString = `The action "<yellow>${actionName}</yellow>" has finished <green>successfully</green> on <magenta>${streamSourcesCount}</magenta> sources in <yellow>${(0, _convert.default)(actionObj.duration, 's')}s</yellow>`;
            const dataObj = { ...actionObj,
              value: successString
            };
            trigger('stdout.data', dataObj);
            this.trigger('stdout.data', dataObj);
            trigger(`${actionName}.stdout.data`, dataObj);
            this.trigger(`${actionName}.stdout.data`, dataObj);
          }
        } // complete the overall stats


        overallActionsStats = { ...overallActionsStats,
          streamObjArray: currentStreamObjArray,
          end: Date.now(),
          duration: Date.now() - overallActionsStats.start
        };
        if (canceled) return;
        const completeString = `<pSuccess>The stream "<cyan>${settings.name || 'unnamed'}</cyan>" has finished <green>successfully</green> in <yellow>${(0, _convert.default)(overallActionsStats.duration, 's')}s</yellow></pSuccess>`;
        const successObj = { ...overallActionsStats,
          value: completeString
        };
        trigger('stdout.data', successObj);
        this.trigger('stdout.data', successObj); // resolve this stream process

        const completeObj = { ...overallActionsStats
        };
        trigger('complete', completeObj);
        this.trigger('complete', completeObj);
        resolve(completeObj);
        if (!(0, _testEnv.default)() && (0, _childProcess.default)()) process.exit();
      }).on('cancel', () => {
        canceled = true; // check if the current action returned value is a promise cancelable

        if (currentActionReturn instanceof Promise && typeof currentActionReturn.cancel === 'function') {
          currentActionReturn.cancel();
        } // trigger some cancel events


        this.trigger('cancel'); // exit process (has to be rethink)

        if ((0, _childProcess.default)()) process.exit();
      }).start();
    }
  }]);

  return SActionStream;
}(_SPromise2.default);

exports.default = SActionStream;
module.exports = exports.default;
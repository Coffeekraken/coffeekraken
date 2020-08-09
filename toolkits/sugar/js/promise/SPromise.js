"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _minimatch = _interopRequireDefault(require("minimatch"));

var _wait = _interopRequireDefault(require("../time/wait"));

var _uniqid = _interopRequireDefault(require("../string/uniqid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                  SPromise
 * @namespace           js.promise
 * @type                  Class
 *
 * This class works the same as the default Promise one. The difference is that you have more control on this one like
 * the possibility to resolve it multiple times. Here's a list of the "differences" and the "features" that this class provide:
 *
 * - Pass the normal "resolve" and "reject" function to the passed executor
 * - Pass a new function to the passed executor called "trigger" that let you launch your registered callbacks like "then", "catch", etc... but without resolving the master promise. Here's some examples:
 *    - new SPromise((resolve, reject, trigger, cancel) => { trigger('then', 'myCoolValue'); }).then(value => { ... });
 *    - new SPromise((resolve, reject, trigger, cancel) => { trigger('then,catch', 'myCoolValue') }).then(value => { ... });
 * - Pass a new function to the passed executor called "cancel" that let you stop/cancel the promise execution without triggering your registered callbacks unless the "cancel" once...
 * - Expose the normal "then" and "catch" methods to register your callbacks
 * - Expose some new callbacks registration functions described here:
 *    - Expose a method called "resolved" that let you register callbacks called only when the "resolve" function has been called
 *    - Expose a method called "rejected" that let you register callbacks called only when the "reject" function has been called
 *    - Expose a method called "finally" that let you register callbacks called when the "resolve" or "reject" function has been called
 *    - Expose a method called "canceled" that let you register callbacks called only when the "cancel" function has been called
 * - Every callbacks registration methods accept as first argument the number of time that your callback will be called at max. Here's some examples:
 *    - new SPromise((...)).then(value => { // do something... }).catch(error => { // do something... }).start();
 *    - new SPromise((...)).then(1, value => { // do something... }).catch(3, error => { // do something... }).start();
 * - Expose a method called "on" that can be used to register callbacks the same as the "then", "catch", etc... methods but you can register a same callback function to multiple callbacks type at once:
 *    - new SPromise((...)).on('then', value => { ... }).on('then,catch', value => { ... }).start();
 *    - Specify the max number of time to call your callback function like so: new SPromise((...)).on('then{2}', value => { ... }).on('then{1},catch', value => { ... }).start();
 * - A new method called "start" is exposed. This method is useful when you absolutely need that your executor function is launched right after the callbacks registrations.
 *    - If you don't call the "start" method, the executor function passed to the SPromise constructor will be called on the next javascript execution loop
 * - Support the Promises chaining through the callbacks like to:
 *    ```js
 *      const result = await new SPromise((resolve, reject, trigger, cancel) => {
 *        resolve('hello');
 *      }).then(value => {
 *        return new Promise((resolve) => {
 *          setTimeout(() => {
 *            resolve(value + 'World');
 *          }, 1000);
 *        });
 *      }).then(value => {
 *        return value + 'Promise';
 *      }).start();
 *      console.log(result); // => helloWorldPromise
 *    ```
 *
 * @example         js
 * import SPromise from '@coffeekraken/sugar/js/promise/SPromise';
 * function myCoolFunction() {
 *    return new SPromise((resolve, reject, trigger, cancel) => {
 *        // do something...
 *        setInterval(() => {
 *            // resolve the promise
 *            resolve('something'); *
 *        }, 1000);
 *    });
 * }
 *
 * // calling the function and get back the SPromise instance
 * myCoolFunction().then(value => {
 *    // do something here...
 * }).then(1, value => {
 *    // do something just once...
 * }).catch(error => {
 *    // do something with the returned reason of failure...
 * }).start();
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
var SPromise = /*#__PURE__*/function (_Promise) {
  _inherits(SPromise, _Promise);

  var _super = _createSuper(SPromise);

  _createClass(SPromise, null, [{
    key: "pipe",

    /**
     * @name                   _masterPromiseResolveFn
     * @type                    Promise
     * @private
     *
     * Store the master promise resolve function
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                   _masterPromiseRejectFn
     * @type                    Promise
     * @private
     *
     * Store the master promise reject function
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  _executorFn
     * @type                  Function
     *
     * Store the executor function passed to the constructor
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  _isExecutorStarted
     * @type                  Boolean
     *
     * Store the status of the executor function. true if it has been executed, false if not...
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  _settings
     * @type                  Object
     * @private
     *
     * Store the settings of this SPromise instance. Here's the available settings:
     * - stacks (null) {Array|String}: An array or comma separated string of additional stacks you want for this instance
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  _state
     * @type                  String
     * @private
     *
     * Store the promise status. Can be:
     * - pending: When the promise is waiting for resolution or rejection
     * - resolved: When the promise has been resolved
     * - rejected: When the promise has been rejected
     * - canceled: When the promise has been canceled
     * - destroyed: When the promise has been destroyed
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  _stacks
     * @type                  Object
     * @private
     *
     * Store the stacks callbacks
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name                  pipe
     * @type                  Function
     * @static
     *
     * This static function allows you to redirect some SPromise "events" to another SPromise instance
     * with the ability to process the linked value before triggering it on the destination SPromise.
     *
     * @param         {SPromise}      sourceSPromise        The source SPromise instance on which to listen for "events"
     * @param         {SPromise}      destSPromise          The destination SPromise instance on which to trigger the listened "events"
     * @param         {Object}        [settings={}]         An object of settings to configure your pipe process
     * - stacks (*) {String}: Specify which stacks you want to pipe. By default it's all using the "*" character
     * - processor (null) {Function}: Specify a function to apply on the triggered value before triggering it on the dest SPromise. Take as arguments the value itself and the stack name. Need to return a new value
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    value: function pipe(sourceSPromise, destSPromise, settings) {
      if (settings === void 0) {
        settings = {};
      }

      // settings
      settings = (0, _deepMerge.default)({
        stacks: '*',
        processor: null
      }, settings);
      if (!(sourceSPromise instanceof SPromise) || !(destSPromise instanceof SPromise)) return; // listen for all on the source promise

      sourceSPromise.on(settings.stacks, (value, metas) => {
        // check if need to process the value
        if (settings.processor) value = settings.processor(value, metas); // trigger on the destination promise

        destSPromise.trigger(metas.stack, value, _objectSpread(_objectSpread({}, metas), {}, {
          level: metas.level + 1
        }));
      });
    }
    /**
     * @name                  log
     * @type                  Function
     * @static
     *
     * This static function allows you to log automatically the triggered log and error
     * events. You can specify the stacks you want to log using the ```stacks``` property in the settings object
     *
     * @param         {SPromise}      promise             The promise you want to listen for stdout and stderr events
     * @param         {Object}        [settings={}]         An object of settings to configure your log process
     * - stacks ('log,error') {String}: Specify which stacks you want to log.
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "log",
    value: function log(sourceSPromise, settings) {
      if (settings === void 0) {
        settings = {};
      }

      // settings
      settings = (0, _deepMerge.default)({
        filter: null,
        stacks: 'log,error'
      }, settings);
      if (!(sourceSPromise instanceof SPromise)) return; // listen for all on the source promise

      sourceSPromise.on(settings.stacks, (value, metas) => {
        if (settings.filter && !settings.filter(value, metas)) return;
        var msg = value.value ? value.value : value;
        console.log(msg);
      });
    }
    /**
     * @name                  constructor
     * @type                  Function
     *
     * Constructor
     *
     * @param         {Function}          executor          The executor function that will receive the resolve and reject ones...
     * @param         {Object}            [settings={}]     An object of settings for this particular SPromise instance. Here's the available settings:
     * - safeReject (true) {Boolean}: Specify if you prefere that your promise is "resolved" with an "Error" instance when rejected, or if you prefere the normal throw that does not resolve your promise and block the "await" statusment...
     * - cancelDefaultReturn (null) {Mixed}: Specify what you want to return by default if you cancel your promise without any value
     *
     * @example       js
     * const promise = new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     * }).then(value => {
     *    // do something...
     * }).finally(value => {
     *    // do something...
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }]);

  function SPromise(executorFn, settings) {
    var _temp, _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SPromise);

    var _resolve, _reject;

    var promise = (_temp = _this = _super.call(this, (resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    }), _defineProperty(_assertThisInitialized(_this), "_masterPromiseResolveFn", null), _defineProperty(_assertThisInitialized(_this), "_masterPromiseRejectFn", null), _defineProperty(_assertThisInitialized(_this), "_executorFn", null), _defineProperty(_assertThisInitialized(_this), "_isExecutorStarted", null), _defineProperty(_assertThisInitialized(_this), "_settings", {}), _defineProperty(_assertThisInitialized(_this), "_state", 'pending'), _defineProperty(_assertThisInitialized(_this), "_stacks", {
      then: [],
      catch: [],
      resolve: [],
      reject: [],
      finally: [],
      cancel: []
    }), _temp); // promise.catch((e) => {
    //   console.log('ff');
    // });

    _this._masterPromiseResolveFn = _resolve;
    _this._masterPromiseRejectFn = _reject; // save the executor function

    _this._executorFn = executorFn; // extend settings

    _this._settings = (0, _deepMerge.default)({
      id: (0, _uniqid.default)(),
      safeReject: false,
      cancelDefaultReturn: null
    }, settings);
    setTimeout(() => {
      if (!_this._executorFn) return;

      if (!_this._isExecutorStarted) {
        _this._executorFn(_this._resolve.bind(_assertThisInitialized(_this)), _this._reject.bind(_assertThisInitialized(_this)), _this.trigger.bind(_assertThisInitialized(_this)), _this._cancel.bind(_assertThisInitialized(_this)));

        _this._isExecutorStarted = true;
      }
    });
    return _this;
  }
  /**
   * @name                    state
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


  _createClass(SPromise, [{
    key: "is",

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
    value: function is(status) {
      var statusArray = status.split(',').map(l => l.trim());
      if (statusArray.indexOf(this._state) !== -1) return true;
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

  }, {
    key: "isPending",
    value: function isPending() {
      return this._state === 'pending';
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

  }, {
    key: "isResolved",
    value: function isResolved() {
      return this._state === 'resolved';
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

  }, {
    key: "isRejected",
    value: function isRejected() {
      return this._state === 'rejected';
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

  }, {
    key: "isCanceled",
    value: function isCanceled() {
      return this._state === 'canceled';
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

  }, {
    key: "isDestroyed",
    value: function isDestroyed() {
      return this._state === 'destroyed';
    }
    /**
     * @name                    start
     * @type                    Function
     *
     * This method is useful when you want the executor function passed to the constructor to be called directly and not
     * as usual during the next javascript execution loop.
     *
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something
     * }).then(value => {
     *    // do something
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "start",
    value: function start() {
      if (this._isDestroyed) {
        throw new Error("Sorry but you can't call the \"start\" method on this SPromise cause it has been destroyed...");
      }

      if (this._isExecutorStarted || !this._executorFn) return this;

      this._executorFn.apply(this, [this._resolve.bind(this), this._reject.bind(this), this.trigger.bind(this), this._cancel.bind(this)]);

      this._isExecutorStarted = true; // maintain chainability

      return this;
    }
    /**
     * @name          resolve
     * @type          Function
     * @async
     *
     * This is the "resolve" method exposed on the promise itself for convinience
     *
     * @param         {Mixed}         arg       The value that you want to return back from the promise
     * @param       {Array|String}         [stacksOrder='then,resolve,finally']      This specify in which order have to be called the stacks
     * @return        {Mixed}                   Return the resolve result value passed in each stacks specified in the second parameter
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "resolve",
    value: function resolve(arg, stacksOrder) {
      if (stacksOrder === void 0) {
        stacksOrder = 'then,resolve,finally';
      }

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
     * @param       {Mixed}         arg           The argument that the promise user is sendind through the resolve function
     * @param       {Array|String}         [stacksOrder='then,resolve,finally']      This specify in which order have to be called the stacks
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_resolve",
    value: function () {
      var _resolve2 = _asyncToGenerator(function* (arg, stacksOrder) {
        if (stacksOrder === void 0) {
          stacksOrder = 'then,resolve,finally';
        }

        if (this._isDestroyed) return; // update the status

        this._state = 'resolved'; // exec the wanted stacks

        var stacksResult = yield this._triggerStacks(stacksOrder, arg); // resolve the master promise

        this._masterPromiseResolveFn(stacksResult); // return the stack result


        return stacksResult;
      });

      function _resolve(_x, _x2) {
        return _resolve2.apply(this, arguments);
      }

      return _resolve;
    }()
    /**
     * @name          reject
     * @type          Function
     * @async
     *
     * This is the "reject" method exposed on the promise itself for convinience
     *
     * @param         {Mixed}         arg       The value that you want to return back from the promise
     * @param       {Array|String}         [stacksOrder='then,reject,finally']      This specify in which order have to be called the stacks
     * @return        {Mixed}                   Return the reject result value passed in each stacks specified in the second parameter
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "reject",
    value: function reject(arg, stacksOrder) {
      if (stacksOrder === void 0) {
        stacksOrder = 'then,reject,finally';
      }

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
     * @param       {Mixed}         arg           The argument that the promise user is sendind through the reject function
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_reject",
    value: function () {
      var _reject2 = _asyncToGenerator(function* (arg, stacksOrder) {
        if (stacksOrder === void 0) {
          stacksOrder = 'catch,reject,finally';
        }

        if (this._isDestroyed) return; // update the status

        this._state = 'rejected'; // exec the wanted stacks

        var stacksResult = yield this._triggerStacks(stacksOrder, arg); // resolve the master promise

        if (this._settings.safeReject) {
          this._masterPromiseResolveFn(stacksResult || this._settings.cancelDefaultReturn);
        } else {
          this._masterPromiseRejectFn(stacksResult);
        } // return the stack result


        return stacksResult;
      });

      function _reject(_x3, _x4) {
        return _reject2.apply(this, arguments);
      }

      return _reject;
    }()
    /**
     * @name          cancel
     * @type          Function
     * @async
     *
     * This is the "cancel" method exposed on the promise itself for convinience
     *
     * @param         {Mixed}         arg       The value that you want to return back from the promise
     * @param       {Array|String}         [stacksOrder='cancel']      This specify in which order have to be called the stacks
     * @return        {Mixed}                   Return the cancel result value passed in each stacks specified in the second parameter
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "cancel",
    value: function cancel(arg, stacksOrder) {
      if (stacksOrder === void 0) {
        stacksOrder = 'cancel';
      }

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
     * @param         {Mixed}           arg           The argument you want to pass to the cancel callbacks
     * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_cancel",
    value: function () {
      var _cancel2 = _asyncToGenerator(function* (arg, stacksOrder) {
        if (stacksOrder === void 0) {
          stacksOrder = 'cancel';
        }

        if (this._isDestroyed) return; // update the status

        this._state = 'canceled'; // exec the wanted stacks

        var stacksResult = yield this._triggerStacks(stacksOrder, arg); // resolve the master promise

        this._masterPromiseResolveFn.apply(this, [stacksResult || null, this]); // return the stack result


        return stacksResult;
      });

      function _cancel(_x5, _x6) {
        return _cancel2.apply(this, arguments);
      }

      return _cancel;
    }()
    /**
     * @name          trigger
     * @type          Function
     * @async
     *
     * This is the method that allows you to trigger the callbacks like "then", "catch", "finally", etc... without actually resolving the Promise itself
     *
     * @param         {String|Array}        what            The callbacks that you want to trigger. Can be "then", "catch", "finally" or "cancel". You can trigger multiple stacks by passing an Array like ['then','finally'], or a string like "then,finally"
     * @param         {Mixed}         arg         The argument you want to pass to the callback
     * @return        {Promise}                       A default Promise that will be resolved with the result of the stack execution
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    trigger('then', 'hello world');
     *    setTimeout(() => {
     *      resolve('something');
     *    }, 2000);
     * }).then(value => {
     *    // do something with one time "hello world", and one time "something"...
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "trigger",
    value: function () {
      var _trigger = _asyncToGenerator(function* (what, arg, _metas) {
        if (_metas === void 0) {
          _metas = {};
        }

        if (this._isDestroyed) return; // triger the passed stacks

        return this._triggerStacks(what, arg, _metas);
      });

      function trigger(_x7, _x8, _x9) {
        return _trigger.apply(this, arguments);
      }

      return trigger;
    }()
    /**
     * @name            _registerNewStacks
     * @type            Function
     * @private
     *
     * This methods allows you to register new stacks.
     * A new stack can be called then using the "on('stackName', ...)" method,
     * or directly on the SPromise instance like so "myPromise.stackName(...)".
     *
     * @param       {String|Array}      stacks        The stack(s) name(s) you want to register. Can be an Array or a comma separated string
     * @return      {SPromise}                        The SPromise instance
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_registerNewStacks",
    value: function _registerNewStacks(stacks) {
      // split the stacks order
      if (typeof stacks === 'string') stacks = stacks.split(',').map(s => s.trim());
      stacks.forEach(stack => {
        if (!this._stacks[stack]) {
          this._stacks[stack] = [];
        }
      });
    }
    /**
     * @name            _registerCallbackInStack
     * @type            Function
     *
     * This function take as argument a stack array and register into it the passed callback function
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_registerCallbackInStack",
    value: function _registerCallbackInStack(stack) {
      if (this._isDestroyed) {
        throw new Error("Sorry but you can't call the \"".concat(stack, "\" method on this SPromise cause it has been destroyed..."));
      } // make sure the stack exist


      if (!this._stacks[stack]) {
        this._registerNewStacks(stack);
      }

      if (typeof stack === 'string') stack = this._stacks[stack]; // process the args

      var callback = arguments.length <= 1 ? undefined : arguments[1];
      var callNumber = -1;

      if ((arguments.length <= 1 ? 0 : arguments.length - 1) === 2 && typeof (arguments.length <= 1 ? undefined : arguments[1]) === 'number') {
        callback = arguments.length <= 2 ? undefined : arguments[2];
        callNumber = arguments.length <= 1 ? undefined : arguments[1];
      } // make sure this is a function and register it to the _catchStack


      if (typeof callback === 'function' && stack.indexOf(callback) === -1) stack.push({
        callback,
        callNumber,
        called: 0
      }); // maintain chainability

      return this;
    }
    /**
     * @name            _triggerStack
     * @type            Function
     * @private
     * @async
     *
     * This function take an Array Stack as parameter and execute it to return the result
     *
     * @param         {Array|String}             stack             The stack to execute. Can be the stack array directly, or just the stack name like "then", "catch", etc.stack.stack.
     * @param         {Mixed}             initialValue      The initial value to pass to the first stack callback
     * @return        {Promise}                             A promise resolved with the stack result
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_triggerStack",
    value: function () {
      var _triggerStack2 = _asyncToGenerator(function* (stack, initialValue, _metas) {
        if (_metas === void 0) {
          _metas = {};
        }

        var currentCallbackReturnedValue = initialValue; // console.log(this._stacks);

        if (!this._stacks || Object.keys(this._stacks).length === 0) return currentCallbackReturnedValue;
        var stackArray = [];

        if (typeof stack === 'string') {
          // make sure the stack exist
          // if (!this._stacks[stack]) {
          //   this._registerNewStacks(stack);
          // }
          if (this._stacks[stack]) {
            stackArray = [...stackArray, ...this._stacks[stack]];
          } // check if the stack is a glob pattern


          Object.keys(this._stacks).forEach(stackName => {
            if (stackName === stack) return;
            var toAvoid = ['then', 'catch', 'resolve', 'reject', 'finally', 'cancel'];
            if (toAvoid.indexOf(stack) !== -1 || toAvoid.indexOf(stackName) !== -1) return; // console.log('CHECK', stack, stackName);

            if ((0, _minimatch.default)(stack, stackName)) {
              // if (stackName === '*' && stack === 'start') {
              //   console.log('SOMETHING GOOD', stackName, stack);
              // }
              // the glob pattern match the triggered stack so add it to the stack array
              stackArray = [...stackArray, ...this._stacks[stackName]];
            }
          });
        } // filter the catchStack


        stackArray.map(item => item.called++);
        stackArray = stackArray.filter(item => {
          if (item.callNumber === -1) return true;
          if (item.called <= item.callNumber) return true;
          return false;
        });

        for (var i = 0; i < stackArray.length; i++) {
          // get the actual item in the array
          var item = stackArray[i]; // make sure the stack exist

          if (!item.callback) return currentCallbackReturnedValue; // call the callback function

          var callbackResult = item.callback(currentCallbackReturnedValue, (0, _deepMerge.default)({
            stack,
            id: this._settings.id,
            state: this._state,
            time: Date.now(),
            level: 1
          }, _metas)); // check if the callback result is a promise

          if (Promise.resolve(callbackResult) === callbackResult) {
            callbackResult = yield callbackResult;
          } // if the settings tells that we have to pass each returned value to the next callback


          if (callbackResult !== undefined) {
            currentCallbackReturnedValue = callbackResult;
          }
        } // return the result


        return currentCallbackReturnedValue;
      });

      function _triggerStack(_x10, _x11, _x12) {
        return _triggerStack2.apply(this, arguments);
      }

      return _triggerStack;
    }()
    /**
     * @name          _triggerStacks
     * @type          Function
     * @private
     * @async
     *
     * This function take as parameters a list of stacks to trigger like an Array ['then','finnaly'], or a string like so "then,finally", and as second parameter,
     * the initial value to pass to the first callback of the joined stacks...
     *
     * @param         {Array|String}            stacks          The stacks to trigger
     * @param         {Mixed}                   initialValue    The initial value to pass to the first stack callback
     * @return        {Promise}                                 A promise that will be resolved with the stacks resulting value
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_triggerStacks",
    value: function _triggerStacks(stacks, initialValue, _metas) {
      var _this2 = this;

      if (_metas === void 0) {
        _metas = {};
      }

      return new Promise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (resolve, reject) {
          // await __wait(0);
          // check if the stacks is "*"
          if (typeof stacks === 'string') stacks = stacks.split(',').map(s => s.trim());
          var currentStackResult = initialValue;

          for (var i = 0; i < stacks.length; i++) {
            var stackResult = yield _this2._triggerStack(stacks[i], currentStackResult, _metas);

            if (stackResult !== undefined) {
              currentStackResult = stackResult;
            } // await this._triggerStack('*', currentStackResult, stacks[i]);
            // this._triggerAllStack(stacks[i], currentStackResult);

          }

          resolve(currentStackResult);
        });

        return function (_x13, _x14) {
          return _ref.apply(this, arguments);
        };
      }());
    }
    /**
     * @name                on
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "resolve" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "release", "on", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {String|Array}      stacks        The stacks in which you want register your callback. Either an Array like ['then','finally'], or a String like "then,finally"
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    resolve('hello world');
     * }).on('then', value => {
     *    // do something with the value that is "hello world"
     * }).on('catch:1', error => {
     *    // do something that will be called only once
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "on",
    value: function on(stacks, callback) {
      if (this._isDestroyed) {
        throw new Error("Sorry but you can't call the \"on\" method on this SPromise cause it has been destroyed...");
      }

      if (typeof stacks === 'string') stacks = stacks.split(',').map(s => s.trim()); // loop on each stacks

      stacks.forEach(name => {
        // check if it has a callNumber specified using name:1
        var splitedName = name.split('{');
        var callNumber = -1;

        if (splitedName.length === 2) {
          name = splitedName[0];
          callNumber = parseInt(splitedName[1].replace('}', ''));
        } // calling the registration method


        this._registerCallbackInStack(name, callNumber, callback);
      }); // maintain chainability

      return this;
    }
    /**
     * @name            off
     * @type            Function
     *
     * This method allows you to unsubscribe to an event by passing the event name an optionally the callback function.
     * If you don't pass the callback function, all the subscribed events the same as the passed one will be unsubscribed.
     *
     * @param       {String}        name        The event name to unsubscribe to
     * @param       {Function}    [callback=null]     The callback function you want to unsubscribe
     * @return      {SPromise}                The SPromise instance to maintain chainability
     *
     * @since     2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "off",
    value: function off(name, callback) {
      if (callback === void 0) {
        callback = null;
      }

      if (!callback) {
        delete this._stacks[name];
        return this;
      } // get the stack


      var stack = this._stacks[name];
      if (!stack) return this; // loop on the stack registered callback to finc the one to delete

      stack = stack.filter(item => {
        if (item.callback === callback) return false;
        return true;
      }); // make sure we have saved the new stack

      this._stacks[name] = stack; // maintain chainability

      return this;
    }
    /**
     * @name                then
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "resolve" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Number}          [callNumber=-1]     (Optional) How many times you want this callback to be called at max. -1 means unlimited
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    resolve('hello world');
     * }).then(value => {
     *    // do something with the value that is "hello world"
     *    return new Promise((resolve, reject) => {
     *       setTimeout(() => resolve('hola'), 1000);
     *    });
     * }).then(2, value => {
     *    // do something that will be executed only twice
     *    // do something with the value passed "hola"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "then",
    value: function then() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args.length === 2 && typeof args[0] === 'function' && typeof args[1] === 'function') {
        this._masterPromiseResolveFn = args[0];
        this._masterPromiseRejectFn = args[1];
        return;
      }

      return this._registerCallbackInStack('then', ...args);
    }
    /**
     * @name                catch
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Number}          [callNumber=-1]     (Optional) How many times you want this callback to be called at max. -1 means unlimited
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    reject('hello world');
     * }).catch(value => {
     *    // do something with the value that is "hello world"
     * }).catch(1, value => {
     *    // do something that will be executed only once
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "catch",
    value: function _catch() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _get(_getPrototypeOf(SPromise.prototype), "catch", this).call(this, ...args);

      return this._registerCallbackInStack('catch', ...args);
    }
    /**
     * @name                finally
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    resolve('hello world');
     * }).finally(value => {
     *    // do something with the value that is "hello world"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "finally",
    value: function _finally() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this._registerCallbackInStack('finally', ...args);
    }
    /**
     * @name                resolved
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    resolve('hello world');
     * }).resolved(value => {
     *    // do something with the value that is "hello world"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "resolved",
    value: function resolved() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this._registerCallbackInStack('resolve', ...args);
    }
    /**
     * @name                rejected
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called every time the "reject" one is called in the executor
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Function}        callback        The callback function to register
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    resolve('hello world');
     * }).rejected(value => {
     *    // do something with the value that is "hello world"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "rejected",
    value: function rejected() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return this._registerCallbackInStack('reject', ...args);
    }
    /**
     * @name                canceled
     * @type                Function
     *
     * This method allows the SPromise user to register a function that will be called once when the "revoke" function has been called
     * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "then", etc using
     * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
     * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
     *
     * @param           {Function}        callback        The callback function to register
     * @return          {Promise}                  A simple promise that will be resolved with the cancel stack result
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    cancel('hello world');
     * }).canceled(value => {
     *    // do something with the value that is "hello world"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "canceled",
    value: function canceled() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return this._registerCallbackInStack('cancel', ...args);
    }
    /**
     * @name                cancel
     * @type                Function
     *
     * This method allows the user to cancel the promise execution.
     * This mean that the promise will be resolved but not trigger any
     * other stacks like "resolve,reject,etc..."
     *
     * @param           {Mixed}         [value=null]      A value that you want to pass to the resolve promise
     * @return          {Promise}                  A simple promise that will be resolved with the cancel stack result
     *
     * @example         js
     * new SPromise((resolve, reject, trigger, cancel) => {
     *    // do something...
     *    cancel('hello world');
     * }).canceled(value => {
     *    // do something with the value that is "hello world"
     * }).start();
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "cancel",
    value: function cancel() {
      if (this._isDestroyed) return;
      return this._cancel(...arguments);
    }
    /**
     * @name                      _destroy
     * @type                      Function
     *
     * Destroying the SPromise instance by unregister all the callbacks, etc...
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      // update the status
      this._state = 'destroyed'; // destroying all the callbacks stacks registered

      delete this._stacks; // delete this._isExecutorStarted; // keep it to avoid errors in the "setTimeout" function in the masterPromise executor...

      delete this._executorFn;
      delete this._masterPromiseResolveFn;
      delete this._masterPromiseRejectFn;
      delete this._masterPromise;
      this._isDestroyed = true;
    }
  }, {
    key: "state",
    get: function get() {
      return this._state;
    }
  }]);

  return SPromise;
}( /*#__PURE__*/_wrapNativeSuper(Promise));

exports.default = SPromise;
module.exports = exports.default;
// @shared
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/src/shared/class/getMethods", "@coffeekraken/sugar/src/shared/class/SClass", "@coffeekraken/sugar/src/shared/event/SEventEmitter", "@coffeekraken/sugar/src/shared/object/deepMerge", "./treatAsValue"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const getMethods_1 = __importDefault(require("@coffeekraken/sugar/src/shared/class/getMethods"));
    const SClass_1 = __importDefault(require("@coffeekraken/sugar/src/shared/class/SClass"));
    const SEventEmitter_1 = __importDefault(require("@coffeekraken/sugar/src/shared/event/SEventEmitter"));
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/src/shared/object/deepMerge"));
    const treatAsValue_1 = __importDefault(require("./treatAsValue"));
    class SPromise extends SClass_1.default.extends(Promise) {
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
            // @ts-ignore
            let executorFn, _this, resolvers = {};
            super(deepMerge_1.default({
                promise: {
                    treatCancelAs: 'resolve',
                    destroyTimeout: 5000,
                    proxies: {
                        resolve: [],
                        reject: []
                    }
                }
            }, typeof executorFnOrSettings === 'object' ? executorFnOrSettings : {}, settings !== null && settings !== void 0 ? settings : {}), (resolve, reject) => {
                resolvers.resolve = resolve;
                new Promise((rejectPromiseResolve, rejectPromiseReject) => {
                    resolvers.reject = (...args) => {
                        rejectPromiseReject(...args);
                        reject(...args);
                    };
                }).catch((e) => {
                    this.emit('catch', e);
                });
            });
            this._promiseState = 'pending';
            this.expose(new SEventEmitter_1.default(deepMerge_1.default({
                metas: this.metas,
                eventEmitter: {}
            }, this._settings)), {
                as: 'eventEmitter',
                props: ['on', 'off', 'emit', 'pipe', 'pipeFrom', 'pipeTo']
            });
            this._resolvers = resolvers;
            if (this._settings.promise.destroyTimeout !==
                -1) {
                this.on('finally', (v, m) => {
                    setTimeout(() => {
                        this._destroy();
                    }, this._settings.promise.destroyTimeout);
                });
            }
            // start the promise executor by passing it
            // an API correctly bound to this instance
            executorFn =
                typeof executorFnOrSettings === 'function' ? executorFnOrSettings : null;
            if (executorFn) {
                const api = {};
                getMethods_1.default(this).forEach((func) => {
                    if (func.slice(0, 1) === '_')
                        return;
                    api[func] = this[func].bind(this);
                });
                setTimeout(() => {
                    executorFn(api);
                    // this.eventEmitter.start();
                });
            }
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
            return treatAsValue_1.default(promise, settings);
        }
        // you can also use Symbol.species in order to
        // return a Promise for then/catch/finally
        static get [Symbol.species]() {
            return Promise;
        }
        // Promise overrides his Symbol.toStringTag
        get [Symbol.toStringTag]() {
            return 'SPromise';
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
            return treatAsValue_1.default(this, settings);
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
            this._settings.promise.proxies[point].push(proxy);
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
            const statusArray = status.split(',').map((l) => l.trim());
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
            return this._promiseState === 'pending';
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
            return this._promiseState === 'resolved';
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
            return this._promiseState === 'rejected';
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
            return this._promiseState === 'canceled';
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
            return this._promiseState === 'destroyed';
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
        resolve(arg, stacksOrder = 'resolve,finally') {
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
        _resolve(arg, stacksOrder = 'resolve,finally') {
            if (this._promiseState === 'destroyed')
                return;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                // update the status
                this._promiseState = 'resolved';
                // exec the wanted stacks
                let stacksResult = yield this.eventEmitter._emitEvents(stacksOrder, arg);
                // execute proxies
                for (const proxyFn of this._settings.promise.proxies.resolve || []) {
                    stacksResult = yield proxyFn(stacksResult);
                }
                // resolve the master promise
                this._resolvers.resolve(stacksResult);
                // return the stack result
                resolve(stacksResult);
            }));
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
         * @param       {Array|String}         [stacksOrder='catch,error,reject,finally']      This specify in which order have to be called the stacks
         * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        _reject(arg, stacksOrder = `catch,reject,finally`) {
            if (this._promiseState === 'destroyed')
                return;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                // update the status
                this._promiseState = 'rejected';
                // exec the wanted stacks
                let stacksResult = yield this.eventEmitter._emitEvents(stacksOrder, arg);
                // execute proxies
                for (const proxyFn of this._settings.promise.proxies.reject || []) {
                    stacksResult = yield proxyFn(stacksResult);
                }
                // resolve the master promise
                this._resolvers.reject(stacksResult);
                // return the stack result
                resolve(stacksResult);
            }));
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
        cancel(arg, stacksOrder = 'cancel,finally') {
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
        _cancel(arg, stacksOrder = 'cancel,finally') {
            if (this._promiseState === 'destroyed')
                return;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                // update the status
                this._promiseState = 'canceled';
                // exec the wanted stacks
                const stacksResult = yield this.eventEmitter._emitEvents(stacksOrder, arg);
                // resolve the master promise
                if (this._settings.promise.treatCancelAs === 'reject') {
                    this._resolvers.reject(stacksResult);
                }
                else {
                    this._resolvers.resolve(stacksResult);
                }
                // return the stack result
                resolve(stacksResult);
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
            return this.on('catch', ...args);
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
            return this.on('finally', ...args);
        }
        /**
         * @name                resolved
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
         * }).resolved(value => {
         *    // do something with the value that is "hello world"
         * });
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        resolved(...args) {
            return this.on('resolve', ...args);
        }
        /**
         * @name                rejected
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
         * }).rejected(value => {
         *    // do something with the value that is "hello world"
         * });
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        rejected(...args) {
            return this.on('reject', ...args);
        }
        /**
         * @name                canceled
         * @type                Function
         *
         * This method allows the SPromise user to register a function that will be called once when the "revoke" function has been called
         * The context of the callback will be the SPromise instance itself so you can call all the methods available like "resolve", "catch", etc using
         * the "this.resolve('something')" statusment. In an arrow function like "(value) => { ... }", the "this" keyword will be bound to the current context where you define
         * your function. You can access to the SPromise instance through the last parameter like so "(value, sPromiseInstance) => { ... }".
         *
         * @param           {Function}        callback        The callback function to register
         * @return          {Promise}                  A simple promise that will be resolved with the cancel stack result
         *
         * @example         js
         * new SPromise(({ resolve, reject, emit, cancel }) => {
         *    // do something...
         *    cancel('hello world');
         * }).canceled(value => {
         *    // do something with the value that is "hello world"
         * });
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        canceled(...args) {
            return this.on('cancel', ...args);
        }
        /**
         * @name                      _destroy
         * @type                      Function
         *
         * Destroying the SPromise instance by unregister all the callbacks, etc...
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        _destroy() {
            // update the status
            this._promiseState = 'destroyed';
        }
    }
    exports.default = SPromise;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb21pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVO0FBQ1YsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsaUdBQTJFO0lBQzNFLHlGQUFtRTtJQUNuRSx1R0FFNEQ7SUFDNUQsZ0dBQTBFO0lBQzFFLGtFQUd3QjtJQTJHeEIsTUFBTSxRQUNKLFNBQVEsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBNkJqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQW1CRztRQUNILFlBQVksb0JBQW9CLEdBQUcsRUFBRSxFQUFFLFFBQVM7WUFDOUMsYUFBYTtZQUNiLElBQUksVUFBVSxFQUNaLEtBQUssRUFDTCxTQUFTLEdBQVEsRUFBRSxDQUFDO1lBRXRCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLE9BQU8sRUFBRTtvQkFDUCxhQUFhLEVBQUUsU0FBUztvQkFDeEIsY0FBYyxFQUFFLElBQUk7b0JBQ3BCLE9BQU8sRUFBRTt3QkFDUCxPQUFPLEVBQUUsRUFBRTt3QkFDWCxNQUFNLEVBQUUsRUFBRTtxQkFDWDtpQkFDRjthQUNGLEVBQ0QsT0FBTyxvQkFBb0IsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQ3BFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixFQUNELENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUNsQixTQUFTLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDNUIsSUFBSSxPQUFPLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRSxFQUFFO29CQUN4RCxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTt3QkFDN0IsbUJBQW1CLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQzt3QkFDN0IsTUFBTSxDQUFD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
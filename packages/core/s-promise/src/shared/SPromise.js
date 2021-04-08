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
        define(["require", "exports", "@coffeekraken/sugar/src/shared/class/getMethods", "@coffeekraken/s-class", "@coffeekraken/s-event-emitter", "@coffeekraken/sugar/src/shared/object/deepMerge", "@coffeekraken/sugar/shared/time/wait", "./treatAsValue"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const getMethods_1 = __importDefault(require("@coffeekraken/sugar/src/shared/class/getMethods"));
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/src/shared/object/deepMerge"));
    const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
    const treatAsValue_1 = __importDefault(require("./treatAsValue"));
    class SPromise extends s_class_1.default.extends(Promise) {
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
                    preventRejectOnThrow: true,
                    emitErrorEventOnThrow: true,
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
                        if (this.promiseSettings.preventRejectOnThrow) {
                            resolve(...args);
                        }
                        else {
                            reject(...args);
                        }
                    };
                }).catch((e) => {
                    this.emit('catch', e);
                });
            });
            this._promiseState = 'pending';
            this.expose(new s_event_emitter_1.default(deepMerge_1.default({
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
                (() => __awaiter(this, void 0, void 0, function* () {
                    yield wait_1.default(0);
                    try {
                        yield executorFn(api);
                    }
                    catch (e) {
                        if (this.promiseSettings.emitErrorEventOnThrow) {
                            this.emit('error', e);
                        }
                        this.reject(e);
                    }
                }))();
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
        /**
         * @name          promiseSettings
         * @type          ISPromiseSettings
         * @get
         *
         * Access to the spromise settings
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        get promiseSettings() {
            return this._settings.promise;
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
            const ar = point.split(',').map((l) => l.trim());
            ar.forEach((a) => {
                this._settings.promise.proxies[a].push(proxy);
            });
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
            return __awaiter(this, void 0, void 0, function* () {
                if (this._promiseState === 'destroyed')
                    return;
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
                return stacksResult;
            });
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
         * @param       {Array|String}         [stacksOrder='catch,reject,finally']      This specify in which order have to be called the stacks
         * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        _reject(arg, stacksOrder = `catch,reject,finally`) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this._promiseState === 'destroyed')
                    return;
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
                return stacksResult;
            });
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
            super.catch(...args);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb21pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVO0FBQ1YsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsaUdBQTJFO0lBQzNFLG9FQUE2QztJQUM3QyxvRkFBZ0Y7SUFDaEYsZ0dBQTBFO0lBQzFFLGdGQUEwRDtJQUMxRCxrRUFHd0I7SUF5R3hCLE1BQU0sUUFDSixTQUFRLGlCQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQTJDakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FtQkc7UUFDSCxZQUFZLG9CQUFvQixHQUFHLEVBQUUsRUFBRSxRQUFTO1lBQzlDLGFBQWE7WUFDYixJQUFJLFVBQVUsRUFDWixLQUFLLEVBQ0wsU0FBUyxHQUFRLEVBQUUsQ0FBQztZQUV0QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtnQkFDRSxPQUFPLEVBQUU7b0JBQ1AsYUFBYSxFQUFFLFNBQVM7b0JBQ3hCLGNBQWMsRUFBRSxJQUFJO29CQUNwQixvQkFBb0IsRUFBRSxJQUFJO29CQUMxQixxQkFBcUIsRUFBRSxJQUFJO29CQUMzQixPQUFPLEVBQUU7d0JBQ1AsT0FBTyxFQUFFLEVBQUU7d0JBQ1gsTUFBTSxFQUFFLEVBQUU7cUJBQ1g7aUJBQ0Y7YUFDRixFQUNELE9BQU8sb0JBQW9CLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUNwRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsRUFDRCxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDbEIsU0FBUyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0JBQzVCLElBQUksT0FBTyxDQUFDLENBQUMsb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUUsRUFBRTtvQkFDeEQsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFF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
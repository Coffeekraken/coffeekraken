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
        define(["require", "exports", "@coffeekraken/sugar/src/shared/class/getMethods", "@coffeekraken/s-class", "@coffeekraken/s-event-emitter", "@coffeekraken/sugar/src/shared/object/deepMerge", "./treatAsValue"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const getMethods_1 = __importDefault(require("@coffeekraken/sugar/src/shared/class/getMethods"));
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/src/shared/object/deepMerge"));
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
                    emitErrorAsEvent: true,
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
                    try {
                        yield executorFn(api);
                    }
                    catch (e) {
                        if (this.promiseSettings.emitErrorAsEvent) {
                            this.emit('error', e);
                        }
                        else {
                            resolvers.reject(e);
                        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb21pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVO0FBQ1YsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsaUdBQTJFO0lBQzNFLG9FQUE2QztJQUM3QyxvRkFBZ0Y7SUFDaEYsZ0dBQTBFO0lBQzFFLGtFQUd3QjtJQXlHeEIsTUFBTSxRQUNKLFNBQVEsaUJBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBMkNqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQW1CRztRQUNILFlBQVksb0JBQW9CLEdBQUcsRUFBRSxFQUFFLFFBQVM7WUFDOUMsYUFBYTtZQUNiLElBQUksVUFBVSxFQUNaLEtBQUssRUFDTCxTQUFTLEdBQVEsRUFBRSxDQUFDO1lBRXRCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLE9BQU8sRUFBRTtvQkFDUCxhQUFhLEVBQUUsU0FBUztvQkFDeEIsZ0JBQWdCLEVBQUUsSUFBSTtvQkFDdEIsY0FBYyxFQUFFLElBQUk7b0JBQ3BCLE9BQU8sRUFBRTt3QkFDUCxPQUFPLEVBQUUsRUFBRTt3QkFDWCxNQUFNLEVBQUUsRUFBRTtxQkFDWDtpQkFDRjthQUNGLEVBQ0QsT0FBTyxvQkFBb0IsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQ3BFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixFQUNELENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUNsQixTQUFTLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDNUIsSUFBSSxPQUFPLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRSxFQUFFO29CQUN4RCxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTt3QkFDN0IsbUJBQW1CLENBQUMsR0FBRyxJQUFJLENB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
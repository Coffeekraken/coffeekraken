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
import __getMethods from '@coffeekraken/sugar/shared/class/utils/getMethods';
import __SClass from '@coffeekraken/s-class';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __deepMerge from '@coffeekraken/sugar/src/shared/object/deepMerge';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __treatAsValue from './treatAsValue';
class SPromise extends __SClass.extends(Promise) {
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
        super(__deepMerge({
            promise: {
                treatCancelAs: 'resolve',
                destroyTimeout: 1,
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
        this._eventEmitter = new __SEventEmitter(__deepMerge({
            metas: this.metas,
            eventEmitter: {}
        }, this._settings));
        this.expose(this._eventEmitter, {
            as: 'eventEmitter',
            props: ['on', 'off', 'emit', 'pipe', 'pipeFrom', 'pipeTo', 'eventEmitterSettings']
        });
        this._resolvers = resolvers;
        if (this._settings.promise.destroyTimeout !==
            -1) {
            this.on('finally', (v, m) => {
                setTimeout(() => {
                    this.destroy();
                }, this._settings.promise.destroyTimeout);
            });
        }
        // start the promise executor by passing it
        // an API correctly bound to this instance
        executorFn =
            typeof executorFnOrSettings === 'function' ? executorFnOrSettings : null;
        if (executorFn) {
            const api = {};
            __getMethods(this).forEach((func) => {
                if (func.slice(0, 1) === '_')
                    return;
                api[func] = this[func].bind(this);
            });
            (() => __awaiter(this, void 0, void 0, function* () {
                yield __wait(0);
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
        return __treatAsValue(promise, settings);
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
        return __treatAsValue(this, settings);
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
     * @name                      destroy
     * @type                      Function
     *
     * Destroying the SPromise instance by unregister all the callbacks, etc...
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    destroy() {
        // destroy the event emitter
        this._eventEmitter.destroy();
        // update the status
        this._promiseState = 'destroyed';
    }
}
export default SPromise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb21pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVO0FBQ1YsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sWUFBWSxNQUFNLG1EQUFtRCxDQUFDO0FBQzdFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sZUFBbUMsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRixPQUFPLFdBQVcsTUFBTSxpREFBaUQsQ0FBQztBQUMxRSxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLGNBR04sTUFBTSxnQkFBZ0IsQ0FBQztBQXlHeEIsTUFBTSxRQUFTLFNBQVEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUEyQzlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUJHO0lBQ0gsWUFBWSxvQkFBb0IsR0FBRyxFQUFFLEVBQUUsUUFBUztRQUM5QyxhQUFhO1FBQ2IsSUFBSSxVQUFVLEVBQ1osS0FBSyxFQUNMLFNBQVMsR0FBUSxFQUFFLENBQUM7UUFFdEIsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLE9BQU8sRUFBRTtnQkFDUCxhQUFhLEVBQUUsU0FBUztnQkFDeEIsY0FBYyxFQUFFLENBQUM7Z0JBQ2pCLG9CQUFvQixFQUFFLElBQUk7Z0JBQzFCLHFCQUFxQixFQUFFLElBQUk7Z0JBQzNCLE9BQU8sRUFBRTtvQkFDUCxPQUFPLEVBQUUsRUFBRTtvQkFDWCxNQUFNLEVBQUUsRUFBRTtpQkFDWDthQUNGO1NBQ0YsRUFDRCxPQUFPLG9CQUFvQixLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFDcEUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLEVBQ0QsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbEIsU0FBUyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7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
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
import __SLog from '@coffeekraken/s-log';
import __SPromiseSettingsInterface from './interface/SPromiseSettingsInterface';
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
            promise: __SPromiseSettingsInterface.defaults()
        }, typeof executorFnOrSettings === 'object'
            ? executorFnOrSettings
            : {}, settings !== null && settings !== void 0 ? settings : {}), (resolve, reject) => {
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
            metas: Object.assign({}, this.metas),
            eventEmitter: {},
        }, this._settings));
        this.expose(this._eventEmitter, {
            as: 'eventEmitter',
            props: [
                'on',
                'off',
                'emit',
                'pipe',
                'pipeErrors',
                'pipeFrom',
                'pipeTo',
                'eventEmitterSettings',
            ],
        });
        this.bind = this._eventEmitter.bind.bind(this);
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
            typeof executorFnOrSettings === 'function'
                ? executorFnOrSettings
                : null;
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
                    if (this.promiseSettings.emitLogErrorEventOnThrow) {
                        this.emit('log', {
                            type: __SLog.TYPE_ERROR,
                            value: e,
                        });
                    }
                    this.reject(e);
                }
            }))();
        }
        if (this.promiseSettings.resolveAtResolveEvent) {
            this.on('resolve', (data, metas) => {
                this.resolve(data);
            });
        }
        if (this.promiseSettings.rejectAtRejectEvent) {
            this.on('reject', (data, metas) => {
                this.reject(data);
            });
        }
        // this.catch((e) => {
        //     console.log('____e', e);
        // });
    }
    /**
     * @name        queue
     * @type        Function
     * @static
     *
     * This static method allows you to pass an array of promises that will be executed one after the other.
     * It will call the "callback" function if specified with the resolved promise as argument.
     *
     * @param       {Promise[]}        promises        The array of promises to execute one after the other
     * @param       {Function}      [before=null]        A callback to call before each promises executions
     * @param       {Function}      [after=null]        A callback to call after each promises executions
     * @return      {SPromise}                            The promise that will be resolved once all promises are resolved
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static queue(promises, before, after) {
        return new SPromise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            const results = {};
            let i = 0;
            function next() {
                return __awaiter(this, void 0, void 0, function* () {
                    const firstKey = Object.keys(promises)[0];
                    let promise = promises[firstKey];
                    if (typeof promise === 'function')
                        promise = promise();
                    try {
                        delete promises[firstKey];
                        if (before)
                            yield before(firstKey, promise);
                        let res = yield promise;
                        results[firstKey] = res;
                        if (after) {
                            let afterRes = yield after(firstKey, result);
                            if (afterRes !== undefined)
                                result[firstKey] = afterRes;
                        }
                        if (Object.keys(promises).length) {
                            next();
                        }
                        else {
                            resolve(results);
                        }
                    }
                    catch (e) {
                        reject(promise);
                    }
                    i++;
                });
            }
            next();
        }));
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
            if (a === 'resolve') {
                this._settings.promise.resolveProxies.push(proxy);
            }
            else if (a === 'reject') {
                this._settings.promise.rejectProxies.push(proxy);
            }
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
            const stacksOrderArray = stacksOrder.split(',').map((l) => l.trim());
            for (let i = 0; i < stacksOrderArray.length; i++) {
                const stack = stacksOrderArray[i];
                arg = yield this.eventEmitter.emit(stack, arg);
            }
            // execute proxies
            for (const proxyFn of this._settings.promise.resolveProxies || []) {
                arg = yield proxyFn(arg);
            }
            // resolve the master promise
            this._resolvers.resolve(arg);
            // return the stack result
            return arg;
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
            const stacksOrderArray = stacksOrder.split(',').map((l) => l.trim());
            for (let i = 0; i < stacksOrderArray.length; i++) {
                const stack = stacksOrderArray[i];
                arg = yield this.eventEmitter.emit(stack, arg);
            }
            // execute proxies
            for (const proxyFn of this._settings.promise.rejectProxies || []) {
                arg = yield proxyFn(arg);
            }
            // resolve the master promise
            this._resolvers.reject(arg);
            return arg;
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
            const stacksOrderArray = stacksOrder
                .split(',')
                .map((l) => l.trim());
            for (let i = 0; i < stacksOrderArray.length; i++) {
                const stack = stacksOrderArray[i];
                arg = yield this.eventEmitter.emit(stack, arg);
            }
            // resolve the master promise
            if (this._settings.promise.treatCancelAs === 'reject') {
                this._resolvers.reject(arg);
            }
            else {
                this._resolvers.resolve(arg);
            }
            // return the stack result
            resolve(arg);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb21pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVO0FBQ1YsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sWUFBWSxNQUFNLG1EQUFtRCxDQUFDO0FBQzdFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sZUFBbUMsTUFBTSwrQkFBK0IsQ0FBQztBQUNoRixPQUFPLFdBQVcsTUFBTSxpREFBaUQsQ0FBQztBQUMxRSxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLDJCQUEyQixNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8sY0FHTixNQUFNLGdCQUFnQixDQUFDO0FBb0d4QixNQUFNLFFBQ0YsU0FBUSxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQTRGakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSCxZQUNJLG9CQUFvQixHQUFHLEVBQUUsRUFDekIsUUFBeUM7UUFFekMsYUFBYTtRQUNiLElBQUksVUFBVSxFQUNWLEtBQUssRUFDTCxTQUFTLEdBQVEsRUFBRSxDQUFDO1FBRXhCLEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxPQUFPLEVBQUUsMkJBQTJCLENBQUMsUUFBUSxFQUFFO1NBQ2xELEVBQ0QsT0FBTyxvQkFBb0IsS0FBSyxRQUFRO1lBQ3BDLENBQUMsQ0FBQyxvQkFBb0I7WUFDdEIsQ0FBQyxDQUFDLEVBQUUsRUFDUixRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLEVBQ0QsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDaEIsU0FBUyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDNUIsSUFBSSxPQUFPLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRSxFQUFFO2dCQUN0RCxTQUFT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
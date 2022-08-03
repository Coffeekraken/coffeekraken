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
import __getMethods from '@coffeekraken/sugar/shared/class/getMethods';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
// import __SPromiseSettingsInterface from './interface/SPromiseSettingsInterface';
import __treatAsValue from './treatAsValue';
class SPromise extends Promise {
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
        var _a;
        // @ts-ignore
        let executorFn, _this, resolvers = {};
        super((resolve, reject) => {
            resolvers.resolve = resolve;
            resolvers.reject = reject;
            // resolvers.reject = (...args) => {
            //     reject(...args);
            // };
            // new Promise((rejectPromiseResolve, rejectPromiseReject) => {
            //     resolvers.reject = (...args) => {
            //         rejectPromiseReject(...args);
            //         if (this.promiseSettings.preventRejectOnThrow) {
            //             console.log('PROPROPR');
            //             reject(...args);
            //         } else {
            //             console.log('PROPROPR__erwjwxr');
            //             reject(...args);
            //         }
            //     };
            // });
        });
        this._promiseState = 'pending';
        this.settings = __deepMerge({
            treatCancelAs: 'resolve',
            destroyTimeout: 1,
            preventRejectOnThrow: false,
            emitLogErrorEventOnThrow: true,
            resolveAtResolveEvent: false,
            rejectAtRejectEvent: false,
            resolveProxies: [],
            rejectProxies: [],
        }, typeof executorFnOrSettings === 'object'
            ? executorFnOrSettings
            : {}, settings !== null && settings !== void 0 ? settings : {});
        this.eventEmitter = new __SEventEmitter(__deepMerge(Object.assign({ metas: Object.assign({}, this.metas) }, ((_a = this.promiseSettings.eventEmitter) !== null && _a !== void 0 ? _a : {}))));
        this.on = this.eventEmitter.on.bind(this.eventEmitter);
        this.off = this.eventEmitter.off.bind(this.eventEmitter);
        this.emit = this.eventEmitter.emit.bind(this.eventEmitter);
        this.pipe = this.eventEmitter.pipe.bind(this.eventEmitter);
        this.pipeErrors = this.eventEmitter.pipeErrors.bind(this.eventEmitter);
        this.pipeFrom = this.eventEmitter.pipeFrom.bind(this.eventEmitter);
        this.pipeTo = this.eventEmitter.pipeTo.bind(this.eventEmitter);
        this.eventEmitterSettings = this.eventEmitter.eventEmitterSettings;
        this.bind = this.eventEmitter.bind.bind(this);
        this._resolvers = resolvers;
        if (this.settings.destroyTimeout !== -1) {
            this.on('finally', (v, m) => {
                setTimeout(() => {
                    this.destroy();
                }, this.settings.destroyTimeout);
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
            executorFn(api);
            // (async () => {
            //     await __wait(0);
            //     try {
            //         await executorFn(api);
            //     } catch (e) {
            //         if (this.promiseSettings.emitLogErrorEventOnThrow) {
            //             this.emit('log', {
            //                 type: __SLog.TYPE_ERROR,
            //                 value: e,
            //             });
            //         }
            //         this.reject(e);
            //     }
            // })();
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
        //     if (!this.promiseSettings.preventRejectOnThrow) {
        //         // throw new Error(e);
        //     }
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
        return this.settings;
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
                this.settings.resolveProxies.push(proxy);
            }
            else if (a === 'reject') {
                this.settings.rejectProxies.push(proxy);
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
            for (const proxyFn of this.settings.resolveProxies || []) {
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
        if (this._promiseState === 'destroyed')
            return;
        // update the status
        this._promiseState = 'rejected';
        // exec the wanted stacks
        const stacksOrderArray = stacksOrder.split(',').map((l) => l.trim());
        // for (let i = 0; i < stacksOrderArray.length; i++) {
        //     const stack = stacksOrderArray[i];
        //     arg = await this.eventEmitter.emit(stack, arg);
        // }
        // // execute proxies
        // for (const proxyFn of this.settings.rejectProxies || []) {
        //     arg = await proxyFn(arg);
        // }
        // resolve the master promise
        return this._resolvers.reject(arg);
        return arg;
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
            if (this.settings.treatCancelAs === 'reject') {
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
    // catch(...args) {
    //     super.catch(...args);
    //     return this.on('catch', ...args);
    // }
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
        this.eventEmitter.destroy();
        // update the status
        this._promiseState = 'destroyed';
    }
}
export default SPromise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7QUFDVixjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxZQUFZLE1BQU0sNkNBQTZDLENBQUM7QUFNdkUsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFHdEUsbUZBQW1GO0FBQ25GLE9BQU8sY0FHTixNQUFNLGdCQUFnQixDQUFDO0FBcUd4QixNQUFNLFFBQVMsU0FBUSxPQUFPO0lBNkYxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNILFlBQ0ksb0JBQW9CLEdBQUcsRUFBRSxFQUN6QixRQUF5Qzs7UUFFekMsYUFBYTtRQUNiLElBQUksVUFBVSxFQUNWLEtBQUssRUFDTCxTQUFTLEdBQVEsRUFBRSxDQUFDO1FBRXhCLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0QixTQUFTLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUM1QixTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUMxQixvQ0FBb0M7WUFDcEMsdUJBQXVCO1lBQ3ZCLEtBQUs7WUFFTCwrREFBK0Q7WUFDL0Qsd0NBQXdDO1lBQ3hDLHdDQUF3QztZQUN4QywyREFBMkQ7WUFDM0QsdUNBQXVDO1lBQ3ZDLCtCQUErQjtZQUMvQixtQkFBbUI7WUFDbkIsZ0RBQWdEO1lBQ2hELCtCQUErQjtZQUMvQixZQUFZO1lBQ1osU0FBUztZQUNULE1BQU07UUFDVixDQUFDLENBQUMsQ0FBQztRQW5FQyxrQkFBYSxHQUF1QixTQUFTLENBQUM7UUFxRWxELElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUN2QjtZQUNJLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLGNBQWMsRUFBRSxDQUFDO1lBQ2pCLG9CQUFvQixFQUFFLEtBQUs7WUFDM0Isd0JBQXdCLEVBQUUsSUFB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
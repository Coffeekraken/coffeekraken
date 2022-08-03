"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const getMethods_1 = __importDefault(require("@coffeekraken/sugar/shared/class/getMethods"));
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
// import __SPromiseSettingsInterface from './interface/SPromiseSettingsInterface';
const treatAsValue_1 = __importDefault(require("./treatAsValue"));
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
        this.settings = (0, deepMerge_1.default)({
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
        this.eventEmitter = new s_event_emitter_1.default((0, deepMerge_1.default)(Object.assign({ metas: Object.assign({}, this.metas) }, ((_a = this.promiseSettings.eventEmitter) !== null && _a !== void 0 ? _a : {}))));
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
            (0, getMethods_1.default)(this).forEach((func) => {
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
        return (0, treatAsValue_1.default)(promise, settings);
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
        return (0, treatAsValue_1.default)(this, settings);
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
exports.default = SPromise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxVQUFVO0FBQ1YsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw2RkFBdUU7QUFNdkUsb0ZBQTREO0FBQzVELDRGQUFzRTtBQUd0RSxtRkFBbUY7QUFDbkYsa0VBR3dCO0FBcUd4QixNQUFNLFFBQVMsU0FBUSxPQUFPO0lBNkYxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNILFlBQ0ksb0JBQW9CLEdBQUcsRUFBRSxFQUN6QixRQUF5Qzs7UUFFekMsYUFBYTtRQUNiLElBQUksVUFBVSxFQUNWLEtBQUssRUFDTCxTQUFTLEdBQVEsRUFBRSxDQUFDO1FBRXhCLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0QixTQUFTLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUM1QixTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUMxQixvQ0FBb0M7WUFDcEMsdUJBQXVCO1lBQ3ZCLEtBQUs7WUFFTCwrREFBK0Q7WUFDL0Qsd0NBQXdDO1lBQ3hDLHdDQUF3QztZQUN4QywyREFBMkQ7WUFDM0QsdUNBQXVDO1lBQ3ZDLCtCQUErQjtZQUMvQixtQkFBbUI7WUFDbkIsZ0RBQWdEO1lBQ2hELCtCQUErQjtZQUMvQixZQUFZO1lBQ1osU0FBUztZQUNULE1BQU07UUFDVixDQUFDLENBQUMsQ0FBQztRQW5FQyxrQkFBYSxHQUF1QixTQUFTLENBQUM7UUFxRWxELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBQSxtQkFBVyxFQUN2QjtZQUNJLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLGNBQWMsRUFBRSxDQUFDO1lBQ2pCLG9CQUFvQixFQUFFLEtBQUs7WUFDM0Isd0JBQXdCLEVBQUUsSUFBSTtZQUM5QixxQkFBcUIsRUFBRSxLQUFLO1lBQzVCLG1CQUFtQixFQUFFLEtBQUs7WUFDMUIsY0FBYyxFQUFFLEVBQUU7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
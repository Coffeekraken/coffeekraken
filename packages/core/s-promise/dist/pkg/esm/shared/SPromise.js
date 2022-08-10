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
import __SClass from '@coffeekraken/s-class';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SLog from '@coffeekraken/s-log';
import __getMethods from '@coffeekraken/sugar/shared/class/getMethods';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __wait from '@coffeekraken/sugar/shared/time/wait';
// import __SPromiseSettingsInterface from './interface/SPromiseSettingsInterface';
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
        var _a;
        // @ts-ignore
        let executorFn, _this, resolvers = {};
        super(__deepMerge({
            promise: {
                treatCancelAs: 'resolve',
                destroyTimeout: 1,
                preventRejectOnThrow: false,
                emitLogErrorEventOnThrow: true,
                resolveAtResolveEvent: false,
                rejectAtRejectEvent: false,
                resolveProxies: [],
                rejectProxies: [],
            },
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
        }, (_a = this.settings.eventEmitter) !== null && _a !== void 0 ? _a : {}));
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
            ],
        });
        this.bind = this._eventEmitter.bind.bind(this);
        this._resolvers = resolvers;
        if (this.promiseSettings.destroyTimeout !== -1) {
            this.on('finally', (v, m) => {
                setTimeout(() => {
                    this.destroy();
                }, this.promiseSettings.destroyTimeout);
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
     * @async
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
        return new SPromise(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
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
                        if (promise instanceof SPromise) {
                            pipe(promise);
                        }
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
        var _a;
        return (_a = this.settings.promise) !== null && _a !== void 0 ? _a : this.settings;
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
                this.settings.promise.resolveProxies.push(proxy);
            }
            else if (a === 'reject') {
                this.settings.promise.rejectProxies.push(proxy);
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
            for (const proxyFn of this.settings.promise.resolveProxies || []) {
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
            for (const proxyFn of this.settings.promise.rejectProxies || []) {
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
            if (this.settings.promise.treatCancelAs === 'reject') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7QUFDVixjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFLN0MsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxZQUFZLE1BQU0sNkNBQTZDLENBQUM7QUFDdkUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxNQUFNLE1BQU0sc0NBQXNDLENBQUM7QUFDMUQsbUZBQW1GO0FBQ25GLE9BQU8sY0FHTixNQUFNLGdCQUFnQixDQUFDO0FBZ0d4QixNQUFNLFFBQ0YsU0FBUSxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQW1HakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSCxZQUNJLG9CQUFvQixHQUFHLEVBQUUsRUFDekIsUUFBcUM7O1FBRXJDLGFBQWE7UUFDYixJQUFJLFVBQVUsRUFDVixLQUFLLEVBQ0wsU0FBUyxHQUFRLEVBQUUsQ0FBQztRQUV4QixLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksT0FBTyxFQUFFO2dCQUNMLGFBQWEsRUFBRSxTQUFTO2dCQUN4QixjQUFjLEVBQUUsQ0FBQztnQkFDakIsb0JBQW9CLEVBQUUsS0FBSztnQkFDM0Isd0JBQXdCLEVBQUUsSUFBSTtnQkFDOUIscUJBQXFCLEVBQUUsS0FBSztnQkFDNUIsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsY0FBYyxFQUFFLEVBQUU7Z0JBQ2xCLGFBQWEsRUFBRSxFQUFFO2FBQ3BCO1NBQ0osRUFDRCxPQUFPLG9CQUFvQixLQUFLLFFBQVE7WUFDcEMsQ0FBQyxDQUFDLG9CQUFvQjtZQUN0QixDQUFDLENBQUMsRUFBRSxFQUNSLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsRUFDRCxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNoQixTQUFTLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUM1QixJQUFJLE9BQU8sQ0FBQyxDQUFDLG9CQUFvQixFQUFFLG1CQUFtQixFQUFFLEVBQUU7Z0JBQ3RELFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO29CQUMzQixtQkFBbUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUM3QixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLEVBQUU7d0JBQzNDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO3FCQUNwQjt5QkFBTTt3QkFDSCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztxQkFDbkI7Z0JBQ0wsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQ0osQ0FBQztRQWxGRSxrQkFBYSxHQUF1QixTQUFTLENBQUM7UUFvRmxELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxlQUFlLENBQ3BDLFdBQVcsQ0FDUDtZQUNJLEtBQUssb0JBQ0UsSUFBSSxDQUFDLEtBQUssQ0FDaEI7U0FDSixFQUNELE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLG1DQUFJLEVBQUUsQ0FDbkMsQ0FDSixDQUFDO1FBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQzVCLEVBQUUsRUFBRSxjQUFjO1lBQ2xCLEtBQUssRUFBRTtnQkFDSCxJQUFJO2dCQUNKLEtBQUs7Z0JBQ0wsTUFBTTtnQkFDTixNQUFNO2dCQUNOLFlBQVk7Z0JBQ1osVUFBVTtnQkFDVixRQUFRO2FBQ1g7U0FDSixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsVUFBVSxHQUF1QixTQUFTLENBQUM7UUFFaEQsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEIsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDWixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCwyQ0FBMkM7UUFDM0MsMENBQTBDO1FBQzFDLFVBQVU7WUFDTixPQUFPLG9CQUFvQixLQUFLLFVBQVU7Z0JBQ3RDLENBQUMsQ0FBQyxvQkFBb0I7Z0JBQ3RCLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDZixJQUFJLFVBQVUsRUFBRTtZQUNaLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNmLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDaEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO29CQUFFLE9BQU87Z0JBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsQ0FBQyxHQUFTLEVBQUU7Z0JBQ1IsTUFBTSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUk7b0JBQ0EsTUFBTSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3pCO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNSLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyx3QkFBd0IsRUFBRTt3QkFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7NEJBQ2IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxVQUFVOzRCQUN2QixLQUFLLEVBQUUsQ0FBQzt5QkFDWCxDQUFDLENBQUM7cUJBQ047b0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbEI7WUFDTCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxxQkFBcUIsRUFBRTtZQUM1QyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFO1lBQzFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxzQkFBc0I7UUFDdEIsK0JBQStCO1FBQy9CLE1BQU07SUFDVixDQUFDO0lBOU9EOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FDUixRQUE0QyxFQUM1QyxNQUFpQixFQUNqQixLQUFnQjtRQUVoQixPQUFPLElBQUksUUFBUSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDcEQsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNWLFNBQWUsSUFBSTs7b0JBQ2YsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUMsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNqQyxJQUFJLE9BQU8sT0FBTyxLQUFLLFVBQVU7d0JBQUUsT0FBTyxHQUFHLE9BQU8sRUFBRSxDQUFDO29CQUN2RCxJQUFJO3dCQUNBLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUMxQixJQUFJLE1BQU07NEJBQUUsTUFBTSxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUM1QyxJQUFJLE9BQU8sWUFBWSxRQUFRLEVBQUU7NEJBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDakI7d0JBQ0QsSUFBSSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUM7d0JBQ3hCLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7d0JBQ3hCLElBQUksS0FBSyxFQUFFOzRCQUNQLElBQUksUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQzs0QkFDN0MsSUFBSSxRQUFRLEtBQUssU0FBUztnQ0FBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDO3lCQUMzRDt3QkFDRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFOzRCQUM5QixJQUFJLEVBQUUsQ0FBQzt5QkFDVjs2QkFBTTs0QkFDSCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7eUJBQ3BCO3FCQUNKO29CQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUNSLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDbkI7b0JBQ0QsQ0FBQyxFQUFFLENBQUM7Z0JBQ1IsQ0FBQzthQUFBO1lBQ0QsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLFlBQVksQ0FDZixPQUFxQixFQUNyQixXQUFrQyxFQUFFO1FBRXBDLE9BQU8sY0FBYyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBT0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxlQUFlOztRQUNmLE9BQU8sTUFBTSxJQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sbUNBQVUsSUFBSyxDQUFDLFFBQVEsQ0FBQztJQUNoRSxDQUFDO0lBa0pELDhDQUE4QztJQUM5QywwQ0FBMEM7SUFDMUMsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN2QixPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsMkNBQTJDO0lBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3BCLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsSUFBSSxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILFlBQVksQ0FBQyxXQUFrQyxFQUFFO1FBQzdDLE9BQU8sY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILGFBQWEsQ0FDVCxLQUFpRSxFQUNqRSxLQUFVO1FBRVYsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNiLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwRDtpQkFBTSxJQUFJLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbkQ7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsRUFBRSxDQUFDLE1BQU07UUFDTCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDM0QsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUNoRSxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsU0FBUztRQUNMLE9BQU8sSUFBSSxDQUFDLGFBQWEsS0FBSyxTQUFTLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFVBQVU7UUFDTixPQUFPLElBQUksQ0FBQyxhQUFhLEtBQUssVUFBVSxDQUFDO0lBQzdDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxVQUFVO1FBQ04sT0FBTyxJQUFJLENBQUMsYUFBYSxLQUFLLFVBQVUsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLGFBQWEsS0FBSyxVQUFVLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFdBQVc7UUFDUCxPQUFPLElBQUksQ0FBQyxhQUFhLEtBQUssV0FBVyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxPQUFPLENBQUMsR0FBRyxFQUFFLFdBQVcsR0FBRyxpQkFBaUI7UUFDeEMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsV0FBVyxHQUFHLGlCQUFpQjs7WUFDL0MsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLFdBQVc7Z0JBQUUsT0FBTztZQUMvQyxvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7WUFDaEMseUJBQXlCO1lBQ3pCLE1BQU0sZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzlDLE1BQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDbEQ7WUFDRCxrQkFBa0I7WUFDbEIsS0FBSyxNQUFNLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLElBQUksRUFBRSxFQUFFO2dCQUM5RCxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDNUI7WUFDRCw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsMEJBQTBCO1lBQzFCLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQztLQUFBO0lBSUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLEdBQUcsRUFBRSxXQUFXLEdBQUcsc0JBQXNCO1FBQzVDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDRyxPQUFPLENBQUMsR0FBRyxFQUFFLFdBQVcsR0FBRyxzQkFBc0I7O1lBQ25ELElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxXQUFXO2dCQUFFLE9BQU87WUFDL0Msb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1lBQ2hDLHlCQUF5QjtZQUN6QixNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNyRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM5QyxNQUFNLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2xEO1lBQ0Qsa0JBQWtCO1lBQ2xCLEtBQUssTUFBTSxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLEVBQUUsRUFBRTtnQkFDN0QsR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsNkJBQTZCO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQztLQUFBO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLEdBQVMsRUFBRSxXQUFXLEdBQUcsZ0JBQWdCO1FBQzVDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxPQUFPLENBQUMsR0FBRyxFQUFFLFdBQVcsR0FBRyxnQkFBZ0I7UUFDdkMsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLFdBQVc7WUFBRSxPQUFPO1FBQy9DLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDekMsb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1lBQ2hDLHlCQUF5QjtZQUN6QixNQUFNLGdCQUFnQixHQUFHLFdBQVc7aUJBQy9CLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM5QyxNQUFNLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2xEO1lBQ0QsNkJBQTZCO1lBQzdCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxLQUFLLFFBQVEsRUFBRTtnQkFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDL0I7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEM7WUFDRCwwQkFBMEI7WUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXdCRztJQUNILEtBQUssQ0FBQyxHQUFHLElBQUk7UUFDVCxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsT0FBTyxDQUFDLEdBQUcsSUFBSTtRQUNYLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILE9BQU87UUFDSCw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM3QixvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7SUFDckMsQ0FBQztDQUNKO0FBRUQsZUFBZSxRQUFRLENBQUMifQ==
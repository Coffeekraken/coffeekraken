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
const getMethods_1 = __importDefault(require("../class/getMethods"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const treatAsValue_1 = __importDefault(require("./treatAsValue"));
const SEventEmitter_1 = __importDefault(require("../event/SEventEmitter"));
const SClass_1 = __importDefault(require("../class/SClass"));
class SPromise extends SClass_1.default.extends(Promise) {
    /**
     * @name                  constructor
     * @type                  Function
     *
     * Constructor
     *
     * @param         {Function}          executor          The executor function that will receive the resolve and reject ones...
     * @param         {Object}            [settings={}]     An object of settings for this particular SPromise instance. Here's the available settings:
     *
     * @example       js
     * const promise = new SPromise(({ resolve, reject, emit }) => {
     *    // do something...
     * }).then(value => {
     *    // do something...
     * }).finally(value => {
     *    // do something...
     * });
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(executorFnOrSettings = {}, settings = {}) {
        // @ts-ignore
        let executorFn, _this, resolvers = {};
        super(deepMerge_1.default({
            promise: {
                treatCancelAs: 'resolve',
                destroyTimeout: 5000
            }
        }, typeof executorFnOrSettings === 'object' ? executorFnOrSettings : {}, settings), (resolve, reject) => {
            resolvers.resolve = resolve;
            new Promise((rejectPromiseResolve, rejectPromiseReject) => {
                resolvers.reject = rejectPromiseReject;
            }).catch((e) => {
                this.emit('catch', e);
            });
        });
        this._promiseState = 'pending';
        // _this = this;
        // const _api = new Proxy(
        //   {},
        //   {
        //     get(target, prop) {
        //       if (_this !== undefined) {
        //         return _this[prop];
        //       } else {
        //         return async (...args) => {
        //           await __wait(0);
        //           const fn = _this[prop].bind(_this);
        //           return fn(...args);
        //         };
        //       }
        //     }
        //   }
        // );
        this.expose(new SEventEmitter_1.default(Object.assign(Object.assign({ id: this.id }, this._settings), { eventEmitter: {
            // asyncStart: true
            } })), {
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
     * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
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
     * @param       {Mixed}         arg           The argument that the promise user is sendind through the resolve function
     * @param       {Array|String}         [stacksOrder='resolve,finally']      This specify in which order have to be called the stacks
     * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
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
            const stacksResult = yield this.eventEmitter._emitEvents(stacksOrder, arg);
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
     * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
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
            const stacksResult = yield this.eventEmitter._emitEvents(stacksOrder, arg);
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
     * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
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
     * @param         {Mixed}           arg           The argument you want to pass to the cancel callbacks
     * @param       {Array|String}         [stacksOrder='cancel,finally']      This specify in which order have to be called the stacks
     * @return        {Promise}                       A simple promise that will be resolved once the promise has been canceled with the cancel stack result as value
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
     * @return          {SPromise}                  The SPromise instance to maintain chainability
     *
     * @example         js
     * new SPromise(({ resolve, reject }) => {
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
     * @return          {SPromise}                  The SPromise instance to maintain chainability
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
     * @return          {SPromise}                  The SPromise instance to maintain chainability
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
     * @return          {SPromise}                  The SPromise instance to maintain chainability
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
     * @return          {Promise}                  A simple promise that will be resolved with the cancel stack result
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
        // destroying all the callbacks stacks registered
        this._settings.promise = undefined;
    }
}
exports.default = SPromise;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb21pc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvbWlzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsVUFBVTtBQUNWLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQscUVBQStDO0FBRS9DLG9FQUE4QztBQUs5QyxrRUFJd0I7QUFDeEIsMkVBQXlFO0FBQ3pFLDZEQUF1QztBQTJHdkMsTUFBTSxRQUFTLFNBQVEsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBMEI5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUNILFlBQVksb0JBQW9CLEdBQUcsRUFBRSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ2xELGFBQWE7UUFDYixJQUFJLFVBQVUsRUFDWixLQUFLLEVBQ0wsU0FBUyxHQUFRLEVBQUUsQ0FBQztRQUV0QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLE9BQU8sRUFBRTtnQkFDUCxhQUFhLEVBQUUsU0FBUztnQkFDeEIsY0FBYyxFQUFFLElBQUk7YUFDckI7U0FDRixFQUNELE9BQU8sb0JBQW9CLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUNwRSxRQUFRLENBQ1QsRUFDRCxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNsQixTQUFTLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUM1QixJQUFJLE9BQU8sQ0FBQyxDQUFDLG9CQUFvQixFQUFFLG1CQUFtQixFQUFFLEVBQUU7Z0JBQ3hELFNBQVMsQ0FBQyxNQUFNLEdBQUcsbUJBQW1CLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQ0YsQ0FBQztRQWhESSxrQkFBYSxHQUF1QixTQUFTLENBQUM7UUFrRHBELGdCQUFnQjtRQUVoQiwwQkFBMEI7UUFDMUIsUUFBUTtRQUNSLE1BQU07UUFDTiwwQkFBMEI7UUFDMUIsbUNBQW1DO1FBQ25DLDhCQUE4QjtRQUM5QixpQkFBaUI7UUFDakIsc0NBQXNDO1FBQ3RDLDZCQUE2QjtRQUM3QixnREFBZ0Q7UUFDaEQsZ0NBQWdDO1FBQ2hDLGFBQWE7UUFDYixVQUFVO1FBQ1YsUUFBUTtRQUNSLE1BQU07UUFDTixLQUFLO1FBRUwsSUFBSSxDQUFDLE1BQU0sQ0FDVCxJQUFJLHVCQUFlLCtCQUNqQixFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFDUixJQUFJLENBQUMsU0FBUyxLQUNqQixZQUFZLEVBQUU7WUFDWixtQkFBbUI7YUFDcEIsSUFDRCxFQUNGO1lBQ0UsRUFBRSxFQUFFLGNBQWM7WUFDbEIsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUM7U0FDM0QsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLFVBQVUsR0FBdUIsU0FBUyxDQUFDO1FBRWhELElBQ2lDLElBQUksQ0FBQyxTQUFVLENBQUMsT0FBTyxDQUFDLGNBQWM7WUFDckUsQ0FBQyxDQUFDLEVBQ0Y7WUFDQSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUIsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDZCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2xCLENBQUMsRUFBaUMsSUFBSSxDQUFDLFNBQVUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDNUUsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELDJDQUEyQztRQUMzQywwQ0FBMEM7UUFDMUMsVUFBVTtZQUNSLE9BQU8sb0JBQW9CLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzNFLElBQUksVUFBVSxFQUFFO1lBQ2QsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2Ysb0JBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO29CQUFFLE9BQU87Z0JBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLDZCQUE2QjtZQUMvQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQXJJRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBQyxZQUFZLENBQ2pCLE9BQXFCLEVBQ3JCLFdBQWtDLEVBQUU7UUFFcEMsT0FBTyxzQkFBYyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBbUhELDhDQUE4QztJQUM5QywwQ0FBMEM7SUFDMUMsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN6QixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsMkNBQTJDO0lBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3RCLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILFlBQVksQ0FBQyxXQUFrQyxFQUFFO1FBQy9DLE9BQU8sc0JBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxFQUFFLENBQUMsTUFBTTtRQUNQLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMzRCxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ2hFLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsYUFBYSxLQUFLLFVBQVUsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLGFBQWEsS0FBSyxVQUFVLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxhQUFhLEtBQUssVUFBVSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsYUFBYSxLQUFLLFdBQVcsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsT0FBTyxDQUFDLEdBQUcsRUFBRSxXQUFXLEdBQUcsaUJBQWlCO1FBQzFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxRQUFRLENBQUMsR0FBRyxFQUFFLFdBQVcsR0FBRyxpQkFBaUI7UUFDM0MsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLFdBQVc7WUFBRSxPQUFPO1FBQy9DLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0Msb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1lBQ2hDLHlCQUF5QjtZQUN6QixNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUN0RCxXQUFXLEVBQ1gsR0FBRyxDQUNKLENBQUM7WUFDRiw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdEMsMEJBQTBCO1lBQzFCLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUlEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxHQUFHLEVBQUUsV0FBVyxHQUFHLHNCQUFzQjtRQUM5QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsT0FBTyxDQUFDLEdBQUcsRUFBRSxXQUFXLEdBQUcsc0JBQXNCO1FBQy9DLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxXQUFXO1lBQUUsT0FBTztRQUMvQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNDLG9CQUFvQjtZQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztZQUNoQyx5QkFBeUI7WUFDekIsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FDdEQsV0FBVyxFQUNYLEdBQUcsQ0FDSixDQUFDO1lBQ0YsNkJBQTZCO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3JDLDBCQUEwQjtZQUMxQixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsR0FBUyxFQUFFLFdBQVcsR0FBRyxnQkFBZ0I7UUFDOUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE9BQU8sQ0FBQyxHQUFHLEVBQUUsV0FBVyxHQUFHLGdCQUFnQjtRQUN6QyxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssV0FBVztZQUFFLE9BQU87UUFDL0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUM7WUFDaEMseUJBQXlCO1lBQ3pCLE1BQU0sWUFBWSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQ3RELFdBQVcsRUFDWCxHQUFHLENBQ0osQ0FBQztZQUNGLDZCQUE2QjtZQUM3QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsS0FBSyxRQUFRLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3ZDO1lBQ0QsMEJBQTBCO1lBQzFCLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxLQUFLLENBQUMsR0FBRyxJQUFJO1FBQ1gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsT0FBTyxDQUFDLEdBQUcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILFFBQVEsQ0FBQyxHQUFHLElBQUk7UUFDZCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxRQUFRLENBQUMsR0FBRyxJQUFJO1FBQ2QsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsUUFBUSxDQUFDLEdBQUcsSUFBSTtRQUNkLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFFBQVE7UUFDTixvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7UUFFakMsaURBQWlEO1FBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxRQUFRLENBQUMifQ==
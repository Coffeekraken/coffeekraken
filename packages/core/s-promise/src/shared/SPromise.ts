// @shared
// @ts-nocheck

import __getMethods from '@coffeekraken/sugar/shared/class/getMethods';
import __SClass from '@coffeekraken/s-class';
import type {
    ISEventEmitter,
    ISEmitterSettings,
} from '@coffeekraken/s-event-emitter';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __SLog from '@coffeekraken/s-log';
// import __SPromiseSettingsInterface from './interface/SPromiseSettingsInterface';
import __treatAsValue, {
    ITreatAsValueProxy,
    ITreatAsValueSettings,
} from './treatAsValue';

/**
 * @name                  SPromise
 * @namespace           shared
 * @type                  Class
 * @status                beta
 *
 * This class works the same as the default Promise one. The difference is that you have more control on this one like
 * the possibility to resolve it multiple times. Here's a list of the "differences" and the "features" that this class provide:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      Add a "pipe" capabilities on events to allow for "throttle", "debounce", etc...
 * @feature       Something cool
 *
 * @example         js
 * import SPromise from '@coffeekraken/s-promise';
 * function myCoolFunction() {
 *    return new SPromise(({ resolve, reject, emit }) => {
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
 * });
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

type ISPromiseStateType =
    | 'pending'
    | 'resolved'
    | 'rejected'
    | 'canceled'
    | 'destroyed';

export interface ISPromiseSettings {
    treatCancelAs: string;
    destroyTimeout: number;
    emitLogErrorEventOnThrow: boolean;
    preventRejectOnThrow: boolean;
    resolveAtResolveEvent: boolean;
    rejectAtRejectEvent: boolean;
    resolveProxies: Function[];
    rejectProxies: Function[];
    eventEmitter: Partial<ISEmitterSettings>;
    [key: string]: any;
}

export interface ISPromiseResolveFn {
    (arg: any, stacksOrder: string): Promise<any>;
}
export interface ISPromiseRejectFn {
    (arg: any, stacksOrder: string): Promise<any>;
}
export interface ISPromiseCancelFn {
    (arg: any): void;
}

export interface ISPromiseResolvers {
    reject: any;
    resolve: any;
}

export interface ISPromise extends Promise, ISEventEmitter {
    _promiseState: ISPromiseStateType;
    _resolvers?: ISPromiseResolvers;
    readonly promiseState: string;
    then(...args): any;
    is(status: ISPromiseStateType): boolean;
    isPending(): boolean;
    isResolved(): boolean;
    isRejected(): boolean;
    isCanceled(): boolean;
    isDestroyed(): boolean;
    resolve: ISPromiseResolveFn;
    reject: ISPromiseRejectFn;
    cancel: ISPromiseCancelFn;
    on(event: string, callback: any): ISEventEmitter;
    catch(...args: any): ISPromise;
    finally(...args: any): ISPromise;
}

class SPromise extends __SClass.extends(Promise)
    implements ISPromise, ISEventEmitter {
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
    static queue(
        promises: Record<string, Promise | Function>,
        before?: Function,
        after?: Function,
    ): Promise<Promise[]> {
        return new SPromise(async ({ resolve, reject }) => {
            const results = {};
            let i = 0;
            async function next() {
                const firstKey = Object.keys(promises)[0];
                let promise = promises[firstKey];
                if (typeof promise === 'function') promise = promise();
                try {
                    delete promises[firstKey];
                    if (before) await before(firstKey, promise);
                    let res = await promise;
                    results[firstKey] = res;
                    if (after) {
                        let afterRes = await after(firstKey, result);
                        if (afterRes !== undefined) result[firstKey] = afterRes;
                    }
                    if (Object.keys(promises).length) {
                        next();
                    } else {
                        resolve(results);
                    }
                } catch (e) {
                    reject(promise);
                }
                i++;
            }
            next();
        });
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
    static treatAsValue(
        promise: Promise<any>,
        settings: ITreatAsValueSettings = {},
    ): ITreatAsValueProxy {
        return __treatAsValue(promise, settings);
    }

    private _promiseState: ISPromiseStateType = 'pending';
    private _resolvers: ISPromiseResolvers;

    on: any;

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
    get promiseSettings(): ISPromiseSettings {
        return (<any>this).settings.promise ?? (<any>this).settings;
    }

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
    constructor(
        executorFnOrSettings = {},
        settings?: Partial<ISPromiseSettings>,
    ) {
        // @ts-ignore
        let executorFn,
            _this,
            resolvers: any = {};

        super(
            __deepMerge(
                {
                    promise: {
                        treatCancelAs: 'resolve',
                        destroyTimeout: 1,
                        preventRejectOnThrow: true,
                        emitLogErrorEventOnThrow: true,
                        resolveAtResolveEvent: false,
                        rejectAtRejectEvent: false,
                        resolveProxies: [],
                        rejectProxies: [],
                    },
                },
                typeof executorFnOrSettings === 'object'
                    ? executorFnOrSettings
                    : {},
                settings ?? {},
            ),
            (resolve, reject) => {
                resolvers.resolve = resolve;
                new Promise((rejectPromiseResolve, rejectPromiseReject) => {
                    resolvers.reject = (...args) => {
                        rejectPromiseReject(...args);
                        if (this.promiseSettings.preventRejectOnThrow) {
                            resolve(...args);
                        } else {
                            reject(...args);
                        }
                    };
                }).catch((e) => {
                    this.emit('catch', e);
                });
            },
        );

        this._eventEmitter = new __SEventEmitter(
            __deepMerge(
                {
                    metas: {
                        ...this.metas,
                    },
                },
                this.settings.eventEmitter ?? {},
            ),
        );

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

        this._resolvers = <ISPromiseResolvers>resolvers;

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
                if (func.slice(0, 1) === '_') return;
                api[func] = this[func].bind(this);
            });
            (async () => {
                await __wait(0);
                try {
                    await executorFn(api);
                } catch (e) {
                    if (this.promiseSettings.emitLogErrorEventOnThrow) {
                        this.emit('log', {
                            type: __SLog.TYPE_ERROR,
                            value: e,
                        });
                    }
                    this.reject(e);
                }
            })();
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
    treatAsValue(settings: ITreatAsValueSettings = {}): ITreatAsValueProxy {
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
    registerProxy(
        point: 'resolve' | 'reject' | 'resolve,reject' | 'reject,resolve',
        proxy: any,
    ): void {
        const ar = point.split(',').map((l) => l.trim());
        ar.forEach((a) => {
            if (a === 'resolve') {
                this.settings.promise.resolveProxies.push(proxy);
            } else if (a === 'reject') {
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
        if (statusArray.indexOf(this._promiseState) !== -1) return true;
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
    async _resolve(arg, stacksOrder = 'resolve,finally') {
        if (this._promiseState === 'destroyed') return;
        // update the status
        this._promiseState = 'resolved';
        // exec the wanted stacks
        const stacksOrderArray = stacksOrder.split(',').map((l) => l.trim());
        for (let i = 0; i < stacksOrderArray.length; i++) {
            const stack = stacksOrderArray[i];
            arg = await this.eventEmitter.emit(stack, arg);
        }
        // execute proxies
        for (const proxyFn of this.settings.promise.resolveProxies || []) {
            arg = await proxyFn(arg);
        }
        // resolve the master promise
        this._resolvers.resolve(arg);
        // return the stack result
        return arg;
    }

    then<R, E2 = E>(f: (r: T) => R): Promisish<R, E>;

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
    async _reject(arg, stacksOrder = `catch,reject,finally`) {
        if (this._promiseState === 'destroyed') return;
        // update the status
        this._promiseState = 'rejected';
        // exec the wanted stacks
        const stacksOrderArray = stacksOrder.split(',').map((l) => l.trim());
        for (let i = 0; i < stacksOrderArray.length; i++) {
            const stack = stacksOrderArray[i];
            arg = await this.eventEmitter.emit(stack, arg);
        }
        // execute proxies
        for (const proxyFn of this.settings.promise.rejectProxies || []) {
            arg = await proxyFn(arg);
        }
        // resolve the master promise
        this._resolvers.reject(arg);
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
    cancel(arg?: any, stacksOrder = 'cancel,finally') {
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
        if (this._promiseState === 'destroyed') return;
        return new Promise(async (resolve, reject) => {
            // update the status
            this._promiseState = 'canceled';
            // exec the wanted stacks
            const stacksOrderArray = stacksOrder
                .split(',')
                .map((l) => l.trim());
            for (let i = 0; i < stacksOrderArray.length; i++) {
                const stack = stacksOrderArray[i];
                arg = await this.eventEmitter.emit(stack, arg);
            }
            // resolve the master promise
            if (this.settings.promise.treatCancelAs === 'reject') {
                this._resolvers.reject(arg);
            } else {
                this._resolvers.resolve(arg);
            }
            // return the stack result
            resolve(arg);
        });
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

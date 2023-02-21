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
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SPromise from '@coffeekraken/s-promise';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
class SProcessManagerProcessWrapper extends __SEventEmitter {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(processInstance, settings) {
        super(__deepMerge({
            stdio: 'inherit',
            restart: false,
            log: {
                filter: undefined,
            },
        }, settings));
        this._isDetached = false;
        this._currentProcessPromise = null;
        // default restart settings
        const restartDefaultSettings = {
            on: 'reject',
            maxTimes: -1,
            maxEvery: -1,
            delay: 0,
            before: undefined,
        };
        if (this.settings.restart === true) {
            this.settings.restart = restartDefaultSettings;
        }
        else if (__isPlainObject(this.settings.restart)) {
            this.settings.restart = Object.assign(Object.assign({}, restartDefaultSettings), this.settings.restart);
        }
        processInstance.settings.stdio = false;
        this.processInstance = processInstance;
    }
    /**
     * @name          initialParams
     * @type          Object
     *
     * Store the initial params object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get initialParams() {
        return Object.assign({}, this.settings.initialParams);
    }
    /**
     * @name          processManagerProcessSettings
     * @type          ISProcessManagerProcessWrapperSettings
     * @get
     *
     * Access the process manager process settings
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get processManagerProcessSettings() {
        return this.settings.processManagerProcess;
    }
    _handleRestartFor(processPromise) {
        if (this._isDetached)
            return;
        this._currentProcessPromise = processPromise;
        processPromise.on('reject', (value, metas) => __awaiter(this, void 0, void 0, function* () {
            if (this._isDetached)
                return;
            yield __wait(0);
            this.emit('log', {
                group: `s-process-manager-process-wrapper-${this.metas.id}`,
                value: `The process "<yellow>${this.metas.id}</yellow>" has been stoped after a(n) <red>${this.processInstance.lastExecutionObj.state}</red> after <cyan>${this.processInstance.lastExecutionObj.formatedDuration}</cyan> of execution`,
            });
            // maxEvery
            if (this.settings.restart.maxEvery > 0) {
                if (this.processInstance.lastExecutionObj.endTime +
                    this.settings.restart.maxEvery >=
                    Date.now()) {
                    this.emit('log', {
                        group: `s-process-manager-process-wrapper-${this.metas.id}`,
                        value: `The process "<yellow>${this.metas.id}</yellow>" will not being restarted cause it has crashed before the <cyan>maxEvery</cyan> setting setted to <magenta>${this.settings.restart.maxEvery}ms</magenta>`,
                    });
                    // resolving the global run promise
                    if (this._restartingProcessResolve &&
                        !this._isDetached) {
                        this._restartingProcessResolve(this.processInstance.executionsStack);
                    }
                    return;
                }
            }
            // maxTimes
            if (this.settings.restart.maxTimes > 0) {
                if (this.processInstance.executionsStack.length >=
                    this.settings.restart.maxTimes) {
                    this.emit('log', {
                        group: `s-process-manager-process-wrapper-${this.metas.id}`,
                        value: `The process "<yellow>${this.metas.id}</yellow>" will not being restarted cause it has reached the <cyan>maxTimes</cyan> setting setted to <magenta>${this.settings.restart.maxTimes}</magenta>`,
                    });
                    // resolving the global run promise
                    if (this._restartingProcessResolve &&
                        !this._isDetached) {
                        this._restartingProcessResolve(this.processInstance.executionsStack);
                    }
                    return;
                }
            }
            let newProcessArgs = Object.assign({}, this.processInstance.lastExecutionObj.params);
            // tweak params if a function is passed through settings
            if (this.settings.restart.before &&
                typeof this.settings.restart.before === 'function') {
                newProcessArgs = yield this.settings.restart.before(this.processInstance.lastExecutionObj);
            }
            // of the "before" callback returns a nullysh value, do not restart
            if (!newProcessArgs) {
                this.emit('log', {
                    group: `s-process-manager-process-wrapper-${this.metas.id}`,
                    value: `Stop restarting the process "<yellow>${this.metas.id}</yellow>"`,
                });
                // resolving the global run promise
                if (this._restartingProcessResolve && !this._isDetached) {
                    this._restartingProcessResolve(this.processInstance.executionsStack);
                }
                return;
            }
            if (this.settings.restart.delay)
                this.emit(`log`, {
                    group: `s-process-manager-process-wrapper-${this.metas.id}`,
                    value: `Waiting <cyan>${this.settings.restart.delay / 1000}s</cyan> before restart...`,
                });
            yield __wait(this.settings.restart.delay);
            this.emit('log', {
                group: `s-process-manager-process-wrapper-${this.metas.id}`,
                value: `Restarting process "<yellow>${this.metas.id}</yellow>"`,
            });
            // restart process
            this._run(newProcessArgs.params, newProcessArgs.settings);
        }), {
            id: 'restartHandler',
        });
    }
    /**
     * @name        detach
     * @type        Function
     *
     * This method has to be called by the process manager when this process has been detached
     * in order to clear some listeners, etc...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    detach() {
        this._isDetached = true;
        if (this._currentProcessPromise)
            this._currentProcessPromise.off('restartHandler');
    }
    _run(paramsOrStringArgs = {}, settings = {}) {
        if (this._isDetached)
            return;
        const promise = this.processInstance.run(paramsOrStringArgs, settings);
        // handle restart
        if (this.settings.restart)
            this._handleRestartFor(promise);
        // promise.on('*', (e) => {
        //     console.log('_', e);
        // });
        // promise.then((res) => {
        //     console.log('A___A', res);
        // });
        // this.pipe(promise, {
        //     overrideEmitter: true,
        // });
        return promise;
    }
    run(paramsOrStringArgs = {}, settings = {}) {
        if (this._isDetached) {
            throw new Error(`Sorry but you cannot run this "<yellow>${this.metas.id}</yellow>" process cause it has been detached from the process manager`);
        }
        return new __SPromise(({ resolve, pipe }) => __awaiter(this, void 0, void 0, function* () {
            this._restartingProcessResolve = resolve;
            // run the process
            const resPromise = this._run(paramsOrStringArgs, settings);
            pipe(resPromise);
            const res = yield resPromise;
            // if restart is setted, do not resolve the promis
            if (!this.settings.restart && !this._isDetached) {
                // console.log('AAAAAAAAAAAA', res);
                resolve(res);
            }
        }), {
            metas: {
                id: typeof paramsOrStringArgs === 'String'
                    ? paramsOrStringArgs
                    : this.constructor.name,
            },
        });
    }
}
export default SProcessManagerProcessWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFHZCxPQUFPLGVBRU4sTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQThDekQsTUFBTSw2QkFBOEIsU0FBUSxlQUFlO0lBeUN2RDs7Ozs7Ozs7T0FRRztJQUNILFlBQ0ksZUFBZSxFQUNmLFFBQTBEO1FBRTFELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxLQUFLLEVBQUUsU0FBUztZQUNoQixPQUFPLEVBQUUsS0FBSztZQUNkLEdBQUcsRUFBRTtnQkFDRCxNQUFNLEVBQUUsU0FBUzthQUNwQjtTQUNKLEVBQ0QsUUFBUSxDQUNYLENBQ0osQ0FBQztRQTFCTixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQWdEcEIsMkJBQXNCLEdBQUcsSUFBSSxDQUFDO1FBcEIxQiwyQkFBMkI7UUFDM0IsTUFBTSxzQkFBc0IsR0FBRztZQUMzQixFQUFFLEVBQUUsUUFBUTtZQUNaLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDWixRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ1osS0FBSyxFQUFFLENBQUM7WUFDUixNQUFNLEVBQUUsU0FBUztTQUNwQixDQUFDO1FBQ0YsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7U0FDbEQ7YUFBTSxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQy9D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
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
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
class SProcessManagerProcessWrapper extends __SEventEmitter {
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(processInstance, settings) {
        super(__deepMerge({
            processManagerProcess: {
                stdio: 'inherit',
                restart: false,
                log: {
                    filter: undefined,
                },
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
        if (this.processManagerProcessSettings.restart === true) {
            this.processManagerProcessSettings.restart = restartDefaultSettings;
        }
        else if (__isPlainObject(this.processManagerProcessSettings.restart)) {
            this.processManagerProcessSettings.restart = Object.assign(Object.assign({}, restartDefaultSettings), this.processManagerProcessSettings.restart);
        }
        processInstance.processSettings.stdio = false;
        this.processInstance = processInstance;
    }
    /**
     * @name          initialParams
     * @type          Object
     *
     * Store the initial params object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get initialParams() {
        return Object.assign({}, this._settings.initialParams);
    }
    /**
     * @name          processManagerProcessSettings
     * @type          ISProcessManagerProcessWrapperSettings
     * @get
     *
     * Access the process manager process settings
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get processManagerProcessSettings() {
        return this._settings.processManagerProcess;
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
            if (this.processManagerProcessSettings.restart.maxEvery > 0) {
                if (this.processInstance.lastExecutionObj.endTime +
                    this.processManagerProcessSettings.restart
                        .maxEvery >=
                    Date.now()) {
                    this.emit('log', {
                        group: `s-process-manager-process-wrapper-${this.metas.id}`,
                        value: `The process "<yellow>${this.metas.id}</yellow>" will not being restarted cause it has crashed before the <cyan>maxEvery</cyan> setting setted to <magenta>${this.processManagerProcessSettings.restart.maxEvery}ms</magenta>`,
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
            if (this.processManagerProcessSettings.restart.maxTimes > 0) {
                if (this.processInstance.executionsStack.length >=
                    this.processManagerProcessSettings.restart.maxTimes) {
                    this.emit('log', {
                        group: `s-process-manager-process-wrapper-${this.metas.id}`,
                        value: `The process "<yellow>${this.metas.id}</yellow>" will not being restarted cause it has reached the <cyan>maxTimes</cyan> setting setted to <magenta>${this.processManagerProcessSettings.restart.maxTimes}</magenta>`,
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
            if (this.processManagerProcessSettings.restart.before &&
                typeof this.processManagerProcessSettings.restart.before ===
                    'function') {
                newProcessArgs =
                    yield this.processManagerProcessSettings.restart.before(this.processInstance.lastExecutionObj);
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
            if (this.processManagerProcessSettings.restart.delay)
                this.emit(`log`, {
                    group: `s-process-manager-process-wrapper-${this.metas.id}`,
                    value: `Waiting <cyan>${this.processManagerProcessSettings.restart.delay /
                        1000}s</cyan> before restart...`,
                });
            yield __wait(this.processManagerProcessSettings.restart.delay);
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
        if (this.processManagerProcessSettings.restart)
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
            if (!this.processManagerProcessSettings.restart &&
                !this._isDetached) {
                // console.log('AAAAAAAAAAAA', res);
                resolve(res);
            }
        }), {
            id: 'plop',
            metas: {
                id: 'coco',
            },
        });
    }
}
export default SProcessManagerProcessWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyUHJvY2Vzc1dyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzc01hbmFnZXJQcm9jZXNzV3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxlQUVOLE1BQU0sK0JBQStCLENBQUM7QUFDdkMsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxNQUFNLE1BQU0sc0NBQXNDLENBQUM7QUFFMUQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFpRHhFLE1BQU0sNkJBQThCLFNBQVEsZUFBZTtJQXlDdkQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUNJLGVBQWUsRUFDZixRQUE4RDtRQUU5RCxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0kscUJBQXFCLEVBQUU7Z0JBQ25CLEtBQUssRUFBRSxTQUFTO2dCQUNoQixPQUFPLEVBQUUsS0FBSztnQkFDZCxHQUFHLEVBQUU7b0JBQ0QsTUFBTSxFQUFFLFNBQVM7aUJBQ3BCO2FBQ0o7U0FDSixFQUNELFFBQVEsQ0FDWCxDQUNKLENBQUM7UUE1Qk4sZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFvRHBCLDJCQUFzQixHQUFHLElBQUksQ0FBQztRQXRCMUIsMkJBQTJCO1FBQzNCLE1BQU0sc0JBQXNCLEdBQUc7WUFDM0IsRUFBRSxFQUFFLFFBQVE7WUFDWixRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ1osUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNaLEtBQUssRUFBRSxDQUFDO1lBQ1IsTUFBTSxFQUFFLFNBQVM7U0FDcEIsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDckQsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztTQUN2RTthQUFNLElBQ0gsZUFB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
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
                    filter: undefined
                }
            }
        }, settings));
        this._isDetached = false;
        this._currentProcessPromise = null;
        // default restart settings
        const restartDefaultSettings = {
            on: 'reject',
            maxTimes: -1,
            maxEvery: -1,
            delay: 0,
            before: undefined
        };
        if (this.processManagerProcessSettings.restart === true) {
            this.processManagerProcessSettings.restart = restartDefaultSettings;
        }
        else if (__isPlainObject(this.processManagerProcessSettings.restart)) {
            this.processManagerProcessSettings.restart = Object.assign(Object.assign({}, restartDefaultSettings), this.processManagerProcessSettings.restart);
        }
        // processInstance.processSettings.emitErrorAsEvent = true;
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
                value: `The process "<yellow>${this.metas.id}</yellow>" has been stoped after a(n) <red>${this.processInstance.lastExecutionObj.state}</red> after <cyan>${this.processInstance.lastExecutionObj.formatedDuration}</cyan> of execution`
            });
            // maxEvery
            if (this.processManagerProcessSettings.restart.maxEvery > 0) {
                if (this.processInstance.lastExecutionObj.endTime +
                    this.processManagerProcessSettings.restart.maxEvery >=
                    Date.now()) {
                    this.emit('log', {
                        group: `s-process-manager-process-wrapper-${this.metas.id}`,
                        value: `The process "<yellow>${this.metas.id}</yellow>" will not being restarted cause it has crashed before the <cyan>maxEvery</cyan> setting setted to <magenta>${this.processManagerProcessSettings.restart.maxEvery}ms</magenta>`
                    });
                    // resolving the global run promise
                    if (this._restartingProcessResolve && !this._isDetached) {
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
                        value: `The process "<yellow>${this.metas.id}</yellow>" will not being restarted cause it has reached the <cyan>maxTimes</cyan> setting setted to <magenta>${this.processManagerProcessSettings.restart.maxTimes}</magenta>`
                    });
                    // resolving the global run promise
                    if (this._restartingProcessResolve && !this._isDetached) {
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
                newProcessArgs = yield this.processManagerProcessSettings.restart.before(this.processInstance.lastExecutionObj);
            }
            // of the "before" callback returns a nullysh value, do not restart
            if (!newProcessArgs) {
                this.emit('log', {
                    group: `s-process-manager-process-wrapper-${this.metas.id}`,
                    value: `Stop restarting the process "<yellow>${this.metas.id}</yellow>"`
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
                    value: `Waiting <cyan>${this.processManagerProcessSettings.restart.delay / 1000}s</cyan> before restart...`
                });
            yield __wait(this.processManagerProcessSettings.restart.delay);
            this.emit('log', {
                group: `s-process-manager-process-wrapper-${this.metas.id}`,
                value: `Restarting process "<yellow>${this.metas.id}</yellow>"`
            });
            // restart process
            this._run(newProcessArgs.params, newProcessArgs.settings);
        }), {
            id: 'restartHandler'
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
        this.pipe(promise, {
            overrideEmitter: true
        });
        return promise;
    }
    run(paramsOrStringArgs = {}, settings = {}) {
        if (this._isDetached) {
            throw new Error(`Sorry but you cannot run this "<yellow>${this.metas.id}</yellow>" process cause it has been detached from the process manager`);
        }
        return new __SPromise(({ resolve }) => __awaiter(this, void 0, void 0, function* () {
            this._restartingProcessResolve = resolve;
            // run the process
            const res = yield this._run(paramsOrStringArgs, settings);
            // if restart is setted, do not resolve the promis
            if (!this.processManagerProcessSettings.restart && !this._isDetached) {
                resolve(res);
            }
        }));
    }
}
export default SProcessManagerProcessWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyUHJvY2Vzc1dyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzc01hbmFnZXJQcm9jZXNzV3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxNQUFNLE1BQU0sc0NBQXNDLENBQUM7QUFFMUQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFtRHhFLE1BQU0sNkJBQThCLFNBQVEsZUFBZTtJQXlDekQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUNFLGVBQWUsRUFDZixRQUE4RDtRQUU5RCxLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UscUJBQXFCLEVBQUU7Z0JBQ3JCLEtBQUssRUFBRSxTQUFTO2dCQUNoQixPQUFPLEVBQUUsS0FBSztnQkFDZCxHQUFHLEVBQUU7b0JBQ0gsTUFBTSxFQUFFLFNBQVM7aUJBQ2xCO2FBQ0Y7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUE1QkosZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFtRHBCLDJCQUFzQixHQUFHLElBQUksQ0FBQztRQXJCNUIsMkJBQTJCO1FBQzNCLE1BQU0sc0JBQXNCLEdBQUc7WUFDN0IsRUFBRSxFQUFFLFFBQVE7WUFDWixRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ1osUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNaLEtBQUssRUFBRSxDQUFDO1lBQ1IsTUFBTSxFQUFFLFNBQVM7U0FDbEIsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDdkQsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztTQUNyRTthQUFNLElBQUksZUFB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
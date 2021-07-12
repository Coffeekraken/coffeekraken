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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyUHJvY2Vzc1dyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzc01hbmFnZXJQcm9jZXNzV3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxlQUF1RCxNQUFNLCtCQUErQixDQUFDO0FBQ3BHLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBRTFELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBbUR4RSxNQUFNLDZCQUE4QixTQUFRLGVBQWU7SUF5Q3pEOzs7Ozs7OztPQVFHO0lBQ0gsWUFDRSxlQUFlLEVBQ2YsUUFBOEQ7UUFFOUQsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLHFCQUFxQixFQUFFO2dCQUNyQixLQUFLLEVBQUUsU0FBUztnQkFDaEIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsR0FBRyxFQUFFO29CQUNILE1BQU0sRUFBRSxTQUFTO2lCQUNsQjthQUNGO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBNUJKLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBbURwQiwyQkFBc0IsR0FBRyxJQUFJLENBQUM7UUFyQjVCLDJCQUEyQjtRQUMzQixNQUFNLHNCQUFzQixHQUFHO1lBQzdCLEVBQUUsRUFBRSxRQUFRO1lBQ1osUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNaLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDWixLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sRUFBRSxTQUFTO1NBQ2xCLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQ3ZELElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7U0FDckU7YUFBTSxJQUFJLGVB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
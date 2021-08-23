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
                    this.processManagerProcessSettings.restart.maxEvery >=
                    Date.now()) {
                    this.emit('log', {
                        group: `s-process-manager-process-wrapper-${this.metas.id}`,
                        value: `The process "<yellow>${this.metas.id}</yellow>" will not being restarted cause it has crashed before the <cyan>maxEvery</cyan> setting setted to <magenta>${this.processManagerProcessSettings.restart.maxEvery}ms</magenta>`,
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
                        value: `The process "<yellow>${this.metas.id}</yellow>" will not being restarted cause it has reached the <cyan>maxTimes</cyan> setting setted to <magenta>${this.processManagerProcessSettings.restart.maxTimes}</magenta>`,
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
                typeof this.processManagerProcessSettings.restart.before === 'function') {
                newProcessArgs = yield this.processManagerProcessSettings.restart.before(this.processInstance.lastExecutionObj);
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
                    value: `Waiting <cyan>${this.processManagerProcessSettings.restart.delay / 1000}s</cyan> before restart...`,
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
        this.pipe(promise, {
            overrideEmitter: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyUHJvY2Vzc1dyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzc01hbmFnZXJQcm9jZXNzV3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxlQUF1RCxNQUFNLCtCQUErQixDQUFDO0FBQ3BHLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBRTFELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBOEN4RSxNQUFNLDZCQUE4QixTQUFRLGVBQWU7SUF5Q3ZEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxlQUFlLEVBQUUsUUFBOEQ7UUFDdkYsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLHFCQUFxQixFQUFFO2dCQUNuQixLQUFLLEVBQUUsU0FBUztnQkFDaEIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsR0FBRyxFQUFFO29CQUNELE1BQU0sRUFBRSxTQUFTO2lCQUNwQjthQUNKO1NBQ0osRUFDRCxRQUFRLENBQ1gsQ0FDSixDQUFDO1FBekJOLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBK0NwQiwyQkFBc0IsR0FBRyxJQUFJLENBQUM7UUFwQjFCLDJCQUEyQjtRQUMzQixNQUFNLHNCQUFzQixHQUFHO1lBQzNCLEVBQUUsRUFBRSxRQUFRO1lBQ1osUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNaLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDWixLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQ3JELElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7U0FDdkU7YUFBTSxJQUFJLGVB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
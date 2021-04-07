"use strict";
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
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
const plainObject_1 = __importDefault(require("@coffeekraken/sugar/shared/is/plainObject"));
class SProcessManagerProcessWrapper extends s_event_emitter_1.default {
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
        super(deepMerge_1.default({
            processManagerProcess: {
                stdio: 'inherit',
                restart: false
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
        else if (plainObject_1.default(this.processManagerProcessSettings.restart)) {
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
            yield wait_1.default(0);
            this.emit('log', {
                value: `The process "<yellow>${this.processInstance.metas.id}</yellow>" has been stoped after a(n) <red>${this.processInstance.lastExecutionObj.state}</red> after <cyan>${this.processInstance.lastExecutionObj.formatedDuration}</cyan> of execution`
            });
            // maxEvery
            if (this.processManagerProcessSettings.restart.maxEvery > 0) {
                if (this.processInstance.lastExecutionObj.endTime +
                    this.processManagerProcessSettings.restart.maxEvery >=
                    Date.now()) {
                    this.emit('log', {
                        value: `The process "<yellow>${this.processInstance.metas.id}</yellow>" will not being restarted cause it has crashed before the <cyan>maxEvery</cyan> setting setted to <magenta>${this.processManagerProcessSettings.restart.maxEvery}ms</magenta>`
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
                        value: `The process "<yellow>${this.processInstance.metas.id}</yellow>" will not being restarted cause it has reached the <cyan>maxTimes</cyan> setting setted to <magenta>${this.processManagerProcessSettings.restart.maxTimes}</magenta>`
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
                    value: `Stop restarting the process "<yellow>${this.processInstance.metas.id}</yellow>"`
                });
                // resolving the global run promise
                if (this._restartingProcessResolve && !this._isDetached) {
                    this._restartingProcessResolve(this.processInstance.executionsStack);
                }
                return;
            }
            if (this.processManagerProcessSettings.restart.delay)
                this.emit(`log`, {
                    value: `Waiting <cyan>${this.processManagerProcessSettings.restart.delay / 1000}s</cyan> before restart...`
                });
            yield wait_1.default(this.processManagerProcessSettings.restart.delay);
            this.emit('log', {
                value: `Restarting process "<yellow>${this.processInstance.metas.id}</yellow>"`
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
            throw new Error(`Sorry but you cannot run this "<yellow>${this.processInstance.metas.id}</yellow>" process cause it has been detached from the process manager`);
        }
        return new s_promise_1.default(({ resolve }) => __awaiter(this, void 0, void 0, function* () {
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
exports.default = SProcessManagerProcessWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyUHJvY2Vzc1dyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzc01hbmFnZXJQcm9jZXNzV3JhcHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsNEZBQXNFO0FBRXRFLHdFQUFpRDtBQUNqRCxnRkFBMEQ7QUFFMUQsNEZBQXdFO0FBNEN4RSxNQUFNLDZCQUE4QixTQUFRLHlCQUFlO0lBeUN6RDs7Ozs7Ozs7T0FRRztJQUNILFlBQ0UsZUFBZSxFQUNmLFFBQThEO1FBRTlELEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UscUJBQXFCLEVBQUU7Z0JBQ3JCLEtBQUssRUFBRSxTQUFTO2dCQUNoQixPQUFPLEVBQUUsS0FBSzthQUNmO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBekJKLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBZ0RwQiwyQkFBc0IsR0FBRyxJQUFJLENBQUM7UUFyQjVCLDJCQUEyQjtRQUMzQixNQUFNLHNCQUFzQixHQUFHO1lBQzdCLEVBQUUsRUFBRSxRQUFRO1lBQ1osUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNaLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDWixLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sRUFBRSxTQUFTO1NBQ2xCLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQ3ZELElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7U0FDckU7YUFBTSxJQUFJLHFCQUFlLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3RFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLG1DQUNyQyxzQkFBc0IsR0FDdEIsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FDOUMsQ0FBQztT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
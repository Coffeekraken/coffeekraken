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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const is_1 = require("@coffeekraken/sugar/is");
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
class SProcessManagerProcessWrapper extends s_event_emitter_1.default {
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
        super((0, deepMerge_1.default)({
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
        else if ((0, is_1.__isPlainObject)(this.settings.restart)) {
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
            yield (0, wait_1.default)(0);
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
            yield (0, wait_1.default)(this.settings.restart.delay);
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
        return new s_promise_1.default(({ resolve, pipe }) => __awaiter(this, void 0, void 0, function* () {
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
exports.default = SProcessManagerProcessWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUdkLG9GQUV1QztBQUN2Qyx3RUFBaUQ7QUFDakQsK0NBQXlEO0FBQ3pELDRGQUFzRTtBQUN0RSxnRkFBMEQ7QUE2QzFELE1BQU0sNkJBQThCLFNBQVEseUJBQWU7SUF5Q3ZEOzs7Ozs7OztPQVFHO0lBQ0gsWUFDSSxlQUFlLEVBQ2YsUUFBMEQ7UUFFMUQsS0FBSyxDQUNELElBQUEsbUJBQVcsRUFDUDtZQUNJLEtBQUssRUFBRSxTQUFTO1lBQ2hCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsR0FBRyxFQUFFO2dCQUNELE1BQU0sRUFBRSxTQUFTO2FBQ3BCO1NBQ0osRUFDRCxRQUFRLENBQ1gsQ0FDSixDQUFDO1FBMUJOLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBZ0RwQiwyQkFBc0IsR0FBRyxJQUFJLENBQUM7UUFwQjFCLDJCQUEyQjtRQUMzQixNQUFNLHNCQUFzQixHQUFHO1lBQzNCLEVBQUUsRUFBRSxRQUFRO1lBQ1osUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNaLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDWixLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztTQUNsRDthQUFNLElBQUksSUFBQSxvQkFBZSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLG1DQUNkLHNCQUFzQixHQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FDM0IsQ0FBQztTQUNMO1FBQ0QsZUFBZSxDQUFDLFFBQVEsQ0FBQyxL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
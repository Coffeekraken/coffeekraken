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
const datetime_1 = require("@coffeekraken/sugar/datetime");
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
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
        super((0, object_1.__deepMerge)({
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
            yield (0, datetime_1.__wait)(0);
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
            yield (0, datetime_1.__wait)(this.settings.restart.delay);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUdkLG9GQUV1QztBQUN2Qyx3RUFBaUQ7QUFDakQsMkRBQXNEO0FBQ3RELCtDQUF5RDtBQUN6RCx1REFBeUQ7QUE4Q3pELE1BQU0sNkJBQThCLFNBQVEseUJBQWU7SUF5Q3ZEOzs7Ozs7OztPQVFHO0lBQ0gsWUFDSSxlQUFlLEVBQ2YsUUFBMEQ7UUFFMUQsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLEtBQUssRUFBRSxTQUFTO1lBQ2hCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsR0FBRyxFQUFFO2dCQUNELE1BQU0sRUFBRSxTQUFTO2FBQ3BCO1NBQ0osRUFDRCxRQUFRLENBQ1gsQ0FDSixDQUFDO1FBMUJOLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBZ0RwQiwyQkFBc0IsR0FBRyxJQUFJLENBQUM7UUFwQjFCLDJCQUEyQjtRQUMzQixNQUFNLHNCQUFzQixHQUFHO1lBQzNCLEVBQUUsRUFBRSxRQUFRO1lBQ1osUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNaLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDWixLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztTQUNsRDthQUFNLElBQUksSUFBQSxvQkFBZSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLG1DQUNkLHNCQUFzQixHQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FDM0IsQ0FBQztTQUNMO1FBQ0QsZUFBZSxDQUFDLFFBQVEsQ0FBQyxL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
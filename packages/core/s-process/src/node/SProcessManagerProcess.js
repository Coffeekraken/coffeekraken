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
class SProcessManagerProcess extends s_event_emitter_1.default {
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
        /**
         * @name          _restartsStack
         * @type          Array<ISProcessManagerProcessExecution>
         * @private
         *
         * Store each restarts with times, params, etc...
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._restartsStack = [];
        // default restart settings
        const restartDefaultSettings = {
            on: 'error,reject',
            max: -1,
            delay: 0,
            before: undefined
        };
        if (this.processManagerProcessSettings.restart === true) {
            this.processManagerProcessSettings.restart = restartDefaultSettings;
        }
        else if (plainObject_1.default(this.processManagerProcessSettings.restart)) {
            this.processManagerProcessSettings.restart = Object.assign(Object.assign({}, restartDefaultSettings), this.processManagerProcessSettings.restart);
        }
        processInstance.processSettings.emitErrorAsEvent = true;
        processInstance.processSettings.stdio = false;
        this.processInstance = processInstance;
        // handle restart
        if (this.processManagerProcessSettings.restart)
            this._handleRestart();
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
     * @type          ISProcessManagerProcessSettings
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
    _handleRestart() {
        this.processInstance.on(this.processManagerProcessSettings.restart.on, (value, metas) => __awaiter(this, void 0, void 0, function* () {
            yield wait_1.default(0);
            this.emit('log', {
                value: `The process "<yellow>${this.processInstance.metas.id}</yellow>" has been stoped after a(n) <red>${this.processInstance.lastExecutionObj.state}</red> after <cyan>${this.processInstance.lastExecutionObj.formatedDuration}</cyan> of execution`
            });
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
                if (this._restartingProcessResolve) {
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
        }));
    }
    _run(paramsOrStringArgs = {}, settings = {}) {
        const promise = this.processInstance.run(paramsOrStringArgs, settings);
        this.pipe(promise, {
            overrideEmitter: true
        });
        return promise;
    }
    run(paramsOrStringArgs = {}, settings = {}) {
        return new s_promise_1.default(({ resolve }) => __awaiter(this, void 0, void 0, function* () {
            this._restartingProcessResolve = resolve;
            // run the process
            const res = yield this._run(paramsOrStringArgs, settings);
            // if restart is setted, do not resolve the promis
            if (!this.processManagerProcessSettings.restart) {
                resolve(res);
            }
        }));
    }
}
exports.default = SProcessManagerProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzTWFuYWdlclByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsb0ZBQTREO0FBQzVELDRGQUFzRTtBQUV0RSx3RUFBaUQ7QUFDakQsZ0ZBQTBEO0FBRTFELDRGQUF3RTtBQXdDeEUsTUFBTSxzQkFBdUIsU0FBUSx5QkFBZTtJQW1EbEQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUNFLGVBQWUsRUFDZixRQUF1RDtRQUV2RCxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLHFCQUFxQixFQUFFO2dCQUNyQixLQUFLLEVBQUUsU0FBUztnQkFDaEIsT0FBTyxFQUFFLEtBQUs7YUFDZjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQW5DSjs7Ozs7Ozs7O1dBU0c7UUFDSyxtQkFBYyxHQUF1QyxFQUFFLENBQUM7UUEyQjlELDJCQUEyQjtRQUMzQixNQUFNLHNCQUFzQixHQUFHO1lBQzdCLEVBQUUsRUFBRSxjQUFjO1lBQ2xCLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDUCxLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sRUFBRSxTQUFTO1NBQ2xCLENBQUM7UUFDRixJQUFJLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQ3ZELElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7U0FDckU7YUFBTSxJQUFJLHFCQUFlLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3RFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLG1DQUNyQyxzQkFBc0IsR0FDdEIsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FDOUMsQ0FBQztTQUNIO1FBQ0QsZUFBZSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDeEQsZUFBZSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzlDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBRXZDLGlCQUFpQjtRQUNqQixJQUFJLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hFLENBQUM7SUFoR0Q7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLGFBQWE7UUFDZixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQWFEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksNkJBQTZCO1FBQy9CLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQztJQUNyRCxDQUFDO0lBOERELGNBQWM7UUFDWixJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FDckIsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQzdDLENBQU8sS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3JCLE1BQU0sY0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWhCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNmLEtBQUssRUFBRSx3QkFBd0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRSw4Q0FBOEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLHNCQUFzQixJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixzQkFBc0I7YUFDeFAsQ0FBQyxDQUFDO1lBRUgsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDaEMsRUFBRSxFQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUM3QyxDQUFDO1lBRUYsd0RBQXdEO1lBQ3hELElBQ0UsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxNQUFNO2dCQUNqRCxPQUFPLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLENBQUMsTUFBTTtvQkFDdEQsVUFBVSxFQUNaO2dCQUNBLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUN0RSxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUN0QyxDQUFDO2FBQ0g7WUFFRCxtRUFBbUU7WUFDbkUsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ2YsS0FBSyxFQUFFLHdDQUF3QyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFLFlBQVk7aUJBQ3pGLENBQUMsQ0FBQztnQkFFSCxtQ0FBbUM7Z0JBQ25DLElBQUksSUFBSSxDQUFDLHlCQUF5QixFQUFFO29CQUNsQyxJQUFJLENBQUMseUJBQXlCLENBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUNyQyxDQUFDO2lCQUNIO2dCQUVELE9BQU87YUFDUjtZQUVELElBQUksSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxLQUFLO2dCQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDZixLQUFLLEVBQUUsaUJBQ0wsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFDckQsNEJBQTRCO2lCQUM3QixDQUFDLENBQUM7WUFDTCxNQUFNLGNBQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRS9ELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNmLEtBQUssRUFBRSwrQkFBK0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRSxZQUFZO2FBQ2hGLENBQUMsQ0FBQztZQUVILGtCQUFrQjtZQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVELENBQUMsQ0FBQSxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsRUFBRSxXQUF1QyxFQUFFO1FBQ3JFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLGVBQWUsRUFBRSxJQUFJO1NBQ3RCLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFpQkQsR0FBRyxDQUFDLGtCQUFrQixHQUFHLEVBQUUsRUFBRSxXQUF1QyxFQUFFO1FBQ3BFLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQzFDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxPQUFPLENBQUM7WUFFekMsa0JBQWtCO1lBQ2xCLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUUxRCxrREFBa0Q7WUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLEVBQUU7Z0JBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQUNELGtCQUFlLHNCQUFzQixDQUFDIn0=
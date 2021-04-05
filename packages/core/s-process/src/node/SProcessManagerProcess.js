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
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
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
                restart: {
                    on: 'error,reject',
                    max: -1,
                    delay: 0,
                    processParams: undefined
                }
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
        processInstance.processSettings.emitErrorAsEvent = true;
        processInstance.processSettings.stdio = false;
        this.processInstance = processInstance;
        processInstance.on(this.processManagerProcessSettings.restart.on, (value, metas) => __awaiter(this, void 0, void 0, function* () {
            yield wait_1.default(0);
            this.emit('log', {
                value: `The process "<yellow>${processInstance.metas.id}</yellow>" has been stoped after a(n) <red>${processInstance.lastExecutionObj.state}</red> after <cyan>${processInstance.lastExecutionObj.formatedDuration}</cyan> of execution`
            });
            let newProcessArgs = Object.assign({}, processInstance.lastExecutionObj);
            // tweak params if a function is passed through settings
            if (this.processManagerProcessSettings.restart.before &&
                typeof this.processManagerProcessSettings.restart.before ===
                    'function') {
                newProcessArgs = yield this.processManagerProcessSettings.restart.before(processInstance.lastExecutionObj);
            }
            // of the "before" callback returns a nullysh value, do not restart
            if (!newProcessArgs) {
                this.emit('log', {
                    value: `Stop restarting the process "<yellow>${processInstance.metas.id}</yellow>"`
                });
                return;
            }
            if (this.processManagerProcessSettings.restart.delay)
                this.emit(`log`, {
                    value: `Waiting <cyan>${this.processManagerProcessSettings.restart.delay / 1000}s</cyan> before restart...`
                });
            yield wait_1.default(this.processManagerProcessSettings.restart.delay);
            this.emit('log', {
                value: `Restarting process "<yellow>${processInstance.metas.id}</yellow>"`
            });
            // restart process
            this.run(newProcessArgs.params, newProcessArgs.settings);
        }));
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
    /**
     * @name      run
     * @type      Function
     * @async
     *
     * Proxy to the ```run``` method on the passed processInstance
     *
     * @param     {String|Record<string, any>}        [paramsOrStringArgs={}]     Either a cli string arguments like "--arg1 value1 --arg2 value2" that will be transformed to an object using the "params" interface, or directly an object representing your parameters
     * @param     {Partial<ISProcessSettings>}        [settings={}]             Some process settings to override if needed
     * @return    {SPromise}                                                  An SPromise instance through which you can listen for logs, and that will be resolved once the process is over
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    run(paramsOrStringArgs = {}, settings = {}) {
        const promise = this.processInstance.run(paramsOrStringArgs, settings);
        this.pipe(promise, {
        // overrideEmitter: true
        });
        return promise;
    }
}
exports.default = SProcessManagerProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NNYW5hZ2VyUHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzTWFuYWdlclByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsb0ZBQTREO0FBQzVELDRGQUFzRTtBQUd0RSxnRkFBMEQ7QUF5QzFELE1BQU0sc0JBQXVCLFNBQVEseUJBQWU7SUFtRGxEOzs7Ozs7OztPQVFHO0lBQ0gsWUFDRSxlQUFlLEVBQ2YsUUFBdUQ7UUFFdkQsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxxQkFBcUIsRUFBRTtnQkFDckIsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLE9BQU8sRUFBRTtvQkFDUCxFQUFFLEVBQUUsY0FBYztvQkFDbEIsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDUCxLQUFLLEVBQUUsQ0FBQztvQkFDUixhQUFhLEVBQUUsU0FBUztpQkFDekI7YUFDRjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQXhDSjs7Ozs7Ozs7O1dBU0c7UUFDSyxtQkFBYyxHQUF1QyxFQUFFLENBQUM7UUFnQzlELGVBQWUsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hELGVBQWUsQ0FBQyxlQUFlLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUU5QyxJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUV2QyxlQUFlLENBQUMsRUFBRSxDQUNoQixJQUFJLENBQUMsNkJBQTZCLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFDN0MsQ0FBTyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDckIsTUFBTSxjQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2YsS0FBSyxFQUFFLHdCQUF3QixlQUFlLENBQUMsS0FBSyxDQUFDLEVBQUUsOENBQThDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLHNCQUFzQixlQUFlLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLHNCQUFzQjthQUN6TyxDQUFDLENBQUM7WUFFSCxJQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNoQyxFQUFFLEVBQ0YsZUFBZSxDQUFDLGdCQUFnQixDQUNqQyxDQUFDO1lBRUYsd0RBQXdEO1lBQ3hELElBQ0UsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxNQUFNO2dCQUNqRCxPQUFPLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLENBQUMsTUFBTTtvQkFDdEQsVUFBVSxFQUNaO2dCQUNBLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUN0RSxlQUFlLENBQUMsZ0JBQWdCLENBQ2pDLENBQUM7YUFDSDtZQUVELG1FQUFtRTtZQUNuRSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDZixLQUFLLEVBQUUsd0NBQXdDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRSxZQUFZO2lCQUNwRixDQUFDLENBQUM7Z0JBQ0gsT0FBTzthQUNSO1lBRUQsSUFBSSxJQUFJLENBQUMsNkJBQTZCLENBQUMsT0FBTyxDQUFDLEtBQUs7Z0JBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNmLEtBQUssRUFBRSxpQkFDTCxJQUFJLENBQUMsNkJBQTZCLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUNyRCw0QkFBNEI7aUJBQzdCLENBQUMsQ0FBQztZQUNMLE1BQU0sY0FBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFL0QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2YsS0FBSyxFQUFFLCtCQUErQixlQUFlLENBQUMsS0FBSyxDQUFDLEVBQUUsWUFBWTthQUMzRSxDQUFDLENBQUM7WUFFSCxrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUEsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQXRJRDs7Ozs7Ozs7T0FRRztJQUNILElBQUksYUFBYTtRQUNmLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBYUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSw2QkFBNkI7UUFDL0IsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDO0lBQ3JELENBQUM7SUFvR0Q7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLEVBQUUsV0FBdUMsRUFBRTtRQUNwRSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNqQix3QkFBd0I7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBQ0Qsa0JBQWUsc0JBQXNCLENBQUMifQ==
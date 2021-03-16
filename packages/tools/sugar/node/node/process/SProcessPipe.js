"use strict";
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
// @to-work
const class_1 = __importDefault(require("../is/class"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const SEventEmitter_1 = __importDefault(require("../event/SEventEmitter"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const typeof_1 = __importDefault(require("../value/typeof"));
class SProcessPipe extends SEventEmitter_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(processes, settings = {}) {
        super(deepMerge_1.default({
            processPipe: {
                stdio: 'inherit'
            }
        }, settings));
        this._processes = processes;
    }
    /**
     * @name            processPipeSettings
     * @type            ISProcessPipeSettings
     * @get
     *
     * Access the process pipe settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get processPipeSettings() {
        return this._settings.processPipe;
    }
    /**
     * @name          run
     * @type          Function
     * @async
     *
     * Execute the processes pipe
     *
     * @param         {Object}        [params={}]             The initial params object to pass to the first process
     * @param         {Object}        [settings={}]           Some settings to override from the one passed in the constructor
     * @return        {SPromise}                              An SPromise instance through which you can get events piped from processes
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    run(params = {}, settings = {}) {
        // extends settings
        const processPipeSettings = (deepMerge_1.default(this.processPipeSettings, settings));
        const promise = new s_promise_1.default(({ resolve, reject, emit, pipe, pipeTo }) => __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(this._processes)) {
                throw `Sorry but you've passed an "<yellow>${typeof_1.default(this._processes)}</yellow>" as "<cyan>SProcessManager.pipe</cyan>" argument but it needs to be an <green>Array</green>`;
            }
            // loop on each processes passed
            for (let i = 0; i < this._processes.length; i++) {
                const pro = this._processes[i];
                let processInstance, processParams = {}, processSettings = processPipeSettings.processesSettings;
                // check the type of the process
                if (class_1.default(pro)) {
                    processInstance = new pro(Object.assign(Object.assign({}, (processPipeSettings.processesSettings || {})), { stdio: false }));
                }
                else if (typeof pro === 'function') {
                    params = pro(params);
                }
                else if (typeof pro === 'object') {
                    processSettings = pro.settings || {};
                    processParams = pro.params || {};
                    if (!pro.process) {
                        emit('warn', {
                            value: `You have passed an "<yellow>Object</yellow>" as process parameter in the "<cyan>SProcessManager.pipe</cyan>" static method but you don't have specified the "<magenta>process</magenta>" property with either an SProcess instance, or directly the SProcess class you want`
                        });
                        continue;
                    }
                    if (class_1.default(pro.process)) {
                        processInstance = new pro.process(Object.assign(Object.assign({}, processSettings), { stdio: false }));
                    }
                }
                // execute the process
                // @ts-ignore
                if (processInstance) {
                    emit('log', {
                        type: 'heading',
                        value: processInstance.formattedName
                    });
                    const resPromise = processInstance.run(params, processSettings);
                    pipe(resPromise);
                    const res = yield resPromise;
                }
            }
        }));
        // @ts-ignore
        // if (!__isChildProcess() && processPipeSettings.stdio && !this.stdio) {
        //   this.stdio = __stdio(promise, processPipeSettings.stdio, {});
        // }
        return promise;
    }
}
// const cls: ISProcessPipeCtor = SProcessPipe;
exports.default = SProcessPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NQaXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25vZGUvcHJvY2Vzcy9TUHJvY2Vzc1BpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxXQUFXO0FBQ1gsd0RBQW9DO0FBRXBDLHdFQUFpRDtBQUNqRCwyRUFBcUQ7QUFDckQsb0VBQThDO0FBQzlDLDZEQUF1QztBQWdGdkMsTUFBTSxZQUFhLFNBQVEsdUJBQWU7SUE2QnhDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsU0FBMEMsRUFDMUMsV0FBc0MsRUFBRTtRQUV4QyxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLFdBQVcsRUFBRTtnQkFDWCxLQUFLLEVBQUUsU0FBUzthQUNqQjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQzlCLENBQUM7SUF2Q0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBVyxtQkFBbUI7UUFDNUIsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLFdBQVcsQ0FBQztJQUMzQyxDQUFDO0lBNkJEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsRUFBRSxXQUEyQyxFQUFFO1FBQzVELG1CQUFtQjtRQUNuQixNQUFNLG1CQUFtQixHQUEwQixDQUNqRCxtQkFBVyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FDaEQsQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLElBQUksbUJBQVUsQ0FDNUIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ2hELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDbkMsTUFBTSx1Q0FBdUMsZ0JBQVEsQ0FDbkQsSUFBSSxDQUFDLFVBQVUsQ0FDaEIsdUdBQXVHLENBQUM7YUFDMUc7WUFFRCxnQ0FBZ0M7WUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMvQyxNQUFNLEdBQUcsR0FBUSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVwQyxJQUFJLGVBQTBCLEVBQzVCLGFBQWEsR0FBUSxFQUFFLEVBQ3ZCLGVBQWUsR0FDYixtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQztnQkFFMUMsZ0NBQWdDO2dCQUNoQyxJQUFJLGVBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDbEIsZUFBZSxHQUFHLElBQUksR0FBRyxpQ0FDcEIsQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUMsS0FDaEQsS0FBSyxFQUFFLEtBQUssSUFDWixDQUFDO2lCQUNKO3FCQUFNLElBQUksT0FBTyxHQUFHLEtBQUssVUFBVSxFQUFFO29CQUNwQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN0QjtxQkFBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtvQkFDbEMsZUFBZSxHQUFHLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO29CQUNyQyxhQUFhLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO3dCQUNoQixJQUFJLENBQUMsTUFBTSxFQUFFOzRCQUNYLEtBQUssRUFBRSw2UUFBNlE7eUJBQ3JSLENBQUMsQ0FBQzt3QkFDSCxTQUFTO3FCQUNWO29CQUNELElBQUksZUFBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTt3QkFDMUIsZUFBZSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8saUNBQzVCLGVBQWUsS0FDbEIsS0FBSyxFQUFFLEtBQUssSUFDWixDQUFDO3FCQUNKO2lCQUNGO2dCQUVELHNCQUFzQjtnQkFDdEIsYUFBYTtnQkFDYixJQUFJLGVBQWUsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDVixJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUUsZUFBZSxDQUFDLGFBQWE7cUJBQ3JDLENBQUMsQ0FBQztvQkFDSCxNQUFNLFVBQVUsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQztvQkFDaEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNqQixNQUFNLEdBQUcsR0FBRyxNQUFNLFVBQVUsQ0FBQztpQkFDOUI7YUFDRjtRQUNILENBQUMsQ0FBQSxDQUNGLENBQUM7UUFFRixhQUFhO1FBQ2IseUVBQXlFO1FBQ3pFLGtFQUFrRTtRQUNsRSxJQUFJO1FBRUosT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBRUQsK0NBQStDO0FBRS9DLGtCQUFlLFlBQVksQ0FBQyJ9
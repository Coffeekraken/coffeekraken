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
const class_1 = __importDefault(require("../../shared/is/class"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const SEventEmitter_1 = __importDefault(require("../../shared/event/SEventEmitter"));
const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
const typeof_1 = __importDefault(require("../../shared/value/typeof"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NQaXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Byb2Nlc3NQaXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsV0FBVztBQUNYLGtFQUE4QztBQUU5Qyx3RUFBaUQ7QUFDakQscUZBQStEO0FBQy9ELDhFQUF3RDtBQUN4RCx1RUFBaUQ7QUFtRWpELE1BQU0sWUFBYSxTQUFRLHVCQUFlO0lBNkJ4Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLFNBQTBDLEVBQzFDLFdBQXNDLEVBQUU7UUFFeEMsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxXQUFXLEVBQUU7Z0JBQ1gsS0FBSyxFQUFFLFNBQVM7YUFDakI7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM5QixDQUFDO0lBdkNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQVcsbUJBQW1CO1FBQzVCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7SUFDM0MsQ0FBQztJQTZCRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUUsV0FBMkMsRUFBRTtRQUM1RCxtQkFBbUI7UUFDbkIsTUFBTSxtQkFBbUIsR0FBMEIsQ0FDakQsbUJBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQ2hELENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFVLENBQzVCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ25DLE1BQU0sdUNBQXVDLGdCQUFRLENBQ25ELElBQUksQ0FBQyxVQUFVLENBQ2hCLHVHQUF1RyxDQUFDO2FBQzFHO1lBRUQsZ0NBQWdDO1lBQ2hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDL0MsTUFBTSxHQUFHLEdBQVEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFcEMsSUFBSSxlQUEwQixFQUM1QixhQUFhLEdBQVEsRUFBRSxFQUN2QixlQUFlLEdBQ2IsbUJBQW1CLENBQUMsaUJBQWlCLENBQUM7Z0JBRTFDLGdDQUFnQztnQkFDaEMsSUFBSSxlQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ2xCLGVBQWUsR0FBRyxJQUFJLEdBQUcsaUNBQ3BCLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFDLEtBQ2hELEtBQUssRUFBRSxLQUFLLElBQ1osQ0FBQztpQkFDSjtxQkFBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFVBQVUsRUFBRTtvQkFDcEMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDdEI7cUJBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7b0JBQ2xDLGVBQWUsR0FBRyxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztvQkFDckMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO29CQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTt3QkFDaEIsSUFBSSxDQUFDLE1BQU0sRUFBRTs0QkFDWCxLQUFLLEVBQUUsNlFBQTZRO3lCQUNyUixDQUFDLENBQUM7d0JBQ0gsU0FBUztxQkFDVjtvQkFDRCxJQUFJLGVBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQzFCLGVBQWUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLGlDQUM1QixlQUFlLEtBQ2xCLEtBQUssRUFBRSxLQUFLLElBQ1osQ0FBQztxQkFDSjtpQkFDRjtnQkFFRCxzQkFBc0I7Z0JBQ3RCLGFBQWE7Z0JBQ2IsSUFBSSxlQUFlLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1YsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsS0FBSyxFQUFFLGVBQWUsQ0FBQyxhQUFhO3FCQUNyQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxVQUFVLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUFDLENBQUM7b0JBQ2hFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDakIsTUFBTSxHQUFHLEdBQUcsTUFBTSxVQUFVLENBQUM7aUJBQzlCO2FBQ0Y7UUFDSCxDQUFDLENBQUEsQ0FDRixDQUFDO1FBRUYsYUFBYTtRQUNiLHlFQUF5RTtRQUN6RSxrRUFBa0U7UUFDbEUsSUFBSTtRQUVKLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FDRjtBQUVELCtDQUErQztBQUUvQyxrQkFBZSxZQUFZLENBQUMifQ==
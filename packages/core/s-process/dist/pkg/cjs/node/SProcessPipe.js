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
// @to-work
const class_1 = __importDefault(require("@coffeekraken/sugar/shared/is/class"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const typeof_1 = __importDefault(require("@coffeekraken/sugar/shared/value/typeof"));
class SProcessPipe extends s_event_emitter_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(processes, settings = {}) {
        super((0, deepMerge_1.default)({
            processPipe: {
                stdio: 'inherit',
            },
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get processPipeSettings() {
        return this.settings.processPipe;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    run(params = {}, settings = {}) {
        // extends settings
        const processPipeSettings = ((0, deepMerge_1.default)(this.processPipeSettings, settings));
        const promise = new s_promise_1.default(({ resolve, reject, emit, pipe, pipeTo }) => __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(this._processes)) {
                throw `Sorry but you've passed an "<yellow>${(0, typeof_1.default)(this._processes)}</yellow>" as "<cyan>SProcessManager.pipe</cyan>" argument but it needs to be an <green>Array</green>`;
            }
            // loop on each processes passed
            for (let i = 0; i < this._processes.length; i++) {
                const pro = this._processes[i];
                let processInstance, processParams = {}, processSettings = processPipeSettings.processesSettings;
                // check the type of the process
                if ((0, class_1.default)(pro)) {
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
                            value: `You have passed an "<yellow>Object</yellow>" as process parameter in the "<cyan>SProcessManager.pipe</cyan>" static method but you don't have specified the "<magenta>process</magenta>" property with either an SProcess instance, or directly the SProcess class you want`,
                        });
                        continue;
                    }
                    if ((0, class_1.default)(pro.process)) {
                        processInstance = new pro.process(Object.assign(Object.assign({}, processSettings), { stdio: false }));
                    }
                }
                // execute the process
                // @ts-ignore
                if (processInstance) {
                    emit('log', {
                        group: `s-process-pipe-${this.metas.id}`,
                        type: 'heading',
                        value: processInstance.metas.formattedName,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLFdBQVc7QUFDWCxnRkFBNEQ7QUFFNUQsd0VBQWlEO0FBQ2pELG9GQUE0RDtBQUM1RCw0RkFBc0U7QUFDdEUscUZBQStEO0FBeUUvRCxNQUFNLFlBQWEsU0FBUSx5QkFBZTtJQTZCdEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxTQUEwQyxFQUMxQyxXQUFzQyxFQUFFO1FBRXhDLEtBQUssQ0FDRCxJQUFBLG1CQUFXLEVBQ1A7WUFDSSxXQUFXLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLFNBQVM7YUFDbkI7U0FDSixFQUNELFFBQVEsQ0FDWCxDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUNoQyxDQUFDO0lBdkNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQVcsbUJBQW1CO1FBQzFCLE9BQWEsSUFBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7SUFDNUMsQ0FBQztJQTZCRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUUsV0FBMkMsRUFBRTtRQUMxRCxtQkFBbUI7UUFDbkIsTUFBTSxtQkFBbUIsR0FBMEIsQ0FDL0MsSUFBQSxtQkFBVyxFQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FDbEQsQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLElBQUksbUJBQVUsQ0FDMUIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDakMsTUFBTSx1Q0FBdUMsSUFBQSxnQkFBUSxFQUNqRCxJQUFJLENBQUMsVUFBVSxDQUNsQix1R0FBdUcsQ0FBQzthQUM1RztZQUVELGdDQUFnQztZQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdDLE1BQU0sR0FBRyxHQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXBDLElBQUksZUFBMEIsRUFDMUIsYUFBYSxHQUFRLEVBQUUsRUFDdkIsZUFBZSxHQUNYLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDO2dCQUU5QyxnQ0FBZ0M7Z0JBQ2hDLElBQUksSUFBQSxlQUFTLEVBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ2hCLGVBQWUsR0FBRyxJQUFJLEdBQUcsaUNBQ2xCLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFDLEtBQ2hELEtBQUssRUFBRSxLQUFLLElBQ2QsQ0FBQztpQkFDTjtxQkFBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFVBQVUsRUFBRTtvQkFDbEMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDeEI7cUJBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7b0JBQ2hDLGVBQWUsR0FBRyxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztvQkFDckMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO29CQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTt3QkFDZCxJQUFJLENBQUMsTUFBTSxFQUFFOzRCQUNULEtBQUssRUFBRSw2UUFBNlE7eUJBQ3ZSLENBQUMsQ0FBQzt3QkFDSCxTQUFTO3FCQUNaO29CQUNELElBQUksSUFBQSxlQUFTLEVBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUN4QixlQUFlLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxpQ0FDMUIsZUFBZSxLQUNsQixLQUFLLEVBQUUsS0FBSyxJQUNkLENBQUM7cUJBQ047aUJBQ0o7Z0JBRUQsc0JBQXNCO2dCQUN0QixhQUFhO2dCQUNiLElBQUksZUFBZSxFQUFFO29CQUNqQixJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLEtBQUssRUFBRSxrQkFBa0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUU7d0JBQ3hDLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSxlQUFlLENBQUMsS0FBSyxDQUFDLGFBQWE7cUJBQzdDLENBQUMsQ0FBQztvQkFDSCxNQUFNLFVBQVUsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUNsQyxNQUFNLEVBQ04sZUFBZSxDQUNsQixDQUFDO29CQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDakIsTUFBTSxHQUFHLEdBQUcsTUFBTSxVQUFVLENBQUM7aUJBQ2hDO2FBQ0o7UUFDTCxDQUFDLENBQUEsQ0FDSixDQUFDO1FBRUYsYUFBYTtRQUNiLHlFQUF5RTtRQUN6RSxrRUFBa0U7UUFDbEUsSUFBSTtRQUVKLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7Q0FDSjtBQUVELCtDQUErQztBQUUvQyxrQkFBZSxZQUFZLENBQUMifQ==
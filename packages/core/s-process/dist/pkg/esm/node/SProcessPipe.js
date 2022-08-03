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
// @to-work
import __isClass from '@coffeekraken/sugar/shared/is/class';
import __SPromise from '@coffeekraken/s-promise';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __typeof from '@coffeekraken/sugar/shared/value/typeof';
class SProcessPipe extends __SEventEmitter {
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
        super(__deepMerge({
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
        const processPipeSettings = (__deepMerge(this.processPipeSettings, settings));
        const promise = new __SPromise(({ resolve, reject, emit, pipe, pipeTo }) => __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(this._processes)) {
                throw `Sorry but you've passed an "<yellow>${__typeof(this._processes)}</yellow>" as "<cyan>SProcessManager.pipe</cyan>" argument but it needs to be an <green>Array</green>`;
            }
            // loop on each processes passed
            for (let i = 0; i < this._processes.length; i++) {
                const pro = this._processes[i];
                let processInstance, processParams = {}, processSettings = processPipeSettings.processesSettings;
                // check the type of the process
                if (__isClass(pro)) {
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
                    if (__isClass(pro.process)) {
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
export default SProcessPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxXQUFXO0FBQ1gsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUF5RS9ELE1BQU0sWUFBYSxTQUFRLGVBQWU7SUE2QnRDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksU0FBMEMsRUFDMUMsV0FBc0MsRUFBRTtRQUV4QyxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksV0FBVyxFQUFFO2dCQUNULEtBQUssRUFBRSxTQUFTO2FBQ25CO1NBQ0osRUFDRCxRQUFRLENBQ1gsQ0FDSixDQUFDO1FBQ0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDaEMsQ0FBQztJQXZDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFXLG1CQUFtQjtRQUMxQixPQUFhLElBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO0lBQzVDLENBQUM7SUE2QkQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFLFdBQTJDLEVBQUU7UUFDMUQsbUJBQW1CO1FBQ25CLE1BQU0sbUJBQW1CLEdBQTBCLENBQy9DLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQ2xELENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FDMUIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDakMsTUFBTSx1Q0FBdUMsUUFBUSxDQUNqRCxJQUFJLENBQUMsVUFBVSxDQUNsQix1R0FBdUcsQ0FBQzthQUM1RztZQUVELGdDQUFnQztZQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdDLE1BQU0sR0FBRyxHQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXBDLElBQUksZUFBMEIsRUFDMUIsYUFBYSxHQUFRLEVBQUUsRUFDdkIsZUFBZSxHQUNYLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDO2dCQUU5QyxnQ0FBZ0M7Z0JBQ2hDLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNoQixlQUFlLEdBQUcsSUFBSSxHQUFHLGlDQUNsQixDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQyxLQUNoRCxLQUFLLEVBQUUsS0FBSyxJQUNkLENBQUM7aUJBQ047cUJBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxVQUFVLEVBQUU7b0JBQ2xDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3hCO3FCQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO29CQUNoQyxlQUFlLEdBQUcsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7b0JBQ3JDLGFBQWEsR0FBRyxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztvQkFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7d0JBQ2QsSUFBSSxDQUFDLE1BQU0sRUFBRTs0QkFDVCxLQUFLLEVBQUUsNlFBQTZRO3lCQUN2UixDQUFDLENBQUM7d0JBQ0gsU0FBUztxQkFDWjtvQkFDRCxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQ3hCLGVBQWUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLGlDQUMxQixlQUFlLEtBQ2xCLEtBQUssRUFBRSxLQUFLLElBQ2QsQ0FBQztxQkFDTjtpQkFDSjtnQkFFRCxzQkFBc0I7Z0JBQ3RCLGFBQWE7Z0JBQ2IsSUFBSSxlQUFlLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsS0FBSyxFQUFFLGtCQUFrQixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRTt3QkFDeEMsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsS0FBSyxFQUFFLGVBQWUsQ0FBQyxLQUFLLENBQUMsYUFBYTtxQkFDN0MsQ0FBQyxDQUFDO29CQUNILE1BQU0sVUFBVSxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQ2xDLE1BQU0sRUFDTixlQUFlLENBQ2xCLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNqQixNQUFNLEdBQUcsR0FBRyxNQUFNLFVBQVUsQ0FBQztpQkFDaEM7YUFDSjtRQUNMLENBQUMsQ0FBQSxDQUNKLENBQUM7UUFFRixhQUFhO1FBQ2IseUVBQXlFO1FBQ3pFLGtFQUFrRTtRQUNsRSxJQUFJO1FBRUosT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztDQUNKO0FBRUQsK0NBQStDO0FBRS9DLGVBQWUsWUFBWSxDQUFDIn0=
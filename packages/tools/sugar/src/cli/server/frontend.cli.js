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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(processes, settings = {}) {
        super(__deepMerge({
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
                            value: `You have passed an "<yellow>Object</yellow>" as process parameter in the "<cyan>SProcessManager.pipe</cyan>" static method but you don't have specified the "<magenta>process</magenta>" property with either an SProcess instance, or directly the SProcess class you want`
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
                        type: 'heading',
                        value: processInstance.metas.formattedName
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmQuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmQuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLFdBQVc7QUFDWCxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQU01RCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFFBQVEsTUFBTSx5Q0FBeUMsQ0FBQztBQXVGL0QsTUFBTSxZQUFhLFNBQVEsZUFBZTtJQTZCeEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxTQUEwQyxFQUMxQyxXQUFzQyxFQUFFO1FBRXhDLEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxXQUFXLEVBQUU7Z0JBQ1gsS0FBSyxFQUFFLFNBQVM7YUFDakI7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM5QixDQUFDO0lBdkNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQVcsbUJBQW1CO1FBQzVCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7SUFDM0MsQ0FBQztJQTZCRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUUsV0FBMkMsRUFBRTtRQUM1RCxtQkFBbUI7UUFDbkIsTUFBTSxtQkFBbUIsR0FBMEIsQ0FDakQsV0FBVyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FDaEQsQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUM1QixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNuQyxNQUFNLHVDQUF1QyxRQUFRLENBQ25ELElBQUksQ0FBQyxVQUFVLENBQ2hCLHVHQUF1RyxDQUFDO2FBQzFHO1lBRUQsZ0NBQWdDO1lBQ2hDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDL0MsTUFBTSxHQUFHLEdBQVEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFcEMsSUFBSSxlQUEwQixFQUM1QixhQUFhLEdBQVEsRUFBRSxFQUN2QixlQUFlLEdBQ2IsbUJBQW1CLENBQUMsaUJBQWlCLENBQUM7Z0JBRTFDLGdDQUFnQztnQkFDaEMsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ2xCLGVBQWUsR0FBRyxJQUFJLEdBQUcsaUNBQ3BCLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFDLEtBQ2hELEtBQUssRUFBRSxLQUFLLElBQ1osQ0FBQztpQkFDSjtxQkFBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFVBQVUsRUFBRTtvQkFDcEMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDdEI7cUJBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7b0JBQ2xDLGVBQWUsR0FBRyxHQUFHLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztvQkFDckMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO29CQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTt3QkFDaEIsSUFBSSxDQUFDLE1BQU0sRUFBRTs0QkFDWCxLQUFLLEVBQUUsNlFBQTZRO3lCQUNyUixDQUFDLENBQUM7d0JBQ0gsU0FBUztxQkFDVjtvQkFDRCxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQzFCLGVBQWUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLGlDQUM1QixlQUFlLEtBQ2xCLEtBQUssRUFBRSxLQUFLLElBQ1osQ0FBQztxQkFDSjtpQkFDRjtnQkFFRCxzQkFBc0I7Z0JBQ3RCLGFBQWE7Z0JBQ2IsSUFBSSxlQUFlLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1YsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsS0FBSyxFQUFFLGVBQWUsQ0FBQyxLQUFLLENBQUMsYUFBYTtxQkFDM0MsQ0FBQyxDQUFDO29CQUNILE1BQU0sVUFBVSxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO29CQUNoRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2pCLE1BQU0sR0FBRyxHQUFHLE1BQU0sVUFBVSxDQUFDO2lCQUM5QjthQUNGO1FBQ0gsQ0FBQyxDQUFBLENBQ0YsQ0FBQztRQUVGLGFBQWE7UUFDYix5RUFBeUU7UUFDekUsa0VBQWtFO1FBQ2xFLElBQUk7UUFFSixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0NBQ0Y7QUFFRCwrQ0FBK0M7QUFFL0MsZUFBZSxZQUFZLENBQUMifQ==
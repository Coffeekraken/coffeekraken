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
                        group: `s-process-pipe-${this.metas.id}`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NQaXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Byb2Nlc3NQaXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxXQUFXO0FBQ1gsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUF5RS9ELE1BQU0sWUFBYSxTQUFRLGVBQWU7SUE2QnhDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsU0FBMEMsRUFDMUMsV0FBc0MsRUFBRTtRQUV4QyxLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsV0FBVyxFQUFFO2dCQUNYLEtBQUssRUFBRSxTQUFTO2FBQ2pCO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDOUIsQ0FBQztJQXZDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFXLG1CQUFtQjtRQUM1QixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0lBQzNDLENBQUM7SUE2QkQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILEdBQUcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFLFdBQTJDLEVBQUU7UUFDNUQsbUJBQW1CO1FBQ25CLE1BQU0sbUJBQW1CLEdBQTBCLENBQ2pELFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQ2hELENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FDNUIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ2hELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDbkMsTUFBTSx1Q0FBdUMsUUFBUSxDQUNuRCxJQUFJLENBQUMsVUFBVSxDQUNoQix1R0FBdUcsQ0FBQzthQUMxRztZQUVELGdDQUFnQztZQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9DLE1BQU0sR0FBRyxHQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXBDLElBQUksZUFBMEIsRUFDNUIsYUFBYSxHQUFRLEVBQUUsRUFDdkIsZUFBZSxHQUNiLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDO2dCQUUxQyxnQ0FBZ0M7Z0JBQ2hDLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNsQixlQUFlLEdBQUcsSUFBSSxHQUFHLGlDQUNwQixDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQyxLQUNoRCxLQUFLLEVBQUUsS0FBSyxJQUNaLENBQUM7aUJBQ0o7cUJBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxVQUFVLEVBQUU7b0JBQ3BDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3RCO3FCQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO29CQUNsQyxlQUFlLEdBQUcsR0FBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7b0JBQ3JDLGFBQWEsR0FBRyxHQUFHLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztvQkFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7d0JBQ2hCLElBQUksQ0FBQyxNQUFNLEVBQUU7NEJBQ1gsS0FBSyxFQUFFLDZRQUE2UTt5QkFDclIsQ0FBQyxDQUFDO3dCQUNILFNBQVM7cUJBQ1Y7b0JBQ0QsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUMxQixlQUFlLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxpQ0FDNUIsZUFBZSxLQUNsQixLQUFLLEVBQUUsS0FBSyxJQUNaLENBQUM7cUJBQ0o7aUJBQ0Y7Z0JBRUQsc0JBQXNCO2dCQUN0QixhQUFhO2dCQUNiLElBQUksZUFBZSxFQUFFO29CQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNWLEtBQUssRUFBRSxrQkFBa0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUU7d0JBQ3hDLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSxlQUFlLENBQUMsS0FBSyxDQUFDLGFBQWE7cUJBQzNDLENBQUMsQ0FBQztvQkFDSCxNQUFNLFVBQVUsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQztvQkFDaEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNqQixNQUFNLEdBQUcsR0FBRyxNQUFNLFVBQVUsQ0FBQztpQkFDOUI7YUFDRjtRQUNILENBQUMsQ0FBQSxDQUNGLENBQUM7UUFFRixhQUFhO1FBQ2IseUVBQXlFO1FBQ3pFLGtFQUFrRTtRQUNsRSxJQUFJO1FBRUosT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBRUQsK0NBQStDO0FBRS9DLGVBQWUsWUFBWSxDQUFDIn0=
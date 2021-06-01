var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __SFrontstackExecInterface from './exec/interface/SFrontstackExecInterface';
import __SPromise from '@coffeekraken/s-promise';
import __sugarBanner from '@coffeekraken/sugar/shared/ascii/sugarBanner';
import __SProcess, { SProcessManager as __SProcessManager } from '@coffeekraken/s-process';
export default class SFrontstack extends __SClass {
    /**
     * @name            constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        super(__deepMerge({
            frontstack: {}
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name            frontstackSettings
     * @type            ISFrontstackSettings
     * @get
     *
     * Access the frontstack settings
     *
     * @since           2.0.09
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get frontstackSettings() {
        return this._settings.frontstack;
    }
    /**
     * @name        exec
     * @type        Function
     * @async
     *
     * This method allows you to exec a frontstack process
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exec(params) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            const frontstackConfig = __SugarConfig.get('frontstack');
            const receipesObj = frontstackConfig['receipes'];
            const finalParams = this.applyInterface('startParams', params);
            const availableReceipes = Object.keys(receipesObj);
            if (availableReceipes.indexOf(finalParams.receipe) === -1) {
                throw new Error(`<red>[${this.constructor.name}.start]</red> Sorry but the requested receipe "<yellow>${finalParams.receipe}</yellow>" does not exists. Here's the list of available receipe(s):\n${availableReceipes
                    .map((r) => `- <yellow>${r}</yellow>`)
                    .join('\n')}`);
            }
            emit('log', {
                clear: true,
                nude: true,
                paddingTop: 0,
                paddingBottom: 1,
                value: __sugarBanner({
                    paddingBottom: 1
                })
            });
            emit('log', {
                value: `Starting frontstack process using "<yellow>${finalParams.receipe}</yellow>" receipe`
            });
            // get the receipe object and treat it
            const receipeObj = 
            // @ts-ignore
            receipesObj[finalParams.receipe];
            if (!receipeObj) {
                throw new Error(`<red>${this.constructor.name}.start</red> Sorry the the requested "<yellow>${finalParams.receipe}</yellow>" does not exists. Here's the available receipe(s): ${Object.keys(receipesObj)
                    .map((l) => `<green>${l}</green>`)
                    .join(',')}`);
            }
            // check the receipe stacks
            if (!receipeObj.stacks || !Object.keys(receipeObj.stacks).length) {
                throw new Error(`<red>${this.constructor.name}.start] Sorry but the requested "<yellow>${finalParams.receipe}</yellow>" configuration object missed the requested "<yellow>stacks</yellow>" property that list the stacks to execute`);
            }
            if (!receipeObj.stacks[params.stack]) {
                throw new Error(`<red>${this.constructor.name}.start] Sorry but the requested "<yellow>${finalParams.receipe}.stacks.${params.stack}</yellow>" configuration object missed the requested "<yellow>${params.stack}</yellow>" stack`);
            }
            // make sure this receipe has some actions
            if (!receipeObj.stacks[params.stack].actions ||
                !Object.keys(receipeObj.stacks[params.stack].actions).length) {
                throw new Error(`<red>${this.constructor.name}.start] Sorry but the requested "<yellow>${finalParams.receipe}.stacks.${params.stack}.actions</yellow>" configuration object missed the requested "<yellow>actions</yellow>" property that list the actions to execute`);
            }
            // instanciate the process manager
            const processManager = new __SProcessManager();
            // loop on each actions for this receipe
            if (receipeObj.stacks[params.stack].actions) {
                Object.keys(receipeObj.stacks[params.stack].actions).forEach((actionName) => {
                    var _a, _b, _c, _d, _e;
                    if (finalParams.exclude &&
                        finalParams.exclude.indexOf(actionName) !== -1) {
                        emit('log', {
                            type: 'verbose',
                            value: `Excluding the action "<yellow>${actionName}</yellow>"`
                        });
                        return;
                    }
                    // @ts-ignore
                    const actionObj = 
                    // @ts-ignore
                    receipeObj.stacks[params.stack].actions[actionName];
                    const actionId = (_a = actionObj.id) !== null && _a !== void 0 ? _a : actionName;
                    // create a process from the receipe object
                    const pro = __SProcess.from((_b = actionObj.command) !== null && _b !== void 0 ? _b : actionObj.process);
                    // add the process to the process manager
                    // @TODO    integrate log filter feature
                    processManager.attachProcess(actionId, pro, {
                    // log: {
                    //   filter: undefined
                    // }
                    });
                    processManager.run(actionId, (_c = actionObj.params) !== null && _c !== void 0 ? _c : {}, (_e = (_d = actionObj.settings) === null || _d === void 0 ? void 0 : _d.process) !== null && _e !== void 0 ? _e : {});
                });
            }
        }), {
            eventEmitter: {
                bind: this
            }
        });
    }
}
SFrontstack.interfaces = {
    startParams: __SFrontstackExecInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRzdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLDBCQUEwQixNQUFNLDJDQUEyQyxDQUFDO0FBQ25GLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sYUFBYSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3pFLE9BQU8sVUFBVSxFQUFFLEVBQ2pCLGVBQWUsSUFBSSxpQkFBaUIsRUFHckMsTUFBTSx5QkFBeUIsQ0FBQztBQTBDakMsTUFBTSxDQUFDLE9BQU8sT0FBTyxXQUFZLFNBQVEsUUFBUTtJQW1CL0M7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFtQztRQUM3QyxLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsVUFBVSxFQUFFLEVBQUU7U0FDZixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDO0lBakNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQXVCRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLENBQUMsTUFBOEI7UUFDakMsT0FBTyxJQUFJLFVBQVUsQ0FDbkIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNsQyxNQUFNLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDekQsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFakQsTUFBTSxXQUFX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
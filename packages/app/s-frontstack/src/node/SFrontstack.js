import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SFrontstackStartInterface from './start/interface/SFrontstackStartInterface';
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
     * @name        start
     * @type        Function
     * @async
     *
     * This method allows you to start a frontstack process
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    start(params) {
        return new __SPromise(({ resolve, reject, emit }) => {
            const frontstackConfig = __sugarConfig('frontstack');
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
            // make sure this receipe has some actions
            if (!receipeObj.actions || !Object.keys(receipeObj.actions).length) {
                throw new Error(`<red>${this.constructor.name}.start] Sorry but the requested "<yellow>${finalParams.receipe}</yellow>" configuration object missed the requested "<yellow>actions</yellow>" property that list the actions to execute`);
            }
            // instanciate the process manager
            const processManager = new __SProcessManager();
            // loop on each actions for this receipe
            if (receipeObj.actions) {
                Object.keys(receipeObj.actions).forEach((actionName) => {
                    var _a, _b, _c, _d, _e, _f, _g;
                    if (finalParams.exclude &&
                        finalParams.exclude.indexOf(actionName) !== -1) {
                        emit('log', {
                            type: 'verbose',
                            value: `Excluding the action "<yellow>${actionName}</yellow>"`
                        });
                        return;
                    }
                    // @ts-ignore
                    const actionObj = receipeObj.actions[actionName];
                    const actionId = (_a = actionObj.id) !== null && _a !== void 0 ? _a : actionName;
                    // create a process from the receipe object
                    const pro = __SProcess.from((_b = actionObj.command) !== null && _b !== void 0 ? _b : actionObj.process);
                    // add the process to the process manager
                    processManager.attachProcess(actionId, pro, (_d = (_c = actionObj.settings) === null || _c === void 0 ? void 0 : _c.processManager) !== null && _d !== void 0 ? _d : {});
                    processManager.run(actionId, (_e = actionObj.params) !== null && _e !== void 0 ? _e : {}, (_g = (_f = actionObj.settings) === null || _f === void 0 ? void 0 : _f.process) !== null && _g !== void 0 ? _g : {});
                });
            }
        }, {
            eventEmitter: {
                bind: this
            }
        });
    }
}
SFrontstack.interfaces = {
    startParams: __SFrontstackStartInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRzdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLDJCQUEyQixNQUFNLDZDQUE2QyxDQUFDO0FBQ3RGLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sYUFBYSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3pFLE9BQU8sVUFBVSxFQUFFLEVBQ2pCLGVBQWUsSUFBSSxpQkFBaUIsRUFHckMsTUFBTSx5QkFBeUIsQ0FBQztBQW9DakMsTUFBTSxDQUFDLE9BQU8sT0FBTyxXQUFZLFNBQVEsUUFBUTtJQW1CL0M7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFtQztRQUM3QyxLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsVUFBVSxFQUFFLEVBQUU7U0FDZixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDO0lBakNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQXVCRDs7Ozs7Ozs7O09BU0c7SUFDSCxLQUFLLENBQUMsTUFBd0M7UUFDNUMsT0FBTyxJQUFJLFVBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUM1QixNQUFNLGdCQUFnQixHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNyRCxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVqRCxNQUFNLFdBQVcsR0FBNEIsSUFBSSxDQUFDLGNB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
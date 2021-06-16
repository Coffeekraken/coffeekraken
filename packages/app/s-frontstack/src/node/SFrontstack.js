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
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SFrontstackActionInterface from './action/interface/SFrontstackActionInterface';
import __SFrontstackRecipeParamsInterface from './recipe/interface/SFrontstackRecipeParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarJson from '@coffeekraken/s-sugar-json';
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
     * @name        action
     * @type        Function
     * @async
     *
     * This method allows you to action a frontstack process
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    action(params) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const frontstackConfig = __SSugarConfig.get('frontstack');
            const actionsObj = frontstackConfig.actions;
            let finalParams = __SFrontstackActionInterface.apply(params).value;
            const availableActions = Object.keys(actionsObj);
            if (availableActions.indexOf(finalParams.action) === -1) {
                throw new Error(`<red>[${this.constructor.name}.action]</red> Sorry but the requested action "<yellow>${finalParams.action}</yellow>" does not exists. Here's the list of available action(s):\n${availableActions
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
                value: `Starting frontstack process using "<yellow>${finalParams.action}</yellow>" action`
            });
            // get the recipe object and treat it
            const actionObj = 
            // @ts-ignore
            actionsObj[finalParams.action];
            // instanciate the process manager
            const processManager = new __SProcessManager();
            // loop on each actions for this recipe
            const actionId = (_a = actionObj.id) !== null && _a !== void 0 ? _a : finalParams.action;
            // create a process from the recipe object
            const pro = __SProcess.from(
            // @ts-ignore
            (_b = actionObj.command) !== null && _b !== void 0 ? _b : actionObj.process);
            // add the process to the process manager
            // @TODO    integrate log filter feature
            processManager.attachProcess(actionId, pro, {
            // log: {
            //   filter: undefined
            // }
            });
            processManager.run(actionId, (_d = (_c = finalParams.params) !== null && _c !== void 0 ? _c : actionObj.params) !== null && _d !== void 0 ? _d : {}, (_f = (_e = actionObj.settings) === null || _e === void 0 ? void 0 : _e.process) !== null && _f !== void 0 ? _f : {});
        }), {
            eventEmitter: {
                bind: this
            }
        });
    }
    /**
     * @name        recipe
     * @type        Function
     * @async
     *
     * This method allows you to exec a frontstack process
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    recipe(params) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            const frontstackConfig = __SSugarConfig.get('frontstack');
            const recipesObj = frontstackConfig['recipes'];
            const finalParams = __SFrontstackRecipeParamsInterface.apply(params).value;
            if (!finalParams.recipe) {
                const sugarJson = new __SSugarJson().current();
                finalParams.recipe = sugarJson.recipe;
            }
            if (!recipesObj[finalParams.recipe]) {
                throw new Error(`<red>[recipe]</red> Sorry but the specified "<yellow>${finalParams.recipe}</yellow>" recipe does not exists. Here's the available ones: <green>${Object.keys(recipesObj).join(', ')}</green>`);
            }
            if (!finalParams.stack) {
                if (!recipesObj[finalParams.recipe].defaultStack) {
                    throw new Error(`<red>[recipe]</red> Sorry but you MUST specify a "<yellow>stack</yellow>" to use in the requested "<cyan>${finalParams.recipe}</cyan>" recipe`);
                }
                finalParams.stack = recipesObj[finalParams.recipe].defaultStack;
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
                value: `Starting frontstack process`
            });
            emit('log', {
                value: `- Recipe: <yellow>${finalParams.recipe}</yellow>`
            });
            emit('log', {
                value: `- Stack : <cyan>${finalParams.stack}</cyan>`
            });
            // get the recipe object and treat it
            const recipeObj = 
            // @ts-ignore
            recipesObj[finalParams.recipe];
            // check the recipe stacks
            if (!recipeObj.stacks || !Object.keys(recipeObj.stacks).length) {
                throw new Error(`<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}</yellow>" configuration object missed the requested "<yellow>stacks</yellow>" property that list the stacks to execute`);
            }
            if (!recipeObj.stacks[finalParams.stack]) {
                throw new Error(`<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}.stacks</yellow>" configuration object missed the requested "<yellow>${finalParams.stack}</yellow>" stack`);
            }
            // make sure this recipe has some actions
            if (!recipeObj.stacks[finalParams.stack].actions ||
                !Object.keys(recipeObj.stacks[finalParams.stack].actions).length) {
                throw new Error(`<red>[recipe]</red> Sorry but the requested "<yellow>${finalParams.recipe}.stacks.${finalParams.stack}.actions</yellow>" configuration object missed the requested "<yellow>actions</yellow>" property that list the actions to execute`);
            }
            // instanciate the process manager
            const processManager = new __SProcessManager();
            // loop on each actions for this recipe
            if (recipeObj.stacks[finalParams.stack].actions) {
                Object.keys(recipeObj.stacks[finalParams.stack].actions).forEach((actionName) => {
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
                    recipeObj.stacks[finalParams.stack].actions[actionName];
                    const actionId = (_a = actionObj.id) !== null && _a !== void 0 ? _a : actionName;
                    // create a process from the recipe object
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
    startParams: __SFrontstackActionInterface
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRzdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLDRCQUE0QixNQUFNLCtDQUErQyxDQUFDO0FBQ3pGLE9BQU8sa0NBQWtDLE1BQU0scURBQXFELENBQUM7QUFDckcsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxZQUFZLE1BQU0sNEJBQTRCLENBQUM7QUFDdEQsT0FBTyxhQUFhLE1BQU0sOENBQThDLENBQUM7QUFDekUsT0FBTyxVQUFVLEVBQUUsRUFDakIsZUFBZSxJQUFJLGlCQUFpQixFQUdyQyxNQUFNLHlCQUF5QixDQUFDO0FBeUNqQyxNQUFNLENBQUMsT0FBTyxPQUFPLFdBQVksU0FBUSxRQUFRO0lBbUIvQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQW1DO1FBQzdDLEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFqQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxrQkFBa0I7UUFDcEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFDO0lBd0JEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBQyxNQUFnQztRQUNyQyxPQUFPLElBQUksVUFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUNsQyxNQUFNLGdCQUFnQixHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUQsTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO1lBRTVDLElBQUksV0FBVyxHQUE2Qiw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBRTdGLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVqRCxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQ2IsU0FDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQ25CLDBEQUNFLFdBQVcsQ0FBQyxNQUNkLHdFQUF3RSxnQkFBZ0I7cUJBQ3JGLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztxQkFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQ2hCLENBQUM7YUFDSDtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsVUFBVSxFQUFFLENBQUM7Z0JBQ2IsYUFBYSxFQUFFLENBQUM7Z0JBQ2hCLEtBQUssRUFBRSxhQUFhLENBQUM7b0JBQ25CLGFBQWEsRUFBRSxDQUFDO2lCQUNqQixDQUFDO2FBQ0gsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEVBQUUsOENBQThDLFdBQVcsQ0FBQyxNQUFNLG1CQUFtQjthQUMzRixDQUFDLENBQUM7WUFFSCxxQ0FBcUM7WUFDckMsTUFBTSxTQUFTO1lBQ2IsYUFBYTtZQUNiLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFakMsa0NBQWtDO1lBQ2xDLE1BQU0sY0FBYyxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztZQUMvQyx1Q0FBdUM7WUFFdkMsTUFBTSxRQUFRLEdBQUcsTUFBQSxTQUFTLENBQUMsRUFBRSxtQ0FBSSxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQ3BELDBDQUEwQztZQUMxQyxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSTtZQUN6QixhQUFhO1lBQ2IsTUFBQSxTQUFTLENBQUMsT0FBTyxtQ0FBSSxTQUFTLENBQUMsT0FBTyxDQUN2QyxDQUFDO1lBQ0YseUNBQXlDO1lBQ3pDLHdDQUF3QztZQUN4QyxjQUFjLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDMUMsU0FBUztZQUNULHNCQUFzQjtZQUN0QixJQUFJO2FBQ0wsQ0FBQyxDQUFDO1lBRUgsY0FBYyxDQUFDLEdBQUcsQ0FDaEIsUUFBUSxFQUNSLE1BQUEsTUFBQSxXQUFXLENBQUMsTUFBTSxtQ0FBSSxTQUFTLENBQUMsTUFBTSxtQ0FBSSxFQUFFLEVBQzVDLE1BQUEsTUFBQSxTQUFTLENBQUMsUUFBUSwwQ0FBRSxPQUFPLG1DQUFJLEVBQUUsQ0FDbEMsQ0FBQztRQUNKLENBQUMsQ0FBQSxFQUNEO1lBQ0UsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxJQUFJO2FBQ1g7U0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLE1BQWdDO1FBQ3JDLE9BQU8sSUFBSSxVQUFVLENBQ25CLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDbEMsTUFBTSxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFELE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRS9DLE1BQU0sV0FBVyxHQUFHLGtDQUFrQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFFM0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLE1BQU0sU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQy9DLFdBQVcsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQzthQUN2QztZQUVELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLHdEQUF3RCxXQUFXLENBQUMsTUFBTSx3RUFBd0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2pOO1lBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksRUFBRTtvQkFDaEQsTUFBTSxJQUFJLEtBQUssQ0FBQyw0R0FBNEcsV0FBVyxDQUFDLE1BQU0saUJBQWlCLENBQUMsQ0FBQztpQkFDbEs7Z0JBQ0QsV0FBVyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQzthQUNqRTtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsVUFBVSxFQUFFLENBQUM7Z0JBQ2IsYUFBYSxFQUFFLENBQUM7Z0JBQ2hCLEtBQUssRUFBRSxhQUFhLENBQUM7b0JBQ25CLGFBQWEsRUFBRSxDQUFDO2lCQUNqQixDQUFDO2FBQ0gsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEVBQUUsNkJBQTZCO2FBQ3JDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLHFCQUFxQixXQUFXLENBQUMsTUFBTSxXQUFXO2FBQzFELENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLG1CQUFtQixXQUFXLENBQUMsS0FBSyxTQUFTO2FBQ3JELENBQUMsQ0FBQztZQUVILHFDQUFxQztZQUNyQyxNQUFNLFNBQVM7WUFDYixhQUFhO1lBQ2IsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVqQywwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUU7Z0JBQzlELE1BQU0sSUFBSSxLQUFLLENBQ2Isd0RBQXdELFdBQVcsQ0FBQyxNQUFNLHlIQUF5SCxDQUNwTSxDQUFDO2FBQ0g7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hDLE1BQU0sSUFBSSxLQUFLLENBQ2Isd0RBQXdELFdBQVcsQ0FBQyxNQUFNLHdFQUF3RSxXQUFXLENBQUMsS0FBSyxrQkFBa0IsQ0FDdEwsQ0FBQzthQUNIO1lBRUQseUNBQXlDO1lBQ3pDLElBQ0UsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPO2dCQUM1QyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUNoRTtnQkFDQSxNQUFNLElBQUksS0FBSyxDQUNiLHdEQUF3RCxXQUFXLENBQUMsTUFBTSxXQUFXLFdBQVcsQ0FBQyxLQUFLLG1JQUFtSSxDQUMxTyxDQUFDO2FBQ0g7WUFFRCxrQ0FBa0M7WUFDbEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1lBQy9DLHVDQUF1QztZQUN2QyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRTtnQkFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQzlELENBQUMsVUFBVSxFQUFFLEVBQUU7O29CQUNiLElBQ0UsV0FBVyxDQUFDLE9BQU87d0JBQ25CLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUM5Qzt3QkFDQSxJQUFJLENBQUMsS0FBSyxFQUFFOzRCQUNWLElBQUksRUFBRSxTQUFTOzRCQUNmLEtBQUssRUFBRSxpQ0FBaUMsVUFBVSxZQUFZO3lCQUMvRCxDQUFDLENBQUM7d0JBQ0gsT0FBTztxQkFDUjtvQkFFRCxhQUFhO29CQUNiLE1BQU0sU0FBUztvQkFDYixhQUFhO29CQUNiLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDMUQsTUFBTSxRQUFRLEdBQUcsTUFBQSxTQUFTLENBQUMsRUFBRSxtQ0FBSSxVQUFVLENBQUM7b0JBQzVDLDBDQUEwQztvQkFDMUMsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FDekIsTUFBQSxTQUFTLENBQUMsT0FBTyxtQ0FBSSxTQUFTLENBQUMsT0FBTyxDQUN2QyxDQUFDO29CQUNGLHlDQUF5QztvQkFDekMsd0NBQXdDO29CQUN4QyxjQUFjLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7b0JBQzFDLFNBQVM7b0JBQ1Qsc0JBQXNCO29CQUN0QixJQUFJO3FCQUNMLENBQUMsQ0FBQztvQkFDSCxjQUFjLENBQUMsR0FBRyxDQUNoQixRQUFRLEVBQ1IsTUFBQSxTQUFTLENBQUMsTUFBTSxtQ0FBSSxFQUFFLEVBQ3RCLE1BQUEsTUFBQSxTQUFTLENBQUMsUUFBUSwwQ0FBRSxPQUFPLG1DQUFJLEVBQUUsQ0FDbEMsQ0FBQztnQkFDSixDQUFDLENBQ0YsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFBLEVBQ0Q7WUFDRSxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7YUFDWDtTQUNGLENBQ0YsQ0FBQztJQUNKLENBQUM7O0FBN1BNLHNCQUFVLEdBQUc7SUFDbEIsV0FBVyxFQUFFLDRCQUE0QjtDQUMxQyxDQUFDIn0=
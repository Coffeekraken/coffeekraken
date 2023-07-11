var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _SInterface from '@coffeekraken/s-interface';
import __SProcess from '@coffeekraken/s-process';
import __SPromise from '@coffeekraken/s-promise';
import __depCheck from 'depcheck';
import __packageRootDir from '../path/packageRootDir.js';
import __packageJsonSync from './packageJsonSync.js';
export class SNpmUnusedParamsInterface extends _SInterface {
    static get _definition() {
        return {
            clean: {
                type: 'Boolean',
                alias: 'r',
                description: 'Specify if you want the found unused dependencies to be reflected back into the package.json file',
                default: false,
            },
            skipDev: {
                type: 'Boolean',
                description: 'Specify if you want to skip the "devDependencies" check',
                default: false,
            },
            skipMissing: {
                type: 'Boolean',
                description: 'Specify if you want to skip the missing packages check',
                default: false,
            },
        };
    }
}
// @ts-ignore
class SNpmUnusedProcess extends __SProcess {
    /**
     * @name        constructor
     * @type         Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(initialParams = {}, settings) {
        super(initialParams, settings !== null && settings !== void 0 ? settings : {});
    }
    /**
     * @name        process
     * @type        Function
     *
     * Actual process execution
     *
     * @param       {Partial<ISNpmUnusedProcessParams>}        [params={}]         Params for the execution
     * @param       {Partial<ISNpmUnusedProcessSettings>}         [settings={}]           Some settings to override
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    process(params, settings) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = SNpmUnusedParamsInterface.apply(params);
            // starting dependencies checking
            const unusedDepJson = yield __depCheck(__packageRootDir(), {
                // @ts-ignore
                skipMissing: finalParams.skipMissing,
            });
            // Listing the unused deps
            const unusedListArray = [];
            if (unusedDepJson.dependencies) {
                unusedDepJson.dependencies.forEach((dep) => {
                    // get package json
                    const packageJson = __packageJsonSync(dep);
                    unusedListArray.push({
                        group: 'dependency',
                        name: packageJson.name,
                        version: packageJson.version,
                        license: packageJson.license,
                    });
                });
            }
            // @ts-ignore
            if (!finalParams.skipDev && unusedDepJson.devDependencies) {
                unusedDepJson.devDependencies.forEach((dep) => {
                    // get package json
                    const packageJson = __packageJsonSync(dep);
                    unusedListArray.push({
                        group: 'devDependency',
                        name: packageJson.name,
                        version: packageJson.version,
                        license: packageJson.license,
                    });
                });
            }
            // display list
            const listArray = unusedListArray.map((depObj) => {
                return `<${depObj.group === 'dependency' ? 'green' : 'red'}>[${depObj.group}]</${depObj.group === 'dependency' ? 'green' : 'red'}> ${depObj.license} <yellow>${depObj.name}</yellow> <cyan>${depObj.version}</cyan>`;
            });
            yield emit('log', {
                value: listArray.join('\n'),
            });
            const res = yield emit('ask', {
                type: 'boolean',
                message: 'Would you like to clean the dependencies?',
                default: true,
            });
            if (res) {
                console.log('process!!!');
            }
            resolve(true);
        }));
    }
}
export default SNpmUnusedProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDJCQUEyQixDQUFDO0FBQ3BELE9BQU8sVUFBaUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxnQkFBZ0IsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLGlCQUFpQixNQUFNLHNCQUFzQixDQUFDO0FBMkJyRCxNQUFNLE9BQU8seUJBQTBCLFNBQVEsV0FBVztJQUN0RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLFdBQVcsRUFDUCxtR0FBbUc7Z0JBQ3ZHLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCx5REFBeUQ7Z0JBQzdELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCx3REFBd0Q7Z0JBQzVELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELGFBQWE7QUFDYixNQUFNLGlCQUFrQixTQUFRLFVBQVU7SUFDdEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxhQUFhLEdBQUcsRUFBRSxFQUNsQixRQUE4QztRQUU5QyxLQUFLLENBQUMsYUFBYSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE9BQU8sQ0FDSCxNQUEwQyxFQUMxQyxR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
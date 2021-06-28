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
import __packageRootDir from '../path/packageRootDir';
import __packageJson from './utils/packageJson';
export class SNpmUnusedParamsInterface extends _SInterface {
}
SNpmUnusedParamsInterface.definition = {
    clean: {
        type: 'Boolean',
        alias: 'r',
        description: 'Specify if you want the found unused dependencies to be reflected back into the package.json file',
        default: false
    },
    skipDev: {
        type: 'Boolean',
        description: 'Specify if you want to skip the "devDependencies" check',
        default: false
    },
    skipMissing: {
        type: 'Boolean',
        description: 'Specify if you want to skip the missing packages check',
        default: false
    }
};
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    process(params, settings) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            // starting dependencies checking
            const unusedDepJson = yield __depCheck(__packageRootDir(), {
                // @ts-ignore
                skipMissing: params.skipMissing
            });
            // Listing the unused deps
            const unusedListArray = [];
            if (unusedDepJson.dependencies) {
                unusedDepJson.dependencies.forEach((dep) => {
                    // get package json
                    const packageJson = __packageJson(dep);
                    unusedListArray.push({
                        group: 'dependency',
                        name: packageJson.name,
                        version: packageJson.version,
                        license: packageJson.license
                    });
                });
            }
            // @ts-ignore
            if (!params.skipDev && unusedDepJson.devDependencies) {
                unusedDepJson.devDependencies.forEach((dep) => {
                    // get package json
                    const packageJson = __packageJson(dep);
                    unusedListArray.push({
                        group: 'devDependency',
                        name: packageJson.name,
                        version: packageJson.version,
                        license: packageJson.license
                    });
                });
            }
            // display list
            const listArray = unusedListArray.map((depObj) => {
                return `<${depObj.group === 'dependency' ? 'green' : 'red'}>[${depObj.group}]</${depObj.group === 'dependency' ? 'green' : 'red'}> ${depObj.license} <yellow>${depObj.name}</yellow> <cyan>${depObj.version}</cyan>`;
            });
            yield emit('log', {
                value: listArray.join('\n')
            });
            const res = yield emit('ask', {
                type: 'boolean',
                message: 'Would you like to clean the dependencies?',
                default: true
            });
            if (res) {
                console.log('process!!!');
            }
            resolve(true);
        }));
    }
}
SNpmUnusedProcess.interfaces = {
    params: {
        class: SNpmUnusedParamsInterface
    }
};
export default SNpmUnusedProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbVVudXNlZFByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTnBtVW51c2VkUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRCxPQUFPLFVBRU4sTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxnQkFBZ0IsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLGFBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQTZCaEQsTUFBTSxPQUFPLHlCQUEwQixTQUFRLFdBQVc7O0FBQ2pELG9DQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFDVCxtR0FBbUc7UUFDckcsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxTQUFTO1FBQ2YsV0FBVyxFQUFFLHlEQUF5RDtRQUN0RSxPQUFPLEVBQUUsS0FBSztLQUNmO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLFNBQVM7UUFDZixXQUFXLEVBQUUsd0RBQXdEO1FBQ3JFLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7Q0FDRixDQUFDO0FBSUosYUFBYTtBQUNiLE1BQU0saUJBQWtCLFNBQVEsVUFBVTtJQU94Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGFBQWEsR0FBRyxFQUFFLEVBQ2xCLFFBQWtEO1FBRWxELEtBQUssQ0FBQyxhQUFhLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsT0FBTyxDQUNMLE1BQWlDLEVBQ2pDLFFBQThDO1FBRTlDLE9BQU8sSUFBSSxV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
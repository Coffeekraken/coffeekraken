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
            // starting dependencies checking
            const unusedDepJson = yield __depCheck(__packageRootDir(), {
                // @ts-ignore
                skipMissing: params.skipMissing,
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
                        license: packageJson.license,
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
SNpmUnusedProcess.interfaces = {
    params: {
        class: SNpmUnusedParamsInterface,
    },
};
export default SNpmUnusedProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbVVudXNlZFByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTnBtVW51c2VkUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRCxPQUFPLFVBR04sTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxnQkFBZ0IsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLGFBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQTJCaEQsTUFBTSxPQUFPLHlCQUEwQixTQUFRLFdBQVc7SUFDdEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixXQUFXLEVBQ1AsbUdBQW1HO2dCQUN2RyxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1AseURBQXlEO2dCQUM3RCxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFdBQVcsRUFBRTtnQkFDVCxJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1Asd0RBQXdEO2dCQUM1RCxPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxhQUFhO0FBQ2IsTUFBTSxpQkFBa0IsU0FBUSxVQUFVO0lBT3RDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksYUFBYSxHQUFHLEVBQUUsRUFDbEIsUUFBa0Q7UUFFbEQsS0FBSyxDQUFDLGFBQWEsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxPQUFP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
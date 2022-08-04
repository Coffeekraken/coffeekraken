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
import __packageJson from './packageJson';
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
            if (!finalParams.skipDev && unusedDepJson.devDependencies) {
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
export default SNpmUnusedProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDJCQUEyQixDQUFDO0FBQ3BELE9BQU8sVUFBaUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxnQkFBZ0IsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUEwQjFDLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxXQUFXO0lBQ3RELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUNQLG1HQUFtRztnQkFDdkcsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLHlEQUF5RDtnQkFDN0QsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLHdEQUF3RDtnQkFDNUQsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsYUFBYTtBQUNiLE1BQU0saUJBQWtCLFNBQVEsVUFBVTtJQUN0Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLGFBQWEsR0FBRyxFQUFFLEVBQ2xCLFFBQThDO1FBRTlDLEtBQUssQ0FBQyxhQUFhLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsT0FBTyxDQUNILE1BQTBDLEVBQzFDLFFBQThD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
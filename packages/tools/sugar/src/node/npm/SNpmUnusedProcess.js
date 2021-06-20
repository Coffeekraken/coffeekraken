var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SProcess from '@coffeekraken/s-process';
import __SNpmUnusedParamsInterface from './interface/SNpmUnusedParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __depCheck from 'depcheck';
import __packageRootDir from '../path/packageRootDir';
import __packageJson from './utils/packageJson';
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
        class: __SNpmUnusedParamsInterface
    }
};
export default SNpmUnusedProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbVVudXNlZFByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTnBtVW51c2VkUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBR04sTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLDJCQUEyQixNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLGdCQUFnQixNQUFNLHdCQUF3QixDQUFDO0FBRXRELE9BQU8sYUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBeUJoRCxhQUFhO0FBQ2IsTUFBTSxpQkFBa0IsU0FBUSxVQUFVO0lBT3hDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBYSxHQUFHLEVBQUUsRUFDbEIsUUFBa0Q7UUFFbEQsS0FBSyxDQUFDLGFBQWEsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxPQUFPLENBQ0wsTUFBaUMsRUFDakMsUUFBOEM7UUFFOUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3hELGlDQUFpQztZQUNqQyxNQUFNLGFBQWEsR0FBRyxNQUFNLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO2dCQUN6RCxhQUFhO2dCQUNiLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVzthQUNoQyxDQUFDLENBQUM7WUFFSCwwQkFBMEI7WUFDMUIsTUFBTSxlQUFlLEdBQVUsRUFBRSxDQUFDO1lBRWxDLElBQUksYUFBYSxDQUFDLFlBQVksRUFBRTtnQkFDOUIsYUFBYSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDekMsbUJBQW1CO29CQUNuQixNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZDLGVBQWUsQ0FBQyxJQUFJLENBQUM7d0JBQ25CLEtBQUssRUFBRSxZQUFZO3dCQUNuQixJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUk7d0JBQ3RCLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTzt3QkFDNUIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPO3FCQUM3QixDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUVELGFBQWE7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxhQUFhLENBQUMsZUFBZSxFQUFFO2dCQUNwRCxhQUFhLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUM1QyxtQkFBbUI7b0JBQ25CLE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkMsZUFBZSxDQUFDLElBQUksQ0FBQzt3QkFDbkIsS0FBSyxFQUFFLGVBQWU7d0JBQ3RCLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTt3QkFDdEIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPO3dCQUM1QixPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87cUJBQzdCLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsZUFBZTtZQUNmLE1BQU0sU0FBUyxHQUFhLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDekQsT0FBTyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FDeEQsTUFBTSxDQUFDLEtBQ1QsTUFBTSxNQUFNLENBQUMsS0FBSyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQ25ELE1BQU0sQ0FBQyxPQUNULFlBQVksTUFBTSxDQUFDLElBQUksbUJBQW1CLE1BQU0sQ0FBQyxPQUFPLFNBQVMsQ0FBQztZQUNwRSxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDaEIsS0FBSyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzVCLENBQUMsQ0FBQztZQUVILE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDNUIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLDJDQUEyQztnQkFDcEQsT0FBTyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUM7WUFFSCxJQUFJLEdBQUcsRUFBRTtnQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzNCO1lBRUQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDOztBQXJHTSw0QkFBVSxHQUFHO0lBQ2xCLE1BQU0sRUFBRTtRQUNOLEtBQUssRUFBRSwyQkFBMkI7S0FDbkM7Q0FDRixDQUFDO0FBb0dKLGVBQWUsaUJBQWlCLENBQUMifQ==
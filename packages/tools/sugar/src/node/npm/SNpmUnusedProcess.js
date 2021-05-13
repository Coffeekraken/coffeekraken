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
import __packageRoot from '../path/packageRoot';
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
            const unusedDepJson = yield __depCheck(__packageRoot(), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbVVudXNlZFByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTnBtVW51c2VkUHJvY2Vzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBR04sTUFBTSx5QkFBeUIsQ0FBQztBQUNqQyxPQUFPLDJCQUEyQixNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLGFBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUVoRCxPQUFPLGFBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQXlCaEQsYUFBYTtBQUNiLE1BQU0saUJBQWtCLFNBQVEsVUFBVTtJQU94Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGFBQWEsR0FBRyxFQUFFLEVBQ2xCLFFBQWtEO1FBRWxELEtBQUssQ0FBQyxhQUFhLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsT0FBTyxDQUNMLE1BQWlDLEVBQ2pDLFFBQThDO1FBRTlDLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN4RCxpQ0FBaUM7WUFDakMsTUFBTSxhQUFhLEdBQUcsTUFBTSxVQUFVLENBQUMsYUFBYSxFQUFFLEVBQUU7Z0JBQ3RELGFBQWE7Z0JBQ2IsV0FBVyxFQUFFLE1BQU0sQ0FBQyxXQUFXO2FBQ2hDLENBQUMsQ0FBQztZQUVILDBCQUEwQjtZQUMxQixNQUFNLGVBQWUsR0FBVSxFQUFFLENBQUM7WUFFbEMsSUFBSSxhQUFhLENBQUMsWUFBWSxFQUFFO2dCQUM5QixhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUN6QyxtQkFBbUI7b0JBQ25CLE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkMsZUFBZSxDQUFDLElBQUksQ0FBQzt3QkFDbkIsS0FBSyxFQUFFLFlBQVk7d0JBQ25CLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTt3QkFDdEIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPO3dCQUM1QixPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87cUJBQzdCLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsYUFBYTtZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLGFBQWEsQ0FBQyxlQUFlLEVBQUU7Z0JBQ3BELGFBQWEsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQzVDLG1CQUFtQjtvQkFDbkIsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN2QyxlQUFlLENBQUMsSUFBSSxDQUFDO3dCQUNuQixLQUFLLEVBQUUsZUFBZTt3QkFDdEIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJO3dCQUN0QixPQUFPLEVBQUUsV0FBVyxDQUFDLE9BQU87d0JBQzVCLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTztxQkFDN0IsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxlQUFlO1lBQ2YsTUFBTSxTQUFTLEdBQWEsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUN6RCxPQUFPLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUN4RCxNQUFNLENBQUMsS0FDVCxNQUFNLE1BQU0sQ0FBQyxLQUFLLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FDbkQsTUFBTSxDQUFDLE9BQ1QsWUFBWSxNQUFNLENBQUMsSUFBSSxtQkFBbUIsTUFBTSxDQUFDLE9BQU8sU0FBUyxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNoQixLQUFLLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDNUIsQ0FBQyxDQUFDO1lBRUgsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUM1QixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsMkNBQTJDO2dCQUNwRCxPQUFPLEVBQUUsSUFBSTthQUNkLENBQUMsQ0FBQztZQUVILElBQUksR0FBRyxFQUFFO2dCQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDM0I7WUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBckdNLDRCQUFVLEdBQUc7SUFDbEIsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLDJCQUEyQjtLQUNuQztDQUNGLENBQUM7QUFvR0osZUFBZSxpQkFBaUIsQ0FBQyJ9
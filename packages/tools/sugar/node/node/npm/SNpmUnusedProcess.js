"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SProcess_1 = __importDefault(require("../process/SProcess"));
const SNpmUnusedParamsInterface_1 = __importDefault(require("./interface/SNpmUnusedParamsInterface"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const depcheck_1 = __importDefault(require("depcheck"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const packageJson_1 = __importDefault(require("./utils/packageJson"));
// @ts-ignore
class SNpmUnusedProcess extends SProcess_1.default {
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
        super(initialParams, settings);
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
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            // starting dependencies checking
            const unusedDepJson = yield depcheck_1.default(packageRoot_1.default(), {
                // @ts-ignore
                skipMissing: params.skipMissing
            });
            // Listing the unused deps
            const unusedListArray = [];
            if (unusedDepJson.dependencies) {
                unusedDepJson.dependencies.forEach((dep) => {
                    // get package json
                    const packageJson = packageJson_1.default(dep);
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
                    const packageJson = packageJson_1.default(dep);
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
        class: SNpmUnusedParamsInterface_1.default
    }
};
exports.default = SNpmUnusedProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05wbVVudXNlZFByb2Nlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZS9ucG0vU05wbVVudXNlZFByb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtRUFHNkI7QUFDN0Isc0dBQWdGO0FBQ2hGLHdFQUFpRDtBQUNqRCx3REFBa0M7QUFDbEMsc0VBQWdEO0FBRWhELHNFQUFnRDtBQTJCaEQsYUFBYTtBQUNiLE1BQU0saUJBQWtCLFNBQVEsa0JBQVU7SUFPeEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxhQUFhLEdBQUcsRUFBRSxFQUFFLFFBQXlDO1FBQ3ZFLEtBQUssQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsT0FBTyxDQUNMLE1BQWlDLEVBQ2pDLFFBQThDO1FBRTlDLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDeEQsaUNBQWlDO1lBQ2pDLE1BQU0sYUFBYSxHQUFHLE1BQU0sa0JBQVUsQ0FBQyxxQkFBYSxFQUFFLEVBQUU7Z0JBQ3RELGFBQWE7Z0JBQ2IsV0FBVyxFQUFFLE1BQU0sQ0FBQyxXQUFXO2FBQ2hDLENBQUMsQ0FBQztZQUVILDBCQUEwQjtZQUMxQixNQUFNLGVBQWUsR0FBVSxFQUFFLENBQUM7WUFFbEMsSUFBSSxhQUFhLENBQUMsWUFBWSxFQUFFO2dCQUM5QixhQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUN6QyxtQkFBbUI7b0JBQ25CLE1BQU0sV0FBVyxHQUFHLHFCQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZDLGVBQWUsQ0FBQyxJQUFJLENBQUM7d0JBQ25CLEtBQUssRUFBRSxZQUFZO3dCQUNuQixJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUk7d0JBQ3RCLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTzt3QkFDNUIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPO3FCQUM3QixDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUVELGFBQWE7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxhQUFhLENBQUMsZUFBZSxFQUFFO2dCQUNwRCxhQUFhLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUM1QyxtQkFBbUI7b0JBQ25CLE1BQU0sV0FBVyxHQUFHLHFCQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3ZDLGVBQWUsQ0FBQyxJQUFJLENBQUM7d0JBQ25CLEtBQUssRUFBRSxlQUFlO3dCQUN0QixJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUk7d0JBQ3RCLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTzt3QkFDNUIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPO3FCQUM3QixDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUVELGVBQWU7WUFDZixNQUFNLFNBQVMsR0FBYSxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ3pELE9BQU8sSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQ3hELE1BQU0sQ0FBQyxLQUNULE1BQU0sTUFBTSxDQUFDLEtBQUssS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUNuRCxNQUFNLENBQUMsT0FDVCxZQUFZLE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixNQUFNLENBQUMsT0FBTyxTQUFTLENBQUM7WUFDcEUsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hCLEtBQUssRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUM1QixDQUFDLENBQUM7WUFFSCxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQzVCLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSwyQ0FBMkM7Z0JBQ3BELE9BQU8sRUFBRSxJQUFJO2FBQ2QsQ0FBQyxDQUFDO1lBRUgsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMzQjtZQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFsR00sNEJBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsbUNBQTJCO0tBQ25DO0NBQ0YsQ0FBQztBQWlHSixrQkFBZSxpQkFBaUIsQ0FBQyJ9
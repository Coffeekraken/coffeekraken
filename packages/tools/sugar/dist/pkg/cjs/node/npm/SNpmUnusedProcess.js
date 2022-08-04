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
exports.SNpmUnusedParamsInterface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_process_1 = __importDefault(require("@coffeekraken/s-process"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const depcheck_1 = __importDefault(require("depcheck"));
const packageRootDir_1 = __importDefault(require("../path/packageRootDir"));
const packageJson_1 = __importDefault(require("./packageJson"));
class SNpmUnusedParamsInterface extends s_interface_1.default {
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
exports.SNpmUnusedParamsInterface = SNpmUnusedParamsInterface;
// @ts-ignore
class SNpmUnusedProcess extends s_process_1.default {
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
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = SNpmUnusedParamsInterface.apply(params);
            // starting dependencies checking
            const unusedDepJson = yield (0, depcheck_1.default)((0, packageRootDir_1.default)(), {
                // @ts-ignore
                skipMissing: finalParams.skipMissing,
            });
            // Listing the unused deps
            const unusedListArray = [];
            if (unusedDepJson.dependencies) {
                unusedDepJson.dependencies.forEach((dep) => {
                    // get package json
                    const packageJson = (0, packageJson_1.default)(dep);
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
                    const packageJson = (0, packageJson_1.default)(dep);
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
exports.default = SNpmUnusedProcess;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRFQUFvRDtBQUNwRCx3RUFBd0U7QUFDeEUsd0VBQWlEO0FBQ2pELHdEQUFrQztBQUNsQyw0RUFBc0Q7QUFDdEQsZ0VBQTBDO0FBMEIxQyxNQUFhLHlCQUEwQixTQUFRLHFCQUFXO0lBQ3RELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsV0FBVyxFQUNQLG1HQUFtRztnQkFDdkcsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLHlEQUF5RDtnQkFDN0QsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLHdEQUF3RDtnQkFDNUQsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBeEJELDhEQXdCQztBQUVELGFBQWE7QUFDYixNQUFNLGlCQUFrQixTQUFRLG1CQUFVO0lBQ3RDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksYUFBYSxHQUFHLEVBQUUsRUFDbEIsUUFBOEM7UUFFOUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxPQUFPLENBQ0gsTUFBMEMsRUFDMUMsUUFBOEM7UUFFOUMsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN0RCxNQUFNLFdBQVcsR0FBRyx5QkFB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
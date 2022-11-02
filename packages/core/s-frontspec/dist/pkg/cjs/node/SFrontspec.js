"use strict";
// @ts-nocheck
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
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const packageRootDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRootDir"));
const object_1 = require("@coffeekraken/sugar/object");
const fs_2 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SFrontspecBuildParamsInterface_1 = __importDefault(require("./interface/SFrontspecBuildParamsInterface"));
class SFrontspec extends s_promise_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings = {}) {
        super((0, object_1.__deepMerge)({
            metas: {
                id: 'SFrontspec',
            },
        }, settings));
    }
    /**
     * @name          read
     * @type          Function
     *
     * This static method allows you to search for frontspec.json files and read them to get
     * back the content of them in one call.
     *
     * @todo      update documentation
     *
     * @return      {SPromise}                          An SPromise instance that will be resolved once the frontspec.json file has been correctly read
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    read() {
        var _a, _b;
        const frontspecPath = `${(0, packageRootDir_1.default)()}/frontspec.json`;
        if (!fs_2.default.existsSync(frontspecPath)) {
            return {};
        }
        let frontspecJson = {};
        try {
            frontspecJson = (0, fs_1.__readJsonSync)(frontspecPath);
        }
        catch (e) {
            console.log(e);
        }
        let res = (0, object_1.__deepMerge)((_b = (_a = s_sugar_config_1.default.get('frontspec')) === null || _a === void 0 ? void 0 : _a.default) !== null && _b !== void 0 ? _b : {}, frontspecJson);
        res.frontspec = {
            path: frontspecPath,
            folderPath: (0, fs_1.__folderPath)(frontspecPath),
        };
        if (res.assets) {
            Object.keys(res.assets).forEach((id) => {
                const assetObj = res.assets[id];
                if (assetObj.env && !s_env_1.default.is(assetObj.env)) {
                    delete res.assets[id];
                }
            });
        }
        return res;
    }
    /**
     * @name          build
     * @type          Function
     *
     * This static method allows you to build the frontspec.json file from the configs specifies in the config.frontspec.build.sources stack.
     *
     * @param         {Partial<ISFrontspecBuildParams>}          params        The params to use to build your frontspec
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    build(params) {
        const finalParams = ((0, object_1.__deepMerge)(SFrontspecBuildParamsInterface_1.default.defaults(), params));
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const frontspecPath = `${(0, packageRootDir_1.default)()}/frontspec.json`;
            emit('log', {
                value: `<yellow>[build]</yellow> Building <cyan>frontspec.json</cyan>...`,
            });
            let finalFrontspecJson = {};
            let frontspecJson = {};
            try {
                frontspecJson = (0, fs_1.__readJsonSync)(frontspecPath);
            }
            catch (e) {
                console.log(e);
            }
            for (let [prop, sourceObj] of Object.entries(finalParams.sources)) {
                emit('log', {
                    value: `<yellow>[build]</yellow> Gathering frontspec property "<yellow>${prop}</yellow>" of type "<magenta>${sourceObj.type}</magenta>"`,
                });
                switch (sourceObj.type) {
                    case 'config':
                        finalFrontspecJson[prop] = s_sugar_config_1.default.get(prop);
                        break;
                    case 'object':
                        finalFrontspecJson[prop] = sourceObj.value;
                        break;
                    default:
                        throw new Error(`[SFrontspec.build] Sorry but the "${sourceObj.type}" source type does not exists...`);
                        break;
                }
                // process if specified
                if (sourceObj.process) {
                    finalFrontspecJson[prop] = sourceObj.process(finalFrontspecJson[prop]);
                }
            }
            if (frontspecJson.$custom) {
                finalFrontspecJson = (0, object_1.__deepMerge)({
                    $custom: frontspecJson.$custom,
                }, finalFrontspecJson, frontspecJson.$custom);
            }
            // write the file onto fs
            fs_2.default.writeFileSync(frontspecPath, JSON.stringify(finalFrontspecJson, null, 4));
            emit('log', {
                value: `<green>[save]</green> File saved <green>successfully</green> under "<cyan>${frontspecPath.replace((0, packageRootDir_1.default)() + '/', '')}</cyan>"`,
            });
            // resolve the process
            resolve();
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
    /**
     * @name      assetsToServe
     * @type      Function
     * @async
     *
     * This method will returns all the files that need to be served using a web server
     * that are defined in the frontspec.json files like some css, js etc...
     *
     * @since     2.0.0
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    assetsToServe() {
        return __awaiter(this, void 0, void 0, function* () {
            const frontspecJson = yield this.read();
            const assetsToServe = [];
            if (!frontspecJson.assets)
                return;
            Object.keys(frontspecJson.assets).forEach((type) => {
                const typeAssets = frontspecJson.assets[type];
                Object.keys(typeAssets).forEach((assetId) => {
                    var _a, _b, _c;
                    const assetObj = Object.assign({}, typeAssets[assetId]);
                    const url = (_a = assetObj.path) !== null && _a !== void 0 ? _a : assetObj.src;
                    if (assetObj.env && !s_env_1.default.is(assetObj.env))
                        return;
                    const fileObj = {
                        type,
                        id: assetId,
                        args: Object.assign({}, assetObj),
                    };
                    const filePath = path_1.default.resolve((0, packageRootDir_1.default)(), (_c = (_b = assetObj.path) !== null && _b !== void 0 ? _b : assetObj.src) !== null && _c !== void 0 ? _c : assetObj.href);
                    if (type === 'css') {
                        fileObj.args.href = fileObj.args.src;
                        delete fileObj.args.src;
                    }
                    if (fs_2.default.existsSync(filePath)) {
                        fileObj.file = s_file_1.default.new(filePath);
                    }
                    else {
                        fileObj.url = url;
                    }
                    assetsToServe.push(fileObj);
                });
            });
            return assetsToServe;
        });
    }
}
exports.default = SFrontspec;
SFrontspec._cachesStack = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLGdFQUF5QztBQUN6QyxrRUFBMkM7QUFDM0Msd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCwrQ0FBc0U7QUFDdEUsa0dBQTRFO0FBQzVFLHVEQUF5RDtBQUN6RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdIQUEwRjtBQWlEMUYsTUFBcUIsVUFBVyxTQUFRLG1CQUFVO0lBRzlDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDckIsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsWUFBWTthQUNuQjtTQUNKLEVBQ0QsUUFBUSxDQUNYLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsSUFBSTs7UUFDQSxNQUFNLGFBQWEsR0FBRyxHQUFHLElBQUEsd0JBQWdCLEdBQUUsaUJBQWlCLENBQUM7UUFFN0QsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDakMsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUVELElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJO1lBQ0EsYUFBYSxHQUFHLElBQUEsbUJBQWMsRUFBQyxhQUFhLENBQUMsQ0FBQztTQUNqRDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsQjtRQUVELElBQUksR0FBRyxHQUFHLElBQUEsb0JBQVcsRUFDakIsTUFBQSxNQUFBLHdCQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQywwQ0FBRSxPQUFPLG1DQUFJLEVBQUUsRUFDOUMsYUFBYSxDQUNoQixDQUFDO1FBRUYsR0FBRyxDQUFDLFNBQVMsR0FBRztZQUNaLElBQUksRUFBRSxhQUFhO1lBQ25CLFVBQVUsRUFBRSxJQUFBLGlCQUFZLEVBQUMsYUFBYSxDQUFDO1NBQzFDLENBQUM7UUFFRixJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDWixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtnQkFDbkMsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDekI7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxLQUFLLENBQUMsTUFBdUM7UUFDekMsTUFBTSxXQUFXLEdBQTJCLENBQ3hDLElBQUEsb0JBQVcsRUFBQyx3Q0FBZ0MsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FDbkUsQ0FBQztRQUNGLE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN0QyxNQUFNLGFBQWEsR0FBRyxHQUFHLElBQUEsd0JBQWdCLEdBQUUsaUJBQWlCLENBQUM7WUFFN0QsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsa0VBQWtFO2FBQzVFLENBQUMsQ0FBQztZQUVILElBQUksa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1lBRTVCLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUN2QixJQUFJO2dCQUNBLGFBQWEsR0FBRyxJQUFBLG1CQUFjLEVBQUMsYUFBYSxDQUFDLENBQUM7YUFDakQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xCO1lBRUQsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQ3hDLFdBQVcsQ0FBQyxPQUFPLENBQ3RCLEVBQUU7Z0JBQ0MsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsa0VBQWtFLElBQUksZ0NBQWdDLFNBQVMsQ0FBQyxJQUFJLGFBQWE7aUJBQzNJLENBQUMsQ0FBQztnQkFFSCxRQUFRLFNBQVMsQ0FBQyxJQUFJLEVBQUU7b0JBQ3BCLEtBQUssUUFBUTt3QkFDVCxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDcEQsTUFBTTtvQkFDVixLQUFLLFFBQVE7d0JBQ1Qsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQzt3QkFDM0MsTUFBTTtvQkFDVjt3QkFDSSxNQUFNLElBQUksS0FBSyxDQUNYLHFDQUFxQyxTQUFTLENBQUMsSUFBSSxrQ0FBa0MsQ0FDeEYsQ0FBQzt3QkFDRixNQUFNO2lCQUNiO2dCQUVELHVCQUF1QjtnQkFDdkIsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFO29CQUNuQixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUN4QyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FDM0IsQ0FBQztpQkFDTDthQUNKO1lBRUQsSUFBSSxhQUFhLENBQUMsT0FBTyxFQUFFO2dCQUN2QixrQkFBa0IsR0FBRyxJQUFBLG9CQUFXLEVBQzVCO29CQUNJLE9BQU8sRUFBRSxhQUFhLENBQUMsT0FBTztpQkFDakMsRUFDRCxrQkFBa0IsRUFDbEIsYUFBYSxDQUFDLE9BQU8sQ0FDeEIsQ0FBQzthQUNMO1lBRUQseUJBQXlCO1lBQ3pCLFlBQUksQ0FBQyxhQUFhLENBQ2QsYUFBYSxFQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUM5QyxDQUFDO1lBRUYsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsNkVBQTZFLGFBQWEsQ0FBQyxPQUFPLENBQ3JHLElBQUEsd0JBQWdCLEdBQUUsR0FBRyxHQUFHLEVBQ3hCLEVBQUUsQ0FDTCxVQUFVO2FBQ2QsQ0FBQyxDQUFDO1lBRUgsc0JBQXNCO1lBQ3RCLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFBLEVBQ0Q7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTthQUM1QjtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0csYUFBYTs7WUFDZixNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUV4QyxNQUFNLGFBQWEsR0FBOEIsRUFBRSxDQUFDO1lBRXBELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTTtnQkFBRSxPQUFPO1lBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMvQyxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOztvQkFDeEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3hELE1BQU0sR0FBRyxHQUFHLE1BQUEsUUFBUSxDQUFDLElBQUksbUNBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQztvQkFFMUMsSUFBSSxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO3dCQUFFLE9BQU87b0JBRXJELE1BQU0sT0FBTyxHQUFHO3dCQUNaLElBQUk7d0JBQ0osRUFBRSxFQUFFLE9BQU87d0JBQ1gsSUFBSSxvQkFDRyxRQUFRLENBQ2Q7cUJBQ0osQ0FBQztvQkFFRixNQUFNLFFBQVEsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUMzQixJQUFBLHdCQUFnQixHQUFFLEVBQ2xCLE1BQUEsTUFBQSxRQUFRLENBQUMsSUFBSSxtQ0FBSSxRQUFRLENBQUMsR0FBRyxtQ0FBSSxRQUFRLENBQUMsSUFBSSxDQUNqRCxDQUFDO29CQUVGLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRTt3QkFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7d0JBQ3JDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7cUJBQzNCO29CQUVELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTt3QkFDM0IsT0FBTyxDQUFDLElBQUksR0FBRyxnQkFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDeEM7eUJBQU07d0JBQ0gsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7cUJBQ3JCO29CQUVELGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLGFBQWEsQ0FBQztRQUN6QixDQUFDO0tBQUE7O0FBbE9MLDZCQW1PQztBQWxPVSx1QkFBWSxHQUFHLEVBQUUsQ0FBQyJ9
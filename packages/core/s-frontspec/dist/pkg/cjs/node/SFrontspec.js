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
        return new s_promise_1.default(({ resolve, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const frontspecPath = `${(0, packageRootDir_1.default)()}/frontspec.json`;
            if (!fs_2.default.existsSync(frontspecPath)) {
                return resolve({});
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
            resolve(res);
        }));
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
            let finalFrontspecJson = {};
            let frontspecJson = {};
            try {
                frontspecJson = (0, fs_1.__readJsonSync)(frontspecPath);
            }
            catch (e) {
                console.log(e);
            }
            for (let [configId, sourceObj] of Object.entries(finalParams.sources)) {
                console.log(sourceObj);
                switch (sourceObj.type) {
                    case 'config':
                        finalFrontspecJson[configId] =
                            s_sugar_config_1.default.get(configId);
                        break;
                    case 'object':
                        finalFrontspecJson[configId] = sourceObj.value;
                        break;
                    default:
                        throw new Error(`[SFrontspec.build] Sorry but the "${sourceObj.type}" source type does not exists...`);
                        break;
                }
                // process if specified
                if (sourceObj.process) {
                    finalFrontspecJson[configId] = sourceObj.process(finalFrontspecJson[configId]);
                }
            }
            if (frontspecJson.$custom) {
                finalFrontspecJson = (0, object_1.__deepMerge)({
                    $custom: frontspecJson.$custom,
                }, finalFrontspecJson, frontspecJson.$custom);
            }
            // write the file onto fs
            fs_2.default.writeFileSync(frontspecPath, JSON.stringify(finalFrontspecJson, null, 4));
            // resolve the process
            resolve();
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLGdFQUF5QztBQUN6QyxrRUFBMkM7QUFDM0Msd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCwrQ0FBc0U7QUFDdEUsa0dBQTRFO0FBQzVFLHVEQUF5RDtBQUN6RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdIQUEwRjtBQWtEMUYsTUFBcUIsVUFBVyxTQUFRLG1CQUFVO0lBRzlDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDckIsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsWUFBWTthQUNuQjtTQUNKLEVBQ0QsUUFBUSxDQUNYLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsSUFBSTtRQUNBLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1lBQ3BELE1BQU0sYUFBYSxHQUFHLEdBQUcsSUFBQSx3QkFBZ0IsR0FBRSxpQkFBaUIsQ0FBQztZQUU3RCxJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDakMsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdEI7WUFFRCxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDdkIsSUFBSTtnQkFDQSxhQUFhLEdBQUcsSUFBQSxtQkFBYyxFQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2pEO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNsQjtZQUVELElBQUksR0FBRyxHQUFHLElBQUEsb0JBQVcsRUFDakIsTUFBQSxNQUFB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
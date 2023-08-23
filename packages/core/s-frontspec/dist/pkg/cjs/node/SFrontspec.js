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
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
const SFrontspecBuildParamsInterface_js_1 = __importDefault(require("./interface/SFrontspecBuildParamsInterface.js"));
class SFrontspec extends s_class_1.default {
    /**
     * @name        exists
     * @type        Function
     * @static
     *
     * Check if the frontspec.json exists or not
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static exists() {
        const frontspecPath = `${(0, path_1.__packageRootDir)()}/frontspec.json`;
        return fs_2.default.existsSync(frontspecPath);
    }
    /**
     * @name        get
     * @type        Function
     * @static
     *
     * Access a frontspec value by passing a dotpath like "partytown.enabled", or by accessing the full frontspec object by using `.get()` call.
     *
     * @param       {String}        [dotpah="."]            The dotpath of the frontspec value you want to access
     * @return      {Any}                                   The getted frontspec value
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get(dotpath = '.') {
        if (!this._defaultFrontspecInstance) {
            this._defaultFrontspecInstance = new SFrontspec();
        }
        return this._defaultFrontspecInstance.get(dotpath);
    }
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
     * @name        get
     * @type        Function
     *
     * Access a frontspec value by passing a dotpath like "partytown.enabled", or by accessing the full frontspec object by using `.get()` call.
     *
     * @param       {String}        [dotpah="."]            The dotpath of the frontspec value you want to access
     * @return      {Any}                                   The getted frontspec value
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get(dotpath = '.') {
        this.read(); // make sure we have the content
        return (0, object_1.__get)(this._frontspec, dotpath);
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
        // cached
        if (this._frontspec) {
            return this._frontspec;
        }
        const frontspecPath = `${(0, path_1.__packageRootDir)()}/frontspec.json`;
        if (!fs_2.default.existsSync(frontspecPath)) {
            return {};
        }
        let frontspecJson = {};
        try {
            frontspecJson = (0, fs_1.__readJsonSync)(frontspecPath);
        }
        catch (e) {
            // console.log(e);
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
        // cache the frontspec
        this._frontspec = res;
        return res;
    }
    /**
     * @name          build
     * @type          Function
     *
     * This static method allows you to build the frontspec.json file from the configs specifies in the config.frontspec.build.sources stack.
     *
     * @param         {Partial<ISFrontspecBuildParams>}          params        The params to use to build your frontspec
     * @return        {Promise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    build(params) {
        const finalParams = ((0, object_1.__deepMerge)(SFrontspecBuildParamsInterface_js_1.default.defaults(), params));
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const frontspecPath = `${(0, path_1.__packageRootDir)()}/frontspec.json`;
            console.log(`<yellow>[build]</yellow> Building <cyan>frontspec.json</cyan>...`);
            let finalFrontspecJson = {};
            let frontspecJson = {};
            try {
                frontspecJson = (0, fs_1.__readJsonSync)(frontspecPath);
            }
            catch (e) {
                console.log(e);
            }
            for (let [prop, sourceObj] of Object.entries(finalParams.sources)) {
                console.log(`<yellow>[build]</yellow> Gathering frontspec property "<yellow>${prop}</yellow>" of type "<magenta>${sourceObj.type}</magenta>"`);
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
            console.log(`<green>[save]</green> File saved <green>successfully</green> under "<cyan>${frontspecPath.replace((0, path_1.__packageRootDir)() + '/', '')}</cyan>"`);
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
                    const filePath = path_2.default.resolve((0, path_1.__packageRootDir)(), (_c = (_b = assetObj.path) !== null && _b !== void 0 ? _b : assetObj.src) !== null && _c !== void 0 ? _c : assetObj.href);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG9FQUE2QztBQUM3QyxnRUFBeUM7QUFDekMsa0VBQTJDO0FBQzNDLGtGQUEwRDtBQUMxRCwrQ0FBc0U7QUFDdEUsdURBQWdFO0FBQ2hFLG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLHNIQUE2RjtBQXNEN0YsTUFBcUIsVUFBVyxTQUFRLGlCQUFRO0lBTTVDOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBQyxNQUFNO1FBQ1QsTUFBTSxhQUFhLEdBQUcsR0FBRyxJQUFBLHVCQUFnQixHQUFFLGlCQUFpQixDQUFDO1FBQzdELE9BQU8sWUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFrQixHQUFHO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUU7WUFDakMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7U0FDckQ7UUFDRCxPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDckIsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsWUFBWTthQUNuQjtTQUNKLEVBQ0QsUUFBUSxDQUNYLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEdBQUcsQ0FBQyxVQUFrQixHQUFHO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLGdDQUFnQztRQUM3QyxPQUFP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
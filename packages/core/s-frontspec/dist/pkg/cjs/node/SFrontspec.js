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
        this._frontspec = {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG9FQUE2QztBQUM3QyxnRUFBeUM7QUFDekMsa0VBQTJDO0FBQzNDLGtGQUEwRDtBQUMxRCwrQ0FBc0U7QUFDdEUsdURBQWdFO0FBQ2hFLG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLHNIQUE2RjtBQXNEN0YsTUFBcUIsVUFBVyxTQUFRLGlCQUFRO0lBTTVDOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBQyxNQUFNO1FBQ1QsTUFBTSxhQUFhLEdBQUcsR0FBRyxJQUFBLHVCQUFnQixHQUFFLGlCQUFpQixDQUFDO1FBQzdELE9BQU8sWUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFrQixHQUFHO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUU7WUFDakMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7U0FDckQ7UUFDRCxPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDckIsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsWUFBWTthQUNuQjtTQUNKLEVBQ0QsUUFBUSxDQUNYLENBQ0osQ0FBQztRQXpETixlQUFVLEdBQWdCLEVBQUUsQ0FBQztJQTBEN0IsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsR0FBRyxDQUFDLFVBQWtCLEdBQUc7UUFDckIsSUFBSSxDQUFDLElBQUksRUFB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
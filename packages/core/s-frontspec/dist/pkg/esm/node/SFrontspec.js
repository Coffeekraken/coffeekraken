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
import __SEnv from '@coffeekraken/s-env';
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __folderPath, __readJsonSync } from '@coffeekraken/sugar/fs';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __fs from 'fs';
import __path from 'path';
import __SFrontspecBuildParamsInterface from './interface/SFrontspecBuildParamsInterface';
export default class SFrontspec extends __SPromise {
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
        super(__deepMerge({
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
        const frontspecPath = `${__packageRootDir()}/frontspec.json`;
        if (!__fs.existsSync(frontspecPath)) {
            return {};
        }
        let frontspecJson = {};
        try {
            frontspecJson = __readJsonSync(frontspecPath);
        }
        catch (e) {
            console.log(e);
        }
        let res = __deepMerge((_b = (_a = __SSugarConfig.get('frontspec')) === null || _a === void 0 ? void 0 : _a.default) !== null && _b !== void 0 ? _b : {}, frontspecJson);
        res.frontspec = {
            path: frontspecPath,
            folderPath: __folderPath(frontspecPath),
        };
        if (res.assets) {
            Object.keys(res.assets).forEach((id) => {
                const assetObj = res.assets[id];
                if (assetObj.env && !__SEnv.is(assetObj.env)) {
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
     * @return        {Promise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    build(params) {
        const finalParams = (__deepMerge(__SFrontspecBuildParamsInterface.defaults(), params));
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const frontspecPath = `${__packageRootDir()}/frontspec.json`;
            console.log(`<yellow>[build]</yellow> Building <cyan>frontspec.json</cyan>...`);
            let finalFrontspecJson = {};
            let frontspecJson = {};
            try {
                frontspecJson = __readJsonSync(frontspecPath);
            }
            catch (e) {
                console.log(e);
            }
            for (let [prop, sourceObj] of Object.entries(finalParams.sources)) {
                console.log(`<yellow>[build]</yellow> Gathering frontspec property "<yellow>${prop}</yellow>" of type "<magenta>${sourceObj.type}</magenta>"`);
                switch (sourceObj.type) {
                    case 'config':
                        finalFrontspecJson[prop] = __SSugarConfig.get(prop);
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
                finalFrontspecJson = __deepMerge({
                    $custom: frontspecJson.$custom,
                }, finalFrontspecJson, frontspecJson.$custom);
            }
            // write the file onto fs
            __fs.writeFileSync(frontspecPath, JSON.stringify(finalFrontspecJson, null, 4));
            console.log(`<green>[save]</green> File saved <green>successfully</green> under "<cyan>${frontspecPath.replace(__packageRootDir() + '/', '')}</cyan>"`);
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
                    if (assetObj.env && !__SEnv.is(assetObj.env))
                        return;
                    const fileObj = {
                        type,
                        id: assetId,
                        args: Object.assign({}, assetObj),
                    };
                    const filePath = __path.resolve(__packageRootDir(), (_c = (_b = assetObj.path) !== null && _b !== void 0 ? _b : assetObj.src) !== null && _c !== void 0 ? _c : assetObj.href);
                    if (type === 'css') {
                        fileObj.args.href = fileObj.args.src;
                        delete fileObj.args.src;
                    }
                    if (__fs.existsSync(filePath)) {
                        fileObj.file = __SFile.new(filePath);
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
SFrontspec._cachesStack = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RFLE9BQU8sZ0JBQWdCLE1BQU0sOENBQThDLENBQUM7QUFDNUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxnQ0FBZ0MsTUFBTSw0Q0FBNEMsQ0FBQztBQWlEMUYsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsVUFBVTtJQUc5Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3JCLEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLFlBQVk7YUFDbkI7U0FDSixFQUNELFFBQVEsQ0FDWCxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILElBQUk7O1FBQ0EsTUFBTSxhQUFhLEdBQUcsR0FBRyxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQztRQUU3RCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUNqQyxPQUFPLEVBQUUsQ0FBQztTQUNiO1FBRUQsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUk7WUFDQSxhQUFhLEdBQUcsY0FBYyxDQUFDLGFBQWEsQ0FB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
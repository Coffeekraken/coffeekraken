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
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __path from 'path';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __delete from '@coffeekraken/sugar/shared/object/delete';
export default class SFrontspec extends __SPromise {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    read() {
        return new __SPromise(({ resolve, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const frontspecPath = `${__packageRootDir()}/frontspec.json`;
            let frontspecJson = {};
            try {
                frontspecJson = __readJsonSync(frontspecPath);
            }
            catch (e) {
                console.log('ER', e);
            }
            let res = __deepMerge((_a = __SSugarConfig.get('frontspec')) !== null && _a !== void 0 ? _a : {}, frontspecJson);
            if (res.assets) {
                Object.keys(res.assets).forEach((type) => {
                    const typeObj = res.assets[type];
                    Object.keys(typeObj).forEach((asset) => {
                        const assetObj = typeObj[asset];
                        if (assetObj.env && !__SEnv.is(assetObj.env)) {
                            __delete(res.assets, `${type}.${asset}`);
                        }
                    });
                });
            }
            resolve(res);
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
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGcm9udHNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sZ0JBQWdCLE1BQU0sOENBQThDLENBQUM7QUFDNUUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLGNBQWMsTUFBTSwwQ0FBMEMsQ0FBQztBQUV0RSxPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQWdDaEUsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsVUFBVTtJQUc5Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3JCLEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLFlBQVk7YUFDbkI7U0FDSixFQUNELFFBQVEsQ0FDWCxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILElBQUk7UUFDQSxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1lBQ3BELE1BQU0sYUFBYSxHQUFHLEdBQUcsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUM7WUFFN0QsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQUk7Z0JBQ0EsYUFBYSxHQUFHLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNqRDtZQUFDLE9BQU8s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
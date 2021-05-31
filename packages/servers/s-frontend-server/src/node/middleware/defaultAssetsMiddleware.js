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
import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __SEnv from '@coffeekraken/s-env';
/**
 * @name            defaultAssetsMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function describe the middleware that will check if some default assets like javascript and css
 * file(s) are present and can be integrated automatically to the templateData stack
 *
 * @param           {Object}            req             The request made on the express server
 * @param           {Object}            res             The response object of the express server
 * @param           {Function}          next            The next function to call when the middleware has finished his job
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import express from 'express';
 * import defaultAssetsMiddleware from '@coffeekraken/sugar/server/frontend/middleware/defaultAssetsMiddleware';
 * const server = express();
 * server.use(defaultAssetsMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function defaultAssetsMiddleware(settings = {}) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverRootDir = __SugarConfig.get('frontendServer.rootDir');
            const assetsConfig = __SugarConfig.get('frontendServer.assets');
            settings = Object.assign({}, settings);
            if (!res.templateData)
                res.templateData = {};
            if (!res.templateData.assets)
                res.templateData.assets = {};
            Object.keys(assetsConfig !== null && assetsConfig !== void 0 ? assetsConfig : {}).forEach((type) => {
                Object.keys(assetsConfig[type]).forEach((id) => {
                    var _a, _b, _c;
                    const assetObj = assetsConfig[type][id];
                    if (!assetObj.path)
                        return;
                    // fill assetobj
                    assetObj.type = (_a = assetObj.type) !== null && _a !== void 0 ? _a : type;
                    if (__fs.existsSync(assetObj.path)) {
                        if (!res.templateData.assets[type])
                            res.templateData.assets[type] = {};
                        const assetHash = __md5.encrypt((_b = assetObj.path) !== null && _b !== void 0 ? _b : assetObj.src);
                        let raw = '', finalId = (_c = assetObj.id) !== null && _c !== void 0 ? _c : id;
                        let src = assetObj.path.replace(serverRootDir, '');
                        if (__SEnv.is('dev')) {
                            src = `http://${__ipAddress()}${src}`;
                        }
                        const originalSrc = src;
                        if (!__SEnv.is('prod') && !src.match(/\?/)) {
                            src += `?v=${Math.round(Math.random() * 9999999999)}`;
                        }
                        switch (assetObj.type.toLowerCase()) {
                            case 'js':
                                raw = `<script ${[
                                    finalId ? `id="${finalId}"` : '',
                                    assetObj.defer ? 'defer' : '',
                                    `src="${src}"`
                                ]
                                    .join(' ')
                                    .replace(/\s{2,9999}/gm, ' ')}></script>`;
                                break;
                            case 'css':
                                raw = `<link rel="stylesheet" ${[
                                    finalId ? `id="${finalId}"` : '',
                                    assetObj.defer ? 'defer' : '',
                                    `href="${src}"`
                                ]
                                    .join(' ')
                                    .replace(/\s{2,9999}/gm, ' ')} />`;
                                break;
                        }
                        if (__fs.existsSync(assetObj.path + '.map')) {
                            res.templateData.assets[type][finalId + '.map'] = {
                                id: finalId + '.map',
                                type: assetObj.type + '.map',
                                hash: `${assetHash}.map`,
                                path: `${assetObj.path}.map`,
                                src: `${originalSrc}.map`
                            };
                        }
                        res.templateData.assets[type][finalId] = {
                            id: finalId,
                            type: assetObj.type,
                            hash: assetHash,
                            path: assetObj.path,
                            src,
                            raw
                        };
                    }
                });
            });
            return next();
        });
    };
}
export default defaultAssetsMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdEFzc2V0c01pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWZhdWx0QXNzZXRzTWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxXQUFXLE1BQU0sa0RBQWtELENBQUM7QUFDM0UsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFFekQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBRXRCLE9BQU8sS0FBSyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3pELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBRXpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsdUJBQXVCLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDNUMsT0FBTyxVQUFnQixHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7O1lBQ25DLE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNsRSxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFFaEUsUUFBUSxxQkFDSCxRQUFRLENBQ1osQ0FBQztZQUVGLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWTtnQkFBRSxHQUFHLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNO2dCQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUUzRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksYUFBWixZQUFZLGNBQVosWUFBWSxHQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFD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
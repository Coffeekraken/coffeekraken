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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = __importDefault(require("fs"));
const md5_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/md5"));
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
            const serverRootDir = s_sugar_config_1.default('frontendServer.rootDir');
            const assetsConfig = s_sugar_config_1.default('frontendServer.assets');
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
                    if (fs_1.default.existsSync(assetObj.path)) {
                        if (!res.templateData.assets[type])
                            res.templateData.assets[type] = {};
                        const assetHash = md5_1.default.encrypt((_b = assetObj.path) !== null && _b !== void 0 ? _b : assetObj.src);
                        let raw = '', finalId = (_c = assetObj.id) !== null && _c !== void 0 ? _c : id;
                        const src = assetObj.path.replace(serverRootDir, '');
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
                        if (fs_1.default.existsSync(assetObj.path + '.map')) {
                            res.templateData.assets[type][finalId + '.map'] = {
                                id: finalId + '.map',
                                type: assetObj.type + '.map',
                                hash: `${assetHash}.map`,
                                path: `${assetObj.path}.map`,
                                src: `${src}.map`
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
exports.default = defaultAssetsMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdEFzc2V0c01pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWZhdWx0QXNzZXRzTWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxrRkFBeUQ7QUFFekQsNENBQXNCO0FBRXRCLCtFQUF5RDtBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLHVCQUF1QixDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQzVDLE9BQU8sVUFBZ0IsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJOztZQUNuQyxNQUFNLGFBQWEsR0FBRyx3QkFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDOUQsTUFBTSxZQUFZLEdBQUcsd0JBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBRTVELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWTtnQkFBRSxHQUFHLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNO2dCQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUUzRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksYUFBWixZQUFZLGNBQVosWUFBWSxHQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFOztvQkFDN0MsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUk7d0JBQUUsT0FBTztvQkFFM0IsZ0JBQWdCO29CQUNoQixRQUFRLENBQUMsSUFBSSxTQUFHLFFBQVEsQ0FBQyxJQUFJLG1DQUFJLElBQUksQ0FBQztvQkFFdEMsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzs0QkFDaEMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUNyQyxNQUFNLFNBQVMsR0FBRyxhQUFLLENBQUMsT0FBTyxPQUFDLFFBQVEsQ0FBQyxJQUFJLG1DQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDL0QsSUFBSSxHQUFHLEdBQUcsRUFBRSxFQUNWLE9BQU8sU0FBRyxRQUFRLENBQUMsRUFBRSxtQ0FBSSxFQUFFLENBQUM7d0JBQzlCLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFFckQsUUFBUSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFOzRCQUNuQyxLQUFLLElBQUk7Z0NBQ1AsR0FBRyxHQUFHLFdBQVc7b0NBQ2YsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO29DQUNoQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0NBQzdCLFFBQVEsR0FBRyxHQUFHO2lDQUNmO3FDQUNFLElBQUksQ0FBQyxHQUFHLENBQUM7cUNBQ1QsT0FBTyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDO2dDQUM1QyxNQUFNOzRCQUNSLEtBQUssS0FBSztnQ0FDUixHQUFHLEdBQUcsMEJBQTBCO29DQUM5QixPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0NBQ2hDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtvQ0FDN0IsU0FBUyxHQUFHLEdBQUc7aUNBQ2hCO3FDQUNFLElBQUksQ0FBQyxHQUFHLENBQUM7cUNBQ1QsT0FBTyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDO2dDQUNyQyxNQUFNO3lCQUNUO3dCQUVELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxFQUFFOzRCQUMzQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUc7Z0NBQ2hELEVBQUUsRUFBRSxPQUFPLEdBQUcsTUFBTTtnQ0FDcEIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTTtnQ0FDNUIsSUFBSSxFQUFFLEdBQUcsU0FBUyxNQUFNO2dDQUN4QixJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsSUFBSSxNQUFNO2dDQUM1QixHQUFHLEVBQUUsR0FBRyxHQUFHLE1BQU07NkJBQ2xCLENBQUM7eUJBQ0g7d0JBRUQsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUc7NEJBQ3ZDLEVBQUUsRUFBRSxPQUFPOzRCQUNYLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTs0QkFDbkIsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJOzRCQUNuQixHQUFHOzRCQUNILEdBQUc7eUJBQ0osQ0FBQztxQkFDSDtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO0tBQUEsQ0FBQztBQUNKLENBQUM7QUFDRCxrQkFBZSx1QkFBdUIsQ0FBQyJ9
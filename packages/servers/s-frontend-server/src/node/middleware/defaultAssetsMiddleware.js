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
const ipAddress_1 = __importDefault(require("@coffeekraken/sugar/node/network/utils/ipAddress"));
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
            settings = Object.assign(Object.assign({}, settings), { env: s_sugar_config_1.default('env.env') });
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
                        let src = assetObj.path.replace(serverRootDir, '');
                        if (settings.env === 'development') {
                            src = `http://${ipAddress_1.default()}${src}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdEFzc2V0c01pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZWZhdWx0QXNzZXRzTWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxpR0FBMkU7QUFDM0Usa0ZBQXlEO0FBRXpELDRDQUFzQjtBQUV0QiwrRUFBeUQ7QUFFekQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyx1QkFBdUIsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUM1QyxPQUFPLFVBQWdCLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTs7WUFDbkMsTUFBTSxhQUFhLEdBQUcsd0JBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzlELE1BQU0sWUFBWSxHQUFHLHdCQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUU1RCxRQUFRLG1DQUNILFFBQVEsS0FDWCxHQUFHLEVBQUUsd0JBQWEsQ0FBQyxTQUFTLENBQUMsR0FDOUIsQ0FBQztZQUVGLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWTtnQkFBRSxHQUFHLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNO2dCQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUUzRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksYUFBWixZQUFZLGNBQVosWUFBWSxHQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFOztvQkFDN0MsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN4QyxJ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
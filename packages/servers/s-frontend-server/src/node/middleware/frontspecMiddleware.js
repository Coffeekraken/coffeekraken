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
const fs_1 = __importDefault(require("fs"));
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const md5_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/md5"));
/**
 * @name            frontspecMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function describe the middleware that will fetch the ```frontspec.json``` file at the root of
 * your server directory and add it to the template data sended to the rendered view
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
 * import frontspecMiddleware from '@coffeekraken/sugar/server/frontend/middleware/frontspecMiddleware';
 * const server = express();
 * server.use(frontspecMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
require('events').EventEmitter.defaultMaxListeners = Infinity;
const _requestedFiles = {};
function frontspecMiddleware(settings = {}) {
    return function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // handle already fetched files
            if (_requestedFiles[req.path]) {
                const assetObj = _requestedFiles[req.path];
                // var readStream = __fs.createReadStream(assetObj.path);
                // readStream.pipe(res);
                let content = fs_1.default.readFileSync(assetObj.path, 'utf8').toString();
                content = content.replace(/\/\/# sourceMappingURL=.*\.map/gm, `// #sourceMappingUrl=${assetObj.src}.map`);
                console.log(`Request on "<cyan>${assetObj.src}</cyan>"`);
                res.send(content);
                return;
            }
            const frontspec = new s_frontspec_1.default();
            const assetsToServe = yield frontspec.assetsToServe({});
            if (!res.templateData)
                res.templateData = {};
            if (!res.templateData.assets)
                res.templateData.assets = {};
            for (let i = 0; i < assetsToServe.length; i++) {
                const assetObj = assetsToServe[i];
                if (!res.templateData.assets[assetObj.type])
                    res.templateData.assets[assetObj.type] = {};
                const assetHash = md5_1.default.encrypt((_a = assetObj.path) !== null && _a !== void 0 ? _a : assetObj.src);
                let raw = '';
                const src = `/frontspec/${assetHash}-${assetObj.file.name}`;
                switch (assetObj.type.toLowerCase()) {
                    case 'js':
                        raw = `<script ${[
                            assetObj.id ? `id="${assetObj.id}"` : '',
                            assetObj.defer ? 'defer' : '',
                            `src="${src}"`
                        ]
                            .join(' ')
                            .replace(/\s{2,9999}/gm, ' ')}></script>`;
                        break;
                    case 'css':
                        raw = `<link rel="stylesheet" ${[
                            assetObj.id ? `id="${assetObj.id}"` : '',
                            assetObj.defer ? 'defer' : '',
                            `href="${src}"`
                        ]
                            .join(' ')
                            .replace(/\s{2,9999}/gm, ' ')} />`;
                        break;
                }
                if (fs_1.default.existsSync(assetObj.path + '.map')) {
                    _requestedFiles[`${src}.map`] = {
                        id: assetObj.id + '.map',
                        type: assetObj.type + '.map',
                        hash: `${assetHash}.map`,
                        path: `${assetObj.path}.map`,
                        src: `${src}.map`
                    };
                }
                _requestedFiles[src] = {
                    id: assetObj.id,
                    type: assetObj.type,
                    hash: assetHash,
                    path: assetObj.path,
                    src,
                    raw
                };
                res.templateData.assets[assetObj.type][assetHash] = _requestedFiles[src];
            }
            return next();
        });
    };
}
exports.default = frontspecMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzcGVjTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyb250c3BlY01pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBR2QsNENBQXNCO0FBSXRCLDRFQUFxRDtBQUNyRCwrRUFBeUQ7QUFFekQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUM7QUFDOUQsTUFBTSxlQUFlLEdBQXdCLEVBQUUsQ0FBQztBQUNoRCxTQUFTLG1CQUFtQixDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQ3hDLE9BQU8sVUFBZ0IsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJOzs7WUFDbkMsK0JBQStCO1lBQy9CLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDN0IsTUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0MseURBQXlEO2dCQUN6RCx3QkFBd0I7Z0JBQ3hCLElBQUksT0FBTyxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDbEUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQ3ZCLGtDQUFrQyxFQUNsQyx3QkFBd0IsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUMzQyxDQUFDO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDO2dCQUN6RCxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQixPQUFPO2FBQ1I7WUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQztZQUNyQyxNQUFNLGFBQWEs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
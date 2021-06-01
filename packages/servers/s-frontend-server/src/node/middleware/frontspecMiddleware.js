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
import __fs from 'fs';
import __SFrontspec from '@coffeekraken/s-frontspec';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __SEnv from '@coffeekraken/s-env';
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
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            // handle already fetched files
            if (_requestedFiles[req.path]) {
                const assetObj = _requestedFiles[req.path];
                // var readStream = __fs.createReadStream(assetObj.path);
                // readStream.pipe(res);
                let content = __fs.readFileSync(assetObj.path, 'utf8').toString();
                content = content.replace(/\/\/# sourceMappingURL=.*\.map/gm, `// #sourceMappingUrl=${assetObj.src}.map`);
                console.log(`Request on "<cyan>${assetObj.src}</cyan>"`);
                res.send(content);
                return;
            }
            const frontspec = new __SFrontspec();
            const assetsToServe = yield frontspec.assetsToServe();
            if (!res.templateData)
                res.templateData = {};
            if (!res.templateData.assets)
                res.templateData.assets = {};
            for (let i = 0; i < assetsToServe.length; i++) {
                const assetObj = assetsToServe[i];
                if (!res.templateData.assets[assetObj.type])
                    res.templateData.assets[assetObj.type] = {};
                const assetHash = __md5.encrypt((_b = (_a = assetObj.src) !== null && _a !== void 0 ? _a : assetObj.url) !== null && _b !== void 0 ? _b : (_c = assetObj.file) === null || _c === void 0 ? void 0 : _c.path);
                let raw = '';
                let url;
                if (assetObj.file) {
                    url = `/frontspec/${assetHash}-${assetObj.file.name}`;
                }
                else if (assetObj.url)
                    url = assetObj.url;
                const originalUrl = url;
                // cache busting in dev
                if (!__SEnv.is('prod') && !((_d = assetObj.url) === null || _d === void 0 ? void 0 : _d.match(/@vite/))) {
                    const version = `?v=${Math.round(Math.random() * 9999999999)}`;
                    if (assetObj.args.src)
                        assetObj.args.src += version;
                    if (assetObj.args.href)
                        assetObj.args.href += version;
                }
                switch (assetObj.type.toLowerCase()) {
                    case 'js':
                        raw = `<script ${[
                            assetObj.id ? `id="${assetObj.id}"` : '',
                            Object.keys(assetObj.args)
                                .map((argName) => {
                                return `${argName}${assetObj.args[argName] === true
                                    ? ''
                                    : `="${assetObj.args[argName]}"`}`;
                            })
                                .join(' ')
                        ]
                            .join(' ')
                            .replace(/\s{2,9999}/gm, ' ')}></script>`;
                        break;
                    case 'css':
                        raw = `<link rel="stylesheet" ${[
                            assetObj.id ? `id="${assetObj.id}"` : '',
                            Object.keys(assetObj.args)
                                .map((argName) => {
                                return `${argName}${assetObj.args[argName] === true
                                    ? ''
                                    : `="${assetObj.args[argName]}"`}`;
                            })
                                .join(' ')
                        ]
                            .join(' ')
                            .replace(/\s{2,9999}/gm, ' ')} />`;
                        break;
                }
                if (assetObj.file) {
                    if (__fs.existsSync(assetObj.file.path + '.map')) {
                        _requestedFiles[`${originalUrl}.map`] = {
                            id: assetObj.id + '.map',
                            type: assetObj.type + '.map',
                            hash: `${assetHash}.map`,
                            path: `${assetObj.file.path}.map`,
                            src: `${originalUrl}.map`
                        };
                    }
                    _requestedFiles[originalUrl] = {
                        id: assetObj.id,
                        type: assetObj.type,
                        hash: assetHash,
                        path: assetObj.file.path,
                        url,
                        raw
                    };
                }
                else if (assetObj.url) {
                    _requestedFiles[originalUrl] = {
                        id: assetObj.id,
                        type: assetObj.type,
                        hash: assetHash,
                        url,
                        raw
                    };
                }
                res.templateData.assets[assetObj.type][assetHash] = _requestedFiles[originalUrl];
            }
            return next();
        });
    };
}
export default frontspecMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzcGVjTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyb250c3BlY01pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUdkLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUl0QixPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUV6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQztBQUM5RCxNQUFNLGVBQWUsR0FBd0IsRUFBRSxDQUFDO0FBQ2hELFNBQVMsbUJBQW1CLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDeEMsT0FBTyxVQUFnQixHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7OztZQUNuQywrQkFBK0I7WUFDL0IsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM3QixNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQyx5REFBeUQ7Z0JBQ3pELHdCQUF3QjtnQkFDeEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNsRSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FDdkIsa0NBQWtDLEVBQ2xDLHdCQUF3QixRQUFRLENBQUMsR0FBRyxNQUFNLENBQzNDLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsUUFBUSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7Z0JBQ3pELEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FB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
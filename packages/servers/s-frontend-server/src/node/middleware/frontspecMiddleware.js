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
        var _a, _b, _c;
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
            const assetsToServe = yield frontspec.assetsToServe({});
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
                        _requestedFiles[`${url}.map`] = {
                            id: assetObj.id + '.map',
                            type: assetObj.type + '.map',
                            hash: `${assetHash}.map`,
                            path: `${assetObj.file.path}.map`,
                            src: `${url}.map`
                        };
                    }
                    _requestedFiles[url] = {
                        id: assetObj.id,
                        type: assetObj.type,
                        hash: assetHash,
                        path: assetObj.file.path,
                        url,
                        raw
                    };
                }
                else if (assetObj.url) {
                    _requestedFiles[url] = {
                        id: assetObj.id,
                        type: assetObj.type,
                        hash: assetHash,
                        url,
                        raw
                    };
                }
                res.templateData.assets[assetObj.type][assetHash] = _requestedFiles[url];
            }
            return next();
        });
    };
}
export default frontspecMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzcGVjTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyb250c3BlY01pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUdkLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUl0QixPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQztBQUM5RCxNQUFNLGVBQWUsR0FBd0IsRUFBRSxDQUFDO0FBQ2hELFNBQVMsbUJBQW1CLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDeEMsT0FBTyxVQUFnQixHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7OztZQUNuQywrQkFBK0I7WUFDL0IsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM3QixNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQyx5REFBeUQ7Z0JBQ3pELHdCQUF3QjtnQkFDeEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNsRSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FDdkIsa0NBQWtDLEVBQ2xDLHdCQUF3QixRQUFRLENBQUMsR0FBRyxNQUFNLENBQzNDLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsUUFBUSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUM7Z0JBQ3pELEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU87YUFDUjtZQUVE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
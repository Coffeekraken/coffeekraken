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
import __SDocmap from '@coffeekraken/s-docmap';
/**
 * @name            docmapMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @platform            node
 * @status              beta
 *
 * This function describe the middleware that will fetch the ```docmap.json``` file at the root of
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
 * import docmapMiddleware from '@coffeekraken/sugar/server/frontend/middleware/docmapMiddleware';
 * const server = express();
 * server.use(docmapMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
let docmapCache;
function docmapMiddleware(settings = {}) {
    return function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!res.templateData)
                res.templateData = {};
            if (!res.templateData.shared)
                res.templateData.shared = {};
            if (docmapCache) {
                res.templateData.shared.docmap = Object.assign({}, docmapCache);
                return next();
            }
            const docmap = new __SDocmap();
            const docmapJson = yield docmap.read();
            res.templateData.shared.docmap = Object.assign({}, docmapJson);
            docmapCache = docmapJson;
            (_a = res.bench) === null || _a === void 0 ? void 0 : _a.step('docmapMiddleware');
            return next();
        });
    };
}
export default docmapMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUUvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsSUFBSSxXQUFXLENBQUM7QUFDaEIsU0FBUyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUNuQyxPQUFPLFVBQWdCLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTs7O1lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWTtnQkFBRSxHQUFHLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNO2dCQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUUzRCxJQUFJLFdBQVcsRUFBRTtnQkFDYixHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLHFCQUN2QixXQUFXLENBQ2pCLENBQUM7Z0JBQ0YsT0FBTyxJQUFJLEVBQUUsQ0FBQzthQUNqQjtZQUVELE1BQU0sTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7WUFDL0IsTUFBTSxVQUFVLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFdkMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxxQkFDdkIsVUFBVSxDQUNoQixDQUFDO1lBQ0YsV0FBVyxHQUFHLFVBQVUsQ0FBQztZQUV6QixNQUFBLEdBQUcsQ0FBQyxLQUFLLDBDQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRXBDLE9BQU8sSUFBSSxFQUFFLENBQUM7O0tBQ2pCLENBQUM7QUFDTixDQUFDO0FBQ0QsZUFBZSxnQkFBZ0IsQ0FBQyJ9
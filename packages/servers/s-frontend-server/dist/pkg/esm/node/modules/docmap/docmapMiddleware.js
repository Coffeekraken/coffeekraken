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
import __SBench from '@coffeekraken/s-bench';
import __SDocmap from '@coffeekraken/s-docmap';
/**
 * @name            docmapMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
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
            __SBench.step('request', 'docmapMiddleware');
            return next();
        });
    };
}
export default docmapMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUc3QyxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUUvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxJQUFJLFdBQVcsQ0FBQztBQUNoQixTQUFTLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQ25DLE9BQU8sVUFBZ0IsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJOztZQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVk7Z0JBQUUsR0FBRyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTTtnQkFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFFM0QsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxxQkFDdkIsV0FBVyxDQUNqQixDQUFDO2dCQUNGLE9BQU8sSUFBSSxFQUFFLENBQUM7YUFDakI7WUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1lBQy9CLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXZDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0scUJBQ3ZCLFVBQVUsQ0FDaEIsQ0FBQztZQUNGLFdBQVcsR0FBRyxVQUFVLENBQUM7WUFFekIsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUU3QyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ2xCLENBQUM7S0FBQSxDQUFDO0FBQ04sQ0FBQztBQUNELGVBQWUsZ0JBQWdCLENBQUMifQ==
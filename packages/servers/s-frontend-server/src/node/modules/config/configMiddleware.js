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
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SFile from '@coffeekraken/s-file';
/**
 * @name            configMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function describe the middleware that will expose the config and config files add it to the template data sended to the rendered view
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
 * import configMiddleware from '@coffeekraken/sugar/server/frontend/middleware/configMiddleware';
 * const server = express();
 * server.use(configMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function configMiddleware(settings = {}) {
    return function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const configJson = __SSugarConfig.get('');
            if (!res.templateData)
                res.templateData = {};
            res.templateData.config = configJson;
            res.templateData.configFiles = __SSugarConfig.filesPaths.map((path) => __SFile.new(path).toObject(false));
            if ((_a = req.path) === null || _a === void 0 ? void 0 : _a.match(/.*\.config\.js$/)) {
                res.templateData.requestedConfig = yield __SSugarConfig.toDocblocks(req.path.split('/').pop());
            }
            __SBench.step('request', 'configMiddleware');
            return next();
        });
    };
}
export default configMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbmZpZ01pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBSTdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUNuQyxPQUFPLFVBQWdCLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTs7O1lBQ2pDLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZO2dCQUFFLEdBQUcsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQzdDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztZQUNyQyxHQUFHLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUNwQyxDQUFDO1lBRUYsSUFBSSxNQUFBLEdBQUcsQ0FBQyxJQUFJLDBDQUFFLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUNwQyxHQUFHLENBQUMsWUFBWSxDQUFDLGVBQWUsR0FBRyxNQUFNLGNBQWMsQ0FBQyxXQUFXLENBQy9ELEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUM1QixDQUFDO2FBQ0w7WUFFRCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBRTdDLE9BQU8sSUFBSSxFQUFFLENBQUM7O0tBQ2pCLENBQUM7QUFDTixDQUFDO0FBQ0QsZUFBZSxnQkFBZ0IsQ0FBQyJ9
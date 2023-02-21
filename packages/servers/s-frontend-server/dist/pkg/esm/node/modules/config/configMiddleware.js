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
import __SFile from '@coffeekraken/s-file';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __filter } from '@coffeekraken/sugar/object';
/**
 * @name            configMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @platform            node
 * @status              beta
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function configMiddleware(settings = {}) {
    return function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const configJson = __SSugarConfig.get('');
            if (!res.templateData)
                res.templateData = {};
            if (!res.templateData.shared)
                res.templateData.shared = {};
            res.templateData.shared.config = __filter(configJson, (key, value) => {
                return Object.keys(value).length > 0;
            });
            res.templateData.shared.configFiles = __SSugarConfig.filesPaths
                .map((path) => __SFile.new(path).toObject(false))
                .sort((a, b) => {
                return a.name.localeCompare(b.name);
            })
                .filter((file) => {
                const configId = file.name.replace(/\.config.(j|t)s$/, '');
                if (!configJson[configId])
                    return false;
                if (!Object.keys(configJson[configId]).length)
                    return false;
                return true;
            });
            // get the last item of the request
            const lastPath = req.path.split('/').pop();
            const requestedConfig = (_a = res.templateData.shared.configFiles) === null || _a === void 0 ? void 0 : _a.filter((file) => {
                return file.name === `${lastPath}.config.js`;
            });
            res.templateData.shared.requestedConfig = [];
            if (requestedConfig.length) {
                const data = yield __SSugarConfig.toDocblocks(`${lastPath}.config.js`);
                res.templateData.shared.requestedConfig = [
                    ...res.templateData.shared.requestedConfig,
                    ...data,
                ];
            }
            (_b = res.bench) === null || _b === void 0 ? void 0 : _b.step('configMiddleware');
            return next();
        });
    };
}
export default configMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUNuQyxPQUFPLFVBQWdCLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTs7O1lBQ2pDLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZO2dCQUFFLEdBQUcsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU07Z0JBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQzNELEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUNqRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztZQUVILEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsVUFBVTtpQkFDMUQsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDaEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNYLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQztpQkFDRCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDYixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU07b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQzVELE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1lBRVAsbUNBQW1DO1lBQ25DLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRTNDLE1BQU0sZUFBZSxHQUFHLE1BQUEsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsV0FBVywwQ0FBRSxNQUFNLENBQy9ELENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsUUFBUSxZQUFZLENBQUM7WUFDakQsQ0FBQyxDQUNKLENBQUM7WUFFRixHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1lBQzdDLElBQUksZUFBZSxDQUFDLE1BQU0sRUFBRTtnQkFDeEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFjLENBQUMsV0FBVyxDQUN6QyxHQUFHLFFBQVEsWUFBWSxDQUMxQixDQUFDO2dCQUNGLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLGVBQWUsR0FBRztvQkFDdEMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxlQUFlO29CQUMxQyxHQUFHLElBQUk7aUJBQ1YsQ0FBQzthQUNMO1lBRUQsTUFBQSxHQUFHLENBQUMsS0FBSywwQ0FBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUVwQyxPQUFPLElBQUksRUFBRSxDQUFDOztLQUNqQixDQUFDO0FBQ04sQ0FBQztBQUNELGVBQWUsZ0JBQWdCLENBQUMifQ==
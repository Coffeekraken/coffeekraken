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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function configMiddleware(settings = {}) {
    return function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const configJson = __SSugarConfig.get('');
            if (!res.templateData)
                res.templateData = {};
            if (!res.templateData.shared)
                res.templateData.shared = {};
            res.templateData.shared.config = configJson;
            res.templateData.shared.configFiles = __SSugarConfig.filesPaths
                .map((path) => __SFile.new(path).toObject(false))
                .sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            // get the last item of the request
            const lastPath = req.path.split('/').pop();
            const requestedConfig = (_a = res.templateData.shared.configFiles) === null || _a === void 0 ? void 0 : _a.filter((file) => {
                return file.name === `${lastPath}.config.js`;
            });
            res.templateData.requestedConfig = [];
            if (requestedConfig.length) {
                const data = yield __SSugarConfig.toDocblocks(`${lastPath}.config.js`);
                res.templateData.requestedConfig = [
                    ...res.templateData.requestedConfig,
                    ...data,
                ];
            }
            __SBench.step('request', 'configMiddleware');
            return next();
        });
    };
}
export default configMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUk3QyxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDbkMsT0FBTyxVQUFnQixHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7OztZQUNqQyxNQUFNLFVBQVUsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWTtnQkFBRSxHQUFHLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNO2dCQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUMzRCxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1lBRTVDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsVUFBVTtpQkFDMUQsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDaEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNYLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1lBRVAsbUNBQW1DO1lBQ25DLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRTNDLE1BQU0sZUFBZSxHQUFHLE1BQUEsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsV0FBVywwQ0FBRSxNQUFNLENBQy9ELENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsUUFBUSxZQUFZLENBQUM7WUFDakQsQ0FBQyxDQUNKLENBQUM7WUFFRixHQUFHLENBQUMsWUFBWSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7WUFDdEMsSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFO2dCQUN4QixNQUFNLElBQUksR0FBRyxNQUFNLGNBQWMsQ0FBQyxXQUFXLENBQ3pDLEdBQUcsUUFBUSxZQUFZLENBQzFCLENBQUM7Z0JBQ0YsR0FBRyxDQUFDLFlBQVksQ0FBQyxlQUFlLEdBQUc7b0JBQy9CLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxlQUFlO29CQUNuQyxHQUFHLElBQUk7aUJBQ1YsQ0FBQzthQUNMO1lBRUQsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUU3QyxPQUFPLElBQUksRUFBRSxDQUFDOztLQUNqQixDQUFDO0FBQ04sQ0FBQztBQUNELGVBQWUsZ0JBQWdCLENBQUMifQ==
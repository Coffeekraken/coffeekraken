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
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const object_1 = require("@coffeekraken/sugar/object");
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const configJson = s_sugar_config_1.default.get('');
            if (!res.templateData)
                res.templateData = {};
            if (!res.templateData.shared)
                res.templateData.shared = {};
            res.templateData.shared.config = (0, object_1.__filter)(configJson, (key, value) => {
                return Object.keys(value).length > 0;
            });
            res.templateData.shared.configFiles = s_sugar_config_1.default.filesPaths
                .map((path) => s_file_1.default.new(path).toObject(false))
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
                const data = yield s_sugar_config_1.default.toDocblocks(`${lastPath}.config.js`);
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
exports.default = configMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLGtFQUEyQztBQUMzQyxrRkFBMEQ7QUFDMUQsdURBQXNEO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUNuQyxPQUFPLFVBQWdCLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTs7O1lBQ2pDLE1BQU0sVUFBVSxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWTtnQkFBRSxHQUFHLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNO2dCQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUMzRCxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBQSxpQkFBUSxFQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDakUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7WUFFSCxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsd0JBQWMsQ0FBQyxVQUFVO2lCQUMxRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLGdCQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDaEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNYLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQztpQkFDRCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDYixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU07b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQzVELE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1lBRVAsbUNBQW1DO1lBQ25DLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRTNDLE1BQU0sZUFBZSxHQUFHLE1BQUEsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsV0FBVywwQ0FBRSxNQUFNLENBQy9ELENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsUUFBUSxZQUFZLENBQUM7WUFDakQsQ0FBQyxDQUNKLENBQUM7WUFFRixHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1lBQzdDLElBQUksZUFBZSxDQUFDLE1BQU0sRUFBRTtnQkFDeEIsTUFBTSxJQUFJLEdBQUcsTUFBTSx3QkFBYyxDQUFDLFdBQVcsQ0FDekMsR0FBRyxRQUFRLFlBQVksQ0FDMUIsQ0FBQztnQkFDRixHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEdBQUc7b0JBQ3RDLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsZUFBZTtvQkFDMUMsR0FBRyxJQUFJO2lCQUNWLENBQUM7YUFDTDtZQUVELE1BQUEsR0FBRyxDQUFDLEtBQUssMENBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFcEMsT0FBTyxJQUFJLEVBQUUsQ0FBQzs7S0FDakIsQ0FBQztBQUNOLENBQUM7QUFDRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9
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
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
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
            const configJson = s_sugar_config_1.default.get('');
            if (!res.templateData)
                res.templateData = {};
            if (!res.templateData.shared)
                res.templateData.shared = {};
            res.templateData.shared.config = configJson;
            res.templateData.shared.configFiles = s_sugar_config_1.default.filesPaths
                .map((path) => s_file_1.default.new(path).toObject(false))
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
                const data = yield s_sugar_config_1.default.toDocblocks(`${lastPath}.config.js`);
                res.templateData.requestedConfig = [
                    ...res.templateData.requestedConfig,
                    ...data,
                ];
            }
            s_bench_1.default.step('request', 'configMiddleware');
            return next();
        });
    };
}
exports.default = configMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG9FQUE2QztBQUk3QyxrRkFBMEQ7QUFDMUQsa0VBQTJDO0FBRTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUNuQyxPQUFPLFVBQWdCLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTs7O1lBQ2pDLE1BQU0sVUFBVSxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWTtnQkFBRSxHQUFHLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNO2dCQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUMzRCxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1lBRTVDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyx3QkFBYyxDQUFDLFVBQVU7aUJBQzFELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsZ0JBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7WUFFUCxtQ0FBbUM7WUFDbkMsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFFM0MsTUFBTSxlQUFlLEdBQUcsTUFBQSxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxXQUFXLDBDQUFFLE1BQU0sQ0FDL0QsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxRQUFRLFlBQVksQ0FBQztZQUNqRCxDQUFDLENBQ0osQ0FBQztZQUVGLEdBQUcsQ0FBQyxZQUFZLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztZQUN0QyxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3hCLE1BQU0sSUFBSSxHQUFHLE1BQU0sd0JBQWMsQ0FBQyxXQUFXLENBQ3pDLEdBQUcsUUFBUSxZQUFZLENBQzFCLENBQUM7Z0JBQ0YsR0FBRyxDQUFDLFlBQVksQ0FBQyxlQUFlLEdBQUc7b0JBQy9CLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxlQUFlO29CQUNuQyxHQUFHLElBQUk7aUJBQ1YsQ0FBQzthQUNMO1lBRUQsaUJBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFFN0MsT0FBTyxJQUFJLEVBQUUsQ0FBQzs7S0FDakIsQ0FBQztBQUNOLENBQUM7QUFDRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9
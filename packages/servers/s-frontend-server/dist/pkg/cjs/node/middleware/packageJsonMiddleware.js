"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRootDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRootDir"));
const fs_1 = __importDefault(require("fs"));
const standardizeJson_1 = __importDefault(require("@coffeekraken/sugar/shared/npm/utils/standardizeJson"));
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
/**
 * @name            packageJsonMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              beta
 *
 * This function describe the middleware that will fetch the ```package.json``` file at the root of
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
 * import packageJsonMiddleware from '@coffeekraken/sugar/server/frontend/middleware/packageJsonMiddleware';
 * const server = express();
 * server.use(packageJsonMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function packageJsonMiddleware(settings = {}) {
    return function (req, res, next) {
        const packageJsonPath = `${(0, packageRootDir_1.default)()}/package.json`;
        let pkg;
        if (!fs_1.default.existsSync(packageJsonPath)) {
        }
        else {
            pkg = (0, readJsonSync_1.default)(packageJsonPath);
            if (!res.templateData)
                res.templateData = {};
            if (!res.templateData.shared)
                res.templateData.shared = {};
            res.templateData.shared.packageJson = Object.assign({}, (0, standardizeJson_1.default)(pkg));
        }
        s_bench_1.default.step('request', 'packageJsonMiddleware');
        return next();
    };
}
exports.default = packageJsonMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtHQUE0RTtBQUM1RSw0Q0FBc0I7QUFDdEIsMkdBQXFGO0FBQ3JGLG9FQUE2QztBQUM3Qyw0RkFBc0U7QUFFdEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyxxQkFBcUIsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUN4QyxPQUFPLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQzNCLE1BQU0sZUFBZSxHQUFHLEdBQUcsSUFBQSx3QkFBZ0IsR0FBRSxlQUFlLENBQUM7UUFDN0QsSUFBSSxHQUFHLENBQUM7UUFDUixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtTQUN0QzthQUFNO1lBQ0gsR0FBRyxHQUFHLElBQUEsc0JBQWMsRUFBQyxlQUFlLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVk7Z0JBQUUsR0FBRyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTTtnQkFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDM0QsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsV0FBVyxxQkFDNUIsSUFBQSx5QkFBaUIsRUFBQyxHQUFHLENBQUMsQ0FDNUIsQ0FBQztTQUNMO1FBRUQsaUJBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFFbEQsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNsQixDQUFDLENBQUM7QUFDTixDQUFDO0FBQ0Qsa0JBQWUscUJBQXFCLENBQUMifQ==
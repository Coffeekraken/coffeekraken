"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const packageRootDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRootDir"));
const package_1 = require("@coffeekraken/sugar/package");
const fs_2 = __importDefault(require("fs"));
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
        var _a;
        const packageJsonPath = `${(0, packageRootDir_1.default)()}/package.json`;
        let pkg;
        if (!fs_2.default.existsSync(packageJsonPath)) {
        }
        else {
            pkg = (0, fs_1.__readJsonSync)(packageJsonPath);
            if (!res.templateData)
                res.templateData = {};
            if (!res.templateData.shared)
                res.templateData.shared = {};
            res.templateData.shared.packageJson = Object.assign({}, (0, package_1.__formatPackageJson)(pkg));
        }
        (_a = res.bench) === null || _a === void 0 ? void 0 : _a.step('packageJsonMiddleware');
        return next();
    };
}
exports.default = packageJsonMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtDQUF3RDtBQUN4RCxrR0FBNEU7QUFDNUUseURBQWtFO0FBQ2xFLDRDQUFzQjtBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLHFCQUFxQixDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQ3hDLE9BQU8sVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7O1FBQzNCLE1BQU0sZUFBZSxHQUFHLEdBQUcsSUFBQSx3QkFBZ0IsR0FBRSxlQUFlLENBQUM7UUFDN0QsSUFBSSxHQUFHLENBQUM7UUFDUixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtTQUN0QzthQUFNO1lBQ0gsR0FBRyxHQUFHLElBQUEsbUJBQWMsRUFBQyxlQUFlLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVk7Z0JBQUUsR0FBRyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTTtnQkFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDM0QsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsV0FBVyxxQkFDNUIsSUFBQSw2QkFBbUIsRUFBQyxHQUFHLENBQUMsQ0FDOUIsQ0FBQztTQUNMO1FBRUQsTUFBQSxHQUFHLENBQUMsS0FBSywwQ0FBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUV6QyxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ2xCLENBQUMsQ0FBQztBQUNOLENBQUM7QUFDRCxrQkFBZSxxQkFBcUIsQ0FBQyJ9
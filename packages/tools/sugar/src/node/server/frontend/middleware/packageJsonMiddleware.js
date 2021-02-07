"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const packageRoot_1 = __importDefault(require("../../../path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const standardizeJson_1 = __importDefault(require("../../../npm/standardizeJson"));
/**
 * @name            packageJsonMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              beta
 *
 * This function describe the middleware that will fetch the ```package.json``` file at the root of
 * your server directory and add it to the template data sended to the rendered view
 *
 * @param           {Object}            req             The request made on the express server
 * @param           {Object}            res             The response object of the express server
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function packageJsonMiddleware(settings = {}) {
    return function (req, res, next) {
        const packageJsonPath = `${packageRoot_1.default()}/package.json`;
        let pkg;
        if (!fs_1.default.existsSync(packageJsonPath)) {
        }
        else {
            pkg = require(packageJsonPath);
            res.templateData = Object.assign(Object.assign({}, (res.templateData || {})), { packageJson: standardizeJson_1.default(pkg) });
        }
        next();
    };
}
module.exports = packageJsonMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZUpzb25NaWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFja2FnZUpzb25NaWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsNEVBQXNEO0FBQ3RELDRDQUFzQjtBQUN0QixtRkFBNkQ7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsU0FBUyxxQkFBcUIsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUMxQyxPQUFPLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQzdCLE1BQU0sZUFBZSxHQUFHLEdBQUcscUJBQWEsRUFBRSxlQUFlLENBQUM7UUFDMUQsSUFBSSxHQUFHLENBQUM7UUFDUixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtTQUN0QzthQUFNO1lBQ0wsR0FBRyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMvQixHQUFHLENBQUMsWUFBWSxtQ0FDWCxDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLEtBQzNCLFdBQVcsRUFBRSx5QkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FDcEMsQ0FBQztTQUNIO1FBRUQsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDLENBQUM7QUFDSixDQUFDO0FBQ0QsaUJBQVMscUJBQXFCLENBQUMifQ==
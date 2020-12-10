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
 * @beta
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
        let package;
        if (!fs_1.default.existsSync(packageJsonPath)) {
        }
        else {
            package = require(packageJsonPath);
            res.templateData = Object.assign(Object.assign({}, (res.templateData || {})), { packageJson: standardizeJson_1.default(package) });
        }
        next();
    };
}
module.exports = packageJsonMiddleware;
//# sourceMappingURL=module.js.map
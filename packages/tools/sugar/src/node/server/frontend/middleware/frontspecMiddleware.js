"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const packageRoot_1 = __importDefault(require("../../../path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
const deepMap_1 = __importDefault(require("../../../object/deepMap"));
/**
 * @name            frontspecMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @wip
 *
 * This function describe the middleware that will fetch the ```frontspec.json``` file at the root of
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
 * import frontspecMiddleware from '@coffeekraken/sugar/server/frontend/middleware/frontspecMiddleware';
 * const server = express();
 * server.use(frontspecMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function frontspecMiddleware(settings = {}) {
    return function (req, res, next) {
        const defaultFrontSpec = sugar_1.default('frontspec') || {};
        const frontspecPath = `${packageRoot_1.default()}/frontspec.json`;
        let frontspec = defaultFrontSpec;
        if (fs_1.default.existsSync(frontspecPath)) {
            const frontspecFile = require(frontspecPath);
            frontspec = deepMerge_1.default(frontspec, frontspecFile);
        }
        frontspec = deepMap_1.default(frontspec, (value, prop, fullPath) => {
            if (typeof value === 'string') {
                return value
                    .replace(`${packageRoot_1.default()}/`, '')
                    .replace(packageRoot_1.default(), '');
            }
            return value;
        });
        res.templateData = Object.assign(Object.assign({}, (res.templateData || {})), { frontspec });
        next();
    };
}
module.exports = frontspecMiddleware;
//# sourceMappingURL=module.js.map
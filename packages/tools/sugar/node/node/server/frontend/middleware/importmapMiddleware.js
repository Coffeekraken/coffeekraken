"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("../../../path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
const deepMap_1 = __importDefault(require("../../../object/deepMap"));
/**
 * @name            importmapMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function describe the middleware that will fetch the ```importmap.json``` file at the root of
 * your server directory or at the root of your dist directory and add it to the template data sended to the rendered view
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
 * import importmapMiddleware from '@coffeekraken/sugar/server/frontend/middleware/importmapMiddleware';
 * const server = express();
 * server.use(importmapMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function importmapMiddleware(settings = {}) {
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
exports.default = importmapMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0bWFwTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9ub2RlL3NlcnZlci9mcm9udGVuZC9taWRkbGV3YXJlL2ltcG9ydG1hcE1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsNEVBQXNEO0FBQ3RELDRDQUFzQjtBQUN0QixrRUFBa0Q7QUFDbEQsMEVBQW9EO0FBQ3BELHNFQUFnRDtBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLG1CQUFtQixDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQ3hDLE9BQU8sVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDN0IsTUFBTSxnQkFBZ0IsR0FBRyxlQUFhLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFELE1BQU0sYUFBYSxHQUFHLEdBQUcscUJBQWEsRUFBRSxpQkFBaUIsQ0FBQztRQUMxRCxJQUFJLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQztRQUNqQyxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDbEMsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzdDLFNBQVMsR0FBRyxtQkFBVyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUNuRDtRQUVELFNBQVMsR0FBRyxpQkFBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEVBQUU7WUFDekQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzdCLE9BQU8sS0FBSztxQkFDVCxPQUFPLENBQUMsR0FBRyxxQkFBYSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7cUJBQ2xDLE9BQU8sQ0FBQyxxQkFBYSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDakM7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLFlBQVksbUNBQ1gsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxLQUMzQixTQUFTLEdBQ1YsQ0FBQztRQUVGLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUNELGtCQUFlLG1CQUFtQixDQUFDIn0=
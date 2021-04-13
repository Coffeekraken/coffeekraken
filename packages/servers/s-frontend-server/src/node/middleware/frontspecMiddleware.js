"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const sugar_1 = __importDefault(require("@coffeekraken/sugar/shared/config/sugar"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const deepMap_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMap"));
/**
 * @name            frontspecMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function describe the middleware that will fetch the ```frontspec.json``` file at the root of
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
        frontspec = deepMap_1.default(frontspec, ({ value }) => {
            if (typeof value === 'string') {
                return value
                    .replace(`${packageRoot_1.default()}/`, '')
                    .replace(packageRoot_1.default(), '');
            }
            return value;
        });
        res.templateData = Object.assign(Object.assign({}, (res.templateData || {})), { frontspec });
        return next();
    };
}
exports.default = frontspecMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzcGVjTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyb250c3BlY01pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsNEZBQXNFO0FBQ3RFLDRDQUFzQjtBQUN0QixvRkFBb0U7QUFDcEUsNEZBQXNFO0FBQ3RFLHdGQUFrRTtBQUVsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLG1CQUFtQixDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQ3hDLE9BQU8sVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDN0IsTUFBTSxnQkFBZ0IsR0FBRyxlQUFhLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFELE1BQU0sYUFBYSxHQUFHLEdBQUcscUJBQWEsRUFBRSxpQkFBaUIsQ0FBQztRQUMxRCxJQUFJLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQztRQUNqQyxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDbEMsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzdDLFNBQVMsR0FBRyxtQkFBVyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUNuRDtRQUVELFNBQVMsR0FBRyxpQkFBUyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUM3QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDN0IsT0FBTyxLQUFLO3FCQUNULE9BQU8sQ0FBQyxHQUFHLHFCQUFhLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztxQkFDbEMsT0FBTyxDQUFDLHFCQUFhLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNqQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsWUFBWSxtQ0FDWCxDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLEtBQzNCLFNBQVMsR0FDVixDQUFDO1FBRUYsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNoQixDQUFDLENBQUM7QUFDSixDQUFDO0FBQ0Qsa0JBQWUsbUJBQW1CLENBQUMifQ==
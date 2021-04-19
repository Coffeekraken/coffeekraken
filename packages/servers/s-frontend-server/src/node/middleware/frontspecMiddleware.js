"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
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
        const defaultFrontSpec = s_sugar_config_1.default('frontspec') || {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRzcGVjTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyb250c3BlY01pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsNEZBQXNFO0FBQ3RFLDRDQUFzQjtBQUN0QixrRkFBeUQ7QUFDekQsNEZBQXNFO0FBQ3RFLHdGQUFrRTtBQUVsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLG1CQUFtQixDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQ3hDLE9BQU8sVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDN0IsTUFBTSxnQkFBZ0IsR0FBRyx3QkFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxRCxNQUFNLGFBQWEsR0FBRyxHQUFHLHFCQUFhLEVBQUUsaUJBQWlCLENBQUM7UUFDMUQsSUFBSSxTQUFTLEdBQUcsZ0JBQWdCLENBQUM7UUFDakMsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ2xDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM3QyxTQUFTLEdBQUcsbUJBQVcsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDbkQ7UUFFRCxTQUFTLEdBQUcsaUJBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDN0MsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzdCLE9BQU8sS0FBSztxQkFDVCxPQUFPLENBQUMsR0FBRyxxQkFBYSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7cUJBQ2xDLE9BQU8sQ0FBQyxxQkFBYSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDakM7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLFlBQVksbUNBQ1gsQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxLQUMzQixTQUFTLEdBQ1YsQ0FBQztRQUVGLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUNELGtCQUFlLG1CQUFtQixDQUFDIn0=
"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
const extension_1 = __importDefault(require("../../../fs/extension"));
/**
 * @name            resolveExtensionFreePath
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function will try to resolve extension free requests like node modules, etc...
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
 * import resolveExtensionFreePath from '@coffeekraken/sugar/server/frontend/middleware/resolveExtensionFreePath';
 * const server = express();
 * server.use(resolveExtensionFreePath);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function resolveExtensionFreePath(settings = {}) {
    settings = deepMerge_1.default({
        exclude: []
    }, settings);
    return function (req, res, next) {
        if (settings.exclude.indexOf(req.path) !== -1) {
            return next();
        }
        const pathExtension = extension_1.default(req.path).trim();
        if (pathExtension)
            return next();
        const rootDir = sugar_1.default('frontend.rootDir');
        let filePath = req.path.slice(0, 1) === '/' ? req.path.slice(1) : req.path;
        // check if the file is on filesystem using the extensions listed in the frontend.config.js file
        for (let i = 0; i < settings.extensions.length; i++) {
            const ext = settings.extensions[i];
            const potentialFilePath = `${rootDir}/${filePath}.${ext}`;
            if (fs_1.default.existsSync(potentialFilePath)) {
                // req.path = `/${filePath}.${ext}`;
                // req.url = `/${filePath}.${ext}`;
                res.redirect(`/${filePath}.${ext}`);
                break;
            }
        }
        next();
    };
}
exports.default = resolveExtensionFreePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZUV4dGVuc2lvbkZyZWVQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzb2x2ZUV4dGVuc2lvbkZyZWVQYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUdkLDRDQUFzQjtBQUN0QixrRUFBa0Q7QUFDbEQsMEVBQW9EO0FBRXBELHNFQUFnRDtBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsd0JBQXdCLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDN0MsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1FBQ0UsT0FBTyxFQUFFLEVBQUU7S0FDWixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBQ0YsT0FBTyxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUM3QixJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM3QyxPQUFPLElBQUksRUFBRSxDQUFDO1NBQ2Y7UUFDRCxNQUFNLGFBQWEsR0FBRyxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuRCxJQUFJLGFBQWE7WUFBRSxPQUFPLElBQUksRUFBRSxDQUFDO1FBRWpDLE1BQU0sT0FBTyxHQUFHLGVBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2xELElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBRTNFLGdHQUFnRztRQUNoRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkQsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLGlCQUFpQixHQUFHLEdBQUcsT0FBTyxJQUFJLFFBQVEsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUMxRCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDdEMsb0NBQW9DO2dCQUNwQyxtQ0FBbUM7Z0JBQ25DLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxRQUFRLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDcEMsTUFBTTthQUNQO1NBQ0Y7UUFFRCxJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQztBQUNKLENBQUM7QUFDRCxrQkFBZSx3QkFBd0IsQ0FBQyJ9
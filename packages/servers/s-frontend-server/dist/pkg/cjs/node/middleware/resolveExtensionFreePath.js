"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const fs_2 = __importDefault(require("fs"));
/**
 * @name            resolveExtensionFreePath
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function will try to resolve extension free requests like node modules, etc...
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
 * import resolveExtensionFreePath from '@coffeekraken/sugar/server/frontend/middleware/resolveExtensionFreePath';
 * const server = express();
 * server.use(resolveExtensionFreePath);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function resolveExtensionFreePath(settings = {}) {
    settings = (0, object_1.__deepMerge)({
        rootDir: undefined,
        extensions: [],
        exclude: [],
    }, settings);
    return function (req, res, next) {
        var _a;
        if (settings.exclude.indexOf(req.path) !== -1) {
            return next();
        }
        const pathExtension = (0, fs_1.__extension)(req.path).trim();
        if (pathExtension)
            return next();
        const rootDir = settings.rootDir;
        const filePath = req.path.slice(0, 1) === '/' ? req.path.slice(1) : req.path;
        // check if the file is on filesystem using the extensions listed in the frontend.config.js file
        for (let i = 0; i < settings.extensions.length; i++) {
            const ext = settings.extensions[i];
            const potentialFilePath = `${rootDir}/${filePath}.${ext}`;
            if (fs_2.default.existsSync(potentialFilePath)) {
                // req.path = `/${filePath}.${ext}`;
                // req.url = `/${filePath}.${ext}`;
                res.redirect(`/${filePath}.${ext}`);
                break;
            }
        }
        (_a = res.bench) === null || _a === void 0 ? void 0 : _a.step('request', 'resolveExtensionFreePathMiddleware');
        return next();
    };
}
exports.default = resolveExtensionFreePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtDQUFxRDtBQUNyRCx1REFBeUQ7QUFDekQsNENBQXNCO0FBRXRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyx3QkFBd0IsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUMzQyxRQUFRLEdBQUcsSUFBQSxvQkFBVyxFQUNsQjtRQUNJLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFVBQVUsRUFBRSxFQUFFO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDZCxFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsT0FBTyxVQUFVLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTs7UUFDM0IsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDM0MsT0FBTyxJQUFJLEVBQUUsQ0FBQztTQUNqQjtRQUNELE1BQU0sYUFBYSxHQUFHLElBQUEsZ0JBQVcsRUFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkQsSUFBSSxhQUFhO1lBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUVqQyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ2pDLE1BQU0sUUFBUSxHQUNWLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBRWhFLGdHQUFnRztRQUNoRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakQsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLGlCQUFpQixHQUFHLEdBQUcsT0FBTyxJQUFJLFFBQVEsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUMxRCxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDcEMsb0NBQW9DO2dCQUNwQyxtQ0FBbUM7Z0JBQ25DLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxRQUFRLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDcEMsTUFBTTthQUNUO1NBQ0o7UUFFRCxNQUFBLEdBQUcsQ0FBQyxLQUFLLDBDQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsb0NBQW9DLENBQUMsQ0FBQztRQUVqRSxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ2xCLENBQUMsQ0FBQztBQUNOLENBQUM7QUFDRCxrQkFBZSx3QkFBd0IsQ0FBQyJ9
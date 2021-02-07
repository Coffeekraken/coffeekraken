"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
                req.path = `/${filePath}.${ext}`;
                req.url = `/${filePath}.${ext}`;
                break;
            }
        }
        next();
    };
}
module.exports = resolveExtensionFreePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZUV4dGVuc2lvbkZyZWVQYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVzb2x2ZUV4dGVuc2lvbkZyZWVQYXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBR2QsNENBQXNCO0FBQ3RCLGtFQUFrRDtBQUNsRCwwRUFBb0Q7QUFFcEQsc0VBQWdEO0FBRWhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsU0FBUyx3QkFBd0IsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUM3QyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7UUFDRSxPQUFPLEVBQUUsRUFBRTtLQUNaLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFDRixPQUFPLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQzdCLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzdDLE9BQU8sSUFBSSxFQUFFLENBQUM7U0FDZjtRQUNELE1BQU0sYUFBYSxHQUFHLG1CQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25ELElBQUksYUFBYTtZQUFFLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFFakMsTUFBTSxPQUFPLEdBQUcsZUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbEQsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFFM0UsZ0dBQWdHO1FBQ2hHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuRCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxPQUFPLElBQUksUUFBUSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQzFELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUN0QyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksUUFBUSxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNqQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksUUFBUSxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNoQyxNQUFNO2FBQ1A7U0FDRjtRQUVELElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUNELGlCQUFTLHdCQUF3QixDQUFDIn0=
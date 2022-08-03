"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const extension_1 = __importDefault(require("@coffeekraken/sugar/node/fs/extension"));
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
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
    settings = (0, deepMerge_1.default)({
        rootDir: undefined,
        extensions: [],
        exclude: []
    }, settings);
    return function (req, res, next) {
        if (settings.exclude.indexOf(req.path) !== -1) {
            return next();
        }
        const pathExtension = (0, extension_1.default)(req.path).trim();
        if (pathExtension)
            return next();
        const rootDir = settings.rootDir;
        const filePath = req.path.slice(0, 1) === '/' ? req.path.slice(1) : req.path;
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
        s_bench_1.default.step('request', 'resolveExtensionFreePathMiddleware');
        return next();
    };
}
exports.default = resolveExtensionFreePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRDQUFzQjtBQUN0Qiw0RkFBc0U7QUFDdEUsc0ZBQWdFO0FBQ2hFLG9FQUE2QztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsd0JBQXdCLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDN0MsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFDcEI7UUFDRSxPQUFPLEVBQUUsU0FBUztRQUNsQixVQUFVLEVBQUUsRUFBRTtRQUNkLE9BQU8sRUFBRSxFQUFFO0tBQ1osRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLE9BQU8sVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDN0IsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDN0MsT0FBTyxJQUFJLEVBQUUsQ0FBQztTQUNmO1FBQ0QsTUFBTSxhQUFhLEdBQUcsSUFBQSxtQkFBVyxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuRCxJQUFJLGFBQWE7WUFBRSxPQUFPLElBQUksRUFBRSxDQUFDO1FBRWpDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDakMsTUFBTSxRQUFRLEdBQ1osR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFFOUQsZ0dBQWdHO1FBQ2hHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuRCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxPQUFPLElBQUksUUFBUSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQzFELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUN0QyxvQ0FBb0M7Z0JBQ3BDLG1DQUFtQztnQkFDbkMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNO2FBQ1A7U0FDRjtRQUVELGlCQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQ0FBb0MsQ0FBQyxDQUFDO1FBRS9ELE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUNELGtCQUFlLHdCQUF3QixDQUFDIn0=
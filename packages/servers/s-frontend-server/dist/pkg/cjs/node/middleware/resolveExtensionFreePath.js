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
 * @platform            node
 * @status              beta
 * @private
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtDQUFxRDtBQUNyRCx1REFBeUQ7QUFDekQsNENBQXNCO0FBRXRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLHdCQUF3QixDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQzNDLFFBQVEsR0FBRyxJQUFBLG9CQUFXLEVBQ2xCO1FBQ0ksT0FBTyxFQUFFLFNBQVM7UUFDbEIsVUFBVSxFQUFFLEVBQUU7UUFDZCxPQUFPLEVBQUUsRUFBRTtLQUNkLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixPQUFPLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJOztRQUMzQixJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUMzQyxPQUFPLElBQUksRUFBRSxDQUFDO1NBQ2pCO1FBQ0QsTUFBTSxhQUFhLEdBQUcsSUFBQSxnQkFBVyxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuRCxJQUFJLGFBQWE7WUFBRSxPQUFPLElBQUksRUFBRSxDQUFDO1FBRWpDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDakMsTUFBTSxRQUFRLEdBQ1YsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFFaEUsZ0dBQWdHO1FBQ2hHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqRCxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxPQUFPLElBQUksUUFBUSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQzFELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUNwQyxvQ0FBb0M7Z0JBQ3BDLG1DQUFtQztnQkFDbkMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNO2FBQ1Q7U0FDSjtRQUVELE1BQUEsR0FBRyxDQUFDLEtBQUssMENBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQ0FBb0MsQ0FBQyxDQUFDO1FBRWpFLE9BQU8sSUFBSSxFQUFFLENBQUM7SUFDbEIsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUNELGtCQUFlLHdCQUF3QixDQUFDIn0=
"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
/**
 * @name            envMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              beta
 *
 * This function describe the middleware that will add the "env" property to the ```res.templateData``` object
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
 * import envMiddleware from '@coffeekraken/sugar/server/frontend/middleware/envMiddleware';
 * const server = express();
 * server.use(envMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function envMiddleware(settings = {}) {
    return function (req, res, next) {
        if (!res.templateData)
            res.templateData = {};
        if (!res.templateData.shared)
            res.templateData.shared = {};
        res.templateData.shared.env = Object.assign({}, s_env_1.default.env);
        s_bench_1.default.step('request', 'envMiddleware');
        return next();
    };
}
exports.default = envMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUdkLG9FQUE2QztBQUM3QyxnRUFBeUM7QUFFekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLGFBQWEsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUNoQyxPQUFPLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWTtZQUFFLEdBQUcsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU07WUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDM0QsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxxQkFDcEIsZUFBTSxDQUFDLEdBQUcsQ0FDaEIsQ0FBQztRQUVGLGlCQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUUxQyxPQUFPLElBQUksRUFBRSxDQUFDO0lBQ2xCLENBQUMsQ0FBQztBQUNOLENBQUM7QUFDRCxrQkFBZSxhQUFhLENBQUMifQ==
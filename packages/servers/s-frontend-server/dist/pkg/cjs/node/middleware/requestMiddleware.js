"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
/**
 * @name            requestMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              wip
 *
 * This function describe the middleware will fill the templateData.request object with the
 * actual express one
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
 * import requestMiddleware from '@coffeekraken/sugar/server/frontend/middleware/requestMiddleware';
 * const server = express();
 * server.use(requestMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function requestMiddleware(settings = {}) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res.templateData)
                res.templateData = {};
            res.templateData.request = {
                // baseUrl: req.baseUrl,
                // body: req.body,
                // // fresh: req.fresh,
                // hostname: req.hostname,
                // ip: req.ip,
                // ips: req.ips,
                // originalUrl: req.originalUrl,
                // params: req.params,
                path: req.path,
                // protocol: req.protocol,
                // query: req.query,
                // secure: req.secure,
                // stale: req.stale,
                // subdomains: req.subdomains,
                // xhr: req.xhr,
            };
            s_bench_1.default.step('request', 'requestMiddleware');
            return next();
        });
    };
}
exports.default = requestMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG9FQUE2QztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQ3BDLE9BQU8sVUFBZ0IsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJOztZQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVk7Z0JBQUUsR0FBRyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDN0MsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUc7Z0JBQ3ZCLHdCQUF3QjtnQkFDeEIsa0JBQWtCO2dCQUNsQix1QkFBdUI7Z0JBQ3ZCLDBCQUEwQjtnQkFDMUIsY0FBYztnQkFDZCxnQkFBZ0I7Z0JBQ2hCLGdDQUFnQztnQkFDaEMsc0JBQXNCO2dCQUN0QixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7Z0JBQ2QsMEJBQTBCO2dCQUMxQixvQkFBb0I7Z0JBQ3BCLHNCQUFzQjtnQkFDdEIsb0JBQW9CO2dCQUNwQiw4QkFBOEI7Z0JBQzlCLGdCQUFnQjthQUNuQixDQUFDO1lBRUYsaUJBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFFOUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNsQixDQUFDO0tBQUEsQ0FBQztBQUNOLENBQUM7QUFDRCxrQkFBZSxpQkFBaUIsQ0FBQyJ9
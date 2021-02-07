"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const env_1 = __importDefault(require("../../../core/env"));
/**
 * @name            envMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @status              beta
 *
 * This function describe the middleware that will add the "env" property to the ```res.templateData``` object
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
 * import envMiddleware from '@coffeekraken/sugar/server/frontend/middleware/envMiddleware';
 * const server = express();
 * server.use(envMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function envMiddleware(settings = {}) {
    return function (req, res, next) {
        res.templateData = Object.assign(Object.assign({}, (res.templateData || {})), { env: env_1.default('NODE_ENV') || 'development' });
        next();
    };
}
module.exports = envMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52TWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVudk1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFJZCw0REFBc0M7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLGFBQWEsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUNsQyxPQUFPLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQzdCLEdBQUcsQ0FBQyxZQUFZLG1DQUNYLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsS0FDM0IsR0FBRyxFQUFFLGFBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxhQUFhLEdBQ3hDLENBQUM7UUFDRixJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQztBQUNKLENBQUM7QUFDRCxpQkFBUyxhQUFhLENBQUMifQ==
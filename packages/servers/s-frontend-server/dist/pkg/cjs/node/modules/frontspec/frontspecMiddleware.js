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
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
/**
 * @name            frontspecMiddleware
 * @namespace       sugar.node.server.frontend.middleware
 * @type            Function
 * @platform            node
 * @status              beta
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function frontspecMiddleware(settings = {}) {
    return function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const frontspec = new s_frontspec_1.default();
            if (!res.templateData)
                res.templateData = {};
            if (!res.templateData.shared)
                res.templateData.shared = {};
            res.templateData.shared.frontspec = Object.assign(Object.assign({}, (yield frontspec.read())), ((_a = res.templateData.shared.frontspec) !== null && _a !== void 0 ? _a : {}));
            (_b = res.bench) === null || _b === void 0 ? void 0 : _b.step('frontspecMiddleware');
            return next();
        });
    };
}
exports.default = frontspecMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxtQkFBbUIsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUN0QyxPQUFPLFVBQWdCLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTs7O1lBQ2pDLE1BQU0sU0FBUyxHQUFHLElBQUkscUJBQVksRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWTtnQkFBRSxHQUFHLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUM3QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNO2dCQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUUzRCxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLG1DQUMxQixDQUFDLE1BQU0sU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQ3hCLENBQUMsTUFBQSxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLG1DQUFJLEVBQUUsQ0FBQyxDQUMvQyxDQUFDO1lBRUYsTUFBQSxHQUFHLENBQUMsS0FBSywwQ0FBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUV2QyxPQUFPLElBQUksRUFBRSxDQUFDOztLQUNqQixDQUFDO0FBQ04sQ0FBQztBQUNELGtCQUFlLG1CQUFtQixDQUFDIn0=
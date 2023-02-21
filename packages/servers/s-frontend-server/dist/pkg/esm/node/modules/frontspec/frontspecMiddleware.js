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
import __SFrontspec from '@coffeekraken/s-frontspec';
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
            const frontspec = new __SFrontspec();
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
export default frontspecMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxtQkFBbUIsQ0FBQyxRQUFRLEdBQUcsRUFBRTtJQUN0QyxPQUFPLFVBQWdCLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTs7O1lBQ2pDLE1BQU0sU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZO2dCQUFFLEdBQUcsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU07Z0JBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBRTNELEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsbUNBQzFCLENBQUMsTUFBTSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsR0FDeEIsQ0FBQyxNQUFBLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsbUNBQUksRUFBRSxDQUFDLENBQy9DLENBQUM7WUFFRixNQUFBLEdBQUcsQ0FBQyxLQUFLLDBDQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRXZDLE9BQU8sSUFBSSxFQUFFLENBQUM7O0tBQ2pCLENBQUM7QUFDTixDQUFDO0FBQ0QsZUFBZSxtQkFBbUIsQ0FBQyJ9
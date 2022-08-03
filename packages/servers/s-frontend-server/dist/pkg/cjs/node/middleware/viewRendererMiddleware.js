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
const s_view_renderer_1 = __importDefault(require("@coffeekraken/s-view-renderer"));
/**
 * @name            viewRendererMiddleware
 * @namespace       node.middleware
 * @type            Function
 * @status              wip
 *
 * This middleware will gives you access down the tree to a "viewRenerer" propery on the "res" object that you can use to render your views.
 * It's juar an SViewRenderer instance instanciates with all the shared data passed from the server
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
 * import viewRendererMiddleware from '@coffeekraken/sugar/server/frontend/middleware/viewRendererMiddleware';
 * const server = express();
 * server.use(viewRendererMiddleware);
 * server.listen(3000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
let _viewRenderer, _sharedData;
function viewRendererMiddleware(settings = {}) {
    return function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // renderer
            if (!_viewRenderer) {
                _viewRenderer = new s_view_renderer_1.default({
                    sharedData: (_a = res.templateData.shared) !== null && _a !== void 0 ? _a : {},
                });
            }
            res.viewRenderer = _viewRenderer;
            s_bench_1.default.step('request', 'viewRendererMiddleware');
            return next();
        });
    };
}
exports.default = viewRendererMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG9FQUE2QztBQUk3QyxvRkFBNEQ7QUFFNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsSUFBSSxhQUFhLEVBQUUsV0FBVyxDQUFDO0FBQy9CLFNBQVMsc0JBQXNCLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDekMsT0FBTyxVQUFnQixHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7OztZQUNqQyxXQUFXO1lBQ1gsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDaEIsYUFBYSxHQUFHLElBQUkseUJBQWUsQ0FBQztvQkFDaEMsVUFBVSxFQUFFLE1BQUEsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLG1DQUFJLEVBQUU7aUJBQzVDLENBQUMsQ0FBQzthQUNOO1lBRUQsR0FBRyxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUM7WUFFakMsaUJBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHdCQUF3QixDQUFDLENBQUM7WUFFbkQsT0FBTyxJQUFJLEVBQUUsQ0FBQzs7S0FDakIsQ0FBQztBQUNOLENBQUM7QUFDRCxrQkFBZSxzQkFBc0IsQ0FBQyJ9
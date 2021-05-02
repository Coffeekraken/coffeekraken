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
const s_view_renderer_1 = __importDefault(require("@coffeekraken/s-view-renderer"));
/**
 * @name                views
 * @namespace           s-frontendServer.handlers
 * @type                Function
 * @status              wip
 *
 * This function is responsible of responding to express requests made on the "views" section
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          server          The express server instance
 * @return        {Promise}                         A promise that will be resolved with the response to send to the client
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function view(req, res, settings = {}) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const viewPath = req.params[0].split('/').join('.');
        const viewInstance = new s_view_renderer_1.default(viewPath);
        const result = yield viewInstance.render(Object.assign({}, ((_a = res.templateData) !== null && _a !== void 0 ? _a : {})));
        res.status(404);
        res.type('text/html');
        res.send(result.value);
    });
}
exports.default = view;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBR2Qsb0ZBQTREO0FBSzVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxTQUE4QixJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRTs7O1FBQ3hELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVwRCxNQUFNLFlBQVksR0FBRyxJQUFJLHlCQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbkQsTUFBTSxNQUFNLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxtQkFDbkMsT0FBQyxHQUFHLENBQUMsWUFBWSxtQ0FBSSxFQUFFLENBQUMsRUFDM0IsQ0FBQztRQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Q0FDeEI7QUFaRCx1QkFZQyJ9
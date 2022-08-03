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
 * @namespace           node.modules.view
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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function view({ req, res }) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let viewPath;
        if (!req.params[0])
            viewPath = (_a = settings.indexView) !== null && _a !== void 0 ? _a : 'index';
        else
            viewPath = req.params[0].split('/').join('.');
        const viewInstance = new s_view_renderer_1.default(viewPath);
        const result = yield viewInstance.render(Object.assign({}, ((_b = res.templateData) !== null && _b !== void 0 ? _b : {})));
        res.status(200);
        res.type('text/html');
        res.send(result.value);
    });
}
exports.default = view;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUdkLG9GQUE0RDtBQU01RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBOEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTs7O1FBQzNDLElBQUksUUFBUSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUUsUUFBUSxHQUFHLE1BQUEsUUFBUSxDQUFDLFNBQVMsbUNBQUksT0FBTyxDQUFDOztZQUN4RCxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5ELE1BQU0sWUFBWSxHQUFHLElBQUkseUJBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVuRCxNQUFNLE1BQU0sR0FBRyxNQUFNLFlBQVksQ0FBQyxNQUFNLG1CQUNqQyxDQUFDLE1BQUEsR0FBRyxDQUFDLFlBQVksbUNBQUksRUFBRSxDQUFDLEVBQzdCLENBQUM7UUFFSCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7O0NBQzFCO0FBZEQsdUJBY0MifQ==
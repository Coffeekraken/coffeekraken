"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_js_1 = __importDefault(require("./types/page.js"));
const views_js_1 = __importDefault(require("./types/views.js"));
/**
 * @name                genericHandler
 * @namespace           node.modules.docmap
 * @type                Function
 * @platform            node
 * @status              beta
 *
 * This function is responsible of responding to express requests made on the doc pages
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function genericHandler(api) {
    switch (api.pageConfig.type) {
        case 'page':
            return (0, page_js_1.default)(api);
            break;
        case 'views':
        default:
            return (0, views_js_1.default)(api);
            break;
    }
}
exports.default = genericHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDhEQUF5QztBQUN6QyxnRUFBMkM7QUFFM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxTQUF3QixjQUFjLENBQUMsR0FBRztJQUN0QyxRQUFRLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFO1FBQ3pCLEtBQUssTUFBTTtZQUNQLE9BQU8sSUFBQSxpQkFBVSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU07UUFDVixLQUFLLE9BQU8sQ0FBQztRQUNiO1lBQ0ksT0FBTyxJQUFBLGtCQUFXLEVBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEIsTUFBTTtLQUNiO0FBQ0wsQ0FBQztBQVZELGlDQVVDIn0=
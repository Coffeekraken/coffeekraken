"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __importDefault(require("./types/page"));
const views_1 = __importDefault(require("./types/views"));
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
            return (0, page_1.default)(api);
            break;
        case 'views':
        default:
            return (0, views_1.default)(api);
            break;
    }
}
exports.default = genericHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFzQztBQUN0QywwREFBd0M7QUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxTQUF3QixjQUFjLENBQUMsR0FBRztJQUN0QyxRQUFRLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFO1FBQ3pCLEtBQUssTUFBTTtZQUNQLE9BQU8sSUFBQSxjQUFVLEVBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkIsTUFBTTtRQUNWLEtBQUssT0FBTyxDQUFDO1FBQ2I7WUFDSSxPQUFPLElBQUEsZUFBVyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLE1BQU07S0FDYjtBQUNMLENBQUM7QUFWRCxpQ0FVQyJ9
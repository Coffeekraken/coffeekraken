"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../utils/theme"));
class postcssSugarPluginSizeClassesMixinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginSizeClassesMixinInterface;
postcssSugarPluginSizeClassesMixinInterface.definition = {};
/**
 * @name           classes
 * @namespace      mixins.size
 * @type           Mixin
 * @status        beta
 *
 * This mixin output all the sizes classes like ```.s-size-50```, etc...
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.size.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1(params = {}, atRule, processNested) {
    const sizes = theme_1.default().config('size');
    const cssArray = [];
    Object.keys(sizes).forEach((sizeName) => {
        const size = sizes[sizeName];
        cssArray.push([
            `/**`,
            ` * @name           s-size-${sizeName}`,
            ` * @namespace      sugar.css.size.classes`,
            ` * @type           CssClass`,
            ` *`,
            ` * This class allows you to apply the "${sizeName}" size to an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="s-size-${sizeName}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
            `.s-size-${sizeName} {`,
            `   font-size: ${size};`,
            `}`
        ].join('\n'));
    });
    const AST = processNested(cssArray.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELDhEQUF3QztBQUV4QyxNQUFNLDJDQUE0QyxTQUFRLHFCQUFZOztBQUdkLGdFQUFTO0FBRnhELHNEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSXpCOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILG1CQUF5QixNQUFNLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxhQUFhO0lBQ3pELE1BQU0sS0FBSyxHQUFHLGVBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV2QyxNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7SUFFOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUN0QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0IsUUFBUSxDQUFDLElBQUksQ0FDWDtZQUNFLEtBQUs7WUFDTCw2QkFBNkIsUUFBUSxFQUFFO1lBQ3ZDLDJDQUEyQztZQUMzQyw2QkFBNkI7WUFDN0IsSUFBSTtZQUNKLDBDQUEwQyxRQUFRLDBCQUEwQjtZQUM1RSxJQUFJO1lBQ0oseUJBQXlCO1lBQ3pCLHdCQUF3QixRQUFRLElBQUk7WUFDcEMsdUJBQXVCO1lBQ3ZCLFVBQVU7WUFDVixLQUFLO1lBQ0wsV0FBVyxRQUFRLElBQUk7WUFDdkIsaUJBQWlCLElBQUksR0FBRztZQUN4QixHQUFHO1NBQ0osQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2IsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUEvQkQsNEJBK0JDIn0=
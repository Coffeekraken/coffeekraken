"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_sugar_config_1 = require("@coffeekraken/s-sugar-config");
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
    const sizes = s_sugar_config_1.themeConfig('size');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUVBQTJEO0FBQzNELDRFQUFxRDtBQUVyRCxNQUFNLDJDQUE0QyxTQUFRLHFCQUFZOztBQUdkLGdFQUFTO0FBRnhELHNEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSXpCOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILG1CQUF5QixNQUFNLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxhQUFhO0lBQ3pELE1BQU0sS0FBSyxHQUFHLDRCQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFbEMsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO0lBRTlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDdEMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdCLFFBQVEsQ0FBQyxJQUFJLENBQ1g7WUFDRSxLQUFLO1lBQ0wsNkJBQTZCLFFBQVEsRUFBRTtZQUN2QywyQ0FBMkM7WUFDM0MsNkJBQTZCO1lBQzdCLElBQUk7WUFDSiwwQ0FBMEMsUUFBUSwwQkFBMEI7WUFDNUUsSUFBSTtZQUNKLHlCQUF5QjtZQUN6Qix3QkFBd0IsUUFBUSxJQUFJO1lBQ3BDLHVCQUF1QjtZQUN2QixVQUFVO1lBQ1YsS0FBSztZQUNMLFdBQVcsUUFBUSxJQUFJO1lBQ3ZCLGlCQUFpQixJQUFJLEdBQUc7WUFDeEIsR0FBRztTQUNKLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNiLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBL0JELDRCQStCQyJ9
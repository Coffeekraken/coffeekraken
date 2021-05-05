"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
class postcssSugarPluginMediaMixinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginMediaMixinInterface;
postcssSugarPluginMediaMixinInterface.definition = {};
/**
 * @name           init
 * @namespace      mixins.init
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to apply media queries depending on the ```media.config.js``` config
 * file with ease.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.init;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1({ params, atRule, processNested }) {
    const themeConfig = s_sugar_config_1.default('theme');
    const cssArray = [
        `@sugar.theme(${themeConfig.baseTheme});`,
        '@sugar.reset;',
        '@sugar.layout.classes;',
        '@sugar.font.init;',
        '@sugar.font.classes;',
        '@sugar.color.docblocks;',
        '@sugar.color.classes;',
        '@sugar.size.classes;',
        '@sugar.depth.classes;',
        '@sugar.util.classes;'
    ];
    const AST = processNested(cssArray.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUF5RDtBQUV6RCxNQUFNLHFDQUFzQyxTQUFRLHFCQUFZOztBQUdkLDBEQUFTO0FBRmxELGdEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSXpCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsbUJBQXlCLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxXQUFXLEdBQUcsd0JBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUzQyxNQUFNLFFBQVEsR0FBRztRQUNmLGdCQUFnQixXQUFXLENBQUMsU0FBUyxJQUFJO1FBQ3pDLGVBQWU7UUFDZix3QkFBd0I7UUFDeEIsbUJBQW1CO1FBQ25CLHNCQUFzQjtRQUN0Qix5QkFBeUI7UUFDekIsdUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0Qix1QkFBdUI7UUFDdkIsc0JBQXNCO0tBQ3ZCLENBQUM7SUFFRixNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQTFCRCw0QkEwQkMifQ==
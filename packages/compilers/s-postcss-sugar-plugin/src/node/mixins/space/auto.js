"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../utils/theme"));
class postcssSugarPluginSpaceAutoMixinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginSpaceAutoMixinInterface;
postcssSugarPluginSpaceAutoMixinInterface.definition = {
    space: {
        type: 'String|Number',
        values: Object.keys(theme_1.default().config('space')),
        default: 'default'
    }
};
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
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({ space: 'default' }, (params !== null && params !== void 0 ? params : {}));
    const cssArray = [
        `
    & > * {
        margin-bottom: sugar.space(${finalParams.space});
    }
  `
    ];
    const AST = processNested(cssArray.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELDhEQUF3QztBQUV4QyxNQUFNLHlDQUEwQyxTQUFRLHFCQUFZOztBQVNkLDhEQUFTO0FBUnRELG9EQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLE9BQU8sRUFBRSxTQUFTO0tBQ25CO0NBQ0YsQ0FBQztBQVFKOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILG1CQUF5QixFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxHQUFHLGdCQUNsQixLQUFLLEVBQUUsU0FBUyxJQUNiLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ2xCLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBYTtRQUN6Qjs7cUNBRWlDLFdBQVcsQ0FBQyxLQUFLOztHQUVuRDtLQUNBLENBQUM7SUFFRixNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQXhCRCw0QkF3QkMifQ==
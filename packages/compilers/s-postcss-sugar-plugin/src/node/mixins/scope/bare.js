"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const isInScope_1 = __importDefault(require("../../utils/isInScope"));
class postcssSugarPluginScopeBareMixinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginScopeBareMixinInterface;
postcssSugarPluginScopeBareMixinInterface.definition = {};
/**
 * @name           bare
 * @namespace      mixins.scope
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to wrap some bare type styling to be able to
 * disable it later using classes like ```.s-nude``` or ```.s-no-bare```
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.scope.bare {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    if (!isInScope_1.default('bare')) {
        return atRule.replaceWith('');
    }
    const vars = [];
    if (atRule.parent && atRule.parent.type === 'root') {
        vars.push(`&:not(.s-no-bare &):not(.no-bare) {`);
    }
    else {
        vars.push(`&:not(.s-no-bare &):not(.no-bare) {`);
    }
    vars.push(processNested(atRule.nodes
        .map((node) => {
        if (node.type === 'decl')
            return node.toString() + ';';
        return node.toString();
    })
        .join('\n')));
    vars.push(`}`);
    atRule.replaceWith(vars.join('\n'));
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBRXJELHNFQUFnRDtBQUVoRCxNQUFNLHlDQUEwQyxTQUFRLHFCQUFZOztBQUdkLDhEQUFTO0FBRnRELG9EQUFVLEdBQUcsRUFBRSxDQUFDO0FBTXpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxtQkFBeUIsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcsR0FBRyxrQkFDZixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNsQixDQUFDO0lBRUYsSUFBSSxDQUFDLG1CQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDeEIsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQy9CO0lBRUQsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0tBQ2xEO1NBQU07UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7S0FDbEQ7SUFDRCxJQUFJLENBQUMsSUFBSSxDQUNQLGFBQWEsQ0FDWCxNQUFNLENBQUMsS0FBSztTQUNULEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1osSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU07WUFBRSxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNkLENBQ0YsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBckNELDRCQXFDQyJ9
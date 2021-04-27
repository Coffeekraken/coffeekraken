"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const isInScope_1 = __importDefault(require("../../utils/isInScope"));
class postcssSugarPluginScopeLnfMixinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginScopeLnfMixinInterface;
postcssSugarPluginScopeLnfMixinInterface.definition = {};
/**
 * @name           lnf
 * @namespace      mixins.scope
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to wrap some look-and-feel type styling to be able to
 * disable it later using classes like ```.s-nude``` or ```.s-no-lnf```
 *
 * @example         postcss
 * \@sugar.scope.lnf {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1(params, atRule, processNested) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    if (!isInScope_1.default('lnf')) {
        return atRule.replaceWith('');
    }
    const vars = [];
    vars.push(`&:not(.s-nude-children &):not(.s-no-lnf-children &):not(.s-nude):not(.s-no-lnf) {`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG5mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG5mLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxzRUFBZ0Q7QUFFaEQsTUFBTSx3Q0FBeUMsU0FBUSxxQkFBWTs7QUFHZCw2REFBUztBQUZyRCxtREFBVSxHQUFHLEVBQUUsQ0FBQztBQU16Qjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILG1CQUNFLE1BQXNELEVBQ3RELE1BQU0sRUFDTixhQUFhO0lBRWIsTUFBTSxXQUFXLEdBQUcsa0JBQ2YsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDbEIsQ0FBQztJQUVGLElBQUksQ0FBQyxtQkFBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3ZCLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMvQjtJQUVELE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUNQLG1GQUFtRixDQUNwRixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FDUCxhQUFhLENBQ1gsTUFBTSxDQUFDLEtBQUs7U0FDVCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNaLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNO1lBQUUsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDZCxDQUNGLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQS9CRCw0QkErQkMifQ==
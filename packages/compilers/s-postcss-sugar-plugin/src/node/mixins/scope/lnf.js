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
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    if (!isInScope_1.default('lnf')) {
        return atRule.replaceWith('');
    }
    const vars = [];
    vars.push(`&:not(.s-no-lnf &):not(.s-no-lnf) {`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG5mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG5mLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxzRUFBZ0Q7QUFFaEQsTUFBTSx3Q0FBeUMsU0FBUSxxQkFBWTs7QUFHZCw2REFBUztBQUZyRCxtREFBVSxHQUFHLEVBQUUsQ0FBQztBQU16Qjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILG1CQUF5QixFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxHQUFHLGtCQUNmLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ2xCLENBQUM7SUFFRixJQUFJLENBQUMsbUJBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN2QixPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDL0I7SUFFRCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQ2pELElBQUksQ0FBQyxJQUFJLENBQ1AsYUFBYSxDQUNYLE1BQU0sQ0FBQyxLQUFLO1NBQ1QsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDWixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTTtZQUFFLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2QsQ0FDRixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFqQ0QsNEJBaUNDIn0=
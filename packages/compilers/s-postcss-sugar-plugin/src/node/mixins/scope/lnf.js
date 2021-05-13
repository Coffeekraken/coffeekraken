import __SInterface from '@coffeekraken/s-interface';
import __isInScope from '../../utils/isInScope';
class postcssSugarPluginScopeLnfMixinInterface extends __SInterface {
}
postcssSugarPluginScopeLnfMixinInterface.definition = {};
export { postcssSugarPluginScopeLnfMixinInterface as interface };
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
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    if (!__isInScope('lnf')) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG5mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG5mLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE9BQU8sV0FBVyxNQUFNLHVCQUF1QixDQUFDO0FBRWhELE1BQU0sd0NBQXlDLFNBQVEsWUFBWTs7QUFDMUQsbURBQVUsR0FBRyxFQUFFLENBQUM7QUFFekIsT0FBTyxFQUFFLHdDQUF3QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBSWpFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxHQUFHLGtCQUNmLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ2xCLENBQUM7SUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3ZCLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMvQjtJQUVELE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFDakQsSUFBSSxDQUFDLElBQUksQ0FDUCxhQUFhLENBQ1gsTUFBTSxDQUFDLEtBQUs7U0FDVCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNaLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNO1lBQUUsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDZCxDQUNGLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDdEMsQ0FBQyJ9
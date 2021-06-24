import __SInterface from '@coffeekraken/s-interface';
import __isInScope from '../../utils/isInScope';
class postcssSugarPluginScopeBareMixinInterface extends __SInterface {
}
postcssSugarPluginScopeBareMixinInterface.definition = {};
export { postcssSugarPluginScopeBareMixinInterface as interface };
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
export default function ({ params, atRule, replaceWith, postcssApi }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    if (!__isInScope('bare')) {
        return atRule.replaceWith('');
    }
    // const vars: string[] = [];
    // if (atRule.parent && atRule.parent.type === 'root') {
    //   vars.push(`&:not(.s-no-bare &):not(.no-bare) {`);
    // } else {
    //   vars.push(`&:not(.s-no-bare &):not(.no-bare) {`);
    // }
    // vars.push(__astNodesToString(atRule.nodes));
    // vars.push(`}`);
    const rule = new postcssApi.Rule({
        selector: '&:not(.s-no-bare &):not(.no-bare)'
    });
    atRule.nodes.forEach(node => {
        rule.append(node);
    });
    atRule.replaceWith(rule);
    // replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxXQUFXLE1BQU0sdUJBQXVCLENBQUM7QUFHaEQsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZOztBQUMzRCxvREFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFJbEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBQ1gsVUFBVSxFQU1YO0lBQ0MsTUFBTSxXQUFXLEdBQUcsa0JBQ2YsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDbEIsQ0FBQztJQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDeEIsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQy9CO0lBRUQsNkJBQTZCO0lBRTdCLHdEQUF3RDtJQUN4RCxzREFBc0Q7SUFDdEQsV0FBVztJQUNYLHNEQUFzRDtJQUN0RCxJQUFJO0lBQ0osK0NBQStDO0lBQy9DLGtCQUFrQjtJQUVsQixNQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDL0IsUUFBUSxFQUFFLG1DQUFtQztLQUM5QyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV6QixxQkFBcUI7QUFDdkIsQ0FBQyJ9
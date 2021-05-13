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
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    if (!__isInScope('bare')) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxXQUFXLE1BQU0sdUJBQXVCLENBQUM7QUFFaEQsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZOztBQUMzRCxvREFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFJbEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcsR0FBRyxrQkFDZixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNsQixDQUFDO0lBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN4QixPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDL0I7SUFFRCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7S0FDbEQ7U0FBTTtRQUNMLElBQUksQ0FBQyxJQUFJLENBQUMscUNBQXFDLENBQUMsQ0FBQztLQUNsRDtJQUNELElBQUksQ0FBQyxJQUFJLENBQ1AsYUFBYSxDQUNYLE1BQU0sQ0FBQyxLQUFLO1NBQ1QsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDWixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTTtZQUFFLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2QsQ0FDRixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLENBQUMifQ==
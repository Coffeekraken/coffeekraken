import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginSpaceAutoMixinInterface extends __SInterface {
}
postcssSugarPluginSpaceAutoMixinInterface.definition = {
    space: {
        type: 'String|Number',
        values: Object.keys(__theme().config('space')),
        default: 'default'
    }
};
export { postcssSugarPluginSpaceAutoMixinInterface as interface };
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
export default function ({ params, atRule, processNested }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZOztBQUMzRCxvREFBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxPQUFPLEVBQUUsU0FBUztLQUNuQjtDQUNGLENBQUM7QUFFSixPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFNbEU7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxHQUFHLGdCQUNsQixLQUFLLEVBQUUsU0FBUyxJQUNiLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ2xCLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBYTtRQUN6Qjs7cUNBRWlDLFdBQVcsQ0FBQyxLQUFLOztHQUVuRDtLQUNBLENBQUM7SUFFRixNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9
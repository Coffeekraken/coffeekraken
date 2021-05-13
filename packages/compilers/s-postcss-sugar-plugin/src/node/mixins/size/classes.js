import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginSizeClassesMixinInterface extends __SInterface {
}
postcssSugarPluginSizeClassesMixinInterface.definition = {};
export { postcssSugarPluginSizeClassesMixinInterface as interface };
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
    const sizes = __theme().config('size');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSwyQ0FBNEMsU0FBUSxZQUFZOztBQUM3RCxzREFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUsMkNBQTJDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFcEU7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sS0FBSyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUV2QyxNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7SUFFOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUN0QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0IsUUFBUSxDQUFDLElBQUksQ0FDWDtZQUNFLEtBQUs7WUFDTCw2QkFBNkIsUUFBUSxFQUFFO1lBQ3ZDLDJDQUEyQztZQUMzQyw2QkFBNkI7WUFDN0IsSUFBSTtZQUNKLDBDQUEwQyxRQUFRLDBCQUEwQjtZQUM1RSxJQUFJO1lBQ0oseUJBQXlCO1lBQ3pCLHdCQUF3QixRQUFRLElBQUk7WUFDcEMsdUJBQXVCO1lBQ3ZCLFVBQVU7WUFDVixLQUFLO1lBQ0wsV0FBVyxRQUFRLElBQUk7WUFDdkIsaUJBQWlCLElBQUksR0FBRztZQUN4QixHQUFHO1NBQ0osQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2IsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==
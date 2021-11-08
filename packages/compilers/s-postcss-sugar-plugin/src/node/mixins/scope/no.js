import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginScopeNoMixinInterface extends __SInterface {
    static get _definition() {
        return {
            scopes: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                required: true,
            },
        };
    }
}
export { postcssSugarPluginScopeNoMixinInterface as interface };
/**
 * @name           no
 * @namespace      mixins.scope
 * @type           Mixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to exclude some scope(s) from the generated css.
 * Scopes are usually "bare" or/and "lnf" (look and feel).
 * This is usefull for example if you want all the classes to apply bare styling
 * without any look and feel that you handle by yourself.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.scope.no(lnf) {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const _noScopesStack = [];
export default function ({ params, sharedData, atRule, replaceWith, postcssApi, }) {
    const finalParams = Object.assign({ scopes: [] }, (params !== null && params !== void 0 ? params : {}));
    // _noScopesStack.push(finalParams.scopes.join(','));
    // sharedData.noScopes = finalParams.scopes;
    // console.log(finalParams);
    // atRule.replaceWith(atRule.nodes);
    // console.log('RESTORE');
    // _noScopesStack.pop();
    // if (_noScopesStack.length) {
    //     // @ts-ignore
    //     sharedData.noScopes = _noScopesStack.slice(-1).split(',');
    // } else {
    //     sharedData.noScopes = [];
    // }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU1oRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBTSxjQUFjLEdBQWEsRUFBRSxDQUFDO0FBQ3BDLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLFVBQVUsRUFDVixNQUFNLEVBQ04sV0FBVyxFQUNYLFVBQVUsR0FPYjtJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixNQUFNLEVBQUUsRUFBRSxJQUNQLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixxREFBcUQ7SUFDckQsNENBQTRDO0lBRTVDLDRCQUE0QjtJQUM1QixvQ0FBb0M7SUFFcEMsMEJBQTBCO0lBQzFCLHdCQUF3QjtJQUN4QiwrQkFBK0I7SUFDL0Isb0JBQW9CO0lBQ3BCLGlFQUFpRTtJQUNqRSxXQUFXO0lBQ1gsZ0NBQWdDO0lBQ2hDLElBQUk7QUFDUixDQUFDIn0=
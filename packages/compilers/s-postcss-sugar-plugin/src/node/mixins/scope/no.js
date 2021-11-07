import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginScopeNoMixinInterface extends __SInterface {
    static get definition() {
        var _a;
        return ((_a = this.cached()) !== null && _a !== void 0 ? _a : this.cache({
            scopes: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                required: true,
            },
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7SUFDOUQsTUFBTSxLQUFLLFVBQVU7O1FBQ2pCLE9BQU8sQ0FDSCxNQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsbUNBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNQLE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFNaEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sY0FBYyxHQUFhLEVBQUUsQ0FBQztBQUNwQyxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixVQUFVLEVBQ1YsTUFBTSxFQUNOLFdBQVcsRUFDWCxVQUFVLEdBT2I7SUFDRyxNQUFNLFdBQVcsR0FBRyxnQkFDaEIsTUFBTSxFQUFFLEVBQUUsSUFDUCxDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYscURBQXFEO0lBQ3JELDRDQUE0QztJQUU1Qyw0QkFBNEI7SUFDNUIsb0NBQW9DO0lBRXBDLDBCQUEwQjtJQUMxQix3QkFBd0I7SUFDeEIsK0JBQStCO0lBQy9CLG9CQUFvQjtJQUNwQixpRUFBaUU7SUFDakUsV0FBVztJQUNYLGdDQUFnQztJQUNoQyxJQUFJO0FBQ1IsQ0FBQyJ9
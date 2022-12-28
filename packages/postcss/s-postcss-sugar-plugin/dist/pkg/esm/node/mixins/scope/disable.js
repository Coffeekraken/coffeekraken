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
 * @namespace      node.mixin.scope
 * @type           PostcssMixin
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
 * @example        css
 * @sugar.scope.no(lnf) {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JELE1BQU0sdUNBQXdDLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTWhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLGNBQWMsR0FBYSxFQUFFLENBQUM7QUFDcEMsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sVUFBVSxFQUNWLE1BQU0sRUFDTixXQUFXLEVBQ1gsVUFBVSxHQU9iO0lBQ0csTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLE1BQU0sRUFBRSxFQUFFLElBQ1AsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLHFEQUFxRDtJQUNyRCw0Q0FBNEM7SUFFNUMsNEJBQTRCO0lBQzVCLG9DQUFvQztJQUVwQywwQkFBMEI7SUFDMUIsd0JBQXdCO0lBQ3hCLCtCQUErQjtJQUMvQixvQkFBb0I7SUFDcEIsaUVBQWlFO0lBQ2pFLFdBQVc7SUFDWCxnQ0FBZ0M7SUFDaEMsSUFBSTtBQUNSLENBQUMifQ==
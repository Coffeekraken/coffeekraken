import __SInterface from '@coffeekraken/s-interface';
class SSugarcssPluginScopEexcludeMixinInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'String[]',
                    splitChars: [',', ' '],
                },
                description: "Specify the scope(s) you don't want to generate for the enclosed css",
                required: true,
            },
        };
    }
}
export { SSugarcssPluginScopEexcludeMixinInterface as interface };
/**
 * @name           exclude
 * @as              @s.scope
 * @namespace      node.mixin.scope
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to set the "scope(s)" you don't want to all the enclosed css
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @s.scope.exclude ($1) { $2 }
 * @s.scope.exclude $1 {
 *      $2
 * }
 *
 * @example        css
 * @s.scope.exclude lnf {
 *      @s.ui.button;
 *      // etc...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, registerPostProcessor, replaceWith, sharedData, }) {
    var _a;
    const finalParams = Object.assign({ scope: [] }, (params !== null && params !== void 0 ? params : {}));
    atRule._scopeExclude = (_a = atRule._scopeExclude) !== null && _a !== void 0 ? _a : finalParams.scope;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0seUNBQTBDLFNBQVEsWUFBWTtJQUNoRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsV0FBVyxFQUNQLHNFQUFzRTtnQkFDMUUsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHlDQUF5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTWxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLHFCQUFxQixFQUNyQixXQUFXLEVBQ1gsVUFBVSxHQU9iOztJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixLQUFLLEVBQUUsRUFBRSxJQUNOLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixNQUFNLENBQUMsYUFBYSxHQUFHLE1BQUEsTUFBTSxDQUFDLGFBQWEsbUNBQUksV0FBVyxDQUFDLEtBQUssQ0FBQztBQUNyRSxDQUFDIn0=
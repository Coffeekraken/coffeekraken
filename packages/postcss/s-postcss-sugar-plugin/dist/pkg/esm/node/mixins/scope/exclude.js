import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginScopeExcludeMixinInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'String[]',
                    splitChars: [',', ' '],
                },
                description: "Specify the scope(s) you don't want to generate for the enclosed mixins calls",
                required: true,
            },
        };
    }
}
export { postcssSugarPluginScopeExcludeMixinInterface as interface };
/**
 * @name           exclude
 * @as              @s.scope
 * @namespace      node.mixin.scope
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to set the "scope(s)" you dont't want to all the called mixins that have a "$scope" parameter like `@s.ui.button`, `@s.ui.avatar`, etc...
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
export default function ({ params, atRule, registerPostProcessor, replaceWith, }) {
    const finalParams = Object.assign({ scope: [] }, (params !== null && params !== void 0 ? params : {}));
    registerPostProcessor((root) => {
        root.walkAtRules(/sugar\.scope/, (at) => {
            at.replaceWith(at.nodes);
        });
    });
    atRule.walkAtRules((n) => {
        // console.log('d', n.name);
        if (n.type !== 'atrule' || !n.name.startsWith('sugar.')) {
            return;
        }
        // save the unwanted scope(s) inside the atRule.
        // this will be handled by the postcssSugarPlugin main file
        // to compute the final "scope" param to pass
        n._scopeExclude = finalParams.scope;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sNENBQTZDLFNBQVEsWUFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsV0FBVyxFQUNQLCtFQUErRTtnQkFDbkYsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLDRDQUE0QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTXJFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLHFCQUFxQixFQUNyQixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsR0FBRyxnQkFDaEIsS0FBSyxFQUFFLEVBQUUsSUFDTixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYscUJBQXFCLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQ3BDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDckIsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNyRCxPQUFPO1NBQ1Y7UUFDRCxnREFBZ0Q7UUFDaEQsMkRBQTJEO1FBQzNELDZDQUE2QztRQUM3QyxDQUFDLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=
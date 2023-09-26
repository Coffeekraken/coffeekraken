import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           active
 * @as              @s.when
 * @namespace      node.mixin.when
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./when
 * @status        wip
 *
 * This mixin allows you to set some css applied only WHEN a specific "state" has been
 * reached.
 * Supported states are:
 * - mounted: When a sugar webcomponent has the "mounted" attribute
 * - active: When the element has the "active" class or the "active" attribute
 * - dark: When the prefered color scheme is dark
 * - light: When the prefered color scheme is light
 *
 * @param       {'mounted'|'active'|'dark'|'light'}         state           The state you want to target
 * @param       {'self'|'sibling'|'parent'|'ancestor'|'theme'}      [context='self']        The context of the when
 * @return        {Css}         The generated css
 *
 * @example        css
 * .myElement {
 *      display: none;
 *
 *      @s.when mounted {
 *          display: block;
 *      }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginmountedMixinInterface extends __SInterface {
    static get _definition() {
        return {
            state: {
                type: 'String',
                values: ['mounted', 'active', 'dark', 'light'],
                required: true,
            },
            context: {
                type: 'String',
                values: ['self', 'sibling', 'parent', 'ancestor', 'theme'],
                default: 'self',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginmountedMixinInterface as interface };
export default function ({ params, atRule, postcssApi, }) {
    const finalParams = Object.assign({ state: 'mounted', context: 'self' }, (params !== null && params !== void 0 ? params : {}));
    let selector;
    switch (finalParams.state) {
        case 'mounted':
            if (finalParams.context === 'parent') {
                selector = '*[mounted] > &, *.mounted > &';
            }
            else if (finalParams.context === 'ancestor') {
                selector = '*[mounted] &, *.mounted &';
            }
            else if (finalParams.context === 'sibling') {
                selector = '*[mounted] + &, *.mounted + &';
            }
            else {
                selector = '&[mounted], &.mounted';
            }
            break;
        case 'active':
            if (finalParams.context === 'parent') {
                selector = '*[active] > &. *.active > &';
            }
            else if (finalParams.context === 'ancestor') {
                selector = '*[active] &. *.active &';
            }
            else if (finalParams.context === 'sibling') {
                selector = '*[active] + &. *.active + &';
            }
            else {
                selector = '&[active], &.active';
            }
            break;
        case 'dark':
            selector = `@media (prefers-color-scheme: dark)`;
            break;
        case 'light':
            selector = `@media (prefers-color-scheme: light)`;
            break;
    }
    const wrapperRule = new postcssApi.Rule({
        selector,
    });
    // @ts-ignore
    atRule.nodes.forEach((node) => {
        wrapperRule.append(node);
    });
    atRule.replaceWith(wrapperRule);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUVILE1BQU0sdUNBQXdDLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztnQkFDOUMsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQztnQkFDMUQsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTWhFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEdBS2I7SUFDRyxNQUFNLFdBQVcsR0FBRyxnQkFDaEIsS0FBSyxFQUFFLFNBQVMsRUFDaEIsT0FBTyxFQUFFLE1BQU0sSUFDWixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUM7SUFFYixRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDdkIsS0FBSyxTQUFTO1lBQ1YsSUFBSSxXQUFXLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDbEMsUUFBUSxHQUFHLCtCQUErQixDQUFDO2FBQzlDO2lCQUFNLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7Z0JBQzNDLFFBQVEsR0FBRywyQkFBMkIsQ0FBQzthQUMxQztpQkFBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUMxQyxRQUFRLEdBQUcsK0JBQStCLENBQUM7YUFDOUM7aUJBQU07Z0JBQ0gsUUFBUSxHQUFHLHVCQUF1QixDQUFDO2FBQ3RDO1lBQ0QsTUFBTTtRQUNWLEtBQUssUUFBUTtZQUNULElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQ2xDLFFBQVEsR0FBRyw2QkFBNkIsQ0FBQzthQUM1QztpQkFBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO2dCQUMzQyxRQUFRLEdBQUcseUJBQXlCLENBQUM7YUFDeEM7aUJBQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtnQkFDMUMsUUFBUSxHQUFHLDZCQUE2QixDQUFDO2FBQzVDO2lCQUFNO2dCQUNILFFBQVEsR0FBRyxxQkFBcUIsQ0FBQzthQUNwQztZQUNELE1BQU07UUFDVixLQUFLLE1BQU07WUFDUCxRQUFRLEdBQUcscUNBQXFDLENBQUM7WUFDakQsTUFBTTtRQUNWLEtBQUssT0FBTztZQUNSLFFBQVEsR0FBRyxzQ0FBc0MsQ0FBQztZQUNsRCxNQUFNO0tBQ2I7SUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDcEMsUUFBUTtLQUNYLENBQUMsQ0FBQztJQUVILGFBQWE7SUFDYixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzFCLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3BDLENBQUMifQ==
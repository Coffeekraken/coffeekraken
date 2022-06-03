import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           active
 * @namespace      node.mixin.when
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./when
 * @status        beta
 *
 * This mixin allows you to set some css applied only WHEN a specific "state" has been
 * reached.
 * Supported states are:
 * - mounted: When a sugar webcomponent has the "mounted" attribute
 * - active: When the element has the "active" class or the "active" attribute
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * .myElement {
 *      display: none;
 *
 *      @sugar.when.mounted {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFFSCxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7Z0JBQzlDLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUM7Z0JBQzFELE9BQU8sRUFBRSxNQUFNO2dCQUNmLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU1oRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxHQUtiO0lBQ0csTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLEtBQUssRUFBRSxTQUFTLEVBQ2hCLE9BQU8sRUFBRSxNQUFNLElBQ1osQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDO0lBRWIsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3ZCLEtBQUssU0FBUztZQUNWLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQ2xDLFFBQVEsR0FBRywrQkFBK0IsQ0FBQzthQUM5QztpQkFBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO2dCQUMzQyxRQUFRLEdBQUcsMkJBQTJCLENBQUM7YUFDMUM7aUJBQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtnQkFDMUMsUUFBUSxHQUFHLCtCQUErQixDQUFDO2FBQzlDO2lCQUFNO2dCQUNILFFBQVEsR0FBRyx1QkFBdUIsQ0FBQzthQUN0QztZQUNELE1BQU07UUFDVixLQUFLLFFBQVE7WUFDVCxJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUNsQyxRQUFRLEdBQUcsNkJBQTZCLENBQUM7YUFDNUM7aUJBQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtnQkFDM0MsUUFBUSxHQUFHLHlCQUF5QixDQUFDO2FBQ3hDO2lCQUFNLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7Z0JBQzFDLFFBQVEsR0FBRyw2QkFBNkIsQ0FBQzthQUM1QztpQkFBTTtnQkFDSCxRQUFRLEdBQUcscUJBQXFCLENBQUM7YUFDcEM7WUFDRCxNQUFNO1FBQ1YsS0FBSyxNQUFNO1lBQ1AsUUFBUSxHQUFHLHFDQUFxQyxDQUFDO1lBQ2pELE1BQU07UUFDVixLQUFLLE9BQU87WUFDUixRQUFRLEdBQUcsc0NBQXNDLENBQUM7WUFDbEQsTUFBTTtLQUNiO0lBRUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQ3BDLFFBQVE7S0FDWCxDQUFDLENBQUM7SUFFSCxhQUFhO0lBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxQixXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwQyxDQUFDIn0=
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name          inputContainer
 * @as          @s.ui.inputContainer
 * @namespace     node.mixin.ui.inputContainer
 * @type               PostcssMixin
 * @interface       ./input
 * @platform      postcss
 * @status        beta
 *
 * Apply an input container style like "button", "addon", etc...
 *
 * @param       {'addon'|'group'}                           lnf         The style you want to apply
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.inputContainer
 *
 * @example     css
 * .my-input-container {
 *    @s.ui.inputContainer(group);
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiFormInputInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['addon', 'group'],
                required: true,
            },
        };
    }
}
export { SSugarcssPluginUiFormInputInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'group' }, params);
    const vars = [];
    vars.push(`
        @s.scope 'bare' {
            width: 100%;
        }
    `);
    vars.push(`@s.scope 'bare' {`);
    switch (finalParams.lnf) {
        case 'addon':
            vars.push(`
                display: block;
                position: relative;

                & > *:first-child {
                    width: 100%;
                    padding-inline-end: 3em;
                }
                & > *:first-child + * {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    height: 100%;
                    aspect-ratio: 1;
                    top: 0; right: 0;
                }

                [dir="rtl"] &, &[dir="rtl"] {
                    & > *:first-child + * {
                        right: auto;
                        left: 0;
                    }
                }
                `);
            break;
        case 'group':
        default:
            vars.push(`
                display: flex;

                &:not([dir="rtl"] &):not([dir="rtl"]) {
                    & > *:first-child,
                    & > .s-input-container > *:first-child {
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                    }
                    & > *:last-child,
                    & > .s-input-container > *:last-child {
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                    }
                }
                [dir="rtl"] &, &[dir="rtl"] {
                    & > *:first-child,
                    & > .s-input-container > *:first-child {
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                    }
                    & > *:last-child,
                    & > .s-input-container > *:last-child {
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                    }
                }

                & > *:not(:first-child, :last-child),
                & > .s-input-container > *:not(:first-child, :last-child) {
                    border-radius: 0;
                }
            `);
            break;
    }
    vars.push('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUVILE1BQU0sbUNBQW9DLFNBQVEsWUFBWTtJQUMxRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7Z0JBQzFCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSxtQ0FBbUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEdBQUcsRUFBRSxPQUFPLElBQ1QsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztLQUlULENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvQixRQUFRLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDckIsS0FBSyxPQUFPO1lBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQXdCTCxDQUFDLENBQUM7WUFDUCxNQUFNO1FBQ1YsS0FBSyxPQUFPLENBQUM7UUFDYjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBZ0NULENBQUMsQ0FBQztZQUNILE1BQU07S0FDYjtJQUVELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=
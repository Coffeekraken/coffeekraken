import __SInterface from '@coffeekraken/s-interface';
/**
 * @name          dropdown
 * @as              @s.ui.dropdown
 * @namespace     node.mixin.ui.dropdown
 * @type               PostcssMixin
 * @interface     ./dropdown          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the dropdown style to any element
 *
 * @param       {'top'|'top-start'|'top-end'|'bottom'|'bottom-start'|'bottom-end'}          [position='bottom']         The position of the dropdown
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       position        Position css
 *
 * @snippet         @s.ui.dropdown
 *
 * @example     css
 * .my-dropdown {
 *    @s.ui.dropdown;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiDropdownInterface extends __SInterface {
    static get _definition() {
        return {
            position: {
                type: 'String',
                values: [
                    'top',
                    'top-start',
                    'top-end',
                    'bottom',
                    'bottom-start',
                    'bottom-end',
                ],
                default: 'bottom',
            },
        };
    }
}
export { SSugarcssPluginUiDropdownInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ position: 'bottom' }, params);
    const vars = [];
    vars.push(`
            @s.scope 'bare' {
                font-size: s.scalable(1rem);
                position: absolute;
                -webkit-appearance: none;
                appearance: none;
                line-height: 1;
                outline: 0;
                white-space: nowrap;
                cursor: auto;
                z-index: 50;

                @s.state.disabled {
                    @s.disabled;
                    opacity: 0 !important;
                }
            }
      `);
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`
            background-color: s.color(main, background);
            border: s.border.width(ui.dropdown.borderWidth) solid s.color(current, border);
            @s.border.radius(ui.dropdown.borderRadius);
            padding-inline: s.padding(ui.dropdown.paddingInline);
            padding-block: s.padding(ui.dropdown.paddingBlock);
            @s.depth(ui.dropdown.depth);
            @s.transition(fast);
        `);
    vars.push('}');
    vars.push(`@s.scope 'position' {`);
    switch (finalParams.position) {
        case 'top':
            vars.push(`
                    bottom: 100%;
                    top: auto;
                    left: 50%;
                    transform: translateX(-50%);
                `);
            break;
        case 'top-end':
            vars.push(`
                    bottom: 100%;
                    top: auto;
                    left: auto;
                    right: 0;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: auto;
                        left: 0;
                    }

                `);
            break;
        case 'top-start':
            vars.push(`
                    bottom: 100%;
                    top: auto;
                    left: 0;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: 0;
                        left: auto;
                    }
                `);
            break;
        case 'bottom-start':
            vars.push(`
                    top: 100%;
                    left: 0;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: 0;
                        left: auto;
                    }
                `);
            break;
        case 'bottom-end':
            vars.push(`
                    top: 100%;
                    right: 0;
                    left: auto;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: auto;
                        left: 0;
                    }
                `);
            break;
        case 'bottom':
        default:
            vars.push(`
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                `);
            break;
    }
    vars.push('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFFSCxNQUFNLGtDQUFtQyxTQUFRLFlBQVk7SUFDekQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUU7b0JBQ0osS0FBSztvQkFDTCxXQUFXO29CQUNYLFNBQVM7b0JBQ1QsUUFBUTtvQkFDUixjQUFjO29CQUNkLFlBQVk7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFLFFBQVE7YUFDcEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBWUQsT0FBTyxFQUFFLGtDQUFrQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTNELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsUUFBUSxFQUFFLFFBQVEsSUFDZixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCUCxDQUFDLENBQUM7SUFFTCxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7U0FRTCxDQUFDLENBQUM7SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ25DLFFBQVEsV0FBVyxDQUFDLFFBQVEsRUFBRTtRQUMxQixLQUFLLEtBQUs7WUFDTixJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztpQkFLTCxDQUFDLENBQUM7WUFDUCxNQUFNO1FBQ1YsS0FBSyxTQUFTO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7OztpQkFhTCxDQUFDLENBQUM7WUFDUCxNQUFNO1FBQ1YsS0FBSyxXQUFXO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7aUJBV0wsQ0FBQyxDQUFDO1lBQ1AsTUFBTTtRQUNWLEtBQUssY0FBYztZQUNmLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7aUJBVUwsQ0FBQyxDQUFDO1lBQ1AsTUFBTTtRQUNWLEtBQUssWUFBWTtZQUNiLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7O2lCQVdMLENBQUMsQ0FBQztZQUNQLE1BQU07UUFDVixLQUFLLFFBQVEsQ0FBQztRQUNkO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7OztpQkFJTCxDQUFDLENBQUM7WUFDUCxNQUFNO0tBQ2I7SUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9
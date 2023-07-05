import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginStateOutlineWhenMixinInterface extends __SInterface {
    static get _definition() {
        return {
            when: {
                type: 'Array<String>',
                values: ['hover', 'focus', 'always'],
                default: ['focus'],
            },
            color: {
                type: 'String',
                default: 'current',
            },
        };
    }
}
export { postcssSugarPluginStateOutlineWhenMixinInterface as interface };
/**
 * @name           when
 * @as              @sugar.outline.when
 * @namespace      node.mixin.outline
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a nice outline on any HTMLElement.
 * This outline will be display on hover and focus by default but can be displayed
 * always by passing the `on` parameter to `always` like so `@sugar.outline(always)`
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @sugar.outline.when($1)
 *
 * @example        css
 * .myCoolItem {
 *      @sugar.outline.when(focus);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ when: ['focus'], color: 'current' }, (params !== null && params !== void 0 ? params : {}));
    const vars = [];
    if (finalParams.when.indexOf('focus') !== -1) {
        vars.push(`
            &:focus,
            &:focus-within {
                &:not(:hover) {
                    @sugar.outline(${finalParams.color});
                }
            }
        `);
    }
    if (finalParams.when.indexOf('hover') !== -1) {
        vars.push(`
                &:hover {
                    @sugar.outline(${finalParams.color});
                }
            `);
    }
    if (finalParams.when.indexOf('always') !== -1) {
        vars.push(`
           & {
                @sugar.outline(${finalParams.color});
            }
        `);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sZ0RBQWlELFNBQVEsWUFBWTtJQUN2RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQztnQkFDcEMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxTQUFTO2FBQ3JCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSxnREFBZ0QsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU96RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUNmLEtBQUssRUFBRSxTQUFTLElBQ2IsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7cUNBSW1CLFdBQVcsQ0FBQyxLQUFLOzs7U0FHN0MsQ0FBQyxDQUFDO0tBQ047SUFFRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7O3FDQUVtQixXQUFXLENBQUMsS0FBSzs7YUFFekMsQ0FBQyxDQUFDO0tBQ1Y7SUFFRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUM7O2lDQUVlLFdBQVcsQ0FBQyxLQUFLOztTQUV6QyxDQUFDLENBQUM7S0FDTjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==
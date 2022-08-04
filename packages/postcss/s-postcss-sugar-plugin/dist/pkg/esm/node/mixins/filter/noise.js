import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           noise
 * @namespace      node.mixin.filter
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a noise effect on any HTMLElement using the svg turbulence filter.
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * .my-element {
 *    \@sugar.filter.noise(20);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginDisabledInterface extends __SInterface {
    static get _definition() {
        return {
            frequency: {
                type: 'Number',
                required: true,
                default: 0.65,
            },
            width: {
                type: 'String',
                required: true,
                default: '5000px',
            },
            height: {
                type: 'String',
                required: true,
                default: '5000px',
            },
        };
    }
}
export { postcssSugarPluginDisabledInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ frequency: 0.65, width: '5000px', height: '5000px' }, params);
    const vars = [];
    vars.push(`
            filter: sugar.filter.noise($frequency: ${finalParams.frequency}, $width: ${finalParams.width}, $height: ${finalParams.height})#filter;
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsUUFBUTthQUNwQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsUUFBUTthQUNwQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRRCxPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixTQUFTLEVBQUUsSUFBSSxFQUNmLEtBQUssRUFBRSxRQUFRLEVBQ2YsTUFBTSxFQUFFLFFBQVEsSUFDYixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDO3FEQUN1QyxXQUFXLENBQUMsU0FBUyxhQUFhLFdBQVcsQ0FBQyxLQUFLLGNBQWMsV0FBVyxDQUFDLE1BQU07S0FDbkksQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9
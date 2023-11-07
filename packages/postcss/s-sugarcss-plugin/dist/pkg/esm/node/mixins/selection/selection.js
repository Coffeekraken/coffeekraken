import __SInterface from '@coffeekraken/s-interface';
class SSugarcssPluginLiikAndFeelSelectionInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                title: 'Color',
                description: 'Specify the color of the selection you want like "accent", "complementary", etc...',
                default: 'accent',
            },
        };
    }
}
export { SSugarcssPluginLiikAndFeelSelectionInterface as interface };
/**
 * @name          selection
 * @as          @s.selection
 * @namespace     node.mixin.selection
 * @type          PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to apply a "selection" style to any HTMLElement.
 * This will apply a background and text color to the selected text.
 *
 * - Selection background and text color
 *
 * @param       {String}        layout      The layout to generate
 * @return      {Css}                   The corresponding grid css
 *
 * @snippet         @s.selection($1)
 *
 * @example       css
 * @s.selection;
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ color: 'accent' }, params);
    const vars = [];
    const css = `
    ::selection {
        color: s.color(${finalParams.color}, --darken 20);
        background: s.color(${finalParams.color}, --lighten 30);
    }
  `;
    vars.push(css);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sNENBQTZDLFNBQVEsWUFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxPQUFPO2dCQUNkLFdBQVcsRUFDUCxvRkFBb0Y7Z0JBQ3hGLE9BQU8sRUFBRSxRQUFRO2FBQ3BCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVyRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxRQUFRLElBQ1osTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxHQUFHLEdBQUc7O3lCQUVTLFdBQVcsQ0FBQyxLQUFLOzhCQUNaLFdBQVcsQ0FBQyxLQUFLOztHQUU1QyxDQUFDO0lBRUEsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==
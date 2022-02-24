import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginAlignInterface extends __SInterface {
    static get _definition() {
        return {
            align: {
                type: 'String',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginAlignInterface as interface };
/**
 * @name          abs
 * @namespace     sugar.postcss.mixin.lnf
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to center an item using the absolute method. Here's the accepted alignements:
 *
 * - <s-color="accent">top</s-color>: Align item to the top
 * - <s-color="accent">left</s-color>: Align item to the left
 * - <s-color="accent">right</s-color>: Align item to the right
 * - <s-color="accent">bottom</s-color>: Align item to the bottom
 * - <s-color="accent">center</s-color>: Align item to the center (x and y)
 * - <s-color="accent">center-x</s-color>: Align item to the center-x
 * - <s-color="accent">center-y</s-color>: Align item to the center-y
 *
 * These values can be specified like "top right", "bottom center-x", etc...
 *
 * @param       {String}        layout      The layout to generate
 * @return      {Css}                   The corresponding grid css
 *
 * @example       css
 * .my-element {
 *    \@sugar.align.abs(top right);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.code(`
        position: absolute;
    `);
    let transform = '';
    const alignSplits = finalParams.align.split(' ').map((l) => l.trim());
    if (alignSplits.indexOf('top') !== -1) {
        vars.code('top: 0;');
    }
    else if (alignSplits.indexOf('bottom') !== -1) {
        vars.code('bottom: 0;');
    }
    else if (alignSplits.indexOf('center') !== -1 ||
        alignSplits.indexOf('center-y') !== -1) {
        vars.code('top: 50%;');
        transform += 'translateY(-50%) ';
    }
    if (alignSplits.indexOf('left') !== -1) {
        vars.code('left: 0;');
    }
    else if (alignSplits.indexOf('right') !== -1) {
        vars.code('right: 0;');
    }
    else if (alignSplits.indexOf('center') !== -1 ||
        alignSplits.indexOf('center-x') !== -1) {
        vars.code('left: 50%;');
        transform += 'translateX(-50%)';
    }
    if (transform) {
        vars.code(`transform: ${transform.trim()};`);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLElBQUksQ0FBQzs7S0FFVCxDQUFDLENBQUM7SUFFSCxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDbkIsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUV0RSxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUN4QjtTQUFNLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQzNCO1NBQU0sSUFDSCxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUN4QztRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkIsU0FBUyxJQUFJLG1CQUFtQixDQUFDO0tBQ3BDO0lBRUQsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDekI7U0FBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUMxQjtTQUFNLElBQ0gsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDeEM7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hCLFNBQVMsSUFBSSxrQkFBa0IsQ0FBQztLQUNuQztJQUVELElBQUksU0FBUyxFQUFFO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLFNBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDaEQ7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=
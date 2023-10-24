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
 * @as          @s.align.abs
 * @namespace     node.mixin.align
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to center an item using the absolute method. Here's the accepted alignements:
 *
 * These values can be specified like "top right", "bottom center-x", etc...
 *
 * @param       {String}        align      How to align the item like "top left", "bottom center-x", etc...
 * @return      {Css}                   The corresponding grid css
 *
 * @snippet         @s.align.abs($1)
 *
 * @example       css
 * .my-element {
 *    @s.align.abs(top right);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxJQUFJLENBQUM7O0tBRVQsQ0FBQyxDQUFDO0lBRUgsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ25CLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFdEUsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDeEI7U0FBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUMzQjtTQUFNLElBQ0gsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDeEM7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLFNBQVMsSUFBSSxtQkFBbUIsQ0FBQztLQUNwQztJQUVELElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3pCO1NBQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDMUI7U0FBTSxJQUNILFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQ3hDO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4QixTQUFTLElBQUksa0JBQWtCLENBQUM7S0FDbkM7SUFFRCxJQUFJLFNBQVMsRUFBRTtRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ2hEO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9
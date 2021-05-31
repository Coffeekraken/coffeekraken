import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginAlignFlexInterface extends __SInterface {
}
postcssSugarPluginAlignFlexInterface.definition = {
    align: {
        type: 'String',
        required: true
    }
};
export { postcssSugarPluginAlignFlexInterface as interface };
/**
 * @name          abs
 * @namespace     sugar.postcss.mixin.lnf
 * @type          PostcssMixin
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
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    let alignItems = 'flex-start'; // stretch | flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end + ... safe | unsafe
    const alignParts = finalParams.align.split(' ');
    if (alignParts.indexOf('end') !== -1)
        alignItems = 'flex-end';
    else if (alignParts.indexOf('center') !== -1)
        alignItems = 'center';
    else if (alignParts.indexOf('stretch') !== -1)
        alignItems = 'stretch';
    else if (alignParts.indexOf('baseline') !== -1)
        alignItems = 'baseline';
    vars.push(`
    display: flex;
    align-items: ${alignItems};
  `);
    let transform = '';
    const alignSplits = finalParams.align.split(' ').map((l) => l.trim());
    if (alignSplits.indexOf('top') !== -1) {
        vars.push('top: 0;');
    }
    else if (alignSplits.indexOf('bottom') !== -1) {
        vars.push('bottom: 0;');
    }
    else if (alignSplits.indexOf('center') !== -1 ||
        alignSplits.indexOf('center-y') !== -1) {
        vars.push('top: 50%;');
        transform += 'translateY(-50%) ';
    }
    if (alignSplits.indexOf('left') !== -1) {
        vars.push('left: 0;');
    }
    else if (alignSplits.indexOf('right') !== -1) {
        vars.push('right: 0;');
    }
    else if (alignSplits.indexOf('center') !== -1 ||
        alignSplits.indexOf('center-x') !== -1) {
        vars.push('left: 50%;');
        transform += 'translateX(-50%)';
    }
    if (transform) {
        vars.push(`transform: ${transform.trim()};`);
    }
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZsZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZOztBQUN0RCwrQ0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFPSixPQUFPLEVBQUUsb0NBQW9DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxVQUFVLEdBQUcsWUFBWSxDQUFDLENBQUMsaUpBQWlKO0lBRWhMLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWhELElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFBRSxVQUFVLEdBQUcsVUFBVSxDQUFDO1NBQ3pELElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFBRSxVQUFVLEdBQUcsUUFBUSxDQUFDO1NBQy9ELElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFBRSxVQUFVLEdBQUcsU0FBUyxDQUFDO1NBQ2pFLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFBRSxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBRXhFLElBQUksQ0FBQyxJQUFJLENBQUM7O21CQUVPLFVBQVU7R0FDMUIsQ0FBQyxDQUFDO0lBRUgsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ25CLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFdEUsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDdEI7U0FBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN6QjtTQUFNLElBQ0wsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDdEM7UUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLFNBQVMsSUFBSSxtQkFBbUIsQ0FBQztLQUNsQztJQUVELElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3ZCO1NBQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDeEI7U0FBTSxJQUNMLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQ3RDO1FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4QixTQUFTLElBQUksa0JBQWtCLENBQUM7S0FDakM7SUFFRCxJQUFJLFNBQVMsRUFBRTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQzlDO0lBRUQsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==
import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginStateOutlineMixinInterface extends __SInterface {
}
postcssSugarPluginStateOutlineMixinInterface.definition = {
    where: {
        type: 'String',
        values: ['after', 'before', 'element'],
        default: 'after',
    },
};
export { postcssSugarPluginStateOutlineMixinInterface as interface };
/**
 * @name           outline
 * @namespace      mixins.outline
 * @type           Mixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to apply a nice outline on any HTMLElement.
 * This outline will be display on hover and focus by default but can be displayed
 * always by passing the `on` parameter to `always` like so `@sugar.outline(always)`
 *
 *
 * @return      {Css}         The generated css
 *
 * @example         postcss
 * .myCoolItem {
 *      @sugar.outline();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ where: 'after' }, (params !== null && params !== void 0 ? params : {}));
    const vars = [];
    let sel = `&:${finalParams.where}`;
    if (finalParams.where === 'element')
        sel = '&';
    vars.push(`

        @keyframes s-outline-in {
            from {
                box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.3);
            }
            to {
                box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
            }
        }

        position: relative;
        
        ${sel} {
            animation: s-outline-in sugar.theme(timing.default) sugar.theme(easing.default) forwards;
            box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.3);
            
            ${finalParams.where !== 'element'
        ? `
                border-radius: sugar.theme(ui.outline.borderRadius);
                content: '';
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
            `
        : ''}
        }
    `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm91dGxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZOztBQUM1RCx1REFBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFDdEMsT0FBTyxFQUFFLE9BQU87S0FDbkI7Q0FDSixDQUFDO0FBRU4sT0FBTyxFQUFFLDRDQUE0QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTXJFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLEtBQUssRUFBRSxPQUFPLElBQ1gsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLEdBQUcsR0FBRyxLQUFLLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEtBQUssU0FBUztRQUFFLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFFL0MsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7OztVQWFKLEdBQUc7Ozs7Y0FLRyxXQUFXLENBQUMsS0FBSyxLQUFLLFNBQVM7UUFDM0IsQ0FBQyxDQUFDOzs7Ozs7YUFNVDtRQUNPLENBQUMsQ0FBQyxFQUNWOztLQUVQLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=
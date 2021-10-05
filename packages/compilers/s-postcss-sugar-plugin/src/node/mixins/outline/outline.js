import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginStateOutlineMixinInterface extends __SInterface {
}
postcssSugarPluginStateOutlineMixinInterface.definition = {
    on: {
        type: 'Array<String>',
        values: ['hover', 'focus', 'always'],
        default: ['focus'],
    },
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
    const finalParams = Object.assign({ on: ['focus', 'hover'], where: 'after' }, (params !== null && params !== void 0 ? params : {}));
    const vars = [];
    let selector = `&:${finalParams.where}`;
    if (finalParams.where === 'element')
        selector = '&';
    vars.push(`

        position: relative;
        transition: sugar.theme(ui.outline.transition);

        ${selector !== '&'
        ? `
             ${selector} {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.2);
            border-radius: sugar.theme(ui.outline.borderRadius);
            transition: sugar.theme(ui.outline.transition);
        }
        `
        : ''}
    `);
    if (finalParams.on.indexOf('focus') !== -1) {
        vars.push(`
            &:focus-visible {
                &:not(:hover):not(:active) {
                    ${selector} {
                        box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
                    }
                }
            }
        `);
    }
    if (finalParams.on.indexOf('hover') !== -1) {
        if (finalParams.where === 'element') {
            vars.push(`
                &:hover {
                    box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
                }
            `);
        }
        else {
            vars.push(`
                &:hover:${finalParams.where} {
                    box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
                }
            `);
        }
    }
    if (finalParams.on.indexOf('always') !== -1) {
        vars.push(`
            ${selector} {
                box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
            }
        `);
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm91dGxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFJckQsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZOztBQUM1RCx1REFBVSxHQUFHO0lBQ2hCLEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO1FBQ3BDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztLQUNyQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFDdEMsT0FBTyxFQUFFLE9BQU87S0FDbkI7Q0FDSixDQUFDO0FBRU4sT0FBTyxFQUFFLDRDQUE0QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBT3JFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFDdEIsS0FBSyxFQUFFLE9BQU8sSUFDWCxDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksUUFBUSxHQUFHLEtBQUssV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hDLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxTQUFTO1FBQUUsUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUVwRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztVQU1GLFFBQVEsS0FBSyxHQUFHO1FBQ1osQ0FBQyxDQUFDO2VBQ0gsUUFBUTs7Ozs7Ozs7O1NBU2Q7UUFDTyxDQUFDLENBQUMsRUFDVjtLQUNILENBQUMsQ0FBQztJQUVILElBQUksV0FBVyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQzs7O3NCQUdJLFFBQVE7Ozs7O1NBS3JCLENBQUMsQ0FBQztLQUNOO0lBRUQsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN4QyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7YUFJVCxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDSSxXQUFXLENBQUMsS0FBSzs7O2FBRzlCLENBQUMsQ0FBQztTQUNOO0tBQ0o7SUFFRCxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7Y0FDSixRQUFROzs7U0FHYixDQUFDLENBQUM7S0FDTjtJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=
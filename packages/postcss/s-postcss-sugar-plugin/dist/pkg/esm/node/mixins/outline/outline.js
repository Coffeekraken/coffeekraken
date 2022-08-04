import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginStateOutlineMixinInterface extends __SInterface {
    static get _definition() {
        return {
            where: {
                type: 'String',
                values: ['after', 'before', 'element'],
                default: 'after',
            },
        };
    }
}
export { postcssSugarPluginStateOutlineMixinInterface as interface };
/**
 * @name           outline
 * @namespace      node.mixin.outline
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a nice outline on any HTMLElement.
 * This outline will be display on hover and focus by default but can be displayed
 * always by passing the `on` parameter to `always` like so `@sugar.outline(always)`
 *
 *
 * @return      {Css}         The generated css
 *
 * @example        css
 * .myCoolItem {
 *      @sugar.outline();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                border-radius: sugar.border.radius(ui.outline.borderRadius);
                content: '';
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
            `
        : ''}
        }
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sNENBQTZDLFNBQVEsWUFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDO2dCQUN0QyxPQUFPLEVBQUUsT0FBTzthQUNuQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFNckU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsR0FBRyxnQkFDaEIsS0FBSyxFQUFFLE9BQU8sSUFDWCxDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksR0FBRyxHQUFHLEtBQUssV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ25DLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxTQUFTO1FBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUUvQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O1VBYUosR0FBRzs7OztjQUtHLFdBQVcsQ0FBQyxLQUFLLEtBQUssU0FBUztRQUMzQixDQUFDLENBQUM7Ozs7OzthQU1UO1FBQ08sQ0FBQyxDQUFDLEVBQ1Y7O0tBRVAsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9
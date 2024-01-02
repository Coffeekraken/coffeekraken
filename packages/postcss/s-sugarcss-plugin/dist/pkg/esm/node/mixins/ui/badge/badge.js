import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          badge
 * @as              @s.ui.badge
 * @namespace     node.mixin.ui.badge
 * @type          PostcssMixin
 * @interface       ./badge
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to generate the "badge" UI component css.
 *
 * @param       {'default'|'outline'}       [lnf='solid']]       The lnf you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.badge
 *
 * @example       css
 * .my-element {
 *      @s.ui.badge();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiBadgeInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid', 'outline'],
                default: __STheme.current.get('ui.badge.defaultLnf'),
            },
        };
    }
}
export { SSugarcssPluginUiBadgeInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid' }, params);
    const vars = [];
    vars.push(`   
        @s.scope 'bare' {
            display: inline-flex;
            align-items: center;
            line-height: 1;
            white-space: nowrap;
            user-select: none;
        }
    `);
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`
                font-size: s.scalable(0.75em);
                padding-inline: s.padding(20);
                padding-block: s.padding(10);
                vertical-align: baseline;
                font-weight: bold;
                text-rendering: optimizeLegibility;
                @s.shape();

                & > * {
                    @s.color(main);
                }
        `);
    switch (finalParams.lnf) {
        case 'outline':
            vars.push(`
                position: relative;
                color: s.color(current);
                background: none !important;
                text-shadow: none !important;
                
                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    border: s.color(current) solid 1px;
                    pointer-events: none;
                    @s.shape();
                }
            `);
            break;
        default:
            vars.push(`
                     color: s.color(current, foreground);
                     background-color: s.color(current);
                `);
            break;
    }
    vars.push(`}`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUVILE1BQU0sK0JBQWdDLFNBQVEsWUFBWTtJQUN0RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7Z0JBQzVCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzthQUN2RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsK0JBQStCLElBQUksU0FBUyxFQUFFLENBQUM7QUFDeEQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixHQUFHLEVBQUUsT0FBTyxJQUNULE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7O0tBUVQsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7OztTQVlMLENBQUMsQ0FBQztJQUVQLFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUNyQixLQUFLLFNBQVM7WUFDVixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OzthQWlCVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1Y7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7aUJBR0wsQ0FBQyxDQUFDO1lBQ1AsTUFBTTtLQUNiO0lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==
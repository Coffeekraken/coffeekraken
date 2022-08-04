import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           container
 * @namespace      node.mixin.container
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the css needed for a container depending
 * on the config.theme.container.container configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * .my-cool-container {
 *    \@sugar.container;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginContainerInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                required: true,
                default: 'default',
            },
        };
    }
}
export { postcssSugarPluginContainerInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ name: 'default' }, params);
    const vars = new CssVars();
    vars.code(`
        margin: 0 auto;
  `);
    const containerConfig = __STheme.get(`layout.container.${finalParams.name}`);
    if (!containerConfig) {
        throw new Error(`<red>[mixins.container]</red> Sorry but the requested "<yellow>${finalParams.name}</yellow>" does not exists in the "<cyan>config.theme.layout.container</cyan>" configuration`);
    }
    vars.code(`
        width: 100%;
        max-width: sugar.theme(layout.container.${finalParams.name});
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLFNBQVM7YUFDckI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTUQsT0FBTyxFQUFFLG9DQUFvQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTdELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxTQUFTLElBQ1osTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxJQUFJLENBQ0w7O0dBRUwsQ0FDRSxDQUFDO0lBRUYsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FDaEMsb0JBQW9CLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FDekMsQ0FBQztJQUVGLElBQUksQ0FBQyxlQUFlLEVBQUU7UUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FDWCxrRUFBa0UsV0FBVyxDQUFDLElBQUksOEZBQThGLENBQ25MLENBQUM7S0FDTDtJQUVELElBQUksQ0FBQyxJQUFJLENBQUM7O2tEQUVvQyxXQUFXLENBQUMsSUFBSTtLQUM3RCxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=
import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           container
 * @namespace      node.mixins.layout
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the css needed for a container depending
 * on the config.theme.layout.container configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-container {
 *    \@sugar.layout.container;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginLayoutContainerInterface extends __SInterface {
}
postcssSugarPluginLayoutContainerInterface.definition = {
    name: {
        type: 'String',
        required: true,
        default: 'default',
    },
};
export { postcssSugarPluginLayoutContainerInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ name: 'default' }, params);
    const vars = [
        `
    margin: auto;
  `,
    ];
    const containerConfig = __STheme.config(`layout.container.${finalParams.name}`);
    if (!containerConfig) {
        throw new Error(`<red>[mixins.layout.container]</red> Sorry but the requested "<yellow>${finalParams.name}</yellow>" does not exists in the "<cyan>config.theme.layout.container</cyan>" configuration`);
    }
    Object.keys(containerConfig).forEach((key) => {
        vars.push(`${key}: ${containerConfig[key]};`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUMxRCxxREFBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsU0FBUztLQUNyQjtDQUNKLENBQUM7QUFPTixPQUFPLEVBQUUsMENBQTBDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsU0FBUyxJQUNaLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDbkI7O0dBRUw7S0FDRSxDQUFDO0lBRUYsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FDbkMsb0JBQW9CLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FDekMsQ0FBQztJQUVGLElBQUksQ0FBQyxlQUFlLEVBQUU7UUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FDWCx5RUFBeUUsV0FBVyxDQUFDLElBQUksOEZBQThGLENBQzFMLENBQUM7S0FDTDtJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9
import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
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
        default: 'default'
    }
};
export { postcssSugarPluginLayoutContainerInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ name: 'default' }, params);
    const vars = [
        `
    margin: auto;
  `
    ];
    const containerConfig = __theme().config(`layout.container.${finalParams.name}`);
    if (!containerConfig) {
        throw new Error(`<red>[mixins.layout.container]</red> Sorry but the requested "<yellow>${finalParams.name}</yellow>" does not exists in the "<cyan>config.theme.layout.container</cyan>" configuration`);
    }
    Object.keys(containerConfig).forEach((key) => {
        vars.push(`${key}: ${containerConfig[key]};`);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLG1CQUFtQixDQUFDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUM1RCxxREFBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsU0FBUztLQUNuQjtDQUNGLENBQUM7QUFPSixPQUFPLEVBQUUsMENBQTBDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixJQUFJLEVBQUUsU0FBUyxJQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDckI7O0dBRUQ7S0FDQSxDQUFDO0lBRUYsTUFBTSxlQUFlLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLG9CQUFvQixXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUVqRixJQUFJLENBQUMsZUFBZSxFQUFFO1FBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMseUVBQXlFLFdBQVcsQ0FBQyxJQUFJLDhGQUE4RixDQUFDLENBQUM7S0FDMU07SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRCxDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           ratio
 * @namespace      node.mixins.ratio
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the css needed to apply a ratio on any HTMLElement.
 * It uses the :before technique.
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.ratio(16/9);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginRatioInterface extends __SInterface {
}
postcssSugarPluginRatioInterface.definition = {
    ratio: {
        type: 'Number',
        required: true,
        alias: 'd',
    },
};
export { postcssSugarPluginRatioInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ ratio: 1 }, params);
    const vars = [
        `
      aspect-ratio: ${finalParams.ratio};
  `,
    ];
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYXRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTs7QUFDaEQsMkNBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDYjtDQUNKLENBQUM7QUFPTixPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsQ0FBQyxJQUNMLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDbkI7c0JBQ2MsV0FBVyxDQUFDLEtBQUs7R0FDcEM7S0FDRSxDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9
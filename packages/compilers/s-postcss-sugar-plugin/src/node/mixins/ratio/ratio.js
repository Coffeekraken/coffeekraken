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
        alias: 'd'
    }
};
export { postcssSugarPluginRatioInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ ratio: 1 }, params);
    const vars = [
        `
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        display: block;
        box-sizing: content-box;
        width: 100%;
        height: 0;
        padding: 0 0 calc(100% / ${finalParams.ratio});
    }
    & > *:not([class*="s-align--"]) {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
    }
    & > img:not([class*="s-align--"]),
    & > video:not([class*="s-align--"]) {
      object-fit: cover;
    }
  `
    ];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYXRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTs7QUFDbEQsMkNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtDQUNGLENBQUM7QUFPSixPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsQ0FBQyxJQUNMLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDckI7Ozs7Ozs7Ozs7bUNBVStCLFdBQVcsQ0FBQyxLQUFLOzs7Ozs7Ozs7OztHQVdqRDtLQUNBLENBQUM7SUFFRixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9
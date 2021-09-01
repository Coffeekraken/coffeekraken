import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
/**
 * @name           classes
 * @namespace      node.mixins.scale
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the scale helper classes like s-scale:01, s-scale:12, etc.
 * The generated scales are specified in the config.theme.scale configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.scale.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginScaleClassesInterface extends __SInterface {
}
postcssSugarPluginScaleClassesInterface.definition = {};
export { postcssSugarPluginScaleClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const scaleObj = __theme().config('scale');
    const vars = [];
    Object.keys(scaleObj).forEach((scaleName) => {
        const scaleValue = scaleObj[scaleName];
        const scaleCss = `/**
  * @name          s-scale:${scaleName}
  * @namespace          sugar.css.scale
  * @type               CssClass
  * @platform             css
  * @status             beta
  * 
  * This class allows you to apply a "<yellow>${scaleName}</yellow>" scale style to any HTMLElement.
  * Note that this scale is not applied using the "transform" property but it will scale
  * all the properties that uses the function "sugar.scalable" to set his value.
  * 
  * @example        html
  * <h1 class="s-font\:40 s-mb\:30">I'm a cool title</h1>
  * <h1 class="s-font\:40 s-scale\:15">I'm a cool scaled title</h1>
  * 
  * since           2.0.0
  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  */
.s-scale--${scaleName} {
    --s-scale: ${scaleValue};
}`;
        vars.push(scaleCss);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN2RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUszQixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUzQyxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUN4QyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsTUFBTSxRQUFRLEdBQUc7NkJBQ0ksU0FBUzs7Ozs7O2dEQU1VLFNBQVM7Ozs7Ozs7Ozs7O1lBVzdDLFNBQVM7aUJBQ0osVUFBVTtFQUN6QixDQUFDO1FBQ0ssSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QixDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=
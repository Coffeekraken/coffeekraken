import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
/**
 * @name           classes
 * @as              @s.scale.classes
 * @namespace      node.mixin.scale
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the scale helper classes like s-scale:01, s-scale:12, etc.
 * The generated scales are specified in the config.theme.scale configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.scale.classes
 *
 * @example        css
 * \@s.scale.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginScaleClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginScaleClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const scaleObj = __STheme.get('scale');
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Scale
        * @namespace          sugar.style.helpers.scale
        * @type               Styleguide
        * @menu           Styleguide / Tools        /styleguide/tools/scale
        * @platform       css
        * @status       stable
        * 
        * These classes allows to apply a scale to any supported UI elements.
        * This scale does not use the transform property but increase actual values like \`padding\`,
        * \`margin\`, etc... In fact, all the properties setted with the \`sugar.scallable\` function.
        * It's usually a good practice to set the \`font-size\` of your UI element to \`s.scalable(1rem)\`
        * and then to set inner values using \`em\` unit.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@s.scale.classes;
        * 
        ${Object.keys(scaleObj)
        .map((scaleName) => {
        return ` * @cssClass     s-scale:${scaleName.replace('/', '-')}             Apply the ${scaleName} scale`;
    })
        .join('\n')}
        * 
        * @example        html
        ${Object.keys(scaleObj)
        .map((scaleName) => {
        return ` * <!-- ${scaleName} scale -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Scale ${scaleName}</h3>
            *   <div class="s-scale:${scaleName}">
            *       <a class="s-btn">${__faker.name.findName()}</a>
            *   </div>
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    Object.keys(scaleObj).forEach((scaleName) => {
        const scaleValue = scaleObj[scaleName];
        vars.comment(() => `/**
  * @name          s-scale:${scaleName}
  * @namespace          sugar.style.helpers.scale
  * @type               CssClass
  * @platform             css
  * @status             stable
  * 
  * This class allows you to apply a "<yellow>${scaleName}</yellow>" scale style to any HTMLElement.
  * Note that this scale is not applied using the "transform" property but it will scale
  * all the properties that uses the function "s.scalable" to set his value.
  * 
  * @example        html
  * <h1 class="s-font:40 s-mbe:30">I'm a cool title</h1>
  * <h1 class="s-font:40 s-scale:15">I'm a cool scaled title</h1>
  * 
  * since           2.0.0
  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
  */
 `).code(`
.s-scale-${scaleName} {
    --s-scale: ${scaleValue};
}`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXZDLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUF1QkosTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDbEIsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPLDRCQUE0QixTQUFTLENBQUMsT0FBTyxDQUNoRCxHQUFHLEVBQ0gsR0FBRyxDQUNOLDBCQUEwQixTQUFTLFFBQVEsQ0FBQztJQUNqRCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7VUFHYixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNsQixHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLE9BQU8sV0FBVyxTQUFTOzttRUFFd0IsU0FBUztzQ0FDdEMsU0FBUzt1Q0FDUixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7O2VBRy9DLENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtsQixDQUNBLENBQUM7SUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3hDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzZCQUNXLFNBQVM7Ozs7OztnREFNVSxTQUFTOzs7Ozs7Ozs7OztFQVd2RCxDQUNPLENBQUMsSUFBSSxDQUNGO1dBQ0QsU0FBUztpQkFDSCxVQUFVO0VBQ3pCLEVBQ1UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==
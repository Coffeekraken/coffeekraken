"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const faker_1 = __importDefault(require("faker"));
/**
 * @name           classes
 * @as              @sugar.scale.classes
 * @namespace      node.mixin.scale
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the scale helper classes like s-scale:01, s-scale:12, etc.
 * The generated scales are specified in the config.theme.scale configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.scale.classes
 *
 * @example        css
 * \@sugar.scale.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginScaleClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginScaleClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const scaleObj = s_theme_1.default.get('scale');
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Scale
        * @namespace          sugar.style.helpers.scale
        * @type               Styleguide
        * @menu           Styleguide / Tools        /styleguide/tools/scale
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply a scale to any supported UI elements.
        * This scale does not use the transform property but increase actual values like \`padding\`,
        * \`margin\`, etc... In fact, all the properties setted with the \`sugar.scallable\` function.
        * It's usually a good practice to set the \`font-size\` of your UI element to \`sugar.scalable(1rem)\`
        * and then to set inner values using \`em\` unit.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.scale.classes;
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
            *       <a class="s-btn">${faker_1.default.name.findName()}</a>
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
  * @status             beta
  * 
  * This class allows you to apply a "<yellow>${scaleName}</yellow>" scale style to any HTMLElement.
  * Note that this scale is not applied using the "transform" property but it will scale
  * all the properties that uses the function "sugar.scalable" to set his value.
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sdUNBQXdDLFNBQVEscUJBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJbUQsNERBQVM7QUFFN0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXZDLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUF1QkosTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDbEIsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPLDRCQUE0QixTQUFTLENBQUMsT0FBTyxDQUNoRCxHQUFHLEVBQ0gsR0FBRyxDQUNOLDBCQUEwQixTQUFTLFFBQVEsQ0FBQztJQUNqRCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7VUFHYixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNsQixHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLE9BQU8sV0FBVyxTQUFTOzttRUFFd0IsU0FBUztzQ0FDdEMsU0FBUzt1Q0FDUixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7O2VBRy9DLENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtsQixDQUNBLENBQUM7SUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3hDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzZCQUNXLFNBQVM7Ozs7OztnREFNVSxTQUFTOzs7Ozs7Ozs7OztFQVd2RCxDQUNPLENBQUMsSUFBSSxDQUNGO1dBQ0QsU0FBUztpQkFDSCxVQUFVO0VBQ3pCLEVBQ1UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUF4R0QsNEJBd0dDIn0=
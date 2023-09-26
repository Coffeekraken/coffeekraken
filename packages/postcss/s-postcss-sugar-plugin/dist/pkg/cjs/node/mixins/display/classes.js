"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const faker_1 = __importDefault(require("faker"));
/**
 * @name           classes
 * @as          @s.display.classes
 * @namespace      node.mixin.display
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the display helper classes like s-display:block, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.display.classes
 *
 * @example        css
 * \@s.display.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginDisplayClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginDisplayClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Display
        * @namespace          sugar.style.helpers.display
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/display
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply the some display like \`inline\`, \`inline-block\`, \`block\`, etc...
        * on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@s.display.classes;
        * 
        * @cssClass                 s-display:block           Apply the display \`block\` to any HTMLElement
        * @cssClass                 s-display:inline-block           Apply the display \`inline-block\` to any HTMLElement
        * @cssClass                 s-display:contents           Apply the display \`contents\` to any HTMLElement
        * @cssClass                 s-display:flex           Apply the display \`flex\` to any HTMLElement
        * @cssClass                 s-display:grid           Apply the display \`grid\` to any HTMLElement
        * @cssClass                 s-display:inline-flex           Apply the display \`inline-flex\` to any HTMLElement
        * @cssClass                 s-display:inline-grid           Apply the display \`inline-grid\` to any HTMLElement
        * @cssClass                 s-display:none           Apply the display \`none\` to any HTMLElement
        * 
        * @example    html      Block
        *   <div class="s-display:block">
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *   </div>
        * 
        * @example    html      Inline-block
        *   <div class="s-display:inline-block">
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *   </div>
        * 
        * @example   html      Contents
        *   <div class="s-display:contents">
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *   </div>
        * 
        * @example          html      Flex 
        *   <div class="s-display:flex">
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *   </div>
        * 
        * @example          html      Grid
        *   <div class="s-display:grid">
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *   </div>
        * 
        * @example          html      Inline-flex
        *   <div class="s-display:inline-flex">
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *   </div>
        * 
        * @example         html      Inline-grid
        *   <div class="s-display:inline-grid">
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *   </div>
        * 
        * @example     html      None
        *   <div class="s-display:none">
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *     <p class="s-typo:p">${faker_1.default.name.findName()}</p>
        *   </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `
        
      /**
       * @name            s-display:block
       * @namespace          sugar.style.helpers.display
       * @type            CssClass
       * @platform        css
       * @status          stable
       * 
       * This class allows you to apply the value "<yellow>block</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display\:block">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
    `).code(`
      .s-display-block{
          display: block !important;
      }
    `, { type: 'CssClass' });
    vars.comment(() => `
      /**
       * @name            s-display:inline-block
       * @namespace          sugar.style.helpers.display
       * @type            CssClass
       * @platform           css
       * @status               stable
       * 
       * This class allows you to apply the value "<yellow>inline-block</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display\:inline-block">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
    `).code(`
      .s-display-inline-block{
          display: inline-block !important;
      }
      `, { type: 'CssClass' });
    vars.comment(() => `
        /**
         * @name            s-display:contents
         * @namespace          sugar.style.helpers.display
         * @type            CssClass
         * @platform           css
         * @status               stable
         * 
         * This class allows you to apply the value "<yellow>contents</yellow>" to the display property on any HTMLElement
         * 
         * @example     html
         * <div class="s-display\:contents">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
    `).code(`
      .s-display-contents{
          display: contents !important;
      }
      `, { type: 'CssClass' });
    vars.comment(() => `
        /**
         * @name            s-display:flex
         * @namespace          sugar.style.helpers.display
         * @type            CssClass
         * @platform           css
         * @status               stable
         * 
         * This class allows you to apply the value "<yellow>flex</yellow>" to the display property on any HTMLElement
         * 
         * @example     html
         * <div class="s-display\:flex">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
    `).code(`
      .s-display-flex{
          display: flex !important;
      }
    `, { type: 'CssClass' });
    vars.comment(() => `
      /**
       * @name            s-display:grid
       * @namespace          sugar.style.helpers.display
       * @type            CssClass
       * @platform           css
       * @status               stable
       * 
       * This class allows you to apply the value "<yellow>grid</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display\:grid">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
      `).code(`
      .s-display-grid{
          display: grid !important;
      }
      `, { type: 'CssClass' });
    vars.comment(() => `
        /**
         * @name            s-display:inline-flex
         * @namespace          sugar.style.helpers.display
         * @type            CssClass
         * @platform           css
         * @status               stable
         * 
         * This class allows you to apply the value "<yellow>inline-flex</yellow>" to the display property on any HTMLElement
         * 
         * @example     html
         * <div class="s-display\:inline-flex">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
    `).code(`
      .s-display-inline-flex{
          display: inline-flex !important;
      }
      `, { type: 'CssClass' });
    vars.comment(() => `
        /**
         * @name            s-display:inline-grid
         * @namespace          sugar.style.helpers.display
         * @type            CssClass
         * @platform           css
         * @status               stable
         * 
         * This class allows you to apply the value "<yellow>inline-grid</yellow>" to the display property on any HTMLElement
         * 
         * @example     html
         * <div class="s-display\:inline-grid">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
    `).code(`
      .s-display-inline-grid{
          display: inline-grid !important;
      }
      `, { type: 'CssClass' });
    vars.comment(() => `
        /**
         * @name            s-display:none
         * @namespace          sugar.style.helpers.display
         * @type            CssClass
         * @platform           css
         * @status               stable
         * 
         * This class allows you to apply the value "<yellow>none</yellow>" to the display property on any HTMLElement
         * 
         * @example     html
         * <div class="s-display\:none">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `).code(`
      .s-display-none{
          display: none !important;
      }
      `, { type: 'CssClass' });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxrREFBNEI7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLHlDQUEwQyxTQUFRLHFCQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSXFELDhEQUFTO0FBRS9ELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBK0JzQixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQ0FDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0NBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7OztvQ0FLdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0NBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29DQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7b0NBS3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29DQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQ0FDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7O29DQUt2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQ0FDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0NBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7OztvQ0FLdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0NBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29DQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7b0NBS3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29DQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQ0FDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7O29DQUt2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQ0FDdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0NBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7OztvQ0FLdkIsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0NBQ3ZCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29DQUN2QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7O0tBTXRELENBQ0EsQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FtQlQsQ0FDQSxDQUFDLElBQUksQ0FDRjs7OztLQUlILEVBQ0csRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FrQlQsQ0FDQSxDQUFDLElBQUksQ0FDRjs7OztPQUlELEVBQ0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FrQlQsQ0FDQSxDQUFDLElBQUksQ0FDRjs7OztPQUlELEVBQ0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FrQlQsQ0FDQSxDQUFDLElBQUksQ0FDRjs7OztLQUlILEVBQ0csRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQlAsQ0FDRixDQUFDLElBQUksQ0FDRjs7OztPQUlELEVBQ0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FrQlQsQ0FDQSxDQUFDLElBQUksQ0FDRjs7OztPQUlELEVBQ0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FrQlQsQ0FDQSxDQUFDLElBQUksQ0FDRjs7OztPQUlELEVBQ0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FrQkwsQ0FDSixDQUFDLElBQUksQ0FDRjs7OztPQUlELEVBQ0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBdlZELDRCQXVWQyJ9
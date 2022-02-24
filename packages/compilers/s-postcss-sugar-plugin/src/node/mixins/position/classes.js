import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixins.position
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the position helper classes like s-position:absolute, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.position.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginPositionClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginPositionClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Positions
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/positions
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some positions like \`absolute\`, \`fixed\`, etc... on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass       s-position:absolute       Apply the \`absolute\` position
        * @cssClass       s-position:relative       Apply the \`relative\` position
        * @cssClass       s-position:fixed       Apply the \`fixed\` position
        * @cssClass       s-position:sticky       Apply the \`sticky\` position
        * @cssClass       s-position:top        Apply the \`top\` position to \`0\`
        * @cssClass       s-position:left        Apply the \`left\` position to \`0\`
        * @cssClass       s-position:right        Apply the \`right\` position to \`0\`
        * @cssClass       s-position:bottom        Apply the \`bottom\` position to \`0\`
        * @cssClass       s-position:center        Center the element either horizontally, vertically or both if no other alignement are specified
        * 
        * @example        html    Absolute
        *   <div class="s-position:relative s-ratio:16-9">
        *       <img class="s-position:absolute:top:left s-radius" src="https://picsum.photos/100/100?v=323333"/>
        *       <img class="s-position:absolute:top:center s-radius" src="https://picsum.photos/100/100?v=3232"/>
        *       <img class="s-position:absolute:top:right s-radius" src="https://picsum.photos/100/100?v=3222132"/>
        *       <img class="s-position:absolute:center:left s-radius" src="https://picsum.photos/100/100?v=322232"/>
        *       <img class="s-position:absolute:center s-radius" src="https://picsum.photos/100/100?v=3434"/>
        *       <img class="s-position:absolute:center:right s-radius" src="https://picsum.photos/100/100?v=35456232"/>
        *       <img class="s-position:absolute:bottom:left s-radius" src="https://picsum.photos/100/100?v=6566"/>
        *       <img class="s-position:absolute:bottom:center s-radius" src="https://picsum.photos/100/100?v=8787"/>
        *       <img class="s-position:absolute:bottom:right s-radius" src="https://picsum.photos/100/100?v=2323"/>
        *   </div>
        * 
        * @example        html        Relative
        *   <div class="s-position:relative s-ratio:21-9">
        *       <img class="s-position:relative" src="https://picsum.photos/100/100"/>
        *   </div>
        * 
        * @example        html        Fixed
        *   <div class="s-position:relative s-ratio:21-9">
        *       <img class="s-position:fixed:top:left s-radius" src="https://picsum.photos/100/100?v=323333"/>
        *       <img class="s-position:fixed:top:center s-radius" src="https://picsum.photos/100/100?v=3232"/>
        *       <img class="s-position:fixed:top:right s-radius" src="https://picsum.photos/100/100?v=3222132"/>
        *       <img class="s-position:fixed:center:left s-radius" src="https://picsum.photos/100/100?v=322232"/>
        *       <img class="s-position:fixed:center s-radius" src="https://picsum.photos/100/100?v=3434"/>
        *       <img class="s-position:fixed:center:right s-radius" src="https://picsum.photos/100/100?v=35456232"/>
        *       <img class="s-position:fixed:bottom:left s-radius" src="https://picsum.photos/100/100?v=6566"/>
        *       <img class="s-position:fixed:bottom:center s-radius" src="https://picsum.photos/100/100?v=8787"/>
        *       <img class="s-position:fixed:bottom:right s-radius" src="https://picsum.photos/100/100?v=2323"/>
        *   </div>
        * 
        * @example    html    Sticky
        *   <div class="s-position:relative s-ratio:21-9">
        *       <div class="s-position:sticky:top">
        *         <img class="s-mbs:100 s-radius" src="https://picsum.photos/100/100?v=323333"/>
        *     </div>
        *   </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `
        
      /**
       * @name            s-position:absolute
       * @namespace       sugar.css.position
       * @type            CssClass
       * @platform      css
       * @status        stable
       * 
       * This class allows you to apply the value "<yellow>absolute</yellow>" to the position property on any HTMLElement
       * 
       * @example     html
       * <div class="s-position:absolute">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
    `).code(`
      .s-position--absolute{
          position: absolute !important;
      }
      `);
    vars.comment(() => `

          /**
           * @name            s-position:relative
           * @namespace       sugar.css.position
           * @type            CssClass
           * @platform        css
           * @status          stable
           * 
           * This class allows you to apply the value "<yellow>relative</yellow>" to the position property on any HTMLElement
           * 
           * @example     html
           * <div class="s-position:relative">
           *  Hello world
           * </div>
           * 
           * @since       2.0.0
           * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
           */
        `).code(`
      .s-position--relative{
          position: relative !important;
      }
      `);
    vars.comment(() => `
          /**
           * @name            s-position:fixed
           * @namespace       sugar.css.position
           * @type            CssClass
           * @platform        css
           * @status          stable
           * 
           * This class allows you to apply the value "<yellow>fixed</yellow>" to the position property on any HTMLElement
           * 
           * @example     html
           * <div class="s-position:fixed">
           *  Hello world
           * </div>
           * 
           * @since       2.0.0
           * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
           */
        `).code(`
      .s-position--fixed{
          position: fixed !important;
      }
      `);
    vars.comment(() => `
        /**
         * @name            s-position::sticky
         * @namespace       sugar.css.mixins.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the value "<yellow>sticky</yellow>" to the position property on any HTMLElement
         * 
         * @example     html
         * <div class="s-position:sticky">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `).code(`
      .s-position--sticky{
          position: sticky !important;
      }
      `);
    vars.comment(() => `
        /**
         * @name            s-position:top
         * @namespace       sugar.css.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the top property to 0
         * 
         * @example     html
         * <div class="s-position:fixed:top">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `).code(`
      .s-position--top {
        top: 0;
      }
      `);
    vars.comment(() => `
        /**
         * @name            s-position:left
         * @namespace       sugar.css.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the left property to 0
         * 
         * @example     html
         * <div class="s-position:fixed:left">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `).code(`
      .s-position--left {
        left: 0;
      }
      `);
    vars.comment(() => `
        /**
         * @name            s-position:bottom
         * @namespace       sugar.css.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the bottom property to 0
         * 
         * @example     html
         * <div class="s-position:fixed:bottom">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `).code(`
      .s-position--bottom {
        bottom: 0;
      }
      `);
    vars.comment(() => `
      /**
         * @name            s-position:right
         * @namespace       sugar.css.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the right property to 0
         * 
         * @example     html
         * <div class="s-position:fixed:right">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `).code(`
      .s-position--right {
        right: 0;
      }
      `);
    vars.comment(() => `
      /**
         * @name            s-position:center
         * @namespace       sugar.css.position
         * @type            CssClass
         * @platform        css
         * @status          stable
         * 
         * This class allows you to apply the right property to 0
         * 
         * @example     html
         * <div class="s-position:fixed:right">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
      `).code(`
      .s-position--center:not(.s-position--top):not(.s-position--bottom):not(.s-position--left):not(.s-position--right) {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .s-position--center.s-position--left,
      .s-position--center.s-position--right {
        top: 50%;
        transform: translateY(-50%);
      }
      .s-position--center.s-position--top,
      .s-position--center.s-position--bottom {
        left: 50%;
        transform: translateX(-50%);
      }
      `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFJckQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLDBDQUEyQyxTQUFRLFlBQVk7SUFDakUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsMENBQTBDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FtRVQsQ0FDQSxDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW1CVCxDQUNBLENBQUMsSUFBSSxDQUFDOzs7O09BSUosQ0FBQyxDQUFDO0lBRUwsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQW1CTCxDQUNKLENBQUMsSUFBSSxDQUFDOzs7O09BSUosQ0FBQyxDQUFDO0lBRUwsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBa0JMLENBQ0osQ0FBQyxJQUFJLENBQUM7Ozs7T0FJSixDQUFDLENBQUM7SUFFTCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQlAsQ0FDRixDQUFDLElBQUksQ0FBQzs7OztPQUlKLENBQUMsQ0FBQztJQUVMLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCUCxDQUNGLENBQUMsSUFBSSxDQUFDOzs7O09BSUosQ0FBQyxDQUFDO0lBRUwsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JQLENBQ0YsQ0FBQyxJQUFJLENBQUM7Ozs7T0FJSixDQUFDLENBQUM7SUFFTCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQlAsQ0FDRixDQUFDLElBQUksQ0FBQzs7OztPQUlKLENBQUMsQ0FBQztJQUVMLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCUCxDQUNGLENBQUMsSUFBSSxDQUFDOzs7O09BSUosQ0FBQyxDQUFDO0lBRUwsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JQLENBQ0YsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkosQ0FBQyxDQUFDO0lBRUwsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9
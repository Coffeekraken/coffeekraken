import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixins.display
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the display helper classes like s-display:block, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.display.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginDisplayClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginDisplayClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Display
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/display
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply the some display like \`inline\`, \`inline-block\`, \`block\`, etc...
        * on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
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
        * @example        html
        * <!-- block -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Block</h3>
        *   <div class="s-display:block">
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *   </div>
        * </div>
        * <!-- inline-block -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Inline block</h3>
        *   <div class="s-display:inline-block">
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *   </div>
        * </div>
        * <!-- contents -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Contens</h3>
        *   <div class="s-display:contents">
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *   </div>
        * </div>
        * <!-- flex -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Flex</h3>
        *   <div class="s-display:flex">
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *   </div>
        * </div>
        * <!-- grid -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Grid</h3>
        *   <div class="s-display:grid">
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *   </div>
        * </div>
        * <!-- inline-flex -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Inline flex</h3>
        *   <div class="s-display:inline-flex">
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *   </div>
        * </div>
        * <!-- inline-grid -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Inline grid</h3>
        *   <div class="s-display:inline-grid">
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *   </div>
        * </div>
        * <!-- none -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">None</h3>
        *   <div class="s-display:none">
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *     <p class="s-typo:p">${__faker.name.findName()}</p>
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    vars.comment(() => `
        
      /**
       * @name            s-display:block
       * @namespace       sugar.css.display
       * @type            CssClass
       * @platform        css
       * @status          beta
       * 
       * This class allows you to apply the value "<yellow>block</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display\:block">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
    `).code(`
      .s-display--block{
          display: block !important;
      }
    `);
    vars.comment(() => `
      /**
       * @name            s-display:inline-block
       * @namespace       sugar.css.display
       * @type            CssClass
       * @platform           css
       * @status               beta
       * 
       * This class allows you to apply the value "<yellow>inline-block</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display\:inline-block">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
    `).code(`
      .s-display--inline-block{
          display: inline-block !important;
      }
      `);
    vars.comment(() => `
        /**
         * @name            s-display:contents
         * @namespace       sugar.css.display
         * @type            CssClass
         * @platform           css
         * @status               beta
         * 
         * This class allows you to apply the value "<yellow>contents</yellow>" to the display property on any HTMLElement
         * 
         * @example     html
         * <div class="s-display\:contents">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
    `).code(`
      .s-display--contents{
          display: contents !important;
      }
      `);
    vars.comment(() => `
        /**
         * @name            s-display:flex
         * @namespace       sugar.css.display
         * @type            CssClass
         * @platform           css
         * @status               beta
         * 
         * This class allows you to apply the value "<yellow>flex</yellow>" to the display property on any HTMLElement
         * 
         * @example     html
         * <div class="s-display\:flex">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
    `).code(`
      .s-display--flex{
          display: flex !important;
      }
    `);
    vars.comment(() => `
      /**
       * @name            s-display:grid
       * @namespace       sugar.css.display
       * @type            CssClass
       * @platform           css
       * @status               beta
       * 
       * This class allows you to apply the value "<yellow>grid</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display\:grid">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      `).code(`
      .s-display--grid{
          display: grid !important;
      }
      `);
    vars.comment(() => `
        /**
         * @name            s-display:inline-flex
         * @namespace       sugar.css.display
         * @type            CssClass
         * @platform           css
         * @status               beta
         * 
         * This class allows you to apply the value "<yellow>inline-flex</yellow>" to the display property on any HTMLElement
         * 
         * @example     html
         * <div class="s-display\:inline-flex">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
    `).code(`
      .s-display--inline-flex{
          display: inline-flex !important;
      }
      `);
    vars.comment(() => `
        /**
         * @name            s-display:inline-grid
         * @namespace       sugar.css.display
         * @type            CssClass
         * @platform           css
         * @status               beta
         * 
         * This class allows you to apply the value "<yellow>inline-grid</yellow>" to the display property on any HTMLElement
         * 
         * @example     html
         * <div class="s-display\:inline-grid">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
    `).code(`
      .s-display--inline-grid{
          display: inline-grid !important;
      }
      `);
    vars.comment(() => `
        /**
         * @name            s-display:none
         * @namespace       sugar.css.display
         * @type            CssClass
         * @platform           css
         * @status               beta
         * 
         * This class allows you to apply the value "<yellow>none</yellow>" to the display property on any HTMLElement
         * 
         * @example     html
         * <div class="s-display\:none">
         *  Hello world
         * </div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        `).code(`
      .s-display--none{
          display: none !important;
      }
      `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLHlDQUF5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWxFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQStCc0IsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0NBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29DQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztvQ0FPdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0NBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29DQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztvQ0FPdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0NBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29DQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztvQ0FPdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0NBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29DQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztvQ0FPdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0NBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29DQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztvQ0FPdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0NBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29DQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztvQ0FPdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0NBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29DQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztvQ0FPdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7b0NBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29DQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztLQU90RCxDQUNBLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJULENBQ0EsQ0FBQyxJQUFJLENBQUM7Ozs7S0FJTixDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FrQlQsQ0FDQSxDQUFDLElBQUksQ0FBQzs7OztPQUlKLENBQUMsQ0FBQztJQUVMLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWtCVCxDQUNBLENBQUMsSUFBSSxDQUFDOzs7O09BSUosQ0FBQyxDQUFDO0lBRUwsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBa0JULENBQ0EsQ0FBQyxJQUFJLENBQUM7Ozs7S0FJTixDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQlAsQ0FDRixDQUFDLElBQUksQ0FBQzs7OztPQUlKLENBQUMsQ0FBQztJQUVMLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWtCVCxDQUNBLENBQUMsSUFBSSxDQUFDOzs7O09BSUosQ0FBQyxDQUFDO0lBRUwsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBa0JULENBQ0EsQ0FBQyxJQUFJLENBQUM7Ozs7T0FJSixDQUFDLENBQUM7SUFFTCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FrQkwsQ0FDSixDQUFDLElBQUksQ0FBQzs7OztPQUlKLENBQUMsQ0FBQztJQUVMLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==
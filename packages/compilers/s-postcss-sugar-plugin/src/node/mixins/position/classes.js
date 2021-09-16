import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixins.position
 * @type           PostcssMixin
 * @platform      css
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginPositionClassesInterface extends __SInterface {
}
postcssSugarPluginPositionClassesInterface.definition = {};
export { postcssSugarPluginPositionClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`
      /**
        * @name          Positions
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/positions
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some positions like absolute, fixed, etc... on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass       s-position:absolute       Apply the absolute position
        * @cssClass       s-position:relative       Apply the relative position
        * @cssClass       s-position:fixed       Apply the fixed position
        * @cssClass       s-position:sticky       Apply the sticky position
        * @cssClass       s-position:top        Apply the top position to 0
        * @cssClass       s-position:left        Apply the left position to 0
        * @cssClass       s-position:right        Apply the right position to 0
        * @cssClass       s-position:bottom        Apply the bottom position to 0
        * 
        * @example        html
        * <div class="s-mb\:50">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">Absolute position</h3>
        *   <div class="s-position\:relative s-ratio\:16-9">
        *       <img class="s-position\:absolute\:bottom" src="https://picsum.photos/100/100"/>
        *   </div>
        * </div>
        * 
        * <div class="s-mb\:50">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">Relative position</h3>
        *   <div class="s-position\:relative s-ratio\:16-9">
        *       <img class="s-position\:relative" src="https://picsum.photos/100/100"/>
        *   </div>
        * </div>
        * 
        * <div class="s-mb\:50">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">Fixed position</h3>
        *   <div class="s-position\:relative s-ratio\:16-9">
        *       <img class="s-position\:fixed\:right" style="top:25%" src="https://picsum.photos/100/100"/>
        *   </div>
        * </div>
        * 
        * <div class="s-mb\:50">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">Sticky position</h3>
        *   <div class="s-position\:relative s-ratio\:16-9">
        *       <img class="s-position\:sticky" style="top:100px" src="https://picsum.photos/100/100"/>
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    vars.push(`
        
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
       * <div class="s-position\:absolute">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-position--absolute{
          position: absolute !important;
      }

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
       * <div class="s-position\:relative">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-position--relative{
          position: relative !important;
      }

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
       * <div class="s-position\:fixed">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-position--fixed{
          position: fixed !important;
      }

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
       * <div class="s-position\:sticky">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-position--sticky{
          position: sticky !important;
      }

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
       * <div class="s-position\:fixed\:top">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-position--top{
        top: 0;
      }

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
       * <div class="s-position\:fixed\:left">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-position--left{
        left: 0;
      }

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
       * <div class="s-position\:fixed\:bottom">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-position--bottom{
        bottom: 0;
      }

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
       * <div class="s-position\:fixed\:right">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-position--right{
        right: 0;
      }

  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFJckQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLDBDQUEyQyxTQUFRLFlBQVk7O0FBQzFELHFEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSzNCLE9BQU8sRUFBRSwwQ0FBMEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVuRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXlEVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBLWCxDQUFDLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9
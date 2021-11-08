import __SInterface from '@coffeekraken/s-interface';
/**
 * @name          classes
 * @namespace     node.mixins.align
 * @type          PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate the align helper classes
 *
 * @return      {Css}                   The generated css
 *
 * @example       css
 * @sugar.align.classes;
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginAlignClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginAlignClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const aligns = [
        'abs-left',
        'abs-right',
        'abs-top',
        'abs-top-left',
        'abs-top-center',
        'abs-top-right',
        'abs-center',
        'abs-center-left',
        'abs-center-right',
        'abs-bottom',
        'abs-bottom-left',
        'abs-bottom-center',
        'abs-bottom-right',
    ];
    vars.push(`
      /**
        * @name          Align
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/align
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to align things to \`left\`, \`right\`, \`center\`, etc...  on any HTMLElement
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${aligns.map((align) => {
        return `* @cssClass             s-align:${align}             Align the item to ${align.replace('-', ' ')}`;
    })}
        *
        * @example        html
        ${aligns
        .map((align) => {
        return ` * <!-- align ${align} -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Align to ${align}</h3>
            *   <div class="s-position:relative s-ratio:21-9 s-bg:main">
            *       <div class="s-ratio:16-9 s-width:10 s-bg:accent s-align:${align}"></div>
            *   </div>
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    vars.push(`
        
    /**
     * @name            s-align:abs-top
     * @namespace       sugar.css.align
     * @type            CssClass
     * @platform        css
     * @status          beta
     * 
     * This class allows you to align an element using the absolute method
     * to the top
     * 
     * @example     html
     * <div class="s-ratio--1-1">
     *      <div class="s-align:abs-top">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-top {
        @sugar.align.abs(top);
    }

    /**
     * @name            s-align:abs-left
     * @namespace       sugar.css.align
     * @type            CssClass
     * @platform        css
     * @status          beta
     * 
     * This class allows you to align an element using the absolute method
     * to the left
     * 
     * @example     html
     * <div class="s-ratio--1-1">
     *      <div class="s-align:abs-left">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-left {
        @sugar.align.abs(left);
    }

    /**
     * @name            s-align:abs-right
     * @namespace       sugar.css.align
     * @type            CssClass
     * @platform        css
     * @status          beta
     * 
     * This class allows you to align an element using the absolute method
     * to the right
     * 
     * @example     html
     * <div class="s-ratio--1-1">
     *      <div class="s-align:abs-right">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-right {
        @sugar.align.abs(right);
    }

    /**
     * @name            s-align:abs-bottom
     * @namespace       sugar.css.align
     * @type            CssClass
     * @platform        css
     * @status          beta
     * 
     * This class allows you to align an element using the absolute method
     * to the bottom
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align:abs-bottom">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-bottom {
        @sugar.align.abs(bottom);
    }

    /**
     * @name            s-align:abs-center
     * @namespace       sugar.css.align
     * @type            CssClass
     * @platform        css
     * @status          beta
     * 
     * This class allows you to align an element using the absolute method
     * to the center
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align:abs-center">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-center {
        @sugar.align.abs(center);
    }

    /**
     * @name            s-align:abs-top-left
     * @namespace       sugar.css.align
     * @type            CssClass
     * @platform        css
     * @status          beta
     * 
     * This class allows you to align an element using the absolute method
     * to the top-left
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align:abs-top-left">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-top-left {
        @sugar.align.abs(top left);
    }

    /**
     * @name            s-align:abs-top-center
     * @namespace       sugar.css.align
     * @type            CssClass
     * @platform        css
     * @status          beta
     * 
     * This class allows you to align an element using the absolute method
     * to the top-center
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align:abs-top-center">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-top-center {
        @sugar.align.abs(top center-x);
    }

    /**
     * @name            s-align:abs-top-right
     * @namespace       sugar.css.align
     * @type            CssClass
     * @platform        css
     * @status          beta
     * 
     * This class allows you to align an element using the absolute method
     * to the top-right
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align:abs-top-right">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-top-right {
        @sugar.align.abs(top right);
    }

    /**
     * @name            s-align:abs-center-left
     * @namespace       sugar.css.align
     * @type            CssClass
     * @platform        css
     * @status          beta
     * 
     * This class allows you to align an element using the absolute method
     * to the center-y and left
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align:abs-center-left">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-center-left {
        @sugar.align.abs(left center-y);
    }

    /**
     * @name            s-align:abs-center-right
     * @namespace       sugar.css.align
     * @type            CssClass
     * @platform        css
     * @status          beta
     * 
     * This class allows you to align an element using the absolute method
     * to the center-y and right
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align:abs-center-right">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-center-right {
        @sugar.align.abs(right center-y);
    }

    /**
     * @name            s-align:abs-bottom-left
     * @namespace       sugar.css.align
     * @type            CssClass
     * @platform        css
     * @status          beta
     * 
     * This class allows you to align an element using the absolute method
     * to the bottom left
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align:abs-bottom-left">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-bottom-left {
        @sugar.align.abs(bottom left);
    }

    /**
     * @name            s-align:abs-bottom-center
     * @namespace       sugar.css.align
     * @type            CssClass
     * @platform        css
     * @status          beta
     * 
     * This class allows you to align an element using the absolute method
     * to the bottom center-x
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align:abs-bottom-center">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-bottom-center {
        @sugar.align.abs(bottom center-x);
    }

    /**
     * @name            s-align:abs-bottom-right
     * @namespace       sugar.css.align
     * @type            CssClass
     * @platform        css
     * @status          beta
     * 
     * This class allows you to align an element using the absolute method
     * to the bottom right
     * 
     * @example     html
     * <div class="s-ratio-1-1">
     *      <div class="s-align:abs-bottom-right">Hello world</div>
     * </div>
     * 
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    .s-align--abs-bottom-right {
        @sugar.align.abs(bottom right);
    }

  `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUMxQixNQUFNLE1BQU0sR0FBRztRQUNYLFVBQVU7UUFDVixXQUFXO1FBQ1gsU0FBUztRQUNULGNBQWM7UUFDZCxnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLFlBQVk7UUFDWixpQkFBaUI7UUFDakIsa0JBQWtCO1FBQ2xCLFlBQVk7UUFDWixpQkFBaUI7UUFDakIsbUJBQW1CO1FBQ25CLGtCQUFrQjtLQUNyQixDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztVQWdCSixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDbkIsT0FBTyxtQ0FBbUMsS0FBSyxrQ0FBa0MsS0FBSyxDQUFDLE9BQU8sQ0FDMUYsR0FBRyxFQUNILEdBQUcsQ0FDTixFQUFFLENBQUM7SUFDUixDQUFDLENBQUM7OztVQUdBLE1BQU07U0FDSCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNYLE9BQU8saUJBQWlCLEtBQUs7O3NFQUV5QixLQUFLOzs4RUFFRyxLQUFLOzs7ZUFHcEUsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS2xCLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdTWCxDQUFDLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=
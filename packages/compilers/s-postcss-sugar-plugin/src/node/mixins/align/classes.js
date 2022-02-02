import __SInterface from '@coffeekraken/s-interface';
/**
 * @name          classes
 * @namespace     node.mixins.align
 * @type          PostcssMixin
 * @platform      postcss
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
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
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
    vars.comment(() => `
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
            ${aligns
        .map((align) => {
        return ` * @example        html        ${align}
                *   <div class="s-position:relative s-ratio:21-9 s-bg:main">
                *       <div class="s-ratio:16-9 s-width:10 s-bg:accent s-align:${align}"></div>
                *   </div>
                * `;
    })
        .join('\n')}
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
    `);
    vars.comment(() => `  
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
    `);
    vars.code(`
        .s-align--abs-top {
            @sugar.align.abs(top);
        }
    `);
    vars.comment(() => `
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
    `);
    vars.code(`
        .s-align--abs-left {
            @sugar.align.abs(left);
        }
    `);
    vars.comment(() => `
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
    `);
    vars.code(`
        .s-align--abs-right {
            @sugar.align.abs(right);
        }
    `);
    vars.comment(() => `
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
    `);
    vars.code(`
        .s-align--abs-bottom {
            @sugar.align.abs(bottom);
        }
    `);
    vars.comment(() => `
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
    `);
    vars.code(`
        .s-align--abs-center {
            @sugar.align.abs(center);
        }
    `);
    vars.comment(() => `
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
    `);
    vars.code(`
        .s-align--abs-top-left {
            @sugar.align.abs(top left);
        }
    `);
    vars.comment(() => `
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
    `);
    vars.code(`
        .s-align--abs-top-center {
            @sugar.align.abs(top center-x);
        }
    `);
    vars.comment(() => `
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
    `);
    vars.code(`
        .s-align--abs-top-right {
            @sugar.align.abs(top right);
        }
    `);
    vars.comment(() => `
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
    `);
    vars.code(`
        .s-align--abs-center-left {
            @sugar.align.abs(left center-y);
        }
    `);
    vars.comment(() => `
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
    `);
    vars.code(`
        .s-align--abs-center-right {
            @sugar.align.abs(right center-y);
        }
    `);
    vars.comment(() => `
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
    `);
    vars.code(`
        .s-align--abs-bottom-left {
            @sugar.align.abs(bottom left);
        }
    `);
    vars.comment(() => `
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
    `);
    vars.code(`
        .s-align--abs-bottom-center {
            @sugar.align.abs(bottom center-x);
        }
    `);
    vars.comment(() => `
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
    `);
    vars.code(`
        .s-align--abs-bottom-right {
            @sugar.align.abs(bottom right);
        }
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sTUFBTSxHQUFHO1FBQ1gsVUFBVTtRQUNWLFdBQVc7UUFDWCxTQUFTO1FBQ1QsY0FBYztRQUNkLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YsWUFBWTtRQUNaLGlCQUFpQjtRQUNqQixrQkFBa0I7UUFDbEIsWUFBWTtRQUNaLGlCQUFpQjtRQUNqQixtQkFBbUI7UUFDbkIsa0JBQWtCO0tBQ3JCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O2NBZ0JBLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNuQixPQUFPLG1DQUFtQyxLQUFLLGtDQUFrQyxLQUFLLENBQUMsT0FBTyxDQUMxRixHQUFHLEVBQ0gsR0FBRyxDQUNOLEVBQUUsQ0FBQztJQUNSLENBQUMsQ0FBQzs7Y0FFQSxNQUFNO1NBQ0gsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLGtDQUFrQyxLQUFLOztrRkFFZ0IsS0FBSzs7bUJBRXBFLENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUt0QixDQUNBLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJULENBQ0EsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJULENBQ0EsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJULENBQ0EsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJULENBQ0EsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJULENBQ0EsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJULENBQ0EsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJULENBQ0EsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJULENBQ0EsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJULENBQ0EsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJULENBQ0EsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJULENBQ0EsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJULENBQ0EsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJULENBQ0EsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=
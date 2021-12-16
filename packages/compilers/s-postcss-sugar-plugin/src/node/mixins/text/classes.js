import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixins.text
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the text helper classes like s-text:center, s-text:left, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.text.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginTextClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginTextClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Text
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/scale
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some text styling like \`text-align: left\`, \`text-align: right\`, \`text-decoration: underline\`, etc...
        * directly inside your HTML.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass             s-text:left             Align the text to the left
        * @cssClass             s-text:right             Align the text to the right
        * @cssClass             s-text:center             Align the text to the center
        * @cssClass             s-text:start             Align the text to the start (rtl aware)
        * @cssClass             s-text:end             Align the text to the end (rtl aware)
        * @cssClass             s-text:justify             Align the text to the justify
        * @cssClass             s-text:overline             Apply the overline text decoration
        * @cssClass             s-text:line-through             Apply the line-through text decoration
        * @cssClass             s-text:underline             Apply the underline text decoration
        * @cssClass             s-text:lowercase             Apply the lowercase text transform
        * @cssClass             s-text:uppercase             Apply the uppercase text transform
        * @cssClass             s-text:capitalize             Apply the capitalize text transform
        * 
        * @example        html
        * <!-- align -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Aligns</h3>
        *   <div class="s-text:left s-bg:main s-p:20 s-mbe:20">
        *       (left) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:right s-bg:main s-p:20 s-mbe:20">
        *       (right) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:center s-bg:main s-p:20 s-mbe:20">
        *       (center) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:start s-bg:main s-p:20 s-mbe:20">
        *       (start) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:end s-bg:main s-p:20 s-mbe:20">
        *       (end) ${__faker.name.findName()}
        *   </div>
        * </div>
        * 
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Decorations</h3>
        *   <div class="s-text:overline s-bg:main s-p:20 s-mbe:20">
        *       (overline) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:underline s-bg:main s-p:20 s-mbe:20">
        *       (underline) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:line-through s-bg:main s-p:20 s-mbe:20">
        *       (line-through) ${__faker.name.findName()}
        *   </div>
        * </div>
        * 
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Transforms</h3>
        *   <div class="s-text:lowercase s-bg:main s-p:20 s-mbe:20">
        *       (lowercase) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:uppercase s-bg:main s-p:20 s-mbe:20">
        *       (uppercase) ${__faker.name.findName()}
        *   </div>
        *   <div class="s-text:capitalize s-bg:main s-p:20 s-mbe:20">
        *       (capitalize) ${__faker.name.findName()}
        *   </div>
        * </div>
        * 
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    // align
    vars.comment(() => `
        /**
         * @name            s-text:left
         * @namespace       sugar.css.mixins.text
         * @type            CssClass
         * @platform      postcss
         * @status        beta
         * 
         * This class allows you to align text to the left side
         * 
         * @example     html
         * <div class="s-text:left">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
    `).code(`
        .s-text--left {
            text-align: left;
        }
        `);
    vars.comment(() => `
       /**
         * @name            s-text:right
         * @namespace       sugar.css.mixins.text
         * @type            CssClass
         * @platform      postcss
         * @status        beta
         * 
         * This class allows you to align text to the right side
         * 
         * @example     html
         * <div class="s-text:right">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        `).code(`
        .s-text--right {
            text-align: right;
        }
        `);
    vars.comment(() => `
        /**
         * @name            s-text:center
         * @namespace       sugar.css.mixins.text
         * @type            CssClass
         * @platform      postcss
         * @status        beta
         * 
         * This class allows you to align text to the center
         * 
         * @example     html
         * <div class="s-text:center">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
         `).code(`
        .s-text--center {
            text-align: center;
        }
        `);
    vars.comment(() => `
           /**
         * @name            s-text:start
         * @namespace       sugar.css.mixins.text
         * @type            CssClass
         * @platform      postcss
         * @status        beta
         * 
         * This class allows you to align text to the start (left) side, (right) when rtl
         * 
         * @example     html
         * <div class="s-text:start">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        `).code(`
        .s-text--start {
            text-align: start;
        }
        `);
    vars.comment(() => `
          /**
         * @name            s-text:end
         * @namespace       sugar.css.mixins.text
         * @type            CssClass
         * @platform      postcss
         * @status        beta
         * 
         * This class allows you to align text to the end (right) side, (left) when rtl
         * 
         * @example     html
         * <div class="s-text:end">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        `).code(`
        .s-text--end {
            text-align: end;
        }
        `);
    vars.comment(() => `
         /**
         * @name            s-text:justify
         * @namespace       sugar.css.mixins.text
         * @type            CssClass
         * @platform      postcss
         * @status        beta
         * 
         * This class allows you to justify the text
         * 
         * @example     html
         * <div class="s-text:justify">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        `).code(`
        .s-text--justify {
            text-align: justify;
        }
        `);
    vars.comment(() => `
        /**
         * @name            s-text:overline
         * @namespace       sugar.css.mixins.text
         * @type            CssClass
         * @platform      postcss
         * @status        beta
         * 
         * This class allows you to overline the text
         * 
         * @example     html
         * <div class="s-text:overline">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        `).code(`
        .s-text--overline {
            text-decoration: overline;
        }
        `);
    vars.comment(() => `
        /**
         * @name            s-text:underline
         * @namespace       sugar.css.mixins.text
         * @type            CssClass
         * @platform      postcss
         * @status        beta
         * 
         * This class allows you to underline the text
         * 
         * @example     html
         * <div class="s-text:underline">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        `).code(`
        .s-text--underline {
            text-decoration: underline;
        }
        `);
    vars.comment(() => `
        /**
         * @name            s-text:line-through
         * @namespace       sugar.css.mixins.text
         * @type            CssClass
         * @platform      postcss
         * @status        beta
         * 
         * This class allows you to line-through the text
         * 
         * @example     html
         * <div class="s-text:line-through">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        `).code(`
        .s-text--line-through {
            text-decoration: line-through;
        }
        `);
    vars.comment(() => `
        /**
         * @name            s-text:lowercase
         * @namespace       sugar.css.mixins.text
         * @type            CssClass
         * @platform      postcss
         * @status        beta
         * 
         * This class allows you to lowercase the text
         * 
         * @example     html
         * <div class="s-text:lowercase">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        `).code(`
        .s-text--lowercase {
            text-transform: lowercase;
        }
        `);
    vars.comment(() => `
        /**
         * @name            s-text:uppercase
         * @namespace       sugar.css.mixins.text
         * @type            CssClass
         * @platform      postcss
         * @status        beta
         * 
         * This class allows you to uppercase the text
         * 
         * @example     html
         * <div class="s-text:uppercase">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        `).code(`
        .s-text--uppercase {
            text-transform: uppercase;
        }
        `);
    vars.comment(() => `
        /**
         * @name            s-text:capitalize
         * @namespace       sugar.css.mixins.text
         * @type            CssClass
         * @platform      postcss
         * @status        beta
         * 
         * This class allows you to capitalize the text
         * 
         * @example     html
         * <div class="s-text:capitalize">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        `).code(`
        .s-text--capitalize {
            text-transform: capitalize;
        }
        `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLHNDQUFzQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU9kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkFtQ1csT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7OzswQkFHdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7OzsyQkFHdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7OzswQkFHeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozt3QkFHekIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7NkJBT2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7OEJBR3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7aUNBR3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7OzhCQU8xQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OzhCQUd2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7OytCQUd0QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7S0FRakQsQ0FDQSxDQUFDO0lBRUYsUUFBUTtJQUNSLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQlQsQ0FDQSxDQUFDLElBQUksQ0FBQzs7OztTQUlGLENBQUMsQ0FBQztJQUVQLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQkwsQ0FDSixDQUFDLElBQUksQ0FBQzs7OztTQUlGLENBQUMsQ0FBQztJQUVQLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7VUFnQkosQ0FDTCxDQUFDLElBQUksQ0FBQzs7OztTQUlGLENBQUMsQ0FBQztJQUVQLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQkwsQ0FDSixDQUFDLElBQUksQ0FBQzs7OztTQUlGLENBQUMsQ0FBQztJQUVQLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQkwsQ0FDSixDQUFDLElBQUksQ0FBQzs7OztTQUlGLENBQUMsQ0FBQztJQUVQLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQkwsQ0FDSixDQUFDLElBQUksQ0FBQzs7OztTQUlGLENBQUMsQ0FBQztJQUVQLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQkwsQ0FDSixDQUFDLElBQUksQ0FBQzs7OztTQUlGLENBQUMsQ0FBQztJQUVQLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQkwsQ0FDSixDQUFDLElBQUksQ0FBQzs7OztTQUlGLENBQUMsQ0FBQztJQUVQLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQkwsQ0FDSixDQUFDLElBQUksQ0FBQzs7OztTQUlGLENBQUMsQ0FBQztJQUVQLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQkwsQ0FDSixDQUFDLElBQUksQ0FBQzs7OztTQUlGLENBQUMsQ0FBQztJQUVQLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQkwsQ0FDSixDQUFDLElBQUksQ0FBQzs7OztTQUlGLENBQUMsQ0FBQztJQUVQLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQkwsQ0FDSixDQUFDLElBQUksQ0FBQzs7OztTQUlGLENBQUMsQ0FBQztJQUVQLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==
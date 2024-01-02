import __SInterface from '@coffeekraken/s-interface';
/**
 * @name          classes
 * @as          @s.ui.dropdown.classes
 * @namespace     node.mixin.ui.dropdown
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the dropdown classes
 *
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       positiion       Position css
 *
 * @snippet         @s.ui.dropdown.classes
 *
 * @example     css
 * @s.ui.dropdown.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiDropdownClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginUiDropdownClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Dropdown
        * @namespace          sugar.style.ui.dropdown
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/dropdown
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice dropdown on buttons or whatever
        *
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.ui.dropdown.classes;
        * 
        * .my-dropdown {
        *   @s.ui.dropdown;
        * }
        * 
        * @cssClass             s-dropdown-container        The container of the dropdown that will trigger the display, hide, etc...
        * @cssClass             s-dropdown                  Apply the dropdown styling
        * @cssClass       s-dropdown:bottom      Apply the bottom dropdown position
        * @cssClass       s-dropdown:bottom-start        Apply the bottom start dropdown position
        * @cssClass       s-dropdown:bottom-end        Apply the bottom end dropdown position
        * @cssClass       s-dropdown:top        Apply the top dropdown position
        * @cssClass       s-dropdown:top-start        Apply the top start dropdown position
        * @cssClass       s-dropdown:top-end        Apply the top end dropdown position
        * 
        * @example        html       Simple dropdown
        * <div class="s-dropdown-container">
        *   <button class="s-btn">
        *      Click me!
        *   </button>
        *   <div class="s-dropdown:bottom-start">
        *      <p class="s-typo:p s-mbe:30">
        *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
        *       </p>
        *      <a class="s-btn">You find me!</a>
        *   </div>
        * </div>
        * 
        * @example        html       Position
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn">
        *       Bottom (default)
        *   </button>
        *   <div class="s-dropdown">
        *       <p class="s-typo:p s-mbe:30">
        *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
        *       </p>
        *          <a class="s-btn">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn">
        *       Bottom
        *   </button>
        *   <div class="s-dropdown:bottom">
        *       <p class="s-typo:p s-mbe:30">
        *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
        *       </p>
        *          <a class="s-btn">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn">
        *       Bottom end
        *   </button>
        *   <div class="s-dropdown:bottom-end">
        *          <p class="s-typo:p s-mbe:30">
        *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
        *       </p>
        *          <a class="s-btn">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn">
        *       Top
        *   </button>
        *   <div class="s-dropdown:top">
        *          <p class="s-typo:p s-mbe:30">
        *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
        *       </p>
        *          <a class="s-btn">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn">
        *       Top start
        *   </button>
        *   <div class="s-dropdown:top-start">
        *          <p class="s-typo:p s-mbe:30">
        *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
        *       </p>
        *          <a class="s-btn">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20">
        *   <button class="s-btn">
        *      Top end
        *   </button>
        *   <div class="s-dropdown:top-end">
        *          <p class="s-typo:p s-mbe:30">
        *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
        *       </p>
        *          <a class="s-btn">You find me!</a>
        *       </div>
        * </div>
        * 
        * @example      html        RTL Support
        *  <div class="s-dropdown-container s-mie:20" dir="rtl">
        *   <button class="s-btn">
        *       Click me!
        *   </button>
        *   <div class="s-dropdown">
        *          <p class="s-typo:p s-mbe:30">
        *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
        *       </p>
        *          <a class="s-btn">You find me!</a>
        *       </div>
        * </div>
        *  <div class="s-dropdown-container s-mie:20" dir="rtl">
        *   <button class="s-btn">
        *       Top start
        *   </button>
        *   <div class="s-dropdown:top-start">
        *          <p class="s-typo:p s-mbe:30">
        *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
        *       </p>
        *          <a class="s-btn">You find me!</a>
        *       </div>
        * </div>
        * <div class="s-dropdown-container s-mie:20" dir="rtl">
        *   <button class="s-btn">
        *       Top end
        *   </button>
        *   <div class="s-dropdown:top-end">
        *          <p class="s-typo:p s-mbe:30">
        *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
        *       </p>
        *          <a class="s-btn">You find me!</a>
        *       </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.code(`@s.scope 'bare' {`);
    vars.comment(() => `/**
            * @name           s-dropdown
            * @namespace          sugar.style.ui.dropdown
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>bare</yellow>" dropdown
            * 
            * @example        html
            * <span class="s-dropdown-container">
            *     <button class="s-btn">Click me!</button>
            *     <div class="s-dropdown">
            *         <p class="s-typo:p s-mbe:30">
            *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
            *       </p>
            *         <a class="s-btn">You find me!</a>
            *     </div>
            * </span>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .s-dropdown {
                @s.ui.dropdown;
            }
            `, {
        type: 'CssClass',
    });
    vars.code('}');
    vars.code(`@s.scope 'lnf' {`);
    vars.comment(() => `/**
            * @name           s-dropdown
            * @namespace          sugar.style.ui.dropdown
            * @type           CssClass
            * 
            * This class represent a(n) dropdown
            * 
            * @example        html
            * <span class="s-dropdown-container">
            *     <button class="s-btn">Click me!</button>
            *     <div class="s-dropdown">
            *         <p class="s-typo:p s-mbe:30">
            *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
            *       </p>
            *         <a class="s-btn">You find me!</a>
            *     </div>
            * </span>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            .s-dropdown {
                @s.ui.dropdown;
            }
            `, {
        type: 'CssClass',
    });
    vars.code('}');
    vars.code(`@s.scope 'position' {`);
    vars.comment(() => `/**
        * @name           s-dropdown
        * @namespace          sugar.style.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>bottom (center)</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown:bottom">
        *       <p class="s-typo:p s-mbe:30">
        *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
        *       </p>
        *       <a class="s-btn">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-dropdown {
            @s.ui.dropdown($position: bottom);
        }
        `, {
        type: 'CssClass',
    });
    vars.comment(() => `/**
        * @name           s-dropdown:bottom-start
        * @namespace          sugar.style.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>bottom start</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown:bottom-start">
        *       <p class="s-typo:p s-mbe:30">
        *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
        *       </p>
        *       <a class="s-btn">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-dropdown-bottom-start {
            @s.ui.dropdown($position: bottom-start);
        }
        `, {
        type: 'CssClass',
    });
    vars.comment(() => `/**
        * @name           s-dropdown:bottom-end
        * @namespace          sugar.style.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>bottom end</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown:bottom-end">
        *       <p class="s-typo:p s-mbe:30">
        *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
        *       </p>
        *       <a class="s-btn">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-dropdown-bottom-end {
            @s.ui.dropdown($position: bottom-end);
        }
        `, {
        type: 'CssClass',
    });
    vars.comment(() => `/**
        * @name           s-dropdown:top
        * @namespace          sugar.style.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>top</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown:top">
        *       <p class="s-typo:p s-mbe:30">
        *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
        *       </p>
        *       <a class="s-btn">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-dropdown-top {
            @s.ui.dropdown($position: top);
        }
        `, {
        type: 'CssClass',
    });
    vars.comment(() => `/**
        * @name           s-dropdown:top-start
        * @namespace          sugar.style.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>top-start</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown:top-start">
        *       <p class="s-typo:p s-mbe:30">
        *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
        *       </p>
        *       <a class="s-btn">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-dropdown-top-start {
            @s.ui.dropdown($position: top-start);
        }
        `, {
        type: 'CssClass',
    });
    vars.comment(() => `/**
        * @name           s-dropdown:top-end
        * @namespace          sugar.style.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>top-end</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown:top-end">
        *       <p class="s-typo:p s-mbe:30">
        *           Veniam ut ad et amet adipisicing labore sint non excepteur nisi labore mollit.
        *       </p>
        *       <a class="s-btn">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
        .s-dropdown-top-end {
            @s.ui.dropdown($position: top-end);
        }
        `, {
        type: 'CssClass',
    });
    vars.code('}');
    vars.code(`@s.scope 'bare' {`);
    vars.comment(() => `/**
            * @name           s-dropdown-container
            * @namespace          sugar.style.ui.dropdown
            * @type           CssClass
            * 
            * This class represent the tooltip container in which you have to put your actual .s-tooltip element
            * and anything you want as a tooltip activator. Can be a button, an image, really anything.
            * The dopdown will be visible depending on these rules:
            * 
            * - &.active > .s-dropdown
            * - &[active] > .s-dropdown
            * - &:focus > .s-dropdown
            * - &:focus-within > .s-dropdown
            * - & > .s-dropdown:hover
            * - & > .s-dropdown:focus
            * - & > .s-dropdown:focus-within
            * 
            * @example        html
            * <div class="s-tooltip-container">
            *   <img src="..." />
            *   <div class="s-tooltip">Something cool</div>
            * </div>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */`);
    vars.code(() => `
            .s-dropdown-container {
                position: relative;
                display: inline-block;
                cursor: pointer;

                & > .s-dropdown {
                    opacity: 0;
                    pointer-events: none;
                }

                &.active > .s-dropdown,
                &[active] > .s-dropdown,
                &:focus > .s-dropdown,
                &:focus-within > .s-dropdown,
                & > .s-dropdown:hover,
                & > .s-dropdown:focus,
                & > .s-dropdown:focus-within {
                    pointer-events: all;
                    opacity: 1;
                }
            }
        `, {
        type: 'CssClass',
    });
    vars.code('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLHlDQUEwQyxTQUFRLFlBQVk7SUFDaEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0EwSlQsQ0FDQSxDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXFCTixDQUNILENBQUMsSUFBSSxDQUNGOzs7O2FBSUssRUFDTDtRQUNJLElBQUksRUFBRSxVQUFVO0tBQ25CLENBQ0osQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBcUJOLENBQ0gsQ0FBQyxJQUFJLENBQ0Y7Ozs7YUFJSyxFQUNMO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUVuQyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bc0JSLENBQ0QsQ0FBQyxJQUFJLENBQ0Y7Ozs7U0FJQyxFQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQXNCUixDQUNELENBQUMsSUFBSSxDQUNGOzs7O1NBSUMsRUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO0tBQ25CLENBQ0osQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFzQlIsQ0FDRCxDQUFDLElBQUksQ0FDRjs7OztTQUlDLEVBQ0Q7UUFDSSxJQUFJLEVBQUUsVUFBVTtLQUNuQixDQUNKLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bc0JSLENBQ0QsQ0FBQyxJQUFJLENBQ0Y7Ozs7U0FJQyxFQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQXNCUixDQUNELENBQUMsSUFBSSxDQUNGOzs7O1NBSUMsRUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO0tBQ25CLENBQ0osQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFzQlIsQ0FDRCxDQUFDLElBQUksQ0FDRjs7OztTQUlDLEVBQ0Q7UUFDSSxJQUFJLEVBQUUsVUFBVTtLQUNuQixDQUNKLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRS9CLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUF5QkMsQ0FDVixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FDTCxHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXNCTCxFQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==
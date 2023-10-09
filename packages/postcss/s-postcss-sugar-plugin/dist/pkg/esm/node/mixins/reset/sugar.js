import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           sugar
 * @as              @s.reset.sugar
 * @namespace      node.mixin.reset
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin print the sugar css reset that makes:
 *
 * @feature     Handle body height for IOS devices using the "fill-available" and "min-height: -webkit-fill-available;" technique
 * @feature     Ensure template are not displayed
 * @feature     Ensure hidden things are not displayed
 * @feature     Set the box-sizing to border box for all HTMLElement
 * @feature     Set the webkit highlight color to transparent color
 * @feature     Remote outline on every elements
 * @feature     Set the max-width to 100% for images
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.reset.sugar
 *
 * @example        css
 * \@s.reset.sugar;
 *
 * @see       https://github.com/nicolas-cusan/destyle.css
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginResetDestyleInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginResetDestyleInterface as interface };
export default function ({ params, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `/**
        * @name          Sugar reset
        * @namespace          sugar.style.resets
        * @type               Styleguide
        * @menu           Styleguide / Resets        /styleguide/resets/sugar
        * @platform       css
        * @status       stable
        * 
        * This mixin allows you to apply the \`sugar\` reset easily.
        * 
        * @feature     Handle body height for IOS devices using the \`fill-available\` and \`min-height: -webkit-fill-available;\` technique
        * @feature     Ensure template are not displayed
        * @feature     Ensure hidden things are not displayed
        * @feature     Set the \`box-sizing\` to \`border-box\` for all HTMLElement
        * @feature     Set the webkit highlight color to transparent color
        * @feature     Remove outline on every elements
        * @feature     Set the \`max-width\` to \`100%\` for images
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @example        css       Simple usage
        * \@s.reset.sugar;
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`

    /* purgecss start ignore */

    /**
     * Body height
     */
    html {
        height: stretch;
    }
    body {
        min-height: 100vh;
        min-height: -webkit-fill-available;
    }

    /**
     * Add the correct display in IE 10+.
     */
    template {
        display: none;
    }

    /**
     * Add the correct display in IE 10.
     */
    [hidden] {
        display: none;
    }

    /**
     * Set box sizing to berder box
     * Set the webkit highlight color to transparent color
     * Remote outline on every elements
     */
    * {
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        outline: none;
    }

    /**
     * Max width 100% for images
     */
    img {
        max-width: 100%;
    }

    /* purgecss end ignore */


  `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWhFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0E0QkgsQ0FDTixDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrRFIsQ0FBQyxDQUFDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9
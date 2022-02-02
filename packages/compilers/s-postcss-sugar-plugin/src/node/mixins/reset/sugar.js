import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           sugar
 * @namespace      node.mixins.reset
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin print the sugar css reset that makes:
 *
 * 1. Handle body height for IOS devices using the "fill-available" and "min-height: -webkit-fill-available;" technique
 * 2. Ensure template are not displayed
 * 3. Ensure hidden things are not displayed
 * 4. Set the box-sizing to border box for all HTMLElement
 * 5. Set the webkit highlight color to transparent color
 * 6. Remote outline on every elements
 * 7. Set the max-width to 100% for images
 *
 * @feature     Handle body height for IOS devices using the "fill-available" and "min-height: -webkit-fill-available;" technique
 * @feature     Ensure template are not displayed
 * @feature     Ensure hidden things are not displayed
 * @feature     Set the box-sizing to border box for all HTMLElement
 * @feature     Set the webkit highlight color to transparent color
 * @feature     Remote outline on every elements
 * @feature     Set the max-width to 100% for images
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.reset.sugar;
 *
 * @see       https://github.com/nicolas-cusan/destyle.css
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginResetDestyleInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginResetDestyleInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [
        `

        /* purgecss start ignore */


        /**
         * Body height
         */
        html {
            height: fill-available;
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


  `,
    ];
    return vars;
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdWdhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWhFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYTtRQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbURMO0tBQ0UsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0lBRVosT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9
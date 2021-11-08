import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiNavbarClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginUiNavbarClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/navbar.js`],
    };
}
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [
        `
        /**
         * @name            s-navbar
         * @namespace       sugar.css.ui.navbar
         * @type            CssClass
         * 
         * This class allows you to apply the navbar style to an HTMLElement.
         * This style automatically center items horizontally and allows you to
         * specify 1 child to grow and push the next childs to the right.
         * 
         * @example         css
         * <header class="s-navbar">
         *     <img src="myCoolLogo.svg" />
         *      <nav class="s-navbar__grow">
         *          <a href="...">Something</a>
         *          <a href="...">Cool</a>
         *      </nav>
         *      <input type="text" name="search" />
         * </header>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-navbar {
            @sugar.ui.navbar;
        }

        /**
         * @name            s-navbar__grow
         * @namespace       sugar.css.ui.navbar
         * @type            CssClass
         * 
         * This class allows you to specify the element in the navbar that will
         * grow automatically.
         * 
         * @example         css
         * <header class="s-navbar">
         *     <img src="myCoolLogo.svg" />
         *      <nav class="s-navbar__grow">
         *          <a href="...">Something</a>
         *          <a href="...">Cool</a>
         *      </nav>
         *      <input type="text" name="search" />
         * </header>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-navbar__grow {
            flex-grow: 1 !important;
        }
  `,
    ];
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZO0lBQ2pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRW5FLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE1BQU0sVUFBVSxZQUFZO0lBQ3hCLE9BQU87UUFDSCxLQUFLLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxZQUFZLENBQUM7S0FDdEMsQ0FBQztBQUNOLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1ETDtLQUNFLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=
import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiNavbarClassesInterface extends __SInterface {
}
postcssSugarPluginUiNavbarClassesInterface.definition = {};
export { postcssSugarPluginUiNavbarClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [
        `
    @sugar.scope(bare) {

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

    }

  `
    ];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUM1RCxxREFBVSxHQUFHLEVBQUUsQ0FBQztBQUt6QixPQUFPLEVBQUUsMENBQTBDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhO1FBQ3JCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdERDtLQUNBLENBQUM7SUFFRixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9
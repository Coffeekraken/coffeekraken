import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginUiNavbarClassesInterface extends __SInterface {
    static definition = {};
}

export interface IPostcssSugarPluginUiNavbarClassesParams {}

export { postcssSugarPluginUiNavbarClassesInterface as interface };

import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/navbar.js`],
    };
}

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiNavbarClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiNavbarClassesParams = {
        ...params,
    };

    const vars: string[] = [
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

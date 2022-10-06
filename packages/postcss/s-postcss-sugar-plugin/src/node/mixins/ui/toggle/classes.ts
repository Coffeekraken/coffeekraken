import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          classes
 * @namespace     node.mixin.ui.toggle
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the toggle classes
 *
 * @param       {String[]}              [types=null]            The toggles type you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * \@sugar.ui.toggle.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiToggleClassesInterface extends __SInterface {
    static get _definition() {
        return {
            types: {
                type: 'String[]',
                values: ['burger'],
                default: ['burger'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiToggleClassesParams {
    types: 'burger'[];
}

export { postcssSugarPluginUiToggleClassesInterface as interface };

import { __dirname } from '@coffeekraken/sugar/fs';
export function dependencies() {
    return {
        files: [`${__dirname()}/toggle.js`],
    };
}

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiToggleClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiToggleClassesParams = {
        types: ['burger'],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Toggles
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/toggles
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display any HTMLElement as a toggle
        * 
        ${finalParams.types
            .map((type) => {
                return ` * @cssClass     s-toggle:${type}}           Apply the ${type} toggle style`;
            })
            .join('\n')}
        * 
        ${finalParams.types
            .map((type) => {
                return ` * @example        html       ${type}
            * <label class="s-toggle:${type}"></label>`;
            })
            .join('\n')}
        *
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    finalParams.types.forEach((type) => {
        vars.comment(
            () => `/**
            * @name           s-toggle:${type}
            * @namespace          sugar.style.ui.toggle
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${type}</s-color>" toggle
            * 
            * @example        html
            * <label class="s-toggle:${type}"></label>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `
            .s-toggle:${type} {
                @sugar.ui.toggle(${type});
            }
        `,
            { type: 'CssClass' },
        );
    });

    return vars;
}

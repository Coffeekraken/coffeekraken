import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          classes
 * @namespace     node.mixin.ui.backdrop
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the backdrop classes
 *
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * \@sugar.ui.backdrop.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class PostcssSugarPluginUiBackdropClassesInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiBackdropClassesParams {
    scope: ('bare' | 'lnf')[];
}

export { PostcssSugarPluginUiBackdropClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiBackdropClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiBackdropClassesParams = {
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Backdrop
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/backdrop
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice backdrop with simple class.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.ui.backdrop.classes;
        * 
        * .my-backdrop {
        *   \@sugar.ui.backdrop;
        * }
        * 
        * @cssClass                 s-backdrop          Apply the backdrop styling
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
        * @name           s-backdrop
        * @namespace          sugar.style.ui.backdrop
        * @type           CssClass
        * 
        * This class represent a <span class="s-tc:accent">bare</span> backdrop
        * 
        * @example        html
        * <div class="s-backdrop"></div>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `,
        ).code(
            `
        .s-backdrop {
            @sugar.ui.backdrop($scope: bare);
        }`,
            { type: 'CssClass' },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        vars.comment(
            () => `/**
            * @name           s-backdrop
            * @namespace          sugar.style.ui.backdrop
            * @type           CssClass
            * 
            * This class represent a backdrop
            * 
            * @example        html
            * <div class="s-backdrop"></div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
            .s-backdrop {
                @sugar.ui.backdrop($scope: lnf);
            } `,
            { type: 'CssClass' },
        );
    }

    return vars;
}

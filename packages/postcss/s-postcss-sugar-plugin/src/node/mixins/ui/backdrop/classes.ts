import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

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
 * @param       {('solid')[]}                           [styles=['solid']]         The style(s) you want to generate
 * @param       {('default'|'square'|'pill')[]}             [shape=['default','square','pill']]         The shape(s) you want to generate
 * @param       {'solid'|'outline'}                [defaultStyle='theme.ui.backdrop.defaultStyle']           The default style you want
 * @param       {'default'|'square'|'pill'}        [defaultShape='theme.ui.backdrop.defaultShape']           The default shape you want
 * @param       {String}                            [defaultColor=theme.ui.backdrop.defaultColor]            The default color you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
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
            styles: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.backdrop.defaultStyle'),
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(__STheme.get('color')),
                default: __STheme.get('ui.backdrop.defaultColor'),
            },
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
    styles: ('solid' | 'blured')[];
    defaultStyle: 'solid';
    defaultColor: string;
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
        styles: [],
        defaultStyle: 'solid',
        defaultColor: 'main',
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
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-backdrop${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} backdrop style`;
            })
            .join('\n')}
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @example        html       ${style} style
            *   <div class="s-backdrop${
                style === finalParams.defaultStyle ? '' : `:${style}`
            }">
            *   </div>
            * `;
            })
            .join('\n')}
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
        finalParams.styles.forEach((style) => {
            let cls = `s-backdrop`;
            if (style !== finalParams.defaultStyle) {
                cls += `--${style}`;
            }

            vars.comment(
                () => `/**
            * @name           ${cls}
            * @namespace          sugar.style.ui.backdrop
            * @type           CssClass
            * 
            * This class represent a <span class="s-tc:accent">${style}</span> backdrop
            * 
            * @example        html
            * <div class="${cls.trim()}"></div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
            ).code(
                `
            .${cls} {
                @sugar.ui.backdrop($style: ${style}, $scope: lnf);
            } `,
                { type: 'CssClass' },
            );
        });
    }

    // default color
    if (finalParams.scope.includes('lnf')) {
        vars.code(
            () => `
            .s-backdrop:not(.s-color) {
                @sugar.color(${finalParams.defaultColor});
            }
        `,
            { type: 'CssClass' },
        );
    }

    return vars;
}

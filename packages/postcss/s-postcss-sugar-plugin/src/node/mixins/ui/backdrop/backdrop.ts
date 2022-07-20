import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginBackdropInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.backdrop.defaultStyle'),
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

export interface IPostcssSugarPluginBackdropParams {
    style: 'solid' | 'blured';
    scope: ('bare' | 'lnf')[];
}

export { postcssSugarPluginBackdropInterface as interface };

/**
 * @name          backdrop
 * @namespace     node.mixin.backdrop
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply the backdrop style to any HTMLEment
 *
 * @param       {'solid'|'blured'}                           [style'theme.ui.backdrop.defaultStyle']         The style you want to generate
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    \@sugar.backdrop();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: IPostcssSugarPluginBackdropParams;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginBackdropParams = {
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(`
        position: fixed;
        top: 0;
        left: 0;
        width: 200vw;
        height: 200vh;
        z-index: 100;
        transform: translate(-50%, -50%);
    `);
    }

    if (finalParams.scope.includes('lnf')) {
        switch (finalParams.style) {
            case 'blured':
                vars.code(`
                    background: sugar.color(main, background, --alpha 0.7);
                    backdrop-filter: blur(5px);
                `);
                break;
            case 'solid':
            default:
                vars.code(`
                    background: sugar.color(main, background, --alpha 0.7);
                `);
                break;
        }
    }

    return vars;
}

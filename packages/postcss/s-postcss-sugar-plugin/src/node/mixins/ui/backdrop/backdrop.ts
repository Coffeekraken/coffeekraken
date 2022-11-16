import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginBackdropInterface extends __SInterface {
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

export interface IPostcssSugarPluginBackdropParams {
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
 * This mixin allows you to apply the backdrop lnf to any HTMLEment
 *
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
        vars.code(`
                    background: sugar.color(main, background, --alpha 0.7);
                    backdrop-filter: blur(5px);
                `);
    }

    return vars;
}

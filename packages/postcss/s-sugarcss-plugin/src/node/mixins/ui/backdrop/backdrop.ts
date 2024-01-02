import __SInterface from '@coffeekraken/s-interface';

class SSugarcssPluginBackdropInterface extends __SInterface {
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

export interface ISSugarcssPluginBackdropParams {
    scope: ('bare' | 'lnf')[];
}

export { SSugarcssPluginBackdropInterface as interface };

/**
 * @name          backdrop
 * @as              @s.ui.backdrop
 * @namespace     node.mixin.backdrop
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply the backdrop lnf to any HTMLEment
 *
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.backdrop
 *
 * @example       css
 * .my-element {
 *    @s.backdrop();
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
    params: ISSugarcssPluginBackdropParams;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginBackdropParams = {
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.scope.includes('bare')) {
        vars.code(`
        @s.scope 'bare' {
            position: fixed;
            top: 0;
            left: 0;
            width: 200vw;
            height: 200vh;
            z-index: 100;
            transform: translate(-50%, -50%);
        }
    `);
    }

    if (finalParams.scope.includes('lnf')) {
        vars.code(`
            @s.scope 'lnf' {
                background: s.color(main, background, --alpha 0.7);
                backdrop-filter: blur(5px);
            }
                `);
    }

    return vars;
}

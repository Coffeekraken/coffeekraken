import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          media
 * @as              @s.ui.media
 * @namespace     node.mixin.ui.media
 * @type          PostcssMixin
 * @interface       ./media
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate the "media" UI component css.
 *
 * @param       {('bare'|'lnf')[]}        [scope=['bare','lnf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @s.ui.media
 *
 * @example       css
 * .my-element {
 *      @s.ui.media();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiMediaInterface extends __SInterface {
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

export interface ISSugarcssPluginUiMediaParams {
    scope: ('bare' | 'lnf')[];
}

export { SSugarcssPluginUiMediaInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiMediaParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiMediaParams = {
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
    }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            
        `);
    }

    return vars;
}

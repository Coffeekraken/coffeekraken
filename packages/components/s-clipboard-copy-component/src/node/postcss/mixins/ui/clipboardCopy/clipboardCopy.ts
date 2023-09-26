import __SInterface from '@coffeekraken/s-interface';

class postcssUiClipboardCopyInterface extends __SInterface {
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

export interface IPostcssUiClipboardCopyParams {
    scope: ('bare' | 'lnf' | 'theme')[];
}

export { postcssUiClipboardCopyInterface as interface };

/**
 * @name          clipbordCopy
 * @namespace     ui.clipboardCopy
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the clipbord copy style to any s-clipboard-copy element
 *
 * @snippet         @s.ui.clipboardCopy($1);
 *
 * @example     css
 * .s-clipboard-copy {
 *    @s.ui.clipboardCopy;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function ({
    params,
    atRule,
    sharedData,
    replaceWith,
}: {
    params: Partial<IPostcssUiClipboardCopyParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiClipboardCopyParams = {
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
    `);
    }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            .s-clipboard-copy_root[state='success'] {
                color: s.color(success);
            }
            .s-clipboard-copy_root[state='error'] {
                color: s.color(error);
            }
        `);
    }

    return vars;
}

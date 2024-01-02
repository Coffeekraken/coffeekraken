import __SInterface from '@coffeekraken/s-interface';

class postcssUiClipboardCopyInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssUiClipboardCopyParams {}

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
        ...params,
    };

    const vars: string[] = [];

    // bare

    // lnf
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`
            .s-clipboard-copy_root[state='success'] {
                color: s.color(success);
            }
            .s-clipboard-copy_root[state='error'] {
                color: s.color(error);
            }
        `);
    vars.push('}');

    return vars;
}

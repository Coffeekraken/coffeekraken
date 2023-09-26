import __SInterface from '@coffeekraken/s-interface';

class postcssUiHotkeysListInterface extends __SInterface {
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

export interface IPostcssUiHotkeysListParams {
    scope: ('bare' | 'lnf')[];
}

export { postcssUiHotkeysListInterface as interface };

/**
 * @name          hotkeysList
 * @namespace     ui.hotkeysList
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the theme-switcher style to any s-theme-switcher element
 *
 * @snippet         @s.ui.hotkeysList($1);
 *
 * @example     css
 * .s-hotkeys-list {
 *    @s.ui.hotkeysList;
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
    params: Partial<IPostcssUiHotkeysListParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiHotkeysListParams = {
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

        `);

        vars.push(`

        `);
    }

    return vars;
}

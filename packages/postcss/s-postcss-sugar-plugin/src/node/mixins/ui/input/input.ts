import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          input
 * @as          @sugar.ui.input
 * @namespace     node.mixin.ui.input
 * @type               PostcssMixin
 * @interface       ./input
 * @platform      postcss
 * @status        beta
 *
 * Apply the input style to any element
 *
 * @param       {'solid'|'underline'}                           [style='theme.ui.form.defaultLnf']         The lnf you want to generate
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.input
 *
 * @example     css
 * .my-input {
 *    @sugar.ui.input;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiFormInputInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['default', 'underline'],
                default: __STheme.get('ui.form.defaultLnf'),
            },
            outline: {
                type: 'Boolean',
                default: __STheme.get('ui.form.outline'),
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

export interface IPostcssSugarPluginUiFormInputParams {
    lnf: 'default' | 'underline';
    outline: boolean;
    scope: string[];
}

export { postcssSugarPluginUiFormInputInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFormInputParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFormInputParams = {
        lnf: 'default',
        outline: true,
        scope: [],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('lnf') !== -1) {
        if (finalParams.outline) {
            vars.push(`
                &:focus:not(:hover) {
                    @sugar.outline;
                }
            `);
        }

        vars.push(`
            @sugar.ui.base(input);
            @sugar.shape();
  `);
    }

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            width: 100%;
        `);
    }

    switch (finalParams.lnf) {
        case 'underline':
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                    background-color: sugar.color(current, --alpha 0);
                    border-top: none !important;
                    border-left: none !important;
                    border-right: none !important;
                    border-bottom: sugar.color(current, --alpha 0.3) solid sugar.border.width(ui.form.borderWidth) !important;
                    padding-inline: 1ch !important;

                    &:hover, &:focus {
                        border-bottom: sugar.color(current, --alpha 1) solid sugar.border.width(ui.form.borderWidth) !important;
                        background-color: sugar.color(current, --alpha 0.1);
                    }
                `);
            }
            break;
        default:
            break;
    }

    return vars;
}

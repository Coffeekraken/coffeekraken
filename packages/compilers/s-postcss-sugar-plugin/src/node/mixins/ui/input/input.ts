import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          input
 * @namespace     ui.input
 * @type               PostcssMixin
 * @interface     ./text          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the input style to any element
 *
 * @param       {'solid'}           [style='theme.ui.input.defaultStyle']        The style you want for your input
 * @param       {'default'|'square'|'pill'}     [shape=theme.ui.input.defaultShape]      The shape you want for your input
 * @param       {('bare'|'lnf'|'shape')[]}      [scope=['bare','lnf','shape']]                      The scope(s) you want to generate
 * @return      {String}            The generated css
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
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.config('ui.input.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.config('ui.input.defaultShape'),
            },
            outline: {
                type: 'Boolean',
                default: __STheme.config('ui.input.outline'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape'],
                default: ['bare', 'lnf', 'shape'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiFormInputParams {
    style: 'solid';
    shape: 'default' | 'square' | 'pill';
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
        style: 'solid',
        shape: 'default',
        outline: true,
        scope: [],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('lnf') !== -1) {
        if (finalParams.outline) {
            vars.push(`
            @sugar.outline;
`);
        }

        vars.push(`
            @sugar.ui.base(input);
  `);
    }

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            width: 100%;
        `);
    }

    switch (finalParams.style) {
        // case 'underline':
        //     if (finalParams.scope.indexOf('lnf') !== -1) {
        //         vars.push(`
        //             background-color: sugar.color(current, --alpha 0);
        //             border-top: none !important;
        //             border-left: none !important;
        //             border-right: none !important;
        //             border-bottom: sugar.color(current) solid sugar.theme(ui.input.borderWidth) !important;
        //             border-radius: 0;
        //             padding-inline: 0 !important;

        //             &:hover, &:focus {
        //                 background-color: sugar.color(current, --alpha 0.1);
        //             }
        //         `);
        //     }
        //     break;
        case 'solid':
        default:
            break;
    }

    if (finalParams.scope.includes('shape')) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    border-radius: 0;
                `);
                break;
            case 'pill':
                vars.push(`
                    border-radius: 9999px;
                `);
                break;
            default:
                vars.push(`
                    border-radius: sugar.theme(ui.input.borderRadius);
                `);
                break;
        }
    }

    return vars;
}

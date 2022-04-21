import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          radio
 * @namespace     ui.radio
 * @type               PostcssMixin
 * @interface     ./radio          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the radio style to any element
 *
 * @param       {'solid'}           [style='theme.ui.radio.defaultStyle']        The style you want for your radio
 * @param       {'default'|'square'|'pill'}     [shape=theme.ui.radio.defaultShape]      The shape you want for your radio
 * @param       {('bare'|'lnf'|'shape')[]}      [scope=['bare','lnf','shape']]                      The scope(s) you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-radio {
 *    @sugar.ui.radio;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiRadioInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.config('ui.radio.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'pill', 'circle'],
                default: __STheme.config('ui.radio.defaultShape'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'vr'],
                default: ['bare', 'lnf', 'shape', 'vr'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiRadioParams {
    style: 'solid';
    shape: 'default' | 'square' | 'pill' | 'circle';
    scope: ('bare' | 'lnf' | 'shape' | 'vr')[];
}

export { postcssSugarPluginUiRadioInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiRadioParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiRadioParams = {
        style: 'solid',
        shape: 'default',
        scope: ['bare', 'lnf', 'shape', 'vr'],
        ...params,
    };

    const vars: string[] = [
        `
        
`,
    ];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
                
                appearance: none !important;
                -moz-appearance: none !important;
                -webkit-appearance: none !important;
                position: relative;
                width: 1em;
                height: 1em;
                font-size: sugar.scalable(1rem);

                &:disabled {
                    @sugar.disabled;
                }
            `);
    }

    switch (finalParams.style) {
        case 'solid':
            // lnf
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                
                    transition: sugar.theme(ui.radio.transition);
                    border: sugar.theme(ui.radio.borderWidth) solid sugar.color(current);
                    background-color: transparent;
                    transition: sugar.theme(ui.radio.transition);
                    box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.2);

                    &:after {
                        content: '';
                        position: absolute;
                        top: 50%; left: 50%;
                        width: 0.4em; height: 0.4em;
                        transform: translate(-50%, -50%);
                        background: sugar.color(current);
                        opacity: 0;
                        transition: sugar.theme(ui.radio.transition);
                    }
                    label:hover > &:not(:disabled):after,
                    &:hover:not(:disabled):after {
                        opacity: 0.2;
                    }
                    &:checked:not(:disabled):after {
                        opacity: 1 !important;
                    }

                    &:focus:not(:hover):not(:active):not(:disabled) {
                        box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
                    }
 
        `);
            }
    }

    if (finalParams.scope.includes('shape')) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    border-radius: 0;
                    &:after {
                        border-radius: 0;
                    }
                `);
                break;
            case 'pill':
            case 'circle':
                vars.push(`
                    border-radius: 9999px;
                    &:after {
                        border-radius: 9999px;
                    }
                `);
                break;
            default:
                vars.push(`
                    border-radius: sugar.theme(ui.radio.borderRadius);
                    &:after {
                        border-radius: sugar.theme(ui.radio.borderRadius);
                    }
                `);
                break;
        }
    }

    return vars;
}

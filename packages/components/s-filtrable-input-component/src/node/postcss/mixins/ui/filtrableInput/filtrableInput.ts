import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiFiltrableInputInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid', 'gradient', 'outline', 'text'],
                default: __STheme.config('ui.button.defaultStyle'),
            },
            outline: {
                type: 'Boolean',
                default: __STheme.config('ui.button.outline'),
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

export interface IPostcssUiFiltrableInputParams {
    style: 'solid';
    outline: boolean;
    scope: ('bare' | 'lnf')[];
}

export { postcssUiFiltrableInputInterface as interface };

/**
 * @name          filtrableInput
 * @namespace     ui.filtrableInput
 * @type          CssMixin
 * @interface     ./button          interface
 * @platform      css
 * @status        beta
 *
 * Apply the filtrable input style to any s-filtrable-input element
 *
 * @example     css
 * .s-filtrable-input {
 *    @sugar.ui.filtrableInput;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export default function ({
    params,
    atRule,
    applyNoScopes,
    sharedData,
    replaceWith,
}: {
    params: Partial<IPostcssUiFiltrableInputParams>;
    atRule: any;
    applyNoScopes: Function;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiFiltrableInputParams = {
        style: __STheme.config('ui.button.defaultStyle'),
        outline: true,
        scope: ['bare', 'lnf'],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
    `);
    }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
        
            .s-filtrable-input__dropdown {
                overflow: hidden;
                @sugar.depth(sugar.theme.value(ui.filtrableInput.depth));
                transition: sugar.theme(ui.filtrableInput.transition);
            }
            .s-filtrable-input__list {
                width: 100%;
                transition: sugar.theme(ui.filtrableInput.transition);
                @sugar.scrollbar;
            }
            .s-filtrable-input__list-item {
                transition: sugar.theme(ui.filtrableInput.transition);
            }
        `);

        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`

                .s-filtrable-input__dropdown {
                    background-color: sugar.color(secondary, background);
                    border-radius: sugar.theme(ui.filtrableInput.borderRadius);
                }

                .s-filtrable-input__list-item {
                    background-color: sugar.color(secondary, surface);  
                    padding-inline: sugar.theme(ui.filtrableInput.paddingInline);
                    padding-block: sugar.theme(ui.filtrableInput.paddingBlock);
                    border-top: 1px solid sugar.color(secondary, surface, --darken 5);

                    &:hover,
                    &:focus,
                    &:focus:not(.active),
                    &:focus:not(:active) {
                        &:not(.s-filtrable-input__list-no-item):not(.s-filtrable-input__list-loading) {
                            border-top: 1px solid sugar.color(secondary, --alpha 0);
                            background-color: sugar.color(secondary, --alpha 0.6);
                            color: sugar.color(secondary, foreground);
                        }
                    }

                    &.active,
                    &:active {
                        &:not(.s-filtrable-input__list-no-item):not(.s-filtrable-input__list-loading) {
                            border-top: 1px solid sugar.color(primary) !important;
                            background-color: sugar.color(primary) !important;
                            color: sugar.color(primary, foreground) !important;
                        }
                    }
                }
        `);
                break;
        }

        if (finalParams.outline) {
            vars.push(`
            

          `);
        }
    }

    return vars;
}

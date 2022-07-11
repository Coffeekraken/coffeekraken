import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiFiltrableInputInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid', 'gradient', 'outline', 'text'],
                default: __STheme.get('ui.button.defaultStyle'),
            },
            outline: {
                type: 'Boolean',
                default: __STheme.get('ui.button.outline'),
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
 * @type               PostcssMixin
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function ({
    params,
    atRule,
    sharedData,
    replaceWith,
}: {
    params: Partial<IPostcssUiFiltrableInputParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiFiltrableInputParams = {
        style: __STheme.get('ui.button.defaultStyle'),
        outline: true,
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

            .s-filtrable-input__dropdown {
                @sugar.depth(ui.filtrableInput.depth);
                transition: sugar.theme(ui.filtrableInput.transition);
            }

            .s-filtrable-input__keywords {
                padding: sugar.padding(ui.filtrableInput.paddingBlock) sugar.padding(ui.filtrableInput.paddingInline);
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
                    background-color: sugar.color(base, background);
                    border-radius: sugar.border.radius(ui.filtrableInput.borderRadius);
                }

                .s-filtrable-input__keywords {
                    background: sugar.color(main, background);
                }

                .s-filtrable-input__list-item {
                    padding-inline: sugar.padding(ui.filtrableInput.paddingInline);
                    padding-block: sugar.padding(ui.filtrableInput.paddingBlock);
                    border-top: 1px solid sugar.color(base, background, --lighten 5);

                    &:hover,
                    &:focus,
                    &:focus:not(.active),
                    &:focus:not(:active) {
                        &:not(.s-filtrable-input__list-no-item):not(.s-filtrable-input__list-loading) {
                            border-top: 1px solid sugar.color(base, --alpha 0);
                            background-color: sugar.color(base, --alpha 0.6);
                            color: sugar.color(base, foreground);
                        }
                    }

                    &.active,
                    &:active {
                        &:not(.s-filtrable-input__list-no-item):not(.s-filtrable-input__list-loading) {
                            border-top: 1px solid sugar.color(accent) !important;
                            background-color: sugar.color(accent) !important;
                            color: sugar.color(accent, foreground) !important;
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

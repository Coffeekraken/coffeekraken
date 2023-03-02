import __SInterface from '@coffeekraken/s-interface';

class postcssUiFiltrableInputInterface extends __SInterface {
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

export interface IPostcssUiFiltrableInputParams {
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
 * @snippet         @sugar.ui.filtrableInput($1);
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

            .s-filtrable-input_dropdown {
                transition: sugar.theme(ui.filtrableInput.transition);
            }

            .s-filtrable-input_keywords {
                padding: sugar.padding(ui.filtrableInput.paddingBlock) sugar.padding(ui.filtrableInput.paddingInline);
            }

            .s-filtrable-input_list {
                width: 100%;
                transition: sugar.theme(ui.filtrableInput.transition);
                @sugar.scrollbar;
            }
            .s-filtrable-input_list-item {
                transition: sugar.theme(ui.filtrableInput.transition);
            }
        `);

        vars.push(`

                .s-filtrable-input_dropdown {
                    background-color: sugar.color(main, background);
                    border-radius: sugar.border.radius(ui.filtrableInput.borderRadius);
                }

                .s-filtrable-input_keywords {
                    background: sugar.color(main, background);
                }

                .s-filtrable-input_list-item {
                    padding-inline: sugar.padding(ui.filtrableInput.paddingInline);
                    padding-block: sugar.padding(ui.filtrableInput.paddingBlock);
                    border-top: 1px solid sugar.color(main, background, --lighten 5);

                    &:hover,
                    &:focus,
                    &:focus:not(.active),
                    &:focus:not(:active) {
                        &:not(.s-filtrable-input_list-no-item):not(.s-filtrable-input_list-loading) {
                            border-top: 1px solid sugar.color(main, --alpha 0);
                            background-color: sugar.color(main, --alpha 0.05);
                        }
                    }

                    &.active,
                    &:active {
                        &:not(.s-filtrable-input_list-no-item):not(.s-filtrable-input_list-loading) {
                            border-top: 1px solid sugar.color(accent) !important;
                            background-color: sugar.color(accent) !important;

                            &, * {
                                color: sugar.color(accent, foreground) !important;
                            }
                        }
                    }
                }
        `);
    }

    // wireframe
    vars.push(`
        @sugar.wireframe {
            .s-filtrable-input_dropdown {
                @sugar.wireframe.background;
                @sugar.wireframe.border;
            }
        }
    `);

    return vars;
}

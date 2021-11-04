import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiFiltrableInputInterface extends __SInterface {
    static definition = {
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
        
            .s-filtrable-input__list {
                @sugar.depth(sugar.theme(ui.filtrableInput.depth));
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

                .s-filtrable-input__list {
                    background-color: sugar.color(main, background);
                    border-radius: sugar.theme(ui.filtrableInput.borderRadius);
                }

                .s-filtrable-input__list-item {
                    background-color: sugar.color(main, surface);  
                    padding-inline: sugar.theme(ui.filtrableInput.paddingInline);
                    padding-block: sugar.theme(ui.filtrableInput.paddingBlock);
                    border-top: 1px solid sugar.color(main, surface, --darken 5);

                    &:hover,
                    &:focus,
                    &:focus:not(.active),
                    &:focus:not(:active) {
                        &:not(.s-filtrable-input__list-no-item):not(.s-filtrable-input__list-loading) {
                            border-top: 1px solid sugar.color(current, --alpha 0);
                            background-color: sugar.color(current, --alpha 0.6);
                            color: sugar.color(current, foreground);
                        }
                    }

                    &.active,
                    &:active {
                        &:not(.s-filtrable-input__list-no-item):not(.s-filtrable-input__list-loading) {
                            border-top: 1px solid sugar.color(current) !important;
                            background-color: sugar.color(current) !important;
                            color: sugar.color(current, foreground) !important;
                        }
                    }

                    &:first-child {
                        border-top-left-radius: sugar.theme(ui.filtrableInput.borderRadius);
                        border-top-right-radius: sugar.theme(ui.filtrableInput.borderRadius);
                        border-top: none !important;
                    }
                    &:last-child {
                        border-bottom-left-radius: sugar.theme(ui.filtrableInput.borderRadius);
                        border-bottom-right-radius: sugar.theme(ui.filtrableInput.borderRadius);
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

    replaceWith(vars);
}

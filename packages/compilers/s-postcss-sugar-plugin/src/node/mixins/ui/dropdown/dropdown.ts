import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          dropdown
 * @namespace     ui.dropdown
 * @type               PostcssMixin
 * @interface     ./dropdown          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the dropdown style to any element
 *
 * @param       {'solid'}                           [style='theme.ui.dropdown.defaultStyle']         The style you want to generate
 * @param       {'default'|'square'|'pill'}             [shape='theme.ui.dropdown.defaultShape']         The shape you want to generate
 * @param       {('bare'|'lnf'|'shape')[]}        [scope=['bare', 'lnf', 'shape']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-dropdown {
 *    @sugar.ui.dropdown;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiDropdownInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.dropdown.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.get('ui.dropdown.defaultShape'),
            },
            position: {
                type: 'String',
                values: [
                    'top',
                    'top-start',
                    'top-end',
                    'bottom',
                    'bottom-start',
                    'bottom-end',
                ],
                default: 'bottom',
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'position'],
                default: ['bare', 'lnf', 'shape', 'position'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiDropdownParams {
    style: 'solid';
    shape: 'default' | 'square' | 'pill';
    position:
        | 'top'
        | 'top-start'
        | 'top-end'
        | 'bottom'
        | 'bottom-start'
        | 'bottom-end';
    scope: ('bare' | 'lnf' | 'shape' | 'position')[];
}

export { postcssSugarPluginUiDropdownInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiDropdownParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiDropdownParams = {
        style: 'solid',
        shape: 'default',
        position: 'bottom',
        scope: [],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: sugar.scalable(1rem);
          position: absolute;
          -webkit-appearance: none;
          appearance: none;
          line-height: 1;
          outline: 0;
          white-space: nowrap;
          cursor: auto;
          z-index: 10;

            @sugar.state.disabled {
                @sugar.disabled;
                opacity: 0 !important;
            }
      `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
        `);

        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
                    background-color: sugar.color(current);
                    border: sugar.theme(ui.dropdown.borderWidth) solid sugar.color(current, border);
                    @sugar.border.radius(sugar.theme.value(ui.dropdown.borderRadius));
                    @sugar.depth(sugar.theme.value(ui.dropdown.depth));
                    @sugar.transition(fast);

                    &__item {
                        padding-inline: sugar.padding(ui.dropdown.paddingInline);
                        padding-block: sugar.padding(ui.dropdown.paddingBlock);
                        background-color: sugar.color(current, --alpha: 0);
                        @sugar.border.radius(sugar.theme.value(ui.dropdown.borderRadius));
                        @sugar.transition(fast);

                        &:hover, &:focus {
                            background-color: sugar.color(current, --alpha 1 --darken 10%);
                        }

                    }

                `);

                break;
        }
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
                    border-radius: sugar.border.radius(ui.dropdown.borderRadius);
                `);
                break;
        }
    }

    if (finalParams.scope.indexOf('position') !== -1) {
        switch (finalParams.position) {
            case 'top':
                vars.push(`
                    bottom: 100%;
                    top: auto;
                    left: 50%;
                    transform: translateX(-50%);
                `);
                break;
            case 'top-end':
                vars.push(`
                    bottom: 100%;
                    top: auto;
                    left: auto;
                    right: 0;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: auto;
                        left: 0;
                    }

                `);
                break;
            case 'top-start':
                vars.push(`
                    bottom: 100%;
                    top: auto;
                    left: 0;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: 0;
                        left: auto;
                    }
                `);
                break;
            case 'bottom-start':
                vars.push(`
                    top: 100%;
                    left: 0;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: 0;
                        left: auto;
                    }
                `);
                break;
            case 'bottom-end':
                vars.push(`
                    top: 100%;
                    right: 0;
                    left: auto;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: auto;
                        left: 0;
                    }
                `);
                break;
            case 'bottom':
            default:
                vars.push(`
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                `);
                break;
        }
    }

    return vars;
}

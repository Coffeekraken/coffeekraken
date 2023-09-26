import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          dropdown
 * @as              @s.ui.dropdown
 * @namespace     node.mixin.ui.dropdown
 * @type               PostcssMixin
 * @interface     ./dropdown          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the dropdown style to any element
 *
 * @param       {'top'|'top-start'|'top-end'|'bottom'|'bottom-start'|'bottom-end'}          [position='bottom']         The position of the dropdown
 * @param       {('bare'|'lnf'|'position')[]}        [scope=['bare', 'lnf', 'position']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.dropdown
 *
 * @example     css
 * .my-dropdown {
 *    @s.ui.dropdown;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiDropdownInterface extends __SInterface {
    static get _definition() {
        return {
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
                values: ['bare', 'lnf', 'position'],
                default: ['bare', 'lnf', 'position'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiDropdownParams {
    position:
        | 'top'
        | 'top-start'
        | 'top-end'
        | 'bottom'
        | 'bottom-start'
        | 'bottom-end';
    scope: ('bare' | 'lnf' | 'position')[];
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
        position: 'bottom',
        scope: [],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: s.scalable(1rem);
          position: absolute;
          -webkit-appearance: none;
          appearance: none;
          line-height: 1;
          outline: 0;
          white-space: nowrap;
          cursor: auto;
          z-index: 50;

            @s.state.disabled {
                @s.disabled;
                opacity: 0 !important;
            }
      `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
        `);

        vars.push(`
            background-color: s.color(main, background);
            border: s.theme(ui.dropdown.borderWidth) solid s.color(current, border);
            @s.border.radius(ui.dropdown.borderRadius);
            padding-inline: s.padding(ui.dropdown.paddingInline);
            padding-block: s.padding(ui.dropdown.paddingBlock);
            @s.depth(ui.dropdown.depth);
            @s.transition(fast);
        `);
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

    // wireframe
    vars.push(`
        @s.wireframe {
            @s.wireframe.background;
            @s.wireframe.border;
        }
    `);

    return vars;
}

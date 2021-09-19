import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';
import sugar from '@coffeekraken/s-sugar-config';

class postcssSugarPluginUiDropdownInterface extends __SInterface {
    static definition = {
        style: {
            type: 'String',
            values: ['solid'],
            default: __theme().config('ui.dropdown.defaultStyle'),
        },
        position: {
            type: 'String',
            values: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end'],
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

export interface IPostcssSugarPluginUiDropdownParams {
    style: 'solid';
    position: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';
    scope: string[];
}

export { postcssSugarPluginUiDropdownInterface as interface };

export default function ({
    params,
    atRule,
    applyNoScopes,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiDropdownParams>;
    atRule: any;
    applyNoScopes: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiDropdownParams = {
        style: 'solid',
        position: 'bottom',
        scope: [],
        ...params,
    };

    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
          position: absolute;
          -webkit-appearance: none;
          appearance: none;
          line-height: 1;
          outline: 0;
          white-space: nowrap;
          cursor: auto;
          z-index: 10;

            opacity: 0;
            pointer-events: none;

            *:focus + &,
            *:focus-within + &,
            *:focus > &,
            *:focus-within > &,
            &:hover,
            &:focus,
            &:focus-within {
                opacity: 1;
                pointer-events: all;
            }
      `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            & > * {
                @sugar.color.remap(ui, main);
            }
        `);

        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
                    background-color: sugar.color(ui, background);
                    color: sugar.color(ui, backgroundForeground);
                    padding-inline: sugar.scalable(sugar.theme(ui.dropdown.paddingInline));
                    padding-block: sugar.scalable(sugar.theme(ui.dropdown.paddingBlock));
                    border: sugar.theme(ui.dropdown.borderWidth) solid sugar.color(ui, border);
                    border-radius: sugar.theme(ui.dropdown.borderRadius);
                    @sugar.depth(sugar.theme(ui.dropdown.depth));
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

    replaceWith(vars);
}

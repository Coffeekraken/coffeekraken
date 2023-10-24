import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          select
 * @as              @s.ui.select
 * @namespace     node.mixin.ui.select
 * @type               PostcssMixin
 * @interface     ./select          interface
 * @platform      postcss
 * @status        stable
 *
 * Apply the select style to any HTMLSelectElement
 *
 * @param       {'solid'|'underline'}                           [style='theme.ui.form.defaultLnf']         The lnf you want to generate
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.select
 *
 * @example     css
 * .my-select {
 *    @s.ui.select;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiFormSelectInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid', 'underline'],
                default: __STheme.get('ui.form.defaultLnf'),
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

export interface IPostcssSugarPluginUiFormSelectParams {
    lnf: 'solid' | 'underline';
    scope: ('bare' | 'lnf')[];
    outline: boolean;
}

export { postcssSugarPluginUiFormSelectInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFormSelectParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFormSelectParams = {
        lnf: 'solid',
        scope: ['bare', 'lnf'],
        outline: true,
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            @s.ui.base(select, $scope: bare);
            position: relative;
            -webkit-appearance: none;
            appearance: none;
            line-height: 1;
            outline: 0;
            `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        if (finalParams.outline) {
            vars.push(`
                &:focus:not(:hover) {
                    @s.outline;
                }
            `);
        }

        vars.push(`
            @s.ui.base(select, $scope: lnf);
            @s.shape();
            overflow: hidden;

            &.placeholder,
            &:invalid {
                color: s.color(main, text, --alpha 0.3);
            }

            &[multiple] option:checked,
            &[multiple] option[selected] {
                -moz-appearance: none;
                -webkit-appearance: none;
                appearance: none;
                background: s.color(current, --alpha 0.5);
                color: s.color(current, uiForeground);
            }
            &[multiple]:focus option:checked,
            &[multiple]:focus option[selected] {
                -moz-appearance: none;
                -webkit-appearance: none;
                appearance: none;
                background: s.color(current, ui);
                color: s.color(current, uiForeground);
            }

            &:not([multiple]) {
                padding-inline-end: calc(s.padding(ui.form.paddingInline) + 1.5em);

                --padding-inline: s.padding(ui.form.paddingInline);

                background-repeat: no-repeat;
                background-image: linear-gradient(45deg, transparent 50%, s.color(current) 50%), linear-gradient(135deg, s.color(current) 50%, transparent 50%);
                background-position: right calc(var(--padding-inline) + 5px) top 50%, right var(--padding-inline) top 50%;
                background-size: s.scalable(5px) s.scalable(5px), s.scalable(5px) s.scalable(5px);
            
                [dir="rtl"] &,
                &[dir="rtl"] {
                    background-position: left var(--padding-inline) top 50%, left calc(var(--padding-inline) + s.scalable(5px)) top 50%;
                }
            }

        `);

        switch (finalParams.lnf) {
            case 'underline':
                vars.push(`
                    background-color: s.color(current, --alpha 0);
                    border-top: none !important;
                    border-left: none !important;
                    border-right: none !important;
                    border-bottom: s.color(current, --alpha 0.3) solid s.border.width(ui.form.borderWidth) !important;
                    padding-inline: 1ch !important;

                    &:hover, &:focus {
                        border-bottom: s.color(current, --alpha 1) solid s.border.width(ui.form.borderWidth) !important;
                        background-color: s.color(current, --alpha 0.1);
                    }
                `);
                break;
            case 'default':
            default:
                break;
        }
    }

    return vars;
}

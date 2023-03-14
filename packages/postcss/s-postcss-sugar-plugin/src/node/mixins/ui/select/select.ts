import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          select
 * @namespace     node.mixin.ui.select
 * @type               PostcssMixin
 * @interface     ./select          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the select style to any HTMLSelectElement
 *
 * @param       {'default'}                           [style='theme.ui.form.defaultLnf']         The style you want to generate
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.select
 *
 * @example     css
 * .my-select {
 *    @sugar.ui.select;
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
                values: ['default'],
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
    lnf: 'default' | 'underline';
    scope: ('bare' | 'lnf')[];
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
        lnf: 'default',
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            @sugar.ui.base(select, $scope: bare);
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
                    @sugar.outline;
                }
            `);
        }

        vars.push(`
            @sugar.ui.base(select, $scope: lnf);
            @sugar.shape();
            overflow: hidden;

            &[multiple] option:checked,
            &[multiple] option[selected] {
                -moz-appearance: none;
                -webkit-appearance: none;
                appearance: none;
                background: sugar.color(current, --alpha 0.5);
                color: sugar.color(current, uiForeground);
            }
            &[multiple]:focus option:checked,
            &[multiple]:focus option[selected] {
                -moz-appearance: none;
                -webkit-appearance: none;
                appearance: none;
                background: sugar.color(current, ui);
                color: sugar.color(current, uiForeground);
            }

            &:not([multiple]) {
                padding-inline-end: calc(sugar.padding(ui.form.paddingInline) + 1.5em);

                --padding-inline: sugar.padding(ui.form.paddingInline);

                background-repeat: no-repeat;
                background-image: linear-gradient(45deg, transparent 50%, sugar.color(current) 50%), linear-gradient(135deg, sugar.color(current) 50%, transparent 50%);
                background-position: right calc(var(--padding-inline) + 5px) top 50%, right var(--padding-inline) top 50%;
                background-size: sugar.scalable(5px) sugar.scalable(5px), sugar.scalable(5px) sugar.scalable(5px);
            
                [dir="rtl"] &,
                &[dir="rtl"] {
                    background-position: left var(--padding-inline) top 50%, left calc(var(--padding-inline) + sugar.scalable(5px)) top 50%;
                }
            }

        `);

        switch (finalParams.lnf) {
            case 'underline':
                vars.push(`
                    background-color: sugar.color(current, --alpha 0);
                    border-top: none !important;
                    border-left: none !important;
                    border-right: none !important;
                    border-bottom: sugar.color(current, --alpha 0.3) solid sugar.border.width(ui.form.borderWidth) !important;
                    padding-inline: 1ch !important;

                    &:hover, &:focus {
                        border-bottom: sugar.color(current, --alpha 1) solid sugar.border.width(ui.form.borderWidth) !important;
                        background-color: sugar.color(current, --alpha 0.1);
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

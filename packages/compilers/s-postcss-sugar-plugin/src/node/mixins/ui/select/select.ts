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
 * @param       {'solid'}                           [style='theme.ui.select.defaultStyle']         The style you want to generate
 * @param       {'default'|'square'|'pill'}             [shape='theme.ui.select.defaultShape']         The shape you want to generate
 * @param       {('bare'|'lnf'|'shape')[]}        [scope=['bare', 'lnf', 'shape']]      The scope you want to generate
 * @return      {String}            The generated css
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
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.select.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.get('ui.select.defaultShape'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape'],
                default: ['bare', 'lnf', 'shape'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiFormSelectParams {
    style: 'solid';
    shape: 'default' | 'square' | 'pill';
    scope: ('bare' | 'lnf' | 'shape')[];
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
        style: 'solid',
        shape: 'default',
        scope: ['bare', 'lnf', 'shape'],
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

    switch (finalParams.style) {
        case 'solid':
        default:
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                @sugar.ui.base(select, $scope: lnf);
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
                    padding-inline-end: calc(sugar.padding(ui.select.paddingInline) + 1.5em);

                    --padding-inline: sugar.padding(ui.select.paddingInline);

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
                    border-radius: sugar.border.radius(ui.select.borderRadius);
                `);
                break;
        }
    }

    return vars;
}

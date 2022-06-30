import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          table
 * @namespace     node.mixin.ui.table
 * @type               PostcssMixin
 * @interface     ./table          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the table style to any element
 *
 * @param       {'solid'}                           [style='theme.ui.table.defaultStyle']         The style you want to generate
 * @param       {'default'|'square'}             [shape='theme.ui.table.defaultShape']         The shape you want to generate
 * @param       {('bare'|'lnf'|'shape')[]}        [scope=['bare', 'lnf', 'shape']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-table {
 *    @sugar.ui.table;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiTableInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.table.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square'],
                default: __STheme.get('ui.table.defaultShape'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'vr'],
                default: ['bare', 'lnf', 'shape', 'vr'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiTableParams {
    style: 'solid';
    shape: 'default' | 'square';
    scope: ('bare' | 'lnf' | 'shape' | 'vr')[];
}

export { postcssSugarPluginUiTableInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiTableParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiTableParams = {
        style: 'solid',
        shape: 'default',
        scope: ['bare', 'lnf', 'shape', 'vr'],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.includes('bare')) {
        vars.push(`
    width: 100%;
    font-size: sugar.scalable(1rem);
    table-layout: fixed;
    overflow-wrap: break-word;
    border-collapse: collapse;
    
    &, th, td {
    
    }
    th {
        vertical-align: middle;
    }
    td, th {
        padding-inline: sugar.padding(ui.table.paddingInline);
      padding-block: sugar.padding(ui.table.paddingBlock);

        @sugar.direction.rtl {
            text-align: right;
        }

    }

  `);
    }

    if (finalParams.scope.includes('lnf')) {
        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
                    @sugar.depth(ui.table.depth);
                    position: relative;
                    box-shadow: 0 0 0 sugar.theme(ui.table.borderWidth) sugar.color(current, border);
                    overflow: hidden;

                    &, th, td {

                    }
                    th {
                        background-color: sugar.color(current, surface);
                        font-weight: bold;
                    }
                    td, th {
                    
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
            default:
                vars.push(`
    border-radius: sugar.border.radius(ui.table.borderRadius);
        `);
                break;
        }
    }

    return vars;
}

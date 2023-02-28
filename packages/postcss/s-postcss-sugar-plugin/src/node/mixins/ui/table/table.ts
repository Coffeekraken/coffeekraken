import __SInterface from '@coffeekraken/s-interface';

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
 * @param       {'default'}                           [style='theme.ui.table.defaultLnf']         The style you want to generate
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.table
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

export interface IPostcssSugarPluginUiTableParams {
    scope: ('bare' | 'lnf')[];
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
        scope: ['bare', 'lnf'],
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
        vars.push(`
            @sugar.depth(ui.table.depth);
            position: relative;
            box-shadow: 0 0 0 sugar.theme(ui.table.borderWidth) sugar.color(current, border);
            overflow: hidden;
            @sugar.shape();

            &, th, td {

            }
            th {
                background-color: sugar.color(current, surface);
                font-weight: bold;
            }
            td, th {
            
            }
        `);
    }

    return vars;
}

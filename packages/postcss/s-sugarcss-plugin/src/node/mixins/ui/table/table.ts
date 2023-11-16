import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          table
 * @as              @s.ui.table
 * @namespace     node.mixin.ui.table
 * @type               PostcssMixin
 * @interface     ./table          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the table style to any element
 *
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.table
 *
 * @example     css
 * .my-table {
 *    @s.ui.table;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiTableInterface extends __SInterface {
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

export interface ISSugarcssPluginUiTableParams {
    scope: ('bare' | 'lnf')[];
}

export { SSugarcssPluginUiTableInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiTableParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiTableParams = {
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.includes('bare')) {
        vars.push(`
    width: 100%;
    font-size: s.scalable(1rem);
    table-layout: fixed;
    overflow-wrap: break-word;
    border-collapse: collapse;
    
    &, th, td {
    
    }
    th {
        vertical-align: middle;
    }
    td, th {
        padding-inline: s.padding(ui.table.paddingInline);
         padding-block: s.padding(ui.table.paddingBlock);

        @s.direction.rtl {
            text-align: right;
        }

    }

  `);
    }

    if (finalParams.scope.includes('lnf')) {
        vars.push(`
            @s.depth(ui.table.depth);
            position: relative;
            box-shadow: 0 0 0 s.border.width(ui.table.borderWidth) s.color(current, border);
            overflow: hidden;
            @s.shape();

            &, th, td {

            }
            th {
                background-color: s.color(current, surface);
                font-weight: bold;
            }
            td, th {
            
            }
        `);
    }

    return vars;
}

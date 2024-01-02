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
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
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
        return {};
    }
}

export interface ISSugarcssPluginUiTableParams {}

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
        ...params,
    };

    const vars: string[] = [];

    vars.push(`@s.scope 'bare' {`);
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
    vars.push('}');

    vars.push(`@s.scope 'lnf' {`);
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
    vars.push('}');

    return vars;
}

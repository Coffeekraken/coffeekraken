import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginUiTableInterface extends __SInterface {
    static get definition() {
        return {};
    }
}

export interface IPostcssSugarPluginUiTableParams {}

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
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
    width: 100%;
    font-size: sugar.scalable(1rem);
    table-layout: fixed;
    overflow-wrap: break-word;
    border-left: sugar.theme(ui.table.borderWidth) solid sugar.color(current, border);
    border-radius: sugar.theme(ui.table.borderRadius);
    border-collapse: collapse;
    @sugar.depth(sugar.theme(ui.table.depth));

    &, th, td {
        border: sugar.theme(ui.table.borderWidth) solid sugar.color(current, border)
    }
    th {
        background-color: sugar.color(current, surface);
        font-weight: bold;
        vertical-align: middle;
    }
    td, th {
        padding-inline: sugar.theme(ui.table.paddingInline);
      padding-block: sugar.theme(ui.table.paddingBlock);

        @sugar.direction.rtl {
            text-align: right;
        }

    }

  `);

    return vars;
}

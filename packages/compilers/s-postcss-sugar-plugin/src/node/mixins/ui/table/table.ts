import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';

class postcssSugarPluginUiTableInterface extends __SInterface {
    static definition = {};
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
    table-layout: fixed;
    overflow-wrap: break-word;
    border-left: sugar.theme(ui.table.borderWidth) solid sugar.color(ui, border);
    border-radius: sugar.theme(ui.table.borderRadius);
    border-collapse: collapse;
    @sugar.depth(sugar.theme(ui.table.depth));

    &, th, td {
        border: sugar.theme(ui.table.borderWidth) solid sugar.color(ui, border)
    }
    th {
        background-color: sugar.color(ui, surface);
        font-weight: bold;
        vertical-align: middle;
    }
    td, th {
        padding-inline: sugar.scalable(sugar.theme(ui.table.paddingInline));
      padding-block: sugar.scalable(sugar.theme(ui.table.paddingBlock));
    }

    @sugar.rhythm.vertical {
        ${__jsObjectToCssProperties(__theme().config('ui.table.:rhythmVertical'))}
    } 

  `);

    replaceWith(vars);
}

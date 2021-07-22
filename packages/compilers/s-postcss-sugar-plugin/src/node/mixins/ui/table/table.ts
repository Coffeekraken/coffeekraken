import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';

class postcssSugarPluginUiTableInterface extends __SInterface {
  static definition = {
  };
}

export interface IPostcssSugarPluginUiTableParams {
}

export { postcssSugarPluginUiTableInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiTableParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiTableParams = {
    ...params
  };

  const vars: string[] = [];

  vars.push(`
    width: 100%;
    border-left: sugar.theme(ui.table.borderWidth) solid sugar.color(ui);
    background-color: sugar.color(ui, surface);
    border-radius: sugar.theme(ui.table.borderRadius);
    border-collapse: collapse;
    @sugar.depth(sugar.theme(ui.table.depth));

    &, th, td {
        border: sugar.theme(ui.table.borderWidth) solid sugar.color(ui)
    }
    th {
        font-weight: bold;
    }
    td, th {
        padding: sugar.theme(ui.table.padding);
    }

    &.s-rhythm--vertical,
    .s-rhythm--vertical & {
        ${__jsObjectToCssProperties(__theme().config('ui.table.:rhythmVertical'))}
    } 

  `);


  replaceWith(vars);

}

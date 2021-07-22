import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';

class postcssSugarPluginUiBlockquoteInterface extends __SInterface {
  static definition = {
  };
}

export interface IPostcssSugarPluginUiBlockquoteParams {
}

export { postcssSugarPluginUiBlockquoteInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiBlockquoteParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiBlockquoteParams = {
    ...params
  };

  const vars: string[] = [];
  
  vars.push(`
    display: block;
    padding: sugar.theme(ui.blockquote.padding);
    border-left: sugar.theme(ui.blockquote.borderWidth) solid sugar.color(ui);
    background-color: sugar.color(ui, surface);
    border-radius: sugar.theme(ui.blockquote.borderRadius);
    @sugar.depth(sugar.theme(ui.blockquote.depth));

    @sugar.font.family(quote);

    &.s-rhythm--vertical,
    .s-rhythm--vertical & {
        ${__jsObjectToCssProperties(__theme().config('ui.blockquote.:rhythmVertical'))}
    } 

  `);


  replaceWith(vars);

}

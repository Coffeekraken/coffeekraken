import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';

class postcssSugarPluginUiBlockquoteInterface extends __SInterface {
    static definition = {};
}

export interface IPostcssSugarPluginUiBlockquoteParams {}

export { postcssSugarPluginUiBlockquoteInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiBlockquoteParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiBlockquoteParams = {
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
    display: block;
    padding-inline: sugar.scalable(sugar.theme(ui.blockquote.paddingInline));
    padding-block: sugar.scalable(sugar.theme(ui.blockquote.paddingBlock));
    border-left: sugar.theme(ui.blockquote.borderWidth) solid sugar.color(ui);
    color: sugar.color(ui, surfaceForeground);
    background-color: sugar.color(ui, surface);
    border-radius: sugar.theme(ui.blockquote.borderRadius);
    @sugar.depth(sugar.theme(ui.blockquote.depth));

    @sugar.font.family(quote);

    @sugar.rhythm.vertical {
        ${__jsObjectToCssProperties(__theme().config('ui.blockquote.:rhythmVertical'))}
    } 

  `);

    replaceWith(vars);
}

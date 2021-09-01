import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../utils/themeVar';
import __theme from '../../utils/theme';

class postcssSugarPluginUiBaseInterface extends __SInterface {
    static definition = {
        name: {
            type: 'String',
            required: true,
        },
    };
}

export interface IPostcssSugarPluginUiBaseParams {
    name: string;
}

export { postcssSugarPluginUiBaseInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiBaseParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiBaseParams = {
        name: '',
        ...params,
    };

    if (!finalParams.name) return;

    const vars: string[] = [];

    // bare
    vars.push(`
        display: inline-block;
        padding-inline: sugar.padding(sugar.theme(ui.${finalParams.name}.paddingInline));
        padding-block: sugar.padding(sugar.theme(ui.${finalParams.name}.paddingBlock));
    `);

    // lnf
    vars.push(`
        color: sugar.color(main, surfaceForeground);
        background-color: sugar.color(main, ui);
        font-size: sugar.scalable(1rem);
        border: sugar.color(ui, border) solid sugar.theme(ui.${finalParams.name}.borderWidth);
        border-radius: sugar.theme(ui.${finalParams.name}.borderRadius);
        transition: sugar.theme(ui.${finalParams.name}.transition);

        /** @sugar.depth(${__theme().config(`ui.${finalParams.name}.depth`)}); */

        &::placeholder {
          color: sugar.color(main, placeholder);
        }

        @sugar.state.hover {
          background-color: sugar.color(main:hover, ui);
          border: sugar.color(ui:hover, border) solid 1px;
          color: sugar.color(ui:hover, foreground);
          
        }
        @sugar.state.focus {
          background-color: sugar.color(main:focus, ui);
          border: sugar.color(ui:focus, border) solid 1px;
          color: sugar.color(ui:focus, foreground);
        }
        @sugar.state.active {
          background-color: sugar.color(main:active, ui);
          border: sugar.color(ui:active, border) solid 1px;
          color: sugar.color(ui:active, foreground);
        }
  `);

    replaceWith(vars);
}

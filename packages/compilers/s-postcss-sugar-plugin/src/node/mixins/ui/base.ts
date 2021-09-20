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
        @sugar.depth(${__theme().config(`ui.${finalParams.name}.depth`)});
        cursor: auto !important;

        &::placeholder {
          color: sugar.color(main, placeholder);
        }

        &::selection {
            color: sugar.color(ui, 100);
            background-color: sugar.color(ui);
        }

        @sugar.state.hover {
          background-color: sugar.color(main, ui);
          border: sugar.color(ui, border) solid 1px;
          color: sugar.color(ui, foreground);
        }
        @sugar.state.focus {
          background-color: sugar.color(main, ui);
          border: sugar.color(ui, border) solid 1px;
          color: sugar.color(ui, foreground);
        }
        @sugar.state.active {
          background-color: sugar.color(main, ui);
          border: sugar.color(ui, border) solid 1px;
          color: sugar.color(ui, foreground);
        }
        @sugar.state.disabled {
            @sugar.disabled;

            label & + * {
                @sugar.disabled;
            }

        }
  `);

    replaceWith(vars);
}

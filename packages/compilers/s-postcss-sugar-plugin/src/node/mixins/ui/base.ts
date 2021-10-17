import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../utils/themeVar';
import __theme from '../../utils/theme';

class postcssSugarPluginUiBaseInterface extends __SInterface {
    static definition = {
        name: {
            type: 'String',
            required: true,
        },
        scope: {
            type: 'String',
            default: ['bare', 'lnf'],
        },
    };
}

export interface IPostcssSugarPluginUiBaseParams {
    name: string;
    scope: string[];
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
        scope: ['bare', 'lnf'],
        ...params,
    };

    if (!finalParams.name) return;

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: sugar.scalable(1rem);
            display: inline-block;
            padding-inline: sugar.theme(ui.${finalParams.name}.paddingInline);
            padding-block: sugar.theme(ui.${finalParams.name}.paddingBlock);
        `);
    }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            color: sugar.color(main, uiForeground);
            background-color: sugar.color(main, ui);
            font-size: sugar.scalable(1rem);
            border: sugar.color(current, --alpha 0.1) solid sugar.theme(ui.${
                finalParams.name
            }.borderWidth);
            border-radius: sugar.theme(ui.${finalParams.name}.borderRadius);
            transition: sugar.theme(ui.${finalParams.name}.transition);
            @sugar.depth(${__theme().config(`ui.${finalParams.name}.depth`)});
            cursor: auto !important;

            &::placeholder {
            color: sugar.color(main, placeholder);
            }

            &::selection {
                color: sugar.color(current, 100);
                background-color: sugar.color(current);
            }

            @sugar.state.hover {
                border: sugar.color(current, --alpha 0.3) solid 1px;
            }
            @sugar.state.focus {
                border: sugar.color(current, --alpha 0.6) solid 1px;
            }
            @sugar.state.active {
                border: sugar.color(current, --alpha 0.6) solid 1px;
            }
            @sugar.state.disabled {
                @sugar.disabled;

                label & + * {
                    @sugar.disabled;
                }

            }
    `);
    }

    replaceWith(vars);
}

import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginUiBaseInterface extends __SInterface {
    static get _definition() {
        return {
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
        vars.push(`p
            font-size: sugar.scalable(1rem);
            display: inline-block;
            padding-inline: sugar.padding(ui.${finalParams.name}.paddingInline);
            padding-block: sugar.padding(ui.${finalParams.name}.paddingBlock);


        `);
    }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            color: sugar.color(main, uiForeground);
            background-color: sugar.color(main, ui);
            font-size: sugar.scalable(1rem);
            border: sugar.color(current, --alpha 0.5) solid sugar.theme(ui.${
                finalParams.name
            }.borderWidth);
            border-radius: sugar.border.radius(ui.${
                finalParams.name
            }.borderRadius);
            transition: sugar.theme(ui.${finalParams.name}.transition);
            @sugar.depth(${__STheme.get(`ui.${finalParams.name}.depth`)});
            cursor: auto !important;

            &::placeholder {
                color: sugar.color(main, placeholder);
            }

            &::selection {
                color: sugar.color(current, 100);
                background-color: sugar.color(current);
            }

            @sugar.state.hover {
                border: sugar.color(current, --alpha 0.7) solid 1px;
            }
            @sugar.state.focus {
                border: sugar.color(current) solid 1px;
            }
            @sugar.state.active {
                border: sugar.color(current) solid 1px;
            }
    `);
    }

    return vars;
}

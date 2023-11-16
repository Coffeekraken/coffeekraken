import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class SSugarcssPluginUiBaseInterface extends __SInterface {
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

export interface ISSugarcssPluginUiBaseParams {
    name: string;
    scope: string[];
}

export { SSugarcssPluginUiBaseInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiBaseParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiBaseParams = {
        name: '',
        scope: ['bare', 'lnf'],
        ...params,
    };

    if (!finalParams.name) return;

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: s.scalable(1rem);
            display: inline-block;
            padding-inline: s.padding(ui.${finalParams.name}.paddingInline);
            padding-block: s.padding(ui.${finalParams.name}.paddingBlock);


        `);
    }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            color: s.color(main, text);
            background-color: s.color(main, uiBackground);
            font-size: s.scalable(1rem);
            border: s.color(current, --alpha 0.2) solid s.border.width(ui.${
                finalParams.name
            }.borderWidth);
            border-radius: s.border.radius(ui.${finalParams.name}.borderRadius);
            transition: s.theme(ui.${finalParams.name}.transition);
            @s.depth(${__STheme.current.get(`ui.${finalParams.name}.depth`)});
            cursor: auto !important;

            &::placeholder {
                color: s.color(main, placeholder);
            }

            &::selection {
                color: s.color(current, 100);
                background-color: s.color(current);
            }

            &:not(textarea) {
                line-height: 1;
            }

            &[disabled] {
                @s.disabled();
            }

            @s.state.hover {
                border: s.color(current, --alpha 0.3) solid 1px;
            }
            @s.state.focus {
                border: s.color(current, --alpha 0.4) solid 1px;
            }
            @s.state.active {
                border: s.color(current, --alpha 0.4) solid 1px;
            }
    `);
    }

    return vars;
}

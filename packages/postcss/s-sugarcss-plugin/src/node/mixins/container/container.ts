import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           container
 * @as              @s.container
 * @namespace      node.mixin.container
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the css needed for a container depending
 * on the config.theme.container.container configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.container($1)
 *
 * @example        css
 * .my-cool-container {
 *    @s.container;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginContainerInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                required: true,
                default: 'default',
            },
        };
    }
}

export interface ISSugarcssPluginContainerParams {
    name: string;
}

export { SSugarcssPluginContainerInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginContainerParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginContainerParams = {
        name: 'default',
        ...params,
    };

    const vars = new CssVars();

    vars.code(
        `
        @s.lod.prevent {
            margin: 0 auto;
        }
  `,
    );

    const containerConfig = __STheme.get(
        `layout.container.${finalParams.name}`,
    );

    if (!containerConfig) {
        throw new Error(
            `<red>[mixins.container]</red> Sorry but the requested "<yellow>${finalParams.name}</yellow>" does not exists in the "<cyan>config.theme.layout.container</cyan>" configuration`,
        );
    }

    vars.code(`
        --s-container-max-width: s.theme(layout.container.${finalParams.name}, true);
        @s.lod.prevent {
            width: 100%;
            max-width: s.theme(layout.container.${finalParams.name}, true);
        }
    `);

    return vars;
}

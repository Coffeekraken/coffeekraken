import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           container
 * @namespace      node.mixin.container
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the css needed for a container depending
 * on the config.theme.container.container configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * .my-cool-container {
 *    \@sugar.container;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginContainerInterface extends __SInterface {
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

export interface IPostcssSugarPluginContainerParams {
    name: string;
}

export { postcssSugarPluginContainerInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginContainerParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginContainerParams = {
        name: 'default',
        ...params,
    };

    const vars = new CssVars();

    vars.code(
        `
        margin: auto;
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
        max-width: sugar.theme(layout.container.${finalParams.name});
    `);

    return vars;
}

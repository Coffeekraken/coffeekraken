import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           depth
 * @as              @s.depth
 * @namespace      node.mixin.depth
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a certain depth that are defined
 * in the config.theme.depth stack like 10, 20, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.depth($1)
 *
 * @example        css
 * .my-element {
 *    @s.depth(20);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginDepthInterface extends __SInterface {
    static get _definition() {
        return {
            depth: {
                type: 'Number|String',
                required: true,
                alias: 'd',
            },
            type: {
                type: 'String',
                values: ['box', 'text'],
                default: 'box',
            },
        };
    }
}

export interface ISSugarcssPluginDepthParams {
    depth: string | number;
    type: 'box' | 'text';
}

export { SSugarcssPluginDepthInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginDepthParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginDepthParams = {
        depth: 0,
        type: 'box',
        ...params,
    };

    const vars: string[] = [
        `${finalParams.type}-shadow: s.depth(${finalParams.depth});`,
    ];
    return vars;
}

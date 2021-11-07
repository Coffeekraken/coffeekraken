import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           depth
 * @namespace      node.mixins.depth
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to apply a certain depth that are defined
 * in the config.theme.depth stack like 10, 20, etc...
 *
 * @return        {Css}         The generated css for all the classes in the toolkit
 *
 * @example         postcss
 * .my-element {
 *    \@sugar.depth(20);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginDepthInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                depth: {
                    type: 'Number|String',
                    required: true,
                    alias: 'd',
                },
            })
        );
    }
}

export interface IPostcssSugarPluginDepthParams {
    depth: string | number;
}

export { postcssSugarPluginDepthInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginDepthParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginDepthParams = {
        depth: 0,
        ...params,
    };

    const vars: string[] = [`box-shadow: sugar.depth(${finalParams.depth});`];
    return vars;
}

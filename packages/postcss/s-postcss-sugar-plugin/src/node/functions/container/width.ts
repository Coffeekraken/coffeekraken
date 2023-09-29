// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          maxWidth
 * @as              s.container.width
 * @namespace     node.function.color
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./color
 * @status        beta
 *
 * This function allows you to get the max-width value of the nearest container either applied using
 * the `@s.container()` mixin, of by applying the `s-container:...` classes...
 *
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.container.width($1)
 *
 * @example       css
 * .my-element {
 *    max-width: s.container.width();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginContainerMaxWidthInterface extends __SInterface {
    static get _definition() {
        return {
            type: {
                type: 'String',
                alias: 't',
            },
        };
    }
}
export { postcssSugarPluginContainerMaxWidthInterface as interface };

export interface IPostcssSugarPluginContainerMaxWidthParams {
    type: string;
}

export default function width({
    params,
}: {
    params: Partial<IPostcssSugarPluginContainerMaxWidthParams>;
}) {
    const finalParams: IPostcssSugarPluginContainerMaxWidthParams = {
        ...params,
    };

    if (!finalParams.type) {
        return `var(--s-container-max-width, var(--s-layout-container-default, 100%))`;
    }

    return `var(--s-layout-container-${finalParams.type}, var(--s-layout-container-default, 100%))`;
}

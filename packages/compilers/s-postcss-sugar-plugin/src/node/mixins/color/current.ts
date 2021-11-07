import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginColorCurrentMixinInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                color: {
                    type: 'String',
                    required: true,
                },
            })
        );
    }
}
export { postcssSugarPluginColorCurrentMixinInterface as interface };

/**
 * @name           current
 * @namespace      node.mixins.colors
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to (re)map the "current" color to another one you want like "accent", "success", etc...
 *
 * @param       {String}        color           The color you want to map on another one
 * @return      {Css}                     The generated remap css
 *
 * @example         postcss
 * .my-section {
 *      @sugar.color.current(accent);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IPostcssSugarPluginColorCurrentParams {
    color: string;
}

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginColorCurrentParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginColorCurrentParams = {
        color: '',
        ...params,
    };

    const cssArray: string[] = [
        `
        @sugar.color.remap(current, ${finalParams.color});
    `,
    ];

    replaceWith(cssArray);
}

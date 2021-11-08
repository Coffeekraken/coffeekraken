import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           truncate
 * @namespace      node.mixins.truncate
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to truncate some text to a number of lines
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.truncate(2);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginRatioInterface extends __SInterface {
    static get _definition() {
        return {
            lines: {
                type: 'Number',
                required: true,
                default: 1,
            },
        };
    }
}

export interface IPostcssSugarPluginRatioParams {
    lines: number;
}

export { postcssSugarPluginRatioInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginRatioParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginRatioParams = {
        lines: 1,
        ...params,
    };

    const vars: string[] = [
        `
        display: block;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: ${finalParams.lines};
        line-clamp: ${finalParams.lines};
        overflow: hidden;
  `,
    ];

    return vars;
}

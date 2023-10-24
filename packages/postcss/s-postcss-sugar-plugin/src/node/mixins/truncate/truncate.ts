import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           truncate
 * @as              @s.truncate
 * @namespace      node.mixin.truncate
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to truncate some text to a number of lines
 *
 * @param         {Number}          [lines=1]           How many lines you want to display before truncating the rest...
 * @return        {Css}         The generated css
 *
 * @snippet         @s.truncate($1)
 *
 * @example        css
 * .my-cool-element {
 *    @s.truncate(2);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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

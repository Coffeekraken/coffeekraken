import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           ratio
 * @namespace      node.mixin.ratio
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the css needed to apply a ratio on any HTMLElement.
 * It uses the :before technique.
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * .my-cool-element {
 *    \@sugar.ratio(16/9);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginRatioInterface extends __SInterface {
    static get _definition() {
        return {
            ratio: {
                type: 'Number',
                required: true,
                alias: 'd',
            },
        };
    }
}

export interface IPostcssSugarPluginRatioParams {
    ratio: number;
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
        ratio: 1,
        ...params,
    };

    const vars: string[] = [
        `
      aspect-ratio: ${finalParams.ratio};
  `,
    ];

    return vars;
}

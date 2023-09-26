import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           noise
 * @as              @s.filter.noise
 * @namespace      node.mixin.filter
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a noise effect on any HTMLElement using the svg turbulence filter.
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.filter.noise
 *
 * @example        css
 * .my-element {
 *    \@s.filter.noise(20);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginDisabledInterface extends __SInterface {
    static get _definition() {
        return {
            frequency: {
                type: 'Number',
                required: true,
                default: 0.65,
            },
            width: {
                type: 'String',
                required: true,
                default: '5000px',
            },
            height: {
                type: 'String',
                required: true,
                default: '5000px',
            },
        };
    }
}

export interface IPostcssSugarPluginDisabledParams {
    frequency: number;
    width: string;
    height: string;
}

export { postcssSugarPluginDisabledInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginDisabledParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginDisabledParams = {
        frequency: 0.65,
        width: '5000px',
        height: '5000px',
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
            filter: s.filter.noise($frequency: ${finalParams.frequency}, $width: ${finalParams.width}, $height: ${finalParams.height})#filter;
    `);

    return vars;
}
